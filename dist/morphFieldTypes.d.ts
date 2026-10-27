import type { ReactNode } from 'react';
/**
 * Shared action model for the morph fields (`MorphSearchField`,
 * `MorphActionField`, and the expandable `SearchMenu`): one icon button inside
 * the expanded text box's right edge.
 */
export interface MorphFieldAction {
    key: string;
    /** Accessible name + tooltip for the icon button. */
    label: string;
    icon: ReactNode;
    /** Receives the current draft. `close` collapses immediately. */
    onClick: (value: string, api: {
        close: () => void;
    }) => void;
    /** Keep the field open after this action (default false = collapse). */
    keepOpen?: boolean;
}
