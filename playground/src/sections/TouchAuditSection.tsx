import React, { useRef, useState } from 'react';
import {
  Button, Checkbox, Checklist, RadioList, NumberInput, Seg, FloatingToggle, Modal, ModalFooter,
  ModalFooterButton, DropdownMenu, DropdownItem, DropdownSubmenu, ContextMenu, ContextMenuItem,
  SearchMenu, PickerField, Tooltip, MorphActionField, MorphSearchField, SelectionCheck,
  SelectionFooter, RichTextEditor, FormatToolbar, RICH_TEXT_STATE_IDLE, useDialog,
} from '../../../src/index';
import type { RichTextEditorHandle, RichTextState } from '../../../src/index';
import { ChevronRight, Pencil, Plus } from 'lucide-react';
import { DemoCard } from '../shell/chrome';

/* Touch audit matrix (roadmap 331) — one live case per kit primitive, each
   tagged `data-touch="<primitive>"` with a `data-touch-state` readout the
   Playwright `touch` spec asserts. The matrix is the checklist: every entry
   names its expected tap model, so a primitive that later starts needing two
   taps (or eats the first one) fails a named case instead of drifting.

   INTENTIONAL ONE-TAP exceptions (plain controls act on the FIRST tap — no
   hover affordance to discover): Button, Seg, Checkbox/Checklist/RadioList,
   NumberInput steppers, tab faces, SelectionCheck, FloatingToggle, the
   MorphActionField's collapsed trigger, and every menu ROW (a menu is already
   open; tapping a row selects). HOVER-DISCOVERED chrome (row action buttons,
   collapsed labels, tooltips) reveals on tap 1 and acts on tap 2. */

type CaseProps = {
  /** Stable id the touch spec drives. */
  id: string;
  label: string;
  /** The expected tap model, shown above the control. */
  hint: string;
  state?: string;
  children: React.ReactNode;
};

function TouchCase({ id, label, hint, state, children }: CaseProps) {
  return (
    <div data-touch={id} className="col-span-full rounded-lg border border-white/10 bg-white/[0.03] p-3 md:col-span-1">
      <div className="mb-1 flex items-baseline justify-between gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-zinc-200">{label}</span>
        <code className="text-[10px] text-zinc-500">{id}</code>
      </div>
      <p className="mb-2 text-[10px] leading-snug text-zinc-500">{hint}</p>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
      <div data-touch-state className="mt-2 min-h-4 text-[10px] text-zinc-400">{state ?? ''}</div>
    </div>
  );
}

