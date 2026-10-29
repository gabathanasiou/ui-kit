# Glide data grid (kit module) — `src/glide/`

Status: **experimental** (branch `experiment/glide-grid`). **We own the grid
runtime**: it is a vendored fork of Glide Data Grid, not an npm dependency (see
`vendor/glide-data-grid/README.md`). No version bump / release tag yet.

Read this before touching `GlideSheet`, the cell factories, or the playground
"Data grid" section. Glide paints on a **canvas**: there is no DOM per cell,
cells never repaint themselves, and coordinates are the surface everything
hangs off.

## Consuming

```ts
// once, next to the kit stylesheet
import '@gabriel/ui-kit/ui-kit.css';
// REQUIRED: canvas sizing + overlay chrome (vendored; shipped with the kit)
import '@gabriel/ui-kit/glide.css';
import { GlideSheet, textCell, kitButtonCell } from '@gabriel/ui-kit';
```

The grid CSS is not optional — without it Glide's root has **zero height** and
no canvas is created (a silent blank grid). This bit the playground once. On
this branch the playground imports it from
`vendor/glide-data-grid/dist/index.css`; promoting the module means exporting
that file as `./glide.css` from the package.

## Files

| File | Owns |
| --- | --- |
| `GlideSheet.tsx` | the grid wrapper: auto-fit OR scrollable columns, frozen columns + row markers, content/fixed height, trailing add row, editable tint, selection/cache, fill/paste/copy/cut/clear, DOM cells |
| `cells.ts` | `textCell`, `seededTextCell`, `staticCell`, `actionGlyphCell`, `isSeededNoop`, copy/cut text |
| `gridModel.ts` | pure geometry: selection → rect, range fill, paste, clear, clipboard parsing |
| `customCells.tsx` | `kitButtonCell`, `kitBadgeCell`, `kitFieldCell` + renderers + the morph editor; the shared `drawIcon`/`roundRect`/`isDark` paint helpers |
| `controlCells.tsx` | `kitPickerCell`, `kitGlyphCell`, `kitGlyphGroupCell` + renderers: painted affordances (no DOM) |
| `controlGeometry.ts` | pure lane hit-test (`CONTROL_LANE`, `GLYPH_LANE`, `isControlHit`) |
| `editors.tsx` | `createGlideCellEditor` (text + kit `PickerField` select; seeds painted picker cells) |
| `theme.ts` | canvas `Theme` from the kit mode/accent + cell colours |

## Cell kinds

- **Text** — `textCell(data, opts)`; `seededTextCell(editValue)` puts the value
  in `data` **and** selects it, because Glide's editor seeds from `data`, never
  `displayData` (a computed display value would open blank). `isSeededNoop`
  guards "open + Enter" so it never pins a spurious override.
- **Read-only** — the cell's own `readonly` flag, not a grid option. Mix freely;
  the editable wash only paints writable cells. `staticCell()` = no editor.
- **`kitBadgeCell`** — a drawn status pill with kit tones (read-only).
- **`kitPickerCell`** — a value + a painted 24px chevron lane. ONE click in the
  LANE calls the host's `onOpen` (normally `api.openCellEditor(row, colKey)` →
  the column's `select` editor, the SAME `PickerField` a double-click opens);
  a click on the body only selects; double-click/Enter activate through Glide.
  The cell keeps `copyData`, the grid's selection and its native focus ring.
  The value uses Glide's own `drawTextCell` (same metrics/padding/baseline),
  clipped before the lane.
- **`kitGlyphCell` / `kitGlyphGroupCell`** — painted buttons (trash / plus /
  chevron / check) with NO DOM box: full-rect hover fill (`hoverBg` or the
  tone's tint), a ~90ms painted press flash, `pointer` over the target, and
  `readonly: true`. The group variant splits ONE cell into 2+ equal lanes, so
  row actions need one column, not one per button (Enter fires the FIRST =
  primary). The action fires exactly once: on a lane click via the renderer's
  `onClick` (which `preventDefault`s the activation) or on Enter/Space via
  `GlideSheet.onCellActivated`; the canvas keeps focus either way.
- **Buttons** — mount a real kit `Button` with `domCells` when you need native
  focus/tab order, text labels, or a compound layout of real controls.
- **`kitFieldCell`** — the closed button face of a morph control; ONE click
  opens the real `MorphSearchField` / `MorphActionField` in the overlay editor
  (the cell sets `activationBehaviorOverride: 'single-click'`).
- **`domCells`** — see below.

## Real DOM headers (`headerCells`)

Glide paints headers on the canvas too. `headerCells` pins a real control over
each named column's header (the fork's `getDomHeaderCell`, measured with
`getBounds(col, -1)` — frozen and scrolled columns included):

```tsx
<GlideSheet
  headerCells={{ pages: <SortHeader label="Pages" … /> }}
/>
```

