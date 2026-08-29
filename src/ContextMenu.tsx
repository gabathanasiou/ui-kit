"use client";
import React, { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { IS_COARSE } from './device';
import { useCurrentWindow } from './popout';
import { useOverlayMorph } from './overlayMorph';
import { registerOverlayClose } from './overlayRegistry';
import {
  SubmenuContext, MenuHighlightContext, useMenuHighlight, useMenuHighlightState,
  useMenuKeys, useMenuKeyLock, useMenuWheel, menuItemLabel,
} from './DropdownMenu';
import type { MenuHighlightItem } from './DropdownMenu';

const MARGIN = 8;
const CTX_ITEM = IS_COARSE ? 'px-4 py-3 text-sm' : 'px-3 py-2 text-xs';
const CTX_TEXT = IS_COARSE ? 'text-sm' : 'text-xs';

export interface ContextMenuProps {
  open: boolean;
  x: number;
  y: number;
  onClose: () => void;
  children: React.ReactNode;
  containerRef?: React.RefObject<HTMLElement>;
  /** Morph from the press point (the modal FLIP language; default true).
   *  prefers-reduced-motion and morph={false} skip it entirely. */
  morph?: boolean;
}

/**
 * Context menu positioned at (x, y). Used for BOTH desktop right-click and
 * touch long-press — the long-press provider dispatches a synthetic
 * `contextmenu` event, so this component handles both inputs via one path.
 *
 * Shares the kit's menu machinery with the dropdowns: the single-highlight
 * surface (hover + arrows write ONE lit row), keyboard + typeahead, the
 * mini-modal key lock (menu keys never reach the page behind it), wheel
 * scroll, nested submenus via the SubmenuContext chain, and the
 * one-open-overlay-at-a-time registry (a dropdown and a context menu can
 * never coexist). The menu is press-point anchored and stays STATIC where
 * it opened (it does not follow scrolling).
 */
export const ContextMenu: React.FC<ContextMenuProps> = ({ open, x, y, onClose, children, containerRef, morph = true }) => {
  const menuRef = React.useRef<HTMLDivElement>(null);
  const currentWindow = useCurrentWindow();
  /* Keep the menu mounted through the close morph, then unmount it. */
  const [persisted, setPersisted] = useState(open);
  const [subChain, setSubChain] = useState<string[]>([]);
  const highlight = useMenuHighlightState();

  useEffect(() => {
    if (open) setPersisted(true);
  }, [open]);

  /* One open overlay at a time: opening the context menu closes any open
     dropdown first. */
  useEffect(() => {
    if (!open) return;
    return registerOverlayClose(onClose);
  }, [open, onClose]);

  /* Capture the press point at OPEN — the parent resets x/y to 0 when it
     clears the state on close, and the close morph's anchor must still point
     at where the menu was opened (never the top-left corner). */
  const pressRef = useRef({ left: x, top: y });
  if (open) pressRef.current = { left: x, top: y };
  const anchor = useCallback(() => ({ left: pressRef.current.left, top: pressRef.current.top, width: 0, height: 0 }), []);

  const setContentRef = useOverlayMorph({
    visible: open,
    morph,
    anchor,
    onClosed: () => setPersisted(false),
  });

  /* The Radix portal mounts later than the open flip in the dropdowns; here
     the content mounts with the open render, but the handler refs are
     attached at the same seam for symmetry. */
  const keysHandlerRef = useRef<(e: KeyboardEvent) => void>(() => {});
  const wheelHandlerRef = useRef<(e: WheelEvent) => void>(() => {});
  const lockHandlerRef = useRef<(e: KeyboardEvent) => void>(() => {});
  useMenuKeys(open, highlight, keysHandlerRef);
  useMenuWheel(open, wheelHandlerRef);
  useMenuKeyLock(open, highlight, keysHandlerRef, menuRef, subChain.length > 0, lockHandlerRef);
  const lockDocRef = useRef<Document | null>(null);
  const setRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      node.addEventListener('keydown', keysHandlerRef.current, { capture: true });
      node.addEventListener('wheel', wheelHandlerRef.current as EventListener, { passive: false } as AddEventListenerOptions);
      const doc = node.ownerDocument;
      lockDocRef.current = doc;
      doc.addEventListener('keydown', lockHandlerRef.current, { capture: true });
    } else {
      lockDocRef.current?.removeEventListener('keydown', lockHandlerRef.current, { capture: true });
      lockDocRef.current = null;
    }
    menuRef.current = node;
    setContentRef(node);
  }, [setContentRef]);

  useEffect(() => {
    if (!open || !currentWindow) return;
    const onPointer = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    currentWindow.addEventListener('pointerdown', onPointer, true);
    currentWindow.addEventListener('keydown', onKey, true);
    return () => {
      currentWindow.removeEventListener('pointerdown', onPointer, true);
      currentWindow.removeEventListener('keydown', onKey, true);
    };
  }, [open, onClose, currentWindow]);

  useLayoutEffect(() => {
    if (!open || !menuRef.current) return;
    const rect = menuRef.current.getBoundingClientRect();
    const containerRect = containerRef?.current?.getBoundingClientRect();
    const vw = containerRect ? containerRect.right : currentWindow?.innerWidth ?? 0;
    const vh = containerRect ? containerRect.bottom : currentWindow?.innerHeight ?? 0;
    const minLeft = containerRect ? containerRect.left : 0;
    const minTop = containerRect ? containerRect.top : 0;
    let top = Math.max(minTop + MARGIN, y);
    let left = Math.max(minLeft + MARGIN, x);
    if (left + rect.width > vw) left = vw - rect.width - MARGIN;
    if (top + rect.height > vh) top = Math.max(minTop + MARGIN, vh - rect.height - MARGIN);
    menuRef.current.style.top = `${top}px`;
    menuRef.current.style.left = `${left}px`;
  }, [open, x, y, containerRef]);

  if (!open && !persisted) return null;

  return (
    <SubmenuContext.Provider value={{ chain: subChain, setChain: setSubChain, morph }}>
      <MenuHighlightContext.Provider value={highlight}>
        <div
          ref={setRef}
          data-theme="light"
          className={`fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] ${CTX_TEXT} min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom`}
          style={{ top: y, left: x, touchAction: 'manipulation' }}
          onPointerLeave={highlight.pointerLeave}
        >
          {children}
        </div>
      </MenuHighlightContext.Provider>
    </SubmenuContext.Provider>
  );
};

