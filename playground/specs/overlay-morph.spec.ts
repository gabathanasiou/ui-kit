import { test, expect } from '@playwright/test';

/* Debugging spec: useOverlayMorph clone panels (the app DropdownPanel
   pattern — panel + cloneOnUnmount).

   Bug A (dev StrictMode): React double-mounts every mount
   (ref node → null → node); the spurious null used to make the controller
   play a PHANTOM close clone while the panel opens — visible from the 2nd
   open onward (the first open's clone had no cached rect and was invisible).

   Bug B (regression risk): the close clone must be pinned at the PANEL'S
   rect — never at the view origin (0,0). */

/** Samples computed transform of `selector` for `ms` — polls so it picks the
 *  element up whenever it mounts (the panel is conditional). */
async function sampleTransforms(page: import('@playwright/test').Page, selector: string, ms: number) {
  return page.evaluate(({ selector, ms }) => new Promise<string[]>(resolve => {
    const samples: string[] = [];
    const start = performance.now();
    const tick = () => {
      const el = document.querySelector(selector);
      if (el) samples.push(getComputedStyle(el).transform);
      if (performance.now() - start < ms) requestAnimationFrame(tick);
      else resolve(samples);
    };
    requestAnimationFrame(tick);
  }), { selector, ms });
}

test('reopening the panel does not spawn a phantom close clone', async ({ page }) => {
  await page.goto('/');
  const t = page.getByTestId('panel-trigger');

  // open 1
  await t.click();
  await expect(page.getByTestId('panel')).toBeAttached();
  await page.waitForTimeout(400);

  // close 1 (clone close — the real close morph)
  await t.click();
  await page.waitForTimeout(600);
  await expect(page.getByTestId('panel')).toHaveCount(0);

  // open 2 — the bug: a phantom [data-morph-clone] was created the instant
  // the live panel mounted
  await t.click();
  await page.waitForTimeout(120); // the phantom lives for its full morph + removal
  const live = await page.getByTestId('panel').count();
  const clones = await page.locator('[data-morph-clone]').count();
  expect(live, 'exactly one live panel').toBe(1);
  expect(clones, 'no phantom clone during the open').toBe(0);

  // and it settles cleanly
  await page.waitForTimeout(400);
  await expect(page.getByTestId('panel')).toHaveCount(1);
  await expect(page.locator('[data-morph-clone]')).toHaveCount(0);
});

test('the close clone is pinned at the panel rect, never at the view origin', async ({ page }) => {
  await page.goto('/');
  const t = page.getByTestId('panel-trigger');

  await t.click();
  await page.waitForTimeout(400);
  const panelLeft = await page.getByTestId('panel').evaluate(el => parseInt(el.style.left, 10));
  const panelTop = await page.getByTestId('panel').evaluate(el => parseInt(el.style.top, 10));

  // close — a clone appears pinned exactly where the panel was (its inline
  // left/top carry the pinned position; the transform mid-morph only scales
  // the box around the origin)
  await t.click();
  const clone = page.locator('[data-morph-clone]').first();
  await expect(clone).toBeAttached();
  const cloneLeft = await clone.evaluate(el => parseInt(el.style.left, 10));
  const cloneTop = await clone.evaluate(el => parseInt(el.style.top, 10));
  expect(cloneLeft, 'clone pins the panel left').toBe(panelLeft);
  expect(cloneTop, 'clone pins the panel top').toBe(panelTop);
  // and it is NEVER at the view origin
  expect(cloneLeft).toBeGreaterThan(10);
  expect(cloneTop).toBeGreaterThan(10);
});

test('the close clone shrinks toward the anchor, not the far corner', async ({ page }) => {
  /* The panel's trigger sits ABOVE the panel: the shrink origin must be the
     anchor-facing edge (top), not the far corner. A bottom-right origin
     (100% 100%) makes the clone visibly slide right as it scales down —
     the detached-node trap (the origin used to be computed from the live
     node's zero rect, which pinned the far corner). */
  await page.goto('/');
  const t = page.getByTestId('panel-trigger');

  await t.click();
  await page.waitForTimeout(400);
  await t.click();
  const clone = page.locator('[data-morph-clone]').first();
  await expect(clone).toBeAttached();
  const origin = await clone.evaluate(el => el.style.transformOrigin);
  expect(origin).not.toBe('100% 100%');
  expect(origin).toMatch(/^(0%|50%) 0%$/);
});

test('open and close morphs animate (transform frames mid-flight)', async ({ page }) => {
  await page.goto('/');
  const t = page.getByTestId('panel-trigger');

  const openSamplesP = sampleTransforms(page, '[data-testid="panel"]', 320);
  await t.click();
  const openSamples = await openSamplesP;
  expect(openSamples.length).toBeGreaterThan(3);
  expect(openSamples.some(s => s !== 'none'), 'open morph animates').toBe(true);
  await page.waitForTimeout(300);

  const closeSamplesP = sampleTransforms(page, '[data-morph-clone]', 320);
  await t.click();
  const closeSamples = await closeSamplesP;
  expect(closeSamples.length).toBeGreaterThan(3);
  expect(closeSamples.some(s => s !== 'none'), 'close morph animates').toBe(true);
});
