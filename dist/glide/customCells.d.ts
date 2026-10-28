import { type CustomCell, type CustomRenderer } from '@glideapps/glide-data-grid';
/**
 * Custom Glide cells drawn by the kit.
 *
 * Three things a plain Glide cell cannot express:
 *  - a BUTTON that fires on a SINGLE click (drawn on the canvas, so it is a
 *    picture of a kit button rather than a DOM button);
 *  - a BADGE/PILL (a drawn status label with its own colours);
 *  - a FIELD cell: one click opens a REAL kit morph control — `SearchMenu`-style
 *    search or a create/text box (`MorphSearchField` / `MorphActionField`) —
 *    in Glide's overlay editor. The animation is the kit's; the cell is only
 *    the closed trigger face.
 *
 * All are `GridCellKind.Custom` cells resolved by `customRenderers` on the
 * DataEditor. Clicks are hit-tested by Glide and dispatched to the renderer,
 * so the cells keep working while the grid scrolls and recycles.
 */
export type KitButtonIcon = 'plus' | 'trash' | 'chevron' | 'check' | 'search';
export type KitButtonVariant = 'primary' | 'subtle' | 'outline' | 'danger';
export interface KitButtonCellData {
    kind: 'kit-button';
    label: string;
    icon?: KitButtonIcon;
    variant?: KitButtonVariant;
    disabled?: boolean;
    /** Fired on a single click. Keep side effects small — it is a cell, not a form. */
    onActivate?: () => void;
}
export type KitButtonCell = CustomCell<KitButtonCellData>;
/** A canvas-drawn button cell. `readonly` — it never opens an editor. The
 *  `kind` discriminator is added here so callers pass only the face. */
export declare function kitButtonCell(data: Omit<KitButtonCellData, 'kind'>): KitButtonCell;
export interface KitBadgeCellData {
    kind: 'kit-badge';
    label: string;
    /** Tailwind-ish tone names the renderer knows how to paint. */
    tone?: 'neutral' | 'accent' | 'success' | 'warning' | 'danger';
}
export type KitBadgeCell = CustomCell<KitBadgeCellData>;
export declare function kitBadgeCell(data: Omit<KitBadgeCellData, 'kind'>): KitBadgeCell;
export interface KitFieldCellData {
    kind: 'kit-field';
    /** `search` = one click opens the kit MorphSearchField (the filter face);
     *  `action` = one click opens MorphActionField (the create/text-box face). */
    mode: 'search' | 'action';
    /** The closed trigger's label — what the cell shows and what the morph
     *  button reads before it expands. */
    label: string;
    /** Current value (a committed search term / created text). */
    value?: string;
    icon?: KitButtonIcon;
    variant?: KitButtonVariant;
    placeholder?: string;
    /** Fired with the submitted text. */
    onSubmit?: (value: string) => void;
}
export type KitFieldCell = CustomCell<KitFieldCellData>;
/** A button-face cell whose ONE click opens a real kit field (morph search or
 *  create/text box) in Glide's overlay editor. */
export declare function kitFieldCell(data: Omit<KitFieldCellData, 'kind'>): KitFieldCell;
/** The renderer list `GlideSheet` always registers. */
export declare const kitCellRenderers: readonly CustomRenderer<any>[];
/** Alias kept for hosts that prefer the upper-case constant. */
export declare const KIT_GLIDE_RENDERERS: readonly CustomRenderer<any>[];
