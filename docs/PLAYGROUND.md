# The ui-kit playground — read this before changing a demo or a spec

Status: canonical guide for `playground/` (the component zoo + its Playwright
net). `AGENTS.md` keeps the summary; this file holds the detail.

`npm run playground` serves the zoo at `:5183` straight from `src/` (HMR, no
build). `npm run test:playground` runs the regression suite on `:5184`
(`@quarantine` excluded; both desktop Chrome and WebKit-iPad).

## Structure (no monoliths)

- `playground/src/main.tsx` — the `SECTIONS` registry: id, nav group, title,
  blurb, optional `testId`, and the `render(lab)` function. It is the ONE
  source of truth for the rail order and the page body, and it derives the
  scroll-spy ids. Deep links `#<section-id>` work.
- `playground/src/sections/*.tsx` — one module per section; each returns
  `DemoCard`s (never its own `<section>`).
- `playground/src/shell/chrome.tsx` — sticky top bar (brand + coarse-scale
  knob + the mobile "Sections" menu), the section rail (filter + scroll spy),
  `DemoCard`, and `useActiveSection`.
- `playground/src/shell/lab.ts` — the lifted Theme-lab axes (`LabState`).
- `playground/src/demoData.tsx`, `richTextDemo.ts` — shared fixtures (menu
  items, timezones, locations, search records, header-tab icons; rich-text
  tokens + the demo print resolver). The specs depend on these exact labels.
- `playground/src/playground.css` — Tailwind + kit tokens + page chrome.
  `.row` / `.label` are the demo primitives; page chrome classes are `pg-*`.

Adding a demo: put it in the matching section module, wrap it in `DemoCard`,
keep the existing `data-testid`s (they are the spec hooks), and map the file
in `scripts/smart-test.mjs` if you add a new one (playground sources are `ALL`).

## The theme applies to the whole page

The Theme lab no longer themes only its preview. `main.tsx` owns
`mode`/`accent`/`surface`, wraps the app in `<ThemeScope mode accent
surface="accent">`, and mirrors `data-mode`/`data-accent`/`data-surface` onto
`<body>` so **portaled surfaces** (menus, tooltips, dialogs) and overscroll
match too. The lab's Surface control remains a **modal-shell** property; the
preview + modal pass it explicitly.

Consequences (learned the hard way):

- The whole-rail/page chrome is token-based (`--ui-panel-bg`,
  `--ui-card-bg/border`, `--ui-accent-*`), never hardcoded light greys.
- Fixed-theme specimens (Button light/dark grids, dark Seg strips) must pass
  `theme="…"` to the kit controls AND live on a matching surface
  (`.pg-surface-light` / `.pg-surface-dark`). The light tab row needs
  `theme="light"` on its buttons.
- The header tabs pass `cloud={false}`: the demo is the app's plain dark bar,
  not a project-chrome accent bar.
- The `seg-light-toggle` spec follows the page accent (emerald by default) —
  a light-mode pressed mirror resolves `--ui-btn-active-bg` to the accent 200
  tint, not the scope-less blue-50.

## Input contrast (why the field rules look the way they do)

- `.ui-input` lives in Tailwind's `components` layer and its text colour is a
  zero-specificity fallback (`:where`), so a consumer's `text-…` utility
  always wins. Before this, a hardcoded dark toolbar field (`text-zinc-300`)
  got the page's near-black text painted over it — invisible typing.
- A field with an **explicit** theme paints its own surface
  (`.ui-number-box[data-theme]`, `[data-morph-search][data-theme] .ui-input`):
  `theme="light"` on a dark card used to mean light text on a dark surface
  (contrast 1.0). Self-contained controls need a self-contained fill.
- Placeholders use `--ui-text-muted` (readable), not `--ui-text-faint`.
- The playground's audit recipe (input text vs effective background per mode)
  is the way to re-check: open the page, switch the lab to light + zinc, then
  dark + emerald, and look for `< 3:1` fields.

## Surfaces → testids

