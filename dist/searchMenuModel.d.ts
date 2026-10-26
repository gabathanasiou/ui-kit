import React from 'react';
/**
 * Search-menu model (the shared "deep search" pattern).
 *
 * A menu is a flat list of records plus an optional group registry (categories).
 * Groups render as clickable category rows with their icon + count; records
 * render under them. Queries are comma tags (AND) matched against the record
 * label, detail, fields and the group label. When a record has fields, the
 * first field that supplied the match becomes the row's detail snippet.
 */
export interface SearchMenuItem {
    id: string;
    label: string;
    /** Group key (category key). Records with the same key render together. */
    group?: string;
    /** Optional secondary text (e.g. "Artiste: Roy Smith"). */
    detail?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    /** Extra searchable attributes (phone, email, address …). */
    fields?: {
        label: string;
        value: string;
    }[];
    /** Extra free text to match (keywords). */
    keywords?: string;
}
export interface SearchMenuGroup {
    key: string;
    label: string;
    icon?: React.ReactNode;
    /** Total records in the group (the sidebar count, not the hit count). */
    count?: number;
}
export interface SearchMenuHit {
    item: SearchMenuItem;
    /** Matched attribute snippet ("Phone: 555-0199"), when useful. */
    detail?: string;
}
export type SearchMenuRow = {
    kind: 'group';
    group: SearchMenuGroup;
} | {
    kind: 'item';
    hit: SearchMenuHit;
} | {
    kind: 'empty';
} | {
    kind: 'action';
    label: string;
    actionIndex: number;
};
/** Comma-separated tags, trimmed and lowercased; empty segments dropped. */
export declare function parseSearchTags(query: string): string[];
/** Does one record match every tag? */
export declare function matchSearchItem(item: SearchMenuItem, group: SearchMenuGroup | undefined, tags: string[]): {
    matched: boolean;
    detail?: string;
};
/**
 * Records matching the query, in registry/input order, plus the groups that
 * should render (all groups when the query is empty; groups with hits or a
 * matching label otherwise).
 */
export declare function searchMenuContent(items: SearchMenuItem[], groups: SearchMenuGroup[], query: string): {
    hits: SearchMenuHit[];
    visibleGroups: SearchMenuGroup[];
    hasQuery: boolean;
};
/** Rows for the menu: category rows + record rows (+ empty/action). */
export declare function buildSearchMenuRows(params: {
    items: SearchMenuItem[];
    groups: SearchMenuGroup[];
    query: string;
    /** Render only category rows when the query is empty (browse state). */
    browseGroups?: boolean;
    /** Groups the user expanded with the chevron (browse state only). */
    expandedGroups?: ReadonlySet<string>;
    emptyActionLabels?: string[];
}): SearchMenuRow[];
