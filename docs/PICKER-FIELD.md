# PickerField — the kit's one value picker

Status: **read this before building or changing a value picker.** `PickerField`
is the kit's value layer: a field that STORES an array of keys and edits it
against a catalogue. It is not a command menu (`DropdownMenu`) and not a second
search panel — the panel is the shared `SearchMenu` catalogue.

Source: `src/PickerField.tsx` (component) + `src/pickerModel.ts` (pure mapping).
Consumers: the app's `EntityDropdown` adapter (the app owns domain rules), and
the playground's **PickerField — the value picker** card.

## 1. Value model

```ts
pickerField.values: string[]          // committed keys
onChange: (values: string[]) => void  // one batched call, only when changed
resolveBy?: 'id' | 'label'            // what a key IS (default id)
```

- The kit stores **keys**, never comma strings. The app adapter serialises its
  comma-list format and resolves cast Board IDs.
- `resolveBy="id"` → keys are ids, labels are the face (cast).
- `resolveBy="label"` → keys ARE labels (props, sets, name-keyed categories).
- Commits are emitted in **catalogue order**; keys the catalogue does not know
  (typed creates) stay at the end.
- Opening seeds a local draft from `values`; closing without changes emits
  nothing (no empty undo entries).

## 2. Display

| `display` | Closed trigger |
|---|---|
| `names` (default) | labels joined with `, ` |
| `chips` | one chip per value |
| `count` | `3 selected` |

`formatDisplay(values, items) => string` overrides the text. `renderTrigger`
replaces the closed **chip / morph** face with arbitrary JSX (the editable
input still owns typing). `renderItem(item, checked)` replaces the row content;
the row chrome + selection check stay. `badge`, `trailing` and `anchoredKeys`
are conveniences for the default row.

## 3. Faces (`appearance`)

| Face | Use |
|---|---|
| `inline` | cell editor: thin, transparent, fills the row (`autoGrow` grows with content) |
| `wrap` | multi-line cell editor (textarea, full-box hitbox) |
| `chip` | bordered form trigger with a chevron (Link Manager / rules) |
| `morph` | a button that morphs into the field (form header rows) |

All faces use the same panel and value model. Coarse sizing follows the global
scale (`useCoarseScale`, `coarsePx`). `skipComma` opens a multi field without
the trailing `, ` (a typed-key cell open); `portalTarget` hosts the panel for
cell editors/modals.

## 4. Editing contract

- Opening seeds `draft = values`; the field text is the display names.
- **Multiple**: the text is a comma list; the LAST segment is the live query.
  A row click toggles, rewrites the text in catalogue order (`…, ` append
  position) and keeps the panel open. **The text is the value**: deleting a
  segment unchecks its row live, and a trailing comma commits the last segment
  (without one it is the query).
- **Single**: opening lists **EVERY option** (the current value stays in the
  field but is only highlighted, and the panel opens scrolled to it). The whole
  typed text is the query. Picking a row commits and closes; `selectAllOnOpen`
  selects the current text so typing replaces it. `allowFreeText={false}`
  ignores typed text that matches no item (day/night, INT/EXT, fixed lists).
- **Commit** on blur, outside click, Tab, or Enter when no row is lit. It emits
  ONE `onChange` only when the set changed. `onExit` fires on commit; Tab uses
  `onTabExit` (Glide hand-off) when provided.
- **Escape cancels** — the draft is dropped and `onEscape` fires.
- **Create from typed**: when the live query has no exact match (and
  `onCreateItem` is set), a synthetic `Add “…”…` row appears **pinned at the
  top** (emerald add-new face, **no checkbox** — it is an action, not a
  record). Ticking it calls `onCreateItem(value)` immediately so the host can
  add the record to the catalogue while the panel is still open. Commit then
  calls `onCreateItem` for any remaining unknown typed segments (deduped), so
  a typed-only value also creates on close. Escape still drops the field value;
  the host owns a cancelled naming modal (it deletes the abandoned member).
- `defaultOpen` / `autoFocus` open a cell editor immediately; `readOnly` renders
  the closed display; `uppercase` uppercases typed text.

## 5. The SearchMenu seam

`PickerField` owns the field text; `SearchMenu` owns the panel. The seam is:

- `open` / `onOpenChange` — controlled panel (no query clear on close).
- `hideTrigger` + `anchorRef` — render only the panel, anchored to the field
  (the anchor also counts as "inside" for outside-click dismissal).
- `multiple={{ mode: 'live', selectedIds, onDraftChange }}` — rows toggle and
  every mutation notifies the field synchronously; no footer hero.
- `ref` (`SearchMenuHandle`) — `moveHighlight`, `activateHighlighted` (returns
  whether a row was lit), `selectAll`, `close`. The field's input drives them.
- `renderItem` — custom row content; `highlightOnOpen` — value fields open with
  no row lit so Enter commits the typed text instead of picking row one.

Never add a second panel implementation or a `face` prop for the panel.

## 6. Groups, browse and async

`items[].group` + `groups` render category headers. `browse="open"` (plain
headers, short catalogues) or `"accordion"` (long ones); no groups renders a
flat list. During a query every category is a plain header (SearchMenu rule).

`loadItems(query)` is the async source: debounced 400 ms, sequence-guarded,
with a `Searching…` empty state. The seed `items` stay available for the current
value display.

## 7. Keyboard

↑/↓ move the panel highlight; Enter activates the lit row or commits when none
is lit; Tab commits + hands off; Escape cancels; ⌘A / Ctrl+A selects the visible
set in multiple mode while the panel is open. The caret stays in the field.

## 8. EntityDropdown parity (app adapter)

| EntityDropdown | PickerField |
|---|---|
| `value` comma string | `values: string[]` (adapter splits/joins) |
| `displayMode` / `resolveBy` | `resolveBy` |
| multi / single | `mode` |
| `variant="chip"` / default / `wrapValue` | `appearance` |
| `items`, `renderItem`, `itemBadge`, `anchoredKeys` | same |
| `keepAlphabetical` / `sortItems` | `sortItems` |
| `onCreateItem` | `onCreateItem` (on commit) |
| `onExit` / `onEscape` / `onTabExit` | same |
| `defaultOpen` / `autoFocus` / `selectAllOnOpen` | same |
| `autoGrow` / `skipComma` / `portalTarget` | same |
| `filterItem` | map to `fields` / `keywords` (the SearchMenu matcher) |
| `SelectDropdown` fixed options | `allowFreeText={false}` + `browseAll` |
| `GroupedSelect` tag/accent/hint rows | `rowClassName` / `renderItem` / `detail` |
| `AsyncResultsDropdown` | `loadItems` |
| cast Board IDs / naming modal / link guard | app adapter (not the kit) |

The app keeps a thin `EntityDropdown` adapter for cast Board IDs, name-keyed
categories, `addNewElement` + the naming modal, and `useLinkedEditGuard`. The
legacy `EntityDropdown mode="select"` maps to PickerField `mode="single"`.

## 9. Limits

No submenus, no inline rename, no second panel, no stored comma format. Sets
are anchor-only; notes are not linkable. One panel = SearchMenu.
