import { test, expect, Page } from '@playwright/test';

/* Contextual rich-text formatting (selection-level runs):
   - the font family menu + size input act on the SELECTED text only,
     persisting as sanitized `<span style="font-family/font-size">` marks;
   - clearing formatting unsets every inline mark while keeping the text. */

const editor = (page: Page) => page.locator('[data-testid="rt-editor"] .tiptap');
const output = (page: Page) => page.getByTestId('rt-output');

test('font family and size apply to the selection only', async ({ page }) => {
  await page.goto('/');
  await editor(page).click();
  await page.keyboard.type('Hello world');
  // caret is at the end — select the last word
  for (let i = 0; i < 5; i++) await page.keyboard.press('Shift+ArrowLeft');

  await page.getByTestId('rt-demo').getByRole('button', { name: /Helvetica/ }).click();
  await page.getByRole('menuitem', { name: 'Georgia' }).click();
  await expect(output(page)).toContainText('font-family: Georgia');

  const size = page.getByLabel('Font size');
  await size.fill('14');
  await expect(output(page)).toContainText('font-size: 14pt');
  // "Hello " stays unmarked — only the run carries the span
  await expect(output(page)).toContainText('>world</span>');
  await expect(output(page)).not.toContainText('>Hello</span>');
  await expect(editor(page)).toHaveText('Hello world');
});

test('a selection spanning different runs shows Mixed', async ({ page }) => {
  await page.goto('/');
  await editor(page).click();
  await page.keyboard.type('Hello world');
  // format only the last word
  for (let i = 0; i < 5; i++) await page.keyboard.press('Shift+ArrowLeft');
  await page.getByTestId('rt-demo').getByRole('button', { name: /Helvetica/ }).click();
  await page.getByRole('menuitem', { name: 'Georgia' }).click();
  const size = page.getByLabel('Font size');
  await size.fill('14');

  // back into the editor: triple-click selects the whole line → mixed family + size
  await editor(page).click({ clickCount: 3 });
  await expect(page.getByTestId('rt-demo').getByRole('button', { name: 'Mixed' })).toBeVisible();
  await expect(size).toHaveAttribute('placeholder', 'Mixed');
});

test('clear formatting unsets the run marks but keeps the text', async ({ page }) => {
  await page.goto('/');
  await editor(page).click();
  await page.keyboard.type('Bold move');
  // caret is at the end — select the last word
  for (let i = 0; i < 4; i++) await page.keyboard.press('Shift+ArrowLeft');

  await page.getByTestId('rt-demo').getByRole('button', { name: 'Bold' }).click();
  await expect(output(page)).toContainText('<b>move</b>');
  await page.getByLabel('Clear formatting').click();
  await expect(output(page)).toContainText('Bold move');
  await expect(output(page)).not.toContainText('<b>');
  await expect(editor(page)).toHaveText('Bold move');
});

test('a linked named style marks the run and survives storage', async ({ page }) => {
  await page.goto('/');
  await editor(page).click();
  await page.keyboard.type('Hello world');
  // caret is at the end — select the last word
  for (let i = 0; i < 5; i++) await page.keyboard.press('Shift+ArrowLeft');

  await page.getByTestId('rt-style-heading').click();
  // the link id survives sanitize; the run text stays plain
  await expect(output(page)).toContainText('data-text-style="heading"');
  await expect(output(page)).toContainText('>world</span>');
  await expect(output(page)).not.toContainText('>Hello</span>');
  await expect(editor(page)).toHaveText('Hello world');
  await expect(page.getByTestId('rt-style-state')).toContainText('heading');

  await page.getByTestId('rt-style-clear').click();
  await expect(output(page)).not.toContainText('data-text-style');
});

test('a selection spanning styled and unstyled runs reports Mixed', async ({ page }) => {
  await page.goto('/');
  await editor(page).click();
  await page.keyboard.type('Hello world');
  for (let i = 0; i < 5; i++) await page.keyboard.press('Shift+ArrowLeft');
  await page.getByTestId('rt-style-heading').click();

  // triple-click selects the whole line → one styled run + one unstyled run
  await editor(page).click({ clickCount: 3 });
  await expect(page.getByTestId('rt-style-state')).toContainText('Mixed');
});
