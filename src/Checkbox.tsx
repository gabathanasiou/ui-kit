"use client";
import React from 'react';
import { useCoarseScale, coarsePx } from './device';

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
  className?: string;      // extra classes on the label row
  labelClassName?: string; // extra classes on the label text (match surrounding text)
  theme?: 'dark' | 'light' | 'blue'; // explicit color scope; unset = inherit ambient
  variant?: 'pill' | 'plain';
  tone?: 'accent' | 'danger';
  /** Block-level: spans the full width of its container (button-row look in modals). */
  block?: boolean;
}

export default function Checkbox({ checked, onChange, disabled = false, label, id, className = '', labelClassName = '', theme, variant = 'pill', tone = 'accent', block = false }: CheckboxProps) {
  const pill = variant !== 'plain';
  /* Proportional coarse scaling (inline — Tailwind can't JIT runtime classes). */
  const scale = useCoarseScale();
  const boxDim = coarsePx(16, 20, scale);
  const markDim = coarsePx(12, 14, scale);
  const labelFs = coarsePx(12, 14, scale);
  const pillPadX = coarsePx(12, 16, scale), pillPadY = coarsePx(10, 12, scale);
  const gap = coarsePx(8, 10, scale);
  const pillPad = pill ? `ui-checkbox-pill rounded-lg` : '';
  return (
    <label
      className={`ui-checkbox ${pillPad} ${tone === 'danger' ? 'ui-checkbox-tone-danger' : ''} ${disabled ? 'ui-disabled' : ''} ${className}`}
      style={{ display: block ? 'flex' : 'inline-flex', alignItems: 'center', gap, padding: pill ? `${pillPadY}px ${pillPadX}px` : undefined }}
      onClick={(e) => e.stopPropagation()}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      {pill ? (
        <span className="ui-check-indicator" aria-hidden>
          {checked ? (
            <svg viewBox="0 0 16 16" style={{ width: boxDim, height: boxDim }} aria-hidden>
              <rect x="1" y="1" width="14" height="14" rx="3.5" fill="currentColor" />
              <path d="M4.5 8.2 L7 10.7 L11.5 5.8" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" style={{ width: boxDim, height: boxDim }} aria-hidden>
              <rect x="1" y="1" width="14" height="14" rx="3.5" fill="none" stroke="currentColor" strokeWidth={1.5} />
            </svg>
          )}
        </span>
      ) : (
        <span className="ui-checkbox-box" style={{ width: boxDim, height: boxDim }} aria-hidden>
          {checked && (
            <svg viewBox="0 0 12 12" fill="none" style={{ width: markDim, height: markDim }} aria-hidden>
              <path d="M2 6.5 L5 9.5 L10 3" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
      )}
      {label != null && <span className={`ui-checkbox-label ${labelClassName}`} style={{ fontSize: labelFs }}>{label}</span>}
    </label>
  );
}
