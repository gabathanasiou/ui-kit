import { expect, test, type Page } from '@playwright/test';

/* Roadmap 331/182 — iPhone/iPad touch audit. The playground matrix
   (`#touch-audit`) is the checklist; this spec drives every case.

   WHAT THIS CAN AND CANNOT PROVE: Playwright's WebKit is not iOS Safari — it
   does NOT emulate the native "first tap applies :hover, the click defers to
   the second tap" model (`:hover` never matches after `page.tap()`, and the
   click always fires). So each case asserts what CAN silently break:
     - plain controls act on tap 1 (no eaten click);
     - tap 1 on a hover-discovered surface reveals it (the un-gated hover rule
       is covered by the design docs; here we assert the resulting JS state);
     - a tap elsewhere clears revealed state (never stuck);
     - menus/submenus stay inside the viewport;
     - a drag/scroll is not treated as a tap.
   The native deferral itself stays a device check (rule 7 manual pass). */

test.skip(({ browserName, isMobile }) => !(browserName === 'webkit' && isMobile), 'iPhone/iPad WebKit only');

const caseOf = (page: Page, id: string) => page.locator(`[data-touch="${id}"]`);
const stateOf = (page: Page, id: string) => caseOf(page, id).locator('[data-touch-state]');

async function open(page: Page) {
  await page.goto('/#touch');
  await expect(caseOf(page, 'dropdown')).toBeVisible();
}

/** A tap on page chrome that is never one of the matrix controls. */
async function tapBlank(page: Page) {
  await page.getByRole('heading', { name: 'Touch audit matrix' }).tap();
}

test('dropdown: tap 1 opens; a tap outside closes', async ({ page }) => {
  await open(page);
  const item = page.getByRole('menuitem', { name: 'First item' });
  await expect(item).toBeHidden();
  await caseOf(page, 'dropdown').getByRole('button', { name: 'Menu' }).tap();
  await expect(item).toBeVisible();
  await item.tap();
  await expect(item).toBeHidden();
  await expect(stateOf(page, 'dropdown')).toContainText('pick: First');

  await caseOf(page, 'dropdown').getByRole('button', { name: 'Menu' }).tap();
  await expect(item).toBeVisible();
  await tapBlank(page);
  await expect(item).toBeHidden();
});

test('submenu on touch: accordion — only the header stays, the panel expands beneath it (182)', async ({ page }) => {
  await open(page);
  const tile = caseOf(page, 'dropdown');
  await tile.getByRole('button', { name: 'Menu' }).tap();
  const parent = page.locator('[role="menu"]').first();
  await expect(parent).toBeVisible();

  await page.getByRole('menuitem', { name: 'More…' }).tap();
  const panel = page.locator('[data-submenu-panel]');
  await expect(panel).toBeVisible();

  // Only the header row survives in the parent; the panel is INSIDE the card,
  // directly under the reordered header (an accordion body, not a second card).
  await expect(page.getByRole('menuitem', { name: 'First item' })).toBeHidden();
  const header = page.getByRole('menuitem', { name: 'More…' });
  await expect(header).toBeVisible();
  const headerBox = (await header.boundingBox())!;
  const panelBox = (await panel.boundingBox())!;
  expect(panelBox.y).toBeGreaterThanOrEqual(headerBox.y + headerBox.height - 2);
  await expect(panel.locator('[role="menuitem"]', { hasText: 'Nested A' })).toBeVisible();
  // The card grows with the panel and never leaves the phone's width.
  const vw = page.viewportSize()!.width;
  const parentBox = (await parent.boundingBox())!;
  expect(parentBox.x).toBeGreaterThanOrEqual(0);
  expect(parentBox.x + parentBox.width).toBeLessThanOrEqual(vw + 1);
  expect(panelBox.x).toBeGreaterThanOrEqual(parentBox.x);
  expect(panelBox.x + panelBox.width).toBeLessThanOrEqual(parentBox.x + parentBox.width + 1);

  // Tap the header again: the accordion collapses and the parent options
  // come back.
  await header.tap();
  await expect(page.locator('[data-submenu-panel]')).toHaveCount(0);
  await expect(page.getByRole('menuitem', { name: 'Nested A' })).toBeHidden();
  await expect(page.getByRole('menuitem', { name: 'First item' })).toBeVisible();
});

test('submenu switch: the earlier in-place presentation still works', async ({ page }) => {
  await open(page);
  const tile = caseOf(page, 'dropdown');
  await tile.getByRole('button', { name: 'In place', exact: true }).tap();
  await expect(stateOf(page, 'dropdown')).toContainText('menu: replace');

  await tile.getByRole('button', { name: 'Menu' }).tap();
  const parent = page.locator('[role="menu"]').first();
  await expect(parent).toBeVisible();
  const parentBox = (await parent.boundingBox())!;
  await page.getByRole('menuitem', { name: 'More…' }).tap();
  const child = page.locator('[role="menu"]').last();
  await expect(child).toBeVisible();
  const childBox = (await child.boundingBox())!;

  // In place = same width, same left edge, no exposed strip / dismiss layer.
  expect(Math.abs(childBox.width - parentBox.width)).toBeLessThanOrEqual(2);
  expect(Math.abs(childBox.x - parentBox.x)).toBeLessThanOrEqual(12);
  await expect(page.locator('[data-submenu-dismiss]')).toHaveCount(0);
  await child.locator('[data-submenu-back]').tap();
  await expect(page.getByRole('menuitem', { name: 'Nested A' })).toBeHidden();
});

