import { type CustomCell, type CustomRenderer, type Item } from '@glideapps/glide-data-grid';
import { type ControlLane } from './controlGeometry';
/**
 * Canvas-native CONTROL cells — affordances painted, hit-tested and focused
 * exactly like the cell itself (no `domCells`, no DOM box).
 *
 *  - `kitPickerCell` — a value with a 24px chevron lane. The lane opens the
 *    SAME overlay `PickerField` a double-click does; the body only selects.
 *  - `kitGlyphCell` — a trash/plus/chevron/check button. Lane-only hover, a
 *    ~90ms painted press flash, `pointer` over the lane.
 *  - `kitGlyphGroupCell` — 2+ glyph buttons inside ONE cell (split lanes), so
 *    row actions do not need a column each.
 *
 * The hover fill is the WHOLE target rectangle (never an inset pill) and its
 * colour is configurable (`hoverBg`, painted as given — pass a translucent
 * tint); the default is the tone's wash. Glide gives custom renderers the
 * pointer position (`needsHoverPosition` → `hoverX/hoverY`), the click with
 * cell-local coordinates (`onClick`), and a per-frame repaint request
 * (`requestAnimationFrame`). The grid keeps owning selection, keyboard
 * navigation, copy/paste and the focus rectangle.
 *
 * The picker's editor is the column's existing `select` editor
 * (`createGlideCellEditor` → `PickerField`); pair a picker column with an
 * `editors`/`getEditor` entry. Glyph cells are read-only and fire through the
 * host's `onCellActivated` (Enter/Space → the FIRST button) or their click.
 */
export interface KitPickerCellData {
    kind: 'kit-picker';
    /** Painted value (what the cell shows). */
    value: string;
    /** Accessible name / ARIA mirror. Also the press-flash key — keep it unique
     *  per row ("Cast for scene 3"). */
    label?: string;
    /** Painted when `value` is empty. */
    placeholder?: string;
    /** What the overlay PickerField seeds with when it differs from the painted
     *  value (an id-keyed picker whose cell shows a name). */
    seedValue?: string;
    /** Chevron-lane hover fill (painted as given; use a translucent tint). */
    hoverBg?: string;
    /** Single click on the chevron lane (the host opens the overlay editor). */
    onOpen?: () => void;
}
export type KitPickerCell = CustomCell<KitPickerCellData>;
export declare function kitPickerCell(data: Omit<KitPickerCellData, 'kind'> & {
    align?: 'left' | 'center' | 'right';
}): KitPickerCell;
export type KitGlyphIcon = 'trash' | 'plus' | 'chevron' | 'check';
export type KitGlyphTone = 'neutral' | 'danger' | 'accent';
export interface KitGlyphButton {
    icon: KitGlyphIcon;
    /** Accessible name; unique per row (the press-flash key). */
    label: string;
    tone?: KitGlyphTone;
    /** Hover fill for this button's rectangle, painted as given. Pass a
     *  translucent tint (`rgba(…)`); the default is the tone's wash. */
    hoverBg?: string;
    onActivate?: () => void;
}
export interface KitGlyphCellData extends KitGlyphButton {
    kind: 'kit-glyph';
    /** Target strip: `'full'` (default — the whole cell is the button) or a
     *  pixel width at the cell's right edge (a chevron inside a field cell). */
    lane?: ControlLane;
}
export type KitGlyphCell = CustomCell<KitGlyphCellData>;
export declare function kitGlyphCell(data: Omit<KitGlyphCellData, 'kind'>): KitGlyphCell;
export interface KitGlyphGroupCellData {
    kind: 'kit-glyph-group';
    /** Left-to-right buttons; the FIRST is the primary (Enter/Space fires it). */
    buttons: KitGlyphButton[];
    lane?: ControlLane;
}
export type KitGlyphGroupCell = CustomCell<KitGlyphGroupCellData>;
/** 2+ glyph buttons in one cell, split into equal lanes — one row-action
 *  column instead of one column per button. */
export declare function kitGlyphGroupCell(data: {
    buttons: KitGlyphButton[];
    lane?: ControlLane;
}): KitGlyphGroupCell;
export declare function isKitPickerCell(cell: unknown): cell is KitPickerCell;
export declare function isKitGlyphCell(cell: unknown): cell is KitGlyphCell;
export declare function isKitGlyphGroupCell(cell: unknown): cell is KitGlyphGroupCell;
/** True for any painted control cell (the host schedules its press repaint). */
export declare function isControlCell(cell: unknown): boolean;
/** Start the ~90ms press flash for a control cell (the keyboard activation
 *  path; pointer clicks record it inside the renderer's `onClick`). */
export declare function pressControlCell(cell: Item, label?: string): void;
/** The control renderers `GlideSheet` registers by default. */
export declare const controlCellRenderers: readonly CustomRenderer<any>[];
