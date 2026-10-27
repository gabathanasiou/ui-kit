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
    fields?: {
        label: string;
        value: string;
    }[];
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
export declare function pickerItemKey(item: PickerItem, resolveBy?: PickerResolveBy): string;
export declare function pickerItemLabel(value: string, items: readonly PickerItem[], resolveBy?: PickerResolveBy): string;
/** Comma segments of the edited text (trimmed, empty segments dropped). */
export declare function pickerSegments(text: string): string[];
/** The live query while editing a comma list: the LAST segment. A trailing
 *  comma (the append position) means an empty query. */
export declare function lastPickerSegment(text: string): string;
/** Resolve one typed segment to its catalogue key: an exact key wins, then a
 *  case-insensitive label; otherwise the typed text itself (a create). */
export declare function resolvePickerSegment(segment: string, items: readonly PickerItem[], resolveBy?: PickerResolveBy): string;
/** Parse edited text into deduped keys, preserving the typed order. */
export declare function resolvePickerText(text: string, items: readonly PickerItem[], resolveBy?: PickerResolveBy): string[];
/** Parse edited text into the COMMITTED keys (the live query is not a value):
 *  a trailing comma commits the last segment; otherwise it is the query.
 *  `GEORGE, MARY, ` → both; `GEORGE, MAR` → GEORGE only. */
export declare function pickerCommittedKeys(text: string, items: readonly PickerItem[], resolveBy?: PickerResolveBy): string[];
/** True when the typed segment names an existing record — the create row is
 *  hidden then. An empty query "matches" (nothing to create). */
export declare function hasPickerMatch(segment: string, items: readonly PickerItem[], resolveBy?: PickerResolveBy): boolean;
/** Committed values the catalogue does not know — the create hand-off list. */
export declare function unknownPickerValues(values: readonly string[], items: readonly PickerItem[], resolveBy?: PickerResolveBy): string[];
/** The closed-trigger text presets. `chips` is rendered as nodes, so its text
 *  is empty; `formatDisplay` always wins. */
export declare function formatPickerValues(values: readonly string[], items: readonly PickerItem[], resolveBy: PickerResolveBy, display: PickerDisplay, formatDisplay?: (values: string[], items: PickerItem[]) => string): string;
