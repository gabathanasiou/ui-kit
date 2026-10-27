import React, { useState } from 'react';
import { Button, useSlidingPill } from '../../../src/index';
import { HEADER_TAB_ICONS, HEADER_TAB_IDS, HEADER_TAB_LABELS, type HeaderTabId } from '../demoData';
import { DemoCard } from '../shell/chrome';

/* Header tabs (roadmap 258): icon-first collapse + the sliding selection pill
   (useSlidingPill) + the iconWithLabel pairing. Kept as the LAST section on
   the page — the shape/scroll-sensitive specs elsewhere assume it. */

function HeaderTabsDemo() {
  const [active, setActive] = useState<HeaderTabId>('schedule');
  const [collapse, setCollapse] = useState(true);
  const [iconWithLabel, setIconWithLabel] = useState(false);
  const rowRef = React.useRef<HTMLDivElement | null>(null);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const pill = useSlidingPill(rowRef, tabRefs, HEADER_TAB_IDS.indexOf(active));
  return (
    <div className="row" data-testid="header-tabs-demo">
      <div className="label">collapse={String(collapse)} · iconWithLabel={String(iconWithLabel)}</div>
      <div ref={rowRef} data-testid="header-tabs-row" className="relative inline-flex items-center gap-1 rounded bg-zinc-950 px-1 py-0.5">
        {pill.style && (
          <span
            aria-hidden
            className={`absolute top-0 bottom-0 rounded bg-white pointer-events-none ${pill.motionClass}`}
            style={pill.style}
          />
        )}
        {HEADER_TAB_IDS.map((id, i) => (
          <Button
            key={id}
            ref={el => { tabRefs.current[i] = el; }}
            variant="tab-header"
            /** Plain header tabs (no project-chrome accent) — the app's dark
             *  app bar. The ambient page accent must not recolour this row. */
            cloud={false}
            active={active === id}
            collapse={collapse}
            iconWithLabel={iconWithLabel}
            icon={HEADER_TAB_ICONS[id]}
            data-testid={`header-tab-${id}`}
            className="relative z-10"
            onClick={() => setActive(id)}
          >
            {HEADER_TAB_LABELS[id]}
          </Button>
        ))}
      </div>
      <Button data-testid="header-tabs-collapse-toggle" onClick={() => setCollapse(c => !c)}>
        collapse: {String(collapse)}
      </Button>
      <Button data-testid="header-tabs-iconmode-toggle" onClick={() => setIconWithLabel(v => !v)}>
        iconWithLabel: {String(iconWithLabel)}
      </Button>
    </div>
  );
}

export function HeaderTabsSection() {
  return (
    <DemoCard
      wide
      label="Dock-style header tabs"
      hint="Icon-first collapse: the active tab shows its label, resting tabs show only the icon, hover reveals the label. Toggle collapse / iconWithLabel to compare the resting modes."
    >
      <HeaderTabsDemo />
    </DemoCard>
  );
}
