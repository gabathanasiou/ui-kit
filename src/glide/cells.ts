import React from 'react';
import { GridCellKind, type GridCell } from '@glideapps/glide-data-grid';
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
  themeOverride?: { bgCell?: string; bgCellMedium?: string; textDark?: string };
  /** Selected range inside the editor's text when it opens. */
  selectionRange?: number | readonly [number, number];
}

/** A plain text cell. */
export function textCell(data: string, opts: TextCellOptions = {}): GridCell {
  return {
    kind: GridCellKind.Text,
    data,
    displayData: opts.displayData ?? data,
    allowOverlay: opts.allowOverlay ?? true,
    readonly: opts.readonly ?? false,
    contentAlign: opts.align,
    cursor: opts.cursor,
    themeOverride: opts.themeOverride,
    selectionRange: opts.selectionRange,
  } as GridCell;
}

/**
 * A cell whose EDITOR opens on `editValue`, fully selected.
 *
 * Glide seeds the overlay editor from the cell's `data` (never `displayData`),
 * so a cell that RENDERS a computed value must still carry that value in
 * `data` or it opens blank. `selectionRange` selects it so typing replaces the
 * whole value.
 */
export function seededTextCell(editValue: string, opts: TextCellOptions = {}): GridCell {
  return textCell(editValue, {
    ...opts,
    selectionRange: editValue.length > 0 ? ([0, editValue.length] as const) : undefined,
  });
}

/**
 * True when a commit only re-states what the editor was seeded with — the
 * stored value or the computed default — or clears an already-empty cell.
 * Hosts use it to avoid pinning a spurious override when the user opens a cell
 * and presses Enter.
 */
export function isSeededNoop(prior: string, seed: string, value: string): boolean {
  const v = value.trim();
  if (v === '') return !prior;
  return v === (prior || seed).trim();
}

/** A visual-only cell (no editor, no focus): ids, badges, computed text. */
export function staticCell(display: string, opts: Omit<TextCellOptions, 'allowOverlay'> = {}): GridCell {
  return textCell(display, { ...opts, allowOverlay: false, readonly: true, cursor: opts.cursor ?? 'default' });
}

/** The action column's hit target — drawn by `GlideSheet`, never edited. */
export function actionGlyphCell(opts: { readonly?: boolean; hovered?: boolean; hoverBg?: string } = {}): GridCell {
  return {
    kind: GridCellKind.Text,
    data: '',
    displayData: '',
    allowOverlay: false,
    readonly: true,
    cursor: opts.readonly ? 'default' : 'pointer',
    themeOverride: opts.hovered && opts.hoverBg ? { bgCell: opts.hoverBg, bgCellMedium: opts.hoverBg } : undefined,
  } as GridCell;
}

/** Tab-separated clipboard text for a selection (the `actions` column is skipped). */
export function buildCopyText(rows: Record<string, string>[], columns: GlideColumnLike[], range: GlideRange): string {
  const lines: string[] = [];
  for (let r = range.y; r < range.y + range.height; r++) {
    if (r >= rows.length) continue;
    const cells: string[] = [];
    for (let c = range.x; c < range.x + range.width; c++) {
      const key = columns[c]?.key;
      if (!key || key === 'actions') continue;
      cells.push(String(rows[r]?.[key] ?? ''));
    }
    lines.push(cells.join('\t'));
  }
  return lines.join('\n');
}

export interface CutCommit {
  row: number;
  colKey: string;
}

/** Clipboard text + the cells to clear for a cut. */
export function buildCutPlan(
  rows: Record<string, string>[],
  columns: GlideColumnLike[],
  range: GlideRange,
): { text: string; committers: CutCommit[] } {
  const lines: string[] = [];
  const committers: CutCommit[] = [];
  for (let r = range.y; r < range.y + range.height; r++) {
    if (r >= rows.length) continue;
    const cells: string[] = [];
    for (let c = range.x; c < range.x + range.width; c++) {
      const key = columns[c]?.key;
      if (!key || key === 'actions') continue;
      cells.push(String(rows[r]?.[key] ?? ''));
      committers.push({ row: r, colKey: key });
    }
    lines.push(cells.join('\t'));
  }
  return { text: lines.join('\n'), committers };
}
