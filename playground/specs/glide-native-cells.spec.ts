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

/** A stable point in one of the Single cells cards (they mount with the tab). */
async function singleCellPoint(page: Page, key: string, row: number, colKey: string): Promise<Point> {
  let previous = '';
  let point: Point = { x: 0, y: 0 };
  await expect.poll(async () => {
    const next = await page.evaluate(({ key, row, colKey }) => {
      const api = (window as unknown as { __glideNativeCells?: { singlePoint: (k: string, r: number, c: string) => Point | null } }).__glideNativeCells;
      return api?.singlePoint(key, row, colKey) ?? null;
    }, { key, row, colKey });
    const usable = !!next && Number.isFinite(next.x) && Number.isFinite(next.y);
    const stable = usable && !!previous && `${next!.x},${next!.y}` === previous;
    previous = usable ? `${next!.x},${next!.y}` : '';
    if (usable) point = next!;
    return stable;
  }, { timeout: 3000 }).toBe(true);
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

  test('single cells: typing + Enter commits, and the pop-out opens in its own window', async ({ page }) => {
    await page.getByTestId('glide-native-cells-zone').getByRole('button', { name: 'Single cells', exact: true }).click();
    await expect(page.getByTestId('glide-native-single-text')).toBeVisible();
    await expect(page.getByTestId('glide-native-cells-rows')).toHaveText('8 cells');

    // Double-click opens the overlay text editor; type the value and commit
    // with Enter (the same loop as typing into any Glide cell).
    const cell = await singleCellPoint(page, 'text', 0, 'value');
    await page.mouse.dblclick(cell.x, cell.y);
    const editor = page.locator('[data-glide-overlay-layer] textarea');
    await expect(editor).toBeFocused();
    await editor.fill('SCENE 12');
    await expect(editor).toHaveValue('SCENE 12');
    await page.keyboard.press('Enter');

    await expect(page.getByTestId('glide-native-single-text-value')).toHaveText('SCENE 12');
    await expect(page.getByTestId('glide-native-single-text-status')).toHaveText('1 commit');

    // The pop-out route (hidden from the rail) still opens a standalone window.
    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      page.getByTestId('glide-native-cells-popout').click(),
    ]);
    await expect(popup.getByTestId('glide-single-cell-demo')).toBeVisible();
    await expect(popup.getByTestId('glide-native-single-text')).toBeVisible();
    await popup.close();
  });

  test('single cells: arrow keys move between rows and columns', async ({ page }) => {
    await page.getByTestId('glide-native-cells-zone').getByRole('button', { name: 'Single cells', exact: true }).click();

    // Rows: select row 1, ArrowDown to row 2, Enter edits it in place. Scroll
    // the card in first — the sheet is below the fold on the iPad viewport and
    // a click outside it never focuses the canvas.
    const rowsCard = page.getByTestId('glide-native-single-rows');
    await rowsCard.scrollIntoViewIfNeeded();
    const row0 = await singleCellPoint(page, 'rows', 0, 'value');
    await page.mouse.click(row0.x, row0.y);
    await expect(page.locator('[data-glide-single-rows] canvas').first()).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    const editor = page.locator('[data-glide-overlay-layer] textarea');
    await expect(editor).toBeFocused();
    await editor.fill('SECOND');
    await page.keyboard.press('Enter');
    await expect(page.getByTestId('glide-native-single-rows-value')).toContainText('SECOND');
    await expect(page.getByTestId('glide-native-single-rows-value')).toContainText('Scene 3');
    await expect(page.getByTestId('glide-native-single-rows-status')).toHaveText('row 2 → SECOND');

    // Columns: select Scene, ArrowRight to Pages, Enter edits that cell.
    const columnsCard = page.getByTestId('glide-native-single-columns');
    await columnsCard.scrollIntoViewIfNeeded();
    const scene = await singleCellPoint(page, 'columns', 0, 'scene');
    await page.mouse.click(scene.x, scene.y);
    await expect(page.locator('[data-glide-single-columns] canvas').first()).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter');
    await expect(editor).toBeFocused();
    await editor.fill('3 1/8');
    await page.keyboard.press('Enter');
    await expect(page.getByTestId('glide-native-single-columns-value')).toContainText('3 1/8');
    await expect(page.getByTestId('glide-native-single-columns-status')).toHaveText('pages → 3 1/8');
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
