import React, { createContext, useContext, useCallback, useState, useRef, useEffect } from 'react';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { Pencil, Copy, Trash2, Plus, Check, X, RotateCcw } from 'lucide-react';
import { usePortalTarget } from './popout';
import { IS_COARSE } from './device';

export type DropdownTheme = 'light' | 'dark' | 'blue';

export const DropdownThemeContext = createContext<DropdownTheme>('dark');
export const useDropdownTheme = () => useContext(DropdownThemeContext);

// ── Single source of truth for all dropdown styling ──
// Colors/interactions come from tokens.css (.ui-*) via [data-theme]; only
// layout/size utilities are inlined.

const ITEM_PAD = IS_COARSE ? 'px-4 py-3 text-sm' : 'px-3 py-2 text-xs';
const HEADER_PAD = IS_COARSE ? 'px-3 pt-3 pb-2' : 'px-3 pt-2 pb-1';
const HEADER_TEXT = IS_COARSE ? 'text-xs' : 'text-[10px]';

export function getDropdownClasses(theme?: DropdownTheme) {
  return {
    // Item text & hover
    itemDefault: 'ui-item',
    itemDanger: 'ui-item ui-item-danger',

    // Icon
    icon: 'ui-icon',

    // Right-action button
    rightAction: 'ui-icon-btn',

    // Separator
    separator: 'ui-sep my-1',

    // Header
    headerPad: HEADER_PAD,
    headerText: `${HEADER_PAD} font-semibold uppercase tracking-wider ${HEADER_TEXT} ui-label`,

    // Item padding
    itemPad: ITEM_PAD,

    // Input
    input: IS_COARSE
      ? 'px-3 py-2 text-sm ui-input'
      : 'px-1.5 py-0.5 text-xs ui-input',

    // Item manager row
    rowHoverBg: 'ui-row',
    rowActiveBg: 'ui-row ui-row-active',
    rowActiveText: 'ui-row-active-text font-medium',
    rowText: 'ui-text',
    rowTextHover: 'ui-row-hover-text',

    // Buttons (item-manager specific)
    btnBase: 'ui-icon-btn',
    btnActive: 'ui-icon-btn ui-icon-btn-active',
    btnDanger: 'ui-icon-btn ui-icon-btn-danger',
    btnDangerActive: 'ui-icon-btn ui-icon-btn-danger ui-icon-btn-active',
    btnDisabled: 'ui-disabled',

    // Edit confirm buttons
    editConfirm: 'ui-icon-btn ui-icon-btn-confirm',
    editCancel: 'ui-icon-btn ui-icon-btn-cancel',

    // Sizes (item-manager specific)
    btnSize: IS_COARSE ? 'w-8 h-8' : 'w-6 h-6',
    btnIcon: 'w-3.5 h-3.5',
  };
}

export const SubmenuContext = createContext<{
  activeSub: string | null;
  setActiveSub: (id: string | null) => void;
}>({ activeSub: null, setActiveSub: () => {} });

interface DropdownMenuProps {
  open: boolean;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  trigger: React.ReactNode;
  align?: 'left' | 'right';
  width?: string;
  theme?: DropdownTheme;
  children: React.ReactNode;
}

export default function DropdownMenu({
  open,
  onClose,
  onOpenChange,
  trigger,
  align = 'right',
  width,
  theme = 'dark',
  children,
}: DropdownMenuProps) {
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const portalTarget = usePortalTarget();

  const contentClasses = `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(75vh,30rem)] overflow-y-auto min-w-0 scrollbar-custom opacity-0 scale-95 data-[state=open]:opacity-100 data-[state=open]:scale-100 transition-all duration-150 ease-out`;

  return (
    <RadixDropdownMenu.Root open={open} onOpenChange={(o) => { if (onOpenChange) onOpenChange(o); else if (!o) onClose?.(); }} modal={false}>
      <RadixDropdownMenu.Trigger asChild>
        {trigger}
      </RadixDropdownMenu.Trigger>
      <RadixDropdownMenu.Portal container={portalTarget ?? undefined}>
        <DropdownThemeContext.Provider value={theme}>
          <SubmenuContext.Provider value={{ activeSub, setActiveSub }}>
            <RadixDropdownMenu.Content
              data-theme={theme}
              className={`${contentClasses} ${width || ''}`}
              align={align === 'left' ? 'start' : 'end'}
              sideOffset={8}
              collisionPadding={8}
              style={{ touchAction: 'manipulation' }}
            >
              {children}
            </RadixDropdownMenu.Content>
          </SubmenuContext.Provider>
        </DropdownThemeContext.Provider>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  );
}

