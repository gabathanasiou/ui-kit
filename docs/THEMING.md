# Theming — mode, accent, surface

**Read this before changing colours, the Modal shell, or any menu/dropdown theming.**
Status: shipped in **v0.1.115** (roadmap 302), refined in **v0.1.116**; the Theme lab is the visual harness.
**Adopting it in an app/surface? Read [`ADOPTING-THEMING.md`](ADOPTING-THEMING.md) first — the do/don't recipes and the modal-inside-modal rules.**

The kit themes on **two axes plus a surface flag**. Keeping them separate is the
whole model: lightness is a design decision, a project's colour is an identity
decision, and neither should force a hand-written theme block.

| Axis | Attribute | Values | Owns |
| --- | --- | --- | --- |
| Mode | `data-mode` | `light` \| `dark` | Neutral surfaces, body text, borders, control fills |
| Accent | `data-accent` | `zinc` \| `blue` \| `emerald` | Project identity: chrome, accent surfaces, manual overrides — **suppressed inside a neutral surface** |
| Surface | `data-surface` | `neutral` \| `accent` | `accent` opts a container into the tinted ladder (strong header, pale wells) **and applies the accent**; `neutral` keeps the normal palette **and drops the accent** |
| Context | `data-context` | `surface` \| `chrome` | `chrome` = a coloured header/toolbar → identity colours always apply, menus open FULLY coloured; `surface` = a modal/panel → neutral chrome stays neutral, accent states only on an accent surface |

`zinc` = no project colour: **neutral** selection (the kit default).
`blue` = Drive-style chrome. `emerald` = shared/collaborative chrome.
Add a colour by adding one `[data-accent="…"]` block — no component changes.

**Where the accent applies** — this is the rule that keeps cloud projects
looking like today (blue header/tabs, neutral modals):

| Container | surface | context | Accent inside? |
| --- | --- | --- | --- |
| App header / tabs | `neutral` | `chrome` | **yes** — identity colour |
| Normal modal / panel | `neutral` | `surface` | **no** — resolves to zinc |
| Tinted (Drive/shared) modal | `accent` | `surface` | **yes** |
| Manual “Lego” scope | inherited | inherited | **yes** when the scope sets ONLY `accent` |

A nested `ThemeScope`/`ThemeProvider` that sets only `accent` is a manual
override and keeps it even inside a neutral surface. Declaring
`surface="neutral"` explicitly re-neutralises.

**The one exception — the primary CTA.** `Button variant="primary"` reads
`data-identity-accent` (the raw accent, kept on `KitTheme.identityAccent`) and
paints `--ui-btn-primary-bg`, the app-header step. A neutral modal therefore
keeps its project colour on its primary action while every other accent state
is suppressed. The MODAL FOOTER HERO is deliberately not part of this: the
familiar bordered zinc `ModalFooterButton` recipe stays inside modals on every
surface; `tone="accent"` is the explicit accent opt-in. Everything else still
follows the table above.

## ThemeScope / ThemeProvider

```tsx
<ThemeScope mode="light" accent="emerald" surface="accent" context="surface">
  <Modal open={open} onClose={close} title="Day 4" surface="accent" accent="emerald">
    <Button variant="primary">Save</Button>
  </Modal>
</ThemeScope>
```

- `ThemeProvider` publishes the resolved theme without a DOM wrapper — the
  Modal uses it so its whole subtree (portals included) inherits the surface
  theme. An accent-only provider is a manual override; an explicit
  `surface="neutral"` neutralises.
- `ThemeScope` is the provider + `data-mode`/`data-accent`/`data-surface`/
  `data-context` on a wrapper (pages, panels, cards).
- Portaled kit roots (menus, tooltips, context menus) re-write the axes on the
  portal div. React context crosses a portal; DOM attributes do not.
- Any surface can override the app theme: a light modal inside a dark app.

Precedence, highest first: explicit component prop → nearest provider/scope →
the component's historical default (light toolbars, dark modals, dark menus).

## Menus — chrome vs surface

This distinction is deliberate:

- **Chrome context** (the coloured app header/toolbar): menus open **fully
  themed** — deep blue/emerald panel, white-alpha hover/selection. That is what
  the app's header menus do today.
- **Surface context** (inside a modal/panel): menus stay **light or dark**
  (neutral panel). On an **accent surface** their selected/hover/checked states
  follow the accent; on a **neutral surface** the accent is suppressed, so they
  stay fully neutral. A nested accent-only scope (Lego) re-enables the tint for
  that menu/surface.
- An explicit `theme="blue | emerald | light | dark"` still forces a preset
  anywhere ("unless specified").

## Surfaces — the accent ladder

`surface="accent"` (Drive/shared modals) uses a 4-step ladder. A
`surface="neutral"` container uses the normal light/dark palette and carries no
accent inside (selection, checks, Seg, date chips are neutral); its colour
identity lives in chrome (the app header/tabs) or an explicit local override.

