import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Anchor, ChevronDown, Plus } from 'lucide-react';
import SearchMenu, { type SearchMenuHandle } from './SearchMenu';
import type { SearchMenuGroup, SearchMenuItem } from './searchMenuModel';
import { orderByCatalogue, sameSelection } from './selection';
import {
  formatPickerValues,
  hasPickerMatch,
  lastPickerSegment,
  pickerCommittedKeys,
  pickerItemKey,
  pickerItemLabel,
  resolvePickerSegment,
  resolvePickerText,
  unknownPickerValues,
  type PickerDisplay,
  type PickerItem,
  type PickerResolveBy,
} from './pickerModel';
import type { DropdownTheme } from './DropdownMenu';
import { useKitTheme } from './ThemeScope';
import { coarsePx, useCoarseScale } from './device';
import MorphFieldShell from './MorphFieldShell';
import Button from './Button';
import { inputCls } from './input';

/**
 * PickerField — the kit's ONE value picker (roadmap 322, phase 5).
 *
 * A field that stores an array of keys and edits it against a catalogue:
 *  - `appearance="inline" | "wrap"` — the cell editor (thin, transparent);
 *  - `appearance="chip"`            — the bordered form-field trigger;
 *  - `appearance="morph"`           — a button that morphs into the field.
 *
 * The PANEL is the shared `SearchMenu` catalogue (no second implementation):
 * groups, deep search, create-from-typed (leading action), custom rows and
 * multiple selection all come from it. This component owns only the value
 * layer: the field text, comma-segment query, key↔label resolution, commit on
 * close, and the trigger display presets.
 *
 * In multiple mode the field runs the SearchMenu `live` selection: clicks
 * toggle, the field text mirrors the draft, and the VALUE commits on close
 * (blur / outside / Tab) — only when it actually changed. Escape cancels.
 */

export type PickerAppearance = 'inline' | 'chip' | 'wrap' | 'morph';

export interface PickerTriggerContext {
  values: string[];
  items: PickerItem[];
  display: string;
  open: boolean;
  toggle: () => void;
}

export interface PickerFieldProps {
  /** Committed keys (ids by default, labels with `resolveBy="label"`). */
  values: string[];
  /** One call on commit, only when the value changed. */
  onChange: (values: string[]) => void;
  items: PickerItem[];
  groups?: SearchMenuGroup[];
  resolveBy?: PickerResolveBy;
  mode?: 'single' | 'multiple';
  appearance?: PickerAppearance;
  /** Closed-trigger face. `chips` renders the values as chips. */
  display?: PickerDisplay;
  /** Arbitrary closed-trigger text (wins over the presets). */
  formatDisplay?: (values: string[], items: PickerItem[]) => string;
  /** Chip/morph closed trigger (the editable field is still the input). */
  renderTrigger?: (ctx: PickerTriggerContext) => React.ReactNode;
  /** Custom row content; the row chrome + selection check stay. */
  renderItem?: (item: PickerItem, checked: boolean) => React.ReactNode;
  badge?: (item: PickerItem) => string | null;
  trailing?: (item: PickerItem) => React.ReactNode;
  /** Element-link anchors (item-key space; labels case-insensitive). */
  anchoredKeys?: ReadonlySet<string>;
  anchoredLabel?: string;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  /** Open on mount (cell editors). */
  defaultOpen?: boolean;
  /** Single mode: select the current text on open so typing replaces it. */
  selectAllOnOpen?: boolean;
  uppercase?: boolean;
  /** Dropdown palette (defaults to the ambient kit mode). */
  theme?: DropdownTheme;
  className?: string;
  style?: React.CSSProperties;
  panelWidth?: number | string;
  maxMenuHeight?: number;
  collapsedWidth?: number;
  expandedWidth?: number;
  /** Create-from-typed: label for the leading action + the hand-off. */
  createLabel?: (typed: string) => string;
  onCreateItem?: (value: string) => void;
  onExit?: () => void;
  onEscape?: () => void;
  /** Tab hand-off (Glide's onFinishedEditing). */
  onTabExit?: (el?: HTMLElement) => void;
  /** Async source (replaces AsyncResultsDropdown): debounced on the query. */
  loadItems?: (query: string) => Promise<PickerItem[]>;
  sortItems?: (items: PickerItem[], values: string[]) => PickerItem[];
  max?: number;
  disabledIds?: readonly string[];
  indicator?: 'box' | 'check';
  /** Grouped catalogue behaviour (default: plain headers). */
  browse?: 'open' | 'accordion';
}

