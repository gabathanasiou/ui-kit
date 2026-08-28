import React from 'react';
import type { RichTextEditorHandle, RichTextState } from './RichTextEditor';
export declare const FONTS: string[];
export declare const FontMenu: React.FC<{
    value: string;
    disabled: boolean;
    onChange: (f: string) => void;
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
}
export declare const FormatToolbar: React.FC<FormatToolbarProps>;
