"use client";
import React, { createContext, useContext, useCallback, useState, useRef, useEffect, useLayoutEffect, useMemo } from 'react';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { Pencil, Copy, Trash2, Plus, Check, X, RotateCcw, Search } from 'lucide-react';
import { usePortalTarget, useCurrentDocument } from './popout';
import { IS_COARSE, getCoarseScale, useCoarseScale, coarsePx } from './device';
import { useOverlayMorph } from './overlayMorph';
import { useFixedPosition } from './useSmartPosition';
import { registerOverlayClose } from './overlayRegistry';

export type DropdownTheme = 'light' | 'dark' | 'blue';

export const DropdownThemeContext = createContext<DropdownTheme>('dark');
export const useDropdownTheme = () => useContext(DropdownThemeContext);

/** Shared row sizing for menu items AND item-manager rows (padding + font +
 *  line-height, coarse-scaled) — ONE knob to resize every dropdown row
 *  globally. Consumers spread it as an inline style. */
export function useItemSize() {
  const scale = useCoarseScale();
  return {
    padding: `${coarsePx(8, 12, scale)}px ${coarsePx(12, 16, scale)}px`,
    fontSize: `${coarsePx(12, 14, scale)}px`,
    lineHeight: `${coarsePx(18, 22, scale)}px`,
  };
}

// ── Single source of truth for all dropdown styling ──
// Colors/interactions come from tokens.css (.ui-*) via [data-theme]; only
// layout/size utilities are inlined. Coarse sizing is gated on the global
// coarseScale knob (getCoarseScale() > 0) read AT CALL TIME — callers render
// through useCoarse() so a scale change re-renders and re-derives these.

const ITEM_PAD = (coarse: boolean) => (coarse ? 'px-4 py-3 text-sm' : 'px-3 py-2 text-xs');
const HEADER_PAD = (coarse: boolean) => (coarse ? 'px-3 pt-3 pb-2' : 'px-3 pt-2 pb-1');
const HEADER_TEXT = (coarse: boolean) => (coarse ? 'text-xs' : 'text-[10px]');

export function getDropdownClasses(theme?: DropdownTheme) {
  const coarse = IS_COARSE && getCoarseScale() > 0;
  return {
    // Item text & hover
    itemDefault: 'ui-item',
    itemDanger: 'ui-item ui-item-danger',

    // Icon
    icon: 'ui-icon',

    // Right-action button
    rightAction: 'ui-icon-btn',

    // Separator
    separator: 'ui-sep my-1',

    // Header
    headerPad: HEADER_PAD(coarse),
    headerText: `${HEADER_PAD(coarse)} font-semibold uppercase tracking-wider ${HEADER_TEXT(coarse)} ui-label`,

    // Item padding
    itemPad: ITEM_PAD(coarse),

    // Input
    input: coarse
      ? 'px-3 py-2 text-sm ui-input'
      : 'px-1.5 py-0.5 text-xs ui-input',

    // Item manager row
    rowHoverBg: 'ui-row',
    rowActiveBg: 'ui-row ui-row-active',
    rowActiveText: 'ui-row-active-text font-medium',
    rowText: 'ui-text',
    rowTextHover: 'ui-row-hover-text',

    // Buttons (item-manager specific)
    btnBase: 'ui-icon-btn',
    btnActive: 'ui-icon-btn ui-icon-btn-active',
    btnDanger: 'ui-icon-btn ui-icon-btn-danger',
    btnDangerActive: 'ui-icon-btn ui-icon-btn-danger ui-icon-btn-active',
    btnDisabled: 'ui-disabled',

    // Edit confirm buttons
    editConfirm: 'ui-icon-btn ui-icon-btn-confirm',
    editCancel: 'ui-icon-btn ui-icon-btn-cancel',

    // Sizes (item-manager specific)
    btnSize: coarse ? 'w-8 h-8' : 'w-6 h-6',
    btnIcon: 'w-3.5 h-3.5',
  };
}

/* Open submenu CHAIN (nested subs coexist): opening a sub appends its id;
   closing one truncates it AND its children (a child can never outlive its
   parent). The root menu stands its key-lock down while the chain is non-empty
   (the topmost sub owns the keys). */
/** Text a typeahead letter-jump matches against — walks one element level
 *  (labels may be wrapped in a span; icons live in the `icon` prop). */
export function menuItemLabel(children: React.ReactNode): string {
  const texts: string[] = [];
  React.Children.forEach(children, child => {
    if (typeof child === 'string' || typeof child === 'number') {
      texts.push(String(child));
    } else if (React.isValidElement<{ children?: React.ReactNode }>(child)) {
      const inner = child.props.children;
      if (typeof inner === 'string' || typeof inner === 'number') texts.push(String(inner));
    }
  });
  return texts.join(' ').trim();
}

export const SubmenuContext = createContext<{
  chain: string[];
  setChain: (fn: (c: string[]) => string[]) => void;
  morph: boolean;
  /** Set when the KEYBOARD opened a sub (ArrowRight/Enter on a trigger row) —
     pointer-opened subs must NOT pre-light their first item. */
  keyboardOpened: string | null;
  setKeyboardOpened: (id: string | null) => void;
}>({ chain: [], setChain: () => {}, morph: true, keyboardOpened: null, setKeyboardOpened: () => {} });

// ── Single-highlight context (the EntityDropdown-panel model) ───────────────
/* ONE highlighted row per surface, written by pointer hover AND the keyboard
   arrows (latest wins); leaving the list clears a POINTER-driven highlight.
   No CSS hover fills — the lit row is `.ui-item-highlighted` only. Items
   register into the NEAREST surface context on mount (registration order =
   index); the registration map is what future search support filters. */

export interface MenuHighlightItem {
  /** Text used by the typeahead letter-jump. */
  label: string;
  activate: () => void;
  /** A submenu trigger row — ArrowRight opens it (the generic activate). */
  submenu?: boolean;
}

export interface MenuHighlightApi {
  items: MenuHighlightItem[];
  highlightedIndex: number;
  pointerDriven: boolean;
  register: (item: MenuHighlightItem) => () => void;
  setHighlighted: (idx: number, via: 'pointer' | 'keyboard') => void;
  pointerLeave: () => void;
}

export const MenuHighlightContext = createContext<MenuHighlightApi | null>(null);
export const useMenuHighlight = () => useContext(MenuHighlightContext);

/** Live query for `searchable` menus. `DropdownItem` rows read this to hide
 *  themselves when filtered out; the menu owns the state (the input renders in
 *  the kit's DropdownMenu). */
