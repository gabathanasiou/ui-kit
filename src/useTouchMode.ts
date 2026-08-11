"use client";
import { IS_TOUCH_CAPABLE, isTouchLike, useLastPointerType } from './device';

/**
 * Whether to show touch-first UI (e.g. finger-sized targets, touch variants).
 * Defaults to the device's touch capability via the `(any-pointer: coarse)`
 * media query, then adapts to the most recent pointer type (trackpad/mouse on
 * touch-capable devices falls back to desktop UI). Pen counts as touch.
 */
export function useTouchMode(): boolean {
  const last = useLastPointerType();
  return IS_TOUCH_CAPABLE ? (last === null || isTouchLike(last)) : false;
}
