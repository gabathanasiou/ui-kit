import { test, expect, Page } from '@playwright/test';

/* Canvas-native control cells (#glide-native-cells) — picker chevrons and
   glyph buttons painted on the canvas, with no DOM box.

   The canvas is not queryable, so the page exposes a dev-only helper computed
   from the grid's own `getBounds` (window.__glideNativeCells) and the spec
   drives REAL pointer events at those points. What is asserted is the wiring
   the canvas cannot show: which click path opened the picker, that a body click
   does not, that Enter fires a glyph exactly once with the canvas still focused,
   and that commits reach the host. The paint itself stays a manual check. */

type Point = { x: number; y: number };

/** A point (or rect) from the page's grid-geometry helper. */
async function nativePoint(
  page: Page,
  fn: 'chevronCenter' | 'glyphCenter' | 'cellBounds',
  row: number,
  colKey: string,
  ...rest: number[]
): Promise<Point & { width?: number; height?: number }> {
  const point = await page.evaluate(({ fn, row, colKey, rest }) => {
    const api = (window as unknown as { __glideNativeCells?: Record<string, (...args: unknown[]) => unknown> }).__glideNativeCells;
    if (!api?.[fn]) throw new Error(`no __glideNativeCells.${fn}`);
    return api[fn](row, colKey, ...rest) as Point | null;
  }, { fn, row, colKey, rest });
  if (!point) throw new Error(`${fn}(${row}, ${colKey}) returned no point`);
  return point;
}

async function pickerOverlay(page: Page) {
  return page.locator('[data-glide-overlay-layer] [data-picker-field]').first();
}

test.describe('Glide canvas-native cell controls', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#glide-native-cells');
    await expect(page.getByTestId('glide-native-cells-demo')).toBeVisible();
  });

  test('the painted chevron lane opens the picker and commits', async ({ page }) => {
    const lane = await nativePoint(page, 'chevronCenter', 0, 'cast');
    await page.mouse.click(lane.x, lane.y);

    const overlay = await pickerOverlay(page);
    await expect(overlay.locator('input')).toHaveValue('1. GEORGE');
    const panel = page.locator('#search-menu-panel');
    await expect(panel).toBeVisible();
    await panel.getByText('2. MARY', { exact: true }).first().click();

    await expect(page.getByTestId('glide-native-cells-status')).toHaveText('cast → 2. MARY');
    await expect(page.getByTestId('glide-native-cells-commits')).toHaveText('1 commit');
  });

  test('a body click selects without an editor; Enter then opens the picker', async ({ page }) => {
    const cell = await nativePoint(page, 'cellBounds', 0, 'cast');
    await page.mouse.click(cell.x + 10, cell.y + (cell.height ?? 0) / 2);

    // The picker focuses its own field on open — the canvas keeping focus is
    // the proof this click only SELECTED the cell.
    await expect(page.locator('[data-glide-overlay-layer] [data-picker-field]')).toHaveCount(0);
    expect(await page.evaluate(() => document.activeElement?.tagName)).toBe('CANVAS');

    await page.keyboard.press('Enter');
    await expect(await pickerOverlay(page)).toBeVisible();
  });

  test('double-click opens the editor', async ({ page }) => {
    const cell = await nativePoint(page, 'cellBounds', 1, 'location');
    await page.mouse.dblclick(cell.x + 10, cell.y + (cell.height ?? 0) / 2);
    await expect(await pickerOverlay(page)).toBeVisible();
    await expect(page.locator('#search-menu-panel')).toBeVisible();
  });

  test('the trash segment fires once on click and keeps grid focus', async ({ page }) => {
    const trash = await nativePoint(page, 'glyphCenter', 0, 'actions', 1, 2);
    await page.mouse.click(trash.x, trash.y);

    await expect(page.getByTestId('glide-native-cells-rows')).toHaveText('59 scenes');
    await expect(page.getByTestId('glide-native-cells-clicks')).toHaveText('clicks: 1');
    await expect(page.getByTestId('glide-native-cells-status')).toHaveText('removed scene 1');
    expect(await page.evaluate(() => document.activeElement?.tagName)).toBe('CANVAS');
  });

  test('Enter on the action cell fires its primary button exactly once', async ({ page }) => {
    const scene = await nativePoint(page, 'cellBounds', 1, 'sceneNumber');
    await page.mouse.click(scene.x + 20, scene.y + (scene.height ?? 0) / 2);
    expect(await page.evaluate(() => document.activeElement?.tagName)).toBe('CANVAS');

    // Arrow onto the split action cell, then activate with the keyboard.
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('Enter');

    await expect(page.getByTestId('glide-native-cells-clicks')).toHaveText('clicks: 1');
    await expect(page.getByTestId('glide-native-cells-rows')).toHaveText('61 scenes');
    await expect(page.getByTestId('glide-native-cells-status')).toHaveText('scene inserted after row');
    expect(await page.evaluate(() => document.activeElement?.tagName)).toBe('CANVAS');
  });

  test('crew card: Add role appends, and the new row’s painted trash works', async ({ page }) => {
    await page.getByTestId('glide-native-cells-zone').getByRole('button', { name: 'Embedded', exact: true }).click();
    await expect(page.getByTestId('glide-native-crew-card')).toBeVisible();

    await page.getByTestId('glide-native-cells-add').click();
    await expect(page.getByTestId('glide-native-cells-rows')).toHaveText('4 crew');

    const trash = await nativePoint(page, 'glyphCenter', 3, 'actions');
    await page.mouse.click(trash.x, trash.y);
    await expect(page.getByTestId('glide-native-cells-rows')).toHaveText('3 crew');
    await expect(page.getByTestId('glide-native-cells-status')).toHaveText('removed Camera Operator');
    await expect(page.getByTestId('glide-native-cells-clicks')).toHaveText('clicks: 1');
  });

  test('the card inside a kit Modal: the lane opens the picker above the dialog', async ({ page }) => {
    await page.getByTestId('glide-native-cells-zone').getByRole('button', { name: 'Modal', exact: true }).click();
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();

    const lane = await nativePoint(page, 'chevronCenter', 0, 'reportTo');
    await page.mouse.click(lane.x, lane.y);
    await expect(await pickerOverlay(page)).toBeVisible();

    const panel = page.locator('#search-menu-panel');
    await expect(panel).toBeVisible();
    await panel.getByText('Unit Base — Battersea', { exact: true }).first().click();
    await expect(page.getByTestId('glide-native-cells-status')).toHaveText('report to → Unit Base — Battersea');
    await expect(dialog).toBeVisible();
  });
});
