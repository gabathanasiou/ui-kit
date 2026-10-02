"use client";
import React, { useEffect, useImperativeHandle, useRef } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import { Extension, Mark, type Editor } from '@tiptap/core';
import { NodeSelection, Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { TextStyle, FontFamily, FontSize } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Suggestion, { type SuggestionOptions } from '@tiptap/suggestion';
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
// `{{` is NOT a trigger: `@` opens the token autocomplete, and a `.` typed
// IMMEDIATELY after a token chip opens the attribute autocomplete for that
// chip (the consumer supplies the items via `attributeItems`; picking inserts
// a SECOND chip directly after it — two independent atoms, so deleting either
// bubble detaches just that part).
//
// The consumer supplies the token vocabulary via props: `resolveToken` maps a
// stored key to display meta (label + color); `suggestionItems` feeds the `@`
// autocomplete; `attributeItems` feeds the `.` stage.

// ---- named paragraph-style runs (app-driven mark) ------------------------------
// A linked style marker: `styleId` names an entry in the CONSUMER's style
// registry; the kit only carries the link (`data-text-style`) through storage,
// never the resolved typography (so editing the style updates every run). The
// priority keeps the marker OUTSIDE the font/size `textStyle` span, so direct
// formatting nests inside it and wins conflicts (Word semantics).
const ReportTextStyle = Mark.create({
  name: 'reportTextStyle',
  priority: 102,
  addAttributes() {
    return {
      styleId: {
        default: null,
        parseHTML: el => (el as HTMLElement).getAttribute('data-text-style'),
        renderHTML: attrs => (attrs.styleId ? { 'data-text-style': attrs.styleId } : {}),
      },
    };
  },
  parseHTML() {
    return [{ tag: 'span[data-text-style]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', HTMLAttributes, 0];
  },
});

const RETAINED_SELECTION_KEY = new PluginKey<{ held: boolean; decorations: DecorationSet }>('retainedSelectionHighlight');

/** Consumer controls (font-size number box, style pickers) take focus away
 *  from the editor — the browser only paints a contentEditable selection while
 *  it is focused. `holdSelectionHighlight(true)` paints a ghost highlight over
 *  the current range (cleared by the same call with `false`, or by any
 *  selection change once released), so the user can see what the control will
 *  style. */
const RetainedSelection = Extension.create({
  name: 'retainedSelectionHighlight',
  addProseMirrorPlugins() {
    return [
      new Plugin<{ held: boolean; decorations: DecorationSet }>({
        key: RETAINED_SELECTION_KEY,
        state: {
          init: () => ({ held: false, decorations: DecorationSet.empty }),
          apply(tr, prev) {
            const meta = tr.getMeta(RETAINED_SELECTION_KEY) as { held: boolean } | undefined;
            const held = meta ? meta.held : prev.held;
            if (!held) return { held: false, decorations: DecorationSet.empty };
            const { from, to, empty } = tr.selection;
            return {
              held,
              decorations: empty
                ? DecorationSet.empty
                : DecorationSet.create(tr.doc, [Decoration.inline(from, to, { class: 'rt-retained-selection' })]),
            };
          },
        },
        props: {
          decorations(state) {
            return RETAINED_SELECTION_KEY.getState(state)?.decorations;
          },
        },
      }),
    ];
  },
});

export interface RichTextEditorHandle {
  /** Runs a formatting command on the current selection. `opts.focus === false`
   *  applies WITHOUT stealing focus (toolbar inputs that must stay focused
   *  while typing commit live, e.g. the app's font-size number box). */
  exec: (command: string, value?: string, opts?: { focus?: boolean }) => void;
  focus: () => void;
  /** Inserts a `{{key}}` token node at the caret. */
  insertToken: (key: string) => void;
  /** Rewrites the LAST-SELECTED token chip's key (e.g. adding `|`-item
   *  options) — targets exactly the chip reported via `onSelectionChange`,
   *  never a sibling with the same key. Repeatable: the target position is
   *  remapped through transactions, and no focus steal (panel inputs keep
   *  their focus while the chip updates live). */
  replaceToken: (newKey: string) => void;
  /** Paints/clears a ghost highlight over the current non-empty text selection
   *  while a consumer control (e.g. the font-size box) holds focus. */
  holdSelectionHighlight: (held: boolean) => void;
}

/** Formatting state at the caret/selection — drives the toolbar's toggle lighting. */
export interface RichTextState {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strike: boolean;
  link: boolean;
  color: string;
  /** `textStyle` mark attrs at the caret ('' = no run override). */
  fontFamily: string;
  fontSize: string;
  /** `reportTextStyle` mark attr at the caret ('' = no linked style). */
  textStyle: string;
  /** True when the selection is a non-empty range (the toolbar then styles
   *  the RUN; a collapsed caret styles the consumer's whole-object default). */
  hasSelection: boolean;
  /** The ranged selection spans different values (Word-style "Mixed"). */
  fontFamilyMixed: boolean;
  fontSizeMixed: boolean;
  textStyleMixed: boolean;
}

export const RICH_TEXT_STATE_IDLE: RichTextState = {
  bold: false, italic: false, underline: false, strike: false, link: false, color: '',
  fontFamily: '', fontSize: '', textStyle: '', hasSelection: false, fontFamilyMixed: false, fontSizeMixed: false, textStyleMixed: false,
};

/** Key of the token chip immediately before the doc position `pos`, or null.
 *  The `.` attribute suggestion is gated on this: the dot must sit directly
 *  after a chip, never after plain text. */
function chipBeforePos(editor: Editor, pos: number): string | null {
  const node = editor.state.doc.resolve(pos).nodeBefore;
  return node && node.type.name === 'token' ? ((node.attrs.field as string) ?? '') : null;
}

/** The `.` trigger in the caret's current text node + the chip it attaches to.
 *  The dot must live in text (chips are atoms); a second dot ends the query
 *  (the suggestion plugin's regex), so the LAST dot is the trigger. */
function dotTrigger(editor: Editor): { chipKey: string; dotPos: number } | null {
  const $from = editor.state.selection.$from;
  const textNode = $from.nodeBefore;
  if (!textNode?.isText) return null;
  const text = textNode.text || '';
  const dotIndex = text.lastIndexOf('.');
  if (dotIndex < 0) return null;
  const dotPos = $from.pos - text.length + dotIndex;
  const chipKey = chipBeforePos(editor, dotPos);
  return chipKey == null ? null : { chipKey, dotPos };
}

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
  /** Items for the `.` attribute autocomplete — fired when `.` is typed
   *  IMMEDIATELY after a token chip. `chipKey` is the chip's stored key; each
   *  returned item's `key` is the FULL key of a SECOND token atom inserted
   *  directly after the chip (e.g. `crew.bob` → append `crew.bob.phone`).
   *  The two chips stay independent — either can be selected and deleted. */
  attributeItems?: (chipKey: string, query: string) => TokenItem[];
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
  value, onChange, placeholder, disabled, className, onStateChange, resolveToken, suggestionItems, attributeItems, onTokenClick, onSelectionChange,
}, ref) => {
  const resolveRef = useRef(resolveToken);
  resolveRef.current = resolveToken;
  const itemsRef = useRef(suggestionItems);
  itemsRef.current = suggestionItems;
  const attributeItemsRef = useRef(attributeItems);
  attributeItemsRef.current = attributeItems;
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
    const textStyle = ed.getAttributes('textStyle');
    const linked = ed.getAttributes('reportTextStyle');
    // A ranged selection: collect every text node's textStyle/reportTextStyle
    // values so the toolbar can show "Mixed" (getAttributes only reads the FIRST mark).
    const { from, to, empty } = ed.state.selection;
    let fontFamilyMixed = false;
    let fontSizeMixed = false;
    let textStyleMixed = false;
    if (!empty) {
      const families = new Set<string>();
      const sizes = new Set<string>();
      const styleIds = new Set<string>();
      ed.state.doc.nodesBetween(from, to, node => {
        if (!node.isText) return;
        const mark = node.marks.find(m => m.type.name === 'textStyle');
        families.add((mark?.attrs.fontFamily as string | undefined) || '');
        sizes.add((mark?.attrs.fontSize as string | undefined) || '');
        const named = node.marks.find(m => m.type.name === 'reportTextStyle');
        styleIds.add((named?.attrs.styleId as string | undefined) || '');
      });
      fontFamilyMixed = families.size > 1;
      fontSizeMixed = sizes.size > 1;
      textStyleMixed = styleIds.size > 1;
    }
    const next: RichTextState = {
      bold: ed.isActive('bold'),
      italic: ed.isActive('italic'),
      underline: ed.isActive('underline'),
      strike: ed.isActive('strike'),
      link: ed.isActive('link'),
      color: (textStyle.color as string | undefined) || '',
      fontFamily: (textStyle.fontFamily as string | undefined) || '',
      fontSize: (textStyle.fontSize as string | undefined) || '',
      textStyle: (linked.styleId as string | undefined) || '',
      hasSelection: !empty,
      fontFamilyMixed,
      fontSizeMixed,
      textStyleMixed,
    };
    // Skip unchanged reports — onTransaction fires on every transaction
    // (keystrokes, caret moves), and we don't want a setState per event.
    const prev = lastStateRef.current;
    if (prev && prev.bold === next.bold && prev.italic === next.italic && prev.underline === next.underline && prev.strike === next.strike && prev.link === next.link && prev.color === next.color && prev.fontFamily === next.fontFamily && prev.fontSize === next.fontSize && prev.textStyle === next.textStyle && prev.hasSelection === next.hasSelection && prev.fontFamilyMixed === next.fontFamilyMixed && prev.fontSizeMixed === next.fontSizeMixed && prev.textStyleMixed === next.textStyleMixed) return;
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

  // Stable per-props instance: rebuilding the extensions mid-session would
  // recreate the editor and drop the caret.
  const tokenExtensions = React.useMemo(() => {
    const suggestion: Omit<SuggestionOptions<TokenItem, { field: string }>, 'editor'> = {
      char: '@',
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query }) => itemsRef.current?.(query) ?? [],
      command: ({ editor: ed, range, props }) => {
        ed.chain().focus().insertContentAt(range, { type: 'token', attrs: { field: props.field } }).run();
      },
      render: TokenSuggestion,
    };
    const token = Token.configure({
      resolve: resolveRef.current ?? null,
      suggestion,
      onTokenClick: (key: string, rect: DOMRect, pos: number) => {
        lastTokenPosRef.current = pos;
        onTokenClickRef.current?.(key, rect, pos);
      },
    } as unknown as Parameters<typeof Token.configure>[0]);

    // The `.` attribute stage: a suggestion that appends a SECOND token atom
    // right after the chip it attaches to (never rewrites it — both bubbles
    // stay deletable on their own). Distinct plugin key + decoration class so
    // it can never collide with the `@` mention plugin.
    const attributeSuggestion = Extension.create({
      name: 'tokenAttributeSuggestion',
      addProseMirrorPlugins() {
        return [
          Suggestion<TokenItem, { field: string }>({
            pluginKey: new PluginKey('tokenAttributeSuggestion'),
            editor: this.editor,
            char: '.',
            // The gate is `shouldShow` (a chip must sit immediately before the
            // dot), not the prefix rule — the prefix here is an atom, not text.
            allowedPrefixes: null,
            decorationClass: 'suggestion-attr',
            shouldShow: ({ editor: ed, range }) => chipBeforePos(ed, range.from) != null,
            items: ({ editor: ed, query }) => {
              const hit = dotTrigger(ed);
              return hit ? attributeItemsRef.current?.(hit.chipKey, query) ?? [] : [];
            },
            command: ({ editor: ed, range, props }) => {
              // The `.query` range starts right after the anchored chip, so
              // inserting the atom at it removes the typed text and lands the
              // new chip flush against the first — two independent atoms.
              ed.chain().focus()
                .insertContentAt(range, { type: 'token', attrs: { field: props.field } })
                .run();
            },
            render: TokenSuggestion,
          }),
        ];
      },
    });

    return [token, attributeSuggestion];
  }, []);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder }),
      TextStyle,
      FontFamily,
      FontSize,
      ReportTextStyle,
      RetainedSelection,
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
      ...tokenExtensions,
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
    exec: (command: string, execValue?: string, opts?: { focus?: boolean }) => {
      if (!editor || disabledRef.current) return;
      const chain = editor.chain();
      const c = opts?.focus === false ? chain : chain.focus();
      switch (command) {
        case 'bold': c.toggleBold().run(); break;
        case 'italic': c.toggleItalic().run(); break;
        case 'underline': c.toggleUnderline().run(); break;
        case 'strikeThrough': c.toggleStrike().run(); break;
        case 'foreColor': if (execValue) c.setColor(execValue).run(); break;
        case 'unsetColor': c.unsetColor().run(); break;
        case 'fontFamily': if (execValue) c.setFontFamily(execValue).run(); break;
        case 'unsetFontFamily': c.unsetFontFamily().run(); break;
        case 'fontSize': if (execValue) c.setFontSize(execValue).run(); break;
        case 'unsetFontSize': c.unsetFontSize().run(); break;
        // Linked named style: mark the run with the consumer's style id. Direct
        // font family/size on the range is cleared so the linked style's
        // typography takes effect (the object-level precedent); bold/italic
        // marks stay — direct character formatting still wins (Word).
        case 'textStyle': if (execValue) c.setMark('reportTextStyle', { styleId: execValue }).unsetFontFamily().unsetFontSize().run(); break;
        case 'unsetTextStyle': c.unsetMark('reportTextStyle').run(); break;
        // Clear every inline mark (bold/italic/underline/strike/color/font/
        // link) and normalize the block — the cell-chrome Reset path.
        case 'clearFormatting': c.unsetAllMarks().clearNodes().run(); break;
        case 'link': if (execValue) c.extendMarkRange('link').setLink({ href: execValue }).run(); break;
        case 'unlink': c.extendMarkRange('link').unsetLink().run(); break;
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
        // setNodeMarkup collapses a NodeSelection on the chip — restore it so
        // selection-driven consumers (chip property panels) stay targeted
        // while the chip is rewritten.
        const $pos = tr.doc.resolve(pos);
        if ($pos.nodeAfter && $pos.nodeAfter.type.name === 'token') {
          tr.setSelection(new NodeSelection($pos));
        }
        return true;
      });
    },
    holdSelectionHighlight: (held: boolean) => {
      if (!editor || editor.isDestroyed) return;
      editor.view.dispatch(editor.state.tr.setMeta(RETAINED_SELECTION_KEY, { held }));
    },
  }), [editor]);

  return (
    <EditorContent editor={editor} className={`richtext-editor ${className || ''}`} />
  );
});

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;
