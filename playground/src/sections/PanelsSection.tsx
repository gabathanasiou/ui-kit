import React, { useState } from 'react';
import { useOverlayMorph } from '../../../src/index';
import { MENU_ITEMS } from '../demoData';
import { DemoCard } from '../shell/chrome';

/* useOverlayMorph clone panels — the app's DropdownPanel pattern. The trigger
   is fixed on screen so its anchor maths are deterministic at any scroll. */

function PanelDemo() {
  /* The app's DropdownPanel pattern: a conditional panel div + the morph
     controller with cloneOnUnmount. The close plays on a pinned clone. This
     surface reproduces the StrictMode phantom-clone-on-reopen (dev) and the
     clone rect (must pin at the panel's rect, never at 0,0).

     The panel ALSO mounts at its INITIAL position state (0,0) and reaches
     its real spot only after a positioning rAF (the app's useFixedPosition)
     — the rect read at first paint is at the view origin, and the close
     clone must pin the POSITIONED rect, never that first paint. */
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const anchor = React.useCallback(() => {
    const el = triggerRef.current;
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { left: r.left, top: r.top, width: r.width, height: r.height };
  }, []);
  const setPanelRef = useOverlayMorph({
    visible: true,
    morph: true,
    ref: panelRef,
    anchor,
    cloneOnUnmount: true,
  });
  /* The app's positioning pass: the panel opens under the trigger, pinned
     fixed at its FINAL rect (never at the 0,0 first paint). The trigger keeps
     a fixed spot so the anchor maths are deterministic at any page scroll. */
  React.useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => {
      const r = triggerRef.current?.getBoundingClientRect();
      setPos(r
        ? { top: Math.round(r.bottom + 6), left: Math.max(12, Math.min(Math.round(r.left), window.innerWidth - 236)) }
        : { top: 240, left: 300 });
    });
    return () => cancelAnimationFrame(raf);
  }, [open]);
  return (
    <div className="row" data-testid="panel-demo">
      {/* fixed so the trigger's viewport position is deterministic regardless
          of page scroll (Playwright scrolls elements into view before
          clicking — the panel's anchor math depends on the trigger's spot).
          It sits in the right-hand debug rail, clear of the content column. */}
      <button
        ref={triggerRef}
        data-testid="panel-trigger"
        className="pg-debug-trigger"
        onClick={() => setOpen(o => !o)}
        style={{ position: 'fixed', right: 16, top: 64, zIndex: 50 }}
      >
        Panel trigger (clone close)
      </button>
      <span className="label" style={{ marginLeft: 8, visibility: 'hidden' }}>
        open={String(open)} — panel pins a clone at its rect on close
      </span>
      {open && (
        <div
          ref={setPanelRef}
          data-testid="panel"
          style={{ position: 'fixed', left: pos.left, top: pos.top, width: 220, background: '#fff', border: '1px solid #d4d4d8', borderRadius: 8, boxShadow: '0 8px 30px rgba(0,0,0,0.18)', padding: 8, zIndex: 10000 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {MENU_ITEMS.map(it => (
              <div key={it} style={{ padding: '6px 8px', borderRadius: 6, cursor: 'pointer' }} onMouseEnter={e => (e.currentTarget.style.background = '#f4f4f5')} onMouseLeave={e => (e.currentTarget.style.background = '')} onClick={() => setOpen(false)}>
                {it}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function PanelsSection() {
  return (
    <DemoCard
      wide
      label="Clone-on-unmount panel"
      hint="A fixed trigger (in the right-hand debug rail) opens the app's DropdownPanel pattern. Close it: the panel unmounts and a CLONE pinned at the panel's rect zooms out toward the trigger. Open/close twice — the dev StrictMode double-mount must not spawn a phantom clone."
      className="pg-card--debug"
    >
      <PanelDemo />
    </DemoCard>
  );
}
