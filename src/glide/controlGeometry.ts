/**
 * Painted control geometry — the pure hit-test behind `controlCells.tsx`.
 *
 * A control cell owns a LANE at its right edge (or the whole cell, for a
 * full-bleed button). The renderer's `onClick` receives the pointer's local X
 * and the cell bounds, so deciding "was the lane hit?" must be one pure
 * function shared by every control kind — and unit-testable without a browser.
 */

/** The picker chevron lane (px at the cell's right edge). */
export const CONTROL_LANE = 24;
/** The default glyph lane (px at the cell's right edge). */
export const GLYPH_LANE = 28;
/** The painted press flash length (ms). */
export const PRESS_MS = 90;

export type ControlLane = number | 'full';

/** True when `localX` (cell-local px) lands in the control lane.
 *
 *  `'full'` makes the whole cell the target (a full-bleed glyph button). A
 *  numeric lane is measured from the RIGHT edge, like the chevron it paints. */
export function isControlHit(localX: number, width: number, lane: ControlLane): boolean {
  if (lane === 'full') return localX >= 0 && localX <= width;
  if (!Number.isFinite(localX) || width <= 0) return false;
  const start = width - Math.max(0, lane);
  return localX >= start && localX <= width;
}
