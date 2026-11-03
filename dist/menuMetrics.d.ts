export type SafeAreaInsets = {
    left: number;
    right: number;
    top: number;
    bottom: number;
};
export type VisualBox = {
    x: number;
    y: number;
    width: number;
    height: number;
};
/** The visible viewport in layout-viewport coordinates (the space of
 *  getBoundingClientRect). On iPad the software keyboard lives here. */
export declare function visualViewportBox(win: Window): VisualBox;
/** Real device safe-area insets (0 on devices without edge-to-edge). */
export declare function safeAreaInsets(doc?: Document | null): SafeAreaInsets;
