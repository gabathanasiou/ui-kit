import React, { useCallback, useMemo, useState } from 'react';
import { Plus, RotateCcw, Undo2 } from 'lucide-react';
import {
  Button,
  Checkbox,
  PickerField,
  GlideSheet,
  GridCellKind,
  kitButtonCell,
  kitBadgeCell,
  kitFieldCell,
  glideCellColors,
  staticCell,
  textCell,
  seededTextCell,
  type GlideSheetColumn,
  type GlideSheetEdit,
  type GlideColumnEditor,
  useKitTheme,
} from '../../src/index';
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
];

const CREW_EDITABLE = new Set(['person', 'reportTo', 'call']);

export const CrewCardDemo: React.FC = () => {
  const kit = useKitTheme();
  const colors = useMemo(() => glideCellColors(kit?.mode ?? 'light'), [kit?.mode]);
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
    setCommitCount(c => c + 1);
    setStatus(`${edits.length} cell${edits.length === 1 ? '' : 's'} in one commit`);
    commit(next);
  }, [rows, gridRows, commit]);

  const getCellContent = useCallback((col: GlideSheetColumn, row: Record<string, string>) => {
    if (col.key === 'role') return staticCell(row.role, { themeOverride: { textDark: colors.muted } });
    if (col.key === 'person') {
      return textCell(row.person, {
        displayData: row.person ? `${row.person}  ▾` : 'Select…  ▾',
        cursor: 'pointer',
      });
    }
    if (col.key === 'reportTo') {
      return seededTextCell(row.reportTo, { displayData: row.reportTo || '—', cursor: 'pointer' });
    }
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
        panelMinWidth: 300,
        browse: 'open',
      };
    }
    return undefined;
  }, [gridRows]);

  const rowActions = useCallback((row: number) => [{
    key: 'remove',
    title: 'Remove from this day',
    icon: 'trash' as const,
    onClick: () => {
      const target = gridRows[row];
      if (!target) return;
      setStatus('row removed');
      commit(rows.filter(r => r.id !== target.id));
    },
  }], [gridRows, rows, commit]);

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
        rowActions={rowActions}
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
  { key: 'button', label: 'Button (one click)', width: 170 },
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
const BUTTON_VARIANTS = ['primary', 'subtle', 'outline', 'danger'] as const;
const BUTTON_LABELS = ['Approve', 'Open…', 'Select', 'Delete'];
const BADGE_LABELS = ['INT DAY', 'EXT NIGHT', 'MORNING', 'HOLD', 'DONE'];
const BADGE_TONES = ['accent', 'neutral', 'warning', 'danger', 'success'] as const;

export const CellGalleryDemo: React.FC = () => {
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
    if (col.key === 'picker') {
      return seededTextCell(row.picker, { displayData: row.picker ? `${row.picker}  ▾` : 'Select…  ▾', cursor: 'pointer' });
    }
    if (col.key === 'button') {
      const btn = kitButtonCell({
        label: BUTTON_LABELS[rowIndex % BUTTON_LABELS.length],
        icon: rowIndex === 0 ? 'check' : rowIndex === 3 ? 'trash' : undefined,
        variant: BUTTON_VARIANTS[rowIndex % BUTTON_VARIANTS.length],
        onActivate: () => {
          setClicks(c => c + 1);
          setLastClick(`row ${rowIndex + 1} · ${BUTTON_LABELS[rowIndex % BUTTON_LABELS.length]}`);
        },
      });
      return btn;
    }
    return kitBadgeCell({
      label: row.badge,
      tone: BADGE_TONES[rowIndex % BADGE_TONES.length],
    });
  }, [colors.faint]);

  const getEditor = useCallback((_row: number, colKey: string): GlideColumnEditor | undefined =>
    colKey === 'picker'
      ? { kind: 'select', items: PICKER_OPTIONS.map(v => ({ id: v, label: v })), resolveBy: 'label', placeholder: 'Department…', panelMinWidth: 200 }
      : undefined, []);

  return (
    <div className="pg-stack" data-testid="glide-gallery">
      <div className="row">
        <span className="label">Canvas buttons fire on ONE click (no editor opens). Click a badge? Nothing — it is read-only.</span>
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
        selectionKey="pg:glide:gallery"
        baseRowHeight={34}
        baseHeaderHeight={32}
      />
    </div>
  );
};

