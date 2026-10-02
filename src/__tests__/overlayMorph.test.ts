import { describe, it, expect } from 'vitest';
import { nearestOverlayOrigin, overlayMorphEnabled } from '../overlayMorph';

/* The morph ORIGIN math — where a panel's zoom is anchored. This is the
   "shrinks toward the anchor, not the far corner" contract the Playwright
   clone spec guards end-to-end; the corner/edge matrix belongs here. */

const panel = { left: 100, top: 100, width: 200, height: 150 };

describe('nearestOverlayOrigin', () => {
  it('anchors at the top edge when the anchor sits above the panel', () => {
    expect(nearestOverlayOrigin(panel, { left: 150, top: 20, width: 40, height: 20 })).toEqual({ x: 0.5, y: 0 });
  });

  it('anchors at the bottom edge when the anchor sits below the panel', () => {
    expect(nearestOverlayOrigin(panel, { left: 150, top: 400, width: 40, height: 20 })).toEqual({ x: 0.5, y: 1 });
  });

  it('anchors at the right edge when the anchor sits to the right', () => {
    expect(nearestOverlayOrigin(panel, { left: 400, top: 150, width: 40, height: 20 })).toEqual({ x: 1, y: 0.5 });
  });

  it('uses the corner for a diagonal anchor', () => {
    expect(nearestOverlayOrigin(panel, { left: 20, top: 20, width: 10, height: 10 })).toEqual({ x: 0, y: 0 });
  });

  it('centers when the anchor overlaps the panel', () => {
    expect(nearestOverlayOrigin(panel, { left: 150, top: 150, width: 40, height: 20 })).toEqual({ x: 0.5, y: 0.5 });
  });

  it('treats a zero-size press point as a corner anchor', () => {
    expect(nearestOverlayOrigin(panel, { left: 500, top: 500, width: 0, height: 0 })).toEqual({ x: 1, y: 1 });
  });
});

describe('overlayMorphEnabled', () => {
  it('is disabled in a non-browser (no window) environment', () => {
    expect(overlayMorphEnabled()).toBe(false);
  });

  it('honors a no-preference media query', () => {
    (globalThis as any).window = { matchMedia: () => ({ matches: false }) };
    try {
      expect(overlayMorphEnabled()).toBe(true);
      expect(overlayMorphEnabled(false)).toBe(false);
    } finally {
      delete (globalThis as any).window;
    }
  });

  it('skips under prefers-reduced-motion: reduce', () => {
    (globalThis as any).window = { matchMedia: () => ({ matches: true }) };
    try {
      expect(overlayMorphEnabled()).toBe(false);
    } finally {
      delete (globalThis as any).window;
    }
  });
});
