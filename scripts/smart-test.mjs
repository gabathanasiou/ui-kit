#!/usr/bin/env node
// Smart E2E selector — runs only the Playground specs your changes can touch.
//
//   npm run test:smart              # run affected specs
//   npm run test:smart -- --list    # just print the selection
//   SMART_BASE=origin/main npm run test:smart   # diff against a branch
//   npm run test:smart -- --full    # always run the entire suite
//
// Ported (right-sized) from lemon_schedule/scripts/smart-test.mjs:
//  1. Collect changed files (git working tree vs $BASE, incl. untracked/staged).
//  2. Every changed file maps through RULES below (source -> spec base names).
//     - 'ALL' (core shared surfaces) forces the full suite.
//     - A spec file change pulls in exactly that spec.
//     - An UNMAPPED src change runs canaries only, with a warning: add a rule
//       or run `npm run test:playground` before done.
//  3. Canaries (the core menu + morph specs) + last-run failures are always in.
//
// The rule map is a judgment call — extend it as the kit grows. Never
// second-guess an ALL entry; when in doubt, run the full suite.

import { execSync, execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = process.env.SMART_BASE || 'HEAD';
const SPECS = join(ROOT, 'playground/specs');

// ---- Spec buckets (base names under playground/specs/, no extension) ----
const MENUS = ['dropdown-menu', 'dropdown-highlight', 'context-menu', 'searchable-dropdown', 'modal-portal', 'modal-drag-dismiss'];
const RICH = ['rich-text-formatting', 'rich-text-staged-tokens'];
const CANARY = ['dropdown-menu', 'overlay-morph'];

// ---- Source -> specs map. First match wins per file. s: 'ALL' = full suite. ----
const RULES = [
  // tooling / unit tests don't affect the browser suite
  { g: 'scripts/**', s: [] },
  { g: 'src/**/*.test.ts', s: [] },
  { g: 'src/__tests__/**', s: [] },
  // core / shared surfaces — full suite
  { g: 'src/DropdownMenu.tsx', s: 'ALL' },
  { g: 'src/DropdownItem.tsx', s: 'ALL' },
  { g: 'src/overlayMorph.ts', s: 'ALL' },
  { g: 'src/overlayRegistry.ts', s: 'ALL' },
  { g: 'src/device.ts', s: 'ALL' },
  { g: 'src/popout.tsx', s: 'ALL' },
  { g: 'package*.json', s: 'ALL' },
  { g: 'playground/src/**', s: 'ALL' },
  { g: 'playground/index.html', s: 'ALL' },
  { g: 'playground/playground.css', s: 'ALL' },
  { g: 'playground/playwright*.config.ts', s: 'ALL' },
  { g: 'playground/pw-*.mjs', s: 'ALL' },
  { g: 'playground/specs/helpers.ts', s: 'ALL' },
  { g: 'vite.config.*', s: 'ALL' },
  { g: 'vitest.config.*', s: 'ALL' },
  { g: 'tsconfig*.json', s: 'ALL' },
  // menus / positioning / modality
  { g: 'src/DropdownSubmenu.tsx', s: MENUS },
  { g: 'src/ContextMenu.tsx', s: ['context-menu'] },
  { g: 'src/useDropdownPosition.ts', s: ['dropdown-flip', 'dropdown-highlight', 'searchable-dropdown', 'context-menu'] },
  { g: 'src/useLongPressMenu.tsx', s: ['context-menu', 'modal-drag-dismiss'] },
  { g: 'src/Modal.tsx', s: ['modal-portal', 'modal-drag-dismiss', 'dialog'] },
  { g: 'src/ModalFooterButton.tsx', s: ['dialog', 'modal-portal'] },
  { g: 'src/Dialog.tsx', s: ['dialog'] },
  { g: 'src/Button.tsx', s: [...MENUS, 'seg'] },
  { g: 'src/Checkbox.tsx', s: ['dialog'] },
  // switches / track chrome
  { g: 'src/FloatingToggle.tsx', s: ['seg'] },
  { g: 'src/Checklist.tsx', s: ['seg'] },
  // inputs
  { g: 'src/input.ts', s: ['searchable-dropdown', 'dialog'] },
  { g: 'src/numberInputMath.ts', s: ['number-input'] },
  { g: 'src/NumberInput.tsx', s: ['number-input'] },
  { g: 'src/index.ts', s: 'ALL' },
  { g: 'src/DatePicker.tsx', s: ['datepicker'] },
  // rich text
  { g: 'src/richText.ts', s: RICH },
  { g: 'src/tokenText.ts', s: RICH },
  { g: 'src/TokenExtension.tsx', s: RICH },
  { g: 'src/RichTextEditor.tsx', s: RICH },
  { g: 'src/FormatToolbar.tsx', s: RICH },
  { g: 'src/RichTextSuggestionPopup.tsx', s: RICH },
  { g: 'src/EditorChrome.tsx', s: [...RICH, 'seg'] },
];

// ---- tiny glob: supports `**` (any depth), `*` (within a segment) ----
function globRe(glob) {
  const parts = glob.split('/');
  const re = parts
    .map(p => {
      if (p === '**') return '(?:[^/]*(?:/[^/]*)*)?';
      return p.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '[^/]*');
    })
    .join('/');
  return new RegExp(`^${re}$`);
}
const compiled = RULES.map(({ g, s }) => ({ re: globRe(g), s }));

