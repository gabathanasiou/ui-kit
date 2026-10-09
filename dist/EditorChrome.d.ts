import React from 'react';
/** Proportional coarse sizes for the editor-chrome toolbar (TB_* constants
 *  are load-time; this returns INLINE sizes interpolated by the global
 *  coarseScale — Tailwind can't JIT runtime classes). ALWAYS returns the
 *  sizes (fine devices get the desktop values) so consumers spread them on
 *  their toggle/btn/input elements. */
export declare function useToolbarChrome(): {
    toggle: {
        width: number;
        height: number;
    };
    control: {
        height: number;
        padding: string;
        fontSize: number;
    };
    input: {
        height: number;
        padding: string;
        fontSize: number;
    };
};
export declare const TB_ROW_LABEL: string;
export declare const TB_BTN: string;
export declare const TB_BTN_ICON: string;
export declare const TB_DANGER = "hover:bg-red-950/50";
export declare const TB_TOGGLE: string;
export declare const TB_TOGGLE_ON = "bg-blue-900/50 border-blue-700 text-blue-300";
export declare const TB_TOGGLE_OFF = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700";
export declare const TB_INPUT: string;
export declare const TB_NUM: string;
export declare const TB_DIVIDER: string;
export declare const TB_SEG = "inline-flex rounded overflow-hidden border border-zinc-700";
/** Dropdown trigger look shared by every picker — matches the ribbon designer's
 *  dropdown buttons (h-7, coarse h-10) instead of the old thin strip. */
export declare const TB_PICKER: string;
export declare const ToolButton: React.FC<{
    onClick: () => void;
    disabled?: boolean;
    title: string;
    className?: string;
    children: React.ReactNode;
}>;
export interface SegOption {
    v: string;
    l: string;
    title?: string;
    /** Segment icon (rendered before the label; label may be '' for an
     *  icon-only segment — `title` then carries the accessible name). */
    icon?: React.ReactNode;
}
/** Segmented control.
 *
 *  `chrome` (default) — the editor-chrome joined-cells look (Reports Designer).
 *  `track` — the padded-track look with a **sliding pill** (modal tab bars,
 *  toolbar view switches); `theme` picks the light-toolbar or dark-modal
 *  palette, `stretch` fills the container, `tablist` gives real tab semantics.
 *  The pill animates between segments (transform/width, ~200ms) and is skipped
 *  under `prefers-reduced-motion`. */
export declare const Seg: React.FC<{
    value: string;
    options: SegOption[];
    onChange: (v: string) => void;
    disabled?: boolean;
    active?: (v: string) => boolean;
    /** Fill the container with equal-width segments (labels centered) — the
     *  docked inspector column wants the control to span the full row. */
    stretch?: boolean;
    /** Ride a plain toolbar row (24px on fine pointers) instead of the editor
     *  chrome's 28px control height. Ignored on coarse pointers and by `track`. */
    dense?: boolean;
    variant?: 'chrome' | 'track';
    /** Track palette. Ignored by `chrome`. */
    theme?: 'light' | 'dark';
    /** Tab semantics: role=tablist/tab + aria-selected (segments switch
     *  panels). Default is a button group with aria-pressed. */
    tablist?: boolean;
    /** Accessible name for the container (group/tablist). */
    ariaLabel?: string;
}>;
/** Section eyebrow: uppercase label with a hairline rule. */
export declare const SectionHeader: React.FC<{
    children: React.ReactNode;
}>;
/** Labeled content row inside an editor panel (label above when `tall`). */
export declare const ContentRow: React.FC<{
    label?: string;
    children: React.ReactNode;
    tall?: boolean;
}>;
/** Editor panel header bar: leading slot (icon + label) + right-aligned
 *  trailing actions. Wraps when its surface is narrower than the actions (the
 *  docked inspector column) — the trailing cluster then drops to its own line,
 *  still right-aligned via `ml-auto`, and wraps again internally if it is
 *  still wider than the panel. */
export declare const ChromeHeader: React.FC<{
    leading?: React.ReactNode;
    trailing?: React.ReactNode;
    className?: string;
}>;
/** Structure (move / duplicate / delete) actions for an editor panel. */
export interface StructureControlsProps {
    readOnly: boolean;
    onDuplicate: () => void;
    onRemove: () => void;
    onMove: (dir: -1 | 1) => void;
    compact?: boolean;
}
export declare const StructureControls: React.FC<StructureControlsProps>;
