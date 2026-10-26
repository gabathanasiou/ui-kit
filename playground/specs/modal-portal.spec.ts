import { test, expect } from '@playwright/test';

/** True when a computed CSS colour has no meaningful chroma (zinc/none). */
function isNeutral(c: string): boolean {
  const rgb = c.match(/^rgba?\(([^)]+)\)/);
  if (rgb) {
    const p = rgb[1].split(',').slice(0, 3).map(v => parseFloat(v));
    return Math.max(...p) - Math.min(...p) < 10;
  }
  const lch = c.match(/^oklch\(([^)]+)\)/);
  if (lch) return parseFloat(lch[1].trim().split(/\s+/)[1]) < 0.02;
  const lab = c.match(/^oklab\(([^)]+)\)/);
  if (lab) {
    const p = lab[1].replace('/', ' ').trim().split(/\s+/).map(Number);
    return Math.hypot(p[1] ?? 0, p[2] ?? 0) < 0.02;
  }
  const srgb = c.match(/^color\(srgb\s+([^)]+)\)/);
  if (srgb) {
    const p = srgb[1].trim().split(/\s+/).map(Number);
    return Math.max(...p.slice(0, 3)) - Math.min(...p.slice(0, 3)) < 0.02;
  }
  return false;
}

/* Debugging spec: modals + portals.
   - a DropdownMenu INSIDE a Modal must portal above the modal, and Escape
     must dismiss ONLY the menu (never the enclosing modal)
   - stacked modals close top-first and the lower modal survives */

test('dropdown inside a modal: Escape dismisses only the dropdown', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('menu-modal-open').click();
  const modal = page.getByRole('dialog');
  await expect(modal).toBeVisible();

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

/* Theme lab (roadmap 302): the modal shell carries the two axes and the
   accent band is a real tint, not a hardcoded colour. */
test('theme lab: accent chrome tints the modal header, neutral does not', async ({ page }) => {
  await page.goto('/');

  /* A menu opened from the coloured HEADER is fully themed (chrome context). */
  await page.getByTestId('theme-lab-header-menu-trigger').click();
  const headerMenu = page.locator('[role="menu"]');
  await expect(headerMenu).toHaveAttribute('data-theme', 'emerald');
  await page.keyboard.press('Escape');
  await expect(page.locator('[role="menu"]')).toHaveCount(0, { timeout: 5000 });

  await page.getByTestId('theme-lab-open').click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toHaveAttribute('data-mode', 'dark');
  await expect(dialog).toHaveAttribute('data-accent', 'emerald');
  await expect(dialog).toHaveAttribute('data-surface', 'accent');
  const accentBg = await page.getByTestId('modal-header').evaluate(el => getComputedStyle(el).backgroundColor);

  /* A menu opened INSIDE the modal stays light/dark — only its accent States
     are themed (surface context). */
  await page.getByTestId('theme-lab-modal-menu-trigger').click();
  const modalMenu = page.locator('[role="menu"]');
  await expect(modalMenu).toHaveAttribute('data-mode', 'dark');
  await expect(modalMenu).toHaveAttribute('data-accent', 'emerald');
  await expect(modalMenu).not.toHaveAttribute('data-theme');
  await page.keyboard.press('Escape');
  await expect(page.locator('[role="menu"]')).toHaveCount(0, { timeout: 5000 });

  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0, { timeout: 5000 });
  await page.getByTestId('theme-chrome-toggle').click();
  await page.getByTestId('theme-lab-open').click();
  await expect(page.getByRole('dialog')).toHaveAttribute('data-surface', 'neutral');
  const neutralBg = await page.getByTestId('modal-header').evaluate(el => getComputedStyle(el).backgroundColor);

  expect(accentBg).not.toBe(neutralBg);

  /* EXACT CASE: accent = none (zinc). Nothing inside the modal may carry a
     chromatic accent; red danger actions are deliberately excluded. */
  await page.keyboard.press('Escape');
  await page.getByTestId('theme-accent-zinc').click();
  await page.getByTestId('theme-lab-open').click();
  const zincDialog = page.getByRole('dialog');
  await expect(zincDialog).toHaveAttribute('data-accent', 'zinc');
  const colours = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"]')!;
    const body = dialog.querySelector('[data-testid="theme-lab-modal-body"]')!;
    const byText = (t: string) => [...dialog.querySelectorAll('button')].find(b => b.textContent?.trim() === t);
    const grab = (el: Element | null | undefined) => el ? getComputedStyle(el).backgroundColor : null;
    return [
      grab(dialog.querySelector('[data-testid="modal-body"]')),
      grab(body.querySelector('.ui-card')),
      grab(body.querySelector('.ui-card > div:first-child')),
      grab(byText('Add scene')),
      grab(byText('Save day')),
      grab(body.querySelector('[role="group"] span[aria-hidden]')),
      grab(body.querySelector('.ui-checklist-item-checked')),
      grab([...body.querySelectorAll('button')].find(b => /Remove/.test(b.getAttribute('aria-label') || ''))),
    ].filter((x): x is string => !!x);
  });
  for (const c of colours) expect(isNeutral(c), c).toBe(true);
});

test('theme lab: light mode renders a light shell', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('theme-mode-light').click();
  await page.getByTestId('theme-accent-zinc').click();
  await page.getByTestId('theme-chrome-toggle').click();
  await page.getByTestId('theme-lab-open').click();

  const dialog = page.getByRole('dialog');
  await expect(dialog).toHaveAttribute('data-mode', 'light');
  await expect(dialog).toHaveAttribute('data-accent', 'zinc');
  await expect(page.getByTestId('modal-body')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  await expect(page.getByTestId('modal-header')).toHaveCSS('background-color', 'rgb(250, 250, 250)');
});
