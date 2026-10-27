import React from 'react';
import { type DropdownTheme } from './DropdownMenu';
import type { MorphFieldAction } from './morphFieldTypes';
import { type SearchMenuGroup, type SearchMenuItem } from './searchMenuModel';
import type { MultipleSelectionProps } from './selection';
/**
 * SearchMenu — the shared "deep search" surface (roadmap 172, ui-kit).
 *
 * Two trigger modes:
 * - `expandable`: a button ("Search") that morphs into a text field on click
 *   and collapses back when done (select, Escape, outside click).
 * - `inline`: the field is always visible (the manager-sidebar pattern); click
 *   or focus opens the panel.
 *
 * The panel groups records under clickable category rows (icon + count), keeps
 * the keyboard in the field, supports comma tags (AND), and has a custom empty
 * state/action ("No matches" + "Add …"). No Radix menu — a search field must
 * keep focus, so the panel is positioned by the shared dropdown engine and the
 * input owns the keyboard.
 *
 * Value-field pickers: `browseAll` lists a single-kind catalogue flat on open
 * (no category rows) and `selectedId` marks the current value with a check and
 * scrolls it into view — the "open where I am" behaviour a form field needs.
 */
export type SearchMenuMode = 'expandable' | 'inline';
/** Imperative panel controls for a caller that owns the field (PickerField):
 *  the panel has no input of its own, so the field's keys drive it. */
