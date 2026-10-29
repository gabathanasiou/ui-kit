import type { Theme } from '@glideapps/glide-data-grid';

/**
 * The tiny shared paint helpers every painted Glide cell needs.
 *
 * Kept apart from `customCells.tsx` so the control cells (and the lean
 * `glide-controls` package entry) do not pull the kit's morph fields and
 * search menu just to draw a glyph.
 */

export type PaintIcon = 'plus' | 'trash' | 'chevron' | 'check' | 'search';

/** Canvas theme dark/light discriminator (shared by every painted cell kind). */
export function isDark(theme: Theme): boolean {
  const hex = theme.bgCell.replace('#', '');
  if (hex.length !== 6) return theme.textDark === '#ffffff';
  const n = parseInt(hex, 16);
  const l = (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
  return l < 0.5;
}

export function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
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

export function drawIcon(
  ctx: CanvasRenderingContext2D,
  icon: PaintIcon,
  x: number,
  y: number,
  size: number,
  color: string,
): void {
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
