import React from 'react';
interface DropdownItemProps {
    onClick: () => void;
    icon?: React.ReactNode;
    disabled?: boolean;
    variant?: 'default' | 'danger';
    className?: string;
    children: React.ReactNode;
    key?: string;
    keepOpen?: boolean;
    /** The currently selected value — renders the selected tint (a distinct
     *  row background + text color, see `.ui-item-selected` tokens). Callers
     *  that want the panel-style Check glyph pass `trailing={<Check/>}`. */
    selected?: boolean;
    rightAction?: {
        icon: React.ReactNode;
        onClick: () => void;
        title?: string;
    };
    /** Non-interactive node rendered after the label (e.g. a check glyph) —
     *  sits OUTSIDE the truncating label span so it never gets squeezed or
     *  ellipsized. */
    trailing?: React.ReactNode;
}
export default function DropdownItem({ onClick, icon, disabled, variant, className, children, keepOpen, selected, rightAction, trailing, }: DropdownItemProps): React.JSX.Element;
export {};
