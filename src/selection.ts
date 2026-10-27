import { createContext, useCallback, useContext, useMemo, useState } from 'react';

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
}

/** What a menu's `multiple` prop accepts (`DropdownMenu` + `SearchMenu`). */
export interface MultipleSelectionProps {
  selectedIds: readonly string[];
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

const EMPTY_IDS: readonly string[] = [];

/** Order ids by the catalogue; ids the catalogue does not know keep their
 *  relative order at the END (a stale/free-typed value must never be dropped
 *  or re-ordered by a picker). Duplicates collapse to the first occurrence. */
export function orderByCatalogue(ids: readonly string[], itemIds: readonly string[]): string[] {
  const rank = new Map<string, number>();
  itemIds.forEach((id, index) => rank.set(id, index));
  const known: string[] = [];
  const unknown: string[] = [];
  const seen = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) continue;
    seen.add(id);
    if (rank.has(id)) known.push(id);
    else unknown.push(id);
  }
  known.sort((a, b) => (rank.get(a) as number) - (rank.get(b) as number));
  return [...known, ...unknown];
}

/** Set equality — order-insensitive (re-ordering alone is not a change). */
export function sameSelection(a: readonly string[], b: readonly string[]): boolean {
  if (a.length !== b.length) return false;
  const set = new Set(a);
  return b.every(id => set.has(id));
}

/** Add or remove one id, respecting `max` and `disabledIds`. */
export function toggleSelected(
  selected: readonly string[],
  id: string,
  itemIds: readonly string[],
  opts: { max?: number; disabledIds?: readonly string[] } = {},
): string[] {
  const next = orderByCatalogue(selected, itemIds);
  if (opts.disabledIds?.includes(id)) return next;
  if (next.includes(id)) return next.filter(x => x !== id);
  if (opts.max !== undefined && next.length >= opts.max) return next;
  return orderByCatalogue([...next, id], itemIds);
}

/** Add (up to the cap) or remove a set of ids. Unknown ids are never added to
 *  the selection; selected unknowns are preserved. */
export function setSelected(
  selected: readonly string[],
  ids: readonly string[],
  on: boolean,
  itemIds: readonly string[],
  opts: { max?: number; disabledIds?: readonly string[] } = {},
): string[] {
  const next = orderByCatalogue(selected, itemIds);
  const target = new Set(ids);
  if (!on) return next.filter(id => !target.has(id));
  const known = new Set(itemIds);
  const disabled = new Set(opts.disabledIds ?? []);
  const remaining = opts.max === undefined ? Infinity : Math.max(0, opts.max - next.length);
  const additions = orderByCatalogue([...target], itemIds)
    .filter(id => known.has(id) && !next.includes(id) && !disabled.has(id))
    .slice(0, remaining);
  return additions.length === 0 ? next : orderByCatalogue([...next, ...additions], itemIds);
}

export function groupSelectionState(selected: readonly string[], ids: readonly string[]): SelectionGroupState {
  if (ids.length === 0) return 'none';
  const set = new Set(selected);
  const count = ids.reduce((n, id) => n + (set.has(id) ? 1 : 0), 0);
  return count === 0 ? 'none' : count === ids.length ? 'all' : 'some';
}

/** Selected catalogue ids the current filter hides (unknown values excluded —
 *  they were never in the catalogue to hide). */
export function countHidden(
  selected: readonly string[],
  itemIds: readonly string[],
  visibleIds?: readonly string[],
): number {
  if (!visibleIds) return 0;
  const known = new Set(itemIds);
  const visible = new Set(visibleIds);
  return selected.reduce((n, id) => n + (known.has(id) && !visible.has(id) ? 1 : 0), 0);
}

/** The draft state for a multi-select surface. */
export function useSelection(props: SelectionProps): SelectionApi {
  const {
    mode = 'draft',
    selectedIds,
    itemIds,
    visibleIds,
    max,
    disabledIds,
    indicator = 'box',
    onChange,
    onCommit,
    onToggle,
  } = props;
  const [draft, setDraft] = useState<string[]>(() => orderByCatalogue(selectedIds, itemIds));
  const disabled = useMemo(() => new Set(disabledIds ?? []), [disabledIds]);
  const draftSet = useMemo(() => new Set(draft), [draft]);
  const atMax = max !== undefined && draft.length >= max;
  const dirty = !sameSelection(draft, selectedIds);

  const toggle = useCallback((id: string) => {
    if (disabled.has(id)) return;
    const was = draftSet.has(id);
    const next = toggleSelected(draft, id, itemIds, { max, disabledIds });
    if (sameSelection(next, draft)) return;
    setDraft(next);
    onToggle?.(id, !was);
  }, [draft, draftSet, disabled, itemIds, max, disabledIds, onToggle]);

  const toggleGroup = useCallback((ids: readonly string[]) => {
    setDraft(prev => {
      const selectable = ids.filter(id => !disabled.has(id));
      const state = groupSelectionState(prev, selectable);
      return setSelected(prev, selectable, state !== 'all', itemIds, { max, disabledIds });
    });
  }, [disabled, itemIds, max, disabledIds]);

  const setAll = useCallback((on: boolean, ids: readonly string[] = visibleIds ?? itemIds) => {
    setDraft(prev => setSelected(prev, ids, on, itemIds, { max, disabledIds }));
  }, [visibleIds, itemIds, max, disabledIds]);

  const clear = useCallback(() => setDraft([]), []);

  const reset = useCallback((ids?: readonly string[]) => {
    setDraft(orderByCatalogue(ids ?? selectedIds, itemIds));
  }, [selectedIds, itemIds]);

  const commit = useCallback(() => {
    if (!onCommit || sameSelection(draft, selectedIds)) return false;
    onCommit(orderByCatalogue(draft, itemIds));
    return true;
  }, [onCommit, draft, selectedIds, itemIds]);

  const flush = useCallback(() => {
    if (!onChange || sameSelection(draft, selectedIds)) return false;
    onChange(orderByCatalogue(draft, itemIds));
    return true;
  }, [onChange, draft, selectedIds, itemIds]);

  const groupState = useCallback((ids: readonly string[]) => groupSelectionState(draft, ids), [draft]);

  return {
    mode,
    indicator,
    draft,
    count: draft.length,
    max,
    atMax,
    dirty,
    hiddenCount: countHidden(draft, itemIds, visibleIds),
    isSelected: (id: string) => draftSet.has(id),
    isDisabled: (id: string) => disabled.has(id),
    canToggle: (id: string) => !disabled.has(id) && (draftSet.has(id) || !atMax),
    toggle,
    toggleGroup,
    setAll,
    clear,
    reset,
    commit,
    flush,
    cancel: reset,
    groupState,
  };
}

/** Provided by a multi-select surface; `null` outside one. */
export const SelectionContext = createContext<SelectionApi | null>(null);
export const useSelectionContext = () => useContext(SelectionContext);
/** Stable empty catalogue for hooks called outside a selection surface. */
export const NO_SELECTION_IDS = EMPTY_IDS;
