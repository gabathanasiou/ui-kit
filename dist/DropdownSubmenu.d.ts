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
    /** Coarse-pointer presentation. DEFAULT is `replace` on EVERY coarse device
     *  (roadmaps 335/182): ONE card on screen — the child FLIPs out of its
     *  parent's box (the modal stack language) and Back FLIPs the parent back.
     *  `accordion` is playground-only WIP and must never be wired into the app.
     *  Desktop always keeps the Radix side placement. */
    touchPresentation?: 'accordion' | 'replace';
}
export default function DropdownSubmenu({ id, label, icon, width, side, children, contentClassName, touchPresentation }: DropdownSubmenuProps): React.JSX.Element;
