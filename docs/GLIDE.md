# Glide data grid (kit module) — `src/glide/`

Status: **released runtime, experimental wrapper.** The kit owns the grid
runtime — a vendored fork of Glide Data Grid (`vendor/glide-data-grid/README.md`)
— and publishes the painted control cells as `@gabriel/ui-kit/glide-controls`
(released **v0.1.173**, pinned by lemon_schedule). `GlideSheet` itself is still
the kit's internal/playground wrapper and is **not a package export** today:
only `glide-controls` ships a runtime entry (the `dist/glide/*.d.ts` files are
types-only). Promoting `GlideSheet` to a consumer API needs a new package entry
first.

Read this before touching `GlideSheet`, the cell factories, or the playground
"Data grid" section. Glide paints on a **canvas**: there is no DOM per cell,
cells never repaint themselves, and coordinates are the surface everything
hangs off.

## Consuming

Two shapes, one runtime per page (Glide is never bundled twice):

```ts
// A) A host that already runs its own Glide grid and only wants the painted
//    control cells (the lemon_schedule app — the published entry):
import '@gabriel/ui-kit/ui-kit.css';
import '@glideapps/glide-data-grid/dist/index.css'; // the host's fork
import {
  kitGlyphCell,
  kitGlyphGroupCell,
  kitPickerCell,
  controlCellRenderers,
} from '@gabriel/ui-kit/glide-controls';

// B) The kit source/playground (or a future exported wrapper) using the
//    compact `GlideSheet` — source import, NOT a package subpath:
import { GlideSheet, textCell, kitGlyphCell } from './src/glide';
```

`./glide-controls` is the only published glide entry. The rest of `src/glide`
(`GlideSheet`, `textCell`, `createGlideCellEditor`, the theme helpers, the pure
grid model) is exported from the kit's source barrel for the playground and the
kit's own build, not from `@gabriel/ui-kit`.

`./glide-controls` keeps `@glideapps/glide-data-grid` EXTERNAL — it ships the
renderers and cell factories, never a second copy of Glide. The root entry does
not export the glide module (importing a kit button must not pull a grid).

The grid CSS is not optional — without Glide's root CSS the grid has **zero
height** and no canvas is created (a silent blank grid). The playground imports
it from `vendor/glide-data-grid/dist/index.css`; a host with its own runtime
imports its own fork's CSS.

## Files

| File | Owns |
| --- | --- |
| `GlideSheet.tsx` | the grid wrapper and its props/API: auto-fit OR scrollable columns, frozen columns + row markers, content/fixed height, trailing add row, editable tint, selection/cache, fill/paste/copy/cut/clear, `domCells` + `headerCells` |
| `cells.ts` | `textCell`, `seededTextCell`, `staticCell`, `actionGlyphCell`, `isSeededNoop`, `buildCopyText`, `buildCutPlan` |
| `gridModel.ts` | pure geometry: selection → rect, range fill, paste, clear, clipboard parsing (`effectiveGridRange`, `expandRangeFill`, `planGridPaste`, `planGridClear`, `parseClipboardGrid`) |
| `customCells.tsx` | `kitBadgeCell`, `kitFieldCell` + renderers + the morph editor; the shared `drawIcon`/`roundRect`/`isDark` paint helpers. There is deliberately **no** `kitButtonCell` |
| `controlCells.tsx` | `kitPickerCell`, `kitGlyphCell`, `kitGlyphGroupCell` + renderers and guards: painted affordances (no DOM) |
| `controlGeometry.ts` | pure lane hit-test (`CONTROL_LANE`, `GLYPH_LANE`, `PRESS_MS`, `isControlHit`) |
| `editors.tsx` | `createGlideCellEditor`, `useGlideEscapeCancel` (text + kit `PickerField` select; seeds painted picker cells) |
| `pickerCell.tsx` | the legacy `PickerChevron` / `pickerDomCell` passthrough affordance for native picker cells |
| `theme.ts` | canvas `Theme` from the kit mode/accent + cell colours (`createGlideTheme`, `useGlideTheme`, `glideCellColors`, `readGlideAccent`) |
| `index.ts` / `controls.ts` | the source barrel and the published `@gabriel/ui-kit/glide-controls` entry (controls only, Glide external) |
| `types.ts` | `GlideSheetColumn`, `GlideSheetEdit`, `GlideRange` |

