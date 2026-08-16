"use client";
import React, { useEffect, useImperativeHandle, useRef } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import { NodeSelection } from '@tiptap/pm/state';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import type { SuggestionOptions } from '@tiptap/suggestion';
import { sanitizeRichText } from './richText';
import { Token, preprocessTokenHtml, stripTokenWrappers, type TokenItem, type TokenMeta } from './TokenExtension';
import { TokenSuggestion } from './RichTextSuggestionPopup';

// TipTap-based rich-text editor for report text blocks. Stored value is
// sanitized HTML (see richText.ts) where `{{key}}` tokens are PLAIN text.
// In the editor, tokens are engine-native atom nodes (see TokenExtension.tsx)
// with a React chip view; the `@` autocomplete is the TipTap suggestion
// plugin reusing the existing popup visuals. Storage is untouched: getHTML
// emits bare `{{key}}` text, so saved projects, print, preview and the canvas
// keep working byte-compatibly.
//
// `{{` is NOT a trigger — only `@` (user decision).
//
// The consumer supplies the token vocabulary via props: `resolveToken` maps a
// stored key to display meta (label + color); `suggestionItems` feeds the `@`
// autocomplete.

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

export const RICH_TEXT_STATE_IDLE: RichTextState = { bold: false, italic: false, underline: false, strike: false, link: false, color: '' };

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
  onSelectionChange?: (sel: { key: string; pos: number } | null) => void;
}

