import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import {
  Button,
  GlideSheet,
  Modal,
  Seg,
  CONTROL_LANE,
  GLYPH_LANE,
  glideCellColors,
  kitGlyphCell,
  kitGlyphGroupCell,
  kitPickerCell,
  seededTextCell,
  staticCell,
  useKitTheme,
  type GlideColumnEditor,
  type GlideSheetApi,
  type GlideSheetColumn,
  type GlideSheetEdit,
} from '../../src/index';

/**
 * Canvas-native cell controls — the experiment page (never replaces `#glide`
 * or `#breakdown`).
 *
 * Every picker chevron, trash, plus and check on this page is PAINTED on the
 * canvas (`kitPickerCell` / `kitGlyphCell`): no `domCells`, no DOM box, no
 * second coordinate system. The page proves the three hard shapes:
 *  1. a full-window 60-scene Breakdown (canvas pickers + glyphs, freeze Seg,
 *     the trailing add row);
 *  2. the crew card embedded in page chrome (canvas pickers + trash, Add role);
 *  3. the same card inside a kit Modal (portals + the overlay picker).
 *
 * Dev-only helper: `window.__glideNativeCells` exposes `chevronCenter`,
 * `glyphCenter` and `cellBounds` computed from the grid's own `getBounds`, so
 * the spec can click the painted lane without hardcoding page coordinates.
 */

type Zone = 'full' | 'embedded' | 'modal';

const ZONES = [
  { v: 'full', l: 'Full screen' },
  { v: 'embedded', l: 'Embedded' },
  { v: 'modal', l: 'Modal' },
];

const FREEZE_OPTIONS = [
  { v: '0', l: 'Off' },
  { v: '1', l: 'Actions' },
  { v: '2', l: '+ Scene #' },
  { v: '4', l: '+ Set, Cast' },
];

interface NativeCellApi {
  cellBounds(row: number, colKey: string): { x: number; y: number; width: number; height: number } | null;
  chevronCenter(row: number, colKey: string): { x: number; y: number } | null;
  /** `index`/`count` address one button of a split group cell (left → right);
   *  the default is the single-button right lane. */
  glyphCenter(row: number, colKey: string, index?: number, count?: number): { x: number; y: number } | null;
}

declare global {
  interface Window { __glideNativeCells?: NativeCellApi }
}

/* ── Breakdown fixtures (60 scenes) ─────────────────────────────────────── */

interface NativeScene {
  id: string;
  sceneNumber: string;
  set: string;
  cast: string;
  locationId: string;
  pages: string;
  intExt: string;
  description: string;
}

const SETS = [
  "GEORGE BAILEY'S HOUSE — LIVING ROOM",
  'BEDFORD FALLS — MAIN STREET',
  'SAVINGS & LOAN — LOBBY',
  "MARTINI'S BAR",
  'BEDFORD FALLS — BRIDGE',
  "POTTER'S FIELD",
  'GRANVILLE HOUSE — PARLOUR',
  'BAILEY BUILDING — OFFICE',
];

const DESCRIPTIONS = [
  'George paces the living room, the suitcase already by the door.',
  'Mary hides the honeymoon money under the sofa cushion.',
  'The town wakes up; George runs past the bank, waving.',
  'The run on the bank; George talks the crowd down.',
  'George prays; Clarence arrives at the bar.',
  'George stands on the bridge; Clarence jumps in first.',
  'The graveyard without George; Clarence points at the headstone.',
  'Snow falls on the crowd outside the Bailey house.',
];

const CAST_OPTIONS = [
  '1. GEORGE',
  '1. GEORGE, 2. MARY',
  '2. MARY',
  '3. UNCLE BILLY',
  '4. POTTER',
  '5. TOWNSPERSON',
  '6. CLARENCE',
  '7. MA BAILEY',
];

const LOCATIONS = SETS.map((name, i) => ({ id: `loc-${i}`, name }));
const locationName = (id: string) => LOCATIONS.find(l => l.id === id)?.name ?? '';

const PAGES = ['1 2/8', '2 4/8', '0 6/8', '3 1/8', '1 5/8'];

function makeScenes(count = 60): NativeScene[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `nsc-${i + 1}`,
    sceneNumber: String(i + 1),
    set: SETS[i % SETS.length],
    cast: CAST_OPTIONS[i % CAST_OPTIONS.length],
    locationId: LOCATIONS[(i + 2) % LOCATIONS.length].id,
    pages: PAGES[i % PAGES.length],
    intExt: i % 3 === 0 ? 'EXT' : 'INT',
    description: DESCRIPTIONS[i % DESCRIPTIONS.length],
  }));
}

