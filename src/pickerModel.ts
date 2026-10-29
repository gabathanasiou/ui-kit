import type { CSSProperties, ReactNode } from 'react';

/**
 * The value model behind `PickerField` (roadmap 322, phase 5).
 *
 * A field stores an ARRAY of keys. The app's comma-string storage and
 * cast-by-ID rules stay in its adapter; the kit only maps keys ↔ labels,
 * parses the edited text, and reports values the catalogue does not know so
 * the host can create them.
 *
 * `resolveBy` picks the key space:
 *  - `id`    — values are stable ids, labels are what the user sees (cast).
 *  - `label` — values ARE the labels (props, wardrobe, locations by name).
 */

export type PickerResolveBy = 'id' | 'label';
export type PickerDisplay = 'names' | 'chips' | 'count';

export interface PickerItem {
  /** Stable key the field stores. */
  id: string;
  /** The row/trigger face. */
  label: string;
  group?: string;
  detail?: string;
  icon?: ReactNode;
  disabled?: boolean;
  fields?: { label: string; value: string }[];
  keywords?: string;
  /** Optional trailing badge rendered by the default row. */
  badge?: string;
  /** Optional row chrome (GroupedSelect's tag rows paint the whole row). */
  rowClassName?: string;
  rowStyle?: CSSProperties;
  /** Value-only entry: it resolves labels/keys (a stored "whole department"
   *  tag) but never renders as a row and is never searchable. */
  hidden?: boolean;
}

export function pickerItemKey(item: PickerItem, resolveBy: PickerResolveBy = 'id'): string {
  return resolveBy === 'label' ? item.label : item.id;
}

export function pickerItemLabel(value: string, items: readonly PickerItem[], resolveBy: PickerResolveBy = 'id'): string {
  const item = items.find(i => pickerItemKey(i, resolveBy) === value);
  return item?.label || value;
}

/** Comma segments of the edited text (trimmed, empty segments dropped). */
export function pickerSegments(text: string): string[] {
  return text.split(',').map(segment => segment.trim()).filter(Boolean);
}

/** The live query while editing a comma list: the LAST segment. A trailing
 *  comma (the append position) means an empty query. */
export function lastPickerSegment(text: string): string {
  const parts = text.split(',');
  return (parts[parts.length - 1] || '').trim();
}

/** Grid edit-on-type on a MULTI-value cell: the typed key is a live query for
 *  the LAST segment, not a replacement for the committed list. Keep the list
 *  (no trailing separator) and append the query. */
export function seedMultiQuery(text: string, query: string): string {
  const base = text.trim().replace(/,\s*$/, '');
  const q = query.trim();
  if (!q) return base;
  return base ? `${base}, ${q}` : q;
}

/** Resolve one typed segment to its catalogue key: an exact key wins, then a
 *  case-insensitive label; otherwise the typed text itself (a create). */
export function resolvePickerSegment(segment: string, items: readonly PickerItem[], resolveBy: PickerResolveBy = 'id'): string {
  const value = segment.trim();
  if (!value) return '';
  const byKey = items.find(i => pickerItemKey(i, resolveBy) === value);
  if (byKey) return pickerItemKey(byKey, resolveBy);
  const lower = value.toLowerCase();
  const byLabel = items.find(i => i.label.toLowerCase() === lower);
  if (byLabel) return pickerItemKey(byLabel, resolveBy);
  return value;
}

/** Parse edited text into deduped keys, preserving the typed order. */
export function resolvePickerText(text: string, items: readonly PickerItem[], resolveBy: PickerResolveBy = 'id'): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const segment of pickerSegments(text)) {
    const key = resolvePickerSegment(segment, items, resolveBy);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(key);
  }
  return out;
}

/** Parse edited text into the COMMITTED keys (the live query is not a value):
 *  a trailing comma commits the last segment; otherwise it is the query.
 *  `GEORGE, MARY, ` → both; `GEORGE, MAR` → GEORGE only. */
export function pickerCommittedKeys(text: string, items: readonly PickerItem[], resolveBy: PickerResolveBy = 'id'): string[] {
  const parts = text.split(',').map(segment => segment.trim()).filter(Boolean);
  const committed = text.trimEnd().endsWith(',') ? parts : parts.slice(0, -1);
  const seen = new Set<string>();
  const out: string[] = [];
  for (const segment of committed) {
    const key = resolvePickerSegment(segment, items, resolveBy);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(key);
  }
  return out;
}

/** True when the typed segment names an existing record — the create row is
 *  hidden then. An empty query "matches" (nothing to create). */
export function hasPickerMatch(segment: string, items: readonly PickerItem[], resolveBy: PickerResolveBy = 'id'): boolean {
  const value = segment.trim();
  if (!value) return true;
  const lower = value.toLowerCase();
  return items.some(i => pickerItemKey(i, resolveBy).toLowerCase() === lower || i.label.toLowerCase() === lower);
}

/** Committed values the catalogue does not know — the create hand-off list. */
export function unknownPickerValues(values: readonly string[], items: readonly PickerItem[], resolveBy: PickerResolveBy = 'id'): string[] {
  const known = new Set(items.map(i => pickerItemKey(i, resolveBy)));
  return values.filter(value => !known.has(value));
}

/** The closed-trigger text presets. `chips` is rendered as nodes, so its text
 *  is empty; `formatDisplay` always wins. */
export function formatPickerValues(
  values: readonly string[],
  items: readonly PickerItem[],
  resolveBy: PickerResolveBy,
  display: PickerDisplay,
  formatDisplay?: (values: string[], items: PickerItem[]) => string,
): string {
  if (formatDisplay) return formatDisplay([...values], [...items]);
  if (display === 'count') return values.length ? `${values.length} selected` : '';
  if (display === 'chips') return '';
  return values.map(value => pickerItemLabel(value, items, resolveBy)).join(', ');
}
