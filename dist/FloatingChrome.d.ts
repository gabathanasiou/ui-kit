import React from 'react';
import { type Placement } from '@floating-ui/react-dom';
/** How the anchor rect is interpreted before positioning:
 *  - 'visible' (default): the anchor rect is intersected with the viewport, so
 *    the panel floats against the VISIBLE part of the anchor. A small fully
 *    visible anchor (text block card) is a no-op; a tall scrolled-out anchor
 *    (huge repeat/ribbon card) behaves like a small one — the panel hovers
 *    right above what's on screen instead of clamping to the viewport edge.
 *  - 'rect': the raw anchor rect is used as-is. */
export type AnchorMode = 'visible' | 'rect';
export interface FloatingChromeProps {
    className: string;
    children: React.ReactNode;
    /** External anchor element (e.g. a table column cell). When omitted, an inline
     *  anchor covering the parent is used. */
    reference?: HTMLElement | null;
    /** Which side of the anchor the panel sits on. Default 'top'. */
    placement?: Placement;
    /** Anchor rect interpretation. Default 'visible'. */
    anchorMode?: AnchorMode;
    /** Gap between the anchor and the panel. Default 8. */
    offset?: number;
}
export declare const FloatingChrome: React.FC<FloatingChromeProps>;
export default FloatingChrome;
