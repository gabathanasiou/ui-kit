"use client";
import React, { useRef } from 'react';
import { IS_COARSE } from './device';

/* Coarse rows act on the TAP, not on the click (roadmap 337). iOS may swallow
 * a menu row's click — a dismiss layer or a page change between the touch and
 * the synthesized click leaves the menu closed with nothing done ("tap it
 * again"). A still touch fires the action on pointerup; the same tap's click
 * is then swallowed exactly once so it can never run twice or fall through to
 * the app under the (now closed) menu.
 *
 * Desktop and keyboard are untouched: every handler is gated on IS_COARSE and
 * pointerType === 'touch'. A drag larger than 8px is a scroll, never a row
 * action. */

const MOVE_TOLERANCE = 8;
const MAX_PRESS_MS = 900;
/** A click arriving later than this is a new gesture, not the same tap. */
const CLICK_WINDOW_MS = 1000;

export interface CoarseItemTap {
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerUp: (e: React.PointerEvent) => void;
  onPointerCancel: () => void;
  /** Call in the row's select handler: true = this click was already handled
   *  by pointerup, swallow it. */
  suppressSelect: () => boolean;
}

export function useCoarseItemTap(activate: () => void, disabled = false): CoarseItemTap {
  const downRef = useRef<{ x: number; y: number; t: number; doc: Document } | null>(null);
  const activatedAtRef = useRef(0);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!IS_COARSE || disabled || e.pointerType !== 'touch') return;
    downRef.current = { x: e.clientX, y: e.clientY, t: Date.now(), doc: e.currentTarget.ownerDocument };
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!IS_COARSE || disabled || e.pointerType !== 'touch') return;
    const down = downRef.current;
    downRef.current = null;
    if (!down || Date.now() - down.t > MAX_PRESS_MS) return;
    if (Math.hypot(e.clientX - down.x, e.clientY - down.y) > MOVE_TOLERANCE) return;
    activatedAtRef.current = Date.now();
    const el = e.currentTarget as HTMLElement;
    activate();
    /* Run the row's OWN click synchronously so Radix closes the menu (its
       click handler is what dismisses the surface). Our `onSelect` sees the
       activation marker and skips the action; a keep-open row prevents the
       default. Then swallow the browser's real click — by now the row may be
       unmounted and it would land on the app underneath. */
    el.click();
    let timer = 0;
    const cleanup = () => {
      down.doc.removeEventListener('click', swallow, true);
      down.doc.removeEventListener('pointerdown', onNextPointerDown, true);
      if (timer) window.clearTimeout(timer);
    };
    const swallow = (event: MouseEvent) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      cleanup();
    };
    const onNextPointerDown = () => cleanup();
    down.doc.addEventListener('click', swallow, true);
    down.doc.addEventListener('pointerdown', onNextPointerDown, true);
    timer = window.setTimeout(cleanup, 600);
  };

  const onPointerCancel = () => { downRef.current = null; };

  const suppressSelect = () => {
    /* Keep the marker for the window: the pointerup already ran the action,
       and the row's synthetic + native clicks must BOTH skip it. A second
       deliberate tap on the same row within a second is not a real use case
       (the menu has closed). */
    return Date.now() - activatedAtRef.current < CLICK_WINDOW_MS;
  };

  return { onPointerDown, onPointerUp, onPointerCancel, suppressSelect };
}
