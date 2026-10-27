import React, { useCallback, useMemo, useState } from 'react';
import {
  Button, DropdownMenu, DropdownItem, SearchMenu, PickerField, MorphSearchField, MorphActionField, Seg, Checkbox, useInputSize,
} from '../../../src/index';
import type { SearchMenuItem, MorphFieldAction } from '../../../src/index';
import { Filter, MapPin, Plus, Search } from 'lucide-react';
import {
  DEEP_CATEGORIES, DEEP_RECORDS, FLAT_ITEMS, LOCATIONS, MORPH_GROUPS, MORPH_ITEMS, MULTI_ROLES, TIMEZONES,
  PICKER_CAST, PICKER_LOCATIONS, PICKER_LOCATION_GROUPS, PICKER_PROPS, PICKER_PROP_GROUPS, PICKER_ROLE_GROUPS,
} from '../demoData';
import { DemoCard } from '../shell/chrome';

/* Search & pickers: the shared SearchMenu (browse / flat / expandable modes),
   the DropdownMenu search modes (in-panel box, grouped, trigger-as-search) and
   the two morph fields the app's toolbars use. */

/* ── SearchMenu (the app's record picker) ─────────────────────────────────── */

function DeepSearchDemo() {
  /* The shared SearchMenu in BOTH modes: inline (the manager textbox that
     opens on click/focus) and expandable (a "Search" button that morphs into
     a field). Categories are clickable icon+count rows; no matches shows a
     custom empty state plus an "Add …" action. */
  const [records, setRecords] = useState<SearchMenuItem[]>(DEEP_RECORDS);
  const [active, setActive] = useState<string | null>(null);
  const [pick, setPick] = useState<string | null>(null);
  const [groupMode, setGroupMode] = useState<'multiple' | 'single'>('multiple');
  const [filter, setFilter] = useState('');
  const [flatPick, setFlatPick] = useState(FLAT_ITEMS[40].id);
  const groups = DEEP_CATEGORIES.map(c => ({ ...c, count: records.filter(r => r.group === c.key).length }));
  const common = {
    items: records,
    groups,
    onSelect: (item: SearchMenuItem) => { setPick(item.id); setActive(item.group || null); },
    onSelectGroup: (group: { key: string }) => setActive(group.key),
    expandableGroups: true,
    groupExpandMode: groupMode,
    emptyActions: [
      {
        label: (q: string) => `Search all for “${q.trim()}”`,
        icon: <Search className="w-3.5 h-3.5" />,
        onClick: (q: string) => setPick(`search:${q.trim()}`),
      },
      {
        label: (q: string) => `Add “${q.trim()}”`,
        icon: <Plus className="w-3.5 h-3.5" />,
        onClick: (q: string) => {
          const group = active || 'cast';
          const id = `new-${Date.now()}`;
          setRecords(prev => [...prev, { id, group, label: q.trim(), detail: 'New record' }]);
          setPick(id);
          setActive(group);
        },
      },
    ],
  };
  return (
    <div className="row" id="deep-search" data-testid="deep-search-demo">
      <div data-testid="search-menu-inline" className="w-72">
        <SearchMenu mode="inline" {...common} placeholder="Inline search — click to open…" />
      </div>
      <div data-testid="search-menu-expandable">
        <SearchMenu
          {...common}
          triggerLabel="Search"
          placeholder="Search records or categories…"
          fieldActions={[{
            key: 'add',
            label: 'Add from search',
            icon: <Plus className="w-3.5 h-3.5" />,
            keepOpen: true,
            onClick: (q: string) => {
              const label = q.trim();
              if (!label) return;
              const id = `new-${Date.now()}`;
              const group = active || 'cast';
              setRecords(prev => [...prev, { id, group, label, detail: 'New record' }]);
              setPick(id);
              setActive(group);
            },
          }]}
        />
      </div>
      <div data-testid="search-menu-browse-expanded">
        <SearchMenu {...common} expandableGroups={false} browseExpanded triggerLabel="Browse all" placeholder="Browse records…" />
      </div>
      <div data-testid="search-menu-flat-picker">
        {/* Flat value picker: browseAll = no category rows (one-kind catalogue),
            selectedId = the current value is checked + scrolled into view on
            open. Arrow keys walk all 60 rows and keep the highlight in view. */}
        <SearchMenu
          items={FLAT_ITEMS}
          browseAll
          selectedId={flatPick}
          onSelect={(item: SearchMenuItem) => setFlatPick(item.id)}
          triggerLabel={FLAT_ITEMS.find(i => i.id === flatPick)?.label || 'Choose…'}
          triggerIcon={<MapPin className="w-3.5 h-3.5" />}
          placeholder="Search 60 rows…"
          collapsedWidth={190}
          expandedWidth={240}
          panelWidth={300}
          maxMenuHeight={260}
        />
      </div>
      <span className="label" data-testid="flat-picker-status">flat pick: {flatPick}</span>
      <div data-testid="morph-search-field">
        <MorphSearchField
          value={filter}
          onChange={setFilter}
          triggerLabel={filter.trim() || 'Filter'}
          triggerIcon={filter.trim() ? <Filter className="w-3.5 h-3.5" /> : <Search className="w-3.5 h-3.5" />}
          placeholder="Filter rows…"
          collapsedWidth={88}
          expandedWidth={190}
        />
      </div>
      <span className="label" data-testid="morph-search-status">filter: {filter || '—'}</span>
      <div data-testid="search-menu-group-mode">
        <Seg
          value={groupMode}
          options={[{ v: 'multiple', l: 'Many open' }, { v: 'single', l: 'One open' }]}
          onChange={v => setGroupMode(v as 'multiple' | 'single')}
          variant="track"
        />
      </div>
      <span className="label" data-testid="deep-search-status">active: {active || '—'} · pick: {pick || '—'}</span>
    </div>
  );
}

