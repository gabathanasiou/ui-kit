import React from 'react';
export interface ContextMenuProps {
    open: boolean;
    x: number;
    y: number;
    onClose: () => void;
    children: React.ReactNode;
    containerRef?: React.RefObject<HTMLElement>;
    /** Morph from the press point (the modal FLIP language; default true).
     *  prefers-reduced-motion and morph={false} skip it entirely. */
    morph?: boolean;
}
/**
 * Context menu positioned at (x, y) for BOTH desktop right-click and touch
 * long-press (the long-press provider dispatches a synthetic `contextmenu`
 * event). Structurally identical to the kit DropdownMenu — the same Radix
 * primitives + the shared single-highlight/keyboard/key-lock/wheel/morph
 * layers — and its submenus ARE `DropdownSubmenu` (Radix side-placement,
 * portaled: no transformed-ancestor trap, native pointer grace).
 *
 * Press-point anchored and STATIC (it does not follow scrolling); the close
 * morph shrinks back to where the menu was opened.
 */
export declare const ContextMenu: React.FC<ContextMenuProps>;
export declare const ContextMenuItem: React.FC<{
    onClick: () => void;
    variant?: 'default' | 'danger';
    icon?: React.ReactNode;
    disabled?: boolean;
    /** The currently selected value — the selected tint (like DropdownItem). */
    selected?: boolean;
    /** Non-interactive node after the label (a Check glyph, etc.). */
    trailing?: React.ReactNode;
    children: React.ReactNode;
}>;
export declare const ContextMenuDivider: React.FC;
export interface ContextMenuSubProps {
    id: string;
    label: string;
    icon?: React.ReactNode;
    width?: string;
    side?: 'left' | 'right';
    children: React.ReactNode;
}
/** Nested context submenu — literally the kit `DropdownSubmenu` (the Radix
 *  side-placement + the SubmenuContext chain + the shared highlight/keys/
 *  lock/morph layers), lifted above the context menu. */
export declare const ContextMenuSub: React.FC<ContextMenuSubProps>;
export default ContextMenu;
