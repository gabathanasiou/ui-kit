import { test, expect, Page } from '@playwright/test';

/* Glide data grid — the playground's Data grid section.
   The canvas is not queryable, so these cases cover the WIRING that is: real
   kit controls mounted over cells (`domCells`), their panels, and the
   one-commit contract the host sees. Canvas painting is checked by eye. */

const crewCell = (page: Page, row: number) =>
  page.locator('[data-glide-crew] [data-glide-dom-layer] > div').nth(row);

// Each row mounts three DOM cells: kit button, morph search, text box.
const buttonCell = (page: Page, colKey: 'search' | 'add', row: number) =>
  page.locator('[data-glide-button-sheet] [data-glide-dom-layer] > div').nth(row * 3 + (colKey === 'search' ? 1 : 2));

test.describe('Glide data grid', () => {
  test('crew card: the DOM dropdown button opens the cell editor like a double click', async ({ page }) => {
    await page.goto('/#glide');
    const trigger = page.getByTestId('glide-crew-person-open-crew-a');
    await expect(trigger).toHaveAttribute('aria-label', /JOHN DOE/);

    await trigger.click();
    // The overlay editor is the double-click path: seeded with the current
    // name, with the kit picker panel under it.
    const overlay = page.locator('[data-glide-overlay-layer] [data-picker-field]').first();
    await expect(overlay.locator('input')).toHaveValue('JOHN DOE');
    const panel = page.locator('#search-menu-panel');
    await expect(panel).toBeVisible();
    await panel.getByText('MAKIS GOUDOUMIS', { exact: true }).first().click();

    await expect(page.getByTestId('glide-crew-status')).toHaveText('1 cell in one commit');
    await expect(page.getByTestId('glide-crew-commits')).toHaveText('1 commits');
  });

  test('cell layouts: a DOM cell hosts an arranged row of real controls', async ({ page }) => {
    await page.goto('/#glide');
    const card = page.getByTestId('glide-layouts-demo');
    const cells = card.locator('[data-glide-dom-cell]');
    await expect(cells).toHaveCount(4);

    const actions = cells.nth(0);
    await expect(actions.getByRole('button')).toHaveCount(3);
    await actions.getByRole('button', { name: 'Approve' }).click();
    await expect(page.getByTestId('glide-layout-status')).toHaveText('last: approved row 1');

    // The morph field shares a cell with the adder, each with its own trigger.
    const searchCell = cells.nth(1);
    await expect(searchCell.locator('[data-morph-search-trigger]')).toHaveCount(2);
  });

  test('field cells: morph-to-search lives in the cell and submits in place', async ({ page }) => {
    await page.goto('/#glide');
    const cell = buttonCell(page, 'search', 0);
    const root = cell.locator('[data-morph-search]').first();

    await expect(root).toHaveAttribute('data-expanded', 'false');
    await root.locator('[data-morph-search-trigger]').click();
    await expect(root).toHaveAttribute('data-expanded', 'true');
    await expect(root.locator('[data-morph-search-input]')).toBeFocused();

    await root.locator('[data-morph-search-input]').fill('diner');
    await page.keyboard.press('Enter');

    await expect(root).toHaveAttribute('data-expanded', 'false');
    await expect(page.getByTestId('glide-buttons-status')).toHaveText('last: search “diner”');
    await expect(cell).toContainText('Search: diner');
  });

  test('field cells: the create/text box lives in the cell and submits in place', async ({ page }) => {
    await page.goto('/#glide');
    const cell = buttonCell(page, 'add', 1);
    const root = cell.locator('[data-morph-search]').first();

    await root.locator('[data-morph-search-trigger]').click();
    await expect(root.locator('[data-morph-search-input]')).toBeFocused();
    await root.locator('[data-morph-search-input]').fill('Camera');
    await page.keyboard.press('Enter');

    await expect(page.getByTestId('glide-buttons-status')).toHaveText('last: added “Camera”');
    await expect(cell).toContainText('Add: Camera');
  });
});