export const MenuSearchContext = createContext<{ query: string; setQuery: (q: string) => void }>({ query: '', setQuery: () => {} });
export const useMenuSearch = () => useContext(MenuSearchContext);

const ALWAYS_VISIBLE = () => true;

export function useMenuHighlightState(filter?: (item: MenuHighlightItem) => boolean): MenuHighlightApi {
  const itemsRef = useRef<MenuHighlightItem[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [pointerDriven, setPointerDriven] = useState(false);
  /* Version bump on register/unregister: the api memo re-derives `items`
     from the ref so registered items see themselves (and their index). */
  const [version, bump] = useState(0);

  const register = useCallback((item: MenuHighlightItem) => {
    itemsRef.current = [...itemsRef.current, item];
    bump(v => v + 1);
    return () => {
      itemsRef.current = itemsRef.current.filter(i => i !== item);
      bump(v => v + 1);
    };
  }, []);

  const setHighlighted = useCallback((idx: number, via: 'pointer' | 'keyboard') => {
    setHighlightedIndex(idx);
    setPointerDriven(via === 'pointer');
  }, []);

  const pointerLeave = useCallback(() => {
    setPointerDriven(d => {
      if (!d) return d;
      setHighlightedIndex(-1);
      return false;
    });
  }, []);

  const api = useMemo<MenuHighlightApi>(() => ({
    /* A `filter` (the searchable query) narrows the exposed items — hidden
       rows drop out of indexing entirely, so the single highlight, the
       arrows and the typeahead all operate on the VISIBLE set only. */
    items: filter ? itemsRef.current.filter(filter) : itemsRef.current,
    highlightedIndex,
    pointerDriven,
    register,
    setHighlighted,
    pointerLeave,
  }), [highlightedIndex, pointerDriven, version, register, setHighlighted, pointerLeave, filter]);
  return api;
}

/** Single-highlight row registration for a surface item — the SHARED contract
 *  behind both `DropdownItem` (Radix Item) and the rich-text `@` autocomplete
 *  rows (rendered outside a Radix menu, in an isolated root). Registers into
 *  the NEAREST MenuHighlightContext on mount (registration order = index);
 *  returns the row's index + whether it is the lit row + a pointer-hover
 *  setter. Menus without a provider get `api: null` → unlit, unregistered
 *  rows (bespoke surfaces keep their own behavior). */
export function useHighlightRow(opts: { label: () => string; activate: () => void; disabled?: boolean }) {
  const api = useMenuHighlight();
  const apiRef = useRef(api);
  apiRef.current = api;
  const selfRef = useRef<MenuHighlightItem | null>(null);

  useEffect(() => {
    const self: MenuHighlightItem = { label: opts.label(), activate: opts.activate };
    selfRef.current = self;
    return apiRef.current?.register(self);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const myIndex = api && selfRef.current ? api.items.indexOf(selfRef.current) : -1;
  const highlighted = !!api && !opts.disabled && myIndex >= 0 && myIndex === api.highlightedIndex;
  const setPointer = (idx: number) => {
    if (!opts.disabled && api && idx >= 0) api.setHighlighted(idx, 'pointer');
  };
  return { api, myIndex, highlighted, setPointer };
}

/** Keyboard for a highlight surface: arrows move the single index, Enter/Space
 *  activate the highlighted item, letter typeahead jumps to the first match
 *  (500ms prefix buffer). The handler is created ONCE per hook instance and
 *  ATTACHED by the content's composed ref — the Radix portal content mounts
 *  in a LATER commit than the `open` flip, so a plain [open] effect would
 *  miss it. Registered at CAPTURE with stopImmediatePropagation so it always
 *  beats Radix's own roving focus/typeahead (which would light a second row).
 *  Menus WITHOUT registered highlight items (ItemManagerDropdown's bespoke
 *  rows) keep Radix's native keyboard handling untouched. */
export function useMenuKeys(
  active: boolean,
  api: MenuHighlightApi,
  handlerRef: React.MutableRefObject<(e: KeyboardEvent) => void>,
  opts?: { onCloseSub?: () => void; onFieldKey?: (e: KeyboardEvent) => boolean },
) {
  const highlightedRef = useRef(-1);
  highlightedRef.current = api.highlightedIndex;
  const apiRef = useRef(api);
  apiRef.current = api;
  const activeRef = useRef(active);
  activeRef.current = active;
  const optsRef = useRef(opts);
  optsRef.current = opts;
  const bufferRef = useRef({ text: '', time: 0 });
  /* Stable handler — created ONCE, reads everything via refs. The composed
     ref attaches AND removes this exact function; a per-render reassignment
     would leave the attached closure on the node after unmount (the cleanup
     removes the newest closure, not the attached one) and duplicate listeners
     on the content during ref churn. */
  const keysCreatedRef = useRef(false);
  if (!keysCreatedRef.current) {
    keysCreatedRef.current = true;
    handlerRef.current = (e: KeyboardEvent) => {
      if (!activeRef.current) return;
      /* A focused field inside the menu (the searchable input) owns its keys:
         printable chars + Enter + Escape are swallowed AT CAPTURE
         (stopImmediatePropagation) so Radix's own roving focus/typeahead never
         lights or FOCUSES a menu row — without the stop, typing "e" lets
         Radix's typeahead focus the first matching item and steal focus from
         the field. `onFieldKey` (the searchable menu) does the work — Enter
         activates the highlighted row, Escape clears the query then closes —
         and returns whether to preventDefault (chars: NO, the browser inserts
         them and the separate `input` event keeps the controlled field
         updating; Enter/Escape: YES). Arrows still navigate the visible rows. */
      const t = e.target as HTMLElement | null;
      const inField = !!t && !!t.closest('input, textarea, [contenteditable]');
      if (inField && (e.key.length === 1 || e.key === 'Enter' || e.key === 'Escape')) {
        /* Swallow the key ONLY when the menu actually owns it — a searchable
           menu (onFieldKey + registered items) routes the key itself; any menu
           WITH registered items must still stop Radix's typeahead from stealing
           focus. Otherwise (ItemManager's rename input — no items, no
           onFieldKey) let the key reach the field so its own Enter/Escape
           handlers run. */
        const prevent = optsRef.current?.onFieldKey?.(e);
        const ownsKey = !!optsRef.current?.onFieldKey || apiRef.current.items.length > 0;
        if (ownsKey) {
          e.stopImmediatePropagation();
          if (prevent) e.preventDefault();
        }
        return;
      }
      const items = apiRef.current.items;
      if (items.length === 0) return; // bespoke surfaces (ItemManager) keep Radix's keyboard
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        e.stopImmediatePropagation();
        const dir = e.key === 'ArrowDown' ? 1 : -1;
        const next = (highlightedRef.current + dir + items.length) % items.length;
        apiRef.current.setHighlighted(next, 'keyboard');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        e.stopImmediatePropagation();
        const idx = highlightedRef.current;
        if (idx >= 0 && idx < items.length && items[idx].submenu) items[idx].activate();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        e.stopImmediatePropagation();
        optsRef.current?.onCloseSub?.();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopImmediatePropagation();
        const idx = highlightedRef.current;
        if (idx >= 0 && idx < items.length) items[idx].activate();
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        e.stopImmediatePropagation();
        const now = Date.now();
        const text = (now - bufferRef.current.time > 500 ? '' : bufferRef.current.text) + e.key.toLowerCase();
        bufferRef.current = { text, time: now };
        if (!text) return;
        const start = highlightedRef.current + 1;
        for (let i = 0; i < items.length; i++) {
          const idx = (start + i) % items.length;
          if (items[idx].label.toLowerCase().startsWith(text)) {
            apiRef.current.setHighlighted(idx, 'keyboard');
            return;
          }
        }
      }
    };
  }
}

/** Mini-modal keyboard lock: while a surface is open, the MENU keys
 *  (arrows / Enter / Space / typeahead letters) are captured at the DOCUMENT
 *  and routed to the surface's own handler even when the keyboard focus sits
 *  elsewhere (a stripboard canvas, the page body) — the background never
 *  sees them. Events that already target the surface pass through to the
 *  content's listener; every other key (Cmd+Z, Escape, Tab…) is untouched.
 *  Pass `standDown` when a CHILD surface (an open submenu) owns the keys.
 *  The handler is created ONCE per hook instance and ATTACHED by the content's
 *  composed ref (the Radix portal mounts later than the open flip — the same
 *  reason useMenuKeys/useMenuWheel attach there). */
export function useMenuKeyLock(
  active: boolean,
  api: MenuHighlightApi,
  keysHandlerRef: React.MutableRefObject<(e: KeyboardEvent) => void>,
  contentRef: React.RefObject<HTMLElement | null>,
  standDown: boolean,
  lockHandlerRef: React.MutableRefObject<(e: KeyboardEvent) => void>,
  opts?: { ignoreFields?: boolean },
) {
  const apiRef = useRef(api);
  apiRef.current = api;
  const activeRef = useRef(active);
  activeRef.current = active;
  const standDownRef = useRef(standDown);
  standDownRef.current = standDown;
  const ignoreFieldsRef = useRef(opts?.ignoreFields);
  ignoreFieldsRef.current = opts?.ignoreFields;
  /* Stable handler — created ONCE, reads everything via refs. The composed
     ref's cleanup removes THIS exact function; a per-render reassignment
     would leak the attached closure on the DOCUMENT after unmount (the
     cleanup removes the newest closure, not the attached one) — and a leaked
     lock from a remounted menu keeps its last activeRef forever, eating menu
     keys app-wide. */
  const lockCreatedRef = useRef(false);
  if (!lockCreatedRef.current) {
    lockCreatedRef.current = true;
    lockHandlerRef.current = (e: KeyboardEvent) => {
      if (!activeRef.current || standDownRef.current) return;
      const el = contentRef.current;
      if (el && el.contains(e.target as Node)) return;
      /* Trigger-as-search (external mode): the trigger field lives OUTSIDE the
         content — its keystrokes (letters/space/Enter) belong to the field,
         so the lock must not hijack them. Everything else still locks. */
      if (ignoreFieldsRef.current) {
        const t = e.target as HTMLElement | null;
        if (t && t.closest('input, textarea, [contenteditable]')) return;
      }
      if (apiRef.current.items.length === 0) return; // bespoke surfaces keep Radix's keys
      const isMenuKey = e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight'
        || e.key === 'Enter' || e.key === ' '
        || (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey);
      if (!isMenuKey) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      keysHandlerRef.current(e);
    };
  }
}

/** Manual wheel scrolling for portaled menu content (a Modal's scroll lock
 *  preventDefaults wheels outside the dialog; the v0.1.52 capture interceptor
 *  in useOverlayMorph already stops propagation for the content — this is the
 *  actual scroll, belt and suspenders with the interceptor). Attached by the
 *  content's composed ref (same later-commit reason as useMenuKeys); the
 *  handler is created ONCE so re-attaches during ref churn stay deduped. */
export function useMenuWheel(active: boolean, handlerRef: React.MutableRefObject<(e: WheelEvent) => void>) {
  const activeRef = useRef(active);
  activeRef.current = active;
  const wheelCreatedRef = useRef(false);
  if (!wheelCreatedRef.current) {
    wheelCreatedRef.current = true;
    handlerRef.current = (e: WheelEvent) => {
      if (!activeRef.current) return;
      /* Searchable menus scroll their INNER items scroller ([data-menu-items],
         kept below the pinned search box) — everything else scrolls the
         content itself. */
      const host = e.currentTarget as HTMLElement;
      const el = host.querySelector<HTMLElement>('[data-menu-items]') ?? host;
      if (el.scrollHeight > el.clientHeight) {
        e.preventDefault();
        el.scrollTop += e.deltaY;
      }
    };
  }
}

export interface DropdownMenuProps {
  open: boolean;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  trigger: React.ReactNode;
  align?: 'left' | 'right';
  width?: string;
  theme?: DropdownTheme;
  children: React.ReactNode;
  /** Extra classes on the popup content (e.g. lifting the z-index above a
   *  stacked app modal — the kit menu default z-[200] sits under a modal's
   *  z-[10000]). */
  contentClassName?: string;
  /** Trigger-anchored scale+fade morph (the modal FLIP language; default
   *  true). prefers-reduced-motion and morph={false} skip it entirely. */
  morph?: boolean;
  /** Row to light on open (the panel's single-mode "highlight the current"
   *  behavior — e.g. the active item in a picker list). */
  initialHighlightIndex?: number;
  /** Render a search input at the top of the panel (auto-focused on open):
   *  typing filters the registered `DropdownItem`s by their label (the
   *  rich-text `@`-autocomplete model, lifted into the menu). Arrows move the
   *  single highlight over the VISIBLE rows; Enter (in the input or on a row)
   *  activates the highlighted row, falling back to the first visible one. */
  searchable?: boolean;
  searchPlaceholder?: string;
  /** Custom label matcher for the search filter — defaults to a
   *  case-insensitive substring match. Receives the trimmed query + the item
   *  label; return true to keep the row. */
  searchFilter?: (query: string, label: string) => boolean;
  /** Controlled search query. When provided (with `searchable`) the menu uses
   *  THIS value as the filter and does NOT render its own search box — the
   *  trigger itself (typically the text field that opens the menu) IS the
   *  search box. Wire the field to it and open on focus/typing:
   *    <input value={q} onFocus={() => setOpen(true)}
   *           onChange={e => { setQ(e.target.value); setOpen(true); }} /> */
  searchValue?: string;
  onSearchValueChange?: (q: string) => void;
}

export default function DropdownMenu({
  open,
  onClose,
  onOpenChange,
  trigger,
  align = 'left',
  width,
  theme = 'dark',
  children,
  morph = true,
  contentClassName,
  initialHighlightIndex,
  searchable = false,
  searchPlaceholder,
  searchFilter,
  searchValue,
  onSearchValueChange,
}: DropdownMenuProps) {
  const [subChain, setSubChain] = useState<string[]>([]);
  const [keyboardOpenedSub, setKeyboardOpenedSub] = useState<string | null>(null);
  const portalTarget = usePortalTarget();
  const currentDocument = useCurrentDocument();
  const triggerRef = useRef<HTMLElement | null>(null);
  const contentElRef = useRef<HTMLDivElement | null>(null);
  const openRef = useRef(open);
  openRef.current = open;
  /* Radix unmounts the content the moment its `open` prop flips false — the
     close morph needs the content to stay mounted while it plays, so Radix
     keeps `open` until the morph finishes (the modal owns its dismissal the
     same way), then `persisted` drops and the content unmounts. */
  const [persisted, setPersisted] = useState(open);

  /* Searchable state: the query narrows the registered highlight items to the
     visible set (the arrows/typeahead/highlight all operate on it). Two modes:
     - INTERNAL box: the menu owns `internalQuery` and renders a search input.
     - EXTERNAL/trigger-as-search (searchValue is controlled): the caller's
       trigger field IS the search box — the query is bound to it and no box
       renders inside the panel. Reset the internal query on each open. */
  const [internalQuery, setInternalQuery] = useState('');
  const externalSearch = searchable && searchValue !== undefined;
  const query = externalSearch ? searchValue : internalQuery;
  const setQuery = externalSearch ? (onSearchValueChange ?? (() => {})) : setInternalQuery;
  /* External (trigger-as-search): until the user actually TYPES, the filter is
     a no-op so clicking a filled field shows the WHOLE list (the value is just
     the field's committed text, not a query). The injected trigger onKeyDown
     flips this on the first printable key; it resets on open/close/select. */
  const [typedSinceOpen, setTypedSinceOpen] = useState(false);
  const filterQuery = externalSearch && !typedSinceOpen ? '' : query;
  const searchInputRef = useRef<HTMLInputElement>(null);
  /* Subscribe to the global coarse knob so a LIVE scale change re-derives the
     search box's item-sized padding/font (same recipe as DropdownItem). */
  const coarseScale = useCoarseScale();
  const searchBoxStyle = {
    padding: `${coarsePx(8, 12, coarseScale)}px ${coarsePx(12, 16, coarseScale)}px`,
    fontSize: `${coarsePx(12, 14, coarseScale)}px`,
  };
  /* The items scroller's scrollbar reserves layout width on the RIGHT (the
     kit's always-visible thin scrollbar) — so the rows are narrower than the
     full-width search box. Pad the box by the same gutter so they always line
     up, re-measuring when the scrollbar appears/disappears (filters, window
     size). */
  const [searchGutter, setSearchGutter] = useState(0);
  const internalSearch = searchable && !externalSearch;
  useEffect(() => {
    if (!internalSearch || !open) return;
    const scroller = contentElRef.current?.querySelector<HTMLElement>('[data-menu-items]');
    if (!scroller) return;
    const measure = () => setSearchGutter(scroller.offsetWidth - scroller.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(scroller);
    return () => ro.disconnect();
  }, [open, internalSearch, query]);
  const filter = useMemo<((item: MenuHighlightItem) => boolean) | undefined>(() => {
    if (!searchable) return undefined;
    const q = filterQuery.trim().toLowerCase();
    if (!q) return ALWAYS_VISIBLE;
    return (it: MenuHighlightItem) => (searchFilter ? searchFilter(q, it.label) : it.label.toLowerCase().includes(q));
  }, [filterQuery, searchable, searchFilter]);

  const highlight = useMenuHighlightState(filter);

  useEffect(() => {
    if (open) {
      setPersisted(true);
      if (!externalSearch) setInternalQuery('');
      setTypedSinceOpen(false);
      highlight.setHighlighted(initialHighlightIndex ?? -1, 'keyboard');
      /* One open overlay at a time: opening this menu closes any other
         (context menu) first. */
      return registerOverlayClose(() => { onOpenChange?.(false); onClose?.(); });
    }
    // The parent is closing — collapse any open submenu so it morphs
    // closed alongside this menu instead of staying open mid-morph.
    setSubChain([]);
    setTypedSinceOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialHighlightIndex, onOpenChange, onClose]);

  /* Touch dismissal gap (iPad): Radix's DismissableLayer defers TOUCH
     outside-dismissal to the `click` event (a touch that becomes a scroll
     shouldn't dismiss the menu). A modal DRAG is pointerdown + pointermove +
     pointerup with no click — the deferred dismissal never fires, so dragging
     a modal leaves an open menu stuck on iPad (mouse/pen dismiss immediately
     on pointerdown, which is why Mac works). The app's DropdownPanel closes on
     any outside pointerdown (`useDropdown`); give the kit menu the same model
     for touch: dismiss on a TOUCH pointerdown outside the menu (content + open
     submenus) and outside the trigger (Radix owns the trigger toggle). Gate on
     touch only — a non-gated listener would double-dismiss with Radix's own
     pointerdown handling for mouse/pen. */
  useEffect(() => {
    if (!open || !currentDocument) return;
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') return;
      const t = e.target as Node | null;
      if (!t) return;
      if (contentElRef.current && contentElRef.current.contains(t)) return;
      if (triggerRef.current && triggerRef.current.contains(t)) return;
      /* An open submenu's content portals as a SIBLING of the root content —
         exclude it too so a tap inside a submenu item still selects it (Radix
         Content and SubContent both carry `data-radix-menu-content`). */
      if (t instanceof Element && t.closest('[data-radix-menu-content]')) return;
      onOpenChange?.(false);
      onClose?.();
    };
    currentDocument.addEventListener('pointerdown', onPointerDown, { capture: true });
    return () => currentDocument.removeEventListener('pointerdown', onPointerDown, { capture: true });
  }, [open, currentDocument, onOpenChange, onClose]);

  const anchor = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { left: r.left, top: r.top, width: r.width, height: r.height };
  }, []);

  const setContentRef = useOverlayMorph({
    visible: open,
    morph,
    anchor,
    onClosed: () => setPersisted(false),
  });
  /* The Radix portal content mounts in a LATER commit than the `open` flip —
     attach the keydown/wheel handlers here (the composed ref), not in an
     [open] effect. */
  const keysHandlerRef = useRef<(e: KeyboardEvent) => void>(() => {});
  const wheelHandlerRef = useRef<(e: WheelEvent) => void>(() => {});
  const lockHandlerRef = useRef<(e: KeyboardEvent) => void>(() => {});
  /* Field keys (the internal search box): Enter activates the highlighted (or
     first visible) row; Escape closes the dropdown like any other menu.
     Letters return false so the char is inserted and the `input` event drives
     the controlled query. */
  const onFieldKey = useCallback((e: KeyboardEvent): boolean => {
    if (e.key === 'Enter') {
      const idx = highlight.highlightedIndex;
      const item = highlight.items[idx >= 0 ? idx : 0];
      item?.activate();
      return true;
    }
    if (e.key === 'Escape') {
      onOpenChange?.(false);
      onClose?.();
      return true;
    }
    return false;
  }, [highlight, onOpenChange, onClose]);
  /* Keys/lock target only the TOPMOST open surface: the root navigates only
     while no sub is open (the open sub owns the keyboard). */
  useMenuKeys(open && subChain.length === 0, highlight, keysHandlerRef, { onFieldKey });
  useMenuWheel(open, wheelHandlerRef);
  useMenuKeyLock(open, highlight, keysHandlerRef, contentElRef, subChain.length > 0, lockHandlerRef, { ignoreFields: externalSearch });
  const lockDocRef = useRef<Document | null>(null);
  const setComposedRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      node.addEventListener('keydown', keysHandlerRef.current, { capture: true });
      node.addEventListener('wheel', wheelHandlerRef.current as EventListener, { passive: false } as AddEventListenerOptions);
      const doc = node.ownerDocument;
      lockDocRef.current = doc;
      doc.addEventListener('keydown', lockHandlerRef.current, { capture: true });
      /* offsetWidth works while the content is still visibility-hidden —
         the real panel width for the viewport clamp (see fixedOpts above). */
      setContentWidth(node.offsetWidth);
      setContentReady(true);
    } else {
      lockDocRef.current?.removeEventListener('keydown', lockHandlerRef.current, { capture: true });
      lockDocRef.current = null;
      setContentReady(false);
    }
    contentElRef.current = node;
    setContentRef(node);
  }, [setContentRef]);

  /* Panel positioning (the EntityDropdown-panel model): the ROOT content is
     fixed below the trigger, width-matched to it (or the `width` class for
     explicitly-sized menus), viewport-clamped, hidden until the positioning
     rAF flips `ready`. Submenus keep the Radix popper side-placement. */
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0, maxH: 320, ready: false } as { top: number; left: number; width: number; maxH: number; bottom?: number; ready?: boolean });
  const [triggerWidth, setTriggerWidth] = useState(0);
  /* The portal content mounts in a LATER commit than the `open` flip — and
     the viewport clamp must measure the CONTENT's width, not the trigger's
     (a `width` class like w-80 makes the panel much wider than its trigger;
     clamping against the trigger width left fixed-width menus cropped at the
     viewport edge). The composed ref captures both facts on that later mount. */
  const [contentReady, setContentReady] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);
  useEffect(() => {
    if (open && triggerRef.current) setTriggerWidth(triggerRef.current.getBoundingClientRect().width);
  }, [open]);
  const fixedOpts = useMemo(() => ({ panelWidth: (contentWidth || triggerWidth) || undefined }), [contentWidth, triggerWidth]);
  /* The menu max-height is HARD-CAPPED at 24rem (the content class is
     overridden by the positioning's inline maxHeight, so the cap lives here).
     Gated on contentReady: the first measure must already know the real panel
     width (the panel stays visibility-hidden until ready, so there is no
     flash — one position, the right one). */
  useFixedPosition(triggerRef, open && contentReady, (p) => setPos({ ...p, maxH: Math.min(p.maxH, 384), ready: true }), fixedOpts);
  /* The panel is `visibility: hidden` until the positioning rAF flips ready —
     and focusing a hidden element is a no-op, so Radix's open autofocus was
     silently dropped (the keyboard stayed on the trigger/BODY and menu keys
     died). Focus the content once it is actually visible; never steal focus
     from something already inside the menu (a hovered item). */
  useEffect(() => {
    if (pos.ready && open) {
      if (searchable) {
        searchInputRef.current?.focus();
        return;
      }
      const el = contentElRef.current;
      if (el && el.ownerDocument.activeElement !== el && !el.contains(el.ownerDocument.activeElement)) {
        el.focus();
      }
    }
  }, [pos.ready, open, searchable]);

  /* Searchable: keep the single highlight on a VISIBLE row as the filter
     narrows the list — when the highlighted index leaves the visible set
     (filter changed, or nothing lit on open), light the first row. */
  useEffect(() => {
    if (!open || !searchable) return;
    if (highlight.items.length === 0) {
      if (highlight.highlightedIndex !== -1) highlight.setHighlighted(-1, 'keyboard');
      return;
    }
    const hi = highlight.highlightedIndex;
    if (hi < 0 || hi >= highlight.items.length) highlight.setHighlighted(0, 'keyboard');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, query, searchable, highlight.items.length]);

  /* Arrows/typeahead can light a row that is scrolled out of view — keep the
     highlighted row visible (the panel's scroll-into-view behavior). */
  useLayoutEffect(() => {
    if (!open || highlight.highlightedIndex < 0) return;
    const row = contentElRef.current?.querySelector<HTMLElement>(`[data-ei="${highlight.highlightedIndex}"]`);
    row?.scrollIntoView({ block: 'nearest' });
  }, [open, highlight.highlightedIndex]);

  const handleOpenChange = useCallback((o: boolean) => {
    // While the close morph plays (open already false, Radix still mounted)
    // Radix keeps reporting outside-click/Escape — ignore them.
    if (!o && !openRef.current) return;
    // A close that PROCEEDS from a pointerdown ON THE TRIGGER is this same
    // interaction's toggle-dismiss (Radix reports the trigger as outside the
    // content). The trigger's own click-phase must then NOT reopen it (see
    // triggerOnClick) — otherwise one dismiss click closes AND reopens the
    // menu, interleaving close+open morphs and leaving it stuck.
    if (!o && triggerPointerDownRef.current) closeFromTriggerPointerDownRef.current = true;
    if (onOpenChange) onOpenChange(o);
    else if (!o) onClose?.();
  }, [onOpenChange, onClose]);

  /* Reopen-during-close: a trigger click that lands while the close morph is
     still playing gets swallowed by the guard above (Radix toggles the
     still-mounted root closed and the toggle is ignored) — the click would
     be dead and the menu stuck shut for ~300ms. The trigger's own click
     reverses it: reopening forces `open` back true and the open-morph effect
     re-runs, canceling the in-flight close. EXCEPT for the click whose OWN
     pointerdown caused the close (the toggle-dismiss above) — that click
     must stay a dismiss, not reopen what it just closed. */
  const persistedRef = useRef(persisted);
  persistedRef.current = persisted;
  const triggerPointerDownRef = useRef(false);
  const closeFromTriggerPointerDownRef = useRef(false);
  const triggerOnClick = useCallback(() => {
    if (!openRef.current && persistedRef.current) {
      if (closeFromTriggerPointerDownRef.current) {
        closeFromTriggerPointerDownRef.current = false;
        triggerPointerDownRef.current = false;
        return;
      }
      onOpenChange?.(true);
    }
  }, [onOpenChange]);

  const triggerEl = React.isValidElement(trigger) ? (trigger as React.ReactElement<{ onClick?: (e: React.MouseEvent) => void; onKeyDown?: (e: React.KeyboardEvent) => void }>) : null;
  const triggerNode = triggerEl
    ? React.cloneElement(triggerEl as React.ReactElement<{ ref?: React.Ref<HTMLElement>; onClick?: (e: React.MouseEvent) => void; onPointerDown?: (e: React.PointerEvent) => void; onKeyDown?: (e: React.KeyboardEvent) => void }>, {
        ref: (node: HTMLElement | null) => { triggerRef.current = node; },
        onPointerDown: () => { triggerPointerDownRef.current = true; closeFromTriggerPointerDownRef.current = false; },
        onClick: (e: React.MouseEvent) => {
          triggerEl.props.onClick?.(e);
          triggerOnClick();
        },
        /* Combobox mode (externalSearch): the trigger field IS the search box,
           so it also drives the menu's keyboard — arrows move the single
           highlight, Enter activates the highlighted (or first visible) row,
           and a printable key flips the filter live (the committed value was
           just showing the full list until the first keystroke). */
        onKeyDown: (e: React.KeyboardEvent) => {
          triggerEl.props.onKeyDown?.(e);
          if (!externalSearch || !openRef.current) return;
          if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
            setTypedSinceOpen(true);
          } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            const items = highlight.items;
            if (items.length === 0) return;
            const dir = e.key === 'ArrowDown' ? 1 : -1;
            const next = (highlight.highlightedIndex + dir + items.length) % items.length;
            highlight.setHighlighted(next, 'keyboard');
          } else if (e.key === 'Enter') {
            e.preventDefault();
            const idx = highlight.highlightedIndex;
            const item = highlight.items[idx >= 0 ? idx : 0];
            item?.activate();
          }
        },
      })
    : trigger;

  const contentClasses = `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] min-w-0 ${internalSearch ? 'overflow-hidden' : 'overflow-y-auto scrollbar-custom'}`;

  return (
    <RadixDropdownMenu.Root open={open || persisted} onOpenChange={handleOpenChange} modal={false}>
      <RadixDropdownMenu.Trigger asChild>
        {triggerNode}
      </RadixDropdownMenu.Trigger>
      <RadixDropdownMenu.Portal container={portalTarget ?? undefined}>
        <DropdownThemeContext.Provider value={theme}>
          <SubmenuContext.Provider value={{ chain: subChain, setChain: setSubChain, morph, keyboardOpened: keyboardOpenedSub, setKeyboardOpened: setKeyboardOpenedSub }}>
            <MenuHighlightContext.Provider value={highlight}>
              <MenuSearchContext.Provider value={{ query, setQuery }}>
                <RadixDropdownMenu.Content
                  ref={setComposedRef}
                  data-theme={theme}
                  data-ui-fixed
                  className={`${contentClasses} ${width || ''} ${contentClassName || ''}`}
                  style={{
                    touchAction: 'manipulation',
                    position: 'fixed',
                    left: pos.left,
                    top: pos.bottom != null ? undefined : pos.top,
                    bottom: pos.bottom,
                    /* No width class: the menu sizes to its CONTENT (text must
                       never clip) but never narrower than the trigger — the
                       min-width floor keeps the trigger-matched look. */
                    minWidth: width ? undefined : (triggerWidth || undefined),
                    maxHeight: pos.maxH,
                    visibility: pos.ready ? 'visible' : 'hidden',
                  }}
                  onPointerLeave={highlight.pointerLeave}
                >
                  {internalSearch && (
                    <div className="shrink-0 px-0 pt-1 pb-1" style={{ paddingRight: searchGutter }}>
                      <div className="ui-item ui-item-highlighted flex items-center gap-2 rounded" style={searchBoxStyle}>
                        <Search className="w-3.5 h-3.5 shrink-0 ui-icon" />
                        <input
                          ref={searchInputRef}
                          value={query}
                          onChange={e => setQuery(e.target.value)}
                          placeholder={searchPlaceholder ?? 'Search…'}
                          className="flex-1 min-w-0 bg-transparent outline-none text-current placeholder:text-current placeholder:opacity-50 cursor-text"
                        />
                        {query ? (
                          <button
                            type="button"
                            tabIndex={-1}
                            aria-label="Clear search"
                            className="shrink-0 ui-icon-btn rounded flex items-center justify-center p-1 -m-1"
                            onPointerDown={e => e.stopPropagation()}
                            onClick={() => { setQuery(''); searchInputRef.current?.focus(); }}
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <span className="w-3.5 h-3.5 shrink-0" />
                        )}
                      </div>
                    </div>
                  )}
                  {internalSearch ? (
                    <div data-menu-items className="flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col">
                      {children}
                    </div>
                  ) : (
                    children
                  )}
                </RadixDropdownMenu.Content>
              </MenuSearchContext.Provider>
            </MenuHighlightContext.Provider>
          </SubmenuContext.Provider>
        </DropdownThemeContext.Provider>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  );
}

