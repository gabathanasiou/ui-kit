"use client";
import React, { useEffect, useRef } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { SuggestionOptions, SuggestionProps, SuggestionKeyDownProps } from '@tiptap/suggestion';
import type { TokenItem } from './TokenExtension';
import { MenuHighlightContext, useMenuHighlightState, useHighlightRow, getDropdownClasses } from './DropdownMenu';
import { useCoarseScale, coarsePx } from './device';
import type { MenuHighlightApi } from './DropdownMenu';

// Caret-anchored token autocomplete for the rich text editor, adapted to the
// @tiptap/suggestion render contract. The plugin filters `items` between
// onStart/onUpdate (items callback = consumer's suggestionItems); this
// renderer only renders the rows, tracks the highlight, and commits via
// `props.command`. Positioning is managed by the plugin's `props.mount`
// (Floating UI, flips above/below automatically, appended to document.body).

export type TokenSuggestionProps = SuggestionProps<TokenItem, { field: string }>;

interface PopupState {
  holder: HTMLElement;
  root: Root;
  unmount: (() => void) | null;
  props: TokenSuggestionProps | null;
  api: MenuHighlightApi | null;
}

const MAX_H = 240;
const W = 280;

/* Renders the autocomplete through the kit's SHARED dropdown primitives — the
   same single-highlight model (useMenuHighlightState/useHighlightRow) and the
   .ui-menu / .ui-item tokens as the real menus — instead of bespoke classes.
   The popup is an isolated React root (the @tiptap/suggestion render
   contract), so it provides its own MenuHighlightContext (the api is exposed
   to the plugin's keydown via onApi); DropdownItem itself is Radix-bound, so
   these rows use the shared `useHighlightRow` contract + token classes. */
const TokenPopup: React.FC<{
  props: TokenSuggestionProps;
  onApi: (api: MenuHighlightApi) => void;
}> = ({ props, onApi }) => {
  const api = useMenuHighlightState();
  const onApiRef = useRef(onApi);
  onApiRef.current = onApi;
  useEffect(() => { onApiRef.current(api); }, [api]);
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>('.ui-item-highlighted')?.scrollIntoView({ block: 'nearest' });
  }, [api.highlightedIndex]);
  /* Seed the FIRST row highlighted on open (and when a filter empties the
     highlight), so typing `@` shows a lit default like the old popup. */
  useEffect(() => {
    if (props.items.length > 0 && api.highlightedIndex === -1) {
      api.setHighlighted(0, 'keyboard');
    }
  }, [props.items.length, api.highlightedIndex, api]);
  const d = getDropdownClasses('dark');
  return (
    <MenuHighlightContext.Provider value={api}>
      <div
        className="ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto"
        style={{ width: W, maxHeight: MAX_H }}
        onMouseDown={e => e.preventDefault()}
      >
        <div ref={listRef}>
          {props.items.map(f => (
            <AutocompleteRow
              key={f.key}
              item={f}
              d={d}
              command={() => props.command({ field: f.key })}
            />
          ))}
        </div>
      </div>
    </MenuHighlightContext.Provider>
  );
};

const AutocompleteRow: React.FC<{ item: TokenItem; d: ReturnType<typeof getDropdownClasses>; command: () => void }> = ({ item: f, d, command }) => {
  const { myIndex, highlighted, setPointer } = useHighlightRow({
    label: () => f.label,
    activate: command,
  });
  const scale = useCoarseScale();
  const rowStyle = { padding: `${coarsePx(8, 12, scale)}px ${coarsePx(12, 16, scale)}px`, fontSize: coarsePx(12, 14, scale) };
  return (
    <div
      role="option"
      style={rowStyle}
      className={`w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${d.itemDefault} ${highlighted ? 'ui-item-highlighted' : ''}`}
      onPointerEnter={() => setPointer(myIndex)}
      onClick={command}
    >
      <span className={`${d.icon} shrink-0 flex items-center`}>
        {/* block — the dot is NOT a flex item itself (it's inside the icon
            wrapper), so w-2 h-2 need a display mode to size */}
        <span className="block w-2 h-2 rounded-full" style={{ background: f.color.text }} />
      </span>
      <span className="flex-1 truncate">{f.label}</span>
      {f.group && (
        <span className="shrink-0 text-[9px] uppercase tracking-wider" style={{ color: f.color.text }}>{f.group}</span>
      )}
    </div>
  );
};

/** The suggestion renderer for the Token extension's `@` trigger. */
export const TokenSuggestion: SuggestionOptions<TokenItem, { field: string }>['render'] = () => {
  let popup: PopupState | null = null;

  const render = (props: TokenSuggestionProps) => {
    if (!popup) return;
    popup.props = props;
    popup.holder.style.display = props.items.length > 0 ? '' : 'none';
    popup.root.render(
      <TokenPopup props={props} onApi={(api) => { popup!.api = api; }} />,
    );
  };

  return {
    onStart(props) {
      const holder = document.createElement('div');
      // Above modals (content z-10000) and kit menus (z-10001) — the editor
      // can live inside a Modal.
      holder.style.zIndex = '10002';
      const root = createRoot(holder);
      popup = { holder, root, unmount: null, props, api: null };
      const unmount = props.mount(holder, {
        // The plugin anchors to the `@`-decoration's start; the caret sits at
        // its END, so shift the popup right by the anchor width — matches the
        // pre-TipTap popup, which anchored exactly at the caret.
        onPosition: ({ x, y, placement, strategy }) => {
          if (!popup) return;
          const rect = popup.props?.clientRect?.();
          const dx = rect && !placement.endsWith('-end') ? rect.width : 0;
          // Use the plugin's strategy (absolute by default — document coords)
          // instead of hard-coding fixed: fixed + absolute coords lands the
          // popup scrollY below the caret (off-screen on a scrolled page).
          holder.style.position = strategy;
          holder.style.left = `${x + dx}px`;
          holder.style.top = `${y}px`;
        },
      });
      popup.unmount = unmount;
      render(props);
    },
    onUpdate(props) {
      if (!popup) return;
      render(props);
    },
    onKeyDown({ event }: SuggestionKeyDownProps) {
      if (!popup?.props || !popup.api) return false;
      const { items, command } = popup.props;
      if (items.length === 0) return false;
      const api = popup.api;
      const key = event.key;
      if (key === 'ArrowDown' || key === 'ArrowUp') {
        event.preventDefault();
        const idx = api.highlightedIndex;
        const dir = key === 'ArrowDown' ? 1 : -1;
        api.setHighlighted((idx + dir + items.length) % items.length, 'keyboard');
        return true;
      }
      if (key === 'Enter' || key === 'Tab') {
        event.preventDefault();
        // The kit's single-highlight model: activate the highlighted
        // DropdownItem (its activate = the row's onClick → command). Fall back
        // to the first row when nothing is highlighted yet (like the old
        // default-to-first behavior).
        const idx = api.highlightedIndex;
        const target = idx >= 0 ? idx : 0;
        const item = api.items[target];
        if (item) item.activate();
        else if (items[target]) command({ field: items[target].key });
        return true;
      }
      return false;
    },
    onExit() {
      if (!popup) return;
      popup.unmount?.();
      popup.root.unmount();
      popup.holder.remove();
      popup = null;
    },
  };
};
