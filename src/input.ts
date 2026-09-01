"use client";
import { IS_COARSE } from './device';

/** The kit's text-input recipe — `.ui-input` token (bg/border/color/radius
 *  come from tokens.css per theme) + the modal/dialog sizing bump (touch
 *  devices get the coarse tap target). Consumers use this for any free-text
 *  field inside a Modal/Dialog/panel instead of hand-composing padding:
 *
 *    <input className={`w-full ${inputCls()}`} … />
 *
 * `size` picks the vertical rhythm: `'md'` (default, modal/dialog bodies) or
 *  `'sm'` (compact chrome fields). */
export function inputCls(size: 'md' | 'sm' = 'md'): string {
  if (size === 'sm') {
    return `${IS_COARSE ? 'px-3 py-2 text-sm' : 'px-2 py-1.5 text-xs'} ui-input`;
  }
  return `${IS_COARSE ? 'px-3.5 py-2.5 text-sm' : 'px-2.5 py-1.5 text-xs'} ui-input`;
}
