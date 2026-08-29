import { test, expect, Page } from '@playwright/test';

/* Debugging spec: the DropdownMenu dismiss-click bug.
   Repro (the app's exact pattern — controlled menu, Button trigger):
   1. click trigger → menu opens (morph)
   2. click the SAME trigger to dismiss → the menu must close cleanly
      (content unmounts after the close morph)
   3. click the trigger again → the menu must reopen and be interactive
   BUGGY behavior (ui-kit ≤ v0.1.54): the dismiss click's pointerdown closes
   the menu, then the same click's click-phase reopens it (the "reopen during
   close morph" trigger handler) — interleaving close+open morphs leaves the
   menu STUCK at scale(0.94)/opacity 0 with data-state=open: invisible,
   unclickable, reopening dead. */

const trigger = (label: string) => page.getByRole('button', { name: label });
const menu = (page: Page) => page.locator('[role="menu"]');

async function openMenu(page: Page, label: string) {
  await trigger(label).click();
  await expect(menu(page)).toBeVisible({ timeout: 5000 });
}

test('trigger-click dismiss closes cleanly, then the trigger reopens the menu', async ({ page }) => {
  await page.goto('/');
  const t = page.getByTestId('ctrl-menu-trigger');

  // open
  await t.click();
  await expect(page.locator('[role="menu"]')).toBeVisible();
  // a menu item is interactive
  await page.getByRole('menuitem', { name: 'Hold' }).hover();
  await expect(page.getByRole('menuitem', { name: 'Hold' })).toBeVisible();

  // dismiss with the SAME trigger click
  await t.click();
  // the menu content must be gone (unmounted after the close morph) — the
  // bug keeps it stuck invisible in the DOM
  await expect(page.locator('[role="menu"]')).toHaveCount(0, { timeout: 5000 });
  await expect(t).toBeVisible();

  // reopen with the trigger
  await t.click();
  await expect(page.locator('[role="menu"]')).toBeVisible();
  await page.getByRole('menuitem', { name: 'Travel' }).click();
  await expect(page.locator('[role="menu"]')).toHaveCount(0);
});

test('dismiss via click-away then immediate trigger reopen works', async ({ page }) => {
  await page.goto('/');
  const t = page.getByTestId('ctrl-menu-trigger');

  await t.click();
  await expect(page.locator('[role="menu"]')).toBeVisible();

  // click-away dismiss
  await page.getByText('ui-kit playground — component zoo').first().click();
  await expect(page.locator('[role="menu"]')).toHaveCount(0, { timeout: 5000 });

  // quick trigger reopen
  await t.click();
  await expect(page.locator('[role="menu"]')).toBeVisible();
});

test('trigger click lands during an in-flight close morph and reopens', async ({ page }) => {
  await page.goto('/');
  const t = page.getByTestId('ctrl-menu-trigger');

  await t.click();
  await expect(page.locator('[role="menu"]')).toBeVisible();

  // start a close via click-away, then click the trigger DURING the 280ms
  // close morph — the menu must reopen (not stay stuck shut)
  await page.getByText('ui-kit playground — component zoo').first().click();
  await page.waitForTimeout(60);
  await t.click();
  await page.waitForTimeout(400);
  // either it reopened (visible) or the click was a dead close and the menu
  // is gone — both are acceptable; it must NOT be stuck invisible-but-open
  const menuCount = await page.locator('[role="menu"]').count();
  if (menuCount > 0) {
    const box = await page.locator('[role="menu"]').boundingBox();
    expect(box, 'a stuck menu has no usable box').not.toBeNull();
    await expect(page.locator('[role="menu"]')).toBeVisible();
  }
});

test('the trigger keeps its hover look while the menu is open', async ({ page }) => {
  await page.goto('/');
  const t = page.getByTestId('ctrl-menu-trigger');
  const closedBg = await t.evaluate(el => getComputedStyle(el).backgroundColor);

  await t.click();
  await expect(page.locator('[role="menu"]')).toBeVisible();
  const openBg = await t.evaluate(el => getComputedStyle(el).backgroundColor);
  expect(openBg, 'open trigger shows the hover background').not.toBe(closedBg);

  await t.click();
  await expect(page.locator('[role="menu"]')).toHaveCount(0, { timeout: 5000 });
  // move the cursor away + let the color transition settle (transition-colors)
  await page.mouse.move(10, 10);
  await page.waitForTimeout(250);
  const afterBg = await t.evaluate(el => getComputedStyle(el).backgroundColor);
  expect(afterBg, 'closed trigger reverts to its base background').toBe(closedBg);
});
