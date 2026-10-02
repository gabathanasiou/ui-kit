import { describe, it, expect } from 'vitest';
import { coarsePx, getCoarseScale, isTouchLike, setCoarseScale } from '../device';

/* Coarse-scale knob + touch-like classification. `coarsePx` is gated on
   IS_COARSE, so in node (fine device) it must ALWAYS return the desktop value
   regardless of the knob — the knobs never affect desktops. */

describe('isTouchLike', () => {
  it('treats touch and pen alike (Apple Pencil = finger)', () => {
    expect(isTouchLike('touch')).toBe(true);
    expect(isTouchLike('pen')).toBe(true);
  });

  it('rejects mouse and empty input', () => {
    expect(isTouchLike('mouse')).toBe(false);
    expect(isTouchLike(null)).toBe(false);
    expect(isTouchLike(undefined)).toBe(false);
  });
});

describe('coarse scale knob', () => {
  it('clamps to 0..1', () => {
    setCoarseScale(2);
    expect(getCoarseScale()).toBe(1);
    setCoarseScale(-1);
    expect(getCoarseScale()).toBe(0);
    setCoarseScale(0.5);
    expect(getCoarseScale()).toBe(0.5);
  });

  it('never affects fine devices: coarsePx returns the desktop value', () => {
    setCoarseScale(1);
    expect(coarsePx(8, 12, 1)).toBe(8);
    expect(coarsePx(8, 12, 0.5)).toBe(8);
    setCoarseScale(0.5);
  });
});
