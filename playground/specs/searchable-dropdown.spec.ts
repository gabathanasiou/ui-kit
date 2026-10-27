import { test, expect, Page } from '@playwright/test';

/* `searchable` DropdownMenu: a search input auto-focuses at the top of the
   panel (pinned ABOVE a dedicated items scroller — the list can never scroll
   over or behind it); typing filters the registered items by label
   (non-matches hide), arrows move the single highlight over the VISIBLE rows,
   Enter/click selects, Escape closes. */

const menu = (page: Page) => page.locator('[role="menu"]');
/* The lit ROW — scoped to menuitems: the search box itself carries
   `ui-item ui-item-highlighted` (item-row styling), so an unscoped
   `.ui-item-highlighted` matches 2. */
const litRows = (page: Page) => page.locator('[role="menuitem"].ui-item-highlighted');
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
  // substring match against the LABEL: "york" (the label is America/New_York —
  // a space can't match the underscore)
  await searchInput(page).fill('york');
  await expect(visibleItems(page)).toHaveCount(1);
  await expect(visibleItems(page)).toContainText('America/New_York');
});

test('typing in the input does not trigger the letter-jump typeahead', async ({ page }) => {
  await openSearchable(page);
  await searchInput(page).fill('as');
  await expect(searchInput(page)).toHaveValue('as');
  await expect(visibleItems(page)).toHaveCount(3); // Asia/Dubai, Asia/Singapore, Asia/Tokyo
  // the first match is lit (the highlight clamps into the filtered set)
  await expect(litRows(page)).toContainText('Asia/Dubai');
});

test('arrows move the highlight across the filtered set only', async ({ page }) => {
  await openSearchable(page);
  await searchInput(page).fill('america');
  await expect(visibleItems(page)).toHaveCount(7); // every America/… timezone
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await expect(litRows(page)).toContainText('America/Los_Angeles');
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
  test.skip(test.info().project.name === 'ipad', 'mouse.wheel is not supported in mobile WebKit');
  await openSearchable(page);
  const scroller = itemsScroller(page);
  await expect(scroller).toBeVisible();
  await scroller.evaluate(el => el.scrollTop);
  const before = await scroller.evaluate(el => el.scrollTop);
  const r = await scroller.boundingBox();
  await page.mouse.move(r!.x + r!.width / 2, r!.y + r!.height / 2);
  await page.mouse.wheel(0, 400);
  await expect.poll(async () => scroller.evaluate(el => el.scrollTop)).toBeGreaterThan(before);
  // the search box stays put while the list scrolls
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
  // the search ROW (`[data-menu-search]`) — the inner input's own height is
  // line-height only; the row carries the item-sized padding/font
  const box = await menu(page).locator('[data-menu-search]').evaluate(el => el.getBoundingClientRect().height);
  const item = await visibleItems(page).first().evaluate(el => el.getBoundingClientRect().height);
  expect(Math.abs(box - item)).toBeLessThan(10);
});

test('grouped menu: category headers render once and searching matches the category', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('grouped-searchable-trigger').click();
  const groups = page.locator('[data-menu-group]');
  const input = menu(page).getByPlaceholder('Search locations or categories…');

  // Each category gets ONE header above its first visible row.
  await expect(visibleItems(page)).toHaveCount(8);
  await expect(groups).toHaveText(['Set', 'Unit base', 'Hospital', 'Police']);

  // A group match keeps every row in that category — the row labels never
  // say "set", so this can only come from the group filter.
  await input.fill('set');
  await expect(visibleItems(page)).toHaveCount(3);
  await expect(groups).toHaveText(['Set']);
  await expect(visibleItems(page).first()).toContainText('Riverside House');

  // A category with a single row still shows its header; filtered-out groups
  // drop their header with their rows (no orphans).
  await input.fill('hospital');
  await expect(visibleItems(page)).toHaveCount(1);
  await expect(groups).toHaveText(['Hospital']);
  await input.fill('base');
  await expect(visibleItems(page)).toHaveCount(2);
  await expect(groups).toHaveText(['Unit base']);

  // Grouping is not a search feature: a plain menu renders the same headers
  // with no search box.
  await input.press('Escape');
  await expect(menu(page)).toHaveCount(0, { timeout: 5000 });
  await page.getByTestId('grouped-trigger').click();
  await expect(menu(page)).toBeVisible();
  await expect(visibleItems(page)).toHaveCount(8);
  await expect(groups).toHaveText(['Set', 'Unit base', 'Hospital', 'Police']);
  await expect(menu(page).locator('[data-menu-search]')).toHaveCount(0);
});

