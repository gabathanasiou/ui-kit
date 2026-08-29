export declare const MORPH_MS = 220;
export declare const MORPH_EASE = "cubic-bezier(0.32, 0.72, 0, 1)";
export declare const MORPH_OPACITY_MS = 170;
export declare const ZOOM_FROM = 0.94;
export type OverlayRect = {
    left: number;
    top: number;
    width: number;
    height: number;
};
export declare function overlayMorphEnabled(morph?: boolean): boolean;
/** Fraction (0..1, 0..1) of the panel box to anchor the scale morph at: the
 *  corner/edge nearest to the center of `anchor`. A point anchor (press
 *  point: zero-size rect) yields the nearest corner; a trigger rect yields
 *  the edge facing it (centered along the overlap axis). */
export declare function nearestOverlayOrigin(panel: OverlayRect, anchor: OverlayRect): {
    x: number;
    y: number;
};
type Token = {
    current: number;
};
/** Open morph: pin the panel at ZOOM_FROM + fade (invisible until the
 *  transition starts), then double-rAF to identity (the modal's zoom-in).
 *  The anchor/origin is measured at the SECOND rAF — positioning (Radix
 *  popper passes, the app panel's positioning rAF) has settled by then, and
 *  the pinned start frame is invisible anyway (opacity 0), so the origin is
 *  correct from the very first visible frame. */
export declare function playOverlayOpen(token: Token, el: HTMLElement, getAnchor: (() => OverlayRect | null) | null, onDone?: () => void): void;
/** Close morph on the live node: shrink back to the anchor + fade (the
 *  modal's zoom-out). The panel goes pointer-transparent for the duration so
 *  the still-mounted content can't intercept clicks. The closing styles are
 *  NEVER cleared while the node is still mounted: clearing `opacity` there
 *  paints one last full-opacity frame if the consumer's unmount render is
 *  deferred (the classic close-flash). Instead the box is pinned invisible
 *  (`visibility: hidden`), the consumer unmounts it, and the styles are only
 *  restored once the node is actually detached. */
export declare function playOverlayClose(token: Token, el: HTMLElement, getAnchor: (() => OverlayRect | null) | null, onDone?: () => void): void;
/** Unmount-driven close (the modal's clone pattern): the parent removes the
 *  panel to close it, so pin a clone exactly where the panel was (panels may
 *  be position:absolute in a cell — the clone is hard-pinned fixed at the
 *  live rect, body-level) and zoom the clone out. `fallbackRect` covers the
 *  case where the live node is already detached when the ref fires (its own
 *  rect reads all zeros) — the hook caches the last known rect. The shrink
 *  ORIGIN is computed from the PINNED rect (`r`), never the live node's: by
 *  the time the close signal runs the node is usually detached, and a
 *  zero-size rect makes nearestOverlayOrigin pick the far corner — the clone
 *  would shrink toward its bottom-right, visibly sliding right as it fades
 *  instead of collapsing to the anchor. */
export declare function cloneOverlayClose(el: HTMLElement, getAnchor: (() => OverlayRect | null) | null, fallbackRect?: OverlayRect | null): void;
/** The overlay-morph controller. Returns a callback ref for the panel/content
 *  element (compose it with your own ref — e.g. Radix content refs, the app
 *  panel's positioning ref). The OPEN morph fires when the element mounts
 *  while `visible`; the CLOSE morph fires when `visible` flips false while
 *  the element is still mounted (keep it mounted until `onClosed` fires —
 *  the modal owns its dismissal the same way), or on unmount when
 *  `cloneOnUnmount` is set (the element itself is removed to close). */
export declare function useOverlayMorph<T extends HTMLElement>(opts: {
    visible: boolean;
    morph?: boolean;
    /** Supplier of the anchor rect (trigger box, press point, submenu entry
     *  edge). Null = center-anchored (the standalone modal zoom). */
    anchor?: () => OverlayRect | null;
    /** External ref that also receives the element (positioning refs etc.). */
    ref?: React.RefObject<T | null>;
    /** The element is unmounted to close — play the close morph on a clone. */
    cloneOnUnmount?: boolean;
    /** Fired when a close morph finishes (or immediately when motion is off) —
     *  unmount the Radix side / drop the "closing" render here. */
    onClosed?: () => void;
}): (node: T | null) => void;
export {};
