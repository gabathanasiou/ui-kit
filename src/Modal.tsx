import React, { useRef, useState, useCallback, useEffect, useLayoutEffect } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { X, RotateCcw } from 'lucide-react';
import { IS_COARSE, useCoarse } from './device';
import { usePortalTarget, useCurrentWindow } from './popout';

const MAX_EDGE = 8;

/* Modal stack + transitions:
   - STACKED (a modal spawns another, e.g. Day Events → Rule Editor): the
     child grows OUT of the parent's box (FLIP: measure both rects,
     start-transform the child onto the parent's box, rAF to identity) and the
     SURVIVOR shrinks back from the closing child's box while the CSS fade
     (tokens.css [data-modal-stack]) brings it back.
   - STANDALONE: zoom in from 94% on open, zoom out on close (the Modal owns
     its dismissal paths — X, Esc, outside-click, overlay touch — and plays
     the zoom-out BEFORE calling onClose; footer buttons that call onClose
     directly snap closed; stacked children skip the self-zoom since the
     survivor's morph-back is the close effect).
   - SIZE CHANGES (tab switches, async loads): FLIP the box height with a
     ResizeObserver — un-dragged modals stay centered on the viewport
     (height + top interpolate linearly together → center constant); dragged
     ones keep their top edge. The pin happens INSIDE the RO delivery (same
     frame as the layout change, pre-paint) so the new size never paints
     first.
   Dialogs portal as siblings into the window body, so DOM order = stack
   order and rects are measured per window (popout windows work
   automatically). Transforms live on the CONTENT box itself (a wrapper would
   crop inside its overflow-hidden) and never touch pointer-events. The
   morphing flag can be switched off per-instance (morph={false}).
   prefers-reduced-motion skips all of it. */
const STACK_SELECTOR = '[data-modal-stack]';
const MORPH_MS = 220;
const MORPH_EASE = 'cubic-bezier(0.32, 0.72, 0, 1)';
const ZOOM_FROM = 0.94;

function reduceMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** The visible viewport box. On iPad the software keyboard + Safari chrome
 *  live in the VISUAL viewport: `window.innerHeight` is the full layout
 *  viewport, so a modal centred against it lands under the keyboard / off
 *  centre. `visualViewport.height`/`offsetTop` are the real visible bounds. */
function viewportBox(win: Window | null): { top: number; height: number; bottom: number } {
  if (!win) return { top: 0, height: 0, bottom: 0 };
  const vv = win.visualViewport;
  const top = vv ? vv.offsetTop : 0;
  const height = vv ? vv.height : win.innerHeight;
  return { top, height, bottom: top + height };
}

/** Rect-to-rect map: how to transform an element occupying `from` so it
 *  visually sits on `to` (origin top-left). */
function rectMap(from: Pick<DOMRect, 'left' | 'top' | 'width' | 'height'>, to: Pick<DOMRect, 'left' | 'top' | 'width' | 'height'>) {
  return `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${to.width / from.width}, ${to.height / from.height})`;
}

/** FLIP: pin `el` visually onto `from` (no transition), then animate to its
 *  true box. The inline transition also carries opacity 180ms so a survivor's
 *  CSS fade (tokens.css [data-modal-stack]) keeps running under it. */
function playMorph(token: { current: number }, el: HTMLElement, from: DOMRect, onDone: () => void) {
  const my = ++token.current;
  const to = el.getBoundingClientRect();
  el.style.transition = 'none';
  el.style.transform = rectMap(to, from);
  el.style.transformOrigin = '0 0';
  void el.getBoundingClientRect(); // force reflow so the start state is committed
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (token.current !== my) return;
      el.style.transition = `transform ${MORPH_MS}ms ${MORPH_EASE}, opacity 180ms ease`;
      el.style.transform = 'none';
      window.setTimeout(() => {
        if (token.current !== my) return;
        el.style.transition = '';
        el.style.transform = '';
        el.style.transformOrigin = '';
        onDone();
      }, MORPH_MS + 80);
    });
  });
}

/** Standalone-open zoom: grow the content box from ZOOM_FROM to full. */
function zoomIn(token: { current: number }, el: HTMLElement, onDone: () => void) {
  const my = ++token.current;
  el.style.transition = 'none';
  el.style.transformOrigin = 'center';
  el.style.transform = `scale(${ZOOM_FROM})`;
  void el.getBoundingClientRect();
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (token.current !== my) return;
      el.style.transition = `transform ${MORPH_MS}ms ${MORPH_EASE}`;
      el.style.transform = 'none';
      window.setTimeout(() => {
        if (token.current !== my) return;
        el.style.transition = '';
        el.style.transform = '';
        el.style.transformOrigin = '';
        onDone();
      }, MORPH_MS + 60);
    });
  });
}

