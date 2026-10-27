# @gabriel/ui-kit

Shared interaction primitives for Gabriel's apps — extracted from the **lemon_schedule** app (iOS-touch-hardened, battle-tested).

**What's inside**
- `device.ts` — pointer/hover capability model: `IS_COARSE`, `IS_TOUCH_CAPABLE`, `isTouchLike()` (Apple Pencil = finger), last-pointer tracking, hardware-keyboard detection, the pencil click shim for Safari overlays
- `useTouchMode()` — touch-first UI variant switching
- `DropdownMenu` / `DropdownItem` / `DropdownSubmenu` — Radix-wired menus with `onTouchStart` claim trick, tap-vs-drag disambiguation, one `getDropdownClasses()` design-system function, grouped rows (`group` headers + category-matching search), plus `ItemManagerDropdown` (list with rename/duplicate/delete)
- `ContextMenu` + `LongPressMenuProvider` — long-press ring → synthetic `contextmenu` (touch's right-click), shared with desktop right-click. Opt in with `data-context-menu` on any element; opt out a subtree with `useLongPressOptOut()`
- `Dialog` — `confirm() / prompt() / alert()` provider (Enter/Esc/click-outside, "don't ask again")
- `Modal` + `ModalFooter` — draggable dialog with stacked morph (child grows from the modal beneath it, survivor shrinks back), standalone zoom in/out, and animated content-driven size changes; Enter confirms the footer primary action when nothing interactive is focused; `morph={false}` opts out per-instance
- `useSmartPosition` / `useFixedPosition` — visualViewport-aware popup positioning (stays above the iOS keyboard)
- `popout` — `PopoutWindowContext` + portal/document/window helpers

## Install

```
npm install github:gabathanasiou/ui-kit#v0.1.0
```

Peer dependencies (install in your app): `react`, `react-dom`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `lucide-react`.

## Setup (3 steps)

1. **Import the CSS** once, at your app root:
   ```css
   @import "@gabriel/ui-kit/ui-kit.css";
   ```
2. **Tailwind:** the components use Tailwind utilities for layout/sizing. If you use Tailwind v4, point its content detection at the kit (add to your CSS):
   ```css
   @import "tailwindcss";
   @source "../../node_modules/@gabriel/ui-kit/dist";
   ```
   (No Tailwind → no problem: you just need your own equivalents of `flex`, `p-1`, `w-80`, etc.)
3. **Hover gating (iOS rule):** define the `hover` variant gate exactly like this so `hover:*` utilities don't kill iPadOS:
   ```css
   @custom-variant hover {
     @media (any-hover: hover) {
       &:hover { @slot; }
     }
   }
   ```

## Theming

Two axes plus a surface flag (roadmap 302):

- **Mode** — `light | dark` neutral surfaces, text and borders. `dark` is the
  kit default; light toolbars opt in per component (the historical default).
- **Accent** — `zinc | blue | emerald` project identity. It drives selection,
  hover, checked states, the accent scale, and the colored chrome presets.
  `zinc` is neutral (no blue).
- **Surface** — `neutral | accent`. `accent` opts a container (a Drive/shared
  modal) into the tinted ladder: `accent-950` header (the app-header colour),
  neutral body, `accent-100` wells/footer. Outlines stay neutral.

Wrap a surface in `ThemeScope` and every token-driven primitive inside follows;
prop-driven primitives use the scope as their default. An explicit prop always
wins, and no scope keeps today's behavior.

```tsx
<ThemeScope mode="light" accent="emerald" surface="accent">
  <Modal open={open} onClose={close} title="Day 4" surface="accent" accent="emerald">
    <Button variant="primary">Save</Button>
  </Modal>
</ThemeScope>
```

Menus follow the **context**: opened from a coloured header/toolbar
(`context="chrome"`) they are fully themed; opened inside a modal/panel
(`context="surface"`) they stay light/dark with only the accent on
selected/hover/checked rows. An explicit `theme="…"` still forces a preset.

`Modal` takes `theme` (mode), `accent` and `surface="neutral | accent"`.
`color-scheme` follows the mode. The legacy `[data-theme="…"]` presets remain
for `DropdownMenu` / `ContextMenu` / `Dialog`; `data-mode` and `data-theme`
compose, so a dark menu inside a light modal stays dark.

Every color is a `--ui-*` variable. Override any of them in your own CSS to
re-skin a scope:

```css
:root {
  --ui-menu-bg: #fff8f2;
  --ui-menu-border: #f0e6db;
  --ui-text: #3d3a3a;
  --ui-item-hover-bg: #ffe4de;
  --ui-danger-solid: #e5484d;
  /* ...see src/styles/tokens.css for the full list */
}
```

Full model, token roles, coverage and the migration checklist:
[`docs/THEMING.md`](docs/THEMING.md). Adopting it in an app (modals, menus,
portals, the normal-vs-coloured distinction): [`docs/ADOPTING-THEMING.md`](docs/ADOPTING-THEMING.md).
Try it live in the playground's **Theme lab** section (mode / accent / surface +
a fully themed dummy modal and both menu contexts).

