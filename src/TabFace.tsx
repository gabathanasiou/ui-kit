"use client";
import React, { useEffect, useState } from 'react';

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
  /** Width shim: rendered invisibly beside the label so the tab keeps the
   *  width of its LONGEST label. A toggle that swaps its label (Edit ↔ Done)
   *  then never changes width mid-press. */
  reserve?: React.ReactNode;
  /** Icon-change roll direction: `up` advances (default), `down` rolls back —
   *  so returning to a previous icon comes from the side it left by. */
  roll?: 'up' | 'down';
  children?: React.ReactNode;
}

const MOTION = 'transition-[grid-template-columns] ease-out duration-150 group-hover:duration-200 motion-reduce:transition-none';
const LABEL_STATES = 'group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] group-data-[state=open]:grid-cols-[1fr]';
const ICON_HIDDEN_STATES = 'group-hover:grid-cols-[0fr] group-focus-visible:grid-cols-[0fr] group-data-[state=open]:grid-cols-[0fr]';
const LABEL_SHOWN_STATES = 'group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[state=open]:opacity-100';

/** Stable-enough identity for a React icon node: a new element object is
 *  created on every render, so a reference check would re-animate constantly.
 *  Type + the sizing class/props covers the real swaps (Pencil ↔ Check). */
function iconSignature(node: React.ReactNode): string {
  if (!React.isValidElement(node)) return String(node ?? '');
  const type = node.type as { displayName?: string; name?: string } | string;
  const name = typeof type === 'string' ? type : (type.displayName || type.name || 'icon');
  const props = node.props as Record<string, unknown>;
  return `${name}|${props.className ?? ''}|${props.size ?? ''}`;
}

export function TabFace({ icon, collapse = false, iconWithLabel = true, active = false, gap = 6, reserve, roll = 'up', children }: TabFaceProps) {
  const collapsible = !!collapse && !!icon;
  const swap = collapsible && !iconWithLabel;
  const showIcon = !!icon && (iconWithLabel || collapsible);

  /* Icon-change animation: when the icon node MEANINGFULLY changes (Pencil →
     Check) the old glyph rolls out and the new one rolls in. Driven from a
     previous-render state (React's "adjust state when a prop changes"
     pattern) so the animated face lands in the SAME commit as the new icon —
     an effect would paint the new glyph once, then restart it from below.
     The swapped face only exists while the roll is in flight. */
  const sig = iconSignature(icon);
  const [prev, setPrev] = useState<{ sig: string; node: React.ReactNode }>({ sig, node: icon });
  const [outgoing, setOutgoing] = useState<React.ReactNode>(null);
  if (sig !== prev.sig) {
    setPrev({ sig, node: icon });
    setOutgoing(prev.node);
  }
  useEffect(() => {
    if (outgoing == null) return;
    const timer = window.setTimeout(() => setOutgoing(null), 200);
    return () => window.clearTimeout(timer);
  }, [outgoing]);

  /* A vertical ROLL, not a cross-fade: the old glyph scrolls up out of the
     clipped box while the new one scrolls up into place (the iOS/macOS
     state-change feel). The incoming icon is in normal flow (it owns the box
     size); the outgoing one overlays it and is clipped.
     ONLY rendered while a change is in flight: at every other moment the
     icon keeps its plain node. An always-on wrapper is a flex item with a
     14px min-content size, so a collapsing (icon → label) face CLIPPED the
     glyph into a sliver instead of shrinking it away — the pre-roll squish
     is the wanted motion. */
  const iconFace = outgoing == null ? icon : (
    <span className="relative inline-flex items-center justify-center overflow-hidden">
      <span key={`out:${prev.sig}`} aria-hidden className={`ui-icon-roll-out${roll === 'down' ? '-down' : ''} absolute inset-0 inline-flex items-center justify-center`}>
        {outgoing}
      </span>
      <span key={`in:${sig}`} className={`ui-icon-roll-in${roll === 'down' ? '-down' : ''} inline-flex items-center justify-center`}>
        {icon}
      </span>
    </span>
  );

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
          <span className="inline-flex min-w-0 items-center overflow-hidden">{iconFace}</span>
        </span>
      ) : (
        <span data-kit-icon className="shrink-0 inline-flex items-center justify-center">{iconFace}</span>
      ))}
      <span data-kit-label className={`grid min-w-0 ${MOTION} ${active ? 'grid-cols-[1fr]' : `grid-cols-[0fr] ${LABEL_STATES}`}`}>
        <span className="min-w-0 overflow-hidden">
          <span
            className={`flex min-w-0 items-center whitespace-nowrap transition-[opacity,padding-left] duration-100 group-hover:duration-150 motion-reduce:transition-none ${active ? 'opacity-100' : `opacity-0 ${LABEL_SHOWN_STATES}`} ${swap
              ? `pl-[var(--kit-collapse-gap)] group-hover:pl-0! group-focus-visible:pl-0! group-data-[state=open]:pl-0! ${active ? 'pl-0!' : ''}`
              : ''}`}
            style={swap ? ({ '--kit-collapse-gap': `${gap}px` } as React.CSSProperties) : { paddingLeft: gap }}
          >
            {reserve ? (
              <span className="inline-grid min-w-0">
                <span aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">{reserve}</span>
                <span className="col-start-1 row-start-1">{children}</span>
              </span>
            ) : children}
          </span>
        </span>
      </span>
    </>
  );
}