test('trigger-as-search: the trigger field keeps focus and filters while typing', async ({ page }) => {
  await page.goto('/');
  const input = page.getByTestId('searchable-trigger-input');
  await input.click();
  await expect(menu(page)).toBeVisible();
  // Radix focuses the menu content on open — the external trigger field must
  // get the keyboard back, or the user cannot type.
  await expect(input).toBeFocused();
  await input.pressSequentially('tokyo');
  await expect(input).toHaveValue('tokyo');
  await expect(input).toBeFocused();
  await expect(visibleItems(page)).toHaveCount(1);
  await expect(visibleItems(page)).toContainText('Asia/Tokyo');
  // The open morph must actually paint the panel (opacity 0 = invisible but
  // still "visible" to Playwright's geometry check).
  await expect.poll(() => menu(page).evaluate(el => getComputedStyle(el).opacity)).toBe('1');
  // Space is a search character, not the trigger's open/close key.
  await input.press('Space');
  await expect(input).toHaveValue('tokyo ');
  await expect(input).toBeFocused();
  await expect(menu(page)).toBeVisible();
  await input.press('Backspace');
  await expect(input).toHaveValue('tokyo');
  await expect(visibleItems(page)).toHaveCount(1);
  // A query with no matches must SAY so — a blank panel reads as broken.
  await input.press('ControlOrMeta+a');
  await input.pressSequentially('zzz');
  await expect(visibleItems(page)).toHaveCount(0);
  await expect(menu(page).locator('[data-menu-search-empty]')).toContainText('No matches for “zzz”');
  await input.press('ControlOrMeta+a');
  await input.press('Backspace');
  await expect(visibleItems(page)).toHaveCount(COUNT);
  await expect(menu(page).locator('[data-menu-search-empty]')).toHaveCount(0);
});

test('trigger-as-search: reopening a committed value stays open and typing replaces it', async ({ page }) => {
  await page.goto('/');
  const input = page.getByTestId('searchable-trigger-input');
  await input.click();
  await expect(menu(page)).toBeVisible();
  await input.pressSequentially('tok');
  await expect(visibleItems(page)).toHaveCount(1);
  await input.press('Enter');
  await expect(menu(page)).toHaveCount(0, { timeout: 5000 });
  await expect(input).toHaveValue('Asia/Tokyo');
  await expect(input).toBeFocused();

  // Reopening: the committed text is NOT a query, so the whole list shows…
  // (and the field keeps the keyboard — the panel never takes it, and the
  // close-restore must not look like the USER focusing the field and reopen).
  await input.click();
  await expect(menu(page)).toBeVisible();
  await expect(visibleItems(page)).toHaveCount(COUNT);
  await expect(input).toBeFocused();
  // …and opening selected the text, so typing starts a NEW search instead of
  // appending to "Asia/Tokyo" (which matches nothing).
  await input.pressSequentially('berlin');
  await expect(input).toHaveValue('berlin');
  await expect(visibleItems(page)).toHaveCount(1);
  await expect(visibleItems(page)).toContainText('Europe/Berlin');

  // Leaving the field ends the session.
  await input.press('Tab');
  await expect(menu(page)).toHaveCount(0, { timeout: 5000 });
});

