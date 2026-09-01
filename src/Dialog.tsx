"use client";
import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { IS_COARSE, useCoarse } from './device';
import Modal from './Modal';
import ModalFooterButton from './ModalFooterButton';
import Checkbox from './Checkbox';
import { inputCls } from './input';

/* Confirm/prompt/alert dialogs render THROUGH the kit Modal (this file used
   to be its own Radix Dialog with bespoke chrome) — they inherit the whole
   Modal language for free: the standalone zoom-in/out, the stack FLIP morph
   (a dialog opened over a modal grows out of the modal's box), the
   one-dim-per-window backdrop (tokens.css [data-modal-stack]) and the
   footer Enter-confirm. The flat chrome keeps the classic dialog look — no
   header bar, no footer bar, the title row and buttons on the same surface
   as the body. The useDialog() API is unchanged. */

export interface ConfirmOptions {
  title: string;
  message?: string;
  danger?: boolean;
  suppressKey?: string;
}

export interface PromptOptions {
  title: string;
  defaultValue?: string;
  placeholder?: string;
  message?: string;
}

export interface AlertOptions {
  title: string;
  message?: string;
}

type DialogState =
  | { kind: 'confirm'; options: ConfirmOptions; resolve: (v: boolean) => void }
  | { kind: 'prompt'; options: PromptOptions; resolve: (v: string | null) => void }
  | { kind: 'alert'; options: AlertOptions; resolve: () => void }
  | null;

interface DialogContextType {
  confirm: (opts: ConfirmOptions) => Promise<boolean>;
  prompt: (opts: PromptOptions) => Promise<string | null>;
  alert: (opts: AlertOptions) => Promise<void>;
}

const DialogContext = createContext<DialogContextType | null>(null);

