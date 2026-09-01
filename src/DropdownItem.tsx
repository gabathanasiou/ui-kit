"use client";
import React, { useRef } from 'react';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { useDropdownTheme, getDropdownClasses, useHighlightRow } from './DropdownMenu';
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
  /** The currently selected value — renders the selected tint (a distinct
   *  row background + text color, see `.ui-item-selected` tokens). Callers
   *  that want the panel-style Check glyph pass `trailing={<Check/>}`. */
  selected?: boolean;
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

// typeahead label extractor — shared with ContextMenuItem
import { menuItemLabel as itemLabel } from './DropdownMenu';

export default function DropdownItem({
  onClick,
  icon,
  disabled = false,
  variant = 'default',
  className = '',
  children,
  keepOpen = false,
  selected = false,
  rightAction,
  trailing,
}: DropdownItemProps) {
  const theme = useDropdownTheme();
  const d = getDropdownClasses(theme);
  const skipClickRef = useRef(false);
  const itemRef = useRef<HTMLDivElement>(null);
  /* Single-highlight (the panel model) via the shared row contract — register
     into the NEAREST surface context on mount (registration order = index);
     pointer hover writes the shared highlightedIndex — NO focus() (the
     v0.1.53 focus-stealing is gone); the lit row carries `.ui-item-highlighted`. */
  const { myIndex, highlighted, setPointer } = useHighlightRow({
    label: () => itemLabel(children),
    activate: () => { if (!disabled) onClick(); },
    disabled,
  });

  const variantStyles = variant === 'danger' ? d.itemDanger : d.itemDefault;

  return (
    <RadixDropdownMenu.Item
      ref={itemRef}
      data-ei={myIndex >= 0 ? myIndex : undefined}
      className={`w-full text-left ${ITEM_CLASS} rounded flex items-center gap-2 outline-none cursor-pointer select-none ${variantStyles} ${selected ? 'ui-item-selected' : ''} ${highlighted ? 'ui-item-highlighted' : ''} ${disabled ? 'opacity-30 pointer-events-none' : ''} ${className}`}
      onSelect={(e) => {
        if (skipClickRef.current) { skipClickRef.current = false; return; }
        if (keepOpen) e.preventDefault(); onClick();
      }}
      onPointerEnter={() => { setPointer(myIndex); }}
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
