import { test, expect } from '@playwright/test';

/* Dialog (confirm/prompt/alert) specs — the dialogs render THROUGH the kit
   Modal (flat chrome), so they inherit the morph + one-dim backdrop. */

test('confirm dialog: flat chrome, cancel/confirm resolve', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('dlg-confirm').click();

  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText('Delete Scene?');
  await expect(dialog).toContainText('This can be restored from Trash.');

  /* Flat chrome: no header/footer bars (the non-flat Modal header carries
     `border-b border-zinc-800`). */
  await expect(dialog.locator('.border-b')).toHaveCount(0);

  /* Enter = the primary function (the Modal's footer Enter-confirm). */
  await page.keyboard.press('Enter');
  await expect(page.getByTestId('dlg-confirm').locator('..')).toContainText('confirm → true');

  await page.getByTestId('dlg-confirm').click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await expect(page.getByTestId('dlg-confirm').locator('..')).toContainText('confirm → false');

  await page.getByTestId('dlg-confirm').click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByTestId('dlg-confirm').locator('..')).toContainText('confirm → true');
});

test('danger confirm: red solid confirm + DNWA checkbox', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('dlg-danger').click();

  const dialog = page.getByRole('dialog');
  await expect(dialog).toContainText('Permanently delete all trash items?');
  await expect(dialog.getByRole('checkbox')).toBeVisible();
  /* Tailwind v4 red-600 resolves to oklch (not rgb). */
  await expect(dialog.getByRole('button', { name: 'Confirm' })).toHaveCSS('background-color', 'oklch(0.577 0.245 27.325)');

  /* The kit Checkbox's native input is sr-only (1×1, overlapped by the pill)
     — click the pill LABEL, which activates the input. */
  await dialog.locator('.ui-checkbox').click();
  await page.keyboard.press('Enter');
  await expect(page.getByTestId('dlg-danger').locator('..')).toContainText('danger → true');

  /* Suppressed for 24h: re-opening resolves immediately without UI. */
  await page.getByTestId('dlg-danger').click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByTestId('dlg-danger').locator('..')).toContainText('danger → true');
});

test('danger confirm DNWA: reset button re-opens; suppressed state is labelled', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.removeItem('playground_dnwa_empty_trash'));

  /* Reset while suppressed: the dialog opens again. */
  await page.getByTestId('dnwa-reset').click();
  await page.getByTestId('dlg-danger').click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Cancel' }).click();

  /* Re-suppress (checkbox + confirm), then the auto-resolve is VISIBLE. */
  await page.getByTestId('dlg-danger').click();
  await page.getByRole('dialog').locator('.ui-checkbox').click();
  await page.keyboard.press('Enter');
  await page.getByTestId('dlg-danger').click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByTestId('dlg-danger').locator('..')).toContainText('danger → true (suppressed)');

  /* Reset clears the suppression entirely. */
  await page.getByTestId('dnwa-reset').click();
  await page.getByTestId('dlg-danger').click();
  await expect(page.getByRole('dialog')).toBeVisible();
});

test('prompt: default value, Enter resolves, Escape cancels', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('dlg-prompt').click();

  const dialog = page.getByRole('dialog');
  const input = dialog.locator('input');
  await expect(input).toBeVisible();
  await expect(input).toHaveValue('Untitled Project');

  await input.fill('Town - Night');
  await input.press('Enter');
  await expect(page.getByTestId('dlg-prompt').locator('..')).toContainText('prompt → Town - Night');

  await page.getByTestId('dlg-prompt').click();
  await page.getByRole('dialog').locator('input').press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByTestId('dlg-prompt').locator('..')).toContainText('prompt → null');
});

test('alert: OK resolves', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('dlg-alert').click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toContainText('Your project is up to date.');
  await expect(dialog.getByRole('button', { name: 'Cancel' })).toHaveCount(0);
  /* Alerts need attention: NOT dismissible by outside click, Escape, or an X
     button — only OK closes. */
  await expect(dialog.getByRole('button', { name: 'Close' })).toHaveCount(0);
  await page.keyboard.press('Escape');
  await page.mouse.click(10, 10);
  await expect(page.getByRole('dialog')).toHaveCount(1);
  await dialog.getByRole('button', { name: 'OK' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByTestId('dlg-alert').locator('..')).toContainText('alert → ok');
});

test('dialog over a modal: stack morph, exactly one dim layer', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('dlg-over-host').click();
  await expect(page.getByRole('dialog').filter({ hasText: 'Host modal' })).toBeVisible();
  await page.getByTestId('dlg-in-host').click();

  const dims = page.locator('.ui-modal-overlay');
  await expect(dims).toHaveCount(2); /* one overlay per open Modal instance */
  /* Exactly one VISIBLE dim layer: the top (dialog) dims, the bottom (host)
     modal's overlay clears via the [data-modal-stack] :has() sibling rule. */
  const topDim = dims.last();
  const bottomDim = dims.first();
  await expect(topDim).toHaveCSS('background-color', 'rgba(0, 0, 0, 0.2)');
  await expect(bottomDim).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');

  await page.getByRole('dialog').filter({ hasText: 'Over modal' }).getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByTestId('dlg-over-host').locator('..')).toContainText('over-modal → true');
  await expect(page.getByRole('dialog').filter({ hasText: 'Host modal' })).toBeVisible();
});
