import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown, Plus, Trash2, Undo2 } from 'lucide-react';
import {
  Button,
  GlideSheet,
  Seg,
  glideCellColors,
  seededTextCell,
  staticCell,
  useKitTheme,
  type GlideColumnEditor,
  type GlideDomCellSpec,
  type GlideSheetColumn,
  type GlideSheetEdit,
} from '../../src/index';

/**
 * Breakdown — the main app's Glide Breakdown tab rebuilt at page scale.
 *
 * This is the stress surface for the two grid features the app needs next:
 *  - the row-marker gutter + frozen leading columns (`Scene #`, `Pages`, …)
 *    stay put while the breakdown scrolls sideways;
 *  - a trailing add-row plus a fixed grid height (the header stays pinned and
 *    the scene list scrolls vertically) — the real tab's shape, not a card.
 *
 * Data, editors and the one-commit undo contract mirror the app: every edit,
 * add and delete is one state update (one undo entry), and the cell faces are
 * the SAME kit primitives the rest of the playground uses.
 */

interface SceneRow {
  id: string;
  sceneNumber: string;
  pages: string;
  scriptDay: string;
  intExt: string;
  set: string;
  dayNight: string;
  description: string;
  cast: string;
  notes: string;
  props: string;
  wardrobe: string;
  vehicles: string;
}

const INT_EXT = ['INT', 'EXT'];
const DAY_NIGHT = ['DAY', 'NIGHT', 'MORNING', 'EVENING'];

const SETS = [
  "GEORGE BAILEY'S HOUSE — LIVING ROOM",
  "GEORGE BAILEY'S HOUSE — DINING ROOM",
  "GEORGE BAILEY'S HOUSE — PORCH",
  'BEDFORD FALLS — MAIN STREET',
  'BEDFORD FALLS — BRIDGE',
  'BEDFORD FALLS — TOWN SQUARE',
  'BEDFORD FALLS — HIGH SCHOOL',
  'SAVINGS & LOAN — LOBBY',
  "MARTINI'S BAR",
  "POTTER'S FIELD",
  'GRANVILLE HOUSE — PARLOUR',
  'BAILEY BUILDING — OFFICE',
];

