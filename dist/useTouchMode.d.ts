/**
 * Whether to show touch-first UI (e.g. finger-sized targets, touch variants).
 * Defaults to the device's touch capability via the `(any-pointer: coarse)`
 * media query, then adapts to the most recent pointer type (trackpad/mouse on
 * touch-capable devices falls back to desktop UI). Pen counts as touch.
 */
export declare function useTouchMode(): boolean;
