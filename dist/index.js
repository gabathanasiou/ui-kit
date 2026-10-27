"use client";
import { jsx as h, jsxs as C, Fragment as Qe } from "react/jsx-runtime";
import et, { createContext as Qt, useContext as Zt, useState as ie, useEffect as le, useRef as k, useCallback as Q, useLayoutEffect as mt, useMemo as Ve, useId as Tl, useImperativeHandle as Ao } from "react";
import * as ze from "@radix-ui/react-dropdown-menu";
import { Minus as Cl, Check as er, Search as on, X as yn, Pencil as El, Copy as Io, Trash2 as ii, RotateCcw as $o, Plus as $r, ChevronRight as wr, ChevronLeft as Ml, ArrowUp as Rl, ArrowDown as Al, ChevronDown as xn, Underline as Il, Strikethrough as $l, RemoveFormatting as zl, Link as Dl, ChevronUp as Ol, Anchor as Pl } from "lucide-react";
import { computePosition as Ll, offset as zo, flip as Do, shift as Oo, size as Bl, useFloating as Fl, autoUpdate as Hl } from "@floating-ui/react-dom";
import * as nn from "@radix-ui/react-dialog";
import { createPortal as zr } from "react-dom";
import { mergeAttributes as _l, ReactNodeViewRenderer as jl, NodeViewWrapper as Wl, useEditor as ql, EditorContent as Kl } from "@tiptap/react";
import { PluginKey as jt, Plugin as en, Selection as An, TextSelection as $t, NodeSelection as Dn, AllSelection as Jl } from "@tiptap/pm/state";
import { DecorationSet as sr, Decoration as Vl } from "@tiptap/pm/view";
import Yl from "@tiptap/starter-kit";
import Ul from "@tiptap/extension-placeholder";
import { TextStyle as Gl, FontFamily as Xl, FontSize as Ql } from "@tiptap/extension-text-style";
import Zl from "@tiptap/extension-color";
import ec from "@tiptap/extension-link";
import tc from "@tiptap/extension-underline";
import nc from "@tiptap/suggestion";
import { Mention as rc } from "@tiptap/extension-mention";
import { createRoot as ic } from "react-dom/client";
const oc = Qt(null);
function gi() {
  return Zt(oc);
}
function Bn() {
  const n = gi();
  return n ? n.document.body : null;
}
function yi() {
  const n = gi();
  return n ? n.document : typeof document < "u" ? document : null;
}
function tr() {
  return gi() ?? (typeof window < "u" ? window : null);
}
const nr = typeof window < "u", Ze = nr && window.matchMedia("(pointer: coarse)").matches, sc = nr && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
let Dr = 0.5;
const Vn = /* @__PURE__ */ new Set();
function th(n) {
  Dr = Math.max(0, Math.min(1, n)), Vn.forEach((e) => e());
}
function Po() {
  return Dr;
}
function nh() {
  const [, n] = ie(0);
  return le(() => {
    const e = () => n((t) => t + 1);
    return Vn.add(e), () => {
      Vn.delete(e);
    };
  }, []), Ze && Dr > 0;
}
function Be() {
  const [, n] = ie(0);
  return le(() => {
    const e = () => n((t) => t + 1);
    return Vn.add(e), () => {
      Vn.delete(e);
    };
  }, []), Dr;
}
function B(n, e, t) {
  return Ze ? Math.round(n + (e - n) * t) : n;
}
function cn(n, e) {
  const t = Be();
  return Ze && t > 0 ? {
    padding: `${B(n.py, e.py, t)}px ${B(n.px, e.px, t)}px`,
    fontSize: `${B(n.fs, e.fs, t)}px`
  } : { padding: `${n.py}px ${n.px}px`, fontSize: `${n.fs}px` };
}
function Lo() {
  const n = Be(), e = Ze && n > 0;
  return {
    box: e ? B(28, 36, n) : 20,
    icon: e ? B(16, 20, n) : 14
  };
}
function oi(n) {
  return n === "touch" || n === "pen";
}
let Rn = null;
const si = /* @__PURE__ */ new Set();
nr && window.addEventListener("pointerdown", (n) => {
  Rn = n.pointerType, si.forEach((e) => e());
}, !0);
function rh() {
  return Rn;
}
function lc() {
  const [, n] = ie(0), e = k(Rn);
  return le(() => {
    const t = () => {
      e.current !== Rn && (e.current = Rn, n((r) => r + 1));
    };
    return si.add(t), () => {
      si.delete(t);
    };
  }, []), Rn;
}
const Bo = ["(any-hover: hover)", "(any-pointer: fine)"];
function Fo() {
  return nr ? Bo.some((n) => window.matchMedia(n).matches) : !1;
}
let kr = Fo();
const li = /* @__PURE__ */ new Set();
function Yi(n) {
  kr !== n && (kr = n, li.forEach((e) => e()));
}
var Ro;
if (nr) {
  const n = () => Yi(Fo());
  for (const s of Bo) {
    const l = window.matchMedia(s);
    (Ro = l.addEventListener) == null || Ro.call(l, "change", n);
  }
  window.addEventListener("focus", n), document.addEventListener("visibilitychange", n);
  const e = window.setInterval(() => {
    document.visibilityState === "visible" && n();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(e)), window.addEventListener("keydown", (s) => {
    s.isComposing || s.keyCode !== 229 && (s.key === "Enter" || s.key === "Backspace" || s.key === "Process" || s.key === "Unidentified" || Yi(!0));
  });
  let t = null, r = null;
  const i = "__penClick", o = /* @__PURE__ */ new Set(["color", "file", "date", "datetime-local", "month", "time", "week"]);
  window.addEventListener("pointerdown", (s) => {
    s.pointerType !== "pen" || s.button !== 0 || (t = { x: s.clientX, y: s.clientY });
  }, !0), window.addEventListener("pointerup", (s) => {
    if (s.pointerType !== "pen") return;
    const l = t;
    if (t = null, !l || Math.hypot(s.clientX - l.x, s.clientY - l.y) > 8) return;
    const c = s.target;
    if (!c || !c.isConnected) return;
    if (c instanceof HTMLInputElement && o.has(c.type)) {
      try {
        c.showPicker();
      } catch {
      }
      return;
    }
    const a = new MouseEvent("click", { bubbles: !0, cancelable: !0, view: window });
    a[i] = !0, r = { x: s.clientX, y: s.clientY, time: Date.now() }, c.dispatchEvent(a);
  }, !0), window.addEventListener("click", (s) => {
    s[i] || r && Date.now() - r.time < 1e3 && Math.hypot(s.clientX - r.x, s.clientY - r.y) < 12 && (s.preventDefault(), s.stopPropagation());
  }, !0);
}
function ih() {
  return kr;
}
function oh() {
  const [, n] = ie(0);
  return le(() => {
    const e = () => n((t) => t + 1);
    return li.add(e), () => {
      li.delete(e);
    };
  }, []), kr;
}
const bn = 220, xi = "cubic-bezier(0.32, 0.72, 0, 1)", bi = 170, vi = 0.94;
function Jr(n) {
  return n === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Ho(n, e) {
  const t = e.left + e.width / 2, r = e.top + e.height / 2;
  return {
    x: t < n.left ? 0 : t > n.left + n.width ? 1 : 0.5,
    y: r < n.top ? 0 : r > n.top + n.height ? 1 : 0.5
  };
}
function _o(n, e) {
  const t = (e == null ? void 0 : e()) ?? null;
  if (!t) return { x: 0.5, y: 0.5 };
  const r = n.getBoundingClientRect();
  return Ho({ left: r.left, top: r.top, width: r.width, height: r.height }, t);
}
function cc(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity };
  e.style.transition = "none", e.style.transformOrigin = "50% 50%", e.style.transform = `scale(${vi})`, e.style.opacity = "0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    n.current === i && requestAnimationFrame(() => {
      if (n.current !== i) return;
      const s = _o(e, t);
      e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transition = `transform ${bn}ms ${xi}, opacity ${bi}ms ease`, e.style.transform = "none", e.style.opacity = "", window.setTimeout(() => {
        n.current === i && (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, r == null || r());
      }, bn + 60);
    });
  });
}
function ac(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity, pointerEvents: e.style.pointerEvents, visibility: e.style.visibility }, s = _o(e, t);
  e.style.transition = `transform ${bn}ms ${xi}, opacity ${bi}ms ease`, e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transform = `scale(${vi})`, e.style.opacity = "0", e.style.pointerEvents = "none", window.setTimeout(() => {
    n.current === i && (e.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      n.current !== i || e.isConnected || (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, e.style.pointerEvents = o.pointerEvents, e.style.visibility = o.visibility);
    }));
  }, bn + 60);
}
function uc(n, e, t) {
  const r = n.cloneNode(!0), i = n.getBoundingClientRect(), o = i.width > 0 || i.height > 0 ? i : t ?? i;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${o.left}px`, r.style.top = `${o.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const s = (e == null ? void 0 : e()) ?? null, l = s ? Ho({ left: o.left, top: o.top, width: o.width, height: o.height }, s) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${l.x * 100}% ${l.y * 100}%`, n.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${bn}ms ${xi}, opacity ${bi}ms ease`, r.style.transform = `scale(${vi})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, bn + 60));
    });
  });
}
function Or(n) {
  const e = k(null), [t, r] = ie(!1), i = k(null), o = k(0), s = Q((m) => {
    if (n.ref && (n.ref.current = m), m) {
      o.current = 0, e.current = m;
      const y = m.getBoundingClientRect();
      (y.width > 0 || y.height > 0) && (i.current = { left: y.left, top: y.top, width: y.width, height: y.height }), r(!0);
      return;
    }
    const g = e.current, b = ++o.current;
    queueMicrotask(() => {
      b === o.current && e.current === g && (e.current = null, r(!1), !(!g || !n.cloneOnUnmount || !c.current) && g.style.visibility !== "hidden" && Jr(f.current) && uc(g, u.current, i.current));
    });
  }, []), l = Q(() => {
    const m = e.current;
    if (!m || getComputedStyle(m).transform !== "none") return;
    const g = m.getBoundingClientRect();
    (g.width > 0 || g.height > 0) && (i.current = { left: g.left, top: g.top, width: g.width, height: g.height });
  }, []), c = k(n.visible);
  c.current = n.visible;
  const a = k(n.visible), u = k(n.anchor ?? null);
  u.current = n.anchor ?? null;
  const d = k(n.onClosed);
  d.current = n.onClosed;
  const f = k(n.morph !== !1);
  f.current = n.morph !== !1;
  const p = k(0);
  return mt(() => {
    if (!t || !c.current || !Jr(f.current)) return;
    const m = e.current;
    m && cc(p, m, u.current);
  }, [t, n.visible]), le(() => {
    if (!t || !c.current) return;
    let m = 0;
    const g = () => {
      m = 0, l(), m = requestAnimationFrame(g);
    };
    return m = requestAnimationFrame(g), () => {
      m && cancelAnimationFrame(m);
    };
  }, [t, l]), mt(() => {
    var b;
    const m = a.current;
    if (a.current = n.visible, n.visible || !m) return;
    const g = e.current;
    if (!g || !Jr(f.current)) {
      (b = d.current) == null || b.call(d);
      return;
    }
    ac(p, g, u.current, () => {
      var y;
      return (y = d.current) == null ? void 0 : y.call(d);
    });
  }, [n.visible]), le(() => {
    if (!t || !c.current) return;
    const m = (g) => {
      const b = e.current;
      b && b.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", m, { capture: !0 }), () => document.removeEventListener("wheel", m, { capture: !0 });
  }, [t]), le(() => {
    if (!t || !c.current) return;
    const m = (g) => {
      const b = e.current;
      b && b.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("touchmove", m, { capture: !0 }), () => document.removeEventListener("touchmove", m, { capture: !0 });
  }, [t]), s;
}
const jo = 384;
function dc(n) {
  const e = n.visualViewport;
  return e ? { x: e.offsetLeft, y: e.offsetTop, width: e.width, height: e.height } : { x: 0, y: 0, width: n.innerWidth, height: n.innerHeight };
}
function Wo({
  anchorRef: n,
  panelRef: e,
  open: t,
  contentRef: r,
  anchorRectRef: i,
  gap: o = 4,
  padding: s = 8,
  maxHeight: l,
  minHeight: c = 32,
  onPosition: a
}) {
  const u = tr(), d = k(u);
  d.current = u;
  const f = k(a);
  f.current = a, mt(() => {
    if (!t) return;
    let p = 0, m = !1;
    const g = () => {
      p || (p = requestAnimationFrame(b));
    }, b = () => {
      if (p = 0, m) return;
      const A = d.current, L = n.current, O = e.current;
      if (!A || !L || !O || !O.isConnected) return;
      const E = (r == null ? void 0 : r.current) ?? O, q = dc(A), M = l ?? jo, I = Math.min(c, M), P = Math.max(0, O.offsetHeight - E.offsetHeight), Y = Math.max(I, Math.ceil(E.scrollHeight + P)), U = Math.min(Y, M);
      O.style.maxHeight = `${U}px`;
      let T = U;
      const v = i == null ? void 0 : i.current;
      Ll(v ? {
        getBoundingClientRect: () => ({
          left: v.left,
          top: v.top,
          width: v.width,
          height: v.height,
          right: v.left + v.width,
          bottom: v.top + v.height,
          x: v.left,
          y: v.top,
          toJSON: () => {
          }
        })
      } : L, O, {
        strategy: "fixed",
        placement: "bottom-start",
        middleware: [
          zo(o),
          Do({ boundary: q, padding: s, fallbackStrategy: "bestFit" }),
          Oo({ boundary: q, padding: s, mainAxis: !1 }),
          Bl({
            boundary: q,
            padding: s,
            apply({ availableHeight: fe }) {
              T = Math.max(I, Math.floor(Math.min(M, fe))), O.style.maxHeight = `${T}px`;
            }
          })
        ]
      }).then(({ x: fe, y: he, placement: te }) => {
        m || f.current({
          top: Math.round(he),
          left: Math.round(fe),
          maxH: T,
          side: te.startsWith("top") ? "top" : "bottom",
          ready: !0
        });
      });
    };
    b();
    const y = d.current, $ = (y == null ? void 0 : y.document) ?? null, z = (y == null ? void 0 : y.visualViewport) ?? null, N = () => g();
    z == null || z.addEventListener("resize", N), z == null || z.addEventListener("scroll", N), y == null || y.addEventListener("resize", N), $ == null || $.addEventListener("scroll", N, { capture: !0, passive: !0 });
    let w = null;
    return typeof ResizeObserver < "u" && (w = new ResizeObserver(N), e.current && w.observe(e.current), r != null && r.current && w.observe(r.current)), () => {
      m = !0, p && cancelAnimationFrame(p), z == null || z.removeEventListener("resize", N), z == null || z.removeEventListener("scroll", N), y == null || y.removeEventListener("resize", N), $ == null || $.removeEventListener("scroll", N, { capture: !0 }), w == null || w.disconnect();
    };
  }, [t, n, e, r, i, o, s, l, c]);
}
let Tn = null;
function qo(n) {
  return Tn == null || Tn(), Tn = n, () => {
    Tn === n && (Tn = null);
  };
}
const Ko = Qt(null);
function wi(n, e) {
  const t = n.mode ?? (e == null ? void 0 : e.mode) ?? "dark", r = n.surface ?? (e == null ? void 0 : e.surface) ?? "neutral", i = n.context ?? (e == null ? void 0 : e.context) ?? "surface", o = n.accent ?? (e == null ? void 0 : e.accent) ?? "zinc", s = n.accent !== void 0 && n.surface === void 0 && n.context === void 0;
  return { mode: t, accent: i === "chrome" || r === "accent" || s ? o : "zinc", surface: r, context: i };
}
function ki({ theme: n, children: e }) {
  return /* @__PURE__ */ h(Ko.Provider, { value: n, children: e });
}
function sh({ mode: n, accent: e, surface: t, context: r, children: i }) {
  const o = Vt();
  return /* @__PURE__ */ h(ki, { theme: wi({ mode: n, accent: e, surface: t, context: r }, o), children: i });
}
function lh({ mode: n, accent: e, surface: t, context: r, children: i, className: o, style: s }) {
  const l = Vt(), c = wi({ mode: n, accent: e, surface: t, context: r }, l);
  return /* @__PURE__ */ h(ki, { theme: c, children: /* @__PURE__ */ h(
    "div",
    {
      "data-mode": c.mode,
      "data-accent": c.accent,
      "data-surface": c.surface,
      "data-context": c.context,
      className: o,
      style: s,
      children: i
    }
  ) });
}
function Vt() {
  return Zt(Ko);
}
function fc(n, e = "dark") {
  return n ? n.context === "surface" ? n.mode : n.mode === "light" ? "light" : n.accent === "emerald" ? "emerald" : n.accent === "blue" ? "blue" : "dark" : e;
}
function Jo(n, e) {
  if (n)
    return (n === "light" || n === "dark") && e ? {
      theme: n,
      attrs: { "data-theme": n, "data-mode": n, "data-accent": e.accent }
    } : { theme: n, attrs: { "data-theme": n } };
  if (!e) return { theme: "dark", attrs: { "data-theme": "dark" } };
  if (e.context === "chrome") {
    const t = fc(e);
    return { theme: t, attrs: { "data-theme": t } };
  }
  return { theme: e.mode, attrs: { "data-mode": e.mode, "data-accent": e.accent } };
}
function hc(n, e = "light") {
  return (n == null ? void 0 : n.mode) ?? e;
}
function pc(n) {
  return !n || n.context !== "chrome" && n.surface !== "accent" ? !1 : n.accent === "emerald" ? "emerald" : n.accent === "blue";
}
function mc(n) {
  let e = n.parentElement;
  for (; e; ) {
    if (e.scrollHeight > e.clientHeight) {
      const t = getComputedStyle(e).overflowY;
      if (t === "auto" || t === "scroll" || t === "overlay") return e;
    }
    e = e.parentElement;
  }
  return null;
}
function an(n, e = "nearest", t) {
  if (!n) return;
  const r = t ?? mc(n);
  if (!r || !r.contains(n)) return;
  const i = n.getBoundingClientRect(), o = r.getBoundingClientRect();
  if (e === "center") {
    r.scrollTop += i.top + i.height / 2 - (o.top + o.height / 2);
    return;
  }
  const s = getComputedStyle(n), l = parseFloat(s.scrollMarginBlockStart || s.scrollMarginTop || "0") || 0, c = parseFloat(s.scrollMarginBlockEnd || s.scrollMarginBottom || "0") || 0;
  i.top - l < o.top ? r.scrollTop -= o.top - (i.top - l) : i.bottom + c > o.bottom && (r.scrollTop += i.bottom + c - o.bottom);
}
function Vo({
  open: n,
  row: e,
  block: t = "nearest",
  scroller: r,
  ready: i
}) {
  const o = k(!1), s = k(!1), l = k(!1), c = k({ row: e, scroller: r, block: t });
  c.current = { row: e, scroller: r, block: t };
  const a = Q(() => {
    o.current = !0;
  }, []);
  return mt(() => {
    if (!n) {
      s.current = !1, l.current = !1, o.current = !1;
      return;
    }
    if (s.current) return;
    s.current = !0;
    const { row: u, scroller: d, block: f } = c.current, p = u();
    p && (an(p, f, (d == null ? void 0 : d()) ?? null), l.current = !0);
  }, [n]), le(() => {
    if (!n || i !== !0 || !l.current) return;
    const u = requestAnimationFrame(() => {
      if (!l.current || (l.current = !1, o.current)) return;
      const { row: d, scroller: f } = c.current;
      an(d(), "nearest", (f == null ? void 0 : f()) ?? null);
    });
    return () => cancelAnimationFrame(u);
  }, [n, i]), { engagedRef: o, engage: a };
}
const gc = [];
function Rt(n, e) {
  const t = /* @__PURE__ */ new Map();
  e.forEach((s, l) => t.set(s, l));
  const r = [], i = [], o = /* @__PURE__ */ new Set();
  for (const s of n)
    o.has(s) || (o.add(s), t.has(s) ? r.push(s) : i.push(s));
  return r.sort((s, l) => t.get(s) - t.get(l)), [...r, ...i];
}
function fn(n, e) {
  if (n.length !== e.length) return !1;
  const t = new Set(n);
  return e.every((r) => t.has(r));
}
function yc(n, e, t, r = {}) {
  var o;
  const i = Rt(n, t);
  return (o = r.disabledIds) != null && o.includes(e) ? i : i.includes(e) ? i.filter((s) => s !== e) : r.max !== void 0 && i.length >= r.max ? i : Rt([...i, e], t);
}
function Ui(n, e, t, r, i = {}) {
  const o = Rt(n, r), s = new Set(e);
  if (!t) return o.filter((d) => !s.has(d));
  const l = new Set(r), c = new Set(i.disabledIds ?? []), a = i.max === void 0 ? 1 / 0 : Math.max(0, i.max - o.length), u = Rt([...s], r).filter((d) => l.has(d) && !o.includes(d) && !c.has(d)).slice(0, a);
  return u.length === 0 ? o : Rt([...o, ...u], r);
}
function Gi(n, e) {
  if (e.length === 0) return "none";
  const t = new Set(n), r = e.reduce((i, o) => i + (t.has(o) ? 1 : 0), 0);
  return r === 0 ? "none" : r === e.length ? "all" : "some";
}
function xc(n, e, t) {
  if (!t) return 0;
  const r = new Set(e), i = new Set(t);
  return n.reduce((o, s) => o + (r.has(s) && !i.has(s) ? 1 : 0), 0);
}
function Yo(n) {
  const {
    mode: e = "draft",
    selectedIds: t,
    itemIds: r,
    visibleIds: i,
    max: o,
    disabledIds: s,
    indicator: l = "box",
    onChange: c,
    onCommit: a,
    onToggle: u,
    onDraftChange: d
  } = n, [f, p] = ie(() => Rt(t, r)), m = Ve(() => new Set(s ?? []), [s]), g = Ve(() => new Set(f), [f]), b = o !== void 0 && f.length >= o, y = !fn(f, t), $ = Q((q) => {
    if (m.has(q)) return;
    const M = g.has(q), I = yc(f, q, r, { max: o, disabledIds: s });
    fn(I, f) || (p(I), d == null || d(I), u == null || u(q, !M));
  }, [f, g, m, r, o, s, u, d]), z = Q((q) => {
    const M = q.filter((Y) => !m.has(Y)), I = Gi(f, M), P = Ui(f, M, I !== "all", r, { max: o, disabledIds: s });
    fn(P, f) || (p(P), d == null || d(P));
  }, [f, m, r, o, s, d]), N = Q((q, M = i ?? r) => {
    const I = Ui(f, M, q, r, { max: o, disabledIds: s });
    fn(I, f) || (p(I), d == null || d(I));
  }, [f, i, r, o, s, d]), w = Q(() => {
    f.length !== 0 && (p([]), d == null || d([]));
  }, [f, d]), A = Q((q) => {
    p(Rt(q ?? t, r));
  }, [t, r]), L = Q(() => !a || fn(f, t) ? !1 : (a(Rt(f, r)), !0), [a, f, t, r]), O = Q(() => !c || fn(f, t) ? !1 : (c(Rt(f, r)), !0), [c, f, t, r]), E = Q((q) => Gi(f, q), [f]);
  return {
    mode: e,
    indicator: l,
    draft: f,
    count: f.length,
    max: o,
    atMax: b,
    dirty: y,
    hiddenCount: xc(f, r, i),
    isSelected: (q) => g.has(q),
    isDisabled: (q) => m.has(q),
    canToggle: (q) => !m.has(q) && (g.has(q) || !b),
    toggle: $,
    toggleGroup: z,
    setAll: N,
    clear: w,
    reset: A,
    commit: L,
    flush: O,
    cancel: A,
    groupState: E
  };
}
const Uo = Qt(null), bc = () => Zt(Uo), Go = gc;
function Si({ checked: n, size: e, tone: t = "accent", indeterminate: r = !1 }) {
  return /* @__PURE__ */ h(
    "span",
    {
      className: `ui-check-indicator ${n || r ? "ui-check-indicator-checked" : ""} ${t === "danger" ? "ui-check-tone-danger" : ""}`,
      "aria-hidden": !0,
      children: r ? /* @__PURE__ */ C("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: [
        /* @__PURE__ */ h("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor", stroke: "var(--ui-check-ring)", strokeWidth: 1 }),
        /* @__PURE__ */ h("path", { d: "M4.5 8 H11.5", stroke: "var(--ui-check-check)", strokeWidth: 2, strokeLinecap: "round", fill: "none" })
      ] }) : n ? /* @__PURE__ */ C("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: [
        /* @__PURE__ */ h("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor", stroke: "var(--ui-check-ring)", strokeWidth: 1 }),
        /* @__PURE__ */ h("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "var(--ui-check-check)", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" })
      ] }) : /* @__PURE__ */ h("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: /* @__PURE__ */ h("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) })
    }
  );
}
function vc({ checked: n, onChange: e, disabled: t = !1, label: r, id: i, className: o = "", labelClassName: s = "", theme: l, variant: c = "pill", tone: a = "accent", block: u = !1 }) {
  const d = c !== "plain", f = Be(), p = B(16, 20, f), m = B(12, 14, f), g = B(12, 14, f), b = B(12, 16, f), y = B(10, 12, f), $ = B(8, 10, f);
  return /* @__PURE__ */ C(
    "label",
    {
      className: `ui-checkbox ${d ? "ui-checkbox-pill rounded-lg" : ""} ${a === "danger" ? "ui-checkbox-tone-danger" : ""} ${t ? "ui-disabled" : ""} ${o}`,
      style: { display: u ? "flex" : "inline-flex", alignItems: "center", gap: $, padding: d ? `${y}px ${b}px` : void 0 },
      onClick: (N) => N.stopPropagation(),
      ...l ? { "data-theme": l } : {},
      children: [
        /* @__PURE__ */ h(
          "input",
          {
            type: "checkbox",
            id: i,
            checked: n,
            disabled: t,
            onChange: (N) => e(N.target.checked),
            className: "sr-only"
          }
        ),
        d ? /* @__PURE__ */ h(Si, { checked: n, size: p, tone: a }) : /* @__PURE__ */ h("span", { className: "ui-checkbox-box", style: { width: p, height: p }, "aria-hidden": !0, children: n && /* @__PURE__ */ h("svg", { viewBox: "0 0 12 12", fill: "none", style: { width: m, height: m }, "aria-hidden": !0, children: /* @__PURE__ */ h("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ h("span", { className: `ui-checkbox-label ${s}`, style: { fontSize: g }, children: r })
      ]
    }
  );
}
const Xi = "transition-[grid-template-columns] ease-out duration-150 group-hover:duration-200 motion-reduce:transition-none", wc = "group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] group-data-[state=open]:grid-cols-[1fr]", kc = "group-hover:grid-cols-[0fr] group-focus-visible:grid-cols-[0fr] group-data-[state=open]:grid-cols-[0fr]", Sc = "group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[state=open]:opacity-100";
function Nc({ icon: n, collapse: e = !1, iconWithLabel: t = !0, active: r = !1, gap: i = 6, children: o }) {
  const s = !!e && !!n, l = s && !t, c = !!n && (t || s);
  return s ? /* @__PURE__ */ C(Qe, { children: [
    c && (l ? /* @__PURE__ */ h("span", { "data-kit-icon": !0, className: `grid min-w-0 ${Xi} ${r ? "grid-cols-[0fr]" : `grid-cols-[1fr] ${kc}`}`, children: /* @__PURE__ */ h("span", { className: "inline-flex min-w-0 items-center overflow-hidden", children: n }) }) : /* @__PURE__ */ h("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: n })),
    /* @__PURE__ */ h("span", { "data-kit-label": !0, className: `grid min-w-0 ${Xi} ${r ? "grid-cols-[1fr]" : `grid-cols-[0fr] ${wc}`}`, children: /* @__PURE__ */ h("span", { className: "min-w-0 overflow-hidden", children: /* @__PURE__ */ h(
      "span",
      {
        className: `flex min-w-0 items-center whitespace-nowrap transition-[opacity,padding-left] duration-100 group-hover:duration-150 motion-reduce:transition-none ${r ? "opacity-100" : `opacity-0 ${Sc}`} ${l ? `pl-[var(--kit-collapse-gap)] group-hover:pl-0! group-focus-visible:pl-0! group-data-[state=open]:pl-0! ${r ? "pl-0!" : ""}` : ""}`,
        style: l ? { "--kit-collapse-gap": `${i}px` } : { paddingLeft: i },
        children: o
      }
    ) }) })
  ] }) : /* @__PURE__ */ C(Qe, { children: [
    c && /* @__PURE__ */ h("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: n }),
    o
  ] });
}
const ch = {
  light: { plain: "bg-zinc-950", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" },
  dark: { plain: "bg-white", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" }
};
function Ct({
  variant: n = "subtle",
  theme: e,
  cloud: t,
  active: r = !1,
  iconOnly: i = !1,
  size: o = "default",
  icon: s,
  collapse: l = !1,
  iconWithLabel: c = !0,
  className: a = "",
  type: u = "button",
  children: d,
  ...f
}) {
  const p = Vt(), m = e ?? (p == null ? void 0 : p.mode) ?? "light", g = t ?? pc(p), b = cn({ px: 10, py: 7, fs: 12 }, { px: 14, py: 9, fs: 14 }), y = cn({ px: 12, py: 7, fs: 12 }, { px: 16, py: 9, fs: 14 }), $ = cn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), z = "", N = "", w = "inline-flex items-center rounded font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed", A = {
    light: {
      active: "text-white",
      inactive: "text-zinc-500 hover:text-zinc-900"
    },
    dark: {
      active: "text-zinc-900",
      inactive: "text-zinc-400 hover:text-zinc-200"
    }
  }, L = {
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
  }, O = {
    active: "text-zinc-900",
    inactive: "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800",
    open: "bg-zinc-800! text-white"
  }, E = {
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
  }, q = {
    light: {
      subtle: { base: `${z} text-zinc-600 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-900" },
      primary: { base: `${N} bg-zinc-900 hover:bg-zinc-800 text-white`, open: "bg-zinc-800!" },
      /* The outline is painted as an INSET SHADOW, not a border: the button
         keeps `subtle`'s exact box (same padding + height), so the two can sit
         side by side in a toolbar without a 2px step. */
      outline: {
        base: `${z} text-zinc-700 shadow-[inset_0_0_0_1px_var(--ui-border-strong)] hover:bg-[var(--ui-btn-hover-bg)] hover:text-zinc-900`,
        open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-900"
      },
      "danger-ghost": { base: `${z} text-rose-600 hover:bg-rose-50`, open: "bg-rose-50!" }
    },
    dark: {
      subtle: { base: `${z} text-zinc-400 hover:text-zinc-200 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-200" },
      primary: { base: `${N} bg-zinc-800 hover:bg-zinc-700 text-white`, open: "bg-zinc-700!" },
      outline: {
        base: `${z} text-zinc-300 shadow-[inset_0_0_0_1px_var(--ui-border-strong)] hover:bg-[var(--ui-btn-hover-bg)] hover:text-zinc-100`,
        open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-100"
      },
      "danger-ghost": { base: `${z} text-red-400 hover:bg-rose-950/40`, open: "bg-rose-950/40!" }
    }
  }, M = {
    blue: { base: `${N} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" },
    emerald: { base: `${N} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" }
  }, I = f["data-state"] === "open", P = q[m][n], Y = n === "primary" ? y : n.startsWith("tab") ? $ : b, U = Ze ? { padding: "8px 12px", fontSize: "14px", lineHeight: "20px", border: "1px solid transparent" } : { padding: "6px 8px", fontSize: "12px", lineHeight: "16px", border: "1px solid transparent" }, T = B(6, 8, Be()), v = B(28, 40, Be()), _ = g === "emerald" ? "emerald" : g ? "blue" : null, fe = "bg-[var(--ui-btn-active-bg)]! text-[color:var(--ui-btn-active-text)]!";
  let he;
  if (n === "tab") {
    const ce = A[m];
    he = r ? _ ? L[_].active : ce.active : _ ? L[_][m === "light" ? "inactiveLight" : "inactiveDark"] : ce.inactive;
  } else if (n === "tab-header")
    he = `${_ ? r ? E[_].active : E[_].inactive : r ? O.active : O.inactive} ${I ? _ ? E[_].open : O.open : ""}`;
  else if (he = `${P.base} ${I ? P.open : ""}`, r && (he = `${he} ${fe}`), n === "primary" && _) {
    const ce = M[_];
    he = I ? `${ce.base} ${ce.open}` : ce.base;
  }
  const te = !!l && !!s && !i, K = i ? { width: v, height: v, padding: 0, gap: 0 } : o === "minimal" ? { ...U, gap: te ? 0 : T } : { ...Y, gap: te ? 0 : T };
  return /* @__PURE__ */ h(
    "button",
    {
      type: u,
      "data-mode": m,
      "data-accent": p == null ? void 0 : p.accent,
      className: `${w} ${i ? "justify-center" : ""} ${te ? "group" : ""} ${he} ${a}`,
      style: K,
      ...f,
      children: i ? d : /* @__PURE__ */ h(Nc, { icon: s, collapse: l, iconWithLabel: c, active: r, gap: T, children: d })
    }
  );
}
function Sr({
  checked: n,
  indeterminate: e = !1,
  disabled: t = !1,
  indicator: r = "box",
  size: i,
  className: o = ""
}) {
  const s = Be(), l = i ?? B(14, 18, s);
  return r === "check" ? /* @__PURE__ */ h(
    "span",
    {
      "data-selection-check": "check",
      className: `inline-flex shrink-0 items-center justify-center ${t ? "opacity-40" : ""} ${o}`,
      style: { width: l, height: l },
      "aria-hidden": !0,
      children: e ? /* @__PURE__ */ h(Cl, { size: l, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : n ? /* @__PURE__ */ h(er, { size: l, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : null
    }
  ) : /* @__PURE__ */ h(
    "span",
    {
      "data-selection-check": "box",
      className: `inline-flex shrink-0 items-center justify-center ${t ? "opacity-40" : ""} ${o}`,
      "aria-hidden": !0,
      children: /* @__PURE__ */ h(Si, { checked: n, indeterminate: e, size: l })
    }
  );
}
function Xo({
  count: n,
  max: e,
  hiddenCount: t = 0,
  onClear: r,
  hero: i,
  clear: o = !0,
  theme: s,
  className: l = ""
}) {
  const c = Be(), a = B(10, 14, c), u = B(6, 9, c), d = B(11, 13, c), f = s === "light" ? "light" : "dark", p = s === "emerald" ? "emerald" : s === "blue" ? !0 : void 0, m = e !== void 0 ? `${n} of ${e} selected` : `${n} selected`;
  return /* @__PURE__ */ C(
    "div",
    {
      "data-selection-footer": !0,
      className: `shrink-0 flex items-center gap-2 border-t border-[color:var(--ui-menu-border)] ${l}`,
      style: {
        padding: `${u}px ${a}px`,
        background: "var(--ui-menu-bg)",
        backdropFilter: "blur(8px)"
      },
      children: [
        /* @__PURE__ */ C(
          "span",
          {
            "data-selection-count": !0,
            className: "min-w-0 flex-1 truncate tabular-nums text-[color:var(--ui-text-muted)]",
            style: { fontSize: d },
            children: [
              m,
              t > 0 && /* @__PURE__ */ C("span", { className: "text-[color:var(--ui-text-faint)]", children: [
                " · ",
                t,
                " hidden by filter"
              ] })
            ]
          }
        ),
        o && /* @__PURE__ */ h(
          Ct,
          {
            variant: "subtle",
            size: "minimal",
            theme: f,
            cloud: p,
            onMouseDown: (g) => g.preventDefault(),
            onClick: r,
            disabled: n === 0,
            "data-selection-clear": !0,
            children: "Clear"
          }
        ),
        i && /* @__PURE__ */ h(
          Ct,
          {
            variant: "primary",
            size: "minimal",
            theme: f,
            cloud: p,
            onMouseDown: (g) => g.preventDefault(),
            onClick: i.onClick,
            disabled: i.disabled ?? n === 0,
            "data-selection-hero": !0,
            children: i.label
          }
        )
      ]
    }
  );
}
const Ni = Qt("dark"), Qo = () => Zt(Ni);
function Ti() {
  const n = Be();
  return {
    padding: `${B(8, 12, n)}px ${B(12, 16, n)}px`,
    fontSize: `${B(12, 14, n)}px`,
    lineHeight: `${B(18, 22, n)}px`
  };
}
function Zo() {
  const n = Be();
  return {
    padding: `${B(6, 9, n)}px ${B(12, 16, n)}px ${B(2, 3, n)}px`,
    fontSize: `${B(10, 11, n)}px`,
    lineHeight: `${B(14, 16, n)}px`
  };
}
const Tc = (n) => n ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", Qi = (n) => n ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", Cc = (n) => n ? "text-xs" : "text-[10px]";
function Pr(n) {
  const e = Ze && Po() > 0;
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
    headerPad: Qi(e),
    headerText: `${Qi(e)} font-semibold uppercase tracking-wider ${Cc(e)} ui-label`,
    // Item padding
    itemPad: Tc(e),
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
function es(n) {
  const e = [];
  return et.Children.forEach(n, (t) => {
    if (typeof t == "string" || typeof t == "number")
      e.push(String(t));
    else if (et.isValidElement(t)) {
      const r = t.props.children;
      (typeof r == "string" || typeof r == "number") && e.push(String(r));
    }
  }), e.join(" ").trim();
}
const Ci = Qt({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), rr = Qt(null), Ei = () => Zt(rr), ts = Qt({ query: "", setQuery: () => {
} }), Ec = () => Zt(ts), ns = Qt(null), Mc = () => Zt(ns), Rc = () => !0;
function Lr(n) {
  const e = k([]), [t, r] = ie(-1), [i, o] = ie(!1), [s, l] = ie(0), c = Q((f) => (e.current = [...e.current, f], l((p) => p + 1), () => {
    e.current = e.current.filter((p) => p !== f), l((p) => p + 1);
  }), []), a = Q((f, p) => {
    r(f), o(p === "pointer");
  }, []), u = Q(() => {
    o((f) => f && (r(-1), !1));
  }, []);
  return Ve(() => ({
    /* A `filter` (the searchable query) narrows the exposed items — hidden
       rows drop out of indexing entirely, so the single highlight, the
       arrows and the typeahead all operate on the VISIBLE set only. */
    items: n ? e.current.filter(n) : e.current,
    /* The unfiltered registration order — multi-select commits in catalogue
       order even when the query hides some selected rows. */
    allItems: e.current,
    highlightedIndex: t,
    pointerDriven: i,
    register: c,
    setHighlighted: a,
    pointerLeave: u
  }), [t, i, s, c, a, u, n]);
}
function rs(n) {
  const e = Ei(), t = k(e);
  t.current = e;
  const r = k(null);
  le(() => {
    var c, a;
    const l = { label: n.label(), activate: n.activate, group: ((c = n.group) == null ? void 0 : c.trim()) || void 0, itemId: n.itemId };
    return r.current = l, (a = t.current) == null ? void 0 : a.register(l);
  }, []);
  const i = e && r.current ? e.items.indexOf(r.current) : -1, o = !!e && !n.disabled && i >= 0 && i === e.highlightedIndex;
  return { api: e, myIndex: i, highlighted: o, setPointer: (l) => {
    !n.disabled && e && l >= 0 && e.setHighlighted(l, "pointer");
  } };
}
function Mi(n, e, t, r) {
  const i = k(-1);
  i.current = e.highlightedIndex;
  const o = k(e);
  o.current = e;
  const s = k(n);
  s.current = n;
  const l = k(r);
  l.current = r;
  const c = k({ text: "", time: 0 }), a = k(!1);
  a.current || (a.current = !0, t.current = (u) => {
    var g, b, y, $, z, N;
    if (!s.current) return;
    const d = (g = l.current) == null ? void 0 : g.onSelectAll;
    if (d && (u.metaKey || u.ctrlKey) && u.key.toLowerCase() === "a") {
      u.preventDefault(), u.stopImmediatePropagation(), d();
      return;
    }
    const f = u.target;
    if (!!f && !!f.closest("input, textarea, [contenteditable]") && (u.key.length === 1 || u.key === "Enter" || u.key === "Escape")) {
      const w = (y = (b = l.current) == null ? void 0 : b.onFieldKey) == null ? void 0 : y.call(b, u);
      (!!(($ = l.current) != null && $.onFieldKey) || o.current.items.length > 0) && (u.stopImmediatePropagation(), w && u.preventDefault());
      return;
    }
    const m = o.current.items;
    if (m.length !== 0) {
      if (u.key === "ArrowDown" || u.key === "ArrowUp") {
        u.preventDefault(), u.stopImmediatePropagation();
        const w = u.key === "ArrowDown" ? 1 : -1, A = (i.current + w + m.length) % m.length;
        o.current.setHighlighted(A, "keyboard");
      } else if (u.key === "ArrowRight") {
        u.preventDefault(), u.stopImmediatePropagation();
        const w = i.current;
        w >= 0 && w < m.length && m[w].submenu && m[w].activate();
      } else if (u.key === "ArrowLeft")
        u.preventDefault(), u.stopImmediatePropagation(), (N = (z = l.current) == null ? void 0 : z.onCloseSub) == null || N.call(z);
      else if (u.key === "Enter" || u.key === " ") {
        u.preventDefault(), u.stopImmediatePropagation();
        const w = i.current;
        w >= 0 && w < m.length && m[w].activate();
      } else if (u.key.length === 1 && !u.ctrlKey && !u.metaKey && !u.altKey) {
        u.preventDefault(), u.stopImmediatePropagation();
        const w = Date.now(), A = (w - c.current.time > 500 ? "" : c.current.text) + u.key.toLowerCase();
        if (c.current = { text: A, time: w }, !A) return;
        const L = i.current + 1;
        for (let O = 0; O < m.length; O++) {
          const E = (L + O) % m.length;
          if (m[E].label.toLowerCase().startsWith(A)) {
            o.current.setHighlighted(E, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function Ri(n, e, t, r, i, o, s) {
  const l = k(e);
  l.current = e;
  const c = k(n);
  c.current = n;
  const a = k(i);
  a.current = i;
  const u = k(s == null ? void 0 : s.ignoreFields);
  u.current = s == null ? void 0 : s.ignoreFields;
  const d = k(s == null ? void 0 : s.selectAll);
  d.current = s == null ? void 0 : s.selectAll;
  const f = k(!1);
  f.current || (f.current = !0, o.current = (p) => {
    if (!c.current || a.current) return;
    const m = r.current;
    if (m && m.contains(p.target)) return;
    if (d.current && (p.metaKey || p.ctrlKey) && p.key.toLowerCase() === "a") {
      p.preventDefault(), p.stopImmediatePropagation(), t.current(p);
      return;
    }
    if (u.current) {
      const b = p.target;
      if (b && b.closest("input, textarea, [contenteditable]")) return;
    }
    l.current.items.length === 0 || !(p.key === "ArrowDown" || p.key === "ArrowUp" || p.key === "ArrowLeft" || p.key === "ArrowRight" || p.key === "Enter" || p.key === " " || p.key.length === 1 && !p.ctrlKey && !p.metaKey && !p.altKey) || (p.preventDefault(), p.stopImmediatePropagation(), t.current(p));
  });
}
function Ai(n, e) {
  const t = k(n);
  t.current = n;
  const r = k(!1);
  r.current || (r.current = !0, e.current = (i) => {
    if (!t.current) return;
    const o = i.currentTarget, s = o.querySelector("[data-menu-items]") ?? o;
    s.scrollHeight > s.clientHeight && (i.preventDefault(), s.scrollTop += i.deltaY);
  });
}
function Br({
  open: n,
  onClose: e,
  onOpenChange: t,
  trigger: r,
  align: i = "left",
  width: o,
  theme: s,
  children: l,
  morph: c = !0,
  contentClassName: a,
  maxMenuHeight: u,
  initialHighlightIndex: d,
  searchable: f = !1,
  searchPlaceholder: p,
  searchFilter: m,
  searchValue: g,
  onSearchValueChange: b,
  multiple: y
}) {
  const $ = Vt(), z = Jo(s, $), N = z.theme, [w, A] = ie([]), [L, O] = ie(null), E = Bn(), q = yi(), M = k(null), I = k(null), P = k(n);
  P.current = n;
  const [Y, U] = ie(n), [T, v] = ie(""), _ = f && g !== void 0, fe = _ ? g : T, he = _ ? b ?? (() => {
  }) : v, te = k(g ?? "");
  le(() => {
    n || (te.current = g ?? "");
  }, [n, g]);
  const K = _ && fe === te.current ? "" : fe, ce = Tl(), ee = k(null), ue = Be(), W = {
    padding: `${B(8, 12, ue)}px ${B(12, 16, ue)}px`,
    fontSize: `${B(12, 14, ue)}px`
  }, [xe, ae] = ie(0), me = f && !_;
  le(() => {
    var ye;
    if (!me || !n) return;
    const R = (ye = I.current) == null ? void 0 : ye.querySelector("[data-menu-items]");
    if (!R) return;
    const G = () => ae(R.offsetWidth - R.clientWidth);
    G();
    const se = new ResizeObserver(G);
    return se.observe(R), () => se.disconnect();
  }, [n, me, fe]);
  const J = Ve(() => {
    if (!f) return;
    const R = K.trim().toLowerCase();
    return R ? (G) => {
      var se;
      return m ? m(R, G.label, G.group) : G.label.toLowerCase().includes(R) || (((se = G.group) == null ? void 0 : se.toLowerCase().includes(R)) ?? !1);
    } : Rc;
  }, [K, f, m]), F = Lr(J), Le = f && K.trim() !== "" && F.items.length === 0, pe = !!y, Ue = F.allItems.map((R) => R.itemId).filter((R) => !!R), qe = F.items.map((R) => R.itemId).filter((R) => !!R), Z = Yo({
    mode: "draft",
    selectedIds: (y == null ? void 0 : y.selectedIds) ?? Go,
    itemIds: Ue,
    visibleIds: qe,
    max: y == null ? void 0 : y.max,
    disabledIds: y == null ? void 0 : y.disabledIds,
    indicator: y == null ? void 0 : y.indicator,
    onCommit: y == null ? void 0 : y.onCommit
  }), Me = k(Z.reset);
  Me.current = Z.reset;
  const oe = typeof (y == null ? void 0 : y.commitLabel) == "function" ? y.commitLabel(Z.count) : (y == null ? void 0 : y.commitLabel) ?? `Select ${Z.count}`;
  le(() => {
    if (n)
      return U(!0), _ || v(""), F.setHighlighted(d ?? -1, "keyboard"), Me.current(), qo(() => {
        t == null || t(!1), e == null || e();
      });
    A([]);
  }, [n, d, t, e]), le(() => {
    if (!n || !q) return;
    const R = (G) => {
      if (G.pointerType !== "touch") return;
      const se = G.target;
      se && (I.current && I.current.contains(se) || M.current && M.current.contains(se) || se instanceof Element && se.closest("[data-radix-menu-content]") || (t == null || t(!1), e == null || e()));
    };
    return q.addEventListener("pointerdown", R, { capture: !0 }), () => q.removeEventListener("pointerdown", R, { capture: !0 });
  }, [n, q, t, e]);
  const Ie = Q(() => {
    const R = M.current;
    if (!R) return null;
    const G = R.getBoundingClientRect();
    return { left: G.left, top: G.top, width: G.width, height: G.height };
  }, []), je = Or({
    visible: n,
    morph: c,
    anchor: Ie,
    onClosed: () => U(!1)
  }), Ee = k(() => {
  }), Ke = k(() => {
  }), Ge = k(() => {
  }), lt = Q((R) => {
    if (R.key === "Enter") {
      const G = F.highlightedIndex, se = F.items[G >= 0 ? G : 0];
      return se == null || se.activate(), !0;
    }
    return R.key === "Escape" ? (t == null || t(!1), e == null || e(), !0) : !1;
  }, [F, t, e]);
  Mi(n && w.length === 0, F, Ee, {
    onFieldKey: lt,
    onSelectAll: pe ? () => Z.setAll(!0) : void 0
  }), Ai(n, Ke), Ri(n, F, Ee, I, w.length > 0, Ge, {
    ignoreFields: _,
    selectAll: pe
  });
  const Nt = k(null), Tt = Q((R) => {
    var G;
    if (R) {
      R.addEventListener("keydown", Ee.current, { capture: !0 }), R.addEventListener("wheel", Ke.current, { passive: !1 });
      const se = R.ownerDocument;
      Nt.current = se, se.addEventListener("keydown", Ge.current, { capture: !0 }), ht(!0);
    } else
      (G = Nt.current) == null || G.removeEventListener("keydown", Ge.current, { capture: !0 }), Nt.current = null, ht(!1);
    I.current = R, je(R);
  }, [je]), [Te, xt] = ie({ top: 0, left: 0, maxH: jo, side: "bottom", ready: !1 }), [dt, Dt] = ie(0), [ft, ht] = ie(!1);
  le(() => {
    n && M.current && Dt(M.current.getBoundingClientRect().width);
  }, [n]), Wo({
    anchorRef: M,
    panelRef: I,
    open: n && ft,
    maxHeight: u,
    onPosition: xt
  }), le(() => {
    var R;
    if (Te.ready && n) {
      if (f) {
        (R = ee.current ?? M.current) == null || R.focus();
        return;
      }
      const G = I.current;
      G && G.ownerDocument.activeElement !== G && !G.contains(G.ownerDocument.activeElement) && G.focus();
    }
  }, [Te.ready, n, f]), le(() => {
    if (!n || !f) return;
    if (F.items.length === 0) {
      F.highlightedIndex !== -1 && F.setHighlighted(-1, "keyboard");
      return;
    }
    const R = F.highlightedIndex;
    (R < 0 || R >= F.items.length) && F.setHighlighted(0, "keyboard");
  }, [n, fe, f, F.items.length]), mt(() => {
    var G;
    if (!n || F.highlightedIndex < 0 || F.pointerDriven) return;
    const R = (G = I.current) == null ? void 0 : G.querySelector(`[data-ei="${F.highlightedIndex}"]`);
    an(R, "nearest");
  }, [n, F.highlightedIndex, F.pointerDriven]);
  const pt = Q((R) => {
    if (!(!R && !P.current)) {
      if (!R && bt.current) {
        if (_) return;
        Fe.current = !0;
      }
      t ? t(R) : R || e == null || e();
    }
  }, [t, e]), ct = k(Y);
  ct.current = Y;
  const bt = k(!1), Fe = k(!1), vt = Q(() => {
    if (!P.current && ct.current) {
      if (Fe.current) {
        Fe.current = !1, bt.current = !1;
        return;
      }
      t == null || t(!0);
    }
  }, [t]), We = et.isValidElement(r) ? r : null, Ne = k(!1), Wt = Q(() => {
    const R = M.current;
    R && (Ne.current = !0, R.focus(), setTimeout(() => {
      Ne.current = !1;
    }, 0));
  }, []), Ot = We ? et.cloneElement(We, {
    ref: (R) => {
      M.current = R;
      const G = We.props.ref;
      typeof G == "function" ? G(R) : G && (G.current = R);
    },
    /* Radix's trigger primitive merges `type="button"` onto the child; a
       text field trigger-as-search must stay a text field. */
    ..._ ? { type: We.props.type ?? "text" } : {},
    ..._ ? {
      /* A text field that opens a list IS a combobox, and the highlighted
         row must be announced — the field is outside the popup, so the
         only link screen readers get is `aria-activedescendant`. */
      role: "combobox",
      "aria-autocomplete": "list",
      "aria-controls": n ? `${ce}-content` : void 0,
      "aria-activedescendant": n && F.highlightedIndex >= 0 ? `${ce}-opt-${F.highlightedIndex}` : void 0
    } : {},
    onPointerDownCapture: (R) => {
      var G, se;
      (se = (G = We.props).onPointerDownCapture) == null || se.call(G, R), bt.current = !0, Fe.current = !1, setTimeout(() => {
        bt.current = !1;
      }, 0);
    },
    onPointerDown: (R) => {
      var G, se;
      if ((se = (G = We.props).onPointerDown) == null || se.call(G, R), _) {
        R.preventDefault();
        const ye = P.current;
        ye || t == null || t(!0);
        const De = M.current;
        De == null || De.focus(), !ye && De instanceof HTMLInputElement && De.select();
      }
    },
    /* Space is a printable search character, but Radix treats it as the
       trigger's open/close key. Keep it in the field. */
    onKeyDownCapture: (R) => {
      var G, se;
      (se = (G = We.props).onKeyDownCapture) == null || se.call(G, R), _ && R.key === " " && R.stopPropagation();
    },
    onClick: (R) => {
      var G, se;
      (se = (G = We.props).onClick) == null || se.call(G, R), vt();
    },
    /* A kit-driven focus restore is not a user focus (see above). */
    onFocus: (R) => {
      var G, se;
      if (Ne.current) {
        Ne.current = !1;
        return;
      }
      (se = (G = We.props).onFocus) == null || se.call(G, R);
    },
    /* Focus leaving the field ends the search session: Tab (or any focus
       move that does not land in the panel) must close the list, not leave
       an orphan panel floating with the keyboard elsewhere. The panel's
       own focused row is legitimate — keep it open for the pending click. */
    onBlur: (R) => {
      var se, ye, De, wt;
      if ((ye = (se = We.props).onBlur) == null || ye.call(se, R), !_ || !P.current) return;
      const G = R.relatedTarget;
      G && ((De = I.current) != null && De.contains(G) || (wt = M.current) != null && wt.contains(G)) || setTimeout(() => {
        var V;
        const kt = M.current;
        if (!kt || !P.current) return;
        const S = kt.ownerDocument.activeElement;
        S && (kt.contains(S) || (V = I.current) != null && V.contains(S)) || (t == null || t(!1), e == null || e());
      }, 0);
    },
    /* Combobox mode (externalSearch): the trigger field IS the search box,
       so it also drives the menu's keyboard — arrows move the single
       highlight and Enter activates the highlighted (or first visible)
       row. Filtering itself follows the VALUE (see filterQuery), so no
       input method is special-cased here. */
    onKeyDown: (R) => {
      var G, se;
      if ((se = (G = We.props).onKeyDown) == null || se.call(G, R), !(!_ || !P.current)) {
        if (R.key === "ArrowDown" || R.key === "ArrowUp") {
          R.preventDefault();
          const ye = F.items;
          if (ye.length === 0) return;
          const De = R.key === "ArrowDown" ? 1 : -1, wt = (F.highlightedIndex + De + ye.length) % ye.length;
          F.setHighlighted(wt, "keyboard");
        } else if (R.key === "Enter") {
          R.preventDefault();
          const ye = F.highlightedIndex, De = F.items[ye >= 0 ? ye : 0];
          De == null || De.activate();
        }
      }
    }
  }) : r, ot = /* @__PURE__ */ C("div", { "data-menu-search-empty": !0, className: "px-3 py-3 text-center", children: [
    /* @__PURE__ */ C("div", { className: "text-xs font-medium text-[color:var(--ui-text-muted)]", children: [
      "No matches for “",
      K.trim(),
      "”"
    ] }),
    /* @__PURE__ */ h("div", { className: "mt-0.5 text-[10px] text-[color:var(--ui-text-faint)]", children: "Try a different search." })
  ] }), at = me || pe, Yt = `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] min-w-0 ${at ? "overflow-hidden" : "overflow-y-auto scrollbar-custom"}`;
  return /* @__PURE__ */ C(ze.Root, { open: n || Y, onOpenChange: pt, modal: !1, children: [
    /* @__PURE__ */ h(ze.Trigger, { asChild: !0, children: Ot }),
    /* @__PURE__ */ h(ze.Portal, { container: E ?? void 0, children: /* @__PURE__ */ h(Ni.Provider, { value: N, children: /* @__PURE__ */ h(Ci.Provider, { value: { chain: w, setChain: A, morph: c, keyboardOpened: L, setKeyboardOpened: O }, children: /* @__PURE__ */ h(rr.Provider, { value: F, children: /* @__PURE__ */ h(ts.Provider, { value: { query: fe, setQuery: he }, children: /* @__PURE__ */ h(Uo.Provider, { value: pe ? Z : null, children: /* @__PURE__ */ h(ns.Provider, { value: ce, children: /* @__PURE__ */ C(
      ze.Content,
      {
        id: `${ce}-content`,
        ref: Tt,
        tabIndex: _ ? void 0 : -1,
        ...z.attrs,
        "data-ui-fixed": !0,
        className: `${Yt} ${o || ""} ${a || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: Te.left,
          top: Te.top,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: o ? void 0 : dt || void 0,
          maxHeight: Te.maxH,
          visibility: Te.ready ? "visible" : "hidden"
        },
        onPointerLeave: F.pointerLeave,
        onFocusCapture: _ ? (R) => {
          R.target === R.currentTarget && (R.stopPropagation(), Wt());
        } : void 0,
        onFocusOutside: _ ? (R) => {
          var se;
          const G = R.target;
          G && (G === M.current || (se = M.current) != null && se.contains(G)) && R.preventDefault();
        } : void 0,
        onCloseAutoFocus: _ ? (R) => {
          R.preventDefault(), Wt();
        } : void 0,
        children: [
          me && /* @__PURE__ */ h("div", { className: "shrink-0 px-0 pt-1 pb-1", style: { paddingRight: xe }, children: /* @__PURE__ */ C("div", { "data-menu-search": !0, className: "ui-item ui-item-highlighted flex items-center gap-2 rounded", style: W, children: [
            /* @__PURE__ */ h(on, { className: "w-3.5 h-3.5 shrink-0 ui-icon" }),
            /* @__PURE__ */ h(
              "input",
              {
                ref: ee,
                value: fe,
                onChange: (R) => he(R.target.value),
                placeholder: p ?? "Search…",
                className: "flex-1 min-w-0 bg-transparent outline-none text-current placeholder:text-current placeholder:opacity-50 cursor-text"
              }
            ),
            fe ? /* @__PURE__ */ h(
              "button",
              {
                type: "button",
                tabIndex: -1,
                "aria-label": "Clear search",
                className: "shrink-0 ui-icon-btn rounded flex items-center justify-center p-1 -m-1",
                onPointerDown: (R) => R.stopPropagation(),
                onClick: () => {
                  var R;
                  he(""), (R = ee.current) == null || R.focus();
                },
                children: /* @__PURE__ */ h(yn, { className: "w-3.5 h-3.5" })
              }
            ) : /* @__PURE__ */ h("span", { className: "w-3.5 h-3.5 shrink-0" })
          ] }) }),
          at ? /* @__PURE__ */ C("div", { "data-menu-items": !0, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: [
            l,
            Le && ot
          ] }) : /* @__PURE__ */ C(Qe, { children: [
            l,
            Le && ot
          ] }),
          pe && (y == null ? void 0 : y.footer) !== !1 && /* @__PURE__ */ h(
            Xo,
            {
              count: Z.count,
              max: y == null ? void 0 : y.max,
              hiddenCount: (y == null ? void 0 : y.hiddenNote) === !1 ? 0 : Z.hiddenCount,
              clear: (y == null ? void 0 : y.clear) !== !1,
              theme: N,
              onClear: Z.clear,
              hero: {
                label: oe,
                onClick: () => {
                  Z.commit(), pt(!1);
                },
                disabled: Z.count === 0
              }
            }
          )
        ]
      }
    ) }) }) }) }) }) }) })
  ] });
}
function ah({
  open: n,
  onClose: e,
  items: t,
  activeId: r,
  onSelect: i,
  onRename: o,
  onDuplicate: s,
  onDelete: l,
  onCreate: c,
  onImport: a,
  onExport: u,
  onReset: d,
  onTrash: f,
  closeOnSelect: p,
  readOnly: m = !1,
  theme: g,
  align: b,
  label: y,
  header: $,
  itemLabel: z,
  trigger: N,
  minItems: w = 1,
  itemRender: A,
  morph: L = !0,
  contentClassName: O
}) {
  const E = Pr(), q = Ti(), [M, I] = ie(null), [P, Y] = ie(""), U = k(P);
  U.current = P;
  const T = k(null), v = k(null), [_, fe] = ie(null), he = Q((W) => {
    v.current = W, fe(W);
  }, []), te = Vo({
    open: n,
    scroller: () => v.current,
    row: () => {
      var W;
      return ((W = v.current) == null ? void 0 : W.querySelector('[data-active="1"]')) ?? null;
    }
  });
  le(() => {
    if (!n) return;
    const W = (ae) => {
      var qe, Z;
      const me = ae.target;
      if (me && me.closest("input, textarea, [contenteditable]")) {
        M && me === T.current && (ae.key === "Enter" ? (ae.preventDefault(), ae.stopImmediatePropagation(), ce()) : ae.key === "Escape" && (ae.preventDefault(), ae.stopImmediatePropagation(), ee()));
        return;
      }
      const J = (qe = v.current) == null ? void 0 : qe.closest(".ui-menu");
      if (!J || !J.contains(ae.target)) return;
      const F = J.ownerDocument, Le = [...J.querySelectorAll('[data-im-row] > [role="menuitem"]:first-child')], pe = [...J.querySelectorAll(':scope > div:last-child > [role="menuitem"]')], Ue = [...Le, ...pe];
      if (ae.key === "ArrowDown" || ae.key === "ArrowUp") {
        ae.preventDefault(), ae.stopImmediatePropagation();
        const Me = F.activeElement;
        let oe = Me ? Ue.indexOf(Me) : -1;
        if (oe < 0 && Me) {
          const Ke = Me.closest("[data-im-row]"), Ge = Ke == null ? void 0 : Ke.querySelector('[role="menuitem"]:first-child');
          Ge && (oe = Le.indexOf(Ge));
        }
        const Ie = ae.key === "ArrowDown" ? 1 : -1, je = oe < 0 ? Ie === 1 ? 0 : Ue.length - 1 : (oe + Ie + Ue.length) % Ue.length, Ee = Ue[je];
        Ee == null || Ee.focus({ preventScroll: !0 }), an((Ee == null ? void 0 : Ee.closest("[data-im-row]")) ?? Ee, "nearest", v.current);
        return;
      }
      if (ae.key === "ArrowLeft" || ae.key === "ArrowRight") {
        const Me = F.activeElement, oe = Me == null ? void 0 : Me.closest("[data-im-row]");
        if (!oe) return;
        ae.preventDefault(), ae.stopImmediatePropagation();
        const Ie = [...oe.querySelectorAll('[role="menuitem"]')].slice(1);
        if (Ie.length === 0) return;
        const je = Me && oe.contains(Me) ? Ie.indexOf(Me) : -1, Ee = ae.key === "ArrowRight" ? 1 : -1, Ke = je < 0 ? 0 : (je + Ee + Ie.length) % Ie.length;
        (Z = Ie[Ke]) == null || Z.focus({ preventScroll: !0 });
        return;
      }
    }, xe = (_ == null ? void 0 : _.ownerDocument) ?? null;
    return xe == null || xe.addEventListener("keydown", W, { capture: !0 }), () => xe == null ? void 0 : xe.removeEventListener("keydown", W, { capture: !0 });
  }, [n, M, _]), le(() => {
    if (!M) return;
    const W = t.find((J) => J.id === M);
    W && !P && Y(W.name);
    const xe = requestAnimationFrame(() => {
      const J = T.current;
      J && (J.focus(), J.select());
    });
    let ae = 0;
    const me = window.setInterval(() => {
      const J = T.current;
      if (ae++, !J || ae > 12) {
        clearInterval(me);
        return;
      }
      J.ownerDocument.activeElement !== J && (J.focus(), J.select());
    }, 50);
    return () => {
      cancelAnimationFrame(xe), clearInterval(me);
    };
  }, [M]), le(() => {
    if (M) {
      const W = t.find((xe) => xe.id === M);
      W && !P && Y(W.name);
    }
  }, [M, t]);
  const K = (W, xe) => {
    I(W), Y(xe);
  }, ce = () => {
    M && U.current.trim() && o(M, U.current.trim()), I(null);
  }, ee = () => {
    I(null);
  }, ue = z || $.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ C(Br, { open: n, onOpenChange: (W) => {
    W ? (I(null), Y("")) : (M && P.trim() && o(M, P.trim()), I(null), Y("")), (!W || !m) && e(W);
  }, width: "w-80", theme: g, align: b, trigger: N, morph: L, contentClassName: O, children: [
    /* @__PURE__ */ h("div", { className: `shrink-0 ${E.headerText}`, children: $ }),
    /* @__PURE__ */ h("div", { ref: he, "data-im-list": !0, onPointerEnter: te.engage, onPointerDown: te.engage, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: t.map((W) => {
      const xe = W.id === r, ae = M === W.id;
      return /* @__PURE__ */ h("div", { "data-im-row": W.id, "data-active": xe ? "1" : void 0, className: `scroll-my-4 flex items-center gap-1 rounded ${xe || ae ? E.rowActiveBg : E.rowHoverBg} ${M && !ae ? "opacity-40 pointer-events-none" : ""}`, children: ae ? /* @__PURE__ */ C(Qe, { children: [
        /* @__PURE__ */ h("div", { className: "flex-1 min-w-0 flex items-center", children: /* @__PURE__ */ h(
          "input",
          {
            ref: T,
            autoFocus: !0,
            value: P,
            onChange: (me) => Y(me.target.value),
            onKeyDown: (me) => {
              me.key === "Enter" && (me.preventDefault(), me.stopPropagation(), ce()), me.key === "Escape" && (me.preventDefault(), me.stopPropagation(), ee());
            },
            className: "w-full outline-none bg-transparent placeholder:text-current placeholder:opacity-50",
            style: q
          }
        ) }),
        /* @__PURE__ */ h(
          ze.Item,
          {
            className: `shrink-0 ${E.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${E.editConfirm}`,
            onSelect: (me) => {
              me.preventDefault(), ce();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ h(er, { className: E.btnIcon })
          }
        ),
        /* @__PURE__ */ h(
          ze.Item,
          {
            className: `shrink-0 ${E.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${E.editCancel}`,
            onSelect: (me) => {
              me.preventDefault(), ee();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ h(yn, { className: E.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ C(Qe, { children: [
        /* @__PURE__ */ h(
          ze.Item,
          {
            style: q,
            className: `flex-1 min-w-0 rounded outline-none cursor-pointer flex items-center ${E.rowText} ${xe ? "" : E.rowTextHover}`,
            onSelect: p ? () => {
              i(W.id);
            } : (me) => {
              me.preventDefault(), i(W.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ h("span", { className: `truncate ${xe ? E.rowActiveText : ""}`, children: A ? A(W) : W.name })
          }
        ),
        /* @__PURE__ */ h(
          ze.Item,
          {
            className: `shrink-0 ${E.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${xe ? E.btnActive : E.btnBase}`,
            onSelect: (me) => {
              me.preventDefault(), K(W.id, W.name);
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: /* @__PURE__ */ h(El, { className: E.btnIcon })
          }
        ),
        /* @__PURE__ */ h(
          ze.Item,
          {
            className: `shrink-0 ${E.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${xe ? E.btnActive : E.btnBase}`,
            onSelect: (me) => {
              me.preventDefault();
              const J = s(W.id);
              J && K(J, `${W.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: /* @__PURE__ */ h(Io, { className: E.btnIcon })
          }
        ),
        /* @__PURE__ */ h(
          ze.Item,
          {
            className: `shrink-0 ${E.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${t.length <= w ? E.btnDisabled : xe ? E.btnDangerActive : E.btnDanger}`,
            onSelect: (me) => {
              me.preventDefault(), l(W.id);
            },
            onTouchStart: () => {
            },
            disabled: m || t.length <= w,
            children: /* @__PURE__ */ h(ii, { className: E.btnIcon })
          }
        )
      ] }) }, W.id);
    }) }),
    /* @__PURE__ */ C("div", { className: `shrink-0 ${M ? "opacity-40 pointer-events-none" : ""}`, children: [
      d && /* @__PURE__ */ C(Qe, { children: [
        /* @__PURE__ */ h(ze.Separator, { className: E.separator }),
        /* @__PURE__ */ C(
          ze.Item,
          {
            className: `w-full text-left ${E.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${E.itemDefault} ui-row`,
            onSelect: (W) => {
              W.preventDefault(), d();
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: [
              /* @__PURE__ */ h($o, { className: `${E.btnIcon} ${E.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (c || a || u || f) && /* @__PURE__ */ h(ze.Separator, { className: E.separator }),
      c && /* @__PURE__ */ C(
        ze.Item,
        {
          className: `w-full text-left ${E.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${E.itemDefault} ui-row`,
          onSelect: (W) => {
            W.preventDefault();
            const xe = c();
            xe && K(xe, "");
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ h($r, { className: `${E.btnIcon} ${E.icon}` }),
            "New ",
            ue
          ]
        }
      ),
      a && /* @__PURE__ */ C(
        ze.Item,
        {
          className: `w-full text-left ${E.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${E.itemDefault} ui-row`,
          onSelect: (W) => {
            W.preventDefault(), a();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ C("svg", { className: `${E.btnIcon} ${E.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ h("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ h("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ h("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      u && /* @__PURE__ */ C(
        ze.Item,
        {
          className: `w-full text-left ${E.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${E.itemDefault} ui-row`,
          onSelect: (W) => {
            W.preventDefault(), u();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ C("svg", { className: `${E.btnIcon} ${E.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ h("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ h("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ h("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      f && /* @__PURE__ */ C(
        ze.Item,
        {
          className: `w-full text-left ${E.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${E.itemDefault} ui-row`,
          onSelect: (W) => {
            W.preventDefault(), f();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ h(ii, { className: `${E.btnIcon} ${E.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
function Ac({
  onClick: n,
  icon: e,
  disabled: t = !1,
  variant: r = "default",
  className: i = "",
  children: o,
  keepOpen: s = !1,
  selected: l = !1,
  rightAction: c,
  trailing: a,
  group: u,
  itemId: d
}) {
  var v;
  Qo();
  const f = Pr(), p = Ti(), m = Zo(), g = k(!1), b = k(null), y = bc(), $ = !!y && d !== void 0, z = y && d !== void 0 ? y.isSelected(d) : l, N = t || (y && d !== void 0 ? !y.canToggle(d) : !1), { myIndex: w, highlighted: A, setPointer: L, api: O } = rs({
    label: () => es(o),
    activate: () => {
      N || (y && d !== void 0 ? y.toggle(d) : n());
    },
    disabled: N,
    group: u,
    itemId: d
  }), { query: E } = Ec(), q = E.trim() !== "" && w < 0, M = Mc(), I = u == null ? void 0 : u.trim(), P = !!I && w >= 0 && (w === 0 || ((v = O == null ? void 0 : O.items[w - 1]) == null ? void 0 : v.group) !== I), Y = I && y ? ((O == null ? void 0 : O.items) ?? []).filter((_) => _.group === I && _.itemId).map((_) => _.itemId).filter((_) => !y.isDisabled(_)) : [], U = y && Y.length > 0 ? y.groupState(Y) : "none", T = r === "danger" ? f.itemDanger : f.itemDefault;
  return /* @__PURE__ */ C(Qe, { children: [
    P && /* @__PURE__ */ h(
      "div",
      {
        "data-menu-group": I,
        role: "presentation",
        className: `ui-label shrink-0 select-none font-semibold uppercase tracking-wider ${y && Y.length > 0 ? "" : "pointer-events-none"}`,
        style: m,
        children: y && Y.length > 0 ? /* @__PURE__ */ C("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `Select all ${I}`,
              onMouseDown: (_) => _.preventDefault(),
              onClick: () => y.toggleGroup(Y),
              className: "flex shrink-0 cursor-pointer items-center justify-center rounded pointer-events-auto",
              children: /* @__PURE__ */ h(
                Sr,
                {
                  checked: U === "all",
                  indeterminate: U === "some",
                  indicator: y.indicator
                }
              )
            }
          ),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: I })
        ] }) : I
      }
    ),
    /* @__PURE__ */ C(
      ze.Item,
      {
        ref: b,
        id: M && w >= 0 ? `${M}-opt-${w}` : void 0,
        "data-ei": w >= 0 ? w : void 0,
        ...$ ? { role: "menuitemcheckbox", "aria-checked": z } : {},
        style: { ...p, display: q ? "none" : void 0 },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${T} ${$ ? "" : l ? "ui-item-selected" : ""} ${A ? "ui-item-highlighted" : ""} ${N ? "opacity-30 pointer-events-none" : ""} ${i}`,
        onSelect: (_) => {
          if (g.current) {
            g.current = !1;
            return;
          }
          if ($) {
            _.preventDefault(), y && d !== void 0 && y.toggle(d);
            return;
          }
          s && _.preventDefault(), n();
        },
        onPointerEnter: () => {
          L(w);
        },
        onTouchStart: () => {
        },
        disabled: N,
        children: [
          $ && /* @__PURE__ */ h(Sr, { checked: z, disabled: N, indicator: y.indicator }),
          e && /* @__PURE__ */ h("span", { className: `${f.icon} shrink-0`, children: e }),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: o }),
          a && /* @__PURE__ */ h("span", { className: "shrink-0 ml-1 flex items-center", children: a }),
          c && /* @__PURE__ */ h(
            "span",
            {
              className: `shrink-0 ml-1 p-0.5 rounded ${f.rightAction}`,
              title: c.title,
              onPointerDown: (_) => {
                _.stopPropagation(), _.preventDefault(), g.current = !0, c.onClick();
              },
              onClick: (_) => {
                _.stopPropagation(), _.preventDefault();
              },
              children: c.icon
            }
          )
        ]
      }
    )
  ] });
}
function Ic({ id: n, label: e, icon: t, width: r, side: i = "right", children: o, contentClassName: s }) {
  const { chain: l, setChain: c, morph: a, keyboardOpened: u, setKeyboardOpened: d } = Zt(Ci), f = l.includes(n), p = l[l.length - 1] === n, m = Qo(), g = Bn(), b = k(null), y = k(null), [$, z] = ie(f), N = !f && $;
  le(() => {
    f && z(!0);
  }, [f]);
  const w = () => c((ee) => {
    const ue = ee.indexOf(n);
    return ue >= 0 ? ee.slice(0, ue) : ee;
  }), A = Lr(), L = Ei(), O = k(L);
  O.current = L;
  const E = k(null);
  le(() => {
    var ue;
    const ee = {
      label: e,
      activate: () => {
        d(n), c((W) => W.includes(n) ? W : [...W, n]);
      },
      submenu: !0
    };
    return E.current = ee, (ue = O.current) == null ? void 0 : ue.register(ee);
  }, []);
  const q = L && E.current ? L.items.indexOf(E.current) : -1, M = q >= 0 && q === L.highlightedIndex, I = Q(() => {
    const ee = b.current;
    if (!ee) return null;
    const ue = ee.getBoundingClientRect();
    return { left: ue.left, top: ue.top, width: ue.width, height: ue.height };
  }, []), P = Or({
    visible: f,
    morph: a,
    anchor: I,
    onClosed: () => z(!1)
  }), Y = k(() => {
  }), U = k(() => {
  }), T = k(() => {
  });
  Mi(f && p, A, Y, {
    onCloseSub: () => {
      w(), L && q >= 0 && L.setHighlighted(q, "keyboard");
    }
  });
  const v = k(u);
  v.current = u, le(() => {
    f && (v.current === n ? (A.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var ee;
      return (ee = y.current) == null ? void 0 : ee.focus();
    }), d(null)) : A.setHighlighted(-1, "keyboard"));
  }, [f]), Ai(f, U), Ri(f, A, Y, y, !p, T), et.useLayoutEffect(() => {
    var ue;
    if (!f || A.highlightedIndex < 0 || A.pointerDriven) return;
    const ee = (ue = y.current) == null ? void 0 : ue.querySelector(`[data-ei="${A.highlightedIndex}"]`);
    an(ee, "nearest", y.current);
  }, [f, A.highlightedIndex, A.pointerDriven]);
  const _ = k(null), fe = Q((ee) => {
    var ue;
    if (ee) {
      ee.addEventListener("keydown", Y.current, { capture: !0 }), ee.addEventListener("wheel", U.current, { passive: !1 });
      const W = ee.ownerDocument;
      _.current = W, W.addEventListener("keydown", T.current, { capture: !0 });
    } else
      (ue = _.current) == null || ue.removeEventListener("keydown", T.current, { capture: !0 }), _.current = null;
    y.current = ee, P(ee);
  }, [P]), he = Be(), te = { padding: `${B(8, 12, he)}px ${B(12, 16, he)}px`, fontSize: B(12, 14, he) }, K = `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${M ? " ui-item-highlighted" : ""}${N ? " ui-sub-closing" : ""}`, ce = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${s || ""}`;
  return /* @__PURE__ */ C(ze.Sub, { open: f || $, onOpenChange: (ee) => c((ue) => {
    if (!ee) {
      const W = ue.indexOf(n);
      return W >= 0 ? ue.slice(0, W) : ue;
    }
    return ue.includes(n) ? ue : [...ue, n];
  }), children: [
    /* @__PURE__ */ C(
      ze.SubTrigger,
      {
        ref: b,
        "data-ei": q >= 0 ? q : void 0,
        style: te,
        className: K,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          L && q >= 0 && L.setHighlighted(q, "pointer");
        },
        onPointerDown: (ee) => {
          ee.pointerType === "pen" && (ee.preventDefault(), c((ue) => f ? ue.slice(0, ue.indexOf(n)) : [...ue, n]));
        },
        children: [
          i === "left" && /* @__PURE__ */ h(wr, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ C("span", { className: "flex items-center gap-2", children: [
            t && /* @__PURE__ */ h("span", { className: "ui-icon shrink-0", children: t }),
            e
          ] }),
          i === "right" && /* @__PURE__ */ h(wr, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ h(ze.Portal, { container: g ?? void 0, children: /* @__PURE__ */ h(
      ze.SubContent,
      {
        ref: fe,
        "data-theme": m,
        className: ce,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: A.pointerLeave,
        children: /* @__PURE__ */ h(rr.Provider, { value: A, children: o })
      }
    ) })
  ] });
}
const _n = 8, uh = ({ open: n, x: e, y: t, onClose: r, children: i, containerRef: o, theme: s, morph: l = !0 }) => {
  const c = Vt(), a = s ? { theme: s, attrs: { "data-theme": s } } : c ? Jo(void 0, c) : { theme: "light", attrs: { "data-theme": "light" } }, { theme: u } = a, d = Be(), f = B(12, 14, d), p = k(null), m = tr(), [g, b] = ie(!1), [y, $] = ie([]), [z, N] = ie(null), w = Lr();
  le(() => {
    if (n)
      return w.setHighlighted(-1, "keyboard"), qo(r);
  }, [n, r]);
  const A = k({ left: e, top: t });
  n && (A.current = { left: e, top: t });
  const L = Q(() => ({ left: A.current.left, top: A.current.top, width: 0, height: 0 }), []), O = Or({
    visible: !0,
    morph: l,
    anchor: L,
    cloneOnUnmount: !0
  }), E = k(() => {
  }), q = k(() => {
  }), M = k(() => {
  });
  Mi(n, w, E), mt(() => {
    if (!n || w.highlightedIndex < 0 || w.pointerDriven) return;
    const T = p.current;
    an(
      T == null ? void 0 : T.querySelector(`[data-ei="${w.highlightedIndex}"]`),
      "nearest",
      T
    );
  }, [n, w.highlightedIndex, w.pointerDriven]), Ai(n, q), Ri(n, w, E, p, y.length > 0, M);
  const I = k(null), P = Q((T) => {
    var v;
    if (T) {
      T.addEventListener("keydown", E.current, { capture: !0 }), T.addEventListener("wheel", q.current, { passive: !1 });
      const _ = T.ownerDocument;
      I.current = _, _.addEventListener("keydown", M.current, { capture: !0 });
    } else
      (v = I.current) == null || v.removeEventListener("keydown", M.current, { capture: !0 }), I.current = null;
    p.current = T, b(!!T), O(T);
  }, [O]), [Y, U] = ie(null);
  return mt(() => {
    var W;
    if (!n || !g || !p.current) return;
    const T = p.current, v = T.offsetWidth, _ = T.offsetHeight, fe = (W = o == null ? void 0 : o.current) == null ? void 0 : W.getBoundingClientRect(), he = fe ? fe.right : (m == null ? void 0 : m.innerWidth) ?? 0, te = fe ? fe.bottom : (m == null ? void 0 : m.innerHeight) ?? 0, K = fe ? fe.left : 0, ce = fe ? fe.top : 0;
    let ee = Math.max(ce + _n, A.current.top), ue = Math.max(K + _n, A.current.left);
    ue + v > he && (ue = he - v - _n), ee + _ > te && (ee = Math.max(ce + _n, te - _ - _n)), U({ left: ue, top: ee });
  }, [n, g, e, t, o]), n ? /* @__PURE__ */ C(ze.Root, { open: n, onOpenChange: (T) => {
    T || r();
  }, modal: !1, children: [
    /* @__PURE__ */ h(ze.Trigger, { asChild: !0, children: /* @__PURE__ */ h("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ h(ze.Portal, { children: /* @__PURE__ */ h(Ni.Provider, { value: u, children: /* @__PURE__ */ h(Ci.Provider, { value: { chain: y, setChain: $, morph: l, keyboardOpened: z, setKeyboardOpened: N }, children: /* @__PURE__ */ h(rr.Provider, { value: w, children: /* @__PURE__ */ h(
      ze.Content,
      {
        ref: P,
        ...a.attrs,
        "data-ui-fixed": !0,
        className: "fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom",
        style: { fontSize: f, left: (Y == null ? void 0 : Y.left) ?? A.current.left, top: (Y == null ? void 0 : Y.top) ?? A.current.top, touchAction: "manipulation" },
        onPointerLeave: w.pointerLeave,
        children: i
      }
    ) }) }) }) })
  ] }) : null;
}, dh = ({ onClick: n, variant: e = "default", icon: t, disabled: r = !1, selected: i = !1, trailing: o, children: s }) => {
  const l = Be(), c = { padding: `${B(8, 12, l)}px ${B(12, 16, l)}px`, fontSize: B(12, 14, l) }, a = Ei(), u = k(a);
  u.current = a;
  const d = k(null);
  le(() => {
    var g;
    const m = { label: es(s), activate: () => {
      r || n();
    } };
    return d.current = m, (g = u.current) == null ? void 0 : g.register(m);
  }, []);
  const f = a && d.current ? a.items.indexOf(d.current) : -1, p = !r && f >= 0 && f === a.highlightedIndex;
  return /* @__PURE__ */ C(
    ze.Item,
    {
      "data-ei": f >= 0 ? f : void 0,
      onClick: r ? void 0 : n,
      onPointerEnter: () => {
        !r && a && f >= 0 && a.setHighlighted(f, "pointer");
      },
      onTouchStart: () => {
      },
      disabled: r,
      style: c,
      className: `w-full text-left flex items-center gap-2 rounded cursor-pointer ${r ? "opacity-40 cursor-default" : e === "danger" ? "ui-item ui-item-danger" : "ui-item"} ${i ? "ui-item-selected" : ""} ${p ? "ui-item-highlighted" : ""}`,
      children: [
        t,
        /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: s }),
        o && /* @__PURE__ */ h("span", { className: "shrink-0 ml-1 flex items-center", children: o })
      ]
    }
  );
}, fh = () => /* @__PURE__ */ h(ze.Separator, { className: "ui-sep my-1" }), hh = (n) => /* @__PURE__ */ h(Ic, { ...n, width: n.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), Ae = 8, is = "[data-modal-stack]", Gt = 220, Yn = "cubic-bezier(0.32, 0.72, 0, 1)", yr = 0.94;
function Cn() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function rn(n) {
  if (!n) return { top: 0, height: 0, bottom: 0 };
  const e = n.visualViewport, t = e ? e.offsetTop : 0, r = e ? e.height : n.innerHeight;
  return { top: t, height: r, bottom: t + r };
}
function ss(n, e) {
  return `translate(${e.left - n.left}px, ${e.top - n.top}px) scale(${e.width / n.width}, ${e.height / n.height})`;
}
function Zi(n, e, t, r) {
  const i = ++n.current, o = e.getBoundingClientRect();
  e.style.transition = "none", e.style.transform = ss(o, t), e.style.transformOrigin = "0 0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === i && (e.style.transition = `transform ${Gt}ms ${Yn}, opacity 180ms ease`, e.style.transform = "none", window.setTimeout(() => {
        n.current === i && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", r());
      }, Gt + 80));
    });
  });
}
function $c(n, e, t) {
  const r = ++n.current;
  e.style.transition = "none", e.style.transformOrigin = "center", e.style.transform = `scale(${yr})`, e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === r && (e.style.transition = `transform ${Gt}ms ${Yn}`, e.style.transform = "none", window.setTimeout(() => {
        n.current === r && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", t());
      }, Gt + 60));
    });
  });
}
function eo(n, e, t) {
  const r = ++n.current, i = e.getBoundingClientRect(), o = 1 - yr, s = { left: i.left + i.width * o / 2, top: i.top + i.height * o / 2, width: i.width * yr, height: i.height * yr };
  e.style.transition = `transform ${Gt}ms ${Yn}, opacity 170ms ease`, e.style.transformOrigin = "0 0", e.style.transform = ss(i, s), e.style.opacity = "0", window.setTimeout(() => {
    n.current === r && (e.style.visibility = "hidden", t(), requestAnimationFrame(() => {
      n.current !== r || e.isConnected || (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", e.style.opacity = "", e.style.visibility = "");
    }));
  }, Gt + 60);
}
function Vr(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(is) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function lr(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(is) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function zc({
  open: n,
  onClose: e,
  title: t,
  icon: r,
  width: i,
  footer: o,
  children: s,
  onReset: l,
  morph: c = !0,
  flat: a = !1,
  closable: u = !0,
  dismissOnBackdrop: d = !0,
  theme: f,
  surface: p,
  accent: m
}) {
  const g = Vt(), b = wi(
    { mode: f, accent: m, surface: p, context: "surface" },
    g
  ), y = b.mode, $ = b.surface, z = b.accent, N = k(null), w = k(null), A = k(null), L = Be(), O = B(20, 24, L), E = B(10, 12, L), q = B(12, 14, L), M = B(14, 16, L), I = B(20, 24, L), P = B(20, 24, L), Y = B(20, 24, L), U = B(14, 16, L), T = B(16, 20, L), v = B(10, 12, L), _ = B(12, 14, L), fe = B(8, 10, L), he = B(4, 6, L), te = { padding: `${E}px ${O}px` }, K = { fontSize: q }, ce = { padding: `${P}px ${I}px 16px ${I}px` }, ee = { fontSize: M }, ue = { padding: `0 ${I}px 16px` }, W = { padding: `${Y}px ${I}px` }, xe = { fontSize: v, padding: `${he}px ${fe}px` }, [ae, me] = ie(!1), J = Q((S) => {
    N.current = S, me(S !== null);
  }, []), F = Bn(), Le = tr(), pe = k(Le);
  pe.current = Le;
  const [Ue, qe] = ie(null), Z = k(null), Me = k(!1), oe = k(!1), Ie = k(0), je = k({ w: 0, h: 0 }), Ee = k(!1), [Ke, Ge] = ie(!1), [lt, Nt] = ie(!1), Tt = k(0), Te = k(!1), [xt, dt] = ie(!1), Dt = k(c);
  Dt.current = c;
  const ft = k(!1), ht = k(!1), pt = () => {
    ht.current = !0, Ge(!0);
  }, ct = () => {
    ht.current = !1, Ge(!1);
  };
  le(() => {
    n || (qe(null), Ee.current = !1, Me.current = !1, Nt(!1));
  }, [n]), mt(() => {
    if (!n || Ee.current || !ae || !N.current) return;
    Ee.current = !0;
    const S = N.current.getBoundingClientRect(), V = pe.current ?? null, X = (V == null ? void 0 : V.innerWidth) ?? 0, be = rn(V);
    qe({
      left: Math.max(Ae, Math.min((X - S.width) / 2, X - S.width - Ae)),
      top: Math.max(be.top + Ae, Math.min(be.top + (be.height - S.height) / 2, be.bottom - S.height - Ae))
    });
  }, [n, ae]), mt(() => {
    if (!n || !ae || !c || Cn() || !N.current) return;
    const S = N.current, V = Vr(S), X = V[V.length - 1];
    pt(), X ? Zi(Tt, S, X.getBoundingClientRect(), ct) : $c(Tt, S, ct);
  }, [n, ae]);
  const bt = Q(() => {
    if (!u || Te.current) return;
    const S = N.current, V = !!S && Vr(S).length > 0;
    if (!S || !c || Cn() || V) {
      e();
      return;
    }
    Te.current = !0, dt(!0), ft.current = !0, pt(), eo(Tt, S, () => {
      Te.current = !1, dt(!1), ct(), e();
    });
  }, [c, e, u]), Fe = Q(() => {
    const S = N.current;
    if (!S || ft.current || !Dt.current || Cn() || Vr(S).length > 0) return;
    const V = S.ownerDocument, X = S.cloneNode(!0);
    X.removeAttribute("data-modal-stack"), X.removeAttribute("data-state"), X.removeAttribute("role"), X.removeAttribute("data-aria-hidden"), X.removeAttribute("tabindex"), X.setAttribute("aria-hidden", "true"), X.style.pointerEvents = "none", V.body.appendChild(X), eo({ current: 0 }, X, () => {
      X.isConnected && X.remove();
    });
  }, []);
  mt(() => () => Fe(), [Fe]);
  const vt = k(n);
  mt(() => {
    const S = vt.current;
    vt.current = n, S && !n && Fe();
  }, [n, ae, Fe]), le(() => {
    if (!n || !ae || !c || !N.current) return;
    const S = N.current, V = S.parentNode;
    if (!V) return;
    let X = 0, be = null, ge = !1;
    const Re = () => {
      X = 0;
      const Pe = lr(S);
      if (Pe.length > 0)
        S.style.opacity = "", S.style.pointerEvents = "", be = Pe[Pe.length - 1].getBoundingClientRect(), ge = !0, X = requestAnimationFrame(Re);
      else if (ge) {
        ge = !1, be && !Cn() && (pt(), Zi(Tt, S, be, ct)), be = null;
        const Je = pe.current ?? null;
        Je == null || Je.setTimeout(() => {
          !S || !S.isConnected || getComputedStyle(S).opacity !== "1" && (S.style.opacity = "1", S.style.pointerEvents = "");
        }, 240);
      }
    }, ve = new MutationObserver(() => {
      !X && lr(S).length > 0 && (X = requestAnimationFrame(Re));
    });
    return ve.observe(V, { childList: !0 }), () => {
      ve.disconnect(), X && cancelAnimationFrame(X);
    };
  }, [n, ae]), le(() => {
    if (!ae || !c || Cn() || !N.current) return;
    const S = N.current;
    let V = Math.round(S.getBoundingClientRect().height), X = !1;
    const be = new ResizeObserver(() => {
      if (!S.isConnected) return;
      const ge = Math.round(S.getBoundingClientRect().height);
      if (!X) {
        X = !0, V = ge;
        return;
      }
      if (Math.abs(ge - V) < 1) return;
      if (Z.current || Te.current || lr(S).length > 0) {
        V = ge;
        return;
      }
      if (ht.current) return;
      const Re = V;
      V = ge, pt();
      const ve = S.getBoundingClientRect(), Pe = rn(pe.current ?? null), Je = !Me.current && !oe.current, qt = Je ? Pe.top + (Pe.height - Re) / 2 : ve.top, we = Je ? Pe.top + (Pe.height - ge) / 2 : ve.top;
      S.style.transition = "none", S.style.height = `${Re}px`, Je && (S.style.top = `${qt}px`), w.current && (w.current.style.overflow = "hidden"), S.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          S.style.height === `${Re}px` && (S.style.transition = `height ${Gt}ms ${Yn}${Je ? `, top ${Gt}ms ${Yn}` : ""}`, S.style.height = `${ge}px`, Je && (S.style.top = `${we}px`), window.setTimeout(() => {
            S.style.height === `${ge}px` && (S.style.transition = "", S.style.height = "", w.current && (w.current.style.overflow = ""), Je && qe({ left: ve.left, top: we }), ct());
          }, Gt + 60));
        });
      });
    });
    return be.observe(S), () => be.disconnect();
  }, [ae]), le(() => {
    if (!ae || !N.current || c && !Cn()) return;
    const S = N.current, V = new ResizeObserver(() => {
      if (!S.isConnected || Z.current || Te.current || oe.current || lr(S).length > 0) return;
      const X = pe.current ?? null, be = rn(X), ge = (X == null ? void 0 : X.innerWidth) ?? 0, Re = S.getBoundingClientRect(), ve = Math.max(be.top + Ae, Math.min(Re.top, be.bottom - Re.height - Ae)), Pe = Math.max(Ae, Math.min(Re.left, ge - Re.width - Ae));
      (Math.abs(ve - Re.top) > 0.5 || Math.abs(Pe - Re.left) > 0.5) && qe({ left: Pe, top: ve });
    });
    return V.observe(S), () => V.disconnect();
  }, [ae, c]);
  const We = Q(() => {
    const S = N.current;
    if (!S) return null;
    const V = S.getBoundingClientRect();
    return { left: V.left, top: V.top, width: V.width, height: V.height };
  }, []), Ne = Q((S, V) => {
    const X = pe.current ?? null, be = (X == null ? void 0 : X.innerWidth) ?? 0, ge = rn(X), Re = We(), ve = Re ? Re.width : Math.min(be - Ae * 2, 576), Pe = Re ? Re.height : Math.min(ge.height - Ae * 2, 400);
    return {
      left: Math.max(Ae, Math.min(S, be - ve - Ae)),
      top: Math.max(ge.top + Ae, Math.min(V, ge.bottom - Pe - Ae))
    };
  }, [We]);
  le(() => {
    if (!n) return;
    const S = pe.current ?? null, V = (S == null ? void 0 : S.visualViewport) ?? null;
    if (!S || !V) return;
    const X = 120;
    oe.current = !1, je.current = { w: S.innerWidth, h: S.innerHeight };
    let be = 0;
    const ge = () => {
      if (Te.current || Z.current) return;
      const ve = (S == null ? void 0 : S.innerHeight) ?? 0, Pe = (S == null ? void 0 : S.innerWidth) ?? 0, qt = rn(S).height < ve - X, we = ve < je.current.h - X && Pe === je.current.w;
      qt || we ? (oe.current = !0, Ie.current && (clearTimeout(Ie.current), Ie.current = 0)) : Ie.current || (Ie.current = (S == null ? void 0 : S.setTimeout(() => {
        oe.current = !1, Ie.current = 0, Nt(!1);
      }, 600)) ?? 0), Nt(oe.current), !be && (be = requestAnimationFrame(() => {
        var Bt;
        be = 0;
        const tn = N.current;
        if (!tn) return;
        const Pt = rn(pe.current ?? null), $e = tn.getBoundingClientRect(), Lt = ((Bt = pe.current) == null ? void 0 : Bt.innerWidth) ?? 0, At = (S == null ? void 0 : S.innerHeight) ?? 0, St = Pt.height < At - X || At < je.current.h - X && (S == null ? void 0 : S.innerWidth) === je.current.w;
        je.current = { w: (S == null ? void 0 : S.innerWidth) ?? 0, h: At };
        const Xe = $e.top >= Pt.top + Ae && $e.bottom <= Pt.bottom - Ae, Kt = () => {
          qe({
            left: Math.max(Ae, Math.min((Lt - $e.width) / 2, Lt - $e.width - Ae)),
            top: Math.max(Pt.top + Ae, Math.min(Pt.top + (Pt.height - $e.height) / 2, Pt.bottom - $e.height - Ae))
          });
        };
        if (St && !Ze) {
          if (Me.current) {
            Xe || qe(Ne($e.left, $e.top));
            return;
          }
          if (Xe) return;
          Kt();
          return;
        }
        if (!oe.current) {
          if (Me.current) {
            Xe || qe(Ne($e.left, $e.top));
            return;
          }
          Xe || Kt();
        }
      }));
    };
    V.addEventListener("resize", ge), V.addEventListener("scroll", ge);
    const Re = () => {
      Te.current || Z.current || be || (be = requestAnimationFrame(() => {
        be = 0;
        const ve = N.current;
        if (!ve) return;
        const Pe = pe.current ?? null, Je = rn(Pe), qt = (Pe == null ? void 0 : Pe.innerWidth) ?? 0, we = ve.getBoundingClientRect();
        if (Me.current) {
          qe(Ne(we.left, we.top));
          return;
        }
        qe({
          left: Math.max(Ae, Math.min((qt - we.width) / 2, qt - we.width - Ae)),
          top: Math.max(Je.top + Ae, Math.min(Je.top + (Je.height - we.height) / 2, Je.bottom - we.height - Ae))
        });
      }));
    };
    return S.addEventListener("orientationchange", Re), () => {
      V.removeEventListener("resize", ge), V.removeEventListener("scroll", ge), S.removeEventListener("orientationchange", Re), be && cancelAnimationFrame(be), Ie.current && clearTimeout(Ie.current);
    };
  }, [n, Ne]);
  const Wt = Q((S) => {
    if (S.target.closest("button")) return;
    Me.current = !0;
    const V = We();
    V && (qe(Ne(V.left, V.top)), Z.current = { startX: S.clientX, startY: S.clientY, posX: V.left, posY: V.top }, S.target.setPointerCapture(S.pointerId));
  }, [We, Ne]), Ot = Q((S) => {
    const V = Z.current;
    V && (S.preventDefault(), qe(Ne(V.posX + S.clientX - V.startX, V.posY + S.clientY - V.startY)));
  }, [Ne]), ot = Q(() => {
    Z.current = null;
  }, []), at = Z.current !== null, Yt = Q(() => {
    Me.current = !1;
    const S = pe.current ?? null, V = rn(S), X = (S == null ? void 0 : S.innerWidth) ?? 0, be = N.current, ge = be ? be.getBoundingClientRect() : { width: 0, height: 0 };
    qe({
      left: Math.max(Ae, Math.min((X - ge.width) / 2, X - ge.width - Ae)),
      top: Math.max(V.top + Ae, Math.min(V.top + (V.height - ge.height) / 2, V.bottom - ge.height - Ae))
    });
  }, []), R = k(0), G = Q(() => {
    const S = Date.now();
    S - R.current < 300 ? (R.current = 0, Yt()) : R.current = S;
  }, [Yt]), se = Ue !== null, ye = se ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", De = `${i ? `${i} w-full` : "max-w-xl w-full"}`, wt = {
    ...se ? { left: Ue.left, top: Ue.top } : {},
    width: `min(100%, calc(100dvw - ${Ae * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...lt ? {} : { maxHeight: `calc(100dvh - ${Ae * 2}px)` }
  }, kt = Q((S) => {
    if (S.key !== "Enter" || S.shiftKey || S.metaKey || S.ctrlKey || S.altKey) return;
    const V = S.target, X = A.current;
    if (!(!!V.closest("[data-modal-close]") || !!X && X.contains(V) && !!V.closest('button, a, [role="button"]')) && V.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !X) return;
    const ge = Array.from(X.querySelectorAll("button[data-modal-confirm]")), Re = ge.length > 0 ? ge : Array.from(X.querySelectorAll("button")), ve = Re[Re.length - 1];
    !ve || ve.disabled || (S.preventDefault(), ve.click());
  }, []);
  return /* @__PURE__ */ h(ki, { theme: b, children: /* @__PURE__ */ h(nn.Root, { open: n, onOpenChange: (S) => {
    S || bt();
  }, children: /* @__PURE__ */ C(nn.Portal, { container: F ?? void 0, children: [
    /* @__PURE__ */ h(
      nn.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${xt ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (S) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (S.preventDefault(), d && bt());
        }
      }
    ),
    /* @__PURE__ */ C(
      nn.Content,
      {
        ref: J,
        onKeyDown: kt,
        onInteractOutside: (S) => {
          d || S.preventDefault();
        },
        "data-modal-stack": !0,
        "data-mode": y,
        "data-accent": z,
        "data-surface": $,
        className: `ui-modal fixed z-[10000] bg-[var(--ui-modal-bg)] border border-[color:var(--ui-modal-border)] rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${ye} ${De}`,
        style: { touchAction: "manipulation", colorScheme: y, ...Object.keys(wt).length > 0 ? wt : {} },
        children: [
          a ? /* @__PURE__ */ C(
            "div",
            {
              style: ce,
              className: `flex items-center justify-between ${at ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (S) => {
                Ke || Wt(S);
              },
              onPointerMove: Ot,
              onPointerUp: ot,
              onClick: G,
              children: [
                /* @__PURE__ */ h(nn.Title, { style: ee, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t }),
                u && /* @__PURE__ */ h(nn.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ h(yn, { style: { width: T, height: T } }) })
              ]
            }
          ) : /* @__PURE__ */ C(
            "div",
            {
              style: te,
              className: `ui-modal-header flex items-center justify-between border-b border-[color:var(--ui-modal-header-border)] shrink-0 bg-[var(--ui-modal-header-bg)] ${at ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (S) => {
                Ke || Wt(S);
              },
              onPointerMove: Ot,
              onPointerUp: ot,
              onClick: G,
              children: [
                /* @__PURE__ */ C("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ h("span", { className: "text-[color:var(--ui-modal-icon)] shrink-0", children: r }),
                  /* @__PURE__ */ h(nn.Title, { style: K, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t })
                ] }),
                /* @__PURE__ */ C("div", { className: "flex items-center gap-2", children: [
                  l && /* @__PURE__ */ C("button", { onClick: l, style: xe, className: "cursor-pointer flex items-center gap-1 text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-muted-hover)] transition-colors bg-[var(--ui-modal-control-bg)] hover:bg-[var(--ui-modal-control-hover-bg)] rounded shrink-0", children: [
                    /* @__PURE__ */ h($o, { style: { width: _, height: _ } }),
                    "Reset"
                  ] }),
                  u && /* @__PURE__ */ h(nn.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ h(yn, { style: { width: U, height: U } }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ h("div", { ref: w, "data-testid": "modal-body", style: a ? ue : void 0, className: "overflow-y-auto flex-1 bg-[var(--ui-modal-body-bg)] text-[color:var(--ui-modal-body-text)]", children: s }),
          o && /* @__PURE__ */ h("div", { ref: A, style: a ? W : void 0, className: a ? "" : "shrink-0", children: a ? /* @__PURE__ */ h("div", { className: "flex items-center justify-end gap-2", children: o }) : o })
        ]
      }
    )
  ] }) }) });
}
function ph({ children: n }) {
  const e = Be(), t = B(20, 24, e), r = B(8, 12, e);
  return /* @__PURE__ */ h("div", { className: "flex items-center justify-end gap-3 border-t border-[color:var(--ui-modal-border)] bg-[var(--ui-modal-footer-bg)]", style: { padding: `${r}px ${t}px` }, children: n });
}
const Dc = "inline-flex items-center gap-2 rounded-lg text-xs transition cursor-pointer select-none whitespace-nowrap active:shadow-[inset_0_0_0_2px_var(--ui-panel-bg)]", Oc = {
  zinc: "bg-[var(--ui-footer-hero-bg)] text-[color:var(--ui-footer-hero-text)] font-semibold border border-[color:var(--ui-footer-hero-border)] hover:bg-[var(--ui-footer-hero-hover-bg)] hover:border-[color:var(--ui-footer-hero-hover-border)] disabled:opacity-40 disabled:cursor-not-allowed",
  accent: "bg-[var(--ui-accent-solid)] text-[color:var(--ui-accent-action-text)] font-semibold border border-transparent hover:bg-[var(--ui-accent-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed",
  danger: "bg-[var(--ui-danger-solid)] text-white font-semibold border border-[color:var(--ui-danger-solid)] hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
}, Pc = {
  /* Transparent border on every variant — auto-height buttons add the border
     to their height, so the bordered hero would otherwise be 2px taller. */
  ghost: "border border-transparent text-[color:var(--ui-text-muted)] font-medium hover:bg-[var(--ui-footer-ghost-hover-bg)] hover:text-[color:var(--ui-text-strong)] disabled:opacity-50",
  danger: "border border-transparent text-[color:var(--ui-danger-text)] font-medium hover:bg-[var(--ui-danger-hover-bg)] hover:text-[color:var(--ui-danger-hover-text)] disabled:opacity-50",
  "danger-solid": "border border-transparent bg-[var(--ui-danger-solid)] text-white font-semibold hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
};
function cr({
  variant: n = "hero",
  tone: e = "zinc",
  className: t = "",
  type: r = "button",
  ...i
}) {
  const o = cn({ px: 24, py: 8, fs: 12 }, { px: 28, py: 10, fs: 14 });
  return /* @__PURE__ */ h(
    "button",
    {
      type: r,
      style: o,
      className: `${Dc} ${n === "hero" ? Oc[e] : Pc[n]} ${t}`,
      ...i
    }
  );
}
function qn(n = "md") {
  const e = Ze && Po() > 0;
  return n === "sm" ? `${e ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"} ui-input` : `${e ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs"} ui-input`;
}
function ls(n = "md") {
  return n === "sm" ? cn({ px: 8, py: 6, fs: 12 }, { px: 12, py: 8, fs: 14 }) : cn({ px: 10, py: 5, fs: 12 }, { px: 14, py: 9, fs: 14 });
}
const cs = Qt(null);
function mh() {
  const n = Zt(cs);
  if (!n) throw new Error("useDialog must be used within DialogProvider");
  return n;
}
function gh({ children: n, theme: e, accent: t, surface: r }) {
  const [i, o] = ie(null), [s, l] = ie(!1), c = k(null), a = Be(), u = B(16, 20, a), d = B(12, 14, a), f = ls(), p = k(i);
  p.current = i;
  const m = Q(() => {
    const w = p.current;
    w && (w.kind === "confirm" ? w.resolve(!1) : w.kind === "prompt" ? w.resolve(null) : w.resolve());
  }, []), g = Q((w) => {
    if (w.suppressKey) {
      const A = localStorage.getItem(w.suppressKey);
      if (A && Date.now() < parseInt(A, 10))
        return Promise.resolve(!0);
    }
    return new Promise((A) => {
      m(), l(!1), o({ kind: "confirm", options: w, resolve: A });
    });
  }, [m]), b = Q((w) => new Promise((A) => {
    m(), o({ kind: "prompt", options: w, resolve: A });
  }), [m]), y = Q((w) => new Promise((A) => {
    m(), o({ kind: "alert", options: w, resolve: A });
  }), [m]);
  le(() => {
    if (i) {
      const w = setTimeout(() => {
        var A;
        return (A = c.current) == null ? void 0 : A.focus();
      }, 50);
      return () => clearTimeout(w);
    }
  }, [i]);
  const $ = Q(() => {
    var w, A;
    if (i) {
      if (i.kind === "confirm") {
        const L = i.options;
        L.suppressKey && s && localStorage.setItem(L.suppressKey, String(Date.now() + 864e5)), i.resolve(!0);
      } else i.kind === "prompt" ? i.resolve(((A = (w = c.current) == null ? void 0 : w.value) == null ? void 0 : A.trim()) || null) : i.resolve();
      o(null);
    }
  }, [i, s]), z = i !== null;
  le(() => {
    if (!z) return;
    const w = (A) => {
      A.key !== "Enter" || A.shiftKey || A.metaKey || A.ctrlKey || A.altKey || A.isComposing || (A.preventDefault(), A.stopImmediatePropagation(), $());
    };
    return document.addEventListener("keydown", w, !0), () => document.removeEventListener("keydown", w, !0);
  }, [z, $]);
  const N = Q(() => {
    i && (i.kind === "confirm" ? i.resolve(!1) : i.kind === "prompt" ? i.resolve(null) : i.resolve(), o(null));
  }, [i]);
  return /* @__PURE__ */ C(cs.Provider, { value: { confirm: g, prompt: b, alert: y }, children: [
    n,
    z && /* @__PURE__ */ h(
      zc,
      {
        open: !0,
        onClose: N,
        closable: (i == null ? void 0 : i.kind) !== "alert",
        dismissOnBackdrop: (i == null ? void 0 : i.kind) !== "alert",
        title: (i == null ? void 0 : i.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: i && /* @__PURE__ */ C(Qe, { children: [
          i.kind !== "alert" && /* @__PURE__ */ h(cr, { variant: "ghost", onClick: N, children: "Cancel" }),
          i.kind === "alert" ? /* @__PURE__ */ h(cr, { onClick: $, children: "OK" }) : i.kind === "confirm" ? /* @__PURE__ */ h(
            cr,
            {
              "data-modal-confirm": !0,
              variant: i.options.danger ? "danger-solid" : "hero",
              onClick: $,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ h(cr, { "data-modal-confirm": !0, onClick: $, children: "Save" })
        ] }),
        children: /* @__PURE__ */ C("div", { className: "flex flex-col", style: { gap: u }, children: [
          (i == null ? void 0 : i.options.message) && /* @__PURE__ */ h("p", { style: { fontSize: d }, className: "text-[color:var(--ui-text-muted)] leading-relaxed", children: i.options.message }),
          (i == null ? void 0 : i.kind) === "confirm" && i.options.suppressKey && /* @__PURE__ */ h(
            vc,
            {
              block: !0,
              checked: s,
              onChange: l,
              tone: "danger",
              label: "Don't ask again (24 hours)"
            }
          ),
          (i == null ? void 0 : i.kind) === "prompt" && /* @__PURE__ */ h(
            "input",
            {
              ref: c,
              type: "text",
              defaultValue: i.options.defaultValue || "",
              placeholder: i.options.placeholder,
              style: f,
              className: "w-full ui-input"
            }
          )
        ] })
      }
    )
  ] });
}
const Lc = 500, Bc = 250, Fc = 5, It = 88, to = 4;
function Hc(n, e) {
  const t = n.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  t.style.strokeDasharray = String(r), t.style.strokeDashoffset = String(r);
  const i = performance.now(), o = (s) => {
    const l = s - i, c = Math.min(l / e, 1);
    t.style.strokeDashoffset = String(r * (1 - c)), c < 1 && requestAnimationFrame(o);
  };
  requestAnimationFrame(o);
}
function _c({ x: n, y: e, ms: t }) {
  const r = k(null), i = Bn();
  return le(() => {
    r.current && Hc(r.current, t);
  }, [t]), zr(
    /* @__PURE__ */ h(
      "div",
      {
        style: {
          position: "fixed",
          left: n - It / 2,
          top: e - It / 2,
          width: It,
          height: It,
          zIndex: 99999,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ C("svg", { ref: r, width: It, height: It, viewBox: `0 0 ${It} ${It}`, children: [
          /* @__PURE__ */ h(
            "circle",
            {
              cx: It / 2,
              cy: It / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: to + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ h(
            "circle",
            {
              cx: It / 2,
              cy: It / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: to,
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
function yh() {
  return { "data-no-longpress": "true" };
}
function jc(n) {
  const e = n.tagName;
  return !!(e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || e === "BUTTON" || n.isContentEditable || n.closest("[data-no-longpress]") || n.closest("button, input, select, textarea"));
}
function xh({
  children: n,
  showRing: e = !0,
  longPressMs: t = Lc,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: i,
  onLongPress: o
}) {
  const [s, l] = ie(null), c = yi(), a = k(null), u = k(null), d = k({ x: 0, y: 0, target: null }), f = k(!1), p = Math.min(Bc, t * 0.5), m = k(i);
  m.current = i;
  const g = k(o);
  return g.current = o, le(() => {
    if (!Ze || !c) return;
    const b = (N) => {
      if (!oi(N.pointerType) || N.button !== 0) return;
      const w = N.target;
      if (!w.closest(r) || (m.current ? !m.current(w) : jc(w))) return;
      const A = N.clientX, L = N.clientY;
      d.current = { x: A, y: L, target: N.target }, f.current = !0, e && (u.current = setTimeout(() => l({ x: A, y: L }), p)), a.current = setTimeout(() => {
        if (!f.current) return;
        u.current && (clearTimeout(u.current), u.current = null), l(null);
        const O = d.current.target;
        if (!O) return;
        const E = g.current;
        if (E) {
          E(O, A, L);
          return;
        }
        const q = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: A,
          clientY: L,
          button: 2,
          view: window
        });
        O.dispatchEvent(q);
      }, t);
    }, y = (N) => {
      if (!f.current || a.current === null) return;
      const w = N.clientX - d.current.x, A = N.clientY - d.current.y;
      Math.sqrt(w * w + A * A) > Fc && (clearTimeout(a.current), a.current = null, u.current && (clearTimeout(u.current), u.current = null), f.current = !1, l(null));
    }, $ = () => {
      a.current !== null && (clearTimeout(a.current), a.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, l(null);
    }, z = (N) => {
      oi(N.pointerType) && (a.current !== null && (clearTimeout(a.current), a.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, l(null));
    };
    return c == null || c.addEventListener("pointerdown", b), c.addEventListener("pointermove", y), c.addEventListener("pointerup", $), c.addEventListener("pointercancel", $), c.addEventListener("pointerleave", z), () => {
      c.removeEventListener("pointerdown", b), c.removeEventListener("pointermove", y), c.removeEventListener("pointerup", $), c == null || c.removeEventListener("pointercancel", $), c == null || c.removeEventListener("pointerleave", z), a.current !== null && clearTimeout(a.current), u.current !== null && clearTimeout(u.current);
    };
  }, [e, t, p, r]), /* @__PURE__ */ C(Qe, { children: [
    n,
    e && s && /* @__PURE__ */ h(_c, { x: s.x, y: s.y, ms: t - p })
  ] });
}
function bh() {
  const n = lc();
  return sc ? n === null || oi(n) : !1;
}
const Wc = {
  border: "1px solid #d4d4d8",
  background: "rgba(255,255,255,0.94)",
  color: "#52525b",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
}, qc = {
  border: "2px solid #2563eb",
  background: "#2563eb",
  color: "#fff",
  boxShadow: "0 4px 16px rgba(37,99,235,0.4)"
}, Kc = {
  border: "1px solid #f59e0b",
  background: "rgba(255, 251, 235, 0.94)",
  color: "#b45309",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
};
function vh({
  active: n = !1,
  warn: e = !1,
  style: t,
  className: r = "",
  type: i = "button",
  children: o,
  ...s
}) {
  return /* @__PURE__ */ h(
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
        ...e ? Kc : n ? qc : Wc,
        ...t
      },
      ...s,
      children: o
    }
  );
}
const Jc = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Vc = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Yr = 1900, Ur = 2100;
function Yc(n, e) {
  return new Date(n, e + 1, 0).getDate();
}
function Uc(n, e, t) {
  return `${n}-${String(e + 1).padStart(2, "0")}-${String(t).padStart(2, "0")}`;
}
function wh({ selected: n, onChange: e, theme: t, showChips: r = !0, className: i = "", initialView: o }) {
  const s = Vt(), l = t ?? (s == null ? void 0 : s.mode) ?? "light", c = /* @__PURE__ */ new Date(), a = (() => {
    if (!o) return c;
    const J = /* @__PURE__ */ new Date(o + "T00:00:00");
    return isNaN(J.getTime()) ? c : J;
  })(), [u, d] = ie(a.getFullYear()), [f, p] = ie(a.getMonth()), [m, g] = ie("days"), [b, y] = ie(null), $ = Ve(() => new Set(n), [n]), z = (J) => {
    $.has(J) ? e(n.filter((F) => F !== J)) : e([...n, J]);
  }, N = Ve(() => {
    const J = Yc(u, f), F = new Date(u, f, 1).getDay(), Le = [];
    for (let pe = 0; pe < F; pe++) Le.push({ key: `pad-${pe}`, day: 0, empty: !0 });
    for (let pe = 1; pe <= J; pe++) Le.push({ key: Uc(u, f, pe), day: pe, empty: !1 });
    return Le;
  }, [u, f]), w = (J) => d((F) => Math.max(Yr, Math.min(Ur, F + J))), A = (J) => {
    f + J < 0 ? (d((F) => Math.max(Yr, F - 1)), p(11)) : f + J > 11 ? (d((F) => Math.min(Ur, F + 1)), p(0)) : p((F) => F + J);
  }, L = () => {
    if (b === null) return;
    const J = parseInt(b, 10);
    !isNaN(J) && J >= Yr && J <= Ur && d(J), y(null);
  }, O = (J) => n.some((F) => F.startsWith(`${u}-${String(J + 1).padStart(2, "0")}`)), E = Be(), q = B(4, 8, E), M = B(16, 20, E), I = B(10, 11, E), P = B(6, 8, E), Y = B(12, 14, E), U = B(6, 10, E), T = B(12, 14, E), v = B(8, 12, E), _ = B(10, 12, E), fe = B(6, 10, E), he = B(2, 6, E), te = B(64, 80, E), K = { padding: q }, ce = { width: M, height: M }, ee = { fontSize: I, paddingTop: P, paddingBottom: P }, ue = { fontSize: Y, paddingTop: U, paddingBottom: U }, W = { fontSize: T, paddingTop: v, paddingBottom: v }, xe = { fontSize: _, padding: `${he}px ${fe}px` }, ae = "bg-[var(--ui-date-selected-bg)] text-[color:var(--ui-date-selected-text)] hover:bg-[var(--ui-date-selected-hover-bg)]", me = "text-[color:var(--ui-text)] hover:bg-[var(--ui-card-hover)]";
  return /* @__PURE__ */ C("div", { "data-mode": l, "data-accent": s == null ? void 0 : s.accent, "data-surface": s == null ? void 0 : s.surface, className: `border rounded-lg overflow-hidden w-full border-[color:var(--ui-border-strong)] bg-[var(--ui-date-body-bg)] text-[color:var(--ui-text)] ${i}`, children: [
    /* @__PURE__ */ C("div", { className: "flex items-center justify-between px-3 py-2 border-b bg-[var(--ui-date-header-bg)] text-[color:var(--ui-date-header-text)] border-[color:var(--ui-border)]", children: [
      /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => m === "months" ? w(-1) : A(-1),
          style: K,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": m === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ h(Ml, { style: ce })
        }
      ),
      m === "days" ? /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => g("months"),
          "aria-label": "Select year and month",
          className: "text-sm font-semibold rounded px-2 py-0.5 transition-colors text-[color:var(--ui-date-header-text)] hover:bg-[var(--ui-date-header-hover)]",
          children: new Date(u, f).toLocaleString("default", { month: "long", year: "numeric" })
        }
      ) : /* @__PURE__ */ h(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          "aria-label": "Year",
          value: b ?? String(u),
          onChange: (J) => y(J.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: (J) => J.target.select(),
          onBlur: L,
          onKeyDown: (J) => {
            J.key === "Enter" && (J.preventDefault(), L()), J.key === "Escape" && y(null);
          },
          style: { width: te },
          className: "text-sm text-center font-semibold rounded outline-none py-0.5 bg-[var(--ui-date-header-hover)] text-[color:var(--ui-date-header-text)]"
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => m === "months" ? w(1) : A(1),
          style: K,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": m === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ h(wr, { style: ce })
        }
      )
    ] }),
    m === "months" ? /* @__PURE__ */ C("div", { children: [
      /* @__PURE__ */ h("div", { className: "grid grid-cols-3 text-center", children: Vc.map((J, F) => /* @__PURE__ */ C(
        "button",
        {
          type: "button",
          onClick: () => {
            p(F), g("days");
          },
          style: W,
          className: `relative font-medium transition-colors border-b border-[color:var(--ui-border)] ${F === f ? ae : me}`,
          children: [
            J,
            O(F) && /* @__PURE__ */ h("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${F === f ? "bg-[var(--ui-date-selected-text)]" : "bg-[var(--ui-accent-solid)]"}` })
          ]
        },
        J
      )) }),
      /* @__PURE__ */ h("div", { className: "text-center border-t border-[color:var(--ui-border)]", children: /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => {
            d(c.getFullYear()), p(c.getMonth()), g("days");
          },
          style: { paddingTop: U, paddingBottom: U, fontSize: Y },
          className: "px-3 font-semibold rounded transition-colors text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-card-hover)]",
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ C("div", { className: "grid grid-cols-7 text-center", children: [
      Jc.map((J) => /* @__PURE__ */ h("div", { style: ee, className: "font-semibold uppercase tracking-wider border-b text-[color:var(--ui-text-faint)] border-[color:var(--ui-border)]", children: J }, J)),
      N.map((J) => J.empty ? /* @__PURE__ */ h("div", {}, J.key) : /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => z(J.key),
          style: ue,
          className: `font-medium transition-colors border-b border-[color:var(--ui-border)] ${$.has(J.key) ? ae : me}`,
          children: J.day
        },
        J.key
      ))
    ] }),
    r && n.length > 0 && /* @__PURE__ */ C("div", { className: "px-3 py-2 border-t border-[color:var(--ui-border)] bg-[var(--ui-date-footer-bg)]", children: [
      /* @__PURE__ */ C("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-[color:var(--ui-text-muted)]", children: [
        n.length,
        " date",
        n.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ h("div", { className: "flex flex-wrap gap-1", children: n.map((J) => {
        const F = /* @__PURE__ */ new Date(J + "T00:00:00"), Le = F.getFullYear() === c.getFullYear() ? F.toLocaleString("default", { month: "short", day: "numeric" }) : F.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ C(
          "button",
          {
            type: "button",
            onClick: () => z(J),
            "aria-label": `Remove ${Le}`,
            style: xe,
            className: "inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors bg-[var(--ui-date-chip-bg)] text-[color:var(--ui-date-chip-text)] hover:bg-[var(--ui-date-chip-hover-bg)]",
            children: [
              Le,
              /* @__PURE__ */ h("span", { className: "leading-none text-[color:var(--ui-text-muted)]", "aria-hidden": "true", children: "×" })
            ]
          },
          J
        );
      }) })
    ] })
  ] });
}
function kh({
  items: n,
  selected: e,
  onToggle: t,
  title: r,
  onToggleAll: i,
  allSelected: o = !1,
  toggleAllLabel: s,
  emptyHint: l = "Nothing here",
  maxHeight: c,
  disabled: a = !1,
  checkPosition: u = "leading",
  theme: d,
  className: f = ""
}) {
  const p = (N) => e instanceof Set ? e.has(N) : e.includes(N), m = Be(), g = B(12, 16, m), b = B(8, 12, m), y = B(12, 14, m), $ = B(16, 20, m), z = r != null || i != null;
  return /* @__PURE__ */ C("div", { className: f, ...d ? { "data-theme": d } : {}, children: [
    z && /* @__PURE__ */ C("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ h("span", { className: "ui-checklist-title", children: r }),
      i != null && /* @__PURE__ */ h("button", { type: "button", disabled: a, onClick: i, className: "ui-checklist-toggleall", children: s ?? (o ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ C(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${a ? "ui-checklist-disabled" : ""}`,
        style: c ? { maxHeight: c, overflowY: "auto" } : void 0,
        children: [
          n.map((N) => {
            const w = p(N.id), A = /* @__PURE__ */ h(Si, { checked: w, size: $ });
            return /* @__PURE__ */ C(
              "button",
              {
                type: "button",
                disabled: a,
                onClick: () => t(N.id),
                "aria-pressed": w,
                className: `ui-checklist-item ${w ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${b}px ${g}px`, fontSize: y },
                ...N.dataProps,
                children: [
                  u === "leading" && A,
                  N.leading != null && /* @__PURE__ */ h("span", { className: "ui-checklist-leading", children: N.leading }),
                  /* @__PURE__ */ h("span", { className: "ui-checklist-label", children: N.label }),
                  N.secondary != null && /* @__PURE__ */ h("span", { className: "ui-checklist-secondary", children: N.secondary }),
                  u === "trailing" && /* @__PURE__ */ h("span", { className: "ml-auto flex shrink-0", children: A })
                ]
              },
              N.id
            );
          }),
          n.length === 0 && /* @__PURE__ */ h("div", { className: "ui-checklist-empty", children: l })
        ]
      }
    )
  ] });
}
function Sh({
  items: n,
  value: e,
  onChange: t,
  title: r,
  emptyHint: i = "Nothing here",
  maxHeight: o,
  compact: s = !1,
  disabled: l = !1,
  theme: c,
  className: a = ""
}) {
  const u = Be(), d = s ? 10 : B(12, 16, u), f = s ? 6 : B(8, 12, u), p = s ? 12 : B(12, 14, u), m = s ? 14 : B(16, 20, u);
  return /* @__PURE__ */ C("div", { className: a, ...c ? { "data-theme": c } : {}, children: [
    r != null && /* @__PURE__ */ h("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ h("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ C(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${l ? "ui-checklist-disabled" : ""}`,
        style: o ? { maxHeight: o, overflowY: "auto" } : void 0,
        children: [
          n.map((g) => {
            const b = e === g.id;
            return /* @__PURE__ */ C(
              "button",
              {
                type: "button",
                disabled: l,
                onClick: () => t(g.id),
                className: `ui-checklist-item ${b ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${f}px ${d}px`, fontSize: p },
                children: [
                  /* @__PURE__ */ h("span", { className: "ui-radio-circle", style: { width: m, height: m }, "aria-hidden": !0, children: b && /* @__PURE__ */ h("span", { className: "ui-radio-dot" }) }),
                  g.leading != null && /* @__PURE__ */ h("span", { className: "ui-checklist-leading", children: g.leading }),
                  /* @__PURE__ */ h("span", { className: "ui-checklist-label", children: g.label }),
                  g.secondary != null && /* @__PURE__ */ h("span", { className: "ui-checklist-secondary", children: g.secondary })
                ]
              },
              g.id
            );
          }),
          n.length === 0 && /* @__PURE__ */ h("div", { className: "ui-checklist-empty", children: i })
        ]
      }
    )
  ] });
}
const Nh = ({
  className: n,
  children: e,
  reference: t,
  placement: r = "top",
  anchorMode: i = "visible",
  offset: o = 8
}) => {
  const s = tr(), { refs: l, floatingStyles: c } = Fl({
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
        fn: (a) => {
          var $;
          if (i !== "visible") return {};
          const u = ($ = a.elements.floating.ownerDocument) == null ? void 0 : $.defaultView;
          if (!u) return {};
          const d = a.rects.reference, f = Math.max(d.x, 0), p = Math.max(d.y, 0), m = Math.min(d.x + d.width, u.innerWidth), g = Math.min(d.y + d.height, u.innerHeight);
          if (m <= f || g <= p) return {};
          const b = r === "left" ? m - (d.x + d.width) : r === "right" ? f - d.x : 0, y = r === "top" ? p - d.y : r === "bottom" ? g - (d.y + d.height) : 0;
          return { x: a.x + b, y: a.y + y };
        }
      },
      zo(o),
      Do({ padding: 8 }),
      Oo({ padding: 8 }),
      // Final hard clamp into the viewport. Floating UI's shift measures the
      // panel's *current* DOM rect (one update behind), so a large scroll jump
      // can leave it off-screen next to a scrolled-out reference — this clamp
      // uses the freshly computed coords + measured size and always wins.
      {
        name: "viewportClamp",
        fn: (a) => {
          var g;
          const u = (g = a.elements.floating.ownerDocument) == null ? void 0 : g.defaultView;
          if (!u) return {};
          const d = a.rects.floating.width, f = a.rects.floating.height, p = Math.max(8, Math.min(a.x, u.innerWidth - d - 8)), m = Math.max(8, Math.min(a.y, u.innerHeight - f - 8));
          return { x: p, y: m };
        }
      }
    ],
    whileElementsMounted: Hl
  });
  return mt(() => {
    t && l.setReference(t);
  }, [t, l]), /* @__PURE__ */ C(Qe, { children: [
    !t && /* @__PURE__ */ h("div", { ref: l.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    s && zr(
      /* @__PURE__ */ h(
        "div",
        {
          ref: l.setFloating,
          className: `ui-chrome ${n}`,
          style: c,
          onMouseDown: (a) => a.stopPropagation(),
          onClick: (a) => a.stopPropagation(),
          onDragStart: (a) => a.preventDefault(),
          children: e
        }
      ),
      s.document.body
    )
  ] });
};
function Gc(n, e) {
  if (!e || !et.isValidElement(n)) return {};
  const t = n.props;
  if (t["aria-label"] || t.title) return {};
  const r = t.children;
  if (typeof r == "string" ? r.trim().length > 0 : Array.isArray(r) ? r.some((s) => typeof s == "string" && s.trim().length > 0) : !1) return {};
  const o = e.split(`
`)[0].replace(/^•\s*/, "").trim().slice(0, 80);
  return o ? { "aria-label": o } : {};
}
const En = ({ content: n, children: e }) => {
  const t = Vt(), r = Be(), i = B(10, 12, r), o = B(6, 6, r), s = B(10, 12, r), l = { padding: `${o}px ${i}px`, fontSize: s }, c = Bn(), a = tr(), [u, d] = ie(!1), [f, p] = ie({ x: 0, y: 0 }), m = k(null), g = k(null), b = () => {
    if (!m.current) return;
    const z = m.current.getBoundingClientRect();
    p({ x: z.left + z.width / 2, y: z.top });
  };
  le(() => () => {
    g.current && clearTimeout(g.current);
  }, []), le(() => (u && a && (b(), a.addEventListener("scroll", b, !0)), () => a == null ? void 0 : a.removeEventListener("scroll", b, !0)), [u]);
  const y = Gc(e, n), $ = Object.keys(y).length > 0 ? et.cloneElement(e, y) : e;
  return /* @__PURE__ */ C(
    "div",
    {
      ref: m,
      className: "inline-flex",
      onMouseEnter: () => {
        g.current && clearTimeout(g.current), b(), d(!0);
      },
      onMouseLeave: () => {
        g.current = setTimeout(() => d(!1), 60);
      },
      children: [
        $,
        u && zr(
          /* @__PURE__ */ C(
            "div",
            {
              "data-mode": t == null ? void 0 : t.mode,
              "data-accent": t == null ? void 0 : t.accent,
              className: "ui-tooltip fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-[color:var(--ui-tooltip-border)] bg-[var(--ui-tooltip-bg)] text-[color:var(--ui-tooltip-text)] pointer-events-none",
              style: { ...l, left: f.x, top: f.y - 4, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                n.split(`
• `).map((z, N) => /* @__PURE__ */ h("div", { className: N > 0 ? "mt-0.5 pt-0.5 border-t border-[color:var(--ui-tooltip-sep)]" : "", children: z }, N)),
                /* @__PURE__ */ h("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[color:var(--ui-tooltip-bg)]" })
              ]
            }
          ),
          c ?? document.body
        )
      ]
    }
  );
}, Xc = 250;
function Qc(n, e, t) {
  const [r, i] = et.useState(null), [o, s] = et.useState(!1), l = et.useRef(null), c = et.useRef(t);
  c.current = t;
  const a = et.useCallback(() => {
    var f;
    const d = (f = e.current) == null ? void 0 : f[c.current];
    d && i({ left: d.offsetLeft, width: d.offsetWidth });
  }, [e]);
  et.useLayoutEffect(() => {
    a();
  }, [t, a]), et.useLayoutEffect(() => {
    const d = n.current;
    if (!d) return;
    const f = () => {
      s(!0), l.current && clearTimeout(l.current), l.current = setTimeout(() => s(!1), Xc), a();
    }, p = new ResizeObserver(f);
    p.observe(d);
    for (const m of e.current ?? []) m && p.observe(m);
    return () => {
      p.disconnect(), l.current && (clearTimeout(l.current), l.current = null);
    };
  }, [n, e, a]);
  const u = et.useMemo(
    () => {
      var d;
      return typeof window < "u" && !!((d = window.matchMedia) != null && d.call(window, "(prefers-reduced-motion: reduce)").matches);
    },
    []
  );
  return {
    style: r ? { left: 0, width: r.width, transform: `translateX(${r.left}px)` } : null,
    motionClass: u || o ? "" : "transition-[transform,width] duration-200 ease-out"
  };
}
function Fr() {
  const n = Be(), e = Ze, t = e ? B(28, 40, n) : 28, r = e ? B(28, 40, n) : 28, i = e ? B(10, 14, n) : 10, o = e ? B(10, 14, n) : 10, s = e ? B(8, 10, n) : 8;
  return {
    toggle: { width: t, height: t },
    control: { height: r, padding: `0 ${i}px`, fontSize: o },
    input: { height: r, padding: `0 ${s}px`, fontSize: o }
  };
}
const Th = Ze ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", Zc = Ze ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", ar = Ze ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", ea = "hover:bg-red-950/50", Ch = Ze ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", Eh = "bg-[var(--ui-accent-selected-bg)] border-[var(--ui-border-strong)] text-[color:var(--ui-accent-selected-text)]", Mh = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", ta = Ze ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", Rh = Ze ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50", as = Ze ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", na = "inline-flex rounded overflow-hidden border border-[var(--ui-border-strong)]", ra = Ze ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", ur = ({ onClick: n, disabled: e, title: t, className: r = Zc, children: i }) => {
  const o = Fr();
  return /* @__PURE__ */ h(En, { content: t, children: /* @__PURE__ */ h("button", { onClick: n, disabled: e, "aria-label": t, style: o.control, className: `${r} ${e ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) });
}, dr = {
  wrap: "border-[color:var(--ui-border-strong)] bg-[var(--ui-seg-track-bg)]",
  pill: "bg-[var(--ui-seg-pill)]",
  active: "text-[color:var(--ui-accent-pill-text)]",
  idle: "text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-seg-hover)]"
}, Ah = ({ value: n, options: e, onChange: t, disabled: r, active: i, stretch: o, dense: s, variant: l = "chrome", theme: c, tablist: a, ariaLabel: u }) => {
  const d = Vt(), f = c ?? hc(d), p = c === "blue" || c === "emerald" ? c : (d == null ? void 0 : d.accent) ?? "zinc", m = { "data-mode": f === "dark" ? "dark" : "light", "data-accent": p }, g = Fr(), b = s && !Ze ? 24 : g.control.height, y = cn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), $ = Ze ? y : { padding: "0 12px", fontSize: 12, height: s ? 20 : 30 }, z = (O) => i ? i(O) : n === O, N = et.useRef(null), w = et.useRef([]), A = Math.max(0, e.findIndex((O) => z(O.v))), L = Qc(N, w, A);
  return l === "track" ? /* @__PURE__ */ C(
    "div",
    {
      ref: N,
      role: a ? "tablist" : "group",
      "aria-label": u,
      ...m,
      className: `relative inline-flex items-center rounded border p-0.5 ${o ? "w-full" : ""} ${dr.wrap}`,
      children: [
        L.style && /* @__PURE__ */ h(
          "span",
          {
            "aria-hidden": !0,
            className: `absolute rounded ${dr.pill} ${L.motionClass}`,
            style: { ...L.style, top: 2, bottom: 2 }
          }
        ),
        e.map((O, E) => {
          const q = z(O.v);
          return /* @__PURE__ */ C(
            "button",
            {
              ref: (M) => {
                w.current[E] = M;
              },
              ...O.dataProps,
              type: "button",
              disabled: r,
              onClick: () => t(O.v),
              title: O.title,
              role: a ? "tab" : void 0,
              "aria-selected": a ? q : void 0,
              "aria-pressed": a ? void 0 : q,
              "aria-label": O.ariaLabel ?? (O.l ? void 0 : O.title),
              style: $,
              className: `relative z-10 inline-flex cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap rounded font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${o ? "flex-1" : ""} ${q ? dr.active : dr.idle}`,
              children: [
                O.icon,
                O.l
              ]
            },
            O.v
          );
        })
      ]
    }
  ) : /* @__PURE__ */ C("div", { ref: N, className: `relative ${na} bg-[var(--ui-seg-track-bg)]${o ? " w-full" : ""}`, children: [
    L.style && /* @__PURE__ */ h(
      "span",
      {
        "aria-hidden": !0,
        className: `absolute bg-[var(--ui-accent-pill-bg)] ${L.motionClass}`,
        style: { ...L.style, top: 0, bottom: 0 }
      }
    ),
    e.map((O, E) => {
      const q = z(O.v);
      return /* @__PURE__ */ C(
        "button",
        {
          ref: (M) => {
            w.current[E] = M;
          },
          ...O.dataProps,
          disabled: r,
          onClick: () => t(O.v),
          title: O.title,
          style: { ...g.control, height: b },
          className: `relative z-10 font-medium transition-colors disabled:opacity-30 ${o ? "flex-1" : ""} ${q ? "text-[color:var(--ui-accent-pill-text)]" : "text-[color:var(--ui-text-muted)] hover:bg-[var(--ui-accent-hover-bg)]"} ${O.v !== e[e.length - 1].v ? "border-r border-[var(--ui-border)]" : ""}`,
          children: [
            O.icon,
            O.l
          ]
        },
        O.v
      );
    })
  ] });
}, Ih = ({ children: n }) => /* @__PURE__ */ C("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ h("span", { className: Ze ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: n }),
  /* @__PURE__ */ h("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), ia = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", oa = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", $h = ({ label: n, children: e, tall: t }) => /* @__PURE__ */ C("div", { className: t ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  n && /* @__PURE__ */ h("span", { className: t ? ia : oa, children: n }),
  e
] }), zh = ({ leading: n, trailing: e, className: t = "" }) => /* @__PURE__ */ C("div", { className: `flex flex-wrap items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-0 ${t}`, children: [
  n,
  e && /* @__PURE__ */ h("div", { className: "ml-auto flex flex-wrap items-center justify-end gap-1", children: e })
] }), Dh = ({ readOnly: n, onDuplicate: e, onRemove: t, onMove: r, compact: i }) => (
  // One unbreakable cluster: when a header's trailing wraps, the move pair and
  // the duplicate/delete pair stay together (no orphaned icons on a line).
  /* @__PURE__ */ C("div", { className: "flex items-center gap-1 shrink-0", children: [
    /* @__PURE__ */ h(ur, { onClick: () => r(-1), disabled: n, title: "Move up", className: ar, children: /* @__PURE__ */ h(Rl, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ h(ur, { onClick: () => r(1), disabled: n, title: "Move down", className: ar, children: /* @__PURE__ */ h(Al, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ h(ur, { onClick: e, disabled: n, title: "Duplicate", className: ar, children: /* @__PURE__ */ h(Io, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ h("div", { className: as }),
    /* @__PURE__ */ h(ur, { onClick: t, disabled: n, title: "Delete", className: `${ar} ${ea}`, children: /* @__PURE__ */ h(ii, { className: "w-2.5 h-2.5" }) })
  ] })
);
var no = Object.defineProperty, sa = (n, e) => {
  let t = {};
  for (var r in n) no(t, r, {
    get: n[r],
    enumerable: !0
  });
  return no(t, Symbol.toStringTag, { value: "Module" }), t;
};
function ut(n) {
  this.content = n;
}
ut.prototype = {
  constructor: ut,
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
    return i == -1 ? o.push(t || n, e) : (o[i + 1] = e, t && (o[i] = t)), new ut(o);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(n) {
    var e = this.find(n);
    if (e == -1) return this;
    var t = this.content.slice();
    return t.splice(e, 2), new ut(t);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(n, e) {
    return new ut([n, e].concat(this.remove(n).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(n, e) {
    var t = this.remove(n).content.slice();
    return t.push(n, e), new ut(t);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(n, e, t) {
    var r = this.remove(e), i = r.content.slice(), o = r.find(n);
    return i.splice(o == -1 ? i.length : o, 0, e, t), new ut(i);
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
    return n = ut.from(n), n.size ? new ut(n.content.concat(this.subtract(n).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(n) {
    return n = ut.from(n), n.size ? new ut(this.subtract(n).content.concat(n.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(n) {
    var e = this;
    n = ut.from(n);
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
ut.from = function(n) {
  if (n instanceof ut) return n;
  var e = [];
  if (n) for (var t in n) e.push(t, n[t]);
  return new ut(e);
};
function us(n, e, t) {
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
      let s = i.text, l = o.text, c = 0;
      for (; s[c] == l[c]; c++)
        t++;
      return c && c < s.length && c < l.length && hs(s.charCodeAt(c - 1)) && fs(s.charCodeAt(c)) && t--, t;
    }
    if (i.content.size || o.content.size) {
      let s = us(i.content, o.content, t + 1);
      if (s != null)
        return s;
    }
    t += i.nodeSize;
  }
}
function ds(n, e, t, r) {
  for (let i = n.childCount, o = e.childCount; ; ) {
    if (i == 0 || o == 0)
      return i == o ? null : { a: t, b: r };
    let s = n.child(--i), l = e.child(--o), c = s.nodeSize;
    if (s == l) {
      t -= c, r -= c;
      continue;
    }
    if (!s.sameMarkup(l))
      return { a: t, b: r };
    if (s.isText && s.text != l.text) {
      let a = s.text, u = l.text, d = a.length, f = u.length;
      for (; d > 0 && f > 0 && a[d - 1] == u[f - 1]; )
        d--, f--, t--, r--;
      return d && f && d < a.length && hs(a.charCodeAt(d - 1)) && fs(a.charCodeAt(d)) && (t++, r++), { a: t, b: r };
    }
    if (s.content.size || l.content.size) {
      let a = ds(s.content, l.content, t - 1, r - 1);
      if (a)
        return a;
    }
    t -= c, r -= c;
  }
}
function fs(n) {
  return n >= 56320 && n < 57344;
}
function hs(n) {
  return n >= 55296 && n < 56320;
}
class j {
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
      let c = this.content[s], a = l + c.nodeSize;
      if (a > e && r(c, i + l, o || null, s) !== !1 && c.content.size) {
        let u = l + 1;
        c.nodesBetween(Math.max(0, e - u), Math.min(c.content.size, t - u), r, i + u);
      }
      l = a;
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
    return this.nodesBetween(e, t, (l, c) => {
      let a = l.isText ? l.text.slice(Math.max(e, c) - c, t - c) : l.isLeaf ? i ? typeof i == "function" ? i(l) : i : l.type.spec.leafText ? l.type.spec.leafText(l) : "" : "";
      l.isBlock && (l.isLeaf && a || l.isTextblock) && r && (s ? s = !1 : o += r), o += a;
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
    return new j(i, this.size + e.size);
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
        let l = this.content[o], c = s + l.nodeSize;
        c > e && ((s < e || c > t) && (l.isText ? l = l.cut(Math.max(0, e - s), Math.min(l.text.length, t - s)) : l = l.cut(Math.max(0, e - s - 1), Math.min(l.content.size, t - s - 1))), r.push(l), i += l.nodeSize), s = c;
      }
    return new j(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, t) {
    return e == t ? j.empty : e == 0 && t == this.content.length ? this : new j(this.content.slice(e, t));
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
    return i[e] = t, new j(i, o);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new j([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new j(this.content.concat(e), this.size + e.nodeSize);
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
    return us(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, r = e.size) {
    return ds(this, e, t, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e) {
    if (e == 0)
      return fr(0, e);
    if (e == this.size)
      return fr(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let t = 0, r = 0; ; t++) {
      let i = this.child(t), o = r + i.nodeSize;
      if (o >= e)
        return o == e ? fr(t + 1, o) : fr(t, r);
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
      return j.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return j.fromArray(t.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return j.empty;
    let t, r = 0;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      r += o.nodeSize, i && o.isText && e[i - 1].sameMarkup(o) ? (t || (t = e.slice(0, i)), t[t.length - 1] = o.withText(t[t.length - 1].text + o.text)) : t && t.push(o);
    }
    return new j(t || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return j.empty;
    if (e instanceof j)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new j([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
j.empty = new j([], 0);
const Gr = { index: 0, offset: 0 };
function fr(n, e) {
  return Gr.index = n, Gr.offset = e, Gr;
}
function Nr(n, e) {
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
      if (!Nr(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !Nr(n[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in n))
        return !1;
  }
  return !0;
}
let He = class ci {
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
    return this == e || this.type == e.type && Nr(this.attrs, e.attrs);
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
      return ci.none;
    if (e instanceof ci)
      return [e];
    let t = e.slice();
    return t.sort((r, i) => r.type.rank - i.type.rank), t;
  }
};
He.none = [];
class Un extends Error {
}
class ne {
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
    let r = ms(this.content, e + this.openStart, t, this.openStart + 1, this.openEnd + 1);
    return r && new ne(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new ne(ps(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
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
      return ne.empty;
    let r = t.openStart || 0, i = t.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new ne(j.fromJSON(e, t.content), r, i);
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
    return new ne(e, r, i);
  }
}
ne.empty = new ne(j.empty, 0, 0);
function ps(n, e, t) {
  let { index: r, offset: i } = n.findIndex(e), o = n.maybeChild(r), { index: s, offset: l } = n.findIndex(t);
  if (i == e || o.isText) {
    if (l != t && !n.child(s).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != s)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, o.copy(ps(o.content, e - i - 1, t - i - 1)));
}
function ms(n, e, t, r, i, o) {
  let { index: s, offset: l } = n.findIndex(e), c = n.maybeChild(s);
  if (l == e || c.isText)
    return o && r <= 0 && i <= 0 && !o.canReplace(s, s, t) ? null : n.cut(0, e).append(t).append(n.cut(e));
  let a = ms(c.content, e - l - 1, t, s == 0 ? r - 1 : 0, s == n.childCount - 1 ? i - 1 : 0, c);
  return a && n.replaceChild(s, c.copy(a));
}
function la(n, e, t) {
  if (t.openStart > n.depth)
    throw new Un("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new Un("Inconsistent open depths");
  return gs(n, e, t, 0);
}
function gs(n, e, t, r) {
  let i = n.index(r), o = n.node(r);
  if (i == e.index(r) && r < n.depth - t.openStart) {
    let s = gs(n, e, t, r + 1);
    return o.copy(o.content.replaceChild(i, s));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let s = n.parent, l = s.content;
      return mn(s, l.cut(0, n.parentOffset).append(t.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: s, end: l } = ca(t, n);
      return mn(o, xs(n, s, l, e, r));
    }
  else return mn(o, Tr(n, e, r));
}
function ys(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new Un("Cannot join " + e.type.name + " onto " + n.type.name);
}
function ai(n, e, t) {
  let r = n.node(t);
  return ys(r, e.node(t)), r;
}
function pn(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t]) ? e[t] = n.withText(e[t].text + n.text) : e.push(n);
}
function Kn(n, e, t, r) {
  let i = (e || n).node(t), o = 0, s = e ? e.index(t) : i.childCount;
  n && (o = n.index(t), n.depth > t ? o++ : n.textOffset && (pn(n.nodeAfter, r), o++));
  for (let l = o; l < s; l++)
    pn(i.child(l), r);
  e && e.depth == t && e.textOffset && pn(e.nodeBefore, r);
}
function mn(n, e) {
  if (!n.type.validContent(e))
    throw new Un("Invalid content for node " + n.type.name);
  return n.copy(e);
}
function xs(n, e, t, r, i) {
  let o = n.depth > i && ai(n, e, i + 1), s = r.depth > i && ai(t, r, i + 1), l = [];
  return Kn(null, n, i, l), o && s && e.index(i) == t.index(i) ? (ys(o, s), pn(mn(o, xs(n, e, t, r, i + 1)), l)) : (o && pn(mn(o, Tr(n, e, i + 1)), l), Kn(e, t, i, l), s && pn(mn(s, Tr(t, r, i + 1)), l)), Kn(r, null, i, l), new j(l);
}
function Tr(n, e, t) {
  let r = [];
  if (Kn(null, n, t, r), n.depth > t) {
    let i = ai(n, e, t + 1);
    pn(mn(i, Tr(n, e, t + 1)), r);
  }
  return Kn(e, null, t, r), new j(r);
}
function ca(n, e) {
  let t = e.depth - n.openStart, i = e.node(t).copy(n.content);
  for (let o = t - 1; o >= 0; o--)
    i = e.node(o).copy(j.from(i));
  return {
    start: i.resolveNoCache(n.openStart + t),
    end: i.resolveNoCache(i.content.size - n.openEnd - t)
  };
}
class Gn {
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
      return He.none;
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
        return new Cr(this, e, r);
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
      let { index: l, offset: c } = s.content.findIndex(o), a = o - c;
      if (r.push(s, l, i + c), !a || (s = s.child(l), s.isText))
        break;
      o = a - 1, i += c + 1;
    }
    return new Gn(t, r, o);
  }
  /**
  @internal
  */
  static resolveCached(e, t) {
    let r = ro.get(e);
    if (r)
      for (let o = 0; o < r.elts.length; o++) {
        let s = r.elts[o];
        if (s.pos == t)
          return s;
      }
    else
      ro.set(e, r = new aa());
    let i = r.elts[r.i] = Gn.resolve(e, t);
    return r.i = (r.i + 1) % ua, i;
  }
}
class aa {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const ua = 12, ro = /* @__PURE__ */ new WeakMap();
class Cr {
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
const da = /* @__PURE__ */ Object.create(null);
let In = class ui {
  /**
  @internal
  */
  constructor(e, t, r, i = He.none) {
    this.type = e, this.attrs = t, this.marks = i, this.content = r || j.empty;
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
    return this.type == e && Nr(this.attrs, t || e.defaultAttrs || da) && He.sameSet(this.marks, r || He.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new ui(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new ui(this.type, this.attrs, this.content, e);
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
      return ne.empty;
    let i = this.resolve(e), o = this.resolve(t), s = r ? 0 : i.sharedDepth(t), l = i.start(s), a = i.node(s).content.cut(i.pos - l, o.pos - l);
    return new ne(a, i.depth - s, o.depth - s);
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
    return la(this.resolve(e), this.resolve(t), r);
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
    return Gn.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return Gn.resolve(this, e);
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
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), bs(this.marks, e);
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
  canReplace(e, t, r = j.empty, i = 0, o = r.childCount) {
    let s = this.contentMatchAt(e).matchFragment(r, i, o), l = s && s.matchFragment(this.content, t);
    if (!l || !l.validEnd)
      return !1;
    for (let c = i; c < o; c++)
      if (!this.type.allowsMarks(r.child(c).marks))
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
    this.type.checkContent(this.content), io(this.type.attrs, this.attrs, "node", this.type.name);
    let e = He.none;
    for (let t = 0; t < this.marks.length; t++) {
      let r = this.marks[t];
      io(r.type.attrs, r.attrs, "mark", r.type.name), e = r.addToSet(e);
    }
    if (!He.sameSet(e, this.marks))
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
    let i = j.fromJSON(e, t.content);
    return e.nodeType(t.type).create(t.attrs, i, r);
  }
};
In.prototype.text = void 0;
class Er extends In {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    if (super(e, t, null, i), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : bs(this.marks, JSON.stringify(this.text));
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
    return e == this.marks ? this : new Er(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new Er(this.type, this.attrs, e, this.marks);
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
function bs(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    e = n[t].type.name + "(" + e + ")";
  return e;
}
function io(n, e, t, r) {
  for (let i in e)
    if (!(i in n))
      throw new RangeError(`Unsupported attribute ${i} for ${t} of type ${r}`);
  for (let i in n)
    n[i].validate && n[i].validate(e[i]);
}
class vn {
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
    let r = new fa(e, t);
    if (r.next == null)
      return vn.empty;
    let i = vs(r);
    r.next && r.err("Unexpected trailing text");
    let o = ba(xa(i));
    return va(o, r), o;
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
      let c = s.matchFragment(e, r);
      if (c && (!t || c.validEnd))
        return j.from(l.map((a) => a.createAndFill()));
      for (let a = 0; a < s.next.length; a++) {
        let { type: u, next: d } = s.next[a];
        if (!(u.isText || u.hasRequiredAttrs()) && i.indexOf(d) == -1) {
          i.push(d);
          let f = o(d, l.concat(u));
          if (f)
            return f;
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
        let { type: l, next: c } = o.next[s];
        !l.isLeaf && !l.hasRequiredAttrs() && !(l.name in t) && (!i.type || c.validEnd) && (r.push({ match: l.contentMatch, type: l, via: i }), t[l.name] = !0);
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
vn.empty = new vn(!0);
class fa {
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
function vs(n) {
  let e = [];
  do
    e.push(ha(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function ha(n) {
  let e = [];
  do
    e.push(pa(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function pa(n) {
  let e = ya(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = ma(n, e);
    else
      break;
  return e;
}
function oo(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function ma(n, e) {
  let t = oo(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = oo(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function ga(n, e) {
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
function ya(n) {
  if (n.eat("(")) {
    let e = vs(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = ga(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function xa(n) {
  let e = [[]];
  return i(o(n, 0), t()), e;
  function t() {
    return e.push([]) - 1;
  }
  function r(s, l, c) {
    let a = { term: c, to: l };
    return e[s].push(a), a;
  }
  function i(s, l) {
    s.forEach((c) => c.to = l);
  }
  function o(s, l) {
    if (s.type == "choice")
      return s.exprs.reduce((c, a) => c.concat(o(a, l)), []);
    if (s.type == "seq")
      for (let c = 0; ; c++) {
        let a = o(s.exprs[c], l);
        if (c == s.exprs.length - 1)
          return a;
        i(a, l = t());
      }
    else if (s.type == "star") {
      let c = t();
      return r(l, c), i(o(s.expr, c), c), [r(c)];
    } else if (s.type == "plus") {
      let c = t();
      return i(o(s.expr, l), c), i(o(s.expr, c), c), [r(c)];
    } else {
      if (s.type == "opt")
        return [r(l)].concat(o(s.expr, l));
      if (s.type == "range") {
        let c = l;
        for (let a = 0; a < s.min; a++) {
          let u = t();
          i(o(s.expr, c), u), c = u;
        }
        if (s.max == -1)
          i(o(s.expr, c), c);
        else
          for (let a = s.min; a < s.max; a++) {
            let u = t();
            r(c, u), i(o(s.expr, c), u), c = u;
          }
        return [r(c)];
      } else {
        if (s.type == "name")
          return [r(l, void 0, s.value)];
        throw new Error("Unknown expr type");
      }
    }
  }
}
function ws(n, e) {
  return e - n;
}
function so(n, e) {
  let t = [];
  return r(e), t.sort(ws);
  function r(i) {
    let o = n[i];
    if (o.length == 1 && !o[0].term)
      return r(o[0].to);
    t.push(i);
    for (let s = 0; s < o.length; s++) {
      let { term: l, to: c } = o[s];
      !l && t.indexOf(c) == -1 && r(c);
    }
  }
}
function ba(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(so(n, 0));
  function t(r) {
    let i = [];
    r.forEach((s) => {
      n[s].forEach(({ term: l, to: c }) => {
        if (!l)
          return;
        let a;
        for (let u = 0; u < i.length; u++)
          i[u][0] == l && (a = i[u][1]);
        so(n, c).forEach((u) => {
          a || i.push([l, a = []]), a.indexOf(u) == -1 && a.push(u);
        });
      });
    });
    let o = e[r.join(",")] = new vn(r.indexOf(n.length - 1) > -1);
    for (let s = 0; s < i.length; s++) {
      let l = i[s][1].sort(ws);
      o.next.push({ type: i[s][0], next: e[l.join(",")] || t(l) });
    }
    return o;
  }
}
function va(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let i = r[t], o = !i.validEnd, s = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: c, next: a } = i.next[l];
      s.push(c.name), o && !(c.isText || c.hasRequiredAttrs()) && (o = !1), r.indexOf(a) == -1 && r.push(a);
    }
    o && e.err("Only non-generatable nodes (" + s.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function ks(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault)
      return null;
    e[t] = r.default;
  }
  return e;
}
function Ss(n, e) {
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
function Ns(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      t[r] = new ka(n, r, e[r]);
  return t;
}
class Mr {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = Ns(e, r.attrs), this.defaultAttrs = ks(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
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
    return this.contentMatch == vn.empty;
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
    return !e && this.defaultAttrs ? this.defaultAttrs : Ss(this.attrs, e);
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
    return new In(this, this.computeAttrs(e), j.from(t), He.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = j.from(t), this.checkContent(t), new In(this, this.computeAttrs(e), t, He.setFrom(r));
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
    if (e = this.computeAttrs(e), t = j.from(t), t.size) {
      let s = this.contentMatch.fillBefore(t);
      if (!s)
        return null;
      t = s.append(t);
    }
    let i = this.contentMatch.matchFragment(t), o = i && i.fillBefore(j.empty, !0);
    return o ? new In(this, e, t.append(o), He.setFrom(r)) : null;
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
    return t ? t.length ? t : He.none : e;
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null);
    e.forEach((o, s) => r[o] = new Mr(o, t, s));
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
function wa(n, e, t) {
  let r = t.split("|");
  return (i) => {
    let o = i === null ? "null" : typeof i;
    if (r.indexOf(o) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${n}, got ${o}`);
  };
}
class ka {
  constructor(e, t, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? wa(e, t, r.validate) : r.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class Hr {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    this.name = e, this.rank = t, this.schema = r, this.spec = i, this.attrs = Ns(e, i.attrs), this.excluded = null;
    let o = ks(this.attrs);
    this.instance = o ? new He(this, o) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new He(this, Ss(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((o, s) => r[o] = new Hr(o, i++, t, s)), r;
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
class Sa {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let i in e)
      t[i] = e[i];
    t.nodes = ut.from(e.nodes), t.marks = ut.from(e.marks || {}), this.nodes = Mr.compile(this.spec.nodes, this), this.marks = Hr.compile(this.spec.marks, this);
    let r = /* @__PURE__ */ Object.create(null);
    for (let i in this.nodes) {
      if (i in this.marks)
        throw new RangeError(i + " can not be both a node and a mark");
      let o = this.nodes[i], s = o.spec.content || "", l = o.spec.marks;
      if (o.contentMatch = r[s] || (r[s] = vn.parse(s, this.nodes)), o.inlineContent = o.contentMatch.inlineContent, o.spec.linebreakReplacement) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!o.isInline || !o.isLeaf)
          throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
        this.linebreakReplacement = o;
      }
      o.markSet = l == "_" ? null : l ? lo(this, l.split(" ")) : l == "" || !o.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let o = this.marks[i], s = o.spec.excludes;
      o.excluded = s == null ? [o] : s == "" ? [] : lo(this, s.split(" "));
    }
    this.nodeFromJSON = (i) => In.fromJSON(this, i), this.markFromJSON = (i) => He.fromJSON(this, i), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
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
    else if (e instanceof Mr) {
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
    return new Er(r, r.defaultAttrs, e, He.setFrom(t));
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
function lo(n, e) {
  let t = [];
  for (let r = 0; r < e.length; r++) {
    let i = e[r], o = n.marks[i], s = o;
    if (o)
      t.push(o);
    else
      for (let l in n.marks) {
        let c = n.marks[l];
        (i == "_" || c.spec.group && c.spec.group.split(" ").indexOf(i) > -1) && t.push(s = c);
      }
    if (!s)
      throw new SyntaxError("Unknown mark type: '" + e[r] + "'");
  }
  return t;
}
function Na(n) {
  return n.tag != null;
}
function Ta(n) {
  return n.style != null;
}
class $n {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, t) {
    this.schema = e, this.rules = t, this.tags = [], this.styles = [];
    let r = this.matchedStyles = [];
    t.forEach((i) => {
      if (Na(i))
        this.tags.push(i);
      else if (Ta(i)) {
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
    let r = new ao(this, t, !1);
    return r.addAll(e, He.none, t.from, t.to), r.finish();
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
    let r = new ao(this, t, !0);
    return r.addAll(e, He.none, t.from, t.to), ne.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let o = this.tags[i];
      if (Ma(e, o.tag) && (o.namespace === void 0 || e.namespaceURI == o.namespace) && (!o.context || t.matchesContext(o.context))) {
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
          let c = s.getAttrs(t);
          if (c === !1)
            continue;
          s.attrs = c || void 0;
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
        r(s = uo(s)), s.mark || s.ignore || s.clearMark || (s.mark = i);
      });
    }
    for (let i in e.nodes) {
      let o = e.nodes[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = uo(s)), s.node || s.ignore || s.mark || (s.node = i);
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
    return e.cached.domParser || (e.cached.domParser = new $n(e, $n.schemaRules(e)));
  }
}
const Ts = {
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
}, Ca = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, Cs = { ol: !0, ul: !0 }, Xn = 1, di = 2, Jn = 4;
function co(n, e, t) {
  return e != null ? (e ? Xn : 0) | (e === "full" ? di : 0) : n && n.whitespace == "pre" ? Xn | di : t & ~Jn;
}
class hr {
  constructor(e, t, r, i, o, s) {
    this.type = e, this.attrs = t, this.marks = r, this.solid = i, this.options = s, this.content = [], this.activeMarks = He.none, this.match = o || (s & Jn ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let t = this.type.contentMatch.fillBefore(j.from(e));
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
    if (!(this.options & Xn)) {
      let r = this.content[this.content.length - 1], i;
      if (r && r.isText && (i = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let o = r;
        r.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = o.withText(o.text.slice(0, o.text.length - i[0].length));
      }
    }
    let t = j.from(this.content);
    return !e && this.match && (t = t.append(this.match.fillBefore(j.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Ts.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class ao {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0, this.localPreserveWS = !1;
    let i = t.topNode, o, s = co(null, t.preserveWhitespace, 0) | (r ? Jn : 0);
    i ? o = new hr(i.type, i.attrs, He.none, !0, t.topMatch || i.type.contentMatch, s) : r ? o = new hr(null, null, He.none, !0, null, s) : o = new hr(e.schema.topNodeType, null, He.none, !0, null, s), this.nodes = [o], this.find = t.findPositions, this.needsBlock = !1;
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
    let r = e.nodeValue, i = this.top, o = i.options & di ? "full" : this.localPreserveWS || (i.options & Xn) > 0, { schema: s } = this.parser;
    if (o === "full" || i.inlineContext(e) || /[^ \t\r\n\u000c]/.test(r)) {
      if (o)
        if (o === "full")
          r = r.replace(/\r\n?/g, `
`);
        else if (s.linebreakReplacement && /[\r\n]/.test(r) && this.top.findWrapping(s.linebreakReplacement.create())) {
          let l = r.split(/\r?\n|\r/);
          for (let c = 0; c < l.length; c++)
            c && this.insertNode(s.linebreakReplacement.create(), t, !0), l[c] && this.insertNode(s.text(l[c]), t, !/\S/.test(l[c]));
          r = "";
        } else
          r = r.replace(/\r?\n|\r/g, " ");
      else if (r = r.replace(/[ \t\r\n\u000c]+/g, " "), /^[ \t\r\n\u000c]/.test(r) && this.open == this.nodes.length - 1) {
        let l = i.content[i.content.length - 1], c = e.previousSibling;
        (!l || c && c.nodeName == "BR" || l.isText && /[ \t\r\n\u000c]$/.test(l.text)) && (r = r.slice(1));
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
    Cs.hasOwnProperty(s) && this.parser.normalizeLists && Ea(e);
    let c = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, r));
    e: if (c ? c.ignore : Ca.hasOwnProperty(s))
      this.findInside(e), this.ignoreFallback(e, t);
    else if (!c || c.skip || c.closeParent) {
      c && c.closeParent ? this.open = Math.max(0, this.open - 1) : c && c.skip.nodeType && (e = c.skip);
      let a, u = this.needsBlock;
      if (Ts.hasOwnProperty(s))
        o.content.length && o.content[0].isInline && this.open && (this.open--, o = this.top), a = !0, o.type || (this.needsBlock = !0);
      else if (!e.firstChild) {
        this.leafFallback(e, t);
        break e;
      }
      let d = c && c.skip ? t : this.readStyles(e, t);
      d && this.addAll(e, d), a && this.sync(o), this.needsBlock = u;
    } else {
      let a = this.readStyles(e, t);
      a && this.addElementByRule(e, c, a, c.consuming === !1 ? l : void 0);
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
            let c = this.parser.matchStyle(o, s, this, l);
            if (!c)
              break;
            if (c.ignore)
              return null;
            if (c.clearMark ? t = t.filter((a) => !c.clearMark(a)) : t = t.concat(this.parser.schema.marks[c.mark].create(c.attrs)), c.consuming === !1)
              l = c;
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
        let c = this.enter(s, t.attrs || null, r, t.preserveWhitespace);
        c && (o = !0, r = c);
      }
    else {
      let c = this.parser.schema.marks[t.mark];
      r = r.concat(c.create(t.attrs));
    }
    let l = this.top;
    if (s && s.isLeaf)
      this.findInside(e);
    else if (i)
      this.addElement(e, r, i);
    else if (t.getContent)
      this.findInside(e), t.getContent(e, this.parser.schema).forEach((c) => this.insertNode(c, r, !1));
    else {
      let c = e;
      typeof t.contentElement == "string" ? c = e.querySelector(t.contentElement) : typeof t.contentElement == "function" ? c = t.contentElement(e) : t.contentElement && (c = t.contentElement), this.findAround(e, c, !0), this.addAll(c, r), this.findAround(e, c, !1);
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
      let c = this.nodes[s], a = c.findWrapping(e);
      if (a && (!i || i.length > a.length + l) && (i = a, o = c, !a.length))
        break;
      if (c.solid) {
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
      let s = He.none;
      for (let l of i.concat(e.marks))
        (o.type ? o.type.allowsMarkType(l.type) : fo(l.type, e.type)) && (s = l.addToSet(s));
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
    let l = co(e, o, s.options);
    s.options & Jn && s.content.length == 0 && (l |= Jn);
    let c = He.none;
    return r = r.filter((a) => (s.type ? s.type.allowsMarkType(a.type) : fo(a.type, e)) ? (c = a.addToSet(c), !1) : !0), this.nodes.push(new hr(e, t, c, i, null, l)), this.open++, r;
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
      this.localPreserveWS && (this.nodes[t].options |= Xn);
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
    let t = e.split("/"), r = this.options.context, i = !this.isOpen && (!r || r.parent.type == this.nodes[0].type), o = -(r ? r.depth + 1 : 0) + (i ? 0 : 1), s = (l, c) => {
      for (; l >= 0; l--) {
        let a = t[l];
        if (a == "") {
          if (l == t.length - 1 || l == 0)
            continue;
          for (; c >= o; c--)
            if (s(l - 1, c))
              return !0;
          return !1;
        } else {
          let u = c > 0 || c == 0 && i ? this.nodes[c].type : r && c >= o ? r.node(c - o).type : null;
          if (!u || u.name != a && !u.isInGroup(a))
            return !1;
          c--;
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
    r && Cs.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function Ma(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function uo(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function fo(n, e) {
  let t = e.schema.nodes;
  for (let r in t) {
    let i = t[r];
    if (!i.allowsMarkType(n))
      continue;
    let o = [], s = (l) => {
      o.push(l);
      for (let c = 0; c < l.edgeCount; c++) {
        let { type: a, next: u } = l.edge(c);
        if (a == e || o.indexOf(u) < 0 && s(u))
          return !0;
      }
    };
    if (s(i.contentMatch))
      return !0;
  }
}
const Es = 65535, Ms = Math.pow(2, 16);
function Ra(n, e) {
  return n + e * Ms;
}
function ho(n) {
  return n & Es;
}
function Aa(n) {
  return (n - (n & Es)) / Ms;
}
const Rs = 1, As = 2, xr = 4, Is = 8;
class fi {
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
    return (this.delInfo & Is) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (Rs | xr)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (As | xr)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & xr) > 0;
  }
}
class Mt {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, t = !1) {
    if (this.ranges = e, this.inverted = t, !e.length && Mt.empty)
      return Mt.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let t = 0, r = ho(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + t + Aa(e);
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
      let c = this.ranges[l] - (this.inverted ? i : 0);
      if (c > e)
        break;
      let a = this.ranges[l + o], u = this.ranges[l + s], d = c + a;
      if (e <= d) {
        let f = a ? e == c ? -1 : e == d ? 1 : t : t, p = c + i + (f < 0 ? 0 : u);
        if (r)
          return p;
        let m = e == (t < 0 ? c : d) ? null : Ra(l / 3, e - c), g = e == c ? As : e == d ? Rs : xr;
        return (t < 0 ? e != c : e != d) && (g |= Is), new fi(p, g, m);
      }
      i += u - a;
    }
    return r ? e + i : new fi(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, i = ho(t), o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let c = this.ranges[l] - (this.inverted ? r : 0);
      if (c > e)
        break;
      let a = this.ranges[l + o], u = c + a;
      if (e <= u && l == i * 3)
        return !0;
      r += this.ranges[l + s] - a;
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
      let s = this.ranges[i], l = s - (this.inverted ? o : 0), c = s + (this.inverted ? 0 : o), a = this.ranges[i + t], u = this.ranges[i + r];
      e(l, l + a, c, c + u), o += u - a;
    }
  }
  /**
  Create an inverted version of this map. The result can be used to
  map positions in the post-step document to the pre-step document.
  */
  invert() {
    return new Mt(this.ranges, !this.inverted);
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
    return e == 0 ? Mt.empty : new Mt(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
Mt.empty = new Mt([]);
class Rr {
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
    return new Rr(this._maps, this.mirror, e, t);
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
    let e = new Rr();
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
        let c = this.getMirror(o);
        if (c != null && c > o && c < this.to) {
          o = c, e = this._maps[c].recover(l.recover);
          continue;
        }
      }
      i |= l.delInfo, e = l.pos;
    }
    return r ? e : new fi(e, i, null);
  }
}
const Xr = /* @__PURE__ */ Object.create(null);
class yt {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return Mt.empty;
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
    let r = Xr[t.stepType];
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
    if (e in Xr)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return Xr[e] = t, t.prototype.jsonID = e, t;
  }
}
class nt {
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
    return new nt(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new nt(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, t, r, i) {
    try {
      return nt.ok(e.replace(t, r, i));
    } catch (o) {
      if (o instanceof Un)
        return nt.fail(o.message);
      throw o;
    }
  }
}
function Ii(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let o = n.child(i);
    o.content.size && (o = o.copy(Ii(o.content, e, o))), o.isInline && (o = e(o, t, i)), r.push(o);
  }
  return j.fromArray(r);
}
class sn extends yt {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new ne(Ii(t.content, (s, l) => !s.isAtom || !l.type.allowsMarkType(this.mark.type) ? s : s.mark(this.mark.addToSet(s.marks)), i), t.openStart, t.openEnd);
    return nt.fromReplace(e, this.from, this.to, o);
  }
  invert() {
    return new Ht(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new sn(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof sn && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new sn(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new sn(t.from, t.to, e.markFromJSON(t.mark));
  }
}
yt.jsonID("addMark", sn);
class Ht extends yt {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new ne(Ii(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
    return nt.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new sn(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new Ht(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof Ht && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new Ht(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new Ht(t.from, t.to, e.markFromJSON(t.mark));
  }
}
yt.jsonID("removeMark", Ht);
class ln extends yt {
  /**
  Create a node mark step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return nt.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return nt.fromReplace(e, this.pos, this.pos + 1, new ne(j.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    if (t) {
      let r = this.mark.addToSet(t.marks);
      if (r.length == t.marks.length) {
        for (let i = 0; i < t.marks.length; i++)
          if (!t.marks[i].isInSet(r))
            return new ln(this.pos, t.marks[i]);
        return new ln(this.pos, this.mark);
      }
    }
    return new wn(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new ln(t.pos, this.mark);
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
    return new ln(t.pos, e.markFromJSON(t.mark));
  }
}
yt.jsonID("addNodeMark", ln);
class wn extends yt {
  /**
  Create a mark-removing step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return nt.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return nt.fromReplace(e, this.pos, this.pos + 1, new ne(j.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new ln(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new wn(t.pos, this.mark);
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
    return new wn(t.pos, e.markFromJSON(t.mark));
  }
}
yt.jsonID("removeNodeMark", wn);
class tt extends yt {
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
    return this.structure && hi(e, this.from, this.to) ? nt.fail("Structure replace would overwrite content") : nt.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new Mt([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new tt(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let t = e.mapResult(this.to, -1), r = this.from == this.to && tt.MAP_BIAS < 0 ? t : e.mapResult(this.from, 1);
    return r.deletedAcross && t.deletedAcross ? null : new tt(r.pos, Math.max(r.pos, t.pos), this.slice, this.structure);
  }
  merge(e) {
    if (!(e instanceof tt) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let t = this.slice.size + e.slice.size == 0 ? ne.empty : new ne(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new tt(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? ne.empty : new ne(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new tt(e.from, this.to, t, this.structure);
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
    return new tt(t.from, t.to, ne.fromJSON(e, t.slice), !!t.structure);
  }
}
tt.MAP_BIAS = 1;
yt.jsonID("replace", tt);
class st extends yt {
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
    if (this.structure && (hi(e, this.from, this.gapFrom) || hi(e, this.gapTo, this.to)))
      return nt.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return nt.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? nt.fromReplace(e, this.from, this.to, r) : nt.fail("Content does not fit in gap");
  }
  getMap() {
    return new Mt([
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
    return new st(this.from, this.from + this.slice.size + t, this.from + this.insert, this.from + this.insert + t, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), i = this.from == this.gapFrom ? t.pos : e.map(this.gapFrom, -1), o = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return t.deletedAcross && r.deletedAcross || i < t.pos || o > r.pos ? null : new st(t.pos, r.pos, i, o, this.slice, this.insert, this.structure);
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
    return new st(t.from, t.to, t.gapFrom, t.gapTo, ne.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
yt.jsonID("replaceAround", st);
function hi(n, e, t) {
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
function Ia(n, e, t, r) {
  let i = [], o = [], s, l;
  n.doc.nodesBetween(e, t, (c, a, u) => {
    if (!c.isInline)
      return;
    let d = c.marks;
    if (!r.isInSet(d) && u.type.allowsMarkType(r.type)) {
      let f = Math.max(a, e), p = Math.min(a + c.nodeSize, t), m = r.addToSet(d);
      for (let g = 0; g < d.length; g++)
        d[g].isInSet(m) || (s && s.to == f && s.mark.eq(d[g]) ? s.to = p : i.push(s = new Ht(f, p, d[g])));
      l && l.to == f ? l.to = p : o.push(l = new sn(f, p, r));
    }
  }), i.forEach((c) => n.step(c)), o.forEach((c) => n.step(c));
}
function $a(n, e, t, r) {
  let i = [], o = 0;
  n.doc.nodesBetween(e, t, (s, l) => {
    if (!s.isInline)
      return;
    o++;
    let c = null;
    if (r instanceof Hr) {
      let a = s.marks, u;
      for (; u = r.isInSet(a); )
        (c || (c = [])).push(u), a = u.removeFromSet(a);
    } else r ? r.isInSet(s.marks) && (c = [r]) : c = s.marks;
    if (c && c.length) {
      let a = Math.min(l + s.nodeSize, t);
      for (let u = 0; u < c.length; u++) {
        let d = c[u], f;
        for (let p = 0; p < i.length; p++) {
          let m = i[p];
          m.step == o - 1 && d.eq(i[p].style) && (f = m);
        }
        f ? (f.to = a, f.step = o) : i.push({ style: d, from: Math.max(l, e), to: a, step: o });
      }
    }
  }), i.forEach((s) => n.step(new Ht(s.from, s.to, s.style)));
}
function $i(n, e, t, r = t.contentMatch, i = !0) {
  let o = n.doc.nodeAt(e), s = [], l = e + 1;
  for (let c = 0; c < o.childCount; c++) {
    let a = o.child(c), u = l + a.nodeSize, d = r.matchType(a.type);
    if (!d)
      s.push(new tt(l, u, ne.empty));
    else {
      r = d;
      for (let f = 0; f < a.marks.length; f++)
        t.allowsMarkType(a.marks[f].type) || n.step(new Ht(l, u, a.marks[f]));
      if (i && a.isText && t.whitespace != "pre") {
        let f, p = /\r?\n|\r/g, m;
        for (; f = p.exec(a.text); )
          m || (m = new ne(j.from(t.schema.text(" ", t.allowedMarks(a.marks))), 0, 0)), s.push(new tt(l + f.index, l + f.index + f[0].length, m));
      }
    }
    l = u;
  }
  if (!r.validEnd) {
    let c = r.fillBefore(j.empty, !0);
    n.replace(l, l, new ne(c, 0, 0));
  }
  for (let c = s.length - 1; c >= 0; c--)
    n.step(s[c]);
}
function za(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function Fn(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth, i = 0, o = 0; ; --r) {
    let s = n.$from.node(r), l = n.$from.index(r) + i, c = n.$to.indexAfter(r) - o;
    if (r < n.depth && s.canReplace(l, c, t))
      return r;
    if (r == 0 || s.type.spec.isolating || !za(s, l, c))
      break;
    l && (i = 1), c < s.childCount && (o = 1);
  }
  return null;
}
function Da(n, e, t) {
  let { $from: r, $to: i, depth: o } = e, s = r.before(o + 1), l = i.after(o + 1), c = s, a = l, u = j.empty, d = 0;
  for (let m = o, g = !1; m > t; m--)
    g || r.index(m) > 0 ? (g = !0, u = j.from(r.node(m).copy(u)), d++) : c--;
  let f = j.empty, p = 0;
  for (let m = o, g = !1; m > t; m--)
    g || i.after(m + 1) < i.end(m) ? (g = !0, f = j.from(i.node(m).copy(f)), p++) : a++;
  n.step(new st(c, a, s, l, new ne(u.append(f), d, p), u.size - d, !0));
}
function $s(n, e, t = null, r = n) {
  let i = Oa(n, e), o = i && Pa(r, e);
  return o ? i.map(po).concat({ type: e, attrs: t }).concat(o.map(po)) : null;
}
function po(n) {
  return { type: n, attrs: null };
}
function Oa(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.contentMatchAt(r).findWrapping(e);
  if (!o)
    return null;
  let s = o.length ? o[0] : e;
  return t.canReplaceWith(r, i, s) ? o : null;
}
function Pa(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.child(r), s = e.contentMatch.findWrapping(o.type);
  if (!s)
    return null;
  let c = (s.length ? s[s.length - 1] : e).contentMatch;
  for (let a = r; c && a < i; a++)
    c = c.matchType(t.child(a).type);
  return !c || !c.validEnd ? null : s;
}
function La(n, e, t) {
  let r = j.empty;
  for (let s = t.length - 1; s >= 0; s--) {
    if (r.size) {
      let l = t[s].type.contentMatch.matchFragment(r);
      if (!l || !l.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = j.from(t[s].type.create(t[s].attrs, r));
  }
  let i = e.start, o = e.end;
  n.step(new st(i, o, i, o, new ne(r, 0, 0), t.length, !0));
}
function Ba(n, e, t, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let o = n.steps.length;
  n.doc.nodesBetween(e, t, (s, l) => {
    let c = typeof i == "function" ? i(s) : i;
    if (s.isTextblock && !s.hasMarkup(r, c) && Fa(n.doc, n.mapping.slice(o).map(l), r)) {
      let a = null;
      if (r.schema.linebreakReplacement) {
        let p = r.whitespace == "pre", m = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        p && !m ? a = !1 : !p && m && (a = !0);
      }
      a === !1 && Ds(n, s, l, o), $i(n, n.mapping.slice(o).map(l, 1), r, void 0, a === null);
      let u = n.mapping.slice(o), d = u.map(l, 1), f = u.map(l + s.nodeSize, 1);
      return n.step(new st(d, f, d + 1, f - 1, new ne(j.from(r.create(c, null, s.marks)), 0, 0), 1, !0)), a === !0 && zs(n, s, l, o), !1;
    }
  });
}
function zs(n, e, t, r) {
  e.forEach((i, o) => {
    if (i.isText) {
      let s, l = /\r?\n|\r/g;
      for (; s = l.exec(i.text); ) {
        let c = n.mapping.slice(r).map(t + 1 + o + s.index);
        n.replaceWith(c, c + 1, e.type.schema.linebreakReplacement.create());
      }
    }
  });
}
function Ds(n, e, t, r) {
  e.forEach((i, o) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let s = n.mapping.slice(r).map(t + 1 + o);
      n.replaceWith(s, s + 1, e.type.schema.text(`
`));
    }
  });
}
function Fa(n, e, t) {
  let r = n.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, t);
}
function Ha(n, e, t, r, i) {
  let o = n.doc.nodeAt(e);
  if (!o)
    throw new RangeError("No node at given position");
  t || (t = o.type);
  let s = t.create(r, null, i || o.marks);
  if (o.isLeaf)
    return n.replaceWith(e, e + o.nodeSize, s);
  if (!t.validContent(o.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(new st(e, e + o.nodeSize, e + 1, e + o.nodeSize - 1, new ne(j.from(s), 0, 0), 1, !0));
}
function Xt(n, e, t = 1, r) {
  let i = n.resolve(e), o = i.depth - t, s = r && r[r.length - 1] || i.parent;
  if (o < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !s.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
    return !1;
  for (let a = i.depth - 1, u = t - 2; a > o; a--, u--) {
    let d = i.node(a), f = i.index(a);
    if (d.type.spec.isolating)
      return !1;
    let p = d.content.cutByIndex(f, d.childCount), m = r && r[u + 1];
    m && (p = p.replaceChild(0, m.type.create(m.attrs)));
    let g = r && r[u] || d;
    if (!d.canReplace(f + 1, d.childCount) || !g.type.validContent(p))
      return !1;
  }
  let l = i.indexAfter(o), c = r && r[0];
  return i.node(o).canReplaceWith(l, l, c ? c.type : i.node(o + 1).type);
}
function _a(n, e, t = 1, r) {
  let i = n.doc.resolve(e), o = j.empty, s = j.empty;
  for (let l = i.depth, c = i.depth - t, a = t - 1; l > c; l--, a--) {
    o = j.from(i.node(l).copy(o));
    let u = r && r[a];
    s = j.from(u ? u.type.create(u.attrs, s) : i.node(l).copy(s));
  }
  n.step(new tt(e, e, new ne(o.append(s), t, t), !0));
}
function kn(n, e) {
  let t = n.resolve(e), r = t.index();
  return Os(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function ja(n, e) {
  e.content.size || n.type.compatibleContent(e.type);
  let t = n.contentMatchAt(n.childCount), { linebreakReplacement: r } = n.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let o = e.child(i), s = o.type == r ? n.type.schema.nodes.text : o.type;
    if (t = t.matchType(s), !t || !n.type.allowsMarks(o.marks))
      return !1;
  }
  return t.validEnd;
}
function Os(n, e) {
  return !!(n && e && !n.isLeaf && ja(n, e));
}
function _r(n, e, t = -1) {
  let r = n.resolve(e);
  for (let i = r.depth; ; i--) {
    let o, s, l = r.index(i);
    if (i == r.depth ? (o = r.nodeBefore, s = r.nodeAfter) : t > 0 ? (o = r.node(i + 1), l++, s = r.node(i).maybeChild(l)) : (o = r.node(i).maybeChild(l - 1), s = r.node(i + 1)), o && !o.isTextblock && Os(o, s) && r.node(i).canReplace(l, l + 1))
      return e;
    if (i == 0)
      break;
    e = t < 0 ? r.before(i) : r.after(i);
  }
}
function Wa(n, e, t) {
  let r = null, { linebreakReplacement: i } = n.doc.type.schema, o = n.doc.resolve(e - t), s = o.node().type;
  if (i && s.inlineContent) {
    let u = s.whitespace == "pre", d = !!s.contentMatch.matchType(i);
    u && !d ? r = !1 : !u && d && (r = !0);
  }
  let l = n.steps.length;
  if (r === !1) {
    let u = n.doc.resolve(e + t);
    Ds(n, u.node(), u.before(), l);
  }
  s.inlineContent && $i(n, e + t - 1, s, o.node().contentMatchAt(o.index()), r == null);
  let c = n.mapping.slice(l), a = c.map(e - t);
  if (n.step(new tt(a, c.map(e + t, -1), ne.empty, !0)), r === !0) {
    let u = n.doc.resolve(a);
    zs(n, u.node(), u.before(), n.steps.length);
  }
  return n;
}
function qa(n, e, t) {
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
function jr(n, e, t = e, r = ne.empty) {
  if (e == t && !r.size)
    return null;
  let i = n.resolve(e), o = n.resolve(t);
  return Ps(i, o, r) ? new tt(e, t, r) : new Ka(i, o, r).fit();
}
function Ps(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class Ka {
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.unplaced = r, this.frontier = [], this.placed = j.empty;
    for (let i = 0; i <= e.depth; i++) {
      let o = e.node(i);
      this.frontier.push({
        type: o.type,
        match: o.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = j.from(e.node(i).copy(this.placed));
  }
  get depth() {
    return this.frontier.length - 1;
  }
  fit() {
    for (; this.unplaced.size; ) {
      let a = this.findFittable();
      a ? this.placeNodes(a) : this.openMore() || this.dropNode();
    }
    let e = this.mustMoveInline(), t = this.placed.size - this.depth - this.$from.depth, r = this.$from, i = this.close(e < 0 ? this.$to : r.doc.resolve(e));
    if (!i)
      return null;
    let o = this.placed, s = r.depth, l = i.depth;
    for (; s && l && o.childCount == 1; )
      o = o.firstChild.content, s--, l--;
    let c = new ne(o, s, l);
    return e > -1 ? new st(r.pos, e, this.$to.pos, this.$to.end(), c, t) : c.size || r.pos != this.$to.pos ? new tt(r.pos, i.pos, c) : null;
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
        r ? (o = Qr(this.unplaced.content, r - 1).firstChild, i = o.content) : i = this.unplaced.content;
        let s = i.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: c, match: a } = this.frontier[l], u, d = null;
          if (t == 1 && (s ? a.matchType(s.type) || (d = a.fillBefore(j.from(s), !1)) : o && c.compatibleContent(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, inject: d };
          if (t == 2 && s && (u = a.findWrapping(s.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, wrap: u };
          if (o && a.matchType(o.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = Qr(e, t);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new ne(e, t + 1, Math.max(r, i.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = Qr(e, t);
    if (i.childCount <= 1 && t > 0) {
      let o = e.size - t <= t + i.size;
      this.unplaced = new ne(jn(e, t - 1, 1), t - 1, o ? t - 1 : r);
    } else
      this.unplaced = new ne(jn(e, t, 1), t, r);
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
    let s = this.unplaced, l = r ? r.content : s.content, c = s.openStart - e, a = 0, u = [], { match: d, type: f } = this.frontier[t];
    if (i) {
      for (let g = 0; g < i.childCount; g++)
        u.push(i.child(g));
      d = d.matchFragment(i);
    }
    let p = l.size + e - (s.content.size - s.openEnd);
    for (; a < l.childCount; ) {
      let g = l.child(a), b = d.matchType(g.type);
      if (!b)
        break;
      a++, (a > 1 || c == 0 || g.content.size) && (d = b, u.push(Ls(g.mark(f.allowedMarks(g.marks)), a == 1 ? c : 0, a == l.childCount ? p : -1)));
    }
    let m = a == l.childCount;
    m || (p = -1), this.placed = Wn(this.placed, t, j.from(u)), this.frontier[t].match = d, m && p < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let g = 0, b = l; g < p; g++) {
      let y = b.lastChild;
      this.frontier.push({ type: y.type, match: y.contentMatchAt(y.childCount) }), b = y.content;
    }
    this.unplaced = m ? e == 0 ? ne.empty : new ne(jn(s.content, e - 1, 1), e - 1, p < 0 ? s.openEnd : e - 1) : new ne(jn(s.content, e, a), s.openStart, s.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !Zr(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
      let { match: r, type: i } = this.frontier[t], o = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), s = Zr(e, t, i, r, o);
      if (s) {
        for (let l = t - 1; l >= 0; l--) {
          let { match: c, type: a } = this.frontier[l], u = Zr(e, l, a, c, !0);
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
    t.fit.childCount && (this.placed = Wn(this.placed, t.depth, t.fit)), e = t.move;
    for (let r = t.depth + 1; r <= e.depth; r++) {
      let i = e.node(r), o = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, o);
    }
    return e;
  }
  openFrontierNode(e, t = null, r) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = Wn(this.placed, this.depth, j.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(j.empty, !0);
    t.childCount && (this.placed = Wn(this.placed, this.frontier.length, t));
  }
}
function jn(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(jn(n.firstChild.content, e - 1, t)));
}
function Wn(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(Wn(n.lastChild.content, e - 1, t)));
}
function Qr(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function Ls(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, Ls(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(j.empty, !0)))), n.copy(r);
}
function Zr(n, e, t, r, i) {
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
function Va(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function Ya(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let i = n.doc.resolve(e), o = n.doc.resolve(t);
  if (Ps(i, o, r))
    return n.step(new tt(e, t, r));
  let s = Fs(i, o);
  s[s.length - 1] == 0 && s.pop();
  let l = -(i.depth + 1);
  s.unshift(l);
  for (let f = i.depth, p = i.pos - 1; f > 0; f--, p--) {
    let m = i.node(f).type.spec;
    if (m.defining || m.definingAsContext || m.isolating)
      break;
    s.indexOf(f) > -1 ? l = f : i.before(f) == p && s.splice(1, 0, -f);
  }
  let c = s.indexOf(l), a = [], u = r.openStart;
  for (let f = r.content, p = 0; ; p++) {
    let m = f.firstChild;
    if (a.push(m), p == r.openStart)
      break;
    f = m.content;
  }
  for (let f = u - 1; f >= 0; f--) {
    let p = a[f], m = Va(p.type);
    if (m && !p.sameMarkup(i.node(Math.abs(l) - 1)))
      u = f;
    else if (m || !p.type.isTextblock)
      break;
  }
  for (let f = r.openStart; f >= 0; f--) {
    let p = (f + u + 1) % (r.openStart + 1), m = a[p];
    if (m)
      for (let g = 0; g < s.length; g++) {
        let b = s[(g + c) % s.length], y = !0;
        b < 0 && (y = !1, b = -b);
        let $ = i.node(b - 1), z = i.index(b - 1);
        if ($.canReplaceWith(z, z, m.type, m.marks))
          return n.replace(i.before(b), y ? o.after(b) : t, new ne(Bs(r.content, 0, r.openStart, p), p, r.openEnd));
      }
  }
  let d = n.steps.length;
  for (let f = s.length - 1; f >= 0 && (n.replace(e, t, r), !(n.steps.length > d)); f--) {
    let p = s[f];
    p < 0 || (e = i.before(p), t = o.after(p));
  }
}
function Bs(n, e, t, r, i) {
  if (e < t) {
    let o = n.firstChild;
    n = n.replaceChild(0, o.copy(Bs(o.content, e + 1, t, r, o)));
  }
  if (e > r) {
    let o = i.contentMatchAt(0), s = o.fillBefore(n).append(n);
    n = s.append(o.matchFragment(s).fillBefore(j.empty, !0));
  }
  return n;
}
function Ua(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = qa(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new ne(j.from(r), 0, 0));
}
function Ga(n, e, t) {
  let r = n.doc.resolve(e), i = n.doc.resolve(t);
  if (r.parent.isTextblock && i.parent.isTextblock && r.start() != i.start() && r.parentOffset == 0 && i.parentOffset == 0) {
    let s = r.sharedDepth(t), l = !1;
    for (let c = r.depth; c > s; c--)
      r.node(c).type.spec.isolating && (l = !0);
    for (let c = i.depth; c > s; c--)
      i.node(c).type.spec.isolating && (l = !0);
    if (!l) {
      for (let c = r.depth; c > 0 && e == r.start(c); c--)
        e = r.before(c);
      for (let c = i.depth; c > 0 && t == i.start(c); c--)
        t = i.before(c);
      r = n.doc.resolve(e), i = n.doc.resolve(t);
    }
  }
  let o = Fs(r, i);
  for (let s = 0; s < o.length; s++) {
    let l = o[s], c = s == o.length - 1;
    if (c && l == 0 || r.node(l).type.contentMatch.validEnd)
      return n.delete(r.start(l), i.end(l));
    if (l > 0 && (c || r.node(l - 1).canReplace(r.index(l - 1), i.indexAfter(l - 1))))
      return n.delete(r.before(l), i.after(l));
  }
  for (let s = 1; s <= r.depth && s <= i.depth; s++)
    if (e - r.start(s) == r.depth - s && t > r.end(s) && i.end(s) - t != i.depth - s && r.start(s - 1) == i.start(s - 1) && r.node(s - 1).canReplace(r.index(s - 1), i.index(s - 1)))
      return n.delete(r.before(s), t);
  n.delete(e, t);
}
function Fs(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let o = n.start(i);
    if (o < n.pos - (n.depth - i) || e.end(i) > e.pos + (e.depth - i) || n.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (o == e.start(i) || i == n.depth && i == e.depth && n.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == o - 1) && t.push(i);
  }
  return t;
}
class zn extends yt {
  /**
  Construct an attribute step.
  */
  constructor(e, t, r) {
    super(), this.pos = e, this.attr = t, this.value = r;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return nt.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let o in t.attrs)
      r[o] = t.attrs[o];
    r[this.attr] = this.value;
    let i = t.type.create(r, null, t.marks);
    return nt.fromReplace(e, this.pos, this.pos + 1, new ne(j.from(i), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return Mt.empty;
  }
  invert(e) {
    return new zn(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new zn(t.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number" || typeof t.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new zn(t.pos, t.attr, t.value);
  }
}
yt.jsonID("attr", zn);
class Qn extends yt {
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
    return nt.ok(r);
  }
  getMap() {
    return Mt.empty;
  }
  invert(e) {
    return new Qn(this.attr, e.attrs[this.attr]);
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
    return new Qn(t.attr, t.value);
  }
}
yt.jsonID("docAttr", Qn);
let On = class extends Error {
};
On = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
On.prototype = Object.create(Error.prototype);
On.prototype.constructor = On;
On.prototype.name = "TransformError";
class Xa {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new Rr();
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
      throw new On(t.failed);
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
      r && (e = i.map(e, 1), t = i.map(t, -1)), i.forEach((o, s, l, c) => {
        e = Math.min(e, l), t = Math.max(t, c);
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
  replace(e, t = e, r = ne.empty) {
    let i = jr(this.doc, e, t, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, r) {
    return this.replace(e, t, new ne(j.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, t) {
    return this.replace(e, t, ne.empty);
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
    return Ya(this, e, t, r), this;
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
    return Ua(this, e, t, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return Ga(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return Da(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return Wa(this, e, t), this;
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
    return Ba(this, e, t, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, r = null, i) {
    return Ha(this, e, t, r, i), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  The `pos` addresses the document content. Use `setDocAttribute`
  to set attributes on the document itself.
  */
  setNodeAttribute(e, t, r) {
    return this.step(new zn(e, t, r)), this;
  }
  /**
  Set a single attribute on the document to a new value.
  */
  setDocAttribute(e, t) {
    return this.step(new Qn(e, t)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(e, t) {
    return this.step(new ln(e, t)), this;
  }
  /**
  Remove a mark (or all marks of the given type) from the node at
  position `pos`.
  */
  removeNodeMark(e, t) {
    let r = this.doc.nodeAt(e);
    if (!r)
      throw new RangeError("No node at position " + e);
    if (t instanceof He)
      t.isInSet(r.marks) && this.step(new wn(e, t));
    else {
      let i = r.marks, o, s = [];
      for (; o = t.isInSet(i); )
        s.push(new wn(e, o)), i = o.removeFromSet(i);
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
    return _a(this, e, t, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, r) {
    return Ia(this, e, t, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, r) {
    return $a(this, e, t, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, t, r) {
    return $i(this, e, t, r), this;
  }
}
const ei = /* @__PURE__ */ Object.create(null);
class Ye {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, r) {
    this.$anchor = e, this.$head = t, this.ranges = r || [new Qa(e.min(t), e.max(t))];
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
  replace(e, t = ne.empty) {
    let r = t.content.lastChild, i = null;
    for (let l = 0; l < t.openEnd; l++)
      i = r, r = r.lastChild;
    let o = e.steps.length, s = this.ranges;
    for (let l = 0; l < s.length; l++) {
      let { $from: c, $to: a } = s[l], u = e.mapping.slice(o);
      e.replaceRange(u.map(c.pos), u.map(a.pos), l ? ne.empty : t), l == 0 && yo(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
    }
  }
  /**
  Replace the selection with the given node, appending the changes
  to the given transaction.
  */
  replaceWith(e, t) {
    let r = e.steps.length, i = this.ranges;
    for (let o = 0; o < i.length; o++) {
      let { $from: s, $to: l } = i[o], c = e.mapping.slice(r), a = c.map(s.pos), u = c.map(l.pos);
      o ? e.deleteRange(a, u) : (e.replaceRangeWith(a, u, t), yo(e, r, t.isInline ? -1 : 1));
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
    let i = e.parent.inlineContent ? new Et(e) : Mn(e.node(0), e.parent, e.pos, e.index(), t, r);
    if (i)
      return i;
    for (let o = e.depth - 1; o >= 0; o--) {
      let s = t < 0 ? Mn(e.node(0), e.node(o), e.before(o + 1), e.index(o), t, r) : Mn(e.node(0), e.node(o), e.after(o + 1), e.index(o) + 1, t, r);
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
    return this.findFrom(e, t) || this.findFrom(e, -t) || new _t(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return Mn(e, e, 0, 0, 1) || new _t(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return Mn(e, e, e.content.size, e.childCount, -1) || new _t(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = ei[t.type];
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
    if (e in ei)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return ei[e] = t, t.prototype.jsonID = e, t;
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
    return Et.between(this.$anchor, this.$head).getBookmark();
  }
}
Ye.prototype.visible = !0;
class Qa {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let mo = !1;
function go(n) {
  !mo && !n.parent.inlineContent && (mo = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class Et extends Ye {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    go(e), go(t), super(e, t);
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
      return Ye.near(r);
    let i = e.resolve(t.map(this.anchor));
    return new Et(i.parent.inlineContent ? i : r, r);
  }
  replace(e, t = ne.empty) {
    if (super.replace(e, t), t == ne.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof Et && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new Wr(this.anchor, this.head);
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
    return new Et(e.resolve(t.anchor), e.resolve(t.head));
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
      let o = Ye.findFrom(t, r, !0) || Ye.findFrom(t, -r, !0);
      if (o)
        t = o.$head;
      else
        return Ye.near(t, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = t : (e = (Ye.findFrom(e, -r, !0) || Ye.findFrom(e, r, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new Et(e, t);
  }
}
Ye.jsonID("text", Et);
class Wr {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new Wr(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return Et.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class _e extends Ye {
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
    return r ? Ye.near(o) : new _e(o);
  }
  content() {
    return new ne(j.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof _e && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new zi(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new _e(e.resolve(t.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, t) {
    return new _e(e.resolve(t));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
_e.prototype.visible = !1;
Ye.jsonID("node", _e);
class zi {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new Wr(r, r) : new zi(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && _e.isSelectable(r) ? new _e(t) : Ye.near(t);
  }
}
class _t extends Ye {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = ne.empty) {
    if (t == ne.empty) {
      e.delete(0, e.doc.content.size);
      let r = Ye.atStart(e.doc);
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
    return new _t(e);
  }
  map(e) {
    return new _t(e);
  }
  eq(e) {
    return e instanceof _t;
  }
  getBookmark() {
    return Za;
  }
}
Ye.jsonID("all", _t);
const Za = {
  map() {
    return this;
  },
  resolve(n) {
    return new _t(n);
  }
};
function Mn(n, e, t, r, i, o = !1) {
  if (e.inlineContent)
    return Et.create(n, t);
  for (let s = r - (i > 0 ? 0 : 1); i > 0 ? s < e.childCount : s >= 0; s += i) {
    let l = e.child(s);
    if (l.isAtom) {
      if (!o && _e.isSelectable(l))
        return _e.create(n, t - (i < 0 ? l.nodeSize : 0));
    } else {
      let c = Mn(n, l, t + i, i < 0 ? l.childCount : 0, i, o);
      if (c)
        return c;
    }
    t += l.nodeSize * i;
  }
  return null;
}
function yo(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e)
    return;
  let i = n.steps[r];
  if (!(i instanceof tt || i instanceof st))
    return;
  let o = n.mapping.maps[r], s;
  o.forEach((l, c, a, u) => {
    s == null && (s = u);
  }), n.setSelection(Ye.near(n.doc.resolve(s), t));
}
function xo(n, e) {
  return !e || !n ? n : n.bind(e);
}
class pr {
  constructor(e, t, r) {
    this.name = e, this.init = xo(t.init, r), this.apply = xo(t.apply, r);
  }
}
new pr("doc", {
  init(n) {
    return n.doc || n.schema.topNodeType.createAndFill();
  },
  apply(n) {
    return n.doc;
  }
}), new pr("selection", {
  init(n, e) {
    return n.selection || Ye.atStart(e.doc);
  },
  apply(n) {
    return n.selection;
  }
}), new pr("storedMarks", {
  init(n) {
    return n.storedMarks || null;
  },
  apply(n, e, t, r) {
    return r.selection.$cursor ? n.storedMarks : null;
  }
}), new pr("scrollToSelection", {
  init() {
    return 0;
  },
  apply(n, e) {
    return n.scrolledIntoView ? e + 1 : e;
  }
});
const Hs = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function _s(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const js = (n, e, t) => {
  let r = _s(n, t);
  if (!r)
    return !1;
  let i = Di(r);
  if (!i) {
    let s = r.blockRange(), l = s && Fn(s);
    return l == null ? !1 : (e && e(n.tr.lift(s, l).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (Xs(n, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (Pn(o, "end") || _e.isSelectable(o)))
    for (let s = r.depth; ; s--) {
      let l = jr(n.doc, r.before(s), r.after(s), ne.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let c = n.tr.step(l);
          c.setSelection(Pn(o, "end") ? Ye.findFrom(c.doc.resolve(c.mapping.map(i.pos, -1)), -1) : _e.create(c.doc, i.pos - o.nodeSize)), e(c.scrollIntoView());
        }
        return !0;
      }
      if (s == 1 || r.node(s - 1).childCount > 1)
        break;
    }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos - o.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, eu = (n, e, t) => {
  let r = _s(n, t);
  if (!r)
    return !1;
  let i = Di(r);
  return i ? Ws(n, i, e) : !1;
}, tu = (n, e, t) => {
  let r = Ks(n, t);
  if (!r)
    return !1;
  let i = Oi(r);
  return i ? Ws(n, i, e) : !1;
};
function Ws(n, e, t) {
  let r = e.nodeBefore, i = r, o = e.pos - 1;
  for (; !i.isTextblock; o--) {
    if (i.type.spec.isolating)
      return !1;
    let u = i.lastChild;
    if (!u)
      return !1;
    i = u;
  }
  let s = e.nodeAfter, l = s, c = e.pos + 1;
  for (; !l.isTextblock; c++) {
    if (l.type.spec.isolating)
      return !1;
    let u = l.firstChild;
    if (!u)
      return !1;
    l = u;
  }
  let a = jr(n.doc, o, c, ne.empty);
  if (!a || a.from != o || a instanceof tt && a.slice.size >= c - o)
    return !1;
  if (t) {
    let u = n.tr.step(a);
    u.setSelection(Et.create(u.doc, o)), t(u.scrollIntoView());
  }
  return !0;
}
function Pn(n, e, t = !1) {
  for (let r = n; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (t && r.childCount != 1)
      return !1;
  }
  return !1;
}
const qs = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    o = Di(r);
  }
  let s = o && o.nodeBefore;
  return !s || !_e.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(_e.create(n.doc, o.pos - s.nodeSize)).scrollIntoView()), !0);
};
function Di(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function Ks(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const Js = (n, e, t) => {
  let r = Ks(n, t);
  if (!r)
    return !1;
  let i = Oi(r);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (Xs(n, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (Pn(o, "start") || _e.isSelectable(o))) {
    let s = jr(n.doc, r.before(), r.after(), ne.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let l = n.tr.step(s);
        l.setSelection(Pn(o, "start") ? Ye.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : _e.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos, i.pos + o.nodeSize).scrollIntoView()), !0) : !1;
}, Vs = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    o = Oi(r);
  }
  let s = o && o.nodeAfter;
  return !s || !_e.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(_e.create(n.doc, o.pos)).scrollIntoView()), !0);
};
function Oi(n) {
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
const nu = (n, e) => {
  let t = n.selection, r = t instanceof _e, i;
  if (r) {
    if (t.node.isTextblock || !kn(n.doc, t.from))
      return !1;
    i = t.from;
  } else if (i = _r(n.doc, t.from, -1), i == null)
    return !1;
  if (e) {
    let o = n.tr.join(i);
    r && o.setSelection(_e.create(o.doc, i - n.doc.resolve(i).nodeBefore.nodeSize)), e(o.scrollIntoView());
  }
  return !0;
}, ru = (n, e) => {
  let t = n.selection, r;
  if (t instanceof _e) {
    if (t.node.isTextblock || !kn(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = _r(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, iu = (n, e) => {
  let { $from: t, $to: r } = n.selection, i = t.blockRange(r), o = i && Fn(i);
  return o == null ? !1 : (e && e(n.tr.lift(i, o).scrollIntoView()), !0);
}, Ys = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function Pi(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const ou = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(r))
    return !1;
  let i = t.node(-1), o = t.indexAfter(-1), s = Pi(i.contentMatchAt(o));
  if (!s || !i.canReplaceWith(o, o, s))
    return !1;
  if (e) {
    let l = t.after(), c = n.tr.replaceWith(l, l, s.createAndFill());
    c.setSelection(Ye.near(c.doc.resolve(l), 1)), e(c.scrollIntoView());
  }
  return !0;
}, Us = (n, e) => {
  let t = n.selection, { $from: r, $to: i } = t;
  if (t instanceof _t || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = Pi(i.parent.contentMatchAt(i.indexAfter()));
  if (!o || !o.isTextblock)
    return !1;
  if (e) {
    let s = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = n.tr.insert(s, o.createAndFill());
    l.setSelection(Et.create(l.doc, s + 1)), e(l.scrollIntoView());
  }
  return !0;
}, Gs = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let o = t.before();
    if (Xt(n.doc, o))
      return e && e(n.tr.split(o).scrollIntoView()), !0;
  }
  let r = t.blockRange(), i = r && Fn(r);
  return i == null ? !1 : (e && e(n.tr.lift(r, i).scrollIntoView()), !0);
};
function su(n) {
  return (e, t) => {
    if (e.selection instanceof _e && e.selection.node.isBlock) {
      let { $from: p } = e.selection;
      return !p.parentOffset || !Xt(e.doc, p.pos) ? !1 : (t && t(e.tr.split(p.pos).scrollIntoView()), !0);
    }
    if (!e.selection.$from.depth)
      return !1;
    let r = e.tr;
    !e.selection.empty && (e.selection instanceof Et || e.selection instanceof _t) && r.deleteSelection();
    let { $from: i } = r.selection, o = r.steps.length, s = [], l, c, a = !1, u = !1;
    for (let p = i.depth; ; p--)
      if (i.node(p).isBlock) {
        a = i.end(p) == i.pos + (i.depth - p), u = i.start(p) == i.pos - (i.depth - p), c = Pi(i.node(p - 1).contentMatchAt(i.indexAfter(p - 1))), s.unshift(a && c ? { type: c } : null), l = p;
        break;
      } else {
        if (p == 1)
          return !1;
        s.unshift(null);
      }
    let d = i.pos, f = Xt(r.doc, d, s.length, s);
    if (f || (s[0] = c ? { type: c } : null, f = Xt(r.doc, d, s.length, s)), !f)
      return !1;
    if (r.split(d, s.length, s), !a && u && i.node(l).type != c) {
      let p = r.mapping.slice(o), m = p.map(i.before(l)), g = r.doc.resolve(m);
      c && i.node(l - 1).canReplaceWith(g.index(), g.index() + 1, c) && r.setNodeMarkup(p.map(i.before(l)), c);
    }
    return t && t(r.scrollIntoView()), !0;
  };
}
const lu = su(), cu = (n, e) => {
  let { $from: t, to: r } = n.selection, i, o = t.sharedDepth(r);
  return o == 0 ? !1 : (i = t.before(o), e && e(n.tr.setSelection(_e.create(n.doc, i))), !0);
};
function au(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(o - 1, o) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || kn(n.doc, e.pos)) ? !1 : (t && t(n.tr.join(e.pos).scrollIntoView()), !0);
}
function Xs(n, e, t, r) {
  let i = e.nodeBefore, o = e.nodeAfter, s, l, c = i.type.spec.isolating || o.type.spec.isolating;
  if (!c && au(n, e, t))
    return !0;
  let a = !c && e.parent.canReplace(e.index(), e.index() + 1);
  if (a && (s = (l = i.contentMatchAt(i.childCount)).findWrapping(o.type)) && l.matchType(s[0] || o.type).validEnd) {
    if (t) {
      let p = e.pos + o.nodeSize, m = j.empty;
      for (let y = s.length - 1; y >= 0; y--)
        m = j.from(s[y].create(null, m));
      m = j.from(i.copy(m));
      let g = n.tr.step(new st(e.pos - 1, p, e.pos, p, new ne(m, 1, 0), s.length, !0)), b = g.doc.resolve(p + 2 * s.length);
      b.nodeAfter && b.nodeAfter.type == i.type && kn(g.doc, b.pos) && g.join(b.pos), t(g.scrollIntoView());
    }
    return !0;
  }
  let u = o.type.spec.isolating || r > 0 && c ? null : Ye.findFrom(e, 1), d = u && u.$from.blockRange(u.$to), f = d && Fn(d);
  if (f != null && f >= e.depth)
    return t && t(n.tr.lift(d, f).scrollIntoView()), !0;
  if (a && Pn(o, "start", !0) && Pn(i, "end")) {
    let p = i, m = [];
    for (; m.push(p), !p.isTextblock; )
      p = p.lastChild;
    let g = o, b = 1;
    for (; !g.isTextblock; g = g.firstChild)
      b++;
    if (p.canReplace(p.childCount, p.childCount, g.content)) {
      if (t) {
        let y = j.empty;
        for (let z = m.length - 1; z >= 0; z--)
          y = j.from(m[z].copy(y));
        let $ = n.tr.step(new st(e.pos - m.length, e.pos + o.nodeSize, e.pos + b, e.pos + o.nodeSize - b, new ne(y, m.length, 0), 0, !0));
        t($.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function Qs(n) {
  return function(e, t) {
    let r = e.selection, i = n < 0 ? r.$from : r.$to, o = i.depth;
    for (; i.node(o).isInline; ) {
      if (!o)
        return !1;
      o--;
    }
    return i.node(o).isTextblock ? (t && t(e.tr.setSelection(Et.create(e.doc, n < 0 ? i.start(o) : i.end(o)))), !0) : !1;
  };
}
const uu = Qs(-1), du = Qs(1);
function fu(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o), l = s && $s(s, n, e);
    return l ? (r && r(t.tr.wrap(s, l).scrollIntoView()), !0) : !1;
  };
}
function bo(n, e = null) {
  return function(t, r) {
    let i = !1;
    for (let o = 0; o < t.selection.ranges.length && !i; o++) {
      let { $from: { pos: s }, $to: { pos: l } } = t.selection.ranges[o];
      t.doc.nodesBetween(s, l, (c, a) => {
        if (i)
          return !1;
        if (!(!c.isTextblock || c.hasMarkup(n, e)))
          if (c.type == n)
            i = !0;
          else {
            let u = t.doc.resolve(a), d = u.index();
            i = u.parent.canReplaceWith(d, d + 1, n);
          }
      });
    }
    if (!i)
      return !1;
    if (r) {
      let o = t.tr;
      for (let s = 0; s < t.selection.ranges.length; s++) {
        let { $from: { pos: l }, $to: { pos: c } } = t.selection.ranges[s];
        o.setBlockType(l, c, n, e);
      }
      r(o.scrollIntoView());
    }
    return !0;
  };
}
function Li(...n) {
  return function(e, t, r) {
    for (let i = 0; i < n.length; i++)
      if (n[i](e, t, r))
        return !0;
    return !1;
  };
}
Li(Hs, js, qs);
Li(Hs, Js, Vs);
Li(Ys, Us, Gs, lu);
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function hu(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o);
    if (!s)
      return !1;
    let l = r ? t.tr : null;
    return pu(l, s, n, e) ? (r && r(l.scrollIntoView()), !0) : !1;
  };
}
function pu(n, e, t, r = null) {
  let i = !1, o = e, s = e.$from.doc;
  if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(t) && e.startIndex == 0) {
    if (e.$from.index(e.depth - 1) == 0)
      return !1;
    let c = s.resolve(e.start - 2);
    o = new Cr(c, c, e.depth), e.endIndex < e.parent.childCount && (e = new Cr(e.$from, s.resolve(e.$to.end(e.depth)), e.depth)), i = !0;
  }
  let l = $s(o, t, r, e);
  return l ? (n && mu(n, e, l, i, t), !0) : !1;
}
function mu(n, e, t, r, i) {
  let o = j.empty;
  for (let u = t.length - 1; u >= 0; u--)
    o = j.from(t[u].type.create(t[u].attrs, o));
  n.step(new st(e.start - (r ? 2 : 0), e.end, e.start, e.end, new ne(o, 0, 0), t.length, !0));
  let s = 0;
  for (let u = 0; u < t.length; u++)
    t[u].type == i && (s = u + 1);
  let l = t.length - s, c = e.start + t.length - (r ? 2 : 0), a = e.parent;
  for (let u = e.startIndex, d = e.endIndex, f = !0; u < d; u++, f = !1)
    !f && Xt(n.doc, c, l) && (n.split(c, l), c += 2 * l), c += a.child(u).nodeSize;
  return n;
}
function gu(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (s) => s.childCount > 0 && s.firstChild.type == n);
    return o ? t ? r.node(o.depth - 1).type == n ? yu(e, t, n, o) : xu(e, t, o) : !0 : !1;
  };
}
function yu(n, e, t, r) {
  let i = n.tr, o = r.end, s = r.$to.end(r.depth);
  o < s && (i.step(new st(o - 1, s, o, s, new ne(j.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new Cr(i.doc.resolve(r.$from.pos), i.doc.resolve(s), r.depth));
  const l = Fn(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let c = i.doc.resolve(i.mapping.map(o, -1) - 1);
  return kn(i.doc, c.pos) && c.nodeBefore.type == c.nodeAfter.type && i.join(c.pos), e(i.scrollIntoView()), !0;
}
function xu(n, e, t) {
  let r = n.tr, i = t.parent;
  for (let p = t.end, m = t.endIndex - 1, g = t.startIndex; m > g; m--)
    p -= i.child(m).nodeSize, r.delete(p - 1, p + 1);
  let o = r.doc.resolve(t.start), s = o.nodeAfter;
  if (r.mapping.map(t.end) != t.start + o.nodeAfter.nodeSize)
    return !1;
  let l = t.startIndex == 0, c = t.endIndex == i.childCount, a = o.node(-1), u = o.index(-1);
  if (!a.canReplace(u + (l ? 0 : 1), u + 1, s.content.append(c ? j.empty : j.from(i))))
    return !1;
  let d = o.pos, f = d + s.nodeSize;
  return r.step(new st(d - (l ? 1 : 0), f + (c ? 1 : 0), d + 1, f - 1, new ne((l ? j.empty : j.from(i.copy(j.empty))).append(c ? j.empty : j.from(i.copy(j.empty))), l ? 0 : 1, c ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function bu(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (a) => a.childCount > 0 && a.firstChild.type == n);
    if (!o)
      return !1;
    let s = o.startIndex;
    if (s == 0)
      return !1;
    let l = o.parent, c = l.child(s - 1);
    if (c.type != n)
      return !1;
    if (t) {
      let a = c.lastChild && c.lastChild.type == l.type, u = j.from(a ? n.create() : null), d = new ne(j.from(n.create(null, j.from(l.type.create(null, u)))), a ? 3 : 1, 0), f = o.start, p = o.end;
      t(e.tr.step(new st(f - (a ? 3 : 1), p, f, p, d, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function Zs(n) {
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
var vu = class el {
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
    return Object.fromEntries(Object.entries(e).map(([l, c]) => [l, (...u) => {
      const d = c(...u)(s);
      return !o.getMeta("preventDispatch") && !this.hasCustomState && i.dispatch(o), d;
    }]));
  }
  get chain() {
    return () => this.createChain();
  }
  get can() {
    return () => this.createCan();
  }
  createChain(e, t = !0) {
    const { rawCommands: r, editor: i, state: o } = this, { view: s } = i, l = [], c = !!e, a = e || o.tr, u = () => (!c && t && !a.getMeta("preventDispatch") && !this.hasCustomState && s.dispatch(a), l.every((f) => f === !0)), d = {
      ...Object.fromEntries(Object.entries(r).map(([f, p]) => [f, (...g) => {
        const b = this.buildProps(a, t), y = p(...g)(b);
        return l.push(y), d;
      }])),
      run: u
    };
    return d;
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
      ...Object.fromEntries(Object.entries(t).map(([l, c]) => [l, (...a) => c(...a)({
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
    const e = el.createFakeChain();
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
      state: Zs({
        state: o,
        transaction: e
      }),
      dispatch: t ? () => {
      } : void 0,
      chain: () => this.createChain(e, t),
      can: () => this.createCan(e),
      get commands() {
        return Object.fromEntries(Object.entries(r).map(([c, a]) => [c, (...u) => a(...u)(l)]));
      }
    };
    return l;
  }
};
const wu = () => ({ editor: n, view: e }) => (requestAnimationFrame(() => {
  if (!n.isDestroyed) {
    var t;
    e.dom.blur(), (t = window) === null || t === void 0 || (t = t.getSelection()) === null || t === void 0 || t.removeAllRanges();
  }
}), !0), ku = (n = !0) => ({ commands: e }) => e.setContent("", { emitUpdate: n }), Su = () => ({ state: n, tr: e, dispatch: t }) => {
  const { selection: r } = e, { ranges: i } = r;
  return t && i.forEach(({ $from: o, $to: s }) => {
    n.doc.nodesBetween(o.pos, s.pos, (l, c) => {
      if (l.type.isText) return;
      const { doc: a, mapping: u } = e, d = a.resolve(u.map(c)), f = a.resolve(u.map(c + l.nodeSize)), p = d.blockRange(f);
      if (!p) return;
      const m = Fn(p);
      if (l.type.isTextblock) {
        const { defaultType: g } = d.parent.contentMatchAt(d.index());
        e.setNodeMarkup(p.start, g);
      }
      (m || m === 0) && e.lift(p, m);
    });
  }), !0;
}, Nu = (n) => (e) => n(e), Tu = () => ({ state: n, dispatch: e }) => Us(n, e), Cu = (n, e) => ({ editor: t, tr: r }) => {
  const { state: i } = t, o = i.doc.slice(n.from, n.to);
  r.deleteRange(n.from, n.to);
  const s = r.mapping.map(e);
  return r.insert(s, o.content), r.setSelection(new $t(r.doc.resolve(Math.max(s - 1, 0)))), !0;
}, Eu = () => ({ tr: n, dispatch: e }) => {
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
function gt(n, e) {
  if (typeof n == "string") {
    if (!e.nodes[n]) throw Error(`There is no node type named '${n}'. Maybe you forgot to add the extension?`);
    return e.nodes[n];
  }
  return n;
}
const Mu = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const i = gt(n, t.schema), o = e.selection.$anchor;
  for (let s = o.depth; s > 0; s -= 1) if (o.node(s).type === i) {
    if (r) {
      const l = o.before(s), c = o.after(s);
      e.delete(l, c).scrollIntoView();
    }
    return !0;
  }
  return !1;
}, Ru = (n) => ({ tr: e, dispatch: t }) => {
  const { from: r, to: i } = n;
  return t && e.delete(r, i), !0;
}, Au = (n) => n.content ? /^text(\*|\+)/.test(n.content) : !1, vo = (n, e, t) => {
  if (!n.parent.isInline || t === "left" && n.pos > n.start() || t === "right" && n.pos < n.end()) return n.pos;
  const r = e.nodes[n.parent.type.name].spec;
  return Au(r) ? t === "left" ? n.start() - 1 : n.end() + 1 : n.pos;
}, Iu = (n, e, t) => ({
  from: vo(n, t, "left"),
  to: vo(e, t, "right")
}), $u = () => ({ state: n, dispatch: e }) => {
  if (n.selection.empty) return !1;
  if (e) {
    const t = n.tr, { ranges: r } = n.selection, i = t.steps.length;
    r.forEach((o) => {
      const s = t.mapping.slice(i), l = t.doc.resolve(s.map(o.$from.pos)), c = t.doc.resolve(s.map(o.$to.pos)), { from: a, to: u } = Iu(l, c, n.schema);
      t.deleteRange(a, u);
    }), t.selection.empty || t.setSelection($t.near(t.doc.resolve(t.selection.from))), t.scrollIntoView(), e(t);
  }
  return !0;
}, zu = () => ({ commands: n }) => n.keyboardShortcut("Enter"), Du = () => ({ state: n, dispatch: e }) => ou(n, e);
function Ou(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
function Ar(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => t.strict ? e[i] === n[i] : Ou(e[i]) ? e[i].test(n[i]) : e[i] === n[i]) : !0;
}
function tl(n, e, t = {}) {
  return n.find((r) => r.type === e && Ar(Object.fromEntries(Object.keys(t).map((i) => [i, r.attrs[i]])), t));
}
function wo(n, e, t = {}) {
  return !!tl(n, e, t);
}
function nl(n, e, t) {
  if (!n || !e) return;
  let r = n.parent.childAfter(n.parentOffset);
  if ((!r.node || !r.node.marks.some((c) => c.type === e)) && (r = n.parent.childBefore(n.parentOffset)), !r.node || !r.node.marks.some((c) => c.type === e)) return;
  if (!t) {
    const c = r.node.marks.find((a) => a.type === e);
    c && (t = c.attrs);
  }
  if (!tl([...r.node.marks], e, t)) return;
  let i = r.index, o = n.start() + r.offset, s = i + 1, l = o + r.node.nodeSize;
  for (; i > 0 && wo([...n.parent.child(i - 1).marks], e, t); )
    i -= 1, o -= n.parent.child(i).nodeSize;
  for (; s < n.parent.childCount && wo([...n.parent.child(s).marks], e, t); )
    l += n.parent.child(s).nodeSize, s += 1;
  return {
    from: o,
    to: l
  };
}
function un(n, e) {
  if (typeof n == "string") {
    if (!e.marks[n]) throw Error(`There is no mark type named '${n}'. Maybe you forgot to add the extension?`);
    return e.marks[n];
  }
  return n;
}
const Pu = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const o = un(n, r.schema), { doc: s, selection: l } = t, { $from: c, from: a, to: u } = l;
  if (i) {
    const d = nl(c, o, e);
    if (d && d.from <= a && d.to >= u) {
      const f = $t.create(s, d.from, d.to);
      t.setSelection(f);
    }
  }
  return !0;
}, Lu = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let r = 0; r < t.length; r += 1) if (t[r](e)) return !0;
  return !1;
};
function rl(n) {
  return n instanceof $t;
}
function hn(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function Bu(n, e = null) {
  if (!e) return null;
  const t = An.atStart(n), r = An.atEnd(n);
  if (e === "start" || e === !0) return t;
  if (e === "end") return r;
  const i = t.from, o = r.to;
  return e === "all" ? $t.create(n, hn(0, i, o), hn(n.content.size, i, o)) : $t.create(n, hn(e, i, o), hn(e, i, o));
}
function ko() {
  return ["Android"].includes(navigator.platform) || /android/i.test(navigator.userAgent);
}
function Ir() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
function Fu() {
  return typeof navigator < "u" ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : !1;
}
const Hu = (n = null, e = {}) => ({ editor: t, view: r, tr: i, dispatch: o }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const s = () => {
    (Ir() || ko()) && r.dom.focus(), Fu() && !Ir() && !ko() && r.dom.focus({ preventScroll: !0 }), requestAnimationFrame(() => {
      t.isDestroyed || (r.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  try {
    if (r.hasFocus() && n === null || n === !1) return !0;
  } catch {
    return !1;
  }
  if (o && n === null && !rl(t.state.selection))
    return s(), !0;
  const l = Bu(i.doc, n) || t.state.selection, c = t.state.selection.eq(l);
  return o && (c || i.setSelection(l), c && i.storedMarks && i.setStoredMarks(i.storedMarks), s()), !0;
}, _u = (n, e) => (t) => n.every((r, i) => e(r, {
  ...t,
  index: i
})), ju = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt({
  from: t.selection.from,
  to: t.selection.to
}, n, e), il = (n) => {
  const e = n.childNodes;
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const r = e[t];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? n.removeChild(r) : r.nodeType === 1 && il(r);
  }
  return n;
};
function mr(n) {
  if (typeof window > "u") throw new Error("[tiptap error]: there is no window object available, so this function cannot be used");
  const e = `<body>${n}</body>`, t = new window.DOMParser().parseFromString(e, "text/html").body;
  return il(t);
}
function ol(n) {
  return typeof (n == null ? void 0 : n.nodesBetween) == "function";
}
function Ln(n, e, t) {
  if (ol(n)) return n;
  const r = typeof n == "object" && n !== null;
  t = {
    slice: !0,
    parseOptions: {},
    ...t
  };
  const i = typeof n == "string";
  if (r) try {
    if (Array.isArray(n) && n.length > 0) return j.fromArray(n.map((s) => e.nodeFromJSON(s)));
    const o = e.nodeFromJSON(n);
    return t.errorOnInvalidContent && o.check(), o;
  } catch (o) {
    if (t.errorOnInvalidContent) throw new Error("[tiptap error]: Invalid JSON content", { cause: o });
    return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", o), Ln("", e, t);
  }
  if (i) {
    if (t.errorOnInvalidContent) {
      let s = !1, l = "";
      const c = new Sa({
        topNode: e.spec.topNode,
        marks: e.spec.marks,
        nodes: e.spec.nodes.append({ __tiptap__private__unknown__catch__all__node: {
          content: "inline*",
          group: "block",
          parseDOM: [{
            tag: "*",
            getAttrs: (a) => (s = !0, l = typeof a == "string" ? a : a.outerHTML, null)
          }]
        } })
      });
      if (t.slice ? $n.fromSchema(c).parseSlice(mr(n), t.parseOptions) : $n.fromSchema(c).parse(mr(n), t.parseOptions), t.errorOnInvalidContent && s) throw new Error("[tiptap error]: Invalid HTML content", { cause: /* @__PURE__ */ new Error(`Invalid element found: ${l}`) });
    }
    const o = $n.fromSchema(e);
    return t.slice ? o.parseSlice(mr(n), t.parseOptions).content : o.parse(mr(n), t.parseOptions);
  }
  return Ln("", e, t);
}
function sl(n) {
  return !("type" in n);
}
function ll(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e) return;
  const i = n.steps[r];
  if (!(i instanceof tt || i instanceof st)) return;
  const o = n.mapping.maps[r];
  let s = 0;
  o.forEach((l, c, a, u) => {
    s === 0 && (s = u);
  }), n.setSelection(An.near(n.doc.resolve(s), t));
}
const Wu = (n, e, t) => ({ tr: r, dispatch: i, editor: o }) => {
  if (i) {
    t = {
      parseOptions: o.options.parseOptions,
      updateSelection: !0,
      applyInputRules: !1,
      applyPasteRules: !1,
      ...t
    };
    let l;
    const c = (b) => {
      o.emit("contentError", {
        editor: o,
        error: b,
        disableCollaboration: () => {
          "collaboration" in o.storage && typeof o.storage.collaboration == "object" && o.storage.collaboration && (o.storage.collaboration.isDisabled = !0);
        }
      });
    }, a = {
      preserveWhitespace: "full",
      ...t.parseOptions
    };
    if (!t.errorOnInvalidContent && !o.options.enableContentCheck && o.options.emitContentError) try {
      Ln(e, o.schema, {
        parseOptions: a,
        errorOnInvalidContent: !0
      });
    } catch (b) {
      c(b);
    }
    try {
      var s;
      l = Ln(e, o.schema, {
        parseOptions: a,
        errorOnInvalidContent: (s = t.errorOnInvalidContent) !== null && s !== void 0 ? s : o.options.enableContentCheck
      });
    } catch (b) {
      return c(b), !1;
    }
    let { from: u, to: d } = typeof n == "number" ? {
      from: n,
      to: n
    } : {
      from: n.from,
      to: n.to
    }, f = !0, p = !0;
    const m = sl(l) ? l.content : [l];
    if (m.forEach((b) => {
      b.check(), f = f ? b.isText && b.marks.length === 0 : !1, p = p ? b.isBlock : !1;
    }), u === d && p) {
      const { parent: b } = r.doc.resolve(u);
      b.isTextblock && !b.type.spec.code && !b.childCount && (u -= 1, d += 1);
    }
    let g;
    if (f)
      Array.isArray(e) ? g = e.map((b) => b.text || "").join("") : ol(e) ? g = m.map((b) => {
        var y;
        return (y = b.text) !== null && y !== void 0 ? y : "";
      }).join("") : typeof e == "object" && e && e.text ? g = e.text : g = e, r.insertText(g, u, d);
    else {
      g = j.from(m);
      const b = r.doc.resolve(u), y = b.node(), $ = b.parentOffset === 0, z = y.isText || y.isTextblock, N = y.content.size > 0;
      $ && z && N && p && (u = Math.max(0, u - 1)), r.replaceWith(u, d, m);
    }
    t.updateSelection && ll(r, r.steps.length - 1, -1), t.applyInputRules && r.setMeta("applyInputRules", {
      from: u,
      text: g
    }), t.applyPasteRules && r.setMeta("applyPasteRules", {
      from: u,
      text: g
    });
  }
  return !0;
};
function cl(n) {
  for (let e = 0; e < n.edgeCount; e += 1) {
    const { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs()) return t;
  }
  return null;
}
const qu = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
  const { pos: i, attrs: o, content: s, updateSelection: l = !0 } = n;
  let c;
  typeof i == "number" ? c = e.doc.resolve(i) : i ? c = i : c = e.selection.$from;
  const a = cl(c.parent.contentMatchAt(c.index()));
  if (!a) return !1;
  const u = Object.keys(a.spec.attrs || {}), d = o ? Object.fromEntries(Object.entries(o).filter(([p]) => u.includes(p))) : {};
  let f;
  if (s) {
    const p = Ln(s, r.schema);
    f = a.createAndFill(d, p);
  } else f = a.createAndFill(d);
  return f ? (t && (e.insert(c.pos, f), l && ll(e, e.steps.length - 1, -1)), !0) : !1;
}, Ku = () => ({ state: n, dispatch: e }) => nu(n, e), Ju = () => ({ state: n, dispatch: e }) => ru(n, e), Vu = () => ({ state: n, dispatch: e }) => js(n, e), Yu = () => ({ state: n, dispatch: e }) => Js(n, e), Uu = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = _r(n.doc, n.selection.$from.pos, -1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Gu = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = _r(n.doc, n.selection.$from.pos, 1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Xu = () => ({ state: n, dispatch: e }) => eu(n, e), Qu = () => ({ state: n, dispatch: e }) => tu(n, e);
function al() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function Zu(n) {
  const e = n.split(/-(?!$)/);
  let t = e[e.length - 1];
  t === "Space" && (t = " ");
  let r, i, o, s;
  for (let l = 0; l < e.length - 1; l += 1) {
    const c = e[l];
    if (/^(cmd|meta|m)$/i.test(c)) s = !0;
    else if (/^a(lt)?$/i.test(c)) r = !0;
    else if (/^(c|ctrl|control)$/i.test(c)) i = !0;
    else if (/^s(hift)?$/i.test(c)) o = !0;
    else if (/^mod$/i.test(c))
      Ir() || al() ? s = !0 : i = !0;
    else throw new Error(`Unrecognized modifier name: ${c}`);
  }
  return r && (t = `Alt-${t}`), i && (t = `Ctrl-${t}`), s && (t = `Meta-${t}`), o && (t = `Shift-${t}`), t;
}
const ed = (n) => ({ editor: e, view: t, tr: r, dispatch: i }) => {
  const o = Zu(n).split(/-(?!$)/), s = o.find((a) => ![
    "Alt",
    "Ctrl",
    "Meta",
    "Shift"
  ].includes(a)), l = new KeyboardEvent("keydown", {
    key: s === "Space" ? " " : s,
    altKey: o.includes("Alt"),
    ctrlKey: o.includes("Ctrl"),
    metaKey: o.includes("Meta"),
    shiftKey: o.includes("Shift"),
    bubbles: !0,
    cancelable: !0
  }), c = e.captureTransaction(() => {
    t.someProp("handleKeyDown", (a) => a(t, l));
  });
  return c == null || c.steps.forEach((a) => {
    const u = a.map(r.mapping);
    u && i && r.maybeStep(u);
  }), !0;
};
function Bi(n, e, t = {}) {
  const { from: r, to: i, empty: o } = n.selection, s = e ? gt(e, n.schema) : null, l = [];
  n.doc.nodesBetween(r, i, (u, d) => {
    if (u.isText) return;
    const f = Math.max(r, d), p = Math.min(i, d + u.nodeSize);
    l.push({
      node: u,
      from: f,
      to: p
    });
  });
  const c = i - r, a = l.filter((u) => s ? s.name === u.node.type.name : !0).filter((u) => Ar(u.node.attrs, t, { strict: !1 }));
  return o ? !!a.length : a.reduce((u, d) => u + d.to - d.from, 0) >= c;
}
const td = (n, e = {}) => ({ state: t, dispatch: r }) => Bi(t, gt(n, t.schema), e) ? iu(t, r) : !1, nd = () => ({ state: n, dispatch: e }) => Gs(n, e), rd = (n) => ({ state: e, dispatch: t }) => {
  const r = gt(n, e.schema);
  return gu(r)(e, t);
}, id = () => ({ state: n, dispatch: e }) => Ys(n, e);
function ul(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function So(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((r, i) => (t.includes(i) || (r[i] = n[i]), r), {});
}
const od = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = ul(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = gt(n, r.schema)), l === "mark" && (s = un(n, r.schema));
  let c = !1;
  return t.selection.ranges.forEach((a) => {
    r.doc.nodesBetween(a.$from.pos, a.$to.pos, (u, d) => {
      o && o === u.type && (c = !0, i && t.setNodeMarkup(d, void 0, So(u.attrs, e))), s && u.marks.length && u.marks.forEach((f) => {
        s === f.type && (c = !0, i && t.addMark(d, d + u.nodeSize, s.create(So(f.attrs, e))));
      });
    });
  }), c;
}, sd = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), ld = () => ({ tr: n, dispatch: e }) => {
  if (e) {
    const t = new Jl(n.doc);
    n.setSelection(t);
  }
  return !0;
}, cd = () => ({ state: n, dispatch: e }) => qs(n, e), ad = () => ({ state: n, dispatch: e }) => Vs(n, e), ud = () => ({ state: n, dispatch: e }) => cu(n, e), dd = () => ({ state: n, dispatch: e }) => du(n, e), fd = () => ({ state: n, dispatch: e }) => uu(n, e);
function hd(n, e, t = {}, r = {}) {
  return Ln(n, e, {
    slice: !1,
    parseOptions: t,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
const pd = (n, { errorOnInvalidContent: e, emitUpdate: t = !0, parseOptions: r = {} } = {}) => ({ editor: i, tr: o, dispatch: s, commands: l }) => {
  const { doc: c } = o;
  if (r.preserveWhitespace !== "full") {
    const a = hd(n, i.schema, r, { errorOnInvalidContent: e ?? i.options.enableContentCheck });
    if (s) {
      const u = sl(a) ? a.content : [a];
      o.replaceWith(0, c.content.size, u).setMeta("preventUpdate", !t);
    }
    return !0;
  }
  return s && o.setMeta("preventUpdate", !t), l.insertContentAt({
    from: 0,
    to: c.content.size
  }, n, {
    parseOptions: r,
    errorOnInvalidContent: e ?? i.options.enableContentCheck
  });
};
function md(n, e) {
  const t = un(e, n.schema), { from: r, to: i, empty: o } = n.selection, s = [];
  o ? (n.storedMarks && s.push(...n.storedMarks), s.push(...n.selection.$head.marks())) : n.doc.nodesBetween(r, i, (c) => {
    s.push(...c.marks);
  });
  const l = s.find((c) => c.type.name === t.name);
  return l ? { ...l.attrs } : {};
}
function gd(n, e) {
  const t = new Xa(n);
  return e.forEach((r) => {
    r.steps.forEach((i) => {
      t.step(i);
    });
  }), t;
}
function yd(n, e) {
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
function Fi(n) {
  return (e) => yd(e.$from, n);
}
function Zn(n, e, t) {
  return n.config[e] === void 0 && n.parent ? Zn(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? Zn(n.parent, e, t) : null
  }) : n.config[e];
}
function xd(n) {
  return typeof n == "function";
}
function pi(n, e = void 0, ...t) {
  return xd(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function dl(n) {
  return {
    baseExtensions: n.filter((e) => e.type === "extension"),
    nodeExtensions: n.filter((e) => e.type === "node"),
    markExtensions: n.filter((e) => e.type === "mark")
  };
}
function bd(n, e, t) {
  const { from: r, to: i } = e, { blockSeparator: o = `

`, textSerializers: s = {} } = t || {};
  let l = "";
  return n.nodesBetween(r, i, (c, a, u, d) => {
    c.isBlock && a > r && (l += o);
    const f = s == null ? void 0 : s[c.type.name];
    if (f)
      return u && (l += f({
        node: c,
        pos: a,
        parent: u,
        index: d,
        range: e
      })), !1;
    if (c.isText) {
      var p;
      l += c == null || (p = c.text) === null || p === void 0 ? void 0 : p.slice(Math.max(r, a) - a, i - a);
    }
  }), l;
}
function vd(n) {
  return Object.fromEntries(Object.entries(n.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
function wd(n, e = JSON.stringify) {
  const t = {};
  return n.filter((r) => {
    const i = e(r);
    return Object.prototype.hasOwnProperty.call(t, i) ? !1 : t[i] = !0;
  });
}
function kd(n) {
  const e = wd(n);
  return e.length === 1 ? e : e.filter((t, r) => !e.filter((i, o) => o !== r).some((i) => t.oldRange.from >= i.oldRange.from && t.oldRange.to <= i.oldRange.to && t.newRange.from >= i.newRange.from && t.newRange.to <= i.newRange.to));
}
function Sd(n) {
  const { mapping: e, steps: t } = n, r = [];
  return e.maps.forEach((i, o) => {
    const s = [];
    if (i.ranges.length)
      i.forEach((l, c) => {
        s.push({
          from: l,
          to: c
        });
      });
    else {
      const { from: l, to: c } = t[o];
      if (l === void 0 || c === void 0) return;
      s.push({
        from: l,
        to: c
      });
    }
    s.forEach(({ from: l, to: c }) => {
      const a = e.slice(o).map(l, -1), u = e.slice(o).map(c), d = e.invert().map(a, -1), f = e.invert().map(u);
      r.push({
        oldRange: {
          from: d,
          to: f
        },
        newRange: {
          from: a,
          to: u
        }
      });
    });
  }), kd(r);
}
function br(n, e, t) {
  return Object.fromEntries(Object.entries(t).filter(([r]) => {
    const i = n.find((o) => o.type === e && o.name === r);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function Nd(n, e, t = {}) {
  const { empty: r, ranges: i } = n.selection, o = e ? un(e, n.schema) : null;
  if (r) return !!(n.storedMarks || n.selection.$from.marks()).filter((u) => o ? o.name === u.type.name : !0).find((u) => Ar(u.attrs, t, { strict: !1 }));
  let s = 0;
  const l = [];
  if (i.forEach(({ $from: u, $to: d }) => {
    const f = u.pos, p = d.pos;
    n.doc.nodesBetween(f, p, (m, g) => {
      if (o && m.inlineContent && !m.type.allowsMarkType(o)) return !1;
      if (!m.isText && !m.marks.length) return;
      const b = Math.max(f, g), y = Math.min(p, g + m.nodeSize), $ = y - b;
      s += $, l.push(...m.marks.map((z) => ({
        mark: z,
        from: b,
        to: y
      })));
    });
  }), s === 0) return !1;
  const c = l.filter((u) => o ? o.name === u.mark.type.name : !0).filter((u) => Ar(u.mark.attrs, t, { strict: !1 })).reduce((u, d) => u + d.to - d.from, 0), a = l.filter((u) => o ? u.mark.type !== o && u.mark.type.excludes(o) : !0).reduce((u, d) => u + d.to - d.from, 0);
  return (c > 0 ? c + a : c) >= s;
}
function ti(n, e) {
  const { nodeExtensions: t } = dl(e), r = t.find((o) => o.name === n);
  if (!r) return !1;
  const i = pi(Zn(r, "group", {
    name: r.name,
    options: r.options,
    storage: r.storage
  }));
  return typeof i != "string" ? !1 : i.split(" ").includes("list");
}
function fl(n, { checkChildren: e = !0, ignoreWhitespace: t = !1 } = {}) {
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
      i !== !1 && (fl(o, {
        ignoreWhitespace: t,
        checkChildren: e
      }) || (i = !1));
    }), i;
  }
  return !1;
}
function Td(n, e, t) {
  const { selection: r } = e;
  let i = null;
  if (rl(r) && (i = r.$cursor), i) {
    var o;
    const l = (o = n.storedMarks) !== null && o !== void 0 ? o : i.marks();
    return i.parent.type.allowsMarkType(t) && (!!t.isInSet(l) || !l.some((c) => c.type.excludes(t)));
  }
  const { ranges: s } = r;
  return s.some(({ $from: l, $to: c }) => {
    let a = l.depth === 0 ? n.doc.inlineContent && n.doc.type.allowsMarkType(t) : !1;
    return n.doc.nodesBetween(l.pos, c.pos, (u, d, f) => {
      if (a) return !1;
      if (u.isInline) {
        const p = !f || f.type.allowsMarkType(t), m = !!t.isInSet(u.marks) || !u.marks.some((g) => g.type.excludes(t));
        a = p && m;
      }
      return !a;
    }), a;
  });
}
const Cd = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = t, { empty: s, ranges: l } = o, c = un(n, r.schema);
  if (i)
    if (s) {
      const a = md(r, c);
      t.addStoredMark(c.create({
        ...a,
        ...e
      }));
    } else l.forEach((a) => {
      const u = a.$from.pos, d = a.$to.pos;
      r.doc.nodesBetween(u, d, (f, p) => {
        const m = Math.max(p, u), g = Math.min(p + f.nodeSize, d);
        f.marks.find((b) => b.type === c) ? f.marks.forEach((b) => {
          c === b.type && t.addMark(m, g, c.create({
            ...b.attrs,
            ...e
          }));
        }) : t.addMark(m, g, c.create(e));
      });
    });
  return Td(r, t, c);
}, Ed = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), Md = (n, e = {}) => ({ state: t, dispatch: r, chain: i }) => {
  const o = gt(n, t.schema);
  let s;
  return t.selection.$anchor.sameParent(t.selection.$head) && (s = t.selection.$anchor.parent.attrs), o.isTextblock ? i().command(({ commands: l }) => bo(o, {
    ...s,
    ...e
  })(t) ? !0 : l.clearNodes()).command(({ state: l }) => bo(o, {
    ...s,
    ...e
  })(l, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, Rd = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, i = hn(n, 0, r.content.size), o = Dn.create(r, i);
    e.setSelection(o);
  }
  return !0;
}, Ad = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = r;
  let s, l;
  return typeof e == "number" ? (s = e, l = e) : e && "from" in e && "to" in e ? (s = e.from, l = e.to) : (s = o.from, l = o.to), i && t.doc.nodesBetween(s, l, (c, a) => {
    c.isText || t.setNodeMarkup(a, void 0, {
      ...c.attrs,
      dir: n
    });
  }), !0;
}, Id = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, { from: i, to: o } = typeof n == "number" ? {
      from: n,
      to: n
    } : n, s = $t.atStart(r).from, l = $t.atEnd(r).to, c = hn(i, s, l), a = hn(o, s, l), u = $t.create(r, c, a);
    e.setSelection(u);
  }
  return !0;
}, $d = (n) => ({ state: e, dispatch: t }) => {
  const r = gt(n, e.schema);
  return bu(r)(e, t);
};
function No(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    n.tr.ensureMarks(r);
  }
}
const zd = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
  const { selection: o, doc: s } = e, { $from: l, $to: c } = o, a = i.extensionManager.attributes, u = br(a, l.node().type.name, l.node().attrs);
  if (o instanceof Dn && o.node.isBlock)
    return !l.parentOffset || !Xt(s, l.pos) ? !1 : (r && (n && No(t, i.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock) return !1;
  const d = c.parentOffset === c.parent.content.size, f = l.depth === 0 ? void 0 : cl(l.node(-1).contentMatchAt(l.indexAfter(-1)));
  let p = d && f ? [{
    type: f,
    attrs: u
  }] : void 0, m = Xt(e.doc, e.mapping.map(l.pos), 1, p);
  if (!p && !m && Xt(e.doc, e.mapping.map(l.pos), 1, f ? [{ type: f }] : void 0) && (m = !0, p = f ? [{
    type: f,
    attrs: u
  }] : void 0), r) {
    if (m && (o instanceof $t && e.deleteSelection(), e.split(e.mapping.map(l.pos), 1, p), f && !d && !l.parentOffset && l.parent.type !== f)) {
      const g = e.mapping.map(l.before()), b = e.doc.resolve(g);
      l.node(-1).canReplaceWith(b.index(), b.index() + 1, f) && e.setNodeMarkup(e.mapping.map(l.before()), f);
    }
    n && No(t, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return m;
}, Dd = (n, e = {}) => ({ tr: t, state: r, dispatch: i, editor: o }) => {
  const s = gt(n, r.schema), { $from: l, $to: c } = r.selection, a = r.selection.node;
  if (a && a.isBlock || l.depth < 2 || !l.sameParent(c)) return !1;
  const u = l.node(-1);
  if (u.type !== s) return !1;
  const d = o.extensionManager.attributes;
  if (l.parent.content.size === 0 && l.node(-1).childCount === l.indexAfter(-1)) {
    if (l.depth === 2 || l.node(-3).type !== s || l.index(-2) !== l.node(-2).childCount - 1) return !1;
    if (i) {
      var f;
      let y = j.empty;
      const $ = l.index(-1) ? 1 : l.index(-2) ? 2 : 3;
      for (let O = l.depth - $; O >= l.depth - 3; O -= 1) y = j.from(l.node(O).copy(y));
      const z = l.indexAfter(-1) < l.node(-2).childCount ? 1 : l.indexAfter(-2) < l.node(-3).childCount ? 2 : 3, N = {
        ...br(d, l.node().type.name, l.node().attrs),
        ...e
      }, w = ((f = s.contentMatch.defaultType) === null || f === void 0 ? void 0 : f.createAndFill(N)) || void 0;
      y = y.append(j.from(s.createAndFill(null, w) || void 0));
      const A = l.before(l.depth - ($ - 1));
      t.replace(A, l.after(-z), new ne(y, 4 - $, 0));
      let L = -1;
      t.doc.nodesBetween(A, t.doc.content.size, (O, E) => {
        if (L > -1) return !1;
        O.isTextblock && O.content.size === 0 && (L = E + 1);
      }), L > -1 && t.setSelection($t.near(t.doc.resolve(L))), t.scrollIntoView();
    }
    return !0;
  }
  const p = c.pos === l.end() ? u.contentMatchAt(0).defaultType : null, m = {
    ...br(d, u.type.name, u.attrs),
    ...e
  }, g = {
    ...br(d, l.node().type.name, l.node().attrs),
    ...e
  };
  t.delete(l.pos, c.pos);
  const b = p ? [{
    type: s,
    attrs: m
  }, {
    type: p,
    attrs: g
  }] : [{
    type: s,
    attrs: m
  }];
  if (!Xt(t.doc, l.pos, 2)) return !1;
  if (i) {
    const { selection: y, storedMarks: $ } = r, { splittableMarks: z } = o.extensionManager, N = $ || y.$to.parentOffset && y.$from.marks();
    if (t.split(l.pos, 2, b).scrollIntoView(), !N || !i) return !0;
    const w = N.filter((A) => z.includes(A.type.name));
    t.ensureMarks(w);
  }
  return !0;
};
function To(n) {
  return !n || n === "1" ? null : n;
}
function hl(n, e) {
  return To(n) === To(e);
}
const ni = (n, e) => {
  const t = Fi((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && kn(n.doc, t.pos)) || !hl(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(t.pos), !0;
}, ri = (n, e) => {
  const t = Fi((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && kn(n.doc, r)) || !hl(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(r), !0;
};
function Od(n) {
  const e = n.doc, t = e.firstChild;
  if (!t) return null;
  const r = e.resolve(1), i = e.resolve(t.nodeSize - 1);
  return $t.between(r, i);
}
const Pd = (n, e, t, r = {}) => ({ editor: i, tr: o, state: s, dispatch: l, chain: c, commands: a, can: u }) => {
  const { extensions: d, splittableMarks: f } = i.extensionManager, p = gt(n, s.schema), m = gt(e, s.schema), { selection: g, storedMarks: b } = s, { $from: y, $to: $ } = g, z = y.blockRange($), N = b || g.$to.parentOffset && g.$from.marks();
  if (!z) return !1;
  const w = Fi((P) => ti(P.type.name, d))(g), A = g.from === 0 && g.to === s.doc.content.size, L = s.doc.content.content, O = L.length === 1 ? L[0] : null, E = A && O && ti(O.type.name, d) ? {
    node: O,
    pos: 0
  } : null, q = w ?? E, M = !!w && z.depth >= 1 && z.depth - w.depth <= 1, I = !!E;
  if ((M || I) && q) {
    if (q.node.type === p)
      return A && I ? c().command(({ tr: P, dispatch: Y }) => {
        const U = Od(P);
        return U ? (P.setSelection(U), Y && Y(P), !0) : !1;
      }).liftListItem(m).run() : a.liftListItem(m);
    if (ti(q.node.type.name, d) && p.validContent(q.node.content)) return c().command(() => (o.setNodeMarkup(q.pos, p), !0)).command(() => ni(o, p)).command(() => ri(o, p)).run();
  }
  return !t || !N || !l ? c().command(() => u().wrapInList(p, r) ? !0 : a.clearNodes()).wrapInList(p, r).command(() => ni(o, p)).command(() => ri(o, p)).run() : c().command(() => {
    const P = u().wrapInList(p, r), Y = N.filter((U) => f.includes(U.type.name));
    return o.ensureMarks(Y), P ? !0 : a.clearNodes();
  }).wrapInList(p, r).command(() => ni(o, p)).command(() => ri(o, p)).run();
}, Ld = (n, e = {}, t = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: o = !1 } = t, s = un(n, r.schema);
  return Nd(r, s, e) ? i.unsetMark(s, { extendEmptyMarkRange: o }) : i.setMark(s, e);
}, Bd = (n, e, t = {}) => ({ state: r, commands: i }) => {
  const o = gt(n, r.schema), s = gt(e, r.schema), l = Bi(r, o, t);
  let c;
  return r.selection.$anchor.sameParent(r.selection.$head) && (c = r.selection.$anchor.parent.attrs), l ? i.setNode(s, c) : i.setNode(o, {
    ...c,
    ...t
  });
}, Fd = (n, e = {}) => ({ state: t, commands: r }) => {
  const i = gt(n, t.schema);
  return Bi(t, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, Hd = () => ({ state: n, dispatch: e }) => {
  const t = n.plugins;
  for (let r = 0; r < t.length; r += 1) {
    const i = t[r];
    let o;
    if (i.spec.isInputRules && (o = i.getState(n))) {
      if (e) {
        const s = n.tr, l = o.transform;
        for (let c = l.steps.length - 1; c >= 0; c -= 1) s.step(l.steps[c].invert(l.docs[c]));
        if (o.text) {
          const c = s.doc.resolve(o.from).marks();
          s.replaceWith(o.from, o.to, n.schema.text(o.text, c));
        } else s.delete(o.from, o.to);
      }
      return !0;
    }
  }
  return !1;
}, _d = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
  const { ignoreClearable: i = !1 } = n, { selection: o } = e, { empty: s, ranges: l } = o;
  if (s) return !0;
  const { nonClearableMarks: c } = r.extensionManager;
  if (t) {
    const a = Object.values(r.schema.marks).filter((u) => i || !c.includes(u.name));
    l.forEach((u) => {
      for (const d of a) e.removeMark(u.$from.pos, u.$to.pos, d);
    });
  }
  return !0;
}, jd = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { extendEmptyMarkRange: o = !1 } = e, { selection: s } = t, l = un(n, r.schema), { $from: c, empty: a, ranges: u } = s;
  if (!i) return !0;
  if (a && o) {
    var d;
    let { from: f, to: p } = s;
    const m = nl(c, l, (d = c.marks().find((g) => g.type === l)) === null || d === void 0 ? void 0 : d.attrs);
    m && (f = m.from, p = m.to), t.removeMark(f, p, l);
  } else u.forEach((f) => {
    t.removeMark(f.$from.pos, f.$to.pos, l);
  });
  return t.removeStoredMark(l), !0;
}, Wd = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const { selection: i } = t;
  let o, s;
  return typeof n == "number" ? (o = n, s = n) : n && "from" in n && "to" in n ? (o = n.from, s = n.to) : (o = i.from, s = i.to), r && e.doc.nodesBetween(o, s, (l, c) => {
    if (l.isText) return;
    const a = { ...l.attrs };
    delete a.dir, e.setNodeMarkup(c, void 0, a);
  }), !0;
}, qd = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = ul(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = gt(n, r.schema)), l === "mark" && (s = un(n, r.schema));
  let c = !1;
  return t.selection.ranges.forEach((a) => {
    const u = a.$from.pos, d = a.$to.pos;
    let f, p, m, g;
    t.selection.empty ? r.doc.nodesBetween(u, d, (b, y) => {
      o && o === b.type && (c = !0, m = Math.max(y, u), g = Math.min(y + b.nodeSize, d), f = y, p = b);
    }) : r.doc.nodesBetween(u, d, (b, y) => {
      y < u && o && o === b.type && (c = !0, m = Math.max(y, u), g = Math.min(y + b.nodeSize, d), f = y, p = b), y >= u && y <= d && (o && o === b.type && (c = !0, i && t.setNodeMarkup(y, void 0, {
        ...b.attrs,
        ...e
      })), s && b.marks.length && b.marks.forEach(($) => {
        if (s === $.type && (c = !0, i)) {
          const z = Math.max(y, u), N = Math.min(y + b.nodeSize, d);
          t.addMark(z, N, s.create({
            ...$.attrs,
            ...e
          }));
        }
      }));
    }), p && (f !== void 0 && i && t.setNodeMarkup(f, void 0, {
      ...p.attrs,
      ...e
    }), s && p.marks.length && p.marks.forEach((b) => {
      s === b.type && i && t.addMark(m, g, s.create({
        ...b.attrs,
        ...e
      }));
    }));
  }), c;
}, Kd = new jt("__tiptap_decorations__"), Jd = (n) => ({ tr: e, dispatch: t }) => (t && e.setMeta(Kd, {
  type: "force",
  name: n
}), !0), Vd = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = gt(n, t.schema);
  return fu(i, e)(t, r);
}, Yd = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = gt(n, t.schema);
  return hu(i, e)(t, r);
};
var Ud = /* @__PURE__ */ sa({
  blur: () => wu,
  clearContent: () => ku,
  clearNodes: () => Su,
  command: () => Nu,
  createParagraphNear: () => Tu,
  cut: () => Cu,
  deleteCurrentNode: () => Eu,
  deleteNode: () => Mu,
  deleteRange: () => Ru,
  deleteSelection: () => $u,
  enter: () => zu,
  exitCode: () => Du,
  extendMarkRange: () => Pu,
  first: () => Lu,
  focus: () => Hu,
  forEach: () => _u,
  insertContent: () => ju,
  insertContentAt: () => Wu,
  insertDefaultBlock: () => qu,
  joinBackward: () => Vu,
  joinDown: () => Ju,
  joinForward: () => Yu,
  joinItemBackward: () => Uu,
  joinItemForward: () => Gu,
  joinTextblockBackward: () => Xu,
  joinTextblockForward: () => Qu,
  joinUp: () => Ku,
  keyboardShortcut: () => ed,
  lift: () => td,
  liftEmptyBlock: () => nd,
  liftListItem: () => rd,
  newlineInCode: () => id,
  resetAttributes: () => od,
  scrollIntoView: () => sd,
  selectAll: () => ld,
  selectNodeBackward: () => cd,
  selectNodeForward: () => ad,
  selectParentNode: () => ud,
  selectTextblockEnd: () => dd,
  selectTextblockStart: () => fd,
  setContent: () => pd,
  setMark: () => Cd,
  setMeta: () => Ed,
  setNode: () => Md,
  setNodeSelection: () => Rd,
  setTextDirection: () => Ad,
  setTextSelection: () => Id,
  sinkListItem: () => $d,
  splitBlock: () => zd,
  splitListItem: () => Dd,
  toggleList: () => Pd,
  toggleMark: () => Ld,
  toggleNode: () => Bd,
  toggleWrap: () => Fd,
  undoInputRule: () => Hd,
  unsetAllMarks: () => _d,
  unsetMark: () => jd,
  unsetTextDirection: () => Wd,
  updateAttributes: () => qd,
  updateDecorations: () => Jd,
  wrapIn: () => Vd,
  wrapInList: () => Yd
});
typeof process < "u" && process.env.NODE_ENV;
function Gd(n) {
  return Object.prototype.toString.call(n).slice(8, -1);
}
function gr(n) {
  return Gd(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
function pl(n, e) {
  const t = { ...n };
  return gr(n) && gr(e) && Object.keys(e).forEach((r) => {
    gr(e[r]) && gr(n[r]) ? t[r] = pl(n[r], e[r]) : t[r] = e[r];
  }), t;
}
var ml = class {
  constructor(n = {}) {
    this.type = "extendable", this.parent = null, this.child = null, this.name = "", this.config = { name: this.name }, this.config = {
      ...this.config,
      ...n
    }, this.name = this.config.name;
  }
  get options() {
    return { ...pi(Zn(this, "addOptions", { name: this.name })) };
  }
  get storage() {
    return { ...pi(Zn(this, "addStorage", {
      name: this.name,
      options: this.options
    })) };
  }
  configure(n = {}) {
    const e = this.extend({
      ...this.config,
      addOptions: () => pl(this.options, n)
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
}, Xd = class gl extends ml {
  constructor(...e) {
    super(...e), this.type = "mark";
  }
  /**
  * Create a new Mark instance
  * @param config - Mark configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new gl(t);
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
}, zt = class yl extends ml {
  constructor(...e) {
    super(...e), this.type = "extension";
  }
  /**
  * Create a new Extension instance
  * @param config - Extension configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new yl(t);
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const t = typeof e == "function" ? e() : e;
    return super.extend(t);
  }
};
zt.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return { blockSeparator: void 0 };
  },
  addProseMirrorPlugins() {
    return [new en({
      key: new jt("clipboardTextSerializer"),
      props: { clipboardTextSerializer: () => {
        const { editor: n } = this, { state: e, schema: t } = n, { doc: r, selection: i } = e, o = vd(t), { blockSeparator: s } = this.options, l = {
          ...s !== void 0 ? { blockSeparator: s } : {},
          textSerializers: o
        };
        return [...i.ranges].sort((c, a) => c.$from.pos - a.$from.pos).map(({ $from: c, $to: a }) => bd(r, {
          from: c.pos,
          to: a.pos
        }, l)).join(s ?? `

`);
      } }
    })];
  }
});
zt.create({
  name: "commands",
  addCommands() {
    return { ...Ud };
  }
});
zt.create({
  name: "delete",
  onUpdate({ transaction: n, appendedTransactions: e }) {
    var t, r;
    const i = () => {
      var o, s, l;
      if ((o = (s = this.editor.options.coreExtensionOptions) === null || s === void 0 || (s = s.delete) === null || s === void 0 || (l = s.filterTransaction) === null || l === void 0 ? void 0 : l.call(s, n)) !== null && o !== void 0 ? o : n.getMeta("y-sync$")) return;
      const c = gd(n.before, [n, ...e]);
      Sd(c).forEach((u) => {
        c.mapping.mapResult(u.oldRange.from).deletedAfter && c.mapping.mapResult(u.oldRange.to).deletedBefore && c.before.nodesBetween(u.oldRange.from, u.oldRange.to, (d, f) => {
          const p = f + d.nodeSize - 2, m = u.oldRange.from <= f && p <= u.oldRange.to;
          this.editor.emit("delete", {
            type: "node",
            node: d,
            from: f,
            to: p,
            newFrom: c.mapping.map(f),
            newTo: c.mapping.map(p),
            deletedRange: u.oldRange,
            newRange: u.newRange,
            partial: !m,
            editor: this.editor,
            transaction: n,
            combinedTransform: c
          });
        });
      });
      const a = c.mapping;
      c.steps.forEach((u, d) => {
        if (u instanceof Ht) {
          var f, p;
          const m = a.slice(d).map(u.from, -1), g = a.slice(d).map(u.to), b = a.invert().map(m, -1), y = a.invert().map(g), $ = m > 0 ? (f = c.doc.nodeAt(m - 1)) === null || f === void 0 ? void 0 : f.marks.some((N) => N.eq(u.mark)) : !1, z = (p = c.doc.nodeAt(g)) === null || p === void 0 ? void 0 : p.marks.some((N) => N.eq(u.mark));
          this.editor.emit("delete", {
            type: "mark",
            mark: u.mark,
            from: u.from,
            to: u.to,
            deletedRange: {
              from: b,
              to: y
            },
            newRange: {
              from: m,
              to: g
            },
            partial: !!(z || $),
            editor: this.editor,
            transaction: n,
            combinedTransform: c
          });
        }
      });
    };
    !((t = (r = this.editor.options.coreExtensionOptions) === null || r === void 0 || (r = r.delete) === null || r === void 0 ? void 0 : r.async) !== null && t !== void 0) || t ? setTimeout(i, 0) : i();
  }
});
zt.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [new en({
      key: new jt("tiptapDrop"),
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
zt.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [new en({
      key: new jt("editable"),
      props: { editable: () => this.editor.options.editable }
    })];
  }
});
const Qd = new jt("focusEvents");
zt.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [new en({
      key: Qd,
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
zt.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const n = () => this.editor.commands.first(({ commands: s }) => [
      () => s.undoInputRule(),
      () => s.command(({ tr: l }) => {
        const { selection: c, doc: a } = l, { empty: u, $anchor: d } = c, { pos: f, parent: p } = d, m = d.parent.isTextblock && f > 0 ? l.doc.resolve(f - 1) : d, g = m.parent.type.spec.isolating, b = d.pos - d.parentOffset, y = g && m.parent.childCount === 1 ? b === d.pos : An.atStart(a).from === f;
        return !u || !p.type.isTextblock || p.textContent.length || !y || y && d.parent.type.name === "paragraph" ? !1 : s.clearNodes();
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
    return Ir() || al() ? o : i;
  },
  addProseMirrorPlugins() {
    return [new en({
      key: new jt("clearDocument"),
      appendTransaction: (n, e, t) => {
        if (n.some((p) => p.getMeta("composition"))) return;
        const r = n.some((p) => p.docChanged) && !e.doc.eq(t.doc), i = n.some((p) => p.getMeta("preventClearDocument"));
        if (!r || i) return;
        const { empty: o, from: s, to: l } = e.selection, c = An.atStart(e.doc).from, a = An.atEnd(e.doc).to;
        if (o || !(s === c && l === a) || !fl(t.doc)) return;
        const u = t.tr, d = Zs({
          state: t,
          transaction: u
        }), { commands: f } = new vu({
          editor: this.editor,
          state: d
        });
        if (f.clearNodes(), !!u.steps.length)
          return u;
      }
    })];
  }
});
zt.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [new en({
      key: new jt("tiptapPaste"),
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
zt.create({
  name: "tabindex",
  addOptions() {
    return { value: void 0 };
  },
  addProseMirrorPlugins() {
    return [new en({
      key: new jt("tabindex"),
      props: { attributes: () => {
        var n;
        return !this.editor.isEditable && this.options.value === void 0 ? {} : { tabindex: (n = this.options.value) !== null && n !== void 0 ? n : "0" };
      } }
    })];
  }
});
zt.create({
  name: "textDirection",
  addOptions() {
    return { direction: void 0 };
  },
  addGlobalAttributes() {
    if (!this.options.direction) return [];
    const { nodeExtensions: n } = dl(this.extensions);
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
    return [new en({
      key: new jt("textDirection"),
      props: { attributes: () => {
        const n = this.options.direction;
        return n ? { dir: n } : {};
      } }
    })];
  }
});
const Zd = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), ef = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), tf = /^(https?:\/\/|mailto:)/i;
function nf(n) {
  if (!n) return "";
  const e = [];
  for (const t of n.split(";")) {
    const r = t.indexOf(":");
    if (r < 0) continue;
    const i = t.slice(0, r).trim().toLowerCase(), o = t.slice(r + 1).trim();
    ef.has(i) && o && e.push(`${i}: ${o}`);
  }
  return e.join("; ");
}
function mi(n) {
  if (n.nodeType === Node.TEXT_NODE) return n;
  if (n.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const e = n, t = e.tagName.toLowerCase(), r = () => {
    const l = document.createDocumentFragment();
    for (const c of Array.from(e.childNodes)) l.appendChild(mi(c));
    return l;
  };
  if (!Zd.has(t)) return r();
  if (t === "a") {
    const l = e.getAttribute("href") || "";
    if (!tf.test(l)) return r();
  }
  const i = document.createElement(t), o = e.getAttribute("style"), s = nf(o || "");
  if (s && i.setAttribute("style", s), t === "span") {
    const l = e.getAttribute("data-text-style");
    l && i.setAttribute("data-text-style", l);
  }
  if (t === "a") {
    i.setAttribute("href", e.getAttribute("href"));
    const l = e.getAttribute("target"), c = e.getAttribute("rel");
    l && i.setAttribute("target", l), c && i.setAttribute("rel", c);
  }
  for (const l of Array.from(e.childNodes)) i.appendChild(mi(l));
  return i;
}
function xl(n) {
  return n.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function rf(n) {
  const e = xl(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  t.innerHTML = e;
  const r = document.createDocumentFragment();
  for (const s of Array.from(t.content.childNodes)) r.appendChild(mi(s));
  const i = document.createElement("div");
  return i.appendChild(r), i.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function Oh(n) {
  const e = xl(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  return t.innerHTML = e, (t.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function Ph(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function of(n) {
  return n.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function Co(n) {
  return n.replace(/\{\{([^{}]+)\}\}/g, (e, t) => `<span data-type="token" data-field="${t}">{{${t}}}</span>`);
}
const sf = { text: "#52525b" }, lf = ({ node: n, selected: e, extension: t, editor: r, view: i, getPos: o }) => {
  var f;
  const s = n.attrs.field ?? "", l = t.options, c = ((f = l.resolve) == null ? void 0 : f.call(l, s)) ?? null, a = (c == null ? void 0 : c.color) ?? sf, u = (c == null ? void 0 : c.label) ?? `{{${s}}}`, d = c == null ? void 0 : c.nested;
  return /* @__PURE__ */ h(
    Wl,
    {
      as: "span",
      "data-type": "token",
      className: `rt-token inline-block ${e ? "rt-token-selected" : ""}`,
      style: {
        background: a.text,
        color: "#fff",
        borderRadius: 10,
        padding: "0 6px",
        margin: "0 2px",
        fontWeight: 600,
        whiteSpace: "nowrap",
        fontSize: "inherit",
        lineHeight: "inherit"
      },
      onMouseDown: (p) => {
        var y;
        if (p.button !== 0 || !r.isEditable) return;
        p.preventDefault(), r.isFocused || r.commands.focus();
        const m = typeof o == "function" ? o() : null;
        if (m == null) return;
        const g = i.state.doc.resolve(m), b = g.nodeAfter;
        b && Dn.isSelectable(b) && i.dispatch(i.state.tr.setSelection(new Dn(g))), (y = l.onTokenClick) == null || y.call(l, s, p.currentTarget.getBoundingClientRect(), m);
      },
      children: d ? /* @__PURE__ */ h("span", { className: "rt-token-nested", children: u }) : u
    }
  );
}, cf = rc.extend({
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
    return jl(lf);
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
    return ["span", _l({ "data-type": "token" }, e), `{{${n.attrs.field ?? ""}}}`];
  },
  renderText({ node: n }) {
    return `{{${n.attrs.field ?? ""}}}`;
  }
}), af = 240, uf = 280, df = ({ props: n, onApi: e }) => {
  const t = Lr(), r = k(e);
  r.current = e, le(() => {
    r.current(t);
  }, [t]);
  const i = k(null);
  le(() => {
    var s;
    t.pointerDriven || an((s = i.current) == null ? void 0 : s.querySelector(".ui-item-highlighted"));
  }, [t.highlightedIndex, t.pointerDriven]), le(() => {
    n.items.length > 0 && t.highlightedIndex === -1 && t.setHighlighted(0, "keyboard");
  }, [n.items.length, t.highlightedIndex, t]);
  const o = Pr();
  return /* @__PURE__ */ h(rr.Provider, { value: t, children: /* @__PURE__ */ h(
    "div",
    {
      role: "listbox",
      "data-token-popup": !0,
      className: "ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto",
      style: { width: uf, maxHeight: af },
      onMouseDown: (s) => s.preventDefault(),
      children: /* @__PURE__ */ h("div", { ref: i, children: n.items.map((s) => /* @__PURE__ */ h(
        ff,
        {
          item: s,
          d: o,
          command: () => n.command({ field: s.key })
        },
        s.key
      )) })
    }
  ) });
}, ff = ({ item: n, d: e, command: t }) => {
  const { myIndex: r, highlighted: i, setPointer: o } = rs({
    label: () => n.label,
    activate: t
  }), s = Be(), l = { padding: `${B(8, 12, s)}px ${B(12, 16, s)}px`, fontSize: B(12, 14, s) };
  return /* @__PURE__ */ C(
    "div",
    {
      role: "option",
      "aria-selected": i,
      style: l,
      className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${e.itemDefault} ${i ? "ui-item-highlighted" : ""}`,
      onPointerEnter: () => o(r),
      onClick: t,
      children: [
        /* @__PURE__ */ h("span", { className: `${e.icon} shrink-0 flex items-center`, children: /* @__PURE__ */ h("span", { className: "block w-2 h-2 rounded-full", style: { background: n.color.text } }) }),
        /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: n.label }),
        n.group && /* @__PURE__ */ h("span", { className: "shrink-0 text-[9px] uppercase tracking-wider", style: { color: n.color.text }, children: n.group })
      ]
    }
  );
}, Eo = () => {
  let n = null;
  const e = (r) => {
    n && (n.props = r, n.holder.style.display = r.items.length > 0 ? "" : "none", n.root.render(
      /* @__PURE__ */ h(df, { props: r, onApi: (i) => {
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
        var u, d;
        if (!n) return;
        const c = (d = (u = n.props) == null ? void 0 : u.clientRect) == null ? void 0 : d.call(u), a = c && !s.endsWith("-end") ? c.width : 0;
        n.holder.style.position = l, n.holder.style.left = `${i + a}px`, n.holder.style.top = `${o}px`;
      }
    }));
  };
  return {
    onStart(r) {
      const i = document.createElement("div");
      i.style.zIndex = "10002";
      const o = ic(i);
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
        const c = s.highlightedIndex, a = l === "ArrowDown" ? 1 : -1;
        return s.setHighlighted((c + a + i.length) % i.length, "keyboard"), !0;
      }
      if (l === "Enter" || l === "Tab") {
        r.preventDefault();
        const c = s.highlightedIndex, a = c >= 0 ? c : 0, u = s.items[a];
        return u ? u.activate() : i[a] && o({ field: i[a].key }), !0;
      }
      return !1;
    },
    onExit() {
      var r;
      n && ((r = n.unmount) == null || r.call(n), n.root.unmount(), n.holder.remove(), n = null);
    }
  };
}, hf = Xd.create({
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
}), vr = new jt("retainedSelectionHighlight"), pf = zt.create({
  name: "retainedSelectionHighlight",
  addProseMirrorPlugins() {
    return [
      new en({
        key: vr,
        state: {
          init: () => ({ held: !1, decorations: sr.empty }),
          apply(n, e) {
            const t = n.getMeta(vr), r = t ? t.held : e.held;
            if (!r) return { held: !1, decorations: sr.empty };
            const { from: i, to: o, empty: s } = n.selection;
            return {
              held: r,
              decorations: s ? sr.empty : sr.create(n.doc, [Vl.inline(i, o, { class: "rt-retained-selection" })])
            };
          }
        },
        props: {
          decorations(n) {
            var e;
            return (e = vr.getState(n)) == null ? void 0 : e.decorations;
          }
        }
      })
    ];
  }
}), Lh = {
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
function bl(n, e) {
  const t = n.state.doc.resolve(e).nodeBefore;
  return t && t.type.name === "token" ? t.attrs.field ?? "" : null;
}
function mf(n) {
  const e = n.state.selection.$from, t = e.nodeBefore;
  if (!(t != null && t.isText)) return null;
  const r = t.text || "", i = r.lastIndexOf(".");
  if (i < 0) return null;
  const o = e.pos - r.length + i, s = bl(n, o);
  return s == null ? null : { chipKey: s, dotPos: o };
}
const gf = et.forwardRef(({
  value: n,
  onChange: e,
  placeholder: t,
  disabled: r,
  className: i,
  onStateChange: o,
  resolveToken: s,
  suggestionItems: l,
  attributeItems: c,
  onTokenClick: a,
  onSelectionChange: u
}, d) => {
  const f = k(s);
  f.current = s;
  const p = k(l);
  p.current = l;
  const m = k(c);
  m.current = c;
  const g = k(a);
  g.current = a;
  const b = k(u);
  b.current = u;
  const y = k(null), $ = k(null), z = k(e);
  z.current = e;
  const N = k(r);
  N.current = r;
  const w = k(o);
  w.current = o;
  const A = k(null), L = (I) => {
    var ce;
    const P = I.getAttributes("textStyle"), Y = I.getAttributes("reportTextStyle"), { from: U, to: T, empty: v } = I.state.selection;
    let _ = !1, fe = !1, he = !1;
    if (!v) {
      const ee = /* @__PURE__ */ new Set(), ue = /* @__PURE__ */ new Set(), W = /* @__PURE__ */ new Set();
      I.state.doc.nodesBetween(U, T, (xe) => {
        if (!xe.isText) return;
        const ae = xe.marks.find((J) => J.type.name === "textStyle");
        ee.add((ae == null ? void 0 : ae.attrs.fontFamily) || ""), ue.add((ae == null ? void 0 : ae.attrs.fontSize) || "");
        const me = xe.marks.find((J) => J.type.name === "reportTextStyle");
        W.add((me == null ? void 0 : me.attrs.styleId) || "");
      }), _ = ee.size > 1, fe = ue.size > 1, he = W.size > 1;
    }
    const te = {
      bold: I.isActive("bold"),
      italic: I.isActive("italic"),
      underline: I.isActive("underline"),
      strike: I.isActive("strike"),
      link: I.isActive("link"),
      color: P.color || "",
      fontFamily: P.fontFamily || "",
      fontSize: P.fontSize || "",
      textStyle: Y.styleId || "",
      hasSelection: !v,
      fontFamilyMixed: _,
      fontSizeMixed: fe,
      textStyleMixed: he
    }, K = A.current;
    K && K.bold === te.bold && K.italic === te.italic && K.underline === te.underline && K.strike === te.strike && K.link === te.link && K.color === te.color && K.fontFamily === te.fontFamily && K.fontSize === te.fontSize && K.textStyle === te.textStyle && K.hasSelection === te.hasSelection && K.fontFamilyMixed === te.fontFamilyMixed && K.fontSizeMixed === te.fontSizeMixed && K.textStyleMixed === te.textStyleMixed || (A.current = te, (ce = w.current) == null || ce.call(w, te));
  }, O = (I) => {
    var v;
    const P = I.state.selection;
    let Y = null;
    P instanceof Dn && P.node.type.name === "token" ? (Y = { key: P.node.attrs.field ?? "", pos: P.from }, y.current = P.from) : y.current != null && (y.current = I.state.tr.mapping.map(y.current));
    const U = $.current, T = U && Y && U.key === Y.key && U.pos === Y.pos;
    !U && !Y || T || ($.current = Y, (v = b.current) == null || v.call(b, Y));
  }, E = (I) => {
    const P = rf(of(I));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(P) ? "" : P;
  }, q = et.useMemo(() => {
    const I = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: U }) => {
        var T;
        return ((T = p.current) == null ? void 0 : T.call(p, U)) ?? [];
      },
      command: ({ editor: U, range: T, props: v }) => {
        U.chain().focus().insertContentAt(T, { type: "token", attrs: { field: v.field } }).run();
      },
      render: Eo
    }, P = cf.configure({
      resolve: f.current ?? null,
      suggestion: I,
      onTokenClick: (U, T, v) => {
        var _;
        y.current = v, (_ = g.current) == null || _.call(g, U, T, v);
      }
    }), Y = zt.create({
      name: "tokenAttributeSuggestion",
      addProseMirrorPlugins() {
        return [
          nc({
            pluginKey: new jt("tokenAttributeSuggestion"),
            editor: this.editor,
            char: ".",
            // The gate is `shouldShow` (a chip must sit immediately before the
            // dot), not the prefix rule — the prefix here is an atom, not text.
            allowedPrefixes: null,
            decorationClass: "suggestion-attr",
            shouldShow: ({ editor: U, range: T }) => bl(U, T.from) != null,
            items: ({ editor: U, query: T }) => {
              var _;
              const v = mf(U);
              return v ? ((_ = m.current) == null ? void 0 : _.call(m, v.chipKey, T)) ?? [] : [];
            },
            command: ({ editor: U, range: T, props: v }) => {
              U.chain().focus().insertContentAt(T, { type: "token", attrs: { field: v.field } }).run();
            },
            render: Eo
          })
        ];
      }
    });
    return [P, Y];
  }, []), M = ql({
    immediatelyRender: !1,
    extensions: [
      Yl,
      Ul.configure({ placeholder: t }),
      Gl,
      Xl,
      Ql,
      hf,
      pf,
      Zl,
      tc,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      ec.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      ...q
    ],
    content: Co(n || ""),
    editable: !r,
    onUpdate: ({ editor: I }) => {
      z.current(E(I.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: I }) => {
      L(I), O(I);
    }
  });
  return le(() => {
    if (!M || M.isFocused) return;
    E(M.getHTML()) !== n && (A.current = null, M.commands.setContent(Co(n || ""), { emitUpdate: !1 }), L(M));
  }, [n, M]), le(() => {
    M && M.setEditable(!r);
  }, [r, M]), le(() => {
    M && (A.current = null, L(M), O(M));
  }, [M]), Ao(d, () => ({
    exec: (I, P, Y) => {
      if (!M || N.current) return;
      const U = M.chain(), T = (Y == null ? void 0 : Y.focus) === !1 ? U : U.focus();
      switch (I) {
        case "bold":
          T.toggleBold().run();
          break;
        case "italic":
          T.toggleItalic().run();
          break;
        case "underline":
          T.toggleUnderline().run();
          break;
        case "strikeThrough":
          T.toggleStrike().run();
          break;
        case "foreColor":
          P && T.setColor(P).run();
          break;
        case "unsetColor":
          T.unsetColor().run();
          break;
        case "fontFamily":
          P && T.setFontFamily(P).run();
          break;
        case "unsetFontFamily":
          T.unsetFontFamily().run();
          break;
        case "fontSize":
          P && T.setFontSize(P).run();
          break;
        case "unsetFontSize":
          T.unsetFontSize().run();
          break;
        // Linked named style: mark the run with the consumer's style id. Direct
        // font family/size on the range is cleared so the linked style's
        // typography takes effect (the object-level precedent); bold/italic
        // marks stay — direct character formatting still wins (Word).
        case "textStyle":
          P && T.setMark("reportTextStyle", { styleId: P }).unsetFontFamily().unsetFontSize().run();
          break;
        case "unsetTextStyle":
          T.unsetMark("reportTextStyle").run();
          break;
        // Clear every inline mark (bold/italic/underline/strike/color/font/
        // link) and normalize the block — the cell-chrome Reset path.
        case "clearFormatting":
          T.unsetAllMarks().clearNodes().run();
          break;
        case "link":
          P && T.extendMarkRange("link").setLink({ href: P }).run();
          break;
        case "unlink":
          T.extendMarkRange("link").unsetLink().run();
          break;
      }
    },
    focus: (I) => M == null ? void 0 : M.commands.focus(I),
    insertToken: (I) => {
      !M || N.current || M.chain().focus().insertContent({ type: "token", attrs: { field: I } }).run();
    },
    replaceToken: (I) => {
      if (!M || N.current) return;
      const P = y.current;
      P != null && M.commands.command(({ tr: Y }) => {
        const U = Y.doc.nodeAt(P);
        if (!U || U.type.name !== "token") return !1;
        Y.setNodeMarkup(P, void 0, { field: I });
        const T = Y.doc.resolve(P);
        return T.nodeAfter && T.nodeAfter.type.name === "token" && Y.setSelection(new Dn(T)), !0;
      });
    },
    holdSelectionHighlight: (I) => {
      !M || M.isDestroyed || M.view.dispatch(M.state.tr.setMeta(vr, { held: I }));
    }
  }), [M]), /* @__PURE__ */ h(Kl, { editor: M, className: `richtext-editor ${i || ""}` });
});
gf.displayName = "RichTextEditor";
const yf = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], xf = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], Mo = ({ className: n = "w-3 h-3" }) => /* @__PURE__ */ h("span", { className: `${n} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ h("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), bf = ({ value: n, disabled: e, onChange: t, mixed: r }) => {
  const [i, o] = ie(!1);
  return /* @__PURE__ */ h(
    Br,
    {
      open: i,
      onOpenChange: o,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ C("button", { type: "button", disabled: e, className: `${ra} w-28 justify-between`, children: [
        r ? /* @__PURE__ */ h("span", { className: "truncate italic text-zinc-500", children: "Mixed" }) : /* @__PURE__ */ h("span", { className: "truncate", style: { fontFamily: n || "Helvetica" }, children: n || "Helvetica" }),
        /* @__PURE__ */ h(xn, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: yf.map((s) => /* @__PURE__ */ h(Ac, { onClick: () => {
        t(s), o(!1);
      }, icon: !r && s === n ? /* @__PURE__ */ h(er, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ h("span", { style: { fontFamily: s }, children: s }) }, s))
    }
  );
}, vf = ({ editorRef: n, disabled: e, active: t }) => {
  const [r, i] = ie(!1), o = Fr(), [s, l] = ie(""), c = () => {
    var u;
    const a = s.trim();
    a && ((u = n.current) == null || u.exec("link", a), i(!1));
  };
  return /* @__PURE__ */ h(
    Br,
    {
      open: r,
      onOpenChange: i,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ h(
        Ct,
        {
          theme: "dark",
          active: t,
          disabled: e,
          onMouseDown: (a) => a.preventDefault(),
          style: { ...o.toggle, padding: 0 },
          className: "justify-center",
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ h(Dl, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ C("div", { className: "p-2 flex flex-col gap-2", children: [
        /* @__PURE__ */ h(
          "input",
          {
            value: s,
            onChange: (a) => l(a.target.value),
            placeholder: "https://…",
            autoFocus: !0,
            onKeyDown: (a) => {
              a.key === "Enter" && (a.preventDefault(), c());
            },
            style: o.input,
            className: ta + " w-full"
          }
        ),
        /* @__PURE__ */ C("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ h(Ct, { theme: "dark", onClick: c, style: o.control, disabled: !s.trim(), children: "Apply" }),
          /* @__PURE__ */ h(
            Ct,
            {
              theme: "dark",
              onClick: () => {
                var a;
                (a = n.current) == null || a.exec("unlink"), i(!1);
              },
              style: o.control,
              children: "Remove"
            }
          )
        ] })
      ] })
    }
  );
}, Bh = ({ editorRef: n, disabled: e, active: t, lockedFormatting: r, trailing: i, font: o, fontSizeSlot: s, showClearFormatting: l, dividers: c = !0 }) => {
  const [a, u] = ie(!1), d = (b, y) => {
    var $;
    return ($ = n.current) == null ? void 0 : $.exec(b, y);
  }, f = Fr(), p = (b) => !!(r != null && r[b]), m = "flex items-center gap-1 shrink-0", g = c ? /* @__PURE__ */ h("div", { className: as }) : null;
  return /* @__PURE__ */ C("div", { className: `flex flex-wrap items-center ${c ? "gap-x-1" : "gap-x-2"} gap-y-1.5`, children: [
    /* @__PURE__ */ C("div", { className: m, children: [
      /* @__PURE__ */ h(En, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ h(Ct, { theme: "dark", "aria-label": "Bold", active: ((t == null ? void 0 : t.bold) ?? !1) || p("bold"), disabled: e || p("bold"), onMouseDown: (b) => b.preventDefault(), onClick: () => d("bold"), style: { ...f.toggle, padding: 0 }, className: "justify-center font-bold", children: "B" }) }),
      /* @__PURE__ */ h(En, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ h(Ct, { theme: "dark", "aria-label": "Italic", active: ((t == null ? void 0 : t.italic) ?? !1) || p("italic"), disabled: e || p("italic"), onMouseDown: (b) => b.preventDefault(), onClick: () => d("italic"), style: { ...f.toggle, padding: 0 }, className: "justify-center italic", children: "I" }) }),
      /* @__PURE__ */ h(En, { content: "Underline", children: /* @__PURE__ */ h(Ct, { theme: "dark", "aria-label": "Underline", active: (t == null ? void 0 : t.underline) ?? !1, disabled: e, onMouseDown: (b) => b.preventDefault(), onClick: () => d("underline"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ h(Il, { className: "w-3 h-3" }) }) }),
      /* @__PURE__ */ h(En, { content: "Strikethrough", children: /* @__PURE__ */ h(Ct, { theme: "dark", "aria-label": "Strikethrough", active: (t == null ? void 0 : t.strike) ?? !1, disabled: e, onMouseDown: (b) => b.preventDefault(), onClick: () => d("strikeThrough"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ h($l, { className: "w-3 h-3" }) }) })
    ] }),
    g,
    /* @__PURE__ */ h("div", { className: m, children: /* @__PURE__ */ h(vf, { editorRef: n, disabled: e, active: (t == null ? void 0 : t.link) ?? !1 }) }),
    g,
    /* @__PURE__ */ h("div", { className: m, children: /* @__PURE__ */ h(
      Br,
      {
        open: a,
        onOpenChange: u,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ C(Ct, { theme: "dark", disabled: e, style: f.control, className: "justify-between min-w-0", title: "Text color", children: [
          t != null && t.color ? /* @__PURE__ */ h("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: t.color } }) : /* @__PURE__ */ h(Mo, {}),
          /* @__PURE__ */ h(xn, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ C("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ h(
            "button",
            {
              onClick: () => {
                d("unsetColor"), u(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${t != null && t.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ h(Mo, { className: "w-3.5 h-3.5" })
            }
          ),
          xf.map((b) => /* @__PURE__ */ h(
            "button",
            {
              onClick: () => {
                d("foreColor", b), u(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors ${b === (t == null ? void 0 : t.color) ? "ring-2 ring-zinc-300" : ""}`,
              style: { background: b },
              title: b
            },
            b
          ))
        ] })
      }
    ) }),
    (o || s || l) && /* @__PURE__ */ C(Qe, { children: [
      g,
      /* @__PURE__ */ C("div", { className: m, children: [
        o && /* @__PURE__ */ h(bf, { value: o.value || "Helvetica", mixed: o.mixed, disabled: e, onChange: o.onChange }),
        s,
        l && /* @__PURE__ */ h(En, { content: "Clear formatting", children: /* @__PURE__ */ h(
          Ct,
          {
            theme: "dark",
            "aria-label": "Clear formatting",
            disabled: e,
            onMouseDown: (b) => b.preventDefault(),
            onClick: () => d("clearFormatting"),
            style: { ...f.toggle, padding: 0 },
            className: "justify-center",
            children: /* @__PURE__ */ h(zl, { className: "w-3 h-3" })
          }
        ) })
      ] })
    ] }),
    i && /* @__PURE__ */ C(Qe, { children: [
      g,
      /* @__PURE__ */ h("div", { className: m, children: i })
    ] })
  ] });
};
function Hi(n, e, t) {
  return Math.max(e, Math.min(t, n));
}
function wf(n, e, t, r, i) {
  return Hi(n + e * i, t, r);
}
const kf = 2;
function Sf(n, e, t, r, i) {
  return Hi(n + Math.trunc(e / kf) * i, t, r);
}
const Nf = 3;
function Fh({
  value: n,
  min: e,
  max: t,
  fallback: r,
  onCommit: i,
  step: o = 1,
  readOnly: s,
  disabled: l,
  ariaLabel: c,
  className: a,
  title: u,
  placeholder: d,
  theme: f
}) {
  const [p, m] = ie(null), [g, b] = ie(!1), y = k(!1), $ = k(null), z = k(null), N = k(null), w = Be(), A = ls(), L = a === void 0;
  le(() => () => {
    var T;
    return (T = $.current) == null ? void 0 : T.call($);
  }, []), mt(() => {
    const T = N.current, v = z.current;
    !L && T && v && (v.style.color = getComputedStyle(T).color);
  }, [L, a]), le(() => {
    y.current || m(null);
  }, [n]);
  const O = n ?? r, E = p !== null ? p : n != null ? String(n) : d ? "" : String(r), q = (T) => Hi(T, e, t), M = (T) => {
    const v = wf(O, T, e, t, o);
    v !== O && (y.current && m(String(v)), i(v));
  }, I = (T) => {
    if (l || s || T.pointerType !== "mouse" || T.button !== 0) return;
    const v = T.currentTarget, _ = T.clientY, fe = O;
    let he = fe, te = !1;
    const K = (ee) => {
      const ue = _ - ee.clientY;
      if (!te) {
        if (Math.abs(ue) < Nf) return;
        te = !0, v.blur(), v.style.userSelect = "none";
      }
      const W = Sf(fe, ue, e, t, o);
      W !== he && (he = W, i(W));
    }, ce = () => {
      $.current = null, window.removeEventListener("pointermove", K), window.removeEventListener("pointerup", ce), window.removeEventListener("pointercancel", ce), v.style.userSelect = "", te && v.blur();
    };
    $.current = ce, window.addEventListener("pointermove", K), window.addEventListener("pointerup", ce), window.addEventListener("pointercancel", ce);
  }, P = (T) => ({
    type: "button",
    tabIndex: -1,
    "aria-label": T === 1 ? "Increase" : "Decrease",
    disabled: !!l || !!s || (T === 1 ? O >= t : O <= e),
    onPointerDown: (v) => v.preventDefault(),
    onClick: () => M(T)
  }), Y = L ? B(22, 30, w) : B(16, 22, w), U = L ? B(14, 18, w) : B(11, 15, w);
  return /* @__PURE__ */ C(
    "span",
    {
      ref: z,
      className: `ui-number ${L ? "ui-number-box" : ""}`,
      ...f ? { "data-theme": f } : {},
      children: [
        /* @__PURE__ */ h(
          "input",
          {
            ref: N,
            type: "number",
            "aria-label": c,
            title: u,
            placeholder: d,
            value: E,
            readOnly: s,
            disabled: l,
            className: a ?? "ui-input w-20",
            style: {
              ...L ? { ...A, minHeight: B(30, 38, w) } : {},
              paddingRight: Y + 2,
              cursor: l || s ? void 0 : g ? "text" : "ns-resize"
            },
            onFocus: () => {
              y.current = !0, b(!0);
            },
            onChange: (T) => {
              const v = T.target.value;
              m(v);
              const _ = parseInt(v, 10);
              v !== "" && !Number.isNaN(_) && i(q(_));
            },
            onBlur: () => {
              if (y.current = !1, b(!1), p === null) return;
              const T = parseInt(p, 10);
              Number.isNaN(T) || i(q(T)), m(null);
            },
            onKeyDown: (T) => {
              T.key === "Enter" && T.target.blur(), T.key === "Escape" && (m(null), T.target.blur()), !s && !l && (T.key === "ArrowUp" || T.key === "ArrowDown") && (T.preventDefault(), M(T.key === "ArrowUp" ? 1 : -1));
            },
            onPointerDown: I
          }
        ),
        /* @__PURE__ */ C("span", { className: "ui-number-steppers", style: { width: Y }, children: [
          /* @__PURE__ */ h("button", { ...P(1), className: "ui-number-step", children: /* @__PURE__ */ h(Ol, { style: { width: U, height: U } }) }),
          /* @__PURE__ */ h("button", { ...P(-1), className: "ui-number-step", children: /* @__PURE__ */ h(xn, { style: { width: U, height: U } }) })
        ] })
      ]
    }
  );
}
function Hh({ title: n, icon: e, count: t, tone: r = "default", collapsed: i, onToggle: o, trailing: s, bodyClass: l, className: c = "", dataProps: a, children: u }) {
  const d = Be(), f = cn({ px: 12, py: 8, fs: 12 }, { px: 14, py: 12, fs: 14 }), p = B(14, 16, d), m = { width: p, height: p }, g = B(10, 12, d);
  return /* @__PURE__ */ C("div", { ...a, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${c}`, children: [
    /* @__PURE__ */ C("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1 bg-[var(--ui-card-header-bg)] text-[color:var(--ui-card-header-text)] hover:bg-[var(--ui-card-header-hover)] transition-colors", style: f, children: [
      /* @__PURE__ */ C(
        "button",
        {
          type: "button",
          onClick: o,
          className: "flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer",
          children: [
            i ? /* @__PURE__ */ h(wr, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: m }) : /* @__PURE__ */ h(xn, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: m }),
            e && /* @__PURE__ */ h("span", { className: "text-[color:var(--ui-card-header-icon)] shrink-0 inline-flex", children: e }),
            /* @__PURE__ */ h("span", { className: "font-semibold text-[color:var(--ui-card-header-text)] truncate", children: n }),
            t && /* @__PURE__ */ h("span", { className: "ui-card-count shrink-0", style: { fontSize: g }, children: t })
          ]
        }
      ),
      s && /* @__PURE__ */ h("div", { className: "shrink-0", children: s })
    ] }),
    !i && u && /* @__PURE__ */ h("div", { className: l || "ui-card-band border-t p-1.5 space-y-1", children: u })
  ] });
}
function _i({
  expanded: n,
  collapsedWidth: e,
  expandedWidth: t,
  trigger: r,
  field: i,
  rootRef: o,
  shrink: s = !1,
  className: l = "",
  style: c,
  ...a
}) {
  return /* @__PURE__ */ C(
    "div",
    {
      ...a,
      ref: o,
      className: `relative inline-flex ${s ? "shrink-0" : ""} ${l}`,
      style: {
        ...c,
        width: n ? t : e,
        transition: "width 220ms cubic-bezier(0.32, 0.72, 0, 1)"
      },
      children: [
        /* @__PURE__ */ h(
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
        /* @__PURE__ */ h(
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
function Tf({
  value: n,
  onChange: e,
  triggerLabel: t = "Filter",
  triggerIcon: r,
  placeholder: i = "Filter…",
  collapsedWidth: o = 88,
  expandedWidth: s = 200,
  variant: l = "subtle",
  theme: c,
  active: a = !1,
  autoFocus: u = !1,
  onExpandedChange: d,
  actions: f,
  leadingIcon: p,
  showClear: m = !0,
  onSubmit: g,
  onCancel: b,
  cancelOnEscape: y = !1,
  cancelOnOutside: $ = !1,
  className: z = "",
  "aria-label": N
}) {
  const [w, A] = ie(u), L = k(w);
  L.current = w;
  const O = k(null), E = k(null), q = k(null), M = Lo(), I = Q((K) => {
    L.current !== K && (L.current = K, A(K), d == null || d(K));
  }, [d]), P = Q((K = !1) => {
    var ce;
    I(!1), (ce = E.current) == null || ce.blur(), K && requestAnimationFrame(() => {
      var ee;
      return (ee = q.current) == null ? void 0 : ee.focus();
    });
  }, [I]), Y = Q(() => {
    I(!0), requestAnimationFrame(() => {
      const K = E.current;
      if (!K) return;
      K.focus();
      const ce = K.value.length;
      K.setSelectionRange(ce, ce);
    });
  }, [I]);
  le(() => {
    u && Y();
  }, [u, Y]), le(() => {
    var ee;
    if (!w) return;
    const K = ((ee = O.current) == null ? void 0 : ee.ownerDocument) ?? document, ce = (ue) => {
      var xe;
      const W = ue.target;
      W && ((xe = O.current) != null && xe.contains(W) || ($ && (b == null || b()), P()));
    };
    return K.addEventListener("pointerdown", ce, !0), () => K.removeEventListener("pointerdown", ce, !0);
  }, [w, P, $, b]);
  const U = Q((K) => {
    var ee;
    if (!w) return;
    const ce = K.relatedTarget;
    ce && ((ee = O.current) != null && ee.contains(ce)) || ($ && (b == null || b()), P());
  }, [w, P, $, b]), T = Q((K) => {
    if (K.key === "Enter" && g) {
      K.preventDefault(), g(n), P(!0);
      return;
    }
    K.key === "Escape" && (K.preventDefault(), K.stopPropagation(), y ? b == null || b() : e(""), P(!0));
  }, [e, P, y, b, g, n]), v = p === void 0 ? r ?? /* @__PURE__ */ h(on, { className: "w-3.5 h-3.5" }) : p, he = 8 + (((f == null ? void 0 : f.length) || 0) + (m && n ? 1 : 0)) * (M.box + 2), te = (K) => /* @__PURE__ */ h(
    "span",
    {
      style: { width: M.icon, height: M.icon },
      className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
      children: K
    }
  );
  return /* @__PURE__ */ h(
    _i,
    {
      expanded: w,
      collapsedWidth: o,
      expandedWidth: s,
      rootRef: O,
      shrink: !0,
      "data-morph-search": !0,
      "data-theme": c,
      "data-expanded": w ? "true" : "false",
      className: z,
      onBlur: U,
      trigger: /* @__PURE__ */ h(
        Ct,
        {
          ref: q,
          type: "button",
          variant: l,
          size: "minimal",
          theme: c,
          icon: r ?? /* @__PURE__ */ h(on, { className: "w-3.5 h-3.5" }),
          active: a,
          onClick: Y,
          className: `w-full justify-start ${w ? "pointer-events-none" : ""}`,
          tabIndex: w ? -1 : 0,
          "aria-expanded": w,
          "aria-label": N || t,
          "data-morph-search-trigger": !0,
          children: /* @__PURE__ */ h("span", { className: "min-w-0 truncate", children: t })
        }
      ),
      field: /* @__PURE__ */ C(Qe, { children: [
        v && /* @__PURE__ */ h(
          "span",
          {
            className: "ui-icon absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none",
            style: { width: M.icon, height: M.icon },
            children: te(v)
          }
        ),
        /* @__PURE__ */ h(
          "input",
          {
            ref: E,
            value: n,
            onChange: (K) => e(K.target.value),
            onKeyDown: T,
            placeholder: i,
            "aria-label": N || i,
            tabIndex: w ? 0 : -1,
            "data-morph-search-input": !0,
            style: { paddingLeft: v ? M.icon + 16 : 10, paddingRight: he },
            className: `${qn("sm")} w-full`
          }
        ),
        /* @__PURE__ */ C("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
          f == null ? void 0 : f.map((K) => /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              "aria-label": K.label,
              title: K.label,
              tabIndex: w ? 0 : -1,
              onMouseDown: (ce) => ce.preventDefault(),
              onClick: () => {
                K.onClick(n, { close: () => P(!0) }), K.keepOpen || P(!0);
              },
              style: { width: M.box, height: M.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-action": K.key,
              children: te(K.icon)
            },
            K.key
          )),
          m && n && /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              "aria-label": "Clear",
              tabIndex: w ? 0 : -1,
              onClick: () => {
                e(""), requestAnimationFrame(() => {
                  var K;
                  return (K = E.current) == null ? void 0 : K.focus();
                });
              },
              style: { width: M.box, height: M.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-clear": !0,
              children: /* @__PURE__ */ h(yn, { size: M.icon })
            }
          )
        ] })
      ] })
    }
  );
}
function _h({
  triggerLabel: n,
  triggerIcon: e = /* @__PURE__ */ h($r, { className: "w-3.5 h-3.5" }),
  fieldIcon: t = null,
  actions: r = [],
  onSubmit: i,
  onCancel: o,
  clearOnSubmit: s = !0,
  clearOnCancel: l = !0,
  onChange: c,
  value: a,
  variant: u = "primary",
  ...d
}) {
  const f = (g) => {
    i == null || i(g), s && c("");
  }, p = () => {
    o == null || o(), l && c("");
  }, m = [
    ...r,
    ...i ? [{
      key: "submit",
      label: "Submit",
      icon: /* @__PURE__ */ h(er, { className: "w-3.5 h-3.5" }),
      onClick: f
    }] : [],
    ...o ? [{
      key: "cancel",
      label: "Cancel",
      icon: /* @__PURE__ */ h(yn, { className: "w-3.5 h-3.5" }),
      onClick: p
    }] : []
  ];
  return /* @__PURE__ */ h(
    Tf,
    {
      ...d,
      value: a,
      onChange: c,
      triggerLabel: n,
      triggerIcon: e,
      leadingIcon: t,
      actions: m,
      showClear: !1,
      variant: u,
      onSubmit: i ? f : void 0,
      onCancel: o ? p : void 0,
      cancelOnEscape: !!o,
      cancelOnOutside: !!o
    }
  );
}
function Cf(n) {
  return n.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
}
function Ef(n, e, t) {
  if (t.length === 0) return { matched: !1 };
  const r = n.label.toLowerCase(), i = (n.detail || "").toLowerCase(), o = ((e == null ? void 0 : e.label) || "").toLowerCase(), s = n.fields || [], l = [
    r,
    i,
    o,
    n.keywords || "",
    ...s.map((c) => c.value.toLowerCase())
  ].join(`
`);
  if (!t.every((c) => l.includes(c))) return { matched: !1 };
  if (t.every((c) => r.includes(c) || o.includes(c))) return { matched: !0 };
  for (const c of t) {
    const a = s.find((u) => u.value.toLowerCase().includes(c));
    if (a) {
      const u = a.value.trim();
      return { matched: !0, detail: `${a.label}: ${u.length > 48 ? `${u.slice(0, 47)}…` : u}` };
    }
    if (i.includes(c)) return { matched: !0, detail: n.detail };
  }
  return { matched: !0 };
}
function vl(n, e, t) {
  const r = Cf(t), i = r.length > 0, o = new Map(e.map((a) => [a.key, a])), s = [];
  for (const a of n) {
    const { matched: u, detail: d } = Ef(a, a.group ? o.get(a.group) : void 0, r);
    u && s.push({ item: a, detail: d });
  }
  const l = new Set(s.map((a) => a.item.group).filter(Boolean)), c = i ? e.filter((a) => l.has(a.key) || a.label.toLowerCase().includes(t.trim().toLowerCase())) : e;
  return { hits: s, visibleGroups: c, hasQuery: i };
}
function Mf(n) {
  var u;
  const { hits: e, visibleGroups: t, hasQuery: r } = vl(n.items, n.groups, n.query), i = [];
  n.query.trim();
  const o = n.items.filter((d) => d.pinned), s = n.items.filter((d) => !d.pinned), l = e.filter((d) => d.item.pinned), c = e.filter((d) => !d.item.pinned);
  if (!r) {
    for (const d of o) i.push({ kind: "item", hit: { item: d } });
    if (n.browseAll) {
      for (const d of s) i.push({ kind: "item", hit: { item: d } });
      return i;
    }
    if (n.browseGroups !== !1)
      for (const d of t) {
        i.push({ kind: "group", group: d });
        const f = ((u = n.expandedGroups) == null ? void 0 : u.has(d.key)) ?? !1;
        if (n.includeGroupItems)
          for (const p of s)
            p.group === d.key && i.push({ kind: "item", hit: { item: p }, hidden: !f });
        else if (f)
          for (const p of s)
            p.group === d.key && i.push({ kind: "item", hit: { item: p } });
      }
    return i;
  }
  for (const d of l) i.push({ kind: "item", hit: d });
  const a = /* @__PURE__ */ new Set();
  for (const d of t) {
    i.push({ kind: "group", group: d }), a.add(d.key);
    for (const f of c)
      f.item.group === d.key && i.push({ kind: "item", hit: f });
  }
  for (const d of c)
    (!d.item.group || !a.has(d.item.group)) && i.push({ kind: "item", hit: d });
  return i.length === 0 && (i.push({ kind: "empty" }), (n.emptyActionLabels || []).forEach((d, f) => {
    i.push({ kind: "action", label: d, actionIndex: f });
  })), i;
}
function Rf({
  items: n,
  groups: e = [],
  mode: t = "expandable",
  triggerLabel: r = "Search",
  triggerIcon: i,
  placeholder: o = "Search…",
  query: s,
  onQueryChange: l,
  onSelect: c,
  onSelectGroup: a,
  onClose: u,
  closeOnSelect: d = !0,
  openOnFocus: f = !0,
  expandableGroups: p = !1,
  browseExpanded: m = !1,
  groupExpandMode: g = "multiple",
  browseAll: b = !1,
  selectedId: y,
  autoFocus: $ = !0,
  collapsedWidth: z = 128,
  expandedWidth: N = 288,
  panelWidth: w,
  maxMenuHeight: A = 420,
  theme: L = "light",
  morph: O = !0,
  emptyTitle: E,
  emptyHint: q,
  renderEmpty: M,
  emptyActions: I,
  leadingActions: P,
  hideLeadingOnEmpty: Y = !1,
  footerActions: U,
  fieldActions: T,
  multiple: v,
  open: _,
  onOpenChange: fe,
  hideTrigger: he = !1,
  anchorRef: te,
  panelSearch: K = !1,
  portalTarget: ce,
  renderTrigger: ee,
  renderItem: ue,
  highlightOnOpen: W = !0,
  ref: xe
}) {
  const ae = s !== void 0, [me, J] = ie(""), F = ae ? s : me, Le = Q((x) => {
    ae || J(x), l == null || l(x);
  }, [ae, l]), pe = _ !== void 0, [Ue, qe] = ie(!1), Z = pe ? _ : Ue, Me = Q((x) => {
    pe || qe(x), fe == null || fe(x);
  }, [pe, fe]), [oe, Ie] = ie(t === "inline"), je = Ve(() => e.map((x) => x.key).join("\0"), [e]), Ee = Ve(() => new Set(je ? je.split("\0") : []), [je]), [Ke, Ge] = ie(() => m ? Ee : /* @__PURE__ */ new Set()), [lt, Nt] = ie(0), Tt = k(!1), Te = Q((x, D = "keyboard") => {
    Tt.current = D === "pointer", Nt(x);
  }, []), xt = k(null), dt = k(null), Dt = k(null), ft = k(null), ht = k(null), pt = k(0), ct = yi(), bt = Bn(), Fe = Pr(), vt = Ti(), We = Zo(), Ne = Lo(), Ot = 8 + (((T == null ? void 0 : T.length) || 0) + (F ? 1 : 0)) * (Ne.box + 2), [ot, at] = ie({ top: 0, left: 0, maxH: 288, ready: !1 }), [Yt, R] = ie(0);
  Wo({
    anchorRef: te ?? xt,
    panelRef: ft,
    open: Z,
    maxHeight: A,
    anchorRectRef: ht,
    onPosition: (x) => at({ top: x.top, left: x.left, maxH: x.maxH, ready: x.ready })
  }), le(() => {
    const x = (te == null ? void 0 : te.current) ?? xt.current;
    !Z || !x || R(x.getBoundingClientRect().width);
  }, [Z, oe, te]);
  const G = Or({
    visible: Z,
    morph: O,
    anchor: () => {
      var x;
      return ((x = (te == null ? void 0 : te.current) ?? xt.current) == null ? void 0 : x.getBoundingClientRect()) ?? null;
    },
    ref: ft,
    cloneOnUnmount: !0
  }), se = (I || []).map(
    (x) => typeof x.label == "function" ? x.label(F) : x.label
  ), ye = Ve(
    () => Mf({
      items: n,
      groups: e,
      query: F,
      browseGroups: f || m || p,
      browseAll: b,
      expandedGroups: Ke,
      emptyActionLabels: se
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [n, e, F, f, m, p, b, Ke, se.join("\0")]
  ), De = Ve(
    () => (P || []).map((x, D) => ({
      kind: "action",
      label: typeof x.label == "function" ? x.label(F) : x.label,
      actionIndex: D,
      source: "leading"
    })),
    [P, F]
  ), wt = Ve(
    () => (U || []).map((x, D) => ({
      kind: "action",
      label: typeof x.label == "function" ? x.label(F) : x.label,
      actionIndex: D,
      source: "footer"
    })),
    [U, F]
  ), kt = ye.some((x) => x.kind === "empty"), S = De.length > 0 && !(Y && kt), V = S ? De.length : 0, X = Ve(
    () => [...S ? De : [], ...ye, ...wt],
    [S, De, ye, wt]
  ), be = !!a || p && !F.trim(), ge = Ve(
    () => X.map((x, D) => ({ row: x, index: D })).filter((x) => !(x.row.kind === "empty" || x.row.kind === "item" && x.row.hidden || x.row.kind === "group" && !be)),
    [X, be]
  ), Re = (p || m) && !F.trim(), ve = !!v, Pe = Ve(
    () => n.filter((x) => x.checkable !== !1).map((x) => x.id),
    [n]
  ), Je = Ve(() => F.trim() ? vl(n, e, F).hits.filter((x) => x.item.checkable !== !1).map((x) => x.item.id) : Pe, [n, e, F, Pe]), qt = Ve(() => new Set(Je), [Je]), we = Yo({
    mode: (v == null ? void 0 : v.mode) ?? "draft",
    selectedIds: (v == null ? void 0 : v.selectedIds) ?? Go,
    itemIds: Pe,
    visibleIds: Je,
    max: v == null ? void 0 : v.max,
    disabledIds: v == null ? void 0 : v.disabledIds,
    indicator: v == null ? void 0 : v.indicator,
    onCommit: v == null ? void 0 : v.onCommit,
    onDraftChange: v == null ? void 0 : v.onDraftChange,
    onToggle: v == null ? void 0 : v.onToggle
  }), tn = k(we.reset);
  tn.current = we.reset;
  const Pt = typeof (v == null ? void 0 : v.commitLabel) == "function" ? v.commitLabel(we.count) : (v == null ? void 0 : v.commitLabel) ?? `Select ${we.count}`, $e = Q(() => {
    var x;
    Me(!1), t === "expandable" && ((x = dt.current) == null || x.blur(), Ie(!1), requestAnimationFrame(() => {
      var D;
      return (D = Dt.current) == null ? void 0 : D.focus();
    })), pe || Le(""), Te(0), Ge(m ? Ee : /* @__PURE__ */ new Set()), u == null || u();
  }, [t, u, Le, m, Ee, pe, Me]);
  le(() => {
    if (F.trim() || !m) {
      Ge((x) => x.size ? /* @__PURE__ */ new Set() : x);
      return;
    }
    Ge((x) => x.size === Ee.size && [...Ee].every((D) => x.has(D)) ? x : Ee);
  }, [F, m, Ee]), le(() => {
    if (!K || !Z) return;
    const x = requestAnimationFrame(() => {
      var D;
      return (D = dt.current) == null ? void 0 : D.focus();
    });
    return () => cancelAnimationFrame(x);
  }, [K, Z]);
  const Lt = k(!1);
  le(() => {
    if (!Z) {
      Lt.current = !1;
      return;
    }
    if (Lt.current || !p || F.trim()) return;
    const x = y ? [y] : [...(v == null ? void 0 : v.selectedIds) ?? []], D = new Set(x), re = D.size ? e.filter((Ce) => n.some((Oe) => Oe.group === Ce.key && D.has(Oe.id))).map((Ce) => Ce.key) : [];
    if (re.length === 0) {
      Lt.current = !0;
      return;
    }
    const Se = g === "single" ? re.slice(0, 1) : re;
    if (!Se.every((Ce) => Ke.has(Ce))) {
      Ge(new Set(Se));
      return;
    }
    if (W && y) {
      const Ce = X.findIndex((Oe) => Oe.kind === "item" && Oe.hit.item.id === y);
      Ce >= 0 && Te(Ce);
    }
    Lt.current = !0;
  }, [Z, p, F, e, n, y, v == null ? void 0 : v.selectedIds, g, Ke, X, W, Te]);
  const At = Q((x) => {
    Ge((D) => {
      const re = new Set(D);
      return re.has(x) ? re.delete(x) : (g === "single" && re.clear(), re.add(x)), re;
    });
  }, [g]), St = Q(() => {
    var D;
    if (Z) {
      (D = dt.current) == null || D.focus();
      return;
    }
    if (tn.current(), t === "expandable" && !oe) {
      const re = xt.current;
      if (re) {
        const Se = re.style.transition, Ce = re.style.width;
        re.style.transition = "none", re.style.width = `${N}px`;
        const Oe = re.getBoundingClientRect();
        ht.current = { left: Oe.left, top: Oe.top, width: Oe.width, height: Oe.height }, re.style.width = Ce, re.offsetWidth, re.style.transition = Se, window.clearTimeout(pt.current), pt.current = window.setTimeout(() => {
          ht.current = null;
        }, bn + 80);
      }
    }
    Ie(!0), Me(!0);
    const x = y ? ye.findIndex((re) => re.kind === "item" && re.hit.item.id === y) : -1;
    Te(x >= 0 ? V + x : W ? V : -1);
  }, [Z, t, oe, N, V, ye, y, W]);
  le(() => () => {
    window.clearTimeout(pt.current), ht.current = null;
  }, []), le(() => {
    if (t !== "expandable" || !oe || !Z || !$) return;
    const x = requestAnimationFrame(() => {
      var D;
      return (D = dt.current) == null ? void 0 : D.focus();
    });
    return () => cancelAnimationFrame(x);
  }, [t, oe, Z, $]), le(() => {
    var re;
    if (!Z) return;
    const x = ((re = xt.current) == null ? void 0 : re.ownerDocument) ?? ct;
    if (!x) return;
    const D = (Se) => {
      var Oe, Ut, Ft;
      const Ce = Se.target;
      Ce && ((Oe = xt.current) != null && Oe.contains(Ce) || (Ut = ft.current) != null && Ut.contains(Ce) || (Ft = te == null ? void 0 : te.current) != null && Ft.contains(Ce) || $e());
    };
    return x.addEventListener("pointerdown", D, !0), () => x.removeEventListener("pointerdown", D, !0);
  }, [Z, $e, ct, te]);
  const Xe = Q((x) => {
    if (x.kind === "group") {
      a ? (a(x.group), d && $e()) : be && At(x.group.key);
      return;
    }
    if (x.kind === "item") {
      if (ve) {
        we.canToggle(x.hit.item.id) && we.toggle(x.hit.item.id);
        return;
      }
      c(x.hit.item), d && $e();
      return;
    }
    if (x.kind === "action") {
      const D = x.source === "leading" ? P : x.source === "footer" ? U : I, re = D == null ? void 0 : D[x.actionIndex];
      re && re.onClick(F), d && $e();
    }
  }, [$e, d, I, U, be, P, ve, c, a, F, we, At]), Kt = (x) => {
    if (ge.length === 0) return;
    const D = ge.findIndex((Se) => Se.index === lt), re = D < 0 ? 0 : (D + x + ge.length) % ge.length;
    Te(ge[re].index);
  };
  Ao(xe, () => ({
    moveHighlight: Kt,
    activateHighlighted: () => {
      const x = lt >= 0 ? X[lt] : void 0;
      return x ? (Xe(x), !0) : !1;
    },
    close: $e,
    selectAll: () => {
      ve && we.setAll(!0);
    },
    setSelection: (x) => {
      we.reset(x);
    }
  }), [X, lt, Xe, $e, ve, we]);
  const Bt = (x) => {
    if (ve && (x.metaKey || x.ctrlKey) && x.key.toLowerCase() === "a") {
      x.preventDefault(), x.stopPropagation(), we.setAll(!0);
      return;
    }
    if (x.key === "ArrowDown")
      x.preventDefault(), Z ? Kt(1) : St();
    else if (x.key === "ArrowUp")
      x.preventDefault(), Kt(-1);
    else if ((x.key === "ArrowRight" || x.key === "ArrowLeft") && p && Z && !F.trim()) {
      const D = X[lt];
      if ((D == null ? void 0 : D.kind) === "group") {
        const re = Ke.has(D.group.key);
        (x.key === "ArrowRight" || re) && (x.preventDefault(), At(D.group.key));
      } else if ((D == null ? void 0 : D.kind) === "item" && x.key === "ArrowLeft" && D.hit.item.group) {
        x.preventDefault();
        const re = D.hit.item.group;
        Ke.has(re) && At(re);
        const Se = X.findIndex((Ce) => Ce.kind === "group" && Ce.group.key === re);
        Se >= 0 && Te(Se);
      }
    } else if (x.key === "Enter") {
      x.preventDefault();
      const D = X[lt] ?? X[0];
      D && Xe(D);
    } else x.key === "Escape" && (x.preventDefault(), $e());
  }, dn = (x) => {
    t === "expandable" && !oe || (Le(x), Z || Me(!0));
  };
  le(() => {
    const x = ye.findIndex((D) => D.kind === "item");
    Te(x >= 0 ? V + x : V);
  }, [F]), le(() => {
    if (!Z) return;
    const x = y ? ye.findIndex((D) => D.kind === "item" && D.hit.item.id === y) : -1;
    Te(x >= 0 ? V + x : W ? V : -1);
  }, [Z]), mt(() => {
    Z && tn.current();
  }, [Z]);
  const Hn = (x) => /* @__PURE__ */ C("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
    T == null ? void 0 : T.map((D) => /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        "aria-label": D.label,
        title: D.label,
        tabIndex: oe ? 0 : -1,
        onMouseDown: (re) => re.preventDefault(),
        onClick: () => {
          D.onClick(F, { close: $e }), D.keepOpen || $e();
        },
        style: { width: Ne.box, height: Ne.box },
        className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
        "data-search-field-action": D.key,
        children: /* @__PURE__ */ h(
          "span",
          {
            style: { width: Ne.icon, height: Ne.icon },
            className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
            children: D.icon
          }
        )
      },
      D.key
    )),
    F && /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        "aria-label": "Clear search",
        tabIndex: oe ? 0 : -1,
        onPointerDown: (D) => D.preventDefault(),
        onClick: x,
        style: { width: Ne.box, height: Ne.box },
        className: "ui-icon-btn flex items-center justify-center rounded",
        children: /* @__PURE__ */ h(yn, { size: Ne.icon })
      }
    )
  ] }), Sn = /* @__PURE__ */ C("div", { className: "relative w-full", children: [
    /* @__PURE__ */ h(on, { size: Ne.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ h(
      "input",
      {
        ref: dt,
        value: F,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": Z,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (x) => dn(x.target.value),
        onFocus: () => {
          f && St();
        },
        onClick: () => {
          f && St();
        },
        onKeyDown: Bt,
        placeholder: o,
        style: { paddingRight: Ot },
        className: `${qn("sm")} w-full pl-8`
      }
    ),
    Hn(() => {
      Le(""), Z || St();
    })
  ] }), ir = /* @__PURE__ */ C("div", { className: "absolute inset-0", children: [
    /* @__PURE__ */ h(on, { size: Ne.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ h(
      "input",
      {
        ref: dt,
        value: F,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": Z,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (x) => dn(x.target.value),
        onFocus: () => {
          f && oe && St();
        },
        onClick: () => {
          f && oe && St();
        },
        onKeyDown: Bt,
        placeholder: o,
        tabIndex: oe ? 0 : -1,
        style: { paddingRight: Ot },
        className: `${qn("sm")} h-full w-full pl-8`
      }
    ),
    Hn(() => {
      Le(""), !Z && oe && St();
    })
  ] });
  le(() => {
    if (!Z || Tt.current) return;
    const x = ft.current;
    an(
      x == null ? void 0 : x.querySelector(`[data-search-row="${lt}"]`),
      "nearest",
      (x == null ? void 0 : x.querySelector("[data-search-scroller]")) ?? null
    );
  }, [Z, lt]);
  const H = k(ye);
  H.current = ye;
  const de = k(y);
  de.current = y;
  const ke = Vo({
    open: Z,
    block: "center",
    ready: ot.ready,
    scroller: () => {
      var x;
      return ((x = ft.current) == null ? void 0 : x.querySelector("[data-search-scroller]")) ?? null;
    },
    row: () => {
      var re;
      const x = de.current;
      if (!x) return null;
      const D = H.current.findIndex((Se) => Se.kind === "item" && Se.hit.item.id === x);
      return D < 0 ? null : ((re = ft.current) == null ? void 0 : re.querySelector(`[data-search-row="${D}"]`)) ?? null;
    }
  }), rt = (x, D) => {
    const re = lt === D, Se = !ve && y !== void 0 && x.hit.item.id === y, Ce = ve ? we.isSelected(x.hit.item.id) : Se, Oe = !!x.hit.item.disabled || ve && !we.canToggle(x.hit.item.id), Ut = x.hit.item.tone === "create" ? L === "light" ? { background: re ? "#d1fae5" : "#ecfdf5", color: re ? "#065f46" : "#047857" } : { background: re ? "rgba(6, 95, 70, 0.7)" : "rgba(6, 78, 59, 0.4)", color: re ? "#d1fae5" : "#6ee7b7" } : void 0;
    return /* @__PURE__ */ C(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": Ce,
        tabIndex: -1,
        "data-search-item": x.hit.item.id,
        "data-search-row": D,
        "data-search-create": x.hit.item.tone === "create" ? "" : void 0,
        onMouseDown: (Ft) => Ft.preventDefault(),
        onMouseEnter: () => Te(D, "pointer"),
        onClick: () => Xe(x),
        style: { ...vt, ...x.hit.item.rowStyle, ...Ut },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${Fe.itemDefault} ${x.hit.item.rowClassName ?? ""} ${Se ? "ui-item-selected" : ""} ${re ? "ui-item-highlighted" : ""} ${Oe ? "opacity-30 pointer-events-none" : ""}`,
        children: [
          ve && x.hit.item.checkable !== !1 && /* @__PURE__ */ h(Sr, { checked: Ce, disabled: Oe, indicator: v == null ? void 0 : v.indicator }),
          ue ? /* @__PURE__ */ h("span", { className: "flex min-w-0 flex-1 items-center gap-2", children: ue(x.hit.item, { checked: Ce, disabled: Oe }) }) : /* @__PURE__ */ C(Qe, { children: [
            x.hit.item.icon && /* @__PURE__ */ h("span", { className: `${Fe.icon} shrink-0`, children: x.hit.item.icon }),
            /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: x.hit.item.label }),
            (x.hit.detail || x.hit.item.detail) && /* @__PURE__ */ h("span", { className: "shrink-0 max-w-[55%] truncate text-[10px] text-zinc-400", children: x.hit.detail || x.hit.item.detail }),
            Se && /* @__PURE__ */ h(er, { className: "ui-icon w-3.5 h-3.5 shrink-0", "aria-hidden": !0 })
          ] })
        ]
      },
      `item:${x.hit.item.id}`
    );
  }, Jt = (x, D) => {
    var Vi;
    const re = Ke.has(x.group.key), Se = p && !F.trim(), Ce = be, Oe = Ce && lt === D, Ut = ve ? n.filter((it) => it.group === x.group.key && qt.has(it.id) && it.checkable !== !1) : [], Ft = Ut.filter((it) => !we.isDisabled(it.id)).map((it) => it.id), Nn = ve ? (Vi = v == null ? void 0 : v.groupToken) == null ? void 0 : Vi.call(v, x.group.key) : void 0, Wi = !!Nn && we.isSelected(Nn), qi = Wi ? "all" : Ft.length > 0 ? we.groupState(Ft) : "none", Sl = Wi ? Ut.length : Ut.reduce((it, Nl) => it + (we.isSelected(Nl.id) ? 1 : 0), 0), Ki = ve && /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        tabIndex: -1,
        "aria-label": `Select all ${x.group.label}`,
        onMouseDown: (it) => it.preventDefault(),
        onClick: (it) => {
          it.stopPropagation(), Nn ? we.toggle(Nn) : Ft.length && we.toggleGroup(Ft);
        },
        className: `shrink-0 flex items-center justify-center rounded ${Nn || Ft.length ? "cursor-pointer" : "cursor-not-allowed"}`,
        children: /* @__PURE__ */ h(
          Sr,
          {
            checked: qi === "all",
            indeterminate: qi === "some",
            disabled: !Nn && Ft.length === 0,
            indicator: v == null ? void 0 : v.indicator
          }
        )
      }
    ), Ji = ve ? /* @__PURE__ */ C("span", { className: `shrink-0 tabular-nums text-[10px] ${Ce ? "text-zinc-400" : "opacity-70"}`, children: [
      Sl,
      "/",
      Ut.length
    ] }) : x.group.count !== void 0 && /* @__PURE__ */ h("span", { className: `shrink-0 tabular-nums ${Ce ? "text-[10px] text-zinc-400" : "opacity-70"}`, children: x.group.count });
    return Ce ? /* @__PURE__ */ C(
      "div",
      {
        role: "option",
        "aria-selected": !1,
        "aria-expanded": Se ? re : void 0,
        "data-search-group": x.group.key,
        onMouseEnter: () => Te(D, "pointer"),
        style: vt,
        className: `w-full rounded flex items-center gap-1 outline-none select-none font-medium ${Fe.itemDefault} ${Oe ? "ui-item-highlighted" : ""}`,
        children: [
          Ki,
          /* @__PURE__ */ C(
            "button",
            {
              type: "button",
              tabIndex: -1,
              onMouseDown: (it) => it.preventDefault(),
              onClick: () => Xe(x),
              className: "flex min-w-0 flex-1 cursor-pointer items-center gap-2 text-left",
              children: [
                x.group.icon && /* @__PURE__ */ h("span", { className: `${Fe.icon} shrink-0`, children: x.group.icon }),
                /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: x.group.label }),
                Ji
              ]
            }
          ),
          Se && /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `${re ? "Collapse" : "Expand"} ${x.group.label}`,
              "aria-expanded": re,
              onMouseDown: (it) => it.preventDefault(),
              onClick: (it) => {
                it.stopPropagation(), At(x.group.key);
              },
              style: { width: Ne.box, height: Ne.box },
              className: "shrink-0 flex cursor-pointer items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              children: /* @__PURE__ */ h(
                xn,
                {
                  size: Ne.icon,
                  className: `transition-transform duration-200 ${re ? "rotate-180" : ""}`
                }
              )
            }
          )
        ]
      },
      `group:${x.group.key}`
    ) : /* @__PURE__ */ C(
      "div",
      {
        role: "presentation",
        "data-search-group": x.group.key,
        "data-search-row": D,
        style: We,
        className: "w-full flex items-center gap-2 select-none font-semibold uppercase tracking-wider ui-label",
        children: [
          Ki,
          x.group.icon && /* @__PURE__ */ h("span", { className: `${Fe.icon} shrink-0`, children: x.group.icon }),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: x.group.label }),
          Ji
        ]
      },
      `group:${x.group.key}`
    );
  }, qr = (x, D) => {
    var Ce;
    const re = lt === D, Se = x.source === "leading" ? P : x.source === "footer" ? U : I;
    return /* @__PURE__ */ C(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": !1,
        tabIndex: -1,
        "data-search-action": x.source || "empty",
        "data-search-row": D,
        onMouseDown: (Oe) => Oe.preventDefault(),
        onMouseEnter: () => Te(D, "pointer"),
        onClick: () => Xe(x),
        style: vt,
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${Fe.itemDefault} ${re ? "ui-item-highlighted" : ""}`,
        children: [
          /* @__PURE__ */ h("span", { className: `${Fe.icon} shrink-0`, children: ((Ce = Se == null ? void 0 : Se[x.actionIndex]) == null ? void 0 : Ce.icon) || /* @__PURE__ */ h($r, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: x.label })
        ]
      },
      `${x.source || "empty"}:${x.actionIndex}`
    );
  }, kl = () => /* @__PURE__ */ h("div", { className: "px-3 py-3 text-center", "data-search-empty": !0, children: M ? M({ query: F, close: $e }) : /* @__PURE__ */ C(Qe, { children: [
    /* @__PURE__ */ h("div", { className: "mx-auto mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-400", children: /* @__PURE__ */ h(on, { className: "w-3.5 h-3.5" }) }),
    /* @__PURE__ */ h("div", { className: "text-xs font-medium text-zinc-500", children: E || `No matches for “${F.trim()}”` }),
    /* @__PURE__ */ h("div", { className: "mt-0.5 text-[10px] text-zinc-400", children: q || "Try a name, phone number, board ID or category." })
  ] }) }, "__empty"), or = [];
  for (let x = 0; x < ye.length; x++) {
    const D = ye[x];
    if (D.kind === "group") {
      const re = [];
      let Se = x + 1;
      for (; Se < ye.length && ye[Se].kind === "item" && ye[Se].hit.item.group === D.group.key; )
        re.push({ row: ye[Se], index: Se }), Se++;
      or.push({ group: D, index: x, items: re }), x = Se - 1;
    } else D.kind === "item" ? or.push({ row: D, index: x }) : or.push({ row: D, index: x });
  }
  const Kr = Z ? zr(
    /* @__PURE__ */ C(
      "div",
      {
        ref: G,
        id: "search-menu-panel",
        "data-theme": L,
        role: "listbox",
        "aria-label": o,
        "aria-multiselectable": ve ? !0 : void 0,
        onPointerEnter: ke.engage,
        onPointerDown: ke.engage,
        className: "ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none min-w-0 overflow-hidden",
        style: {
          position: "fixed",
          left: ot.left,
          top: ot.top,
          width: w ?? (t === "expandable" ? N : Yt || void 0),
          maxHeight: ot.maxH,
          visibility: ot.ready ? "visible" : "hidden"
        },
        children: [
          K && /* @__PURE__ */ h("div", { className: "shrink-0 px-2 pb-1 pt-2", children: /* @__PURE__ */ C("div", { className: "relative", children: [
            /* @__PURE__ */ h(on, { size: Ne.icon, className: "ui-icon absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" }),
            /* @__PURE__ */ h(
              "input",
              {
                ref: dt,
                value: F,
                "data-search-input": !0,
                role: "combobox",
                "aria-expanded": Z,
                "aria-controls": "search-menu-panel",
                "aria-autocomplete": "list",
                onChange: (x) => dn(x.target.value),
                onKeyDown: Bt,
                placeholder: o,
                className: `${qn("sm")} w-full pl-8`
              }
            )
          ] }) }),
          S && /* @__PURE__ */ C("div", { className: "shrink-0 pb-1", children: [
            De.map((x, D) => qr(x, D)),
            ye.length > 0 && /* @__PURE__ */ h("div", { className: Fe.separator })
          ] }),
          /* @__PURE__ */ C("div", { "data-search-scroller": !0, className: "overflow-y-auto scrollbar-custom flex flex-col min-h-0", children: [
            ye.length === 0 && /* @__PURE__ */ h("div", { className: "px-3 py-3 text-xs text-zinc-400", "data-search-empty": !0, children: M ? M({ query: F, close: $e }) : /* @__PURE__ */ h(Qe, { children: "Type to search…" }) }),
            or.map((x) => {
              if (x.group) {
                const Se = Ke.has(x.group.group.key), Ce = x.items || [];
                return /* @__PURE__ */ C(et.Fragment, { children: [
                  Jt(x.group, V + x.index),
                  Re && /* @__PURE__ */ h(
                    "div",
                    {
                      "data-search-group-items": x.group.group.key,
                      "aria-hidden": !Se,
                      className: "motion-reduce:transition-none",
                      style: {
                        display: "grid",
                        gridTemplateRows: Se ? "1fr" : "0fr",
                        opacity: Se ? 1 : 0,
                        transition: "grid-template-rows 220ms cubic-bezier(0.32, 0.72, 0, 1), opacity 150ms ease"
                      },
                      children: /* @__PURE__ */ h("div", { className: "overflow-hidden flex flex-col", children: Ce.map((Oe) => rt(Oe.row, V + Oe.index)) })
                    }
                  ),
                  !Re && Ce.map((Oe) => rt(Oe.row, V + Oe.index))
                ] }, `group:${x.group.group.key}`);
              }
              const D = x.row, re = V + x.index;
              return D.kind === "empty" ? kl() : D.kind === "action" ? qr(D, re) : D.kind === "item" ? rt(D, re) : null;
            })
          ] }),
          wt.length > 0 && /* @__PURE__ */ C("div", { className: "shrink-0", children: [
            /* @__PURE__ */ h("div", { className: Fe.separator }),
            wt.map((x, D) => qr(x, V + ye.length + D))
          ] }),
          ve && (v == null ? void 0 : v.footer) !== !1 && /* @__PURE__ */ h(
            Xo,
            {
              count: we.count,
              max: v == null ? void 0 : v.max,
              hiddenCount: (v == null ? void 0 : v.hiddenNote) === !1 ? 0 : we.hiddenCount,
              clear: (v == null ? void 0 : v.clear) !== !1,
              theme: L,
              onClear: we.clear,
              hero: (v == null ? void 0 : v.mode) === "live" ? void 0 : {
                label: Pt,
                onClick: () => {
                  we.commit(), $e();
                },
                disabled: we.count === 0
              }
            }
          )
        ]
      }
    ),
    ce ?? bt ?? (ct == null ? void 0 : ct.body) ?? document.body
  ) : null;
  return he ? /* @__PURE__ */ C(Qe, { children: [
    /* @__PURE__ */ h("div", { ref: xt, "data-search-menu": !0, "data-mode": "hidden", className: "hidden", "aria-hidden": !0 }),
    Kr
  ] }) : t === "inline" ? /* @__PURE__ */ C("div", { ref: xt, "data-search-menu": !0, "data-mode": t, className: "relative inline-flex", style: { width: "100%" }, children: [
    Sn,
    Kr
  ] }) : /* @__PURE__ */ h(
    _i,
    {
      expanded: oe,
      collapsedWidth: z,
      expandedWidth: N,
      rootRef: xt,
      "data-search-menu": !0,
      "data-mode": t,
      trigger: ee ? ee({ open: Z, expanded: oe, toggle: St }) : /* @__PURE__ */ h(
        Ct,
        {
          ref: Dt,
          type: "button",
          variant: "primary",
          size: "minimal",
          theme: L === "dark" ? "dark" : "light",
          icon: i ?? /* @__PURE__ */ h(on, { className: "w-3.5 h-3.5" }),
          onClick: St,
          className: `w-full justify-start ${oe ? "pointer-events-none" : ""}`,
          tabIndex: oe ? -1 : 0,
          "data-search-trigger": !0,
          children: /* @__PURE__ */ h("span", { children: r })
        }
      ),
      field: /* @__PURE__ */ C(Qe, { children: [
        ir,
        Kr
      ] })
    }
  );
}
function gn(n, e = "id") {
  return e === "label" ? n.label : n.id;
}
function wl(n, e, t = "id") {
  const r = e.find((i) => gn(i, t) === n);
  return (r == null ? void 0 : r.label) || n;
}
function Af(n) {
  return n.split(",").map((e) => e.trim()).filter(Boolean);
}
function If(n) {
  const e = n.split(",");
  return (e[e.length - 1] || "").trim();
}
function ji(n, e, t = "id") {
  const r = n.trim();
  if (!r) return "";
  const i = e.find((l) => gn(l, t) === r);
  if (i) return gn(i, t);
  const o = r.toLowerCase(), s = e.find((l) => l.label.toLowerCase() === o);
  return s ? gn(s, t) : r;
}
function $f(n, e, t = "id") {
  const r = /* @__PURE__ */ new Set(), i = [];
  for (const o of Af(n)) {
    const s = ji(o, e, t);
    !s || r.has(s) || (r.add(s), i.push(s));
  }
  return i;
}
function zf(n, e, t = "id") {
  const r = n.split(",").map((l) => l.trim()).filter(Boolean), i = n.trimEnd().endsWith(",") ? r : r.slice(0, -1), o = /* @__PURE__ */ new Set(), s = [];
  for (const l of i) {
    const c = ji(l, e, t);
    !c || o.has(c) || (o.add(c), s.push(c));
  }
  return s;
}
function Df(n, e, t = "id") {
  const r = n.trim();
  if (!r) return !0;
  const i = r.toLowerCase();
  return e.some((o) => gn(o, t).toLowerCase() === i || o.label.toLowerCase() === i);
}
function Of(n, e, t = "id") {
  const r = new Set(e.map((i) => gn(i, t)));
  return n.filter((i) => !r.has(i));
}
function Pf(n, e, t, r, i) {
  return i ? i([...n], [...e]) : r === "count" ? n.length ? `${n.length} selected` : "" : r === "chips" ? "" : n.map((o) => wl(o, e, t)).join(", ");
}
const Lf = () => {
};
function jh({
  values: n,
  onChange: e,
  items: t,
  groups: r = [],
  resolveBy: i = "id",
  mode: o = "multiple",
  appearance: s = "inline",
  display: l = "names",
  formatDisplay: c,
  renderTrigger: a,
  renderItem: u,
  badge: d,
  trailing: f,
  anchoredKeys: p,
  anchoredLabel: m = "Element link anchor",
  placeholder: g = "Select…",
  searchPlaceholder: b = "Search…",
  readOnly: y = !1,
  disabled: $ = !1,
  autoFocus: z = !1,
  defaultOpen: N = !1,
  selectAllOnOpen: w = !0,
  uppercase: A = !1,
  allowFreeText: L = !0,
  theme: O,
  className: E = "",
  style: q,
  panelWidth: M,
  maxMenuHeight: I,
  portalTarget: P,
  autoGrow: Y = !1,
  skipComma: U = !1,
  collapsedWidth: T = 140,
  expandedWidth: v = 280,
  createLabel: _,
  onCreateItem: fe,
  onExit: he,
  onEscape: te,
  onTabExit: K,
  loadItems: ce,
  sortItems: ee,
  max: ue,
  disabledIds: W,
  indicator: xe,
  browse: ae,
  groupToken: me
}) {
  const J = Vt(), F = O ?? (J == null ? void 0 : J.mode) ?? "light", Le = Be(), pe = Q((H) => gn(H, i), [i]), Ue = Ve(() => t.map(pe), [t, pe]), qe = Ve(() => new Map(t.map((H) => [pe(H), H])), [t, pe]), Z = Q((H) => wl(H, t, i), [t, i]), Me = Ve(() => new Set([...p ?? []].map((H) => H.toLowerCase())), [p]), [oe, Ie] = ie(!1), [je, Ee] = ie(""), [Ke, Ge] = ie(""), [lt, Nt] = ie(""), [Tt, Te] = ie(() => [...n]), [xt, dt] = ie(null), [Dt, ft] = ie(!1), ht = k(null), pt = k(null), ct = k(null), bt = k(null), Fe = k(n.join("\0")), vt = k(!1), We = k(/* @__PURE__ */ new Set()), Ne = k(!1), Wt = k(!1), Ot = k(0), ot = k(""), at = k([...n]), Yt = n.join("\0"), R = Ve(
    () => Pf(n, t, i, l, c),
    [n, t, i, l, c]
  ), G = Q((H) => {
    if (o === "single") return H[0] ? Z(H[0]) : "";
    const de = H.map(Z).join(", ");
    return U ? de : H.length ? `${de}, ` : "";
  }, [o, Z, U]);
  le(() => {
    oe || (Te([...n]), at.current = [...n], Fe.current = Yt);
  }, [Yt, oe]);
  const se = Q(() => {
    if (oe || y || $) return;
    vt.current = !1, Ne.current = !0;
    const H = G(n);
    ot.current = H, at.current = [...n], Te([...n]), Ee(H), Ge(""), Nt(""), Ie(!0);
  }, [oe, y, $, n, G]);
  mt(() => {
    if (!oe) return;
    const H = ht.current;
    H && (H.focus(), o === "single" && w ? H.setSelectionRange(0, H.value.length) : H.setSelectionRange(H.value.length, H.value.length));
  }, [oe]), mt(() => {
    if (!Wt.current) return;
    Wt.current = !1;
    const H = ht.current;
    H && (H.focus(), H.setSelectionRange(H.value.length, H.value.length));
  }, [je]), le(() => {
    (N || z) && se();
  }, []);
  const ye = s === "button" ? lt : o === "single" ? Ke : If(je), De = ce ? xt ?? [] : t, wt = Ve(
    () => ee ? ee(De, Tt) : De,
    [De, ee, Tt]
  ), kt = ye.trim(), S = !!fe && L && !Dt && !!kt && !Df(kt, De, i);
  le(() => {
    if (!ce || !oe) return;
    const H = ye.trim();
    if (!H) {
      dt(null), ft(!1);
      return;
    }
    ft(!0);
    const de = ++Ot.current, ke = setTimeout(() => {
      ce(H).then((rt) => {
        Ot.current === de && (dt(rt), ft(!1));
      }).catch(() => {
        Ot.current === de && (dt([]), ft(!1));
      });
    }, 400);
    return () => clearTimeout(ke);
  }, [ce, oe, ye]);
  const V = Ve(() => {
    const H = wt.filter((de) => !de.hidden).map((de) => ({
      id: pe(de),
      label: de.label,
      group: de.group,
      detail: de.detail,
      icon: de.icon,
      disabled: !!de.disabled || !!(W != null && W.includes(pe(de))),
      fields: de.fields,
      keywords: de.keywords,
      rowClassName: de.rowClassName,
      rowStyle: de.rowStyle
    }));
    return S && H.unshift({
      id: kt,
      label: _ ? _(kt) : `Add “${kt}”…`,
      keywords: kt,
      checkable: !1,
      tone: "create",
      pinned: !0
    }), H;
  }, [wt, pe, W, S, kt, _]), X = Q((H) => {
    const de = H.join("\0");
    if (de !== Fe.current) {
      if (fn(H, n)) {
        Fe.current = de;
        return;
      }
      if (Fe.current = de, e(H), fe)
        for (const ke of Of(H, t, i))
          We.current.has(ke) || (We.current.add(ke), fe(ke));
    }
  }, [n, e, fe, t, i]), be = Q((H, de) => {
    !de || !fe || !L || t.some((ke) => pe(ke) === H) || We.current.has(H) || (We.current.add(H), fe(H));
  }, [fe, L, t, pe]), ge = Q(() => {
    if (!Ne.current || (Ne.current = !1, y || $)) return;
    if (vt.current) {
      vt.current = !1;
      return;
    }
    const H = ot.current, de = new Set(Ue), ke = s === "button" ? o === "single" ? at.current.slice(0, 1) : Rt([...at.current], Ue) : o === "single" ? (() => {
      const rt = H.trim();
      if (!rt) return L ? [] : n;
      const Jt = ji(rt, t, i);
      return !L && !de.has(Jt) ? n : [Jt];
    })() : Rt(
      $f(H, t, i).filter((rt) => L || de.has(rt)),
      Ue
    );
    at.current = ke, Te(ke), Ge(""), Nt(""), Ie(!1), X(ke), he == null || he();
  }, [y, $, o, t, i, Ue, L, n, X, he, s]), Re = Q((H) => {
    Ie(H), H || ge();
  }, [ge]), ve = Q(() => {
    vt.current = !0, Ne.current = !1;
    const H = G(n);
    ot.current = H, at.current = [...n], Te([...n]), Ee(H), Ge(""), Nt(""), Ie(!1), te == null || te();
  }, [n, G, te]), Pe = Q((H) => {
    const de = Rt(H, Ue), ke = de.length ? `${de.map(Z).join(", ")}, ` : "";
    at.current = de, ot.current = ke, Te(de), Wt.current = !0, Ee(ke);
  }, [Ue, Z]), Je = Q((H) => {
    const de = H.id;
    Ne.current = !1;
    const ke = Z(de);
    at.current = [de], ot.current = ke, Te([de]), Ee(ke), Ge(""), Ie(!1), X([de]), he == null || he();
  }, [Z, X, he]), qt = (H) => {
    var de, ke, rt, Jt;
    if (H.key === "Escape") {
      H.preventDefault(), ve();
      return;
    }
    if (H.key === "Tab") {
      H.preventDefault(), oe && ge(), (de = K ?? he) == null || de(ht.current ?? void 0);
      return;
    }
    if (H.key === "ArrowDown" || H.key === "ArrowUp") {
      if (H.preventDefault(), !oe) {
        se();
        return;
      }
      (ke = bt.current) == null || ke.moveHighlight(H.key === "ArrowDown" ? 1 : -1);
      return;
    }
    if (H.key === "Enter") {
      if (H.preventDefault(), oe && ((rt = bt.current) != null && rt.activateHighlighted())) return;
      ge();
      return;
    }
    o === "multiple" && oe && (H.metaKey || H.ctrlKey) && H.key.toLowerCase() === "a" && (H.preventDefault(), (Jt = bt.current) == null || Jt.selectAll());
  }, we = (H) => {
    var ke;
    const de = A ? H.target.value.toUpperCase() : H.target.value;
    if (ot.current = de, Ee(de), o === "single" && Ge(de), oe || Ie(!0), o === "multiple") {
      const rt = Rt(zf(de, t, i), Ue);
      at.current = rt, Te(rt), (ke = bt.current) == null || ke.setSelection(rt);
    }
  }, tn = () => {
    if (Ne.current) {
      if (vt.current) {
        vt.current = !1;
        return;
      }
      ge();
    }
  }, Pt = Q((H, de) => {
    const ke = qe.get(H.id);
    if (!ke)
      return /* @__PURE__ */ C(Qe, { children: [
        /* @__PURE__ */ h($r, { className: "h-3.5 w-3.5 shrink-0" }),
        /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: H.label })
      ] });
    const rt = !!p && (i === "label" ? Me.has(ke.label.toLowerCase()) : p.has(pe(ke))), Jt = (d == null ? void 0 : d(ke)) ?? ke.badge ?? null;
    return /* @__PURE__ */ C(Qe, { children: [
      u ? u(ke, de.checked) : /* @__PURE__ */ C(Qe, { children: [
        ke.icon && /* @__PURE__ */ h("span", { className: "shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5", children: ke.icon }),
        /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: ke.label }),
        Jt && /* @__PURE__ */ h("span", { className: "shrink-0 text-[10px] text-[color:var(--ui-text-faint)]", children: Jt }),
        f == null ? void 0 : f(ke)
      ] }),
      rt && /* @__PURE__ */ h("span", { className: "shrink-0 inline-flex", title: m, "aria-label": m, children: /* @__PURE__ */ h(Pl, { className: "h-3.5 w-3.5 text-amber-500" }) })
    ] });
  }, [qe, p, Me, i, pe, d, u, f, m]), $e = /* @__PURE__ */ h(
    Rf,
    {
      ref: bt,
      mode: "inline",
      hideTrigger: !0,
      panelSearch: s === "button",
      placeholder: b,
      open: oe,
      onOpenChange: Re,
      anchorRef: s === "morph" ? ct : pt,
      items: V,
      groups: r,
      query: ye,
      onQueryChange: s === "button" ? Nt : void 0,
      onSelect: Je,
      closeOnSelect: o === "single",
      selectedId: o === "single" ? Tt[0] : void 0,
      multiple: o === "multiple" ? {
        selectedIds: Tt,
        mode: "live",
        onDraftChange: Pe,
        onToggle: be,
        onCommit: Lf,
        max: ue,
        disabledIds: W,
        indicator: xe,
        groupToken: me
      } : void 0,
      openOnFocus: !1,
      autoFocus: !1,
      highlightOnOpen: o === "single",
      browseAll: r.length === 0,
      browseExpanded: r.length > 0 && (ae ?? "open") === "open",
      expandableGroups: r.length > 0 && ae === "accordion",
      groupExpandMode: "single",
      renderItem: Pt,
      emptyTitle: Dt ? "Searching…" : void 0,
      emptyHint: Dt ? "Fetching matching records." : void 0,
      theme: F,
      panelWidth: M,
      maxMenuHeight: I,
      portalTarget: P
    }
  );
  if (y)
    return /* @__PURE__ */ h("span", { className: E, style: q, children: R || "?" });
  const Lt = !oe && !R, At = oe ? je : R, St = {
    ref: ht,
    value: oe ? je : R,
    disabled: $,
    readOnly: y,
    placeholder: "",
    onFocus: se,
    onClick: se,
    onChange: we,
    onBlur: tn,
    onKeyDown: qt,
    autoComplete: "off",
    spellCheck: !1
  };
  if (s === "morph")
    return /* @__PURE__ */ h(
      _i,
      {
        expanded: oe,
        collapsedWidth: T,
        expandedWidth: v,
        rootRef: pt,
        className: E,
        style: q,
        trigger: a ? a({ values: [...n], items: t, display: R, open: oe, toggle: se }) : /* @__PURE__ */ h(
          Ct,
          {
            size: "minimal",
            variant: "primary",
            theme: F === "dark" ? "dark" : "light",
            onClick: se,
            disabled: $,
            className: `w-full justify-start ${Lt ? "text-current/70" : ""}`,
            children: R || g
          }
        ),
        field: /* @__PURE__ */ C("div", { ref: ct, className: "relative h-full", children: [
          /* @__PURE__ */ h(
            "input",
            {
              ...St,
              className: `${qn("sm")} h-full w-full`
            }
          ),
          $e
        ] })
      }
    );
  const Xe = s === "chip", Kt = s === "button", Bt = s === "wrap", dn = !Xe && !Bt && Y, Hn = Xe || Kt ? B(5, 7, Le) : 0, Sn = Xe || Kt ? B(9, 12, Le) : 0, ir = B(12, 14, Le);
  return Kt ? /* @__PURE__ */ C("div", { ref: pt, "data-picker-field": !0, className: `relative ${E}`, style: q, children: [
    /* @__PURE__ */ C(
      "button",
      {
        type: "button",
        disabled: $,
        onClick: () => {
          oe ? Re(!1) : se();
        },
        className: "flex w-full cursor-pointer select-none items-center justify-between gap-2 rounded border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left outline-none transition-colors hover:bg-[var(--ui-seg-track-bg)] focus:border-[color:var(--ui-input-focus-border)] disabled:cursor-default disabled:opacity-50",
        style: { padding: `${Hn}px ${Sn}px`, fontSize: ir },
        children: [
          /* @__PURE__ */ h("span", { className: `min-w-0 flex-1 truncate ${Lt ? "italic text-[color:var(--ui-text-muted)]" : ""}`, children: R || g }),
          /* @__PURE__ */ h(xn, { className: "pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" })
        ]
      }
    ),
    $e
  ] }) : /* @__PURE__ */ C(
    "div",
    {
      ref: pt,
      "data-picker-field": !0,
      className: `relative ${Xe ? "flex w-full items-center gap-1.5 rounded border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left outline-none focus-within:border-[color:var(--ui-input-focus-border)]" : Bt ? "min-h-[1lh] w-full pb-[1lh]" : dn ? "w-max max-w-[400px] min-w-[72px]" : "h-[1lh] w-full"} ${E}`,
      style: Xe ? { padding: `${Hn}px ${Sn}px`, fontSize: ir, ...q } : q,
      onMouseDown: (H) => H.stopPropagation(),
      onContextMenu: (H) => {
        H.preventDefault(), H.stopPropagation();
      },
      onAuxClick: se,
      children: [
        Xe && a ? /* @__PURE__ */ h("span", { className: "pointer-events-none flex min-w-0 flex-1 items-center", children: a({ values: [...n], items: t, display: R, open: oe, toggle: se }) }) : l === "chips" && !oe ? /* @__PURE__ */ C("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1", children: [
          n.map((H) => /* @__PURE__ */ h(
            "span",
            {
              className: "inline-flex items-center rounded border border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-1.5 py-0.5 text-[10px] text-[color:var(--ui-text)]",
              children: Z(H)
            },
            H
          )),
          n.length === 0 && /* @__PURE__ */ h("span", { className: "italic text-[color:var(--ui-text-muted)]", children: g })
        ] }) : /* @__PURE__ */ h(
          "span",
          {
            className: `pointer-events-none text-left ${Xe ? "min-w-0 flex-1 truncate" : Bt ? "block whitespace-pre-wrap break-words leading-relaxed" : "absolute inset-y-0 inset-x-0 flex items-center truncate whitespace-nowrap"} ${Lt ? "italic text-[color:var(--ui-text-muted)]" : ""}`,
            children: At || g
          }
        ),
        Bt ? /* @__PURE__ */ h(
          "textarea",
          {
            ...St,
            rows: 1,
            className: "absolute inset-0 h-full w-full resize-none overflow-hidden whitespace-pre-wrap break-words bg-transparent text-transparent outline-none",
            style: { caretColor: "#2563eb", color: "transparent" }
          }
        ) : /* @__PURE__ */ h(
          "input",
          {
            ...St,
            className: dn ? "block w-full bg-transparent text-transparent outline-none" : "absolute inset-0 h-full w-full bg-transparent text-transparent outline-none",
            style: dn ? { fieldSizing: "content", width: "auto", minWidth: 72, maxWidth: 400, caretColor: "#2563eb", color: "transparent" } : Xe ? { caretColor: "#2563eb", color: "transparent", paddingLeft: Sn, paddingRight: Sn + 16 } : { caretColor: "#2563eb", color: "transparent" }
          }
        ),
        Xe && /* @__PURE__ */ h(xn, { className: "pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" }),
        $e
      ]
    }
  );
}
export {
  Ct as Button,
  Hh as CardSection,
  Si as CheckMark,
  vc as Checkbox,
  kh as Checklist,
  zh as ChromeHeader,
  $h as ContentRow,
  uh as ContextMenu,
  fh as ContextMenuDivider,
  dh as ContextMenuItem,
  hh as ContextMenuSub,
  jo as DROPDOWN_MAX_HEIGHT,
  wh as DatePicker,
  gh as DialogProvider,
  Ac as DropdownItem,
  Br as DropdownMenu,
  Ic as DropdownSubmenu,
  Ni as DropdownThemeContext,
  yf as FONTS,
  Nh as FloatingChrome,
  vh as FloatingToggle,
  bf as FontMenu,
  Bh as FormatToolbar,
  Ze as IS_COARSE,
  sc as IS_TOUCH_CAPABLE,
  ah as ItemManagerDropdown,
  xh as LongPressMenuProvider,
  xi as MORPH_EASE,
  bn as MORPH_MS,
  bi as MORPH_OPACITY_MS,
  rr as MenuHighlightContext,
  ts as MenuSearchContext,
  zc as Modal,
  ph as ModalFooter,
  cr as ModalFooterButton,
  _h as MorphActionField,
  Tf as MorphSearchField,
  Go as NO_SELECTION_IDS,
  Fh as NumberInput,
  jh as PickerField,
  oc as PopoutWindowContext,
  Lh as RICH_TEXT_STATE_IDLE,
  Sh as RadioList,
  gf as RichTextEditor,
  kf as SCRUB_PX_PER_STEP,
  Rf as SearchMenu,
  Ih as SectionHeader,
  Ah as Seg,
  Sr as SelectionCheck,
  Uo as SelectionContext,
  Xo as SelectionFooter,
  Dh as StructureControls,
  Ci as SubmenuContext,
  ch as TAB_PILL,
  Zc as TB_BTN,
  ar as TB_BTN_ICON,
  ea as TB_DANGER,
  as as TB_DIVIDER,
  ta as TB_INPUT,
  Rh as TB_NUM,
  ra as TB_PICKER,
  Th as TB_ROW_LABEL,
  na as TB_SEG,
  Ch as TB_TOGGLE,
  Mh as TB_TOGGLE_OFF,
  Eh as TB_TOGGLE_ON,
  Nc as TabFace,
  sh as ThemeProvider,
  lh as ThemeScope,
  cf as Token,
  lf as TokenChipView,
  ur as ToolButton,
  En as Tooltip,
  vi as ZOOM_FROM,
  Mf as buildSearchMenuRows,
  pc as buttonCloudOf,
  Hi as clampNumber,
  uc as cloneOverlayClose,
  B as coarsePx,
  xc as countHidden,
  Ph as escapeHtml,
  Pf as formatPickerValues,
  Po as getCoarseScale,
  Pr as getDropdownClasses,
  ih as getHardwareKeyboard,
  rh as getLastPointerType,
  Gi as groupSelectionState,
  Df as hasPickerMatch,
  qn as inputCls,
  jc as isInteractiveElement,
  oi as isTouchLike,
  If as lastPickerSegment,
  Ef as matchSearchItem,
  Jo as menuAttributesOf,
  fc as menuThemeOf,
  Ho as nearestOverlayOrigin,
  xl as normalizeSpaces,
  Rt as orderByCatalogue,
  Jr as overlayMorphEnabled,
  Cf as parseSearchTags,
  zf as pickerCommittedKeys,
  gn as pickerItemKey,
  wl as pickerItemLabel,
  Af as pickerSegments,
  ac as playOverlayClose,
  cc as playOverlayOpen,
  Co as preprocessTokenHtml,
  ji as resolvePickerSegment,
  $f as resolvePickerText,
  an as revealRowInScroller,
  fn as sameSelection,
  rf as sanitizeRichText,
  Sf as scrubbedValue,
  vl as searchMenuContent,
  hc as segModeOf,
  th as setCoarseScale,
  Ui as setSelected,
  wf as steppedValue,
  Oh as stripRichText,
  of as stripTokenWrappers,
  yc as toggleSelected,
  Of as unknownPickerValues,
  nh as useCoarse,
  Be as useCoarseScale,
  cn as useCoarseSize,
  yi as useCurrentDocument,
  tr as useCurrentWindow,
  mh as useDialog,
  Wo as useDropdownPosition,
  Qo as useDropdownTheme,
  oh as useHardwareKeyboard,
  ls as useInputSize,
  Ti as useItemSize,
  Vt as useKitTheme,
  lc as useLastPointerType,
  yh as useLongPressOptOut,
  Ei as useMenuHighlight,
  Ec as useMenuSearch,
  Or as useOverlayMorph,
  gi as usePopoutWindow,
  Bn as usePortalTarget,
  Vo as useRevealRowOnOpen,
  Yo as useSelection,
  bc as useSelectionContext,
  Qc as useSlidingPill,
  bh as useTouchMode
};
