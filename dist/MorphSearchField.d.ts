import React from 'react';
import type { MorphFieldAction } from './morphFieldTypes';
export type { MorphFieldAction } from './morphFieldTypes';
/**
 * MorphSearchField — a toolbar search/filter trigger that MORPHS into a text
 * field (search menu, roadmap 172). The collapsed state is a kit Button; on
 * click the container animates its width while the button cross-fades out and
 * the field cross-fades in over the same box, so the control never jumps.
 *
 * Built for FILTERING (the Glide grid toolbars): the value survives collapsing,
 * so you can type a filter, click into the grid, and the toolbar stays compact
 * with your term still applied (pair it with a trailing result count). Escape
 * clears and collapses; clicking away / tabbing out collapses but keeps the
 * term; the clear button empties the field without collapsing.
 *
 * The `actions` prop / `MorphActionField` wrapper turn the field into an inline
 * CREATE surface: action buttons live inside the right edge. The shared
 * `MorphFieldShell` owns the button→field cross-fade; no third copy.
 */
export interface MorphSearchFieldProps {
    value: string;
    onChange: (value: string) => void;
    /** Collapsed button label. Default: "Filter". */
    triggerLabel?: string;
    /** Trigger leading icon (default: a magnifier). */
    triggerIcon?: React.ReactNode;
    placeholder?: string;
    /** Collapsed button width in px, or `'auto'` so an icon-first trigger
     *  (`triggerCollapse`) hugs the icon and expands on hover. Default 88. */
    collapsedWidth?: number | 'auto';
    /** Expanded field width in px. Default 200. */
    expandedWidth?: number;
    /** Button variant while collapsed (default `subtle` = toolbar secondary). */
    variant?: 'subtle' | 'primary' | 'outline';
    /** Icon-first trigger (the tab face, roadmap 258): the ICON alone at rest,
     *  the label reveals on hover. With `iconWithLabel={false}` the pair swaps —
     *  icon at rest, TEXT ONLY on hover. The applied-term state (`active`) keeps
     *  the label open. Needs a `triggerIcon` (the default magnifier counts). */
    triggerCollapse?: boolean;
    /** With `triggerCollapse`: false = text-only on hover (the icon collapses). */
    iconWithLabel?: boolean;
    /** Bare icon at rest (no box); the trigger takes its variant's box on hover.
     *  Pair with `triggerCollapse` for icon → button → field. */
    triggerReveal?: boolean;
    theme?: 'light' | 'dark';
    /** Tinted trigger while a term is applied (the collapsed state's "on" cue). */
    active?: boolean;
    autoFocus?: boolean;
    /** Notified when the field expands/collapses (never on value changes). */
    onExpandedChange?: (expanded: boolean) => void;
    /** Action buttons inside the field's right edge. */
    actions?: MorphFieldAction[];
    /** Leading icon inside the expanded field. Defaults to `triggerIcon`; pass
     *  `null` for a plain text box. */
    leadingIcon?: React.ReactNode | null;
    /** Show the filter clear button (default true). */
    showClear?: boolean;
    /** Enter submits the draft and collapses. */
    onSubmit?: (value: string) => void;
    /** Cancel handler for Escape / outside click when those cancel. */
    onCancel?: () => void;
    /** Escape cancels (instead of the filter default: clear). */
    cancelOnEscape?: boolean;
    /** Outside click cancels (instead of collapsing and keeping the value). */
    cancelOnOutside?: boolean;
    className?: string;
    "aria-label"?: string;
}
export declare function MorphSearchField({ value, onChange, triggerLabel, triggerIcon, placeholder, collapsedWidth, expandedWidth, variant, triggerCollapse, iconWithLabel, triggerReveal, theme, active, autoFocus, onExpandedChange, actions, leadingIcon, showClear, onSubmit, onCancel, cancelOnEscape, cancelOnOutside, className, 'aria-label': ariaLabel, }: MorphSearchFieldProps): React.JSX.Element;
export default MorphSearchField;
