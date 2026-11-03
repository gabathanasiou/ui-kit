"use client";
import React, { useRef } from 'react';
import { IS_COARSE } from './device';

/* Touch rows act on the TAP, not on the click (roadmap 337). iOS may swallow
 * a menu row's click — a dismiss layer or a page change between the touch and
 * the synthesized click leaves the menu closed with nothing done ("tap it
 * again"). A still touch fires the action on pointerup; the same tap's click
 * is then swallowed exactly once so it can never run twice or fall through to
 * the app under the (now closed) menu.
 *
 * GHOST CLICKS (roadmap 338). iOS delivers the click for a tap late — after
 * its tap-to-hover deferral, or after the element under the finger has been
 * replaced by hit-testing. A nested card opens EXACTLY over the row that was
 * tapped (the one-card presentation), so that late click lands on a
 * DIFFERENT row (often the Back row, or the first item of the child card) and
 * runs it: the menu appears to dismiss itself. A 600ms global swallow cannot
 * cover a deferred click. The invariant is:
 *
 *   a click may only act if the gesture it belongs to STARTED on this row.
 *
 * A click arriving right after a pointerdown on a different element is a
 * ghost: ignored, and prevented so the surface does not close either.
 * Keyboard/programmatic clicks (`detail === 0`), a focused row (VoiceOver
 * activates with a bare click) and mouse/pen clicks (their pointerdown is on
 * the row) are never ghosts.
 *
 * Desktop and keyboard are untouched: every handler is gated on IS_COARSE;
 * pointer-up activation is gated on pointerType === 'touch'. A drag larger
 * than 8px is a scroll, never a row action. */

/* Tap slop: a finger tap drifts. 8px was too strict — a 10px drift read as a
 * scroll, so the control never activated (and the click was swallowed). 14px
 * still separates a real swipe/scroll. */
const MOVE_TOLERANCE = 14;
const MAX_PRESS_MS = 900;
/** A click arriving later than this is a new gesture, not the same tap. */
const CLICK_WINDOW_MS = 1000;

/* The last pointerdown anywhere. Ghost protection is a coarse-pointer concern
   and pop-out windows are desktop-only, so one document-level record is
   enough; it is written in the CAPTURE phase (before any React handler). The
   POINT matters: iOS re-fires the tap's click at the touch point, so a ghost
   is recognisable by its coordinates — a VoiceOver click lands at the element
   (or 0,0), not at the last finger position. */
let lastDown: { at: number; target: EventTarget | null; x: number; y: number } = { at: 0, target: null, x: 0, y: 0 };
if (typeof document !== 'undefined') {
  document.addEventListener('pointerdown', (e) => {
    lastDown = { at: Date.now(), target: e.target, x: e.clientX, y: e.clientY };
  }, true);
}
/** How far the click may be from the press and still be that same gesture. */
const GHOST_RADIUS = 12;

export interface GhostClickGuard {
  onClick: (e: React.MouseEvent) => void;
  /** True when the click being handled must be IGNORED (its gesture started on
   *  another element). Consumes the marker. */
  takeGhost: () => boolean;
}

/** True when this click is a ghost: it arrived right after a pointerdown on a
 *  DIFFERENT element (iOS retargets a tap's click after the card under the
 *  finger changed). Shared by menu rows and submenu triggers. */
export function isGhostClick(el: Element, e: { clientX: number; clientY: number }): boolean {
  const recent = Date.now() - lastDown.at < CLICK_WINDOW_MS;
  const samePoint = Math.hypot(e.clientX - lastDown.x, e.clientY - lastDown.y) <= GHOST_RADIUS;
  const startedHere = !!lastDown.target && el.contains(lastDown.target as Node);
  /* No `detail` test: WebKit reports 0 for a click synthesized from a touch,
     so it cannot separate a ghost from a keyboard click. No focus test either
     — WebKit focuses the row under the finger, which is exactly the ghost.
     The press point + its target are exact; keyboard and VoiceOver clicks
     have no recent press at that point. */
  return IS_COARSE && recent && samePoint && !startedHere;
}

