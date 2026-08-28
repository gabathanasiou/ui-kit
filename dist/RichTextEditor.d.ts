import React from 'react';
import { type TokenItem, type TokenMeta } from './TokenExtension';
export interface RichTextEditorHandle {
    exec: (command: string, value?: string) => void;
    focus: () => void;
    /** Inserts a `{{key}}` token node at the caret. */
    insertToken: (key: string) => void;
    /** Rewrites the LAST-SELECTED token chip's key (e.g. adding `|`-item
     *  options) — targets exactly the chip reported via `onSelectionChange`,
     *  never a sibling with the same key. Repeatable: the target position is
     *  remapped through transactions, and no focus steal (panel inputs keep
     *  their focus while the chip updates live). */
    replaceToken: (newKey: string) => void;
}
/** Formatting state at the caret/selection — drives the toolbar's toggle lighting. */
export interface RichTextState {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    strike: boolean;
    link: boolean;
    color: string;
}
export declare const RICH_TEXT_STATE_IDLE: RichTextState;
export interface RichTextEditorProps {
    value: string;
    onChange: (html: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    /** Fired whenever the caret/selection moves or formatting changes. */
    onStateChange?: (state: RichTextState) => void;
    /** Resolves a stored token key to its chip meta (label + color). */
    resolveToken?: (key: string) => TokenMeta | null;
    /** Items for the `@` token autocomplete, filtered by the current query. */
    suggestionItems?: (query: string) => TokenItem[];
    /** Fired when a token chip is clicked: its key, viewport rect and document
     *  position. Pair with the handle's `replaceToken` for targeted edits. */
    onTokenClick?: (key: string, rect: DOMRect, pos: number) => void;
    /** Fired whenever the selected-chip state CHANGES: the chip's key + doc
     *  position when a token chip is selected, or `null` when the selection
     *  leaves the chip. Drives target-aware chip property editors — the panel
     *  shows while a chip is selected and hides on deselect. */
    onSelectionChange?: (sel: {
        key: string;
        pos: number;
    } | null) => void;
}
declare const RichTextEditor: React.ForwardRefExoticComponent<RichTextEditorProps & React.RefAttributes<RichTextEditorHandle>>;
export default RichTextEditor;
