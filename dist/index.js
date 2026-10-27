"use client";
import { jsx as p, jsxs as R, Fragment as Ve } from "react/jsx-runtime";
import Be, { createContext as Jt, useContext as Kt, useState as ee, useEffect as te, useRef as S, useCallback as oe, useLayoutEffect as ct, useMemo as lt, useImperativeHandle as zs } from "react";
import * as ye from "@radix-ui/react-dropdown-menu";
import { Search as Pt, X as _t, Check as or, Pencil as $s, Copy as Ki, Trash2 as Rr, RotateCcw as Vi, Plus as jr, ChevronRight as Un, ChevronLeft as Ds, ArrowUp as Os, ArrowDown as Ls, ChevronDown as Cn, Underline as Ps, Strikethrough as Bs, RemoveFormatting as Fs, Link as Hs, ChevronUp as _s } from "lucide-react";
import { computePosition as js, offset as Yi, flip as Ui, shift as Gi, size as Ws, useFloating as qs, autoUpdate as Js } from "@floating-ui/react-dom";
import * as Ct from "@radix-ui/react-dialog";
import { createPortal as sr } from "react-dom";
import { mergeAttributes as Ks, ReactNodeViewRenderer as Vs, NodeViewWrapper as Ys, useEditor as Us, EditorContent as Gs } from "@tiptap/react";
import { PluginKey as ft, Plugin as vt, Selection as en, TextSelection as rt, NodeSelection as on, AllSelection as Xs } from "@tiptap/pm/state";
import { DecorationSet as Dn, Decoration as Qs } from "@tiptap/pm/view";
import Zs from "@tiptap/starter-kit";
import el from "@tiptap/extension-placeholder";
import { TextStyle as tl, FontFamily as nl, FontSize as rl } from "@tiptap/extension-text-style";
import il from "@tiptap/extension-color";
import ol from "@tiptap/extension-link";
import sl from "@tiptap/extension-underline";
import ll from "@tiptap/suggestion";
import { Mention as al } from "@tiptap/extension-mention";
import { createRoot as cl } from "react-dom/client";
const ul = Jt(null);
function Wr() {
  return Kt(ul);
}
function cn() {
  const n = Wr();
  return n ? n.document.body : null;
}
function qr() {
  const n = Wr();
  return n ? n.document : typeof document < "u" ? document : null;
}
function Mn() {
  return Wr() ?? (typeof window < "u" ? window : null);
}
const Rn = typeof window < "u", $e = Rn && window.matchMedia("(pointer: coarse)").matches, dl = Rn && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
let lr = 0.5;
const vn = /* @__PURE__ */ new Set();
function Jd(n) {
  lr = Math.max(0, Math.min(1, n)), vn.forEach((e) => e());
}
function Xi() {
  return lr;
}
function Kd() {
  const [, n] = ee(0);
  return te(() => {
    const e = () => n((t) => t + 1);
    return vn.add(e), () => {
      vn.delete(e);
    };
  }, []), $e && lr > 0;
}
function Ie() {
  const [, n] = ee(0);
  return te(() => {
    const e = () => n((t) => t + 1);
    return vn.add(e), () => {
      vn.delete(e);
    };
  }, []), lr;
}
function L(n, e, t) {
  return $e ? Math.round(n + (e - n) * t) : n;
}
function It(n, e) {
  const t = Ie();
  return $e && t > 0 ? {
    padding: `${L(n.py, e.py, t)}px ${L(n.px, e.px, t)}px`,
    fontSize: `${L(n.fs, e.fs, t)}px`
  } : { padding: `${n.py}px ${n.px}px`, fontSize: `${n.fs}px` };
}
function Qi() {
  const n = Ie(), e = $e && n > 0;
  return {
    box: e ? L(28, 36, n) : 20,
    icon: e ? L(16, 20, n) : 14
  };
}
function Ar(n) {
  return n === "touch" || n === "pen";
}
let Zt = null;
const Ir = /* @__PURE__ */ new Set();
Rn && window.addEventListener("pointerdown", (n) => {
  Zt = n.pointerType, Ir.forEach((e) => e());
}, !0);
function Vd() {
  return Zt;
}
function fl() {
  const [, n] = ee(0), e = S(Zt);
  return te(() => {
    const t = () => {
      e.current !== Zt && (e.current = Zt, n((r) => r + 1));
    };
    return Ir.add(t), () => {
      Ir.delete(t);
    };
  }, []), Zt;
}
const Zi = ["(any-hover: hover)", "(any-pointer: fine)"];
function eo() {
  return Rn ? Zi.some((n) => window.matchMedia(n).matches) : !1;
}
let Gn = eo();
const zr = /* @__PURE__ */ new Set();
function hi(n) {
  Gn !== n && (Gn = n, zr.forEach((e) => e()));
}
var Ji;
if (Rn) {
  const n = () => hi(eo());
  for (const s of Zi) {
    const l = window.matchMedia(s);
    (Ji = l.addEventListener) == null || Ji.call(l, "change", n);
  }
  window.addEventListener("focus", n), document.addEventListener("visibilitychange", n);
  const e = window.setInterval(() => {
    document.visibilityState === "visible" && n();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(e)), window.addEventListener("keydown", (s) => {
    s.isComposing || s.keyCode !== 229 && (s.key === "Enter" || s.key === "Backspace" || s.key === "Process" || s.key === "Unidentified" || hi(!0));
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
function Yd() {
  return Gn;
}
function Ud() {
  const [, n] = ee(0);
  return te(() => {
    const e = () => n((t) => t + 1);
    return zr.add(e), () => {
      zr.delete(e);
    };
  }, []), Gn;
}
const jt = 220, Jr = "cubic-bezier(0.32, 0.72, 0, 1)", Kr = 170, Vr = 0.94;
function yr(n) {
  return n === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function to(n, e) {
  const t = e.left + e.width / 2, r = e.top + e.height / 2;
  return {
    x: t < n.left ? 0 : t > n.left + n.width ? 1 : 0.5,
    y: r < n.top ? 0 : r > n.top + n.height ? 1 : 0.5
  };
}
function no(n, e) {
  const t = (e == null ? void 0 : e()) ?? null;
  if (!t) return { x: 0.5, y: 0.5 };
  const r = n.getBoundingClientRect();
  return to({ left: r.left, top: r.top, width: r.width, height: r.height }, t);
}
function hl(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity };
  e.style.transition = "none", e.style.transformOrigin = "50% 50%", e.style.transform = `scale(${Vr})`, e.style.opacity = "0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    n.current === i && requestAnimationFrame(() => {
      if (n.current !== i) return;
      const s = no(e, t);
      e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transition = `transform ${jt}ms ${Jr}, opacity ${Kr}ms ease`, e.style.transform = "none", e.style.opacity = "", window.setTimeout(() => {
        n.current === i && (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, r == null || r());
      }, jt + 60);
    });
  });
}
function pl(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity, pointerEvents: e.style.pointerEvents, visibility: e.style.visibility }, s = no(e, t);
  e.style.transition = `transform ${jt}ms ${Jr}, opacity ${Kr}ms ease`, e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transform = `scale(${Vr})`, e.style.opacity = "0", e.style.pointerEvents = "none", window.setTimeout(() => {
    n.current === i && (e.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      n.current !== i || e.isConnected || (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, e.style.pointerEvents = o.pointerEvents, e.style.visibility = o.visibility);
    }));
  }, jt + 60);
}
function ml(n, e, t) {
  const r = n.cloneNode(!0), i = n.getBoundingClientRect(), o = i.width > 0 || i.height > 0 ? i : t ?? i;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${o.left}px`, r.style.top = `${o.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const s = (e == null ? void 0 : e()) ?? null, l = s ? to({ left: o.left, top: o.top, width: o.width, height: o.height }, s) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${l.x * 100}% ${l.y * 100}%`, n.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${jt}ms ${Jr}, opacity ${Kr}ms ease`, r.style.transform = `scale(${Vr})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, jt + 60));
    });
  });
}
function ar(n) {
  const e = S(null), [t, r] = ee(!1), i = S(null), o = S(0), s = oe((m) => {
    if (n.ref && (n.ref.current = m), m) {
      o.current = 0, e.current = m;
      const b = m.getBoundingClientRect();
      (b.width > 0 || b.height > 0) && (i.current = { left: b.left, top: b.top, width: b.width, height: b.height }), r(!0);
      return;
    }
    const g = e.current, y = ++o.current;
    queueMicrotask(() => {
      y === o.current && e.current === g && (e.current = null, r(!1), !(!g || !n.cloneOnUnmount || !a.current) && g.style.visibility !== "hidden" && yr(d.current) && ml(g, u.current, i.current));
    });
  }, []), l = oe(() => {
    const m = e.current;
    if (!m || getComputedStyle(m).transform !== "none") return;
    const g = m.getBoundingClientRect();
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
  return ct(() => {
    if (!t || !a.current || !yr(d.current)) return;
    const m = e.current;
    m && hl(h, m, u.current);
  }, [t, n.visible]), te(() => {
    if (!t || !a.current) return;
    let m = 0;
    const g = () => {
      m = 0, l(), m = requestAnimationFrame(g);
    };
    return m = requestAnimationFrame(g), () => {
      m && cancelAnimationFrame(m);
    };
  }, [t, l]), ct(() => {
    var y;
    const m = c.current;
    if (c.current = n.visible, n.visible || !m) return;
    const g = e.current;
    if (!g || !yr(d.current)) {
      (y = f.current) == null || y.call(f);
      return;
    }
    pl(h, g, u.current, () => {
      var b;
      return (b = f.current) == null ? void 0 : b.call(f);
    });
  }, [n.visible]), te(() => {
    if (!t || !a.current) return;
    const m = (g) => {
      const y = e.current;
      y && y.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", m, { capture: !0 }), () => document.removeEventListener("wheel", m, { capture: !0 });
  }, [t]), te(() => {
    if (!t || !a.current) return;
    const m = (g) => {
      const y = e.current;
      y && y.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("touchmove", m, { capture: !0 }), () => document.removeEventListener("touchmove", m, { capture: !0 });
  }, [t]), s;
}
const ro = 384;
function gl(n) {
  const e = n.visualViewport;
  return e ? { x: e.offsetLeft, y: e.offsetTop, width: e.width, height: e.height } : { x: 0, y: 0, width: n.innerWidth, height: n.innerHeight };
}
function io({
  anchorRef: n,
  panelRef: e,
  open: t,
  contentRef: r,
  anchorRectRef: i,
  gap: o = 4,
  padding: s = 8,
  maxHeight: l,
  minHeight: a = 32,
  onPosition: c
}) {
  const u = Mn(), f = S(u);
  f.current = u;
  const d = S(c);
  d.current = c, ct(() => {
    if (!t) return;
    let h = 0, m = !1;
    const g = () => {
      h || (h = requestAnimationFrame(y));
    }, y = () => {
      if (h = 0, m) return;
      const A = f.current, B = n.current, H = e.current;
      if (!A || !B || !H || !H.isConnected) return;
      const C = (r == null ? void 0 : r.current) ?? H, J = gl(A), I = l ?? ro, W = Math.min(a, I), F = Math.max(0, H.offsetHeight - C.offsetHeight), V = Math.max(W, Math.ceil(C.scrollHeight + F)), K = Math.min(V, I);
      H.style.maxHeight = `${K}px`;
      let N = K;
      const O = i == null ? void 0 : i.current;
      js(O ? {
        getBoundingClientRect: () => ({
          left: O.left,
          top: O.top,
          width: O.width,
          height: O.height,
          right: O.left + O.width,
          bottom: O.top + O.height,
          x: O.left,
          y: O.top,
          toJSON: () => {
          }
        })
      } : B, H, {
        strategy: "fixed",
        placement: "bottom-start",
        middleware: [
          Yi(o),
          Ui({ boundary: J, padding: s, fallbackStrategy: "bestFit" }),
          Gi({ boundary: J, padding: s, mainAxis: !1 }),
          Ws({
            boundary: J,
            padding: s,
            apply({ availableHeight: le }) {
              N = Math.max(W, Math.floor(Math.min(I, le))), H.style.maxHeight = `${N}px`;
            }
          })
        ]
      }).then(({ x: le, y: G, placement: re }) => {
        m || d.current({
          top: Math.round(G),
          left: Math.round(le),
          maxH: N,
          side: re.startsWith("top") ? "top" : "bottom",
          ready: !0
        });
      });
    };
    y();
    const b = f.current, z = (b == null ? void 0 : b.document) ?? null, M = (b == null ? void 0 : b.visualViewport) ?? null, k = () => g();
    M == null || M.addEventListener("resize", k), M == null || M.addEventListener("scroll", k), b == null || b.addEventListener("resize", k), z == null || z.addEventListener("scroll", k, { capture: !0, passive: !0 });
    let E = null;
    return typeof ResizeObserver < "u" && (E = new ResizeObserver(k), e.current && E.observe(e.current), r != null && r.current && E.observe(r.current)), () => {
      m = !0, h && cancelAnimationFrame(h), M == null || M.removeEventListener("resize", k), M == null || M.removeEventListener("scroll", k), b == null || b.removeEventListener("resize", k), z == null || z.removeEventListener("scroll", k, { capture: !0 }), E == null || E.disconnect();
    };
  }, [t, n, e, r, i, o, s, l, a]);
}
let Ut = null;
function oo(n) {
  return Ut == null || Ut(), Ut = n, () => {
    Ut === n && (Ut = null);
  };
}
const so = Jt(null);
function Yr(n, e) {
  const t = n.mode ?? (e == null ? void 0 : e.mode) ?? "dark", r = n.surface ?? (e == null ? void 0 : e.surface) ?? "neutral", i = n.context ?? (e == null ? void 0 : e.context) ?? "surface", o = n.accent ?? (e == null ? void 0 : e.accent) ?? "zinc", s = n.accent !== void 0 && n.surface === void 0 && n.context === void 0;
  return { mode: t, accent: i === "chrome" || r === "accent" || s ? o : "zinc", surface: r, context: i };
}
function Ur({ theme: n, children: e }) {
  return /* @__PURE__ */ p(so.Provider, { value: n, children: e });
}
function Gd({ mode: n, accent: e, surface: t, context: r, children: i }) {
  const o = wt();
  return /* @__PURE__ */ p(Ur, { theme: Yr({ mode: n, accent: e, surface: t, context: r }, o), children: i });
}
function Xd({ mode: n, accent: e, surface: t, context: r, children: i, className: o, style: s }) {
  const l = wt(), a = Yr({ mode: n, accent: e, surface: t, context: r }, l);
  return /* @__PURE__ */ p(Ur, { theme: a, children: /* @__PURE__ */ p(
    "div",
    {
      "data-mode": a.mode,
      "data-accent": a.accent,
      "data-surface": a.surface,
      "data-context": a.context,
      className: o,
      style: s,
      children: i
    }
  ) });
}
function wt() {
  return Kt(so);
}
function yl(n, e = "dark") {
  return n ? n.context === "surface" ? n.mode : n.mode === "light" ? "light" : n.accent === "emerald" ? "emerald" : n.accent === "blue" ? "blue" : "dark" : e;
}
function lo(n, e) {
  if (n) return { theme: n, attrs: { "data-theme": n } };
  if (!e) return { theme: "dark", attrs: { "data-theme": "dark" } };
  if (e.context === "chrome") {
    const t = yl(e);
    return { theme: t, attrs: { "data-theme": t } };
  }
  return { theme: e.mode, attrs: { "data-mode": e.mode, "data-accent": e.accent } };
}
function xl(n, e = "light") {
  return (n == null ? void 0 : n.mode) ?? e;
}
function bl(n) {
  return !n || n.context !== "chrome" && n.surface !== "accent" ? !1 : n.accent === "emerald" ? "emerald" : n.accent === "blue";
}
const Gr = Jt("dark"), ao = () => Kt(Gr);
function Xr() {
  const n = Ie();
  return {
    padding: `${L(8, 12, n)}px ${L(12, 16, n)}px`,
    fontSize: `${L(12, 14, n)}px`,
    lineHeight: `${L(18, 22, n)}px`
  };
}
function co() {
  const n = Ie();
  return {
    padding: `${L(6, 9, n)}px ${L(12, 16, n)}px ${L(2, 3, n)}px`,
    fontSize: `${L(10, 11, n)}px`,
    lineHeight: `${L(14, 16, n)}px`
  };
}
const vl = (n) => n ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", pi = (n) => n ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", wl = (n) => n ? "text-xs" : "text-[10px]";
function cr(n) {
  const e = $e && Xi() > 0;
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
    headerPad: pi(e),
    headerText: `${pi(e)} font-semibold uppercase tracking-wider ${wl(e)} ui-label`,
    // Item padding
    itemPad: vl(e),
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
function uo(n) {
  const e = [];
  return Be.Children.forEach(n, (t) => {
    if (typeof t == "string" || typeof t == "number")
      e.push(String(t));
    else if (Be.isValidElement(t)) {
      const r = t.props.children;
      (typeof r == "string" || typeof r == "number") && e.push(String(r));
    }
  }), e.join(" ").trim();
}
const Qr = Jt({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), An = Jt(null), Zr = () => Kt(An), fo = Jt({ query: "", setQuery: () => {
} }), kl = () => Kt(fo), Sl = () => !0;
function ur(n) {
  const e = S([]), [t, r] = ee(-1), [i, o] = ee(!1), [s, l] = ee(0), a = oe((d) => (e.current = [...e.current, d], l((h) => h + 1), () => {
    e.current = e.current.filter((h) => h !== d), l((h) => h + 1);
  }), []), c = oe((d, h) => {
    r(d), o(h === "pointer");
  }, []), u = oe(() => {
    o((d) => d && (r(-1), !1));
  }, []);
  return lt(() => ({
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
function ho(n) {
  const e = Zr(), t = S(e);
  t.current = e;
  const r = S(null);
  te(() => {
    var a, c;
    const l = { label: n.label(), activate: n.activate, group: ((a = n.group) == null ? void 0 : a.trim()) || void 0 };
    return r.current = l, (c = t.current) == null ? void 0 : c.register(l);
  }, []);
  const i = e && r.current ? e.items.indexOf(r.current) : -1, o = !!e && !n.disabled && i >= 0 && i === e.highlightedIndex;
  return { api: e, myIndex: i, highlighted: o, setPointer: (l) => {
    !n.disabled && e && l >= 0 && e.setHighlighted(l, "pointer");
  } };
}
function ei(n, e, t, r) {
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
    var m, g, y, b, z;
    if (!s.current) return;
    const f = u.target;
    if (!!f && !!f.closest("input, textarea, [contenteditable]") && (u.key.length === 1 || u.key === "Enter" || u.key === "Escape")) {
      const M = (g = (m = l.current) == null ? void 0 : m.onFieldKey) == null ? void 0 : g.call(m, u);
      (!!((y = l.current) != null && y.onFieldKey) || o.current.items.length > 0) && (u.stopImmediatePropagation(), M && u.preventDefault());
      return;
    }
    const h = o.current.items;
    if (h.length !== 0) {
      if (u.key === "ArrowDown" || u.key === "ArrowUp") {
        u.preventDefault(), u.stopImmediatePropagation();
        const M = u.key === "ArrowDown" ? 1 : -1, k = (i.current + M + h.length) % h.length;
        o.current.setHighlighted(k, "keyboard");
      } else if (u.key === "ArrowRight") {
        u.preventDefault(), u.stopImmediatePropagation();
        const M = i.current;
        M >= 0 && M < h.length && h[M].submenu && h[M].activate();
      } else if (u.key === "ArrowLeft")
        u.preventDefault(), u.stopImmediatePropagation(), (z = (b = l.current) == null ? void 0 : b.onCloseSub) == null || z.call(b);
      else if (u.key === "Enter" || u.key === " ") {
        u.preventDefault(), u.stopImmediatePropagation();
        const M = i.current;
        M >= 0 && M < h.length && h[M].activate();
      } else if (u.key.length === 1 && !u.ctrlKey && !u.metaKey && !u.altKey) {
        u.preventDefault(), u.stopImmediatePropagation();
        const M = Date.now(), k = (M - a.current.time > 500 ? "" : a.current.text) + u.key.toLowerCase();
        if (a.current = { text: k, time: M }, !k) return;
        const E = i.current + 1;
        for (let A = 0; A < h.length; A++) {
          const B = (E + A) % h.length;
          if (h[B].label.toLowerCase().startsWith(k)) {
            o.current.setHighlighted(B, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function ti(n, e, t, r, i, o, s) {
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
function ni(n, e) {
  const t = S(n);
  t.current = n;
  const r = S(!1);
  r.current || (r.current = !0, e.current = (i) => {
    if (!t.current) return;
    const o = i.currentTarget, s = o.querySelector("[data-menu-items]") ?? o;
    s.scrollHeight > s.clientHeight && (i.preventDefault(), s.scrollTop += i.deltaY);
  });
}
function dr({
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
  searchFilter: m,
  searchValue: g,
  onSearchValueChange: y
}) {
  const b = wt(), z = lo(s, b), M = z.theme, [k, E] = ee([]), [A, B] = ee(null), H = cn(), C = qr(), J = S(null), I = S(null), W = S(n);
  W.current = n;
  const [F, V] = ee(n), [K, N] = ee(""), O = d && g !== void 0, Z = O ? g : K, le = O ? y ?? (() => {
  }) : N, [G, re] = ee(!1), v = O && !G ? "" : Z, q = S(null), j = Ie(), $ = {
    padding: `${L(8, 12, j)}px ${L(12, 16, j)}px`,
    fontSize: `${L(12, 14, j)}px`
  }, [ne, xe] = ee(0), ae = d && !O;
  te(() => {
    var _e;
    if (!ae || !n) return;
    const _ = (_e = I.current) == null ? void 0 : _e.querySelector("[data-menu-items]");
    if (!_) return;
    const X = () => xe(_.offsetWidth - _.clientWidth);
    X();
    const me = new ResizeObserver(X);
    return me.observe(_), () => me.disconnect();
  }, [n, ae, Z]);
  const je = lt(() => {
    if (!d) return;
    const _ = v.trim().toLowerCase();
    return _ ? (X) => {
      var me;
      return m ? m(_, X.label, X.group) : X.label.toLowerCase().includes(_) || (((me = X.group) == null ? void 0 : me.toLowerCase().includes(_)) ?? !1);
    } : Sl;
  }, [v, d, m]), D = ur(je), ce = d && v.trim() !== "" && D.items.length === 0;
  te(() => {
    if (n)
      return V(!0), O || N(""), re(!1), D.setHighlighted(f ?? -1, "keyboard"), oo(() => {
        t == null || t(!1), e == null || e();
      });
    E([]), re(!1);
  }, [n, f, t, e]), te(() => {
    if (!n || !C) return;
    const _ = (X) => {
      if (X.pointerType !== "touch") return;
      const me = X.target;
      me && (I.current && I.current.contains(me) || J.current && J.current.contains(me) || me instanceof Element && me.closest("[data-radix-menu-content]") || (t == null || t(!1), e == null || e()));
    };
    return C.addEventListener("pointerdown", _, { capture: !0 }), () => C.removeEventListener("pointerdown", _, { capture: !0 });
  }, [n, C, t, e]);
  const qe = oe(() => {
    const _ = J.current;
    if (!_) return null;
    const X = _.getBoundingClientRect();
    return { left: X.left, top: X.top, width: X.width, height: X.height };
  }, []), ue = ar({
    visible: n,
    morph: a,
    anchor: qe,
    onClosed: () => V(!1)
  }), De = S(() => {
  }), he = S(() => {
  }), Se = S(() => {
  }), Ce = oe((_) => {
    if (_.key === "Enter") {
      const X = D.highlightedIndex, me = D.items[X >= 0 ? X : 0];
      return me == null || me.activate(), !0;
    }
    return _.key === "Escape" ? (t == null || t(!1), e == null || e(), !0) : !1;
  }, [D, t, e]);
  ei(n && k.length === 0, D, De, { onFieldKey: Ce }), ni(n, he), ti(n, D, De, I, k.length > 0, Se, { ignoreFields: O });
  const ze = S(null), Oe = oe((_) => {
    var X;
    if (_) {
      _.addEventListener("keydown", De.current, { capture: !0 }), _.addEventListener("wheel", he.current, { passive: !1 });
      const me = _.ownerDocument;
      ze.current = me, me.addEventListener("keydown", Se.current, { capture: !0 }), Le(!0);
    } else
      (X = ze.current) == null || X.removeEventListener("keydown", Se.current, { capture: !0 }), ze.current = null, Le(!1);
    I.current = _, ue(_);
  }, [ue]), [Ne, $t] = ee({ top: 0, left: 0, maxH: ro, side: "bottom", ready: !1 }), [Xe, kt] = ee(0), [dn, Le] = ee(!1);
  te(() => {
    n && J.current && kt(J.current.getBoundingClientRect().width);
  }, [n]), io({
    anchorRef: J,
    panelRef: I,
    open: n && dn,
    maxHeight: u,
    onPosition: $t
  }), te(() => {
    var _;
    if (Ne.ready && n) {
      if (d) {
        (_ = q.current ?? J.current) == null || _.focus();
        return;
      }
      const X = I.current;
      X && X.ownerDocument.activeElement !== X && !X.contains(X.ownerDocument.activeElement) && X.focus();
    }
  }, [Ne.ready, n, d]), te(() => {
    if (!n || !d) return;
    if (D.items.length === 0) {
      D.highlightedIndex !== -1 && D.setHighlighted(-1, "keyboard");
      return;
    }
    const _ = D.highlightedIndex;
    (_ < 0 || _ >= D.items.length) && D.setHighlighted(0, "keyboard");
  }, [n, Z, d, D.items.length]), ct(() => {
    var X;
    if (!n || D.highlightedIndex < 0 || D.pointerDriven) return;
    const _ = (X = I.current) == null ? void 0 : X.querySelector(`[data-ei="${D.highlightedIndex}"]`);
    _ == null || _.scrollIntoView({ block: "nearest" });
  }, [n, D.highlightedIndex, D.pointerDriven]);
  const Dt = oe((_) => {
    !_ && !W.current || (!_ && ht.current && (yt.current = !0), t ? t(_) : _ || e == null || e());
  }, [t, e]), et = S(F);
  et.current = F;
  const ht = S(!1), yt = S(!1), Yt = oe(() => {
    if (!W.current && et.current) {
      if (yt.current) {
        yt.current = !1, ht.current = !1;
        return;
      }
      t == null || t(!0);
    }
  }, [t]), pt = Be.isValidElement(r) ? r : null, Ot = pt ? Be.cloneElement(pt, {
    ref: (_) => {
      J.current = _;
    },
    /* Radix's trigger primitive merges `type="button"` onto the child; a
       text field trigger-as-search must stay a text field. */
    ...O ? { type: pt.props.type ?? "text" } : {},
    onPointerDown: (_) => {
      var X;
      ht.current = !0, yt.current = !1, O && (_.preventDefault(), W.current || t == null || t(!0), (X = J.current) == null || X.focus());
    },
    /* Space is a printable search character, but Radix treats it as the
       trigger's open/close key. Keep it in the field. */
    onKeyDownCapture: (_) => {
      O && _.key === " " && _.stopPropagation();
    },
    onClick: (_) => {
      var X, me;
      (me = (X = pt.props).onClick) == null || me.call(X, _), Yt();
    },
    /* Combobox mode (externalSearch): the trigger field IS the search box,
       so it also drives the menu's keyboard — arrows move the single
       highlight, Enter activates the highlighted (or first visible) row,
       and a printable key flips the filter live (the committed value was
       just showing the full list until the first keystroke). */
    onKeyDown: (_) => {
      var X, me;
      if ((me = (X = pt.props).onKeyDown) == null || me.call(X, _), !(!O || !W.current)) {
        if (_.key.length === 1 && !_.ctrlKey && !_.metaKey && !_.altKey)
          re(!0);
        else if (_.key === "ArrowDown" || _.key === "ArrowUp") {
          _.preventDefault();
          const _e = D.items;
          if (_e.length === 0) return;
          const we = _.key === "ArrowDown" ? 1 : -1, ot = (D.highlightedIndex + we + _e.length) % _e.length;
          D.setHighlighted(ot, "keyboard");
        } else if (_.key === "Enter") {
          _.preventDefault();
          const _e = D.highlightedIndex, we = D.items[_e >= 0 ? _e : 0];
          we == null || we.activate();
        }
      }
    }
  }) : r, mt = /* @__PURE__ */ R("div", { "data-menu-search-empty": !0, className: "px-3 py-3 text-center", children: [
    /* @__PURE__ */ R("div", { className: "text-xs font-medium text-[color:var(--ui-text-muted)]", children: [
      "No matches for “",
      v.trim(),
      "”"
    ] }),
    /* @__PURE__ */ p("div", { className: "mt-0.5 text-[10px] text-[color:var(--ui-text-faint)]", children: "Try a different search." })
  ] }), ve = `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] min-w-0 ${ae ? "overflow-hidden" : "overflow-y-auto scrollbar-custom"}`;
  return /* @__PURE__ */ R(ye.Root, { open: n || F, onOpenChange: Dt, modal: !1, children: [
    /* @__PURE__ */ p(ye.Trigger, { asChild: !0, children: Ot }),
    /* @__PURE__ */ p(ye.Portal, { container: H ?? void 0, children: /* @__PURE__ */ p(Gr.Provider, { value: M, children: /* @__PURE__ */ p(Qr.Provider, { value: { chain: k, setChain: E, morph: a, keyboardOpened: A, setKeyboardOpened: B }, children: /* @__PURE__ */ p(An.Provider, { value: D, children: /* @__PURE__ */ p(fo.Provider, { value: { query: Z, setQuery: le }, children: /* @__PURE__ */ R(
      ye.Content,
      {
        ref: Oe,
        ...z.attrs,
        "data-ui-fixed": !0,
        className: `${ve} ${o || ""} ${c || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: Ne.left,
          top: Ne.top,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: o ? void 0 : Xe || void 0,
          maxHeight: Ne.maxH,
          visibility: Ne.ready ? "visible" : "hidden"
        },
        onPointerLeave: D.pointerLeave,
        onFocus: O ? (_) => {
          if (_.target !== _.currentTarget) return;
          const X = J.current;
          X && X.ownerDocument.activeElement !== X && X.focus();
        } : void 0,
        onCloseAutoFocus: O ? (_) => {
          var X;
          _.preventDefault(), (X = J.current) == null || X.focus();
        } : void 0,
        children: [
          ae && /* @__PURE__ */ p("div", { className: "shrink-0 px-0 pt-1 pb-1", style: { paddingRight: ne }, children: /* @__PURE__ */ R("div", { "data-menu-search": !0, className: "ui-item ui-item-highlighted flex items-center gap-2 rounded", style: $, children: [
            /* @__PURE__ */ p(Pt, { className: "w-3.5 h-3.5 shrink-0 ui-icon" }),
            /* @__PURE__ */ p(
              "input",
              {
                ref: q,
                value: Z,
                onChange: (_) => le(_.target.value),
                placeholder: h ?? "Search…",
                className: "flex-1 min-w-0 bg-transparent outline-none text-current placeholder:text-current placeholder:opacity-50 cursor-text"
              }
            ),
            Z ? /* @__PURE__ */ p(
              "button",
              {
                type: "button",
                tabIndex: -1,
                "aria-label": "Clear search",
                className: "shrink-0 ui-icon-btn rounded flex items-center justify-center p-1 -m-1",
                onPointerDown: (_) => _.stopPropagation(),
                onClick: () => {
                  var _;
                  le(""), (_ = q.current) == null || _.focus();
                },
                children: /* @__PURE__ */ p(_t, { className: "w-3.5 h-3.5" })
              }
            ) : /* @__PURE__ */ p("span", { className: "w-3.5 h-3.5 shrink-0" })
          ] }) }),
          ae ? /* @__PURE__ */ R("div", { "data-menu-items": !0, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: [
            l,
            ce && mt
          ] }) : /* @__PURE__ */ R(Ve, { children: [
            l,
            ce && mt
          ] })
        ]
      }
    ) }) }) }) }) })
  ] });
}
function Qd({
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
  readOnly: m = !1,
  theme: g,
  align: y,
  label: b,
  header: z,
  itemLabel: M,
  trigger: k,
  minItems: E = 1,
  itemRender: A,
  morph: B = !0,
  contentClassName: H
}) {
  const C = cr(), J = Xr(), [I, W] = ee(null), [F, V] = ee(""), K = S(F);
  K.current = F;
  const N = S(null), O = S(null);
  te(() => {
    n && requestAnimationFrame(() => {
      var v, q;
      (q = (v = O.current) == null ? void 0 : v.querySelector('[data-active="1"]')) == null || q.scrollIntoView({ block: "nearest" });
    });
  }, [n]), te(() => {
    var j;
    if (!n) return;
    const v = ($) => {
      var qe, ue, De;
      const ne = $.target;
      if (ne && ne.closest("input, textarea, [contenteditable]")) {
        I && ne === N.current && ($.key === "Enter" ? ($.preventDefault(), $.stopImmediatePropagation(), le()) : $.key === "Escape" && ($.preventDefault(), $.stopImmediatePropagation(), G()));
        return;
      }
      const xe = (qe = O.current) == null ? void 0 : qe.closest(".ui-menu");
      if (!xe || !xe.contains($.target)) return;
      const ae = xe.ownerDocument, je = [...xe.querySelectorAll('[data-active] > [role="menuitem"]:first-child')], D = [...xe.querySelectorAll('div:last-child > [role="menuitem"]')], ce = [...je, ...D];
      if ($.key === "ArrowDown" || $.key === "ArrowUp") {
        $.preventDefault(), $.stopImmediatePropagation();
        const he = ae.activeElement;
        let Se = he ? ce.indexOf(he) : -1;
        if (Se < 0 && he) {
          const Oe = he.closest("[data-active]"), Ne = Oe == null ? void 0 : Oe.querySelector('[role="menuitem"]:first-child');
          Ne && (Se = je.indexOf(Ne));
        }
        const Ce = $.key === "ArrowDown" ? 1 : -1, ze = Se < 0 ? Ce === 1 ? 0 : ce.length - 1 : (Se + Ce + ce.length) % ce.length;
        (ue = ce[ze]) == null || ue.focus({ preventScroll: !0 });
        return;
      }
      if ($.key === "ArrowLeft" || $.key === "ArrowRight") {
        const he = ae.activeElement, Se = he == null ? void 0 : he.closest("[data-active]");
        if (!Se) return;
        $.preventDefault(), $.stopImmediatePropagation();
        const Ce = [...Se.querySelectorAll('[role="menuitem"]')].slice(1);
        if (Ce.length === 0) return;
        const ze = he && Se.contains(he) ? Ce.indexOf(he) : -1, Oe = $.key === "ArrowRight" ? 1 : -1, Ne = ze < 0 ? 0 : (ze + Oe + Ce.length) % Ce.length;
        (De = Ce[Ne]) == null || De.focus({ preventScroll: !0 });
        return;
      }
    }, q = ((j = O.current) == null ? void 0 : j.ownerDocument) ?? null;
    return q == null || q.addEventListener("keydown", v, { capture: !0 }), () => q == null ? void 0 : q.removeEventListener("keydown", v, { capture: !0 });
  }, [n, I]), te(() => {
    if (!I) return;
    const v = t.find((ne) => ne.id === I);
    v && !F && V(v.name);
    const q = requestAnimationFrame(() => {
      const ne = N.current;
      ne && (ne.focus(), ne.select());
    });
    let j = 0;
    const $ = window.setInterval(() => {
      const ne = N.current;
      if (j++, !ne || j > 12) {
        clearInterval($);
        return;
      }
      ne.ownerDocument.activeElement !== ne && (ne.focus(), ne.select());
    }, 50);
    return () => {
      cancelAnimationFrame(q), clearInterval($);
    };
  }, [I]), te(() => {
    if (I) {
      const v = t.find((q) => q.id === I);
      v && !F && V(v.name);
    }
  }, [I, t]);
  const Z = (v, q) => {
    W(v), V(q);
  }, le = () => {
    I && K.current.trim() && o(I, K.current.trim()), W(null);
  }, G = () => {
    W(null);
  }, re = M || z.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ R(dr, { open: n, onOpenChange: (v) => {
    v ? (W(null), V("")) : (I && F.trim() && o(I, F.trim()), W(null), V("")), (!v || !m) && e(v);
  }, width: "w-80", theme: g, align: y, trigger: k, morph: B, contentClassName: H, children: [
    /* @__PURE__ */ p("div", { className: `shrink-0 ${C.headerText}`, children: z }),
    /* @__PURE__ */ p("div", { ref: O, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: t.map((v) => {
      const q = v.id === r, j = I === v.id;
      return /* @__PURE__ */ p("div", { "data-active": q ? "1" : void 0, className: `scroll-my-4 flex items-center gap-1 rounded ${q || j ? C.rowActiveBg : C.rowHoverBg} ${I && !j ? "opacity-40 pointer-events-none" : ""}`, children: j ? /* @__PURE__ */ R(Ve, { children: [
        /* @__PURE__ */ p("div", { className: "flex-1 min-w-0 flex items-center", children: /* @__PURE__ */ p(
          "input",
          {
            ref: N,
            autoFocus: !0,
            value: F,
            onChange: ($) => V($.target.value),
            onKeyDown: ($) => {
              $.key === "Enter" && ($.preventDefault(), $.stopPropagation(), le()), $.key === "Escape" && ($.preventDefault(), $.stopPropagation(), G());
            },
            className: "w-full outline-none bg-transparent placeholder:text-current placeholder:opacity-50",
            style: J
          }
        ) }),
        /* @__PURE__ */ p(
          ye.Item,
          {
            className: `shrink-0 ${C.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${C.editConfirm}`,
            onSelect: ($) => {
              $.preventDefault(), le();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ p(or, { className: C.btnIcon })
          }
        ),
        /* @__PURE__ */ p(
          ye.Item,
          {
            className: `shrink-0 ${C.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${C.editCancel}`,
            onSelect: ($) => {
              $.preventDefault(), G();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ p(_t, { className: C.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ R(Ve, { children: [
        /* @__PURE__ */ p(
          ye.Item,
          {
            style: J,
            className: `flex-1 min-w-0 rounded outline-none cursor-pointer flex items-center ${C.rowText} ${q ? "" : C.rowTextHover}`,
            onSelect: h ? () => {
              i(v.id);
            } : ($) => {
              $.preventDefault(), i(v.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ p("span", { className: `truncate ${q ? C.rowActiveText : ""}`, children: A ? A(v) : v.name })
          }
        ),
        /* @__PURE__ */ p(
          ye.Item,
          {
            className: `shrink-0 ${C.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${q ? C.btnActive : C.btnBase}`,
            onSelect: ($) => {
              $.preventDefault(), Z(v.id, v.name);
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: /* @__PURE__ */ p($s, { className: C.btnIcon })
          }
        ),
        /* @__PURE__ */ p(
          ye.Item,
          {
            className: `shrink-0 ${C.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${q ? C.btnActive : C.btnBase}`,
            onSelect: ($) => {
              $.preventDefault();
              const ne = s(v.id);
              ne && Z(ne, `${v.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: /* @__PURE__ */ p(Ki, { className: C.btnIcon })
          }
        ),
        /* @__PURE__ */ p(
          ye.Item,
          {
            className: `shrink-0 ${C.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${t.length <= E ? C.btnDisabled : q ? C.btnDangerActive : C.btnDanger}`,
            onSelect: ($) => {
              $.preventDefault(), l(v.id);
            },
            onTouchStart: () => {
            },
            disabled: m || t.length <= E,
            children: /* @__PURE__ */ p(Rr, { className: C.btnIcon })
          }
        )
      ] }) }, v.id);
    }) }),
    /* @__PURE__ */ R("div", { className: `shrink-0 ${I ? "opacity-40 pointer-events-none" : ""}`, children: [
      f && /* @__PURE__ */ R(Ve, { children: [
        /* @__PURE__ */ p(ye.Separator, { className: C.separator }),
        /* @__PURE__ */ R(
          ye.Item,
          {
            className: `w-full text-left ${C.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${C.itemDefault} ui-row`,
            onSelect: (v) => {
              v.preventDefault(), f();
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: [
              /* @__PURE__ */ p(Vi, { className: `${C.btnIcon} ${C.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (a || c || u || d) && /* @__PURE__ */ p(ye.Separator, { className: C.separator }),
      a && /* @__PURE__ */ R(
        ye.Item,
        {
          className: `w-full text-left ${C.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${C.itemDefault} ui-row`,
          onSelect: (v) => {
            v.preventDefault();
            const q = a();
            q && Z(q, "");
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ p(jr, { className: `${C.btnIcon} ${C.icon}` }),
            "New ",
            re
          ]
        }
      ),
      c && /* @__PURE__ */ R(
        ye.Item,
        {
          className: `w-full text-left ${C.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${C.itemDefault} ui-row`,
          onSelect: (v) => {
            v.preventDefault(), c();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ R("svg", { className: `${C.btnIcon} ${C.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ p("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ p("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ p("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      u && /* @__PURE__ */ R(
        ye.Item,
        {
          className: `w-full text-left ${C.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${C.itemDefault} ui-row`,
          onSelect: (v) => {
            v.preventDefault(), u();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ R("svg", { className: `${C.btnIcon} ${C.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ p("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ p("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ p("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      d && /* @__PURE__ */ R(
        ye.Item,
        {
          className: `w-full text-left ${C.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${C.itemDefault} ui-row`,
          onSelect: (v) => {
            v.preventDefault(), d();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ p(Rr, { className: `${C.btnIcon} ${C.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
function Nl({
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
  var C;
  ao();
  const f = cr(), d = Xr(), h = co(), m = S(!1), g = S(null), { myIndex: y, highlighted: b, setPointer: z, api: M } = ho({
    label: () => uo(o),
    activate: () => {
      t || n();
    },
    disabled: t,
    group: u
  }), { query: k } = kl(), E = k.trim() !== "" && y < 0, A = u == null ? void 0 : u.trim(), B = !!A && y >= 0 && (y === 0 || ((C = M == null ? void 0 : M.items[y - 1]) == null ? void 0 : C.group) !== A), H = r === "danger" ? f.itemDanger : f.itemDefault;
  return /* @__PURE__ */ R(Ve, { children: [
    B && /* @__PURE__ */ p(
      "div",
      {
        "data-menu-group": A,
        role: "presentation",
        className: "ui-label shrink-0 select-none font-semibold uppercase tracking-wider pointer-events-none",
        style: h,
        children: A
      }
    ),
    /* @__PURE__ */ R(
      ye.Item,
      {
        ref: g,
        "data-ei": y >= 0 ? y : void 0,
        style: { ...d, display: E ? "none" : void 0 },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${H} ${l ? "ui-item-selected" : ""} ${b ? "ui-item-highlighted" : ""} ${t ? "opacity-30 pointer-events-none" : ""} ${i}`,
        onSelect: (J) => {
          if (m.current) {
            m.current = !1;
            return;
          }
          s && J.preventDefault(), n();
        },
        onPointerEnter: () => {
          z(y);
        },
        onTouchStart: () => {
        },
        disabled: t,
        children: [
          e && /* @__PURE__ */ p("span", { className: `${f.icon} shrink-0`, children: e }),
          /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: o }),
          c && /* @__PURE__ */ p("span", { className: "shrink-0 ml-1 flex items-center", children: c }),
          a && /* @__PURE__ */ p(
            "span",
            {
              className: `shrink-0 ml-1 p-0.5 rounded ${f.rightAction}`,
              title: a.title,
              onPointerDown: (J) => {
                J.stopPropagation(), J.preventDefault(), m.current = !0, a.onClick();
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
function Tl({ id: n, label: e, icon: t, width: r, side: i = "right", children: o, contentClassName: s }) {
  const { chain: l, setChain: a, morph: c, keyboardOpened: u, setKeyboardOpened: f } = Kt(Qr), d = l.includes(n), h = l[l.length - 1] === n, m = ao(), g = cn(), y = S(null), b = S(null), [z, M] = ee(d), k = !d && z;
  te(() => {
    d && M(!0);
  }, [d]);
  const E = () => a((j) => {
    const $ = j.indexOf(n);
    return $ >= 0 ? j.slice(0, $) : j;
  }), A = ur(), B = Zr(), H = S(B);
  H.current = B;
  const C = S(null);
  te(() => {
    var $;
    const j = {
      label: e,
      activate: () => {
        f(n), a((ne) => ne.includes(n) ? ne : [...ne, n]);
      },
      submenu: !0
    };
    return C.current = j, ($ = H.current) == null ? void 0 : $.register(j);
  }, []);
  const J = B && C.current ? B.items.indexOf(C.current) : -1, I = J >= 0 && J === B.highlightedIndex, W = oe(() => {
    const j = y.current;
    if (!j) return null;
    const $ = j.getBoundingClientRect();
    return { left: $.left, top: $.top, width: $.width, height: $.height };
  }, []), F = ar({
    visible: d,
    morph: c,
    anchor: W,
    onClosed: () => M(!1)
  }), V = S(() => {
  }), K = S(() => {
  }), N = S(() => {
  });
  ei(d && h, A, V, {
    onCloseSub: () => {
      E(), B && J >= 0 && B.setHighlighted(J, "keyboard");
    }
  });
  const O = S(u);
  O.current = u, te(() => {
    d && (O.current === n ? (A.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var j;
      return (j = b.current) == null ? void 0 : j.focus();
    }), f(null)) : A.setHighlighted(-1, "keyboard"));
  }, [d]), ni(d, K), ti(d, A, V, b, !h, N), Be.useLayoutEffect(() => {
    var $;
    if (!d || A.highlightedIndex < 0 || A.pointerDriven) return;
    const j = ($ = b.current) == null ? void 0 : $.querySelector(`[data-ei="${A.highlightedIndex}"]`);
    j == null || j.scrollIntoView({ block: "nearest" });
  }, [d, A.highlightedIndex, A.pointerDriven]);
  const Z = S(null), le = oe((j) => {
    var $;
    if (j) {
      j.addEventListener("keydown", V.current, { capture: !0 }), j.addEventListener("wheel", K.current, { passive: !1 });
      const ne = j.ownerDocument;
      Z.current = ne, ne.addEventListener("keydown", N.current, { capture: !0 });
    } else
      ($ = Z.current) == null || $.removeEventListener("keydown", N.current, { capture: !0 }), Z.current = null;
    b.current = j, F(j);
  }, [F]), G = Ie(), re = { padding: `${L(8, 12, G)}px ${L(12, 16, G)}px`, fontSize: L(12, 14, G) }, v = `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${I ? " ui-item-highlighted" : ""}${k ? " ui-sub-closing" : ""}`, q = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${s || ""}`;
  return /* @__PURE__ */ R(ye.Sub, { open: d || z, onOpenChange: (j) => a(($) => {
    if (!j) {
      const ne = $.indexOf(n);
      return ne >= 0 ? $.slice(0, ne) : $;
    }
    return $.includes(n) ? $ : [...$, n];
  }), children: [
    /* @__PURE__ */ R(
      ye.SubTrigger,
      {
        ref: y,
        "data-ei": J >= 0 ? J : void 0,
        style: re,
        className: v,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          B && J >= 0 && B.setHighlighted(J, "pointer");
        },
        onPointerDown: (j) => {
          j.pointerType === "pen" && (j.preventDefault(), a(($) => d ? $.slice(0, $.indexOf(n)) : [...$, n]));
        },
        children: [
          i === "left" && /* @__PURE__ */ p(Un, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ R("span", { className: "flex items-center gap-2", children: [
            t && /* @__PURE__ */ p("span", { className: "ui-icon shrink-0", children: t }),
            e
          ] }),
          i === "right" && /* @__PURE__ */ p(Un, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ p(ye.Portal, { container: g ?? void 0, children: /* @__PURE__ */ p(
      ye.SubContent,
      {
        ref: le,
        "data-theme": m,
        className: q,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: A.pointerLeave,
        children: /* @__PURE__ */ p(An.Provider, { value: A, children: o })
      }
    ) })
  ] });
}
const mn = 8, Zd = ({ open: n, x: e, y: t, onClose: r, children: i, containerRef: o, theme: s, morph: l = !0 }) => {
  const a = wt(), c = s ? { theme: s, attrs: { "data-theme": s } } : a ? lo(void 0, a) : { theme: "light", attrs: { "data-theme": "light" } }, { theme: u } = c, f = Ie(), d = L(12, 14, f), h = S(null), m = Mn(), [g, y] = ee(!1), [b, z] = ee([]), [M, k] = ee(null), E = ur();
  te(() => {
    if (n)
      return E.setHighlighted(-1, "keyboard"), oo(r);
  }, [n, r]);
  const A = S({ left: e, top: t });
  n && (A.current = { left: e, top: t });
  const B = oe(() => ({ left: A.current.left, top: A.current.top, width: 0, height: 0 }), []), H = ar({
    visible: !0,
    morph: l,
    anchor: B,
    cloneOnUnmount: !0
  }), C = S(() => {
  }), J = S(() => {
  }), I = S(() => {
  });
  ei(n, E, C), ni(n, J), ti(n, E, C, h, b.length > 0, I);
  const W = S(null), F = oe((N) => {
    var O;
    if (N) {
      N.addEventListener("keydown", C.current, { capture: !0 }), N.addEventListener("wheel", J.current, { passive: !1 });
      const Z = N.ownerDocument;
      W.current = Z, Z.addEventListener("keydown", I.current, { capture: !0 });
    } else
      (O = W.current) == null || O.removeEventListener("keydown", I.current, { capture: !0 }), W.current = null;
    h.current = N, y(!!N), H(N);
  }, [H]), [V, K] = ee(null);
  return ct(() => {
    var ne;
    if (!n || !g || !h.current) return;
    const N = h.current, O = N.offsetWidth, Z = N.offsetHeight, le = (ne = o == null ? void 0 : o.current) == null ? void 0 : ne.getBoundingClientRect(), G = le ? le.right : (m == null ? void 0 : m.innerWidth) ?? 0, re = le ? le.bottom : (m == null ? void 0 : m.innerHeight) ?? 0, v = le ? le.left : 0, q = le ? le.top : 0;
    let j = Math.max(q + mn, A.current.top), $ = Math.max(v + mn, A.current.left);
    $ + O > G && ($ = G - O - mn), j + Z > re && (j = Math.max(q + mn, re - Z - mn)), K({ left: $, top: j });
  }, [n, g, e, t, o]), n ? /* @__PURE__ */ R(ye.Root, { open: n, onOpenChange: (N) => {
    N || r();
  }, modal: !1, children: [
    /* @__PURE__ */ p(ye.Trigger, { asChild: !0, children: /* @__PURE__ */ p("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ p(ye.Portal, { children: /* @__PURE__ */ p(Gr.Provider, { value: u, children: /* @__PURE__ */ p(Qr.Provider, { value: { chain: b, setChain: z, morph: l, keyboardOpened: M, setKeyboardOpened: k }, children: /* @__PURE__ */ p(An.Provider, { value: E, children: /* @__PURE__ */ p(
      ye.Content,
      {
        ref: F,
        ...c.attrs,
        "data-ui-fixed": !0,
        className: "fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom",
        style: { fontSize: d, left: (V == null ? void 0 : V.left) ?? A.current.left, top: (V == null ? void 0 : V.top) ?? A.current.top, touchAction: "manipulation" },
        onPointerLeave: E.pointerLeave,
        children: i
      }
    ) }) }) }) })
  ] }) : null;
}, ef = ({ onClick: n, variant: e = "default", icon: t, disabled: r = !1, selected: i = !1, trailing: o, children: s }) => {
  const l = Ie(), a = { padding: `${L(8, 12, l)}px ${L(12, 16, l)}px`, fontSize: L(12, 14, l) }, c = Zr(), u = S(c);
  u.current = c;
  const f = S(null);
  te(() => {
    var g;
    const m = { label: uo(s), activate: () => {
      r || n();
    } };
    return f.current = m, (g = u.current) == null ? void 0 : g.register(m);
  }, []);
  const d = c && f.current ? c.items.indexOf(f.current) : -1, h = !r && d >= 0 && d === c.highlightedIndex;
  return /* @__PURE__ */ R(
    ye.Item,
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
        /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: s }),
        o && /* @__PURE__ */ p("span", { className: "shrink-0 ml-1 flex items-center", children: o })
      ]
    }
  );
}, tf = () => /* @__PURE__ */ p(ye.Separator, { className: "ui-sep my-1" }), nf = (n) => /* @__PURE__ */ p(Tl, { ...n, width: n.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), pe = 8, po = "[data-modal-stack]", xt = 220, wn = "cubic-bezier(0.32, 0.72, 0, 1)", Jn = 0.94;
function Gt() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Mt(n) {
  if (!n) return { top: 0, height: 0, bottom: 0 };
  const e = n.visualViewport, t = e ? e.offsetTop : 0, r = e ? e.height : n.innerHeight;
  return { top: t, height: r, bottom: t + r };
}
function mo(n, e) {
  return `translate(${e.left - n.left}px, ${e.top - n.top}px) scale(${e.width / n.width}, ${e.height / n.height})`;
}
function mi(n, e, t, r) {
  const i = ++n.current, o = e.getBoundingClientRect();
  e.style.transition = "none", e.style.transform = mo(o, t), e.style.transformOrigin = "0 0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === i && (e.style.transition = `transform ${xt}ms ${wn}, opacity 180ms ease`, e.style.transform = "none", window.setTimeout(() => {
        n.current === i && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", r());
      }, xt + 80));
    });
  });
}
function El(n, e, t) {
  const r = ++n.current;
  e.style.transition = "none", e.style.transformOrigin = "center", e.style.transform = `scale(${Jn})`, e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === r && (e.style.transition = `transform ${xt}ms ${wn}`, e.style.transform = "none", window.setTimeout(() => {
        n.current === r && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", t());
      }, xt + 60));
    });
  });
}
function gi(n, e, t) {
  const r = ++n.current, i = e.getBoundingClientRect(), o = 1 - Jn, s = { left: i.left + i.width * o / 2, top: i.top + i.height * o / 2, width: i.width * Jn, height: i.height * Jn };
  e.style.transition = `transform ${xt}ms ${wn}, opacity 170ms ease`, e.style.transformOrigin = "0 0", e.style.transform = mo(i, s), e.style.opacity = "0", window.setTimeout(() => {
    n.current === r && (e.style.visibility = "hidden", t(), requestAnimationFrame(() => {
      n.current !== r || e.isConnected || (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", e.style.opacity = "", e.style.visibility = "");
    }));
  }, xt + 60);
}
function xr(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(po) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function On(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(po) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function Cl({
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
  accent: m
}) {
  const g = wt(), y = Yr(
    { mode: d, accent: m, surface: h, context: "surface" },
    g
  ), b = y.mode, z = y.surface, M = y.accent, k = S(null), E = S(null), A = S(null), B = Ie(), H = L(20, 24, B), C = L(10, 12, B), J = L(12, 14, B), I = L(14, 16, B), W = L(20, 24, B), F = L(20, 24, B), V = L(20, 24, B), K = L(14, 16, B), N = L(16, 20, B), O = L(10, 12, B), Z = L(12, 14, B), le = L(8, 10, B), G = L(4, 6, B), re = { padding: `${C}px ${H}px` }, v = { fontSize: J }, q = { padding: `${F}px ${W}px 16px ${W}px` }, j = { fontSize: I }, $ = { padding: `0 ${W}px 16px` }, ne = { padding: `${V}px ${W}px` }, xe = { fontSize: O, padding: `${G}px ${le}px` }, [ae, je] = ee(!1), D = oe((w) => {
    k.current = w, je(w !== null);
  }, []), ce = cn(), qe = Mn(), ue = S(qe);
  ue.current = qe;
  const [De, he] = ee(null), Se = S(null), Ce = S(!1), ze = S(!1), Oe = S(0), Ne = S({ w: 0, h: 0 }), $t = S(!1), [Xe, kt] = ee(!1), [dn, Le] = ee(!1), Dt = S(0), et = S(!1), [ht, yt] = ee(!1), Yt = S(a);
  Yt.current = a;
  const pt = S(!1), Ot = S(!1), mt = () => {
    Ot.current = !0, kt(!0);
  }, ve = () => {
    Ot.current = !1, kt(!1);
  };
  te(() => {
    n || (he(null), $t.current = !1, Ce.current = !1, Le(!1));
  }, [n]), ct(() => {
    if (!n || $t.current || !ae || !k.current) return;
    $t.current = !0;
    const w = k.current.getBoundingClientRect(), U = ue.current ?? null, Q = (U == null ? void 0 : U.innerWidth) ?? 0, de = Mt(U);
    he({
      left: Math.max(pe, Math.min((Q - w.width) / 2, Q - w.width - pe)),
      top: Math.max(de.top + pe, Math.min(de.top + (de.height - w.height) / 2, de.bottom - w.height - pe))
    });
  }, [n, ae]), ct(() => {
    if (!n || !ae || !a || Gt() || !k.current) return;
    const w = k.current, U = xr(w), Q = U[U.length - 1];
    mt(), Q ? mi(Dt, w, Q.getBoundingClientRect(), ve) : El(Dt, w, ve);
  }, [n, ae]);
  const _ = oe(() => {
    if (!u || et.current) return;
    const w = k.current, U = !!w && xr(w).length > 0;
    if (!w || !a || Gt() || U) {
      e();
      return;
    }
    et.current = !0, yt(!0), pt.current = !0, mt(), gi(Dt, w, () => {
      et.current = !1, yt(!1), ve(), e();
    });
  }, [a, e, u]), X = oe(() => {
    const w = k.current;
    if (!w || pt.current || !Yt.current || Gt() || xr(w).length > 0) return;
    const U = w.ownerDocument, Q = w.cloneNode(!0);
    Q.removeAttribute("data-modal-stack"), Q.removeAttribute("data-state"), Q.removeAttribute("role"), Q.removeAttribute("data-aria-hidden"), Q.removeAttribute("tabindex"), Q.setAttribute("aria-hidden", "true"), Q.style.pointerEvents = "none", U.body.appendChild(Q), gi({ current: 0 }, Q, () => {
      Q.isConnected && Q.remove();
    });
  }, []);
  ct(() => () => X(), [X]);
  const me = S(n);
  ct(() => {
    const w = me.current;
    me.current = n, w && !n && X();
  }, [n, ae, X]), te(() => {
    if (!n || !ae || !a || !k.current) return;
    const w = k.current, U = w.parentNode;
    if (!U) return;
    let Q = 0, de = null, fe = !1;
    const ge = () => {
      Q = 0;
      const Me = On(w);
      if (Me.length > 0)
        w.style.opacity = "", w.style.pointerEvents = "", de = Me[Me.length - 1].getBoundingClientRect(), fe = !0, Q = requestAnimationFrame(ge);
      else if (fe) {
        fe = !1, de && !Gt() && (mt(), mi(Dt, w, de, ve)), de = null;
        const Pe = ue.current ?? null;
        Pe == null || Pe.setTimeout(() => {
          !w || !w.isConnected || getComputedStyle(w).opacity !== "1" && (w.style.opacity = "1", w.style.pointerEvents = "");
        }, 240);
      }
    }, ke = new MutationObserver(() => {
      !Q && On(w).length > 0 && (Q = requestAnimationFrame(ge));
    });
    return ke.observe(U, { childList: !0 }), () => {
      ke.disconnect(), Q && cancelAnimationFrame(Q);
    };
  }, [n, ae]), te(() => {
    if (!ae || !a || Gt() || !k.current) return;
    const w = k.current;
    let U = Math.round(w.getBoundingClientRect().height), Q = !1;
    const de = new ResizeObserver(() => {
      if (!w.isConnected) return;
      const fe = Math.round(w.getBoundingClientRect().height);
      if (!Q) {
        Q = !0, U = fe;
        return;
      }
      if (Math.abs(fe - U) < 1) return;
      if (Se.current || et.current || On(w).length > 0) {
        U = fe;
        return;
      }
      if (Ot.current) return;
      const ge = U;
      U = fe, mt();
      const ke = w.getBoundingClientRect(), Me = Mt(ue.current ?? null), Pe = !Ce.current && !ze.current, Tt = Pe ? Me.top + (Me.height - ge) / 2 : ke.top, Ke = Pe ? Me.top + (Me.height - fe) / 2 : ke.top;
      w.style.transition = "none", w.style.height = `${ge}px`, Pe && (w.style.top = `${Tt}px`), E.current && (E.current.style.overflow = "hidden"), w.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          w.style.height === `${ge}px` && (w.style.transition = `height ${xt}ms ${wn}${Pe ? `, top ${xt}ms ${wn}` : ""}`, w.style.height = `${fe}px`, Pe && (w.style.top = `${Ke}px`), window.setTimeout(() => {
            w.style.height === `${fe}px` && (w.style.transition = "", w.style.height = "", E.current && (E.current.style.overflow = ""), Pe && he({ left: ke.left, top: Ke }), ve());
          }, xt + 60));
        });
      });
    });
    return de.observe(w), () => de.disconnect();
  }, [ae]), te(() => {
    if (!ae || !k.current || a && !Gt()) return;
    const w = k.current, U = new ResizeObserver(() => {
      if (!w.isConnected || Se.current || et.current || ze.current || On(w).length > 0) return;
      const Q = ue.current ?? null, de = Mt(Q), fe = (Q == null ? void 0 : Q.innerWidth) ?? 0, ge = w.getBoundingClientRect(), ke = Math.max(de.top + pe, Math.min(ge.top, de.bottom - ge.height - pe)), Me = Math.max(pe, Math.min(ge.left, fe - ge.width - pe));
      (Math.abs(ke - ge.top) > 0.5 || Math.abs(Me - ge.left) > 0.5) && he({ left: Me, top: ke });
    });
    return U.observe(w), () => U.disconnect();
  }, [ae, a]);
  const _e = oe(() => {
    const w = k.current;
    if (!w) return null;
    const U = w.getBoundingClientRect();
    return { left: U.left, top: U.top, width: U.width, height: U.height };
  }, []), we = oe((w, U) => {
    const Q = ue.current ?? null, de = (Q == null ? void 0 : Q.innerWidth) ?? 0, fe = Mt(Q), ge = _e(), ke = ge ? ge.width : Math.min(de - pe * 2, 576), Me = ge ? ge.height : Math.min(fe.height - pe * 2, 400);
    return {
      left: Math.max(pe, Math.min(w, de - ke - pe)),
      top: Math.max(fe.top + pe, Math.min(U, fe.bottom - Me - pe))
    };
  }, [_e]);
  te(() => {
    if (!n) return;
    const w = ue.current ?? null, U = (w == null ? void 0 : w.visualViewport) ?? null;
    if (!w || !U) return;
    const Q = 120;
    ze.current = !1, Ne.current = { w: w.innerWidth, h: w.innerHeight };
    let de = 0;
    const fe = () => {
      if (et.current || Se.current) return;
      const ke = (w == null ? void 0 : w.innerHeight) ?? 0, Me = (w == null ? void 0 : w.innerWidth) ?? 0, Tt = Mt(w).height < ke - Q, Ke = ke < Ne.current.h - Q && Me === Ne.current.w;
      Tt || Ke ? (ze.current = !0, Oe.current && (clearTimeout(Oe.current), Oe.current = 0)) : Oe.current || (Oe.current = (w == null ? void 0 : w.setTimeout(() => {
        ze.current = !1, Oe.current = 0, Le(!1);
      }, 600)) ?? 0), Le(ze.current), !de && (de = requestAnimationFrame(() => {
        var Et;
        de = 0;
        const pn = k.current;
        if (!pn) return;
        const x = Mt(ue.current ?? null), T = pn.getBoundingClientRect(), ie = ((Et = ue.current) == null ? void 0 : Et.innerWidth) ?? 0, se = (w == null ? void 0 : w.innerHeight) ?? 0, be = x.height < se - Q || se < Ne.current.h - Q && (w == null ? void 0 : w.innerWidth) === Ne.current.w;
        Ne.current = { w: (w == null ? void 0 : w.innerWidth) ?? 0, h: se };
        const Re = T.top >= x.top + pe && T.bottom <= x.bottom - pe, Ge = () => {
          he({
            left: Math.max(pe, Math.min((ie - T.width) / 2, ie - T.width - pe)),
            top: Math.max(x.top + pe, Math.min(x.top + (x.height - T.height) / 2, x.bottom - T.height - pe))
          });
        };
        if (be && !$e) {
          if (Ce.current) {
            Re || he(we(T.left, T.top));
            return;
          }
          if (Re) return;
          Ge();
          return;
        }
        if (!ze.current) {
          if (Ce.current) {
            Re || he(we(T.left, T.top));
            return;
          }
          Re || Ge();
        }
      }));
    };
    U.addEventListener("resize", fe), U.addEventListener("scroll", fe);
    const ge = () => {
      et.current || Se.current || de || (de = requestAnimationFrame(() => {
        de = 0;
        const ke = k.current;
        if (!ke) return;
        const Me = ue.current ?? null, Pe = Mt(Me), Tt = (Me == null ? void 0 : Me.innerWidth) ?? 0, Ke = ke.getBoundingClientRect();
        if (Ce.current) {
          he(we(Ke.left, Ke.top));
          return;
        }
        he({
          left: Math.max(pe, Math.min((Tt - Ke.width) / 2, Tt - Ke.width - pe)),
          top: Math.max(Pe.top + pe, Math.min(Pe.top + (Pe.height - Ke.height) / 2, Pe.bottom - Ke.height - pe))
        });
      }));
    };
    return w.addEventListener("orientationchange", ge), () => {
      U.removeEventListener("resize", fe), U.removeEventListener("scroll", fe), w.removeEventListener("orientationchange", ge), de && cancelAnimationFrame(de), Oe.current && clearTimeout(Oe.current);
    };
  }, [n, we]);
  const ot = oe((w) => {
    if (w.target.closest("button")) return;
    Ce.current = !0;
    const U = _e();
    U && (he(we(U.left, U.top)), Se.current = { startX: w.clientX, startY: w.clientY, posX: U.left, posY: U.top }, w.target.setPointerCapture(w.pointerId));
  }, [_e, we]), St = oe((w) => {
    const U = Se.current;
    U && (w.preventDefault(), he(we(U.posX + w.clientX - U.startX, U.posY + w.clientY - U.startY)));
  }, [we]), Nt = oe(() => {
    Se.current = null;
  }, []), fn = Se.current !== null, Qe = oe(() => {
    Ce.current = !1;
    const w = ue.current ?? null, U = Mt(w), Q = (w == null ? void 0 : w.innerWidth) ?? 0, de = k.current, fe = de ? de.getBoundingClientRect() : { width: 0, height: 0 };
    he({
      left: Math.max(pe, Math.min((Q - fe.width) / 2, Q - fe.width - pe)),
      top: Math.max(U.top + pe, Math.min(U.top + (U.height - fe.height) / 2, U.bottom - fe.height - pe))
    });
  }, []), gt = S(0), st = oe(() => {
    const w = Date.now();
    w - gt.current < 300 ? (gt.current = 0, Qe()) : gt.current = w;
  }, [Qe]), Lt = De !== null, In = Lt ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", zn = `${i ? `${i} w-full` : "max-w-xl w-full"}`, hn = {
    ...Lt ? { left: De.left, top: De.top } : {},
    width: `min(100%, calc(100dvw - ${pe * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...dn ? {} : { maxHeight: `calc(100dvh - ${pe * 2}px)` }
  }, $n = oe((w) => {
    if (w.key !== "Enter" || w.shiftKey || w.metaKey || w.ctrlKey || w.altKey) return;
    const U = w.target, Q = A.current;
    if (!(!!U.closest("[data-modal-close]") || !!Q && Q.contains(U) && !!U.closest('button, a, [role="button"]')) && U.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !Q) return;
    const fe = Array.from(Q.querySelectorAll("button[data-modal-confirm]")), ge = fe.length > 0 ? fe : Array.from(Q.querySelectorAll("button")), ke = ge[ge.length - 1];
    !ke || ke.disabled || (w.preventDefault(), ke.click());
  }, []);
  return /* @__PURE__ */ p(Ur, { theme: y, children: /* @__PURE__ */ p(Ct.Root, { open: n, onOpenChange: (w) => {
    w || _();
  }, children: /* @__PURE__ */ R(Ct.Portal, { container: ce ?? void 0, children: [
    /* @__PURE__ */ p(
      Ct.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${ht ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (w) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (w.preventDefault(), f && _());
        }
      }
    ),
    /* @__PURE__ */ R(
      Ct.Content,
      {
        ref: D,
        onKeyDown: $n,
        onInteractOutside: (w) => {
          f || w.preventDefault();
        },
        "data-modal-stack": !0,
        "data-mode": b,
        "data-accent": M,
        "data-surface": z,
        className: `ui-modal fixed z-[10000] bg-[var(--ui-modal-bg)] border border-[color:var(--ui-modal-border)] rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${In} ${zn}`,
        style: { touchAction: "manipulation", colorScheme: b, ...Object.keys(hn).length > 0 ? hn : {} },
        children: [
          c ? /* @__PURE__ */ R(
            "div",
            {
              style: q,
              className: `flex items-center justify-between ${fn ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (w) => {
                Xe || ot(w);
              },
              onPointerMove: St,
              onPointerUp: Nt,
              onClick: st,
              children: [
                /* @__PURE__ */ p(Ct.Title, { style: j, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t }),
                u && /* @__PURE__ */ p(Ct.Close, { "data-modal-close": !0, className: "text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ p(_t, { style: { width: N, height: N } }) })
              ]
            }
          ) : /* @__PURE__ */ R(
            "div",
            {
              style: re,
              className: `flex items-center justify-between border-b border-[color:var(--ui-modal-header-border)] shrink-0 bg-[var(--ui-modal-header-bg)] ${fn ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (w) => {
                Xe || ot(w);
              },
              onPointerMove: St,
              onPointerUp: Nt,
              onClick: st,
              children: [
                /* @__PURE__ */ R("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ p("span", { className: "text-[color:var(--ui-modal-icon)] shrink-0", children: r }),
                  /* @__PURE__ */ p(Ct.Title, { style: v, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t })
                ] }),
                /* @__PURE__ */ R("div", { className: "flex items-center gap-2", children: [
                  l && /* @__PURE__ */ R("button", { onClick: l, style: xe, className: "flex items-center gap-1 text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-muted-hover)] transition-colors bg-[var(--ui-modal-control-bg)] hover:bg-[var(--ui-modal-control-hover-bg)] rounded shrink-0", children: [
                    /* @__PURE__ */ p(Vi, { style: { width: Z, height: Z } }),
                    "Reset"
                  ] }),
                  u && /* @__PURE__ */ p(Ct.Close, { "data-modal-close": !0, className: "text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ p(_t, { style: { width: K, height: K } }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ p("div", { ref: E, "data-testid": "modal-body", style: c ? $ : void 0, className: "overflow-y-auto flex-1 bg-[var(--ui-modal-body-bg)] text-[color:var(--ui-modal-body-text)]", children: s }),
          o && /* @__PURE__ */ p("div", { ref: A, style: c ? ne : void 0, className: c ? "" : "shrink-0", children: c ? /* @__PURE__ */ p("div", { className: "flex items-center justify-end gap-2", children: o }) : o })
        ]
      }
    )
  ] }) }) });
}
function rf({ children: n }) {
  const e = Ie(), t = L(20, 24, e), r = L(8, 12, e);
  return /* @__PURE__ */ p("div", { className: "flex items-center justify-end gap-3 border-t border-[color:var(--ui-modal-border)] bg-[var(--ui-modal-footer-bg)]", style: { padding: `${r}px ${t}px` }, children: n });
}
const Ml = "inline-flex items-center gap-2 rounded-lg text-xs transition cursor-pointer select-none whitespace-nowrap active:shadow-[inset_0_0_0_2px_var(--ui-panel-bg)]", Rl = {
  zinc: "bg-[var(--ui-footer-hero-bg)] text-[color:var(--ui-footer-hero-text)] font-semibold border border-[color:var(--ui-footer-hero-border)] hover:bg-[var(--ui-footer-hero-hover-bg)] hover:border-[color:var(--ui-footer-hero-hover-border)] disabled:opacity-40 disabled:cursor-not-allowed",
  accent: "bg-[var(--ui-accent-solid)] text-[color:var(--ui-accent-action-text)] font-semibold border border-transparent hover:bg-[var(--ui-accent-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed",
  danger: "bg-[var(--ui-danger-solid)] text-white font-semibold border border-[color:var(--ui-danger-solid)] hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
}, Al = {
  /* Transparent border on every variant — auto-height buttons add the border
     to their height, so the bordered hero would otherwise be 2px taller. */
  ghost: "border border-transparent text-[color:var(--ui-text-muted)] font-medium hover:bg-[var(--ui-footer-ghost-hover-bg)] hover:text-[color:var(--ui-text-strong)] disabled:opacity-50",
  danger: "border border-transparent text-[color:var(--ui-danger-text)] font-medium hover:bg-[var(--ui-danger-hover-bg)] hover:text-[color:var(--ui-danger-hover-text)] disabled:opacity-50",
  "danger-solid": "border border-transparent bg-[var(--ui-danger-solid)] text-white font-semibold hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
};
function Ln({
  variant: n = "hero",
  tone: e = "zinc",
  className: t = "",
  type: r = "button",
  ...i
}) {
  const o = It({ px: 24, py: 8, fs: 12 }, { px: 28, py: 10, fs: 14 });
  return /* @__PURE__ */ p(
    "button",
    {
      type: r,
      style: o,
      className: `${Ml} ${n === "hero" ? Rl[e] : Al[n]} ${t}`,
      ...i
    }
  );
}
function go({ checked: n, size: e, tone: t = "accent" }) {
  return /* @__PURE__ */ p(
    "span",
    {
      className: `ui-check-indicator ${n ? "ui-check-indicator-checked" : ""} ${t === "danger" ? "ui-check-tone-danger" : ""}`,
      "aria-hidden": !0,
      children: n ? /* @__PURE__ */ R("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: [
        /* @__PURE__ */ p("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor", stroke: "var(--ui-check-ring)", strokeWidth: 1 }),
        /* @__PURE__ */ p("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "var(--ui-check-check)", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" })
      ] }) : /* @__PURE__ */ p("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: /* @__PURE__ */ p("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) })
    }
  );
}
function Il({ checked: n, onChange: e, disabled: t = !1, label: r, id: i, className: o = "", labelClassName: s = "", theme: l, variant: a = "pill", tone: c = "accent", block: u = !1 }) {
  const f = a !== "plain", d = Ie(), h = L(16, 20, d), m = L(12, 14, d), g = L(12, 14, d), y = L(12, 16, d), b = L(10, 12, d), z = L(8, 10, d);
  return /* @__PURE__ */ R(
    "label",
    {
      className: `ui-checkbox ${f ? "ui-checkbox-pill rounded-lg" : ""} ${c === "danger" ? "ui-checkbox-tone-danger" : ""} ${t ? "ui-disabled" : ""} ${o}`,
      style: { display: u ? "flex" : "inline-flex", alignItems: "center", gap: z, padding: f ? `${b}px ${y}px` : void 0 },
      onClick: (k) => k.stopPropagation(),
      ...l ? { "data-theme": l } : {},
      children: [
        /* @__PURE__ */ p(
          "input",
          {
            type: "checkbox",
            id: i,
            checked: n,
            disabled: t,
            onChange: (k) => e(k.target.checked),
            className: "sr-only"
          }
        ),
        f ? /* @__PURE__ */ p(go, { checked: n, size: h, tone: c }) : /* @__PURE__ */ p("span", { className: "ui-checkbox-box", style: { width: h, height: h }, "aria-hidden": !0, children: n && /* @__PURE__ */ p("svg", { viewBox: "0 0 12 12", fill: "none", style: { width: m, height: m }, "aria-hidden": !0, children: /* @__PURE__ */ p("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ p("span", { className: `ui-checkbox-label ${s}`, style: { fontSize: g }, children: r })
      ]
    }
  );
}
function $r(n = "md") {
  const e = $e && Xi() > 0;
  return n === "sm" ? `${e ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"} ui-input` : `${e ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs"} ui-input`;
}
function yo(n = "md") {
  return n === "sm" ? It({ px: 8, py: 6, fs: 12 }, { px: 12, py: 8, fs: 14 }) : It({ px: 10, py: 5, fs: 12 }, { px: 14, py: 9, fs: 14 });
}
const xo = Jt(null);
function of() {
  const n = Kt(xo);
  if (!n) throw new Error("useDialog must be used within DialogProvider");
  return n;
}
function sf({ children: n, theme: e, accent: t, surface: r }) {
  const [i, o] = ee(null), [s, l] = ee(!1), a = S(null), c = Ie(), u = L(16, 20, c), f = L(12, 14, c), d = yo(), h = S(i);
  h.current = i;
  const m = oe(() => {
    const E = h.current;
    E && (E.kind === "confirm" ? E.resolve(!1) : E.kind === "prompt" ? E.resolve(null) : E.resolve());
  }, []), g = oe((E) => {
    if (E.suppressKey) {
      const A = localStorage.getItem(E.suppressKey);
      if (A && Date.now() < parseInt(A, 10))
        return Promise.resolve(!0);
    }
    return new Promise((A) => {
      m(), l(!1), o({ kind: "confirm", options: E, resolve: A });
    });
  }, [m]), y = oe((E) => new Promise((A) => {
    m(), o({ kind: "prompt", options: E, resolve: A });
  }), [m]), b = oe((E) => new Promise((A) => {
    m(), o({ kind: "alert", options: E, resolve: A });
  }), [m]);
  te(() => {
    if (i) {
      const E = setTimeout(() => {
        var A;
        return (A = a.current) == null ? void 0 : A.focus();
      }, 50);
      return () => clearTimeout(E);
    }
  }, [i]);
  const z = oe(() => {
    var E, A;
    if (i) {
      if (i.kind === "confirm") {
        const B = i.options;
        B.suppressKey && s && localStorage.setItem(B.suppressKey, String(Date.now() + 864e5)), i.resolve(!0);
      } else i.kind === "prompt" ? i.resolve(((A = (E = a.current) == null ? void 0 : E.value) == null ? void 0 : A.trim()) || null) : i.resolve();
      o(null);
    }
  }, [i, s]), M = i !== null;
  te(() => {
    if (!M) return;
    const E = (A) => {
      A.key !== "Enter" || A.shiftKey || A.metaKey || A.ctrlKey || A.altKey || A.isComposing || (A.preventDefault(), A.stopImmediatePropagation(), z());
    };
    return document.addEventListener("keydown", E, !0), () => document.removeEventListener("keydown", E, !0);
  }, [M, z]);
  const k = oe(() => {
    i && (i.kind === "confirm" ? i.resolve(!1) : i.kind === "prompt" ? i.resolve(null) : i.resolve(), o(null));
  }, [i]);
  return /* @__PURE__ */ R(xo.Provider, { value: { confirm: g, prompt: y, alert: b }, children: [
    n,
    M && /* @__PURE__ */ p(
      Cl,
      {
        open: !0,
        onClose: k,
        closable: (i == null ? void 0 : i.kind) !== "alert",
        dismissOnBackdrop: (i == null ? void 0 : i.kind) !== "alert",
        title: (i == null ? void 0 : i.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: i && /* @__PURE__ */ R(Ve, { children: [
          i.kind !== "alert" && /* @__PURE__ */ p(Ln, { variant: "ghost", onClick: k, children: "Cancel" }),
          i.kind === "alert" ? /* @__PURE__ */ p(Ln, { onClick: z, children: "OK" }) : i.kind === "confirm" ? /* @__PURE__ */ p(
            Ln,
            {
              "data-modal-confirm": !0,
              variant: i.options.danger ? "danger-solid" : "hero",
              onClick: z,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ p(Ln, { "data-modal-confirm": !0, onClick: z, children: "Save" })
        ] }),
        children: /* @__PURE__ */ R("div", { className: "flex flex-col", style: { gap: u }, children: [
          (i == null ? void 0 : i.options.message) && /* @__PURE__ */ p("p", { style: { fontSize: f }, className: "text-[color:var(--ui-text-muted)] leading-relaxed", children: i.options.message }),
          (i == null ? void 0 : i.kind) === "confirm" && i.options.suppressKey && /* @__PURE__ */ p(
            Il,
            {
              block: !0,
              checked: s,
              onChange: l,
              tone: "danger",
              label: "Don't ask again (24 hours)"
            }
          ),
          (i == null ? void 0 : i.kind) === "prompt" && /* @__PURE__ */ p(
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
const zl = 500, $l = 250, Dl = 5, nt = 88, yi = 4;
function Ol(n, e) {
  const t = n.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  t.style.strokeDasharray = String(r), t.style.strokeDashoffset = String(r);
  const i = performance.now(), o = (s) => {
    const l = s - i, a = Math.min(l / e, 1);
    t.style.strokeDashoffset = String(r * (1 - a)), a < 1 && requestAnimationFrame(o);
  };
  requestAnimationFrame(o);
}
function Ll({ x: n, y: e, ms: t }) {
  const r = S(null), i = cn();
  return te(() => {
    r.current && Ol(r.current, t);
  }, [t]), sr(
    /* @__PURE__ */ p(
      "div",
      {
        style: {
          position: "fixed",
          left: n - nt / 2,
          top: e - nt / 2,
          width: nt,
          height: nt,
          zIndex: 99999,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ R("svg", { ref: r, width: nt, height: nt, viewBox: `0 0 ${nt} ${nt}`, children: [
          /* @__PURE__ */ p(
            "circle",
            {
              cx: nt / 2,
              cy: nt / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: yi + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ p(
            "circle",
            {
              cx: nt / 2,
              cy: nt / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: yi,
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
function lf() {
  return { "data-no-longpress": "true" };
}
function Pl(n) {
  const e = n.tagName;
  return !!(e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || e === "BUTTON" || n.isContentEditable || n.closest("[data-no-longpress]") || n.closest("button, input, select, textarea"));
}
function af({
  children: n,
  showRing: e = !0,
  longPressMs: t = zl,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: i,
  onLongPress: o
}) {
  const [s, l] = ee(null), a = qr(), c = S(null), u = S(null), f = S({ x: 0, y: 0, target: null }), d = S(!1), h = Math.min($l, t * 0.5), m = S(i);
  m.current = i;
  const g = S(o);
  return g.current = o, te(() => {
    if (!$e || !a) return;
    const y = (k) => {
      if (!Ar(k.pointerType) || k.button !== 0) return;
      const E = k.target;
      if (!E.closest(r) || (m.current ? !m.current(E) : Pl(E))) return;
      const A = k.clientX, B = k.clientY;
      f.current = { x: A, y: B, target: k.target }, d.current = !0, e && (u.current = setTimeout(() => l({ x: A, y: B }), h)), c.current = setTimeout(() => {
        if (!d.current) return;
        u.current && (clearTimeout(u.current), u.current = null), l(null);
        const H = f.current.target;
        if (!H) return;
        const C = g.current;
        if (C) {
          C(H, A, B);
          return;
        }
        const J = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: A,
          clientY: B,
          button: 2,
          view: window
        });
        H.dispatchEvent(J);
      }, t);
    }, b = (k) => {
      if (!d.current || c.current === null) return;
      const E = k.clientX - f.current.x, A = k.clientY - f.current.y;
      Math.sqrt(E * E + A * A) > Dl && (clearTimeout(c.current), c.current = null, u.current && (clearTimeout(u.current), u.current = null), d.current = !1, l(null));
    }, z = () => {
      c.current !== null && (clearTimeout(c.current), c.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), d.current = !1, l(null);
    }, M = (k) => {
      Ar(k.pointerType) && (c.current !== null && (clearTimeout(c.current), c.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), d.current = !1, l(null));
    };
    return a == null || a.addEventListener("pointerdown", y), a.addEventListener("pointermove", b), a.addEventListener("pointerup", z), a.addEventListener("pointercancel", z), a.addEventListener("pointerleave", M), () => {
      a.removeEventListener("pointerdown", y), a.removeEventListener("pointermove", b), a.removeEventListener("pointerup", z), a == null || a.removeEventListener("pointercancel", z), a == null || a.removeEventListener("pointerleave", M), c.current !== null && clearTimeout(c.current), u.current !== null && clearTimeout(u.current);
    };
  }, [e, t, h, r]), /* @__PURE__ */ R(Ve, { children: [
    n,
    e && s && /* @__PURE__ */ p(Ll, { x: s.x, y: s.y, ms: t - h })
  ] });
}
function cf() {
  const n = fl();
  return dl ? n === null || Ar(n) : !1;
}
const xi = "transition-[grid-template-columns] ease-out duration-150 group-hover:duration-200 motion-reduce:transition-none", Bl = "group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] group-data-[state=open]:grid-cols-[1fr]", Fl = "group-hover:grid-cols-[0fr] group-focus-visible:grid-cols-[0fr] group-data-[state=open]:grid-cols-[0fr]", Hl = "group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[state=open]:opacity-100";
function _l({ icon: n, collapse: e = !1, iconWithLabel: t = !0, active: r = !1, gap: i = 6, children: o }) {
  const s = !!e && !!n, l = s && !t, a = !!n && (t || s);
  return s ? /* @__PURE__ */ R(Ve, { children: [
    a && (l ? /* @__PURE__ */ p("span", { "data-kit-icon": !0, className: `grid min-w-0 ${xi} ${r ? "grid-cols-[0fr]" : `grid-cols-[1fr] ${Fl}`}`, children: /* @__PURE__ */ p("span", { className: "inline-flex min-w-0 items-center overflow-hidden", children: n }) }) : /* @__PURE__ */ p("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: n })),
    /* @__PURE__ */ p("span", { "data-kit-label": !0, className: `grid min-w-0 ${xi} ${r ? "grid-cols-[1fr]" : `grid-cols-[0fr] ${Bl}`}`, children: /* @__PURE__ */ p("span", { className: "min-w-0 overflow-hidden", children: /* @__PURE__ */ p(
      "span",
      {
        className: `flex min-w-0 items-center whitespace-nowrap transition-[opacity,padding-left] duration-100 group-hover:duration-150 motion-reduce:transition-none ${r ? "opacity-100" : `opacity-0 ${Hl}`} ${l ? `pl-[var(--kit-collapse-gap)] group-hover:pl-0! group-focus-visible:pl-0! group-data-[state=open]:pl-0! ${r ? "pl-0!" : ""}` : ""}`,
        style: l ? { "--kit-collapse-gap": `${i}px` } : { paddingLeft: i },
        children: o
      }
    ) }) })
  ] }) : /* @__PURE__ */ R(Ve, { children: [
    a && /* @__PURE__ */ p("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: n }),
    o
  ] });
}
const uf = {
  light: { plain: "bg-zinc-950", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" },
  dark: { plain: "bg-white", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" }
};
function at({
  variant: n = "subtle",
  theme: e,
  cloud: t,
  active: r = !1,
  iconOnly: i = !1,
  size: o = "default",
  icon: s,
  collapse: l = !1,
  iconWithLabel: a = !0,
  className: c = "",
  type: u = "button",
  children: f,
  ...d
}) {
  const h = wt(), m = e ?? (h == null ? void 0 : h.mode) ?? "light", g = t ?? bl(h), y = It({ px: 10, py: 7, fs: 12 }, { px: 14, py: 9, fs: 14 }), b = It({ px: 12, py: 7, fs: 12 }, { px: 16, py: 9, fs: 14 }), z = It({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), M = "", k = "", E = "inline-flex items-center rounded font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed", A = {
    light: {
      active: "text-white",
      inactive: "text-zinc-500 hover:text-zinc-900"
    },
    dark: {
      active: "text-zinc-900",
      inactive: "text-zinc-400 hover:text-zinc-200"
    }
  }, B = {
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
  }, H = {
    active: "text-zinc-900",
    inactive: "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800",
    open: "bg-zinc-800! text-white"
  }, C = {
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
  }, J = {
    light: {
      subtle: { base: `${M} text-zinc-600 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-900" },
      primary: { base: `${k} bg-zinc-900 hover:bg-zinc-800 text-white`, open: "bg-zinc-800!" },
      "danger-ghost": { base: `${M} text-rose-600 hover:bg-rose-50`, open: "bg-rose-50!" }
    },
    dark: {
      subtle: { base: `${M} text-zinc-400 hover:text-zinc-200 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-200" },
      primary: { base: `${k} bg-zinc-800 hover:bg-zinc-700 text-white`, open: "bg-zinc-700!" },
      "danger-ghost": { base: `${M} text-red-400 hover:bg-rose-950/40`, open: "bg-rose-950/40!" }
    }
  }, I = {
    blue: { base: `${k} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" },
    emerald: { base: `${k} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" }
  }, W = d["data-state"] === "open", F = J[m][n], V = n === "primary" ? b : n.startsWith("tab") ? z : y, K = $e ? { padding: "8px 12px", fontSize: "14px", lineHeight: "20px", border: "1px solid transparent" } : { padding: "6px 8px", fontSize: "12px", lineHeight: "16px", border: "1px solid transparent" }, N = L(6, 8, Ie()), O = L(28, 40, Ie()), Z = g === "emerald" ? "emerald" : g ? "blue" : null, le = "bg-[var(--ui-btn-active-bg)]! text-[color:var(--ui-btn-active-text)]!";
  let G;
  if (n === "tab") {
    const q = A[m];
    G = r ? Z ? B[Z].active : q.active : Z ? B[Z][m === "light" ? "inactiveLight" : "inactiveDark"] : q.inactive;
  } else if (n === "tab-header")
    G = `${Z ? r ? C[Z].active : C[Z].inactive : r ? H.active : H.inactive} ${W ? Z ? C[Z].open : H.open : ""}`;
  else if (G = `${F.base} ${W ? F.open : ""}`, r && (G = `${G} ${le}`), n === "primary" && Z) {
    const q = I[Z];
    G = W ? `${q.base} ${q.open}` : q.base;
  }
  const re = !!l && !!s && !i, v = i ? { width: O, height: O, padding: 0, gap: 0 } : o === "minimal" ? { ...K, gap: re ? 0 : N } : { ...V, gap: re ? 0 : N };
  return /* @__PURE__ */ p(
    "button",
    {
      type: u,
      "data-mode": m,
      "data-accent": h == null ? void 0 : h.accent,
      className: `${E} ${i ? "justify-center" : ""} ${re ? "group" : ""} ${G} ${c}`,
      style: v,
      ...d,
      children: i ? f : /* @__PURE__ */ p(_l, { icon: s, collapse: l, iconWithLabel: a, active: r, gap: N, children: f })
    }
  );
}
const jl = {
  border: "1px solid #d4d4d8",
  background: "rgba(255,255,255,0.94)",
  color: "#52525b",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
}, Wl = {
  border: "2px solid #2563eb",
  background: "#2563eb",
  color: "#fff",
  boxShadow: "0 4px 16px rgba(37,99,235,0.4)"
}, ql = {
  border: "1px solid #f59e0b",
  background: "rgba(255, 251, 235, 0.94)",
  color: "#b45309",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
};
function df({
  active: n = !1,
  warn: e = !1,
  style: t,
  className: r = "",
  type: i = "button",
  children: o,
  ...s
}) {
  return /* @__PURE__ */ p(
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
        ...e ? ql : n ? Wl : jl,
        ...t
      },
      ...s,
      children: o
    }
  );
}
const Jl = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Kl = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], br = 1900, vr = 2100;
function Vl(n, e) {
  return new Date(n, e + 1, 0).getDate();
}
function Yl(n, e, t) {
  return `${n}-${String(e + 1).padStart(2, "0")}-${String(t).padStart(2, "0")}`;
}
function ff({ selected: n, onChange: e, theme: t, showChips: r = !0, className: i = "", initialView: o }) {
  const s = wt(), l = t ?? (s == null ? void 0 : s.mode) ?? "light", a = /* @__PURE__ */ new Date(), c = (() => {
    if (!o) return a;
    const D = /* @__PURE__ */ new Date(o + "T00:00:00");
    return isNaN(D.getTime()) ? a : D;
  })(), [u, f] = ee(c.getFullYear()), [d, h] = ee(c.getMonth()), [m, g] = ee("days"), [y, b] = ee(null), z = lt(() => new Set(n), [n]), M = (D) => {
    z.has(D) ? e(n.filter((ce) => ce !== D)) : e([...n, D]);
  }, k = lt(() => {
    const D = Vl(u, d), ce = new Date(u, d, 1).getDay(), qe = [];
    for (let ue = 0; ue < ce; ue++) qe.push({ key: `pad-${ue}`, day: 0, empty: !0 });
    for (let ue = 1; ue <= D; ue++) qe.push({ key: Yl(u, d, ue), day: ue, empty: !1 });
    return qe;
  }, [u, d]), E = (D) => f((ce) => Math.max(br, Math.min(vr, ce + D))), A = (D) => {
    d + D < 0 ? (f((ce) => Math.max(br, ce - 1)), h(11)) : d + D > 11 ? (f((ce) => Math.min(vr, ce + 1)), h(0)) : h((ce) => ce + D);
  }, B = () => {
    if (y === null) return;
    const D = parseInt(y, 10);
    !isNaN(D) && D >= br && D <= vr && f(D), b(null);
  }, H = (D) => n.some((ce) => ce.startsWith(`${u}-${String(D + 1).padStart(2, "0")}`)), C = Ie(), J = L(4, 8, C), I = L(16, 20, C), W = L(10, 11, C), F = L(6, 8, C), V = L(12, 14, C), K = L(6, 10, C), N = L(12, 14, C), O = L(8, 12, C), Z = L(10, 12, C), le = L(6, 10, C), G = L(2, 6, C), re = L(64, 80, C), v = { padding: J }, q = { width: I, height: I }, j = { fontSize: W, paddingTop: F, paddingBottom: F }, $ = { fontSize: V, paddingTop: K, paddingBottom: K }, ne = { fontSize: N, paddingTop: O, paddingBottom: O }, xe = { fontSize: Z, padding: `${G}px ${le}px` }, ae = "bg-[var(--ui-date-selected-bg)] text-[color:var(--ui-date-selected-text)] hover:bg-[var(--ui-date-selected-hover-bg)]", je = "text-[color:var(--ui-text)] hover:bg-[var(--ui-card-hover)]";
  return /* @__PURE__ */ R("div", { "data-mode": l, "data-accent": s == null ? void 0 : s.accent, "data-surface": s == null ? void 0 : s.surface, className: `border rounded-lg overflow-hidden w-full border-[color:var(--ui-border-strong)] bg-[var(--ui-date-body-bg)] text-[color:var(--ui-text)] ${i}`, children: [
    /* @__PURE__ */ R("div", { className: "flex items-center justify-between px-3 py-2 border-b bg-[var(--ui-date-header-bg)] text-[color:var(--ui-date-header-text)] border-[color:var(--ui-border)]", children: [
      /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => m === "months" ? E(-1) : A(-1),
          style: v,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": m === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ p(Ds, { style: q })
        }
      ),
      m === "days" ? /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => g("months"),
          "aria-label": "Select year and month",
          className: "text-sm font-semibold rounded px-2 py-0.5 transition-colors text-[color:var(--ui-date-header-text)] hover:bg-[var(--ui-date-header-hover)]",
          children: new Date(u, d).toLocaleString("default", { month: "long", year: "numeric" })
        }
      ) : /* @__PURE__ */ p(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          "aria-label": "Year",
          value: y ?? String(u),
          onChange: (D) => b(D.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: (D) => D.target.select(),
          onBlur: B,
          onKeyDown: (D) => {
            D.key === "Enter" && (D.preventDefault(), B()), D.key === "Escape" && b(null);
          },
          style: { width: re },
          className: "text-sm text-center font-semibold rounded outline-none py-0.5 bg-[var(--ui-date-header-hover)] text-[color:var(--ui-date-header-text)]"
        }
      ),
      /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => m === "months" ? E(1) : A(1),
          style: v,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": m === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ p(Un, { style: q })
        }
      )
    ] }),
    m === "months" ? /* @__PURE__ */ R("div", { children: [
      /* @__PURE__ */ p("div", { className: "grid grid-cols-3 text-center", children: Kl.map((D, ce) => /* @__PURE__ */ R(
        "button",
        {
          type: "button",
          onClick: () => {
            h(ce), g("days");
          },
          style: ne,
          className: `relative font-medium transition-colors border-b border-[color:var(--ui-border)] ${ce === d ? ae : je}`,
          children: [
            D,
            H(ce) && /* @__PURE__ */ p("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${ce === d ? "bg-[var(--ui-date-selected-text)]" : "bg-[var(--ui-accent-solid)]"}` })
          ]
        },
        D
      )) }),
      /* @__PURE__ */ p("div", { className: "text-center border-t border-[color:var(--ui-border)]", children: /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => {
            f(a.getFullYear()), h(a.getMonth()), g("days");
          },
          style: { paddingTop: K, paddingBottom: K, fontSize: V },
          className: "px-3 font-semibold rounded transition-colors text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-card-hover)]",
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ R("div", { className: "grid grid-cols-7 text-center", children: [
      Jl.map((D) => /* @__PURE__ */ p("div", { style: j, className: "font-semibold uppercase tracking-wider border-b text-[color:var(--ui-text-faint)] border-[color:var(--ui-border)]", children: D }, D)),
      k.map((D) => D.empty ? /* @__PURE__ */ p("div", {}, D.key) : /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => M(D.key),
          style: $,
          className: `font-medium transition-colors border-b border-[color:var(--ui-border)] ${z.has(D.key) ? ae : je}`,
          children: D.day
        },
        D.key
      ))
    ] }),
    r && n.length > 0 && /* @__PURE__ */ R("div", { className: "px-3 py-2 border-t border-[color:var(--ui-border)] bg-[var(--ui-date-footer-bg)]", children: [
      /* @__PURE__ */ R("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-[color:var(--ui-text-muted)]", children: [
        n.length,
        " date",
        n.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ p("div", { className: "flex flex-wrap gap-1", children: n.map((D) => {
        const ce = /* @__PURE__ */ new Date(D + "T00:00:00"), qe = ce.getFullYear() === a.getFullYear() ? ce.toLocaleString("default", { month: "short", day: "numeric" }) : ce.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ R(
          "button",
          {
            type: "button",
            onClick: () => M(D),
            "aria-label": `Remove ${qe}`,
            style: xe,
            className: "inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors bg-[var(--ui-date-chip-bg)] text-[color:var(--ui-date-chip-text)] hover:bg-[var(--ui-date-chip-hover-bg)]",
            children: [
              qe,
              /* @__PURE__ */ p("span", { className: "leading-none text-[color:var(--ui-text-muted)]", "aria-hidden": "true", children: "×" })
            ]
          },
          D
        );
      }) })
    ] })
  ] });
}
function hf({
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
  const h = (k) => e instanceof Set ? e.has(k) : e.includes(k), m = Ie(), g = L(12, 16, m), y = L(8, 12, m), b = L(12, 14, m), z = L(16, 20, m), M = r != null || i != null;
  return /* @__PURE__ */ R("div", { className: d, ...f ? { "data-theme": f } : {}, children: [
    M && /* @__PURE__ */ R("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ p("span", { className: "ui-checklist-title", children: r }),
      i != null && /* @__PURE__ */ p("button", { type: "button", disabled: c, onClick: i, className: "ui-checklist-toggleall", children: s ?? (o ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ R(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${c ? "ui-checklist-disabled" : ""}`,
        style: a ? { maxHeight: a, overflowY: "auto" } : void 0,
        children: [
          n.map((k) => {
            const E = h(k.id), A = /* @__PURE__ */ p(go, { checked: E, size: z });
            return /* @__PURE__ */ R(
              "button",
              {
                type: "button",
                disabled: c,
                onClick: () => t(k.id),
                "aria-pressed": E,
                className: `ui-checklist-item ${E ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${y}px ${g}px`, fontSize: b },
                ...k.dataProps,
                children: [
                  u === "leading" && A,
                  k.leading != null && /* @__PURE__ */ p("span", { className: "ui-checklist-leading", children: k.leading }),
                  /* @__PURE__ */ p("span", { className: "ui-checklist-label", children: k.label }),
                  k.secondary != null && /* @__PURE__ */ p("span", { className: "ui-checklist-secondary", children: k.secondary }),
                  u === "trailing" && /* @__PURE__ */ p("span", { className: "ml-auto flex shrink-0", children: A })
                ]
              },
              k.id
            );
          }),
          n.length === 0 && /* @__PURE__ */ p("div", { className: "ui-checklist-empty", children: l })
        ]
      }
    )
  ] });
}
function pf({
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
  const u = Ie(), f = s ? 10 : L(12, 16, u), d = s ? 6 : L(8, 12, u), h = s ? 12 : L(12, 14, u), m = s ? 14 : L(16, 20, u);
  return /* @__PURE__ */ R("div", { className: c, ...a ? { "data-theme": a } : {}, children: [
    r != null && /* @__PURE__ */ p("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ p("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ R(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${l ? "ui-checklist-disabled" : ""}`,
        style: o ? { maxHeight: o, overflowY: "auto" } : void 0,
        children: [
          n.map((g) => {
            const y = e === g.id;
            return /* @__PURE__ */ R(
              "button",
              {
                type: "button",
                disabled: l,
                onClick: () => t(g.id),
                className: `ui-checklist-item ${y ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${d}px ${f}px`, fontSize: h },
                children: [
                  /* @__PURE__ */ p("span", { className: "ui-radio-circle", style: { width: m, height: m }, "aria-hidden": !0, children: y && /* @__PURE__ */ p("span", { className: "ui-radio-dot" }) }),
                  g.leading != null && /* @__PURE__ */ p("span", { className: "ui-checklist-leading", children: g.leading }),
                  /* @__PURE__ */ p("span", { className: "ui-checklist-label", children: g.label }),
                  g.secondary != null && /* @__PURE__ */ p("span", { className: "ui-checklist-secondary", children: g.secondary })
                ]
              },
              g.id
            );
          }),
          n.length === 0 && /* @__PURE__ */ p("div", { className: "ui-checklist-empty", children: i })
        ]
      }
    )
  ] });
}
const mf = ({
  className: n,
  children: e,
  reference: t,
  placement: r = "top",
  anchorMode: i = "visible",
  offset: o = 8
}) => {
  const s = Mn(), { refs: l, floatingStyles: a } = qs({
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
          var z;
          if (i !== "visible") return {};
          const u = (z = c.elements.floating.ownerDocument) == null ? void 0 : z.defaultView;
          if (!u) return {};
          const f = c.rects.reference, d = Math.max(f.x, 0), h = Math.max(f.y, 0), m = Math.min(f.x + f.width, u.innerWidth), g = Math.min(f.y + f.height, u.innerHeight);
          if (m <= d || g <= h) return {};
          const y = r === "left" ? m - (f.x + f.width) : r === "right" ? d - f.x : 0, b = r === "top" ? h - f.y : r === "bottom" ? g - (f.y + f.height) : 0;
          return { x: c.x + y, y: c.y + b };
        }
      },
      Yi(o),
      Ui({ padding: 8 }),
      Gi({ padding: 8 }),
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
          const f = c.rects.floating.width, d = c.rects.floating.height, h = Math.max(8, Math.min(c.x, u.innerWidth - f - 8)), m = Math.max(8, Math.min(c.y, u.innerHeight - d - 8));
          return { x: h, y: m };
        }
      }
    ],
    whileElementsMounted: Js
  });
  return ct(() => {
    t && l.setReference(t);
  }, [t, l]), /* @__PURE__ */ R(Ve, { children: [
    !t && /* @__PURE__ */ p("div", { ref: l.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    s && sr(
      /* @__PURE__ */ p(
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
function Ul(n, e) {
  if (!e || !Be.isValidElement(n)) return {};
  const t = n.props;
  if (t["aria-label"] || t.title) return {};
  const r = t.children;
  if (typeof r == "string" ? r.trim().length > 0 : Array.isArray(r) ? r.some((s) => typeof s == "string" && s.trim().length > 0) : !1) return {};
  const o = e.split(`
`)[0].replace(/^•\s*/, "").trim().slice(0, 80);
  return o ? { "aria-label": o } : {};
}
const Xt = ({ content: n, children: e }) => {
  const t = wt(), r = Ie(), i = L(10, 12, r), o = L(6, 6, r), s = L(10, 12, r), l = { padding: `${o}px ${i}px`, fontSize: s }, a = cn(), c = Mn(), [u, f] = ee(!1), [d, h] = ee({ x: 0, y: 0 }), m = S(null), g = S(null), y = () => {
    if (!m.current) return;
    const M = m.current.getBoundingClientRect();
    h({ x: M.left + M.width / 2, y: M.top });
  };
  te(() => () => {
    g.current && clearTimeout(g.current);
  }, []), te(() => (u && c && (y(), c.addEventListener("scroll", y, !0)), () => c == null ? void 0 : c.removeEventListener("scroll", y, !0)), [u]);
  const b = Ul(e, n), z = Object.keys(b).length > 0 ? Be.cloneElement(e, b) : e;
  return /* @__PURE__ */ R(
    "div",
    {
      ref: m,
      className: "inline-flex",
      onMouseEnter: () => {
        g.current && clearTimeout(g.current), y(), f(!0);
      },
      onMouseLeave: () => {
        g.current = setTimeout(() => f(!1), 60);
      },
      children: [
        z,
        u && sr(
          /* @__PURE__ */ R(
            "div",
            {
              "data-mode": t == null ? void 0 : t.mode,
              "data-accent": t == null ? void 0 : t.accent,
              className: "ui-tooltip fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-[color:var(--ui-tooltip-border)] bg-[var(--ui-tooltip-bg)] text-[color:var(--ui-tooltip-text)] pointer-events-none",
              style: { ...l, left: d.x, top: d.y - 4, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                n.split(`
• `).map((M, k) => /* @__PURE__ */ p("div", { className: k > 0 ? "mt-0.5 pt-0.5 border-t border-[color:var(--ui-tooltip-sep)]" : "", children: M }, k)),
                /* @__PURE__ */ p("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[color:var(--ui-tooltip-bg)]" })
              ]
            }
          ),
          a ?? document.body
        )
      ]
    }
  );
}, Gl = 250;
function Xl(n, e, t) {
  const [r, i] = Be.useState(null), [o, s] = Be.useState(!1), l = Be.useRef(null), a = Be.useRef(t);
  a.current = t;
  const c = Be.useCallback(() => {
    var d;
    const f = (d = e.current) == null ? void 0 : d[a.current];
    f && i({ left: f.offsetLeft, width: f.offsetWidth });
  }, [e]);
  Be.useLayoutEffect(() => {
    c();
  }, [t, c]), Be.useLayoutEffect(() => {
    const f = n.current;
    if (!f) return;
    const d = () => {
      s(!0), l.current && clearTimeout(l.current), l.current = setTimeout(() => s(!1), Gl), c();
    }, h = new ResizeObserver(d);
    h.observe(f);
    for (const m of e.current ?? []) m && h.observe(m);
    return () => {
      h.disconnect(), l.current && (clearTimeout(l.current), l.current = null);
    };
  }, [n, e, c]);
  const u = Be.useMemo(
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
function fr() {
  const n = Ie(), e = $e, t = e ? L(28, 40, n) : 28, r = e ? L(28, 40, n) : 28, i = e ? L(10, 14, n) : 10, o = e ? L(10, 14, n) : 10, s = e ? L(8, 10, n) : 8;
  return {
    toggle: { width: t, height: t },
    control: { height: r, padding: `0 ${i}px`, fontSize: o },
    input: { height: r, padding: `0 ${s}px`, fontSize: o }
  };
}
const gf = $e ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", Ql = $e ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", Pn = $e ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", Zl = "hover:bg-red-950/50", yf = $e ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", xf = "bg-[var(--ui-accent-selected-bg)] border-[var(--ui-border-strong)] text-[color:var(--ui-accent-selected-text)]", bf = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", ea = $e ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", vf = $e ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50", bo = $e ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", ta = "inline-flex rounded overflow-hidden border border-[var(--ui-border-strong)]", na = $e ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", Bn = ({ onClick: n, disabled: e, title: t, className: r = Ql, children: i }) => {
  const o = fr();
  return /* @__PURE__ */ p(Xt, { content: t, children: /* @__PURE__ */ p("button", { onClick: n, disabled: e, "aria-label": t, style: o.control, className: `${r} ${e ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) });
}, Fn = {
  wrap: "border-[color:var(--ui-border-strong)] bg-[var(--ui-seg-track-bg)]",
  pill: "bg-[var(--ui-seg-pill)]",
  active: "text-[color:var(--ui-accent-pill-text)]",
  idle: "text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-seg-hover)]"
}, wf = ({ value: n, options: e, onChange: t, disabled: r, active: i, stretch: o, dense: s, variant: l = "chrome", theme: a, tablist: c, ariaLabel: u }) => {
  const f = wt(), d = a ?? xl(f), h = a === "blue" || a === "emerald" ? a : (f == null ? void 0 : f.accent) ?? "zinc", m = { "data-mode": d === "dark" ? "dark" : "light", "data-accent": h }, g = fr(), y = s && !$e ? 24 : g.control.height, b = It({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), z = $e ? b : { padding: "0 12px", fontSize: 12, height: s ? 20 : 30 }, M = (H) => i ? i(H) : n === H, k = Be.useRef(null), E = Be.useRef([]), A = Math.max(0, e.findIndex((H) => M(H.v))), B = Xl(k, E, A);
  return l === "track" ? /* @__PURE__ */ R(
    "div",
    {
      ref: k,
      role: c ? "tablist" : "group",
      "aria-label": u,
      ...m,
      className: `relative inline-flex items-center rounded border p-0.5 ${o ? "w-full" : ""} ${Fn.wrap}`,
      children: [
        B.style && /* @__PURE__ */ p(
          "span",
          {
            "aria-hidden": !0,
            className: `absolute rounded ${Fn.pill} ${B.motionClass}`,
            style: { ...B.style, top: 2, bottom: 2 }
          }
        ),
        e.map((H, C) => {
          const J = M(H.v);
          return /* @__PURE__ */ R(
            "button",
            {
              ref: (I) => {
                E.current[C] = I;
              },
              ...H.dataProps,
              type: "button",
              disabled: r,
              onClick: () => t(H.v),
              title: H.title,
              role: c ? "tab" : void 0,
              "aria-selected": c ? J : void 0,
              "aria-pressed": c ? void 0 : J,
              "aria-label": H.ariaLabel ?? (H.l ? void 0 : H.title),
              style: z,
              className: `relative z-10 inline-flex cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap rounded font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${o ? "flex-1" : ""} ${J ? Fn.active : Fn.idle}`,
              children: [
                H.icon,
                H.l
              ]
            },
            H.v
          );
        })
      ]
    }
  ) : /* @__PURE__ */ R("div", { ref: k, className: `relative ${ta} bg-[var(--ui-seg-track-bg)]${o ? " w-full" : ""}`, children: [
    B.style && /* @__PURE__ */ p(
      "span",
      {
        "aria-hidden": !0,
        className: `absolute bg-[var(--ui-accent-pill-bg)] ${B.motionClass}`,
        style: { ...B.style, top: 0, bottom: 0 }
      }
    ),
    e.map((H, C) => {
      const J = M(H.v);
      return /* @__PURE__ */ R(
        "button",
        {
          ref: (I) => {
            E.current[C] = I;
          },
          ...H.dataProps,
          disabled: r,
          onClick: () => t(H.v),
          title: H.title,
          style: { ...g.control, height: y },
          className: `relative z-10 font-medium transition-colors disabled:opacity-30 ${o ? "flex-1" : ""} ${J ? "text-[color:var(--ui-accent-pill-text)]" : "text-[color:var(--ui-text-muted)] hover:bg-[var(--ui-accent-hover-bg)]"} ${H.v !== e[e.length - 1].v ? "border-r border-[var(--ui-border)]" : ""}`,
          children: [
            H.icon,
            H.l
          ]
        },
        H.v
      );
    })
  ] });
}, kf = ({ children: n }) => /* @__PURE__ */ R("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ p("span", { className: $e ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: n }),
  /* @__PURE__ */ p("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), ra = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", ia = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", Sf = ({ label: n, children: e, tall: t }) => /* @__PURE__ */ R("div", { className: t ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  n && /* @__PURE__ */ p("span", { className: t ? ra : ia, children: n }),
  e
] }), Nf = ({ leading: n, trailing: e, className: t = "" }) => /* @__PURE__ */ R("div", { className: `flex flex-wrap items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-0 ${t}`, children: [
  n,
  e && /* @__PURE__ */ p("div", { className: "ml-auto flex flex-wrap items-center justify-end gap-1", children: e })
] }), Tf = ({ readOnly: n, onDuplicate: e, onRemove: t, onMove: r, compact: i }) => (
  // One unbreakable cluster: when a header's trailing wraps, the move pair and
  // the duplicate/delete pair stay together (no orphaned icons on a line).
  /* @__PURE__ */ R("div", { className: "flex items-center gap-1 shrink-0", children: [
    /* @__PURE__ */ p(Bn, { onClick: () => r(-1), disabled: n, title: "Move up", className: Pn, children: /* @__PURE__ */ p(Os, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ p(Bn, { onClick: () => r(1), disabled: n, title: "Move down", className: Pn, children: /* @__PURE__ */ p(Ls, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ p(Bn, { onClick: e, disabled: n, title: "Duplicate", className: Pn, children: /* @__PURE__ */ p(Ki, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ p("div", { className: bo }),
    /* @__PURE__ */ p(Bn, { onClick: t, disabled: n, title: "Delete", className: `${Pn} ${Zl}`, children: /* @__PURE__ */ p(Rr, { className: "w-2.5 h-2.5" }) })
  ] })
);
var bi = Object.defineProperty, oa = (n, e) => {
  let t = {};
  for (var r in n) bi(t, r, {
    get: n[r],
    enumerable: !0
  });
  return bi(t, Symbol.toStringTag, { value: "Module" }), t;
};
function Je(n) {
  this.content = n;
}
Je.prototype = {
  constructor: Je,
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
    return i == -1 ? o.push(t || n, e) : (o[i + 1] = e, t && (o[i] = t)), new Je(o);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(n) {
    var e = this.find(n);
    if (e == -1) return this;
    var t = this.content.slice();
    return t.splice(e, 2), new Je(t);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(n, e) {
    return new Je([n, e].concat(this.remove(n).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(n, e) {
    var t = this.remove(n).content.slice();
    return t.push(n, e), new Je(t);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(n, e, t) {
    var r = this.remove(e), i = r.content.slice(), o = r.find(n);
    return i.splice(o == -1 ? i.length : o, 0, e, t), new Je(i);
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
    return n = Je.from(n), n.size ? new Je(n.content.concat(this.subtract(n).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(n) {
    return n = Je.from(n), n.size ? new Je(this.subtract(n).content.concat(n.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(n) {
    var e = this;
    n = Je.from(n);
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
Je.from = function(n) {
  if (n instanceof Je) return n;
  var e = [];
  if (n) for (var t in n) e.push(t, n[t]);
  return new Je(e);
};
function vo(n, e, t) {
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
      return a && a < s.length && a < l.length && So(s.charCodeAt(a - 1)) && ko(s.charCodeAt(a)) && t--, t;
    }
    if (i.content.size || o.content.size) {
      let s = vo(i.content, o.content, t + 1);
      if (s != null)
        return s;
    }
    t += i.nodeSize;
  }
}
function wo(n, e, t, r) {
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
      return f && d && f < c.length && So(c.charCodeAt(f - 1)) && ko(c.charCodeAt(f)) && (t++, r++), { a: t, b: r };
    }
    if (s.content.size || l.content.size) {
      let c = wo(s.content, l.content, t - 1, r - 1);
      if (c)
        return c;
    }
    t -= a, r -= a;
  }
}
function ko(n) {
  return n >= 56320 && n < 57344;
}
function So(n) {
  return n >= 55296 && n < 56320;
}
class P {
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
    return new P(i, this.size + e.size);
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
    return new P(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, t) {
    return e == t ? P.empty : e == 0 && t == this.content.length ? this : new P(this.content.slice(e, t));
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
    return i[e] = t, new P(i, o);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new P([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new P(this.content.concat(e), this.size + e.nodeSize);
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
    return vo(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, r = e.size) {
    return wo(this, e, t, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e) {
    if (e == 0)
      return Hn(0, e);
    if (e == this.size)
      return Hn(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let t = 0, r = 0; ; t++) {
      let i = this.child(t), o = r + i.nodeSize;
      if (o >= e)
        return o == e ? Hn(t + 1, o) : Hn(t, r);
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
      return P.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return P.fromArray(t.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return P.empty;
    let t, r = 0;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      r += o.nodeSize, i && o.isText && e[i - 1].sameMarkup(o) ? (t || (t = e.slice(0, i)), t[t.length - 1] = o.withText(t[t.length - 1].text + o.text)) : t && t.push(o);
    }
    return new P(t || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return P.empty;
    if (e instanceof P)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new P([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
P.empty = new P([], 0);
const wr = { index: 0, offset: 0 };
function Hn(n, e) {
  return wr.index = n, wr.offset = e, wr;
}
function Xn(n, e) {
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
      if (!Xn(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !Xn(n[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in n))
        return !1;
  }
  return !0;
}
let Te = class Dr {
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
    return this == e || this.type == e.type && Xn(this.attrs, e.attrs);
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
      return Dr.none;
    if (e instanceof Dr)
      return [e];
    let t = e.slice();
    return t.sort((r, i) => r.type.rank - i.type.rank), t;
  }
};
Te.none = [];
class kn extends Error {
}
class Y {
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
    let r = To(this.content, e + this.openStart, t, this.openStart + 1, this.openEnd + 1);
    return r && new Y(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new Y(No(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
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
      return Y.empty;
    let r = t.openStart || 0, i = t.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new Y(P.fromJSON(e, t.content), r, i);
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
    return new Y(e, r, i);
  }
}
Y.empty = new Y(P.empty, 0, 0);
function No(n, e, t) {
  let { index: r, offset: i } = n.findIndex(e), o = n.maybeChild(r), { index: s, offset: l } = n.findIndex(t);
  if (i == e || o.isText) {
    if (l != t && !n.child(s).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != s)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, o.copy(No(o.content, e - i - 1, t - i - 1)));
}
function To(n, e, t, r, i, o) {
  let { index: s, offset: l } = n.findIndex(e), a = n.maybeChild(s);
  if (l == e || a.isText)
    return o && r <= 0 && i <= 0 && !o.canReplace(s, s, t) ? null : n.cut(0, e).append(t).append(n.cut(e));
  let c = To(a.content, e - l - 1, t, s == 0 ? r - 1 : 0, s == n.childCount - 1 ? i - 1 : 0, a);
  return c && n.replaceChild(s, a.copy(c));
}
function sa(n, e, t) {
  if (t.openStart > n.depth)
    throw new kn("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new kn("Inconsistent open depths");
  return Eo(n, e, t, 0);
}
function Eo(n, e, t, r) {
  let i = n.index(r), o = n.node(r);
  if (i == e.index(r) && r < n.depth - t.openStart) {
    let s = Eo(n, e, t, r + 1);
    return o.copy(o.content.replaceChild(i, s));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let s = n.parent, l = s.content;
      return Ht(s, l.cut(0, n.parentOffset).append(t.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: s, end: l } = la(t, n);
      return Ht(o, Mo(n, s, l, e, r));
    }
  else return Ht(o, Qn(n, e, r));
}
function Co(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new kn("Cannot join " + e.type.name + " onto " + n.type.name);
}
function Or(n, e, t) {
  let r = n.node(t);
  return Co(r, e.node(t)), r;
}
function Ft(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t]) ? e[t] = n.withText(e[t].text + n.text) : e.push(n);
}
function xn(n, e, t, r) {
  let i = (e || n).node(t), o = 0, s = e ? e.index(t) : i.childCount;
  n && (o = n.index(t), n.depth > t ? o++ : n.textOffset && (Ft(n.nodeAfter, r), o++));
  for (let l = o; l < s; l++)
    Ft(i.child(l), r);
  e && e.depth == t && e.textOffset && Ft(e.nodeBefore, r);
}
function Ht(n, e) {
  if (!n.type.validContent(e))
    throw new kn("Invalid content for node " + n.type.name);
  return n.copy(e);
}
function Mo(n, e, t, r, i) {
  let o = n.depth > i && Or(n, e, i + 1), s = r.depth > i && Or(t, r, i + 1), l = [];
  return xn(null, n, i, l), o && s && e.index(i) == t.index(i) ? (Co(o, s), Ft(Ht(o, Mo(n, e, t, r, i + 1)), l)) : (o && Ft(Ht(o, Qn(n, e, i + 1)), l), xn(e, t, i, l), s && Ft(Ht(s, Qn(t, r, i + 1)), l)), xn(r, null, i, l), new P(l);
}
function Qn(n, e, t) {
  let r = [];
  if (xn(null, n, t, r), n.depth > t) {
    let i = Or(n, e, t + 1);
    Ft(Ht(i, Qn(n, e, t + 1)), r);
  }
  return xn(e, null, t, r), new P(r);
}
function la(n, e) {
  let t = e.depth - n.openStart, i = e.node(t).copy(n.content);
  for (let o = t - 1; o >= 0; o--)
    i = e.node(o).copy(P.from(i));
  return {
    start: i.resolveNoCache(n.openStart + t),
    end: i.resolveNoCache(i.content.size - n.openEnd - t)
  };
}
class Sn {
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
      return Te.none;
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
        return new Zn(this, e, r);
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
    return new Sn(t, r, o);
  }
  /**
  @internal
  */
  static resolveCached(e, t) {
    let r = vi.get(e);
    if (r)
      for (let o = 0; o < r.elts.length; o++) {
        let s = r.elts[o];
        if (s.pos == t)
          return s;
      }
    else
      vi.set(e, r = new aa());
    let i = r.elts[r.i] = Sn.resolve(e, t);
    return r.i = (r.i + 1) % ca, i;
  }
}
class aa {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const ca = 12, vi = /* @__PURE__ */ new WeakMap();
class Zn {
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
const ua = /* @__PURE__ */ Object.create(null);
let tn = class Lr {
  /**
  @internal
  */
  constructor(e, t, r, i = Te.none) {
    this.type = e, this.attrs = t, this.marks = i, this.content = r || P.empty;
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
    return this.type == e && Xn(this.attrs, t || e.defaultAttrs || ua) && Te.sameSet(this.marks, r || Te.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new Lr(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new Lr(this.type, this.attrs, this.content, e);
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
      return Y.empty;
    let i = this.resolve(e), o = this.resolve(t), s = r ? 0 : i.sharedDepth(t), l = i.start(s), c = i.node(s).content.cut(i.pos - l, o.pos - l);
    return new Y(c, i.depth - s, o.depth - s);
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
    return sa(this.resolve(e), this.resolve(t), r);
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
    return Sn.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return Sn.resolve(this, e);
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
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), Ro(this.marks, e);
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
  canReplace(e, t, r = P.empty, i = 0, o = r.childCount) {
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
    this.type.checkContent(this.content), wi(this.type.attrs, this.attrs, "node", this.type.name);
    let e = Te.none;
    for (let t = 0; t < this.marks.length; t++) {
      let r = this.marks[t];
      wi(r.type.attrs, r.attrs, "mark", r.type.name), e = r.addToSet(e);
    }
    if (!Te.sameSet(e, this.marks))
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
    let i = P.fromJSON(e, t.content);
    return e.nodeType(t.type).create(t.attrs, i, r);
  }
};
tn.prototype.text = void 0;
class er extends tn {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    if (super(e, t, null, i), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : Ro(this.marks, JSON.stringify(this.text));
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
    return e == this.marks ? this : new er(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new er(this.type, this.attrs, e, this.marks);
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
function Ro(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    e = n[t].type.name + "(" + e + ")";
  return e;
}
function wi(n, e, t, r) {
  for (let i in e)
    if (!(i in n))
      throw new RangeError(`Unsupported attribute ${i} for ${t} of type ${r}`);
  for (let i in n)
    n[i].validate && n[i].validate(e[i]);
}
class Wt {
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
    let r = new da(e, t);
    if (r.next == null)
      return Wt.empty;
    let i = Ao(r);
    r.next && r.err("Unexpected trailing text");
    let o = xa(ya(i));
    return ba(o, r), o;
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
        return P.from(l.map((c) => c.createAndFill()));
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
Wt.empty = new Wt(!0);
class da {
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
function Ao(n) {
  let e = [];
  do
    e.push(fa(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function fa(n) {
  let e = [];
  do
    e.push(ha(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function ha(n) {
  let e = ga(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = pa(n, e);
    else
      break;
  return e;
}
function ki(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function pa(n, e) {
  let t = ki(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = ki(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function ma(n, e) {
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
function ga(n) {
  if (n.eat("(")) {
    let e = Ao(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = ma(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function ya(n) {
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
function Io(n, e) {
  return e - n;
}
function Si(n, e) {
  let t = [];
  return r(e), t.sort(Io);
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
function xa(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(Si(n, 0));
  function t(r) {
    let i = [];
    r.forEach((s) => {
      n[s].forEach(({ term: l, to: a }) => {
        if (!l)
          return;
        let c;
        for (let u = 0; u < i.length; u++)
          i[u][0] == l && (c = i[u][1]);
        Si(n, a).forEach((u) => {
          c || i.push([l, c = []]), c.indexOf(u) == -1 && c.push(u);
        });
      });
    });
    let o = e[r.join(",")] = new Wt(r.indexOf(n.length - 1) > -1);
    for (let s = 0; s < i.length; s++) {
      let l = i[s][1].sort(Io);
      o.next.push({ type: i[s][0], next: e[l.join(",")] || t(l) });
    }
    return o;
  }
}
function ba(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let i = r[t], o = !i.validEnd, s = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: a, next: c } = i.next[l];
      s.push(a.name), o && !(a.isText || a.hasRequiredAttrs()) && (o = !1), r.indexOf(c) == -1 && r.push(c);
    }
    o && e.err("Only non-generatable nodes (" + s.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function zo(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault)
      return null;
    e[t] = r.default;
  }
  return e;
}
function $o(n, e) {
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
function Do(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      t[r] = new wa(n, r, e[r]);
  return t;
}
class tr {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = Do(e, r.attrs), this.defaultAttrs = zo(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
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
    return this.contentMatch == Wt.empty;
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
    return !e && this.defaultAttrs ? this.defaultAttrs : $o(this.attrs, e);
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
    return new tn(this, this.computeAttrs(e), P.from(t), Te.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = P.from(t), this.checkContent(t), new tn(this, this.computeAttrs(e), t, Te.setFrom(r));
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
    if (e = this.computeAttrs(e), t = P.from(t), t.size) {
      let s = this.contentMatch.fillBefore(t);
      if (!s)
        return null;
      t = s.append(t);
    }
    let i = this.contentMatch.matchFragment(t), o = i && i.fillBefore(P.empty, !0);
    return o ? new tn(this, e, t.append(o), Te.setFrom(r)) : null;
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
    return t ? t.length ? t : Te.none : e;
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null);
    e.forEach((o, s) => r[o] = new tr(o, t, s));
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
function va(n, e, t) {
  let r = t.split("|");
  return (i) => {
    let o = i === null ? "null" : typeof i;
    if (r.indexOf(o) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${n}, got ${o}`);
  };
}
class wa {
  constructor(e, t, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? va(e, t, r.validate) : r.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class hr {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    this.name = e, this.rank = t, this.schema = r, this.spec = i, this.attrs = Do(e, i.attrs), this.excluded = null;
    let o = zo(this.attrs);
    this.instance = o ? new Te(this, o) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new Te(this, $o(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((o, s) => r[o] = new hr(o, i++, t, s)), r;
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
class ka {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let i in e)
      t[i] = e[i];
    t.nodes = Je.from(e.nodes), t.marks = Je.from(e.marks || {}), this.nodes = tr.compile(this.spec.nodes, this), this.marks = hr.compile(this.spec.marks, this);
    let r = /* @__PURE__ */ Object.create(null);
    for (let i in this.nodes) {
      if (i in this.marks)
        throw new RangeError(i + " can not be both a node and a mark");
      let o = this.nodes[i], s = o.spec.content || "", l = o.spec.marks;
      if (o.contentMatch = r[s] || (r[s] = Wt.parse(s, this.nodes)), o.inlineContent = o.contentMatch.inlineContent, o.spec.linebreakReplacement) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!o.isInline || !o.isLeaf)
          throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
        this.linebreakReplacement = o;
      }
      o.markSet = l == "_" ? null : l ? Ni(this, l.split(" ")) : l == "" || !o.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let o = this.marks[i], s = o.spec.excludes;
      o.excluded = s == null ? [o] : s == "" ? [] : Ni(this, s.split(" "));
    }
    this.nodeFromJSON = (i) => tn.fromJSON(this, i), this.markFromJSON = (i) => Te.fromJSON(this, i), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
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
    else if (e instanceof tr) {
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
    return new er(r, r.defaultAttrs, e, Te.setFrom(t));
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
function Ni(n, e) {
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
function Sa(n) {
  return n.tag != null;
}
function Na(n) {
  return n.style != null;
}
class nn {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, t) {
    this.schema = e, this.rules = t, this.tags = [], this.styles = [];
    let r = this.matchedStyles = [];
    t.forEach((i) => {
      if (Sa(i))
        this.tags.push(i);
      else if (Na(i)) {
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
    let r = new Ei(this, t, !1);
    return r.addAll(e, Te.none, t.from, t.to), r.finish();
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
    let r = new Ei(this, t, !0);
    return r.addAll(e, Te.none, t.from, t.to), Y.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let o = this.tags[i];
      if (Ca(e, o.tag) && (o.namespace === void 0 || e.namespaceURI == o.namespace) && (!o.context || t.matchesContext(o.context))) {
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
        r(s = Ci(s)), s.mark || s.ignore || s.clearMark || (s.mark = i);
      });
    }
    for (let i in e.nodes) {
      let o = e.nodes[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = Ci(s)), s.node || s.ignore || s.mark || (s.node = i);
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
    return e.cached.domParser || (e.cached.domParser = new nn(e, nn.schemaRules(e)));
  }
}
const Oo = {
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
}, Ta = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, Lo = { ol: !0, ul: !0 }, Nn = 1, Pr = 2, bn = 4;
function Ti(n, e, t) {
  return e != null ? (e ? Nn : 0) | (e === "full" ? Pr : 0) : n && n.whitespace == "pre" ? Nn | Pr : t & ~bn;
}
class _n {
  constructor(e, t, r, i, o, s) {
    this.type = e, this.attrs = t, this.marks = r, this.solid = i, this.options = s, this.content = [], this.activeMarks = Te.none, this.match = o || (s & bn ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let t = this.type.contentMatch.fillBefore(P.from(e));
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
    if (!(this.options & Nn)) {
      let r = this.content[this.content.length - 1], i;
      if (r && r.isText && (i = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let o = r;
        r.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = o.withText(o.text.slice(0, o.text.length - i[0].length));
      }
    }
    let t = P.from(this.content);
    return !e && this.match && (t = t.append(this.match.fillBefore(P.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Oo.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class Ei {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0, this.localPreserveWS = !1;
    let i = t.topNode, o, s = Ti(null, t.preserveWhitespace, 0) | (r ? bn : 0);
    i ? o = new _n(i.type, i.attrs, Te.none, !0, t.topMatch || i.type.contentMatch, s) : r ? o = new _n(null, null, Te.none, !0, null, s) : o = new _n(e.schema.topNodeType, null, Te.none, !0, null, s), this.nodes = [o], this.find = t.findPositions, this.needsBlock = !1;
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
    let r = e.nodeValue, i = this.top, o = i.options & Pr ? "full" : this.localPreserveWS || (i.options & Nn) > 0, { schema: s } = this.parser;
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
    Lo.hasOwnProperty(s) && this.parser.normalizeLists && Ea(e);
    let a = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, r));
    e: if (a ? a.ignore : Ta.hasOwnProperty(s))
      this.findInside(e), this.ignoreFallback(e, t);
    else if (!a || a.skip || a.closeParent) {
      a && a.closeParent ? this.open = Math.max(0, this.open - 1) : a && a.skip.nodeType && (e = a.skip);
      let c, u = this.needsBlock;
      if (Oo.hasOwnProperty(s))
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
      let s = Te.none;
      for (let l of i.concat(e.marks))
        (o.type ? o.type.allowsMarkType(l.type) : Mi(l.type, e.type)) && (s = l.addToSet(s));
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
    let l = Ti(e, o, s.options);
    s.options & bn && s.content.length == 0 && (l |= bn);
    let a = Te.none;
    return r = r.filter((c) => (s.type ? s.type.allowsMarkType(c.type) : Mi(c.type, e)) ? (a = c.addToSet(a), !1) : !0), this.nodes.push(new _n(e, t, a, i, null, l)), this.open++, r;
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
      this.localPreserveWS && (this.nodes[t].options |= Nn);
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
function Ea(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && Lo.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function Ca(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function Ci(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function Mi(n, e) {
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
const Po = 65535, Bo = Math.pow(2, 16);
function Ma(n, e) {
  return n + e * Bo;
}
function Ri(n) {
  return n & Po;
}
function Ra(n) {
  return (n - (n & Po)) / Bo;
}
const Fo = 1, Ho = 2, Kn = 4, _o = 8;
class Br {
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
    return (this.delInfo & _o) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (Fo | Kn)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (Ho | Kn)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & Kn) > 0;
  }
}
class tt {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, t = !1) {
    if (this.ranges = e, this.inverted = t, !e.length && tt.empty)
      return tt.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let t = 0, r = Ri(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + t + Ra(e);
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
        let m = e == (t < 0 ? a : f) ? null : Ma(l / 3, e - a), g = e == a ? Ho : e == f ? Fo : Kn;
        return (t < 0 ? e != a : e != f) && (g |= _o), new Br(h, g, m);
      }
      i += u - c;
    }
    return r ? e + i : new Br(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, i = Ri(t), o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
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
    return new tt(this.ranges, !this.inverted);
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
    return e == 0 ? tt.empty : new tt(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
tt.empty = new tt([]);
class nr {
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
    return new nr(this._maps, this.mirror, e, t);
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
    let e = new nr();
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
    return r ? e : new Br(e, i, null);
  }
}
const kr = /* @__PURE__ */ Object.create(null);
class Ue {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return tt.empty;
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
    let r = kr[t.stepType];
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
    if (e in kr)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return kr[e] = t, t.prototype.jsonID = e, t;
  }
}
class He {
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
    return new He(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new He(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, t, r, i) {
    try {
      return He.ok(e.replace(t, r, i));
    } catch (o) {
      if (o instanceof kn)
        return He.fail(o.message);
      throw o;
    }
  }
}
function ri(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let o = n.child(i);
    o.content.size && (o = o.copy(ri(o.content, e, o))), o.isInline && (o = e(o, t, i)), r.push(o);
  }
  return P.fromArray(r);
}
class Rt extends Ue {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new Y(ri(t.content, (s, l) => !s.isAtom || !l.type.allowsMarkType(this.mark.type) ? s : s.mark(this.mark.addToSet(s.marks)), i), t.openStart, t.openEnd);
    return He.fromReplace(e, this.from, this.to, o);
  }
  invert() {
    return new ut(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new Rt(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof Rt && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new Rt(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new Rt(t.from, t.to, e.markFromJSON(t.mark));
  }
}
Ue.jsonID("addMark", Rt);
class ut extends Ue {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new Y(ri(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
    return He.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new Rt(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new ut(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof ut && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new ut(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new ut(t.from, t.to, e.markFromJSON(t.mark));
  }
}
Ue.jsonID("removeMark", ut);
class At extends Ue {
  /**
  Create a node mark step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return He.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return He.fromReplace(e, this.pos, this.pos + 1, new Y(P.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    if (t) {
      let r = this.mark.addToSet(t.marks);
      if (r.length == t.marks.length) {
        for (let i = 0; i < t.marks.length; i++)
          if (!t.marks[i].isInSet(r))
            return new At(this.pos, t.marks[i]);
        return new At(this.pos, this.mark);
      }
    }
    return new qt(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new At(t.pos, this.mark);
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
    return new At(t.pos, e.markFromJSON(t.mark));
  }
}
Ue.jsonID("addNodeMark", At);
class qt extends Ue {
  /**
  Create a mark-removing step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return He.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return He.fromReplace(e, this.pos, this.pos + 1, new Y(P.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new At(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new qt(t.pos, this.mark);
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
    return new qt(t.pos, e.markFromJSON(t.mark));
  }
}
Ue.jsonID("removeNodeMark", qt);
class Fe extends Ue {
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
    return this.structure && Fr(e, this.from, this.to) ? He.fail("Structure replace would overwrite content") : He.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new tt([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new Fe(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let t = e.mapResult(this.to, -1), r = this.from == this.to && Fe.MAP_BIAS < 0 ? t : e.mapResult(this.from, 1);
    return r.deletedAcross && t.deletedAcross ? null : new Fe(r.pos, Math.max(r.pos, t.pos), this.slice, this.structure);
  }
  merge(e) {
    if (!(e instanceof Fe) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let t = this.slice.size + e.slice.size == 0 ? Y.empty : new Y(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new Fe(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? Y.empty : new Y(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new Fe(e.from, this.to, t, this.structure);
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
    return new Fe(t.from, t.to, Y.fromJSON(e, t.slice), !!t.structure);
  }
}
Fe.MAP_BIAS = 1;
Ue.jsonID("replace", Fe);
class We extends Ue {
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
    if (this.structure && (Fr(e, this.from, this.gapFrom) || Fr(e, this.gapTo, this.to)))
      return He.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return He.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? He.fromReplace(e, this.from, this.to, r) : He.fail("Content does not fit in gap");
  }
  getMap() {
    return new tt([
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
    return new We(this.from, this.from + this.slice.size + t, this.from + this.insert, this.from + this.insert + t, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), i = this.from == this.gapFrom ? t.pos : e.map(this.gapFrom, -1), o = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return t.deletedAcross && r.deletedAcross || i < t.pos || o > r.pos ? null : new We(t.pos, r.pos, i, o, this.slice, this.insert, this.structure);
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
    return new We(t.from, t.to, t.gapFrom, t.gapTo, Y.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
Ue.jsonID("replaceAround", We);
function Fr(n, e, t) {
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
function Aa(n, e, t, r) {
  let i = [], o = [], s, l;
  n.doc.nodesBetween(e, t, (a, c, u) => {
    if (!a.isInline)
      return;
    let f = a.marks;
    if (!r.isInSet(f) && u.type.allowsMarkType(r.type)) {
      let d = Math.max(c, e), h = Math.min(c + a.nodeSize, t), m = r.addToSet(f);
      for (let g = 0; g < f.length; g++)
        f[g].isInSet(m) || (s && s.to == d && s.mark.eq(f[g]) ? s.to = h : i.push(s = new ut(d, h, f[g])));
      l && l.to == d ? l.to = h : o.push(l = new Rt(d, h, r));
    }
  }), i.forEach((a) => n.step(a)), o.forEach((a) => n.step(a));
}
function Ia(n, e, t, r) {
  let i = [], o = 0;
  n.doc.nodesBetween(e, t, (s, l) => {
    if (!s.isInline)
      return;
    o++;
    let a = null;
    if (r instanceof hr) {
      let c = s.marks, u;
      for (; u = r.isInSet(c); )
        (a || (a = [])).push(u), c = u.removeFromSet(c);
    } else r ? r.isInSet(s.marks) && (a = [r]) : a = s.marks;
    if (a && a.length) {
      let c = Math.min(l + s.nodeSize, t);
      for (let u = 0; u < a.length; u++) {
        let f = a[u], d;
        for (let h = 0; h < i.length; h++) {
          let m = i[h];
          m.step == o - 1 && f.eq(i[h].style) && (d = m);
        }
        d ? (d.to = c, d.step = o) : i.push({ style: f, from: Math.max(l, e), to: c, step: o });
      }
    }
  }), i.forEach((s) => n.step(new ut(s.from, s.to, s.style)));
}
function ii(n, e, t, r = t.contentMatch, i = !0) {
  let o = n.doc.nodeAt(e), s = [], l = e + 1;
  for (let a = 0; a < o.childCount; a++) {
    let c = o.child(a), u = l + c.nodeSize, f = r.matchType(c.type);
    if (!f)
      s.push(new Fe(l, u, Y.empty));
    else {
      r = f;
      for (let d = 0; d < c.marks.length; d++)
        t.allowsMarkType(c.marks[d].type) || n.step(new ut(l, u, c.marks[d]));
      if (i && c.isText && t.whitespace != "pre") {
        let d, h = /\r?\n|\r/g, m;
        for (; d = h.exec(c.text); )
          m || (m = new Y(P.from(t.schema.text(" ", t.allowedMarks(c.marks))), 0, 0)), s.push(new Fe(l + d.index, l + d.index + d[0].length, m));
      }
    }
    l = u;
  }
  if (!r.validEnd) {
    let a = r.fillBefore(P.empty, !0);
    n.replace(l, l, new Y(a, 0, 0));
  }
  for (let a = s.length - 1; a >= 0; a--)
    n.step(s[a]);
}
function za(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function un(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth, i = 0, o = 0; ; --r) {
    let s = n.$from.node(r), l = n.$from.index(r) + i, a = n.$to.indexAfter(r) - o;
    if (r < n.depth && s.canReplace(l, a, t))
      return r;
    if (r == 0 || s.type.spec.isolating || !za(s, l, a))
      break;
    l && (i = 1), a < s.childCount && (o = 1);
  }
  return null;
}
function $a(n, e, t) {
  let { $from: r, $to: i, depth: o } = e, s = r.before(o + 1), l = i.after(o + 1), a = s, c = l, u = P.empty, f = 0;
  for (let m = o, g = !1; m > t; m--)
    g || r.index(m) > 0 ? (g = !0, u = P.from(r.node(m).copy(u)), f++) : a--;
  let d = P.empty, h = 0;
  for (let m = o, g = !1; m > t; m--)
    g || i.after(m + 1) < i.end(m) ? (g = !0, d = P.from(i.node(m).copy(d)), h++) : c++;
  n.step(new We(a, c, s, l, new Y(u.append(d), f, h), u.size - f, !0));
}
function jo(n, e, t = null, r = n) {
  let i = Da(n, e), o = i && Oa(r, e);
  return o ? i.map(Ai).concat({ type: e, attrs: t }).concat(o.map(Ai)) : null;
}
function Ai(n) {
  return { type: n, attrs: null };
}
function Da(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.contentMatchAt(r).findWrapping(e);
  if (!o)
    return null;
  let s = o.length ? o[0] : e;
  return t.canReplaceWith(r, i, s) ? o : null;
}
function Oa(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.child(r), s = e.contentMatch.findWrapping(o.type);
  if (!s)
    return null;
  let a = (s.length ? s[s.length - 1] : e).contentMatch;
  for (let c = r; a && c < i; c++)
    a = a.matchType(t.child(c).type);
  return !a || !a.validEnd ? null : s;
}
function La(n, e, t) {
  let r = P.empty;
  for (let s = t.length - 1; s >= 0; s--) {
    if (r.size) {
      let l = t[s].type.contentMatch.matchFragment(r);
      if (!l || !l.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = P.from(t[s].type.create(t[s].attrs, r));
  }
  let i = e.start, o = e.end;
  n.step(new We(i, o, i, o, new Y(r, 0, 0), t.length, !0));
}
function Pa(n, e, t, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let o = n.steps.length;
  n.doc.nodesBetween(e, t, (s, l) => {
    let a = typeof i == "function" ? i(s) : i;
    if (s.isTextblock && !s.hasMarkup(r, a) && Ba(n.doc, n.mapping.slice(o).map(l), r)) {
      let c = null;
      if (r.schema.linebreakReplacement) {
        let h = r.whitespace == "pre", m = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        h && !m ? c = !1 : !h && m && (c = !0);
      }
      c === !1 && qo(n, s, l, o), ii(n, n.mapping.slice(o).map(l, 1), r, void 0, c === null);
      let u = n.mapping.slice(o), f = u.map(l, 1), d = u.map(l + s.nodeSize, 1);
      return n.step(new We(f, d, f + 1, d - 1, new Y(P.from(r.create(a, null, s.marks)), 0, 0), 1, !0)), c === !0 && Wo(n, s, l, o), !1;
    }
  });
}
function Wo(n, e, t, r) {
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
function qo(n, e, t, r) {
  e.forEach((i, o) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let s = n.mapping.slice(r).map(t + 1 + o);
      n.replaceWith(s, s + 1, e.type.schema.text(`
`));
    }
  });
}
function Ba(n, e, t) {
  let r = n.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, t);
}
function Fa(n, e, t, r, i) {
  let o = n.doc.nodeAt(e);
  if (!o)
    throw new RangeError("No node at given position");
  t || (t = o.type);
  let s = t.create(r, null, i || o.marks);
  if (o.isLeaf)
    return n.replaceWith(e, e + o.nodeSize, s);
  if (!t.validContent(o.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(new We(e, e + o.nodeSize, e + 1, e + o.nodeSize - 1, new Y(P.from(s), 0, 0), 1, !0));
}
function bt(n, e, t = 1, r) {
  let i = n.resolve(e), o = i.depth - t, s = r && r[r.length - 1] || i.parent;
  if (o < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !s.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
    return !1;
  for (let c = i.depth - 1, u = t - 2; c > o; c--, u--) {
    let f = i.node(c), d = i.index(c);
    if (f.type.spec.isolating)
      return !1;
    let h = f.content.cutByIndex(d, f.childCount), m = r && r[u + 1];
    m && (h = h.replaceChild(0, m.type.create(m.attrs)));
    let g = r && r[u] || f;
    if (!f.canReplace(d + 1, f.childCount) || !g.type.validContent(h))
      return !1;
  }
  let l = i.indexAfter(o), a = r && r[0];
  return i.node(o).canReplaceWith(l, l, a ? a.type : i.node(o + 1).type);
}
function Ha(n, e, t = 1, r) {
  let i = n.doc.resolve(e), o = P.empty, s = P.empty;
  for (let l = i.depth, a = i.depth - t, c = t - 1; l > a; l--, c--) {
    o = P.from(i.node(l).copy(o));
    let u = r && r[c];
    s = P.from(u ? u.type.create(u.attrs, s) : i.node(l).copy(s));
  }
  n.step(new Fe(e, e, new Y(o.append(s), t, t), !0));
}
function Vt(n, e) {
  let t = n.resolve(e), r = t.index();
  return Jo(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function _a(n, e) {
  e.content.size || n.type.compatibleContent(e.type);
  let t = n.contentMatchAt(n.childCount), { linebreakReplacement: r } = n.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let o = e.child(i), s = o.type == r ? n.type.schema.nodes.text : o.type;
    if (t = t.matchType(s), !t || !n.type.allowsMarks(o.marks))
      return !1;
  }
  return t.validEnd;
}
function Jo(n, e) {
  return !!(n && e && !n.isLeaf && _a(n, e));
}
function pr(n, e, t = -1) {
  let r = n.resolve(e);
  for (let i = r.depth; ; i--) {
    let o, s, l = r.index(i);
    if (i == r.depth ? (o = r.nodeBefore, s = r.nodeAfter) : t > 0 ? (o = r.node(i + 1), l++, s = r.node(i).maybeChild(l)) : (o = r.node(i).maybeChild(l - 1), s = r.node(i + 1)), o && !o.isTextblock && Jo(o, s) && r.node(i).canReplace(l, l + 1))
      return e;
    if (i == 0)
      break;
    e = t < 0 ? r.before(i) : r.after(i);
  }
}
function ja(n, e, t) {
  let r = null, { linebreakReplacement: i } = n.doc.type.schema, o = n.doc.resolve(e - t), s = o.node().type;
  if (i && s.inlineContent) {
    let u = s.whitespace == "pre", f = !!s.contentMatch.matchType(i);
    u && !f ? r = !1 : !u && f && (r = !0);
  }
  let l = n.steps.length;
  if (r === !1) {
    let u = n.doc.resolve(e + t);
    qo(n, u.node(), u.before(), l);
  }
  s.inlineContent && ii(n, e + t - 1, s, o.node().contentMatchAt(o.index()), r == null);
  let a = n.mapping.slice(l), c = a.map(e - t);
  if (n.step(new Fe(c, a.map(e + t, -1), Y.empty, !0)), r === !0) {
    let u = n.doc.resolve(c);
    Wo(n, u.node(), u.before(), n.steps.length);
  }
  return n;
}
function Wa(n, e, t) {
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
function mr(n, e, t = e, r = Y.empty) {
  if (e == t && !r.size)
    return null;
  let i = n.resolve(e), o = n.resolve(t);
  return Ko(i, o, r) ? new Fe(e, t, r) : new qa(i, o, r).fit();
}
function Ko(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class qa {
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.unplaced = r, this.frontier = [], this.placed = P.empty;
    for (let i = 0; i <= e.depth; i++) {
      let o = e.node(i);
      this.frontier.push({
        type: o.type,
        match: o.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = P.from(e.node(i).copy(this.placed));
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
    let a = new Y(o, s, l);
    return e > -1 ? new We(r.pos, e, this.$to.pos, this.$to.end(), a, t) : a.size || r.pos != this.$to.pos ? new Fe(r.pos, i.pos, a) : null;
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
        r ? (o = Sr(this.unplaced.content, r - 1).firstChild, i = o.content) : i = this.unplaced.content;
        let s = i.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: a, match: c } = this.frontier[l], u, f = null;
          if (t == 1 && (s ? c.matchType(s.type) || (f = c.fillBefore(P.from(s), !1)) : o && a.compatibleContent(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, inject: f };
          if (t == 2 && s && (u = c.findWrapping(s.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, wrap: u };
          if (o && c.matchType(o.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = Sr(e, t);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new Y(e, t + 1, Math.max(r, i.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = Sr(e, t);
    if (i.childCount <= 1 && t > 0) {
      let o = e.size - t <= t + i.size;
      this.unplaced = new Y(gn(e, t - 1, 1), t - 1, o ? t - 1 : r);
    } else
      this.unplaced = new Y(gn(e, t, 1), t, r);
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
      c++, (c > 1 || a == 0 || g.content.size) && (f = y, u.push(Vo(g.mark(d.allowedMarks(g.marks)), c == 1 ? a : 0, c == l.childCount ? h : -1)));
    }
    let m = c == l.childCount;
    m || (h = -1), this.placed = yn(this.placed, t, P.from(u)), this.frontier[t].match = f, m && h < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let g = 0, y = l; g < h; g++) {
      let b = y.lastChild;
      this.frontier.push({ type: b.type, match: b.contentMatchAt(b.childCount) }), y = b.content;
    }
    this.unplaced = m ? e == 0 ? Y.empty : new Y(gn(s.content, e - 1, 1), e - 1, h < 0 ? s.openEnd : e - 1) : new Y(gn(s.content, e, c), s.openStart, s.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !Nr(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
      let { match: r, type: i } = this.frontier[t], o = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), s = Nr(e, t, i, r, o);
      if (s) {
        for (let l = t - 1; l >= 0; l--) {
          let { match: a, type: c } = this.frontier[l], u = Nr(e, l, c, a, !0);
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
    t.fit.childCount && (this.placed = yn(this.placed, t.depth, t.fit)), e = t.move;
    for (let r = t.depth + 1; r <= e.depth; r++) {
      let i = e.node(r), o = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, o);
    }
    return e;
  }
  openFrontierNode(e, t = null, r) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = yn(this.placed, this.depth, P.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(P.empty, !0);
    t.childCount && (this.placed = yn(this.placed, this.frontier.length, t));
  }
}
function gn(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(gn(n.firstChild.content, e - 1, t)));
}
function yn(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(yn(n.lastChild.content, e - 1, t)));
}
function Sr(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function Vo(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, Vo(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(P.empty, !0)))), n.copy(r);
}
function Nr(n, e, t, r, i) {
  let o = n.node(e), s = i ? n.indexAfter(e) : n.index(e);
  if (s == o.childCount && !t.compatibleContent(o.type))
    return null;
  let l = r.fillBefore(o.content, !0, s);
  return l && !Ja(t, o.content, s) ? l : null;
}
function Ja(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function Ka(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function Va(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let i = n.doc.resolve(e), o = n.doc.resolve(t);
  if (Ko(i, o, r))
    return n.step(new Fe(e, t, r));
  let s = Uo(i, o);
  s[s.length - 1] == 0 && s.pop();
  let l = -(i.depth + 1);
  s.unshift(l);
  for (let d = i.depth, h = i.pos - 1; d > 0; d--, h--) {
    let m = i.node(d).type.spec;
    if (m.defining || m.definingAsContext || m.isolating)
      break;
    s.indexOf(d) > -1 ? l = d : i.before(d) == h && s.splice(1, 0, -d);
  }
  let a = s.indexOf(l), c = [], u = r.openStart;
  for (let d = r.content, h = 0; ; h++) {
    let m = d.firstChild;
    if (c.push(m), h == r.openStart)
      break;
    d = m.content;
  }
  for (let d = u - 1; d >= 0; d--) {
    let h = c[d], m = Ka(h.type);
    if (m && !h.sameMarkup(i.node(Math.abs(l) - 1)))
      u = d;
    else if (m || !h.type.isTextblock)
      break;
  }
  for (let d = r.openStart; d >= 0; d--) {
    let h = (d + u + 1) % (r.openStart + 1), m = c[h];
    if (m)
      for (let g = 0; g < s.length; g++) {
        let y = s[(g + a) % s.length], b = !0;
        y < 0 && (b = !1, y = -y);
        let z = i.node(y - 1), M = i.index(y - 1);
        if (z.canReplaceWith(M, M, m.type, m.marks))
          return n.replace(i.before(y), b ? o.after(y) : t, new Y(Yo(r.content, 0, r.openStart, h), h, r.openEnd));
      }
  }
  let f = n.steps.length;
  for (let d = s.length - 1; d >= 0 && (n.replace(e, t, r), !(n.steps.length > f)); d--) {
    let h = s[d];
    h < 0 || (e = i.before(h), t = o.after(h));
  }
}
function Yo(n, e, t, r, i) {
  if (e < t) {
    let o = n.firstChild;
    n = n.replaceChild(0, o.copy(Yo(o.content, e + 1, t, r, o)));
  }
  if (e > r) {
    let o = i.contentMatchAt(0), s = o.fillBefore(n).append(n);
    n = s.append(o.matchFragment(s).fillBefore(P.empty, !0));
  }
  return n;
}
function Ya(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = Wa(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new Y(P.from(r), 0, 0));
}
function Ua(n, e, t) {
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
  let o = Uo(r, i);
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
function Uo(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let o = n.start(i);
    if (o < n.pos - (n.depth - i) || e.end(i) > e.pos + (e.depth - i) || n.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (o == e.start(i) || i == n.depth && i == e.depth && n.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == o - 1) && t.push(i);
  }
  return t;
}
class rn extends Ue {
  /**
  Construct an attribute step.
  */
  constructor(e, t, r) {
    super(), this.pos = e, this.attr = t, this.value = r;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return He.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let o in t.attrs)
      r[o] = t.attrs[o];
    r[this.attr] = this.value;
    let i = t.type.create(r, null, t.marks);
    return He.fromReplace(e, this.pos, this.pos + 1, new Y(P.from(i), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return tt.empty;
  }
  invert(e) {
    return new rn(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new rn(t.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number" || typeof t.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new rn(t.pos, t.attr, t.value);
  }
}
Ue.jsonID("attr", rn);
class Tn extends Ue {
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
    return He.ok(r);
  }
  getMap() {
    return tt.empty;
  }
  invert(e) {
    return new Tn(this.attr, e.attrs[this.attr]);
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
    return new Tn(t.attr, t.value);
  }
}
Ue.jsonID("docAttr", Tn);
let sn = class extends Error {
};
sn = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
sn.prototype = Object.create(Error.prototype);
sn.prototype.constructor = sn;
sn.prototype.name = "TransformError";
class Ga {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new nr();
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
      throw new sn(t.failed);
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
  replace(e, t = e, r = Y.empty) {
    let i = mr(this.doc, e, t, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, r) {
    return this.replace(e, t, new Y(P.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, t) {
    return this.replace(e, t, Y.empty);
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
    return Va(this, e, t, r), this;
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
    return Ya(this, e, t, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return Ua(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return $a(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return ja(this, e, t), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, t) {
    return La(this, e, t), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, t = e, r, i = null) {
    return Pa(this, e, t, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, r = null, i) {
    return Fa(this, e, t, r, i), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  The `pos` addresses the document content. Use `setDocAttribute`
  to set attributes on the document itself.
  */
  setNodeAttribute(e, t, r) {
    return this.step(new rn(e, t, r)), this;
  }
  /**
  Set a single attribute on the document to a new value.
  */
  setDocAttribute(e, t) {
    return this.step(new Tn(e, t)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(e, t) {
    return this.step(new At(e, t)), this;
  }
  /**
  Remove a mark (or all marks of the given type) from the node at
  position `pos`.
  */
  removeNodeMark(e, t) {
    let r = this.doc.nodeAt(e);
    if (!r)
      throw new RangeError("No node at position " + e);
    if (t instanceof Te)
      t.isInSet(r.marks) && this.step(new qt(e, t));
    else {
      let i = r.marks, o, s = [];
      for (; o = t.isInSet(i); )
        s.push(new qt(e, o)), i = o.removeFromSet(i);
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
    return Ha(this, e, t, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, r) {
    return Aa(this, e, t, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, r) {
    return Ia(this, e, t, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, t, r) {
    return ii(this, e, t, r), this;
  }
}
const Tr = /* @__PURE__ */ Object.create(null);
class Ae {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, r) {
    this.$anchor = e, this.$head = t, this.ranges = r || [new Xa(e.min(t), e.max(t))];
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
  replace(e, t = Y.empty) {
    let r = t.content.lastChild, i = null;
    for (let l = 0; l < t.openEnd; l++)
      i = r, r = r.lastChild;
    let o = e.steps.length, s = this.ranges;
    for (let l = 0; l < s.length; l++) {
      let { $from: a, $to: c } = s[l], u = e.mapping.slice(o);
      e.replaceRange(u.map(a.pos), u.map(c.pos), l ? Y.empty : t), l == 0 && $i(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
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
      o ? e.deleteRange(c, u) : (e.replaceRangeWith(c, u, t), $i(e, r, t.isInline ? -1 : 1));
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
    let i = e.parent.inlineContent ? new Ze(e) : Qt(e.node(0), e.parent, e.pos, e.index(), t, r);
    if (i)
      return i;
    for (let o = e.depth - 1; o >= 0; o--) {
      let s = t < 0 ? Qt(e.node(0), e.node(o), e.before(o + 1), e.index(o), t, r) : Qt(e.node(0), e.node(o), e.after(o + 1), e.index(o) + 1, t, r);
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
    return this.findFrom(e, t) || this.findFrom(e, -t) || new dt(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return Qt(e, e, 0, 0, 1) || new dt(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return Qt(e, e, e.content.size, e.childCount, -1) || new dt(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = Tr[t.type];
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
    if (e in Tr)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return Tr[e] = t, t.prototype.jsonID = e, t;
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
    return Ze.between(this.$anchor, this.$head).getBookmark();
  }
}
Ae.prototype.visible = !0;
class Xa {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let Ii = !1;
function zi(n) {
  !Ii && !n.parent.inlineContent && (Ii = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class Ze extends Ae {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    zi(e), zi(t), super(e, t);
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
      return Ae.near(r);
    let i = e.resolve(t.map(this.anchor));
    return new Ze(i.parent.inlineContent ? i : r, r);
  }
  replace(e, t = Y.empty) {
    if (super.replace(e, t), t == Y.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof Ze && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new gr(this.anchor, this.head);
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
    return new Ze(e.resolve(t.anchor), e.resolve(t.head));
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
      let o = Ae.findFrom(t, r, !0) || Ae.findFrom(t, -r, !0);
      if (o)
        t = o.$head;
      else
        return Ae.near(t, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = t : (e = (Ae.findFrom(e, -r, !0) || Ae.findFrom(e, r, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new Ze(e, t);
  }
}
Ae.jsonID("text", Ze);
class gr {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new gr(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return Ze.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class Ee extends Ae {
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
    return r ? Ae.near(o) : new Ee(o);
  }
  content() {
    return new Y(P.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof Ee && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new oi(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new Ee(e.resolve(t.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, t) {
    return new Ee(e.resolve(t));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
Ee.prototype.visible = !1;
Ae.jsonID("node", Ee);
class oi {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new gr(r, r) : new oi(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && Ee.isSelectable(r) ? new Ee(t) : Ae.near(t);
  }
}
class dt extends Ae {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = Y.empty) {
    if (t == Y.empty) {
      e.delete(0, e.doc.content.size);
      let r = Ae.atStart(e.doc);
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
    return new dt(e);
  }
  map(e) {
    return new dt(e);
  }
  eq(e) {
    return e instanceof dt;
  }
  getBookmark() {
    return Qa;
  }
}
Ae.jsonID("all", dt);
const Qa = {
  map() {
    return this;
  },
  resolve(n) {
    return new dt(n);
  }
};
function Qt(n, e, t, r, i, o = !1) {
  if (e.inlineContent)
    return Ze.create(n, t);
  for (let s = r - (i > 0 ? 0 : 1); i > 0 ? s < e.childCount : s >= 0; s += i) {
    let l = e.child(s);
    if (l.isAtom) {
      if (!o && Ee.isSelectable(l))
        return Ee.create(n, t - (i < 0 ? l.nodeSize : 0));
    } else {
      let a = Qt(n, l, t + i, i < 0 ? l.childCount : 0, i, o);
      if (a)
        return a;
    }
    t += l.nodeSize * i;
  }
  return null;
}
function $i(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e)
    return;
  let i = n.steps[r];
  if (!(i instanceof Fe || i instanceof We))
    return;
  let o = n.mapping.maps[r], s;
  o.forEach((l, a, c, u) => {
    s == null && (s = u);
  }), n.setSelection(Ae.near(n.doc.resolve(s), t));
}
function Di(n, e) {
  return !e || !n ? n : n.bind(e);
}
class jn {
  constructor(e, t, r) {
    this.name = e, this.init = Di(t.init, r), this.apply = Di(t.apply, r);
  }
}
new jn("doc", {
  init(n) {
    return n.doc || n.schema.topNodeType.createAndFill();
  },
  apply(n) {
    return n.doc;
  }
}), new jn("selection", {
  init(n, e) {
    return n.selection || Ae.atStart(e.doc);
  },
  apply(n) {
    return n.selection;
  }
}), new jn("storedMarks", {
  init(n) {
    return n.storedMarks || null;
  },
  apply(n, e, t, r) {
    return r.selection.$cursor ? n.storedMarks : null;
  }
}), new jn("scrollToSelection", {
  init() {
    return 0;
  },
  apply(n, e) {
    return n.scrolledIntoView ? e + 1 : e;
  }
});
const Go = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function Xo(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const Qo = (n, e, t) => {
  let r = Xo(n, t);
  if (!r)
    return !1;
  let i = si(r);
  if (!i) {
    let s = r.blockRange(), l = s && un(s);
    return l == null ? !1 : (e && e(n.tr.lift(s, l).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (as(n, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (ln(o, "end") || Ee.isSelectable(o)))
    for (let s = r.depth; ; s--) {
      let l = mr(n.doc, r.before(s), r.after(s), Y.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let a = n.tr.step(l);
          a.setSelection(ln(o, "end") ? Ae.findFrom(a.doc.resolve(a.mapping.map(i.pos, -1)), -1) : Ee.create(a.doc, i.pos - o.nodeSize)), e(a.scrollIntoView());
        }
        return !0;
      }
      if (s == 1 || r.node(s - 1).childCount > 1)
        break;
    }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos - o.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, Za = (n, e, t) => {
  let r = Xo(n, t);
  if (!r)
    return !1;
  let i = si(r);
  return i ? Zo(n, i, e) : !1;
}, ec = (n, e, t) => {
  let r = ts(n, t);
  if (!r)
    return !1;
  let i = li(r);
  return i ? Zo(n, i, e) : !1;
};
function Zo(n, e, t) {
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
  let c = mr(n.doc, o, a, Y.empty);
  if (!c || c.from != o || c instanceof Fe && c.slice.size >= a - o)
    return !1;
  if (t) {
    let u = n.tr.step(c);
    u.setSelection(Ze.create(u.doc, o)), t(u.scrollIntoView());
  }
  return !0;
}
function ln(n, e, t = !1) {
  for (let r = n; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (t && r.childCount != 1)
      return !1;
  }
  return !1;
}
const es = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    o = si(r);
  }
  let s = o && o.nodeBefore;
  return !s || !Ee.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(Ee.create(n.doc, o.pos - s.nodeSize)).scrollIntoView()), !0);
};
function si(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function ts(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const ns = (n, e, t) => {
  let r = ts(n, t);
  if (!r)
    return !1;
  let i = li(r);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (as(n, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (ln(o, "start") || Ee.isSelectable(o))) {
    let s = mr(n.doc, r.before(), r.after(), Y.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let l = n.tr.step(s);
        l.setSelection(ln(o, "start") ? Ae.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : Ee.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos, i.pos + o.nodeSize).scrollIntoView()), !0) : !1;
}, rs = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    o = li(r);
  }
  let s = o && o.nodeAfter;
  return !s || !Ee.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(Ee.create(n.doc, o.pos)).scrollIntoView()), !0);
};
function li(n) {
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
const tc = (n, e) => {
  let t = n.selection, r = t instanceof Ee, i;
  if (r) {
    if (t.node.isTextblock || !Vt(n.doc, t.from))
      return !1;
    i = t.from;
  } else if (i = pr(n.doc, t.from, -1), i == null)
    return !1;
  if (e) {
    let o = n.tr.join(i);
    r && o.setSelection(Ee.create(o.doc, i - n.doc.resolve(i).nodeBefore.nodeSize)), e(o.scrollIntoView());
  }
  return !0;
}, nc = (n, e) => {
  let t = n.selection, r;
  if (t instanceof Ee) {
    if (t.node.isTextblock || !Vt(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = pr(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, rc = (n, e) => {
  let { $from: t, $to: r } = n.selection, i = t.blockRange(r), o = i && un(i);
  return o == null ? !1 : (e && e(n.tr.lift(i, o).scrollIntoView()), !0);
}, is = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function ai(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const ic = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(r))
    return !1;
  let i = t.node(-1), o = t.indexAfter(-1), s = ai(i.contentMatchAt(o));
  if (!s || !i.canReplaceWith(o, o, s))
    return !1;
  if (e) {
    let l = t.after(), a = n.tr.replaceWith(l, l, s.createAndFill());
    a.setSelection(Ae.near(a.doc.resolve(l), 1)), e(a.scrollIntoView());
  }
  return !0;
}, ss = (n, e) => {
  let t = n.selection, { $from: r, $to: i } = t;
  if (t instanceof dt || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = ai(i.parent.contentMatchAt(i.indexAfter()));
  if (!o || !o.isTextblock)
    return !1;
  if (e) {
    let s = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = n.tr.insert(s, o.createAndFill());
    l.setSelection(Ze.create(l.doc, s + 1)), e(l.scrollIntoView());
  }
  return !0;
}, ls = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let o = t.before();
    if (bt(n.doc, o))
      return e && e(n.tr.split(o).scrollIntoView()), !0;
  }
  let r = t.blockRange(), i = r && un(r);
  return i == null ? !1 : (e && e(n.tr.lift(r, i).scrollIntoView()), !0);
};
function oc(n) {
  return (e, t) => {
    if (e.selection instanceof Ee && e.selection.node.isBlock) {
      let { $from: h } = e.selection;
      return !h.parentOffset || !bt(e.doc, h.pos) ? !1 : (t && t(e.tr.split(h.pos).scrollIntoView()), !0);
    }
    if (!e.selection.$from.depth)
      return !1;
    let r = e.tr;
    !e.selection.empty && (e.selection instanceof Ze || e.selection instanceof dt) && r.deleteSelection();
    let { $from: i } = r.selection, o = r.steps.length, s = [], l, a, c = !1, u = !1;
    for (let h = i.depth; ; h--)
      if (i.node(h).isBlock) {
        c = i.end(h) == i.pos + (i.depth - h), u = i.start(h) == i.pos - (i.depth - h), a = ai(i.node(h - 1).contentMatchAt(i.indexAfter(h - 1))), s.unshift(c && a ? { type: a } : null), l = h;
        break;
      } else {
        if (h == 1)
          return !1;
        s.unshift(null);
      }
    let f = i.pos, d = bt(r.doc, f, s.length, s);
    if (d || (s[0] = a ? { type: a } : null, d = bt(r.doc, f, s.length, s)), !d)
      return !1;
    if (r.split(f, s.length, s), !c && u && i.node(l).type != a) {
      let h = r.mapping.slice(o), m = h.map(i.before(l)), g = r.doc.resolve(m);
      a && i.node(l - 1).canReplaceWith(g.index(), g.index() + 1, a) && r.setNodeMarkup(h.map(i.before(l)), a);
    }
    return t && t(r.scrollIntoView()), !0;
  };
}
const sc = oc(), lc = (n, e) => {
  let { $from: t, to: r } = n.selection, i, o = t.sharedDepth(r);
  return o == 0 ? !1 : (i = t.before(o), e && e(n.tr.setSelection(Ee.create(n.doc, i))), !0);
};
function ac(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(o - 1, o) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || Vt(n.doc, e.pos)) ? !1 : (t && t(n.tr.join(e.pos).scrollIntoView()), !0);
}
function as(n, e, t, r) {
  let i = e.nodeBefore, o = e.nodeAfter, s, l, a = i.type.spec.isolating || o.type.spec.isolating;
  if (!a && ac(n, e, t))
    return !0;
  let c = !a && e.parent.canReplace(e.index(), e.index() + 1);
  if (c && (s = (l = i.contentMatchAt(i.childCount)).findWrapping(o.type)) && l.matchType(s[0] || o.type).validEnd) {
    if (t) {
      let h = e.pos + o.nodeSize, m = P.empty;
      for (let b = s.length - 1; b >= 0; b--)
        m = P.from(s[b].create(null, m));
      m = P.from(i.copy(m));
      let g = n.tr.step(new We(e.pos - 1, h, e.pos, h, new Y(m, 1, 0), s.length, !0)), y = g.doc.resolve(h + 2 * s.length);
      y.nodeAfter && y.nodeAfter.type == i.type && Vt(g.doc, y.pos) && g.join(y.pos), t(g.scrollIntoView());
    }
    return !0;
  }
  let u = o.type.spec.isolating || r > 0 && a ? null : Ae.findFrom(e, 1), f = u && u.$from.blockRange(u.$to), d = f && un(f);
  if (d != null && d >= e.depth)
    return t && t(n.tr.lift(f, d).scrollIntoView()), !0;
  if (c && ln(o, "start", !0) && ln(i, "end")) {
    let h = i, m = [];
    for (; m.push(h), !h.isTextblock; )
      h = h.lastChild;
    let g = o, y = 1;
    for (; !g.isTextblock; g = g.firstChild)
      y++;
    if (h.canReplace(h.childCount, h.childCount, g.content)) {
      if (t) {
        let b = P.empty;
        for (let M = m.length - 1; M >= 0; M--)
          b = P.from(m[M].copy(b));
        let z = n.tr.step(new We(e.pos - m.length, e.pos + o.nodeSize, e.pos + y, e.pos + o.nodeSize - y, new Y(b, m.length, 0), 0, !0));
        t(z.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function cs(n) {
  return function(e, t) {
    let r = e.selection, i = n < 0 ? r.$from : r.$to, o = i.depth;
    for (; i.node(o).isInline; ) {
      if (!o)
        return !1;
      o--;
    }
    return i.node(o).isTextblock ? (t && t(e.tr.setSelection(Ze.create(e.doc, n < 0 ? i.start(o) : i.end(o)))), !0) : !1;
  };
}
const cc = cs(-1), uc = cs(1);
function dc(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o), l = s && jo(s, n, e);
    return l ? (r && r(t.tr.wrap(s, l).scrollIntoView()), !0) : !1;
  };
}
function Oi(n, e = null) {
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
function ci(...n) {
  return function(e, t, r) {
    for (let i = 0; i < n.length; i++)
      if (n[i](e, t, r))
        return !0;
    return !1;
  };
}
ci(Go, Qo, es);
ci(Go, ns, rs);
ci(is, ss, ls, sc);
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function fc(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o);
    if (!s)
      return !1;
    let l = r ? t.tr : null;
    return hc(l, s, n, e) ? (r && r(l.scrollIntoView()), !0) : !1;
  };
}
function hc(n, e, t, r = null) {
  let i = !1, o = e, s = e.$from.doc;
  if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(t) && e.startIndex == 0) {
    if (e.$from.index(e.depth - 1) == 0)
      return !1;
    let a = s.resolve(e.start - 2);
    o = new Zn(a, a, e.depth), e.endIndex < e.parent.childCount && (e = new Zn(e.$from, s.resolve(e.$to.end(e.depth)), e.depth)), i = !0;
  }
  let l = jo(o, t, r, e);
  return l ? (n && pc(n, e, l, i, t), !0) : !1;
}
function pc(n, e, t, r, i) {
  let o = P.empty;
  for (let u = t.length - 1; u >= 0; u--)
    o = P.from(t[u].type.create(t[u].attrs, o));
  n.step(new We(e.start - (r ? 2 : 0), e.end, e.start, e.end, new Y(o, 0, 0), t.length, !0));
  let s = 0;
  for (let u = 0; u < t.length; u++)
    t[u].type == i && (s = u + 1);
  let l = t.length - s, a = e.start + t.length - (r ? 2 : 0), c = e.parent;
  for (let u = e.startIndex, f = e.endIndex, d = !0; u < f; u++, d = !1)
    !d && bt(n.doc, a, l) && (n.split(a, l), a += 2 * l), a += c.child(u).nodeSize;
  return n;
}
function mc(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (s) => s.childCount > 0 && s.firstChild.type == n);
    return o ? t ? r.node(o.depth - 1).type == n ? gc(e, t, n, o) : yc(e, t, o) : !0 : !1;
  };
}
function gc(n, e, t, r) {
  let i = n.tr, o = r.end, s = r.$to.end(r.depth);
  o < s && (i.step(new We(o - 1, s, o, s, new Y(P.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new Zn(i.doc.resolve(r.$from.pos), i.doc.resolve(s), r.depth));
  const l = un(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let a = i.doc.resolve(i.mapping.map(o, -1) - 1);
  return Vt(i.doc, a.pos) && a.nodeBefore.type == a.nodeAfter.type && i.join(a.pos), e(i.scrollIntoView()), !0;
}
function yc(n, e, t) {
  let r = n.tr, i = t.parent;
  for (let h = t.end, m = t.endIndex - 1, g = t.startIndex; m > g; m--)
    h -= i.child(m).nodeSize, r.delete(h - 1, h + 1);
  let o = r.doc.resolve(t.start), s = o.nodeAfter;
  if (r.mapping.map(t.end) != t.start + o.nodeAfter.nodeSize)
    return !1;
  let l = t.startIndex == 0, a = t.endIndex == i.childCount, c = o.node(-1), u = o.index(-1);
  if (!c.canReplace(u + (l ? 0 : 1), u + 1, s.content.append(a ? P.empty : P.from(i))))
    return !1;
  let f = o.pos, d = f + s.nodeSize;
  return r.step(new We(f - (l ? 1 : 0), d + (a ? 1 : 0), f + 1, d - 1, new Y((l ? P.empty : P.from(i.copy(P.empty))).append(a ? P.empty : P.from(i.copy(P.empty))), l ? 0 : 1, a ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function xc(n) {
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
      let c = a.lastChild && a.lastChild.type == l.type, u = P.from(c ? n.create() : null), f = new Y(P.from(n.create(null, P.from(l.type.create(null, u)))), c ? 3 : 1, 0), d = o.start, h = o.end;
      t(e.tr.step(new We(d - (c ? 3 : 1), h, d, h, f, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function us(n) {
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
var bc = class ds {
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
        const y = this.buildProps(c, t), b = h(...g)(y);
        return l.push(b), f;
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
    const e = ds.createFakeChain();
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
      state: us({
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
const vc = () => ({ editor: n, view: e }) => (requestAnimationFrame(() => {
  if (!n.isDestroyed) {
    var t;
    e.dom.blur(), (t = window) === null || t === void 0 || (t = t.getSelection()) === null || t === void 0 || t.removeAllRanges();
  }
}), !0), wc = (n = !0) => ({ commands: e }) => e.setContent("", { emitUpdate: n }), kc = () => ({ state: n, tr: e, dispatch: t }) => {
  const { selection: r } = e, { ranges: i } = r;
  return t && i.forEach(({ $from: o, $to: s }) => {
    n.doc.nodesBetween(o.pos, s.pos, (l, a) => {
      if (l.type.isText) return;
      const { doc: c, mapping: u } = e, f = c.resolve(u.map(a)), d = c.resolve(u.map(a + l.nodeSize)), h = f.blockRange(d);
      if (!h) return;
      const m = un(h);
      if (l.type.isTextblock) {
        const { defaultType: g } = f.parent.contentMatchAt(f.index());
        e.setNodeMarkup(h.start, g);
      }
      (m || m === 0) && e.lift(h, m);
    });
  }), !0;
}, Sc = (n) => (e) => n(e), Nc = () => ({ state: n, dispatch: e }) => ss(n, e), Tc = (n, e) => ({ editor: t, tr: r }) => {
  const { state: i } = t, o = i.doc.slice(n.from, n.to);
  r.deleteRange(n.from, n.to);
  const s = r.mapping.map(e);
  return r.insert(s, o.content), r.setSelection(new rt(r.doc.resolve(Math.max(s - 1, 0)))), !0;
}, Ec = () => ({ tr: n, dispatch: e }) => {
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
function Ye(n, e) {
  if (typeof n == "string") {
    if (!e.nodes[n]) throw Error(`There is no node type named '${n}'. Maybe you forgot to add the extension?`);
    return e.nodes[n];
  }
  return n;
}
const Cc = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const i = Ye(n, t.schema), o = e.selection.$anchor;
  for (let s = o.depth; s > 0; s -= 1) if (o.node(s).type === i) {
    if (r) {
      const l = o.before(s), a = o.after(s);
      e.delete(l, a).scrollIntoView();
    }
    return !0;
  }
  return !1;
}, Mc = (n) => ({ tr: e, dispatch: t }) => {
  const { from: r, to: i } = n;
  return t && e.delete(r, i), !0;
}, Rc = (n) => n.content ? /^text(\*|\+)/.test(n.content) : !1, Li = (n, e, t) => {
  if (!n.parent.isInline || t === "left" && n.pos > n.start() || t === "right" && n.pos < n.end()) return n.pos;
  const r = e.nodes[n.parent.type.name].spec;
  return Rc(r) ? t === "left" ? n.start() - 1 : n.end() + 1 : n.pos;
}, Ac = (n, e, t) => ({
  from: Li(n, t, "left"),
  to: Li(e, t, "right")
}), Ic = () => ({ state: n, dispatch: e }) => {
  if (n.selection.empty) return !1;
  if (e) {
    const t = n.tr, { ranges: r } = n.selection, i = t.steps.length;
    r.forEach((o) => {
      const s = t.mapping.slice(i), l = t.doc.resolve(s.map(o.$from.pos)), a = t.doc.resolve(s.map(o.$to.pos)), { from: c, to: u } = Ac(l, a, n.schema);
      t.deleteRange(c, u);
    }), t.selection.empty || t.setSelection(rt.near(t.doc.resolve(t.selection.from))), t.scrollIntoView(), e(t);
  }
  return !0;
}, zc = () => ({ commands: n }) => n.keyboardShortcut("Enter"), $c = () => ({ state: n, dispatch: e }) => ic(n, e);
function Dc(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
function rr(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => t.strict ? e[i] === n[i] : Dc(e[i]) ? e[i].test(n[i]) : e[i] === n[i]) : !0;
}
function fs(n, e, t = {}) {
  return n.find((r) => r.type === e && rr(Object.fromEntries(Object.keys(t).map((i) => [i, r.attrs[i]])), t));
}
function Pi(n, e, t = {}) {
  return !!fs(n, e, t);
}
function hs(n, e, t) {
  if (!n || !e) return;
  let r = n.parent.childAfter(n.parentOffset);
  if ((!r.node || !r.node.marks.some((a) => a.type === e)) && (r = n.parent.childBefore(n.parentOffset)), !r.node || !r.node.marks.some((a) => a.type === e)) return;
  if (!t) {
    const a = r.node.marks.find((c) => c.type === e);
    a && (t = a.attrs);
  }
  if (!fs([...r.node.marks], e, t)) return;
  let i = r.index, o = n.start() + r.offset, s = i + 1, l = o + r.node.nodeSize;
  for (; i > 0 && Pi([...n.parent.child(i - 1).marks], e, t); )
    i -= 1, o -= n.parent.child(i).nodeSize;
  for (; s < n.parent.childCount && Pi([...n.parent.child(s).marks], e, t); )
    l += n.parent.child(s).nodeSize, s += 1;
  return {
    from: o,
    to: l
  };
}
function zt(n, e) {
  if (typeof n == "string") {
    if (!e.marks[n]) throw Error(`There is no mark type named '${n}'. Maybe you forgot to add the extension?`);
    return e.marks[n];
  }
  return n;
}
const Oc = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const o = zt(n, r.schema), { doc: s, selection: l } = t, { $from: a, from: c, to: u } = l;
  if (i) {
    const f = hs(a, o, e);
    if (f && f.from <= c && f.to >= u) {
      const d = rt.create(s, f.from, f.to);
      t.setSelection(d);
    }
  }
  return !0;
}, Lc = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let r = 0; r < t.length; r += 1) if (t[r](e)) return !0;
  return !1;
};
function ps(n) {
  return n instanceof rt;
}
function Bt(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function Pc(n, e = null) {
  if (!e) return null;
  const t = en.atStart(n), r = en.atEnd(n);
  if (e === "start" || e === !0) return t;
  if (e === "end") return r;
  const i = t.from, o = r.to;
  return e === "all" ? rt.create(n, Bt(0, i, o), Bt(n.content.size, i, o)) : rt.create(n, Bt(e, i, o), Bt(e, i, o));
}
function Bi() {
  return ["Android"].includes(navigator.platform) || /android/i.test(navigator.userAgent);
}
function ir() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
function Bc() {
  return typeof navigator < "u" ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : !1;
}
const Fc = (n = null, e = {}) => ({ editor: t, view: r, tr: i, dispatch: o }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const s = () => {
    (ir() || Bi()) && r.dom.focus(), Bc() && !ir() && !Bi() && r.dom.focus({ preventScroll: !0 }), requestAnimationFrame(() => {
      t.isDestroyed || (r.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  try {
    if (r.hasFocus() && n === null || n === !1) return !0;
  } catch {
    return !1;
  }
  if (o && n === null && !ps(t.state.selection))
    return s(), !0;
  const l = Pc(i.doc, n) || t.state.selection, a = t.state.selection.eq(l);
  return o && (a || i.setSelection(l), a && i.storedMarks && i.setStoredMarks(i.storedMarks), s()), !0;
}, Hc = (n, e) => (t) => n.every((r, i) => e(r, {
  ...t,
  index: i
})), _c = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt({
  from: t.selection.from,
  to: t.selection.to
}, n, e), ms = (n) => {
  const e = n.childNodes;
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const r = e[t];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? n.removeChild(r) : r.nodeType === 1 && ms(r);
  }
  return n;
};
function Wn(n) {
  if (typeof window > "u") throw new Error("[tiptap error]: there is no window object available, so this function cannot be used");
  const e = `<body>${n}</body>`, t = new window.DOMParser().parseFromString(e, "text/html").body;
  return ms(t);
}
function gs(n) {
  return typeof (n == null ? void 0 : n.nodesBetween) == "function";
}
function an(n, e, t) {
  if (gs(n)) return n;
  const r = typeof n == "object" && n !== null;
  t = {
    slice: !0,
    parseOptions: {},
    ...t
  };
  const i = typeof n == "string";
  if (r) try {
    if (Array.isArray(n) && n.length > 0) return P.fromArray(n.map((s) => e.nodeFromJSON(s)));
    const o = e.nodeFromJSON(n);
    return t.errorOnInvalidContent && o.check(), o;
  } catch (o) {
    if (t.errorOnInvalidContent) throw new Error("[tiptap error]: Invalid JSON content", { cause: o });
    return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", o), an("", e, t);
  }
  if (i) {
    if (t.errorOnInvalidContent) {
      let s = !1, l = "";
      const a = new ka({
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
      if (t.slice ? nn.fromSchema(a).parseSlice(Wn(n), t.parseOptions) : nn.fromSchema(a).parse(Wn(n), t.parseOptions), t.errorOnInvalidContent && s) throw new Error("[tiptap error]: Invalid HTML content", { cause: /* @__PURE__ */ new Error(`Invalid element found: ${l}`) });
    }
    const o = nn.fromSchema(e);
    return t.slice ? o.parseSlice(Wn(n), t.parseOptions).content : o.parse(Wn(n), t.parseOptions);
  }
  return an("", e, t);
}
function ys(n) {
  return !("type" in n);
}
function xs(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e) return;
  const i = n.steps[r];
  if (!(i instanceof Fe || i instanceof We)) return;
  const o = n.mapping.maps[r];
  let s = 0;
  o.forEach((l, a, c, u) => {
    s === 0 && (s = u);
  }), n.setSelection(en.near(n.doc.resolve(s), t));
}
const jc = (n, e, t) => ({ tr: r, dispatch: i, editor: o }) => {
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
      an(e, o.schema, {
        parseOptions: c,
        errorOnInvalidContent: !0
      });
    } catch (y) {
      a(y);
    }
    try {
      var s;
      l = an(e, o.schema, {
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
    const m = ys(l) ? l.content : [l];
    if (m.forEach((y) => {
      y.check(), d = d ? y.isText && y.marks.length === 0 : !1, h = h ? y.isBlock : !1;
    }), u === f && h) {
      const { parent: y } = r.doc.resolve(u);
      y.isTextblock && !y.type.spec.code && !y.childCount && (u -= 1, f += 1);
    }
    let g;
    if (d)
      Array.isArray(e) ? g = e.map((y) => y.text || "").join("") : gs(e) ? g = m.map((y) => {
        var b;
        return (b = y.text) !== null && b !== void 0 ? b : "";
      }).join("") : typeof e == "object" && e && e.text ? g = e.text : g = e, r.insertText(g, u, f);
    else {
      g = P.from(m);
      const y = r.doc.resolve(u), b = y.node(), z = y.parentOffset === 0, M = b.isText || b.isTextblock, k = b.content.size > 0;
      z && M && k && h && (u = Math.max(0, u - 1)), r.replaceWith(u, f, m);
    }
    t.updateSelection && xs(r, r.steps.length - 1, -1), t.applyInputRules && r.setMeta("applyInputRules", {
      from: u,
      text: g
    }), t.applyPasteRules && r.setMeta("applyPasteRules", {
      from: u,
      text: g
    });
  }
  return !0;
};
function bs(n) {
  for (let e = 0; e < n.edgeCount; e += 1) {
    const { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs()) return t;
  }
  return null;
}
const Wc = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
  const { pos: i, attrs: o, content: s, updateSelection: l = !0 } = n;
  let a;
  typeof i == "number" ? a = e.doc.resolve(i) : i ? a = i : a = e.selection.$from;
  const c = bs(a.parent.contentMatchAt(a.index()));
  if (!c) return !1;
  const u = Object.keys(c.spec.attrs || {}), f = o ? Object.fromEntries(Object.entries(o).filter(([h]) => u.includes(h))) : {};
  let d;
  if (s) {
    const h = an(s, r.schema);
    d = c.createAndFill(f, h);
  } else d = c.createAndFill(f);
  return d ? (t && (e.insert(a.pos, d), l && xs(e, e.steps.length - 1, -1)), !0) : !1;
}, qc = () => ({ state: n, dispatch: e }) => tc(n, e), Jc = () => ({ state: n, dispatch: e }) => nc(n, e), Kc = () => ({ state: n, dispatch: e }) => Qo(n, e), Vc = () => ({ state: n, dispatch: e }) => ns(n, e), Yc = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = pr(n.doc, n.selection.$from.pos, -1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Uc = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = pr(n.doc, n.selection.$from.pos, 1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Gc = () => ({ state: n, dispatch: e }) => Za(n, e), Xc = () => ({ state: n, dispatch: e }) => ec(n, e);
function vs() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function Qc(n) {
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
      ir() || vs() ? s = !0 : i = !0;
    else throw new Error(`Unrecognized modifier name: ${a}`);
  }
  return r && (t = `Alt-${t}`), i && (t = `Ctrl-${t}`), s && (t = `Meta-${t}`), o && (t = `Shift-${t}`), t;
}
const Zc = (n) => ({ editor: e, view: t, tr: r, dispatch: i }) => {
  const o = Qc(n).split(/-(?!$)/), s = o.find((c) => ![
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
function ui(n, e, t = {}) {
  const { from: r, to: i, empty: o } = n.selection, s = e ? Ye(e, n.schema) : null, l = [];
  n.doc.nodesBetween(r, i, (u, f) => {
    if (u.isText) return;
    const d = Math.max(r, f), h = Math.min(i, f + u.nodeSize);
    l.push({
      node: u,
      from: d,
      to: h
    });
  });
  const a = i - r, c = l.filter((u) => s ? s.name === u.node.type.name : !0).filter((u) => rr(u.node.attrs, t, { strict: !1 }));
  return o ? !!c.length : c.reduce((u, f) => u + f.to - f.from, 0) >= a;
}
const eu = (n, e = {}) => ({ state: t, dispatch: r }) => ui(t, Ye(n, t.schema), e) ? rc(t, r) : !1, tu = () => ({ state: n, dispatch: e }) => ls(n, e), nu = (n) => ({ state: e, dispatch: t }) => {
  const r = Ye(n, e.schema);
  return mc(r)(e, t);
}, ru = () => ({ state: n, dispatch: e }) => is(n, e);
function ws(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function Fi(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((r, i) => (t.includes(i) || (r[i] = n[i]), r), {});
}
const iu = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = ws(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = Ye(n, r.schema)), l === "mark" && (s = zt(n, r.schema));
  let a = !1;
  return t.selection.ranges.forEach((c) => {
    r.doc.nodesBetween(c.$from.pos, c.$to.pos, (u, f) => {
      o && o === u.type && (a = !0, i && t.setNodeMarkup(f, void 0, Fi(u.attrs, e))), s && u.marks.length && u.marks.forEach((d) => {
        s === d.type && (a = !0, i && t.addMark(f, f + u.nodeSize, s.create(Fi(d.attrs, e))));
      });
    });
  }), a;
}, ou = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), su = () => ({ tr: n, dispatch: e }) => {
  if (e) {
    const t = new Xs(n.doc);
    n.setSelection(t);
  }
  return !0;
}, lu = () => ({ state: n, dispatch: e }) => es(n, e), au = () => ({ state: n, dispatch: e }) => rs(n, e), cu = () => ({ state: n, dispatch: e }) => lc(n, e), uu = () => ({ state: n, dispatch: e }) => uc(n, e), du = () => ({ state: n, dispatch: e }) => cc(n, e);
function fu(n, e, t = {}, r = {}) {
  return an(n, e, {
    slice: !1,
    parseOptions: t,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
const hu = (n, { errorOnInvalidContent: e, emitUpdate: t = !0, parseOptions: r = {} } = {}) => ({ editor: i, tr: o, dispatch: s, commands: l }) => {
  const { doc: a } = o;
  if (r.preserveWhitespace !== "full") {
    const c = fu(n, i.schema, r, { errorOnInvalidContent: e ?? i.options.enableContentCheck });
    if (s) {
      const u = ys(c) ? c.content : [c];
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
function pu(n, e) {
  const t = zt(e, n.schema), { from: r, to: i, empty: o } = n.selection, s = [];
  o ? (n.storedMarks && s.push(...n.storedMarks), s.push(...n.selection.$head.marks())) : n.doc.nodesBetween(r, i, (a) => {
    s.push(...a.marks);
  });
  const l = s.find((a) => a.type.name === t.name);
  return l ? { ...l.attrs } : {};
}
function mu(n, e) {
  const t = new Ga(n);
  return e.forEach((r) => {
    r.steps.forEach((i) => {
      t.step(i);
    });
  }), t;
}
function gu(n, e) {
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
function di(n) {
  return (e) => gu(e.$from, n);
}
function En(n, e, t) {
  return n.config[e] === void 0 && n.parent ? En(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? En(n.parent, e, t) : null
  }) : n.config[e];
}
function yu(n) {
  return typeof n == "function";
}
function Hr(n, e = void 0, ...t) {
  return yu(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function ks(n) {
  return {
    baseExtensions: n.filter((e) => e.type === "extension"),
    nodeExtensions: n.filter((e) => e.type === "node"),
    markExtensions: n.filter((e) => e.type === "mark")
  };
}
function xu(n, e, t) {
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
function bu(n) {
  return Object.fromEntries(Object.entries(n.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
function vu(n, e = JSON.stringify) {
  const t = {};
  return n.filter((r) => {
    const i = e(r);
    return Object.prototype.hasOwnProperty.call(t, i) ? !1 : t[i] = !0;
  });
}
function wu(n) {
  const e = vu(n);
  return e.length === 1 ? e : e.filter((t, r) => !e.filter((i, o) => o !== r).some((i) => t.oldRange.from >= i.oldRange.from && t.oldRange.to <= i.oldRange.to && t.newRange.from >= i.newRange.from && t.newRange.to <= i.newRange.to));
}
function ku(n) {
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
  }), wu(r);
}
function Vn(n, e, t) {
  return Object.fromEntries(Object.entries(t).filter(([r]) => {
    const i = n.find((o) => o.type === e && o.name === r);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function Su(n, e, t = {}) {
  const { empty: r, ranges: i } = n.selection, o = e ? zt(e, n.schema) : null;
  if (r) return !!(n.storedMarks || n.selection.$from.marks()).filter((u) => o ? o.name === u.type.name : !0).find((u) => rr(u.attrs, t, { strict: !1 }));
  let s = 0;
  const l = [];
  if (i.forEach(({ $from: u, $to: f }) => {
    const d = u.pos, h = f.pos;
    n.doc.nodesBetween(d, h, (m, g) => {
      if (o && m.inlineContent && !m.type.allowsMarkType(o)) return !1;
      if (!m.isText && !m.marks.length) return;
      const y = Math.max(d, g), b = Math.min(h, g + m.nodeSize), z = b - y;
      s += z, l.push(...m.marks.map((M) => ({
        mark: M,
        from: y,
        to: b
      })));
    });
  }), s === 0) return !1;
  const a = l.filter((u) => o ? o.name === u.mark.type.name : !0).filter((u) => rr(u.mark.attrs, t, { strict: !1 })).reduce((u, f) => u + f.to - f.from, 0), c = l.filter((u) => o ? u.mark.type !== o && u.mark.type.excludes(o) : !0).reduce((u, f) => u + f.to - f.from, 0);
  return (a > 0 ? a + c : a) >= s;
}
function Er(n, e) {
  const { nodeExtensions: t } = ks(e), r = t.find((o) => o.name === n);
  if (!r) return !1;
  const i = Hr(En(r, "group", {
    name: r.name,
    options: r.options,
    storage: r.storage
  }));
  return typeof i != "string" ? !1 : i.split(" ").includes("list");
}
function Ss(n, { checkChildren: e = !0, ignoreWhitespace: t = !1 } = {}) {
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
      i !== !1 && (Ss(o, {
        ignoreWhitespace: t,
        checkChildren: e
      }) || (i = !1));
    }), i;
  }
  return !1;
}
function Nu(n, e, t) {
  const { selection: r } = e;
  let i = null;
  if (ps(r) && (i = r.$cursor), i) {
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
        const h = !d || d.type.allowsMarkType(t), m = !!t.isInSet(u.marks) || !u.marks.some((g) => g.type.excludes(t));
        c = h && m;
      }
      return !c;
    }), c;
  });
}
const Tu = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = t, { empty: s, ranges: l } = o, a = zt(n, r.schema);
  if (i)
    if (s) {
      const c = pu(r, a);
      t.addStoredMark(a.create({
        ...c,
        ...e
      }));
    } else l.forEach((c) => {
      const u = c.$from.pos, f = c.$to.pos;
      r.doc.nodesBetween(u, f, (d, h) => {
        const m = Math.max(h, u), g = Math.min(h + d.nodeSize, f);
        d.marks.find((y) => y.type === a) ? d.marks.forEach((y) => {
          a === y.type && t.addMark(m, g, a.create({
            ...y.attrs,
            ...e
          }));
        }) : t.addMark(m, g, a.create(e));
      });
    });
  return Nu(r, t, a);
}, Eu = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), Cu = (n, e = {}) => ({ state: t, dispatch: r, chain: i }) => {
  const o = Ye(n, t.schema);
  let s;
  return t.selection.$anchor.sameParent(t.selection.$head) && (s = t.selection.$anchor.parent.attrs), o.isTextblock ? i().command(({ commands: l }) => Oi(o, {
    ...s,
    ...e
  })(t) ? !0 : l.clearNodes()).command(({ state: l }) => Oi(o, {
    ...s,
    ...e
  })(l, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, Mu = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, i = Bt(n, 0, r.content.size), o = on.create(r, i);
    e.setSelection(o);
  }
  return !0;
}, Ru = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = r;
  let s, l;
  return typeof e == "number" ? (s = e, l = e) : e && "from" in e && "to" in e ? (s = e.from, l = e.to) : (s = o.from, l = o.to), i && t.doc.nodesBetween(s, l, (a, c) => {
    a.isText || t.setNodeMarkup(c, void 0, {
      ...a.attrs,
      dir: n
    });
  }), !0;
}, Au = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, { from: i, to: o } = typeof n == "number" ? {
      from: n,
      to: n
    } : n, s = rt.atStart(r).from, l = rt.atEnd(r).to, a = Bt(i, s, l), c = Bt(o, s, l), u = rt.create(r, a, c);
    e.setSelection(u);
  }
  return !0;
}, Iu = (n) => ({ state: e, dispatch: t }) => {
  const r = Ye(n, e.schema);
  return xc(r)(e, t);
};
function Hi(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    n.tr.ensureMarks(r);
  }
}
const zu = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
  const { selection: o, doc: s } = e, { $from: l, $to: a } = o, c = i.extensionManager.attributes, u = Vn(c, l.node().type.name, l.node().attrs);
  if (o instanceof on && o.node.isBlock)
    return !l.parentOffset || !bt(s, l.pos) ? !1 : (r && (n && Hi(t, i.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock) return !1;
  const f = a.parentOffset === a.parent.content.size, d = l.depth === 0 ? void 0 : bs(l.node(-1).contentMatchAt(l.indexAfter(-1)));
  let h = f && d ? [{
    type: d,
    attrs: u
  }] : void 0, m = bt(e.doc, e.mapping.map(l.pos), 1, h);
  if (!h && !m && bt(e.doc, e.mapping.map(l.pos), 1, d ? [{ type: d }] : void 0) && (m = !0, h = d ? [{
    type: d,
    attrs: u
  }] : void 0), r) {
    if (m && (o instanceof rt && e.deleteSelection(), e.split(e.mapping.map(l.pos), 1, h), d && !f && !l.parentOffset && l.parent.type !== d)) {
      const g = e.mapping.map(l.before()), y = e.doc.resolve(g);
      l.node(-1).canReplaceWith(y.index(), y.index() + 1, d) && e.setNodeMarkup(e.mapping.map(l.before()), d);
    }
    n && Hi(t, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return m;
}, $u = (n, e = {}) => ({ tr: t, state: r, dispatch: i, editor: o }) => {
  const s = Ye(n, r.schema), { $from: l, $to: a } = r.selection, c = r.selection.node;
  if (c && c.isBlock || l.depth < 2 || !l.sameParent(a)) return !1;
  const u = l.node(-1);
  if (u.type !== s) return !1;
  const f = o.extensionManager.attributes;
  if (l.parent.content.size === 0 && l.node(-1).childCount === l.indexAfter(-1)) {
    if (l.depth === 2 || l.node(-3).type !== s || l.index(-2) !== l.node(-2).childCount - 1) return !1;
    if (i) {
      var d;
      let b = P.empty;
      const z = l.index(-1) ? 1 : l.index(-2) ? 2 : 3;
      for (let H = l.depth - z; H >= l.depth - 3; H -= 1) b = P.from(l.node(H).copy(b));
      const M = l.indexAfter(-1) < l.node(-2).childCount ? 1 : l.indexAfter(-2) < l.node(-3).childCount ? 2 : 3, k = {
        ...Vn(f, l.node().type.name, l.node().attrs),
        ...e
      }, E = ((d = s.contentMatch.defaultType) === null || d === void 0 ? void 0 : d.createAndFill(k)) || void 0;
      b = b.append(P.from(s.createAndFill(null, E) || void 0));
      const A = l.before(l.depth - (z - 1));
      t.replace(A, l.after(-M), new Y(b, 4 - z, 0));
      let B = -1;
      t.doc.nodesBetween(A, t.doc.content.size, (H, C) => {
        if (B > -1) return !1;
        H.isTextblock && H.content.size === 0 && (B = C + 1);
      }), B > -1 && t.setSelection(rt.near(t.doc.resolve(B))), t.scrollIntoView();
    }
    return !0;
  }
  const h = a.pos === l.end() ? u.contentMatchAt(0).defaultType : null, m = {
    ...Vn(f, u.type.name, u.attrs),
    ...e
  }, g = {
    ...Vn(f, l.node().type.name, l.node().attrs),
    ...e
  };
  t.delete(l.pos, a.pos);
  const y = h ? [{
    type: s,
    attrs: m
  }, {
    type: h,
    attrs: g
  }] : [{
    type: s,
    attrs: m
  }];
  if (!bt(t.doc, l.pos, 2)) return !1;
  if (i) {
    const { selection: b, storedMarks: z } = r, { splittableMarks: M } = o.extensionManager, k = z || b.$to.parentOffset && b.$from.marks();
    if (t.split(l.pos, 2, y).scrollIntoView(), !k || !i) return !0;
    const E = k.filter((A) => M.includes(A.type.name));
    t.ensureMarks(E);
  }
  return !0;
};
function _i(n) {
  return !n || n === "1" ? null : n;
}
function Ns(n, e) {
  return _i(n) === _i(e);
}
const Cr = (n, e) => {
  const t = di((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && Vt(n.doc, t.pos)) || !Ns(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(t.pos), !0;
}, Mr = (n, e) => {
  const t = di((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && Vt(n.doc, r)) || !Ns(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(r), !0;
};
function Du(n) {
  const e = n.doc, t = e.firstChild;
  if (!t) return null;
  const r = e.resolve(1), i = e.resolve(t.nodeSize - 1);
  return rt.between(r, i);
}
const Ou = (n, e, t, r = {}) => ({ editor: i, tr: o, state: s, dispatch: l, chain: a, commands: c, can: u }) => {
  const { extensions: f, splittableMarks: d } = i.extensionManager, h = Ye(n, s.schema), m = Ye(e, s.schema), { selection: g, storedMarks: y } = s, { $from: b, $to: z } = g, M = b.blockRange(z), k = y || g.$to.parentOffset && g.$from.marks();
  if (!M) return !1;
  const E = di((F) => Er(F.type.name, f))(g), A = g.from === 0 && g.to === s.doc.content.size, B = s.doc.content.content, H = B.length === 1 ? B[0] : null, C = A && H && Er(H.type.name, f) ? {
    node: H,
    pos: 0
  } : null, J = E ?? C, I = !!E && M.depth >= 1 && M.depth - E.depth <= 1, W = !!C;
  if ((I || W) && J) {
    if (J.node.type === h)
      return A && W ? a().command(({ tr: F, dispatch: V }) => {
        const K = Du(F);
        return K ? (F.setSelection(K), V && V(F), !0) : !1;
      }).liftListItem(m).run() : c.liftListItem(m);
    if (Er(J.node.type.name, f) && h.validContent(J.node.content)) return a().command(() => (o.setNodeMarkup(J.pos, h), !0)).command(() => Cr(o, h)).command(() => Mr(o, h)).run();
  }
  return !t || !k || !l ? a().command(() => u().wrapInList(h, r) ? !0 : c.clearNodes()).wrapInList(h, r).command(() => Cr(o, h)).command(() => Mr(o, h)).run() : a().command(() => {
    const F = u().wrapInList(h, r), V = k.filter((K) => d.includes(K.type.name));
    return o.ensureMarks(V), F ? !0 : c.clearNodes();
  }).wrapInList(h, r).command(() => Cr(o, h)).command(() => Mr(o, h)).run();
}, Lu = (n, e = {}, t = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: o = !1 } = t, s = zt(n, r.schema);
  return Su(r, s, e) ? i.unsetMark(s, { extendEmptyMarkRange: o }) : i.setMark(s, e);
}, Pu = (n, e, t = {}) => ({ state: r, commands: i }) => {
  const o = Ye(n, r.schema), s = Ye(e, r.schema), l = ui(r, o, t);
  let a;
  return r.selection.$anchor.sameParent(r.selection.$head) && (a = r.selection.$anchor.parent.attrs), l ? i.setNode(s, a) : i.setNode(o, {
    ...a,
    ...t
  });
}, Bu = (n, e = {}) => ({ state: t, commands: r }) => {
  const i = Ye(n, t.schema);
  return ui(t, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, Fu = () => ({ state: n, dispatch: e }) => {
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
}, Hu = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
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
}, _u = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { extendEmptyMarkRange: o = !1 } = e, { selection: s } = t, l = zt(n, r.schema), { $from: a, empty: c, ranges: u } = s;
  if (!i) return !0;
  if (c && o) {
    var f;
    let { from: d, to: h } = s;
    const m = hs(a, l, (f = a.marks().find((g) => g.type === l)) === null || f === void 0 ? void 0 : f.attrs);
    m && (d = m.from, h = m.to), t.removeMark(d, h, l);
  } else u.forEach((d) => {
    t.removeMark(d.$from.pos, d.$to.pos, l);
  });
  return t.removeStoredMark(l), !0;
}, ju = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const { selection: i } = t;
  let o, s;
  return typeof n == "number" ? (o = n, s = n) : n && "from" in n && "to" in n ? (o = n.from, s = n.to) : (o = i.from, s = i.to), r && e.doc.nodesBetween(o, s, (l, a) => {
    if (l.isText) return;
    const c = { ...l.attrs };
    delete c.dir, e.setNodeMarkup(a, void 0, c);
  }), !0;
}, Wu = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = ws(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = Ye(n, r.schema)), l === "mark" && (s = zt(n, r.schema));
  let a = !1;
  return t.selection.ranges.forEach((c) => {
    const u = c.$from.pos, f = c.$to.pos;
    let d, h, m, g;
    t.selection.empty ? r.doc.nodesBetween(u, f, (y, b) => {
      o && o === y.type && (a = !0, m = Math.max(b, u), g = Math.min(b + y.nodeSize, f), d = b, h = y);
    }) : r.doc.nodesBetween(u, f, (y, b) => {
      b < u && o && o === y.type && (a = !0, m = Math.max(b, u), g = Math.min(b + y.nodeSize, f), d = b, h = y), b >= u && b <= f && (o && o === y.type && (a = !0, i && t.setNodeMarkup(b, void 0, {
        ...y.attrs,
        ...e
      })), s && y.marks.length && y.marks.forEach((z) => {
        if (s === z.type && (a = !0, i)) {
          const M = Math.max(b, u), k = Math.min(b + y.nodeSize, f);
          t.addMark(M, k, s.create({
            ...z.attrs,
            ...e
          }));
        }
      }));
    }), h && (d !== void 0 && i && t.setNodeMarkup(d, void 0, {
      ...h.attrs,
      ...e
    }), s && h.marks.length && h.marks.forEach((y) => {
      s === y.type && i && t.addMark(m, g, s.create({
        ...y.attrs,
        ...e
      }));
    }));
  }), a;
}, qu = new ft("__tiptap_decorations__"), Ju = (n) => ({ tr: e, dispatch: t }) => (t && e.setMeta(qu, {
  type: "force",
  name: n
}), !0), Ku = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Ye(n, t.schema);
  return dc(i, e)(t, r);
}, Vu = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Ye(n, t.schema);
  return fc(i, e)(t, r);
};
var Yu = /* @__PURE__ */ oa({
  blur: () => vc,
  clearContent: () => wc,
  clearNodes: () => kc,
  command: () => Sc,
  createParagraphNear: () => Nc,
  cut: () => Tc,
  deleteCurrentNode: () => Ec,
  deleteNode: () => Cc,
  deleteRange: () => Mc,
  deleteSelection: () => Ic,
  enter: () => zc,
  exitCode: () => $c,
  extendMarkRange: () => Oc,
  first: () => Lc,
  focus: () => Fc,
  forEach: () => Hc,
  insertContent: () => _c,
  insertContentAt: () => jc,
  insertDefaultBlock: () => Wc,
  joinBackward: () => Kc,
  joinDown: () => Jc,
  joinForward: () => Vc,
  joinItemBackward: () => Yc,
  joinItemForward: () => Uc,
  joinTextblockBackward: () => Gc,
  joinTextblockForward: () => Xc,
  joinUp: () => qc,
  keyboardShortcut: () => Zc,
  lift: () => eu,
  liftEmptyBlock: () => tu,
  liftListItem: () => nu,
  newlineInCode: () => ru,
  resetAttributes: () => iu,
  scrollIntoView: () => ou,
  selectAll: () => su,
  selectNodeBackward: () => lu,
  selectNodeForward: () => au,
  selectParentNode: () => cu,
  selectTextblockEnd: () => uu,
  selectTextblockStart: () => du,
  setContent: () => hu,
  setMark: () => Tu,
  setMeta: () => Eu,
  setNode: () => Cu,
  setNodeSelection: () => Mu,
  setTextDirection: () => Ru,
  setTextSelection: () => Au,
  sinkListItem: () => Iu,
  splitBlock: () => zu,
  splitListItem: () => $u,
  toggleList: () => Ou,
  toggleMark: () => Lu,
  toggleNode: () => Pu,
  toggleWrap: () => Bu,
  undoInputRule: () => Fu,
  unsetAllMarks: () => Hu,
  unsetMark: () => _u,
  unsetTextDirection: () => ju,
  updateAttributes: () => Wu,
  updateDecorations: () => Ju,
  wrapIn: () => Ku,
  wrapInList: () => Vu
});
typeof process < "u" && process.env.NODE_ENV;
function Uu(n) {
  return Object.prototype.toString.call(n).slice(8, -1);
}
function qn(n) {
  return Uu(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
function Ts(n, e) {
  const t = { ...n };
  return qn(n) && qn(e) && Object.keys(e).forEach((r) => {
    qn(e[r]) && qn(n[r]) ? t[r] = Ts(n[r], e[r]) : t[r] = e[r];
  }), t;
}
var Es = class {
  constructor(n = {}) {
    this.type = "extendable", this.parent = null, this.child = null, this.name = "", this.config = { name: this.name }, this.config = {
      ...this.config,
      ...n
    }, this.name = this.config.name;
  }
  get options() {
    return { ...Hr(En(this, "addOptions", { name: this.name })) };
  }
  get storage() {
    return { ...Hr(En(this, "addStorage", {
      name: this.name,
      options: this.options
    })) };
  }
  configure(n = {}) {
    const e = this.extend({
      ...this.config,
      addOptions: () => Ts(this.options, n)
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
}, Gu = class Cs extends Es {
  constructor(...e) {
    super(...e), this.type = "mark";
  }
  /**
  * Create a new Mark instance
  * @param config - Mark configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new Cs(t);
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
}, it = class Ms extends Es {
  constructor(...e) {
    super(...e), this.type = "extension";
  }
  /**
  * Create a new Extension instance
  * @param config - Extension configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new Ms(t);
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const t = typeof e == "function" ? e() : e;
    return super.extend(t);
  }
};
it.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return { blockSeparator: void 0 };
  },
  addProseMirrorPlugins() {
    return [new vt({
      key: new ft("clipboardTextSerializer"),
      props: { clipboardTextSerializer: () => {
        const { editor: n } = this, { state: e, schema: t } = n, { doc: r, selection: i } = e, o = bu(t), { blockSeparator: s } = this.options, l = {
          ...s !== void 0 ? { blockSeparator: s } : {},
          textSerializers: o
        };
        return [...i.ranges].sort((a, c) => a.$from.pos - c.$from.pos).map(({ $from: a, $to: c }) => xu(r, {
          from: a.pos,
          to: c.pos
        }, l)).join(s ?? `

`);
      } }
    })];
  }
});
it.create({
  name: "commands",
  addCommands() {
    return { ...Yu };
  }
});
it.create({
  name: "delete",
  onUpdate({ transaction: n, appendedTransactions: e }) {
    var t, r;
    const i = () => {
      var o, s, l;
      if ((o = (s = this.editor.options.coreExtensionOptions) === null || s === void 0 || (s = s.delete) === null || s === void 0 || (l = s.filterTransaction) === null || l === void 0 ? void 0 : l.call(s, n)) !== null && o !== void 0 ? o : n.getMeta("y-sync$")) return;
      const a = mu(n.before, [n, ...e]);
      ku(a).forEach((u) => {
        a.mapping.mapResult(u.oldRange.from).deletedAfter && a.mapping.mapResult(u.oldRange.to).deletedBefore && a.before.nodesBetween(u.oldRange.from, u.oldRange.to, (f, d) => {
          const h = d + f.nodeSize - 2, m = u.oldRange.from <= d && h <= u.oldRange.to;
          this.editor.emit("delete", {
            type: "node",
            node: f,
            from: d,
            to: h,
            newFrom: a.mapping.map(d),
            newTo: a.mapping.map(h),
            deletedRange: u.oldRange,
            newRange: u.newRange,
            partial: !m,
            editor: this.editor,
            transaction: n,
            combinedTransform: a
          });
        });
      });
      const c = a.mapping;
      a.steps.forEach((u, f) => {
        if (u instanceof ut) {
          var d, h;
          const m = c.slice(f).map(u.from, -1), g = c.slice(f).map(u.to), y = c.invert().map(m, -1), b = c.invert().map(g), z = m > 0 ? (d = a.doc.nodeAt(m - 1)) === null || d === void 0 ? void 0 : d.marks.some((k) => k.eq(u.mark)) : !1, M = (h = a.doc.nodeAt(g)) === null || h === void 0 ? void 0 : h.marks.some((k) => k.eq(u.mark));
          this.editor.emit("delete", {
            type: "mark",
            mark: u.mark,
            from: u.from,
            to: u.to,
            deletedRange: {
              from: y,
              to: b
            },
            newRange: {
              from: m,
              to: g
            },
            partial: !!(M || z),
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
it.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [new vt({
      key: new ft("tiptapDrop"),
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
it.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [new vt({
      key: new ft("editable"),
      props: { editable: () => this.editor.options.editable }
    })];
  }
});
const Xu = new ft("focusEvents");
it.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [new vt({
      key: Xu,
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
it.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const n = () => this.editor.commands.first(({ commands: s }) => [
      () => s.undoInputRule(),
      () => s.command(({ tr: l }) => {
        const { selection: a, doc: c } = l, { empty: u, $anchor: f } = a, { pos: d, parent: h } = f, m = f.parent.isTextblock && d > 0 ? l.doc.resolve(d - 1) : f, g = m.parent.type.spec.isolating, y = f.pos - f.parentOffset, b = g && m.parent.childCount === 1 ? y === f.pos : en.atStart(c).from === d;
        return !u || !h.type.isTextblock || h.textContent.length || !b || b && f.parent.type.name === "paragraph" ? !1 : s.clearNodes();
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
    return ir() || vs() ? o : i;
  },
  addProseMirrorPlugins() {
    return [new vt({
      key: new ft("clearDocument"),
      appendTransaction: (n, e, t) => {
        if (n.some((h) => h.getMeta("composition"))) return;
        const r = n.some((h) => h.docChanged) && !e.doc.eq(t.doc), i = n.some((h) => h.getMeta("preventClearDocument"));
        if (!r || i) return;
        const { empty: o, from: s, to: l } = e.selection, a = en.atStart(e.doc).from, c = en.atEnd(e.doc).to;
        if (o || !(s === a && l === c) || !Ss(t.doc)) return;
        const u = t.tr, f = us({
          state: t,
          transaction: u
        }), { commands: d } = new bc({
          editor: this.editor,
          state: f
        });
        if (d.clearNodes(), !!u.steps.length)
          return u;
      }
    })];
  }
});
it.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [new vt({
      key: new ft("tiptapPaste"),
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
it.create({
  name: "tabindex",
  addOptions() {
    return { value: void 0 };
  },
  addProseMirrorPlugins() {
    return [new vt({
      key: new ft("tabindex"),
      props: { attributes: () => {
        var n;
        return !this.editor.isEditable && this.options.value === void 0 ? {} : { tabindex: (n = this.options.value) !== null && n !== void 0 ? n : "0" };
      } }
    })];
  }
});
it.create({
  name: "textDirection",
  addOptions() {
    return { direction: void 0 };
  },
  addGlobalAttributes() {
    if (!this.options.direction) return [];
    const { nodeExtensions: n } = ks(this.extensions);
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
    return [new vt({
      key: new ft("textDirection"),
      props: { attributes: () => {
        const n = this.options.direction;
        return n ? { dir: n } : {};
      } }
    })];
  }
});
const Qu = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), Zu = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), ed = /^(https?:\/\/|mailto:)/i;
function td(n) {
  if (!n) return "";
  const e = [];
  for (const t of n.split(";")) {
    const r = t.indexOf(":");
    if (r < 0) continue;
    const i = t.slice(0, r).trim().toLowerCase(), o = t.slice(r + 1).trim();
    Zu.has(i) && o && e.push(`${i}: ${o}`);
  }
  return e.join("; ");
}
function _r(n) {
  if (n.nodeType === Node.TEXT_NODE) return n;
  if (n.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const e = n, t = e.tagName.toLowerCase(), r = () => {
    const l = document.createDocumentFragment();
    for (const a of Array.from(e.childNodes)) l.appendChild(_r(a));
    return l;
  };
  if (!Qu.has(t)) return r();
  if (t === "a") {
    const l = e.getAttribute("href") || "";
    if (!ed.test(l)) return r();
  }
  const i = document.createElement(t), o = e.getAttribute("style"), s = td(o || "");
  if (s && i.setAttribute("style", s), t === "span") {
    const l = e.getAttribute("data-text-style");
    l && i.setAttribute("data-text-style", l);
  }
  if (t === "a") {
    i.setAttribute("href", e.getAttribute("href"));
    const l = e.getAttribute("target"), a = e.getAttribute("rel");
    l && i.setAttribute("target", l), a && i.setAttribute("rel", a);
  }
  for (const l of Array.from(e.childNodes)) i.appendChild(_r(l));
  return i;
}
function Rs(n) {
  return n.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function nd(n) {
  const e = Rs(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  t.innerHTML = e;
  const r = document.createDocumentFragment();
  for (const s of Array.from(t.content.childNodes)) r.appendChild(_r(s));
  const i = document.createElement("div");
  return i.appendChild(r), i.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function Ef(n) {
  const e = Rs(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  return t.innerHTML = e, (t.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function Cf(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function rd(n) {
  return n.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function ji(n) {
  return n.replace(/\{\{([^{}]+)\}\}/g, (e, t) => `<span data-type="token" data-field="${t}">{{${t}}}</span>`);
}
const id = { text: "#52525b" }, od = ({ node: n, selected: e, extension: t, editor: r, view: i, getPos: o }) => {
  var d;
  const s = n.attrs.field ?? "", l = t.options, a = ((d = l.resolve) == null ? void 0 : d.call(l, s)) ?? null, c = (a == null ? void 0 : a.color) ?? id, u = (a == null ? void 0 : a.label) ?? `{{${s}}}`, f = a == null ? void 0 : a.nested;
  return /* @__PURE__ */ p(
    Ys,
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
        var b;
        if (h.button !== 0 || !r.isEditable) return;
        h.preventDefault(), r.isFocused || r.commands.focus();
        const m = typeof o == "function" ? o() : null;
        if (m == null) return;
        const g = i.state.doc.resolve(m), y = g.nodeAfter;
        y && on.isSelectable(y) && i.dispatch(i.state.tr.setSelection(new on(g))), (b = l.onTokenClick) == null || b.call(l, s, h.currentTarget.getBoundingClientRect(), m);
      },
      children: f ? /* @__PURE__ */ p("span", { className: "rt-token-nested", children: u }) : u
    }
  );
}, sd = al.extend({
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
    return Vs(od);
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
    return ["span", Ks({ "data-type": "token" }, e), `{{${n.attrs.field ?? ""}}}`];
  },
  renderText({ node: n }) {
    return `{{${n.attrs.field ?? ""}}}`;
  }
}), ld = 240, ad = 280, cd = ({ props: n, onApi: e }) => {
  const t = ur(), r = S(e);
  r.current = e, te(() => {
    r.current(t);
  }, [t]);
  const i = S(null);
  te(() => {
    var s, l;
    t.pointerDriven || (l = (s = i.current) == null ? void 0 : s.querySelector(".ui-item-highlighted")) == null || l.scrollIntoView({ block: "nearest" });
  }, [t.highlightedIndex, t.pointerDriven]), te(() => {
    n.items.length > 0 && t.highlightedIndex === -1 && t.setHighlighted(0, "keyboard");
  }, [n.items.length, t.highlightedIndex, t]);
  const o = cr();
  return /* @__PURE__ */ p(An.Provider, { value: t, children: /* @__PURE__ */ p(
    "div",
    {
      className: "ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto",
      style: { width: ad, maxHeight: ld },
      onMouseDown: (s) => s.preventDefault(),
      children: /* @__PURE__ */ p("div", { ref: i, children: n.items.map((s) => /* @__PURE__ */ p(
        ud,
        {
          item: s,
          d: o,
          command: () => n.command({ field: s.key })
        },
        s.key
      )) })
    }
  ) });
}, ud = ({ item: n, d: e, command: t }) => {
  const { myIndex: r, highlighted: i, setPointer: o } = ho({
    label: () => n.label,
    activate: t
  }), s = Ie(), l = { padding: `${L(8, 12, s)}px ${L(12, 16, s)}px`, fontSize: L(12, 14, s) };
  return /* @__PURE__ */ R(
    "div",
    {
      role: "option",
      style: l,
      className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${e.itemDefault} ${i ? "ui-item-highlighted" : ""}`,
      onPointerEnter: () => o(r),
      onClick: t,
      children: [
        /* @__PURE__ */ p("span", { className: `${e.icon} shrink-0 flex items-center`, children: /* @__PURE__ */ p("span", { className: "block w-2 h-2 rounded-full", style: { background: n.color.text } }) }),
        /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: n.label }),
        n.group && /* @__PURE__ */ p("span", { className: "shrink-0 text-[9px] uppercase tracking-wider", style: { color: n.color.text }, children: n.group })
      ]
    }
  );
}, Wi = () => {
  let n = null;
  const e = (r) => {
    n && (n.props = r, n.holder.style.display = r.items.length > 0 ? "" : "none", n.root.render(
      /* @__PURE__ */ p(cd, { props: r, onApi: (i) => {
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
      const o = cl(i);
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
}, dd = Gu.create({
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
}), Yn = new ft("retainedSelectionHighlight"), fd = it.create({
  name: "retainedSelectionHighlight",
  addProseMirrorPlugins() {
    return [
      new vt({
        key: Yn,
        state: {
          init: () => ({ held: !1, decorations: Dn.empty }),
          apply(n, e) {
            const t = n.getMeta(Yn), r = t ? t.held : e.held;
            if (!r) return { held: !1, decorations: Dn.empty };
            const { from: i, to: o, empty: s } = n.selection;
            return {
              held: r,
              decorations: s ? Dn.empty : Dn.create(n.doc, [Qs.inline(i, o, { class: "rt-retained-selection" })])
            };
          }
        },
        props: {
          decorations(n) {
            var e;
            return (e = Yn.getState(n)) == null ? void 0 : e.decorations;
          }
        }
      })
    ];
  }
}), Mf = {
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
function As(n, e) {
  const t = n.state.doc.resolve(e).nodeBefore;
  return t && t.type.name === "token" ? t.attrs.field ?? "" : null;
}
function hd(n) {
  const e = n.state.selection.$from, t = e.nodeBefore;
  if (!(t != null && t.isText)) return null;
  const r = t.text || "", i = r.lastIndexOf(".");
  if (i < 0) return null;
  const o = e.pos - r.length + i, s = As(n, o);
  return s == null ? null : { chipKey: s, dotPos: o };
}
const pd = Be.forwardRef(({
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
  const m = S(a);
  m.current = a;
  const g = S(c);
  g.current = c;
  const y = S(u);
  y.current = u;
  const b = S(null), z = S(null), M = S(e);
  M.current = e;
  const k = S(r);
  k.current = r;
  const E = S(o);
  E.current = o;
  const A = S(null), B = (W) => {
    var q;
    const F = W.getAttributes("textStyle"), V = W.getAttributes("reportTextStyle"), { from: K, to: N, empty: O } = W.state.selection;
    let Z = !1, le = !1, G = !1;
    if (!O) {
      const j = /* @__PURE__ */ new Set(), $ = /* @__PURE__ */ new Set(), ne = /* @__PURE__ */ new Set();
      W.state.doc.nodesBetween(K, N, (xe) => {
        if (!xe.isText) return;
        const ae = xe.marks.find((D) => D.type.name === "textStyle");
        j.add((ae == null ? void 0 : ae.attrs.fontFamily) || ""), $.add((ae == null ? void 0 : ae.attrs.fontSize) || "");
        const je = xe.marks.find((D) => D.type.name === "reportTextStyle");
        ne.add((je == null ? void 0 : je.attrs.styleId) || "");
      }), Z = j.size > 1, le = $.size > 1, G = ne.size > 1;
    }
    const re = {
      bold: W.isActive("bold"),
      italic: W.isActive("italic"),
      underline: W.isActive("underline"),
      strike: W.isActive("strike"),
      link: W.isActive("link"),
      color: F.color || "",
      fontFamily: F.fontFamily || "",
      fontSize: F.fontSize || "",
      textStyle: V.styleId || "",
      hasSelection: !O,
      fontFamilyMixed: Z,
      fontSizeMixed: le,
      textStyleMixed: G
    }, v = A.current;
    v && v.bold === re.bold && v.italic === re.italic && v.underline === re.underline && v.strike === re.strike && v.link === re.link && v.color === re.color && v.fontFamily === re.fontFamily && v.fontSize === re.fontSize && v.textStyle === re.textStyle && v.hasSelection === re.hasSelection && v.fontFamilyMixed === re.fontFamilyMixed && v.fontSizeMixed === re.fontSizeMixed && v.textStyleMixed === re.textStyleMixed || (A.current = re, (q = E.current) == null || q.call(E, re));
  }, H = (W) => {
    var O;
    const F = W.state.selection;
    let V = null;
    F instanceof on && F.node.type.name === "token" ? (V = { key: F.node.attrs.field ?? "", pos: F.from }, b.current = F.from) : b.current != null && (b.current = W.state.tr.mapping.map(b.current));
    const K = z.current, N = K && V && K.key === V.key && K.pos === V.pos;
    !K && !V || N || (z.current = V, (O = y.current) == null || O.call(y, V));
  }, C = (W) => {
    const F = nd(rd(W));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(F) ? "" : F;
  }, J = Be.useMemo(() => {
    const W = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: K }) => {
        var N;
        return ((N = h.current) == null ? void 0 : N.call(h, K)) ?? [];
      },
      command: ({ editor: K, range: N, props: O }) => {
        K.chain().focus().insertContentAt(N, { type: "token", attrs: { field: O.field } }).run();
      },
      render: Wi
    }, F = sd.configure({
      resolve: d.current ?? null,
      suggestion: W,
      onTokenClick: (K, N, O) => {
        var Z;
        b.current = O, (Z = g.current) == null || Z.call(g, K, N, O);
      }
    }), V = it.create({
      name: "tokenAttributeSuggestion",
      addProseMirrorPlugins() {
        return [
          ll({
            pluginKey: new ft("tokenAttributeSuggestion"),
            editor: this.editor,
            char: ".",
            // The gate is `shouldShow` (a chip must sit immediately before the
            // dot), not the prefix rule — the prefix here is an atom, not text.
            allowedPrefixes: null,
            decorationClass: "suggestion-attr",
            shouldShow: ({ editor: K, range: N }) => As(K, N.from) != null,
            items: ({ editor: K, query: N }) => {
              var Z;
              const O = hd(K);
              return O ? ((Z = m.current) == null ? void 0 : Z.call(m, O.chipKey, N)) ?? [] : [];
            },
            command: ({ editor: K, range: N, props: O }) => {
              K.chain().focus().insertContentAt(N, { type: "token", attrs: { field: O.field } }).run();
            },
            render: Wi
          })
        ];
      }
    });
    return [F, V];
  }, []), I = Us({
    immediatelyRender: !1,
    extensions: [
      Zs,
      el.configure({ placeholder: t }),
      tl,
      nl,
      rl,
      dd,
      fd,
      il,
      sl,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      ol.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      ...J
    ],
    content: ji(n || ""),
    editable: !r,
    onUpdate: ({ editor: W }) => {
      M.current(C(W.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: W }) => {
      B(W), H(W);
    }
  });
  return te(() => {
    if (!I || I.isFocused) return;
    C(I.getHTML()) !== n && (A.current = null, I.commands.setContent(ji(n || ""), { emitUpdate: !1 }), B(I));
  }, [n, I]), te(() => {
    I && I.setEditable(!r);
  }, [r, I]), te(() => {
    I && (A.current = null, B(I), H(I));
  }, [I]), zs(f, () => ({
    exec: (W, F, V) => {
      if (!I || k.current) return;
      const K = I.chain(), N = (V == null ? void 0 : V.focus) === !1 ? K : K.focus();
      switch (W) {
        case "bold":
          N.toggleBold().run();
          break;
        case "italic":
          N.toggleItalic().run();
          break;
        case "underline":
          N.toggleUnderline().run();
          break;
        case "strikeThrough":
          N.toggleStrike().run();
          break;
        case "foreColor":
          F && N.setColor(F).run();
          break;
        case "unsetColor":
          N.unsetColor().run();
          break;
        case "fontFamily":
          F && N.setFontFamily(F).run();
          break;
        case "unsetFontFamily":
          N.unsetFontFamily().run();
          break;
        case "fontSize":
          F && N.setFontSize(F).run();
          break;
        case "unsetFontSize":
          N.unsetFontSize().run();
          break;
        // Linked named style: mark the run with the consumer's style id. Direct
        // font family/size on the range is cleared so the linked style's
        // typography takes effect (the object-level precedent); bold/italic
        // marks stay — direct character formatting still wins (Word).
        case "textStyle":
          F && N.setMark("reportTextStyle", { styleId: F }).unsetFontFamily().unsetFontSize().run();
          break;
        case "unsetTextStyle":
          N.unsetMark("reportTextStyle").run();
          break;
        // Clear every inline mark (bold/italic/underline/strike/color/font/
        // link) and normalize the block — the cell-chrome Reset path.
        case "clearFormatting":
          N.unsetAllMarks().clearNodes().run();
          break;
        case "link":
          F && N.extendMarkRange("link").setLink({ href: F }).run();
          break;
        case "unlink":
          N.extendMarkRange("link").unsetLink().run();
          break;
      }
    },
    focus: (W) => I == null ? void 0 : I.commands.focus(W),
    insertToken: (W) => {
      !I || k.current || I.chain().focus().insertContent({ type: "token", attrs: { field: W } }).run();
    },
    replaceToken: (W) => {
      if (!I || k.current) return;
      const F = b.current;
      F != null && I.commands.command(({ tr: V }) => {
        const K = V.doc.nodeAt(F);
        if (!K || K.type.name !== "token") return !1;
        V.setNodeMarkup(F, void 0, { field: W });
        const N = V.doc.resolve(F);
        return N.nodeAfter && N.nodeAfter.type.name === "token" && V.setSelection(new on(N)), !0;
      });
    },
    holdSelectionHighlight: (W) => {
      !I || I.isDestroyed || I.view.dispatch(I.state.tr.setMeta(Yn, { held: W }));
    }
  }), [I]), /* @__PURE__ */ p(Gs, { editor: I, className: `richtext-editor ${i || ""}` });
});
pd.displayName = "RichTextEditor";
const md = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], gd = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], qi = ({ className: n = "w-3 h-3" }) => /* @__PURE__ */ p("span", { className: `${n} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ p("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), yd = ({ value: n, disabled: e, onChange: t, mixed: r }) => {
  const [i, o] = ee(!1);
  return /* @__PURE__ */ p(
    dr,
    {
      open: i,
      onOpenChange: o,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ R("button", { type: "button", disabled: e, className: `${na} w-28 justify-between`, children: [
        r ? /* @__PURE__ */ p("span", { className: "truncate italic text-zinc-500", children: "Mixed" }) : /* @__PURE__ */ p("span", { className: "truncate", style: { fontFamily: n || "Helvetica" }, children: n || "Helvetica" }),
        /* @__PURE__ */ p(Cn, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: md.map((s) => /* @__PURE__ */ p(Nl, { onClick: () => {
        t(s), o(!1);
      }, icon: !r && s === n ? /* @__PURE__ */ p(or, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ p("span", { style: { fontFamily: s }, children: s }) }, s))
    }
  );
}, xd = ({ editorRef: n, disabled: e, active: t }) => {
  const [r, i] = ee(!1), o = fr(), [s, l] = ee(""), a = () => {
    var u;
    const c = s.trim();
    c && ((u = n.current) == null || u.exec("link", c), i(!1));
  };
  return /* @__PURE__ */ p(
    dr,
    {
      open: r,
      onOpenChange: i,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ p(
        at,
        {
          theme: "dark",
          active: t,
          disabled: e,
          onMouseDown: (c) => c.preventDefault(),
          style: { ...o.toggle, padding: 0 },
          className: "justify-center",
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ p(Hs, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ R("div", { className: "p-2 flex flex-col gap-2", children: [
        /* @__PURE__ */ p(
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
            className: ea + " w-full"
          }
        ),
        /* @__PURE__ */ R("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ p(at, { theme: "dark", onClick: a, style: o.control, disabled: !s.trim(), children: "Apply" }),
          /* @__PURE__ */ p(
            at,
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
}, Rf = ({ editorRef: n, disabled: e, active: t, lockedFormatting: r, trailing: i, font: o, fontSizeSlot: s, showClearFormatting: l, dividers: a = !0 }) => {
  const [c, u] = ee(!1), f = (y, b) => {
    var z;
    return (z = n.current) == null ? void 0 : z.exec(y, b);
  }, d = fr(), h = (y) => !!(r != null && r[y]), m = "flex items-center gap-1 shrink-0", g = a ? /* @__PURE__ */ p("div", { className: bo }) : null;
  return /* @__PURE__ */ R("div", { className: `flex flex-wrap items-center ${a ? "gap-x-1" : "gap-x-2"} gap-y-1.5`, children: [
    /* @__PURE__ */ R("div", { className: m, children: [
      /* @__PURE__ */ p(Xt, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ p(at, { theme: "dark", "aria-label": "Bold", active: ((t == null ? void 0 : t.bold) ?? !1) || h("bold"), disabled: e || h("bold"), onMouseDown: (y) => y.preventDefault(), onClick: () => f("bold"), style: { ...d.toggle, padding: 0 }, className: "justify-center font-bold", children: "B" }) }),
      /* @__PURE__ */ p(Xt, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ p(at, { theme: "dark", "aria-label": "Italic", active: ((t == null ? void 0 : t.italic) ?? !1) || h("italic"), disabled: e || h("italic"), onMouseDown: (y) => y.preventDefault(), onClick: () => f("italic"), style: { ...d.toggle, padding: 0 }, className: "justify-center italic", children: "I" }) }),
      /* @__PURE__ */ p(Xt, { content: "Underline", children: /* @__PURE__ */ p(at, { theme: "dark", "aria-label": "Underline", active: (t == null ? void 0 : t.underline) ?? !1, disabled: e, onMouseDown: (y) => y.preventDefault(), onClick: () => f("underline"), style: { ...d.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ p(Ps, { className: "w-3 h-3" }) }) }),
      /* @__PURE__ */ p(Xt, { content: "Strikethrough", children: /* @__PURE__ */ p(at, { theme: "dark", "aria-label": "Strikethrough", active: (t == null ? void 0 : t.strike) ?? !1, disabled: e, onMouseDown: (y) => y.preventDefault(), onClick: () => f("strikeThrough"), style: { ...d.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ p(Bs, { className: "w-3 h-3" }) }) })
    ] }),
    g,
    /* @__PURE__ */ p("div", { className: m, children: /* @__PURE__ */ p(xd, { editorRef: n, disabled: e, active: (t == null ? void 0 : t.link) ?? !1 }) }),
    g,
    /* @__PURE__ */ p("div", { className: m, children: /* @__PURE__ */ p(
      dr,
      {
        open: c,
        onOpenChange: u,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ R(at, { theme: "dark", disabled: e, style: d.control, className: "justify-between min-w-0", title: "Text color", children: [
          t != null && t.color ? /* @__PURE__ */ p("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: t.color } }) : /* @__PURE__ */ p(qi, {}),
          /* @__PURE__ */ p(Cn, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ R("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ p(
            "button",
            {
              onClick: () => {
                f("unsetColor"), u(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${t != null && t.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ p(qi, { className: "w-3.5 h-3.5" })
            }
          ),
          gd.map((y) => /* @__PURE__ */ p(
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
    (o || s || l) && /* @__PURE__ */ R(Ve, { children: [
      g,
      /* @__PURE__ */ R("div", { className: m, children: [
        o && /* @__PURE__ */ p(yd, { value: o.value || "Helvetica", mixed: o.mixed, disabled: e, onChange: o.onChange }),
        s,
        l && /* @__PURE__ */ p(Xt, { content: "Clear formatting", children: /* @__PURE__ */ p(
          at,
          {
            theme: "dark",
            "aria-label": "Clear formatting",
            disabled: e,
            onMouseDown: (y) => y.preventDefault(),
            onClick: () => f("clearFormatting"),
            style: { ...d.toggle, padding: 0 },
            className: "justify-center",
            children: /* @__PURE__ */ p(Fs, { className: "w-3 h-3" })
          }
        ) })
      ] })
    ] }),
    i && /* @__PURE__ */ R(Ve, { children: [
      g,
      /* @__PURE__ */ p("div", { className: m, children: i })
    ] })
  ] });
};
function fi(n, e, t) {
  return Math.max(e, Math.min(t, n));
}
function bd(n, e, t, r, i) {
  return fi(n + e * i, t, r);
}
const vd = 2;
function wd(n, e, t, r, i) {
  return fi(n + Math.trunc(e / vd) * i, t, r);
}
const kd = 3;
function Af({
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
  const [h, m] = ee(null), [g, y] = ee(!1), b = S(!1), z = S(null), M = S(null), k = S(null), E = Ie(), A = yo(), B = c === void 0;
  te(() => () => {
    var N;
    return (N = z.current) == null ? void 0 : N.call(z);
  }, []), ct(() => {
    const N = k.current, O = M.current;
    !B && N && O && (O.style.color = getComputedStyle(N).color);
  }, [B, c]), te(() => {
    b.current || m(null);
  }, [n]);
  const H = n ?? r, C = h !== null ? h : n != null ? String(n) : f ? "" : String(r), J = (N) => fi(N, e, t), I = (N) => {
    const O = bd(H, N, e, t, o);
    O !== H && (b.current && m(String(O)), i(O));
  }, W = (N) => {
    if (l || s || N.pointerType !== "mouse" || N.button !== 0) return;
    const O = N.currentTarget, Z = N.clientY, le = H;
    let G = le, re = !1;
    const v = (j) => {
      const $ = Z - j.clientY;
      if (!re) {
        if (Math.abs($) < kd) return;
        re = !0, O.blur(), O.style.userSelect = "none";
      }
      const ne = wd(le, $, e, t, o);
      ne !== G && (G = ne, i(ne));
    }, q = () => {
      z.current = null, window.removeEventListener("pointermove", v), window.removeEventListener("pointerup", q), window.removeEventListener("pointercancel", q), O.style.userSelect = "", re && O.blur();
    };
    z.current = q, window.addEventListener("pointermove", v), window.addEventListener("pointerup", q), window.addEventListener("pointercancel", q);
  }, F = (N) => ({
    type: "button",
    tabIndex: -1,
    "aria-label": N === 1 ? "Increase" : "Decrease",
    disabled: !!l || !!s || (N === 1 ? H >= t : H <= e),
    onPointerDown: (O) => O.preventDefault(),
    onClick: () => I(N)
  }), V = B ? L(22, 30, E) : L(16, 22, E), K = B ? L(14, 18, E) : L(11, 15, E);
  return /* @__PURE__ */ R(
    "span",
    {
      ref: M,
      className: `ui-number ${B ? "ui-number-box" : ""}`,
      ...d ? { "data-theme": d } : {},
      children: [
        /* @__PURE__ */ p(
          "input",
          {
            ref: k,
            type: "number",
            "aria-label": a,
            title: u,
            placeholder: f,
            value: C,
            readOnly: s,
            disabled: l,
            className: c ?? "ui-input w-20",
            style: {
              ...B ? { ...A, minHeight: L(30, 38, E) } : {},
              paddingRight: V + 2,
              cursor: l || s ? void 0 : g ? "text" : "ns-resize"
            },
            onFocus: () => {
              b.current = !0, y(!0);
            },
            onChange: (N) => {
              const O = N.target.value;
              m(O);
              const Z = parseInt(O, 10);
              O !== "" && !Number.isNaN(Z) && i(J(Z));
            },
            onBlur: () => {
              if (b.current = !1, y(!1), h === null) return;
              const N = parseInt(h, 10);
              Number.isNaN(N) || i(J(N)), m(null);
            },
            onKeyDown: (N) => {
              N.key === "Enter" && N.target.blur(), N.key === "Escape" && (m(null), N.target.blur()), !s && !l && (N.key === "ArrowUp" || N.key === "ArrowDown") && (N.preventDefault(), I(N.key === "ArrowUp" ? 1 : -1));
            },
            onPointerDown: W
          }
        ),
        /* @__PURE__ */ R("span", { className: "ui-number-steppers", style: { width: V }, children: [
          /* @__PURE__ */ p("button", { ...F(1), className: "ui-number-step", children: /* @__PURE__ */ p(_s, { style: { width: K, height: K } }) }),
          /* @__PURE__ */ p("button", { ...F(-1), className: "ui-number-step", children: /* @__PURE__ */ p(Cn, { style: { width: K, height: K } }) })
        ] })
      ]
    }
  );
}
function If({ title: n, icon: e, count: t, tone: r = "default", collapsed: i, onToggle: o, trailing: s, bodyClass: l, className: a = "", dataProps: c, children: u }) {
  const f = Ie(), d = It({ px: 12, py: 8, fs: 12 }, { px: 14, py: 12, fs: 14 }), h = L(14, 16, f), m = { width: h, height: h }, g = L(10, 12, f);
  return /* @__PURE__ */ R("div", { ...c, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${a}`, children: [
    /* @__PURE__ */ R("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1 bg-[var(--ui-card-header-bg)] text-[color:var(--ui-card-header-text)] hover:bg-[var(--ui-card-header-hover)] transition-colors", style: d, children: [
      /* @__PURE__ */ R(
        "button",
        {
          type: "button",
          onClick: o,
          className: "flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer",
          children: [
            i ? /* @__PURE__ */ p(Un, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: m }) : /* @__PURE__ */ p(Cn, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: m }),
            e && /* @__PURE__ */ p("span", { className: "text-[color:var(--ui-card-header-icon)] shrink-0 inline-flex", children: e }),
            /* @__PURE__ */ p("span", { className: "font-semibold text-[color:var(--ui-card-header-text)] truncate", children: n }),
            t && /* @__PURE__ */ p("span", { className: "ui-card-count shrink-0", style: { fontSize: g }, children: t })
          ]
        }
      ),
      s && /* @__PURE__ */ p("div", { className: "shrink-0", children: s })
    ] }),
    !i && u && /* @__PURE__ */ p("div", { className: l || "ui-card-band border-t p-1.5 space-y-1", children: u })
  ] });
}
function Is({
  expanded: n,
  collapsedWidth: e,
  expandedWidth: t,
  trigger: r,
  field: i,
  rootRef: o,
  shrink: s = !1,
  className: l = "",
  style: a,
  ...c
}) {
  return /* @__PURE__ */ R(
    "div",
    {
      ...c,
      ref: o,
      className: `relative inline-flex ${s ? "shrink-0" : ""} ${l}`,
      style: {
        ...a,
        width: n ? t : e,
        transition: "width 220ms cubic-bezier(0.32, 0.72, 0, 1)"
      },
      children: [
        /* @__PURE__ */ p(
          "div",
          {
            className: `w-full origin-left ${n ? "opacity-0 pointer-events-none" : "opacity-100"} motion-reduce:transition-none`,
            style: {
              transform: n ? "scaleX(0.98)" : "scaleX(1)",
              transition: "opacity 150ms ease, transform 220ms cubic-bezier(0.32, 0.72, 0, 1)"
            },
            "aria-hidden": n,
            children: r
          }
        ),
        /* @__PURE__ */ p(
          "div",
          {
            className: `absolute inset-0 origin-left ${n ? "opacity-100" : "opacity-0 pointer-events-none"} motion-reduce:transition-none`,
            style: {
              transform: n ? "scaleX(1)" : "scaleX(0.96)",
              transition: "opacity 150ms ease, transform 220ms cubic-bezier(0.32, 0.72, 0, 1)"
            },
            "aria-hidden": !n,
            children: i
          }
        )
      ]
    }
  );
}
function Sd({
  value: n,
  onChange: e,
  triggerLabel: t = "Filter",
  triggerIcon: r,
  placeholder: i = "Filter…",
  collapsedWidth: o = 88,
  expandedWidth: s = 200,
  variant: l = "subtle",
  theme: a,
  active: c = !1,
  autoFocus: u = !1,
  onExpandedChange: f,
  actions: d,
  leadingIcon: h,
  showClear: m = !0,
  onSubmit: g,
  onCancel: y,
  cancelOnEscape: b = !1,
  cancelOnOutside: z = !1,
  className: M = "",
  "aria-label": k
}) {
  const [E, A] = ee(u), B = S(E);
  B.current = E;
  const H = S(null), C = S(null), J = S(null), I = Qi(), W = oe((v) => {
    B.current !== v && (B.current = v, A(v), f == null || f(v));
  }, [f]), F = oe((v = !1) => {
    var q;
    W(!1), (q = C.current) == null || q.blur(), v && requestAnimationFrame(() => {
      var j;
      return (j = J.current) == null ? void 0 : j.focus();
    });
  }, [W]), V = oe(() => {
    W(!0), requestAnimationFrame(() => {
      const v = C.current;
      if (!v) return;
      v.focus();
      const q = v.value.length;
      v.setSelectionRange(q, q);
    });
  }, [W]);
  te(() => {
    u && V();
  }, [u, V]), te(() => {
    var j;
    if (!E) return;
    const v = ((j = H.current) == null ? void 0 : j.ownerDocument) ?? document, q = ($) => {
      var xe;
      const ne = $.target;
      ne && ((xe = H.current) != null && xe.contains(ne) || (z && (y == null || y()), F()));
    };
    return v.addEventListener("pointerdown", q, !0), () => v.removeEventListener("pointerdown", q, !0);
  }, [E, F, z, y]);
  const K = oe((v) => {
    var j;
    if (!E) return;
    const q = v.relatedTarget;
    q && ((j = H.current) != null && j.contains(q)) || (z && (y == null || y()), F());
  }, [E, F, z, y]), N = oe((v) => {
    if (v.key === "Enter" && g) {
      v.preventDefault(), g(n), F(!0);
      return;
    }
    v.key === "Escape" && (v.preventDefault(), v.stopPropagation(), b ? y == null || y() : e(""), F(!0));
  }, [e, F, b, y, g, n]), O = h === void 0 ? r ?? /* @__PURE__ */ p(Pt, { className: "w-3.5 h-3.5" }) : h, G = 8 + (((d == null ? void 0 : d.length) || 0) + (m && n ? 1 : 0)) * (I.box + 2), re = (v) => /* @__PURE__ */ p(
    "span",
    {
      style: { width: I.icon, height: I.icon },
      className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
      children: v
    }
  );
  return /* @__PURE__ */ p(
    Is,
    {
      expanded: E,
      collapsedWidth: o,
      expandedWidth: s,
      rootRef: H,
      shrink: !0,
      "data-morph-search": !0,
      "data-theme": a,
      "data-expanded": E ? "true" : "false",
      className: M,
      onBlur: K,
      trigger: /* @__PURE__ */ p(
        at,
        {
          ref: J,
          type: "button",
          variant: l,
          size: "minimal",
          theme: a,
          icon: r ?? /* @__PURE__ */ p(Pt, { className: "w-3.5 h-3.5" }),
          active: c,
          onClick: V,
          className: `w-full justify-start ${E ? "pointer-events-none" : ""}`,
          tabIndex: E ? -1 : 0,
          "aria-expanded": E,
          "aria-label": k || t,
          "data-morph-search-trigger": !0,
          children: /* @__PURE__ */ p("span", { className: "min-w-0 truncate", children: t })
        }
      ),
      field: /* @__PURE__ */ R(Ve, { children: [
        O && /* @__PURE__ */ p(
          "span",
          {
            className: "ui-icon absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none",
            style: { width: I.icon, height: I.icon },
            children: re(O)
          }
        ),
        /* @__PURE__ */ p(
          "input",
          {
            ref: C,
            value: n,
            onChange: (v) => e(v.target.value),
            onKeyDown: N,
            placeholder: i,
            "aria-label": k || i,
            tabIndex: E ? 0 : -1,
            "data-morph-search-input": !0,
            style: { paddingLeft: O ? I.icon + 16 : 10, paddingRight: G },
            className: `${$r("sm")} w-full`
          }
        ),
        /* @__PURE__ */ R("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
          d == null ? void 0 : d.map((v) => /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              "aria-label": v.label,
              title: v.label,
              tabIndex: E ? 0 : -1,
              onMouseDown: (q) => q.preventDefault(),
              onClick: () => {
                v.onClick(n, { close: () => F(!0) }), v.keepOpen || F(!0);
              },
              style: { width: I.box, height: I.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-action": v.key,
              children: re(v.icon)
            },
            v.key
          )),
          m && n && /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              "aria-label": "Clear",
              tabIndex: E ? 0 : -1,
              onClick: () => {
                e(""), requestAnimationFrame(() => {
                  var v;
                  return (v = C.current) == null ? void 0 : v.focus();
                });
              },
              style: { width: I.box, height: I.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-clear": !0,
              children: /* @__PURE__ */ p(_t, { size: I.icon })
            }
          )
        ] })
      ] })
    }
  );
}
function zf({
  triggerLabel: n,
  triggerIcon: e = /* @__PURE__ */ p(jr, { className: "w-3.5 h-3.5" }),
  fieldIcon: t = null,
  actions: r = [],
  onSubmit: i,
  onCancel: o,
  clearOnSubmit: s = !0,
  clearOnCancel: l = !0,
  onChange: a,
  value: c,
  variant: u = "primary",
  ...f
}) {
  const d = (g) => {
    i == null || i(g), s && a("");
  }, h = () => {
    o == null || o(), l && a("");
  }, m = [
    ...r,
    ...i ? [{
      key: "submit",
      label: "Submit",
      icon: /* @__PURE__ */ p(or, { className: "w-3.5 h-3.5" }),
      onClick: d
    }] : [],
    ...o ? [{
      key: "cancel",
      label: "Cancel",
      icon: /* @__PURE__ */ p(_t, { className: "w-3.5 h-3.5" }),
      onClick: h
    }] : []
  ];
  return /* @__PURE__ */ p(
    Sd,
    {
      ...f,
      value: c,
      onChange: a,
      triggerLabel: n,
      triggerIcon: e,
      leadingIcon: t,
      actions: m,
      showClear: !1,
      variant: u,
      onSubmit: i ? d : void 0,
      onCancel: o ? h : void 0,
      cancelOnEscape: !!o,
      cancelOnOutside: !!o
    }
  );
}
function Nd(n) {
  return n.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
}
function Td(n, e, t) {
  if (t.length === 0) return { matched: !1 };
  const r = n.label.toLowerCase(), i = (n.detail || "").toLowerCase(), o = ((e == null ? void 0 : e.label) || "").toLowerCase(), s = n.fields || [], l = [
    r,
    i,
    o,
    n.keywords || "",
    ...s.map((a) => a.value.toLowerCase())
  ].join(`
`);
  if (!t.every((a) => l.includes(a))) return { matched: !1 };
  if (t.every((a) => r.includes(a) || o.includes(a))) return { matched: !0 };
  for (const a of t) {
    const c = s.find((u) => u.value.toLowerCase().includes(a));
    if (c) {
      const u = c.value.trim();
      return { matched: !0, detail: `${c.label}: ${u.length > 48 ? `${u.slice(0, 47)}…` : u}` };
    }
    if (i.includes(a)) return { matched: !0, detail: n.detail };
  }
  return { matched: !0 };
}
function Ed(n, e, t) {
  const r = Nd(t), i = r.length > 0, o = new Map(e.map((c) => [c.key, c])), s = [];
  for (const c of n) {
    const { matched: u, detail: f } = Td(c, c.group ? o.get(c.group) : void 0, r);
    u && s.push({ item: c, detail: f });
  }
  const l = new Set(s.map((c) => c.item.group).filter(Boolean)), a = i ? e.filter((c) => l.has(c.key) || c.label.toLowerCase().includes(t.trim().toLowerCase())) : e;
  return { hits: s, visibleGroups: a, hasQuery: i };
}
function Cd(n) {
  var s;
  const { hits: e, visibleGroups: t, hasQuery: r } = Ed(n.items, n.groups, n.query), i = [];
  if (n.query.trim(), !r) {
    if (n.browseAll) {
      for (const l of n.items) i.push({ kind: "item", hit: { item: l } });
      return i;
    }
    if (n.browseGroups !== !1)
      for (const l of t) {
        i.push({ kind: "group", group: l });
        const a = ((s = n.expandedGroups) == null ? void 0 : s.has(l.key)) ?? !1;
        if (n.includeGroupItems)
          for (const c of n.items)
            c.group === l.key && i.push({ kind: "item", hit: { item: c }, hidden: !a });
        else if (a)
          for (const c of n.items)
            c.group === l.key && i.push({ kind: "item", hit: { item: c } });
      }
    return i;
  }
  const o = /* @__PURE__ */ new Set();
  for (const l of t) {
    i.push({ kind: "group", group: l }), o.add(l.key);
    for (const a of e)
      a.item.group === l.key && i.push({ kind: "item", hit: a });
  }
  for (const l of e)
    (!l.item.group || !o.has(l.item.group)) && i.push({ kind: "item", hit: l });
  return i.length === 0 && (i.push({ kind: "empty" }), (n.emptyActionLabels || []).forEach((l, a) => {
    i.push({ kind: "action", label: l, actionIndex: a });
  })), i;
}
function $f({
  items: n,
  groups: e = [],
  mode: t = "expandable",
  triggerLabel: r = "Search",
  triggerIcon: i,
  placeholder: o = "Search…",
  query: s,
  onQueryChange: l,
  onSelect: a,
  onSelectGroup: c,
  onClose: u,
  closeOnSelect: f = !0,
  openOnFocus: d = !0,
  expandableGroups: h = !1,
  browseExpanded: m = !1,
  groupExpandMode: g = "multiple",
  browseAll: y = !1,
  selectedId: b,
  autoFocus: z = !0,
  collapsedWidth: M = 128,
  expandedWidth: k = 288,
  panelWidth: E,
  maxMenuHeight: A = 420,
  theme: B = "light",
  morph: H = !0,
  emptyTitle: C,
  emptyHint: J,
  renderEmpty: I,
  emptyActions: W,
  leadingActions: F,
  hideLeadingOnEmpty: V = !1,
  footerActions: K,
  fieldActions: N
}) {
  const O = s !== void 0, [Z, le] = ee(""), G = O ? s : Z, re = oe((x) => {
    O || le(x), l == null || l(x);
  }, [O, l]), [v, q] = ee(!1), [j, $] = ee(t === "inline"), ne = lt(() => e.map((x) => x.key).join("\0"), [e]), xe = lt(() => new Set(ne ? ne.split("\0") : []), [ne]), [ae, je] = ee(() => m ? xe : /* @__PURE__ */ new Set()), [D, ce] = ee(0), qe = S(!1), ue = oe((x, T = "keyboard") => {
    qe.current = T === "pointer", ce(x);
  }, []), De = S(null), he = S(null), Se = S(null), Ce = S(null), ze = S(null), Oe = S(0), Ne = qr(), $t = cn(), Xe = cr(), kt = Xr(), dn = co(), Le = Qi(), et = 8 + (((N == null ? void 0 : N.length) || 0) + (G ? 1 : 0)) * (Le.box + 2), [ht, yt] = ee({ top: 0, left: 0, maxH: 288, ready: !1 }), [Yt, pt] = ee(0);
  io({
    anchorRef: De,
    panelRef: Ce,
    open: v,
    maxHeight: A,
    anchorRectRef: ze,
    onPosition: (x) => yt({ top: x.top, left: x.left, maxH: x.maxH, ready: x.ready })
  }), te(() => {
    !v || !De.current || pt(De.current.getBoundingClientRect().width);
  }, [v, j]);
  const Ot = ar({
    visible: v,
    morph: H,
    anchor: () => {
      var x;
      return ((x = De.current) == null ? void 0 : x.getBoundingClientRect()) ?? null;
    },
    ref: Ce,
    cloneOnUnmount: !0
  }), mt = (W || []).map(
    (x) => typeof x.label == "function" ? x.label(G) : x.label
  ), ve = lt(
    () => Cd({
      items: n,
      groups: e,
      query: G,
      browseGroups: d || m,
      browseAll: y,
      expandedGroups: ae,
      emptyActionLabels: mt
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [n, e, G, d, m, y, ae, mt.join("\0")]
  ), _ = lt(
    () => (F || []).map((x, T) => ({
      kind: "action",
      label: typeof x.label == "function" ? x.label(G) : x.label,
      actionIndex: T,
      source: "leading"
    })),
    [F, G]
  ), X = lt(
    () => (K || []).map((x, T) => ({
      kind: "action",
      label: typeof x.label == "function" ? x.label(G) : x.label,
      actionIndex: T,
      source: "footer"
    })),
    [K, G]
  ), me = ve.some((x) => x.kind === "empty"), _e = _.length > 0 && !(V && me), we = _e ? _.length : 0, ot = lt(
    () => [..._e ? _ : [], ...ve, ...X],
    [_e, _, ve, X]
  ), St = !!c || h && !G.trim(), Nt = lt(
    () => ot.map((x, T) => ({ row: x, index: T })).filter((x) => !(x.row.kind === "empty" || x.row.kind === "item" && x.row.hidden || x.row.kind === "group" && !St)),
    [ot, St]
  ), fn = (h || m) && !G.trim(), Qe = oe(() => {
    var x;
    q(!1), t === "expandable" && ((x = he.current) == null || x.blur(), $(!1), requestAnimationFrame(() => {
      var T;
      return (T = Se.current) == null ? void 0 : T.focus();
    })), re(""), ue(0), je(m ? xe : /* @__PURE__ */ new Set()), u == null || u();
  }, [t, u, re, m, xe]);
  te(() => {
    if (G.trim() || !m) {
      je((x) => x.size ? /* @__PURE__ */ new Set() : x);
      return;
    }
    je((x) => x.size === xe.size && [...xe].every((T) => x.has(T)) ? x : xe);
  }, [G, m, xe]);
  const gt = oe((x) => {
    je((T) => {
      const ie = new Set(T);
      return ie.has(x) ? ie.delete(x) : (g === "single" && ie.clear(), ie.add(x)), ie;
    });
  }, [g]), st = oe(() => {
    if (t === "expandable" && !j) {
      const T = De.current;
      if (T) {
        const ie = T.style.transition, se = T.style.width;
        T.style.transition = "none", T.style.width = `${k}px`;
        const be = T.getBoundingClientRect();
        ze.current = { left: be.left, top: be.top, width: be.width, height: be.height }, T.style.width = se, T.offsetWidth, T.style.transition = ie, window.clearTimeout(Oe.current), Oe.current = window.setTimeout(() => {
          ze.current = null;
        }, jt + 80);
      }
    }
    $(!0), q(!0);
    const x = b ? ve.findIndex((T) => T.kind === "item" && T.hit.item.id === b) : -1;
    ue(x >= 0 ? we + x : we);
  }, [t, j, k, we, ve, b]);
  te(() => () => {
    window.clearTimeout(Oe.current), ze.current = null;
  }, []), te(() => {
    if (t !== "expandable" || !j || !v || !z) return;
    const x = requestAnimationFrame(() => {
      var T;
      return (T = he.current) == null ? void 0 : T.focus();
    });
    return () => cancelAnimationFrame(x);
  }, [t, j, v, z]), te(() => {
    var ie;
    if (!v) return;
    const x = ((ie = De.current) == null ? void 0 : ie.ownerDocument) ?? Ne;
    if (!x) return;
    const T = (se) => {
      var Re, Ge;
      const be = se.target;
      be && ((Re = De.current) != null && Re.contains(be) || (Ge = Ce.current) != null && Ge.contains(be) || Qe());
    };
    return x.addEventListener("pointerdown", T, !0), () => x.removeEventListener("pointerdown", T, !0);
  }, [v, Qe, Ne]);
  const Lt = oe((x) => {
    if (x.kind === "group") {
      c ? (c(x.group), f && Qe()) : St && gt(x.group.key);
      return;
    }
    if (x.kind === "item") {
      a(x.hit.item), f && Qe();
      return;
    }
    if (x.kind === "action") {
      const T = x.source === "leading" ? F : x.source === "footer" ? K : W, ie = T == null ? void 0 : T[x.actionIndex];
      ie && ie.onClick(G), f && Qe();
    }
  }, [Qe, f, W, K, St, F, a, c, G, gt]), In = (x) => {
    if (Nt.length === 0) return;
    const T = Nt.findIndex((se) => se.index === D), ie = T < 0 ? 0 : (T + x + Nt.length) % Nt.length;
    ue(Nt[ie].index);
  }, zn = (x) => {
    if (x.key === "ArrowDown")
      x.preventDefault(), v ? In(1) : st();
    else if (x.key === "ArrowUp")
      x.preventDefault(), In(-1);
    else if ((x.key === "ArrowRight" || x.key === "ArrowLeft") && h && v && !G.trim()) {
      const T = ot[D];
      if ((T == null ? void 0 : T.kind) === "group") {
        const ie = ae.has(T.group.key);
        (x.key === "ArrowRight" || ie) && (x.preventDefault(), gt(T.group.key));
      } else if ((T == null ? void 0 : T.kind) === "item" && x.key === "ArrowLeft" && T.hit.item.group) {
        x.preventDefault();
        const ie = T.hit.item.group;
        ae.has(ie) && gt(ie);
        const se = ot.findIndex((be) => be.kind === "group" && be.group.key === ie);
        se >= 0 && ue(se);
      }
    } else if (x.key === "Enter") {
      x.preventDefault();
      const T = ot[D] ?? ot[0];
      T && Lt(T);
    } else x.key === "Escape" && (x.preventDefault(), Qe());
  }, hn = (x) => {
    t === "expandable" && !j || (re(x), v || q(!0));
  };
  te(() => {
    const x = ve.findIndex((T) => T.kind === "item");
    ue(x >= 0 ? we + x : we);
  }, [G]);
  const $n = (x) => /* @__PURE__ */ R("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
    N == null ? void 0 : N.map((T) => /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        "aria-label": T.label,
        title: T.label,
        tabIndex: j ? 0 : -1,
        onMouseDown: (ie) => ie.preventDefault(),
        onClick: () => {
          T.onClick(G, { close: Qe }), T.keepOpen || Qe();
        },
        style: { width: Le.box, height: Le.box },
        className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
        "data-search-field-action": T.key,
        children: /* @__PURE__ */ p(
          "span",
          {
            style: { width: Le.icon, height: Le.icon },
            className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
            children: T.icon
          }
        )
      },
      T.key
    )),
    G && /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        "aria-label": "Clear search",
        tabIndex: j ? 0 : -1,
        onPointerDown: (T) => T.preventDefault(),
        onClick: x,
        style: { width: Le.box, height: Le.box },
        className: "ui-icon-btn flex items-center justify-center rounded",
        children: /* @__PURE__ */ p(_t, { size: Le.icon })
      }
    )
  ] }), w = /* @__PURE__ */ R("div", { className: "relative w-full", children: [
    /* @__PURE__ */ p(Pt, { size: Le.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ p(
      "input",
      {
        ref: he,
        value: G,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": v,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (x) => hn(x.target.value),
        onFocus: () => {
          d && st();
        },
        onClick: () => {
          d && st();
        },
        onKeyDown: zn,
        placeholder: o,
        style: { paddingRight: et },
        className: `${$r("sm")} w-full pl-8`
      }
    ),
    $n(() => {
      re(""), v || st();
    })
  ] }), U = /* @__PURE__ */ R("div", { className: "absolute inset-0", children: [
    /* @__PURE__ */ p(Pt, { size: Le.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ p(
      "input",
      {
        ref: he,
        value: G,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": v,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (x) => hn(x.target.value),
        onFocus: () => {
          d && j && st();
        },
        onClick: () => {
          d && j && st();
        },
        onKeyDown: zn,
        placeholder: o,
        tabIndex: j ? 0 : -1,
        style: { paddingRight: et },
        className: `${$r("sm")} h-full w-full pl-8`
      }
    ),
    $n(() => {
      re(""), !v && j && st();
    })
  ] }), Q = oe((x, T) => {
    const ie = Ce.current, se = ie == null ? void 0 : ie.querySelector("[data-search-scroller]"), be = ie == null ? void 0 : ie.querySelector(`[data-search-row="${x}"]`);
    if (!se || !be) return;
    const Re = be.getBoundingClientRect(), Ge = se.getBoundingClientRect();
    if (T === "center") {
      se.scrollTop += Re.top + Re.height / 2 - (Ge.top + Ge.height / 2);
      return;
    }
    Re.top < Ge.top ? se.scrollTop -= Ge.top - Re.top : Re.bottom > Ge.bottom && (se.scrollTop += Re.bottom - Ge.bottom);
  }, []);
  te(() => {
    !v || qe.current || Q(D, "nearest");
  }, [v, D, Q]);
  const de = S(ve);
  de.current = ve;
  const fe = S(b);
  fe.current = b;
  const ge = S(!1);
  te(() => {
    if (!v) {
      ge.current = !1;
      return;
    }
    ge.current || (ge.current = !0, fe.current && requestAnimationFrame(() => {
      if (!v) return;
      const x = de.current.findIndex((T) => T.kind === "item" && T.hit.item.id === fe.current);
      x >= 0 && Q(x, "center");
    }));
  }, [v, Q]);
  const ke = (x, T) => {
    const ie = D === T, se = b !== void 0 && x.hit.item.id === b;
    return /* @__PURE__ */ R(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": se,
        tabIndex: -1,
        "data-search-item": x.hit.item.id,
        "data-search-row": T,
        onMouseEnter: () => ue(T, "pointer"),
        onClick: () => Lt(x),
        style: kt,
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${Xe.itemDefault} ${se ? "ui-item-selected" : ""} ${ie ? "ui-item-highlighted" : ""} ${x.hit.item.disabled ? "opacity-30 pointer-events-none" : ""}`,
        children: [
          x.hit.item.icon && /* @__PURE__ */ p("span", { className: `${Xe.icon} shrink-0`, children: x.hit.item.icon }),
          /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: x.hit.item.label }),
          (x.hit.detail || x.hit.item.detail) && /* @__PURE__ */ p("span", { className: "shrink-0 max-w-[55%] truncate text-[10px] text-zinc-400", children: x.hit.detail || x.hit.item.detail }),
          se && /* @__PURE__ */ p(or, { className: "ui-icon w-3.5 h-3.5 shrink-0", "aria-hidden": !0 })
        ]
      },
      `item:${x.hit.item.id}`
    );
  }, Me = (x, T) => {
    const ie = ae.has(x.group.key), se = h && !G.trim(), be = St, Re = be && D === T, Ge = x.group.count !== void 0 && /* @__PURE__ */ p("span", { className: `shrink-0 tabular-nums ${be ? "text-[10px] text-zinc-400" : "opacity-70"}`, children: x.group.count });
    return be ? /* @__PURE__ */ R(
      "div",
      {
        role: "option",
        "aria-selected": !1,
        "aria-expanded": se ? ie : void 0,
        "data-search-group": x.group.key,
        onMouseEnter: () => ue(T, "pointer"),
        style: kt,
        className: `w-full rounded flex items-center gap-1 outline-none select-none font-medium ${Xe.itemDefault} ${Re ? "ui-item-highlighted" : ""}`,
        children: [
          /* @__PURE__ */ R(
            "button",
            {
              type: "button",
              tabIndex: -1,
              onMouseDown: (Et) => Et.preventDefault(),
              onClick: () => Lt(x),
              className: "flex min-w-0 flex-1 items-center gap-2 text-left",
              children: [
                x.group.icon && /* @__PURE__ */ p("span", { className: `${Xe.icon} shrink-0`, children: x.group.icon }),
                /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: x.group.label }),
                Ge
              ]
            }
          ),
          se && /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `${ie ? "Collapse" : "Expand"} ${x.group.label}`,
              "aria-expanded": ie,
              onMouseDown: (Et) => Et.preventDefault(),
              onClick: (Et) => {
                Et.stopPropagation(), gt(x.group.key);
              },
              style: { width: Le.box, height: Le.box },
              className: "shrink-0 flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              children: /* @__PURE__ */ p(
                Cn,
                {
                  size: Le.icon,
                  className: `transition-transform duration-200 ${ie ? "rotate-180" : ""}`
                }
              )
            }
          )
        ]
      },
      `group:${x.group.key}`
    ) : /* @__PURE__ */ R(
      "div",
      {
        role: "presentation",
        "data-search-group": x.group.key,
        "data-search-row": T,
        style: dn,
        className: "w-full flex items-center gap-2 select-none font-semibold uppercase tracking-wider ui-label",
        children: [
          x.group.icon && /* @__PURE__ */ p("span", { className: `${Xe.icon} shrink-0`, children: x.group.icon }),
          /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: x.group.label }),
          Ge
        ]
      },
      `group:${x.group.key}`
    );
  }, Pe = (x, T) => {
    var be;
    const ie = D === T, se = x.source === "leading" ? F : x.source === "footer" ? K : W;
    return /* @__PURE__ */ R(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": !1,
        tabIndex: -1,
        "data-search-action": x.source || "empty",
        "data-search-row": T,
        onMouseEnter: () => ue(T, "pointer"),
        onClick: () => Lt(x),
        style: kt,
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${Xe.itemDefault} ${ie ? "ui-item-highlighted" : ""}`,
        children: [
          /* @__PURE__ */ p("span", { className: `${Xe.icon} shrink-0`, children: ((be = se == null ? void 0 : se[x.actionIndex]) == null ? void 0 : be.icon) || /* @__PURE__ */ p(jr, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: x.label })
        ]
      },
      `${x.source || "empty"}:${x.actionIndex}`
    );
  }, Tt = () => /* @__PURE__ */ p("div", { className: "px-3 py-3 text-center", "data-search-empty": !0, children: I ? I({ query: G, close: Qe }) : /* @__PURE__ */ R(Ve, { children: [
    /* @__PURE__ */ p("div", { className: "mx-auto mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-400", children: /* @__PURE__ */ p(Pt, { className: "w-3.5 h-3.5" }) }),
    /* @__PURE__ */ p("div", { className: "text-xs font-medium text-zinc-500", children: C || `No matches for “${G.trim()}”` }),
    /* @__PURE__ */ p("div", { className: "mt-0.5 text-[10px] text-zinc-400", children: J || "Try a name, phone number, board ID or category." })
  ] }) }, "__empty"), Ke = [];
  for (let x = 0; x < ve.length; x++) {
    const T = ve[x];
    if (T.kind === "group") {
      const ie = [];
      let se = x + 1;
      for (; se < ve.length && ve[se].kind === "item" && ve[se].hit.item.group === T.group.key; )
        ie.push({ row: ve[se], index: se }), se++;
      Ke.push({ group: T, index: x, items: ie }), x = se - 1;
    } else T.kind === "item" ? Ke.push({ row: T, index: x }) : Ke.push({ row: T, index: x });
  }
  const pn = v ? sr(
    /* @__PURE__ */ R(
      "div",
      {
        ref: Ot,
        id: "search-menu-panel",
        "data-theme": B,
        role: "listbox",
        "aria-label": o,
        className: "ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none min-w-0 overflow-hidden",
        style: {
          position: "fixed",
          left: ht.left,
          top: ht.top,
          width: E ?? (t === "expandable" ? k : Yt || void 0),
          maxHeight: ht.maxH,
          visibility: ht.ready ? "visible" : "hidden"
        },
        children: [
          _e && /* @__PURE__ */ R("div", { className: "shrink-0 pb-1", children: [
            _.map((x, T) => Pe(x, T)),
            ve.length > 0 && /* @__PURE__ */ p("div", { className: Xe.separator })
          ] }),
          /* @__PURE__ */ R("div", { "data-search-scroller": !0, className: "overflow-y-auto scrollbar-custom flex flex-col min-h-0", children: [
            ve.length === 0 && /* @__PURE__ */ p("div", { className: "px-3 py-3 text-xs text-zinc-400", "data-search-empty": !0, children: I ? I({ query: G, close: Qe }) : /* @__PURE__ */ p(Ve, { children: "Type to search…" }) }),
            Ke.map((x) => {
              if (x.group) {
                const se = ae.has(x.group.group.key), be = x.items || [];
                return /* @__PURE__ */ R(Be.Fragment, { children: [
                  Me(x.group, we + x.index),
                  fn && /* @__PURE__ */ p(
                    "div",
                    {
                      "data-search-group-items": x.group.group.key,
                      "aria-hidden": !se,
                      className: "motion-reduce:transition-none",
                      style: {
                        display: "grid",
                        gridTemplateRows: se ? "1fr" : "0fr",
                        opacity: se ? 1 : 0,
                        transition: "grid-template-rows 220ms cubic-bezier(0.32, 0.72, 0, 1), opacity 150ms ease"
                      },
                      children: /* @__PURE__ */ p("div", { className: "overflow-hidden flex flex-col", children: be.map((Re) => ke(Re.row, we + Re.index)) })
                    }
                  ),
                  !fn && be.map((Re) => ke(Re.row, we + Re.index))
                ] }, `group:${x.group.group.key}`);
              }
              const T = x.row, ie = we + x.index;
              return T.kind === "empty" ? Tt() : T.kind === "action" ? Pe(T, ie) : T.kind === "item" ? ke(T, ie) : null;
            })
          ] }),
          X.length > 0 && /* @__PURE__ */ R("div", { className: "shrink-0", children: [
            /* @__PURE__ */ p("div", { className: Xe.separator }),
            X.map((x, T) => Pe(x, we + ve.length + T))
          ] })
        ]
      }
    ),
    $t ?? (Ne == null ? void 0 : Ne.body) ?? document.body
  ) : null;
  return t === "inline" ? /* @__PURE__ */ R("div", { ref: De, "data-search-menu": !0, "data-mode": t, className: "relative inline-flex", style: { width: "100%" }, children: [
    w,
    pn
  ] }) : /* @__PURE__ */ p(
    Is,
    {
      expanded: j,
      collapsedWidth: M,
      expandedWidth: k,
      rootRef: De,
      "data-search-menu": !0,
      "data-mode": t,
      trigger: /* @__PURE__ */ p(
        at,
        {
          ref: Se,
          type: "button",
          variant: "primary",
          size: "minimal",
          theme: B === "dark" ? "dark" : "light",
          icon: i ?? /* @__PURE__ */ p(Pt, { className: "w-3.5 h-3.5" }),
          onClick: st,
          className: `w-full justify-start ${j ? "pointer-events-none" : ""}`,
          tabIndex: j ? -1 : 0,
          "data-search-trigger": !0,
          children: /* @__PURE__ */ p("span", { children: r })
        }
      ),
      field: /* @__PURE__ */ R(Ve, { children: [
        U,
        pn
      ] })
    }
  );
}
export {
  at as Button,
  If as CardSection,
  go as CheckMark,
  Il as Checkbox,
  hf as Checklist,
  Nf as ChromeHeader,
  Sf as ContentRow,
  Zd as ContextMenu,
  tf as ContextMenuDivider,
  ef as ContextMenuItem,
  nf as ContextMenuSub,
  ro as DROPDOWN_MAX_HEIGHT,
  ff as DatePicker,
  sf as DialogProvider,
  Nl as DropdownItem,
  dr as DropdownMenu,
  Tl as DropdownSubmenu,
  Gr as DropdownThemeContext,
  md as FONTS,
  mf as FloatingChrome,
  df as FloatingToggle,
  yd as FontMenu,
  Rf as FormatToolbar,
  $e as IS_COARSE,
  dl as IS_TOUCH_CAPABLE,
  Qd as ItemManagerDropdown,
  af as LongPressMenuProvider,
  Jr as MORPH_EASE,
  jt as MORPH_MS,
  Kr as MORPH_OPACITY_MS,
  An as MenuHighlightContext,
  fo as MenuSearchContext,
  Cl as Modal,
  rf as ModalFooter,
  Ln as ModalFooterButton,
  zf as MorphActionField,
  Sd as MorphSearchField,
  Af as NumberInput,
  ul as PopoutWindowContext,
  Mf as RICH_TEXT_STATE_IDLE,
  pf as RadioList,
  pd as RichTextEditor,
  vd as SCRUB_PX_PER_STEP,
  $f as SearchMenu,
  kf as SectionHeader,
  wf as Seg,
  Tf as StructureControls,
  Qr as SubmenuContext,
  uf as TAB_PILL,
  Ql as TB_BTN,
  Pn as TB_BTN_ICON,
  Zl as TB_DANGER,
  bo as TB_DIVIDER,
  ea as TB_INPUT,
  vf as TB_NUM,
  na as TB_PICKER,
  gf as TB_ROW_LABEL,
  ta as TB_SEG,
  yf as TB_TOGGLE,
  bf as TB_TOGGLE_OFF,
  xf as TB_TOGGLE_ON,
  _l as TabFace,
  Gd as ThemeProvider,
  Xd as ThemeScope,
  sd as Token,
  od as TokenChipView,
  Bn as ToolButton,
  Xt as Tooltip,
  Vr as ZOOM_FROM,
  Cd as buildSearchMenuRows,
  bl as buttonCloudOf,
  fi as clampNumber,
  ml as cloneOverlayClose,
  L as coarsePx,
  Cf as escapeHtml,
  Xi as getCoarseScale,
  cr as getDropdownClasses,
  Yd as getHardwareKeyboard,
  Vd as getLastPointerType,
  $r as inputCls,
  Pl as isInteractiveElement,
  Ar as isTouchLike,
  Td as matchSearchItem,
  lo as menuAttributesOf,
  yl as menuThemeOf,
  to as nearestOverlayOrigin,
  Rs as normalizeSpaces,
  yr as overlayMorphEnabled,
  Nd as parseSearchTags,
  pl as playOverlayClose,
  hl as playOverlayOpen,
  ji as preprocessTokenHtml,
  nd as sanitizeRichText,
  wd as scrubbedValue,
  Ed as searchMenuContent,
  xl as segModeOf,
  Jd as setCoarseScale,
  bd as steppedValue,
  Ef as stripRichText,
  rd as stripTokenWrappers,
  Kd as useCoarse,
  Ie as useCoarseScale,
  It as useCoarseSize,
  qr as useCurrentDocument,
  Mn as useCurrentWindow,
  of as useDialog,
  io as useDropdownPosition,
  ao as useDropdownTheme,
  Ud as useHardwareKeyboard,
  yo as useInputSize,
  Xr as useItemSize,
  wt as useKitTheme,
  fl as useLastPointerType,
  lf as useLongPressOptOut,
  Zr as useMenuHighlight,
  kl as useMenuSearch,
  ar as useOverlayMorph,
  Wr as usePopoutWindow,
  cn as usePortalTarget,
  Xl as useSlidingPill,
  cf as useTouchMode
};
