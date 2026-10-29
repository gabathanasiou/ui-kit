import type { Theme } from '@glideapps/glide-data-grid';
/**
 * The tiny shared paint helpers every painted Glide cell needs.
 *
 * Kept apart from `customCells.tsx` so the control cells (and the lean
 * `glide-controls` package entry) do not pull the kit's morph fields and
 * search menu just to draw a glyph.
 */
export type PaintIcon = 'plus' | 'trash' | 'chevron' | 'check' | 'search';
/** Canvas theme dark/light discriminator (shared by every painted cell kind). */
export declare function isDark(theme: Theme): boolean;
export declare function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void;
export declare function drawIcon(ctx: CanvasRenderingContext2D, icon: PaintIcon, x: number, y: number, size: number, color: string): void;
