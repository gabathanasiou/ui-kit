"use client";
import React, { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDropdownTheme, useDropdownThemeAttrs, SubmenuContext, MenuHighlightContext, useMenuHighlight, useMenuHighlightState, useMenuKeys, useMenuKeyLock, useMenuWheel } from './DropdownMenu';
import type { MenuHighlightItem } from './DropdownMenu';
import { IS_COARSE, useCoarseScale, coarsePx } from './device';
import { usePortalTarget } from './popout';
import { useOverlayMorph, playRectMorph, overlayMorphEnabled } from './overlayMorph';
import { revealRowInScroller } from './revealInScroller';
import DropdownItem from './DropdownItem';


export interface DropdownSubmenuProps {
  id: string;
  label: string;
  icon?: React.ReactNode;
  width?: string;
  side?: 'left' | 'right';
  children: React.ReactNode;
  /** Extra classes on the sub content (e.g. lifting it above a context
   *  menu's z-index). */
  contentClassName?: string;
  /** Coarse-pointer presentation. DEFAULT is `replace` on EVERY coarse device
   *  (roadmaps 335/182): ONE card on screen — the child FLIPs out of its
   *  parent's box (the modal stack language) and Back FLIPs the parent back.
   *  `accordion` is playground-only WIP and must never be wired into the app.
   *  Desktop always keeps the Radix side placement. */
  touchPresentation?: 'accordion' | 'replace';
}

type TouchGeom = {
  presentation: 'replace';
  sideOffset: number;
  alignOffset: number;
  width: number;
  /** The child's own z-index (above the parent card's context). */
  childZ: number;
};

