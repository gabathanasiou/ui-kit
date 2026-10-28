import React, { useState } from 'react';
import {
  Checkbox, Checklist, RadioList, DatePicker, NumberInput, Seg, FloatingToggle, Button,
  inputCls, useInputSize,
} from '../../../src/index';
import { CalendarDays, List, Table2 } from 'lucide-react';
import { DemoCard } from '../shell/chrome';

/* Inputs & form controls: selection rows, the date picker, the numeric box in
   every mode, and the segmented control / floating toggle recipes. */

function SelectionDemos() {
  const [checked, setChecked] = useState(true);
  const [list, setList] = useState<string[]>(['a']);
  const [radio, setRadio] = useState('one');
  const [plain, setPlain] = useState(true);
  const [danger, setDanger] = useState(true);
  return (
    <>
      <div className="row" data-testid="selection-demo">
        <Checkbox checked={checked} onChange={setChecked} label="Checkbox (pill)" />
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
      <div className="row" data-testid="checkbox-states">
        <Checkbox variant="plain" checked={plain} onChange={setPlain} label="Plain" />
        <Checkbox tone="danger" checked={danger} onChange={setDanger} label="Danger tone" />
        <Checkbox checked onChange={() => {}} disabled label="Disabled" />
        <Checkbox block checked onChange={() => {}} label="Block (full width)" />
      </div>
      <div className="row" data-testid="checklist-trailing">
        <div className="label">Checklist — trailing checks + per-row dataProps</div>
        <Checklist
          checkPosition="trailing"
          items={[
            { id: 'p1', label: 'Ada', leading: <span style={{ display: 'inline-block', width: 56 }}>Driver</span>, dataProps: { 'data-demo-person': 'p1' } },
            { id: 'p2', label: 'Grace', leading: <span style={{ display: 'inline-block', width: 56 }}>Chaperone</span>, dataProps: { 'data-demo-person': 'p2' } },
          ]}
          selected={list}
          onToggle={(id) => setList(prev => prev.includes(String(id)) ? prev.filter(x => x !== String(id)) : [...prev, String(id)])}
        />
      </div>
    </>
  );
}

function DatePickerDemo() {
  const [dates, setDates] = useState<string[]>([]);
  return (
    <div className="row">
      <div className="label">DatePicker (multi) — click the month/year header to jump.</div>
      <DatePicker selected={dates} onChange={setDates} />
    </div>
  );
}

function NumberInputDemo() {
  const [n, setN] = useState(12);
  const [mixed, setMixed] = useState<number | undefined>(undefined);
  return (
    <>
      <div className="row" data-testid="number-input-demo">
        <div className="label">NumberInput — dark (default box)</div>
        <div className="rounded-lg p-3" style={{ background: '#18181b' }}>
          <NumberInput
            value={n}
            min={0}
            max={24}
            fallback={8}
            onCommit={setN}
            ariaLabel="Demo number"
            theme="dark"
          />
        </div>
        <span data-testid="number-input-value">{n}</span>
      </div>
      <div className="row" data-testid="number-input-light">
        <div className="label">NumberInput — light</div>
        <NumberInput value={n} min={0} max={24} fallback={8} onCommit={setN} ariaLabel="Light number" theme="light" />
        <NumberInput value={mixed} min={6} max={96} fallback={10} onCommit={setMixed} ariaLabel="Mixed number" placeholder="Mixed" theme="light" />
      </div>
      <div className="row" data-testid="number-input-toolbar">
        <div className="label">NumberInput — consumer classes (dark toolbar)</div>
        <div className="flex items-center gap-1.5 rounded-lg px-3 py-2" style={{ background: '#18181b' }}>
          <NumberInput value={n} min={0} max={24} fallback={8} onCommit={setN} ariaLabel="Toolbar number" className="ui-input w-14 h-7 text-center text-[11px] text-zinc-300" />
          <NumberInput value={24} min={0} max={24} fallback={8} onCommit={() => {}} ariaLabel="Toolbar number at max" className="ui-input w-14 h-7 text-center text-[11px] text-zinc-300" />
        </div>
      </div>
    </>
  );
}

function NumberInputOptions() {
  const [n, setN] = useState(12);
  return (
    <div className="row" data-testid="number-input-options">
      <div className="label">step · disabled · read-only · placeholder</div>
      <NumberInput value={n} min={0} max={60} step={5} fallback={10} onCommit={setN} ariaLabel="Step five number" />
      <NumberInput value={12} min={0} max={24} fallback={8} onCommit={() => {}} disabled ariaLabel="Disabled number" />
      <NumberInput value={18} min={0} max={24} fallback={8} onCommit={() => {}} readOnly ariaLabel="Read-only number" />
      <NumberInput value={undefined} min={0} max={24} fallback={8} onCommit={() => {}} placeholder="Mixed" ariaLabel="Empty number" />
    </div>
  );
}

