"use client";
import React from 'react';
import { IS_COARSE, useCoarseScale, useCoarseSize, coarsePx } from './device';
import { TabFace } from './TabFace';
import { useKitTheme, buttonCloudOf, type KitAccent } from './ThemeScope';

/**
 * Toolbar/action button — the shared button recipe so consumer toolbars stop
 * hand-writing bespoke styles.
 *
 * Variants:
 *  - `subtle`      — quiet toolbar button (menu triggers, secondary actions)
 *  - `primary`     — solid call-to-action (Save, Add, Print); the fill is the
 *                    project identity's HEADER step and deliberately survives
 *                    a neutral surface (see `identityAccent`); `cloud` forces
 *                    Drive blue / shared emerald where the scope has no identity
 *  - `solid`       — the raised, bordered modal primary (the footer-hero
 *                    recipe): mode-aware zinc by default, project accent on an
 *                    accent surface. Use it for a primary action INSIDE a
 *                    modal body; footers use `ModalFooterButton` (same tokens)
 *  - `outline`     — the quiet button WITH a visible outline: same box and
 *                    text weight as `subtle`, a 1px border painted as an inset
 *                    shadow (so it never changes the button's size), and the
 *                    same hover fill. Use it for a secondary action that must
 *                    read as a button at rest (empty states, side-by-side
 *                    choices, file dialogs).
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
  /** React 19 ref-as-prop: the ref lands on the underlying `<button>` (tab
   *  rows measure their buttons for the sliding pill). */
  ref?: React.Ref<HTMLButtonElement>;
  variant?: 'subtle' | 'primary' | 'solid' | 'outline' | 'danger-ghost' | 'tab' | 'tab-header';
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
  /** Fill used while `active` (base variants only; tabs keep their pill).
   *  `neutral` (default) = the kit's subtle selected tint. A semantic tone
   *  paints a strong status fill instead — for mode toggles whose ON state
   *  must read as a different colour (e.g. the Schedule's Editing mode). */
  activeTone?: 'neutral' | 'info' | 'success' | 'warning' | 'danger';
  /** Square icon-only shape (no label): equal width/height at the toolbar
   *  control size, contents centered. Pair with `aria-label`/`title`. */
  iconOnly?: boolean;
  /** `minimal` = the STANDARD 30px control box (radius 6, compact padding) —
   *  for search triggers and controls sitting beside a field. Form inputs
   *  (`inputCls('md')`) are the taller 34px box. */
  size?: 'default' | 'minimal';
  /** Bare icon at rest: the variant's box (fill / border / outline) is hidden
   *  until hover, keyboard focus or open. Pair with `collapse` for the full
   *  "icon → button" reveal (the label rides out with the box). An ACTIVE
   *  (lit) button keeps its box so a toggle still reads as on. */
  revealOnHover?: boolean;
  /** With `collapse` + `active`: whether the label stays open while lit.
   *  Default false — a toggle collapses back to its icon after the press.
   *  Pass true for a mode toggle whose ON label must stay readable; tab
   *  variants always keep the selected label. */
  keepLabelOnActive?: boolean;
  /** Width shim for a label that CHANGES (a toggle: Edit ↔ Done): the button
   *  keeps the width of whichever label is longer, so the press never shifts
   *  it. Pass the longest label text. */
  reserveLabel?: React.ReactNode;
  /** Direction of the icon-change roll when the icon swaps: `up` (advancing,
   *  default) or `down` (returning) — a toggle rolls back the way it came. */
  iconRoll?: 'up' | 'down';
  /** Leading icon — tab variants sit icon-first (before the label), inherits
   *  `currentColor`. */
  icon?: React.ReactNode;
  /** Icon-first tabs (roadmap 258): the label collapses to zero width and
   *  animates back over hover / keyboard focus / `active` / an open dropdown —
   *  the dock-style space saver. The label stays in the DOM (the accessible
   *  name never disappears — role/name queries keep working while collapsed).
   *  The resting pill is the icon + padding (symmetric); the button gap moves
   *  inside the clipped label. Requires `icon`; ignored by `iconOnly`. */
  collapse?: boolean;
  /** Icon ↔ label pairing for `collapse` tabs (roadmap 258). `true` (default)
   *  keeps the icon alongside the revealed label ("together"); `false` swaps
   *  them — the icon shows only while the label is hidden (the resting pill),
   *  and the label replaces it whenever it shows (active / hover / focus /
   *  open). On a labeled non-collapsing tab `false` drops the icon entirely. */
  iconWithLabel?: boolean;
}

