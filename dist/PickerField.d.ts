import React from 'react';
import type { SearchMenuGroup } from './searchMenuModel';
import { type PickerDisplay, type PickerItem, type PickerResolveBy } from './pickerModel';
import type { DropdownTheme } from './DropdownMenu';
/**
 * PickerField — the kit's ONE value picker (roadmap 322, phase 5).
 *
 * A field that stores an array of keys and edits it against a catalogue:
 *  - `appearance="inline" | "wrap"` — the cell editor (thin, transparent);
 *  - `appearance="chip"`            — the bordered form-field trigger;
 *  - `appearance="morph"`           — a button that morphs into the field.
 *
 * The PANEL is the shared `SearchMenu` catalogue (no second implementation):
 * groups, deep search, create-from-typed (leading action), custom rows and
 * multiple selection all come from it. This component owns only the value
 * layer: the field text, comma-segment query, key↔label resolution, commit on
 * close, and the trigger display presets.
 *
 * In multiple mode the field runs the SearchMenu `live` selection: clicks
 * toggle, the field text mirrors the draft, and the VALUE commits on close
 * (blur / outside / Tab) — only when it actually changed. Escape cancels.
 */
export type PickerAppearance = 'inline' | 'chip' | 'wrap' | 'morph';
export interface PickerTriggerContext {
    values: string[];
    items: PickerItem[];
    display: string;
    open: boolean;
    toggle: () => void;
}
export interface PickerFieldProps {
    /** Committed keys (ids by default, labels with `resolveBy="label"`). */
    values: string[];
    /** One call on commit, only when the value changed. */
    onChange: (values: string[]) => void;
    items: PickerItem[];
    groups?: SearchMenuGroup[];
    resolveBy?: PickerResolveBy;
    mode?: 'single' | 'multiple';
    appearance?: PickerAppearance;
    /** Closed-trigger text. `chips` renders the values as chips. */
    display?: PickerDisplay;
    /** Arbitrary closed-trigger text (wins over the presets). */
    formatDisplay?: (values: string[], items: PickerItem[]) => string;
    /** Text while the field is OPEN. Defaults to the item labels (with the
     *  trailing ", " append position); pass keys for id-stored fields that
     *  display names when closed (cast edits as "1, 2, "). */
    formatEditing?: (values: string[], items: PickerItem[]) => string;
    /** Chip/morph closed trigger (the editable field is still the input). */
    renderTrigger?: (ctx: PickerTriggerContext) => React.ReactNode;
    /** Custom row content; the row chrome + selection check stay. */
    renderItem?: (item: PickerItem, checked: boolean) => React.ReactNode;
    badge?: (item: PickerItem) => string | null;
    trailing?: (item: PickerItem) => React.ReactNode;
    /** Element-link anchors (item-key space; labels case-insensitive). */
    anchoredKeys?: ReadonlySet<string>;
    anchoredLabel?: string;
    placeholder?: string;
    /** Read-only FACE (no panel, no focus): a display value. */
    readOnly?: boolean;
    /** Keep the field's text non-editable (keyboard-off on a touch device) while
     *  the picker still OPENS on click/pick-through. */
    inputReadOnly?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
    /** Open on mount (cell editors). */
    defaultOpen?: boolean;
    /** Single mode: select the current text on open so typing replaces it. */
    selectAllOnOpen?: boolean;
    uppercase?: boolean;
    /** Strict option lists (day/night, INT/EXT, a set picker): ignore typed
     *  text that matches no item instead of storing it. Default true. */
    allowFreeText?: boolean;
    /** Dropdown palette (defaults to the ambient kit mode). */
    theme?: DropdownTheme;
    className?: string;
    style?: React.CSSProperties;
    panelWidth?: number | string;
    /** Never render the panel narrower than this (px) — cell editors anchor to
     *  a thin box but still need a readable list. */
    panelMinWidth?: number;
    /** Single mode: the search text to open the FIRST panel with. A host that
     *  starts editing from a typed character (Glide's overlay editor passes it as
     *  `initialValue` and never delivers an input event) hands it here, so the
     *  first letter lights its option instead of the list falling back to the
     *  first row. Later opens start from an empty query. */
    initialQuery?: string;
    /** Keep the FULL catalogue rendered while typing (the query only moves the
     *  highlight). The old I/E + D/N autocompletes worked this way: every option
     *  stays visible so a single letter lights its match without hiding the
     *  rest. */
    keepAllRows?: boolean;
    maxMenuHeight?: number;
    /** Portal host for the panel (Glide cells / modal hosts). */
    portalTarget?: HTMLElement | null;
    /** Inline cells: grow with the content (`field-sizing: content`). */
    autoGrow?: boolean;
    /** Multi: open WITHOUT the trailing ", " (a typed-key cell open). */
    skipComma?: boolean;
    collapsedWidth?: number;
    expandedWidth?: number;
    /** Create-from-typed: label for the leading action + the hand-off. */
    createLabel?: (typed: string) => string;
    onCreateItem?: (value: string) => void;
    onExit?: () => void;
    onEscape?: () => void;
    /** Tab hand-off (Glide's onFinishedEditing). */
    onTabExit?: (el?: HTMLElement) => void;
    /** Async source (replaces AsyncResultsDropdown): debounced on the query. */
    loadItems?: (query: string) => Promise<PickerItem[]>;
    sortItems?: (items: PickerItem[], values: string[]) => PickerItem[];
    max?: number;
    disabledIds?: readonly string[];
    indicator?: 'box' | 'check';
    /** Grouped catalogue behaviour (default: plain headers). */
    browse?: 'open' | 'accordion';
    /** Virtual key per group: the group header's tick toggles this value instead
     *  of every item (a stored "whole department" tag), and reads as checked when
     *  it is selected. The key must resolve to a `hidden` PickerItem. */
    groupToken?: (groupKey: string) => string | undefined;
}
export declare function PickerField({ values, onChange, items, groups, resolveBy, mode, appearance, display, formatDisplay, formatEditing, renderTrigger, renderItem, badge, trailing, anchoredKeys, anchoredLabel, placeholder, readOnly, inputReadOnly, disabled, autoFocus, defaultOpen, selectAllOnOpen, uppercase, allowFreeText, theme: themeProp, className, style, panelWidth, panelMinWidth, initialQuery, keepAllRows, maxMenuHeight, portalTarget, autoGrow, skipComma, collapsedWidth, expandedWidth, createLabel, onCreateItem, onExit, onEscape, onTabExit, loadItems, sortItems, max, disabledIds, indicator, browse, groupToken, }: PickerFieldProps): React.JSX.Element;
export default PickerField;
