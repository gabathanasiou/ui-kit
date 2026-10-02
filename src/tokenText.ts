"use client";
/* Plain-text `{{key}}` ⇄ `<span data-type="token">` conversion — the storage
   contract for rich-text tokens. Extracted from TokenExtension so the
   conversion is node-testable without pulling TipTap/React in. The editor's
   serialize/renderHTML paths stay byte-compatible with plain `{{key}}`. */

/** Strip the (defensive) `<span data-type="token">…</span>` wrappers back to
 *  plain `{{key}}` text before the sanitizer runs. A no-op when renderHTML
 *  already emits bare text — kept so BOTH serialization paths verify against
 *  the same storage contract. */
export function stripTokenWrappers(html: string): string {
  return html.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, '{{$1}}');
}

/** Pre-process stored HTML before `useEditor` init: plain `{{key}}` text →
 *  `<span data-type="token">` so the Token extension's parseHTML matches.
 *  Caveat: the regex can match inside attribute values of exotic pasted HTML —
 *  the sanitizer normalizes on save, so this is acceptable. */
export function preprocessTokenHtml(html: string): string {
  return html.replace(/\{\{([^{}]+)\}\}/g, (_m, field: string) =>
    `<span data-type="token" data-field="${field}">{{${field}}}</span>`);
}
