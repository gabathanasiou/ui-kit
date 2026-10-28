import { test, expect, Page } from '@playwright/test';

/* Glide data grid — the playground's Data grid section.
   The canvas is not queryable, so these cases cover the WIRING that is: real
   kit controls mounted over cells (`domCells`), their panels, and the
   one-commit contract the host sees. Canvas painting is checked by eye. */

const crewCell = (page: Page, row: number) =>
  page.locator('[data-glide-crew] [data-glide-dom-layer] > div').nth(row);

const buttonCell = (page: Page, colKey: 'search' | 'add', row: number) =>
  page.locator('[data-glide-button-sheet] [data-glide-dom-layer] > div').nth(row * 2 + (colKey === 'search' ? 0 : 1));

test.describe('Glide data grid', () => {
  test('crew card: a real PickerField lives in the Person cell and commits once', async ({ page }) => {
    await page.goto('/#glide');
    const picker = crewCell(page, 0).locator('[data-picker-field]').first();
    await expect(picker.locator('input')).toHaveValue('JOHN DOE');

    await picker.click();
    const panel = page.locator('#search-menu-panel');
    await expect(panel).toBeVisible();
    await panel.getByText('MAKIS GOUDOUMIS', { exact: true }).first().click();

    await expect(picker.locator('input')).toHaveValue('MAKIS GOUDOUMIS');
    await expect(page.getByTestId('glide-crew-status')).toHaveText('1 cell in one commit');
    await expect(page.getByTestId('glide-crew-commits')).toHaveText('1 commits');
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
