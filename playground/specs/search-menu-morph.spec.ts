import { test, expect, Page } from '@playwright/test';

/* SearchMenu morph anchor (kit playground, roadmap 318).
   The panel must open at its FINAL position — the trigger's button→field
   width animation must not drag it. `style.left` is the positioned anchor
   coordinate (the bounding box also includes the overlay scale). */

const panel = (page: Page) => page.locator('#search-menu-panel');

async function measure(page: Page, rowTestId: string, expandedWidth: number) {
  const row = page.getByTestId(rowTestId);
  const trigger = row.locator('[data-search-trigger]').first();
  const root = row.locator('[data-search-menu]').first();
  const t0 = Date.now();
  await trigger.click();
  await panel(page).waitFor({ state: 'visible', timeout: 3000 });
  const openMs = Date.now() - t0;
  const initial = await panel(page).evaluate(el => el.style.left);
  const transition = await root.evaluate(el => {
    const cs = getComputedStyle(el);
    return `${cs.transitionProperty} ${cs.transitionDuration}`;
  });
  // Wait for the width morph to reach its target without a fixed sleep.
  await expect.poll(
    async () => Math.round(await root.evaluate(el => el.getBoundingClientRect().width)),
    { timeout: 2000 },
  ).toBe(expandedWidth);
  const settled = await panel(page).evaluate(el => el.style.left);
  await page.keyboard.press('Escape');
  await expect(panel(page)).toHaveCount(0, { timeout: 3000 });
  return { openMs, initial, settled, transition };
}

test.describe('SearchMenu morph anchor', () => {
  // The morph is the subject — keep it enabled.
  test.use({ contextOptions: { reducedMotion: 'no-preference' } });

  for (const [label, row, width] of [
    ['master report-to (right-aligned)', 'morph-master-row', 280],
    ['per-department report-to', 'morph-dept-row', 240],
    ['add location (justify-between empty row)', 'morph-add-row', 280],
  ] as const) {
    test(`${label}: opens fast at its final left edge`, async ({ page }) => {
      await page.goto('/');
      const { openMs, initial, settled, transition } = await measure(page, row, width);
      // Not a perf budget (the playground server runs in parallel): a hang
      // guard only. The contract is that the panel does not wait for the
      // 220ms width morph; manual timing is ~20-90ms.
      expect(openMs, 'panel opens without waiting for the width morph').toBeLessThan(1000);
      // The button→field width morph is still there (the panel does not wait
      // for it, but the trigger must animate).
      expect(transition).toContain('width');
      expect(transition).toContain('0.22s');
      const first = Number.parseFloat(initial);
      const final = Number.parseFloat(settled);
      expect(Number.isFinite(first) && Number.isFinite(final)).toBe(true);
      expect(Math.abs(first - final), `panel left jumped ${first} → ${final}`).toBeLessThan(1.5);
    });
  }

  test('the same rows stay anchored with records instead of an empty state', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('morph-empty-toggle').click();
    await expect(page.getByTestId('morph-status')).toContainText('3 records');
    for (const [row, width] of [['morph-master-row', 280], ['morph-dept-row', 240], ['morph-add-row', 280]] as const) {
      const { initial, settled } = await measure(page, row, width);
      expect(Math.abs(Number.parseFloat(initial) - Number.parseFloat(settled))).toBeLessThan(1.5);
    }
  });
});
