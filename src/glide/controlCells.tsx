import React from 'react';
import {
  GridCellKind,
  drawTextCell,
  type CustomCell,
  type CustomRenderer,
  type Item,
  type Theme,
} from '@glideapps/glide-data-grid';
import { drawIcon, isDark, roundRect } from './customCells';
import { CONTROL_LANE, GLYPH_LANE, PRESS_MS, isControlHit, type ControlLane } from './controlGeometry';

/**
 * Canvas-native CONTROL cells — affordances painted, hit-tested and focused
 * exactly like the cell itself (no `domCells`, no DOM box).
 *
 *  - `kitPickerCell` — a value with a 24px chevron lane. The lane opens the
 *    SAME overlay `PickerField` a double-click does; the body only selects.
 *  - `kitGlyphCell` — a trash/plus/chevron/check button. Lane-only hover, a
 *    ~90ms painted press flash, `pointer` over the lane.
 *
 * Glide gives custom renderers the pointer position (`needsHoverPosition` →
 * `hoverX/hoverY`), the click with cell-local coordinates (`onClick`), and a
 * per-frame repaint request (`requestAnimationFrame`). The grid keeps owning
 * selection, keyboard navigation, copy/paste and the focus rectangle.
 *
 * The picker's editor is the column's existing `select` editor
 * (`createGlideCellEditor` → `PickerField`); pair a picker column with an
 * `editors`/`getEditor` entry. The glyph cell is read-only and fires through
 * the host's `onCellActivated` (Enter/Space) or its lane click.
 */

/* ── Picker ─────────────────────────────────────────────────────────────── */

export interface KitPickerCellData {
  kind: 'kit-picker';
  /** Painted value (what the cell shows). */
  value: string;
  /** Accessible name / ARIA mirror. Also the press-flash key — keep it unique
   *  per row ("Cast for scene 3"). */
  label?: string;
  /** Painted when `value` is empty. */
  placeholder?: string;
  /** What the overlay PickerField seeds with when it differs from the painted
   *  value (an id-keyed picker whose cell shows a name). */
  seedValue?: string;
  /** Single click on the chevron lane (the host opens the overlay editor). */
  onOpen?: () => void;
}

export type KitPickerCell = CustomCell<KitPickerCellData>;

export function kitPickerCell(data: Omit<KitPickerCellData, 'kind'> & { align?: 'left' | 'center' | 'right' }): KitPickerCell {
  const { align, ...payload } = data;
  return {
    kind: GridCellKind.Custom,
    allowOverlay: true,
    readonly: false,
    copyData: payload.label ?? payload.value,
    contentAlign: align,
    data: { kind: 'kit-picker', ...payload },
  };
}

/* ── Glyph button ───────────────────────────────────────────────────────── */

export type KitGlyphIcon = 'trash' | 'plus' | 'chevron' | 'check';
export type KitGlyphTone = 'neutral' | 'danger' | 'accent';

export interface KitGlyphCellData {
  kind: 'kit-glyph';
  icon: KitGlyphIcon;
  /** Accessible name; unique per row (the press-flash key). */
  label: string;
  tone?: KitGlyphTone;
  /** Target strip: `'full'` (default — the whole cell is the button) or a
   *  pixel width at the cell's right edge (a chevron inside a field cell). */
  lane?: ControlLane;
  onActivate?: () => void;
}

export type KitGlyphCell = CustomCell<KitGlyphCellData>;

export function kitGlyphCell(data: Omit<KitGlyphCellData, 'kind'>): KitGlyphCell {
  return {
    kind: GridCellKind.Custom,
    allowOverlay: false,
    readonly: true,
    copyData: data.label,
    data: { kind: 'kit-glyph', lane: GLYPH_LANE, ...data },
  };
}

/* ── Cell guards (the host resolves a cell by kind) ─────────────────────── */

function controlKind(cell: unknown): 'kit-picker' | 'kit-glyph' | undefined {
  const kind = (cell as { data?: { kind?: string } } | null | undefined)?.data?.kind;
  return kind === 'kit-picker' || kind === 'kit-glyph' ? kind : undefined;
}

