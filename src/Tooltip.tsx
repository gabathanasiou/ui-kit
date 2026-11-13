"use client";
import React, { useState, useRef, useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import { usePortalTarget, useCurrentWindow } from './popout';
import { useCoarseScale, coarsePx } from './device';
import { useKitTheme } from './ThemeScope';

/** Grace before hiding: short enough that the bubble clears as soon as the
 *  pointer leaves, long enough that crossing an adjacent control does not
 *  flicker two tips. The bubble is pointer-events-none, so it can never
 *  swallow a click aimed at the surface under it. */
const HIDE_DELAY_MS = 100;

/** The accessible name a tooltip lends its trigger, or null when the trigger
 *  already has one (`aria-label`/`title`) or shows its own text — visible
 *  labels must stay part of the accessible name (WCAG label-in-name). Only
 *  icon-only triggers get named, which is exactly the a11y gap tooltips were
 *  hiding — and the name is what stable hooks (e.g. presence anchors) key on.
 *  Pure; unit-tested. */
export function tooltipAriaLabel(children: React.ReactNode, content: string): Record<string, string> {
  if (!content || !React.isValidElement(children)) return {};
  const props = children.props as Record<string, unknown>;
  if (props['aria-label'] || props.title) return {};
  const inner = props.children;
  const hasText = typeof inner === 'string'
    ? inner.trim().length > 0
    : Array.isArray(inner)
      ? inner.some(part => typeof part === 'string' && part.trim().length > 0)
      : false;
  if (hasText) return {};
  const first = content.split('\n')[0].replace(/^•\s*/, '').trim().slice(0, 80);
  return first ? { 'aria-label': first } : {};
}

export const Tooltip: React.FC<{ content: string; children: React.ReactNode }> = ({ content, children }) => {
  const kit = useKitTheme();
  const scale = useCoarseScale();
  const padX = coarsePx(10, 12, scale), padY = coarsePx(6, 6, scale), fs = coarsePx(10, 12, scale);
  const tipStyle = { padding: `${padY}px ${padX}px`, fontSize: fs };
  const portalTarget = usePortalTarget();
  const currentWindow = useCurrentWindow();
  const tipId = useId();
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  /* Render the bubble only after hydration: it stays MOUNTED (hidden) so the
   * trigger's aria-describedby always resolves, but a portal cannot render
   * during SSR. */
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoveringRef = useRef(false);
  const focusedRef = useRef(false);

  useEffect(() => { setMounted(true); }, []);

  const updatePos = () => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: r.left + r.width / 2, y: r.top });
  };

  const clearCloseTimer = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
  };

  const showTip = () => {
    clearCloseTimer();
    updatePos();
    setShow(true);
  };

  /* Hide only once BOTH interest signals are gone. A mouse leave (or a blur)
   * starts the grace timer; re-entering the trigger OR the bubble cancels it. */
  const scheduleHide = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      closeTimer.current = null;
      if (!hoveringRef.current && !focusedRef.current) setShow(false);
    }, HIDE_DELAY_MS);
  };

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  useEffect(() => {
    if (show && currentWindow) { updatePos(); currentWindow.addEventListener('scroll', updatePos, true); }
    return () => currentWindow?.removeEventListener('scroll', updatePos, true);
  }, [show]);

  /* Touch dismissal: iOS keeps the tap's :hover sticky, so without this the
     bubble can outlive the tap that revealed it. Any tap OUTSIDE the trigger
     (and outside the bubble itself) hides it. */
  useEffect(() => {
    if (!show) return undefined;
    const doc = ref.current?.ownerDocument ?? document;
    const onPointerDown = (event: PointerEvent) => {
      const t = event.target as Node | null;
      if (!t) return;
      if (ref.current?.contains(t) || bubbleRef.current?.contains(t)) return;
      hoveringRef.current = false;
      focusedRef.current = false;
      clearCloseTimer();
      setShow(false);
    };
    doc.addEventListener('pointerdown', onPointerDown, true);
    return () => doc.removeEventListener('pointerdown', onPointerDown, true);
  }, [show]);

  const labelProps = tooltipAriaLabel(children, content);
  const childProps = React.isValidElement(children) ? (children.props as Record<string, unknown>) : null;
  /* Only describe when the tooltip did NOT already become the accessible name
     (otherwise screen readers read the same string twice). A consumer's own
     description always wins. */
  const describedBy = content && Object.keys(labelProps).length === 0 && !childProps?.['aria-describedby']
    ? { 'aria-describedby': tipId }
    : {};
  const trigger = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement<Record<string, unknown>>, { ...labelProps, ...describedBy })
    : children;

  return (
    <div
      ref={ref}
      className="inline-flex"
      onMouseEnter={() => { hoveringRef.current = true; showTip(); }}
      /* Mouse interest ALWAYS ends at the trigger. A click can focus the
         control, but that must not pin its tip over the neighbouring row. */
      onMouseLeave={() => { hoveringRef.current = false; focusedRef.current = false; scheduleHide(); }}
      /* Keyboard parity: focus shows the tooltip, blur hides it (the grace
         timer absorbs iPad's intra-control focus hops). */
      onFocusCapture={(e) => {
        if (e.target === e.currentTarget) return;
        focusedRef.current = true;
        showTip();
      }}
      onBlurCapture={(e) => {
        if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget as Node)) return;
        focusedRef.current = false;
        scheduleHide();
      }}
      /* Escape dismisses without swallowing the key: an open menu/modal above
         still owns it (we never preventDefault, and a consumer that already
         handled it wins). */
      onKeyDown={(e) => {
        if (e.key !== 'Escape' || e.defaultPrevented) return;
        clearCloseTimer();
        hoveringRef.current = false;
        setShow(false);
      }}
    >
      {trigger}
      {mounted && createPortal(
        <div
          ref={bubbleRef}
          id={tipId}
          role="tooltip"
          hidden={!show}
          data-mode={kit?.mode}
          data-accent={kit?.accent}
          className="ui-tooltip fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-[color:var(--ui-tooltip-border)] bg-[var(--ui-tooltip-bg)] text-[color:var(--ui-tooltip-text)] pointer-events-none"
          style={{ ...tipStyle, left: pos.x, top: pos.y - 4, transform: 'translate(-50%, -100%)', zIndex: 99999 }}
        >
          {content.split('\n• ').map((line, i) => (
            <div key={i} className={i > 0 ? 'mt-0.5 pt-0.5 border-t border-[color:var(--ui-tooltip-sep)]' : ''}>{line}</div>
          ))}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[color:var(--ui-tooltip-bg)]" />
        </div>,
        portalTarget ?? document.body
      )}
    </div>
  );
};

export default Tooltip;
