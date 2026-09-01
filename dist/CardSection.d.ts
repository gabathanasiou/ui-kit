import React from 'react';
/**
 * Collapsible section card for a modal/panel body — the "one card per item,
 * rows inside" pattern (day-type sections, rules, cast groups). The card fill
 * comes from its OWN surface token (--ui-card-bg), deliberately distinct from
 * text-field fills (--ui-input-bg), so sections read as raised panels, not
 * inputs. Dark + light themes via the kit tokens.
 *
 * Header: chevron + icon + title + count, with an optional right-aligned
 * `trailing` action (e.g. "Add Rule") OUTSIDE the toggle button (never nest a
 * button inside the toggle). Body renders the dark band (`.ui-card-band`,
 * `border-t p-1.5 space-y-1` — rows sit with gaps, no dividers) unless
 * `bodyClass` overrides it.
 */
export interface CardSectionProps {
    /** Header title (label or node). */
    title: React.ReactNode;
    /** Leading icon (day-type icon, section icon). */
    icon?: React.ReactNode;
    /** Trailing count badge (e.g. "3 days" or "2 rules"). */
    count?: React.ReactNode;
    collapsed: boolean;
    onToggle: () => void;
    /** Right-aligned header actions (e.g. "Add Rule"). */
    trailing?: React.ReactNode;
    /** Body wrapper classes (default = the card band). */
    bodyClass?: string;
    /** data-* attributes for tests/agents (e.g. `{ 'data-kind': 'travel' }`). */
    dataProps?: Record<string, string>;
    children?: React.ReactNode;
}
export declare function CardSection({ title, icon, count, collapsed, onToggle, trailing, bodyClass, dataProps, children }: CardSectionProps): React.JSX.Element;
export default CardSection;