const INITIAL_SCENES: SceneRow[] = [
  {
    id: 'sc-1', sceneNumber: '1', pages: '4 2/8', scriptDay: '1', intExt: 'INT',
    set: "GEORGE BAILEY'S HOUSE — LIVING ROOM", dayNight: 'DAY',
    description: 'George paces the living room, the suitcase already by the door.',
    cast: '1. GEORGE, 2. MARY', notes: 'Christmas Eve, 1945.', props: 'Suitcase, letter',
    wardrobe: "George's suit, Mary's coat", vehicles: '—',
  },
  {
    id: 'sc-1a', sceneNumber: '1A', pages: '0 4/8', scriptDay: '1', intExt: 'INT',
    set: "GEORGE BAILEY'S HOUSE — DINING ROOM", dayNight: 'DAY',
    description: 'Mary hides the honeymoon money under the sofa cushion.',
    cast: '2. MARY', notes: '', props: 'Sofa cushion, envelope',
    wardrobe: 'Mary’s dress', vehicles: '—',
  },
  {
    id: 'sc-2', sceneNumber: '2', pages: '2 6/8', scriptDay: '1', intExt: 'EXT',
    set: 'BEDFORD FALLS — MAIN STREET', dayNight: 'DAY',
    description: 'The town wakes up; George runs past the bank, waving.',
    cast: '1. GEORGE, 3. UNCLE BILLY', notes: 'Snow on the ground.', props: 'Newspaper, satchel',
    wardrobe: 'Winter coats', vehicles: 'Delivery truck',
  },
  {
    id: 'sc-3', sceneNumber: '3', pages: '1 1/8', scriptDay: '2', intExt: 'INT',
    set: 'SAVINGS & LOAN — LOBBY', dayNight: 'DAY',
    description: 'The run on the bank; George talks the crowd down.',
    cast: '1. GEORGE, 4. POTTER, 5. TOWNSPERSON', notes: 'Crowd of 20.', props: 'Cash box, ledgers',
    wardrobe: 'Bank teller uniforms', vehicles: '—',
  },
  {
    id: 'sc-4', sceneNumber: '4', pages: '3 3/8', scriptDay: '2', intExt: 'INT',
    set: "MARTINI'S BAR", dayNight: 'NIGHT',
    description: 'George prays; Clarence arrives at the bar.',
    cast: '1. GEORGE, 6. CLARENCE', notes: 'Rain outside the window.', props: 'Whiskey bottle, two glasses',
    wardrobe: 'George’s overcoat', vehicles: '—',
  },
  {
    id: 'sc-5', sceneNumber: '5', pages: '2 0/8', scriptDay: '3', intExt: 'EXT',
    set: 'BEDFORD FALLS — BRIDGE', dayNight: 'NIGHT',
    description: 'George stands on the bridge; Clarence jumps in first.',
    cast: '1. GEORGE, 6. CLARENCE', notes: 'Night shoot, river safety.', props: 'Bridge railing, police whistle',
    wardrobe: 'Wet overcoat', vehicles: 'Police car',
  },
  {
    id: 'sc-6', sceneNumber: '6', pages: '1 5/8', scriptDay: '3', intExt: 'EXT',
    set: "POTTER'S FIELD", dayNight: 'NIGHT',
    description: 'The graveyard without George; Clarence points at the headstone.',
    cast: '1. GEORGE, 6. CLARENCE', notes: '', props: 'Headstone', wardrobe: 'Overcoats', vehicles: '—',
  },
  {
    id: 'sc-7', sceneNumber: '7', pages: '2 2/8', scriptDay: '4', intExt: 'INT',
    set: "GEORGE BAILEY'S HOUSE — PORCH", dayNight: 'EVENING',
    description: 'George comes home to a house that was never his.',
    cast: '1. GEORGE, 7. MA BAILEY', notes: 'Porch light practical.', props: 'Front door key', wardrobe: 'Dressing gown', vehicles: '—',
  },
  {
    id: 'sc-8', sceneNumber: '8', pages: '0 6/8', scriptDay: '4', intExt: 'EXT',
    set: 'BEDFORD FALLS — HIGH SCHOOL', dayNight: 'DAY',
    description: 'Flashback: young George skips the graduation dance.',
    cast: '8. YOUNG GEORGE, 2. MARY', notes: 'Memory sequence, warm grade.', props: 'Dance decorations, punch bowl', wardrobe: '1940s school clothes', vehicles: '—',
  },
  {
    id: 'sc-9', sceneNumber: '9', pages: '3 0/8', scriptDay: '5', intExt: 'INT',
    set: 'GRANVILLE HOUSE — PARLOUR', dayNight: 'MORNING',
    description: 'The honeymoon send-off; the cab waits outside.',
    cast: '1. GEORGE, 2. MARY, 3. UNCLE BILLY', notes: '', props: 'Wedding gifts, coffee tray', wardrobe: 'Travelling suits', vehicles: 'Taxi cab',
  },
  {
    id: 'sc-10', sceneNumber: '10', pages: '1 3/8', scriptDay: '5', intExt: 'EXT',
    set: 'BEDFORD FALLS — TOWN SQUARE', dayNight: 'DAY',
    description: 'The crowd gathers around the Bailey Savings & Loan sign.',
    cast: '5. TOWNSPERSON, 1. GEORGE', notes: 'Crowd of 40; snow towers.', props: 'Banner, handbell', wardrobe: 'Winter coats', vehicles: '—',
  },
  {
    id: 'sc-11', sceneNumber: '11', pages: '4 1/8', scriptDay: '6', intExt: 'INT',
    set: 'BAILEY BUILDING — OFFICE', dayNight: 'NIGHT',
    description: 'George closes the books; the family sings Auld Lang Syne.',
    cast: '1. GEORGE, 2. MARY, 3. UNCLE BILLY, 6. CLARENCE', notes: 'Final scene.', props: 'Ledgers, calendar', wardrobe: 'Knit sweaters', vehicles: '—',
  },
  {
    id: 'sc-12', sceneNumber: '12', pages: '1 6/8', scriptDay: '6', intExt: 'EXT',
    set: 'BEDFORD FALLS — MAIN STREET', dayNight: 'NIGHT',
    description: 'Snow falls on the crowd outside the Bailey house.',
    cast: '5. TOWNSPERSON, 1. GEORGE', notes: 'Snow machines.', props: 'Handbell, lanterns',
    wardrobe: 'Winter coats', vehicles: 'Police car',
  },
  {
    id: 'sc-13', sceneNumber: '13', pages: '0 5/8', scriptDay: '7', intExt: 'INT',
    set: "GEORGE BAILEY'S HOUSE — LIVING ROOM", dayNight: 'NIGHT',
    description: 'The family gathers around the tree; Zuzu hears the bell.',
    cast: '1. GEORGE, 2. MARY, 9. ZUZU', notes: '', props: 'Bell, tree', wardrobe: 'Pyjamas', vehicles: '—',
  },
  {
    id: 'sc-14', sceneNumber: '14', pages: '2 4/8', scriptDay: '7', intExt: 'EXT',
    set: 'BEDFORD FALLS — TOWN SQUARE', dayNight: 'DAY',
    description: 'The building and loan crowd celebrates the rescue.',
    cast: '5. TOWNSPERSON, 3. UNCLE BILLY', notes: 'Crowd of 30.', props: 'Cash basket, banner',
    wardrobe: 'Winter coats', vehicles: '—',
  },
  {
    id: 'sc-15', sceneNumber: '15', pages: '1 0/8', scriptDay: '8', intExt: 'INT',
    set: 'SAVINGS & LOAN — LOBBY', dayNight: 'DAY',
    description: 'Potter offers George a job; George turns him down.',
    cast: '1. GEORGE, 4. POTTER', notes: '', props: 'Contract, pen', wardrobe: 'Business suits', vehicles: '—',
  },
  {
    id: 'sc-16', sceneNumber: '16', pages: '3 2/8', scriptDay: '8', intExt: 'EXT',
    set: 'BEDFORD FALLS — BRIDGE', dayNight: 'EVENING',
    description: 'Clarence shows George the town that never was.',
    cast: '1. GEORGE, 6. CLARENCE', notes: 'Dusk, practical street lamps.', props: 'Bridge railing', wardrobe: 'Overcoats', vehicles: '—',
  },
  {
    id: 'sc-17', sceneNumber: '17', pages: '0 7/8', scriptDay: '9', intExt: 'INT',
    set: "MARTINI'S BAR", dayNight: 'NIGHT',
    description: 'Nick pours another round; the piano player keeps playing.',
    cast: '1. GEORGE, 6. CLARENCE, 10. NICK', notes: '', props: 'Bottles, piano', wardrobe: 'Bar aprons', vehicles: '—',
  },
  {
    id: 'sc-18', sceneNumber: '18', pages: '2 1/8', scriptDay: '9', intExt: 'EXT',
    set: 'GRANVILLE HOUSE — PARLOUR', dayNight: 'DAY',
    description: 'The wedding reception spills into the garden.',
    cast: '2. MARY, 7. MA BAILEY, 5. TOWNSPERSON', notes: 'Garden party.', props: 'Cake, gramophone', wardrobe: 'Wedding guest suits', vehicles: 'Taxi cab',
  },
  {
    id: 'sc-19', sceneNumber: '19', pages: '1 4/8', scriptDay: '10', intExt: 'INT',
    set: 'BAILEY BUILDING — OFFICE', dayNight: 'DAY',
    description: 'Uncle Billy misplaces the bank deposit.',
    cast: '3. UNCLE BILLY, 1. GEORGE', notes: '', props: 'Deposit envelope, newspaper', wardrobe: 'Office suits', vehicles: '—',
  },
  {
    id: 'sc-20', sceneNumber: '20', pages: '0 3/8', scriptDay: '10', intExt: 'EXT',
    set: "POTTER'S FIELD", dayNight: 'NIGHT',
    description: 'George runs through the snow, calling for Clarence.',
    cast: '1. GEORGE', notes: 'Handheld, snow.', props: '—', wardrobe: 'Torn overcoat', vehicles: '—',
  },
  {
    id: 'sc-21', sceneNumber: '21', pages: '1 2/8', scriptDay: '11', intExt: 'INT',
    set: 'SAVINGS & LOAN — LOBBY', dayNight: 'DAY',
    description: 'The townsfolk empty their pockets onto the desk.',
    cast: '5. TOWNSPERSON, 1. GEORGE, 2. MARY', notes: 'Crowd of 25.', props: 'Cash basket, coins', wardrobe: 'Winter coats', vehicles: '—',
  },
  {
    id: 'sc-22', sceneNumber: '22', pages: '0 4/8', scriptDay: '11', intExt: 'EXT',
    set: 'BEDFORD FALLS — MAIN STREET', dayNight: 'DAY',
    description: 'The street fills with neighbours carrying parcels.',
    cast: '5. TOWNSPERSON', notes: 'Process shot.', props: 'Parcels, wreaths', wardrobe: 'Christmas coats', vehicles: 'Delivery truck',
  },
  {
    id: 'sc-23', sceneNumber: '23', pages: '2 3/8', scriptDay: '12', intExt: 'INT',
    set: "GEORGE BAILEY'S HOUSE — DINING ROOM", dayNight: 'NIGHT',
    description: 'The table is laid; Harry proposes the toast.',
    cast: '1. GEORGE, 2. MARY, 11. HARRY', notes: 'Feast setup.', props: 'Turkey, candles', wardrobe: 'Party suits', vehicles: '—',
  },
  {
    id: 'sc-24', sceneNumber: '24', pages: '0 6/8', scriptDay: '12', intExt: 'INT',
    set: "MARTINI'S BAR", dayNight: 'NIGHT',
    description: 'Clarence gets his wings; the bell rings.',
    cast: '6. CLARENCE', notes: 'Insert: bell.', props: 'Bell', wardrobe: 'Angel coat', vehicles: '—',
  },
  {
    id: 'sc-25', sceneNumber: '25', pages: '1 5/8', scriptDay: '13', intExt: 'EXT',
    set: 'BEDFORD FALLS — BRIDGE', dayNight: 'NIGHT',
    description: 'Snow falls on the bridge as the town sings.',
    cast: '1. GEORGE, 2. MARY, 5. TOWNSPERSON', notes: 'Snow towers.', props: 'Lanterns', wardrobe: 'Winter coats', vehicles: 'Police car',
  },
  {
    id: 'sc-26', sceneNumber: '26', pages: '0 2/8', scriptDay: '13', intExt: 'INT',
    set: 'BAILEY BUILDING — OFFICE', dayNight: 'NIGHT',
    description: 'Uncle Billy counts the rescue money twice.',
    cast: '3. UNCLE BILLY', notes: '', props: 'Cash box, ledger', wardrobe: 'Office suit', vehicles: '—',
  },
  {
    id: 'sc-27', sceneNumber: '27', pages: '1 0/8', scriptDay: '14', intExt: 'EXT',
    set: 'GRANVILLE HOUSE — PARLOUR', dayNight: 'EVENING',
    description: 'The reception spills into the garden one last time.',
    cast: '2. MARY, 7. MA BAILEY', notes: '', props: 'Gramophone', wardrobe: 'Party dresses', vehicles: 'Taxi cab',
  },
  {
    id: 'sc-28', sceneNumber: '28', pages: '0 1/8', scriptDay: '14', intExt: 'EXT',
    set: "POTTER'S FIELD", dayNight: 'NIGHT',
    description: 'The headstone reads: George Bailey, 1895–1946.',
    cast: '1. GEORGE, 6. CLARENCE', notes: '', props: 'Headstone', wardrobe: 'Overcoats', vehicles: '—',
  },
];

