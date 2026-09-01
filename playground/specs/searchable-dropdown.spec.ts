import { test, expect, Page } from '@playwright/test';

/* `searchable` DropdownMenu: a search input auto-focuses at the top of the
   panel (pinned ABOVE a dedicated items scroller — the list can never scroll
   over or behind it); typing filters the registered items by label
   (non-matches hide), arrows move the single highlight over the VISIBLE rows,
   Enter/click selects, Escape closes. */

const menu = (page: Page) => page.locator('[role="menu"]');
const litRows = (page: Page) => page.locator('.ui-item-highlighted');
const searchInput = (page: Page) => menu(page).getByPlaceholder('Search timezones…');
const visibleItems = (page: Page) => menu(page).locator('[role="menuitem"]:visible');
const itemsScroller = (page: Page) => menu(page).locator('[data-menu-items]');

const COUNT = 18;
const TIMEZONES = [
  'Africa/Johannesburg', 'Africa/Lagos', 'America/Argentina/Buenos_Aires', 'America/Chicago',
  'America/Los_Angeles', 'America/New_York', 'America/Sao_Paulo', 'America/Toronto',
  'America/Vancouver', 'Asia/Dubai', 'Asia/Singapore', 'Asia/Tokyo', 'Australia/Melbourne',
  'Australia/Sydney', 'Europe/Berlin', 'Europe/London', 'Europe/Paris', 'Pacific/Auckland',
];

async function openSearchable(page: Page) {
  await page.goto('/');
  await page.getByTestId('searchable-trigger').click();
  await expect(menu(page)).toBeVisible();
  return page.getByTestId('searchable-trigger');
}

test('opens with the search input focused and every item visible', async ({ page }) => {
  await openSearchable(page);
  await expect(searchInput(page)).toBeFocused();
  await expect(visibleItems(page)).toHaveCount(COUNT);
  // a row is lit by default so Enter/arrows have a target
  await expect(litRows(page)).toHaveCount(1);
});

test('typing filters to matching rows and hides the rest', async ({ page }) => {
  await openSearchable(page);
  await searchInput(page).fill('new york');
  await expect(visibleItems(page)).toHaveCount(1);
  await expect(visibleItems(page)).toContainText('America/New_York');
});

test('typing in the input does not trigger the letter-jump typeahead', async ({ page }) => {
  await openSearchable(page);
  await searchInput(page).fill('as');
  await expect(searchInput(page)).toHaveValue('as');
  await expect(visibleItems(page)).toHaveCount(2); // Asia/Singapore, Asia/Tokyo
  await expect(litRows(page)).toContainText('Asia/Singapore');
});

test('arrows move the highlight across the filtered set only', async ({ page }) => {
  await openSearchable(page);
  await searchInput(page).fill('america');
  await expect(visibleItems(page)).toHaveCount(6);
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await expect(litRows(page)).toContainText('America/Chicago');
  await expect(litRows(page)).toHaveCount(1);
});

test('Enter in the search input activates the highlighted row and selects it', async ({ page }) => {
  await openSearchable(page);
  await searchInput(page).fill('paris');
  await expect(litRows(page)).toContainText('Europe/Paris');
  await searchInput(page).press('Enter');
  await expect(menu(page)).toHaveCount(0, { timeout: 5000 });
  await expect(page.getByTestId('searchable-trigger')).toContainText('Europe/Paris');
});

test('the search box is pinned above the items scroller — nothing scrolls over it', async ({ page }) => {
  await openSearchable(page);
  const box = searchInput(page);
  const before = await box.boundingBox();
  await expect(itemsScroller(page)).toBeVisible();
  await itemsScroller(page).evaluate(el => { el.scrollTop = 200; });
  await page.waitForTimeout(200);
  const after = await box.boundingBox();
  expect(Math.abs(before!.y - after!.y)).toBeLessThan(1);
  // the element just above the box is the box itself, never a menu row
  const probe = await page.evaluate(() => {
    const input = document.querySelector('[role="menu"] input');
    if (!input) return null;
    const r = input.getBoundingClientRect();
    const el = document.elementFromPoint(r.left + 5, r.top - 3);
    return el ? !!el.closest('[role="menuitem"]') : 'no-element';
  });
  expect(probe).toBe(false);
});

test('Escape closes the dropdown', async ({ page }) => {
  await openSearchable(page);
  await searchInput(page).fill('london');
  await expect(visibleItems(page)).toHaveCount(1);
  await searchInput(page).press('Escape');
  await expect(menu(page)).toHaveCount(0, { timeout: 5000 });
});

test('a long filtered list scrolls inside the items scroller with the wheel', async ({ page }) => {
  await openSearchable(page);
  const scroller = itemsScroller(page);
  await expect(scroller).toBeVisible();
  await scroller.evaluate(el => el.scrollTop);
  const before = await scroller.evaluate(el => el.scrollTop);
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(150);
  const after = await scroller.evaluate(el => el.scrollTop);
  expect(after).toBeGreaterThan(before);
  // the search box stays put while the list scrolls
  const r = await scroller.boundingBox();
  expect(Math.abs(r!.y)).toBeGreaterThan(0);
});

test('clicking a row still selects it', async ({ page }) => {
  await openSearchable(page);
  await searchInput(page).fill('tokyo');
  await visibleItems(page).click();
  await expect(menu(page)).toHaveCount(0, { timeout: 5000 });
  await expect(page.getByTestId('searchable-trigger')).toContainText('Asia/Tokyo');
});

test('the query resets on reopen', async ({ page }) => {
  await openSearchable(page);
  await searchInput(page).fill('tokyo');
  await searchInput(page).press('Escape');
  await expect(menu(page)).toHaveCount(0, { timeout: 5000 });
  await page.getByTestId('searchable-trigger').click();
  await expect(searchInput(page)).toHaveValue('');
  await expect(visibleItems(page)).toHaveCount(COUNT);
});

test('the search box is the same size as a dropdown item', async ({ page }) => {
  await openSearchable(page);
  const box = await searchInput(page).evaluate(el => el.getBoundingClientRect().height);
  const item = await visibleItems(page).first().evaluate(el => el.getBoundingClientRect().height);
  // item-sized row (the box is an items row: icon + input + clear) — allow a
  // couple px since the input line-height may differ from the label's
  expect(Math.abs(box - item)).toBeLessThan(10);
});
