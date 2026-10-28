import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import DataEditor, {
  CompactSelection,
  GridCellKind,
  type CellClickedEventArgs,
  type CustomRenderer,
  type DataEditorRef,
  type EditableGridCell,
  type GridCell,
  type GridColumn,
  type GridSelection,
  type Item,
  type Theme,
} from '@glideapps/glide-data-grid';
import { DataEditorWithDomCells } from '@glideapps/glide-data-grid';
import { ClipboardPaste, Copy, Scissors, Trash2 } from 'lucide-react';
import { ContextMenu, ContextMenuDivider, ContextMenuItem } from '../ContextMenu';
import { useCurrentDocument, usePortalTarget } from '../popout';
import { useKitTheme } from '../ThemeScope';
import { useGlideTheme } from './theme';
import { actionGlyphCell, buildCopyText, buildCutPlan } from './cells';
import {
  effectiveGridRange,
  expandRangeFill,
  parseClipboardGrid,
  planGridClear,
  planGridPaste,
  type PlannedEdit,
} from './gridModel';
import { createGlideCellEditor, useGlideEscapeCancel, type GlideColumnEditor, type GlideEditorOptions } from './editors';
import { KIT_GLIDE_RENDERERS } from './customCells';
import type { GlideRange, GlideSheetColumn, GlideSheetEdit } from './types';

/**
 * GlideSheet — a compact, self-sizing spreadsheet grid for a page card.
 *
 * Glide renders cells on a canvas; this wrapper owns the generic spreadsheet
 * mechanics so a host only supplies data + cell rendering:
 *
 *  - columns auto-fit the card (no horizontal scroll) and the grid is exactly
 *    as tall as its rows (no vertical scroll / wheel trapping);
 *  - per-cell read-only is the CELL's own `readonly` flag — the host mixes
 *    locked and editable cells freely;
 *  - interactive controls are REAL DOM mounted over the cell (`domCells`) —
 *    buttons, pickers, morph fields — or kit panels opened from the overlay
 *    editor; badges are the only painted cell kind;
 *  - selection, fill-down, copy/cut/paste/clear each commit ONCE through
 *    `onCommit`, so the host stores one undo entry per operation;
 *  - editable cells get the light-blue "type here" wash (deepening on the
 *    hovered row), read-only cells stay plain with a neutral hover.
 *
 * Not supported by the canvas model: real DOM controls sitting in a cell,
 * per-cell tab order, and native text selection. Open an overlay editor for
 * anything interactive.
 */

/** A REAL React control pinned over one cell.
 *
 *  Glide paints on a canvas, so a DOM control can never live *inside* a cell —
 *  but it can be mounted in a transparent layer pinned to the cell's rect,
 *  which is indistinguishable in use and gives native focus, hover, CSS
 *  animation and tab order. The canvas cell underneath should return an empty
 *  cell so nothing paints behind the control. */
export interface GlideDomCellSpec {
  row: number;
  colKey: string;
  node: React.ReactNode;
  /** Click-through box: only the node's own `pointer-events: auto`
   *  descendants capture, so the canvas cell stays selectable. */
  passthrough?: boolean;
  /** Edge-to-edge: the node fills the whole cell (no 4px inset, no vertical
   *  centring) — a full-cell button. */
  bleed?: boolean;
}


/** Imperative surface for host controls (e.g. a DOM dropdown button that must
 *  behave exactly like double-clicking the cell). */
export interface GlideSheetApi {
  /** Opens the cell's overlay editor (the double-click path). */
  openCellEditor: (row: number, colKey: string) => void;
}

