import { test, expect, Page } from '@playwright/test';

/* Staged rich-text tokens (the app's roadmap 121 picker):
   - `@` lists stage-1 items (fields + references); picking a reference inserts
     its plain key chip.
   - A `.` typed IMMEDIATELY after a token chip opens stage 2 — the attributes
     supplied by `attributeItems(chipKey, query)`. Picking one inserts a SECOND
     token atom directly after the reference: two independent bubbles, either
     deletable on its own (delete the attribute to swap it, delete the
     reference to leave the attribute standing alone).
   - A dot that does not sit directly after a chip never opens the popup. */

const editor = (page: Page) => page.locator('[data-testid="rt-editor"] .tiptap');
const output = (page: Page) => page.getByTestId('rt-output');
const options = (page: Page) => page.getByRole('option');

test('reference + attribute are two independent bubbles', async ({ page }) => {
  await page.goto('/');
  await editor(page).click();
  await page.keyboard.type('@bob');

  await expect(options(page).filter({ hasText: 'Bob' })).toBeVisible();
  await options(page).filter({ hasText: 'Bob' }).click();
  await expect(output(page)).toContainText('{{crew.bob}}');
  await expect(editor(page).locator('.rt-token')).toHaveText('Bob');

  // the dot must sit directly after the chip — the attribute stage opens
  await page.keyboard.type('.');
  await expect(options(page).filter({ hasText: 'Phone' })).toBeVisible();
  await expect(options(page)).toHaveCount(3); // Phone / Email / Role

  // picking inserts a SECOND bubble; the reference chip is untouched
  await options(page).filter({ hasText: 'Phone' }).click();
  await expect(output(page)).toContainText('{{crew.bob}}{{crew.bob.phone}}');
  await expect(editor(page).locator('.rt-token')).toHaveCount(2);
  await expect(editor(page).locator('.rt-token').nth(0)).toHaveText('Bob');
  // the linked attribute bubble renders as a nested lighter pill
  await expect(editor(page).locator('.rt-token').nth(1)).toContainText('Phone');
  await expect(editor(page).locator('.rt-token-nested')).toHaveText('Phone');
  // print resolution: the adjacent pair prints ONLY the attribute's value
  await expect(page.getByTestId('rt-print')).toHaveText('prints: 555-0134');

  // delete JUST the attribute bubble (the caret lands after it), then re-pick
  await page.keyboard.press('Backspace');
  await expect(output(page)).toContainText('{{crew.bob}}');
  await expect(output(page)).not.toContainText('{{crew.bob.phone}}');
  await expect(editor(page).locator('.rt-token')).toHaveCount(1);
  await expect(page.getByTestId('rt-print')).toHaveText('prints: Bob');
  await page.keyboard.type('.');
  await options(page).filter({ hasText: 'Email' }).click();
  await expect(output(page)).toContainText('{{crew.bob}}{{crew.bob.email}}');
  await expect(editor(page).locator('.rt-token').nth(1)).toContainText('Email');
  await expect(page.getByTestId('rt-print')).toHaveText('prints: bob@example.com');

  // delete JUST the reference bubble — the attribute stands on its own
  await editor(page).locator('.rt-token').first().click();
  await page.keyboard.press('Backspace');
  await expect(output(page)).toContainText('{{crew.bob.email}}');
  await expect(output(page)).not.toContainText('{{crew.bob}}');
  await expect(editor(page).locator('.rt-token')).toContainText('Email');
  await expect(editor(page).locator('.rt-token-nested')).toHaveText('Email');
  await expect(page.getByTestId('rt-print')).toHaveText('prints: bob@example.com');
});

test('a token typed after a pair stays a separate chip (no link bleed)', async ({ page }) => {
  await page.goto('/');
  await editor(page).click();
  await page.keyboard.type('@bob');
  await options(page).filter({ hasText: 'Bob' }).click();
  await page.keyboard.type('.');
  await options(page).filter({ hasText: 'Phone' }).click();
  await expect(editor(page).locator('.rt-token')).toHaveCount(2);

  await page.keyboard.type('@mary');
  await options(page).filter({ hasText: 'Mary' }).click();
  await expect(editor(page).locator('.rt-token')).toHaveCount(3);

  // the pair keeps its linked middle corners; the third chip is a normal pill
  await expect(editor(page).locator('.rt-token').nth(0)).toHaveCSS('border-top-right-radius', '0px');
  await expect(editor(page).locator('.rt-token').nth(1)).toHaveCSS('margin-left', '-2px');
  await expect(editor(page).locator('.rt-token').nth(1)).toHaveCSS('border-top-right-radius', '10px');
  await expect(editor(page).locator('.rt-token').nth(2)).toHaveCSS('margin-left', '2px');
  await expect(editor(page).locator('.rt-token').nth(2)).toHaveCSS('border-top-left-radius', '10px');
  await expect(page.getByTestId('rt-print')).toContainText('555-0134');
  await expect(page.getByTestId('rt-print')).toContainText('Mary');
});

test('a dot after plain text never opens the attribute stage', async ({ page }) => {
  await page.goto('/');
  await editor(page).click();
  await page.keyboard.type('Hello.');

  await expect(output(page)).toContainText('Hello.');
  await expect(options(page)).toHaveCount(0);
});

test('a dot after a chip with no attributes lists nothing', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('rt-insert').click(); // cast.lead — no attributeItems entry
  await expect(editor(page).locator('.rt-token')).toHaveText('Lead');

  await page.keyboard.type('.');
  await expect(output(page)).toContainText('{{cast.lead}}.');
  await expect(options(page)).toHaveCount(0);
});
