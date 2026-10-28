import React, { useEffect, useRef } from 'react';
import { GridCellKind, TextCellEntry, type Item } from '@glideapps/glide-data-grid';
import { PickerField } from '../PickerField';
import type { PickerItem } from '../pickerModel';
import type { SearchMenuGroup } from '../searchMenuModel';
import { useCurrentDocument } from '../popout';

/**
 * Cell editors for `GlideSheet` — the seam where kit surfaces live INSIDE a
 * Glide cell.
 *
 * Glide's overlay editor is real DOM painted over the canvas while a cell is
 * open, so anything the kit ships can run in it (the rest of the grid stays
 * canvas). Two editor kinds are enough for spreadsheet-style grids:
 *
 *  - `text`  — a plain field (Enter commits, Escape cancels, Tab moves on);
 *  - `select` — a `PickerField` in its `inline` cell appearance, so the kit's
 *    ONE value picker (SearchMenu panel, groups, create-from-typed) is what
 *    opens in the cell + underneath it.
 *
 * `createGlideCellEditor` MUST be built once per grid lifetime (the caller
 * keeps config in a ref): recreating it builds new editor component types and
 * remounts an open overlay, which drops in-progress typing.
 */

export interface GlideTextEditor {
  kind: 'text';
  align?: 'left' | 'center' | 'right';
  uppercase?: boolean;
  placeholder?: string;
}

export interface GlideSelectEditor {
  kind: 'select';
  /** The catalogue. `resolveBy` decides whether the stored value is the id or
   *  the label. */
  items: PickerItem[];
  groups?: SearchMenuGroup[];
  resolveBy?: 'id' | 'label';
  placeholder?: string;
  /** Seed the panel with a value that differs from the rendered display text
   *  (an id-keyed picker whose cell shows a name). */
  seedValue?: string;
  /** `accordion` folds the groups, `open` lists them expanded. */
  browse?: 'open' | 'accordion';
  panelMinWidth?: number;
  /** Create-from-typed: label + hand-off for a value the catalogue lacks. */
  createLabel?: (typed: string) => string;
  onCreateItem?: (value: string) => void;
}

export type GlideColumnEditor = GlideTextEditor | GlideSelectEditor;

export interface GlideEditorOptions {
  readOnlyRef: React.MutableRefObject<boolean>;
  columns: { key: string; align?: 'left' | 'center' | 'right' }[];
  /** Reads the STORED cell value (used to decide whether a typed first key
   *  already replaced the value). */
  getValue: (row: number, colKey: string) => string;
  /** Per-column editors; columns without an entry use Glide's own editor. */
  editors?: Record<string, GlideColumnEditor>;
  /** Per-(row, column) editor — wins over `editors` when the options depend on
   *  the row. */
  getEditor?: (row: number, colKey: string) => GlideColumnEditor | undefined | null;
  /** Host for the picker panel (Glide's overlay layer). */
  portalRef: React.MutableRefObject<HTMLElement | null>;
  /** Glide's reported column → data column offset. Grids with a row-marker
   *  column use 1; marker-less grids use 0. */
  columnOffset?: number;
}

interface EditorBox {
  cfg: GlideColumnEditor | null;
  align?: 'left' | 'center' | 'right';
  /** Monotonic id: the SAME component instance is reused across sessions, so
   *  mount-only effects need to know a new session started. */
  activation: number;
  /** The first key was typed into the grid, not this field — do not select. */
  selectAllOnOpen: boolean;
  portal: HTMLElement | null;
}

