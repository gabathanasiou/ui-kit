import { test, expect } from '@playwright/test';

/* DatePicker quick-jump: clicking the month–year header swaps to a month
   grid with a typable year box — two clicks to any month in any year. */

const picker = (page: import('@playwright/test').Page) =>
  page.locator('[data-section="inputs"] .border.rounded-lg.overflow-hidden');

test('the month–year header opens a month grid and jumps', async ({ page }) => {
  await page.goto('/');
  const p = picker(page);
  await expect(p.locator('.text-sm.font-semibold')).toContainText(/2026/);

  // label click → month grid
  await p.getByRole('button', { name: 'Select year and month' }).click();
  await expect(p.getByRole('button', { name: 'Dec', exact: true })).toBeVisible();
  await expect(p.getByRole('button', { name: 'Sep', exact: true })).toBeVisible();

  // pick a month → back to the day view on that month
  await p.getByRole('button', { name: 'Mar', exact: true }).click();
  await expect(p.locator('.text-sm.font-semibold')).toContainText('March 2026');
});

test('the year box is typable (Enter commits, Escape reverts)', async ({ page }) => {
  await page.goto('/');
  const p = picker(page);
  await p.getByRole('button', { name: 'Select year and month' }).click();

  // Enter commits the typed year
  const year = p.getByRole('textbox', { name: 'Year' });
  await year.fill('2028');
  await page.keyboard.press('Enter');
  await expect(year).toHaveValue('2028');

  // jump to a month in that year
  await p.getByRole('button', { name: 'Dec', exact: true }).click();
  await expect(p.locator('.text-sm.font-semibold')).toContainText('December 2028');

  // Escape reverts an uncommitted draft
  await p.getByRole('button', { name: 'Select year and month' }).click();
  await year.fill('1999');
  await page.keyboard.press('Escape');
  await expect(year).toHaveValue('2028');
});

test('the year chevrons step one year in the month grid', async ({ page }) => {
  await page.goto('/');
  const p = picker(page);
  await p.getByRole('button', { name: 'Select year and month' }).click();
  const year = p.getByRole('textbox', { name: 'Year' });
  await expect(year).toHaveValue(String(new Date().getFullYear()));
  await p.getByRole('button', { name: 'Next year' }).click();
  await expect(year).toHaveValue(String(new Date().getFullYear() + 1));
  await p.getByRole('button', { name: 'Previous year' }).click();
  await expect(year).toHaveValue(String(new Date().getFullYear()));
});

test('Today jumps back to the current month from anywhere', async ({ page }) => {
  await page.goto('/');
  const p = picker(page);
  await p.getByRole('button', { name: 'Select year and month' }).click();
  const year = p.getByRole('textbox', { name: 'Year' });
  await year.fill('2031');
  await page.keyboard.press('Enter');
  await p.getByRole('button', { name: 'Today' }).click();
  await expect(p.locator('.text-sm.font-semibold')).toContainText(String(new Date().getFullYear()));
});
