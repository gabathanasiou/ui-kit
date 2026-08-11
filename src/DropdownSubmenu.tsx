import React, { useContext } from 'react';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronRight } from 'lucide-react';
import { useDropdownTheme, SubmenuContext } from './DropdownMenu';
import { IS_COARSE } from './device';
import { usePortalTarget } from './popout';

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
  const { activeSub, setActiveSub } = useContext(SubmenuContext);
  const subOpen = activeSub === id;
  const theme = useDropdownTheme();
  const portalTarget = usePortalTarget();

  const triggerClasses = `w-full text-left ${SUB_ITEM} rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item`;

  const contentClasses = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(75vh,30rem)] overflow-y-auto min-w-0 ${width || 'w-48'}`;

  return (
      <RadixDropdownMenu.Sub open={subOpen} onOpenChange={(o) => setActiveSub(o ? id : null)}>
        <RadixDropdownMenu.SubTrigger
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
