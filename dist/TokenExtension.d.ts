import { NodeViewProps } from '@tiptap/react';
import React from 'react';
export { stripTokenWrappers, preprocessTokenHtml } from './tokenText';
/** A token item resolved by the consumer: opaque `key` + display meta. */
export interface TokenMeta {
    label: string;
    color: {
        text: string;
        bg: string;
    };
    /** Render the label as a nested lighter bubble INSIDE the chip's pill (an
     *  attached attribute reads as `Bob (Phone)`), instead of plain text. */
    nested?: boolean;
}
/** Suggestion item contract for the `@` autocomplete. */
export interface TokenItem {
    key: string;
    label: string;
    color: {
        text: string;
        bg: string;
    };
    group?: string;
}
/** Chip renderer for a token atom — label on the resolved color. */
export declare const TokenChipView: React.FC<NodeViewProps>;
export interface TokenExtensionOptions {
    /** Resolves a token key to its display meta (label + color). */
    resolve?: ((key: string) => TokenMeta | null) | null;
    /** Fired when a chip is clicked: full key (may carry `|`-options), the
     *  chip's viewport rect, and the atom's document position (for targeted
     *  replacement). */
    onTokenClick?: ((key: string, rect: DOMRect, pos: number) => void) | null;
}
/** The Token extension — an atom with a native React chip view. */
export declare const Token: import("@tiptap/core").Node<TokenExtensionOptions, any>;