export interface GlideSheetProps {
  columns: GlideSheetColumn[];
  /** Flat row objects keyed by column key. */
  rows: Record<string, string>[];
  getCellContent: (col: GlideSheetColumn, row: Record<string, string>, rowIndex: number) => GridCell;
  /** Applies a whole operation's edits — one call per edit, paste, fill or clear. */
  onCommit: (edits: GlideSheetEdit[]) => void;
  /** Column keys that accept writes. */
  editableKeys: ReadonlySet<string>;
  readOnly?: boolean;
  emptyLabel?: string;
  /** Base row/header heights at the default font size (scaled with `fontSize`). */
  baseRowHeight?: number;
  baseHeaderHeight?: number;
  fontSize?: number;
  /** Wrap header titles into their column instead of Glide's single line. */
  wrapHeaders?: boolean;
  /** DOM data attribute for tests/scoping. */
  dataAttr?: string;
  className?: string;
  /** Inline dropdown editors per column key. */
  editors?: Record<string, GlideColumnEditor>;
  /** Per-(row, column) editor — wins over `editors`. */
  getEditor?: (row: number, colKey: string) => GlideColumnEditor | undefined | null;
  /** Extra custom cell renderers (the kit's button + badge renderers are always on). */
  customRenderers?: readonly CustomRenderer<any>[];
  /** Raw cell clicks (after the internal row-action hit test) — use for custom cells. */
  onCellClick?: (cell: Item, event: CellClickedEventArgs) => void;
  /** Stable key for the local selection memory (a remount restores it). */
  selectionKey?: string;
  /** Merged over the kit theme (a host's one-off palette tweak). */
  themeOverrides?: Partial<Theme>;
  /** Drag-fill handle (default true). */
  fillHandle?: boolean;
  /** Disable the host's clipboard shortcuts/paste interception (a grid inside
   *  another grid's editor, for example). */
  disableClipboard?: boolean;
  /** Real kit controls mounted over specific cells (see `GlideDomCellSpec`).
   *  The grid re-positions them on scroll, resize and re-render. */
  domCells?: GlideDomCellSpec[];
  /** Receives the imperative API (open a cell editor). */
  apiRef?: React.RefObject<GlideSheetApi | null>;
}

const DEFAULT_ROW_HEIGHT = 28;
const DEFAULT_HEADER_HEIGHT = 30;
const EMPTY_SELECTION: GridSelection = {
  columns: CompactSelection.empty(),
  rows: CompactSelection.empty(),
};

/** Local selection memory per logical grid: switching a page's tabs unmounts
 *  the grid and would otherwise lose where you were. Ephemeral, per window. */
const SELECTION_CACHE = new Map<string, GridSelection>();

let internalClipboard = '';

async function clipboardWrite(text: string): Promise<void> {
  internalClipboard = text;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
}

async function clipboardRead(): Promise<string> {
  try {
    const text = await navigator.clipboard.readText();
    if (text) return text;
  } catch {
    /* fall through to the in-page mirror */
  }
  return internalClipboard;
}

/* Native paste interception: Glide binds its own window paste handler when the
   editor mounts and pastes from an async clipboard read, so a paste we also
   handle would apply twice. Registering this before any DataEditor exists
   guarantees our capture listener runs first and stops Glide seeing it. */
const pasteHandlers = new Set<(text: string) => void>();
if (typeof window !== 'undefined') {
  window.addEventListener('paste', (e: ClipboardEvent) => {
    if (pasteHandlers.size === 0) return;
    const target = e.target as HTMLElement | null;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return;
    const text = e.clipboardData?.getData('text/plain');
    if (!text) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    for (const handler of pasteHandlers) handler(text);
  }, true);
}

function useGlidePasteInterception(handler: (text: string) => void): void {
  useEffect(() => {
    pasteHandlers.add(handler);
    return () => { pasteHandlers.delete(handler); };
  }, [handler]);
}

/** Measures a wrapper so the DataEditor can be given explicit px dimensions
 *  (Glide sizes itself to its columns when width is omitted). */
function useMeasuredWidth(): { ref: React.RefObject<HTMLDivElement | null>; width: number } {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setWidth(prev => (prev === el.getBoundingClientRect().width ? prev : el.getBoundingClientRect().width));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, width };
}


