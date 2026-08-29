import { test, expect } from '@playwright/test';

/* Debugging spec: modals + portals.
   - a DropdownMenu INSIDE a Modal must portal above the modal, and Escape
     must dismiss ONLY the menu (never the enclosing modal)
   - stacked modals close top-first and the lower modal survives */

test('dropdown inside a modal: Escape dismisses only the dropdown', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('menu-modal-open').click();
  const modal = page.getByRole('dialog');
  await expect(modal).toBeVisible();
  await page.waitForTimeout(500); // let the modal's open morph settle

  await page.getByTestId('inmodal-menu-trigger').click();
  const menu = page.locator('[role="menu"]');
  await expect(menu).toBeVisible();
  // the menu is interactive above the modal
  await page.getByRole('menuitem', { name: 'Hold' }).hover();

  // Escape closes the MENU only
  await page.keyboard.press('Escape');
  await expect(menu).toHaveCount(0, { timeout: 5000 });
  await expect(modal).toBeVisible();

  // Escape again closes the MODAL
  await page.keyboard.press('Escape');
  await expect(modal).toHaveCount(0, { timeout: 5000 });
});

test('stacked modals: closing the top one reveals the lower one', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('stacked-open').click();
  const dialogs = page.locator('[role="dialog"]');
  await expect(dialogs).toHaveCount(1);
  await page.waitForTimeout(500); // let the open morph settle before clicking in the footer

  await page.getByRole('button', { name: 'Open Modal 2' }).click();
  await expect(dialogs).toHaveCount(2);
  await expect(page.getByRole('heading', { name: 'Modal 2' })).toBeVisible();
  // the lower modal is aria-hidden (Radix) + CSS-faded — the a11y tree
  // exposes only the TOP dialog
  await expect(page.getByRole('dialog')).toHaveCount(1);

  await page.keyboard.press('Escape');
  await expect(dialogs).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'Modal 1' })).toBeVisible();
});

test('dropdown inside a modal dismisses with a trigger click and reopens', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('menu-modal-open').click();
  const modal = page.getByRole('dialog');
  await expect(modal).toBeVisible();
  await page.waitForTimeout(500); // let the modal's open morph settle

  const t = page.getByTestId('inmodal-menu-trigger');
  const menu = page.locator('[role="menu"]');
  await t.click();
  await expect(menu).toBeVisible();
  // dismiss via the trigger click (the buggy path)
  await t.click();
  await expect(menu).toHaveCount(0, { timeout: 5000 });
  await expect(modal).toBeVisible();
  // reopen
  await t.click();
  await expect(menu).toBeVisible();
});
