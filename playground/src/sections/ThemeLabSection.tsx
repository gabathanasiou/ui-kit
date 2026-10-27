import React, { useState } from 'react';
import {
  Button, DropdownMenu, DropdownItem, Modal, ModalFooter, ModalFooterButton, Checkbox,
  Checklist, RadioList, DatePicker, Tooltip, DialogProvider, useDialog, CardSection,
  NumberInput, Seg, ThemeScope, ThemeProvider, inputCls,
} from '../../../src/index';
import { Palette } from 'lucide-react';
import { DemoCard } from '../shell/chrome';
import type { LabState } from '../shell/lab';

/* Theme lab (roadmap 302): one control pair (mode × accent) drives every token
   in the preview and the modal shell. Surface = neutral (accent suppressed) or
   accent (the project ladder). */

const LAB_MODES = ['light', 'dark'] as const;
const LAB_ACCENTS = ['zinc', 'blue', 'emerald'] as const;

function LabDialogDemo() {
  const dialog = useDialog();
  return (
    <Button
      data-testid="theme-lab-dialog"
      onClick={() => { void dialog.confirm({ title: 'Themed dialog', message: 'This confirm inherits the modal surface.' }); }}
    >
      Show themed dialog
    </Button>
  );
}

export function ThemeLabSection({ mode, accent, surface, setMode, setAccent, setSurface }: LabState) {
  const [open, setOpen] = useState(false);
  const [pick, setPick] = useState('Hold');
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const [modalMenuOpen, setModalMenuOpen] = useState(false);
  const [date, setDate] = useState<string[]>(['2026-11-03', '2026-11-04']);
  const [checked, setChecked] = useState(true);
  const [seg, setSeg] = useState('details');
  const [legoSeg, setLegoSeg] = useState('a');
  const [num, setNum] = useState(8);
  const [cardOpen, setCardOpen] = useState(true);
  const [cast, setCast] = useState<string[]>(['1']);
  const [unit, setUnit] = useState<string | number>('main');

  const castItems = [
    { id: '1', label: '1. GEORGE', secondary: 'INT. BEDROOM' },
    { id: '2', label: '2. MARY', secondary: 'INT. LOUNGE' },
    { id: '3', label: '3. CLARENCE', secondary: 'EXT. BRIDGE' },
  ];
  const toggleCast = (id: string | number) =>
    setCast(c => c.includes(String(id)) ? c.filter(x => x !== String(id)) : [...c, String(id)]);

  const typeMenu = (
    <DropdownMenu
      open={menuOpen}
      onOpenChange={setMenuOpen}
      width="w-44"
      trigger={<Button data-testid="theme-lab-menu-trigger">Type: {pick}</Button>}
    >
      {['Hold', 'Travel', 'Prep'].map(v => (
        <DropdownItem key={v} selected={pick === v} onClick={() => { setPick(v); setMenuOpen(false); }}>{v}</DropdownItem>
      ))}
    </DropdownMenu>
  );

  return (
    <>
      <DemoCard label="Axes" wide hint="Mode × accent set the token scope; surface picks the neutral shell or the project accent ladder.">
        <div className="pg-controls">
          <span className="pg-control-label">Mode</span>
          {LAB_MODES.map(m => (
            <Button
              key={m}
              data-testid={`theme-mode-${m}`}
              variant={mode === m ? 'primary' : 'subtle'}
              onClick={() => setMode(m)}
            >{m}</Button>
          ))}

          <span className="pg-control-label">Accent</span>
          {LAB_ACCENTS.map(a => (
            <Button
              key={a}
              data-testid={`theme-accent-${a}`}
              variant={accent === a ? 'primary' : 'subtle'}
              cloud={a === 'emerald' ? 'emerald' : a === 'blue'}
              onClick={() => setAccent(a)}
            >{a === 'zinc' ? 'none (zinc)' : a}</Button>
          ))}

          <span className="pg-control-label">Lego override</span>
          <ThemeProvider mode="light" accent="blue">
            <Seg
              value={seg}
              options={[{ v: 'details', l: 'Details' }, { v: 'times', l: 'Times' }]}
              onChange={setSeg}
              variant="track"
            />
          </ThemeProvider>

          <span className="pg-control-label">Surface</span>
          <Button
            data-testid="theme-chrome-toggle"
            variant={surface === 'accent' ? 'primary' : 'subtle'}
            onClick={() => setSurface(s => s === 'accent' ? 'neutral' : 'accent')}
          >{surface}</Button>

          <span className="pg-control-spacer" />

          <Button data-testid="theme-lab-open" variant="primary" onClick={() => setOpen(true)}>Open themed modal</Button>
        </div>
      </DemoCard>

      <DemoCard
        wide
        label={<span>Preview — {mode} / {accent} / {surface}</span>}
        hint="The header wears the project chrome; the body and wells follow it softly. Open a menu from the header vs from the body to see the chrome/surface split."
      >
        <ThemeScope mode={mode} accent={accent} surface={surface} className="rounded-xl overflow-hidden border border-[color:var(--ui-modal-border)] shadow-xl" style={{ background: 'var(--ui-modal-body-bg)', color: 'var(--ui-modal-body-text)' }}>
          <div
            data-testid="theme-lab-preview-header"
            className="flex items-center justify-between gap-2 px-3 py-2 border-b"
            style={{
              background: 'var(--ui-modal-header-bg)',
              borderColor: 'var(--ui-modal-header-border)',
              color: 'var(--ui-modal-title)',
            }}
          >
            <span className="text-xs font-bold">THEME LAB · {mode} / {accent} / {surface}</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] opacity-60">the app header colour follows the project</span>
              {/* Chrome context: a menu opened from the coloured header is FULLY themed. */}
              <ThemeScope mode="dark" accent={accent} surface="neutral" context="chrome">
                <DropdownMenu
                  open={headerMenuOpen}
                  onOpenChange={setHeaderMenuOpen}
                  width="w-48"
                  trigger={<Button variant="tab-header" data-testid="theme-lab-header-menu-trigger">Header menu</Button>}
                >
                  {['Hold', 'Travel', 'Prep'].map(v => (
                    <DropdownItem key={v} selected={pick === v} onClick={() => { setPick(v); setHeaderMenuOpen(false); }}>{v}</DropdownItem>
                  ))}
                </DropdownMenu>
              </ThemeScope>
            </div>
          </div>

          <div className="grid gap-3 p-3 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <Button>Subtle</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="primary">Primary</Button>
                <Button variant="danger-ghost">Danger</Button>
                <Tooltip content="Tooltips portal — they carry the theme scope themselves">
                  <Button iconOnly aria-label="About this theme" data-testid="theme-lab-tooltip"><Palette size={14} /></Button>
                </Tooltip>
              </div>
              <Seg
                value={seg}
                options={[
                  { v: 'details', l: 'Details' },
                  { v: 'times', l: 'Times' },
                  { v: 'crew', l: 'Crew' },
                ]}
                onChange={setSeg}
                variant="track"
              />
              <label className="flex items-center gap-2 text-xs">
                <Checkbox checked={checked} onChange={setChecked} label="Send the call sheet to cast" />
              </label>
              <div className="flex items-center gap-2 text-xs">
                <span>Day length</span>
                <NumberInput value={num} min={1} max={24} fallback={8} onCommit={setNum} step={1} ariaLabel="Day length" />
                <span>hours</span>
              </div>
              {typeMenu}
            </div>

            <div className="space-y-3">
              <DatePicker selected={date} onChange={setDate} showChips />
              <Checklist title="Cast" items={castItems} selected={cast} onToggle={toggleCast} />
              <RadioList
                title="Unit"
                items={[{ id: 'main', label: 'Main unit' }, { id: 'second', label: 'Second unit' }]}
                value={unit}
                onChange={setUnit}
              />
            </div>
          </div>

          <Modal
            open={open}
            onClose={() => setOpen(false)}
            title={`Day 4 — ${surface === 'accent' ? `${accent} accent` : 'neutral'} surface`}
            icon={<Palette className="w-4 h-4" />}
            width="max-w-2xl"
            theme={mode}
            accent={accent}
            surface={surface}
            footer={(
              <ModalFooter>
                <ModalFooterButton variant="danger" className="mr-auto" onClick={() => setOpen(false)}>Delete day</ModalFooterButton>
                <ModalFooterButton variant="ghost" onClick={() => setOpen(false)}>Cancel</ModalFooterButton>
                <ModalFooterButton tone={surface === 'accent' && accent !== 'zinc' ? 'accent' : 'zinc'} onClick={() => setOpen(false)}>Save day</ModalFooterButton>
              </ModalFooter>
            )}
          >
            <div className="grid gap-3 p-4 md:grid-cols-2" data-testid="theme-lab-modal-body">
              <div className="space-y-3">
                <CardSection title="Day details" count="2" collapsed={!cardOpen} onToggle={() => setCardOpen(o => !o)}>
                  <label className="block text-xs">
                    Location
                    <input className={`w-full mt-1 ${inputCls()}`} defaultValue="Stage 5 — Riverside" />
                  </label>
                  <label className="block text-xs">
                    Notes
                    <input className={`w-full mt-1 ${inputCls()}`} placeholder="Weather cover, parking…" />
                  </label>
                  <div className="flex items-center justify-between text-xs">
                    <span>Day length</span>
                    <NumberInput value={num} min={1} max={24} fallback={8} onCommit={setNum} step={1} ariaLabel="Day length" />
                  </div>
                </CardSection>

                <div className="flex flex-wrap gap-2">
                  <Button variant="primary">Add scene</Button>
                  <Button>Duplicate</Button>
                  <Button variant="danger-ghost">Clear</Button>
                  <Tooltip content="The header wears the project chrome; the body and wells follow it softly">
                    <Button iconOnly aria-label="Why this looks like this"><Palette size={14} /></Button>
                  </Tooltip>
                </div>

                <DropdownMenu
                  open={modalMenuOpen}
                  onOpenChange={setModalMenuOpen}
                  width="w-48"
                  trigger={<Button data-testid="theme-lab-modal-menu-trigger">Event type: {pick}</Button>}
                >
                  {['Hold', 'Travel', 'Prep'].map(v => (
                    <DropdownItem key={v} selected={pick === v} onClick={() => { setPick(v); setModalMenuOpen(false); }}>{v}</DropdownItem>
                  ))}
                </DropdownMenu>

                <DialogProvider>
                  <LabDialogDemo />
                </DialogProvider>

                <div className="space-y-1">
                  <div className="text-[10px] uppercase tracking-wider text-[color:var(--ui-text-muted)]">States (surface row tokens)</div>
                  <div className="flex flex-wrap items-center gap-1 text-[10px]">
                    <span className="ui-item px-2 py-1">rest</span>
                    <span className="ui-item px-2 py-1" style={{ background: 'var(--ui-item-hover-bg)' }}>hover</span>
                    <span className="ui-item ui-item-selected px-2 py-1">selected</span>
                    <span className="ui-item px-2 py-1 opacity-30">disabled</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div data-testid="theme-lab-modal-lego" className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider text-[color:var(--ui-text-muted)]">Lego</span>
                  <ThemeProvider mode={mode} accent="blue">
                    <Seg
                      value={legoSeg}
                      options={[{ v: 'a', l: 'A' }, { v: 'b', l: 'B' }]}
                      onChange={setLegoSeg}
                      variant="track"
                    />
                  </ThemeProvider>
                </div>
                <div data-testid="theme-lab-main-seg">
                  <Seg
                    value={seg}
                    options={[{ v: 'details', l: 'Details' }, { v: 'times', l: 'Times' }, { v: 'crew', l: 'Crew' }]}
                    onChange={setSeg}
                    variant="track"
                  />
                </div>
                <DatePicker selected={date} onChange={setDate} showChips />
                <Checklist title="Cast" items={castItems} selected={cast} onToggle={toggleCast} />
              </div>
            </div>
          </Modal>
        </ThemeScope>
      </DemoCard>
    </>
  );
}
