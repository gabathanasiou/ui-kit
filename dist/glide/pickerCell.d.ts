import React from 'react';
import type { GlideDomCellSpec } from './GlideSheet';
/**
 * The ONE picker-cell affordance: a native Glide picker cell (value painted on
 * the canvas, selectable, double-click opens the editor) plus a small DOM
 * chevron button that opens the SAME editor with a single click.
 *
 * The box is `passthrough` (pointer-events: none), so the canvas keeps the cell
 * selectable and keyboard-navigable; only the chevron captures the pointer.
 *
 *   const api = useRef<GlideSheetApi | null>(null);
 *   domCells={[
 *     pickerDomCell({ row, colKey: 'person', label: person, onOpen: () => api.current?.openCellEditor(row, 'person') }),
 *   ]}
 */
export interface PickerDomCellOptions {
    row: number;
    colKey: string;
    /** Current value, for the accessible name only. */
    label?: string;
    onOpen: () => void;
    /** data-testid for the chevron button. */
    testId?: string;
}
export declare const PickerChevron: React.FC<{
    label?: string;
    testId?: string;
    onOpen: () => void;
}>;
export declare function pickerDomCell(opts: PickerDomCellOptions): GlideDomCellSpec;
