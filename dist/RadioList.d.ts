import React from 'react';
/**
 * RadioList — single-select sibling of Checklist: the same bordered word-list
 * with radio circles instead of square boxes. Picking a row selects it and
 * deselects the others (classic radio semantics — no select-all).
 */
export interface RadioListItem {
    id: string | number;
    label: React.ReactNode;
    /** Extra node before the label (index number, colored chip…). */
    leading?: React.ReactNode;
    /** Right-aligned trailing text. */
    secondary?: React.ReactNode;
}
export interface RadioListProps {
    items: RadioListItem[];
    value: string | number | null;
    onChange: (id: string | number) => void;
    /** Section header label (10px uppercase). */
    title?: React.ReactNode;
    emptyHint?: string;
    /** Container height cap (px) — scrolls past it. */
    maxHeight?: number;
    /** Tighter rows (px-2.5 py-1.5) for dense surfaces like the reports chrome. */
    compact?: boolean;
    disabled?: boolean;
    theme?: 'dark' | 'light' | 'blue';
    className?: string;
}
export default function RadioList({ items, value, onChange, title, emptyHint, maxHeight, compact, disabled, theme, className, }: RadioListProps): React.JSX.Element;
