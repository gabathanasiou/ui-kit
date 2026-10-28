# Vendored fork — Glide Data Grid

This is our **fork** of [`@glideapps/glide-data-grid`](https://github.com/glideapps/glide-data-grid),
vendored so the kit owns the runtime instead of depending on an upstream
release. MIT licensed; copyright typeguard, Inc. (see `LICENSE`).

- **Upstream fork:** https://github.com/gabathanasiou/glide-data-grid
- **Pinned version:** `6.0.4-alpha24` (see `upstream-package.json`)
- **What is here:** the published build — `dist/esm` (readable ESM; TypeScript
  output, unminified), `dist/dts` (types) and `dist/index.css`. The original
  sources are **not** copied here; they live in the fork above.

## How it is wired

`vite.config.ts` aliases the bare import `@glideapps/glide-data-grid` to
`vendor/glide-data-grid/dist/esm/index.js`, and the kit `tsconfig.json` maps the
same specifier to `dist/dts/index.d.ts`. Nothing resolves upstream — deleting
the npm package has no effect. CSS consumers import
`vendor/glide-data-grid/dist/index.css` (or the package path when published).

## Local patches in this vendored build

1. **`dom-cells/`** — new module exporting `DataEditorWithDomCells` (+
   `GetDomCell`/`DomCellEditorProps` types): mounts a click-through DOM layer
   over the canvas and pins one box per visible cell from `getBounds`, refreshed
   from `onVisibleRegionChanged`. Exported from `index.js` / `index.d.ts`.
   The kit maps `GlideSheet.domCells` onto it.
   Enter/Space on the selected cell activates its control when the DOM cell
   holds exactly one focusable element. Frozen columns are measured on every
   pass (the visible range starts at the first SCROLLED column) and
   `freezeColumns` is forwarded to the inner editor. `domCellBottomInset` hides
   boxes covered by a sticky trailing row. Box positions are also written
   directly in the layout effect (same frame as the canvas paint); during a
   fast scroll the boxes hide (`data-glide-scrolling`, cleared 90ms after the
   last scroll) and re-pin on settle, so no button is ever seen straddling
   rows.
   `getDomHeaderCell` pins real controls
   over column headers (frozen/scrolled aware); headers expose
   `data-glide-header-focused` when the selection range covers their column.
   The overscroll band past the last row is flattened to the cell background
   (stock painted phantom row lines there).
2. **Editor chrome** (`dist/index.css`, "fork: the overlay editor must look
   like the cell") — square corners, a crisp 1px inset accent rectangle, no
   drop shadow/fade, the cell's exact box/height/padding/font/line rhythm, and
   no inner scrollbar (stock's growing-entry top margin + sub-pixel rounding).
3. **Header selection range** (`dist/esm/internal/data-grid/render/`) — stock
   tinted only the focused cell's column header; every column covered by the
   selection range now tints (`rangeStack` included), matching the range.
4. **Source maps stripped** — `*.map` files and their `sourceMappingURL`
   comments are removed to keep the vendored tree small (Vite then logs no
   missing-map errors).

## Patching

- **Small change:** edit the file in `dist/esm/**` directly (the code is plain
  ESM, names intact). Keep the change minimal and add a `// fork:` comment so a
  re-vendor diff surfaces it.
- **Structural change / new feature:** patch the real TypeScript in the fork
  (`github.com/gabathanasiou/glide-data-grid`), build it with its own toolchain
  (`./build.sh` needs the monorepo's `config/build-util.sh`; a standalone
  checkout usually needs that script copied in), then re-vendor `dist/`.
- **Re-vendor:** copy `dist/esm`, `dist/dts`, `dist/index.css`, `LICENSE`,
  `README.md` and `package.json` from the built package into this folder
  (drop `*.map`).

Vendored edits are part of our code review. Do not add `.map` files.
