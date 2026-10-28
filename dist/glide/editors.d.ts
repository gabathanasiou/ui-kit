import React from 'react';
import type { PickerItem } from '../pickerModel';
import type { SearchMenuGroup } from '../searchMenuModel';
/**
 * Cell editors for `GlideSheet` — the seam where kit surfaces live INSIDE a
 * Glide cell.
 *
 * Glide's overlay editor is real DOM painted over the canvas while a cell is
 * open, so anything the kit ships can run in it (the rest of the grid stays
 * canvas). Two editor kinds are enough for spreadsheet-style grids:
 *
 *  - `text`  — a plain field (Enter commits, Escape cancels, Tab moves on);
 *  - `select` — a `PickerField` in its `inline` cell appearance, so the kit's
 *    ONE value picker (SearchMenu panel, groups, create-from-typed) is what
 *    opens in the cell + underneath it.
 *
 * `createGlideCellEditor` MUST be built once per grid lifetime (the caller
 * keeps config in a ref): recreating it builds new editor component types and
 * remounts an open overlay, which drops in-progress typing.
 */
export interface GlideTextEditor {
    kind: 'text';
    align?: 'left' | 'center' | 'right';
    uppercase?: boolean;
    placeholder?: string;
}
export interface GlideSelectEditor {
    kind: 'select';
    /** The catalogue. `resolveBy` decides whether the stored value is the id or
     *  the label. */
    items: PickerItem[];
    groups?: SearchMenuGroup[];
    resolveBy?: 'id' | 'label';
    placeholder?: string;
    /** Seed the panel with a value that differs from the rendered display text
     *  (an id-keyed picker whose cell shows a name). */
    seedValue?: string;
    /** `accordion` folds the groups, `open` lists them expanded. */
    browse?: 'open' | 'accordion';
    panelMinWidth?: number;
    /** Create-from-typed: label + hand-off for a value the catalogue lacks. */
    createLabel?: (typed: string) => string;
    onCreateItem?: (value: string) => void;
}
export type GlideColumnEditor = GlideTextEditor | GlideSelectEditor;
export interface GlideEditorOptions {
    readOnlyRef: React.MutableRefObject<boolean>;
    columns: {
        key: string;
        align?: 'left' | 'center' | 'right';
    }[];
    /** Reads the STORED cell value (used to decide whether a typed first key
     *  already replaced the value). */
    getValue: (row: number, colKey: string) => string;
    /** Per-column editors; columns without an entry use Glide's own editor. */
    editors?: Record<string, GlideColumnEditor>;
    /** Per-(row, column) editor — wins over `editors` when the options depend on
     *  the row. */
    getEditor?: (row: number, colKey: string) => GlideColumnEditor | undefined | null;
    /** Host for the picker panel (Glide's overlay layer). */
    portalRef: React.MutableRefObject<HTMLElement | null>;
    /** Glide's reported column → data column offset. Grids with a row-marker
     *  column use 1; marker-less grids use 0. */
    columnOffset?: number;
}
export declare function createGlideCellEditor(getOpts: () => GlideEditorOptions | null): (cellData: any) => {
    editor: React.FunctionComponent<any>;
    disablePadding?: boolean;
    styleOverride?: React.CSSProperties;
} | undefined;
/**
 * Escape while a cell editor is open cancels JUST that edit — an enclosing
 * dialog's Escape handler would otherwise close the whole modal before Glide
 * sees the key. Spread the result onto the DataEditor.
 */
export declare function useGlideEscapeCancel(): {
    onCellActivated: () => void;
    onFinishedEditing: () => void;
};
