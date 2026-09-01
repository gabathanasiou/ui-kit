import React from 'react';
/**
 * Multi-select month calendar (dates as ISO `YYYY-MM-DD` keys). Themeable for
 * light pages and dark modals; consumed by the app's rule/event surfaces.
 *
 * Theming: `light` (default) renders a white card with zinc-200 borders;
 * `dark` renders the zinc-900 modal look. Selected days fill with the
 * accent; selected-date chips below allow per-date removal.
 *
 * Quick jump: clicking the month–year header swaps the day grid for a
 * 3×4 MONTH GRID with a typable YEAR box (Enter/blur commits, Escape
 * reverts) — two clicks to any month in any year.
 */
export interface DatePickerProps {
    selected: string[];
    onChange: (dates: string[]) => void;
    theme?: 'light' | 'dark';
    /** Collapse the selected-date chip row when nothing is picked. */
    showChips?: boolean;
    /** Seed the visible month/year on MOUNT from this ISO `YYYY-MM-DD` date
     *  (defaults to today's month). Lets the panel open on the relevant month
     *  instead of always landing on today — mount-scoped, so a fresh mount
     *  (e.g. a chrome panel that mounts per open) re-seeds every time. */
    initialView?: string;
    className?: string;
}
export default function DatePicker({ selected, onChange, theme, showChips, className, initialView }: DatePickerProps): React.JSX.Element;
