import React from 'react';
import { type CellClickedEventArgs, type CustomRenderer, type GridCell, type Item, type Theme } from '@glideapps/glide-data-grid';
import { type GlideColumnEditor } from './editors';
import type { GlideSheetColumn, GlideSheetEdit, GlideSheetRowAction } from './types';
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
 *  - single-click actions are custom cells (`kitButtonCell`, drawn on the
 *    canvas) or the synthetic row-actions column; kit panels (PickerField /
 *    SearchMenu) open from the overlay editor;
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
    /** Trailing per-row actions, drawn as canvas glyphs (single click). */
    rowActions?: (rowIndex: number) => GlideSheetRowAction[];
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
}
export declare const GlideSheet: React.FC<GlideSheetProps>;
export default GlideSheet;