function MenuCases() {
  const [open, setOpen] = useState(false);
  const [pick, setPick] = useState('—');
  const [searchOpen, setSearchOpen] = useState(false);
  const [presentation, setPresentation] = useState<'accordion' | 'replace'>('accordion');
  return (
    <>
      <TouchCase id="dropdown" label="Dropdown menu" hint="Tap 1 opens; tap a row selects; tap outside closes. Nested menu: accordion (header stays, panel expands below) or in place." state={`pick: ${pick} · menu: ${presentation}`}>
        <Seg
          options={[{ v: 'accordion', l: 'Accordion' }, { v: 'replace', l: 'In place' }]}
          value={presentation}
          onChange={(v) => setPresentation(v as 'accordion' | 'replace')}
          theme="dark"
          variant="track"
          dense
          ariaLabel="Nested menu presentation"
        />
        <DropdownMenu
          open={open}
          onOpenChange={setOpen}
          width="w-56"
          trigger={<Button variant="outline" theme="dark" data-touch-trigger>Menu</Button>}
        >
          <DropdownItem onClick={() => { setPick('First'); setOpen(false); }}>First item</DropdownItem>
          <DropdownItem onClick={() => { setPick('Second'); setOpen(false); }}>Second item</DropdownItem>
          <DropdownSubmenu id="touch-sub" label="More…" touchPresentation={presentation}>
            <DropdownItem onClick={() => { setPick('Nested A'); setOpen(false); }}>Nested A</DropdownItem>
            <DropdownItem onClick={() => { setPick('Nested B'); setOpen(false); }}>Nested B</DropdownItem>
          </DropdownSubmenu>
        </DropdownMenu>
      </TouchCase>

      <TouchCase id="context-menu" label="Context menu" hint="Opens at the press point; submenu opens in place on touch." state={`root: ${searchOpen ? 'open' : 'closed'}`}>
        <Button
          variant="outline"
          theme="dark"
          data-touch-trigger
          onClick={() => setSearchOpen(true)}
        >
          Open context menu
        </Button>
        <ContextMenu open={searchOpen} x={160} y={140} onClose={() => setSearchOpen(false)}>
          <ContextMenuItem onClick={() => { setPick('Ctx'); setSearchOpen(false); }}>Context item</ContextMenuItem>
          <DropdownSubmenu id="ctx-sub" label="Nested…" width="min-w-[180px]!" touchPresentation={presentation}>
            <ContextMenuItem onClick={() => { setPick('Ctx nested'); setSearchOpen(false); }}>Ctx nested</ContextMenuItem>
          </DropdownSubmenu>
        </ContextMenu>
      </TouchCase>

      <TouchCase id="search-menu" label="SearchMenu" hint="Tap 1 expands; typing filters; Clear is a tap-1 action." state={`query: ${''}`}>
        <SearchMenu
          mode="expandable"
          triggerLabel="Search items"
          placeholder="Search…"
          items={[
            { id: 'a', label: 'Alpha', group: 'g1' },
            { id: 'b', label: 'Bravo', group: 'g1' },
            { id: 'c', label: 'Charlie', group: 'g2' },
          ]}
          groups={[{ key: 'g1', label: 'Group one' }, { key: 'g2', label: 'Group two' }]}
          openOnFocus
          panelWidth={240}
          onSelect={(item) => setPick(item.label)}
        />
        <span className="text-[10px] text-zinc-500">picked: {pick}</span>
      </TouchCase>

      <TouchCase id="picker-field" label="PickerField" hint="Tap 1 opens the panel; rows toggle on tap 1; hero commits." state={`pick: ${pick}`}>
        <PickerField
          mode="single"
          appearance="button"
          values={[]}
          items={[{ id: '1', label: 'One' }, { id: '2', label: 'Two' }, { id: '3', label: 'Three' }]}
          onChange={(v) => setPick(v[0] ?? '—')}
          placeholder="Pick one"
        />
      </TouchCase>
    </>
  );
}

