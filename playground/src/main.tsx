import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './playground.css';
import {
  Button, DropdownMenu, DropdownItem, DropdownSubmenu,
  ItemManagerDropdown, Modal, ModalFooter, ModalFooterButton, Checkbox,
  Checklist, RadioList, DatePicker, Tooltip, ContextMenu, ContextMenuItem,
  ContextMenuDivider, ContextMenuSub, useOverlayMorph, DialogProvider, useDialog,
} from '../../src/index';
import type { DropdownTheme } from '../src/index';

/* ────────────────────────────────────────────────────────────────────────────
   ui-kit playground — the component zoo + debugging surfaces.

   Every surface is here so kit bugs can be reproduced WITHOUT the app:
   - controlled + uncontrolled DropdownMenus (the app's exact patterns)
   - modals, stacked modals, dropdowns/panels portaled INSIDE modals
   - useOverlayMorph clone panels (the app's DropdownPanel pattern)
   - every button variant/theme, inputs, tooltips, context menus
   ──────────────────────────────────────────────────────────────────────────── */

// ── 1. Buttons: every variant × theme ────────────────────────────────────────

function ButtonSection() {
  const themes = ['light', 'dark'] as const;
  const variants = ['subtle', 'primary', 'danger-ghost'] as const;
  return (
    <section data-section="buttons">
      <h2>Buttons — every variant × theme</h2>
      {themes.map(t => (
        <div key={t} className="row">
          <div className="label">theme={t}</div>
          {variants.map(v => (
            <React.Fragment key={v}>
              <Button theme={t} variant={v} data-testid={`btn-${t}-${v}`}>{v}</Button>
              <Button theme={t} variant={v} disabled>disabled</Button>
            </React.Fragment>
          ))}
        </div>
      ))}
    </section>
  );
}

// ── 2. DropdownMenus ─────────────────────────────────────────────────────────

const MENU_ITEMS = ['Hold', 'Travel', 'Day Off', 'Rehearsal'];

