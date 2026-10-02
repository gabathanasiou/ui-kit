# Testing — Agent Manual

Status: **read this before writing, changing, retiring, or debugging playground specs or unit tests.**
`playground/playwright.config.ts`, `vitest.config.ts` and `scripts/` are the harness; this file is the policy.
Ported (right-sized) from lemon_schedule's `docs/TESTING.md` — the app proves the model.

## Mental model

1. **Two layers, cheapest first.** Vitest unit tests (node/jsdom, ms) pin pure logic;
   the Playwright playground suite proves the kit behaves end-to-end in real browsers
   (Chrome desktop + WebKit iPad). If a bug can be reproduced without a browser, it
   belongs in a unit test — then keep ONE e2e case proving the surface is wired.
2. **The suite is the kit's regression net.** ~12 specs / ~66 tests, fully parallel,
   ~30s. Keep it fast and trustworthy: a slow/red suite stops being run.
3. **A red run is not proof of a regression.** Answer "was it me?" with
   `npm run test:baseline` — never by `git checkout`/`git stash` (destroys work).

## Test sizes & the pyramid

| Size | Here | Use it for | Cost |
|---|---|---|---|
| **Small / unit** | Vitest — `npm run test:unit`, `src/__tests__/*.test.ts`. Node env; DOM modules add `// @vitest-environment jsdom` (richText sanitizer) | Pure logic: token text conversion, overlay-origin math, rich-text sanitizer, coarse-scale math | ~ms |
| **Large / e2e** | Playground specs in `playground/specs/`, driven by role/testid selectors | One real browser: menus/dismissal dance, morphs, modals, rich text, touch drag | ~0.4–1.5s each; iPad ×1.5–2 |

**Rule of thumb:** push logic down (extract to `src/*.ts` so it is importable — that
extraction is the real work), keep one e2e case for the wiring, and **never assert the
same behaviour at both layers**. When you move a case down, retire the e2e case.

## When to add a test (rubric)

Add one when it changes a future decision — a reasonable change could break it silently:

1. **New observable behaviour / invariant** (dismissal interleave, positioning flip,
   storage byte-compatibility, touch drag) — one focused case.
2. **A bug fix** — a regression test that fails before and passes after.
3. **A hard-won edge case** (`javascript:` href unwrap, nbsp normalization, reduced
   motion skip, coarse-scale interpolation).

Do **not** add one when:

- **The user can confirm it by looking** (a colour, spacing, a label, a menu item,
  "the panel opens") — hand them a numbered manual check instead.
- It asserts implementation detail (internal state shape, CSS class) rather than
  observable behaviour.
- It duplicates an existing case (extend it).
- It can only "pass" by sleeping (`waitForTimeout`) — make it deterministic.

## Manual verification (the user has eyes)

When a change is visually verifiable, end the task with a short numbered check
(exact clicks + expected result). Automate only when a silent break is plausible:
data loss/corruption, a wrong computed value, persistence, cross-surface propagation,
or geometry that only fails at scale. The playground has a coarse-scale controller —
ask the user to slide it for iPad sizing checks.

## Selector strategy

Prefer, in order: `getByRole`/`getByLabel`/`getByPlaceholder` → `getByTestId`/data-*
→ documented kit class contracts (`.ui-item-highlighted` is a lit ROW, but the
searchable menu's search box also carries it — scope to `[role="menuitem"]`) →
**last resort** structural CSS. `scripts/check-test-hygiene.mjs` warns on
inline-style/utility-class/parent selectors.

## Harness facts

- **Default port 5184 is TEST-ONLY**; the human playground dev server lives on 5183
  (`npm run dev`). `PLAYWRIGHT_PORT=n` forces an isolated, owned server (no reuse).
- `fullyParallel: true`, **5 workers** (cores/2); raise deliberately with
  `PLAYWRIGHT_WORKERS=8`. Duration reporter prints `[timing] …` on the last line.
- `retries: 1` locally (2 on CI) + `trace: 'on-first-retry'` + screenshot on failure.
  The retry is the flake absorber; chronic flake gets `@quarantine` (excluded).
- **`reducedMotion: 'reduce'` globally** — the kit skips morphs, which removes the
  close-morph clone that intercepts clicks. Specs ABOUT motion opt back in with
  `test.use({ contextOptions: { reducedMotion: 'no-preference' } })`
  (`overlay-morph.spec.ts`, the close-morph interleave). Never assert animation
  timing under reduced motion.
- **Both projects run every spec**: `desktop` (Chrome) + `ipad` (WebKit, hasTouch).
  Engine-incompatible cases skip on the iPad project with a reason
  (`mouse.wheel is not supported in mobile WebKit`, coarse-size metrics).
- **StrictMode**: the playground runs `<StrictMode>` on the DEV server, so dev-only
  bugs (the phantom clone on reopen) reproduce. That is why the suite does NOT run a
  production build.
- Unit tests: `src/__tests__/*.test.ts`, node env by default.

## Rules (MUST NOT)

1. **Web-first assertions.** `expect`/`expect.poll`/`waitForFunction` — only true
   animation/interaction pacing may `waitForTimeout`, with a comment. The ratchet in
   `scripts/check-test-hygiene.mjs` enforces the count (currently 9).
2. **Specs must be reachable from `scripts/smart-test.mjs` RULES** — an unmapped spec
   is an orphan and `npm run lint` fails.
3. **Never `git checkout`/`git stash` to test a baseline** — use `npm run test:baseline`
   (throwaway HEAD worktree, isolated port).
4. **Retire dead specs.** A spec for removed behaviour is deleted (git preserves it).
5. **Quarantine, don't tolerate, chronic flake** (tag `@quarantine` + registry below).
6. **Never grow the suite past its caps** (12 specs / 70 tests) without a conscious
   decision recorded in `scripts/check-test-hygiene.mjs`.

## Flake policy

- **Transient** (passes on retry): leave it — the retry + trace handle it.
- **Chronic** (fails repeated runs, unrelated to your diff):
  1. tag the test(s) `@quarantine` (excluded from the default suite immediately);
  2. record it below (spec · test · why · date · owner);
  3. file/fix or delete it.

### Quarantine registry

| Spec · test | Why | Since |
|---|---|---|
| _(none)_ | | |

## "Was it me?" workflow (red run)

1. **Did smart-test select it?** `npm run test:smart -- --list` — if not, your change
   can't reach it (pre-existing/flaky).
2. Re-run just that spec (`npx playwright test -c playground/playwright.config.ts
   playground/specs/<spec>.spec.ts`). The retry often clears it.
3. Baseline without touching your tree:
   `npm run test:baseline -- playground/specs/<spec>.spec.ts`.
4. Read the trace from the first retry (`test-results/**/trace.zip`).
5. Only if it's genuinely yours: fix it; if flaky, quarantine it in the same change.

## Commands

- `npm run test:unit` — Vitest (watch: `test:unit:watch`).
- `npm run test:playground` — full Playwright suite (both projects).
- `npm run test:smart` — only specs your diff can touch + canaries + last failures
  (`--list` to preview, `--full` to force everything).
- `npm run test:baseline -- <spec>` — clean HEAD worktree, isolated port.
- `npm run lint` — typecheck + `scripts/check-test-hygiene.mjs` (ratchets, orphan
  specs, caps, doc budget).
