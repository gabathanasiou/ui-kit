# Theming — mode, accent, surface

**Read this before changing colours, the Modal shell, or any menu/dropdown theming.**
Status: shipped in **v0.1.115** (roadmap 302); the Theme lab is the visual harness.

The kit themes on **two axes plus a surface flag**. Keeping them separate is the
whole model: lightness is a design decision, a project's colour is an identity
decision, and neither should force a hand-written theme block.

| Axis | Attribute | Values | Owns |
| --- | --- | --- | --- |
| Mode | `data-mode` | `light` \| `dark` | Neutral surfaces, body text, borders, control fills |
| Accent | `data-accent` | `zinc` \| `blue` \| `emerald` | Selection, hover, checks, the accent scale, colored chrome presets |
| Surface | `data-surface` | `neutral` \| `accent` | `accent` opts a container into the tinted ladder (strong header, pale wells) |
| Context | `data-context` | `surface` \| `chrome` | `chrome` = a coloured header/toolbar → menus open FULLY coloured; `surface` = a modal/panel → menus stay light/dark with accent states |

`zinc` = no project colour: **neutral** selection (the kit default).
`blue` = Drive-style chrome. `emerald` = shared/collaborative chrome.
Add a colour by adding one `[data-accent="…"]` block — no component changes.

## ThemeScope / ThemeProvider

```tsx
<ThemeScope mode="light" accent="emerald" surface="accent" context="surface">
  <Modal open={open} onClose={close} title="Day 4" surface="accent" accent="emerald">
    <Button variant="primary">Save</Button>
  </Modal>
</ThemeScope>
```

- `ThemeProvider` publishes the pair without a DOM wrapper — the Modal uses it
  so its whole subtree (portals included) inherits the surface theme.
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
  (neutral panel) and only their **accent** is tinted — selected row, hover,
  checked state. A fully coloured panel inside a pastel modal reads wrong.
- An explicit `theme="blue | emerald | light | dark"` still forces a preset
  anywhere ("unless specified").

## Surfaces — the accent ladder

`surface="accent"` (Drive/shared modals) uses a 4-step ladder:

| Role | Light | Dark |
| --- | --- | --- |
| Header (THE app-header colour) | `accent-950` + white title/icon | `accent-950` + white |
| Body | neutral `#fff` | neutral `#18181b` |
| Card / input wells | `accent-100` / lighter `accent-50` fields | `accent-900` mixes |
| Footer | `accent-50` | `accent-950` mix |
| Card + calendar headers | `accent-900` + white | `accent-950` + white |
| Calendar body | **neutral** (only header/footer accent) | **neutral** |
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
- **Danger/success/warning never follow the accent.**

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
| `DropdownMenu`, `ContextMenu`, `DropdownSubmenu` | yes — chrome preset or surface mode+accent |
| `Checkbox`, `Checklist`, `RadioList`, `NumberInput` | yes — token-driven |
| `CardSection` | yes — accent header + count chip, accent body |
| `Tooltip` (portal-safe) | yes |
| `Button` | yes — mode, project accent, accent hovers, accent active state |
| `Seg` (track) | yes — neutral border/labels, accent pill |
| `DatePicker` | yes — accent header/footer, neutral body, accent selection |
| `Modal`, `ModalFooter`, `ModalFooterButton` | yes — full shell |
| `RichTextEditor` / `FormatToolbar` / editor `TB_*` | not yet (dark-only follow-up) |

## The theme lab

`playground/src/main.tsx` → **Theme lab** (top of the page): mode / accent /
surface controls, a live preview with a **chrome-context** header menu, and a
full dummy modal using buttons, menus, Seg, date picker, number input,
checklist, radio list, card section, tooltip and footer buttons — plus a
surface menu opened *inside* the modal. Specs:
`playground/specs/modal-portal.spec.ts` (scope attributes, chrome-vs-surface
menus, computed surface colours).

## Migration checklist for a new surface

1. Replace hardcoded Tailwind colour utilities with `bg-[var(--ui-*)]`,
   `text-[var(--ui-*)]`, `border-[var(--ui-*)]` (or a `.ui-*` class).
2. If it portals, write `data-mode` / `data-accent` (and `data-surface` when the
   container opts into the tinted ladder) on the portal root.
3. Check both modes and all three accents in the theme lab; check hover,
   selected, checked and disabled states — not just rest.
4. Add a token if the surface needs a colour that has no role yet; never add a
   component-specific hex.
