import { Page } from '@playwright/test';

/** Waits for overlay/modal morphs (kit `useOverlayMorph` + the Modal FLIP,
 *  ~220ms trigger-anchored scale+fade) to settle before the next interaction.
 *  The morph keeps a CLOSING menu/panel mounted with `data-state="open"` for
 *  its duration, so fast open→close→open sequences momentarily see TWO "open"
 *  overlays (strict-mode locator violations) and a mid-morph panel is at a
 *  transformed position (clicks hit whatever is underneath). Polls every open
 *  overlay's computed transform/opacity until they reach the settled values.
 *  Web-first — no fixed sleep. Mirrors the app's e2e/helpers.ts
 *  `waitForOverlaySettle`. */
export async function waitForOverlaySettle(page: Page, timeout = 2000) {
  await page.waitForFunction(() => {
    const open = document.querySelectorAll(
      '[role="menu"][data-state="open"], [data-modal-stack][data-state="open"], .click-outside-ignore',
    );
    for (const el of open) {
      const cs = getComputedStyle(el);
      const t = cs.transform;
      if (t !== 'none' && t !== '') return false;
      const o = cs.opacity;
      if (o !== '' && o !== '1') return false;
    }
    return true;
  }, undefined, { timeout });
}
