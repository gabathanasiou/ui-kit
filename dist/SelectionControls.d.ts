import React from 'react';
/** The check affordance of a multi-select row / group header. Purely visual —
 *  the surface owns the control around it (a menu row, a group select-all
 *  button, a field chip). Coarse-scaled like every other picker control.
 *
 *  `indicator` picks the face:
 *   - `box`  — the shared checkbox indicator (default);
 *   - `check` — a bare check glyph in the same fixed-width slot (no box), for
 *     menus that should read as a tick list. The empty slot keeps rows aligned
 *     while toggling. */
export interface SelectionCheckProps {
    checked: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    indicator?: 'box' | 'check';
    /** Box size in px (defaults to the coarse-scaled menu size). */
    size?: number;
    className?: string;
}
export declare function SelectionCheck({ checked, indeterminate, disabled, indicator, size, className, }: SelectionCheckProps): React.JSX.Element;
export interface SelectionFooterHero {
    label: string;
    onClick: () => void;
    /** Default: disabled at 0 selections. */
    disabled?: boolean;
}
/** The pinned action strip of a multi-select panel: `N of M selected ·
 *  hidden-by-filter · Clear · hero`. The hero is the ONLY commit path for a
 *  menu (Escape / click-away / trigger close cancel). Value fields omit it and
 *  just show the count + Clear. */
export interface SelectionFooterProps {
    count: number;
    max?: number;
    hiddenCount?: number;
    onClear: () => void;
    hero?: SelectionFooterHero;
    /** Hide Clear (add-only bulk menus). Default true. */
    clear?: boolean;
    /** The owning surface's theme. Portals do NOT inherit the page's
     *  ThemeScope, so the footer buttons must be told the menu's palette. */
    theme?: 'light' | 'dark' | 'blue' | 'emerald';
    className?: string;
}
export declare function SelectionFooter({ count, max, hiddenCount, onClear, hero, clear, theme, className, }: SelectionFooterProps): React.JSX.Element;