export function useDialog() {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error('useDialog must be used within DialogProvider');
  return ctx;
}

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [dialog, setDialog] = useState<DialogState>(null);
  const [suppressCheck, setSuppressCheck] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const coarse = useCoarse();
  const DIALOG_BODY = coarse ? 'space-y-5' : 'space-y-4';
  const DIALOG_DESC = coarse ? 'text-sm' : 'text-xs';
  const DIALOG_INPUT = inputCls();
  /* Mirror of `dialog` for the request helpers (they're stable useCallbacks
     and can't read the state). */
  const dialogRef = useRef(dialog);
  dialogRef.current = dialog;

  /* Single-slot semantics: a NEW dialog request supersedes the current one —
     resolve the pending dialog as DISMISSED (confirm→false, prompt→null,
     alert→resolved) so its awaited promise never hangs ("the danger confirm
     closed the prompt" — the prompt's await now settles instead of sticking). */
  const dismissCurrent = useCallback(() => {
    const cur = dialogRef.current;
    if (!cur) return;
    if (cur.kind === 'confirm') cur.resolve(false);
    else if (cur.kind === 'prompt') cur.resolve(null);
    else cur.resolve();
  }, []);

  const confirm = useCallback((opts: ConfirmOptions): Promise<boolean> => {
    if (opts.suppressKey) {
      const suppressedUntil = localStorage.getItem(opts.suppressKey);
      if (suppressedUntil && Date.now() < parseInt(suppressedUntil, 10)) {
        return Promise.resolve(true);
      }
    }
    return new Promise(resolve => {
      dismissCurrent();
      setSuppressCheck(false);
      setDialog({ kind: 'confirm', options: opts, resolve });
    });
  }, [dismissCurrent]);

  const prompt = useCallback((opts: PromptOptions): Promise<string | null> => {
    return new Promise(resolve => {
      dismissCurrent();
      setDialog({ kind: 'prompt', options: opts, resolve });
    });
  }, [dismissCurrent]);

  const alert = useCallback((opts: AlertOptions): Promise<void> => {
    return new Promise(resolve => {
      dismissCurrent();
      setDialog({ kind: 'alert', options: opts, resolve });
    });
  }, [dismissCurrent]);

  useEffect(() => {
    if (dialog) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [dialog]);

  const confirmAction = useCallback(() => {
    if (!dialog) return;
    if (dialog.kind === 'confirm') {
      const opts = dialog.options as ConfirmOptions;
      if (opts.suppressKey && suppressCheck) {
        localStorage.setItem(opts.suppressKey, String(Date.now() + 86400000));
      }
      dialog.resolve(true);
    } else if (dialog.kind === 'prompt') {
      dialog.resolve(inputRef.current?.value?.trim() || null);
    } else {
      dialog.resolve();
    }
    setDialog(null);
  }, [dialog, suppressCheck]);

  const open = dialog !== null;

  /* Enter = the primary action, ALWAYS — including when focus sits on the X
     close button (Radix focuses the first tabbable on open, which would
     otherwise make Enter cancel). Captured at document level so the
     content-level Modal Enter-confirm and any focused button never compete. */
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' || e.shiftKey || e.metaKey || e.ctrlKey || e.altKey || e.isComposing) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      confirmAction();
    };
    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [open, confirmAction]);

  const cancelAction = useCallback(() => {
    if (!dialog) return;
    if (dialog.kind === 'confirm') dialog.resolve(false);
    else if (dialog.kind === 'prompt') dialog.resolve(null);
    else dialog.resolve();
    setDialog(null);
  }, [dialog]);

  return (
    <DialogContext.Provider value={{ confirm, prompt, alert }}>
      {children}

      {/* Conditional render (NOT always-mounted): closing unmounts the Modal,
         so the close uses the UNMOUNT-driven clone — which captures the
         INTACT content DOM. An always-mounted <Modal open> would tear down
         the footer/children (footer={dialog && …}) in the same commit that
         flips open, and the open-flip clone would snapshot a stripped-down
         dialog (the weird half-size close animation). */}
      {open && (
      <Modal
        open
        onClose={cancelAction}
        closable={dialog?.kind !== 'alert'}
        /* Dialogs WITH a Cancel dismiss on backdrop (outside-click = Cancel);
           alerts have no Cancel — they need attention, backdrop is a no-op. */
        dismissOnBackdrop={dialog?.kind !== 'alert'}
        title={dialog?.options.title ?? ''}
        width="max-w-sm"
        flat
        footer={
          dialog && (
            <>
              {dialog.kind !== 'alert' && (
                <ModalFooterButton variant="ghost" onClick={cancelAction}>
                  Cancel
                </ModalFooterButton>
              )}
              {dialog.kind === 'alert' ? (
                <ModalFooterButton onClick={confirmAction}>OK</ModalFooterButton>
              ) : dialog.kind === 'confirm' ? (
                <ModalFooterButton
                  data-modal-confirm
                  variant="danger-solid"
                  onClick={confirmAction}
                >
                  Confirm
                </ModalFooterButton>
              ) : (
                <ModalFooterButton data-modal-confirm onClick={confirmAction}>
                  Save
                </ModalFooterButton>
              )}
            </>
          )
        }
      >
        <div className={DIALOG_BODY}>
          {dialog?.options.message && (
            <p className={`${DIALOG_DESC} text-zinc-400 leading-relaxed`}>
              {dialog.options.message}
            </p>
          )}

          {dialog?.kind === 'confirm' && (dialog.options as ConfirmOptions).suppressKey && (
            <Checkbox
              block
              checked={suppressCheck}
              onChange={setSuppressCheck}
              tone="danger"
              label="Don't ask again (24 hours)"
            />
          )}

          {dialog?.kind === 'prompt' && (
            <input
              ref={inputRef}
              type="text"
              defaultValue={dialog.options.defaultValue || ''}
              placeholder={dialog.options.placeholder}
              className={`w-full ${DIALOG_INPUT}`}
            />
          )}
        </div>
      </Modal>
      )}
    </DialogContext.Provider>
  );
}
