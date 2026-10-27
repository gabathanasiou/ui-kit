import React, { useState } from 'react';
import { Button, Modal, ModalFooter, ModalFooterButton, useDialog } from '../../../src/index';
import { DemoCard } from '../shell/chrome';

/* Dialogs (confirm / prompt / alert through the Modal) + a dialog spawning
   another dialog. The status line beside each trigger mirrors the promise
   result, so every resolve path is visible. */

function DialogSpawnDemo() {
  /* A dialog spawning ANOTHER dialog — the child stacks over the parent and
     FLIP-morphs out of its box (the same stack morph as dialogs-over-modals).
     Back/Cancel close the nested dialog and reveal the outer one; Save closes
     both. The nested surface is a flat Modal so the demo controls the footer. */
  const [hostOpen, setHostOpen] = useState(false);
  const [nestedOpen, setNestedOpen] = useState(false);
  const [last, setLast] = useState('—');
  return (
    <div className="row" data-testid="dlg-spawn-demo">
      <Button data-testid="dlg-spawn-open" onClick={() => setHostOpen(true)}>Dialog that spawns another</Button>
      <span className="label">last: {last}</span>
      {hostOpen && (
        <Modal open onClose={() => setHostOpen(false)} title="Outer dialog" width="max-w-sm" flat
          footer={
            <>
              <ModalFooterButton variant="ghost" onClick={() => setHostOpen(false)}>Cancel</ModalFooterButton>
              <ModalFooterButton data-modal-confirm onClick={() => setHostOpen(false)}>Confirm</ModalFooterButton>
            </>
          }
        >
          <div className="space-y-4">
            <p className="label">Spawn the nested dialog — it grows OUT of this box (stack FLIP).</p>
            <Button data-testid="dlg-spawn-child" variant="subtle" onClick={() => setNestedOpen(true)}>Spawn nested dialog</Button>
          </div>
        </Modal>
      )}
      {nestedOpen && (
        <Modal open onClose={() => setNestedOpen(false)} title="Nested dialog" width="max-w-sm" flat
          footer={
            <>
              <ModalFooterButton variant="ghost" data-testid="dlg-nested-back" onClick={() => setNestedOpen(false)}>Back</ModalFooterButton>
              <ModalFooterButton variant="ghost" data-testid="dlg-nested-cancel" onClick={() => { setLast('cancelled'); setNestedOpen(false); setHostOpen(false); }}>Cancel</ModalFooterButton>
              <ModalFooterButton data-modal-confirm data-testid="dlg-nested-save" onClick={() => { setLast('nested → saved'); setNestedOpen(false); setHostOpen(false); }}>Save</ModalFooterButton>
            </>
          }
        >
          <div className="space-y-4">
            <p className="label">Back → return to the outer dialog. Cancel → abort everything. Save → closes both.</p>
            <input data-testid="dlg-nested-input" className="w-full px-3 py-2 text-sm ui-input" placeholder="Some field…" />
          </div>
        </Modal>
      )}
    </div>
  );
}

export function DialogsSection() {
  const dialog = useDialog();
  const [last, setLast] = useState<string>('—');
  const [hostOpen, setHostOpen] = useState(false);
  const DNWA_KEY = 'playground_dnwa_empty_trash';
  return (
    <>
      <DemoCard
        wide
        label="Confirm / danger / prompt / alert"
        hint="All four render through the Modal (flat chrome, one dim layer). The danger confirm carries the “don't warn again” suppression; Reset clears it."
      >
        <div className="row" data-testid="dialog-demo">
          <Button data-testid="dlg-confirm" onClick={async () => { const ok = await dialog.confirm({ title: 'Delete Scene?', message: 'This can be restored from Trash.' }); setLast(`confirm → ${ok}`); }}>
            Confirm
          </Button>
          <Button data-testid="dlg-danger" onClick={async () => {
            const suppressed = !!localStorage.getItem(DNWA_KEY) && Date.now() < parseInt(localStorage.getItem(DNWA_KEY)!, 10);
            const ok = await dialog.confirm({ title: 'Empty Trash?', message: 'Permanently delete all trash items?', danger: true, suppressKey: DNWA_KEY });
            setLast(suppressed && ok ? 'danger → true (suppressed)' : `danger → ${ok}`);
          }}>
            Danger confirm + DNWA
          </Button>
          <Button variant="subtle" data-testid="dnwa-reset" onClick={() => { localStorage.removeItem(DNWA_KEY); setLast('dnwa reset'); }}>
            Reset DNWA
          </Button>
          <Button data-testid="dlg-prompt" onClick={async () => { const v = await dialog.prompt({ title: 'Project Name', defaultValue: 'Untitled Project', placeholder: 'Project name' }); setLast(`prompt → ${v}`); }}>
            Prompt
          </Button>
          <Button data-testid="dlg-alert" onClick={async () => { await dialog.alert({ title: 'Saved', message: 'Your project is up to date.' }); setLast('alert → ok'); }}>
            Alert
          </Button>
          <Button data-testid="dlg-over-host" onClick={() => setHostOpen(true)}>
            Dialog over a host modal
          </Button>
          <span className="label" data-testid="dialog-status">last: {last}</span>
        </div>
        {hostOpen && (
          <Modal
            open
            onClose={() => setHostOpen(false)}
            title="Host modal"
            width="max-w-md"
            footer={
              <ModalFooter>
                <ModalFooterButton variant="ghost" onClick={() => setHostOpen(false)}>Close</ModalFooterButton>
              </ModalFooter>
            }
          >
            <div className="p-6 space-y-5">
              <p>An alert opened here morphs OUT OF THIS BOX (stack FLIP); the dim stays one layer.</p>
              <Button data-testid="dlg-in-host" onClick={async () => { const ok = await dialog.confirm({ title: 'Over modal', message: 'Confirm from inside the host modal.', danger: true }); setLast(`over-modal → ${ok}`); }}>
                Danger confirm over modal
              </Button>
            </div>
          </Modal>
        )}
      </DemoCard>

      <DemoCard wide label="Dialog spawning a dialog" hint="Back returns to the outer dialog, Cancel aborts the whole stack, Save closes both — the stack FLIP plays on every move.">
        <DialogSpawnDemo />
      </DemoCard>
    </>
  );
}
