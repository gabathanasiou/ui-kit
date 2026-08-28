import React from 'react';
/**
 * Checklist — a bordered "word list of checkboxes" (the Days-to-Print /
 * Days-to-Include / banner-delete pickers). Full-width toggle rows with a
 * blue accent box when checked, optional select-all header, leading badge,
 * right-aligned secondary text and a height limit with internal scrolling.
 */
export interface ChecklistItem {
    id: string | number;
    label: React.ReactNode;
    /** Extra node before the label (index number, colored chip…). */
    leading?: React.ReactNode;
    /** Right-aligned trailing text (date, count…). */
    secondary?: React.ReactNode;
}
export interface ChecklistProps {
    items: ChecklistItem[];
    /** Selected ids — a Set or an array (`.has` / `.includes`). */
    selected: ReadonlySet<string | number> | readonly (string | number)[];
    onToggle: (id: string | number) => void;
    /** Section header label (10px uppercase). */
    title?: React.ReactNode;
    /** Select-all button; label derives from `allSelected`. */
    onToggleAll?: () => void;
    allSelected?: boolean;
    /** Overrides the select-all button text (e.g. "Select all (N)"). */
    toggleAllLabel?: string;
    emptyHint?: string;
    /** Container height cap (px) — scrolls past it. */
    maxHeight?: number;
    disabled?: boolean;
    theme?: 'dark' | 'light' | 'blue';
    className?: string;
}
export default function Checklist({ items, selected, onToggle, title, onToggleAll, allSelected, toggleAllLabel, emptyHint, maxHeight, disabled, theme, className, }: ChecklistProps): React.JSX.Element;
