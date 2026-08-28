export declare const IS_COARSE: boolean;
export declare const IS_TOUCH_CAPABLE: boolean;
/** Apple Pencil events report pointerType 'pen' but must behave exactly like a finger. */
export declare function isTouchLike(pointerType?: string | null): boolean;
export declare function getLastPointerType(): string | null;
export declare function useLastPointerType(): string | null;
/** Reactive hardware-keyboard detection (media queries + keydown heuristic). */
export declare function getHardwareKeyboard(): boolean;
export declare function useHardwareKeyboard(): boolean;
