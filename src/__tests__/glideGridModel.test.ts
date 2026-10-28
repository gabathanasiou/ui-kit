import { describe, it, expect } from 'vitest';
import { CompactSelection, type GridSelection } from '@glideapps/glide-data-grid';
import {
  effectiveGridRange,
  expandRangeFill,
  parseClipboardGrid,
  planGridClear,
  planGridPaste,
} from '../glide/gridModel';

/* The pure spreadsheet geometry behind GlideSheet: selection → rectangle,
   range fill, paste and clear. Keeping it here (not in the component) is what
   keeps the canvas wrapper thin and testable without a browser. */

function selectionWithRange(x: number, y: number, width: number, height: number): GridSelection {
  return {
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty(),
    current: {
      cell: [x, y],
      range: { x, y, width, height },
      rangeStack: [],
    },
  } as unknown as GridSelection;
}

const COLS = [{ key: 'a' }, { key: 'b' }, { key: 'actions' }, { key: 'c' }];

describe('effectiveGridRange', () => {
  it('prefers the active range', () => {
    expect(effectiveGridRange(selectionWithRange(1, 2, 2, 3), 10, 4)).toEqual({ x: 1, y: 2, width: 2, height: 3 });
  });

  it('falls back to the bounding box of selected rows', () => {
    const selection = {
      columns: CompactSelection.empty(),
      rows: CompactSelection.fromSingleSelection([2, 4]),
      current: undefined,
    } as unknown as GridSelection;
    // Glide slices are half-open: [2, 4] selects rows 2 and 3.
    expect(effectiveGridRange(selection, 10, 4)).toEqual({ x: 0, y: 2, width: 4, height: 2 });
  });

  it('falls back to selected columns, and is null with no selection', () => {
    const selection = {
      columns: CompactSelection.fromSingleSelection([1, 2]),
      rows: CompactSelection.empty(),
      current: undefined,
    } as unknown as GridSelection;
    expect(effectiveGridRange(selection, 10, 4)).toEqual({ x: 1, y: 0, width: 1, height: 10 });
    expect(effectiveGridRange(null, 10, 4)).toBeNull();
  });

  it('clamps selected rows to the real row count', () => {
    const selection = {
      columns: CompactSelection.empty(),
      rows: CompactSelection.fromSingleSelection([8, 20]),
      current: undefined,
    } as unknown as GridSelection;
    expect(effectiveGridRange(selection, 10, 4)).toEqual({ x: 0, y: 8, width: 4, height: 2 });
  });
});

describe('expandRangeFill', () => {
  it('fills every cell in the range, skipping the actions column', () => {
    const edits = expandRangeFill({ x: 0, y: 1, width: 4, height: 2 }, COLS, 'X');
    expect(edits.map(e => `${e.row}:${e.colKey}`)).toEqual([
      '1:a', '1:b', '1:c',
      '2:a', '2:b', '2:c',
    ]);
    expect(edits.every(e => e.val === 'X')).toBe(true);
  });

  it('restricts the spread to one column when asked', () => {
    const edits = expandRangeFill({ x: 0, y: 0, width: 3, height: 3 }, COLS, 'Y', 1);
    expect(edits).toEqual([
      { row: 0, colKey: 'b', val: 'Y' },
      { row: 1, colKey: 'b', val: 'Y' },
      { row: 2, colKey: 'b', val: 'Y' },
    ]);
  });
});

describe('planGridPaste', () => {
  it('spreads a block from the target cell', () => {
    const edits = planGridPaste([0, 0], [['a1', 'b1'], ['a2', 'b2']], 5, COLS, null);
    expect(edits).toEqual([
      { row: 0, colKey: 'a', val: 'a1' },
      { row: 0, colKey: 'b', val: 'b1' },
      { row: 1, colKey: 'a', val: 'a2' },
      { row: 1, colKey: 'b', val: 'b2' },
    ]);
  });

  it('repeats the pattern over a taller selection and stops at the last row', () => {
    const edits = planGridPaste([0, 3], [['one'], ['two']], 5, COLS, { x: 0, y: 3, width: 1, height: 3 });
    expect(edits).toEqual([
      { row: 3, colKey: 'a', val: 'one' },
      { row: 4, colKey: 'a', val: 'two' },
    ]);
  });

  it('is empty for an empty clipboard', () => {
    expect(planGridPaste([0, 0], [], 5, COLS, null)).toEqual([]);
  });
});

describe('planGridClear', () => {
  it('clears only writable columns', () => {
    const edits = planGridClear({ x: 0, y: 0, width: 4, height: 1 }, COLS, new Set(['a', 'c']));
    expect(edits).toEqual([
      { row: 0, colKey: 'a', val: '' },
      { row: 0, colKey: 'c', val: '' },
    ]);
  });
});

describe('parseClipboardGrid', () => {
  it('splits rows on LF/CRLF/CR and cells on tabs', () => {
    expect(parseClipboardGrid('a\tb\r\nc\td\re\tf')).toEqual([['a', 'b'], ['c', 'd'], ['e', 'f']]);
  });
});
