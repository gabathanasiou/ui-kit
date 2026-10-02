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
