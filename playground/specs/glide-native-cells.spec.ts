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
type Bounds = Point & { width: number; height: number };
type NativeFn = 'chevronCenter' | 'glyphCenter' | 'cellBounds';

/** A point (or rect) from the page's grid-geometry helper. */
async function nativePoint(
  page: Page,
  fn: NativeFn,
  row: number,
  colKey: string,
  ...rest: number[]
): Promise<Bounds> {
  const point = await page.evaluate(({ fn, row, colKey, rest }) => {
    const api = (window as unknown as { __glideNativeCells?: Record<string, (...args: unknown[]) => unknown> }).__glideNativeCells;
    if (!api?.[fn]) throw new Error(`no __glideNativeCells.${fn}`);
    return api[fn](row, colKey, ...rest) as Bounds | null;
  }, { fn, row, colKey, rest });
  if (!point) throw new Error(`${fn}(${row}, ${colKey}) returned no point`);
  return point;
}

/** A point that stayed put across two polls. The canvas repaints a beat after
 *  React commits (a row ADD, first paint after navigation), and a point read
 *  from those stale painted offsets can miss the cell. */
async function stableNativePoint(
  page: Page,
  fn: NativeFn,
  row: number,
  colKey: string,
  ...rest: number[]
): Promise<Bounds> {
  let previous = '';
  let point: Bounds = { x: 0, y: 0, width: 0, height: 0 };
  await expect.poll(async () => {
    const next = await nativePoint(page, fn, row, colKey, ...rest);
    const key = `${next.x},${next.y},${next.width},${next.height}`;
    const stable = key === previous;
    previous = key;
    point = next;
    return stable;
  }, { timeout: 3000 }).toBe(true);
  return point;
}

const sheetCanvas = (page: Page, sheet: 'breakdown' | 'crew') =>
  page.locator(`[data-glide-native-${sheet}] canvas`).first();

async function pickerOverlay(page: Page) {
  return page.locator('[data-glide-overlay-layer] [data-picker-field]').first();
}

