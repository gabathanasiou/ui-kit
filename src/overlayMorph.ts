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
 *  the still-mounted content can't intercept clicks. The closing styles are
 *  NEVER cleared while the node is still mounted: clearing `opacity` there
 *  paints one last full-opacity frame if the consumer's unmount render is
 *  deferred (the classic close-flash). Instead the box is pinned invisible
 *  (`visibility: hidden`), the consumer unmounts it, and the styles are only
 *  restored once the node is actually detached. */
export function playOverlayClose(token: Token, el: HTMLElement, getAnchor: (() => OverlayRect | null) | null, onDone?: () => void) {
  const my = ++token.current;
  const prev = { transition: el.style.transition, transform: el.style.transform, transformOrigin: el.style.transformOrigin, opacity: el.style.opacity, pointerEvents: el.style.pointerEvents, visibility: el.style.visibility };
  const o = anchorOf(el, getAnchor);
  el.style.transition = `transform ${MORPH_MS}ms ${MORPH_EASE}, opacity ${MORPH_OPACITY_MS}ms ease`;
  el.style.transformOrigin = `${o.x * 100}% ${o.y * 100}%`;
  el.style.transform = `scale(${ZOOM_FROM})`;
  el.style.opacity = '0';
  el.style.pointerEvents = 'none';
  window.setTimeout(() => {
    if (token.current !== my) return;
    el.style.visibility = 'hidden';
    onDone?.();
    requestAnimationFrame(() => {
      if (token.current !== my || el.isConnected) return;
      el.style.transition = prev.transition;
      el.style.transform = prev.transform;
      el.style.transformOrigin = prev.transformOrigin;
      el.style.opacity = prev.opacity;
      el.style.pointerEvents = prev.pointerEvents;
      el.style.visibility = prev.visibility;
    });
  }, MORPH_MS + 60);
}

/** Unmount-driven close (the modal's clone pattern): the parent removes the
 *  panel to close it, so pin a clone exactly where the panel was (panels may
 *  be position:absolute in a cell — the clone is hard-pinned fixed at the
 *  live rect, body-level) and zoom the clone out. `fallbackRect` covers the
 *  case where the live node is already detached when the ref fires (its own
 *  rect reads all zeros) — the hook caches the last known rect. */
export function cloneOverlayClose(el: HTMLElement, getAnchor: (() => OverlayRect | null) | null, fallbackRect?: OverlayRect | null) {
  const clone = el.cloneNode(true) as HTMLElement;
  const live = el.getBoundingClientRect();
  const r = (live.width > 0 || live.height > 0) ? live : (fallbackRect ?? live);
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
  /* Last known rect of the element (cached while attached). The ref callback
     fires with null when the panel leaves the DOM; if it is already detached
     by then its own rect reads all zeros — the clone pins this cached rect
     instead. */
  const lastRectRef = useRef<OverlayRect | null>(null);
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
      const r = node.getBoundingClientRect();
      if (r.width > 0 || r.height > 0) {
        lastRectRef.current = { left: r.left, top: r.top, width: r.width, height: r.height };
      }
      setReady(true);
      return;
    }
    const el = elRef.current;
    elRef.current = null;
    setReady(false);
    if (!el || !opts.cloneOnUnmount || !visibleRef.current) return;
    if (el.style.visibility === 'hidden') return; // never painted visible
    if (!overlayMorphEnabled(morphRef.current)) return;
    cloneOverlayClose(el, anchorRef.current, lastRectRef.current);
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

  /* Wheel interceptor: an open Modal's scroll lock (Radix Dialog →
     react-remove-scroll) preventDefaults every wheel whose target is outside
     the dialog content — and portaled menus/panels live outside it, so their
     lists could never be scrolled by wheel inside a modal. Intercept wheels
     that land inside this overlay at DOCUMENT CAPTURE and stop propagation
     BEFORE the lock's bubble listener sees them: stopping propagation never
     cancels the native default action, so the overlay's own scroll still
     happens; wheels outside the overlay stay locked as intended. */
  useEffect(() => {
    if (!ready || !visibleRef.current) return;
    const onWheel = (e: WheelEvent) => {
      const el = elRef.current;
      if (el && el.contains(e.target as Node)) e.stopImmediatePropagation();
    };
    document.addEventListener('wheel', onWheel, { capture: true });
    return () => document.removeEventListener('wheel', onWheel, { capture: true });
  }, [ready]);

  // Unmount-driven close is handled in the ref callback above: the panel
  // element leaving the DOM (conditional panel or whole-component unmount)
  // fires setContentRef(null) — the clone morph plays there.

  return setContentRef;
}
