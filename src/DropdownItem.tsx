"use client";
import React, { useRef } from 'react';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { useDropdownTheme, getDropdownClasses, useHighlightRow, useMenuSearch, useItemSize, useMenuGroupSize, useMenuId } from './DropdownMenu';

// typeahead label extractor — shared with ContextMenuItem
import { menuItemLabel as itemLabel } from './DropdownMenu';

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
  /** Optional category. The menu renders a header the first time this changes
   *  between VISIBLE rows (so filtering never leaves an orphan header), and a
   *  searchable menu's query matches the group too — typing "set" keeps the
   *  whole Set category. Keep grouped rows contiguous for the intended order. */
  group?: string;
}

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
  group,
}: DropdownItemProps) {
  const theme = useDropdownTheme();
  const d = getDropdownClasses(theme);
  const itemSize = useItemSize();
  const groupSize = useMenuGroupSize();
  const skipClickRef = useRef(false);
  const itemRef = useRef<HTMLDivElement>(null);
  /* Single-highlight (the panel model) via the shared row contract — register
     into the NEAREST surface context on mount (registration order = index);
     pointer hover writes the shared highlightedIndex — NO focus() (the
     v0.1.53 focus-stealing is gone); the lit row carries `.ui-item-highlighted`. */
  const { myIndex, highlighted, setPointer, api } = useHighlightRow({
    label: () => itemLabel(children),
    activate: () => { if (!disabled) onClick(); },
    disabled,
    group,
  });

  /* Searchable menus: the api's `items` is the filtered set, so a row filtered
     out by the query has myIndex -1 → hide it (it also can't be lit or pointed
     at). Rows keep their Radix registration so the set returns when the query
     clears. */
  const { query } = useMenuSearch();
  const hidden = query.trim() !== '' && myIndex < 0;
  /* Rows carry a stable id so a trigger-as-search field can point
     `aria-activedescendant` at the highlighted one (index = the VISIBLE row). */
  const menuId = useMenuId();

  /* Group header: shown by the FIRST VISIBLE row of a category. `api.items` is
     the visible set, so a category whose rows are all filtered out drops its
     header with them — no orphans, no counting pass. */
  const groupLabel = group?.trim();
  const showGroup = !!groupLabel && myIndex >= 0 && (myIndex === 0 || api?.items[myIndex - 1]?.group !== groupLabel);

  const variantStyles = variant === 'danger' ? d.itemDanger : d.itemDefault;

  return (
    <>
      {showGroup && (
        <div
          data-menu-group={groupLabel}
          role="presentation"
          className="ui-label shrink-0 select-none font-semibold uppercase tracking-wider pointer-events-none"
          style={groupSize}
        >
          {groupLabel}
        </div>
      )}
      <RadixDropdownMenu.Item
        ref={itemRef}
        id={menuId && myIndex >= 0 ? `${menuId}-opt-${myIndex}` : undefined}
        data-ei={myIndex >= 0 ? myIndex : undefined}
        style={{ ...itemSize, display: hidden ? 'none' : undefined }} className={`w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${variantStyles} ${selected ? 'ui-item-selected' : ''} ${highlighted ? 'ui-item-highlighted' : ''} ${disabled ? 'opacity-30 pointer-events-none' : ''} ${className}`}
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
    </>
  );
}
