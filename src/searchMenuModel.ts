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
  fields?: { label: string; value: string }[];
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

export type SearchMenuRow =
  | { kind: 'group'; group: SearchMenuGroup }
  | { kind: 'item'; hit: SearchMenuHit; hidden?: boolean }
  | { kind: 'empty' }
  | { kind: 'action'; label: string; actionIndex: number; source?: 'empty' | 'leading' | 'footer' };

/** Comma-separated tags, trimmed and lowercased; empty segments dropped. */
export function parseSearchTags(query: string): string[] {
  return query.split(',').map(t => t.trim().toLowerCase()).filter(Boolean);
}

/** Does one record match every tag? */
export function matchSearchItem(
  item: SearchMenuItem,
  group: SearchMenuGroup | undefined,
  tags: string[],
): { matched: boolean; detail?: string } {
  if (tags.length === 0) return { matched: false };
  const label = item.label.toLowerCase();
  const detail = (item.detail || '').toLowerCase();
  const groupLabel = (group?.label || '').toLowerCase();
  const fields = item.fields || [];
  const hay = [
    label,
    detail,
    groupLabel,
    item.keywords || '',
    ...fields.map(f => f.value.toLowerCase()),
  ].join('\n');
  if (!tags.every(t => hay.includes(t))) return { matched: false };
  if (tags.every(t => label.includes(t) || groupLabel.includes(t))) return { matched: true };
  for (const tag of tags) {
    const field = fields.find(f => f.value.toLowerCase().includes(tag));
    if (field) {
      const value = field.value.trim();
      return { matched: true, detail: `${field.label}: ${value.length > 48 ? `${value.slice(0, 47)}…` : value}` };
    }
    if (detail.includes(tag)) return { matched: true, detail: item.detail };
  }
  return { matched: true };
}

/**
 * Records matching the query, in registry/input order, plus the groups that
 * should render (all groups when the query is empty; groups with hits or a
 * matching label otherwise).
 */
export function searchMenuContent(
  items: SearchMenuItem[],
  groups: SearchMenuGroup[],
  query: string,
): { hits: SearchMenuHit[]; visibleGroups: SearchMenuGroup[]; hasQuery: boolean } {
  const tags = parseSearchTags(query);
  const hasQuery = tags.length > 0;
  const groupByKey = new Map(groups.map(g => [g.key, g]));
  const hits: SearchMenuHit[] = [];
  for (const item of items) {
    const { matched, detail } = matchSearchItem(item, item.group ? groupByKey.get(item.group) : undefined, tags);
    if (matched) hits.push({ item, detail });
  }
  const hitGroups = new Set(hits.map(h => h.item.group).filter(Boolean) as string[]);
  const visibleGroups = hasQuery
    ? groups.filter(g => hitGroups.has(g.key) || g.label.toLowerCase().includes(query.trim().toLowerCase()))
    : groups;
  return { hits, visibleGroups, hasQuery };
}

/** Rows for the menu: category rows + record rows (+ empty/action). */
export function buildSearchMenuRows(params: {
  items: SearchMenuItem[];
  groups: SearchMenuGroup[];
  query: string;
  /** Render only category rows when the query is empty (browse state). */
  browseGroups?: boolean;
  /** Flat picker: an empty query lists EVERY record with no category rows
   *  (a catalogue of one kind — e.g. timezones, one element category — where
   *  a group header would only repeat the trigger). Overrides `browseGroups`. */
  browseAll?: boolean;
  /** Groups the user expanded with the chevron (browse state only). */
  expandedGroups?: ReadonlySet<string>;
  /** Keep every group's item rows mounted (collapsed groups marked `hidden`)
   *  so the tree can animate its rows instead of popping them in/out. */
  includeGroupItems?: boolean;
  emptyActionLabels?: string[];
}): SearchMenuRow[] {
  const { hits, visibleGroups, hasQuery } = searchMenuContent(params.items, params.groups, params.query);
  const rows: SearchMenuRow[] = [];
  const query = params.query.trim();
  if (!hasQuery) {
    if (params.browseAll) {
      for (const item of params.items) rows.push({ kind: 'item', hit: { item } });
      return rows;
    }
    if (params.browseGroups !== false) {
      for (const group of visibleGroups) {
        rows.push({ kind: 'group', group });
        const expanded = params.expandedGroups?.has(group.key) ?? false;
        if (params.includeGroupItems) {
          for (const item of params.items) {
            if (item.group === group.key) rows.push({ kind: 'item', hit: { item }, hidden: !expanded });
          }
        } else if (expanded) {
          for (const item of params.items) {
            if (item.group === group.key) rows.push({ kind: 'item', hit: { item } });
          }
        }
      }
    }
    return rows;
  }
  const seen = new Set<string>();
  for (const group of visibleGroups) {
    rows.push({ kind: 'group', group });
    seen.add(group.key);
    for (const hit of hits) {
      if (hit.item.group === group.key) rows.push({ kind: 'item', hit });
    }
  }
  // Records without a group (or a group not in the registry) render last.
  for (const hit of hits) {
    if (!hit.item.group || !seen.has(hit.item.group)) rows.push({ kind: 'item', hit });
  }
  if (rows.length === 0) {
    rows.push({ kind: 'empty' });
    (params.emptyActionLabels || []).forEach((label, actionIndex) => {
      rows.push({ kind: 'action', label, actionIndex });
    });
  }
  return rows;
}
