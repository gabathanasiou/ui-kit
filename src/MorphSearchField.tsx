"use client";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import Button from './Button';
import { inputCls } from './input';
import MorphFieldShell from './MorphFieldShell';
import { useIconButtonSize, useCoarseScale, coarsePx } from './device';
import type { MorphFieldAction } from './morphFieldTypes';
export type { MorphFieldAction } from './morphFieldTypes';

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
 * The `actions` prop / `MorphActionField` wrapper turn the field into an inline
 * CREATE surface: action buttons live inside the right edge. The shared
 * `MorphFieldShell` owns the button→field cross-fade; no third copy.
 */
export interface MorphSearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  /** Collapsed button label. Default: "Filter". */
  triggerLabel?: string;
  /** Trigger leading icon (default: a magnifier). */
  triggerIcon?: React.ReactNode;
  placeholder?: string;
  /** Collapsed button width in px, or `'auto'` so an icon-first trigger
   *  (`triggerCollapse`) hugs the icon and expands on hover. Default 88. */
  collapsedWidth?: number | 'auto';
  /** Expanded field width in px. Default 200. */
  expandedWidth?: number;
  /** Button variant while collapsed (default `subtle` = toolbar secondary). */
  variant?: 'subtle' | 'primary' | 'outline';
  /** Icon-first trigger (the tab face, roadmap 258): the ICON alone at rest,
   *  the label reveals on hover. With `iconWithLabel={false}` the pair swaps —
   *  icon at rest, TEXT ONLY on hover. The applied-term state (`active`) keeps
   *  the label open. Needs a `triggerIcon` (the default magnifier counts). */
  triggerCollapse?: boolean;
  /** With `triggerCollapse`: false = text-only on hover (the icon collapses). */
  iconWithLabel?: boolean;
  /** Bare icon at rest (no box); the trigger takes its variant's box on hover.
   *  Pair with `triggerCollapse` for icon → button → field. */
  triggerReveal?: boolean;
  theme?: 'light' | 'dark';
  /** Tinted trigger while a term is applied (the collapsed state's "on" cue). */
  active?: boolean;
  autoFocus?: boolean;
  /** Notified when the field expands/collapses (never on value changes). */
  onExpandedChange?: (expanded: boolean) => void;
  /** Fill the container (grid cells, full-width toolbars) instead of hugging
   *  `collapsedWidth`; the label centers. */
  stretch?: boolean;
  /** Action buttons inside the field's right edge. */
  actions?: MorphFieldAction[];
  /** Leading icon inside the expanded field. Defaults to `triggerIcon`; pass
   *  `null` for a plain text box. */
  leadingIcon?: React.ReactNode | null;
  /** Show the filter clear button (default true). */
  showClear?: boolean;
  /** Enter submits the draft and collapses. */
  onSubmit?: (value: string) => void;
  /** Cancel handler for Escape / outside click when those cancel. */
  onCancel?: () => void;
  /** Escape cancels (instead of the filter default: clear). */
  cancelOnEscape?: boolean;
  /** Outside click cancels (instead of collapsing and keeping the value). */
  cancelOnOutside?: boolean;
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
  triggerCollapse = false,
  iconWithLabel = true,
  triggerReveal = false,
  theme,
  active = false,
  autoFocus = false,
  onExpandedChange,
  stretch = false,
  actions,
  leadingIcon,
  showClear = true,
  onSubmit,
  onCancel,
  cancelOnEscape = false,
  cancelOnOutside = false,
  className = '',
  'aria-label': ariaLabel,
}: MorphSearchFieldProps) {
  const [expanded, setExpanded] = useState(autoFocus);
  const expandedRef = useRef(expanded);
  expandedRef.current = expanded;
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const iconBtn = useIconButtonSize();
  const scale = useCoarseScale();
  /* The trigger is a `Button size="minimal"`: its icon starts at the button's
     padding + 1px transparent border. The field's leading icon uses the SAME
     inset, so the icon does not jump when the button morphs into the field. */
  const fieldIconInset = coarsePx(9, 13, scale);

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

  // Outside click / focus leaving the control collapses it (keeping the value
  // for the filter; cancelling for a create field).
  useEffect(() => {
    if (!expanded) return;
    const doc = rootRef.current?.ownerDocument ?? document;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (rootRef.current?.contains(target)) return;
      if (cancelOnOutside) onCancel?.();
      collapse();
    };
    doc.addEventListener('pointerdown', onPointerDown, true);
    return () => doc.removeEventListener('pointerdown', onPointerDown, true);
  }, [expanded, collapse, cancelOnOutside, onCancel]);

  const onBlur = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    if (!expanded) return;
    const next = event.relatedTarget as Node | null;
    if (next && rootRef.current?.contains(next)) return;
    if (cancelOnOutside) onCancel?.();
    collapse();
  }, [expanded, collapse, cancelOnOutside, onCancel]);

  const onKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    /* Enter always ENDS the morph (a submitted search collapses back to its
       trigger, like Escape / click-away / Tab) — the host only hears about it
       when it passed `onSubmit`. */
    if (event.key === 'Enter') {
      event.preventDefault();
      onSubmit?.(value);
      collapse(true);
      return;
    }
    if (event.key !== 'Escape') return;
    event.preventDefault();
    event.stopPropagation();
    if (cancelOnEscape) {
      onCancel?.();
    } else {
      onChange('');
    }
    collapse(true);
  }, [onChange, collapse, cancelOnEscape, onCancel, onSubmit, value]);

  /* `undefined` = the built-in magnifier; `null` = deliberately no icon
     (a rename/title field that has no glyph of its own). */
  const triggerIconNode = triggerIcon === undefined ? <Search className="w-3.5 h-3.5" /> : triggerIcon;
  const fieldLeadIcon = leadingIcon === undefined ? triggerIconNode : leadingIcon;
  const actionCount = (actions?.length || 0) + (showClear && value ? 1 : 0);
  const actionGap = 2;
  const rightPad = 8 + actionCount * (iconBtn.box + actionGap);
  const iconWrap = (node: React.ReactNode) => (
    <span
      style={{ width: iconBtn.icon, height: iconBtn.icon }}
      className="flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
    >
      {node}
    </span>
  );

  return (
    <MorphFieldShell
      expanded={expanded}
      collapsedWidth={collapsedWidth}
      expandedWidth={expandedWidth}
      rootRef={rootRef}
      shrink
      stretch={stretch}
      data-morph-search
      data-theme={theme}
      data-expanded={expanded ? 'true' : 'false'}
      className={className}
      onBlur={onBlur}
      trigger={(
        <Button
          ref={triggerRef}
          type="button"
          variant={variant}
          size="minimal"
          theme={theme}
          icon={triggerIconNode}
          collapse={triggerCollapse}
          iconWithLabel={iconWithLabel}
          revealOnHover={triggerReveal}
          active={active}
          keepLabelOnActive
          onClick={expand}
          className={`${triggerCollapse ? 'w-auto' : 'w-full'} ${stretch ? 'justify-center' : 'justify-start'} ${expanded ? 'pointer-events-none' : ''}`}
          tabIndex={expanded ? -1 : 0}
          aria-expanded={expanded}
          aria-label={ariaLabel || triggerLabel}
          data-morph-search-trigger
        >
          {/* A collapsing trigger rides its own auto width out — truncating
              here would flash an ellipsis mid-reveal ("Sea…"). */}
          <span className={`min-w-0 ${triggerCollapse ? '' : 'truncate'}`}>{triggerLabel}</span>
        </Button>
      )}
      field={(
        <>
          {fieldLeadIcon && (
            <span
              className="ui-icon absolute top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ left: fieldIconInset, width: iconBtn.icon, height: iconBtn.icon }}
            >
              {iconWrap(fieldLeadIcon)}
            </span>
          )}
          <input
            ref={inputRef}
            value={value}
            onChange={event => onChange(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            aria-label={ariaLabel || placeholder}
            tabIndex={expanded ? 0 : -1}
            data-morph-search-input
            style={{ paddingLeft: fieldLeadIcon ? fieldIconInset + iconBtn.icon + 6 : 10, paddingRight: rightPad }}
            className={`${inputCls('sm')} w-full`}
          />
          <span className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
            {actions?.map(action => (
              <button
                key={action.key}
                type="button"
                aria-label={action.label}
                title={action.label}
                tabIndex={expanded ? 0 : -1}
                onMouseDown={event => event.preventDefault()}
                onClick={() => {
                  action.onClick(value, { close: () => collapse(true) });
                  if (!action.keepOpen) collapse(true);
                }}
                style={{ width: iconBtn.box, height: iconBtn.box }}
                className="flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700"
                data-morph-search-action={action.key}
              >
                {iconWrap(action.icon)}
              </button>
            ))}
            {showClear && value && (
              <button
                type="button"
                aria-label="Clear"
                tabIndex={expanded ? 0 : -1}
                onClick={() => {
                  onChange('');
                  requestAnimationFrame(() => inputRef.current?.focus());
                }}
                style={{ width: iconBtn.box, height: iconBtn.box }}
                className="flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700"
                data-morph-search-clear
              >
                <X size={iconBtn.icon} />
              </button>
            )}
          </span>
        </>
      )}
    />
  );
}

export default MorphSearchField;
