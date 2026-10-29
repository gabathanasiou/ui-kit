import { test, expect, Page } from '@playwright/test';

/* Glide data grid — the playground's Data grid section.
   The canvas is not queryable, so these cases cover the WIRING that is: real
   kit controls mounted over cells (`domCells`), their panels, and the
   one-commit contract the host sees. Canvas painting is checked by eye. */

const crewCell = (page: Page, row: number) =>
  page.locator('[data-glide-crew] [data-glide-dom-layer] [data-glide-dom-cell]').nth(row);

// Each row mounts three DOM cells: kit button, morph search, text box.
const buttonCell = (page: Page, colKey: 'search' | 'add', row: number) =>
  page.locator('[data-glide-button-sheet] [data-glide-dom-layer] [data-glide-dom-cell]').nth(row * 3 + (colKey === 'search' ? 1 : 2));

test.describe('Glide data grid', () => {
  test('crew card: the DOM dropdown button opens the cell editor like a double click', async ({ page }) => {
    await page.goto('/#glide');
    const trigger = page.getByTestId('glide-crew-person-open-crew-a');
    await expect(trigger).toHaveAttribute('aria-label', /JOHN DOE/);

    await trigger.click();
    // The overlay editor is the double-click path: seeded with the current
    // name, with the kit picker panel under it.
    const overlay = page.locator('[data-glide-overlay-layer] [data-picker-field]').first();
    await expect(overlay.locator('input')).toHaveValue('JOHN DOE');
    const panel = page.locator('#search-menu-panel');
    await expect(panel).toBeVisible();
    await panel.getByText('MAKIS GOUDOUMIS', { exact: true }).first().click();

    await expect(page.getByTestId('glide-crew-status')).toHaveText('1 cell in one commit');
    await expect(page.getByTestId('glide-crew-commits')).toHaveText('1 commits');
  });

  test('Enter activates a DOM button and keeps the grid selection', async ({ page }) => {
    await page.goto('/#glide');
    const gallery = page.locator('[data-glide-gallery-sheet] canvas').first();
    await gallery.scrollIntoViewIfNeeded();
    const box = await gallery.boundingBox();
    if (!box) throw new Error('no gallery canvas');
    await page.mouse.click(box.x + 50, box.y + 32 + 17);
    // The click must land before the arrow keys: the canvas takes focus on
    // mousedown, and a key pressed in between is swallowed (one lost step).
    await expect(gallery).toBeFocused();
    for (let i = 0; i < 5; i++) await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter');

    await expect(page.getByTestId('glide-gallery-clicks')).toHaveText('clicks: 1');
    await expect(page.getByTestId('glide-gallery-last')).toHaveText('last: row 1 · Approve');
    // The action fires, but focus stays on the canvas: no DOM focus ring,
    // the selection rectangle stays put.
    expect(await page.evaluate(() => document.activeElement?.tagName)).toBe('CANVAS');
    expect(await page.evaluate(() => !!document.activeElement?.closest?.('[data-glide-dom-layer]'))).toBe(false);
  });

  test('cell layouts: a DOM cell hosts an arranged row of real controls', async ({ page }) => {
    await page.goto('/#glide');
    const card = page.getByTestId('glide-layouts-demo');
    const cells = card.locator('[data-glide-dom-cell]');
    await expect(cells).toHaveCount(4);

    const actions = cells.nth(0);
    await expect(actions.getByRole('button')).toHaveCount(3);
    await actions.getByRole('button', { name: 'Approve' }).click();
    await expect(page.getByTestId('glide-layout-status')).toHaveText('last: approved row 1');

    // The morph field shares a cell with the adder, each with its own trigger.
    const searchCell = cells.nth(1);
    await expect(searchCell.locator('[data-morph-search-trigger]')).toHaveCount(2);
  });

  test('field cells: morph-to-search lives in the cell and submits in place', async ({ page }) => {
    await page.goto('/#glide');
    const cell = buttonCell(page, 'search', 0);
    const root = cell.locator('[data-morph-search]').first();

    await expect(root).toHaveAttribute('data-expanded', 'false');
    await root.locator('[data-morph-search-trigger]').click();
    await expect(root).toHaveAttribute('data-expanded', 'true');
    await expect(root.locator('[data-morph-search-input]')).toBeFocused();

    await root.locator('[data-morph-search-input]').fill('diner');
    await page.keyboard.press('Enter');

    await expect(root).toHaveAttribute('data-expanded', 'false');
    await expect(page.getByTestId('glide-buttons-status')).toHaveText('last: search “diner”');
    await expect(cell).toContainText('Search: diner');
  });

  test('breakdown: the frozen Scene # still opens its editor after scrolling sideways', async ({ page }) => {
    await page.goto('/#breakdown');
    const canvas = page.locator('[data-glide-breakdown-sheet] canvas').first();
    await canvas.scrollIntoViewIfNeeded();
    const box = await canvas.boundingBox();
    if (!box) throw new Error('no breakdown canvas');

    // Scroll the sheet far enough that Scene # would be long gone if it were
    // not frozen (marker gutter 44 + actions 36, then Scene #).
    const scroller = page.locator('[data-glide-breakdown-sheet] .dvn-scroller');
    await scroller.evaluate(el => { el.scrollLeft = 600; });
    await expect.poll(() => scroller.evaluate(el => el.scrollLeft)).toBe(600);

    await page.mouse.dblclick(box.x + 44 + 36 + 30, box.y + 34 + 17);
    // The editor opens on the FROZEN cell: its value is the first scene number.
    await expect(page.locator('[data-glide-overlay-layer] textarea').first()).toHaveValue('1');
    await page.keyboard.press('Escape');
  });

  test('breakdown: header cells are real buttons and cycle the sort', async ({ page }) => {
    await page.goto('/#breakdown');
    const pages = page.getByTestId('breakdown-sort-pages');
    await expect(pages).toHaveAttribute('data-sort', 'none');

    await pages.click();
    await expect(pages).toHaveAttribute('data-sort', 'asc');
    await expect(pages).toHaveAttribute('aria-label', 'Sort by Pages (ascending)');

    await pages.click();
    await expect(pages).toHaveAttribute('data-sort', 'desc');

    await pages.click();
    await expect(pages).toHaveAttribute('data-sort', 'none');
  });

  test('breakdown: DOM cells and header controls stay glued to a fast scroll', async ({ page }) => {
    await page.goto('/#breakdown');
    // Frozen columns off: the Actions column now lives in the scrolling band, so
    // a sideways fling moves it; the header band moves too.
    await page.getByTestId('breakdown-freeze').getByRole('button', { name: 'Off', exact: true }).click();
    await expect(page.locator('[data-glide-dom-cell="0:3"]')).toHaveAttribute('data-glide-dom-band', 'body');

    // Scripted fling: scroll, then read the control's screen position in the
    // SAME frame. A control that is pinned from painted (one-frame-old) offsets
    // drifts behind the scroll by exactly the step; a glued one tracks it.
    const drift = await page.evaluate(async () => {
      const scroller = document.querySelector<HTMLElement>('[data-glide-breakdown-sheet] .dvn-scroller');
      const trash = document.querySelector<HTMLElement>('[data-glide-dom-cell="0:3"]');
      const header = document.querySelector<HTMLElement>('[data-glide-dom-header="2"]');
      if (!scroller || !trash || !header) throw new Error('grid not ready');
      const frame = () => new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      const startX = scroller.scrollLeft;
      const startY = scroller.scrollTop;
      const trashStart = trash.getBoundingClientRect();
      const headerStart = header.getBoundingClientRect();
      let worst = 0;
      for (let step = 1; step <= 10; step++) {
        scroller.scrollLeft = startX + step * 12;
        scroller.scrollTop = startY + step * 12;
        await frame();
        // Compare against the offset that ACTUALLY landed (the iPad viewport
        // clamps the vertical range before the last step).
        const dx = scroller.scrollLeft - startX;
        const dy = scroller.scrollTop - startY;
        const t = trash.getBoundingClientRect();
        const h = header.getBoundingClientRect();
        worst = Math.max(
          worst,
          Math.abs(trashStart.x - dx - t.x),
          Math.abs(trashStart.y - dy - t.y),
          Math.abs(headerStart.x - dx - h.x),
        );
      }
      return worst;
    });
    expect(drift).toBeLessThan(2);
  });

  test('breakdown: it is a full page, and Back returns to the showroom', async ({ page }) => {
    await page.goto('/#breakdown');
    await expect(page.getByTestId('glide-breakdown-demo')).toBeVisible();
    // Full page = the showroom chrome is gone, not just scrolled away.
    await expect(page.locator('.pg-topbar')).toHaveCount(0);
    await expect(page.locator('.pg-nav')).toHaveCount(0);

    await page.getByTestId('breakdown-back').click();
    await expect(page.locator('.pg-topbar')).toBeVisible();
    await expect(page).toHaveURL(/#glide$/);
  });

  test('breakdown: Add scene and Undo each land as ONE commit', async ({ page }) => {
    await page.goto('/#breakdown');
    const count = page.getByTestId('breakdown-scene-count');
    const start = Number((await count.textContent())?.match(/\d+/)?.[0]);
    const add = page.getByTestId('breakdown-add-scene');
    const scroller = page.locator('[data-glide-breakdown-sheet] .dvn-scroller');
    await add.scrollIntoViewIfNeeded();

    await add.click();
    await expect(count).toHaveText(`${start + 1} scenes`);
    await expect(page.getByTestId('breakdown-commits')).toHaveText('1 commit');

    // The appended row is real: scrolling to it mounts its DOM control. (A
    // mounted-cell window that isn't rebuilt on the row-count change left the
    // new row without a trash button.)
    await scroller.evaluate(el => { el.scrollTop = el.scrollHeight; });
    const newRow = page.locator(`[data-glide-dom-cell="0:${start}"]`);
    await expect(newRow).toBeVisible();
    await expect(newRow.locator('button')).toBeVisible();

    await page.getByTestId('breakdown-undo').click();
    await expect(count).toHaveText(`${start} scenes`);
    await expect(page.locator(`[data-glide-dom-cell="0:${start}"]`)).toHaveCount(0);
  });

  test('field cells: the create/text box lives in the cell and submits in place', async ({ page }) => {
    await page.goto('/#glide');
    const cell = buttonCell(page, 'add', 1);
    const root = cell.locator('[data-morph-search]').first();

    await root.locator('[data-morph-search-trigger]').click();
    await expect(root.locator('[data-morph-search-input]')).toBeFocused();
    await root.locator('[data-morph-search-input]').fill('Camera');
    await page.keyboard.press('Enter');

    await expect(page.getByTestId('glide-buttons-status')).toHaveText('last: added “Camera”');
    await expect(cell).toContainText('Add: Camera');
  });
});
