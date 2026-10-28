# Morph fields — button → text box (no dropdown)

Status: **read this before adding or changing a button→text-box control
(`MorphSearchField`, `MorphActionField`, or the expandable `SearchMenu`
trigger).** They share one `MorphFieldShell`; never hand-roll a third morph.

Two kit primitives share ONE button→text-box shell:

| Component | Job |
|---|---|
| **`MorphSearchField`** | A FILTER control: collapsed toolbar button → text box; the term survives collapsing (Glide toolbars). Escape clears + collapses; click-away collapses and keeps the term. |
| **`MorphActionField`** | A CREATE/RENAME control: collapsed primary button → plain text box with **action buttons inside the right edge**. Enter/Check submits and collapses; Escape/outside/X cancels and clears. |

Neither opens a panel/dropdown. For a record picker use `SearchMenu`; for a cell editor use `EntityDropdown`.

## `MorphActionField`

```tsx
<MorphActionField
  triggerLabel="Add role"
  triggerIcon={<Plus />}          // collapsed button icon (default Plus)
  fieldIcon={<Plus />}             // optional leading icon INSIDE the field
  placeholder="Role name…"
  value={name}
  onChange={setName}
  onSubmit={createRole}            // Enter / Check → submit, then collapse + clear
  onCancel={() => setName('')}     // Escape / outside / X → cancel, collapse + clear
  actions={[
    { key: 'map', label: 'Pick on map', icon: <MapPin />, keepOpen: true,
      onClick: value => openMap(value) },
  ]}
  collapsedWidth={110}
  expandedWidth={280}
/>
```

### Behaviour contract

- **Closed:** primary button (`triggerLabel` + `triggerIcon`).
- **Open:** the root animates its width (`collapsedWidth` → `expandedWidth`, 220ms); the button cross-fades out and the text box fades in at the same box. The field is focused, caret at the end.
- **Right-edge actions:** custom `actions` first, then the built-in **Check** (when `onSubmit`) and **X** (when `onCancel`). Every action receives the current draft and `{ close }`.
- **Check / Enter:** `onSubmit(value)`, then collapse; `clearOnSubmit` (default true) empties the draft.
- **X / Escape / outside click:** `onCancel()`, then collapse; `clearOnCancel` (default true) empties the draft.
- **`keepOpen: true`** on a custom action leaves the field open — the map-picker pattern (the action can open a modal while the typed text stays put).
- **Focus:** opening focuses the input; submitting/cancelling returns focus to the trigger.
- `fieldIcon` is optional: `null` (default) = plain text box; pass an icon to keep the trigger's identity visible while typing.
- No clear button by default (`showClear` is a `MorphSearchField` concern; the action field uses X).

### Props (the create/rename face)

| Prop | Meaning |
|---|---|
| `value` / `onChange` | Controlled draft (required, like `MorphSearchField`) |
| `triggerLabel` | Collapsed button text (required) |
| `triggerIcon` | Collapsed icon; default `<Plus/>` |
| `fieldIcon` | Leading icon inside the field; default `null` (plain) |
| `placeholder` | Input placeholder |
| `actions` | `MorphFieldAction[]` — `{ key, label, icon, onClick(value, {close}), keepOpen? }` |
| `onSubmit` / `onCancel` | Built-in Check / X + keyboard contract |
| `clearOnSubmit` / `clearOnCancel` | Clear the draft on that exit (default true) |
| `collapsedWidth` / `expandedWidth` | Morph widths (px) |
| `stretch` | Fill the container (grid cells, full-width toolbars): root and field are 100% wide and the label centers; the width morph becomes a cross-fade |
| `variant` | Collapsed button variant; default `primary` |
| `theme` | `light` / `dark` |
| `autoFocus` | Open + focus on mount |
| `onExpandedChange` | Notified on expand/collapse |
| `className`, `aria-label` | Pass-through |

## `MorphSearchField` (filter face)

Same shell, filter semantics: `triggerLabel` defaults to “Filter”, `triggerIcon` defaults to a magnifier, the field keeps its term on collapse, Escape clears + collapses, outside click/ blur collapses but keeps the term. It also accepts `actions`/`leadingIcon`/`onSubmit`/`onCancel`; the app uses it as a filter with `showClear` (default true).

## Coarse/touch scaling

- The trigger uses `Button size="minimal"`, which switches to the kit's coarse
  padding/font (the same switch as `inputCls('sm')`). The field body follows
  `inputCls('sm')` too.
- **Field action buttons, the clear X, and the accordion chevrons** use the
  exported `useIconButtonSize()` recipe: 20px box / 14px glyph on fine pointers,
  interpolating to 32px / 18px at the default coarse scale (0.5), up to
  36px / 20px. The input's right padding is derived from that box, so the
  actions never overlap the text.
- `collapsedWidth` / `expandedWidth` are **fixed px design values** (the same
  convention as `SearchMenu`/`MorphSearchField`), not coarse-interpolated. If a
  coarse layout needs more room, pass larger widths; the internal buttons and
  text still scale.

## Design rules

- **One morph shell.** `MorphActionField` and `MorphSearchField` share the same width/focus/outside-click contract; never add a third hand-rolled button→field morph.
- **No dropdown.** If it needs records/results, use `SearchMenu`. If it needs a cell editor, use `EntityDropdown`.
- **Adders use Plus**, field pickers use MapPin (the `fieldIcon`/`triggerIcon` convention).
- **Actions are icon buttons inside the field**, not a trailing row below it. Keep 1–3; they sit before Check/X.
- **Submit collapses.** Don't leave the field open after a successful create; use `keepOpen` only for a branch action (map picker, “add another” if explicitly wanted).
- **Cancel is safe by default:** outside click cancels (clears), never silently submits.
- **Do not put a spinner/async submit inside the field** — the action API is synchronous; async work belongs to the caller's modal/flow.

## Playground + tests

`playground/src/main.tsx` → **MorphActionField — create/rename, no dropdown** shows:
- Add role (Plus field icon, Check/X)
- Add location (MapPin field icon + MapPin action + Check/X)
- Plain field (no leading icon)

Specs: `playground/specs/morph-action-field.spec.ts` (open/focus, submit via action row, Enter, Escape, outside, `keepOpen`) and `playground/specs/searchable-dropdown.spec.ts` (the filter face + SearchMenu).
