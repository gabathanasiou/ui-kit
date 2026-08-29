import { test, expect, Page } from '@playwright/test';

/* Item 64: the kit DropdownMenu behaves like the EntityDropdown panel.
   - ONE highlighted row (`.ui-item-highlighted`), written by pointer hover
     AND the arrows — latest wins; leaving the list clears a pointer-driven
     highlight; no CSS hover fills, Radix data-highlighted is inert.
   - Panel positioning: fixed below the trigger, width-matched, max-height
     clamped, visible only once positioned.
   - Keyboard: arrows move the index, Enter activates, letter typeahead jumps.
   - Manual wheel scrolling for portaled menus. */

const litRows = (page: Page) => page.locator('.ui-item-highlighted');
const menu = (page: Page) => page.locator('[role="menu"]');

async function openCtrl(page: Page) {
  await page.goto('/');
  const t = page.getByTestId('ctrl-menu-trigger');
  await t.click();
  await expect(menu(page)).toBeVisible();
  return t;
}

test('pointer hover lights exactly ONE row and leaving the list clears it', async ({ page }) => {
  await openCtrl(page);

  await page.getByRole('menuitem', { name: 'Travel' }).hover();
  await expect(litRows(page)).toHaveCount(1);
  await expect(litRows(page)).toContainText('Travel');

  // no row is lit while the cursor sits between rows
  await page.mouse.move(400, 300);
  await expect(litRows(page)).toHaveCount(0);
});

test('arrows move the highlight (keyboard wins over a stale pointer highlight)', async ({ page }) => {
  await openCtrl(page);

  // pointer lights Day Off, then the keyboard takes over
  await page.getByRole('menuitem', { name: 'Day Off' }).hover();
  await expect(litRows(page)).toContainText('Day Off');
  await page.keyboard.press('ArrowDown');
  await expect(litRows(page)).toHaveCount(1);
  await expect(litRows(page)).toContainText('Rehearsal');
  await page.keyboard.press('ArrowDown');
  await expect(litRows(page)).toContainText('Hold'); // wraps
});

test('typeahead letter-jump highlights the first matching item', async ({ page }) => {
  await openCtrl(page);
  await page.keyboard.type('t');
  await expect(litRows(page)).toContainText('Travel');
});

test('Enter activates the highlighted item', async ({ page }) => {
  await openCtrl(page);
  await page.keyboard.press('ArrowDown'); // -1 → Hold
  await page.keyboard.press('ArrowDown'); // Hold → Travel
  await page.keyboard.press('Enter');
  await expect(menu(page)).toHaveCount(0, { timeout: 5000 });
  await expect(page.getByTestId('ctrl-menu-trigger')).toContainText('Travel');
});

test('the panel is width-matched to the trigger and opens below it', async ({ page }) => {
  // the LONG menu has no width class — the panel must match the trigger
  await page.goto('/');
  await page.getByTestId('long-trigger').click();
  await expect(menu(page)).toBeVisible();
  const trigger = await page.getByTestId('long-trigger').boundingBox();
  const panel = await menu(page).boundingBox();
  expect(panel!.width).toBeGreaterThanOrEqual(trigger!.width - 3);
  expect(panel!.width).toBeLessThanOrEqual(trigger!.width + 40);
  expect(panel!.y).toBeGreaterThanOrEqual(trigger!.y + trigger!.height);
  expect(panel!.x).toBeCloseTo(trigger!.x, -1);
});

test('initialHighlightIndex pre-lights the row on open', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('initial-trigger').click();
  await expect(menu(page)).toBeVisible();
  await expect(litRows(page)).toHaveCount(1);
  await expect(litRows(page)).toContainText('Travel');
});

test('a long menu scrolls with the wheel and clamps to the viewport', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('long-trigger').click();
  await expect(menu(page)).toBeVisible();
  const panel = await menu(page).boundingBox();
  expect(panel!.height).toBeLessThanOrEqual(720 - 8);

  const content = page.locator('[role="menu"]');
  const before = await content.evaluate(el => el.scrollTop);
  await page.mouse.move(panel!.x + panel!.width / 2, panel!.y + panel!.height / 2);
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(150);
  const after = await content.evaluate(el => el.scrollTop);
  expect(after).toBeGreaterThan(before);
});