const RichTextEditor = React.forwardRef<RichTextEditorHandle, RichTextEditorProps>(({
  value, onChange, placeholder, disabled, className, onStateChange, resolveToken, suggestionItems, onTokenClick, onSelectionChange,
}, ref) => {
  const resolveRef = useRef(resolveToken);
  resolveRef.current = resolveToken;
  const itemsRef = useRef(suggestionItems);
  itemsRef.current = suggestionItems;
  const onTokenClickRef = useRef(onTokenClick);
  onTokenClickRef.current = onTokenClick;
  const onSelectionChangeRef = useRef(onSelectionChange);
  onSelectionChangeRef.current = onSelectionChange;
  const lastTokenPosRef = useRef<number | null>(null);
  const lastSelChipRef = useRef<{ key: string; pos: number } | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const disabledRef = useRef(disabled);
  disabledRef.current = disabled;
  const onStateChangeRef = useRef(onStateChange);
  onStateChangeRef.current = onStateChange;
  const lastStateRef = useRef<RichTextState | null>(null);

  const reportState = (ed: NonNullable<ReturnType<typeof useEditor>>) => {
    const next: RichTextState = {
      bold: ed.isActive('bold'),
      italic: ed.isActive('italic'),
      underline: ed.isActive('underline'),
      strike: ed.isActive('strike'),
      link: ed.isActive('link'),
      color: (ed.getAttributes('textStyle').color as string | undefined) || '',
    };
    // Skip unchanged reports — onTransaction fires on every transaction
    // (keystrokes, caret moves), and we don't want a setState per event.
    const prev = lastStateRef.current;
    if (prev && prev.bold === next.bold && prev.italic === next.italic && prev.underline === next.underline && prev.strike === next.strike && prev.link === next.link && prev.color === next.color) return;
    lastStateRef.current = next;
    onStateChangeRef.current?.(next);
  };

  /** Reports the token-chip selection state, remapping the replaceToken
   *  target through every transaction so repeated patches stay on the chip
   *  even as its key length changes. */
  const reportSelection = (ed: NonNullable<ReturnType<typeof useEditor>>) => {
    const sel = ed.state.selection;
    let next: { key: string; pos: number } | null = null;
    if (sel instanceof NodeSelection && sel.node.type.name === 'token') {
      next = { key: (sel.node.attrs.field as string) ?? '', pos: sel.from };
      lastTokenPosRef.current = sel.from;
    } else if (lastTokenPosRef.current != null) {
      lastTokenPosRef.current = ed.state.tr.mapping.map(lastTokenPosRef.current);
    }
    const prev = lastSelChipRef.current;
    const same = prev && next && prev.key === next.key && prev.pos === next.pos;
    if ((!prev && !next) || same) return;
    lastSelChipRef.current = next;
    onSelectionChangeRef.current?.(next);
  };

  // Storage form of the editor state: stripped tokens → sanitized; an
  // emptied doc serializes as empty paragraphs — store '' like the old
  // editor so hideBlock/hideText keep working.
  const toStorage = (html: string): string => {
    const clean = sanitizeRichText(stripTokenWrappers(html));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(clean) ? '' : clean;
  };

  // Stable per-props instance: rebuilding the extension mid-session would
  // recreate the editor and drop the caret.
  const tokenExtension = React.useMemo(() => {
    const suggestion: Omit<SuggestionOptions<TokenItem, { field: string }>, 'editor'> = {
      char: '@',
      // default allowedPrefixes (space) — a mid-word `@` does not trigger
      items: ({ query }) => itemsRef.current?.(query) ?? [],
      command: ({ editor: ed, range, props }) => {
        ed.chain().focus().insertContentAt(range, { type: 'token', attrs: { field: props.field } }).run();
      },
      render: TokenSuggestion,
    };
    return Token.configure({
      resolve: resolveRef.current ?? null,
      suggestion,
      onTokenClick: (key: string, rect: DOMRect, pos: number) => {
        lastTokenPosRef.current = pos;
        onTokenClickRef.current?.(key, rect, pos);
      },
    } as unknown as Parameters<typeof Token.configure>[0]);
  }, []);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder }),
      TextStyle,
      Color,
      Underline,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: { target: '_blank', rel: 'noreferrer' },
      }),
      tokenExtension,
    ],
    content: preprocessTokenHtml(value || ''),
    editable: !disabled,
    onUpdate: ({ editor: ed }) => {
      onChangeRef.current(toStorage(ed.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: ed }) => {
      reportState(ed);
      reportSelection(ed);
    },
  });

  // External value sync — only while the editor isn't focused (typing never
  // resets the caret). Compare in storage form so the comparison is a no-op
  // when the editor state already matches the stored value.
  useEffect(() => {
    if (!editor || editor.isFocused) return;
    const current = toStorage(editor.getHTML());
    if (current !== value) {
      lastStateRef.current = null;
      editor.commands.setContent(preprocessTokenHtml(value || ''), { emitUpdate: false });
      reportState(editor);
    }
  }, [value, editor]);

  useEffect(() => {
    if (!editor) return;
    editor.setEditable(!disabled);
  }, [disabled, editor]);

  // Initial state report (mount/remount — e.g. switching blocks or surfaces).
  useEffect(() => {
    if (!editor) return;
    lastStateRef.current = null;
    reportState(editor);
    reportSelection(editor);
  }, [editor]);

  useImperativeHandle(ref, () => ({
    exec: (command: string, execValue?: string) => {
      if (!editor || disabledRef.current) return;
      switch (command) {
        case 'bold': editor.chain().focus().toggleBold().run(); break;
        case 'italic': editor.chain().focus().toggleItalic().run(); break;
        case 'underline': editor.chain().focus().toggleUnderline().run(); break;
        case 'strikeThrough': editor.chain().focus().toggleStrike().run(); break;
        case 'foreColor': if (execValue) editor.chain().focus().setColor(execValue).run(); break;
        case 'unsetColor': editor.chain().focus().unsetColor().run(); break;
        case 'link': if (execValue) editor.chain().focus().extendMarkRange('link').setLink({ href: execValue }).run(); break;
        case 'unlink': editor.chain().focus().extendMarkRange('link').unsetLink().run(); break;
        default: break;
      }
    },
    focus: () => editor?.commands.focus(),
    insertToken: (key: string) => {
      if (!editor || disabledRef.current) return;
      editor.chain().focus().insertContent({ type: 'token', attrs: { field: key } }).run();
    },
    replaceToken: (newKey: string) => {
      if (!editor || disabledRef.current) return;
      const pos = lastTokenPosRef.current;
      if (pos == null) return;
      // No focus() — panel-driven edits must keep the consumer's input
      // focused. The target position stays valid across calls (reportSelection
      // remaps it through every transaction).
      editor.commands.command(({ tr }) => {
        const node = tr.doc.nodeAt(pos);
        if (!node || node.type.name !== 'token') return false;
        tr.setNodeMarkup(pos, undefined, { field: newKey });
        return true;
      });
    },
  }), [editor]);

  return (
    <EditorContent editor={editor} className={`richtext-editor ${className || ''}`} />
  );
});

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;
