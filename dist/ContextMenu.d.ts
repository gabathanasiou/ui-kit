import React from 'react';
/**
 * Context menu positioned at (x, y). Used for BOTH desktop right-click and
 * touch long-press — the long-press provider dispatches a synthetic
 * `contextmenu` event, so this component handles both inputs via one path.
 */
export declare const ContextMenu: React.FC<{
    open: boolean;
    x: number;
    y: number;
    onClose: () => void;
    children: React.ReactNode;
    containerRef?: React.RefObject<HTMLElement>;
}>;
export declare const ContextMenuItem: React.FC<{
    onClick: () => void;
    variant?: 'default' | 'danger';
    icon?: React.ReactNode;
    disabled?: boolean;
    children: React.ReactNode;
}>;
export declare const ContextMenuDivider: React.FC;
export default ContextMenu;