| Role | Light | Dark |
| --- | --- | --- |
| Header (THE app-header colour) | `accent-950` + white title/icon | `accent-950` + white |
| Body | neutral `#fff` | neutral `#18181b` |
| Card / input wells | card shell **neutral raised**; inputs **transparent** (inherit) | card shell **neutral raised**; inputs **transparent** (inherit) |
| Footer | `accent-50` | `accent-950` mix |
| Card headers | `accent-900` + white | `accent-950` + white |
| Calendar | **accent header**; **neutral** body + footer; selection/chips accent | accent header, neutral body/footer |
| Card-header hover | `accent-800` (deeper, never grey) | `accent-900` (lighter, never grey) |
| Checklist / radio list | **neutral** panel; only checked rows + boxes accent | **neutral** |
| Selection | `accent-200` + `accent-900` text | `accent-400` @ 26% + white |
| Hover | accent-600 @ 6–7% | accent-400 @ 8–10% |

Rules:

- **Outlines are never coloured.** Hairlines use neutral `--ui-border`;
  interactive controls use the slightly stronger neutral `--ui-border-strong`.
  Colour belongs to fills and bands.
- **Base surfaces stay opaque** (or ≥95% alpha). Translucency changes contrast
  with whatever is behind it, compounds across modal → menu → tooltip, and
  `backdrop-filter` is expensive on iPad under the overlay morph.
- **Contrast wins over theming.** Text on accent surfaces uses the darker
  accent steps (light) / lighter steps (dark); selected dates and solid buttons
  use `accent-700`/`800` with white text; the dark-mode checkbox uses a dark
  check mark on `accent-400`.
- **Inputs share one recipe.** Text boxes (`.ui-input`) and number boxes
  (`.ui-number-box`) are **transparent** — they inherit the surrounding surface.
  Hover adds a neutral fill lift (white 6% dark / black 4% light) with the border
  unchanged; **focus keeps that lift** and only nudges the border
  (`--ui-input-focus-border`, a subtle neutral step). Both are animated (120ms).
  One token set drives both.
- **One control scale.** Height: **30px for every control** — buttons, text
  inputs (`inputCls('md' | 'sm')`, `useInputSize()`), number boxes, Seg
  segments and every picker trigger (coarse/touch keeps its larger tap size).
  Radii:
  `--ui-radius-btn` (6px) on inputs, number boxes, buttons and Seg tracks;
  nested corners follow **R_inner = R_outer − padding** — the Seg track pads by
  2px, so its segments/pill use `--ui-radius-inset` (`calc(6px - 2px)` = 4px).
  `.ui-input-ghost` is the borderless field: no border at rest, border + fill on
  hover, stronger border while focused.
- **Card shells stay neutral; only their headers wear the accent.** A neutral
  raised fill + `--ui-border-strong` keeps the card readable on the neutral body.
- **Card-header hovers stay in the accent family** (a deeper/lighter step), never
  a white/grey wash. The calendar BODY and FOOTER stay neutral in accent surfaces;
  only its header is accented (the card-header role).
- **Menus behave like buttons:** the cursor uses the soft button fill; a selected
  row keeps the selected fill and only lifts on hover. Manager rows use the
  lighter row hover.
- **Motion is functional, fast, and consistent:** hover/selection fills and
  borders transition over 120–150ms; tooltips fade in over 90ms; the radio dot
  pops in over 120ms. Mount animations are skipped under
  `prefers-reduced-motion`; never add springs or slides to state feedback.
- **Danger/success/warning never follow the accent.**

## Canonical roles — consume these, never a raw step

These roles apply only where the accent is active (chrome, an accent surface,
or a manual accent-only scope). Inside a neutral surface the same aliases
resolve to the neutral ladder.

| Role | Light | Dark | Used by |
| --- | --- | --- | --- |
| `--ui-btn-primary-bg` / `-hover` | A950 / A900, white text | A950 / A900 | `Button variant="primary"` only; keyed by `data-identity-accent`, so it survives a neutral surface |
| `--ui-accent-action` / `-hover` | A800 / A700, white text | A800 / A700 | `ModalFooterButton tone="accent"` + the `--ui-accent-solid` aliases |
| `--ui-accent-selected-bg` / `-text` | A200 / A900 | A400 @ 26% / white | menu selected, row active, checklist/radio checked, date chips, selected date |
| `--ui-accent-hover-bg` / `-text` | A600 @ 6% / strong text | A400 @ 8% / white | menu/row/cell/seg hover |
| `--ui-accent-highlight-bg` / `-text` | soft (cursor) / strong text | A400 @ 12% / white | pointer + keyboard cursor on an UNSELECTED row |
| `--ui-accent-selected-hover-bg` | A300 | A400 @ 32% | hovering an already-selected row/chip (keeps the selection) |
| `--ui-accent-soft-bg` / `-text` | A600 @ 10% / A700 | A400 @ 12% / A300 | active icon buttons, soft badges, ghost hover |
| `--ui-accent-header-bg` / `-hover` | A900 / A800 | A950 / A900 | card + calendar headers (modal header is A950 in both modes) |
| `--ui-accent-pill-bg` / `-text` | A950 / A50 | A800 / white | Seg pill, chrome variant, toggles |
| `--ui-accent-check-bg` / `-mark` | A800 / white | A400 / accent-tinted dark ink | checkbox + radio |
| `--ui-accent-focus` | neutral | neutral | keyboard focus outlines (never coloured) |

