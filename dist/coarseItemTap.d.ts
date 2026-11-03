import React from 'react';
export interface CoarseItemTap {
    onPointerDown: (e: React.PointerEvent) => void;
    onPointerUp: (e: React.PointerEvent) => void;
    onPointerCancel: () => void;
    /** Call in the row's select handler: true = this click was already handled
     *  by pointerup, swallow it. */
    suppressSelect: () => boolean;
}
export declare function useCoarseItemTap(activate: () => void, disabled?: boolean): CoarseItemTap;