## API reference

Every `GlideSheet` prop/default, the column/edit/range/DOM-cell types, the
imperative `GlideSheetApi`, the full cell-factory field lists, the editor
options and the published-vs-source exports live in **`docs/GLIDE-API.md`**.
The behavior sections below assume those shapes.

## Cell kinds

- **Text** — `textCell(data, opts)`; `seededTextCell(editValue)` puts the value
  in `data` **and** selects it, because Glide's editor seeds from `data`, never
  `displayData` (a computed display value would open blank). `isSeededNoop`
  guards "open + Enter" so it never pins a spurious override.
- **Read-only** — the cell's own `readonly` flag, not a grid option. Mix freely;
  the editable wash only paints writable cells. `staticCell(display, opts)` =
  no editor, read-only, default cursor.
- **`kitBadgeCell`** — a drawn status pill (read-only; kit tones). Field list in
  the API reference.
- **`kitPickerCell`** — a value + a painted 24px chevron lane. ONE click in the
  LANE calls the host's `onOpen` (normally `api.openCellEditor(row, colKey)` →
  the column's `select` editor, the SAME `PickerField` a double-click opens); a
  click on the body only selects; double-click/Enter activate through Glide.
  The cell keeps `copyData`, the grid's selection and its native focus ring.
  The value uses Glide's own `drawTextCell` (same metrics/padding/baseline),
  clipped before the lane.
- **`kitGlyphCell`** — a painted button with NO DOM box. Icon-only (trash /
  plus / chevron / check); the lane is a pixel strip at the right edge (factory
  default `GLYPH_LANE = 28`) or `'full'` for a dedicated action column.
  Full-target hover fill (`hoverBg` or the tone's tint), a ~90ms painted press
  flash, `pointer` over the target, `readonly: true`. The action fires exactly
  once: on a lane click via the renderer's `onClick` (which `preventDefault`s
  activation) or on Enter/Space via `GlideSheet.onCellActivated`; the canvas
  keeps focus either way. `label` is both the accessible name and the
  press-flash key — keep it unique per row.
- **`kitGlyphGroupCell`** — 2+ `KitGlyphButton`s split into equal lanes inside
  ONE cell: row actions need one column, not one per button. Buttons render
  left-to-right; the FIRST is primary (Enter/Space fires it, and it lights when
  the cell is selected). Each button has its own hover, flash and hit-test.
- **Buttons** — there is deliberately **no `kitButtonCell`**: an interactive
  button with a text label is either a real kit `Button` mounted with
  `domCells` (native focus/tab order) or a painted `kitGlyphCell` /
  `kitGlyphGroupCell` (icon-only). `kitFieldCell` is the one-click morph face;
  it is not a click handler.
- **`kitFieldCell`** — the closed button face of a morph control; ONE click
  opens the real `MorphSearchField` (`mode: 'search'`) or `MorphActionField`
  (`mode: 'action'`) in the overlay editor (the cell sets
  `activationBehaviorOverride: 'single-click'`).
- **`actionGlyphCell`** — a blank read-only filler the wrapper returns for a
  missing row; it is not a row-action implementation. A row-action column is
  the host's: add an `actions` column and return `kitGlyphCell` /
  `kitGlyphGroupCell` from `getCellContent` (see §Spreadsheet plumbing).
- **`domCells`** — see below.

## Real DOM headers (`headerCells`)

`headerCells` pins a real control over a column's painted header (keyed by
column key). The click-through contract, the CSS variables and the
`data-glide-header-*` states are in **`GLIDE-API.md` §Real DOM headers**.

## Real DOM inside a cell (`domCells`)

