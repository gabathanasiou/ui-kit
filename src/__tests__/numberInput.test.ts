import { describe, it, expect } from 'vitest';
import { clampNumber, scrubbedValue, steppedValue, SCRUB_PX_PER_STEP } from '../numberInputMath';

/* The NumberInput math: steppers/arrow keys move exactly one `step` and stop
   at the bounds; the drag-scrub maps vertical travel to steps and can never
   leave the range. The component wires these in src/NumberInput.tsx. */

describe('clampNumber', () => {
  it('clamps to the range', () => {
    expect(clampNumber(5, 0, 10)).toBe(5);
    expect(clampNumber(-3, 0, 10)).toBe(0);
    expect(clampNumber(42, 0, 10)).toBe(10);
  });
});

describe('steppedValue', () => {
  it('moves one step in the requested direction', () => {
    expect(steppedValue(12, 1, 0, 24, 1)).toBe(13);
    expect(steppedValue(12, -1, 0, 24, 1)).toBe(11);
  });

  it('honors a custom step', () => {
    expect(steppedValue(10, 1, 0, 100, 5)).toBe(15);
    expect(steppedValue(10, -1, 0, 100, 5)).toBe(5);
  });

  it('stops at the bounds', () => {
    expect(steppedValue(24, 1, 0, 24, 1)).toBe(24);
    expect(steppedValue(0, -1, 0, 24, 1)).toBe(0);
  });
});

describe('scrubbedValue', () => {
  it('drags up to increase and down to decrease', () => {
    expect(scrubbedValue(12, SCRUB_PX_PER_STEP * 5, 0, 24, 1)).toBe(17);
    expect(scrubbedValue(12, -SCRUB_PX_PER_STEP * 5, 0, 24, 1)).toBe(7);
  });

  it('ignores sub-step travel', () => {
    expect(scrubbedValue(12, 1, 0, 24, 1)).toBe(12);
  });

  it('clamps during long drags', () => {
    expect(scrubbedValue(12, 10_000, 0, 24, 1)).toBe(24);
    expect(scrubbedValue(12, -10_000, 0, 24, 1)).toBe(0);
  });

  it('scales with the configured step', () => {
    expect(scrubbedValue(50, SCRUB_PX_PER_STEP * 2, 0, 100, 5)).toBe(60);
    expect(scrubbedValue(50, -SCRUB_PX_PER_STEP * 2, 0, 100, 5)).toBe(40);
  });
});
