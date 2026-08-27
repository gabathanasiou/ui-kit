"use client";
import React from 'react';

/**
 * Toolbar/action button — the shared button recipe so consumer toolbars stop
 * hand-writing bespoke styles.
 *
 * Variants:
 *  - `subtle`      — quiet toolbar button (menu triggers, secondary actions)
 *  - `primary`     — solid call-to-action (Save, Add, Print); light theme
 *                    supports cloud-project coloring via the `cloud` prop
 *  - `danger-ghost` — destructive action in text+ghost form
 *
 * Themes: `light` (default, light toolbars/pages) and `dark` (dark toolbars).
 * Sizes are baked in (toolbar micro scale); pass `className` for extras
 * (active/toggled states, width utilities). Hover styles are Tailwind
 * `hover:` variants — the consuming app's any-hover gate applies.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'subtle' | 'primary' | 'danger-ghost';
  theme?: 'light' | 'dark';
  /** Cloud-project coloring (light primary: blue-950 instead of zinc-900). */
  cloud?: boolean;
}

const BASE = 'inline-flex items-center gap-1.5 rounded text-xs font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed';

const VARIANTS: Record<'light' | 'dark', Record<NonNullable<ButtonProps['variant']>, string>> = {
  light: {
    subtle: 'px-2.5 py-1 text-zinc-600 hover:bg-zinc-200',
    primary: 'px-3 py-1 bg-zinc-900 hover:bg-zinc-800 text-white',
    'danger-ghost': 'px-2.5 py-1 text-rose-600 hover:bg-rose-50',
  },
  dark: {
    subtle: 'px-2.5 py-1 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800',
    primary: 'px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-white',
    'danger-ghost': 'px-2.5 py-1 text-red-400 hover:bg-rose-950/40',
  },
};

export default function Button({
  variant = 'subtle',
  theme = 'light',
  cloud = false,
  className = '',
  type = 'button',
  ...rest
}: ButtonProps) {
  let cls = VARIANTS[theme][variant];
  if (variant === 'primary' && theme === 'light' && cloud) {
    cls = 'px-3 py-1 bg-blue-950 hover:bg-blue-900 text-white';
  }
  return <button type={type} className={`${BASE} ${cls} ${className}`} {...rest} />;
}
