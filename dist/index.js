"use client";
import { jsx as m, jsxs as O, Fragment as Ve } from "react/jsx-runtime";
import Ce, { createContext as xt, useContext as bt, useState as G, useEffect as Z, useRef as S, useCallback as ie, useLayoutEffect as Je, useMemo as En, useImperativeHandle as Ss } from "react";
import * as ae from "@radix-ui/react-dropdown-menu";
import { Search as Ts, X as Cn, Check as Oi, Pencil as Es, Copy as $i, Trash2 as lr, RotateCcw as Di, Plus as Cs, ChevronRight as Nn, ChevronLeft as Ns, ArrowUp as Ms, ArrowDown as As, ChevronDown as Ln, Underline as Rs, Strikethrough as Is, RemoveFormatting as zs, Link as Os, ChevronUp as $s } from "lucide-react";
import { computePosition as Ds, offset as Pi, flip as Li, shift as Bi, size as Ps, useFloating as Ls, autoUpdate as Bs } from "@floating-ui/react-dom";
import * as it from "@radix-ui/react-dialog";
import { createPortal as br } from "react-dom";
import { mergeAttributes as Fs, ReactNodeViewRenderer as Hs, NodeViewWrapper as _s, useEditor as Ws, EditorContent as js } from "@tiptap/react";
import { PluginKey as Ye, Plugin as rt, Selection as It, TextSelection as _e, NodeSelection as Dt, AllSelection as Js } from "@tiptap/pm/state";
import { DecorationSet as un, Decoration as qs } from "@tiptap/pm/view";
import Vs from "@tiptap/starter-kit";
import Ks from "@tiptap/extension-placeholder";
import { TextStyle as Ys, FontFamily as Us, FontSize as Xs } from "@tiptap/extension-text-style";
import Gs from "@tiptap/extension-color";
import Qs from "@tiptap/extension-link";
import Zs from "@tiptap/extension-underline";
import el from "@tiptap/suggestion";
import { Mention as tl } from "@tiptap/extension-mention";
import { createRoot as nl } from "react-dom/client";
const rl = xt(null);
function vr() {
  return bt(rl);
}
function tn() {
  const n = vr();
  return n ? n.document.body : null;
}
function Fi() {
  const n = vr();
  return n ? n.document : typeof document < "u" ? document : null;
}
function nn() {
  return vr() ?? (typeof window < "u" ? window : null);
}
const rn = typeof window < "u", Ne = rn && window.matchMedia("(pointer: coarse)").matches, il = rn && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
let Bn = 0.5;
const Yt = /* @__PURE__ */ new Set();
function Dd(n) {
  Bn = Math.max(0, Math.min(1, n)), Yt.forEach((e) => e());
}
function Hi() {
  return Bn;
}
function Pd() {
  const [, n] = G(0);
  return Z(() => {
    const e = () => n((t) => t + 1);
    return Yt.add(e), () => {
      Yt.delete(e);
    };
  }, []), Ne && Bn > 0;
}
function xe() {
  const [, n] = G(0);
  return Z(() => {
    const e = () => n((t) => t + 1);
    return Yt.add(e), () => {
      Yt.delete(e);
    };
  }, []), Bn;
}
function R(n, e, t) {
  return Ne ? Math.round(n + (e - n) * t) : n;
}
function at(n, e) {
  const t = xe();
  return Ne && t > 0 ? {
    padding: `${R(n.py, e.py, t)}px ${R(n.px, e.px, t)}px`,
    fontSize: `${R(n.fs, e.fs, t)}px`
  } : { padding: `${n.py}px ${n.px}px`, fontSize: `${n.fs}px` };
}
function ar(n) {
  return n === "touch" || n === "pen";
}
let Rt = null;
const cr = /* @__PURE__ */ new Set();
rn && window.addEventListener("pointerdown", (n) => {
  Rt = n.pointerType, cr.forEach((e) => e());
}, !0);
function Ld() {
  return Rt;
}
function ol() {
  const [, n] = G(0), e = S(Rt);
  return Z(() => {
    const t = () => {
      e.current !== Rt && (e.current = Rt, n((r) => r + 1));
    };
    return cr.add(t), () => {
      cr.delete(t);
    };
  }, []), Rt;
}
const _i = ["(any-hover: hover)", "(any-pointer: fine)"];
function Wi() {
  return rn ? _i.some((n) => window.matchMedia(n).matches) : !1;
}
let Mn = Wi();
const ur = /* @__PURE__ */ new Set();
function ei(n) {
  Mn !== n && (Mn = n, ur.forEach((e) => e()));
}
var zi;
if (rn) {
  const n = () => ei(Wi());
  for (const s of _i) {
    const l = window.matchMedia(s);
    (zi = l.addEventListener) == null || zi.call(l, "change", n);
  }
  window.addEventListener("focus", n), document.addEventListener("visibilitychange", n);
  const e = window.setInterval(() => {
    document.visibilityState === "visible" && n();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(e)), window.addEventListener("keydown", (s) => {
    s.isComposing || s.keyCode !== 229 && (s.key === "Enter" || s.key === "Backspace" || s.key === "Process" || s.key === "Unidentified" || ei(!0));
  });
  let t = null, r = null;
  const i = "__penClick", o = /* @__PURE__ */ new Set(["color", "file", "date", "datetime-local", "month", "time", "week"]);
  window.addEventListener("pointerdown", (s) => {
    s.pointerType !== "pen" || s.button !== 0 || (t = { x: s.clientX, y: s.clientY });
  }, !0), window.addEventListener("pointerup", (s) => {
    if (s.pointerType !== "pen") return;
    const l = t;
    if (t = null, !l || Math.hypot(s.clientX - l.x, s.clientY - l.y) > 8) return;
    const a = s.target;
    if (!a || !a.isConnected) return;
    if (a instanceof HTMLInputElement && o.has(a.type)) {
      try {
        a.showPicker();
      } catch {
      }
      return;
    }
    const c = new MouseEvent("click", { bubbles: !0, cancelable: !0, view: window });
    c[i] = !0, r = { x: s.clientX, y: s.clientY, time: Date.now() }, a.dispatchEvent(c);
  }, !0), window.addEventListener("click", (s) => {
    s[i] || r && Date.now() - r.time < 1e3 && Math.hypot(s.clientX - r.x, s.clientY - r.y) < 12 && (s.preventDefault(), s.stopPropagation());
  }, !0);
}
function Bd() {
  return Mn;
}
function Fd() {
  const [, n] = G(0);
  return Z(() => {
    const e = () => n((t) => t + 1);
    return ur.add(e), () => {
      ur.delete(e);
    };
  }, []), Mn;
}
const Pt = 220, wr = "cubic-bezier(0.32, 0.72, 0, 1)", kr = 170, Sr = 0.94;
function Un(n) {
  return n === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function ji(n, e) {
  const t = e.left + e.width / 2, r = e.top + e.height / 2;
  return {
    x: t < n.left ? 0 : t > n.left + n.width ? 1 : 0.5,
    y: r < n.top ? 0 : r > n.top + n.height ? 1 : 0.5
  };
}
function Ji(n, e) {
  const t = (e == null ? void 0 : e()) ?? null;
  if (!t) return { x: 0.5, y: 0.5 };
  const r = n.getBoundingClientRect();
  return ji({ left: r.left, top: r.top, width: r.width, height: r.height }, t);
}
function sl(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity };
  e.style.transition = "none", e.style.transformOrigin = "50% 50%", e.style.transform = `scale(${Sr})`, e.style.opacity = "0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    n.current === i && requestAnimationFrame(() => {
      if (n.current !== i) return;
      const s = Ji(e, t);
      e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transition = `transform ${Pt}ms ${wr}, opacity ${kr}ms ease`, e.style.transform = "none", e.style.opacity = "", window.setTimeout(() => {
        n.current === i && (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, r == null || r());
      }, Pt + 60);
    });
  });
}
function ll(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity, pointerEvents: e.style.pointerEvents, visibility: e.style.visibility }, s = Ji(e, t);
  e.style.transition = `transform ${Pt}ms ${wr}, opacity ${kr}ms ease`, e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transform = `scale(${Sr})`, e.style.opacity = "0", e.style.pointerEvents = "none", window.setTimeout(() => {
    n.current === i && (e.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      n.current !== i || e.isConnected || (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, e.style.pointerEvents = o.pointerEvents, e.style.visibility = o.visibility);
    }));
  }, Pt + 60);
}
function al(n, e, t) {
  const r = n.cloneNode(!0), i = n.getBoundingClientRect(), o = i.width > 0 || i.height > 0 ? i : t ?? i;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${o.left}px`, r.style.top = `${o.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const s = (e == null ? void 0 : e()) ?? null, l = s ? ji({ left: o.left, top: o.top, width: o.width, height: o.height }, s) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${l.x * 100}% ${l.y * 100}%`, n.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${Pt}ms ${wr}, opacity ${kr}ms ease`, r.style.transform = `scale(${Sr})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, Pt + 60));
    });
  });
}
function Tr(n) {
  const e = S(null), [t, r] = G(!1), i = S(null), o = S(0), s = ie((p) => {
    if (n.ref && (n.ref.current = p), p) {
      o.current = 0, e.current = p;
      const x = p.getBoundingClientRect();
      (x.width > 0 || x.height > 0) && (i.current = { left: x.left, top: x.top, width: x.width, height: x.height }), r(!0);
      return;
    }
    const g = e.current, y = ++o.current;
    queueMicrotask(() => {
      y === o.current && e.current === g && (e.current = null, r(!1), !(!g || !n.cloneOnUnmount || !a.current) && g.style.visibility !== "hidden" && Un(d.current) && al(g, u.current, i.current));
    });
  }, []), l = ie(() => {
    const p = e.current;
    if (!p || getComputedStyle(p).transform !== "none") return;
    const g = p.getBoundingClientRect();
    (g.width > 0 || g.height > 0) && (i.current = { left: g.left, top: g.top, width: g.width, height: g.height });
  }, []), a = S(n.visible);
  a.current = n.visible;
  const c = S(n.visible), u = S(n.anchor ?? null);
  u.current = n.anchor ?? null;
  const f = S(n.onClosed);
  f.current = n.onClosed;
  const d = S(n.morph !== !1);
  d.current = n.morph !== !1;
  const h = S(0);
  return Je(() => {
    if (!t || !a.current || !Un(d.current)) return;
    const p = e.current;
    p && sl(h, p, u.current);
  }, [t, n.visible]), Z(() => {
    if (!t || !a.current) return;
    let p = 0;
    const g = () => {
      p = 0, l(), p = requestAnimationFrame(g);
    };
    return p = requestAnimationFrame(g), () => {
      p && cancelAnimationFrame(p);
    };
  }, [t, l]), Je(() => {
    var y;
    const p = c.current;
    if (c.current = n.visible, n.visible || !p) return;
    const g = e.current;
    if (!g || !Un(d.current)) {
      (y = f.current) == null || y.call(f);
      return;
    }
    ll(h, g, u.current, () => {
      var x;
      return (x = f.current) == null ? void 0 : x.call(f);
    });
  }, [n.visible]), Z(() => {
    if (!t || !a.current) return;
    const p = (g) => {
      const y = e.current;
      y && y.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", p, { capture: !0 }), () => document.removeEventListener("wheel", p, { capture: !0 });
  }, [t]), Z(() => {
    if (!t || !a.current) return;
    const p = (g) => {
      const y = e.current;
      y && y.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("touchmove", p, { capture: !0 }), () => document.removeEventListener("touchmove", p, { capture: !0 });
  }, [t]), s;
}
const qi = 384;
function cl(n) {
  const e = n.visualViewport;
  return e ? { x: e.offsetLeft, y: e.offsetTop, width: e.width, height: e.height } : { x: 0, y: 0, width: n.innerWidth, height: n.innerHeight };
}
function ul({
  anchorRef: n,
  panelRef: e,
  open: t,
  contentRef: r,
  gap: i = 4,
  padding: o = 8,
  maxHeight: s,
  minHeight: l = 32,
  onPosition: a
}) {
  const c = nn(), u = S(c);
  u.current = c;
  const f = S(a);
  f.current = a, Je(() => {
    if (!t) return;
    let d = 0, h = !1;
    const p = () => {
      d || (d = requestAnimationFrame(g));
    }, g = () => {
      if (d = 0, h) return;
      const N = u.current, k = n.current, $ = e.current;
      if (!N || !k || !$ || !$.isConnected) return;
      const D = (r == null ? void 0 : r.current) ?? $, T = cl(N), J = s ?? qi, I = Math.min(l, J), H = Math.max(0, $.offsetHeight - D.offsetHeight), B = Math.max(I, Math.ceil(D.scrollHeight + H)), _ = Math.min(B, J);
      $.style.maxHeight = `${_}px`;
      let j = _;
      Ds(k, $, {
        strategy: "fixed",
        placement: "bottom-start",
        middleware: [
          Pi(i),
          Li({ boundary: T, padding: o, fallbackStrategy: "bestFit" }),
          Bi({ boundary: T, padding: o, mainAxis: !1 }),
          Ps({
            boundary: T,
            padding: o,
            apply({ availableHeight: v }) {
              j = Math.max(I, Math.floor(Math.min(J, v))), $.style.maxHeight = `${j}px`;
            }
          })
        ]
      }).then(({ x: v, y: F, placement: U }) => {
        h || f.current({
          top: Math.round(F),
          left: Math.round(v),
          maxH: j,
          side: U.startsWith("top") ? "top" : "bottom",
          ready: !0
        });
      });
    };
    g();
    const y = u.current, x = (y == null ? void 0 : y.document) ?? null, C = (y == null ? void 0 : y.visualViewport) ?? null, w = () => p();
    C == null || C.addEventListener("resize", w), C == null || C.addEventListener("scroll", w), y == null || y.addEventListener("resize", w), x == null || x.addEventListener("scroll", w, { capture: !0, passive: !0 });
    let E = null;
    return typeof ResizeObserver < "u" && (E = new ResizeObserver(w), e.current && E.observe(e.current), r != null && r.current && E.observe(r.current)), () => {
      h = !0, d && cancelAnimationFrame(d), C == null || C.removeEventListener("resize", w), C == null || C.removeEventListener("scroll", w), y == null || y.removeEventListener("resize", w), x == null || x.removeEventListener("scroll", w, { capture: !0 }), E == null || E.disconnect();
    };
  }, [t, n, e, r, i, o, s, l]);
}
let Ct = null;
function Vi(n) {
  return Ct == null || Ct(), Ct = n, () => {
    Ct === n && (Ct = null);
  };
}
const Ki = xt(null);
function Yi({ mode: n = "dark", accent: e = "zinc", surface: t = "neutral", context: r = "surface", children: i }) {
  return /* @__PURE__ */ m(Ki.Provider, { value: { mode: n, accent: e, surface: t, context: r }, children: i });
}
function Hd({ mode: n = "dark", accent: e = "zinc", surface: t = "neutral", context: r = "surface", children: i, className: o, style: s }) {
  return /* @__PURE__ */ m(Yi, { mode: n, accent: e, surface: t, context: r, children: /* @__PURE__ */ m(
    "div",
    {
      "data-mode": n,
      "data-accent": e,
      "data-surface": t,
      "data-context": r,
      className: o,
      style: s,
      children: i
    }
  ) });
}
function vt() {
  return bt(Ki);
}
function dl(n, e = "dark") {
  return n ? n.context === "surface" ? n.mode : n.mode === "light" ? "light" : n.accent === "emerald" ? "emerald" : n.accent === "blue" ? "blue" : "dark" : e;
}
function Ui(n, e) {
  if (n) return { theme: n, attrs: { "data-theme": n } };
  if (!e) return { theme: "dark", attrs: { "data-theme": "dark" } };
  if (e.context === "chrome") {
    const t = dl(e);
    return { theme: t, attrs: { "data-theme": t } };
  }
  return { theme: e.mode, attrs: { "data-mode": e.mode, "data-accent": e.accent } };
}
function fl(n, e = "light") {
  return (n == null ? void 0 : n.mode) ?? e;
}
function hl(n) {
  return !n || n.context !== "chrome" && n.surface !== "accent" ? !1 : n.accent === "emerald" ? "emerald" : n.accent === "blue";
}
const Er = xt("dark"), Xi = () => bt(Er);
function Gi() {
  const n = xe();
  return {
    padding: `${R(8, 12, n)}px ${R(12, 16, n)}px`,
    fontSize: `${R(12, 14, n)}px`,
    lineHeight: `${R(18, 22, n)}px`
  };
}
function pl() {
  const n = xe();
  return {
    padding: `${R(6, 9, n)}px ${R(12, 16, n)}px ${R(2, 3, n)}px`,
    fontSize: `${R(10, 11, n)}px`,
    lineHeight: `${R(14, 16, n)}px`
  };
}
const ml = (n) => n ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", ti = (n) => n ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", gl = (n) => n ? "text-xs" : "text-[10px]";
function Cr(n) {
  const e = Ne && Hi() > 0;
  return {
    // Item text & hover
    itemDefault: "ui-item",
    itemDanger: "ui-item ui-item-danger",
    // Icon
    icon: "ui-icon",
    // Right-action button
    rightAction: "ui-icon-btn",
    // Separator
    separator: "ui-sep my-1",
    // Header
    headerPad: ti(e),
    headerText: `${ti(e)} font-semibold uppercase tracking-wider ${gl(e)} ui-label`,
    // Item padding
    itemPad: ml(e),
    // Input
    input: e ? "px-3 py-2 text-sm ui-input" : "px-1.5 py-0.5 text-xs ui-input",
    // Item manager row
    rowHoverBg: "ui-row",
    rowActiveBg: "ui-row ui-row-active",
    rowActiveText: "ui-row-active-text font-medium",
    rowText: "ui-text",
    rowTextHover: "ui-row-hover-text",
    // Buttons (item-manager specific)
    btnBase: "ui-icon-btn",
    btnActive: "ui-icon-btn ui-icon-btn-active",
    btnDanger: "ui-icon-btn ui-icon-btn-danger",
    btnDangerActive: "ui-icon-btn ui-icon-btn-danger ui-icon-btn-active",
    btnDisabled: "ui-disabled",
    // Edit confirm buttons
    editConfirm: "ui-icon-btn ui-icon-btn-confirm",
    editCancel: "ui-icon-btn ui-icon-btn-cancel",
    // Sizes (item-manager specific)
    btnSize: e ? "w-8 h-8" : "w-6 h-6",
    btnIcon: "w-3.5 h-3.5"
  };
}
function Qi(n) {
  const e = [];
  return Ce.Children.forEach(n, (t) => {
    if (typeof t == "string" || typeof t == "number")
      e.push(String(t));
    else if (Ce.isValidElement(t)) {
      const r = t.props.children;
      (typeof r == "string" || typeof r == "number") && e.push(String(r));
    }
  }), e.join(" ").trim();
}
const Nr = xt({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), on = xt(null), Mr = () => bt(on), Zi = xt({ query: "", setQuery: () => {
} }), yl = () => bt(Zi), xl = () => !0;
function Fn(n) {
  const e = S([]), [t, r] = G(-1), [i, o] = G(!1), [s, l] = G(0), a = ie((d) => (e.current = [...e.current, d], l((h) => h + 1), () => {
    e.current = e.current.filter((h) => h !== d), l((h) => h + 1);
  }), []), c = ie((d, h) => {
    r(d), o(h === "pointer");
  }, []), u = ie(() => {
    o((d) => d && (r(-1), !1));
  }, []);
  return En(() => ({
    /* A `filter` (the searchable query) narrows the exposed items — hidden
       rows drop out of indexing entirely, so the single highlight, the
       arrows and the typeahead all operate on the VISIBLE set only. */
    items: n ? e.current.filter(n) : e.current,
    highlightedIndex: t,
    pointerDriven: i,
    register: a,
    setHighlighted: c,
    pointerLeave: u
  }), [t, i, s, a, c, u, n]);
}
function eo(n) {
  const e = Mr(), t = S(e);
  t.current = e;
  const r = S(null);
  Z(() => {
    var a, c;
    const l = { label: n.label(), activate: n.activate, group: ((a = n.group) == null ? void 0 : a.trim()) || void 0 };
    return r.current = l, (c = t.current) == null ? void 0 : c.register(l);
  }, []);
  const i = e && r.current ? e.items.indexOf(r.current) : -1, o = !!e && !n.disabled && i >= 0 && i === e.highlightedIndex;
  return { api: e, myIndex: i, highlighted: o, setPointer: (l) => {
    !n.disabled && e && l >= 0 && e.setHighlighted(l, "pointer");
  } };
}
function Ar(n, e, t, r) {
  const i = S(-1);
  i.current = e.highlightedIndex;
  const o = S(e);
  o.current = e;
  const s = S(n);
  s.current = n;
  const l = S(r);
  l.current = r;
  const a = S({ text: "", time: 0 }), c = S(!1);
  c.current || (c.current = !0, t.current = (u) => {
    var p, g, y, x, C;
    if (!s.current) return;
    const f = u.target;
    if (!!f && !!f.closest("input, textarea, [contenteditable]") && (u.key.length === 1 || u.key === "Enter" || u.key === "Escape")) {
      const w = (g = (p = l.current) == null ? void 0 : p.onFieldKey) == null ? void 0 : g.call(p, u);
      (!!((y = l.current) != null && y.onFieldKey) || o.current.items.length > 0) && (u.stopImmediatePropagation(), w && u.preventDefault());
      return;
    }
    const h = o.current.items;
    if (h.length !== 0) {
      if (u.key === "ArrowDown" || u.key === "ArrowUp") {
        u.preventDefault(), u.stopImmediatePropagation();
        const w = u.key === "ArrowDown" ? 1 : -1, E = (i.current + w + h.length) % h.length;
        o.current.setHighlighted(E, "keyboard");
      } else if (u.key === "ArrowRight") {
        u.preventDefault(), u.stopImmediatePropagation();
        const w = i.current;
        w >= 0 && w < h.length && h[w].submenu && h[w].activate();
      } else if (u.key === "ArrowLeft")
        u.preventDefault(), u.stopImmediatePropagation(), (C = (x = l.current) == null ? void 0 : x.onCloseSub) == null || C.call(x);
      else if (u.key === "Enter" || u.key === " ") {
        u.preventDefault(), u.stopImmediatePropagation();
        const w = i.current;
        w >= 0 && w < h.length && h[w].activate();
      } else if (u.key.length === 1 && !u.ctrlKey && !u.metaKey && !u.altKey) {
        u.preventDefault(), u.stopImmediatePropagation();
        const w = Date.now(), E = (w - a.current.time > 500 ? "" : a.current.text) + u.key.toLowerCase();
        if (a.current = { text: E, time: w }, !E) return;
        const N = i.current + 1;
        for (let k = 0; k < h.length; k++) {
          const $ = (N + k) % h.length;
          if (h[$].label.toLowerCase().startsWith(E)) {
            o.current.setHighlighted($, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function Rr(n, e, t, r, i, o, s) {
  const l = S(e);
  l.current = e;
  const a = S(n);
  a.current = n;
  const c = S(i);
  c.current = i;
  const u = S(s == null ? void 0 : s.ignoreFields);
  u.current = s == null ? void 0 : s.ignoreFields;
  const f = S(!1);
  f.current || (f.current = !0, o.current = (d) => {
    if (!a.current || c.current) return;
    const h = r.current;
    if (h && h.contains(d.target)) return;
    if (u.current) {
      const g = d.target;
      if (g && g.closest("input, textarea, [contenteditable]")) return;
    }
    l.current.items.length === 0 || !(d.key === "ArrowDown" || d.key === "ArrowUp" || d.key === "ArrowLeft" || d.key === "ArrowRight" || d.key === "Enter" || d.key === " " || d.key.length === 1 && !d.ctrlKey && !d.metaKey && !d.altKey) || (d.preventDefault(), d.stopImmediatePropagation(), t.current(d));
  });
}
function Ir(n, e) {
  const t = S(n);
  t.current = n;
  const r = S(!1);
  r.current || (r.current = !0, e.current = (i) => {
    if (!t.current) return;
    const o = i.currentTarget, s = o.querySelector("[data-menu-items]") ?? o;
    s.scrollHeight > s.clientHeight && (i.preventDefault(), s.scrollTop += i.deltaY);
  });
}
function Hn({
  open: n,
  onClose: e,
  onOpenChange: t,
  trigger: r,
  align: i = "left",
  width: o,
  theme: s,
  children: l,
  morph: a = !0,
  contentClassName: c,
  maxMenuHeight: u,
  initialHighlightIndex: f,
  searchable: d = !1,
  searchPlaceholder: h,
  searchFilter: p,
  searchValue: g,
  onSearchValueChange: y
}) {
  const x = vt(), C = Ui(s, x), w = C.theme, [E, N] = G([]), [k, $] = G(null), D = tn(), T = Fi(), J = S(null), I = S(null), H = S(n);
  H.current = n;
  const [B, _] = G(n), [j, v] = G(""), F = d && g !== void 0, U = F ? g : j, ne = F ? y ?? (() => {
  }) : v, [ue, Q] = G(!1), P = F && !ue ? "" : U, Y = S(null), V = xe(), M = {
    padding: `${R(8, 12, V)}px ${R(12, 16, V)}px`,
    fontSize: `${R(12, 14, V)}px`
  }, [X, ce] = G(0), be = d && !F;
  Z(() => {
    var Fe;
    if (!be || !n) return;
    const L = (Fe = I.current) == null ? void 0 : Fe.querySelector("[data-menu-items]");
    if (!L) return;
    const ee = () => ce(L.offsetWidth - L.clientWidth);
    ee();
    const le = new ResizeObserver(ee);
    return le.observe(L), () => le.disconnect();
  }, [n, be, U]);
  const Le = En(() => {
    if (!d) return;
    const L = P.trim().toLowerCase();
    return L ? (ee) => {
      var le;
      return p ? p(L, ee.label, ee.group) : ee.label.toLowerCase().includes(L) || (((le = ee.group) == null ? void 0 : le.toLowerCase().includes(L)) ?? !1);
    } : xl;
  }, [P, d, p]), z = Fn(Le);
  Z(() => {
    if (n)
      return _(!0), F || v(""), Q(!1), z.setHighlighted(f ?? -1, "keyboard"), Vi(() => {
        t == null || t(!1), e == null || e();
      });
    N([]), Q(!1);
  }, [n, f, t, e]), Z(() => {
    if (!n || !T) return;
    const L = (ee) => {
      if (ee.pointerType !== "touch") return;
      const le = ee.target;
      le && (I.current && I.current.contains(le) || J.current && J.current.contains(le) || le instanceof Element && le.closest("[data-radix-menu-content]") || (t == null || t(!1), e == null || e()));
    };
    return T.addEventListener("pointerdown", L, { capture: !0 }), () => T.removeEventListener("pointerdown", L, { capture: !0 });
  }, [n, T, t, e]);
  const te = ie(() => {
    const L = J.current;
    if (!L) return null;
    const ee = L.getBoundingClientRect();
    return { left: ee.left, top: ee.top, width: ee.width, height: ee.height };
  }, []), de = Tr({
    visible: n,
    morph: a,
    anchor: te,
    onClosed: () => _(!1)
  }), Te = S(() => {
  }), Me = S(() => {
  }), fe = S(() => {
  }), Ae = ie((L) => {
    if (L.key === "Enter") {
      const ee = z.highlightedIndex, le = z.items[ee >= 0 ? ee : 0];
      return le == null || le.activate(), !0;
    }
    return L.key === "Escape" ? (t == null || t(!1), e == null || e(), !0) : !1;
  }, [z, t, e]);
  Ar(n && E.length === 0, z, Te, { onFieldKey: Ae }), Ir(n, Me), Rr(n, z, Te, I, E.length > 0, fe, { ignoreFields: F });
  const ve = S(null), De = ie((L) => {
    var ee;
    if (L) {
      L.addEventListener("keydown", Te.current, { capture: !0 }), L.addEventListener("wheel", Me.current, { passive: !1 });
      const le = L.ownerDocument;
      ve.current = le, le.addEventListener("keydown", fe.current, { capture: !0 }), kt(!0);
    } else
      (ee = ve.current) == null || ee.removeEventListener("keydown", fe.current, { capture: !0 }), ve.current = null, kt(!1);
    I.current = L, de(L);
  }, [de]), [Ee, Ue] = G({ top: 0, left: 0, maxH: qi, side: "bottom", ready: !1 }), [sn, ln] = G(0), [Vn, kt] = G(!1);
  Z(() => {
    n && J.current && ln(J.current.getBoundingClientRect().width);
  }, [n]), ul({
    anchorRef: J,
    panelRef: I,
    open: n && Vn,
    maxHeight: u,
    onPosition: Ue
  }), Z(() => {
    var L;
    if (Ee.ready && n) {
      if (d) {
        (L = Y.current) == null || L.focus();
        return;
      }
      const ee = I.current;
      ee && ee.ownerDocument.activeElement !== ee && !ee.contains(ee.ownerDocument.activeElement) && ee.focus();
    }
  }, [Ee.ready, n, d]), Z(() => {
    if (!n || !d) return;
    if (z.items.length === 0) {
      z.highlightedIndex !== -1 && z.setHighlighted(-1, "keyboard");
      return;
    }
    const L = z.highlightedIndex;
    (L < 0 || L >= z.items.length) && z.setHighlighted(0, "keyboard");
  }, [n, U, d, z.items.length]), Je(() => {
    var ee;
    if (!n || z.highlightedIndex < 0 || z.pointerDriven) return;
    const L = (ee = I.current) == null ? void 0 : ee.querySelector(`[data-ei="${z.highlightedIndex}"]`);
    L == null || L.scrollIntoView({ block: "nearest" });
  }, [n, z.highlightedIndex, z.pointerDriven]);
  const St = ie((L) => {
    !L && !H.current || (!L && _t.current && (ut.current = !0), t ? t(L) : L || e == null || e());
  }, [t, e]), Xe = S(B);
  Xe.current = B;
  const _t = S(!1), ut = S(!1), an = ie(() => {
    if (!H.current && Xe.current) {
      if (ut.current) {
        ut.current = !1, _t.current = !1;
        return;
      }
      t == null || t(!0);
    }
  }, [t]), dt = Ce.isValidElement(r) ? r : null, Wt = dt ? Ce.cloneElement(dt, {
    ref: (L) => {
      J.current = L;
    },
    onPointerDown: () => {
      _t.current = !0, ut.current = !1;
    },
    onClick: (L) => {
      var ee, le;
      (le = (ee = dt.props).onClick) == null || le.call(ee, L), an();
    },
    /* Combobox mode (externalSearch): the trigger field IS the search box,
       so it also drives the menu's keyboard — arrows move the single
       highlight, Enter activates the highlighted (or first visible) row,
       and a printable key flips the filter live (the committed value was
       just showing the full list until the first keystroke). */
    onKeyDown: (L) => {
      var ee, le;
      if ((le = (ee = dt.props).onKeyDown) == null || le.call(ee, L), !(!F || !H.current)) {
        if (L.key.length === 1 && !L.ctrlKey && !L.metaKey && !L.altKey)
          Q(!0);
        else if (L.key === "ArrowDown" || L.key === "ArrowUp") {
          L.preventDefault();
          const Fe = z.items;
          if (Fe.length === 0) return;
          const Ge = L.key === "ArrowDown" ? 1 : -1, Qe = (z.highlightedIndex + Ge + Fe.length) % Fe.length;
          z.setHighlighted(Qe, "keyboard");
        } else if (L.key === "Enter") {
          L.preventDefault();
          const Fe = z.highlightedIndex, Ge = z.items[Fe >= 0 ? Fe : 0];
          Ge == null || Ge.activate();
        }
      }
    }
  }) : r, Tt = `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] min-w-0 ${be ? "overflow-hidden" : "overflow-y-auto scrollbar-custom"}`;
  return /* @__PURE__ */ O(ae.Root, { open: n || B, onOpenChange: St, modal: !1, children: [
    /* @__PURE__ */ m(ae.Trigger, { asChild: !0, children: Wt }),
    /* @__PURE__ */ m(ae.Portal, { container: D ?? void 0, children: /* @__PURE__ */ m(Er.Provider, { value: w, children: /* @__PURE__ */ m(Nr.Provider, { value: { chain: E, setChain: N, morph: a, keyboardOpened: k, setKeyboardOpened: $ }, children: /* @__PURE__ */ m(on.Provider, { value: z, children: /* @__PURE__ */ m(Zi.Provider, { value: { query: U, setQuery: ne }, children: /* @__PURE__ */ O(
      ae.Content,
      {
        ref: De,
        ...C.attrs,
        "data-ui-fixed": !0,
        className: `${Tt} ${o || ""} ${c || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: Ee.left,
          top: Ee.top,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: o ? void 0 : sn || void 0,
          maxHeight: Ee.maxH,
          visibility: Ee.ready ? "visible" : "hidden"
        },
        onPointerLeave: z.pointerLeave,
        children: [
          be && /* @__PURE__ */ m("div", { className: "shrink-0 px-0 pt-1 pb-1", style: { paddingRight: X }, children: /* @__PURE__ */ O("div", { "data-menu-search": !0, className: "ui-item ui-item-highlighted flex items-center gap-2 rounded", style: M, children: [
            /* @__PURE__ */ m(Ts, { className: "w-3.5 h-3.5 shrink-0 ui-icon" }),
            /* @__PURE__ */ m(
              "input",
              {
                ref: Y,
                value: U,
                onChange: (L) => ne(L.target.value),
                placeholder: h ?? "Search…",
                className: "flex-1 min-w-0 bg-transparent outline-none text-current placeholder:text-current placeholder:opacity-50 cursor-text"
              }
            ),
            U ? /* @__PURE__ */ m(
              "button",
              {
                type: "button",
                tabIndex: -1,
                "aria-label": "Clear search",
                className: "shrink-0 ui-icon-btn rounded flex items-center justify-center p-1 -m-1",
                onPointerDown: (L) => L.stopPropagation(),
                onClick: () => {
                  var L;
                  ne(""), (L = Y.current) == null || L.focus();
                },
                children: /* @__PURE__ */ m(Cn, { className: "w-3.5 h-3.5" })
              }
            ) : /* @__PURE__ */ m("span", { className: "w-3.5 h-3.5 shrink-0" })
          ] }) }),
          be ? /* @__PURE__ */ m("div", { "data-menu-items": !0, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: l }) : l
        ]
      }
    ) }) }) }) }) })
  ] });
}
function _d({
  open: n,
  onClose: e,
  items: t,
  activeId: r,
  onSelect: i,
  onRename: o,
  onDuplicate: s,
  onDelete: l,
  onCreate: a,
  onImport: c,
  onExport: u,
  onReset: f,
  onTrash: d,
  closeOnSelect: h,
  readOnly: p = !1,
  theme: g,
  align: y,
  label: x,
  header: C,
  itemLabel: w,
  trigger: E,
  minItems: N = 1,
  itemRender: k,
  morph: $ = !0,
  contentClassName: D
}) {
  const T = Cr(), J = Gi(), [I, H] = G(null), [B, _] = G(""), j = S(B);
  j.current = B;
  const v = S(null), F = S(null);
  Z(() => {
    n && requestAnimationFrame(() => {
      var P, Y;
      (Y = (P = F.current) == null ? void 0 : P.querySelector('[data-active="1"]')) == null || Y.scrollIntoView({ block: "nearest" });
    });
  }, [n]), Z(() => {
    var V;
    if (!n) return;
    const P = (M) => {
      var de, Te, Me;
      const X = M.target;
      if (X && X.closest("input, textarea, [contenteditable]")) {
        I && X === v.current && (M.key === "Enter" ? (M.preventDefault(), M.stopImmediatePropagation(), ne()) : M.key === "Escape" && (M.preventDefault(), M.stopImmediatePropagation(), ue()));
        return;
      }
      const ce = (de = F.current) == null ? void 0 : de.closest(".ui-menu");
      if (!ce || !ce.contains(M.target)) return;
      const be = ce.ownerDocument, Le = [...ce.querySelectorAll('[data-active] > [role="menuitem"]:first-child')], z = [...ce.querySelectorAll('div:last-child > [role="menuitem"]')], te = [...Le, ...z];
      if (M.key === "ArrowDown" || M.key === "ArrowUp") {
        M.preventDefault(), M.stopImmediatePropagation();
        const fe = be.activeElement;
        let Ae = fe ? te.indexOf(fe) : -1;
        if (Ae < 0 && fe) {
          const Ee = fe.closest("[data-active]"), Ue = Ee == null ? void 0 : Ee.querySelector('[role="menuitem"]:first-child');
          Ue && (Ae = Le.indexOf(Ue));
        }
        const ve = M.key === "ArrowDown" ? 1 : -1, De = Ae < 0 ? ve === 1 ? 0 : te.length - 1 : (Ae + ve + te.length) % te.length;
        (Te = te[De]) == null || Te.focus({ preventScroll: !0 });
        return;
      }
      if (M.key === "ArrowLeft" || M.key === "ArrowRight") {
        const fe = be.activeElement, Ae = fe == null ? void 0 : fe.closest("[data-active]");
        if (!Ae) return;
        M.preventDefault(), M.stopImmediatePropagation();
        const ve = [...Ae.querySelectorAll('[role="menuitem"]')].slice(1);
        if (ve.length === 0) return;
        const De = fe && Ae.contains(fe) ? ve.indexOf(fe) : -1, Ee = M.key === "ArrowRight" ? 1 : -1, Ue = De < 0 ? 0 : (De + Ee + ve.length) % ve.length;
        (Me = ve[Ue]) == null || Me.focus({ preventScroll: !0 });
        return;
      }
    }, Y = ((V = F.current) == null ? void 0 : V.ownerDocument) ?? null;
    return Y == null || Y.addEventListener("keydown", P, { capture: !0 }), () => Y == null ? void 0 : Y.removeEventListener("keydown", P, { capture: !0 });
  }, [n, I]), Z(() => {
    if (!I) return;
    const P = t.find((X) => X.id === I);
    P && !B && _(P.name);
    const Y = requestAnimationFrame(() => {
      const X = v.current;
      X && (X.focus(), X.select());
    });
    let V = 0;
    const M = window.setInterval(() => {
      const X = v.current;
      if (V++, !X || V > 12) {
        clearInterval(M);
        return;
      }
      X.ownerDocument.activeElement !== X && (X.focus(), X.select());
    }, 50);
    return () => {
      cancelAnimationFrame(Y), clearInterval(M);
    };
  }, [I]), Z(() => {
    if (I) {
      const P = t.find((Y) => Y.id === I);
      P && !B && _(P.name);
    }
  }, [I, t]);
  const U = (P, Y) => {
    H(P), _(Y);
  }, ne = () => {
    I && j.current.trim() && o(I, j.current.trim()), H(null);
  }, ue = () => {
    H(null);
  }, Q = w || C.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ O(Hn, { open: n, onOpenChange: (P) => {
    P ? (H(null), _("")) : (I && B.trim() && o(I, B.trim()), H(null), _("")), (!P || !p) && e(P);
  }, width: "w-80", theme: g, align: y, trigger: E, morph: $, contentClassName: D, children: [
    /* @__PURE__ */ m("div", { className: `shrink-0 ${T.headerText}`, children: C }),
    /* @__PURE__ */ m("div", { ref: F, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: t.map((P) => {
      const Y = P.id === r, V = I === P.id;
      return /* @__PURE__ */ m("div", { "data-active": Y ? "1" : void 0, className: `scroll-my-4 flex items-center gap-1 rounded ${Y || V ? T.rowActiveBg : T.rowHoverBg} ${I && !V ? "opacity-40 pointer-events-none" : ""}`, children: V ? /* @__PURE__ */ O(Ve, { children: [
        /* @__PURE__ */ m("div", { className: "flex-1 min-w-0 flex items-center", children: /* @__PURE__ */ m(
          "input",
          {
            ref: v,
            autoFocus: !0,
            value: B,
            onChange: (M) => _(M.target.value),
            onKeyDown: (M) => {
              M.key === "Enter" && (M.preventDefault(), M.stopPropagation(), ne()), M.key === "Escape" && (M.preventDefault(), M.stopPropagation(), ue());
            },
            className: "w-full outline-none bg-transparent placeholder:text-current placeholder:opacity-50",
            style: J
          }
        ) }),
        /* @__PURE__ */ m(
          ae.Item,
          {
            className: `shrink-0 ${T.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${T.editConfirm}`,
            onSelect: (M) => {
              M.preventDefault(), ne();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ m(Oi, { className: T.btnIcon })
          }
        ),
        /* @__PURE__ */ m(
          ae.Item,
          {
            className: `shrink-0 ${T.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${T.editCancel}`,
            onSelect: (M) => {
              M.preventDefault(), ue();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ m(Cn, { className: T.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ O(Ve, { children: [
        /* @__PURE__ */ m(
          ae.Item,
          {
            style: J,
            className: `flex-1 min-w-0 rounded outline-none cursor-pointer flex items-center ${T.rowText} ${Y ? "" : T.rowTextHover}`,
            onSelect: h ? () => {
              i(P.id);
            } : (M) => {
              M.preventDefault(), i(P.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ m("span", { className: `truncate ${Y ? T.rowActiveText : ""}`, children: k ? k(P) : P.name })
          }
        ),
        /* @__PURE__ */ m(
          ae.Item,
          {
            className: `shrink-0 ${T.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${Y ? T.btnActive : T.btnBase}`,
            onSelect: (M) => {
              M.preventDefault(), U(P.id, P.name);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ m(Es, { className: T.btnIcon })
          }
        ),
        /* @__PURE__ */ m(
          ae.Item,
          {
            className: `shrink-0 ${T.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${Y ? T.btnActive : T.btnBase}`,
            onSelect: (M) => {
              M.preventDefault();
              const X = s(P.id);
              X && U(X, `${P.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ m($i, { className: T.btnIcon })
          }
        ),
        /* @__PURE__ */ m(
          ae.Item,
          {
            className: `shrink-0 ${T.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${t.length <= N ? T.btnDisabled : Y ? T.btnDangerActive : T.btnDanger}`,
            onSelect: (M) => {
              M.preventDefault(), l(P.id);
            },
            onTouchStart: () => {
            },
            disabled: p || t.length <= N,
            children: /* @__PURE__ */ m(lr, { className: T.btnIcon })
          }
        )
      ] }) }, P.id);
    }) }),
    /* @__PURE__ */ O("div", { className: `shrink-0 ${I ? "opacity-40 pointer-events-none" : ""}`, children: [
      f && /* @__PURE__ */ O(Ve, { children: [
        /* @__PURE__ */ m(ae.Separator, { className: T.separator }),
        /* @__PURE__ */ O(
          ae.Item,
          {
            className: `w-full text-left ${T.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${T.itemDefault} ui-row`,
            onSelect: (P) => {
              P.preventDefault(), f();
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: [
              /* @__PURE__ */ m(Di, { className: `${T.btnIcon} ${T.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (a || c || u || d) && /* @__PURE__ */ m(ae.Separator, { className: T.separator }),
      a && /* @__PURE__ */ O(
        ae.Item,
        {
          className: `w-full text-left ${T.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${T.itemDefault} ui-row`,
          onSelect: (P) => {
            P.preventDefault();
            const Y = a();
            Y && U(Y, "");
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ m(Cs, { className: `${T.btnIcon} ${T.icon}` }),
            "New ",
            Q
          ]
        }
      ),
      c && /* @__PURE__ */ O(
        ae.Item,
        {
          className: `w-full text-left ${T.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${T.itemDefault} ui-row`,
          onSelect: (P) => {
            P.preventDefault(), c();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ O("svg", { className: `${T.btnIcon} ${T.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ m("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ m("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ m("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      u && /* @__PURE__ */ O(
        ae.Item,
        {
          className: `w-full text-left ${T.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${T.itemDefault} ui-row`,
          onSelect: (P) => {
            P.preventDefault(), u();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ O("svg", { className: `${T.btnIcon} ${T.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ m("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ m("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ m("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      d && /* @__PURE__ */ O(
        ae.Item,
        {
          className: `w-full text-left ${T.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${T.itemDefault} ui-row`,
          onSelect: (P) => {
            P.preventDefault(), d();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ m(lr, { className: `${T.btnIcon} ${T.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
function bl({
  onClick: n,
  icon: e,
  disabled: t = !1,
  variant: r = "default",
  className: i = "",
  children: o,
  keepOpen: s = !1,
  selected: l = !1,
  rightAction: a,
  trailing: c,
  group: u
}) {
  var T;
  Xi();
  const f = Cr(), d = Gi(), h = pl(), p = S(!1), g = S(null), { myIndex: y, highlighted: x, setPointer: C, api: w } = eo({
    label: () => Qi(o),
    activate: () => {
      t || n();
    },
    disabled: t,
    group: u
  }), { query: E } = yl(), N = E.trim() !== "" && y < 0, k = u == null ? void 0 : u.trim(), $ = !!k && y >= 0 && (y === 0 || ((T = w == null ? void 0 : w.items[y - 1]) == null ? void 0 : T.group) !== k), D = r === "danger" ? f.itemDanger : f.itemDefault;
  return /* @__PURE__ */ O(Ve, { children: [
    $ && /* @__PURE__ */ m(
      "div",
      {
        "data-menu-group": k,
        role: "presentation",
        className: "ui-label shrink-0 select-none font-semibold uppercase tracking-wider pointer-events-none",
        style: h,
        children: k
      }
    ),
    /* @__PURE__ */ O(
      ae.Item,
      {
        ref: g,
        "data-ei": y >= 0 ? y : void 0,
        style: { ...d, display: N ? "none" : void 0 },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${D} ${l ? "ui-item-selected" : ""} ${x ? "ui-item-highlighted" : ""} ${t ? "opacity-30 pointer-events-none" : ""} ${i}`,
        onSelect: (J) => {
          if (p.current) {
            p.current = !1;
            return;
          }
          s && J.preventDefault(), n();
        },
        onPointerEnter: () => {
          C(y);
        },
        onTouchStart: () => {
        },
        disabled: t,
        children: [
          e && /* @__PURE__ */ m("span", { className: `${f.icon} shrink-0`, children: e }),
          /* @__PURE__ */ m("span", { className: "flex-1 truncate", children: o }),
          c && /* @__PURE__ */ m("span", { className: "shrink-0 ml-1 flex items-center", children: c }),
          a && /* @__PURE__ */ m(
            "span",
            {
              className: `shrink-0 ml-1 p-0.5 rounded ${f.rightAction}`,
              title: a.title,
              onPointerDown: (J) => {
                J.stopPropagation(), J.preventDefault(), p.current = !0, a.onClick();
              },
              onClick: (J) => {
                J.stopPropagation(), J.preventDefault();
              },
              children: a.icon
            }
          )
        ]
      }
    )
  ] });
}
function vl({ id: n, label: e, icon: t, width: r, side: i = "right", children: o, contentClassName: s }) {
  const { chain: l, setChain: a, morph: c, keyboardOpened: u, setKeyboardOpened: f } = bt(Nr), d = l.includes(n), h = l[l.length - 1] === n, p = Xi(), g = tn(), y = S(null), x = S(null), [C, w] = G(d), E = !d && C;
  Z(() => {
    d && w(!0);
  }, [d]);
  const N = () => a((V) => {
    const M = V.indexOf(n);
    return M >= 0 ? V.slice(0, M) : V;
  }), k = Fn(), $ = Mr(), D = S($);
  D.current = $;
  const T = S(null);
  Z(() => {
    var M;
    const V = {
      label: e,
      activate: () => {
        f(n), a((X) => X.includes(n) ? X : [...X, n]);
      },
      submenu: !0
    };
    return T.current = V, (M = D.current) == null ? void 0 : M.register(V);
  }, []);
  const J = $ && T.current ? $.items.indexOf(T.current) : -1, I = J >= 0 && J === $.highlightedIndex, H = ie(() => {
    const V = y.current;
    if (!V) return null;
    const M = V.getBoundingClientRect();
    return { left: M.left, top: M.top, width: M.width, height: M.height };
  }, []), B = Tr({
    visible: d,
    morph: c,
    anchor: H,
    onClosed: () => w(!1)
  }), _ = S(() => {
  }), j = S(() => {
  }), v = S(() => {
  });
  Ar(d && h, k, _, {
    onCloseSub: () => {
      N(), $ && J >= 0 && $.setHighlighted(J, "keyboard");
    }
  });
  const F = S(u);
  F.current = u, Z(() => {
    d && (F.current === n ? (k.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var V;
      return (V = x.current) == null ? void 0 : V.focus();
    }), f(null)) : k.setHighlighted(-1, "keyboard"));
  }, [d]), Ir(d, j), Rr(d, k, _, x, !h, v), Ce.useLayoutEffect(() => {
    var M;
    if (!d || k.highlightedIndex < 0 || k.pointerDriven) return;
    const V = (M = x.current) == null ? void 0 : M.querySelector(`[data-ei="${k.highlightedIndex}"]`);
    V == null || V.scrollIntoView({ block: "nearest" });
  }, [d, k.highlightedIndex, k.pointerDriven]);
  const U = S(null), ne = ie((V) => {
    var M;
    if (V) {
      V.addEventListener("keydown", _.current, { capture: !0 }), V.addEventListener("wheel", j.current, { passive: !1 });
      const X = V.ownerDocument;
      U.current = X, X.addEventListener("keydown", v.current, { capture: !0 });
    } else
      (M = U.current) == null || M.removeEventListener("keydown", v.current, { capture: !0 }), U.current = null;
    x.current = V, B(V);
  }, [B]), ue = xe(), Q = { padding: `${R(8, 12, ue)}px ${R(12, 16, ue)}px`, fontSize: R(12, 14, ue) }, P = `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${I ? " ui-item-highlighted" : ""}${E ? " ui-sub-closing" : ""}`, Y = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${s || ""}`;
  return /* @__PURE__ */ O(ae.Sub, { open: d || C, onOpenChange: (V) => a((M) => {
    if (!V) {
      const X = M.indexOf(n);
      return X >= 0 ? M.slice(0, X) : M;
    }
    return M.includes(n) ? M : [...M, n];
  }), children: [
    /* @__PURE__ */ O(
      ae.SubTrigger,
      {
        ref: y,
        "data-ei": J >= 0 ? J : void 0,
        style: Q,
        className: P,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          $ && J >= 0 && $.setHighlighted(J, "pointer");
        },
        onPointerDown: (V) => {
          V.pointerType === "pen" && (V.preventDefault(), a((M) => d ? M.slice(0, M.indexOf(n)) : [...M, n]));
        },
        children: [
          i === "left" && /* @__PURE__ */ m(Nn, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ O("span", { className: "flex items-center gap-2", children: [
            t && /* @__PURE__ */ m("span", { className: "ui-icon shrink-0", children: t }),
            e
          ] }),
          i === "right" && /* @__PURE__ */ m(Nn, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ m(ae.Portal, { container: g ?? void 0, children: /* @__PURE__ */ m(
      ae.SubContent,
      {
        ref: ne,
        "data-theme": p,
        className: Y,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: k.pointerLeave,
        children: /* @__PURE__ */ m(on.Provider, { value: k, children: o })
      }
    ) })
  ] });
}
const jt = 8, Wd = ({ open: n, x: e, y: t, onClose: r, children: i, containerRef: o, theme: s, morph: l = !0 }) => {
  const a = vt(), c = s ? { theme: s, attrs: { "data-theme": s } } : a ? Ui(void 0, a) : { theme: "light", attrs: { "data-theme": "light" } }, { theme: u } = c, f = xe(), d = R(12, 14, f), h = S(null), p = nn(), [g, y] = G(!1), [x, C] = G([]), [w, E] = G(null), N = Fn();
  Z(() => {
    if (n)
      return N.setHighlighted(-1, "keyboard"), Vi(r);
  }, [n, r]);
  const k = S({ left: e, top: t });
  n && (k.current = { left: e, top: t });
  const $ = ie(() => ({ left: k.current.left, top: k.current.top, width: 0, height: 0 }), []), D = Tr({
    visible: !0,
    morph: l,
    anchor: $,
    cloneOnUnmount: !0
  }), T = S(() => {
  }), J = S(() => {
  }), I = S(() => {
  });
  Ar(n, N, T), Ir(n, J), Rr(n, N, T, h, x.length > 0, I);
  const H = S(null), B = ie((v) => {
    var F;
    if (v) {
      v.addEventListener("keydown", T.current, { capture: !0 }), v.addEventListener("wheel", J.current, { passive: !1 });
      const U = v.ownerDocument;
      H.current = U, U.addEventListener("keydown", I.current, { capture: !0 });
    } else
      (F = H.current) == null || F.removeEventListener("keydown", I.current, { capture: !0 }), H.current = null;
    h.current = v, y(!!v), D(v);
  }, [D]), [_, j] = G(null);
  return Je(() => {
    var X;
    if (!n || !g || !h.current) return;
    const v = h.current, F = v.offsetWidth, U = v.offsetHeight, ne = (X = o == null ? void 0 : o.current) == null ? void 0 : X.getBoundingClientRect(), ue = ne ? ne.right : (p == null ? void 0 : p.innerWidth) ?? 0, Q = ne ? ne.bottom : (p == null ? void 0 : p.innerHeight) ?? 0, P = ne ? ne.left : 0, Y = ne ? ne.top : 0;
    let V = Math.max(Y + jt, k.current.top), M = Math.max(P + jt, k.current.left);
    M + F > ue && (M = ue - F - jt), V + U > Q && (V = Math.max(Y + jt, Q - U - jt)), j({ left: M, top: V });
  }, [n, g, e, t, o]), n ? /* @__PURE__ */ O(ae.Root, { open: n, onOpenChange: (v) => {
    v || r();
  }, modal: !1, children: [
    /* @__PURE__ */ m(ae.Trigger, { asChild: !0, children: /* @__PURE__ */ m("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ m(ae.Portal, { children: /* @__PURE__ */ m(Er.Provider, { value: u, children: /* @__PURE__ */ m(Nr.Provider, { value: { chain: x, setChain: C, morph: l, keyboardOpened: w, setKeyboardOpened: E }, children: /* @__PURE__ */ m(on.Provider, { value: N, children: /* @__PURE__ */ m(
      ae.Content,
      {
        ref: B,
        ...c.attrs,
        "data-ui-fixed": !0,
        className: "fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom",
        style: { fontSize: d, left: (_ == null ? void 0 : _.left) ?? k.current.left, top: (_ == null ? void 0 : _.top) ?? k.current.top, touchAction: "manipulation" },
        onPointerLeave: N.pointerLeave,
        children: i
      }
    ) }) }) }) })
  ] }) : null;
}, jd = ({ onClick: n, variant: e = "default", icon: t, disabled: r = !1, selected: i = !1, trailing: o, children: s }) => {
  const l = xe(), a = { padding: `${R(8, 12, l)}px ${R(12, 16, l)}px`, fontSize: R(12, 14, l) }, c = Mr(), u = S(c);
  u.current = c;
  const f = S(null);
  Z(() => {
    var g;
    const p = { label: Qi(s), activate: () => {
      r || n();
    } };
    return f.current = p, (g = u.current) == null ? void 0 : g.register(p);
  }, []);
  const d = c && f.current ? c.items.indexOf(f.current) : -1, h = !r && d >= 0 && d === c.highlightedIndex;
  return /* @__PURE__ */ O(
    ae.Item,
    {
      "data-ei": d >= 0 ? d : void 0,
      onClick: r ? void 0 : n,
      onPointerEnter: () => {
        !r && c && d >= 0 && c.setHighlighted(d, "pointer");
      },
      onTouchStart: () => {
      },
      disabled: r,
      style: a,
      className: `w-full text-left flex items-center gap-2 rounded cursor-pointer ${r ? "opacity-40 cursor-default" : e === "danger" ? "ui-item ui-item-danger" : "ui-item"} ${i ? "ui-item-selected" : ""} ${h ? "ui-item-highlighted" : ""}`,
      children: [
        t,
        /* @__PURE__ */ m("span", { className: "flex-1 truncate", children: s }),
        o && /* @__PURE__ */ m("span", { className: "shrink-0 ml-1 flex items-center", children: o })
      ]
    }
  );
}, Jd = () => /* @__PURE__ */ m(ae.Separator, { className: "ui-sep my-1" }), qd = (n) => /* @__PURE__ */ m(vl, { ...n, width: n.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), se = 8, to = "[data-modal-stack]", tt = 220, Ut = "cubic-bezier(0.32, 0.72, 0, 1)", wn = 0.94;
function Nt() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function ot(n) {
  if (!n) return { top: 0, height: 0, bottom: 0 };
  const e = n.visualViewport, t = e ? e.offsetTop : 0, r = e ? e.height : n.innerHeight;
  return { top: t, height: r, bottom: t + r };
}
function no(n, e) {
  return `translate(${e.left - n.left}px, ${e.top - n.top}px) scale(${e.width / n.width}, ${e.height / n.height})`;
}
function ni(n, e, t, r) {
  const i = ++n.current, o = e.getBoundingClientRect();
  e.style.transition = "none", e.style.transform = no(o, t), e.style.transformOrigin = "0 0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === i && (e.style.transition = `transform ${tt}ms ${Ut}, opacity 180ms ease`, e.style.transform = "none", window.setTimeout(() => {
        n.current === i && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", r());
      }, tt + 80));
    });
  });
}
function wl(n, e, t) {
  const r = ++n.current;
  e.style.transition = "none", e.style.transformOrigin = "center", e.style.transform = `scale(${wn})`, e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === r && (e.style.transition = `transform ${tt}ms ${Ut}`, e.style.transform = "none", window.setTimeout(() => {
        n.current === r && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", t());
      }, tt + 60));
    });
  });
}
function ri(n, e, t) {
  const r = ++n.current, i = e.getBoundingClientRect(), o = 1 - wn, s = { left: i.left + i.width * o / 2, top: i.top + i.height * o / 2, width: i.width * wn, height: i.height * wn };
  e.style.transition = `transform ${tt}ms ${Ut}, opacity 170ms ease`, e.style.transformOrigin = "0 0", e.style.transform = no(i, s), e.style.opacity = "0", window.setTimeout(() => {
    n.current === r && (e.style.visibility = "hidden", t(), requestAnimationFrame(() => {
      n.current !== r || e.isConnected || (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", e.style.opacity = "", e.style.visibility = "");
    }));
  }, tt + 60);
}
function Xn(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(to) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function dn(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(to) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function kl({
  open: n,
  onClose: e,
  title: t,
  icon: r,
  width: i,
  footer: o,
  children: s,
  onReset: l,
  morph: a = !0,
  flat: c = !1,
  closable: u = !0,
  dismissOnBackdrop: f = !0,
  theme: d,
  surface: h,
  accent: p
}) {
  const g = vt(), y = d ?? (g == null ? void 0 : g.mode) ?? "dark", x = h ?? (g == null ? void 0 : g.surface) ?? "neutral", C = p ?? (g == null ? void 0 : g.accent) ?? "zinc", w = S(null), E = S(null), N = S(null), k = xe(), $ = R(20, 24, k), D = R(10, 12, k), T = R(12, 14, k), J = R(14, 16, k), I = R(20, 24, k), H = R(20, 24, k), B = R(20, 24, k), _ = R(14, 16, k), j = R(16, 20, k), v = R(10, 12, k), F = R(12, 14, k), U = R(8, 10, k), ne = R(4, 6, k), ue = { padding: `${D}px ${$}px` }, Q = { fontSize: T }, P = { padding: `${H}px ${I}px 16px ${I}px` }, Y = { fontSize: J }, V = { padding: `0 ${I}px 16px` }, M = { padding: `${B}px ${I}px` }, X = { fontSize: v, padding: `${ne}px ${U}px` }, [ce, be] = G(!1), Le = ie((b) => {
    w.current = b, be(b !== null);
  }, []), z = tn(), te = nn(), de = S(te);
  de.current = te;
  const [Te, Me] = G(null), fe = S(null), Ae = S(!1), ve = S(!1), De = S(0), Ee = S({ w: 0, h: 0 }), Ue = S(!1), [sn, ln] = G(!1), [Vn, kt] = G(!1), St = S(0), Xe = S(!1), [_t, ut] = G(!1), an = S(a);
  an.current = a;
  const dt = S(!1), Wt = S(!1), Tt = () => {
    Wt.current = !0, ln(!0);
  }, L = () => {
    Wt.current = !1, ln(!1);
  };
  Z(() => {
    n || (Me(null), Ue.current = !1, Ae.current = !1, kt(!1));
  }, [n]), Je(() => {
    if (!n || Ue.current || !ce || !w.current) return;
    Ue.current = !0;
    const b = w.current.getBoundingClientRect(), q = de.current ?? null, K = (q == null ? void 0 : q.innerWidth) ?? 0, re = ot(q);
    Me({
      left: Math.max(se, Math.min((K - b.width) / 2, K - b.width - se)),
      top: Math.max(re.top + se, Math.min(re.top + (re.height - b.height) / 2, re.bottom - b.height - se))
    });
  }, [n, ce]), Je(() => {
    if (!n || !ce || !a || Nt() || !w.current) return;
    const b = w.current, q = Xn(b), K = q[q.length - 1];
    Tt(), K ? ni(St, b, K.getBoundingClientRect(), L) : wl(St, b, L);
  }, [n, ce]);
  const ee = ie(() => {
    if (!u || Xe.current) return;
    const b = w.current, q = !!b && Xn(b).length > 0;
    if (!b || !a || Nt() || q) {
      e();
      return;
    }
    Xe.current = !0, ut(!0), dt.current = !0, Tt(), ri(St, b, () => {
      Xe.current = !1, ut(!1), L(), e();
    });
  }, [a, e, u]), le = ie(() => {
    const b = w.current;
    if (!b || dt.current || !an.current || Nt() || Xn(b).length > 0) return;
    const q = b.ownerDocument, K = b.cloneNode(!0);
    K.removeAttribute("data-modal-stack"), K.removeAttribute("data-state"), K.removeAttribute("role"), K.removeAttribute("data-aria-hidden"), K.removeAttribute("tabindex"), K.setAttribute("aria-hidden", "true"), K.style.pointerEvents = "none", q.body.appendChild(K), ri({ current: 0 }, K, () => {
      K.isConnected && K.remove();
    });
  }, []);
  Je(() => () => le(), [le]);
  const Fe = S(n);
  Je(() => {
    const b = Fe.current;
    Fe.current = n, b && !n && le();
  }, [n, ce, le]), Z(() => {
    if (!n || !ce || !a || !w.current) return;
    const b = w.current, q = b.parentNode;
    if (!q) return;
    let K = 0, re = null, oe = !1;
    const he = () => {
      K = 0;
      const we = dn(b);
      if (we.length > 0)
        b.style.opacity = "", b.style.pointerEvents = "", re = we[we.length - 1].getBoundingClientRect(), oe = !0, K = requestAnimationFrame(he);
      else if (oe) {
        oe = !1, re && !Nt() && (Tt(), ni(St, b, re, L)), re = null;
        const ze = de.current ?? null;
        ze == null || ze.setTimeout(() => {
          !b || !b.isConnected || getComputedStyle(b).opacity !== "1" && (b.style.opacity = "1", b.style.pointerEvents = "");
        }, 240);
      }
    }, ye = new MutationObserver(() => {
      !K && dn(b).length > 0 && (K = requestAnimationFrame(he));
    });
    return ye.observe(q, { childList: !0 }), () => {
      ye.disconnect(), K && cancelAnimationFrame(K);
    };
  }, [n, ce]), Z(() => {
    if (!ce || !a || Nt() || !w.current) return;
    const b = w.current;
    let q = Math.round(b.getBoundingClientRect().height), K = !1;
    const re = new ResizeObserver(() => {
      if (!b.isConnected) return;
      const oe = Math.round(b.getBoundingClientRect().height);
      if (!K) {
        K = !0, q = oe;
        return;
      }
      if (Math.abs(oe - q) < 1) return;
      if (fe.current || Xe.current || dn(b).length > 0) {
        q = oe;
        return;
      }
      if (Wt.current) return;
      const he = q;
      q = oe, Tt();
      const ye = b.getBoundingClientRect(), we = ot(de.current ?? null), ze = !Ae.current && !ve.current, Et = ze ? we.top + (we.height - he) / 2 : ye.top, je = ze ? we.top + (we.height - oe) / 2 : ye.top;
      b.style.transition = "none", b.style.height = `${he}px`, ze && (b.style.top = `${Et}px`), E.current && (E.current.style.overflow = "hidden"), b.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          b.style.height === `${he}px` && (b.style.transition = `height ${tt}ms ${Ut}${ze ? `, top ${tt}ms ${Ut}` : ""}`, b.style.height = `${oe}px`, ze && (b.style.top = `${je}px`), window.setTimeout(() => {
            b.style.height === `${oe}px` && (b.style.transition = "", b.style.height = "", E.current && (E.current.style.overflow = ""), ze && Me({ left: ye.left, top: je }), L());
          }, tt + 60));
        });
      });
    });
    return re.observe(b), () => re.disconnect();
  }, [ce]), Z(() => {
    if (!ce || !w.current || a && !Nt()) return;
    const b = w.current, q = new ResizeObserver(() => {
      if (!b.isConnected || fe.current || Xe.current || ve.current || dn(b).length > 0) return;
      const K = de.current ?? null, re = ot(K), oe = (K == null ? void 0 : K.innerWidth) ?? 0, he = b.getBoundingClientRect(), ye = Math.max(re.top + se, Math.min(he.top, re.bottom - he.height - se)), we = Math.max(se, Math.min(he.left, oe - he.width - se));
      (Math.abs(ye - he.top) > 0.5 || Math.abs(we - he.left) > 0.5) && Me({ left: we, top: ye });
    });
    return q.observe(b), () => q.disconnect();
  }, [ce, a]);
  const Ge = ie(() => {
    const b = w.current;
    if (!b) return null;
    const q = b.getBoundingClientRect();
    return { left: q.left, top: q.top, width: q.width, height: q.height };
  }, []), Qe = ie((b, q) => {
    const K = de.current ?? null, re = (K == null ? void 0 : K.innerWidth) ?? 0, oe = ot(K), he = Ge(), ye = he ? he.width : Math.min(re - se * 2, 576), we = he ? he.height : Math.min(oe.height - se * 2, 400);
    return {
      left: Math.max(se, Math.min(b, re - ye - se)),
      top: Math.max(oe.top + se, Math.min(q, oe.bottom - we - se))
    };
  }, [Ge]);
  Z(() => {
    if (!n) return;
    const b = de.current ?? null, q = (b == null ? void 0 : b.visualViewport) ?? null;
    if (!b || !q) return;
    const K = 120;
    ve.current = !1, Ee.current = { w: b.innerWidth, h: b.innerHeight };
    let re = 0;
    const oe = () => {
      if (Xe.current || fe.current) return;
      const ye = (b == null ? void 0 : b.innerHeight) ?? 0, we = (b == null ? void 0 : b.innerWidth) ?? 0, Et = ot(b).height < ye - K, je = ye < Ee.current.h - K && we === Ee.current.w;
      Et || je ? (ve.current = !0, De.current && (clearTimeout(De.current), De.current = 0)) : De.current || (De.current = (b == null ? void 0 : b.setTimeout(() => {
        ve.current = !1, De.current = 0, kt(!1);
      }, 600)) ?? 0), kt(ve.current), !re && (re = requestAnimationFrame(() => {
        var Zr;
        re = 0;
        const Xr = w.current;
        if (!Xr) return;
        const ft = ot(de.current ?? null), Ze = Xr.getBoundingClientRect(), Gr = ((Zr = de.current) == null ? void 0 : Zr.innerWidth) ?? 0, Yn = (b == null ? void 0 : b.innerHeight) ?? 0, ks = ft.height < Yn - K || Yn < Ee.current.h - K && (b == null ? void 0 : b.innerWidth) === Ee.current.w;
        Ee.current = { w: (b == null ? void 0 : b.innerWidth) ?? 0, h: Yn };
        const cn = Ze.top >= ft.top + se && Ze.bottom <= ft.bottom - se, Qr = () => {
          Me({
            left: Math.max(se, Math.min((Gr - Ze.width) / 2, Gr - Ze.width - se)),
            top: Math.max(ft.top + se, Math.min(ft.top + (ft.height - Ze.height) / 2, ft.bottom - Ze.height - se))
          });
        };
        if (ks && !Ne) {
          if (Ae.current) {
            cn || Me(Qe(Ze.left, Ze.top));
            return;
          }
          if (cn) return;
          Qr();
          return;
        }
        if (!ve.current) {
          if (Ae.current) {
            cn || Me(Qe(Ze.left, Ze.top));
            return;
          }
          cn || Qr();
        }
      }));
    };
    q.addEventListener("resize", oe), q.addEventListener("scroll", oe);
    const he = () => {
      Xe.current || fe.current || re || (re = requestAnimationFrame(() => {
        re = 0;
        const ye = w.current;
        if (!ye) return;
        const we = de.current ?? null, ze = ot(we), Et = (we == null ? void 0 : we.innerWidth) ?? 0, je = ye.getBoundingClientRect();
        if (Ae.current) {
          Me(Qe(je.left, je.top));
          return;
        }
        Me({
          left: Math.max(se, Math.min((Et - je.width) / 2, Et - je.width - se)),
          top: Math.max(ze.top + se, Math.min(ze.top + (ze.height - je.height) / 2, ze.bottom - je.height - se))
        });
      }));
    };
    return b.addEventListener("orientationchange", he), () => {
      q.removeEventListener("resize", oe), q.removeEventListener("scroll", oe), b.removeEventListener("orientationchange", he), re && cancelAnimationFrame(re), De.current && clearTimeout(De.current);
    };
  }, [n, Qe]);
  const Wr = ie((b) => {
    if (b.target.closest("button")) return;
    Ae.current = !0;
    const q = Ge();
    q && (Me(Qe(q.left, q.top)), fe.current = { startX: b.clientX, startY: b.clientY, posX: q.left, posY: q.top }, b.target.setPointerCapture(b.pointerId));
  }, [Ge, Qe]), jr = ie((b) => {
    const q = fe.current;
    q && (b.preventDefault(), Me(Qe(q.posX + b.clientX - q.startX, q.posY + b.clientY - q.startY)));
  }, [Qe]), Jr = ie(() => {
    fe.current = null;
  }, []), qr = fe.current !== null, Vr = ie(() => {
    Ae.current = !1;
    const b = de.current ?? null, q = ot(b), K = (b == null ? void 0 : b.innerWidth) ?? 0, re = w.current, oe = re ? re.getBoundingClientRect() : { width: 0, height: 0 };
    Me({
      left: Math.max(se, Math.min((K - oe.width) / 2, K - oe.width - se)),
      top: Math.max(q.top + se, Math.min(q.top + (q.height - oe.height) / 2, q.bottom - oe.height - se))
    });
  }, []), Kn = S(0), Kr = ie(() => {
    const b = Date.now();
    b - Kn.current < 300 ? (Kn.current = 0, Vr()) : Kn.current = b;
  }, [Vr]), Yr = Te !== null, bs = Yr ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", vs = `${i ? `${i} w-full` : "max-w-xl w-full"}`, Ur = {
    ...Yr ? { left: Te.left, top: Te.top } : {},
    width: `min(100%, calc(100dvw - ${se * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...Vn ? {} : { maxHeight: `calc(100dvh - ${se * 2}px)` }
  }, ws = ie((b) => {
    if (b.key !== "Enter" || b.shiftKey || b.metaKey || b.ctrlKey || b.altKey) return;
    const q = b.target, K = N.current;
    if (!(!!q.closest("[data-modal-close]") || !!K && K.contains(q) && !!q.closest('button, a, [role="button"]')) && q.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !K) return;
    const oe = Array.from(K.querySelectorAll("button[data-modal-confirm]")), he = oe.length > 0 ? oe : Array.from(K.querySelectorAll("button")), ye = he[he.length - 1];
    !ye || ye.disabled || (b.preventDefault(), ye.click());
  }, []);
  return /* @__PURE__ */ m(Yi, { mode: y, accent: C, surface: x, context: "surface", children: /* @__PURE__ */ m(it.Root, { open: n, onOpenChange: (b) => {
    b || ee();
  }, children: /* @__PURE__ */ O(it.Portal, { container: z ?? void 0, children: [
    /* @__PURE__ */ m(
      it.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${_t ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (b) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (b.preventDefault(), f && ee());
        }
      }
    ),
    /* @__PURE__ */ O(
      it.Content,
      {
        ref: Le,
        onKeyDown: ws,
        onInteractOutside: (b) => {
          f || b.preventDefault();
        },
        "data-modal-stack": !0,
        "data-mode": y,
        "data-accent": C,
        "data-surface": x,
        className: `ui-modal fixed z-[10000] bg-[var(--ui-modal-bg)] border border-[color:var(--ui-modal-border)] rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${bs} ${vs}`,
        style: { touchAction: "manipulation", colorScheme: y, ...Object.keys(Ur).length > 0 ? Ur : {} },
        children: [
          c ? /* @__PURE__ */ O(
            "div",
            {
              style: P,
              className: `flex items-center justify-between ${qr ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (b) => {
                sn || Wr(b);
              },
              onPointerMove: jr,
              onPointerUp: Jr,
              onClick: Kr,
              children: [
                /* @__PURE__ */ m(it.Title, { style: Y, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t }),
                u && /* @__PURE__ */ m(it.Close, { "data-modal-close": !0, className: "text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ m(Cn, { style: { width: j, height: j } }) })
              ]
            }
          ) : /* @__PURE__ */ O(
            "div",
            {
              style: ue,
              className: `flex items-center justify-between border-b border-[color:var(--ui-modal-header-border)] shrink-0 bg-[var(--ui-modal-header-bg)] ${qr ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (b) => {
                sn || Wr(b);
              },
              onPointerMove: jr,
              onPointerUp: Jr,
              onClick: Kr,
              children: [
                /* @__PURE__ */ O("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ m("span", { className: "text-[color:var(--ui-modal-icon)] shrink-0", children: r }),
                  /* @__PURE__ */ m(it.Title, { style: Q, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t })
                ] }),
                /* @__PURE__ */ O("div", { className: "flex items-center gap-2", children: [
                  l && /* @__PURE__ */ O("button", { onClick: l, style: X, className: "flex items-center gap-1 text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-muted-hover)] transition-colors bg-[var(--ui-modal-control-bg)] hover:bg-[var(--ui-modal-control-hover-bg)] rounded shrink-0", children: [
                    /* @__PURE__ */ m(Di, { style: { width: F, height: F } }),
                    "Reset"
                  ] }),
                  u && /* @__PURE__ */ m(it.Close, { "data-modal-close": !0, className: "text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ m(Cn, { style: { width: _, height: _ } }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ m("div", { ref: E, "data-testid": "modal-body", style: c ? V : void 0, className: "overflow-y-auto flex-1 bg-[var(--ui-modal-body-bg)] text-[color:var(--ui-modal-body-text)]", children: s }),
          o && /* @__PURE__ */ m("div", { ref: N, style: c ? M : void 0, className: c ? "" : "shrink-0", children: c ? /* @__PURE__ */ m("div", { className: "flex items-center justify-end gap-2", children: o }) : o })
        ]
      }
    )
  ] }) }) });
}
function Vd({ children: n }) {
  const e = xe(), t = R(20, 24, e), r = R(8, 12, e);
  return /* @__PURE__ */ m("div", { className: "flex items-center justify-end gap-3 border-t border-[color:var(--ui-modal-border)] bg-[var(--ui-modal-footer-bg)]", style: { padding: `${r}px ${t}px` }, children: n });
}
const Sl = "inline-flex items-center gap-2 rounded-lg text-xs transition cursor-pointer select-none whitespace-nowrap active:shadow-[inset_0_0_0_2px_var(--ui-panel-bg)]", Tl = {
  zinc: "bg-[var(--ui-footer-hero-bg)] text-[color:var(--ui-footer-hero-text)] font-semibold border border-[color:var(--ui-footer-hero-border)] hover:bg-[var(--ui-footer-hero-hover-bg)] hover:border-[color:var(--ui-footer-hero-hover-border)] disabled:opacity-40 disabled:cursor-not-allowed",
  accent: "bg-[var(--ui-accent-solid)] text-[color:var(--ui-accent-action-text)] font-semibold border border-transparent hover:bg-[var(--ui-accent-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed",
  danger: "bg-[var(--ui-danger-solid)] text-white font-semibold border border-[color:var(--ui-danger-solid)] hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
}, El = {
  /* Transparent border on every variant — auto-height buttons add the border
     to their height, so the bordered hero would otherwise be 2px taller. */
  ghost: "border border-transparent text-[color:var(--ui-text-muted)] font-medium hover:bg-[var(--ui-footer-ghost-hover-bg)] hover:text-[color:var(--ui-text-strong)] disabled:opacity-50",
  danger: "border border-transparent text-[color:var(--ui-danger-text)] font-medium hover:bg-[var(--ui-danger-hover-bg)] hover:text-[color:var(--ui-danger-hover-text)] disabled:opacity-50",
  "danger-solid": "border border-transparent bg-[var(--ui-danger-solid)] text-white font-semibold hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
};
function fn({
  variant: n = "hero",
  tone: e = "zinc",
  className: t = "",
  type: r = "button",
  ...i
}) {
  const o = at({ px: 24, py: 8, fs: 12 }, { px: 28, py: 10, fs: 14 });
  return /* @__PURE__ */ m(
    "button",
    {
      type: r,
      style: o,
      className: `${Sl} ${n === "hero" ? Tl[e] : El[n]} ${t}`,
      ...i
    }
  );
}
function ro({ checked: n, size: e, tone: t = "accent" }) {
  return /* @__PURE__ */ m(
    "span",
    {
      className: `ui-check-indicator ${n ? "ui-check-indicator-checked" : ""} ${t === "danger" ? "ui-check-tone-danger" : ""}`,
      "aria-hidden": !0,
      children: n ? /* @__PURE__ */ O("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: [
        /* @__PURE__ */ m("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor" }),
        /* @__PURE__ */ m("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "#ffffff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" })
      ] }) : /* @__PURE__ */ m("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: /* @__PURE__ */ m("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) })
    }
  );
}
function Cl({ checked: n, onChange: e, disabled: t = !1, label: r, id: i, className: o = "", labelClassName: s = "", theme: l, variant: a = "pill", tone: c = "accent", block: u = !1 }) {
  const f = a !== "plain", d = xe(), h = R(16, 20, d), p = R(12, 14, d), g = R(12, 14, d), y = R(12, 16, d), x = R(10, 12, d), C = R(8, 10, d);
  return /* @__PURE__ */ O(
    "label",
    {
      className: `ui-checkbox ${f ? "ui-checkbox-pill rounded-lg" : ""} ${c === "danger" ? "ui-checkbox-tone-danger" : ""} ${t ? "ui-disabled" : ""} ${o}`,
      style: { display: u ? "flex" : "inline-flex", alignItems: "center", gap: C, padding: f ? `${x}px ${y}px` : void 0 },
      onClick: (E) => E.stopPropagation(),
      ...l ? { "data-theme": l } : {},
      children: [
        /* @__PURE__ */ m(
          "input",
          {
            type: "checkbox",
            id: i,
            checked: n,
            disabled: t,
            onChange: (E) => e(E.target.checked),
            className: "sr-only"
          }
        ),
        f ? /* @__PURE__ */ m(ro, { checked: n, size: h, tone: c }) : /* @__PURE__ */ m("span", { className: "ui-checkbox-box", style: { width: h, height: h }, "aria-hidden": !0, children: n && /* @__PURE__ */ m("svg", { viewBox: "0 0 12 12", fill: "none", style: { width: p, height: p }, "aria-hidden": !0, children: /* @__PURE__ */ m("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ m("span", { className: `ui-checkbox-label ${s}`, style: { fontSize: g }, children: r })
      ]
    }
  );
}
function Kd(n = "md") {
  const e = Ne && Hi() > 0;
  return n === "sm" ? `${e ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"} ui-input` : `${e ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs"} ui-input`;
}
function io(n = "md") {
  return n === "sm" ? at({ px: 8, py: 6, fs: 12 }, { px: 12, py: 8, fs: 14 }) : at({ px: 10, py: 5, fs: 12 }, { px: 14, py: 9, fs: 14 });
}
const oo = xt(null);
function Yd() {
  const n = bt(oo);
  if (!n) throw new Error("useDialog must be used within DialogProvider");
  return n;
}
function Ud({ children: n, theme: e, accent: t, surface: r }) {
  const [i, o] = G(null), [s, l] = G(!1), a = S(null), c = xe(), u = R(16, 20, c), f = R(12, 14, c), d = io(), h = S(i);
  h.current = i;
  const p = ie(() => {
    const N = h.current;
    N && (N.kind === "confirm" ? N.resolve(!1) : N.kind === "prompt" ? N.resolve(null) : N.resolve());
  }, []), g = ie((N) => {
    if (N.suppressKey) {
      const k = localStorage.getItem(N.suppressKey);
      if (k && Date.now() < parseInt(k, 10))
        return Promise.resolve(!0);
    }
    return new Promise((k) => {
      p(), l(!1), o({ kind: "confirm", options: N, resolve: k });
    });
  }, [p]), y = ie((N) => new Promise((k) => {
    p(), o({ kind: "prompt", options: N, resolve: k });
  }), [p]), x = ie((N) => new Promise((k) => {
    p(), o({ kind: "alert", options: N, resolve: k });
  }), [p]);
  Z(() => {
    if (i) {
      const N = setTimeout(() => {
        var k;
        return (k = a.current) == null ? void 0 : k.focus();
      }, 50);
      return () => clearTimeout(N);
    }
  }, [i]);
  const C = ie(() => {
    var N, k;
    if (i) {
      if (i.kind === "confirm") {
        const $ = i.options;
        $.suppressKey && s && localStorage.setItem($.suppressKey, String(Date.now() + 864e5)), i.resolve(!0);
      } else i.kind === "prompt" ? i.resolve(((k = (N = a.current) == null ? void 0 : N.value) == null ? void 0 : k.trim()) || null) : i.resolve();
      o(null);
    }
  }, [i, s]), w = i !== null;
  Z(() => {
    if (!w) return;
    const N = (k) => {
      k.key !== "Enter" || k.shiftKey || k.metaKey || k.ctrlKey || k.altKey || k.isComposing || (k.preventDefault(), k.stopImmediatePropagation(), C());
    };
    return document.addEventListener("keydown", N, !0), () => document.removeEventListener("keydown", N, !0);
  }, [w, C]);
  const E = ie(() => {
    i && (i.kind === "confirm" ? i.resolve(!1) : i.kind === "prompt" ? i.resolve(null) : i.resolve(), o(null));
  }, [i]);
  return /* @__PURE__ */ O(oo.Provider, { value: { confirm: g, prompt: y, alert: x }, children: [
    n,
    w && /* @__PURE__ */ m(
      kl,
      {
        open: !0,
        onClose: E,
        closable: (i == null ? void 0 : i.kind) !== "alert",
        dismissOnBackdrop: (i == null ? void 0 : i.kind) !== "alert",
        title: (i == null ? void 0 : i.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: i && /* @__PURE__ */ O(Ve, { children: [
          i.kind !== "alert" && /* @__PURE__ */ m(fn, { variant: "ghost", onClick: E, children: "Cancel" }),
          i.kind === "alert" ? /* @__PURE__ */ m(fn, { onClick: C, children: "OK" }) : i.kind === "confirm" ? /* @__PURE__ */ m(
            fn,
            {
              "data-modal-confirm": !0,
              variant: i.options.danger ? "danger-solid" : "hero",
              onClick: C,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ m(fn, { "data-modal-confirm": !0, onClick: C, children: "Save" })
        ] }),
        children: /* @__PURE__ */ O("div", { className: "flex flex-col", style: { gap: u }, children: [
          (i == null ? void 0 : i.options.message) && /* @__PURE__ */ m("p", { style: { fontSize: f }, className: "text-[color:var(--ui-text-muted)] leading-relaxed", children: i.options.message }),
          (i == null ? void 0 : i.kind) === "confirm" && i.options.suppressKey && /* @__PURE__ */ m(
            Cl,
            {
              block: !0,
              checked: s,
              onChange: l,
              tone: "danger",
              label: "Don't ask again (24 hours)"
            }
          ),
          (i == null ? void 0 : i.kind) === "prompt" && /* @__PURE__ */ m(
            "input",
            {
              ref: a,
              type: "text",
              defaultValue: i.options.defaultValue || "",
              placeholder: i.options.placeholder,
              style: d,
              className: "w-full ui-input"
            }
          )
        ] })
      }
    )
  ] });
}
const Nl = 500, Ml = 250, Al = 5, He = 88, ii = 4;
function Rl(n, e) {
  const t = n.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  t.style.strokeDasharray = String(r), t.style.strokeDashoffset = String(r);
  const i = performance.now(), o = (s) => {
    const l = s - i, a = Math.min(l / e, 1);
    t.style.strokeDashoffset = String(r * (1 - a)), a < 1 && requestAnimationFrame(o);
  };
  requestAnimationFrame(o);
}
function Il({ x: n, y: e, ms: t }) {
  const r = S(null), i = tn();
  return Z(() => {
    r.current && Rl(r.current, t);
  }, [t]), br(
    /* @__PURE__ */ m(
      "div",
      {
        style: {
          position: "fixed",
          left: n - He / 2,
          top: e - He / 2,
          width: He,
          height: He,
          zIndex: 99999,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ O("svg", { ref: r, width: He, height: He, viewBox: `0 0 ${He} ${He}`, children: [
          /* @__PURE__ */ m(
            "circle",
            {
              cx: He / 2,
              cy: He / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: ii + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ m(
            "circle",
            {
              cx: He / 2,
              cy: He / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: ii,
              strokeLinecap: "round",
              style: { transform: "rotate(-90deg)", transformOrigin: "center" }
            }
          )
        ] })
      }
    ),
    i ?? document.body
  );
}
function Xd() {
  return { "data-no-longpress": "true" };
}
function zl(n) {
  const e = n.tagName;
  return !!(e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || e === "BUTTON" || n.isContentEditable || n.closest("[data-no-longpress]") || n.closest("button, input, select, textarea"));
}
function Gd({
  children: n,
  showRing: e = !0,
  longPressMs: t = Nl,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: i,
  onLongPress: o
}) {
  const [s, l] = G(null), a = Fi(), c = S(null), u = S(null), f = S({ x: 0, y: 0, target: null }), d = S(!1), h = Math.min(Ml, t * 0.5), p = S(i);
  p.current = i;
  const g = S(o);
  return g.current = o, Z(() => {
    if (!Ne || !a) return;
    const y = (E) => {
      if (!ar(E.pointerType) || E.button !== 0) return;
      const N = E.target;
      if (!N.closest(r) || (p.current ? !p.current(N) : zl(N))) return;
      const k = E.clientX, $ = E.clientY;
      f.current = { x: k, y: $, target: E.target }, d.current = !0, e && (u.current = setTimeout(() => l({ x: k, y: $ }), h)), c.current = setTimeout(() => {
        if (!d.current) return;
        u.current && (clearTimeout(u.current), u.current = null), l(null);
        const D = f.current.target;
        if (!D) return;
        const T = g.current;
        if (T) {
          T(D, k, $);
          return;
        }
        const J = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: k,
          clientY: $,
          button: 2,
          view: window
        });
        D.dispatchEvent(J);
      }, t);
    }, x = (E) => {
      if (!d.current || c.current === null) return;
      const N = E.clientX - f.current.x, k = E.clientY - f.current.y;
      Math.sqrt(N * N + k * k) > Al && (clearTimeout(c.current), c.current = null, u.current && (clearTimeout(u.current), u.current = null), d.current = !1, l(null));
    }, C = () => {
      c.current !== null && (clearTimeout(c.current), c.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), d.current = !1, l(null);
    }, w = (E) => {
      ar(E.pointerType) && (c.current !== null && (clearTimeout(c.current), c.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), d.current = !1, l(null));
    };
    return a == null || a.addEventListener("pointerdown", y), a.addEventListener("pointermove", x), a.addEventListener("pointerup", C), a.addEventListener("pointercancel", C), a.addEventListener("pointerleave", w), () => {
      a.removeEventListener("pointerdown", y), a.removeEventListener("pointermove", x), a.removeEventListener("pointerup", C), a == null || a.removeEventListener("pointercancel", C), a == null || a.removeEventListener("pointerleave", w), c.current !== null && clearTimeout(c.current), u.current !== null && clearTimeout(u.current);
    };
  }, [e, t, h, r]), /* @__PURE__ */ O(Ve, { children: [
    n,
    e && s && /* @__PURE__ */ m(Il, { x: s.x, y: s.y, ms: t - h })
  ] });
}
function Qd() {
  const n = ol();
  return il ? n === null || ar(n) : !1;
}
const oi = "transition-[grid-template-columns] ease-out duration-150 group-hover:duration-200 motion-reduce:transition-none", Ol = "group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] group-data-[state=open]:grid-cols-[1fr]", $l = "group-hover:grid-cols-[0fr] group-focus-visible:grid-cols-[0fr] group-data-[state=open]:grid-cols-[0fr]", Dl = "group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[state=open]:opacity-100";
function Pl({ icon: n, collapse: e = !1, iconWithLabel: t = !0, active: r = !1, gap: i = 6, children: o }) {
  const s = !!e && !!n, l = s && !t, a = !!n && (t || s);
  return s ? /* @__PURE__ */ O(Ve, { children: [
    a && (l ? /* @__PURE__ */ m("span", { "data-kit-icon": !0, className: `grid min-w-0 ${oi} ${r ? "grid-cols-[0fr]" : `grid-cols-[1fr] ${$l}`}`, children: /* @__PURE__ */ m("span", { className: "inline-flex min-w-0 items-center overflow-hidden", children: n }) }) : /* @__PURE__ */ m("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: n })),
    /* @__PURE__ */ m("span", { "data-kit-label": !0, className: `grid min-w-0 ${oi} ${r ? "grid-cols-[1fr]" : `grid-cols-[0fr] ${Ol}`}`, children: /* @__PURE__ */ m("span", { className: "min-w-0 overflow-hidden", children: /* @__PURE__ */ m(
      "span",
      {
        className: `flex min-w-0 items-center whitespace-nowrap transition-[opacity,padding-left] duration-100 group-hover:duration-150 motion-reduce:transition-none ${r ? "opacity-100" : `opacity-0 ${Dl}`} ${l ? `pl-[var(--kit-collapse-gap)] group-hover:pl-0! group-focus-visible:pl-0! group-data-[state=open]:pl-0! ${r ? "pl-0!" : ""}` : ""}`,
        style: l ? { "--kit-collapse-gap": `${i}px` } : { paddingLeft: i },
        children: o
      }
    ) }) })
  ] }) : /* @__PURE__ */ O(Ve, { children: [
    a && /* @__PURE__ */ m("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: n }),
    o
  ] });
}
const Zd = {
  light: { plain: "bg-zinc-950", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" },
  dark: { plain: "bg-white", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" }
};
function et({
  variant: n = "subtle",
  theme: e,
  cloud: t,
  active: r = !1,
  iconOnly: i = !1,
  icon: o,
  collapse: s = !1,
  iconWithLabel: l = !0,
  className: a = "",
  type: c = "button",
  children: u,
  ...f
}) {
  const d = vt(), h = e ?? (d == null ? void 0 : d.mode) ?? "light", p = t ?? hl(d), g = at({ px: 10, py: 4, fs: 12 }, { px: 14, py: 8, fs: 14 }), y = at({ px: 12, py: 4, fs: 12 }, { px: 16, py: 8, fs: 14 }), x = at({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), C = "", w = "", E = "inline-flex items-center rounded font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed", N = {
    light: {
      active: "text-white",
      inactive: "text-zinc-500 hover:text-zinc-900"
    },
    dark: {
      active: "text-zinc-900",
      inactive: "text-zinc-400 hover:text-zinc-200"
    }
  }, k = {
    blue: {
      active: "text-[color:var(--ui-tab-pill-accent-text)]",
      inactiveLight: "text-[color:var(--ui-tab-inactive-light)] hover:bg-[var(--ui-tab-hover-light)] hover:text-[color:var(--ui-tab-inactive-light)]",
      inactiveDark: "text-[color:var(--ui-tab-inactive-dark)] hover:text-white hover:bg-[var(--ui-tab-hover-dark)]"
    },
    emerald: {
      active: "text-[color:var(--ui-tab-pill-accent-text)]",
      inactiveLight: "text-[color:var(--ui-tab-inactive-light)] hover:bg-[var(--ui-tab-hover-light)] hover:text-[color:var(--ui-tab-inactive-light)]",
      inactiveDark: "text-[color:var(--ui-tab-inactive-dark)] hover:text-white hover:bg-[var(--ui-tab-hover-dark)]"
    }
  }, $ = {
    active: "text-zinc-900",
    inactive: "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800",
    open: "bg-zinc-800! text-white"
  }, D = {
    blue: {
      active: "text-[color:var(--ui-tab-pill-accent-text)]",
      inactive: "text-[color:var(--ui-tab-inactive-dark)] hover:text-white hover:bg-[var(--ui-tab-hover-dark)]",
      open: "bg-[var(--ui-tab-open-bg)]! text-white"
    },
    emerald: {
      active: "text-[color:var(--ui-tab-pill-accent-text)]",
      inactive: "text-[color:var(--ui-tab-inactive-dark)] hover:text-white hover:bg-[var(--ui-tab-hover-dark)]",
      open: "bg-[var(--ui-tab-open-bg)]! text-white"
    }
  }, T = {
    light: {
      subtle: { base: `${C} text-zinc-600 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-900" },
      primary: { base: `${w} bg-zinc-900 hover:bg-zinc-800 text-white`, open: "bg-zinc-800!" },
      "danger-ghost": { base: `${C} text-rose-600 hover:bg-rose-50`, open: "bg-rose-50!" }
    },
    dark: {
      subtle: { base: `${C} text-zinc-400 hover:text-zinc-200 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-200" },
      primary: { base: `${w} bg-zinc-800 hover:bg-zinc-700 text-white`, open: "bg-zinc-700!" },
      "danger-ghost": { base: `${C} text-red-400 hover:bg-rose-950/40`, open: "bg-rose-950/40!" }
    }
  }, J = {
    blue: { base: `${w} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" },
    emerald: { base: `${w} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" }
  }, I = f["data-state"] === "open", H = T[h][n], B = n === "primary" ? y : n.startsWith("tab") ? x : g, _ = R(6, 8, xe()), j = R(28, 40, xe()), v = p === "emerald" ? "emerald" : p ? "blue" : null, F = "bg-[var(--ui-btn-active-bg)]! text-[color:var(--ui-btn-active-text)]!";
  let U;
  if (n === "tab") {
    const Q = N[h];
    U = r ? v ? k[v].active : Q.active : v ? k[v][h === "light" ? "inactiveLight" : "inactiveDark"] : Q.inactive;
  } else if (n === "tab-header")
    U = `${v ? r ? D[v].active : D[v].inactive : r ? $.active : $.inactive} ${I ? v ? D[v].open : $.open : ""}`;
  else if (U = `${H.base} ${I ? H.open : ""}`, r && (U = `${U} ${F}`), n === "primary" && v) {
    const Q = J[v];
    U = I ? `${Q.base} ${Q.open}` : Q.base;
  }
  const ne = !!s && !!o && !i, ue = i ? { width: j, height: j, padding: 0, gap: 0 } : { ...B, gap: ne ? 0 : _ };
  return /* @__PURE__ */ m(
    "button",
    {
      type: c,
      "data-mode": h,
      "data-accent": d == null ? void 0 : d.accent,
      className: `${E} ${i ? "justify-center" : ""} ${ne ? "group" : ""} ${U} ${a}`,
      style: ue,
      ...f,
      children: i ? u : /* @__PURE__ */ m(Pl, { icon: o, collapse: s, iconWithLabel: l, active: r, gap: _, children: u })
    }
  );
}
const Ll = {
  border: "1px solid #d4d4d8",
  background: "rgba(255,255,255,0.94)",
  color: "#52525b",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
}, Bl = {
  border: "2px solid #2563eb",
  background: "#2563eb",
  color: "#fff",
  boxShadow: "0 4px 16px rgba(37,99,235,0.4)"
}, Fl = {
  border: "1px solid #f59e0b",
  background: "rgba(255, 251, 235, 0.94)",
  color: "#b45309",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
};
function ef({
  active: n = !1,
  warn: e = !1,
  style: t,
  className: r = "",
  type: i = "button",
  children: o,
  ...s
}) {
  return /* @__PURE__ */ m(
    "button",
    {
      type: i,
      className: `fixed z-[100] flex cursor-pointer items-center justify-center ${r}`,
      style: {
        width: 48,
        height: 48,
        borderRadius: 24,
        touchAction: "manipulation",
        backdropFilter: "blur(8px)",
        ...e ? Fl : n ? Bl : Ll,
        ...t
      },
      ...s,
      children: o
    }
  );
}
const Hl = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], _l = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Gn = 1900, Qn = 2100;
function Wl(n, e) {
  return new Date(n, e + 1, 0).getDate();
}
function jl(n, e, t) {
  return `${n}-${String(e + 1).padStart(2, "0")}-${String(t).padStart(2, "0")}`;
}
function tf({ selected: n, onChange: e, theme: t, showChips: r = !0, className: i = "", initialView: o }) {
  const s = vt(), l = t ?? (s == null ? void 0 : s.mode) ?? "light", a = /* @__PURE__ */ new Date(), c = (() => {
    if (!o) return a;
    const z = /* @__PURE__ */ new Date(o + "T00:00:00");
    return isNaN(z.getTime()) ? a : z;
  })(), [u, f] = G(c.getFullYear()), [d, h] = G(c.getMonth()), [p, g] = G("days"), [y, x] = G(null), C = En(() => new Set(n), [n]), w = (z) => {
    C.has(z) ? e(n.filter((te) => te !== z)) : e([...n, z]);
  }, E = En(() => {
    const z = Wl(u, d), te = new Date(u, d, 1).getDay(), de = [];
    for (let Te = 0; Te < te; Te++) de.push({ key: `pad-${Te}`, day: 0, empty: !0 });
    for (let Te = 1; Te <= z; Te++) de.push({ key: jl(u, d, Te), day: Te, empty: !1 });
    return de;
  }, [u, d]), N = (z) => f((te) => Math.max(Gn, Math.min(Qn, te + z))), k = (z) => {
    d + z < 0 ? (f((te) => Math.max(Gn, te - 1)), h(11)) : d + z > 11 ? (f((te) => Math.min(Qn, te + 1)), h(0)) : h((te) => te + z);
  }, $ = () => {
    if (y === null) return;
    const z = parseInt(y, 10);
    !isNaN(z) && z >= Gn && z <= Qn && f(z), x(null);
  }, D = (z) => n.some((te) => te.startsWith(`${u}-${String(z + 1).padStart(2, "0")}`)), T = xe(), J = R(4, 8, T), I = R(16, 20, T), H = R(10, 11, T), B = R(6, 8, T), _ = R(12, 14, T), j = R(6, 10, T), v = R(12, 14, T), F = R(8, 12, T), U = R(10, 12, T), ne = R(6, 10, T), ue = R(2, 6, T), Q = R(64, 80, T), P = { padding: J }, Y = { width: I, height: I }, V = { fontSize: H, paddingTop: B, paddingBottom: B }, M = { fontSize: _, paddingTop: j, paddingBottom: j }, X = { fontSize: v, paddingTop: F, paddingBottom: F }, ce = { fontSize: U, padding: `${ue}px ${ne}px` }, be = "bg-[var(--ui-date-selected-bg)] text-[color:var(--ui-date-selected-text)] hover:bg-[var(--ui-date-selected-hover-bg)]", Le = "text-[color:var(--ui-text)] hover:bg-[var(--ui-card-hover)]";
  return /* @__PURE__ */ O("div", { "data-mode": l, "data-accent": s == null ? void 0 : s.accent, "data-surface": s == null ? void 0 : s.surface, className: `border rounded-lg overflow-hidden w-full border-[color:var(--ui-border-strong)] bg-[var(--ui-date-body-bg)] text-[color:var(--ui-text)] ${i}`, children: [
    /* @__PURE__ */ O("div", { className: "flex items-center justify-between px-3 py-2 border-b bg-[var(--ui-date-header-bg)] text-[color:var(--ui-date-header-text)] border-[color:var(--ui-border)]", children: [
      /* @__PURE__ */ m(
        "button",
        {
          type: "button",
          onClick: () => p === "months" ? N(-1) : k(-1),
          style: P,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": p === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ m(Ns, { style: Y })
        }
      ),
      p === "days" ? /* @__PURE__ */ m(
        "button",
        {
          type: "button",
          onClick: () => g("months"),
          "aria-label": "Select year and month",
          className: "text-sm font-semibold rounded px-2 py-0.5 transition-colors text-[color:var(--ui-date-header-text)] hover:bg-[var(--ui-date-header-hover)]",
          children: new Date(u, d).toLocaleString("default", { month: "long", year: "numeric" })
        }
      ) : /* @__PURE__ */ m(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          "aria-label": "Year",
          value: y ?? String(u),
          onChange: (z) => x(z.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: (z) => z.target.select(),
          onBlur: $,
          onKeyDown: (z) => {
            z.key === "Enter" && (z.preventDefault(), $()), z.key === "Escape" && x(null);
          },
          style: { width: Q },
          className: "text-sm text-center font-semibold rounded outline-none py-0.5 bg-[var(--ui-date-header-hover)] text-[color:var(--ui-date-header-text)]"
        }
      ),
      /* @__PURE__ */ m(
        "button",
        {
          type: "button",
          onClick: () => p === "months" ? N(1) : k(1),
          style: P,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": p === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ m(Nn, { style: Y })
        }
      )
    ] }),
    p === "months" ? /* @__PURE__ */ O("div", { children: [
      /* @__PURE__ */ m("div", { className: "grid grid-cols-3 text-center", children: _l.map((z, te) => /* @__PURE__ */ O(
        "button",
        {
          type: "button",
          onClick: () => {
            h(te), g("days");
          },
          style: X,
          className: `relative font-medium transition-colors border-b border-[color:var(--ui-border)] ${te === d ? be : Le}`,
          children: [
            z,
            D(te) && /* @__PURE__ */ m("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${te === d ? "bg-[var(--ui-date-selected-text)]" : "bg-[var(--ui-accent-solid)]"}` })
          ]
        },
        z
      )) }),
      /* @__PURE__ */ m("div", { className: "text-center border-t border-[color:var(--ui-border)]", children: /* @__PURE__ */ m(
        "button",
        {
          type: "button",
          onClick: () => {
            f(a.getFullYear()), h(a.getMonth()), g("days");
          },
          style: { paddingTop: j, paddingBottom: j, fontSize: _ },
          className: "px-3 font-semibold rounded transition-colors text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-card-hover)]",
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ O("div", { className: "grid grid-cols-7 text-center", children: [
      Hl.map((z) => /* @__PURE__ */ m("div", { style: V, className: "font-semibold uppercase tracking-wider border-b text-[color:var(--ui-text-faint)] border-[color:var(--ui-border)]", children: z }, z)),
      E.map((z) => z.empty ? /* @__PURE__ */ m("div", {}, z.key) : /* @__PURE__ */ m(
        "button",
        {
          type: "button",
          onClick: () => w(z.key),
          style: M,
          className: `font-medium transition-colors border-b border-[color:var(--ui-border)] ${C.has(z.key) ? be : Le}`,
          children: z.day
        },
        z.key
      ))
    ] }),
    r && n.length > 0 && /* @__PURE__ */ O("div", { className: "px-3 py-2 border-t border-[color:var(--ui-border)] bg-[var(--ui-date-footer-bg)]", children: [
      /* @__PURE__ */ O("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-[color:var(--ui-text-muted)]", children: [
        n.length,
        " date",
        n.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ m("div", { className: "flex flex-wrap gap-1", children: n.map((z) => {
        const te = /* @__PURE__ */ new Date(z + "T00:00:00"), de = te.getFullYear() === a.getFullYear() ? te.toLocaleString("default", { month: "short", day: "numeric" }) : te.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ O(
          "button",
          {
            type: "button",
            onClick: () => w(z),
            "aria-label": `Remove ${de}`,
            style: ce,
            className: "inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors bg-[var(--ui-date-chip-bg)] text-[color:var(--ui-date-chip-text)] hover:bg-[var(--ui-date-chip-hover-bg)]",
            children: [
              de,
              /* @__PURE__ */ m("span", { className: "leading-none text-[color:var(--ui-text-muted)]", "aria-hidden": "true", children: "×" })
            ]
          },
          z
        );
      }) })
    ] })
  ] });
}
function nf({
  items: n,
  selected: e,
  onToggle: t,
  title: r,
  onToggleAll: i,
  allSelected: o = !1,
  toggleAllLabel: s,
  emptyHint: l = "Nothing here",
  maxHeight: a,
  disabled: c = !1,
  checkPosition: u = "leading",
  theme: f,
  className: d = ""
}) {
  const h = (E) => e instanceof Set ? e.has(E) : e.includes(E), p = xe(), g = R(12, 16, p), y = R(8, 12, p), x = R(12, 14, p), C = R(16, 20, p), w = r != null || i != null;
  return /* @__PURE__ */ O("div", { className: d, ...f ? { "data-theme": f } : {}, children: [
    w && /* @__PURE__ */ O("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ m("span", { className: "ui-checklist-title", children: r }),
      i != null && /* @__PURE__ */ m("button", { type: "button", disabled: c, onClick: i, className: "ui-checklist-toggleall", children: s ?? (o ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ O(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${c ? "ui-checklist-disabled" : ""}`,
        style: a ? { maxHeight: a, overflowY: "auto" } : void 0,
        children: [
          n.map((E) => {
            const N = h(E.id), k = /* @__PURE__ */ m(ro, { checked: N, size: C });
            return /* @__PURE__ */ O(
              "button",
              {
                type: "button",
                disabled: c,
                onClick: () => t(E.id),
                "aria-pressed": N,
                className: `ui-checklist-item ${N ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${y}px ${g}px`, fontSize: x },
                ...E.dataProps,
                children: [
                  u === "leading" && k,
                  E.leading != null && /* @__PURE__ */ m("span", { className: "ui-checklist-leading", children: E.leading }),
                  /* @__PURE__ */ m("span", { className: "ui-checklist-label", children: E.label }),
                  E.secondary != null && /* @__PURE__ */ m("span", { className: "ui-checklist-secondary", children: E.secondary }),
                  u === "trailing" && /* @__PURE__ */ m("span", { className: "ml-auto flex shrink-0", children: k })
                ]
              },
              E.id
            );
          }),
          n.length === 0 && /* @__PURE__ */ m("div", { className: "ui-checklist-empty", children: l })
        ]
      }
    )
  ] });
}
function rf({
  items: n,
  value: e,
  onChange: t,
  title: r,
  emptyHint: i = "Nothing here",
  maxHeight: o,
  compact: s = !1,
  disabled: l = !1,
  theme: a,
  className: c = ""
}) {
  const u = xe(), f = s ? 10 : R(12, 16, u), d = s ? 6 : R(8, 12, u), h = s ? 12 : R(12, 14, u), p = s ? 14 : R(16, 20, u);
  return /* @__PURE__ */ O("div", { className: c, ...a ? { "data-theme": a } : {}, children: [
    r != null && /* @__PURE__ */ m("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ m("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ O(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${l ? "ui-checklist-disabled" : ""}`,
        style: o ? { maxHeight: o, overflowY: "auto" } : void 0,
        children: [
          n.map((g) => {
            const y = e === g.id;
            return /* @__PURE__ */ O(
              "button",
              {
                type: "button",
                disabled: l,
                onClick: () => t(g.id),
                className: `ui-checklist-item ${y ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${d}px ${f}px`, fontSize: h },
                children: [
                  /* @__PURE__ */ m("span", { className: "ui-radio-circle", style: { width: p, height: p }, "aria-hidden": !0, children: y && /* @__PURE__ */ m("span", { className: "ui-radio-dot" }) }),
                  g.leading != null && /* @__PURE__ */ m("span", { className: "ui-checklist-leading", children: g.leading }),
                  /* @__PURE__ */ m("span", { className: "ui-checklist-label", children: g.label }),
                  g.secondary != null && /* @__PURE__ */ m("span", { className: "ui-checklist-secondary", children: g.secondary })
                ]
              },
              g.id
            );
          }),
          n.length === 0 && /* @__PURE__ */ m("div", { className: "ui-checklist-empty", children: i })
        ]
      }
    )
  ] });
}
const of = ({
  className: n,
  children: e,
  reference: t,
  placement: r = "top",
  anchorMode: i = "visible",
  offset: o = 8
}) => {
  const s = nn(), { refs: l, floatingStyles: a } = Ls({
    placement: r,
    strategy: "fixed",
    // transform: false — positioning via left/top so the panel never becomes
    // a containing block for `position: fixed` descendants (e.g. the token
    // autocomplete popover inside the block editor), which would double-offset
    // them and clip them against the window.
    transform: !1,
    middleware: [
      // Clip the anchor rect to the viewport FIRST so every subsequent
      // middleware (offset/flip/shift) positions against the visible part.
      {
        name: "visibleAnchor",
        fn: (c) => {
          var C;
          if (i !== "visible") return {};
          const u = (C = c.elements.floating.ownerDocument) == null ? void 0 : C.defaultView;
          if (!u) return {};
          const f = c.rects.reference, d = Math.max(f.x, 0), h = Math.max(f.y, 0), p = Math.min(f.x + f.width, u.innerWidth), g = Math.min(f.y + f.height, u.innerHeight);
          if (p <= d || g <= h) return {};
          const y = r === "left" ? p - (f.x + f.width) : r === "right" ? d - f.x : 0, x = r === "top" ? h - f.y : r === "bottom" ? g - (f.y + f.height) : 0;
          return { x: c.x + y, y: c.y + x };
        }
      },
      Pi(o),
      Li({ padding: 8 }),
      Bi({ padding: 8 }),
      // Final hard clamp into the viewport. Floating UI's shift measures the
      // panel's *current* DOM rect (one update behind), so a large scroll jump
      // can leave it off-screen next to a scrolled-out reference — this clamp
      // uses the freshly computed coords + measured size and always wins.
      {
        name: "viewportClamp",
        fn: (c) => {
          var g;
          const u = (g = c.elements.floating.ownerDocument) == null ? void 0 : g.defaultView;
          if (!u) return {};
          const f = c.rects.floating.width, d = c.rects.floating.height, h = Math.max(8, Math.min(c.x, u.innerWidth - f - 8)), p = Math.max(8, Math.min(c.y, u.innerHeight - d - 8));
          return { x: h, y: p };
        }
      }
    ],
    whileElementsMounted: Bs
  });
  return Je(() => {
    t && l.setReference(t);
  }, [t, l]), /* @__PURE__ */ O(Ve, { children: [
    !t && /* @__PURE__ */ m("div", { ref: l.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    s && br(
      /* @__PURE__ */ m(
        "div",
        {
          ref: l.setFloating,
          className: `ui-chrome ${n}`,
          style: a,
          onMouseDown: (c) => c.stopPropagation(),
          onClick: (c) => c.stopPropagation(),
          onDragStart: (c) => c.preventDefault(),
          children: e
        }
      ),
      s.document.body
    )
  ] });
};
function Jl(n, e) {
  if (!e || !Ce.isValidElement(n)) return {};
  const t = n.props;
  if (t["aria-label"] || t.title) return {};
  const r = t.children;
  if (typeof r == "string" ? r.trim().length > 0 : Array.isArray(r) ? r.some((s) => typeof s == "string" && s.trim().length > 0) : !1) return {};
  const o = e.split(`
`)[0].replace(/^•\s*/, "").trim().slice(0, 80);
  return o ? { "aria-label": o } : {};
}
const Mt = ({ content: n, children: e }) => {
  const t = vt(), r = xe(), i = R(10, 12, r), o = R(6, 6, r), s = R(10, 12, r), l = { padding: `${o}px ${i}px`, fontSize: s }, a = tn(), c = nn(), [u, f] = G(!1), [d, h] = G({ x: 0, y: 0 }), p = S(null), g = S(null), y = () => {
    if (!p.current) return;
    const w = p.current.getBoundingClientRect();
    h({ x: w.left + w.width / 2, y: w.top });
  };
  Z(() => () => {
    g.current && clearTimeout(g.current);
  }, []), Z(() => (u && c && (y(), c.addEventListener("scroll", y, !0)), () => c == null ? void 0 : c.removeEventListener("scroll", y, !0)), [u]);
  const x = Jl(e, n), C = Object.keys(x).length > 0 ? Ce.cloneElement(e, x) : e;
  return /* @__PURE__ */ O(
    "div",
    {
      ref: p,
      className: "inline-flex",
      onMouseEnter: () => {
        g.current && clearTimeout(g.current), y(), f(!0);
      },
      onMouseLeave: () => {
        g.current = setTimeout(() => f(!1), 60);
      },
      children: [
        C,
        u && br(
          /* @__PURE__ */ O(
            "div",
            {
              "data-mode": t == null ? void 0 : t.mode,
              "data-accent": t == null ? void 0 : t.accent,
              className: "ui-tooltip fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-[color:var(--ui-tooltip-border)] bg-[var(--ui-tooltip-bg)] text-[color:var(--ui-tooltip-text)] pointer-events-none",
              style: { ...l, left: d.x, top: d.y - 4, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                n.split(`
• `).map((w, E) => /* @__PURE__ */ m("div", { className: E > 0 ? "mt-0.5 pt-0.5 border-t border-[color:var(--ui-tooltip-sep)]" : "", children: w }, E)),
                /* @__PURE__ */ m("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[color:var(--ui-tooltip-bg)]" })
              ]
            }
          ),
          a ?? document.body
        )
      ]
    }
  );
}, ql = 250;
function Vl(n, e, t) {
  const [r, i] = Ce.useState(null), [o, s] = Ce.useState(!1), l = Ce.useRef(null), a = Ce.useRef(t);
  a.current = t;
  const c = Ce.useCallback(() => {
    var d;
    const f = (d = e.current) == null ? void 0 : d[a.current];
    f && i({ left: f.offsetLeft, width: f.offsetWidth });
  }, [e]);
  Ce.useLayoutEffect(() => {
    c();
  }, [t, c]), Ce.useLayoutEffect(() => {
    const f = n.current;
    if (!f) return;
    const d = () => {
      s(!0), l.current && clearTimeout(l.current), l.current = setTimeout(() => s(!1), ql), c();
    }, h = new ResizeObserver(d);
    h.observe(f);
    for (const p of e.current ?? []) p && h.observe(p);
    return () => {
      h.disconnect(), l.current && (clearTimeout(l.current), l.current = null);
    };
  }, [n, e, c]);
  const u = Ce.useMemo(
    () => {
      var f;
      return typeof window < "u" && !!((f = window.matchMedia) != null && f.call(window, "(prefers-reduced-motion: reduce)").matches);
    },
    []
  );
  return {
    style: r ? { left: 0, width: r.width, transform: `translateX(${r.left}px)` } : null,
    motionClass: u || o ? "" : "transition-[transform,width] duration-200 ease-out"
  };
}
function _n() {
  const n = xe(), e = Ne, t = e ? R(28, 40, n) : 28, r = e ? R(28, 40, n) : 28, i = e ? R(10, 14, n) : 10, o = e ? R(10, 14, n) : 10, s = e ? R(8, 10, n) : 8;
  return {
    toggle: { width: t, height: t },
    control: { height: r, padding: `0 ${i}px`, fontSize: o },
    input: { height: r, padding: `0 ${s}px`, fontSize: o }
  };
}
const sf = Ne ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", Kl = Ne ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", hn = Ne ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", Yl = "hover:bg-red-950/50", lf = Ne ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", af = "bg-[var(--ui-accent-selected-bg)] border-[var(--ui-border-strong)] text-[color:var(--ui-accent-selected-text)]", cf = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", Ul = Ne ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", uf = Ne ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50", so = Ne ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", Xl = "inline-flex rounded overflow-hidden border border-[var(--ui-border-strong)]", Gl = Ne ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", pn = ({ onClick: n, disabled: e, title: t, className: r = Kl, children: i }) => {
  const o = _n();
  return /* @__PURE__ */ m(Mt, { content: t, children: /* @__PURE__ */ m("button", { onClick: n, disabled: e, "aria-label": t, style: o.control, className: `${r} ${e ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) });
}, mn = {
  wrap: "border-[color:var(--ui-border-strong)] bg-[var(--ui-seg-track-bg)]",
  pill: "bg-[var(--ui-seg-pill)]",
  active: "text-[color:var(--ui-accent-pill-text)]",
  idle: "text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-seg-hover)]"
}, df = ({ value: n, options: e, onChange: t, disabled: r, active: i, stretch: o, dense: s, variant: l = "chrome", theme: a, tablist: c, ariaLabel: u }) => {
  const f = vt(), d = a ?? fl(f), h = a === "blue" || a === "emerald" ? a : (f == null ? void 0 : f.accent) ?? "zinc", p = { "data-mode": d === "dark" ? "dark" : "light", "data-accent": h }, g = _n(), y = s && !Ne ? 24 : g.control.height, x = at({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), C = Ne ? x : { padding: "0 12px", fontSize: 12, height: s ? 20 : 30 }, w = (D) => i ? i(D) : n === D, E = Ce.useRef(null), N = Ce.useRef([]), k = Math.max(0, e.findIndex((D) => w(D.v))), $ = Vl(E, N, k);
  return l === "track" ? /* @__PURE__ */ O(
    "div",
    {
      ref: E,
      role: c ? "tablist" : "group",
      "aria-label": u,
      ...p,
      className: `relative inline-flex items-center rounded border p-0.5 ${o ? "w-full" : ""} ${mn.wrap}`,
      children: [
        $.style && /* @__PURE__ */ m(
          "span",
          {
            "aria-hidden": !0,
            className: `absolute rounded ${mn.pill} ${$.motionClass}`,
            style: { ...$.style, top: 2, bottom: 2 }
          }
        ),
        e.map((D, T) => {
          const J = w(D.v);
          return /* @__PURE__ */ O(
            "button",
            {
              ref: (I) => {
                N.current[T] = I;
              },
              ...D.dataProps,
              type: "button",
              disabled: r,
              onClick: () => t(D.v),
              title: D.title,
              role: c ? "tab" : void 0,
              "aria-selected": c ? J : void 0,
              "aria-pressed": c ? void 0 : J,
              "aria-label": D.ariaLabel ?? (D.l ? void 0 : D.title),
              style: C,
              className: `relative z-10 inline-flex cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap rounded font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${o ? "flex-1" : ""} ${J ? mn.active : mn.idle}`,
              children: [
                D.icon,
                D.l
              ]
            },
            D.v
          );
        })
      ]
    }
  ) : /* @__PURE__ */ O("div", { ref: E, className: `relative ${Xl} bg-[var(--ui-seg-track-bg)]${o ? " w-full" : ""}`, children: [
    $.style && /* @__PURE__ */ m(
      "span",
      {
        "aria-hidden": !0,
        className: `absolute bg-[var(--ui-accent-pill-bg)] ${$.motionClass}`,
        style: { ...$.style, top: 0, bottom: 0 }
      }
    ),
    e.map((D, T) => {
      const J = w(D.v);
      return /* @__PURE__ */ O(
        "button",
        {
          ref: (I) => {
            N.current[T] = I;
          },
          ...D.dataProps,
          disabled: r,
          onClick: () => t(D.v),
          title: D.title,
          style: { ...g.control, height: y },
          className: `relative z-10 font-medium transition-colors disabled:opacity-30 ${o ? "flex-1" : ""} ${J ? "text-[color:var(--ui-accent-pill-text)]" : "text-[color:var(--ui-text-muted)] hover:bg-[var(--ui-accent-hover-bg)]"} ${D.v !== e[e.length - 1].v ? "border-r border-[var(--ui-border)]" : ""}`,
          children: [
            D.icon,
            D.l
          ]
        },
        D.v
      );
    })
  ] });
}, ff = ({ children: n }) => /* @__PURE__ */ O("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ m("span", { className: Ne ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: n }),
  /* @__PURE__ */ m("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), Ql = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", Zl = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", hf = ({ label: n, children: e, tall: t }) => /* @__PURE__ */ O("div", { className: t ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  n && /* @__PURE__ */ m("span", { className: t ? Ql : Zl, children: n }),
  e
] }), pf = ({ leading: n, trailing: e, className: t = "" }) => /* @__PURE__ */ O("div", { className: `flex flex-wrap items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-0 ${t}`, children: [
  n,
  e && /* @__PURE__ */ m("div", { className: "ml-auto flex flex-wrap items-center justify-end gap-1", children: e })
] }), mf = ({ readOnly: n, onDuplicate: e, onRemove: t, onMove: r, compact: i }) => (
  // One unbreakable cluster: when a header's trailing wraps, the move pair and
  // the duplicate/delete pair stay together (no orphaned icons on a line).
  /* @__PURE__ */ O("div", { className: "flex items-center gap-1 shrink-0", children: [
    /* @__PURE__ */ m(pn, { onClick: () => r(-1), disabled: n, title: "Move up", className: hn, children: /* @__PURE__ */ m(Ms, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ m(pn, { onClick: () => r(1), disabled: n, title: "Move down", className: hn, children: /* @__PURE__ */ m(As, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ m(pn, { onClick: e, disabled: n, title: "Duplicate", className: hn, children: /* @__PURE__ */ m($i, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ m("div", { className: so }),
    /* @__PURE__ */ m(pn, { onClick: t, disabled: n, title: "Delete", className: `${hn} ${Yl}`, children: /* @__PURE__ */ m(lr, { className: "w-2.5 h-2.5" }) })
  ] })
);
var si = Object.defineProperty, ea = (n, e) => {
  let t = {};
  for (var r in n) si(t, r, {
    get: n[r],
    enumerable: !0
  });
  return si(t, Symbol.toStringTag, { value: "Module" }), t;
};
function Ie(n) {
  this.content = n;
}
Ie.prototype = {
  constructor: Ie,
  find: function(n) {
    for (var e = 0; e < this.content.length; e += 2)
      if (this.content[e] === n) return e;
    return -1;
  },
  // :: (string) → ?any
  // Retrieve the value stored under `key`, or return undefined when
  // no such key exists.
  get: function(n) {
    var e = this.find(n);
    return e == -1 ? void 0 : this.content[e + 1];
  },
  // :: (string, any, ?string) → OrderedMap
  // Create a new map by replacing the value of `key` with a new
  // value, or adding a binding to the end of the map. If `newKey` is
  // given, the key of the binding will be replaced with that key.
  update: function(n, e, t) {
    var r = t && t != n ? this.remove(t) : this, i = r.find(n), o = r.content.slice();
    return i == -1 ? o.push(t || n, e) : (o[i + 1] = e, t && (o[i] = t)), new Ie(o);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(n) {
    var e = this.find(n);
    if (e == -1) return this;
    var t = this.content.slice();
    return t.splice(e, 2), new Ie(t);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(n, e) {
    return new Ie([n, e].concat(this.remove(n).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(n, e) {
    var t = this.remove(n).content.slice();
    return t.push(n, e), new Ie(t);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(n, e, t) {
    var r = this.remove(e), i = r.content.slice(), o = r.find(n);
    return i.splice(o == -1 ? i.length : o, 0, e, t), new Ie(i);
  },
  // :: ((key: string, value: any))
  // Call the given function for each key/value pair in the map, in
  // order.
  forEach: function(n) {
    for (var e = 0; e < this.content.length; e += 2)
      n(this.content[e], this.content[e + 1]);
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by prepending the keys in this map that don't
  // appear in `map` before the keys in `map`.
  prepend: function(n) {
    return n = Ie.from(n), n.size ? new Ie(n.content.concat(this.subtract(n).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(n) {
    return n = Ie.from(n), n.size ? new Ie(this.subtract(n).content.concat(n.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(n) {
    var e = this;
    n = Ie.from(n);
    for (var t = 0; t < n.content.length; t += 2)
      e = e.remove(n.content[t]);
    return e;
  },
  // :: () → Object
  // Turn ordered map into a plain object.
  toObject: function() {
    var n = {};
    return this.forEach(function(e, t) {
      n[e] = t;
    }), n;
  },
  // :: number
  // The amount of keys in this map.
  get size() {
    return this.content.length >> 1;
  }
};
Ie.from = function(n) {
  if (n instanceof Ie) return n;
  var e = [];
  if (n) for (var t in n) e.push(t, n[t]);
  return new Ie(e);
};
function lo(n, e, t) {
  for (let r = 0; ; r++) {
    if (r == n.childCount || r == e.childCount)
      return n.childCount == e.childCount ? null : t;
    let i = n.child(r), o = e.child(r);
    if (i == o) {
      t += i.nodeSize;
      continue;
    }
    if (!i.sameMarkup(o))
      return t;
    if (i.isText && i.text != o.text) {
      let s = i.text, l = o.text, a = 0;
      for (; s[a] == l[a]; a++)
        t++;
      return a && a < s.length && a < l.length && uo(s.charCodeAt(a - 1)) && co(s.charCodeAt(a)) && t--, t;
    }
    if (i.content.size || o.content.size) {
      let s = lo(i.content, o.content, t + 1);
      if (s != null)
        return s;
    }
    t += i.nodeSize;
  }
}
function ao(n, e, t, r) {
  for (let i = n.childCount, o = e.childCount; ; ) {
    if (i == 0 || o == 0)
      return i == o ? null : { a: t, b: r };
    let s = n.child(--i), l = e.child(--o), a = s.nodeSize;
    if (s == l) {
      t -= a, r -= a;
      continue;
    }
    if (!s.sameMarkup(l))
      return { a: t, b: r };
    if (s.isText && s.text != l.text) {
      let c = s.text, u = l.text, f = c.length, d = u.length;
      for (; f > 0 && d > 0 && c[f - 1] == u[d - 1]; )
        f--, d--, t--, r--;
      return f && d && f < c.length && uo(c.charCodeAt(f - 1)) && co(c.charCodeAt(f)) && (t++, r++), { a: t, b: r };
    }
    if (s.content.size || l.content.size) {
      let c = ao(s.content, l.content, t - 1, r - 1);
      if (c)
        return c;
    }
    t -= a, r -= a;
  }
}
function co(n) {
  return n >= 56320 && n < 57344;
}
function uo(n) {
  return n >= 55296 && n < 56320;
}
class A {
  /**
  @internal
  */
  constructor(e, t) {
    if (this.content = e, this.size = t || 0, t == null)
      for (let r = 0; r < e.length; r++)
        this.size += e[r].nodeSize;
  }
  /**
  Invoke a callback for all descendant nodes between the given two
  positions (relative to start of this fragment). Doesn't descend
  into a node when the callback returns `false`.
  */
  nodesBetween(e, t, r, i = 0, o) {
    for (let s = 0, l = 0; l < t; s++) {
      let a = this.content[s], c = l + a.nodeSize;
      if (c > e && r(a, i + l, o || null, s) !== !1 && a.content.size) {
        let u = l + 1;
        a.nodesBetween(Math.max(0, e - u), Math.min(a.content.size, t - u), r, i + u);
      }
      l = c;
    }
  }
  /**
  Call the given callback for every descendant node. `pos` will be
  relative to the start of the fragment. The callback may return
  `false` to prevent traversal of a given node's children.
  */
  descendants(e) {
    this.nodesBetween(0, this.size, e);
  }
  /**
  Extract the text between `from` and `to`. See the same method on
  [`Node`](https://prosemirror.net/docs/ref/#model.Node.textBetween).
  */
  textBetween(e, t, r, i) {
    let o = "", s = !0;
    return this.nodesBetween(e, t, (l, a) => {
      let c = l.isText ? l.text.slice(Math.max(e, a) - a, t - a) : l.isLeaf ? i ? typeof i == "function" ? i(l) : i : l.type.spec.leafText ? l.type.spec.leafText(l) : "" : "";
      l.isBlock && (l.isLeaf && c || l.isTextblock) && r && (s ? s = !1 : o += r), o += c;
    }, 0), o;
  }
  /**
  Create a new fragment containing the combined content of this
  fragment and the other.
  */
  append(e) {
    if (!e.size)
      return this;
    if (!this.size)
      return e;
    let t = this.lastChild, r = e.firstChild, i = this.content.slice(), o = 0;
    for (t.isText && t.sameMarkup(r) && (i[i.length - 1] = t.withText(t.text + r.text), o = 1); o < e.content.length; o++)
      i.push(e.content[o]);
    return new A(i, this.size + e.size);
  }
  /**
  Cut out the sub-fragment between the two given positions.
  */
  cut(e, t = this.size) {
    if (e == 0 && t == this.size)
      return this;
    let r = [], i = 0;
    if (t > e)
      for (let o = 0, s = 0; s < t; o++) {
        let l = this.content[o], a = s + l.nodeSize;
        a > e && ((s < e || a > t) && (l.isText ? l = l.cut(Math.max(0, e - s), Math.min(l.text.length, t - s)) : l = l.cut(Math.max(0, e - s - 1), Math.min(l.content.size, t - s - 1))), r.push(l), i += l.nodeSize), s = a;
      }
    return new A(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, t) {
    return e == t ? A.empty : e == 0 && t == this.content.length ? this : new A(this.content.slice(e, t));
  }
  /**
  Create a new fragment in which the node at the given index is
  replaced by the given node.
  */
  replaceChild(e, t) {
    let r = this.content[e];
    if (r == t)
      return this;
    let i = this.content.slice(), o = this.size + t.nodeSize - r.nodeSize;
    return i[e] = t, new A(i, o);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new A([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new A(this.content.concat(e), this.size + e.nodeSize);
  }
  /**
  Compare this fragment to another one.
  */
  eq(e) {
    if (this.content.length != e.content.length)
      return !1;
    for (let t = 0; t < this.content.length; t++)
      if (!this.content[t].eq(e.content[t]))
        return !1;
    return !0;
  }
  /**
  The first child of the fragment, or `null` if it is empty.
  */
  get firstChild() {
    return this.content.length ? this.content[0] : null;
  }
  /**
  The last child of the fragment, or `null` if it is empty.
  */
  get lastChild() {
    return this.content.length ? this.content[this.content.length - 1] : null;
  }
  /**
  The number of child nodes in this fragment.
  */
  get childCount() {
    return this.content.length;
  }
  /**
  Get the child node at the given index. Raise an error when the
  index is out of range.
  */
  child(e) {
    let t = this.content[e];
    if (!t)
      throw new RangeError("Index " + e + " out of range for " + this);
    return t;
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(e) {
    return this.content[e] || null;
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(e) {
    for (let t = 0, r = 0; t < this.content.length; t++) {
      let i = this.content[t];
      e(i, r, t), r += i.nodeSize;
    }
  }
  /**
  Find the first position at which this fragment and another
  fragment differ, or `null` if they are the same.
  */
  findDiffStart(e, t = 0) {
    return lo(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, r = e.size) {
    return ao(this, e, t, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e) {
    if (e == 0)
      return gn(0, e);
    if (e == this.size)
      return gn(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let t = 0, r = 0; ; t++) {
      let i = this.child(t), o = r + i.nodeSize;
      if (o >= e)
        return o == e ? gn(t + 1, o) : gn(t, r);
      r = o;
    }
  }
  /**
  Return a debugging string that describes this fragment.
  */
  toString() {
    return "<" + this.toStringInner() + ">";
  }
  /**
  @internal
  */
  toStringInner() {
    return this.content.join(", ");
  }
  /**
  Create a JSON-serializeable representation of this fragment.
  */
  toJSON() {
    return this.content.length ? this.content.map((e) => e.toJSON()) : null;
  }
  /**
  Deserialize a fragment from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      return A.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return A.fromArray(t.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return A.empty;
    let t, r = 0;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      r += o.nodeSize, i && o.isText && e[i - 1].sameMarkup(o) ? (t || (t = e.slice(0, i)), t[t.length - 1] = o.withText(t[t.length - 1].text + o.text)) : t && t.push(o);
    }
    return new A(t || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return A.empty;
    if (e instanceof A)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new A([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
A.empty = new A([], 0);
const Zn = { index: 0, offset: 0 };
function gn(n, e) {
  return Zn.index = n, Zn.offset = e, Zn;
}
function An(n, e) {
  if (n === e)
    return !0;
  if (!(n && typeof n == "object") || !(e && typeof e == "object"))
    return !1;
  let t = Array.isArray(n);
  if (Array.isArray(e) != t)
    return !1;
  if (t) {
    if (n.length != e.length)
      return !1;
    for (let r = 0; r < n.length; r++)
      if (!An(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !An(n[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in n))
        return !1;
  }
  return !0;
}
let pe = class dr {
  /**
  @internal
  */
  constructor(e, t) {
    this.type = e, this.attrs = t;
  }
  /**
  Given a set of marks, create a new set which contains this one as
  well, in the right position. If this mark is already in the set,
  the set itself is returned. If any marks that are set to be
  [exclusive](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) with this mark are present,
  those are replaced by this one.
  */
  addToSet(e) {
    let t, r = !1;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      if (this.eq(o))
        return e;
      if (this.type.excludes(o.type))
        t || (t = e.slice(0, i));
      else {
        if (o.type.excludes(this.type))
          return e;
        !r && o.type.rank > this.type.rank && (t || (t = e.slice(0, i)), t.push(this), r = !0), t && t.push(o);
      }
    }
    return t || (t = e.slice()), r || t.push(this), t;
  }
  /**
  Remove this mark from the given set, returning a new set. If this
  mark is not in the set, the set itself is returned.
  */
  removeFromSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t]))
        return e.slice(0, t).concat(e.slice(t + 1));
    return e;
  }
  /**
  Test whether this mark is in the given set of marks.
  */
  isInSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t]))
        return !0;
    return !1;
  }
  /**
  Test whether this mark has the same type and attributes as
  another mark.
  */
  eq(e) {
    return this == e || this.type == e.type && An(this.attrs, e.attrs);
  }
  /**
  Convert this mark to a JSON-serializeable representation.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return e;
  }
  /**
  Deserialize a mark from JSON.
  */
  static fromJSON(e, t) {
    if (!t)
      throw new RangeError("Invalid input for Mark.fromJSON");
    let r = e.marks[t.type];
    if (!r)
      throw new RangeError(`There is no mark type ${t.type} in this schema`);
    return r.create(t.attrs);
  }
  /**
  Test whether two sets of marks are identical.
  */
  static sameSet(e, t) {
    if (e == t)
      return !0;
    if (e.length != t.length)
      return !1;
    for (let r = 0; r < e.length; r++)
      if (!e[r].eq(t[r]))
        return !1;
    return !0;
  }
  /**
  Create a properly sorted mark set from null, a single mark, or an
  unsorted array of marks.
  */
  static setFrom(e) {
    if (!e || Array.isArray(e) && e.length == 0)
      return dr.none;
    if (e instanceof dr)
      return [e];
    let t = e.slice();
    return t.sort((r, i) => r.type.rank - i.type.rank), t;
  }
};
pe.none = [];
class Xt extends Error {
}
class W {
  /**
  Create a slice. When specifying a non-zero open depth, you must
  make sure that there are nodes of at least that depth at the
  appropriate side of the fragment—i.e. if the fragment is an
  empty paragraph node, `openStart` and `openEnd` can't be greater
  than 1.
  
  It is not necessary for the content of open nodes to conform to
  the schema's content constraints, though it should be a valid
  start/end/middle for such a node, depending on which sides are
  open.
  */
  constructor(e, t, r) {
    this.content = e, this.openStart = t, this.openEnd = r;
  }
  /**
  The size this slice would add when inserted into a document.
  */
  get size() {
    return this.content.size - this.openStart - this.openEnd;
  }
  /**
  @internal
  */
  insertAt(e, t) {
    let r = ho(this.content, e + this.openStart, t, this.openStart + 1, this.openEnd + 1);
    return r && new W(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new W(fo(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
  }
  /**
  Tests whether this slice is equal to another slice.
  */
  eq(e) {
    return this.content.eq(e.content) && this.openStart == e.openStart && this.openEnd == e.openEnd;
  }
  /**
  @internal
  */
  toString() {
    return this.content + "(" + this.openStart + "," + this.openEnd + ")";
  }
  /**
  Convert a slice to a JSON-serializable representation.
  */
  toJSON() {
    if (!this.content.size)
      return null;
    let e = { content: this.content.toJSON() };
    return this.openStart > 0 && (e.openStart = this.openStart), this.openEnd > 0 && (e.openEnd = this.openEnd), e;
  }
  /**
  Deserialize a slice from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      return W.empty;
    let r = t.openStart || 0, i = t.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new W(A.fromJSON(e, t.content), r, i);
  }
  /**
  Create a slice from a fragment by taking the maximum possible
  open value on both side of the fragment.
  */
  static maxOpen(e, t = !0) {
    let r = 0, i = 0;
    for (let o = e.firstChild; o && !o.isLeaf && (t || !o.type.spec.isolating); o = o.firstChild)
      r++;
    for (let o = e.lastChild; o && !o.isLeaf && (t || !o.type.spec.isolating); o = o.lastChild)
      i++;
    return new W(e, r, i);
  }
}
W.empty = new W(A.empty, 0, 0);
function fo(n, e, t) {
  let { index: r, offset: i } = n.findIndex(e), o = n.maybeChild(r), { index: s, offset: l } = n.findIndex(t);
  if (i == e || o.isText) {
    if (l != t && !n.child(s).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != s)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, o.copy(fo(o.content, e - i - 1, t - i - 1)));
}
function ho(n, e, t, r, i, o) {
  let { index: s, offset: l } = n.findIndex(e), a = n.maybeChild(s);
  if (l == e || a.isText)
    return o && r <= 0 && i <= 0 && !o.canReplace(s, s, t) ? null : n.cut(0, e).append(t).append(n.cut(e));
  let c = ho(a.content, e - l - 1, t, s == 0 ? r - 1 : 0, s == n.childCount - 1 ? i - 1 : 0, a);
  return c && n.replaceChild(s, a.copy(c));
}
function ta(n, e, t) {
  if (t.openStart > n.depth)
    throw new Xt("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new Xt("Inconsistent open depths");
  return po(n, e, t, 0);
}
function po(n, e, t, r) {
  let i = n.index(r), o = n.node(r);
  if (i == e.index(r) && r < n.depth - t.openStart) {
    let s = po(n, e, t, r + 1);
    return o.copy(o.content.replaceChild(i, s));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let s = n.parent, l = s.content;
      return mt(s, l.cut(0, n.parentOffset).append(t.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: s, end: l } = na(t, n);
      return mt(o, go(n, s, l, e, r));
    }
  else return mt(o, Rn(n, e, r));
}
function mo(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new Xt("Cannot join " + e.type.name + " onto " + n.type.name);
}
function fr(n, e, t) {
  let r = n.node(t);
  return mo(r, e.node(t)), r;
}
function pt(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t]) ? e[t] = n.withText(e[t].text + n.text) : e.push(n);
}
function Vt(n, e, t, r) {
  let i = (e || n).node(t), o = 0, s = e ? e.index(t) : i.childCount;
  n && (o = n.index(t), n.depth > t ? o++ : n.textOffset && (pt(n.nodeAfter, r), o++));
  for (let l = o; l < s; l++)
    pt(i.child(l), r);
  e && e.depth == t && e.textOffset && pt(e.nodeBefore, r);
}
function mt(n, e) {
  if (!n.type.validContent(e))
    throw new Xt("Invalid content for node " + n.type.name);
  return n.copy(e);
}
function go(n, e, t, r, i) {
  let o = n.depth > i && fr(n, e, i + 1), s = r.depth > i && fr(t, r, i + 1), l = [];
  return Vt(null, n, i, l), o && s && e.index(i) == t.index(i) ? (mo(o, s), pt(mt(o, go(n, e, t, r, i + 1)), l)) : (o && pt(mt(o, Rn(n, e, i + 1)), l), Vt(e, t, i, l), s && pt(mt(s, Rn(t, r, i + 1)), l)), Vt(r, null, i, l), new A(l);
}
function Rn(n, e, t) {
  let r = [];
  if (Vt(null, n, t, r), n.depth > t) {
    let i = fr(n, e, t + 1);
    pt(mt(i, Rn(n, e, t + 1)), r);
  }
  return Vt(e, null, t, r), new A(r);
}
function na(n, e) {
  let t = e.depth - n.openStart, i = e.node(t).copy(n.content);
  for (let o = t - 1; o >= 0; o--)
    i = e.node(o).copy(A.from(i));
  return {
    start: i.resolveNoCache(n.openStart + t),
    end: i.resolveNoCache(i.content.size - n.openEnd - t)
  };
}
class Gt {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.pos = e, this.path = t, this.parentOffset = r, this.depth = t.length / 3 - 1;
  }
  /**
  @internal
  */
  resolveDepth(e) {
    return e == null ? this.depth : e < 0 ? this.depth + e : e;
  }
  /**
  The parent node that the position points into. Note that even if
  a position points into a text node, that node is not considered
  the parent—text nodes are ‘flat’ in this model, and have no content.
  */
  get parent() {
    return this.node(this.depth);
  }
  /**
  The root node in which the position was resolved.
  */
  get doc() {
    return this.node(0);
  }
  /**
  The ancestor node at the given level. `p.node(p.depth)` is the
  same as `p.parent`.
  */
  node(e) {
    return this.path[this.resolveDepth(e) * 3];
  }
  /**
  The index into the ancestor at the given level. If this points
  at the 3rd node in the 2nd paragraph on the top level, for
  example, `p.index(0)` is 1 and `p.index(1)` is 2.
  */
  index(e) {
    return this.path[this.resolveDepth(e) * 3 + 1];
  }
  /**
  The index pointing after this position into the ancestor at the
  given level.
  */
  indexAfter(e) {
    return e = this.resolveDepth(e), this.index(e) + (e == this.depth && !this.textOffset ? 0 : 1);
  }
  /**
  The (absolute) position at the start of the node at the given
  level.
  */
  start(e) {
    return e = this.resolveDepth(e), e == 0 ? 0 : this.path[e * 3 - 1] + 1;
  }
  /**
  The (absolute) position at the end of the node at the given
  level.
  */
  end(e) {
    return e = this.resolveDepth(e), this.start(e) + this.node(e).content.size;
  }
  /**
  The (absolute) position directly before the wrapping node at the
  given level, or, when `depth` is `this.depth + 1`, the original
  position.
  */
  before(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position before the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1];
  }
  /**
  The (absolute) position directly after the wrapping node at the
  given level, or the original position when `depth` is `this.depth + 1`.
  */
  after(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position after the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1] + this.path[e * 3].nodeSize;
  }
  /**
  When this position points into a text node, this returns the
  distance between the position and the start of the text node.
  Will be zero for positions that point between nodes.
  */
  get textOffset() {
    return this.pos - this.path[this.path.length - 1];
  }
  /**
  Get the node directly after the position, if any. If the position
  points into a text node, only the part of that node after the
  position is returned.
  */
  get nodeAfter() {
    let e = this.parent, t = this.index(this.depth);
    if (t == e.childCount)
      return null;
    let r = this.pos - this.path[this.path.length - 1], i = e.child(t);
    return r ? e.child(t).cut(r) : i;
  }
  /**
  Get the node directly before the position, if any. If the
  position points into a text node, only the part of that node
  before the position is returned.
  */
  get nodeBefore() {
    let e = this.index(this.depth), t = this.pos - this.path[this.path.length - 1];
    return t ? this.parent.child(e).cut(0, t) : e == 0 ? null : this.parent.child(e - 1);
  }
  /**
  Get the position at the given index in the parent node at the
  given depth (which defaults to `this.depth`).
  */
  posAtIndex(e, t) {
    t = this.resolveDepth(t);
    let r = this.path[t * 3], i = t == 0 ? 0 : this.path[t * 3 - 1] + 1;
    for (let o = 0; o < e; o++)
      i += r.child(o).nodeSize;
    return i;
  }
  /**
  Get the marks at this position, factoring in the surrounding
  marks' [`inclusive`](https://prosemirror.net/docs/ref/#model.MarkSpec.inclusive) property. If the
  position is at the start of a non-empty node, the marks of the
  node after it (if any) are returned.
  */
  marks() {
    let e = this.parent, t = this.index();
    if (e.content.size == 0)
      return pe.none;
    if (this.textOffset)
      return e.child(t).marks;
    let r = e.maybeChild(t - 1), i = e.maybeChild(t);
    if (!r) {
      let l = r;
      r = i, i = l;
    }
    let o = r.marks;
    for (var s = 0; s < o.length; s++)
      o[s].type.spec.inclusive === !1 && (!i || !o[s].isInSet(i.marks)) && (o = o[s--].removeFromSet(o));
    return o;
  }
  /**
  Get the marks after the current position, if any, except those
  that are non-inclusive and not present at position `$end`. This
  is mostly useful for getting the set of marks to preserve after a
  deletion. Will return `null` if this position is at the end of
  its parent node or its parent node isn't a textblock (in which
  case no marks should be preserved).
  */
  marksAcross(e) {
    let t = this.parent.maybeChild(this.index());
    if (!t || !t.isInline)
      return null;
    let r = t.marks, i = e.parent.maybeChild(e.index());
    for (var o = 0; o < r.length; o++)
      r[o].type.spec.inclusive === !1 && (!i || !r[o].isInSet(i.marks)) && (r = r[o--].removeFromSet(r));
    return r;
  }
  /**
  The depth up to which this position and the given (non-resolved)
  position share the same parent nodes.
  */
  sharedDepth(e) {
    for (let t = this.depth; t > 0; t--)
      if (this.start(t) <= e && this.end(t) >= e)
        return t;
    return 0;
  }
  /**
  Returns a range based on the place where this position and the
  given position diverge around block content. If both point into
  the same textblock, for example, a range around that textblock
  will be returned. If they point into different blocks, the range
  around those blocks in their shared ancestor is returned. You can
  pass in an optional predicate that will be called with a parent
  node to see if a range into that parent is acceptable.
  */
  blockRange(e = this, t) {
    if (e.pos < this.pos)
      return e.blockRange(this);
    for (let r = this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0); r >= 0; r--)
      if (e.pos <= this.end(r) && (!t || t(this.node(r))))
        return new In(this, e, r);
    return null;
  }
  /**
  Query whether the given position shares the same parent node.
  */
  sameParent(e) {
    return this.pos - this.parentOffset == e.pos - e.parentOffset;
  }
  /**
  Return the greater of this and the given position.
  */
  max(e) {
    return e.pos > this.pos ? e : this;
  }
  /**
  Return the smaller of this and the given position.
  */
  min(e) {
    return e.pos < this.pos ? e : this;
  }
  /**
  @internal
  */
  toString() {
    let e = "";
    for (let t = 1; t <= this.depth; t++)
      e += (e ? "/" : "") + this.node(t).type.name + "_" + this.index(t - 1);
    return e + ":" + this.parentOffset;
  }
  /**
  @internal
  */
  static resolve(e, t) {
    if (!(t >= 0 && t <= e.content.size))
      throw new RangeError("Position " + t + " out of range");
    let r = [], i = 0, o = t;
    for (let s = e; ; ) {
      let { index: l, offset: a } = s.content.findIndex(o), c = o - a;
      if (r.push(s, l, i + a), !c || (s = s.child(l), s.isText))
        break;
      o = c - 1, i += a + 1;
    }
    return new Gt(t, r, o);
  }
  /**
  @internal
  */
  static resolveCached(e, t) {
    let r = li.get(e);
    if (r)
      for (let o = 0; o < r.elts.length; o++) {
        let s = r.elts[o];
        if (s.pos == t)
          return s;
      }
    else
      li.set(e, r = new ra());
    let i = r.elts[r.i] = Gt.resolve(e, t);
    return r.i = (r.i + 1) % ia, i;
  }
}
class ra {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const ia = 12, li = /* @__PURE__ */ new WeakMap();
class In {
  /**
  Construct a node range. `$from` and `$to` should point into the
  same node until at least the given `depth`, since a node range
  denotes an adjacent set of nodes in a single parent node.
  */
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.depth = r;
  }
  /**
  The position at the start of the range.
  */
  get start() {
    return this.$from.before(this.depth + 1);
  }
  /**
  The position at the end of the range.
  */
  get end() {
    return this.$to.after(this.depth + 1);
  }
  /**
  The parent node that the range points into.
  */
  get parent() {
    return this.$from.node(this.depth);
  }
  /**
  The start index of the range in the parent node.
  */
  get startIndex() {
    return this.$from.index(this.depth);
  }
  /**
  The end index of the range in the parent node.
  */
  get endIndex() {
    return this.$to.indexAfter(this.depth);
  }
}
const oa = /* @__PURE__ */ Object.create(null);
let zt = class hr {
  /**
  @internal
  */
  constructor(e, t, r, i = pe.none) {
    this.type = e, this.attrs = t, this.marks = i, this.content = r || A.empty;
  }
  /**
  The array of this node's child nodes.
  */
  get children() {
    return this.content.content;
  }
  /**
  The size of this node, as defined by the integer-based [indexing
  scheme](https://prosemirror.net/docs/guide/#doc.indexing). For text nodes, this is the
  amount of characters. For other leaf nodes, it is one. For
  non-leaf nodes, it is the size of the content plus two (the
  start and end token).
  */
  get nodeSize() {
    return this.isLeaf ? 1 : 2 + this.content.size;
  }
  /**
  The number of children that the node has.
  */
  get childCount() {
    return this.content.childCount;
  }
  /**
  Get the child node at the given index. Raises an error when the
  index is out of range.
  */
  child(e) {
    return this.content.child(e);
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(e) {
    return this.content.maybeChild(e);
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(e) {
    this.content.forEach(e);
  }
  /**
  Invoke a callback for all descendant nodes recursively overlapping
  the given two positions that are relative to start of this
  node's content. This includes all ancestors of the nodes
  containing the two positions. The callback is invoked with the
  node, its position relative to the original node (method receiver),
  its parent node, and its child index. When the callback returns
  false for a given node, that node's children will not be
  recursed over. The last parameter can be used to specify a
  starting position to count from.
  */
  nodesBetween(e, t, r, i = 0) {
    this.content.nodesBetween(e, t, r, i, this);
  }
  /**
  Call the given callback for every descendant node. Doesn't
  descend into a node when the callback returns `false`.
  */
  descendants(e) {
    this.nodesBetween(0, this.content.size, e);
  }
  /**
  Concatenates all the text nodes found in this fragment and its
  children.
  */
  get textContent() {
    return this.isLeaf && this.type.spec.leafText ? this.type.spec.leafText(this) : this.textBetween(0, this.content.size, "");
  }
  /**
  Get all text between positions `from` and `to`. When
  `blockSeparator` is given, it will be inserted to separate text
  from different block nodes. If `leafText` is given, it'll be
  inserted for every non-text leaf node encountered, otherwise
  [`leafText`](https://prosemirror.net/docs/ref/#model.NodeSpec.leafText) will be used.
  */
  textBetween(e, t, r, i) {
    return this.content.textBetween(e, t, r, i);
  }
  /**
  Returns this node's first child, or `null` if there are no
  children.
  */
  get firstChild() {
    return this.content.firstChild;
  }
  /**
  Returns this node's last child, or `null` if there are no
  children.
  */
  get lastChild() {
    return this.content.lastChild;
  }
  /**
  Test whether two nodes represent the same piece of document.
  */
  eq(e) {
    return this == e || this.sameMarkup(e) && this.content.eq(e.content);
  }
  /**
  Compare the markup (type, attributes, and marks) of this node to
  those of another. Returns `true` if both have the same markup.
  */
  sameMarkup(e) {
    return this.hasMarkup(e.type, e.attrs, e.marks);
  }
  /**
  Check whether this node's markup correspond to the given type,
  attributes, and marks.
  */
  hasMarkup(e, t, r) {
    return this.type == e && An(this.attrs, t || e.defaultAttrs || oa) && pe.sameSet(this.marks, r || pe.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new hr(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new hr(this.type, this.attrs, this.content, e);
  }
  /**
  Create a copy of this node with only the content between the
  given positions. If `to` is not given, it defaults to the end of
  the node.
  */
  cut(e, t = this.content.size) {
    return e == 0 && t == this.content.size ? this : this.copy(this.content.cut(e, t));
  }
  /**
  Cut out the part of the document between the given positions, and
  return it as a `Slice` object.
  */
  slice(e, t = this.content.size, r = !1) {
    if (e == t)
      return W.empty;
    let i = this.resolve(e), o = this.resolve(t), s = r ? 0 : i.sharedDepth(t), l = i.start(s), c = i.node(s).content.cut(i.pos - l, o.pos - l);
    return new W(c, i.depth - s, o.depth - s);
  }
  /**
  Replace the part of the document between the given positions with
  the given slice. The slice must 'fit', meaning its open sides
  must be able to connect to the surrounding content, and its
  content nodes must be valid children for the node they are placed
  into. If any of this is violated, an error of type
  [`ReplaceError`](https://prosemirror.net/docs/ref/#model.ReplaceError) is thrown.
  */
  replace(e, t, r) {
    return ta(this.resolve(e), this.resolve(t), r);
  }
  /**
  Find the node directly after the given position.
  */
  nodeAt(e) {
    for (let t = this; ; ) {
      let { index: r, offset: i } = t.content.findIndex(e);
      if (t = t.maybeChild(r), !t)
        return null;
      if (i == e || t.isText)
        return t;
      e -= i + 1;
    }
  }
  /**
  Find the (direct) child node after the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childAfter(e) {
    let { index: t, offset: r } = this.content.findIndex(e);
    return { node: this.content.maybeChild(t), index: t, offset: r };
  }
  /**
  Find the (direct) child node before the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childBefore(e) {
    if (e == 0)
      return { node: null, index: 0, offset: 0 };
    let { index: t, offset: r } = this.content.findIndex(e);
    if (r < e)
      return { node: this.content.child(t), index: t, offset: r };
    let i = this.content.child(t - 1);
    return { node: i, index: t - 1, offset: r - i.nodeSize };
  }
  /**
  Resolve the given position in the document, returning an
  [object](https://prosemirror.net/docs/ref/#model.ResolvedPos) with information about its context.
  */
  resolve(e) {
    return Gt.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return Gt.resolve(this, e);
  }
  /**
  Test whether a given mark or mark type occurs in this document
  between the two given positions.
  */
  rangeHasMark(e, t, r) {
    let i = !1;
    return t > e && this.nodesBetween(e, t, (o) => (r.isInSet(o.marks) && (i = !0), !i)), i;
  }
  /**
  True when this is a block (non-inline node)
  */
  get isBlock() {
    return this.type.isBlock;
  }
  /**
  True when this is a textblock node, a block node with inline
  content.
  */
  get isTextblock() {
    return this.type.isTextblock;
  }
  /**
  True when this node allows inline content.
  */
  get inlineContent() {
    return this.type.inlineContent;
  }
  /**
  True when this is an inline node (a text node or a node that can
  appear among text).
  */
  get isInline() {
    return this.type.isInline;
  }
  /**
  True when this is a text node.
  */
  get isText() {
    return this.type.isText;
  }
  /**
  True when this is a leaf node.
  */
  get isLeaf() {
    return this.type.isLeaf;
  }
  /**
  True when this is an atom, i.e. when it does not have directly
  editable content. This is usually the same as `isLeaf`, but can
  be configured with the [`atom` property](https://prosemirror.net/docs/ref/#model.NodeSpec.atom)
  on a node's spec (typically used when the node is displayed as
  an uneditable [node view](https://prosemirror.net/docs/ref/#view.NodeView)).
  */
  get isAtom() {
    return this.type.isAtom;
  }
  /**
  Return a string representation of this node for debugging
  purposes.
  */
  toString() {
    if (this.type.spec.toDebugString)
      return this.type.spec.toDebugString(this);
    let e = this.type.name;
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), yo(this.marks, e);
  }
  /**
  Get the content match in this node at the given index.
  */
  contentMatchAt(e) {
    let t = this.type.contentMatch.matchFragment(this.content, 0, e);
    if (!t)
      throw new Error("Called contentMatchAt on a node with invalid content");
    return t;
  }
  /**
  Test whether replacing the range between `from` and `to` (by
  child index) with the given replacement fragment (which defaults
  to the empty fragment) would leave the node's content valid. You
  can optionally pass `start` and `end` indices into the
  replacement fragment.
  */
  canReplace(e, t, r = A.empty, i = 0, o = r.childCount) {
    let s = this.contentMatchAt(e).matchFragment(r, i, o), l = s && s.matchFragment(this.content, t);
    if (!l || !l.validEnd)
      return !1;
    for (let a = i; a < o; a++)
      if (!this.type.allowsMarks(r.child(a).marks))
        return !1;
    return !0;
  }
  /**
  Test whether replacing the range `from` to `to` (by index) with
  a node of the given type would leave the node's content valid.
  */
  canReplaceWith(e, t, r, i) {
    if (i && !this.type.allowsMarks(i))
      return !1;
    let o = this.contentMatchAt(e).matchType(r), s = o && o.matchFragment(this.content, t);
    return s ? s.validEnd : !1;
  }
  /**
  Test whether the given node's content could be appended to this
  node. If that node is empty, this will only return true if there
  is at least one node type that can appear in both nodes (to avoid
  merging completely incompatible nodes).
  */
  canAppend(e) {
    return e.content.size ? this.canReplace(this.childCount, this.childCount, e.content) : this.type.compatibleContent(e.type);
  }
  /**
  Check whether this node and its descendants conform to the
  schema, and raise an exception when they do not.
  */
  check() {
    this.type.checkContent(this.content), ai(this.type.attrs, this.attrs, "node", this.type.name);
    let e = pe.none;
    for (let t = 0; t < this.marks.length; t++) {
      let r = this.marks[t];
      ai(r.type.attrs, r.attrs, "mark", r.type.name), e = r.addToSet(e);
    }
    if (!pe.sameSet(e, this.marks))
      throw new RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map((t) => t.type.name)}`);
    this.content.forEach((t) => t.check());
  }
  /**
  Return a JSON-serializeable representation of this node.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return this.content.size && (e.content = this.content.toJSON()), this.marks.length && (e.marks = this.marks.map((t) => t.toJSON())), e;
  }
  /**
  Deserialize a node from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      throw new RangeError("Invalid input for Node.fromJSON");
    let r;
    if (t.marks) {
      if (!Array.isArray(t.marks))
        throw new RangeError("Invalid mark data for Node.fromJSON");
      r = t.marks.map(e.markFromJSON);
    }
    if (t.type == "text") {
      if (typeof t.text != "string")
        throw new RangeError("Invalid text node in JSON");
      return e.text(t.text, r);
    }
    let i = A.fromJSON(e, t.content);
    return e.nodeType(t.type).create(t.attrs, i, r);
  }
};
zt.prototype.text = void 0;
class zn extends zt {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    if (super(e, t, null, i), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : yo(this.marks, JSON.stringify(this.text));
  }
  get textContent() {
    return this.text;
  }
  textBetween(e, t) {
    return this.text.slice(e, t);
  }
  get nodeSize() {
    return this.text.length;
  }
  mark(e) {
    return e == this.marks ? this : new zn(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new zn(this.type, this.attrs, e, this.marks);
  }
  cut(e = 0, t = this.text.length) {
    return e == 0 && t == this.text.length ? this : this.withText(this.text.slice(e, t));
  }
  eq(e) {
    return this.sameMarkup(e) && this.text == e.text;
  }
  toJSON() {
    let e = super.toJSON();
    return e.text = this.text, e;
  }
}
function yo(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    e = n[t].type.name + "(" + e + ")";
  return e;
}
function ai(n, e, t, r) {
  for (let i in e)
    if (!(i in n))
      throw new RangeError(`Unsupported attribute ${i} for ${t} of type ${r}`);
  for (let i in n)
    n[i].validate && n[i].validate(e[i]);
}
class gt {
  /**
  @internal
  */
  constructor(e) {
    this.validEnd = e, this.next = [], this.wrapCache = [];
  }
  /**
  @internal
  */
  static parse(e, t) {
    let r = new sa(e, t);
    if (r.next == null)
      return gt.empty;
    let i = xo(r);
    r.next && r.err("Unexpected trailing text");
    let o = ha(fa(i));
    return pa(o, r), o;
  }
  /**
  Match a node type, returning a match after that node if
  successful.
  */
  matchType(e) {
    for (let t = 0; t < this.next.length; t++)
      if (this.next[t].type == e)
        return this.next[t].next;
    return null;
  }
  /**
  Try to match a fragment. Returns the resulting match when
  successful.
  */
  matchFragment(e, t = 0, r = e.childCount) {
    let i = this;
    for (let o = t; i && o < r; o++)
      i = i.matchType(e.child(o).type);
    return i;
  }
  /**
  @internal
  */
  get inlineContent() {
    return this.next.length != 0 && this.next[0].type.isInline;
  }
  /**
  Get the first matching node type at this match position that can
  be generated.
  */
  get defaultType() {
    for (let e = 0; e < this.next.length; e++) {
      let { type: t } = this.next[e];
      if (!(t.isText || t.hasRequiredAttrs()))
        return t;
    }
    return null;
  }
  /**
  @internal
  */
  compatible(e) {
    for (let t = 0; t < this.next.length; t++)
      for (let r = 0; r < e.next.length; r++)
        if (this.next[t].type == e.next[r].type)
          return !0;
    return !1;
  }
  /**
  Try to match the given fragment, and if that fails, see if it can
  be made to match by inserting nodes in front of it. When
  successful, return a fragment of inserted nodes (which may be
  empty if nothing had to be inserted). When `toEnd` is true, only
  return a fragment if the resulting match goes to the end of the
  content expression.
  */
  fillBefore(e, t = !1, r = 0) {
    let i = [this];
    function o(s, l) {
      let a = s.matchFragment(e, r);
      if (a && (!t || a.validEnd))
        return A.from(l.map((c) => c.createAndFill()));
      for (let c = 0; c < s.next.length; c++) {
        let { type: u, next: f } = s.next[c];
        if (!(u.isText || u.hasRequiredAttrs()) && i.indexOf(f) == -1) {
          i.push(f);
          let d = o(f, l.concat(u));
          if (d)
            return d;
        }
      }
      return null;
    }
    return o(this, []);
  }
  /**
  Find a set of wrapping node types that would allow a node of the
  given type to appear at this position. The result may be empty
  (when it fits directly) and will be null when no such wrapping
  exists.
  */
  findWrapping(e) {
    for (let r = 0; r < this.wrapCache.length; r += 2)
      if (this.wrapCache[r] == e)
        return this.wrapCache[r + 1];
    let t = this.computeWrapping(e);
    return this.wrapCache.push(e, t), t;
  }
  /**
  @internal
  */
  computeWrapping(e) {
    let t = /* @__PURE__ */ Object.create(null), r = [{ match: this, type: null, via: null }];
    for (; r.length; ) {
      let i = r.shift(), o = i.match;
      if (o.matchType(e)) {
        let s = [];
        for (let l = i; l.type; l = l.via)
          s.push(l.type);
        return s.reverse();
      }
      for (let s = 0; s < o.next.length; s++) {
        let { type: l, next: a } = o.next[s];
        !l.isLeaf && !l.hasRequiredAttrs() && !(l.name in t) && (!i.type || a.validEnd) && (r.push({ match: l.contentMatch, type: l, via: i }), t[l.name] = !0);
      }
    }
    return null;
  }
  /**
  The number of outgoing edges this node has in the finite
  automaton that describes the content expression.
  */
  get edgeCount() {
    return this.next.length;
  }
  /**
  Get the _n_​th outgoing edge from this node in the finite
  automaton that describes the content expression.
  */
  edge(e) {
    if (e >= this.next.length)
      throw new RangeError(`There's no ${e}th edge in this content match`);
    return this.next[e];
  }
  /**
  @internal
  */
  toString() {
    let e = [];
    function t(r) {
      e.push(r);
      for (let i = 0; i < r.next.length; i++)
        e.indexOf(r.next[i].next) == -1 && t(r.next[i].next);
    }
    return t(this), e.map((r, i) => {
      let o = i + (r.validEnd ? "*" : " ") + " ";
      for (let s = 0; s < r.next.length; s++)
        o += (s ? ", " : "") + r.next[s].type.name + "->" + e.indexOf(r.next[s].next);
      return o;
    }).join(`
`);
  }
}
gt.empty = new gt(!0);
class sa {
  constructor(e, t) {
    this.string = e, this.nodeTypes = t, this.inline = null, this.pos = 0, this.tokens = e.split(/\s*(?=\b|\W|$)/), this.tokens[this.tokens.length - 1] == "" && this.tokens.pop(), this.tokens[0] == "" && this.tokens.shift();
  }
  get next() {
    return this.tokens[this.pos];
  }
  eat(e) {
    return this.next == e && (this.pos++ || !0);
  }
  err(e) {
    throw new SyntaxError(e + " (in content expression '" + this.string + "')");
  }
}
function xo(n) {
  let e = [];
  do
    e.push(la(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function la(n) {
  let e = [];
  do
    e.push(aa(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function aa(n) {
  let e = da(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = ca(n, e);
    else
      break;
  return e;
}
function ci(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function ca(n, e) {
  let t = ci(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = ci(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function ua(n, e) {
  let t = n.nodeTypes, r = t[e];
  if (r)
    return [r];
  let i = [];
  for (let o in t) {
    let s = t[o];
    s.isInGroup(e) && i.push(s);
  }
  return i.length == 0 && n.err("No node type or group '" + e + "' found"), i;
}
function da(n) {
  if (n.eat("(")) {
    let e = xo(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = ua(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function fa(n) {
  let e = [[]];
  return i(o(n, 0), t()), e;
  function t() {
    return e.push([]) - 1;
  }
  function r(s, l, a) {
    let c = { term: a, to: l };
    return e[s].push(c), c;
  }
  function i(s, l) {
    s.forEach((a) => a.to = l);
  }
  function o(s, l) {
    if (s.type == "choice")
      return s.exprs.reduce((a, c) => a.concat(o(c, l)), []);
    if (s.type == "seq")
      for (let a = 0; ; a++) {
        let c = o(s.exprs[a], l);
        if (a == s.exprs.length - 1)
          return c;
        i(c, l = t());
      }
    else if (s.type == "star") {
      let a = t();
      return r(l, a), i(o(s.expr, a), a), [r(a)];
    } else if (s.type == "plus") {
      let a = t();
      return i(o(s.expr, l), a), i(o(s.expr, a), a), [r(a)];
    } else {
      if (s.type == "opt")
        return [r(l)].concat(o(s.expr, l));
      if (s.type == "range") {
        let a = l;
        for (let c = 0; c < s.min; c++) {
          let u = t();
          i(o(s.expr, a), u), a = u;
        }
        if (s.max == -1)
          i(o(s.expr, a), a);
        else
          for (let c = s.min; c < s.max; c++) {
            let u = t();
            r(a, u), i(o(s.expr, a), u), a = u;
          }
        return [r(a)];
      } else {
        if (s.type == "name")
          return [r(l, void 0, s.value)];
        throw new Error("Unknown expr type");
      }
    }
  }
}
function bo(n, e) {
  return e - n;
}
function ui(n, e) {
  let t = [];
  return r(e), t.sort(bo);
  function r(i) {
    let o = n[i];
    if (o.length == 1 && !o[0].term)
      return r(o[0].to);
    t.push(i);
    for (let s = 0; s < o.length; s++) {
      let { term: l, to: a } = o[s];
      !l && t.indexOf(a) == -1 && r(a);
    }
  }
}
function ha(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(ui(n, 0));
  function t(r) {
    let i = [];
    r.forEach((s) => {
      n[s].forEach(({ term: l, to: a }) => {
        if (!l)
          return;
        let c;
        for (let u = 0; u < i.length; u++)
          i[u][0] == l && (c = i[u][1]);
        ui(n, a).forEach((u) => {
          c || i.push([l, c = []]), c.indexOf(u) == -1 && c.push(u);
        });
      });
    });
    let o = e[r.join(",")] = new gt(r.indexOf(n.length - 1) > -1);
    for (let s = 0; s < i.length; s++) {
      let l = i[s][1].sort(bo);
      o.next.push({ type: i[s][0], next: e[l.join(",")] || t(l) });
    }
    return o;
  }
}
function pa(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let i = r[t], o = !i.validEnd, s = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: a, next: c } = i.next[l];
      s.push(a.name), o && !(a.isText || a.hasRequiredAttrs()) && (o = !1), r.indexOf(c) == -1 && r.push(c);
    }
    o && e.err("Only non-generatable nodes (" + s.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function vo(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault)
      return null;
    e[t] = r.default;
  }
  return e;
}
function wo(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let r in n) {
    let i = n[r], o = e && e[r];
    if (o === void 0)
      if (i.hasDefault)
        o = i.default;
      else
        throw new RangeError("No value supplied for attribute " + r);
    else i.validate && i.validate(o);
    t[r] = o;
  }
  return t;
}
function ko(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      t[r] = new ga(n, r, e[r]);
  return t;
}
class On {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = ko(e, r.attrs), this.defaultAttrs = vo(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
  }
  /**
  True if this is an inline type.
  */
  get isInline() {
    return !this.isBlock;
  }
  /**
  True if this is a textblock type, a block that contains inline
  content.
  */
  get isTextblock() {
    return this.isBlock && this.inlineContent;
  }
  /**
  True for node types that allow no content.
  */
  get isLeaf() {
    return this.contentMatch == gt.empty;
  }
  /**
  True when this node is an atom, i.e. when it does not have
  directly editable content.
  */
  get isAtom() {
    return this.isLeaf || !!this.spec.atom;
  }
  /**
  Return true when this node type is part of the given
  [group](https://prosemirror.net/docs/ref/#model.NodeSpec.group).
  */
  isInGroup(e) {
    return this.groups.indexOf(e) > -1;
  }
  /**
  The node type's [whitespace](https://prosemirror.net/docs/ref/#model.NodeSpec.whitespace) option.
  */
  get whitespace() {
    return this.spec.whitespace || (this.spec.code ? "pre" : "normal");
  }
  /**
  Tells you whether this node type has any required attributes.
  */
  hasRequiredAttrs() {
    for (let e in this.attrs)
      if (this.attrs[e].isRequired)
        return !0;
    return !1;
  }
  /**
  Indicates whether this node allows some of the same content as
  the given node type.
  */
  compatibleContent(e) {
    return this == e || this.contentMatch.compatible(e.contentMatch);
  }
  /**
  @internal
  */
  computeAttrs(e) {
    return !e && this.defaultAttrs ? this.defaultAttrs : wo(this.attrs, e);
  }
  /**
  Create a `Node` of this type. The given attributes are
  checked and defaulted (you can pass `null` to use the type's
  defaults entirely, if no required attributes exist). `content`
  may be a `Fragment`, a node, an array of nodes, or
  `null`. Similarly `marks` may be `null` to default to the empty
  set of marks.
  */
  create(e = null, t, r) {
    if (this.isText)
      throw new Error("NodeType.create can't construct text nodes");
    return new zt(this, this.computeAttrs(e), A.from(t), pe.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = A.from(t), this.checkContent(t), new zt(this, this.computeAttrs(e), t, pe.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but see if it is
  necessary to add nodes to the start or end of the given fragment
  to make it fit the node. If no fitting wrapping can be found,
  return null. Note that, due to the fact that required nodes can
  always be created, this will always succeed if you pass null or
  `Fragment.empty` as content.
  */
  createAndFill(e = null, t, r) {
    if (e = this.computeAttrs(e), t = A.from(t), t.size) {
      let s = this.contentMatch.fillBefore(t);
      if (!s)
        return null;
      t = s.append(t);
    }
    let i = this.contentMatch.matchFragment(t), o = i && i.fillBefore(A.empty, !0);
    return o ? new zt(this, e, t.append(o), pe.setFrom(r)) : null;
  }
  /**
  Returns true if the given fragment is valid content for this node
  type.
  */
  validContent(e) {
    let t = this.contentMatch.matchFragment(e);
    if (!t || !t.validEnd)
      return !1;
    for (let r = 0; r < e.childCount; r++)
      if (!this.allowsMarks(e.child(r).marks))
        return !1;
    return !0;
  }
  /**
  Throws a RangeError if the given fragment is not valid content for this
  node type.
  @internal
  */
  checkContent(e) {
    if (!this.validContent(e))
      throw new RangeError(`Invalid content for node ${this.name}: ${e.toString().slice(0, 50)}`);
  }
  /**
  @internal no longer useful, but called by old prosemirror-view versions
  */
  checkAttrs(e) {
  }
  /**
  Check whether the given mark type is allowed in this node.
  */
  allowsMarkType(e) {
    return this.markSet == null || this.markSet.indexOf(e) > -1;
  }
  /**
  Test whether the given set of marks are allowed in this node.
  */
  allowsMarks(e) {
    if (this.markSet == null)
      return !0;
    for (let t = 0; t < e.length; t++)
      if (!this.allowsMarkType(e[t].type))
        return !1;
    return !0;
  }
  /**
  Removes the marks that are not allowed in this node from the given set.
  */
  allowedMarks(e) {
    if (this.markSet == null)
      return e;
    let t;
    for (let r = 0; r < e.length; r++)
      this.allowsMarkType(e[r].type) ? t && t.push(e[r]) : t || (t = e.slice(0, r));
    return t ? t.length ? t : pe.none : e;
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null);
    e.forEach((o, s) => r[o] = new On(o, t, s));
    let i = t.spec.topNode || "doc";
    if (!r[i])
      throw new RangeError("Schema is missing its top node type ('" + i + "')");
    if (!r.text)
      throw new RangeError("Every schema needs a 'text' type");
    for (let o in r.text.attrs)
      throw new RangeError("The text node type should not have attributes");
    return r;
  }
}
function ma(n, e, t) {
  let r = t.split("|");
  return (i) => {
    let o = i === null ? "null" : typeof i;
    if (r.indexOf(o) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${n}, got ${o}`);
  };
}
class ga {
  constructor(e, t, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? ma(e, t, r.validate) : r.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class Wn {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    this.name = e, this.rank = t, this.schema = r, this.spec = i, this.attrs = ko(e, i.attrs), this.excluded = null;
    let o = vo(this.attrs);
    this.instance = o ? new pe(this, o) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new pe(this, wo(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((o, s) => r[o] = new Wn(o, i++, t, s)), r;
  }
  /**
  When there is a mark of this type in the given set, a new set
  without it is returned. Otherwise, the input set is returned.
  */
  removeFromSet(e) {
    for (var t = 0; t < e.length; t++)
      e[t].type == this && (e = e.slice(0, t).concat(e.slice(t + 1)), t--);
    return e;
  }
  /**
  Tests whether there is a mark of this type in the given set.
  */
  isInSet(e) {
    for (let t = 0; t < e.length; t++)
      if (e[t].type == this)
        return e[t];
  }
  /**
  Queries whether a given mark type is
  [excluded](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) by this one.
  */
  excludes(e) {
    return this.excluded.indexOf(e) > -1;
  }
}
class ya {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let i in e)
      t[i] = e[i];
    t.nodes = Ie.from(e.nodes), t.marks = Ie.from(e.marks || {}), this.nodes = On.compile(this.spec.nodes, this), this.marks = Wn.compile(this.spec.marks, this);
    let r = /* @__PURE__ */ Object.create(null);
    for (let i in this.nodes) {
      if (i in this.marks)
        throw new RangeError(i + " can not be both a node and a mark");
      let o = this.nodes[i], s = o.spec.content || "", l = o.spec.marks;
      if (o.contentMatch = r[s] || (r[s] = gt.parse(s, this.nodes)), o.inlineContent = o.contentMatch.inlineContent, o.spec.linebreakReplacement) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!o.isInline || !o.isLeaf)
          throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
        this.linebreakReplacement = o;
      }
      o.markSet = l == "_" ? null : l ? di(this, l.split(" ")) : l == "" || !o.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let o = this.marks[i], s = o.spec.excludes;
      o.excluded = s == null ? [o] : s == "" ? [] : di(this, s.split(" "));
    }
    this.nodeFromJSON = (i) => zt.fromJSON(this, i), this.markFromJSON = (i) => pe.fromJSON(this, i), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
  }
  /**
  Create a node in this schema. The `type` may be a string or a
  `NodeType` instance. Attributes will be extended with defaults,
  `content` may be a `Fragment`, `null`, a `Node`, or an array of
  nodes.
  */
  node(e, t = null, r, i) {
    if (typeof e == "string")
      e = this.nodeType(e);
    else if (e instanceof On) {
      if (e.schema != this)
        throw new RangeError("Node type from different schema used (" + e.name + ")");
    } else throw new RangeError("Invalid node type: " + e);
    return e.createChecked(t, r, i);
  }
  /**
  Create a text node in the schema. Empty text nodes are not
  allowed.
  */
  text(e, t) {
    let r = this.nodes.text;
    return new zn(r, r.defaultAttrs, e, pe.setFrom(t));
  }
  /**
  Create a mark with the given type and attributes.
  */
  mark(e, t) {
    return typeof e == "string" && (e = this.marks[e]), e.create(t);
  }
  /**
  @internal
  */
  nodeType(e) {
    let t = this.nodes[e];
    if (!t)
      throw new RangeError("Unknown node type: " + e);
    return t;
  }
}
function di(n, e) {
  let t = [];
  for (let r = 0; r < e.length; r++) {
    let i = e[r], o = n.marks[i], s = o;
    if (o)
      t.push(o);
    else
      for (let l in n.marks) {
        let a = n.marks[l];
        (i == "_" || a.spec.group && a.spec.group.split(" ").indexOf(i) > -1) && t.push(s = a);
      }
    if (!s)
      throw new SyntaxError("Unknown mark type: '" + e[r] + "'");
  }
  return t;
}
function xa(n) {
  return n.tag != null;
}
function ba(n) {
  return n.style != null;
}
class Ot {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, t) {
    this.schema = e, this.rules = t, this.tags = [], this.styles = [];
    let r = this.matchedStyles = [];
    t.forEach((i) => {
      if (xa(i))
        this.tags.push(i);
      else if (ba(i)) {
        let o = /[^=]*/.exec(i.style)[0];
        r.indexOf(o) < 0 && r.push(o), this.styles.push(i);
      }
    }), this.normalizeLists = !this.tags.some((i) => {
      if (!/^(ul|ol)\b/.test(i.tag) || !i.node)
        return !1;
      let o = e.nodes[i.node];
      return o.contentMatch.matchType(o);
    });
  }
  /**
  Parse a document from the content of a DOM node.
  */
  parse(e, t = {}) {
    let r = new hi(this, t, !1);
    return r.addAll(e, pe.none, t.from, t.to), r.finish();
  }
  /**
  Parses the content of the given DOM node, like
  [`parse`](https://prosemirror.net/docs/ref/#model.DOMParser.parse), and takes the same set of
  options. But unlike that method, which produces a whole node,
  this one returns a slice that is open at the sides, meaning that
  the schema constraints aren't applied to the start of nodes to
  the left of the input and the end of nodes at the end.
  */
  parseSlice(e, t = {}) {
    let r = new hi(this, t, !0);
    return r.addAll(e, pe.none, t.from, t.to), W.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let o = this.tags[i];
      if (ka(e, o.tag) && (o.namespace === void 0 || e.namespaceURI == o.namespace) && (!o.context || t.matchesContext(o.context))) {
        if (o.getAttrs) {
          let s = o.getAttrs(e);
          if (s === !1)
            continue;
          o.attrs = s || void 0;
        }
        return o;
      }
    }
  }
  /**
  @internal
  */
  matchStyle(e, t, r, i) {
    for (let o = i ? this.styles.indexOf(i) + 1 : 0; o < this.styles.length; o++) {
      let s = this.styles[o], l = s.style;
      if (!(l.indexOf(e) != 0 || s.context && !r.matchesContext(s.context) || // Test that the style string either precisely matches the prop,
      // or has an '=' sign after the prop, followed by the given
      // value.
      l.length > e.length && (l.charCodeAt(e.length) != 61 || l.slice(e.length + 1) != t))) {
        if (s.getAttrs) {
          let a = s.getAttrs(t);
          if (a === !1)
            continue;
          s.attrs = a || void 0;
        }
        return s;
      }
    }
  }
  /**
  @internal
  */
  static schemaRules(e) {
    let t = [];
    function r(i) {
      let o = i.priority == null ? 50 : i.priority, s = 0;
      for (; s < t.length; s++) {
        let l = t[s];
        if ((l.priority == null ? 50 : l.priority) < o)
          break;
      }
      t.splice(s, 0, i);
    }
    for (let i in e.marks) {
      let o = e.marks[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = pi(s)), s.mark || s.ignore || s.clearMark || (s.mark = i);
      });
    }
    for (let i in e.nodes) {
      let o = e.nodes[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = pi(s)), s.node || s.ignore || s.mark || (s.node = i);
      });
    }
    return t;
  }
  /**
  Construct a DOM parser using the parsing rules listed in a
  schema's [node specs](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM), reordered by
  [priority](https://prosemirror.net/docs/ref/#model.GenericParseRule.priority).
  */
  static fromSchema(e) {
    return e.cached.domParser || (e.cached.domParser = new Ot(e, Ot.schemaRules(e)));
  }
}
const So = {
  address: !0,
  article: !0,
  aside: !0,
  blockquote: !0,
  body: !0,
  canvas: !0,
  dd: !0,
  div: !0,
  dl: !0,
  fieldset: !0,
  figcaption: !0,
  figure: !0,
  footer: !0,
  form: !0,
  h1: !0,
  h2: !0,
  h3: !0,
  h4: !0,
  h5: !0,
  h6: !0,
  header: !0,
  hgroup: !0,
  hr: !0,
  li: !0,
  noscript: !0,
  ol: !0,
  output: !0,
  p: !0,
  pre: !0,
  section: !0,
  table: !0,
  tfoot: !0,
  ul: !0
}, va = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, To = { ol: !0, ul: !0 }, Qt = 1, pr = 2, Kt = 4;
function fi(n, e, t) {
  return e != null ? (e ? Qt : 0) | (e === "full" ? pr : 0) : n && n.whitespace == "pre" ? Qt | pr : t & ~Kt;
}
class yn {
  constructor(e, t, r, i, o, s) {
    this.type = e, this.attrs = t, this.marks = r, this.solid = i, this.options = s, this.content = [], this.activeMarks = pe.none, this.match = o || (s & Kt ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let t = this.type.contentMatch.fillBefore(A.from(e));
      if (t)
        this.match = this.type.contentMatch.matchFragment(t);
      else {
        let r = this.type.contentMatch, i;
        return (i = r.findWrapping(e.type)) ? (this.match = r, i) : null;
      }
    }
    return this.match.findWrapping(e.type);
  }
  finish(e) {
    if (!(this.options & Qt)) {
      let r = this.content[this.content.length - 1], i;
      if (r && r.isText && (i = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let o = r;
        r.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = o.withText(o.text.slice(0, o.text.length - i[0].length));
      }
    }
    let t = A.from(this.content);
    return !e && this.match && (t = t.append(this.match.fillBefore(A.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !So.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class hi {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0, this.localPreserveWS = !1;
    let i = t.topNode, o, s = fi(null, t.preserveWhitespace, 0) | (r ? Kt : 0);
    i ? o = new yn(i.type, i.attrs, pe.none, !0, t.topMatch || i.type.contentMatch, s) : r ? o = new yn(null, null, pe.none, !0, null, s) : o = new yn(e.schema.topNodeType, null, pe.none, !0, null, s), this.nodes = [o], this.find = t.findPositions, this.needsBlock = !1;
  }
  get top() {
    return this.nodes[this.open];
  }
  // Add a DOM node to the content. Text is inserted as text node,
  // otherwise, the node is passed to `addElement` or, if it has a
  // `style` attribute, `addElementWithStyles`.
  addDOM(e, t) {
    e.nodeType == 3 ? this.addTextNode(e, t) : e.nodeType == 1 && this.addElement(e, t);
  }
  addTextNode(e, t) {
    let r = e.nodeValue, i = this.top, o = i.options & pr ? "full" : this.localPreserveWS || (i.options & Qt) > 0, { schema: s } = this.parser;
    if (o === "full" || i.inlineContext(e) || /[^ \t\r\n\u000c]/.test(r)) {
      if (o)
        if (o === "full")
          r = r.replace(/\r\n?/g, `
`);
        else if (s.linebreakReplacement && /[\r\n]/.test(r) && this.top.findWrapping(s.linebreakReplacement.create())) {
          let l = r.split(/\r?\n|\r/);
          for (let a = 0; a < l.length; a++)
            a && this.insertNode(s.linebreakReplacement.create(), t, !0), l[a] && this.insertNode(s.text(l[a]), t, !/\S/.test(l[a]));
          r = "";
        } else
          r = r.replace(/\r?\n|\r/g, " ");
      else if (r = r.replace(/[ \t\r\n\u000c]+/g, " "), /^[ \t\r\n\u000c]/.test(r) && this.open == this.nodes.length - 1) {
        let l = i.content[i.content.length - 1], a = e.previousSibling;
        (!l || a && a.nodeName == "BR" || l.isText && /[ \t\r\n\u000c]$/.test(l.text)) && (r = r.slice(1));
      }
      r && this.insertNode(s.text(r), t, !/\S/.test(r)), this.findInText(e);
    } else
      this.findInside(e);
  }
  // Try to find a handler for the given tag and use that to parse. If
  // none is found, the element's content nodes are added directly.
  addElement(e, t, r) {
    let i = this.localPreserveWS, o = this.top;
    (e.tagName == "PRE" || /pre/.test(e.style && e.style.whiteSpace)) && (this.localPreserveWS = !0);
    let s = e.nodeName.toLowerCase(), l;
    To.hasOwnProperty(s) && this.parser.normalizeLists && wa(e);
    let a = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, r));
    e: if (a ? a.ignore : va.hasOwnProperty(s))
      this.findInside(e), this.ignoreFallback(e, t);
    else if (!a || a.skip || a.closeParent) {
      a && a.closeParent ? this.open = Math.max(0, this.open - 1) : a && a.skip.nodeType && (e = a.skip);
      let c, u = this.needsBlock;
      if (So.hasOwnProperty(s))
        o.content.length && o.content[0].isInline && this.open && (this.open--, o = this.top), c = !0, o.type || (this.needsBlock = !0);
      else if (!e.firstChild) {
        this.leafFallback(e, t);
        break e;
      }
      let f = a && a.skip ? t : this.readStyles(e, t);
      f && this.addAll(e, f), c && this.sync(o), this.needsBlock = u;
    } else {
      let c = this.readStyles(e, t);
      c && this.addElementByRule(e, a, c, a.consuming === !1 ? l : void 0);
    }
    this.localPreserveWS = i;
  }
  // Called for leaf DOM nodes that would otherwise be ignored
  leafFallback(e, t) {
    e.nodeName == "BR" && this.top.type && this.top.type.inlineContent && this.addTextNode(e.ownerDocument.createTextNode(`
`), t);
  }
  // Called for ignored nodes
  ignoreFallback(e, t) {
    e.nodeName == "BR" && (!this.top.type || !this.top.type.inlineContent) && this.findPlace(this.parser.schema.text("-"), t, !0);
  }
  // Run any style parser associated with the node's styles. Either
  // return an updated array of marks, or null to indicate some of the
  // styles had a rule with `ignore` set.
  readStyles(e, t) {
    let r = e.style;
    if (r && r.length)
      for (let i = 0; i < this.parser.matchedStyles.length; i++) {
        let o = this.parser.matchedStyles[i], s = r.getPropertyValue(o);
        if (s)
          for (let l = void 0; ; ) {
            let a = this.parser.matchStyle(o, s, this, l);
            if (!a)
              break;
            if (a.ignore)
              return null;
            if (a.clearMark ? t = t.filter((c) => !a.clearMark(c)) : t = t.concat(this.parser.schema.marks[a.mark].create(a.attrs)), a.consuming === !1)
              l = a;
            else
              break;
          }
      }
    return t;
  }
  // Look up a handler for the given node. If none are found, return
  // false. Otherwise, apply it, use its return value to drive the way
  // the node's content is wrapped, and return true.
  addElementByRule(e, t, r, i) {
    let o, s;
    if (t.node)
      if (s = this.parser.schema.nodes[t.node], s.isLeaf)
        this.insertNode(s.create(t.attrs), r, e.nodeName == "BR") || this.leafFallback(e, r);
      else {
        let a = this.enter(s, t.attrs || null, r, t.preserveWhitespace);
        a && (o = !0, r = a);
      }
    else {
      let a = this.parser.schema.marks[t.mark];
      r = r.concat(a.create(t.attrs));
    }
    let l = this.top;
    if (s && s.isLeaf)
      this.findInside(e);
    else if (i)
      this.addElement(e, r, i);
    else if (t.getContent)
      this.findInside(e), t.getContent(e, this.parser.schema).forEach((a) => this.insertNode(a, r, !1));
    else {
      let a = e;
      typeof t.contentElement == "string" ? a = e.querySelector(t.contentElement) : typeof t.contentElement == "function" ? a = t.contentElement(e) : t.contentElement && (a = t.contentElement), this.findAround(e, a, !0), this.addAll(a, r), this.findAround(e, a, !1);
    }
    o && this.sync(l) && this.open--;
  }
  // Add all child nodes between `startIndex` and `endIndex` (or the
  // whole node, if not given). If `sync` is passed, use it to
  // synchronize after every block element.
  addAll(e, t, r, i) {
    let o = r || 0;
    for (let s = r ? e.childNodes[r] : e.firstChild, l = i == null ? null : e.childNodes[i]; s != l; s = s.nextSibling, ++o)
      this.findAtPoint(e, o), this.addDOM(s, t);
    this.findAtPoint(e, o);
  }
  // Try to find a way to fit the given node type into the current
  // context. May add intermediate wrappers and/or leave non-solid
  // nodes that we're in.
  findPlace(e, t, r) {
    let i, o;
    for (let s = this.open, l = 0; s >= 0; s--) {
      let a = this.nodes[s], c = a.findWrapping(e);
      if (c && (!i || i.length > c.length + l) && (i = c, o = a, !c.length))
        break;
      if (a.solid) {
        if (r)
          break;
        l += 2;
      }
    }
    if (!i)
      return null;
    this.sync(o);
    for (let s = 0; s < i.length; s++)
      t = this.enterInner(i[s], null, t, !1);
    return t;
  }
  // Try to insert the given node, adjusting the context when needed.
  insertNode(e, t, r) {
    if (e.isInline && this.needsBlock && !this.top.type) {
      let o = this.textblockFromContext();
      o && (t = this.enterInner(o, null, t));
    }
    let i = this.findPlace(e, t, r);
    if (i) {
      this.closeExtra();
      let o = this.top;
      o.match && (o.match = o.match.matchType(e.type));
      let s = pe.none;
      for (let l of i.concat(e.marks))
        (o.type ? o.type.allowsMarkType(l.type) : mi(l.type, e.type)) && (s = l.addToSet(s));
      return o.content.push(e.mark(s)), !0;
    }
    return !1;
  }
  // Try to start a node of the given type, adjusting the context when
  // necessary.
  enter(e, t, r, i) {
    let o = this.findPlace(e.create(t), r, !1);
    return o && (o = this.enterInner(e, t, r, !0, i)), o;
  }
  // Open a node of the given type
  enterInner(e, t, r, i = !1, o) {
    this.closeExtra();
    let s = this.top;
    s.match = s.match && s.match.matchType(e);
    let l = fi(e, o, s.options);
    s.options & Kt && s.content.length == 0 && (l |= Kt);
    let a = pe.none;
    return r = r.filter((c) => (s.type ? s.type.allowsMarkType(c.type) : mi(c.type, e)) ? (a = c.addToSet(a), !1) : !0), this.nodes.push(new yn(e, t, a, i, null, l)), this.open++, r;
  }
  // Make sure all nodes above this.open are finished and added to
  // their parents
  closeExtra(e = !1) {
    let t = this.nodes.length - 1;
    if (t > this.open) {
      for (; t > this.open; t--)
        this.nodes[t - 1].content.push(this.nodes[t].finish(e));
      this.nodes.length = this.open + 1;
    }
  }
  finish() {
    return this.open = 0, this.closeExtra(this.isOpen), this.nodes[0].finish(!!(this.isOpen || this.options.topOpen));
  }
  sync(e) {
    for (let t = this.open; t >= 0; t--) {
      if (this.nodes[t] == e)
        return this.open = t, !0;
      this.localPreserveWS && (this.nodes[t].options |= Qt);
    }
    return !1;
  }
  get currentPos() {
    this.closeExtra();
    let e = 0;
    for (let t = this.open; t >= 0; t--) {
      let r = this.nodes[t].content;
      for (let i = r.length - 1; i >= 0; i--)
        e += r[i].nodeSize;
      t && e++;
    }
    return e;
  }
  findAtPoint(e, t) {
    if (this.find)
      for (let r = 0; r < this.find.length; r++)
        this.find[r].node == e && this.find[r].offset == t && (this.find[r].pos = this.currentPos);
  }
  findInside(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].pos == null && e.nodeType == 1 && e.contains(this.find[t].node) && (this.find[t].pos = this.currentPos);
  }
  findAround(e, t, r) {
    if (e != t && this.find)
      for (let i = 0; i < this.find.length; i++)
        this.find[i].pos == null && e.nodeType == 1 && e.contains(this.find[i].node) && t.compareDocumentPosition(this.find[i].node) & (r ? 2 : 4) && (this.find[i].pos = this.currentPos);
  }
  findInText(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].node == e && (this.find[t].pos = this.currentPos - (e.nodeValue.length - this.find[t].offset));
  }
  // Determines whether the given context string matches this context.
  matchesContext(e) {
    if (e.indexOf("|") > -1)
      return e.split(/\s*\|\s*/).some(this.matchesContext, this);
    let t = e.split("/"), r = this.options.context, i = !this.isOpen && (!r || r.parent.type == this.nodes[0].type), o = -(r ? r.depth + 1 : 0) + (i ? 0 : 1), s = (l, a) => {
      for (; l >= 0; l--) {
        let c = t[l];
        if (c == "") {
          if (l == t.length - 1 || l == 0)
            continue;
          for (; a >= o; a--)
            if (s(l - 1, a))
              return !0;
          return !1;
        } else {
          let u = a > 0 || a == 0 && i ? this.nodes[a].type : r && a >= o ? r.node(a - o).type : null;
          if (!u || u.name != c && !u.isInGroup(c))
            return !1;
          a--;
        }
      }
      return !0;
    };
    return s(t.length - 1, this.open);
  }
  textblockFromContext() {
    let e = this.options.context;
    if (e)
      for (let t = e.depth; t >= 0; t--) {
        let r = e.node(t).contentMatchAt(e.indexAfter(t)).defaultType;
        if (r && r.isTextblock && r.defaultAttrs)
          return r;
      }
    for (let t in this.parser.schema.nodes) {
      let r = this.parser.schema.nodes[t];
      if (r.isTextblock && r.defaultAttrs)
        return r;
    }
  }
}
function wa(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && To.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function ka(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function pi(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function mi(n, e) {
  let t = e.schema.nodes;
  for (let r in t) {
    let i = t[r];
    if (!i.allowsMarkType(n))
      continue;
    let o = [], s = (l) => {
      o.push(l);
      for (let a = 0; a < l.edgeCount; a++) {
        let { type: c, next: u } = l.edge(a);
        if (c == e || o.indexOf(u) < 0 && s(u))
          return !0;
      }
    };
    if (s(i.contentMatch))
      return !0;
  }
}
const Eo = 65535, Co = Math.pow(2, 16);
function Sa(n, e) {
  return n + e * Co;
}
function gi(n) {
  return n & Eo;
}
function Ta(n) {
  return (n - (n & Eo)) / Co;
}
const No = 1, Mo = 2, kn = 4, Ao = 8;
class mr {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.pos = e, this.delInfo = t, this.recover = r;
  }
  /**
  Tells you whether the position was deleted, that is, whether the
  step removed the token on the side queried (via the `assoc`)
  argument from the document.
  */
  get deleted() {
    return (this.delInfo & Ao) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (No | kn)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (Mo | kn)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & kn) > 0;
  }
}
class Be {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, t = !1) {
    if (this.ranges = e, this.inverted = t, !e.length && Be.empty)
      return Be.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let t = 0, r = gi(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + t + Ta(e);
  }
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  map(e, t = 1) {
    return this._map(e, t, !0);
  }
  /**
  @internal
  */
  _map(e, t, r) {
    let i = 0, o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? i : 0);
      if (a > e)
        break;
      let c = this.ranges[l + o], u = this.ranges[l + s], f = a + c;
      if (e <= f) {
        let d = c ? e == a ? -1 : e == f ? 1 : t : t, h = a + i + (d < 0 ? 0 : u);
        if (r)
          return h;
        let p = e == (t < 0 ? a : f) ? null : Sa(l / 3, e - a), g = e == a ? Mo : e == f ? No : kn;
        return (t < 0 ? e != a : e != f) && (g |= Ao), new mr(h, g, p);
      }
      i += u - c;
    }
    return r ? e + i : new mr(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, i = gi(t), o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? r : 0);
      if (a > e)
        break;
      let c = this.ranges[l + o], u = a + c;
      if (e <= u && l == i * 3)
        return !0;
      r += this.ranges[l + s] - c;
    }
    return !1;
  }
  /**
  Calls the given function on each of the changed ranges included in
  this map.
  */
  forEach(e) {
    let t = this.inverted ? 2 : 1, r = this.inverted ? 1 : 2;
    for (let i = 0, o = 0; i < this.ranges.length; i += 3) {
      let s = this.ranges[i], l = s - (this.inverted ? o : 0), a = s + (this.inverted ? 0 : o), c = this.ranges[i + t], u = this.ranges[i + r];
      e(l, l + c, a, a + u), o += u - c;
    }
  }
  /**
  Create an inverted version of this map. The result can be used to
  map positions in the post-step document to the pre-step document.
  */
  invert() {
    return new Be(this.ranges, !this.inverted);
  }
  /**
  @internal
  */
  toString() {
    return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
  }
  /**
  Create a map that moves all positions by offset `n` (which may be
  negative). This can be useful when applying steps meant for a
  sub-document to a larger document, or vice-versa.
  */
  static offset(e) {
    return e == 0 ? Be.empty : new Be(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
Be.empty = new Be([]);
class $n {
  /**
  Create a new mapping with the given position maps.
  */
  constructor(e, t, r = 0, i = e ? e.length : 0) {
    this.mirror = t, this.from = r, this.to = i, this._maps = e || [], this.ownData = !(e || t);
  }
  /**
  The step maps in this mapping.
  */
  get maps() {
    return this._maps;
  }
  /**
  Create a mapping that maps only through a part of this one.
  */
  slice(e = 0, t = this.maps.length) {
    return new $n(this._maps, this.mirror, e, t);
  }
  /**
  Add a step map to the end of this mapping. If `mirrors` is
  given, it should be the index of the step map that is the mirror
  image of this one.
  */
  appendMap(e, t) {
    this.ownData || (this._maps = this._maps.slice(), this.mirror = this.mirror && this.mirror.slice(), this.ownData = !0), this.to = this._maps.push(e), t != null && this.setMirror(this._maps.length - 1, t);
  }
  /**
  Add all the step maps in a given mapping to this one (preserving
  mirroring information).
  */
  appendMapping(e) {
    for (let t = 0, r = this._maps.length; t < e._maps.length; t++) {
      let i = e.getMirror(t);
      this.appendMap(e._maps[t], i != null && i < t ? r + i : void 0);
    }
  }
  /**
  Finds the offset of the step map that mirrors the map at the
  given offset, in this mapping (as per the second argument to
  `appendMap`).
  */
  getMirror(e) {
    if (this.mirror) {
      for (let t = 0; t < this.mirror.length; t++)
        if (this.mirror[t] == e)
          return this.mirror[t + (t % 2 ? -1 : 1)];
    }
  }
  /**
  @internal
  */
  setMirror(e, t) {
    this.mirror || (this.mirror = []), this.mirror.push(e, t);
  }
  /**
  Append the inverse of the given mapping to this one.
  */
  appendMappingInverted(e) {
    for (let t = e.maps.length - 1, r = this._maps.length + e._maps.length; t >= 0; t--) {
      let i = e.getMirror(t);
      this.appendMap(e._maps[t].invert(), i != null && i > t ? r - i - 1 : void 0);
    }
  }
  /**
  Create an inverted version of this mapping.
  */
  invert() {
    let e = new $n();
    return e.appendMappingInverted(this), e;
  }
  /**
  Map a position through this mapping.
  */
  map(e, t = 1) {
    if (this.mirror)
      return this._map(e, t, !0);
    for (let r = this.from; r < this.to; r++)
      e = this._maps[r].map(e, t);
    return e;
  }
  /**
  Map a position through this mapping, returning a mapping
  result.
  */
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  /**
  @internal
  */
  _map(e, t, r) {
    let i = 0;
    for (let o = this.from; o < this.to; o++) {
      let s = this._maps[o], l = s.mapResult(e, t);
      if (l.recover != null) {
        let a = this.getMirror(o);
        if (a != null && a > o && a < this.to) {
          o = a, e = this._maps[a].recover(l.recover);
          continue;
        }
      }
      i |= l.delInfo, e = l.pos;
    }
    return r ? e : new mr(e, i, null);
  }
}
const er = /* @__PURE__ */ Object.create(null);
class $e {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return Be.empty;
  }
  /**
  Try to merge this step with another one, to be applied directly
  after it. Returns the merged step when possible, null if the
  steps can't be merged.
  */
  merge(e) {
    return null;
  }
  /**
  Deserialize a step from its JSON representation. Will call
  through to the step class' own implementation of this method.
  */
  static fromJSON(e, t) {
    if (!t || !t.stepType)
      throw new RangeError("Invalid input for Step.fromJSON");
    let r = er[t.stepType];
    if (!r)
      throw new RangeError(`No step type ${t.stepType} defined`);
    return r.fromJSON(e, t);
  }
  /**
  To be able to serialize steps to JSON, each step needs a string
  ID to attach to its JSON representation. Use this method to
  register an ID for your step classes. Try to pick something
  that's unlikely to clash with steps from other modules.
  */
  static jsonID(e, t) {
    if (e in er)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return er[e] = t, t.prototype.jsonID = e, t;
  }
}
class Se {
  /**
  @internal
  */
  constructor(e, t) {
    this.doc = e, this.failed = t;
  }
  /**
  Create a successful step result.
  */
  static ok(e) {
    return new Se(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new Se(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, t, r, i) {
    try {
      return Se.ok(e.replace(t, r, i));
    } catch (o) {
      if (o instanceof Xt)
        return Se.fail(o.message);
      throw o;
    }
  }
}
function zr(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let o = n.child(i);
    o.content.size && (o = o.copy(zr(o.content, e, o))), o.isInline && (o = e(o, t, i)), r.push(o);
  }
  return A.fromArray(r);
}
class st extends $e {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new W(zr(t.content, (s, l) => !s.isAtom || !l.type.allowsMarkType(this.mark.type) ? s : s.mark(this.mark.addToSet(s.marks)), i), t.openStart, t.openEnd);
    return Se.fromReplace(e, this.from, this.to, o);
  }
  invert() {
    return new qe(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new st(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof st && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new st(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "addMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for AddMarkStep.fromJSON");
    return new st(t.from, t.to, e.markFromJSON(t.mark));
  }
}
$e.jsonID("addMark", st);
class qe extends $e {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new W(zr(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
    return Se.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new st(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new qe(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof qe && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new qe(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "removeMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
    return new qe(t.from, t.to, e.markFromJSON(t.mark));
  }
}
$e.jsonID("removeMark", qe);
class lt extends $e {
  /**
  Create a node mark step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return Se.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return Se.fromReplace(e, this.pos, this.pos + 1, new W(A.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    if (t) {
      let r = this.mark.addToSet(t.marks);
      if (r.length == t.marks.length) {
        for (let i = 0; i < t.marks.length; i++)
          if (!t.marks[i].isInSet(r))
            return new lt(this.pos, t.marks[i]);
        return new lt(this.pos, this.mark);
      }
    }
    return new yt(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new lt(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: "addNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON");
    return new lt(t.pos, e.markFromJSON(t.mark));
  }
}
$e.jsonID("addNodeMark", lt);
class yt extends $e {
  /**
  Create a mark-removing step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return Se.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return Se.fromReplace(e, this.pos, this.pos + 1, new W(A.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new lt(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new yt(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: "removeNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
    return new yt(t.pos, e.markFromJSON(t.mark));
  }
}
$e.jsonID("removeNodeMark", yt);
class ke extends $e {
  /**
  The given `slice` should fit the 'gap' between `from` and
  `to`—the depths must line up, and the surrounding nodes must be
  able to be joined with the open sides of the slice. When
  `structure` is true, the step will fail if the content between
  from and to is not just a sequence of closing and then opening
  tokens (this is to guard against rebased replace steps
  overwriting something they weren't supposed to).
  */
  constructor(e, t, r, i = !1) {
    super(), this.from = e, this.to = t, this.slice = r, this.structure = i;
  }
  apply(e) {
    return this.structure && gr(e, this.from, this.to) ? Se.fail("Structure replace would overwrite content") : Se.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new Be([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new ke(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let t = e.mapResult(this.to, -1), r = this.from == this.to && ke.MAP_BIAS < 0 ? t : e.mapResult(this.from, 1);
    return r.deletedAcross && t.deletedAcross ? null : new ke(r.pos, Math.max(r.pos, t.pos), this.slice, this.structure);
  }
  merge(e) {
    if (!(e instanceof ke) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let t = this.slice.size + e.slice.size == 0 ? W.empty : new W(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new ke(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? W.empty : new W(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new ke(e.from, this.to, t, this.structure);
    } else
      return null;
  }
  toJSON() {
    let e = { stepType: "replace", from: this.from, to: this.to };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for ReplaceStep.fromJSON");
    return new ke(t.from, t.to, W.fromJSON(e, t.slice), !!t.structure);
  }
}
ke.MAP_BIAS = 1;
$e.jsonID("replace", ke);
class Re extends $e {
  /**
  Create a replace-around step with the given range and gap.
  `insert` should be the point in the slice into which the content
  of the gap should be moved. `structure` has the same meaning as
  it has in the [`ReplaceStep`](https://prosemirror.net/docs/ref/#transform.ReplaceStep) class.
  */
  constructor(e, t, r, i, o, s, l = !1) {
    super(), this.from = e, this.to = t, this.gapFrom = r, this.gapTo = i, this.slice = o, this.insert = s, this.structure = l;
  }
  apply(e) {
    if (this.structure && (gr(e, this.from, this.gapFrom) || gr(e, this.gapTo, this.to)))
      return Se.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return Se.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? Se.fromReplace(e, this.from, this.to, r) : Se.fail("Content does not fit in gap");
  }
  getMap() {
    return new Be([
      this.from,
      this.gapFrom - this.from,
      this.insert,
      this.gapTo,
      this.to - this.gapTo,
      this.slice.size - this.insert
    ]);
  }
  invert(e) {
    let t = this.gapTo - this.gapFrom;
    return new Re(this.from, this.from + this.slice.size + t, this.from + this.insert, this.from + this.insert + t, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), i = this.from == this.gapFrom ? t.pos : e.map(this.gapFrom, -1), o = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return t.deletedAcross && r.deletedAcross || i < t.pos || o > r.pos ? null : new Re(t.pos, r.pos, i, o, this.slice, this.insert, this.structure);
  }
  toJSON() {
    let e = {
      stepType: "replaceAround",
      from: this.from,
      to: this.to,
      gapFrom: this.gapFrom,
      gapTo: this.gapTo,
      insert: this.insert
    };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number" || typeof t.gapFrom != "number" || typeof t.gapTo != "number" || typeof t.insert != "number")
      throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
    return new Re(t.from, t.to, t.gapFrom, t.gapTo, W.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
$e.jsonID("replaceAround", Re);
function gr(n, e, t) {
  let r = n.resolve(e), i = t - e, o = r.depth;
  for (; i > 0 && o > 0 && r.indexAfter(o) == r.node(o).childCount; )
    o--, i--;
  if (i > 0) {
    let s = r.node(o).maybeChild(r.indexAfter(o));
    for (; i > 0; ) {
      if (!s || s.isLeaf)
        return !0;
      s = s.firstChild, i--;
    }
  }
  return !1;
}
function Ea(n, e, t, r) {
  let i = [], o = [], s, l;
  n.doc.nodesBetween(e, t, (a, c, u) => {
    if (!a.isInline)
      return;
    let f = a.marks;
    if (!r.isInSet(f) && u.type.allowsMarkType(r.type)) {
      let d = Math.max(c, e), h = Math.min(c + a.nodeSize, t), p = r.addToSet(f);
      for (let g = 0; g < f.length; g++)
        f[g].isInSet(p) || (s && s.to == d && s.mark.eq(f[g]) ? s.to = h : i.push(s = new qe(d, h, f[g])));
      l && l.to == d ? l.to = h : o.push(l = new st(d, h, r));
    }
  }), i.forEach((a) => n.step(a)), o.forEach((a) => n.step(a));
}
function Ca(n, e, t, r) {
  let i = [], o = 0;
  n.doc.nodesBetween(e, t, (s, l) => {
    if (!s.isInline)
      return;
    o++;
    let a = null;
    if (r instanceof Wn) {
      let c = s.marks, u;
      for (; u = r.isInSet(c); )
        (a || (a = [])).push(u), c = u.removeFromSet(c);
    } else r ? r.isInSet(s.marks) && (a = [r]) : a = s.marks;
    if (a && a.length) {
      let c = Math.min(l + s.nodeSize, t);
      for (let u = 0; u < a.length; u++) {
        let f = a[u], d;
        for (let h = 0; h < i.length; h++) {
          let p = i[h];
          p.step == o - 1 && f.eq(i[h].style) && (d = p);
        }
        d ? (d.to = c, d.step = o) : i.push({ style: f, from: Math.max(l, e), to: c, step: o });
      }
    }
  }), i.forEach((s) => n.step(new qe(s.from, s.to, s.style)));
}
function Or(n, e, t, r = t.contentMatch, i = !0) {
  let o = n.doc.nodeAt(e), s = [], l = e + 1;
  for (let a = 0; a < o.childCount; a++) {
    let c = o.child(a), u = l + c.nodeSize, f = r.matchType(c.type);
    if (!f)
      s.push(new ke(l, u, W.empty));
    else {
      r = f;
      for (let d = 0; d < c.marks.length; d++)
        t.allowsMarkType(c.marks[d].type) || n.step(new qe(l, u, c.marks[d]));
      if (i && c.isText && t.whitespace != "pre") {
        let d, h = /\r?\n|\r/g, p;
        for (; d = h.exec(c.text); )
          p || (p = new W(A.from(t.schema.text(" ", t.allowedMarks(c.marks))), 0, 0)), s.push(new ke(l + d.index, l + d.index + d[0].length, p));
      }
    }
    l = u;
  }
  if (!r.validEnd) {
    let a = r.fillBefore(A.empty, !0);
    n.replace(l, l, new W(a, 0, 0));
  }
  for (let a = s.length - 1; a >= 0; a--)
    n.step(s[a]);
}
function Na(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function Ht(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth, i = 0, o = 0; ; --r) {
    let s = n.$from.node(r), l = n.$from.index(r) + i, a = n.$to.indexAfter(r) - o;
    if (r < n.depth && s.canReplace(l, a, t))
      return r;
    if (r == 0 || s.type.spec.isolating || !Na(s, l, a))
      break;
    l && (i = 1), a < s.childCount && (o = 1);
  }
  return null;
}
function Ma(n, e, t) {
  let { $from: r, $to: i, depth: o } = e, s = r.before(o + 1), l = i.after(o + 1), a = s, c = l, u = A.empty, f = 0;
  for (let p = o, g = !1; p > t; p--)
    g || r.index(p) > 0 ? (g = !0, u = A.from(r.node(p).copy(u)), f++) : a--;
  let d = A.empty, h = 0;
  for (let p = o, g = !1; p > t; p--)
    g || i.after(p + 1) < i.end(p) ? (g = !0, d = A.from(i.node(p).copy(d)), h++) : c++;
  n.step(new Re(a, c, s, l, new W(u.append(d), f, h), u.size - f, !0));
}
function Ro(n, e, t = null, r = n) {
  let i = Aa(n, e), o = i && Ra(r, e);
  return o ? i.map(yi).concat({ type: e, attrs: t }).concat(o.map(yi)) : null;
}
function yi(n) {
  return { type: n, attrs: null };
}
function Aa(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.contentMatchAt(r).findWrapping(e);
  if (!o)
    return null;
  let s = o.length ? o[0] : e;
  return t.canReplaceWith(r, i, s) ? o : null;
}
function Ra(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.child(r), s = e.contentMatch.findWrapping(o.type);
  if (!s)
    return null;
  let a = (s.length ? s[s.length - 1] : e).contentMatch;
  for (let c = r; a && c < i; c++)
    a = a.matchType(t.child(c).type);
  return !a || !a.validEnd ? null : s;
}
function Ia(n, e, t) {
  let r = A.empty;
  for (let s = t.length - 1; s >= 0; s--) {
    if (r.size) {
      let l = t[s].type.contentMatch.matchFragment(r);
      if (!l || !l.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = A.from(t[s].type.create(t[s].attrs, r));
  }
  let i = e.start, o = e.end;
  n.step(new Re(i, o, i, o, new W(r, 0, 0), t.length, !0));
}
function za(n, e, t, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let o = n.steps.length;
  n.doc.nodesBetween(e, t, (s, l) => {
    let a = typeof i == "function" ? i(s) : i;
    if (s.isTextblock && !s.hasMarkup(r, a) && Oa(n.doc, n.mapping.slice(o).map(l), r)) {
      let c = null;
      if (r.schema.linebreakReplacement) {
        let h = r.whitespace == "pre", p = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        h && !p ? c = !1 : !h && p && (c = !0);
      }
      c === !1 && zo(n, s, l, o), Or(n, n.mapping.slice(o).map(l, 1), r, void 0, c === null);
      let u = n.mapping.slice(o), f = u.map(l, 1), d = u.map(l + s.nodeSize, 1);
      return n.step(new Re(f, d, f + 1, d - 1, new W(A.from(r.create(a, null, s.marks)), 0, 0), 1, !0)), c === !0 && Io(n, s, l, o), !1;
    }
  });
}
function Io(n, e, t, r) {
  e.forEach((i, o) => {
    if (i.isText) {
      let s, l = /\r?\n|\r/g;
      for (; s = l.exec(i.text); ) {
        let a = n.mapping.slice(r).map(t + 1 + o + s.index);
        n.replaceWith(a, a + 1, e.type.schema.linebreakReplacement.create());
      }
    }
  });
}
function zo(n, e, t, r) {
  e.forEach((i, o) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let s = n.mapping.slice(r).map(t + 1 + o);
      n.replaceWith(s, s + 1, e.type.schema.text(`
`));
    }
  });
}
function Oa(n, e, t) {
  let r = n.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, t);
}
function $a(n, e, t, r, i) {
  let o = n.doc.nodeAt(e);
  if (!o)
    throw new RangeError("No node at given position");
  t || (t = o.type);
  let s = t.create(r, null, i || o.marks);
  if (o.isLeaf)
    return n.replaceWith(e, e + o.nodeSize, s);
  if (!t.validContent(o.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(new Re(e, e + o.nodeSize, e + 1, e + o.nodeSize - 1, new W(A.from(s), 0, 0), 1, !0));
}
function nt(n, e, t = 1, r) {
  let i = n.resolve(e), o = i.depth - t, s = r && r[r.length - 1] || i.parent;
  if (o < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !s.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
    return !1;
  for (let c = i.depth - 1, u = t - 2; c > o; c--, u--) {
    let f = i.node(c), d = i.index(c);
    if (f.type.spec.isolating)
      return !1;
    let h = f.content.cutByIndex(d, f.childCount), p = r && r[u + 1];
    p && (h = h.replaceChild(0, p.type.create(p.attrs)));
    let g = r && r[u] || f;
    if (!f.canReplace(d + 1, f.childCount) || !g.type.validContent(h))
      return !1;
  }
  let l = i.indexAfter(o), a = r && r[0];
  return i.node(o).canReplaceWith(l, l, a ? a.type : i.node(o + 1).type);
}
function Da(n, e, t = 1, r) {
  let i = n.doc.resolve(e), o = A.empty, s = A.empty;
  for (let l = i.depth, a = i.depth - t, c = t - 1; l > a; l--, c--) {
    o = A.from(i.node(l).copy(o));
    let u = r && r[c];
    s = A.from(u ? u.type.create(u.attrs, s) : i.node(l).copy(s));
  }
  n.step(new ke(e, e, new W(o.append(s), t, t), !0));
}
function wt(n, e) {
  let t = n.resolve(e), r = t.index();
  return Oo(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function Pa(n, e) {
  e.content.size || n.type.compatibleContent(e.type);
  let t = n.contentMatchAt(n.childCount), { linebreakReplacement: r } = n.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let o = e.child(i), s = o.type == r ? n.type.schema.nodes.text : o.type;
    if (t = t.matchType(s), !t || !n.type.allowsMarks(o.marks))
      return !1;
  }
  return t.validEnd;
}
function Oo(n, e) {
  return !!(n && e && !n.isLeaf && Pa(n, e));
}
function jn(n, e, t = -1) {
  let r = n.resolve(e);
  for (let i = r.depth; ; i--) {
    let o, s, l = r.index(i);
    if (i == r.depth ? (o = r.nodeBefore, s = r.nodeAfter) : t > 0 ? (o = r.node(i + 1), l++, s = r.node(i).maybeChild(l)) : (o = r.node(i).maybeChild(l - 1), s = r.node(i + 1)), o && !o.isTextblock && Oo(o, s) && r.node(i).canReplace(l, l + 1))
      return e;
    if (i == 0)
      break;
    e = t < 0 ? r.before(i) : r.after(i);
  }
}
function La(n, e, t) {
  let r = null, { linebreakReplacement: i } = n.doc.type.schema, o = n.doc.resolve(e - t), s = o.node().type;
  if (i && s.inlineContent) {
    let u = s.whitespace == "pre", f = !!s.contentMatch.matchType(i);
    u && !f ? r = !1 : !u && f && (r = !0);
  }
  let l = n.steps.length;
  if (r === !1) {
    let u = n.doc.resolve(e + t);
    zo(n, u.node(), u.before(), l);
  }
  s.inlineContent && Or(n, e + t - 1, s, o.node().contentMatchAt(o.index()), r == null);
  let a = n.mapping.slice(l), c = a.map(e - t);
  if (n.step(new ke(c, a.map(e + t, -1), W.empty, !0)), r === !0) {
    let u = n.doc.resolve(c);
    Io(n, u.node(), u.before(), n.steps.length);
  }
  return n;
}
function Ba(n, e, t) {
  let r = n.resolve(e);
  if (r.parent.canReplaceWith(r.index(), r.index(), t))
    return e;
  if (r.parentOffset == 0)
    for (let i = r.depth - 1; i >= 0; i--) {
      let o = r.index(i);
      if (r.node(i).canReplaceWith(o, o, t))
        return r.before(i + 1);
      if (o > 0)
        return null;
    }
  if (r.parentOffset == r.parent.content.size)
    for (let i = r.depth - 1; i >= 0; i--) {
      let o = r.indexAfter(i);
      if (r.node(i).canReplaceWith(o, o, t))
        return r.after(i + 1);
      if (o < r.node(i).childCount)
        return null;
    }
  return null;
}
function Jn(n, e, t = e, r = W.empty) {
  if (e == t && !r.size)
    return null;
  let i = n.resolve(e), o = n.resolve(t);
  return $o(i, o, r) ? new ke(e, t, r) : new Fa(i, o, r).fit();
}
function $o(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class Fa {
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.unplaced = r, this.frontier = [], this.placed = A.empty;
    for (let i = 0; i <= e.depth; i++) {
      let o = e.node(i);
      this.frontier.push({
        type: o.type,
        match: o.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = A.from(e.node(i).copy(this.placed));
  }
  get depth() {
    return this.frontier.length - 1;
  }
  fit() {
    for (; this.unplaced.size; ) {
      let c = this.findFittable();
      c ? this.placeNodes(c) : this.openMore() || this.dropNode();
    }
    let e = this.mustMoveInline(), t = this.placed.size - this.depth - this.$from.depth, r = this.$from, i = this.close(e < 0 ? this.$to : r.doc.resolve(e));
    if (!i)
      return null;
    let o = this.placed, s = r.depth, l = i.depth;
    for (; s && l && o.childCount == 1; )
      o = o.firstChild.content, s--, l--;
    let a = new W(o, s, l);
    return e > -1 ? new Re(r.pos, e, this.$to.pos, this.$to.end(), a, t) : a.size || r.pos != this.$to.pos ? new ke(r.pos, i.pos, a) : null;
  }
  // Find a position on the start spine of `this.unplaced` that has
  // content that can be moved somewhere on the frontier. Returns two
  // depths, one for the slice and one for the frontier.
  findFittable() {
    let e = this.unplaced.openStart;
    for (let t = this.unplaced.content, r = 0, i = this.unplaced.openEnd; r < e; r++) {
      let o = t.firstChild;
      if (t.childCount > 1 && (i = 0), o.type.spec.isolating && i <= r) {
        e = r;
        break;
      }
      t = o.content;
    }
    for (let t = 1; t <= 2; t++)
      for (let r = t == 1 ? e : this.unplaced.openStart; r >= 0; r--) {
        let i, o = null;
        r ? (o = tr(this.unplaced.content, r - 1).firstChild, i = o.content) : i = this.unplaced.content;
        let s = i.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: a, match: c } = this.frontier[l], u, f = null;
          if (t == 1 && (s ? c.matchType(s.type) || (f = c.fillBefore(A.from(s), !1)) : o && a.compatibleContent(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, inject: f };
          if (t == 2 && s && (u = c.findWrapping(s.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, wrap: u };
          if (o && c.matchType(o.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = tr(e, t);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new W(e, t + 1, Math.max(r, i.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = tr(e, t);
    if (i.childCount <= 1 && t > 0) {
      let o = e.size - t <= t + i.size;
      this.unplaced = new W(Jt(e, t - 1, 1), t - 1, o ? t - 1 : r);
    } else
      this.unplaced = new W(Jt(e, t, 1), t, r);
  }
  // Move content from the unplaced slice at `sliceDepth` to the
  // frontier node at `frontierDepth`. Close that frontier node when
  // applicable.
  placeNodes({ sliceDepth: e, frontierDepth: t, parent: r, inject: i, wrap: o }) {
    for (; this.depth > t; )
      this.closeFrontierNode();
    if (o)
      for (let g = 0; g < o.length; g++)
        this.openFrontierNode(o[g]);
    let s = this.unplaced, l = r ? r.content : s.content, a = s.openStart - e, c = 0, u = [], { match: f, type: d } = this.frontier[t];
    if (i) {
      for (let g = 0; g < i.childCount; g++)
        u.push(i.child(g));
      f = f.matchFragment(i);
    }
    let h = l.size + e - (s.content.size - s.openEnd);
    for (; c < l.childCount; ) {
      let g = l.child(c), y = f.matchType(g.type);
      if (!y)
        break;
      c++, (c > 1 || a == 0 || g.content.size) && (f = y, u.push(Do(g.mark(d.allowedMarks(g.marks)), c == 1 ? a : 0, c == l.childCount ? h : -1)));
    }
    let p = c == l.childCount;
    p || (h = -1), this.placed = qt(this.placed, t, A.from(u)), this.frontier[t].match = f, p && h < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let g = 0, y = l; g < h; g++) {
      let x = y.lastChild;
      this.frontier.push({ type: x.type, match: x.contentMatchAt(x.childCount) }), y = x.content;
    }
    this.unplaced = p ? e == 0 ? W.empty : new W(Jt(s.content, e - 1, 1), e - 1, h < 0 ? s.openEnd : e - 1) : new W(Jt(s.content, e, c), s.openStart, s.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !nr(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
      let { match: r, type: i } = this.frontier[t], o = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), s = nr(e, t, i, r, o);
      if (s) {
        for (let l = t - 1; l >= 0; l--) {
          let { match: a, type: c } = this.frontier[l], u = nr(e, l, c, a, !0);
          if (!u || u.childCount)
            continue e;
        }
        return { depth: t, fit: s, move: o ? e.doc.resolve(e.after(t + 1)) : e };
      }
    }
  }
  close(e) {
    let t = this.findCloseLevel(e);
    if (!t)
      return null;
    for (; this.depth > t.depth; )
      this.closeFrontierNode();
    t.fit.childCount && (this.placed = qt(this.placed, t.depth, t.fit)), e = t.move;
    for (let r = t.depth + 1; r <= e.depth; r++) {
      let i = e.node(r), o = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, o);
    }
    return e;
  }
  openFrontierNode(e, t = null, r) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = qt(this.placed, this.depth, A.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(A.empty, !0);
    t.childCount && (this.placed = qt(this.placed, this.frontier.length, t));
  }
}
function Jt(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(Jt(n.firstChild.content, e - 1, t)));
}
function qt(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(qt(n.lastChild.content, e - 1, t)));
}
function tr(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function Do(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, Do(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(A.empty, !0)))), n.copy(r);
}
function nr(n, e, t, r, i) {
  let o = n.node(e), s = i ? n.indexAfter(e) : n.index(e);
  if (s == o.childCount && !t.compatibleContent(o.type))
    return null;
  let l = r.fillBefore(o.content, !0, s);
  return l && !Ha(t, o.content, s) ? l : null;
}
function Ha(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function _a(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function Wa(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let i = n.doc.resolve(e), o = n.doc.resolve(t);
  if ($o(i, o, r))
    return n.step(new ke(e, t, r));
  let s = Lo(i, o);
  s[s.length - 1] == 0 && s.pop();
  let l = -(i.depth + 1);
  s.unshift(l);
  for (let d = i.depth, h = i.pos - 1; d > 0; d--, h--) {
    let p = i.node(d).type.spec;
    if (p.defining || p.definingAsContext || p.isolating)
      break;
    s.indexOf(d) > -1 ? l = d : i.before(d) == h && s.splice(1, 0, -d);
  }
  let a = s.indexOf(l), c = [], u = r.openStart;
  for (let d = r.content, h = 0; ; h++) {
    let p = d.firstChild;
    if (c.push(p), h == r.openStart)
      break;
    d = p.content;
  }
  for (let d = u - 1; d >= 0; d--) {
    let h = c[d], p = _a(h.type);
    if (p && !h.sameMarkup(i.node(Math.abs(l) - 1)))
      u = d;
    else if (p || !h.type.isTextblock)
      break;
  }
  for (let d = r.openStart; d >= 0; d--) {
    let h = (d + u + 1) % (r.openStart + 1), p = c[h];
    if (p)
      for (let g = 0; g < s.length; g++) {
        let y = s[(g + a) % s.length], x = !0;
        y < 0 && (x = !1, y = -y);
        let C = i.node(y - 1), w = i.index(y - 1);
        if (C.canReplaceWith(w, w, p.type, p.marks))
          return n.replace(i.before(y), x ? o.after(y) : t, new W(Po(r.content, 0, r.openStart, h), h, r.openEnd));
      }
  }
  let f = n.steps.length;
  for (let d = s.length - 1; d >= 0 && (n.replace(e, t, r), !(n.steps.length > f)); d--) {
    let h = s[d];
    h < 0 || (e = i.before(h), t = o.after(h));
  }
}
function Po(n, e, t, r, i) {
  if (e < t) {
    let o = n.firstChild;
    n = n.replaceChild(0, o.copy(Po(o.content, e + 1, t, r, o)));
  }
  if (e > r) {
    let o = i.contentMatchAt(0), s = o.fillBefore(n).append(n);
    n = s.append(o.matchFragment(s).fillBefore(A.empty, !0));
  }
  return n;
}
function ja(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = Ba(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new W(A.from(r), 0, 0));
}
function Ja(n, e, t) {
  let r = n.doc.resolve(e), i = n.doc.resolve(t);
  if (r.parent.isTextblock && i.parent.isTextblock && r.start() != i.start() && r.parentOffset == 0 && i.parentOffset == 0) {
    let s = r.sharedDepth(t), l = !1;
    for (let a = r.depth; a > s; a--)
      r.node(a).type.spec.isolating && (l = !0);
    for (let a = i.depth; a > s; a--)
      i.node(a).type.spec.isolating && (l = !0);
    if (!l) {
      for (let a = r.depth; a > 0 && e == r.start(a); a--)
        e = r.before(a);
      for (let a = i.depth; a > 0 && t == i.start(a); a--)
        t = i.before(a);
      r = n.doc.resolve(e), i = n.doc.resolve(t);
    }
  }
  let o = Lo(r, i);
  for (let s = 0; s < o.length; s++) {
    let l = o[s], a = s == o.length - 1;
    if (a && l == 0 || r.node(l).type.contentMatch.validEnd)
      return n.delete(r.start(l), i.end(l));
    if (l > 0 && (a || r.node(l - 1).canReplace(r.index(l - 1), i.indexAfter(l - 1))))
      return n.delete(r.before(l), i.after(l));
  }
  for (let s = 1; s <= r.depth && s <= i.depth; s++)
    if (e - r.start(s) == r.depth - s && t > r.end(s) && i.end(s) - t != i.depth - s && r.start(s - 1) == i.start(s - 1) && r.node(s - 1).canReplace(r.index(s - 1), i.index(s - 1)))
      return n.delete(r.before(s), t);
  n.delete(e, t);
}
function Lo(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let o = n.start(i);
    if (o < n.pos - (n.depth - i) || e.end(i) > e.pos + (e.depth - i) || n.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (o == e.start(i) || i == n.depth && i == e.depth && n.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == o - 1) && t.push(i);
  }
  return t;
}
class $t extends $e {
  /**
  Construct an attribute step.
  */
  constructor(e, t, r) {
    super(), this.pos = e, this.attr = t, this.value = r;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return Se.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let o in t.attrs)
      r[o] = t.attrs[o];
    r[this.attr] = this.value;
    let i = t.type.create(r, null, t.marks);
    return Se.fromReplace(e, this.pos, this.pos + 1, new W(A.from(i), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return Be.empty;
  }
  invert(e) {
    return new $t(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new $t(t.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number" || typeof t.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new $t(t.pos, t.attr, t.value);
  }
}
$e.jsonID("attr", $t);
class Zt extends $e {
  /**
  Construct an attribute step.
  */
  constructor(e, t) {
    super(), this.attr = e, this.value = t;
  }
  apply(e) {
    let t = /* @__PURE__ */ Object.create(null);
    for (let i in e.attrs)
      t[i] = e.attrs[i];
    t[this.attr] = this.value;
    let r = e.type.create(t, e.content, e.marks);
    return Se.ok(r);
  }
  getMap() {
    return Be.empty;
  }
  invert(e) {
    return new Zt(this.attr, e.attrs[this.attr]);
  }
  map(e) {
    return this;
  }
  toJSON() {
    return { stepType: "docAttr", attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.attr != "string")
      throw new RangeError("Invalid input for DocAttrStep.fromJSON");
    return new Zt(t.attr, t.value);
  }
}
$e.jsonID("docAttr", Zt);
let Lt = class extends Error {
};
Lt = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
Lt.prototype = Object.create(Error.prototype);
Lt.prototype.constructor = Lt;
Lt.prototype.name = "TransformError";
class qa {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new $n();
  }
  /**
  The starting document.
  */
  get before() {
    return this.docs.length ? this.docs[0] : this.doc;
  }
  /**
  Apply a new step in this transform, saving the result. Throws an
  error when the step fails.
  */
  step(e) {
    let t = this.maybeStep(e);
    if (t.failed)
      throw new Lt(t.failed);
    return this;
  }
  /**
  Try to apply a step in this transformation, ignoring it if it
  fails. Returns the step result.
  */
  maybeStep(e) {
    let t = e.apply(this.doc);
    return t.failed || this.addStep(e, t.doc), t;
  }
  /**
  True when the document has been changed (when there are any
  steps).
  */
  get docChanged() {
    return this.steps.length > 0;
  }
  /**
  Return a single range, in post-transform document positions,
  that covers all content changed by this transform. Returns null
  if no replacements are made. Note that this will ignore changes
  that add/remove marks without replacing the underlying content.
  */
  changedRange() {
    let e = 1e9, t = -1e9;
    for (let r = 0; r < this.mapping.maps.length; r++) {
      let i = this.mapping.maps[r];
      r && (e = i.map(e, 1), t = i.map(t, -1)), i.forEach((o, s, l, a) => {
        e = Math.min(e, l), t = Math.max(t, a);
      });
    }
    return e == 1e9 ? null : { from: e, to: t };
  }
  /**
  @internal
  */
  addStep(e, t) {
    this.docs.push(this.doc), this.steps.push(e), this.mapping.appendMap(e.getMap()), this.doc = t;
  }
  /**
  Replace the part of the document between `from` and `to` with the
  given `slice`.
  */
  replace(e, t = e, r = W.empty) {
    let i = Jn(this.doc, e, t, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, r) {
    return this.replace(e, t, new W(A.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, t) {
    return this.replace(e, t, W.empty);
  }
  /**
  Insert the given content at the given position.
  */
  insert(e, t) {
    return this.replaceWith(e, e, t);
  }
  /**
  Replace a range of the document with a given slice, using
  `from`, `to`, and the slice's
  [`openStart`](https://prosemirror.net/docs/ref/#model.Slice.openStart) property as hints, rather
  than fixed start and end points. This method may grow the
  replaced area or close open nodes in the slice in order to get a
  fit that is more in line with WYSIWYG expectations, by dropping
  fully covered parent nodes of the replaced region when they are
  marked [non-defining as
  context](https://prosemirror.net/docs/ref/#model.NodeSpec.definingAsContext), or including an
  open parent node from the slice that _is_ marked as [defining
  its content](https://prosemirror.net/docs/ref/#model.NodeSpec.definingForContent).
  
  This is the method, for example, to handle paste. The similar
  [`replace`](https://prosemirror.net/docs/ref/#transform.Transform.replace) method is a more
  primitive tool which will _not_ move the start and end of its given
  range, and is useful in situations where you need more precise
  control over what happens.
  */
  replaceRange(e, t, r) {
    return Wa(this, e, t, r), this;
  }
  /**
  Replace the given range with a node, but use `from` and `to` as
  hints, rather than precise positions. When from and to are the same
  and are at the start or end of a parent node in which the given
  node doesn't fit, this method may _move_ them out towards a parent
  that does allow the given node to be placed. When the given range
  completely covers a parent node, this method may completely replace
  that parent node.
  */
  replaceRangeWith(e, t, r) {
    return ja(this, e, t, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return Ja(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return Ma(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return La(this, e, t), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, t) {
    return Ia(this, e, t), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, t = e, r, i = null) {
    return za(this, e, t, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, r = null, i) {
    return $a(this, e, t, r, i), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  The `pos` addresses the document content. Use `setDocAttribute`
  to set attributes on the document itself.
  */
  setNodeAttribute(e, t, r) {
    return this.step(new $t(e, t, r)), this;
  }
  /**
  Set a single attribute on the document to a new value.
  */
  setDocAttribute(e, t) {
    return this.step(new Zt(e, t)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(e, t) {
    return this.step(new lt(e, t)), this;
  }
  /**
  Remove a mark (or all marks of the given type) from the node at
  position `pos`.
  */
  removeNodeMark(e, t) {
    let r = this.doc.nodeAt(e);
    if (!r)
      throw new RangeError("No node at position " + e);
    if (t instanceof pe)
      t.isInSet(r.marks) && this.step(new yt(e, t));
    else {
      let i = r.marks, o, s = [];
      for (; o = t.isInSet(i); )
        s.push(new yt(e, o)), i = o.removeFromSet(i);
      for (let l = s.length - 1; l >= 0; l--)
        this.step(s[l]);
    }
    return this;
  }
  /**
  Split the node at the given position, and optionally, if `depth` is
  greater than one, any number of nodes above that. By default, the
  parts split off will inherit the node type of the original node.
  This can be changed by passing an array of types and attributes to
  use after the split (with the outermost nodes coming first).
  */
  split(e, t = 1, r) {
    return Da(this, e, t, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, r) {
    return Ea(this, e, t, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, r) {
    return Ca(this, e, t, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, t, r) {
    return Or(this, e, t, r), this;
  }
}
const rr = /* @__PURE__ */ Object.create(null);
class ge {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, r) {
    this.$anchor = e, this.$head = t, this.ranges = r || [new Va(e.min(t), e.max(t))];
  }
  /**
  The selection's anchor, as an unresolved position.
  */
  get anchor() {
    return this.$anchor.pos;
  }
  /**
  The selection's head.
  */
  get head() {
    return this.$head.pos;
  }
  /**
  The lower bound of the selection's main range.
  */
  get from() {
    return this.$from.pos;
  }
  /**
  The upper bound of the selection's main range.
  */
  get to() {
    return this.$to.pos;
  }
  /**
  The resolved lower  bound of the selection's main range.
  */
  get $from() {
    return this.ranges[0].$from;
  }
  /**
  The resolved upper bound of the selection's main range.
  */
  get $to() {
    return this.ranges[0].$to;
  }
  /**
  Indicates whether the selection contains any content.
  */
  get empty() {
    let e = this.ranges;
    for (let t = 0; t < e.length; t++)
      if (e[t].$from.pos != e[t].$to.pos)
        return !1;
    return !0;
  }
  /**
  Get the content of this selection as a slice.
  */
  content() {
    return this.$from.doc.slice(this.from, this.to, !0);
  }
  /**
  Replace the selection with a slice or, if no slice is given,
  delete the selection. Will append to the given transaction.
  */
  replace(e, t = W.empty) {
    let r = t.content.lastChild, i = null;
    for (let l = 0; l < t.openEnd; l++)
      i = r, r = r.lastChild;
    let o = e.steps.length, s = this.ranges;
    for (let l = 0; l < s.length; l++) {
      let { $from: a, $to: c } = s[l], u = e.mapping.slice(o);
      e.replaceRange(u.map(a.pos), u.map(c.pos), l ? W.empty : t), l == 0 && vi(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
    }
  }
  /**
  Replace the selection with the given node, appending the changes
  to the given transaction.
  */
  replaceWith(e, t) {
    let r = e.steps.length, i = this.ranges;
    for (let o = 0; o < i.length; o++) {
      let { $from: s, $to: l } = i[o], a = e.mapping.slice(r), c = a.map(s.pos), u = a.map(l.pos);
      o ? e.deleteRange(c, u) : (e.replaceRangeWith(c, u, t), vi(e, r, t.isInline ? -1 : 1));
    }
  }
  /**
  Find a valid cursor or leaf node selection starting at the given
  position and searching back if `dir` is negative, and forward if
  positive. When `textOnly` is true, only consider cursor
  selections. Will return null when no valid selection position is
  found.
  */
  static findFrom(e, t, r = !1) {
    let i = e.parent.inlineContent ? new Pe(e) : At(e.node(0), e.parent, e.pos, e.index(), t, r);
    if (i)
      return i;
    for (let o = e.depth - 1; o >= 0; o--) {
      let s = t < 0 ? At(e.node(0), e.node(o), e.before(o + 1), e.index(o), t, r) : At(e.node(0), e.node(o), e.after(o + 1), e.index(o) + 1, t, r);
      if (s)
        return s;
    }
    return null;
  }
  /**
  Find a valid cursor or leaf node selection near the given
  position. Searches forward first by default, but if `bias` is
  negative, it will search backwards first.
  */
  static near(e, t = 1) {
    return this.findFrom(e, t) || this.findFrom(e, -t) || new Ke(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return At(e, e, 0, 0, 1) || new Ke(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return At(e, e, e.content.size, e.childCount, -1) || new Ke(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = rr[t.type];
    if (!r)
      throw new RangeError(`No selection type ${t.type} defined`);
    return r.fromJSON(e, t);
  }
  /**
  To be able to deserialize selections from JSON, custom selection
  classes must register themselves with an ID string, so that they
  can be disambiguated. Try to pick something that's unlikely to
  clash with classes from other modules.
  */
  static jsonID(e, t) {
    if (e in rr)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return rr[e] = t, t.prototype.jsonID = e, t;
  }
  /**
  Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
  which is a value that can be mapped without having access to a
  current document, and later resolved to a real selection for a
  given document again. (This is used mostly by the history to
  track and restore old selections.) The default implementation of
  this method just converts the selection to a text selection and
  returns the bookmark for that.
  */
  getBookmark() {
    return Pe.between(this.$anchor, this.$head).getBookmark();
  }
}
ge.prototype.visible = !0;
class Va {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let xi = !1;
function bi(n) {
  !xi && !n.parent.inlineContent && (xi = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class Pe extends ge {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    bi(e), bi(t), super(e, t);
  }
  /**
  Returns a resolved position if this is a cursor selection (an
  empty text selection), and null otherwise.
  */
  get $cursor() {
    return this.$anchor.pos == this.$head.pos ? this.$head : null;
  }
  map(e, t) {
    let r = e.resolve(t.map(this.head));
    if (!r.parent.inlineContent)
      return ge.near(r);
    let i = e.resolve(t.map(this.anchor));
    return new Pe(i.parent.inlineContent ? i : r, r);
  }
  replace(e, t = W.empty) {
    if (super.replace(e, t), t == W.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof Pe && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new qn(this.anchor, this.head);
  }
  toJSON() {
    return { type: "text", anchor: this.anchor, head: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number" || typeof t.head != "number")
      throw new RangeError("Invalid input for TextSelection.fromJSON");
    return new Pe(e.resolve(t.anchor), e.resolve(t.head));
  }
  /**
  Create a text selection from non-resolved positions.
  */
  static create(e, t, r = t) {
    let i = e.resolve(t);
    return new this(i, r == t ? i : e.resolve(r));
  }
  /**
  Return a text selection that spans the given positions or, if
  they aren't text positions, find a text selection near them.
  `bias` determines whether the method searches forward (default)
  or backwards (negative number) first. Will fall back to calling
  [`Selection.near`](https://prosemirror.net/docs/ref/#state.Selection^near) when the document
  doesn't contain a valid text position.
  */
  static between(e, t, r) {
    let i = e.pos - t.pos;
    if ((!r || i) && (r = i >= 0 ? 1 : -1), !t.parent.inlineContent) {
      let o = ge.findFrom(t, r, !0) || ge.findFrom(t, -r, !0);
      if (o)
        t = o.$head;
      else
        return ge.near(t, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = t : (e = (ge.findFrom(e, -r, !0) || ge.findFrom(e, r, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new Pe(e, t);
  }
}
ge.jsonID("text", Pe);
class qn {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new qn(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return Pe.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class me extends ge {
  /**
  Create a node selection. Does not verify the validity of its
  argument.
  */
  constructor(e) {
    let t = e.nodeAfter, r = e.node(0).resolve(e.pos + t.nodeSize);
    super(e, r), this.node = t;
  }
  map(e, t) {
    let { deleted: r, pos: i } = t.mapResult(this.anchor), o = e.resolve(i);
    return r ? ge.near(o) : new me(o);
  }
  content() {
    return new W(A.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof me && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new $r(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new me(e.resolve(t.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, t) {
    return new me(e.resolve(t));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
me.prototype.visible = !1;
ge.jsonID("node", me);
class $r {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new qn(r, r) : new $r(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && me.isSelectable(r) ? new me(t) : ge.near(t);
  }
}
class Ke extends ge {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = W.empty) {
    if (t == W.empty) {
      e.delete(0, e.doc.content.size);
      let r = ge.atStart(e.doc);
      r.eq(e.selection) || e.setSelection(r);
    } else
      super.replace(e, t);
  }
  toJSON() {
    return { type: "all" };
  }
  /**
  @internal
  */
  static fromJSON(e) {
    return new Ke(e);
  }
  map(e) {
    return new Ke(e);
  }
  eq(e) {
    return e instanceof Ke;
  }
  getBookmark() {
    return Ka;
  }
}
ge.jsonID("all", Ke);
const Ka = {
  map() {
    return this;
  },
  resolve(n) {
    return new Ke(n);
  }
};
function At(n, e, t, r, i, o = !1) {
  if (e.inlineContent)
    return Pe.create(n, t);
  for (let s = r - (i > 0 ? 0 : 1); i > 0 ? s < e.childCount : s >= 0; s += i) {
    let l = e.child(s);
    if (l.isAtom) {
      if (!o && me.isSelectable(l))
        return me.create(n, t - (i < 0 ? l.nodeSize : 0));
    } else {
      let a = At(n, l, t + i, i < 0 ? l.childCount : 0, i, o);
      if (a)
        return a;
    }
    t += l.nodeSize * i;
  }
  return null;
}
function vi(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e)
    return;
  let i = n.steps[r];
  if (!(i instanceof ke || i instanceof Re))
    return;
  let o = n.mapping.maps[r], s;
  o.forEach((l, a, c, u) => {
    s == null && (s = u);
  }), n.setSelection(ge.near(n.doc.resolve(s), t));
}
function wi(n, e) {
  return !e || !n ? n : n.bind(e);
}
class xn {
  constructor(e, t, r) {
    this.name = e, this.init = wi(t.init, r), this.apply = wi(t.apply, r);
  }
}
new xn("doc", {
  init(n) {
    return n.doc || n.schema.topNodeType.createAndFill();
  },
  apply(n) {
    return n.doc;
  }
}), new xn("selection", {
  init(n, e) {
    return n.selection || ge.atStart(e.doc);
  },
  apply(n) {
    return n.selection;
  }
}), new xn("storedMarks", {
  init(n) {
    return n.storedMarks || null;
  },
  apply(n, e, t, r) {
    return r.selection.$cursor ? n.storedMarks : null;
  }
}), new xn("scrollToSelection", {
  init() {
    return 0;
  },
  apply(n, e) {
    return n.scrolledIntoView ? e + 1 : e;
  }
});
const Bo = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function Fo(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const Ho = (n, e, t) => {
  let r = Fo(n, t);
  if (!r)
    return !1;
  let i = Dr(r);
  if (!i) {
    let s = r.blockRange(), l = s && Ht(s);
    return l == null ? !1 : (e && e(n.tr.lift(s, l).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (Uo(n, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (Bt(o, "end") || me.isSelectable(o)))
    for (let s = r.depth; ; s--) {
      let l = Jn(n.doc, r.before(s), r.after(s), W.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let a = n.tr.step(l);
          a.setSelection(Bt(o, "end") ? ge.findFrom(a.doc.resolve(a.mapping.map(i.pos, -1)), -1) : me.create(a.doc, i.pos - o.nodeSize)), e(a.scrollIntoView());
        }
        return !0;
      }
      if (s == 1 || r.node(s - 1).childCount > 1)
        break;
    }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos - o.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, Ya = (n, e, t) => {
  let r = Fo(n, t);
  if (!r)
    return !1;
  let i = Dr(r);
  return i ? _o(n, i, e) : !1;
}, Ua = (n, e, t) => {
  let r = jo(n, t);
  if (!r)
    return !1;
  let i = Pr(r);
  return i ? _o(n, i, e) : !1;
};
function _o(n, e, t) {
  let r = e.nodeBefore, i = r, o = e.pos - 1;
  for (; !i.isTextblock; o--) {
    if (i.type.spec.isolating)
      return !1;
    let u = i.lastChild;
    if (!u)
      return !1;
    i = u;
  }
  let s = e.nodeAfter, l = s, a = e.pos + 1;
  for (; !l.isTextblock; a++) {
    if (l.type.spec.isolating)
      return !1;
    let u = l.firstChild;
    if (!u)
      return !1;
    l = u;
  }
  let c = Jn(n.doc, o, a, W.empty);
  if (!c || c.from != o || c instanceof ke && c.slice.size >= a - o)
    return !1;
  if (t) {
    let u = n.tr.step(c);
    u.setSelection(Pe.create(u.doc, o)), t(u.scrollIntoView());
  }
  return !0;
}
function Bt(n, e, t = !1) {
  for (let r = n; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (t && r.childCount != 1)
      return !1;
  }
  return !1;
}
const Wo = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    o = Dr(r);
  }
  let s = o && o.nodeBefore;
  return !s || !me.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(me.create(n.doc, o.pos - s.nodeSize)).scrollIntoView()), !0);
};
function Dr(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function jo(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const Jo = (n, e, t) => {
  let r = jo(n, t);
  if (!r)
    return !1;
  let i = Pr(r);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (Uo(n, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (Bt(o, "start") || me.isSelectable(o))) {
    let s = Jn(n.doc, r.before(), r.after(), W.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let l = n.tr.step(s);
        l.setSelection(Bt(o, "start") ? ge.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : me.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos, i.pos + o.nodeSize).scrollIntoView()), !0) : !1;
}, qo = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    o = Pr(r);
  }
  let s = o && o.nodeAfter;
  return !s || !me.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(me.create(n.doc, o.pos)).scrollIntoView()), !0);
};
function Pr(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      let t = n.node(e);
      if (n.index(e) + 1 < t.childCount)
        return n.doc.resolve(n.after(e + 1));
      if (t.type.spec.isolating)
        break;
    }
  return null;
}
const Xa = (n, e) => {
  let t = n.selection, r = t instanceof me, i;
  if (r) {
    if (t.node.isTextblock || !wt(n.doc, t.from))
      return !1;
    i = t.from;
  } else if (i = jn(n.doc, t.from, -1), i == null)
    return !1;
  if (e) {
    let o = n.tr.join(i);
    r && o.setSelection(me.create(o.doc, i - n.doc.resolve(i).nodeBefore.nodeSize)), e(o.scrollIntoView());
  }
  return !0;
}, Ga = (n, e) => {
  let t = n.selection, r;
  if (t instanceof me) {
    if (t.node.isTextblock || !wt(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = jn(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, Qa = (n, e) => {
  let { $from: t, $to: r } = n.selection, i = t.blockRange(r), o = i && Ht(i);
  return o == null ? !1 : (e && e(n.tr.lift(i, o).scrollIntoView()), !0);
}, Vo = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function Lr(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const Za = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(r))
    return !1;
  let i = t.node(-1), o = t.indexAfter(-1), s = Lr(i.contentMatchAt(o));
  if (!s || !i.canReplaceWith(o, o, s))
    return !1;
  if (e) {
    let l = t.after(), a = n.tr.replaceWith(l, l, s.createAndFill());
    a.setSelection(ge.near(a.doc.resolve(l), 1)), e(a.scrollIntoView());
  }
  return !0;
}, Ko = (n, e) => {
  let t = n.selection, { $from: r, $to: i } = t;
  if (t instanceof Ke || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = Lr(i.parent.contentMatchAt(i.indexAfter()));
  if (!o || !o.isTextblock)
    return !1;
  if (e) {
    let s = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = n.tr.insert(s, o.createAndFill());
    l.setSelection(Pe.create(l.doc, s + 1)), e(l.scrollIntoView());
  }
  return !0;
}, Yo = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let o = t.before();
    if (nt(n.doc, o))
      return e && e(n.tr.split(o).scrollIntoView()), !0;
  }
  let r = t.blockRange(), i = r && Ht(r);
  return i == null ? !1 : (e && e(n.tr.lift(r, i).scrollIntoView()), !0);
};
function ec(n) {
  return (e, t) => {
    if (e.selection instanceof me && e.selection.node.isBlock) {
      let { $from: h } = e.selection;
      return !h.parentOffset || !nt(e.doc, h.pos) ? !1 : (t && t(e.tr.split(h.pos).scrollIntoView()), !0);
    }
    if (!e.selection.$from.depth)
      return !1;
    let r = e.tr;
    !e.selection.empty && (e.selection instanceof Pe || e.selection instanceof Ke) && r.deleteSelection();
    let { $from: i } = r.selection, o = r.steps.length, s = [], l, a, c = !1, u = !1;
    for (let h = i.depth; ; h--)
      if (i.node(h).isBlock) {
        c = i.end(h) == i.pos + (i.depth - h), u = i.start(h) == i.pos - (i.depth - h), a = Lr(i.node(h - 1).contentMatchAt(i.indexAfter(h - 1))), s.unshift(c && a ? { type: a } : null), l = h;
        break;
      } else {
        if (h == 1)
          return !1;
        s.unshift(null);
      }
    let f = i.pos, d = nt(r.doc, f, s.length, s);
    if (d || (s[0] = a ? { type: a } : null, d = nt(r.doc, f, s.length, s)), !d)
      return !1;
    if (r.split(f, s.length, s), !c && u && i.node(l).type != a) {
      let h = r.mapping.slice(o), p = h.map(i.before(l)), g = r.doc.resolve(p);
      a && i.node(l - 1).canReplaceWith(g.index(), g.index() + 1, a) && r.setNodeMarkup(h.map(i.before(l)), a);
    }
    return t && t(r.scrollIntoView()), !0;
  };
}
const tc = ec(), nc = (n, e) => {
  let { $from: t, to: r } = n.selection, i, o = t.sharedDepth(r);
  return o == 0 ? !1 : (i = t.before(o), e && e(n.tr.setSelection(me.create(n.doc, i))), !0);
};
function rc(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(o - 1, o) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || wt(n.doc, e.pos)) ? !1 : (t && t(n.tr.join(e.pos).scrollIntoView()), !0);
}
function Uo(n, e, t, r) {
  let i = e.nodeBefore, o = e.nodeAfter, s, l, a = i.type.spec.isolating || o.type.spec.isolating;
  if (!a && rc(n, e, t))
    return !0;
  let c = !a && e.parent.canReplace(e.index(), e.index() + 1);
  if (c && (s = (l = i.contentMatchAt(i.childCount)).findWrapping(o.type)) && l.matchType(s[0] || o.type).validEnd) {
    if (t) {
      let h = e.pos + o.nodeSize, p = A.empty;
      for (let x = s.length - 1; x >= 0; x--)
        p = A.from(s[x].create(null, p));
      p = A.from(i.copy(p));
      let g = n.tr.step(new Re(e.pos - 1, h, e.pos, h, new W(p, 1, 0), s.length, !0)), y = g.doc.resolve(h + 2 * s.length);
      y.nodeAfter && y.nodeAfter.type == i.type && wt(g.doc, y.pos) && g.join(y.pos), t(g.scrollIntoView());
    }
    return !0;
  }
  let u = o.type.spec.isolating || r > 0 && a ? null : ge.findFrom(e, 1), f = u && u.$from.blockRange(u.$to), d = f && Ht(f);
  if (d != null && d >= e.depth)
    return t && t(n.tr.lift(f, d).scrollIntoView()), !0;
  if (c && Bt(o, "start", !0) && Bt(i, "end")) {
    let h = i, p = [];
    for (; p.push(h), !h.isTextblock; )
      h = h.lastChild;
    let g = o, y = 1;
    for (; !g.isTextblock; g = g.firstChild)
      y++;
    if (h.canReplace(h.childCount, h.childCount, g.content)) {
      if (t) {
        let x = A.empty;
        for (let w = p.length - 1; w >= 0; w--)
          x = A.from(p[w].copy(x));
        let C = n.tr.step(new Re(e.pos - p.length, e.pos + o.nodeSize, e.pos + y, e.pos + o.nodeSize - y, new W(x, p.length, 0), 0, !0));
        t(C.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function Xo(n) {
  return function(e, t) {
    let r = e.selection, i = n < 0 ? r.$from : r.$to, o = i.depth;
    for (; i.node(o).isInline; ) {
      if (!o)
        return !1;
      o--;
    }
    return i.node(o).isTextblock ? (t && t(e.tr.setSelection(Pe.create(e.doc, n < 0 ? i.start(o) : i.end(o)))), !0) : !1;
  };
}
const ic = Xo(-1), oc = Xo(1);
function sc(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o), l = s && Ro(s, n, e);
    return l ? (r && r(t.tr.wrap(s, l).scrollIntoView()), !0) : !1;
  };
}
function ki(n, e = null) {
  return function(t, r) {
    let i = !1;
    for (let o = 0; o < t.selection.ranges.length && !i; o++) {
      let { $from: { pos: s }, $to: { pos: l } } = t.selection.ranges[o];
      t.doc.nodesBetween(s, l, (a, c) => {
        if (i)
          return !1;
        if (!(!a.isTextblock || a.hasMarkup(n, e)))
          if (a.type == n)
            i = !0;
          else {
            let u = t.doc.resolve(c), f = u.index();
            i = u.parent.canReplaceWith(f, f + 1, n);
          }
      });
    }
    if (!i)
      return !1;
    if (r) {
      let o = t.tr;
      for (let s = 0; s < t.selection.ranges.length; s++) {
        let { $from: { pos: l }, $to: { pos: a } } = t.selection.ranges[s];
        o.setBlockType(l, a, n, e);
      }
      r(o.scrollIntoView());
    }
    return !0;
  };
}
function Br(...n) {
  return function(e, t, r) {
    for (let i = 0; i < n.length; i++)
      if (n[i](e, t, r))
        return !0;
    return !1;
  };
}
Br(Bo, Ho, Wo);
Br(Bo, Jo, qo);
Br(Vo, Ko, Yo, tc);
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function lc(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o);
    if (!s)
      return !1;
    let l = r ? t.tr : null;
    return ac(l, s, n, e) ? (r && r(l.scrollIntoView()), !0) : !1;
  };
}
function ac(n, e, t, r = null) {
  let i = !1, o = e, s = e.$from.doc;
  if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(t) && e.startIndex == 0) {
    if (e.$from.index(e.depth - 1) == 0)
      return !1;
    let a = s.resolve(e.start - 2);
    o = new In(a, a, e.depth), e.endIndex < e.parent.childCount && (e = new In(e.$from, s.resolve(e.$to.end(e.depth)), e.depth)), i = !0;
  }
  let l = Ro(o, t, r, e);
  return l ? (n && cc(n, e, l, i, t), !0) : !1;
}
function cc(n, e, t, r, i) {
  let o = A.empty;
  for (let u = t.length - 1; u >= 0; u--)
    o = A.from(t[u].type.create(t[u].attrs, o));
  n.step(new Re(e.start - (r ? 2 : 0), e.end, e.start, e.end, new W(o, 0, 0), t.length, !0));
  let s = 0;
  for (let u = 0; u < t.length; u++)
    t[u].type == i && (s = u + 1);
  let l = t.length - s, a = e.start + t.length - (r ? 2 : 0), c = e.parent;
  for (let u = e.startIndex, f = e.endIndex, d = !0; u < f; u++, d = !1)
    !d && nt(n.doc, a, l) && (n.split(a, l), a += 2 * l), a += c.child(u).nodeSize;
  return n;
}
function uc(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (s) => s.childCount > 0 && s.firstChild.type == n);
    return o ? t ? r.node(o.depth - 1).type == n ? dc(e, t, n, o) : fc(e, t, o) : !0 : !1;
  };
}
function dc(n, e, t, r) {
  let i = n.tr, o = r.end, s = r.$to.end(r.depth);
  o < s && (i.step(new Re(o - 1, s, o, s, new W(A.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new In(i.doc.resolve(r.$from.pos), i.doc.resolve(s), r.depth));
  const l = Ht(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let a = i.doc.resolve(i.mapping.map(o, -1) - 1);
  return wt(i.doc, a.pos) && a.nodeBefore.type == a.nodeAfter.type && i.join(a.pos), e(i.scrollIntoView()), !0;
}
function fc(n, e, t) {
  let r = n.tr, i = t.parent;
  for (let h = t.end, p = t.endIndex - 1, g = t.startIndex; p > g; p--)
    h -= i.child(p).nodeSize, r.delete(h - 1, h + 1);
  let o = r.doc.resolve(t.start), s = o.nodeAfter;
  if (r.mapping.map(t.end) != t.start + o.nodeAfter.nodeSize)
    return !1;
  let l = t.startIndex == 0, a = t.endIndex == i.childCount, c = o.node(-1), u = o.index(-1);
  if (!c.canReplace(u + (l ? 0 : 1), u + 1, s.content.append(a ? A.empty : A.from(i))))
    return !1;
  let f = o.pos, d = f + s.nodeSize;
  return r.step(new Re(f - (l ? 1 : 0), d + (a ? 1 : 0), f + 1, d - 1, new W((l ? A.empty : A.from(i.copy(A.empty))).append(a ? A.empty : A.from(i.copy(A.empty))), l ? 0 : 1, a ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function hc(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (c) => c.childCount > 0 && c.firstChild.type == n);
    if (!o)
      return !1;
    let s = o.startIndex;
    if (s == 0)
      return !1;
    let l = o.parent, a = l.child(s - 1);
    if (a.type != n)
      return !1;
    if (t) {
      let c = a.lastChild && a.lastChild.type == l.type, u = A.from(c ? n.create() : null), f = new W(A.from(n.create(null, A.from(l.type.create(null, u)))), c ? 3 : 1, 0), d = o.start, h = o.end;
      t(e.tr.step(new Re(d - (c ? 3 : 1), h, d, h, f, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function Go(n) {
  const { state: e, transaction: t } = n;
  let { selection: r } = t, { doc: i } = t, { storedMarks: o } = t;
  return {
    ...e,
    apply: e.apply.bind(e),
    applyTransaction: e.applyTransaction.bind(e),
    plugins: e.plugins,
    schema: e.schema,
    reconfigure: e.reconfigure.bind(e),
    toJSON: e.toJSON.bind(e),
    get storedMarks() {
      return o;
    },
    get selection() {
      return r;
    },
    get doc() {
      return i;
    },
    get tr() {
      return r = t.selection, i = t.doc, o = t.storedMarks, t;
    }
  };
}
var pc = class Qo {
  constructor(e) {
    this.editor = e.editor, this.rawCommands = this.editor.extensionManager.commands, this.customState = e.state;
  }
  get hasCustomState() {
    return !!this.customState;
  }
  get state() {
    return this.customState || this.editor.state;
  }
  get commands() {
    const { rawCommands: e, editor: t, state: r } = this, { view: i } = t, { tr: o } = r, s = this.buildProps(o);
    return Object.fromEntries(Object.entries(e).map(([l, a]) => [l, (...u) => {
      const f = a(...u)(s);
      return !o.getMeta("preventDispatch") && !this.hasCustomState && i.dispatch(o), f;
    }]));
  }
  get chain() {
    return () => this.createChain();
  }
  get can() {
    return () => this.createCan();
  }
  createChain(e, t = !0) {
    const { rawCommands: r, editor: i, state: o } = this, { view: s } = i, l = [], a = !!e, c = e || o.tr, u = () => (!a && t && !c.getMeta("preventDispatch") && !this.hasCustomState && s.dispatch(c), l.every((d) => d === !0)), f = {
      ...Object.fromEntries(Object.entries(r).map(([d, h]) => [d, (...g) => {
        const y = this.buildProps(c, t), x = h(...g)(y);
        return l.push(x), f;
      }])),
      run: u
    };
    return f;
  }
  /**
  * Creates a chain that safely returns `false` when run.
  * @returns A non-dispatching command chain.
  * @example
  * const chain = CommandManager.createFakeChain()
  * chain.focus().run() // false
  */
  static createFakeChain() {
    const e = new Proxy({}, { get: (t, r) => {
      if (r !== "then")
        return r === "run" ? () => !1 : () => e;
    } });
    return e;
  }
  createCan(e) {
    const { rawCommands: t, state: r } = this, i = !1, o = e || r.tr, s = this.buildProps(o, i);
    return {
      ...Object.fromEntries(Object.entries(t).map(([l, a]) => [l, (...c) => a(...c)({
        ...s,
        dispatch: void 0
      })])),
      chain: () => this.createChain(o, i)
    };
  }
  /**
  * Creates capability checks that safely return `false`.
  * @returns A non-dispatching capability checker.
  * @example
  * const can = CommandManager.createFallbackCan()
  * can.focus() // false
  */
  static createFallbackCan() {
    const e = Qo.createFakeChain();
    return new Proxy({ chain: () => e }, { get: (t, r) => {
      if (r !== "then")
        return r === "chain" ? t.chain : () => !1;
    } });
  }
  buildProps(e, t = !0) {
    const { rawCommands: r, editor: i, state: o } = this, { view: s } = i, l = {
      tr: e,
      editor: i,
      view: s,
      state: Go({
        state: o,
        transaction: e
      }),
      dispatch: t ? () => {
      } : void 0,
      chain: () => this.createChain(e, t),
      can: () => this.createCan(e),
      get commands() {
        return Object.fromEntries(Object.entries(r).map(([a, c]) => [a, (...u) => c(...u)(l)]));
      }
    };
    return l;
  }
};
const mc = () => ({ editor: n, view: e }) => (requestAnimationFrame(() => {
  if (!n.isDestroyed) {
    var t;
    e.dom.blur(), (t = window) === null || t === void 0 || (t = t.getSelection()) === null || t === void 0 || t.removeAllRanges();
  }
}), !0), gc = (n = !0) => ({ commands: e }) => e.setContent("", { emitUpdate: n }), yc = () => ({ state: n, tr: e, dispatch: t }) => {
  const { selection: r } = e, { ranges: i } = r;
  return t && i.forEach(({ $from: o, $to: s }) => {
    n.doc.nodesBetween(o.pos, s.pos, (l, a) => {
      if (l.type.isText) return;
      const { doc: c, mapping: u } = e, f = c.resolve(u.map(a)), d = c.resolve(u.map(a + l.nodeSize)), h = f.blockRange(d);
      if (!h) return;
      const p = Ht(h);
      if (l.type.isTextblock) {
        const { defaultType: g } = f.parent.contentMatchAt(f.index());
        e.setNodeMarkup(h.start, g);
      }
      (p || p === 0) && e.lift(h, p);
    });
  }), !0;
}, xc = (n) => (e) => n(e), bc = () => ({ state: n, dispatch: e }) => Ko(n, e), vc = (n, e) => ({ editor: t, tr: r }) => {
  const { state: i } = t, o = i.doc.slice(n.from, n.to);
  r.deleteRange(n.from, n.to);
  const s = r.mapping.map(e);
  return r.insert(s, o.content), r.setSelection(new _e(r.doc.resolve(Math.max(s - 1, 0)))), !0;
}, wc = () => ({ tr: n, dispatch: e }) => {
  const { selection: t } = n, r = t.$anchor.node();
  if (r.content.size > 0) return !1;
  const i = n.selection.$anchor;
  for (let o = i.depth; o > 0; o -= 1) if (i.node(o).type === r.type) {
    if (e) {
      const s = i.before(o), l = i.after(o);
      n.delete(s, l).scrollIntoView();
    }
    return !0;
  }
  return !1;
};
function Oe(n, e) {
  if (typeof n == "string") {
    if (!e.nodes[n]) throw Error(`There is no node type named '${n}'. Maybe you forgot to add the extension?`);
    return e.nodes[n];
  }
  return n;
}
const kc = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const i = Oe(n, t.schema), o = e.selection.$anchor;
  for (let s = o.depth; s > 0; s -= 1) if (o.node(s).type === i) {
    if (r) {
      const l = o.before(s), a = o.after(s);
      e.delete(l, a).scrollIntoView();
    }
    return !0;
  }
  return !1;
}, Sc = (n) => ({ tr: e, dispatch: t }) => {
  const { from: r, to: i } = n;
  return t && e.delete(r, i), !0;
}, Tc = (n) => n.content ? /^text(\*|\+)/.test(n.content) : !1, Si = (n, e, t) => {
  if (!n.parent.isInline || t === "left" && n.pos > n.start() || t === "right" && n.pos < n.end()) return n.pos;
  const r = e.nodes[n.parent.type.name].spec;
  return Tc(r) ? t === "left" ? n.start() - 1 : n.end() + 1 : n.pos;
}, Ec = (n, e, t) => ({
  from: Si(n, t, "left"),
  to: Si(e, t, "right")
}), Cc = () => ({ state: n, dispatch: e }) => {
  if (n.selection.empty) return !1;
  if (e) {
    const t = n.tr, { ranges: r } = n.selection, i = t.steps.length;
    r.forEach((o) => {
      const s = t.mapping.slice(i), l = t.doc.resolve(s.map(o.$from.pos)), a = t.doc.resolve(s.map(o.$to.pos)), { from: c, to: u } = Ec(l, a, n.schema);
      t.deleteRange(c, u);
    }), t.selection.empty || t.setSelection(_e.near(t.doc.resolve(t.selection.from))), t.scrollIntoView(), e(t);
  }
  return !0;
}, Nc = () => ({ commands: n }) => n.keyboardShortcut("Enter"), Mc = () => ({ state: n, dispatch: e }) => Za(n, e);
function Ac(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
function Dn(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => t.strict ? e[i] === n[i] : Ac(e[i]) ? e[i].test(n[i]) : e[i] === n[i]) : !0;
}
function Zo(n, e, t = {}) {
  return n.find((r) => r.type === e && Dn(Object.fromEntries(Object.keys(t).map((i) => [i, r.attrs[i]])), t));
}
function Ti(n, e, t = {}) {
  return !!Zo(n, e, t);
}
function es(n, e, t) {
  if (!n || !e) return;
  let r = n.parent.childAfter(n.parentOffset);
  if ((!r.node || !r.node.marks.some((a) => a.type === e)) && (r = n.parent.childBefore(n.parentOffset)), !r.node || !r.node.marks.some((a) => a.type === e)) return;
  if (!t) {
    const a = r.node.marks.find((c) => c.type === e);
    a && (t = a.attrs);
  }
  if (!Zo([...r.node.marks], e, t)) return;
  let i = r.index, o = n.start() + r.offset, s = i + 1, l = o + r.node.nodeSize;
  for (; i > 0 && Ti([...n.parent.child(i - 1).marks], e, t); )
    i -= 1, o -= n.parent.child(i).nodeSize;
  for (; s < n.parent.childCount && Ti([...n.parent.child(s).marks], e, t); )
    l += n.parent.child(s).nodeSize, s += 1;
  return {
    from: o,
    to: l
  };
}
function ct(n, e) {
  if (typeof n == "string") {
    if (!e.marks[n]) throw Error(`There is no mark type named '${n}'. Maybe you forgot to add the extension?`);
    return e.marks[n];
  }
  return n;
}
const Rc = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const o = ct(n, r.schema), { doc: s, selection: l } = t, { $from: a, from: c, to: u } = l;
  if (i) {
    const f = es(a, o, e);
    if (f && f.from <= c && f.to >= u) {
      const d = _e.create(s, f.from, f.to);
      t.setSelection(d);
    }
  }
  return !0;
}, Ic = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let r = 0; r < t.length; r += 1) if (t[r](e)) return !0;
  return !1;
};
function ts(n) {
  return n instanceof _e;
}
function ht(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function zc(n, e = null) {
  if (!e) return null;
  const t = It.atStart(n), r = It.atEnd(n);
  if (e === "start" || e === !0) return t;
  if (e === "end") return r;
  const i = t.from, o = r.to;
  return e === "all" ? _e.create(n, ht(0, i, o), ht(n.content.size, i, o)) : _e.create(n, ht(e, i, o), ht(e, i, o));
}
function Ei() {
  return ["Android"].includes(navigator.platform) || /android/i.test(navigator.userAgent);
}
function Pn() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
function Oc() {
  return typeof navigator < "u" ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : !1;
}
const $c = (n = null, e = {}) => ({ editor: t, view: r, tr: i, dispatch: o }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const s = () => {
    (Pn() || Ei()) && r.dom.focus(), Oc() && !Pn() && !Ei() && r.dom.focus({ preventScroll: !0 }), requestAnimationFrame(() => {
      t.isDestroyed || (r.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  try {
    if (r.hasFocus() && n === null || n === !1) return !0;
  } catch {
    return !1;
  }
  if (o && n === null && !ts(t.state.selection))
    return s(), !0;
  const l = zc(i.doc, n) || t.state.selection, a = t.state.selection.eq(l);
  return o && (a || i.setSelection(l), a && i.storedMarks && i.setStoredMarks(i.storedMarks), s()), !0;
}, Dc = (n, e) => (t) => n.every((r, i) => e(r, {
  ...t,
  index: i
})), Pc = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt({
  from: t.selection.from,
  to: t.selection.to
}, n, e), ns = (n) => {
  const e = n.childNodes;
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const r = e[t];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? n.removeChild(r) : r.nodeType === 1 && ns(r);
  }
  return n;
};
function bn(n) {
  if (typeof window > "u") throw new Error("[tiptap error]: there is no window object available, so this function cannot be used");
  const e = `<body>${n}</body>`, t = new window.DOMParser().parseFromString(e, "text/html").body;
  return ns(t);
}
function rs(n) {
  return typeof (n == null ? void 0 : n.nodesBetween) == "function";
}
function Ft(n, e, t) {
  if (rs(n)) return n;
  const r = typeof n == "object" && n !== null;
  t = {
    slice: !0,
    parseOptions: {},
    ...t
  };
  const i = typeof n == "string";
  if (r) try {
    if (Array.isArray(n) && n.length > 0) return A.fromArray(n.map((s) => e.nodeFromJSON(s)));
    const o = e.nodeFromJSON(n);
    return t.errorOnInvalidContent && o.check(), o;
  } catch (o) {
    if (t.errorOnInvalidContent) throw new Error("[tiptap error]: Invalid JSON content", { cause: o });
    return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", o), Ft("", e, t);
  }
  if (i) {
    if (t.errorOnInvalidContent) {
      let s = !1, l = "";
      const a = new ya({
        topNode: e.spec.topNode,
        marks: e.spec.marks,
        nodes: e.spec.nodes.append({ __tiptap__private__unknown__catch__all__node: {
          content: "inline*",
          group: "block",
          parseDOM: [{
            tag: "*",
            getAttrs: (c) => (s = !0, l = typeof c == "string" ? c : c.outerHTML, null)
          }]
        } })
      });
      if (t.slice ? Ot.fromSchema(a).parseSlice(bn(n), t.parseOptions) : Ot.fromSchema(a).parse(bn(n), t.parseOptions), t.errorOnInvalidContent && s) throw new Error("[tiptap error]: Invalid HTML content", { cause: /* @__PURE__ */ new Error(`Invalid element found: ${l}`) });
    }
    const o = Ot.fromSchema(e);
    return t.slice ? o.parseSlice(bn(n), t.parseOptions).content : o.parse(bn(n), t.parseOptions);
  }
  return Ft("", e, t);
}
function is(n) {
  return !("type" in n);
}
function ss(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e) return;
  const i = n.steps[r];
  if (!(i instanceof ke || i instanceof Re)) return;
  const o = n.mapping.maps[r];
  let s = 0;
  o.forEach((l, a, c, u) => {
    s === 0 && (s = u);
  }), n.setSelection(It.near(n.doc.resolve(s), t));
}
const Lc = (n, e, t) => ({ tr: r, dispatch: i, editor: o }) => {
  if (i) {
    t = {
      parseOptions: o.options.parseOptions,
      updateSelection: !0,
      applyInputRules: !1,
      applyPasteRules: !1,
      ...t
    };
    let l;
    const a = (y) => {
      o.emit("contentError", {
        editor: o,
        error: y,
        disableCollaboration: () => {
          "collaboration" in o.storage && typeof o.storage.collaboration == "object" && o.storage.collaboration && (o.storage.collaboration.isDisabled = !0);
        }
      });
    }, c = {
      preserveWhitespace: "full",
      ...t.parseOptions
    };
    if (!t.errorOnInvalidContent && !o.options.enableContentCheck && o.options.emitContentError) try {
      Ft(e, o.schema, {
        parseOptions: c,
        errorOnInvalidContent: !0
      });
    } catch (y) {
      a(y);
    }
    try {
      var s;
      l = Ft(e, o.schema, {
        parseOptions: c,
        errorOnInvalidContent: (s = t.errorOnInvalidContent) !== null && s !== void 0 ? s : o.options.enableContentCheck
      });
    } catch (y) {
      return a(y), !1;
    }
    let { from: u, to: f } = typeof n == "number" ? {
      from: n,
      to: n
    } : {
      from: n.from,
      to: n.to
    }, d = !0, h = !0;
    const p = is(l) ? l.content : [l];
    if (p.forEach((y) => {
      y.check(), d = d ? y.isText && y.marks.length === 0 : !1, h = h ? y.isBlock : !1;
    }), u === f && h) {
      const { parent: y } = r.doc.resolve(u);
      y.isTextblock && !y.type.spec.code && !y.childCount && (u -= 1, f += 1);
    }
    let g;
    if (d)
      Array.isArray(e) ? g = e.map((y) => y.text || "").join("") : rs(e) ? g = p.map((y) => {
        var x;
        return (x = y.text) !== null && x !== void 0 ? x : "";
      }).join("") : typeof e == "object" && e && e.text ? g = e.text : g = e, r.insertText(g, u, f);
    else {
      g = A.from(p);
      const y = r.doc.resolve(u), x = y.node(), C = y.parentOffset === 0, w = x.isText || x.isTextblock, E = x.content.size > 0;
      C && w && E && h && (u = Math.max(0, u - 1)), r.replaceWith(u, f, p);
    }
    t.updateSelection && ss(r, r.steps.length - 1, -1), t.applyInputRules && r.setMeta("applyInputRules", {
      from: u,
      text: g
    }), t.applyPasteRules && r.setMeta("applyPasteRules", {
      from: u,
      text: g
    });
  }
  return !0;
};
function ls(n) {
  for (let e = 0; e < n.edgeCount; e += 1) {
    const { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs()) return t;
  }
  return null;
}
const Bc = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
  const { pos: i, attrs: o, content: s, updateSelection: l = !0 } = n;
  let a;
  typeof i == "number" ? a = e.doc.resolve(i) : i ? a = i : a = e.selection.$from;
  const c = ls(a.parent.contentMatchAt(a.index()));
  if (!c) return !1;
  const u = Object.keys(c.spec.attrs || {}), f = o ? Object.fromEntries(Object.entries(o).filter(([h]) => u.includes(h))) : {};
  let d;
  if (s) {
    const h = Ft(s, r.schema);
    d = c.createAndFill(f, h);
  } else d = c.createAndFill(f);
  return d ? (t && (e.insert(a.pos, d), l && ss(e, e.steps.length - 1, -1)), !0) : !1;
}, Fc = () => ({ state: n, dispatch: e }) => Xa(n, e), Hc = () => ({ state: n, dispatch: e }) => Ga(n, e), _c = () => ({ state: n, dispatch: e }) => Ho(n, e), Wc = () => ({ state: n, dispatch: e }) => Jo(n, e), jc = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = jn(n.doc, n.selection.$from.pos, -1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Jc = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = jn(n.doc, n.selection.$from.pos, 1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, qc = () => ({ state: n, dispatch: e }) => Ya(n, e), Vc = () => ({ state: n, dispatch: e }) => Ua(n, e);
function as() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function Kc(n) {
  const e = n.split(/-(?!$)/);
  let t = e[e.length - 1];
  t === "Space" && (t = " ");
  let r, i, o, s;
  for (let l = 0; l < e.length - 1; l += 1) {
    const a = e[l];
    if (/^(cmd|meta|m)$/i.test(a)) s = !0;
    else if (/^a(lt)?$/i.test(a)) r = !0;
    else if (/^(c|ctrl|control)$/i.test(a)) i = !0;
    else if (/^s(hift)?$/i.test(a)) o = !0;
    else if (/^mod$/i.test(a))
      Pn() || as() ? s = !0 : i = !0;
    else throw new Error(`Unrecognized modifier name: ${a}`);
  }
  return r && (t = `Alt-${t}`), i && (t = `Ctrl-${t}`), s && (t = `Meta-${t}`), o && (t = `Shift-${t}`), t;
}
const Yc = (n) => ({ editor: e, view: t, tr: r, dispatch: i }) => {
  const o = Kc(n).split(/-(?!$)/), s = o.find((c) => ![
    "Alt",
    "Ctrl",
    "Meta",
    "Shift"
  ].includes(c)), l = new KeyboardEvent("keydown", {
    key: s === "Space" ? " " : s,
    altKey: o.includes("Alt"),
    ctrlKey: o.includes("Ctrl"),
    metaKey: o.includes("Meta"),
    shiftKey: o.includes("Shift"),
    bubbles: !0,
    cancelable: !0
  }), a = e.captureTransaction(() => {
    t.someProp("handleKeyDown", (c) => c(t, l));
  });
  return a == null || a.steps.forEach((c) => {
    const u = c.map(r.mapping);
    u && i && r.maybeStep(u);
  }), !0;
};
function Fr(n, e, t = {}) {
  const { from: r, to: i, empty: o } = n.selection, s = e ? Oe(e, n.schema) : null, l = [];
  n.doc.nodesBetween(r, i, (u, f) => {
    if (u.isText) return;
    const d = Math.max(r, f), h = Math.min(i, f + u.nodeSize);
    l.push({
      node: u,
      from: d,
      to: h
    });
  });
  const a = i - r, c = l.filter((u) => s ? s.name === u.node.type.name : !0).filter((u) => Dn(u.node.attrs, t, { strict: !1 }));
  return o ? !!c.length : c.reduce((u, f) => u + f.to - f.from, 0) >= a;
}
const Uc = (n, e = {}) => ({ state: t, dispatch: r }) => Fr(t, Oe(n, t.schema), e) ? Qa(t, r) : !1, Xc = () => ({ state: n, dispatch: e }) => Yo(n, e), Gc = (n) => ({ state: e, dispatch: t }) => {
  const r = Oe(n, e.schema);
  return uc(r)(e, t);
}, Qc = () => ({ state: n, dispatch: e }) => Vo(n, e);
function cs(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function Ci(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((r, i) => (t.includes(i) || (r[i] = n[i]), r), {});
}
const Zc = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = cs(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = Oe(n, r.schema)), l === "mark" && (s = ct(n, r.schema));
  let a = !1;
  return t.selection.ranges.forEach((c) => {
    r.doc.nodesBetween(c.$from.pos, c.$to.pos, (u, f) => {
      o && o === u.type && (a = !0, i && t.setNodeMarkup(f, void 0, Ci(u.attrs, e))), s && u.marks.length && u.marks.forEach((d) => {
        s === d.type && (a = !0, i && t.addMark(f, f + u.nodeSize, s.create(Ci(d.attrs, e))));
      });
    });
  }), a;
}, eu = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), tu = () => ({ tr: n, dispatch: e }) => {
  if (e) {
    const t = new Js(n.doc);
    n.setSelection(t);
  }
  return !0;
}, nu = () => ({ state: n, dispatch: e }) => Wo(n, e), ru = () => ({ state: n, dispatch: e }) => qo(n, e), iu = () => ({ state: n, dispatch: e }) => nc(n, e), ou = () => ({ state: n, dispatch: e }) => oc(n, e), su = () => ({ state: n, dispatch: e }) => ic(n, e);
function lu(n, e, t = {}, r = {}) {
  return Ft(n, e, {
    slice: !1,
    parseOptions: t,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
const au = (n, { errorOnInvalidContent: e, emitUpdate: t = !0, parseOptions: r = {} } = {}) => ({ editor: i, tr: o, dispatch: s, commands: l }) => {
  const { doc: a } = o;
  if (r.preserveWhitespace !== "full") {
    const c = lu(n, i.schema, r, { errorOnInvalidContent: e ?? i.options.enableContentCheck });
    if (s) {
      const u = is(c) ? c.content : [c];
      o.replaceWith(0, a.content.size, u).setMeta("preventUpdate", !t);
    }
    return !0;
  }
  return s && o.setMeta("preventUpdate", !t), l.insertContentAt({
    from: 0,
    to: a.content.size
  }, n, {
    parseOptions: r,
    errorOnInvalidContent: e ?? i.options.enableContentCheck
  });
};
function cu(n, e) {
  const t = ct(e, n.schema), { from: r, to: i, empty: o } = n.selection, s = [];
  o ? (n.storedMarks && s.push(...n.storedMarks), s.push(...n.selection.$head.marks())) : n.doc.nodesBetween(r, i, (a) => {
    s.push(...a.marks);
  });
  const l = s.find((a) => a.type.name === t.name);
  return l ? { ...l.attrs } : {};
}
function uu(n, e) {
  const t = new qa(n);
  return e.forEach((r) => {
    r.steps.forEach((i) => {
      t.step(i);
    });
  }), t;
}
function du(n, e) {
  for (let t = n.depth; t > 0; t -= 1) {
    const r = n.node(t);
    if (e(r)) return {
      pos: t > 0 ? n.before(t) : 0,
      start: n.start(t),
      depth: t,
      node: r
    };
  }
}
function Hr(n) {
  return (e) => du(e.$from, n);
}
function en(n, e, t) {
  return n.config[e] === void 0 && n.parent ? en(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? en(n.parent, e, t) : null
  }) : n.config[e];
}
function fu(n) {
  return typeof n == "function";
}
function yr(n, e = void 0, ...t) {
  return fu(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function us(n) {
  return {
    baseExtensions: n.filter((e) => e.type === "extension"),
    nodeExtensions: n.filter((e) => e.type === "node"),
    markExtensions: n.filter((e) => e.type === "mark")
  };
}
function hu(n, e, t) {
  const { from: r, to: i } = e, { blockSeparator: o = `

`, textSerializers: s = {} } = t || {};
  let l = "";
  return n.nodesBetween(r, i, (a, c, u, f) => {
    a.isBlock && c > r && (l += o);
    const d = s == null ? void 0 : s[a.type.name];
    if (d)
      return u && (l += d({
        node: a,
        pos: c,
        parent: u,
        index: f,
        range: e
      })), !1;
    if (a.isText) {
      var h;
      l += a == null || (h = a.text) === null || h === void 0 ? void 0 : h.slice(Math.max(r, c) - c, i - c);
    }
  }), l;
}
function pu(n) {
  return Object.fromEntries(Object.entries(n.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
function mu(n, e = JSON.stringify) {
  const t = {};
  return n.filter((r) => {
    const i = e(r);
    return Object.prototype.hasOwnProperty.call(t, i) ? !1 : t[i] = !0;
  });
}
function gu(n) {
  const e = mu(n);
  return e.length === 1 ? e : e.filter((t, r) => !e.filter((i, o) => o !== r).some((i) => t.oldRange.from >= i.oldRange.from && t.oldRange.to <= i.oldRange.to && t.newRange.from >= i.newRange.from && t.newRange.to <= i.newRange.to));
}
function yu(n) {
  const { mapping: e, steps: t } = n, r = [];
  return e.maps.forEach((i, o) => {
    const s = [];
    if (i.ranges.length)
      i.forEach((l, a) => {
        s.push({
          from: l,
          to: a
        });
      });
    else {
      const { from: l, to: a } = t[o];
      if (l === void 0 || a === void 0) return;
      s.push({
        from: l,
        to: a
      });
    }
    s.forEach(({ from: l, to: a }) => {
      const c = e.slice(o).map(l, -1), u = e.slice(o).map(a), f = e.invert().map(c, -1), d = e.invert().map(u);
      r.push({
        oldRange: {
          from: f,
          to: d
        },
        newRange: {
          from: c,
          to: u
        }
      });
    });
  }), gu(r);
}
function Sn(n, e, t) {
  return Object.fromEntries(Object.entries(t).filter(([r]) => {
    const i = n.find((o) => o.type === e && o.name === r);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function xu(n, e, t = {}) {
  const { empty: r, ranges: i } = n.selection, o = e ? ct(e, n.schema) : null;
  if (r) return !!(n.storedMarks || n.selection.$from.marks()).filter((u) => o ? o.name === u.type.name : !0).find((u) => Dn(u.attrs, t, { strict: !1 }));
  let s = 0;
  const l = [];
  if (i.forEach(({ $from: u, $to: f }) => {
    const d = u.pos, h = f.pos;
    n.doc.nodesBetween(d, h, (p, g) => {
      if (o && p.inlineContent && !p.type.allowsMarkType(o)) return !1;
      if (!p.isText && !p.marks.length) return;
      const y = Math.max(d, g), x = Math.min(h, g + p.nodeSize), C = x - y;
      s += C, l.push(...p.marks.map((w) => ({
        mark: w,
        from: y,
        to: x
      })));
    });
  }), s === 0) return !1;
  const a = l.filter((u) => o ? o.name === u.mark.type.name : !0).filter((u) => Dn(u.mark.attrs, t, { strict: !1 })).reduce((u, f) => u + f.to - f.from, 0), c = l.filter((u) => o ? u.mark.type !== o && u.mark.type.excludes(o) : !0).reduce((u, f) => u + f.to - f.from, 0);
  return (a > 0 ? a + c : a) >= s;
}
function ir(n, e) {
  const { nodeExtensions: t } = us(e), r = t.find((o) => o.name === n);
  if (!r) return !1;
  const i = yr(en(r, "group", {
    name: r.name,
    options: r.options,
    storage: r.storage
  }));
  return typeof i != "string" ? !1 : i.split(" ").includes("list");
}
function ds(n, { checkChildren: e = !0, ignoreWhitespace: t = !1 } = {}) {
  if (t) {
    if (n.type.name === "hardBreak") return !0;
    if (n.isText) {
      var r;
      return !/\S/.test((r = n.text) !== null && r !== void 0 ? r : "");
    }
  }
  if (n.isText) return !n.text;
  if (n.isAtom || n.isLeaf) return !1;
  if (n.content.childCount === 0) return !0;
  if (e) {
    let i = !0;
    return n.content.forEach((o) => {
      i !== !1 && (ds(o, {
        ignoreWhitespace: t,
        checkChildren: e
      }) || (i = !1));
    }), i;
  }
  return !1;
}
function bu(n, e, t) {
  const { selection: r } = e;
  let i = null;
  if (ts(r) && (i = r.$cursor), i) {
    var o;
    const l = (o = n.storedMarks) !== null && o !== void 0 ? o : i.marks();
    return i.parent.type.allowsMarkType(t) && (!!t.isInSet(l) || !l.some((a) => a.type.excludes(t)));
  }
  const { ranges: s } = r;
  return s.some(({ $from: l, $to: a }) => {
    let c = l.depth === 0 ? n.doc.inlineContent && n.doc.type.allowsMarkType(t) : !1;
    return n.doc.nodesBetween(l.pos, a.pos, (u, f, d) => {
      if (c) return !1;
      if (u.isInline) {
        const h = !d || d.type.allowsMarkType(t), p = !!t.isInSet(u.marks) || !u.marks.some((g) => g.type.excludes(t));
        c = h && p;
      }
      return !c;
    }), c;
  });
}
const vu = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = t, { empty: s, ranges: l } = o, a = ct(n, r.schema);
  if (i)
    if (s) {
      const c = cu(r, a);
      t.addStoredMark(a.create({
        ...c,
        ...e
      }));
    } else l.forEach((c) => {
      const u = c.$from.pos, f = c.$to.pos;
      r.doc.nodesBetween(u, f, (d, h) => {
        const p = Math.max(h, u), g = Math.min(h + d.nodeSize, f);
        d.marks.find((y) => y.type === a) ? d.marks.forEach((y) => {
          a === y.type && t.addMark(p, g, a.create({
            ...y.attrs,
            ...e
          }));
        }) : t.addMark(p, g, a.create(e));
      });
    });
  return bu(r, t, a);
}, wu = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), ku = (n, e = {}) => ({ state: t, dispatch: r, chain: i }) => {
  const o = Oe(n, t.schema);
  let s;
  return t.selection.$anchor.sameParent(t.selection.$head) && (s = t.selection.$anchor.parent.attrs), o.isTextblock ? i().command(({ commands: l }) => ki(o, {
    ...s,
    ...e
  })(t) ? !0 : l.clearNodes()).command(({ state: l }) => ki(o, {
    ...s,
    ...e
  })(l, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, Su = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, i = ht(n, 0, r.content.size), o = Dt.create(r, i);
    e.setSelection(o);
  }
  return !0;
}, Tu = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = r;
  let s, l;
  return typeof e == "number" ? (s = e, l = e) : e && "from" in e && "to" in e ? (s = e.from, l = e.to) : (s = o.from, l = o.to), i && t.doc.nodesBetween(s, l, (a, c) => {
    a.isText || t.setNodeMarkup(c, void 0, {
      ...a.attrs,
      dir: n
    });
  }), !0;
}, Eu = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, { from: i, to: o } = typeof n == "number" ? {
      from: n,
      to: n
    } : n, s = _e.atStart(r).from, l = _e.atEnd(r).to, a = ht(i, s, l), c = ht(o, s, l), u = _e.create(r, a, c);
    e.setSelection(u);
  }
  return !0;
}, Cu = (n) => ({ state: e, dispatch: t }) => {
  const r = Oe(n, e.schema);
  return hc(r)(e, t);
};
function Ni(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    n.tr.ensureMarks(r);
  }
}
const Nu = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
  const { selection: o, doc: s } = e, { $from: l, $to: a } = o, c = i.extensionManager.attributes, u = Sn(c, l.node().type.name, l.node().attrs);
  if (o instanceof Dt && o.node.isBlock)
    return !l.parentOffset || !nt(s, l.pos) ? !1 : (r && (n && Ni(t, i.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock) return !1;
  const f = a.parentOffset === a.parent.content.size, d = l.depth === 0 ? void 0 : ls(l.node(-1).contentMatchAt(l.indexAfter(-1)));
  let h = f && d ? [{
    type: d,
    attrs: u
  }] : void 0, p = nt(e.doc, e.mapping.map(l.pos), 1, h);
  if (!h && !p && nt(e.doc, e.mapping.map(l.pos), 1, d ? [{ type: d }] : void 0) && (p = !0, h = d ? [{
    type: d,
    attrs: u
  }] : void 0), r) {
    if (p && (o instanceof _e && e.deleteSelection(), e.split(e.mapping.map(l.pos), 1, h), d && !f && !l.parentOffset && l.parent.type !== d)) {
      const g = e.mapping.map(l.before()), y = e.doc.resolve(g);
      l.node(-1).canReplaceWith(y.index(), y.index() + 1, d) && e.setNodeMarkup(e.mapping.map(l.before()), d);
    }
    n && Ni(t, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return p;
}, Mu = (n, e = {}) => ({ tr: t, state: r, dispatch: i, editor: o }) => {
  const s = Oe(n, r.schema), { $from: l, $to: a } = r.selection, c = r.selection.node;
  if (c && c.isBlock || l.depth < 2 || !l.sameParent(a)) return !1;
  const u = l.node(-1);
  if (u.type !== s) return !1;
  const f = o.extensionManager.attributes;
  if (l.parent.content.size === 0 && l.node(-1).childCount === l.indexAfter(-1)) {
    if (l.depth === 2 || l.node(-3).type !== s || l.index(-2) !== l.node(-2).childCount - 1) return !1;
    if (i) {
      var d;
      let x = A.empty;
      const C = l.index(-1) ? 1 : l.index(-2) ? 2 : 3;
      for (let D = l.depth - C; D >= l.depth - 3; D -= 1) x = A.from(l.node(D).copy(x));
      const w = l.indexAfter(-1) < l.node(-2).childCount ? 1 : l.indexAfter(-2) < l.node(-3).childCount ? 2 : 3, E = {
        ...Sn(f, l.node().type.name, l.node().attrs),
        ...e
      }, N = ((d = s.contentMatch.defaultType) === null || d === void 0 ? void 0 : d.createAndFill(E)) || void 0;
      x = x.append(A.from(s.createAndFill(null, N) || void 0));
      const k = l.before(l.depth - (C - 1));
      t.replace(k, l.after(-w), new W(x, 4 - C, 0));
      let $ = -1;
      t.doc.nodesBetween(k, t.doc.content.size, (D, T) => {
        if ($ > -1) return !1;
        D.isTextblock && D.content.size === 0 && ($ = T + 1);
      }), $ > -1 && t.setSelection(_e.near(t.doc.resolve($))), t.scrollIntoView();
    }
    return !0;
  }
  const h = a.pos === l.end() ? u.contentMatchAt(0).defaultType : null, p = {
    ...Sn(f, u.type.name, u.attrs),
    ...e
  }, g = {
    ...Sn(f, l.node().type.name, l.node().attrs),
    ...e
  };
  t.delete(l.pos, a.pos);
  const y = h ? [{
    type: s,
    attrs: p
  }, {
    type: h,
    attrs: g
  }] : [{
    type: s,
    attrs: p
  }];
  if (!nt(t.doc, l.pos, 2)) return !1;
  if (i) {
    const { selection: x, storedMarks: C } = r, { splittableMarks: w } = o.extensionManager, E = C || x.$to.parentOffset && x.$from.marks();
    if (t.split(l.pos, 2, y).scrollIntoView(), !E || !i) return !0;
    const N = E.filter((k) => w.includes(k.type.name));
    t.ensureMarks(N);
  }
  return !0;
};
function Mi(n) {
  return !n || n === "1" ? null : n;
}
function fs(n, e) {
  return Mi(n) === Mi(e);
}
const or = (n, e) => {
  const t = Hr((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && wt(n.doc, t.pos)) || !fs(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(t.pos), !0;
}, sr = (n, e) => {
  const t = Hr((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && wt(n.doc, r)) || !fs(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(r), !0;
};
function Au(n) {
  const e = n.doc, t = e.firstChild;
  if (!t) return null;
  const r = e.resolve(1), i = e.resolve(t.nodeSize - 1);
  return _e.between(r, i);
}
const Ru = (n, e, t, r = {}) => ({ editor: i, tr: o, state: s, dispatch: l, chain: a, commands: c, can: u }) => {
  const { extensions: f, splittableMarks: d } = i.extensionManager, h = Oe(n, s.schema), p = Oe(e, s.schema), { selection: g, storedMarks: y } = s, { $from: x, $to: C } = g, w = x.blockRange(C), E = y || g.$to.parentOffset && g.$from.marks();
  if (!w) return !1;
  const N = Hr((B) => ir(B.type.name, f))(g), k = g.from === 0 && g.to === s.doc.content.size, $ = s.doc.content.content, D = $.length === 1 ? $[0] : null, T = k && D && ir(D.type.name, f) ? {
    node: D,
    pos: 0
  } : null, J = N ?? T, I = !!N && w.depth >= 1 && w.depth - N.depth <= 1, H = !!T;
  if ((I || H) && J) {
    if (J.node.type === h)
      return k && H ? a().command(({ tr: B, dispatch: _ }) => {
        const j = Au(B);
        return j ? (B.setSelection(j), _ && _(B), !0) : !1;
      }).liftListItem(p).run() : c.liftListItem(p);
    if (ir(J.node.type.name, f) && h.validContent(J.node.content)) return a().command(() => (o.setNodeMarkup(J.pos, h), !0)).command(() => or(o, h)).command(() => sr(o, h)).run();
  }
  return !t || !E || !l ? a().command(() => u().wrapInList(h, r) ? !0 : c.clearNodes()).wrapInList(h, r).command(() => or(o, h)).command(() => sr(o, h)).run() : a().command(() => {
    const B = u().wrapInList(h, r), _ = E.filter((j) => d.includes(j.type.name));
    return o.ensureMarks(_), B ? !0 : c.clearNodes();
  }).wrapInList(h, r).command(() => or(o, h)).command(() => sr(o, h)).run();
}, Iu = (n, e = {}, t = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: o = !1 } = t, s = ct(n, r.schema);
  return xu(r, s, e) ? i.unsetMark(s, { extendEmptyMarkRange: o }) : i.setMark(s, e);
}, zu = (n, e, t = {}) => ({ state: r, commands: i }) => {
  const o = Oe(n, r.schema), s = Oe(e, r.schema), l = Fr(r, o, t);
  let a;
  return r.selection.$anchor.sameParent(r.selection.$head) && (a = r.selection.$anchor.parent.attrs), l ? i.setNode(s, a) : i.setNode(o, {
    ...a,
    ...t
  });
}, Ou = (n, e = {}) => ({ state: t, commands: r }) => {
  const i = Oe(n, t.schema);
  return Fr(t, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, $u = () => ({ state: n, dispatch: e }) => {
  const t = n.plugins;
  for (let r = 0; r < t.length; r += 1) {
    const i = t[r];
    let o;
    if (i.spec.isInputRules && (o = i.getState(n))) {
      if (e) {
        const s = n.tr, l = o.transform;
        for (let a = l.steps.length - 1; a >= 0; a -= 1) s.step(l.steps[a].invert(l.docs[a]));
        if (o.text) {
          const a = s.doc.resolve(o.from).marks();
          s.replaceWith(o.from, o.to, n.schema.text(o.text, a));
        } else s.delete(o.from, o.to);
      }
      return !0;
    }
  }
  return !1;
}, Du = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
  const { ignoreClearable: i = !1 } = n, { selection: o } = e, { empty: s, ranges: l } = o;
  if (s) return !0;
  const { nonClearableMarks: a } = r.extensionManager;
  if (t) {
    const c = Object.values(r.schema.marks).filter((u) => i || !a.includes(u.name));
    l.forEach((u) => {
      for (const f of c) e.removeMark(u.$from.pos, u.$to.pos, f);
    });
  }
  return !0;
}, Pu = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { extendEmptyMarkRange: o = !1 } = e, { selection: s } = t, l = ct(n, r.schema), { $from: a, empty: c, ranges: u } = s;
  if (!i) return !0;
  if (c && o) {
    var f;
    let { from: d, to: h } = s;
    const p = es(a, l, (f = a.marks().find((g) => g.type === l)) === null || f === void 0 ? void 0 : f.attrs);
    p && (d = p.from, h = p.to), t.removeMark(d, h, l);
  } else u.forEach((d) => {
    t.removeMark(d.$from.pos, d.$to.pos, l);
  });
  return t.removeStoredMark(l), !0;
}, Lu = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const { selection: i } = t;
  let o, s;
  return typeof n == "number" ? (o = n, s = n) : n && "from" in n && "to" in n ? (o = n.from, s = n.to) : (o = i.from, s = i.to), r && e.doc.nodesBetween(o, s, (l, a) => {
    if (l.isText) return;
    const c = { ...l.attrs };
    delete c.dir, e.setNodeMarkup(a, void 0, c);
  }), !0;
}, Bu = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = cs(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = Oe(n, r.schema)), l === "mark" && (s = ct(n, r.schema));
  let a = !1;
  return t.selection.ranges.forEach((c) => {
    const u = c.$from.pos, f = c.$to.pos;
    let d, h, p, g;
    t.selection.empty ? r.doc.nodesBetween(u, f, (y, x) => {
      o && o === y.type && (a = !0, p = Math.max(x, u), g = Math.min(x + y.nodeSize, f), d = x, h = y);
    }) : r.doc.nodesBetween(u, f, (y, x) => {
      x < u && o && o === y.type && (a = !0, p = Math.max(x, u), g = Math.min(x + y.nodeSize, f), d = x, h = y), x >= u && x <= f && (o && o === y.type && (a = !0, i && t.setNodeMarkup(x, void 0, {
        ...y.attrs,
        ...e
      })), s && y.marks.length && y.marks.forEach((C) => {
        if (s === C.type && (a = !0, i)) {
          const w = Math.max(x, u), E = Math.min(x + y.nodeSize, f);
          t.addMark(w, E, s.create({
            ...C.attrs,
            ...e
          }));
        }
      }));
    }), h && (d !== void 0 && i && t.setNodeMarkup(d, void 0, {
      ...h.attrs,
      ...e
    }), s && h.marks.length && h.marks.forEach((y) => {
      s === y.type && i && t.addMark(p, g, s.create({
        ...y.attrs,
        ...e
      }));
    }));
  }), a;
}, Fu = new Ye("__tiptap_decorations__"), Hu = (n) => ({ tr: e, dispatch: t }) => (t && e.setMeta(Fu, {
  type: "force",
  name: n
}), !0), _u = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Oe(n, t.schema);
  return sc(i, e)(t, r);
}, Wu = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Oe(n, t.schema);
  return lc(i, e)(t, r);
};
var ju = /* @__PURE__ */ ea({
  blur: () => mc,
  clearContent: () => gc,
  clearNodes: () => yc,
  command: () => xc,
  createParagraphNear: () => bc,
  cut: () => vc,
  deleteCurrentNode: () => wc,
  deleteNode: () => kc,
  deleteRange: () => Sc,
  deleteSelection: () => Cc,
  enter: () => Nc,
  exitCode: () => Mc,
  extendMarkRange: () => Rc,
  first: () => Ic,
  focus: () => $c,
  forEach: () => Dc,
  insertContent: () => Pc,
  insertContentAt: () => Lc,
  insertDefaultBlock: () => Bc,
  joinBackward: () => _c,
  joinDown: () => Hc,
  joinForward: () => Wc,
  joinItemBackward: () => jc,
  joinItemForward: () => Jc,
  joinTextblockBackward: () => qc,
  joinTextblockForward: () => Vc,
  joinUp: () => Fc,
  keyboardShortcut: () => Yc,
  lift: () => Uc,
  liftEmptyBlock: () => Xc,
  liftListItem: () => Gc,
  newlineInCode: () => Qc,
  resetAttributes: () => Zc,
  scrollIntoView: () => eu,
  selectAll: () => tu,
  selectNodeBackward: () => nu,
  selectNodeForward: () => ru,
  selectParentNode: () => iu,
  selectTextblockEnd: () => ou,
  selectTextblockStart: () => su,
  setContent: () => au,
  setMark: () => vu,
  setMeta: () => wu,
  setNode: () => ku,
  setNodeSelection: () => Su,
  setTextDirection: () => Tu,
  setTextSelection: () => Eu,
  sinkListItem: () => Cu,
  splitBlock: () => Nu,
  splitListItem: () => Mu,
  toggleList: () => Ru,
  toggleMark: () => Iu,
  toggleNode: () => zu,
  toggleWrap: () => Ou,
  undoInputRule: () => $u,
  unsetAllMarks: () => Du,
  unsetMark: () => Pu,
  unsetTextDirection: () => Lu,
  updateAttributes: () => Bu,
  updateDecorations: () => Hu,
  wrapIn: () => _u,
  wrapInList: () => Wu
});
typeof process < "u" && process.env.NODE_ENV;
function Ju(n) {
  return Object.prototype.toString.call(n).slice(8, -1);
}
function vn(n) {
  return Ju(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
function hs(n, e) {
  const t = { ...n };
  return vn(n) && vn(e) && Object.keys(e).forEach((r) => {
    vn(e[r]) && vn(n[r]) ? t[r] = hs(n[r], e[r]) : t[r] = e[r];
  }), t;
}
var ps = class {
  constructor(n = {}) {
    this.type = "extendable", this.parent = null, this.child = null, this.name = "", this.config = { name: this.name }, this.config = {
      ...this.config,
      ...n
    }, this.name = this.config.name;
  }
  get options() {
    return { ...yr(en(this, "addOptions", { name: this.name })) };
  }
  get storage() {
    return { ...yr(en(this, "addStorage", {
      name: this.name,
      options: this.options
    })) };
  }
  configure(n = {}) {
    const e = this.extend({
      ...this.config,
      addOptions: () => hs(this.options, n)
    });
    return e.name = this.name, e.parent = this.parent, this.child = null, e;
  }
  extend(n = {}) {
    const e = new this.constructor({
      ...this.config,
      ...n
    });
    return e.parent = this, this.child = e, e.name = "name" in n ? n.name : e.parent.name, e;
  }
}, qu = class ms extends ps {
  constructor(...e) {
    super(...e), this.type = "mark";
  }
  /**
  * Create a new Mark instance
  * @param config - Mark configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new ms(t);
  }
  static handleExit({ editor: e, mark: t }) {
    const { tr: r } = e.state, i = e.state.selection.$from;
    if (i.pos === i.end()) {
      const o = i.marks();
      if (!o.find((l) => (l == null ? void 0 : l.type.name) === t.name)) return !1;
      const s = o.find((l) => (l == null ? void 0 : l.type.name) === t.name);
      return s && r.removeStoredMark(s), r.insertText(" ", i.pos), e.view.dispatch(r), !0;
    }
    return !1;
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const t = typeof e == "function" ? e() : e;
    return super.extend(t);
  }
}, We = class gs extends ps {
  constructor(...e) {
    super(...e), this.type = "extension";
  }
  /**
  * Create a new Extension instance
  * @param config - Extension configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new gs(t);
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const t = typeof e == "function" ? e() : e;
    return super.extend(t);
  }
};
We.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return { blockSeparator: void 0 };
  },
  addProseMirrorPlugins() {
    return [new rt({
      key: new Ye("clipboardTextSerializer"),
      props: { clipboardTextSerializer: () => {
        const { editor: n } = this, { state: e, schema: t } = n, { doc: r, selection: i } = e, o = pu(t), { blockSeparator: s } = this.options, l = {
          ...s !== void 0 ? { blockSeparator: s } : {},
          textSerializers: o
        };
        return [...i.ranges].sort((a, c) => a.$from.pos - c.$from.pos).map(({ $from: a, $to: c }) => hu(r, {
          from: a.pos,
          to: c.pos
        }, l)).join(s ?? `

`);
      } }
    })];
  }
});
We.create({
  name: "commands",
  addCommands() {
    return { ...ju };
  }
});
We.create({
  name: "delete",
  onUpdate({ transaction: n, appendedTransactions: e }) {
    var t, r;
    const i = () => {
      var o, s, l;
      if ((o = (s = this.editor.options.coreExtensionOptions) === null || s === void 0 || (s = s.delete) === null || s === void 0 || (l = s.filterTransaction) === null || l === void 0 ? void 0 : l.call(s, n)) !== null && o !== void 0 ? o : n.getMeta("y-sync$")) return;
      const a = uu(n.before, [n, ...e]);
      yu(a).forEach((u) => {
        a.mapping.mapResult(u.oldRange.from).deletedAfter && a.mapping.mapResult(u.oldRange.to).deletedBefore && a.before.nodesBetween(u.oldRange.from, u.oldRange.to, (f, d) => {
          const h = d + f.nodeSize - 2, p = u.oldRange.from <= d && h <= u.oldRange.to;
          this.editor.emit("delete", {
            type: "node",
            node: f,
            from: d,
            to: h,
            newFrom: a.mapping.map(d),
            newTo: a.mapping.map(h),
            deletedRange: u.oldRange,
            newRange: u.newRange,
            partial: !p,
            editor: this.editor,
            transaction: n,
            combinedTransform: a
          });
        });
      });
      const c = a.mapping;
      a.steps.forEach((u, f) => {
        if (u instanceof qe) {
          var d, h;
          const p = c.slice(f).map(u.from, -1), g = c.slice(f).map(u.to), y = c.invert().map(p, -1), x = c.invert().map(g), C = p > 0 ? (d = a.doc.nodeAt(p - 1)) === null || d === void 0 ? void 0 : d.marks.some((E) => E.eq(u.mark)) : !1, w = (h = a.doc.nodeAt(g)) === null || h === void 0 ? void 0 : h.marks.some((E) => E.eq(u.mark));
          this.editor.emit("delete", {
            type: "mark",
            mark: u.mark,
            from: u.from,
            to: u.to,
            deletedRange: {
              from: y,
              to: x
            },
            newRange: {
              from: p,
              to: g
            },
            partial: !!(w || C),
            editor: this.editor,
            transaction: n,
            combinedTransform: a
          });
        }
      });
    };
    !((t = (r = this.editor.options.coreExtensionOptions) === null || r === void 0 || (r = r.delete) === null || r === void 0 ? void 0 : r.async) !== null && t !== void 0) || t ? setTimeout(i, 0) : i();
  }
});
We.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [new rt({
      key: new Ye("tiptapDrop"),
      props: { handleDrop: (n, e, t, r) => {
        this.editor.emit("drop", {
          editor: this.editor,
          event: e,
          slice: t,
          moved: r
        });
      } }
    })];
  }
});
We.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [new rt({
      key: new Ye("editable"),
      props: { editable: () => this.editor.options.editable }
    })];
  }
});
const Vu = new Ye("focusEvents");
We.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [new rt({
      key: Vu,
      props: { handleDOMEvents: {
        focus: (e, t) => {
          n.isFocused = !0;
          const r = n.state.tr.setMeta("focus", { event: t }).setMeta("addToHistory", !1);
          return e.dispatch(r), !1;
        },
        blur: (e, t) => {
          n.isFocused = !1;
          const r = n.state.tr.setMeta("blur", { event: t }).setMeta("addToHistory", !1);
          return e.dispatch(r), !1;
        }
      } }
    })];
  }
});
We.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const n = () => this.editor.commands.first(({ commands: s }) => [
      () => s.undoInputRule(),
      () => s.command(({ tr: l }) => {
        const { selection: a, doc: c } = l, { empty: u, $anchor: f } = a, { pos: d, parent: h } = f, p = f.parent.isTextblock && d > 0 ? l.doc.resolve(d - 1) : f, g = p.parent.type.spec.isolating, y = f.pos - f.parentOffset, x = g && p.parent.childCount === 1 ? y === f.pos : It.atStart(c).from === d;
        return !u || !h.type.isTextblock || h.textContent.length || !x || x && f.parent.type.name === "paragraph" ? !1 : s.clearNodes();
      }),
      () => s.deleteSelection(),
      () => s.joinBackward(),
      () => s.selectNodeBackward()
    ]), e = () => this.editor.commands.first(({ commands: s }) => [
      () => s.deleteSelection(),
      () => s.deleteCurrentNode(),
      () => s.joinForward(),
      () => s.selectNodeForward()
    ]), r = {
      Enter: () => this.editor.commands.first(({ commands: s }) => [
        () => s.newlineInCode(),
        () => s.createParagraphNear(),
        () => s.liftEmptyBlock(),
        () => s.splitBlock()
      ]),
      "Mod-Enter": () => this.editor.commands.exitCode(),
      Backspace: n,
      "Mod-Backspace": n,
      "Shift-Backspace": n,
      Delete: e,
      "Mod-Delete": e,
      "Mod-a": () => this.editor.commands.selectAll()
    }, i = { ...r }, o = {
      ...r,
      "Ctrl-h": n,
      "Alt-Backspace": n,
      "Ctrl-d": e,
      "Ctrl-Alt-Backspace": e,
      "Alt-Delete": e,
      "Alt-d": e,
      "Ctrl-a": () => this.editor.commands.selectTextblockStart(),
      "Ctrl-e": () => this.editor.commands.selectTextblockEnd()
    };
    return Pn() || as() ? o : i;
  },
  addProseMirrorPlugins() {
    return [new rt({
      key: new Ye("clearDocument"),
      appendTransaction: (n, e, t) => {
        if (n.some((h) => h.getMeta("composition"))) return;
        const r = n.some((h) => h.docChanged) && !e.doc.eq(t.doc), i = n.some((h) => h.getMeta("preventClearDocument"));
        if (!r || i) return;
        const { empty: o, from: s, to: l } = e.selection, a = It.atStart(e.doc).from, c = It.atEnd(e.doc).to;
        if (o || !(s === a && l === c) || !ds(t.doc)) return;
        const u = t.tr, f = Go({
          state: t,
          transaction: u
        }), { commands: d } = new pc({
          editor: this.editor,
          state: f
        });
        if (d.clearNodes(), !!u.steps.length)
          return u;
      }
    })];
  }
});
We.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [new rt({
      key: new Ye("tiptapPaste"),
      props: { handlePaste: (n, e, t) => {
        this.editor.emit("paste", {
          editor: this.editor,
          event: e,
          slice: t
        });
      } }
    })];
  }
});
We.create({
  name: "tabindex",
  addOptions() {
    return { value: void 0 };
  },
  addProseMirrorPlugins() {
    return [new rt({
      key: new Ye("tabindex"),
      props: { attributes: () => {
        var n;
        return !this.editor.isEditable && this.options.value === void 0 ? {} : { tabindex: (n = this.options.value) !== null && n !== void 0 ? n : "0" };
      } }
    })];
  }
});
We.create({
  name: "textDirection",
  addOptions() {
    return { direction: void 0 };
  },
  addGlobalAttributes() {
    if (!this.options.direction) return [];
    const { nodeExtensions: n } = us(this.extensions);
    return [{
      types: n.filter((e) => e.name !== "text").map((e) => e.name),
      attributes: { dir: {
        default: this.options.direction,
        parseHTML: (e) => {
          const t = e.getAttribute("dir");
          return t && (t === "ltr" || t === "rtl" || t === "auto") ? t : this.options.direction;
        },
        renderHTML: (e) => e.dir ? { dir: e.dir } : {}
      } }
    }];
  },
  addProseMirrorPlugins() {
    return [new rt({
      key: new Ye("textDirection"),
      props: { attributes: () => {
        const n = this.options.direction;
        return n ? { dir: n } : {};
      } }
    })];
  }
});
const Ku = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), Yu = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), Uu = /^(https?:\/\/|mailto:)/i;
function Xu(n) {
  if (!n) return "";
  const e = [];
  for (const t of n.split(";")) {
    const r = t.indexOf(":");
    if (r < 0) continue;
    const i = t.slice(0, r).trim().toLowerCase(), o = t.slice(r + 1).trim();
    Yu.has(i) && o && e.push(`${i}: ${o}`);
  }
  return e.join("; ");
}
function xr(n) {
  if (n.nodeType === Node.TEXT_NODE) return n;
  if (n.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const e = n, t = e.tagName.toLowerCase(), r = () => {
    const l = document.createDocumentFragment();
    for (const a of Array.from(e.childNodes)) l.appendChild(xr(a));
    return l;
  };
  if (!Ku.has(t)) return r();
  if (t === "a") {
    const l = e.getAttribute("href") || "";
    if (!Uu.test(l)) return r();
  }
  const i = document.createElement(t), o = e.getAttribute("style"), s = Xu(o || "");
  if (s && i.setAttribute("style", s), t === "span") {
    const l = e.getAttribute("data-text-style");
    l && i.setAttribute("data-text-style", l);
  }
  if (t === "a") {
    i.setAttribute("href", e.getAttribute("href"));
    const l = e.getAttribute("target"), a = e.getAttribute("rel");
    l && i.setAttribute("target", l), a && i.setAttribute("rel", a);
  }
  for (const l of Array.from(e.childNodes)) i.appendChild(xr(l));
  return i;
}
function ys(n) {
  return n.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function Gu(n) {
  const e = ys(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  t.innerHTML = e;
  const r = document.createDocumentFragment();
  for (const s of Array.from(t.content.childNodes)) r.appendChild(xr(s));
  const i = document.createElement("div");
  return i.appendChild(r), i.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function gf(n) {
  const e = ys(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  return t.innerHTML = e, (t.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function yf(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function Qu(n) {
  return n.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function Ai(n) {
  return n.replace(/\{\{([^{}]+)\}\}/g, (e, t) => `<span data-type="token" data-field="${t}">{{${t}}}</span>`);
}
const Zu = { text: "#52525b" }, ed = ({ node: n, selected: e, extension: t, editor: r, view: i, getPos: o }) => {
  var d;
  const s = n.attrs.field ?? "", l = t.options, a = ((d = l.resolve) == null ? void 0 : d.call(l, s)) ?? null, c = (a == null ? void 0 : a.color) ?? Zu, u = (a == null ? void 0 : a.label) ?? `{{${s}}}`, f = a == null ? void 0 : a.nested;
  return /* @__PURE__ */ m(
    _s,
    {
      as: "span",
      "data-type": "token",
      className: `rt-token inline-block ${e ? "rt-token-selected" : ""}`,
      style: {
        background: c.text,
        color: "#fff",
        borderRadius: 10,
        padding: "0 6px",
        margin: "0 2px",
        fontWeight: 600,
        whiteSpace: "nowrap",
        fontSize: "inherit",
        lineHeight: "inherit"
      },
      onMouseDown: (h) => {
        var x;
        if (h.button !== 0 || !r.isEditable) return;
        h.preventDefault(), r.isFocused || r.commands.focus();
        const p = typeof o == "function" ? o() : null;
        if (p == null) return;
        const g = i.state.doc.resolve(p), y = g.nodeAfter;
        y && Dt.isSelectable(y) && i.dispatch(i.state.tr.setSelection(new Dt(g))), (x = l.onTokenClick) == null || x.call(l, s, h.currentTarget.getBoundingClientRect(), p);
      },
      children: f ? /* @__PURE__ */ m("span", { className: "rt-token-nested", children: u }) : u
    }
  );
}, td = tl.extend({
  name: "token",
  selectable: !0,
  addOptions() {
    var n;
    return {
      ...(n = this.parent) == null ? void 0 : n.call(this),
      resolve: null,
      onTokenClick: null
    };
  },
  addNodeView() {
    return Hs(ed);
  },
  addAttributes() {
    return {
      field: {
        default: null,
        parseHTML: (n) => n.getAttribute("data-field"),
        renderHTML: (n) => n.field ? { "data-field": n.field } : {}
      },
      label: {
        default: null,
        parseHTML: (n) => n.getAttribute("data-label"),
        renderHTML: (n) => n.label ? { "data-label": n.label } : {}
      }
    };
  },
  parseHTML() {
    return [{ tag: 'span[data-type="token"]' }];
  },
  // Span wrapper + save-strip: this PM version has no bare-string spec
  // shortcut, so the atom serializes as `<span data-type="token">` and
  // `stripTokenWrappers` regex-strips it back to plain `{{key}}` on save —
  // the stripped output is the storage contract.
  renderHTML({ node: n, HTMLAttributes: e }) {
    return ["span", Fs({ "data-type": "token" }, e), `{{${n.attrs.field ?? ""}}}`];
  },
  renderText({ node: n }) {
    return `{{${n.attrs.field ?? ""}}}`;
  }
}), nd = 240, rd = 280, id = ({ props: n, onApi: e }) => {
  const t = Fn(), r = S(e);
  r.current = e, Z(() => {
    r.current(t);
  }, [t]);
  const i = S(null);
  Z(() => {
    var s, l;
    t.pointerDriven || (l = (s = i.current) == null ? void 0 : s.querySelector(".ui-item-highlighted")) == null || l.scrollIntoView({ block: "nearest" });
  }, [t.highlightedIndex, t.pointerDriven]), Z(() => {
    n.items.length > 0 && t.highlightedIndex === -1 && t.setHighlighted(0, "keyboard");
  }, [n.items.length, t.highlightedIndex, t]);
  const o = Cr();
  return /* @__PURE__ */ m(on.Provider, { value: t, children: /* @__PURE__ */ m(
    "div",
    {
      className: "ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto",
      style: { width: rd, maxHeight: nd },
      onMouseDown: (s) => s.preventDefault(),
      children: /* @__PURE__ */ m("div", { ref: i, children: n.items.map((s) => /* @__PURE__ */ m(
        od,
        {
          item: s,
          d: o,
          command: () => n.command({ field: s.key })
        },
        s.key
      )) })
    }
  ) });
}, od = ({ item: n, d: e, command: t }) => {
  const { myIndex: r, highlighted: i, setPointer: o } = eo({
    label: () => n.label,
    activate: t
  }), s = xe(), l = { padding: `${R(8, 12, s)}px ${R(12, 16, s)}px`, fontSize: R(12, 14, s) };
  return /* @__PURE__ */ O(
    "div",
    {
      role: "option",
      style: l,
      className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${e.itemDefault} ${i ? "ui-item-highlighted" : ""}`,
      onPointerEnter: () => o(r),
      onClick: t,
      children: [
        /* @__PURE__ */ m("span", { className: `${e.icon} shrink-0 flex items-center`, children: /* @__PURE__ */ m("span", { className: "block w-2 h-2 rounded-full", style: { background: n.color.text } }) }),
        /* @__PURE__ */ m("span", { className: "flex-1 truncate", children: n.label }),
        n.group && /* @__PURE__ */ m("span", { className: "shrink-0 text-[9px] uppercase tracking-wider", style: { color: n.color.text }, children: n.group })
      ]
    }
  );
}, Ri = () => {
  let n = null;
  const e = (r) => {
    n && (n.props = r, n.holder.style.display = r.items.length > 0 ? "" : "none", n.root.render(
      /* @__PURE__ */ m(id, { props: r, onApi: (i) => {
        n.api = i;
      } })
    ));
  }, t = () => {
    var r;
    n != null && n.props && ((r = n.unmount) == null || r.call(n), n.unmount = n.props.mount(n.holder, {
      // The plugin anchors to the `@`-decoration's start; the caret sits at
      // its END, so shift the popup right by the anchor width — matches the
      // pre-TipTap popup, which anchored exactly at the caret.
      onPosition: ({ x: i, y: o, placement: s, strategy: l }) => {
        var u, f;
        if (!n) return;
        const a = (f = (u = n.props) == null ? void 0 : u.clientRect) == null ? void 0 : f.call(u), c = a && !s.endsWith("-end") ? a.width : 0;
        n.holder.style.position = l, n.holder.style.left = `${i + c}px`, n.holder.style.top = `${o}px`;
      }
    }));
  };
  return {
    onStart(r) {
      const i = document.createElement("div");
      i.style.zIndex = "10002";
      const o = nl(i);
      n = { holder: i, root: o, unmount: null, props: r, api: null }, t(), e(r);
    },
    onUpdate(r) {
      n && (e(r), t());
    },
    onKeyDown({ event: r }) {
      if (!(n != null && n.props) || !n.api) return !1;
      const { items: i, command: o } = n.props;
      if (i.length === 0) return !1;
      const s = n.api, l = r.key;
      if (l === "ArrowDown" || l === "ArrowUp") {
        r.preventDefault();
        const a = s.highlightedIndex, c = l === "ArrowDown" ? 1 : -1;
        return s.setHighlighted((a + c + i.length) % i.length, "keyboard"), !0;
      }
      if (l === "Enter" || l === "Tab") {
        r.preventDefault();
        const a = s.highlightedIndex, c = a >= 0 ? a : 0, u = s.items[c];
        return u ? u.activate() : i[c] && o({ field: i[c].key }), !0;
      }
      return !1;
    },
    onExit() {
      var r;
      n && ((r = n.unmount) == null || r.call(n), n.root.unmount(), n.holder.remove(), n = null);
    }
  };
}, sd = qu.create({
  name: "reportTextStyle",
  priority: 102,
  addAttributes() {
    return {
      styleId: {
        default: null,
        parseHTML: (n) => n.getAttribute("data-text-style"),
        renderHTML: (n) => n.styleId ? { "data-text-style": n.styleId } : {}
      }
    };
  },
  parseHTML() {
    return [{ tag: "span[data-text-style]" }];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["span", n, 0];
  }
}), Tn = new Ye("retainedSelectionHighlight"), ld = We.create({
  name: "retainedSelectionHighlight",
  addProseMirrorPlugins() {
    return [
      new rt({
        key: Tn,
        state: {
          init: () => ({ held: !1, decorations: un.empty }),
          apply(n, e) {
            const t = n.getMeta(Tn), r = t ? t.held : e.held;
            if (!r) return { held: !1, decorations: un.empty };
            const { from: i, to: o, empty: s } = n.selection;
            return {
              held: r,
              decorations: s ? un.empty : un.create(n.doc, [qs.inline(i, o, { class: "rt-retained-selection" })])
            };
          }
        },
        props: {
          decorations(n) {
            var e;
            return (e = Tn.getState(n)) == null ? void 0 : e.decorations;
          }
        }
      })
    ];
  }
}), xf = {
  bold: !1,
  italic: !1,
  underline: !1,
  strike: !1,
  link: !1,
  color: "",
  fontFamily: "",
  fontSize: "",
  textStyle: "",
  hasSelection: !1,
  fontFamilyMixed: !1,
  fontSizeMixed: !1,
  textStyleMixed: !1
};
function xs(n, e) {
  const t = n.state.doc.resolve(e).nodeBefore;
  return t && t.type.name === "token" ? t.attrs.field ?? "" : null;
}
function ad(n) {
  const e = n.state.selection.$from, t = e.nodeBefore;
  if (!(t != null && t.isText)) return null;
  const r = t.text || "", i = r.lastIndexOf(".");
  if (i < 0) return null;
  const o = e.pos - r.length + i, s = xs(n, o);
  return s == null ? null : { chipKey: s, dotPos: o };
}
const cd = Ce.forwardRef(({
  value: n,
  onChange: e,
  placeholder: t,
  disabled: r,
  className: i,
  onStateChange: o,
  resolveToken: s,
  suggestionItems: l,
  attributeItems: a,
  onTokenClick: c,
  onSelectionChange: u
}, f) => {
  const d = S(s);
  d.current = s;
  const h = S(l);
  h.current = l;
  const p = S(a);
  p.current = a;
  const g = S(c);
  g.current = c;
  const y = S(u);
  y.current = u;
  const x = S(null), C = S(null), w = S(e);
  w.current = e;
  const E = S(r);
  E.current = r;
  const N = S(o);
  N.current = o;
  const k = S(null), $ = (H) => {
    var Y;
    const B = H.getAttributes("textStyle"), _ = H.getAttributes("reportTextStyle"), { from: j, to: v, empty: F } = H.state.selection;
    let U = !1, ne = !1, ue = !1;
    if (!F) {
      const V = /* @__PURE__ */ new Set(), M = /* @__PURE__ */ new Set(), X = /* @__PURE__ */ new Set();
      H.state.doc.nodesBetween(j, v, (ce) => {
        if (!ce.isText) return;
        const be = ce.marks.find((z) => z.type.name === "textStyle");
        V.add((be == null ? void 0 : be.attrs.fontFamily) || ""), M.add((be == null ? void 0 : be.attrs.fontSize) || "");
        const Le = ce.marks.find((z) => z.type.name === "reportTextStyle");
        X.add((Le == null ? void 0 : Le.attrs.styleId) || "");
      }), U = V.size > 1, ne = M.size > 1, ue = X.size > 1;
    }
    const Q = {
      bold: H.isActive("bold"),
      italic: H.isActive("italic"),
      underline: H.isActive("underline"),
      strike: H.isActive("strike"),
      link: H.isActive("link"),
      color: B.color || "",
      fontFamily: B.fontFamily || "",
      fontSize: B.fontSize || "",
      textStyle: _.styleId || "",
      hasSelection: !F,
      fontFamilyMixed: U,
      fontSizeMixed: ne,
      textStyleMixed: ue
    }, P = k.current;
    P && P.bold === Q.bold && P.italic === Q.italic && P.underline === Q.underline && P.strike === Q.strike && P.link === Q.link && P.color === Q.color && P.fontFamily === Q.fontFamily && P.fontSize === Q.fontSize && P.textStyle === Q.textStyle && P.hasSelection === Q.hasSelection && P.fontFamilyMixed === Q.fontFamilyMixed && P.fontSizeMixed === Q.fontSizeMixed && P.textStyleMixed === Q.textStyleMixed || (k.current = Q, (Y = N.current) == null || Y.call(N, Q));
  }, D = (H) => {
    var F;
    const B = H.state.selection;
    let _ = null;
    B instanceof Dt && B.node.type.name === "token" ? (_ = { key: B.node.attrs.field ?? "", pos: B.from }, x.current = B.from) : x.current != null && (x.current = H.state.tr.mapping.map(x.current));
    const j = C.current, v = j && _ && j.key === _.key && j.pos === _.pos;
    !j && !_ || v || (C.current = _, (F = y.current) == null || F.call(y, _));
  }, T = (H) => {
    const B = Gu(Qu(H));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(B) ? "" : B;
  }, J = Ce.useMemo(() => {
    const H = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: j }) => {
        var v;
        return ((v = h.current) == null ? void 0 : v.call(h, j)) ?? [];
      },
      command: ({ editor: j, range: v, props: F }) => {
        j.chain().focus().insertContentAt(v, { type: "token", attrs: { field: F.field } }).run();
      },
      render: Ri
    }, B = td.configure({
      resolve: d.current ?? null,
      suggestion: H,
      onTokenClick: (j, v, F) => {
        var U;
        x.current = F, (U = g.current) == null || U.call(g, j, v, F);
      }
    }), _ = We.create({
      name: "tokenAttributeSuggestion",
      addProseMirrorPlugins() {
        return [
          el({
            pluginKey: new Ye("tokenAttributeSuggestion"),
            editor: this.editor,
            char: ".",
            // The gate is `shouldShow` (a chip must sit immediately before the
            // dot), not the prefix rule — the prefix here is an atom, not text.
            allowedPrefixes: null,
            decorationClass: "suggestion-attr",
            shouldShow: ({ editor: j, range: v }) => xs(j, v.from) != null,
            items: ({ editor: j, query: v }) => {
              var U;
              const F = ad(j);
              return F ? ((U = p.current) == null ? void 0 : U.call(p, F.chipKey, v)) ?? [] : [];
            },
            command: ({ editor: j, range: v, props: F }) => {
              j.chain().focus().insertContentAt(v, { type: "token", attrs: { field: F.field } }).run();
            },
            render: Ri
          })
        ];
      }
    });
    return [B, _];
  }, []), I = Ws({
    immediatelyRender: !1,
    extensions: [
      Vs,
      Ks.configure({ placeholder: t }),
      Ys,
      Us,
      Xs,
      sd,
      ld,
      Gs,
      Zs,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      Qs.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      ...J
    ],
    content: Ai(n || ""),
    editable: !r,
    onUpdate: ({ editor: H }) => {
      w.current(T(H.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: H }) => {
      $(H), D(H);
    }
  });
  return Z(() => {
    if (!I || I.isFocused) return;
    T(I.getHTML()) !== n && (k.current = null, I.commands.setContent(Ai(n || ""), { emitUpdate: !1 }), $(I));
  }, [n, I]), Z(() => {
    I && I.setEditable(!r);
  }, [r, I]), Z(() => {
    I && (k.current = null, $(I), D(I));
  }, [I]), Ss(f, () => ({
    exec: (H, B, _) => {
      if (!I || E.current) return;
      const j = I.chain(), v = (_ == null ? void 0 : _.focus) === !1 ? j : j.focus();
      switch (H) {
        case "bold":
          v.toggleBold().run();
          break;
        case "italic":
          v.toggleItalic().run();
          break;
        case "underline":
          v.toggleUnderline().run();
          break;
        case "strikeThrough":
          v.toggleStrike().run();
          break;
        case "foreColor":
          B && v.setColor(B).run();
          break;
        case "unsetColor":
          v.unsetColor().run();
          break;
        case "fontFamily":
          B && v.setFontFamily(B).run();
          break;
        case "unsetFontFamily":
          v.unsetFontFamily().run();
          break;
        case "fontSize":
          B && v.setFontSize(B).run();
          break;
        case "unsetFontSize":
          v.unsetFontSize().run();
          break;
        // Linked named style: mark the run with the consumer's style id. Direct
        // font family/size on the range is cleared so the linked style's
        // typography takes effect (the object-level precedent); bold/italic
        // marks stay — direct character formatting still wins (Word).
        case "textStyle":
          B && v.setMark("reportTextStyle", { styleId: B }).unsetFontFamily().unsetFontSize().run();
          break;
        case "unsetTextStyle":
          v.unsetMark("reportTextStyle").run();
          break;
        // Clear every inline mark (bold/italic/underline/strike/color/font/
        // link) and normalize the block — the cell-chrome Reset path.
        case "clearFormatting":
          v.unsetAllMarks().clearNodes().run();
          break;
        case "link":
          B && v.extendMarkRange("link").setLink({ href: B }).run();
          break;
        case "unlink":
          v.extendMarkRange("link").unsetLink().run();
          break;
      }
    },
    focus: (H) => I == null ? void 0 : I.commands.focus(H),
    insertToken: (H) => {
      !I || E.current || I.chain().focus().insertContent({ type: "token", attrs: { field: H } }).run();
    },
    replaceToken: (H) => {
      if (!I || E.current) return;
      const B = x.current;
      B != null && I.commands.command(({ tr: _ }) => {
        const j = _.doc.nodeAt(B);
        if (!j || j.type.name !== "token") return !1;
        _.setNodeMarkup(B, void 0, { field: H });
        const v = _.doc.resolve(B);
        return v.nodeAfter && v.nodeAfter.type.name === "token" && _.setSelection(new Dt(v)), !0;
      });
    },
    holdSelectionHighlight: (H) => {
      !I || I.isDestroyed || I.view.dispatch(I.state.tr.setMeta(Tn, { held: H }));
    }
  }), [I]), /* @__PURE__ */ m(js, { editor: I, className: `richtext-editor ${i || ""}` });
});
cd.displayName = "RichTextEditor";
const ud = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], dd = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], Ii = ({ className: n = "w-3 h-3" }) => /* @__PURE__ */ m("span", { className: `${n} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ m("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), fd = ({ value: n, disabled: e, onChange: t, mixed: r }) => {
  const [i, o] = G(!1);
  return /* @__PURE__ */ m(
    Hn,
    {
      open: i,
      onOpenChange: o,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ O("button", { type: "button", disabled: e, className: `${Gl} w-28 justify-between`, children: [
        r ? /* @__PURE__ */ m("span", { className: "truncate italic text-zinc-500", children: "Mixed" }) : /* @__PURE__ */ m("span", { className: "truncate", style: { fontFamily: n || "Helvetica" }, children: n || "Helvetica" }),
        /* @__PURE__ */ m(Ln, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: ud.map((s) => /* @__PURE__ */ m(bl, { onClick: () => {
        t(s), o(!1);
      }, icon: !r && s === n ? /* @__PURE__ */ m(Oi, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ m("span", { style: { fontFamily: s }, children: s }) }, s))
    }
  );
}, hd = ({ editorRef: n, disabled: e, active: t }) => {
  const [r, i] = G(!1), o = _n(), [s, l] = G(""), a = () => {
    var u;
    const c = s.trim();
    c && ((u = n.current) == null || u.exec("link", c), i(!1));
  };
  return /* @__PURE__ */ m(
    Hn,
    {
      open: r,
      onOpenChange: i,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ m(
        et,
        {
          theme: "dark",
          active: t,
          disabled: e,
          onMouseDown: (c) => c.preventDefault(),
          style: { ...o.toggle, padding: 0 },
          className: "justify-center",
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ m(Os, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ O("div", { className: "p-2 flex flex-col gap-2", children: [
        /* @__PURE__ */ m(
          "input",
          {
            value: s,
            onChange: (c) => l(c.target.value),
            placeholder: "https://…",
            autoFocus: !0,
            onKeyDown: (c) => {
              c.key === "Enter" && (c.preventDefault(), a());
            },
            style: o.input,
            className: Ul + " w-full"
          }
        ),
        /* @__PURE__ */ O("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ m(et, { theme: "dark", onClick: a, style: o.control, disabled: !s.trim(), children: "Apply" }),
          /* @__PURE__ */ m(
            et,
            {
              theme: "dark",
              onClick: () => {
                var c;
                (c = n.current) == null || c.exec("unlink"), i(!1);
              },
              style: o.control,
              children: "Remove"
            }
          )
        ] })
      ] })
    }
  );
}, bf = ({ editorRef: n, disabled: e, active: t, lockedFormatting: r, trailing: i, font: o, fontSizeSlot: s, showClearFormatting: l, dividers: a = !0 }) => {
  const [c, u] = G(!1), f = (y, x) => {
    var C;
    return (C = n.current) == null ? void 0 : C.exec(y, x);
  }, d = _n(), h = (y) => !!(r != null && r[y]), p = "flex items-center gap-1 shrink-0", g = a ? /* @__PURE__ */ m("div", { className: so }) : null;
  return /* @__PURE__ */ O("div", { className: `flex flex-wrap items-center ${a ? "gap-x-1" : "gap-x-2"} gap-y-1.5`, children: [
    /* @__PURE__ */ O("div", { className: p, children: [
      /* @__PURE__ */ m(Mt, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ m(et, { theme: "dark", "aria-label": "Bold", active: ((t == null ? void 0 : t.bold) ?? !1) || h("bold"), disabled: e || h("bold"), onMouseDown: (y) => y.preventDefault(), onClick: () => f("bold"), style: { ...d.toggle, padding: 0 }, className: "justify-center font-bold", children: "B" }) }),
      /* @__PURE__ */ m(Mt, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ m(et, { theme: "dark", "aria-label": "Italic", active: ((t == null ? void 0 : t.italic) ?? !1) || h("italic"), disabled: e || h("italic"), onMouseDown: (y) => y.preventDefault(), onClick: () => f("italic"), style: { ...d.toggle, padding: 0 }, className: "justify-center italic", children: "I" }) }),
      /* @__PURE__ */ m(Mt, { content: "Underline", children: /* @__PURE__ */ m(et, { theme: "dark", "aria-label": "Underline", active: (t == null ? void 0 : t.underline) ?? !1, disabled: e, onMouseDown: (y) => y.preventDefault(), onClick: () => f("underline"), style: { ...d.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ m(Rs, { className: "w-3 h-3" }) }) }),
      /* @__PURE__ */ m(Mt, { content: "Strikethrough", children: /* @__PURE__ */ m(et, { theme: "dark", "aria-label": "Strikethrough", active: (t == null ? void 0 : t.strike) ?? !1, disabled: e, onMouseDown: (y) => y.preventDefault(), onClick: () => f("strikeThrough"), style: { ...d.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ m(Is, { className: "w-3 h-3" }) }) })
    ] }),
    g,
    /* @__PURE__ */ m("div", { className: p, children: /* @__PURE__ */ m(hd, { editorRef: n, disabled: e, active: (t == null ? void 0 : t.link) ?? !1 }) }),
    g,
    /* @__PURE__ */ m("div", { className: p, children: /* @__PURE__ */ m(
      Hn,
      {
        open: c,
        onOpenChange: u,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ O(et, { theme: "dark", disabled: e, style: d.control, className: "justify-between min-w-0", title: "Text color", children: [
          t != null && t.color ? /* @__PURE__ */ m("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: t.color } }) : /* @__PURE__ */ m(Ii, {}),
          /* @__PURE__ */ m(Ln, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ O("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => {
                f("unsetColor"), u(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${t != null && t.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ m(Ii, { className: "w-3.5 h-3.5" })
            }
          ),
          dd.map((y) => /* @__PURE__ */ m(
            "button",
            {
              onClick: () => {
                f("foreColor", y), u(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors ${y === (t == null ? void 0 : t.color) ? "ring-2 ring-zinc-300" : ""}`,
              style: { background: y },
              title: y
            },
            y
          ))
        ] })
      }
    ) }),
    (o || s || l) && /* @__PURE__ */ O(Ve, { children: [
      g,
      /* @__PURE__ */ O("div", { className: p, children: [
        o && /* @__PURE__ */ m(fd, { value: o.value || "Helvetica", mixed: o.mixed, disabled: e, onChange: o.onChange }),
        s,
        l && /* @__PURE__ */ m(Mt, { content: "Clear formatting", children: /* @__PURE__ */ m(
          et,
          {
            theme: "dark",
            "aria-label": "Clear formatting",
            disabled: e,
            onMouseDown: (y) => y.preventDefault(),
            onClick: () => f("clearFormatting"),
            style: { ...d.toggle, padding: 0 },
            className: "justify-center",
            children: /* @__PURE__ */ m(zs, { className: "w-3 h-3" })
          }
        ) })
      ] })
    ] }),
    i && /* @__PURE__ */ O(Ve, { children: [
      g,
      /* @__PURE__ */ m("div", { className: p, children: i })
    ] })
  ] });
};
function _r(n, e, t) {
  return Math.max(e, Math.min(t, n));
}
function pd(n, e, t, r, i) {
  return _r(n + e * i, t, r);
}
const md = 2;
function gd(n, e, t, r, i) {
  return _r(n + Math.trunc(e / md) * i, t, r);
}
const yd = 3;
function vf({
  value: n,
  min: e,
  max: t,
  fallback: r,
  onCommit: i,
  step: o = 1,
  readOnly: s,
  disabled: l,
  ariaLabel: a,
  className: c,
  title: u,
  placeholder: f,
  theme: d
}) {
  const [h, p] = G(null), [g, y] = G(!1), x = S(!1), C = S(null), w = S(null), E = S(null), N = xe(), k = io(), $ = c === void 0;
  Z(() => () => {
    var v;
    return (v = C.current) == null ? void 0 : v.call(C);
  }, []), Je(() => {
    const v = E.current, F = w.current;
    !$ && v && F && (F.style.color = getComputedStyle(v).color);
  }, [$, c]), Z(() => {
    x.current || p(null);
  }, [n]);
  const D = n ?? r, T = h !== null ? h : n != null ? String(n) : f ? "" : String(r), J = (v) => _r(v, e, t), I = (v) => {
    const F = pd(D, v, e, t, o);
    F !== D && (x.current && p(String(F)), i(F));
  }, H = (v) => {
    if (l || s || v.pointerType !== "mouse" || v.button !== 0) return;
    const F = v.currentTarget, U = v.clientY, ne = D;
    let ue = ne, Q = !1;
    const P = (V) => {
      const M = U - V.clientY;
      if (!Q) {
        if (Math.abs(M) < yd) return;
        Q = !0, F.blur(), F.style.userSelect = "none";
      }
      const X = gd(ne, M, e, t, o);
      X !== ue && (ue = X, i(X));
    }, Y = () => {
      C.current = null, window.removeEventListener("pointermove", P), window.removeEventListener("pointerup", Y), window.removeEventListener("pointercancel", Y), F.style.userSelect = "", Q && F.blur();
    };
    C.current = Y, window.addEventListener("pointermove", P), window.addEventListener("pointerup", Y), window.addEventListener("pointercancel", Y);
  }, B = (v) => ({
    type: "button",
    tabIndex: -1,
    "aria-label": v === 1 ? "Increase" : "Decrease",
    disabled: !!l || !!s || (v === 1 ? D >= t : D <= e),
    onPointerDown: (F) => F.preventDefault(),
    onClick: () => I(v)
  }), _ = $ ? R(22, 30, N) : R(16, 22, N), j = $ ? R(14, 18, N) : R(11, 15, N);
  return /* @__PURE__ */ O(
    "span",
    {
      ref: w,
      className: `ui-number ${$ ? "ui-number-box" : ""}`,
      ...d ? { "data-theme": d } : {},
      children: [
        /* @__PURE__ */ m(
          "input",
          {
            ref: E,
            type: "number",
            "aria-label": a,
            title: u,
            placeholder: f,
            value: T,
            readOnly: s,
            disabled: l,
            className: c ?? "ui-input w-20",
            style: {
              ...$ ? { ...k, minHeight: R(30, 38, N) } : {},
              paddingRight: _ + 2,
              cursor: l || s ? void 0 : g ? "text" : "ns-resize"
            },
            onFocus: () => {
              x.current = !0, y(!0);
            },
            onChange: (v) => {
              const F = v.target.value;
              p(F);
              const U = parseInt(F, 10);
              F !== "" && !Number.isNaN(U) && i(J(U));
            },
            onBlur: () => {
              if (x.current = !1, y(!1), h === null) return;
              const v = parseInt(h, 10);
              Number.isNaN(v) || i(J(v)), p(null);
            },
            onKeyDown: (v) => {
              v.key === "Enter" && v.target.blur(), v.key === "Escape" && (p(null), v.target.blur()), !s && !l && (v.key === "ArrowUp" || v.key === "ArrowDown") && (v.preventDefault(), I(v.key === "ArrowUp" ? 1 : -1));
            },
            onPointerDown: H
          }
        ),
        /* @__PURE__ */ O("span", { className: "ui-number-steppers", style: { width: _ }, children: [
          /* @__PURE__ */ m("button", { ...B(1), className: "ui-number-step", children: /* @__PURE__ */ m($s, { style: { width: j, height: j } }) }),
          /* @__PURE__ */ m("button", { ...B(-1), className: "ui-number-step", children: /* @__PURE__ */ m(Ln, { style: { width: j, height: j } }) })
        ] })
      ]
    }
  );
}
function wf({ title: n, icon: e, count: t, tone: r = "default", collapsed: i, onToggle: o, trailing: s, bodyClass: l, className: a = "", dataProps: c, children: u }) {
  const f = xe(), d = at({ px: 12, py: 8, fs: 12 }, { px: 14, py: 12, fs: 14 }), h = R(14, 16, f), p = { width: h, height: h }, g = R(10, 12, f);
  return /* @__PURE__ */ O("div", { ...c, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${a}`, children: [
    /* @__PURE__ */ O("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1 bg-[var(--ui-card-header-bg)] text-[color:var(--ui-card-header-text)] hover:bg-[var(--ui-card-header-hover)] transition-colors", style: d, children: [
      /* @__PURE__ */ O(
        "button",
        {
          type: "button",
          onClick: o,
          className: "flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer",
          children: [
            i ? /* @__PURE__ */ m(Nn, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: p }) : /* @__PURE__ */ m(Ln, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: p }),
            e && /* @__PURE__ */ m("span", { className: "text-[color:var(--ui-card-header-icon)] shrink-0 inline-flex", children: e }),
            /* @__PURE__ */ m("span", { className: "font-semibold text-[color:var(--ui-card-header-text)] truncate", children: n }),
            t && /* @__PURE__ */ m("span", { className: "ui-card-count shrink-0", style: { fontSize: g }, children: t })
          ]
        }
      ),
      s && /* @__PURE__ */ m("div", { className: "shrink-0", children: s })
    ] }),
    !i && u && /* @__PURE__ */ m("div", { className: l || "ui-card-band border-t p-1.5 space-y-1", children: u })
  ] });
}
export {
  et as Button,
  wf as CardSection,
  ro as CheckMark,
  Cl as Checkbox,
  nf as Checklist,
  pf as ChromeHeader,
  hf as ContentRow,
  Wd as ContextMenu,
  Jd as ContextMenuDivider,
  jd as ContextMenuItem,
  qd as ContextMenuSub,
  qi as DROPDOWN_MAX_HEIGHT,
  tf as DatePicker,
  Ud as DialogProvider,
  bl as DropdownItem,
  Hn as DropdownMenu,
  vl as DropdownSubmenu,
  Er as DropdownThemeContext,
  ud as FONTS,
  of as FloatingChrome,
  ef as FloatingToggle,
  fd as FontMenu,
  bf as FormatToolbar,
  Ne as IS_COARSE,
  il as IS_TOUCH_CAPABLE,
  _d as ItemManagerDropdown,
  Gd as LongPressMenuProvider,
  wr as MORPH_EASE,
  Pt as MORPH_MS,
  kr as MORPH_OPACITY_MS,
  on as MenuHighlightContext,
  Zi as MenuSearchContext,
  kl as Modal,
  Vd as ModalFooter,
  fn as ModalFooterButton,
  vf as NumberInput,
  rl as PopoutWindowContext,
  xf as RICH_TEXT_STATE_IDLE,
  rf as RadioList,
  cd as RichTextEditor,
  md as SCRUB_PX_PER_STEP,
  ff as SectionHeader,
  df as Seg,
  mf as StructureControls,
  Nr as SubmenuContext,
  Zd as TAB_PILL,
  Kl as TB_BTN,
  hn as TB_BTN_ICON,
  Yl as TB_DANGER,
  so as TB_DIVIDER,
  Ul as TB_INPUT,
  uf as TB_NUM,
  Gl as TB_PICKER,
  sf as TB_ROW_LABEL,
  Xl as TB_SEG,
  lf as TB_TOGGLE,
  cf as TB_TOGGLE_OFF,
  af as TB_TOGGLE_ON,
  Pl as TabFace,
  Yi as ThemeProvider,
  Hd as ThemeScope,
  td as Token,
  ed as TokenChipView,
  pn as ToolButton,
  Mt as Tooltip,
  Sr as ZOOM_FROM,
  hl as buttonCloudOf,
  _r as clampNumber,
  al as cloneOverlayClose,
  R as coarsePx,
  yf as escapeHtml,
  Hi as getCoarseScale,
  Cr as getDropdownClasses,
  Bd as getHardwareKeyboard,
  Ld as getLastPointerType,
  Kd as inputCls,
  zl as isInteractiveElement,
  ar as isTouchLike,
  Ui as menuAttributesOf,
  dl as menuThemeOf,
  ji as nearestOverlayOrigin,
  ys as normalizeSpaces,
  Un as overlayMorphEnabled,
  ll as playOverlayClose,
  sl as playOverlayOpen,
  Ai as preprocessTokenHtml,
  Gu as sanitizeRichText,
  gd as scrubbedValue,
  fl as segModeOf,
  Dd as setCoarseScale,
  pd as steppedValue,
  gf as stripRichText,
  Qu as stripTokenWrappers,
  Pd as useCoarse,
  xe as useCoarseScale,
  at as useCoarseSize,
  Fi as useCurrentDocument,
  nn as useCurrentWindow,
  Yd as useDialog,
  ul as useDropdownPosition,
  Xi as useDropdownTheme,
  Fd as useHardwareKeyboard,
  io as useInputSize,
  Gi as useItemSize,
  vt as useKitTheme,
  ol as useLastPointerType,
  Xd as useLongPressOptOut,
  Mr as useMenuHighlight,
  yl as useMenuSearch,
  Tr as useOverlayMorph,
  vr as usePopoutWindow,
  tn as usePortalTarget,
  Vl as useSlidingPill,
  Qd as useTouchMode
};
