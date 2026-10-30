import { describe, it, expect } from 'vitest';
import { resolveKitTheme } from '../ThemeScope';

/* The identity accent (roadmap 332) is what the primary CTA reads. It must
   survive neutral surfaces and nested neutral scopes; the effective accent is
   what every other state reads (neutralised inside a neutral surface). */
describe('resolveKitTheme', () => {
  it('keeps the accent in chrome and accent surfaces', () => {
    const chrome = resolveKitTheme({ mode: 'dark', accent: 'blue', context: 'chrome' }, null);
    expect(chrome).toMatchObject({ accent: 'blue', identityAccent: 'blue', surface: 'neutral' });

    const accent = resolveKitTheme({ mode: 'dark', accent: 'emerald', surface: 'accent' }, null);
    expect(accent).toMatchObject({ accent: 'emerald', identityAccent: 'emerald', surface: 'accent' });
  });

  it('neutralises the effective accent but keeps the identity through layers', () => {
    const root = resolveKitTheme({ accent: 'blue' }, null);
    expect(root).toMatchObject({ accent: 'blue', identityAccent: 'blue' });

    const page = resolveKitTheme({ mode: 'light', surface: 'neutral' }, root);
    expect(page).toMatchObject({ accent: 'zinc', identityAccent: 'blue' });

    /* A nested neutral scope that names no accent must not drop the identity. */
    const card = resolveKitTheme({ mode: 'light', surface: 'neutral' }, page);
    expect(card).toMatchObject({ accent: 'zinc', identityAccent: 'blue' });

    /* An explicit accent is a manual (Lego) override and restores the states. */
    const lego = resolveKitTheme({ accent: 'blue' }, page);
    expect(lego).toMatchObject({ accent: 'blue', identityAccent: 'blue' });
  });

  it('zinc is no project colour at any layer', () => {
    const root = resolveKitTheme({ accent: 'zinc' }, null);
    expect(root.identityAccent).toBe('zinc');
    const modal = resolveKitTheme({ mode: 'dark', accent: 'zinc', surface: 'accent' }, root);
    expect(modal).toMatchObject({ accent: 'zinc', identityAccent: 'zinc' });
  });
});
