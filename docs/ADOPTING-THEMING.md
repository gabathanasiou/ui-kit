# Adopting the kit's theming (agent guide)

**Read before adding a modal, a panel, a menu, or any portaled control.**
Status: current for kit **v0.1.116** (roadmap 302). The model lives in
[`THEMING.md`](THEMING.md); this page is the do/don't adoption recipe.

## The one rule

**Theme at the surface boundary; never theme each widget.** A surface publishes
`mode` + `accent` (+ `surface`) once. Everything inside — including portaled
menus, tooltips and dialogs — inherits it. If you find yourself passing
`theme=...` to five menus in one modal, stop: the modal should carry the theme
and the menus should inherit.

## The four attributes

| Attribute | Values | Meaning |
| --- | --- | --- |
| `data-mode` | `light` \| `dark` | Neutral surfaces/text/borders |
| `data-accent` | `zinc` \| `blue` \| `emerald` | The project colour |
| `data-surface` | `neutral` \| `accent` | `accent` opts into the tinted ladder (strong header, pale wells) **and applies the accent**; `neutral` keeps the normal palette **and drops the accent** |
| `data-context` | `surface` \| `chrome` | `chrome` = coloured header → identity colour always applies, menus open fully coloured |

Normal modal: `surface="neutral"` → no accent inside (selection/checks/Seg/
chips are neutral). Coloured Drive/shared modal: `surface="accent"` → accent
header + accent states. Local project: `accent="blue"`, `surface="neutral"`
(blue header/tabs only; normal modals stay neutral). Kit default:
`accent="zinc"`, neutral.

## Recipes

### Themed modal (the common case)

```tsx
<Modal
  open={open}
  onClose={close}
  title="Day 4"
  theme="dark"        // or omit: inherits the scope / defaults dark
  accent="emerald"    // project identity
  surface="accent"    // strong emerald header, neutral body, tinted wells
>
  <Button variant="primary">Save day</Button>

  {/* NO theme prop — the modal's surface context makes it a neutral menu
      with emerald selected/hover states. */}
  <DropdownMenu ...>...</DropdownMenu>
</Modal>
```

### Normal modal

Use `surface="neutral"`. The header/body/card/calendar stay light/dark and the
accent is **suppressed** inside: selection, checks, Seg and date chips are
neutral. The project colour still lives in the chrome (app header/tabs) and in
any explicit accent-tinted surface. If you want accent states inside, use
`surface="accent"` (or a manual Lego scope for one control).

### Page / panel

```tsx
<ThemeScope mode="light" accent="blue">
  <MyPanel />
</ThemeScope>
```

A scope that sets only `accent` (no `surface`) is a manual override: it keeps
blue inside even when its parent is neutral. Add `surface="neutral"` when you
want the normal neutral panel with a blue identity for chrome children.

### Chrome header / toolbar (fully coloured menus)

```tsx
<ThemeScope mode="dark" accent="emerald" context="chrome">
  <AppHeader />   {/* its DropdownMenus now render the full emerald preset */}
</ThemeScope>
```

A menu opened from a coloured header is **fully themed on purpose**. A menu
opened inside a modal/panel must stay light/dark with accent states only.
Explicitly passing `theme="emerald"` inside a modal forces the full preset —
use it only when that is genuinely what you want.

### Custom portal (only if it is not a kit component)

React context crosses a portal; DOM attributes do not. Copy them yourself:

```tsx
const t = useKitTheme();
<div data-mode={t?.mode} data-accent={t?.accent} data-surface={t?.surface}>
  …
</div>
```

For menus, use the kit's `menuAttributesOf` (`useKitTheme` + the helper) rather
than hand-writing the rules.

## Inside a modal — what themes what

| Element | Behaviour inside a modal |
| --- | --- |
| Modal shell | `surface="accent"`: A950 header, neutral body, A100 footer + accent states. `neutral`: normally themed light/dark shell with **no accent inside**. |
| Dropdown / ContextMenu | Neutral panel; items use the **soft button hover**, selected uses the selected role, selected+hover lifts. On a neutral surface all of it is neutral; on an accent surface, accent states. **Do not pass `theme`** unless forcing a preset. |
| Tooltip | Carries mode + effective accent itself (portal). |
| Inputs / NumberInput | Transparent; inherit the surface. Hover = neutral lift; focus = neutral border. Never accent-filled. |
| Button primary | Accent action on an accent surface; neutral primary on a neutral surface. |
| Cards / calendar | Accent header/body on an accent surface; neutral shell on a neutral surface. Calendar body/footer are always neutral. |
| Checkbox / Checklist / Radio | Neutral panel; selected row/box uses the accent roles only where the accent applies. |
| Seg | Neutral outline/labels; accent pill only on chrome/accent surfaces or a local override. |
| Tabs | Pill role; chrome tabs need a chrome `ThemeScope` so the pill resolves the accent. |

