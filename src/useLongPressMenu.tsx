"use client";
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { IS_COARSE, isTouchLike } from './device';
import { usePortalTarget, useCurrentDocument } from './popout';

const LONG_PRESS_MS = 500;
const RING_DELAY_MS = 250;
const MOVE_TOLERANCE = 5;
const RING_SIZE = 88;
const RING_STROKE = 4;

/**
 * Long-press → context menu provider (touch's right-click).
 *
 * Any element with `[data-context-menu]` (or a descendant) becomes a
 * long-press target on touch: holding 500ms shows an iOS-style progress ring,
 * then dispatches a synthetic `contextmenu` MouseEvent at the finger position
 * with `button: 2` — the exact event desktop right-click produces, so apps
 * handle both inputs with ONE `onContextMenu` handler.
 *
 * Opt out of long-press on a subtree with `useLongPressOptOut()` (or native
 * interactive elements, which are excluded automatically).
 */
function animateRing(ringEl: SVGElement, ms: number) {
  const circle = ringEl.querySelectorAll('circle')[1]!;
  const total = 2 * Math.PI * 40;
  circle.style.strokeDasharray = String(total);
  circle.style.strokeDashoffset = String(total);
  const start = performance.now();
  const tick = (now: number) => {
    const elapsed = now - start;
    const frac = Math.min(elapsed / ms, 1);
    circle.style.strokeDashoffset = String(total * (1 - frac));
    if (frac < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function LongPressIndicator({ x, y, ms }: { x: number; y: number; ms: number }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const portalTarget = usePortalTarget();
  useEffect(() => {
    if (svgRef.current) animateRing(svgRef.current, ms);
  }, [ms]);
  return createPortal(
    <div
      style={{
        position: 'fixed',
        left: x - RING_SIZE / 2,
        top: y - RING_SIZE / 2,
        width: RING_SIZE,
        height: RING_SIZE,
        zIndex: 99999,
        pointerEvents: 'none',
      }}
    >
      <svg ref={svgRef} width={RING_SIZE} height={RING_SIZE} viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}>
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={40}
          fill="none"
          stroke="rgba(0,0,0,0.45)"
          strokeWidth={RING_STROKE + 2}
          strokeLinecap="round"
        />
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={40}
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth={RING_STROKE}
          strokeLinecap="round"
          style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
        />
      </svg>
    </div>,
    portalTarget ?? document.body,
  );
}

export function useLongPressOptOut() {
  return { 'data-no-longpress': 'true' as const };
}

function isInteractiveElement(el: HTMLElement): boolean {
  const tag = el.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || tag === 'BUTTON') return true;
  if (el.isContentEditable) return true;
  if (el.closest('[data-no-longpress]')) return true;
  if (el.closest('button, input, select, textarea')) return true;
  return false;
}

export function LongPressMenuProvider({
  children,
  showRing = true,
  longPressMs = LONG_PRESS_MS,
}: {
  children: React.ReactNode;
  /** Hide the iOS-style progress ring (reactions open on long-press). */
  showRing?: boolean;
  /** How long the press must be held before the action fires (ms). */
  longPressMs?: number;
}) {
  const [indicator, setIndicator] = useState<{ x: number; y: number } | null>(null);
  const currentDocument = useCurrentDocument();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ringTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startRef = useRef<{ x: number; y: number; target: EventTarget | null }>({ x: 0, y: 0, target: null });
  const activeRef = useRef(false);
  const ringDelay = Math.min(RING_DELAY_MS, longPressMs * 0.5);

  useEffect(() => {
    if (!IS_COARSE || !currentDocument) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!isTouchLike(e.pointerType) || e.button !== 0) return;
      const target = e.target as HTMLElement;
      // Only start long-presses on [data-context-menu] targets; everything
      // else (inputs, menus, modals, plain text) gets no ring.
      if (!target.closest('[data-context-menu]')) return;
      if (isInteractiveElement(target)) return;

      const x = e.clientX;
      const y = e.clientY;
      startRef.current = { x, y, target: e.target };
      activeRef.current = true;

      // Ring appears after a tiny delay, then runs its full countdown so it
      // completes exactly when the long-press action fires.
      if (showRing) {
        ringTimerRef.current = setTimeout(() => setIndicator({ x, y }), ringDelay);
      }

      timerRef.current = setTimeout(() => {
        if (!activeRef.current) return;
        if (ringTimerRef.current) { clearTimeout(ringTimerRef.current); ringTimerRef.current = null; }
        setIndicator(null);

        const heldTarget = startRef.current.target as HTMLElement | null;
        if (!heldTarget) return;

        const ctxEvent = new MouseEvent('contextmenu', {
          bubbles: true,
          cancelable: true,
          clientX: x,
          clientY: y,
          button: 2,
          view: window,
        });
        heldTarget.dispatchEvent(ctxEvent);
      }, longPressMs);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!activeRef.current || timerRef.current === null) return;
      const dx = e.clientX - startRef.current.x;
      const dy = e.clientY - startRef.current.y;
      if (Math.sqrt(dx * dx + dy * dy) > MOVE_TOLERANCE) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        if (ringTimerRef.current) { clearTimeout(ringTimerRef.current); ringTimerRef.current = null; }
        activeRef.current = false;
        setIndicator(null);
      }
    };

    const onPointerUp = () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (ringTimerRef.current !== null) {
        clearTimeout(ringTimerRef.current);
        ringTimerRef.current = null;
      }
      activeRef.current = false;
      setIndicator(null);
    };

    const onPointerLeave = (e: PointerEvent) => {
      if (!isTouchLike(e.pointerType)) return;
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (ringTimerRef.current !== null) {
        clearTimeout(ringTimerRef.current);
        ringTimerRef.current = null;
      }
      activeRef.current = false;
      setIndicator(null);
    };

    currentDocument?.addEventListener('pointerdown', onPointerDown);
    currentDocument.addEventListener('pointermove', onPointerMove);
    currentDocument.addEventListener('pointerup', onPointerUp);
    currentDocument.addEventListener('pointercancel', onPointerUp);
    currentDocument.addEventListener('pointerleave', onPointerLeave);

    return () => {
      currentDocument.removeEventListener('pointerdown', onPointerDown);
      currentDocument.removeEventListener('pointermove', onPointerMove);
      currentDocument.removeEventListener('pointerup', onPointerUp);
      currentDocument?.removeEventListener('pointercancel', onPointerUp);
      currentDocument?.removeEventListener('pointerleave', onPointerLeave);
      if (timerRef.current !== null) clearTimeout(timerRef.current);
      if (ringTimerRef.current !== null) clearTimeout(ringTimerRef.current);
    };
  }, [showRing, longPressMs, ringDelay]);

  return (
    <>
      {children}
      {showRing && indicator && (
        <LongPressIndicator x={indicator.x} y={indicator.y} ms={longPressMs - ringDelay} />
      )}
    </>
  );
}
