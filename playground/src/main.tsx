import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './playground.css';
import { DialogProvider, ThemeScope } from '../../src/index';
import type { KitAccent, KitMode, KitSurface } from '../../src/index';
import { SectionNav, TopBar, useActiveSection } from './shell/chrome';
import type { NavSection } from './shell/chrome';
import type { LabState } from './shell/lab';
import { ThemeLabSection } from './sections/ThemeLabSection';
import { ButtonsSection } from './sections/ButtonsSection';
import { InputsSection } from './sections/InputsSection';
import { DropdownsSection } from './sections/DropdownsSection';
import { SearchSection } from './sections/SearchSection';
import { MiscSection } from './sections/MiscSection';
import { ModalsSection } from './sections/ModalsSection';
import { DialogsSection } from './sections/DialogsSection';
import { PanelsSection } from './sections/PanelsSection';
import { RichTextSection } from './sections/RichTextSection';
import { HeaderTabsSection } from './sections/HeaderTabsSection';

/* ────────────────────────────────────────────────────────────────────────────
   ui-kit playground — the component zoo & debugging surfaces.

   The page is a section showroom: the rail on the left is generated from the
   SECTIONS registry below (one source of truth for nav + rendering), and the
   Theme lab drives the WHOLE page's mode/accent (surface stays a modal
   property). Every demo keeps its original testid — the Playwright suite in
   playground/specs is the regression net for these surfaces.
   ──────────────────────────────────────────────────────────────────────────── */

type SectionDef = NavSection & {
  blurb: string;
  /** The specs scope to `[data-testid="theme-lab"]` — set only where needed. */
  testId?: string;
  render: (lab: LabState) => React.ReactNode;
};

const SECTIONS: SectionDef[] = [
  {
    id: 'theme-lab', group: 'Foundations', title: 'Theme lab', testId: 'theme-lab',
    blurb: 'Mode × accent × surface. The lab recolours the whole playground; open the modal to see the shell ladder, and toggle Surface to compare neutral vs accent.',
    render: lab => <ThemeLabSection {...lab} />,
  },
  {
    id: 'buttons', group: 'Foundations', title: 'Buttons',
    blurb: 'Every variant and theme, plus the pressed, icon-only, minimal, tab and project-chrome shapes the app uses.',
    render: () => <ButtonsSection />,
  },
  {
    id: 'inputs', group: 'Foundations', title: 'Inputs & forms',
    blurb: 'Selection rows, the date picker, the numeric box in every mode, segmented controls and the floating toggle.',
    render: () => <InputsSection />,
  },
  {
    id: 'dropdowns', group: 'Menus & pickers', title: 'Dropdown menus',
    blurb: 'Controlled and themed menus, long/capped lists, row options, submenus and the item manager — plus the viewport-edge repro.',
    render: () => <DropdownsSection />,
  },
  {
    id: 'search', group: 'Menus & pickers', title: 'Search & pickers',
    blurb: 'The shared SearchMenu in every mode, the in-panel search dropdown, grouped rows, and the two morph fields.',
    render: () => <SearchSection />,
  },
  {
    id: 'misc', group: 'Menus & pickers', title: 'Context menus & tooltips',
    blurb: 'Right-click / touch menus with nested subs, the right-edge clamp repro, tooltips and long-press.',
    render: () => <MiscSection />,
  },
  {
    id: 'modals', group: 'Overlays', title: 'Modals',
    blurb: 'The modal shell and stack, menus portaled above it, the iPad keyboard test, CardSection fields and a rich-text editor inside one.',
    render: () => <ModalsSection />,
  },
  {
    id: 'dialogs', group: 'Overlays', title: 'Dialogs',
    blurb: 'Confirm, danger + DNWA suppression, prompt and alert — plus a dialog that spawns another and the stack FLIP.',
    render: () => <DialogsSection />,
  },
  {
    id: 'morph-panels', group: 'Overlays', title: 'Morph panels',
    blurb: 'The clone-on-unmount panel (the app\u2019s DropdownPanel pattern): the close morph plays on a pinned clone at the panel rect.',
    render: () => <PanelsSection />,
  },
  {
    id: 'rich-text', group: 'Editors', title: 'Rich text',
    blurb: 'TipTap with field tokens, staged reference.attribute bubbles, selection-level formatting runs and the print resolution.',
    render: () => <RichTextSection />,
  },
  {
    id: 'header-tabs', group: 'App chrome', title: 'Header tabs',
    blurb: 'Icon-first collapsing tabs with the sliding selection pill — resting, hover, together and tablist semantics.',
    render: () => <HeaderTabsSection />,
  },
];