const SCENE_COLUMNS: GlideSheetColumn[] = [
  // ONE action column: two painted buttons in one cell (add · trash).
  { key: 'actions', label: '', width: 76 },
  { key: 'sceneNumber', label: 'Scene #', width: 68, trailingRowOptions: { hint: '' } },
  { key: 'set', label: 'Set', width: 230 },
  { key: 'cast', label: 'Cast', width: 170 },
  { key: 'location', label: 'Location', width: 230 },
  { key: 'pages', label: 'Pages', width: 76, align: 'center' },
  { key: 'intExt', label: 'I/E', width: 62, align: 'center' },
  { key: 'description', label: 'Description', width: 300 },
];

const SCENE_EDITABLE = new Set(['set', 'cast', 'location', 'pages', 'intExt', 'description']);

interface ZoneProps {
  onStatus: (text: string) => void;
  onCommit: () => void;
  onClicks: () => void;
  onRows: (count: number) => void;
}

/* ── Zone 1: full-screen 60-scene Breakdown ─────────────────────────────── */

const NativeBreakdown: React.FC<ZoneProps & {
  freeze: number;
  apiRef: React.RefObject<GlideSheetApi | null>;
}> = ({ onStatus, onCommit, onClicks, onRows, freeze, apiRef }) => {
  const kit = useKitTheme();
  const colors = useMemo(() => glideCellColors(kit?.mode ?? 'light'), [kit?.mode]);

  const bodyRef = useRef<HTMLDivElement>(null);
  const [gridHeight, setGridHeight] = useState(0);
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return undefined;
    const update = () => setGridHeight(Math.max(160, Math.round(el.getBoundingClientRect().height)));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const [scenes, setScenes] = useState<NativeScene[]>(() => makeScenes(60));
  const gridRows = useMemo(() => scenes.map(scene => ({
    id: scene.id,
    sceneNumber: scene.sceneNumber,
    set: scene.set,
    cast: scene.cast,
    locationId: scene.locationId,
    location: locationName(scene.locationId),
    pages: scene.pages,
    intExt: scene.intExt,
    description: scene.description,
  })), [scenes]);

  useEffect(() => { onRows(scenes.length); }, [scenes.length, onRows]);

  const openEditor = useCallback((row: number, colKey: string) => {
    apiRef.current?.openCellEditor(row, colKey);
  }, [apiRef]);

  const removeScene = useCallback((id: string) => {
    const index = scenes.findIndex(s => s.id === id);
    const scene = scenes[index];
    onClicks();
    setScenes(prev => prev.filter(s => s.id !== id));
    onCommit();
    onStatus(`removed scene ${scene?.sceneNumber ?? ''}`);
    // The deleted row is gone: keep the selection in the action column on the
    // row that FELL INTO the deleted slot (the one below); if it was the last
    // row, the new last row takes it.
    const remaining = scenes.length - 1;
    if (remaining > 0) apiRef.current?.selectCell(Math.min(index, remaining - 1), 'actions');
  }, [scenes, onStatus, onCommit, onClicks, apiRef]);

  const addScene = useCallback((afterIndex?: number, countClick = false) => {
    setScenes(prev => {
      const last = prev[prev.length - 1];
      const number = String((parseInt(last?.sceneNumber ?? '0', 10) || prev.length) + 1);
      const insertAt = afterIndex === undefined ? prev.length : Math.min(prev.length, afterIndex + 1);
      const template = prev[afterIndex ?? prev.length - 1] ?? makeScenes(1)[0];
      const next: NativeScene = {
        ...template,
        id: `nsc-${Date.now().toString(36)}-${prev.length}`,
        sceneNumber: number,
        cast: '',
        description: '',
      };
      const copy = [...prev];
      copy.splice(insertAt, 0, next);
      return copy;
    });
    if (countClick) onClicks();
    onCommit();
    onStatus(afterIndex === undefined ? 'scene added at the end' : 'scene inserted after row');
  }, [onStatus, onCommit, onClicks]);

  const onCommitEdits = useCallback((edits: GlideSheetEdit[]) => {
    const next = scenes.map(s => ({ ...s }));
    const byId = new Map(next.map(s => [s.id, s]));
    let changed = 0;
    for (const edit of edits) {
      const target = byId.get(gridRows[edit.row]?.id ?? '');
      if (!target) continue;
      if (edit.colKey === 'cast') { target.cast = edit.value; changed++; }
      else if (edit.colKey === 'location') { target.locationId = edit.value; changed++; }
      else if (edit.colKey === 'set') { target.set = edit.value; changed++; }
      else if (edit.colKey === 'pages') { target.pages = edit.value; changed++; }
      else if (edit.colKey === 'intExt') { target.intExt = edit.value; changed++; }
      else if (edit.colKey === 'description') { target.description = edit.value; changed++; }
    }
    if (changed === 0) return;
    setScenes(next);
    onCommit();
    const only = edits.length === 1 ? edits[0] : null;
    const shown = !only
      ? `${edits.length} cells in one commit`
      : only.colKey === 'location'
        ? `location → ${locationName(only.value) || '—'}`
        : `${only.colKey} → ${only.value || '—'}`;
    onStatus(shown);
  }, [scenes, gridRows, onStatus, onCommit]);

  const getCellContent = useCallback((col: GlideSheetColumn, row: Record<string, string>, rowIndex: number) => {
    if (col.key === 'actions') {
      // TWO painted buttons in ONE cell: add · trash. Each half has its own
      // full-rect hover tint, press flash and hit target.
      return kitGlyphGroupCell({
        lane: 'full',
        buttons: [
          {
            icon: 'plus',
            label: `Add scene after ${row.sceneNumber}`,
            tone: 'accent',
            hoverBg: 'rgba(5, 150, 105, 0.16)',
            onActivate: () => addScene(rowIndex, true),
          },
          {
            icon: 'trash',
            label: `Remove scene ${row.sceneNumber}`,
            tone: 'danger',
            hoverBg: 'rgba(220, 38, 38, 0.14)',
            onActivate: () => removeScene(row.id),
          },
        ],
      });
    }
    if (col.key === 'cast') {
      return kitPickerCell({
        value: row.cast,
        label: `Cast for scene ${row.sceneNumber}`,
        placeholder: '—',
        onOpen: () => openEditor(rowIndex, 'cast'),
      });
    }
    if (col.key === 'location') {
      return kitPickerCell({
        value: row.location,
        seedValue: row.locationId,
        label: `Location for scene ${row.sceneNumber}`,
        placeholder: '—',
        onOpen: () => openEditor(rowIndex, 'location'),
      });
    }
    if (col.key === 'sceneNumber') return staticCell(row.sceneNumber, { themeOverride: { textDark: colors.muted } });
    return seededTextCell(row[col.key] ?? '', { displayData: row[col.key] || '—', align: col.align });
  }, [colors.muted, removeScene, addScene, openEditor]);

  const getEditor = useCallback((row: number, colKey: string): GlideColumnEditor | undefined => {
    if (colKey === 'cast') {
      return {
        kind: 'select',
        items: CAST_OPTIONS.map(name => ({ id: name, label: name })),
        resolveBy: 'label',
        placeholder: 'Cast…',
        panelMinWidth: 220,
      };
    }
    if (colKey === 'location') {
      return {
        kind: 'select',
        items: LOCATIONS.map(l => ({ id: l.id, label: l.name })),
        resolveBy: 'id',
        seedValue: gridRows[row]?.locationId ?? '',
        placeholder: 'Location…',
        panelMinWidth: 360,
        browse: 'open',
      };
    }
    return undefined;
  }, [gridRows]);

  return (
    <div className="pg-page-body flex flex-col min-h-0">
      <div className="flex flex-wrap items-center gap-2 border-b border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-3 py-1.5">
        <Button variant="subtle" onClick={() => addScene()} data-testid="glide-native-cells-add">
          <Plus className="w-3 h-3" /> Add scene
        </Button>
        <span className="text-[11px] text-[color:var(--ui-text-faint)]">
          60 scenes · pickers and the 2-button action cell (add · trash) are painted on the canvas; the action cell scrolls with the rows (freeze is optional)
        </span>
      </div>
      <div ref={bodyRef} className="min-h-0 flex-1">
      <GlideSheet
        dataAttr="data-glide-native-breakdown"
        columns={SCENE_COLUMNS}
        rows={gridRows}
        getCellContent={getCellContent}
        getEditor={getEditor}
        onCommit={onCommitEdits}
        editableKeys={SCENE_EDITABLE}
        apiRef={apiRef}
        selectionKey="pg:glide-native:breakdown"
        rowMarkers={{ kind: 'clickable-number', width: 44, startIndex: 1 }}
        freezeColumns={freeze}
        scrollable
        height={gridHeight}
        overscrollY={4 * 34}
        onAddRow={() => addScene()}
        addRowHint=""
        baseRowHeight={34}
        baseHeaderHeight={34}
        fontSize={12.5}
        smoothScroll
      />
      </div>
    </div>
  );
};

