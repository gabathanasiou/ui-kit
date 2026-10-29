import { describe, expect, it } from 'vitest';
import {
  formatPickerValues,
  hasPickerMatch,
  lastPickerSegment,
  pickerCommittedKeys,
  pickerItemKey,
  pickerItemLabel,
  pickerSegments,
  resolvePickerSegment,
  resolvePickerText,
  resolveMultiCommit,
  unknownPickerValues,
} from '../pickerModel';

const CAST = [
  { id: '1', label: 'GEORGE' },
  { id: '2', label: 'MARY' },
  { id: '3', label: 'CLARENCE' },
];

const PROPS = [
  { id: 'Mug', label: 'Mug' },
  { id: 'Prop Gun', label: 'Prop Gun' },
];

describe('picker keys and labels', () => {
  it('keys by id or label', () => {
    expect(pickerItemKey(CAST[0])).toBe('1');
    expect(pickerItemKey(CAST[0], 'label')).toBe('GEORGE');
  });

  it('resolves a value to its label, falling back to the raw value', () => {
    expect(pickerItemLabel('2', CAST)).toBe('MARY');
    expect(pickerItemLabel('NEW', CAST)).toBe('NEW');
  });
});

describe('edited text', () => {
  it('splits comma segments and drops empties', () => {
    expect(pickerSegments('GEORGE, MARY, ')).toEqual(['GEORGE', 'MARY']);
  });

  it('reads the last segment as the live query (trailing comma = empty)', () => {
    expect(lastPickerSegment('GEORGE, MAR')).toBe('MAR');
    expect(lastPickerSegment('GEORGE, MARY, ')).toBe('');
    expect(lastPickerSegment('GEORGE')).toBe('GEORGE');
  });
});

describe('resolvePickerSegment', () => {
  it('prefers an exact key, then a case-insensitive label', () => {
    expect(resolvePickerSegment('2', CAST)).toBe('2');
    expect(resolvePickerSegment('mary', CAST)).toBe('2');
    expect(resolvePickerSegment('MARY', CAST)).toBe('2');
  });

  it('keeps an unknown typed value (the create path)', () => {
    expect(resolvePickerSegment('NEWBIE', CAST)).toBe('NEWBIE');
  });

  it('uses labels as keys in label mode', () => {
    expect(resolvePickerSegment('mug', PROPS, 'label')).toBe('Mug');
  });
});

describe('resolvePickerText', () => {
  it('maps labels to keys, dedupes, and preserves typed order', () => {
    expect(resolvePickerText('GEORGE, 3, MARY', CAST)).toEqual(['1', '3', '2']);
    expect(resolvePickerText('GEORGE, 1', CAST)).toEqual(['1']);
  });
});

describe('pickerCommittedKeys', () => {
  it('commits every segment when the text ends with a comma', () => {
    expect(pickerCommittedKeys('GEORGE, MARY, ', CAST)).toEqual(['1', '2']);
  });

  it('treats the last segment as the live query without a trailing comma', () => {
    expect(pickerCommittedKeys('GEORGE, MAR', CAST)).toEqual(['1']);
    expect(pickerCommittedKeys('MAR', CAST)).toEqual([]);
  });

  it('clears when the text is emptied', () => {
    expect(pickerCommittedKeys('', CAST)).toEqual([]);
    expect(pickerCommittedKeys('  ,  ', CAST)).toEqual([]);
  });

  it('commits a typed create once a comma follows it', () => {
    expect(pickerCommittedKeys('GEORGE, NEWBIE, ', CAST)).toEqual(['1', 'NEWBIE']);
  });
});

describe('resolveMultiCommit', () => {
  it('keeps the committed values when a strict catalogue cannot resolve the typed key', () => {
    expect(resolveMultiCommit('zz', PROPS, 'label', ['Mug'], false)).toEqual(['Mug']);
  });

  it('clears a strict list only when the field is emptied', () => {
    expect(resolveMultiCommit('   ', PROPS, 'label', ['Mug'], false)).toEqual([]);
  });

  it('commits a typed value that IS in a strict catalogue (replace)', () => {
    expect(resolveMultiCommit('prop gun', PROPS, 'label', ['Mug'], false)).toEqual(['Prop Gun']);
  });

  it('free text keeps unknown typed values (and clears when emptied)', () => {
    expect(resolveMultiCommit('NEWBIE', PROPS, 'label', ['Mug'], true)).toEqual(['NEWBIE']);
    expect(resolveMultiCommit('', PROPS, 'label', ['Mug'], true)).toEqual([]);
  });
});

describe('matches and unknown values', () => {
  it('treats a known id/label as a match', () => {
    expect(hasPickerMatch('2', CAST)).toBe(true);
    expect(hasPickerMatch('mary', CAST)).toBe(true);
    expect(hasPickerMatch('NEWBIE', CAST)).toBe(false);
    expect(hasPickerMatch('   ', CAST)).toBe(true);
  });

  it('lists values the catalogue does not know', () => {
    expect(unknownPickerValues(['1', 'NEWBIE'], CAST)).toEqual(['NEWBIE']);
    expect(unknownPickerValues(['Mug'], PROPS, 'label')).toEqual([]);
  });
});

describe('formatPickerValues', () => {
  it('names, count and chips presets', () => {
    expect(formatPickerValues(['1', '2'], CAST, 'id', 'names')).toBe('GEORGE, MARY');
    expect(formatPickerValues(['1', '2'], CAST, 'id', 'count')).toBe('2 selected');
    expect(formatPickerValues(['1', '2'], CAST, 'id', 'chips')).toBe('');
    expect(formatPickerValues([], CAST, 'id', 'count')).toBe('');
  });

  it('a custom formatter wins', () => {
    expect(formatPickerValues(['1', '2'], CAST, 'id', 'names', (values) => `${values.length} cast`)).toBe('2 cast');
  });
});
