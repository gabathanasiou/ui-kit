"use client";
import React from 'react';
import { ArrowUp, ArrowDown, Copy, Trash2 } from 'lucide-react';
import { IS_COARSE, useCoarseScale, useCoarseSize, coarsePx } from './device';
import { Tooltip } from './Tooltip';
import { useSlidingPill } from './slidingPill';
import { TabFace } from './TabFace';
import { useKitTheme, segModeOf } from './ThemeScope';

// ---- dark editor-toolbox vocabulary (touch devices scale up — app pattern) ----

/** Proportional coarse sizes for the editor-chrome toolbar (TB_* constants
 *  are load-time; this returns INLINE sizes interpolated by the global
 *  coarseScale — Tailwind can't JIT runtime classes). ALWAYS returns the
 *  sizes (fine devices get the desktop values) so consumers spread them on
 *  their toggle/btn/input elements. */
export function useToolbarChrome() {
  const scale = useCoarseScale();
  const c = IS_COARSE;
  const dim = c ? coarsePx(28, 40, scale) : 28;   // toggle square
  const h = c ? coarsePx(28, 40, scale) : 28;     // btn/picker height
  const px = c ? coarsePx(10, 14, scale) : 10;    // btn/picker horizontal pad
  const fs = c ? coarsePx(10, 14, scale) : 10;    // btn/picker font
  const ipx = c ? coarsePx(8, 10, scale) : 8;     // input horizontal pad
  return {
    toggle: { width: dim, height: dim },
    control: { height: h, padding: `0 ${px}px`, fontSize: fs },
    input: { height: h, padding: `0 ${ipx}px`, fontSize: fs },
  };
}

export const TB_ROW_LABEL = IS_COARSE ? 'text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24' : 'text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16';
export const TB_BTN = IS_COARSE ? 'h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors' : 'h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors';
export const TB_BTN_ICON = IS_COARSE ? 'h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors' : 'h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors';
export const TB_DANGER = 'hover:bg-red-950/50';
export const TB_TOGGLE = IS_COARSE ? 'h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors' : 'h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors';
export const TB_TOGGLE_ON = 'bg-[var(--ui-accent-selected-bg)] border-[var(--ui-border-strong)] text-[color:var(--ui-accent-selected-text)]';
export const TB_TOGGLE_OFF = 'bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700';
export const TB_INPUT = IS_COARSE ? 'h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30' : 'h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30';
export const TB_NUM = IS_COARSE ? 'w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50' : 'w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50';
export const TB_DIVIDER = IS_COARSE ? 'w-px h-7 bg-zinc-700 mx-1' : 'w-px h-5 bg-zinc-700 mx-0.5';
export const TB_SEG = 'inline-flex rounded-[var(--ui-radius-btn)] overflow-hidden border border-[var(--ui-border-strong)]';
/** Dropdown trigger look shared by every picker — matches the ribbon designer's
 *  dropdown buttons (h-7, coarse h-10) instead of the old thin strip. */
export const TB_PICKER = IS_COARSE
  ? 'h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1'
  : 'h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1';

export const ToolButton: React.FC<{ onClick: () => void; disabled?: boolean; title: string; className?: string; children: React.ReactNode }> = ({ onClick, disabled, title, className = TB_BTN, children }) => {
  const chrome = useToolbarChrome();
  return (
    <Tooltip content={title}>
      <button onClick={onClick} disabled={disabled} aria-label={title} style={chrome.control} className={`${className} ${disabled ? 'disabled:opacity-30 disabled:pointer-events-none' : ''}`}>
        {children}
      </button>
    </Tooltip>
  );
};

export interface SegOption {
  v: string;
  l: string;
  title?: string;
  /** Segment icon (rendered before the label; label may be '' for an
   *  icon-only segment — `title` then carries the accessible name). */
  icon?: React.ReactNode;
  /** Explicit accessible name (overrides the label/title fallback) — for
   *  icon-only segments whose spoken name differs from their tooltip. */
  ariaLabel?: string;
  /** data-* attributes for tests/agents (e.g.
   *  `{ 'data-presence-anchor': 'toolbar:calendar:strips' }`). Spread on the
   *  segment button BEFORE the kit's own attributes, so the control's
   *  behavior/styling always wins. */
  dataProps?: Record<string, string>;
}

/** Track palettes: the light/dark surfaces plus the project-chrome accents. */
export type SegTheme = 'light' | 'dark' | 'blue' | 'emerald';

