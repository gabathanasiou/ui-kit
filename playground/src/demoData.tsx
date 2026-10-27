import type { ReactNode } from 'react';
import { Table2, CalendarRange, CalendarDays, Palette, Scale, Clapperboard, BarChart3, Building2, UserRound, MapPin, Users } from 'lucide-react';
import type { SearchMenuItem } from '../../src/index';

/* Shared demo data for the playground sections. Keeping it in one module
   means the same four menu items / locations / timezones show up everywhere
   (and the specs depend on those exact labels). */

export const MENU_ITEMS = ['Hold', 'Travel', 'Day Off', 'Rehearsal'];

export const TIMEZONES = [
  'Africa/Johannesburg', 'Africa/Lagos', 'America/Argentina/Buenos_Aires', 'America/Chicago',
  'America/Los_Angeles', 'America/New_York', 'America/Sao_Paulo', 'America/Toronto',
  'America/Vancouver', 'Asia/Dubai', 'Asia/Singapore', 'Asia/Tokyo', 'Australia/Melbourne',
  'Australia/Sydney', 'Europe/Berlin', 'Europe/London', 'Europe/Paris', 'Pacific/Auckland',
];

export const LOCATIONS = [
  { name: 'Riverside House', group: 'Set' },
  { name: 'Grand Hotel — rooftop', group: 'Set' },
  { name: 'Warehouse 12', group: 'Set' },
  { name: 'Unit base — Lot 4', group: 'Unit base' },
  { name: 'Unit base — North yard', group: 'Unit base' },
  { name: 'St. Mary’s Hospital', group: 'Hospital' },
  { name: 'Central Police Station', group: 'Police' },
  { name: 'Holding — Court cells', group: 'Police' },
];

export const DEEP_CATEGORIES: { key: string; label: string; icon: ReactNode; count: number }[] = [
  { key: 'cast', label: 'Cast', icon: <Users className="w-3.5 h-3.5" />, count: 2 },
  { key: 'sets', label: 'Sets', icon: <Building2 className="w-3.5 h-3.5" />, count: 1 },
  { key: 'crew', label: 'Crew', icon: <UserRound className="w-3.5 h-3.5" />, count: 1 },
  { key: 'locations', label: 'Locations', icon: <MapPin className="w-3.5 h-3.5" />, count: 1 },
];

/** Long single-kind catalogue — exercises browseAll + selectedId + keyboard
 *  scrolling (a short list never has anything to scroll). */
export const FLAT_ITEMS: SearchMenuItem[] = Array.from({ length: 60 }, (_, i) => ({
  id: `tz-${i}`,
  label: `Region ${Math.floor(i / 10)} / City ${i}`,
}));

export const DEEP_RECORDS: SearchMenuItem[] = [
  { id: 'anna', group: 'cast', label: 'ANNA', detail: 'Artiste: Roy Smith', fields: [{ label: 'Artiste', value: 'Roy Smith' }] },
  { id: 'bob', group: 'cast', label: 'BOB', detail: 'Artiste: James Dean', fields: [{ label: 'Artiste', value: 'James Dean' }] },
  { id: 'stage2', group: 'sets', label: 'STAGE 2', detail: 'Board ID 1', fields: [{ label: 'Board ID', value: '1' }] },
  { id: 'mat', group: 'crew', label: 'MAT', detail: 'Driver · 555-0199', fields: [{ label: 'Phone', value: '555-0199' }, { label: 'Role', value: 'Driver' }] },
  { id: 'grand', group: 'locations', label: 'Grand Hotel', detail: 'Stage · 1 Main St', fields: [{ label: 'Address', value: '1 Main St' }, { label: 'Type', value: 'Stage' }] },
];

export const MORPH_GROUPS = [
  { key: 'set', label: 'Set', count: 2 },
  { key: 'unitBase', label: 'Unit Base', count: 1 },
];

export const MORPH_ITEMS: SearchMenuItem[] = [
  { id: 'm-loc-1', label: 'Bedford Falls Main Street', group: 'set' },
  { id: 'm-loc-2', label: 'Riverside Diner', group: 'set' },
  { id: 'm-loc-3', label: 'Unit Base North', group: 'unitBase' },
];

/* ── Header tabs (roadmap 258) ────────────────────────────────────────────── */

export const HEADER_TAB_IDS = ['breakdown', 'schedule', 'calendar', 'design', 'rules', 'production', 'reports'] as const;
export type HeaderTabId = (typeof HEADER_TAB_IDS)[number];

export const HEADER_TAB_LABELS: Record<HeaderTabId, string> = {
  breakdown: 'Breakdown', schedule: 'Schedule', calendar: 'Calendar', design: 'Design',
  rules: 'Rules', production: 'Production', reports: 'Reports',
};

export const HEADER_TAB_ICONS: Record<HeaderTabId, ReactNode> = {
  breakdown: <Table2 size={14} />,
  schedule: <CalendarRange size={14} />,
  calendar: <CalendarDays size={14} />,
  design: <Palette size={14} />,
  rules: <Scale size={14} />,
  production: <Clapperboard size={14} />,
  reports: <BarChart3 size={14} />,
};
