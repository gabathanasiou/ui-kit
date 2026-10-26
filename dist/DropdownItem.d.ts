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
    /** Optional category. The menu renders a header the first time this changes
     *  between VISIBLE rows (so filtering never leaves an orphan header), and a
     *  searchable menu's query matches the group too — typing "set" keeps the
     *  whole Set category. Keep grouped rows contiguous for the intended order. */
    group?: string;
}
export default function DropdownItem({ onClick, icon, disabled, variant, className, children, keepOpen, selected, rightAction, trailing, group, }: DropdownItemProps): React.JSX.Element;
export {};
