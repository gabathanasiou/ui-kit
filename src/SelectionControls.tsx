import React from 'react';
import { Check, Minus } from 'lucide-react';
import { CheckMark } from './Checkbox';
import Button from './Button';
import { useCoarseScale, coarsePx } from './device';

/** The check affordance of a multi-select row / group header. Purely visual —
 *  the surface owns the control around it (a menu row, a group select-all
 *  button, a field chip). Coarse-scaled like every other picker control.
 *
 *  `indicator` picks the face:
 *   - `box`  — the shared checkbox indicator (default);
 *   - `check` — a bare check glyph in the same fixed-width slot (no box), for
 *     menus that should read as a tick list. The empty slot keeps rows aligned
 *     while toggling. */
export interface SelectionCheckProps {
  checked: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  indicator?: 'box' | 'check';
  /** Box size in px (defaults to the coarse-scaled menu size). */
  size?: number;
  className?: string;
}

export function SelectionCheck({
  checked,
  indeterminate = false,
  disabled = false,
  indicator = 'box',
  size,
  className = '',
}: SelectionCheckProps) {
  const scale = useCoarseScale();
  const dim = size ?? coarsePx(14, 18, scale);
  if (indicator === 'check') {
    return (
      <span
        data-selection-check="check"
        className={`inline-flex shrink-0 items-center justify-center ${disabled ? 'opacity-40' : ''} ${className}`}
        style={{ width: dim, height: dim }}
        aria-hidden
      >
        {indeterminate
          ? <Minus size={dim} strokeWidth={2.5} className="text-[color:var(--ui-check-accent)]" />
          : checked
            ? <Check size={dim} strokeWidth={2.5} className="text-[color:var(--ui-check-accent)]" />
            : null}
      </span>
    );
  }
  return (
    <span
      data-selection-check="box"
      className={`inline-flex shrink-0 items-center justify-center ${disabled ? 'opacity-40' : ''} ${className}`}
      aria-hidden
    >
      <CheckMark checked={checked} indeterminate={indeterminate} size={dim} />
    </span>
  );
}

export interface SelectionFooterHero {
  label: string;
  onClick: () => void;
  /** Default: disabled at 0 selections. */
  disabled?: boolean;
}

/** The pinned action strip of a multi-select panel: `N of M selected ·
 *  hidden-by-filter · Clear · hero`. The hero is the ONLY commit path for a
 *  menu (Escape / click-away / trigger close cancel). Value fields omit it and
 *  just show the count + Clear. */
export interface SelectionFooterProps {
  count: number;
  max?: number;
  hiddenCount?: number;
  onClear: () => void;
  hero?: SelectionFooterHero;
  /** Hide Clear (add-only bulk menus). Default true. */
  clear?: boolean;
  /** The owning surface's theme. Portals do NOT inherit the page's
   *  ThemeScope, so the footer buttons must be told the menu's palette. */
  theme?: 'light' | 'dark' | 'blue' | 'emerald';
  className?: string;
}

export function SelectionFooter({
  count,
  max,
  hiddenCount = 0,
  onClear,
  hero,
  clear = true,
  theme,
  className = '',
}: SelectionFooterProps) {
  const scale = useCoarseScale();
  const padX = coarsePx(10, 14, scale);
  const padY = coarsePx(6, 9, scale);
  const text = coarsePx(11, 13, scale);
  const buttonTheme = theme === 'light' ? 'light' : 'dark';
  /** Explicit blue/emerald palettes tint their primary button; light/dark
   *  inherit the ambient accent (which the menu already carries). */
  const buttonCloud = theme === 'emerald' ? 'emerald' : theme === 'blue' ? true : undefined;
  const label = max !== undefined ? `${count} of ${max} selected` : `${count} selected`;
  return (
    <div
      data-selection-footer
      className={`shrink-0 flex items-center gap-2 border-t border-[color:var(--ui-menu-border)] ${className}`}
      style={{
        padding: `${padY}px ${padX}px`,
        background: 'var(--ui-menu-bg)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <span
        data-selection-count
        className="min-w-0 flex-1 truncate tabular-nums text-[color:var(--ui-text-muted)]"
        style={{ fontSize: text }}
      >
        {label}
        {hiddenCount > 0 && (
          <span className="text-[color:var(--ui-text-faint)]"> · {hiddenCount} hidden by filter</span>
        )}
      </span>
      {clear && (
        <Button
          variant="subtle"
          size="minimal"
          theme={buttonTheme}
          cloud={buttonCloud}
          onClick={onClear}
          disabled={count === 0}
          data-selection-clear
        >
          Clear
        </Button>
      )}
      {hero && (
        <Button
          variant="primary"
          size="minimal"
          theme={buttonTheme}
          cloud={buttonCloud}
          onClick={hero.onClick}
          disabled={hero.disabled ?? count === 0}
          data-selection-hero
        >
          {hero.label}
        </Button>
      )}
    </div>
  );
}
