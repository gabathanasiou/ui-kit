"use client";
import React, { useEffect, useLayoutEffect } from 'react';
import { IS_COARSE } from './device';
import { useCurrentWindow } from './popout';

const MARGIN = 8;
const CTX_ITEM = IS_COARSE ? 'px-4 py-3 text-sm' : 'px-3 py-2 text-xs';
const CTX_TEXT = IS_COARSE ? 'text-sm' : 'text-xs';

/**
 * Context menu positioned at (x, y). Used for BOTH desktop right-click and
 * touch long-press — the long-press provider dispatches a synthetic
 * `contextmenu` event, so this component handles both inputs via one path.
 */
export const ContextMenu: React.FC<{
  open: boolean;
  x: number;
  y: number;
  onClose: () => void;
  children: React.ReactNode;
  containerRef?: React.RefObject<HTMLElement>;
}> = ({ open, x, y, onClose, children, containerRef }) => {
  const menuRef = React.useRef<HTMLDivElement>(null);
  const currentWindow = useCurrentWindow();

  useEffect(() => {
    if (!open || !currentWindow) return;
    const handler = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    currentWindow.addEventListener('pointerdown', handler, true);
    return () => currentWindow.removeEventListener('pointerdown', handler, true);
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

  if (!open) return null;

  return (
    <div
      ref={menuRef}
      data-theme="light"
      className={`fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] ${CTX_TEXT} min-w-[180px] max-h-[85vh] overflow-y-auto`}
      style={{ top: y, left: x, touchAction: 'manipulation' }}
    >
      {children}
    </div>
  );
};

export const ContextMenuItem: React.FC<{
  onClick: () => void;
  variant?: 'default' | 'danger';
  icon?: React.ReactNode;
  disabled?: boolean;
  children: React.ReactNode;
}> = ({ onClick, variant = 'default', icon, disabled = false, children }) => (
  <button
    onClick={disabled ? undefined : onClick}
  onTouchStart={() => {}}
    className={`w-full text-left ${CTX_ITEM} flex items-center gap-2 rounded cursor-pointer ${
      disabled ? 'opacity-40 cursor-default' :
      variant === 'danger' ? 'ui-item ui-item-danger' : 'ui-item'
    }`}
  >
    {icon}
    {children}
  </button>
);

export const ContextMenuDivider: React.FC = () => (
  <div className="ui-sep my-1" />
);

export default ContextMenu;