export const GlideSheet: React.FC<GlideSheetProps> = ({
  columns,
  rows,
  getCellContent,
  onCommit,
  editableKeys,
  readOnly,
  emptyLabel,
  baseRowHeight = DEFAULT_ROW_HEIGHT,
  baseHeaderHeight = DEFAULT_HEADER_HEIGHT,
  fontSize = 12,
  wrapHeaders,
  dataAttr,
  className = '',
  editors,
  getEditor,
  customRenderers,
  onCellClick,
  selectionKey,
  themeOverrides,
  fillHandle = true,
  disableClipboard,
  domCells,
  apiRef,
}) => {
  const rowsRef = useRef(rows);
  rowsRef.current = rows;
  const readOnlyRef = useRef(!!readOnly);
  readOnlyRef.current = !!readOnly;
  const kit = useKitTheme();
  const { theme, cellColors } = useGlideTheme(fontSize, themeOverrides);
  const mode = kit?.mode ?? 'light';

  const rowH = baseRowHeight;
  const headerH = baseHeaderHeight;
  const { ref: sizeRef, width: gridWidth } = useMeasuredWidth();

  const COLUMNS = useMemo(() => {
    const total = columns.reduce((sum, c) => sum + c.width, 0);
    if (!gridWidth || gridWidth <= 0 || total <= 0) return columns;
    const target = Math.max(120, Math.floor(gridWidth) - 1);
    const flexIdx = Math.min(1, columns.length - 1);
    const widths = columns.map(c => Math.max(40, Math.floor((c.width / total) * target)));
    if (flexIdx >= 0) {
      const sum = widths.reduce((s, w) => s + w, 0);
      widths[flexIdx] = Math.max(40, widths[flexIdx] + (target - sum));
    }
    return columns.map((c, i) => ({ ...c, width: widths[i] }));
  }, [columns, gridWidth]);

  const glideColumns: GridColumn[] = useMemo(
    () => COLUMNS.map(c => ({ title: c.label.toUpperCase(), width: c.width })),
    [COLUMNS],
  );

  const contentHeight = headerH + Math.max(rows.length, 1) * rowH;

  /* Glide caches painted cells: a data/column change only repaints after an
     explicit damage pass, or the grid looks stale until the next interaction. */
  useEffect(() => {
    if (!gridRef.current) return;
    const damage: { cell: Item }[] = [];
    for (let r = 0; r < rows.length; r++) {
      for (let c = 0; c < COLUMNS.length; c++) damage.push({ cell: [c, r] });
    }
    const id = setTimeout(() => gridRef.current?.updateCells(damage), 0);
    return () => clearTimeout(id);
  }, [rows, COLUMNS]);

  /* Glide REQUIRES a portal element for its overlay editor and positions it in
     viewport coordinates. A 0×0 fixed layer at the origin is the recipe; inside
     a kit Modal it must also sit above the dialog and keep its focus scope from
     stealing keystrokes back out of the editor. */
  const portalTarget = usePortalTarget();
  const currentDocument = useCurrentDocument();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const gridPortalRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const doc = currentDocument ?? (typeof document !== 'undefined' ? document : null);
    if (!doc) return;
    const inModal = !!wrapperRef.current?.closest('[role="dialog"]');
    const layer = doc.createElement('div');
    layer.setAttribute('data-glide-overlay-layer', '');
    layer.style.cssText = inModal
      ? 'position:fixed;left:0;top:0;z-index:10001;pointer-events:auto;width:0;height:0'
      : 'position:fixed;left:0;top:0;z-index:9999;width:0;height:0';
    const swallow = (e: FocusEvent) => e.stopPropagation();
    let onDocFocusOut: ((e: FocusEvent) => void) | null = null;
    if (inModal) {
      layer.addEventListener('focusin', swallow);
      layer.addEventListener('focusout', swallow);
      onDocFocusOut = (e: FocusEvent) => {
        const related = e.relatedTarget as Node | null;
        if (related && layer.contains(related)) e.stopPropagation();
      };
      doc.addEventListener('focusout', onDocFocusOut, true);
    }
    doc.body.appendChild(layer);
    gridPortalRef.current = layer;
    void portalTarget;
    return () => {
      if (onDocFocusOut) doc.removeEventListener('focusout', onDocFocusOut, true);
      layer.remove();
      gridPortalRef.current = null;
    };
  }, [portalTarget, currentDocument]);

  const editorOptsRef = useRef<GlideEditorOptions | null>(null);
  editorOptsRef.current = {
    readOnlyRef,
    columns: COLUMNS,
    getValue: (row, colKey) => String(rowsRef.current[row]?.[colKey] ?? ''),
    editors,
    getEditor,
    portalRef: gridPortalRef,
    columnOffset: 0,
  };
  const provideEditor = useMemo(() => createGlideCellEditor(() => editorOptsRef.current), []);
  const escapeCancel = useGlideEscapeCancel();

  const gridRef = useRef<DataEditorRef>(null);
  const [gridSelection, setGridSelection] = useState<GridSelection>(() =>
    (selectionKey ? SELECTION_CACHE.get(selectionKey) : undefined) ?? EMPTY_SELECTION);
  useEffect(() => {
    setGridSelection(selectionKey ? SELECTION_CACHE.get(selectionKey) ?? EMPTY_SELECTION : EMPTY_SELECTION);
  }, [selectionKey]);
  const gridSelectionRef = useRef(gridSelection);
  gridSelectionRef.current = gridSelection;

  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; row: number; col: number } | null>(null);
  const hoveredRowRef = useRef<number | null>(null);

  /* ── DOM cells ────────────────────────────────────────────────────────────
     Real controls live in the FORK's DOM layer: `getDomCell` is called per
     visible cell and the wrapper pins its own boxes (see
     vendor/glide-data-grid/dist/esm/dom-cells). The host only names the cells. */
  const domCellMap = useMemo(() => {
    const map = new Map<string, { node: React.ReactNode; passthrough?: boolean; bleed?: boolean }>();
    for (const spec of domCells ?? []) {
      const col = COLUMNS.findIndex(c => c.key === spec.colKey);
      if (col >= 0) map.set(`${col}:${spec.row}`, { node: spec.node, passthrough: spec.passthrough, bleed: spec.bleed });
    }
    return map;
  }, [domCells, COLUMNS]);
  useEffect(() => {
    if (!apiRef) return undefined;
    apiRef.current = {
      openCellEditor: (row, colKey) => {
        const col = COLUMNS.findIndex(c => c.key === colKey);
        if (col >= 0) gridRef.current?.openCellEditor(col, row);
      },
    };
    return () => { apiRef.current = null; };
  }, [apiRef, COLUMNS]);

  const getDomCell = useCallback(
    (col: number, row: number) => domCellMap.get(`${col}:${row}`) ?? null,
    [domCellMap],
  );

  /** Repaint just the two rows affected by a hover change. */
  const onItemHovered = useCallback((args: any) => {
    const loc = args?.location;
    const row = args?.kind === 'cell' && loc && loc[1] >= 0 && loc[1] < rowsRef.current.length ? loc[1] : null;
    if (row === hoveredRowRef.current) return;
    const prev = hoveredRowRef.current;
    hoveredRowRef.current = row;
    const damage: { cell: Item }[] = [];
    if (prev != null) for (let c = 0; c < COLUMNS.length; c++) damage.push({ cell: [c, prev] });
    if (row != null) for (let c = 0; c < COLUMNS.length; c++) damage.push({ cell: [c, row] });
    if (damage.length) gridRef.current?.updateCells(damage);
  }, [COLUMNS.length]);

  const getCell = useCallback(([col, row]: Item): GridCell => {
    const colDef = COLUMNS[col];
    const r = rowsRef.current[row];
    if (!colDef || !r) return actionGlyphCell({ readonly: true });
    const hovered = row === hoveredRowRef.current;
    const cell = getCellContent(colDef, r, row);
    // A read-only sheet is enforced per cell: Glide has no grid-level flag.
    if (readOnlyRef.current) return { ...cell, readonly: true, allowOverlay: false } as GridCell;
    // Custom cells paint their own face (button / badge / field trigger) — the
    // editable wash belongs to plain text/boolean cells only.
    if (cell.kind === GridCellKind.Custom) return cell;
    const isReadonly = !!(cell as { readonly?: boolean }).readonly;
    const ownOverride = (cell as { themeOverride?: Record<string, string> }).themeOverride ?? {};
    if (!isReadonly) {
      const bg = hovered ? cellColors.editableHoverBg : cellColors.editableBg;
      return { ...cell, themeOverride: { ...ownOverride, bgCell: bg, bgCellMedium: bg } } as GridCell;
    }
    if (hovered) {
      return { ...cell, themeOverride: { ...ownOverride, bgCell: cellColors.readonlyHoverBg, bgCellMedium: cellColors.readonlyHoverBg } } as GridCell;
    }
    return cell;
  }, [COLUMNS, getCellContent, cellColors]);

  /** Glide draws header text left-aligned only; repaint centered/wrapped titles
   *  so they line up with their cells. */
  const drawHeader = useCallback((args: any, drawContent: () => void) => {
    drawContent();
    const { ctx, rect, column, columnIndex, theme: gridTheme } = args;
    const colDef = COLUMNS[columnIndex];
    if (!colDef) return;
    const centered = (colDef.align ?? 'left') === 'center';
    if (!centered && !wrapHeaders) return;
    ctx.save();
    ctx.fillStyle = gridTheme.bgHeader;
    ctx.fillRect(rect.x + 1, rect.y, rect.width - 2, rect.height);
    ctx.fillStyle = gridTheme.textHeader;
    ctx.textAlign = centered ? 'center' : 'left';
    ctx.textBaseline = 'middle';
    ctx.beginPath();
    ctx.rect(rect.x, rect.y, rect.width, rect.height);
    ctx.clip();
    const x = centered ? rect.x + rect.width / 2 : rect.x + 6;
    const title = String(column.title);
    if (!wrapHeaders) {
      ctx.fillText(title, x, rect.y + rect.height / 2);
    } else {
      const lines: string[] = [];
      let line = '';
      const maxW = rect.width - 8;
      for (const word of title.split(/\s+/)) {
        const next = line ? `${line} ${word}` : word;
        if (ctx.measureText(next).width <= maxW) { line = next; continue; }
        if (line) { lines.push(line); line = ''; }
        let chunk = '';
        for (const ch of word) {
          if (chunk && ctx.measureText(chunk + ch).width > maxW) { lines.push(chunk); chunk = ch; }
          else chunk += ch;
        }
        line = chunk;
      }
      if (line) lines.push(line);
      const lh = Math.min(14, rect.height / Math.max(1, lines.length));
      const startY = rect.y + rect.height / 2 - ((lines.length - 1) * lh) / 2;
      lines.forEach((l, i) => ctx.fillText(l, x, startY + i * lh));
    }
    ctx.restore();
  }, [COLUMNS, wrapHeaders]);

  const onCellClicked = useCallback((cell: Item, event: CellClickedEventArgs) => {
    onCellClick?.(cell, event);
  }, [onCellClick]);

  /** Applies a set of planned edits as ONE commit. */
  const applyEdits = useCallback((edits: PlannedEdit[]) => {
    if (readOnlyRef.current) return;
    const out: GlideSheetEdit[] = [];
    for (const edit of edits) {
      if (!editableKeys.has(edit.colKey)) continue;
      if (!rowsRef.current[edit.row]) continue;
      out.push({ row: edit.row, colKey: edit.colKey, value: edit.val });
    }
    if (out.length > 0) onCommit(out);
  }, [editableKeys, onCommit]);

  const getEffectiveRange = useCallback((): GlideRange | null =>
    effectiveGridRange(gridSelectionRef.current, rows.length, COLUMNS.length),
  [rows.length, COLUMNS.length]);

  const onCellsEdited = useCallback((edits: readonly { location: Item; value: EditableGridCell }[]) => {
    if (readOnlyRef.current) return false;
    // A single edit with a multi-cell selection active is a range FILL: write
    // the value across the selection as one commit. Pastes arrive as many
    // edits and are never expanded.
    if (edits.length === 1 && edits[0].value.kind === GridCellKind.Text) {
      const range = getEffectiveRange();
      if (range && range.width * range.height > 1) {
        const spread = expandRangeFill(range, COLUMNS, edits[0].value.data);
        if (spread.length > 1) {
          applyEdits(spread);
          return true;
        }
      }
    }
    applyEdits(edits.map(edit => ({
      row: edit.location[1],
      colKey: COLUMNS[edit.location[0]]?.key ?? '',
      val: edit.value.kind === GridCellKind.Text
        ? edit.value.data
        : edit.value.kind === GridCellKind.Boolean
          ? String(edit.value.data)
          : '',
    })));
    return true;
  }, [COLUMNS, applyEdits, getEffectiveRange]);

  const handlePaste = useCallback((target: Item, values: readonly (readonly string[])[]) => {
    if (readOnlyRef.current) return false;
    const plan = planGridPaste(
      [target[0], target[1]],
      values,
      rowsRef.current.length,
      COLUMNS,
      gridSelectionRef.current?.current?.range,
    );
    applyEdits(plan);
    return false;
  }, [COLUMNS, applyEdits]);

  const handleCopy = useCallback(async () => {
    const range = getEffectiveRange();
    if (!range) return;
    const text = buildCopyText(rows, COLUMNS, range);
    if (text.length > 0) await clipboardWrite(text);
    setContextMenu(null);
  }, [rows, COLUMNS, getEffectiveRange]);

  const handleCut = useCallback(async () => {
    if (readOnlyRef.current) { setContextMenu(null); return; }
    const range = getEffectiveRange();
    if (!range) return;
    const { text, committers } = buildCutPlan(rows, COLUMNS, range);
    if (text.length > 0) {
      await clipboardWrite(text);
      applyEdits(committers.map(c => ({ ...c, val: '' })));
    }
    setContextMenu(null);
  }, [rows, COLUMNS, applyEdits, getEffectiveRange]);

  const handleClear = useCallback(() => {
    if (readOnlyRef.current) { setContextMenu(null); return; }
    const range = getEffectiveRange();
    if (!range) return;
    applyEdits(planGridClear(range, COLUMNS, editableKeys));
    setContextMenu(null);
  }, [COLUMNS, editableKeys, applyEdits, getEffectiveRange]);

  const getPasteTarget = useCallback((): Item | null => {
    const selection = gridSelectionRef.current;
    let cell = selection.current?.cell;
    if (!cell && selection.rows.length > 0) {
      for (let i = 0; i < rowsRef.current.length; i++) {
        if (selection.rows.hasIndex(i)) { cell = [0, i] as Item; break; }
      }
    }
    return cell ?? null;
  }, []);

  const pasteTextAtSelection = useCallback((text: string) => {
    if (readOnlyRef.current) return;
    const cell = getPasteTarget();
    if (!cell) return;
    handlePaste(cell, parseClipboardGrid(text));
  }, [getPasteTarget, handlePaste]);

  const handlePasteFromMenu = useCallback(async () => {
    const text = await clipboardRead();
    if (text) pasteTextAtSelection(text);
    setContextMenu(null);
  }, [pasteTextAtSelection]);

  useGlidePasteInterception(useCallback((text: string) => {
    if (!disableClipboard) pasteTextAtSelection(text);
  }, [disableClipboard, pasteTextAtSelection]));

  const clipboardShortcutsRef = useRef({ copy: () => {}, cut: () => {}, paste: () => {} });
  clipboardShortcutsRef.current = { copy: handleCopy, cut: handleCut, paste: handlePasteFromMenu };

  useEffect(() => {
    if (disableClipboard) return;
    const doc = currentDocument ?? (typeof document !== 'undefined' ? document : null);
    if (!doc) return;
    const isEditableTarget = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false;
      return target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey) || e.shiftKey || e.altKey) return;
      const key = e.key.toLowerCase();
      if (key !== 'c' && key !== 'x' && key !== 'v') return;
      if (isEditableTarget(e.target)) return;
      e.preventDefault();
      e.stopPropagation();
      const handlers = clipboardShortcutsRef.current;
      if (key === 'c') void handlers.copy();
      else if (key === 'x') void handlers.cut();
      else void handlers.paste();
    };
    doc.addEventListener('keydown', onKeyDown, true);
    return () => doc.removeEventListener('keydown', onKeyDown, true);
  }, [currentDocument, disableClipboard]);

  const onCellContextMenu = useCallback((cell: Item, e: CellClickedEventArgs) => {
    e.preventDefault();
    const [col, row] = cell;
    if (row < 0 || row >= rowsRef.current.length) return;
    setContextMenu({
      x: (e.bounds?.x ?? 0) + (e.localEventX ?? 0),
      y: (e.bounds?.y ?? 0) + (e.localEventY ?? 0),
      row,
      col,
    });
  }, []);

  const hasSelection = gridSelection.current?.range !== undefined
    || gridSelection.rows.length > 0
    || gridSelection.columns.length > 0;

  const onGridSelectionChange = useCallback((selection: GridSelection) => {
    setGridSelection(selection);
    if (selectionKey) SELECTION_CACHE.set(selectionKey, selection);
  }, [selectionKey]);

  const renderers = useMemo(
    () => (customRenderers ? [...KIT_GLIDE_RENDERERS, ...customRenderers] : KIT_GLIDE_RENDERERS),
    [customRenderers],
  );

  return (
    <div
      ref={wrapperRef}
      className={`relative ${className}`}
      {...(dataAttr ? { [dataAttr]: '' } : {})}
      data-glide-sheet={mode}
      onPointerLeave={() => {
        const prev = hoveredRowRef.current;
        if (prev == null) return;
        hoveredRowRef.current = null;
        const damage: { cell: Item }[] = [];
        for (let c = 0; c < COLUMNS.length; c++) damage.push({ cell: [c, prev] });
        gridRef.current?.updateCells(damage);
      }}
    >
      <div ref={sizeRef} style={{ touchAction: 'none' }}>
        {rows.length === 0 && emptyLabel ? (
          <div className="px-2.5 py-6 text-center text-xs text-[color:var(--ui-text-faint)]">{emptyLabel}</div>
        ) : gridWidth > 0 ? (
          <DataEditorWithDomCells
            ref={gridRef}
            getDomCell={domCells && domCells.length > 0 ? getDomCell : undefined}
            width={Math.max(120, Math.floor(gridWidth) - 1)}
            height={contentHeight}
            columns={glideColumns}
            rows={rows.length}
            getCellContent={getCell}
            onCellsEdited={onCellsEdited}
            onPaste={handlePaste}
            provideEditor={provideEditor}
            {...escapeCancel}
            getCellsForSelection={true}
            gridSelection={gridSelection}
            onGridSelectionChange={onGridSelectionChange}
            theme={theme}
            rowHeight={rowH}
            headerHeight={headerH}
            drawHeader={drawHeader}
            onCellClicked={onCellClicked}
            onItemHovered={onItemHovered}
            onCellContextMenu={onCellContextMenu}
            customRenderers={renderers}
            editOnType
            rangeSelect="rect"
            cellActivationBehavior="double-click"
            fillHandle={fillHandle && !readOnly}
            portalElementRef={gridPortalRef as React.RefObject<HTMLElement>}
            minColumnWidth={1}
            maxColumnWidth={10000}
          />
        ) : (
          <div style={{ height: contentHeight }} />
        )}
      </div>

      <ContextMenu
        open={!!contextMenu}
        x={contextMenu?.x ?? 0}
        y={contextMenu?.y ?? 0}
        onClose={() => setContextMenu(null)}
        theme={mode}
      >
        <ContextMenuItem onClick={() => void handleCopy()} icon={<Copy className="w-3.5 h-3.5" />} disabled={!hasSelection}>
          Copy
        </ContextMenuItem>
        <ContextMenuItem onClick={() => void handlePasteFromMenu()} icon={<ClipboardPaste className="w-3.5 h-3.5" />} disabled={readOnly || disableClipboard}>
          Paste
        </ContextMenuItem>
        <ContextMenuItem onClick={handleClear} icon={<Trash2 className="w-3.5 h-3.5 text-[color:var(--ui-text-faint)]" />} disabled={!hasSelection || readOnly}>
          Clear
        </ContextMenuItem>
        <ContextMenuDivider />
        <ContextMenuItem onClick={() => void handleCut()} icon={<Scissors className="w-3.5 h-3.5 text-[color:var(--ui-text-faint)]" />} disabled={!hasSelection || readOnly}>
          Cut
        </ContextMenuItem>
      </ContextMenu>
    </div>
  );
};

export default GlideSheet;
