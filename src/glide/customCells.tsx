import React, { useState } from 'react';
import { GridCellKind, type CustomCell, type CustomRenderer, type Theme } from '@glideapps/glide-data-grid';
import { MorphActionField } from '../MorphActionField';
import { MorphSearchField } from '../MorphSearchField';
import { useKitTheme } from '../ThemeScope';

/**
 * Custom Glide cells drawn by the kit.
 *
 * Three things a plain Glide cell cannot express:
 *  - a BUTTON that fires on a SINGLE click (drawn on the canvas, so it is a
 *    picture of a kit button rather than a DOM button);
 *  - a BADGE/PILL (a drawn status label with its own colours);
 *  - a FIELD cell: one click opens a REAL kit morph control — `SearchMenu`-style
 *    search or a create/text box (`MorphSearchField` / `MorphActionField`) —
 *    in Glide's overlay editor. The animation is the kit's; the cell is only
 *    the closed trigger face.
 *
 * All are `GridCellKind.Custom` cells resolved by `customRenderers` on the
 * DataEditor. Clicks are hit-tested by Glide and dispatched to the renderer,
 * so the cells keep working while the grid scrolls and recycles.
 */

export type KitButtonIcon = 'plus' | 'trash' | 'chevron' | 'check' | 'search';
export type KitButtonVariant = 'primary' | 'subtle' | 'outline' | 'danger';

export interface KitButtonCellData {
  kind: 'kit-button';
  label: string;
  icon?: KitButtonIcon;
  variant?: KitButtonVariant;
  disabled?: boolean;
  /** Fired on a single click. Keep side effects small — it is a cell, not a form. */
  onActivate?: () => void;
}

export type KitButtonCell = CustomCell<KitButtonCellData>;

/** A canvas-drawn button cell. `readonly` — it never opens an editor. The
 *  `kind` discriminator is added here so callers pass only the face. */
export function kitButtonCell(data: Omit<KitButtonCellData, 'kind'>): KitButtonCell {
  const payload: KitButtonCellData = { kind: 'kit-button', ...data };
  return {
    kind: GridCellKind.Custom,
    allowOverlay: false,
    readonly: true,
    copyData: payload.label,
    data: payload,
  };
}

export interface KitBadgeCellData {
  kind: 'kit-badge';
  label: string;
  /** Tailwind-ish tone names the renderer knows how to paint. */
  tone?: 'neutral' | 'accent' | 'success' | 'warning' | 'danger';
}

export type KitBadgeCell = CustomCell<KitBadgeCellData>;

export function kitBadgeCell(data: Omit<KitBadgeCellData, 'kind'>): KitBadgeCell {
  const payload: KitBadgeCellData = { kind: 'kit-badge', ...data };
  return {
    kind: GridCellKind.Custom,
    allowOverlay: false,
    readonly: true,
    copyData: payload.label,
    cursor: 'default',
    data: payload,
  };
}

export interface KitFieldCellData {
  kind: 'kit-field';
  /** `search` = one click opens the kit MorphSearchField (the filter face);
   *  `action` = one click opens MorphActionField (the create/text-box face). */
  mode: 'search' | 'action';
  /** The closed trigger's label — what the cell shows and what the morph
   *  button reads before it expands. */
  label: string;
  /** Current value (a committed search term / created text). */
  value?: string;
  icon?: KitButtonIcon;
  variant?: KitButtonVariant;
  placeholder?: string;
  /** Fired with the submitted text. */
  onSubmit?: (value: string) => void;
}

export type KitFieldCell = CustomCell<KitFieldCellData>;

/** A button-face cell whose ONE click opens a real kit field (morph search or
 *  create/text box) in Glide's overlay editor. */
export function kitFieldCell(data: Omit<KitFieldCellData, 'kind'>): KitFieldCell {
  const payload: KitFieldCellData = { kind: 'kit-field', ...data };
  return {
    kind: GridCellKind.Custom,
    allowOverlay: true,
    readonly: false,
    copyData: payload.value || payload.label,
    // Glide's per-cell activation switch: one click opens the overlay editor,
    // which is where the kit control mounts.
    activationBehaviorOverride: 'single-click',
    data: payload,
  };
}

