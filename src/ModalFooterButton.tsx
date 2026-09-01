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
}

const BASE = `inline-flex items-center gap-2 rounded-lg text-xs transition-colors cursor-pointer select-none whitespace-nowrap`;

const VARIANTS: Record<NonNullable<ModalFooterButtonProps['variant']>, string> = {
  hero: 'bg-zinc-800 text-white font-semibold border border-zinc-700 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed',
  ghost: 'text-zinc-400 font-medium hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-50',
  danger: 'text-red-400 font-medium hover:bg-red-900/30 hover:text-red-300 disabled:opacity-50',
  'danger-solid':
    'bg-red-600 text-white font-semibold hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed',
};

export default function ModalFooterButton({
  variant = 'hero',
  className = '',
  type = 'button',
  ...rest
}: ModalFooterButtonProps) {
  const size = useCoarseSize({ px: 24, py: 8, fs: 12 }, { px: 28, py: 10, fs: 14 });
  return (
    <button
      type={type}
      style={size}
      className={`${BASE} ${VARIANTS[variant]} ${className}`}
      {...rest}
    />
  );
}