// ── Item Manager Dropdown ──

export interface ItemManagerDropdownProps {
  open: boolean;
  onClose: (open: boolean) => void;
  items: { id: string; name: string }[];
  activeId: string;
  onSelect: (id: string) => void;
  onRename: (id: string, name: string) => void;
  onDuplicate: (id: string) => string | void;
  onDelete: (id: string) => void;
  onCreate?: () => string | void;
  onImport?: () => void;
  onExport?: () => void;
  onReset?: () => void;
  onTrash?: () => void;
  closeOnSelect?: boolean;
  readOnly?: boolean;
  theme?: DropdownTheme;
  align?: 'left' | 'right';
  label: string;
  header: string;
  itemLabel?: string;
  trigger: React.ReactNode;
  minItems?: number;
  /** Renders each item's label (e.g. styled previews) — falls back to the
   *  plain name when omitted. */
  itemRender?: (item: { id: string; name: string }) => React.ReactNode;
  /** Passed through to DropdownMenu (trigger-anchored morph, default true). */
  morph?: boolean;
  /** Passed through to DropdownMenu (popup content classes, e.g. z-index). */
  contentClassName?: string;
}

export function ItemManagerDropdown({
  open,
  onClose,
  items,
  activeId,
  onSelect,
  onRename,
  onDuplicate,
  onDelete,
  onCreate,
  onImport,
  onExport,
  onReset,
  onTrash,
  closeOnSelect,
  readOnly = false,
  theme,
  align,
  label,
  header,
  itemLabel,
  trigger,
  minItems = 1,
  itemRender,
  morph = true,
  contentClassName,
}: ItemManagerDropdownProps) {
  const d = getDropdownClasses(theme);
  const itemSize = useItemSize();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  /* Live ref so commitRename reads the LATEST value from any closure (the
     document-capture Enter handler is registered once per editingId and would
     otherwise commit a stale value). */
  const editValueRef = useRef(editValue);
  editValueRef.current = editValue;
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Open scrolled to the active item so the selection is always visible.
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        listRef.current?.querySelector<HTMLElement>('[data-active="1"]')?.scrollIntoView({ block: 'nearest' });
      });
    }
  }, [open]);

  /* ItemManager keyboard (bespoke — its rows are specialized, not registered
     highlight items): ArrowUp/Down move between the item ROWS and the footer
     actions below; ArrowLeft/Right — only while a ROW is focused — focus the
     row's action buttons (pencil/copy/trash) and move between them. The
     rename input's arrows pass through untouched. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('input, textarea, [contenteditable]')) {
        /* The rename input's own onKeyDown is unreachable — Radix's popper
           content wrapper stops keydown at capture before the portal content,
           so the browser never delivers it to the input. Handle Enter (commit)
           / Escape (cancel) here at DOCUMENT capture, which fires first. */
        if (editingId && target === inputRef.current) {
          if (e.key === 'Enter') { e.preventDefault(); e.stopImmediatePropagation(); commitRename(); }
          else if (e.key === 'Escape') { e.preventDefault(); e.stopImmediatePropagation(); cancelRename(); }
        }
        return;
      }
      const menu = listRef.current?.closest('.ui-menu');
      if (!menu || !menu.contains(e.target as Node)) return;
      const doc = menu.ownerDocument;
      const rowNames = [...menu.querySelectorAll<HTMLElement>('[data-active] > [role="menuitem"]:first-child')];
      const footerItems = [...menu.querySelectorAll<HTMLElement>('div:last-child > [role="menuitem"]')];
      const vertical = [...rowNames, ...footerItems];
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        e.stopImmediatePropagation();
        const a = doc.activeElement as HTMLElement | null;
        let cur = a ? vertical.indexOf(a) : -1;
        if (cur < 0 && a) {
          const row = a.closest('[data-active]');
          const nameItem = row?.querySelector<HTMLElement>('[role="menuitem"]:first-child');
          if (nameItem) cur = rowNames.indexOf(nameItem);
        }
        const dir = e.key === 'ArrowDown' ? 1 : -1;
        const next = cur < 0 ? (dir === 1 ? 0 : vertical.length - 1) : (cur + dir + vertical.length) % vertical.length;
        vertical[next]?.focus({ preventScroll: true });
        return;
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const a = doc.activeElement as HTMLElement | null;
        const row = a?.closest('[data-active]') as HTMLElement | null;
        if (!row) return; // footer actions have no buttons to move into
        e.preventDefault();
        e.stopImmediatePropagation();
        const buttons = [...row.querySelectorAll<HTMLElement>('[role="menuitem"]')].slice(1);
        if (buttons.length === 0) return;
        const curBtn = a && row.contains(a) ? buttons.indexOf(a) : -1;
        const dir = e.key === 'ArrowRight' ? 1 : -1;
        const next = curBtn < 0 ? 0 : (curBtn + dir + buttons.length) % buttons.length;
        buttons[next]?.focus({ preventScroll: true });
        return;
      }
    };
    const doc = listRef.current?.ownerDocument ?? null;
    doc?.addEventListener('keydown', onKey, { capture: true });
    return () => doc?.removeEventListener('keydown', onKey, { capture: true });
  }, [open, editingId]);

  useEffect(() => {
    if (!editingId) return;
    const item = items.find(i => i.id === editingId);
    if (item && !editValue) setEditValue(item.name);
    const raf = requestAnimationFrame(() => {
      const el = inputRef.current;
      if (!el) return;
      el.focus();
      el.select();
    });
    /* Focus guard: Radix restores focus to the menu content after an item
       select, and webkit's focus lands ~250ms late, so in the CREATE flow the
       input's focus can be stolen several frames after it mounts. Poll for the
       FULL window (600ms) and re-assert whenever the input isn't the active
       element — never stop just because one tick saw it focused. */
    let attempts = 0;
    const guard = window.setInterval(() => {
      const el = inputRef.current;
      attempts++;
      if (!el || attempts > 12) {
        clearInterval(guard);
        return;
      }
      if (el.ownerDocument.activeElement !== el) {
        el.focus();
        /* Re-assert the select-all too — webkit drops the selection when the
           focus is stolen and restored, leaving the caret stranded. */
        el.select();
      }
    }, 50);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(guard);
    };
  }, [editingId]);

  useEffect(() => {
    if (editingId) {
      const item = items.find(i => i.id === editingId);
      if (item && !editValue) {
        setEditValue(item.name);
      }
    }
  }, [editingId, items]);

  const startRename = (id: string, name: string) => {
    setEditingId(id);
    setEditValue(name);
  };

  const commitRename = () => {
    if (editingId && editValueRef.current.trim()) {
      onRename(editingId, editValueRef.current.trim());
    }
    setEditingId(null);
  };

  const cancelRename = () => {
    setEditingId(null);
  };

  const createLabel = itemLabel || header.replace(/S$/, '').replace(/s$/, '');

  return (
    <DropdownMenu open={open} onOpenChange={(o) => { if (o) { setEditingId(null); setEditValue(''); } else { if (editingId && editValue.trim()) { onRename(editingId, editValue.trim()); } setEditingId(null); setEditValue(''); } if (!o || !readOnly) onClose(o); }} width="w-80" theme={theme} align={align} trigger={trigger} morph={morph} contentClassName={contentClassName}>
      <div className={`shrink-0 ${d.headerText}`}>
        {header}
      </div>
      <div ref={listRef} className="flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col">
      {items.map(item => {
        const isActive = item.id === activeId;
        const isEditing = editingId === item.id;
        return (
          <div key={item.id} data-active={isActive ? '1' : undefined} className={`flex items-center gap-1 rounded ${isActive || isEditing ? d.rowActiveBg : d.rowHoverBg} ${editingId && !isEditing ? 'opacity-40 pointer-events-none' : ''}`}>
            {isEditing ? (
              <>
                <div className="flex-1 min-w-0 flex items-center">
                  <input
                    ref={inputRef}
                    autoFocus
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); commitRename(); } if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); cancelRename(); } }}
                    className="w-full outline-none bg-transparent placeholder:text-current placeholder:opacity-50"
                    style={itemSize}
                  />
                </div>
                <RadixDropdownMenu.Item
                  className={`shrink-0 ${d.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${d.editConfirm}`}
                  onSelect={e => { e.preventDefault(); commitRename(); }}
                  onTouchStart={() => {}}
                >
                  <Check className={d.btnIcon} />
                </RadixDropdownMenu.Item>
                <RadixDropdownMenu.Item
                  className={`shrink-0 ${d.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${d.editCancel}`}
                  onSelect={e => { e.preventDefault(); cancelRename(); }}
                  onTouchStart={() => {}}
                >
                  <X className={d.btnIcon} />
                </RadixDropdownMenu.Item>
              </>
            ) : (
              <>
                <RadixDropdownMenu.Item
                  style={itemSize}
                  className={`flex-1 min-w-0 rounded outline-none cursor-pointer flex items-center ${d.rowText} ${isActive ? '' : d.rowTextHover}`}
                  onSelect={closeOnSelect ? () => { onSelect(item.id); } : e => { e.preventDefault(); onSelect(item.id); }}
                  onTouchStart={() => {}}
                >
                  <span className={`truncate ${isActive ? d.rowActiveText : ''}`}>{itemRender ? itemRender(item) : item.name}</span>
                </RadixDropdownMenu.Item>
                <RadixDropdownMenu.Item
                  className={`shrink-0 ${d.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${isActive ? d.btnActive : d.btnBase}`}
                  onSelect={e => { e.preventDefault(); startRename(item.id, item.name); }}
                  onTouchStart={() => {}}
                  disabled={readOnly}
                >
                  <Pencil className={d.btnIcon} />
                </RadixDropdownMenu.Item>
                <RadixDropdownMenu.Item
                  className={`shrink-0 ${d.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${isActive ? d.btnActive : d.btnBase}`}
                  onSelect={e => { e.preventDefault(); const newId = onDuplicate(item.id); if (newId) startRename(newId, `${item.name} Copy`); }}
                  onTouchStart={() => {}}
                  disabled={readOnly}
                >
                  <Copy className={d.btnIcon} />
                </RadixDropdownMenu.Item>
                <RadixDropdownMenu.Item
                  className={`shrink-0 ${d.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${items.length <= minItems ? d.btnDisabled : isActive ? d.btnDangerActive : d.btnDanger}`}
                  onSelect={e => { e.preventDefault(); onDelete(item.id); }}
                  onTouchStart={() => {}}
                  disabled={readOnly || items.length <= minItems}
                >
                  <Trash2 className={d.btnIcon} />
                </RadixDropdownMenu.Item>
              </>
            )}
          </div>
        );
      })}
      </div>
      <div className={`shrink-0 ${editingId ? 'opacity-40 pointer-events-none' : ''}`}>
        {onReset && (
          <>
            <RadixDropdownMenu.Separator className={d.separator} />
            <RadixDropdownMenu.Item
              className={`w-full text-left ${d.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${d.itemDefault} ui-row`}
              onSelect={e => { e.preventDefault(); onReset(); }}
              onTouchStart={() => {}}
              disabled={readOnly}
            >
              <RotateCcw className={`${d.btnIcon} ${d.icon}`} />
              Reset to Default
            </RadixDropdownMenu.Item>
          </>
        )}
        {(onCreate || onImport || onExport || onTrash) && (
          <RadixDropdownMenu.Separator className={d.separator} />
        )}
        {onCreate && (
          <RadixDropdownMenu.Item
            className={`w-full text-left ${d.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${d.itemDefault} ui-row`}
            onSelect={e => { e.preventDefault(); const newId = onCreate(); if (newId) startRename(newId, ''); }}
            onTouchStart={() => {}}
            disabled={readOnly}
          >
            <Plus className={`${d.btnIcon} ${d.icon}`} />
            New {createLabel}
          </RadixDropdownMenu.Item>
        )}
        {onImport && (
          <RadixDropdownMenu.Item
            className={`w-full text-left ${d.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${d.itemDefault} ui-row`}
            onSelect={e => { e.preventDefault(); onImport(); }}
            onTouchStart={() => {}}
            disabled={readOnly}
          >
            <svg className={`${d.btnIcon} ${d.icon}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            Import
          </RadixDropdownMenu.Item>
        )}
        {onExport && (
          <RadixDropdownMenu.Item
            className={`w-full text-left ${d.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${d.itemDefault} ui-row`}
            onSelect={e => { e.preventDefault(); onExport(); }}
            onTouchStart={() => {}}
            disabled={readOnly}
          >
            <svg className={`${d.btnIcon} ${d.icon}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
            Export
          </RadixDropdownMenu.Item>
        )}
        {onTrash && (
          <RadixDropdownMenu.Item
            className={`w-full text-left ${d.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${d.itemDefault} ui-row`}
            onSelect={e => { e.preventDefault(); onTrash(); }}
            onTouchStart={() => {}}
            disabled={readOnly}
          >
            <Trash2 className={`${d.btnIcon} ${d.icon}`} />
            Trash
          </RadixDropdownMenu.Item>
        )}
      </div>
    </DropdownMenu>
  );
}
