"use client";
import React, { createContext, useContext, useCallback, useState, useRef, useEffect, useLayoutEffect, useMemo } from 'react';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { Pencil, Copy, Trash2, Plus, Check, X, RotateCcw } from 'lucide-react';
import { usePortalTarget } from './popout';
import { IS_COARSE } from './device';
import { useOverlayMorph } from './overlayMorph';
import { useFixedPosition } from './useSmartPosition';
import { registerOverlayClose } from './overlayRegistry';

export type DropdownTheme = 'light' | 'dark' | 'blue';

export const DropdownThemeContext = createContext<DropdownTheme>('dark');
export const useDropdownTheme = () => useContext(DropdownThemeContext);

// ── Single source of truth for all dropdown styling ──
// Colors/interactions come from tokens.css (.ui-*) via [data-theme]; only
// layout/size utilities are inlined.

const ITEM_PAD = IS_COARSE ? 'px-4 py-3 text-sm' : 'px-3 py-2 text-xs';
const HEADER_PAD = IS_COARSE ? 'px-3 pt-3 pb-2' : 'px-3 pt-2 pb-1';
const HEADER_TEXT = IS_COARSE ? 'text-xs' : 'text-[10px]';

export function getDropdownClasses(theme?: DropdownTheme) {
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
    headerPad: HEADER_PAD,
    headerText: `${HEADER_PAD} font-semibold uppercase tracking-wider ${HEADER_TEXT} ui-label`,

    // Item padding
    itemPad: ITEM_PAD,

    // Input
    input: IS_COARSE
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
    btnSize: IS_COARSE ? 'w-8 h-8' : 'w-6 h-6',
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

export function useMenuHighlightState(): MenuHighlightApi {
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
    items: itemsRef.current,
    highlightedIndex,
    pointerDriven,
    register,
    setHighlighted,
    pointerLeave,
  }), [highlightedIndex, pointerDriven, version, register, setHighlighted, pointerLeave]);
  return api;
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
  opts?: { onCloseSub?: () => void },
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
) {
  const apiRef = useRef(api);
  apiRef.current = api;
  const activeRef = useRef(active);
  activeRef.current = active;
  const standDownRef = useRef(standDown);
  standDownRef.current = standDown;
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
      const el = e.currentTarget as HTMLElement;
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
}: DropdownMenuProps) {
  const [subChain, setSubChain] = useState<string[]>([]);
  const [keyboardOpenedSub, setKeyboardOpenedSub] = useState<string | null>(null);
  const portalTarget = usePortalTarget();
  const triggerRef = useRef<HTMLElement | null>(null);
  const contentElRef = useRef<HTMLDivElement | null>(null);
  const openRef = useRef(open);
  openRef.current = open;
  /* Radix unmounts the content the moment its `open` prop flips false — the
     close morph needs the content to stay mounted while it plays, so Radix
     keeps `open` until the morph finishes (the modal owns its dismissal the
     same way), then `persisted` drops and the content unmounts. */
  const [persisted, setPersisted] = useState(open);

  const highlight = useMenuHighlightState();

  useEffect(() => {
    if (open) {
      setPersisted(true);
      highlight.setHighlighted(initialHighlightIndex ?? -1, 'keyboard');
      /* One open overlay at a time: opening this menu closes any other
         (context menu) first. */
      return registerOverlayClose(() => { onOpenChange?.(false); onClose?.(); });
    }
    // The parent is closing — collapse any open submenu so it morphs
    // closed alongside this menu instead of staying open mid-morph.
    setSubChain([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialHighlightIndex, onOpenChange, onClose]);

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
  /* Keys/lock target only the TOPMOST open surface: the root navigates only
     while no sub is open (the open sub owns the keyboard). */
  useMenuKeys(open && subChain.length === 0, highlight, keysHandlerRef);
  useMenuWheel(open, wheelHandlerRef);
  useMenuKeyLock(open, highlight, keysHandlerRef, contentElRef, subChain.length > 0, lockHandlerRef);
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
      const el = contentElRef.current;
      if (el && el.ownerDocument.activeElement !== el && !el.contains(el.ownerDocument.activeElement)) {
        el.focus();
      }
    }
  }, [pos.ready, open]);

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

  const triggerEl = React.isValidElement(trigger) ? (trigger as React.ReactElement<{ onClick?: (e: React.MouseEvent) => void }>) : null;
  const triggerNode = triggerEl
    ? React.cloneElement(triggerEl as React.ReactElement<{ ref?: React.Ref<HTMLElement>; onClick?: (e: React.MouseEvent) => void; onPointerDown?: (e: React.PointerEvent) => void }>, {
        ref: (node: HTMLElement | null) => { triggerRef.current = node; },
        onPointerDown: () => { triggerPointerDownRef.current = true; closeFromTriggerPointerDownRef.current = false; },
        onClick: (e: React.MouseEvent) => {
          triggerEl.props.onClick?.(e);
          triggerOnClick();
        },
      })
    : trigger;

  const contentClasses = `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom`;

  return (
    <RadixDropdownMenu.Root open={open || persisted} onOpenChange={handleOpenChange} modal={false}>
      <RadixDropdownMenu.Trigger asChild>
        {triggerNode}
      </RadixDropdownMenu.Trigger>
      <RadixDropdownMenu.Portal container={portalTarget ?? undefined}>
        <DropdownThemeContext.Provider value={theme}>
          <SubmenuContext.Provider value={{ chain: subChain, setChain: setSubChain, morph, keyboardOpened: keyboardOpenedSub, setKeyboardOpened: setKeyboardOpenedSub }}>
            <MenuHighlightContext.Provider value={highlight}>
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
                {children}
              </RadixDropdownMenu.Content>
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
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
      if ((e.target as HTMLElement | null)?.closest?.('input, textarea, [contenteditable]')) return;
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
  }, [open]);

  useEffect(() => {
    if (editingId) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      });
      const item = items.find(i => i.id === editingId);
      if (item && !editValue) {
        setEditValue(item.name);
      }
    }
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
    if (editingId && editValue.trim()) {
      onRename(editingId, editValue.trim());
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
          <div key={item.id} data-active={isActive ? '1' : undefined} className={`flex items-center gap-1 rounded my-0.5 ${isActive || isEditing ? d.rowActiveBg : d.rowHoverBg} ${editingId && !isEditing ? 'opacity-40 pointer-events-none' : ''}`}>
            {isEditing ? (
              <>
                <div className={`flex-1 min-w-0 ${d.itemPad} rounded outline-none flex items-center gap-2`}>
                  <input
                    ref={inputRef}
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); commitRename(); } if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); cancelRename(); } }}
                    className={`w-full border rounded ${d.input}`}
                  />
                </div>
                <RadixDropdownMenu.Item
                  className={`shrink-0 ${d.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${d.editConfirm} !text-white`}
                  onSelect={e => { e.preventDefault(); commitRename(); }}
                  onTouchStart={() => {}}
                >
                  <Check className={d.btnIcon} />
                </RadixDropdownMenu.Item>
                <RadixDropdownMenu.Item
                  className={`shrink-0 ${d.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${d.editCancel} !text-white`}
                  onSelect={e => { e.preventDefault(); cancelRename(); }}
                  onTouchStart={() => {}}
                >
                  <X className={d.btnIcon} />
                </RadixDropdownMenu.Item>
              </>
            ) : (
              <>
                <RadixDropdownMenu.Item
                  className={`flex-1 min-w-0 ${d.itemPad} rounded outline-none cursor-pointer flex items-center ${d.rowText} ${isActive ? '' : d.rowTextHover}`}
                  onSelect={closeOnSelect ? () => { onSelect(item.id); } : e => { e.preventDefault(); onSelect(item.id); }}
                  onTouchStart={() => {}}
                >
                  <span className={`truncate ${isActive ? d.rowActiveText : ''}`}>{itemRender ? itemRender(item) : item.name}</span>
                </RadixDropdownMenu.Item>
                <RadixDropdownMenu.Item
                  className={`shrink-0 ${d.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${isActive ? d.btnActive : d.btnBase} ${isActive ? '!text-white' : ''}`}
                  onSelect={e => { e.preventDefault(); startRename(item.id, item.name); }}
                  onTouchStart={() => {}}
                  disabled={readOnly}
                >
                  <Pencil className={d.btnIcon} />
                </RadixDropdownMenu.Item>
                <RadixDropdownMenu.Item
                  className={`shrink-0 ${d.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${isActive ? d.btnActive : d.btnBase} ${isActive ? '!text-white' : ''}`}
                  onSelect={e => { e.preventDefault(); const newId = onDuplicate(item.id); if (newId) startRename(newId, `${item.name} Copy`); }}
                  onTouchStart={() => {}}
                  disabled={readOnly}
                >
                  <Copy className={d.btnIcon} />
                </RadixDropdownMenu.Item>
                <RadixDropdownMenu.Item
                  className={`shrink-0 ${d.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${items.length <= minItems ? d.btnDisabled : isActive ? d.btnDangerActive : d.btnDanger} ${isActive ? '!text-white hover:!text-red-400' : ''}`}
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
