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
  /* The pressed mirror follows the PAGE's project accent (the playground runs
     emerald by default): in light mode `--ui-btn-active-bg` resolves to the
     accent's 200 tint, not the legacy scope-less blue-50. */
  await expect(page.getByTestId('seg-light-toggle')).toHaveCSS('background-color', 'rgb(167, 243, 208)');
});

test('track variant: blue + emerald project-chrome palettes', async ({ page }) => {
  await page.goto('/');
  const blue = page.getByTestId('seg-track-blue').locator('[role="group"]');
  const emerald = page.getByTestId('seg-track-emerald').locator('[role="group"]');
  await expect(blue.locator('span[aria-hidden]')).toHaveCSS('background-color', 'rgb(23, 37, 84)');
  await expect(blue.getByRole('button', { name: 'Strips' })).toHaveCSS('color', 'rgb(239, 246, 255)');
  await expect(emerald.locator('span[aria-hidden]')).toHaveCSS('background-color', 'rgb(2, 44, 34)');
  await expect(emerald.getByRole('button', { name: 'Strips' })).toHaveCSS('color', 'rgb(236, 253, 245)');
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

test('track variant: icon-collapse labels (tab face) — collapsed at rest, reveal on hover, selected stays open', async ({ page }, testInfo) => {
  await page.goto('/');
  const seg = page.getByTestId('seg-icon-collapse').locator('[role="group"]');
  const labelWidths = () => seg.locator('[data-kit-label]').evaluateAll(els =>
    els.map(el => Math.round(el.getBoundingClientRect().width)));
  const strips = seg.getByRole('button', { name: 'Strips view' });
  const events = seg.getByRole('button', { name: 'Events view' });

  // Selected segment shows its label; the others collapse to their icon.
  const rest = await labelWidths();
  expect(rest[0]).toBeGreaterThan(20);
  expect(rest[1]).toBe(0);

  // Hover reveals the label without changing the selection. Touch devices have
  // no hover: there the tap-select path below is the contract (a tap selects,
  // and the selected segment keeps its label open).
  if (!testInfo.project.name.includes('ipad')) {
    await events.hover();
    await expect.poll(async () => (await labelWidths())[1]).toBeGreaterThan(20);
    await expect(events).toHaveAttribute('aria-pressed', 'false');
  }

  // Selecting keeps the label open and collapses the previous one.
  await events.click();
  await expect(events).toHaveAttribute('aria-pressed', 'true');
  await expect(strips).toHaveAttribute('aria-pressed', 'false');
  await expect.poll(async () => (await labelWidths())[1]).toBeGreaterThan(20);
  await expect.poll(async () => (await labelWidths())[0]).toBe(0);

  // SWAP face (`iconWithLabel={false}`): icons at rest, TEXT ONLY while hovered
  // (the icon collapses into a 0-width column) and for the selected segment.
  const swap = page.getByTestId('seg-icon-swap').locator('[role="group"]');
  const swapEvents = swap.getByRole('button', { name: 'Events view' });
  const swapLabelWidth = () => swapEvents.locator('[data-kit-label]')
    .evaluate(el => Math.round(el.getBoundingClientRect().width));
  const swapIconWidth = () => swapEvents.locator('[data-kit-icon]')
    .evaluate(el => Math.round(el.getBoundingClientRect().width));
  if (!testInfo.project.name.includes('ipad')) {
    await page.mouse.move(0, 0);
    await expect.poll(swapLabelWidth).toBe(0);
    await swapEvents.hover();
    await expect.poll(swapLabelWidth).toBeGreaterThan(20);
    await expect.poll(swapIconWidth).toBe(0);
  }
});