export function isKitPickerCell(cell: unknown): cell is KitPickerCell {
  return controlKind(cell) === 'kit-picker';
}

export function isKitGlyphCell(cell: unknown): cell is KitGlyphCell {
  return controlKind(cell) === 'kit-glyph';
}

/** True for either painted control cell (the host schedules its press repaint). */
export function isControlCell(cell: unknown): boolean {
  return controlKind(cell) !== undefined;
}

/* ── Painted press flash ────────────────────────────────────────────────── */

/* Keyed by row + accessible label: `onClick` receives Glide's RAW location
 * (the row-marker column is included), while `draw` gets the data column, so
 * the column index cannot be part of a shared key. Labels are row actions. */
const PRESSED = new Map<string, number>();

function pressKey(row: number, label: string | undefined): string {
  return `${label ?? ''}#${row}`;
}

/** Start the ~90ms press flash for a control cell (the keyboard activation
 *  path; pointer clicks record it inside the renderer's `onClick`). */
export function pressControlCell(cell: Item, label?: string): void {
  PRESSED.set(pressKey(cell[1], label), performance.now());
}

/** 1 → 0 across the flash, 0 when idle. Requests the next frame while live. */
function pressAmount(row: number, label: string | undefined, frameTime: number, requestAnimationFrame: () => void): number {
  const key = pressKey(row, label);
  const at = PRESSED.get(key);
  if (at === undefined) return 0;
  const elapsed = frameTime - at;
  if (elapsed >= PRESS_MS || elapsed < -1000) {
    PRESSED.delete(key);
    return 0;
  }
  requestAnimationFrame();
  return 1 - Math.max(0, elapsed) / PRESS_MS;
}

/* ── Shared paint ───────────────────────────────────────────────────────── */

function controlRect(rect: { x: number; y: number; width: number; height: number }, lane: ControlLane) {
  const width = lane === 'full' ? rect.width : Math.min(rect.width, Math.max(0, lane));
  return { x: rect.x + rect.width - width, y: rect.y, width, height: rect.height };
}

function paintWash(ctx: CanvasRenderingContext2D, rect: { x: number; y: number; width: number; height: number }, dark: boolean, alpha: number): void {
  const inset = 3;
  const w = Math.max(0, rect.width - inset * 2);
  const h = Math.max(0, rect.height - inset * 2);
  roundRect(ctx, rect.x + inset, rect.y + inset, w, h, 4);
  ctx.fillStyle = dark ? `rgba(255,255,255,${0.09 * alpha})` : `rgba(0,0,0,${0.06 * alpha})`;
  ctx.fill();
}

function paintPress(ctx: CanvasRenderingContext2D, rect: { x: number; y: number; width: number; height: number }, dark: boolean, amount: number): void {
  if (amount <= 0) return;
  const inset = 3;
  const w = Math.max(0, rect.width - inset * 2);
  const h = Math.max(0, rect.height - inset * 2);
  roundRect(ctx, rect.x + inset, rect.y + inset, w, h, 4);
  ctx.fillStyle = dark ? `rgba(255,255,255,${0.16 * amount})` : `rgba(0,0,0,${0.12 * amount})`;
  ctx.fill();
}

function glyphColor(tone: KitGlyphTone | undefined, theme: Theme, dark: boolean, hovered: boolean): string {
  if (tone === 'danger') return dark ? (hovered ? '#fca5a5' : '#f87171') : hovered ? '#b91c1c' : '#dc2626';
  if (tone === 'accent') return theme.accentColor;
  return hovered ? theme.textDark : theme.textMedium;
}

/* ── Renderers ──────────────────────────────────────────────────────────── */

