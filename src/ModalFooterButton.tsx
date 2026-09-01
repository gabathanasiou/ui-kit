"use client";
import React from 'react';
import { useCoarseSize } from './device';

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
export interface ModalFooterButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'hero' | 'ghost' | 'danger' | 'danger-solid';
  /** Hero accent color — how the ONE primary action reads (default zinc).
   *  Color the Save/OK/Add button per context (e.g. `tone="accent"` blue). */
  tone?: 'zinc' | 'accent' | 'danger';
}

const BASE = `inline-flex items-center gap-2 rounded-lg text-xs transition cursor-pointer select-none whitespace-nowrap active:shadow-[inset_0_0_0_2px_var(--ui-panel-bg)]`;

/* The hero primary-action fill, colorable by tone. The border is kept lighter
   than the fill on hover so the button never loses its edge (bg-zinc-700 on
   a zinc-700 border used to vanish). */
const HERO_TONES: Record<NonNullable<ModalFooterButtonProps['tone']>, string> = {
  zinc: 'bg-zinc-800 text-white font-semibold border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-500 disabled:opacity-40 disabled:cursor-not-allowed',
  accent: 'bg-blue-600 text-white font-semibold border border-blue-500 hover:bg-blue-500 hover:border-blue-400 disabled:opacity-40 disabled:cursor-not-allowed',
  danger: 'bg-red-600 text-white font-semibold border border-red-500 hover:bg-red-500 hover:border-red-400 disabled:opacity-40 disabled:cursor-not-allowed',
};

const VARIANTS: Record<Exclude<NonNullable<ModalFooterButtonProps['variant']>, 'hero'>, string> = {
  /* Transparent border on every variant — auto-height buttons add the border
     to their height, so the bordered hero would otherwise be 2px taller. */
  ghost: 'border border-transparent text-zinc-400 font-medium hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-50',
  danger: 'border border-transparent text-red-400 font-medium hover:bg-red-900/30 hover:text-red-300 disabled:opacity-50',
  'danger-solid':
    'border border-transparent bg-red-600 text-white font-semibold hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed',
};

export default function ModalFooterButton({
  variant = 'hero',
  tone = 'zinc',
  className = '',
  type = 'button',
  ...rest
}: ModalFooterButtonProps) {
  const size = useCoarseSize({ px: 24, py: 8, fs: 12 }, { px: 28, py: 10, fs: 14 });
  return (
    <button
      type={type}
      style={size}
      className={`${BASE} ${variant === 'hero' ? HERO_TONES[tone] : VARIANTS[variant]} ${className}`}
      {...rest}
    />
  );
}
