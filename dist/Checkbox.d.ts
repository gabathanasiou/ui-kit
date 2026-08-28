import React from 'react';
/**
 * Themeable checkbox: a visually-hidden native input (a11y, focus, form
 * semantics) driving a CSS-variable-styled indicator with an optional label.
 *
 * Variants:
 *  - `pill` (default) — button-like row: background + border + padding,
 *    rounded square outline that fills with the tone color when checked
 *    (the "Don't ask again" delete-warning look).
 *  - `plain` — flat transparent box with a border (dense lists, inside
 *    existing card rows).
 *
 * Tones (checked indicator color): `accent` (blue, default) | `danger` (red).
 * Sizes adapt for touch (IS_COARSE); hover styles live behind the any-hover
 * gate in tokens.css.
 */
export interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    label?: React.ReactNode;
    id?: string;
    className?: string;
    labelClassName?: string;
    theme?: 'dark' | 'light' | 'blue';
    variant?: 'pill' | 'plain';
    tone?: 'accent' | 'danger';
    /** Block-level: spans the full width of its container (button-row look in modals). */
    block?: boolean;
}
export default function Checkbox({ checked, onChange, disabled, label, id, className, labelClassName, theme, variant, tone, block }: CheckboxProps): React.JSX.Element;
