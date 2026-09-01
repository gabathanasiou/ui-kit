"use client";
import { Mention } from '@tiptap/extension-mention';
import { NodeViewProps, NodeViewWrapper, ReactNodeViewRenderer, mergeAttributes } from '@tiptap/react';
import { NodeSelection } from '@tiptap/pm/state';
import React from 'react';

// TipTap Token atom: `{{key}}` in stored HTML becomes an engine-native
// inline atom (chip) in the editor. The atom serializes back to the PLAIN text
// `{{key}}` (bare-string renderHTML → ProseMirror emits a text node), so
// storage stays byte-compatible with plain-text tokens.
//
// Selection is native: `selectable: true` (Mention's v3 default is false) so
// clicking a chip selects the whole atom — ⌫ deletes it, arrows skip it, the
// formatting toolbar targets it. TipTap's ReactNodeView handles selection
// updates (adds `ProseMirror-selectednode` + the `selected` prop).

/** A token item resolved by the consumer: opaque `key` + display meta. */
export interface TokenMeta {
  label: string;
  color: { text: string; bg: string };
}

/** Suggestion item contract for the `@` autocomplete. */
export interface TokenItem {
  key: string;
  label: string;
  color: { text: string; bg: string };
  group?: string;
}

const FALLBACK_COLOR = { text: '#52525b', bg: 'rgba(82, 82, 91, 0.12)' };

interface TokenAttrs {
  field: string | null;
}

/** Chip renderer for a token atom — label on the resolved color. */
export const TokenChipView: React.FC<NodeViewProps> = ({ node, selected, extension, editor, view, getPos }) => {
  const field = (node.attrs as TokenAttrs).field ?? '';
  const options = extension.options as { resolve?: (key: string) => TokenMeta | null; onTokenClick?: (key: string, rect: DOMRect, pos: number) => void };
  const meta = options.resolve?.(field) ?? null;
  const color = meta?.color ?? FALLBACK_COLOR;
  const label = meta?.label ?? `{{${field}}}`;
  return (
    <NodeViewWrapper
      as="span"
      data-type="token"
      className={`rt-token inline-block ${selected ? 'rt-token-selected' : ''}`}
      style={{
        background: color.text,
        color: '#fff',
        borderRadius: 10,
        padding: '0 6px',
        margin: '0 2px',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        fontSize: 'inherit',
        lineHeight: 'inherit',
      }}
      onMouseDown={(e: React.MouseEvent) => {
        // Clicking the chip selects the whole atom (native NodeSelection) so
        // ⌫ deletes it, typing replaces it, and the formatting toolbar
        // targets it. preventDefault keeps PM's default caret placement from
        // landing inside the chip.
        if (e.button !== 0 || !editor.isEditable) return;
        e.preventDefault();
        if (!editor.isFocused) editor.commands.focus();
        const pos = typeof getPos === 'function' ? getPos() : null;
        if (pos == null) return;
        const $pos = view.state.doc.resolve(pos);
        const target = $pos.nodeAfter;
        if (target && NodeSelection.isSelectable(target)) {
          view.dispatch(view.state.tr.setSelection(new NodeSelection($pos)));
        }
        // Chip-level click callback (consumer UX: token properties popover).
        // Fires after selection so the editor is in a stable state.
        options.onTokenClick?.(field, (e.currentTarget as HTMLElement).getBoundingClientRect(), pos);
      }}
    >
      {label}
    </NodeViewWrapper>
  );
};

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

export interface TokenExtensionOptions {
  /** Resolves a token key to its display meta (label + color). */
  resolve?: ((key: string) => TokenMeta | null) | null;
  /** Fired when a chip is clicked: full key (may carry `|`-options), the
   *  chip's viewport rect, and the atom's document position (for targeted
   *  replacement). */
  onTokenClick?: ((key: string, rect: DOMRect, pos: number) => void) | null;
}

/** The Token extension — an atom with a native React chip view. */
export const Token = Mention.extend<TokenExtensionOptions>({
  name: 'token',
  selectable: true,
  addOptions() {
    return {
      ...this.parent?.(),
      resolve: null as ((key: string) => TokenMeta | null) | null,
      onTokenClick: null as ((key: string, rect: DOMRect, pos: number) => void) | null,
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(TokenChipView);
  },
  addAttributes() {
    return {
      field: {
        default: null,
        parseHTML: (el: HTMLElement) => el.getAttribute('data-field'),
        renderHTML: (attrs: Record<string, unknown>) => (attrs.field ? { 'data-field': attrs.field } : {}),
      },
      label: {
        default: null,
        parseHTML: (el: HTMLElement) => el.getAttribute('data-label'),
        renderHTML: (attrs: Record<string, unknown>) => (attrs.label ? { 'data-label': attrs.label } : {}),
      },
    };
  },
  parseHTML() {
    return [{ tag: 'span[data-type="token"]' }];
  },
  // Span wrapper + save-strip: this PM version has no bare-string spec
  // shortcut, so the atom serializes as `<span data-type="token">` and
  // `stripTokenWrappers` regex-strips it back to plain `{{key}}` on save —
  // the stripped output is the storage contract.
  renderHTML({ node, HTMLAttributes }) {
    return ['span', mergeAttributes({ 'data-type': 'token' }, HTMLAttributes), `{{${node.attrs.field ?? ''}}}`];
  },
  renderText({ node }) {
    return `{{${node.attrs.field ?? ''}}}`;
  },
});