function FormCases() {
  const [seg, setSeg] = useState('a');
  const [check, setCheck] = useState(false);
  const [list, setList] = useState<(string | number)[]>(['a']);
  const [radio, setRadio] = useState('one');
  const [n, setN] = useState(12);
  const [sel, setSel] = useState(true);
  const [float, setFloat] = useState(false);
  return (
    <>
      <TouchCase id="seg" label="Seg" hint="ONE TAP: a segment selects immediately (plain control)." state={`value: ${seg}`}>
        <Seg
          options={[{ v: 'a', l: 'Strips' }, { v: 'b', l: 'Events' }]}
          value={seg}
          onChange={setSeg}
          theme="dark"
          variant="track"
        />
      </TouchCase>

      <TouchCase id="checkbox" label="Checkbox / Checklist / RadioList" hint="ONE TAP toggles; the row label is part of the target." state={`check: ${check} · list: ${list.join(',')} · radio: ${radio}`}>
        <Checkbox checked={check} onChange={setCheck} label="Checkbox" />
        <Checklist
          items={[{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }]}
          selected={list}
          onToggle={(id) => setList((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])}
        />
        <RadioList items={[{ id: 'one', label: 'One' }, { id: 'two', label: 'Two' }]} value={radio} onChange={setRadio} />
      </TouchCase>

      <TouchCase id="number-input" label="NumberInput" hint="ONE TAP per chevron step (a pointerdown preventDefault used to eat it)." state={`value: ${n}`}>
        <div className="rounded-lg p-2" style={{ background: '#18181b' }}>
          <NumberInput value={n} min={0} max={24} fallback={8} onCommit={setN} ariaLabel="Touch audit number" theme="dark" />
        </div>
      </TouchCase>

      <TouchCase id="selection" label="SelectionCheck / SelectionFooter" hint="ONE TAP toggles the check; the footer hero commits." state={`checked: ${sel}`}>
        <button
          type="button"
          data-touch-selection-row
          onClick={() => setSel((s) => !s)}
          className="flex items-center gap-2 rounded border border-zinc-700 px-2 py-1 text-xs text-zinc-200"
        >
          <SelectionCheck checked={sel} />
          Row
        </button>
        <SelectionFooter count={sel ? 1 : 0} onClear={() => setSel(false)} hero={{ label: 'Apply', onClick: () => setSel(true) }} theme="dark" />
      </TouchCase>

      <TouchCase id="floating-toggle" label="FloatingToggle" hint="ONE TAP toggles the device mode." state={`active: ${String(float)}`}>
        <FloatingToggle active={float} onClick={() => setFloat((s) => !s)} style={{ position: 'static' }} aria-label="Toggle demo">
          <Pencil className="h-4 w-4" />
        </FloatingToggle>
      </TouchCase>

      <TouchCase id="press-hover" label="Press-to-reveal row" hint="MANUAL on device: rest a finger on the row — its Edit action appears while pressed; release still fires the row click (one release, no two-tap)." state={`row clicks: ${String(float)}`}>
        <div
          data-touch-press-row
          role="button"
          tabIndex={0}
          onClick={() => setFloat((v) => !v)}
          className="group flex w-full items-center justify-between gap-2 rounded border border-zinc-700 px-3 py-2 text-xs text-zinc-200 active:bg-zinc-800"
        >
          <span>Touch and hold this row</span>
          <button
            type="button"
            className="hover-reveal rounded bg-zinc-700 px-2 py-1 text-[10px] text-zinc-100"
            onClick={(e) => { e.stopPropagation(); setFloat(true); }}
          >
            Edit
          </button>
        </div>
      </TouchCase>
    </>
  );
}