## Long-press example

```tsx
<LongPressMenuProvider>
  <MessageBubble data-context-menu onContextMenu={openMenu} />
  <ContextMenu open={open} x={x} y={y} onClose={close}>
    <ContextMenuItem onClick={copy}>Copy</ContextMenuItem>
    <ContextMenuItem variant="danger" onClick={report}>Report</ContextMenuItem>
  </ContextMenu>
</LongPressMenuProvider>
```

Desktop right-click and touch long-press both fire `onContextMenu` — one handler, both inputs.

## Icon-first tabs (collapse + sliding selection)

Top tabs can rest as icons and reveal their label on hover / keyboard focus
(roadmap 258) — the app header's space saver. Pair the kit `Button` with
`useSlidingPill`:

```tsx
/* Row: relative container; buttons sit above (`relative z-10`). */
const pill = useSlidingPill(rowRef, tabRefs, activeIndex);

<div ref={rowRef} className="relative inline-flex items-center gap-1">
  {pill.style && (
    <span aria-hidden style={pill.style}
      className={`absolute top-0 bottom-0 rounded bg-white pointer-events-none ${pill.motionClass}`} />
  )}
  {/* Variant carries only the active TEXT color — the pill is the fill. */}
  <Button variant="tab-header" active={active === id} collapse icon={<CalendarDays size={14} />}
    ref={el => { tabRefs.current[i] = el; }} onClick={() => setActive(id)}>Calendar</Button>
</div>
```

- `collapse` (needs `icon`): the label clips to zero width and animates back
  (0fr ↔ 1fr grid column, ~150-200ms; skipped under `prefers-reduced-motion`).
  **The label stays in the DOM while collapsed** — accessible name, role/name
  queries and screen readers keep working.
- `iconWithLabel={false}` swaps the pair: the icon shows only while the label
  is hidden (resting), the label replaces it whenever it shows (active /
  hover / focus / open). `true` (default) keeps them together.
- `TabFace` (`src/TabFace.tsx`) is the exported face — the collapsing icon ↔
  label mechanics behind `Button`'s tab variants, ready for `Seg` options or
  any custom tab shell: render it inside the hover owner (which carries the
  `group` class and `gap: 0` while collapsing).
- `useSlidingPill` measures the active item (`offsetLeft`/`offsetWidth`) and
  glides the pill (~200ms). While the container reflows (a label expanding,
  a hover shift) the pill *chases* the live geometry instead of lagging.
- `Seg` uses the same hook — one pill mechanism, two surfaces.

## Release flow

1. `npm run build` (vite + tsc + css copy)
2. Bump `version` in `package.json`
3. Commit + tag: `git tag v0.1.0 && git push --tags`
4. In consuming apps: bump the pinned ref in `package.json` (`github:gabathanasiou/ui-kit#v0.2.0`) and `npm install`

Semver: patch/minor = safe to bump; major = breaking changes, migrate apps deliberately.

> **Consumer gotcha — stale Vite optimized deps:** right after a kit bump, a
> consuming app's dev server may throw `SyntaxError: Indirectly exported
> binding name 'X' is not found` — Vite is serving its OLD pre-bundled dep
> cache. Clear it and restart the dev server: `rm -rf node_modules/.vite-*`.
> The kit ships a committed `dist/` in the repo, so the blocked `prepare`
> script (npm `allow-scripts`) is fine — `npm install` fetches the built dist
> directly.

## Playground & debugging

`npm run playground` serves the component zoo at `:5183` (kit SOURCE, HMR, no
build) — grouped sections with a section rail, every button, dropdown, modal
and morph surface with testids, for reproducing bugs without the app. The
Theme lab at the top recolours the whole page (mode × accent). `npm run
test:playground` runs the Playwright debug specs (dropdown dismiss, morph
clones, modal portals). See `AGENTS.md` for the full debugging guide (morph
internals, known gotchas, release flow).
