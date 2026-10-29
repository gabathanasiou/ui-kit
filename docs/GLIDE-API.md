# Glide API reference — `GlideSheet`, cells, editors, exports

Status: **read before wiring a host grid or changing a cell factory.** This is
the field-level reference for `src/glide/**`; behavior, wiring, the DOM rules
and the fork live in `docs/GLIDE.md`.

## `GlideSheet`

`columns` is `{ key, label, width, align?, trailingRowOptions? }[]`. `align`
centres the HEADER and the overlay editor; a cell still sets its own
`contentAlign` (`textCell(value, { align })`). `trailingRowOptions.hint` puts a
per-column hint on the trailing add row.

| Prop | Default | Notes |
| --- | --- | --- |
| `columns`, `rows`, `getCellContent` | required | `getCellContent(col, row, rowIndex)` returns one `GridCell`. |
| `onCommit(edits)` | required | One call per edit / fill / paste / cut / clear → one undo entry. |
| `editableKeys` | required | `ReadonlySet<string>` of column keys that accept writes; paste/fill/clear skip the rest. |
| `readOnly` | `false` | Forces every cell `readonly` + no overlay (Glide has no grid-level flag). |
| `emptyLabel` | — | Empty-state message; only when `rows.length === 0` and `onAddRow` is unset. |
| `baseRowHeight` / `baseHeaderHeight` | `28` / `30` | Raw px. `baseHeaderHeight={0}` is the single-cell shape (see below). |
| `fontSize` | `12` | Canvas font size only — row/header heights are the base px, not derived. |
| `wrapHeaders` | `false` | Wraps header titles inside their column. |
| `dataAttr` | — | Sets an empty DOM attribute on the wrapper (specs/scoping), e.g. `data-glide-single-text`. |
| `className` | `''` | Extra wrapper classes. |
| `editors` | — | Per-column `GlideColumnEditor` (text / select). |
| `getEditor(row, colKey)` | — | Per-cell editor; wins over `editors`. |
| `customRenderers` | — | Extra Glide renderers, appended AFTER the kit badge/field + control renderers. |
| `onCellClick(cell, event)` | — | Raw Glide cell click (the host's chance to react to any cell). |
| `onCellActivated(cell, event)` | — | Enter/Space/double-click/type-to-edit hook; a painted glyph fires its action first, a picker is left to Glide. |
| `selectionKey` | — | Per-window selection memory that survives a remount. |
| `themeOverrides` | — | Merged over the kit canvas theme. |
| `fillHandle` | `true` | Drag-fill handle; always off when `readOnly`. |
| `disableClipboard` | `false` | Disables paste interception + Cmd/Ctrl C/X/V shortcuts (a grid inside another grid's editor). Context-menu Paste is disabled too; Copy/Cut stay available. |
| `domCells` | — | `GlideDomCellSpec[]`; real controls pinned over cells. |
| `headerCells` | — | Column key → real control pinned over the painted header. |
| `overscrollY` | — | Extra scrollable space past the last row (see Bottom space). |
| `apiRef` | — | Receives the `GlideSheetApi`. |
| `height` | content height | Fixed px viewport → vertical scroll; omit for a content-height sheet (`data-glide-fit`). |
| `scrollable` | `false` | Keep declared widths + scroll horizontally. |
| `freezeColumns` | `0` | Leading DATA columns to pin (the row-marker gutter counts separately). |
| `rowMarkers` | — | `{ kind: 'number' \| 'clickable-number' \| 'both', width?, startIndex? }`. |
| `onAddRow` | — | Enables Glide's trailing add row; the host appends the row. |
| `addRowHint` | `'Add row'` | Global hint; a column's `trailingRowOptions.hint` overrides its cell. |
| `addRowSticky` | `false` | Pins the trailing add row to the viewport bottom (see Bottom space). |
| `smoothScroll` | `false` | Glide's `smoothScrollX/Y` (pixel, not cell-snap). |
| `deselectOnBlur` | `false` | Drop the selection when focus leaves the sheet; the overlay editor counts as inside. |

`GlideSheetApi` (via `apiRef`): `openCellEditor(row, colKey)` (the double-click
path), `getCellBounds(row, colKey)` (viewport rect for lane clicks/anchors),
`selectCell(row, colKey)` (moves + focuses + scrolls; used after a row delete),
`clearSelection()` (drops it; the grid keeps focus).

`GlideDomCellSpec` = `{ row, colKey, node, passthrough?, bleed? }`. `colKey`
must match a real column; an unknown key is ignored. `passthrough` makes the
box click-through (only the node's `pointer-events: auto` children capture);
`bleed` removes the 4px inset + vertical centring so the node fills the cell
edge to edge.

`GlideSheetEdit` = `{ row, colKey, value }`; `GlideRange` = `{ x, y, width,
height }`; `GlideSheetColumn` = `{ key, label, width, align?,
trailingRowOptions? }`.

## Single-cell shape

A one-column, one-row `GlideSheet` with `baseHeaderHeight={0}` IS a single
cell: the same edit loop and painted controls, with no table chrome. The
wrapper marks it `data-glide-no-header`; the fork hides the 1px header canvas
Glide still creates at that height (vendor patch 7).

```tsx
<GlideSheet
  columns={[{ key: 'value', label: 'Value', width: 240 }]}
  rows={[{ value: 'BEDFORD FALLS — MAIN STREET' }]}
  getCellContent={(col, row) => textCell(row.value)}
  onCommit={edits => setValue(edits[0].value)}
  editableKeys={new Set(['value'])}
  baseHeaderHeight={0}
  // no rowMarkers, no height: one row tall, no gutter
/>
```

- Omit `height` (content-height) and `rowMarkers` (no numbered gutter). Set
  `deselectOnBlur` when several cards sit side by side, so typing in one drops
  the other's selection.
- It is still a grid: Arrow keys move, Enter edits, painted/control cells and
  the overlay editor all work. `rows ×3` (one column) and `columns ×3` (one
  row) are the small keyboard-walking variants in the playground.
- `emptyLabel` is suppressed when `onAddRow` is set.
- Playground: the **Single cells** tab of `#glide-native-cells`, plus the
  hidden `#glide-single-cell` pop-out route (`PLAYGROUND.md`).

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

## Cell factories

### Text / static

| Factory | Fields | Notes |
| --- | --- | --- |
| `textCell(data, opts?)` | `readonly?`, `displayData?`, `allowOverlay?`, `align?`, `cursor?`, `themeOverride?`, `selectionRange?` | The base text cell. |
| `seededTextCell(editValue, opts?)` | same as `textCell` | Puts the value in `data` AND selects it; the editor seeds from `data`, never `displayData`. |
| `staticCell(display, opts?)` | `textCell` options minus `allowOverlay` | Read-only, no editor, default cursor. |
| `actionGlyphCell(opts?)` | `readonly?`, `hovered?`, `hoverBg?` | Blank read-only filler; NOT a row-action implementation. |
| `isSeededNoop(prior, seed, value)` | — | True when a commit only restates the seed / clears an empty cell. |
| `buildCopyText(rows, columns, range)` | — | TSV for a selection (the `actions` column is skipped). |
| `buildCutPlan(rows, columns, range)` | — | `{ text, committers }`: TSV + the cells to clear. |

### Painted control cells

| Factory | Data | Notes |
| --- | --- | --- |
| `kitPickerCell({ value, label?, placeholder?, seedValue?, hoverBg?, onOpen?, align? })` | `KitPickerCellData` | Value + 24px chevron lane (`CONTROL_LANE`). Lane click calls `onOpen`; body click only selects. |
| `kitGlyphCell({ icon, label, tone?, hoverBg?, onActivate?, lane? })` | `KitGlyphCellData` | One painted glyph button. `icon` = `trash \| plus \| chevron \| check`; `tone` = `neutral \| danger \| accent`; `lane` = px from the right edge (factory default `GLYPH_LANE = 28`) or `'full'`. |
| `kitGlyphGroupCell({ buttons, lane? })` | `KitGlyphGroupCellData` | 2+ `KitGlyphButton`s split into equal lanes; the first is primary. |

`KitGlyphButton` = `{ icon, label, tone?, hoverBg?, onActivate? }`. `label` is
the accessible name and the press-flash key — keep it unique per row.
`GlideSheet` registers `controlCellRenderers`; `isControlCell` /
`isKitPickerCell` / `isKitGlyphCell` / `isKitGlyphGroupCell` are the guards.
Pure lane geometry: `CONTROL_LANE = 24`, `GLYPH_LANE = 28`, `PRESS_MS = 90`,
`isControlHit(localX, width, lane)`. `pressControlCell(cell, label)` starts the
painted press flash (for a host that implements its own keyboard activation).

### Badge / morph-face cells

| Factory | Data | Notes |
| --- | --- | --- |
| `kitBadgeCell({ label, tone? })` | `KitBadgeCellData` | Read-only drawn pill; `tone` = `neutral \| accent \| success \| warning \| danger` (default neutral). |
| `kitFieldCell({ mode, label, value?, icon?, variant?, placeholder?, onSubmit? })` | `KitFieldCellData` | Closed button face; one click opens `MorphSearchField` (`mode: 'search'`) or `MorphActionField` (`mode: 'action'`) in the overlay editor. `icon` = `plus \| trash \| chevron \| check \| search`; `variant` = `primary \| subtle \| outline \| danger`. |

## Editors

`createGlideCellEditor(getOpts)` builds Glide's `provideEditor`. Build it ONCE
per grid lifetime (`useMemo(() => …, [])`) with live config in a ref — recreating
it remounts the open editor and drops keystrokes.

| `GlideTextEditor` field | Notes |
| --- | --- |
| `kind: 'text'` | a kit-styled input; Enter commits without moving the selection |
| `align?` | overlay text alignment |
| `uppercase?` | force uppercase live |
| `placeholder?` | placeholder text |

| `GlideSelectEditor` field | Notes |
| --- | --- |
| `kind: 'select'` | the kit's ONE value picker, `PickerField appearance="inline"` |
| `items` | the `PickerItem[]` catalogue |
| `groups?` | `SearchMenuGroup[]` |
| `resolveBy?` | `id` (default) or `label` |
| `placeholder?` | panel placeholder |
| `seedValue?` | seed the overlay when it differs from the rendered value |
| `browse?` | `open` or `accordion` |
| `panelMinWidth?` | panel min width |
| `createLabel?` | label for a create-from-typed row |
| `onCreateItem?` | commit a typed value the catalogue lacks |

`GlideEditorOptions` (what `getOpts` returns): `readOnlyRef`, `columns`,
`getValue(row, colKey)`, `editors?`, `getEditor?`, `portalRef`,
`columnOffset?` (1 with row markers, 0 without — `GlideSheet` sets it for you).
`useGlideEscapeCancel()` returns `{ onCellActivated, onFinishedEditing }` for
the Escape-cancel guard.

## Bottom space (add row + overscroll)

Three separate things live below the last data row; do not confuse them:

- **`onAddRow` / `addRowHint`** — Glide's trailing add-row. The host appends the
  row; the trailing row follows the data and counts as one extra row in the
  content height. `addRowHint` labels it globally; a column's
  `trailingRowOptions.hint` labels that column's cell.
- **`addRowSticky`** (default `false`) — pins the trailing add-row to the
  viewport bottom instead of leaving it at the end of the scroll. A sticky row
  paints OVER the rows behind it, so the fork hides the DOM boxes it covers
  (`domCellBottomInset = rowHeight`) — otherwise a trash button would float on
  the add row.
- **`overscrollY`** — extra scrollable space past the last row, so the final
  rows can scroll up off the bottom edge. The fork flattens that band to the
  cell background: stock paints full-height grid lines there, which reads as
  phantom empty rows.

## Exports — published vs source-only

**`@gabriel/ui-kit/glide-controls`** (the published entry; Glide stays external):

| Export | Use |
| --- | --- |
| `kitPickerCell`, `kitGlyphCell`, `kitGlyphGroupCell` | the three painted control-cell factories |
| `controlCellRenderers` | register on the host's `DataEditor` (`customRenderers`) |
| `isControlCell`, `isKitPickerCell`, `isKitGlyphCell`, `isKitGlyphGroupCell` | guards for host hit-testing/press-repaint |
| `CONTROL_LANE` (24), `GLYPH_LANE` (28), `PRESS_MS` (90), `isControlHit` | pure lane geometry (`localX` → in-lane?) |
| `pressControlCell(cell, label)` | starts the ~90ms press flash (a host that implements its own keyboard activation calls it) |

**Kit source barrel** (`src/glide`, for the playground/kit build; not a package
subpath):

| Export | Use |
| --- | --- |
| `GlideSheet` + `GlideSheetProps` / `GlideSheetApi` / `GlideDomCellSpec` / `GlideSheetColumn` / `GlideSheetEdit` / `GlideRange` | the wrapper + its public types |
| `textCell`, `seededTextCell`, `staticCell`, `actionGlyphCell`, `isSeededNoop` | cell factories + the seeded-commit guard |
| `buildCopyText`, `buildCutPlan` | TSV copy / cut plans |
| `effectiveGridRange`, `expandRangeFill`, `planGridPaste`, `planGridClear`, `parseClipboardGrid` | pure selection/fill/paste/clear math |
| `kitBadgeCell`, `kitFieldCell`, `kitCellRenderers` (`KIT_GLIDE_RENDERERS`) | the badge + morph-face cells |
| `createGlideCellEditor`, `useGlideEscapeCancel` + `GlideColumnEditor` / `GlideTextEditor` / `GlideSelectEditor` / `GlideEditorOptions` | the overlay editor factory |
| `PickerChevron`, `pickerDomCell` | the legacy passthrough chevron |
| `createGlideTheme`, `useGlideTheme`, `glideCellColors`, `readGlideAccent` | canvas theme helpers (canvas cannot read CSS vars; `useGlideTheme` follows the kit ThemeScope) |
| `GridCellKind` + `GridCell` / `GridSelection` / `EditableGridCell` / `Item` / `Theme` / `CustomCell` / `CustomRenderer` | re-exported Glide types so hosts do not deep-import |
