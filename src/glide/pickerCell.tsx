import React from 'react';
import { ChevronDown } from 'lucide-react';
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

export const PickerChevron: React.FC<{ label?: string; testId?: string; onOpen: () => void }> = ({ label, testId, onOpen }) => (
  <div className="flex h-full w-full items-center justify-end">
    <button
      type="button"
      className="pointer-events-auto flex h-6 w-6 items-center justify-center rounded text-[color:var(--ui-text-faint)] hover:bg-[var(--ui-card-hover)] hover:text-[color:var(--ui-text)]"
      onClick={onOpen}
      data-testid={testId}
      aria-label={label ? `Open picker (${label})` : 'Open picker'}
      tabIndex={-1}
    >
      <ChevronDown className="h-3.5 w-3.5" />
    </button>
  </div>
);

export function pickerDomCell(opts: PickerDomCellOptions): GlideDomCellSpec {
  return {
    row: opts.row,
    colKey: opts.colKey,
    passthrough: true,
    node: <PickerChevron label={opts.label} testId={opts.testId} onOpen={opts.onOpen} />,
  };
}
