import React from 'react';
export type DropdownTheme = 'light' | 'dark' | 'blue';
export declare const DropdownThemeContext: React.Context<DropdownTheme>;
export declare const useDropdownTheme: () => DropdownTheme;
/** Shared row sizing for menu items AND item-manager rows (padding + font +
 *  line-height, coarse-scaled) — ONE knob to resize every dropdown row
 *  globally. Consumers spread it as an inline style. */
export declare function useItemSize(): {
    padding: string;
    fontSize: string;
    lineHeight: string;
};
export declare function getDropdownClasses(theme?: DropdownTheme): {
    itemDefault: string;
    itemDanger: string;
    icon: string;
    rightAction: string;
    separator: string;
    headerPad: string;
    headerText: string;
    itemPad: string;
    input: string;
    rowHoverBg: string;
    rowActiveBg: string;
    rowActiveText: string;
    rowText: string;
    rowTextHover: string;
    btnBase: string;
    btnActive: string;
    btnDanger: string;
    btnDangerActive: string;
    btnDisabled: string;
    editConfirm: string;
    editCancel: string;
    btnSize: string;
    btnIcon: string;
};
/** Text a typeahead letter-jump matches against — walks one element level
 *  (labels may be wrapped in a span; icons live in the `icon` prop). */
export declare function menuItemLabel(children: React.ReactNode): string;
export declare const SubmenuContext: React.Context<{
    chain: string[];
    setChain: (fn: (c: string[]) => string[]) => void;
    morph: boolean;
    /** Set when the KEYBOARD opened a sub (ArrowRight/Enter on a trigger row) —
       pointer-opened subs must NOT pre-light their first item. */
    keyboardOpened: string | null;
    setKeyboardOpened: (id: string | null) => void;
}>;
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
export declare const MenuHighlightContext: React.Context<MenuHighlightApi | null>;
export declare const useMenuHighlight: () => MenuHighlightApi | null;
/** Live query for `searchable` menus. `DropdownItem` rows read this to hide
 *  themselves when filtered out; the menu owns the state (the input renders in
 *  the kit's DropdownMenu). */
export declare const MenuSearchContext: React.Context<{
    query: string;
    setQuery: (q: string) => void;
}>;
export declare const useMenuSearch: () => {
    query: string;
    setQuery: (q: string) => void;
};
export declare function useMenuHighlightState(filter?: (item: MenuHighlightItem) => boolean): MenuHighlightApi;
/** Single-highlight row registration for a surface item — the SHARED contract
 *  behind both `DropdownItem` (Radix Item) and the rich-text `@` autocomplete
 *  rows (rendered outside a Radix menu, in an isolated root). Registers into
 *  the NEAREST MenuHighlightContext on mount (registration order = index);
 *  returns the row's index + whether it is the lit row + a pointer-hover
 *  setter. Menus without a provider get `api: null` → unlit, unregistered
 *  rows (bespoke surfaces keep their own behavior). */
export declare function useHighlightRow(opts: {
    label: () => string;
    activate: () => void;
    disabled?: boolean;
}): {
    api: MenuHighlightApi | null;
    myIndex: number;
    highlighted: boolean;
    setPointer: (idx: number) => void;
};
/** Keyboard for a highlight surface: arrows move the single index, Enter/Space
 *  activate the highlighted item, letter typeahead jumps to the first match
 *  (500ms prefix buffer). The handler is created ONCE per hook instance and
 *  ATTACHED by the content's composed ref — the Radix portal content mounts
 *  in a LATER commit than the `open` flip, so a plain [open] effect would
 *  miss it. Registered at CAPTURE with stopImmediatePropagation so it always
 *  beats Radix's own roving focus/typeahead (which would light a second row).
 *  Menus WITHOUT registered highlight items (ItemManagerDropdown's bespoke
 *  rows) keep Radix's native keyboard handling untouched. */
export declare function useMenuKeys(active: boolean, api: MenuHighlightApi, handlerRef: React.MutableRefObject<(e: KeyboardEvent) => void>, opts?: {
    onCloseSub?: () => void;
    onFieldKey?: (e: KeyboardEvent) => boolean;
}): void;
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
export declare function useMenuKeyLock(active: boolean, api: MenuHighlightApi, keysHandlerRef: React.MutableRefObject<(e: KeyboardEvent) => void>, contentRef: React.RefObject<HTMLElement | null>, standDown: boolean, lockHandlerRef: React.MutableRefObject<(e: KeyboardEvent) => void>, opts?: {
    ignoreFields?: boolean;
}): void;
/** Manual wheel scrolling for portaled menu content (a Modal's scroll lock
 *  preventDefaults wheels outside the dialog; the v0.1.52 capture interceptor
 *  in useOverlayMorph already stops propagation for the content — this is the
 *  actual scroll, belt and suspenders with the interceptor). Attached by the
 *  content's composed ref (same later-commit reason as useMenuKeys); the
 *  handler is created ONCE so re-attaches during ref churn stay deduped. */
export declare function useMenuWheel(active: boolean, handlerRef: React.MutableRefObject<(e: WheelEvent) => void>): void;
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
export default function DropdownMenu({ open, onClose, onOpenChange, trigger, align, width, theme, children, morph, contentClassName, initialHighlightIndex, searchable, searchPlaceholder, searchFilter, searchValue, onSearchValueChange, }: DropdownMenuProps): React.JSX.Element;
export interface ItemManagerDropdownProps {
    open: boolean;
    onClose: (open: boolean) => void;
    items: {
        id: string;
        name: string;
    }[];
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
    itemRender?: (item: {
        id: string;
        name: string;
    }) => React.ReactNode;
    /** Passed through to DropdownMenu (trigger-anchored morph, default true). */
    morph?: boolean;
    /** Passed through to DropdownMenu (popup content classes, e.g. z-index). */
    contentClassName?: string;
}
export declare function ItemManagerDropdown({ open, onClose, items, activeId, onSelect, onRename, onDuplicate, onDelete, onCreate, onImport, onExport, onReset, onTrash, closeOnSelect, readOnly, theme, align, label, header, itemLabel, trigger, minItems, itemRender, morph, contentClassName, }: ItemManagerDropdownProps): React.JSX.Element;
