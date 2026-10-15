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
  /** Colored project-chrome accent: `true` = blue (Drive/cloud projects),
   *  `'emerald'` = the shared/collaborative green. Affects the light
   *  `primary` fill and the `tab` / `tab-header` palettes; other
   *  variants are unaffected. */
  cloud?: boolean | 'emerald';
  /** Toggled/pressed state (e.g. a lit formatting-toolbar toggle) — applies an
   *  accent tint so the button reads as ON. On `tab`/`tab-header` it fills the
   *  selected-tab pill instead. */
  active?: boolean;
  /** Square icon-only shape (no label): equal width/height at the toolbar
   *  control size, contents centered. Pair with `aria-label`/`title`. */
  iconOnly?: boolean;
}

export default function Button({
  variant = 'subtle',
  theme = 'light',
  cloud = false,
  active = false,
  iconOnly = false,
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
  const BASE = 'inline-flex items-center rounded font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed';

  /* The mini-tab recipe (PageToolbar sub-tabs): a solid dark pill when active,
     quiet hover when not. `dark` theme only affects the inactive hover (the
     bar already supplies the contrast). The colored project accents (cloud)
     swap the pill + labels to the chrome's tint. */
  const TAB: Record<'light' | 'dark', { active: string; inactive: string }> = {
    light: {
      active: 'bg-zinc-950 text-white',
      inactive: 'text-zinc-500 hover:text-zinc-900',
    },
    dark: {
      active: 'bg-zinc-950 text-white',
      inactive: 'text-zinc-500 hover:text-zinc-300',
    },
  };

  /* Colored project accents — `blue` = Drive/cloud, `emerald` = shared. */
  type CloudTone = 'blue' | 'emerald';
  const CLOUD_TAB: Record<CloudTone, { active: string; inactiveLight: string; inactiveDark: string }> = {
    blue: {
      active: 'bg-blue-950 text-blue-50',
      inactiveLight: 'text-blue-950 hover:bg-blue-950/10 hover:text-blue-950',
      inactiveDark: 'text-zinc-500 hover:text-zinc-300',
    },
    emerald: {
      active: 'bg-emerald-950 text-emerald-50',
      inactiveLight: 'text-emerald-950 hover:bg-emerald-950/10 hover:text-emerald-950',
      inactiveDark: 'text-zinc-500 hover:text-zinc-300',
    },
  };

  /* The top-tab recipe (AppHeader header tabs): an inverted white pill when
     active on the dark header, quiet hover otherwise. */
  const TAB_HEADER = {
    active: 'bg-white text-zinc-900',
    inactive: 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800',
    open: 'bg-zinc-800! text-white',
  } as const;

  const CLOUD_HEADER: Record<CloudTone, { active: string; inactive: string; open: string }> = {
    blue: {
      active: 'bg-white text-blue-950',
      inactive: 'text-white/70 hover:text-white hover:bg-blue-900/60',
      open: 'bg-blue-900/60! text-white',
    },
    emerald: {
      active: 'bg-white text-emerald-950',
      inactive: 'text-white/70 hover:text-white hover:bg-emerald-900/60',
      open: 'bg-emerald-900/60! text-white',
    },
  };

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

  const CLOUD_PRIMARY: Record<CloudTone, { base: string; open: string }> = {
    blue: { base: `${PAD_PRIMARY} bg-blue-950 hover:bg-blue-900 text-white`, open: 'bg-blue-900!' },
    emerald: { base: `${PAD_PRIMARY} bg-emerald-950 hover:bg-emerald-900 text-white`, open: 'bg-emerald-900!' },
  };

  const isOpen = (rest as { 'data-state'?: string })['data-state'] === 'open';
  const spec = VARIANTS[theme][variant as BaseVariant];
  const size = variant === 'primary' ? primarySize : variant.startsWith('tab') ? tabSize : subtleSize;
  const gap = coarsePx(6, 8, useCoarseScale());
  const iconDim = coarsePx(28, 40, useCoarseScale());
  const tone: CloudTone | null = cloud === 'emerald' ? 'emerald' : cloud ? 'blue' : null;
  /* Toggled state: accent fill + white text (dark) / blue text (light). The
     `!` overrides beat the variant's base/`open` colors; no outline. */
  const ACTIVE = theme === 'dark'
    ? 'bg-blue-900/50! text-white!'
    : 'bg-blue-50! text-blue-700!';
  let cls: string;
  if (variant === 'tab') {
    const t = TAB[theme];
    cls = active
      ? (tone ? CLOUD_TAB[tone].active : t.active)
      : (tone ? CLOUD_TAB[tone][theme === 'light' ? 'inactiveLight' : 'inactiveDark'] : t.inactive);
  } else if (variant === 'tab-header') {
    const fill = tone
      ? (active ? CLOUD_HEADER[tone].active : CLOUD_HEADER[tone].inactive)
      : (active ? TAB_HEADER.active : TAB_HEADER.inactive);
    cls = `${fill} ${isOpen ? (tone ? CLOUD_HEADER[tone].open : TAB_HEADER.open) : ''}`;
  } else {
    cls = `${spec.base} ${isOpen ? spec.open : ''}`;
    if (active) cls = `${cls} ${ACTIVE}`;
    if (variant === 'primary' && theme === 'light' && tone) {
      const cp = CLOUD_PRIMARY[tone];
      cls = isOpen ? `${cp.base} ${cp.open}` : cp.base;
    }
  }
  const sizing = iconOnly
    ? { width: iconDim, height: iconDim, padding: 0, gap: 0 }
    : { ...size, gap };
  return <button type={type} className={`${BASE} ${iconOnly ? 'justify-center' : ''} ${cls} ${className}`} style={sizing} {...rest} />;
}
