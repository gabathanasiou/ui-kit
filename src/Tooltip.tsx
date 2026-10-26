"use client";
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { usePortalTarget, useCurrentWindow } from './popout';
import { useCoarseScale, coarsePx } from './device';
import { useKitTheme } from './ThemeScope';

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
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updatePos = () => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: r.left + r.width / 2, y: r.top });
  };

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  useEffect(() => {
    if (show && currentWindow) { updatePos(); currentWindow.addEventListener('scroll', updatePos, true); }
    return () => currentWindow?.removeEventListener('scroll', updatePos, true);
  }, [show]);

  const labelProps = tooltipAriaLabel(children, content);
  const trigger = Object.keys(labelProps).length > 0
    ? React.cloneElement(children as React.ReactElement<Record<string, unknown>>, labelProps)
    : children;

  return (
    <div
      ref={ref}
      className="inline-flex"
      onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); updatePos(); setShow(true); }}
      onMouseLeave={() => { closeTimer.current = setTimeout(() => setShow(false), 60); }}
    >
      {trigger}
      {show && createPortal(
        <div
          data-mode={kit?.mode}
          data-accent={kit?.accent}
          className="fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-[color:var(--ui-tooltip-border)] bg-[var(--ui-tooltip-bg)] text-[color:var(--ui-tooltip-text)] pointer-events-none"
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