const COLUMNS: GlideSheetColumn[] = [
  // The app's first data column is the row-action lane (trash / add plus).
  // The trailing create row is glyph-only: no text label in any lane.
  { key: 'actions', label: '', width: 36, trailingRowOptions: { hint: '' } },
  { key: 'sceneNumber', label: 'Scene #', width: 68, trailingRowOptions: { hint: '' } },
  { key: 'pages', label: 'Pages', width: 78, align: 'center' },
  { key: 'scriptDay', label: 'Script Day', width: 84, align: 'center' },
  { key: 'intExt', label: 'I/E', width: 66, align: 'center' },
  { key: 'set', label: 'Set', width: 240 },
  { key: 'dayNight', label: 'D/N', width: 76, align: 'center' },
  { key: 'description', label: 'Description', width: 320 },
  { key: 'cast', label: 'Cast', width: 180 },
  { key: 'notes', label: 'Notes', width: 210 },
  { key: 'props', label: 'Props', width: 170 },
  { key: 'wardrobe', label: 'Wardrobe', width: 180 },
  { key: 'vehicles', label: 'Vehicles', width: 150 },
];

const EDITABLE = new Set(COLUMNS.map(c => c.key).filter(k => k !== 'actions'));

const EDITORS: Record<string, GlideColumnEditor> = {
  intExt: { kind: 'select', items: INT_EXT.map(v => ({ id: v, label: v })), resolveBy: 'label', panelMinWidth: 140 },
  dayNight: { kind: 'select', items: DAY_NIGHT.map(v => ({ id: v, label: v })), resolveBy: 'label', panelMinWidth: 160 },
  set: {
    kind: 'select',
    items: SETS.map(v => ({ id: v, label: v })),
    resolveBy: 'label',
    panelMinWidth: 360,
    browse: 'open',
  },
};

