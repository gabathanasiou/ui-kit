"use client";
import React, { createContext, useContext } from 'react';

/**
 * Two-axis theming + surface ownership (roadmap 302).
 *
 *   mode    — the neutral ladder: light or dark surfaces, text, borders.
 *   accent  — the project identity: zinc (none), blue (Drive-style) or
 *             emerald (shared). Chrome (the app header/tabs) and explicitly
 *             accent-tinted surfaces use it; a NEUTRAL surface suppresses it.
 *   surface — `neutral` keeps the normal light/dark palette AND drops the
 *             accent inside (normal modals); `accent` opts a container into the
 *             tinted ladder (strong header, soft body, faint wells) and keeps
 *             selection/hover/checked on the project colour.
 *   context — where the theme lives. `chrome` = a coloured header/toolbar:
 *             identity colours always apply and menus open FULLY coloured.
 *             `surface` = a modal/panel: menus stay light/dark, with accent
 *             states only when the surface is accented.
 *
 * Manual colour (the "Lego" override): a nested provider that sets ONLY
 * `accent` keeps that accent even inside a neutral surface; a nested provider
 * that explicitly declares `surface="neutral"` neutralises again.
 *
 * A surface owns its theme: `ThemeProvider` publishes it, `ThemeScope` also
 * writes the attributes on a wrapper. Portaled kit roots (menus, tooltips,
 * dialogs) re-write the axes on their portal div — React context crosses a
 * portal, DOM attributes do not.
 *
 * Precedence: explicit component prop → nearest provider/scope → the kit's
 * historical default (light toolbars, dark modals/menus, zinc accent).
 */
export type KitMode = 'light' | 'dark';
export type KitAccent = 'zinc' | 'blue' | 'emerald';
export type KitSurface = 'neutral' | 'accent';
export type KitContext = 'chrome' | 'surface';
export type KitMenuTheme = 'light' | 'dark' | 'blue' | 'emerald';

export interface KitTheme {
  mode: KitMode;
  accent: KitAccent;
  surface: KitSurface;
  context: KitContext;
}

const KitThemeContext = createContext<KitTheme | null>(null);

export interface ThemeProviderProps {
  mode?: KitMode;
  accent?: KitAccent;
  surface?: KitSurface;
  context?: KitContext;
  children: React.ReactNode;
}

/** Resolve one theme layer against its parent. `surface="neutral"` in a
 *  SURFACE context means the accent is not applied: identity colours belong to
 *  chrome (the app header/tabs) or to an explicitly accent-tinted surface.
 *  A child that sets ONLY `accent` is a manual (Lego) override and keeps it. */
export function resolveKitTheme(
  input: Partial<KitTheme>,
  parent: KitTheme | null,
): KitTheme {
  const mode = input.mode ?? parent?.mode ?? 'dark';
  const surface = input.surface ?? parent?.surface ?? 'neutral';
  const context = input.context ?? parent?.context ?? 'surface';
  const identityAccent = input.accent ?? parent?.accent ?? 'zinc';
  const localOverride = input.accent !== undefined && input.surface === undefined && input.context === undefined;
  const accentApplies = context === 'chrome' || surface === 'accent' || localOverride;
  return { mode, accent: accentApplies ? identityAccent : 'zinc', surface, context };
}

/** Publish an already-resolved theme (Modal/ThemeScope use this so their
 *  surface decision is not re-resolved into a second neutral layer). */
export function ResolvedThemeProvider({ theme, children }: { theme: KitTheme; children: React.ReactNode }) {
  return <KitThemeContext.Provider value={theme}>{children}</KitThemeContext.Provider>;
}

/** Context-only surface owner — use inside a component that already renders
 *  its own portal/root (Modal), so the whole subtree (portals included)
 *  inherits the theme without an extra DOM wrapper. */
export function ThemeProvider({ mode, accent, surface, context, children }: ThemeProviderProps) {
  const parent = useKitTheme();
  return (
    <ResolvedThemeProvider theme={resolveKitTheme({ mode, accent, surface, context }, parent)}>
      {children}
    </ResolvedThemeProvider>
  );
}

