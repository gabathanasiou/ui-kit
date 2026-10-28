import React, { useState } from 'react';
import { Button, TAB_PILL, useSlidingPill } from '../../../src/index';
import { Bold, Check, Lock, Palette, Pencil, Plus, Search } from 'lucide-react';
import { DemoCard } from '../shell/chrome';

/* Buttons: every variant × theme, plus the states and shapes the app actually
   uses (pressed, icon-only, minimal, tab, header tab, cloud accents). */

const VARIANTS = ['subtle', 'primary', 'outline', 'danger-ghost'] as const;

function VariantGrid({ theme }: { theme: 'light' | 'dark' }) {
  return (
    <div className={`row pg-surface-${theme}`}>
      <div className="label">theme={theme}</div>
      {VARIANTS.map(v => (
        <React.Fragment key={v}>
          <Button theme={theme} variant={v} data-testid={`btn-${theme}-${v}`}>{v}</Button>
          <Button theme={theme} variant={v} disabled>disabled</Button>
        </React.Fragment>
      ))}
      {/* The icon face in the same grid: bare icon → hover expands the label
          (revealed, not always boxed) — every variant supports it. */}
      <Button
        theme={theme}
        variant="outline"
        icon={<Pencil className="w-3.5 h-3.5" />}
        collapse
        revealOnHover
        data-testid={`btn-${theme}-icon-expand`}
      >
        Edit
      </Button>
    </div>
  );
}

/** Tab recipes need the row's sliding fill — the button carries only the text
 *  colour (the app's PageToolbar/AppHeader pattern: `useSlidingPill` +
 *  `TAB_PILL`). A tab row without the pill leaves the active label invisible. */
