import React from 'react';
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
    /** The EFFECTIVE accent: neutralised to zinc inside a neutral surface. */
    accent: KitAccent;
    /** The project identity, kept even when `accent` is neutralised. The
     *  primary CTA reads this so a normal (neutral) modal's main action still
     *  wears the project colour. */
    identityAccent: KitAccent;
    surface: KitSurface;
    context: KitContext;
}
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
export declare function resolveKitTheme(input: Partial<KitTheme>, parent: KitTheme | null): KitTheme;
/** Publish an already-resolved theme (Modal/ThemeScope use this so their
 *  surface decision is not re-resolved into a second neutral layer). */
export declare function ResolvedThemeProvider({ theme, children }: {
    theme: KitTheme;
    children: React.ReactNode;
}): React.JSX.Element;
/** Context-only surface owner — use inside a component that already renders
 *  its own portal/root (Modal), so the whole subtree (portals included)
 *  inherits the theme without an extra DOM wrapper. */
export declare function ThemeProvider({ mode, accent, surface, context, children }: ThemeProviderProps): React.JSX.Element;
export interface ThemeScopeProps extends ThemeProviderProps {
    className?: string;
    style?: React.CSSProperties;
}
/** Provider + the `data-*` attributes on a wrapper (pages, panels, cards). */
export declare function ThemeScope({ mode, accent, surface, context, children, className, style }: ThemeScopeProps): React.JSX.Element;
/** The nearest surface theme, or null when the consumer has not opted in. */
export declare function useKitTheme(): KitTheme | null;
/** `DropdownMenu` / `ContextMenu` preset for an ambient scope. A CHROME
 *  context opens fully coloured menus on dark chrome (blue/emerald) or the
 *  plain dark menu for zinc. A SURFACE context stays light/dark — its accent
 *  reaches the selected/hover rows only when the surface is accented (a
 *  neutral surface carries no accent). */
export declare function menuThemeOf(theme: KitTheme | null, fallback?: KitMenuTheme): KitMenuTheme;
/** What a menu should render: the preset plus the attributes that must travel
 *  with its portal root. Explicit `theme` wins; a chrome scope sets the full
 *  preset; a surface scope sets mode + the effective accent (neutral panel;
 *  accented states only on an accent surface or a manual override). */
export declare function menuAttributesOf(explicit: KitMenuTheme | undefined, theme: KitTheme | null): {
    theme: KitMenuTheme;
    attrs: Record<string, string>;
};
/** `Seg` track mode for an ambient scope (the accent is a token, not a
 *  palette: the pill follows `--ui-seg-pill`). */
export declare function segModeOf(theme: KitTheme | null, fallback?: KitMode): KitMode;
/** `Button`'s `cloud` accent for an ambient scope. Chrome surfaces and
 *  accent-tinted containers use the project colour; a NEUTRAL surface stays
 *  neutral (and its accent is suppressed). */
export declare function buttonCloudOf(theme: KitTheme | null): boolean | 'emerald';
