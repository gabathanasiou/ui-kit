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
| `primary` | the project identity's HEADER step (`--ui-btn-primary-bg`: zinc `#09090b`, Drive `#172554`, shared `#022c22`) | `--ui-btn-primary-hover-bg` | the ONE hero action per surface — keeps the identity even on a neutral surface |
| `solid` | raised, bordered fill (`--ui-btn-solid-*`): mode zinc; accent surfaces use the project colour | one step deeper | a primary action INSIDE a modal body; the footer hero uses the same tokens |
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
| `activeTone` | fill while `active`: `neutral` (default selected tint) / `info` / `success` / `warning` / `danger` — a strong status fill for mode toggles |
| `disabled` | 40% opacity, no pointer |
| `iconOnly` | square icon button (`iconDim` 28 / 40 coarse); pair with `aria-label`/`title` |
| `size` | `default` \| `minimal` (the **30px standard box**, radius 6) |
| `icon` | leading icon (tab variants: icon-first) |
| `collapse` | icon-only at rest; the label reveals on hover/focus/active/open (needs `icon`) |
| `iconWithLabel` | with `collapse`: `false` = the swap (icon at rest, TEXT ONLY on reveal) |
| `revealOnHover` | bare icon: the variant's box appears on hover/focus/open; an active button keeps its box |
| `keepLabelOnActive` | with `collapse` + `active`: `true` = a TOGGLE keeps its ON label open (default `false` = collapse back; tabs always keep the selected label) |
| `reserveLabel` | invisible width shim = the longer label (Edit ↔ Done never jitters) |
| `iconRoll` | `up` (advance, default) \| `down` (return) — direction of the icon-change roll |
| `className` / `style` | extras only (layout), never a second trigger recipe |

### 2.3 Recipes

```tsx
// quiet toolbar trigger
<Button>View</Button>

// hero (modal footer uses ModalFooterButton, never this directly)
<Button variant="primary">Save</Button>

// force Drive/shared colour where the scope has no identity (rare)
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
  collapse revealOnHover keepLabelOnActive={false} reserveLabel="Done"
  iconRoll={on ? 'up' : 'down'}
  active={on}
  onClick={() => setOn(!on)}
>Done</Button>

// mode toggle — ON stays open and switches to a strong tone
<Button
  variant="primary" activeTone="info"
  icon={editing ? <Check /> : <Pencil />}
  collapse keepLabelOnActive reserveLabel="Done"
  iconRoll={editing ? 'down' : 'up'}
  active={editing}
  onClick={() => setEditing(!editing)}
>{editing ? 'Done' : 'Edit'}</Button>

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
- The footer hero is the registered `solid` recipe — the same tokens as
  `Button variant="solid"`, so a body primary and the footer primary agree. It
  is not the identity `Button variant="primary"`; `tone="accent"` forces the
  accent fill explicitly.
- An icon-only button MUST carry `aria-label` (tooltip via `title`).
- `collapse`/`revealOnHover` are FACE props: they never change the action,
  routing or the value model. Navigation tabs stay `tab`/`tab-header` and
  `go()`-driven.
- Keep the label short — the reveal grows the button in flow. For a label that
  CHANGES, pass `reserveLabel` (the longer one) so the press doesn't shift the
  row.
- **Icon semantics are shared too:** `Copy` = copy to the clipboard,
  `CopyPlus` = duplicate in place. Never use the same glyph for both.

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
  keepLabelOnActive={false}      // default: a toggle collapses back
  reserveLabel="Done"            // width of the longer label (no jitter)
  iconRoll={on ? 'up' : 'down'}  // return rolls back the way it came
  active={on}
  onClick={() => setOn(!on)}
>Done</Button>

// mode toggle: the ON label stays open and the fill changes colour
<Button
  variant="primary" activeTone="info"
  icon={editing ? <Check /> : <Pencil />}
  collapse keepLabelOnActive reserveLabel="Done"
  iconRoll={editing ? 'down' : 'up'}
  active={editing}
  onClick={() => setEditing(!editing)}
>{editing ? 'Done' : 'Edit'}</Button>
```