export const ContextMenuItem: React.FC<{
  onClick: () => void;
  variant?: 'default' | 'danger';
  icon?: React.ReactNode;
  disabled?: boolean;
  /** The currently selected value — the selected tint (like DropdownItem). */
  selected?: boolean;
  /** Non-interactive node after the label (a Check glyph, etc.). */
  trailing?: React.ReactNode;
  children: React.ReactNode;
}> = ({ onClick, variant = 'default', icon, disabled = false, selected = false, trailing, children }) => {
  const api = useMenuHighlight();
  const apiRef = useRef(api);
  apiRef.current = api;
  const selfRef = useRef<MenuHighlightItem | null>(null);

  useEffect(() => {
    const self: MenuHighlightItem = { label: menuItemLabel(children), activate: () => { if (!disabled) onClick(); } };
    selfRef.current = self;
    return apiRef.current?.register(self);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const myIndex = api && selfRef.current ? api.items.indexOf(selfRef.current) : -1;
  const highlighted = !disabled && myIndex >= 0 && myIndex === api!.highlightedIndex;

  return (
    <button
      onClick={disabled ? undefined : onClick}
      onPointerEnter={() => { if (!disabled && api && myIndex >= 0) api.setHighlighted(myIndex, 'pointer'); }}
      onTouchStart={() => {}}
      className={`w-full text-left ${CTX_ITEM} flex items-center gap-2 rounded cursor-pointer ${
        disabled ? 'opacity-40 cursor-default' :
        variant === 'danger' ? 'ui-item ui-item-danger' : 'ui-item'
      } ${selected ? 'ui-item-selected' : ''} ${highlighted ? 'ui-item-highlighted' : ''}`}
    >
      {icon}
      <span className="flex-1 truncate">{children}</span>
      {trailing && <span className="shrink-0 ml-1 flex items-center">{trailing}</span>}
    </button>
  );
};

export const ContextMenuDivider: React.FC = () => (
  <div className="ui-sep my-1" />
);

export interface ContextMenuSubProps {
  id: string;
  label: string;
  icon?: React.ReactNode;
  side?: 'left' | 'right';
  children: React.ReactNode;
}

/**
 * Nested submenu inside a ContextMenu — the DropdownSubmenu pattern without
 * Radix: the SubmenuContext CHAIN (nested subs coexist; closing a parent
 * truncates its children), a per-sub highlight surface, the morph anchored
 * to the trigger row, keys + wheel + the key lock (the open sub owns the
 * keys). The panel is positioned at the row's right edge and clamped to the
 * viewport; hover transitions use a short pointer-grace so moving through
 * the trigger into the panel never closes it.
 */
export const ContextMenuSub: React.FC<ContextMenuSubProps> = ({ id, label, icon, side = 'right', children }) => {
  const { chain, setChain, morph } = useContext(SubmenuContext);
  const subOpen = chain.includes(id);
  const [persisted, setPersisted] = useState(subOpen);
  const parentApi = useMenuHighlight();
  const subHighlight = useMenuHighlightState();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const openTimerRef = useRef<number>(0);
  const closeTimerRef = useRef<number>(0);

  useEffect(() => {
    if (subOpen) setPersisted(true);
  }, [subOpen]);
  useEffect(() => () => { window.clearTimeout(openTimerRef.current); window.clearTimeout(closeTimerRef.current); }, []);

  const openSub = () => setChain(c => c.includes(id) ? c : [...c, id]);
  const closeSub = () => setChain(c => { const i = c.indexOf(id); return i >= 0 ? c.slice(0, i) : c; });

  /* The trigger row registers in the PARENT surface's highlight (arrows and
     typeahead reach it; Enter opens the sub). */
  const parentApiRef = useRef(parentApi);
  parentApiRef.current = parentApi;
  const selfRef = useRef<MenuHighlightItem | null>(null);
  useEffect(() => {
    const self: MenuHighlightItem = { label, activate: openSub };
    selfRef.current = self;
    return parentApiRef.current?.register(self);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const myIndex = parentApi && selfRef.current ? parentApi.items.indexOf(selfRef.current) : -1;
  const rootHighlighted = myIndex >= 0 && myIndex === parentApi!.highlightedIndex;

  const anchor = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { left: r.left, top: r.top, width: r.width, height: r.height };
  }, []);

  const setContentRef = useOverlayMorph({
    visible: subOpen,
    morph,
    anchor,
    onClosed: () => setPersisted(false),
  });
  const keysHandlerRef = useRef<(e: KeyboardEvent) => void>(() => {});
  const wheelHandlerRef = useRef<(e: WheelEvent) => void>(() => {});
  const lockHandlerRef = useRef<(e: KeyboardEvent) => void>(() => {});
  useMenuKeys(subOpen, subHighlight, keysHandlerRef);
  useMenuWheel(subOpen, wheelHandlerRef);
  useMenuKeyLock(subOpen, subHighlight, keysHandlerRef, subRef, false, lockHandlerRef);
  const lockDocRef = useRef<Document | null>(null);
  const setSubComposedRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      node.addEventListener('keydown', keysHandlerRef.current, { capture: true });
      node.addEventListener('wheel', wheelHandlerRef.current as EventListener, { passive: false } as AddEventListenerOptions);
      const doc = node.ownerDocument;
      lockDocRef.current = doc;
      doc.addEventListener('keydown', lockHandlerRef.current, { capture: true });
    } else {
      lockDocRef.current?.removeEventListener('keydown', lockHandlerRef.current, { capture: true });
      lockDocRef.current = null;
    }
    subRef.current = node;
    setContentRef(node);
  }, [setContentRef]);

  /* Keep the highlighted row visible when arrows/typeahead scroll it out. */
  useLayoutEffect(() => {
    if (!subOpen || subHighlight.highlightedIndex < 0) return;
    const row = subRef.current?.querySelector<HTMLElement>(`[data-ei="${subHighlight.highlightedIndex}"]`);
    row?.scrollIntoView({ block: 'nearest' });
  }, [subOpen, subHighlight.highlightedIndex]);

  /* Panel position: at the trigger row's right edge (left edge when
     side="left"), clamped to the viewport. Static like the context menu. */
  const [pos, setPos] = useState<{ top: number; left: number; maxH: number } | null>(null);
  useLayoutEffect(() => {
    if (!subOpen || !triggerRef.current || !subRef.current) return;
    const t = triggerRef.current.getBoundingClientRect();
    const p = subRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let left = side === 'right' ? t.right + 2 : t.left - p.width - 2;
    left = Math.max(MARGIN, Math.min(left, vw - p.width - MARGIN));
    const top = Math.max(MARGIN, Math.min(t.top, vh - p.height - MARGIN));
    const maxH = Math.max(120, vh - top - MARGIN);
    setPos({ top, left, maxH });
  }, [subOpen, side]);

  const enterTrigger = () => {
    window.clearTimeout(closeTimerRef.current);
    if (parentApi && myIndex >= 0) parentApi.setHighlighted(myIndex, 'pointer');
    if (!subOpen) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = window.setTimeout(openSub, 100);
    }
  };
  const leaveTrigger = (e: React.PointerEvent) => {
    window.clearTimeout(openTimerRef.current);
    const to = e.relatedTarget as Node | null;
    if (subRef.current && to && subRef.current.contains(to)) return;
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(closeSub, 150);
  };
  const enterSub = () => window.clearTimeout(closeTimerRef.current);
  const leaveSub = () => {
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(closeSub, 150);
  };

  const triggerCls = `w-full text-left ${CTX_ITEM} flex items-center gap-2 rounded cursor-pointer select-none justify-between ui-item${rootHighlighted ? ' ui-item-highlighted' : ''}`;

  return (
    <>
      <button
        ref={triggerRef}
        data-ei={myIndex >= 0 ? myIndex : undefined}
        type="button"
        onPointerEnter={enterTrigger}
        onPointerLeave={leaveTrigger}
        onPointerDown={() => { window.clearTimeout(openTimerRef.current); if (subOpen) closeSub(); else openSub(); }}
        onTouchStart={() => {}}
        className={triggerCls}
      >
        {side === 'left' && <ChevronRight className={`w-3 h-3 ui-icon rotate-180 order-first`} />}
        <span className="flex items-center gap-2">
          {icon && <span className={`ui-icon shrink-0`}>{icon}</span>}
          {label}
        </span>
        {side === 'right' && <ChevronRight className={`w-3 h-3 ui-icon`} />}
      </button>
      {(subOpen || persisted) && (
        <div
          ref={setSubComposedRef}
          className={`fixed ui-menu rounded-lg shadow-xl z-[9999] p-1 flex flex-col select-none overflow-y-auto scrollbar-custom min-w-[160px] ${CTX_TEXT}`}
          style={{ top: pos?.top ?? 0, left: pos?.left ?? 0, maxHeight: pos?.maxH ?? 320, visibility: pos ? 'visible' : 'hidden', touchAction: 'manipulation' }}
          onPointerEnter={enterSub}
          onPointerLeave={leaveSub}
        >
          <MenuHighlightContext.Provider value={subHighlight}>
            {children}
          </MenuHighlightContext.Provider>
        </div>
      )}
    </>
  );
};

export default ContextMenu;
