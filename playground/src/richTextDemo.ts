import type { TokenItem } from '../../src/index';

/* Rich-text demo fixtures: token catalogue, staged attributes, and a tiny
   print resolver that reproduces the app's "adjacent reference + attribute
   pair prints only the attribute" rule. */

export const RT_TOKENS: TokenItem[] = [
  { key: 'cast.lead', label: 'Lead', color: { text: '#3b82f6', bg: 'rgba(59,130,246,0.14)' }, group: 'CAST' },
  { key: 'cast.supp', label: 'Supporting', color: { text: '#8b5cf6', bg: 'rgba(139,92,246,0.14)' }, group: 'CAST' },
  { key: 'scene.num', label: 'Scene #', color: { text: '#10b981', bg: 'rgba(16,185,129,0.14)' }, group: 'SCENE' },
  { key: 'scene.int_ext', label: 'Int/Ext', color: { text: '#f59e0b', bg: 'rgba(245,158,11,0.14)' }, group: 'SCENE' },
  { key: 'scene.loc', label: 'Location', color: { text: '#ef4444', bg: 'rgba(239,68,68,0.14)' }, group: 'SCENE' },
  { key: 'day.1', label: 'Day 1', color: { text: '#06b6d4', bg: 'rgba(6,182,212,0.14)' }, group: 'DAY' },
];

// Stage 1 references (the staged-token demo): picking one inserts its plain
// key; a `.` typed right after the chip opens stage 2 (attributes).
export const RT_REFS: TokenItem[] = [
  { key: 'crew.bob', label: 'Bob', color: { text: '#7c3aed', bg: 'rgba(124,58,237,0.14)' }, group: 'CREW' },
  { key: 'crew.mary', label: 'Mary', color: { text: '#7c3aed', bg: 'rgba(124,58,237,0.14)' }, group: 'CREW' },
  { key: 'loc.main', label: 'Main Street', color: { text: '#0f766e', bg: 'rgba(15,118,110,0.14)' }, group: 'LOCATION' },
];

export const RT_ATTRS: Record<string, { key: string; label: string }[]> = {
  'crew.bob': [
    { key: 'crew.bob.phone', label: 'Phone' },
    { key: 'crew.bob.email', label: 'Email' },
    { key: 'crew.bob.role', label: 'Role' },
  ],
  'crew.mary': [
    { key: 'crew.mary.phone', label: 'Phone' },
    { key: 'crew.mary.email', label: 'Email' },
    { key: 'crew.mary.role', label: 'Role' },
  ],
  'loc.main': [
    { key: 'loc.main.address', label: 'Address' },
    { key: 'loc.main.phone', label: 'Phone' },
  ],
};

export const resolveRTToken = (key: string) => {
  const t = [...RT_TOKENS, ...RT_REFS].find(x => x.key === key);
  if (t) return { label: t.label, color: t.color };
  const base = key.slice(0, key.lastIndexOf('.'));
  const ref = RT_REFS.find(r => r.key === base);
  const attr = RT_ATTRS[base]?.find(a => a.key === key);
  // The attribute reads as a nested lighter bubble inside the linked pill —
  // «Bob (Phone)» — while each bubble stays deletable on its own.
  if (ref && attr) return { label: attr.label, color: ref.color, nested: true };
  return null;
};

export const filterRTTokens = (q: string) =>
  [...RT_TOKENS, ...RT_REFS].filter(t => (t.key + ' ' + t.label).toLowerCase().includes(q.toLowerCase()));

/** Stage 2: the attributes of whatever REFERENCE chip the dot attaches to.
 *  Each returned `key` is inserted as a SECOND bubble after the reference —
 *  delete either bubble to detach just that part. */
export const rtAttributeItems = (chipKey: string, q: string): TokenItem[] => {
  const ref = RT_REFS.find(r => r.key === chipKey);
  if (!ref) return [];
  const query = q.trim().toLowerCase();
  return (RT_ATTRS[ref.key] ?? [])
    .filter(a => !query || a.label.toLowerCase().includes(query) || a.key.toLowerCase().includes(query))
    .map(a => ({ key: a.key, label: a.label, color: ref.color, group: ref.label }));
};

// Demo-only print resolution (sample values): an adjacent reference +
// attribute pair collapses to the ATTRIBUTE's value — the pairing rule the
// app's report resolver implements — while a lone token prints its own value.
export const RT_VALUES: Record<string, string> = {
  'cast.lead': 'GEORGE',
  'cast.supp': 'MARY',
  'scene.num': '23',
  'scene.int_ext': 'INT',
  'scene.loc': 'DINER',
  'day.1': 'Day 1',
  'crew.bob': 'Bob',
  'crew.bob.phone': '555-0134',
  'crew.bob.email': 'bob@example.com',
  'crew.bob.role': 'Gaffer',
  'crew.mary': 'Mary',
  'crew.mary.phone': '555-0142',
  'crew.mary.email': 'mary@example.com',
  'crew.mary.role': 'Best Boy',
  'loc.main': 'Main Street',
  'loc.main.address': '12 Main St',
  'loc.main.phone': '555-0100',
};

type RtPrintPart = { key: string } | { text: string };

export const rtPrint = (html: string): string => {
  const text = html.replace(/<[^>]*>/g, '');
  const re = /\{\{([^}]+)\}\}/g;
  const parts: RtPrintPart[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push({ text: text.slice(last, m.index) });
    parts.push({ key: m[1] });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last) });
  let out = '';
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    if ('text' in p) { out += p.text; continue; }
    const next = parts[i + 1];
    if (next && 'key' in next && next.key.startsWith(p.key + '.')) {
      out += RT_VALUES[next.key] ?? `«${next.key}»`;
      i++; // the pair consumed the reference — print only the attribute
    } else {
      out += RT_VALUES[p.key] ?? `«${p.key}»`;
    }
  }
  return out.trim() || '(empty)';
};
