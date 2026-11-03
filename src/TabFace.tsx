"use client";
import React, { useEffect, useState } from 'react';
import { IS_COARSE } from './device';

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
  /** Opt back into the hover/active label morph on COARSE pointers (delayed
   *  200ms so it starts after the tap is handled). Only pass this when the
   *  control activates on pointerup (the kit `Button` does) — a click-only
   *  control must keep the safe state-driven reveal. */
  coarseReveal?: boolean;
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

const MOTION = 'transition-[grid-template-columns] ease-out duration-150 motion-reduce:transition-none';
/* Coarse pointers and geometry (roadmap 337/338). A label that expands on
   :hover/:active reflows the page mid-gesture, and iOS drops the tap's click
   when that happens — so the SAFE default is `fine:`-only hover geometry
   (state-driven reveals only). A consumer whose activation no longer depends
   on the click (the kit `Button` activates on pointerup) can opt back into the
   touch morph with `coarseReveal`: same reveal, but delayed 200ms so it starts
   after the tap has already been handled. */
const LABEL_STATES_SAFE = 'group-focus-visible:grid-cols-[1fr] group-data-[state=open]:grid-cols-[1fr] fine:group-hover:grid-cols-[1fr] fine:group-active:grid-cols-[1fr]';
const ICON_HIDDEN_STATES_SAFE = 'group-focus-visible:grid-cols-[0fr] group-data-[state=open]:grid-cols-[0fr] fine:group-hover:grid-cols-[0fr] fine:group-active:grid-cols-[0fr]';
const LABEL_SHOWN_STATES_SAFE = 'group-focus-visible:opacity-100 group-data-[state=open]:opacity-100 fine:group-hover:opacity-100 fine:group-active:opacity-100';
const LABEL_STATES_COARSE = 'group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] group-active:grid-cols-[1fr] group-data-[state=open]:grid-cols-[1fr]';
const ICON_HIDDEN_STATES_COARSE = 'group-hover:grid-cols-[0fr] group-focus-visible:grid-cols-[0fr] group-active:grid-cols-[0fr] group-data-[state=open]:grid-cols-[0fr]';
const LABEL_SHOWN_STATES_COARSE = 'group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100 group-data-[state=open]:opacity-100';

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

export function TabFace({ icon, collapse = false, iconWithLabel = true, active = false, gap = 6, reserve, roll = 'up', coarseReveal = false, children }: TabFaceProps) {
  const hasIcon = !!icon;
  const touchMorph = coarseReveal && IS_COARSE;
  const LAYOUT_DELAY = touchMorph ? ' delay-200' : '';
  const LABEL_STATES = touchMorph ? LABEL_STATES_COARSE : LABEL_STATES_SAFE;
  const ICON_HIDDEN_STATES = touchMorph ? ICON_HIDDEN_STATES_COARSE : ICON_HIDDEN_STATES_SAFE;
  const LABEL_SHOWN_STATES = touchMorph ? LABEL_SHOWN_STATES_COARSE : LABEL_SHOWN_STATES_SAFE;
  /* Dock/undock is a CONTINUOUS grid transition (roadmap 258): the SAME
     label/icon columns exist whether `collapse` is on or off, so flipping the
     toolbar into icon mode animates instead of swapping the DOM and snapping.
     `collapse` only decides the label's resting state:
       - undocked: the label is pinned open (the icon hides in swap mode);
       - docked:   the label opens for active/hover/focus/open intents. */
  const swap = hasIcon && !iconWithLabel;
  const docked = !!collapse;
  const labelOpen = active || !docked;
  const iconOpen = !swap || (docked && !active);

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

  /* No icon: the shell's own flex layout draws the face. */
  if (!hasIcon) return <>{children}</>;

  return (
    <>
      {swap ? (
        <span data-kit-icon className={`grid min-w-0 ${MOTION}${LAYOUT_DELAY} ${iconOpen ? `grid-cols-[1fr] ${ICON_HIDDEN_STATES}` : 'grid-cols-[0fr]'}`}>
          <span className="inline-flex min-w-0 items-center overflow-hidden">{iconFace}</span>
        </span>
      ) : (
        <span data-kit-icon className="shrink-0 inline-flex items-center justify-center">{iconFace}</span>
      )}
      <span data-kit-label className={`grid min-w-0 ${MOTION}${LAYOUT_DELAY} ${labelOpen ? 'grid-cols-[1fr]' : `grid-cols-[0fr] ${LABEL_STATES}`}`}>
        <span className="min-w-0 overflow-hidden">
          <span
            className={`flex min-w-0 items-center whitespace-nowrap transition-[opacity,padding-left] duration-100 group-hover:duration-150 motion-reduce:transition-none ${labelOpen ? 'opacity-100' : `opacity-0 ${LABEL_SHOWN_STATES}`} ${swap
              ? `pl-[var(--kit-collapse-gap)] group-focus-visible:pl-0! group-data-[state=open]:pl-0! ${touchMorph ? 'group-hover:pl-0! group-active:pl-0!' : 'fine:group-hover:pl-0! fine:group-active:pl-0!'} ${labelOpen ? 'pl-0!' : ''}`
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
