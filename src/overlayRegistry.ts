"use client";

/* One-open-overlay-at-a-time registry: every kit overlay surface
   (DropdownMenu, ContextMenu) registers its dismiss callback on open; the
   next surface to open closes the previous one first — a context menu and a
   dropdown can never coexist, and the submenu chain closes as one unit (the
   root's dismiss flips the controlled open). Mirrors the app's
   globalDropdownCloseRef pattern (lib/dropdown.ts). */

let currentClose: (() => void) | null = null;

/** Register an overlay as THE open one — any previously open overlay is
 *  dismissed first. Returns the unregister fn (call on close/unmount). */
export function registerOverlayClose(close: () => void): () => void {
  currentClose?.();
  currentClose = close;
  return () => {
    if (currentClose === close) currentClose = null;
  };
}
