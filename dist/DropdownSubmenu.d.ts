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
}
export default function DropdownSubmenu({ id, label, icon, width, side, children, contentClassName }: DropdownSubmenuProps): React.JSX.Element;