const SECTION_IDS = SECTIONS.map(s => s.id);

function Intro({ count }: { count: number }) {
  return (
    <section className="pg-hero" aria-label="About this playground">
      <div className="pg-hero-kicker">Component zoo &amp; debugging surfaces</div>
      <h2 className="pg-hero-title">Every primitive, one page.</h2>
      <p className="pg-hero-text">
        The same surfaces the Playwright suite drives, kept live against the kit source.
        Poke them, break them, then run <code>npm run test:playground</code>.
      </p>
      <ul className="pg-hero-tips">
        <li><b>Menus:</b> click the same trigger to dismiss — that&rsquo;s the buggy path.</li>
        <li><b>Panels:</b> open/close twice — StrictMode must not spawn a phantom clone.</li>
        <li><b>Theme:</b> the lab at the top recolours the whole playground; Surface is the modal shell property.</li>
      </ul>
      <div className="pg-hero-tags">
        <span>{count} sections</span>
        <span>desktop + iPad</span>
        <span>runs straight from <code>src/</code></span>
        <span>grouped by surface</span>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="pg-footer">
      <span>ui-kit playground — dev tooling, not a product surface.</span>
      <a href="#top" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Back to top ↑</a>
    </footer>
  );
}

export function App() {
  const [mode, setMode] = useState<KitMode>('dark');
  const [accent, setAccent] = useState<KitAccent>('emerald');
  const [surface, setSurface] = useState<KitSurface>('accent');
  const lab: LabState = { mode, accent, surface, setMode, setAccent, setSurface };
  const activeId = useActiveSection(SECTION_IDS);

  /* The page theme lives on <body> too, so overscroll and portaled surfaces
     (menus/tooltips/dialogs) inherit the same axes. */
  useEffect(() => {
    const b = document.body;
    b.dataset.mode = mode;
    b.dataset.accent = accent;
    b.dataset.surface = 'accent';
    return () => {
      delete b.dataset.mode;
      delete b.dataset.accent;
      delete b.dataset.surface;
    };
  }, [mode, accent]);

  /* Deep links: #search etc. scrolls to the section once React has rendered. */
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const raf = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <ThemeScope mode={mode} accent={accent} surface="accent" className="pg-app" style={{ minHeight: '100vh' }}>
      <div id="top" />
      <TopBar sections={SECTIONS} />
      <div className="pg-layout">
        <SectionNav sections={SECTIONS} activeId={activeId} />
        <main className="pg-main">
          <Intro count={SECTIONS.length} />
          {SECTIONS.map((s, i) => (
            <section key={s.id} id={s.id} data-section={s.id} data-testid={s.testId} className="pg-section">
              <header className="pg-section-head">
                <div className="pg-section-eyebrow">
                  {s.group}<span className="pg-section-num">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h2 className="pg-section-title">{s.title}</h2>
                <p className="pg-section-blurb">{s.blurb}</p>
              </header>
              <div className="pg-grid">{s.render(lab)}</div>
            </section>
          ))}
          <Footer />
        </main>
      </div>
    </ThemeScope>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DialogProvider>
      <App />
    </DialogProvider>
  </React.StrictMode>,
);
