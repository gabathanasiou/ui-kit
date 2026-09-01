"use client";
import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCoarse } from './device';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MIN_YEAR = 1900;
const MAX_YEAR = 2100;

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function formatKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

/**
 * Multi-select month calendar (dates as ISO `YYYY-MM-DD` keys). Themeable for
 * light pages and dark modals; consumed by the app's rule/event surfaces.
 *
 * Theming: `light` (default) renders a white card with zinc-200 borders;
 * `dark` renders the zinc-900 modal look. Selected days fill with the
 * accent; selected-date chips below allow per-date removal.
 *
 * Quick jump: clicking the month–year header swaps the day grid for a
 * 3×4 MONTH GRID with a typable YEAR box (Enter/blur commits, Escape
 * reverts) — two clicks to any month in any year.
 */
export interface DatePickerProps {
  selected: string[];
  onChange: (dates: string[]) => void;
  theme?: 'light' | 'dark';
  /** Collapse the selected-date chip row when nothing is picked. */
  showChips?: boolean;
  /** Seed the visible month/year on MOUNT from this ISO `YYYY-MM-DD` date
   *  (defaults to today's month). Lets the panel open on the relevant month
   *  instead of always landing on today — mount-scoped, so a fresh mount
   *  (e.g. a chrome panel that mounts per open) re-seeds every time. */
  initialView?: string;
  className?: string;
}