function firstMatch(file) {
  for (const { re, s } of compiled) if (re.test(file)) return s;
  return null;
}

// ---- collect changed files (working tree vs BASE, incl. untracked) ----
function gitOut(args) {
  try { return execSync(`git ${args}`, { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] }).toString(); }
  catch { return ''; }
}
// only these paths can affect the app under test; docs/scratch are ignored
function isRelevant(f) {
  return (
    f.startsWith('src/') || f.startsWith('playground/') || f.startsWith('scripts/') ||
    /^(package(?:-lock)?\.json|vite\.config\.[cm]?[jt]s?|vitest\.config\.[cm]?[jt]s?|tsconfig[\w-]*\.json)$/.test(f)
  );
}
function changedFiles() {
  const files = new Set();
  for (const line of gitOut(`diff --name-only ${BASE}`).split('\n')) if (line.trim()) files.add(line.trim());
  for (const line of gitOut(`ls-files --others --exclude-standard`).split('\n')) if (line.trim()) files.add(line.trim());
  return [...files].filter(isRelevant).sort();
}

function execInherit(bin, args) {
  try { execFileSync(bin, args, { cwd: ROOT, stdio: 'inherit' }); process.exit(0); }
  catch (e) { process.exit(typeof e.status === 'number' ? e.status : 1); }
}

function run(sel, listOnly) {
  if (listOnly) {
    console.log(sel && sel.length ? sel.join('\n') : '(full suite)');
    return;
  }
  if (!sel) {
    console.log('running FULL suite');
    execInherit('npx', ['playwright', 'test', '-c', 'playground/playwright.config.ts']);
  }
  console.log(`running ${sel.length} spec(s):`);
  console.log(sel.map(s => '  ' + s).join('\n'));
  execInherit('npx', ['playwright', 'test', '-c', 'playground/playwright.config.ts', ...sel]);
}

function main() {
  const listOnly = process.argv.includes('--list');
  const forceFull = process.argv.includes('--full');
  const changed = changedFiles();
  if (forceFull) { console.log('--full: running entire suite'); run(null, false); process.exit(0); }
  if (changed.length === 0) {
    console.log(`no changes since ${BASE} — nothing to run. Use --full.`);
    process.exit(0);
  }

  const wanted = new Set(CANARY.map(s => `${SPECS}/${s}.spec.ts`));
  const matched = [], unmatched = [];
  let full = false;
  for (const file of changed) {
    if (/^playground\/specs\/.+\.spec\.ts$/.test(file)) { matched.push(file); wanted.add(file); continue; }
    const s = firstMatch(file);
    if (s === 'ALL') { full = true; break; }
    if (s) { matched.push(file); s.forEach(spec => wanted.add(`${SPECS}/${spec}.spec.ts`)); }
    else unmatched.push(file);
  }

  // last-run failures are always retried
  try {
    const lr = JSON.parse(readFileSync(join(ROOT, 'test-results/.last-run.json'), 'utf8'));
    for (const t of lr.failedTests ?? []) {
      const m = String(t).match(/^(?:\[[^\]]+\]\s*›\s*)?(playground\/specs\/[\w-]+\.spec\.ts)/);
      if (m) wanted.add(m[1]);
    }
  } catch {}

  if (full) {
    console.log(`core/config change detected — running FULL suite.`);
    run(null, listOnly);
    process.exit(0);
  }
  if (unmatched.length) {
    console.warn('\nUNMAPPED changes (cannot attribute to specs) — running canaries only:');
    for (const f of unmatched) console.warn('  ' + f);
    console.warn('Add a mapping rule in scripts/smart-test.mjs, or run `npm run test:playground` before done.\n');
  }
  console.log(`smart selection from ${BASE} (${changed.length} changed):`);
  for (const f of changed) console.log('  - ' + f);
  run([...wanted].sort(), listOnly);
}

main();