test('trigger-as-search: non-keyboard text changes filter and a row click never reopens', async ({ page }) => {
  await page.goto('/');
  const input = page.getByTestId('searchable-trigger-input');
  await input.click();
  await expect(menu(page)).toBeVisible();
  // Paste / IME / dictation / autofill all change the value through an
  // `input` event with NO printable keydown. The old keystroke flag left
  // every one of them showing the unfiltered list (and Enter then committed
  // the first row, not the searched one).
  await page.keyboard.insertText('berlin');
  await expect(input).toHaveValue('berlin');
  await expect(visibleItems(page)).toHaveCount(1);
  await expect(visibleItems(page)).toContainText('Europe/Berlin');

  // Mouse selection commits, the list stays CLOSED (the focus restore used to
  // re-fire the consumer's open-on-focus), and the keyboard returns to the field.
  await visibleItems(page).first().click();
  await expect(menu(page)).toHaveCount(0, { timeout: 5000 });
  await expect(input).toHaveValue('Europe/Berlin');
  await expect(input).toBeFocused();
});

test('trigger-as-search: focus that lands in the menu returns to the field', async ({ page }) => {
  await page.goto('/');
  const input = page.getByTestId('searchable-trigger-input');
  await input.click();
  await expect(menu(page)).toBeVisible();
  await expect(input).toBeFocused();
  // Simulate the focus steal that used to kill typing (Radix's open autofocus,
  // a click on the panel, …).
  await menu(page).evaluate(el => el.focus());
  await expect(input).toBeFocused();
});

const searchPanel = (page: Page) => page.locator('[role="listbox"]');

test('SearchMenu inline: click opens, category rows jump, empty action adds', async ({ page }) => {
  await page.goto('/');
  const inline = page.getByTestId('search-menu-inline');
  const input = inline.locator('[data-search-input]');
  const status = page.getByTestId('deep-search-status');

  // Click the textbox → the search panel opens (browse state with categories).
  await input.click();
  await expect(searchPanel(page)).toBeVisible();
  await expect(page.locator('[data-search-group="cast"]')).toBeVisible();

  // Browse tree: the Cast chevron expands its records in place.
  await page.getByRole('button', { name: 'Expand Cast' }).click();
  await expect(page.locator('[data-search-item="anna"]')).toBeVisible();
  await expect(page.locator('[data-search-item="bob"]')).toBeVisible();
  await page.getByRole('button', { name: 'Collapse Cast' }).click();
  await expect(page.locator('[data-search-item="anna"]')).toBeHidden();

  // Keyboard tree: Right expands, Right again collapses, Left collapses too.
  await input.focus();
  await input.press('ArrowRight');
  await expect(page.locator('[data-search-item="anna"]')).toBeVisible();
  await input.press('ArrowRight');
  await expect(page.locator('[data-search-item="anna"]')).toBeHidden();
  await input.press('ArrowRight');
  await expect(page.locator('[data-search-item="anna"]')).toBeVisible();
  await input.press('ArrowLeft');
  await expect(page.locator('[data-search-item="anna"]')).toBeHidden();

  await input.pressSequentially('roy');
  await expect(input).toBeFocused();
  await expect(page.locator('[data-search-item="anna"]')).toContainText('Artiste: Roy Smith');
  await page.locator('[data-search-item="anna"]').click();
  await expect(status).toHaveText('active: cast · pick: anna');
  await expect(searchPanel(page)).toHaveCount(0);

  // No matches → custom empty state + "Add …" action.
  await input.click();
  await input.pressSequentially('zzz');
  await expect(page.locator('[data-search-empty]')).toBeVisible();
  await expect(page.locator('[data-search-action]')).toHaveCount(2);
  const action = page.locator('[data-search-action]').filter({ hasText: 'Add “zzz”' });
  await expect(action).toBeVisible();
  await action.click();
  await expect(status).toContainText('pick: new-');
  await expect(searchPanel(page)).toHaveCount(0);

  // Accordion mode: opening Sets closes Cast; collapsing Sets leaves all shut.
  await page.getByText('One open', { exact: true }).click();
  await input.click();
  await page.getByRole('button', { name: 'Expand Cast' }).click();
  await expect(page.locator('[data-search-item="anna"]')).toBeVisible();
  await page.getByRole('button', { name: 'Expand Sets' }).click();
  await expect(page.locator('[data-search-item="stage2"]')).toBeVisible();
  await expect(page.locator('[data-search-item="anna"]')).toBeHidden();
  await page.getByRole('button', { name: 'Collapse Sets' }).click();
  await expect(page.locator('[data-search-item="stage2"]')).toBeHidden();
});