/* ── DropdownMenu search modes ────────────────────────────────────────────── */

function SearchableMenuDemo() {
  /* `searchable`: a search input auto-focuses at the top of the panel; typing
     filters the rows by label (non-matches hide), arrows move the single
     highlight over the VISIBLE rows, Enter/click selects. The typeahead
     letter-jump yields to the input (letters go into the field). Two variants:
     dark (default) + light theme — the search box is theme-aware. */
  const [open, setOpen] = useState(false);
  const [lightOpen, setLightOpen] = useState(false);
  const [pick, setPick] = useState<string | null>(null);
  return (
    <div className="row" data-testid="searchable-menu">
      <DropdownMenu open={open} onOpenChange={setOpen} width="w-64"
        searchable searchPlaceholder="Search timezones…"
        trigger={<Button data-testid="searchable-trigger">Searchable menu {pick ? `— ${pick}` : ''}</Button>}
      >
        {TIMEZONES.map(tz => (
          <DropdownItem key={tz} selected={pick === tz} onClick={() => { setPick(tz); setOpen(false); }}>
            {tz}
          </DropdownItem>
        ))}
      </DropdownMenu>
      <DropdownMenu open={lightOpen} onOpenChange={setLightOpen} width="w-64" theme="light"
        searchable searchPlaceholder="Search (light)…"
        trigger={<Button theme="light" variant="primary" data-testid="searchable-light-trigger">Searchable menu (light) {pick ? `— ${pick}` : ''}</Button>}
      >
        {TIMEZONES.map(tz => (
          <DropdownItem key={tz} selected={pick === tz} onClick={() => { setPick(tz); setLightOpen(false); }}>
            {tz}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </div>
  );
}

function GroupedSearchableMenuDemo() {
  /* Grouped menus: rows carry a `group` (locations by type). A category header
     renders on the first VISIBLE row of its group; a searchable menu's query
     matches the group label too, so "set" lists the whole Set category. The
     same headers render in a plain (non-searchable) menu — grouping is a
     DropdownItem concern, not a search feature. */
  const [open, setOpen] = useState(false);
  const [plainOpen, setPlainOpen] = useState(false);
  const [pick, setPick] = useState<string | null>(null);
  const [plainPick, setPlainPick] = useState<string | null>(null);
  return (
    <div className="row" data-testid="grouped-searchable-menu">
      <DropdownMenu open={open} onOpenChange={setOpen} width="w-72"
        searchable searchPlaceholder="Search locations or categories…"
        trigger={<Button data-testid="grouped-searchable-trigger">Grouped searchable {pick ? `— ${pick}` : ''}</Button>}
      >
        {LOCATIONS.map(loc => (
          <DropdownItem key={loc.name} group={loc.group} selected={pick === loc.name}
            onClick={() => { setPick(loc.name); setOpen(false); }}
          >
            {loc.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
      <DropdownMenu open={plainOpen} onOpenChange={setPlainOpen} width="w-72"
        trigger={<Button data-testid="grouped-trigger">Grouped menu {plainPick ? `— ${plainPick}` : ''}</Button>}
      >
        {LOCATIONS.map(loc => (
          <DropdownItem key={loc.name} group={loc.group} selected={plainPick === loc.name}
            onClick={() => { setPlainPick(loc.name); setPlainOpen(false); }}
          >
            {loc.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </div>
  );
}

function SearchableTriggerDemo() {
  /* Trigger-as-search (combobox): the trigger field IS the search box. The
     query is CONTROLLED (`searchValue`/`onSearchValueChange`) — the menu
     filters by it and renders NO box inside the panel. The field's own
     keystrokes are never hijacked by the menu's key-lock. */
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const inputSize = useInputSize();
  return (
    <div className="row" data-testid="searchable-trigger-demo">
      <DropdownMenu open={open} onOpenChange={setOpen} width="w-72"
        searchable searchValue={q} onSearchValueChange={setQ}
        trigger={
          <input
            data-testid="searchable-trigger-input"
            value={q}
            placeholder="Type to search timezones…"
            onFocus={() => setOpen(true)}
            onChange={e => { setQ(e.target.value); setOpen(true); }}
            className="w-72 ui-input"
            style={inputSize}
          />
        }
      >
        {TIMEZONES.map(tz => (
          <DropdownItem key={tz} onClick={() => { setQ(tz); setOpen(false); }}>{tz}</DropdownItem>
        ))}
      </DropdownMenu>
    </div>
  );
}

/* ── Multiple selection (roadmap 322) ─────────────────────────────────────── */

function MultipleSearchDemo() {
  /* Records toggle and the panel stays open; categories still expand, and the
     category row's check selects its VISIBLE rows. The footer hero commits;
     Escape/click-away/trigger close cancel. Search to see the hidden-by-filter
     note (selected rows the query hides stay selected). The same committed
     value feeds the accordion and the plain-header variant. */
  const [selected, setSelected] = useState<string[]>(['camera-op']);
  const [commits, setCommits] = useState(0);
  const [indicator, setIndicator] = useState<'box' | 'check'>('box');
  const groups = useMemo(() => MULTI_ROLES
    .map(role => role.group)
    .filter((group, index, all) => all.indexOf(group) === index)
    .map(group => ({ key: group, label: group, count: MULTI_ROLES.filter(role => role.group === group).length })), []);
  const items = useMemo(() => MULTI_ROLES.map(role => ({ id: role.id, label: role.label, group: role.group })), []);
  const multiple = {
    selectedIds: selected,
    onCommit: (ids: string[]) => { setSelected(ids); setCommits(n => n + 1); },
    commitLabel: (n: number) => `Add ${n} ${n === 1 ? 'role' : 'roles'}`,
    indicator,
  };
  return (
    <div className="row" data-testid="multi-search-demo">
      <Seg
        value={indicator}
        options={[{ v: 'box', l: 'Checkbox' }, { v: 'check', l: 'Check icon' }]}
        onChange={v => setIndicator(v as 'box' | 'check')}
        variant="track"
      />
      <div data-testid="multi-search-accordion">
        <SearchMenu
          items={items}
          groups={groups}
          multiple={multiple}
          expandableGroups
          groupExpandMode="single"
          triggerLabel={`Pick roles${selected.length ? ` — ${selected.length}` : ''}`}
          triggerIcon={<Plus className="w-3.5 h-3.5" />}
          placeholder="Search roles…"
          collapsedWidth={140}
          expandedWidth={240}
          panelWidth={300}
        />
      </div>
      <div data-testid="multi-search-browse">
        <SearchMenu
          items={items}
          groups={groups}
          multiple={multiple}
          browseExpanded
          triggerLabel={`Browse roles${selected.length ? ` — ${selected.length}` : ''}`}
          triggerIcon={<Plus className="w-3.5 h-3.5" />}
          placeholder="Browse roles…"
          collapsedWidth={160}
          expandedWidth={240}
          panelWidth={300}
        />
      </div>
      <span className="label" data-testid="multi-search-status">
        committed: {selected.join(', ') || '—'} · commits: {commits} · indicator: {indicator}
      </span>
    </div>
  );
}

/* ── PickerField — the value layer (roadmap 322, phase 5) ─────────────────── */

function PickerFieldDemo() {
  const [castItems, setCastItems] = useState(PICKER_CAST);
  const [propItems, setPropItems] = useState(PICKER_PROPS);
  const [cast, setCast] = useState<string[]>(['1', '2']);
  const [props, setProps] = useState<string[]>(['Mug']);
  const [wrapProps, setWrapProps] = useState<string[]>(['Desk lamp', 'Family portrait']);
  const [inlineProp, setInlineProp] = useState<string[]>(['Prop Gun']);
  const [location, setLocation] = useState<string[]>([]);
  const [accordionLoc, setAccordionLoc] = useState<string[]>(['loc-hospital']);
  const [roles, setRoles] = useState<string[]>(['camera-op']);
  const [buttonRoles, setButtonRoles] = useState<string[]>([]);
  const [asyncTz, setAsyncTz] = useState<string[]>([]);
  const [longTz, setLongTz] = useState<string[]>(['Pacific/Auckland']);
  const [display, setDisplay] = useState<'names' | 'chips' | 'count'>('names');
  const [indicator, setIndicator] = useState<'box' | 'check'>('box');
  const [commits, setCommits] = useState(0);
  const bump = () => setCommits(n => n + 1);

  const loadTzs = useCallback(async (query: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return TIMEZONES
      .filter(tz => tz.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 12)
      .map(tz => ({ id: tz, label: tz }));
  }, []);

  const locationLabel = PICKER_LOCATIONS.find(l => l.id === location[0])?.label;
  const accordionLabel = PICKER_LOCATIONS.find(l => l.id === accordionLoc[0])?.label;
  const roleLabels = roles.map(key => MULTI_ROLES.find(r => r.id === key)?.label || key);

  return (
    <div className="pg-stack" data-testid="picker-field-demo" style={{ maxWidth: 860 }}>
      <div className="row" style={{ margin: 0, flexWrap: 'wrap' }}>
        <span className="label">Display</span>
        <Seg
          value={display}
          options={[{ v: 'names', l: 'Names' }, { v: 'chips', l: 'Chips' }, { v: 'count', l: 'Count' }]}
          onChange={v => setDisplay(v as 'names' | 'chips' | 'count')}
          variant="track"
        />
        <span className="label">Check</span>
        <Seg
          value={indicator}
          options={[{ v: 'box', l: 'Checkbox' }, { v: 'check', l: 'Check icon' }]}
          onChange={v => setIndicator(v as 'box' | 'check')}
          variant="track"
        />
        <span className="label" data-testid="picker-commits">commits: {commits}</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div data-testid="picker-cast">
          <span className="label">Cast — ids stored, names shown, badge + anchor, typed create</span>
          <PickerField
            appearance="chip"
            mode="multiple"
            values={cast}
            onChange={values => { setCast(values); bump(); }}
            items={castItems}
            display={display}
            indicator={indicator}
            anchoredKeys={new Set(['2'])}
            createLabel={q => `Add “${q.trim()}” to cast…`}
            onCreateItem={value => setCastItems(prev => (
              prev.some(i => i.id === value || i.label.toLowerCase() === value.toLowerCase())
                ? prev
                : [...prev, { id: value, label: value }]
            ))}
            placeholder="Add cast…"
            panelWidth={300}
          />
          <span className="label" data-testid="picker-cast-status">cast: {cast.join(', ') || '—'}</span>
        </div>

        <div data-testid="picker-props">
          <span className="label">Props — name-keyed, grouped, create from typed</span>
          <PickerField
            appearance="chip"
            mode="multiple"
            values={props}
            onChange={values => { setProps(values); bump(); }}
            items={propItems}
            groups={PICKER_PROP_GROUPS}
            resolveBy="label"
            display={display}
            indicator={indicator}
            createLabel={q => `Add “${q.trim()}” prop…`}
            onCreateItem={value => setPropItems(prev => (
              prev.some(i => i.label === value) ? prev : [...prev, { id: value, label: value, group: 'Hand props' }]
            ))}
            placeholder="Add props…"
            panelWidth={300}
          />
          <span className="label" data-testid="picker-props-status">props: {props.join(', ') || '—'}</span>
        </div>

        <div data-testid="picker-location">
          <span className="label">Location — single, id-keyed, accordion categories</span>
          <PickerField
            appearance="chip"
            mode="single"
            values={location}
            onChange={values => { setLocation(values); bump(); }}
            items={PICKER_LOCATIONS}
            groups={PICKER_LOCATION_GROUPS}
            browse="open"
            placeholder="Choose location…"
            panelWidth={300}
          />
          <span className="label" data-testid="picker-location-status">location: {locationLabel || '—'}</span>
        </div>

        <div data-testid="picker-accordion-single">
          <span className="label">Accordion single — opens ON the current value</span>
          <PickerField
            appearance="chip"
            mode="single"
            values={accordionLoc}
            onChange={values => { setAccordionLoc(values); bump(); }}
            items={PICKER_LOCATIONS}
            groups={PICKER_LOCATION_GROUPS}
            browse="accordion"
            placeholder="Choose location…"
            panelWidth={300}
            maxMenuHeight={220}
          />
          <span className="label" data-testid="picker-accordion-status">accordion: {accordionLabel || '—'}</span>
        </div>

        <div data-testid="picker-roles">
          <span className="label">Crew roles — morph face, grouped, count display</span>
          <PickerField
            appearance="morph"
            mode="multiple"
            values={roles}
            onChange={values => { setRoles(values); bump(); }}
            items={MULTI_ROLES}
            groups={PICKER_ROLE_GROUPS}
            browse="accordion"
            display="count"
            indicator={indicator}
            collapsedWidth={150}
            expandedWidth={280}
            panelWidth={300}
            placeholder="Add roles…"
          />
          <span className="label" data-testid="picker-roles-status">roles: {roleLabels.join(', ') || '—'}</span>
        </div>

        <div data-testid="picker-button">
          <span className="label">Button — count face, panel search, whole-group tag</span>
          <PickerField
            appearance="button"
            mode="multiple"
            display="count"
            values={buttonRoles}
            onChange={values => { setButtonRoles(values); bump(); }}
            items={[
              ...MULTI_ROLES,
              ...PICKER_ROLE_GROUPS.map(g => ({ id: `all:${g.key}`, label: `All ${g.label}`, group: g.key, hidden: true })),
            ]}
            groups={PICKER_ROLE_GROUPS}
            groupToken={group => `all:${group}`}
            browse="accordion"
            searchPlaceholder="Search roles…"
            placeholder="No roles"
            panelWidth={300}
          />
          <span className="label" data-testid="picker-button-status">button: {buttonRoles.join(', ') || '—'}</span>
        </div>

        <div data-testid="picker-inline" className="rounded border border-zinc-700 px-2 py-1.5">
          <span className="label">Inline cell — single, name-keyed</span>
          <div className="flex items-center gap-2">
            <span className="text-xs">Prop</span>
            <div className="min-w-0 flex-1">
              <PickerField
                appearance="inline"
                mode="single"
                values={inlineProp}
                onChange={values => { setInlineProp(values); bump(); }}
                items={propItems}
                resolveBy="label"
                placeholder="Type a prop…"
                panelWidth={260}
              />
            </div>
          </div>
          <span className="label" data-testid="picker-inline-status">inline: {inlineProp[0] || '—'}</span>
        </div>

        <div data-testid="picker-wrap">
          <span className="label">Wrap — multiple, multi-line cell</span>
          <PickerField
            appearance="wrap"
            mode="multiple"
            values={wrapProps}
            onChange={values => { setWrapProps(values); bump(); }}
            items={propItems}
            resolveBy="label"
            placeholder="Type props…"
            panelWidth={300}
          />
          <span className="label" data-testid="picker-wrap-status">wrap: {wrapProps.join(', ') || '—'}</span>
        </div>

        <div data-testid="picker-async">
          <span className="label">Async source — debounced typeahead</span>
          <PickerField
            appearance="chip"
            mode="single"
            values={asyncTz}
            onChange={values => { setAsyncTz(values); bump(); }}
            items={[]}
            loadItems={loadTzs}
            placeholder="Type to search timezones…"
            panelWidth={320}
          />
          <span className="label" data-testid="picker-async-status">tz: {asyncTz[0] || '—'}</span>
        </div>

        <div data-testid="picker-long-single">
          <span className="label">Long single — opens ON the current value, scrolled</span>
          <PickerField
            appearance="chip"
            mode="single"
            values={longTz}
            onChange={values => { setLongTz(values); bump(); }}
            items={TIMEZONES.map(tz => ({ id: tz, label: tz }))}
            browseAll
            placeholder="Choose timezone…"
            panelWidth={320}
            maxMenuHeight={220}
          />
          <span className="label" data-testid="picker-long-status">tz: {longTz[0] || '—'}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Morph fields ─────────────────────────────────────────────────────────── */

/** Morph-anchor repro: the three app layouts that move the trigger's left
 *  edge (right-aligned master row, right-aligned dept group, justify-between
 *  empty-state row). Toggle the empty catalogue to match the reported case. */
function SearchMenuMorphDemo() {
  const [empty, setEmpty] = useState(true);
  const [pick, setPick] = useState('—');
  const items = empty ? [] : MORPH_ITEMS;
  const groups = empty ? [] : MORPH_GROUPS;
  const common = {
    items,
    groups,
    onSelect: (item: SearchMenuItem) => setPick(item.label),
    expandableGroups: true as const,
    groupExpandMode: 'single' as const,
    panelWidth: 320,
    placeholder: 'Search locations…',
    emptyHint: 'Try a name, type, address, contact or phone.',
    emptyActions: [{
      label: 'Add new location…',
      icon: <Plus className="w-3.5 h-3.5" />,
      onClick: () => {},
    }],
  };
  return (
    <div className="pg-stack" data-testid="search-menu-morph-demo" style={{ maxWidth: 720 }}>
      <div className="row" style={{ margin: 0 }}>
        <span className="label" style={{ width: 'auto' }}>SearchMenu morph anchor — empty catalogue toggle</span>
        <label className="row" data-testid="morph-empty-toggle" style={{ margin: 0 }}>
          <Checkbox checked={empty} onChange={setEmpty} /> Empty catalogue
        </label>
      </div>
      <div className="flex items-center gap-2 rounded border border-zinc-700 p-2" data-testid="morph-master-row">
        <span className="text-xs">Report to</span>
        <span className="text-[10px] uppercase tracking-wider">All crew</span>
        <div className="ml-auto" data-testid="morph-master-menu">
          <SearchMenu {...common} triggerLabel={pick} triggerIcon={<MapPin className="w-3.5 h-3.5" />} collapsedWidth={224} expandedWidth={280} />
        </div>
      </div>
      <div className="flex items-center gap-2 rounded border border-zinc-700 p-2" data-testid="morph-dept-row">
        <span className="text-xs">Report to</span>
        <div className="ml-auto flex items-center gap-1.5" data-testid="morph-dept-menu">
          <SearchMenu {...common} triggerLabel={pick} triggerIcon={<MapPin className="w-3.5 h-3.5" />} collapsedWidth={176} expandedWidth={240} />
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 rounded border border-zinc-700 p-2" data-testid="morph-add-row">
        <span className="text-xs">No locations on this day.</span>
        <div data-testid="morph-add-menu">
          <SearchMenu {...common} triggerLabel="Add location" triggerIcon={<Plus className="w-3.5 h-3.5" />} collapsedWidth={140} expandedWidth={280} />
        </div>
      </div>
      <span className="label" data-testid="morph-status">pick: {pick} · {empty ? 'empty' : `${MORPH_ITEMS.length} records`}</span>
    </div>
  );
}

function MorphActionFieldDemo() {
  const [role, setRole] = useState('');
  const [roles, setRoles] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [plain, setPlain] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [mapDraft, setMapDraft] = useState('');
  const mapAction: MorphFieldAction = {
    key: 'map',
    label: 'Pick on map',
    icon: <MapPin className="w-3.5 h-3.5" />,
    keepOpen: true,
    onClick: value => setMapDraft(value),
  };
  return (
    <div className="pg-stack" data-testid="morph-action-demo" style={{ maxWidth: 720 }}>
      <div className="flex items-center gap-3 rounded border border-zinc-700 p-2" data-testid="morph-action-role">
        <span className="text-xs">Crew</span>
        <div className="ml-auto">
          <MorphActionField
            triggerLabel="Add role"
            placeholder="Role name…"
            value={role}
            onChange={setRole}
            onSubmit={value => { setRoles(prev => [...prev, value]); setSubmitted(value); }}
            onCancel={() => {}}
            collapsedWidth={110}
            expandedWidth={280}
            fieldIcon={<Plus className="w-3.5 h-3.5" />}
            theme="light"
          />
        </div>
      </div>
      <div className="flex items-center gap-3 rounded border border-zinc-700 p-2" data-testid="morph-action-location">
        <span className="text-xs">Location</span>
        <div className="ml-auto">
          <MorphActionField
            triggerLabel="Add location"
            placeholder="Location name…"
            value={location}
            onChange={setLocation}
            onSubmit={value => setSubmitted(value)}
            onCancel={() => {}}
            actions={[mapAction]}
            collapsedWidth={140}
            expandedWidth={300}
            fieldIcon={<MapPin className="w-3.5 h-3.5" />}
            theme="light"
          />
        </div>
      </div>
      <div className="flex items-center gap-3 rounded border border-zinc-700 p-2" data-testid="morph-action-plain">
        <span className="text-xs">Plain field</span>
        <div className="ml-auto">
          <MorphActionField
            triggerLabel="Add note"
            placeholder="Note…"
            value={plain}
            onChange={setPlain}
            onSubmit={value => setSubmitted(value)}
            onCancel={() => {}}
            collapsedWidth={100}
            expandedWidth={260}
            theme="light"
          />
        </div>
      </div>
      <span className="label" data-testid="morph-action-status">
        roles: {roles.join(', ') || '—'} · last: {submitted || '—'} · map: {mapDraft || '—'}
      </span>
    </div>
  );
}

export function SearchSection() {
  return (
    <>
      <DemoCard
        wide
        label="SearchMenu — every mode"
        hint="Inline textbox, expandable button→field, browse-all, flat value picker (60 rows, opens on the current value), filter morph and the group accordion. Status readouts sit beside each surface."
      >
        <DeepSearchDemo />
      </DemoCard>
      <DemoCard label="In-panel search" hint="The search box is pinned above the list; typing filters rows and group labels.">
        <SearchableMenuDemo />
      </DemoCard>
      <DemoCard label="Grouped menus" hint="Category headers follow the visible rows; plain menus group too.">
        <GroupedSearchableMenuDemo />
      </DemoCard>
      <DemoCard
        label="Multiple — draft + hero"
        hint="Records toggle and the panel stays open; categories still expand and their check selects the group's visible rows. The footer hero commits; search to see the hidden-by-filter note. Toggle Checkbox / Check icon to compare the row indicator."
      >
        <MultipleSearchDemo />
      </DemoCard>
      <DemoCard
        wide
        label="PickerField — the value picker"
        hint="The EntityDropdown replacement: chip / inline / wrap / morph faces; cast ids → names, name-keyed props, grouped locations; typed create; async; names/chips/count triggers. Escape cancels, blur/Tab commits."
      >
        <PickerFieldDemo />
      </DemoCard>
      <DemoCard label="Trigger-as-search" hint="The trigger field itself is the search box (combobox); focus stays in the field.">
        <SearchableTriggerDemo />
      </DemoCard>
      <DemoCard wide label="Morph anchor" hint="The panel must open at its FINAL position while the trigger width animates. Toggle the empty catalogue to reproduce each app row.">
        <SearchMenuMorphDemo />
      </DemoCard>
      <DemoCard wide label="Create / rename field" hint="MorphActionField: a button morphs into a text field with inline actions; Enter submits, Escape cancels.">
        <MorphActionFieldDemo />
      </DemoCard>
    </>
  );
}
