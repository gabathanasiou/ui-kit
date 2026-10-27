import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, ChevronDown, Plus, Search, X } from 'lucide-react';
import { getDropdownClasses, useItemSize, useMenuGroupSize, type DropdownTheme } from './DropdownMenu';
import { useDropdownPosition } from './useDropdownPosition';
import { useCurrentDocument, usePortalTarget } from './popout';
import { useOverlayMorph, MORPH_MS } from './overlayMorph';
import { inputCls } from './input';
import Button from './Button';
import {
  buildSearchMenuRows,
  type SearchMenuGroup,
  type SearchMenuItem,
  type SearchMenuRow,
} from './searchMenuModel';

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
}: SearchMenuProps) {
  const isControlled = controlledQuery !== undefined;
  const [innerQuery, setInnerQuery] = useState('');
  const query = isControlled ? controlledQuery : innerQuery;
  const setQuery = useCallback((next: string) => {
    if (!isControlled) setInnerQuery(next);
    onQueryChange?.(next);
  }, [isControlled, onQueryChange]);

  const [open, setOpen] = useState(false);
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
  const currentDocument = useCurrentDocument();
  const portalTarget = usePortalTarget();
  const d = getDropdownClasses(theme);
  const itemSize = useItemSize();
  const groupSize = useMenuGroupSize();

  const [pos, setPos] = useState({ top: 0, left: 0, maxH: 288, ready: false });
  const [anchorWidth, setAnchorWidth] = useState(0);
  useDropdownPosition({
    anchorRef: rootRef,
    panelRef,
    open,
    maxHeight: maxMenuHeight,
    onPosition: next => setPos({ top: next.top, left: next.left, maxH: next.maxH, ready: next.ready }),
  });
  useEffect(() => {
    if (!open || !rootRef.current) return;
    setAnchorWidth(rootRef.current.getBoundingClientRect().width);
  }, [open, expanded]);
  const setPanelRef = useOverlayMorph<HTMLDivElement>({
    visible: open,
    morph,
    anchor: () => rootRef.current?.getBoundingClientRect() ?? null,
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
      browseGroups: openOnFocus || browseExpanded,
      browseAll,
      expandedGroups,
      emptyActionLabels,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, groups, query, openOnFocus, browseExpanded, browseAll, expandedGroups, emptyActionLabels.join('\u0000')],
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

  const close = useCallback(() => {
    setOpen(false);
    if (mode === 'expandable') {
      // The collapsed field stays mounted (it cross-fades with the button);
      // never leave the keyboard in an invisible input.
      inputRef.current?.blur();
      setExpanded(false);
      requestAnimationFrame(() => triggerRef.current?.focus());
    }
    setQuery('');
    setHighlighted(0);
    setExpandedGroups(browseExpanded ? allGroups : new Set());
    onClose?.();
  }, [mode, onClose, setQuery, browseExpanded, allGroups]);

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
    setExpanded(true);
    setOpen(true);
    // Start on the first list row, not the pinned New action — Enter on an
    // untouched picker must never create a record by accident.
    setHighlighted(leadingOffset);
  }, [leadingOffset]);

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
      if (rootRef.current?.contains(target) || panelRef.current?.contains(target)) return;
      close();
    };
    doc.addEventListener('pointerdown', onPointerDown, true);
    return () => doc.removeEventListener('pointerdown', onPointerDown, true);
  }, [open, close, currentDocument]);

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
  }, [close, closeOnSelect, emptyActions, footerActions, groupsActionable, leadingActions, onSelect, onSelectGroup, query, toggleGroup]);

  const moveHighlight = (dir: 1 | -1) => {
    if (navigateRows.length === 0) return;
    const current = navigateRows.findIndex(x => x.index === highlighted);
    const next = current < 0
      ? 0
      : (current + dir + navigateRows.length) % navigateRows.length;
    setHighlighted(navigateRows[next].index);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
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

  const inlineInput = (
    <div className="relative w-full">
      <Search className="w-3.5 h-3.5 ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
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
        className={`${inputCls('sm')} w-full pl-8 pr-7`}
      />
      {query && (
        <button
          type="button"
          aria-label="Clear search"
          className="ui-icon-btn absolute right-1 top-1/2 -translate-y-1/2 rounded p-0.5"
          onPointerDown={e => e.preventDefault()}
          onClick={() => { setQuery(''); if (!open) openPanel(); }}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );

  /* The expandable field overlays the PRIMARY button's label area, so the
     kit button (and its icon) never move during the morph. */
  const overlayInput = (
    <div className="absolute inset-0">
      <Search className="w-3.5 h-3.5 ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
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
        className={`${inputCls('sm')} h-full w-full pl-8 pr-7`}
      />
      {query && (
        <button
          type="button"
          aria-label="Clear search"
          className="ui-icon-btn absolute right-1 top-1/2 -translate-y-1/2 rounded p-0.5"
          onPointerDown={e => e.preventDefault()}
          onClick={() => { setQuery(''); if (!open && expanded) openPanel(); }}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );

  /** Arrow keys walk the rows; keep the highlighted one in view. */
  useEffect(() => {
    if (!open || pointerDrivenRef.current) return;
    const el = panelRef.current?.querySelector<HTMLElement>(`[data-search-row="${highlighted}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [open, highlighted]);

  /** Current-value anchor: opening a picker lands on the value it holds
   *  (a long catalogue would otherwise start at the top and hide it). */
  useEffect(() => {
    if (!open || !selectedId) return;
    const raf = requestAnimationFrame(() => {
      const el = Array.from(panelRef.current?.querySelectorAll<HTMLElement>('[data-search-item]') ?? [])
        .find(node => node.getAttribute('data-search-item') === selectedId);
      el?.scrollIntoView({ block: 'center' });
    });
    return () => cancelAnimationFrame(raf);
  }, [open, selectedId]);

  const renderItemRow = (row: Extract<SearchMenuRow, { kind: 'item' }>, rowIndex: number) => {
    const active = highlighted === rowIndex;
    const selected = selectedId !== undefined && row.hit.item.id === selectedId;
    return (
      <button
        key={`item:${row.hit.item.id}`}
        type="button"
        role="option"
        aria-selected={selected}
        tabIndex={-1}
        data-search-item={row.hit.item.id}
        data-search-row={rowIndex}
        onMouseEnter={() => setHighlighted(rowIndex, 'pointer')}
        onClick={() => activate(row)}
        style={itemSize}
        className={`w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${d.itemDefault} ${selected ? 'ui-item-selected' : ''} ${active ? 'ui-item-highlighted' : ''} ${row.hit.item.disabled ? 'opacity-30 pointer-events-none' : ''}`}
      >
        {row.hit.item.icon && <span className={`${d.icon} shrink-0`}>{row.hit.item.icon}</span>}
        <span className="flex-1 truncate">{row.hit.item.label}</span>
        {(row.hit.detail || row.hit.item.detail) && (
          <span className="shrink-0 max-w-[55%] truncate text-[10px] text-zinc-400">{row.hit.detail || row.hit.item.detail}</span>
        )}
        {selected && <Check className="ui-icon w-3.5 h-3.5 shrink-0" aria-hidden />}
      </button>
    );
  };

  const renderGroupRow = (row: Extract<SearchMenuRow, { kind: 'group' }>, rowIndex: number) => {
    const groupExpanded = expandedGroups.has(row.group.key);
    const showChevron = expandableGroups && !query.trim();
    const actionable = groupsActionable;
    const active = actionable && highlighted === rowIndex;
    const count = row.group.count !== undefined && (
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
        <button
          type="button"
          tabIndex={-1}
          onMouseDown={e => e.preventDefault()}
          onClick={() => activate(row)}
          className="flex min-w-0 flex-1 items-center gap-2 text-left"
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
            className="shrink-0 rounded p-0.5 text-zinc-400 hover:text-zinc-700"
          >
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${groupExpanded ? 'rotate-180' : ''}`} />
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
      <div className="overflow-y-auto scrollbar-custom flex flex-col min-h-0">
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
    </div>,
    portalTarget ?? currentDocument?.body ?? document.body,
  ) : null;

  return (
    <div
      ref={rootRef}
      data-search-menu
      data-mode={mode}
      className="relative inline-flex"
      style={mode === 'inline'
        ? { width: '100%' }
        : { width: expanded ? expandedWidth : collapsedWidth, transition: `width ${MORPH_MS}ms cubic-bezier(0.32, 0.72, 0, 1)` }}
    >
      {mode === 'inline' ? inlineInput : (
        <>
          <div
            className={`w-full origin-left ${expanded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            style={{
              transform: expanded ? 'scaleX(0.98)' : 'scaleX(1)',
              transition: 'opacity 150ms ease, transform 220ms cubic-bezier(0.32, 0.72, 0, 1)',
            }}
          >
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
          </div>
          <div
            className={`absolute inset-0 origin-left ${expanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            aria-hidden={!expanded}
            style={{
              transform: expanded ? 'scaleX(1)' : 'scaleX(0.96)',
              transition: 'opacity 150ms ease, transform 220ms cubic-bezier(0.32, 0.72, 0, 1)',
            }}
          >
            {overlayInput}
          </div>
        </>
      )}
      {panel}
    </div>
  );
}

export default SearchMenu;