test('SearchMenu expandable: button morphs into the field and back', async ({ page }) => {
  await page.goto('/');
  const wrap = page.getByTestId('search-menu-expandable');
  const trigger = wrap.getByRole('button', { name: /Search/ });
  await trigger.click();
  const input = wrap.locator('[data-search-input]');
  await expect(input).toBeVisible();
  await expect(input).toBeFocused();
  await input.pressSequentially('555');
  await expect(page.locator('[data-search-item="mat"]')).toContainText('555-0199');
  await expect(input).toBeFocused();
  await input.press('Escape');
  // The field stays mounted for the cross-fade, but the button is back and
  // the keyboard leaves the (now hidden) field.
  await expect(wrap.locator('[data-search-trigger]')).toBeVisible();
  await expect(input).not.toBeFocused();
  await expect(searchPanel(page)).toHaveCount(0);

  // `browseExpanded`: plain category headers, every record visible (no
  // accordion); typing filters and clearing restores the all-open list.
  const browse = page.getByTestId('search-menu-browse-expanded');
  await browse.getByRole('button', { name: /Browse all/ }).click();
  await expect(searchPanel(page)).toBeVisible();
  await expect(page.locator('[data-search-group="cast"]')).toBeVisible();
  await expect(page.locator('[data-search-item="anna"]')).toBeVisible();
  await expect(page.locator('[data-search-item="bob"]')).toBeVisible();
  await expect(page.getByRole('button', { name: /Expand Cast|Collapse Cast/ })).toHaveCount(0);
  const browseInput = browse.locator('[data-search-input]');
  await browseInput.fill('roy');
  await expect(page.locator('[data-search-item="anna"]')).toBeVisible();
  await expect(page.locator('[data-search-item="bob"]')).toHaveCount(0);
  await browseInput.fill('');
  await expect(page.locator('[data-search-item="bob"]')).toBeVisible();

  // `browseAll` + `selectedId`: a flat value picker for ONE kind of record —
  // no category rows, every record on open, the current value checked, and a
  // pick closes the panel.
  const flat = page.getByTestId('search-menu-flat-picker');
  await flat.getByRole('button', { name: /Region/ }).click();
  await expect(searchPanel(page)).toBeVisible();
  await expect(page.locator('[data-search-group]')).toHaveCount(0);
  await expect(page.locator('#search-menu-panel [data-search-item]')).toHaveCount(60);
  const current = page.locator('#search-menu-panel [data-search-item="tz-40"]');
  await expect(current).toHaveAttribute('aria-selected', 'true');
  await expect(current.locator('svg.lucide-check')).toHaveCount(1);
  await page.locator('#search-menu-panel [data-search-item="tz-42"]').click();
  await expect(searchPanel(page)).toHaveCount(0);
  await expect(page.getByTestId('flat-picker-status')).toHaveText('flat pick: tz-42');
  await expect(flat.getByRole('button', { name: /City 42/ })).toBeVisible();
});

/* A picker that HOLDS a value opens already sitting on it — and the list is
   frozen from the first frame it is visible. The old open-edge rAF scrolled a
   frame LATE (first visible frame at one scrollTop, next frame at another),
   which moved rows out from under the click that opened the menu: the classic
   "I have to click the item twice". */
