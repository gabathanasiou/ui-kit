"use client";
import React from 'react';
import { ArrowUp, ArrowDown, Copy, Trash2 } from 'lucide-react';
import { IS_COARSE } from './device';
import { Tooltip } from './Tooltip';

// ---- dark editor-toolbox vocabulary (touch devices scale up — app pattern) ----

export const TB_ROW_LABEL = IS_COARSE ? 'text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24' : 'text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16';
export const TB_BTN = IS_COARSE ? 'h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors' : 'h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors';
export const TB_BTN_ICON = IS_COARSE ? 'h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors' : 'h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors';
export const TB_DANGER = 'hover:bg-red-950/50';
export const TB_TOGGLE = IS_COARSE ? 'h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors' : 'h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors';
export const TB_TOGGLE_ON = 'bg-blue-900/50 border-blue-700 text-blue-300';
export const TB_TOGGLE_OFF = 'bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700';
export const TB_INPUT = IS_COARSE ? 'h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30' : 'h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30';
export const TB_NUM = IS_COARSE ? 'w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50' : 'w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50';
export const TB_DIVIDER = IS_COARSE ? 'w-px h-7 bg-zinc-700 mx-1' : 'w-px h-5 bg-zinc-700 mx-0.5';
export const TB_SEG = 'inline-flex rounded overflow-hidden border border-zinc-700';
/** Dropdown trigger look shared by every picker — matches the ribbon designer's
 *  dropdown buttons (h-7, coarse h-10) instead of the old thin strip. */
export const TB_PICKER = IS_COARSE
  ? 'h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1'
  : 'h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1';

export const ToolButton: React.FC<{ onClick: () => void; disabled?: boolean; title: string; className?: string; children: React.ReactNode }> = ({ onClick, disabled, title, className = TB_BTN, children }) => (
  <Tooltip content={title}>
    <button onClick={onClick} disabled={disabled} aria-label={title} className={`${className} ${disabled ? 'disabled:opacity-30 disabled:pointer-events-none' : ''}`}>
      {children}
    </button>
  </Tooltip>
);

export const Seg: React.FC<{ value: string; options: { v: string; l: string }[]; onChange: (v: string) => void; disabled?: boolean; active?: (v: string) => boolean }> = ({ value, options, onChange, disabled, active }) => (
  <div className={TB_SEG}>
    {options.map(o => {
      const on = active ? active(o.v) : value === o.v;
      return (
        <button
          key={o.v}
          disabled={disabled}
          onClick={() => onChange(o.v)}
          className={`${IS_COARSE ? 'h-10 px-3.5 text-sm' : 'h-7 px-2 text-[10px]'} font-medium transition-colors disabled:opacity-30 ${on ? 'bg-blue-900/50 text-blue-300' : 'bg-zinc-800 text-zinc-500 hover:bg-zinc-700'} ${o.v !== options[options.length - 1].v ? 'border-r border-zinc-700' : ''}`}
        >
          {o.l}
        </button>
      );
    })}
  </div>
);

/** Section eyebrow: uppercase label with a hairline rule. */
export const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center gap-2 min-w-max">
    <span className={IS_COARSE ? 'text-xs font-semibold text-zinc-500 uppercase tracking-wider' : 'text-[9px] font-semibold text-zinc-500 uppercase tracking-wider'}>{children}</span>
    <div className="h-px bg-zinc-700/50" style={{ minWidth: 24, flex: 1 }} />
  </div>
);

const CONTENT_LABEL_CLS = 'text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1';
const CONTENT_ROW_LABEL_CLS = 'text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0';

/** Labeled content row inside an editor panel (label above when `tall`). */
export const ContentRow: React.FC<{ label?: string; children: React.ReactNode; tall?: boolean }> = ({ label, children, tall }) => (
  <div className={tall ? 'flex flex-col gap-1 py-0.5' : 'flex items-center gap-2 py-0.5'}>
    {label && <span className={tall ? CONTENT_LABEL_CLS : CONTENT_ROW_LABEL_CLS}>{label}</span>}
    {children}
  </div>
);

/** Editor panel header bar: leading slot (icon + label) + right-aligned
 *  trailing actions. */
export const ChromeHeader: React.FC<{ leading?: React.ReactNode; trailing?: React.ReactNode; className?: string }> = ({ leading, trailing, className = '' }) => (
  <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-max ${className}`}>
    {leading}
    {trailing && <div className="ml-auto flex items-center gap-1">{trailing}</div>}
  </div>
);

/** Structure (move / duplicate / delete) actions for an editor panel. */
export interface StructureControlsProps {
  readOnly: boolean;
  onDuplicate: () => void;
  onRemove: () => void;
  onMove: (dir: -1 | 1) => void;
  compact?: boolean;
}

export const StructureControls: React.FC<StructureControlsProps> = ({ readOnly, onDuplicate, onRemove, onMove, compact }) => (
  <>
    <ToolButton onClick={() => onMove(-1)} disabled={readOnly} title="Move up" className={TB_BTN_ICON}><ArrowUp className="w-2.5 h-2.5" /></ToolButton>
    <ToolButton onClick={() => onMove(1)} disabled={readOnly} title="Move down" className={TB_BTN_ICON}><ArrowDown className="w-2.5 h-2.5" /></ToolButton>
    <ToolButton onClick={onDuplicate} disabled={readOnly} title="Duplicate" className={TB_BTN_ICON}><Copy className="w-2.5 h-2.5" /></ToolButton>
    <div className={TB_DIVIDER} />
    <ToolButton onClick={onRemove} disabled={readOnly} title="Delete" className={`${TB_BTN_ICON} ${TB_DANGER}`}><Trash2 className="w-2.5 h-2.5" /></ToolButton>
  </>
);