There is no DOM in a Glide cell, so real controls are **pinned over** the cell by
the FORK's `DataEditorWithDomCells` (`vendor/glide-data-grid/dist/esm/dom-cells`):

```tsx
<GlideSheet
  columns={…} rows={…}
  domCells={[{ row: 0, colKey: 'person', node: <PickerField … /> }]}
/>
```

`GlideDomCellSpec` = `{ row, colKey, node, passthrough?, bleed? }`. `colKey`
must match a real column; an unknown key is ignored. `passthrough` and `bleed`
are covered below.

- **Content-space boxes, compositor-scrolled bands.** Boxes are positioned once
  from content geometry (`getContentBounds`) and scrolling moves four clipped
  bands (frozen headers / headers / frozen cells / body cells) with one
  `translate3d` each — no scroll heuristic, no hiding/flash. The fork also
  commits the scroller's visible region inside `flushSync`, so canvas + overlay
  paint on the same offsets in the same frame; frozen panes simply pin, which is
  why there are bands rather than one mover. The mounted window is the visible
  range + overscan, so scrolling never waits for React.
- **The sticky trailing add row is structural**: the body bands end at
  `domCellBottomInset`, so boxes never float on the add row.
- **The box IS the container** — the cell's width/height minus Glide's 4px cell
  inset (the same margin the drawn kit faces use), `overflow: visible`, content
  centred vertically (equal gap above and below at any row height). Lay out
  whatever fits: a row of buttons, a morph field beside an adder, a picker +
  Apply, a Seg. Inner gaps/padding are the host's. **`bleed: true`** drops the
  4px inset and the vertical centring: the node fills the whole cell edge to
  edge (a full-cell button/link).
- Controls keep **native focus, hover, CSS animation and tab order**; a morph
  expands in place instead of floating. The canvas cell underneath should
  return `staticCell('')`.
- Costs: the DOM box **covers** its canvas cell, so Glide selection / keyboard
  navigation / the fill handle skip that cell. A control wider than the column
  spills over the neighbour — size it deliberately.
- Mount only the cells that need it; a DOM box per cell defeats the canvas.
- **Focused cells keep the selection rectangle.** An opaque DOM box covers the
  canvas border, so the fork repaints the same 1px accent rectangle. A
  **button-only** cell (exactly one focusable, a BUTTON) additionally gets the
  grid's own hover tint when focused — as if the row were hovered — using
  `--glide-dom-hover-bg` published by `GlideSheet`. Passthrough boxes paint
  neither (the native canvas border shows through).
- **`passthrough: true`** makes the box click-through (`pointer-events: none`):
  only the node's own `pointer-events: auto` children capture. Use it for a
  small affordance drawn over a NATIVE cell.
- **A SIMPLE picker column is a painted `kitPickerCell`** — value + chevron
  lane, no DOM box:

  ```tsx
  const api = useRef<GlideSheetApi | null>(null);
  getCellContent: (col, row) => col.key === 'person'
    ? kitPickerCell({ value: row.person, label: `Person for ${row.role}`, onOpen: () => api.current?.openCellEditor(row, 'person') })
    : …,
  getEditor: (row, colKey) => colKey === 'person' ? { kind: 'select', items, resolveBy: 'label' } : undefined,
  ```
  The lane click opens the SAME overlay `select` editor as double-click/Enter
  (the editor accepts a painted picker payload and seeds from its `seedValue`).
- **`pickerDomCell`** (`src/glide/pickerCell.tsx`) remains for COMPOUND cells
  and the older demos: a passthrough DOM chevron pinned over a native picker
  cell. Never hand-roll that chevron; prefer the painted cell for new columns.
- `kitFieldCell` remains for the "one click → morph field" variant.
- **Enter activates a DOM cell:** arrow-key navigation moves the grid selection
  onto the cell; Enter (or Space) fires the fork's `onCellActivated` hook, which
  focuses + clicks the cell's control **when it holds exactly one** focusable
  element (a picker, a morph trigger, a single button). Multi-control cells are
  left alone — navigate into them with Tab instead.

## Painted control plumbing

