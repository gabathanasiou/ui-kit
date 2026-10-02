import React from 'react';
import type { RichTextEditorHandle, RichTextState } from './RichTextEditor';
export declare const FONTS: string[];
export declare const FontMenu: React.FC<{
    value: string;
    disabled: boolean;
    onChange: (f: string) => void;
    mixed?: boolean;
}>;
export interface FormatToolbarProps {
    editorRef: React.RefObject<RichTextEditorHandle | null>;
    disabled: boolean;
    /** Formatting at the caret/selection — lights the toggles up (Word-style). */
    active?: RichTextState;
    /** Axes pinned by a named style (whole-block) — button renders lit-but-dimmed
     *  with the given tooltip. Undefined = free. */
    lockedFormatting?: {
        bold?: string;
        italic?: string;
    };
    /** Extra controls appended after the divider (e.g. an attribute picker). */
    trailing?: React.ReactNode;
    /** Optional contextual font family picker (selection-level run override).
     *  The consumer owns the value (falling back to its object default); the
     *  toolbar only renders the control and reports the picked family. */
    font?: {
        value: string;
        onChange: (family: string) => void;
        mixed?: boolean;
    };
    /** Size control slot (the consumer's own number input — the app uses its
     *  LiveNumberInput recipe). Rendered after the font picker. */
    fontSizeSlot?: React.ReactNode;
    /** Show the clear-formatting action (unsets every inline mark). */
    showClearFormatting?: boolean;
}
export declare const FormatToolbar: React.FC<FormatToolbarProps>;
