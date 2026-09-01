"use client";
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { useCoarseScale, coarsePx } from './device';
import { useCurrentWindow } from './popout';
import { useOverlayMorph } from './overlayMorph';
import { registerOverlayClose } from './overlayRegistry';
import DropdownSubmenu from './DropdownSubmenu';
import {
  DropdownThemeContext, SubmenuContext, MenuHighlightContext, useMenuHighlight,
  useMenuHighlightState, useMenuKeys, useMenuKeyLock, useMenuWheel, menuItemLabel,
} from './DropdownMenu';
import type { MenuHighlightItem } from './DropdownMenu';

const MARGIN = 8;

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
 * Context menu positioned at (x, y) for BOTH desktop right-click and touch
 * long-press (the long-press provider dispatches a synthetic `contextmenu`
 * event). Structurally identical to the kit DropdownMenu — the same Radix
 * primitives + the shared single-highlight/keyboard/key-lock/wheel/morph
 * layers — and its submenus ARE `DropdownSubmenu` (Radix side-placement,
 * portaled: no transformed-ancestor trap, native pointer grace).
 *
 * Press-point anchored and STATIC (it does not follow scrolling); the close
 * morph shrinks back to where the menu was opened.
 */
export const ContextMenu: React.FC<ContextMenuProps> = ({ open, x, y, onClose, children, containerRef, morph = true }) => {
  const scale = useCoarseScale();
  const CTX_TEXT_FS = coarsePx(12, 14, scale);
  const contentElRef = useRef<HTMLDivElement | null>(null);
  const currentWindow = useCurrentWindow();
  /* The Radix portal content mounts in a LATER commit than the open flip —
     the viewport clamp must wait for it (a stale clamp leaves the menu
     cropped at the viewport edge). */
  const [contentReady, setContentReady] = useState(false);
  const [subChain, setSubChain] = useState<string[]>([]);
  const [keyboardOpenedSub, setKeyboardOpenedSub] = useState<string | null>(null);
  const highlight = useMenuHighlightState();

  /* One open overlay at a time: opening the context menu closes any open
     dropdown first. Also RESET the single-highlight on open: the highlight
     state lives in this component (parents toggle `open` on an always-mounted
     ContextMenu), and a stationary cursor fires no pointerenter for the
     newly-opened menu (Safari never fires enter for elements that appear
     under a still cursor) — without the reset, the previously selected item
     stays lit on every reopen. The same reset DropdownMenu performs with
     initialHighlightIndex. */
  useEffect(() => {
    if (!open) return;
    highlight.setHighlighted(-1, 'keyboard');
    return registerOverlayClose(onClose);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, onClose]);

  /* Capture the press point at OPEN — the parent resets x/y to 0 when it
     clears the state on close, and the close morph's anchor must still point
     at where the menu was opened (never the top-left corner). */
  const pressRef = useRef({ left: x, top: y });
  if (open) pressRef.current = { left: x, top: y };
  const anchor = useCallback(() => ({ left: pressRef.current.left, top: pressRef.current.top, width: 0, height: 0 }), []);

  /* Unmount-driven CLOSE (the panel pattern): the menu vanishes the moment
     the parent clears it — no lingering fade that reads as a delay — and the
     reverse morph plays on a pinned clone shrinking to the press point. */
  const setContentRef = useOverlayMorph({
    visible: true,
    morph,
    anchor,
    cloneOnUnmount: true,
  });

  /* Same wiring as DropdownMenu: keys/wheel/lock handlers attached in the
     composed ref (the content mounts in a later commit than the open flip). */
  const keysHandlerRef = useRef<(e: KeyboardEvent) => void>(() => {});
  const wheelHandlerRef = useRef<(e: WheelEvent) => void>(() => {});
  const lockHandlerRef = useRef<(e: KeyboardEvent) => void>(() => {});
  useMenuKeys(open, highlight, keysHandlerRef);
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
    } else {
      lockDocRef.current?.removeEventListener('keydown', lockHandlerRef.current, { capture: true });
      lockDocRef.current = null;
    }
    contentElRef.current = node;
    setContentReady(!!node);
    setContentRef(node);
  }, [setContentRef]);

  /* Position at the press point, clamped to the viewport (or container). */
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  useLayoutEffect(() => {
    if (!open || !contentReady || !contentElRef.current) return;
    /* offsetWidth/offsetHeight are the UNTRANSFORMED layout dims — the open
       morph scales the box (0.94), and clamping with the scaled rect would
       leave the menu overflowing once it settles at full size. */
    const el = contentElRef.current;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const containerRect = containerRef?.current?.getBoundingClientRect();
    const vw = containerRect ? containerRect.right : currentWindow?.innerWidth ?? 0;
    const vh = containerRect ? containerRect.bottom : currentWindow?.innerHeight ?? 0;
    const minLeft = containerRect ? containerRect.left : 0;
    const minTop = containerRect ? containerRect.top : 0;
    let top = Math.max(minTop + MARGIN, pressRef.current.top);
    let left = Math.max(minLeft + MARGIN, pressRef.current.left);
    if (left + w > vw) left = vw - w - MARGIN;
    if (top + h > vh) top = Math.max(minTop + MARGIN, vh - h - MARGIN);
    setPos({ left, top });
  }, [open, contentReady, x, y, containerRef]);

  if (!open) return null;

  /* The hidden full-viewport trigger gives the Radix root its context (the
     app controls `open`; the trigger's toggle also acts as the outside
     click-to-close path alongside the content's dismissable layer). */
  return (
    <RadixDropdownMenu.Root open={open} onOpenChange={(o) => { if (!o) onClose(); }} modal={false}>
      <RadixDropdownMenu.Trigger asChild>
        <span style={{ position: 'fixed', inset: 0 }} aria-hidden="true" />
      </RadixDropdownMenu.Trigger>
      <RadixDropdownMenu.Portal>
        <DropdownThemeContext.Provider value="light">
        <SubmenuContext.Provider value={{ chain: subChain, setChain: setSubChain, morph, keyboardOpened: keyboardOpenedSub, setKeyboardOpened: setKeyboardOpenedSub }}>
          <MenuHighlightContext.Provider value={highlight}>
            <RadixDropdownMenu.Content
              ref={setComposedRef}
              data-theme="light"
              data-ui-fixed
              className="fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom"
              style={{ fontSize: CTX_TEXT_FS, left: pos?.left ?? pressRef.current.left, top: pos?.top ?? pressRef.current.top, touchAction: 'manipulation' }}
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
  const scale = useCoarseScale();
  const CTX_ITEM_STYLE = { padding: `${coarsePx(8, 12, scale)}px ${coarsePx(12, 16, scale)}px`, fontSize: coarsePx(12, 14, scale) };
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
    <RadixDropdownMenu.Item
      data-ei={myIndex >= 0 ? myIndex : undefined}
      onClick={disabled ? undefined : onClick}
      onPointerEnter={() => { if (!disabled && api && myIndex >= 0) api.setHighlighted(myIndex, 'pointer'); }}
      onTouchStart={() => {}}
      disabled={disabled}
      style={CTX_ITEM_STYLE} className={`w-full text-left flex items-center gap-2 rounded cursor-pointer ${
        disabled ? 'opacity-40 cursor-default' :
        variant === 'danger' ? 'ui-item ui-item-danger' : 'ui-item'
      } ${selected ? 'ui-item-selected' : ''} ${highlighted ? 'ui-item-highlighted' : ''}`}
    >
      {icon}
      <span className="flex-1 truncate">{children}</span>
      {trailing && <span className="shrink-0 ml-1 flex items-center">{trailing}</span>}
    </RadixDropdownMenu.Item>
  );
};

export const ContextMenuDivider: React.FC = () => (
  <RadixDropdownMenu.Separator className="ui-sep my-1" />
);

export interface ContextMenuSubProps {
  id: string;
  label: string;
  icon?: React.ReactNode;
  width?: string;
  side?: 'left' | 'right';
  children: React.ReactNode;
}

/** Nested context submenu — literally the kit `DropdownSubmenu` (the Radix
 *  side-placement + the SubmenuContext chain + the shared highlight/keys/
 *  lock/morph layers), lifted above the context menu. */
export const ContextMenuSub: React.FC<ContextMenuSubProps> = (props) => (
  <DropdownSubmenu {...props} width={props.width || 'min-w-[180px]!'} contentClassName="z-[10000]" />
);

export default ContextMenu;
