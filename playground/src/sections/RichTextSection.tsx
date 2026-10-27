import React, { useState } from 'react';
import { Button, RichTextEditor, FormatToolbar, RICH_TEXT_STATE_IDLE } from '../../../src/index';
import type { RichTextEditorHandle, RichTextState } from '../../../src/index';
import { filterRTTokens, resolveRTToken, rtAttributeItems, rtPrint } from '../richTextDemo';
import { DemoCard } from '../shell/chrome';

/* Rich text editor (TipTap): token autocomplete, staged `@ref.attribute`
   tokens, and selection-level formatting runs. The stored HTML + the demo
   print resolution are shown below the editor. */

/** Minimal size box for the demo (the app ships LiveNumberInput; the kit
 *  renders a consumer slot). Commits live with `focus: false` so typing in
 *  the box never steals the editor's run selection. */
function RTSizeInput({ active, onCommit }: { active: RichTextState; onCommit: (size: string) => void }) {
  const [draft, setDraft] = React.useState<string | null>(null);
  const focused = React.useRef(false);
  React.useEffect(() => { if (!focused.current) setDraft(null); }, [active.fontSize, active.fontSizeMixed]);
  const parsed = active.fontSize ? String(parseInt(active.fontSize, 10) || '') : '';
  const display = draft !== null ? draft : (active.fontSizeMixed ? '' : parsed);
  return (
    <input
      type="number"
      aria-label="Font size"
      title="Font size (pt)"
      placeholder={active.fontSizeMixed ? 'Mixed' : ''}
      value={display}
      onFocus={() => { focused.current = true; setDraft(parsed); }}
      onChange={e => {
        setDraft(e.target.value);
        const n = parseInt(e.target.value, 10);
        onCommit(Number.isNaN(n) ? '' : `${n}pt`);
      }}
      onBlur={() => { focused.current = false; setDraft(null); }}
      className="h-7 w-14 rounded border border-zinc-700 bg-zinc-800 px-2 text-center text-[10px] text-zinc-300 outline-none focus:border-zinc-500"
    />
  );
}

function RichTextDemo() {
  const editorRef = React.useRef<RichTextEditorHandle>(null);
  const [value, setValue] = useState('');
  const [active, setActive] = useState<RichTextState>(RICH_TEXT_STATE_IDLE);
  const [lastClick, setLastClick] = useState('—');
  return (
    <div data-testid="rt-demo">
      <p className="label">
        TipTap editor: type <b>@</b> for the token autocomplete, select text and hit the
        toolbar, click a chip to select it (the stored value below stays byte-compatible
        plain <code>{'{{key}}'}</code> text). <b>Contextual formatting</b>: the font
        family / size controls and the clear-formatting button act on the SELECTION
        (a run), not the whole editor — select text, change Georgia/14pt, then check
        the stored HTML below. <b>Staged tokens</b>: pick a reference
        (“Bob”) then type <b>.</b> right after its chip for that item's attributes —
        the attribute lands as its OWN bubble next to the reference, so either
        side can be deleted on its own (delete “Phone”, type <b>.</b> again, pick
        “Email”). In a report the adjacent pair prints as the attribute's value
        (the reference is its anchor).
      </p>
      <div className="row">
        <FormatToolbar
          editorRef={editorRef}
          disabled={false}
          active={active}
          font={{ value: active.fontFamily, mixed: active.fontFamilyMixed, onChange: f => editorRef.current?.exec(f === 'Helvetica' ? 'unsetFontFamily' : 'fontFamily', f === 'Helvetica' ? undefined : f) }}
          fontSizeSlot={
            // Hold the ghost selection while the box has focus — the native
            // highlight is only painted while the editor itself is focused.
            <span onFocusCapture={() => editorRef.current?.holdSelectionHighlight(true)} onBlurCapture={() => editorRef.current?.holdSelectionHighlight(false)}>
              <RTSizeInput active={active} onCommit={size => editorRef.current?.exec(size ? 'fontSize' : 'unsetFontSize', size || undefined, { focus: false })} />
            </span>
          }
          showClearFormatting
        />
        <Button data-testid="rt-insert" variant="subtle" onClick={() => editorRef.current?.insertToken('cast.lead')}>
          Insert cast.lead
        </Button>
        <Button variant="subtle" onClick={() => editorRef.current?.insertToken('scene.loc')}>
          Insert scene.loc
        </Button>
      </div>
      <div className="row">
        <Button data-testid="rt-style-heading" variant="subtle" onClick={() => editorRef.current?.exec('textStyle', 'heading')}>
          Apply Heading style
        </Button>
        <Button data-testid="rt-style-clear" variant="subtle" onClick={() => editorRef.current?.exec('unsetTextStyle')}>
          Clear style
        </Button>
        <span className="label" data-testid="rt-style-state">
          linked style: {active.textStyleMixed ? 'Mixed' : active.textStyle || '—'}
        </span>
      </div>
      <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4" data-testid="rt-editor">
        <RichTextEditor
          ref={editorRef}
          value={value}
          onChange={setValue}
          onStateChange={setActive}
          placeholder="Write… type @ to insert a token"
          resolveToken={resolveRTToken}
          suggestionItems={filterRTTokens}
          attributeItems={rtAttributeItems}
          onTokenClick={(key) => setLastClick(key)}
        />
      </div>
      <div className="row">
        <span className="label" data-testid="rt-output">stored: {value ? value.slice(0, 140) : '(empty)'}</span>
        <span className="label" data-testid="rt-print">prints: {rtPrint(value)}</span>
        <span className="label">chip click: {lastClick}</span>
      </div>
    </div>
  );
}

export function RichTextSection() {
  return (
    <DemoCard
      wide
      label="Editor + toolbar"
      hint="Type @ for fields, pick a reference then type “.” for its attributes, and use the font/size/clear controls on a selection. The stored HTML and the demo print output update live below."
    >
      <RichTextDemo />
    </DemoCard>
  );
}
