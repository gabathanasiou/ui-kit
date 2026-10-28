import type { GridSelection } from '@glideapps/glide-data-grid';
import type { GlideColumnLike, GlideRange } from './types';
/**
 * The effective rectangle of a selection: the active range when there is one,
 * else the bounding box of the selected rows (all columns) or columns (all
 * rows).
 */
export declare function effectiveGridRange(selection: GridSelection | null | undefined, rowCount: number, colCount: number): GlideRange | null;
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
export declare function expandRangeFill(range: GlideRange, columns: GlideColumnLike[], value: string, onlyColumn?: number): PlannedEdit[];
/**
 * Paste planner: spread a 2D clipboard block from `target` over the existing
 * rows. A block smaller than the selection repeats (the spreadsheet fill
 * contract); cells past the last row are dropped — appending rows is host
 * behaviour (`onPasteAppend`), never guessed here.
 */
export declare function planGridPaste(target: readonly [number, number], values: readonly (readonly string[])[], existingRowCount: number, columns: GlideColumnLike[], selection: GlideRange | null | undefined): PlannedEdit[];
/** Every writable cell in a range cleared to `''`. */
export declare function planGridClear(range: GlideRange, columns: GlideColumnLike[], editableKeys: ReadonlySet<string>): PlannedEdit[];
/** Clipboard text → a 2D block (CRLF, LF and CR all split rows). */
export declare function parseClipboardGrid(text: string): string[][];