/* ── Zones 2 + 3: the crew card (embedded / inside a Modal) ─────────────── */

interface CrewRow {
  id: string;
  role: string;
  person: string;
  reportToId: string;
  call: string;
}

const CREW_PEOPLE = ['JOHN DOE', 'MAKIS GOUDOUMIS', 'ARTHUR S. BLACK', 'SARA LEE'];
const CREW_LOCATIONS = [
  { id: 'loc-piccadilly', name: "Piccadilly Circus, St. James's, East" },
  { id: 'loc-unit', name: 'Unit Base — Battersea' },
  { id: 'loc-stage', name: 'Stage 4 — Pinewood' },
];
const crewLocationName = (id: string) => CREW_LOCATIONS.find(l => l.id === id)?.name ?? '';

const CREW_INITIAL: CrewRow[] = [
  { id: 'crew-a', role: 'Unit Production Manager', person: 'JOHN DOE', reportToId: 'loc-piccadilly', call: '08:00' },
  { id: 'crew-b', role: 'Unit Production Manager', person: 'MAKIS GOUDOUMIS', reportToId: 'loc-piccadilly', call: '08:00' },
  { id: 'crew-c', role: '1st AD', person: 'ARTHUR S. BLACK', reportToId: 'loc-unit', call: '07:30' },
];

