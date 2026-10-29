import { describe, expect, it } from 'vitest';
import { CONTROL_LANE, GLYPH_LANE, isControlHit } from '../glide/controlGeometry';

/* The painted control lane hit-test — the one piece of the canvas control
   cells that is pure logic (see docs/GLIDE.md). */
describe('isControlHit', () => {
  it('hits the right-hand lane from its left edge to the cell edge', () => {
    const width = 120;
    expect(isControlHit(width - CONTROL_LANE, width, CONTROL_LANE)).toBe(true);
    expect(isControlHit(width, width, CONTROL_LANE)).toBe(true);
    expect(isControlHit(width - CONTROL_LANE - 0.5, width, CONTROL_LANE)).toBe(false);
    expect(isControlHit(0, width, CONTROL_LANE)).toBe(false);
  });

  it('a full lane makes the whole cell the target', () => {
    expect(isControlHit(0, 120, 'full')).toBe(true);
    expect(isControlHit(120, 120, 'full')).toBe(true);
    expect(isControlHit(-1, 120, 'full')).toBe(false);
    expect(isControlHit(121, 120, 'full')).toBe(false);
  });

  it('clamps a lane wider than the cell to the whole cell', () => {
    expect(isControlHit(0, 10, GLYPH_LANE)).toBe(true);
    expect(isControlHit(10, 10, GLYPH_LANE)).toBe(true);
  });

  it('ignores a non-finite pointer position', () => {
    expect(isControlHit(Number.NaN, 120, CONTROL_LANE)).toBe(false);
  });
});
