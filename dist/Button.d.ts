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
export default function Button({ variant, theme, cloud, active, iconOnly, icon, collapse, iconWithLabel, className, type, children, ...rest }: ButtonProps): React.JSX.Element;
