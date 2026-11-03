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

test('dropdown: tap 1 opens; a row acts on the TAP itself; outside closes', async ({ page }) => {
  await open(page);
  const item = page.getByRole('menuitem', { name: 'First item' });
  await expect(item).toBeHidden();
  await caseOf(page, 'dropdown').getByRole('button', { name: 'Menu' }).tap();
  await expect(item).toBeVisible();

  /* Roadmap 337: a row must act from pointerup — iOS may swallow the click
     (a dismiss layer or a page change), which read as "the dropdown closes,
     nothing happens". No click is dispatched here. */
  const box = (await item.boundingBox())!;
  await item.evaluate((el, pt) => {
    for (const type of ['pointerdown', 'pointerup']) {
      el.dispatchEvent(new PointerEvent(type, {
        bubbles: true, cancelable: true, pointerType: 'touch', pointerId: 1,
        isPrimary: true, button: 0, buttons: type === 'pointerdown' ? 1 : 0,
        clientX: pt.x, clientY: pt.y,
      }));
    }
  }, { x: box.x + box.width / 2, y: box.y + box.height / 2 });
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
  await tile.getByRole('button', { name: 'Accordion (WIP)', exact: true }).tap();
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

test('submenu default: every coarse device uses the in-place card (335)', async ({ page }) => {
  await open(page);
  await caseOf(page, 'dropdown').getByRole('button', { name: 'Menu' }).tap();
  await page.getByRole('menuitem', { name: 'More…' }).tap();
  const card = page.locator('[data-submenu-presentation="replace"]');
  await expect(card).toBeVisible();
  await expect(card.locator('[data-submenu-back]')).toBeVisible();
  await expect(page.locator('[data-submenu-panel]')).toHaveCount(0);
});

test('nested 3 levels: ONE card, ONE Back, Back returns exactly one level (335)', async ({ page }) => {
  await open(page);
  await caseOf(page, 'dropdown').getByRole('button', { name: 'Menu' }).tap();
  const root = page.locator('[role="menu"]').first();
  const rootBox = (await root.boundingBox())!;
  await page.getByRole('menuitem', { name: 'More…' }).tap();
  const level2 = page.locator('[role="menu"]').nth(1);
  await expect(level2).toBeVisible();
  await page.getByRole('menuitem', { name: 'Deeper…' }).tap();
  const level3 = page.locator('[role="menu"]').nth(2);
  await expect(level3).toBeVisible();

  /* Exactly ONE painted card: the ancestors keep their layout (the FLIP needs
     their rects) but are fully transparent — no dimmed stack, no second
     shadow. */
  const painted = await page.locator('[role="menu"]').evaluateAll(els =>
    els.filter(el => Number(getComputedStyle(el).opacity) > 0).length);
  expect(painted).toBe(1);
  const backs = await page.locator('[data-submenu-back]').evaluateAll(els => els.filter(el => {
    let p: HTMLElement | null = el as HTMLElement;
    while (p) {
      if (Number(getComputedStyle(p).opacity) === 0) return false;
      p = p.parentElement;
    }
    return true;
  }).length);
  expect(backs).toBe(1);

  // The whole chain shares ONE width: the nested card covers its parent card
  // exactly (action menus keep their natural width; only wide pickers like the
  // version menu fill the phone — roadmap 336).
  const level3Box = (await level3.boundingBox())!;
  expect(Math.abs(level3Box.width - rootBox.width)).toBeLessThanOrEqual(2);
  expect(level3Box.x).toBeGreaterThanOrEqual(0);
  expect(level3Box.x + level3Box.width).toBeLessThanOrEqual(page.viewportSize()!.width + 1);

  // Back is a NORMAL item: same height as the list's rows, with the divider,
  // and it names the card it returns from.
  const back = page.locator('[data-submenu-back]').filter({ hasText: 'Deeper…' });
  const backBox = (await back.boundingBox())!;
  const deepRow = page.getByRole('menuitem', { name: 'Deep A' });
  const rowBox = (await deepRow.boundingBox())!;
  expect(Math.abs(backBox.height - rowBox.height)).toBeLessThanOrEqual(3);

  // One level at a time: level 3 → level 2 (its own Back still present) →
  // root.
  await back.tap();
  await expect(page.getByRole('menuitem', { name: 'Deep A' })).toHaveCount(0);
  await expect(page.getByRole('menuitem', { name: 'Nested A' })).toBeVisible();
  const level2Back = page.locator('[data-submenu-back]').filter({ hasText: 'More…' });
  await expect(level2Back).toBeVisible();
  await level2Back.tap();
  await expect(page.getByRole('menuitem', { name: 'More…' })).toBeVisible();
  await expect(page.getByRole('menuitem', { name: 'First item' })).toBeVisible();
});

test.describe('nested card with REAL motion', () => {
  test.use({ contextOptions: { reducedMotion: 'no-preference' } });
  test('opening a nested card never dismisses the root (335)', async ({ page }) => {
    /* Regression: the parent card turning pointer-events:none in the same
       frame made WebKit focus the row underneath → focusOutside → the whole
       menu closed. Reduced-motion runs never hit it (the FLIP was skipped),
       so this case MUST run with motion on. */
    await open(page);
    await caseOf(page, 'dropdown').getByRole('button', { name: 'Menu' }).tap();
    await page.getByRole('menuitem', { name: 'More…' }).tap();
    await expect(page.locator('[role="menu"]')).toHaveCount(2);
    await expect(page.locator('[data-submenu-presentation="replace"]')).toBeVisible();
    await page.getByRole('menuitem', { name: 'Deeper…' }).tap();
    await expect(page.locator('[role="menu"]')).toHaveCount(3);
    await expect(page.getByRole('menuitem', { name: 'Deep A' })).toBeVisible();
    await page.locator('[data-submenu-back]').filter({ hasText: 'Deeper…' }).tap();
    await expect(page.getByRole('menuitem', { name: 'Nested A' })).toBeVisible();
  });
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
