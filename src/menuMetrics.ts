"use client";

/* Real viewport geometry for every floating menu surface (roadmap 336).
 *
 * The visible viewport is the VISUAL viewport (the iOS keyboard lives there),
 * and safe-area rails are subtracted from the menu boundary — a phone in
 * landscape never places a panel under the Dynamic Island. Menu WIDTH and
 * HEIGHT stay the surface's own natural/trigger-matched size. */

export type SafeAreaInsets = { left: number; right: number; top: number; bottom: number };

export type VisualBox = { x: number; y: number; width: number; height: number };

/** The visible viewport in layout-viewport coordinates (the space of
 *  getBoundingClientRect). On iPad the software keyboard lives here. */
export function visualViewportBox(win: Window): VisualBox {
  const vv = win.visualViewport;
  if (!vv) return { x: 0, y: 0, width: win.innerWidth, height: win.innerHeight };
  return { x: vv.offsetLeft, y: vv.offsetTop, width: vv.width, height: vv.height };
}

function cssPx(doc: Document, name: string): number {
  const raw = getComputedStyle(doc.documentElement).getPropertyValue(name).trim();
  const n = Number.parseFloat(raw);
  return Number.isFinite(n) ? n : 0;
}

/** Real device safe-area insets (0 on devices without edge-to-edge). */
export function safeAreaInsets(doc?: Document | null): SafeAreaInsets {
  if (!doc) return { left: 0, right: 0, top: 0, bottom: 0 };
  return {
    left: cssPx(doc, '--ui-safe-area-left'),
    right: cssPx(doc, '--ui-safe-area-right'),
    top: cssPx(doc, '--ui-safe-area-top'),
    bottom: cssPx(doc, '--ui-safe-area-bottom'),
  };
}
