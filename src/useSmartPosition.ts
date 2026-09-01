"use client";
import { useLayoutEffect, useRef, type RefObject } from 'react';
import { useCurrentWindow } from './popout';

/** The visible viewport box. On iPad the software keyboard + Safari chrome
 *  live in the VISUAL viewport: `window.innerHeight` is the full layout
 *  viewport, so anything positioned against it ends up under the keyboard.
 *  `visualViewport.height`/`offsetTop` are the real visible bounds. */
function viewportBox(win: Window | null): { top: number; height: number; bottom: number } {
  if (!win) return { top: 0, height: 0, bottom: 0 };
  const vv = win.visualViewport;
  const top = vv ? vv.offsetTop : 0;
  const height = vv ? vv.height : win.innerHeight;
  return { top, height, bottom: top + height };
}

export function useSmartPosition(
  wrapperRef: RefObject<HTMLElement | null>,
  open: boolean,
) {
  const currentWindow = useCurrentWindow();
  const currentWindowRef = useRef(currentWindow);
  currentWindowRef.current = currentWindow;
  const apply = () => {
    if (!open || !wrapperRef.current) return;
    const dropdown = wrapperRef.current.querySelector('.absolute') as HTMLElement | null;
    if (!dropdown) return;

    dropdown.style.left = '';
    dropdown.style.right = '';
    dropdown.style.top = '';
    dropdown.style.bottom = '';
    dropdown.style.maxHeight = '';

    const win = currentWindowRef.current;
    if (!win) return;
    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const ddRect = dropdown.getBoundingClientRect();
    const vw = win.innerWidth;
    const vb = viewportBox(win);

    const overflowRight = ddRect.right - vw;
    if (overflowRight > 0) {
      const shift = Math.min(overflowRight + 8, ddRect.left);
      dropdown.style.left = `${ddRect.left - wrapperRect.left - shift}px`;
    }

    if (ddRect.left < 0) {
      dropdown.style.left = `${-wrapperRect.left + 4}px`;
    }

    if (ddRect.bottom > vb.bottom + 4) {
      dropdown.style.top = 'auto';
      dropdown.style.bottom = '100%';
      const newRect = dropdown.getBoundingClientRect();
      if (newRect.top < vb.top) {
        dropdown.style.bottom = 'auto';
        dropdown.style.top = `${-wrapperRect.top + vb.top + 4}px`;
        dropdown.style.maxHeight = `${vb.height - 8}px`;
      }
    }
  };
  useLayoutEffect(() => {
    apply();
    if (!open) return;
    const win = currentWindowRef.current;
    /* The iOS keyboard resizes the VISUAL viewport, not the window — and it
       fires resize/scroll on `window.visualViewport`, never on `window`. Keep
       relative panels inside the visible area as the keyboard opens/closes. */
    const vv = win?.visualViewport ?? null;
    vv?.addEventListener('resize', apply);
    vv?.addEventListener('scroll', apply);
    win?.addEventListener('resize', apply);
    return () => {
      vv?.removeEventListener('resize', apply);
      vv?.removeEventListener('scroll', apply);
      win?.removeEventListener('resize', apply);
    };
  }, [open, wrapperRef]);
}

export function useFixedPosition(
  wrapperRef: RefObject<HTMLElement | null>,
  open: boolean,
  setPos: (p: { top: number; left: number; width: number; maxH: number; bottom?: number }) => void,
  opts?: { panelWidth?: number },
) {
  const currentWindow = useCurrentWindow();
  const currentWindowRef = useRef(currentWindow);
  currentWindowRef.current = currentWindow;
  useLayoutEffect(() => {
    if (!open || !wrapperRef.current) return;
    const el = wrapperRef.current;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const win = currentWindowRef.current;
      if (!win) return;
      const vw = win.innerWidth;
      const vb = viewportBox(win);
      const panelWidth = opts?.panelWidth ?? Math.max(rect.width, 200);
      const gap = 4;
      const minH = 120;

      let left = Math.max(0, rect.left);
      if (left + panelWidth > vw) left = Math.max(0, vw - panelWidth - 8);

      const spaceBelow = vb.bottom - rect.bottom - gap - 16;
      const spaceAbove = rect.top - vb.top - gap - 16;

      if (spaceBelow >= minH || spaceBelow >= spaceAbove) {
        /* Open below the trigger — but CLAMP the top so the menu never
           extends off-screen: when the trigger sits at the viewport bottom
           with less than a menu-height of room, the old maxH floor (120px)
           pinned the top near the edge and pushed the whole menu out of
           view ("the menu disappears instead of flipping"). Keep at least
           40px of the menu visible. */
        const top = Math.min(rect.bottom + gap, Math.max(vb.top, vb.bottom - 40));
        const maxH = Math.max(32, vb.bottom - top - 16);
        setPos({ top, left, width: rect.width, maxH });
      } else {
        const maxH = Math.max(32, Math.min(spaceAbove, 360));
        const bottom = vb.bottom - (rect.top - gap);
        setPos({ top: 0, left, width: rect.width, maxH, bottom: Math.max(0, bottom) });
      }
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(measure); };
    /* Follow the trigger: any scroll (capture catches inner containers and
       the modal's body) or resize can move the anchor under a fixed panel —
       re-measure so the overlay tracks it. */
    const win = currentWindowRef.current ?? null;
    const doc = win?.document ?? null;
    schedule();
    doc?.addEventListener('scroll', schedule, { capture: true, passive: true });
    win?.addEventListener('resize', schedule);
    /* The iOS keyboard lives in the visual viewport: opening it fires resize
       on `window.visualViewport`, NOT `window`, and inside a modal the page
       can't scroll (react-remove-scroll) so no scroll event saves us either —
       a panel open near the keyboard kept its stale, too-low position. Re-measure
       on visualViewport resize/scroll so panels stay inside the visible area. */
    const vv = win?.visualViewport ?? null;
    vv?.addEventListener('resize', schedule);
    vv?.addEventListener('scroll', schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      doc?.removeEventListener('scroll', schedule, { capture: true });
      win?.removeEventListener('resize', schedule);
      vv?.removeEventListener('resize', schedule);
      vv?.removeEventListener('scroll', schedule);
    };
  }, [open, wrapperRef, opts?.panelWidth]);
}
