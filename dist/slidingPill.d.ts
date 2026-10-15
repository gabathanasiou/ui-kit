import React from 'react';
/**
 * Sliding highlight for a `relative` container of measured items — the
 * mechanism behind `Seg`'s gliding pill and the app header's selected tab
 * (roadmap 258). Tracks the active item's box and returns the style for an
 * absolutely-positioned pill that glides between items (transform + width,
 * ~200ms ease-out).
 *
 * - Measurement is `offsetLeft`/`offsetWidth` of the active item, so the
 *   container MUST be the items' positioned ancestor (`relative`) and the
 *   items must be its direct children.
 * - The container is observed with a ResizeObserver: a resize means something
 *   is reflowing (a collapsed label expanding, a dock-style hover shift), so
 *   the pill *chases* the live measurement with transitions off instead of
 *   lagging a 200ms glide behind the moving target. ~250ms after the geometry
 *   settles, transitions come back for the next glide.
 * - `prefers-reduced-motion` never transitions (instant jumps).
 *
 * Render the pill as a sibling of the items, e.g.:
 * `<span aria-hidden className={`absolute top-0 bottom-0 rounded bg-white ${motionClass}`} style={style} />`
 * The items should sit above it (`relative z-10`).
 */
export interface SlidingPill {
    /** Pill box relative to the container; null until the first measure. */
    style: React.CSSProperties | null;
    /** Motion classes for the pill span — '' while chasing or under reduced motion. */
    motionClass: string;
}
export declare function useSlidingPill(containerRef: React.RefObject<HTMLElement | null>, itemRefs: React.RefObject<(HTMLElement | null)[]>, activeIndex: number): SlidingPill;
