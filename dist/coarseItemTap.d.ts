import React from 'react';
export interface GhostClickGuard {
    onClick: (e: React.MouseEvent) => void;
    /** True when the click being handled must be IGNORED (its gesture started on
     *  another element). Consumes the marker. */
    takeGhost: () => boolean;
}
/** True when this click is a ghost: it arrived right after a pointerdown on a
 *  DIFFERENT element (iOS retargets a tap's click after the card under the
 *  finger changed). Shared by menu rows and submenu triggers. */
export declare function isGhostClick(el: Element, e: {
    clientX: number;
    clientY: number;
}): boolean;
/** The ghost-click half of the touch row contract — shared by every menu row
 *  (DropdownItem, manager rows, ContextMenuItem). */
export declare function useGhostClick(): GhostClickGuard;
export interface CoarseItemTap extends GhostClickGuard {
    onPointerDown: (e: React.PointerEvent) => void;
    onPointerUp: (e: React.PointerEvent) => void;
    onPointerCancel: () => void;
    /** Call in the row's select handler: true = this click was already handled
     *  by pointerup, swallow it. */
    suppressSelect: () => boolean;
}
export declare function useCoarseItemTap(activate: () => void, disabled?: boolean): CoarseItemTap;
