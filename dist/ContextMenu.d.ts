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
 * Context menu positioned at (x, y). Used for BOTH desktop right-click and
 * touch long-press — the long-press provider dispatches a synthetic
 * `contextmenu` event, so this component handles both inputs via one path.
 * Open morphs out of the press point; close morphs back (the menu stays
 * mounted while the reverse morph plays, then unmounts).
 */
export declare const ContextMenu: React.FC<ContextMenuProps>;
export declare const ContextMenuItem: React.FC<{
    onClick: () => void;
    variant?: 'default' | 'danger';
    icon?: React.ReactNode;
    disabled?: boolean;
    children: React.ReactNode;
}>;
export declare const ContextMenuDivider: React.FC;
export default ContextMenu;
