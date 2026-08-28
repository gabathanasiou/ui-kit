import React, { useRef, useState, useCallback, useEffect, useLayoutEffect } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { X, RotateCcw } from 'lucide-react';
import { IS_COARSE } from './device';
import { usePortalTarget, useCurrentWindow } from './popout';

const MAX_EDGE = 32;

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
 *  so the offset target keeps the center fixed) while fading out. */
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
    el.style.transition = '';
    el.style.transform = '';
    el.style.transformOrigin = '';
    el.style.opacity = '';
    onDone();
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

const HEADER_PX = IS_COARSE ? 'px-6' : 'px-5';
const HEADER_PY = IS_COARSE ? 'py-3' : 'py-2.5';
const TITLE_SIZE = IS_COARSE ? 'text-sm' : 'text-xs';
const CLOSE_ICON = IS_COARSE ? 'w-4 h-4' : 'w-3.5 h-3.5';
const RESET_TEXT = IS_COARSE ? 'text-xs' : 'text-[10px]';
const RESET_ICON = IS_COARSE ? 'w-3.5 h-3.5' : 'w-3 h-3';
const RESET_PAD = IS_COARSE ? 'px-2.5 py-1.5' : 'px-2 py-1';
const FOOTER_PX = IS_COARSE ? 'px-6' : 'px-5';
const FOOTER_PY = IS_COARSE ? 'py-3' : 'py-2';

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
}: ModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);
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
  const initRef = useRef(false);
  const [morphing, setMorphing] = useState(false);
  const animToken = useRef(0);
  const closingRef = useRef(false);
  /* Imperative mirror of `morphing` for the ResizeObserver callback (refs are
     read outside React renders). */
  const anyAnimRef = useRef(false);
  const beginAnim = () => { anyAnimRef.current = true; setMorphing(true); };
  const endAnim = () => { anyAnimRef.current = false; setMorphing(false); };

  useEffect(() => {
    if (!open) { setDragPos(null); initRef.current = false; draggedRef.current = false; }
  }, [open]);

  useLayoutEffect(() => {
    if (!open || initRef.current || !contentReady || !contentRef.current) return;
    initRef.current = true;
    const r = contentRef.current.getBoundingClientRect();
    setDragPos({ left: r.left, top: r.top });
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
    if (closingRef.current) return;
    const el = contentRef.current;
    const stacked = !!el && stackParents(el).length > 0;
    if (!el || !morph || reduceMotion() || stacked) { onClose(); return; }
    closingRef.current = true;
    beginAnim();
    zoomOut(animToken, el, () => {
      closingRef.current = false;
      endAnim();
      onClose();
    });
  }, [morph, onClose]);

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
      /* Keep un-dragged modals centered on the VIEWPORT (center = vh/2 is the
         invariant — not the previous state, so chained animations over
         transient sizes never drift). Pin the box at the old height with the
         top already at its centered position, then animate height + top
         together (both interpolate linearly → center is constant). */
      const centerLock = !draggedRef.current;
      const vh = currentWindowRef.current?.innerHeight ?? 0;
      const topPin = centerLock ? (vh - from) / 2 : r.top;
      const topEnd = centerLock ? (vh - h) / 2 : r.top;
      el.style.transition = 'none';
      el.style.height = `${from}px`;
      if (centerLock) el.style.top = `${topPin}px`;
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
    const vw = currentWindowRef.current?.innerWidth ?? 0;
    const vh = currentWindowRef.current?.innerHeight ?? 0;
    const r = captureRect();
    const w = r ? r.width : Math.min(vw - MAX_EDGE * 2, 576);
    const h = r ? r.height : Math.min(vh - MAX_EDGE * 2, 400);
    return {
      left: Math.max(MAX_EDGE, Math.min(left, vw - w - MAX_EDGE)),
      top: Math.max(MAX_EDGE, Math.min(top, vh - h - MAX_EDGE)),
    };
  }, [captureRect]);

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

  const hasExplicit = dragPos !== null;

  const posClasses = hasExplicit ? '' : 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2';
  const sizeClasses = `${width ? `${width} w-full` : 'max-w-xl w-full'}`;

  const combinedStyle: React.CSSProperties = {
    ...(hasExplicit ? { left: dragPos!.left, top: dragPos!.top } : {}),
    width: `min(100%, calc(100vw - ${MAX_EDGE * 2}px))`,
    maxHeight: `calc(100vh - ${MAX_EDGE * 2}px)`,
  };

  return (
    <RadixDialog.Root open={open} onOpenChange={(o) => { if (!o) doClose(); }}>
      <RadixDialog.Portal container={portalTarget ?? undefined}>
        <RadixDialog.Overlay
          className="fixed inset-0 z-[9999] bg-transparent"
          style={{ touchAction: 'manipulation' }}
          onTouchEnd={(e) => {
            if (document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]')) return;
            e.preventDefault();
            doClose();
          }}
        />
        <RadixDialog.Content
          ref={setContentRef}
          data-modal-stack
          className={`fixed z-[10000] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${posClasses} ${sizeClasses}`}
          style={{ touchAction: 'manipulation', ...(Object.keys(combinedStyle).length > 0 ? combinedStyle : {}) }}
        >
          <div
            className={`flex items-center justify-between ${HEADER_PX} ${HEADER_PY} border-b border-zinc-800 shrink-0 bg-zinc-950 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onPointerDown={(e) => { if (!morphing) onPointerDown(e); }}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
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
              <RadixDialog.Close className="text-zinc-500 hover:text-white transition-colors shrink-0">
                <X className={CLOSE_ICON} />
              </RadixDialog.Close>
            </div>
          </div>

          <div className="overflow-y-auto flex-1 bg-zinc-900 text-zinc-100">
            {children}
          </div>

          {footer && (
            <div className="shrink-0">
              {footer}
            </div>
          )}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}

export function ModalFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className={`flex items-center justify-end gap-3 ${FOOTER_PX} ${FOOTER_PY} border-t border-zinc-800 bg-zinc-950`}>
      {children}
    </div>
  );
}
