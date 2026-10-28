import React from 'react';
/**
 * The ONE button→text-box cross-fade shell. Layout only: it owns
 *  - the animated collapsed/expanded width,
 *  - the trigger layer that fades/scales out,
 *  - the absolutely-positioned field layer that fades/scales in.
 *
 * Behaviour (open/close state, focus, outside click, submit, actions) stays in
 * the component using it — `MorphSearchField`, `MorphActionField` and
 * `SearchMenu` compose this shell so a morph is never hand-rolled twice.
 */
export interface MorphFieldShellProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    expanded: boolean;
    /** Collapsed width in px, or `'auto'` — the root hugs the trigger, so an
     *  icon-first trigger (`Button collapse`) can EXPAND on hover without a
     *  reserved empty box. `auto` cannot CSS-transition, so the shell measures
     *  the live width on expand and starts the width animation from it (FLIP);
     *  closing snaps back (the trigger cross-fade covers it). */
    collapsedWidth: number | 'auto';
    expandedWidth: number;
    /** Collapsed button face (rendered inside the fading trigger layer). */
    trigger: React.ReactNode;
    /** Expanded field face (rendered inside the absolute field layer). */
    field: React.ReactNode;
    /** Positioning/anchor ref from the consumer. */
    rootRef?: React.Ref<HTMLDivElement>;
    /** Prevent flex shrinking (toolbar controls). Default false. */
    shrink?: boolean;
    /** Fill the container instead of hugging `collapsedWidth`: the whole box
     *  (and the expanded field) is 100% wide. For grid cells and full-width
     *  toolbars; the width morph becomes a cross-fade. */
    stretch?: boolean;
}
export declare function MorphFieldShell({ expanded, collapsedWidth, expandedWidth, trigger, field, rootRef, shrink, stretch, className, style, ...rest }: MorphFieldShellProps): React.JSX.Element;
export default MorphFieldShell;
