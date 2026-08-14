"use client";
import React from 'react';
import { IS_COARSE } from './device';

/**
 * Themeable checkbox: a visually-hidden native input (a11y, focus, form
 * semantics) driving a CSS-variable-styled box with an optional label.
 * Sizes adapt for touch (IS_COARSE); hover styles live behind the
 * any-hover gate in tokens.css.
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
}

export default function Checkbox({ checked, onChange, disabled = false, label, id, className = '', labelClassName = '', theme }: CheckboxProps) {
  const boxCls = IS_COARSE ? 'w-5 h-5 rounded-md' : 'w-4 h-4 rounded';
  const markCls = IS_COARSE ? 'w-3.5 h-3.5' : 'w-3 h-3';
  const labelCls = IS_COARSE ? 'text-sm' : 'text-xs';
  return (
    <label
      className={`ui-checkbox ${disabled ? 'ui-disabled' : ''} ${className}`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: IS_COARSE ? 10 : 8 }}
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
      <span className={`ui-checkbox-box ${boxCls}`} aria-hidden>
        {checked && (
          <svg viewBox="0 0 12 12" fill="none" className={markCls} aria-hidden>
            <path d="M2 6.5 L5 9.5 L10 3" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label != null && <span className={`ui-checkbox-label ${labelCls} ${labelClassName}`}>{label}</span>}
    </label>
  );
}
