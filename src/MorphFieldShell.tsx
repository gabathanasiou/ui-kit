"use client";
import React, { useLayoutEffect, useRef, useState } from 'react';
import { MORPH_MS } from './overlayMorph';

/**
 * The ONE button→text-box cross-fade shell. Layout only: it owns
 *  - the animated collapsed/expanded width,
 *  - the trigger layer that fades/scales out,
 *  - the absolutely-positioned field layer that fades/scales in.
 *
 * Behaviour (open/close state, focus, outside click, submit, actions) stays in
 * the component using it — `MorphSearchField`, `MorphActionField` and
 * `SearchMenu` compose this shell so a morph is never hand-rolled twice.
 */
export interface MorphFieldShellProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  expanded: boolean;
  /** Collapsed width in px, or `'auto'` — the root hugs the trigger, so an
   *  icon-first trigger (`Button collapse`) can EXPAND on hover without a
   *  reserved empty box. `auto` cannot CSS-transition, so the shell measures
   *  the live width on expand and starts the width animation from it (FLIP);
   *  closing snaps back (the trigger cross-fade covers it). */
  collapsedWidth: number | 'auto';
  expandedWidth: number;
  /** Collapsed button face (rendered inside the fading trigger layer). */
  trigger: React.ReactNode;
  /** Expanded field face (rendered inside the absolute field layer). */
  field: React.ReactNode;
  /** Positioning/anchor ref from the consumer. */
  rootRef?: React.Ref<HTMLDivElement>;
  /** Prevent flex shrinking (toolbar controls). Default false. */
  shrink?: boolean;
  /** Fill the container instead of hugging `collapsedWidth`: the whole box
   *  (and the expanded field) is 100% wide. For grid cells and full-width
   *  toolbars; the width morph becomes a cross-fade. */
  stretch?: boolean;
}

export function MorphFieldShell({
  expanded,
  collapsedWidth,
  expandedWidth,
  trigger,
  field,
  rootRef,
  shrink = false,
  stretch = false,
  className = '',
  style,
  ...rest
}: MorphFieldShellProps) {
  const innerRef = useRef<HTMLDivElement | null>(null);
  /** Live collapsed width (follows the hover-grow trigger). */
  const collapsedWRef = useRef<number | null>(null);
  /** Width the expand animation starts from (one pre-paint frame). */
  const [fromW, setFromW] = useState<number | null>(null);
  const setRoot = (node: HTMLDivElement | null) => {
    innerRef.current = node;
    if (typeof rootRef === 'function') rootRef(node);
    else if (rootRef) (rootRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
  };

  /* Track the auto width while collapsed (the trigger grows on hover). */
  useLayoutEffect(() => {
    if (expanded) return;
    const el = innerRef.current;
    if (!el) return;
    collapsedWRef.current = el.getBoundingClientRect().width;
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => {
      collapsedWRef.current = el.getBoundingClientRect().width;
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [expanded]);

  /* FLIP: paint one frame at the measured collapsed width, then let the
     existing 220ms width transition run to expandedWidth — otherwise an auto
     trigger's field pops in at full size ("the textbox just appears"). */
  useLayoutEffect(() => {
    if (!expanded || collapsedWidth !== 'auto') { setFromW(null); return; }
    setFromW(collapsedWRef.current);
    const raf = requestAnimationFrame(() => setFromW(null));
    return () => cancelAnimationFrame(raf);
  }, [expanded, collapsedWidth]);

  /** Close FLIP (auto triggers): hold expandedWidth for one frame, animate to
   *  the trigger's measured width, then hand the width back to `auto`. */
  const [closing, setClosing] = useState(false);
  const [closingTo, setClosingTo] = useState<number | null>(null);
  const wasExpandedRef = useRef(false);
  useLayoutEffect(() => {
    if (expanded) {
      wasExpandedRef.current = true;
      setClosing(false);
      setClosingTo(null);
      return;
    }
    if (!wasExpandedRef.current || collapsedWidth !== 'auto') return;
    wasExpandedRef.current = false;
    setClosing(true);
    let raf = 0;
    let timer = 0;
    const toTrigger = () => {
      const trigger = innerRef.current?.firstElementChild as HTMLElement | null;
      const w = trigger?.getBoundingClientRect().width ?? 0;
      if (w > 0) {
        raf = requestAnimationFrame(() => setClosingTo(w));
        timer = window.setTimeout(() => { setClosing(false); setClosingTo(null); }, MORPH_MS + 30);
      } else {
        setClosing(false);
      }
    };
    toTrigger();
    return () => { cancelAnimationFrame(raf); window.clearTimeout(timer); };
  }, [expanded, collapsedWidth]);

  const width = expanded
    ? (fromW ?? expandedWidth)
    : closing
      ? (closingTo ?? expandedWidth)
      : (collapsedWidth === 'auto' ? 'auto' : collapsedWidth);

  return (
    <div
      {...rest}
      ref={setRoot}
      className={`relative ${stretch ? 'flex' : 'inline-flex'} ${shrink ? 'shrink-0' : ''} ${className}`}
      style={{
        ...style,
        width: stretch ? '100%' : width,
        transition: 'width 220ms cubic-bezier(0.32, 0.72, 0, 1)',
      }}
    >
      <div
        className={`${stretch ? 'w-full' : collapsedWidth === 'auto' ? 'w-auto' : 'w-full'} origin-left ${expanded ? 'opacity-0 pointer-events-none' : 'opacity-100'} motion-reduce:transition-none`}
        style={{
          transform: expanded ? 'scaleX(0.98)' : 'scaleX(1)',
          transition: 'opacity 150ms ease, transform 220ms cubic-bezier(0.32, 0.72, 0, 1)',
        }}
        aria-hidden={expanded}
      >
        {trigger}
      </div>
      <div
        className={`absolute inset-0 origin-left ${expanded ? 'opacity-100' : 'opacity-0 pointer-events-none'} motion-reduce:transition-none`}
        style={{
          transform: expanded ? 'scaleX(1)' : 'scaleX(0.96)',
          transition: 'opacity 150ms ease, transform 220ms cubic-bezier(0.32, 0.72, 0, 1)',
        }}
        aria-hidden={!expanded}
      >
        {field}
      </div>
    </div>
  );
}

export default MorphFieldShell;