/** Standalone-close zoom: shrink the content box to ZOOM_FROM (center-anchored,
 *  so the offset target keeps the center fixed) while fading out. The closing
 *  styles are NEVER cleared while the content is still mounted: clearing
 *  `opacity` there paints one last full-opacity frame if the caller's unmount
 *  render is deferred (the classic close-flash). The box is pinned invisible,
 *  onClose unmounts it, and the styles are only restored once it is detached. */
function zoomOut(token: { current: number }, el: HTMLElement, onDone: () => void) {
  const my = ++token.current;
  const r = el.getBoundingClientRect();
  const inset = 1 - ZOOM_FROM;
  const t = { left: r.left + r.width * inset / 2, top: r.top + r.height * inset / 2, width: r.width * ZOOM_FROM, height: r.height * ZOOM_FROM };
  el.style.transition = `transform ${MORPH_MS}ms ${MORPH_EASE}, opacity 170ms ease`;
  el.style.transformOrigin = '0 0';
  el.style.transform = rectMap(r, t);
  el.style.opacity = '0';
  window.setTimeout(() => {
    if (token.current !== my) return;
    el.style.visibility = 'hidden';
    onDone();
    requestAnimationFrame(() => {
      if (token.current !== my || el.isConnected) return;
      el.style.transition = '';
      el.style.transform = '';
      el.style.transformOrigin = '';
      el.style.opacity = '';
      el.style.visibility = '';
    });
  }, MORPH_MS + 60);
}

/** Open [data-modal-stack] content siblings of `el` that precede it (its
 *  stack parents — DOM order = stack order). */
