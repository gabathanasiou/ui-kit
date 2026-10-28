import * as React from "react";
import type { DataEditorRef } from "../data-editor/data-editor.js";
import type { DataEditorAllProps } from "../data-editor-all.js";

export type GetDomCell = (col: number, row: number) => React.ReactNode | null | false;

export interface DomCellEditorProps extends DataEditorAllProps {
    /** Real React control to mount over a cell; null/false = none. */
    getDomCell?: GetDomCell;
    /** Extra class on each pinned box. */
    domCellClassName?: string;
}

/** DataEditor + a real DOM layer pinned over requested cells. */
export declare const DataEditorWithDomCells: React.ForwardRefExoticComponent<
    DomCellEditorProps & React.RefAttributes<DataEditorRef>
>;
