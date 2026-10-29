import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  GlideSheet,
  seededTextCell,
  useKitTheme,
  type GlideSheetApi,
  type GlideSheetColumn,
  type GlideSheetEdit,
} from '../../src/index';

/**
 * Single-cell Glide input — the minimal element for testing ONE cell's edit
 * loop in isolation (no rows, no pickers, no actions): select → double-click
 * or type → the overlay text editor → Enter/blur commits through the host.
 *
 * Mirrors the other experiment's single-cell harness so the canvas cell and
 * the DOM cell can be compared side by side.
 */

const COLUMNS: GlideSheetColumn[] = [{ key: 'value', label: 'Value', width: 320 }];
const EDITABLE = new Set(['value']);

declare global {
  interface Window {
    __glideSingleCell?: {
      cellBounds(row: number, colKey: string): { x: number; y: number; width: number; height: number } | null;
    };
  }
}

export const SingleCellPage: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  useKitTheme();
  const apiRef = useRef<GlideSheetApi | null>(null);
  const [value, setValue] = useState('Double-click or start typing');
  const [commits, setCommits] = useState(0);
  const [status, setStatus] = useState('no edits yet');

  const onCommit = useCallback((edits: GlideSheetEdit[]) => {
    const edit = edits[0];
    if (!edit) return;
    setValue(edit.value);
    setCommits(c => c + 1);
    setStatus(`committed “${edit.value}”`);
  }, []);

  const getCellContent = useCallback(() => seededTextCell(value, { displayData: value }), [value]);

  useEffect(() => {
    window.__glideSingleCell = {
      cellBounds: (row, colKey) => apiRef.current?.getCellBounds(row, colKey) ?? null,
    };
    return () => { delete window.__glideSingleCell; };
  }, []);

  return (
    <div className="pg-page" data-testid="glide-single-cell-demo">
      <header className="pg-page-head">
        <button type="button" className="pg-page-back" onClick={onExit} data-testid="glide-single-cell-back">
          ← Playground
        </button>
        <div className="pg-page-title">Single cell</div>
        <span className="pg-page-sub">Glide input</span>
        <a
          className="pg-page-back"
          href="#glide-native-cells"
          data-testid="glide-single-cell-native-link"
          title="Painted picker chevrons and glyph buttons at three scales"
        >
          Canvas cells →
        </a>
        <span className="pg-page-meta">
          <span className="pg-page-status" data-testid="glide-single-cell-status">{status}</span>
          <span className="pg-page-status" data-testid="glide-single-cell-commits">
            {commits} commit{commits === 1 ? '' : 's'}
          </span>
        </span>
      </header>

      <div className="pg-page-body overflow-auto p-6">
        <div className="mx-auto w-full max-w-md rounded-lg border border-[color:var(--ui-border)] bg-[var(--ui-panel-bg)] p-4">
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[color:var(--ui-text-faint)]">
            One editable cell
          </div>
          <GlideSheet
            dataAttr="data-glide-single-cell"
            columns={COLUMNS}
            rows={[{ value }]}
            getCellContent={getCellContent}
            onCommit={onCommit}
            editableKeys={EDITABLE}
            apiRef={apiRef}
            selectionKey="pg:glide-single-cell"
            baseRowHeight={32}
            baseHeaderHeight={28}
            fontSize={13}
          />
          <p className="mt-3 text-[11px] leading-relaxed text-[color:var(--ui-text-muted)]">
            Click the cell, double-click or just type. Enter commits without moving the
            selection; Escape cancels. The overlay editor is the real DOM input over the
            painted cell.
          </p>
          <div className="mt-2 rounded border border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-2 py-1.5 text-[12px] text-[color:var(--ui-text)]">
            host value: <span data-testid="glide-single-cell-value">{value || '(empty)'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
