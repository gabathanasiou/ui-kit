"use client";
import { IS_COARSE, getCoarseScale, useCoarseSize } from './device';

/** The kit's text-input recipe — `.ui-input` token (bg/border/color/radius
 *  come from tokens.css per theme) + the modal/dialog sizing bump (touch
 *  devices get the coarse tap target, gated by the global coarseScale knob —
 *  setCoarseScale(0) renders desktop-sized fields everywhere). Consumers use
 *  this for any free-text field inside a Modal/Dialog/panel instead of
 *  hand-composing padding:
 *
 *    <input className={`w-full ${inputCls()}`} … />
 *
 * `size` picks the vertical rhythm: `'md'` (default, modal/dialog bodies) or
 *  `'sm'` (compact chrome fields). */
export function inputCls(size: 'md' | 'sm' = 'md'): string {
  const coarse = IS_COARSE && getCoarseScale() > 0;
  if (size === 'sm') {
    return `${coarse ? 'px-3 py-2 text-sm' : 'px-2 py-1.5 text-xs'} ui-input`;
  }
  return `${coarse ? 'px-4 py-3 text-sm' : 'px-3 py-2 text-xs'} ui-input`;
}

/** PROPORTIONAL input sizing (spread as an inline style next to `ui-input`):
 *  interpolates by the global coarseScale so fields scale with the slider. The
 *  `md` size is vertically MATCHED to the kit Button (same padding + font), so
 *  a textbox sits level with an adjacent button. Tailwind can't JIT runtime
 *  classes, hence inline styles. */
export function useInputSize(size: 'md' | 'sm' = 'md'): { padding: string; fontSize: string } {
  if (size === 'sm') {
    return useCoarseSize({ px: 8, py: 6, fs: 12 }, { px: 12, py: 8, fs: 14 });
  }
  // Matches Button subtle: desktop py-1 px-2.5 text-xs / coarse py-2 px-3.5 text-sm
  return useCoarseSize({ px: 10, py: 4, fs: 12 }, { px: 14, py: 8, fs: 14 });
}
