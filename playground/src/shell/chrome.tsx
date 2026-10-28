import React, { useEffect, useMemo, useState } from 'react';
import { Button, DropdownMenu, DropdownItem, setCoarseScale, useCoarseScale, IS_COARSE } from '../../../src/index';

/* Playground chrome: the sticky top bar, the section rail, the surface cards
   and the global coarse-scale knob. Everything here is presentation only —
   the demo surfaces (and their testids) are untouched. */

export type NavSection = {
  id: string;
  group: string;
  title: string;
};

/** Scroll to a section and keep the URL shareable. */
export function goToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  history.replaceState(null, '', `#${id}`);
}

/** Highlights the section currently under the top bar. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? '');
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      // The section rail highlights whatever occupies the reading band under
      // the top bar (a strict "top edge" test lagged a whole section when a
      // section heading sat mid-screen).
      const line = Math.min(window.innerHeight * 0.35, 420);
      let current = ids[0] ?? '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // At the very bottom the last section always wins.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = ids[ids.length - 1] ?? current;
      setActive(current);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ids]);
  return active;
}

/* ── Coarse scale (global kit knob) ───────────────────────────────────────── */

export function CoarseScaleControl() {
  const scale = useCoarseScale();
  const options = [
    { v: 0, label: 'Off' },
    { v: 0.5, label: '50%' },
    { v: 1, label: 'Full' },
  ];
  return (
    <div className="pg-coarse" data-testid="coarse-control" title={IS_COARSE ? 'Coarse device — the scale applies to every kit surface' : 'Fine device — coarse sizing is inactive'}>
      <span className="pg-coarse-label">Coarse</span>
      <div className="pg-coarse-seg" role="group" aria-label="Global coarse scale">
        {options.map(o => (
          <button
            key={o.v}
            type="button"
            data-testid={`coarse-${o.v}`}
            className={`pg-coarse-btn${o.v === scale ? ' is-active' : ''}`}
            onClick={() => setCoarseScale(o.v)}
          >
            {o.label}
          </button>
        ))}
      </div>
      <input
        data-testid="coarse-custom"
        aria-label="Coarse scale slider"
        type="range" min="0" max="1" step="0.05" value={scale}
        onChange={e => setCoarseScale(parseFloat(e.target.value))}
        className="pg-coarse-range"
      />
      <input
        data-testid="coarse-custom-num"
        aria-label="Coarse scale percent"
        type="number" min="0" max="100" step="5" value={Math.round(scale * 100)}
        onChange={e => setCoarseScale((parseFloat(e.target.value) || 0) / 100)}
        className="pg-coarse-num"
      />
      <span className="pg-coarse-unit">%</span>
      <button data-testid="coarse-reset" type="button" className="pg-coarse-reset" onClick={() => setCoarseScale(0.5)}>
        Reset
      </button>
    </div>
  );
}

/* ── Top bar ──────────────────────────────────────────────────────────────── */

export function TopBar({ sections, pages }: { sections: NavSection[]; pages: NavSection[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="pg-topbar">
      <div className="pg-brand">
        <span className="pg-brand-mark" aria-hidden>◆</span>
        <div className="pg-brand-text">
          {/* The specs click this text to dismiss an open overlay — it lives
              in the sticky bar so it is always on screen. */}
          <h1 className="pg-brand-title">ui-kit playground — component zoo</h1>
          <div className="pg-brand-sub">Every primitive, live. Click a section to jump.</div>
        </div>
      </div>

      <div className="pg-topbar-tools">
        <div className="pg-mobile-jump">
          <DropdownMenu
            open={menuOpen}
            onOpenChange={setMenuOpen}
            width="w-64"
            trigger={<Button variant="outline" theme="dark" data-testid="mobile-section-menu">Sections</Button>}
          >
            {sections.map(s => (
              <DropdownItem
                key={s.id}
                group={s.group}
                onClick={() => { setMenuOpen(false); goToSection(s.id); }}
              >
                {s.title}
              </DropdownItem>
            ))}
            {pages.map(p => (
              <DropdownItem
                key={p.id}
                group="Full pages"
                onClick={() => { setMenuOpen(false); window.location.hash = p.id; }}
              >
                {p.title}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </div>
        <CoarseScaleControl />
      </div>
    </header>
  );
}

/* ── Section rail ─────────────────────────────────────────────────────────── */

export function SectionNav({ sections, pages, activeId }: { sections: NavSection[]; pages: NavSection[]; activeId: string }) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const groups = useMemo(() => {
    const shown = q
      ? sections.filter(s => `${s.group} ${s.title}`.toLowerCase().includes(q))
      : sections;
    const map: { group: string; items: NavSection[] }[] = [];
    for (const s of shown) {
      const last = map[map.length - 1];
      if (last && last.group === s.group) last.items.push(s);
      else map.push({ group: s.group, items: [s] });
    }
    return map;
  }, [sections, q]);
  const shownPages = useMemo(
    () => (q ? pages.filter(p => `${p.group} ${p.title}`.toLowerCase().includes(q)) : pages),
    [pages, q],
  );

  return (
    <nav className="pg-nav" aria-label="Playground sections">
      <div className="pg-nav-inner">
        <div className="pg-nav-filter">
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Filter sections…"
            aria-label="Filter sections"
            className="pg-nav-input"
          />
        </div>
        {groups.length === 0 && shownPages.length === 0 && <div className="pg-nav-empty">No sections match.</div>}
        {groups.map(g => (
          <div className="pg-nav-group" key={g.group}>
            <div className="pg-nav-group-label">{g.group}</div>
            <ul className="pg-nav-list">
              {g.items.map(s => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`pg-nav-item${activeId === s.id ? ' is-active' : ''}`}
                    aria-current={activeId === s.id ? 'location' : undefined}
                    onClick={e => { e.preventDefault(); goToSection(s.id); }}
                  >
                    <span className="pg-nav-dot" aria-hidden />
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {shownPages.length > 0 && (
          <div className="pg-nav-group">
            <div className="pg-nav-group-label">Full pages</div>
            <ul className="pg-nav-list">
              {shownPages.map(p => (
                <li key={p.id}>
                  <a
                    href={`#${p.id}`}
                    className="pg-nav-item"
                    data-testid={`nav-page-${p.id}`}
                  >
                    <span className="pg-nav-dot" aria-hidden />
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

/* ── Cards ────────────────────────────────────────────────────────────────── */

export function DemoCard({
  label,
  hint,
  wide,
  testId,
  children,
  className = '',
}: {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  wide?: boolean;
  testId?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`pg-card${wide ? ' pg-card--wide' : ''}${className ? ` ${className}` : ''}`} data-testid={testId}>
      {(label || hint) && (
        <div className="pg-card-head">
          {label && <div className="pg-card-label">{label}</div>}
          {hint && <p className="pg-card-hint">{hint}</p>}
        </div>
      )}
      <div className="pg-card-body">{children}</div>
    </div>
  );
}
