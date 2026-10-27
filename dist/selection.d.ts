/**
 * The shared multi-select model (roadmap 322, phase 1).
 *
 * Two surfaces consume it:
 *  - MENUS that do something (`DropdownMenu` / `SearchMenu` multiple mode) run
 *    in `draft` mode: the panel keeps a local copy and the footer HERO commits
 *    it. Escape / click-away / a trigger click cancel (the draft is dropped).
 *  - VALUE FIELDS (`PickerField`, phase 5) run in `live` mode: the draft is
 *    flushed on close, only when the value actually changed.
 *
 * The model is pure where it matters (`toggleSelected` / `setSelected` /
 * `groupSelectionState` / `orderByCatalogue`) so Vitest can pin the rules
 * without a browser; `useSelection` is the thin stateful shell.
 *
 * Invariants:
 *  - Selection is emitted in CATALOGUE order, never click order.
 *  - `max` blocks adding past the cap; removing always works.
 *  - `disabledIds` rows can never be selected or toggled.
 *  - Selecting the VISIBLE (filtered) set is the ⌘A / group select-all target;
 *    selected-but-filtered ids stay selected and are reported as `hiddenCount`.
 */
export type SelectionMode = 'draft' | 'live';
export type SelectionGroupState = 'none' | 'some' | 'all';
export interface SelectionProps {
    /** `draft` = menus (hero commits) · `live` = value fields (flush on close). */
    mode?: SelectionMode;
    /** The committed value — the source of truth when a surface opens. */
    selectedIds: readonly string[];
    /** Every selectable id, in catalogue order. */
    itemIds: readonly string[];
    /** Ids the surface currently shows (filtered). Select-all uses these. */
    visibleIds?: readonly string[];
    /** Cap on selection size. */
    max?: number;
    disabledIds?: readonly string[];
    /** Row indicator: the shared checkbox (default) or a bare check glyph. */
    indicator?: 'box' | 'check';
    /** Live fields: called by `flush()` when the draft changed. */
    onChange?: (ids: string[]) => void;
    /** Draft menus: called by the footer hero. */
    onCommit?: (ids: string[]) => void;
    /** Optional per-toggle observer (peer feedback, analytics). */
    onToggle?: (id: string, selected: boolean) => void;
    /** Called SYNCHRONOUSLY after every user mutation (toggle / group / all /
     *  clear) with the next ordered draft. Value fields mirror this into their
     *  field text so a fast Tab never commits a stale list. */
    onDraftChange?: (ids: string[]) => void;
}
/** What a menu's `multiple` prop accepts (`DropdownMenu` + `SearchMenu`). */
export interface MultipleSelectionProps {
    selectedIds: readonly string[];
    /** `draft` (default) = the footer hero commits; `live` = every toggle emits
     *  `onDraftChange` and the CALLER commits on close (value fields). */
    mode?: 'draft' | 'live';
    /** Live fields: the ordered draft after every toggle / clear / reset. */
    onDraftChange?: (ids: string[]) => void;
    /** Optional per-toggle observer (a create row can react immediately). */
    onToggle?: (id: string, selected: boolean) => void;
    /** Footer hero: one call, catalogue order, one undo entry app-side. */
    onCommit: (ids: string[]) => void;
    /** Hero label — receives the draft count (`Add 6 roles`). */
    commitLabel?: string | ((count: number) => string);
    max?: number;
    disabledIds?: readonly string[];
    /** Row indicator: the shared checkbox (default) or a bare check glyph. */
    indicator?: 'box' | 'check';
    /** Hide the built-in footer (rare — the hero is the only commit path). */
    footer?: boolean;
    /** Hide the Clear action (add-only bulk menus). Default true. */
    clear?: boolean;
    /** Show the `N hidden by filter` note. Default true. */
    hiddenNote?: boolean;
    /** Virtual key per group: the header tick toggles this value instead of every
     *  item (a stored "whole department" tag) and reads checked when it is in the
     *  selection. Resolution/display of the key is the caller's catalogue. */
    groupToken?: (groupKey: string) => string | undefined;
}
export interface SelectionApi {
    mode: SelectionMode;
    /** Row indicator this surface asked for. */
    indicator: 'box' | 'check';
    /** The local selection, always in catalogue order. */
    draft: string[];
    count: number;
    max?: number;
    atMax: boolean;
    dirty: boolean;
    /** Selected ids that the current filter hides. */
    hiddenCount: number;
    isSelected(id: string): boolean;
    isDisabled(id: string): boolean;
    /** False for disabled rows and unchecked rows once `max` is reached. */
    canToggle(id: string): boolean;
    toggle(id: string): void;
    /** Select-all checkbox semantics: all selected → remove, otherwise add. */
    toggleGroup(ids: readonly string[]): void;
    /** Select / deselect a set (defaults to the visible ids). */
    setAll(on: boolean, ids?: readonly string[]): void;
    clear(): void;
    /** Re-seed the draft from the committed value (called when a surface opens). */
    reset(ids?: readonly string[]): void;
    /** Draft menus: commit when changed. Returns whether a commit happened. */
    commit(): boolean;
    /** Live fields: flush when changed. Returns whether a flush happened. */
    flush(): boolean;
    /** Drop the draft (Escape / click-away / trigger close). */
    cancel(): void;
    groupState(ids: readonly string[]): SelectionGroupState;
}
/** Order ids by the catalogue; ids the catalogue does not know keep their
 *  relative order at the END (a stale/free-typed value must never be dropped
 *  or re-ordered by a picker). Duplicates collapse to the first occurrence. */
export declare function orderByCatalogue(ids: readonly string[], itemIds: readonly string[]): string[];
/** Set equality — order-insensitive (re-ordering alone is not a change). */
export declare function sameSelection(a: readonly string[], b: readonly string[]): boolean;
/** Add or remove one id, respecting `max` and `disabledIds`. */
export declare function toggleSelected(selected: readonly string[], id: string, itemIds: readonly string[], opts?: {
    max?: number;
    disabledIds?: readonly string[];
}): string[];
/** Add (up to the cap) or remove a set of ids. Unknown ids are never added to
 *  the selection; selected unknowns are preserved. */
export declare function setSelected(selected: readonly string[], ids: readonly string[], on: boolean, itemIds: readonly string[], opts?: {
    max?: number;
    disabledIds?: readonly string[];
}): string[];
export declare function groupSelectionState(selected: readonly string[], ids: readonly string[]): SelectionGroupState;
/** Selected catalogue ids the current filter hides (unknown values excluded —
 *  they were never in the catalogue to hide). */
export declare function countHidden(selected: readonly string[], itemIds: readonly string[], visibleIds?: readonly string[]): number;
/** The draft state for a multi-select surface. */
export declare function useSelection(props: SelectionProps): SelectionApi;
/** Provided by a multi-select surface; `null` outside one. */
export declare const SelectionContext: import("react").Context<SelectionApi | null>;
export declare const useSelectionContext: () => SelectionApi | null;
/** Stable empty catalogue for hooks called outside a selection surface. */
export declare const NO_SELECTION_IDS: readonly string[];
