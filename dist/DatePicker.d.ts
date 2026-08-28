import React from 'react';
/**
 * Multi-select month calendar (dates as ISO `YYYY-MM-DD` keys). Themeable for
 * light pages and dark modals; consumed by the app's rule/event surfaces.
 *
 * Theming: `light` (default) renders a white card with zinc-200 borders;
 * `dark` renders the zinc-900 modal look. Selected days fill with the
 * accent; selected-date chips below allow per-date removal.
 */
export interface DatePickerProps {
    selected: string[];
    onChange: (dates: string[]) => void;
    theme?: 'light' | 'dark';
    /** Collapse the selected-date chip row when nothing is picked. */
    showChips?: boolean;
    className?: string;
}
export default function DatePicker({ selected, onChange, theme, showChips, className }: DatePickerProps): React.JSX.Element;