/** Track recipe — the outline and labels are NEUTRAL; the moving pill is the
 *  only themed fill (tokens: `--ui-seg-pill`, `--ui-seg-track-bg`,
 *  `--ui-seg-hover`). The `theme` prop still scopes legacy call sites. */
const TRACK = {
  wrap: 'border-[color:var(--ui-border-strong)] bg-[var(--ui-seg-track-bg)]',
  pill: 'bg-[var(--ui-seg-pill)]',
  active: 'text-[color:var(--ui-accent-pill-text)]',
  idle: 'text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-seg-hover)]',
};

/** Segmented control.
 *
 *  `chrome` (default) — the editor-chrome joined-cells look (Reports Designer).
 *  `track` — the padded-track look with a **sliding pill** (modal tab bars,
 *  toolbar view switches); `theme` picks the light-toolbar, dark-modal or
 *  colored project-chrome (`blue`/`emerald`) palette, `stretch` fills the
 *  container, `tablist` gives real tab semantics.
 *  The pill animates between segments (transform/width, ~200ms) and is skipped
 *  under `prefers-reduced-motion`. */
export const Seg: React.FC<{
  value: string;
  options: SegOption[];
  onChange: (v: string) => void;
  disabled?: boolean;
  active?: (v: string) => boolean;
  /** Fill the container with equal-width segments (labels centered) — the
   *  docked inspector column wants the control to span the full row. */
  stretch?: boolean;
  /** Ride a plain toolbar row (24px on fine pointers) instead of the editor
   *  chrome's 28px control height. Ignored on coarse pointers. Applies to
   *  `track` too (26px on fine pointers). */
  dense?: boolean;
  variant?: 'chrome' | 'track';
  /** Track palette. Ignored by `chrome`: `blue`/`emerald` are the colored
   *  project-chrome accents for light toolbars (Drive / shared projects). */
  theme?: SegTheme;
  /** Tab semantics: role=tablist/tab + aria-selected (segments switch
   *  panels). Default is a button group with aria-pressed. */
  tablist?: boolean;
  /** Track variant: icon-first collapsing labels (the tab face, roadmap 258).
   *  The label collapses to the icon and reveals on hover/focus; the SELECTED
   *  segment always shows its label. Requires an `icon` per option. */
  iconCollapse?: boolean;
  /** With `iconCollapse`: false swaps the pair (the icon collapses instead of
   *  the label). Default true. */
  iconWithLabel?: boolean;
  /** Accessible name for the container (group/tablist). */
  ariaLabel?: string;
}> = ({ value, options, onChange, disabled, active, stretch, dense, variant = 'chrome', theme: themeProp, tablist, iconCollapse = false, iconWithLabel = true, ariaLabel }) => {
  const kit = useKitTheme();
  const theme = themeProp ?? segModeOf(kit);
  /* Self-scope the track so the pill/outline tokens resolve even when the Seg
     is the first themed element (no ancestor scope). `blue`/`emerald` are the
     legacy LIGHT toolbar accents; dark stays dark. */
  const trackAccent = themeProp === 'blue' || themeProp === 'emerald' ? themeProp : kit?.accent ?? 'zinc';
  const trackAttrs = { 'data-mode': theme === 'dark' ? 'dark' : 'light', 'data-accent': trackAccent };
  const chrome = useToolbarChrome();
  const scale = useCoarseScale();
  const height = dense && !IS_COARSE ? 24 : chrome.control.height;
  const trackSize = useCoarseSize({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 });
  /* Fixed segment height on fine pointers so text and icon segments agree
     (line-height vs icon glyph would otherwise differ by 4px): toolbar-dense
     = 20px (26px container), comfortable = 30px (36px container, the modal
     look). Coarse keeps the padding-driven touch size. */
  const trackSegStyle: React.CSSProperties = IS_COARSE
    ? trackSize
    : { padding: '0 12px', fontSize: 12, height: dense ? 20 : 24 };
  const isOn = (v: string) => (active ? active(v) : value === v);

  /* Sliding pill: the shared measured-highlight mechanism (useSlidingPill —
     the app header's selected tab rides it too, roadmap 258). Layout-effect
     measure so the first paint already has the pill. */
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const btnRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndex = Math.max(0, options.findIndex(o => isOn(o.v)));
  const pill = useSlidingPill(wrapRef, btnRefs, activeIndex);

  if (variant === 'track') {
    return (
      <div
        ref={wrapRef}
        role={tablist ? 'tablist' : 'group'}
        aria-label={ariaLabel}
        {...trackAttrs}
        className={`relative inline-flex items-center rounded-[var(--ui-radius-btn)] border p-0.5 ${IS_COARSE ? '' : (dense ? 'h-[26px]' : 'h-[30px]')} ${stretch ? 'w-full' : ''} ${TRACK.wrap}`}
      >
        {pill.style && (
          <span
            aria-hidden
            className={`absolute rounded-[var(--ui-radius-inset)] ${TRACK.pill} ${pill.motionClass}`}
            style={{ ...pill.style, top: 2, bottom: 2 }}
          />
        )}
        {options.map((o, i) => {
          const on = isOn(o.v);
          const collapsible = iconCollapse && !!o.icon;
          return (
            <button
              key={o.v}
              ref={el => { btnRefs.current[i] = el; }}
              {...o.dataProps}
              type="button"
              disabled={disabled}
              onClick={() => onChange(o.v)}
              title={o.title}
              role={tablist ? 'tab' : undefined}
              aria-selected={tablist ? on : undefined}
              aria-pressed={tablist ? undefined : on}
              aria-label={o.ariaLabel ?? (o.l ? undefined : o.title)}
              style={trackSegStyle}
              className={`relative z-10 inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-[var(--ui-radius-inset)] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${collapsible ? 'group gap-0' : 'gap-1.5'} ${stretch ? 'flex-1' : ''} ${on ? TRACK.active : TRACK.idle}`}
            >
              <TabFace
                icon={o.icon}
                collapse={collapsible}
                iconWithLabel={iconWithLabel}
                active={on}
                gap={coarsePx(6, 8, scale)}
              >
                {o.l}
              </TabFace>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div ref={wrapRef} className={`relative ${TB_SEG} bg-[var(--ui-seg-track-bg)]${stretch ? ' w-full' : ''}`}>
      {pill.style && (
        <span
          aria-hidden
          className={`absolute bg-[var(--ui-accent-pill-bg)] ${pill.motionClass}`}
          style={{ ...pill.style, top: 0, bottom: 0 }}
        />
      )}
      {options.map((o, i) => {
        const on = isOn(o.v);
        return (
          <button
            key={o.v}
            ref={el => { btnRefs.current[i] = el; }}
            {...o.dataProps}
            disabled={disabled}
            onClick={() => onChange(o.v)}
            title={o.title}
            style={{ ...chrome.control, height }}
            className={`relative z-10 font-medium transition-colors disabled:opacity-30 ${stretch ? 'flex-1' : ''} ${on ? 'text-[color:var(--ui-accent-pill-text)]' : 'text-[color:var(--ui-text-muted)] hover:bg-[var(--ui-accent-hover-bg)]'} ${o.v !== options[options.length - 1].v ? 'border-r border-[var(--ui-border)]' : ''}`}
          >
            {o.icon}
            {o.l}
          </button>
        );
      })}
    </div>
  );
};

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
 *  trailing actions. Wraps when its surface is narrower than the actions (the
 *  docked inspector column) — the trailing cluster then drops to its own line,
 *  still right-aligned via `ml-auto`, and wraps again internally if it is
 *  still wider than the panel. */
export const ChromeHeader: React.FC<{ leading?: React.ReactNode; trailing?: React.ReactNode; className?: string }> = ({ leading, trailing, className = '' }) => (
  <div className={`flex flex-wrap items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-0 ${className}`}>
    {leading}
    {trailing && <div className="ml-auto flex flex-wrap items-center justify-end gap-1">{trailing}</div>}
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
  // One unbreakable cluster: when a header's trailing wraps, the move pair and
  // the duplicate/delete pair stay together (no orphaned icons on a line).
  <div className="flex items-center gap-1 shrink-0">
    <ToolButton onClick={() => onMove(-1)} disabled={readOnly} title="Move up" className={TB_BTN_ICON}><ArrowUp className="w-2.5 h-2.5" /></ToolButton>
    <ToolButton onClick={() => onMove(1)} disabled={readOnly} title="Move down" className={TB_BTN_ICON}><ArrowDown className="w-2.5 h-2.5" /></ToolButton>
    <ToolButton onClick={onDuplicate} disabled={readOnly} title="Duplicate" className={TB_BTN_ICON}><Copy className="w-2.5 h-2.5" /></ToolButton>
    <div className={TB_DIVIDER} />
    <ToolButton onClick={onRemove} disabled={readOnly} title="Delete" className={`${TB_BTN_ICON} ${TB_DANGER}`}><Trash2 className="w-2.5 h-2.5" /></ToolButton>
  </div>
);
