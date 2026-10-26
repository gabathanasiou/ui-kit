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
| `data-surface` | `neutral` \| `accent` | `accent` opts into the tinted ladder (strong header, pale wells) |
| `data-context` | `surface` \| `chrome` | `chrome` = coloured header → menus open fully coloured |

Normal modal: `surface="neutral"`. Coloured Drive/shared modal:
`surface="accent"`. Local project: `accent="blue"`, `surface="neutral"` (blue
selection, neutral shell). Kit default: `accent="zinc"`, neutral.

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

Use `surface="neutral"`. The header/body/card/calendar stay light/dark; the
accent still reaches selection, checks, the Seg pill and focus-free states.
`accent="zinc"` removes even those (fully neutral kit default).

### Page / panel

```tsx
<ThemeScope mode="light" accent="blue">
  <MyPanel />
</ThemeScope>
```

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
| Modal shell | `surface="accent"`: A950 header, neutral body, A100 footer. `neutral`: normally themed light/dark shell. |
| Dropdown / ContextMenu | Neutral panel; items use the **soft button hover**, selected uses the selected role, selected+hover lifts. **Do not pass `theme`** unless forcing a preset. |
| Tooltip | Carries mode/accent itself (portal). |
| Inputs / NumberInput | Transparent; inherit the surface. Hover = neutral lift; focus = neutral border. Never accent-filled. |
| Button primary | Accent action inside an accent surface; neutral primary inside a neutral surface. |
| Cards / calendar | Card header accent, card body neutral. Calendar shell **fully neutral** (header/footer/body) — only selected days/chips accent. |
| Checkbox / Checklist / Radio | Neutral panel; selected row/box uses the accent check/selection roles. |
| Seg | Neutral outline/labels; accent pill. |
| Tabs | Pill role; chrome tabs need a chrome `ThemeScope` so the pill resolves the accent. |

## Do / Don't

| Do | Don't |
| --- | --- |
| Theme the modal/panel once | Pass `theme` to every dropdown |
| Use `surface` for tinted vs normal | Recolour headers/bodies by hand |
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

## Verification

1. Open the **Theme lab** in the playground (`npm run dev`).
2. Check the surface at light/dark × zinc/blue/emerald.
3. Open the **modal menu** (must be neutral + accent states) and the **header
   menu** (must be fully coloured).
4. Hover/focus inputs, checkboxes, Seg and rows — no accent behind inputs, no
   coloured outlines.
5. `npm run lint`; behavioural changes also run `npm run test:playground`.
