import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  Button, NumberInput, PickerField, Seg, inputCls, useInputSize,
  type PickerItem,
} from '../../../src/index';
import { DemoCard } from '../shell/chrome';

/* Sizing audit — the canonical control metrics, MEASURED live from the DOM.
   Every row prints its own height + corner radius, so a drift shows up here
   before it reaches the app. Canonical scale:
     · radius  = var(--ui-radius-btn) 6px for inputs, number box, buttons, Seg
     · height  = 30px for EVERY control (button, input md/sm, number box, Seg
                 segment, picker trigger)
*/

const ITEMS: PickerItem[] = [
  { id: 'camera', label: 'Camera' },
  { id: 'grip', label: 'Grip' },
  { id: 'sound', label: 'Sound' },
];

function MeasureRow({
  label, expected, selector = 'input, button', children,
}: {
  label: string;
  expected: string;
  selector?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [m, setM] = useState<{ h: number; r: string } | null>(null);
  useLayoutEffect(() => {
    const el = ref.current?.querySelector(selector) as HTMLElement | null;
    if (!el) return;
    const s = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const next = { h: Math.round(r.height * 10) / 10, r: s.borderRadius.split(' ')[0] };
    /* Same value → same object: a fresh object here would re-render forever
       (the effect runs after every render). */
    setM(prev => (prev && prev.h === next.h && prev.r === next.r ? prev : next));
  });
  const [expectedH, expectedR] = expected.split(' / ');
  const ok = !!m && `${m.h}px` === expectedH && m.r === expectedR;
  return (
    <div className="pg-size-row" ref={ref} data-size-row={label}>
      <span className="label pg-size-label">{label}</span>
      <div className="pg-size-control">{children}</div>
      <span className={`pg-size-value ${ok ? '' : 'pg-size-drift'}`} data-size-value={label}>
        {m ? `${m.h}px · radius ${m.r}` : '…'}
      </span>
      <span className="pg-size-expected">{expected}</span>
    </div>
  );
}

function SizingDemos() {
  const inputSize = useInputSize();
  const [seg, setSeg] = useState('a');
  const [pick, setPick] = useState<string[]>(['camera']);
  const [multi, setMulti] = useState<string[]>(['camera', 'grip']);
  const [num, setNum] = useState(8);

  return (
    <div className="pg-stack" data-testid="sizing-demo" style={{ maxWidth: 760 }}>
      <div className="label" style={{ fontWeight: 600 }}>Inputs</div>
      <MeasureRow label="Text input — md (form)" expected="30px / 6px">
        <input className={`${inputCls()} w-56`} placeholder="Form field…" />
      </MeasureRow>
      <MeasureRow label="Text input — proportional" expected="30px / 6px">
        <input style={inputSize} className="ui-input w-56" placeholder="Scales with coarse" />
      </MeasureRow>
      <MeasureRow label="Text input — sm" expected="30px / 6px">
        <input className={`${inputCls('sm')} w-56`} placeholder="Compact chrome…" />
      </MeasureRow>
      <MeasureRow label="Text input — borderless" expected="30px / 6px">
        <input className={`${inputCls()} ui-input-ghost w-56`} defaultValue="Reads as text until touched" />
      </MeasureRow>

      <div className="label" style={{ fontWeight: 600, marginTop: 6 }}>Buttons</div>
      <MeasureRow label="Button — subtle" expected="30px / 6px">
        <Button variant="subtle">Subtle</Button>
      </MeasureRow>
      <MeasureRow label="Button — outline" expected="30px / 6px">
        <Button variant="outline">Outline</Button>
      </MeasureRow>
      <MeasureRow label="Button — primary" expected="30px / 6px">
        <Button variant="primary">Primary</Button>
      </MeasureRow>
      <MeasureRow label="Button — danger-ghost" expected="30px / 6px">
        <Button variant="danger-ghost">Delete</Button>
      </MeasureRow>
      <MeasureRow label="Button — minimal" expected="30px / 6px">
        <Button variant="outline" size="minimal">Browse</Button>
      </MeasureRow>

      <div className="label" style={{ fontWeight: 600, marginTop: 6 }}>Numbers</div>
      <MeasureRow label="Number box" expected="30px / 6px" selector=".ui-number-box">
        <NumberInput value={num} min={0} max={48} fallback={8} onCommit={setNum} ariaLabel="Size audit number" />
      </MeasureRow>
      <MeasureRow label="Number box — read only" expected="30px / 6px" selector=".ui-number-box">
        <NumberInput value={12} onCommit={() => {}} readOnly ariaLabel="Read-only number" />
      </MeasureRow>

      <div className="label" style={{ fontWeight: 600, marginTop: 6 }}>Segmented</div>
      <MeasureRow label="Seg — track (TOTAL)" expected="30px / 6px" selector="div.inline-flex">
        <Seg
          value={seg}
          options={[{ v: 'a', l: 'One' }, { v: 'b', l: 'Two' }, { v: 'c', l: 'Three' }]}
          onChange={setSeg}
          variant="track"
        />
      </MeasureRow>
      <MeasureRow label="Seg — track segment" expected="24px / 4px" selector="button">
        <Seg
          value={seg}
          options={[{ v: 'a', l: 'One' }, { v: 'b', l: 'Two' }, { v: 'c', l: 'Three' }]}
          onChange={setSeg}
          variant="track"
        />
      </MeasureRow>
      <MeasureRow label="Seg — dense (TOTAL)" expected="26px / 6px" selector="div.inline-flex">
        <Seg
          value={seg}
          options={[{ v: 'a', l: 'One' }, { v: 'b', l: 'Two' }]}
          onChange={setSeg}
          variant="track"
          dense
        />
      </MeasureRow>
      <MeasureRow label="Seg — dense segment" expected="20px / 4px" selector="button">
        <Seg
          value={seg}
          options={[{ v: 'a', l: 'One' }, { v: 'b', l: 'Two' }]}
          onChange={setSeg}
          variant="track"
          dense
        />
      </MeasureRow>
      <MeasureRow label="Seg — chrome (container)" expected="30px / 6px" selector="div.overflow-hidden">
        <Seg
          value={seg}
          options={[{ v: 'a', l: 'One' }, { v: 'b', l: 'Two' }]}
          onChange={setSeg}
        />
      </MeasureRow>

      <div className="label" style={{ fontWeight: 600, marginTop: 6 }}>Pickers</div>
      <MeasureRow label="Picker — chip" expected="30px / 6px" selector="[data-picker-field]">
        <div className="w-56">
          <PickerField
            appearance="chip"
            mode="multiple"
            values={pick}
            onChange={setPick}
            items={ITEMS}
            placeholder="Pick…"
            panelWidth={220}
          />
        </div>
      </MeasureRow>
      <MeasureRow label="Picker — button" expected="30px / 6px">
        <PickerField
          appearance="button"
          mode="multiple"
          values={pick}
          onChange={setPick}
          items={ITEMS}
          placeholder="Pick…"
          panelWidth={220}
          className="w-56"
        />
      </MeasureRow>
      <MeasureRow label="Picker — morph (collapsed)" expected="30px / 6px" selector="button">
        <PickerField
          appearance="morph"
          mode="multiple"
          values={multi}
          onChange={setMulti}
          items={ITEMS}
          display="count"
          placeholder="Pick…"
          collapsedWidth={150}
          expandedWidth={240}
          panelWidth={220}
        />
      </MeasureRow>
      <MeasureRow label="Picker — button (count)" expected="30px / 6px">
        <PickerField
          appearance="button"
          mode="multiple"
          display="count"
          values={multi}
          onChange={setMulti}
          items={ITEMS}
          placeholder="Pick…"
          panelWidth={220}
          className="w-56"
        />
      </MeasureRow>
    </div>
  );
}

/* Side-by-side lineup — the same controls in real rows, so baseline/height
   drift is visible the way it is in the app (a toolbar, a form, a filter bar,
   a dark strip). */
function LineupDemos() {
  const inputSize = useInputSize();
  const [seg, setSeg] = useState('a');
  const [pick, setPick] = useState<string[]>(['camera']);
  const [num, setNum] = useState(8);
  const line = (label: string, children: React.ReactNode) => (
    <div className="pg-line-row" key={label}>
      <span className="label pg-size-label">{label}</span>
      <div className="pg-line-controls">{children}</div>
    </div>
  );
  return (
    <div className="pg-stack" data-testid="sizing-lineup">
      {line('Toolbar', <>
        <input className={`${inputCls('sm')} w-40`} placeholder="Search…" />
        <Button variant="subtle">Subtle</Button>
        <Button variant="outline">Outline</Button>
        <NumberInput value={num} min={0} max={48} fallback={8} onCommit={setNum} ariaLabel="Lineup number" />
        <Seg
          value={seg}
          options={[{ v: 'a', l: 'One' }, { v: 'b', l: 'Two' }]}
          onChange={setSeg}
          variant="track"
        />
        <PickerField
          appearance="button"
          mode="multiple"
          values={pick}
          onChange={setPick}
          items={ITEMS}
          display="count"
          placeholder="Roles…"
          panelWidth={220}
          className="w-40"
        />
      </>)}

      {line('Form', <>
        <input className={`${inputCls()} w-48`} placeholder="Form field…" />
        <input style={inputSize} className="ui-input w-40" placeholder="Proportional…" />
        <div className="w-40">
          <PickerField
            appearance="chip"
            mode="multiple"
            values={pick}
            onChange={setPick}
            items={ITEMS}
            placeholder="Pick…"
            panelWidth={220}
          />
        </div>
        <Button variant="primary">Save</Button>
        <Button variant="outline">Cancel</Button>
      </>)}

      {line('Filter', <>
        <input className={`${inputCls('sm')} ui-input-ghost w-40`} placeholder="Borderless…" />
        <Button variant="outline" size="minimal">Browse</Button>
        <Seg
          value={seg}
          options={[{ v: 'a', l: 'All' }, { v: 'b', l: 'Mine' }]}
          onChange={setSeg}
          variant="track"
        />
        <PickerField
          appearance="button"
          mode="single"
          values={pick}
          onChange={setPick}
          items={ITEMS}
          placeholder="Team…"
          panelWidth={220}
          className="w-36"
        />
      </>)}

      {line('Dark strip', <div className="pg-surface-dark flex flex-wrap items-center gap-2 rounded-lg bg-black/25 px-2 py-2">
        <input data-theme="dark" className={`${inputCls('sm')} w-36`} placeholder="Dark field…" />
        <Button variant="outline" theme="dark">Outline</Button>
        <Button variant="primary" theme="dark">Primary</Button>
        <Seg
          value={seg}
          options={[{ v: 'a', l: 'One' }, { v: 'b', l: 'Two' }]}
          onChange={setSeg}
          variant="track"
          theme="dark"
        />
      </div>)}
    </div>
  );
}

export function SizingSection() {
  const [view, setView] = useState<'list' | 'lineup'>('list');
  return (
    <DemoCard
      wide
      label="Control sizing audit"
      hint="Every common control, measured live: height · corner radius. Canonical = 30px and radius 6px for EVERY control. Nested boxes use R_inner = R_outer − padding (Seg: 6 − 2 = 4px). Red = drift. Switch to 'In a line' to see them aligned in real rows."
    >
      <div className="row" style={{ margin: '0 0 10px' }}>
        <Seg
          value={view}
          options={[{ v: 'list', l: 'Measured' }, { v: 'lineup', l: 'In a line' }]}
          onChange={v => setView(v as 'list' | 'lineup')}
          variant="track"
        />
      </div>
      {view === 'list' ? <SizingDemos /> : <LineupDemos />}
    </DemoCard>
  );
}
