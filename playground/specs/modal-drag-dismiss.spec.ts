import { test, expect, Page } from '@playwright/test';

/* Roadmap 78: dragging a modal must close an open kit menu on iPad.
   Radix's DismissableLayer defers TOUCH outside-dismissal to the `click`
   event (a touch that becomes a scroll shouldn't dismiss). A modal drag is
   pointerdown + pointermove + pointerup with NO click — so on iPad a touch
   drag left the menu open. The app's DropdownPanel closes on any outside
   pointerdown; the kit menu must match for touch (dismiss on the touch
   pointerdown, not the deferred click).

   Runs under BOTH projects: desktop (Chrome) and ipad (WebKit + hasTouch —
   the exact iPad configuration from the app's playwright.ipad.config.ts). */

const menu = (page: Page) => page.locator('[role="menu"]');

/** Simulate a REAL touch drag on the modal header (the drag handle): a
    pointerdown with pointerType touch, pointermoves, then pointerup — with
    NO click (a drag suppresses the click, which is precisely the iPad
    scenario that exposed the bug). */
async function touchDragModalHeader(page: Page) {
  const header = page.locator('[data-modal-stack] h2').first();
  await expect(header).toBeVisible();
  const box = (await header.boundingBox())!;
  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;
  await page.evaluate(
    ([x, y]) => {
      const target = document.querySelector('[data-modal-stack] h2') as HTMLElement;
      const fire = (type: string, px: number, py: number) => {
        const evt = new PointerEvent(type, {
          bubbles: true,
          cancelable: true,
          pointerType: 'touch',
          isPrimary: true,
          pointerId: 1,
          clientX: px,
          clientY: py,
        });
        target.dispatchEvent(evt);
      };
      fire('pointerdown', x, y);
      fire('pointermove', x + 12, y + 6);
      fire('pointermove', x + 30, y + 14);
      fire('pointerup', x + 30, y + 14);
    },
    [cx, cy] as unknown as [number, number],
  );
}

test('touch-dragging the modal header closes an open menu', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('menu-modal-open').click();
  await expect(page.locator('[data-modal-stack]')).toBeVisible();

  await page.getByTestId('inmodal-menu-trigger').click();
  await expect(menu(page)).toBeVisible();

  // The modal drag begins with a touch pointerdown on its header.
  await touchDragModalHeader(page);

  // The menu must close (the bug: Radix deferred to click, which never fired
  // during a drag, so it stayed open).
  await expect(menu(page)).toHaveCount(0, { timeout: 5000 });
  // The modal stays open + interactive.
  await expect(page.locator('[data-modal-stack]')).toBeVisible();
  await expect(page.getByTestId('inmodal-menu-trigger')).toBeVisible();
});

test('touch pointerdown on a menu item does NOT close the menu (selects it)', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('menu-modal-open').click();
  await expect(page.locator('[data-modal-stack]')).toBeVisible();

  await page.getByTestId('inmodal-menu-trigger').click();
  await expect(menu(page)).toBeVisible();

  // A tap inside the menu content must not dismiss — pointerdown on a row.
  const item = page.getByRole('menuitem', { name: 'Hold' });
  await item.evaluate((el) => {
    const evt = new PointerEvent('pointerdown', {
      bubbles: true,
      cancelable: true,
      pointerType: 'touch',
      clientX: 100,
      clientY: 100,
    });
    el.dispatchEvent(evt);
  });
  await expect(menu(page)).toBeVisible();
});