export default function DropdownSubmenu({ id, label, icon, width, side = 'right', children, contentClassName, touchPresentation }: DropdownSubmenuProps) {
  const { chain, setChain, morph, keyboardOpened, setKeyboardOpened } = useContext(SubmenuContext);
  const subOpen = chain.includes(id);
  /* Coarse pointers: `replace` is the ONLY app presentation (roadmap 335);
     the accordion survives as a playground-only WIP switch. */
  const resolvedTouchPresentation = touchPresentation ?? 'replace';
  const accordion = IS_COARSE && resolvedTouchPresentation === 'accordion';
  const replaceMode = IS_COARSE && resolvedTouchPresentation === 'replace';
  /* A surface owns the keyboard only when it is the TOPMOST open one (a
     nested sub stands the parent's keys down). */
  const isTopmost = chain[chain.length - 1] === id;
  const theme = useDropdownTheme();
  const themeAttrs = useDropdownThemeAttrs();
  const portalTarget = usePortalTarget();
  const subTriggerRef = useRef<HTMLDivElement>(null);
  const subContentRef = useRef<HTMLDivElement>(null);
  /** The IMMEDIATE parent card (`closest('[role="menu"]')` from the trigger,
   *  never the root) — the FLIP anchor on open and the survivor on Back. */
  const parentCardRef = useRef<HTMLElement | null>(null);
  /* One FLIP token per side: the child morphs out of the parent's box, and
   *  Back morphs the PARENT back out of the child's last box (the stacked
   *  modal close recipe). */
  const childFlipToken = useRef(0);
  const parentFlipToken = useRef(0);
  /* Touch tap on the submenu's row (replace): coordinates for the drag guard. */
  const triggerDownRef = useRef<{ x: number; y: number } | null>(null);
  /* Same close-morph contract as DropdownMenu: Radix keeps the sub content
     mounted while the reverse morph plays, then `persisted` drops and it
     unmounts. */
  const [persisted, setPersisted] = useState(subOpen);
  /* The Radix portal content mounts a commit AFTER `subOpen` — the FLIP
     effect must re-run when the child node actually exists. */
  const [contentReady, setContentReady] = useState(false);
  /* The close morph keeps the sub content mounted (persisted) so Radix keeps
     `open` true — which also keeps the trigger's `data-state="open"` highlight
     lit for the whole reverse morph. That left the trigger reading as
     "selected" together with the item being clicked (or the next trigger)
     while both menus faded out. Unlight it the instant the sub starts
     closing: the highlight follows `subOpen`, not the mount state. */
  const closing = !subOpen && persisted;

  useEffect(() => {
    if (subOpen) setPersisted(true);
  }, [subOpen]);

  const closeSub = () => setChain(c => { const i = c.indexOf(id); return i >= 0 ? c.slice(0, i) : c; });

  /** Swallow the one click that follows a touch pointerup open: the parent
   *  card hides in the same frame, so that click would otherwise land on the
   *  app (or an outside-dismiss layer) and close the whole menu. */
  const suppressNextClick = () => {
    const doc = subTriggerRef.current?.ownerDocument;
    if (!doc) return;
    let timer = 0;
    const cleanup = () => {
      doc.removeEventListener('click', swallow, true);
      doc.removeEventListener('pointerdown', onNextPointerDown, true);
      if (timer) window.clearTimeout(timer);
    };
    const swallow = (event: MouseEvent) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      cleanup();
    };
    const onNextPointerDown = () => cleanup();
    doc.addEventListener('click', swallow, true);
    doc.addEventListener('pointerdown', onNextPointerDown, true);
    timer = window.setTimeout(cleanup, 600);
  };

  /** Back / ArrowLeft: on coarse replace, the PARENT card FLIPs back out of
   *  this child's last box (exactly the stacked-modal close), then the child
   *  unmounts. One card is painted throughout — never a shrink-to-a-row. */
  const requestClose = () => {
    if (replaceMode && overlayMorphEnabled(morph)) {
      const child = subContentRef.current;
      const parent = parentCardRef.current;
      if (child && parent && child.isConnected && parent.isConnected) {
        const lastChildBox = child.getBoundingClientRect();
        /* Reveal the survivor in the same frame, pinned onto the child — the
           FLIP animates it back to its own box. The child is hidden in this
           same frame, so exactly ONE card is painted throughout. */
        delete parent.dataset.submenuOpen;
        delete parent.dataset.submenuInert;
        child.style.visibility = 'hidden';
        playRectMorph(parentFlipToken, parent, lastChildBox);
      }
    }
    closeSub();
  };

  /* The SUB content has its OWN highlight surface (items inside the submenu
     register against this context, not the root's). The trigger ROW registers
     in the ROOT surface so arrows/typeahead can reach it and Enter opens the
     sub. */
  const highlight = useMenuHighlightState();
  const rootApi = useMenuHighlight();
  const rootApiRef = useRef(rootApi);
  rootApiRef.current = rootApi;
  const selfRef = useRef<MenuHighlightItem | null>(null);
  useEffect(() => {
    const self: MenuHighlightItem = {
      label,
      activate: () => {
        // the keyboard path (ArrowRight/Enter) — mark the open so the sub
        // pre-lights its first item; pointer-opened subs stay unlit
        setKeyboardOpened(id);
        setChain(c => c.includes(id) ? c : [...c, id]);
      },
      submenu: true,
    };
    selfRef.current = self;
    return rootApiRef.current?.register(self);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const myIndex = rootApi && selfRef.current ? rootApi.items.indexOf(selfRef.current) : -1;
  const rootHighlighted = myIndex >= 0 && myIndex === rootApi!.highlightedIndex;

  // Origin at the entry edge: the submenu grows out of its trigger row
  // (nearestOverlayOrigin turns the trigger rect into the left/right edge).
  const anchor = useCallback(() => {
    const el = subTriggerRef.current;
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { left: r.left, top: r.top, width: r.width, height: r.height };
  }, []);

  const setContentRef = useOverlayMorph({
    visible: subOpen,
    /* Replace owns the transition (FLIP via playRectMorph on both edges);
       the generic scale/fade would fight it. Desktop side flyouts keep it. */
    morph: morph && !replaceMode,
    anchor,
    onClosed: () => setPersisted(false),
  });
  /* The Radix portal content mounts in a LATER commit than the open flip —
     attach the keydown/wheel handlers here (the composed ref), not in an
     effect. */
  const keysHandlerRef = useRef<(e: KeyboardEvent) => void>(() => {});
  const wheelHandlerRef = useRef<(e: WheelEvent) => void>(() => {});
  const lockHandlerRef = useRef<(e: KeyboardEvent) => void>(() => {});
  useMenuKeys(subOpen && isTopmost, highlight, keysHandlerRef, {
    onCloseSub: () => {
      requestClose();
      // ArrowLeft returns the highlight to THIS sub's trigger row in the
      // parent surface.
      if (rootApi && myIndex >= 0) rootApi.setHighlighted(myIndex, 'keyboard');
    },
  });
  const keyboardOpenedRef = useRef(keyboardOpened);
  keyboardOpenedRef.current = keyboardOpened;
  useEffect(() => {
    if (subOpen) {
      /* The first item is pre-lit ONLY for keyboard-opened subs (ArrowRight/
         Enter); a pointer-opened sub starts unlit — the highlight follows the
         pointer as it enters. Read via a ref so clearing the marker (below)
         does not re-run this and unlight the item. Keyboard-opened subs also
         take the FOCUS (the content mounts a commit later, hence the rAF) so
         the next keys land inside the sub immediately. */
      if (keyboardOpenedRef.current === id) {
        highlight.setHighlighted(0, 'keyboard');
        requestAnimationFrame(() => subContentRef.current?.focus());
        setKeyboardOpened(null);
      } else {
        highlight.setHighlighted(-1, 'keyboard');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subOpen]);
  useMenuWheel(subOpen, wheelHandlerRef);
  useMenuKeyLock(subOpen, highlight, keysHandlerRef, subContentRef, !isTopmost, lockHandlerRef);

  /* Touch (coarse pointer), three presentations (roadmap 182/331). The default
     accordion renders the child INLINE — the tapped row becomes the header at
     the top of the parent card and the panel expands underneath it (no
     positioning, no off-screen risk; tapping the header toggles it closed).
     `replace` keeps the Radix portal card and re-anchors it over the parent;
     desktop always keeps the Radix side placement. */
  useEffect(() => {
    if (!accordion || !subOpen) return undefined;
    const trigger = subTriggerRef.current;
    /* Nested subs live inside the parent's inline panel, so the nearest
       container is that panel (not the root menu card). */
    const container = (trigger?.closest('[data-submenu-panel]') ?? trigger?.closest('[role="menu"]')) as HTMLElement | null;
    if (!container) return undefined;
    container.dataset.submenuOpen = 'accordion';
    return () => { delete container.dataset.submenuOpen; };
  }, [accordion, subOpen]);

  const [touchGeom, setTouchGeom] = useState<TouchGeom | null>(null);
  useLayoutEffect(() => {
    if (!subOpen || !IS_COARSE || accordion) {
      setTouchGeom(null);
      return undefined;
    }
    const trigger = subTriggerRef.current;
    /* The IMMEDIATE parent card — a nested sub's trigger lives inside its
       parent's SubContent, so `closest` must never be the root by assumption. */
    const parent = trigger?.closest('[role="menu"]') as HTMLElement | null;
    if (!trigger || !parent) return undefined;
    parentCardRef.current = parent;
    const t = trigger.getBoundingClientRect();
    const p = parent.getBoundingClientRect();
    const parentZ = parseInt(getComputedStyle(parent).zIndex, 10) || 0;
    /* The child is measured from the parent CARD (not Radix's trigger side
       placement): `sideOffset` is the left delta from the trigger's right edge
       and `alignOffset` the top delta from the trigger row. Both exact, so the
       replace card covers the parent edge-for-edge. */
    setTouchGeom({
      presentation: 'replace',
      sideOffset: p.left - t.right,
      alignOffset: p.top - t.top,
      width: p.width,
      childZ: parentZ + 2,
    });
    parent.dataset.submenuOpen = 'replace';
    /* The card is not painted until its FLIP is pinned (no one-frame flash at
       the popper's initial position). Reduced motion skips the hide too. */
    if (subContentRef.current && overlayMorphEnabled(morph)) subContentRef.current.style.visibility = 'hidden';
    /* Hit-testing the invisible parent must stop — but only once the opening
       tap has fully settled. Turning pointer-events off in the same frame made
       WebKit focus the element underneath, which read as focusOutside and
       dismissed the whole menu. */
    const inertTimer = window.setTimeout(() => {
      if (parent.isConnected) parent.dataset.submenuInert = 'replace';
    }, 320);
    return () => {
      window.clearTimeout(inertTimer);
      delete parent.dataset.submenuOpen;
      delete parent.dataset.submenuInert;
      if (parentCardRef.current === parent) parentCardRef.current = null;
    };
  }, [subOpen, resolvedTouchPresentation]);

  /* Open FLIP (replace only): pin the child card onto its parent's box and
     animate it to its own — the exact `playRectMorph` the Modal uses when a
     stacked child grows out of the modal beneath it. The parent is already
     `visibility: hidden` (tokens.css), so this is the ONLY card painted. */
  useLayoutEffect(() => {
    if (!subOpen || !replaceMode || !touchGeom || !contentReady || !overlayMorphEnabled(morph)) return undefined;
    const child = subContentRef.current;
    const parent = parentCardRef.current;
    if (!child || !parent) return undefined;
    child.style.visibility = 'hidden';
    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (!child.isConnected || !parent.isConnected) return;
        const parentBox = parent.getBoundingClientRect();
        if (!parentBox.width || !parentBox.height) return;
        child.style.visibility = 'visible';
        playRectMorph(childFlipToken, child, parentBox);
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subOpen, replaceMode, touchGeom, contentReady]);

  /* Keep the highlighted row visible when arrows/typeahead scroll it out —
     never for a pointer-driven highlight (the hovered row must not move). */
  React.useLayoutEffect(() => {
    if (!subOpen || highlight.highlightedIndex < 0 || highlight.pointerDriven) return;
    const row = subContentRef.current?.querySelector<HTMLElement>(`[data-ei="${highlight.highlightedIndex}"]`);
    revealRowInScroller(row, 'nearest', subContentRef.current);
  }, [subOpen, highlight.highlightedIndex, highlight.pointerDriven]);
  const lockDocRef = useRef<Document | null>(null);
  const setComposedRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      node.addEventListener('keydown', keysHandlerRef.current, { capture: true });
      node.addEventListener('wheel', wheelHandlerRef.current as EventListener, { passive: false } as AddEventListenerOptions);
      const doc = node.ownerDocument;
      lockDocRef.current = doc;
      doc.addEventListener('keydown', lockHandlerRef.current, { capture: true });
    } else {
      lockDocRef.current?.removeEventListener('keydown', lockHandlerRef.current, { capture: true });
      lockDocRef.current = null;
    }
    subContentRef.current = node;
    setContentReady(!!node);
    setContentRef(node);
  }, [setContentRef]);

  const scale = useCoarseScale();
  const SUB_ITEM_STYLE = { padding: `${coarsePx(8, 12, scale)}px ${coarsePx(12, 16, scale)}px`, fontSize: coarsePx(12, 14, scale) };
  const triggerClasses = `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${rootHighlighted ? ' ui-item-highlighted' : ''}${closing ? ' ui-sub-closing' : ''}`;

  const contentClasses = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${width || 'w-48'} ${contentClassName || ''}`;

  return (
      <RadixDropdownMenu.Sub open={subOpen || persisted} onOpenChange={(o) => setChain(c => {
        if (!o) {
          // a duplicate close (grace timeout after the trigger leave) must
          // NEVER truncate from a missing id — slice(0, -1) would drop the
          // PARENT sub's entry.
          const idx = c.indexOf(id);
          return idx >= 0 ? c.slice(0, idx) : c;
        }
        return c.includes(id) ? c : [...c, id];
      })}>
        <RadixDropdownMenu.SubTrigger
          ref={subTriggerRef}
          data-ei={myIndex >= 0 ? myIndex : undefined}
          /* Accordion (coarse): only this row survives in the parent card. */
          data-submenu-header={IS_COARSE ? 'true' : undefined}
          style={SUB_ITEM_STYLE} className={triggerClasses}
          onTouchStart={() => {}}
          onPointerEnter={() => {
            if (rootApi && myIndex >= 0) rootApi.setHighlighted(myIndex, 'pointer');
          }}
          onPointerDown={(e) => {
            /* Pen is hover-capable: hover opens the submenu, so a tap would
               toggle it closed. Open on tap instead, like a finger. */
            if (e.pointerType === 'pen') {
              e.preventDefault();
              setChain(c => subOpen ? c.slice(0, c.indexOf(id)) : [...c, id]);
            } else if (replaceMode && e.pointerType === 'touch') {
              triggerDownRef.current = { x: e.clientX, y: e.clientY };
            }
          }}
          onPointerUp={(e) => {
            /* Replace: open on the TAP itself, not on a click iOS may swallow.
               A drag (scrolling the parent) never opens. */
            if (!replaceMode || e.pointerType !== 'touch') return;
            const down = triggerDownRef.current;
            triggerDownRef.current = null;
            if (!down || subOpen) return;
            if (Math.hypot(e.clientX - down.x, e.clientY - down.y) > 8) return;
            setKeyboardOpened(null);
            suppressNextClick();
            setChain(c => c.includes(id) ? c : [...c, id]);
          }}
          onPointerCancel={() => { triggerDownRef.current = null; }}
          onClick={(e) => {
            /* Accordion (WIP): Radix opens the sub on the first click; the
               second tap on the same header collapses it. Replace never
               closes on a click — the row is gone once its card opens. */
            if (!accordion || !subOpen) return;
            e.preventDefault();
            e.stopPropagation();
            requestClose();
          }}
        >
        {side === 'left' && <ChevronRight className={`w-3 h-3 ui-icon rotate-180 order-first`} />}
        <span className="flex items-center gap-2">
          {icon && <span className={`ui-icon shrink-0`}>{icon}</span>}
          {label}
        </span>
        {side === 'right' && <ChevronRight className={`w-3 h-3 ui-icon`} />}
      </RadixDropdownMenu.SubTrigger>
      {accordion && subOpen && (
        /* The accordion body: rendered INLINE in the parent card, below the
           reordered header row. No portal, no positioning — the card simply
           grows and the panel fades/slides in. */
        <div data-submenu-panel className="ui-submenu-panel">
          {children}
        </div>
      )}
      {!accordion && (
      <RadixDropdownMenu.Portal container={portalTarget ?? undefined}>
        <RadixDropdownMenu.SubContent
          ref={setComposedRef}
          {...themeAttrs}
          data-submenu-presentation={touchGeom?.presentation}
          className={contentClasses}
          /* Replace: top-align to the trigger row so sideOffset/alignOffset
             can land the card EXACTLY on the parent card. Desktop keeps the
             centred side flyout. */
          align={touchGeom ? 'start' : undefined}
          sideOffset={touchGeom ? touchGeom.sideOffset : 8}
          alignOffset={touchGeom ? touchGeom.alignOffset : -4}
          collisionPadding={8}
          style={touchGeom ? { width: touchGeom.width, zIndex: touchGeom.childZ } : undefined}
          onPointerLeave={highlight.pointerLeave}
          /* Focus moving between this card and its parent/deeper card is
             part of the menu, not an outside dismissal (Radix only knows DOM
             branches, and every card is its own portal). */
          onFocusOutside={e => {
            const target = e.target as Element | null;
            if (target?.closest('[role="menu"], [data-radix-menu-content], [data-radix-popper-content-wrapper]')) e.preventDefault();
          }}
        >
          <MenuHighlightContext.Provider value={highlight}>
            {touchGeom && (
              /* Back is a NORMAL menu item (same row height/padding as every
                 other row), pinned above the scrolling list with the standard
                 divider beneath it. It names the immediate parent. */
              <div
                data-submenu-back
                className="sticky -top-1 z-10 -mx-1 -mt-1 mb-1 shrink-0 border-b border-[color:var(--ui-sep)] bg-[var(--ui-menu-bg)]"
              >
                <DropdownItem
                  keepOpen
                  onClick={requestClose}
                  icon={<ChevronLeft className="h-3.5 w-3.5 shrink-0" />}
                >
                  {label}
                </DropdownItem>
              </div>
            )}
            {children}
          </MenuHighlightContext.Provider>
        </RadixDropdownMenu.SubContent>
      </RadixDropdownMenu.Portal>
      )}
    </RadixDropdownMenu.Sub>
  );
}
