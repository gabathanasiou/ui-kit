"use client";
import React, { createContext, useContext } from 'react';

/**
 * Two-axis theming + surface ownership (roadmap 302).
 *
 *   mode    — the neutral ladder: light or dark surfaces, text, borders.
 *   accent  — the project identity: zinc (none), blue (Drive-style) or
 *             emerald (shared). Drives selection/hover/checked, the modal
 *             surface ladder and the colored chrome presets.
 *   surface — `neutral` keeps the normal light/dark palette; `accent` opts a
 *             container into the tinted ladder (strong header, soft body,
 *             faint wells) — the project-coloured modal.
 *   context — where the theme lives. `chrome` = a coloured header/toolbar:
 *             menus open FULLY coloured. `surface` = a modal/panel: menus stay
 *             light/dark and only their accent (selection/hover/checked) is
 *             tinted. An explicit `theme` prop still overrides either.
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

/** Context-only surface owner — use inside a component that already renders
 *  its own portal/root (Modal), so the whole subtree (portals included)
 *  inherits the theme without an extra DOM wrapper. */
export function ThemeProvider({ mode = 'dark', accent = 'zinc', surface = 'neutral', context = 'surface', children }: ThemeProviderProps) {
  return (
    <KitThemeContext.Provider value={{ mode, accent, surface, context }}>
      {children}
    </KitThemeContext.Provider>
  );
}

export interface ThemeScopeProps extends ThemeProviderProps {
  className?: string;
  style?: React.CSSProperties;
}

/** Provider + the `data-*` attributes on a wrapper (pages, panels, cards). */
export function ThemeScope({ mode = 'dark', accent = 'zinc', surface = 'neutral', context = 'surface', children, className, style }: ThemeScopeProps) {
  return (
    <ThemeProvider mode={mode} accent={accent} surface={surface} context={context}>
      <div
        data-mode={mode}
        data-accent={accent}
        data-surface={surface}
        data-context={context}
        className={className}
        style={style}
      >
        {children}
      </div>
    </ThemeProvider>
  );
}

/** The nearest surface theme, or null when the consumer has not opted in. */
export function useKitTheme(): KitTheme | null {
  return useContext(KitThemeContext);
}

/** `DropdownMenu` / `ContextMenu` preset for an ambient scope. A CHROME
 *  context opens fully coloured menus on dark chrome (blue/emerald) or the
 *  plain dark menu for zinc. A SURFACE context stays light/dark — its accent
 *  reaches the selected/hover rows through the tokens, never the panel. */
export function menuThemeOf(theme: KitTheme | null, fallback: KitMenuTheme = 'dark'): KitMenuTheme {
  if (!theme) return fallback;
  if (theme.context === 'surface') return theme.mode;
  if (theme.mode === 'light') return 'light';
  return theme.accent === 'emerald' ? 'emerald' : theme.accent === 'blue' ? 'blue' : 'dark';
}

/** What a menu should render: the preset plus the attributes that must travel
 *  with its portal root. Explicit `theme` wins; a chrome scope sets the full
 *  preset; a surface scope sets mode + accent (neutral panel, accent states). */
export function menuAttributesOf(explicit: KitMenuTheme | undefined, theme: KitTheme | null): {
  theme: KitMenuTheme;
  attrs: Record<string, string>;
} {
  if (explicit) return { theme: explicit, attrs: { 'data-theme': explicit } };
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
 *  accent-tinted containers use the project colour; a NEUTRAL surface keeps
 *  the neutral primary (selection/checkbox accents still follow the theme). */
export function buttonCloudOf(theme: KitTheme | null): boolean | 'emerald' {
  if (!theme) return false;
  if (theme.context !== 'chrome' && theme.surface !== 'accent') return false;
  return theme.accent === 'emerald' ? 'emerald' : theme.accent === 'blue';
}