function SegTrackDemos() {
  const [tab, setTab] = useState('stages');
  const [view, setView] = useState('strips');
  const [swapView, setSwapView] = useState('strips');
  const [peopleTab, setPeopleTab] = useState('people');
  return (
    <>
      <div className="row" data-testid="seg-track-dark">
        <div className="label">Seg variant=&quot;track&quot; — dark modal (sliding pill)</div>
        <div className="rounded-lg p-3" style={{ background: '#18181b' }}>
          <Seg
            variant="track"
            theme="dark"
            stretch
            value={tab}
            ariaLabel="Call times sections"
            options={[
              { v: 'stages', l: 'Call stages' },
              { v: 'categories', l: 'Category defaults' },
              { v: 'precalls', l: 'Department precalls' },
              { v: 'crew', l: 'Usual crew' },
            ]}
            onChange={setTab}
          />
        </div>
      </div>
      <div className="row" data-testid="seg-tablist">
        <div className="label">Seg tablist semantics (role=tablist/tab + aria-selected)</div>
        <div className="rounded-lg p-3" style={{ background: '#18181b' }}>
          <Seg
            variant="track"
            theme="dark"
            tablist
            ariaLabel="Crew links view"
            value={peopleTab}
            options={[
              { v: 'people', l: 'People' },
              { v: 'positions', l: 'Positions' },
            ]}
            onChange={setPeopleTab}
          />
        </div>
      </div>
      <div className="row pg-surface-light" data-testid="seg-track-light">
        <div className="label">Seg variant=&quot;track&quot; — light toolbar</div>
        <Seg
          variant="track"
          theme="light"
          value={view}
          ariaLabel="Calendar view"
          options={[
            { v: 'strips', l: 'Strips' },
            { v: 'events', l: 'Events' },
          ]}
          onChange={setView}
        />
        <Button theme="light" variant="subtle" active={view === 'events'} data-testid="seg-light-toggle">Toggle mirror</Button>
      </div>
      <div className="row pg-surface-light" data-testid="seg-icon-collapse">
        <div className="label">Seg variant=&quot;track&quot; — icon collapse (label reveals on hover; the selected segment stays open)</div>
        <Seg
          variant="track"
          theme="light"
          iconCollapse
          value={view}
          options={[
            { v: 'strips', l: 'Strips', icon: <List className="w-3.5 h-3.5" />, ariaLabel: 'Strips view' },
            { v: 'events', l: 'Events', icon: <CalendarDays className="w-3.5 h-3.5" />, ariaLabel: 'Events view' },
            { v: 'table', l: 'Table', icon: <Table2 className="w-3.5 h-3.5" />, ariaLabel: 'Table view' },
          ]}
          onChange={setView}
          ariaLabel="Icon collapse view"
        />
      </div>
      <div className="row pg-surface-light" data-testid="seg-icon-swap">
        <div className="label">Seg variant=&quot;track&quot; — icon swap (icon at rest; TEXT ONLY on hover/selected)</div>
        <Seg
          variant="track"
          theme="light"
          iconCollapse
          iconWithLabel={false}
          value={swapView}
          options={[
            { v: 'strips', l: 'Strips', icon: <List className="w-3.5 h-3.5" />, ariaLabel: 'Strips view' },
            { v: 'events', l: 'Events', icon: <CalendarDays className="w-3.5 h-3.5" />, ariaLabel: 'Events view' },
            { v: 'table', l: 'Table', icon: <Table2 className="w-3.5 h-3.5" />, ariaLabel: 'Table view' },
          ]}
          ariaLabel="Icon swap view"
          onChange={setSwapView}
        />
      </div>
      <div className="row pg-surface-light" data-testid="seg-track-blue">
        <div className="label">Seg variant=&quot;track&quot; — blue project chrome (Drive)</div>
        <Seg
          variant="track"
          theme="blue"
          value={view}
          ariaLabel="Blue project view"
          options={[
            { v: 'strips', l: 'Strips' },
            { v: 'events', l: 'Events' },
          ]}
          onChange={setView}
        />
        <Button variant="primary" cloud data-testid="seg-blue-primary">Blue primary</Button>
      </div>
      <div className="row pg-surface-light" data-testid="seg-track-emerald">
        <div className="label">Seg variant=&quot;track&quot; — emerald project chrome (shared)</div>
        <Seg
          variant="track"
          theme="emerald"
          value={view}
          ariaLabel="Shared project view"
          options={[
            { v: 'strips', l: 'Strips' },
            { v: 'events', l: 'Events' },
          ]}
          onChange={setView}
        />
        <Button variant="primary" cloud="emerald" data-testid="seg-emerald-primary">Emerald primary</Button>
      </div>
    </>
  );
}