const CREW_COLUMNS: GlideSheetColumn[] = [
  { key: 'role', label: 'Role', width: 170 },
  { key: 'person', label: 'Person', width: 170 },
  { key: 'reportTo', label: 'Report To', width: 210 },
  { key: 'call', label: 'Call', width: 70, align: 'center' },
  { key: 'actions', label: '', width: 40 },
];

const CREW_EDITABLE = new Set(['person', 'reportTo', 'call']);

let crewSeq = 0;

const NativeCrewCard: React.FC<ZoneProps & {
  apiRef: React.RefObject<GlideSheetApi | null>;
}> = ({ onStatus, onCommit, onClicks, onRows, apiRef }) => {
  const kit = useKitTheme();
  const colors = useMemo(() => glideCellColors(kit?.mode ?? 'light'), [kit?.mode]);
  const [rows, setRows] = useState<CrewRow[]>(CREW_INITIAL);

  const gridRows = useMemo(() => rows.map(row => ({
    id: row.id,
    role: row.role,
    person: row.person,
    reportToId: row.reportToId,
    reportTo: crewLocationName(row.reportToId),
    call: row.call,
  })), [rows]);

  useEffect(() => { onRows(rows.length); }, [rows.length, onRows]);

  const openEditor = useCallback((row: number, colKey: string) => {
    apiRef.current?.openCellEditor(row, colKey);
  }, [apiRef]);

  const removeRow = useCallback((id: string) => {
    const index = rows.findIndex(r => r.id === id);
    const row = rows[index];
    onClicks();
    setRows(prev => prev.filter(r => r.id !== id));
    onCommit();
    onStatus(`removed ${row?.person || row?.role || 'row'}`);
    // The row below falls into the deleted slot: keep the selection there.
    const remaining = rows.length - 1;
    if (remaining > 0) apiRef.current?.selectCell(Math.min(index, remaining - 1), 'actions');
  }, [rows, onStatus, onCommit, onClicks, apiRef]);

  const addRole = useCallback(() => {
    setRows(prev => [...prev, {
      id: `crew-${++crewSeq}`,
      role: 'Camera Operator',
      person: '',
      reportToId: 'loc-piccadilly',
      call: '',
    }]);
    onCommit();
    onStatus('role added');
  }, [onStatus, onCommit]);

  const onCommitEdits = useCallback((edits: GlideSheetEdit[]) => {
    const next = rows.map(r => ({ ...r }));
    const byId = new Map(next.map(r => [r.id, r]));
    let changed = 0;
    for (const edit of edits) {
      const target = byId.get(gridRows[edit.row]?.id ?? '');
      if (!target) continue;
      if (edit.colKey === 'person') { target.person = edit.value; changed++; }
      else if (edit.colKey === 'reportTo') { target.reportToId = edit.value; changed++; }
      else if (edit.colKey === 'call') { target.call = edit.value; changed++; }
    }
    if (changed === 0) return;
    setRows(next);
    onCommit();
    const only = edits.length === 1 ? edits[0] : null;
    const shown = !only
      ? `${edits.length} cells in one commit`
      : only.colKey === 'reportTo'
        ? `report to → ${crewLocationName(only.value) || '—'}`
        : `${only.colKey} → ${only.value || '—'}`;
    onStatus(shown);
  }, [rows, gridRows, onStatus, onCommit]);

  const getCellContent = useCallback((col: GlideSheetColumn, row: Record<string, string>, rowIndex: number) => {
    if (col.key === 'role') return staticCell(row.role, { themeOverride: { textDark: colors.muted } });
    if (col.key === 'person') {
      return kitPickerCell({
        value: row.person,
        label: `Person for ${row.role}`,
        placeholder: '—',
        onOpen: () => openEditor(rowIndex, 'person'),
      });
    }
    if (col.key === 'reportTo') {
      return kitPickerCell({
        value: row.reportTo,
        seedValue: row.reportToId,
        label: `Report to for ${row.person || row.role}`,
        placeholder: '—',
        onOpen: () => openEditor(rowIndex, 'reportTo'),
      });
    }
    if (col.key === 'actions') {
      return kitGlyphCell({
        icon: 'trash',
        label: `Remove ${row.person || row.role}`,
        tone: 'danger',
        lane: 'full',
        onActivate: () => removeRow(row.id),
      });
    }
    return seededTextCell(row.call, { displayData: row.call || '—', align: 'center' });
  }, [colors.muted, openEditor, removeRow]);

  const getEditor = useCallback((row: number, colKey: string): GlideColumnEditor | undefined => {
    if (colKey === 'person') {
      return {
        kind: 'select',
        items: CREW_PEOPLE.map(name => ({ id: name, label: name })),
        resolveBy: 'label',
        placeholder: 'Select…',
        panelMinWidth: 220,
      };
    }
    if (colKey === 'reportTo') {
      return {
        kind: 'select',
        items: CREW_LOCATIONS.map(l => ({ id: l.id, label: l.name })),
        resolveBy: 'id',
        seedValue: gridRows[row]?.reportToId ?? '',
        placeholder: 'Select…',
        panelMinWidth: 320,
        browse: 'open',
      };
    }
    return undefined;
  }, [gridRows]);

  return (
    <div className="overflow-hidden rounded-lg border border-[color:var(--ui-border)] bg-[var(--ui-panel-bg)]" data-testid="glide-native-crew-card">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-2.5 py-1.5">
        <span className="text-[11px] font-semibold text-[color:var(--ui-text)]">Production</span>
        <span className="text-[10px] uppercase tracking-wider text-[color:var(--ui-text-faint)]">Canvas crew</span>
        <span className="ml-auto text-[10px] text-[color:var(--ui-text-faint)]">no DOM cells</span>
      </div>

      <GlideSheet
        dataAttr="data-glide-native-crew"
        columns={CREW_COLUMNS}
        rows={gridRows}
        getCellContent={getCellContent}
        getEditor={getEditor}
        onCommit={onCommitEdits}
        editableKeys={CREW_EDITABLE}
        apiRef={apiRef}
        selectionKey="pg:glide-native:crew"
        baseRowHeight={38}
        baseHeaderHeight={34}
        fontSize={12.5}
        emptyLabel="No crew yet — add a role."
      />

      <div className="flex items-center gap-2 border-t border-[color:var(--ui-border)] px-2 py-1.5">
        <Button variant="subtle" onClick={addRole} data-testid="glide-native-cells-add">
          <Plus className="w-3 h-3" /> Add role
        </Button>
        <span className="ml-auto text-[11px] text-[color:var(--ui-text-faint)]">
          Pickers and trash are painted on the canvas
        </span>
      </div>
    </div>
  );
};

