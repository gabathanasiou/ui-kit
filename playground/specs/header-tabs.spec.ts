import { test, expect, type Locator, type Page } from '@playwright/test';

/* Header tabs (roadmap 258): icon-first collapse + the sliding selection pill
   (useSlidingPill) + the iconWithLabel pairing. The label must stay in the
   accessibility tree while collapsed — the app's specs click header tabs by
   name — the resting inactive tab is icon-only, and the white pill glides to
   the clicked tab with the Seg timing. */

const row = (page: Page) => page.getByTestId('header-tabs-row');
const labelW = async (btn: Locator) => (await btn.locator('[data-kit-label]').boundingBox())!.width;
const iconW = async (btn: Locator) => (await btn.locator('[data-kit-icon]').boundingBox())!.width;

test('selected pill glides to the clicked tab (x + width)', async ({ page }) => {
  await page.goto('/');
  const r = row(page);
  const pill = r.locator('span[aria-hidden]');
  const schedule = r.getByRole('button', { name: 'Schedule' });
  const calendar = r.getByRole('button', { name: 'Calendar' });

  const agrees = async (target: Locator) => {
    await expect.poll(async () => {
      const p = (await pill.boundingBox())!;
      const b = (await target.boundingBox())!;
      return Math.round(Math.abs(p.x - b.x));
    }).toBeLessThan(2);
    const p = (await pill.boundingBox())!;
    const b = (await target.boundingBox())!;
    expect(Math.abs(p.width - b.width)).toBeLessThan(2);
  };

  await agrees(schedule);
  await calendar.click();
  await agrees(calendar);

  await expect(calendar).toHaveClass(/text-zinc-900/);
  await expect(schedule).not.toHaveClass(/text-zinc-900/);
});

test('collapsed tab: name resolves while clipped; hover reveals label, swaps icon', async ({ page }) => {
  test.skip(test.info().project.name === 'ipad', 'no hover on touch — the tap activates the tab instead');
  await page.goto('/');
  const r = row(page);
  /* Resolves by accessible name while the label is clipped to zero width. */
  const design = r.getByRole('button', { name: 'Design' });
  expect(await labelW(design)).toBeLessThan(1);
  expect(await iconW(design)).toBeGreaterThan(6);

  await design.hover();
  await expect.poll(async () => labelW(design)).toBeGreaterThan(20);
  await expect.poll(async () => iconW(design)).toBeLessThan(1);
});

test('resting modes: the active tab is label-only, inactive tabs are icon-only', async ({ page }) => {
  await page.goto('/');
  const r = row(page);
  const schedule = r.getByRole('button', { name: 'Schedule' });
  const rules = r.getByRole('button', { name: 'Rules' });

  expect(await labelW(schedule)).toBeGreaterThan(20);
  expect(await iconW(schedule)).toBeLessThan(1);
  expect(await labelW(rules)).toBeLessThan(1);
  expect(await iconW(rules)).toBeGreaterThan(6);
});

test('together mode (toggle): the icon returns beside the active label', async ({ page }) => {
  await page.goto('/');
  const r = row(page);
  const schedule = r.getByRole('button', { name: 'Schedule' });
  const rules = r.getByRole('button', { name: 'Rules' });

  await page.getByTestId('header-tabs-iconmode-toggle').click();
  await expect.poll(async () => iconW(schedule)).toBeGreaterThan(6);
  expect(await labelW(schedule)).toBeGreaterThan(20);
  /* Resting tabs stay collapsed in together mode. */
  expect(await labelW(rules)).toBeLessThan(1);
});
