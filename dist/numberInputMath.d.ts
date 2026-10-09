/** Pure math behind the kit NumberInput (steppers, arrow keys, drag-scrub) —
 *  kept out of the component so the bounds/sensitivity rules are unit-tested
 *  without a browser. */
export declare function clampNumber(n: number, min: number, max: number): number;
/** One ±`step` move from `current`, clamped. Used by the stepper buttons and
 *  the ArrowUp/ArrowDown keys. */
export declare function steppedValue(current: number, dir: 1 | -1, min: number, max: number, step: number): number;
/** Drag-to-scrub sensitivity (Premiere/Resolve style): one `step` per N px of
 *  vertical travel. Larger ranges (heights, map sizes) are typed, not
 *  scrubbed — 2px keeps the small toolbar boxes controllable. */
export declare const SCRUB_PX_PER_STEP = 2;
/** Vertical drag mapping: dragging UP (`dyPx` = startY − clientY) increases.
 *  Snaps to whole steps and clamps, so the scrub can never leave the range. */
export declare function scrubbedValue(startValue: number, dyPx: number, min: number, max: number, step: number): number;