export default function DatePicker({ selected, onChange, theme = 'light', showChips = true, className = '', initialView }: DatePickerProps) {
  const today = new Date();
  const seed = (() => {
    if (!initialView) return today;
    const d = new Date(initialView + 'T00:00:00');
    return isNaN(d.getTime()) ? today : d;
  })();
  const [viewYear, setViewYear] = useState(seed.getFullYear());
  const [viewMonth, setViewMonth] = useState(seed.getMonth());
  const [view, setView] = useState<'days' | 'months'>('days');
  const [yearDraft, setYearDraft] = useState<string | null>(null);

  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const toggle = (key: string) => {
    if (selectedSet.has(key)) {
      onChange(selected.filter(d => d !== key));
    } else {
      onChange([...selected, key]);
    }
  };

  const cells = useMemo(() => {
    const total = daysInMonth(viewYear, viewMonth);
    const startDay = new Date(viewYear, viewMonth, 1).getDay();
    const out: { key: string; day: number; empty: boolean }[] = [];
    for (let i = 0; i < startDay; i++) out.push({ key: `pad-${i}`, day: 0, empty: true });
    for (let d = 1; d <= total; d++) out.push({ key: formatKey(viewYear, viewMonth, d), day: d, empty: false });
    return out;
  }, [viewYear, viewMonth]);

  const stepYear = (delta: number) => setViewYear(y => Math.max(MIN_YEAR, Math.min(MAX_YEAR, y + delta)));
  const stepMonth = (delta: number) => {
    if (viewMonth + delta < 0) { setViewYear(y => Math.max(MIN_YEAR, y - 1)); setViewMonth(11); }
    else if (viewMonth + delta > 11) { setViewYear(y => Math.min(MAX_YEAR, y + 1)); setViewMonth(0); }
    else setViewMonth(m => m + delta);
  };

  const commitYear = () => {
    if (yearDraft === null) return;
    const y = parseInt(yearDraft, 10);
    if (!isNaN(y) && y >= MIN_YEAR && y <= MAX_YEAR) setViewYear(y);
    setYearDraft(null);
  };

  /* A month of the visible year has at least one selected date — the dot
     marker on the month grid. */
  const monthHasSelected = (m: number) => selected.some(d => d.startsWith(`${viewYear}-${String(m + 1).padStart(2, '0')}`));

  const dark = theme === 'dark';
  /* Coarse pointers (iPad/mobile): bigger touch targets + readable text —
     the kit's standard sizing up (menus, modals, footer buttons). */
  const coarse = useCoarse();
  const navBtnCls = coarse ? 'p-2' : 'p-1';
  const navIconCls = coarse ? 'w-5 h-5' : 'w-4 h-4';
  const dayHeaderCls = coarse ? 'text-[11px] py-2' : 'text-[10px] py-1.5';
  const cellCls = coarse ? 'py-2.5 text-sm' : 'py-1.5 text-xs';
  const monthCellCls = coarse ? 'py-3 text-sm' : 'py-2 text-xs';
  const chipCls = coarse ? 'text-xs px-2.5 py-1.5' : 'text-[10px] px-1.5 py-0.5';
  const yearInputCls = coarse
    ? `w-20 text-sm text-center font-semibold rounded outline-none py-0.5 ${dark ? 'bg-zinc-700 text-zinc-100 focus:bg-zinc-600' : 'bg-zinc-200 text-zinc-800 focus:bg-zinc-300'}`
    : `w-16 text-sm text-center font-semibold rounded outline-none py-0.5 ${dark ? 'bg-zinc-700 text-zinc-100 focus:bg-zinc-600' : 'bg-zinc-200 text-zinc-800 focus:bg-zinc-300'}`;

  const selectedCls = dark ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-zinc-900 text-white hover:bg-zinc-800';
  const plainCls = dark ? 'text-zinc-300 hover:bg-zinc-800' : 'text-zinc-700 hover:bg-zinc-100';

  return (
    <div className={`border rounded-lg overflow-hidden w-full ${dark ? 'border-zinc-700 bg-zinc-900' : 'border-zinc-200 bg-white'} ${className}`}>
      <div className={`flex items-center justify-between px-3 py-2 border-b ${dark ? 'bg-zinc-800/60 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`}>
        <button
          type="button"
          onClick={() => (view === 'months' ? stepYear(-1) : stepMonth(-1))}
          className={`${navBtnCls} rounded transition-colors ${dark ? 'text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100' : 'text-zinc-600 hover:bg-zinc-200'}`}
          aria-label={view === 'months' ? 'Previous year' : 'Previous month'}
        >
          <ChevronLeft className={navIconCls} />
        </button>
        {view === 'days' ? (
          <button
            type="button"
            onClick={() => setView('months')}
            aria-label="Select year and month"
            className={`text-sm font-semibold rounded px-2 py-0.5 transition-colors ${dark ? 'text-zinc-100 hover:bg-zinc-800' : 'text-zinc-800 hover:bg-zinc-200'}`}
          >
            {new Date(viewYear, viewMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
          </button>
        ) : (
          <input
            type="text"
            inputMode="numeric"
            aria-label="Year"
            value={yearDraft ?? String(viewYear)}
            onChange={e => setYearDraft(e.target.value.replace(/\D/g, '').slice(0, 4))}
            onFocus={e => e.target.select()}
            onBlur={commitYear}
            onKeyDown={e => {
              if (e.key === 'Enter') { e.preventDefault(); commitYear(); }
              if (e.key === 'Escape') setYearDraft(null);
            }}
            className={yearInputCls}
          />
        )}
        <button
          type="button"
          onClick={() => (view === 'months' ? stepYear(1) : stepMonth(1))}
          className={`${navBtnCls} rounded transition-colors ${dark ? 'text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100' : 'text-zinc-600 hover:bg-zinc-200'}`}
          aria-label={view === 'months' ? 'Next year' : 'Next month'}
        >
          <ChevronRight className={navIconCls} />
        </button>
      </div>
      {view === 'months' ? (
        <div>
          <div className="grid grid-cols-3 text-center">
            {MONTHS.map((m, i) => (
              <button
                key={m}
                type="button"
                onClick={() => { setViewMonth(i); setView('days'); }}
                className={`${monthCellCls} relative font-medium transition-colors border-b ${i === viewMonth ? selectedCls : plainCls} ${dark ? 'border-zinc-800/60' : 'border-zinc-50'}`}
              >
                {m}
                {monthHasSelected(i) && (
                  <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${i === viewMonth ? 'bg-white' : dark ? 'bg-blue-500' : 'bg-zinc-900'}`} />
                )}
              </button>
            ))}
          </div>
          <div className={`text-center border-t ${dark ? 'border-zinc-800' : 'border-zinc-100'}`}>
            <button
              type="button"
              onClick={() => { setViewYear(today.getFullYear()); setViewMonth(today.getMonth()); setView('days'); }}
              className={`px-3 ${coarse ? 'py-2.5 text-sm' : 'py-1.5 text-xs'} font-semibold rounded transition-colors ${dark ? 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'}`}
            >
              Today
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-7 text-center">
          {DAYS.map(d => (
            <div key={d} className={`${dayHeaderCls} font-semibold uppercase tracking-wider border-b ${dark ? 'text-zinc-500 border-zinc-800' : 'text-zinc-400 border-zinc-100'}`}>{d}</div>
          ))}
          {cells.map(cell => (
            cell.empty ? (
              <div key={cell.key} />
            ) : (
              <button
                key={cell.key}
                type="button"
                onClick={() => toggle(cell.key)}
                className={`${cellCls} font-medium transition-colors border-b ${dark ? 'border-zinc-800/60' : 'border-zinc-50'} ${
                  selectedSet.has(cell.key) ? selectedCls : (dark ? 'text-zinc-300 hover:bg-zinc-800' : 'text-zinc-700 hover:bg-zinc-100')
                }`}
              >
                {cell.day}
              </button>
            )
          ))}
        </div>
      )}
      {showChips && selected.length > 0 && (
        <div className={`px-3 py-2 border-t ${dark ? 'border-zinc-700 bg-zinc-800/40' : 'border-zinc-200 bg-zinc-50'}`}>
          <div className={`text-[10px] uppercase font-semibold tracking-wider mb-1.5 ${dark ? 'text-zinc-500' : 'text-zinc-500'}`}>
            {selected.length} date{selected.length !== 1 ? 's' : ''} selected
          </div>
          <div className="flex flex-wrap gap-1">
            {selected.map(d => {
              const date = new Date(d + 'T00:00:00');
              // non-current-year dates show the year so the chip is unambiguous
              const label = date.getFullYear() === today.getFullYear()
                ? date.toLocaleString('default', { month: 'short', day: 'numeric' })
                : date.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' });
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => toggle(d)}
                  aria-label={`Remove ${label}`}
                  className={`inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors ${dark ? 'bg-zinc-700 text-zinc-200 hover:bg-zinc-600' : 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300'} ${chipCls}`}
                >
                  {label}
                  <span className={`leading-none ${dark ? 'text-zinc-400' : 'text-zinc-500'}`} aria-hidden="true">&times;</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
