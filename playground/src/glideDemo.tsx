import React, { useCallback, useMemo, useState } from 'react';
import { ChevronDown, Plus, RotateCcw, Trash2, Undo2 } from 'lucide-react';
import {
  Button,
  Checkbox,
  PickerField,
  Seg,
  useKitTheme,
} from '../../src/index';
import {
  GlideSheet,
  GridCellKind,
  kitBadgeCell,
  glideCellColors,
  pickerDomCell,
  staticCell,
  textCell,
  seededTextCell,
  type GlideSheetColumn,
  type GlideSheetEdit,
  type GlideColumnEditor,
  type GlideDomCellSpec,
  type GlideSheetApi,
} from '../../src/glide';
import { MorphActionField } from '../../src/MorphActionField';
import { MorphSearchField } from '../../src/MorphSearchField';
import { inputCls } from '../../src/input';

/**
 * Two Glide demos:
 *  1. `CrewCardDemo` — the Day Manager crew card rebuilt on the kit's Glide
 *     primitives: DOM chrome (kit Checkbox / PickerField / Button) around a
 *     canvas grid, with per-cell read-only, kit pickers in the overlay editor
 *     and a single-click trash cell.
 *  2. `CellGalleryDemo` — every cell kind side by side: read-only, editable,
 *     locked, toggle, canvas button (single click), badge and a kit picker.
 */

/* ── Fixtures (the reference card's content) ─────────────────────────────── */

interface Location { id: string; name: string }

const LOCATIONS: Location[] = [
  { id: 'loc-piccadilly', name: "Piccadilly Circus, St. James's, East" },
  { id: 'loc-unit', name: 'Unit Base — Battersea' },
  { id: 'loc-stage', name: 'Stage 4 — Pinewood' },
];

const PEOPLE = {
  john: 'JOHN DOE',
  makis: 'MAKIS GOUDOUMIS',
  arthur: 'ARTHUR S. BLACK',
} as const;

const ROLES = ['Unit Production Manager', '1st AD'] as const;
type CrewRole = typeof ROLES[number];

interface CrewRow {
  id: string;
  role: CrewRole | 'Camera Operator';
  person: string;
  reportToId: string;
  call: string;
}

let rowSeq = 0;
const nextRowId = () => `crew-${++rowSeq}`;

const INITIAL_ROWS: CrewRow[] = [
  { id: 'crew-a', role: 'Unit Production Manager', person: PEOPLE.john, reportToId: 'loc-piccadilly', call: '08:00' },
  { id: 'crew-b', role: 'Unit Production Manager', person: PEOPLE.makis, reportToId: 'loc-piccadilly', call: '08:00' },
  { id: 'crew-c', role: '1st AD', person: PEOPLE.arthur, reportToId: 'loc-piccadilly', call: '08:00' },
];

const locationName = (id: string) => LOCATIONS.find(l => l.id === id)?.name ?? '';

/** Flattens the domain rows into the string map GlideSheet reads. */
function toGridRows(rows: CrewRow[]): Record<string, string>[] {
  return rows.map(row => ({
    id: row.id,
    role: row.role,
    person: row.person,
    reportToId: row.reportToId,
    reportTo: locationName(row.reportToId),
    call: row.call,
  }));
}

/* ── 1. Crew card ────────────────────────────────────────────────────────── */

const CREW_COLUMNS: GlideSheetColumn[] = [
  { key: 'role', label: 'Role', width: 210 },
  { key: 'person', label: 'Person', width: 190 },
  { key: 'reportTo', label: 'Report To', width: 220 },
  { key: 'call', label: 'Call', width: 80, align: 'center' },
  { key: 'actions', label: '', width: 44 },
];

const CREW_EDITABLE = new Set(['person', 'reportTo', 'call']);

