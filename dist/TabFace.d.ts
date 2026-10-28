import React from 'react';
/**
 * The icon ↔ label face of a tab (roadmap 258) — the collapsing mechanics,
 * shared by `Button`'s tab variants and available to `Seg` options so a
 * segmented control can adopt the same behavior.
 *
 * Render it INSIDE the hover/active owner (the `Button` / segment), which
 * must carry the `group` class and a `group`-aware layout when `collapse` is
 * on: the labels/icon reveal over `:hover`, `:focus-visible`, `[data-state=
 * open]` and `active`. The label NEVER leaves the DOM while collapsed, so the
 * accessible name (role queries, screen readers) stays intact.
 *
 * - `collapse` (needs `icon`): the label rides a `grid-template-columns`
 *   0fr ↔ 1fr column (auto width, no measurement); the icon↔label gap moves
 *   INTO the clipped label — the shell must then use `gap: 0` (the caller
 *   passes `gap` for the inner spacing; the runtime coarse scale should come
 *   from `coarsePx`).
 * - `iconWithLabel={false}` swaps the pair: the icon is itself a collapsing
 *   column, hidden while the label shows; on a non-collapsing tab the icon is
 *   dropped entirely (the label is the face).
 * - Motion is ~150ms in / 200ms out and is skipped under
 *   `prefers-reduced-motion`.
 */
export interface TabFaceProps {
    icon?: React.ReactNode;
    collapse?: boolean;
    iconWithLabel?: boolean;
    active?: boolean;
    /** Icon ↔ label gap in px (the caller's coarse-scaled value). */
    gap?: number;
    /** Width shim: rendered invisibly beside the label so the tab keeps the
     *  width of its LONGEST label. A toggle that swaps its label (Edit ↔ Done)
     *  then never changes width mid-press. */
    reserve?: React.ReactNode;
    /** Icon-change roll direction: `up` advances (default), `down` rolls back —
     *  so returning to a previous icon comes from the side it left by. */
    roll?: 'up' | 'down';
    children?: React.ReactNode;
}
export declare function TabFace({ icon, collapse, iconWithLabel, active, gap, reserve, roll, children }: TabFaceProps): React.JSX.Element;
