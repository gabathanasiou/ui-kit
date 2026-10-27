import React, { useCallback, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, ChevronDown, Plus, Search, X } from 'lucide-react';
import { getDropdownClasses, useItemSize, useMenuGroupSize, type DropdownTheme } from './DropdownMenu';
import { useDropdownPosition } from './useDropdownPosition';
import { useCurrentDocument, usePortalTarget } from './popout';
import { useOverlayMorph, MORPH_MS } from './overlayMorph';
import { inputCls } from './input';
import Button from './Button';
import MorphFieldShell from './MorphFieldShell';
import { useIconButtonSize } from './device';
import { revealRowInScroller, useRevealRowOnOpen } from './revealInScroller';
import type { MorphFieldAction } from './morphFieldTypes';
import {
  buildSearchMenuRows,
  searchMenuContent,
  type SearchMenuGroup,
  type SearchMenuItem,
  type SearchMenuRow,
} from './searchMenuModel';
import { useSelection, NO_SELECTION_IDS } from './selection';
import type { MultipleSelectionProps } from './selection';
import { SelectionCheck, SelectionFooter } from './SelectionControls';

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
  renderEmpty?: (ctx: { query: string; close: () => void }) => React.ReactNode;
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
  renderTrigger?: (ctx: { open: boolean; expanded: boolean; toggle: () => void }) => React.ReactNode;
  /** Custom record row content — replaces the default icon/label/detail face.
   *  The row chrome, selection check and disabled state stay. */
  renderItem?: (item: SearchMenuItem, state: { checked: boolean; disabled: boolean }) => React.ReactNode;
  /** Value fields: open with NO row lit (Enter then commits the typed text);
   *  typing still lights the first match. Default true. */
  highlightOnOpen?: boolean;
  /** Imperative panel controls for a caller that owns the field. */
  ref?: React.Ref<SearchMenuHandle>;
}

