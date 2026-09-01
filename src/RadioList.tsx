"use client";
import React from 'react';
import { useCoarse } from './device';

/**
 * RadioList — single-select sibling of Checklist: the same bordered word-list
 * with radio circles instead of square boxes. Picking a row selects it and
 * deselects the others (classic radio semantics — no select-all).
 */
export interface RadioListItem {
  id: string | number;
  label: React.ReactNode;
  /** Extra node before the label (index number, colored chip…). */
  leading?: React.ReactNode;
  /** Right-aligned trailing text. */
  secondary?: React.ReactNode;
}

export interface RadioListProps {
  items: RadioListItem[];
  value: string | number | null;
  onChange: (id: string | number) => void;
  /** Section header label (10px uppercase). */
  title?: React.ReactNode;
  emptyHint?: string;
  /** Container height cap (px) — scrolls past it. */
  maxHeight?: number;
  /** Tighter rows (px-2.5 py-1.5) for dense surfaces like the reports chrome. */
  compact?: boolean;
  disabled?: boolean;
  theme?: 'dark' | 'light' | 'blue';
  className?: string;
}

export default function RadioList({
  items,
  value,
  onChange,
  title,
  emptyHint = 'Nothing here',
  maxHeight,
  compact = false,
  disabled = false,
  theme,
  className = '',
}: RadioListProps) {
  const coarse = useCoarse();
  const itemPad = compact ? 'px-2.5 py-1.5 text-xs' : coarse ? 'px-4 py-3 text-sm' : 'px-3 py-2 text-xs';
  const circleCls = compact ? 'w-3.5 h-3.5' : coarse ? 'w-5 h-5' : 'w-4 h-4';
  return (
    <div className={className} {...(theme ? { 'data-theme': theme } : {})}>
      {title != null && (
        <div className="flex items-center justify-between ui-checklist-header">
          <span className="ui-checklist-title">{title}</span>
        </div>
      )}
      <div
        className={`ui-checklist scrollbar-custom ${disabled ? 'ui-checklist-disabled' : ''}`}
        style={maxHeight ? { maxHeight, overflowY: 'auto' } : undefined}
      >
        {items.map(item => {
          const selected = value === item.id;
          return (
            <button
              key={item.id}
              type="button"
              disabled={disabled}
              onClick={() => onChange(item.id)}
              className={`ui-checklist-item ${itemPad} ${selected ? 'ui-checklist-item-checked' : ''}`}
            >
              <span className={`ui-radio-circle ${circleCls}`} aria-hidden>
                {selected && <span className="ui-radio-dot" />}
              </span>
              {item.leading != null && <span className="ui-checklist-leading">{item.leading}</span>}
              <span className="ui-checklist-label">{item.label}</span>
              {item.secondary != null && <span className="ui-checklist-secondary">{item.secondary}</span>}
            </button>
          );
        })}
        {items.length === 0 && <div className="ui-checklist-empty">{emptyHint}</div>}
      </div>
    </div>
  );
}
