"use client";
import React, { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDropdownTheme, useDropdownThemeAttrs, SubmenuContext, MenuHighlightContext, useMenuHighlight, useMenuHighlightState, useMenuKeys, useMenuKeyLock, useMenuWheel } from './DropdownMenu';
import type { MenuHighlightItem } from './DropdownMenu';
import { IS_COARSE, useCoarseScale, coarsePx } from './device';
import { usePortalTarget } from './popout';
import { useOverlayMorph } from './overlayMorph';
import { revealRowInScroller } from './revealInScroller';


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
  /** Coarse-pointer presentation (roadmaps 182/331). `accordion` (default)
   *  keeps ONLY the trigger row visible and expands the child directly beneath
   *  it, like an accordion panel — tapping the header again collapses it.
   *  `replace` covers the parent card exactly (the earlier audit pass).
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

export default function DropdownSubmenu({ id, label, icon, width, side = 'right', children, contentClassName, touchPresentation = 'accordion' }: DropdownSubmenuProps) {
  const { chain, setChain, morph, keyboardOpened, setKeyboardOpened } = useContext(SubmenuContext);
  const subOpen = chain.includes(id);
  /* A surface owns the keyboard only when it is the TOPMOST open one (a
     nested sub stands the parent's keys down). */
  const isTopmost = chain[chain.length - 1] === id;
  const theme = useDropdownTheme();
  const themeAttrs = useDropdownThemeAttrs();
  const portalTarget = usePortalTarget();
  const subTriggerRef = useRef<HTMLDivElement>(null);
  const subContentRef = useRef<HTMLDivElement>(null);
  /* Same close-morph contract as DropdownMenu: Radix keeps the sub content
     mounted while the reverse morph plays, then `persisted` drops and it
     unmounts. */
  const [persisted, setPersisted] = useState(subOpen);
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
    morph,
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
      closeSub();
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
  const accordion = IS_COARSE && touchPresentation === 'accordion';
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
    const parent = trigger?.closest('[role="menu"]') as HTMLElement | null;
    if (!trigger || !parent) return undefined;
    const t = trigger.getBoundingClientRect();
    const p = parent.getBoundingClientRect();
    const parentZ = parseInt(getComputedStyle(parent).zIndex, 10) || 0;
    /* The child is measured from the parent CARD (not Radix's trigger side
       placement): `sideOffset` is the left delta from the trigger's right edge
       and `alignOffset` the top delta from the trigger row. */
    setTouchGeom({
      presentation: 'replace',
      sideOffset: 2 - (p.width - 4),
      alignOffset: 6 - (t.top - p.top),
      width: p.width,
      childZ: parentZ + 2,
    });
    parent.dataset.submenuOpen = 'replace';
    return () => { delete parent.dataset.submenuOpen; };
  }, [subOpen, touchPresentation]);

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
            }
          }}
          onClick={(e) => {
            /* Touch: Radix opens the sub on the FIRST click. The accordion
               needs the SECOND tap on the same header to close it, so
               intercept only when it is already open (preventDefault also
               stops Radix's own onClick from re-opening it). */
            if (!IS_COARSE || !subOpen) return;
            e.preventDefault();
            e.stopPropagation();
            closeSub();
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
          sideOffset={touchGeom ? touchGeom.sideOffset : 8}
          alignOffset={touchGeom ? touchGeom.alignOffset : -4}
          collisionPadding={8}
          style={touchGeom ? { width: touchGeom.width, maxWidth: 'calc(100vw - 16px)', zIndex: touchGeom.childZ } : undefined}
          onPointerLeave={highlight.pointerLeave}
        >
          <MenuHighlightContext.Provider value={highlight}>
            {touchGeom && (
              <button
                type="button"
                data-submenu-back
                onClick={closeSub}
                style={{ padding: `${coarsePx(8, 10, scale)}px ${coarsePx(12, 14, scale)}px`, fontSize: coarsePx(12, 13, scale) }}
                className="ui-submenu-back sticky -top-1 z-10 -mx-1 mb-1 -mt-1 flex w-[calc(100%+8px)] items-center gap-1.5 rounded-md border-b border-[color:var(--ui-sep)] bg-[var(--ui-menu-bg)] font-medium text-[color:var(--ui-text-muted)]"
              >
                <ChevronLeft className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{label}</span>
              </button>
            )}
            {children}
          </MenuHighlightContext.Provider>
        </RadixDropdownMenu.SubContent>
      </RadixDropdownMenu.Portal>
      )}
    </RadixDropdownMenu.Sub>
  );
}