- **`GlideSheet` `onCellActivated?: (cell, event)`** — Glide's activation
  (Enter/Space, double-click, type-to-edit), after the wrapper resolves the
  cell. A glyph/group cell fires `onActivate` (or its first button) exactly
  once and the canvas keeps focus; the host callback still runs. A picker cell
  is left to Glide's own reselect, which opens its overlay editor — never add
  a second activation path.
- **`GlideSheetApi.getCellBounds(row, colKey)`** — the cell rect in VIEWPORT
  coordinates. The playground's dev-only `window.__glideNativeCells`
  (`chevronCenter`/`glyphCenter`) builds lane click points from it, so specs
  never hardcode page coordinates.
- **`GlideSheetApi.selectCell(row, colKey)`** — moves the selection (and focus)
  to one cell. A row action that deletes its row calls it for the same index
  (the row below falls into the deleted slot; the new last row when it was the
  last), so the selection stays where the eye already is.
- **`deselectOnBlur`** drops the selection when focus leaves the sheet (an
  adjacent sheet or a page control); the overlay editor's portal counts as
  "inside". `clearSelection()` is the imperative form. Used by the Single
  cells cards so typing in one card deselects the last one.
- **`baseHeaderHeight={0}`** makes a header-less sheet (one cell in an element):
  the wrapper sets `data-glide-no-header`, and the vendored CSS hides the 1px
  header canvas Glide still creates at that height (vendor patch 7).
- `needsHoverPosition` gives `draw` a cell-LOCAL `hoverX/hoverY`; the renderer
  never paints a second focus rectangle (the grid owns selection), sets
  `overrideCursor('pointer')` over the lane only, and calls
  `requestAnimationFrame` while the press flash is live. The press state is
  keyed by row + the button's accessible label, so labels must be unique per
  row ("Remove scene 12").
