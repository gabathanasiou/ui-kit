import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useKitTheme } from '../../src/index';
import {
  GlideSheet,
  GridCellKind,
  glideCellColors,
  kitGlyphCell,
  kitGlyphGroupCell,
  kitPickerCell,
  seededTextCell,
  staticCell,
  type GlideColumnEditor,
  type GlideSheetApi,
  type GlideSheetColumn,
  type GlideSheetEdit,
  type GridCell,
} from '../../src/glide';

/**
 * Single cells — the smallest real element, with NO header row.
 *
 * Each card is a one-column, one-row `GlideSheet` with `baseHeaderHeight={0}`,
 * so the element IS the cell: same edit loop, same painted controls, no table
 * chrome. Six use cases cover the cell kinds a host embeds on its own:
 *
 *   Text    — the overlay text editor (type → Enter commits)
 *   Picker  — a painted chevron lane opening the kit PickerField
 *   Button  — one painted glyph (check)
 *   Split   — two painted glyphs in one cell (add · trash)
 *   Toggle  — Glide's boolean checkbox
 *   Locked  — a read-only static cell
 *
 * Mirrors the other experiment's single-cell harness for side-by-side
 * canvas-vs-DOM comparison.
 */

export type SingleCellKey = 'text' | 'picker' | 'button' | 'group' | 'toggle' | 'locked' | 'rows' | 'columns';

const COLUMN = (label: string, width = 240): GlideSheetColumn[] => [{ key: 'value', label, width }];
const VALUE_COLUMN = COLUMN('Value');
const NO_EDIT = new Set<string>();

const LOCATIONS = [
  "GEORGE BAILEY'S HOUSE — LIVING ROOM",
  'BEDFORD FALLS — MAIN STREET',
  'SAVINGS & LOAN — LOBBY',
];

