// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { sanitizeRichText, stripRichText, normalizeSpaces, escapeHtml } from '../richText';

/* The rich-text storage contract: whitelist sanitizer + `{{key}}` passthrough.
   This is the boundary between the editor and stored/printed text — a silent
   break here corrupts saved values, so it belongs at the unit layer. */

describe('normalizeSpaces', () => {
  it('converts entity and raw non-breaking spaces to regular spaces', () => {
    expect(normalizeSpaces('a&nbsp;b\u00A0c')).toBe('a b c');
  });
});

describe('escapeHtml', () => {
  it('escapes the four dangerous characters', () => {
    expect(escapeHtml('<a & "b">')).toBe('&lt;a &amp; &quot;b&quot;&gt;');
  });
});

describe('sanitizeRichText', () => {
  it('keeps the allowed tags', () => {
    expect(sanitizeRichText('<b>bold</b> <i>it</i> <u>u</u> <s>s</s>')).toBe('<b>bold</b> <i>it</i> <u>u</u> <s>s</s>');
  });

  it('unwraps unknown tags but keeps their text', () => {
    expect(sanitizeRichText('<div><h1>Title</h1></div>')).toBe('<div>Title</div>');
    expect(sanitizeRichText('<script>alert(1)</script>')).not.toContain('<script');
    expect(sanitizeRichText('<img src="x">')).toBe('');
  });

  it('filters the style attribute to the whitelisted props', () => {
    expect(sanitizeRichText('<span style="font-size: 14pt; position: fixed">x</span>'))
      .toBe('<span style="font-size: 14pt">x</span>');
    expect(sanitizeRichText('<span style="position: fixed">x</span>')).toBe('<span>x</span>');
  });

  it('drops javascript: hrefs (unwraps the anchor, keeps the text)', () => {
    expect(sanitizeRichText('<a href="javascript:alert(1)">click</a>')).toBe('click');
  });

  it('keeps http(s)/mailto anchors with target and rel', () => {
    expect(sanitizeRichText('<a href="https://x.test" target="_blank" rel="noreferrer">x</a>'))
      .toBe('<a href="https://x.test" target="_blank" rel="noreferrer">x</a>');
    expect(sanitizeRichText('<a href="mailto:a@b.test">mail</a>')).toBe('<a href="mailto:a@b.test">mail</a>');
  });

  it('normalizes strong/em to b/i and keeps empty paragraphs visible', () => {
    expect(sanitizeRichText('<strong>a</strong><em>b</em>')).toBe('<b>a</b><i>b</i>');
    expect(sanitizeRichText('<p></p>')).toBe('<p><br></p>');
  });

  it('passes plain text and {{token}} keys through', () => {
    expect(sanitizeRichText('plain {{crew.bob.phone}}')).toBe('plain {{crew.bob.phone}}');
  });

  it('normalizes non-breaking spaces in stored content', () => {
    expect(sanitizeRichText('<div>a&nbsp;b</div>')).toBe('<div>a b</div>');
  });
});

describe('stripRichText', () => {
  it('removes markup and trims', () => {
    expect(stripRichText('<div><b> a </b><br></div>')).toBe('a');
  });

  it('passes plain text through', () => {
    expect(stripRichText('plain {{x}}')).toBe('plain {{x}}');
  });
});
