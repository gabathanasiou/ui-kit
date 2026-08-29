"use client";
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronRight } from 'lucide-react';
import { useDropdownTheme, SubmenuContext, MenuHighlightContext, useMenuHighlight, useMenuHighlightState, useMenuKeys, useMenuKeyLock, useMenuWheel } from './DropdownMenu';
import type { MenuHighlightItem } from './DropdownMenu';
import { IS_COARSE } from './device';
import { usePortalTarget } from './popout';
import { useOverlayMorph } from './overlayMorph';

const SUB_ITEM = IS_COARSE ? 'px-4 py-3 text-sm' : 'px-3 py-2 text-xs';

interface DropdownSubmenuProps {
  id: string;
  label: string;
  icon?: React.ReactNode;
  width?: string;
  side?: 'left' | 'right';
  children: React.ReactNode;
}

export default function DropdownSubmenu({ id, label, icon, width, side = 'right', children }: DropdownSubmenuProps) {
  const { activeSub, setActiveSub, morph } = useContext(SubmenuContext);
  const subOpen = activeSub === id;
  const theme = useDropdownTheme();
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
    const self: MenuHighlightItem = { label, activate: () => setActiveSub(id) };
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
  useMenuKeys(subOpen, highlight, keysHandlerRef);
  useMenuWheel(subOpen, wheelHandlerRef);
  useMenuKeyLock(subOpen, highlight, keysHandlerRef, subContentRef, false, lockHandlerRef);

  /* Keep the highlighted row visible when arrows/typeahead scroll it out. */
  React.useLayoutEffect(() => {
    if (!subOpen || highlight.highlightedIndex < 0) return;
    const row = subContentRef.current?.querySelector<HTMLElement>(`[data-ei="${highlight.highlightedIndex}"]`);
    row?.scrollIntoView({ block: 'nearest' });
  }, [subOpen, highlight.highlightedIndex]);
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

  const triggerClasses = `w-full text-left ${SUB_ITEM} rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${rootHighlighted ? ' ui-item-highlighted' : ''}${closing ? ' ui-sub-closing' : ''}`;

  const contentClasses = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${width || 'w-48'}`;

  return (
      <RadixDropdownMenu.Sub open={subOpen || persisted} onOpenChange={(o) => setActiveSub(o ? id : null)}>
        <RadixDropdownMenu.SubTrigger
          ref={subTriggerRef}
          data-ei={myIndex >= 0 ? myIndex : undefined}
          className={triggerClasses}
          onTouchStart={() => {}}
          onPointerEnter={() => {
            if (rootApi && myIndex >= 0) rootApi.setHighlighted(myIndex, 'pointer');
          }}
          onPointerDown={(e) => {
            // Pen is hover-capable: hover opens the submenu, so a tap would
            // toggle it closed. Open on tap instead, like a finger.
            if (e.pointerType === 'pen') {
              e.preventDefault();
              setActiveSub(subOpen ? null : id);
            }
          }}
        >
        {side === 'left' && <ChevronRight className={`w-3 h-3 ui-icon rotate-180 order-first`} />}
        <span className="flex items-center gap-2">
          {icon && <span className={`ui-icon shrink-0`}>{icon}</span>}
          {label}
        </span>
        {side === 'right' && <ChevronRight className={`w-3 h-3 ui-icon`} />}
      </RadixDropdownMenu.SubTrigger>
      <RadixDropdownMenu.Portal container={portalTarget ?? undefined}>
        <RadixDropdownMenu.SubContent
          ref={setComposedRef}
          data-theme={theme}
          className={contentClasses}
          sideOffset={8}
          alignOffset={-4}
          collisionPadding={8}
          onPointerLeave={highlight.pointerLeave}
        >
          <MenuHighlightContext.Provider value={highlight}>
            {children}
          </MenuHighlightContext.Provider>
        </RadixDropdownMenu.SubContent>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Sub>
  );
}
