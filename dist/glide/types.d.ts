/** Shared shapes for the kit's Glide grid primitives. */
export interface GlideSheetColumn {
    /** Row key this column reads/writes. The synthetic `actions` key is reserved. */
    key: string;
    label: string;
    /** Preferred width — scaled to fit the card by `GlideSheet`. */
    width: number;
    align?: 'left' | 'center' | 'right';
}
/** One cell write produced by an edit, paste, fill or clear. */
export interface GlideSheetEdit {
    row: number;
    colKey: string;
    value: string;
}
export type GlideRowGlyph = 'plus' | 'trash';
/** One trailing per-row action, drawn as a canvas glyph. */
export interface GlideSheetRowAction {
    key: string;
    title: string;
    icon: GlideRowGlyph;
    onClick: () => void;
}
/** A rectangle in grid (row/column) coordinates. */
export interface GlideRange {
    x: number;
    y: number;
    width: number;
    height: number;
}
/** Minimal column shape the pure planners need. */
export interface GlideColumnLike {
    key: string;
}
