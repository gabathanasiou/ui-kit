import { describe, it, expect } from 'vitest';
import React from 'react';
import { tooltipAriaLabel } from '../Tooltip';

/* The tooltip→trigger accessible-name bridge: icon-only triggers get named
   (what presence anchors and screen readers key on), text/self-named triggers
   stay untouched. */

const btn = (props: Record<string, unknown> = {}) => React.createElement('button', props, props.children as any);

describe('tooltipAriaLabel', () => {
  it('names an icon-only trigger from the tooltip content', () => {
    const iconOnly = btn({ children: React.createElement('svg') });
    expect(tooltipAriaLabel(iconOnly, 'Add Column After')).toEqual({ 'aria-label': 'Add Column After' });
  });

  it('keeps an existing accessible name', () => {
    expect(tooltipAriaLabel(btn({ 'aria-label': 'Keep me' }), 'Other')).toEqual({});
    expect(tooltipAriaLabel(btn({ title: 'Keep me' }), 'Other')).toEqual({});
  });

  it('never overrides visible text (label-in-name)', () => {
    expect(tooltipAriaLabel(btn({ children: 'Delete' }), 'Delete row')).toEqual({});
    expect(tooltipAriaLabel(btn({ children: [React.createElement('svg'), ' Delete'] }), 'Delete row')).toEqual({});
    expect(tooltipAriaLabel(btn({ children: ['  ', React.createElement('svg')] }), 'Delete row')).toEqual({ 'aria-label': 'Delete row' });
  });

  it('takes the first line of a shortcut tooltip', () => {
    expect(tooltipAriaLabel(btn({ children: React.createElement('svg') }), 'Delete\n• ⌫')).toEqual({ 'aria-label': 'Delete' });
    expect(tooltipAriaLabel(btn({ children: React.createElement('svg') }), '• ⌫')).toEqual({ 'aria-label': '⌫' });
  });

  it('does nothing without a content string or element child', () => {
    expect(tooltipAriaLabel(btn({ children: React.createElement('svg') }), '')).toEqual({});
    expect(tooltipAriaLabel('plain text', 'Content')).toEqual({});
    expect(tooltipAriaLabel([btn(), btn()], 'Content')).toEqual({});
  });
});