- Hover fills are the WHOLE target rectangle (`hoverBg` or the tone's tint, no
  inset pill), stopping at the cell's own 1px border line — the grid's damage
  repaint clips that outer pixel, so a fill painted over it would never clear
  (a stuck coloured border). A SELECTED glyph paints the same tone fill (the
  grid's focus rectangle stays on top), so a keyboard-selected button never
  reads as a neutral box. A group cell splits its lane into equal segments;
  each segment has its own hover, flash and click hit-test.

## Editors (overlay)

The fork styles Glide's overlay editor to be **visually identical to the cell**:
it occupies the cell's exact rect and height, inherits the cell's typography
(font family/size/colour), text origin (cell horizontal padding + 0.5px, the
canvas' own offset) and vertical centring (computed from the theme line rhythm);
square corners, a **1px inset accent outline** (the same border the grid paints
on the selected cell), no drop shadow, no fade. Dropdown/entity editors fill the
same box (their PickerField is `height:100%`), so a picker cell does not change
size or font when it enters edit mode. A padded editor is **exactly one cell
tall and never scrolls** (`overflow-y: hidden`): stock Glide's growing-entry
carries a 6px top margin and its line box can round a fraction over the clip
area, both of which surfaced as a tiny scrollbar inside the floating box.


`createGlideCellEditor(getOpts)` builds Glide's `provideEditor`:

- **Build it ONCE per grid lifetime** (`useMemo(() => …, [])`) with live config
  in a ref. Recreating it builds new component types and **remounts the open
  editor**, dropping keystrokes.
- `text` — a kit-styled input; Enter commits without moving the selection.
- `select` — the kit's ONE value picker, `PickerField appearance="inline"`;
  commits on close, Escape cancels. It also serves painted `kitPickerCell`s:
  the seed comes from the cell payload (`seedValue`/`value`) when the painted
  value is not the stored value.
- `getEditor(row, colKey)` wins over `editors` when the options depend on the
  row.
- Field lists (`GlideTextEditor`, `GlideSelectEditor`, `GlideEditorOptions`)
  and the `columnOffset` rule are in **`GLIDE-API.md` §Editors**.

## Spreadsheet plumbing (already in `GlideSheet`)

- **One commit per operation**: an edit, a range fill, a paste, a cut/clear each
  call `onCommit(edits)` exactly once → one undo entry in the host.
- **Range fill**: one edit while a multi-cell range is selected writes the value
  across the selection (the host may restrict to one column when column kinds
  differ).
- **Paste interception**: Glide binds its own async paste handler at mount; the
  module's capture listener takes the event first and calls `onPaste`, so a
  paste never applies twice. `onPaste` returns `false` to stop Glide's own path.
- **Row actions have NO built-in column.** `GlideSheet` draws only the columns
  you pass it. A row-action column is the host's: add an `actions` column,
  return `kitGlyphCell` / `kitGlyphGroupCell` from `getCellContent` (or mount a
  DOM button), and keep the key out of `editableKeys`; copy/cut already skip
  any `actions` key. The app's Breakdown / Crew / Locations grids do exactly
  this with the kit control cells.
- **Writes are gated by `editableKeys`** for every path (edit, fill, paste,
  cut, clear); `readOnly` forces every cell read-only + no overlay (Glide has
  no grid-level readonly).
- **`fillHandle={false}`** removes the drag-fill handle. **`disableClipboard`**
  turns off paste interception and the Cmd/Ctrl C/X/V shortcuts (context-menu
  Paste is disabled too; Copy/Cut stay available) — for a grid inside another
  grid's editor.
- **Selection memory** is keyed by `selectionKey` and survives a remount
  (switching page tabs).

## Scrolling, frozen columns, page scale

A card grid auto-fits its columns; a page-scale grid (the Breakdown tab) keeps
them. The opt-ins, all on `GlideSheet`:

- **`scrollable`** — keep each column's declared `width` and scroll sideways.
  Without it the widths are ratios and are scaled to the card (no scrollbar).
- **`freezeColumns={n}`** — pin the first **n DATA columns**. Glide counts the
  row-marker gutter on its own (`freezeColumns + rowMarkerOffset`), so `1`
  freezes `Scene #`, not the gutter. The fork's DOM layer measures the frozen
  cells on their own band (the visible-range stream starts at the first SCROLLED
  column, so they cannot be derived from it) and forwards `freezeColumns` to the
  inner editor.
- **The card width is the LAYOUT width** (`offsetWidth`), never the transformed
  rect: a kit Modal opens with a scale morph (0.94 → 1), and measuring
  `getBoundingClientRect()` mid-morph locked the grid to ~94% of its card — the
  transform never fires a resize, so it never corrected.
- **The scroll pass paints, not the next React frame.** The fork's
  `InfiniteScroller` commits the visible-region update inside `flushSync`, so the
  canvas repaints on the same offsets the native scroll just applied. A deferred
  commit shows up as one-frame drift during a fling — and anything pinned to the
  cells (DOM controls) trails with it.
- **`rowMarkers={{ kind: 'clickable-number', width: 44, startIndex: 1 }}`** —
  the numbered gutter. Glide hands `provideEditor` the RAW column index, so the
  wrapper sets `columnOffset: 1` automatically — never hand-offset editors.
- **`height={px}`** — a fixed viewport: the header stays pinned and rows scroll
  vertically. Omit it for the content-height card grids.
- **`smoothScroll`** — Glide's `smoothScrollX/Y`: the grid translates in pixels
  instead of snapping to cell edges. The Breakdown uses it.
- **Safari scrollbars (fork).** Stock forces `overflow: scroll` on Safari; with
  "always show scrollbars" that reserves a gutter, and an exactly-sized inline
  card latches BOTH bars on (the vertical bar steals width → horizontal bar
  steals height → neither clears). The fork uses `overflow: auto` everywhere,
  and a content-height sheet (no `height` prop) also carries `data-glide-fit`,
  which pins `overflow-y: hidden` — it can never legitimately scroll
  vertically. `scrollable` without a fixed height keeps horizontal scrolling.

### Bottom space (add row + overscroll)

`onAddRow`/`addRowHint` add Glide's trailing row; `addRowSticky` pins it to the
viewport bottom; `overscrollY` leaves extra scroll space below the last row.
The three-way split, the sticky-row DOM-box inset and the fork's overscroll
flattening are in **`GLIDE-API.md` §Bottom space**. A content-height sheet
(`height` omitted) sizes itself to `header + rows + (onAddRow ? 1 : 0)`; a
`height={px}` sheet scrolls inside a fixed viewport.

The page-scale recreations are the playground's `#breakdown` and
`#glide-native-cells` pages (full-window app tabs, not section cards): row
markers, frozen leading columns (a Seg switches the count), smooth scrolling,
real kit editors for the entity columns, and the trailing add row. `#breakdown`
keeps a trash DOM cell in the scrollable Actions column; `#glide-native-cells`
replaces the picker chevrons, trash and add-row actions with PAINTED control
cells (one split action cell: add · trash). Both measure the grid's height from
the flex remainder, so a wrapped toolbar shrinks the grid instead of pushing it
off-screen.

## Single-cell sheets

A one-column, one-row `GlideSheet` with `baseHeaderHeight={0}` is a single cell
(the wrapper marks it `data-glide-no-header`; the fork hides the 1px header
canvas Glide still creates — vendor patch 7). Recipe, keyboard variants and
caveats: **`GLIDE-API.md` §Single-cell shape**.

## The fork (we own the code now)

- **Upstream fork:** https://github.com/gabathanasiou/glide-data-grid (real
  source + build config; use it for structural changes and to pull upstream
  fixes).
- **What the kit runs:** `vendor/glide-data-grid/dist` — the published build's
  readable ESM + types + CSS, vendored at `6.0.4-alpha24`.
  `@glideapps/glide-data-grid` **is** a peer/dev dependency (`6.0.4-alpha24`,
  the host-owned runtime), but nothing in the kit/playground resolves to the
  npm build: `scripts/glide-fork.mjs` aliases the specifier to the vendored
  build in every config (kit build, playground, Vitest). Types come from
  `tsconfig.json` `paths`.
- **Quick patches** edit `vendor/glide-data-grid/dist/esm/**` directly (plain
  ESM, names intact) with a `// fork:` comment. **Structural changes** are made
  in the GitHub fork, built, and re-vendored (steps in the vendor README). The
  full patch list is `vendor/glide-data-grid/README.md` §Local patches — patch 8
  is the imperative `openCellEditor` row-marker column offset (painted picker
  lanes open editors through that API).
- Glide's runtime deps (`lodash`, `marked`, `@linaria/react`,
  `canvas-hypertxt`, `react-number-format`, `react-responsive-carousel`) are
  kit devDependencies and get bundled into the kit's `dist` on build.