/* ── The page ───────────────────────────────────────────────────────────── */

export const GlideNativeCellsPage: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const [zone, setZone] = useState<Zone>('full');
  // Off by default: the action buttons are painted cells INSIDE the scrolling
  // body, not a stuck overlay. Freeze them (or any leading column) with the Seg.
  const [freeze, setFreeze] = useState(0);
  const [status, setStatus] = useState('no edits yet');
  const [clicks, setClicks] = useState(0);
  const [commits, setCommits] = useState(0);
  const [rows, setRows] = useState(60);
  const [modalOpen, setModalOpen] = useState(true);

  const fullApi = useRef<GlideSheetApi | null>(null);
  const crewApi = useRef<GlideSheetApi | null>(null);
  const zoneRef = useRef<Zone>(zone);
  zoneRef.current = zone;

  const onStatus = useCallback((text: string) => setStatus(text), []);
  const onCommit = useCallback(() => setCommits(c => c + 1), []);
  const onClicks = useCallback(() => setClicks(c => c + 1), []);
  const onRows = useCallback((count: number) => setRows(count), []);

  useEffect(() => {
    const api = () => (zoneRef.current === 'full' ? fullApi.current : crewApi.current);
    window.__glideNativeCells = {
      cellBounds(row, colKey) {
        const b = api()?.getCellBounds(row, colKey);
        return b ? { x: b.x, y: b.y, width: b.width, height: b.height } : null;
      },
      chevronCenter(row, colKey) {
        const b = api()?.getCellBounds(row, colKey);
        if (!b) return null;
        const lane = Math.min(CONTROL_LANE, b.width);
        return { x: b.x + b.width - lane / 2, y: b.y + b.height / 2 };
      },
      glyphCenter(row, colKey, index = 0, count = 1) {
        const b = api()?.getCellBounds(row, colKey);
        if (!b) return null;
        if (count <= 1) {
          const lane = Math.min(GLYPH_LANE, b.width);
          return { x: b.x + b.width - lane / 2, y: b.y + b.height / 2 };
        }
        const segment = b.width / count;
        return { x: b.x + segment * (index + 0.5), y: b.y + b.height / 2 };
      },
    };
    return () => { delete window.__glideNativeCells; };
  }, []);

  useEffect(() => {
    if (zone === 'modal') setModalOpen(true);
  }, [zone]);

  return (
    <div className="pg-page" data-testid="glide-native-cells-demo">
      <header className="pg-page-head">
        <button type="button" className="pg-page-back" onClick={onExit} data-testid="glide-native-cells-back">
          ← Playground
        </button>
        <div className="pg-page-title">IT&rsquo;S A WONDERFUL LIFE</div>
        <span className="pg-page-sub">Canvas controls</span>
        <a
          className="pg-page-back"
          href="#glide-single-cell"
          data-testid="glide-native-cells-single-link"
          title="The minimal one-cell input loop"
        >
          Single cell →
        </a>
        <span className="pg-page-stats" data-testid="glide-native-cells-rows">
          {rows} {zone === 'full' ? 'scenes' : 'crew'}
        </span>
        <div className="pg-page-tools">
          <span data-testid="glide-native-cells-zone">
            <Seg dense value={zone} options={ZONES} onChange={v => setZone(v as Zone)} />
          </span>
          {zone === 'full' ? (
            <span data-testid="glide-native-cells-freeze">
              <Seg dense value={String(freeze)} options={FREEZE_OPTIONS} onChange={v => setFreeze(Number(v))} />
            </span>
          ) : null}
          <span className="pg-page-meta">
            <span className="pg-page-status" data-testid="glide-native-cells-clicks">clicks: {clicks}</span>
            <span className="pg-page-status" data-testid="glide-native-cells-status">{status}</span>
            <span className="pg-page-status" data-testid="glide-native-cells-commits">
              {commits} commit{commits === 1 ? '' : 's'}
            </span>
          </span>
        </div>
      </header>

      {zone === 'full' ? (
        <NativeBreakdown
          freeze={freeze}
          apiRef={fullApi}
          onStatus={onStatus}
          onCommit={onCommit}
          onClicks={onClicks}
          onRows={onRows}
        />
      ) : (
        <div className="pg-page-body overflow-auto p-4">
          <div className="mx-auto max-w-3xl">
            {zone === 'embedded' ? (
              <NativeCrewCard
                apiRef={crewApi}
                onStatus={onStatus}
                onCommit={onCommit}
                onClicks={onClicks}
                onRows={onRows}
              />
            ) : (
              <div className="rounded-lg border border-dashed border-[color:var(--ui-border)] p-6 text-center text-xs text-[color:var(--ui-text-faint)]">
                The crew card is in a kit Modal. Allow it to open, or
                <Button variant="subtle" className="ml-2" onClick={() => setModalOpen(true)} data-testid="glide-native-cells-open-modal">
                  Open crew card
                </Button>
                <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Crew — canvas cells" width="max-w-3xl">
                  <NativeCrewCard
                    apiRef={crewApi}
                    onStatus={onStatus}
                    onCommit={onCommit}
                    onClicks={onClicks}
                    onRows={onRows}
                  />
                </Modal>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
