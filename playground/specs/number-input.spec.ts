import { test, expect } from '@playwright/test';

/* NumberInput — the shared numeric box. Typing/clamping/steppers/arrow keys
   are covered per-case here; the mouse drag-scrub is the wiring a unit test
   can't reach (pointer capture + threshold + blur). */

const box = (page: import('@playwright/test').Page) => page.getByTestId('number-input-demo');
const input = (page: import('@playwright/test').Page) => page.getByLabel('Demo number');
const value = (page: import('@playwright/test').Page) => page.getByTestId('number-input-value');

test('steppers and arrow keys step, disabled at the bounds', async ({ page }) => {
  await page.goto('/');
  const inc = box(page).getByRole('button', { name: 'Increase' });
  const dec = box(page).getByRole('button', { name: 'Decrease' });

  await inc.click();
  await expect(value(page)).toHaveText('13');
  await dec.click();
  await dec.click();
  await expect(value(page)).toHaveText('11');

  await input(page).fill('24');
  await expect(inc).toBeDisabled();
  await input(page).press('ArrowDown');
  await expect(value(page)).toHaveText('23');

  await input(page).fill('0');
  await expect(dec).toBeDisabled();
  await input(page).press('ArrowUp');
  await expect(value(page)).toHaveText('1');
});

test('typing keeps the draft while the committed value clamps; Escape reverts', async ({ page }) => {
  await page.goto('/');
  await input(page).fill('99');
  await expect(value(page)).toHaveText('24');
  await expect(input(page)).toHaveValue('99');

  await input(page).press('Escape');
  await expect(input(page)).toHaveValue('24');
});

test('mouse drag scrubs the value and does not focus the box', async ({ page }) => {
  await page.goto('/');
  await input(page).scrollIntoViewIfNeeded();
  const rect = (await input(page).boundingBox())!;
  const cx = rect.x + rect.width / 2;
  const cy = rect.y + rect.height / 2;

  // A plain click focuses for typing and leaves the value alone.
  await page.mouse.move(cx, cy);
  await page.mouse.down();
  await page.mouse.up();
  await expect(input(page)).toBeFocused();
  await expect(value(page)).toHaveText('12');

  // Drag up 20px → +10 (2px per step), committed live, focus dropped.
  await page.mouse.move(cx, cy);
  await page.mouse.down();
  await page.mouse.move(cx, cy - 20, { steps: 10 });
  await expect(value(page)).toHaveText('22');
  await page.mouse.up();
  await expect(input(page)).not.toBeFocused();

  // Dragging back down follows the pointer from the committed value.
  await page.mouse.move(cx, cy);
  await page.mouse.down();
  await page.mouse.move(cx, cy + 20, { steps: 10 });
  await expect(value(page)).toHaveText('12');
  await page.mouse.up();
});
