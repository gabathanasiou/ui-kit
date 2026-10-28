import { useMemo } from 'react';
import { getDefaultTheme, type Theme } from '@glideapps/glide-data-grid';
import { useKitTheme } from '../ThemeScope';

/**
 * Glide's canvas theme, resolved from the kit.
 *
 * Glide paints on a canvas: every colour must be a concrete value, so CSS
 * custom properties are read once per theme change and merged into a `Theme`
 * object (canvas `fillStyle` does not resolve `var(--…)`).
 *
 * The neutral ladder is the kit's zinc palette in both modes; the accent comes
 * from `--ui-accent-*` so the Theme lab's blue/emerald choice reaches the grid's
 * selection + custom-cell buttons.
 */

export type GlideMode = 'light' | 'dark';

export interface GlideCellColors {
  /** Read-only text (role labels, ids). */
  muted: string;
  /** Secondary/disabled text. */
  faint: string;
  /** A cell whose value is a local override (amber). */
  override: string;
  /** Editable-cell wash at rest. */
  editableBg: string;
  /** Editable-cell wash on the hovered row. */
  editableHoverBg: string;
  /** Read-only cell on the hovered row (neutral, never the editable blue). */
  readonlyHoverBg: string;
}

export function glideCellColors(mode: GlideMode = 'light'): GlideCellColors {
  return mode === 'dark'
    ? {
      muted: '#a1a1aa',
      faint: '#71717a',
      override: '#fbbf24',
      editableBg: '#27272a',
      editableHoverBg: '#3f3f46',
      readonlyHoverBg: '#27272a',
    }
    : {
      muted: '#52525b',
      faint: '#71717a',
      override: '#b45309',
      editableBg: '#eff6ff',
      editableHoverBg: '#dbeafe',
      readonlyHoverBg: '#f4f4f5',
    };
}

/** The kit accent as a canvas colour. Canvas cannot read `var(--…)`, and the
 *  corner is resolved from the accent NAME (the same 600 hex each preset sets
 *  in tokens.css) so the grid follows the Theme lab without DOM probing. */
export function readGlideAccent(accent: 'zinc' | 'blue' | 'emerald' = 'zinc'): string {
  switch (accent) {
    case 'blue': return '#2563eb';
    case 'emerald': return '#059669';
    default: return '#52525b';
  }
}

export interface GlideThemeOptions {
  fontSize?: number;
  mode?: GlideMode;
  /** Canvas accent (selection, primary custom cells). */
  accent?: string;
  /** Row/header heights derive from the font size; hosts tune the base paddings. */
  overrides?: Partial<Theme>;
}

/** Builds the DataEditor `theme` for one mode + accent. */
export function createGlideTheme(options: GlideThemeOptions = {}): Theme {
  const { fontSize = 12, mode = 'light', accent = '#2563eb', overrides } = options;
  const base = getDefaultTheme();
  const light = mode === 'light';
  return {
    ...base,
    accentColor: accent,
    accentFg: '#ffffff',
    accentLight: light ? '#dbeafe' : '#3f3f46',
    textDark: light ? '#18181b' : '#ffffff',
    textMedium: light ? '#71717a' : '#a1a1aa',
    textLight: light ? '#a1a1aa' : '#71717a',
    textBubble: light ? '#18181b' : '#ffffff',
    bgIconHeader: light ? '#ffffff' : '#27272a',
    fgIconHeader: light ? '#52525b' : '#a1a1aa',
    textHeader: light ? '#71717a' : '#a1a1aa',
    textHeaderSelected: light ? '#1e40af' : '#ffffff',
    bgCell: light ? '#ffffff' : '#18181b',
    bgCellMedium: light ? '#fafafa' : '#1c1c1f',
    bgHeader: light ? '#ffffff' : '#27272a',
    bgHeaderHasFocus: light ? '#fafafa' : '#3f3f46',
    bgHeaderHovered: light ? '#f4f4f5' : '#3f3f46',
    bgBubble: light ? '#f4f4f5' : '#27272a',
    bgBubbleSelected: light ? '#dbeafe' : '#3f3f46',
    bgSearchResult: light ? '#fef08a' : '#713f12',
    borderColor: light ? '#e4e4e7' : '#3f3f46',
    drilldownBorder: light ? '#e4e4e7' : '#3f3f46',
    linkColor: accent,
    cellHorizontalPadding: 8,
    cellVerticalPadding: 4,
    headerFontStyle: `600 ${Math.max(10, fontSize - 1)}px`,
    baseFontStyle: `${fontSize}px`,
    markerFontStyle: `500 ${fontSize}px`,
    fontFamily: 'Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif',
    editorFontSize: `${fontSize}px`,
    lineHeight: 1.4,
    ...overrides,
  };
}

/** The ambient kit mode + accent as a grid theme. Re-resolves when the Theme
 *  lab (or a project chrome) changes mode/accent. */
export function useGlideTheme(fontSize = 12, overrides?: Partial<Theme>): {
  theme: Theme;
  cellColors: GlideCellColors;
  mode: GlideMode;
} {
  const kit = useKitTheme();
  const mode: GlideMode = kit?.mode ?? 'light';
  return useMemo(() => {
    const accent = readGlideAccent(kit?.accent ?? 'zinc');
    return {
      theme: createGlideTheme({ fontSize, mode, accent, overrides }),
      cellColors: glideCellColors(mode),
      mode,
    };
  }, [mode, kit?.accent, fontSize]);
}
