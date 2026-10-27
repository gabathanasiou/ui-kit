"use client";
import React from 'react';

/**
 * The ONE button→text-box cross-fade shell. Layout only: it owns
 *  - the animated collapsed/expanded width,
 *  - the trigger layer that fades/scales out,
 *  - the absolutely-positioned field layer that fades/scales in.
 *
 * Behaviour (open/close state, focus, outside click, submit, actions) stays in
 * the component using it — `MorphSearchField`, `MorphActionField` and
 * `SearchMenu` compose this shell so a morph is never hand-rolled twice.
 */
export interface MorphFieldShellProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  expanded: boolean;
  collapsedWidth: number;
  expandedWidth: number;
  /** Collapsed button face (rendered inside the fading trigger layer). */
  trigger: React.ReactNode;
  /** Expanded field face (rendered inside the absolute field layer). */
  field: React.ReactNode;
  /** Positioning/anchor ref from the consumer. */
  rootRef?: React.Ref<HTMLDivElement>;
  /** Prevent flex shrinking (toolbar controls). Default false. */
  shrink?: boolean;
}

export function MorphFieldShell({
  expanded,
  collapsedWidth,
  expandedWidth,
  trigger,
  field,
  rootRef,
  shrink = false,
  className = '',
  style,
  ...rest
}: MorphFieldShellProps) {
  return (
    <div
      {...rest}
      ref={rootRef}
      className={`relative inline-flex ${shrink ? 'shrink-0' : ''} ${className}`}
      style={{
        ...style,
        width: expanded ? expandedWidth : collapsedWidth,
        transition: 'width 220ms cubic-bezier(0.32, 0.72, 0, 1)',
      }}
    >
      <div
        className={`w-full origin-left ${expanded ? 'opacity-0 pointer-events-none' : 'opacity-100'} motion-reduce:transition-none`}
        style={{
          transform: expanded ? 'scaleX(0.98)' : 'scaleX(1)',
          transition: 'opacity 150ms ease, transform 220ms cubic-bezier(0.32, 0.72, 0, 1)',
        }}
        aria-hidden={expanded}
      >
        {trigger}
      </div>
      <div
        className={`absolute inset-0 origin-left ${expanded ? 'opacity-100' : 'opacity-0 pointer-events-none'} motion-reduce:transition-none`}
        style={{
          transform: expanded ? 'scaleX(1)' : 'scaleX(0.96)',
          transition: 'opacity 150ms ease, transform 220ms cubic-bezier(0.32, 0.72, 0, 1)',
        }}
        aria-hidden={!expanded}
      >
        {field}
      </div>
    </div>
  );
}

export default MorphFieldShell;
