import { defineConfig } from '@playwright/test';

/* Playground specs — run against the playground dev server (kit SOURCE, no
   build needed). The dev server runs StrictMode (main.tsx wraps in
   <StrictMode>), so dev-only bugs (the phantom clone on reopen) reproduce
   here too. */
export default defineConfig({
  testDir: './specs',
  timeout: 30_000,
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:5183',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npx vite . --config ./vite.config.ts',
    url: 'http://localhost:5183',
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