- The header box is **click-through** (`pointer-events: none`): the canvas keeps
  owning header clicks/selection. The node's own `pointer-events: auto` child
  is the only thing that captures — the same contract as `pickerDomCell`.
- The host node sits over the painted header; `GlideSheet` publishes the canvas
  chrome as CSS variables so it matches: `--glide-header-bg`,
  `--glide-header-fg`, `--glide-header-fg-selected`,
  `--glide-header-hover-bg`, `--glide-header-focus-bg`.
- Each header box carries `group`, `data-glide-header-focused` when the
  selection covers its column (the whole RANGE, not just the current cell) and
  `data-glide-header-selected` when the column itself is selected, so
  `group-data-[…]:…` mirrors the canvas tint/text.
- `drawHeader` reserves the control's lane (18px) when it repaints a title, so
  a header with a button never draws its text underneath it.
- Columns without an entry keep Glide's painted header (the row-marker gutter
  and the action lane in the Breakdown).

The Breakdown demo pins a small sort affordance at each header's right edge
(the picker-chevron recipe): the label stays canvas-painted, the icon cycles
none → ascending → descending.

## Real DOM inside a cell (`domCells`)

There is no DOM in a Glide cell, so real controls are **pinned over** the cell by
the FORK's `DataEditorWithDomCells` (`vendor/glide-data-grid/dist/esm/dom-cells`):

```tsx
<GlideSheet
  columns={…} rows={…}
  domCells={[{ row: 0, colKey: 'person', node: <PickerField … /> }]}
/>
```

- **Content-space boxes, compositor-scrolled bands.** A box is positioned ONCE
  from the grid's own content geometry (`getContentBounds` — canvas-relative,
  independent of the scroll position). Scrolling moves four clipped BANDS with a
  single `translate3d` each — the frozen headers, the scrolled headers, the
  frozen cells and the body cells — so a control cannot straddle two cells at any
  speed, vertically or horizontally. There is **no** scroll heuristic and no
  hiding/flash: the canvas and the overlay are painted from the same offsets in
  the same frame.
- **Same-frame painting is a fork change too**: `InfiniteScroller` commits its
  visible-region update inside `flushSync`, so the canvas repaints in the scroll
  pass instead of a React frame later. Without it the painted cells trail the
  native scroll (and anything pinned to them) by one frame.
- **Frozen columns and headers do not scroll on one axis**, which is why the
  layer is split into bands rather than one mover. The frozen pane is the
  row-marker gutter plus the frozen data columns. The **sticky trailing add row**
  is handled structurally: the body bands end at `domCellBottomInset`, so boxes
  never float on the add row.
- The window of mounted body cells is the visible range **plus overscan** rows and
  columns; it rebuilds as the range leaves that window. Scrolling never waits for
  React to mount a control — the window is already a superset.
- **The box IS the container** — the cell's width/height minus Glide's 4px cell
  inset (the same margin the drawn kit faces use), `overflow: visible`, content
  centred vertically (equal gap above and below at any row height). Lay out
  whatever fits: a row of buttons, a morph field beside an adder, a picker +
  Apply, a Seg. Inner gaps/padding are the host's.
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
- `text` — a kit-styled input (Enter commits without moving the selection).
- `select` — the kit's ONE value picker, `PickerField appearance="inline"`, with
  `defaultOpen`/`autoFocus`/`panelMinWidth`; commits on close, Escape cancels.
  It also serves painted `kitPickerCell`s: the seed comes from the cell payload
  (`seedValue`/`value`) when the painted value is not the stored value.
- `columnOffset` = 1 for grids with a row-marker column, 0 otherwise (the raw
  column index is offset — the classic Glide trap).

## Spreadsheet plumbing (already in `GlideSheet`)

- **One commit per operation**: an edit, a range fill, a paste, a cut/clear each
  call `onCommit(edits)` exactly once → one undo entry in the host.
- **Range fill**: one edit while a multi-cell range is selected writes the value
  across the selection (the host may restrict to one column when column kinds
  differ).
- **Paste interception**: Glide binds its own async paste handler at mount; the
  module's capture listener takes the event first and calls `onPaste`, so a
  paste never applies twice. `onPaste` returns `false` to stop Glide's own path.
- **Row actions** are a synthetic trailing `actions` column drawn on the canvas
  (glyph hit-test from `localEventX`); copy/cut skip it.
- **Selection memory** is keyed by `selectionKey` and survives a remount
  (switching page tabs).
- `readOnly` is enforced per cell (Glide has no grid-level readonly).

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
- **`onAddRow` / `addRowHint`** — Glide's trailing add-row (sticky at the
  bottom, labelled by the hint); the host appends the row and the trailing row
  follows the data. It counts as an extra row in the content height, and the
  fork hides DOM boxes the sticky row paints over (`domCellBottomInset`) —
  otherwise a trash button would float on the add row.
