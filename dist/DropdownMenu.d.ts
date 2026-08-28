import React from 'react';
export type DropdownTheme = 'light' | 'dark' | 'blue';
export declare const DropdownThemeContext: React.Context<DropdownTheme>;
export declare const useDropdownTheme: () => DropdownTheme;
export declare function getDropdownClasses(theme?: DropdownTheme): {
    itemDefault: string;
    itemDanger: string;
    icon: string;
    rightAction: string;
    separator: string;
    headerPad: string;
    headerText: string;
    itemPad: string;
    input: string;
    rowHoverBg: string;
    rowActiveBg: string;
    rowActiveText: string;
    rowText: string;
    rowTextHover: string;
    btnBase: string;
    btnActive: string;
    btnDanger: string;
    btnDangerActive: string;
    btnDisabled: string;
    editConfirm: string;
    editCancel: string;
    btnSize: string;
    btnIcon: string;
};
export declare const SubmenuContext: React.Context<{
    activeSub: string | null;
    setActiveSub: (id: string | null) => void;
}>;
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
export default function DropdownMenu({ open, onClose, onOpenChange, trigger, align, width, theme, children, }: DropdownMenuProps): React.JSX.Element;
interface ItemManagerDropdownProps {
    open: boolean;
    onClose: (open: boolean) => void;
    items: {
        id: string;
        name: string;
    }[];
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
    align?: 'left' | 'right';
    label: string;
    header: string;
    itemLabel?: string;
    trigger: React.ReactNode;
    minItems?: number;
    /** Renders each item's label (e.g. styled previews) — falls back to the
     *  plain name when omitted. */
    itemRender?: (item: {
        id: string;
        name: string;
    }) => React.ReactNode;
}
export declare function ItemManagerDropdown({ open, onClose, items, activeId, onSelect, onRename, onDuplicate, onDelete, onCreate, onImport, onExport, onReset, onTrash, closeOnSelect, readOnly, theme, align, label, header, itemLabel, trigger, minItems, itemRender, }: ItemManagerDropdownProps): React.JSX.Element;
export {};