function CtrlMenu({ theme = 'dark', label = 'Ctrl menu', testId = 'ctrl-menu-trigger' }: { theme?: DropdownTheme; label?: string; testId?: string }) {
  /* The app's controlled pattern (DayEventsModal "Add event type"): parent
     owns `open`, trigger is a Button. THE repro surface for the
     trigger-click-dismiss flicker/stuck bug. */
  const [open, setOpen] = useState(false);
  const [pick, setPick] = useState<string | null>(null);
  return (
    <div className="row" data-testid="ctrl-menu">
      <DropdownMenu open={open} onOpenChange={setOpen} theme={theme} width="w-44"
        trigger={
          <Button theme={theme} variant="primary" data-testid={testId}>
            {label} {pick ? `— ${pick}` : ''}
          </Button>
        }
      >
        {MENU_ITEMS.map(it => (
          <DropdownItem key={it} selected={pick === it} onClick={() => { setPick(it); setOpen(false); }}>
            <span>{it}</span>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </div>
  );
}

function UncontrolledMenu() {
  /* Typical uncontrolled usage: local open state, Button trigger. */
  const [open, setOpen] = useState(false);
  return (
    <div className="row" data-testid="uncontrolled-menu">
      <DropdownMenu open={open} onOpenChange={setOpen} width="w-44"
        trigger={<Button data-testid="uncontrolled-trigger">Uncontrolled menu</Button>}
      >
        {MENU_ITEMS.map(it => <DropdownItem key={it} onClick={() => setOpen(false)}>{it}</DropdownItem>)}
      </DropdownMenu>
    </div>
  );
}

function InitialHighlightMenu() {
  /* initialHighlightIndex: opens with the row pre-lit (the panel's
     single-mode "highlight the current" — CategoryDropdown's pattern). */
  const [open, setOpen] = useState(false);
  const [pick, setPick] = useState<string | null>('Travel');
  return (
    <div className="row" data-testid="initial-highlight">
      <DropdownMenu open={open} onOpenChange={setOpen} width="w-44" initialHighlightIndex={1}
        trigger={<Button data-testid="initial-trigger">Initial highlight {pick ? `— ${pick}` : ''}</Button>}
      >
        {MENU_ITEMS.map(it => (
          <DropdownItem key={it} selected={pick === it} onClick={() => { setPick(it); setOpen(false); }}>{it}</DropdownItem>
        ))}
      </DropdownMenu>
    </div>
  );
}

function LongMenuDemo() {
  /* A 30-item menu — overflows the viewport, exercises the manual wheel
     scroll + the max-height clamp. */
  const [open, setOpen] = useState(false);
  return (
    <div className="row" data-testid="long-menu">
      <DropdownMenu open={open} onOpenChange={setOpen}
        trigger={<Button data-testid="long-trigger">Long menu</Button>}
      >
        {Array.from({ length: 30 }, (_, i) => (
          <DropdownItem key={i} onClick={() => setOpen(false)}>Item {i + 1}</DropdownItem>
        ))}
      </DropdownMenu>
    </div>
  );
}

function RightEdgeMenu() {
  /* The Schedule version-manager pattern: a fixed-width (w-80) menu whose
     trigger sits at the viewport's right edge. The viewport clamp must use
     the CONTENT's width (320px), not the trigger's — a clamp against the
     trigger width leaves the menu cropped at the right edge. */
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen} width="w-80"
      trigger={
        <button data-testid="right-edge-trigger"
          style={{ position: 'fixed', right: 8, top: 210, zIndex: 50, padding: '8px 14px', borderRadius: 8, border: '1px solid #71717a', background: '#18181b', color: '#fafafa', cursor: 'pointer' }}>
          Edge w-80 menu
        </button>
      }
    >
      {['Edge A', 'Edge B', 'Edge C'].map(it => (
        <DropdownItem key={it} onClick={() => setOpen(false)}>{it}</DropdownItem>
      ))}
    </DropdownMenu>
  );
}

function SubmenuDemo() {
  const [open, setOpen] = useState(false);
  const [pick, setPick] = useState<string | null>(null);
  return (
    <div className="row" data-testid="submenu-demo">
      <DropdownMenu open={open} onOpenChange={setOpen} width="w-40"
        trigger={<Button data-testid="submenu-trigger">Submenu {pick ? `— ${pick}` : ''}</Button>}
      >
        <DropdownItem onClick={() => { setPick('Plain item'); setOpen(false); }}>Plain item</DropdownItem>
        <DropdownSubmenu id="more" label="More…">
          <DropdownItem onClick={() => { setPick('Nested A'); setOpen(false); }}>Nested A</DropdownItem>
          <DropdownItem onClick={() => { setPick('Nested B'); setOpen(false); }}>Nested B</DropdownItem>
          <DropdownSubmenu id="deeper" label="Deeper…">
            <DropdownItem onClick={() => { setPick('Level 3 A'); setOpen(false); }}>Level 3 A</DropdownItem>
            <DropdownItem onClick={() => { setPick('Level 3 B'); setOpen(false); }}>Level 3 B</DropdownItem>
          </DropdownSubmenu>
        </DropdownSubmenu>
        <DropdownSubmenu id="danger" label="Danger zone…">
          <DropdownItem variant="danger" onClick={() => { setPick('Delete everything'); setOpen(false); }}>Delete everything</DropdownItem>
          <DropdownItem variant="danger" onClick={() => { setPick('Wipe'); setOpen(false); }}>Wipe</DropdownItem>
        </DropdownSubmenu>
        <DropdownItem onClick={() => { setPick('Last item'); setOpen(false); }}>Last item</DropdownItem>
      </DropdownMenu>
    </div>
  );
}

function ItemManagerDemo() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { id: '1', name: 'Alpha' },
    { id: '2', name: 'Beta' },
    { id: '3', name: 'Gamma' },
  ]);
  const [active, setActive] = useState('1');
  return (
    <div className="row" data-testid="item-manager">
      <ItemManagerDropdown
        open={open}
        onClose={setOpen}
        items={items}
        activeId={active}
        onSelect={setActive}
        onRename={(id, name) => setItems(prev => prev.map(i => i.id === id ? { ...i, name } : i))}
        onDuplicate={id => { const it = items.find(i => i.id === id)!; const nid = String(items.length + 1); setItems(prev => [...prev, { id: nid, name: it.name + ' Copy' }]); return nid; }}
        onDelete={id => setItems(prev => prev.filter(i => i.id !== id))}
        onCreate={() => { const nid = String(items.length + 1); setItems(prev => [...prev, { id: nid, name: 'New' }]); return nid; }}
        label="item"
        header="Items"
        trigger={<Button data-testid="itemmanager-trigger">Item manager</Button>}
      />
    </div>
  );
}

