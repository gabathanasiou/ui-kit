import React from 'react';
export declare function useLongPressOptOut(): {
    'data-no-longpress': "true";
};
export declare function isInteractiveElement(el: HTMLElement): boolean;
export declare function LongPressMenuProvider({ children, showRing, longPressMs, targetSelector, shouldStartLongPress, onLongPress, }: {
    children: React.ReactNode;
    /** Hide the iOS-style progress ring (reactions open on long-press). */
    showRing?: boolean;
    /** How long the press must be held before the action fires (ms). */
    longPressMs?: number;
    /** Selector matched via `closest()` to decide long-press targets. */
    targetSelector?: string;
    /** Extra pointer-down gate; default excludes interactive elements. */
    shouldStartLongPress?: (target: HTMLElement) => boolean;
    /** Custom action on completion; default dispatches a synthetic `contextmenu`. */
    onLongPress?: (target: HTMLElement, x: number, y: number) => void;
}): React.JSX.Element;
