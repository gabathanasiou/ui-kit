"use client";
import React, { useState } from 'react';
import { ChevronDown, Check, Underline as UnderlineIcon, Strikethrough, Link as LinkIcon } from 'lucide-react';
import DropdownMenu from './DropdownMenu';
import DropdownItem from './DropdownItem';
import Button from './Button';
import { TB_DIVIDER, TB_INPUT, useToolbarChrome } from './EditorChrome';
import { Tooltip } from './Tooltip';
import type { RichTextEditorHandle, RichTextState } from './RichTextEditor';

// ---- rich-text formatting toolbar (selection-aware, via the editor ref) --------

export const FONTS = ['Helvetica', 'Arial', 'Times New Roman', 'Georgia', 'Courier New'];

// Palette WITHOUT black: default ink is black in print/preview, so the first
// entry is a "Default" (no color) swatch — unset text renders light in the
// dark editor and falls back to black ink on paper.
const RT_COLORS = ['#b91c1c', '#b45309', '#15803d', '#1d4ed8', '#7c3aed', '#6b7280'];

/** "Default" swatch glyph — circle with a diagonal slash (no color). */
const NoColorDot: React.FC<{ className?: string }> = ({ className = 'w-3 h-3' }) => (
  <span className={`${className} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`}>
    <span className="absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" />
  </span>
);

// ---- font picker (custom dropdown, options styled in their own typeface) ------

export const FontMenu: React.FC<{ value: string; disabled: boolean; onChange: (f: string) => void }> = ({ value, disabled, onChange }) => {
  const [open, setOpen] = useState(false);
  const chrome = useToolbarChrome();
  return (
    <DropdownMenu
      open={open}
      onOpenChange={setOpen}
      theme="dark"
      width="w-44"
      trigger={
        <Button theme="dark" disabled={disabled} style={chrome.control} className="justify-between min-w-0">
          <span className="truncate" style={{ fontFamily: value || 'Helvetica' }}>{value || 'Helvetica'}</span>
          <ChevronDown className="w-3 h-3 text-zinc-500 shrink-0" />
        </Button>
      }
    >
      {FONTS.map(f => (
        <DropdownItem key={f} onClick={() => { onChange(f); setOpen(false); }} icon={f === value ? <Check className="w-3.5 h-3.5" /> : undefined}>
          <span style={{ fontFamily: f }}>{f}</span>
        </DropdownItem>
      ))}
    </DropdownMenu>
  );
};

// ---- link menu: apply/remove a hyperlink to the selection ----------------------

const LinkMenu: React.FC<{ editorRef: React.RefObject<RichTextEditorHandle | null>; disabled: boolean; active: boolean }> = ({ editorRef, disabled, active }) => {
  const [open, setOpen] = useState(false);
  const chrome = useToolbarChrome();
  const [url, setUrl] = useState('');
  const apply = () => {
    const trimmed = url.trim();
    if (trimmed) {
      editorRef.current?.exec('link', trimmed);
      setOpen(false);
    }
  };
  return (
    <DropdownMenu
      open={open}
      onOpenChange={setOpen}
      theme="dark"
      width="w-64"
      trigger={
        <Button
          theme="dark"
          active={active}
          disabled={disabled}
          onMouseDown={e => e.preventDefault()}
          style={{ ...chrome.toggle, padding: 0 }}
          className="justify-center"
          title="Link"
          aria-label="Link"
        >
          <LinkIcon className="w-3 h-3" />
        </Button>
      }
    >
      <div className="p-2 flex flex-col gap-2">
        <input
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="https://…"
          autoFocus
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); apply(); } }}
          style={chrome.input} className={TB_INPUT + ' w-full'}
        />
        <div className="flex items-center gap-2">
          <Button theme="dark" onClick={apply} style={chrome.control} disabled={!url.trim()}>
            Apply
          </Button>
          <Button
            theme="dark"
            onClick={() => { editorRef.current?.exec('unlink'); setOpen(false); }}
            style={chrome.control}
          >
            Remove
          </Button>
        </div>
      </div>
    </DropdownMenu>
  );
};