function stackParents(el: HTMLElement): HTMLElement[] {
  const parent = el.parentNode;
  if (!parent) return [];
  return Array.from(parent.children)
    .filter((n): n is HTMLElement => n instanceof HTMLElement && n !== el && n.matches(STACK_SELECTOR) && (n.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0)
    .filter(n => n.getAttribute('data-state') === 'open');
}

/** Open [data-modal-stack] content siblings of `el` that follow it (its
 *  stack children). */
function stackChildren(el: HTMLElement): HTMLElement[] {
  const parent = el.parentNode;
  if (!parent) return [];
  return Array.from(parent.children)
    .filter((n): n is HTMLElement => n instanceof HTMLElement && n !== el && n.matches(STACK_SELECTOR) && (n.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_PRECEDING) !== 0)
    .filter(n => n.getAttribute('data-state') === 'open');
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  icon?: React.ReactNode;
  width?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
  onReset?: () => void;
  /** Stack/zoom/size transitions on this instance (default true). */
  morph?: boolean;
  /** Lock the modal open (default true): Esc/backdrop/overlay-touch/X are
     no-ops and the X button is hidden — the caller decides when it closes
     (e.g. the Project Manager when no project is open). */
  closable?: boolean;
  /** Block BACKDROP dismissal only (default true) — a click/tap outside the
     modal is a no-op, while Esc, the X and the caller's buttons still work.
     Dialogs use it so every type "needs attention": pick an explicit action,
     the backdrop never dismisses. */
  dismissOnBackdrop?: boolean;
  /** Flat "dialog" chrome: no header bar or footer bar (no borders/bands) —
     the title row and the footer row sit on the same surface as the body.
     The Dialog (confirm/prompt/alert) renders through this mode. Same
     animations, drag and Enter-confirm as the regular chrome. */
  flat?: boolean;
}

export default function Modal({
  open,
  onClose,
  title,
  icon,
  width,
  footer,
  children,
  onReset,
  morph = true,
  flat = false,
  closable = true,
  dismissOnBackdrop = true,
}: ModalProps) {
  const coarse = useCoarse();
  const contentRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  /* Touch-sized chrome (coarse devices; the global coarseScale knob gates it). */
  const HEADER_PX = coarse ? 'px-6' : 'px-5';
  const HEADER_PY = coarse ? 'py-3' : 'py-2.5';
  const TITLE_SIZE = coarse ? 'text-sm' : 'text-xs';
  const CLOSE_ICON = coarse ? 'w-4 h-4' : 'w-3.5 h-3.5';
  const FLAT_TITLE = coarse ? 'text-base' : 'text-sm';
  const FLAT_CLOSE = coarse ? 'w-5 h-5' : 'w-4 h-4';
  const FLAT_PAD = coarse ? 'px-6' : 'px-5';
  const FLAT_TOP = coarse ? 'pt-6' : 'pt-5';
  const FLAT_BOTTOM = coarse ? 'pb-6' : 'pb-5';
  const RESET_TEXT = coarse ? 'text-xs' : 'text-[10px]';
  const RESET_ICON = coarse ? 'w-3.5 h-3.5' : 'w-3 h-3';
  const RESET_PAD = coarse ? 'px-2.5 py-1.5' : 'px-2 py-1';
  const FOOTER_PX = coarse ? 'px-6' : 'px-5';
  const FOOTER_PY = coarse ? 'py-3' : 'py-2';
  const [contentReady, setContentReady] = useState(false);
  /* Radix mounts the Portal content in a LATER commit than the Modal's own
     layout effects (ref is null + content absent when [open] effects run, and
     they never re-run since `open` doesn't change). A ref callback that flips
     contentReady makes every effect react to the content actually mounting. */
  const setContentRef = useCallback((node: HTMLDivElement | null) => {
    contentRef.current = node;
    setContentReady(node !== null);
  }, []);
  const portalTarget = usePortalTarget();
  const currentWindow = useCurrentWindow();
  const currentWindowRef = useRef(currentWindow);
  currentWindowRef.current = currentWindow;
  const [dragPos, setDragPos] = useState<{ left: number; top: number } | null>(null);
  const dragRef = useRef<{ startX: number; startY: number; posX: number; posY: number } | null>(null);
  /* True once the user drags the modal — content-driven size changes then
     keep the top edge fixed instead of re-centering. Reset on close. */
  const draggedRef = useRef(false);
  /* Keyboard presence. Two signals, both handled: the software keyboard either
     shrinks the VISUAL viewport (visualViewport.height << innerHeight) or —
     iPad's classic behaviour — resizes the LAYOUT viewport itself (innerHeight
     drops while innerWidth stays put). Either counts as a keyboard transition.
     `kbActiveRef` latches true and only clears after a settle window, so the
     ResizeObserver's per-frame deliveries during the dismissal never re-centre
     the modal ("pushed down after the keyboard closes"). */
  const kbActiveRef = useRef(false);
  const kbClearTimerRef = useRef<number>(0);
  const lastLayoutRef = useRef({ w: 0, h: 0 });
  const initRef = useRef(false);
  const [morphing, setMorphing] = useState(false);
  /* Mirrored keyboard state (render needs it for the maxHeight clamp below;
     kbActiveRef is the imperative copy read outside renders). */
  const [kbOpen, setKbOpen] = useState(false);
  const animToken = useRef(0);
  const closingRef = useRef(false);
  /* Mirrored state for the overlay: the dim fades out the moment the close
     morph STARTS (Radix's data-state only flips "closed" after the caller
     unmounts — too late for a fade). */
  const [closing, setClosing] = useState(false);
  const morphRef = useRef(morph);
  morphRef.current = morph;
  /* Set when doClose already animated the close (X/Esc/outside/touch) — the
     unmount clone must not double-play. */
  const exitedRef = useRef(false);
  /* Imperative mirror of `morphing` for the ResizeObserver callback (refs are
     read outside React renders). */
  const anyAnimRef = useRef(false);
  const beginAnim = () => { anyAnimRef.current = true; setMorphing(true); };
  const endAnim = () => { anyAnimRef.current = false; setMorphing(false); };

  useEffect(() => {
    if (!open) { setDragPos(null); initRef.current = false; draggedRef.current = false; setKbOpen(false); }
  }, [open]);

  useLayoutEffect(() => {
    if (!open || initRef.current || !contentReady || !contentRef.current) return;
    initRef.current = true;
    /* Pin the CENTERED position as an explicit left/top (the drag/RO math
       works on plain pixels, so the centering translate classes are dropped
       once dragPos is set). Compute it from the viewport + measured size —
       NEVER from the element's rect: measured while the enter morph is
       running (or under Tailwind v4's `translate` property) it reads the
       transformed, off-center box and the modal would stick there. The
       viewport-center invariant is the same one the size-change animation
       uses. */
    const r = contentRef.current.getBoundingClientRect();
    const win = currentWindowRef.current ?? null;
    const vw = win?.innerWidth ?? 0;
    const vb = viewportBox(win);
    setDragPos({
      left: Math.max(MAX_EDGE, Math.min((vw - r.width) / 2, vw - r.width - MAX_EDGE)),
      top: Math.max(vb.top + MAX_EDGE, Math.min(vb.top + (vb.height - r.height) / 2, vb.bottom - r.height - MAX_EDGE)),
    });
  }, [open, contentReady]);

  /* Enter animation: stacked modals grow out of the box beneath them; the
     first modal of a stack (or any standalone modal) zooms in from 94%.
     Runs pre-paint; the transform composes with the centering translate
     classes (measured rects are box-accurate regardless). */
  useLayoutEffect(() => {
    if (!open || !contentReady || !morph || reduceMotion() || !contentRef.current) return;
    const el = contentRef.current;
    const parents = stackParents(el);
    const parent = parents[parents.length - 1];
    beginAnim();
    if (parent) {
      playMorph(animToken, el, parent.getBoundingClientRect(), endAnim);
    } else {
      zoomIn(animToken, el, endAnim);
    }
  }, [open, contentReady]);

  /* Close: the Modal owns its dismissal paths (X, Esc, outside-click, overlay
     touch) — intercept them to play the zoom-out FIRST, then call onClose so
     the caller's unmount happens after the animation. Stacked children skip
     the self-zoom (the survivor's morph-back is the close effect). */
  const doClose = useCallback(() => {
    if (!closable || closingRef.current) return;
    const el = contentRef.current;
    const stacked = !!el && stackParents(el).length > 0;
    if (!el || !morph || reduceMotion() || stacked) { onClose(); return; }
    closingRef.current = true;
    setClosing(true);
    exitedRef.current = true;
    beginAnim();
    zoomOut(animToken, el, () => {
      closingRef.current = false;
      setClosing(false);
      endAnim();
      onClose();
    });
  }, [morph, onClose, closable]);

  /* Unmount-driven / open-flip closes (action buttons — Save/Confirm/select
     call the caller's onClose directly, or an ALWAYS-MOUNTED Modal (the
     DialogProvider pattern) just flips `open`). In both cases the component
     doesn't play doClose, so CLONE the content box, swap in the clone (an
     exact visual copy of the last rendered state) and zoom it out. The clone
     is a11y-hidden + pointer-transparent so it never intercepts anything; it
     is stripped of the stack/radix attributes so it can't participate in the
     stack CSS. Stacked children skip (the survivor's morph-back is the close
     effect); doClose-animated paths skip (exitedRef). */
  const cloneClose = useCallback(() => {
    const el = contentRef.current;
    if (!el || exitedRef.current) return;
    if (!morphRef.current || reduceMotion() || stackParents(el).length > 0) return;
    const doc = el.ownerDocument;
    const clone = el.cloneNode(true) as HTMLElement;
    clone.removeAttribute('data-modal-stack');
    clone.removeAttribute('data-state');
    clone.removeAttribute('role');
    clone.removeAttribute('data-aria-hidden');
    clone.removeAttribute('tabindex');
    clone.setAttribute('aria-hidden', 'true');
    clone.style.pointerEvents = 'none';
    doc.body.appendChild(clone);
    zoomOut({ current: 0 }, clone, () => { if (clone.isConnected) clone.remove(); });
  }, []);

  useLayoutEffect(() => {
    return () => cloneClose();
  }, [cloneClose]);

  /* Always-mounted Modals (DialogProvider renders <Modal open={...}>) close by
     flipping `open` — the component never unmounts, so the unmount-clone above
     never fires and dialogs/alerts would snap away with no fade. Clone + morph
     on the open→closed transition too. */
  const prevOpenRef = useRef(open);
  useLayoutEffect(() => {
    const wasOpen = prevOpenRef.current;
    prevOpenRef.current = open;
    if (wasOpen && !open) cloneClose();
  }, [open, contentReady, cloneClose]);

  /* Exit morph: while an open stack-child exists, track its box each frame;
     when it disappears, shrink back from its last box (the CSS fade restores
     visibility in parallel). The MutationObserver arms the poll only when a
     child actually mounts. */
  useEffect(() => {
    if (!open || !contentReady || !morph || !contentRef.current) return;
    const el = contentRef.current;
    const container = el.parentNode as ParentNode | null;
    if (!container) return;
    let raf = 0;
    let lastChildRect: DOMRect | null = null;
    let hadOpenChild = false;
    const poll = () => {
      raf = 0;
      const children = stackChildren(el);
      if (children.length > 0) {
        /* A new child is stacking — release any fade-recovery override so the
           CSS `:has` stack fade can hide this modal again (roadmap 71). */
        el.style.opacity = '';
        el.style.pointerEvents = '';
        lastChildRect = children[children.length - 1].getBoundingClientRect();
        hadOpenChild = true;
        raf = requestAnimationFrame(poll);
      } else if (hadOpenChild) {
        hadOpenChild = false;
        if (lastChildRect && !reduceMotion()) {
          beginAnim();
          playMorph(animToken, el, lastChildRect, endAnim);
        }
        lastChildRect = null;
        /* Stack-fade recovery (roadmap 71): the tokens.css `:has` fade should
           bring the survivor back to opacity 1, but iOS Safari can leave its
           composited layer stuck at opacity 0 after a stacked child unmounts —
           the reported "previous modal invisible but still there" freeze.
           Watchdog: once the 180ms fade window has passed, if the survivor is
           still faded, pin it back INLINE (inline wins over the :has rule);
           the next stack-open releases the override so future fades work. */
        const win = currentWindowRef.current ?? null;
        win?.setTimeout(() => {
          if (!el || !el.isConnected) return;
          if (getComputedStyle(el).opacity === '1') return;
          el.style.opacity = '1';
          el.style.pointerEvents = '';
        }, 240);
      }
    };
    const obs = new MutationObserver(() => {
      if (!raf && stackChildren(el).length > 0) raf = requestAnimationFrame(poll);
    });
    obs.observe(container, { childList: true });
    return () => { obs.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, [open, contentReady]);

  /* Content-driven size changes (tab switches, async loads — e.g. Project
     Manager Local↔Cloud): FLIP the box HEIGHT — pin the old height, then
     transition to the new px height, then release to auto (no jump, since
     auto == the new height by then). The PIN must happen INSIDE the RO
     delivery (same frame as the layout change, pre-paint) — deferring it to
     rAF lets the new size paint for a frame first and reads as jumpy.
     Un-dragged modals stay centered while animating (height + top interpolate
     linearly together → the center is constant); dragged ones keep their top
     edge. Fires during an animation are skipped (re-anchored after). */
  useEffect(() => {
    if (!contentReady || !morph || reduceMotion() || !contentRef.current) return;
    const el = contentRef.current;
    let lastH = Math.round(el.getBoundingClientRect().height);
    let seen = false;
    const ro = new ResizeObserver(() => {
      if (!el.isConnected) return; // closing/unmounting — never animate
      const h = Math.round(el.getBoundingClientRect().height);
      if (!seen) { seen = true; lastH = h; return; }
      if (Math.abs(h - lastH) < 1) return;
      if (dragRef.current || closingRef.current || stackChildren(el).length > 0) { lastH = h; return; }
      if (anyAnimRef.current) return; // mid-morph: don't re-anchor; the finishing fire re-animates
      const from = lastH;
      lastH = h;
      beginAnim();
      const r = el.getBoundingClientRect();
      const vb = viewportBox(currentWindowRef.current ?? null);
      /* Keep un-dragged modals centered on the VISIBLE viewport (center =
         offsetTop + vh/2 is the invariant — not the previous state, so chained
         animations over transient sizes never drift). Pin the box at the old
         height with the top already at its centered position, then animate
         height + top together (both interpolate linearly → center is constant).
         EXCEPT during a keyboard transition (open or dismissal): the height
         change is the keyboard resizing the viewport, so keep the top edge
         fixed and grow/shrink from it — re-centring there is the "pushed down
         after the keyboard closes" jump. */
      const centerLock = !draggedRef.current && !kbActiveRef.current;
      const topPin = centerLock ? vb.top + (vb.height - from) / 2 : r.top;
      const topEnd = centerLock ? vb.top + (vb.height - h) / 2 : r.top;
      el.style.transition = 'none';
      el.style.height = `${from}px`;
      if (centerLock) el.style.top = `${topPin}px`;
      /* The body is overflow-y-auto — while the box is pinned smaller than
         the content, a scrollbar would appear and take layout width (shift).
         Hide it for the duration of the animation. */
      if (bodyRef.current) bodyRef.current.style.overflow = 'hidden';
      void el.getBoundingClientRect(); // commit the pin before paint
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (el.style.height !== `${from}px`) return;
          el.style.transition = `height ${MORPH_MS}ms ${MORPH_EASE}${centerLock ? `, top ${MORPH_MS}ms ${MORPH_EASE}` : ''}`;
          el.style.height = `${h}px`;
          if (centerLock) el.style.top = `${topEnd}px`;
          window.setTimeout(() => {
            if (el.style.height !== `${h}px`) return;
            el.style.transition = '';
            el.style.height = '';
            if (bodyRef.current) bodyRef.current.style.overflow = '';
            /* Commit the new centered top through React (dragPos owns left/top
               in the style prop) — clearing the inline top would leave the
               stale pre-growth top, and React only rewrites on prop change. */
            if (centerLock) setDragPos({ left: r.left, top: topEnd });
            endAnim();
          }, MORPH_MS + 60);
        });
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [contentReady]);

  // NOTE: the Radix dialog stays modal (default) — portaled overlays shown
  // above it (e.g. DurationKeypad) set their own pointer-events: auto.

  const captureRect = useCallback((): { left: number; top: number; width: number; height: number } | null => {
    const el = contentRef.current;
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { left: r.left, top: r.top, width: r.width, height: r.height };
  }, []);

  const clampPos = useCallback((left: number, top: number) => {
    const win = currentWindowRef.current ?? null;
    const vw = win?.innerWidth ?? 0;
    const vb = viewportBox(win);
    const r = captureRect();
    const w = r ? r.width : Math.min(vw - MAX_EDGE * 2, 576);
    const h = r ? r.height : Math.min(vb.height - MAX_EDGE * 2, 400);
    return {
      left: Math.max(MAX_EDGE, Math.min(left, vw - w - MAX_EDGE)),
      top: Math.max(vb.top + MAX_EDGE, Math.min(top, vb.bottom - h - MAX_EDGE)),
    };
  }, [captureRect]);

  /* Keyboard / Safari-chrome re-centre: the software keyboard lives in the
     VISUAL viewport — opening/closing it fires resize/scroll on
     `window.visualViewport`, never on `window`, so no size change reaches the
     RO above. When the visible area shrinks (keyboard up) the modal must
     re-centre into it and re-clamp (never end up under the keyboard); when it
     grows back it must follow. Un-dragged modals re-centre, dragged ones
     keep their top edge and just re-clamp. */
  useEffect(() => {
    if (!open) return;
    const win = currentWindowRef.current ?? null;
    const vv = win?.visualViewport ?? null;
    if (!win || !vv) return;
    /* The Safari toolbar eats ~60px of the visible height; the keyboard
       ~300px+. Above that gap it's a keyboard transition, below it's just
       the toolbar / a plain window resize. */
    const KEYBOARD_GAP = 120;
    kbActiveRef.current = false;
    lastLayoutRef.current = { w: win.innerWidth, h: win.innerHeight };
    /* rAF-coalesce the vv resize/scroll burst (keyboard animation, Safari's
       pan-to-reveal-input): handle at most once per frame. */
    let raf = 0;
    const onVvChange = () => {
      if (closingRef.current || dragRef.current) return;
      /* Keyboard detection — run SYNCHRONOUSLY so the ResizeObserver
         (delivered after the layout change) already sees the latched flag:
         either the visual viewport shrank below the layout height, or the
         layout viewport itself shrunk height-only (iPad's classic keyboard
         resize). Latched + settle timer → stays "active" through the
         dismissal so nothing re-centres mid-transition. */
      const ih = win?.innerHeight ?? 0;
      const iw = win?.innerWidth ?? 0;
      const vbNow = viewportBox(win);
      const visualShrank = vbNow.height < ih - KEYBOARD_GAP;
      const layoutShrank = ih < lastLayoutRef.current.h - KEYBOARD_GAP && iw === lastLayoutRef.current.w;
      if (visualShrank || layoutShrank) {
        kbActiveRef.current = true;
        if (kbClearTimerRef.current) { clearTimeout(kbClearTimerRef.current); kbClearTimerRef.current = 0; }
      } else if (!kbClearTimerRef.current) {
        kbClearTimerRef.current = win?.setTimeout(() => {
          kbActiveRef.current = false;
          kbClearTimerRef.current = 0;
          setKbOpen(false);
        }, 600) ?? 0;
      }
      setKbOpen(kbActiveRef.current);
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = contentRef.current;
        if (!el) return;
        const vb = viewportBox(currentWindowRef.current ?? null);
        const r = el.getBoundingClientRect();
        const vw = currentWindowRef.current?.innerWidth ?? 0;
        /* Raw "keyboard actually present right now", against the PREVIOUS
           layout (so it turns false the moment the keyboard starts dismissing
           instead of chasing intermediate values). */
        const ihNow = win?.innerHeight ?? 0;
        const kbNow = vb.height < ihNow - KEYBOARD_GAP
          || (ihNow < lastLayoutRef.current.h - KEYBOARD_GAP && win?.innerWidth === lastLayoutRef.current.w);
        lastLayoutRef.current = { w: win?.innerWidth ?? 0, h: ihNow };
        const fits = r.top >= vb.top + MAX_EDGE && r.bottom <= vb.bottom - MAX_EDGE;
        const reposition = () => {
          /* Header stays reachable (top clamped to the visible viewport); a
             taller-than-visible modal keeps its natural size and overflows
             under the keyboard — the body scrolls. */
          setDragPos({
            left: Math.max(MAX_EDGE, Math.min((vw - r.width) / 2, vw - r.width - MAX_EDGE)),
            top: Math.max(vb.top + MAX_EDGE, Math.min(vb.top + (vb.height - r.height) / 2, vb.bottom - r.height - MAX_EDGE)),
          });
        };
        if (kbNow && !IS_COARSE) {
          /* Keyboard genuinely up (desktop/coarse with a keyboard — but on
             touch the modal stays put: the keyboard simply covers the bottom,
             never pushes it). Move only when it actually covers the modal
             (bottom past the visible viewport) or a Safari pan pushed the top
             off-screen. Never push an uncovered modal around. */
          if (draggedRef.current) { if (!fits) setDragPos(clampPos(r.left, r.top)); return; }
          if (fits) return;
          reposition();
          return;
        }
        if (kbActiveRef.current) {
          /* Keyboard dismissing but not yet settled — freeze. Safari's closing
             animation fires intermediate values (offsetTop mid-pan) and
             re-centring against them is what made the modal visibly drop
             after the keyboard closed. It stays where the keyboard left it. */
          return;
        }
        /* Keyboard gone AND settled — plain viewport change (window resize,
           orientation change): keep un-dragged modals centred / on-screen. */
        if (draggedRef.current) { if (!fits) setDragPos(clampPos(r.left, r.top)); return; }
        if (fits) return;
        reposition();
      });
    };
    vv.addEventListener('resize', onVvChange);
    vv.addEventListener('scroll', onVvChange);
    /* Orientation: ALWAYS re-centre un-dragged modals (not just when they
       don't fit) — after a rotate the old centre is the wrong spot. Runs in
       the shared rAF so it coalesces with a same-frame vv resize. */
    const onOrientation = () => {
      if (closingRef.current || dragRef.current) return;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = contentRef.current;
        if (!el) return;
        const win2 = currentWindowRef.current ?? null;
        const vb = viewportBox(win2);
        const vw = win2?.innerWidth ?? 0;
        const r = el.getBoundingClientRect();
        if (draggedRef.current) { setDragPos(clampPos(r.left, r.top)); return; }
        setDragPos({
          left: Math.max(MAX_EDGE, Math.min((vw - r.width) / 2, vw - r.width - MAX_EDGE)),
          top: Math.max(vb.top + MAX_EDGE, Math.min(vb.top + (vb.height - r.height) / 2, vb.bottom - r.height - MAX_EDGE)),
        });
      });
    };
    win.addEventListener('orientationchange', onOrientation);
    return () => {
      vv.removeEventListener('resize', onVvChange);
      vv.removeEventListener('scroll', onVvChange);
      win.removeEventListener('orientationchange', onOrientation);
      if (raf) cancelAnimationFrame(raf);
      if (kbClearTimerRef.current) clearTimeout(kbClearTimerRef.current);
    };
  }, [open, clampPos]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    draggedRef.current = true;
    const r = captureRect(); if (!r) return;
    setDragPos(clampPos(r.left, r.top));
    dragRef.current = { startX: e.clientX, startY: e.clientY, posX: r.left, posY: r.top };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [captureRect, clampPos]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
    e.preventDefault();
    setDragPos(clampPos(d.posX + e.clientX - d.startX, d.posY + e.clientY - d.startY));
  }, [clampPos]);

  const onPointerUp = useCallback(() => { dragRef.current = null; }, []);

  const isDragging = dragRef.current !== null;

  /* Double-click / double-tap the HEADER to re-centre the modal (e.g. after
     dragging it off-centre, or the keyboard nudged it). Time-windowed clicks
     (300ms) so it works for mouse AND touch (iOS doesn't reliably fire
     dblclick). Resets the dragged flag so future content-height changes
     re-centre again. */
  const recenter = useCallback(() => {
    draggedRef.current = false;
    const win = currentWindowRef.current ?? null;
    const vb = viewportBox(win);
    const vw = win?.innerWidth ?? 0;
    const el = contentRef.current;
    const r = el ? el.getBoundingClientRect() : { width: 0, height: 0 };
    setDragPos({
      left: Math.max(MAX_EDGE, Math.min((vw - r.width) / 2, vw - r.width - MAX_EDGE)),
      top: Math.max(vb.top + MAX_EDGE, Math.min(vb.top + (vb.height - r.height) / 2, vb.bottom - r.height - MAX_EDGE)),
    });
  }, []);
  const lastHeaderTapRef = useRef(0);
  const onHeaderClick = useCallback(() => {
    const now = Date.now();
    if (now - lastHeaderTapRef.current < 300) {
      lastHeaderTapRef.current = 0;
      recenter();
    } else {
      lastHeaderTapRef.current = now;
    }
  }, [recenter]);

  const hasExplicit = dragPos !== null;

  const posClasses = hasExplicit ? '' : 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2';
  const sizeClasses = `${width ? `${width} w-full` : 'max-w-xl w-full'}`;

  /* Height stays clamped to the LAYOUT viewport only (100vh — never shrunk by
     the on-screen keyboard, which resizes the visual viewport). With the
     keyboard up the modal keeps its natural size; the covered bottom simply
     sits under it and the body scrolls — squishing the box to the visual
     viewport makes tall modals unusably short. */
  const combinedStyle: React.CSSProperties = {
    ...(hasExplicit ? { left: dragPos!.left, top: dragPos!.top } : {}),
    width: `min(100%, calc(100vw - ${MAX_EDGE * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...(kbOpen ? {} : { maxHeight: `calc(100vh - ${MAX_EDGE * 2}px)` }),
  };

  /* Enter confirms: when nothing interactive is focused (no input/textarea/
     button/dropdown), Enter clicks the footer's primary action — the LAST
     footer button by convention (Cancel first, action last; danger buttons
     sit first with mr-auto). An explicit `data-modal-confirm` marker on a
     footer button wins over the heuristic. A disabled last button is a
     no-op (the form must be fixed first, never fall back to Cancel).
     EXCEPTION: the modal CHROME buttons (the X close button, or a footer
     button that Radix focused on open) still redirect Enter to the primary
     action — Enter on a dialog means "the main option" (Save/OK/Confirm),
     not a native click on whichever chrome button has focus. Body buttons
     keep their native Enter. */
  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Enter' || e.shiftKey || e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target as HTMLElement;
    const footer = footerRef.current;
    const chromeFocused =
      !!t.closest('[data-modal-close]') ||
      (!!footer && footer.contains(t) && !!t.closest('button, a, [role="button"]'));
    if (!chromeFocused && t.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]')) return;
    if (document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]')) return;
    if (!footer) return;
    const marked = Array.from(footer.querySelectorAll<HTMLButtonElement>('button[data-modal-confirm]'));
    const buttons = marked.length > 0 ? marked : Array.from(footer.querySelectorAll<HTMLButtonElement>('button'));
    const confirm = buttons[buttons.length - 1];
    if (!confirm || confirm.disabled) return;
    e.preventDefault();
    confirm.click();
  }, []);

  return (
    <RadixDialog.Root open={open} onOpenChange={(o) => { if (!o) doClose(); }}>
      <RadixDialog.Portal container={portalTarget ?? undefined}>
        <RadixDialog.Overlay
          className={`ui-modal-overlay fixed inset-0 z-[9999]${closing ? ' ui-modal-overlay-closing' : ''}`}
          style={{ touchAction: 'manipulation' }}
          onTouchEnd={(e) => {
            if (document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]')) return;
            e.preventDefault();
            if (dismissOnBackdrop) doClose();
          }}
        />
        <RadixDialog.Content
          ref={setContentRef}
          onKeyDown={onKeyDown}
          onInteractOutside={(e) => { if (!dismissOnBackdrop) e.preventDefault(); }}
          data-modal-stack
          className={`fixed z-[10000] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${posClasses} ${sizeClasses}`}
          style={{ touchAction: 'manipulation', ...(Object.keys(combinedStyle).length > 0 ? combinedStyle : {}) }}
        >
          {flat ? (
            <div
              className={`flex items-center justify-between ${FLAT_PAD} ${FLAT_TOP} pb-4 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              onPointerDown={(e) => { if (!morphing) onPointerDown(e); }}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onClick={onHeaderClick}
            >
              <RadixDialog.Title className={`${FLAT_TITLE} font-bold text-white truncate`}>
                {title}
              </RadixDialog.Title>
              {closable && (
                <RadixDialog.Close data-modal-close className="text-zinc-500 hover:text-white transition-colors shrink-0">
                  <X className={FLAT_CLOSE} />
                </RadixDialog.Close>
              )}
            </div>
          ) : (
          <div
            className={`flex items-center justify-between ${HEADER_PX} ${HEADER_PY} border-b border-zinc-800 shrink-0 bg-zinc-950 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onPointerDown={(e) => { if (!morphing) onPointerDown(e); }}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onClick={onHeaderClick}
          >
            <div className="flex items-center gap-2 min-w-0">
              {icon && <span className="text-zinc-400 shrink-0">{icon}</span>}
              <RadixDialog.Title className={`${TITLE_SIZE} font-bold text-white truncate`}>
                {title}
              </RadixDialog.Title>
            </div>
            <div className="flex items-center gap-2">
              {onReset && (
                <button onClick={onReset} className={`flex items-center gap-1 ${RESET_TEXT} text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 hover:bg-zinc-700 rounded ${RESET_PAD} shrink-0`}>
                  <RotateCcw className={RESET_ICON} />
                  Reset
                </button>
              )}
              {closable && (
                <RadixDialog.Close data-modal-close className="text-zinc-500 hover:text-white transition-colors shrink-0">
                  <X className={CLOSE_ICON} />
                </RadixDialog.Close>
              )}
            </div>
          </div>
          )}

          <div ref={bodyRef} className={`overflow-y-auto flex-1 bg-zinc-900 text-zinc-100${flat ? ` ${FLAT_PAD} pb-4` : ''}`}>
            {children}
          </div>

          {footer && (
            <div ref={footerRef} className={flat ? `${FLAT_PAD} ${FLAT_BOTTOM}` : 'shrink-0'}>
              {flat ? (
                <div className="flex items-center justify-end gap-2">{footer}</div>
              ) : footer}
            </div>
          )}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}

export function ModalFooter({ children }: { children: React.ReactNode }) {
  const coarse = useCoarse();
  return (
    <div className={`flex items-center justify-end gap-3 ${coarse ? 'px-6 py-3' : 'px-5 py-2'} border-t border-zinc-800 bg-zinc-950`}>
      {children}
    </div>
  );
}
