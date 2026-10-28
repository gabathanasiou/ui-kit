# Controls — buttons, tabs, Segs, toggles, morph fields

Status: **canonical for the control family** — read before adding a control, a
variant or a new face. The token/anatomy rules live in `THEMING.md`; the
playground maps in `PLAYGROUND.md`.

## 1. One scale

| | Standard | Notes |
|---|---|---|
| Height | **30px** | buttons, text inputs (`inputCls`), number boxes, Seg segments (24px inside a 30px track), every picker/morph trigger |
| Radius | **6px** (`--ui-radius-btn`) | inputs, number boxes, buttons, Seg track |
| Nested radius | **`--ui-radius-inset`** = `calc(R_outer − padding)` | Seg segments/pill = 6 − 2 = 4px |
| Tabs | 4px (`rounded`) | header/mini tabs keep their own recipe so the SELECTED pill (`TAB_PILL`) matches |

`.ui-input-ghost` is the borderless field: no edge at rest, edge + fill on
hover, stronger edge on focus. Never shrink a control below 30 with negative
margins — if a row looks tight, fix the row.

## 2. Buttons — the full reference

### 2.1 Variants

| Variant | Rest | Hover / open | Use |
|---|---|---|---|
| `subtle` (default) | text only | shared hover wash | quiet toolbar actions, menu triggers |
| `primary` | solid zinc (or the project accent via `cloud` / `cloud="emerald"`) | one step deeper | the ONE hero action per surface |
| `outline` | transparent + 1px inset edge | wash | a secondary action that must read as a button at rest |
| `danger-ghost` | text in the danger colour | danger wash | destructive actions |
| `tab` | text only; the ROW paints the sliding pill (`TAB_PILL`) | text colour change | navigation — PageToolbar mini tabs |
| `tab-header` | text only; the ROW paints the pill | quiet dark hover | navigation — AppHeader top tabs |

The outline edge is an **inset shadow**, never a border, so switching variants
never changes the box size. `active` (the lit state) paints the accent fill and
sets `aria-pressed` on base variants; tabs use `aria-selected` instead.

### 2.2 Props

| Prop | Effect |
|---|---|
| `variant` | see 2.1 |
| `theme` | `light` \| `dark` (toolbar palettes) |
| `cloud` | `true`/`'emerald'` — project-chrome tint for light primaries and tabs |
| `active` | lit/toggled fill; `aria-pressed` on base variants |
| `disabled` | 40% opacity, no pointer |
| `iconOnly` | square icon button (`iconDim` 28 / 40 coarse); pair with `aria-label`/`title` |
| `size` | `default` \| `minimal` (the **30px standard box**, radius 6) |
| `icon` | leading icon (tab variants: icon-first) |
| `collapse` | icon-only at rest; the label reveals on hover/focus/active/open (needs `icon`) |
| `iconWithLabel` | with `collapse`: `false` = the swap (icon at rest, TEXT ONLY on reveal) |
| `revealOnHover` | bare icon: the variant's box appears on hover/focus/open; an active button keeps its box |
| `keepLabelOnActive` | with `collapse` + `active`: `false` = a TOGGLE collapses back after the press |
| `reserveLabel` | invisible width shim = the longer label (Edit ↔ Done never jitters) |
| `iconRoll` | `up` (advance, default) \| `down` (return) — direction of the icon-change roll |
| `className` / `style` | extras only (layout), never a second trigger recipe |

### 2.3 Recipes

```tsx
// quiet toolbar trigger
<Button>View</Button>

// hero (modal footer uses ModalFooterButton, never this directly)
<Button variant="primary" cloud={isDrive}>Save</Button>

// icon-only square
<Button iconOnly aria-label="Print" title="Print"><Printer /></Button>

// icon → label on hover (layout grows; no reserved box)
<Button variant="outline" icon={<Search />} collapse>Search</Button>

// bare icon → its box on hover, then the full button
<Button variant="outline" icon={<Search />} collapse revealOnHover>Search</Button>

// toggle (2 states) — collapses back, stable width, direction-aware roll
<Button
  variant="outline"
  icon={on ? <Check /> : <Pencil />}
  collapse revealOnHover keepLabelOnActive={false} reserveLabel="Editing"
  iconRoll={on ? 'up' : 'down'}
  active={on}
  onClick={() => setOn(!on)}
>Editing</Button>

// toggle with 3+ states — cycle your own array, no extra API
const [i, setI] = useState(0);
<Button
  variant="outline"
  icon={STATES[i].icon}
  collapse revealOnHover keepLabelOnActive={false}
  reserveLabel={LONGEST_LABEL}
  active={STATES[i].active}
  onClick={() => setI(n => (n + 1) % STATES.length)}
>{STATES[i].label}</Button>

// dropdown trigger with the same face (menu must be controlled)
<DropdownMenu open={open} onOpenChange={setOpen}
  trigger={<Button variant="outline" icon={<Pencil />} collapse revealOnHover>Actions</Button>}>
```

### 2.4 Rules

- Never hand-write a button shell: `Button` (and `ModalFooterButton` inside
  modal footers) owns the box, hover/open/active, radius and focus.
- Modal footer = exactly ONE hero; every other footer button is `ghost`.
- An icon-only button MUST carry `aria-label` (tooltip via `title`).
- `collapse`/`revealOnHover` are FACE props: they never change the action,
  routing or the value model. Navigation tabs stay `tab`/`tab-header` and
  `go()`-driven.