const FREEZE_OPTIONS = [
  { v: '0', l: 'Off' },
  { v: '1', l: 'Actions' },
  { v: '2', l: '+ Scene #' },
  { v: '3', l: '+ Pages' },
  { v: '4', l: '+ Script' },
  { v: '5', l: '+ I/E' },
  { v: '6', l: '+ Set' },
];

function toGridRows(scenes: SceneRow[]): Record<string, string>[] {
  return scenes.map(scene => ({ ...scene }));
}

const nextId = () => `sc-${Math.random().toString(36).slice(2, 8)}`;

/** The next scene number after the last row (a typed add-row edit and the
 *  toolbar button both use it). */
function nextSceneNumber(scenes: SceneRow[]): string {
  const last = scenes[scenes.length - 1];
  return String((parseInt(last?.sceneNumber ?? '0', 10) || scenes.length) + 1);
}

export const BreakdownPage: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const kit = useKitTheme();
  const colors = useMemo(() => glideCellColors(kit?.mode ?? 'light'), [kit?.mode]);

  /* The grid owns every pixel the toolbar does not: measured from the flex
     remainder, so a wrapped toolbar on an iPad shrinks the grid instead of
     pushing it off-screen. */
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

  const [scenes, setScenes] = useState<SceneRow[]>(INITIAL_SCENES);
  const [history, setHistory] = useState<SceneRow[][]>([]);
  // Actions + Scene # frozen, like the app's identity columns.
  const [freeze, setFreeze] = useState(2);
  const [commits, setCommits] = useState(0);
  const [status, setStatus] = useState('no edits yet');
  const [sort, setSort] = useState<{ key: string; dir: 'asc' | 'desc' } | null>(null);

  /* Sorting is a VIEW: the display order changes, the row identity (id) does
     not, so edits still commit to the scene the user sees. */
  const sortedScenes = useMemo(() => {
    if (sort === null) return scenes;
    const dir = sort.dir === 'asc' ? 1 : -1;
    return [...scenes].sort((a, b) => {
      const av = String(a[sort.key as keyof SceneRow] ?? '');
      const bv = String(b[sort.key as keyof SceneRow] ?? '');
      return av.localeCompare(bv, undefined, { numeric: true, sensitivity: 'base' }) * dir;
    });
  }, [scenes, sort]);

  const gridRows = useMemo(() => toGridRows(sortedScenes), [sortedScenes]);

  const commit = useCallback((next: SceneRow[], note: string) => {
    setHistory(h => [...h.slice(-19), scenes]);
    setScenes(next);
    setCommits(c => c + 1);
    setStatus(note);
  }, [scenes]);

  const onCommit = useCallback((edits: GlideSheetEdit[]) => {
    // ONE state update for the whole operation — one undo entry, like the app.
    const next = scenes.map(s => ({ ...s }));
    const byId = new Map(next.map(s => [s.id, s]));
    let changed = 0;
    for (const edit of edits) {
      const target = byId.get(gridRows[edit.row]?.id ?? '');
      if (!target) continue;
      const field = edit.colKey as keyof Omit<SceneRow, 'id'>;
      if (field in target) {
        target[field] = edit.value;
        changed++;
      }
    }
    if (changed === 0) return;
    commit(next, `${edits.length} cell${edits.length === 1 ? '' : 's'} in one commit`);
  }, [scenes, gridRows, commit]);

  const addScene = useCallback(() => {
    const nextNumber = nextSceneNumber(scenes);
    const blank: SceneRow = {
      id: nextId(), sceneNumber: nextNumber, pages: '', scriptDay: '', intExt: 'INT',
      set: '', dayNight: 'DAY', description: '', cast: '', notes: '', props: '',
      wardrobe: '', vehicles: '',
    };
    commit([...scenes, blank], `scene ${nextNumber} added`);
  }, [scenes, commit]);

  /** none → ascending → descending → none. */
  const toggleSort = useCallback((key: string) => {
    setSort(prev => (prev?.key !== key ? { key, dir: 'asc' } : prev.dir === 'asc' ? { key, dir: 'desc' } : null));
  }, []);

  const removeScene = useCallback((id: string) => {
    const scene = scenes.find(s => s.id === id);
    commit(scenes.filter(s => s.id !== id), `scene ${scene?.sceneNumber ?? ''} removed`);
  }, [scenes, commit]);

  const undo = () => {
    setHistory(h => {
      if (h.length === 0) return h;
      setScenes(h[h.length - 1]);
      setStatus('undone');
      return h.slice(0, -1);
    });
  };

  const getCellContent = useCallback((col: GlideSheetColumn, row: Record<string, string>) => {
    if (col.key === 'actions') return staticCell('');
    const value = row[col.key] ?? '';
    return seededTextCell(value, {
      displayData: value || '—',
      align: col.align,
      themeOverride: col.key === 'sceneNumber' ? { textDark: colors.muted } : undefined,
    });
  }, [colors.muted]);

  const domCells = useMemo<GlideDomCellSpec[]>(() => sortedScenes.map((scene, index) => ({
    row: index,
    colKey: 'actions',
    // Full-bleed: the trash button IS the cell, exactly like the crew card.
    bleed: true,
    node: (
      <button
        type="button"
        className="flex h-full w-full items-center justify-center text-rose-500 transition-colors hover:bg-rose-500/10 group-data-[glide-dom-focused=true]:bg-rose-500/10"
        aria-label={`Remove scene ${scene.sceneNumber}`}
        title={`Remove scene ${scene.sceneNumber}`}
        data-testid={`breakdown-remove-${scene.id}`}
        onClick={() => removeScene(scene.id)}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    ),
  })), [sortedScenes, removeScene]);

  /* The header stays CANVAS-painted; each column gets a small sort
     affordance pinned at its right edge — the picker-chevron recipe. The
     header box is click-through, so the canvas still owns header clicks. */
  const headerCells = useMemo(() => {
    const out: Record<string, React.ReactNode> = {};
    for (const col of COLUMNS) {
      if (col.key === 'actions') continue;
      const dir = sort?.key === col.key ? sort.dir : null;
      const Icon = dir === 'asc' ? ArrowUp : dir === 'desc' ? ArrowDown : ArrowUpDown;
      out[col.key] = (
        <button
          type="button"
          data-testid={`breakdown-sort-${col.key}`}
          data-sort={dir ?? 'none'}
          aria-label={`Sort by ${col.label}${dir === 'asc' ? ' (ascending)' : dir === 'desc' ? ' (descending)' : ''}`}
          title={`Sort by ${col.label}`}
          onClick={() => toggleSort(col.key)}
          className={`pointer-events-auto absolute right-0.5 top-1/2 -translate-y-1/2 rounded p-1 text-[color:var(--glide-header-fg)] transition-opacity group-data-[glide-header-selected=true]:text-[color:var(--glide-header-fg-selected)] hover:bg-[var(--glide-header-hover-bg)] ${dir ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
        >
          <Icon className="h-3 w-3" />
        </button>
      );
    }
    return out;
  }, [sort, toggleSort]);

  return (
    <div className="pg-page" data-testid="glide-breakdown-demo">
      <header className="pg-page-head">
        <button type="button" className="pg-page-back" onClick={onExit} data-testid="breakdown-back">
          ← Playground
        </button>
        <div className="pg-page-title">IT&rsquo;S A WONDERFUL LIFE</div>
        <span className="pg-page-sub">Breakdown</span>
        <span className="pg-page-stats" data-testid="breakdown-scene-count">
          {scenes.length} scenes
        </span>
        <div className="pg-page-tools">
          <span className="pg-page-tool-label">Frozen leading columns</span>
          <span data-testid="breakdown-freeze">
            <Seg
              dense
              value={String(freeze)}
              options={FREEZE_OPTIONS}
              onChange={v => setFreeze(Number(v))}
            />
          </span>
          <Button variant="outline" onClick={addScene} data-testid="breakdown-add-scene">
            <Plus className="w-3 h-3" /> Add scene
          </Button>
          <Button variant="subtle" onClick={undo} disabled={history.length === 0} data-testid="breakdown-undo">
            <Undo2 className="w-3 h-3" /> Undo
          </Button>
          <span className="pg-page-meta">
            <span className="pg-page-status" data-testid="breakdown-status">{status}</span>
            <span className="pg-page-status" data-testid="breakdown-commits">{commits} commit{commits === 1 ? '' : 's'}</span>
          </span>
        </div>
      </header>

      <div ref={bodyRef} className="pg-page-body">
      <GlideSheet
        dataAttr="data-glide-breakdown-sheet"
        columns={COLUMNS}
        rows={gridRows}
        getCellContent={getCellContent}
        editors={EDITORS}
        onCommit={onCommit}
        editableKeys={EDITABLE}
        domCells={domCells}
        headerCells={headerCells}
        selectionKey="pg:breakdown"
        rowMarkers={{ kind: 'clickable-number', width: 44, startIndex: 1 }}
        freezeColumns={freeze}
        scrollable
        height={gridHeight}
        overscrollY={5 * 34}
        onAddRow={addScene}
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
