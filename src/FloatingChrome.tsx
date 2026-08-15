"use client";
import React, { useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { useFloating, autoUpdate, offset, flip, shift, type Placement } from '@floating-ui/react-dom';
import { useCurrentWindow } from './popout';

// ---- floating editor chrome (block/table-column/column editors) ----------------
// Portals the panel to the current window's body and positions it with Floating
// UI (strategy fixed) against an anchor inside the block card. `flip`/`shift`
// keep it fully inside the viewport (like the context menus); autoUpdate
// repositions it on scroll/resize and as the panel grows (typing, dropdowns).
// The panel's max size is a CONSTANT window fraction (.ui-chrome CSS) — the
// anchor-relative size middleware was removed because it clamped the panel to
// the space on its own side of the anchor (tiny for a panel above a tall card
// scrolled near the viewport top), which made the panel visibly shrink and
// jump on scroll. The panel keeps a stable size and scrolls internally.
// The inline anchor div (`.ui-chrome-anchor`) must sit inside a `position:
// relative` parent — the parent's rect is the anchor.

/** How the anchor rect is interpreted before positioning:
 *  - 'visible' (default): the anchor rect is intersected with the viewport, so
 *    the panel floats against the VISIBLE part of the anchor. A small fully
 *    visible anchor (text block card) is a no-op; a tall scrolled-out anchor
 *    (huge repeat/ribbon card) behaves like a small one — the panel hovers
 *    right above what's on screen instead of clamping to the viewport edge.
 *  - 'rect': the raw anchor rect is used as-is. */
export type AnchorMode = 'visible' | 'rect';

export interface FloatingChromeProps {
  className: string;
  children: React.ReactNode;
  /** External anchor element (e.g. a table column cell). When omitted, an inline
   *  anchor covering the parent is used. */
  reference?: HTMLElement | null;
  /** Which side of the anchor the panel sits on. Default 'top'. */
  placement?: Placement;
  /** Anchor rect interpretation. Default 'visible'. */
  anchorMode?: AnchorMode;
  /** Gap between the anchor and the panel. Default 8. */
  offset?: number;
}

export const FloatingChrome: React.FC<FloatingChromeProps> = ({
  className, children, reference, placement = 'top', anchorMode = 'visible', offset: offsetVal = 8,
}) => {
  const win = useCurrentWindow();
  const { refs, floatingStyles } = useFloating({
    placement,
    strategy: 'fixed',
    // transform: false — positioning via left/top so the panel never becomes
    // a containing block for `position: fixed` descendants (e.g. the token
    // autocomplete popover inside the block editor), which would double-offset
    // them and clip them against the window.
    transform: false,
    middleware: [
      // Clip the anchor rect to the viewport FIRST so every subsequent
      // middleware (offset/flip/shift) positions against the visible part.
      {
        name: 'visibleAnchor',
        fn: (state) => {
          if (anchorMode !== 'visible') return {};
          const win = state.elements.floating.ownerDocument?.defaultView;
          if (!win) return {};
          const r = state.rects.reference;
          const left = Math.max(r.x, 0);
          const top = Math.max(r.y, 0);
          const right = Math.min(r.x + r.width, win.innerWidth);
          const bottom = Math.min(r.y + r.height, win.innerHeight);
          if (right <= left || bottom <= top) return {};
          // Delta between the raw anchor and its visible sub-rect, applied
          // along the placement axis only (perpendicular axis keeps flip/shift
          // in control — the panel still centers over the visible span).
          const alongX = placement === 'left' ? right - (r.x + r.width) : placement === 'right' ? left - r.x : 0;
          const alongY = placement === 'top' ? top - r.y : placement === 'bottom' ? bottom - (r.y + r.height) : 0;
          return { x: state.x + alongX, y: state.y + alongY };
        },
      },
      offset(offsetVal),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
      // Final hard clamp into the viewport. Floating UI's shift measures the
      // panel's *current* DOM rect (one update behind), so a large scroll jump
      // can leave it off-screen next to a scrolled-out reference — this clamp
      // uses the freshly computed coords + measured size and always wins.
      {
        name: 'viewportClamp',
        fn: (state) => {
          const win = state.elements.floating.ownerDocument?.defaultView;
          if (!win) return {};
          const w = state.rects.floating.width;
          const h = state.rects.floating.height;
          const x = Math.max(8, Math.min(state.x, win.innerWidth - w - 8));
          const y = Math.max(8, Math.min(state.y, win.innerHeight - h - 8));
          return { x, y };
        },
      },
    ],
    whileElementsMounted: autoUpdate,
  });

  useLayoutEffect(() => {
    if (reference) refs.setReference(reference);
  }, [reference, refs]);

  return (
    <>
      {!reference && <div ref={refs.setReference} className="ui-chrome-anchor" aria-hidden />}
      {win && createPortal(
        <div
          ref={refs.setFloating}
          className={`ui-chrome ${className}`}
          style={floatingStyles}
          // Portal events bubble through the React tree back to the block card
          // (React re-dispatches them along the source tree), so a click inside
          // the chrome would otherwise select/move the block underneath.
          onMouseDown={e => e.stopPropagation()}
          onClick={e => e.stopPropagation()}
          onDragStart={e => e.preventDefault()}
        >
          {children}
        </div>,
        win.document.body,
      )}
    </>
  );
};

export default FloatingChrome;
