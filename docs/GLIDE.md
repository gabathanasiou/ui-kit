# Glide data grid (kit module) — `src/glide/`

Status: **experimental** (branch `experiment/glide-grid`). The kit does not
depend on the grid library at runtime until a consumer imports this module:
`@glideapps/glide-data-grid` is an **optional peer**, pinned exact. Nothing is
versioned/built into `dist` for this work yet.

Read this before touching `GlideSheet`, the cell factories, or the playground
"Data grid" section. Glide paints on a **canvas**: there is no DOM per cell,
cells never repaint themselves, and coordinates are the surface everything
hangs off.

## Consuming

```ts
// once, next to the kit stylesheet
import '@gabriel/ui-kit/ui-kit.css';
import '@glideapps/glide-data-grid/dist/index.css'; // REQUIRED: canvas sizing + overlay chrome
import { GlideSheet, textCell, kitButtonCell } from '@gabriel/ui-kit';
```

The CSS import is not optional — without it Glide's root has **zero height**
and no canvas is created (a silent blank grid). This bit the playground once.

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
- **`kitButtonCell`** — a canvas-drawn button: variants
  (`primary|subtle|outline|danger`), icons (`plus|trash|chevron|check|search`),
  disabled, painted hover (`hoverAmount`) and a focus/selection ring. Fires on a
  **single click** through the renderer's `onClick` (no overlay). There is no
  CSS in a canvas cell, so every state is painted.
- **`kitBadgeCell`** — a drawn status pill with kit tones.
- **`kitFieldCell`** — the closed button face of a morph control; ONE click
  opens the real `MorphSearchField` / `MorphActionField` in the overlay editor
  (the cell sets `activationBehaviorOverride: 'single-click'`).
- **`domCells`** — see below.

## Real DOM inside a cell (`domCells`)

There is no DOM in a Glide cell, so a real control is **pinned over** the cell:

```tsx
<GlideSheet
  columns={…} rows={…}
  domCells={[{ row: 0, colKey: 'person', node: <PickerField … /> }]}
/>
```

- The wrapper renders a **click-through layer** (`pointer-events:none`) with one
  absolutely-positioned box per spec (`pointer-events:auto`).
- Rects come from `gridRef.getBounds(col, row)` (viewport coords) minus the
  wrapper rect, re-measured on `onVisibleRegionChanged`, `ResizeObserver`,
  window scroll and data changes. Cells scrolled out of view unmount.
- The control keeps **native focus, hover, CSS animation and tab order** — a
  morphing button expands in place instead of floating.
- The canvas cell underneath should return `staticCell('')` (nothing paints
  behind the control).
- Costs: the DOM box **covers** its canvas cell, so Glide selection / keyboard
  navigation / the fill handle skip that cell, and its size is the cell's (a
  control wider than the column spills over the next one — set
  `expandedWidth`/`collapsedWidth` deliberately).
- Mount only the cells that need it; a DOM box per cell defeats the canvas.

## Editors (overlay)

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

## Canvas limits (decide before reaching for a fork)

- No persistent DOM, per-cell tab order, native text selection or CSS in a cell;
  `domCells` is the escape hatch, not a fix.
- Accessibility is Glide's hidden ARIA mirror; custom cells expose `copyData`.
- Glide 6.0.4-alpha24 is the newest published build (upstream quiet since
  Jan 2026). If internals must change, vendor the package's `src/` (it ships
  with the npm tarball) and switch the imports — MIT, no permission needed.

## Playground

Section `glide` ("Data grid", `#glide`): `glide-crew-demo` (crew card: real
`PickerField` cells, overlay picker on Report To, trash/undo), `glide-gallery-demo`
(every cell kind), `glide-buttons-demo` (drawn buttons + in-cell morph fields),
`glide-notes`. Spec: `playground/specs/glide.spec.ts`; pure math:
`src/__tests__/glideGridModel.test.ts`.