Rules:

- **Components must not choose a raw accent step.** If a surface needs a new
  colour, add a role here (and its alias) rather than reaching for A600/A900.
- **Outlines are never coloured.** Focus uses `--ui-accent-focus` (neutral);
  hairlines use `--ui-border` / `--ui-border-strong`.
- **Chrome-only components** (tab pills, toolbar segments, editor toggles)
  resolve their accent from an ambient `ThemeScope`. Without one they fall back
  to the legacy blue. Wrap the chrome surface in a scope; do not re-hardcode
  `blue-950`/`emerald-950`.
- **Legacy `[data-theme]` presets** remain for old call sites but are not the
  canonical path: a `data-theme` menu uses the old blue/white selection and
  overrides the accent scope. New surfaces use `mode` + `accent` (+ `surface`
  when tinted).

## Tokens

`src/styles/tokens.css` holds every colour; components reference `--ui-*`:

- **Accent scale** — `--ui-accent-50/100/200/300/400/500/600/700/800/900/950`.
  Everything themed derives from it.
- **Interaction** — `--ui-item-selected-*`, `--ui-item-hover-*`,
  `--ui-row-active-*`, `--ui-row-hover-*`, `--ui-check-*`, `--ui-btn-active-*`,
  `--ui-btn-hover-*`, `--ui-seg-*`.
- **Modal shell** — `--ui-modal-bg`, `--ui-modal-body-bg`,
  `--ui-modal-header-bg/base/border`, `--ui-modal-footer-bg`,
  `--ui-modal-title/icon/muted`, `--ui-card-header-*`, `--ui-date-header-*`,
  `--ui-date-body-bg`, `--ui-date-footer-bg`, `--ui-date-chip-*`.
- **Neutral borders** — `--ui-border` (dividers/cards), `--ui-border-strong`
  (inputs, checklists, Seg tracks).
- **Legacy presets** — `[data-theme="light|dark|blue|emerald"]` still exist and
  `DropdownMenu` / `ContextMenu` / `Dialog` still use them. `data-mode` and
  `data-theme` compose, so a dark menu inside a light scope stays dark.

## Coverage

| Surface | Follows the scope today |
| --- | --- |
| `DropdownMenu`, `ContextMenu`, `DropdownSubmenu` | yes — chrome preset or surface mode + effective accent (zinc on a neutral surface) |
| `Checkbox`, `Checklist`, `RadioList`, `NumberInput` | yes — token-driven |
| `CardSection` | yes — accent header + count chip on accent surfaces; neutral otherwise |
| `Tooltip` (portal-safe) | yes |
| `Button` | yes — mode; project accent on chrome/accent surfaces; neutral on neutral surfaces |
| `Seg` (track) | yes — neutral border/labels; accent pill only where the accent applies |
| `DatePicker` | yes — accent header/selection/chips on accent surfaces; neutral on neutral surfaces |
| `Modal`, `ModalFooter`, `ModalFooterButton` | yes — full shell |
| `RichTextEditor` / `FormatToolbar` / editor `TB_*` | not yet (dark-only follow-up) |

## The theme lab

`playground/src/main.tsx` → **Theme lab** (top of the page): mode / accent /
surface controls, a live preview with a **chrome-context** header menu, and a
full dummy modal using buttons, menus, Seg, date picker, number input,
checklist, radio list, card section, tooltip and footer buttons — plus a
surface menu opened *inside* the modal and a **Lego** blue Seg that stays blue
inside a neutral modal. Specs: `playground/specs/modal-portal.spec.ts` (scope
attributes, chrome-vs-surface menus, neutral-surface suppression + the manual
override, computed surface colours).

## Migration checklist for a new surface

1. Replace hardcoded Tailwind colour utilities with `bg-[var(--ui-*)]`,
   `text-[var(--ui-*)]`, `border-[var(--ui-*)]` (or a `.ui-*` class).
2. If it portals, write `data-mode` / `data-accent` (and `data-surface` when the
   container opts into the tinted ladder) on the portal root.
3. Check both modes and all three accents in the theme lab; check hover,
   selected, checked and disabled states — not just rest.
4. Add a token if the surface needs a colour that has no role yet; never add a
   component-specific hex.
