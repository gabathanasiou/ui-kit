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
| `GlideSheet.tsx` | the grid wrapper: auto-fit columns, content height, editable tint, selection/cache, fill/paste/copy/cut/clear, row actions, DOM cells |
| `cells.ts` | `textCell`, `seededTextCell`, `staticCell`, `actionGlyphCell`, `isSeededNoop`, copy/cut text |
| `gridModel.ts` | pure geometry: selection → rect, range fill, paste, clear, clipboard parsing |
| `customCells.tsx` | `kitButtonCell`, `kitBadgeCell`, `kitFieldCell` + renderers + the morph editor |
| `editors.tsx` | `createGlideCellEditor` (text + kit `PickerField` select) |
| `theme.ts` | canvas `Theme` from the kit mode/accent + cell colours |

## Cell kinds

- **Text** — `textCell(data, opts)`; `seededTextCell(editValue)` puts the value
  in `data` **and** selects it, because Glide's editor seeds from `data`, never
  `displayData` (a computed display value would open blank). `isSeededNoop`
  guards "open + Enter" so it never pins a spurious override.
- **Read-only** — the cell's own `readonly` flag, not a grid option. Mix freely;
  the editable wash only paints writable cells. `staticCell()` = no editor.
- **`kitBadgeCell`** — a drawn status pill with kit tones (the only painted
  interactive-looking cell, and it is read-only). **Anything clickable is a
  real DOM control** (`domCells`) — canvas-drawn buttons were dropped.
- **Buttons** — mount a real kit `Button` with `domCells`; it keeps hover,
  focus, press and tab order.
- **`kitFieldCell`** — the closed button face of a morph control; ONE click
  opens the real `MorphSearchField` / `MorphActionField` in the overlay editor
  (the cell sets `activationBehaviorOverride: 'single-click'`).
- **`domCells`** — see below.

## Real DOM inside a cell (`domCells`)

There is no DOM in a Glide cell, so real controls are **pinned over** the cell by
the FORK's `DataEditorWithDomCells` (`vendor/glide-data-grid/dist/esm/dom-cells`):

```tsx
<GlideSheet
  columns={…} rows={…}
  domCells={[{ row: 0, colKey: 'person', node: <PickerField … /> }]}
/>
```

- The fork renders a **click-through layer** inside the editor root with one
  absolutely-positioned box per visible cell that has a node. Rects come from
  the editor's own `getBounds`, re-measured from the library's visible-region
  stream (scroll), a `ResizeObserver` and every render.
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
- **ALL picker cells use `pickerDomCell`** (`src/glide/pickerCell.tsx`): a
  native picker cell (value painted, selectable, double-click opens the editor)
  plus a chevron button that calls `apiRef.openCellEditor(row, colKey)` for the
  single-click path. Never hand-roll the chevron:

  ```tsx
  const api = useRef<GlideSheetApi | null>(null);
  <GlideSheet apiRef={api} domCells={[
    pickerDomCell({ row, colKey: 'person', label: person, onOpen: () => api.current?.openCellEditor(row, 'person') }),
  ]} />
  ```
- `kitFieldCell` remains for the cheaper "one click → overlay editor" variant.
- **Enter activates a DOM cell:** arrow-key navigation moves the grid selection
  onto the cell; Enter (or Space) fires the fork's `onCellActivated` hook, which
  focuses + clicks the cell's control **when it holds exactly one** focusable
  element (a picker, a morph trigger, a single button). Multi-control cells are
  left alone — navigate into them with Tab instead.

## Editors (overlay)

The fork styles Glide's overlay editor to be **visually identical to the cell**:
it occupies the cell's exact rect and height, inherits the cell's typography
(font family/size/colour), text origin (cell horizontal padding + 0.5px, the
canvas' own offset) and vertical centring (computed from the theme line rhythm);
square corners, a **1px inset accent outline** (the same border the grid paints
on the selected cell), no drop shadow, no fade. Dropdown/entity editors fill the
same box (their PickerField is `height:100%`), so a picker cell does not change
size or font when it enters edit mode.


`createGlideCellEditor(getOpts)` builds Glide's `provideEditor`:

- **Build it ONCE per grid lifetime** (`useMemo(() => …, [])`) with live config
  in a ref. Recreating it builds new component types and **remounts the open
  editor**, dropping keystrokes.
- `text` — a kit-styled input (Enter commits without moving the selection).
- `select` — the kit's ONE value picker, `PickerField appearance="inline"`, with
  `defaultOpen`/`autoFocus`/`panelMinWidth`; commits on close, Escape cancels.
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
  in the GitHub fork, built, and re-vendored (steps in the vendor README).
- Glide's runtime deps (`lodash`, `marked`, `@linaria/react`,
  `canvas-hypertxt`, `react-number-format`, `react-responsive-carousel`) are
  kit devDependencies and get bundled into the kit's `dist` on build.
- MIT, copyright typeguard Inc. — `vendor/glide-data-grid/LICENSE`.

## Canvas limits

- No CSS/text-selection/tab order in a painted cell. `domCells` (the fork's
  layer) is the supported way to put real controls in a cell; everything
  interactive should use it.
- Accessibility is Glide's hidden ARIA mirror; custom cells expose `copyData`.
- Upstream is quiet (last publish Oct 2025) — treat the pin as ours to move.

## Playground

Section `glide` ("Data grid", `#glide`): `glide-crew-demo` (crew card: real
`PickerField` cells, overlay picker on Report To, trash/undo), `glide-gallery-demo`
(every cell kind), `glide-buttons-demo` (drawn buttons + in-cell morph fields),
`glide-notes`. Spec: `playground/specs/glide.spec.ts`; pure math:
`src/__tests__/glideGridModel.test.ts`.
