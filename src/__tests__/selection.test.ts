import { describe, expect, it } from 'vitest';
import {
  countHidden,
  groupSelectionState,
  orderByCatalogue,
  sameSelection,
  setSelected,
  toggleSelected,
} from '../selection';

const CATALOGUE = ['camera', 'grip', 'electric', 'sound'];

describe('orderByCatalogue', () => {
  it('emits catalogue order regardless of click order', () => {
    expect(orderByCatalogue(['sound', 'camera'], CATALOGUE)).toEqual(['camera', 'sound']);
  });

  it('keeps unknown ids (stale / free-typed values) at the end in their order', () => {
    expect(orderByCatalogue(['legacy', 'sound', 'custom'], CATALOGUE)).toEqual(['sound', 'legacy', 'custom']);
  });

  it('collapses duplicates', () => {
    expect(orderByCatalogue(['grip', 'grip', 'camera'], CATALOGUE)).toEqual(['camera', 'grip']);
  });
});

describe('sameSelection', () => {
  it('ignores order', () => {
    expect(sameSelection(['camera', 'grip'], ['grip', 'camera'])).toBe(true);
  });

  it('detects additions and removals', () => {
    expect(sameSelection(['camera'], ['camera', 'grip'])).toBe(false);
    expect(sameSelection(['camera', 'grip'], ['camera'])).toBe(false);
  });
});

describe('toggleSelected', () => {
  it('adds a row in catalogue order', () => {
    expect(toggleSelected(['sound'], 'camera', CATALOGUE)).toEqual(['camera', 'sound']);
  });

  it('removes an already selected row', () => {
    expect(toggleSelected(['camera', 'sound'], 'camera', CATALOGUE)).toEqual(['sound']);
  });

  it('never toggles a disabled row', () => {
    expect(toggleSelected([], 'grip', CATALOGUE, { disabledIds: ['grip'] })).toEqual([]);
    expect(toggleSelected(['grip'], 'grip', CATALOGUE, { disabledIds: ['grip'] })).toEqual(['grip']);
  });

  it('blocks adding once max is reached, but still allows removing', () => {
    const atCap = ['camera', 'grip'];
    expect(toggleSelected(atCap, 'sound', CATALOGUE, { max: 2 })).toEqual(atCap);
    expect(toggleSelected(atCap, 'camera', CATALOGUE, { max: 2 })).toEqual(['grip']);
  });
});

describe('setSelected', () => {
  it('adds a group in catalogue order', () => {
    expect(setSelected(['sound'], ['electric', 'camera'], true, CATALOGUE)).toEqual(['camera', 'electric', 'sound']);
  });

  it('removes a group', () => {
    expect(setSelected(['camera', 'grip', 'sound'], ['grip', 'camera'], false, CATALOGUE)).toEqual(['sound']);
  });

  it('skips disabled rows', () => {
    expect(setSelected([], ['camera', 'grip'], true, CATALOGUE, { disabledIds: ['grip'] })).toEqual(['camera']);
  });

  it('never adds ids the catalogue does not know', () => {
    expect(setSelected([], ['camera', 'not-a-record'], true, CATALOGUE)).toEqual(['camera']);
  });

  it('fills the remaining capacity in catalogue order when max is set', () => {
    expect(setSelected(['sound'], ['camera', 'grip', 'electric'], true, CATALOGUE, { max: 2 }))
      .toEqual(['camera', 'sound']);
  });
});

describe('groupSelectionState', () => {
  const ids = ['camera', 'grip', 'electric'];
  it('is none for an empty group or no picks', () => {
    expect(groupSelectionState([], [])).toBe('none');
    expect(groupSelectionState([], ids)).toBe('none');
  });
  it('is some for a partial pick', () => {
    expect(groupSelectionState(['grip'], ids)).toBe('some');
  });
  it('is all only when every row is picked', () => {
    expect(groupSelectionState(['camera', 'grip', 'electric'], ids)).toBe('all');
  });
});

describe('countHidden', () => {
  it('counts selected catalogue ids the filter hides', () => {
    expect(countHidden(['camera', 'grip', 'sound'], CATALOGUE, ['camera', 'sound'])).toBe(1);
  });
  it('ignores unknown values and the no-filter case', () => {
    expect(countHidden(['legacy'], CATALOGUE, ['camera'])).toBe(0);
    expect(countHidden(['camera'], CATALOGUE)).toBe(0);
  });
});