export interface FormatToolbarProps {
  editorRef: React.RefObject<RichTextEditorHandle | null>;
  disabled: boolean;
  /** Formatting at the caret/selection — lights the toggles up (Word-style). */
  active?: RichTextState;
  /** Axes pinned by a named style (whole-block) — button renders lit-but-dimmed
   *  with the given tooltip. Undefined = free. */
  lockedFormatting?: { bold?: string; italic?: string };
  /** Extra controls appended after the divider (e.g. an attribute picker). */
  trailing?: React.ReactNode;
}

export const FormatToolbar: React.FC<FormatToolbarProps> = ({ editorRef, disabled, active, lockedFormatting, trailing }) => {
  const [colorOpen, setColorOpen] = useState(false);
  const run = (cmd: string, value?: string) => editorRef.current?.exec(cmd, value);
  const chrome = useToolbarChrome();
  const locked = (axis: 'bold' | 'italic') => !!lockedFormatting?.[axis];
  return (
    <div className="flex items-center gap-1">
      <Tooltip content={lockedFormatting?.bold || 'Bold'}>
        <Button theme="dark" aria-label="Bold" active={(active?.bold ?? false) || locked('bold')} disabled={disabled || locked('bold')} onMouseDown={e => e.preventDefault()} onClick={() => run('bold')} style={{ ...chrome.toggle, padding: 0 }} className="justify-center font-bold">B</Button>
      </Tooltip>
      <Tooltip content={lockedFormatting?.italic || 'Italic'}>
        <Button theme="dark" aria-label="Italic" active={(active?.italic ?? false) || locked('italic')} disabled={disabled || locked('italic')} onMouseDown={e => e.preventDefault()} onClick={() => run('italic')} style={{ ...chrome.toggle, padding: 0 }} className="justify-center italic">I</Button>
      </Tooltip>
      <Tooltip content="Underline">
        <Button theme="dark" aria-label="Underline" active={active?.underline ?? false} disabled={disabled} onMouseDown={e => e.preventDefault()} onClick={() => run('underline')} style={{ ...chrome.toggle, padding: 0 }} className="justify-center"><UnderlineIcon className="w-3 h-3" /></Button>
      </Tooltip>
      <Tooltip content="Strikethrough">
        <Button theme="dark" aria-label="Strikethrough" active={active?.strike ?? false} disabled={disabled} onMouseDown={e => e.preventDefault()} onClick={() => run('strikeThrough')} style={{ ...chrome.toggle, padding: 0 }} className="justify-center"><Strikethrough className="w-3 h-3" /></Button>
      </Tooltip>
      <div className={TB_DIVIDER} />
      <LinkMenu editorRef={editorRef} disabled={disabled} active={active?.link ?? false} />
      <div className={TB_DIVIDER} />
      <DropdownMenu
        open={colorOpen}
        onOpenChange={setColorOpen}
        theme="dark"
        width="w-36"
        trigger={
          <Button theme="dark" disabled={disabled} style={chrome.control} className="justify-between min-w-0" title="Text color">
            {active?.color
              ? <span className="w-3 h-3 rounded-full border border-zinc-600 shrink-0" style={{ background: active.color }} />
              : <NoColorDot />}
            <ChevronDown className="w-3 h-3 text-zinc-500" />
          </Button>
        }
      >
        <div className="grid grid-cols-4 gap-1 p-2">
          <button
            onClick={() => { run('unsetColor'); setColorOpen(false); }}
            className={`w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${!active?.color ? 'ring-2 ring-zinc-300' : ''}`}
            title="Default (black ink)"
          >
            <NoColorDot className="w-3.5 h-3.5" />
          </button>
          {RT_COLORS.map(c => (
            <button
              key={c}
              onClick={() => { run('foreColor', c); setColorOpen(false); }}
              className={`w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors ${c === active?.color ? 'ring-2 ring-zinc-300' : ''}`}
              style={{ background: c }}
              title={c}
            />
          ))}
        </div>
      </DropdownMenu>
      {trailing && (
        <>
          <div className={TB_DIVIDER} />
          {trailing}
        </>
      )}
    </div>
  );
};
