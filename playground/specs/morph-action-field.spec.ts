import { test, expect, Page } from '@playwright/test';

/* MorphActionField — button → textbox (no dropdown) with inline actions.
   Enter/Check submit and collapse; Escape/outside/X cancel and clear; a
   `keepOpen` custom action keeps the field open (the map-picker pattern). */

const field = (page: Page, row: string) => page.getByTestId(row).locator('[data-morph-search]').first();
const trigger = (page: Page, row: string) => field(page, row).locator('[data-morph-search-trigger]');
const input = (page: Page, row: string) => field(page, row).locator('[data-morph-search-input]');

test.describe('MorphActionField', () => {
  test.use({ contextOptions: { reducedMotion: 'no-preference' } });

  test('opens as a focused text box with no dropdown, and submits from the action row', async ({ page }) => {
    await page.goto('/');
    const root = field(page, 'morph-action-role');
    await trigger(page, 'morph-action-role').click();
    await expect(root).toHaveAttribute('data-expanded', 'true');
    await expect(input(page, 'morph-action-role')).toBeFocused();
    await expect(page.locator('#search-menu-panel')).toHaveCount(0);
    await expect(root).toHaveCSS('transition-property', 'width');

    await input(page, 'morph-action-role').fill('Gaffer');
    await root.locator('[data-morph-search-action="submit"]').click();
    await expect(root).toHaveAttribute('data-expanded', 'false');
    await expect(page.getByTestId('morph-action-status')).toContainText('roles: Gaffer');
    await expect(input(page, 'morph-action-role')).toHaveValue('');

    await trigger(page, 'morph-action-role').click();
    await input(page, 'morph-action-role').fill('Best Boy');
    await page.keyboard.press('Enter');
    await expect(root).toHaveAttribute('data-expanded', 'false');
    await expect(page.getByTestId('morph-action-status')).toContainText('Best Boy');
  });

  test('Escape cancels and clears, and a keepOpen action leaves the field open', async ({ page }) => {
    await page.goto('/');
    const roleRoot = field(page, 'morph-action-role');
    await trigger(page, 'morph-action-role').click();
    await input(page, 'morph-action-role').fill('Temp role');
    await page.keyboard.press('Escape');
    await expect(roleRoot).toHaveAttribute('data-expanded', 'false');
    await trigger(page, 'morph-action-role').click();
    await expect(input(page, 'morph-action-role')).toHaveValue('');

    const locRoot = field(page, 'morph-action-location');
    await trigger(page, 'morph-action-location').click();
    await input(page, 'morph-action-location').fill('Stage 7');
    await locRoot.locator('[data-morph-search-action="map"]').click();
    await expect(locRoot).toHaveAttribute('data-expanded', 'true');
    await expect(page.getByTestId('morph-action-status')).toContainText('map: Stage 7');
    await locRoot.locator('[data-morph-search-action="cancel"]').click();
    await expect(locRoot).toHaveAttribute('data-expanded', 'false');
  });

  test('clicking outside cancels', async ({ page }) => {
    await page.goto('/');
    const root = field(page, 'morph-action-plain');
    await trigger(page, 'morph-action-plain').click();
    await input(page, 'morph-action-plain').fill('Parking note');
    await page.locator('h1').click();
    await expect(root).toHaveAttribute('data-expanded', 'false');
  });
});