const BADGE_TONES: Record<NonNullable<KitBadgeCellData['tone']>, { bg: string; fg: string }> = {
  neutral: { bg: 'rgba(113, 113, 122, 0.16)', fg: '#52525b' },
  accent: { bg: 'rgba(37, 99, 235, 0.14)', fg: '#1d4ed8' },
  success: { bg: 'rgba(5, 150, 105, 0.14)', fg: '#047857' },
  warning: { bg: 'rgba(217, 119, 6, 0.16)', fg: '#b45309' },
  danger: { bg: 'rgba(220, 38, 38, 0.14)', fg: '#b91c1c' },
};

const DARK_BADGE_TONES: Record<NonNullable<KitBadgeCellData['tone']>, { bg: string; fg: string }> = {
  neutral: { bg: 'rgba(161, 161, 170, 0.18)', fg: '#d4d4d8' },
  accent: { bg: 'rgba(96, 165, 250, 0.2)', fg: '#bfdbfe' },
  success: { bg: 'rgba(52, 211, 153, 0.2)', fg: '#a7f3d0' },
  warning: { bg: 'rgba(251, 191, 36, 0.2)', fg: '#fde68a' },
  danger: { bg: 'rgba(248, 113, 113, 0.2)', fg: '#fecaca' },
};

function isDark(theme: Theme): boolean {
  const hex = theme.bgCell.replace('#', '');
  if (hex.length !== 6) return theme.textDark === '#ffffff';
  const n = parseInt(hex, 16);
  const l = (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
  return l < 0.5;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  const radius = Math.min(r, h / 2, w / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function drawIcon(ctx: CanvasRenderingContext2D, icon: KitButtonIcon, x: number, y: number, size: number, color: string): void {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(1.25, size / 10);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  const half = size / 2;
  const cx = x + half;
  const cy = y + half;
  ctx.beginPath();
  if (icon === 'plus') {
    ctx.moveTo(x + size * 0.15, cy);
    ctx.lineTo(x + size * 0.85, cy);
    ctx.moveTo(cx, y + size * 0.15);
    ctx.lineTo(cx, y + size * 0.85);
  } else if (icon === 'trash') {
    const top = y + size * 0.28;
    ctx.moveTo(x + size * 0.16, top);
    ctx.lineTo(x + size * 0.84, top);
    ctx.moveTo(x + size * 0.3, top);
    ctx.lineTo(x + size * 0.34, y + size * 0.14);
    ctx.lineTo(x + size * 0.66, y + size * 0.14);
    ctx.lineTo(x + size * 0.7, top);
    ctx.moveTo(x + size * 0.26, top);
    ctx.lineTo(x + size * 0.32, y + size * 0.86);
    ctx.lineTo(x + size * 0.68, y + size * 0.86);
    ctx.lineTo(x + size * 0.74, top);
  } else if (icon === 'chevron') {
    ctx.moveTo(x + size * 0.35, y + size * 0.24);
    ctx.lineTo(x + size * 0.62, cy);
    ctx.lineTo(x + size * 0.35, y + size * 0.76);
  } else if (icon === 'search') {
    const radius = size * 0.28;
    ctx.arc(cx - size * 0.06, cy - size * 0.06, radius, 0, Math.PI * 2);
    ctx.moveTo(cx + radius * 0.45, cy + radius * 0.45);
    ctx.lineTo(x + size * 0.86, y + size * 0.86);
  } else {
    ctx.moveTo(x + size * 0.18, cy);
    ctx.lineTo(x + size * 0.42, y + size * 0.74);
    ctx.lineTo(x + size * 0.84, y + size * 0.28);
  }
  ctx.stroke();
  ctx.restore();
}

interface FaceOptions {
  label: string;
  icon?: KitButtonIcon;
  variant?: KitButtonVariant;
  disabled?: boolean;
  hoverAmount: number;
  highlighted: boolean;
}

/** Paints a kit-button face inside a cell rect. Shared by the button and field
 *  cells so both look identical at rest. */
function drawFace(ctx: CanvasRenderingContext2D, rect: { x: number; y: number; width: number; height: number }, theme: Theme, opts: FaceOptions): void {
  const dark = isDark(theme);
  const variant = opts.variant ?? 'subtle';
  const insetY = 4;
  const boxH = Math.max(14, rect.height - insetY * 2);
  const boxY = rect.y + (rect.height - boxH) / 2;
  const boxX = rect.x + 4;
  const boxW = rect.width - 8;
  if (boxW <= 0) return;

  let bg: string | null = null;
  let border: string | null = null;
  let fg = theme.textDark;
  if (variant === 'primary') {
    bg = theme.accentColor;
    fg = theme.accentFg;
  } else if (variant === 'outline') {
    border = theme.borderColor;
  } else if (variant === 'danger') {
    fg = dark ? '#fca5a5' : '#b91c1c';
    border = dark ? 'rgba(248, 113, 113, 0.4)' : 'rgba(220, 38, 38, 0.35)';
  } else {
    bg = theme.bgBubble;
  }

  ctx.save();
  ctx.globalAlpha = opts.disabled ? 0.45 : 1;
  roundRect(ctx, boxX, boxY, boxW, boxH, 6);
  if (bg) {
    ctx.fillStyle = bg;
    ctx.fill();
  }
  if (opts.hoverAmount > 0 && !opts.disabled) {
    ctx.fillStyle = variant === 'primary' ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.06)';
    ctx.globalAlpha *= Math.min(1, opts.hoverAmount);
    ctx.fill();
  }
  // A kit button has no canvas hover animation, so focus/selection is the only
  // other state we can paint: a faint ring, never a fake CSS hover.
  if (opts.highlighted && !opts.disabled) {
    ctx.strokeStyle = theme.accentColor;
    ctx.globalAlpha = 0.55;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
  if (border) {
    ctx.strokeStyle = border;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  const fontSize = Math.max(10, Math.min(12, boxH - 8));
  ctx.font = `600 ${fontSize}px ${theme.fontFamily}`;
  ctx.textBaseline = 'middle';
  const iconSize = Math.min(14, boxH - 6);
  const gap = 5;
  const textW = ctx.measureText(opts.label).width;
  const totalW = textW + (opts.icon ? iconSize + gap : 0);
  let x = boxX + Math.max(6, (boxW - totalW) / 2);
  const cy = boxY + boxH / 2;
  if (opts.icon) {
    drawIcon(ctx, opts.icon, x, cy - iconSize / 2, iconSize, fg);
    x += iconSize + gap;
  }
  ctx.fillStyle = fg;
  ctx.textAlign = 'left';
  ctx.fillText(opts.label, x, cy);
  ctx.restore();
}

/** The overlay editor behind a field cell: the REAL kit morph control, already
 *  expanded. Glide opens it in one click because the cell opts into
 *  single-click activation. */
const KitFieldEditor: React.FC<any> = ({ value, onFinishedEditing }) => {
  const data = value?.data as KitFieldCellData | undefined;
  const kit = useKitTheme();
  const [text, setText] = useState(data?.value ?? '');
  if (!data) return null;
  const finish = (next: string | undefined) => {
    if (next !== undefined) data.onSubmit?.(next);
    onFinishedEditing(next === undefined ? undefined : value);
  };
  const common = {
    value: text,
    onChange: setText,
    triggerLabel: data.label,
    placeholder: data.placeholder ?? (data.mode === 'search' ? 'Search…' : 'Type…'),
    autoFocus: true,
    theme: kit?.mode ?? 'light',
    onCancel: () => finish(undefined),
    cancelOnEscape: true,
    cancelOnOutside: true,
  } as const;
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
      {data.mode === 'search' ? (
        <MorphSearchField {...common} onSubmit={v => finish(v)} expandedWidth={260} />
      ) : (
        <MorphActionField {...common} variant={data.variant === 'danger' ? 'outline' : data.variant ?? 'primary'} triggerIcon={undefined} onSubmit={v => finish(v)} />
      )}
    </div>
  );
};

function baseRenderer<T extends CustomCell<{ kind: string }>>(kind: string, draw: CustomRenderer<T>['draw']): CustomRenderer<T> {
  return {
    kind: GridCellKind.Custom,
    isMatch: (cell): cell is T => (cell.data as { kind?: string } | undefined)?.kind === kind,
    draw,
    needsHover: true,
  };
}

const kitButtonRenderer: CustomRenderer<KitButtonCell> = {
  ...baseRenderer<KitButtonCell>('kit-button', (args, cell) => {
    drawFace(args.ctx, args.rect, args.theme, {
      label: cell.data.label,
      icon: cell.data.icon,
      variant: cell.data.variant,
      disabled: cell.data.disabled,
      hoverAmount: args.hoverAmount,
      highlighted: args.highlighted,
    });
  }),
  onClick: ({ cell }) => {
    if (!cell.data.disabled) cell.data.onActivate?.();
    return undefined;
  },
};

const kitBadgeRenderer: CustomRenderer<KitBadgeCell> = {
  kind: GridCellKind.Custom,
  isMatch: (cell): cell is KitBadgeCell => (cell.data as KitBadgeCellData | undefined)?.kind === 'kit-badge',
  draw: ({ ctx, rect, theme }, cell) => {
    const tone = (cell.data.tone ?? 'neutral') as NonNullable<KitBadgeCellData['tone']>;
    const palette = isDark(theme) ? DARK_BADGE_TONES[tone] : BADGE_TONES[tone];
    const fontSize = Math.max(10, Math.min(11, rect.height - 10));
    ctx.save();
    ctx.font = `600 ${fontSize}px ${theme.fontFamily}`;
    const textW = ctx.measureText(cell.data.label).width;
    const padX = 7;
    const boxW = Math.min(rect.width - 8, textW + padX * 2);
    const boxH = Math.min(rect.height - 8, fontSize + 8);
    const boxX = rect.x + (rect.width - boxW) / 2;
    const boxY = rect.y + (rect.height - boxH) / 2;
    roundRect(ctx, boxX, boxY, boxW, boxH, boxH / 2);
    ctx.fillStyle = palette.bg;
    ctx.fill();
    ctx.fillStyle = palette.fg;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(cell.data.label, rect.x + rect.width / 2, boxY + boxH / 2);
    ctx.restore();
  },
};

const kitFieldRenderer: CustomRenderer<KitFieldCell> = {
  ...baseRenderer<KitFieldCell>('kit-field', (args, cell) => {
    drawFace(args.ctx, args.rect, args.theme, {
      label: cell.data.value ? `${cell.data.label}: ${cell.data.value}` : cell.data.label,
      icon: cell.data.icon ?? (cell.data.mode === 'search' ? 'search' : 'plus'),
      variant: cell.data.variant ?? (cell.data.mode === 'action' ? 'primary' : 'subtle'),
      hoverAmount: args.hoverAmount,
      highlighted: args.highlighted,
    });
  }),
  provideEditor: () => ({ editor: KitFieldEditor, disablePadding: true, styleOverride: { overflow: 'visible' } }),
};

/** The renderer list `GlideSheet` always registers. */
export const kitCellRenderers: readonly CustomRenderer<any>[] = [
  kitButtonRenderer as CustomRenderer<any>,
  kitBadgeRenderer as CustomRenderer<any>,
  kitFieldRenderer as CustomRenderer<any>,
];

/** Alias kept for hosts that prefer the upper-case constant. */
export const KIT_GLIDE_RENDERERS = kitCellRenderers;
