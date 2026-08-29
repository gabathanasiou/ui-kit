import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './playground.css';
import {
  Button, DropdownMenu, DropdownItem, DropdownSubmenu,
  ItemManagerDropdown, Modal, ModalFooter, ModalFooterButton, Checkbox,
  Checklist, RadioList, DatePicker, Tooltip, ContextMenu, ContextMenuItem,
  ContextMenuDivider, useOverlayMorph,
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
          <DropdownItem key={it} onClick={() => { setPick(it); setOpen(false); }}>
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

function SubmenuDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="row" data-testid="submenu-demo">
      <DropdownMenu open={open} onOpenChange={setOpen} width="w-40"
        trigger={<Button data-testid="submenu-trigger">Submenu</Button>}
      >
        <DropdownItem>Plain item</DropdownItem>
        <DropdownSubmenu label="More…">
          <DropdownItem>Nested A</DropdownItem>
          <DropdownItem>Nested B</DropdownItem>
        </DropdownSubmenu>
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
     Escape (must close ONLY the menu), and the morph anchor. */
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
     clone rect (must pin at the panel's rect, never at 0,0). */
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 240, left: 80 });
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
  return (
    <div className="row" data-testid="panel-demo">
      <button
        ref={triggerRef}
        data-testid="panel-trigger"
        onClick={() => setOpen(o => !o)}
        style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid #71717a', background: '#18181b', color: '#fafafa', cursor: 'pointer' }}
      >
        Panel trigger (clone close)
      </button>
      <span className="label" style={{ marginLeft: 8 }}>
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
          <ContextMenuItem onSelect={() => setCtx(null)}>Item one</ContextMenuItem>
          <ContextMenuItem onSelect={() => setCtx(null)}>Item two</ContextMenuItem>
          <ContextMenuDivider />
          <ContextMenuItem onSelect={() => setCtx(null)} danger>Delete</ContextMenuItem>
        </ContextMenu>
        <button data-testid="ctx-target" onClick={e => { const r = (e.target as HTMLElement).getBoundingClientRect(); setCtx({ x: r.left + r.width / 2, y: r.bottom + 4 }); }}>
          Open context menu
        </button>
      </div>
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
        <SubmenuDemo />
        <ItemManagerDemo />
      </section>
      <section data-section="modals">
        <h2>Modals — basic / stacked / menu-inside</h2>
        <BasicModalDemo />
        <StackedModalDemo />
        <MenuInsideModal />
      </section>
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
    <App />
  </React.StrictMode>,
);
