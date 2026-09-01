export declare const IS_COARSE: boolean;
export declare const IS_TOUCH_CAPABLE: boolean;
export declare function setCoarseScale(n: number): void;
export declare function getCoarseScale(): number;
/** Reactive coarse flag — TRUE only on coarse devices WITH the scale on
 *  (>0). Components use this to pick touch-sized classes. */
export declare function useCoarse(): boolean;
/** Reactive numeric coarse scale (0…1) — for controllers/displays. */
export declare function useCoarseScale(): number;
/** Interpolate a desktop→coarse pixel pair by the coarse scale (0…1). On FINE
 *  devices (non-coarse pointer) this ALWAYS returns the desktop value — the
 *  knob only ever affects coarse devices, never desktops. */
export declare function coarsePx(desktop: number, coarse: number, scale: number): number;
/** A padding + font-size pair interpolated by the coarse scale — returned as
 *  an INLINE style (Tailwind can't JIT arbitrary classes generated at runtime,
 *  so true proportional % needs style objects). */
export declare function useCoarseSize(desktop: {
    px: number;
    py: number;
    fs: number;
}, coarse: {
    px: number;
    py: number;
    fs: number;
}): {
    padding: string;
    fontSize: string;
};
/** Apple Pencil events report pointerType 'pen' but must behave exactly like a finger. */
export declare function isTouchLike(pointerType?: string | null): boolean;
export declare function getLastPointerType(): string | null;
export declare function useLastPointerType(): string | null;
/** Reactive hardware-keyboard detection (media queries + keydown heuristic). */
export declare function getHardwareKeyboard(): boolean;
export declare function useHardwareKeyboard(): boolean;
