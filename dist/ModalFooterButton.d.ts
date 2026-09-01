import React from 'react';
/**
 * Modal footer button — the canonical "one hero, rest ghost" recipe so
 * consumer modal footers stop hand-writing bespoke styles.
 *
 * Variants:
 *  - `hero`          — the ONE primary action (solid zinc-800, bordered)
 *  - `ghost`         — every other button (Cancel, secondary actions, Import)
 *  - `danger`        — destructive action in text+ghost form (Delete, left-aligned)
 *  - `danger-solid`  — destructive CONFIRM (red solid; Delete Selected, Wipe)
 *
 * Defaults to `hero`: in a single-button footer that one button IS the
 * primary action. Pass `className` for extras (mr-auto to left-align a
 * danger button, icon spacing is baked in). Hover styles are Tailwind
 * `hover:` variants — the consuming app's any-hover gate applies.
 */
export interface ModalFooterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'hero' | 'ghost' | 'danger' | 'danger-solid';
    /** Hero accent color — how the ONE primary action reads (default zinc).
     *  Color the Save/OK/Add button per context (e.g. `tone="accent"` blue). */
    tone?: 'zinc' | 'accent' | 'danger';
}
export default function ModalFooterButton({ variant, tone, className, type, ...rest }: ModalFooterButtonProps): React.JSX.Element;