- `activeTone` is the strong ON state: `info` (blue), `success` (emerald),
  `warning` (amber), `danger` (rose). Leave it off for the subtle neutral
  selected tint.
- A toggle collapses back to its icon by default. Pass `keepLabelOnActive`
  when the ON label must stay readable (a mode toggle). Tabs always keep the
  selected label.
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
- **Dock/undock is ONE continuous grid transition.** `TabFace` renders the same
  label/icon columns whether `collapse` is on or off — `collapse` only changes
  the label's resting state (undocked = pinned open; docked = opens for
  active/hover/focus/open). Never branch the DOM on `collapse`: swapping to a
  plain flex face makes the row snap to icons instead of animating. The face
  owns the icon↔label gap whenever an icon is present (`Button` sets the shell
  gap to 0), and the coarse delay applies only to the touch morph.
- **Submenus inherit the parent's resolved tokens at any depth**
  (`DropdownThemeAttrsContext`: `data-theme` / `data-mode` / `data-accent`) —
  a nested menu in an emerald project stays emerald. Never give a submenu its
  own theme preset.

### Touch: controls act on the tap, ghosts never act (roadmap 338)

`coarseItemTap.ts` owns the touch contract, shared by `Button`, `DropdownItem`,
the item manager rows and `ContextMenuItem`:

- **A control acts on `pointerup`** (still press, <14px move, <900ms). For
  rows the action runs, a synthetic `el.click()` lets Radix close the surface,
  and the real click is swallowed once. For `Button` the synthetic click is
  the activation itself (the consumer's own onClick), so **every kit button
  works even when iOS never dispatches a click** — the trace showed dropped
  clicks with identical coordinates, no movement and no blocked main thread.
- **A click only acts if that same row received this gesture's pointerdown**
  (`useGhostClick`). iOS may deliver a tap's click LATE — after its
  tap-to-hover deferral, or after hit-testing changed because the nested card
  replaced the row under the finger. Without this guard that click runs the
  row that happened to appear there (the first child item or Back), which
  looks like "the nested menu dismissed itself". Ghost clicks are ignored AND
  `preventDefault`ed, so the surface stays open. `detail === 0`
  (keyboard `.click()`), a focused row (VoiceOver activates with a bare click)
  and mouse/pen clicks are never ghosts.
- **Reopen during a close morph ends at the natural state.** `playOverlayOpen`
  must never restore a snapshot of the closing element's inline `opacity:0` /
  scale — the menu stayed mounted, "open" and permanently invisible until the
  user tapped again. A pointerdown on the menu **trigger** is never an outside
  dismissal either: on touch Radix defers outside-dismissal to the click, and
  that deferred click closed a just-reopened menu (the other half of "tap,
  nothing happens, tap again").
- **Label morph on touch is opt-in.** `TabFace` defaults to state-driven
  reveals only (`fine:`-gated hover geometry) because a hover reflow can drop
  a click. `Button` passes `coarseReveal` (its own `touchReveal`, default
  true) because it activates on pointerup and is therefore immune; the morph
  keeps its 200ms coarse delay. A direct `TabFace` consumer with click-based
  activation must leave it false.

Regressions: playground `iphone-touch.spec.ts` §"ghost clicks and reopen races
(338)" (motion ON) + the app's `e2e/iphone-touch.spec.ts` cases 338.

## 8. Playground map

| Section | Demos |
|---|---|
| Foundations → Buttons | variant grids (light/dark, incl. the icon face), **Icon toggle** (2-state, 3-state cycle, labelled + icon-only), icon-expand/reveal buttons |
| Foundations → Inputs & forms | text inputs (md / proportional / sm / borderless), number boxes, **Seg** (track, tablist, icon-collapse, icon-swap, chrome, dense), floating toggle |
| Foundations → Sizing audit | every control measured live (30px / 6px, drift red) + **In a line** rows |
| Menus & pickers → Dropdown menus | icon trigger, submenus (theme inheritance), multiple, item manager |
| Menus & pickers → Search & pickers | SearchMenu modes, PickerField faces, morph search buttons (icon / swap / reveal) |