// ── 3. Modals + portals ──────────────────────────────────────────────────────

function BasicModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="row" data-testid="basic-modal-demo">
      <Button data-testid="modal-open" onClick={() => setOpen(true)}>Open modal</Button>
      {open && (
        <Modal open onClose={() => setOpen(false)} title="Basic modal" width="max-w-md"
          footer={
            <ModalFooter>
              <ModalFooterButton variant="ghost" onClick={() => setOpen(false)}>Cancel</ModalFooterButton>
              <ModalFooterButton onClick={() => setOpen(false)}>OK</ModalFooterButton>
            </ModalFooter>
          }
        >
          <div className="p-6 space-y-5">
            <p>A plain modal. The morph (FLIP zoom) plays on open and close.</p>
            <ModalFooterButton variant="danger-solid" onClick={() => setOpen(false)}>Danger confirm</ModalFooterButton>
          </div>
        </Modal>
      )}
    </div>
  );
}

function StackedModalDemo() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  return (
    <div className="row" data-testid="stacked-modal-demo">
      <Button data-testid="stacked-open" onClick={() => setOpen1(true)}>Open stacked modals</Button>
      {open1 && (
        <Modal open onClose={() => setOpen1(false)} title="Modal 1" width="max-w-md"
          footer={
            <ModalFooter>
              <ModalFooterButton onClick={() => setOpen2(true)}>Open Modal 2</ModalFooterButton>
              <ModalFooterButton variant="ghost" onClick={() => setOpen1(false)}>Close</ModalFooterButton>
            </ModalFooter>
          }
        >
          <div className="p-6 space-y-5"><p>Bottom modal.</p></div>
        </Modal>
      )}
      {open2 && (
        <Modal open onClose={() => setOpen2(false)} title="Modal 2" width="max-w-sm"
          footer={
            <ModalFooter>
              <ModalFooterButton variant="ghost" onClick={() => setOpen2(false)}>Close</ModalFooterButton>
            </ModalFooter>
          }
        >
          <div className="p-6 space-y-5"><p>Top modal.</p></div>
        </Modal>
      )}
    </div>
  );
}

