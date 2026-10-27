import React, { useState } from 'react';
import {
  Button, Modal, ModalFooter, ModalFooterButton, DropdownMenu, DropdownItem, SearchMenu,
  RichTextEditor, FormatToolbar, LongPressMenuProvider, ContextMenu, ContextMenuItem,
  ContextMenuDivider, RICH_TEXT_STATE_IDLE, CardSection, useInputSize,
} from '../../../src/index';
import type { RichTextEditorHandle, RichTextState, SearchMenuItem } from '../../../src/index';
import { FLAT_ITEMS } from '../demoData';
import { filterRTTokens, resolveRTToken } from '../richTextDemo';
import { DemoCard } from '../shell/chrome';

/* Modals: the basic shell, the iPad keyboard test, stacking, menus + SearchMenu
   portaled over a modal, a rich-text editor inside one, and the CardSection
   field pattern. Each card owns one trigger. */

const MENU_ITEMS = ['Hold', 'Travel', 'Day Off', 'Rehearsal'];

function BasicModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="row" data-testid="basic-modal-demo">
      <Button data-testid="modal-open" onClick={() => setOpen(true)}>Open basic modal</Button>
      {open && (
        <Modal open onClose={() => setOpen(false)} title="Basic modal" width="max-w-md"
          footer={
            <ModalFooter>
              <ModalFooterButton variant="ghost" onClick={() => setOpen(false)}>Cancel</ModalFooterButton>
              <ModalFooterButton onClick={() => setOpen(false)}>OK</ModalFooterButton>
            </ModalFooter>
          }
        >
          <div className="p-6 space-y-5">
            <p>A plain modal. The morph (FLIP zoom) plays on open and close.</p>
            <ModalFooterButton variant="danger-solid" onClick={() => setOpen(false)}>Danger confirm</ModalFooterButton>
          </div>
        </Modal>
      )}
    </div>
  );
}

