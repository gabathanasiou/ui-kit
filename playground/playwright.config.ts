import { defineConfig, devices } from '@playwright/test';
import { availableParallelism } from 'node:os';

/* Playground specs — the kit's regression net. Run against the playground
   DEV server (kit SOURCE, no build): it imports src/ directly and runs under
   StrictMode (main.tsx wraps in <StrictMode>), so dev-only regressions (the
   phantom clone on reopen) reproduce here too.

   Default port 5184 is TEST-ONLY — the human playground dev server lives on
   5183 (`npm run dev`, iPad-reachable), so a run never silently reuses it
   (stale-code bugs). Set PLAYWRIGHT_PORT to force an isolated, OWNED server
   (no reuse) for a hermetic run. */

const PORT = Number(process.env.PLAYWRIGHT_PORT) || 5184;
const isolated = process.env.PLAYWRIGHT_PORT !== undefined;

export default defineConfig({
  testDir: './specs',
  timeout: 30_000,
  // Distribute tests WITHIN a file across workers too — specs are independent
  // (fresh context per test, each starts at page.goto('/')). Better load
  // balancing = shorter wall time at the same worker/CPU count.
  fullyParallel: true,
  // Retry once locally (twice on CI) so a transient flake doesn't read as a
  // regression. The first retry records a trace (`use.trace`) for the flaky
  // test. Chronic flakers are tagged `@quarantine` (excluded below) rather
  // than retried forever — see AGENTS.md.
  retries: process.env.CI ? 2 : 1,
  use: {
    baseURL: `http://localhost:${PORT}`,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    // The overlay morph (src/overlayMorph.ts) self-disables under
    // prefers-reduced-motion. Tests aren't about animation — motion OFF
    // removes the 220ms close-morph clone that intercepted clicks on menu
    // items and made interaction specs flaky ("element is not stable"/
    // "detached"). The specs ABOUT the morph (overlay-morph.spec.ts and the
    // in-flight close-morph case in dropdown-menu.spec.ts) opt back in with
    // `test.use({ contextOptions: { reducedMotion: 'no-preference' } })`.
    contextOptions: { reducedMotion: 'reduce' },
  },
  // Parallelism — each worker is a full browser, so N workers pins ~N cores
  // for the whole run. 5 (Playwright's cores/2 on a 10-core Mac) is the proven
  // baseline: roughly half the cores, no fan spin. Raise deliberately:
  // `PLAYWRIGHT_WORKERS=8 npx playwright test`. The duration reporter prints
  // the total at the end.
  workers: process.env.PLAYWRIGHT_WORKERS
    ? Number(process.env.PLAYWRIGHT_WORKERS)
    : Math.min(5, availableParallelism()),
  reporter: [['list'], ['./pw-duration-reporter.mjs']],
  webServer: {
    command: `npx vite . --config ./vite.config.ts --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !isolated,
    timeout: 30_000,
  },
  // `@quarantine` = known-flaky, tracked in AGENTS.md; excluded from the
  // default suite. Run explicitly: npx playwright test --grep @quarantine
  grepInvert: /@quarantine/,
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'ipad',
      use: {
        ...devices['iPad Pro 11'],
        browserName: 'webkit',
        hasTouch: true,
      },
    },
  ],
});
