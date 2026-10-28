"use client";
import { jsx as h, jsxs as E, Fragment as ct } from "react/jsx-runtime";
import lt, { createContext as Ut, useContext as Gt, useState as re, useEffect as le, useRef as v, useCallback as ne, useLayoutEffect as ft, useMemo as rt, useId as Pl, useImperativeHandle as Ho } from "react";
import * as Le from "@radix-ui/react-dropdown-menu";
import { Minus as Ll, Check as cr, Search as Pn, X as Sn, Pencil as Ol, CopyPlus as _o, Trash2 as fi, RotateCcw as jo, Plus as Hr, ChevronRight as Mr, ChevronLeft as Bl, ArrowUp as Fl, ArrowDown as Hl, ChevronDown as un, Underline as _l, Strikethrough as jl, RemoveFormatting as Wl, Link as ql, ChevronUp as Kl, Anchor as Jl } from "lucide-react";
import { computePosition as Vl, offset as Wo, flip as qo, shift as Ko, size as Yl, useFloating as Ul, autoUpdate as Gl } from "@floating-ui/react-dom";
import * as sn from "@radix-ui/react-dialog";
import { createPortal as _r } from "react-dom";
import { mergeAttributes as Xl, ReactNodeViewRenderer as Ql, NodeViewWrapper as Zl, useEditor as ec, EditorContent as tc } from "@tiptap/react";
import { PluginKey as Jt, Plugin as on, Selection as On, TextSelection as Ot, NodeSelection as _n, AllSelection as nc } from "@tiptap/pm/state";
import { DecorationSet as hr, Decoration as rc } from "@tiptap/pm/view";
import ic from "@tiptap/starter-kit";
import oc from "@tiptap/extension-placeholder";
import { TextStyle as sc, FontFamily as lc, FontSize as cc } from "@tiptap/extension-text-style";
import ac from "@tiptap/extension-color";
import uc from "@tiptap/extension-link";
import dc from "@tiptap/extension-underline";
import fc from "@tiptap/suggestion";
import { Mention as hc } from "@tiptap/extension-mention";
import { createRoot as pc } from "react-dom/client";
const mc = Ut(null);
function Ni() {
  return Gt(mc);
}
function Kn() {
  const n = Ni();
  return n ? n.document.body : null;
}
function Ti() {
  const n = Ni();
  return n ? n.document : typeof document < "u" ? document : null;
}
function ar() {
  return Ni() ?? (typeof window < "u" ? window : null);
}
const ur = typeof window < "u", ot = ur && window.matchMedia("(pointer: coarse)").matches, gc = ur && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
let jr = 0.5;
const tr = /* @__PURE__ */ new Set();
function dh(n) {
  jr = Math.max(0, Math.min(1, n)), tr.forEach((e) => e());
}
function Jo() {
  return jr;
}
function fh() {
  const [, n] = re(0);
  return le(() => {
    const e = () => n((t) => t + 1);
    return tr.add(e), () => {
      tr.delete(e);
    };
  }, []), ot && jr > 0;
}
function Fe() {
  const [, n] = re(0);
  return le(() => {
    const e = () => n((t) => t + 1);
    return tr.add(e), () => {
      tr.delete(e);
    };
  }, []), jr;
}
function L(n, e, t) {
  return ot ? Math.round(n + (e - n) * t) : n;
}
function dn(n, e) {
  const t = Fe();
  return ot && t > 0 ? {
    padding: `${L(n.py, e.py, t)}px ${L(n.px, e.px, t)}px`,
    fontSize: `${L(n.fs, e.fs, t)}px`
  } : { padding: `${n.py}px ${n.px}px`, fontSize: `${n.fs}px` };
}
function Vo() {
  const n = Fe(), e = ot && n > 0;
  return {
    box: e ? L(28, 36, n) : 20,
    icon: e ? L(16, 20, n) : 14
  };
}
function hi(n) {
  return n === "touch" || n === "pen";
}
let Ln = null;
const pi = /* @__PURE__ */ new Set();
ur && window.addEventListener("pointerdown", (n) => {
  Ln = n.pointerType, pi.forEach((e) => e());
}, !0);
function hh() {
  return Ln;
}
function yc() {
  const [, n] = re(0), e = v(Ln);
  return le(() => {
    const t = () => {
      e.current !== Ln && (e.current = Ln, n((r) => r + 1));
    };
    return pi.add(t), () => {
      pi.delete(t);
    };
  }, []), Ln;
}
const Yo = ["(any-hover: hover)", "(any-pointer: fine)"];
function Uo() {
  return ur ? Yo.some((n) => window.matchMedia(n).matches) : !1;
}
let Rr = Uo();
const mi = /* @__PURE__ */ new Set();
function ro(n) {
  Rr !== n && (Rr = n, mi.forEach((e) => e()));
}
var Fo;
if (ur) {
  const n = () => ro(Uo());
  for (const s of Yo) {
    const l = window.matchMedia(s);
    (Fo = l.addEventListener) == null || Fo.call(l, "change", n);
  }
  window.addEventListener("focus", n), document.addEventListener("visibilitychange", n);
  const e = window.setInterval(() => {
    document.visibilityState === "visible" && n();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(e)), window.addEventListener("keydown", (s) => {
    s.isComposing || s.keyCode !== 229 && (s.key === "Enter" || s.key === "Backspace" || s.key === "Process" || s.key === "Unidentified" || ro(!0));
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
function ph() {
  return Rr;
}
function mh() {
  const [, n] = re(0);
  return le(() => {
    const e = () => n((t) => t + 1);
    return mi.add(e), () => {
      mi.delete(e);
    };
  }, []), Rr;
}
const fn = 220, Ci = "cubic-bezier(0.32, 0.72, 0, 1)", Ei = 170, Mi = 0.94;
function ei(n) {
  return n === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Go(n, e) {
  const t = e.left + e.width / 2, r = e.top + e.height / 2;
  return {
    x: t < n.left ? 0 : t > n.left + n.width ? 1 : 0.5,
    y: r < n.top ? 0 : r > n.top + n.height ? 1 : 0.5
  };
}
function Xo(n, e) {
  const t = (e == null ? void 0 : e()) ?? null;
  if (!t) return { x: 0.5, y: 0.5 };
  const r = n.getBoundingClientRect();
  return Go({ left: r.left, top: r.top, width: r.width, height: r.height }, t);
}
function xc(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity };
  e.style.transition = "none", e.style.transformOrigin = "50% 50%", e.style.transform = `scale(${Mi})`, e.style.opacity = "0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    n.current === i && requestAnimationFrame(() => {
      if (n.current !== i) return;
      const s = Xo(e, t);
      e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transition = `transform ${fn}ms ${Ci}, opacity ${Ei}ms ease`, e.style.transform = "none", e.style.opacity = "", window.setTimeout(() => {
        n.current === i && (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, r == null || r());
      }, fn + 60);
    });
  });
}
function bc(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity, pointerEvents: e.style.pointerEvents, visibility: e.style.visibility }, s = Xo(e, t);
  e.style.transition = `transform ${fn}ms ${Ci}, opacity ${Ei}ms ease`, e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transform = `scale(${Mi})`, e.style.opacity = "0", e.style.pointerEvents = "none", window.setTimeout(() => {
    n.current === i && (e.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      n.current !== i || e.isConnected || (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, e.style.pointerEvents = o.pointerEvents, e.style.visibility = o.visibility);
    }));
  }, fn + 60);
}
function vc(n, e, t) {
  const r = n.cloneNode(!0), i = n.getBoundingClientRect(), o = i.width > 0 || i.height > 0 ? i : t ?? i;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${o.left}px`, r.style.top = `${o.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const s = (e == null ? void 0 : e()) ?? null, l = s ? Go({ left: o.left, top: o.top, width: o.width, height: o.height }, s) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${l.x * 100}% ${l.y * 100}%`, n.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${fn}ms ${Ci}, opacity ${Ei}ms ease`, r.style.transform = `scale(${Mi})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, fn + 60));
    });
  });
}
function Wr(n) {
  const e = v(null), [t, r] = re(!1), i = v(null), o = v(0), s = ne((m) => {
    if (n.ref && (n.ref.current = m), m) {
      o.current = 0, e.current = m;
      const x = m.getBoundingClientRect();
      (x.width > 0 || x.height > 0) && (i.current = { left: x.left, top: x.top, width: x.width, height: x.height }), r(!0);
      return;
    }
    const g = e.current, b = ++o.current;
    queueMicrotask(() => {
      b === o.current && e.current === g && (e.current = null, r(!1), !(!g || !n.cloneOnUnmount || !c.current) && g.style.visibility !== "hidden" && ei(f.current) && vc(g, u.current, i.current));
    });
  }, []), l = ne(() => {
    const m = e.current;
    if (!m || getComputedStyle(m).transform !== "none") return;
    const g = m.getBoundingClientRect();
    (g.width > 0 || g.height > 0) && (i.current = { left: g.left, top: g.top, width: g.width, height: g.height });
  }, []), c = v(n.visible);
  c.current = n.visible;
  const a = v(n.visible), u = v(n.anchor ?? null);
  u.current = n.anchor ?? null;
  const d = v(n.onClosed);
  d.current = n.onClosed;
  const f = v(n.morph !== !1);
  f.current = n.morph !== !1;
  const p = v(0);
  return ft(() => {
    if (!t || !c.current || !ei(f.current)) return;
    const m = e.current;
    m && xc(p, m, u.current);
  }, [t, n.visible]), le(() => {
    if (!t || !c.current) return;
    let m = 0;
    const g = () => {
      m = 0, l(), m = requestAnimationFrame(g);
    };
    return m = requestAnimationFrame(g), () => {
      m && cancelAnimationFrame(m);
    };
  }, [t, l]), ft(() => {
    var b;
    const m = a.current;
    if (a.current = n.visible, n.visible || !m) return;
    const g = e.current;
    if (!g || !ei(f.current)) {
      (b = d.current) == null || b.call(d);
      return;
    }
    bc(p, g, u.current, () => {
      var x;
      return (x = d.current) == null ? void 0 : x.call(d);
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
const Qo = 384;
function wc(n) {
  const e = n.visualViewport;
  return e ? { x: e.offsetLeft, y: e.offsetTop, width: e.width, height: e.height } : { x: 0, y: 0, width: n.innerWidth, height: n.innerHeight };
}
function Zo({
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
  const u = ar(), d = v(u);
  d.current = u;
  const f = v(a);
  f.current = a, ft(() => {
    if (!t) return;
    let p = 0, m = !1;
    const g = () => {
      p || (p = requestAnimationFrame(b));
    }, b = () => {
      if (p = 0, m) return;
      const R = d.current, J = n.current, O = e.current;
      if (!R || !J || !O || !O.isConnected) return;
      const A = (r == null ? void 0 : r.current) ?? O, K = wc(R), S = l ?? Qo, $ = Math.min(c, S), H = Math.max(0, O.offsetHeight - A.offsetHeight), _ = Math.max($, Math.ceil(A.scrollHeight + H)), X = Math.min(_, S);
      O.style.maxHeight = `${X}px`;
      let C = X;
      const j = i == null ? void 0 : i.current;
      Vl(j ? {
        getBoundingClientRect: () => ({
          left: j.left,
          top: j.top,
          width: j.width,
          height: j.height,
          right: j.left + j.width,
          bottom: j.top + j.height,
          x: j.left,
          y: j.top,
          toJSON: () => {
          }
        })
      } : J, O, {
        strategy: "fixed",
        placement: "bottom-start",
        middleware: [
          Wo(o),
          qo({ boundary: K, padding: s, fallbackStrategy: "bestFit" }),
          Ko({ boundary: K, padding: s, mainAxis: !1 }),
          Yl({
            boundary: K,
            padding: s,
            apply({ availableHeight: fe }) {
              C = Math.max($, Math.floor(Math.min(S, fe))), O.style.maxHeight = `${C}px`;
            }
          })
        ]
      }).then(({ x: fe, y: ke, placement: M }) => {
        m || f.current({
          top: Math.round(ke),
          left: Math.round(fe),
          maxH: C,
          side: M.startsWith("top") ? "top" : "bottom",
          ready: !0
        });
      });
    };
    b();
    const x = d.current, I = (x == null ? void 0 : x.document) ?? null, N = (x == null ? void 0 : x.visualViewport) ?? null, T = () => g();
    N == null || N.addEventListener("resize", T), N == null || N.addEventListener("scroll", T), x == null || x.addEventListener("resize", T), I == null || I.addEventListener("scroll", T, { capture: !0, passive: !0 });
    let w = null;
    return typeof ResizeObserver < "u" && (w = new ResizeObserver(T), e.current && w.observe(e.current), r != null && r.current && w.observe(r.current)), () => {
      m = !0, p && cancelAnimationFrame(p), N == null || N.removeEventListener("resize", T), N == null || N.removeEventListener("scroll", T), x == null || x.removeEventListener("resize", T), I == null || I.removeEventListener("scroll", T, { capture: !0 }), w == null || w.disconnect();
    };
  }, [t, n, e, r, i, o, s, l, c]);
}
let In = null;
function es(n) {
  return In == null || In(), In = n, () => {
    In === n && (In = null);
  };
}
const ts = Ut(null);
function Ri(n, e) {
  const t = n.mode ?? (e == null ? void 0 : e.mode) ?? "dark", r = n.surface ?? (e == null ? void 0 : e.surface) ?? "neutral", i = n.context ?? (e == null ? void 0 : e.context) ?? "surface", o = n.accent ?? (e == null ? void 0 : e.accent) ?? "zinc", s = n.accent !== void 0 && n.surface === void 0 && n.context === void 0;
  return { mode: t, accent: i === "chrome" || r === "accent" || s ? o : "zinc", surface: r, context: i };
}
function Ai({ theme: n, children: e }) {
  return /* @__PURE__ */ h(ts.Provider, { value: n, children: e });
}
function gh({ mode: n, accent: e, surface: t, context: r, children: i }) {
  const o = Xt();
  return /* @__PURE__ */ h(Ai, { theme: Ri({ mode: n, accent: e, surface: t, context: r }, o), children: i });
}
function yh({ mode: n, accent: e, surface: t, context: r, children: i, className: o, style: s }) {
  const l = Xt(), c = Ri({ mode: n, accent: e, surface: t, context: r }, l);
  return /* @__PURE__ */ h(Ai, { theme: c, children: /* @__PURE__ */ h(
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
function Xt() {
  return Gt(ts);
}
function kc(n, e = "dark") {
  return n ? n.context === "surface" ? n.mode : n.mode === "light" ? "light" : n.accent === "emerald" ? "emerald" : n.accent === "blue" ? "blue" : "dark" : e;
}
function ns(n, e) {
  if (n)
    return (n === "light" || n === "dark") && e ? {
      theme: n,
      attrs: { "data-theme": n, "data-mode": n, "data-accent": e.accent }
    } : { theme: n, attrs: { "data-theme": n } };
  if (!e) return { theme: "dark", attrs: { "data-theme": "dark" } };
  if (e.context === "chrome") {
    const t = kc(e);
    return { theme: t, attrs: { "data-theme": t } };
  }
  return { theme: e.mode, attrs: { "data-mode": e.mode, "data-accent": e.accent } };
}
function Sc(n, e = "light") {
  return (n == null ? void 0 : n.mode) ?? e;
}
function Nc(n) {
  return !n || n.context !== "chrome" && n.surface !== "accent" ? !1 : n.accent === "emerald" ? "emerald" : n.accent === "blue";
}
function Tc(n) {
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
function hn(n, e = "nearest", t) {
  if (!n) return;
  const r = t ?? Tc(n);
  if (!r || !r.contains(n)) return;
  const i = n.getBoundingClientRect(), o = r.getBoundingClientRect();
  if (e === "center") {
    r.scrollTop += i.top + i.height / 2 - (o.top + o.height / 2);
    return;
  }
  const s = getComputedStyle(n), l = parseFloat(s.scrollMarginBlockStart || s.scrollMarginTop || "0") || 0, c = parseFloat(s.scrollMarginBlockEnd || s.scrollMarginBottom || "0") || 0;
  i.top - l < o.top ? r.scrollTop -= o.top - (i.top - l) : i.bottom + c > o.bottom && (r.scrollTop += i.bottom + c - o.bottom);
}
function rs({
  open: n,
  row: e,
  block: t = "nearest",
  scroller: r,
  ready: i
}) {
  const o = v(!1), s = v(!1), l = v(!1), c = v({ row: e, scroller: r, block: t });
  c.current = { row: e, scroller: r, block: t };
  const a = ne(() => {
    o.current = !0;
  }, []);
  return ft(() => {
    if (!n) {
      s.current = !1, l.current = !1, o.current = !1;
      return;
    }
    if (s.current) return;
    s.current = !0;
    const { row: u, scroller: d, block: f } = c.current, p = u();
    p && (hn(p, f, (d == null ? void 0 : d()) ?? null), l.current = !0);
  }, [n]), le(() => {
    if (!n || i !== !0 || !l.current) return;
    const u = requestAnimationFrame(() => {
      if (!l.current || (l.current = !1, o.current)) return;
      const { row: d, scroller: f } = c.current;
      hn(d(), "nearest", (f == null ? void 0 : f()) ?? null);
    });
    return () => cancelAnimationFrame(u);
  }, [n, i]), { engagedRef: o, engage: a };
}
const Cc = [];
function Lt(n, e) {
  const t = /* @__PURE__ */ new Map();
  e.forEach((s, l) => t.set(s, l));
  const r = [], i = [], o = /* @__PURE__ */ new Set();
  for (const s of n)
    o.has(s) || (o.add(s), t.has(s) ? r.push(s) : i.push(s));
  return r.sort((s, l) => t.get(s) - t.get(l)), [...r, ...i];
}
function xn(n, e) {
  if (n.length !== e.length) return !1;
  const t = new Set(n);
  return e.every((r) => t.has(r));
}
function Ec(n, e, t, r = {}) {
  var o;
  const i = Lt(n, t);
  return (o = r.disabledIds) != null && o.includes(e) ? i : i.includes(e) ? i.filter((s) => s !== e) : r.max !== void 0 && i.length >= r.max ? i : Lt([...i, e], t);
}
function io(n, e, t, r, i = {}) {
  const o = Lt(n, r), s = new Set(e);
  if (!t) return o.filter((d) => !s.has(d));
  const l = new Set(r), c = new Set(i.disabledIds ?? []), a = i.max === void 0 ? 1 / 0 : Math.max(0, i.max - o.length), u = Lt([...s], r).filter((d) => l.has(d) && !o.includes(d) && !c.has(d)).slice(0, a);
  return u.length === 0 ? o : Lt([...o, ...u], r);
}
function oo(n, e) {
  if (e.length === 0) return "none";
  const t = new Set(n), r = e.reduce((i, o) => i + (t.has(o) ? 1 : 0), 0);
  return r === 0 ? "none" : r === e.length ? "all" : "some";
}
function Mc(n, e, t) {
  if (!t) return 0;
  const r = new Set(e), i = new Set(t);
  return n.reduce((o, s) => o + (r.has(s) && !i.has(s) ? 1 : 0), 0);
}
function is(n) {
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
  } = n, [f, p] = re(() => Lt(t, r)), m = rt(() => new Set(s ?? []), [s]), g = rt(() => new Set(f), [f]), b = o !== void 0 && f.length >= o, x = !xn(f, t), I = ne((K) => {
    if (m.has(K)) return;
    const S = g.has(K), $ = Ec(f, K, r, { max: o, disabledIds: s });
    xn($, f) || (p($), d == null || d($), u == null || u(K, !S));
  }, [f, g, m, r, o, s, u, d]), N = ne((K) => {
    const S = K.filter((_) => !m.has(_)), $ = oo(f, S), H = io(f, S, $ !== "all", r, { max: o, disabledIds: s });
    xn(H, f) || (p(H), d == null || d(H));
  }, [f, m, r, o, s, d]), T = ne((K, S = i ?? r) => {
    const $ = io(f, S, K, r, { max: o, disabledIds: s });
    xn($, f) || (p($), d == null || d($));
  }, [f, i, r, o, s, d]), w = ne(() => {
    f.length !== 0 && (p([]), d == null || d([]));
  }, [f, d]), R = ne((K) => {
    p(Lt(K ?? t, r));
  }, [t, r]), J = ne(() => !a || xn(f, t) ? !1 : (a(Lt(f, r)), !0), [a, f, t, r]), O = ne(() => !c || xn(f, t) ? !1 : (c(Lt(f, r)), !0), [c, f, t, r]), A = ne((K) => oo(f, K), [f]);
  return {
    mode: e,
    indicator: l,
    draft: f,
    count: f.length,
    max: o,
    atMax: b,
    dirty: x,
    hiddenCount: Mc(f, r, i),
    isSelected: (K) => g.has(K),
    isDisabled: (K) => m.has(K),
    canToggle: (K) => !m.has(K) && (g.has(K) || !b),
    toggle: I,
    toggleGroup: N,
    setAll: T,
    clear: w,
    reset: R,
    commit: J,
    flush: O,
    cancel: R,
    groupState: A
  };
}
const ss = Ut(null), Rc = () => Gt(ss), ls = Cc;
function Ii({ checked: n, size: e, tone: t = "accent", indeterminate: r = !1 }) {
  return /* @__PURE__ */ h(
    "span",
    {
      className: `ui-check-indicator ${n || r ? "ui-check-indicator-checked" : ""} ${t === "danger" ? "ui-check-tone-danger" : ""}`,
      "aria-hidden": !0,
      children: r ? /* @__PURE__ */ E("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: [
        /* @__PURE__ */ h("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor", stroke: "var(--ui-check-ring)", strokeWidth: 1 }),
        /* @__PURE__ */ h("path", { d: "M4.5 8 H11.5", stroke: "var(--ui-check-check)", strokeWidth: 2, strokeLinecap: "round", fill: "none" })
      ] }) : n ? /* @__PURE__ */ E("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: [
        /* @__PURE__ */ h("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor", stroke: "var(--ui-check-ring)", strokeWidth: 1 }),
        /* @__PURE__ */ h("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "var(--ui-check-check)", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" })
      ] }) : /* @__PURE__ */ h("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: /* @__PURE__ */ h("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) })
    }
  );
}
function Ac({ checked: n, onChange: e, disabled: t = !1, label: r, id: i, className: o = "", labelClassName: s = "", theme: l, variant: c = "pill", tone: a = "accent", block: u = !1 }) {
  const d = c !== "plain", f = Fe(), p = L(16, 20, f), m = L(12, 14, f), g = L(12, 14, f), b = L(12, 16, f), x = L(10, 12, f), I = L(8, 10, f);
  return /* @__PURE__ */ E(
    "label",
    {
      className: `ui-press ui-checkbox ${d ? "ui-checkbox-pill rounded-lg" : ""} ${a === "danger" ? "ui-checkbox-tone-danger" : ""} ${t ? "ui-disabled" : ""} ${o}`,
      style: { display: u ? "flex" : "inline-flex", alignItems: "center", gap: I, padding: d ? `${x}px ${b}px` : void 0 },
      onClick: (T) => T.stopPropagation(),
      ...l ? { "data-theme": l } : {},
      children: [
        /* @__PURE__ */ h(
          "input",
          {
            type: "checkbox",
            id: i,
            checked: n,
            disabled: t,
            onChange: (T) => e(T.target.checked),
            className: "sr-only"
          }
        ),
        d ? /* @__PURE__ */ h(Ii, { checked: n, size: p, tone: a }) : /* @__PURE__ */ h("span", { className: "ui-checkbox-box", style: { width: p, height: p }, "aria-hidden": !0, children: n && /* @__PURE__ */ h("svg", { viewBox: "0 0 12 12", fill: "none", style: { width: m, height: m }, "aria-hidden": !0, children: /* @__PURE__ */ h("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ h("span", { className: `ui-checkbox-label ${s}`, style: { fontSize: g }, children: r })
      ]
    }
  );
}
const so = "transition-[grid-template-columns] ease-out duration-150 group-hover:duration-200 motion-reduce:transition-none", Ic = "group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] group-data-[state=open]:grid-cols-[1fr]", $c = "group-hover:grid-cols-[0fr] group-focus-visible:grid-cols-[0fr] group-data-[state=open]:grid-cols-[0fr]", zc = "group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[state=open]:opacity-100";
function Dc(n) {
  if (!lt.isValidElement(n)) return String(n ?? "");
  const e = n.type, t = typeof e == "string" ? e : e.displayName || e.name || "icon", r = n.props;
  return `${t}|${r.className ?? ""}|${r.size ?? ""}`;
}
function cs({ icon: n, collapse: e = !1, iconWithLabel: t = !0, active: r = !1, gap: i = 6, reserve: o, roll: s = "up", children: l }) {
  const c = !!e && !!n, a = c && !t, u = !!n && (t || c), d = Dc(n), [f, p] = re({ sig: d, node: n }), [m, g] = re(null);
  d !== f.sig && (p({ sig: d, node: n }), g(f.node)), le(() => {
    if (m == null) return;
    const x = window.setTimeout(() => g(null), 200);
    return () => window.clearTimeout(x);
  }, [m]);
  const b = m == null ? n : /* @__PURE__ */ E("span", { className: "relative inline-flex items-center justify-center overflow-hidden", children: [
    /* @__PURE__ */ h("span", { "aria-hidden": !0, className: `ui-icon-roll-out${s === "down" ? "-down" : ""} absolute inset-0 inline-flex items-center justify-center`, children: m }, `out:${f.sig}`),
    /* @__PURE__ */ h("span", { className: `ui-icon-roll-in${s === "down" ? "-down" : ""} inline-flex items-center justify-center`, children: n }, `in:${d}`)
  ] });
  return c ? /* @__PURE__ */ E(ct, { children: [
    u && (a ? /* @__PURE__ */ h("span", { "data-kit-icon": !0, className: `grid min-w-0 ${so} ${r ? "grid-cols-[0fr]" : `grid-cols-[1fr] ${$c}`}`, children: /* @__PURE__ */ h("span", { className: "inline-flex min-w-0 items-center overflow-hidden", children: b }) }) : /* @__PURE__ */ h("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: b })),
    /* @__PURE__ */ h("span", { "data-kit-label": !0, className: `grid min-w-0 ${so} ${r ? "grid-cols-[1fr]" : `grid-cols-[0fr] ${Ic}`}`, children: /* @__PURE__ */ h("span", { className: "min-w-0 overflow-hidden", children: /* @__PURE__ */ h(
      "span",
      {
        className: `flex min-w-0 items-center whitespace-nowrap transition-[opacity,padding-left] duration-100 group-hover:duration-150 motion-reduce:transition-none ${r ? "opacity-100" : `opacity-0 ${zc}`} ${a ? `pl-[var(--kit-collapse-gap)] group-hover:pl-0! group-focus-visible:pl-0! group-data-[state=open]:pl-0! ${r ? "pl-0!" : ""}` : ""}`,
        style: a ? { "--kit-collapse-gap": `${i}px` } : { paddingLeft: i },
        children: o ? /* @__PURE__ */ E("span", { className: "inline-grid min-w-0", children: [
          /* @__PURE__ */ h("span", { "aria-hidden": !0, className: "invisible col-start-1 row-start-1 whitespace-nowrap", children: o }),
          /* @__PURE__ */ h("span", { className: "col-start-1 row-start-1", children: l })
        ] }) : l
      }
    ) }) })
  ] }) : /* @__PURE__ */ E(ct, { children: [
    u && /* @__PURE__ */ h("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: n }),
    l
  ] });
}
const xh = {
  light: { plain: "bg-zinc-950", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" },
  dark: { plain: "bg-white", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" }
};
function Ct({
  variant: n = "subtle",
  theme: e,
  cloud: t,
  active: r = !1,
  activeTone: i = "neutral",
  iconOnly: o = !1,
  size: s = "default",
  revealOnHover: l = !1,
  keepLabelOnActive: c = !1,
  reserveLabel: a,
  iconRoll: u = "up",
  icon: d,
  collapse: f = !1,
  iconWithLabel: p = !0,
  className: m = "",
  type: g = "button",
  children: b,
  ...x
}) {
  const I = Xt(), N = e ?? (I == null ? void 0 : I.mode) ?? "light", T = t ?? Nc(I), w = dn({ px: 10, py: 6, fs: 12 }, { px: 14, py: 9, fs: 14 }), R = dn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 9, fs: 14 }), J = dn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), O = "", A = "", K = `${l ? "ui-reveal " : ""}ui-press inline-flex items-center font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed`, S = "rounded", $ = "rounded-[var(--ui-radius-btn)]", H = {
    light: {
      active: "text-white",
      inactive: "text-zinc-500 hover:text-zinc-900"
    },
    dark: {
      active: "text-zinc-900",
      inactive: "text-zinc-400 hover:text-zinc-200"
    }
  }, _ = {
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
  }, X = {
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
  }, j = {
    light: {
      subtle: { base: `${O} text-zinc-600 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-900" },
      primary: { base: `${A} bg-zinc-900 hover:bg-zinc-800 text-white`, open: "bg-zinc-800!" },
      /* The outline is painted as an INSET SHADOW, not a border: the button
         keeps `subtle`'s exact box (same padding + height), so the two can sit
         side by side in a toolbar without a 2px step. */
      outline: {
        base: `${O} text-zinc-700 shadow-[inset_0_0_0_1px_var(--ui-border-strong)] hover:bg-[var(--ui-btn-hover-bg)] hover:text-zinc-900`,
        open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-900"
      },
      "danger-ghost": { base: `${O} text-rose-600 hover:bg-rose-50`, open: "bg-rose-50!" }
    },
    dark: {
      subtle: { base: `${O} text-zinc-400 hover:text-zinc-200 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-200" },
      primary: { base: `${A} bg-zinc-800 hover:bg-zinc-700 text-white`, open: "bg-zinc-700!" },
      outline: {
        base: `${O} text-zinc-300 shadow-[inset_0_0_0_1px_var(--ui-border-strong)] hover:bg-[var(--ui-btn-hover-bg)] hover:text-zinc-100`,
        open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-100"
      },
      "danger-ghost": { base: `${O} text-red-400 hover:bg-rose-950/40`, open: "bg-rose-950/40!" }
    }
  }, W = {
    blue: { base: `${A} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" },
    emerald: { base: `${A} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" }
  }, fe = x["data-state"] === "open", ke = j[N][n], M = n === "primary" ? R : n.startsWith("tab") ? J : w, me = ot ? { padding: "8px 12px", fontSize: "14px", lineHeight: "20px", border: "1px solid transparent" } : { padding: "6px 8px", fontSize: "12px", lineHeight: "16px", border: "1px solid transparent" }, he = L(6, 8, Fe()), ie = L(28, 40, Fe()), G = T === "emerald" ? "emerald" : T ? "blue" : null, Y = "bg-[var(--ui-btn-active-bg)]! text-[color:var(--ui-btn-active-text)]!", ye = {
    info: "bg-blue-600! hover:bg-blue-500! text-white!",
    success: "bg-emerald-600! hover:bg-emerald-500! text-white!",
    warning: "bg-amber-500! hover:bg-amber-400! text-zinc-950!",
    danger: "bg-rose-600! hover:bg-rose-500! text-white!"
  };
  let P;
  if (n === "tab") {
    const Q = H[N];
    P = `${S} ${r ? G ? _[G].active : Q.active : G ? _[G][N === "light" ? "inactiveLight" : "inactiveDark"] : Q.inactive}`;
  } else if (n === "tab-header") {
    const Q = G ? r ? C[G].active : C[G].inactive : r ? X.active : X.inactive;
    P = `${S} ${Q} ${fe ? G ? C[G].open : X.open : ""}`;
  } else {
    if (P = `${$} ${ke.base} ${fe ? ke.open : ""}`, n === "primary" && G) {
      const Q = W[G];
      P = `${$} ${fe ? `${Q.base} ${Q.open}` : Q.base}`;
    }
    r && (P = `${P} ${i === "neutral" ? Y : ye[i]}`);
  }
  const te = !!f && !!d && !o, F = o ? { width: ie, height: ie, padding: 0, gap: 0 } : s === "minimal" ? { ...me, gap: te ? 0 : he } : { ...M, gap: te ? 0 : he };
  return /* @__PURE__ */ h(
    "button",
    {
      type: g,
      "data-mode": N,
      "data-accent": I == null ? void 0 : I.accent,
      className: `${K} ${o ? "justify-center" : ""} ${te ? "group" : ""} ${P} ${m}`,
      "aria-pressed": r && !n.startsWith("tab") ? !0 : void 0,
      "data-active": r || void 0,
      style: F,
      ...x,
      children: o ? b : /* @__PURE__ */ h(
        cs,
        {
          icon: d,
          collapse: f,
          iconWithLabel: p,
          active: r && (n.startsWith("tab") || c),
          gap: he,
          reserve: a,
          roll: u,
          children: b
        }
      )
    }
  );
}
function Ar({
  checked: n,
  indeterminate: e = !1,
  disabled: t = !1,
  indicator: r = "box",
  size: i,
  className: o = ""
}) {
  const s = Fe(), l = i ?? L(14, 18, s);
  return r === "check" ? /* @__PURE__ */ h(
    "span",
    {
      "data-selection-check": "check",
      className: `inline-flex shrink-0 items-center justify-center ${t ? "opacity-40" : ""} ${o}`,
      style: { width: l, height: l },
      "aria-hidden": !0,
      children: e ? /* @__PURE__ */ h(Ll, { size: l, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : n ? /* @__PURE__ */ h(cr, { size: l, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : null
    }
  ) : /* @__PURE__ */ h(
    "span",
    {
      "data-selection-check": "box",
      className: `inline-flex shrink-0 items-center justify-center ${t ? "opacity-40" : ""} ${o}`,
      "aria-hidden": !0,
      children: /* @__PURE__ */ h(Ii, { checked: n, indeterminate: e, size: l })
    }
  );
}
function as({
  count: n,
  max: e,
  hiddenCount: t = 0,
  onClear: r,
  hero: i,
  clear: o = !0,
  theme: s,
  className: l = ""
}) {
  const c = Fe(), a = L(10, 14, c), u = L(6, 9, c), d = L(11, 13, c), f = s === "light" ? "light" : "dark", p = s === "emerald" ? "emerald" : s === "blue" ? !0 : void 0, m = e !== void 0 ? `${n} of ${e} selected` : `${n} selected`;
  return /* @__PURE__ */ E(
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
        /* @__PURE__ */ E(
          "span",
          {
            "data-selection-count": !0,
            className: "min-w-0 flex-1 truncate tabular-nums text-[color:var(--ui-text-muted)]",
            style: { fontSize: d },
            children: [
              m,
              t > 0 && /* @__PURE__ */ E("span", { className: "text-[color:var(--ui-text-faint)]", children: [
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
const $i = Ut("dark"), us = () => Gt($i), zi = Ut({ "data-theme": "dark" }), Pc = () => Gt(zi);
function Di() {
  const n = Fe();
  return {
    padding: `${L(8, 12, n)}px ${L(12, 16, n)}px`,
    fontSize: `${L(12, 14, n)}px`,
    lineHeight: `${L(18, 22, n)}px`
  };
}
function ds() {
  const n = Fe();
  return {
    padding: `${L(6, 9, n)}px ${L(12, 16, n)}px ${L(2, 3, n)}px`,
    fontSize: `${L(10, 11, n)}px`,
    lineHeight: `${L(14, 16, n)}px`
  };
}
const Lc = (n) => n ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", lo = (n) => n ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", Oc = (n) => n ? "text-xs" : "text-[10px]";
function qr(n) {
  const e = ot && Jo() > 0;
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
    headerPad: lo(e),
    headerText: `${lo(e)} font-semibold uppercase tracking-wider ${Oc(e)} ui-label`,
    // Item padding
    itemPad: Lc(e),
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
function fs(n) {
  const e = [];
  return lt.Children.forEach(n, (t) => {
    if (typeof t == "string" || typeof t == "number")
      e.push(String(t));
    else if (lt.isValidElement(t)) {
      const r = t.props.children;
      (typeof r == "string" || typeof r == "number") && e.push(String(r));
    }
  }), e.join(" ").trim();
}
const Pi = Ut({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), dr = Ut(null), Li = () => Gt(dr), hs = Ut({ query: "", setQuery: () => {
} }), Bc = () => Gt(hs), ps = Ut(null), Fc = () => Gt(ps), Hc = () => !0;
function Kr(n) {
  const e = v([]), [t, r] = re(-1), [i, o] = re(!1), [s, l] = re(0), c = ne((f) => (e.current = [...e.current, f], l((p) => p + 1), () => {
    e.current = e.current.filter((p) => p !== f), l((p) => p + 1);
  }), []), a = ne((f, p) => {
    r(f), o(p === "pointer");
  }, []), u = ne(() => {
    o((f) => f && (r(-1), !1));
  }, []);
  return rt(() => ({
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
function ms(n) {
  const e = Li(), t = v(e);
  t.current = e;
  const r = v(null);
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
function Oi(n, e, t, r) {
  const i = v(-1);
  i.current = e.highlightedIndex;
  const o = v(e);
  o.current = e;
  const s = v(n);
  s.current = n;
  const l = v(r);
  l.current = r;
  const c = v({ text: "", time: 0 }), a = v(!1);
  a.current || (a.current = !0, t.current = (u) => {
    var g, b, x, I, N, T;
    if (!s.current) return;
    const d = (g = l.current) == null ? void 0 : g.onSelectAll;
    if (d && (u.metaKey || u.ctrlKey) && u.key.toLowerCase() === "a") {
      u.preventDefault(), u.stopImmediatePropagation(), d();
      return;
    }
    const f = u.target;
    if (!!f && !!f.closest("input, textarea, [contenteditable]") && (u.key.length === 1 || u.key === "Enter" || u.key === "Escape")) {
      const w = (x = (b = l.current) == null ? void 0 : b.onFieldKey) == null ? void 0 : x.call(b, u);
      (!!((I = l.current) != null && I.onFieldKey) || o.current.items.length > 0) && (u.stopImmediatePropagation(), w && u.preventDefault());
      return;
    }
    const m = o.current.items;
    if (m.length !== 0) {
      if (u.key === "ArrowDown" || u.key === "ArrowUp") {
        u.preventDefault(), u.stopImmediatePropagation();
        const w = u.key === "ArrowDown" ? 1 : -1, R = (i.current + w + m.length) % m.length;
        o.current.setHighlighted(R, "keyboard");
      } else if (u.key === "ArrowRight") {
        u.preventDefault(), u.stopImmediatePropagation();
        const w = i.current;
        w >= 0 && w < m.length && m[w].submenu && m[w].activate();
      } else if (u.key === "ArrowLeft")
        u.preventDefault(), u.stopImmediatePropagation(), (T = (N = l.current) == null ? void 0 : N.onCloseSub) == null || T.call(N);
      else if (u.key === "Enter" || u.key === " ") {
        u.preventDefault(), u.stopImmediatePropagation();
        const w = i.current;
        w >= 0 && w < m.length && m[w].activate();
      } else if (u.key.length === 1 && !u.ctrlKey && !u.metaKey && !u.altKey) {
        u.preventDefault(), u.stopImmediatePropagation();
        const w = Date.now(), R = (w - c.current.time > 500 ? "" : c.current.text) + u.key.toLowerCase();
        if (c.current = { text: R, time: w }, !R) return;
        const J = i.current + 1;
        for (let O = 0; O < m.length; O++) {
          const A = (J + O) % m.length;
          if (m[A].label.toLowerCase().startsWith(R)) {
            o.current.setHighlighted(A, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function Bi(n, e, t, r, i, o, s) {
  const l = v(e);
  l.current = e;
  const c = v(n);
  c.current = n;
  const a = v(i);
  a.current = i;
  const u = v(s == null ? void 0 : s.ignoreFields);
  u.current = s == null ? void 0 : s.ignoreFields;
  const d = v(s == null ? void 0 : s.selectAll);
  d.current = s == null ? void 0 : s.selectAll;
  const f = v(!1);
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
function Fi(n, e) {
  const t = v(n);
  t.current = n;
  const r = v(!1);
  r.current || (r.current = !0, e.current = (i) => {
    if (!t.current) return;
    const o = i.currentTarget, s = o.querySelector("[data-menu-items]") ?? o;
    s.scrollHeight > s.clientHeight && (i.preventDefault(), s.scrollTop += i.deltaY);
  });
}
function Jr({
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
  multiple: x
}) {
  const I = Xt(), N = ns(s, I), T = N.theme, [w, R] = re([]), [J, O] = re(null), A = Kn(), K = Ti(), S = v(null), $ = v(null), H = v(n);
  H.current = n;
  const [_, X] = re(n), [C, j] = re(""), W = f && g !== void 0, fe = W ? g : C, ke = W ? b ?? (() => {
  }) : j, M = v(g ?? "");
  le(() => {
    n || (M.current = g ?? "");
  }, [n, g]);
  const me = W && fe === M.current ? "" : fe, he = Pl(), ie = v(null), G = Fe(), Y = {
    padding: `${L(8, 12, G)}px ${L(12, 16, G)}px`,
    fontSize: `${L(12, 14, G)}px`
  }, [ye, P] = re(0), te = f && !W;
  le(() => {
    var Ye;
    if (!te || !n) return;
    const z = (Ye = $.current) == null ? void 0 : Ye.querySelector("[data-menu-items]");
    if (!z) return;
    const U = () => P(z.offsetWidth - z.clientWidth);
    U();
    const de = new ResizeObserver(U);
    return de.observe(z), () => de.disconnect();
  }, [n, te, fe]);
  const F = rt(() => {
    if (!f) return;
    const z = me.trim().toLowerCase();
    return z ? (U) => {
      var de;
      return m ? m(z, U.label, U.group) : U.label.toLowerCase().includes(z) || (((de = U.group) == null ? void 0 : de.toLowerCase().includes(z)) ?? !1);
    } : Hc;
  }, [me, f, m]), Q = Kr(F), He = f && me.trim() !== "" && Q.items.length === 0, Ne = !!x, ge = Q.allItems.map((z) => z.itemId).filter((z) => !!z), We = Q.items.map((z) => z.itemId).filter((z) => !!z), Te = is({
    mode: "draft",
    selectedIds: (x == null ? void 0 : x.selectedIds) ?? ls,
    itemIds: ge,
    visibleIds: We,
    max: x == null ? void 0 : x.max,
    disabledIds: x == null ? void 0 : x.disabledIds,
    indicator: x == null ? void 0 : x.indicator,
    onCommit: x == null ? void 0 : x.onCommit
  }), Oe = v(Te.reset);
  Oe.current = Te.reset;
  const Be = typeof (x == null ? void 0 : x.commitLabel) == "function" ? x.commitLabel(Te.count) : (x == null ? void 0 : x.commitLabel) ?? `Select ${Te.count}`;
  le(() => {
    if (n)
      return X(!0), W || j(""), Q.setHighlighted(d ?? -1, "keyboard"), Oe.current(), es(() => {
        t == null || t(!1), e == null || e();
      });
    R([]);
  }, [n, d, t, e]), le(() => {
    if (!n || !K) return;
    const z = (U) => {
      if (U.pointerType !== "touch") return;
      const de = U.target;
      de && ($.current && $.current.contains(de) || S.current && S.current.contains(de) || de instanceof Element && de.closest("[data-radix-menu-content]") || (t == null || t(!1), e == null || e()));
    };
    return K.addEventListener("pointerdown", z, { capture: !0 }), () => K.removeEventListener("pointerdown", z, { capture: !0 });
  }, [n, K, t, e]);
  const oe = ne(() => {
    const z = S.current;
    if (!z) return null;
    const U = z.getBoundingClientRect();
    return { left: U.left, top: U.top, width: U.width, height: U.height };
  }, []), _e = Wr({
    visible: n,
    morph: c,
    anchor: oe,
    onClosed: () => X(!1)
  }), Se = v(() => {
  }), Ze = v(() => {
  }), bt = v(() => {
  }), ve = ne((z) => {
    if (z.key === "Enter") {
      const U = Q.highlightedIndex, de = Q.items[U >= 0 ? U : 0];
      return de == null || de.activate(), !0;
    }
    return z.key === "Escape" ? (t == null || t(!1), e == null || e(), !0) : !1;
  }, [Q, t, e]);
  Oi(n && w.length === 0, Q, Se, {
    onFieldKey: ve,
    onSelectAll: Ne ? () => Te.setAll(!0) : void 0
  }), Fi(n, Ze), Bi(n, Q, Se, $, w.length > 0, bt, {
    ignoreFields: W,
    selectAll: Ne
  });
  const Ve = v(null), yt = ne((z) => {
    var U;
    if (z) {
      z.addEventListener("keydown", Se.current, { capture: !0 }), z.addEventListener("wheel", Ze.current, { passive: !1 });
      const de = z.ownerDocument;
      Ve.current = de, de.addEventListener("keydown", bt.current, { capture: !0 }), et(!0);
    } else
      (U = Ve.current) == null || U.removeEventListener("keydown", bt.current, { capture: !0 }), Ve.current = null, et(!1);
    $.current = z, _e(z);
  }, [_e]), [Ee, Qt] = re({ top: 0, left: 0, maxH: Qo, side: "bottom", ready: !1 }), [Ft, zt] = re(0), [De, et] = re(!1);
  le(() => {
    n && S.current && zt(S.current.getBoundingClientRect().width);
  }, [n]), Zo({
    anchorRef: S,
    panelRef: $,
    open: n && De,
    maxHeight: u,
    onPosition: Qt
  }), le(() => {
    var z;
    if (Ee.ready && n) {
      if (f) {
        (z = ie.current ?? S.current) == null || z.focus();
        return;
      }
      const U = $.current;
      U && U.ownerDocument.activeElement !== U && !U.contains(U.ownerDocument.activeElement) && U.focus();
    }
  }, [Ee.ready, n, f]), le(() => {
    if (!n || !f) return;
    if (Q.items.length === 0) {
      Q.highlightedIndex !== -1 && Q.setHighlighted(-1, "keyboard");
      return;
    }
    const z = Q.highlightedIndex;
    (z < 0 || z >= Q.items.length) && Q.setHighlighted(0, "keyboard");
  }, [n, fe, f, Q.items.length]), ft(() => {
    var U;
    if (!n || Q.highlightedIndex < 0 || Q.pointerDriven) return;
    const z = (U = $.current) == null ? void 0 : U.querySelector(`[data-ei="${Q.highlightedIndex}"]`);
    hn(z, "nearest");
  }, [n, Q.highlightedIndex, Q.pointerDriven]);
  const st = ne((z) => {
    if (!(!z && !H.current)) {
      if (!z && ht.current) {
        if (W) return;
        pt.current = !0;
      }
      t ? t(z) : z || e == null || e();
    }
  }, [t, e]), Mt = v(_);
  Mt.current = _;
  const ht = v(!1), pt = v(!1), Rt = ne(() => {
    if (!H.current && Mt.current) {
      if (pt.current) {
        pt.current = !1, ht.current = !1;
        return;
      }
      t == null || t(!0);
    }
  }, [t]), Pe = lt.isValidElement(r) ? r : null, mt = v(!1), tt = ne(() => {
    const z = S.current;
    z && (mt.current = !0, z.focus(), setTimeout(() => {
      mt.current = !1;
    }, 0));
  }, []), Ht = Pe ? lt.cloneElement(Pe, {
    ref: (z) => {
      S.current = z;
      const U = Pe.props.ref;
      typeof U == "function" ? U(z) : U && (U.current = z);
    },
    /* Radix's trigger primitive merges `type="button"` onto the child; a
       text field trigger-as-search must stay a text field. */
    ...W ? { type: Pe.props.type ?? "text" } : {},
    ...W ? {
      /* A text field that opens a list IS a combobox, and the highlighted
         row must be announced — the field is outside the popup, so the
         only link screen readers get is `aria-activedescendant`. */
      role: "combobox",
      "aria-autocomplete": "list",
      "aria-controls": n ? `${he}-content` : void 0,
      "aria-activedescendant": n && Q.highlightedIndex >= 0 ? `${he}-opt-${Q.highlightedIndex}` : void 0
    } : {},
    onPointerDownCapture: (z) => {
      var U, de;
      (de = (U = Pe.props).onPointerDownCapture) == null || de.call(U, z), ht.current = !0, pt.current = !1, setTimeout(() => {
        ht.current = !1;
      }, 0);
    },
    onPointerDown: (z) => {
      var U, de;
      if ((de = (U = Pe.props).onPointerDown) == null || de.call(U, z), W) {
        z.preventDefault();
        const Ye = H.current;
        Ye || t == null || t(!0);
        const nt = S.current;
        nt == null || nt.focus(), !Ye && nt instanceof HTMLInputElement && nt.select();
      }
    },
    /* Space is a printable search character, but Radix treats it as the
       trigger's open/close key. Keep it in the field. */
    onKeyDownCapture: (z) => {
      var U, de;
      (de = (U = Pe.props).onKeyDownCapture) == null || de.call(U, z), W && z.key === " " && z.stopPropagation();
    },
    onClick: (z) => {
      var U, de;
      (de = (U = Pe.props).onClick) == null || de.call(U, z), Rt();
    },
    /* A kit-driven focus restore is not a user focus (see above). */
    onFocus: (z) => {
      var U, de;
      if (mt.current) {
        mt.current = !1;
        return;
      }
      (de = (U = Pe.props).onFocus) == null || de.call(U, z);
    },
    /* Focus leaving the field ends the search session: Tab (or any focus
       move that does not land in the panel) must close the list, not leave
       an orphan panel floating with the keyboard elsewhere. The panel's
       own focused row is legitimate — keep it open for the pending click. */
    onBlur: (z) => {
      var de, Ye, nt, vt;
      if ((Ye = (de = Pe.props).onBlur) == null || Ye.call(de, z), !W || !H.current) return;
      const U = z.relatedTarget;
      U && ((nt = $.current) != null && nt.contains(U) || (vt = S.current) != null && vt.contains(U)) || setTimeout(() => {
        var Z;
        const wt = S.current;
        if (!wt || !H.current) return;
        const k = wt.ownerDocument.activeElement;
        k && (wt.contains(k) || (Z = $.current) != null && Z.contains(k)) || (t == null || t(!1), e == null || e());
      }, 0);
    },
    /* Combobox mode (externalSearch): the trigger field IS the search box,
       so it also drives the menu's keyboard — arrows move the single
       highlight and Enter activates the highlighted (or first visible)
       row. Filtering itself follows the VALUE (see filterQuery), so no
       input method is special-cased here. */
    onKeyDown: (z) => {
      var U, de;
      if ((de = (U = Pe.props).onKeyDown) == null || de.call(U, z), !(!W || !H.current)) {
        if (z.key === "ArrowDown" || z.key === "ArrowUp") {
          z.preventDefault();
          const Ye = Q.items;
          if (Ye.length === 0) return;
          const nt = z.key === "ArrowDown" ? 1 : -1, vt = (Q.highlightedIndex + nt + Ye.length) % Ye.length;
          Q.setHighlighted(vt, "keyboard");
        } else if (z.key === "Enter") {
          z.preventDefault();
          const Ye = Q.highlightedIndex, nt = Q.items[Ye >= 0 ? Ye : 0];
          nt == null || nt.activate();
        }
      }
    }
  }) : r, At = /* @__PURE__ */ E("div", { "data-menu-search-empty": !0, className: "px-3 py-3 text-center", children: [
    /* @__PURE__ */ E("div", { className: "text-xs font-medium text-[color:var(--ui-text-muted)]", children: [
      "No matches for “",
      me.trim(),
      "”"
    ] }),
    /* @__PURE__ */ h("div", { className: "mt-0.5 text-[10px] text-[color:var(--ui-text-faint)]", children: "Try a different search." })
  ] }), qe = te || Ne, It = `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] min-w-0 ${qe ? "overflow-hidden" : "overflow-y-auto scrollbar-custom"}`;
  return /* @__PURE__ */ E(Le.Root, { open: n || _, onOpenChange: st, modal: !1, children: [
    /* @__PURE__ */ h(Le.Trigger, { asChild: !0, children: Ht }),
    /* @__PURE__ */ h(Le.Portal, { container: A ?? void 0, children: /* @__PURE__ */ h($i.Provider, { value: T, children: /* @__PURE__ */ h(zi.Provider, { value: N.attrs, children: /* @__PURE__ */ h(Pi.Provider, { value: { chain: w, setChain: R, morph: c, keyboardOpened: J, setKeyboardOpened: O }, children: /* @__PURE__ */ h(dr.Provider, { value: Q, children: /* @__PURE__ */ h(hs.Provider, { value: { query: fe, setQuery: ke }, children: /* @__PURE__ */ h(ss.Provider, { value: Ne ? Te : null, children: /* @__PURE__ */ h(ps.Provider, { value: he, children: /* @__PURE__ */ E(
      Le.Content,
      {
        id: `${he}-content`,
        ref: yt,
        tabIndex: W ? void 0 : -1,
        ...N.attrs,
        "data-ui-fixed": !0,
        className: `${It} ${o || ""} ${a || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: Ee.left,
          top: Ee.top,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: o ? void 0 : Ft || void 0,
          maxHeight: Ee.maxH,
          visibility: Ee.ready ? "visible" : "hidden"
        },
        onPointerLeave: Q.pointerLeave,
        onFocusCapture: W ? (z) => {
          z.target === z.currentTarget && (z.stopPropagation(), tt());
        } : void 0,
        onFocusOutside: W ? (z) => {
          var de;
          const U = z.target;
          U && (U === S.current || (de = S.current) != null && de.contains(U)) && z.preventDefault();
        } : void 0,
        onCloseAutoFocus: W ? (z) => {
          z.preventDefault(), tt();
        } : void 0,
        children: [
          te && /* @__PURE__ */ h("div", { className: "shrink-0 px-0 pt-1 pb-1", style: { paddingRight: ye }, children: /* @__PURE__ */ E("div", { "data-menu-search": !0, className: "ui-item ui-item-highlighted flex items-center gap-2 rounded", style: Y, children: [
            /* @__PURE__ */ h(Pn, { className: "w-3.5 h-3.5 shrink-0 ui-icon" }),
            /* @__PURE__ */ h(
              "input",
              {
                ref: ie,
                value: fe,
                onChange: (z) => ke(z.target.value),
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
                onPointerDown: (z) => z.stopPropagation(),
                onClick: () => {
                  var z;
                  ke(""), (z = ie.current) == null || z.focus();
                },
                children: /* @__PURE__ */ h(Sn, { className: "w-3.5 h-3.5" })
              }
            ) : /* @__PURE__ */ h("span", { className: "w-3.5 h-3.5 shrink-0" })
          ] }) }),
          qe ? /* @__PURE__ */ E("div", { "data-menu-items": !0, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: [
            l,
            He && At
          ] }) : /* @__PURE__ */ E(ct, { children: [
            l,
            He && At
          ] }),
          Ne && (x == null ? void 0 : x.footer) !== !1 && /* @__PURE__ */ h(
            as,
            {
              count: Te.count,
              max: x == null ? void 0 : x.max,
              hiddenCount: (x == null ? void 0 : x.hiddenNote) === !1 ? 0 : Te.hiddenCount,
              clear: (x == null ? void 0 : x.clear) !== !1,
              theme: T,
              onClear: Te.clear,
              hero: {
                label: Be,
                onClick: () => {
                  Te.commit(), st(!1);
                },
                disabled: Te.count === 0
              }
            }
          )
        ]
      }
    ) }) }) }) }) }) }) }) })
  ] });
}
function bh({
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
  label: x,
  header: I,
  itemLabel: N,
  trigger: T,
  minItems: w = 1,
  itemRender: R,
  morph: J = !0,
  contentClassName: O
}) {
  const A = qr(), K = Di(), [S, $] = re(null), [H, _] = re(""), X = v(H);
  X.current = H;
  const C = v(null), j = v(null), [W, fe] = re(null), ke = ne((Y) => {
    j.current = Y, fe(Y);
  }, []), M = rs({
    open: n,
    scroller: () => j.current,
    row: () => {
      var Y;
      return ((Y = j.current) == null ? void 0 : Y.querySelector('[data-active="1"]')) ?? null;
    }
  });
  le(() => {
    if (!n) return;
    const Y = (P) => {
      var We, Te;
      const te = P.target;
      if (te && te.closest("input, textarea, [contenteditable]")) {
        S && te === C.current && (P.key === "Enter" ? (P.preventDefault(), P.stopImmediatePropagation(), he()) : P.key === "Escape" && (P.preventDefault(), P.stopImmediatePropagation(), ie()));
        return;
      }
      const F = (We = j.current) == null ? void 0 : We.closest(".ui-menu");
      if (!F || !F.contains(P.target)) return;
      const Q = F.ownerDocument, He = [...F.querySelectorAll('[data-im-row] > [role="menuitem"]:first-child')], Ne = [...F.querySelectorAll(':scope > div:last-child > [role="menuitem"]')], ge = [...He, ...Ne];
      if (P.key === "ArrowDown" || P.key === "ArrowUp") {
        P.preventDefault(), P.stopImmediatePropagation();
        const Oe = Q.activeElement;
        let Be = Oe ? ge.indexOf(Oe) : -1;
        if (Be < 0 && Oe) {
          const Ze = Oe.closest("[data-im-row]"), bt = Ze == null ? void 0 : Ze.querySelector('[role="menuitem"]:first-child');
          bt && (Be = He.indexOf(bt));
        }
        const oe = P.key === "ArrowDown" ? 1 : -1, _e = Be < 0 ? oe === 1 ? 0 : ge.length - 1 : (Be + oe + ge.length) % ge.length, Se = ge[_e];
        Se == null || Se.focus({ preventScroll: !0 }), hn((Se == null ? void 0 : Se.closest("[data-im-row]")) ?? Se, "nearest", j.current);
        return;
      }
      if (P.key === "ArrowLeft" || P.key === "ArrowRight") {
        const Oe = Q.activeElement, Be = Oe == null ? void 0 : Oe.closest("[data-im-row]");
        if (!Be) return;
        P.preventDefault(), P.stopImmediatePropagation();
        const oe = [...Be.querySelectorAll('[role="menuitem"]')].slice(1);
        if (oe.length === 0) return;
        const _e = Oe && Be.contains(Oe) ? oe.indexOf(Oe) : -1, Se = P.key === "ArrowRight" ? 1 : -1, Ze = _e < 0 ? 0 : (_e + Se + oe.length) % oe.length;
        (Te = oe[Ze]) == null || Te.focus({ preventScroll: !0 });
        return;
      }
    }, ye = (W == null ? void 0 : W.ownerDocument) ?? null;
    return ye == null || ye.addEventListener("keydown", Y, { capture: !0 }), () => ye == null ? void 0 : ye.removeEventListener("keydown", Y, { capture: !0 });
  }, [n, S, W]), le(() => {
    if (!S) return;
    const Y = t.find((F) => F.id === S);
    Y && !H && _(Y.name);
    const ye = requestAnimationFrame(() => {
      const F = C.current;
      F && (F.focus(), F.select());
    });
    let P = 0;
    const te = window.setInterval(() => {
      const F = C.current;
      if (P++, !F || P > 12) {
        clearInterval(te);
        return;
      }
      F.ownerDocument.activeElement !== F && (F.focus(), F.select());
    }, 50);
    return () => {
      cancelAnimationFrame(ye), clearInterval(te);
    };
  }, [S]), le(() => {
    if (S) {
      const Y = t.find((ye) => ye.id === S);
      Y && !H && _(Y.name);
    }
  }, [S, t]);
  const me = (Y, ye) => {
    $(Y), _(ye);
  }, he = () => {
    S && X.current.trim() && o(S, X.current.trim()), $(null);
  }, ie = () => {
    $(null);
  }, G = N || I.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ E(Jr, { open: n, onOpenChange: (Y) => {
    Y ? ($(null), _("")) : (S && H.trim() && o(S, H.trim()), $(null), _("")), (!Y || !m) && e(Y);
  }, width: "w-80", theme: g, align: b, trigger: T, morph: J, contentClassName: O, children: [
    /* @__PURE__ */ h("div", { className: `shrink-0 ${A.headerText}`, children: I }),
    /* @__PURE__ */ h("div", { ref: ke, "data-im-list": !0, onPointerEnter: M.engage, onPointerDown: M.engage, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: t.map((Y) => {
      const ye = Y.id === r, P = S === Y.id;
      return /* @__PURE__ */ h("div", { "data-im-row": Y.id, "data-active": ye ? "1" : void 0, className: `scroll-my-4 flex items-center gap-1 rounded ${ye || P ? A.rowActiveBg : A.rowHoverBg} ${S && !P ? "opacity-40 pointer-events-none" : ""}`, children: P ? /* @__PURE__ */ E(ct, { children: [
        /* @__PURE__ */ h("div", { className: "flex-1 min-w-0 flex items-center", children: /* @__PURE__ */ h(
          "input",
          {
            ref: C,
            autoFocus: !0,
            value: H,
            onChange: (te) => _(te.target.value),
            onKeyDown: (te) => {
              te.key === "Enter" && (te.preventDefault(), te.stopPropagation(), he()), te.key === "Escape" && (te.preventDefault(), te.stopPropagation(), ie());
            },
            className: "w-full outline-none bg-transparent placeholder:text-current placeholder:opacity-50",
            style: K
          }
        ) }),
        /* @__PURE__ */ h(
          Le.Item,
          {
            className: `shrink-0 ${A.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${A.editConfirm}`,
            onSelect: (te) => {
              te.preventDefault(), he();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ h(cr, { className: A.btnIcon })
          }
        ),
        /* @__PURE__ */ h(
          Le.Item,
          {
            className: `shrink-0 ${A.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${A.editCancel}`,
            onSelect: (te) => {
              te.preventDefault(), ie();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ h(Sn, { className: A.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ E(ct, { children: [
        /* @__PURE__ */ h(
          Le.Item,
          {
            style: K,
            className: `flex-1 min-w-0 rounded outline-none cursor-pointer flex items-center ${A.rowText} ${ye ? "" : A.rowTextHover}`,
            onSelect: p ? () => {
              i(Y.id);
            } : (te) => {
              te.preventDefault(), i(Y.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ h("span", { className: `truncate ${ye ? A.rowActiveText : ""}`, children: R ? R(Y) : Y.name })
          }
        ),
        /* @__PURE__ */ h(
          Le.Item,
          {
            className: `shrink-0 ${A.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${ye ? A.btnActive : A.btnBase}`,
            onSelect: (te) => {
              te.preventDefault(), me(Y.id, Y.name);
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: /* @__PURE__ */ h(Ol, { className: A.btnIcon })
          }
        ),
        /* @__PURE__ */ h(
          Le.Item,
          {
            className: `shrink-0 ${A.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${ye ? A.btnActive : A.btnBase}`,
            onSelect: (te) => {
              te.preventDefault();
              const F = s(Y.id);
              F && me(F, `${Y.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: /* @__PURE__ */ h(_o, { className: A.btnIcon })
          }
        ),
        /* @__PURE__ */ h(
          Le.Item,
          {
            className: `shrink-0 ${A.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${t.length <= w ? A.btnDisabled : ye ? A.btnDangerActive : A.btnDanger}`,
            onSelect: (te) => {
              te.preventDefault(), l(Y.id);
            },
            onTouchStart: () => {
            },
            disabled: m || t.length <= w,
            children: /* @__PURE__ */ h(fi, { className: A.btnIcon })
          }
        )
      ] }) }, Y.id);
    }) }),
    /* @__PURE__ */ E("div", { className: `shrink-0 ${S ? "opacity-40 pointer-events-none" : ""}`, children: [
      d && /* @__PURE__ */ E(ct, { children: [
        /* @__PURE__ */ h(Le.Separator, { className: A.separator }),
        /* @__PURE__ */ E(
          Le.Item,
          {
            className: `w-full text-left ${A.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${A.itemDefault} ui-row`,
            onSelect: (Y) => {
              Y.preventDefault(), d();
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: [
              /* @__PURE__ */ h(jo, { className: `${A.btnIcon} ${A.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (c || a || u || f) && /* @__PURE__ */ h(Le.Separator, { className: A.separator }),
      c && /* @__PURE__ */ E(
        Le.Item,
        {
          className: `w-full text-left ${A.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${A.itemDefault} ui-row`,
          onSelect: (Y) => {
            Y.preventDefault();
            const ye = c();
            ye && me(ye, "");
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ h(Hr, { className: `${A.btnIcon} ${A.icon}` }),
            "New ",
            G
          ]
        }
      ),
      a && /* @__PURE__ */ E(
        Le.Item,
        {
          className: `w-full text-left ${A.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${A.itemDefault} ui-row`,
          onSelect: (Y) => {
            Y.preventDefault(), a();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ E("svg", { className: `${A.btnIcon} ${A.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ h("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ h("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ h("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      u && /* @__PURE__ */ E(
        Le.Item,
        {
          className: `w-full text-left ${A.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${A.itemDefault} ui-row`,
          onSelect: (Y) => {
            Y.preventDefault(), u();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ E("svg", { className: `${A.btnIcon} ${A.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ h("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ h("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ h("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      f && /* @__PURE__ */ E(
        Le.Item,
        {
          className: `w-full text-left ${A.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${A.itemDefault} ui-row`,
          onSelect: (Y) => {
            Y.preventDefault(), f();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ h(fi, { className: `${A.btnIcon} ${A.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
function _c({
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
  var j;
  us();
  const f = qr(), p = Di(), m = ds(), g = v(!1), b = v(null), x = Rc(), I = !!x && d !== void 0, N = x && d !== void 0 ? x.isSelected(d) : l, T = t || (x && d !== void 0 ? !x.canToggle(d) : !1), { myIndex: w, highlighted: R, setPointer: J, api: O } = ms({
    label: () => fs(o),
    activate: () => {
      T || (x && d !== void 0 ? x.toggle(d) : n());
    },
    disabled: T,
    group: u,
    itemId: d
  }), { query: A } = Bc(), K = A.trim() !== "" && w < 0, S = Fc(), $ = u == null ? void 0 : u.trim(), H = !!$ && w >= 0 && (w === 0 || ((j = O == null ? void 0 : O.items[w - 1]) == null ? void 0 : j.group) !== $), _ = $ && x ? ((O == null ? void 0 : O.items) ?? []).filter((W) => W.group === $ && W.itemId).map((W) => W.itemId).filter((W) => !x.isDisabled(W)) : [], X = x && _.length > 0 ? x.groupState(_) : "none", C = r === "danger" ? f.itemDanger : f.itemDefault;
  return /* @__PURE__ */ E(ct, { children: [
    H && /* @__PURE__ */ h(
      "div",
      {
        "data-menu-group": $,
        role: "presentation",
        className: `ui-label shrink-0 select-none font-semibold uppercase tracking-wider ${x && _.length > 0 ? "" : "pointer-events-none"}`,
        style: m,
        children: x && _.length > 0 ? /* @__PURE__ */ E("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `Select all ${$}`,
              onMouseDown: (W) => W.preventDefault(),
              onClick: () => x.toggleGroup(_),
              className: "flex shrink-0 cursor-pointer items-center justify-center rounded pointer-events-auto",
              children: /* @__PURE__ */ h(
                Ar,
                {
                  checked: X === "all",
                  indeterminate: X === "some",
                  indicator: x.indicator
                }
              )
            }
          ),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: $ })
        ] }) : $
      }
    ),
    /* @__PURE__ */ E(
      Le.Item,
      {
        ref: b,
        id: S && w >= 0 ? `${S}-opt-${w}` : void 0,
        "data-ei": w >= 0 ? w : void 0,
        ...I ? { role: "menuitemcheckbox", "aria-checked": N } : {},
        style: { ...p, display: K ? "none" : void 0 },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${C} ${I ? "" : l ? "ui-item-selected" : ""} ${R ? "ui-item-highlighted" : ""} ${T ? "opacity-30 pointer-events-none" : ""} ${i}`,
        onSelect: (W) => {
          if (g.current) {
            g.current = !1;
            return;
          }
          if (I) {
            W.preventDefault(), x && d !== void 0 && x.toggle(d);
            return;
          }
          s && W.preventDefault(), n();
        },
        onPointerEnter: () => {
          J(w);
        },
        onTouchStart: () => {
        },
        disabled: T,
        children: [
          I && /* @__PURE__ */ h(Ar, { checked: N, disabled: T, indicator: x.indicator }),
          e && /* @__PURE__ */ h("span", { className: `${f.icon} shrink-0`, children: e }),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: o }),
          a && /* @__PURE__ */ h("span", { className: "shrink-0 ml-1 flex items-center", children: a }),
          c && /* @__PURE__ */ h(
            "span",
            {
              className: `shrink-0 ml-1 p-0.5 rounded ${f.rightAction}`,
              title: c.title,
              onPointerDown: (W) => {
                W.stopPropagation(), W.preventDefault(), g.current = !0, c.onClick();
              },
              onClick: (W) => {
                W.stopPropagation(), W.preventDefault();
              },
              children: c.icon
            }
          )
        ]
      }
    )
  ] });
}
function jc({ id: n, label: e, icon: t, width: r, side: i = "right", children: o, contentClassName: s }) {
  const { chain: l, setChain: c, morph: a, keyboardOpened: u, setKeyboardOpened: d } = Gt(Pi), f = l.includes(n), p = l[l.length - 1] === n;
  us();
  const m = Pc(), g = Kn(), b = v(null), x = v(null), [I, N] = re(f), T = !f && I;
  le(() => {
    f && N(!0);
  }, [f]);
  const w = () => c((ie) => {
    const G = ie.indexOf(n);
    return G >= 0 ? ie.slice(0, G) : ie;
  }), R = Kr(), J = Li(), O = v(J);
  O.current = J;
  const A = v(null);
  le(() => {
    var G;
    const ie = {
      label: e,
      activate: () => {
        d(n), c((Y) => Y.includes(n) ? Y : [...Y, n]);
      },
      submenu: !0
    };
    return A.current = ie, (G = O.current) == null ? void 0 : G.register(ie);
  }, []);
  const K = J && A.current ? J.items.indexOf(A.current) : -1, S = K >= 0 && K === J.highlightedIndex, $ = ne(() => {
    const ie = b.current;
    if (!ie) return null;
    const G = ie.getBoundingClientRect();
    return { left: G.left, top: G.top, width: G.width, height: G.height };
  }, []), H = Wr({
    visible: f,
    morph: a,
    anchor: $,
    onClosed: () => N(!1)
  }), _ = v(() => {
  }), X = v(() => {
  }), C = v(() => {
  });
  Oi(f && p, R, _, {
    onCloseSub: () => {
      w(), J && K >= 0 && J.setHighlighted(K, "keyboard");
    }
  });
  const j = v(u);
  j.current = u, le(() => {
    f && (j.current === n ? (R.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var ie;
      return (ie = x.current) == null ? void 0 : ie.focus();
    }), d(null)) : R.setHighlighted(-1, "keyboard"));
  }, [f]), Fi(f, X), Bi(f, R, _, x, !p, C), lt.useLayoutEffect(() => {
    var G;
    if (!f || R.highlightedIndex < 0 || R.pointerDriven) return;
    const ie = (G = x.current) == null ? void 0 : G.querySelector(`[data-ei="${R.highlightedIndex}"]`);
    hn(ie, "nearest", x.current);
  }, [f, R.highlightedIndex, R.pointerDriven]);
  const W = v(null), fe = ne((ie) => {
    var G;
    if (ie) {
      ie.addEventListener("keydown", _.current, { capture: !0 }), ie.addEventListener("wheel", X.current, { passive: !1 });
      const Y = ie.ownerDocument;
      W.current = Y, Y.addEventListener("keydown", C.current, { capture: !0 });
    } else
      (G = W.current) == null || G.removeEventListener("keydown", C.current, { capture: !0 }), W.current = null;
    x.current = ie, H(ie);
  }, [H]), ke = Fe(), M = { padding: `${L(8, 12, ke)}px ${L(12, 16, ke)}px`, fontSize: L(12, 14, ke) }, me = `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${S ? " ui-item-highlighted" : ""}${T ? " ui-sub-closing" : ""}`, he = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${s || ""}`;
  return /* @__PURE__ */ E(Le.Sub, { open: f || I, onOpenChange: (ie) => c((G) => {
    if (!ie) {
      const Y = G.indexOf(n);
      return Y >= 0 ? G.slice(0, Y) : G;
    }
    return G.includes(n) ? G : [...G, n];
  }), children: [
    /* @__PURE__ */ E(
      Le.SubTrigger,
      {
        ref: b,
        "data-ei": K >= 0 ? K : void 0,
        style: M,
        className: me,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          J && K >= 0 && J.setHighlighted(K, "pointer");
        },
        onPointerDown: (ie) => {
          ie.pointerType === "pen" && (ie.preventDefault(), c((G) => f ? G.slice(0, G.indexOf(n)) : [...G, n]));
        },
        children: [
          i === "left" && /* @__PURE__ */ h(Mr, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ E("span", { className: "flex items-center gap-2", children: [
            t && /* @__PURE__ */ h("span", { className: "ui-icon shrink-0", children: t }),
            e
          ] }),
          i === "right" && /* @__PURE__ */ h(Mr, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ h(Le.Portal, { container: g ?? void 0, children: /* @__PURE__ */ h(
      Le.SubContent,
      {
        ref: fe,
        ...m,
        className: he,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: R.pointerLeave,
        children: /* @__PURE__ */ h(dr.Provider, { value: R, children: o })
      }
    ) })
  ] });
}
const Gn = 8, vh = ({ open: n, x: e, y: t, onClose: r, children: i, containerRef: o, theme: s, morph: l = !0 }) => {
  const c = Xt(), a = s ? { theme: s, attrs: { "data-theme": s } } : c ? ns(void 0, c) : { theme: "light", attrs: { "data-theme": "light" } }, { theme: u } = a, d = Fe(), f = L(12, 14, d), p = v(null), m = ar(), [g, b] = re(!1), [x, I] = re([]), [N, T] = re(null), w = Kr();
  le(() => {
    if (n)
      return w.setHighlighted(-1, "keyboard"), es(r);
  }, [n, r]);
  const R = v({ left: e, top: t });
  n && (R.current = { left: e, top: t });
  const J = ne(() => ({ left: R.current.left, top: R.current.top, width: 0, height: 0 }), []), O = Wr({
    visible: !0,
    morph: l,
    anchor: J,
    cloneOnUnmount: !0
  }), A = v(() => {
  }), K = v(() => {
  }), S = v(() => {
  });
  Oi(n, w, A), ft(() => {
    if (!n || w.highlightedIndex < 0 || w.pointerDriven) return;
    const C = p.current;
    hn(
      C == null ? void 0 : C.querySelector(`[data-ei="${w.highlightedIndex}"]`),
      "nearest",
      C
    );
  }, [n, w.highlightedIndex, w.pointerDriven]), Fi(n, K), Bi(n, w, A, p, x.length > 0, S);
  const $ = v(null), H = ne((C) => {
    var j;
    if (C) {
      C.addEventListener("keydown", A.current, { capture: !0 }), C.addEventListener("wheel", K.current, { passive: !1 });
      const W = C.ownerDocument;
      $.current = W, W.addEventListener("keydown", S.current, { capture: !0 });
    } else
      (j = $.current) == null || j.removeEventListener("keydown", S.current, { capture: !0 }), $.current = null;
    p.current = C, b(!!C), O(C);
  }, [O]), [_, X] = re(null);
  return ft(() => {
    var Y;
    if (!n || !g || !p.current) return;
    const C = p.current, j = C.offsetWidth, W = C.offsetHeight, fe = (Y = o == null ? void 0 : o.current) == null ? void 0 : Y.getBoundingClientRect(), ke = fe ? fe.right : (m == null ? void 0 : m.innerWidth) ?? 0, M = fe ? fe.bottom : (m == null ? void 0 : m.innerHeight) ?? 0, me = fe ? fe.left : 0, he = fe ? fe.top : 0;
    let ie = Math.max(he + Gn, R.current.top), G = Math.max(me + Gn, R.current.left);
    G + j > ke && (G = ke - j - Gn), ie + W > M && (ie = Math.max(he + Gn, M - W - Gn)), X({ left: G, top: ie });
  }, [n, g, e, t, o]), n ? /* @__PURE__ */ E(Le.Root, { open: n, onOpenChange: (C) => {
    C || r();
  }, modal: !1, children: [
    /* @__PURE__ */ h(Le.Trigger, { asChild: !0, children: /* @__PURE__ */ h("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ h(Le.Portal, { children: /* @__PURE__ */ h($i.Provider, { value: u, children: /* @__PURE__ */ h(zi.Provider, { value: a.attrs, children: /* @__PURE__ */ h(Pi.Provider, { value: { chain: x, setChain: I, morph: l, keyboardOpened: N, setKeyboardOpened: T }, children: /* @__PURE__ */ h(dr.Provider, { value: w, children: /* @__PURE__ */ h(
      Le.Content,
      {
        ref: H,
        ...a.attrs,
        "data-ui-fixed": !0,
        className: "fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom",
        style: { fontSize: f, left: (_ == null ? void 0 : _.left) ?? R.current.left, top: (_ == null ? void 0 : _.top) ?? R.current.top, touchAction: "manipulation" },
        onPointerLeave: w.pointerLeave,
        children: i
      }
    ) }) }) }) }) })
  ] }) : null;
}, wh = ({ onClick: n, variant: e = "default", icon: t, disabled: r = !1, selected: i = !1, trailing: o, children: s }) => {
  const l = Fe(), c = { padding: `${L(8, 12, l)}px ${L(12, 16, l)}px`, fontSize: L(12, 14, l) }, a = Li(), u = v(a);
  u.current = a;
  const d = v(null);
  le(() => {
    var g;
    const m = { label: fs(s), activate: () => {
      r || n();
    } };
    return d.current = m, (g = u.current) == null ? void 0 : g.register(m);
  }, []);
  const f = a && d.current ? a.items.indexOf(d.current) : -1, p = !r && f >= 0 && f === a.highlightedIndex;
  return /* @__PURE__ */ E(
    Le.Item,
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
}, kh = () => /* @__PURE__ */ h(Le.Separator, { className: "ui-sep my-1" }), Sh = (n) => /* @__PURE__ */ h(jc, { ...n, width: n.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), $e = 8, gs = "[data-modal-stack]", nn = 220, nr = "cubic-bezier(0.32, 0.72, 0, 1)", Nr = 0.94;
function $n() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function ln(n) {
  if (!n) return { top: 0, height: 0, bottom: 0 };
  const e = n.visualViewport, t = e ? e.offsetTop : 0, r = e ? e.height : n.innerHeight;
  return { top: t, height: r, bottom: t + r };
}
function ys(n, e) {
  return `translate(${e.left - n.left}px, ${e.top - n.top}px) scale(${e.width / n.width}, ${e.height / n.height})`;
}
function co(n, e, t, r) {
  const i = ++n.current, o = e.getBoundingClientRect();
  e.style.transition = "none", e.style.transform = ys(o, t), e.style.transformOrigin = "0 0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === i && (e.style.transition = `transform ${nn}ms ${nr}, opacity 180ms ease`, e.style.transform = "none", window.setTimeout(() => {
        n.current === i && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", r());
      }, nn + 80));
    });
  });
}
function Wc(n, e, t) {
  const r = ++n.current;
  e.style.transition = "none", e.style.transformOrigin = "center", e.style.transform = `scale(${Nr})`, e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === r && (e.style.transition = `transform ${nn}ms ${nr}`, e.style.transform = "none", window.setTimeout(() => {
        n.current === r && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", t());
      }, nn + 60));
    });
  });
}
function ao(n, e, t) {
  const r = ++n.current, i = e.getBoundingClientRect(), o = 1 - Nr, s = { left: i.left + i.width * o / 2, top: i.top + i.height * o / 2, width: i.width * Nr, height: i.height * Nr };
  e.style.transition = `transform ${nn}ms ${nr}, opacity 170ms ease`, e.style.transformOrigin = "0 0", e.style.transform = ys(i, s), e.style.opacity = "0", window.setTimeout(() => {
    n.current === r && (e.style.visibility = "hidden", t(), requestAnimationFrame(() => {
      n.current !== r || e.isConnected || (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", e.style.opacity = "", e.style.visibility = "");
    }));
  }, nn + 60);
}
function ti(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(gs) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function pr(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(gs) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function qc({
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
  const g = Xt(), b = Ri(
    { mode: f, accent: m, surface: p, context: "surface" },
    g
  ), x = b.mode, I = b.surface, N = b.accent, T = v(null), w = v(null), R = v(null), J = Fe(), O = L(20, 24, J), A = L(10, 12, J), K = L(12, 14, J), S = L(14, 16, J), $ = L(20, 24, J), H = L(20, 24, J), _ = L(20, 24, J), X = L(14, 16, J), C = L(16, 20, J), j = L(10, 12, J), W = L(12, 14, J), fe = L(8, 10, J), ke = L(4, 6, J), M = { padding: `${A}px ${O}px` }, me = { fontSize: K }, he = { padding: `${H}px ${$}px 16px ${$}px` }, ie = { fontSize: S }, G = { padding: `0 ${$}px 16px` }, Y = { padding: `${_}px ${$}px` }, ye = { fontSize: j, padding: `${ke}px ${fe}px` }, [P, te] = re(!1), F = ne((k) => {
    T.current = k, te(k !== null);
  }, []), Q = Kn(), He = ar(), Ne = v(He);
  Ne.current = He;
  const [ge, We] = re(null), Te = v(null), Oe = v(!1), Be = v(!1), oe = v(0), _e = v({ w: 0, h: 0 }), Se = v(!1), [Ze, bt] = re(!1), [ve, Ve] = re(!1), yt = v(0), Ee = v(!1), [Qt, Ft] = re(!1), zt = v(c);
  zt.current = c;
  const De = v(!1), et = v(!1), st = () => {
    et.current = !0, bt(!0);
  }, Mt = () => {
    et.current = !1, bt(!1);
  };
  le(() => {
    n || (We(null), Se.current = !1, Oe.current = !1, Ve(!1));
  }, [n]), ft(() => {
    if (!n || Se.current || !P || !T.current) return;
    Se.current = !0;
    const k = T.current.getBoundingClientRect(), Z = Ne.current ?? null, V = (Z == null ? void 0 : Z.innerWidth) ?? 0, pe = ln(Z);
    We({
      left: Math.max($e, Math.min((V - k.width) / 2, V - k.width - $e)),
      top: Math.max(pe.top + $e, Math.min(pe.top + (pe.height - k.height) / 2, pe.bottom - k.height - $e))
    });
  }, [n, P]), ft(() => {
    if (!n || !P || !c || $n() || !T.current) return;
    const k = T.current, Z = ti(k), V = Z[Z.length - 1];
    st(), V ? co(yt, k, V.getBoundingClientRect(), Mt) : Wc(yt, k, Mt);
  }, [n, P]);
  const ht = ne(() => {
    if (!u || Ee.current) return;
    const k = T.current, Z = !!k && ti(k).length > 0;
    if (!k || !c || $n() || Z) {
      e();
      return;
    }
    Ee.current = !0, Ft(!0), De.current = !0, st(), ao(yt, k, () => {
      Ee.current = !1, Ft(!1), Mt(), e();
    });
  }, [c, e, u]), pt = ne(() => {
    const k = T.current;
    if (!k || De.current || !zt.current || $n() || ti(k).length > 0) return;
    const Z = k.ownerDocument, V = k.cloneNode(!0);
    V.removeAttribute("data-modal-stack"), V.removeAttribute("data-state"), V.removeAttribute("role"), V.removeAttribute("data-aria-hidden"), V.removeAttribute("tabindex"), V.setAttribute("aria-hidden", "true"), V.style.pointerEvents = "none", Z.body.appendChild(V), ao({ current: 0 }, V, () => {
      V.isConnected && V.remove();
    });
  }, []);
  ft(() => () => pt(), [pt]);
  const Rt = v(n);
  ft(() => {
    const k = Rt.current;
    Rt.current = n, k && !n && pt();
  }, [n, P, pt]), le(() => {
    if (!n || !P || !c || !T.current) return;
    const k = T.current, Z = k.parentNode;
    if (!Z) return;
    let V = 0, pe = null, we = !1;
    const Ae = () => {
      V = 0;
      const xe = pr(k);
      if (xe.length > 0)
        k.style.opacity = "", k.style.pointerEvents = "", pe = xe[xe.length - 1].getBoundingClientRect(), we = !0, V = requestAnimationFrame(Ae);
      else if (we) {
        we = !1, pe && !$n() && (st(), co(yt, k, pe, Mt)), pe = null;
        const Ie = Ne.current ?? null;
        Ie == null || Ie.setTimeout(() => {
          !k || !k.isConnected || getComputedStyle(k).opacity !== "1" && (k.style.opacity = "1", k.style.pointerEvents = "");
        }, 240);
      }
    }, ze = new MutationObserver(() => {
      !V && pr(k).length > 0 && (V = requestAnimationFrame(Ae));
    });
    return ze.observe(Z, { childList: !0 }), () => {
      ze.disconnect(), V && cancelAnimationFrame(V);
    };
  }, [n, P]), le(() => {
    if (!P || !c || $n() || !T.current) return;
    const k = T.current;
    let Z = Math.round(k.getBoundingClientRect().height), V = !1;
    const pe = new ResizeObserver(() => {
      if (!k.isConnected) return;
      const we = Math.round(k.getBoundingClientRect().height);
      if (!V) {
        V = !0, Z = we;
        return;
      }
      if (Math.abs(we - Z) < 1) return;
      if (Te.current || Ee.current || pr(k).length > 0) {
        Z = we;
        return;
      }
      if (et.current) return;
      const Ae = Z;
      Z = we, st();
      const ze = k.getBoundingClientRect(), xe = ln(Ne.current ?? null), Ie = !Oe.current && !Be.current, Tt = Ie ? xe.top + (xe.height - Ae) / 2 : ze.top, Ue = Ie ? xe.top + (xe.height - we) / 2 : ze.top;
      k.style.transition = "none", k.style.height = `${Ae}px`, Ie && (k.style.top = `${Tt}px`), w.current && (w.current.style.overflow = "hidden"), k.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          k.style.height === `${Ae}px` && (k.style.transition = `height ${nn}ms ${nr}${Ie ? `, top ${nn}ms ${nr}` : ""}`, k.style.height = `${we}px`, Ie && (k.style.top = `${Ue}px`), window.setTimeout(() => {
            k.style.height === `${we}px` && (k.style.transition = "", k.style.height = "", w.current && (w.current.style.overflow = ""), Ie && We({ left: ze.left, top: Ue }), Mt());
          }, nn + 60));
        });
      });
    });
    return pe.observe(k), () => pe.disconnect();
  }, [P]), le(() => {
    if (!P || !T.current || c && !$n()) return;
    const k = T.current, Z = new ResizeObserver(() => {
      if (!k.isConnected || Te.current || Ee.current || Be.current || pr(k).length > 0) return;
      const V = Ne.current ?? null, pe = ln(V), we = (V == null ? void 0 : V.innerWidth) ?? 0, Ae = k.getBoundingClientRect(), ze = Math.max(pe.top + $e, Math.min(Ae.top, pe.bottom - Ae.height - $e)), xe = Math.max($e, Math.min(Ae.left, we - Ae.width - $e));
      (Math.abs(ze - Ae.top) > 0.5 || Math.abs(xe - Ae.left) > 0.5) && We({ left: xe, top: ze });
    });
    return Z.observe(k), () => Z.disconnect();
  }, [P, c]);
  const Pe = ne(() => {
    const k = T.current;
    if (!k) return null;
    const Z = k.getBoundingClientRect();
    return { left: Z.left, top: Z.top, width: Z.width, height: Z.height };
  }, []), mt = ne((k, Z) => {
    const V = Ne.current ?? null, pe = (V == null ? void 0 : V.innerWidth) ?? 0, we = ln(V), Ae = Pe(), ze = Ae ? Ae.width : Math.min(pe - $e * 2, 576), xe = Ae ? Ae.height : Math.min(we.height - $e * 2, 400);
    return {
      left: Math.max($e, Math.min(k, pe - ze - $e)),
      top: Math.max(we.top + $e, Math.min(Z, we.bottom - xe - $e))
    };
  }, [Pe]);
  le(() => {
    if (!n) return;
    const k = Ne.current ?? null, Z = (k == null ? void 0 : k.visualViewport) ?? null;
    if (!k || !Z) return;
    const V = 120;
    Be.current = !1, _e.current = { w: k.innerWidth, h: k.innerHeight };
    let pe = 0;
    const we = () => {
      if (Ee.current || Te.current) return;
      const ze = (k == null ? void 0 : k.innerHeight) ?? 0, xe = (k == null ? void 0 : k.innerWidth) ?? 0, Tt = ln(k).height < ze - V, Ue = ze < _e.current.h - V && xe === _e.current.w;
      Tt || Ue ? (Be.current = !0, oe.current && (clearTimeout(oe.current), oe.current = 0)) : oe.current || (oe.current = (k == null ? void 0 : k.setTimeout(() => {
        Be.current = !1, oe.current = 0, Ve(!1);
      }, 600)) ?? 0), Ve(Be.current), !pe && (pe = requestAnimationFrame(() => {
        var dt;
        pe = 0;
        const mn = T.current;
        if (!mn) return;
        const Me = ln(Ne.current ?? null), kt = mn.getBoundingClientRect(), Vt = ((dt = Ne.current) == null ? void 0 : dt.innerWidth) ?? 0, Zt = (k == null ? void 0 : k.innerHeight) ?? 0, Re = Me.height < Zt - V || Zt < _e.current.h - V && (k == null ? void 0 : k.innerWidth) === _e.current.w;
        _e.current = { w: (k == null ? void 0 : k.innerWidth) ?? 0, h: Zt };
        const _t = kt.top >= Me.top + $e && kt.bottom <= Me.bottom - $e, En = () => {
          We({
            left: Math.max($e, Math.min((Vt - kt.width) / 2, Vt - kt.width - $e)),
            top: Math.max(Me.top + $e, Math.min(Me.top + (Me.height - kt.height) / 2, Me.bottom - kt.height - $e))
          });
        };
        if (Re && !ot) {
          if (Oe.current) {
            _t || We(mt(kt.left, kt.top));
            return;
          }
          if (_t) return;
          En();
          return;
        }
        if (!Be.current) {
          if (Oe.current) {
            _t || We(mt(kt.left, kt.top));
            return;
          }
          _t || En();
        }
      }));
    };
    Z.addEventListener("resize", we), Z.addEventListener("scroll", we);
    const Ae = () => {
      Ee.current || Te.current || pe || (pe = requestAnimationFrame(() => {
        pe = 0;
        const ze = T.current;
        if (!ze) return;
        const xe = Ne.current ?? null, Ie = ln(xe), Tt = (xe == null ? void 0 : xe.innerWidth) ?? 0, Ue = ze.getBoundingClientRect();
        if (Oe.current) {
          We(mt(Ue.left, Ue.top));
          return;
        }
        We({
          left: Math.max($e, Math.min((Tt - Ue.width) / 2, Tt - Ue.width - $e)),
          top: Math.max(Ie.top + $e, Math.min(Ie.top + (Ie.height - Ue.height) / 2, Ie.bottom - Ue.height - $e))
        });
      }));
    };
    return k.addEventListener("orientationchange", Ae), () => {
      Z.removeEventListener("resize", we), Z.removeEventListener("scroll", we), k.removeEventListener("orientationchange", Ae), pe && cancelAnimationFrame(pe), oe.current && clearTimeout(oe.current);
    };
  }, [n, mt]);
  const tt = ne((k) => {
    if (k.target.closest("button")) return;
    Oe.current = !0;
    const Z = Pe();
    Z && (We(mt(Z.left, Z.top)), Te.current = { startX: k.clientX, startY: k.clientY, posX: Z.left, posY: Z.top }, k.target.setPointerCapture(k.pointerId));
  }, [Pe, mt]), Ht = ne((k) => {
    const Z = Te.current;
    Z && (k.preventDefault(), We(mt(Z.posX + k.clientX - Z.startX, Z.posY + k.clientY - Z.startY)));
  }, [mt]), At = ne(() => {
    Te.current = null;
  }, []), qe = Te.current !== null, It = ne(() => {
    Oe.current = !1;
    const k = Ne.current ?? null, Z = ln(k), V = (k == null ? void 0 : k.innerWidth) ?? 0, pe = T.current, we = pe ? pe.getBoundingClientRect() : { width: 0, height: 0 };
    We({
      left: Math.max($e, Math.min((V - we.width) / 2, V - we.width - $e)),
      top: Math.max(Z.top + $e, Math.min(Z.top + (Z.height - we.height) / 2, Z.bottom - we.height - $e))
    });
  }, []), z = v(0), U = ne(() => {
    const k = Date.now();
    k - z.current < 300 ? (z.current = 0, It()) : z.current = k;
  }, [It]), de = ge !== null, Ye = de ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", nt = `${i ? `${i} w-full` : "max-w-xl w-full"}`, vt = {
    ...de ? { left: ge.left, top: ge.top } : {},
    width: `min(100%, calc(100dvw - ${$e * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...ve ? {} : { maxHeight: `calc(100dvh - ${$e * 2}px)` }
  }, wt = ne((k) => {
    if (k.key !== "Enter" || k.shiftKey || k.metaKey || k.ctrlKey || k.altKey) return;
    const Z = k.target, V = R.current;
    if (!(!!Z.closest("[data-modal-close]") || !!V && V.contains(Z) && !!Z.closest('button, a, [role="button"]')) && Z.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !V) return;
    const we = Array.from(V.querySelectorAll("button[data-modal-confirm]")), Ae = we.length > 0 ? we : Array.from(V.querySelectorAll("button")), ze = Ae[Ae.length - 1];
    !ze || ze.disabled || (k.preventDefault(), ze.click());
  }, []);
  return /* @__PURE__ */ h(Ai, { theme: b, children: /* @__PURE__ */ h(sn.Root, { open: n, onOpenChange: (k) => {
    k || ht();
  }, children: /* @__PURE__ */ E(sn.Portal, { container: Q ?? void 0, children: [
    /* @__PURE__ */ h(
      sn.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${Qt ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (k) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (k.preventDefault(), d && ht());
        }
      }
    ),
    /* @__PURE__ */ E(
      sn.Content,
      {
        ref: F,
        onKeyDown: wt,
        onInteractOutside: (k) => {
          d || k.preventDefault();
        },
        "data-modal-stack": !0,
        "data-mode": x,
        "data-accent": N,
        "data-surface": I,
        className: `ui-modal fixed z-[10000] bg-[var(--ui-modal-bg)] border border-[color:var(--ui-modal-border)] rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${Ye} ${nt}`,
        style: { touchAction: "manipulation", colorScheme: x, ...Object.keys(vt).length > 0 ? vt : {} },
        children: [
          a ? /* @__PURE__ */ E(
            "div",
            {
              style: he,
              className: `flex items-center justify-between ${qe ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (k) => {
                Ze || tt(k);
              },
              onPointerMove: Ht,
              onPointerUp: At,
              onClick: U,
              children: [
                /* @__PURE__ */ h(sn.Title, { style: ie, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t }),
                u && /* @__PURE__ */ h(sn.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ h(Sn, { style: { width: C, height: C } }) })
              ]
            }
          ) : /* @__PURE__ */ E(
            "div",
            {
              style: M,
              className: `ui-modal-header flex items-center justify-between border-b border-[color:var(--ui-modal-header-border)] shrink-0 bg-[var(--ui-modal-header-bg)] ${qe ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (k) => {
                Ze || tt(k);
              },
              onPointerMove: Ht,
              onPointerUp: At,
              onClick: U,
              children: [
                /* @__PURE__ */ E("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ h("span", { className: "text-[color:var(--ui-modal-icon)] shrink-0", children: r }),
                  /* @__PURE__ */ h(sn.Title, { style: me, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t })
                ] }),
                /* @__PURE__ */ E("div", { className: "flex items-center gap-2", children: [
                  l && /* @__PURE__ */ E("button", { onClick: l, style: ye, className: "cursor-pointer flex items-center gap-1 text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-muted-hover)] transition-colors bg-[var(--ui-modal-control-bg)] hover:bg-[var(--ui-modal-control-hover-bg)] rounded shrink-0", children: [
                    /* @__PURE__ */ h(jo, { style: { width: W, height: W } }),
                    "Reset"
                  ] }),
                  u && /* @__PURE__ */ h(sn.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ h(Sn, { style: { width: X, height: X } }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ h("div", { ref: w, "data-testid": "modal-body", style: a ? G : void 0, className: "overflow-y-auto flex-1 bg-[var(--ui-modal-body-bg)] text-[color:var(--ui-modal-body-text)]", children: s }),
          o && /* @__PURE__ */ h("div", { ref: R, style: a ? Y : void 0, className: a ? "" : "shrink-0", children: a ? /* @__PURE__ */ h("div", { className: "flex items-center justify-end gap-2", children: o }) : o })
        ]
      }
    )
  ] }) }) });
}
function Nh({ children: n }) {
  const e = Fe(), t = L(20, 24, e), r = L(8, 12, e);
  return /* @__PURE__ */ h("div", { className: "flex items-center justify-end gap-3 border-t border-[color:var(--ui-modal-border)] bg-[var(--ui-modal-footer-bg)]", style: { padding: `${r}px ${t}px` }, children: n });
}
const Kc = "inline-flex items-center gap-2 rounded-lg text-xs transition cursor-pointer select-none whitespace-nowrap active:shadow-[inset_0_0_0_2px_var(--ui-panel-bg)]", Jc = {
  zinc: "bg-[var(--ui-footer-hero-bg)] text-[color:var(--ui-footer-hero-text)] font-semibold border border-[color:var(--ui-footer-hero-border)] hover:bg-[var(--ui-footer-hero-hover-bg)] hover:border-[color:var(--ui-footer-hero-hover-border)] disabled:opacity-40 disabled:cursor-not-allowed",
  accent: "bg-[var(--ui-accent-solid)] text-[color:var(--ui-accent-action-text)] font-semibold border border-transparent hover:bg-[var(--ui-accent-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed",
  danger: "bg-[var(--ui-danger-solid)] text-white font-semibold border border-[color:var(--ui-danger-solid)] hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
}, Vc = {
  /* Transparent border on every variant — auto-height buttons add the border
     to their height, so the bordered hero would otherwise be 2px taller. */
  ghost: "border border-transparent text-[color:var(--ui-text-muted)] font-medium hover:bg-[var(--ui-footer-ghost-hover-bg)] hover:text-[color:var(--ui-text-strong)] disabled:opacity-50",
  danger: "border border-transparent text-[color:var(--ui-danger-text)] font-medium hover:bg-[var(--ui-danger-hover-bg)] hover:text-[color:var(--ui-danger-hover-text)] disabled:opacity-50",
  "danger-solid": "border border-transparent bg-[var(--ui-danger-solid)] text-white font-semibold hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
};
function mr({
  variant: n = "hero",
  tone: e = "zinc",
  className: t = "",
  type: r = "button",
  ...i
}) {
  const o = dn({ px: 24, py: 8, fs: 12 }, { px: 28, py: 10, fs: 14 });
  return /* @__PURE__ */ h(
    "button",
    {
      type: r,
      style: o,
      className: `${Kc} ${n === "hero" ? Jc[e] : Vc[n]} ${t}`,
      ...i
    }
  );
}
function Ir(n = "md") {
  const e = ot && Jo() > 0;
  return n === "sm" ? `${e ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"} ui-input` : `${e ? "px-4 py-3 text-sm" : "px-3 py-1.5 text-xs"} ui-input`;
}
function xs(n = "md") {
  return n === "sm" ? dn({ px: 8, py: 6, fs: 12 }, { px: 12, py: 8, fs: 14 }) : dn({ px: 10, py: 5, fs: 12 }, { px: 14, py: 9, fs: 14 });
}
const bs = Ut(null);
function Th() {
  const n = Gt(bs);
  if (!n) throw new Error("useDialog must be used within DialogProvider");
  return n;
}
function Ch({ children: n, theme: e, accent: t, surface: r }) {
  const [i, o] = re(null), [s, l] = re(!1), c = v(null), a = Fe(), u = L(16, 20, a), d = L(12, 14, a), f = xs(), p = v(i);
  p.current = i;
  const m = ne(() => {
    const w = p.current;
    w && (w.kind === "confirm" ? w.resolve(!1) : w.kind === "prompt" ? w.resolve(null) : w.resolve());
  }, []), g = ne((w) => {
    if (w.suppressKey) {
      const R = localStorage.getItem(w.suppressKey);
      if (R && Date.now() < parseInt(R, 10))
        return Promise.resolve(!0);
    }
    return new Promise((R) => {
      m(), l(!1), o({ kind: "confirm", options: w, resolve: R });
    });
  }, [m]), b = ne((w) => new Promise((R) => {
    m(), o({ kind: "prompt", options: w, resolve: R });
  }), [m]), x = ne((w) => new Promise((R) => {
    m(), o({ kind: "alert", options: w, resolve: R });
  }), [m]);
  le(() => {
    if (i) {
      const w = setTimeout(() => {
        var R;
        return (R = c.current) == null ? void 0 : R.focus();
      }, 50);
      return () => clearTimeout(w);
    }
  }, [i]);
  const I = ne(() => {
    var w, R;
    if (i) {
      if (i.kind === "confirm") {
        const J = i.options;
        J.suppressKey && s && localStorage.setItem(J.suppressKey, String(Date.now() + 864e5)), i.resolve(!0);
      } else i.kind === "prompt" ? i.resolve(((R = (w = c.current) == null ? void 0 : w.value) == null ? void 0 : R.trim()) || null) : i.resolve();
      o(null);
    }
  }, [i, s]), N = i !== null;
  le(() => {
    if (!N) return;
    const w = (R) => {
      R.key !== "Enter" || R.shiftKey || R.metaKey || R.ctrlKey || R.altKey || R.isComposing || (R.preventDefault(), R.stopImmediatePropagation(), I());
    };
    return document.addEventListener("keydown", w, !0), () => document.removeEventListener("keydown", w, !0);
  }, [N, I]);
  const T = ne(() => {
    i && (i.kind === "confirm" ? i.resolve(!1) : i.kind === "prompt" ? i.resolve(null) : i.resolve(), o(null));
  }, [i]);
  return /* @__PURE__ */ E(bs.Provider, { value: { confirm: g, prompt: b, alert: x }, children: [
    n,
    N && /* @__PURE__ */ h(
      qc,
      {
        open: !0,
        onClose: T,
        closable: (i == null ? void 0 : i.kind) !== "alert",
        dismissOnBackdrop: (i == null ? void 0 : i.kind) !== "alert",
        title: (i == null ? void 0 : i.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: i && /* @__PURE__ */ E(ct, { children: [
          i.kind !== "alert" && /* @__PURE__ */ h(mr, { variant: "ghost", onClick: T, children: "Cancel" }),
          i.kind === "alert" ? /* @__PURE__ */ h(mr, { onClick: I, children: "OK" }) : i.kind === "confirm" ? /* @__PURE__ */ h(
            mr,
            {
              "data-modal-confirm": !0,
              variant: i.options.danger ? "danger-solid" : "hero",
              onClick: I,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ h(mr, { "data-modal-confirm": !0, onClick: I, children: "Save" })
        ] }),
        children: /* @__PURE__ */ E("div", { className: "flex flex-col", style: { gap: u }, children: [
          (i == null ? void 0 : i.options.message) && /* @__PURE__ */ h("p", { style: { fontSize: d }, className: "text-[color:var(--ui-text-muted)] leading-relaxed", children: i.options.message }),
          (i == null ? void 0 : i.kind) === "confirm" && i.options.suppressKey && /* @__PURE__ */ h(
            Ac,
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
const Yc = 500, Uc = 250, Gc = 5, Pt = 88, uo = 4;
function Xc(n, e) {
  const t = n.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  t.style.strokeDasharray = String(r), t.style.strokeDashoffset = String(r);
  const i = performance.now(), o = (s) => {
    const l = s - i, c = Math.min(l / e, 1);
    t.style.strokeDashoffset = String(r * (1 - c)), c < 1 && requestAnimationFrame(o);
  };
  requestAnimationFrame(o);
}
function Qc({ x: n, y: e, ms: t }) {
  const r = v(null), i = Kn();
  return le(() => {
    r.current && Xc(r.current, t);
  }, [t]), _r(
    /* @__PURE__ */ h(
      "div",
      {
        style: {
          position: "fixed",
          left: n - Pt / 2,
          top: e - Pt / 2,
          width: Pt,
          height: Pt,
          zIndex: 99999,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ E("svg", { ref: r, width: Pt, height: Pt, viewBox: `0 0 ${Pt} ${Pt}`, children: [
          /* @__PURE__ */ h(
            "circle",
            {
              cx: Pt / 2,
              cy: Pt / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: uo + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ h(
            "circle",
            {
              cx: Pt / 2,
              cy: Pt / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: uo,
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
function Eh() {
  return { "data-no-longpress": "true" };
}
function Zc(n) {
  const e = n.tagName;
  return !!(e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || e === "BUTTON" || n.isContentEditable || n.closest("[data-no-longpress]") || n.closest("button, input, select, textarea"));
}
function Mh({
  children: n,
  showRing: e = !0,
  longPressMs: t = Yc,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: i,
  onLongPress: o
}) {
  const [s, l] = re(null), c = Ti(), a = v(null), u = v(null), d = v({ x: 0, y: 0, target: null }), f = v(!1), p = Math.min(Uc, t * 0.5), m = v(i);
  m.current = i;
  const g = v(o);
  return g.current = o, le(() => {
    if (!ot || !c) return;
    const b = (T) => {
      if (!hi(T.pointerType) || T.button !== 0) return;
      const w = T.target;
      if (!w.closest(r) || (m.current ? !m.current(w) : Zc(w))) return;
      const R = T.clientX, J = T.clientY;
      d.current = { x: R, y: J, target: T.target }, f.current = !0, e && (u.current = setTimeout(() => l({ x: R, y: J }), p)), a.current = setTimeout(() => {
        if (!f.current) return;
        u.current && (clearTimeout(u.current), u.current = null), l(null);
        const O = d.current.target;
        if (!O) return;
        const A = g.current;
        if (A) {
          A(O, R, J);
          return;
        }
        const K = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: R,
          clientY: J,
          button: 2,
          view: window
        });
        O.dispatchEvent(K);
      }, t);
    }, x = (T) => {
      if (!f.current || a.current === null) return;
      const w = T.clientX - d.current.x, R = T.clientY - d.current.y;
      Math.sqrt(w * w + R * R) > Gc && (clearTimeout(a.current), a.current = null, u.current && (clearTimeout(u.current), u.current = null), f.current = !1, l(null));
    }, I = () => {
      a.current !== null && (clearTimeout(a.current), a.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, l(null);
    }, N = (T) => {
      hi(T.pointerType) && (a.current !== null && (clearTimeout(a.current), a.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, l(null));
    };
    return c == null || c.addEventListener("pointerdown", b), c.addEventListener("pointermove", x), c.addEventListener("pointerup", I), c.addEventListener("pointercancel", I), c.addEventListener("pointerleave", N), () => {
      c.removeEventListener("pointerdown", b), c.removeEventListener("pointermove", x), c.removeEventListener("pointerup", I), c == null || c.removeEventListener("pointercancel", I), c == null || c.removeEventListener("pointerleave", N), a.current !== null && clearTimeout(a.current), u.current !== null && clearTimeout(u.current);
    };
  }, [e, t, p, r]), /* @__PURE__ */ E(ct, { children: [
    n,
    e && s && /* @__PURE__ */ h(Qc, { x: s.x, y: s.y, ms: t - p })
  ] });
}
function Rh() {
  const n = yc();
  return gc ? n === null || hi(n) : !1;
}
const ea = {
  border: "1px solid #d4d4d8",
  background: "rgba(255,255,255,0.94)",
  color: "#52525b",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
}, ta = {
  border: "2px solid #2563eb",
  background: "#2563eb",
  color: "#fff",
  boxShadow: "0 4px 16px rgba(37,99,235,0.4)"
}, na = {
  border: "1px solid #f59e0b",
  background: "rgba(255, 251, 235, 0.94)",
  color: "#b45309",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
};
function Ah({
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
        ...e ? na : n ? ta : ea,
        ...t
      },
      ...s,
      children: o
    }
  );
}
const ra = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], ia = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], ni = 1900, ri = 2100;
function oa(n, e) {
  return new Date(n, e + 1, 0).getDate();
}
function sa(n, e, t) {
  return `${n}-${String(e + 1).padStart(2, "0")}-${String(t).padStart(2, "0")}`;
}
function Ih({ selected: n, onChange: e, theme: t, showChips: r = !0, className: i = "", initialView: o }) {
  const s = Xt(), l = t ?? (s == null ? void 0 : s.mode) ?? "light", c = /* @__PURE__ */ new Date(), a = (() => {
    if (!o) return c;
    const F = /* @__PURE__ */ new Date(o + "T00:00:00");
    return isNaN(F.getTime()) ? c : F;
  })(), [u, d] = re(a.getFullYear()), [f, p] = re(a.getMonth()), [m, g] = re("days"), [b, x] = re(null), I = rt(() => new Set(n), [n]), N = (F) => {
    I.has(F) ? e(n.filter((Q) => Q !== F)) : e([...n, F]);
  }, T = rt(() => {
    const F = oa(u, f), Q = new Date(u, f, 1).getDay(), He = [];
    for (let Ne = 0; Ne < Q; Ne++) He.push({ key: `pad-${Ne}`, day: 0, empty: !0 });
    for (let Ne = 1; Ne <= F; Ne++) He.push({ key: sa(u, f, Ne), day: Ne, empty: !1 });
    return He;
  }, [u, f]), w = (F) => d((Q) => Math.max(ni, Math.min(ri, Q + F))), R = (F) => {
    f + F < 0 ? (d((Q) => Math.max(ni, Q - 1)), p(11)) : f + F > 11 ? (d((Q) => Math.min(ri, Q + 1)), p(0)) : p((Q) => Q + F);
  }, J = () => {
    if (b === null) return;
    const F = parseInt(b, 10);
    !isNaN(F) && F >= ni && F <= ri && d(F), x(null);
  }, O = (F) => n.some((Q) => Q.startsWith(`${u}-${String(F + 1).padStart(2, "0")}`)), A = Fe(), K = L(4, 8, A), S = L(16, 20, A), $ = L(10, 11, A), H = L(6, 8, A), _ = L(12, 14, A), X = L(6, 10, A), C = L(12, 14, A), j = L(8, 12, A), W = L(10, 12, A), fe = L(6, 10, A), ke = L(2, 6, A), M = L(64, 80, A), me = { padding: K }, he = { width: S, height: S }, ie = { fontSize: $, paddingTop: H, paddingBottom: H }, G = { fontSize: _, paddingTop: X, paddingBottom: X }, Y = { fontSize: C, paddingTop: j, paddingBottom: j }, ye = { fontSize: W, padding: `${ke}px ${fe}px` }, P = "bg-[var(--ui-date-selected-bg)] text-[color:var(--ui-date-selected-text)] hover:bg-[var(--ui-date-selected-hover-bg)]", te = "text-[color:var(--ui-text)] hover:bg-[var(--ui-card-hover)]";
  return /* @__PURE__ */ E("div", { "data-mode": l, "data-accent": s == null ? void 0 : s.accent, "data-surface": s == null ? void 0 : s.surface, className: `border rounded-lg overflow-hidden w-full border-[color:var(--ui-border-strong)] bg-[var(--ui-date-body-bg)] text-[color:var(--ui-text)] ${i}`, children: [
    /* @__PURE__ */ E("div", { className: "flex items-center justify-between px-3 py-2 border-b bg-[var(--ui-date-header-bg)] text-[color:var(--ui-date-header-text)] border-[color:var(--ui-border)]", children: [
      /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => m === "months" ? w(-1) : R(-1),
          style: me,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": m === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ h(Bl, { style: he })
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
          onChange: (F) => x(F.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: (F) => F.target.select(),
          onBlur: J,
          onKeyDown: (F) => {
            F.key === "Enter" && (F.preventDefault(), J()), F.key === "Escape" && x(null);
          },
          style: { width: M },
          className: "text-sm text-center font-semibold rounded outline-none py-0.5 bg-[var(--ui-date-header-hover)] text-[color:var(--ui-date-header-text)]"
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => m === "months" ? w(1) : R(1),
          style: me,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": m === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ h(Mr, { style: he })
        }
      )
    ] }),
    m === "months" ? /* @__PURE__ */ E("div", { children: [
      /* @__PURE__ */ h("div", { className: "grid grid-cols-3 text-center", children: ia.map((F, Q) => /* @__PURE__ */ E(
        "button",
        {
          type: "button",
          onClick: () => {
            p(Q), g("days");
          },
          style: Y,
          className: `relative font-medium transition-colors border-b border-[color:var(--ui-border)] ${Q === f ? P : te}`,
          children: [
            F,
            O(Q) && /* @__PURE__ */ h("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${Q === f ? "bg-[var(--ui-date-selected-text)]" : "bg-[var(--ui-accent-solid)]"}` })
          ]
        },
        F
      )) }),
      /* @__PURE__ */ h("div", { className: "text-center border-t border-[color:var(--ui-border)]", children: /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => {
            d(c.getFullYear()), p(c.getMonth()), g("days");
          },
          style: { paddingTop: X, paddingBottom: X, fontSize: _ },
          className: "px-3 font-semibold rounded transition-colors text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-card-hover)]",
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ E("div", { className: "grid grid-cols-7 text-center", children: [
      ra.map((F) => /* @__PURE__ */ h("div", { style: ie, className: "font-semibold uppercase tracking-wider border-b text-[color:var(--ui-text-faint)] border-[color:var(--ui-border)]", children: F }, F)),
      T.map((F) => F.empty ? /* @__PURE__ */ h("div", {}, F.key) : /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => N(F.key),
          style: G,
          className: `font-medium transition-colors border-b border-[color:var(--ui-border)] ${I.has(F.key) ? P : te}`,
          children: F.day
        },
        F.key
      ))
    ] }),
    r && n.length > 0 && /* @__PURE__ */ E("div", { className: "px-3 py-2 border-t border-[color:var(--ui-border)] bg-[var(--ui-date-footer-bg)]", children: [
      /* @__PURE__ */ E("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-[color:var(--ui-text-muted)]", children: [
        n.length,
        " date",
        n.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ h("div", { className: "flex flex-wrap gap-1", children: n.map((F) => {
        const Q = /* @__PURE__ */ new Date(F + "T00:00:00"), He = Q.getFullYear() === c.getFullYear() ? Q.toLocaleString("default", { month: "short", day: "numeric" }) : Q.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ E(
          "button",
          {
            type: "button",
            onClick: () => N(F),
            "aria-label": `Remove ${He}`,
            style: ye,
            className: "inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors bg-[var(--ui-date-chip-bg)] text-[color:var(--ui-date-chip-text)] hover:bg-[var(--ui-date-chip-hover-bg)]",
            children: [
              He,
              /* @__PURE__ */ h("span", { className: "leading-none text-[color:var(--ui-text-muted)]", "aria-hidden": "true", children: "×" })
            ]
          },
          F
        );
      }) })
    ] })
  ] });
}
function $h({
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
  const p = (T) => e instanceof Set ? e.has(T) : e.includes(T), m = Fe(), g = L(12, 16, m), b = L(8, 12, m), x = L(12, 14, m), I = L(16, 20, m), N = r != null || i != null;
  return /* @__PURE__ */ E("div", { className: f, ...d ? { "data-theme": d } : {}, children: [
    N && /* @__PURE__ */ E("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ h("span", { className: "ui-checklist-title", children: r }),
      i != null && /* @__PURE__ */ h("button", { type: "button", disabled: a, onClick: i, className: "ui-checklist-toggleall", children: s ?? (o ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ E(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${a ? "ui-checklist-disabled" : ""}`,
        style: c ? { maxHeight: c, overflowY: "auto" } : void 0,
        children: [
          n.map((T) => {
            const w = p(T.id), R = /* @__PURE__ */ h(Ii, { checked: w, size: I });
            return /* @__PURE__ */ E(
              "button",
              {
                type: "button",
                disabled: a,
                onClick: () => t(T.id),
                "aria-pressed": w,
                className: `ui-checklist-item ${w ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${b}px ${g}px`, fontSize: x },
                ...T.dataProps,
                children: [
                  u === "leading" && R,
                  T.leading != null && /* @__PURE__ */ h("span", { className: "ui-checklist-leading", children: T.leading }),
                  /* @__PURE__ */ h("span", { className: "ui-checklist-label", children: T.label }),
                  T.secondary != null && /* @__PURE__ */ h("span", { className: "ui-checklist-secondary", children: T.secondary }),
                  u === "trailing" && /* @__PURE__ */ h("span", { className: "ml-auto flex shrink-0", children: R })
                ]
              },
              T.id
            );
          }),
          n.length === 0 && /* @__PURE__ */ h("div", { className: "ui-checklist-empty", children: l })
        ]
      }
    )
  ] });
}
function zh({
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
  const u = Fe(), d = s ? 10 : L(12, 16, u), f = s ? 6 : L(8, 12, u), p = s ? 12 : L(12, 14, u), m = s ? 14 : L(16, 20, u);
  return /* @__PURE__ */ E("div", { className: a, ...c ? { "data-theme": c } : {}, children: [
    r != null && /* @__PURE__ */ h("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ h("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ E(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${l ? "ui-checklist-disabled" : ""}`,
        style: o ? { maxHeight: o, overflowY: "auto" } : void 0,
        children: [
          n.map((g) => {
            const b = e === g.id;
            return /* @__PURE__ */ E(
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
const Dh = ({
  className: n,
  children: e,
  reference: t,
  placement: r = "top",
  anchorMode: i = "visible",
  offset: o = 8
}) => {
  const s = ar(), { refs: l, floatingStyles: c } = Ul({
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
          var I;
          if (i !== "visible") return {};
          const u = (I = a.elements.floating.ownerDocument) == null ? void 0 : I.defaultView;
          if (!u) return {};
          const d = a.rects.reference, f = Math.max(d.x, 0), p = Math.max(d.y, 0), m = Math.min(d.x + d.width, u.innerWidth), g = Math.min(d.y + d.height, u.innerHeight);
          if (m <= f || g <= p) return {};
          const b = r === "left" ? m - (d.x + d.width) : r === "right" ? f - d.x : 0, x = r === "top" ? p - d.y : r === "bottom" ? g - (d.y + d.height) : 0;
          return { x: a.x + b, y: a.y + x };
        }
      },
      Wo(o),
      qo({ padding: 8 }),
      Ko({ padding: 8 }),
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
    whileElementsMounted: Gl
  });
  return ft(() => {
    t && l.setReference(t);
  }, [t, l]), /* @__PURE__ */ E(ct, { children: [
    !t && /* @__PURE__ */ h("div", { ref: l.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    s && _r(
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
function la(n, e) {
  if (!e || !lt.isValidElement(n)) return {};
  const t = n.props;
  if (t["aria-label"] || t.title) return {};
  const r = t.children;
  if (typeof r == "string" ? r.trim().length > 0 : Array.isArray(r) ? r.some((s) => typeof s == "string" && s.trim().length > 0) : !1) return {};
  const o = e.split(`
`)[0].replace(/^•\s*/, "").trim().slice(0, 80);
  return o ? { "aria-label": o } : {};
}
const zn = ({ content: n, children: e }) => {
  const t = Xt(), r = Fe(), i = L(10, 12, r), o = L(6, 6, r), s = L(10, 12, r), l = { padding: `${o}px ${i}px`, fontSize: s }, c = Kn(), a = ar(), [u, d] = re(!1), [f, p] = re({ x: 0, y: 0 }), m = v(null), g = v(null), b = () => {
    if (!m.current) return;
    const N = m.current.getBoundingClientRect();
    p({ x: N.left + N.width / 2, y: N.top });
  };
  le(() => () => {
    g.current && clearTimeout(g.current);
  }, []), le(() => (u && a && (b(), a.addEventListener("scroll", b, !0)), () => a == null ? void 0 : a.removeEventListener("scroll", b, !0)), [u]);
  const x = la(e, n), I = Object.keys(x).length > 0 ? lt.cloneElement(e, x) : e;
  return /* @__PURE__ */ E(
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
        I,
        u && _r(
          /* @__PURE__ */ E(
            "div",
            {
              "data-mode": t == null ? void 0 : t.mode,
              "data-accent": t == null ? void 0 : t.accent,
              className: "ui-tooltip fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-[color:var(--ui-tooltip-border)] bg-[var(--ui-tooltip-bg)] text-[color:var(--ui-tooltip-text)] pointer-events-none",
              style: { ...l, left: f.x, top: f.y - 4, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                n.split(`
• `).map((N, T) => /* @__PURE__ */ h("div", { className: T > 0 ? "mt-0.5 pt-0.5 border-t border-[color:var(--ui-tooltip-sep)]" : "", children: N }, T)),
                /* @__PURE__ */ h("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[color:var(--ui-tooltip-bg)]" })
              ]
            }
          ),
          c ?? document.body
        )
      ]
    }
  );
}, ca = 250;
function aa(n, e, t) {
  const [r, i] = lt.useState(null), [o, s] = lt.useState(!1), l = lt.useRef(null), c = lt.useRef(t);
  c.current = t;
  const a = lt.useCallback(() => {
    var f;
    const d = (f = e.current) == null ? void 0 : f[c.current];
    d && i({ left: d.offsetLeft, width: d.offsetWidth });
  }, [e]);
  lt.useLayoutEffect(() => {
    a();
  }, [t, a]), lt.useLayoutEffect(() => {
    const d = n.current;
    if (!d) return;
    const f = () => {
      s(!0), l.current && clearTimeout(l.current), l.current = setTimeout(() => s(!1), ca), a();
    }, p = new ResizeObserver(f);
    p.observe(d);
    for (const m of e.current ?? []) m && p.observe(m);
    return () => {
      p.disconnect(), l.current && (clearTimeout(l.current), l.current = null);
    };
  }, [n, e, a]);
  const u = lt.useMemo(
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
function Vr() {
  const n = Fe(), e = ot, t = e ? L(28, 40, n) : 28, r = e ? L(28, 40, n) : 28, i = e ? L(10, 14, n) : 10, o = e ? L(10, 14, n) : 10, s = e ? L(8, 10, n) : 8;
  return {
    toggle: { width: t, height: t },
    control: { height: r, padding: `0 ${i}px`, fontSize: o },
    input: { height: r, padding: `0 ${s}px`, fontSize: o }
  };
}
const Ph = ot ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", ua = ot ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", gr = ot ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", da = "hover:bg-red-950/50", Lh = ot ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", Oh = "bg-[var(--ui-accent-selected-bg)] border-[var(--ui-border-strong)] text-[color:var(--ui-accent-selected-text)]", Bh = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", fa = ot ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", Fh = ot ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50", vs = ot ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", ha = "inline-flex rounded-[var(--ui-radius-btn)] overflow-hidden border border-[var(--ui-border-strong)]", pa = ot ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", yr = ({ onClick: n, disabled: e, title: t, className: r = ua, children: i }) => {
  const o = Vr();
  return /* @__PURE__ */ h(zn, { content: t, children: /* @__PURE__ */ h("button", { onClick: n, disabled: e, "aria-label": t, style: o.control, className: `${r} ${e ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) });
}, xr = {
  wrap: "border-[color:var(--ui-border-strong)] bg-[var(--ui-seg-track-bg)]",
  pill: "bg-[var(--ui-seg-pill)]",
  active: "text-[color:var(--ui-accent-pill-text)]",
  idle: "text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-seg-hover)]"
}, Hh = ({ value: n, options: e, onChange: t, disabled: r, active: i, stretch: o, dense: s, variant: l = "chrome", theme: c, tablist: a, iconCollapse: u = !1, iconWithLabel: d = !0, ariaLabel: f }) => {
  const p = Xt(), m = c ?? Sc(p), g = c === "blue" || c === "emerald" ? c : (p == null ? void 0 : p.accent) ?? "zinc", b = { "data-mode": m === "dark" ? "dark" : "light", "data-accent": g }, x = Vr(), I = Fe(), N = s && !ot ? 24 : x.control.height, T = dn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), w = ot ? T : { padding: "0 12px", fontSize: 12, height: s ? 20 : 24 }, R = (S) => i ? i(S) : n === S, J = lt.useRef(null), O = lt.useRef([]), A = Math.max(0, e.findIndex((S) => R(S.v))), K = aa(J, O, A);
  return l === "track" ? /* @__PURE__ */ E(
    "div",
    {
      ref: J,
      role: a ? "tablist" : "group",
      "aria-label": f,
      ...b,
      className: `relative inline-flex items-center rounded-[var(--ui-radius-btn)] border p-0.5 ${ot ? "" : s ? "h-[26px]" : "h-[30px]"} ${o ? "w-full" : ""} ${xr.wrap}`,
      children: [
        K.style && /* @__PURE__ */ h(
          "span",
          {
            "aria-hidden": !0,
            className: `absolute rounded-[var(--ui-radius-inset)] ${xr.pill} ${K.motionClass}`,
            style: { ...K.style, top: 2, bottom: 2 }
          }
        ),
        e.map((S, $) => {
          const H = R(S.v), _ = u && !!S.icon;
          return /* @__PURE__ */ h(
            "button",
            {
              ref: (X) => {
                O.current[$] = X;
              },
              ...S.dataProps,
              type: "button",
              disabled: r,
              onClick: () => t(S.v),
              title: S.title,
              role: a ? "tab" : void 0,
              "aria-selected": a ? H : void 0,
              "aria-pressed": a ? void 0 : H,
              "aria-label": S.ariaLabel ?? (S.l ? void 0 : S.title),
              style: w,
              className: `relative z-10 inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-[var(--ui-radius-inset)] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${_ ? "group gap-0" : "gap-1.5"} ${o ? "flex-1" : ""} ${H ? xr.active : xr.idle}`,
              children: /* @__PURE__ */ h(
                cs,
                {
                  icon: S.icon,
                  collapse: _,
                  iconWithLabel: d,
                  active: H,
                  gap: L(6, 8, I),
                  children: S.l
                }
              )
            },
            S.v
          );
        })
      ]
    }
  ) : /* @__PURE__ */ E("div", { ref: J, className: `relative ${ha} bg-[var(--ui-seg-track-bg)]${o ? " w-full" : ""}`, children: [
    K.style && /* @__PURE__ */ h(
      "span",
      {
        "aria-hidden": !0,
        className: `absolute bg-[var(--ui-accent-pill-bg)] ${K.motionClass}`,
        style: { ...K.style, top: 0, bottom: 0 }
      }
    ),
    e.map((S, $) => {
      const H = R(S.v);
      return /* @__PURE__ */ E(
        "button",
        {
          ref: (_) => {
            O.current[$] = _;
          },
          ...S.dataProps,
          disabled: r,
          onClick: () => t(S.v),
          title: S.title,
          style: { ...x.control, height: N },
          className: `relative z-10 font-medium transition-colors disabled:opacity-30 ${o ? "flex-1" : ""} ${H ? "text-[color:var(--ui-accent-pill-text)]" : "text-[color:var(--ui-text-muted)] hover:bg-[var(--ui-accent-hover-bg)]"} ${S.v !== e[e.length - 1].v ? "border-r border-[var(--ui-border)]" : ""}`,
          children: [
            S.icon,
            S.l
          ]
        },
        S.v
      );
    })
  ] });
}, _h = ({ children: n }) => /* @__PURE__ */ E("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ h("span", { className: ot ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: n }),
  /* @__PURE__ */ h("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), ma = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", ga = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", jh = ({ label: n, children: e, tall: t }) => /* @__PURE__ */ E("div", { className: t ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  n && /* @__PURE__ */ h("span", { className: t ? ma : ga, children: n }),
  e
] }), Wh = ({ leading: n, trailing: e, className: t = "" }) => /* @__PURE__ */ E("div", { className: `flex flex-wrap items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-0 ${t}`, children: [
  n,
  e && /* @__PURE__ */ h("div", { className: "ml-auto flex flex-wrap items-center justify-end gap-1", children: e })
] }), qh = ({ readOnly: n, onDuplicate: e, onRemove: t, onMove: r, compact: i }) => (
  // One unbreakable cluster: when a header's trailing wraps, the move pair and
  // the duplicate/delete pair stay together (no orphaned icons on a line).
  /* @__PURE__ */ E("div", { className: "flex items-center gap-1 shrink-0", children: [
    /* @__PURE__ */ h(yr, { onClick: () => r(-1), disabled: n, title: "Move up", className: gr, children: /* @__PURE__ */ h(Fl, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ h(yr, { onClick: () => r(1), disabled: n, title: "Move down", className: gr, children: /* @__PURE__ */ h(Hl, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ h(yr, { onClick: e, disabled: n, title: "Duplicate", className: gr, children: /* @__PURE__ */ h(_o, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ h("div", { className: vs }),
    /* @__PURE__ */ h(yr, { onClick: t, disabled: n, title: "Delete", className: `${gr} ${da}`, children: /* @__PURE__ */ h(fi, { className: "w-2.5 h-2.5" }) })
  ] })
);
var fo = Object.defineProperty, ya = (n, e) => {
  let t = {};
  for (var r in n) fo(t, r, {
    get: n[r],
    enumerable: !0
  });
  return fo(t, Symbol.toStringTag, { value: "Module" }), t;
};
function xt(n) {
  this.content = n;
}
xt.prototype = {
  constructor: xt,
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
    return i == -1 ? o.push(t || n, e) : (o[i + 1] = e, t && (o[i] = t)), new xt(o);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(n) {
    var e = this.find(n);
    if (e == -1) return this;
    var t = this.content.slice();
    return t.splice(e, 2), new xt(t);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(n, e) {
    return new xt([n, e].concat(this.remove(n).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(n, e) {
    var t = this.remove(n).content.slice();
    return t.push(n, e), new xt(t);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(n, e, t) {
    var r = this.remove(e), i = r.content.slice(), o = r.find(n);
    return i.splice(o == -1 ? i.length : o, 0, e, t), new xt(i);
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
    return n = xt.from(n), n.size ? new xt(n.content.concat(this.subtract(n).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(n) {
    return n = xt.from(n), n.size ? new xt(this.subtract(n).content.concat(n.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(n) {
    var e = this;
    n = xt.from(n);
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
xt.from = function(n) {
  if (n instanceof xt) return n;
  var e = [];
  if (n) for (var t in n) e.push(t, n[t]);
  return new xt(e);
};
function ws(n, e, t) {
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
      return c && c < s.length && c < l.length && Ns(s.charCodeAt(c - 1)) && Ss(s.charCodeAt(c)) && t--, t;
    }
    if (i.content.size || o.content.size) {
      let s = ws(i.content, o.content, t + 1);
      if (s != null)
        return s;
    }
    t += i.nodeSize;
  }
}
function ks(n, e, t, r) {
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
      return d && f && d < a.length && Ns(a.charCodeAt(d - 1)) && Ss(a.charCodeAt(d)) && (t++, r++), { a: t, b: r };
    }
    if (s.content.size || l.content.size) {
      let a = ks(s.content, l.content, t - 1, r - 1);
      if (a)
        return a;
    }
    t -= c, r -= c;
  }
}
function Ss(n) {
  return n >= 56320 && n < 57344;
}
function Ns(n) {
  return n >= 55296 && n < 56320;
}
class q {
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
    return new q(i, this.size + e.size);
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
    return new q(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, t) {
    return e == t ? q.empty : e == 0 && t == this.content.length ? this : new q(this.content.slice(e, t));
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
    return i[e] = t, new q(i, o);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new q([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new q(this.content.concat(e), this.size + e.nodeSize);
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
    return ws(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, r = e.size) {
    return ks(this, e, t, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e) {
    if (e == 0)
      return br(0, e);
    if (e == this.size)
      return br(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let t = 0, r = 0; ; t++) {
      let i = this.child(t), o = r + i.nodeSize;
      if (o >= e)
        return o == e ? br(t + 1, o) : br(t, r);
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
      return q.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return q.fromArray(t.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return q.empty;
    let t, r = 0;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      r += o.nodeSize, i && o.isText && e[i - 1].sameMarkup(o) ? (t || (t = e.slice(0, i)), t[t.length - 1] = o.withText(t[t.length - 1].text + o.text)) : t && t.push(o);
    }
    return new q(t || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return q.empty;
    if (e instanceof q)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new q([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
q.empty = new q([], 0);
const ii = { index: 0, offset: 0 };
function br(n, e) {
  return ii.index = n, ii.offset = e, ii;
}
function $r(n, e) {
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
      if (!$r(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !$r(n[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in n))
        return !1;
  }
  return !0;
}
let Ke = class gi {
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
    return this == e || this.type == e.type && $r(this.attrs, e.attrs);
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
      return gi.none;
    if (e instanceof gi)
      return [e];
    let t = e.slice();
    return t.sort((r, i) => r.type.rank - i.type.rank), t;
  }
};
Ke.none = [];
class rr extends Error {
}
class ce {
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
    let r = Cs(this.content, e + this.openStart, t, this.openStart + 1, this.openEnd + 1);
    return r && new ce(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new ce(Ts(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
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
      return ce.empty;
    let r = t.openStart || 0, i = t.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new ce(q.fromJSON(e, t.content), r, i);
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
    return new ce(e, r, i);
  }
}
ce.empty = new ce(q.empty, 0, 0);
function Ts(n, e, t) {
  let { index: r, offset: i } = n.findIndex(e), o = n.maybeChild(r), { index: s, offset: l } = n.findIndex(t);
  if (i == e || o.isText) {
    if (l != t && !n.child(s).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != s)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, o.copy(Ts(o.content, e - i - 1, t - i - 1)));
}
function Cs(n, e, t, r, i, o) {
  let { index: s, offset: l } = n.findIndex(e), c = n.maybeChild(s);
  if (l == e || c.isText)
    return o && r <= 0 && i <= 0 && !o.canReplace(s, s, t) ? null : n.cut(0, e).append(t).append(n.cut(e));
  let a = Cs(c.content, e - l - 1, t, s == 0 ? r - 1 : 0, s == n.childCount - 1 ? i - 1 : 0, c);
  return a && n.replaceChild(s, c.copy(a));
}
function xa(n, e, t) {
  if (t.openStart > n.depth)
    throw new rr("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new rr("Inconsistent open depths");
  return Es(n, e, t, 0);
}
function Es(n, e, t, r) {
  let i = n.index(r), o = n.node(r);
  if (i == e.index(r) && r < n.depth - t.openStart) {
    let s = Es(n, e, t, r + 1);
    return o.copy(o.content.replaceChild(i, s));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let s = n.parent, l = s.content;
      return wn(s, l.cut(0, n.parentOffset).append(t.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: s, end: l } = ba(t, n);
      return wn(o, Rs(n, s, l, e, r));
    }
  else return wn(o, zr(n, e, r));
}
function Ms(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new rr("Cannot join " + e.type.name + " onto " + n.type.name);
}
function yi(n, e, t) {
  let r = n.node(t);
  return Ms(r, e.node(t)), r;
}
function vn(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t]) ? e[t] = n.withText(e[t].text + n.text) : e.push(n);
}
function Zn(n, e, t, r) {
  let i = (e || n).node(t), o = 0, s = e ? e.index(t) : i.childCount;
  n && (o = n.index(t), n.depth > t ? o++ : n.textOffset && (vn(n.nodeAfter, r), o++));
  for (let l = o; l < s; l++)
    vn(i.child(l), r);
  e && e.depth == t && e.textOffset && vn(e.nodeBefore, r);
}
function wn(n, e) {
  if (!n.type.validContent(e))
    throw new rr("Invalid content for node " + n.type.name);
  return n.copy(e);
}
function Rs(n, e, t, r, i) {
  let o = n.depth > i && yi(n, e, i + 1), s = r.depth > i && yi(t, r, i + 1), l = [];
  return Zn(null, n, i, l), o && s && e.index(i) == t.index(i) ? (Ms(o, s), vn(wn(o, Rs(n, e, t, r, i + 1)), l)) : (o && vn(wn(o, zr(n, e, i + 1)), l), Zn(e, t, i, l), s && vn(wn(s, zr(t, r, i + 1)), l)), Zn(r, null, i, l), new q(l);
}
function zr(n, e, t) {
  let r = [];
  if (Zn(null, n, t, r), n.depth > t) {
    let i = yi(n, e, t + 1);
    vn(wn(i, zr(n, e, t + 1)), r);
  }
  return Zn(e, null, t, r), new q(r);
}
function ba(n, e) {
  let t = e.depth - n.openStart, i = e.node(t).copy(n.content);
  for (let o = t - 1; o >= 0; o--)
    i = e.node(o).copy(q.from(i));
  return {
    start: i.resolveNoCache(n.openStart + t),
    end: i.resolveNoCache(i.content.size - n.openEnd - t)
  };
}
class ir {
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
      return Ke.none;
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
        return new Dr(this, e, r);
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
    return new ir(t, r, o);
  }
  /**
  @internal
  */
  static resolveCached(e, t) {
    let r = ho.get(e);
    if (r)
      for (let o = 0; o < r.elts.length; o++) {
        let s = r.elts[o];
        if (s.pos == t)
          return s;
      }
    else
      ho.set(e, r = new va());
    let i = r.elts[r.i] = ir.resolve(e, t);
    return r.i = (r.i + 1) % wa, i;
  }
}
class va {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const wa = 12, ho = /* @__PURE__ */ new WeakMap();
class Dr {
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
const ka = /* @__PURE__ */ Object.create(null);
let Bn = class xi {
  /**
  @internal
  */
  constructor(e, t, r, i = Ke.none) {
    this.type = e, this.attrs = t, this.marks = i, this.content = r || q.empty;
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
    return this.type == e && $r(this.attrs, t || e.defaultAttrs || ka) && Ke.sameSet(this.marks, r || Ke.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new xi(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new xi(this.type, this.attrs, this.content, e);
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
      return ce.empty;
    let i = this.resolve(e), o = this.resolve(t), s = r ? 0 : i.sharedDepth(t), l = i.start(s), a = i.node(s).content.cut(i.pos - l, o.pos - l);
    return new ce(a, i.depth - s, o.depth - s);
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
    return xa(this.resolve(e), this.resolve(t), r);
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
    return ir.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return ir.resolve(this, e);
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
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), As(this.marks, e);
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
  canReplace(e, t, r = q.empty, i = 0, o = r.childCount) {
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
    this.type.checkContent(this.content), po(this.type.attrs, this.attrs, "node", this.type.name);
    let e = Ke.none;
    for (let t = 0; t < this.marks.length; t++) {
      let r = this.marks[t];
      po(r.type.attrs, r.attrs, "mark", r.type.name), e = r.addToSet(e);
    }
    if (!Ke.sameSet(e, this.marks))
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
    let i = q.fromJSON(e, t.content);
    return e.nodeType(t.type).create(t.attrs, i, r);
  }
};
Bn.prototype.text = void 0;
class Pr extends Bn {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    if (super(e, t, null, i), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : As(this.marks, JSON.stringify(this.text));
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
    return e == this.marks ? this : new Pr(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new Pr(this.type, this.attrs, e, this.marks);
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
function As(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    e = n[t].type.name + "(" + e + ")";
  return e;
}
function po(n, e, t, r) {
  for (let i in e)
    if (!(i in n))
      throw new RangeError(`Unsupported attribute ${i} for ${t} of type ${r}`);
  for (let i in n)
    n[i].validate && n[i].validate(e[i]);
}
class Nn {
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
    let r = new Sa(e, t);
    if (r.next == null)
      return Nn.empty;
    let i = Is(r);
    r.next && r.err("Unexpected trailing text");
    let o = Aa(Ra(i));
    return Ia(o, r), o;
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
        return q.from(l.map((a) => a.createAndFill()));
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
Nn.empty = new Nn(!0);
class Sa {
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
function Is(n) {
  let e = [];
  do
    e.push(Na(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function Na(n) {
  let e = [];
  do
    e.push(Ta(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function Ta(n) {
  let e = Ma(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = Ca(n, e);
    else
      break;
  return e;
}
function mo(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function Ca(n, e) {
  let t = mo(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = mo(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function Ea(n, e) {
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
function Ma(n) {
  if (n.eat("(")) {
    let e = Is(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = Ea(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function Ra(n) {
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
function $s(n, e) {
  return e - n;
}
function go(n, e) {
  let t = [];
  return r(e), t.sort($s);
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
function Aa(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(go(n, 0));
  function t(r) {
    let i = [];
    r.forEach((s) => {
      n[s].forEach(({ term: l, to: c }) => {
        if (!l)
          return;
        let a;
        for (let u = 0; u < i.length; u++)
          i[u][0] == l && (a = i[u][1]);
        go(n, c).forEach((u) => {
          a || i.push([l, a = []]), a.indexOf(u) == -1 && a.push(u);
        });
      });
    });
    let o = e[r.join(",")] = new Nn(r.indexOf(n.length - 1) > -1);
    for (let s = 0; s < i.length; s++) {
      let l = i[s][1].sort($s);
      o.next.push({ type: i[s][0], next: e[l.join(",")] || t(l) });
    }
    return o;
  }
}
function Ia(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let i = r[t], o = !i.validEnd, s = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: c, next: a } = i.next[l];
      s.push(c.name), o && !(c.isText || c.hasRequiredAttrs()) && (o = !1), r.indexOf(a) == -1 && r.push(a);
    }
    o && e.err("Only non-generatable nodes (" + s.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function zs(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault)
      return null;
    e[t] = r.default;
  }
  return e;
}
function Ds(n, e) {
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
function Ps(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      t[r] = new za(n, r, e[r]);
  return t;
}
class Lr {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = Ps(e, r.attrs), this.defaultAttrs = zs(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
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
    return this.contentMatch == Nn.empty;
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
    return !e && this.defaultAttrs ? this.defaultAttrs : Ds(this.attrs, e);
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
    return new Bn(this, this.computeAttrs(e), q.from(t), Ke.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = q.from(t), this.checkContent(t), new Bn(this, this.computeAttrs(e), t, Ke.setFrom(r));
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
    if (e = this.computeAttrs(e), t = q.from(t), t.size) {
      let s = this.contentMatch.fillBefore(t);
      if (!s)
        return null;
      t = s.append(t);
    }
    let i = this.contentMatch.matchFragment(t), o = i && i.fillBefore(q.empty, !0);
    return o ? new Bn(this, e, t.append(o), Ke.setFrom(r)) : null;
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
    return t ? t.length ? t : Ke.none : e;
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null);
    e.forEach((o, s) => r[o] = new Lr(o, t, s));
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
function $a(n, e, t) {
  let r = t.split("|");
  return (i) => {
    let o = i === null ? "null" : typeof i;
    if (r.indexOf(o) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${n}, got ${o}`);
  };
}
class za {
  constructor(e, t, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? $a(e, t, r.validate) : r.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class Yr {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    this.name = e, this.rank = t, this.schema = r, this.spec = i, this.attrs = Ps(e, i.attrs), this.excluded = null;
    let o = zs(this.attrs);
    this.instance = o ? new Ke(this, o) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new Ke(this, Ds(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((o, s) => r[o] = new Yr(o, i++, t, s)), r;
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
class Da {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let i in e)
      t[i] = e[i];
    t.nodes = xt.from(e.nodes), t.marks = xt.from(e.marks || {}), this.nodes = Lr.compile(this.spec.nodes, this), this.marks = Yr.compile(this.spec.marks, this);
    let r = /* @__PURE__ */ Object.create(null);
    for (let i in this.nodes) {
      if (i in this.marks)
        throw new RangeError(i + " can not be both a node and a mark");
      let o = this.nodes[i], s = o.spec.content || "", l = o.spec.marks;
      if (o.contentMatch = r[s] || (r[s] = Nn.parse(s, this.nodes)), o.inlineContent = o.contentMatch.inlineContent, o.spec.linebreakReplacement) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!o.isInline || !o.isLeaf)
          throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
        this.linebreakReplacement = o;
      }
      o.markSet = l == "_" ? null : l ? yo(this, l.split(" ")) : l == "" || !o.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let o = this.marks[i], s = o.spec.excludes;
      o.excluded = s == null ? [o] : s == "" ? [] : yo(this, s.split(" "));
    }
    this.nodeFromJSON = (i) => Bn.fromJSON(this, i), this.markFromJSON = (i) => Ke.fromJSON(this, i), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
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
    else if (e instanceof Lr) {
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
    return new Pr(r, r.defaultAttrs, e, Ke.setFrom(t));
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
function yo(n, e) {
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
function Pa(n) {
  return n.tag != null;
}
function La(n) {
  return n.style != null;
}
class Fn {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, t) {
    this.schema = e, this.rules = t, this.tags = [], this.styles = [];
    let r = this.matchedStyles = [];
    t.forEach((i) => {
      if (Pa(i))
        this.tags.push(i);
      else if (La(i)) {
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
    let r = new bo(this, t, !1);
    return r.addAll(e, Ke.none, t.from, t.to), r.finish();
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
    let r = new bo(this, t, !0);
    return r.addAll(e, Ke.none, t.from, t.to), ce.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let o = this.tags[i];
      if (Fa(e, o.tag) && (o.namespace === void 0 || e.namespaceURI == o.namespace) && (!o.context || t.matchesContext(o.context))) {
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
        r(s = vo(s)), s.mark || s.ignore || s.clearMark || (s.mark = i);
      });
    }
    for (let i in e.nodes) {
      let o = e.nodes[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = vo(s)), s.node || s.ignore || s.mark || (s.node = i);
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
    return e.cached.domParser || (e.cached.domParser = new Fn(e, Fn.schemaRules(e)));
  }
}
const Ls = {
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
}, Oa = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, Os = { ol: !0, ul: !0 }, or = 1, bi = 2, er = 4;
function xo(n, e, t) {
  return e != null ? (e ? or : 0) | (e === "full" ? bi : 0) : n && n.whitespace == "pre" ? or | bi : t & ~er;
}
class vr {
  constructor(e, t, r, i, o, s) {
    this.type = e, this.attrs = t, this.marks = r, this.solid = i, this.options = s, this.content = [], this.activeMarks = Ke.none, this.match = o || (s & er ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let t = this.type.contentMatch.fillBefore(q.from(e));
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
    if (!(this.options & or)) {
      let r = this.content[this.content.length - 1], i;
      if (r && r.isText && (i = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let o = r;
        r.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = o.withText(o.text.slice(0, o.text.length - i[0].length));
      }
    }
    let t = q.from(this.content);
    return !e && this.match && (t = t.append(this.match.fillBefore(q.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Ls.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class bo {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0, this.localPreserveWS = !1;
    let i = t.topNode, o, s = xo(null, t.preserveWhitespace, 0) | (r ? er : 0);
    i ? o = new vr(i.type, i.attrs, Ke.none, !0, t.topMatch || i.type.contentMatch, s) : r ? o = new vr(null, null, Ke.none, !0, null, s) : o = new vr(e.schema.topNodeType, null, Ke.none, !0, null, s), this.nodes = [o], this.find = t.findPositions, this.needsBlock = !1;
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
    let r = e.nodeValue, i = this.top, o = i.options & bi ? "full" : this.localPreserveWS || (i.options & or) > 0, { schema: s } = this.parser;
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
    Os.hasOwnProperty(s) && this.parser.normalizeLists && Ba(e);
    let c = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, r));
    e: if (c ? c.ignore : Oa.hasOwnProperty(s))
      this.findInside(e), this.ignoreFallback(e, t);
    else if (!c || c.skip || c.closeParent) {
      c && c.closeParent ? this.open = Math.max(0, this.open - 1) : c && c.skip.nodeType && (e = c.skip);
      let a, u = this.needsBlock;
      if (Ls.hasOwnProperty(s))
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
      let s = Ke.none;
      for (let l of i.concat(e.marks))
        (o.type ? o.type.allowsMarkType(l.type) : wo(l.type, e.type)) && (s = l.addToSet(s));
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
    let l = xo(e, o, s.options);
    s.options & er && s.content.length == 0 && (l |= er);
    let c = Ke.none;
    return r = r.filter((a) => (s.type ? s.type.allowsMarkType(a.type) : wo(a.type, e)) ? (c = a.addToSet(c), !1) : !0), this.nodes.push(new vr(e, t, c, i, null, l)), this.open++, r;
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
      this.localPreserveWS && (this.nodes[t].options |= or);
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
function Ba(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && Os.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function Fa(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function vo(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function wo(n, e) {
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
const Bs = 65535, Fs = Math.pow(2, 16);
function Ha(n, e) {
  return n + e * Fs;
}
function ko(n) {
  return n & Bs;
}
function _a(n) {
  return (n - (n & Bs)) / Fs;
}
const Hs = 1, _s = 2, Tr = 4, js = 8;
class vi {
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
    return (this.delInfo & js) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (Hs | Tr)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (_s | Tr)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & Tr) > 0;
  }
}
class $t {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, t = !1) {
    if (this.ranges = e, this.inverted = t, !e.length && $t.empty)
      return $t.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let t = 0, r = ko(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + t + _a(e);
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
        let m = e == (t < 0 ? c : d) ? null : Ha(l / 3, e - c), g = e == c ? _s : e == d ? Hs : Tr;
        return (t < 0 ? e != c : e != d) && (g |= js), new vi(p, g, m);
      }
      i += u - a;
    }
    return r ? e + i : new vi(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, i = ko(t), o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
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
    return new $t(this.ranges, !this.inverted);
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
    return e == 0 ? $t.empty : new $t(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
$t.empty = new $t([]);
class Or {
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
    return new Or(this._maps, this.mirror, e, t);
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
    let e = new Or();
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
    return r ? e : new vi(e, i, null);
  }
}
const oi = /* @__PURE__ */ Object.create(null);
class Nt {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return $t.empty;
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
    let r = oi[t.stepType];
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
    if (e in oi)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return oi[e] = t, t.prototype.jsonID = e, t;
  }
}
class ut {
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
    return new ut(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new ut(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, t, r, i) {
    try {
      return ut.ok(e.replace(t, r, i));
    } catch (o) {
      if (o instanceof rr)
        return ut.fail(o.message);
      throw o;
    }
  }
}
function Hi(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let o = n.child(i);
    o.content.size && (o = o.copy(Hi(o.content, e, o))), o.isInline && (o = e(o, t, i)), r.push(o);
  }
  return q.fromArray(r);
}
class cn extends Nt {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new ce(Hi(t.content, (s, l) => !s.isAtom || !l.type.allowsMarkType(this.mark.type) ? s : s.mark(this.mark.addToSet(s.marks)), i), t.openStart, t.openEnd);
    return ut.fromReplace(e, this.from, this.to, o);
  }
  invert() {
    return new qt(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new cn(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof cn && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new cn(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new cn(t.from, t.to, e.markFromJSON(t.mark));
  }
}
Nt.jsonID("addMark", cn);
class qt extends Nt {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new ce(Hi(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
    return ut.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new cn(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new qt(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof qt && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new qt(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new qt(t.from, t.to, e.markFromJSON(t.mark));
  }
}
Nt.jsonID("removeMark", qt);
class an extends Nt {
  /**
  Create a node mark step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return ut.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return ut.fromReplace(e, this.pos, this.pos + 1, new ce(q.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    if (t) {
      let r = this.mark.addToSet(t.marks);
      if (r.length == t.marks.length) {
        for (let i = 0; i < t.marks.length; i++)
          if (!t.marks[i].isInSet(r))
            return new an(this.pos, t.marks[i]);
        return new an(this.pos, this.mark);
      }
    }
    return new Tn(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new an(t.pos, this.mark);
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
    return new an(t.pos, e.markFromJSON(t.mark));
  }
}
Nt.jsonID("addNodeMark", an);
class Tn extends Nt {
  /**
  Create a mark-removing step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return ut.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return ut.fromReplace(e, this.pos, this.pos + 1, new ce(q.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new an(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Tn(t.pos, this.mark);
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
    return new Tn(t.pos, e.markFromJSON(t.mark));
  }
}
Nt.jsonID("removeNodeMark", Tn);
class at extends Nt {
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
    return this.structure && wi(e, this.from, this.to) ? ut.fail("Structure replace would overwrite content") : ut.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new $t([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new at(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let t = e.mapResult(this.to, -1), r = this.from == this.to && at.MAP_BIAS < 0 ? t : e.mapResult(this.from, 1);
    return r.deletedAcross && t.deletedAcross ? null : new at(r.pos, Math.max(r.pos, t.pos), this.slice, this.structure);
  }
  merge(e) {
    if (!(e instanceof at) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let t = this.slice.size + e.slice.size == 0 ? ce.empty : new ce(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new at(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? ce.empty : new ce(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new at(e.from, this.to, t, this.structure);
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
    return new at(t.from, t.to, ce.fromJSON(e, t.slice), !!t.structure);
  }
}
at.MAP_BIAS = 1;
Nt.jsonID("replace", at);
class gt extends Nt {
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
    if (this.structure && (wi(e, this.from, this.gapFrom) || wi(e, this.gapTo, this.to)))
      return ut.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return ut.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? ut.fromReplace(e, this.from, this.to, r) : ut.fail("Content does not fit in gap");
  }
  getMap() {
    return new $t([
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
    return new gt(this.from, this.from + this.slice.size + t, this.from + this.insert, this.from + this.insert + t, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), i = this.from == this.gapFrom ? t.pos : e.map(this.gapFrom, -1), o = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return t.deletedAcross && r.deletedAcross || i < t.pos || o > r.pos ? null : new gt(t.pos, r.pos, i, o, this.slice, this.insert, this.structure);
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
    return new gt(t.from, t.to, t.gapFrom, t.gapTo, ce.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
Nt.jsonID("replaceAround", gt);
function wi(n, e, t) {
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
function ja(n, e, t, r) {
  let i = [], o = [], s, l;
  n.doc.nodesBetween(e, t, (c, a, u) => {
    if (!c.isInline)
      return;
    let d = c.marks;
    if (!r.isInSet(d) && u.type.allowsMarkType(r.type)) {
      let f = Math.max(a, e), p = Math.min(a + c.nodeSize, t), m = r.addToSet(d);
      for (let g = 0; g < d.length; g++)
        d[g].isInSet(m) || (s && s.to == f && s.mark.eq(d[g]) ? s.to = p : i.push(s = new qt(f, p, d[g])));
      l && l.to == f ? l.to = p : o.push(l = new cn(f, p, r));
    }
  }), i.forEach((c) => n.step(c)), o.forEach((c) => n.step(c));
}
function Wa(n, e, t, r) {
  let i = [], o = 0;
  n.doc.nodesBetween(e, t, (s, l) => {
    if (!s.isInline)
      return;
    o++;
    let c = null;
    if (r instanceof Yr) {
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
  }), i.forEach((s) => n.step(new qt(s.from, s.to, s.style)));
}
function _i(n, e, t, r = t.contentMatch, i = !0) {
  let o = n.doc.nodeAt(e), s = [], l = e + 1;
  for (let c = 0; c < o.childCount; c++) {
    let a = o.child(c), u = l + a.nodeSize, d = r.matchType(a.type);
    if (!d)
      s.push(new at(l, u, ce.empty));
    else {
      r = d;
      for (let f = 0; f < a.marks.length; f++)
        t.allowsMarkType(a.marks[f].type) || n.step(new qt(l, u, a.marks[f]));
      if (i && a.isText && t.whitespace != "pre") {
        let f, p = /\r?\n|\r/g, m;
        for (; f = p.exec(a.text); )
          m || (m = new ce(q.from(t.schema.text(" ", t.allowedMarks(a.marks))), 0, 0)), s.push(new at(l + f.index, l + f.index + f[0].length, m));
      }
    }
    l = u;
  }
  if (!r.validEnd) {
    let c = r.fillBefore(q.empty, !0);
    n.replace(l, l, new ce(c, 0, 0));
  }
  for (let c = s.length - 1; c >= 0; c--)
    n.step(s[c]);
}
function qa(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function Jn(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth, i = 0, o = 0; ; --r) {
    let s = n.$from.node(r), l = n.$from.index(r) + i, c = n.$to.indexAfter(r) - o;
    if (r < n.depth && s.canReplace(l, c, t))
      return r;
    if (r == 0 || s.type.spec.isolating || !qa(s, l, c))
      break;
    l && (i = 1), c < s.childCount && (o = 1);
  }
  return null;
}
function Ka(n, e, t) {
  let { $from: r, $to: i, depth: o } = e, s = r.before(o + 1), l = i.after(o + 1), c = s, a = l, u = q.empty, d = 0;
  for (let m = o, g = !1; m > t; m--)
    g || r.index(m) > 0 ? (g = !0, u = q.from(r.node(m).copy(u)), d++) : c--;
  let f = q.empty, p = 0;
  for (let m = o, g = !1; m > t; m--)
    g || i.after(m + 1) < i.end(m) ? (g = !0, f = q.from(i.node(m).copy(f)), p++) : a++;
  n.step(new gt(c, a, s, l, new ce(u.append(f), d, p), u.size - d, !0));
}
function Ws(n, e, t = null, r = n) {
  let i = Ja(n, e), o = i && Va(r, e);
  return o ? i.map(So).concat({ type: e, attrs: t }).concat(o.map(So)) : null;
}
function So(n) {
  return { type: n, attrs: null };
}
function Ja(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.contentMatchAt(r).findWrapping(e);
  if (!o)
    return null;
  let s = o.length ? o[0] : e;
  return t.canReplaceWith(r, i, s) ? o : null;
}
function Va(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.child(r), s = e.contentMatch.findWrapping(o.type);
  if (!s)
    return null;
  let c = (s.length ? s[s.length - 1] : e).contentMatch;
  for (let a = r; c && a < i; a++)
    c = c.matchType(t.child(a).type);
  return !c || !c.validEnd ? null : s;
}
function Ya(n, e, t) {
  let r = q.empty;
  for (let s = t.length - 1; s >= 0; s--) {
    if (r.size) {
      let l = t[s].type.contentMatch.matchFragment(r);
      if (!l || !l.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = q.from(t[s].type.create(t[s].attrs, r));
  }
  let i = e.start, o = e.end;
  n.step(new gt(i, o, i, o, new ce(r, 0, 0), t.length, !0));
}
function Ua(n, e, t, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let o = n.steps.length;
  n.doc.nodesBetween(e, t, (s, l) => {
    let c = typeof i == "function" ? i(s) : i;
    if (s.isTextblock && !s.hasMarkup(r, c) && Ga(n.doc, n.mapping.slice(o).map(l), r)) {
      let a = null;
      if (r.schema.linebreakReplacement) {
        let p = r.whitespace == "pre", m = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        p && !m ? a = !1 : !p && m && (a = !0);
      }
      a === !1 && Ks(n, s, l, o), _i(n, n.mapping.slice(o).map(l, 1), r, void 0, a === null);
      let u = n.mapping.slice(o), d = u.map(l, 1), f = u.map(l + s.nodeSize, 1);
      return n.step(new gt(d, f, d + 1, f - 1, new ce(q.from(r.create(c, null, s.marks)), 0, 0), 1, !0)), a === !0 && qs(n, s, l, o), !1;
    }
  });
}
function qs(n, e, t, r) {
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
function Ks(n, e, t, r) {
  e.forEach((i, o) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let s = n.mapping.slice(r).map(t + 1 + o);
      n.replaceWith(s, s + 1, e.type.schema.text(`
`));
    }
  });
}
function Ga(n, e, t) {
  let r = n.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, t);
}
function Xa(n, e, t, r, i) {
  let o = n.doc.nodeAt(e);
  if (!o)
    throw new RangeError("No node at given position");
  t || (t = o.type);
  let s = t.create(r, null, i || o.marks);
  if (o.isLeaf)
    return n.replaceWith(e, e + o.nodeSize, s);
  if (!t.validContent(o.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(new gt(e, e + o.nodeSize, e + 1, e + o.nodeSize - 1, new ce(q.from(s), 0, 0), 1, !0));
}
function rn(n, e, t = 1, r) {
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
function Qa(n, e, t = 1, r) {
  let i = n.doc.resolve(e), o = q.empty, s = q.empty;
  for (let l = i.depth, c = i.depth - t, a = t - 1; l > c; l--, a--) {
    o = q.from(i.node(l).copy(o));
    let u = r && r[a];
    s = q.from(u ? u.type.create(u.attrs, s) : i.node(l).copy(s));
  }
  n.step(new at(e, e, new ce(o.append(s), t, t), !0));
}
function Cn(n, e) {
  let t = n.resolve(e), r = t.index();
  return Js(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function Za(n, e) {
  e.content.size || n.type.compatibleContent(e.type);
  let t = n.contentMatchAt(n.childCount), { linebreakReplacement: r } = n.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let o = e.child(i), s = o.type == r ? n.type.schema.nodes.text : o.type;
    if (t = t.matchType(s), !t || !n.type.allowsMarks(o.marks))
      return !1;
  }
  return t.validEnd;
}
function Js(n, e) {
  return !!(n && e && !n.isLeaf && Za(n, e));
}
function Ur(n, e, t = -1) {
  let r = n.resolve(e);
  for (let i = r.depth; ; i--) {
    let o, s, l = r.index(i);
    if (i == r.depth ? (o = r.nodeBefore, s = r.nodeAfter) : t > 0 ? (o = r.node(i + 1), l++, s = r.node(i).maybeChild(l)) : (o = r.node(i).maybeChild(l - 1), s = r.node(i + 1)), o && !o.isTextblock && Js(o, s) && r.node(i).canReplace(l, l + 1))
      return e;
    if (i == 0)
      break;
    e = t < 0 ? r.before(i) : r.after(i);
  }
}
function eu(n, e, t) {
  let r = null, { linebreakReplacement: i } = n.doc.type.schema, o = n.doc.resolve(e - t), s = o.node().type;
  if (i && s.inlineContent) {
    let u = s.whitespace == "pre", d = !!s.contentMatch.matchType(i);
    u && !d ? r = !1 : !u && d && (r = !0);
  }
  let l = n.steps.length;
  if (r === !1) {
    let u = n.doc.resolve(e + t);
    Ks(n, u.node(), u.before(), l);
  }
  s.inlineContent && _i(n, e + t - 1, s, o.node().contentMatchAt(o.index()), r == null);
  let c = n.mapping.slice(l), a = c.map(e - t);
  if (n.step(new at(a, c.map(e + t, -1), ce.empty, !0)), r === !0) {
    let u = n.doc.resolve(a);
    qs(n, u.node(), u.before(), n.steps.length);
  }
  return n;
}
function tu(n, e, t) {
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
function Gr(n, e, t = e, r = ce.empty) {
  if (e == t && !r.size)
    return null;
  let i = n.resolve(e), o = n.resolve(t);
  return Vs(i, o, r) ? new at(e, t, r) : new nu(i, o, r).fit();
}
function Vs(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class nu {
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.unplaced = r, this.frontier = [], this.placed = q.empty;
    for (let i = 0; i <= e.depth; i++) {
      let o = e.node(i);
      this.frontier.push({
        type: o.type,
        match: o.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = q.from(e.node(i).copy(this.placed));
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
    let c = new ce(o, s, l);
    return e > -1 ? new gt(r.pos, e, this.$to.pos, this.$to.end(), c, t) : c.size || r.pos != this.$to.pos ? new at(r.pos, i.pos, c) : null;
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
        r ? (o = si(this.unplaced.content, r - 1).firstChild, i = o.content) : i = this.unplaced.content;
        let s = i.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: c, match: a } = this.frontier[l], u, d = null;
          if (t == 1 && (s ? a.matchType(s.type) || (d = a.fillBefore(q.from(s), !1)) : o && c.compatibleContent(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, inject: d };
          if (t == 2 && s && (u = a.findWrapping(s.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, wrap: u };
          if (o && a.matchType(o.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = si(e, t);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new ce(e, t + 1, Math.max(r, i.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = si(e, t);
    if (i.childCount <= 1 && t > 0) {
      let o = e.size - t <= t + i.size;
      this.unplaced = new ce(Xn(e, t - 1, 1), t - 1, o ? t - 1 : r);
    } else
      this.unplaced = new ce(Xn(e, t, 1), t, r);
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
      a++, (a > 1 || c == 0 || g.content.size) && (d = b, u.push(Ys(g.mark(f.allowedMarks(g.marks)), a == 1 ? c : 0, a == l.childCount ? p : -1)));
    }
    let m = a == l.childCount;
    m || (p = -1), this.placed = Qn(this.placed, t, q.from(u)), this.frontier[t].match = d, m && p < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let g = 0, b = l; g < p; g++) {
      let x = b.lastChild;
      this.frontier.push({ type: x.type, match: x.contentMatchAt(x.childCount) }), b = x.content;
    }
    this.unplaced = m ? e == 0 ? ce.empty : new ce(Xn(s.content, e - 1, 1), e - 1, p < 0 ? s.openEnd : e - 1) : new ce(Xn(s.content, e, a), s.openStart, s.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !li(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
      let { match: r, type: i } = this.frontier[t], o = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), s = li(e, t, i, r, o);
      if (s) {
        for (let l = t - 1; l >= 0; l--) {
          let { match: c, type: a } = this.frontier[l], u = li(e, l, a, c, !0);
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
    t.fit.childCount && (this.placed = Qn(this.placed, t.depth, t.fit)), e = t.move;
    for (let r = t.depth + 1; r <= e.depth; r++) {
      let i = e.node(r), o = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, o);
    }
    return e;
  }
  openFrontierNode(e, t = null, r) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = Qn(this.placed, this.depth, q.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(q.empty, !0);
    t.childCount && (this.placed = Qn(this.placed, this.frontier.length, t));
  }
}
function Xn(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(Xn(n.firstChild.content, e - 1, t)));
}
function Qn(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(Qn(n.lastChild.content, e - 1, t)));
}
function si(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function Ys(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, Ys(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(q.empty, !0)))), n.copy(r);
}
function li(n, e, t, r, i) {
  let o = n.node(e), s = i ? n.indexAfter(e) : n.index(e);
  if (s == o.childCount && !t.compatibleContent(o.type))
    return null;
  let l = r.fillBefore(o.content, !0, s);
  return l && !ru(t, o.content, s) ? l : null;
}
function ru(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function iu(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function ou(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let i = n.doc.resolve(e), o = n.doc.resolve(t);
  if (Vs(i, o, r))
    return n.step(new at(e, t, r));
  let s = Gs(i, o);
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
    let p = a[f], m = iu(p.type);
    if (m && !p.sameMarkup(i.node(Math.abs(l) - 1)))
      u = f;
    else if (m || !p.type.isTextblock)
      break;
  }
  for (let f = r.openStart; f >= 0; f--) {
    let p = (f + u + 1) % (r.openStart + 1), m = a[p];
    if (m)
      for (let g = 0; g < s.length; g++) {
        let b = s[(g + c) % s.length], x = !0;
        b < 0 && (x = !1, b = -b);
        let I = i.node(b - 1), N = i.index(b - 1);
        if (I.canReplaceWith(N, N, m.type, m.marks))
          return n.replace(i.before(b), x ? o.after(b) : t, new ce(Us(r.content, 0, r.openStart, p), p, r.openEnd));
      }
  }
  let d = n.steps.length;
  for (let f = s.length - 1; f >= 0 && (n.replace(e, t, r), !(n.steps.length > d)); f--) {
    let p = s[f];
    p < 0 || (e = i.before(p), t = o.after(p));
  }
}
function Us(n, e, t, r, i) {
  if (e < t) {
    let o = n.firstChild;
    n = n.replaceChild(0, o.copy(Us(o.content, e + 1, t, r, o)));
  }
  if (e > r) {
    let o = i.contentMatchAt(0), s = o.fillBefore(n).append(n);
    n = s.append(o.matchFragment(s).fillBefore(q.empty, !0));
  }
  return n;
}
function su(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = tu(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new ce(q.from(r), 0, 0));
}
function lu(n, e, t) {
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
  let o = Gs(r, i);
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
function Gs(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let o = n.start(i);
    if (o < n.pos - (n.depth - i) || e.end(i) > e.pos + (e.depth - i) || n.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (o == e.start(i) || i == n.depth && i == e.depth && n.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == o - 1) && t.push(i);
  }
  return t;
}
class Hn extends Nt {
  /**
  Construct an attribute step.
  */
  constructor(e, t, r) {
    super(), this.pos = e, this.attr = t, this.value = r;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return ut.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let o in t.attrs)
      r[o] = t.attrs[o];
    r[this.attr] = this.value;
    let i = t.type.create(r, null, t.marks);
    return ut.fromReplace(e, this.pos, this.pos + 1, new ce(q.from(i), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return $t.empty;
  }
  invert(e) {
    return new Hn(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Hn(t.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number" || typeof t.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new Hn(t.pos, t.attr, t.value);
  }
}
Nt.jsonID("attr", Hn);
class sr extends Nt {
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
    return ut.ok(r);
  }
  getMap() {
    return $t.empty;
  }
  invert(e) {
    return new sr(this.attr, e.attrs[this.attr]);
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
    return new sr(t.attr, t.value);
  }
}
Nt.jsonID("docAttr", sr);
let jn = class extends Error {
};
jn = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
jn.prototype = Object.create(Error.prototype);
jn.prototype.constructor = jn;
jn.prototype.name = "TransformError";
class cu {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new Or();
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
      throw new jn(t.failed);
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
  replace(e, t = e, r = ce.empty) {
    let i = Gr(this.doc, e, t, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, r) {
    return this.replace(e, t, new ce(q.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, t) {
    return this.replace(e, t, ce.empty);
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
    return ou(this, e, t, r), this;
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
    return su(this, e, t, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return lu(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return Ka(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return eu(this, e, t), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, t) {
    return Ya(this, e, t), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, t = e, r, i = null) {
    return Ua(this, e, t, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, r = null, i) {
    return Xa(this, e, t, r, i), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  The `pos` addresses the document content. Use `setDocAttribute`
  to set attributes on the document itself.
  */
  setNodeAttribute(e, t, r) {
    return this.step(new Hn(e, t, r)), this;
  }
  /**
  Set a single attribute on the document to a new value.
  */
  setDocAttribute(e, t) {
    return this.step(new sr(e, t)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(e, t) {
    return this.step(new an(e, t)), this;
  }
  /**
  Remove a mark (or all marks of the given type) from the node at
  position `pos`.
  */
  removeNodeMark(e, t) {
    let r = this.doc.nodeAt(e);
    if (!r)
      throw new RangeError("No node at position " + e);
    if (t instanceof Ke)
      t.isInSet(r.marks) && this.step(new Tn(e, t));
    else {
      let i = r.marks, o, s = [];
      for (; o = t.isInSet(i); )
        s.push(new Tn(e, o)), i = o.removeFromSet(i);
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
    return Qa(this, e, t, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, r) {
    return ja(this, e, t, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, r) {
    return Wa(this, e, t, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, t, r) {
    return _i(this, e, t, r), this;
  }
}
const ci = /* @__PURE__ */ Object.create(null);
class it {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, r) {
    this.$anchor = e, this.$head = t, this.ranges = r || [new au(e.min(t), e.max(t))];
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
  replace(e, t = ce.empty) {
    let r = t.content.lastChild, i = null;
    for (let l = 0; l < t.openEnd; l++)
      i = r, r = r.lastChild;
    let o = e.steps.length, s = this.ranges;
    for (let l = 0; l < s.length; l++) {
      let { $from: c, $to: a } = s[l], u = e.mapping.slice(o);
      e.replaceRange(u.map(c.pos), u.map(a.pos), l ? ce.empty : t), l == 0 && Co(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
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
      o ? e.deleteRange(a, u) : (e.replaceRangeWith(a, u, t), Co(e, r, t.isInline ? -1 : 1));
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
    let i = e.parent.inlineContent ? new Et(e) : Dn(e.node(0), e.parent, e.pos, e.index(), t, r);
    if (i)
      return i;
    for (let o = e.depth - 1; o >= 0; o--) {
      let s = t < 0 ? Dn(e.node(0), e.node(o), e.before(o + 1), e.index(o), t, r) : Dn(e.node(0), e.node(o), e.after(o + 1), e.index(o) + 1, t, r);
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
    return this.findFrom(e, t) || this.findFrom(e, -t) || new Kt(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return Dn(e, e, 0, 0, 1) || new Kt(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return Dn(e, e, e.content.size, e.childCount, -1) || new Kt(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = ci[t.type];
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
    if (e in ci)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return ci[e] = t, t.prototype.jsonID = e, t;
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
it.prototype.visible = !0;
class au {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let No = !1;
function To(n) {
  !No && !n.parent.inlineContent && (No = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class Et extends it {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    To(e), To(t), super(e, t);
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
      return it.near(r);
    let i = e.resolve(t.map(this.anchor));
    return new Et(i.parent.inlineContent ? i : r, r);
  }
  replace(e, t = ce.empty) {
    if (super.replace(e, t), t == ce.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof Et && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new Xr(this.anchor, this.head);
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
      let o = it.findFrom(t, r, !0) || it.findFrom(t, -r, !0);
      if (o)
        t = o.$head;
      else
        return it.near(t, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = t : (e = (it.findFrom(e, -r, !0) || it.findFrom(e, r, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new Et(e, t);
  }
}
it.jsonID("text", Et);
class Xr {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new Xr(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return Et.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class Je extends it {
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
    return r ? it.near(o) : new Je(o);
  }
  content() {
    return new ce(q.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof Je && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new ji(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new Je(e.resolve(t.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, t) {
    return new Je(e.resolve(t));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
Je.prototype.visible = !1;
it.jsonID("node", Je);
class ji {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new Xr(r, r) : new ji(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && Je.isSelectable(r) ? new Je(t) : it.near(t);
  }
}
class Kt extends it {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = ce.empty) {
    if (t == ce.empty) {
      e.delete(0, e.doc.content.size);
      let r = it.atStart(e.doc);
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
    return new Kt(e);
  }
  map(e) {
    return new Kt(e);
  }
  eq(e) {
    return e instanceof Kt;
  }
  getBookmark() {
    return uu;
  }
}
it.jsonID("all", Kt);
const uu = {
  map() {
    return this;
  },
  resolve(n) {
    return new Kt(n);
  }
};
function Dn(n, e, t, r, i, o = !1) {
  if (e.inlineContent)
    return Et.create(n, t);
  for (let s = r - (i > 0 ? 0 : 1); i > 0 ? s < e.childCount : s >= 0; s += i) {
    let l = e.child(s);
    if (l.isAtom) {
      if (!o && Je.isSelectable(l))
        return Je.create(n, t - (i < 0 ? l.nodeSize : 0));
    } else {
      let c = Dn(n, l, t + i, i < 0 ? l.childCount : 0, i, o);
      if (c)
        return c;
    }
    t += l.nodeSize * i;
  }
  return null;
}
function Co(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e)
    return;
  let i = n.steps[r];
  if (!(i instanceof at || i instanceof gt))
    return;
  let o = n.mapping.maps[r], s;
  o.forEach((l, c, a, u) => {
    s == null && (s = u);
  }), n.setSelection(it.near(n.doc.resolve(s), t));
}
function Eo(n, e) {
  return !e || !n ? n : n.bind(e);
}
class wr {
  constructor(e, t, r) {
    this.name = e, this.init = Eo(t.init, r), this.apply = Eo(t.apply, r);
  }
}
new wr("doc", {
  init(n) {
    return n.doc || n.schema.topNodeType.createAndFill();
  },
  apply(n) {
    return n.doc;
  }
}), new wr("selection", {
  init(n, e) {
    return n.selection || it.atStart(e.doc);
  },
  apply(n) {
    return n.selection;
  }
}), new wr("storedMarks", {
  init(n) {
    return n.storedMarks || null;
  },
  apply(n, e, t, r) {
    return r.selection.$cursor ? n.storedMarks : null;
  }
}), new wr("scrollToSelection", {
  init() {
    return 0;
  },
  apply(n, e) {
    return n.scrolledIntoView ? e + 1 : e;
  }
});
const Xs = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function Qs(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const Zs = (n, e, t) => {
  let r = Qs(n, t);
  if (!r)
    return !1;
  let i = Wi(r);
  if (!i) {
    let s = r.blockRange(), l = s && Jn(s);
    return l == null ? !1 : (e && e(n.tr.lift(s, l).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (cl(n, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (Wn(o, "end") || Je.isSelectable(o)))
    for (let s = r.depth; ; s--) {
      let l = Gr(n.doc, r.before(s), r.after(s), ce.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let c = n.tr.step(l);
          c.setSelection(Wn(o, "end") ? it.findFrom(c.doc.resolve(c.mapping.map(i.pos, -1)), -1) : Je.create(c.doc, i.pos - o.nodeSize)), e(c.scrollIntoView());
        }
        return !0;
      }
      if (s == 1 || r.node(s - 1).childCount > 1)
        break;
    }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos - o.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, du = (n, e, t) => {
  let r = Qs(n, t);
  if (!r)
    return !1;
  let i = Wi(r);
  return i ? el(n, i, e) : !1;
}, fu = (n, e, t) => {
  let r = nl(n, t);
  if (!r)
    return !1;
  let i = qi(r);
  return i ? el(n, i, e) : !1;
};
function el(n, e, t) {
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
  let a = Gr(n.doc, o, c, ce.empty);
  if (!a || a.from != o || a instanceof at && a.slice.size >= c - o)
    return !1;
  if (t) {
    let u = n.tr.step(a);
    u.setSelection(Et.create(u.doc, o)), t(u.scrollIntoView());
  }
  return !0;
}
function Wn(n, e, t = !1) {
  for (let r = n; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (t && r.childCount != 1)
      return !1;
  }
  return !1;
}
const tl = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    o = Wi(r);
  }
  let s = o && o.nodeBefore;
  return !s || !Je.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(Je.create(n.doc, o.pos - s.nodeSize)).scrollIntoView()), !0);
};
function Wi(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function nl(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const rl = (n, e, t) => {
  let r = nl(n, t);
  if (!r)
    return !1;
  let i = qi(r);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (cl(n, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (Wn(o, "start") || Je.isSelectable(o))) {
    let s = Gr(n.doc, r.before(), r.after(), ce.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let l = n.tr.step(s);
        l.setSelection(Wn(o, "start") ? it.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : Je.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos, i.pos + o.nodeSize).scrollIntoView()), !0) : !1;
}, il = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    o = qi(r);
  }
  let s = o && o.nodeAfter;
  return !s || !Je.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(Je.create(n.doc, o.pos)).scrollIntoView()), !0);
};
function qi(n) {
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
const hu = (n, e) => {
  let t = n.selection, r = t instanceof Je, i;
  if (r) {
    if (t.node.isTextblock || !Cn(n.doc, t.from))
      return !1;
    i = t.from;
  } else if (i = Ur(n.doc, t.from, -1), i == null)
    return !1;
  if (e) {
    let o = n.tr.join(i);
    r && o.setSelection(Je.create(o.doc, i - n.doc.resolve(i).nodeBefore.nodeSize)), e(o.scrollIntoView());
  }
  return !0;
}, pu = (n, e) => {
  let t = n.selection, r;
  if (t instanceof Je) {
    if (t.node.isTextblock || !Cn(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = Ur(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, mu = (n, e) => {
  let { $from: t, $to: r } = n.selection, i = t.blockRange(r), o = i && Jn(i);
  return o == null ? !1 : (e && e(n.tr.lift(i, o).scrollIntoView()), !0);
}, ol = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function Ki(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const gu = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(r))
    return !1;
  let i = t.node(-1), o = t.indexAfter(-1), s = Ki(i.contentMatchAt(o));
  if (!s || !i.canReplaceWith(o, o, s))
    return !1;
  if (e) {
    let l = t.after(), c = n.tr.replaceWith(l, l, s.createAndFill());
    c.setSelection(it.near(c.doc.resolve(l), 1)), e(c.scrollIntoView());
  }
  return !0;
}, sl = (n, e) => {
  let t = n.selection, { $from: r, $to: i } = t;
  if (t instanceof Kt || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = Ki(i.parent.contentMatchAt(i.indexAfter()));
  if (!o || !o.isTextblock)
    return !1;
  if (e) {
    let s = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = n.tr.insert(s, o.createAndFill());
    l.setSelection(Et.create(l.doc, s + 1)), e(l.scrollIntoView());
  }
  return !0;
}, ll = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let o = t.before();
    if (rn(n.doc, o))
      return e && e(n.tr.split(o).scrollIntoView()), !0;
  }
  let r = t.blockRange(), i = r && Jn(r);
  return i == null ? !1 : (e && e(n.tr.lift(r, i).scrollIntoView()), !0);
};
function yu(n) {
  return (e, t) => {
    if (e.selection instanceof Je && e.selection.node.isBlock) {
      let { $from: p } = e.selection;
      return !p.parentOffset || !rn(e.doc, p.pos) ? !1 : (t && t(e.tr.split(p.pos).scrollIntoView()), !0);
    }
    if (!e.selection.$from.depth)
      return !1;
    let r = e.tr;
    !e.selection.empty && (e.selection instanceof Et || e.selection instanceof Kt) && r.deleteSelection();
    let { $from: i } = r.selection, o = r.steps.length, s = [], l, c, a = !1, u = !1;
    for (let p = i.depth; ; p--)
      if (i.node(p).isBlock) {
        a = i.end(p) == i.pos + (i.depth - p), u = i.start(p) == i.pos - (i.depth - p), c = Ki(i.node(p - 1).contentMatchAt(i.indexAfter(p - 1))), s.unshift(a && c ? { type: c } : null), l = p;
        break;
      } else {
        if (p == 1)
          return !1;
        s.unshift(null);
      }
    let d = i.pos, f = rn(r.doc, d, s.length, s);
    if (f || (s[0] = c ? { type: c } : null, f = rn(r.doc, d, s.length, s)), !f)
      return !1;
    if (r.split(d, s.length, s), !a && u && i.node(l).type != c) {
      let p = r.mapping.slice(o), m = p.map(i.before(l)), g = r.doc.resolve(m);
      c && i.node(l - 1).canReplaceWith(g.index(), g.index() + 1, c) && r.setNodeMarkup(p.map(i.before(l)), c);
    }
    return t && t(r.scrollIntoView()), !0;
  };
}
const xu = yu(), bu = (n, e) => {
  let { $from: t, to: r } = n.selection, i, o = t.sharedDepth(r);
  return o == 0 ? !1 : (i = t.before(o), e && e(n.tr.setSelection(Je.create(n.doc, i))), !0);
};
function vu(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(o - 1, o) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || Cn(n.doc, e.pos)) ? !1 : (t && t(n.tr.join(e.pos).scrollIntoView()), !0);
}
function cl(n, e, t, r) {
  let i = e.nodeBefore, o = e.nodeAfter, s, l, c = i.type.spec.isolating || o.type.spec.isolating;
  if (!c && vu(n, e, t))
    return !0;
  let a = !c && e.parent.canReplace(e.index(), e.index() + 1);
  if (a && (s = (l = i.contentMatchAt(i.childCount)).findWrapping(o.type)) && l.matchType(s[0] || o.type).validEnd) {
    if (t) {
      let p = e.pos + o.nodeSize, m = q.empty;
      for (let x = s.length - 1; x >= 0; x--)
        m = q.from(s[x].create(null, m));
      m = q.from(i.copy(m));
      let g = n.tr.step(new gt(e.pos - 1, p, e.pos, p, new ce(m, 1, 0), s.length, !0)), b = g.doc.resolve(p + 2 * s.length);
      b.nodeAfter && b.nodeAfter.type == i.type && Cn(g.doc, b.pos) && g.join(b.pos), t(g.scrollIntoView());
    }
    return !0;
  }
  let u = o.type.spec.isolating || r > 0 && c ? null : it.findFrom(e, 1), d = u && u.$from.blockRange(u.$to), f = d && Jn(d);
  if (f != null && f >= e.depth)
    return t && t(n.tr.lift(d, f).scrollIntoView()), !0;
  if (a && Wn(o, "start", !0) && Wn(i, "end")) {
    let p = i, m = [];
    for (; m.push(p), !p.isTextblock; )
      p = p.lastChild;
    let g = o, b = 1;
    for (; !g.isTextblock; g = g.firstChild)
      b++;
    if (p.canReplace(p.childCount, p.childCount, g.content)) {
      if (t) {
        let x = q.empty;
        for (let N = m.length - 1; N >= 0; N--)
          x = q.from(m[N].copy(x));
        let I = n.tr.step(new gt(e.pos - m.length, e.pos + o.nodeSize, e.pos + b, e.pos + o.nodeSize - b, new ce(x, m.length, 0), 0, !0));
        t(I.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function al(n) {
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
const wu = al(-1), ku = al(1);
function Su(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o), l = s && Ws(s, n, e);
    return l ? (r && r(t.tr.wrap(s, l).scrollIntoView()), !0) : !1;
  };
}
function Mo(n, e = null) {
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
function Ji(...n) {
  return function(e, t, r) {
    for (let i = 0; i < n.length; i++)
      if (n[i](e, t, r))
        return !0;
    return !1;
  };
}
Ji(Xs, Zs, tl);
Ji(Xs, rl, il);
Ji(ol, sl, ll, xu);
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function Nu(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o);
    if (!s)
      return !1;
    let l = r ? t.tr : null;
    return Tu(l, s, n, e) ? (r && r(l.scrollIntoView()), !0) : !1;
  };
}
function Tu(n, e, t, r = null) {
  let i = !1, o = e, s = e.$from.doc;
  if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(t) && e.startIndex == 0) {
    if (e.$from.index(e.depth - 1) == 0)
      return !1;
    let c = s.resolve(e.start - 2);
    o = new Dr(c, c, e.depth), e.endIndex < e.parent.childCount && (e = new Dr(e.$from, s.resolve(e.$to.end(e.depth)), e.depth)), i = !0;
  }
  let l = Ws(o, t, r, e);
  return l ? (n && Cu(n, e, l, i, t), !0) : !1;
}
function Cu(n, e, t, r, i) {
  let o = q.empty;
  for (let u = t.length - 1; u >= 0; u--)
    o = q.from(t[u].type.create(t[u].attrs, o));
  n.step(new gt(e.start - (r ? 2 : 0), e.end, e.start, e.end, new ce(o, 0, 0), t.length, !0));
  let s = 0;
  for (let u = 0; u < t.length; u++)
    t[u].type == i && (s = u + 1);
  let l = t.length - s, c = e.start + t.length - (r ? 2 : 0), a = e.parent;
  for (let u = e.startIndex, d = e.endIndex, f = !0; u < d; u++, f = !1)
    !f && rn(n.doc, c, l) && (n.split(c, l), c += 2 * l), c += a.child(u).nodeSize;
  return n;
}
function Eu(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (s) => s.childCount > 0 && s.firstChild.type == n);
    return o ? t ? r.node(o.depth - 1).type == n ? Mu(e, t, n, o) : Ru(e, t, o) : !0 : !1;
  };
}
function Mu(n, e, t, r) {
  let i = n.tr, o = r.end, s = r.$to.end(r.depth);
  o < s && (i.step(new gt(o - 1, s, o, s, new ce(q.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new Dr(i.doc.resolve(r.$from.pos), i.doc.resolve(s), r.depth));
  const l = Jn(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let c = i.doc.resolve(i.mapping.map(o, -1) - 1);
  return Cn(i.doc, c.pos) && c.nodeBefore.type == c.nodeAfter.type && i.join(c.pos), e(i.scrollIntoView()), !0;
}
function Ru(n, e, t) {
  let r = n.tr, i = t.parent;
  for (let p = t.end, m = t.endIndex - 1, g = t.startIndex; m > g; m--)
    p -= i.child(m).nodeSize, r.delete(p - 1, p + 1);
  let o = r.doc.resolve(t.start), s = o.nodeAfter;
  if (r.mapping.map(t.end) != t.start + o.nodeAfter.nodeSize)
    return !1;
  let l = t.startIndex == 0, c = t.endIndex == i.childCount, a = o.node(-1), u = o.index(-1);
  if (!a.canReplace(u + (l ? 0 : 1), u + 1, s.content.append(c ? q.empty : q.from(i))))
    return !1;
  let d = o.pos, f = d + s.nodeSize;
  return r.step(new gt(d - (l ? 1 : 0), f + (c ? 1 : 0), d + 1, f - 1, new ce((l ? q.empty : q.from(i.copy(q.empty))).append(c ? q.empty : q.from(i.copy(q.empty))), l ? 0 : 1, c ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function Au(n) {
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
      let a = c.lastChild && c.lastChild.type == l.type, u = q.from(a ? n.create() : null), d = new ce(q.from(n.create(null, q.from(l.type.create(null, u)))), a ? 3 : 1, 0), f = o.start, p = o.end;
      t(e.tr.step(new gt(f - (a ? 3 : 1), p, f, p, d, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function ul(n) {
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
var Iu = class dl {
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
        const b = this.buildProps(a, t), x = p(...g)(b);
        return l.push(x), d;
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
    const e = dl.createFakeChain();
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
      state: ul({
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
const $u = () => ({ editor: n, view: e }) => (requestAnimationFrame(() => {
  if (!n.isDestroyed) {
    var t;
    e.dom.blur(), (t = window) === null || t === void 0 || (t = t.getSelection()) === null || t === void 0 || t.removeAllRanges();
  }
}), !0), zu = (n = !0) => ({ commands: e }) => e.setContent("", { emitUpdate: n }), Du = () => ({ state: n, tr: e, dispatch: t }) => {
  const { selection: r } = e, { ranges: i } = r;
  return t && i.forEach(({ $from: o, $to: s }) => {
    n.doc.nodesBetween(o.pos, s.pos, (l, c) => {
      if (l.type.isText) return;
      const { doc: a, mapping: u } = e, d = a.resolve(u.map(c)), f = a.resolve(u.map(c + l.nodeSize)), p = d.blockRange(f);
      if (!p) return;
      const m = Jn(p);
      if (l.type.isTextblock) {
        const { defaultType: g } = d.parent.contentMatchAt(d.index());
        e.setNodeMarkup(p.start, g);
      }
      (m || m === 0) && e.lift(p, m);
    });
  }), !0;
}, Pu = (n) => (e) => n(e), Lu = () => ({ state: n, dispatch: e }) => sl(n, e), Ou = (n, e) => ({ editor: t, tr: r }) => {
  const { state: i } = t, o = i.doc.slice(n.from, n.to);
  r.deleteRange(n.from, n.to);
  const s = r.mapping.map(e);
  return r.insert(s, o.content), r.setSelection(new Ot(r.doc.resolve(Math.max(s - 1, 0)))), !0;
}, Bu = () => ({ tr: n, dispatch: e }) => {
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
function St(n, e) {
  if (typeof n == "string") {
    if (!e.nodes[n]) throw Error(`There is no node type named '${n}'. Maybe you forgot to add the extension?`);
    return e.nodes[n];
  }
  return n;
}
const Fu = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const i = St(n, t.schema), o = e.selection.$anchor;
  for (let s = o.depth; s > 0; s -= 1) if (o.node(s).type === i) {
    if (r) {
      const l = o.before(s), c = o.after(s);
      e.delete(l, c).scrollIntoView();
    }
    return !0;
  }
  return !1;
}, Hu = (n) => ({ tr: e, dispatch: t }) => {
  const { from: r, to: i } = n;
  return t && e.delete(r, i), !0;
}, _u = (n) => n.content ? /^text(\*|\+)/.test(n.content) : !1, Ro = (n, e, t) => {
  if (!n.parent.isInline || t === "left" && n.pos > n.start() || t === "right" && n.pos < n.end()) return n.pos;
  const r = e.nodes[n.parent.type.name].spec;
  return _u(r) ? t === "left" ? n.start() - 1 : n.end() + 1 : n.pos;
}, ju = (n, e, t) => ({
  from: Ro(n, t, "left"),
  to: Ro(e, t, "right")
}), Wu = () => ({ state: n, dispatch: e }) => {
  if (n.selection.empty) return !1;
  if (e) {
    const t = n.tr, { ranges: r } = n.selection, i = t.steps.length;
    r.forEach((o) => {
      const s = t.mapping.slice(i), l = t.doc.resolve(s.map(o.$from.pos)), c = t.doc.resolve(s.map(o.$to.pos)), { from: a, to: u } = ju(l, c, n.schema);
      t.deleteRange(a, u);
    }), t.selection.empty || t.setSelection(Ot.near(t.doc.resolve(t.selection.from))), t.scrollIntoView(), e(t);
  }
  return !0;
}, qu = () => ({ commands: n }) => n.keyboardShortcut("Enter"), Ku = () => ({ state: n, dispatch: e }) => gu(n, e);
function Ju(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
function Br(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => t.strict ? e[i] === n[i] : Ju(e[i]) ? e[i].test(n[i]) : e[i] === n[i]) : !0;
}
function fl(n, e, t = {}) {
  return n.find((r) => r.type === e && Br(Object.fromEntries(Object.keys(t).map((i) => [i, r.attrs[i]])), t));
}
function Ao(n, e, t = {}) {
  return !!fl(n, e, t);
}
function hl(n, e, t) {
  if (!n || !e) return;
  let r = n.parent.childAfter(n.parentOffset);
  if ((!r.node || !r.node.marks.some((c) => c.type === e)) && (r = n.parent.childBefore(n.parentOffset)), !r.node || !r.node.marks.some((c) => c.type === e)) return;
  if (!t) {
    const c = r.node.marks.find((a) => a.type === e);
    c && (t = c.attrs);
  }
  if (!fl([...r.node.marks], e, t)) return;
  let i = r.index, o = n.start() + r.offset, s = i + 1, l = o + r.node.nodeSize;
  for (; i > 0 && Ao([...n.parent.child(i - 1).marks], e, t); )
    i -= 1, o -= n.parent.child(i).nodeSize;
  for (; s < n.parent.childCount && Ao([...n.parent.child(s).marks], e, t); )
    l += n.parent.child(s).nodeSize, s += 1;
  return {
    from: o,
    to: l
  };
}
function pn(n, e) {
  if (typeof n == "string") {
    if (!e.marks[n]) throw Error(`There is no mark type named '${n}'. Maybe you forgot to add the extension?`);
    return e.marks[n];
  }
  return n;
}
const Vu = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const o = pn(n, r.schema), { doc: s, selection: l } = t, { $from: c, from: a, to: u } = l;
  if (i) {
    const d = hl(c, o, e);
    if (d && d.from <= a && d.to >= u) {
      const f = Ot.create(s, d.from, d.to);
      t.setSelection(f);
    }
  }
  return !0;
}, Yu = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let r = 0; r < t.length; r += 1) if (t[r](e)) return !0;
  return !1;
};
function pl(n) {
  return n instanceof Ot;
}
function bn(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function Uu(n, e = null) {
  if (!e) return null;
  const t = On.atStart(n), r = On.atEnd(n);
  if (e === "start" || e === !0) return t;
  if (e === "end") return r;
  const i = t.from, o = r.to;
  return e === "all" ? Ot.create(n, bn(0, i, o), bn(n.content.size, i, o)) : Ot.create(n, bn(e, i, o), bn(e, i, o));
}
function Io() {
  return ["Android"].includes(navigator.platform) || /android/i.test(navigator.userAgent);
}
function Fr() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
function Gu() {
  return typeof navigator < "u" ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : !1;
}
const Xu = (n = null, e = {}) => ({ editor: t, view: r, tr: i, dispatch: o }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const s = () => {
    (Fr() || Io()) && r.dom.focus(), Gu() && !Fr() && !Io() && r.dom.focus({ preventScroll: !0 }), requestAnimationFrame(() => {
      t.isDestroyed || (r.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  try {
    if (r.hasFocus() && n === null || n === !1) return !0;
  } catch {
    return !1;
  }
  if (o && n === null && !pl(t.state.selection))
    return s(), !0;
  const l = Uu(i.doc, n) || t.state.selection, c = t.state.selection.eq(l);
  return o && (c || i.setSelection(l), c && i.storedMarks && i.setStoredMarks(i.storedMarks), s()), !0;
}, Qu = (n, e) => (t) => n.every((r, i) => e(r, {
  ...t,
  index: i
})), Zu = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt({
  from: t.selection.from,
  to: t.selection.to
}, n, e), ml = (n) => {
  const e = n.childNodes;
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const r = e[t];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? n.removeChild(r) : r.nodeType === 1 && ml(r);
  }
  return n;
};
function kr(n) {
  if (typeof window > "u") throw new Error("[tiptap error]: there is no window object available, so this function cannot be used");
  const e = `<body>${n}</body>`, t = new window.DOMParser().parseFromString(e, "text/html").body;
  return ml(t);
}
function gl(n) {
  return typeof (n == null ? void 0 : n.nodesBetween) == "function";
}
function qn(n, e, t) {
  if (gl(n)) return n;
  const r = typeof n == "object" && n !== null;
  t = {
    slice: !0,
    parseOptions: {},
    ...t
  };
  const i = typeof n == "string";
  if (r) try {
    if (Array.isArray(n) && n.length > 0) return q.fromArray(n.map((s) => e.nodeFromJSON(s)));
    const o = e.nodeFromJSON(n);
    return t.errorOnInvalidContent && o.check(), o;
  } catch (o) {
    if (t.errorOnInvalidContent) throw new Error("[tiptap error]: Invalid JSON content", { cause: o });
    return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", o), qn("", e, t);
  }
  if (i) {
    if (t.errorOnInvalidContent) {
      let s = !1, l = "";
      const c = new Da({
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
      if (t.slice ? Fn.fromSchema(c).parseSlice(kr(n), t.parseOptions) : Fn.fromSchema(c).parse(kr(n), t.parseOptions), t.errorOnInvalidContent && s) throw new Error("[tiptap error]: Invalid HTML content", { cause: /* @__PURE__ */ new Error(`Invalid element found: ${l}`) });
    }
    const o = Fn.fromSchema(e);
    return t.slice ? o.parseSlice(kr(n), t.parseOptions).content : o.parse(kr(n), t.parseOptions);
  }
  return qn("", e, t);
}
function yl(n) {
  return !("type" in n);
}
function xl(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e) return;
  const i = n.steps[r];
  if (!(i instanceof at || i instanceof gt)) return;
  const o = n.mapping.maps[r];
  let s = 0;
  o.forEach((l, c, a, u) => {
    s === 0 && (s = u);
  }), n.setSelection(On.near(n.doc.resolve(s), t));
}
const ed = (n, e, t) => ({ tr: r, dispatch: i, editor: o }) => {
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
      qn(e, o.schema, {
        parseOptions: a,
        errorOnInvalidContent: !0
      });
    } catch (b) {
      c(b);
    }
    try {
      var s;
      l = qn(e, o.schema, {
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
    const m = yl(l) ? l.content : [l];
    if (m.forEach((b) => {
      b.check(), f = f ? b.isText && b.marks.length === 0 : !1, p = p ? b.isBlock : !1;
    }), u === d && p) {
      const { parent: b } = r.doc.resolve(u);
      b.isTextblock && !b.type.spec.code && !b.childCount && (u -= 1, d += 1);
    }
    let g;
    if (f)
      Array.isArray(e) ? g = e.map((b) => b.text || "").join("") : gl(e) ? g = m.map((b) => {
        var x;
        return (x = b.text) !== null && x !== void 0 ? x : "";
      }).join("") : typeof e == "object" && e && e.text ? g = e.text : g = e, r.insertText(g, u, d);
    else {
      g = q.from(m);
      const b = r.doc.resolve(u), x = b.node(), I = b.parentOffset === 0, N = x.isText || x.isTextblock, T = x.content.size > 0;
      I && N && T && p && (u = Math.max(0, u - 1)), r.replaceWith(u, d, m);
    }
    t.updateSelection && xl(r, r.steps.length - 1, -1), t.applyInputRules && r.setMeta("applyInputRules", {
      from: u,
      text: g
    }), t.applyPasteRules && r.setMeta("applyPasteRules", {
      from: u,
      text: g
    });
  }
  return !0;
};
function bl(n) {
  for (let e = 0; e < n.edgeCount; e += 1) {
    const { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs()) return t;
  }
  return null;
}
const td = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
  const { pos: i, attrs: o, content: s, updateSelection: l = !0 } = n;
  let c;
  typeof i == "number" ? c = e.doc.resolve(i) : i ? c = i : c = e.selection.$from;
  const a = bl(c.parent.contentMatchAt(c.index()));
  if (!a) return !1;
  const u = Object.keys(a.spec.attrs || {}), d = o ? Object.fromEntries(Object.entries(o).filter(([p]) => u.includes(p))) : {};
  let f;
  if (s) {
    const p = qn(s, r.schema);
    f = a.createAndFill(d, p);
  } else f = a.createAndFill(d);
  return f ? (t && (e.insert(c.pos, f), l && xl(e, e.steps.length - 1, -1)), !0) : !1;
}, nd = () => ({ state: n, dispatch: e }) => hu(n, e), rd = () => ({ state: n, dispatch: e }) => pu(n, e), id = () => ({ state: n, dispatch: e }) => Zs(n, e), od = () => ({ state: n, dispatch: e }) => rl(n, e), sd = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = Ur(n.doc, n.selection.$from.pos, -1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, ld = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = Ur(n.doc, n.selection.$from.pos, 1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, cd = () => ({ state: n, dispatch: e }) => du(n, e), ad = () => ({ state: n, dispatch: e }) => fu(n, e);
function vl() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function ud(n) {
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
      Fr() || vl() ? s = !0 : i = !0;
    else throw new Error(`Unrecognized modifier name: ${c}`);
  }
  return r && (t = `Alt-${t}`), i && (t = `Ctrl-${t}`), s && (t = `Meta-${t}`), o && (t = `Shift-${t}`), t;
}
const dd = (n) => ({ editor: e, view: t, tr: r, dispatch: i }) => {
  const o = ud(n).split(/-(?!$)/), s = o.find((a) => ![
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
function Vi(n, e, t = {}) {
  const { from: r, to: i, empty: o } = n.selection, s = e ? St(e, n.schema) : null, l = [];
  n.doc.nodesBetween(r, i, (u, d) => {
    if (u.isText) return;
    const f = Math.max(r, d), p = Math.min(i, d + u.nodeSize);
    l.push({
      node: u,
      from: f,
      to: p
    });
  });
  const c = i - r, a = l.filter((u) => s ? s.name === u.node.type.name : !0).filter((u) => Br(u.node.attrs, t, { strict: !1 }));
  return o ? !!a.length : a.reduce((u, d) => u + d.to - d.from, 0) >= c;
}
const fd = (n, e = {}) => ({ state: t, dispatch: r }) => Vi(t, St(n, t.schema), e) ? mu(t, r) : !1, hd = () => ({ state: n, dispatch: e }) => ll(n, e), pd = (n) => ({ state: e, dispatch: t }) => {
  const r = St(n, e.schema);
  return Eu(r)(e, t);
}, md = () => ({ state: n, dispatch: e }) => ol(n, e);
function wl(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function $o(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((r, i) => (t.includes(i) || (r[i] = n[i]), r), {});
}
const gd = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = wl(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = St(n, r.schema)), l === "mark" && (s = pn(n, r.schema));
  let c = !1;
  return t.selection.ranges.forEach((a) => {
    r.doc.nodesBetween(a.$from.pos, a.$to.pos, (u, d) => {
      o && o === u.type && (c = !0, i && t.setNodeMarkup(d, void 0, $o(u.attrs, e))), s && u.marks.length && u.marks.forEach((f) => {
        s === f.type && (c = !0, i && t.addMark(d, d + u.nodeSize, s.create($o(f.attrs, e))));
      });
    });
  }), c;
}, yd = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), xd = () => ({ tr: n, dispatch: e }) => {
  if (e) {
    const t = new nc(n.doc);
    n.setSelection(t);
  }
  return !0;
}, bd = () => ({ state: n, dispatch: e }) => tl(n, e), vd = () => ({ state: n, dispatch: e }) => il(n, e), wd = () => ({ state: n, dispatch: e }) => bu(n, e), kd = () => ({ state: n, dispatch: e }) => ku(n, e), Sd = () => ({ state: n, dispatch: e }) => wu(n, e);
function Nd(n, e, t = {}, r = {}) {
  return qn(n, e, {
    slice: !1,
    parseOptions: t,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
const Td = (n, { errorOnInvalidContent: e, emitUpdate: t = !0, parseOptions: r = {} } = {}) => ({ editor: i, tr: o, dispatch: s, commands: l }) => {
  const { doc: c } = o;
  if (r.preserveWhitespace !== "full") {
    const a = Nd(n, i.schema, r, { errorOnInvalidContent: e ?? i.options.enableContentCheck });
    if (s) {
      const u = yl(a) ? a.content : [a];
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
function Cd(n, e) {
  const t = pn(e, n.schema), { from: r, to: i, empty: o } = n.selection, s = [];
  o ? (n.storedMarks && s.push(...n.storedMarks), s.push(...n.selection.$head.marks())) : n.doc.nodesBetween(r, i, (c) => {
    s.push(...c.marks);
  });
  const l = s.find((c) => c.type.name === t.name);
  return l ? { ...l.attrs } : {};
}
function Ed(n, e) {
  const t = new cu(n);
  return e.forEach((r) => {
    r.steps.forEach((i) => {
      t.step(i);
    });
  }), t;
}
function Md(n, e) {
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
function Yi(n) {
  return (e) => Md(e.$from, n);
}
function lr(n, e, t) {
  return n.config[e] === void 0 && n.parent ? lr(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? lr(n.parent, e, t) : null
  }) : n.config[e];
}
function Rd(n) {
  return typeof n == "function";
}
function ki(n, e = void 0, ...t) {
  return Rd(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function kl(n) {
  return {
    baseExtensions: n.filter((e) => e.type === "extension"),
    nodeExtensions: n.filter((e) => e.type === "node"),
    markExtensions: n.filter((e) => e.type === "mark")
  };
}
function Ad(n, e, t) {
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
function Id(n) {
  return Object.fromEntries(Object.entries(n.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
function $d(n, e = JSON.stringify) {
  const t = {};
  return n.filter((r) => {
    const i = e(r);
    return Object.prototype.hasOwnProperty.call(t, i) ? !1 : t[i] = !0;
  });
}
function zd(n) {
  const e = $d(n);
  return e.length === 1 ? e : e.filter((t, r) => !e.filter((i, o) => o !== r).some((i) => t.oldRange.from >= i.oldRange.from && t.oldRange.to <= i.oldRange.to && t.newRange.from >= i.newRange.from && t.newRange.to <= i.newRange.to));
}
function Dd(n) {
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
  }), zd(r);
}
function Cr(n, e, t) {
  return Object.fromEntries(Object.entries(t).filter(([r]) => {
    const i = n.find((o) => o.type === e && o.name === r);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function Pd(n, e, t = {}) {
  const { empty: r, ranges: i } = n.selection, o = e ? pn(e, n.schema) : null;
  if (r) return !!(n.storedMarks || n.selection.$from.marks()).filter((u) => o ? o.name === u.type.name : !0).find((u) => Br(u.attrs, t, { strict: !1 }));
  let s = 0;
  const l = [];
  if (i.forEach(({ $from: u, $to: d }) => {
    const f = u.pos, p = d.pos;
    n.doc.nodesBetween(f, p, (m, g) => {
      if (o && m.inlineContent && !m.type.allowsMarkType(o)) return !1;
      if (!m.isText && !m.marks.length) return;
      const b = Math.max(f, g), x = Math.min(p, g + m.nodeSize), I = x - b;
      s += I, l.push(...m.marks.map((N) => ({
        mark: N,
        from: b,
        to: x
      })));
    });
  }), s === 0) return !1;
  const c = l.filter((u) => o ? o.name === u.mark.type.name : !0).filter((u) => Br(u.mark.attrs, t, { strict: !1 })).reduce((u, d) => u + d.to - d.from, 0), a = l.filter((u) => o ? u.mark.type !== o && u.mark.type.excludes(o) : !0).reduce((u, d) => u + d.to - d.from, 0);
  return (c > 0 ? c + a : c) >= s;
}
function ai(n, e) {
  const { nodeExtensions: t } = kl(e), r = t.find((o) => o.name === n);
  if (!r) return !1;
  const i = ki(lr(r, "group", {
    name: r.name,
    options: r.options,
    storage: r.storage
  }));
  return typeof i != "string" ? !1 : i.split(" ").includes("list");
}
function Sl(n, { checkChildren: e = !0, ignoreWhitespace: t = !1 } = {}) {
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
      i !== !1 && (Sl(o, {
        ignoreWhitespace: t,
        checkChildren: e
      }) || (i = !1));
    }), i;
  }
  return !1;
}
function Ld(n, e, t) {
  const { selection: r } = e;
  let i = null;
  if (pl(r) && (i = r.$cursor), i) {
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
const Od = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = t, { empty: s, ranges: l } = o, c = pn(n, r.schema);
  if (i)
    if (s) {
      const a = Cd(r, c);
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
  return Ld(r, t, c);
}, Bd = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), Fd = (n, e = {}) => ({ state: t, dispatch: r, chain: i }) => {
  const o = St(n, t.schema);
  let s;
  return t.selection.$anchor.sameParent(t.selection.$head) && (s = t.selection.$anchor.parent.attrs), o.isTextblock ? i().command(({ commands: l }) => Mo(o, {
    ...s,
    ...e
  })(t) ? !0 : l.clearNodes()).command(({ state: l }) => Mo(o, {
    ...s,
    ...e
  })(l, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, Hd = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, i = bn(n, 0, r.content.size), o = _n.create(r, i);
    e.setSelection(o);
  }
  return !0;
}, _d = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = r;
  let s, l;
  return typeof e == "number" ? (s = e, l = e) : e && "from" in e && "to" in e ? (s = e.from, l = e.to) : (s = o.from, l = o.to), i && t.doc.nodesBetween(s, l, (c, a) => {
    c.isText || t.setNodeMarkup(a, void 0, {
      ...c.attrs,
      dir: n
    });
  }), !0;
}, jd = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, { from: i, to: o } = typeof n == "number" ? {
      from: n,
      to: n
    } : n, s = Ot.atStart(r).from, l = Ot.atEnd(r).to, c = bn(i, s, l), a = bn(o, s, l), u = Ot.create(r, c, a);
    e.setSelection(u);
  }
  return !0;
}, Wd = (n) => ({ state: e, dispatch: t }) => {
  const r = St(n, e.schema);
  return Au(r)(e, t);
};
function zo(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    n.tr.ensureMarks(r);
  }
}
const qd = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
  const { selection: o, doc: s } = e, { $from: l, $to: c } = o, a = i.extensionManager.attributes, u = Cr(a, l.node().type.name, l.node().attrs);
  if (o instanceof _n && o.node.isBlock)
    return !l.parentOffset || !rn(s, l.pos) ? !1 : (r && (n && zo(t, i.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock) return !1;
  const d = c.parentOffset === c.parent.content.size, f = l.depth === 0 ? void 0 : bl(l.node(-1).contentMatchAt(l.indexAfter(-1)));
  let p = d && f ? [{
    type: f,
    attrs: u
  }] : void 0, m = rn(e.doc, e.mapping.map(l.pos), 1, p);
  if (!p && !m && rn(e.doc, e.mapping.map(l.pos), 1, f ? [{ type: f }] : void 0) && (m = !0, p = f ? [{
    type: f,
    attrs: u
  }] : void 0), r) {
    if (m && (o instanceof Ot && e.deleteSelection(), e.split(e.mapping.map(l.pos), 1, p), f && !d && !l.parentOffset && l.parent.type !== f)) {
      const g = e.mapping.map(l.before()), b = e.doc.resolve(g);
      l.node(-1).canReplaceWith(b.index(), b.index() + 1, f) && e.setNodeMarkup(e.mapping.map(l.before()), f);
    }
    n && zo(t, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return m;
}, Kd = (n, e = {}) => ({ tr: t, state: r, dispatch: i, editor: o }) => {
  const s = St(n, r.schema), { $from: l, $to: c } = r.selection, a = r.selection.node;
  if (a && a.isBlock || l.depth < 2 || !l.sameParent(c)) return !1;
  const u = l.node(-1);
  if (u.type !== s) return !1;
  const d = o.extensionManager.attributes;
  if (l.parent.content.size === 0 && l.node(-1).childCount === l.indexAfter(-1)) {
    if (l.depth === 2 || l.node(-3).type !== s || l.index(-2) !== l.node(-2).childCount - 1) return !1;
    if (i) {
      var f;
      let x = q.empty;
      const I = l.index(-1) ? 1 : l.index(-2) ? 2 : 3;
      for (let O = l.depth - I; O >= l.depth - 3; O -= 1) x = q.from(l.node(O).copy(x));
      const N = l.indexAfter(-1) < l.node(-2).childCount ? 1 : l.indexAfter(-2) < l.node(-3).childCount ? 2 : 3, T = {
        ...Cr(d, l.node().type.name, l.node().attrs),
        ...e
      }, w = ((f = s.contentMatch.defaultType) === null || f === void 0 ? void 0 : f.createAndFill(T)) || void 0;
      x = x.append(q.from(s.createAndFill(null, w) || void 0));
      const R = l.before(l.depth - (I - 1));
      t.replace(R, l.after(-N), new ce(x, 4 - I, 0));
      let J = -1;
      t.doc.nodesBetween(R, t.doc.content.size, (O, A) => {
        if (J > -1) return !1;
        O.isTextblock && O.content.size === 0 && (J = A + 1);
      }), J > -1 && t.setSelection(Ot.near(t.doc.resolve(J))), t.scrollIntoView();
    }
    return !0;
  }
  const p = c.pos === l.end() ? u.contentMatchAt(0).defaultType : null, m = {
    ...Cr(d, u.type.name, u.attrs),
    ...e
  }, g = {
    ...Cr(d, l.node().type.name, l.node().attrs),
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
  if (!rn(t.doc, l.pos, 2)) return !1;
  if (i) {
    const { selection: x, storedMarks: I } = r, { splittableMarks: N } = o.extensionManager, T = I || x.$to.parentOffset && x.$from.marks();
    if (t.split(l.pos, 2, b).scrollIntoView(), !T || !i) return !0;
    const w = T.filter((R) => N.includes(R.type.name));
    t.ensureMarks(w);
  }
  return !0;
};
function Do(n) {
  return !n || n === "1" ? null : n;
}
function Nl(n, e) {
  return Do(n) === Do(e);
}
const ui = (n, e) => {
  const t = Yi((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && Cn(n.doc, t.pos)) || !Nl(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(t.pos), !0;
}, di = (n, e) => {
  const t = Yi((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && Cn(n.doc, r)) || !Nl(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(r), !0;
};
function Jd(n) {
  const e = n.doc, t = e.firstChild;
  if (!t) return null;
  const r = e.resolve(1), i = e.resolve(t.nodeSize - 1);
  return Ot.between(r, i);
}
const Vd = (n, e, t, r = {}) => ({ editor: i, tr: o, state: s, dispatch: l, chain: c, commands: a, can: u }) => {
  const { extensions: d, splittableMarks: f } = i.extensionManager, p = St(n, s.schema), m = St(e, s.schema), { selection: g, storedMarks: b } = s, { $from: x, $to: I } = g, N = x.blockRange(I), T = b || g.$to.parentOffset && g.$from.marks();
  if (!N) return !1;
  const w = Yi((H) => ai(H.type.name, d))(g), R = g.from === 0 && g.to === s.doc.content.size, J = s.doc.content.content, O = J.length === 1 ? J[0] : null, A = R && O && ai(O.type.name, d) ? {
    node: O,
    pos: 0
  } : null, K = w ?? A, S = !!w && N.depth >= 1 && N.depth - w.depth <= 1, $ = !!A;
  if ((S || $) && K) {
    if (K.node.type === p)
      return R && $ ? c().command(({ tr: H, dispatch: _ }) => {
        const X = Jd(H);
        return X ? (H.setSelection(X), _ && _(H), !0) : !1;
      }).liftListItem(m).run() : a.liftListItem(m);
    if (ai(K.node.type.name, d) && p.validContent(K.node.content)) return c().command(() => (o.setNodeMarkup(K.pos, p), !0)).command(() => ui(o, p)).command(() => di(o, p)).run();
  }
  return !t || !T || !l ? c().command(() => u().wrapInList(p, r) ? !0 : a.clearNodes()).wrapInList(p, r).command(() => ui(o, p)).command(() => di(o, p)).run() : c().command(() => {
    const H = u().wrapInList(p, r), _ = T.filter((X) => f.includes(X.type.name));
    return o.ensureMarks(_), H ? !0 : a.clearNodes();
  }).wrapInList(p, r).command(() => ui(o, p)).command(() => di(o, p)).run();
}, Yd = (n, e = {}, t = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: o = !1 } = t, s = pn(n, r.schema);
  return Pd(r, s, e) ? i.unsetMark(s, { extendEmptyMarkRange: o }) : i.setMark(s, e);
}, Ud = (n, e, t = {}) => ({ state: r, commands: i }) => {
  const o = St(n, r.schema), s = St(e, r.schema), l = Vi(r, o, t);
  let c;
  return r.selection.$anchor.sameParent(r.selection.$head) && (c = r.selection.$anchor.parent.attrs), l ? i.setNode(s, c) : i.setNode(o, {
    ...c,
    ...t
  });
}, Gd = (n, e = {}) => ({ state: t, commands: r }) => {
  const i = St(n, t.schema);
  return Vi(t, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, Xd = () => ({ state: n, dispatch: e }) => {
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
}, Qd = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
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
}, Zd = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { extendEmptyMarkRange: o = !1 } = e, { selection: s } = t, l = pn(n, r.schema), { $from: c, empty: a, ranges: u } = s;
  if (!i) return !0;
  if (a && o) {
    var d;
    let { from: f, to: p } = s;
    const m = hl(c, l, (d = c.marks().find((g) => g.type === l)) === null || d === void 0 ? void 0 : d.attrs);
    m && (f = m.from, p = m.to), t.removeMark(f, p, l);
  } else u.forEach((f) => {
    t.removeMark(f.$from.pos, f.$to.pos, l);
  });
  return t.removeStoredMark(l), !0;
}, ef = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const { selection: i } = t;
  let o, s;
  return typeof n == "number" ? (o = n, s = n) : n && "from" in n && "to" in n ? (o = n.from, s = n.to) : (o = i.from, s = i.to), r && e.doc.nodesBetween(o, s, (l, c) => {
    if (l.isText) return;
    const a = { ...l.attrs };
    delete a.dir, e.setNodeMarkup(c, void 0, a);
  }), !0;
}, tf = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = wl(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = St(n, r.schema)), l === "mark" && (s = pn(n, r.schema));
  let c = !1;
  return t.selection.ranges.forEach((a) => {
    const u = a.$from.pos, d = a.$to.pos;
    let f, p, m, g;
    t.selection.empty ? r.doc.nodesBetween(u, d, (b, x) => {
      o && o === b.type && (c = !0, m = Math.max(x, u), g = Math.min(x + b.nodeSize, d), f = x, p = b);
    }) : r.doc.nodesBetween(u, d, (b, x) => {
      x < u && o && o === b.type && (c = !0, m = Math.max(x, u), g = Math.min(x + b.nodeSize, d), f = x, p = b), x >= u && x <= d && (o && o === b.type && (c = !0, i && t.setNodeMarkup(x, void 0, {
        ...b.attrs,
        ...e
      })), s && b.marks.length && b.marks.forEach((I) => {
        if (s === I.type && (c = !0, i)) {
          const N = Math.max(x, u), T = Math.min(x + b.nodeSize, d);
          t.addMark(N, T, s.create({
            ...I.attrs,
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
}, nf = new Jt("__tiptap_decorations__"), rf = (n) => ({ tr: e, dispatch: t }) => (t && e.setMeta(nf, {
  type: "force",
  name: n
}), !0), of = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = St(n, t.schema);
  return Su(i, e)(t, r);
}, sf = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = St(n, t.schema);
  return Nu(i, e)(t, r);
};
var lf = /* @__PURE__ */ ya({
  blur: () => $u,
  clearContent: () => zu,
  clearNodes: () => Du,
  command: () => Pu,
  createParagraphNear: () => Lu,
  cut: () => Ou,
  deleteCurrentNode: () => Bu,
  deleteNode: () => Fu,
  deleteRange: () => Hu,
  deleteSelection: () => Wu,
  enter: () => qu,
  exitCode: () => Ku,
  extendMarkRange: () => Vu,
  first: () => Yu,
  focus: () => Xu,
  forEach: () => Qu,
  insertContent: () => Zu,
  insertContentAt: () => ed,
  insertDefaultBlock: () => td,
  joinBackward: () => id,
  joinDown: () => rd,
  joinForward: () => od,
  joinItemBackward: () => sd,
  joinItemForward: () => ld,
  joinTextblockBackward: () => cd,
  joinTextblockForward: () => ad,
  joinUp: () => nd,
  keyboardShortcut: () => dd,
  lift: () => fd,
  liftEmptyBlock: () => hd,
  liftListItem: () => pd,
  newlineInCode: () => md,
  resetAttributes: () => gd,
  scrollIntoView: () => yd,
  selectAll: () => xd,
  selectNodeBackward: () => bd,
  selectNodeForward: () => vd,
  selectParentNode: () => wd,
  selectTextblockEnd: () => kd,
  selectTextblockStart: () => Sd,
  setContent: () => Td,
  setMark: () => Od,
  setMeta: () => Bd,
  setNode: () => Fd,
  setNodeSelection: () => Hd,
  setTextDirection: () => _d,
  setTextSelection: () => jd,
  sinkListItem: () => Wd,
  splitBlock: () => qd,
  splitListItem: () => Kd,
  toggleList: () => Vd,
  toggleMark: () => Yd,
  toggleNode: () => Ud,
  toggleWrap: () => Gd,
  undoInputRule: () => Xd,
  unsetAllMarks: () => Qd,
  unsetMark: () => Zd,
  unsetTextDirection: () => ef,
  updateAttributes: () => tf,
  updateDecorations: () => rf,
  wrapIn: () => of,
  wrapInList: () => sf
});
typeof process < "u" && process.env.NODE_ENV;
function cf(n) {
  return Object.prototype.toString.call(n).slice(8, -1);
}
function Sr(n) {
  return cf(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
function Tl(n, e) {
  const t = { ...n };
  return Sr(n) && Sr(e) && Object.keys(e).forEach((r) => {
    Sr(e[r]) && Sr(n[r]) ? t[r] = Tl(n[r], e[r]) : t[r] = e[r];
  }), t;
}
var Cl = class {
  constructor(n = {}) {
    this.type = "extendable", this.parent = null, this.child = null, this.name = "", this.config = { name: this.name }, this.config = {
      ...this.config,
      ...n
    }, this.name = this.config.name;
  }
  get options() {
    return { ...ki(lr(this, "addOptions", { name: this.name })) };
  }
  get storage() {
    return { ...ki(lr(this, "addStorage", {
      name: this.name,
      options: this.options
    })) };
  }
  configure(n = {}) {
    const e = this.extend({
      ...this.config,
      addOptions: () => Tl(this.options, n)
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
}, af = class El extends Cl {
  constructor(...e) {
    super(...e), this.type = "mark";
  }
  /**
  * Create a new Mark instance
  * @param config - Mark configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new El(t);
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
}, Bt = class Ml extends Cl {
  constructor(...e) {
    super(...e), this.type = "extension";
  }
  /**
  * Create a new Extension instance
  * @param config - Extension configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new Ml(t);
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const t = typeof e == "function" ? e() : e;
    return super.extend(t);
  }
};
Bt.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return { blockSeparator: void 0 };
  },
  addProseMirrorPlugins() {
    return [new on({
      key: new Jt("clipboardTextSerializer"),
      props: { clipboardTextSerializer: () => {
        const { editor: n } = this, { state: e, schema: t } = n, { doc: r, selection: i } = e, o = Id(t), { blockSeparator: s } = this.options, l = {
          ...s !== void 0 ? { blockSeparator: s } : {},
          textSerializers: o
        };
        return [...i.ranges].sort((c, a) => c.$from.pos - a.$from.pos).map(({ $from: c, $to: a }) => Ad(r, {
          from: c.pos,
          to: a.pos
        }, l)).join(s ?? `

`);
      } }
    })];
  }
});
Bt.create({
  name: "commands",
  addCommands() {
    return { ...lf };
  }
});
Bt.create({
  name: "delete",
  onUpdate({ transaction: n, appendedTransactions: e }) {
    var t, r;
    const i = () => {
      var o, s, l;
      if ((o = (s = this.editor.options.coreExtensionOptions) === null || s === void 0 || (s = s.delete) === null || s === void 0 || (l = s.filterTransaction) === null || l === void 0 ? void 0 : l.call(s, n)) !== null && o !== void 0 ? o : n.getMeta("y-sync$")) return;
      const c = Ed(n.before, [n, ...e]);
      Dd(c).forEach((u) => {
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
        if (u instanceof qt) {
          var f, p;
          const m = a.slice(d).map(u.from, -1), g = a.slice(d).map(u.to), b = a.invert().map(m, -1), x = a.invert().map(g), I = m > 0 ? (f = c.doc.nodeAt(m - 1)) === null || f === void 0 ? void 0 : f.marks.some((T) => T.eq(u.mark)) : !1, N = (p = c.doc.nodeAt(g)) === null || p === void 0 ? void 0 : p.marks.some((T) => T.eq(u.mark));
          this.editor.emit("delete", {
            type: "mark",
            mark: u.mark,
            from: u.from,
            to: u.to,
            deletedRange: {
              from: b,
              to: x
            },
            newRange: {
              from: m,
              to: g
            },
            partial: !!(N || I),
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
Bt.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [new on({
      key: new Jt("tiptapDrop"),
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
Bt.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [new on({
      key: new Jt("editable"),
      props: { editable: () => this.editor.options.editable }
    })];
  }
});
const uf = new Jt("focusEvents");
Bt.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [new on({
      key: uf,
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
Bt.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const n = () => this.editor.commands.first(({ commands: s }) => [
      () => s.undoInputRule(),
      () => s.command(({ tr: l }) => {
        const { selection: c, doc: a } = l, { empty: u, $anchor: d } = c, { pos: f, parent: p } = d, m = d.parent.isTextblock && f > 0 ? l.doc.resolve(f - 1) : d, g = m.parent.type.spec.isolating, b = d.pos - d.parentOffset, x = g && m.parent.childCount === 1 ? b === d.pos : On.atStart(a).from === f;
        return !u || !p.type.isTextblock || p.textContent.length || !x || x && d.parent.type.name === "paragraph" ? !1 : s.clearNodes();
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
    return Fr() || vl() ? o : i;
  },
  addProseMirrorPlugins() {
    return [new on({
      key: new Jt("clearDocument"),
      appendTransaction: (n, e, t) => {
        if (n.some((p) => p.getMeta("composition"))) return;
        const r = n.some((p) => p.docChanged) && !e.doc.eq(t.doc), i = n.some((p) => p.getMeta("preventClearDocument"));
        if (!r || i) return;
        const { empty: o, from: s, to: l } = e.selection, c = On.atStart(e.doc).from, a = On.atEnd(e.doc).to;
        if (o || !(s === c && l === a) || !Sl(t.doc)) return;
        const u = t.tr, d = ul({
          state: t,
          transaction: u
        }), { commands: f } = new Iu({
          editor: this.editor,
          state: d
        });
        if (f.clearNodes(), !!u.steps.length)
          return u;
      }
    })];
  }
});
Bt.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [new on({
      key: new Jt("tiptapPaste"),
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
Bt.create({
  name: "tabindex",
  addOptions() {
    return { value: void 0 };
  },
  addProseMirrorPlugins() {
    return [new on({
      key: new Jt("tabindex"),
      props: { attributes: () => {
        var n;
        return !this.editor.isEditable && this.options.value === void 0 ? {} : { tabindex: (n = this.options.value) !== null && n !== void 0 ? n : "0" };
      } }
    })];
  }
});
Bt.create({
  name: "textDirection",
  addOptions() {
    return { direction: void 0 };
  },
  addGlobalAttributes() {
    if (!this.options.direction) return [];
    const { nodeExtensions: n } = kl(this.extensions);
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
    return [new on({
      key: new Jt("textDirection"),
      props: { attributes: () => {
        const n = this.options.direction;
        return n ? { dir: n } : {};
      } }
    })];
  }
});
const df = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), ff = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), hf = /^(https?:\/\/|mailto:)/i;
function pf(n) {
  if (!n) return "";
  const e = [];
  for (const t of n.split(";")) {
    const r = t.indexOf(":");
    if (r < 0) continue;
    const i = t.slice(0, r).trim().toLowerCase(), o = t.slice(r + 1).trim();
    ff.has(i) && o && e.push(`${i}: ${o}`);
  }
  return e.join("; ");
}
function Si(n) {
  if (n.nodeType === Node.TEXT_NODE) return n;
  if (n.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const e = n, t = e.tagName.toLowerCase(), r = () => {
    const l = document.createDocumentFragment();
    for (const c of Array.from(e.childNodes)) l.appendChild(Si(c));
    return l;
  };
  if (!df.has(t)) return r();
  if (t === "a") {
    const l = e.getAttribute("href") || "";
    if (!hf.test(l)) return r();
  }
  const i = document.createElement(t), o = e.getAttribute("style"), s = pf(o || "");
  if (s && i.setAttribute("style", s), t === "span") {
    const l = e.getAttribute("data-text-style");
    l && i.setAttribute("data-text-style", l);
  }
  if (t === "a") {
    i.setAttribute("href", e.getAttribute("href"));
    const l = e.getAttribute("target"), c = e.getAttribute("rel");
    l && i.setAttribute("target", l), c && i.setAttribute("rel", c);
  }
  for (const l of Array.from(e.childNodes)) i.appendChild(Si(l));
  return i;
}
function Rl(n) {
  return n.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function mf(n) {
  const e = Rl(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  t.innerHTML = e;
  const r = document.createDocumentFragment();
  for (const s of Array.from(t.content.childNodes)) r.appendChild(Si(s));
  const i = document.createElement("div");
  return i.appendChild(r), i.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function Kh(n) {
  const e = Rl(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  return t.innerHTML = e, (t.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function Jh(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function gf(n) {
  return n.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function Po(n) {
  return n.replace(/\{\{([^{}]+)\}\}/g, (e, t) => `<span data-type="token" data-field="${t}">{{${t}}}</span>`);
}
const yf = { text: "#52525b" }, xf = ({ node: n, selected: e, extension: t, editor: r, view: i, getPos: o }) => {
  var f;
  const s = n.attrs.field ?? "", l = t.options, c = ((f = l.resolve) == null ? void 0 : f.call(l, s)) ?? null, a = (c == null ? void 0 : c.color) ?? yf, u = (c == null ? void 0 : c.label) ?? `{{${s}}}`, d = c == null ? void 0 : c.nested;
  return /* @__PURE__ */ h(
    Zl,
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
        var x;
        if (p.button !== 0 || !r.isEditable) return;
        p.preventDefault(), r.isFocused || r.commands.focus();
        const m = typeof o == "function" ? o() : null;
        if (m == null) return;
        const g = i.state.doc.resolve(m), b = g.nodeAfter;
        b && _n.isSelectable(b) && i.dispatch(i.state.tr.setSelection(new _n(g))), (x = l.onTokenClick) == null || x.call(l, s, p.currentTarget.getBoundingClientRect(), m);
      },
      children: d ? /* @__PURE__ */ h("span", { className: "rt-token-nested", children: u }) : u
    }
  );
}, bf = hc.extend({
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
    return Ql(xf);
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
    return ["span", Xl({ "data-type": "token" }, e), `{{${n.attrs.field ?? ""}}}`];
  },
  renderText({ node: n }) {
    return `{{${n.attrs.field ?? ""}}}`;
  }
}), vf = 240, wf = 280, kf = ({ props: n, onApi: e }) => {
  const t = Kr(), r = v(e);
  r.current = e, le(() => {
    r.current(t);
  }, [t]);
  const i = v(null);
  le(() => {
    var s;
    t.pointerDriven || hn((s = i.current) == null ? void 0 : s.querySelector(".ui-item-highlighted"));
  }, [t.highlightedIndex, t.pointerDriven]), le(() => {
    n.items.length > 0 && t.highlightedIndex === -1 && t.setHighlighted(0, "keyboard");
  }, [n.items.length, t.highlightedIndex, t]);
  const o = qr();
  return /* @__PURE__ */ h(dr.Provider, { value: t, children: /* @__PURE__ */ h(
    "div",
    {
      role: "listbox",
      "data-token-popup": !0,
      className: "ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto",
      style: { width: wf, maxHeight: vf },
      onMouseDown: (s) => s.preventDefault(),
      children: /* @__PURE__ */ h("div", { ref: i, children: n.items.map((s) => /* @__PURE__ */ h(
        Sf,
        {
          item: s,
          d: o,
          command: () => n.command({ field: s.key })
        },
        s.key
      )) })
    }
  ) });
}, Sf = ({ item: n, d: e, command: t }) => {
  const { myIndex: r, highlighted: i, setPointer: o } = ms({
    label: () => n.label,
    activate: t
  }), s = Fe(), l = { padding: `${L(8, 12, s)}px ${L(12, 16, s)}px`, fontSize: L(12, 14, s) };
  return /* @__PURE__ */ E(
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
}, Lo = () => {
  let n = null;
  const e = (r) => {
    n && (n.props = r, n.holder.style.display = r.items.length > 0 ? "" : "none", n.root.render(
      /* @__PURE__ */ h(kf, { props: r, onApi: (i) => {
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
      const o = pc(i);
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
}, Nf = af.create({
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
}), Er = new Jt("retainedSelectionHighlight"), Tf = Bt.create({
  name: "retainedSelectionHighlight",
  addProseMirrorPlugins() {
    return [
      new on({
        key: Er,
        state: {
          init: () => ({ held: !1, decorations: hr.empty }),
          apply(n, e) {
            const t = n.getMeta(Er), r = t ? t.held : e.held;
            if (!r) return { held: !1, decorations: hr.empty };
            const { from: i, to: o, empty: s } = n.selection;
            return {
              held: r,
              decorations: s ? hr.empty : hr.create(n.doc, [rc.inline(i, o, { class: "rt-retained-selection" })])
            };
          }
        },
        props: {
          decorations(n) {
            var e;
            return (e = Er.getState(n)) == null ? void 0 : e.decorations;
          }
        }
      })
    ];
  }
}), Vh = {
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
function Al(n, e) {
  const t = n.state.doc.resolve(e).nodeBefore;
  return t && t.type.name === "token" ? t.attrs.field ?? "" : null;
}
function Cf(n) {
  const e = n.state.selection.$from, t = e.nodeBefore;
  if (!(t != null && t.isText)) return null;
  const r = t.text || "", i = r.lastIndexOf(".");
  if (i < 0) return null;
  const o = e.pos - r.length + i, s = Al(n, o);
  return s == null ? null : { chipKey: s, dotPos: o };
}
const Ef = lt.forwardRef(({
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
  const f = v(s);
  f.current = s;
  const p = v(l);
  p.current = l;
  const m = v(c);
  m.current = c;
  const g = v(a);
  g.current = a;
  const b = v(u);
  b.current = u;
  const x = v(null), I = v(null), N = v(e);
  N.current = e;
  const T = v(r);
  T.current = r;
  const w = v(o);
  w.current = o;
  const R = v(null), J = ($) => {
    var he;
    const H = $.getAttributes("textStyle"), _ = $.getAttributes("reportTextStyle"), { from: X, to: C, empty: j } = $.state.selection;
    let W = !1, fe = !1, ke = !1;
    if (!j) {
      const ie = /* @__PURE__ */ new Set(), G = /* @__PURE__ */ new Set(), Y = /* @__PURE__ */ new Set();
      $.state.doc.nodesBetween(X, C, (ye) => {
        if (!ye.isText) return;
        const P = ye.marks.find((F) => F.type.name === "textStyle");
        ie.add((P == null ? void 0 : P.attrs.fontFamily) || ""), G.add((P == null ? void 0 : P.attrs.fontSize) || "");
        const te = ye.marks.find((F) => F.type.name === "reportTextStyle");
        Y.add((te == null ? void 0 : te.attrs.styleId) || "");
      }), W = ie.size > 1, fe = G.size > 1, ke = Y.size > 1;
    }
    const M = {
      bold: $.isActive("bold"),
      italic: $.isActive("italic"),
      underline: $.isActive("underline"),
      strike: $.isActive("strike"),
      link: $.isActive("link"),
      color: H.color || "",
      fontFamily: H.fontFamily || "",
      fontSize: H.fontSize || "",
      textStyle: _.styleId || "",
      hasSelection: !j,
      fontFamilyMixed: W,
      fontSizeMixed: fe,
      textStyleMixed: ke
    }, me = R.current;
    me && me.bold === M.bold && me.italic === M.italic && me.underline === M.underline && me.strike === M.strike && me.link === M.link && me.color === M.color && me.fontFamily === M.fontFamily && me.fontSize === M.fontSize && me.textStyle === M.textStyle && me.hasSelection === M.hasSelection && me.fontFamilyMixed === M.fontFamilyMixed && me.fontSizeMixed === M.fontSizeMixed && me.textStyleMixed === M.textStyleMixed || (R.current = M, (he = w.current) == null || he.call(w, M));
  }, O = ($) => {
    var j;
    const H = $.state.selection;
    let _ = null;
    H instanceof _n && H.node.type.name === "token" ? (_ = { key: H.node.attrs.field ?? "", pos: H.from }, x.current = H.from) : x.current != null && (x.current = $.state.tr.mapping.map(x.current));
    const X = I.current, C = X && _ && X.key === _.key && X.pos === _.pos;
    !X && !_ || C || (I.current = _, (j = b.current) == null || j.call(b, _));
  }, A = ($) => {
    const H = mf(gf($));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(H) ? "" : H;
  }, K = lt.useMemo(() => {
    const $ = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: X }) => {
        var C;
        return ((C = p.current) == null ? void 0 : C.call(p, X)) ?? [];
      },
      command: ({ editor: X, range: C, props: j }) => {
        X.chain().focus().insertContentAt(C, { type: "token", attrs: { field: j.field } }).run();
      },
      render: Lo
    }, H = bf.configure({
      resolve: f.current ?? null,
      suggestion: $,
      onTokenClick: (X, C, j) => {
        var W;
        x.current = j, (W = g.current) == null || W.call(g, X, C, j);
      }
    }), _ = Bt.create({
      name: "tokenAttributeSuggestion",
      addProseMirrorPlugins() {
        return [
          fc({
            pluginKey: new Jt("tokenAttributeSuggestion"),
            editor: this.editor,
            char: ".",
            // The gate is `shouldShow` (a chip must sit immediately before the
            // dot), not the prefix rule — the prefix here is an atom, not text.
            allowedPrefixes: null,
            decorationClass: "suggestion-attr",
            shouldShow: ({ editor: X, range: C }) => Al(X, C.from) != null,
            items: ({ editor: X, query: C }) => {
              var W;
              const j = Cf(X);
              return j ? ((W = m.current) == null ? void 0 : W.call(m, j.chipKey, C)) ?? [] : [];
            },
            command: ({ editor: X, range: C, props: j }) => {
              X.chain().focus().insertContentAt(C, { type: "token", attrs: { field: j.field } }).run();
            },
            render: Lo
          })
        ];
      }
    });
    return [H, _];
  }, []), S = ec({
    immediatelyRender: !1,
    extensions: [
      ic,
      oc.configure({ placeholder: t }),
      sc,
      lc,
      cc,
      Nf,
      Tf,
      ac,
      dc,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      uc.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      ...K
    ],
    content: Po(n || ""),
    editable: !r,
    onUpdate: ({ editor: $ }) => {
      N.current(A($.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: $ }) => {
      J($), O($);
    }
  });
  return le(() => {
    if (!S || S.isFocused) return;
    A(S.getHTML()) !== n && (R.current = null, S.commands.setContent(Po(n || ""), { emitUpdate: !1 }), J(S));
  }, [n, S]), le(() => {
    S && S.setEditable(!r);
  }, [r, S]), le(() => {
    S && (R.current = null, J(S), O(S));
  }, [S]), Ho(d, () => ({
    exec: ($, H, _) => {
      if (!S || T.current) return;
      const X = S.chain(), C = (_ == null ? void 0 : _.focus) === !1 ? X : X.focus();
      switch ($) {
        case "bold":
          C.toggleBold().run();
          break;
        case "italic":
          C.toggleItalic().run();
          break;
        case "underline":
          C.toggleUnderline().run();
          break;
        case "strikeThrough":
          C.toggleStrike().run();
          break;
        case "foreColor":
          H && C.setColor(H).run();
          break;
        case "unsetColor":
          C.unsetColor().run();
          break;
        case "fontFamily":
          H && C.setFontFamily(H).run();
          break;
        case "unsetFontFamily":
          C.unsetFontFamily().run();
          break;
        case "fontSize":
          H && C.setFontSize(H).run();
          break;
        case "unsetFontSize":
          C.unsetFontSize().run();
          break;
        // Linked named style: mark the run with the consumer's style id. Direct
        // font family/size on the range is cleared so the linked style's
        // typography takes effect (the object-level precedent); bold/italic
        // marks stay — direct character formatting still wins (Word).
        case "textStyle":
          H && C.setMark("reportTextStyle", { styleId: H }).unsetFontFamily().unsetFontSize().run();
          break;
        case "unsetTextStyle":
          C.unsetMark("reportTextStyle").run();
          break;
        // Clear every inline mark (bold/italic/underline/strike/color/font/
        // link) and normalize the block — the cell-chrome Reset path.
        case "clearFormatting":
          C.unsetAllMarks().clearNodes().run();
          break;
        case "link":
          H && C.extendMarkRange("link").setLink({ href: H }).run();
          break;
        case "unlink":
          C.extendMarkRange("link").unsetLink().run();
          break;
      }
    },
    focus: ($) => S == null ? void 0 : S.commands.focus($),
    insertToken: ($) => {
      !S || T.current || S.chain().focus().insertContent({ type: "token", attrs: { field: $ } }).run();
    },
    replaceToken: ($) => {
      if (!S || T.current) return;
      const H = x.current;
      H != null && S.commands.command(({ tr: _ }) => {
        const X = _.doc.nodeAt(H);
        if (!X || X.type.name !== "token") return !1;
        _.setNodeMarkup(H, void 0, { field: $ });
        const C = _.doc.resolve(H);
        return C.nodeAfter && C.nodeAfter.type.name === "token" && _.setSelection(new _n(C)), !0;
      });
    },
    holdSelectionHighlight: ($) => {
      !S || S.isDestroyed || S.view.dispatch(S.state.tr.setMeta(Er, { held: $ }));
    }
  }), [S]), /* @__PURE__ */ h(tc, { editor: S, className: `richtext-editor ${i || ""}` });
});
Ef.displayName = "RichTextEditor";
const Mf = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], Rf = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], Oo = ({ className: n = "w-3 h-3" }) => /* @__PURE__ */ h("span", { className: `${n} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ h("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), Af = ({ value: n, disabled: e, onChange: t, mixed: r }) => {
  const [i, o] = re(!1);
  return /* @__PURE__ */ h(
    Jr,
    {
      open: i,
      onOpenChange: o,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ E("button", { type: "button", disabled: e, className: `${pa} w-28 justify-between`, children: [
        r ? /* @__PURE__ */ h("span", { className: "truncate italic text-zinc-500", children: "Mixed" }) : /* @__PURE__ */ h("span", { className: "truncate", style: { fontFamily: n || "Helvetica" }, children: n || "Helvetica" }),
        /* @__PURE__ */ h(un, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: Mf.map((s) => /* @__PURE__ */ h(_c, { onClick: () => {
        t(s), o(!1);
      }, icon: !r && s === n ? /* @__PURE__ */ h(cr, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ h("span", { style: { fontFamily: s }, children: s }) }, s))
    }
  );
}, If = ({ editorRef: n, disabled: e, active: t }) => {
  const [r, i] = re(!1), o = Vr(), [s, l] = re(""), c = () => {
    var u;
    const a = s.trim();
    a && ((u = n.current) == null || u.exec("link", a), i(!1));
  };
  return /* @__PURE__ */ h(
    Jr,
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
          children: /* @__PURE__ */ h(ql, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ E("div", { className: "p-2 flex flex-col gap-2", children: [
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
            className: fa + " w-full"
          }
        ),
        /* @__PURE__ */ E("div", { className: "flex items-center gap-2", children: [
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
}, Yh = ({ editorRef: n, disabled: e, active: t, lockedFormatting: r, trailing: i, font: o, fontSizeSlot: s, showClearFormatting: l, dividers: c = !0 }) => {
  const [a, u] = re(!1), d = (b, x) => {
    var I;
    return (I = n.current) == null ? void 0 : I.exec(b, x);
  }, f = Vr(), p = (b) => !!(r != null && r[b]), m = "flex items-center gap-1 shrink-0", g = c ? /* @__PURE__ */ h("div", { className: vs }) : null;
  return /* @__PURE__ */ E("div", { className: `flex flex-wrap items-center ${c ? "gap-x-1" : "gap-x-2"} gap-y-1.5`, children: [
    /* @__PURE__ */ E("div", { className: m, children: [
      /* @__PURE__ */ h(zn, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ h(Ct, { theme: "dark", "aria-label": "Bold", active: ((t == null ? void 0 : t.bold) ?? !1) || p("bold"), disabled: e || p("bold"), onMouseDown: (b) => b.preventDefault(), onClick: () => d("bold"), style: { ...f.toggle, padding: 0 }, className: "justify-center font-bold", children: "B" }) }),
      /* @__PURE__ */ h(zn, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ h(Ct, { theme: "dark", "aria-label": "Italic", active: ((t == null ? void 0 : t.italic) ?? !1) || p("italic"), disabled: e || p("italic"), onMouseDown: (b) => b.preventDefault(), onClick: () => d("italic"), style: { ...f.toggle, padding: 0 }, className: "justify-center italic", children: "I" }) }),
      /* @__PURE__ */ h(zn, { content: "Underline", children: /* @__PURE__ */ h(Ct, { theme: "dark", "aria-label": "Underline", active: (t == null ? void 0 : t.underline) ?? !1, disabled: e, onMouseDown: (b) => b.preventDefault(), onClick: () => d("underline"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ h(_l, { className: "w-3 h-3" }) }) }),
      /* @__PURE__ */ h(zn, { content: "Strikethrough", children: /* @__PURE__ */ h(Ct, { theme: "dark", "aria-label": "Strikethrough", active: (t == null ? void 0 : t.strike) ?? !1, disabled: e, onMouseDown: (b) => b.preventDefault(), onClick: () => d("strikeThrough"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ h(jl, { className: "w-3 h-3" }) }) })
    ] }),
    g,
    /* @__PURE__ */ h("div", { className: m, children: /* @__PURE__ */ h(If, { editorRef: n, disabled: e, active: (t == null ? void 0 : t.link) ?? !1 }) }),
    g,
    /* @__PURE__ */ h("div", { className: m, children: /* @__PURE__ */ h(
      Jr,
      {
        open: a,
        onOpenChange: u,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ E(Ct, { theme: "dark", disabled: e, style: f.control, className: "justify-between min-w-0", title: "Text color", children: [
          t != null && t.color ? /* @__PURE__ */ h("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: t.color } }) : /* @__PURE__ */ h(Oo, {}),
          /* @__PURE__ */ h(un, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ E("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ h(
            "button",
            {
              onClick: () => {
                d("unsetColor"), u(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${t != null && t.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ h(Oo, { className: "w-3.5 h-3.5" })
            }
          ),
          Rf.map((b) => /* @__PURE__ */ h(
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
    (o || s || l) && /* @__PURE__ */ E(ct, { children: [
      g,
      /* @__PURE__ */ E("div", { className: m, children: [
        o && /* @__PURE__ */ h(Af, { value: o.value || "Helvetica", mixed: o.mixed, disabled: e, onChange: o.onChange }),
        s,
        l && /* @__PURE__ */ h(zn, { content: "Clear formatting", children: /* @__PURE__ */ h(
          Ct,
          {
            theme: "dark",
            "aria-label": "Clear formatting",
            disabled: e,
            onMouseDown: (b) => b.preventDefault(),
            onClick: () => d("clearFormatting"),
            style: { ...f.toggle, padding: 0 },
            className: "justify-center",
            children: /* @__PURE__ */ h(Wl, { className: "w-3 h-3" })
          }
        ) })
      ] })
    ] }),
    i && /* @__PURE__ */ E(ct, { children: [
      g,
      /* @__PURE__ */ h("div", { className: m, children: i })
    ] })
  ] });
};
function Ui(n, e, t) {
  return Math.max(e, Math.min(t, n));
}
function $f(n, e, t, r, i) {
  return Ui(n + e * i, t, r);
}
const zf = 2;
function Df(n, e, t, r, i) {
  return Ui(n + Math.trunc(e / zf) * i, t, r);
}
const Pf = 3;
function Uh({
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
  const [p, m] = re(null), [g, b] = re(!1), x = v(!1), I = v(null), N = v(null), T = v(null), w = Fe(), R = xs(), J = a === void 0;
  le(() => () => {
    var C;
    return (C = I.current) == null ? void 0 : C.call(I);
  }, []), ft(() => {
    const C = T.current, j = N.current;
    !J && C && j && (j.style.color = getComputedStyle(C).color);
  }, [J, a]), le(() => {
    x.current || m(null);
  }, [n]);
  const O = n ?? r, A = p !== null ? p : n != null ? String(n) : d ? "" : String(r), K = (C) => Ui(C, e, t), S = (C) => {
    const j = $f(O, C, e, t, o);
    j !== O && (x.current && m(String(j)), i(j));
  }, $ = (C) => {
    if (l || s || C.pointerType !== "mouse" || C.button !== 0) return;
    const j = C.currentTarget, W = C.clientY, fe = O;
    let ke = fe, M = !1;
    const me = (ie) => {
      const G = W - ie.clientY;
      if (!M) {
        if (Math.abs(G) < Pf) return;
        M = !0, j.blur(), j.style.userSelect = "none";
      }
      const Y = Df(fe, G, e, t, o);
      Y !== ke && (ke = Y, i(Y));
    }, he = () => {
      I.current = null, window.removeEventListener("pointermove", me), window.removeEventListener("pointerup", he), window.removeEventListener("pointercancel", he), j.style.userSelect = "", M && j.blur();
    };
    I.current = he, window.addEventListener("pointermove", me), window.addEventListener("pointerup", he), window.addEventListener("pointercancel", he);
  }, H = (C) => ({
    type: "button",
    tabIndex: -1,
    "aria-label": C === 1 ? "Increase" : "Decrease",
    disabled: !!l || !!s || (C === 1 ? O >= t : O <= e),
    onPointerDown: (j) => j.preventDefault(),
    onClick: () => S(C)
  }), _ = J ? L(22, 30, w) : L(16, 22, w), X = J ? L(14, 18, w) : L(11, 15, w);
  return /* @__PURE__ */ E(
    "span",
    {
      ref: N,
      className: `ui-number ${J ? "ui-number-box" : ""}`,
      ...f ? { "data-theme": f } : {},
      children: [
        /* @__PURE__ */ h(
          "input",
          {
            ref: T,
            type: "number",
            "aria-label": c,
            title: u,
            placeholder: d,
            value: A,
            readOnly: s,
            disabled: l,
            className: a ?? "ui-input w-20",
            style: {
              ...J ? { ...R, minHeight: L(28, 36, w) } : {},
              paddingRight: _ + 2,
              cursor: l || s ? void 0 : g ? "text" : "ns-resize"
            },
            onFocus: () => {
              x.current = !0, b(!0);
            },
            onChange: (C) => {
              const j = C.target.value;
              m(j);
              const W = parseInt(j, 10);
              j !== "" && !Number.isNaN(W) && i(K(W));
            },
            onBlur: () => {
              if (x.current = !1, b(!1), p === null) return;
              const C = parseInt(p, 10);
              Number.isNaN(C) || i(K(C)), m(null);
            },
            onKeyDown: (C) => {
              C.key === "Enter" && C.target.blur(), C.key === "Escape" && (m(null), C.target.blur()), !s && !l && (C.key === "ArrowUp" || C.key === "ArrowDown") && (C.preventDefault(), S(C.key === "ArrowUp" ? 1 : -1));
            },
            onPointerDown: $
          }
        ),
        /* @__PURE__ */ E("span", { className: "ui-number-steppers", style: { width: _ }, children: [
          /* @__PURE__ */ h("button", { ...H(1), className: "ui-number-step", children: /* @__PURE__ */ h(Kl, { style: { width: X, height: X } }) }),
          /* @__PURE__ */ h("button", { ...H(-1), className: "ui-number-step", children: /* @__PURE__ */ h(un, { style: { width: X, height: X } }) })
        ] })
      ]
    }
  );
}
function Gh({ title: n, icon: e, count: t, tone: r = "default", collapsed: i, onToggle: o, trailing: s, bodyClass: l, className: c = "", dataProps: a, children: u }) {
  const d = Fe(), f = dn({ px: 12, py: 8, fs: 12 }, { px: 14, py: 12, fs: 14 }), p = L(14, 16, d), m = { width: p, height: p }, g = L(10, 12, d);
  return /* @__PURE__ */ E("div", { ...a, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${c}`, children: [
    /* @__PURE__ */ E("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1 bg-[var(--ui-card-header-bg)] text-[color:var(--ui-card-header-text)] hover:bg-[var(--ui-card-header-hover)] transition-colors", style: f, children: [
      /* @__PURE__ */ E(
        "button",
        {
          type: "button",
          onClick: o,
          className: "flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer",
          children: [
            i ? /* @__PURE__ */ h(Mr, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: m }) : /* @__PURE__ */ h(un, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: m }),
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
function Gi({
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
  const u = v(null), d = v(null), [f, p] = re(null), m = (w) => {
    u.current = w, typeof o == "function" ? o(w) : o && (o.current = w);
  };
  ft(() => {
    if (n) return;
    const w = u.current;
    if (!w || (d.current = w.getBoundingClientRect().width, typeof ResizeObserver > "u")) return;
    const R = new ResizeObserver(() => {
      d.current = w.getBoundingClientRect().width;
    });
    return R.observe(w), () => R.disconnect();
  }, [n]), ft(() => {
    if (!n || e !== "auto") {
      p(null);
      return;
    }
    p(d.current);
    const w = requestAnimationFrame(() => p(null));
    return () => cancelAnimationFrame(w);
  }, [n, e]);
  const [g, b] = re(!1), [x, I] = re(null), N = v(!1);
  ft(() => {
    if (n) {
      N.current = !0, b(!1), I(null);
      return;
    }
    if (!N.current || e !== "auto") return;
    N.current = !1, b(!0);
    let w = 0, R = 0;
    return (() => {
      var K;
      const O = (K = u.current) == null ? void 0 : K.firstElementChild, A = (O == null ? void 0 : O.getBoundingClientRect().width) ?? 0;
      A > 0 ? (w = requestAnimationFrame(() => I(A)), R = window.setTimeout(() => {
        b(!1), I(null);
      }, fn + 30)) : b(!1);
    })(), () => {
      cancelAnimationFrame(w), window.clearTimeout(R);
    };
  }, [n, e]);
  const T = n ? f ?? t : g ? x ?? t : e === "auto" ? "auto" : e;
  return /* @__PURE__ */ E(
    "div",
    {
      ...a,
      ref: m,
      className: `relative inline-flex ${s ? "shrink-0" : ""} ${l}`,
      style: {
        ...c,
        width: T,
        transition: "width 220ms cubic-bezier(0.32, 0.72, 0, 1)"
      },
      children: [
        /* @__PURE__ */ h(
          "div",
          {
            className: `${e === "auto" ? "w-auto" : "w-full"} origin-left ${n ? "opacity-0 pointer-events-none" : "opacity-100"} motion-reduce:transition-none`,
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
function Lf({
  value: n,
  onChange: e,
  triggerLabel: t = "Filter",
  triggerIcon: r,
  placeholder: i = "Filter…",
  collapsedWidth: o = 88,
  expandedWidth: s = 200,
  variant: l = "subtle",
  triggerCollapse: c = !1,
  iconWithLabel: a = !0,
  triggerReveal: u = !1,
  theme: d,
  active: f = !1,
  autoFocus: p = !1,
  onExpandedChange: m,
  actions: g,
  leadingIcon: b,
  showClear: x = !0,
  onSubmit: I,
  onCancel: N,
  cancelOnEscape: T = !1,
  cancelOnOutside: w = !1,
  className: R = "",
  "aria-label": J
}) {
  const [O, A] = re(p), K = v(O);
  K.current = O;
  const S = v(null), $ = v(null), H = v(null), _ = Vo(), X = Fe(), C = L(9, 13, X), j = ne((P) => {
    K.current !== P && (K.current = P, A(P), m == null || m(P));
  }, [m]), W = ne((P = !1) => {
    var te;
    j(!1), (te = $.current) == null || te.blur(), P && requestAnimationFrame(() => {
      var F;
      return (F = H.current) == null ? void 0 : F.focus();
    });
  }, [j]), fe = ne(() => {
    j(!0), requestAnimationFrame(() => {
      const P = $.current;
      if (!P) return;
      P.focus();
      const te = P.value.length;
      P.setSelectionRange(te, te);
    });
  }, [j]);
  le(() => {
    p && fe();
  }, [p, fe]), le(() => {
    var F;
    if (!O) return;
    const P = ((F = S.current) == null ? void 0 : F.ownerDocument) ?? document, te = (Q) => {
      var Ne;
      const He = Q.target;
      He && ((Ne = S.current) != null && Ne.contains(He) || (w && (N == null || N()), W()));
    };
    return P.addEventListener("pointerdown", te, !0), () => P.removeEventListener("pointerdown", te, !0);
  }, [O, W, w, N]);
  const ke = ne((P) => {
    var F;
    if (!O) return;
    const te = P.relatedTarget;
    te && ((F = S.current) != null && F.contains(te)) || (w && (N == null || N()), W());
  }, [O, W, w, N]), M = ne((P) => {
    if (P.key === "Enter") {
      P.preventDefault(), I == null || I(n), W(!0);
      return;
    }
    P.key === "Escape" && (P.preventDefault(), P.stopPropagation(), T ? N == null || N() : e(""), W(!0));
  }, [e, W, T, N, I, n]), me = r === void 0 ? /* @__PURE__ */ h(Pn, { className: "w-3.5 h-3.5" }) : r, he = b === void 0 ? me : b, Y = 8 + (((g == null ? void 0 : g.length) || 0) + (x && n ? 1 : 0)) * (_.box + 2), ye = (P) => /* @__PURE__ */ h(
    "span",
    {
      style: { width: _.icon, height: _.icon },
      className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
      children: P
    }
  );
  return /* @__PURE__ */ h(
    Gi,
    {
      expanded: O,
      collapsedWidth: o,
      expandedWidth: s,
      rootRef: S,
      shrink: !0,
      "data-morph-search": !0,
      "data-theme": d,
      "data-expanded": O ? "true" : "false",
      className: R,
      onBlur: ke,
      trigger: /* @__PURE__ */ h(
        Ct,
        {
          ref: H,
          type: "button",
          variant: l,
          size: "minimal",
          theme: d,
          icon: me,
          collapse: c,
          iconWithLabel: a,
          revealOnHover: u,
          active: f,
          keepLabelOnActive: !0,
          onClick: fe,
          className: `${c ? "w-auto" : "w-full"} justify-start ${O ? "pointer-events-none" : ""}`,
          tabIndex: O ? -1 : 0,
          "aria-expanded": O,
          "aria-label": J || t,
          "data-morph-search-trigger": !0,
          children: /* @__PURE__ */ h("span", { className: `min-w-0 ${c ? "" : "truncate"}`, children: t })
        }
      ),
      field: /* @__PURE__ */ E(ct, { children: [
        he && /* @__PURE__ */ h(
          "span",
          {
            className: "ui-icon absolute top-1/2 -translate-y-1/2 pointer-events-none",
            style: { left: C, width: _.icon, height: _.icon },
            children: ye(he)
          }
        ),
        /* @__PURE__ */ h(
          "input",
          {
            ref: $,
            value: n,
            onChange: (P) => e(P.target.value),
            onKeyDown: M,
            placeholder: i,
            "aria-label": J || i,
            tabIndex: O ? 0 : -1,
            "data-morph-search-input": !0,
            style: { paddingLeft: he ? C + _.icon + 6 : 10, paddingRight: Y },
            className: `${Ir("sm")} w-full`
          }
        ),
        /* @__PURE__ */ E("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
          g == null ? void 0 : g.map((P) => /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              "aria-label": P.label,
              title: P.label,
              tabIndex: O ? 0 : -1,
              onMouseDown: (te) => te.preventDefault(),
              onClick: () => {
                P.onClick(n, { close: () => W(!0) }), P.keepOpen || W(!0);
              },
              style: { width: _.box, height: _.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-action": P.key,
              children: ye(P.icon)
            },
            P.key
          )),
          x && n && /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              "aria-label": "Clear",
              tabIndex: O ? 0 : -1,
              onClick: () => {
                e(""), requestAnimationFrame(() => {
                  var P;
                  return (P = $.current) == null ? void 0 : P.focus();
                });
              },
              style: { width: _.box, height: _.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-clear": !0,
              children: /* @__PURE__ */ h(Sn, { size: _.icon })
            }
          )
        ] })
      ] })
    }
  );
}
function Xh({
  triggerLabel: n,
  triggerIcon: e = /* @__PURE__ */ h(Hr, { className: "w-3.5 h-3.5" }),
  fieldIcon: t = null,
  actions: r = [],
  onSubmit: i,
  onCancel: o,
  clearOnSubmit: s = !0,
  clearOnCancel: l = !0,
  onChange: c,
  value: a,
  variant: u = "primary",
  triggerCollapse: d = !1,
  iconWithLabel: f = !0,
  ...p
}) {
  const m = (x) => {
    i == null || i(x), s && c("");
  }, g = () => {
    o == null || o(), l && c("");
  }, b = [
    ...r,
    ...i ? [{
      key: "submit",
      label: "Submit",
      icon: /* @__PURE__ */ h(cr, { className: "w-3.5 h-3.5" }),
      onClick: m
    }] : [],
    ...o ? [{
      key: "cancel",
      label: "Cancel",
      icon: /* @__PURE__ */ h(Sn, { className: "w-3.5 h-3.5" }),
      onClick: g
    }] : []
  ];
  return /* @__PURE__ */ h(
    Lf,
    {
      ...p,
      value: a,
      onChange: c,
      triggerLabel: n,
      triggerIcon: e,
      triggerCollapse: d,
      iconWithLabel: f,
      leadingIcon: t,
      actions: b,
      showClear: !1,
      variant: u,
      onSubmit: i ? m : void 0,
      onCancel: o ? g : void 0,
      cancelOnEscape: !!o,
      cancelOnOutside: !!o
    }
  );
}
function Of(n) {
  return n.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
}
function Bf(n, e, t) {
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
function Il(n, e, t) {
  const r = Of(t), i = r.length > 0, o = new Map(e.map((a) => [a.key, a])), s = [];
  for (const a of n) {
    const { matched: u, detail: d } = Bf(a, a.group ? o.get(a.group) : void 0, r);
    u && s.push({ item: a, detail: d });
  }
  const l = new Set(s.map((a) => a.item.group).filter(Boolean)), c = i ? e.filter((a) => l.has(a.key) || a.label.toLowerCase().includes(t.trim().toLowerCase())) : e;
  return { hits: s, visibleGroups: c, hasQuery: i };
}
function Ff(n) {
  var u;
  const { hits: e, visibleGroups: t, hasQuery: r } = Il(n.items, n.groups, n.query), i = [];
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
function Hf({
  items: n,
  groups: e = [],
  mode: t = "expandable",
  triggerLabel: r = "Search",
  triggerIcon: i,
  triggerVariant: o = "primary",
  triggerClassName: s,
  placeholder: l = "Search…",
  query: c,
  onQueryChange: a,
  onSelect: u,
  onSelectGroup: d,
  onClose: f,
  closeOnSelect: p = !0,
  openOnFocus: m = !0,
  expandableGroups: g = !1,
  browseExpanded: b = !1,
  groupExpandMode: x = "multiple",
  browseAll: I = !1,
  selectedId: N,
  autoFocus: T = !0,
  collapsedWidth: w = 128,
  expandedWidth: R = 288,
  panelWidth: J,
  panelMinWidth: O,
  keepAllRows: A = !1,
  maxMenuHeight: K = 420,
  theme: S = "light",
  morph: $ = !0,
  emptyTitle: H,
  emptyHint: _,
  renderEmpty: X,
  emptyActions: C,
  leadingActions: j,
  hideLeadingOnEmpty: W = !1,
  footerActions: fe,
  fieldActions: ke,
  multiple: M,
  open: me,
  onOpenChange: he,
  hideTrigger: ie = !1,
  anchorRef: G,
  portalTarget: Y,
  renderTrigger: ye,
  renderItem: P,
  highlightOnOpen: te = !0,
  ref: F
}) {
  const Q = c !== void 0, [He, Ne] = re(""), ge = Q ? c : He, We = ne((y) => {
    Q || Ne(y), a == null || a(y);
  }, [Q, a]), Te = me !== void 0, [Oe, Be] = re(!1), oe = Te ? me : Oe, _e = ne((y) => {
    Te || Be(y), he == null || he(y);
  }, [Te, he]), [Se, Ze] = re(t === "inline"), bt = rt(() => e.map((y) => y.key).join("\0"), [e]), ve = rt(() => new Set(bt ? bt.split("\0") : []), [bt]), [Ve, yt] = re(() => b ? ve : /* @__PURE__ */ new Set()), [Ee, Qt] = re(0), Ft = v(!1), zt = v(null), De = ne((y, D = "keyboard") => {
    Ft.current = D === "pointer", Qt(y);
  }, []), et = v(null), st = v(null), Mt = v(null), ht = v(null), pt = v(null), Rt = v(0), Pe = Ti(), mt = Kn(), tt = qr(), Ht = Di(), At = ds(), qe = Vo(), z = 8 + (((ke == null ? void 0 : ke.length) || 0) + (ge ? 1 : 0)) * (qe.box + 2), [U, de] = re({ top: 0, left: 0, maxH: 288, ready: !1 }), [Ye, nt] = re(0);
  Zo({
    anchorRef: G ?? et,
    panelRef: ht,
    open: oe,
    maxHeight: K,
    anchorRectRef: pt,
    onPosition: (y) => de({ top: y.top, left: y.left, maxH: y.maxH, ready: y.ready })
  }), le(() => {
    const y = (G == null ? void 0 : G.current) ?? et.current;
    !oe || !y || nt(y.getBoundingClientRect().width);
  }, [oe, Se, G]);
  const [vt, wt] = re(!1);
  le(() => {
    oe && wt(!0);
  }, [oe]);
  const k = Wr({
    visible: oe,
    morph: $,
    anchor: () => {
      var y;
      return ((y = (G == null ? void 0 : G.current) ?? et.current) == null ? void 0 : y.getBoundingClientRect()) ?? null;
    },
    ref: ht,
    cloneOnUnmount: !0,
    onClosed: () => wt(!1)
  }), Z = (C || []).map(
    (y) => typeof y.label == "function" ? y.label(ge) : y.label
  ), V = rt(
    () => Ff({
      items: n,
      groups: e,
      /* show-all mode: the query only moves the highlight, every option stays
         in the list (the old I/E + D/N autocomplete contract). */
      query: A ? "" : ge,
      browseGroups: m || b || g,
      browseAll: I,
      expandedGroups: Ve,
      emptyActionLabels: Z
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [n, e, ge, A, m, b, g, I, Ve, Z.join("\0")]
  ), pe = rt(
    () => (j || []).map((y, D) => ({
      kind: "action",
      label: typeof y.label == "function" ? y.label(ge) : y.label,
      actionIndex: D,
      source: "leading"
    })),
    [j, ge]
  ), we = rt(
    () => (fe || []).map((y, D) => ({
      kind: "action",
      label: typeof y.label == "function" ? y.label(ge) : y.label,
      actionIndex: D,
      source: "footer"
    })),
    [fe, ge]
  ), Ae = V.some((y) => y.kind === "empty"), ze = pe.length > 0 && !(W && Ae), xe = ze ? pe.length : 0, Ie = rt(
    () => [...ze ? pe : [], ...V, ...we],
    [ze, pe, V, we]
  ), Tt = !!d || g && !ge.trim(), Ue = rt(
    () => Ie.map((y, D) => ({ row: y, index: D })).filter((y) => !(y.row.kind === "empty" || y.row.kind === "item" && y.row.hidden || y.row.kind === "group" && !Tt)),
    [Ie, Tt]
  ), mn = (g || b) && !ge.trim(), Me = !!M, kt = rt(
    () => n.filter((y) => y.checkable !== !1).map((y) => y.id),
    [n]
  ), Vt = rt(() => ge.trim() ? Il(n, e, ge).hits.filter((y) => y.item.checkable !== !1).map((y) => y.item.id) : kt, [n, e, ge, kt]), Zt = rt(() => new Set(Vt), [Vt]), Re = is({
    mode: (M == null ? void 0 : M.mode) ?? "draft",
    selectedIds: (M == null ? void 0 : M.selectedIds) ?? ls,
    itemIds: kt,
    visibleIds: Vt,
    max: M == null ? void 0 : M.max,
    disabledIds: M == null ? void 0 : M.disabledIds,
    indicator: M == null ? void 0 : M.indicator,
    onCommit: M == null ? void 0 : M.onCommit,
    onDraftChange: M == null ? void 0 : M.onDraftChange,
    onToggle: M == null ? void 0 : M.onToggle
  }), _t = v(Re.reset);
  _t.current = Re.reset;
  const En = typeof (M == null ? void 0 : M.commitLabel) == "function" ? M.commitLabel(Re.count) : (M == null ? void 0 : M.commitLabel) ?? `Select ${Re.count}`, dt = ne(() => {
    var y;
    _e(!1), t === "expandable" && ((y = st.current) == null || y.blur(), Ze(!1), requestAnimationFrame(() => {
      var D;
      return (D = Mt.current) == null ? void 0 : D.focus();
    })), Te || We(""), De(0), yt(b ? ve : /* @__PURE__ */ new Set()), f == null || f();
  }, [t, f, We, b, ve, Te, _e]);
  le(() => {
    if (ge.trim() || !b) {
      yt((y) => y.size ? /* @__PURE__ */ new Set() : y);
      return;
    }
    yt((y) => y.size === ve.size && [...ve].every((D) => y.has(D)) ? y : ve);
  }, [ge, b, ve]);
  const Mn = v(!1);
  le(() => {
    if (!oe) {
      Mn.current = !1;
      return;
    }
    if (Mn.current || !g || ge.trim()) return;
    const y = N ? [N] : [...(M == null ? void 0 : M.selectedIds) ?? []], D = new Set(y), ee = D.size ? e.filter((ue) => n.some((Ce) => Ce.group === ue.key && D.has(Ce.id))).map((ue) => ue.key) : [];
    if (ee.length === 0) {
      Mn.current = !0;
      return;
    }
    const se = x === "single" ? ee.slice(0, 1) : ee;
    if (!se.every((ue) => Ve.has(ue))) {
      yt(new Set(se));
      return;
    }
    if (te && N) {
      const ue = Ie.findIndex((Ce) => Ce.kind === "item" && Ce.hit.item.id === N);
      ue >= 0 && De(ue);
    }
    Mn.current = !0;
  }, [oe, g, ge, e, n, N, M == null ? void 0 : M.selectedIds, x, Ve, Ie, te, De]);
  const jt = ne((y) => {
    yt((D) => {
      const ee = new Set(D);
      return ee.has(y) ? ee.delete(y) : (x === "single" && ee.clear(), ee.add(y)), ee;
    });
  }, [x]), Ge = ne(() => {
    var D;
    if (oe) {
      (D = st.current) == null || D.focus();
      return;
    }
    if (_t.current(), t === "expandable" && !Se) {
      const ee = et.current;
      if (ee) {
        const se = ee.style.transition, ue = ee.style.width;
        ee.style.transition = "none", ee.style.width = `${R}px`;
        const Ce = ee.getBoundingClientRect();
        pt.current = { left: Ce.left, top: Ce.top, width: Ce.width, height: Ce.height }, ee.style.width = ue, ee.offsetWidth, ee.style.transition = se, window.clearTimeout(Rt.current), Rt.current = window.setTimeout(() => {
          pt.current = null;
        }, fn + 80);
      }
    }
    Ze(!0), _e(!0);
    const y = N ? V.findIndex((ee) => ee.kind === "item" && ee.hit.item.id === N) : -1;
    De(y >= 0 ? xe + y : te ? xe : -1);
  }, [oe, t, Se, R, xe, V, N, te]);
  le(() => () => {
    window.clearTimeout(Rt.current), pt.current = null;
  }, []), le(() => {
    oe || (zt.current = null);
  }, [oe]), le(() => {
    if (t !== "expandable" || !Se || !oe || !T) return;
    const y = requestAnimationFrame(() => {
      var D;
      return (D = st.current) == null ? void 0 : D.focus();
    });
    return () => cancelAnimationFrame(y);
  }, [t, Se, oe, T]), le(() => {
    var ee;
    if (!oe) return;
    const y = ((ee = et.current) == null ? void 0 : ee.ownerDocument) ?? Pe;
    if (!y) return;
    const D = (se) => {
      var Ce, en, Wt, tn;
      const ue = ((Ce = se.composedPath) == null ? void 0 : Ce.call(se)[0]) ?? se.target;
      !ue || typeof ue.nodeType != "number" || (en = et.current) != null && en.contains(ue) || (Wt = ht.current) != null && Wt.contains(ue) || (tn = G == null ? void 0 : G.current) != null && tn.contains(ue) || dt();
    };
    return y.addEventListener("pointerdown", D, !0), () => y.removeEventListener("pointerdown", D, !0);
  }, [oe, dt, Pe, G]);
  const Dt = ne((y) => {
    var D;
    if (y.kind === "item" ? zt.current = y.hit.item.id : (y.kind === "group" || y.kind === "action") && (zt.current = null), y.kind === "group") {
      if (Me) {
        const ee = (D = M == null ? void 0 : M.groupToken) == null ? void 0 : D.call(M, y.group.key);
        if (ee) {
          Re.canToggle(ee) && Re.toggle(ee);
          return;
        }
        const se = n.filter((ue) => ue.group === y.group.key && ue.checkable !== !1 && Zt.has(ue.id) && !Re.isDisabled(ue.id)).map((ue) => ue.id);
        se.length && Re.toggleGroup(se);
        return;
      }
      d ? (d(y.group), p && dt()) : Tt && jt(y.group.key);
      return;
    }
    if (y.kind === "item") {
      if (Me) {
        Re.canToggle(y.hit.item.id) && Re.toggle(y.hit.item.id);
        return;
      }
      u(y.hit.item), p && dt();
      return;
    }
    if (y.kind === "action") {
      const ee = y.source === "leading" ? j : y.source === "footer" ? fe : C, se = ee == null ? void 0 : ee[y.actionIndex];
      se && se.onClick(ge), p && dt();
    }
  }, [dt, p, C, fe, Tt, n, j, M, Me, u, d, ge, Re, jt, Zt]), gn = (y) => {
    if (Ue.length === 0) return;
    let D = Ee;
    if (D < 0 && zt.current) {
      const ue = Ue.find(
        (Ce) => Ce.row.kind === "item" && Ce.row.hit.item.id === zt.current
      );
      ue && (D = ue.index);
    }
    const ee = Ue.findIndex((ue) => ue.index === D), se = ee < 0 ? 0 : (ee + y + Ue.length) % Ue.length;
    De(Ue[se].index);
  };
  Ho(F, () => ({
    moveHighlight: gn,
    activateHighlighted: () => {
      if (Ft.current) return !1;
      const y = Ee >= 0 ? Ie[Ee] : void 0;
      return y ? (Dt(y), De(-1, "keyboard"), !0) : !1;
    },
    close: dt,
    selectAll: () => {
      Me && Re.setAll(!0);
    },
    setSelection: (y) => {
      Re.reset(y);
    }
  }), [Ie, Ee, Dt, dt, Me, Re]);
  const Vn = (y) => {
    if (Me && (y.metaKey || y.ctrlKey) && y.key.toLowerCase() === "a") {
      y.preventDefault(), y.stopPropagation(), Re.setAll(!0);
      return;
    }
    if (y.key === "ArrowDown")
      y.preventDefault(), oe ? gn(1) : Ge();
    else if (y.key === "ArrowUp")
      y.preventDefault(), gn(-1);
    else if ((y.key === "ArrowRight" || y.key === "ArrowLeft") && g && oe && !ge.trim()) {
      const D = Ie[Ee];
      if ((D == null ? void 0 : D.kind) === "group") {
        const ee = Ve.has(D.group.key);
        (y.key === "ArrowRight" || ee) && (y.preventDefault(), jt(D.group.key));
      } else if ((D == null ? void 0 : D.kind) === "item" && y.key === "ArrowLeft" && D.hit.item.group) {
        y.preventDefault();
        const ee = D.hit.item.group;
        Ve.has(ee) && jt(ee);
        const se = Ie.findIndex((ue) => ue.kind === "group" && ue.group.key === ee);
        se >= 0 && De(se);
      }
    } else if (y.key === "Enter") {
      y.preventDefault();
      const D = Ie[Ee] ?? Ie[0];
      D && Dt(D);
    } else y.key === "Escape" && (y.preventDefault(), dt());
  }, fr = (y) => {
    t === "expandable" && !Se || (We(y), oe || _e(!0));
  };
  le(() => {
    if (A) {
      const D = ge.trim().toLowerCase();
      if (!D) {
        const se = N ? V.findIndex((ue) => ue.kind === "item" && ue.hit.item.id === N) : -1;
        De(se >= 0 ? xe + se : -1);
        return;
      }
      const ee = V.findIndex((se) => se.kind === "item" && se.hit.item.label.toLowerCase().includes(D));
      De(ee >= 0 ? xe + ee : -1);
      return;
    }
    if (Te) {
      const D = ge.trim().toLowerCase();
      if (!!D && n.some((se) => se.id.toLowerCase() === D || se.label.toLowerCase() === D)) {
        De(-1);
        return;
      }
      if (!Me) {
        const se = V.findIndex((ue) => ue.kind === "item" && ue.hit.item.tone !== "create");
        if (se >= 0) {
          De(xe + se);
          return;
        }
      }
    }
    const y = V.findIndex((D) => D.kind === "item");
    De(y >= 0 ? xe + y : xe);
  }, [ge]), le(() => {
    if (!oe || ge.trim()) return;
    const y = N ? V.findIndex((D) => D.kind === "item" && D.hit.item.id === N) : -1;
    De(y >= 0 ? xe + y : te ? xe : -1);
  }, [oe]), ft(() => {
    oe && _t.current();
  }, [oe]);
  const Rn = (y) => /* @__PURE__ */ E("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
    ke == null ? void 0 : ke.map((D) => /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        "aria-label": D.label,
        title: D.label,
        tabIndex: Se ? 0 : -1,
        onMouseDown: (ee) => ee.preventDefault(),
        onClick: () => {
          D.onClick(ge, { close: dt }), D.keepOpen || dt();
        },
        style: { width: qe.box, height: qe.box },
        className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
        "data-search-field-action": D.key,
        children: /* @__PURE__ */ h(
          "span",
          {
            style: { width: qe.icon, height: qe.icon },
            className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
            children: D.icon
          }
        )
      },
      D.key
    )),
    ge && /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        "aria-label": "Clear search",
        tabIndex: Se ? 0 : -1,
        onPointerDown: (D) => D.preventDefault(),
        onClick: y,
        style: { width: qe.box, height: qe.box },
        className: "ui-icon-btn flex items-center justify-center rounded",
        children: /* @__PURE__ */ h(Sn, { size: qe.icon })
      }
    )
  ] }), Qr = /* @__PURE__ */ E("div", { className: "relative w-full", children: [
    /* @__PURE__ */ h(Pn, { size: qe.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ h(
      "input",
      {
        ref: st,
        value: ge,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": oe,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (y) => fr(y.target.value),
        onFocus: () => {
          m && Ge();
        },
        onClick: () => {
          m && Ge();
        },
        onKeyDown: Vn,
        placeholder: l,
        style: { paddingRight: z },
        className: `${Ir("sm")} w-full pl-8`
      }
    ),
    Rn(() => {
      We(""), oe || Ge();
    })
  ] }), Zr = /* @__PURE__ */ E("div", { className: "absolute inset-0", children: [
    /* @__PURE__ */ h(Pn, { size: qe.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ h(
      "input",
      {
        ref: st,
        value: ge,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": oe,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (y) => fr(y.target.value),
        onFocus: () => {
          m && Se && Ge();
        },
        onClick: () => {
          m && Se && Ge();
        },
        onKeyDown: Vn,
        placeholder: l,
        tabIndex: Se ? 0 : -1,
        style: { paddingRight: z },
        className: `${Ir("sm")} h-full w-full pl-8`
      }
    ),
    Rn(() => {
      We(""), !oe && Se && Ge();
    })
  ] });
  le(() => {
    if (!oe || Ft.current) return;
    const y = ht.current;
    hn(
      y == null ? void 0 : y.querySelector(`[data-search-row="${Ee}"]`),
      "nearest",
      (y == null ? void 0 : y.querySelector("[data-search-scroller]")) ?? null
    );
  }, [oe, Ee]);
  const An = v(V);
  An.current = V;
  const Yn = v(N);
  Yn.current = N;
  const yn = v(M == null ? void 0 : M.selectedIds);
  yn.current = M == null ? void 0 : M.selectedIds;
  const B = rs({
    open: oe,
    block: "center",
    ready: U.ready,
    scroller: () => {
      var y;
      return ((y = ht.current) == null ? void 0 : y.querySelector("[data-search-scroller]")) ?? null;
    },
    row: () => {
      var ee;
      let y = -1;
      const D = Yn.current;
      if (D)
        y = An.current.findIndex((se) => se.kind === "item" && se.hit.item.id === D);
      else {
        const se = yn.current;
        if (se && se.length) {
          const ue = new Set(se);
          y = An.current.findIndex((Ce) => Ce.kind === "item" && ue.has(Ce.hit.item.id));
        }
      }
      return y < 0 ? null : ((ee = ht.current) == null ? void 0 : ee.querySelector(`[data-search-row="${y}"]`)) ?? null;
    }
  }), ae = (y, D) => {
    const ee = Ee === D, se = !Me && N !== void 0 && y.hit.item.id === N, ue = Me ? Re.isSelected(y.hit.item.id) : se, Ce = !!y.hit.item.disabled || Me && !Re.canToggle(y.hit.item.id), en = y.hit.item.tone === "create" ? S === "light" ? { background: ee ? "#d1fae5" : "#ecfdf5", color: ee ? "#065f46" : "#047857" } : { background: ee ? "rgba(6, 95, 70, 0.7)" : "rgba(6, 78, 59, 0.4)", color: ee ? "#d1fae5" : "#6ee7b7" } : void 0;
    return /* @__PURE__ */ E(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": ue,
        tabIndex: -1,
        "data-search-item": y.hit.item.id,
        "data-search-row": D,
        "data-search-create": y.hit.item.tone === "create" ? "" : void 0,
        onMouseDown: (Wt) => Wt.preventDefault(),
        onMouseEnter: () => De(D, "pointer"),
        onClick: () => Dt(y),
        style: { ...Ht, ...y.hit.item.rowStyle, ...en },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${tt.itemDefault} ${y.hit.item.rowClassName ?? ""} ${se ? "ui-item-selected" : ""} ${ee ? "ui-item-highlighted" : ""} ${Ce ? "opacity-30 pointer-events-none" : ""}`,
        children: [
          Me && y.hit.item.checkable !== !1 && /* @__PURE__ */ h(Ar, { checked: ue, disabled: Ce, indicator: M == null ? void 0 : M.indicator }),
          P ? /* @__PURE__ */ h("span", { className: "flex min-w-0 flex-1 items-center gap-2", children: P(y.hit.item, { checked: ue, disabled: Ce }) }) : /* @__PURE__ */ E(ct, { children: [
            y.hit.item.icon && /* @__PURE__ */ h("span", { className: `${tt.icon} shrink-0`, children: y.hit.item.icon }),
            /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: y.hit.item.label }),
            (y.hit.detail || y.hit.item.detail) && /* @__PURE__ */ h("span", { className: "shrink-0 max-w-[55%] truncate text-[10px] text-zinc-400", children: y.hit.detail || y.hit.item.detail }),
            se && /* @__PURE__ */ h(cr, { className: "ui-icon w-3.5 h-3.5 shrink-0", "aria-hidden": !0 })
          ] })
        ]
      },
      `item:${y.hit.item.id}`
    );
  }, be = (y, D) => {
    var no;
    const ee = Ve.has(y.group.key), se = g && !ge.trim(), ue = Tt, Ce = ue && Ee === D, en = Me ? n.filter((Qe) => Qe.group === y.group.key && Zt.has(Qe.id) && Qe.checkable !== !1) : [], Wt = en.filter((Qe) => !Re.isDisabled(Qe.id)).map((Qe) => Qe.id), tn = Me ? (no = M == null ? void 0 : M.groupToken) == null ? void 0 : no.call(M, y.group.key) : void 0, Qi = !!tn && Re.isSelected(tn), Zi = Qi ? "all" : Wt.length > 0 ? Re.groupState(Wt) : "none", zl = Qi ? en.length : en.reduce((Qe, Dl) => Qe + (Re.isSelected(Dl.id) ? 1 : 0), 0), eo = Me && /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        tabIndex: -1,
        "aria-label": `Select all ${y.group.label}`,
        onMouseDown: (Qe) => Qe.preventDefault(),
        onClick: (Qe) => {
          Qe.stopPropagation(), tn ? Re.toggle(tn) : Wt.length && Re.toggleGroup(Wt);
        },
        className: `shrink-0 flex items-center justify-center rounded ${tn || Wt.length ? "cursor-pointer" : "cursor-not-allowed"}`,
        children: /* @__PURE__ */ h(
          Ar,
          {
            checked: Zi === "all",
            indeterminate: Zi === "some",
            disabled: !tn && Wt.length === 0,
            indicator: M == null ? void 0 : M.indicator
          }
        )
      }
    ), to = Me ? /* @__PURE__ */ E("span", { className: `shrink-0 tabular-nums text-[10px] ${ue ? "text-[color:var(--ui-text-faint)]" : "opacity-70"}`, children: [
      zl,
      "/",
      en.length
    ] }) : y.group.count !== void 0 && /* @__PURE__ */ h("span", { className: `shrink-0 tabular-nums ${ue ? "text-[10px] text-[color:var(--ui-text-faint)]" : "opacity-70"}`, children: y.group.count });
    return ue ? /* @__PURE__ */ E(
      "div",
      {
        role: "option",
        "aria-selected": !1,
        "aria-expanded": se ? ee : void 0,
        "data-search-group": y.group.key,
        onMouseDown: (Qe) => Qe.preventDefault(),
        onMouseEnter: () => De(D, "pointer"),
        onClick: () => {
          se && jt(y.group.key);
        },
        style: Ht,
        className: `w-full rounded flex items-center gap-1 outline-none select-none font-medium ${tt.itemDefault} ${Ce ? "ui-item-highlighted" : ""}`,
        children: [
          eo,
          /* @__PURE__ */ E(
            "button",
            {
              type: "button",
              tabIndex: -1,
              onMouseDown: (Qe) => Qe.preventDefault(),
              onClick: (Qe) => {
                Qe.stopPropagation(), Dt(y);
              },
              className: "flex w-auto min-w-0 max-w-full cursor-pointer items-center gap-2 text-left",
              children: [
                y.group.icon && /* @__PURE__ */ h("span", { className: `${tt.icon} shrink-0`, children: y.group.icon }),
                /* @__PURE__ */ h("span", { className: "truncate", children: y.group.label })
              ]
            }
          ),
          /* @__PURE__ */ h("span", { className: "min-w-0 flex-1" }),
          to,
          se && /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `${ee ? "Collapse" : "Expand"} ${y.group.label}`,
              "aria-expanded": ee,
              onMouseDown: (Qe) => Qe.preventDefault(),
              onClick: (Qe) => {
                Qe.stopPropagation(), jt(y.group.key);
              },
              style: { width: qe.box, height: qe.box },
              className: "shrink-0 flex cursor-pointer items-center justify-center rounded text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text)]",
              children: /* @__PURE__ */ h(
                un,
                {
                  size: qe.icon,
                  className: `transition-transform duration-200 ${ee ? "rotate-180" : ""}`
                }
              )
            }
          )
        ]
      },
      `group:${y.group.key}`
    ) : /* @__PURE__ */ E(
      "div",
      {
        role: "presentation",
        "data-search-group": y.group.key,
        "data-search-row": D,
        style: At,
        className: "w-full flex items-center gap-2 select-none font-semibold uppercase tracking-wider ui-label",
        children: [
          eo,
          y.group.icon && /* @__PURE__ */ h("span", { className: `${tt.icon} shrink-0`, children: y.group.icon }),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: y.group.label }),
          to
        ]
      },
      `group:${y.group.key}`
    );
  }, Xe = (y, D) => {
    var ue;
    const ee = Ee === D, se = y.source === "leading" ? j : y.source === "footer" ? fe : C;
    return /* @__PURE__ */ E(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": !1,
        tabIndex: -1,
        "data-search-action": y.source || "empty",
        "data-search-row": D,
        onMouseDown: (Ce) => Ce.preventDefault(),
        onMouseEnter: () => De(D, "pointer"),
        onClick: () => Dt(y),
        style: Ht,
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${tt.itemDefault} ${ee ? "ui-item-highlighted" : ""}`,
        children: [
          /* @__PURE__ */ h("span", { className: `${tt.icon} shrink-0`, children: ((ue = se == null ? void 0 : se[y.actionIndex]) == null ? void 0 : ue.icon) || /* @__PURE__ */ h(Hr, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: y.label })
        ]
      },
      `${y.source || "empty"}:${y.actionIndex}`
    );
  }, je = () => /* @__PURE__ */ h("div", { className: "px-3 py-3 text-center", "data-search-empty": !0, children: X ? X({ query: ge, close: dt }) : /* @__PURE__ */ E(ct, { children: [
    /* @__PURE__ */ h("div", { className: "mx-auto mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-400", children: /* @__PURE__ */ h(Pn, { className: "w-3.5 h-3.5" }) }),
    /* @__PURE__ */ h("div", { className: "text-xs font-medium text-zinc-500", children: H || `No matches for “${ge.trim()}”` }),
    /* @__PURE__ */ h("div", { className: "mt-0.5 text-[10px] text-zinc-400", children: _ || "Try a name, phone number, board ID or category." })
  ] }) }, "__empty"), Yt = [];
  for (let y = 0; y < V.length; y++) {
    const D = V[y];
    if (D.kind === "group") {
      const ee = [];
      let se = y + 1;
      for (; se < V.length && V[se].kind === "item" && V[se].hit.item.group === D.group.key; )
        ee.push({ row: V[se], index: se }), se++;
      Yt.push({ group: D, index: y, items: ee }), y = se - 1;
    } else D.kind === "item" ? Yt.push({ row: D, index: y }) : Yt.push({ row: D, index: y });
  }
  const Un = oe || vt ? _r(
    /* @__PURE__ */ E(
      "div",
      {
        ref: k,
        id: "search-menu-panel",
        "data-theme": S,
        role: "listbox",
        "aria-label": l,
        "aria-multiselectable": Me ? !0 : void 0,
        onPointerEnter: B.engage,
        onPointerDown: (y) => {
          y.stopPropagation(), B.engage();
        },
        onMouseDown: (y) => y.stopPropagation(),
        onClick: (y) => y.stopPropagation(),
        onPointerLeave: () => {
          Ft.current && De(-1, "pointer");
        },
        className: "click-outside-ignore ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none min-w-0 overflow-hidden pointer-events-auto",
        style: {
          position: "fixed",
          left: U.left,
          top: U.top,
          width: J ?? (t === "expandable" ? R : Ye || void 0),
          minWidth: O,
          maxHeight: U.maxH,
          visibility: U.ready ? "visible" : "hidden"
        },
        children: [
          ze && /* @__PURE__ */ E("div", { className: "shrink-0 pb-1", children: [
            pe.map((y, D) => Xe(y, D)),
            V.length > 0 && /* @__PURE__ */ h("div", { className: tt.separator })
          ] }),
          /* @__PURE__ */ E("div", { "data-search-scroller": !0, className: "overflow-y-auto scrollbar-custom flex flex-col min-h-0", children: [
            V.length === 0 && /* @__PURE__ */ h("div", { className: "px-3 py-3 text-xs text-zinc-400", "data-search-empty": !0, children: X ? X({ query: ge, close: dt }) : /* @__PURE__ */ h(ct, { children: "Type to search…" }) }),
            Yt.map((y) => {
              if (y.group) {
                const se = Ve.has(y.group.group.key), ue = y.items || [];
                return /* @__PURE__ */ E(lt.Fragment, { children: [
                  be(y.group, xe + y.index),
                  mn && /* @__PURE__ */ h(
                    "div",
                    {
                      "data-search-group-items": y.group.group.key,
                      "aria-hidden": !se,
                      className: "motion-reduce:transition-none",
                      style: {
                        display: "grid",
                        gridTemplateRows: se ? "1fr" : "0fr",
                        opacity: se ? 1 : 0,
                        transition: "grid-template-rows 220ms cubic-bezier(0.32, 0.72, 0, 1), opacity 150ms ease"
                      },
                      children: /* @__PURE__ */ h("div", { className: "overflow-hidden flex flex-col", children: ue.map((Ce) => ae(Ce.row, xe + Ce.index)) })
                    }
                  ),
                  !mn && ue.map((Ce) => ae(Ce.row, xe + Ce.index))
                ] }, `group:${y.group.group.key}`);
              }
              const D = y.row, ee = xe + y.index;
              return D.kind === "empty" ? je() : D.kind === "action" ? Xe(D, ee) : D.kind === "item" ? ae(D, ee) : null;
            })
          ] }),
          we.length > 0 && /* @__PURE__ */ E("div", { className: "shrink-0", children: [
            /* @__PURE__ */ h("div", { className: tt.separator }),
            we.map((y, D) => Xe(y, xe + V.length + D))
          ] }),
          Me && (M == null ? void 0 : M.footer) !== !1 && /* @__PURE__ */ h(
            as,
            {
              count: Re.count,
              max: M == null ? void 0 : M.max,
              hiddenCount: (M == null ? void 0 : M.hiddenNote) === !1 ? 0 : Re.hiddenCount,
              clear: (M == null ? void 0 : M.clear) !== !1,
              theme: S,
              onClear: Re.clear,
              hero: (M == null ? void 0 : M.mode) === "live" ? void 0 : {
                label: En,
                onClick: () => {
                  Re.commit(), dt();
                },
                disabled: Re.count === 0
              }
            }
          )
        ]
      }
    ),
    Y ?? mt ?? (Pe == null ? void 0 : Pe.body) ?? document.body
  ) : null;
  return ie ? /* @__PURE__ */ E(ct, { children: [
    /* @__PURE__ */ h("div", { ref: et, "data-search-menu": !0, "data-mode": "hidden", className: "hidden", "aria-hidden": !0 }),
    Un
  ] }) : t === "inline" ? /* @__PURE__ */ E("div", { ref: et, "data-search-menu": !0, "data-mode": t, className: "relative inline-flex", style: { width: "100%" }, children: [
    Qr,
    Un
  ] }) : /* @__PURE__ */ h(
    Gi,
    {
      expanded: Se,
      collapsedWidth: w,
      expandedWidth: R,
      rootRef: et,
      "data-search-menu": !0,
      "data-mode": t,
      trigger: ye ? ye({ open: oe, expanded: Se, toggle: Ge }) : /* @__PURE__ */ h(
        Ct,
        {
          ref: Mt,
          type: "button",
          variant: o,
          size: "minimal",
          theme: S === "dark" ? "dark" : "light",
          icon: i ?? /* @__PURE__ */ h(Pn, { className: "w-3.5 h-3.5" }),
          onClick: Ge,
          className: `w-full justify-start ${Se ? "pointer-events-none" : ""} ${s ?? ""}`,
          tabIndex: Se ? -1 : 0,
          "data-search-trigger": !0,
          children: /* @__PURE__ */ h("span", { children: r })
        }
      ),
      field: /* @__PURE__ */ E(ct, { children: [
        Zr,
        Un
      ] })
    }
  );
}
function kn(n, e = "id") {
  return e === "label" ? n.label : n.id;
}
function $l(n, e, t = "id") {
  const r = e.find((i) => kn(i, t) === n);
  return (r == null ? void 0 : r.label) || n;
}
function _f(n) {
  return n.split(",").map((e) => e.trim()).filter(Boolean);
}
function jf(n) {
  const e = n.split(",");
  return (e[e.length - 1] || "").trim();
}
function Xi(n, e, t = "id") {
  const r = n.trim();
  if (!r) return "";
  const i = e.find((l) => kn(l, t) === r);
  if (i) return kn(i, t);
  const o = r.toLowerCase(), s = e.find((l) => l.label.toLowerCase() === o);
  return s ? kn(s, t) : r;
}
function Wf(n, e, t = "id") {
  const r = /* @__PURE__ */ new Set(), i = [];
  for (const o of _f(n)) {
    const s = Xi(o, e, t);
    !s || r.has(s) || (r.add(s), i.push(s));
  }
  return i;
}
function qf(n, e, t = "id") {
  const r = n.split(",").map((l) => l.trim()).filter(Boolean), i = n.trimEnd().endsWith(",") ? r : r.slice(0, -1), o = /* @__PURE__ */ new Set(), s = [];
  for (const l of i) {
    const c = Xi(l, e, t);
    !c || o.has(c) || (o.add(c), s.push(c));
  }
  return s;
}
function Kf(n, e, t = "id") {
  const r = n.trim();
  if (!r) return !0;
  const i = r.toLowerCase();
  return e.some((o) => kn(o, t).toLowerCase() === i || o.label.toLowerCase() === i);
}
function Jf(n, e, t = "id") {
  const r = new Set(e.map((i) => kn(i, t)));
  return n.filter((i) => !r.has(i));
}
function Bo(n, e, t, r, i) {
  return i ? i([...n], [...e]) : r === "count" ? n.length ? `${n.length} selected` : "" : r === "chips" ? "" : n.map((o) => $l(o, e, t)).join(", ");
}
const Vf = () => {
};
function Qh({
  values: n,
  onChange: e,
  items: t,
  groups: r = [],
  resolveBy: i = "id",
  mode: o = "multiple",
  appearance: s = "inline",
  display: l = "names",
  formatDisplay: c,
  formatEditing: a,
  renderTrigger: u,
  renderItem: d,
  badge: f,
  trailing: p,
  anchoredKeys: m,
  anchoredLabel: g = "Element link anchor",
  placeholder: b = "Select…",
  readOnly: x = !1,
  inputReadOnly: I = !1,
  disabled: N = !1,
  autoFocus: T = !1,
  defaultOpen: w = !1,
  selectAllOnOpen: R = !0,
  uppercase: J = !1,
  allowFreeText: O = !0,
  theme: A,
  className: K = "",
  style: S,
  panelWidth: $,
  panelMinWidth: H,
  initialQuery: _,
  keepAllRows: X = !1,
  maxMenuHeight: C,
  portalTarget: j,
  autoGrow: W = !1,
  skipComma: fe = !1,
  collapsedWidth: ke = 140,
  expandedWidth: M = 280,
  createLabel: me,
  onCreateItem: he,
  onExit: ie,
  onEscape: G,
  onTabExit: Y,
  loadItems: ye,
  emptyTitle: P,
  emptyHint: te,
  sortItems: F,
  max: Q,
  disabledIds: He,
  indicator: Ne,
  browse: ge,
  groupToken: We
}) {
  const Te = Xt(), Oe = A ?? (Te == null ? void 0 : Te.mode) ?? "light", Be = Fe(), oe = ne((B) => kn(B, i), [i]), _e = rt(() => t.map(oe), [t, oe]), Se = rt(() => new Map(t.map((B) => [oe(B), B])), [t, oe]), Ze = ne((B) => $l(B, t, i), [t, i]), bt = rt(() => new Set([...m ?? []].map((B) => B.toLowerCase())), [m]), [ve, Ve] = re(!1), [yt, Ee] = re(""), [Qt, Ft] = re(() => {
    const B = _ ?? "";
    return J ? B.toUpperCase() : B;
  }), [zt, De] = re(Qt), [et, st] = re(() => [...n]), [Mt, ht] = re(null), [pt, Rt] = re(!1), Pe = v(null), mt = v(null), tt = v(null), Ht = v(null), At = v(null), qe = v(n.join("\0")), It = v(!1), z = v(/* @__PURE__ */ new Set()), U = v(!1), de = v(!1), Ye = v(!1), nt = v(0), vt = v(""), wt = v([...n]), k = n.join("\0"), Z = rt(
    () => Bo(n, t, i, l, c),
    [n, t, i, l, c]
  ), V = ne((B) => {
    if (a) return a([...B], t);
    if (o === "single") return B[0] ? Ze(B[0]) : "";
    const ae = B.map(Ze).join(", ");
    return fe ? ae : B.length ? `${ae}, ` : "";
  }, [a, t, o, Ze, fe]);
  le(() => {
    ve || (st([...n]), wt.current = [...n], qe.current = k);
  }, [k, ve]);
  const pe = ne(() => {
    if (ve || x || N) return;
    It.current = !1, U.current = !0;
    const B = V(n);
    vt.current = B, wt.current = [...n], st([...n]), Ee(B), De(Qt), Ft(""), Ve(!0);
  }, [ve, x, N, n, V, Qt]);
  ft(() => {
    if (!ve) return;
    const B = Pe.current ?? mt.current;
    B && (B.focus(), (B instanceof HTMLInputElement || B instanceof HTMLTextAreaElement) && (o === "single" && R ? B.setSelectionRange(0, B.value.length) : B.setSelectionRange(B.value.length, B.value.length)));
  }, [ve]), ft(() => {
    if (!Ye.current) return;
    Ye.current = !1;
    const B = Pe.current;
    B && (B.focus(), B.setSelectionRange(B.value.length, B.value.length));
  }, [yt]), le(() => {
    (w || T) && pe();
  }, []);
  const we = o === "single" ? zt : jf(yt), Ae = ye ? Mt ?? [] : t, ze = rt(
    () => F ? F(Ae, et) : Ae,
    [Ae, F, et]
  ), xe = we.trim(), Ie = !!he && O && !pt && !!xe && !Kf(xe, Ae, i);
  le(() => {
    if (!ye || !ve) return;
    const B = we.trim();
    if (!B) {
      ht(null), Rt(!1);
      return;
    }
    Rt(!0);
    const ae = ++nt.current, be = setTimeout(() => {
      ye(B).then((Xe) => {
        nt.current === ae && (ht(Xe), Rt(!1));
      }).catch(() => {
        nt.current === ae && (ht([]), Rt(!1));
      });
    }, 400);
    return () => clearTimeout(be);
  }, [ye, ve, we]);
  const Tt = rt(() => {
    const B = ze.filter((ae) => !ae.hidden).map((ae) => ({
      id: oe(ae),
      label: ae.label,
      group: ae.group,
      detail: ae.detail,
      icon: ae.icon,
      disabled: !!ae.disabled || !!(He != null && He.includes(oe(ae))),
      fields: ae.fields,
      keywords: ae.keywords,
      rowClassName: ae.rowClassName,
      rowStyle: ae.rowStyle
    }));
    return Ie && B.unshift({
      id: xe,
      label: me ? me(xe) : `Add “${xe}”…`,
      keywords: xe,
      checkable: !1,
      tone: "create",
      pinned: !0
    }), B;
  }, [ze, oe, He, Ie, xe, me]), Ue = ne((B) => {
    const ae = B.join("\0");
    if (ae !== qe.current) {
      if (xn(B, n)) {
        qe.current = ae;
        return;
      }
      if (qe.current = ae, e(B), he)
        for (const be of Jf(B, t, i))
          z.current.has(be) || (z.current.add(be), he(be));
    }
  }, [n, e, he, t, i]), mn = ne((B, ae) => {
    !ae || !he || !O || t.some((be) => oe(be) === B) || z.current.has(B) || (z.current.add(B), he(B));
  }, [he, O, t, oe]), Me = ne((B = !0) => {
    if (!U.current || (U.current = !1, x || N)) return;
    if (It.current) {
      It.current = !1;
      return;
    }
    const ae = vt.current, be = new Set(_e), Xe = o === "single" ? (() => {
      const je = ae.trim();
      if (!je) return O ? [] : n;
      const Yt = Xi(je, t, i);
      return !O && !be.has(Yt) ? n : [Yt];
    })() : Lt(
      Wf(ae, t, i).filter((je) => O || be.has(je)),
      _e
    );
    wt.current = Xe, st(Xe), De(""), Ve(!1), Ue(Xe), B && !de.current && (ie == null || ie());
  }, [x, N, o, t, i, _e, O, n, Ue, ie]), kt = ne((B) => {
    Ve(B), B || Me();
  }, [Me]), Vt = ne(() => {
    It.current = !0, U.current = !1;
    const B = V(n);
    vt.current = B, wt.current = [...n], st([...n]), Ee(B), De(""), Ve(!1), G == null || G();
  }, [n, V, G]);
  le(() => {
    var Xe;
    if (!ve) return;
    const ae = (((Xe = tt.current) == null ? void 0 : Xe.ownerDocument) ?? document).defaultView;
    if (!ae) return;
    const be = (je) => {
      je.key === "Escape" && (je.preventDefault(), je.stopImmediatePropagation(), Vt());
    };
    return ae.addEventListener("keydown", be, !0), () => ae.removeEventListener("keydown", be, !0);
  }, [ve, Vt]);
  const Zt = ne((B) => {
    const ae = Lt(B, _e), be = V(ae);
    wt.current = ae, vt.current = be, st(ae), Ye.current = !0, Ee(be);
  }, [_e, V]), Re = ne((B) => {
    const ae = B.id;
    U.current = !1;
    const be = Ze(ae);
    wt.current = [ae], vt.current = be, st([ae]), Ee(be), De(""), Ve(!1), Ue([ae]), de.current || ie == null || ie();
  }, [Ze, Ue, ie]), _t = (B) => {
    var ae, be, Xe, je, Yt;
    if (B.key === "Escape") {
      B.preventDefault(), Vt();
      return;
    }
    if (B.key === "Tab") {
      if (B.preventDefault(), o === "single" && ve) {
        de.current = !0;
        const Un = (ae = At.current) == null ? void 0 : ae.activateHighlighted();
        if (de.current = !1, Un) {
          (be = Y ?? ie) == null || be(Pe.current ?? void 0);
          return;
        }
      }
      ve && Me(!1), (Xe = Y ?? ie) == null || Xe(Pe.current ?? void 0);
      return;
    }
    if (B.key === "ArrowDown" || B.key === "ArrowUp") {
      if (B.preventDefault(), !ve) {
        pe();
        return;
      }
      (je = At.current) == null || je.moveHighlight(B.key === "ArrowDown" ? 1 : -1);
      return;
    }
    if (B.key === "Enter") {
      if (B.preventDefault(), B.stopPropagation(), ve && ((Yt = At.current) != null && Yt.activateHighlighted())) return;
      Me();
      return;
    }
  }, En = (B) => {
    var be;
    const ae = J ? B.target.value.toUpperCase() : B.target.value;
    if (vt.current = ae, Ee(ae), o === "single" && De(ae), ve || (U.current = !0, It.current = !1, Ve(!0)), o === "multiple") {
      const Xe = Lt(qf(ae, t, i), _e);
      wt.current = Xe, st(Xe), (be = At.current) == null || be.setSelection(Xe);
    }
  }, dt = () => {
    if (U.current) {
      if (It.current) {
        It.current = !1;
        return;
      }
      Me();
    }
  }, Mn = ne((B, ae) => {
    const be = Se.get(B.id);
    if (!be)
      return /* @__PURE__ */ E(ct, { children: [
        /* @__PURE__ */ h(Hr, { className: "h-3.5 w-3.5 shrink-0" }),
        /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: B.label })
      ] });
    const Xe = !!m && (i === "label" ? bt.has(be.label.toLowerCase()) : m.has(oe(be))), je = (f == null ? void 0 : f(be)) ?? be.badge ?? null;
    return /* @__PURE__ */ E(ct, { children: [
      d ? d(be, ae.checked) : /* @__PURE__ */ E(ct, { children: [
        be.icon && /* @__PURE__ */ h("span", { className: "shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5", children: be.icon }),
        /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: be.label }),
        je && /* @__PURE__ */ h("span", { className: "shrink-0 text-[10px] text-[color:var(--ui-text-faint)]", children: je }),
        p == null ? void 0 : p(be)
      ] }),
      Xe && /* @__PURE__ */ h("span", { className: "shrink-0 inline-flex", title: g, "aria-label": g, children: /* @__PURE__ */ h(Jl, { className: "h-3.5 w-3.5 text-amber-500" }) })
    ] });
  }, [Se, m, bt, i, oe, f, d, p, g]), jt = /* @__PURE__ */ h(
    Hf,
    {
      ref: At,
      mode: "inline",
      hideTrigger: !0,
      open: ve,
      onOpenChange: kt,
      anchorRef: s === "morph" ? Ht : tt,
      items: Tt,
      groups: r,
      query: we,
      onSelect: Re,
      closeOnSelect: o === "single",
      selectedId: o === "single" ? et[0] : void 0,
      multiple: o === "multiple" ? {
        selectedIds: et,
        mode: "live",
        onDraftChange: Zt,
        onToggle: mn,
        onCommit: Vf,
        max: Q,
        disabledIds: He,
        indicator: Ne,
        groupToken: We
      } : void 0,
      openOnFocus: !1,
      autoFocus: !1,
      highlightOnOpen: o === "single",
      browseAll: r.length === 0,
      browseExpanded: r.length > 0 && (ge ?? "open") === "open",
      expandableGroups: r.length > 0 && ge === "accordion",
      groupExpandMode: "single",
      renderItem: Mn,
      emptyTitle: pt ? "Searching…" : P,
      emptyHint: pt ? "Fetching matching records." : te,
      theme: Oe,
      panelWidth: $,
      panelMinWidth: H,
      keepAllRows: X,
      maxMenuHeight: C,
      portalTarget: j
    }
  ), Ge = s === "chip", Dt = s === "wrap", gn = !Ge && !Dt && W, Vn = !ve && !Z, fr = ve ? yt : Z, Rn = {
    ref: Pe,
    /* Chip: the INPUT holds the committed keys (cast reads "1") while the
       overlay renders the resolved face ("1. GEORGE") — the old
       EntityDropdown's transparent-input contract. */
    value: ve ? yt : Ge ? n.join(", ") : Z,
    disabled: N,
    readOnly: I,
    placeholder: "",
    onFocus: pe,
    onClick: pe,
    onChange: En,
    onBlur: dt,
    onKeyDown: _t,
    autoComplete: "off",
    spellCheck: !1
  }, Qr = L(5, 7, Be), Zr = L(9, 12, Be), An = L(12, 14, Be);
  if (s === "button") {
    const B = (je) => _t(je), ae = ve ? et : n, be = Bo(ae, t, i, l, c), Xe = !be;
    return /* @__PURE__ */ E(
      "div",
      {
        ref: tt,
        "data-picker-field": !0,
        className: `relative ${K}`,
        style: S,
        onMouseDown: (je) => je.stopPropagation(),
        onContextMenu: (je) => {
          je.preventDefault(), je.stopPropagation();
        },
        children: [
          u ? /* @__PURE__ */ h("span", { className: "pointer-events-none flex w-full min-w-0 items-center", children: u({ values: [...ae], items: t, display: be, open: ve, toggle: pe }) }) : /* @__PURE__ */ E(
            Ct,
            {
              ref: mt,
              variant: "outline",
              theme: Oe === "dark" ? "dark" : "light",
              disabled: N,
              onClick: x ? void 0 : () => ve ? Me() : pe(),
              onKeyDown: B,
              "data-state": ve ? "open" : "closed",
              "aria-haspopup": "listbox",
              "aria-expanded": ve,
              className: "w-full justify-between gap-2",
              children: [
                l === "chips" && ae.length > 0 ? /* @__PURE__ */ h("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1 overflow-hidden", children: ae.map((je) => /* @__PURE__ */ h(
                  "span",
                  {
                    className: "inline-flex items-center rounded border border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-1.5 py-0.5 text-[10px] text-[color:var(--ui-text)]",
                    children: Ze(je)
                  },
                  je
                )) }) : /* @__PURE__ */ h("span", { className: `min-w-0 flex-1 truncate text-left ${Xe ? "italic text-[color:var(--ui-text-faint)]" : ""}`, children: be || b }),
                /* @__PURE__ */ h(un, { className: "h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" })
              ]
            }
          ),
          jt
        ]
      }
    );
  }
  if (s === "morph")
    return /* @__PURE__ */ h(
      Gi,
      {
        expanded: ve,
        collapsedWidth: ke,
        expandedWidth: M,
        rootRef: tt,
        "data-picker-field": !0,
        className: K,
        style: S,
        trigger: u ? u({ values: [...n], items: t, display: Z, open: ve, toggle: pe }) : (
          /* The collapsed face IS the chip: one trigger recipe for both
             faces, so a morph picker matches every other value field. */
          /* @__PURE__ */ E(
            "button",
            {
              type: "button",
              disabled: N,
              onClick: pe,
              className: "ui-press flex w-full cursor-pointer select-none items-center justify-between gap-2 rounded-[var(--ui-radius-btn)] border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left outline-none transition-colors hover:border-[color:var(--ui-input-focus-border)] disabled:cursor-default disabled:opacity-50",
              style: { padding: `${Qr}px ${Zr}px`, fontSize: An },
              children: [
                /* @__PURE__ */ h("span", { className: `min-w-0 flex-1 truncate ${Vn ? "italic text-[color:var(--ui-text-muted)]" : ""}`, children: Z || b }),
                /* @__PURE__ */ h(un, { className: "pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" })
              ]
            }
          )
        ),
        field: /* @__PURE__ */ E("div", { ref: Ht, className: "relative h-full", children: [
          /* @__PURE__ */ h(
            "input",
            {
              ...Rn,
              className: `${Ir("sm")} h-full w-full`
            }
          ),
          jt
        ] })
      }
    );
  const Yn = Ge ? L(5, 7, Be) : 0, yn = Ge ? L(9, 12, Be) : 0;
  return x ? /* @__PURE__ */ h(
    "div",
    {
      ref: tt,
      "data-picker-field": !0,
      className: `relative ${Ge ? "flex w-full items-center gap-1.5 rounded border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left" : Dt ? "min-h-[1lh] w-full pb-[1lh]" : "h-[1lh] w-full"} ${K}`,
      style: Ge ? { padding: `${Yn}px ${yn}px`, fontSize: L(12, 14, Be), ...S } : S,
      children: /* @__PURE__ */ h(
        "input",
        {
          readOnly: !0,
          tabIndex: -1,
          value: Z,
          className: Ge ? "w-full min-w-0 bg-transparent outline-none" : "absolute inset-0 h-full w-full bg-transparent text-inherit outline-none",
          style: { color: "inherit", caretColor: "transparent" }
        }
      )
    }
  ) : /* @__PURE__ */ E(
    "div",
    {
      ref: tt,
      "data-picker-field": !0,
      className: `relative ${Ge ? "ui-press flex w-full items-center gap-1.5 rounded-[var(--ui-radius-btn)] border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left outline-none focus-within:border-[color:var(--ui-input-focus-border)]" : Dt ? "min-h-[1lh] w-full pb-[1lh]" : gn ? "w-max max-w-[400px] min-w-[72px]" : "h-[1lh] w-full"} ${K}`,
      style: Ge ? { padding: `${Yn}px ${yn}px`, fontSize: An, ...S } : S,
      onMouseDown: (B) => B.stopPropagation(),
      onContextMenu: (B) => {
        B.preventDefault(), B.stopPropagation();
      },
      onAuxClick: pe,
      children: [
        Ge && u ? /* @__PURE__ */ h("span", { className: "pointer-events-none flex min-w-0 flex-1 items-center", children: u({ values: [...n], items: t, display: Z, open: ve, toggle: pe }) }) : l === "chips" && !ve ? /* @__PURE__ */ E("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1", children: [
          n.map((B) => /* @__PURE__ */ h(
            "span",
            {
              className: "inline-flex items-center rounded border border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-1.5 py-0.5 text-[10px] text-[color:var(--ui-text)]",
              children: Ze(B)
            },
            B
          )),
          n.length === 0 && /* @__PURE__ */ h("span", { className: "italic text-[color:var(--ui-text-muted)]", children: b })
        ] }) : /* @__PURE__ */ h(
          "span",
          {
            className: `pointer-events-none text-left ${Ge ? "min-w-0 flex-1 truncate" : Dt ? "block whitespace-pre-wrap break-words leading-relaxed" : "absolute inset-y-0 inset-x-0 flex items-center truncate whitespace-nowrap"} ${Vn ? "italic text-[color:var(--ui-text-muted)]" : ""}`,
            children: fr || b
          }
        ),
        Dt ? /* @__PURE__ */ h(
          "textarea",
          {
            ...Rn,
            rows: 1,
            className: "absolute inset-0 h-full w-full resize-none overflow-hidden whitespace-pre-wrap break-words bg-transparent text-transparent outline-none",
            style: { caretColor: "#2563eb", color: "transparent" }
          }
        ) : /* @__PURE__ */ h(
          "input",
          {
            ...Rn,
            className: gn ? "block w-full bg-transparent text-transparent outline-none" : "absolute inset-0 h-full w-full bg-transparent text-transparent outline-none",
            style: gn ? { fieldSizing: "content", width: "auto", minWidth: 72, maxWidth: 400, caretColor: "#2563eb", color: "transparent" } : Ge ? { caretColor: "#2563eb", color: "transparent", paddingLeft: yn, paddingRight: yn + 16 } : { caretColor: "#2563eb", color: "transparent" }
          }
        ),
        Ge && /* @__PURE__ */ h(un, { className: "pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" }),
        jt
      ]
    }
  );
}
export {
  Ct as Button,
  Gh as CardSection,
  Ii as CheckMark,
  Ac as Checkbox,
  $h as Checklist,
  Wh as ChromeHeader,
  jh as ContentRow,
  vh as ContextMenu,
  kh as ContextMenuDivider,
  wh as ContextMenuItem,
  Sh as ContextMenuSub,
  Qo as DROPDOWN_MAX_HEIGHT,
  Ih as DatePicker,
  Ch as DialogProvider,
  _c as DropdownItem,
  Jr as DropdownMenu,
  jc as DropdownSubmenu,
  $i as DropdownThemeContext,
  Mf as FONTS,
  Dh as FloatingChrome,
  Ah as FloatingToggle,
  Af as FontMenu,
  Yh as FormatToolbar,
  ot as IS_COARSE,
  gc as IS_TOUCH_CAPABLE,
  bh as ItemManagerDropdown,
  Mh as LongPressMenuProvider,
  Ci as MORPH_EASE,
  fn as MORPH_MS,
  Ei as MORPH_OPACITY_MS,
  dr as MenuHighlightContext,
  hs as MenuSearchContext,
  qc as Modal,
  Nh as ModalFooter,
  mr as ModalFooterButton,
  Xh as MorphActionField,
  Lf as MorphSearchField,
  ls as NO_SELECTION_IDS,
  Uh as NumberInput,
  Qh as PickerField,
  mc as PopoutWindowContext,
  Vh as RICH_TEXT_STATE_IDLE,
  zh as RadioList,
  Ef as RichTextEditor,
  zf as SCRUB_PX_PER_STEP,
  Hf as SearchMenu,
  _h as SectionHeader,
  Hh as Seg,
  Ar as SelectionCheck,
  ss as SelectionContext,
  as as SelectionFooter,
  qh as StructureControls,
  Pi as SubmenuContext,
  xh as TAB_PILL,
  ua as TB_BTN,
  gr as TB_BTN_ICON,
  da as TB_DANGER,
  vs as TB_DIVIDER,
  fa as TB_INPUT,
  Fh as TB_NUM,
  pa as TB_PICKER,
  Ph as TB_ROW_LABEL,
  ha as TB_SEG,
  Lh as TB_TOGGLE,
  Bh as TB_TOGGLE_OFF,
  Oh as TB_TOGGLE_ON,
  cs as TabFace,
  gh as ThemeProvider,
  yh as ThemeScope,
  bf as Token,
  xf as TokenChipView,
  yr as ToolButton,
  zn as Tooltip,
  Mi as ZOOM_FROM,
  Ff as buildSearchMenuRows,
  Nc as buttonCloudOf,
  Ui as clampNumber,
  vc as cloneOverlayClose,
  L as coarsePx,
  Mc as countHidden,
  Jh as escapeHtml,
  Bo as formatPickerValues,
  Jo as getCoarseScale,
  qr as getDropdownClasses,
  ph as getHardwareKeyboard,
  hh as getLastPointerType,
  oo as groupSelectionState,
  Kf as hasPickerMatch,
  Ir as inputCls,
  Zc as isInteractiveElement,
  hi as isTouchLike,
  jf as lastPickerSegment,
  Bf as matchSearchItem,
  ns as menuAttributesOf,
  kc as menuThemeOf,
  Go as nearestOverlayOrigin,
  Rl as normalizeSpaces,
  Lt as orderByCatalogue,
  ei as overlayMorphEnabled,
  Of as parseSearchTags,
  qf as pickerCommittedKeys,
  kn as pickerItemKey,
  $l as pickerItemLabel,
  _f as pickerSegments,
  bc as playOverlayClose,
  xc as playOverlayOpen,
  Po as preprocessTokenHtml,
  Xi as resolvePickerSegment,
  Wf as resolvePickerText,
  hn as revealRowInScroller,
  xn as sameSelection,
  mf as sanitizeRichText,
  Df as scrubbedValue,
  Il as searchMenuContent,
  Sc as segModeOf,
  dh as setCoarseScale,
  io as setSelected,
  $f as steppedValue,
  Kh as stripRichText,
  gf as stripTokenWrappers,
  Ec as toggleSelected,
  Jf as unknownPickerValues,
  fh as useCoarse,
  Fe as useCoarseScale,
  dn as useCoarseSize,
  Ti as useCurrentDocument,
  ar as useCurrentWindow,
  Th as useDialog,
  Zo as useDropdownPosition,
  us as useDropdownTheme,
  mh as useHardwareKeyboard,
  xs as useInputSize,
  Di as useItemSize,
  Xt as useKitTheme,
  yc as useLastPointerType,
  Eh as useLongPressOptOut,
  Li as useMenuHighlight,
  Bc as useMenuSearch,
  Wr as useOverlayMorph,
  Ni as usePopoutWindow,
  Kn as usePortalTarget,
  rs as useRevealRowOnOpen,
  is as useSelection,
  Rc as useSelectionContext,
  aa as useSlidingPill,
  Rh as useTouchMode
};
