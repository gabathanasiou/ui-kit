import { type RefObject } from 'react';
export declare function useSmartPosition(wrapperRef: RefObject<HTMLElement | null>, open: boolean): void;
export declare function useFixedPosition(wrapperRef: RefObject<HTMLElement | null>, open: boolean, setPos: (p: {
    top: number;
    left: number;
    width: number;
    maxH: number;
    bottom?: number;
}) => void, opts?: {
    panelWidth?: number;
}): void;
