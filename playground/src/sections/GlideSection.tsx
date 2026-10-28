import React from 'react';
import { DemoCard } from '../shell/chrome';
import { ButtonTypesDemo, CapabilityNotes, CellLayoutsDemo, CellGalleryDemo, CrewCardDemo } from '../glideDemo';

/* Glide data grid: the canvas spreadsheet primitives. The crew card is the
   Day Manager's real card rebuilt on the kit's GlideSheet; the gallery is the
   cell-kind menu (read-only / editable / locked / toggle / canvas button /
   badge / kit picker). */
export const GlideSection: React.FC = () => (
  <>
    <DemoCard
      wide
      label="Crew card — recreated on Glide"
      hint="The Day Manager crew card: kit Checkbox / PickerField / Button in the DOM chrome, the roster on a canvas grid. Role is read-only, Person and Report To open the kit PickerField in the cell, Call is a plain text edit, the trash is a single-click canvas cell, and every operation (edit, fill, paste, add, remove) is ONE commit — undo proves it."
      testId="glide-crew-demo"
    >
      <CrewCardDemo />
    </DemoCard>

    <DemoCard
      wide
      label="Cell gallery"
      hint="Read-only, editable, locked, boolean toggle, canvas button (fires on a single click — no editor), badge and a kit picker, side by side in one grid. Try the hover row, the fill handle, and copying a block into another selection."
      testId="glide-gallery-demo"
    >
      <CellGalleryDemo />
    </DemoCard>

    <DemoCard
      wide
      label="Cell layouts — the cell as a container"
      hint="Real DOM cells are boxes the size of the cell: arrange a row of buttons, a morph field beside an adder, a picker plus Apply, a Seg — anything a panel can hold. No overlay editor, no floating panel; the controls live in the row."
      testId="glide-layouts-demo"
    >
      <CellLayoutsDemo />
    </DemoCard>

    <DemoCard
      wide
      label="Button & field cells"
      hint="Two ways to get a real control into a grid. Drawn buttons live ON the canvas: every variant/icon, with hover and focus painted (the canvas has no CSS). The last two columns are REAL kit components mounted over their cells (domCells): they keep focus, hover, animation and tab order, and morph in place — no floating editor."
      testId="glide-buttons-demo"
    >
      <ButtonTypesDemo />
    </DemoCard>

    <DemoCard
      wide
      label="What this can and cannot do"
      hint="The canvas model's boundary — and the plumbing that is already shared."
      testId="glide-notes"
    >
      <CapabilityNotes />
    </DemoCard>
  </>
);
