import React from 'react';
import { type CellClickedEventArgs, type CustomRenderer, type GridCell, type Item, type Theme } from '@glideapps/glide-data-grid';
import { type GlideColumnEditor } from './editors';
import type { GlideSheetColumn, GlideSheetEdit } from './types';
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
/** The numbered gutter at the grid's left edge (Glide's `rowMarkers`).
 *  `clickable-number` selects the row when the number is clicked. */
export interface GlideRowMarkers {
    kind: 'number' | 'clickable-number' | 'both';
    width?: number;
    startIndex?: number;
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
    /** Fixed grid height in px — defaults to the content height. A smaller value
     *  makes the grid scroll vertically (the header stays pinned). */
    height?: number;
    /** Keep the declared column widths and scroll horizontally instead of fitting
     *  every column to the card. Pair with `freezeColumns`. */
    scrollable?: boolean;
    /** Leading DATA columns pinned while scrolling sideways; Glide adds the
     *  row-marker column on top. 0 = none. */
    freezeColumns?: number;
    /** Numbered row-marker gutter at the left edge. */
    rowMarkers?: GlideRowMarkers;
    /** Enables Glide's trailing add-row; clicking it calls this (the host appends
     *  one row and the trailing row follows the data). */
    onAddRow?: () => void;
    /** Hover hint on the trailing add-row. */
    addRowHint?: string;
}
export declare const GlideSheet: React.FC<GlideSheetProps>;
export default GlideSheet;