test('NumberInput: a chevron tap steps the value (pointerdown default must not eat the click)', async ({ page }) => {
  await open(page);
  const tile = caseOf(page, 'number-input');
  await expect(stateOf(page, 'number-input')).toHaveText('value: 12');
  await tile.getByRole('button', { name: 'Increase' }).tap();
  await expect(stateOf(page, 'number-input')).toHaveText('value: 13');
  await tile.getByRole('button', { name: 'Increase' }).tap();
  await expect(stateOf(page, 'number-input')).toHaveText('value: 14');
  await tile.getByRole('button', { name: 'Decrease' }).tap();
  await expect(stateOf(page, 'number-input')).toHaveText('value: 13');
});

test('SearchMenu: the Clear action fires on tap 1', async ({ page }) => {
  await open(page);
  const tile = caseOf(page, 'search-menu');
  await tile.getByRole('button', { name: 'Search items' }).tap();
  const field = tile.getByPlaceholder('Search…');
  await expect(field).toBeVisible();
  await field.fill('Alpha');
  await expect(field).toHaveValue('Alpha');
  await tile.getByRole('button', { name: 'Clear search' }).tap();
  await expect(field).toHaveValue('');
});

test('Tooltip: tap 1 reveals; a tap outside clears it', async ({ page }) => {
  await open(page);
  const tile = caseOf(page, 'tooltip');
  const bubble = page.getByText('Revealed by tap 1', { exact: true });
  await expect(bubble).toBeHidden();
  await tile.getByText('Reveal tooltip', { exact: true }).tap();
  await expect(bubble).toBeVisible();
  await tapBlank(page);
  await expect(bubble).toBeHidden();
});

test('plain controls act on tap 1 (seg, checkbox, checklist, radio, toggle, tabs, selection)', async ({ page }) => {
  await open(page);

  await caseOf(page, 'seg').getByRole('button', { name: 'Events' }).tap();
  await expect(stateOf(page, 'seg')).toHaveText('value: b');

  await caseOf(page, 'checkbox').getByText('Checkbox', { exact: true }).tap();
  await expect(stateOf(page, 'checkbox')).toContainText('check: true');
  await caseOf(page, 'checkbox').getByRole('button', { name: 'B', exact: true }).tap();
  await expect(stateOf(page, 'checkbox')).toContainText('list: a,b');
  await caseOf(page, 'checkbox').getByText('Two', { exact: true }).tap();
  await expect(stateOf(page, 'checkbox')).toContainText('radio: two');

  await caseOf(page, 'floating-toggle').getByRole('button', { name: 'Toggle demo' }).tap();
  await expect(stateOf(page, 'floating-toggle')).toHaveText('active: true');

  await caseOf(page, 'tabs').getByRole('button', { name: 'Second' }).tap();
  await expect(stateOf(page, 'tabs')).toHaveText('active: second');

  await caseOf(page, 'selection').locator('[data-touch-selection-row]').tap();
  await expect(stateOf(page, 'selection')).toHaveText('checked: false');
});

test('modal and dialog: open and commit on tap 1', async ({ page }) => {
  await open(page);
  await caseOf(page, 'modal').getByRole('button', { name: 'Open modal' }).tap();
  const modal = page.getByRole('dialog').filter({ hasText: 'Touch audit modal' });
  await expect(modal).toBeVisible();
  await modal.getByRole('button', { name: 'Save' }).tap();
  await expect(modal).toBeHidden();

  await caseOf(page, 'dialog').getByRole('button', { name: 'Confirm…' }).tap();
  const dialog = page.getByRole('dialog').filter({ hasText: 'Tap Confirm.' });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Confirm', exact: true }).tap();
  await expect(dialog).toBeHidden();
  await expect(stateOf(page, 'dialog')).toHaveText('confirmed: true');
});

test('morph fields: tap focuses the field (iOS keyboard), submit and outside-cancel work', async ({ page }) => {
  await open(page);
  const action = caseOf(page, 'morph-action');
  await action.getByRole('button', { name: 'Add item' }).tap();
  const actionField = action.locator('input').first();
  await expect(actionField).toBeVisible();
  // Focus must land INSIDE the tap's task or iOS never raises the keyboard.
  await expect(actionField).toBeFocused();
  await actionField.fill('hello');
  await action.getByRole('button', { name: 'Submit' }).tap();
  await expect(stateOf(page, 'morph-action')).toHaveText('submitted: hello');

  const search = caseOf(page, 'morph-search');
  await search.getByRole('button', { name: 'Filter' }).tap();
  const searchField = search.locator('input').first();
  await expect(searchField).toBeVisible();
  await expect(searchField).toBeFocused();
  await tapBlank(page);
  await expect(search.locator('[data-morph-search]')).toHaveAttribute('data-expanded', 'false');
});

test('picker field: tap 1 opens, a row pick commits', async ({ page }) => {
  await open(page);
  const tile = caseOf(page, 'picker-field');
  await tile.getByRole('button', { name: 'Pick one' }).tap();
  await page.getByRole('option', { name: 'Two' }).tap();
  await expect(stateOf(page, 'picker-field')).toHaveText('pick: 2');
});

test('rich text: a formatting tap applies to the selection', async ({ page }) => {
  await open(page);
  const tile = caseOf(page, 'rich-text');
  const editor = tile.locator('.tiptap');
  await editor.tap();
  await page.keyboard.press('Meta+A');
  const bold = tile.getByRole('button', { name: 'Bold' });
  await bold.tap();
  await expect(bold).toHaveAttribute('aria-pressed', 'true');
});
