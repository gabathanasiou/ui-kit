import React, { useState } from 'react';
import {
  Button, DropdownMenu, DropdownItem, DropdownSubmenu, ItemManagerDropdown,
} from '../../../src/index';
import type { DropdownTheme } from '../../../src/index';
import { Check, Copy, Pencil, Trash2 } from 'lucide-react';
import { MENU_ITEMS } from '../demoData';
import { DemoCard } from '../shell/chrome';

/* Dropdown menus: the app's controlled pattern, the theme palettes, the plain
   data variants (long / capped / grouped / submenu / item manager) and the row
   options (icon, selected tick, right action, danger). The two viewport-edge
   repros live in their own debug card at the end. */

const MENU_PICKS = ['Hold', 'Travel', 'Prep'];

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

function ThemeMenu({ theme, label }: { theme: 'blue' | 'emerald'; label: string }) {
  const [open, setOpen] = useState(false);
  const [pick, setPick] = useState<string | null>(null);
  return (
    <DropdownMenu
      open={open}
      onOpenChange={setOpen}
      theme={theme}
      width="w-44"
      trigger={<Button variant="primary" cloud={theme === 'emerald' ? 'emerald' : true} data-testid={`theme-menu-${theme}-trigger`}>{label}</Button>}
    >
      {MENU_PICKS.map(v => (
        <DropdownItem key={v} selected={pick === v} onClick={() => { setPick(v); setOpen(false); }}>{v}</DropdownItem>
      ))}
    </DropdownMenu>
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
     scroll + the max-height clamp. The capped variant proves maxMenuHeight
     feeds the engine (the cap holds AND the menu still flips). */
  const [open, setOpen] = useState(false);
  const [cappedOpen, setCappedOpen] = useState(false);
  return (
    <div className="row" data-testid="long-menu">
      <DropdownMenu open={open} onOpenChange={setOpen}
        trigger={<Button data-testid="long-trigger">Long menu (30 items)</Button>}
      >
        {Array.from({ length: 30 }, (_, i) => (
          <DropdownItem key={i} onClick={() => setOpen(false)}>Item {i + 1}</DropdownItem>
        ))}
      </DropdownMenu>
      <DropdownMenu open={cappedOpen} onOpenChange={setCappedOpen} maxMenuHeight={160}
        trigger={<Button data-testid="capped-trigger">Capped (160px)</Button>}
      >
        {Array.from({ length: 30 }, (_, i) => (
          <DropdownItem key={i} onClick={() => setCappedOpen(false)}>Item {i + 1}</DropdownItem>
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

function MenuRowsDemo() {
  /* Every row option in one panel: leading icon, selected tint + tick, a
     trailing right-action button (keepOpen), disabled and danger rows. */
  const [open, setOpen] = useState(false);
  const [pick, setPick] = useState('Selected row');
  const [renames, setRenames] = useState(0);
  return (
    <div className="row" data-testid="menu-rows-demo">
      <DropdownMenu open={open} onOpenChange={setOpen} width="w-64"
        trigger={<Button data-testid="menu-rows-trigger">Row options</Button>}
      >
        <DropdownItem icon={<Copy className="w-3.5 h-3.5" />} onClick={() => { setPick('Icon row'); setOpen(false); }}>
          Icon + label
        </DropdownItem>
        <DropdownItem
          selected={pick === 'Selected row'}
          trailing={pick === 'Selected row' ? <Check className="w-3.5 h-3.5" /> : undefined}
          onClick={() => { setPick('Selected row'); setOpen(false); }}
        >
          Selected + tick
        </DropdownItem>
        <DropdownItem
          keepOpen
          rightAction={{ icon: <Pencil className="w-3.5 h-3.5" />, onClick: () => setRenames(n => n + 1), title: 'Rename' }}
          onClick={() => { setPick('Right-action row'); setOpen(false); }}
        >
          Right action
        </DropdownItem>
        <DropdownItem disabled onClick={() => {}}>Disabled row</DropdownItem>
        <DropdownItem variant="danger" icon={<Trash2 className="w-3.5 h-3.5" />} onClick={() => { setPick('Delete'); setOpen(false); }}>
          Danger row
        </DropdownItem>
      </DropdownMenu>
      <span className="label" data-testid="menu-rows-status">pick: {pick} · right-action clicks: {renames}</span>
    </div>
  );
}

export function DropdownsSection() {
  return (
    <>
      <DemoCard
        label="Controlled — dark"
        hint="Parent owns open; click the SAME trigger to dismiss (the buggy path)."
      >
        <CtrlMenu />
      </DemoCard>
      <DemoCard label="Controlled — light" hint="The same surface with the light palette.">
        <CtrlMenu theme="light" label="Ctrl menu light" testId="ctrl-menu-light-trigger" />
      </DemoCard>
      <DemoCard label="Theme palettes" hint="blue / emerald are the project-chrome menu themes.">
        <div className="row">
          <ThemeMenu theme="blue" label="Blue menu" />
          <ThemeMenu theme="emerald" label="Emerald menu" />
        </div>
      </DemoCard>
      <DemoCard label="Initial highlight" hint="Opens with the current row pre-lit (the CategoryDropdown pattern).">
        <InitialHighlightMenu />
      </DemoCard>
      <DemoCard label="Long + capped" hint="Wheel scroll, max-height clamp, and the flip decision below/above.">
        <LongMenuDemo />
      </DemoCard>
      <DemoCard label="Row options" hint="Icon, selected tint + tick, right action, disabled, danger.">
        <MenuRowsDemo />
      </DemoCard>
      <DemoCard label="Submenus" hint="Nested subs coexist; each level owns its own highlight.">
        <SubmenuDemo />
      </DemoCard>
      <DemoCard label="Item manager" hint="Rename / duplicate / delete inside the panel.">
        <ItemManagerDemo />
      </DemoCard>
      <DemoCard label="Edge repro" hint="The right-edge trigger is fixed on screen — open the w-80 menu to check the clamp." className="pg-card--debug">
        <RightEdgeMenu />
      </DemoCard>
    </>
  );
}