- Buttons: `btn-<theme>-<variant>` (subtle / primary / outline / danger-ghost),
  `btn-<theme>-icon-expand` (the bare-icon face in the same grid); states card:
  pressed, icon-only, minimal, `tab` / `tab-header`; `icon-expand-buttons`
  (icon → label on hover), `icon-reveal-outline|primary` (bare icon → the
  variant's box on hover); **icon toggle** `toggle-icon-button` with
  `toggle-icon-edit` (+ `-status`), `toggle-cycle-button` (+ `-status`, 3+
  states) and the non-expandable labelled / `toggle-icon-only` pair.
- Dropdowns: `ctrl-menu-trigger` (controlled, the app's DayEventsModal
  pattern), light + blue/emerald palettes, `initial-trigger`, `long-trigger` /
  `capped-trigger`, `submenu-trigger`, `icon-dropdown` (+ `-status`, the
  icon-expand trigger), `itemmanager-trigger`,
  `menu-rows-trigger`; edge repro `right-edge-trigger`; multiple selection
  `multi-menu-trigger` / `multi-capped-trigger` / `multi-light-trigger` /
  `multi-menu-status` (the Checkbox ↔ Check icon Seg switches the indicator).
- Search: `search-menu-inline` / `-expandable` / `-browse-expanded` /
  `-flat-picker`, `deep-search-status`, `morph-search-field`,
  `morph-search-status`, `searchable-trigger`, `grouped-searchable-trigger`,
  `searchable-trigger-input`, morph anchor rows `morph-master-row` /
  `morph-dept-row` / `morph-add-row` (+ `morph-empty-toggle`, `morph-status`),
  `morph-action-role` / `morph-action-location` / `morph-action-plain`;
  multiple selection `multi-search-accordion` / `multi-search-browse` /
  `multi-search-status`; PickerField `picker-field-demo` / `picker-commits`,
  `picker-cast` (+ `-status`), `picker-props`, `picker-location`, `picker-roles`,
  `picker-inline`, `picker-wrap`, `picker-async` (+ `-status`), and the dropdown
  BUTTON face `picker-dropdown-button` / `picker-dropdown-custom` /
  `picker-dropdown-single` (+ `-status`); morph search faces
  `morph-search-icon` / `morph-search-swap` / `morph-search-reveal`
  (+ `morph-search-icon-status`).
- Glide data grid (`#glide`, experimental): `glide-crew-demo` (the crew card —
  `glide-crew-status` / `-commits` / `-undo` / `-include` / `-report-to` /
  `-precall` / `-add-role`; the Person cells are REAL PickerFields under
  `[data-glide-dom-layer]`), `glide-gallery-demo` (`glide-gallery-clicks` /
  `-last` / `-reset`), `glide-buttons-demo` (`glide-buttons-status`; the Search
  and Add columns are in-cell morph fields), `glide-notes`. The canvas is not
  queryable — specs drive the DOM cells only; painting is a manual check.
- Modals: `modal-open`, `stacked-open` → "Open Modal 2",
  `menu-modal-open` → `inmodal-menu-trigger` / `inmodal-long-trigger` /
  `inmodal-search-pick`, `kb-modal-open` (visualViewport readout),
  `rt-modal-open`, `card-open`.
- Dialogs: `dlg-confirm`, `dlg-danger` (+ `dnwa-reset`), `dlg-prompt`,
  `dlg-alert`, `dlg-over-host` → `dlg-in-host`, `dlg-spawn-open` →
  `dlg-spawn-child` / `dlg-nested-back|cancel|save`.
- Panels: `panel-trigger` / `panel` (clone-on-unmount; the trigger is in the
  fixed right-hand debug rail so its anchor maths are scroll-independent).
- Inputs: `text-input-demo` (md / proportional / sm / borderless / level with
  a Button / disabled), `number-input-demo` / `-light` / `-toolbar` /
  `-options`, `seg-track-dark|light|blue|emerald`, `seg-tablist`, `seg-chrome`,
  `seg-dense`, `seg-icons`, `seg-icon-collapse` (the tab face: labels collapse
  to icons and reveal on hover), `floating-toggle-demo`, `checklist-trailing`.
- Sizing audit: two views behind the `Measured` / `In a line` Seg —
  `sizing-demo` lists one row per common control, each printing its **live
  measured** height + radius (`data-size-row="<label>"` / `data-size-value`),
  with drift flagged red against the canonical 30px + 6px scale (Seg segments:
  4px, the nested-radius rule); `sizing-lineup` puts the same
  controls in real rows (toolbar / form / filter / dark strip) so baseline
  drift is visible the way it is in the app. Add new controls to BOTH views
  when you introduce one.
- Rich text: `rt-demo`, `rt-editor`, `rt-output`, `rt-print`,
  `rt-style-heading|clear|state`, `rt-insert`.
- Misc: `ctx-target` (+ fixed `ctx-right-edge`), `ctx-long-target` (30 rows —
  the keyboard reveal in a tall menu), `lp-target`, tooltips.
- The item manager demo holds 30 rows so its list overflows: the keyboard has
  to walk (and reveal) rows, not just the active one + the footer.
- Header tabs: `header-tabs-row` (LAST in DOM order — layout-sensitive specs
  assume the surfaces above it keep their positions),
  `header-tabs-collapse-toggle` / `header-tabs-iconmode-toggle`.

## Playground CSS gotchas (both REQUIRED for correct rendering)

- `playground.css` imports Tailwind v4 + `@source '../../src'` — without the
  `@source`, the kit's utilities are never generated (items lay out
  horizontally, modals render `position: static`).
- `.ui-menu { z-index: 10001 !important }` — kit menus portal to body at
  z-[200], UNDER a modal (z-10000); the app's index.css does the same.

## Specs

`playground/specs/*.spec.ts` is the kit's browser regression net (typecheck +
`scripts/check-test-hygiene.mjs` ratchets the count and `waitForTimeout` use;
new specs must be mapped in `scripts/smart-test.mjs`). Motion-specs opt back
into real animation with `test.use({ contextOptions: { reducedMotion:
'no-preference' } })`; the suite otherwise runs under reduced motion.
