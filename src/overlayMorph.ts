"use client";
import { useCallback, useLayoutEffect, useRef, useState } from 'react';

/* Overlay morph — the motion language shared by every floating surface
   (menus, submenus, context menus, entity-dropdown panels). This is the
   modal FLIP system's zoom, replicated — never re-derived:

   - Open: the panel grows out of its ANCHOR (the trigger's nearest corner /
     edge, a press point, or a submenu's entry edge) — scale from ZOOM_FROM +
     fade in, 220ms cubic-bezier(0.32,0.72,0,1) (the modal's exact easing).
   - Close: the same reverse morph (shrink back to the anchor + fade), played
     on the still-mounted panel before the caller unmounts it (the modal's
     zoom-out) — or on a clone when the close is unmount-driven (the modal's
     clone pattern).
   - prefers-reduced-motion skips all of it. The app's opt-out key
     (lemon_schedule_modal_morph === '0') also gates it via the `morph` prop
     (app shims inject it; the kit stays key-agnostic like the kit Modal).
   - Hand-rolled, no animation lib; transforms/opacity only (never layout);
     an animation token cancels stale rAF/timeouts on rapid open/close.
   - Feedback, not chrome: no slides/overshoot/springs on functional menus.

   The anchor math is rect-based so it works for every positioning scheme:
   Radix poppers, fixed coordinate panels, absolute cell editors. Rects are
   measured at rAF time — after Radix/floating-ui positioning settles (and
   after the app panel's positioning rAF flips it visible). */

export const MORPH_MS = 220;
export const MORPH_EASE = 'cubic-bezier(0.32, 0.72, 0, 1)';
export const MORPH_OPACITY_MS = 170;
export const ZOOM_FROM = 0.94;

export type OverlayRect = { left: number; top: number; width: number; height: number };

export function overlayMorphEnabled(morph?: boolean): boolean {
  if (morph === false) return false;
  if (typeof window === 'undefined') return false;
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Fraction (0..1, 0..1) of the panel box to anchor the scale morph at: the
 *  corner/edge nearest to the center of `anchor`. A point anchor (press
 *  point: zero-size rect) yields the nearest corner; a trigger rect yields
 *  the edge facing it (centered along the overlap axis). */
export function nearestOverlayOrigin(panel: OverlayRect, anchor: OverlayRect): { x: number; y: number } {
  const ax = anchor.left + anchor.width / 2;
  const ay = anchor.top + anchor.height / 2;
  return {
    x: ax < panel.left ? 0 : ax > panel.left + panel.width ? 1 : 0.5,
    y: ay < panel.top ? 0 : ay > panel.top + panel.height ? 1 : 0.5,
  };
}

type Token = { current: number };

function anchorOf(el: HTMLElement, getAnchor: (() => OverlayRect | null) | null) {
  const a = getAnchor?.() ?? null;
  if (!a) return { x: 0.5, y: 0.5 };
  const r = el.getBoundingClientRect();
  return nearestOverlayOrigin({ left: r.left, top: r.top, width: r.width, height: r.height }, a);
}

/** Open morph: pin the panel at ZOOM_FROM + fade (invisible until the
 *  transition starts), then double-rAF to identity (the modal's zoom-in).
 *  The anchor/origin is measured at the SECOND rAF — positioning (Radix
 *  popper passes, the app panel's positioning rAF) has settled by then, and
 *  the pinned start frame is invisible anyway (opacity 0), so the origin is
 *  correct from the very first visible frame. */
export function playOverlayOpen(token: Token, el: HTMLElement, getAnchor: (() => OverlayRect | null) | null, onDone?: () => void) {
  const my = ++token.current;
  const prev = { transition: el.style.transition, transform: el.style.transform, transformOrigin: el.style.transformOrigin, opacity: el.style.opacity };
  el.style.transition = 'none';
  el.style.transformOrigin = '50% 50%';
  el.style.transform = `scale(${ZOOM_FROM})`;
  el.style.opacity = '0';
  void el.getBoundingClientRect();
  requestAnimationFrame(() => {
    if (token.current !== my) return;
    requestAnimationFrame(() => {
      if (token.current !== my) return;
      const o = anchorOf(el, getAnchor);
      el.style.transformOrigin = `${o.x * 100}% ${o.y * 100}%`;
      el.style.transition = `transform ${MORPH_MS}ms ${MORPH_EASE}, opacity ${MORPH_OPACITY_MS}ms ease`;
      el.style.transform = 'none';
      el.style.opacity = '';
      window.setTimeout(() => {
        if (token.current !== my) return;
        el.style.transition = prev.transition;
        el.style.transform = prev.transform;
        el.style.transformOrigin = prev.transformOrigin;
        el.style.opacity = prev.opacity;
        onDone?.();
      }, MORPH_MS + 60);
    });
  });
}

/** Close morph on the live node: shrink back to the anchor + fade (the
 *  modal's zoom-out). The panel goes pointer-transparent for the duration so
 *  the still-mounted content can't intercept clicks. */
export function playOverlayClose(token: Token, el: HTMLElement, getAnchor: (() => OverlayRect | null) | null, onDone?: () => void) {
  const my = ++token.current;
  const prev = { transition: el.style.transition, transform: el.style.transform, transformOrigin: el.style.transformOrigin, opacity: el.style.opacity, pointerEvents: el.style.pointerEvents };
  const o = anchorOf(el, getAnchor);
  el.style.transition = `transform ${MORPH_MS}ms ${MORPH_EASE}, opacity ${MORPH_OPACITY_MS}ms ease`;
  el.style.transformOrigin = `${o.x * 100}% ${o.y * 100}%`;
  el.style.transform = `scale(${ZOOM_FROM})`;
  el.style.opacity = '0';
  el.style.pointerEvents = 'none';
  window.setTimeout(() => {
    if (token.current !== my) return;
    el.style.transition = prev.transition;
    el.style.transform = prev.transform;
    el.style.transformOrigin = prev.transformOrigin;
    el.style.opacity = prev.opacity;
    el.style.pointerEvents = prev.pointerEvents;
    onDone?.();
  }, MORPH_MS + 60);
}

/** Unmount-driven close (the modal's clone pattern): the parent removes the
 *  panel to close it, so pin a clone exactly where the panel was (panels may
 *  be position:absolute in a cell — the clone is hard-pinned fixed at the
 *  live rect, body-level) and zoom the clone out. */
export function cloneOverlayClose(el: HTMLElement, getAnchor: (() => OverlayRect | null) | null) {
  const clone = el.cloneNode(true) as HTMLElement;
  const r = el.getBoundingClientRect();
  clone.setAttribute('data-morph-clone', '');
  clone.setAttribute('aria-hidden', 'true');
  clone.style.pointerEvents = 'none';
  clone.style.position = 'fixed';
  clone.style.left = `${r.left}px`;
  clone.style.top = `${r.top}px`;
  clone.style.margin = '0';
  clone.style.visibility = 'visible';
  clone.style.transition = 'none';
  const o = anchorOf(el, getAnchor);
  clone.style.transformOrigin = `${o.x * 100}% ${o.y * 100}%`;
  const doc = el.ownerDocument;
  doc.body.appendChild(clone);
  void clone.getBoundingClientRect();
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (!clone.isConnected) return;
      clone.style.transition = `transform ${MORPH_MS}ms ${MORPH_EASE}, opacity ${MORPH_OPACITY_MS}ms ease`;
      clone.style.transform = `scale(${ZOOM_FROM})`;
      clone.style.opacity = '0';
      window.setTimeout(() => { if (clone.isConnected) clone.remove(); }, MORPH_MS + 60);
    });
  });
}