/** The sliding fill behind a `tab` row (roadmap 258) — the fills the active
 *  classes used to paint. Render it with `useSlidingPill` (a `relative` row
 *  + the tabs' refs) so the selection box glides. On a `dark` toolbar
 *  `plain` is white — a zinc-950 pill vanished into the bar. */
export const TAB_PILL: Record<'light' | 'dark', Record<'plain' | 'blue' | 'emerald', string>> = {
  light: { plain: 'bg-zinc-950', blue: 'bg-[var(--ui-tab-pill-accent)]', emerald: 'bg-[var(--ui-tab-pill-accent)]' },
  dark: { plain: 'bg-white', blue: 'bg-[var(--ui-tab-pill-accent)]', emerald: 'bg-[var(--ui-tab-pill-accent)]' },
};

export default function Button({
  variant = 'subtle',
  theme: themeProp,
  cloud: cloudProp,
  active = false,
  activeTone = 'neutral',
  iconOnly = false,
  size: sizeProp = 'default',
  revealOnHover = false,
  keepLabelOnActive = false,
  reserveLabel,
  iconRoll = 'up',
  icon,
  collapse = false,
  iconWithLabel = true,
  className = '',
  type = 'button',
  children,
  ...rest
}: ButtonProps) {
  /* Ambient defaults: a surrounding ThemeScope owns the mode and the project
     accent; an explicit prop still wins. No scope keeps the historical
     light/default look. */
  const kit = useKitTheme();
  const theme = themeProp ?? kit?.mode ?? 'light';
  const cloud = cloudProp ?? buttonCloudOf(kit);
  /* Proportional coarse scaling: base sizes interpolate by the global scale
     (inline style — Tailwind can't JIT runtime classes). */
  const subtleSize = useCoarseSize({ px: 10, py: 6, fs: 12 }, { px: 14, py: 9, fs: 14 });
  const primarySize = useCoarseSize({ px: 12, py: 6, fs: 12 }, { px: 16, py: 9, fs: 14 });
  const tabSize = useCoarseSize({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 });
  const PAD = '';
  const PAD_PRIMARY = '';
  const BASE = `${revealOnHover ? 'ui-reveal ' : ''}ui-press inline-flex items-center font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed`;
  /* Header/mini tabs keep the 4px tab recipe: their SELECTED pill is drawn by
     the row (TAB_PILL) with `rounded`, so the button must match it. Control
     variants take the shared 6px control radius. */
  const TAB_RADIUS = 'rounded';
  const CONTROL_RADIUS = 'rounded-[var(--ui-radius-btn)]';

  /* The mini-tab recipe (PageToolbar sub-tabs): the row renders the measured
     fill pill (useSlidingPill + TAB_PILL below) — the button carries only the
     text color, so the selection box can glide between tabs (roadmap 258).
     `dark` theme only affects the inactive hover (the bar supplies contrast). */
  const TAB: Record<'light' | 'dark', { active: string; inactive: string }> = {
    light: {
      active: 'text-white',
      inactive: 'text-zinc-500 hover:text-zinc-900',
    },
    dark: {
      active: 'text-zinc-900',
      inactive: 'text-zinc-400 hover:text-zinc-200',
    },
  };

  /* Colored project accents — `blue` = Drive/cloud, `emerald` = shared. */
  type CloudTone = 'blue' | 'emerald';
  const CLOUD_TAB: Record<CloudTone, { active: string; inactiveLight: string; inactiveDark: string }> = {
    blue: {
      active: 'text-[color:var(--ui-tab-pill-accent-text)]',
      inactiveLight: 'text-[color:var(--ui-tab-inactive-light)] hover:bg-[var(--ui-tab-hover-light)] hover:text-[color:var(--ui-tab-inactive-light)]',
      inactiveDark: 'text-[color:var(--ui-tab-inactive-dark)] hover:text-white hover:bg-[var(--ui-tab-hover-dark)]',
    },
    emerald: {
      active: 'text-[color:var(--ui-tab-pill-accent-text)]',
      inactiveLight: 'text-[color:var(--ui-tab-inactive-light)] hover:bg-[var(--ui-tab-hover-light)] hover:text-[color:var(--ui-tab-inactive-light)]',
      inactiveDark: 'text-[color:var(--ui-tab-inactive-dark)] hover:text-white hover:bg-[var(--ui-tab-hover-dark)]',
    },
  };

  /* The top-tab recipe (AppHeader header tabs): quiet hover on the dark
     header; the ACTIVE fill is the sliding white pill the row renders around
     the tab (useSlidingPill, roadmap 258) — the button only carries the dark
     text, so the pill can glide between tabs. Pair `tab-header` with a pill. */
  const TAB_HEADER = {
    active: 'text-zinc-900',
    inactive: 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800',
    open: 'bg-zinc-800! text-white',
  } as const;

  const CLOUD_HEADER: Record<CloudTone, { active: string; inactive: string; open: string }> = {
    blue: {
      active: 'text-[color:var(--ui-tab-pill-accent-text)]',
      inactive: 'text-[color:var(--ui-tab-inactive-dark)] hover:text-white hover:bg-[var(--ui-tab-hover-dark)]',
      open: 'bg-[var(--ui-tab-open-bg)]! text-white',
    },
    emerald: {
      active: 'text-[color:var(--ui-tab-pill-accent-text)]',
      inactive: 'text-[color:var(--ui-tab-inactive-dark)] hover:text-white hover:bg-[var(--ui-tab-hover-dark)]',
      open: 'bg-[var(--ui-tab-open-bg)]! text-white',
    },
  };

  type BaseVariant = 'subtle' | 'primary' | 'solid' | 'outline' | 'danger-ghost';
  /* The registered raised primary — shared with ModalFooterButton's hero. */
  const SOLID = { base: `${PAD_PRIMARY} bg-[var(--ui-btn-solid-bg)] hover:bg-[var(--ui-btn-solid-hover-bg)] border border-[color:var(--ui-btn-solid-border)] hover:border-[color:var(--ui-btn-solid-hover-border)] text-[color:var(--ui-btn-solid-text)]`, open: 'bg-[var(--ui-btn-solid-hover-bg)]!' };
  const VARIANTS: Record<'light' | 'dark', Record<BaseVariant, { base: string; open: string }>> = {
    light: {
      subtle: { base: `${PAD} text-zinc-600 hover:bg-[var(--ui-btn-hover-bg)]`, open: 'bg-[var(--ui-btn-hover-bg)]! text-zinc-900' },
      /* The primary fill is the identity header step, mode-independent (the
         app header is always dark chrome). Read from the `data-identity-accent`
         block the button carries, so a neutral modal keeps its project CTA. */
      primary: { base: `${PAD_PRIMARY} bg-[var(--ui-btn-primary-bg)] hover:bg-[var(--ui-btn-primary-hover-bg)] text-white`, open: 'bg-[var(--ui-btn-primary-hover-bg)]!' },
      solid: SOLID,
      /* The outline is painted as an INSET SHADOW, not a border: the button
         keeps `subtle`'s exact box (same padding + height), so the two can sit
         side by side in a toolbar without a 2px step. */
      outline: {
        base: `${PAD} text-zinc-700 shadow-[inset_0_0_0_1px_var(--ui-border-strong)] hover:bg-[var(--ui-btn-hover-bg)] hover:text-zinc-900`,
        open: 'bg-[var(--ui-btn-hover-bg)]! text-zinc-900',
      },
      'danger-ghost': { base: `${PAD} text-rose-600 hover:bg-rose-50`, open: 'bg-rose-50!' },
    },
    dark: {
      subtle: { base: `${PAD} text-zinc-400 hover:text-zinc-200 hover:bg-[var(--ui-btn-hover-bg)]`, open: 'bg-[var(--ui-btn-hover-bg)]! text-zinc-200' },
      primary: { base: `${PAD_PRIMARY} bg-[var(--ui-btn-primary-bg)] hover:bg-[var(--ui-btn-primary-hover-bg)] text-white`, open: 'bg-[var(--ui-btn-primary-hover-bg)]!' },
      solid: SOLID,
      outline: {
        base: `${PAD} text-zinc-300 shadow-[inset_0_0_0_1px_var(--ui-border-strong)] hover:bg-[var(--ui-btn-hover-bg)] hover:text-zinc-100`,
        open: 'bg-[var(--ui-btn-hover-bg)]! text-zinc-100',
      },
      'danger-ghost': { base: `${PAD} text-red-400 hover:bg-rose-950/40`, open: 'bg-rose-950/40!' },
    },
  };

  const isOpen = (rest as { 'data-state'?: string })['data-state'] === 'open';
  const spec = VARIANTS[theme][variant as BaseVariant];
  const variantSize = variant === 'primary' || variant === 'solid' ? primarySize : variant.startsWith('tab') ? tabSize : subtleSize;
  /* Exact text-input box: `inputCls` uses IS_COARSE (not the coarse scale), so
     this intentionally follows the same switch (a 1px transparent border keeps
     the box model identical). */
  const minimalSize = IS_COARSE
    ? { padding: '8px 12px', fontSize: '14px', lineHeight: '20px', border: '1px solid transparent' }
    : { padding: '6px 8px', fontSize: '12px', lineHeight: '16px', border: '1px solid transparent' };
  const gap = coarsePx(6, 8, useCoarseScale());
  const iconDim = coarsePx(28, 40, useCoarseScale());
  const tone: CloudTone | null = cloud === 'emerald' ? 'emerald' : cloud ? 'blue' : null;
  /* The primary CTA reads the IDENTITY accent (not the neutralised kit.accent),
     so a Drive/shared main action keeps the project colour inside a neutral
     surface. An explicit `cloud` prop still forces blue/emerald. */
  const identityAccent: KitAccent =
    cloudProp === 'emerald' ? 'emerald'
      : cloudProp ? 'blue'
        : kit?.identityAccent ?? 'zinc';
  /* Toggled state: accent fill + white text (dark) / blue text (light). The
     `!` overrides beat the variant's base/`open` colors; no outline. */
  const ACTIVE = 'bg-[var(--ui-btn-active-bg)]! text-[color:var(--ui-btn-active-text)]!';
  /* Strong semantic ON state (activeTone) — a mode toggle that must read as a
     different colour, not the subtle selected tint. */
  const ACTIVE_TONES = {
    info: 'bg-blue-600! hover:bg-blue-500! text-white!',
    success: 'bg-emerald-600! hover:bg-emerald-500! text-white!',
    warning: 'bg-amber-500! hover:bg-amber-400! text-zinc-950!',
    danger: 'bg-rose-600! hover:bg-rose-500! text-white!',
  } as const;
  let cls: string;
  if (variant === 'tab') {
    const t = TAB[theme];
    cls = `${TAB_RADIUS} ${active
      ? (tone ? CLOUD_TAB[tone].active : t.active)
      : (tone ? CLOUD_TAB[tone][theme === 'light' ? 'inactiveLight' : 'inactiveDark'] : t.inactive)}`;
  } else if (variant === 'tab-header') {
    const fill = tone
      ? (active ? CLOUD_HEADER[tone].active : CLOUD_HEADER[tone].inactive)
      : (active ? TAB_HEADER.active : TAB_HEADER.inactive);
    cls = `${TAB_RADIUS} ${fill} ${isOpen ? (tone ? CLOUD_HEADER[tone].open : TAB_HEADER.open) : ''}`;
  } else {
    cls = `${CONTROL_RADIUS} ${spec.base} ${isOpen ? spec.open : ''}`;
    /* Applied AFTER the primary fill so a primary toggle's ON tone is never
       wiped by the project accent. */
    if (active) cls = `${cls} ${activeTone === 'neutral' ? ACTIVE : ACTIVE_TONES[activeTone]}`;
  }
  /* Icon-first collapse (roadmap 258) — the mechanics live in the shared
     TabFace (Seg options can adopt them); the button supplies the shell: the
     `group` for the hover/focus/open reveal, and gap 0 while collapsing (the
     face owns the icon↔label spacing then). */
  const collapsible = !!collapse && !!icon && !iconOnly;
  const sizing: React.CSSProperties = iconOnly
    ? { width: iconDim, height: iconDim, padding: 0, gap: 0 }
    : sizeProp === 'minimal'
      ? { ...minimalSize, gap: collapsible ? 0 : gap }
      : { ...variantSize, gap: collapsible ? 0 : gap };
  return (
    <button
      type={type}
      data-mode={theme}
      data-accent={kit?.accent}
      data-surface={kit?.surface}
      data-identity-accent={identityAccent}
      className={`${BASE} ${iconOnly ? 'justify-center' : ''} ${collapsible ? 'group' : ''} ${cls} ${className}`}
      /* A toggled base-variant button is a PRESSED toggle: expose it to AT
         (tabs are selections and use aria-selected/current instead). */
      aria-pressed={active && !variant.startsWith('tab') ? true : undefined}
      data-active={active || undefined}
      style={sizing}
      {...rest}
    >
      {iconOnly
        ? children
        : (
          <TabFace
            icon={icon}
            collapse={collapse}
            iconWithLabel={iconWithLabel}
            active={active && (variant.startsWith('tab') || keepLabelOnActive)}
            gap={gap}
            reserve={reserveLabel}
            roll={iconRoll}
          >
            {children}
          </TabFace>
        )}
    </button>
  );
}
