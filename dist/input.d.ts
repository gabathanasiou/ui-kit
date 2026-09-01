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
export declare function inputCls(size?: 'md' | 'sm'): string;
/** PROPORTIONAL input sizing (spread as an inline style next to `ui-input`):
 *  interpolates by the global coarseScale so fields scale with the slider. The
 *  `md` size is vertically MATCHED to the kit Button (same padding + font), so
 *  a textbox sits level with an adjacent button. Tailwind can't JIT runtime
 *  classes, hence inline styles. */
export declare function useInputSize(size?: 'md' | 'sm'): {
    padding: string;
    fontSize: string;
};
