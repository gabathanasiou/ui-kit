import { test, expect } from '@playwright/test';

/* Theme regression: dark + neutral (zinc/"none") checked controls are BLACK
   with WHITE marks — never the light-gray fill that vanished on dark. */

test('dark + zinc: checked checkbox and radio are black with white marks', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('theme-mode-dark').click();
  await page.getByTestId('theme-accent-zinc').click();

  const indicator = page
    .locator('label')
    .filter({ hasText: 'Send the call sheet to cast' })
    .locator('.ui-check-indicator')
    .first();
  await expect(indicator).toHaveCSS('color', 'rgb(0, 0, 0)');
  await expect(indicator.locator('rect')).toHaveCSS('stroke', 'rgb(255, 255, 255)');
  await expect(indicator.locator('path')).toHaveCSS('stroke', 'rgb(255, 255, 255)');

  const radio = page.locator('[data-testid="theme-lab"] .ui-radio-circle').first();
  await expect(radio).toHaveCSS('background-color', 'rgb(0, 0, 0)');
  await expect(radio).toHaveCSS('border-color', 'rgb(255, 255, 255)');
  await expect(radio).toHaveCSS('border-width', '1px');
  await expect(radio.locator('.ui-radio-dot')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
});
