import React from 'react';
/** The accessible name a tooltip lends its trigger, or null when the trigger
 *  already has one (`aria-label`/`title`) or shows its own text — visible
 *  labels must stay part of the accessible name (WCAG label-in-name). Only
 *  icon-only triggers get named, which is exactly the a11y gap tooltips were
 *  hiding — and the name is what stable hooks (e.g. presence anchors) key on.
 *  Pure; unit-tested. */
export declare function tooltipAriaLabel(children: React.ReactNode, content: string): Record<string, string>;
export declare const Tooltip: React.FC<{
    content: string;
    children: React.ReactNode;
}>;
export default Tooltip;