function useCellApi(onReady: (api: GlideSheetApi | null) => void): React.RefObject<GlideSheetApi | null> {
  const apiRef = useRef<GlideSheetApi | null>(null);
  useEffect(() => {
    onReady(apiRef.current);
    return () => onReady(null);
    // The ref object is stable; publish once this sheet is mounted.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return apiRef;
}

const CellFrame: React.FC<{
  label: string;
  hint: string;
  testId: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
}> = ({ label, hint, testId, children, aside }) => (
  <div
    className="rounded-lg border border-[color:var(--ui-border)] bg-[var(--ui-panel-bg)] p-3"
    data-testid={testId}
  >
    <div className="mb-1 flex items-baseline justify-between gap-2">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-[color:var(--ui-text-faint)]">{label}</span>
      {aside}
    </div>
    {children}
    <p className="mt-2 text-[10.5px] leading-snug text-[color:var(--ui-text-muted)]">{hint}</p>
  </div>
);

/* ── Text ───────────────────────────────────────────────────────────────── */

const TextCell: React.FC<{ register: (api: GlideSheetApi | null) => void }> = ({ register }) => {
  const apiRef = useCellApi(register);
  const [value, setValue] = useState('Double-click or type');
  const [commits, setCommits] = useState(0);
  const onCommit = useCallback((edits: GlideSheetEdit[]) => {
    if (!edits[0]) return;
    setValue(edits[0].value);
    setCommits(c => c + 1);
  }, []);
  return (
    <CellFrame
      label="Text"
      hint="Click the cell, then type (or double-click). Enter commits; Escape cancels."
      testId="glide-native-single-text"
      aside={<span className="text-[10px] text-[color:var(--ui-text-faint)]" data-testid="glide-native-single-text-status">{commits} commit{commits === 1 ? '' : 's'}</span>}
    >
      <GlideSheet
        dataAttr="data-glide-single-text"
        columns={VALUE_COLUMN}
        rows={[{ value }]}
        getCellContent={() => seededTextCell(value, { displayData: value })}
        onCommit={onCommit}
        editableKeys={new Set(['value'])}
        apiRef={apiRef}
        deselectOnBlur
        selectionKey="pg:glide-single:text"
        baseRowHeight={30}
        baseHeaderHeight={0}
        fontSize={13}
      />
      <div className="mt-1 text-[10.5px] text-[color:var(--ui-text-faint)]">
        host value: <span data-testid="glide-native-single-text-value">{value || '(empty)'}</span>
      </div>
    </CellFrame>
  );
};

/* ── Picker ─────────────────────────────────────────────────────────────── */

const PickerCell: React.FC<{ register: (api: GlideSheetApi | null) => void }> = ({ register }) => {
  const apiRef = useCellApi(register);
  const [value, setValue] = useState(LOCATIONS[2]);
  const getEditor = useCallback((): GlideColumnEditor => ({
    kind: 'select',
    items: LOCATIONS.map(name => ({ id: name, label: name })),
    resolveBy: 'label',
    placeholder: 'Location…',
    panelMinWidth: 300,
  }), []);
  return (
    <CellFrame
      label="Picker"
      hint="One click on the painted chevron lane opens the kit PickerField in the cell."
      testId="glide-native-single-picker"
    >
      <GlideSheet
        dataAttr="data-glide-single-picker"
        columns={VALUE_COLUMN}
        rows={[{ value }]}
        getCellContent={() => kitPickerCell({
          value,
          label: 'Single picker',
          placeholder: '—',
          onOpen: () => apiRef.current?.openCellEditor(0, 'value'),
        })}
        getEditor={getEditor}
        onCommit={edits => { if (edits[0]) setValue(edits[0].value); }}
        editableKeys={new Set(['value'])}
        apiRef={apiRef}
        deselectOnBlur
        selectionKey="pg:glide-single:picker"
        baseRowHeight={30}
        baseHeaderHeight={0}
        fontSize={12.5}
      />
      <div className="mt-1 text-[10.5px] text-[color:var(--ui-text-faint)]">
        host value: <span data-testid="glide-native-single-picker-value">{value}</span>
      </div>
    </CellFrame>
  );
};

/* ── Button ─────────────────────────────────────────────────────────────── */

const ButtonCell: React.FC<{ register: (api: GlideSheetApi | null) => void }> = ({ register }) => {
  const apiRef = useCellApi(register);
  const [clicks, setClicks] = useState(0);
  return (
    <CellFrame
      label="Button"
      hint="A painted check glyph: hover tint, press flash, one activation per click or Enter."
      testId="glide-native-single-button"
      aside={<span className="text-[10px] text-[color:var(--ui-text-faint)]" data-testid="glide-native-single-button-clicks">clicks: {clicks}</span>}
    >
      <GlideSheet
        dataAttr="data-glide-single-button"
        columns={VALUE_COLUMN}
        rows={[{ value: '' }]}
        getCellContent={() => kitGlyphCell({
          icon: 'check',
          label: 'Mark done',
          tone: 'accent',
          lane: 'full',
          onActivate: () => setClicks(c => c + 1),
        })}
        onCommit={() => {}}
        editableKeys={NO_EDIT}
        apiRef={apiRef}
        deselectOnBlur
        selectionKey="pg:glide-single:button"
        baseRowHeight={30}
        baseHeaderHeight={0}
        fontSize={12.5}
      />
    </CellFrame>
  );
};

/* ── Split buttons ──────────────────────────────────────────────────────── */

const GroupCell: React.FC<{ register: (api: GlideSheetApi | null) => void }> = ({ register }) => {
  const apiRef = useCellApi(register);
  const [last, setLast] = useState<'add' | 'remove' | null>(null);
  const [clicks, setClicks] = useState(0);
  const hit = (which: 'add' | 'remove') => { setLast(which); setClicks(c => c + 1); };
  return (
    <CellFrame
      label="Two buttons"
      hint="Two painted buttons in ONE cell (add · trash) — no extra column."
      testId="glide-native-single-group"
      aside={<span className="text-[10px] text-[color:var(--ui-text-faint)]" data-testid="glide-native-single-group-clicks">clicks: {clicks}</span>}
    >
      <GlideSheet
        dataAttr="data-glide-single-group"
        columns={VALUE_COLUMN}
        rows={[{ value: '' }]}
        getCellContent={() => kitGlyphGroupCell({
          lane: 'full',
          buttons: [
            { icon: 'plus', label: 'Add', tone: 'accent', onActivate: () => hit('add') },
            { icon: 'trash', label: 'Remove', tone: 'danger', onActivate: () => hit('remove') },
          ],
        })}
        onCommit={() => {}}
        editableKeys={NO_EDIT}
        apiRef={apiRef}
        deselectOnBlur
        selectionKey="pg:glide-single:group"
        baseRowHeight={30}
        baseHeaderHeight={0}
        fontSize={12.5}
      />
      <div className="mt-1 text-[10.5px] text-[color:var(--ui-text-faint)]" data-testid="glide-native-single-group-last">
        last: {last ?? '—'}
      </div>
    </CellFrame>
  );
};

/* ── Toggle ─────────────────────────────────────────────────────────────── */

const ToggleCell: React.FC<{ register: (api: GlideSheetApi | null) => void }> = ({ register }) => {
  const apiRef = useCellApi(register);
  const [on, setOn] = useState(true);
  return (
    <CellFrame
      label="Toggle"
      hint="Glide's boolean checkbox in a single cell — click toggles, one commit."
      testId="glide-native-single-toggle"
    >
      <GlideSheet
        dataAttr="data-glide-single-toggle"
        columns={VALUE_COLUMN}
        rows={[{ value: String(on) }]}
        getCellContent={(): GridCell => ({
          kind: GridCellKind.Boolean,
          data: on,
          allowOverlay: false,
          readonly: false,
        } as GridCell)}
        onCommit={edits => { if (edits[0]) setOn(edits[0].value === 'true'); }}
        editableKeys={new Set(['value'])}
        apiRef={apiRef}
        deselectOnBlur
        selectionKey="pg:glide-single:toggle"
        baseRowHeight={30}
        baseHeaderHeight={0}
        fontSize={12.5}
      />
      <div className="mt-1 text-[10.5px] text-[color:var(--ui-text-faint)]">
        host value: <span data-testid="glide-native-single-toggle-value">{String(on)}</span>
      </div>
    </CellFrame>
  );
};

/* ── Locked ─────────────────────────────────────────────────────────────── */

const LockedCell: React.FC<{ register: (api: GlideSheetApi | null) => void }> = ({ register }) => {
  const kit = useKitTheme();
  const colors = useMemo(() => glideCellColors(kit?.mode ?? 'light'), [kit?.mode]);
  const apiRef = useCellApi(register);
  return (
    <CellFrame
      label="Locked"
      hint="A read-only static cell: selectable and copyable, never editable."
      testId="glide-native-single-locked"
    >
      <GlideSheet
        dataAttr="data-glide-single-locked"
        columns={VALUE_COLUMN}
        rows={[{ value: 'Read-only value' }]}
        getCellContent={() => staticCell('Read-only value', { themeOverride: { textDark: colors.muted } })}
        onCommit={() => {}}
        editableKeys={NO_EDIT}
        apiRef={apiRef}
        deselectOnBlur
        selectionKey="pg:glide-single:locked"
        baseRowHeight={30}
        baseHeaderHeight={0}
        fontSize={12.5}
      />
    </CellFrame>
  );
};

/* ── Rows: one column, three rows ───────────────────────────────────────── */

const ROWS_COLUMNS = COLUMN('Value', 300);

const RowsCase: React.FC<{ register: (api: GlideSheetApi | null) => void }> = ({ register }) => {
  const apiRef = useCellApi(register);
  const [items, setItems] = useState(['Scene 1 — INT. LIVING ROOM', 'Scene 2 — EXT. MAIN STREET', 'Scene 3 — INT. LOBBY']);
  const [status, setStatus] = useState('no edits yet');
  const onCommit = useCallback((edits: GlideSheetEdit[]) => {
    setItems(prev => {
      const next = [...prev];
      for (const edit of edits) if (edit.colKey === 'value') next[edit.row] = edit.value;
      return next;
    });
    setStatus(edits.length === 1 ? `row ${edits[0].row + 1} → ${edits[0].value}` : `${edits.length} rows in one commit`);
  }, []);
  return (
    <CellFrame
      label="Rows ×3"
      hint="One column, three rows. Arrow Up/Down moves the selection; Enter/type edits the row, Enter commits and the next row is one key away."
      testId="glide-native-single-rows"
      aside={<span className="text-[10px] text-[color:var(--ui-text-faint)]" data-testid="glide-native-single-rows-status">{status}</span>}
    >
      <GlideSheet
        dataAttr="data-glide-single-rows"
        columns={ROWS_COLUMNS}
        rows={items.map(value => ({ value }))}
        getCellContent={(col, row) => seededTextCell(row.value, { displayData: row.value })}
        onCommit={onCommit}
        editableKeys={new Set(['value'])}
        apiRef={apiRef}
        deselectOnBlur
        selectionKey="pg:glide-single:rows"
        baseRowHeight={28}
        baseHeaderHeight={0}
        fontSize={12.5}
      />
      <div className="mt-1 text-[10.5px] text-[color:var(--ui-text-faint)]">
        host values: <span data-testid="glide-native-single-rows-value">{items.join(' | ')}</span>
      </div>
    </CellFrame>
  );
};

/* ── Columns: one row, three columns ────────────────────────────────────── */

const COLUMN_CASE: GlideSheetColumn[] = [
  { key: 'scene', label: 'Scene', width: 80, align: 'center' },
  { key: 'pages', label: 'Pages', width: 100, align: 'center' },
  { key: 'set', label: 'Set', width: 180 },
];
const COLUMN_EDITABLE = new Set(['scene', 'pages', 'set']);

const ColumnsCase: React.FC<{ register: (api: GlideSheetApi | null) => void }> = ({ register }) => {
  const apiRef = useCellApi(register);
  const [row, setRow] = useState({ scene: '12', pages: '2 4/8', set: 'BEDFORD FALLS — MAIN STREET' });
  const [status, setStatus] = useState('no edits yet');
  const onCommit = useCallback((edits: GlideSheetEdit[]) => {
    setRow(prev => {
      const next = { ...prev };
      for (const edit of edits) if (edit.colKey in next) next[edit.colKey as keyof typeof next] = edit.value;
      return next;
    });
    setStatus(edits.length === 1 ? `${edits[0].colKey} → ${edits[0].value}` : `${edits.length} cells in one commit`);
  }, []);
  return (
    <CellFrame
      label="Columns ×3"
      hint="One row, three columns (Scene · Pages · Set). Arrow Left/Right moves between cells; Enter/type edits in place — spreadsheet input without a table."
      testId="glide-native-single-columns"
      aside={<span className="text-[10px] text-[color:var(--ui-text-faint)]" data-testid="glide-native-single-columns-status">{status}</span>}
    >
      <GlideSheet
        dataAttr="data-glide-single-columns"
        columns={COLUMN_CASE}
        rows={[row as unknown as Record<string, string>]}
        getCellContent={(col, data) => seededTextCell(data[col.key] ?? '', { displayData: data[col.key] ?? '—', align: col.align })}
        onCommit={onCommit}
        editableKeys={COLUMN_EDITABLE}
        apiRef={apiRef}
        deselectOnBlur
        selectionKey="pg:glide-single:columns"
        baseRowHeight={30}
        baseHeaderHeight={0}
        fontSize={12.5}
      />
      <div className="mt-1 text-[10.5px] text-[color:var(--ui-text-faint)]">
        host values: <span data-testid="glide-native-single-columns-value">{`${row.scene} | ${row.pages} | ${row.set}`}</span>
      </div>
    </CellFrame>
  );
};

/* ── The grid of single cells ───────────────────────────────────────────── */

const SingleCellsGrid: React.FC<{
  onApis?: (apis: Partial<Record<SingleCellKey, GlideSheetApi | null>>) => void;
}> = ({ onApis }) => {
  const text = useRef<GlideSheetApi | null>(null);
  const picker = useRef<GlideSheetApi | null>(null);
  const button = useRef<GlideSheetApi | null>(null);
  const group = useRef<GlideSheetApi | null>(null);
  const toggle = useRef<GlideSheetApi | null>(null);
  const locked = useRef<GlideSheetApi | null>(null);
  const rows = useRef<GlideSheetApi | null>(null);
  const columns = useRef<GlideSheetApi | null>(null);

  const publish = useCallback(() => {
    onApis?.({
      text: text.current,
      picker: picker.current,
      button: button.current,
      group: group.current,
      toggle: toggle.current,
      locked: locked.current,
      rows: rows.current,
      columns: columns.current,
    });
  }, [onApis]);

  useEffect(() => {
    publish();
    return () => onApis?.({});
  }, [publish, onApis]);

  return (
    <div className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-2 xl:grid-cols-3">
      <TextCell register={api => { text.current = api; publish(); }} />
      <PickerCell register={api => { picker.current = api; publish(); }} />
      <ButtonCell register={api => { button.current = api; publish(); }} />
      <GroupCell register={api => { group.current = api; publish(); }} />
      <ToggleCell register={api => { toggle.current = api; publish(); }} />
      <LockedCell register={api => { locked.current = api; publish(); }} />
      <RowsCase register={api => { rows.current = api; publish(); }} />
      <ColumnsCase register={api => { columns.current = api; publish(); }} />
    </div>
  );
};

/* ── The tab zone ───────────────────────────────────────────────────────── */

export const SingleCellsZone: React.FC<{
  onRows: (count: number) => void;
  onApis: (apis: Partial<Record<SingleCellKey, GlideSheetApi | null>>) => void;
}> = ({ onRows, onApis }) => {
  useEffect(() => { onRows(8); }, [onRows]);
  return (
    <div className="pg-page-body overflow-auto p-4">
      <SingleCellsGrid onApis={onApis} />
    </div>
  );
};

/* ── The pop-out window route (#glide-single-cell) ──────────────────────── */

export const SingleCellsStandalone: React.FC = () => (
  <div className="pg-page" data-testid="glide-single-cell-demo">
    <header className="pg-page-head">
      <div className="pg-page-title">Single cells</div>
      <span className="pg-page-sub">pop-out</span>
      <span className="pg-page-meta">
        <span className="pg-page-status">One cell per element — no header row</span>
      </span>
    </header>
    <div className="pg-page-body overflow-auto p-4">
      <SingleCellsGrid />
    </div>
  </div>
);
