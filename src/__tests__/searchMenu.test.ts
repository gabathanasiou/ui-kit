import { describe, it, expect } from 'vitest';
import {
  buildSearchMenuRows,
  matchSearchItem,
  parseSearchTags,
  searchMenuContent,
  type SearchMenuGroup,
  type SearchMenuItem,
} from '../searchMenuModel';

const groups: SearchMenuGroup[] = [
  { key: 'cast', label: 'Cast', count: 2 },
  { key: 'crew', label: 'Crew', count: 1 },
  { key: 'locations', label: 'Locations', count: 1 },
];
const items: SearchMenuItem[] = [
  { id: 'anna', group: 'cast', label: 'ANNA', detail: 'Artiste: Roy Smith', fields: [{ label: 'Artiste', value: 'Roy Smith' }] },
  { id: 'bob', group: 'cast', label: 'BOB', fields: [{ label: 'Artiste', value: 'James Dean' }] },
  { id: 'mat', group: 'crew', label: 'MAT', detail: 'Driver · 555-0199', fields: [{ label: 'Phone', value: '555-0199' }] },
  { id: 'grand', group: 'locations', label: 'Grand Hotel', fields: [{ label: 'Address', value: '1 Main St' }] },
];

describe('parseSearchTags', () => {
  it('splits on commas, trims and lowercases', () => {
    expect(parseSearchTags(' Roy, 555 ,, CAST ')).toEqual(['roy', '555', 'cast']);
    expect(parseSearchTags('   ')).toEqual([]);
  });
});

describe('matchSearchItem', () => {
  it('matches labels, details, fields and the group label', () => {
    expect(matchSearchItem(items[0], groups[0], ['roy'])).toMatchObject({ matched: true, detail: 'Artiste: Roy Smith' });
    expect(matchSearchItem(items[2], groups[1], ['555'])).toMatchObject({ matched: true, detail: 'Phone: 555-0199' });
    expect(matchSearchItem(items[3], groups[2], ['locations']).matched).toBe(true);
    expect(matchSearchItem(items[3], groups[2], ['nope']).matched).toBe(false);
  });

  it('requires every comma tag (AND)', () => {
    expect(matchSearchItem(items[0], groups[0], ['roy', 'cast']).matched).toBe(true);
    expect(matchSearchItem(items[0], groups[0], ['roy', '555']).matched).toBe(false);
  });
});

describe('searchMenuContent', () => {
  it('returns hits and only the groups that should render', () => {
    const out = searchMenuContent(items, groups, 'roy');
    expect(out.hits.map(h => h.item.id)).toEqual(['anna']);
    expect(out.visibleGroups.map(g => g.key)).toEqual(['cast']);
  });

  it('shows every group in the empty browse state', () => {
    const out = searchMenuContent(items, groups, '');
    expect(out.hits).toEqual([]);
    expect(out.visibleGroups.map(g => g.key)).toEqual(['cast', 'crew', 'locations']);
  });

  it('keeps a category whose label matches even without hits', () => {
    const out = searchMenuContent(items, groups, 'crew');
    expect(out.hits.map(h => h.item.id)).toEqual(['mat']);
    expect(out.visibleGroups.map(g => g.key)).toEqual(['crew']);
  });
});

describe('buildSearchMenuRows', () => {
  it('browses groups when the query is empty', () => {
    const rows = buildSearchMenuRows({ items, groups, query: '' });
    expect(rows.map(r => r.kind)).toEqual(['group', 'group', 'group']);
  });

  it('renders a group row before its hits', () => {
    const rows = buildSearchMenuRows({ items, groups, query: 'roy' });
    expect(rows.map(r => r.kind)).toEqual(['group', 'item']);
  });

  it('renders the empty state and any custom actions when nothing matches', () => {
    const rows = buildSearchMenuRows({ items, groups, query: 'zzz', emptyActionLabels: ['Search all “zzz”', 'Add “zzz”'] });
    expect(rows).toEqual([
      { kind: 'empty' },
      { kind: 'action', label: 'Search all “zzz”', actionIndex: 0 },
      { kind: 'action', label: 'Add “zzz”', actionIndex: 1 },
    ]);
  });

  it('expands a group in the browse state', () => {
    const rows = buildSearchMenuRows({ items, groups, query: '', expandedGroups: new Set(['cast']) });
    expect(rows.map(r => r.kind)).toEqual(['group', 'item', 'item', 'group', 'group']);
  });

  it('browseAll lists every record flat when the query is empty', () => {
    const flat: SearchMenuItem[] = [
      { id: 'tz1', label: 'Europe/London' },
      { id: 'tz2', label: 'America/New_York' },
    ];
    const rows = buildSearchMenuRows({ items: flat, groups: [], query: '', browseAll: true });
    expect(rows.map(r => r.kind)).toEqual(['item', 'item']);
    expect(rows.map(r => (r.kind === 'item' ? r.hit.item.id : ''))).toEqual(['tz1', 'tz2']);
  });

  it('browseAll still renders grouped hits for a query', () => {
    const rows = buildSearchMenuRows({ items, groups, query: 'roy', browseAll: true });
    expect(rows.map(r => r.kind)).toEqual(['group', 'item']);
  });

  it('pinned rows lead the browse state, above the groups', () => {
    const create: SearchMenuItem = { id: 'NEW', label: 'Add “NEW”', pinned: true };
    const rows = buildSearchMenuRows({ items: [...items, create], groups, query: '' });
    expect(rows[0]).toMatchObject({ kind: 'item', hit: { item: { id: 'NEW' } } });
    expect(rows[1]).toMatchObject({ kind: 'group', group: { key: 'cast' } });
  });

  it('pinned rows lead the query hits, above the matching groups', () => {
    const create: SearchMenuItem = { id: 'NEW', label: 'Add “ANNA”', pinned: true, keywords: 'anna' };
    const rows = buildSearchMenuRows({ items: [...items, create], groups, query: 'anna' });
    expect(rows.map(r => r.kind)).toEqual(['item', 'group', 'item']);
    expect(rows[0]).toMatchObject({ kind: 'item', hit: { item: { id: 'NEW' } } });
    expect(rows[2]).toMatchObject({ kind: 'item', hit: { item: { id: 'anna' } } });
  });
});