- Keep the label short — the reveal grows the button in flow. For a label that
  CHANGES, pass `reserveLabel` (the longer one) so the press doesn't shift the
  row.

## 3. Tabs vs Seg — same bones, different jobs

Both are "pick one of N" with a measured sliding pill (`useSlidingPill`) and
the same `TabFace`. The difference is the contract:

- **Tabs are navigation.** `Button variant="tab"` (mini, PageToolbar) or
  `tab-header` (AppHeader). The row renders the white/accent pill (`TAB_PILL`);
  the button carries only the text colour. Routing stays in the caller
  (`go()`); never move navigation into a Seg.
- **Seg is a value.** `Seg variant="track"` (padded track + sliding pill) or
  `variant="chrome"` (joined editor cells). Themes: `light` / `dark` +
  project accents `blue` / `emerald`; `dense` = 26px toolbar height.

Both support per-option `icon`, and both can run the **collapsing face**
(`TabFace`):
- `collapse` / `iconCollapse` — the label collapses to the icon and reveals on
  hover/focus (`iconWithLabel` default true = icon + label).
- `iconWithLabel={false}` — the SWAP: icon at rest, **text only** on
  hover/selection (the `seg-icon-swap` demo).
- The selected/active item always shows its label.
- `reserveLabel` (Button) / a width shim keeps the box stable when the label
  text changes (Edit ↔ Done).

## 4. Toggles

A toggle is a **Button** with `active` — no separate component:

```tsx
<Button
  variant="outline"
  icon={on ? <Check /> : <Pencil />}
  collapse revealOnHover
  keepLabelOnActive={false}      // a toggle collapses back to its icon
  reserveLabel="Editing"         // width of the longer label (no jitter)
  iconRoll={on ? 'up' : 'down'}  // return rolls back the way it came
  active={on}
  onClick={() => setOn(!on)}
>Editing</Button>
```

- The expandable face is **optional**: a plain labelled `active` Button and a
  square `iconOnly` Button toggle just as well.
- **3+ states** need no API: cycle your own array and drive
  `icon` / children / `active`; pick `iconRoll` from the index move (`up`
  advancing, `down` stepping back/wrapping).
- Screen readers get `aria-pressed` from `active` (base variants only).

## 5. Icon changes roll

`TabFace` animates an icon change as a **vertical roll** inside a clipped box:
the outgoing glyph scrolls up and out, the incoming one scrolls up into place
(200ms; `iconRoll="down"` reverses it). Reduced motion drops the animation.
Applies to buttons, tabs and Segs — no per-component wiring.

The roll box exists **only while a change is in flight**. At every other
moment the icon keeps its plain node, so the collapsing icon → label face
(§3) squishes the glyph away with the width track; an always-mounted wrapper
is a flex item with a min-content width and would instead clip the glyph into
a sliver mid-transition.

## 6. Morph triggers (button → field)

`MorphSearchField` / `MorphActionField` (and the SearchMenu expandable field)
all compose `MorphFieldShell`:

| Trigger face | Props |
|---|---|
| Icon + label at rest | (default) |
| Icon at rest, icon + label on hover | `triggerCollapse` |
| Icon at rest, TEXT ONLY on hover | `triggerCollapse iconWithLabel={false}` |
| Bare icon, box appears on hover | `triggerReveal` (add to the above) |
| Hug the icon (no reserved box) | `collapsedWidth="auto"` |

- The shell animates BOTH ways: a FLIP opens from the measured trigger width,
  and every dismissal (Escape, click-away, Tab/blur, **Enter**) animates back
  down to the trigger before handing the width back to `auto`.
- The field's leading icon uses the trigger's own inset, so the icon does not
  jump when the button becomes a field (`MorphSearchField`).
- A collapsing trigger must not truncate its label — the reveal would flash an
  ellipsis.

## 7. Menus & dropdown triggers

Any node can be a `DropdownMenu` trigger, including a collapsing icon Button:

```tsx
<Button variant="outline" icon={<Pencil />} collapse revealOnHover>Actions</Button>
```

- The menu is **controlled** (`open` / `onOpenChange`); the positioner needs
  that state. Radix writes `data-state="open"`, which keeps the trigger's box
  open while the menu is up.
- **Submenus inherit the parent's resolved tokens at any depth**
  (`DropdownThemeAttrsContext`: `data-theme` / `data-mode` / `data-accent`) —
  a nested menu in an emerald project stays emerald. Never give a submenu its
  own theme preset.

## 8. Playground map

| Section | Demos |
|---|---|
| Foundations → Buttons | variant grids (light/dark, incl. the icon face), **Icon toggle** (2-state, 3-state cycle, labelled + icon-only), icon-expand/reveal buttons |
| Foundations → Inputs & forms | text inputs (md / proportional / sm / borderless), number boxes, **Seg** (track, tablist, icon-collapse, icon-swap, chrome, dense), floating toggle |
| Foundations → Sizing audit | every control measured live (30px / 6px, drift red) + **In a line** rows |
| Menus & pickers → Dropdown menus | icon trigger, submenus (theme inheritance), multiple, item manager |
| Menus & pickers → Search & pickers | SearchMenu modes, PickerField faces, morph search buttons (icon / swap / reveal) |
