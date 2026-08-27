"use client";
import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IS_COARSE } from './device';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
 */
export interface DatePickerProps {
  selected: string[];
  onChange: (dates: string[]) => void;
  theme?: 'light' | 'dark';
  /** Collapse the selected-date chip row when nothing is picked. */
  showChips?: boolean;
  className?: string;
}

export default function DatePicker({ selected, onChange, theme = 'light', showChips = true, className = '' }: DatePickerProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

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

  const dark = theme === 'dark';
  const cellCls = IS_COARSE ? 'py-2' : 'py-1.5';
  const chipCls = IS_COARSE ? 'text-xs px-2 py-1' : 'text-[10px] px-1.5 py-0.5';

  return (
    <div className={`border rounded-lg overflow-hidden w-full ${dark ? 'border-zinc-700 bg-zinc-900' : 'border-zinc-200 bg-white'} ${className}`}>
      <div className={`flex items-center justify-between px-3 py-2 border-b ${dark ? 'bg-zinc-800/60 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`}>
        <button
          type="button"
          onClick={() => { if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); } else setViewMonth(m => m - 1); }}
          className={`p-1 rounded transition-colors ${dark ? 'text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100' : 'text-zinc-600 hover:bg-zinc-200'}`}
          aria-label="Previous month"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className={`text-sm font-semibold ${dark ? 'text-zinc-100' : 'text-zinc-800'}`}>
          {new Date(viewYear, viewMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
        </span>
        <button
          type="button"
          onClick={() => { if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); } else setViewMonth(m => m + 1); }}
          className={`p-1 rounded transition-colors ${dark ? 'text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100' : 'text-zinc-600 hover:bg-zinc-200'}`}
          aria-label="Next month"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 text-center">
        {DAYS.map(d => (
          <div key={d} className={`text-[10px] font-semibold uppercase tracking-wider py-1.5 border-b ${dark ? 'text-zinc-500 border-zinc-800' : 'text-zinc-400 border-zinc-100'}`}>{d}</div>
        ))}
        {cells.map(cell => (
          cell.empty ? (
            <div key={cell.key} />
          ) : (
            <button
              key={cell.key}
              type="button"
              onClick={() => toggle(cell.key)}
              className={`${cellCls} text-xs font-medium transition-colors border-b ${dark ? 'text-zinc-300 hover:bg-zinc-800 border-zinc-800/60' : 'text-zinc-700 hover:bg-zinc-100 border-zinc-50'} ${
                selectedSet.has(cell.key)
                  ? dark ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-zinc-900 text-white hover:bg-zinc-800'
                  : ''
              }`}
            >
              {cell.day}
            </button>
          )
        ))}
      </div>
      {showChips && selected.length > 0 && (
        <div className={`px-3 py-2 border-t ${dark ? 'border-zinc-700 bg-zinc-800/40' : 'border-zinc-200 bg-zinc-50'}`}>
          <div className={`text-[10px] uppercase font-semibold tracking-wider mb-1.5 ${dark ? 'text-zinc-500' : 'text-zinc-500'}`}>
            {selected.length} date{selected.length !== 1 ? 's' : ''} selected
          </div>
          <div className="flex flex-wrap gap-1">
            {selected.map(d => {
              const date = new Date(d + 'T00:00:00');
              const label = date.toLocaleString('default', { month: 'short', day: 'numeric' });
              return (
                <span key={d} className={`inline-flex items-center gap-1 rounded font-medium ${dark ? 'bg-zinc-700 text-zinc-200' : 'bg-zinc-200 text-zinc-700'} ${chipCls}`}>
                  {label}
                  <button type="button" onClick={() => toggle(d)} className={`hover:opacity-70 leading-none ${dark ? 'text-zinc-400' : 'text-zinc-500'}`} aria-label={`Remove ${label}`}>&times;</button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
