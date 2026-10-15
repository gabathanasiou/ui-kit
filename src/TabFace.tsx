"use client";
import React from 'react';

/**
 * The icon ↔ label face of a tab (roadmap 258) — the collapsing mechanics,
 * shared by `Button`'s tab variants and available to `Seg` options so a
 * segmented control can adopt the same behavior.
 *
 * Render it INSIDE the hover/active owner (the `Button` / segment), which
 * must carry the `group` class and a `group`-aware layout when `collapse` is
 * on: the labels/icon reveal over `:hover`, `:focus-visible`, `[data-state=
 * open]` and `active`. The label NEVER leaves the DOM while collapsed, so the
 * accessible name (role queries, screen readers) stays intact.
 *
 * - `collapse` (needs `icon`): the label rides a `grid-template-columns`
 *   0fr ↔ 1fr column (auto width, no measurement); the icon↔label gap moves
 *   INTO the clipped label — the shell must then use `gap: 0` (the caller
 *   passes `gap` for the inner spacing; the runtime coarse scale should come
 *   from `coarsePx`).
 * - `iconWithLabel={false}` swaps the pair: the icon is itself a collapsing
 *   column, hidden while the label shows; on a non-collapsing tab the icon is
 *   dropped entirely (the label is the face).
 * - Motion is ~150ms in / 200ms out and is skipped under
 *   `prefers-reduced-motion`.
 */
export interface TabFaceProps {
  icon?: React.ReactNode;
  collapse?: boolean;
  iconWithLabel?: boolean;
  active?: boolean;
  /** Icon ↔ label gap in px (the caller's coarse-scaled value). */
  gap?: number;
  children?: React.ReactNode;
}

const MOTION = 'transition-[grid-template-columns] ease-out duration-150 group-hover:duration-200 motion-reduce:transition-none';
const LABEL_STATES = 'group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] group-data-[state=open]:grid-cols-[1fr]';
const ICON_HIDDEN_STATES = 'group-hover:grid-cols-[0fr] group-focus-visible:grid-cols-[0fr] group-data-[state=open]:grid-cols-[0fr]';
const LABEL_SHOWN_STATES = 'group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[state=open]:opacity-100';

export function TabFace({ icon, collapse = false, iconWithLabel = true, active = false, gap = 6, children }: TabFaceProps) {
  const collapsible = !!collapse && !!icon;
  const swap = collapsible && !iconWithLabel;
  const showIcon = !!icon && (iconWithLabel || collapsible);

  /* No collapsing surface: the shell's own flex layout draws the face
     (plain labeled buttons keep their exact previous DOM). */
  if (!collapsible) {
    return (
      <>
        {showIcon && <span data-kit-icon className="shrink-0 inline-flex items-center justify-center">{icon}</span>}
        {children}
      </>
    );
  }

  return (
    <>
      {showIcon && (swap ? (
        <span data-kit-icon className={`grid min-w-0 ${MOTION} ${active ? 'grid-cols-[0fr]' : `grid-cols-[1fr] ${ICON_HIDDEN_STATES}`}`}>
          <span className="inline-flex min-w-0 items-center overflow-hidden">{icon}</span>
        </span>
      ) : (
        <span data-kit-icon className="shrink-0 inline-flex items-center justify-center">{icon}</span>
      ))}
      <span data-kit-label className={`grid min-w-0 ${MOTION} ${active ? 'grid-cols-[1fr]' : `grid-cols-[0fr] ${LABEL_STATES}`}`}>
        <span className="min-w-0 overflow-hidden">
          <span
            className={`flex min-w-0 items-center whitespace-nowrap transition-[opacity,padding-left] duration-100 group-hover:duration-150 motion-reduce:transition-none ${active ? 'opacity-100' : `opacity-0 ${LABEL_SHOWN_STATES}`} ${swap
              ? `pl-[var(--kit-collapse-gap)] group-hover:pl-0! group-focus-visible:pl-0! group-data-[state=open]:pl-0! ${active ? 'pl-0!' : ''}`
              : ''}`}
            style={swap ? ({ '--kit-collapse-gap': `${gap}px` } as React.CSSProperties) : { paddingLeft: gap }}
          >
            {children}
          </span>
        </span>
      </span>
    </>
  );
}
