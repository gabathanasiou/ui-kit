import { type RefObject } from 'react';
/**
 * THE dropdown/panel positioner — one engine for every floating menu surface
 * (kit DropdownMenu, app DropdownPanel, entity/select/autocomplete panels).
 *
 * The viewport is the VISUAL viewport: on iPad the software keyboard shrinks
 * and pans it without touching the layout viewport, so `innerWidth/Height`
 * (and a fixed element's CSS `bottom`) are the wrong bounds. Every decision —
 * flip, clamp, height cap — uses `visualViewport.offsetLeft/offsetTop/width/
 * height` expressed in layout-viewport coordinates (the same space as
 * `getBoundingClientRect`). Position is written as top/left only.
 *
 * Placement mirrors floating-ui's canonical `flip` → `shift` → `size` chain:
 *  1. measure the panel's natural content height (ignoring the last clamp);
 *  2. `flip` opens below when it fits, above when that fits, and picks the
 *     roomier side (`bestFit`) when neither does;
 *  3. `shift` slides it horizontally into view;
 *  4. `size` caps the height to the room left on the chosen side, never below
 *     `minHeight`.
 *
 * Re-measures on: any scroll (capture), window resize, visualViewport
 * resize/scroll (keyboard), and panel/content resize (filtering, list growth).
 */
export interface DropdownPanelPos {
    /** Layout-viewport coordinates (same space as `getBoundingClientRect`). */
    top: number;
    left: number;
    /** Final height cap for the panel, px. */
    maxH: number;
    /** The side the panel actually opened on, after flipping. */
    side: 'top' | 'bottom';
    ready: true;
}
export interface UseDropdownPositionOptions {
    anchorRef: RefObject<HTMLElement | null>;
    panelRef: RefObject<HTMLElement | null>;
    open: boolean;
    /** The scrolling content element inside the panel when the panel itself is
     *  not the scroller (DropdownPanel wraps one). Natural height is measured
     *  from here. Defaults to the panel. */
    contentRef?: RefObject<HTMLElement | null>;
    /** Distance between the anchor and the panel. Default 4. */
    gap?: number;
    /** Viewport padding kept clear around the panel. Default 8. */
    padding?: number;
    /** Per-surface height cap (e.g. 256 for the compact category menus).
     *  Default 384. */
    maxHeight?: number;
    /** Smallest height the panel may be clamped to before it stays usable.
     *  Default 32. */
    minHeight?: number;
    onPosition: (pos: DropdownPanelPos) => void;
}
export declare const DROPDOWN_MAX_HEIGHT = 384;
export declare function useDropdownPosition({ anchorRef, panelRef, open, contentRef, gap, padding, maxHeight, minHeight, onPosition, }: UseDropdownPositionOptions): void;
