import React from 'react';
/**
 * The ONE numeric box — the `<input type="number">` recipe every toolbar,
 * designer panel and format bar shares. Typing model: the value is a draft
 * while focused (clear the box and type a fresh number); a clamped value
 * commits on change, Enter/blur finalizes, Escape reverts. Never a clamped
 * controlled input — clamping on change would snap the first keystroke away.
 *
 * On top of the typing model:
 *  - Right-aligned stacked chevron buttons step ±`step`, disabled at the
 *    bounds; their pointerdown is prevented so they never steal the draft's
 *    focus mid-typing.
 *  - ArrowUp/ArrowDown step the committed value.
 *  - MOUSE drag on the box scrubs (Premiere/Resolve style): drag up =
 *    increase, one `step` per `SCRUB_PX_PER_STEP` px, commits live. A plain
 *    click still focuses for typing; once the drag passes the threshold the
 *    box blurs and the value follows the pointer. Touch/pen keep scrolling.
 *
 * Two looks, one behavior:
 *  - Default — the kit's bordered box (`.ui-number-box`, the same
 *    border-only/hover-fill/muted-focus language as `.ui-input`), themed by
 *    `theme` or the ambient `[data-theme]`.
 *  - `className` — styles the input itself: existing call sites pass their
 *    toolbar/field classes; the wrapper goes bare and only adds the steppers.
 *
 * Sizes scale by the global coarseScale so coarse devices get real tap
 * targets; native number spinners are hidden (the chevrons replace them).
 */
export interface NumberInputProps {
    value: number | undefined;
    min: number;
    max: number;
    fallback: number;
    onCommit: (v: number) => void;
    /** Increment per stepper click / arrow key / scrub step (default 1). */
    step?: number;
    readOnly?: boolean;
    disabled?: boolean;
    ariaLabel?: string;
    /** Styles the input; when set the default box is skipped and the input
     *  keeps the consumer's own look. */
    className?: string;
    title?: string;
    /** Shown (and the box left empty) when `value` is unset — e.g. "Mixed". */
    placeholder?: string;
    /** Explicit color scope for the default box (like Checkbox); unset =
     *  inherit the ambient `[data-theme]`. */
    theme?: 'dark' | 'light' | 'blue';
}
export default function NumberInput({ value, min, max, fallback, onCommit, step, readOnly, disabled, ariaLabel, className, title, placeholder, theme, }: NumberInputProps): React.JSX.Element;
