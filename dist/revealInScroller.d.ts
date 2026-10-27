import type { RefObject } from 'react';
/**
 * Opening a surface that already holds a value ("dropdown with a selected
 * thing") is ONE behaviour, shared by every picker in the kit and the apps:
 *
 * 1. The row for the current value is revealed **before the surface's first
 *    paint** — the list is already in place when it becomes visible, exactly
 *    like a native `<select>` popup, which is shown pre-scrolled.
 * 2. The list **never scrolls itself again once the pointer has engaged it**.
 *    A row that moves between mousedown and mouseup is a different node by
 *    click time; the browser then drops the click on the row (the "I have to
 *    click twice" bug).
 * 3. Scrolling is done on the surface's OWN scroll container, never with
 *    `scrollIntoView` — that also scrolls the page / enclosing modal, moving
 *    the surface under the pointer.
 *
 * Use `useRevealRowOnOpen` in a component; `revealRowInScroller` is the
 * DOM-level primitive for one-off keyboard/arrow navigation.
 */
export type RevealBlock = 'nearest' | 'center';
/**
 * Bring `row` into view inside its own scroller.
 *
 * - `nearest` (default): only moves when the row is actually outside the
 *   visible band — the keyboard/arrow case, and the "correct once the panel
 *   reports its final height" pass. A visible row never moves.
 * - `center`: puts the row mid-list — the current-value anchor of a picker.
 *
 * Never scrolls the page or an enclosing modal: when no scroller is found the
 * call is a no-op. Pass `scroller` explicitly when the surface owns one and
 * the auto-detection could pick a nested element.
 */
export declare function revealRowInScroller(row: HTMLElement | null | undefined, block?: RevealBlock, scroller?: HTMLElement | null): void;
export interface RevealRowOnOpenOptions {
    /** The surface is open (or has just mounted, for mount-per-open surfaces). */
    open: boolean;
    /** Resolve the row for the current value. Called on the open edge only. */
    row: () => HTMLElement | null;
    /** 'center' for pickers (the value sits mid-list), 'nearest' for plain
     *  menus (reveal only when it is out of view). Default 'nearest'. */
    block?: RevealBlock;
    /** The surface's own scroll container. Omit to let the row's nearest
     *  scrolling ancestor be used. */
    scroller?: () => HTMLElement | null;
    /** The surface has its FINAL size/position (e.g. `useDropdownPosition`'s
     *  `ready`). One `nearest` correction runs on that frame — a no-op when the
     *  first pass already landed correctly. Omit for synchronously laid-out
     *  surfaces. */
    ready?: boolean;
}
export interface RevealRowOnOpen {
    /** True once the pointer has entered or pressed the surface. */
    engagedRef: RefObject<boolean>;
    /** Wire to the surface's `onPointerEnter`/`onPointerDown`. */
    engage: () => void;
}
/**
 * The "opens with the current value already in view" behaviour. See the
 * module comment: reveal pre-paint, then never move once engaged.
 */
export declare function useRevealRowOnOpen({ open, row, block, scroller, ready, }: RevealRowOnOpenOptions): RevealRowOnOpen;
