import React from 'react';
import {
  GridCellKind,
  drawTextCell,
  type CustomCell,
  type CustomRenderer,
  type Item,
  type Theme,
} from '@glideapps/glide-data-grid';
import { drawIcon, isDark } from './customCells';
import { CONTROL_LANE, GLYPH_LANE, PRESS_MS, isControlHit, type ControlLane } from './controlGeometry';

/**
 * Canvas-native CONTROL cells — affordances painted, hit-tested and focused
 * exactly like the cell itself (no `domCells`, no DOM box).
 *
 *  - `kitPickerCell` — a value with a 24px chevron lane. The lane opens the
 *    SAME overlay `PickerField` a double-click does; the body only selects.
 *  - `kitGlyphCell` — a trash/plus/chevron/check button. Lane-only hover, a
 *    ~90ms painted press flash, `pointer` over the lane.
 *  - `kitGlyphGroupCell` — 2+ glyph buttons inside ONE cell (split lanes), so
 *    row actions do not need a column each.
 *
 * The hover fill is the WHOLE target rectangle (never an inset pill) and its
 * colour is configurable (`hoverBg`, painted as given — pass a translucent
 * tint); the default is the tone's wash. Glide gives custom renderers the
 * pointer position (`needsHoverPosition` → `hoverX/hoverY`), the click with
 * cell-local coordinates (`onClick`), and a per-frame repaint request
 * (`requestAnimationFrame`). The grid keeps owning selection, keyboard
 * navigation, copy/paste and the focus rectangle.
 *
 * The picker's editor is the column's existing `select` editor
 * (`createGlideCellEditor` → `PickerField`); pair a picker column with an
 * `editors`/`getEditor` entry. Glyph cells are read-only and fire through the
 * host's `onCellActivated` (Enter/Space → the FIRST button) or their click.
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
  /** Chevron-lane hover fill (painted as given; use a translucent tint). */
  hoverBg?: string;
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

/* ── Glyph buttons ──────────────────────────────────────────────────────── */

export type KitGlyphIcon = 'trash' | 'plus' | 'chevron' | 'check';
export type KitGlyphTone = 'neutral' | 'danger' | 'accent';

export interface KitGlyphButton {
  icon: KitGlyphIcon;
  /** Accessible name; unique per row (the press-flash key). */
  label: string;
  tone?: KitGlyphTone;
  /** Hover fill for this button's rectangle, painted as given. Pass a
   *  translucent tint (`rgba(…)`); the default is the tone's wash. */
  hoverBg?: string;
  onActivate?: () => void;
}

export interface KitGlyphCellData extends KitGlyphButton {
  kind: 'kit-glyph';
  /** Target strip: `'full'` (default — the whole cell is the button) or a
   *  pixel width at the cell's right edge (a chevron inside a field cell). */
  lane?: ControlLane;
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

export interface KitGlyphGroupCellData {
  kind: 'kit-glyph-group';
  /** Left-to-right buttons; the FIRST is the primary (Enter/Space fires it). */
  buttons: KitGlyphButton[];
  lane?: ControlLane;
}

export type KitGlyphGroupCell = CustomCell<KitGlyphGroupCellData>;

/** 2+ glyph buttons in one cell, split into equal lanes — one row-action
 *  column instead of one column per button. */
export function kitGlyphGroupCell(data: { buttons: KitGlyphButton[]; lane?: ControlLane }): KitGlyphGroupCell {
  return {
    kind: GridCellKind.Custom,
    allowOverlay: false,
    readonly: true,
    copyData: data.buttons.map(b => b.label).join(' / '),
    data: { kind: 'kit-glyph-group', lane: GLYPH_LANE, ...data },
  };
}

/* ── Cell guards (the host resolves a cell by kind) ─────────────────────── */

type ControlKind = 'kit-picker' | 'kit-glyph' | 'kit-glyph-group';

function controlKind(cell: unknown): ControlKind | undefined {
  const kind = (cell as { data?: { kind?: string } } | null | undefined)?.data?.kind;
  return kind === 'kit-picker' || kind === 'kit-glyph' || kind === 'kit-glyph-group' ? kind : undefined;
}

export function isKitPickerCell(cell: unknown): cell is KitPickerCell {
  return controlKind(cell) === 'kit-picker';
}

export function isKitGlyphCell(cell: unknown): cell is KitGlyphCell {
  return controlKind(cell) === 'kit-glyph';
}

export function isKitGlyphGroupCell(cell: unknown): cell is KitGlyphGroupCell {
  return controlKind(cell) === 'kit-glyph-group';
}

/** True for any painted control cell (the host schedules its press repaint). */
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

type Rect = { x: number; y: number; width: number; height: number };

function controlRect(rect: Rect, lane: ControlLane): Rect {
  const width = lane === 'full' ? rect.width : Math.min(rect.width, Math.max(0, lane));
  return { x: rect.x + rect.width - width, y: rect.y, width, height: rect.height };
}

/** `#rrggbb` + alpha → `#rrggbbaa`; other colour syntaxes pass through. */
function withAlpha(color: string, alpha: number): string {
  if (/^#[0-9a-f]{6}$/i.test(color)) {
    return `${color}${Math.round(Math.max(0, Math.min(1, alpha)) * 255).toString(16).padStart(2, '0')}`;
  }
  return color;
}

/** The tone's default hover fill — a translucent tint over the whole cell. */
function toneHoverBg(tone: KitGlyphTone | undefined, theme: Theme, dark: boolean): string {
  if (tone === 'danger') return dark ? 'rgba(248,113,113,0.24)' : 'rgba(220,38,38,0.14)';
  if (tone === 'accent') return withAlpha(theme.accentColor, 0.14);
  return dark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.055)';
}

