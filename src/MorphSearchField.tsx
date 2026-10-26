"use client";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import Button from './Button';
import { inputCls } from './input';

/**
 * MorphSearchField — a toolbar search/filter trigger that MORPHS into a text
 * field (search menu, roadmap 172). The collapsed state is a kit Button; on
 * click the container animates its width while the button cross-fades out and
 * the field cross-fades in over the same box, so the control never jumps.
 *
 * Built for FILTERING (the Glide grid toolbars): the value survives collapsing,
 * so you can type a filter, click into the grid, and the toolbar stays compact
 * with your term still applied (pair it with a trailing result count). Escape
 * clears and collapses; clicking away / tabbing out collapses but keeps the
 * term; the clear button empties the field without collapsing.
 *
 * For a record SEARCH with a results panel use `SearchMenu` instead.
 */
export interface MorphSearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  /** Collapsed button label. Default: "Filter". */
  triggerLabel?: string;
  /** Trigger + field leading icon (default: a magnifier). Pass a funnel while
   *  a filter is applied so the collapsed control says WHAT is filtered. */
  triggerIcon?: React.ReactNode;
  placeholder?: string;
  /** Collapsed button width in px. Default 88. */
  collapsedWidth?: number;
  /** Expanded field width in px. Default 200. */
  expandedWidth?: number;
  /** Button variant while collapsed (default `subtle` = toolbar secondary). */
  variant?: 'subtle' | 'primary';
  theme?: 'light' | 'dark';
  /** Tinted trigger while a term is applied (the collapsed state's "on" cue). */
  active?: boolean;
  autoFocus?: boolean;
  /** Notified when the field expands/collapses (never on value changes). */
  onExpandedChange?: (expanded: boolean) => void;
  className?: string;
  "aria-label"?: string;
}

export function MorphSearchField({
  value,
  onChange,
  triggerLabel = 'Filter',
  triggerIcon,
  placeholder = 'Filter…',
  collapsedWidth = 88,
  expandedWidth = 200,
  variant = 'subtle',
  theme,
  active = false,
  autoFocus = false,
  onExpandedChange,
  className = '',
  'aria-label': ariaLabel,
}: MorphSearchFieldProps) {
  const [expanded, setExpanded] = useState(autoFocus);
  const expandedRef = useRef(expanded);
  expandedRef.current = expanded;
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const setOpen = useCallback((next: boolean) => {
    if (expandedRef.current === next) return;
    expandedRef.current = next;
    setExpanded(next);
    onExpandedChange?.(next);
  }, [onExpandedChange]);

  /** Collapse without stealing focus from whatever the user clicked. Only an
   *  explicit Escape returns the keyboard to the trigger. */
  const collapse = useCallback((focusTrigger = false) => {
    setOpen(false);
    inputRef.current?.blur();
    if (focusTrigger) requestAnimationFrame(() => triggerRef.current?.focus());
  }, [setOpen]);

  const expand = useCallback(() => {
    setOpen(true);
    requestAnimationFrame(() => {
      const input = inputRef.current;
      if (!input) return;
      input.focus();
      const end = input.value.length;
      input.setSelectionRange(end, end);
    });
  }, [setOpen]);

  // Focus the field on mount when the caller wants it open (e.g. a keyboard
  // shortcut / a restored session).
  useEffect(() => {
    if (autoFocus) expand();
  }, [autoFocus, expand]);

  // Outside click / focus leaving the control collapses it but KEEPS the term.
  useEffect(() => {
    if (!expanded) return;
    const doc = rootRef.current?.ownerDocument ?? document;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (rootRef.current?.contains(target)) return;
      collapse();
    };
    doc.addEventListener('pointerdown', onPointerDown, true);
    return () => doc.removeEventListener('pointerdown', onPointerDown, true);
  }, [expanded, collapse]);

  const onBlur = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    if (!expanded) return;
    const next = event.relatedTarget as Node | null;
    if (next && rootRef.current?.contains(next)) return;
    collapse();
  }, [expanded, collapse]);

  const onKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    event.stopPropagation();
    onChange('');
    collapse(true);
  }, [onChange, collapse]);

  return (
    <div
      ref={rootRef}
      data-morph-search
      data-expanded={expanded ? 'true' : 'false'}
      className={`relative inline-flex shrink-0 ${className}`}
      style={{
        width: expanded ? expandedWidth : collapsedWidth,
        transition: 'width 220ms cubic-bezier(0.32, 0.72, 0, 1)',
      }}
      onBlur={onBlur}
    >
      <div
        className={`w-full origin-left ${expanded ? 'opacity-0 pointer-events-none' : 'opacity-100'} motion-reduce:transition-none`}
        style={{
          transform: expanded ? 'scaleX(0.98)' : 'scaleX(1)',
          transition: 'opacity 150ms ease, transform 220ms cubic-bezier(0.32, 0.72, 0, 1)',
        }}
        aria-hidden={expanded}
      >
        <Button
          ref={triggerRef}
          type="button"
          variant={variant}
          size="minimal"
          theme={theme}
          icon={triggerIcon ?? <Search className="w-3.5 h-3.5" />}
          active={active}
          onClick={expand}
          className={`w-full justify-start ${expanded ? 'pointer-events-none' : ''}`}
          tabIndex={expanded ? -1 : 0}
          aria-expanded={expanded}
          aria-label={ariaLabel || triggerLabel}
          data-morph-search-trigger
        >
          <span className="min-w-0 truncate">{triggerLabel}</span>
        </Button>
      </div>
      <div
        className={`absolute inset-0 origin-left ${expanded ? 'opacity-100' : 'opacity-0 pointer-events-none'} motion-reduce:transition-none`}
        style={{
          transform: expanded ? 'scaleX(1)' : 'scaleX(0.96)',
          transition: 'opacity 150ms ease, transform 220ms cubic-bezier(0.32, 0.72, 0, 1)',
        }}
        aria-hidden={!expanded}
      >
        <span className="ui-icon absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
          {triggerIcon ?? <Search className="w-3.5 h-3.5" />}
        </span>
        <input
          ref={inputRef}
          value={value}
          onChange={event => onChange(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          aria-label={ariaLabel || placeholder}
          tabIndex={expanded ? 0 : -1}
          data-morph-search-input
          className={`${inputCls('sm')} w-full pl-7 pr-7`}
        />
        {value && (
          <button
            type="button"
            aria-label="Clear"
            tabIndex={expanded ? 0 : -1}
            onClick={() => {
              onChange('');
              requestAnimationFrame(() => inputRef.current?.focus());
            }}
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded p-0.5 text-zinc-400 hover:text-zinc-700"
            data-morph-search-clear
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}

export default MorphSearchField;
