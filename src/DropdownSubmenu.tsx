"use client";
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronRight } from 'lucide-react';
import { useDropdownTheme, SubmenuContext } from './DropdownMenu';
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

  const triggerClasses = `w-full text-left ${SUB_ITEM} rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${closing ? ' ui-sub-closing' : ''}`;

  const contentClasses = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(75vh,30rem)] overflow-y-auto min-w-0 scrollbar-custom ${width || 'w-48'}`;

  return (
      <RadixDropdownMenu.Sub open={subOpen || persisted} onOpenChange={(o) => setActiveSub(o ? id : null)}>
        <RadixDropdownMenu.SubTrigger
          ref={subTriggerRef}
          className={triggerClasses}
          onTouchStart={() => {}}
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
          ref={setContentRef}
          data-theme={theme}
          className={contentClasses}
          sideOffset={8}
          alignOffset={-4}
          collisionPadding={8}
        >
          {children}
        </RadixDropdownMenu.SubContent>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Sub>
  );
}
