"use client";

/** True when this keydown belongs to an IME candidate confirmation, not an
 *  application submit. `isComposing` is the standard signal; `keyCode === 229`
 *  catches WebKit's out-of-order confirming Enter (Safari delivers it with
 *  `isComposing` already false). Pure; unit-tested.
 *
 *  Callers keep the guide's ordering: `preventDefault()` first (so a parent
 *  form/row cannot act on the key), then bail on this predicate. */
export function isImeConfirm(e: { isComposing?: boolean; keyCode?: number }): boolean {
  return !!e.isComposing || e.keyCode === 229;
}

export default isImeConfirm;
