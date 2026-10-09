"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { coarsePx, useCoarseScale } from './device';
import { useInputSize } from './input';
import { clampNumber, scrubbedValue, steppedValue } from './numberInputMath';

/**
 * The ONE numeric box — the `<input type="number">` recipe every toolbar,
 * designer panel and format bar shares. Typing model: the value is a draft
 * while focused (clear the box and type a fresh number); a clamped value
 * commits on change, Enter/blur finalizes, Escape reverts. Never a clamped
 * controlled input — clamping on change would snap the first keystroke away.
 *
 * On top of the typing model:
 *  - Right-aligned stacked chevron buttons step ±`step`, disabled at the
 *    bounds; their pointerdown is prevented so they never steal the draft's
 *    focus mid-typing.
 *  - ArrowUp/ArrowDown step the committed value.
 *  - MOUSE drag on the box scrubs (Premiere/Resolve style): drag up =
 *    increase, one `step` per `SCRUB_PX_PER_STEP` px, commits live. A plain
 *    click still focuses for typing; once the drag passes the threshold the
 *    box blurs and the value follows the pointer. Touch/pen keep scrolling.
 *
 * Two looks, one behavior:
 *  - Default — the kit's bordered box (`.ui-number-box`, the same
 *    border-only/hover-fill/muted-focus language as `.ui-input`), themed by
 *    `theme` or the ambient `[data-theme]`.
 *  - `className` — styles the input itself: existing call sites pass their
 *    toolbar/field classes; the wrapper goes bare and only adds the steppers.
 *
 * Sizes scale by the global coarseScale so coarse devices get real tap
 * targets; native number spinners are hidden (the chevrons replace them).
 */
export interface NumberInputProps {
  value: number | undefined;
  min: number;
  max: number;
  fallback: number;
  onCommit: (v: number) => void;
  /** Increment per stepper click / arrow key / scrub step (default 1). */
  step?: number;
  readOnly?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  /** Styles the input; when set the default box is skipped and the input
   *  keeps the consumer's own look. */
  className?: string;
  title?: string;
  /** Shown (and the box left empty) when `value` is unset — e.g. "Mixed". */
  placeholder?: string;
  /** Explicit color scope for the default box (like Checkbox); unset =
   *  inherit the ambient `[data-theme]`. */
  theme?: 'dark' | 'light' | 'blue';
}

/** Mouse travel before a press becomes a scrub instead of a click-to-type. */
const SCRUB_START_PX = 3;

export default function NumberInput({
  value,
  min,
  max,
  fallback,
  onCommit,
  step = 1,
  readOnly,
  disabled,
  ariaLabel,
  className,
  title,
  placeholder,
  theme,
}: NumberInputProps) {
  const [draft, setDraft] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);
  const focusedRef = useRef(false);
  const scrubCleanupRef = useRef<(() => void) | null>(null);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scale = useCoarseScale();
  const inputSize = useInputSize();
  const boxed = className === undefined;

  useEffect(() => () => scrubCleanupRef.current?.(), []);

  /* Bare inputs own their text color via consumer classes — mirror it onto
     the wrapper so the chevrons match the input instead of the ambient. */
  useLayoutEffect(() => {
    const input = inputRef.current;
    const wrap = wrapRef.current;
    if (!boxed && input && wrap) wrap.style.color = getComputedStyle(input).color;
  }, [boxed, className]);

  useEffect(() => { if (!focusedRef.current) setDraft(null); }, [value]);

  const current = value ?? fallback;
  const display = draft !== null ? draft : value != null ? String(value) : (placeholder ? '' : String(fallback));
  const clamp = (n: number) => clampNumber(n, min, max);

  const stepBy = (dir: 1 | -1) => {
    const next = steppedValue(current, dir, min, max, step);
    if (next === current) return;
    if (focusedRef.current) setDraft(String(next));
    onCommit(next);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLInputElement>) => {
    if (disabled || readOnly || e.pointerType !== 'mouse' || e.button !== 0) return;
    /* The drag listens on WINDOW, not via pointer capture: Safari drops capture
       set mid-gesture, so the value froze once the pointer left the box. */
    const input = e.currentTarget;
    const startY = e.clientY;
    const startValue = current;
    let last = startValue;
    let active = false;

    const move = (ev: PointerEvent) => {
      const dy = startY - ev.clientY;
      if (!active) {
        if (Math.abs(dy) < SCRUB_START_PX) return;
        active = true;
        input.blur();
        input.style.userSelect = 'none';
      }
      const next = scrubbedValue(startValue, dy, min, max, step);
      if (next === last) return;
      last = next;
      onCommit(next);
    };

    const finish = () => {
      scrubCleanupRef.current = null;
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', finish);
      window.removeEventListener('pointercancel', finish);
      input.style.userSelect = '';
      if (active) input.blur();
    };

    scrubCleanupRef.current = finish;
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', finish);
    window.addEventListener('pointercancel', finish);
  };

  const stepper = (dir: 1 | -1) => ({
    type: 'button' as const,
    tabIndex: -1,
    'aria-label': dir === 1 ? 'Increase' : 'Decrease',
    disabled: !!disabled || !!readOnly || (dir === 1 ? current >= max : current <= min),
    onPointerDown: (e: React.PointerEvent<HTMLButtonElement>) => e.preventDefault(),
    onClick: () => stepBy(dir),
  });

  const stepperW = boxed ? coarsePx(22, 30, scale) : coarsePx(16, 22, scale);
  const chevron = boxed ? coarsePx(14, 18, scale) : coarsePx(11, 15, scale);

  return (
    <span
      ref={wrapRef}
      className={`ui-number ${boxed ? 'ui-number-box' : ''}`}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <input
        ref={inputRef}
        type="number"
        aria-label={ariaLabel}
        title={title}
        placeholder={placeholder}
        value={display}
        readOnly={readOnly}
        disabled={disabled}
        className={className ?? 'ui-input w-20'}
        style={{
          ...(boxed ? { ...inputSize, minHeight: coarsePx(30, 38, scale) } : {}),
          paddingRight: stepperW + 2,
          cursor: disabled || readOnly ? undefined : focused ? 'text' : 'ns-resize',
        }}
        onFocus={() => { focusedRef.current = true; setFocused(true); }}
        onChange={e => {
          const raw = e.target.value;
          setDraft(raw);
          const n = parseInt(raw, 10);
          if (raw !== '' && !Number.isNaN(n)) onCommit(clamp(n));
        }}
        onBlur={() => {
          focusedRef.current = false;
          setFocused(false);
          if (draft === null) return;
          const n = parseInt(draft, 10);
          if (Number.isNaN(n)) {
            setDraft(null);
          } else {
            onCommit(clamp(n));
            setDraft(null);
          }
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
          if (e.key === 'Escape') { setDraft(null); (e.target as HTMLInputElement).blur(); }
          if (!readOnly && !disabled && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
            e.preventDefault();
            stepBy(e.key === 'ArrowUp' ? 1 : -1);
          }
        }}
        onPointerDown={onPointerDown}
      />
      <span className="ui-number-steppers" style={{ width: stepperW }}>
        <button {...stepper(1)} className="ui-number-step">
          <ChevronUp style={{ width: chevron, height: chevron }} />
        </button>
        <button {...stepper(-1)} className="ui-number-step">
          <ChevronDown style={{ width: chevron, height: chevron }} />
        </button>
      </span>
    </span>
  );
}