export interface ThemeScopeProps extends ThemeProviderProps {
  className?: string;
  style?: React.CSSProperties;
}

/** Provider + the `data-*` attributes on a wrapper (pages, panels, cards). */
export function ThemeScope({ mode, accent, surface, context, children, className, style }: ThemeScopeProps) {
  const parent = useKitTheme();
  const theme = resolveKitTheme({ mode, accent, surface, context }, parent);
  return (
    <ResolvedThemeProvider theme={theme}>
      <div
        data-mode={theme.mode}
        data-accent={theme.accent}
        data-surface={theme.surface}
        data-context={theme.context}
        className={className}
        style={style}
      >
        {children}
      </div>
    </ResolvedThemeProvider>
  );
}

/** The nearest surface theme, or null when the consumer has not opted in. */
export function useKitTheme(): KitTheme | null {
  return useContext(KitThemeContext);
}

/** `DropdownMenu` / `ContextMenu` preset for an ambient scope. A CHROME
 *  context opens fully coloured menus on dark chrome (blue/emerald) or the
 *  plain dark menu for zinc. A SURFACE context stays light/dark — its accent
 *  reaches the selected/hover rows only when the surface is accented (a
 *  neutral surface carries no accent). */
export function menuThemeOf(theme: KitTheme | null, fallback: KitMenuTheme = 'dark'): KitMenuTheme {
  if (!theme) return fallback;
  if (theme.context === 'surface') return theme.mode;
  if (theme.mode === 'light') return 'light';
  return theme.accent === 'emerald' ? 'emerald' : theme.accent === 'blue' ? 'blue' : 'dark';
}

/** What a menu should render: the preset plus the attributes that must travel
 *  with its portal root. Explicit `theme` wins; a chrome scope sets the full
 *  preset; a surface scope sets mode + the effective accent (neutral panel;
 *  accented states only on an accent surface or a manual override). */
export function menuAttributesOf(explicit: KitMenuTheme | undefined, theme: KitTheme | null): {
  theme: KitMenuTheme;
  attrs: Record<string, string>;
} {
  if (explicit) {
    /* Light/dark are SURFACES, not accents: inherit the resolved accent axis
       so a light menu in an emerald/zinc project keeps project-coloured
       checks, selected rows and hover states. `data-mode` is the MENU's own
       mode (a light menu on a dark page needs light-mode check marks). The
       blue/emerald palettes are explicit accents and stay self-contained. */
    if ((explicit === 'light' || explicit === 'dark') && theme) {
      return {
        theme: explicit,
        attrs: { 'data-theme': explicit, 'data-mode': explicit, 'data-accent': theme.accent },
      };
    }
    return { theme: explicit, attrs: { 'data-theme': explicit } };
  }
  if (!theme) return { theme: 'dark', attrs: { 'data-theme': 'dark' } };
  if (theme.context === 'chrome') {
    const preset = menuThemeOf(theme);
    return { theme: preset, attrs: { 'data-theme': preset } };
  }
  return { theme: theme.mode, attrs: { 'data-mode': theme.mode, 'data-accent': theme.accent } };
}

/** `Seg` track mode for an ambient scope (the accent is a token, not a
 *  palette: the pill follows `--ui-seg-pill`). */
export function segModeOf(theme: KitTheme | null, fallback: KitMode = 'light'): KitMode {
  return theme?.mode ?? fallback;
}

/** `Button`'s `cloud` accent for an ambient scope. Chrome surfaces and
 *  accent-tinted containers use the project colour; a NEUTRAL surface stays
 *  neutral (and its accent is suppressed). */
export function buttonCloudOf(theme: KitTheme | null): boolean | 'emerald' {
  if (!theme) return false;
  if (theme.context !== 'chrome' && theme.surface !== 'accent') return false;
  return theme.accent === 'emerald' ? 'emerald' : theme.accent === 'blue';
}
