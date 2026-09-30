"use client";
import { useLayoutEffect, useRef, type RefObject } from 'react';
import { computePosition, offset, flip, shift, size } from '@floating-ui/react-dom';
import { useCurrentWindow } from './popout';

/**
 * THE dropdown/panel positioner — one engine for every floating menu surface
 * (kit DropdownMenu, app DropdownPanel, entity/select/autocomplete panels).
 *
 * The viewport is the VISUAL viewport: on iPad the software keyboard shrinks
 * and pans it without touching the layout viewport, so `innerWidth/Height`
 * (and a fixed element's CSS `bottom`) are the wrong bounds. Every decision —
 * flip, clamp, height cap — uses `visualViewport.offsetLeft/offsetTop/width/
 * height` expressed in layout-viewport coordinates (the same space as
 * `getBoundingClientRect`). Position is written as top/left only.
 *
 * Placement mirrors floating-ui's canonical `flip` → `shift` → `size` chain:
 *  1. measure the panel's natural content height (ignoring the last clamp);
 *  2. `flip` opens below when it fits, above when that fits, and picks the
 *     roomier side (`bestFit`) when neither does;
 *  3. `shift` slides it horizontally into view;
 *  4. `size` caps the height to the room left on the chosen side, never below
 *     `minHeight`.
 *
 * Re-measures on: any scroll (capture), window resize, visualViewport
 * resize/scroll (keyboard), and panel/content resize (filtering, list growth).
 */

export interface DropdownPanelPos {
  /** Layout-viewport coordinates (same space as `getBoundingClientRect`). */
  top: number;
  left: number;
  /** Final height cap for the panel, px. */
  maxH: number;
  /** The side the panel actually opened on, after flipping. */
  side: 'top' | 'bottom';
  ready: true;
}

export interface UseDropdownPositionOptions {
  anchorRef: RefObject<HTMLElement | null>;
  panelRef: RefObject<HTMLElement | null>;
  open: boolean;
  /** The scrolling content element inside the panel when the panel itself is
   *  not the scroller (DropdownPanel wraps one). Natural height is measured
   *  from here. Defaults to the panel. */
  contentRef?: RefObject<HTMLElement | null>;
  /** Distance between the anchor and the panel. Default 4. */
  gap?: number;
  /** Viewport padding kept clear around the panel. Default 8. */
  padding?: number;
  /** Per-surface height cap (e.g. 256 for the compact category menus).
   *  Default 384. */
  maxHeight?: number;
  /** Smallest height the panel may be clamped to before it stays usable.
   *  Default 32. */
  minHeight?: number;
  onPosition: (pos: DropdownPanelPos) => void;
}

export const DROPDOWN_MAX_HEIGHT = 384;

/** The visible viewport in layout-viewport coordinates. */
function visualBox(win: Window): { x: number; y: number; width: number; height: number } {
  const vv = win.visualViewport;
  if (!vv) return { x: 0, y: 0, width: win.innerWidth, height: win.innerHeight };
  return { x: vv.offsetLeft, y: vv.offsetTop, width: vv.width, height: vv.height };
}

export function useDropdownPosition({
  anchorRef,
  panelRef,
  open,
  contentRef,
  gap = 4,
  padding = 8,
  maxHeight,
  minHeight = 32,
  onPosition,
}: UseDropdownPositionOptions): void {
  const currentWindow = useCurrentWindow();
  const currentWindowRef = useRef(currentWindow);
  currentWindowRef.current = currentWindow;
  const onPositionRef = useRef(onPosition);
  onPositionRef.current = onPosition;

  useLayoutEffect(() => {
    if (!open) return;
    let raf = 0;
    let cancelled = false;

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const update = () => {
      raf = 0;
      if (cancelled) return;
      const win = currentWindowRef.current;
      const anchor = anchorRef.current;
      const panel = panelRef.current;
      if (!win || !anchor || !panel || !panel.isConnected) return;
      const content = contentRef?.current ?? panel;
      const boundary = visualBox(win);
      const cap = maxHeight ?? DROPDOWN_MAX_HEIGHT;
      const floor = Math.min(minHeight, cap);

      /* Natural content height. `scrollHeight` reports the FULL content even
         while a max-height clamps the panel — never lift the clamp to
         measure: mutating the rendered height re-triggers the ResizeObserver
         and loops. `chrome` is the panel's non-scrolling furniture (padding,
         search box, commit hint). */
      const chrome = Math.max(0, panel.offsetHeight - content.offsetHeight);
      const natural = Math.max(floor, Math.ceil(content.scrollHeight + chrome));
      const needed = Math.min(natural, cap);
      panel.style.maxHeight = `${needed}px`;

      let finalH = needed;
      computePosition(anchor, panel, {
        strategy: 'fixed',
        placement: 'bottom-start',
        middleware: [
          offset(gap),
          flip({ boundary, padding, fallbackStrategy: 'bestFit' }),
          shift({ boundary, padding, mainAxis: false }),
          size({
            boundary,
            padding,
            apply({ availableHeight }) {
              finalH = Math.max(floor, Math.floor(Math.min(cap, availableHeight)));
              panel.style.maxHeight = `${finalH}px`;
            },
          }),
        ],
      }).then(({ x, y, placement }) => {
        if (cancelled) return;
        onPositionRef.current({
          top: Math.round(y),
          left: Math.round(x),
          maxH: finalH,
          side: placement.startsWith('top') ? 'top' : 'bottom',
          ready: true,
        });
      });
    };

    update();

    const win = currentWindowRef.current;
    const doc = win?.document ?? null;
    const vv = win?.visualViewport ?? null;
    const onViewportChange = () => schedule();
    vv?.addEventListener('resize', onViewportChange);
    vv?.addEventListener('scroll', onViewportChange);
    win?.addEventListener('resize', onViewportChange);
    doc?.addEventListener('scroll', onViewportChange, { capture: true, passive: true });
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(onViewportChange);
      if (panelRef.current) ro.observe(panelRef.current);
      if (contentRef?.current) ro.observe(contentRef.current);
    }
    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      vv?.removeEventListener('resize', onViewportChange);
      vv?.removeEventListener('scroll', onViewportChange);
      win?.removeEventListener('resize', onViewportChange);
      doc?.removeEventListener('scroll', onViewportChange, { capture: true });
      ro?.disconnect();
    };
  }, [open, anchorRef, panelRef, contentRef, gap, padding, maxHeight, minHeight]);
}