export function SearchMenu({
  items,
  groups = [],
  mode = 'expandable',
  triggerLabel = 'Search',
  triggerIcon,
  placeholder = 'Search…',
  query: controlledQuery,
  onQueryChange,
  onSelect,
  onSelectGroup,
  onClose,
  closeOnSelect = true,
  openOnFocus = true,
  expandableGroups = false,
  browseExpanded = false,
  groupExpandMode = 'multiple',
  browseAll = false,
  selectedId,
  autoFocus = true,
  collapsedWidth = 128,
  expandedWidth = 288,
  panelWidth,
  maxMenuHeight = 420,
  theme = 'light',
  morph = true,
  emptyTitle,
  emptyHint,
  renderEmpty,
  emptyActions,
  leadingActions,
  hideLeadingOnEmpty = false,
  footerActions,
  fieldActions,
  multiple,
  open: controlledOpen,
  onOpenChange,
  hideTrigger = false,
  anchorRef,
  portalTarget: portalTargetProp,
  renderTrigger,
  renderItem: renderItemProp,
  highlightOnOpen = true,
  ref,
}: SearchMenuProps) {
  const isControlled = controlledQuery !== undefined;
  const [innerQuery, setInnerQuery] = useState('');
  const query = isControlled ? controlledQuery : innerQuery;
  const setQuery = useCallback((next: string) => {
    if (!isControlled) setInnerQuery(next);
    onQueryChange?.(next);
  }, [isControlled, onQueryChange]);

  const isOpenControlled = controlledOpen !== undefined;
  const [openState, setOpenState] = useState(false);
  const open = isOpenControlled ? controlledOpen : openState;
  const setOpen = useCallback((next: boolean) => {
    if (!isOpenControlled) setOpenState(next);
    onOpenChange?.(next);
  }, [isOpenControlled, onOpenChange]);
  const [expanded, setExpanded] = useState(mode === 'inline');
  const groupKeySig = useMemo(() => groups.map(g => g.key).join('\u0000'), [groups]);
  const allGroups = useMemo(() => new Set(groupKeySig ? groupKeySig.split('\u0000') : []), [groupKeySig]);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(() => (browseExpanded ? allGroups : new Set()));
  const [highlighted, setHighlightedState] = useState(0);
  /** What moved the highlight: a mouse hover must NOT scroll the panel out
   *  from under the cursor, while keyboard/programmatic moves must bring the
   *  row into view (arrowing through a long list would otherwise walk off the
   *  panel's visible area with the highlight). */
  const pointerDrivenRef = useRef(false);
  const setHighlighted = useCallback((index: number, source: 'keyboard' | 'pointer' = 'keyboard') => {
    pointerDrivenRef.current = source === 'pointer';
    setHighlightedState(index);
  }, []);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  /** Final anchor rectangle measured BEFORE the width morph starts. The
   *  positioner uses it for the first frames so the panel is already at its
   *  destination while the button is still growing into the field. */
  const pendingAnchorRectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  const anchorRectTimerRef = useRef(0);
  const currentDocument = useCurrentDocument();
  const popoutPortalTarget = usePortalTarget();
  const d = getDropdownClasses(theme);
  const itemSize = useItemSize();
  const groupSize = useMenuGroupSize();
  const iconBtn = useIconButtonSize();
  const fieldActionCount = (fieldActions?.length || 0) + (query ? 1 : 0);
  const fieldRightPad = 8 + fieldActionCount * (iconBtn.box + 2);

  const [pos, setPos] = useState({ top: 0, left: 0, maxH: 288, ready: false });
  const [anchorWidth, setAnchorWidth] = useState(0);
  useDropdownPosition({
    anchorRef: anchorRef ?? rootRef,
    panelRef,
    open,
    maxHeight: maxMenuHeight,
    anchorRectRef: pendingAnchorRectRef,
    onPosition: next => setPos({ top: next.top, left: next.left, maxH: next.maxH, ready: next.ready }),
  });
  useEffect(() => {
    const anchorEl = anchorRef?.current ?? rootRef.current;
    if (!open || !anchorEl) return;
    setAnchorWidth(anchorEl.getBoundingClientRect().width);
  }, [open, expanded, anchorRef]);
  const setPanelRef = useOverlayMorph<HTMLDivElement>({
    visible: open,
    morph,
    anchor: () => (anchorRef?.current ?? rootRef.current)?.getBoundingClientRect() ?? null,
    ref: panelRef,
    cloneOnUnmount: true,
  });

  const emptyActionLabels = (emptyActions || []).map(action =>
    typeof action.label === 'function' ? action.label(query) : action.label,
  );
  const rows = useMemo<SearchMenuRow[]>(
    () => buildSearchMenuRows({
      items,
      groups,
      query,
      browseGroups: openOnFocus || browseExpanded || expandableGroups,
      browseAll,
      expandedGroups,
      emptyActionLabels,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, groups, query, openOnFocus, browseExpanded, expandableGroups, browseAll, expandedGroups, emptyActionLabels.join('\u0000')],
  );

  const leadingRows = useMemo<Extract<SearchMenuRow, { kind: 'action' }>[]>(
    () => (leadingActions || []).map((action, actionIndex) => ({
      kind: 'action',
      label: typeof action.label === 'function' ? action.label(query) : action.label,
      actionIndex,
      source: 'leading',
    })),
    [leadingActions, query],
  );
  const footerRows = useMemo<Extract<SearchMenuRow, { kind: 'action' }>[]>(
    () => (footerActions || []).map((action, actionIndex) => ({
      kind: 'action',
      label: typeof action.label === 'function' ? action.label(query) : action.label,
      actionIndex,
      source: 'footer',
    })),
    [footerActions, query],
  );
  /** Everything the keyboard can reach: the pinned leading actions, the list
   *  rows, then the pinned footer actions. Leading actions drop out in the
   *  no-results state when `hideLeadingOnEmpty` is set. */
  const isEmptyState = rows.some(row => row.kind === 'empty');
  const showLeading = leadingRows.length > 0 && !(hideLeadingOnEmpty && isEmptyState);
  const leadingOffset = showLeading ? leadingRows.length : 0;
  const allRows = useMemo(
    () => [...(showLeading ? leadingRows : []), ...rows, ...footerRows],
    [showLeading, leadingRows, rows, footerRows],
  );

  // A category is only actionable when clicking it does something: a real
  // `onSelectGroup`, or the accordion browse state. During a query — and in
  // `browseExpanded` — group rows are plain, non-interactive headers.
  const groupsActionable = !!onSelectGroup || (expandableGroups && !query.trim());

  const navigateRows = useMemo(
    () => allRows
      .map((row, index) => ({ row, index }))
      .filter(x => {
        if (x.row.kind === 'empty') return false;
        if (x.row.kind === 'item' && x.row.hidden) return false;
        // Plain group headers (browseExpanded without expandableGroups, or any
        // category during a query) are not actionable — keep the arrows on the
        // records.
        if (x.row.kind === 'group' && !groupsActionable) return false;
        return true;
      }),
    [allRows, groupsActionable],
  );
  const browseTree = (expandableGroups || browseExpanded) && !query.trim();

  /* Multi-select (roadmap 322): a DRAFT seeded from `multiple.selectedIds`.
     The accordion still expands categories; record rows toggle. The footer
     hero is the only commit; every other close drops the draft. */
  const multipleActive = !!multiple;
  const allItemIds = useMemo(
    () => items.filter(item => item.checkable !== false).map(item => item.id),
    [items],
  );
  const visibleItemIds = useMemo(() => {
    if (!query.trim()) return allItemIds;
    return searchMenuContent(items, groups, query).hits
      .filter(hit => hit.item.checkable !== false)
      .map(hit => hit.item.id);
  }, [items, groups, query, allItemIds]);
  const visibleIdSet = useMemo(() => new Set(visibleItemIds), [visibleItemIds]);
  const selection = useSelection({
    mode: multiple?.mode ?? 'draft',
    selectedIds: multiple?.selectedIds ?? NO_SELECTION_IDS,
    itemIds: allItemIds,
    visibleIds: visibleItemIds,
    max: multiple?.max,
    disabledIds: multiple?.disabledIds,
    indicator: multiple?.indicator,
    onCommit: multiple?.onCommit,
    onDraftChange: multiple?.onDraftChange,
    onToggle: multiple?.onToggle,
  });
  const resetSelectionRef = useRef(selection.reset);
  resetSelectionRef.current = selection.reset;
  const heroLabel = typeof multiple?.commitLabel === 'function'
    ? multiple.commitLabel(selection.count)
    : multiple?.commitLabel ?? `Select ${selection.count}`;

  const close = useCallback(() => {
    setOpen(false);
    if (mode === 'expandable') {
      // The collapsed field stays mounted (it cross-fades with the button);
      // never leave the keyboard in an invisible input.
      inputRef.current?.blur();
      setExpanded(false);
      requestAnimationFrame(() => triggerRef.current?.focus());
    }
    /* A controlled-open caller (PickerField) owns the field text — never
       clear it on close. Uncontrolled surfaces keep the legacy clear. */
    if (!isOpenControlled) setQuery('');
    setHighlighted(0);
    setExpandedGroups(browseExpanded ? allGroups : new Set());
    onClose?.();
  }, [mode, onClose, setQuery, browseExpanded, allGroups, isOpenControlled, setOpen]);

  // A query collapses the browse tree; clearing it restores the browse default
  // (every group open when `browseExpanded`, otherwise all collapsed).
  useEffect(() => {
    if (query.trim() || !browseExpanded) {
      setExpandedGroups(prev => (prev.size ? new Set() : prev));
      return;
    }
    setExpandedGroups(prev => {
      if (prev.size === allGroups.size && [...allGroups].every(key => prev.has(key))) return prev;
      return allGroups;
    });
  }, [query, browseExpanded, allGroups]);

  /* Accordion: a picker that HOLDS a value opens ON it. Expand the group(s)
     holding the current selection so the reveal has a row to land on, then put
     the keyboard highlight on the current row (single). Without this an
     accordion always opened collapsed and the current value was invisible.
     Runs once per open — a later query or a manual toggle is left alone. */
  const openedOnValueRef = useRef(false);
  useEffect(() => {
    if (!open) {
      openedOnValueRef.current = false;
      return;
    }
    if (openedOnValueRef.current || !expandableGroups || query.trim()) return;
    const current = selectedId ? [selectedId] : [...(multiple?.selectedIds ?? [])];
    const wanted = new Set(current);
    const groupKeys = wanted.size
      ? groups
        .filter(group => items.some(item => item.group === group.key && wanted.has(item.id)))
        .map(group => group.key)
      : [];
    if (groupKeys.length === 0) {
      openedOnValueRef.current = true;
      return;
    }
    const expand = groupExpandMode === 'single' ? groupKeys.slice(0, 1) : groupKeys;
    if (!expand.every(key => expandedGroups.has(key))) {
      setExpandedGroups(new Set(expand));
      return;
    }
    if (highlightOnOpen && selectedId) {
      const index = allRows.findIndex(row => row.kind === 'item' && row.hit.item.id === selectedId);
      if (index >= 0) setHighlighted(index);
    }
    openedOnValueRef.current = true;
  }, [open, expandableGroups, query, groups, items, selectedId, multiple?.selectedIds, groupExpandMode, expandedGroups, allRows, highlightOnOpen, setHighlighted]);

  const toggleGroup = useCallback((key: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        if (groupExpandMode === 'single') next.clear();
        next.add(key);
      }
      return next;
    });
  }, [groupExpandMode]);

  const openPanel = useCallback(() => {
    // Already open (a click INSIDE the expanded field reaches here too): only
    // move the keyboard into the field. Re-running the open path would reset
    // the highlight to the current value under the user's pointer.
    if (open) {
      inputRef.current?.focus();
      return;
    }
    resetSelectionRef.current();
    // Preserve the button→field width morph, but give the positioner the
    // FINAL rectangle now: a throwaway width flip (no transition) measures the
    // expanded layout before paint, then the normal transition runs. The panel
    // snaps to the destination while the trigger animates; it never follows
    // the moving left edge.
    if (mode === 'expandable' && !expanded) {
      const el = rootRef.current;
      if (el) {
        const prevTransition = el.style.transition;
        const prevWidth = el.style.width;
        el.style.transition = 'none';
        el.style.width = `${expandedWidth}px`;
        const r = el.getBoundingClientRect();
        pendingAnchorRectRef.current = { left: r.left, top: r.top, width: r.width, height: r.height };
        el.style.width = prevWidth;
        void el.offsetWidth;
        el.style.transition = prevTransition;
        window.clearTimeout(anchorRectTimerRef.current);
        anchorRectTimerRef.current = window.setTimeout(() => {
          pendingAnchorRectRef.current = null;
        }, MORPH_MS + 80);
      }
    }
    setExpanded(true);
    setOpen(true);
    // A picker that holds a value starts ON it (the keyboard must not jump
    // back to the top while the panel is scrolled to the current record);
    // otherwise start on the first list row, not the pinned New action —
    // Enter on an untouched picker must never create a record by accident.
    const current = selectedId
      ? rows.findIndex(row => row.kind === 'item' && row.hit.item.id === selectedId)
      : -1;
    setHighlighted(current >= 0 ? leadingOffset + current : highlightOnOpen ? leadingOffset : -1);
  }, [open, mode, expanded, expandedWidth, leadingOffset, rows, selectedId, highlightOnOpen]);

  useEffect(() => () => {
    window.clearTimeout(anchorRectTimerRef.current);
    pendingAnchorRectRef.current = null;
  }, []);

  // Expandable: focus the field once it mounts.
  useEffect(() => {
    if (mode !== 'expandable' || !expanded || !open || !autoFocus) return;
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(raf);
  }, [mode, expanded, open, autoFocus]);

  // Outside click closes the surface.
  useEffect(() => {
    if (!open) return;
    const doc = rootRef.current?.ownerDocument ?? currentDocument;
    if (!doc) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (rootRef.current?.contains(target) || panelRef.current?.contains(target) || anchorRef?.current?.contains(target)) return;
      close();
    };
    doc.addEventListener('pointerdown', onPointerDown, true);
    return () => doc.removeEventListener('pointerdown', onPointerDown, true);
  }, [open, close, currentDocument, anchorRef]);

  const activate = useCallback((row: SearchMenuRow) => {
    if (row.kind === 'group') {
      if (onSelectGroup) {
        onSelectGroup(row.group);
        if (closeOnSelect) close();
      } else if (groupsActionable) {
        toggleGroup(row.group.key);
      }
      return;
    }
    if (row.kind === 'item') {
      if (multipleActive) {
        /* Toggle only — the panel stays open until the footer hero commits. */
        if (selection.canToggle(row.hit.item.id)) selection.toggle(row.hit.item.id);
        return;
      }
      onSelect(row.hit.item);
      if (closeOnSelect) close();
      return;
    }
    if (row.kind === 'action') {
      const actions = row.source === 'leading'
        ? leadingActions
        : row.source === 'footer'
          ? footerActions
          : emptyActions;
      const action = actions?.[row.actionIndex];
      if (action) action.onClick(query);
      if (closeOnSelect) close();
    }
  }, [close, closeOnSelect, emptyActions, footerActions, groupsActionable, leadingActions, multipleActive, onSelect, onSelectGroup, query, selection, toggleGroup]);

  const moveHighlight = (dir: 1 | -1) => {
    if (navigateRows.length === 0) return;
    const current = navigateRows.findIndex(x => x.index === highlighted);
    const next = current < 0
      ? 0
      : (current + dir + navigateRows.length) % navigateRows.length;
    setHighlighted(navigateRows[next].index);
  };

  /* External-field controls (PickerField): the panel owns the highlight, the
     caller's field owns the keyboard. */
  useImperativeHandle(ref, () => ({
    moveHighlight,
    activateHighlighted: () => {
      const row = highlighted >= 0 ? allRows[highlighted] : undefined;
      if (!row) return false;
      activate(row);
      return true;
    },
    close,
    selectAll: () => { if (multipleActive) selection.setAll(true); },
    setSelection: (ids: string[]) => { selection.reset(ids); },
  }), [allRows, highlighted, activate, close, multipleActive, selection]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (multipleActive && (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'a') {
      event.preventDefault();
      event.stopPropagation();
      selection.setAll(true);
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!open) openPanel();
      else moveHighlight(1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      moveHighlight(-1);
    } else if ((event.key === 'ArrowRight' || event.key === 'ArrowLeft')
      && expandableGroups && open && !query.trim()) {
      const row = allRows[highlighted];
      if (row?.kind === 'group') {
        const groupExpanded = expandedGroups.has(row.group.key);
        if (event.key === 'ArrowRight') {
          // Right expands; Right again (or Left) collapses.
          event.preventDefault();
          toggleGroup(row.group.key);
        } else if (groupExpanded) {
          event.preventDefault();
          toggleGroup(row.group.key);
        }
      } else if (row?.kind === 'item' && event.key === 'ArrowLeft' && row.hit.item.group) {
        // Left from a child collapses the parent and returns to its row.
        event.preventDefault();
        const groupKey = row.hit.item.group;
        if (expandedGroups.has(groupKey)) toggleGroup(groupKey);
        const groupIndex = allRows.findIndex(r => r.kind === 'group' && r.group.key === groupKey);
        if (groupIndex >= 0) setHighlighted(groupIndex);
      }
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const row = allRows[highlighted] ?? allRows[0];
      if (row) activate(row);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      close();
    }
  };

  const onChange = (next: string) => {
    if (mode === 'expandable' && !expanded) return;
    setQuery(next);
    if (!open) setOpen(true);
  };

  // Light the first RECORD when the query changes (the category row above it
  // is a jump target, not the default Enter action).
  useEffect(() => {
    const firstItem = rows.findIndex(row => row.kind === 'item');
    setHighlighted(firstItem >= 0 ? leadingOffset + firstItem : leadingOffset);
    // Only a QUERY change resets the highlight; expanding a group must keep
    // the group row lit so Right-Right can collapse it again.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  /* Controlled-open value fields: the caller opens the panel without going
     through `openPanel`, so seed the highlight here. Declared AFTER the query
     effect so a mount with `defaultOpen` honours `highlightOnOpen`. */
  useEffect(() => {
    if (!open) return;
    const current = selectedId
      ? rows.findIndex(row => row.kind === 'item' && row.hit.item.id === selectedId)
      : -1;
    setHighlighted(current >= 0 ? leadingOffset + current : highlightOnOpen ? leadingOffset : -1);
    // Only on the open edge — the query effect owns later changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  /* Re-seed the multi-select draft on EVERY open edge — a controlled caller
     (PickerField) closes with Escape (draft dropped) and reopens with the
     committed value; a stale internal selection would toggle the wrong rows.
     Layout phase so the panel never flashes the previous session's ticks. */
  useLayoutEffect(() => {
    if (!open) return;
    resetSelectionRef.current();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const fieldActionButtons = (onClear: () => void) => (
    <span className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
      {fieldActions?.map(action => (
        <button
          key={action.key}
          type="button"
          aria-label={action.label}
          title={action.label}
          tabIndex={expanded ? 0 : -1}
          onMouseDown={event => event.preventDefault()}
          onClick={() => {
            action.onClick(query, { close });
            if (!action.keepOpen) close();
          }}
          style={{ width: iconBtn.box, height: iconBtn.box }}
          className="flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700"
          data-search-field-action={action.key}
        >
          <span
            style={{ width: iconBtn.icon, height: iconBtn.icon }}
            className="flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
          >
            {action.icon}
          </span>
        </button>
      ))}
      {query && (
        <button
          type="button"
          aria-label="Clear search"
          tabIndex={expanded ? 0 : -1}
          onPointerDown={event => event.preventDefault()}
          onClick={onClear}
          style={{ width: iconBtn.box, height: iconBtn.box }}
          className="ui-icon-btn flex items-center justify-center rounded"
        >
          <X size={iconBtn.icon} />
        </button>
      )}
    </span>
  );

  const inlineInput = (
    <div className="relative w-full">
      <Search size={iconBtn.icon} className="ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      <input
        ref={inputRef}
        value={query}
        data-search-input
        role="combobox"
        aria-expanded={open}
        aria-controls="search-menu-panel"
        aria-autocomplete="list"
        onChange={e => onChange(e.target.value)}
        onFocus={() => { if (openOnFocus) openPanel(); }}
        onClick={() => { if (openOnFocus) openPanel(); }}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        style={{ paddingRight: fieldRightPad }}
        className={`${inputCls('sm')} w-full pl-8`}
      />
      {fieldActionButtons(() => { setQuery(''); if (!open) openPanel(); })}
    </div>
  );

  /* The expandable field overlays the PRIMARY button's label area, so the
     kit button (and its icon) never move during the morph. */
  const overlayInput = (
    <div className="absolute inset-0">
      <Search size={iconBtn.icon} className="ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      <input
        ref={inputRef}
        value={query}
        data-search-input
        role="combobox"
        aria-expanded={open}
        aria-controls="search-menu-panel"
        aria-autocomplete="list"
        onChange={e => onChange(e.target.value)}
        onFocus={() => { if (openOnFocus && expanded) openPanel(); }}
        onClick={() => { if (openOnFocus && expanded) openPanel(); }}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        tabIndex={expanded ? 0 : -1}
        style={{ paddingRight: fieldRightPad }}
        className={`${inputCls('sm')} h-full w-full pl-8`}
      />
      {fieldActionButtons(() => { setQuery(''); if (!open && expanded) openPanel(); })}
    </div>
  );

  /** Arrow keys walk the rows; keep the highlighted one in view (inside the
   *  panel's own scroller — never the page/modal). */
  useEffect(() => {
    if (!open || pointerDrivenRef.current) return;
    const panel = panelRef.current;
    revealRowInScroller(
      panel?.querySelector<HTMLElement>(`[data-search-row="${highlighted}"]`),
      'nearest',
      panel?.querySelector<HTMLElement>('[data-search-scroller]') ?? null,
    );
  }, [open, highlighted]);

  /** Current-value anchor: a picker that holds a value opens ON it, already
   *  scrolled, before it becomes interactive (the shared reveal contract — see
   *  `revealInScroller.ts`). Pairs with `engagedRef` on the panel: once the
   *  pointer is on it, nothing scrolls the list again. */
  const rowsRef = useRef(rows);
  rowsRef.current = rows;
  const selectedIdRef = useRef(selectedId);
  selectedIdRef.current = selectedId;
  const reveal = useRevealRowOnOpen({
    open,
    block: 'center',
    ready: pos.ready,
    scroller: () => panelRef.current?.querySelector<HTMLElement>('[data-search-scroller]') ?? null,
    row: () => {
      const id = selectedIdRef.current;
      if (!id) return null;
      const index = rowsRef.current.findIndex(row => row.kind === 'item' && row.hit.item.id === id);
      if (index < 0) return null;
      return panelRef.current?.querySelector<HTMLElement>(`[data-search-row="${index}"]`) ?? null;
    },
  });

  const renderItemRow = (row: Extract<SearchMenuRow, { kind: 'item' }>, rowIndex: number) => {
    const active = highlighted === rowIndex;
    const singleSelected = !multipleActive && selectedId !== undefined && row.hit.item.id === selectedId;
    const checked = multipleActive ? selection.isSelected(row.hit.item.id) : singleSelected;
    /* At `max`, unchecked rows are disabled (checked rows stay clickable to
       uncheck) — the shared selection contract. */
    const rowDisabled = !!row.hit.item.disabled || (multipleActive && !selection.canToggle(row.hit.item.id));
    /* Create rows wear the emerald add-new face (inline styles so the row's
       hover/highlight tokens cannot paint over them). */
    const toneStyle = row.hit.item.tone === 'create'
      ? (theme === 'light'
        ? { background: active ? '#d1fae5' : '#ecfdf5', color: active ? '#065f46' : '#047857' }
        : { background: active ? 'rgba(6, 95, 70, 0.7)' : 'rgba(6, 78, 59, 0.4)', color: active ? '#d1fae5' : '#6ee7b7' })
      : undefined;
    return (
      <button
        key={`item:${row.hit.item.id}`}
        type="button"
        role="option"
        aria-selected={checked}
        tabIndex={-1}
        data-search-item={row.hit.item.id}
        data-search-row={rowIndex}
        data-search-create={row.hit.item.tone === 'create' ? '' : undefined}
        onMouseDown={e => e.preventDefault()}
        onMouseEnter={() => setHighlighted(rowIndex, 'pointer')}
        onClick={() => activate(row)}
        style={{ ...itemSize, ...row.hit.item.rowStyle, ...toneStyle }}
        className={`w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${d.itemDefault} ${row.hit.item.rowClassName ?? ''} ${singleSelected ? 'ui-item-selected' : ''} ${active ? 'ui-item-highlighted' : ''} ${rowDisabled ? 'opacity-30 pointer-events-none' : ''}`}
      >
        {multipleActive && row.hit.item.checkable !== false && (
          <SelectionCheck checked={checked} disabled={rowDisabled} indicator={multiple?.indicator} />
        )}
        {renderItemProp ? (
          <span className="flex min-w-0 flex-1 items-center gap-2">
            {renderItemProp(row.hit.item, { checked, disabled: rowDisabled })}
          </span>
        ) : (
          <>
            {row.hit.item.icon && <span className={`${d.icon} shrink-0`}>{row.hit.item.icon}</span>}
            <span className="flex-1 truncate">{row.hit.item.label}</span>
            {(row.hit.detail || row.hit.item.detail) && (
              <span className="shrink-0 max-w-[55%] truncate text-[10px] text-zinc-400">{row.hit.detail || row.hit.item.detail}</span>
            )}
            {singleSelected && <Check className="ui-icon w-3.5 h-3.5 shrink-0" aria-hidden />}
          </>
        )}
      </button>
    );
  };

  const renderGroupRow = (row: Extract<SearchMenuRow, { kind: 'group' }>, rowIndex: number) => {
    const groupExpanded = expandedGroups.has(row.group.key);
    const showChevron = expandableGroups && !query.trim();
    const actionable = groupsActionable;
    const active = actionable && highlighted === rowIndex;
    /* Multi-select: the group's VISIBLE rows drive the select-all + x/y
       readout. Categories still expand — the check is the only new action. */
    const groupItems = multipleActive
      ? items.filter(item => item.group === row.group.key && visibleIdSet.has(item.id) && item.checkable !== false)
      : [];
    const groupSelectable = groupItems.filter(item => !selection.isDisabled(item.id)).map(item => item.id);
    const groupChecked = groupSelectable.length > 0 ? selection.groupState(groupSelectable) : 'none';
    const selectedInGroup = groupItems.reduce((n, item) => n + (selection.isSelected(item.id) ? 1 : 0), 0);
    const selectAllControl = multipleActive && (
      <button
        type="button"
        tabIndex={-1}
        aria-label={`Select all ${row.group.label}`}
        onMouseDown={e => e.preventDefault()}
        onClick={e => {
          e.stopPropagation();
          if (groupSelectable.length) selection.toggleGroup(groupSelectable);
        }}
        className={`shrink-0 flex items-center justify-center rounded ${groupSelectable.length ? 'cursor-pointer' : 'cursor-not-allowed'}`}
      >
        <SelectionCheck
          checked={groupChecked === 'all'}
          indeterminate={groupChecked === 'some'}
          disabled={groupSelectable.length === 0}
          indicator={multiple?.indicator}
        />
      </button>
    );
    const count = multipleActive
      ? (
        <span className={`shrink-0 tabular-nums text-[10px] ${actionable ? 'text-zinc-400' : 'opacity-70'}`}>
          {selectedInGroup}/{groupItems.length}
        </span>
      )
      : row.group.count !== undefined && (
        <span className={`shrink-0 tabular-nums ${actionable ? 'text-[10px] text-zinc-400' : 'opacity-70'}`}>{row.group.count}</span>
      );
    // Plain header (browseExpanded, or any category during a query): the
    // dropdown group-label face — never an item, never hoverable, never a
    // keyboard stop. Clicking it must not look like it selects anything.
    if (!actionable) {
      return (
        <div
          key={`group:${row.group.key}`}
          role="presentation"
          data-search-group={row.group.key}
          data-search-row={rowIndex}
          style={groupSize}
          className="w-full flex items-center gap-2 select-none font-semibold uppercase tracking-wider ui-label"
        >
          {selectAllControl}
          {row.group.icon && <span className={`${d.icon} shrink-0`}>{row.group.icon}</span>}
          <span className="flex-1 truncate">{row.group.label}</span>
          {count}
        </div>
      );
    }
    return (
      <div
        key={`group:${row.group.key}`}
        role="option"
        aria-selected={false}
        aria-expanded={showChevron ? groupExpanded : undefined}
        data-search-group={row.group.key}
        onMouseEnter={() => setHighlighted(rowIndex, 'pointer')}
        style={itemSize}
        className={`w-full rounded flex items-center gap-1 outline-none select-none font-medium ${d.itemDefault} ${active ? 'ui-item-highlighted' : ''}`}
      >
        {selectAllControl}
        <button
          type="button"
          tabIndex={-1}
          onMouseDown={e => e.preventDefault()}
          onClick={() => activate(row)}
          className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 text-left"
        >
          {row.group.icon && <span className={`${d.icon} shrink-0`}>{row.group.icon}</span>}
          <span className="flex-1 truncate">{row.group.label}</span>
          {count}
        </button>
        {showChevron && (
          <button
            type="button"
            tabIndex={-1}
            aria-label={`${groupExpanded ? 'Collapse' : 'Expand'} ${row.group.label}`}
            aria-expanded={groupExpanded}
            onMouseDown={e => e.preventDefault()}
            onClick={e => { e.stopPropagation(); toggleGroup(row.group.key); }}
            style={{ width: iconBtn.box, height: iconBtn.box }}
            className="shrink-0 flex cursor-pointer items-center justify-center rounded text-zinc-400 hover:text-zinc-700"
          >
            <ChevronDown
              size={iconBtn.icon}
              className={`transition-transform duration-200 ${groupExpanded ? 'rotate-180' : ''}`}
            />
          </button>
        )}
      </div>
    );
  };

  const renderActionRow = (row: Extract<SearchMenuRow, { kind: 'action' }>, rowIndex: number) => {
    const active = highlighted === rowIndex;
    const actions = row.source === 'leading'
      ? leadingActions
      : row.source === 'footer'
        ? footerActions
        : emptyActions;
    return (
      <button
        key={`${row.source || 'empty'}:${row.actionIndex}`}
        type="button"
        role="option"
        aria-selected={false}
        tabIndex={-1}
        data-search-action={row.source || 'empty'}
        data-search-row={rowIndex}
        onMouseDown={e => e.preventDefault()}
        onMouseEnter={() => setHighlighted(rowIndex, 'pointer')}
        onClick={() => activate(row)}
        style={itemSize}
        className={`w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${d.itemDefault} ${active ? 'ui-item-highlighted' : ''}`}
      >
        <span className={`${d.icon} shrink-0`}>{actions?.[row.actionIndex]?.icon || <Plus className="w-3.5 h-3.5" />}</span>
        <span className="flex-1 truncate">{row.label}</span>
      </button>
    );
  };

  const renderEmptyRow = () => (
    <div key="__empty" className="px-3 py-3 text-center" data-search-empty>
      {renderEmpty ? renderEmpty({ query, close }) : (
        <>
          <div className="mx-auto mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-400">
            <Search className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs font-medium text-zinc-500">{emptyTitle || `No matches for “${query.trim()}”`}</div>
          <div className="mt-0.5 text-[10px] text-zinc-400">{emptyHint || 'Try a name, phone number, board ID or category.'}</div>
        </>
      )}
    </div>
  );

  // Group a group row with its child rows so the body can animate as one block.
  const blocks: Array<{ group?: Extract<SearchMenuRow, { kind: 'group' }>; index?: number; items?: { row: Extract<SearchMenuRow, { kind: 'item' }>; index: number }[]; row?: SearchMenuRow }> = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (row.kind === 'group') {
      const items: { row: Extract<SearchMenuRow, { kind: 'item' }>; index: number }[] = [];
      let j = i + 1;
      while (j < rows.length && rows[j].kind === 'item' && (rows[j] as Extract<SearchMenuRow, { kind: 'item' }>).hit.item.group === row.group.key) {
        items.push({ row: rows[j] as Extract<SearchMenuRow, { kind: 'item' }>, index: j });
        j++;
      }
      blocks.push({ group: row, index: i, items });
      i = j - 1;
    } else if (row.kind === 'item') {
      blocks.push({ row, index: i });
    } else {
      blocks.push({ row, index: i });
    }
  }

  const panel = open ? createPortal(
    <div
      ref={setPanelRef}
      id="search-menu-panel"
      data-theme={theme}
      role="listbox"
      aria-label={placeholder}
      aria-multiselectable={multipleActive ? true : undefined}
      onPointerEnter={reveal.engage}
      onPointerDown={reveal.engage}
      className="ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none min-w-0 overflow-hidden"
      style={{
        position: 'fixed',
        left: pos.left,
        top: pos.top,
        width: panelWidth ?? (mode === 'expandable' ? expandedWidth : anchorWidth || undefined),
        maxHeight: pos.maxH,
        visibility: pos.ready ? 'visible' : 'hidden',
      }}
    >
      {showLeading && (
        <div className="shrink-0 pb-1">
          {leadingRows.map((row, index) => renderActionRow(row, index))}
          {rows.length > 0 && <div className={d.separator} />}
        </div>
      )}
      <div data-search-scroller className="overflow-y-auto scrollbar-custom flex flex-col min-h-0">
        {rows.length === 0 && (
          <div className="px-3 py-3 text-xs text-zinc-400" data-search-empty>
            {renderEmpty ? renderEmpty({ query, close }) : <>Type to search…</>}
          </div>
        )}
        {blocks.map(block => {
          if (block.group) {
            const groupExpanded = expandedGroups.has(block.group.group.key);
            const items = block.items || [];
            return (
              <React.Fragment key={`group:${block.group.group.key}`}>
                {renderGroupRow(block.group, leadingOffset + (block.index as number))}
                {browseTree && (
                  <div
                    data-search-group-items={block.group.group.key}
                    aria-hidden={!groupExpanded}
                    className="motion-reduce:transition-none"
                    style={{
                      display: 'grid',
                      gridTemplateRows: groupExpanded ? '1fr' : '0fr',
                      opacity: groupExpanded ? 1 : 0,
                      transition: 'grid-template-rows 220ms cubic-bezier(0.32, 0.72, 0, 1), opacity 150ms ease',
                    }}
                  >
                    <div className="overflow-hidden flex flex-col">
                      {items.map(item => renderItemRow(item.row, leadingOffset + item.index))}
                    </div>
                  </div>
                )}
                {!browseTree && items.map(item => renderItemRow(item.row, leadingOffset + item.index))}
              </React.Fragment>
            );
          }
          const row = block.row as SearchMenuRow;
          const rowIndex = leadingOffset + (block.index as number);
          if (row.kind === 'empty') return renderEmptyRow();
          if (row.kind === 'action') return renderActionRow(row, rowIndex);
          if (row.kind === 'item') return renderItemRow(row, rowIndex);
          return null;
        })}
      </div>
      {footerRows.length > 0 && (
        <div className="shrink-0">
          <div className={d.separator} />
          {footerRows.map((row, index) => renderActionRow(row, leadingOffset + rows.length + index))}
        </div>
      )}
      {multipleActive && multiple?.footer !== false && (
        <SelectionFooter
          count={selection.count}
          max={multiple?.max}
          hiddenCount={multiple?.hiddenNote === false ? 0 : selection.hiddenCount}
          clear={multiple?.clear !== false}
          theme={theme}
          onClear={selection.clear}
          hero={multiple?.mode === 'live' ? undefined : {
            label: heroLabel,
            onClick: () => { selection.commit(); close(); },
            disabled: selection.count === 0,
          }}
        />
      )}
    </div>,
    portalTargetProp ?? popoutPortalTarget ?? currentDocument?.body ?? document.body,
  ) : null;

  if (hideTrigger) {
    return (
      <>
        <div ref={rootRef} data-search-menu data-mode="hidden" className="hidden" aria-hidden />
        {panel}
      </>
    );
  }

  if (mode === 'inline') {
    return (
      <div ref={rootRef} data-search-menu data-mode={mode} className="relative inline-flex" style={{ width: '100%' }}>
        {inlineInput}
        {panel}
      </div>
    );
  }

  return (
    <MorphFieldShell
      expanded={expanded}
      collapsedWidth={collapsedWidth}
      expandedWidth={expandedWidth}
      rootRef={rootRef}
      data-search-menu
      data-mode={mode}
      trigger={renderTrigger ? renderTrigger({ open, expanded, toggle: openPanel }) : (
        <Button
          ref={triggerRef}
          type="button"
          variant="primary"
          size="minimal"
          theme={theme === 'dark' ? 'dark' : 'light'}
          icon={triggerIcon ?? <Search className="w-3.5 h-3.5" />}
          onClick={openPanel}
          className={`w-full justify-start ${expanded ? 'pointer-events-none' : ''}`}
          tabIndex={expanded ? -1 : 0}
          data-search-trigger
        >
          <span>{triggerLabel}</span>
        </Button>
      )}
      field={<>{overlayInput}{panel}</>}
    />
  );
}

export default SearchMenu;
