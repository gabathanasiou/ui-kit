"use client";
import React from 'react';
import { useCoarse } from './device';

/**
 * Checklist — a bordered "word list of checkboxes" (the Days-to-Print /
 * Days-to-Include / banner-delete pickers). Full-width toggle rows with a
 * blue accent box when checked, optional select-all header, leading badge,
 * right-aligned secondary text and a height limit with internal scrolling.
 */
export interface ChecklistItem {
  id: string | number;
  label: React.ReactNode;
  /** Extra node before the label (index number, colored chip…). */
  leading?: React.ReactNode;
  /** Right-aligned trailing text (date, count…). */
  secondary?: React.ReactNode;
}

export interface ChecklistProps {
  items: ChecklistItem[];
  /** Selected ids — a Set or an array (`.has` / `.includes`). */
  selected: ReadonlySet<string | number> | readonly (string | number)[];
  onToggle: (id: string | number) => void;
  /** Section header label (10px uppercase). */
  title?: React.ReactNode;
  /** Select-all button; label derives from `allSelected`. */
  onToggleAll?: () => void;
  allSelected?: boolean;
  /** Overrides the select-all button text (e.g. "Select all (N)"). */
  toggleAllLabel?: string;
  emptyHint?: string;
  /** Container height cap (px) — scrolls past it. */
  maxHeight?: number;
  disabled?: boolean;
  theme?: 'dark' | 'light' | 'blue';
  className?: string;
}

export default function Checklist({
  items,
  selected,
  onToggle,
  title,
  onToggleAll,
  allSelected = false,
  toggleAllLabel,
  emptyHint = 'Nothing here',
  maxHeight,
  disabled = false,
  theme,
  className = '',
}: ChecklistProps) {
  const has = (id: string | number) => {
    if (selected instanceof Set) return selected.has(id);
    return (selected as readonly (string | number)[]).includes(id);
  };
  const coarse = useCoarse();
  const itemPad = coarse ? 'px-4 py-3 text-sm' : 'px-3 py-2 text-xs';
  const checkCls = coarse ? 'w-5 h-5 rounded-md' : 'w-4 h-4 rounded';
  const showHeader = title != null || onToggleAll != null;
  return (
    <div className={className} {...(theme ? { 'data-theme': theme } : {})}>
      {showHeader && (
        <div className="flex items-center justify-between ui-checklist-header">
          {title != null && <span className="ui-checklist-title">{title}</span>}
          {onToggleAll != null && (
            <button type="button" disabled={disabled} onClick={onToggleAll} className="ui-checklist-toggleall">
              {toggleAllLabel ?? (allSelected ? 'Deselect all' : 'Select all')}
            </button>
          )}
        </div>
      )}
      <div
        className={`ui-checklist scrollbar-custom ${disabled ? 'ui-checklist-disabled' : ''}`}
        style={maxHeight ? { maxHeight, overflowY: 'auto' } : undefined}
      >
        {items.map(item => {
          const checked = has(item.id);
          return (
            <button
              key={item.id}
              type="button"
              disabled={disabled}
              onClick={() => onToggle(item.id)}
              className={`ui-checklist-item ${itemPad} ${checked ? 'ui-checklist-item-checked' : ''}`}
            >
              <span className={`ui-checklist-box ${checkCls}`} aria-hidden>
                {checked && (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
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
