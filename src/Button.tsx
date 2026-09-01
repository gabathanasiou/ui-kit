"use client";
import React from 'react';
import { IS_COARSE } from './device';

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
 * Sizes are baked in (toolbar micro scale; coarse-pointer devices — iPad —
 * get the touch-size bump like the rest of the kit); pass `className` for
 * extras (active/toggled states, width utilities). Hover styles are Tailwind
 * `hover:` variants — the consuming app's any-hover gate applies.
 *
 * DROPDOWN TRIGGERS: Radix sets `data-state="open"` on the trigger while its
 * menu is open — the button then keeps its HOVER look (the `open` class per
 * variant) so an open dropdown's trigger stays visibly pressed/active.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'subtle' | 'primary' | 'danger-ghost';
  theme?: 'light' | 'dark';
  /** Cloud-project coloring (light primary: blue-950 instead of zinc-900). */
  cloud?: boolean;
}

const PAD = IS_COARSE ? 'px-3.5 py-2 text-sm' : 'px-2.5 py-1 text-xs';
const PAD_PRIMARY = IS_COARSE ? 'px-4 py-2 text-sm' : 'px-3 py-1 text-xs';

const BASE = `inline-flex items-center rounded font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed ${IS_COARSE ? 'gap-2' : 'gap-1.5'}`;

type VariantSpec = { base: string; open: string };

const VARIANTS: Record<'light' | 'dark', Record<NonNullable<ButtonProps['variant']>, VariantSpec>> = {
  light: {
    subtle: { base: `${PAD} text-zinc-600 hover:bg-zinc-200`, open: 'bg-zinc-200! text-zinc-900' },
    primary: { base: `${PAD_PRIMARY} bg-zinc-900 hover:bg-zinc-800 text-white`, open: 'bg-zinc-800!' },
    'danger-ghost': { base: `${PAD} text-rose-600 hover:bg-rose-50`, open: 'bg-rose-50!' },
  },
  dark: {
    subtle: { base: `${PAD} text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800`, open: 'bg-zinc-800! text-zinc-300' },
    primary: { base: `${PAD_PRIMARY} bg-zinc-800 hover:bg-zinc-700 text-white`, open: 'bg-zinc-700!' },
    'danger-ghost': { base: `${PAD} text-red-400 hover:bg-rose-950/40`, open: 'bg-rose-950/40!' },
  },
};

const CLOUD_PRIMARY_BASE = `${PAD_PRIMARY} bg-blue-950 hover:bg-blue-900 text-white`;
const CLOUD_PRIMARY_OPEN = 'bg-blue-900!';

export default function Button({
  variant = 'subtle',
  theme = 'light',
  cloud = false,
  className = '',
  type = 'button',
  ...rest
}: ButtonProps) {
  const isOpen = (rest as { 'data-state'?: string })['data-state'] === 'open';
  const spec = VARIANTS[theme][variant];
  let cls = `${spec.base} ${isOpen ? spec.open : ''}`;
  if (variant === 'primary' && theme === 'light' && cloud) {
    cls = isOpen ? `${CLOUD_PRIMARY_BASE} ${CLOUD_PRIMARY_OPEN}` : CLOUD_PRIMARY_BASE;
  }
  return <button type={type} className={`${BASE} ${cls} ${className}`} {...rest} />;
}