/* ── 3. Button & field cells ─────────────────────────────────────────────── */

const BUTTON_COLUMNS: GlideSheetColumn[] = [
  { key: 'step', label: 'Step', width: 110 },
  { key: 'drawn', label: 'Drawn button', width: 170 },
  { key: 'search', label: 'Morph to search', width: 220 },
  { key: 'add', label: 'Text box', width: 220 },
];

const BUTTON_ROWS = [
  { id: 'b1', label: 'Approve', variant: 'primary' as const, icon: 'check' as const },
  { id: 'b2', label: 'Open…', variant: 'subtle' as const, icon: undefined },
  { id: 'b3', label: 'Select', variant: 'outline' as const, icon: 'chevron' as const },
  { id: 'b4', label: 'Delete', variant: 'danger' as const, icon: 'trash' as const },
];

/** Every button shape in one grid: the drawn faces (hover + focus painted on
 *  the canvas) and the FIELD cells, whose single click opens the real kit
 *  MorphSearchField / MorphActionField in Glide's overlay editor. */
export const ButtonTypesDemo: React.FC = () => {
  const [terms, setTerms] = useState<Record<string, string>>({});
  const [added, setAdded] = useState<Record<string, string>>({});
  const [status, setStatus] = useState('—');

  const gridRows = useMemo(
    () => BUTTON_ROWS.map(r => ({
      id: r.id,
      step: r.variant,
      label: r.label,
      term: terms[r.id] ?? '',
      added: added[r.id] ?? '',
    })),
    [terms, added],
  );

  const onCommit = useCallback(() => {}, []);

  const getCellContent = useCallback((col: GlideSheetColumn, row: Record<string, string>, rowIndex: number) => {
    const def = BUTTON_ROWS[rowIndex];
    if (col.key === 'step') return staticCell(row.step);
    if (col.key === 'drawn') {
      return kitButtonCell({
        label: def.label,
        variant: def.variant,
        icon: def.icon,
        onActivate: () => setStatus(`clicked ${def.label}`),
      });
    }
    if (col.key === 'search') {
      return kitFieldCell({
        mode: 'search',
        label: 'Search',
        value: row.term,
        onSubmit: value => {
          setTerms(t => ({ ...t, [def.id]: value }));
          setStatus(`search “${value}”`);
        },
      });
    }
    return kitFieldCell({
      mode: 'action',
      label: 'Add',
      variant: 'primary',
      value: row.added,
      placeholder: 'New value…',
      onSubmit: value => {
        setAdded(a => ({ ...a, [def.id]: value }));
        setStatus(`added “${value}”`);
      },
    });
  }, []);

  return (
    <div className="pg-stack" data-testid="glide-buttons">
      <div className="row">
        <span className="label">
          Drawn buttons fire on one click (hover + focus painted on the canvas). The last two columns are
          one-click FIELD cells: the cell is the closed trigger, the real kit morph control opens in place.
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
    <li><b>Single-click buttons</b> — custom cells (<code>kitButtonCell</code>) drawn on the canvas, click handled by the renderer. No editor flash, no DOM.</li>
    <li><b>Kit panels in cells</b> — the overlay editor is real DOM: <code>PickerField</code> / <code>SearchMenu</code> open exactly as they do elsewhere.</li>
    <li><b>DOM chrome stays DOM</b> — the department band, the Add-role row and the trash cell's tooltip are outside the canvas; kit buttons there are real buttons.</li>
    <li><b>Not possible without a fork</b> — a persistent DOM control inside a cell, per-cell tab order, native text selection inside a cell, CSS hover/focus rings on canvas shapes (drawn states only).</li>
    <li><b>Plumbing included</b> — range select, fill-down, copy/cut/paste/clear each commit ONCE via <code>onCommit</code> (one undo entry), with the app's paste interception so Glide never pastes twice.</li>
  </ul>
);