export const CrewCardDemo: React.FC = () => {
  const kit = useKitTheme();
  const colors = useMemo(() => glideCellColors(kit?.mode ?? 'light'), [kit?.mode]);
  const sheetApi = React.useRef<GlideSheetApi | null>(null);
  const [rows, setRows] = useState<CrewRow[]>(INITIAL_ROWS);
  const [history, setHistory] = useState<CrewRow[][]>([]);
  const [readOnly, setReadOnly] = useState(false);
  const [deptIncluded, setDeptIncluded] = useState(true);
  const [deptReportTo, setDeptReportTo] = useState('loc-piccadilly');
  const [precall, setPrecall] = useState('');
  const [status, setStatus] = useState('no edits yet');
  const [commitCount, setCommitCount] = useState(0);

  const gridRows = useMemo(() => toGridRows(rows), [rows]);

  const commit = useCallback((next: CrewRow[]) => {
    setHistory(h => [...h.slice(-19), rows]);
    setRows(next);
    setCommitCount(c => c + 1);
  }, [rows]);

  const onCommit = useCallback((edits: GlideSheetEdit[]) => {
    // ONE state update for the whole operation: a commit is one undo entry.
    const next = rows.map(r => ({ ...r }));
    const byId = new Map(next.map(r => [r.id, r]));
    let changed = 0;
    for (const edit of edits) {
      const target = byId.get(gridRows[edit.row]?.id ?? '');
      if (!target) continue;
      // `person` and `reportTo` display labels but store ids/names themselves;
      // this demo stores the person NAME (resolveBy: 'label').
      if (edit.colKey === 'person') { target.person = edit.value; changed++; }
      else if (edit.colKey === 'reportTo') { target.reportToId = edit.value; changed++; }
      else if (edit.colKey === 'call') { target.call = edit.value; changed++; }
    }
    if (changed === 0) return;
    setStatus(`${edits.length} cell${edits.length === 1 ? '' : 's'} in one commit`);
    commit(next);
  }, [rows, gridRows, commit]);

  const getCellContent = useCallback((col: GlideSheetColumn, row: Record<string, string>) => {
    if (col.key === 'role') return staticCell(row.role, { themeOverride: { textDark: colors.muted } });
    // Native picker cell: the value is painted on the canvas (selectable,
    // double-click opens the editor). A small DOM chevron button in the cell
    // opens the same editor with ONE click.
    if (col.key === 'person') return seededTextCell(row.person, { displayData: row.person || '—' });
    if (col.key === 'reportTo') return seededTextCell(row.reportTo, { displayData: row.reportTo || '—' });
    if (col.key === 'actions') return staticCell('');
    return seededTextCell(row.call, { displayData: row.call || '—', align: 'center' });
  }, [colors.muted]);

  const getEditor = useCallback((row: number, colKey: string): GlideColumnEditor | undefined => {
    if (colKey === 'person') {
      return {
        kind: 'select',
        items: Object.values(PEOPLE).map(name => ({ id: name, label: name })),
        resolveBy: 'label',
        placeholder: 'Select…',
        panelMinWidth: 220,
      };
    }
    if (colKey === 'reportTo') {
      return {
        kind: 'select',
        items: LOCATIONS.map(l => ({ id: l.id, label: l.name })),
        resolveBy: 'id',
        seedValue: gridRows[row]?.reportToId ?? '',
        placeholder: 'Select…',
        panelMinWidth: 320,
        browse: 'open',
      };
    }
    return undefined;
  }, [gridRows]);

  /* Real PickerField per row, mounted ON the Person cell (domCells). Native
     focus/hover, the kit's own panel, and the row keeps its value while the
     grid scrolls — no overlay editor involved. */
  const rowCells = useMemo<GlideDomCellSpec[]>(() => {
    const out: GlideDomCellSpec[] = [];
    rows.forEach((row, index) => {
      out.push(pickerDomCell({
        row: index,
        colKey: 'person',
        label: row.person,
        testId: `glide-crew-person-open-${row.id}`,
        onOpen: () => sheetApi.current?.openCellEditor(index, 'person'),
      }));
      out.push(pickerDomCell({
        row: index,
        colKey: 'reportTo',
        label: row.reportTo,
        testId: `glide-crew-report-open-${row.id}`,
        onOpen: () => sheetApi.current?.openCellEditor(index, 'reportTo'),
      }));
      out.push({
        row: index,
        colKey: 'actions',
        // Full-bleed: the trash button IS the cell (whole cell is the target).
        bleed: true,
        node: (
          <button
            type="button"
            className="flex h-full w-full items-center justify-center text-rose-500 transition-colors hover:bg-rose-500/10 group-data-[glide-dom-focused=true]:bg-rose-500/10"
            aria-label="Remove from this day"
            title="Remove from this day"
            data-testid={`glide-crew-remove-${row.id}`}
            onClick={() => {
              setStatus('row removed');
              commit(rows.filter(r => r.id !== row.id));
            }}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        ),
      });
    });
    return out;
  }, [rows, commit]);

  const undo = () => {
    setHistory(h => {
      if (h.length === 0) return h;
      setRows(h[h.length - 1]);
      setStatus('undone');
      return h.slice(0, -1);
    });
  };

  const addRole = () => {
    const role: CrewRole | 'Camera Operator' = 'Camera Operator';
    const next: CrewRow = { id: nextRowId(), role, person: '', reportToId: deptReportTo, call: '' };
    setStatus('role added');
    commit([...rows, next]);
  };

  return (
    <div
      className={`rounded-lg border border-[color:var(--ui-border)] overflow-hidden bg-[var(--ui-panel-bg)] ${deptIncluded ? '' : 'opacity-60'}`}
      data-testid="glide-crew-card"
    >
      {/* Department band — plain DOM chrome, exactly like the app's crew card. */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-2.5 py-1.5 bg-[var(--ui-card-bg)] border-b border-[color:var(--ui-border)]">
        <span data-testid="glide-crew-include">
          <Checkbox checked={deptIncluded} onChange={setDeptIncluded} variant="plain" />
        </span>
        <span className="text-[11px] font-semibold text-[color:var(--ui-text)]">Production</span>
        <span className="ml-auto flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase tracking-wider text-[color:var(--ui-text-faint)]">Report to</span>
            <span data-testid="glide-crew-report-to">
              <PickerField
                appearance="chip"
                mode="single"
                values={deptReportTo ? [deptReportTo] : []}
                items={LOCATIONS.map(l => ({ id: l.id, label: l.name }))}
                resolveBy="id"
                display="names"
                onChange={values => setDeptReportTo(values[0] ?? '')}
                panelMinWidth={320}
                placeholder="—"
              />
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase tracking-wider text-[color:var(--ui-text-faint)]">Pre-call</span>
            <input
              className={`${inputCls('sm')} w-24`}
              value={precall}
              placeholder="-"
              onChange={e => setPrecall(e.target.value)}
              data-testid="glide-crew-precall"
            />
          </span>
        </span>
      </div>

      <GlideSheet
        dataAttr="data-glide-crew"
        columns={CREW_COLUMNS}
        rows={gridRows}
        getCellContent={getCellContent}
        getEditor={getEditor}
        onCommit={onCommit}
        editableKeys={CREW_EDITABLE}
        readOnly={readOnly}
        domCells={rowCells}
        apiRef={sheetApi}
        selectionKey="pg:glide:crew"
        baseRowHeight={38}
        baseHeaderHeight={34}
        fontSize={12.5}
        emptyLabel="No crew yet — add a role."
      />

      {/* Footer — kit Button, outside the canvas (a real DOM control). */}
      <div className="flex items-center gap-2 px-2 py-1.5 border-t border-[color:var(--ui-border)]">
        <Button variant="subtle" onClick={addRole} disabled={readOnly} data-testid="glide-crew-add-role">
          <Plus className="w-3 h-3" /> Add role
        </Button>
        <span className="ml-auto flex items-center gap-3 text-[11px] text-[color:var(--ui-text-faint)]">
          <span data-testid="glide-crew-status">{status}</span>
          <span data-testid="glide-crew-commits">{commitCount} commits</span>
          <Button
            variant="outline"
            onClick={undo}
            disabled={history.length === 0}
            data-testid="glide-crew-undo"
          >
            <Undo2 className="w-3 h-3" /> Undo
          </Button>
        </span>
      </div>
    </div>
  );
};

/* ── 2. Cell gallery ─────────────────────────────────────────────────────── */

const GALLERY_COLUMNS: GlideSheetColumn[] = [
  { key: 'kind', label: 'Cell', width: 110 },
  { key: 'editable', label: 'Editable', width: 150 },
  { key: 'locked', label: 'Locked', width: 120 },
  { key: 'toggle', label: 'Toggle', width: 80, align: 'center' },
  { key: 'picker', label: 'Picker', width: 150 },
  { key: 'button', label: 'Real button', width: 170 },
  { key: 'badge', label: 'Badge', width: 130 },
];

const GALLERY_EDITABLE = new Set(['editable', 'toggle', 'picker']);

interface GalleryRow {
  id: string;
  kind: string;
  editable: string;
  locked: string;
  toggle: boolean;
  picker: string;
}

const GALLERY_ROWS: GalleryRow[] = [
  { id: 'g1', kind: 'primary', editable: 'Type here', locked: 'Locked', toggle: true, picker: 'Production' },
  { id: 'g2', kind: 'subtle', editable: 'Multi-cell select', locked: 'Locked', toggle: false, picker: 'Camera' },
  { id: 'g3', kind: 'outline', editable: 'Fill down', locked: 'Locked', toggle: true, picker: 'Art' },
  { id: 'g4', kind: 'danger', editable: 'Paste a block', locked: 'Locked', toggle: false, picker: 'Sound' },
  { id: 'g5', kind: 'primary', editable: '', locked: 'Locked', toggle: false, picker: '' },
];

const PICKER_OPTIONS = ['Production', 'Camera', 'Art', 'Sound'];
const BUTTON_VARIANTS = ['primary', 'subtle', 'outline', 'danger-ghost'] as const;
const BUTTON_LABELS = ['Approve', 'Open…', 'Select', 'Delete'];
const BADGE_LABELS = ['INT DAY', 'EXT NIGHT', 'MORNING', 'HOLD', 'DONE'];
const BADGE_TONES = ['accent', 'neutral', 'warning', 'danger', 'success'] as const;

export const CellGalleryDemo: React.FC = () => {
  const sheetApi = React.useRef<GlideSheetApi | null>(null);
  const kit = useKitTheme();
  const colors = useMemo(() => glideCellColors(kit?.mode ?? 'light'), [kit?.mode]);
  const [rows, setRows] = useState<GalleryRow[]>(GALLERY_ROWS);
  const [clicks, setClicks] = useState(0);
  const [lastClick, setLastClick] = useState('—');

  const gridRows = useMemo(
    () => rows.map(r => ({ ...r, toggle: String(r.toggle), badge: BADGE_LABELS[Number(r.id.slice(1)) - 1] ?? 'OK' })),
    [rows],
  );

  const onCommit = useCallback((edits: GlideSheetEdit[]) => {
    setRows(prev => prev.map((row, i) => {
      const rowEdits = edits.filter(e => e.row === i);
      if (rowEdits.length === 0) return row;
      const next = { ...row };
      for (const edit of rowEdits) {
        if (edit.colKey === 'editable') next.editable = edit.value;
        else if (edit.colKey === 'picker') next.picker = edit.value;
        else if (edit.colKey === 'toggle') next.toggle = edit.value === 'true';
      }
      return next;
    }));
  }, []);

  const getCellContent = useCallback((col: GlideSheetColumn, row: Record<string, string>, rowIndex: number) => {
    if (col.key === 'kind') return staticCell(row.kind, { themeOverride: { textDark: colors.faint } });
    if (col.key === 'editable') return textCell(row.editable);
    if (col.key === 'locked') return staticCell('🔒 locked', { themeOverride: { textDark: colors.faint } });
    if (col.key === 'toggle') {
      return {
        kind: GridCellKind.Boolean,
        data: row.toggle === 'true',
        allowOverlay: false,
      };
    }
    // The chevron is the DOM helper's button — never draw a second one.
    if (col.key === 'picker') return seededTextCell(row.picker, { displayData: row.picker || '—' });
    // Real kit buttons are mounted over this cell (domCells), not drawn.
    if (col.key === 'button') return staticCell('');
    return kitBadgeCell({
      label: row.badge,
      tone: BADGE_TONES[rowIndex % BADGE_TONES.length],
    });
  }, [colors.faint]);

  const getEditor = useCallback((_row: number, colKey: string): GlideColumnEditor | undefined =>
    colKey === 'picker'
      ? { kind: 'select', items: PICKER_OPTIONS.map(v => ({ id: v, label: v })), resolveBy: 'label', placeholder: 'Department…', panelMinWidth: 200 }
      : undefined, []);

  /* Real controls in the cell: a kit Button and a PickerField per row. */
  const buttonCells = useMemo<GlideDomCellSpec[]>(() => {
    const out: GlideDomCellSpec[] = [];
    gridRows.forEach((row, index) => {
      out.push({
        row: index,
        colKey: 'button',
        node: (
          <Button
            variant={BUTTON_VARIANTS[index % BUTTON_VARIANTS.length]}
            className="w-full justify-center"
            onClick={() => {
              setClicks(c => c + 1);
              setLastClick(`row ${index + 1} · ${BUTTON_LABELS[index % BUTTON_LABELS.length]}`);
            }}
          >
            {BUTTON_LABELS[index % BUTTON_LABELS.length]}
          </Button>
        ),
      });
      out.push(pickerDomCell({
        row: index,
        colKey: 'picker',
        label: row.picker,
        testId: `glide-gallery-picker-open-${row.id}`,
        onOpen: () => sheetApi.current?.openCellEditor(index, 'picker'),
      }));
    });
    return out;
  }, [gridRows]);

  return (
    <div className="pg-stack" data-testid="glide-gallery">
      <div className="row">
        <span className="label">The button is a real DOM control; the picker is the native cell plus a chevron for one-click opening. The badge is painted (nothing to click).</span>
        <span className="text-[11px] text-[color:var(--ui-text-muted)]" data-testid="glide-gallery-clicks">
          clicks: {clicks}
        </span>
        <span className="text-[11px] text-[color:var(--ui-text-muted)]" data-testid="glide-gallery-last">
          last: {lastClick}
        </span>
        <Button
          variant="subtle"
          onClick={() => { setRows(GALLERY_ROWS); setClicks(0); setLastClick('—'); }}
          data-testid="glide-gallery-reset"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </Button>
      </div>
      <GlideSheet
        dataAttr="data-glide-gallery-sheet"
        columns={GALLERY_COLUMNS}
        rows={gridRows}
        getCellContent={getCellContent}
        getEditor={getEditor}
        onCommit={onCommit}
        editableKeys={GALLERY_EDITABLE}
        domCells={buttonCells}
        apiRef={sheetApi}
        apiRef={sheetApi}
        selectionKey="pg:glide:gallery"
        baseRowHeight={34}
        baseHeaderHeight={32}
      />
    </div>
  );
};

/* ── 3. Cell layouts (the cell as a container) ───────────────────────────── */

const LAYOUT_COLUMNS: GlideSheetColumn[] = [
  { key: 'label', label: 'Cell', width: 160 },
  { key: 'tools', label: 'Content (real DOM, arranged in the cell)', width: 620 },
];

const LAYOUT_ROWS = [
  { id: 'l1', label: 'Row actions' },
  { id: 'l2', label: 'Search + create' },
  { id: 'l3', label: 'Assign + apply' },
  { id: 'l4', label: 'Mode switch' },
];

/** The DOM cell is a full-bleed CONTAINER: lay out whatever the row needs —
 *  several buttons, a morph field next to an adder, a picker plus a commit
 *  button, a Seg. Nothing here is an overlay editor. */
export const CellLayoutsDemo: React.FC = () => {
  const kit = useKitTheme();
  const mode = kit?.mode ?? 'light';
  const [status, setStatus] = useState('—');
  const [dept, setDept] = useState('');
  const [terms, setTerms] = useState<Record<string, string>>({});
  const [added, setAdded] = useState<Record<string, string>>({});
  const [modeValue, setModeValue] = useState('day');

  const rows = useMemo(
    () => LAYOUT_ROWS.map(r => ({ id: r.id, label: r.label, tools: '' })),
    [],
  );

  const getCellContent = useCallback((col: GlideSheetColumn, row: Record<string, string>) =>
    col.key === 'label'
      ? staticCell(row.label)
      : staticCell(''), []);

  const onCommit = useCallback(() => {}, []);

  const domCells = useMemo<GlideDomCellSpec[]>(() => {
    const cell = (node: React.ReactNode, row: number) => ({ row, colKey: 'tools', node });
    return [
      cell(
        <div className="flex h-full items-center gap-2">
          <Button variant="primary" onClick={() => setStatus('approved row 1')}>Approve</Button>
          <Button variant="outline" onClick={() => setStatus('held row 1')}>Hold</Button>
          <Button variant="danger-ghost" onClick={() => setStatus('deleted row 1')}>Delete</Button>
        </div>,
        0,
      ),
      cell(
        <div className="flex h-full items-center gap-2">
          <MorphSearchField
            value={terms.l2 ?? ''}
            onChange={value => setTerms(t => ({ ...t, l2: value }))}
            triggerLabel={terms.l2 ? `Search: ${terms.l2}` : 'Search'}
            theme={mode}
            collapsedWidth={110}
            expandedWidth={220}
            onSubmit={value => setStatus(`search “${value}”`)}
          />
          <MorphActionField
            value={added.l2 ?? ''}
            onChange={value => setAdded(a => ({ ...a, l2: value }))}
            triggerLabel={added.l2 ? `Add: ${added.l2}` : 'Add'}
            theme={mode}
            variant="primary"
            clearOnSubmit={false}
            onSubmit={value => setStatus(`added “${value}”`)}
          />
        </div>,
        1,
      ),
      cell(
        <div className="flex h-full items-center gap-2">
          <PickerField
            appearance="chip"
            mode="single"
            values={dept ? [dept] : []}
            items={PICKER_OPTIONS.map(v => ({ id: v, label: v }))}
            resolveBy="label"
            display="names"
            placeholder="Department…"
            onChange={values => setDept(values[0] ?? '')}
            collapsedWidth={170}
            panelMinWidth={220}
          />
          <Button variant="primary" disabled={!dept} onClick={() => setStatus(`assigned ${dept}`)}>
            Apply
          </Button>
        </div>,
        2,
      ),
      cell(
        <div className="flex h-full items-center gap-2">
          <Seg
            options={[
              { v: 'day', l: 'Day' },
              { v: 'night', l: 'Night' },
              { v: 'magic', l: 'Magic hour' },
            ]}
            value={modeValue}
            onChange={value => { setModeValue(value); setStatus(`mode ${value}`); }}
            theme={mode}
          />
          <span className="text-[11px] text-[color:var(--ui-text-muted)]">one canvas row, three real controls</span>
        </div>,
        3,
      ),
    ];
  }, [terms, added, dept, mode, modeValue]);

  return (
    <div className="pg-stack" data-testid="glide-layouts">
      <div className="row">
        <span className="label">
          A DOM cell is a container the width of its column: lay out several kit controls in it like any
          other panel. The canvas cell behind stays blank.
        </span>
        <span className="text-[11px] text-[color:var(--ui-text-muted)]" data-testid="glide-layout-status">
          last: {status}
        </span>
      </div>
      <GlideSheet
        dataAttr="data-glide-layout-sheet"
        columns={LAYOUT_COLUMNS}
        rows={rows}
        getCellContent={getCellContent}
        onCommit={onCommit}
        editableKeys={new Set<string>()}
        domCells={domCells}
        selectionKey="pg:glide:layouts"
        baseRowHeight={44}
        baseHeaderHeight={32}
      />
    </div>
  );
};

/* ── 4. Button & field cells ─────────────────────────────────────────────── */

const BUTTON_COLUMNS: GlideSheetColumn[] = [
  { key: 'step', label: 'Step', width: 110 },
  { key: 'drawn', label: 'Kit button (DOM)', width: 170 },
  { key: 'search', label: 'Morph to search', width: 220 },
  { key: 'add', label: 'Text box', width: 220 },
];

const BUTTON_ROWS = [
  { id: 'b1', label: 'Approve', variant: 'primary' as const },
  { id: 'b2', label: 'Open…', variant: 'subtle' as const },
  { id: 'b3', label: 'Select', variant: 'outline' as const },
  { id: 'b4', label: 'Delete', variant: 'danger-ghost' as const },
];

/** Every button shape in one grid: the drawn faces (hover + focus painted on
 *  the canvas) and the FIELD cells, whose single click opens the real kit
 *  MorphSearchField / MorphActionField in Glide's overlay editor. */
export const ButtonTypesDemo: React.FC = () => {
  const kit = useKitTheme();
  const mode = kit?.mode ?? 'light';
  const [terms, setTerms] = useState<Record<string, string>>({});
  const [added, setAdded] = useState<Record<string, string>>({});
  const [status, setStatus] = useState('—');

  const gridRows = useMemo(
    () => BUTTON_ROWS.map(r => ({
      id: r.id,
      step: r.variant,
      label: r.label,
    })),
    [],
  );

  const onCommit = useCallback(() => {}, []);

  const getCellContent = useCallback((col: GlideSheetColumn, row: Record<string, string>, rowIndex: number) => {
    if (col.key === 'step') return staticCell(row.step);
    if (col.key === 'drawn') return staticCell('');
    // The real control is mounted ON the cell (domCells) — nothing to paint.
    return staticCell('');
  }, []);

  /* Real kit controls living in the cell, not in a floating editor: the grid
     pins them over the canvas at the cell's rect and they keep focus, hover,
     animation and tab order. */
  const domCells = useMemo<GlideDomCellSpec[]>(() => {
    const out: GlideDomCellSpec[] = [];
    BUTTON_ROWS.forEach((def, row) => {
      out.push({
        row,
        colKey: 'drawn',
        node: (
          <Button
            variant={def.variant}
            className="w-full justify-center"
            onClick={() => setStatus(`clicked ${def.label}`)}
          >
            {def.label}
          </Button>
        ),
      });
      out.push({
        row,
        colKey: 'search',
        node: (
          <div className="w-full">
          <MorphSearchField
            value={terms[def.id] ?? ''}
            onChange={value => setTerms(t => ({ ...t, [def.id]: value }))}
            triggerLabel={terms[def.id] ? `Search: ${terms[def.id]}` : 'Search'}
            placeholder="Search…"
            theme={mode}
            stretch
            collapsedWidth={110}
            expandedWidth={240}
            active={!!terms[def.id]}
            onSubmit={value => setStatus(`search “${value}”`)}
          />
          </div>
        ),
      });
      out.push({
        row,
        colKey: 'add',
        node: (
          <div className="w-full">
          <MorphActionField
            value={added[def.id] ?? ''}
            onChange={value => setAdded(a => ({ ...a, [def.id]: value }))}
            triggerLabel={added[def.id] ? `Add: ${added[def.id]}` : 'Add'}
            placeholder="New value…"
            theme={mode}
            variant="primary"
            stretch
            clearOnSubmit={false}
            onSubmit={value => setStatus(`added “${value}”`)}
          />
          </div>
        ),
      });
    });
    return out;
  }, [terms, added, mode]);

  return (
    <div className="pg-stack" data-testid="glide-buttons">
      <div className="row">
        <span className="label">
          Every control in this grid is REAL DOM mounted in the cell. Click “Search” and it morphs in
          place; the buttons are plain kit Buttons — no overlay, no canvas imitation.
        </span>
        <span className="text-[11px] text-[color:var(--ui-text-muted)]" data-testid="glide-buttons-status">
          last: {status}
        </span>
      </div>
      <GlideSheet
        dataAttr="data-glide-button-sheet"
        columns={BUTTON_COLUMNS}
        rows={gridRows}
        getCellContent={getCellContent}
        onCommit={onCommit}
        editableKeys={new Set<string>()}
        domCells={domCells}
        selectionKey="pg:glide:buttons"
        baseRowHeight={38}
        baseHeaderHeight={32}
        emptyLabel=""
      />
    </div>
  );
};

/** A tiny capability matrix for the section's footer card. */
export const CapabilityNotes: React.FC = () => (
  <ul className="pg-stack" style={{ margin: 0, paddingLeft: 16, fontSize: 11.5, lineHeight: 1.6, color: 'var(--ui-text-muted)' }}>
    <li><b>Per-cell lock</b> — a cell's own <code>readonly</code> flag. Mix locked and editable cells in one row; the editable wash only paints the ones you can write.</li>
    <li><b>Buttons</b> — real kit <code>Button</code>s mounted in the cell (<code>domCells</code>): native hover, focus, press and tab order. Canvas-painted buttons were dropped — DOM is strictly better now.</li>
    <li><b>Real DOM in a cell</b> — <code>domCells</code> pins a live React control over its cell (measured with Glide's <code>getBounds</code>, re-pinned on scroll/resize). It keeps focus, hover, animation and tab order; the trigger morphs in place instead of opening a floating editor.</li>
    <li><b>Kit panels in cells</b> — the overlay editor is also real DOM: <code>PickerField</code> / <code>SearchMenu</code> open exactly as they do elsewhere (<code>kitFieldCell</code>).</li>
    <li><b>DOM chrome stays DOM</b> — the department band, the Add-role row and the trash cell's tooltip are outside the canvas; kit buttons there are real buttons.</li>
    <li><b>Canvas-only limits</b> — canvases have no CSS hover/focus/text-selection (badges are the only painted interactive-looking thing, and they are read-only). Anything clickable should be a <code>domCells</code> control.</li>
    <li><b>Plumbing included</b> — range select, fill-down, copy/cut/paste/clear each commit ONCE via <code>onCommit</code> (one undo entry), with the app's paste interception so Glide never pastes twice.</li>
  </ul>
);
