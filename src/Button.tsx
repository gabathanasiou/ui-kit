"use client";
import React from 'react';
import { useCoarseScale, useCoarseSize, coarsePx } from './device';

/**
 * Toolbar/action button — the shared button recipe so consumer toolbars stop
 * hand-writing bespoke styles.
 *
 * Variants:
 *  - `subtle`      — quiet toolbar button (menu triggers, secondary actions)
 *  - `primary`     — solid call-to-action (Save, Add, Print); light theme
 *                    supports cloud-project coloring via the `cloud` prop
 *  - `danger-ghost` — destructive action in text+ghost form
 *  - `tab`         — the mini-tab recipe (PageToolbar sub-tabs): solid dark
 *                    pill when `active`, quiet hover otherwise
 *  - `tab-header`  — the top-tab recipe (AppHeader header tabs): inverted
 *                    white pill when `active`, quiet hover on the dark header
 *
 * Themes: `light` (default, light toolbars/pages) and `dark` (dark toolbars).
 * Sizes are baked in (toolbar micro scale; coarse-pointer devices — iPad —
 * get the touch-size bump like the rest of the kit, gated by the global
 * coarseScale knob); pass `className` for extras (active/toggled states, width
 * utilities). Hover styles are Tailwind `hover:` variants — the consuming
 * app's any-hover gate applies.
 *
 * For `tab`/`tab-header`, `active` means "this tab is selected" and applies the
 * variant's baked active fill (NOT the blue toggle tint the base variants use).
 *
 * DROPDOWN TRIGGERS: Radix sets `data-state="open"` on the trigger while its
 * menu is open — the button then keeps its HOVER look (the `open` class per
 * variant) so an open dropdown's trigger stays visibly pressed/active.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'subtle' | 'primary' | 'danger-ghost' | 'tab' | 'tab-header';
  theme?: 'light' | 'dark';
  /** Cloud-project coloring (light primary: blue-950 instead of zinc-900). */
  cloud?: boolean;
  /** Toggled/pressed state (e.g. a lit formatting-toolbar toggle) — applies an
   *  accent tint so the button reads as ON. On `tab`/`tab-header` it fills the
   *  selected-tab pill instead. */
  active?: boolean;
}

export default function Button({
  variant = 'subtle',
  theme = 'light',
  cloud = false,
  active = false,
  className = '',
  type = 'button',
  ...rest
}: ButtonProps) {
  /* Proportional coarse scaling: base sizes interpolate by the global scale
     (inline style — Tailwind can't JIT runtime classes). */
  const subtleSize = useCoarseSize({ px: 10, py: 4, fs: 12 }, { px: 14, py: 8, fs: 14 });
  const primarySize = useCoarseSize({ px: 12, py: 4, fs: 12 }, { px: 16, py: 8, fs: 14 });
  const tabSize = useCoarseSize({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 });
  const PAD = '';
  const PAD_PRIMARY = '';
  const BASE = 'inline-flex items-center rounded font-semibold transition cursor-pointer select-none whitespace-nowrap active:shadow-[inset_0_0_0_2px_var(--ui-panel-bg)] disabled:opacity-40 disabled:cursor-not-allowed';

  /* The mini-tab recipe (PageToolbar sub-tabs): a solid dark pill when active,
     quiet hover when not. `dark` theme only affects the inactive hover (the
     bar already supplies the contrast). */
  const TAB: Record<'light' | 'dark', { active: string; inactive: string; cloudActive: string; cloudInactive: string }> = {
    light: {
      active: 'bg-zinc-950 text-white',
      inactive: 'text-zinc-500 hover:text-zinc-900',
      cloudActive: 'bg-blue-950 text-blue-50',
      cloudInactive: 'text-blue-950 hover:bg-blue-950/10 hover:text-blue-950',
    },
    dark: {
      active: 'bg-zinc-950 text-white',
      inactive: 'text-zinc-500 hover:text-zinc-300',
      cloudActive: 'bg-blue-950 text-blue-50',
      cloudInactive: 'text-zinc-500 hover:text-zinc-300',
    },
  };

  /* The top-tab recipe (AppHeader header tabs): an inverted white pill when
     active on the dark header, quiet hover otherwise. */
  const TAB_HEADER = {
    active: 'bg-white text-zinc-900',
    inactive: 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800',
    open: 'bg-zinc-800! text-white',
    cloudActive: 'bg-white text-blue-950',
    cloudInactive: 'text-white/70 hover:text-white hover:bg-blue-900/60',
    cloudOpen: 'bg-blue-900/60! text-white',
  } as const;

  type BaseVariant = 'subtle' | 'primary' | 'danger-ghost';
  const VARIANTS: Record<'light' | 'dark', Record<BaseVariant, { base: string; open: string }>> = {
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

  const isOpen = (rest as { 'data-state'?: string })['data-state'] === 'open';
  const spec = VARIANTS[theme][variant as BaseVariant];
  const size = variant === 'primary' ? primarySize : variant.startsWith('tab') ? tabSize : subtleSize;
  const gap = coarsePx(6, 8, useCoarseScale());
  /* Toggled state: accent fill + white text (dark) / blue text (light). The
     `!` overrides beat the variant's base/`open` colors; no outline. */
  const ACTIVE = theme === 'dark'
    ? 'bg-blue-900/50! text-white!'
    : 'bg-blue-50! text-blue-700!';
  let cls: string;
  if (variant === 'tab') {
    const t = TAB[theme];
    cls = active ? (cloud ? t.cloudActive : t.active) : (cloud ? t.cloudInactive : t.inactive);
  } else if (variant === 'tab-header') {
    const fill = active ? (cloud ? TAB_HEADER.cloudActive : TAB_HEADER.active) : (cloud ? TAB_HEADER.cloudInactive : TAB_HEADER.inactive);
    cls = `${fill} ${isOpen ? (cloud ? TAB_HEADER.cloudOpen : TAB_HEADER.open) : ''}`;
  } else {
    cls = `${spec.base} ${isOpen ? spec.open : ''}`;
    if (active) cls = `${cls} ${ACTIVE}`;
    if (variant === 'primary' && theme === 'light' && cloud) {
      cls = isOpen ? `${CLOUD_PRIMARY_BASE} ${CLOUD_PRIMARY_OPEN}` : CLOUD_PRIMARY_BASE;
    }
  }
  return <button type={type} className={`${BASE} ${cls} ${className}`} style={{ ...size, gap }} {...rest} />;
}