function KeyboardModalDemo() {
  /* iPad virtual-keyboard repro: open this on the iPad and focus the input.
     The readout shows the layout viewport (never resized by the keyboard) vs
     the visual viewport (shrinks when the keyboard opens + pans via offsetTop).
     The kit Modal re-centers into the visual viewport on vv resize/scroll. */
  const [open, setOpen] = useState(false);
  const [vp, setVp] = useState(() => ({
    vh: typeof window !== 'undefined' ? window.visualViewport?.height ?? window.innerHeight : 0,
    top: typeof window !== 'undefined' ? window.visualViewport?.offsetTop ?? 0 : 0,
    ih: typeof window !== 'undefined' ? window.innerHeight : 0,
    focused: false,
  }));
  const [input, setInput] = useState('');
  React.useEffect(() => {
    const vv = window.visualViewport;
    const update = () => setVp({
      vh: vv?.height ?? window.innerHeight,
      top: vv?.offsetTop ?? 0,
      ih: window.innerHeight,
      focused: document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA',
    });
    if (!vv) return;
    vv.addEventListener('resize', update);
    vv.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    return () => { vv.removeEventListener('resize', update); vv.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);
  return (
    <div className="row" data-testid="keyboard-modal-demo">
      <Button data-testid="kb-modal-open" onClick={() => setOpen(true)}>Keyboard test (iPad)</Button>
      {open && (
        <Modal open onClose={() => setOpen(false)} title="Keyboard test" width="max-w-md"
          footer={
            <ModalFooter>
              <ModalFooterButton variant="ghost" onClick={() => setOpen(false)}>Cancel</ModalFooterButton>
              <ModalFooterButton onClick={() => setOpen(false)}>Save</ModalFooterButton>
            </ModalFooter>
          }
        >
          <div className="p-6 space-y-4">
            <p>Focus the input — watch whether the modal (or the whole page) moves when the keyboard opens.</p>
            <div data-testid="kb-vp-readout" style={{ fontSize: 12, fontFamily: 'monospace', color: '#a1a1aa', lineHeight: 1.6 }}>
              innerHeight (layout): {vp.ih}
              <br />
              visualViewport.height: {vp.vh}
              <br />
              visualViewport.offsetTop: {vp.top}
              <br />
              focused: {String(vp.focused)}
            </div>
            <input
              data-testid="kb-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onFocus={() => setVp(s => ({ ...s, focused: true }))}
              onBlur={() => setVp(s => ({ ...s, focused: false }))}
              placeholder="Tap me — watch the readout + modal position"
              className="w-full px-3 py-2 text-sm ui-input"
            />
            <textarea
              data-testid="kb-textarea"
              placeholder="And this textarea…"
              rows={4}
              className="w-full px-3 py-2 text-sm ui-input"
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

function StackedModalDemo() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  return (
    <div className="row" data-testid="stacked-modal-demo">
      <Button data-testid="stacked-open" onClick={() => setOpen1(true)}>Open stacked modals</Button>
      {open1 && (
        <Modal open onClose={() => setOpen1(false)} title="Modal 1" width="max-w-md"
          footer={
            <ModalFooter>
              <ModalFooterButton onClick={() => setOpen2(true)}>Open Modal 2</ModalFooterButton>
              <ModalFooterButton variant="ghost" onClick={() => setOpen1(false)}>Close</ModalFooterButton>
            </ModalFooter>
          }
        >
          <div className="p-6 space-y-5"><p>Bottom modal.</p></div>
        </Modal>
      )}
      {open2 && (
        <Modal open onClose={() => setOpen2(false)} title="Modal 2" width="max-w-sm"
          footer={
            <ModalFooter>
              <ModalFooterButton variant="ghost" onClick={() => setOpen2(false)}>Close</ModalFooterButton>
            </ModalFooter>
          }
        >
          <div className="p-6 space-y-5"><p>Top modal.</p></div>
        </Modal>
      )}
    </div>
  );
}

function MenuInsideModal() {
  /* The app's portal surface: a DropdownMenu inside a Modal. Radix portals
     the menu content to the body — this exercises portal target, z-order,
     Escape (must close ONLY the menu), the morph anchor, and wheel scroll
     for a LONG list portaled over the modal. */
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [longMenuOpen, setLongMenuOpen] = useState(false);
  /* Roadmap 318: the app's real case — a SearchMenu (button→field morph) whose
     panel portals OUTSIDE the modal's dialog. Selecting a row must close the
     panel and update the field; the modal's focus trap must not eat the click. */
  const [searchPick, setSearchPick] = useState(FLAT_ITEMS[2].id);
  return (
    <div className="row" data-testid="menu-in-modal">
      <Button data-testid="menu-modal-open" onClick={() => setOpen(true)}>Menus over a modal</Button>
      {open && (
        <Modal open onClose={() => setOpen(false)} title="Modal + menu" width="max-w-md"
          footer={
            <ModalFooter>
              <ModalFooterButton variant="ghost" onClick={() => setOpen(false)}>Close</ModalFooterButton>
            </ModalFooter>
          }
        >
          <div className="p-6 space-y-5">
            <p>Menu portaled from inside this modal:</p>
            <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen} theme="dark" width="w-44"
              trigger={
                <Button theme="dark" variant="primary" data-testid="inmodal-menu-trigger">In-modal menu</Button>
              }
            >
              {MENU_ITEMS.map(it => <DropdownItem key={it} onClick={() => setMenuOpen(false)}>{it}</DropdownItem>)}
            </DropdownMenu>
            <p>Long menu over the modal (wheel-scrollable):</p>
            <DropdownMenu open={longMenuOpen} onOpenChange={setLongMenuOpen} theme="dark"
              trigger={
                <Button theme="dark" variant="primary" data-testid="inmodal-long-trigger">Long menu in modal</Button>
              }
            >
              {Array.from({ length: 30 }, (_, i) => (
                <DropdownItem key={i} onClick={() => setLongMenuOpen(false)}>Item {i + 1}</DropdownItem>
              ))}
            </DropdownMenu>
            <p>SearchMenu over the modal (select a row → panel closes, value updates):</p>
            <SearchMenu
              items={FLAT_ITEMS}
              browseAll
              selectedId={searchPick}
              onSelect={(item: SearchMenuItem) => setSearchPick(item.id)}
              triggerLabel={FLAT_ITEMS.find(i => i.id === searchPick)?.label || 'Choose…'}
              theme="dark"
              placeholder="Search rows…"
              collapsedWidth={220}
              expandedWidth={240}
              panelWidth={300}
              maxMenuHeight={240}
            />
            <span className="label" data-testid="inmodal-search-pick">pick: {searchPick}</span>
            <p>
              Escape while the menu is open must dismiss ONLY the menu — the
              modal stays. Escape with the menu closed closes the modal.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}

function RichTextModalDemo() {
  const [open, setOpen] = useState(false);
  const editorRef = React.useRef<RichTextEditorHandle>(null);
  const [value, setValue] = useState('');
  const [active, setActive] = useState<RichTextState>(RICH_TEXT_STATE_IDLE);
  const [ctx, setCtx] = useState<{ x: number; y: number } | null>(null);
  const [pick, setPick] = useState('—');
  return (
    <div className="row" data-testid="rt-modal-demo">
      <Button data-testid="rt-modal-open" onClick={() => setOpen(true)}>Rich text + long-press modal</Button>
      {open && (
        <Modal open onClose={() => setOpen(false)} title="Rich text + long-press" width="max-w-lg"
          footer={
            <ModalFooter>
              <ModalFooterButton variant="ghost" onClick={() => setOpen(false)}>Cancel</ModalFooterButton>
              <ModalFooterButton onClick={() => setOpen(false)}>Save</ModalFooterButton>
            </ModalFooter>
          }
        >
          <div className="p-5 space-y-4">
            <p className="label">Editor inside a modal — type @ for tokens, use the toolbar, or long-press the box (touch).</p>
            <FormatToolbar editorRef={editorRef} disabled={false} active={active} />
            <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4" data-testid="rt-modal-editor">
              <RichTextEditor
                ref={editorRef}
                value={value}
                onChange={setValue}
                onStateChange={setActive}
                placeholder="Write… @ = token"
                resolveToken={resolveRTToken}
                suggestionItems={filterRTTokens}
              />
            </div>
            <LongPressMenuProvider>
              <div
                data-context-menu
                data-testid="rt-lp-target"
                onContextMenu={(e) => { e.preventDefault(); setCtx({ x: e.clientX, y: e.clientY }); }}
                style={{ border: '1px dashed #3f3f46', padding: '12px 16px', borderRadius: 8, fontSize: 12, color: '#a1a1aa' }}
              >
                Long-press me (touch) for a menu
              </div>
            </LongPressMenuProvider>
            <ContextMenu open={!!ctx} x={ctx?.x ?? 0} y={ctx?.y ?? 0} onClose={() => setCtx(null)}>
              <ContextMenuItem onClick={() => { setPick('Inline action'); setCtx(null); }}>Inline action</ContextMenuItem>
              <ContextMenuDivider />
              <ContextMenuItem variant="danger" onClick={() => { setPick('Delete'); setCtx(null); }}>Delete</ContextMenuItem>
            </ContextMenu>
            <span className="label">pick: {pick}</span>
          </div>
        </Modal>
      )}
    </div>
  );
}

function CardSectionDemo() {
  const inputSize = useInputSize();
  const [open, setOpen] = useState(false);
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const [c, setC] = useState(false);
  return (
    <div className="row" data-testid="card-section-demo">
      <Button data-testid="card-open" onClick={() => setOpen(true)}>Sections + fields</Button>
      {open && (
        <Modal open onClose={() => setOpen(false)} title="Sections + fields" width="max-w-lg"
          footer={
            <ModalFooter>
              <ModalFooterButton variant="ghost" onClick={() => setOpen(false)}>Cancel</ModalFooterButton>
              <ModalFooterButton onClick={() => setOpen(false)}>Save</ModalFooterButton>
            </ModalFooter>
          }
        >
          <div className="p-5 space-y-4">
            <p className="label">Sections (raised .ui-card) vs fields (.ui-input) — distinct fills via tokens.</p>
            <CardSection title="Project details" count="2" collapsed={a} onToggle={() => setA(!a)}>
              <input style={inputSize} className="w-full ui-input" placeholder="Title…" />
              <input style={inputSize} className="w-full ui-input" placeholder="Studio…" />
            </CardSection>
            <CardSection title="Dates" count="3" collapsed={b} onToggle={() => setB(!b)}>
              <div className="flex items-center gap-2 px-1 py-1">
                <span className="text-[10px] text-zinc-500 w-20 shrink-0">Shooting</span>
                <input style={inputSize} className="flex-1 ui-input" defaultValue="Jun 3" />
              </div>
              <div className="flex items-center gap-2 px-1 py-1">
                <span className="text-[10px] text-zinc-500 w-20 shrink-0">Prep</span>
                <input style={inputSize} className="flex-1 ui-input" defaultValue="May 20" />
              </div>
            </CardSection>
            <CardSection title="Danger zone" count="1" tone="danger" collapsed={c} onToggle={() => setC(!c)}>
              <button className="w-full text-left text-xs text-red-400 hover:bg-red-950/30 rounded px-2 py-1.5">Delete project…</button>
            </CardSection>
          </div>
        </Modal>
      )}
    </div>
  );
}

export function ModalsSection() {
  return (
    <>
      <DemoCard label="Basic modal" hint="FLIP zoom on open/close; footer + Enter-confirm.">
        <BasicModalDemo />
      </DemoCard>
      <DemoCard label="Stacked" hint="The child grows out of the parent's box; closing reveals the survivor.">
        <StackedModalDemo />
      </DemoCard>
      <DemoCard label="Portals over a modal" hint="Menus, a long scrollable menu, and a SearchMenu all open above the modal; Escape closes only the top surface.">
        <MenuInsideModal />
      </DemoCard>
      <DemoCard label="Keyboard test" hint="iPad: focus the field and watch the visual-viewport readout + modal position.">
        <KeyboardModalDemo />
      </DemoCard>
      <DemoCard label="Sections & fields" hint="CardSection (raised) vs inputs (wells) inside a modal.">
        <CardSectionDemo />
      </DemoCard>
      <DemoCard label="Rich text in a modal" hint="TipTap + toolbar + long-press menu inside the modal shell.">
        <RichTextModalDemo />
      </DemoCard>
    </>
  );
}
