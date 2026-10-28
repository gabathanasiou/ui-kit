import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Plus, Trash2, Undo2 } from 'lucide-react';
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
];

const COLUMNS: GlideSheetColumn[] = [
  { key: 'sceneNumber', label: 'Scene #', width: 68 },
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
  { key: 'actions', label: '', width: 44 },
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
  { v: '1', l: 'Scene #' },
  { v: '2', l: '+ Pages' },
  { v: '3', l: '+ Script' },
  { v: '4', l: '+ I/E' },
  { v: '5', l: '+ Set' },
];

/** The tab fills the page: the grid takes the screen height the real tab gets
 *  (header + toolbar + a page of rows), clamped so it stays usable on an iPad. */
function usePageGridHeight(): number {
  const [height, setHeight] = useState(560);
  useEffect(() => {
    const measure = () => setHeight(Math.max(380, Math.min(720, Math.round(window.innerHeight - 340))));
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);
  return height;
}

function toGridRows(scenes: SceneRow[]): Record<string, string>[] {
  return scenes.map(scene => ({ ...scene }));
}

const nextId = () => `sc-${Math.random().toString(36).slice(2, 8)}`;

export const BreakdownDemo: React.FC = () => {
  const kit = useKitTheme();
  const colors = useMemo(() => glideCellColors(kit?.mode ?? 'light'), [kit?.mode]);
  const gridHeight = usePageGridHeight();

  const [scenes, setScenes] = useState<SceneRow[]>(INITIAL_SCENES);
  const [history, setHistory] = useState<SceneRow[][]>([]);
  const [freeze, setFreeze] = useState(1);
  const [commits, setCommits] = useState(0);
  const [status, setStatus] = useState('no edits yet');

  const gridRows = useMemo(() => toGridRows(scenes), [scenes]);

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
    const last = scenes[scenes.length - 1];
    const nextNumber = String((parseInt(last?.sceneNumber ?? '0', 10) || scenes.length) + 1);
    const blank: SceneRow = {
      id: nextId(), sceneNumber: nextNumber, pages: '', scriptDay: '', intExt: 'INT',
      set: '', dayNight: 'DAY', description: '', cast: '', notes: '', props: '',
      wardrobe: '', vehicles: '',
    };
    commit([...scenes, blank], `scene ${nextNumber} added`);
  }, [scenes, commit]);

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

  const domCells = useMemo<GlideDomCellSpec[]>(() => scenes.map((scene, index) => ({
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
  })), [scenes, removeScene]);

  return (
    <div className="pg-breakdown" data-testid="glide-breakdown-demo">
      <div className="pg-breakdown-head">
        <div className="pg-breakdown-title">IT&rsquo;S A WONDERFUL LIFE</div>
        <span className="pg-breakdown-sub">Breakdown</span>
        <span className="pg-breakdown-stats" data-testid="breakdown-scene-count">
          {scenes.length} scenes
        </span>
        <div className="pg-breakdown-tools">
          <span className="pg-breakdown-tool-label">Frozen leading columns</span>
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
        </div>
      </div>

      <GlideSheet
        dataAttr="data-glide-breakdown-sheet"
        columns={COLUMNS}
        rows={gridRows}
        getCellContent={getCellContent}
        editors={EDITORS}
        onCommit={onCommit}
        editableKeys={EDITABLE}
        domCells={domCells}
        selectionKey="pg:breakdown"
        rowMarkers={{ kind: 'clickable-number', width: 44, startIndex: 1 }}
        freezeColumns={freeze}
        scrollable
        height={gridHeight}
        onAddRow={addScene}
        addRowHint="Add scene"
        baseRowHeight={34}
        baseHeaderHeight={34}
        fontSize={12.5}
      />

      <div className="pg-breakdown-foot">
        <span data-testid="breakdown-status">{status}</span>
        <span data-testid="breakdown-commits">{commits} commit{commits === 1 ? '' : 's'}</span>
        <span className="ml-auto">Row markers + frozen leading columns · scroll sideways to check</span>
      </div>
    </div>
  );
};
