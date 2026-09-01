"use client";
import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

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

export function CardSection({ title, icon, count, collapsed, onToggle, trailing, bodyClass, dataProps, children }: CardSectionProps) {
  return (
    <div {...dataProps} className="ui-card">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 px-3 py-2 ui-row transition-colors">
        <button
          type="button"
          onClick={onToggle}
          className="flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer"
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5 text-zinc-500 shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 text-zinc-500 shrink-0" />}
          {icon}
          <span className="text-xs font-semibold text-zinc-200 truncate">{title}</span>
          {count && <span className="text-[10px] text-zinc-500 shrink-0">{count}</span>}
        </button>
        {trailing && <div className="shrink-0">{trailing}</div>}
      </div>
      {!collapsed && children && (
        <div className={bodyClass || 'ui-card-band border-t p-1.5 space-y-1'}>{children}</div>
      )}
    </div>
  );
}

export default CardSection;