function SegVariants() {
  const [chromeTab, setChromeTab] = useState('day');
  const [iconTab, setIconTab] = useState('list');
  const [denseTab, setDenseTab] = useState('a');
  return (
    <>
      <div className="row" data-testid="seg-chrome">
        <div className="label">Seg variant=&quot;chrome&quot; — joined editor cells (Reports Designer)</div>
        <Seg
          value={chromeTab}
          options={[{ v: 'day', l: 'Day' }, { v: 'week', l: 'Week' }, { v: 'month', l: 'Month' }]}
          onChange={setChromeTab}
        />
      </div>
      <div className="row" data-testid="seg-dense">
        <div className="label">dense — toolbar height</div>
        <Seg
          dense
          value={denseTab}
          options={[{ v: 'a', l: 'A' }, { v: 'b', l: 'B' }]}
          onChange={setDenseTab}
          ariaLabel="Dense segments"
        />
      </div>
      <div className="row" data-testid="seg-icons">
        <div className="label">icon-only segments (ariaLabel carries the name)</div>
        <Seg
          variant="track"
          value={iconTab}
          ariaLabel="Icon view"
          options={[
            { v: 'list', l: '', ariaLabel: 'List view', title: 'List', icon: <List className="w-3.5 h-3.5" /> },
            { v: 'table', l: '', ariaLabel: 'Table view', title: 'Table', icon: <Table2 className="w-3.5 h-3.5" /> },
            { v: 'calendar', l: '', ariaLabel: 'Calendar view', title: 'Calendar', icon: <CalendarDays className="w-3.5 h-3.5" /> },
          ]}
          onChange={setIconTab}
        />
      </div>
    </>
  );
}

function FloatingToggleDemo() {
  const [floatOn, setFloatOn] = useState(false);
  return (
    <div className="row" data-testid="floating-toggle-demo">
      <div className="label">FloatingToggle — idle / lit (shown inline)</div>
      <FloatingToggle
        active={floatOn}
        aria-pressed={floatOn}
        aria-label="Demo floating toggle"
        title="Demo floating toggle"
        style={{ position: 'static', width: 40, height: 40, borderRadius: 20 }}
        onClick={() => setFloatOn(v => !v)}
      >
        <span style={{ fontSize: 12 }}>{floatOn ? 'ON' : 'OFF'}</span>
      </FloatingToggle>
    </div>
  );
}

/* The kit's text-input recipe: `.ui-input` tokens + the proportional sizing
   helpers. Nothing to configure — this is what every modal/form field uses. */
function TextFieldDemos() {
  const [value, setValue] = useState('Stage 5 — Riverside');
  const size = useInputSize();
  return (
    <div className="pg-stack" data-testid="text-input-demo" style={{ maxWidth: 520 }}>
      <div>
        <span className="label">Text input — md (modal bodies, class recipe)</span>
        <input
          className={`w-full ${inputCls()}`}
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Type here…"
        />
      </div>
      <div>
        <span className="label">Text input — proportional (useInputSize, scales with the coarse slider)</span>
        <input style={size} className="w-full ui-input" defaultValue="Stage 5 — Riverside" />
      </div>
      <div>
        <span className="label">Text input — sm (compact chrome)</span>
        <input className={`w-full ${inputCls('sm')}`} defaultValue="Camera notes" />
      </div>
      <div>
        <span className="label">Level with a Button — md input + outline minimal button</span>
        <div className="row" style={{ margin: 0 }}>
          <input className={`${inputCls()} flex-1`} placeholder="Sits level with the button…" />
          <Button variant="outline" size="minimal">Browse</Button>
        </div>
      </div>
      <div>
        <span className="label">Borderless — `ui-input-ghost`: edge + fill appear on hover/focus</span>
        <input className={`w-full ${inputCls()} ui-input-ghost`} defaultValue="Reads as text until touched" />
      </div>
      <div>
        <span className="label">Disabled</span>
        <input className={`w-full ${inputCls()}`} value="Locked" disabled readOnly />
      </div>
    </div>
  );
}

export function InputsSection() {
  return (
    <>
      <DemoCard label="Text input" hint="The .ui-input recipe: md / proportional / sm, level with a Button, disabled.">
        <TextFieldDemos />
      </DemoCard>
      <DemoCard label="Selection controls" hint="Checkbox (pill / plain / danger / disabled / block), checklist (leading + trailing), radio list.">
        <SelectionDemos />
      </DemoCard>
      <DemoCard label="Date picker" hint="Multi-select with chips; the month/year header opens a grid for a two-click jump.">
        <DatePickerDemo />
      </DemoCard>
      <DemoCard label="Number box" hint="Typed draft, live clamp, Enter/blur, Escape; steppers, arrows and drag-scrub.">
        <NumberInputDemo />
      </DemoCard>
      <DemoCard label="Number options" hint="step, disabled, read-only and the empty/mixed placeholder.">
        <NumberInputOptions />
      </DemoCard>
      <DemoCard wide label="Seg — track" hint="The sliding-pill control: dark modal, tablist semantics, light toolbar, blue + emerald project chrome.">
        <SegTrackDemos />
      </DemoCard>
      <DemoCard label="Seg — chrome & dense" hint="Joined editor cells, dense toolbar height, icon-only segments.">
        <SegVariants />
      </DemoCard>
      <DemoCard label="Floating toggle" hint="The device-mode toggle: idle / lit / warn frames.">
        <FloatingToggleDemo />
      </DemoCard>
    </>
  );
}
