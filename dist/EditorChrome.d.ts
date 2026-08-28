import React from 'react';
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
export declare const Seg: React.FC<{
    value: string;
    options: {
        v: string;
        l: string;
    }[];
    onChange: (v: string) => void;
    disabled?: boolean;
    active?: (v: string) => boolean;
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
 *  trailing actions. */
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