export function createGlideCellEditor(getOpts: () => GlideEditorOptions | null) {
  const boxes = new Map<string, { current: EditorBox | null }>();
  const components = new Map<string, React.FunctionComponent<any>>();
  let activationCounter = 0;

  const editorFor = (colKey: string) => {
    let box = boxes.get(colKey);
    if (!box) {
      box = { current: null };
      boxes.set(colKey, box);
    }
    let Editor = components.get(colKey);
    if (!Editor) {
      Editor = (props: any) => {
        const { value: cellValue, onChange, onFinishedEditing, isHighlighted, validatedSelection, initialValue } = props;
        const current = box!.current as EditorBox;
        const { cfg, align, activation, selectAllOnOpen, portal } = current;
        const latestRef = useRef(cellValue);
        const committedRef = useRef(false);
        const inputRef = useRef<HTMLInputElement>(null);

        const push = (next: string) => {
          const cell = { kind: GridCellKind.Text, data: next, displayData: next, allowOverlay: true };
          latestRef.current = cell;
          onChange(cell);
        };
        const finish = () => onFinishedEditing(latestRef.current);
        const finishTab = () => onFinishedEditing(latestRef.current, [1, 0] as unknown as Item);
        const cancel = () => onFinishedEditing(undefined, [0, 0] as unknown as Item);

        useEffect(() => {
          if (activation < 0) return;
          const el = inputRef.current;
          if (!el) return;
          el.focus();
          // Select ONCE per activation: re-running on every keystroke would
          // select the character that was just typed.
          if (selectAllOnOpen) el.select();
          else el.setSelectionRange(el.value.length, el.value.length);
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [activation]);

        if (cfg === null) {
          return (
            <TextCellEntry
              style={align ? { textAlign: align } : undefined}
              highlight={isHighlighted}
              autoFocus={cellValue?.readonly !== true}
              disabled={cellValue?.readonly === true}
              altNewline
              value={cellValue?.data ?? ''}
              validatedSelection={validatedSelection}
              onChange={e => push(e.target.value)}
            />
          );
        }

        if (cfg.kind === 'text') {
          const apply = (raw: string) => push(cfg.uppercase ? raw.toUpperCase() : raw);
          return (
            <input
              ref={inputRef}
              className="ui-input"
              value={cellValue?.data ?? ''}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: 0,
                background: 'transparent',
                textAlign: cfg.align ?? align,
                outline: 'none',
              }}
              placeholder={cfg.placeholder}
              onChange={e => apply(e.target.value)}
              onKeyDown={e => {
                // Enter commits without moving the selection: the canvas keeps
                // focus so arrow keys keep navigating.
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  e.stopPropagation();
                  const value = latestRef.current;
                  window.setTimeout(() => onFinishedEditing(value), 0);
                }
              }}
            />
          );
        }

        // select — the kit's ONE value picker, in its inline cell appearance.
        const seed = cfg.seedValue ?? cellValue?.data ?? '';
        const handleChange = (values: string[]) => {
          committedRef.current = true;
          push(values[0] ?? '');
        };
        return (
          <div style={{ width: '100%', height: '100%' }} onKeyDown={e => e.stopPropagation()}>
            <PickerField
              appearance="inline"
              mode="single"
              values={seed ? [seed] : []}
              items={cfg.items}
              groups={cfg.groups}
              resolveBy={cfg.resolveBy ?? 'id'}
              onChange={handleChange}
              onExit={() => {
                if (committedRef.current) finish();
                else cancel();
              }}
              onTabExit={() => finishTab()}
              onEscape={() => {
                committedRef.current = false;
                cancel();
              }}
              placeholder={cfg.placeholder}
              defaultOpen
              autoFocus
              initialQuery={initialValue}
              selectAllOnOpen={selectAllOnOpen}
              browse={cfg.browse}
              panelMinWidth={cfg.panelMinWidth}
              createLabel={cfg.createLabel}
              onCreateItem={cfg.onCreateItem}
              portalTarget={portal}
              allowFreeText={false}
            />
          </div>
        );
      };
      components.set(colKey, Editor);
    }
    return { Editor, box };
  };

  return (cellData: any): { editor: React.FunctionComponent<any>; disablePadding?: boolean; styleOverride?: React.CSSProperties } | undefined => {
    const opts = getOpts();
    if (!opts) return undefined;
    const { readOnlyRef, columns, getValue, editors, getEditor, portalRef } = opts;
    const columnOffset = opts.columnOffset ?? 0;
    if (readOnlyRef.current) return undefined;
    const loc = cellData?.location as Item | undefined;
    if (!loc || cellData.kind !== GridCellKind.Text || cellData.readonly === true) return undefined;
    const [col, row] = loc;
    const colDef = columns[col - columnOffset];
    if (!colDef) return undefined;
    const colKey = colDef.key;
    let cfg = getEditor ? getEditor(row, colKey) : editors?.[colKey];
    if (cfg?.kind === 'text' && cfg.align === undefined && colDef.align) cfg = { ...cfg, align: colDef.align };
    const alignedStock = !cfg && (colDef.align === 'center' || colDef.align === 'right');
    if (!cfg && !alignedStock) return undefined;

    const stored = String(getValue(row, colKey) ?? '');
    const selectAllOnOpen = stored === (cellData.data ?? '');
    const { Editor, box } = editorFor(colKey);
    box.current = {
      cfg: cfg ?? null,
      align: colDef.align,
      activation: ++activationCounter,
      selectAllOnOpen,
      portal: portalRef.current,
    };
    if (!cfg || cfg.kind === 'text') return { editor: Editor };
    return { editor: Editor, disablePadding: true, styleOverride: { overflow: 'visible' } };
  };
}

/**
 * Escape while a cell editor is open cancels JUST that edit — an enclosing
 * dialog's Escape handler would otherwise close the whole modal before Glide
 * sees the key. Spread the result onto the DataEditor.
 */
export function useGlideEscapeCancel(): {
  onCellActivated: () => void;
  onFinishedEditing: () => void;
} {
  const currentDocument = useCurrentDocument();
  const openRef = useRef(false);
  useEffect(() => {
    const doc = currentDocument ?? (typeof document !== 'undefined' ? document : null);
    const win = doc?.defaultView;
    if (!win) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && openRef.current) e.preventDefault();
    };
    win.addEventListener('keydown', onKey, { capture: true });
    return () => win.removeEventListener('keydown', onKey, { capture: true });
  }, [currentDocument]);
  return {
    onCellActivated: () => { openRef.current = true; },
    onFinishedEditing: () => { openRef.current = false; },
  };
}
