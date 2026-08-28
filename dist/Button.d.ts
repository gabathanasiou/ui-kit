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
export default function Button({ variant, theme, cloud, className, type, ...rest }: ButtonProps): React.JSX.Element;
