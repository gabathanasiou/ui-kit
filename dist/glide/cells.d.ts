import React from 'react';
import { type GridCell } from '@glideapps/glide-data-grid';
import type { GlideColumnLike, GlideRange } from './types';
/**
 * Cell factories for `GlideSheet`.
 *
 * A Glide cell is a plain object Glide renders on a canvas — these helpers
 * keep the boilerplate (and the "the editor seeds from `data`, never from
 * `displayData`" rule) in one place.
 */
export interface TextCellOptions {
    readonly?: boolean;
    displayData?: string;
    allowOverlay?: boolean;
    align?: 'left' | 'right' | 'center';
    cursor?: React.CSSProperties['cursor'];
    themeOverride?: {
        bgCell?: string;
        bgCellMedium?: string;
        textDark?: string;
    };
    /** Selected range inside the editor's text when it opens. */
    selectionRange?: number | readonly [number, number];
}
/** A plain text cell. */
export declare function textCell(data: string, opts?: TextCellOptions): GridCell;
/**
 * A cell whose EDITOR opens on `editValue`, fully selected.
 *
 * Glide seeds the overlay editor from the cell's `data` (never `displayData`),
 * so a cell that RENDERS a computed value must still carry that value in
 * `data` or it opens blank. `selectionRange` selects it so typing replaces the
 * whole value.
 */
export declare function seededTextCell(editValue: string, opts?: TextCellOptions): GridCell;
/**
 * True when a commit only re-states what the editor was seeded with — the
 * stored value or the computed default — or clears an already-empty cell.
 * Hosts use it to avoid pinning a spurious override when the user opens a cell
 * and presses Enter.
 */
export declare function isSeededNoop(prior: string, seed: string, value: string): boolean;
/** A visual-only cell (no editor, no focus): ids, badges, computed text. */
export declare function staticCell(display: string, opts?: Omit<TextCellOptions, 'allowOverlay'>): GridCell;
/** The action column's hit target — drawn by `GlideSheet`, never edited. */
export declare function actionGlyphCell(opts?: {
    readonly?: boolean;
    hovered?: boolean;
    hoverBg?: string;
}): GridCell;
/** Tab-separated clipboard text for a selection (the `actions` column is skipped). */
export declare function buildCopyText(rows: Record<string, string>[], columns: GlideColumnLike[], range: GlideRange): string;
export interface CutCommit {
    row: number;
    colKey: string;
}
/** Clipboard text + the cells to clear for a cut. */
export declare function buildCutPlan(rows: Record<string, string>[], columns: GlideColumnLike[], range: GlideRange): {
    text: string;
    committers: CutCommit[];
};
