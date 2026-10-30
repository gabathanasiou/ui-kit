import React from 'react';
export interface DropdownSubmenuProps {
    id: string;
    label: string;
    icon?: React.ReactNode;
    width?: string;
    side?: 'left' | 'right';
    children: React.ReactNode;
    /** Extra classes on the sub content (e.g. lifting it above a context
     *  menu's z-index). */
    contentClassName?: string;
    /** Coarse-pointer presentation (roadmaps 182/331). `accordion` (default)
     *  keeps ONLY the trigger row visible and expands the child directly beneath
     *  it, like an accordion panel — tapping the header again collapses it.
     *  `replace` covers the parent card exactly (the earlier audit pass).
     *  Desktop always keeps the Radix side placement. */
    touchPresentation?: 'accordion' | 'replace';
}
export default function DropdownSubmenu({ id, label, icon, width, side, children, contentClassName, touchPresentation }: DropdownSubmenuProps): React.JSX.Element;