/* One pixel in from the cell edge: the grid's damage repaint clips the outer
 * pixel (and the border line), so a fill painted over it would never clear —
 * the "stuck red rectangle border". */
const FILL_INSET = 1;

/** Fill the target rectangle, stopping at the cell's own 1px border line. */
function paintFill(ctx: CanvasRenderingContext2D, rect: Rect, color: string, alpha = 1): void {
  const width = rect.width - FILL_INSET * 2;
  const height = rect.height - FILL_INSET * 2;
  if (width <= 0 || height <= 0) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.fillRect(rect.x + FILL_INSET, rect.y + FILL_INSET, width, height);
  ctx.restore();
}

/** A short neutral flash over the pressed rectangle. */
function paintPress(ctx: CanvasRenderingContext2D, rect: Rect, dark: boolean, amount: number): void {
  if (amount <= 0) return;
  paintFill(ctx, rect, dark ? '#ffffff' : '#000000', (dark ? 0.16 : 0.10) * amount);
}

function glyphColor(tone: KitGlyphTone | undefined, theme: Theme, dark: boolean, hovered: boolean): string {
  if (tone === 'danger') return dark ? (hovered ? '#fca5a5' : '#f87171') : hovered ? '#b91c1c' : '#dc2626';
  if (tone === 'accent') return theme.accentColor;
  return hovered ? theme.textDark : theme.textMedium;
}

/** The hovered button index in a split lane, or -1 outside it. */
function segmentIndex(startX: number, laneWidth: number, count: number, localX: number | undefined): number {
  if (localX === undefined || count <= 0 || laneWidth <= 0) return -1;
  if (localX < startX || localX > startX + laneWidth) return -1;
  const width = laneWidth / count;
  if (width <= 0) return -1;
  return Math.min(count - 1, Math.max(0, Math.floor((localX - startX) / width)));
}

/** The control strip's left edge in CELL-LOCAL coordinates. */
function laneStart(width: number, lane: ControlLane): number {
  return lane === 'full' ? 0 : width - Math.min(width, Math.max(0, lane));
}

function segmentRect(lane: Rect, count: number, index: number): Rect {
  const width = lane.width / count;
  return { x: lane.x + width * index, y: lane.y, width, height: lane.height };
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

    if (inLane) paintFill(ctx, lane, data.hoverBg ?? toneHoverBg('neutral', theme, dark));
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

    if (inLane) paintFill(ctx, lane, data.hoverBg ?? toneHoverBg(data.tone, theme, dark));
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

const kitGlyphGroupRenderer: CustomRenderer<KitGlyphGroupCell> = {
  kind: GridCellKind.Custom,
  isMatch: isKitGlyphGroupCell,
  needsHover: true,
  needsHoverPosition: true,
  draw: (args, cell) => {
    const { ctx, rect, theme, hoverX } = args;
    const data = cell.data;
    const dark = isDark(theme);
    const laneSpec = data.lane ?? 'full';
    const lane = controlRect(rect, laneSpec);
    const count = Math.max(1, data.buttons.length);
    // `hoverX` is CELL-LOCAL; the lane is canvas-absolute. Compare in cell space.
    const hovered = segmentIndex(laneStart(rect.width, laneSpec), lane.width, count, hoverX);

    data.buttons.forEach((button, index) => {
      const segment = segmentRect(lane, count, index);
      const flash = pressAmount(args.row, button.label, args.frameTime, args.requestAnimationFrame);
      if (index === hovered) paintFill(ctx, segment, button.hoverBg ?? toneHoverBg(button.tone, theme, dark));
      paintPress(ctx, segment, dark, flash);
      const iconSize = Math.max(10, Math.min(16, Math.min(segment.width - 8, rect.height - 12)));
      if (iconSize <= 0) return;
      drawIcon(
        ctx,
        button.icon,
        segment.x + (segment.width - iconSize) / 2,
        rect.y + (rect.height - iconSize) / 2,
        iconSize,
        glyphColor(button.tone, theme, dark, index === hovered),
      );
    });

    if (hoverX !== undefined) args.overrideCursor?.(hovered >= 0 ? 'pointer' : 'default');
  },
  onClick: ({ cell, posX, bounds, preventDefault, location }) => {
    const data = cell.data;
    const laneSpec = data.lane ?? 'full';
    if (!isControlHit(posX, bounds.width, laneSpec)) return undefined;
    const startX = laneStart(bounds.width, laneSpec);
    const laneWidth = bounds.width - startX;
    const index = segmentIndex(startX, laneWidth, Math.max(1, data.buttons.length), posX);
    if (index < 0) return undefined;
    const button = data.buttons[index];
    PRESSED.set(pressKey(location[1], button.label), performance.now());
    button.onActivate?.();
    preventDefault();
    return undefined;
  },
};

/** The control renderers `GlideSheet` registers by default. */
export const controlCellRenderers: readonly CustomRenderer<any>[] = [
  kitPickerRenderer as CustomRenderer<any>,
  kitGlyphRenderer as CustomRenderer<any>,
  kitGlyphGroupRenderer as CustomRenderer<any>,
];
