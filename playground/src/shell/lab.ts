import type { KitAccent, KitMode, KitSurface } from '../../../src/index';

/** The Theme-lab axes, lifted to the app root so they recolour the WHOLE
 *  playground (surface stays the modal-shell property). */
export type LabState = {
  mode: KitMode;
  accent: KitAccent;
  surface: KitSurface;
  setMode: (m: KitMode) => void;
  setAccent: (a: KitAccent) => void;
  setSurface: (s: KitSurface) => void;
};
