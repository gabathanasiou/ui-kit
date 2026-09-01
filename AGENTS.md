# Agent Context — @gabriel/ui-kit

This repo is the design + perfecting ground for the shared interaction
primitives consumed by **lemon_schedule** (and any future app). The kit ships
a committed `dist/`; consumers pin a github tag (`github:gabathanasiou/ui-kit#v0.1.x`).

## Commands

- `npm run dev` — playground dev server on ALL interfaces (port 5183; reachable
  from the iPad at `http://<mac-ip>:5183`). `npm run playground` = localhost only.
- `npm run test:playground` — Playwright specs against the playground
  (`playground/specs/`; config `playground/playwright.config.ts`, desktop-chromium
  + webkit-iPad projects, dev server auto-started via webServer). Run one project:
  `npx playwright test -c playground/playwright.config.ts --project=desktop`.
- `npx tsc -p tsconfig.build.json --noEmit` — typecheck before done.
- `npm run build` — lib build (vite es/cjs + tsc types + css copy). Run before
  committing a version bump.

## Core Rules (read first — these override convenience)

1. **Think shared primitives first.** This IS the shared-primitives repo. When a
   surface needs behavior the kit already ships, reuse the kit component. When
   you find yourself writing the second copy of anything (helper, class string,
   morph, dismissal dance), extract it into `src/` and import it in both places.
2. **No monoliths.** Split files when they grow (~700+ lines): extract focused
   modules, keep a barrel so existing imports keep working.
3. **Narrow scope, no speculative abstractions.** Smallest change that satisfies
   the ask. Every new abstraction must map to a stated requirement — remove it if
   it doesn't. Prefer adapting an existing pipeline over creating a parallel one.
4. **One source of truth per concern.** The morph/menu/modal logic in `src/` is
   canonical — the playground, specs and lemon_schedule consume it, never re-derive it.
5. **Complexity reset.** When a second special case would extend the same
   abstraction, stop, re-read the requirement, redesign narrower instead of patching.
6. **Small focused commits**, imperative mood, one revertible unit each.
7. **Verify before done.** Every change runs the typecheck above. Behavior /
   regression changes run `npm run test:playground` (full suite before done/commit;
   never claim done on a failing suite). Visual-only changes (class strings,
   colors, padding) skip the suite: typecheck + a manual playground check is enough.

## Explaining to the User (plain language)

- Talk about surfaces in real terms: "the Danger confirm + DNWA dialog", "the
  keyboard-test modal", "the stuck-menu reopen" — not file names or option types.
- Ground it in behavior: "first tap on the backdrop dismisses the keyboard, the
  second tap closes the modal."

## Stack & peer deps

- React 19 + Vite + Tailwind v4. Consumers provide Tailwind; the kit ships
  utility classes (playground.css needs `@source '../../src'` to generate them).
- **Radix lockstep**: `@radix-ui/react-dialog` and `@radix-ui/react-dropdown-menu`
  must move together — a partial bump forks the shared `react-dismissable-layer`
  and breaks menus inside modals (iPad: touch outside-dismissal defers to the
  click and can leave a dialog locked at `pointer-events:none`). Never bump one
  without the other.

## Hover & Tap feedback

- **Hover styles are UNGATED by design** (tokens.css `@custom-variant hover`) —
  iOS Safari's tap-to-hover needs a real `:hover` rule on the tapped element;
  `(hover: hover)` is false on iPadOS, so gating kills the native behavior.
- Pen = finger = touch: `isTouchLike()` in `src/device.ts`. Safari doesn't
  synthesize clicks for pen taps on overlays (`device.ts` shim) and never fires
  `:active` for pen.
- iOS sticky hover (tap → `:hover` sticks until the next tap) IS the tap
  feedback — no JS flash/pulse workarounds; they double with it and read as delays.

## The Playground (debug everything here, not in the app)

`playground/src/main.tsx` is the component zoo — every surface, with testids.
Runs under `<StrictMode>` (dev-only bugs reproduce — see the morph section).

Surfaces (section → testids):
- Buttons: every variant × theme (`btn-*`).
- DropdownMenus: controlled (`ctrl-menu-trigger`, the app's exact
  DayEventsModal pattern), uncontrolled, light theme, submenu, ItemManager.
- Modals: basic (`modal-open`), stacked (`stacked-open` → "Open Modal 2"),
  menu-inside-modal (`menu-modal-open` → `inmodal-menu-trigger`),
  keyboard-test (`kb-modal-open` — modal with input/textarea + a live
  `visualViewport` readout, for iPad keyboard behavior).
- Dialogs: confirm (`dlg-confirm`), danger+DNWA (`dlg-danger` → `dnwa-reset`
  clears the 24h suppression), prompt, alert, over-host (`dlg-over-host`).
- `useOverlayMorph` clone panels (`panel-trigger` / `panel` — the app's
  DropdownPanel pattern with `cloneOnUnmount`).
- Inputs, tooltips, context menu.

Playground CSS gotchas (both REQUIRED for correct rendering — the kit ships
Tailwind classes the consumer provides):
- `playground.css` imports Tailwind v4 + `@source '../../src'` — without the
  `@source`, the kit's utilities are never generated (items lay out
  horizontally, modals render `position: static`).