const kitPickerRenderer: CustomRenderer<KitPickerCell> = {
  kind: GridCellKind.Custom,
  isMatch: isKitPickerCell,
  needsHover: true,
  needsHoverPosition: true,
  draw: (args, cell) => {
    const { ctx, rect, theme, hoverX } = args;
    const data = cell.data;
    const dark = isDark(theme);
    const lane = controlRect(rect, CONTROL_LANE);
    const bodyWidth = Math.max(0, rect.width - lane.width);
    const inLane = hoverX !== undefined && isControlHit(hoverX, rect.width, CONTROL_LANE);
    const flash = pressAmount(args.row, data.label, args.frameTime, args.requestAnimationFrame);

    // The value keeps Glide's own text metrics/padding/origin: the SAME
    // drawTextCell the text cell uses, clipped before the chevron lane.
    if (bodyWidth > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(rect.x, rect.y, bodyWidth, rect.height);
      ctx.clip();
      const text = data.value || data.placeholder || '';
      drawTextCell(
        {
          ...args,
          rect: { ...rect, width: bodyWidth },
          // A placeholder is the grid's faint text, not the value colour.
          theme: data.value ? theme : { ...theme, textDark: theme.textLight },
        },
        text,
        cell.contentAlign,
      );
      ctx.restore();
    }

    if (inLane) paintWash(ctx, lane, dark, 1);
    paintPress(ctx, lane, dark, flash);

    const iconSize = Math.max(10, Math.min(14, rect.height - 14));
    const cx = lane.x + lane.width / 2;
    const cy = rect.y + rect.height / 2;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(Math.PI / 2); // drawIcon's chevron points right; a picker points down
    drawIcon(ctx, 'chevron', -iconSize / 2, -iconSize / 2, iconSize, inLane ? theme.textDark : theme.textMedium);
    ctx.restore();

    if (hoverX !== undefined) args.overrideCursor?.(inLane ? 'pointer' : 'default');
  },
  onClick: ({ cell, posX, bounds, preventDefault, location }) => {
    if (!isControlHit(posX, bounds.width, CONTROL_LANE)) return undefined;
    PRESSED.set(pressKey(location[1], cell.data.label), performance.now());
    cell.data.onOpen?.();
    // The lane owns this click: never let it also activate the editor.
    preventDefault();
    return undefined;
  },
};

const kitGlyphRenderer: CustomRenderer<KitGlyphCell> = {
  kind: GridCellKind.Custom,
  isMatch: isKitGlyphCell,
  needsHover: true,
  needsHoverPosition: true,
  draw: (args, cell) => {
    const { ctx, rect, theme, hoverX } = args;
    const data = cell.data;
    const dark = isDark(theme);
    const laneSpec = data.lane ?? 'full';
    const lane = controlRect(rect, laneSpec);
    const inLane = hoverX !== undefined && isControlHit(hoverX, rect.width, laneSpec);
    const flash = pressAmount(args.row, data.label, args.frameTime, args.requestAnimationFrame);

    if (inLane) paintWash(ctx, lane, dark, 1);
    paintPress(ctx, lane, dark, flash);

    const iconSize = Math.max(12, Math.min(16, rect.height - 12));
    drawIcon(
      ctx,
      data.icon,
      lane.x + (lane.width - iconSize) / 2,
      rect.y + (rect.height - iconSize) / 2,
      iconSize,
      glyphColor(data.tone, theme, dark, inLane),
    );

    if (hoverX !== undefined) args.overrideCursor?.(inLane ? 'pointer' : 'default');
  },
  onClick: ({ cell, posX, bounds, preventDefault, location }) => {
    const laneSpec = cell.data.lane ?? 'full';
    if (!isControlHit(posX, bounds.width, laneSpec)) return undefined;
    PRESSED.set(pressKey(location[1], cell.data.label), performance.now());
    cell.data.onActivate?.();
    // Exactly once: the same click must not also reach activation (Enter and
    // double-click go through the host's onCellActivated instead).
    preventDefault();
    return undefined;
  },
};

/** The control renderers `GlideSheet` registers by default. */
export const controlCellRenderers: readonly CustomRenderer<any>[] = [
  kitPickerRenderer as CustomRenderer<any>,
  kitGlyphRenderer as CustomRenderer<any>,
];
