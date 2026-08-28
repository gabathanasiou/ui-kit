import React from 'react';
interface DropdownSubmenuProps {
    id: string;
    label: string;
    icon?: React.ReactNode;
    width?: string;
    side?: 'left' | 'right';
    children: React.ReactNode;
}
export default function DropdownSubmenu({ id, label, icon, width, side, children }: DropdownSubmenuProps): React.JSX.Element;
export {};
