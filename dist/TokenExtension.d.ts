import { NodeViewProps } from '@tiptap/react';
import React from 'react';
/** A token item resolved by the consumer: opaque `key` + display meta. */
export interface TokenMeta {
    label: string;
    color: {
        text: string;
        bg: string;
    };
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
/** Strip the (defensive) `<span data-type="token">…</span>` wrappers back to
 *  plain `{{key}}` text before the sanitizer runs. A no-op when renderHTML
 *  already emits bare text — kept so BOTH serialization paths verify against
 *  the same storage contract. */
export declare function stripTokenWrappers(html: string): string;
/** Pre-process stored HTML before `useEditor` init: plain `{{key}}` text →
 *  `<span data-type="token">` so the Token extension's parseHTML matches.
 *  Caveat: the regex can match inside attribute values of exotic pasted HTML —
 *  the sanitizer normalizes on save, so this is acceptable. */
export declare function preprocessTokenHtml(html: string): string;
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
