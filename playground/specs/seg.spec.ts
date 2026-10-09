import { test, expect } from '@playwright/test';

/* Seg variant="track" — the padded-track segmented control. The sliding pill
   is pure layout (measured active segment + transform transition), so the
   specs assert the pill lands on the active segment and the button semantics
   are right; FloatingToggle covers the three-state frame class changes. */

test('track variant: pill follows the active segment (stretch, dark)', async ({ page }) => {
  await page.goto('/');
  const seg = page.getByTestId('seg-track-dark').locator('[role="group"]');
  const pill = seg.locator('span[aria-hidden]');
  const target = seg.getByRole('button', { name: 'Department precalls' });

  const first = (await pill.boundingBox())!;
  await target.click();
  await expect.poll(async () => {
    const p = (await pill.boundingBox())!;
    const b = (await target.boundingBox())!;
    return Math.round(Math.abs(p.x - b.x));
  }).toBeLessThan(2);
  const moved = (await pill.boundingBox())!;
  expect(moved.x).toBeGreaterThan(first.x);

  await expect(target).toHaveAttribute('aria-pressed', 'true');
  await expect(seg.getByRole('button', { name: 'Call stages' })).toHaveAttribute('aria-pressed', 'false');
});

test('track variant: light toolbar palette + pressed state', async ({ page }) => {
  await page.goto('/');
  const seg = page.getByTestId('seg-track-light').locator('[role="group"]');
  const events = seg.getByRole('button', { name: 'Events' });
  await events.click();
  await expect(events).toHaveAttribute('aria-pressed', 'true');
  await expect(seg.getByRole('button', { name: 'Strips' })).toHaveAttribute('aria-pressed', 'false');
  await expect(page.getByTestId('seg-light-toggle')).toHaveClass(/bg-blue-50/);
});

test('track variant: tablist semantics (role=tab + aria-selected)', async ({ page }) => {
  await page.goto('/');
  const seg = page.getByTestId('seg-tablist').getByRole('tablist', { name: 'Crew links view' });
  const people = seg.getByRole('tab', { name: 'People' });
  const positions = seg.getByRole('tab', { name: 'Positions' });
  await expect(people).toHaveAttribute('aria-selected', 'true');
  await positions.click();
  await expect(positions).toHaveAttribute('aria-selected', 'true');
  await expect(people).toHaveAttribute('aria-selected', 'false');
});

test('FloatingToggle toggles its lit frame and pressed state', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByTestId('floating-toggle-demo').getByRole('button', { name: 'Demo floating toggle' });
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await expect(toggle).toHaveCSS('background-color', 'rgba(255, 255, 255, 0.94)');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await expect(toggle).toHaveCSS('background-color', 'rgb(37, 99, 235)');
});

test('Checklist trailing check + per-row dataProps', async ({ page }) => {
  await page.goto('/');
  const row = page.getByTestId('checklist-trailing').locator('[data-demo-person="p1"]');
  await expect(row).toHaveAttribute('aria-pressed', 'false');
  await row.click();
  await expect(row).toHaveAttribute('aria-pressed', 'true');
});
