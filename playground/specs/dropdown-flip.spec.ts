import { test, expect } from '@playwright/test';

/* The one positioning engine (useDropdownPosition): a menu near the bottom of
   the visible area must FLIP above the trigger and stay fully inside the
   viewport — no more short scroll window pinned under the trigger, no
   off-screen overhang from an !important height cap. */

test('long menu flips above a trigger near the viewport bottom', async ({ page }) => {
  await page.setViewportSize({ width: 1000, height: 500 });
  await page.goto('/');

  const trigger = page.getByTestId('long-trigger');
  await trigger.scrollIntoViewIfNeeded();
  await trigger.evaluate(el => {
    const r = el.getBoundingClientRect();
    window.scrollBy(0, r.bottom - (window.innerHeight - 60));
  });
  await trigger.click();

  const menu = page.locator('[role="menu"]').last();
  await expect(menu).toBeVisible();

  const vh = 500;
  const tb = await trigger.boundingBox();
  const mb = await menu.boundingBox();
  // flipped ABOVE the trigger…
  expect(mb!.y + mb!.height).toBeLessThanOrEqual(tb!.y + 1);
  // …and fully inside the viewport, top and bottom.
  expect(mb!.y).toBeGreaterThanOrEqual(0);
  expect(mb!.y + mb!.height).toBeLessThanOrEqual(vh);
  // the list scrolls inside instead of running off-screen
  expect(await menu.evaluate(el => el.scrollHeight)).toBeGreaterThan(await menu.evaluate(el => el.clientHeight));
});

test('short menu opens above when only a sliver of room is below', async ({ page }) => {
  await page.setViewportSize({ width: 1000, height: 420 });
  await page.goto('/');

  const trigger = page.getByTestId('ctrl-menu-trigger');
  await trigger.scrollIntoViewIfNeeded();
  await trigger.evaluate(el => {
    const r = el.getBoundingClientRect();
    window.scrollBy(0, r.bottom - (window.innerHeight - 40));
  });
  await trigger.click();

  const menu = page.locator('[role="menu"]').first();
  await expect(menu).toBeVisible();

  const tb = await trigger.boundingBox();
  const mb = await menu.boundingBox();
  expect(mb!.y + mb!.height).toBeLessThanOrEqual(tb!.y + 1);
  expect(mb!.y).toBeGreaterThanOrEqual(0);
  expect(mb!.y + mb!.height).toBeLessThanOrEqual(420);
});

test('maxMenuHeight caps a long menu and lets it flip without overhang', async ({ page }) => {
  await page.setViewportSize({ width: 1000, height: 500 });
  await page.goto('/');

  // The capped menu (160px ceiling) must respect the cap, flip above the
  // bottom-edge trigger and stay fully inside the viewport.
  const trigger = page.getByTestId('capped-trigger');
  await trigger.scrollIntoViewIfNeeded();
  await trigger.evaluate(el => {
    const r = el.getBoundingClientRect();
    window.scrollBy(0, r.bottom - (window.innerHeight - 60));
  });
  await trigger.click();
  const menu = page.locator('[role="menu"]').last();
  await expect(menu).toBeVisible();
  const tb = await trigger.boundingBox();
  const mb = await menu.boundingBox();
  expect(mb!.height).toBeLessThanOrEqual(160);
  expect(mb!.y + mb!.height).toBeLessThanOrEqual(tb!.y + 1);
  expect(mb!.y).toBeGreaterThanOrEqual(0);
  expect(mb!.y + mb!.height).toBeLessThanOrEqual(500);
});