function MenuInsideModal() {
  /* The app's portal surface: a DropdownMenu inside a Modal. Radix portals
     the menu content to the body — this exercises portal target, z-order,
     Escape (must close ONLY the menu), the morph anchor, and wheel scroll
     for a LONG list portaled over the modal. */
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [longMenuOpen, setLongMenuOpen] = useState(false);
  return (
    <div className="row" data-testid="menu-in-modal">
      <Button data-testid="menu-modal-open" onClick={() => setOpen(true)}>Open modal with menu</Button>
      {open && (
        <Modal open onClose={() => setOpen(false)} title="Modal + menu" width="max-w-md"
          footer={
            <ModalFooter>
              <ModalFooterButton variant="ghost" onClick={() => setOpen(false)}>Close</ModalFooterButton>
            </ModalFooter>
          }
        >
          <div className="p-6 space-y-5">
            <p>Menu portaled from inside this modal:</p>
            <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen} theme="dark" width="w-44"
              trigger={
                <Button theme="dark" variant="primary" data-testid="inmodal-menu-trigger">In-modal menu</Button>
              }
            >
              {MENU_ITEMS.map(it => <DropdownItem key={it} onClick={() => setMenuOpen(false)}>{it}</DropdownItem>)}
            </DropdownMenu>
            <p>Long menu over the modal (wheel-scrollable):</p>
            <DropdownMenu open={longMenuOpen} onOpenChange={setLongMenuOpen} theme="dark"
              trigger={
                <Button theme="dark" variant="primary" data-testid="inmodal-long-trigger">Long menu in modal</Button>
              }
            >
              {Array.from({ length: 30 }, (_, i) => (
                <DropdownItem key={i} onClick={() => setLongMenuOpen(false)}>Item {i + 1}</DropdownItem>
              ))}
            </DropdownMenu>
            <p>
              Escape while the menu is open must dismiss ONLY the menu — the
              modal stays. Escape with the menu closed closes the modal.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── 4. useOverlayMorph clone panels (the app's DropdownPanel pattern) ───────

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
  /* The app's positioning pass: one rAF after mount moves the panel from
     the initial (0,0) to its real position. */
  React.useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => setPos({ top: 240, left: 80 }));
    return () => cancelAnimationFrame(raf);
  }, [open]);
  return (
    <div className="row" data-testid="panel-demo">
      {/* fixed so the trigger's viewport position is deterministic regardless
          of page scroll (Playwright scrolls elements into view before
          clicking — the panel's anchor math depends on the trigger's spot) */}
      <button
        ref={triggerRef}
        data-testid="panel-trigger"
        onClick={() => setOpen(o => !o)}
        style={{ position: 'fixed', left: 80, top: 20, zIndex: 50, padding: '8px 14px', borderRadius: 8, border: '1px solid #71717a', background: '#18181b', color: '#fafafa', cursor: 'pointer' }}
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

// ── 5. Inputs + misc ────────────────────────────────────────────────────────

function InputsSection() {
  const [checked, setChecked] = useState(true);
  const [list, setList] = useState<string[]>(['a']);
  const [radio, setRadio] = useState('one');
  const [dates, setDates] = useState<string[]>([]);
  return (
    <section data-section="inputs">
      <h2>Inputs</h2>
      <div className="row">
        <Checkbox checked={checked} onChange={setChecked} label="Checkbox" />
        <Checklist
          items={[{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }, { id: 'c', label: 'C' }]}
          selected={list}
          onToggle={(id) => setList(prev => prev.includes(String(id)) ? prev.filter(x => x !== String(id)) : [...prev, String(id)])}
        />
        <RadioList
          items={[{ id: 'one', label: 'One' }, { id: 'two', label: 'Two' }]}
          value={radio}
          onChange={(v) => setRadio(String(v))}
        />
      </div>
      <div className="row">
        <div className="label">DatePicker (multi)</div>
        <DatePicker selected={dates} onChange={setDates} />
      </div>
    </section>
  );
}

function MiscSection() {
  const [ctx, setCtx] = useState<{ x: number; y: number } | null>(null);
  const [pick, setPick] = useState<string | null>('Nested A');
  return (
    <section data-section="misc">
      <h2>Tooltips + context menu</h2>
      <div className="row">
        <Tooltip content="A tooltip">
          <span style={{ border: '1px dashed #a1a1aa', padding: '4px 10px', borderRadius: 6 }}>Hover me</span>
        </Tooltip>
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
        <button data-testid="ctx-right-edge" style={{ position: 'fixed', right: 8, top: 120, zIndex: 50 }}
          onClick={e => { setCtx({ x: window.innerWidth - 20, y: 140 }); }}>
          Open ctx menu at right edge
        </button>
        <span className="label" style={{ marginLeft: 8 }}>pick: {pick}</span>
      </div>
    </section>
  );
}

// ── 4. Dialogs (Modal sub-elements) ─────────────────────────────────────────

function DialogsSection() {
  const dialog = useDialog();
  const [last, setLast] = useState<string>('—');
  const [hostOpen, setHostOpen] = useState(false);
  return (
    <section data-section="dialogs">
      <h2>Dialogs — confirm / prompt / alert render through the Modal (morph + dim)</h2>
      <div className="row">
        <Button data-testid="dlg-confirm" onClick={async () => { const ok = await dialog.confirm({ title: 'Delete Scene?', message: 'This can be restored from Trash.' }); setLast(`confirm → ${ok}`); }}>
          Confirm
        </Button>
        <Button data-testid="dlg-danger" onClick={async () => { const ok = await dialog.confirm({ title: 'Empty Trash?', message: 'Permanently delete all trash items?', danger: true, suppressKey: 'playground_dnwa_empty_trash' }); setLast(`danger → ${ok}`); }}>
          Danger confirm + DNWA
        </Button>
        <Button data-testid="dlg-prompt" onClick={async () => { const v = await dialog.prompt({ title: 'Project Name', defaultValue: 'Untitled Project', placeholder: 'Project name' }); setLast(`prompt → ${v}`); }}>
          Prompt
        </Button>
        <Button data-testid="dlg-alert" onClick={async () => { await dialog.alert({ title: 'Saved', message: 'Your project is up to date.' }); setLast('alert → ok'); }}>
          Alert
        </Button>
        <Button data-testid="dlg-over-host" onClick={() => setHostOpen(true)}>
          Dialog over host modal
        </Button>
        <span className="label">last: {last}</span>
      </div>
      {hostOpen && (
        <Modal
          open
          onClose={() => setHostOpen(false)}
          title="Host modal"
          width="max-w-md"
          footer={
            <ModalFooter>
              <ModalFooterButton variant="ghost" onClick={() => setHostOpen(false)}>Close</ModalFooterButton>
            </ModalFooter>
          }
        >
          <div className="p-6 space-y-5">
            <p>An alert opened here morphs OUT OF THIS BOX (stack FLIP); the dim stays one layer.</p>
            <Button data-testid="dlg-in-host" onClick={async () => { const ok = await dialog.confirm({ title: 'Over modal', message: 'Confirm from inside the host modal.', danger: true }); setLast(`over-modal → ${ok}`); }}>
              Danger confirm over modal
            </Button>
          </div>
        </Modal>
      )}
    </section>
  );
}

// ── App ─────────────────────────────────────────────────────────────────────

function App() {
  return (
    <>
      <h1 style={{ margin: '20px 16px 0', fontSize: 18 }}>ui-kit playground — component zoo &amp; bug repro surfaces</h1>
      <p style={{ margin: '4px 16px 0', fontSize: 12, color: '#71717a' }}>
        DropdownMenu: use the trigger click to dismiss (that's the buggy path). Panels: open/close twice (StrictMode phantom clone).
      </p>
      <ButtonSection />
      <section data-section="dropdowns">
        <h2>DropdownMenus — controlled / uncontrolled / submenu / item manager</h2>
        <CtrlMenu />
        <CtrlMenu theme="light" label="Ctrl menu light" testId="ctrl-menu-light-trigger" />
        <UncontrolledMenu />
        <InitialHighlightMenu />
        <LongMenuDemo />
        <RightEdgeMenu />
        <SubmenuDemo />
        <ItemManagerDemo />
      </section>
      <section data-section="modals">
        <h2>Modals — basic / stacked / menu-inside</h2>
        <BasicModalDemo />
        <StackedModalDemo />
        <MenuInsideModal />
      </section>
      <DialogsSection />
      <section data-section="morph-panels">
        <h2>useOverlayMorph clone panels (the app DropdownPanel pattern)</h2>
        <PanelDemo />
      </section>
      <InputsSection />
      <MiscSection />
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DialogProvider>
      <App />
    </DialogProvider>
  </React.StrictMode>,
);
