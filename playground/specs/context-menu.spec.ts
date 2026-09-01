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
  await expect(page.getByRole('menuitem', { name: /Plain item/ })).toBeVisible();
}

test('context menu: single highlight on hover and leaving clears it', async ({ page }) => {
  await openCtx(page);
  await page.getByRole('menuitem', { name: 'Delete', exact: true }).hover();
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
  await expect(page.getByRole('menuitem', { name: /Plain item/ })).toHaveCount(0, { timeout: 5000 });
});

test('context menu: nested subs coexist and the parent survives', async ({ page }) => {
  await openCtx(page);
  // open More… → Deeper… — the chain holds both
  await page.getByRole('menuitem', { name: /More…/ }).hover();
  await page.waitForTimeout(400);
  await page.getByRole('menuitem', { name: /Deeper…/ }).hover();
  await page.waitForTimeout(500);
  await expect(page.getByRole('menuitem', { name: 'Level 3 A' })).toBeVisible();

  // move back to a parent item — the nested sub closes (Radix grace + the
  // close morph), the parent stays. Poll (web-first): the close morph keeps
  // the sub content mounted for ~280ms, and under dev-server load the Radix
  // grace + morph + unmount can exceed any fixed sleep.
  await page.getByRole('menuitem', { name: /Nested B/ }).hover();
  await expect(page.getByRole('menuitem', { name: 'Level 3 A' })).toHaveCount(0, { timeout: 3000 });
  await expect(page.getByRole('menuitem', { name: /Nested B/ })).toBeVisible();
  await expect(page.getByRole('menuitem', { name: /Plain item/ })).toBeVisible();

  // pick a level-3 item from a fresh open
  await page.getByRole('menuitem', { name: /Deeper…/ }).hover();
  await page.getByRole('menuitem', { name: 'Level 3 B' }).click();
  await expect(page.getByText(/pick: Level 3 B/)).toBeVisible();
});

test('mutual exclusion: a dropdown and a context menu never coexist', async ({ page }) => {
  await page.goto('/');
  // the dropdown menu is the one with the Ctrl items; the context menu is
  // the one with the plain items
  const dropdownMenu = page.locator('[role="menu"]', { hasText: 'Hold' });
  // open a dropdown first
  await page.getByTestId('ctrl-menu-trigger').click();
  await expect(dropdownMenu).toBeVisible();
  // open the context menu — the dropdown must close
  await page.getByTestId('ctx-target').click();
  await page.waitForTimeout(400);
  await expect(dropdownMenu).toHaveCount(0);
  await expect(page.getByRole('menuitem', { name: /Plain item/ })).toBeVisible();

  // and the reverse: dismiss the context menu, then open the dropdown
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
  await expect(page.getByRole('menuitem', { name: /Plain item/ })).toHaveCount(0);
  await page.getByTestId('ctrl-menu-trigger').click();
  await expect(dropdownMenu).toBeVisible();
});

test('context menu stays static when the page scrolls', async ({ page }) => {
  await openCtx(page);
  const before = await page.getByRole('menuitem', { name: /Plain item/ }).boundingBox();
  await page.evaluate(() => window.scrollTo(0, 150));
  await page.waitForTimeout(250);
  const after = await page.getByRole('menuitem', { name: /Plain item/ }).boundingBox();
  expect(after!.y).toBeCloseTo(before!.y, 0);
  expect(after!.x).toBeCloseTo(before!.x, 0);
});

test('context menu: reopening without moving the cursor does not keep the previous highlight', async ({ page }) => {
  /* The highlight state lives in the always-mounted ContextMenu; a
     stationary cursor fires no pointerenter for the newly-opened menu
     (Safari never enters elements that appear under a still cursor) — so
     without an open-reset, the previously selected item stays lit. Open via
     the right-edge target: its menu opens away from the cursor, so nothing
     can legitimately light on reopen in ANY engine. */
  await page.goto('/');
  const edge = page.getByTestId('ctx-right-edge');

  await edge.click();
  await page.waitForTimeout(300);
  await page.getByRole('menuitem', { name: 'Delete', exact: true }).hover();
  await expect(litRows(page)).toContainText('Delete');

  // select it — the menu closes, the cursor never moves
  await page.getByRole('menuitem', { name: 'Delete', exact: true }).click();
  await expect(page.getByRole('menuitem', { name: /Plain item/ })).toHaveCount(0, { timeout: 5000 });

  // reopen at the SAME spot without moving the mouse
  await edge.click();
  await page.waitForTimeout(300);
  await expect(page.getByRole('menuitem', { name: /Plain item/ })).toBeVisible();
  await expect(litRows(page)).toHaveCount(0);
});
