"use client";
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import type { RefObject } from 'react';

/**
 * Opening a surface that already holds a value ("dropdown with a selected
 * thing") is ONE behaviour, shared by every picker in the kit and the apps:
 *
 * 1. The row for the current value is revealed **before the surface's first
 *    paint** — the list is already in place when it becomes visible, exactly
 *    like a native `<select>` popup, which is shown pre-scrolled.
 * 2. The list **never scrolls itself again once the pointer has engaged it**.
 *    A row that moves between mousedown and mouseup is a different node by
 *    click time; the browser then drops the click on the row (the "I have to
 *    click twice" bug).
 * 3. Scrolling is done on the surface's OWN scroll container, never with
 *    `scrollIntoView` — that also scrolls the page / enclosing modal, moving
 *    the surface under the pointer.
 *
 * Use `useRevealRowOnOpen` in a component; `revealRowInScroller` is the
 * DOM-level primitive for one-off keyboard/arrow navigation.
 */

export type RevealBlock = 'nearest' | 'center';

/** The nearest ancestor that actually scrolls vertically (the surface's own
 *  list). Null when nothing scrolls — the caller then leaves the page alone. */
function scrollParentOf(el: HTMLElement): HTMLElement | null {
  let node = el.parentElement;
  while (node) {
    if (node.scrollHeight > node.clientHeight) {
      const overflowY = getComputedStyle(node).overflowY;
      if (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') return node;
    }
    node = node.parentElement;
  }
  return null;
}

/**
 * Bring `row` into view inside its own scroller.
 *
 * - `nearest` (default): only moves when the row is outside the visible band,
 *   or closer to an edge than its own `scroll-margin-block` (`.ui-item` = 16px)
 *   — the keyboard/arrow case, and the "correct once the panel reports its
 *   final height" pass. A row already inside the band with breathing room
 *   never moves.
 * - `center`: puts the row mid-list — the current-value anchor of a picker.
 *
 * Never scrolls the page or an enclosing modal: when no scroller is found the
 * call is a no-op. Pass `scroller` explicitly when the surface owns one and
 * the auto-detection could pick a nested element.
 */
export function revealRowInScroller(
  row: HTMLElement | null | undefined,
  block: RevealBlock = 'nearest',
  scroller?: HTMLElement | null,
): void {
  if (!row) return;
  const box = scroller ?? scrollParentOf(row);
  if (!box || !box.contains(row)) return;
  const r = row.getBoundingClientRect();
  const s = box.getBoundingClientRect();
  if (block === 'center') {
    box.scrollTop += (r.top + r.height / 2) - (s.top + s.height / 2);
    return;
  }
  /* Honour the row's `scroll-margin-block` (`.ui-item` = 16px): a row revealed
     FLUSH against the panel edge reads as clipped, and the next row becomes a
     sliver under it. The margin is the same breathing room `scrollIntoView`
     gave us for free — this manual path has to add it. */
  const cs = getComputedStyle(row);
  const marginTop = parseFloat(cs.scrollMarginBlockStart || cs.scrollMarginTop || '0') || 0;
  const marginBottom = parseFloat(cs.scrollMarginBlockEnd || cs.scrollMarginBottom || '0') || 0;
  if (r.top - marginTop < s.top) box.scrollTop -= s.top - (r.top - marginTop);
  else if (r.bottom + marginBottom > s.bottom) box.scrollTop += (r.bottom + marginBottom) - s.bottom;
}

export interface RevealRowOnOpenOptions {
  /** The surface is open (or has just mounted, for mount-per-open surfaces). */
  open: boolean;
  /** Resolve the row for the current value. Called on the open edge only. */
  row: () => HTMLElement | null;
  /** 'center' for pickers (the value sits mid-list), 'nearest' for plain
   *  menus (reveal only when it is out of view). Default 'nearest'. */
  block?: RevealBlock;
  /** The surface's own scroll container. Omit to let the row's nearest
   *  scrolling ancestor be used. */
  scroller?: () => HTMLElement | null;
  /** The surface has its FINAL size/position (e.g. `useDropdownPosition`'s
   *  `ready`). One `nearest` correction runs on that frame — a no-op when the
   *  first pass already landed correctly. Omit for synchronously laid-out
   *  surfaces. */
  ready?: boolean;
}

export interface RevealRowOnOpen {
  /** True once the pointer has entered or pressed the surface. */
  engagedRef: RefObject<boolean>;
  /** Wire to the surface's `onPointerEnter`/`onPointerDown`. */
  engage: () => void;
}

/**
 * The "opens with the current value already in view" behaviour. See the
 * module comment: reveal pre-paint, then never move once engaged.
 */
export function useRevealRowOnOpen({
  open,
  row,
  block = 'nearest',
  scroller,
  ready,
}: RevealRowOnOpenOptions): RevealRowOnOpen {
  const engagedRef = useRef(false);
  const wasOpenRef = useRef(false);
  const correctRef = useRef(false);
  // Latest resolvers without re-running the open edge on every render.
  const optsRef = useRef({ row, scroller, block });
  optsRef.current = { row, scroller, block };

  const engage = useCallback(() => { engagedRef.current = true; }, []);

  useLayoutEffect(() => {
    if (!open) {
      wasOpenRef.current = false;
      correctRef.current = false;
      engagedRef.current = false;
      return;
    }
    if (wasOpenRef.current) return;
    wasOpenRef.current = true;
    // Pre-paint: the surface is committed and laid out, but the user has not
    // seen or touched it yet. This is the ONLY scroll of a preselected list.
    const { row: resolve, scroller: resolveScroller, block: mode } = optsRef.current;
    const el = resolve();
    if (!el) return;
    revealRowInScroller(el, mode, resolveScroller?.() ?? null);
    correctRef.current = true;
  }, [open]);

  // One correction on the frame the surface reports its final size (the first
  // layout measured against a placeholder height cap).
  useEffect(() => {
    if (!open || ready !== true || !correctRef.current) return;
    const raf = requestAnimationFrame(() => {
      if (!correctRef.current) return;
      correctRef.current = false;
      if (engagedRef.current) return;
      const { row: resolve, scroller: resolveScroller } = optsRef.current;
      revealRowInScroller(resolve(), 'nearest', resolveScroller?.() ?? null);
    });
    return () => cancelAnimationFrame(raf);
  }, [open, ready]);

  return { engagedRef, engage };
}
