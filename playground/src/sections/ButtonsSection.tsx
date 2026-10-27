import React, { useState } from 'react';
import { Button, TAB_PILL, useSlidingPill } from '../../../src/index';
import { Palette, Plus } from 'lucide-react';
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

export function ButtonsSection() {
  return (
    <>
      <DemoCard label="Light theme" hint="quiet · primary · outlined · destructive, enabled and disabled.">
        <VariantGrid theme="light" />
      </DemoCard>
      <DemoCard label="Dark theme" hint="The same set on the dark toolbar palette.">
        <VariantGrid theme="dark" />
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
        <div className="row">
          <PillTabs variant="tab-header" theme="dark" rowClass="bg-zinc-950" labels={['Schedule', 'Calendar', 'Reports']} />
          <PillTabs variant="tab" theme="light" rowClass="bg-zinc-100" labels={['Strips', 'Events']} />
        </div>
      </DemoCard>
    </>
  );
}
