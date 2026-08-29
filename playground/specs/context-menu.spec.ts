import { test, expect, Page } from '@playwright/test';

/* The kit ContextMenu shares the dropdown machinery: single-highlight,
   keyboard + typeahead, the mini-modal key lock, nested submenus (chain),
   one-open-overlay-at-a-time, and STATIC positioning (no scroll-follow). */

const ctxMenu = (page: Page) => page.locator('[role="menu"], .ui-menu.fixed').filter({ hasText: /Plain item|More…/ });
const litRows = (page: Page) => page.locator('.ui-item-highlighted');

async function openCtx(page: Page) {
  await page.goto('/');
  await page.getByTestId('ctx-target').click();
  await page.waitForTimeout(300);
  await expect(page.getByRole('button', { name: /Plain item/ })).toBeVisible();
}

test('context menu: single highlight on hover and leaving clears it', async ({ page }) => {
  await openCtx(page);
  await page.getByRole('button', { name: 'Delete', exact: true }).hover();
  await expect(litRows(page)).toHaveCount(1);
  await expect(litRows(page)).toContainText('Delete');
  await page.mouse.move(700, 150);
  await expect(litRows(page)).toHaveCount(0);
});

test('context menu: arrows/typeahead/Enter work with the focus elsewhere (key lock)', async ({ page }) => {
  await openCtx(page);
  await page.evaluate(() => document.activeElement && document.activeElement.blur());
  await page.keyboard.press('ArrowDown');
  await expect(litRows(page)).toContainText('Plain item');
  await page.keyboard.press('ArrowDown');
  await expect(litRows(page)).toContainText('More…');
  await page.keyboard.type('d');
  await expect(litRows(page)).toContainText('Delete');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: /Plain item/ })).toHaveCount(0, { timeout: 5000 });
});

test('context menu: nested subs coexist and the parent survives', async ({ page }) => {
  await openCtx(page);
  // open More… → Deeper… — the chain holds both
  await page.getByRole('button', { name: /More…/ }).hover();
  await page.waitForTimeout(400);
  await page.getByRole('button', { name: /Deeper…/ }).hover();
  await page.waitForTimeout(500);
  await expect(page.getByRole('button', { name: 'Level 3 A' })).toBeVisible();

  // move back to a parent item — the nested sub closes, the parent stays
  await page.getByRole('button', { name: /Nested B/ }).hover();
  await page.waitForTimeout(500);
  await expect(page.getByRole('button', { name: 'Level 3 A' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: /Nested B/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /Plain item/ })).toBeVisible();

  // pick a level-3 item from a fresh open
  await page.getByRole('button', { name: /Deeper…/ }).hover();
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Level 3 B' }).click();
  await page.waitForTimeout(400);
  await expect(page.getByText(/pick: Level 3 B/)).toBeVisible();
});

test('mutual exclusion: a dropdown and a context menu never coexist', async ({ page }) => {
  await page.goto('/');
  // open a dropdown first
  await page.getByTestId('ctrl-menu-trigger').click();
  await expect(page.locator('[role="menu"]')).toBeVisible();
  // open the context menu — the dropdown must close
  await page.getByTestId('ctx-target').click();
  await page.waitForTimeout(400);
  await expect(page.locator('[role="menu"]')).toHaveCount(0);
  await expect(page.getByRole('button', { name: /Plain item/ })).toBeVisible();

  // and the reverse: open a dropdown while the context menu is open
  await page.getByTestId('ctrl-menu-trigger').click();
  await page.waitForTimeout(400);
  await expect(page.getByRole('button', { name: /Plain item/ })).toHaveCount(0);
  await expect(page.locator('[role="menu"]')).toBeVisible();
});

test('context menu stays static when the page scrolls', async ({ page }) => {
  await openCtx(page);
  const before = await page.getByRole('button', { name: /Plain item/ }).boundingBox();
  await page.evaluate(() => window.scrollTo(0, 150));
  await page.waitForTimeout(250);
  const after = await page.getByRole('button', { name: /Plain item/ }).boundingBox();
  expect(after!.y).toBeCloseTo(before!.y, 0);
  expect(after!.x).toBeCloseTo(before!.x, 0);
});
