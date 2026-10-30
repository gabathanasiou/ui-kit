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
    /** Coarse-pointer presentation (roadmaps 182/331). DEFAULT is viewport-
     *  aware: phones (≤600px) use `replace` — the child card covers the parent
     *  exactly, with a Back row (the original audit version) — while wider
     *  coarse devices (iPad) use `accordion`: only the trigger row survives and
     *  the child panel expands beneath it. Pass an explicit value to force one.
     *  Desktop always keeps the Radix side placement. */
    touchPresentation?: 'accordion' | 'replace';
}
export default function DropdownSubmenu({ id, label, icon, width, side, children, contentClassName, touchPresentation }: DropdownSubmenuProps): React.JSX.Element;