- `.ui-menu { z-index: 10001 !important }` — kit menus portal to body at
  z-[200], UNDER a modal (z-10000); the app's index.css does the same.

## Specs (what they guard)

- `specs/dropdown-menu.spec.ts` — trigger-click dismiss closes cleanly +
  reopens (the stuck-menu regression); click-away; reopen during the close
  morph; the trigger keeps its hover look while open.
- `specs/overlay-morph.spec.ts` — reopening a clone panel never spawns a
  phantom `[data-morph-clone]` (StrictMode regression); the close clone pins
  the panel's rect (never 0,0); open/close morphs animate.
- `specs/modal-portal.spec.ts` — menu inside a modal: visible above it,
  Escape dismisses ONLY the menu; stacked modals close top-first; the LOWER
  stacked modal is `aria-hidden` (Radix) so `getByRole('dialog')` counts 1 —
  use `locator('[role="dialog"]')` for DOM counts.

## The overlay morph (motion language — read before touching)

`src/overlayMorph.ts` — `useOverlayMorph` + open/close/clone helpers, the
modal FLIP zoom shared by menus/panels/modals:
- **Open** (`playOverlayOpen`): snap to `scale(0.94)`/opacity 0, double-rAF,
  transition to identity; completion restores the styles it SAVED at start.
- **Close on the live node** (`playOverlayClose`): sets pe:none + 0.94/0,
  completion hides + calls onClosed — completion is TOKEN-guarded, so a
  concurrent open/close cancels it (that's the "stuck menu" mechanism: the
  reopen's open-morph completion restores the close-morph's leftover styles).
- **Unmount-driven close** (`cloneOverlayClose`): the panel unmounts to close
  (app DropdownPanel pattern) — the controller pins a CLONE at the panel's
  last rect and zooms it out. The clone is the close animation, NOT a bug.
- **Token**: every play increments `token.current`; stale rAF/timeouts bail.
  Rapid open/close interleaves are the #1 source of morph bugs.
- **StrictMode**: React dev double-mounts every mount (ref node→null→node).
  The ref-null is DEFERRED one microtask and skipped when the element
  re-attached — never "fix" the phantom clone by removing the deferral.
- `prefers-reduced-motion` + `morph={false}` skip all of it.

## DropdownMenu internals (the dismiss-click dance)

`src/DropdownMenu.tsx` — Radix Root with `open || persisted` (the content
stays mounted while the close morph plays; `onClosed` drops persisted):
- A trigger click that dismisses = pointerdown (Radix outside-dismiss fires
  `onOpenChange(false)` — the trigger counts as "outside" the content) + the
  same click's click-phase (Radix toggle, swallowed by the guard) + the kit's
  `triggerOnClick` (reopens during the close morph — for the reopen-during-
  close feature). The kit tracks `closeFromTriggerPointerDownRef` so the
  DISMISSING click doesn't also reopen. Keep that flag logic intact.
- The trigger gets `data-state="open"` from Radix; the kit `Button` keeps its
  hover look while open (the `open` variant classes, `!`-important so they
  beat the base background).

## Modal internals

`src/Modal.tsx` — Radix Dialog + stack morph. Gotchas:
- The init position pin computes the VIEWPORT CENTER from `(vw - w)/2`,
  `(vh - h)/2` — never from the element's measured rect (measured mid-morph
  it reads the transformed off-center box and the modal sticks there).
- Stacked children skip self-zoom (the survivor's morph-back is the close);
  unmount closes clone the content box (stripped of `data-modal-stack`/role).
- Lower stacked dialogs get `aria-hidden` (Radix) + CSS-faded — only the top
  dialog is in the a11y tree.
- **Dialogs close by `open` flip, not unmount**: DialogProvider keeps `<Modal
  open>` mounted, so the open→closed transition clones + morphs (the same clone
  as unmount closes) — alerts fade like standalone modals. Never remove that
  open-flip clone. **Alerts are `closable={false}`** — no X, no Escape, no
  backdrop dismiss; only OK closes (alerts need attention).
- **iPad keyboard**: detection is dual — the keyboard either shrinks the VISUAL
  viewport (`visualViewport.height << innerHeight`) or the LAYOUT viewport
  (innerHeight drops while innerWidth stays). A settle timer keeps the flag
  latched through the dismissal so the ResizeObserver never re-centres (that was
  the "pushed down after the keyboard closes" bug). Touch devices (`IS_COARSE`)
  skip the JS positioning entirely and stay CSS-centred; a backdrop tap with the
  keyboard up blurs the input first, the next tap closes.

## Release flow (bring kit fixes to the app)

1. Fix in `src/`, verify in the playground (manual + `npm run test:playground`).
2. `npm run build`, bump `package.json` version, commit, tag `v0.1.x`, push.
3. In lemon_schedule: bump `"@gabriel/ui-kit": "github:gabathanasiou/ui-kit#v0.1.x"`,
   `npm install`, clear `node_modules/.vite-*` if Vite errors, run the app e2e.

## Doc budget

`AGENTS.md` stays ≤ ~200 lines — it is loaded every session. When a section is
added, compact it or move detail to `docs/*.md`.