- MIT, copyright typeguard Inc. — `vendor/glide-data-grid/LICENSE`.

## Canvas limits

- No CSS/text-selection/tab order in a painted cell. Simple affordances are
  painted (`controlCells.tsx`); anything that needs native focus/tab order,
  text labels, or several real controls in one cell uses `domCells` (the
  fork's layer).
- Accessibility is Glide's hidden ARIA mirror; custom cells expose `copyData`.
- Upstream is quiet (last publish Oct 2025) — treat the pin as ours to move.

## Exports

Published `@gabriel/ui-kit/glide-controls` vs the kit source barrel, with the
full list: **`GLIDE-API.md` §Exports**. In short: the package ships the three
control-cell factories, `controlCellRenderers`, the guards, lane geometry and
`pressControlCell`; everything else (`GlideSheet`, text/badge/field cells,
editors, theme, pure helpers) is source-only.

## Playground

Section map, testids and the single-cell cases live in **`docs/PLAYGROUND.md`**
(Data grid): `#glide`, `#breakdown`, `#glide-native-cells` and its **Single
cells** tab / hidden `#glide-single-cell` pop-out. Specs:
`glide.spec.ts` + `glide-native-cells.spec.ts`; pure math:
`glideGridModel.test.ts`; lane hit-test: `controlGeometry.test.ts`.