/** The overlay-morph controller. Returns a callback ref for the panel/content
 *  element (compose it with your own ref — e.g. Radix content refs, the app
 *  panel's positioning ref). The OPEN morph fires when the element mounts
 *  while `visible`; the CLOSE morph fires when `visible` flips false while
 *  the element is still mounted (keep it mounted until `onClosed` fires —
 *  the modal owns its dismissal the same way), or on unmount when
 *  `cloneOnUnmount` is set (the element itself is removed to close). */
export function useOverlayMorph<T extends HTMLElement>(opts: {
  visible: boolean;
  morph?: boolean;
  /** Supplier of the anchor rect (trigger box, press point, submenu entry
   *  edge). Null = center-anchored (the standalone modal zoom). */
  anchor?: () => OverlayRect | null;
  /** External ref that also receives the element (positioning refs etc.). */
  ref?: React.RefObject<T | null>;
  /** The element is unmounted to close — play the close morph on a clone. */
  cloneOnUnmount?: boolean;
  /** Fired when a close morph finishes (or immediately when motion is off) —
   *  unmount the Radix side / drop the "closing" render here. */
  onClosed?: () => void;
}): (node: T | null) => void {
  const elRef = useRef<T | null>(null);
  const [ready, setReady] = useState(false);
  /* The ref callback fires with null whenever the panel element leaves the
     DOM — both when the whole component unmounts AND when a conditional
     panel is removed while its host stays mounted (SelectDropdown closes by
     dropping `{open && <panel/>}`). That detach is the unmount-driven close
     signal — play the clone morph there, not in a component-unmount
     cleanup (which only fires for the first case). */
  const setContentRef = useCallback((node: T | null) => {
    if (opts.ref) opts.ref.current = node;
    if (node) {
      elRef.current = node;
      setReady(true);
      return;
    }
    const el = elRef.current;
    elRef.current = null;
    setReady(false);
    if (!el || !opts.cloneOnUnmount || !visibleRef.current) return;
    if (el.style.visibility === 'hidden') return; // never painted visible
    if (!overlayMorphEnabled(morphRef.current)) return;
    cloneOverlayClose(el, anchorRef.current);
  }, []);
  const visibleRef = useRef(opts.visible);
  visibleRef.current = opts.visible;
  const prevVisibleRef = useRef(opts.visible);
  const anchorRef = useRef<(() => OverlayRect | null) | null>(opts.anchor ?? null);
  anchorRef.current = opts.anchor ?? null;
  const onClosedRef = useRef(opts.onClosed);
  onClosedRef.current = opts.onClosed;
  const morphRef = useRef(opts.morph !== false);
  morphRef.current = opts.morph !== false;
  const token = useRef(0);

  // Open morph — runs when the element actually mounts (content mounted
  // later than this component, e.g. a Radix portal) while visible.
  useLayoutEffect(() => {
    if (!ready || !visibleRef.current || !overlayMorphEnabled(morphRef.current)) return;
    const el = elRef.current;
    if (!el) return;
    playOverlayOpen(token, el, anchorRef.current);
  }, [ready, opts.visible]);

  // Close morph — visible flipped false while the element is still mounted.
  useLayoutEffect(() => {
    const wasVisible = prevVisibleRef.current;
    prevVisibleRef.current = opts.visible;
    if (opts.visible || !wasVisible) return;
    const el = elRef.current;
    if (!el || !overlayMorphEnabled(morphRef.current)) { onClosedRef.current?.(); return; }
    playOverlayClose(token, el, anchorRef.current, () => onClosedRef.current?.());
  }, [opts.visible]);

  // Unmount-driven close is handled in the ref callback above: the panel
  // element leaving the DOM (conditional panel or whole-component unmount)
  // fires setContentRef(null) — the clone morph plays there.

  return setContentRef;
}