function PillTabs({
  variant,
  theme,
  rowClass,
  labels,
}: {
  variant: 'tab' | 'tab-header';
  theme: 'light' | 'dark';
  rowClass: string;
  labels: string[];
}) {
  const [active, setActive] = useState(0);
  const rowRef = React.useRef<HTMLDivElement | null>(null);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const pill = useSlidingPill(rowRef, tabRefs, active);
  return (
    <div ref={rowRef} className={`relative inline-flex items-center gap-1 rounded px-1 py-0.5 ${rowClass}`}>
      {pill.style && (
        <span
          aria-hidden
          className={`absolute top-0 bottom-0 rounded pointer-events-none ${TAB_PILL[theme].plain} ${pill.motionClass}`}
          style={pill.style}
        />
      )}
      {labels.map((label, i) => (
        <Button
          key={label}
          ref={el => { tabRefs.current[i] = el; }}
          variant={variant}
          theme={theme}
          /* Plain tab pills: `TAB_PILL[theme].plain` is white on a dark bar /
             zinc-950 on a light bar. An accent tone would need the matching
             accent pill — that pairing is shown by the Seg palettes below. */
          cloud={false}
          active={active === i}
          className="relative z-10"
          onClick={() => setActive(i)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}

/* Icon toggle — the Schedule toolbar's Edit pattern: bare icon at rest, hover
   expands the label, the press LIGHTS it (the `active` fill) and collapses it
   back to the icon. The icon ROLLS to the next one (direction-aware: a return
   rolls back the way it came). Works with or without the expandable face. */
const TOGGLE_STATES = [
  { id: 'off', label: 'Edit', icon: <Pencil className="w-3.5 h-3.5" />, active: false },
  { id: 'editing', label: 'Editing', icon: <Check className="w-3.5 h-3.5" />, active: true },
  { id: 'locked', label: 'Locked', icon: <Lock className="w-3.5 h-3.5" />, active: true },
];

function ToggleIconButtonDemo() {
  const [editing, setEditing] = useState(false);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<'up' | 'down'>('up');
  const [bold, setBold] = useState(false);
  const state = TOGGLE_STATES[step];

  const advance = () => {
    const next = (step + 1) % TOGGLE_STATES.length;
    setDir(next > step ? 'up' : 'down');
    setStep(next);
  };

  return (
    <div className="pg-stack" data-testid="toggle-icon-button">
      <div className="row" style={{ margin: 0 }}>
        <Button
          variant="outline"
          icon={editing ? <Check className="w-3.5 h-3.5" /> : <Pencil className="w-3.5 h-3.5" />}
          collapse
          revealOnHover
          keepLabelOnActive={false}
          reserveLabel="Editing"
          iconRoll={editing ? 'up' : 'down'}
          active={editing}
          aria-label={editing ? 'Done editing' : 'Edit'}
          title={editing ? 'Done editing' : 'Edit'}
          onClick={() => setEditing(v => !v)}
          data-testid="toggle-icon-edit"
        >
          {editing ? 'Done' : 'Edit'}
        </Button>
        <span className="label" data-testid="toggle-icon-status" style={{ width: 'auto' }}>{editing ? 'on' : 'off'}</span>
      </div>

      <div className="row" style={{ margin: 0 }}>
        <Button
          variant="outline"
          icon={state.icon}
          collapse
          revealOnHover
          keepLabelOnActive={false}
          reserveLabel="Locked"
          iconRoll={dir}
          active={state.active}
          aria-label={`State: ${state.label}`}
          onClick={advance}
          data-testid="toggle-cycle-button"
        >
          {state.label}
        </Button>
        <span className="label" data-testid="toggle-cycle-status" style={{ width: 'auto' }}>{state.id}</span>
      </div>

      <div className="row" style={{ margin: 0 }}>
        {/* No expandable face needed: a plain labelled toggle… */}
        <Button variant="outline" active={bold} onClick={() => setBold(v => !v)} aria-label="Bold">
          Bold
        </Button>
        {/* …or a square icon-only toggle. */}
        <Button variant="subtle" iconOnly active={bold} onClick={() => setBold(v => !v)} aria-label="Bold" data-testid="toggle-icon-only">
          <Bold className="w-3.5 h-3.5" />
        </Button>
        <span className="label" style={{ width: 'auto' }}>{bold ? 'on' : 'off'}</span>
      </div>
    </div>
  );
}

export function ButtonsSection() {
  return (
    <>
      <DemoCard label="Light theme" hint="quiet · primary · outlined · destructive, enabled and disabled.">
        <VariantGrid theme="light" />
      </DemoCard>
      <DemoCard label="Dark theme" hint="The same set on the dark toolbar palette.">
        <VariantGrid theme="dark" />
      </DemoCard>
      <DemoCard label="Icon toggle" hint="Bare icon at rest → hover expands the label → press lights it and keeps the label (the Schedule Edit button).">
        <ToggleIconButtonDemo />
      </DemoCard>
      <DemoCard label="States & shapes" hint="Pressed tint, icon-only square, minimal (matches a text input), tabs with their sliding pill, and the blue / emerald project primaries.">
        <div className="row">
          <Button>Rest</Button>
          <Button active>Pressed</Button>
          <Button iconOnly aria-label="Add" title="Add"><Plus className="w-3.5 h-3.5" /></Button>
          <Button iconOnly aria-label="Theme" title="Theme"><Palette className="w-3.5 h-3.5" /></Button>
          <Button size="minimal">Minimal</Button>
          <Button variant="primary" cloud>Blue primary</Button>
          <Button variant="primary" cloud="emerald">Emerald primary</Button>
        </div>
        <div className="row" data-testid="icon-expand-buttons">
          <span className="label">Icon button — icon only at rest, EXPANDS to icon + label on hover (works on every variant; no fixed width)</span>
          <Button variant="outline" icon={<Search className="w-3.5 h-3.5" />} collapse data-testid="icon-expand-outline">Search</Button>
          <Button variant="subtle" icon={<Palette className="w-3.5 h-3.5" />} collapse data-testid="icon-expand-subtle">Theme</Button>
          <Button variant="primary" icon={<Plus className="w-3.5 h-3.5" />} collapse data-testid="icon-expand-primary">Add</Button>
          <Button variant="outline" icon={<Search className="w-3.5 h-3.5" />} collapse revealOnHover data-testid="icon-reveal-outline">Search</Button>
          <Button variant="primary" icon={<Plus className="w-3.5 h-3.5" />} collapse revealOnHover data-testid="icon-reveal-primary">Add</Button>
        </div>
        <div className="row">
          <PillTabs variant="tab-header" theme="dark" rowClass="bg-zinc-950" labels={['Schedule', 'Calendar', 'Reports']} />
          <PillTabs variant="tab" theme="light" rowClass="bg-zinc-100" labels={['Strips', 'Events']} />
        </div>
      </DemoCard>
    </>
  );
}
