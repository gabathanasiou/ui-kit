"use client";
import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useCoarse } from './device';

/**
 * Collapsible section card for a modal/panel body — the "one card per item,
 * rows inside" pattern (day-type sections, rules, cast groups). The card fill
 * comes from its OWN surface token (--ui-card-bg), deliberately distinct from
 * text-field fills (--ui-input-bg), so sections read as raised panels, not
 * inputs. Dark + light themes via the kit tokens; touch devices get the coarse
 * header/toggle bump.
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
  /** Section tone — `danger` tints the header + a left accent bar with the
     danger token. Pass `className` for any custom color (e.g. a blue
     section via inline style / Tailwind). */
  tone?: 'default' | 'danger';
  collapsed: boolean;
  onToggle: () => void;
  /** Right-aligned header actions (e.g. "Add Rule"). */
  trailing?: React.ReactNode;
  /** Body wrapper classes (default = the card band). */
  bodyClass?: string;
  /** Extra classes on the card shell (custom colors, spacing). */
  className?: string;
  /** data-* attributes for tests/agents (e.g. `{ 'data-kind': 'travel' }`). */
  dataProps?: Record<string, string>;
  children?: React.ReactNode;
}

export function CardSection({ title, icon, count, tone = 'default', collapsed, onToggle, trailing, bodyClass, className = '', dataProps, children }: CardSectionProps) {
  const coarse = useCoarse();
  const headPad = coarse ? 'px-3.5 py-3' : 'px-3 py-2';
  const titleCls = coarse ? 'text-sm' : 'text-xs';
  const chevronCls = coarse ? 'w-4 h-4' : 'w-3.5 h-3.5';
  const countCls = coarse ? 'text-xs' : 'text-[10px]';
  return (
    <div {...dataProps} className={`ui-card ${tone === 'danger' ? 'ui-card-danger' : ''} ${className}`}>
      {/* Transparent-ish hover (white/5) so it reads on ANY card color — the
         old ui-row gray clash showed on tinted cards. Title + chevron stay
         neutral/white regardless of tone (the tone is the background). */}
      <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 ${headPad} hover:bg-white/5 transition-colors`}>
        <button
          type="button"
          onClick={onToggle}
          className="flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer"
        >
          {collapsed ? <ChevronRight className={`${chevronCls} text-zinc-400 shrink-0`} /> : <ChevronDown className={`${chevronCls} text-zinc-400 shrink-0`} />}
          {icon}
          <span className={`font-semibold text-zinc-200 truncate ${titleCls}`}>{title}</span>
          {count && <span className={`text-zinc-500 shrink-0 ${countCls}`}>{count}</span>}
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
