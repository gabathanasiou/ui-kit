"use client";
import React from 'react';
import { Check, Plus, X } from 'lucide-react';
import MorphSearchField, {
  type MorphFieldAction,
  type MorphSearchFieldProps,
} from './MorphSearchField';

/**
 * MorphActionField — the CREATE/RENAME face of the morph field: a primary
 * button that animates into a plain text box (no dropdown), with action
 * buttons inside its right edge. Submit (Check) and Cancel (X) are rendered
 * when the matching callbacks are supplied; any extra `actions` (e.g. “pick on
 * map”) sit to their left. Enter submits, Escape / outside click cancels.
 * Focus returns to the trigger when it collapses.
 *
 * It shares the shell with `MorphSearchField` (one morph implementation); the
 * filter variant keeps its term, this variant clears after submit/cancel.
 */
export interface MorphActionFieldProps extends Omit<
  MorphSearchFieldProps,
  'actions' | 'leadingIcon' | 'showClear' | 'onSubmit' | 'onCancel' | 'cancelOnEscape' | 'cancelOnOutside' | 'variant' | 'triggerIcon' | 'triggerLabel'
> {
  /** Collapsed button label. */
  triggerLabel: string;
  /** Collapsed button leading icon (default Plus). */
  triggerIcon?: React.ReactNode;
  /** Leading icon inside the expanded field. Default null (plain text box);
   *  pass an icon to keep the trigger's identity visible while typing. */
  fieldIcon?: React.ReactNode | null;
  /** Extra action buttons inside the right edge (before submit/cancel). */
  actions?: MorphFieldAction[];
  /** Enter / Check submits the draft. */
  onSubmit?: (value: string) => void;
  /** Escape / outside click / X cancels. */
  onCancel?: () => void;
  /** Clear the draft after submit (default true). */
  clearOnSubmit?: boolean;
  /** Clear the draft when cancelling (default true). */
  clearOnCancel?: boolean;
  /** Collapsed button variant (default `primary`). */
  variant?: 'subtle' | 'primary';
}

export function MorphActionField({
  triggerLabel,
  triggerIcon = <Plus className="w-3.5 h-3.5" />,
  fieldIcon = null,
  actions = [],
  onSubmit,
  onCancel,
  clearOnSubmit = true,
  clearOnCancel = true,
  onChange,
  value,
  variant = 'primary',
  ...rest
}: MorphActionFieldProps) {
  const submit = (next: string) => {
    onSubmit?.(next);
    if (clearOnSubmit) onChange('');
  };
  const cancel = () => {
    onCancel?.();
    if (clearOnCancel) onChange('');
  };
  const fieldActions: MorphFieldAction[] = [
    ...actions,
    ...(onSubmit ? [{
      key: 'submit',
      label: 'Submit',
      icon: <Check className="w-3.5 h-3.5" />,
      onClick: submit,
    }] : []),
    ...(onCancel ? [{
      key: 'cancel',
      label: 'Cancel',
      icon: <X className="w-3.5 h-3.5" />,
      onClick: cancel,
    }] : []),
  ];

  return (
    <MorphSearchField
      {...rest}
      value={value}
      onChange={onChange}
      triggerLabel={triggerLabel}
      triggerIcon={triggerIcon}
      leadingIcon={fieldIcon}
      actions={fieldActions}
      showClear={false}
      variant={variant}
      onSubmit={onSubmit ? submit : undefined}
      onCancel={onCancel ? cancel : undefined}
      cancelOnEscape={!!onCancel}
      cancelOnOutside={!!onCancel}
    />
  );
}

export default MorphActionField;