- **`smoothScroll`** — Glide's `smoothScrollX/Y`: the grid translates in pixels
  instead of snapping to cell edges. The Breakdown uses it.
- **Safari scrollbars (fork).** Stock forces `overflow: scroll` on Safari; with
  "always show scrollbars" that reserves a gutter, and an exactly-sized inline
  card latches BOTH bars on (the vertical bar steals width → horizontal bar
  steals height → neither clears). The fork uses `overflow: auto` everywhere,
  and a content-height sheet (no `height` prop) also carries `data-glide-fit`,
  which pins `overflow-y: hidden` — it can never legitimately scroll
  vertically. `scrollable` without a fixed height keeps horizontal scrolling.
- **`overscrollY`** — extra scrollable space past the last row (Glide's
  `overscrollY`). The fork flattens that band to the cell background: stock
  paints full-height grid lines there, which reads as phantom empty rows.
  `addRowSticky` (default false) pins the trailing add-row to the viewport
  bottom instead of leaving it at the end of the scroll.

The page-scale recreations are the playground's `#breakdown` and
`#glide-native-cells` pages (full-window app tabs, not section cards): row
markers, frozen leading columns (a Seg switches the count), smooth scrolling,
real kit editors for the entity columns, and the trailing add row. `#breakdown`
keeps a trash DOM cell in the scrollable Actions column; `#glide-native-cells`
replaces the picker chevrons, trash and add-row actions with PAINTED control
cells (one split action cell: add · trash). Both measure the grid's height from
the flex remainder, so a wrapped toolbar shrinks the grid instead of pushing it
off-screen.

## The fork (we own the code now)

- **Upstream fork:** https://github.com/gabathanasiou/glide-data-grid (real
  source + build config; use it for structural changes and to pull upstream
  fixes).
- **What the kit runs:** `vendor/glide-data-grid/dist` — the published build's
  readable ESM + types + CSS, vendored at `6.0.4-alpha24`. There is **no**
  `@glideapps/glide-data-grid` in `package.json`; `scripts/glide-fork.mjs`
  aliases the specifier to the vendored build in every config (kit build,
  playground, Vitest). Types come from `tsconfig.json` `paths`.
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

## Playground

Sections under "Data grid":

- `#glide` — `glide-crew-demo` (crew card: real `PickerField` cells, overlay
  picker on Report To, trash/undo), `glide-gallery-demo` (every cell kind),
  `glide-layouts-demo` (arranged DOM cells), `glide-buttons-demo` (drawn
  buttons + in-cell morph fields), `glide-notes`.
- `#breakdown` (full page) — `glide-breakdown-demo`: the Breakdown tab at page
  scale (`breakdown-freeze` Seg, `-scene-count`, `-add-scene`, `-undo`,
  `-status`, `-commits`, `-back`; row-marker gutter + frozen columns + trailing
  add row, smooth scrolling, no showroom chrome).
- `#glide-native-cells` (full page) — `glide-native-cells-demo`: the painted
  control cells at three scales (zone Seg): a 60-scene Breakdown with canvas
  pickers + a 2-button action cell (add · trash) + freeze Seg; the crew card
  embedded (canvas pickers/trash + Add role); the same card inside a kit
  `Modal`. The action column is NOT frozen by default — the buttons live in the
  scrolling body. Dev helper `window.__glideNativeCells`
  (`chevronCenter`/`glyphCenter`/`cellBounds`) builds lane points from the
  grid's `getBounds`, so the spec never hardcodes coordinates.

- **Single cells** is a TAB of `#glide-native-cells` (not a page): header-less
  sheets (`baseHeaderHeight={0}` → `data-glide-no-header`), each element with
  no table chrome. Cases: Text (type → Enter commits), Picker (painted
  chevron lane), Button (check glyph), Two buttons (split lane), Toggle
  (boolean), Locked (static), **Rows ×3** (one column, three rows — Arrow
  Up/Down + Enter) and **Columns ×3** (one row, three columns — Arrow
  Left/Right + Enter) for keyboard navigation. Testids:
  `glide-native-single-<kind>`, `-text-value`/`-text-status`,
  `-picker-value`, `-button-clicks`, `-group-clicks`/`-group-last`,
  `-toggle-value`, `-rows-value`/`-rows-status`,
  `-columns-value`/`-columns-status`; dev helper
  `singlePoint(key, row, colKey, where)`. A **Pop out ↗** button opens the
  hidden `#glide-single-cell` route (not in the rail) in its own window.

Specs: `playground/specs/glide.spec.ts` + `glide-native-cells.spec.ts`; pure
math: `src/__tests__/glideGridModel.test.ts`, lane hit-test:
`src/__tests__/controlGeometry.test.ts`.