test.describe('Glide canvas-native cell controls', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#glide-native-cells');
    await expect(page.getByTestId('glide-native-cells-demo')).toBeVisible();
  });

  test('the painted chevron lane opens the picker and commits', async ({ page }) => {
    const lane = await stableNativePoint(page, 'chevronCenter', 0, 'cast');
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
    const cell = await stableNativePoint(page, 'cellBounds', 0, 'cast');
    await page.mouse.click(cell.x + 10, cell.y + cell.height / 2);

    // The picker focuses its own field on open — the canvas keeping focus is
    // the proof this click only SELECTED the cell.
    await expect(page.locator('[data-glide-overlay-layer] [data-picker-field]')).toHaveCount(0);
    await expect(sheetCanvas(page, 'breakdown')).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(await pickerOverlay(page)).toBeVisible();
  });

  test('double-click opens the editor', async ({ page }) => {
    const cell = await stableNativePoint(page, 'cellBounds', 1, 'location');
    await page.mouse.dblclick(cell.x + 10, cell.y + cell.height / 2);
    await expect(await pickerOverlay(page)).toBeVisible();
    await expect(page.locator('#search-menu-panel')).toBeVisible();
  });

  test('the trash segment fires once on click and keeps grid focus', async ({ page }) => {
    const trash = await stableNativePoint(page, 'glyphCenter', 0, 'actions', 1, 2);
    await page.mouse.click(trash.x, trash.y);

    await expect(page.getByTestId('glide-native-cells-rows')).toHaveText('59 scenes');
    await expect(page.getByTestId('glide-native-cells-clicks')).toHaveText('clicks: 1');
    await expect(page.getByTestId('glide-native-cells-status')).toHaveText('removed scene 1');
    await expect(sheetCanvas(page, 'breakdown')).toBeFocused();
  });

  test('Enter on the action cell fires its primary button exactly once', async ({ page }) => {
    const scene = await stableNativePoint(page, 'cellBounds', 1, 'sceneNumber');
    await page.mouse.click(scene.x + 20, scene.y + scene.height / 2);
    await expect(sheetCanvas(page, 'breakdown')).toBeFocused();

    // Arrow onto the split action cell, then activate with the keyboard.
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('Enter');

    await expect(page.getByTestId('glide-native-cells-clicks')).toHaveText('clicks: 1');
    await expect(page.getByTestId('glide-native-cells-rows')).toHaveText('61 scenes');
    await expect(page.getByTestId('glide-native-cells-status')).toHaveText('scene inserted after row');
    await expect(sheetCanvas(page, 'breakdown')).toBeFocused();
  });

  test('crew card: Add role appends, and the new row’s painted trash works', async ({ page }) => {
    await page.getByTestId('glide-native-cells-zone').getByRole('button', { name: 'Embedded', exact: true }).click();
    await expect(page.getByTestId('glide-native-crew-card')).toBeVisible();

    await page.getByTestId('glide-native-cells-add').click();
    await expect(page.getByTestId('glide-native-cells-rows')).toHaveText('4 crew');
    await page.getByTestId('glide-native-crew-card').scrollIntoViewIfNeeded();

    const trash = await stableNativePoint(page, 'glyphCenter', 3, 'actions');
    await page.mouse.click(trash.x, trash.y);
    await expect(page.getByTestId('glide-native-cells-rows')).toHaveText('3 crew');
    await expect(page.getByTestId('glide-native-cells-status')).toHaveText('removed Camera Operator');
    await expect(page.getByTestId('glide-native-cells-clicks')).toHaveText('clicks: 1');
  });

  test('single cell: typing then Enter commits through the host', async ({ page }) => {
    await page.goto('/#glide-single-cell');
    await expect(page.getByTestId('glide-single-cell-demo')).toBeVisible();
    // The page registers its helper + the grid API after mount.
    const readCell = () => page.evaluate(() => {
      const api = (window as unknown as { __glideSingleCell?: { cellBounds: (row: number, colKey: string) => { x: number; y: number; width: number; height: number } | null } }).__glideSingleCell;
      return api?.cellBounds(0, 'value') ?? null;
    });
    // Poll until the grid has a real (finite, stable) rect: the first frames
    // report a 0-sized canvas, whose scale makes the bounds NaN.
    let cell: { x: number; y: number; width: number; height: number } | null = null;
    await expect.poll(async () => {
      const next = await readCell();
      const usable = !!next
        && [next.x, next.y, next.width, next.height].every(Number.isFinite)
        && next.width > 0;
      const stable = usable && !!cell
        && next!.x === cell.x && next!.y === cell.y && next!.width === cell.width;
      cell = usable ? next : null;
      return stable;
    }, { timeout: 3000 }).toBe(true);
    if (!cell) throw new Error('no single-cell bounds');

    // Double-click opens the overlay text editor; type the value and commit
    // with Enter (the same loop as typing into any Glide cell).
    await page.mouse.dblclick(cell.x + 20, cell.y + cell.height / 2);
    const editor = page.locator('[data-glide-overlay-layer] textarea');
    await expect(editor).toBeFocused();
    await editor.fill('SCENE 12');
    await expect(editor).toHaveValue('SCENE 12');
    await page.keyboard.press('Enter');

    await expect(page.getByTestId('glide-single-cell-value')).toHaveText('SCENE 12');
    await expect(page.getByTestId('glide-single-cell-commits')).toHaveText('1 commit');
    await expect(page.getByTestId('glide-single-cell-status')).toHaveText('committed “SCENE 12”');
  });

  test('the card inside a kit Modal: the lane opens the picker above the dialog', async ({ page }) => {
    await page.getByTestId('glide-native-cells-zone').getByRole('button', { name: 'Modal', exact: true }).click();
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();

    const lane = await stableNativePoint(page, 'chevronCenter', 0, 'reportTo');
    await page.mouse.click(lane.x, lane.y);
    await expect(await pickerOverlay(page)).toBeVisible();

    const panel = page.locator('#search-menu-panel');
    await expect(panel).toBeVisible();
    await panel.getByText('Unit Base — Battersea', { exact: true }).first().click();
    await expect(page.getByTestId('glide-native-cells-status')).toHaveText('report to → Unit Base — Battersea');
    await expect(dialog).toBeVisible();
  });
});
