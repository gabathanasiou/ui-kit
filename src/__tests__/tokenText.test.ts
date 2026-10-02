import { describe, it, expect } from 'vitest';
import { stripTokenWrappers, preprocessTokenHtml } from '../tokenText';

/* The token storage contract: stored text stays byte-compatible plain
   `{{key}}`, while editor init wraps tokens in the parseable span. */

describe('preprocessTokenHtml', () => {
  it('wraps a token in a data-type=token span', () => {
    expect(preprocessTokenHtml('{{crew.bob}}')).toBe(
      '<span data-type="token" data-field="crew.bob">{{crew.bob}}</span>',
    );
  });

  it('wraps every token in mixed text', () => {
    expect(preprocessTokenHtml('a {{x}} b {{crew.bob.phone}} c')).toBe(
      'a <span data-type="token" data-field="x">{{x}}</span> b <span data-type="token" data-field="crew.bob.phone">{{crew.bob.phone}}</span> c',
    );
  });
});

describe('stripTokenWrappers', () => {
  it('reverses preprocessTokenHtml (round-trip)', () => {
    const stored = 'a {{x}} b {{crew.bob.phone}} c';
    expect(stripTokenWrappers(preprocessTokenHtml(stored))).toBe(stored);
  });

  it('leaves bare tokens untouched', () => {
    expect(stripTokenWrappers('a {{x}}')).toBe('a {{x}}');
  });

  it('strips wrappers carrying extra attributes', () => {
    expect(stripTokenWrappers('<span data-type="token" data-field="x" class="rt-token">{{x}}</span>')).toBe('{{x}}');
  });
});
