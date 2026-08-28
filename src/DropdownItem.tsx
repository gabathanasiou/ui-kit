"use client";
import React, { useRef } from 'react';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { useDropdownTheme, getDropdownClasses } from './DropdownMenu';
import { IS_COARSE } from './device';

const ITEM_CLASS = IS_COARSE ? 'px-4 py-3 text-sm' : 'px-3 py-2 text-xs';

interface DropdownItemProps {
  onClick: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  variant?: 'default' | 'danger';
  className?: string;
  children: React.ReactNode;
  key?: string;
  keepOpen?: boolean;
  rightAction?: {
    icon: React.ReactNode;
    onClick: () => void;
    title?: string;
  };
  /** Non-interactive node rendered after the label (e.g. a check glyph) —
   *  sits OUTSIDE the truncating label span so it never gets squeezed or
   *  ellipsized. */
  trailing?: React.ReactNode;
}

export default function DropdownItem({
  onClick,
  icon,
  disabled = false,
  variant = 'default',
  className = '',
  children,
  keepOpen = false,
  rightAction,
  trailing,
}: DropdownItemProps) {
  const theme = useDropdownTheme();
  const d = getDropdownClasses(theme);
  const skipClickRef = useRef(false);
  const itemRef = useRef<HTMLDivElement>(null);

  const variantStyles = variant === 'danger' ? d.itemDanger : d.itemDefault;

  return (
    <RadixDropdownMenu.Item
      ref={itemRef}
      className={`w-full text-left ${ITEM_CLASS} rounded flex items-center gap-2 outline-none cursor-pointer select-none ${variantStyles} ${disabled ? 'opacity-30 pointer-events-none' : ''} ${className}`}
      onSelect={(e) => {
        if (skipClickRef.current) { skipClickRef.current = false; return; }
        if (keepOpen) e.preventDefault(); onClick();
      }}
      onPointerEnter={() => {
        /* Single-highlight rule: the highlight follows the LAST interaction.
           Radix only moves its roving-focus highlight (data-highlighted) via
           the keyboard — give the pointer the same lever by focusing the
           hovered item (preventScroll is on; the CSS :hover fill is suppressed
           while any item is highlighted). Never steal focus from an inner
           editor (item-manager rename inputs live inside items). */
        const host = itemRef.current;
        if (host && !host.contains(document.activeElement)) host.focus();
      }}
      onTouchStart={() => {}}
      disabled={disabled}
    >
      {icon && <span className={`${d.icon} shrink-0`}>{icon}</span>}
      <span className="flex-1 truncate">{children}</span>
      {trailing && <span className="shrink-0 ml-1 flex items-center">{trailing}</span>}
      {rightAction && (
        <span
          className={`shrink-0 ml-1 p-0.5 rounded ${d.rightAction}`}
          title={rightAction.title}
          onPointerDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
            skipClickRef.current = true;
            rightAction.onClick();
          }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          {rightAction.icon}
        </span>
      )}
    </RadixDropdownMenu.Item>
  );
}
