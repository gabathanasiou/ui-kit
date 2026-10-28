import { type Theme } from '@glideapps/glide-data-grid';
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
export declare function glideCellColors(mode?: GlideMode): GlideCellColors;
/** The kit accent as a canvas colour. Canvas cannot read `var(--…)`, and the
 *  corner is resolved from the accent NAME (the same 600 hex each preset sets
 *  in tokens.css) so the grid follows the Theme lab without DOM probing. */
export declare function readGlideAccent(accent?: 'zinc' | 'blue' | 'emerald'): string;
export interface GlideThemeOptions {
    fontSize?: number;
    mode?: GlideMode;
    /** Canvas accent (selection, primary custom cells). */
    accent?: string;
    /** Row/header heights derive from the font size; hosts tune the base paddings. */
    overrides?: Partial<Theme>;
}
/** Builds the DataEditor `theme` for one mode + accent. */
export declare function createGlideTheme(options?: GlideThemeOptions): Theme;
/** The ambient kit mode + accent as a grid theme. Re-resolves when the Theme
 *  lab (or a project chrome) changes mode/accent. */
export declare function useGlideTheme(fontSize?: number, overrides?: Partial<Theme>): {
    theme: Theme;
    cellColors: GlideCellColors;
    mode: GlideMode;
};