/** The ghost-click half of the touch row contract — shared by every menu row
 *  (DropdownItem, manager rows, ContextMenuItem). */
export function useGhostClick(): GhostClickGuard {
  const ghostRef = useRef(false);

  const onClick = (e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement | null;
    ghostRef.current = !!el && isGhostClick(el, e);
  };

  const takeGhost = () => {
    const ghost = ghostRef.current;
    ghostRef.current = false;
    return ghost;
  };

  return { onClick, takeGhost };
}

export interface CoarseItemTap extends GhostClickGuard {
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerUp: (e: React.PointerEvent) => void;
  onPointerCancel: () => void;
  /** Call in the row's select handler: true = this click was already handled
   *  by pointerup, swallow it. */
  suppressSelect: () => boolean;
}

export function useCoarseItemTap(activate: () => void, disabled = false): CoarseItemTap {
  const ghost = useGhostClick();
  const downRef = useRef<{ x: number; y: number; t: number; doc: Document } | null>(null);
  const activatedAtRef = useRef(0);

  /** Swallow the native click of THIS gesture (once): it must land at the tap
   *  point. A programmatic/assistive click (no coordinates, `detail 0`) or a
   *  click elsewhere must pass — swallowing every click for 600ms ate
   *  VoiceOver activations that followed a tap. */
  const swallowNextClick = (doc: Document, x: number, y: number) => {
    let timer = 0;
    const cleanup = () => {
      doc.removeEventListener('click', swallow, true);
      doc.removeEventListener('pointerdown', onNextPointerDown, true);
      if (timer) window.clearTimeout(timer);
    };
    const swallow = (event: MouseEvent) => {
      if (Math.hypot(event.clientX - x, event.clientY - y) > 14) { cleanup(); return; }
      event.preventDefault();
      event.stopImmediatePropagation();
      cleanup();
    };
    const onNextPointerDown = () => cleanup();
    doc.addEventListener('click', swallow, true);
    doc.addEventListener('pointerdown', onNextPointerDown, true);
    timer = window.setTimeout(cleanup, 600);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (!IS_COARSE || disabled || e.pointerType !== 'touch') return;
    downRef.current = { x: e.clientX, y: e.clientY, t: Date.now(), doc: e.currentTarget.ownerDocument };
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!IS_COARSE || disabled || e.pointerType !== 'touch') return;
    const down = downRef.current;
    downRef.current = null;
    if (!down) return;
    /* A drag is a SCROLL: never act on pointerup, and eat the click the
       browser may still synthesize after the drag (it would otherwise switch
       a tab / press a control the finger was scrolling past). */
    if (Math.hypot(e.clientX - down.x, e.clientY - down.y) > MOVE_TOLERANCE) {
      swallowNextClick(down.doc, e.clientX, e.clientY);
      return;
    }
    if (Date.now() - down.t > MAX_PRESS_MS) return;
    activatedAtRef.current = Date.now();
    const el = e.currentTarget as HTMLElement;
    activate();
    /* Run the row's OWN click synchronously so Radix closes the menu (its
       click handler is what dismisses the surface). Our `onSelect` sees the
       activation marker and skips the action; a keep-open row prevents the
       default. Then swallow the browser's real click — by now the row may be
       unmounted and it would land on the app underneath. */
    el.click();
    swallowNextClick(down.doc, e.clientX, e.clientY);
  };

  const onPointerCancel = () => { downRef.current = null; };

  const suppressSelect = () => {
    /* Keep the marker for the window: the pointerup already ran the action,
       and the row's synthetic + native clicks must BOTH skip it. A second
       deliberate tap on the same row within a second is not a real use case
       (the menu has closed). */
    return Date.now() - activatedAtRef.current < CLICK_WINDOW_MS;
  };

  return {
    onPointerDown,
    onPointerUp,
    onPointerCancel,
    onClick: ghost.onClick,
    takeGhost: ghost.takeGhost,
    suppressSelect,
  };
}
