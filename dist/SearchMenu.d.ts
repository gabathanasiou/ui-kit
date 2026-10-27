import React from 'react';
import { type DropdownTheme } from './DropdownMenu';
import { type SearchMenuGroup, type SearchMenuItem } from './searchMenuModel';
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
 */
export type SearchMenuMode = 'expandable' | 'inline';
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
}
export declare function SearchMenu({ items, groups, mode, triggerLabel, triggerIcon, placeholder, query: controlledQuery, onQueryChange, onSelect, onSelectGroup, onClose, closeOnSelect, openOnFocus, expandableGroups, browseExpanded, groupExpandMode, autoFocus, collapsedWidth, expandedWidth, panelWidth, maxMenuHeight, theme, morph, emptyTitle, emptyHint, renderEmpty, emptyActions, leadingActions, hideLeadingOnEmpty, footerActions, }: SearchMenuProps): React.JSX.Element;
export default SearchMenu;