export interface SearchMenuHandle {
    moveHighlight: (dir: 1 | -1) => void;
    /** Activate the lit row; false when nothing is lit (the field then commits). */
    activateHighlighted: () => boolean;
    close: () => void;
    selectAll: () => void;
    /** Replace the multi-select draft (a live field syncing its edited text). */
    setSelection: (ids: string[]) => void;
}
export interface SearchMenuEmptyAction {
    /** Row label; a function receives the current query. */
    label: string | ((query: string) => string);
    onClick: (query: string) => void;
    icon?: React.ReactNode;
}
export interface SearchMenuProps {
    items: SearchMenuItem[];
    /** Category registry (icon + count); records point at a group key. */
    groups?: SearchMenuGroup[];
    mode?: SearchMenuMode;
    /** Expandable mode: collapsed button label. */
    triggerLabel?: string;
    /** Expandable mode: the collapsed button's leading icon (default a
     *  magnifier). Pass the domain icon — MapPin for locations, UserPlus/Plus
     *  for adders — so the trigger says WHAT it opens; the expanded field keeps
     *  the magnifier. */
    triggerIcon?: React.ReactNode;
    placeholder?: string;
    /** Controlled query (optional). */
    query?: string;
    onQueryChange?: (query: string) => void;
    onSelect: (item: SearchMenuItem) => void;
    /** Clicking a category row. */
    onSelectGroup?: (group: SearchMenuGroup) => void;
    /** Called whenever the surface closes/collapses. */
    onClose?: () => void;
    closeOnSelect?: boolean;
    /** Open the panel on click/focus with an empty query (category browse). */
    openOnFocus?: boolean;
    /** Category rows get a chevron that expands their records in the browse
     *  state (a tree-style category browser). */
    expandableGroups?: boolean;
    /** Browse state: show every group's records under a PLAIN category header —
     *  no chevron, nothing to click, so a short catalogue is one glance instead
     *  of one click per category. Implies the tree body renders even when
     *  `expandableGroups` is false; `groupExpandMode` still applies if both are
     *  set (chevrons + groups start open). */
    browseExpanded?: boolean;
    /** `multiple` = several categories can be open; `single` = opening one
     *  collapses the others (accordion). All-collapsed is always allowed. */
    groupExpandMode?: 'multiple' | 'single';
    /** Flat picker: the empty query lists every record with NO category rows.
     *  Use for a single-kind catalogue (timezones, one element category) where
     *  a group header would only repeat the trigger — pairs with `selectedId` so
     *  opening the menu shows the whole list at the current value. */
    browseAll?: boolean;
    /** The current value of a picker: that record renders selected (tint + check)
     *  and the panel scrolls it into view when it opens — the "we are here"
     *  anchor for a value field. Purely visual; selection still comes from
     *  `onSelect`. */
    selectedId?: string;
    autoFocus?: boolean;
    /** Expandable mode widths (px). */
    collapsedWidth?: number;
    expandedWidth?: number;
    /** Panel width override (defaults to the trigger width). */
    panelWidth?: number | string;
    maxMenuHeight?: number;
    theme?: DropdownTheme;
    /** Panel morph (default true). */
    morph?: boolean;
    emptyTitle?: string;
    emptyHint?: string;
    /** Custom empty body (replaces the title/hint block; the action stays). */
    renderEmpty?: (ctx: {
        query: string;
        close: () => void;
    }) => React.ReactNode;
    /** Zero or more actions for the no-results state (fully caller-defined). */
    emptyActions?: SearchMenuEmptyAction[];
    /** Standing actions pinned above the list (always visible — e.g.
     *  "New location…"); the callback receives the current query. */
    leadingActions?: SearchMenuEmptyAction[];
    /** Hide the leading actions in the no-results state, where `emptyActions`
     *  already offer the query-aware create path (avoids two "add" rows). */
    hideLeadingOnEmpty?: boolean;
    /** Standing actions pinned below the list (always visible — e.g. a
     *  persistent "Add …" or management action); receives the current query. */
    footerActions?: SearchMenuEmptyAction[];
    /** Icon actions INSIDE the expanded text field, right edge (e.g. a plus that
     *  creates from the typed query). They receive the query + `{ close }`;
     *  panel actions (`emptyActions`/`leadingActions`/`footerActions`) stay
     *  separate. */
    fieldActions?: MorphFieldAction[];
    /** Multiple-selection mode: records toggle and the panel stays open; the
     *  footer hero commits the draft. `mode: 'live'` is the value-field variant
     *  (no hero — the caller commits on close). */
    multiple?: MultipleSelectionProps;
    /** Controlled panel state. When provided the caller owns open/close and the
     *  query is NOT cleared on close (the caller's field owns the text). */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** Render ONLY the panel (no field/trigger). Pass `anchorRef` for placement
     *  and outside-click containment. */
    hideTrigger?: boolean;
    /** Panel anchor + outside-click containment (defaults to the trigger). */
    anchorRef?: React.RefObject<HTMLElement | null>;
    /** Portal host for the panel (defaults to the popout target / body). */
    portalTarget?: HTMLElement | null;
    /** Expandable mode: replace the collapsed trigger button. */
    renderTrigger?: (ctx: {
        open: boolean;
        expanded: boolean;
        toggle: () => void;
    }) => React.ReactNode;
    /** Custom record row content — replaces the default icon/label/detail face.
     *  The row chrome, selection check and disabled state stay. */
    renderItem?: (item: SearchMenuItem, state: {
        checked: boolean;
        disabled: boolean;
    }) => React.ReactNode;
    /** Value fields: open with NO row lit (Enter then commits the typed text);
     *  typing still lights the first match. Default true. */
    highlightOnOpen?: boolean;
    /** Imperative panel controls for a caller that owns the field. */
    ref?: React.Ref<SearchMenuHandle>;
}
export declare function SearchMenu({ items, groups, mode, triggerLabel, triggerIcon, placeholder, query: controlledQuery, onQueryChange, onSelect, onSelectGroup, onClose, closeOnSelect, openOnFocus, expandableGroups, browseExpanded, groupExpandMode, browseAll, selectedId, autoFocus, collapsedWidth, expandedWidth, panelWidth, maxMenuHeight, theme, morph, emptyTitle, emptyHint, renderEmpty, emptyActions, leadingActions, hideLeadingOnEmpty, footerActions, fieldActions, multiple, open: controlledOpen, onOpenChange, hideTrigger, anchorRef, portalTarget: portalTargetProp, renderTrigger, renderItem: renderItemProp, highlightOnOpen, ref, }: SearchMenuProps): React.JSX.Element;
export default SearchMenu;
