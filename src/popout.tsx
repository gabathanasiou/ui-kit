"use client";
import { createContext, useContext } from 'react';

export const PopoutWindowContext = createContext<Window | null>(null);

export function usePopoutWindow(): Window | null {
  return useContext(PopoutWindowContext);
}

export function usePortalTarget(): HTMLElement | null {
  const popout = usePopoutWindow();
  if (popout) return popout.document.body;
  return null;
}

export function useCurrentDocument(): Document | null {
  const popout = usePopoutWindow();
  if (popout) return popout.document;
  return typeof document !== 'undefined' ? document : null;
}

export function useCurrentWindow(): Window | null {
  const popout = usePopoutWindow();
  return popout ?? (typeof window !== 'undefined' ? window : null);
}