## Colour one control manually (Lego scopes)

The accent is inherited from the nearest scope, so a single control can have a
different accent without a colour prop — including inside a neutral modal:

```tsx
{/* Only this Seg is blue, even inside a neutral (or emerald) modal. */}
<ThemeProvider mode="dark" accent="blue">
  <Seg value={view} options={…} onChange={setView} variant="track" />
</ThemeProvider>
```

- Use `ThemeProvider` (context only) when the child writes its own `data-*`
  attributes (Button, Seg, DatePicker, DropdownMenu).
- Use `ThemeScope` when a container/panel needs the attributes on a wrapper
  (token-driven children like CardSection, Checklist, inputs).
- An accent-only scope is a manual override even when its parent is neutral.
  Declaring `surface="neutral"` on it explicitly neutralises again.
- **No per-component `color`/`accent` props.** A new colour is one
  `[data-accent="…"]` block + the `KitAccent` union — then every role works.

The Theme lab has both examples: the **Lego override** Seg in the controls row,
and a blue **Lego** Seg inside the neutral-surface modal.

## Dialogs

Confirm/prompt/alert dialogs render through the kit Modal and inherit the
surface automatically **only if their `DialogProvider` sits inside the theme
scope**. The app's global provider usually sits above the project scope, so:

- move `DialogProvider` inside the project/surface scope, or
- pass the theme explicitly:
  ```tsx
  <DialogProvider theme="dark" accent="emerald" surface="accent">
  ```
- The dialog's primary action uses **action** (accent); destructive confirms use
  **danger** only when `confirm({ danger: true })` is set.

The Theme lab's “Show themed dialog” button is mounted inside a nested
`DialogProvider`, so it demonstrates the inherited surface.

## Do / Don't

| Do | Don't |
| --- | --- |
| Theme the modal/panel once | Pass `theme` to every dropdown |
| Use `surface="neutral"` for normal modals | Expect a neutral surface to keep accent selection |
| Use `surface="accent"` for tinted Drive/shared surfaces | Tint individual controls by hand |
| Wrap the app header/tabs in `context="chrome"` | Expect a neutral surface to colour chrome |
| Use `--ui-accent-action/selected/hover/highlight/soft/header/pill/check` roles | Pick A600/A800/A950 per component |
| Use `bg-[var(--ui-…)]` / `text-[color:var(--ui-…)]` | Hardcode `bg-zinc-900`, `text-white`, `bg-blue-950` |
| Keep outlines neutral (`--ui-border`, `--ui-accent-focus`) | Colour borders or focus rings |
| Keep inputs transparent | Fill inputs with `--ui-input-bg` |
| Check the Theme lab at 3 accents × 2 modes | Eyeball one theme and ship |

## Symptom → cause

| Symptom | Cause / fix |
| --- | --- |
| A menu is blue inside an emerald modal | Explicit `theme="blue"`/`"dark"` on the menu, or a legacy `data-theme` ancestor. Remove it; let the surface context win. |
| Header/card title is dark on a dark accent header | `text-[var(--ui-…)]` was parsed as font-size. Use `text-[color:var(--ui-…)]`. |
| Inputs look green/accented | `.ui-input` / `.ui-number-box` were given `--ui-input-bg`; they must stay transparent. |
| Hover on a card/calendar header goes grey | The header hover used a white wash; use `--ui-accent-header-hover`. |
| Two “selected” rows look different | One component is still using a raw step; map it to `--ui-accent-selected-*`. |
| A dropdown is unclickable inside a modal | It is not portaled above the modal; use the kit menu (z-index handled) or the shared panel. |
| Emerald project still shows blue toggles/tabs | The chrome surface is not wrapped in a `ThemeScope` with the project accent, or a hardcoded blue class remains. |
| A neutral modal still shows accent selection/checks | A nested accent-only scope is intentionally overriding it (Lego), or a component received an explicit `theme`/`accent` prop. |
| A manual (Lego) accent turned neutral | Its scope explicitly declares `surface="neutral"`; set only `accent` (or use `surface="accent"`). |
| The app header lost its colour after a neutral-surface change | The header/tabs are inside the neutral surface scope. Wrap them in `ThemeScope context="chrome"`; neutral only suppresses surface content. |

## Verification

1. Open the **Theme lab** in the playground (`npm run dev`).
2. Check the surface at light/dark × zinc/blue/emerald.
3. Open the **modal menu** (must be neutral + accent states) and the **header
   menu** (must be fully coloured).
4. Hover/focus inputs, checkboxes, Seg and rows — no accent behind inputs, no
   coloured outlines.
5. `npm run lint`; behavioural changes also run `npm run test:playground`.