test('submenu still opens sideways and its items get their own highlight', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('submenu-trigger').click();
  await expect(menu(page)).toBeVisible();

  // hover the submenu trigger row, then Enter opens it
  await page.getByRole('menuitem', { name: 'More…' }).hover();
  await page.keyboard.press('Enter');
  const sub = page.locator('[role="menu"]').last();
  await expect(sub).toBeVisible();
  await page.getByRole('menuitem', { name: 'Nested A' }).hover();
  await expect(litRows(page).last()).toContainText('Nested A');
});

test('the currently selected item keeps a distinct selected tint', async ({ page }) => {
  await openCtrl(page);
  // nothing picked yet — no selected row
  await expect(page.locator('.ui-item-selected')).toHaveCount(0);

  // pick Travel, reopen — Travel now carries the selected tint
  await page.getByRole('menuitem', { name: 'Travel' }).click();
  await expect(menu(page)).toHaveCount(0, { timeout: 5000 });
  await page.getByTestId('ctrl-menu-trigger').click();
  await expect(menu(page)).toBeVisible();
  await expect(page.getByRole('menuitem', { name: 'Travel' })).toHaveClass(/ui-item-selected/);
  await expect(page.locator('.ui-item-selected')).toHaveCount(1);
});

test('the item manager marks its active row like the dropdown selected row', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('itemmanager-trigger').click();
  await expect(menu(page)).toBeVisible();
  // the active row carries the check + the active (selected) styling
  await expect(page.getByRole('menuitem', { name: /Alpha/ }).first()).toContainText('');
  const activeRow = page.locator('[data-active="1"]').first();
  await expect(activeRow).toHaveClass(/ui-row-active/);
  await expect(activeRow.getByRole('menuitem').first().locator('svg')).toBeVisible();
});

test('arrows keep the highlighted row scrolled into view', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('long-trigger').click();
  await expect(menu(page)).toBeVisible();
  const content = page.locator('[role="menu"]');

  for (let i = 0; i < 26; i++) await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(200);
  const lit = await litRows(page).first().boundingBox();
  const box = await content.boundingBox();
  expect(lit!.y).toBeGreaterThanOrEqual(box!.y);
  expect(lit!.y + lit!.height).toBeLessThanOrEqual(box!.y + box!.height + 1);
  await expect(litRows(page)).toContainText('Item 26');
});

test('exactly ONE lit row after pointer + keyboard (no double highlight)', async ({ page }) => {
  await openCtrl(page);
  await page.getByRole('menuitem', { name: 'Day Off' }).hover();
  await page.keyboard.press('ArrowDown'); // keyboard wins
  await expect(litRows(page)).toHaveCount(1);
  // no OTHER row may show a highlight-like background (the old focus-visible fill)
  await expect.poll(() => page.evaluate(() =>
    [...document.querySelectorAll('[role="menuitem"]')].filter(i => getComputedStyle(i).backgroundColor !== 'rgba(0, 0, 0, 0)').length,
  )).toBe(1);
});

test('a long menu inside a modal stays above it and wheel-scrolls', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('menu-modal-open').click();
  const modal = page.getByRole('dialog');
  await expect(modal).toBeVisible();
  await page.waitForTimeout(500);

  await page.getByTestId('inmodal-long-trigger').click();
  await expect(menu(page)).toBeVisible();
  // above the modal (z) and scrollable
  const box = await menu(page).boundingBox();
  await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(150);
  const st = await menu(page).evaluate(el => el.scrollTop);
  expect(st).toBeGreaterThan(0);
  // Escape closes only the menu
  await page.keyboard.press('Escape');
  await expect(menu(page)).toHaveCount(0, { timeout: 5000 });
  await expect(modal).toBeVisible();
});