const NO_COMMIT = () => {};

export function PickerField({
  values,
  onChange,
  items,
  groups = [],
  resolveBy = 'id',
  mode = 'multiple',
  appearance = 'inline',
  display = 'names',
  formatDisplay,
  renderTrigger,
  renderItem,
  badge,
  trailing,
  anchoredKeys,
  anchoredLabel = 'Element link anchor',
  placeholder = 'Select…',
  readOnly = false,
  disabled = false,
  autoFocus = false,
  defaultOpen = false,
  selectAllOnOpen = true,
  uppercase = false,
  theme: themeProp,
  className = '',
  style,
  panelWidth,
  maxMenuHeight,
  collapsedWidth = 140,
  expandedWidth = 280,
  createLabel,
  onCreateItem,
  onExit,
  onEscape,
  onTabExit,
  loadItems,
  sortItems,
  max,
  disabledIds,
  indicator,
  browse,
}: PickerFieldProps) {
  const kit = useKitTheme();
  const theme: DropdownTheme = themeProp ?? kit?.mode ?? 'light';
  const scale = useCoarseScale();
  const keyOf = useCallback((item: PickerItem) => pickerItemKey(item, resolveBy), [resolveBy]);
  const itemKeys = useMemo(() => items.map(keyOf), [items, keyOf]);
  const itemByKey = useMemo(() => new Map(items.map(item => [keyOf(item), item])), [items, keyOf]);
  const labelOf = useCallback((value: string) => pickerItemLabel(value, items, resolveBy), [items, resolveBy]);
  const anchoredLower = useMemo(() => new Set([...(anchoredKeys ?? [])].map(k => k.toLowerCase())), [anchoredKeys]);

  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [draft, setDraft] = useState<string[]>(() => [...values]);
  const [asyncItems, setAsyncItems] = useState<PickerItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const morphFieldRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<SearchMenuHandle>(null);
  const lastCommittedRef = useRef(values.join('\u0000'));
  const cancelledRef = useRef(false);
  const caretEndRef = useRef(false);
  const asyncSeq = useRef(0);
  /* Synchronous mirrors — a row toggle and the following Tab/Enter can land
     in the SAME browser task, before React's re-render. Commit reads these, so
     it never sees a stale field text. */
  const textRef = useRef('');
  const draftRef = useRef<string[]>([...values]);
  const valuesKey = values.join('\u0000');

  const displayText = useMemo(
    () => formatPickerValues(values, items, resolveBy, display, formatDisplay),
    [values, items, resolveBy, display, formatDisplay],
  );
  const editingText = useCallback((next: readonly string[]) => {
    if (mode === 'single') return next[0] ? labelOf(next[0]) : '';
    return next.length ? `${next.map(labelOf).join(', ')}, ` : '';
  }, [mode, labelOf]);

  /** Keep the closed field in sync with the committed value. */
  useEffect(() => {
    if (open) return;
    setDraft([...values]);
    draftRef.current = [...values];
    lastCommittedRef.current = valuesKey;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valuesKey, open]);

  const openPicker = useCallback(() => {
    if (open || readOnly || disabled) return;
    cancelledRef.current = false;
    const nextText = editingText(values);
    textRef.current = nextText;
    draftRef.current = [...values];
    setDraft([...values]);
    setText(nextText);
    setOpen(true);
  }, [open, readOnly, disabled, values, editingText]);

  /* Focus + caret on the open edge; after a toggle, keep the caret at the end
     so typing appends the next segment. */
  useLayoutEffect(() => {
    if (!open) return;
    const el = inputRef.current;
    if (!el) return;
    el.focus();
    if (mode === 'single' && selectAllOnOpen) {
      el.setSelectionRange(0, el.value.length);
    } else {
      el.setSelectionRange(el.value.length, el.value.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  useLayoutEffect(() => {
    if (!caretEndRef.current) return;
    caretEndRef.current = false;
    const el = inputRef.current;
    if (!el) return;
    el.focus();
    el.setSelectionRange(el.value.length, el.value.length);
  }, [text]);

  useEffect(() => {
    if (defaultOpen || autoFocus) openPicker();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchQuery = mode === 'single' ? text.trim() : lastPickerSegment(text);
  const baseItems = loadItems ? (asyncItems ?? []) : items;
  const orderedBase = useMemo(
    () => (sortItems ? sortItems(baseItems, draft) : baseItems),
    [baseItems, sortItems, draft],
  );
  const createSegment = searchQuery.trim();
  const showCreate = !!onCreateItem && !loading && !!createSegment && !hasPickerMatch(createSegment, baseItems, resolveBy);

  /* Async source: debounce 400ms + sequence guard. */
  useEffect(() => {
    if (!loadItems || !open) return;
    const query = searchQuery.trim();
    if (!query) {
      setAsyncItems(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const seq = ++asyncSeq.current;
    const timer = setTimeout(() => {
      loadItems(query)
        .then(result => {
          if (asyncSeq.current !== seq) return;
          setAsyncItems(result);
          setLoading(false);
        })
        .catch(() => {
          if (asyncSeq.current !== seq) return;
          setAsyncItems([]);
          setLoading(false);
        });
    }, 400);
    return () => clearTimeout(timer);
  }, [loadItems, open, searchQuery]);

  const panelItems = useMemo<SearchMenuItem[]>(() => {
    const list: SearchMenuItem[] = orderedBase.map(item => ({
      id: keyOf(item),
      label: item.label,
      group: item.group,
      detail: item.detail,
      icon: item.icon,
      disabled: !!item.disabled || !!disabledIds?.includes(keyOf(item)),
      fields: item.fields,
      keywords: item.keywords,
    }));
    if (showCreate) {
      /* The create affordance is a REAL row so it toggles through the same
         selection model (counts, Escape, max, group select-all all agree). */
      list.unshift({
        id: createSegment,
        label: createLabel ? createLabel(createSegment) : `Add “${createSegment}”…`,
        keywords: createSegment,
      });
    }
    return list;
  }, [orderedBase, keyOf, disabledIds, showCreate, createSegment, createLabel]);

  const commitValues = useCallback((next: string[]) => {
    const sig = next.join('\u0000');
    if (sig === lastCommittedRef.current) return;
    if (sameSelection(next, values)) {
      lastCommittedRef.current = sig;
      return;
    }
    lastCommittedRef.current = sig;
    onChange(next);
    for (const value of unknownPickerValues(next, items, resolveBy)) onCreateItem?.(value);
  }, [values, onChange, onCreateItem, items, resolveBy]);

  const commit = useCallback(() => {
    if (readOnly || disabled) return;
    if (cancelledRef.current) {
      cancelledRef.current = false;
      return;
    }
    const currentText = textRef.current;
    const next = mode === 'single'
      ? (() => {
          const segment = currentText.trim();
          return segment ? [resolvePickerSegment(segment, items, resolveBy)] : [];
        })()
      : orderByCatalogue(resolvePickerText(currentText, items, resolveBy), itemKeys);
    draftRef.current = next;
    setDraft(next);
    setOpen(false);
    commitValues(next);
    onExit?.();
  }, [readOnly, disabled, mode, items, resolveBy, itemKeys, commitValues, onExit]);

  const cancel = useCallback(() => {
    cancelledRef.current = true;
    const nextText = editingText(values);
    textRef.current = nextText;
    draftRef.current = [...values];
    setDraft([...values]);
    setText(nextText);
    setOpen(false);
    onEscape?.();
  }, [values, editingText, onEscape]);

  const onDraftChange = useCallback((keys: string[]) => {
    /* Keep the field text in catalogue order (unknown/create values last) so
       editing and the committed value read the same. */
    const ordered = orderByCatalogue(keys, itemKeys);
    const nextText = ordered.length ? `${ordered.map(labelOf).join(', ')}, ` : '';
    draftRef.current = ordered;
    textRef.current = nextText;
    setDraft(ordered);
    caretEndRef.current = true;
    setText(nextText);
  }, [itemKeys, labelOf]);

  const onSelect = useCallback((item: SearchMenuItem) => {
    const key = item.id;
    const nextText = labelOf(key);
    draftRef.current = [key];
    textRef.current = nextText;
    setDraft([key]);
    setText(nextText);
    setOpen(false);
    commitValues([key]);
    onExit?.();
  }, [labelOf, commitValues, onExit]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      cancel();
      return;
    }
    if (event.key === 'Tab') {
      event.preventDefault();
      if (open) commit();
      (onTabExit ?? onExit)?.(inputRef.current ?? undefined);
      return;
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!open) {
        openPicker();
        return;
      }
      searchRef.current?.moveHighlight(event.key === 'ArrowDown' ? 1 : -1);
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      if (open && searchRef.current?.activateHighlighted()) return;
      commit();
      return;
    }
    if (mode === 'multiple' && open && (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'a') {
      event.preventDefault();
      searchRef.current?.selectAll();
    }
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = uppercase ? event.target.value.toUpperCase() : event.target.value;
    textRef.current = next;
    setText(next);
    if (!open) setOpen(true);
    if (mode === 'multiple') {
      /* EntityDropdown parity: the text IS the value, so deleting a segment
         unchecks its row LIVE (and a later toggle can't resurrect it). The
         live query (last segment without a trailing comma) is not a value. */
      const committed = orderByCatalogue(pickerCommittedKeys(next, items, resolveBy), itemKeys);
      draftRef.current = committed;
      setDraft(committed);
      searchRef.current?.setSelection(committed);
    }
  };

  const onInputBlur = () => {
    if (!open) return;
    if (cancelledRef.current) {
      cancelledRef.current = false;
      return;
    }
    commit();
  };

  const renderRow = useCallback((item: SearchMenuItem, state: { checked: boolean; disabled: boolean }) => {
    const original = itemByKey.get(item.id);
    if (!original) {
      /* Synthetic create row (the typed value the catalogue does not know). */
      return (
        <>
          <Plus className="h-3.5 w-3.5 shrink-0" />
          <span className="flex-1 truncate">{item.label}</span>
        </>
      );
    }
    const anchored = !!anchoredKeys && (resolveBy === 'label'
      ? anchoredLower.has(original.label.toLowerCase())
      : anchoredKeys.has(keyOf(original)));
    const rowBadge = badge?.(original) ?? original.badge ?? null;
    return (
      <>
        {renderItem ? renderItem(original, state.checked) : (
          <>
            {original.icon && <span className="shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5">{original.icon}</span>}
            <span className="flex-1 truncate">{original.label}</span>
            {rowBadge && <span className="shrink-0 text-[10px] text-[color:var(--ui-text-faint)]">{rowBadge}</span>}
            {trailing?.(original)}
          </>
        )}
        {anchored && (
          <span className="shrink-0 inline-flex" title={anchoredLabel} aria-label={anchoredLabel}>
            <Anchor className="h-3.5 w-3.5 text-amber-500" />
          </span>
        )}
      </>
    );
  }, [itemByKey, anchoredKeys, anchoredLower, resolveBy, keyOf, badge, renderItem, trailing, anchoredLabel]);

  const panel = (
    <SearchMenu
      ref={searchRef}
      mode="inline"
      hideTrigger
      open={open}
      onOpenChange={setOpen}
      anchorRef={appearance === 'morph' ? morphFieldRef : rootRef}
      items={panelItems}
      groups={groups}
      query={searchQuery}
      onSelect={onSelect}
      closeOnSelect={mode === 'single'}
      selectedId={mode === 'single' ? draft[0] : undefined}
      multiple={mode === 'multiple' ? {
        selectedIds: draft,
        mode: 'live',
        onDraftChange,
        onCommit: NO_COMMIT,
        max,
        disabledIds,
        indicator,
      } : undefined}
      openOnFocus={false}
      autoFocus={false}
      highlightOnOpen={mode === 'single'}
      browseAll={groups.length === 0}
      browseExpanded={groups.length > 0 && (browse ?? 'open') === 'open'}
      expandableGroups={groups.length > 0 && browse === 'accordion'}
      groupExpandMode="single"
      renderItem={renderRow}
      emptyTitle={loading ? 'Searching…' : undefined}
      emptyHint={loading ? 'Fetching matching records.' : undefined}
      theme={theme}
      panelWidth={panelWidth}
      maxMenuHeight={maxMenuHeight}
    />
  );

  if (readOnly) {
    return <span className={className} style={style}>{displayText || '?'}</span>;
  }

  const empty = !open && !displayText;
  const overlayText = open ? text : displayText;
  const inputProps = {
    ref: inputRef as React.Ref<HTMLInputElement & HTMLTextAreaElement>,
    value: open ? text : displayText,
    disabled,
    readOnly,
    placeholder: '',
    onFocus: openPicker,
    onClick: openPicker,
    onChange: onInputChange,
    onBlur: onInputBlur,
    onKeyDown,
    autoComplete: 'off',
    spellCheck: false,
  };

  if (appearance === 'morph') {
    return (
      <MorphFieldShell
        expanded={open}
        collapsedWidth={collapsedWidth}
        expandedWidth={expandedWidth}
        rootRef={rootRef}
        className={className}
        style={style}
        trigger={renderTrigger
          ? renderTrigger({ values: [...values], items, display: displayText, open, toggle: openPicker })
          : (
            <Button
              size="minimal"
              variant="primary"
              theme={theme === 'dark' ? 'dark' : 'light'}
              onClick={openPicker}
              disabled={disabled}
              className={`w-full justify-start ${empty ? 'text-current/70' : ''}`}
            >
              {displayText || placeholder}
            </Button>
          )}
        field={(
          <div ref={morphFieldRef} className="relative h-full">
            <input
              {...inputProps}
              className={`${inputCls('sm')} h-full w-full`}
            />
            {panel}
          </div>
        )}
      />
    );
  }

  const chip = appearance === 'chip';
  const wrap = appearance === 'wrap';
  const padY = chip ? coarsePx(5, 7, scale) : 0;
  const padX = chip ? coarsePx(9, 12, scale) : 0;
  const chipFont = coarsePx(12, 14, scale);

  return (
    <div
      ref={rootRef}
      data-picker-field
      className={`relative ${chip
        ? 'flex w-full items-center gap-1.5 rounded border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left outline-none focus-within:border-[color:var(--ui-input-focus-border)]'
        : (wrap ? 'min-h-[1lh] w-full pb-[1lh]' : 'h-[1lh] w-full')} ${className}`}
      style={chip
        ? { padding: `${padY}px ${padX}px`, fontSize: chipFont, ...style }
        : style}
      onMouseDown={e => e.stopPropagation()}
      onContextMenu={e => { e.preventDefault(); e.stopPropagation(); }}
      onAuxClick={openPicker}
    >
      {chip && renderTrigger ? (
        <span className="pointer-events-none flex min-w-0 flex-1 items-center">
          {renderTrigger({ values: [...values], items, display: displayText, open, toggle: openPicker })}
        </span>
      ) : display === 'chips' && !open ? (
        <span className="flex min-w-0 flex-1 flex-wrap items-center gap-1">
          {values.map(value => (
            <span
              key={value}
              className="inline-flex items-center rounded border border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-1.5 py-0.5 text-[10px] text-[color:var(--ui-text)]"
            >
              {labelOf(value)}
            </span>
          ))}
          {values.length === 0 && <span className="italic text-[color:var(--ui-text-muted)]">{placeholder}</span>}
        </span>
      ) : (
        <span
          className={`pointer-events-none text-left ${chip ? 'min-w-0 flex-1 truncate' : (wrap
            ? 'block whitespace-pre-wrap break-words leading-relaxed'
            : 'absolute inset-y-0 inset-x-0 flex items-center truncate whitespace-nowrap')} ${empty ? 'italic text-[color:var(--ui-text-muted)]' : ''}`}
        >
          {overlayText || placeholder}
        </span>
      )}
      {wrap ? (
        <textarea
          {...inputProps}
          rows={1}
          className="absolute inset-0 h-full w-full resize-none overflow-hidden whitespace-pre-wrap break-words bg-transparent text-transparent outline-none"
          style={{ caretColor: '#2563eb', color: 'transparent' }}
        />
      ) : (
        <input
          {...inputProps}
          className={chip
            ? 'absolute inset-0 h-full w-full bg-transparent text-transparent outline-none'
            : 'absolute inset-0 h-full w-full bg-transparent text-transparent outline-none'}
          style={chip
            ? { caretColor: '#2563eb', color: 'transparent', paddingLeft: padX, paddingRight: padX + 16 }
            : { caretColor: '#2563eb', color: 'transparent' }}
        />
      )}
      {chip && (
        <ChevronDown className="pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" />
      )}
      {panel}
    </div>
  );
}

export default PickerField;
