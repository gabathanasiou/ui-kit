import type { GridSelection } from '@glideapps/glide-data-grid';
import type { GlideColumnLike, GlideRange } from './types';

/**
 * Pure spreadsheet geometry: selection → rectangle, range fill, paste, clear.
 * Everything here is `Item`-free and DOM-free so it can be unit tested and
 * shared by every grid host.
 */

/** Selected indices of a Glide `CompactSelection`, bounded by `count`. */
function compactIndices(selection: { [Symbol.iterator](): Iterator<number> }, count: number): number[] {
  const out: number[] = [];
  for (const i of selection) {
    if (i >= 0 && i < count) out.push(i);
  }
  return out;
}

/**
 * The effective rectangle of a selection: the active range when there is one,
 * else the bounding box of the selected rows (all columns) or columns (all
 * rows).
 */
export function effectiveGridRange(
  selection: GridSelection | null | undefined,
  rowCount: number,
  colCount: number,
): GlideRange | null {
  if (!selection) return null;
  const current = selection.current?.range;
  if (current && current.width > 0 && current.height > 0) {
    return { x: current.x, y: current.y, width: current.width, height: current.height };
  }
  if (selection.rows.length > 0) {
    const rows = compactIndices(selection.rows, rowCount);
    if (rows.length === 0) return null;
    return { x: 0, y: rows[0], width: colCount, height: rows[rows.length - 1] - rows[0] + 1 };
  }
  if (selection.columns.length > 0) {
    const cols = compactIndices(selection.columns, colCount);
    if (cols.length === 0) return null;
    return { x: cols[0], y: 0, width: cols[cols.length - 1] - cols[0] + 1, height: rowCount };
  }
  return null;
}

export interface PlannedEdit {
  row: number;
  colKey: string;
  val: string;
}

/**
 * Range fill: ONE edit committed while a multi-cell selection is active writes
 * the same raw value to every selected cell. `onlyColumn` restricts the spread
 * to a single column — use it when the columns hold different kinds of value
 * so an entity never leaks into a phone number.
 */
export function expandRangeFill(
  range: GlideRange,
  columns: GlideColumnLike[],
  value: string,
  onlyColumn?: number,
): PlannedEdit[] {
  const out: PlannedEdit[] = [];
  const fromCol = onlyColumn !== undefined ? onlyColumn : range.x;
  const toCol = onlyColumn !== undefined ? onlyColumn + 1 : range.x + range.width;
  for (let r = range.y; r < range.y + range.height; r++) {
    for (let c = fromCol; c < toCol; c++) {
      const key = columns[c]?.key;
      if (key && key !== 'actions') out.push({ row: r, colKey: key, val: value });
    }
  }
  return out;
}

/**
 * Paste planner: spread a 2D clipboard block from `target` over the existing
 * rows. A block smaller than the selection repeats (the spreadsheet fill
 * contract); cells past the last row are dropped — appending rows is host
 * behaviour (`onPasteAppend`), never guessed here.
 */
export function planGridPaste(
  target: readonly [number, number],
  values: readonly (readonly string[])[],
  existingRowCount: number,
  columns: GlideColumnLike[],
  selection: GlideRange | null | undefined,
): PlannedEdit[] {
  const out: PlannedEdit[] = [];
  if (values.length === 0) return out;

  const pasteRows = selection && selection.height > values.length ? selection.height : values.length;
  const widestRow = Math.max(...values.map(r => r.length));
  const pasteCols = selection && selection.width > widestRow ? selection.width : widestRow;

  for (let r = 0; r < pasteRows; r++) {
    const srcRow = values[r % values.length];
    const targetRow = target[1] + r;
    if (targetRow >= existingRowCount) continue;
    const srcLen = srcRow.length || 1;
    for (let c = 0; c < pasteCols; c++) {
      const targetCol = target[0] + c;
      const key = columns[targetCol]?.key;
      if (!key || key === 'actions') continue;
      out.push({ row: targetRow, colKey: key, val: srcRow[c % srcLen] ?? '' });
    }
  }
  return out;
}

/** Every writable cell in a range cleared to `''`. */
export function planGridClear(
  range: GlideRange,
  columns: GlideColumnLike[],
  editableKeys: ReadonlySet<string>,
): PlannedEdit[] {
  const out: PlannedEdit[] = [];
  for (let r = range.y; r < range.y + range.height; r++) {
    for (let c = range.x; c < range.x + range.width; c++) {
      const key = columns[c]?.key;
      if (key && editableKeys.has(key)) out.push({ row: r, colKey: key, val: '' });
    }
  }
  return out;
}

/** Clipboard text → a 2D block (CRLF, LF and CR all split rows). */
export function parseClipboardGrid(text: string): string[][] {
  return text.split(/\r\n|\n|\r/).map(row => row.split('\t'));
}
