import { describe, it, expect } from 'vitest';
import { isImeConfirm } from '../ime';

/* The IME-confirming Enter guard shared by every kit Enter handler:
   `isComposing` covers the standard path, keyCode 229 covers Safari's
   out-of-order confirming keydown. */

describe('isImeConfirm', () => {
  it('accepts a normal Enter', () => {
    expect(isImeConfirm({ isComposing: false, keyCode: 13 })).toBe(false);
    expect(isImeConfirm({})).toBe(false);
  });

  it('rejects an IME confirmation', () => {
    expect(isImeConfirm({ isComposing: true, keyCode: 229 })).toBe(true);
  });

  it('catches WebKit’s 229 ordering bug without isComposing', () => {
    expect(isImeConfirm({ isComposing: false, keyCode: 229 })).toBe(true);
  });
});