function OverlayCases() {
  const [modalOpen, setModalOpen] = useState(false);
  const [morph, setMorph] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [morphSearch, setMorphSearch] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [tab, setTab] = useState<'first' | 'second'>('first');
  const dialog = useDialog();
  return (
    <>
      <TouchCase id="modal" label="Modal + footer" hint="Tap 1 opens; the footer hero and X close on tap 1." state={`open: ${modalOpen}`}>
        <Button variant="outline" theme="dark" data-touch-trigger onClick={() => setModalOpen(true)}>Open modal</Button>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Touch audit modal" theme="dark">
          <div className="p-4 text-xs text-zinc-300">A modal is a plain surface — every button acts on tap 1.</div>
          <ModalFooter>
            <ModalFooterButton variant="ghost" onClick={() => setModalOpen(false)}>Cancel</ModalFooterButton>
            <ModalFooterButton onClick={() => setModalOpen(false)}>Save</ModalFooterButton>
          </ModalFooter>
        </Modal>
      </TouchCase>

      <TouchCase id="dialog" label="Dialog (useDialog)" hint="Tap 1 confirms; Enter is the hero, Esc cancels." state={`confirmed: ${confirmed}`}>
        <Button
          variant="outline"
          theme="dark"
          onClick={async () => {
            const ok = await dialog.confirm({ title: 'Touch audit', message: 'Tap Confirm.', confirmLabel: 'Confirm' });
            setConfirmed(ok);
          }}
        >
          Confirm…
        </Button>
      </TouchCase>

      <TouchCase id="tooltip" label="Tooltip" hint="Tap 1 reveals; a tap ANYWHERE ELSE clears it (never stuck)." state={`confirmed: ${confirmed}`}>
        <Tooltip content="Revealed by tap 1">
          <button type="button" data-touch-trigger className="rounded border border-dashed border-zinc-500 px-2 py-1 text-xs text-zinc-300">
            Reveal tooltip
          </button>
        </Tooltip>
      </TouchCase>

      <TouchCase id="morph-action" label="MorphActionField" hint="Tap 1 expands the field; Check/X act on tap 1." state={`submitted: ${submitted}`}>
        <MorphActionField
          triggerLabel="Add item"
          value={morph}
          onChange={setMorph}
          onSubmit={(v) => setSubmitted(v)}
          onCancel={() => setMorph('')}
        />
      </TouchCase>

      <TouchCase id="morph-search" label="MorphSearchField" hint="Tap 1 expands; outside tap cancels; the clear action works on tap 1." state={`value: ${morphSearch}`}>
        <MorphSearchField
          triggerLabel="Filter"
          value={morphSearch}
          onChange={setMorphSearch}
          placeholder="Filter…"
        />
      </TouchCase>

      <TouchCase id="tabs" label="TabFace tabs" hint="ONE TAP selects a tab; a collapsed label reveals on tap 1 and persists." state={`active: ${tab}`}>
        <div className="flex items-center gap-1">
          <Button variant="tab" theme="dark" active={tab === 'first'} icon={<Plus className="h-3.5 w-3.5" />} collapse iconWithLabel={false} onClick={() => setTab('first')}>First</Button>
          <Button variant="tab" theme="dark" active={tab === 'second'} icon={<ChevronRight className="h-3.5 w-3.5" />} collapse iconWithLabel={false} onClick={() => setTab('second')}>Second</Button>
        </div>
      </TouchCase>
    </>
  );
}

function RichTextCase() {
  const editorRef = useRef<RichTextEditorHandle>(null);
  const [value, setValue] = useState('Select all and tap B.');
  const [active, setActive] = useState<RichTextState>(RICH_TEXT_STATE_IDLE);
  return (
    <TouchCase id="rich-text" label="RichTextEditor / FormatToolbar" hint="ONE TAP applies bold (formatting buttons keep the selection without eating the tap)." state={`bold: ${active.bold ? 'on' : 'off'}`}>
      <FormatToolbar editorRef={editorRef} disabled={false} active={active} />
      <RichTextEditor ref={editorRef} value={value} onChange={setValue} onStateChange={setActive} className="min-h-16 text-xs" />
    </TouchCase>
  );
}

export function TouchAuditSection() {
  return (
    <>
      <DemoCard
        label="Touch matrix"
        hint="Every primitive at phone size. Each case names its tap model: a plain control acts on tap 1; hover-discovered chrome reveals on tap 1 and acts on tap 2. The `touch` Playwright project drives the same ids."
      >
        <MenuCases />
        <FormCases />
        <OverlayCases />
        <RichTextCase />
      </DemoCard>
    </>
  );
}


/** Full-page route (#touch): the matrix leaves the showroom's section list so
    its extra selection footer / menu triggers never collide with the other
    sections' unscoped spec locators. */
export function TouchAuditPage({ onExit }: { onExit: () => void }) {
  return (
    <div className="pg-main" style={{ margin: '0 auto', padding: '18px 16px 60px', maxWidth: 900 }}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Foundations · touch</div>
          <h1 className="text-xl font-semibold text-zinc-100">Touch audit matrix</h1>
          <p className="mt-1 max-w-[60ch] text-xs leading-relaxed text-zinc-500">
            Every primitive at phone size, one case each, with the tap model it promises. Run under the
            iPhone/iPad WebKit projects — the matrix IS the checklist.
          </p>
        </div>
        <Button variant="outline" theme="dark" onClick={onExit}>Back to the zoo</Button>
      </div>
      <TouchAuditSection />
    </div>
  );
}
