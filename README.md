# @gabriel/ui-kit

Shared interaction primitives for Gabriel's apps — extracted from the **lemon_schedule** app (iOS-touch-hardened, battle-tested).

**What's inside**
- `device.ts` — pointer/hover capability model: `IS_COARSE`, `IS_TOUCH_CAPABLE`, `isTouchLike()` (Apple Pencil = finger), last-pointer tracking, hardware-keyboard detection, the pencil click shim for Safari overlays
- `useTouchMode()` — touch-first UI variant switching
- `DropdownMenu` / `DropdownItem` / `DropdownSubmenu` — Radix-wired menus with `onTouchStart` claim trick, tap-vs-drag disambiguation, one `getDropdownClasses()` design-system function, plus `ItemManagerDropdown` (list with rename/duplicate/delete)
- `ContextMenu` + `LongPressMenuProvider` — long-press ring → synthetic `contextmenu` (touch's right-click), shared with desktop right-click. Opt in with `data-context-menu` on any element; opt out a subtree with `useLongPressOptOut()`
- `Dialog` — `confirm() / prompt() / alert()` provider (Enter/Esc/click-outside, "don't ask again")
- `useSmartPosition` / `useFixedPosition` — visualViewport-aware popup positioning (stays above the iOS keyboard)
- `popout` — `PopoutWindowContext` + portal/document/window helpers

## Install

```
npm install github:gabathanasiou/ui-kit#v0.1.0
```

Peer dependencies (install in your app): `react`, `react-dom`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `lucide-react`.

## Setup (3 steps)

1. **Import the CSS** once, at your app root:
   ```css
   @import "@gabriel/ui-kit/ui-kit.css";
   ```
2. **Tailwind:** the components use Tailwind utilities for layout/sizing. If you use Tailwind v4, point its content detection at the kit (add to your CSS):
   ```css
   @import "tailwindcss";
   @source "../../node_modules/@gabriel/ui-kit/dist";
   ```
   (No Tailwind → no problem: you just need your own equivalents of `flex`, `p-1`, `w-80`, etc.)
3. **Hover gating (iOS rule):** define the `hover` variant gate exactly like this so `hover:*` utilities don't kill iPadOS:
   ```css
   @custom-variant hover {
     @media (any-hover: hover) {
       &:hover { @slot; }
     }
   }
   ```

## Theming

The kit's colors are CSS variables — **no colors are hardcoded** in components. Defaults (`:root`) reproduce the lemon_schedule zinc look; `[data-theme="light"]` and `[data-theme="blue"]` are built-in alternatives. `DropdownMenu` / `ContextMenu` / `Dialog` set `data-theme` for you (prop `theme="dark" | "light" | "blue"`, default dark).

Override any variable in your own CSS to re-skin the whole kit:

```css
:root {
  --ui-menu-bg: #fff8f2;
  --ui-menu-border: #f0e6db;
  --ui-text: #3d3a3a;
  --ui-item-hover-bg: #ffe4de;
  --ui-danger-solid: #e5484d;
  /* ...see src/styles/tokens.css for the full list */
}
```

## Long-press example

```tsx
<LongPressMenuProvider>
  <MessageBubble data-context-menu onContextMenu={openMenu} />
  <ContextMenu open={open} x={x} y={y} onClose={close}>
    <ContextMenuItem onClick={copy}>Copy</ContextMenuItem>
    <ContextMenuItem variant="danger" onClick={report}>Report</ContextMenuItem>
  </ContextMenu>
</LongPressMenuProvider>
```

Desktop right-click and touch long-press both fire `onContextMenu` — one handler, both inputs.

## Release flow

1. `npm run build` (vite + tsc + css copy)
2. Bump `version` in `package.json`
3. Commit + tag: `git tag v0.1.0 && git push --tags`
4. In consuming apps: bump the pinned ref in `package.json` (`github:gabathanasiou/ui-kit#v0.2.0`) and `npm install`

Semver: patch/minor = safe to bump; major = breaking changes, migrate apps deliberately.