test('picker with a value: opens already scrolled to it, and the list never moves once visible', async ({ page }) => {
  await page.goto('/');
  // Sample the panel every frame from BEFORE it opens.
  await page.evaluate(() => {
    (window as any).__revealTrace = [];
    const tick = () => {
      const panel = document.getElementById('search-menu-panel');
      const scroller = panel?.querySelector<HTMLElement>('[data-search-scroller]');
      (window as any).__revealTrace.push({
        visible: panel ? getComputedStyle(panel).visibility === 'visible' : false,
        top: scroller ? Math.round(scroller.scrollTop) : null,
      });
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });

  const flat = page.getByTestId('search-menu-flat-picker');
  await flat.getByRole('button', { name: /Region/ }).click();
  await expect(searchPanel(page)).toBeVisible();
  await expect(page.locator('#search-menu-panel [data-search-item="tz-40"]')).toHaveAttribute('aria-selected', 'true');

  const trace = await page.evaluate(() => (window as any).__revealTrace as { visible: boolean; top: number | null }[]);
  const visibleTops = trace.filter(s => s.visible && s.top !== null).map(s => s.top as number);
  expect(visibleTops.length, 'the panel painted').toBeGreaterThan(0);
  expect(new Set(visibleTops).size, `list moved while visible: ${visibleTops.join(' → ')}`).toBe(1);
  expect(visibleTops[0], 'opens scrolled to the current value, not at the top').toBeGreaterThan(0);

  // The current row is inside the visible band (not merely "selected").
  const current = page.locator('#search-menu-panel [data-search-item="tz-40"]');
  expect(await current.evaluate((el) => {
    const scroller = document.querySelector('[data-search-scroller]')!;
    const r = el.getBoundingClientRect();
    const b = scroller.getBoundingClientRect();
    return r.top >= b.top - 1 && r.bottom <= b.bottom + 1;
  })).toBe(true);

  // ONE mouse click on a visible row commits and closes — no second try.
  await page.locator('#search-menu-panel [data-search-item="tz-44"]').click();
  await expect(searchPanel(page)).toHaveCount(0);
  await expect(page.getByTestId('flat-picker-status')).toHaveText('flat pick: tz-44');
});

test('SearchMenu expandable: field actions live inside the textbox and keep the panel open', async ({ page }) => {
  await page.goto('/');
  const wrap = page.getByTestId('search-menu-expandable');
  await wrap.getByRole('button', { name: /Search/ }).click();
  const input = wrap.locator('[data-search-input]');
  await input.fill('New Prop');
  const add = wrap.locator('[data-search-field-action="add"]');
  await expect(add).toBeVisible();
  await add.click();
  await expect(searchPanel(page)).toBeVisible();
  await expect(input).toBeFocused();
  await expect(page.locator('[data-search-item]').filter({ hasText: 'New Prop' })).toBeVisible();
  await input.press('Escape');
});

test('MorphSearchField: button morphs into a filter field and keeps the term', async ({ page }) => {
  await page.goto('/');
  const wrap = page.getByTestId('morph-search-field');
  const trigger = wrap.locator('[data-morph-search-trigger]');
  const input = wrap.locator('[data-morph-search-input]');
  const status = page.getByTestId('morph-search-status');

  await trigger.click();
  await expect(input).toBeVisible();
  await expect(input).toBeFocused();
  await input.pressSequentially('roy');
  await expect(status).toHaveText('filter: roy');

  // Clicking away collapses but KEEPS the filter (the toolbar count stays):
  // the trigger now names the term and swaps its magnifier for a funnel.
  await page.getByTestId('deep-search-status').click();
  await expect(trigger).toBeVisible();
  await expect(trigger).toContainText('roy');
  await expect(trigger.locator('svg.lucide-funnel')).toHaveCount(1);
  await expect(input).not.toBeFocused();
  await expect(status).toHaveText('filter: roy');

  // Reopening restores the term; Escape clears it and returns to the trigger.
  await trigger.click();
  await expect(input).toHaveValue('roy');
  await input.press('Escape');
  await expect(trigger).toBeVisible();
  await expect(status).toHaveText('filter: —');
  await expect(trigger).toBeFocused();
});
