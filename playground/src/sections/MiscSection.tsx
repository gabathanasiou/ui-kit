import React, { useState } from 'react';
import {
  LongPressMenuProvider, Tooltip, ContextMenu, ContextMenuItem, ContextMenuDivider, ContextMenuSub,
} from '../../../src/index';
import { DemoCard } from '../shell/chrome';

/* Shell utilities: tooltips, context menus (keyboard + nested subs + the
   right-edge clamp repro) and the touch long-press menu. */

function LongPressDemo() {
  const [ctx, setCtx] = useState<{ x: number; y: number } | null>(null);
  const [pick, setPick] = useState('—');
  return (
    <div className="row" data-testid="lp-demo">
      <LongPressMenuProvider>
        <div
          data-context-menu
          data-testid="lp-target"
          onContextMenu={(e) => { e.preventDefault(); setCtx({ x: e.clientX, y: e.clientY }); }}
          style={{ border: '1px dashed #a1a1aa', padding: '14px 18px', borderRadius: 8, fontSize: 12, color: '#a1a1aa' }}
        >
          Hold ~500ms on touch (or right-click on desktop)
        </div>
      </LongPressMenuProvider>
      <ContextMenu open={!!ctx} x={ctx?.x ?? 0} y={ctx?.y ?? 0} onClose={() => setCtx(null)}>
        <ContextMenuItem selected={pick === 'Rename'} onClick={() => { setPick('Rename'); setCtx(null); }}>Rename</ContextMenuItem>
        <ContextMenuItem selected={pick === 'Duplicate'} onClick={() => { setPick('Duplicate'); setCtx(null); }}>Duplicate</ContextMenuItem>
        <ContextMenuDivider />
        <ContextMenuItem variant="danger" onClick={() => { setPick('Delete'); setCtx(null); }}>Delete</ContextMenuItem>
      </ContextMenu>
      <span className="label">pick: {pick}</span>
    </div>
  );
}

function ContextMenuDemo() {
  const [ctx, setCtx] = useState<{ x: number; y: number } | null>(null);
  const [pick, setPick] = useState<string | null>('Nested A');
  return (
    <div className="row" data-testid="ctx-demo">
      <ContextMenu
        open={!!ctx}
        x={ctx?.x ?? 0}
        y={ctx?.y ?? 0}
        onClose={() => setCtx(null)}
      >
        <ContextMenuItem selected={pick === 'Plain item'} onClick={() => { setPick('Plain item'); setCtx(null); }}>
          Plain item {pick === 'Plain item' ? '— current' : ''}
        </ContextMenuItem>
        <ContextMenuSub id="more" label="More…">
          <ContextMenuItem selected={pick === 'Nested A'} onClick={() => { setPick('Nested A'); setCtx(null); }}>
            Nested A {pick === 'Nested A' ? '— current' : ''}
          </ContextMenuItem>
          <ContextMenuItem onClick={() => { setPick('Nested B'); setCtx(null); }}>Nested B</ContextMenuItem>
          <ContextMenuSub id="deeper" label="Deeper…">
            <ContextMenuItem onClick={() => { setPick('Level 3 A'); setCtx(null); }}>Level 3 A</ContextMenuItem>
            <ContextMenuItem onClick={() => { setPick('Level 3 B'); setCtx(null); }}>Level 3 B</ContextMenuItem>
          </ContextMenuSub>
        </ContextMenuSub>
        <ContextMenuDivider />
        <ContextMenuItem variant="danger" onClick={() => { setPick('Delete'); setCtx(null); }}>Delete</ContextMenuItem>
      </ContextMenu>
      <button data-testid="ctx-target" onClick={e => { const r = (e.target as HTMLElement).getBoundingClientRect(); setCtx({ x: r.left + r.width / 2, y: r.bottom + 4 }); }}>
        Open context menu
      </button>
      <button data-testid="ctx-right-edge" className="pg-debug-trigger" style={{ position: 'fixed', right: 8, top: 122, zIndex: 50 }}
        onClick={() => { setCtx({ x: window.innerWidth - 20, y: 140 }); }}>
        Open ctx menu at right edge
      </button>
      <span className="label" style={{ marginLeft: 8 }}>pick: {pick}</span>
    </div>
  );
}

export function MiscSection() {
  return (
    <>
      <DemoCard
        label="Context menu"
        hint="Single highlight (pointer + keys), typeahead, nested subs and the right-edge clamp. The floating right-edge button is the viewport repro."
      >
        <ContextMenuDemo />
      </DemoCard>
      <DemoCard label="Long-press menu" hint="Touch: hold ~500ms. Pen/finger are treated the same; right-click works on desktop.">
        <LongPressDemo />
      </DemoCard>
      <DemoCard label="Tooltip" hint="Portaled, theme-aware, and coarse-scaled with the rest of the kit.">
        <div className="row">
          <Tooltip content="A tooltip">
            <span style={{ border: '1px dashed #a1a1aa', padding: '4px 10px', borderRadius: 6 }}>Hover me</span>
          </Tooltip>
        </div>
      </DemoCard>
    </>
  );
}