// ── Item Manager Dropdown ──

interface ItemManagerDropdownProps {
  open: boolean;
  onClose: (open: boolean) => void;
  items: { id: string; name: string }[];
  activeId: string;
  onSelect: (id: string) => void;
  onRename: (id: string, name: string) => void;
  onDuplicate: (id: string) => string | void;
  onDelete: (id: string) => void;
  onCreate?: () => string | void;
  onImport?: () => void;
  onExport?: () => void;
  onReset?: () => void;
  onTrash?: () => void;
  closeOnSelect?: boolean;
  readOnly?: boolean;
  theme?: DropdownTheme;
  label: string;
  header: string;
  itemLabel?: string;
  trigger: React.ReactNode;
  minItems?: number;
}

export function ItemManagerDropdown({
  open,
  onClose,
  items,
  activeId,
  onSelect,
  onRename,
  onDuplicate,
  onDelete,
  onCreate,
  onImport,
  onExport,
  onReset,
  onTrash,
  closeOnSelect,
  readOnly = false,
  theme,
  label,
  header,
  itemLabel,
  trigger,
  minItems = 1,
}: ItemManagerDropdownProps) {
  const d = getDropdownClasses(theme);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingId) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      });
      const item = items.find(i => i.id === editingId);
      if (item && !editValue) {
        setEditValue(item.name);
      }
    }
  }, [editingId]);

  useEffect(() => {
    if (editingId) {
      const item = items.find(i => i.id === editingId);
      if (item && !editValue) {
        setEditValue(item.name);
      }
    }
  }, [editingId, items]);

  const startRename = (id: string, name: string) => {
    setEditingId(id);
    setEditValue(name);
  };

  const commitRename = () => {
    if (editingId && editValue.trim()) {
      onRename(editingId, editValue.trim());
    }
    setEditingId(null);
  };

  const cancelRename = () => {
    setEditingId(null);
  };

  const createLabel = itemLabel || header.replace(/S$/, '').replace(/s$/, '');

  return (
    <DropdownMenu open={open} onOpenChange={(o) => { if (o) { setEditingId(null); setEditValue(''); } else { if (editingId && editValue.trim()) { onRename(editingId, editValue.trim()); } setEditingId(null); setEditValue(''); } if (!o || !readOnly) onClose(o); }} width="w-80" theme={theme} trigger={trigger}>
      <div className={d.headerText}>
        {header}
      </div>
      {items.map(item => {
        const isActive = item.id === activeId;
        const isEditing = editingId === item.id;
        return (
          <div key={item.id} className={`flex items-center gap-1 rounded my-0.5 ${isActive ? d.rowActiveBg : d.rowHoverBg} ${editingId && !isEditing ? 'opacity-40 pointer-events-none' : ''}`}>
            {isEditing ? (
              <>
                <div className={`flex-1 min-w-0 ${d.itemPad} rounded outline-none flex items-center gap-2`}>
                  <input
                    ref={inputRef}
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); commitRename(); } if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); cancelRename(); } }}
                    className={`w-full border rounded ${d.input}`}
                  />
                </div>
                <RadixDropdownMenu.Item
                  className={`shrink-0 ${d.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${d.editConfirm}`}
                  onSelect={e => { e.preventDefault(); commitRename(); }}
                  onTouchStart={() => {}}
                >
                  <Check className={d.btnIcon} />
                </RadixDropdownMenu.Item>
                <RadixDropdownMenu.Item
                  className={`shrink-0 ${d.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${d.editCancel}`}
                  onSelect={e => { e.preventDefault(); cancelRename(); }}
                  onTouchStart={() => {}}
                >
                  <X className={d.btnIcon} />
                </RadixDropdownMenu.Item>
              </>
            ) : (
              <>
                <RadixDropdownMenu.Item
                  className={`flex-1 min-w-0 ${d.itemPad} rounded outline-none cursor-pointer flex items-center ${d.rowText} ${isActive ? '' : d.rowTextHover}`}
                  onSelect={closeOnSelect ? () => { onSelect(item.id); } : e => { e.preventDefault(); onSelect(item.id); }}
                  onTouchStart={() => {}}
                >
                  <span className={`truncate ${isActive ? d.rowActiveText : ''}`}>{item.name}</span>
                </RadixDropdownMenu.Item>
                <RadixDropdownMenu.Item
                  className={`shrink-0 ${d.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${isActive ? d.btnActive : d.btnBase}`}
                  onSelect={e => { e.preventDefault(); startRename(item.id, item.name); }}
                  onTouchStart={() => {}}
                  disabled={readOnly}
                >
                  <Pencil className={d.btnIcon} />
                </RadixDropdownMenu.Item>
                <RadixDropdownMenu.Item
                  className={`shrink-0 ${d.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${isActive ? d.btnActive : d.btnBase}`}
                  onSelect={e => { e.preventDefault(); const newId = onDuplicate(item.id); if (newId) startRename(newId, `${item.name} Copy`); }}
                  onTouchStart={() => {}}
                  disabled={readOnly}
                >
                  <Copy className={d.btnIcon} />
                </RadixDropdownMenu.Item>
                <RadixDropdownMenu.Item
                  className={`shrink-0 ${d.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${items.length <= minItems ? d.btnDisabled : isActive ? d.btnDangerActive : d.btnDanger}`}
                  onSelect={e => { e.preventDefault(); onDelete(item.id); }}
                  onTouchStart={() => {}}
                  disabled={readOnly || items.length <= minItems}
                >
                  <Trash2 className={d.btnIcon} />
                </RadixDropdownMenu.Item>
              </>
            )}
          </div>
        );
      })}
      <div className={editingId ? 'opacity-40 pointer-events-none' : ''}>
        {onReset && (
          <>
            <RadixDropdownMenu.Separator className={d.separator} />
            <RadixDropdownMenu.Item
              className={`w-full text-left ${d.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${d.itemDefault}`}
              onSelect={e => { e.preventDefault(); onReset(); }}
              onTouchStart={() => {}}
              disabled={readOnly}
            >
              <RotateCcw className={`${d.btnIcon} ${d.icon}`} />
              Reset to Default
            </RadixDropdownMenu.Item>
          </>
        )}
        {(onCreate || onImport || onExport || onTrash) && (
          <RadixDropdownMenu.Separator className={d.separator} />
        )}
        {onCreate && (
          <RadixDropdownMenu.Item
            className={`w-full text-left ${d.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${d.itemDefault}`}
            onSelect={e => { e.preventDefault(); const newId = onCreate(); if (newId) startRename(newId, ''); }}
            onTouchStart={() => {}}
            disabled={readOnly}
          >
            <Plus className={`${d.btnIcon} ${d.icon}`} />
            New {createLabel}
          </RadixDropdownMenu.Item>
        )}
        {onImport && (
          <RadixDropdownMenu.Item
            className={`w-full text-left ${d.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${d.itemDefault}`}
            onSelect={e => { e.preventDefault(); onImport(); }}
            onTouchStart={() => {}}
            disabled={readOnly}
          >
            <svg className={`${d.btnIcon} ${d.icon}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            Import
          </RadixDropdownMenu.Item>
        )}
        {onExport && (
          <RadixDropdownMenu.Item
            className={`w-full text-left ${d.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${d.itemDefault}`}
            onSelect={e => { e.preventDefault(); onExport(); }}
            onTouchStart={() => {}}
            disabled={readOnly}
          >
            <svg className={`${d.btnIcon} ${d.icon}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
            Export
          </RadixDropdownMenu.Item>
        )}
        {onTrash && (
          <RadixDropdownMenu.Item
            className={`w-full text-left ${d.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${d.itemDefault}`}
            onSelect={e => { e.preventDefault(); onTrash(); }}
            onTouchStart={() => {}}
            disabled={readOnly}
          >
            <Trash2 className={`${d.btnIcon} ${d.icon}`} />
            Trash
          </RadixDropdownMenu.Item>
        )}
      </div>
    </DropdownMenu>
  );
}
