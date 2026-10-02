#!/usr/bin/env node
// Deterministic guards against test-suite + agent-doc drift — ported
// (right-sized) from lemon_schedule/scripts/check-doc-budget.mjs. Wired into
// `npm run lint` (and `npm run lint:tests`).
//
// Why these checks exist (each one paid for itself in the app):
//  1. wait ratchet — `waitForTimeout` is the #1 flake source. Hold the count
//     at/below the baseline; a new wait must be paid for by removing one.
//  2. fragile selectors — inline-style / utility-class / parent selectors are
//     the documented drift cause; prefer role/testid/data-*.
//  3. suite caps — the browser suite is the expensive layer; growth must be
//     deliberate (merge/extend, or consciously raise a cap here).
//  4. orphan specs — every spec must be reachable from scripts/smart-test.mjs
//     RULES (or be @quarantine-only), or smart selection silently skips it.
//  5. doc budget — AGENTS.md loads into every session; keep it lean and move
//     detail to docs/*.md (see the write-agent-docs skill).
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SPECS_DIR = join(ROOT, 'playground/specs');

// --- Test-suite ratchets ------------------------------------------------------
// Morph/animation pacing in overlay-morph.spec.ts and the close-morph
// interleave is legitimate; everything else must be web-first.
const WAIT_BASELINE = 9;
const SPEC_CAP = 12;
// 67 = the current suite (66 original + the rich-text Mixed case); headroom of
// 3 so an in-flight feature can add focused cases without a cap debate.
const TEST_CAP = 70;

const specFiles = readdirSync(SPECS_DIR).filter(f => f.endsWith('.spec.ts')).sort();

let waitCount = 0;
let testCount = 0;
const fragile = [];
const FRAGILE_SELECTORS = [
  { re: /locator\((['"`])[^'"`]*\[style\*=/g, why: 'inline-style selector' },
  { re: /locator\((['"`])div\.[a-zA-Z]/g, why: 'utility-class selector' },
  { re: /locator\((['"`])\.\./g, why: 'parent (`..`) selector' },
  { re: /locator\((['"`])[^'"`]*\[class\*=/g, why: '[class*=] selector' },
];

const errors = [];
const warnings = [];

for (const f of specFiles) {
  const body = readFileSync(join(SPECS_DIR, f), 'utf8');
  waitCount += (body.match(/waitForTimeout\(/g) || []).length;
  testCount += (body.match(/^\s*test\(/gm) || []).length;
  const n = FRAGILE_SELECTORS.reduce((sum, { re }) => sum + (body.match(re)?.length || 0), 0);
  if (n) fragile.push(`${f} (${n})`);
}

console.log('Test hygiene: %d specs / %d tests (caps %d / %d); waitForTimeout %d / baseline %d.',
  specFiles.length, testCount, SPEC_CAP, TEST_CAP, waitCount, WAIT_BASELINE);

if (waitCount > WAIT_BASELINE) {
  errors.push(
    `waitForTimeout calls rose to ${waitCount} (baseline ${WAIT_BASELINE}) — prefer expect/expect.poll/waitForFunction.\n` +
      `  If a wait is genuine animation/interaction pacing, remove another or consciously lower WAIT_BASELINE in this script.`,
  );
}
if (specFiles.length > SPEC_CAP || testCount > TEST_CAP) {
  errors.push(
    `playground suite grew past its cap (${specFiles.length}/${SPEC_CAP} specs, ${testCount}/${TEST_CAP} tests) — ` +
      `extend an existing spec, push pure logic to a Vitest unit test, or consciously raise the cap (see docs/TESTING.md).`,
  );
}

// --- Orphan specs -------------------------------------------------------------
// Every spec must be reachable from the smart-test RULES map; otherwise
// `npm run test:smart` never selects it — the feature silently loses coverage.
const smartSrc = readFileSync(join(ROOT, 'scripts/smart-test.mjs'), 'utf8');
const orphanSpecs = [];
for (const f of specFiles) {
  const base = f.replace(/\.spec\.ts$/, '');
  if (smartSrc.includes(`'${base}'`)) continue;
  const titles = [...readFileSync(join(SPECS_DIR, f), 'utf8').matchAll(/\btest(?:\.\w+)?\(\s*['"`]([^'"`]*)/g)].map(m => m[1]);
  const excluded = titles.length > 0 && titles.every(t => /@quarantine/.test(t));
  if (!excluded) orphanSpecs.push(`playground/specs/${f}`);
}
console.log('Orphan specs: %d.', orphanSpecs.length);
if (orphanSpecs.length) {
  errors.push(
    `unmapped spec(s) — unreachable from scripts/smart-test.mjs RULES, so test:smart never selects them:\n  ` +
      `${orphanSpecs.join(', ')}\n  Fix: add the spec base name to a bucket in smart-test.mjs, or tag its tests @quarantine.`,
  );
}

// --- Doc budget ---------------------------------------------------------------
const HUB = { file: 'AGENTS.md', maxLines: 200, maxBytes: 36000 };
const MANUAL = { maxLines: 400, maxBytes: 50000 };

function measure(rel) {
  const text = readFileSync(join(ROOT, rel), 'utf8');
  return { text, lines: text.split('\n').length - (text.endsWith('\n') ? 1 : 0), bytes: Buffer.byteLength(text, 'utf8') };
}

const hub = measure(HUB.file);
console.log('Docs: AGENTS.md %d/%d lines, %s/%s B.', hub.lines, HUB.maxLines, hub.bytes, HUB.maxBytes);
if (hub.lines > HUB.maxLines || hub.bytes > HUB.maxBytes) {
  errors.push(
    `${HUB.file} is over budget (${hub.lines}/${HUB.maxLines} lines, ${hub.bytes}/${HUB.maxBytes} B).\n` +
      `  Fix: move detail to a docs/*.md manual and leave a summary + pointer (write-agent-docs skill).`,
  );
}

const docsDir = join(ROOT, 'docs');
let manuals = [];
try { manuals = readdirSync(docsDir).filter(f => f.endsWith('.md')).sort(); } catch { /* no docs/ yet */ }
for (const f of manuals) {
  const rel = `docs/${f}`;
  const m = measure(rel);
  if (m.lines > MANUAL.maxLines || m.bytes > MANUAL.maxBytes) {
    warnings.push(`${rel} is ${m.lines} lines — split it or move detail into a focused sibling doc.`);
  }
  const head = m.text.split('\n').slice(0, 8).join('\n');
  if (!/^#\s+\S/m.test(head)) warnings.push(`${rel} has no "# Title" in its first lines.`);
  if (!/read this|read before|status:/i.test(head)) warnings.push(`${rel} has no read-first/Status line in its first 8 lines.`);
}

if (fragile.length) {
  warnings.push(
    `fragile locator(s) in ${fragile.join(', ')} — prefer role/getByTestId/data-*; ` +
      `class selectors are the #1 documented drift cause.`,
  );
}

if (warnings.length) {
  console.log('\nWarnings (non-blocking):');
  for (const w of warnings) console.log(`  - ${w}`);
}
if (errors.length) {
  console.log('\nFAIL: test/doc hygiene.\n');
  for (const e of errors) console.log(`  - ${e}`);
  process.exit(1);
}
console.log('\nTest hygiene + doc budget OK.');
