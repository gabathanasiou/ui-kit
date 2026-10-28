"use client";
import { jsx as h, jsxs as C, Fragment as st } from "react/jsx-runtime";
import ot, { createContext as Yt, useContext as Ut, useState as re, useEffect as se, useRef as w, useCallback as ee, useLayoutEffect as dt, useMemo as Qe, useId as zl, useImperativeHandle as Bo } from "react";
import * as Pe from "@radix-ui/react-dropdown-menu";
import { Minus as Dl, Check as lr, Search as xn, X as Sn, Pencil as Pl, Copy as Fo, Trash2 as ui, RotateCcw as Ho, Plus as Fr, ChevronRight as Er, ChevronLeft as Ll, ArrowUp as Ol, ArrowDown as Bl, ChevronDown as fn, Underline as Fl, Strikethrough as Hl, RemoveFormatting as _l, Link as jl, ChevronUp as Wl, Anchor as ql } from "lucide-react";
import { computePosition as Kl, offset as _o, flip as jo, shift as Wo, size as Jl, useFloating as Vl, autoUpdate as Yl } from "@floating-ui/react-dom";
import * as cn from "@radix-ui/react-dialog";
import { createPortal as Hr } from "react-dom";
import { mergeAttributes as Ul, ReactNodeViewRenderer as Gl, NodeViewWrapper as Xl, useEditor as Ql, EditorContent as Zl } from "@tiptap/react";
import { PluginKey as Jt, Plugin as rn, Selection as zn, TextSelection as Bt, NodeSelection as On, AllSelection as ec } from "@tiptap/pm/state";
import { DecorationSet as fr, Decoration as tc } from "@tiptap/pm/view";
import nc from "@tiptap/starter-kit";
import rc from "@tiptap/extension-placeholder";
import { TextStyle as ic, FontFamily as oc, FontSize as sc } from "@tiptap/extension-text-style";
import lc from "@tiptap/extension-color";
import cc from "@tiptap/extension-link";
import ac from "@tiptap/extension-underline";
import uc from "@tiptap/suggestion";
import { Mention as dc } from "@tiptap/extension-mention";
import { createRoot as fc } from "react-dom/client";
const hc = Yt(null);
function ki() {
  return Ut(hc);
}
function _n() {
  const n = ki();
  return n ? n.document.body : null;
}
function Si() {
  const n = ki();
  return n ? n.document : typeof document < "u" ? document : null;
}
function cr() {
  return ki() ?? (typeof window < "u" ? window : null);
}
const ar = typeof window < "u", et = ar && window.matchMedia("(pointer: coarse)").matches, pc = ar && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
let _r = 0.5;
const er = /* @__PURE__ */ new Set();
function ah(n) {
  _r = Math.max(0, Math.min(1, n)), er.forEach((e) => e());
}
function qo() {
  return _r;
}
function uh() {
  const [, n] = re(0);
  return se(() => {
    const e = () => n((t) => t + 1);
    return er.add(e), () => {
      er.delete(e);
    };
  }, []), et && _r > 0;
}
function Oe() {
  const [, n] = re(0);
  return se(() => {
    const e = () => n((t) => t + 1);
    return er.add(e), () => {
      er.delete(e);
    };
  }, []), _r;
}
function P(n, e, t) {
  return et ? Math.round(n + (e - n) * t) : n;
}
function hn(n, e) {
  const t = Oe();
  return et && t > 0 ? {
    padding: `${P(n.py, e.py, t)}px ${P(n.px, e.px, t)}px`,
    fontSize: `${P(n.fs, e.fs, t)}px`
  } : { padding: `${n.py}px ${n.px}px`, fontSize: `${n.fs}px` };
}
function Ko() {
  const n = Oe(), e = et && n > 0;
  return {
    box: e ? P(28, 36, n) : 20,
    icon: e ? P(16, 20, n) : 14
  };
}
function di(n) {
  return n === "touch" || n === "pen";
}
let $n = null;
const fi = /* @__PURE__ */ new Set();
ar && window.addEventListener("pointerdown", (n) => {
  $n = n.pointerType, fi.forEach((e) => e());
}, !0);
function dh() {
  return $n;
}
function mc() {
  const [, n] = re(0), e = w($n);
  return se(() => {
    const t = () => {
      e.current !== $n && (e.current = $n, n((r) => r + 1));
    };
    return fi.add(t), () => {
      fi.delete(t);
    };
  }, []), $n;
}
const Jo = ["(any-hover: hover)", "(any-pointer: fine)"];
function Vo() {
  return ar ? Jo.some((n) => window.matchMedia(n).matches) : !1;
}
let Mr = Vo();
const hi = /* @__PURE__ */ new Set();
function to(n) {
  Mr !== n && (Mr = n, hi.forEach((e) => e()));
}
var Oo;
if (ar) {
  const n = () => to(Vo());
  for (const s of Jo) {
    const l = window.matchMedia(s);
    (Oo = l.addEventListener) == null || Oo.call(l, "change", n);
  }
  window.addEventListener("focus", n), document.addEventListener("visibilitychange", n);
  const e = window.setInterval(() => {
    document.visibilityState === "visible" && n();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(e)), window.addEventListener("keydown", (s) => {
    s.isComposing || s.keyCode !== 229 && (s.key === "Enter" || s.key === "Backspace" || s.key === "Process" || s.key === "Unidentified" || to(!0));
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
function fh() {
  return Mr;
}
function hh() {
  const [, n] = re(0);
  return se(() => {
    const e = () => n((t) => t + 1);
    return hi.add(e), () => {
      hi.delete(e);
    };
  }, []), Mr;
}
const pn = 220, Ni = "cubic-bezier(0.32, 0.72, 0, 1)", Ti = 170, Ci = 0.94;
function Qr(n) {
  return n === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Yo(n, e) {
  const t = e.left + e.width / 2, r = e.top + e.height / 2;
  return {
    x: t < n.left ? 0 : t > n.left + n.width ? 1 : 0.5,
    y: r < n.top ? 0 : r > n.top + n.height ? 1 : 0.5
  };
}
function Uo(n, e) {
  const t = (e == null ? void 0 : e()) ?? null;
  if (!t) return { x: 0.5, y: 0.5 };
  const r = n.getBoundingClientRect();
  return Yo({ left: r.left, top: r.top, width: r.width, height: r.height }, t);
}
function gc(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity };
  e.style.transition = "none", e.style.transformOrigin = "50% 50%", e.style.transform = `scale(${Ci})`, e.style.opacity = "0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    n.current === i && requestAnimationFrame(() => {
      if (n.current !== i) return;
      const s = Uo(e, t);
      e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transition = `transform ${pn}ms ${Ni}, opacity ${Ti}ms ease`, e.style.transform = "none", e.style.opacity = "", window.setTimeout(() => {
        n.current === i && (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, r == null || r());
      }, pn + 60);
    });
  });
}
function yc(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity, pointerEvents: e.style.pointerEvents, visibility: e.style.visibility }, s = Uo(e, t);
  e.style.transition = `transform ${pn}ms ${Ni}, opacity ${Ti}ms ease`, e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transform = `scale(${Ci})`, e.style.opacity = "0", e.style.pointerEvents = "none", window.setTimeout(() => {
    n.current === i && (e.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      n.current !== i || e.isConnected || (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, e.style.pointerEvents = o.pointerEvents, e.style.visibility = o.visibility);
    }));
  }, pn + 60);
}
function xc(n, e, t) {
  const r = n.cloneNode(!0), i = n.getBoundingClientRect(), o = i.width > 0 || i.height > 0 ? i : t ?? i;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${o.left}px`, r.style.top = `${o.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const s = (e == null ? void 0 : e()) ?? null, l = s ? Yo({ left: o.left, top: o.top, width: o.width, height: o.height }, s) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${l.x * 100}% ${l.y * 100}%`, n.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${pn}ms ${Ni}, opacity ${Ti}ms ease`, r.style.transform = `scale(${Ci})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, pn + 60));
    });
  });
}
function jr(n) {
  const e = w(null), [t, r] = re(!1), i = w(null), o = w(0), s = ee((m) => {
    if (n.ref && (n.ref.current = m), m) {
      o.current = 0, e.current = m;
      const x = m.getBoundingClientRect();
      (x.width > 0 || x.height > 0) && (i.current = { left: x.left, top: x.top, width: x.width, height: x.height }), r(!0);
      return;
    }
    const g = e.current, b = ++o.current;
    queueMicrotask(() => {
      b === o.current && e.current === g && (e.current = null, r(!1), !(!g || !n.cloneOnUnmount || !c.current) && g.style.visibility !== "hidden" && Qr(f.current) && xc(g, u.current, i.current));
    });
  }, []), l = ee(() => {
    const m = e.current;
    if (!m || getComputedStyle(m).transform !== "none") return;
    const g = m.getBoundingClientRect();
    (g.width > 0 || g.height > 0) && (i.current = { left: g.left, top: g.top, width: g.width, height: g.height });
  }, []), c = w(n.visible);
  c.current = n.visible;
  const a = w(n.visible), u = w(n.anchor ?? null);
  u.current = n.anchor ?? null;
  const d = w(n.onClosed);
  d.current = n.onClosed;
  const f = w(n.morph !== !1);
  f.current = n.morph !== !1;
  const p = w(0);
  return dt(() => {
    if (!t || !c.current || !Qr(f.current)) return;
    const m = e.current;
    m && gc(p, m, u.current);
  }, [t, n.visible]), se(() => {
    if (!t || !c.current) return;
    let m = 0;
    const g = () => {
      m = 0, l(), m = requestAnimationFrame(g);
    };
    return m = requestAnimationFrame(g), () => {
      m && cancelAnimationFrame(m);
    };
  }, [t, l]), dt(() => {
    var b;
    const m = a.current;
    if (a.current = n.visible, n.visible || !m) return;
    const g = e.current;
    if (!g || !Qr(f.current)) {
      (b = d.current) == null || b.call(d);
      return;
    }
    yc(p, g, u.current, () => {
      var x;
      return (x = d.current) == null ? void 0 : x.call(d);
    });
  }, [n.visible]), se(() => {
    if (!t || !c.current) return;
    const m = (g) => {
      const b = e.current;
      b && b.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", m, { capture: !0 }), () => document.removeEventListener("wheel", m, { capture: !0 });
  }, [t]), se(() => {
    if (!t || !c.current) return;
    const m = (g) => {
      const b = e.current;
      b && b.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("touchmove", m, { capture: !0 }), () => document.removeEventListener("touchmove", m, { capture: !0 });
  }, [t]), s;
}
const Go = 384;
function bc(n) {
  const e = n.visualViewport;
  return e ? { x: e.offsetLeft, y: e.offsetTop, width: e.width, height: e.height } : { x: 0, y: 0, width: n.innerWidth, height: n.innerHeight };
}
function Xo({
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
  const u = cr(), d = w(u);
  d.current = u;
  const f = w(a);
  f.current = a, dt(() => {
    if (!t) return;
    let p = 0, m = !1;
    const g = () => {
      p || (p = requestAnimationFrame(b));
    }, b = () => {
      if (p = 0, m) return;
      const R = d.current, _ = n.current, L = e.current;
      if (!R || !_ || !L || !L.isConnected) return;
      const A = (r == null ? void 0 : r.current) ?? L, W = bc(R), S = l ?? Go, $ = Math.min(c, S), O = Math.max(0, L.offsetHeight - A.offsetHeight), F = Math.max($, Math.ceil(A.scrollHeight + O)), Y = Math.min(F, S);
      L.style.maxHeight = `${Y}px`;
      let E = Y;
      const q = i == null ? void 0 : i.current;
      Kl(q ? {
        getBoundingClientRect: () => ({
          left: q.left,
          top: q.top,
          width: q.width,
          height: q.height,
          right: q.left + q.width,
          bottom: q.top + q.height,
          x: q.left,
          y: q.top,
          toJSON: () => {
          }
        })
      } : _, L, {
        strategy: "fixed",
        placement: "bottom-start",
        middleware: [
          _o(o),
          jo({ boundary: W, padding: s, fallbackStrategy: "bestFit" }),
          Wo({ boundary: W, padding: s, mainAxis: !1 }),
          Jl({
            boundary: W,
            padding: s,
            apply({ availableHeight: T }) {
              E = Math.max($, Math.floor(Math.min(S, T))), L.style.maxHeight = `${E}px`;
            }
          })
        ]
      }).then(({ x: T, y: Me, placement: ye }) => {
        m || f.current({
          top: Math.round(Me),
          left: Math.round(T),
          maxH: E,
          side: ye.startsWith("top") ? "top" : "bottom",
          ready: !0
        });
      });
    };
    b();
    const x = d.current, I = (x == null ? void 0 : x.document) ?? null, M = (x == null ? void 0 : x.visualViewport) ?? null, N = () => g();
    M == null || M.addEventListener("resize", N), M == null || M.addEventListener("scroll", N), x == null || x.addEventListener("resize", N), I == null || I.addEventListener("scroll", N, { capture: !0, passive: !0 });
    let k = null;
    return typeof ResizeObserver < "u" && (k = new ResizeObserver(N), e.current && k.observe(e.current), r != null && r.current && k.observe(r.current)), () => {
      m = !0, p && cancelAnimationFrame(p), M == null || M.removeEventListener("resize", N), M == null || M.removeEventListener("scroll", N), x == null || x.removeEventListener("resize", N), I == null || I.removeEventListener("scroll", N, { capture: !0 }), k == null || k.disconnect();
    };
  }, [t, n, e, r, i, o, s, l, c]);
}
let Mn = null;
function Qo(n) {
  return Mn == null || Mn(), Mn = n, () => {
    Mn === n && (Mn = null);
  };
}
const Zo = Yt(null);
function Ei(n, e) {
  const t = n.mode ?? (e == null ? void 0 : e.mode) ?? "dark", r = n.surface ?? (e == null ? void 0 : e.surface) ?? "neutral", i = n.context ?? (e == null ? void 0 : e.context) ?? "surface", o = n.accent ?? (e == null ? void 0 : e.accent) ?? "zinc", s = n.accent !== void 0 && n.surface === void 0 && n.context === void 0;
  return { mode: t, accent: i === "chrome" || r === "accent" || s ? o : "zinc", surface: r, context: i };
}
function Mi({ theme: n, children: e }) {
  return /* @__PURE__ */ h(Zo.Provider, { value: n, children: e });
}
function ph({ mode: n, accent: e, surface: t, context: r, children: i }) {
  const o = Gt();
  return /* @__PURE__ */ h(Mi, { theme: Ei({ mode: n, accent: e, surface: t, context: r }, o), children: i });
}
function mh({ mode: n, accent: e, surface: t, context: r, children: i, className: o, style: s }) {
  const l = Gt(), c = Ei({ mode: n, accent: e, surface: t, context: r }, l);
  return /* @__PURE__ */ h(Mi, { theme: c, children: /* @__PURE__ */ h(
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
function Gt() {
  return Ut(Zo);
}
function vc(n, e = "dark") {
  return n ? n.context === "surface" ? n.mode : n.mode === "light" ? "light" : n.accent === "emerald" ? "emerald" : n.accent === "blue" ? "blue" : "dark" : e;
}
function es(n, e) {
  if (n)
    return (n === "light" || n === "dark") && e ? {
      theme: n,
      attrs: { "data-theme": n, "data-mode": n, "data-accent": e.accent }
    } : { theme: n, attrs: { "data-theme": n } };
  if (!e) return { theme: "dark", attrs: { "data-theme": "dark" } };
  if (e.context === "chrome") {
    const t = vc(e);
    return { theme: t, attrs: { "data-theme": t } };
  }
  return { theme: e.mode, attrs: { "data-mode": e.mode, "data-accent": e.accent } };
}
function wc(n, e = "light") {
  return (n == null ? void 0 : n.mode) ?? e;
}
function kc(n) {
  return !n || n.context !== "chrome" && n.surface !== "accent" ? !1 : n.accent === "emerald" ? "emerald" : n.accent === "blue";
}
function Sc(n) {
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
function mn(n, e = "nearest", t) {
  if (!n) return;
  const r = t ?? Sc(n);
  if (!r || !r.contains(n)) return;
  const i = n.getBoundingClientRect(), o = r.getBoundingClientRect();
  if (e === "center") {
    r.scrollTop += i.top + i.height / 2 - (o.top + o.height / 2);
    return;
  }
  const s = getComputedStyle(n), l = parseFloat(s.scrollMarginBlockStart || s.scrollMarginTop || "0") || 0, c = parseFloat(s.scrollMarginBlockEnd || s.scrollMarginBottom || "0") || 0;
  i.top - l < o.top ? r.scrollTop -= o.top - (i.top - l) : i.bottom + c > o.bottom && (r.scrollTop += i.bottom + c - o.bottom);
}
function ts({
  open: n,
  row: e,
  block: t = "nearest",
  scroller: r,
  ready: i
}) {
  const o = w(!1), s = w(!1), l = w(!1), c = w({ row: e, scroller: r, block: t });
  c.current = { row: e, scroller: r, block: t };
  const a = ee(() => {
    o.current = !0;
  }, []);
  return dt(() => {
    if (!n) {
      s.current = !1, l.current = !1, o.current = !1;
      return;
    }
    if (s.current) return;
    s.current = !0;
    const { row: u, scroller: d, block: f } = c.current, p = u();
    p && (mn(p, f, (d == null ? void 0 : d()) ?? null), l.current = !0);
  }, [n]), se(() => {
    if (!n || i !== !0 || !l.current) return;
    const u = requestAnimationFrame(() => {
      if (!l.current || (l.current = !1, o.current)) return;
      const { row: d, scroller: f } = c.current;
      mn(d(), "nearest", (f == null ? void 0 : f()) ?? null);
    });
    return () => cancelAnimationFrame(u);
  }, [n, i]), { engagedRef: o, engage: a };
}
const Nc = [];
function Ot(n, e) {
  const t = /* @__PURE__ */ new Map();
  e.forEach((s, l) => t.set(s, l));
  const r = [], i = [], o = /* @__PURE__ */ new Set();
  for (const s of n)
    o.has(s) || (o.add(s), t.has(s) ? r.push(s) : i.push(s));
  return r.sort((s, l) => t.get(s) - t.get(l)), [...r, ...i];
}
function yn(n, e) {
  if (n.length !== e.length) return !1;
  const t = new Set(n);
  return e.every((r) => t.has(r));
}
function Tc(n, e, t, r = {}) {
  var o;
  const i = Ot(n, t);
  return (o = r.disabledIds) != null && o.includes(e) ? i : i.includes(e) ? i.filter((s) => s !== e) : r.max !== void 0 && i.length >= r.max ? i : Ot([...i, e], t);
}
function no(n, e, t, r, i = {}) {
  const o = Ot(n, r), s = new Set(e);
  if (!t) return o.filter((d) => !s.has(d));
  const l = new Set(r), c = new Set(i.disabledIds ?? []), a = i.max === void 0 ? 1 / 0 : Math.max(0, i.max - o.length), u = Ot([...s], r).filter((d) => l.has(d) && !o.includes(d) && !c.has(d)).slice(0, a);
  return u.length === 0 ? o : Ot([...o, ...u], r);
}
function ro(n, e) {
  if (e.length === 0) return "none";
  const t = new Set(n), r = e.reduce((i, o) => i + (t.has(o) ? 1 : 0), 0);
  return r === 0 ? "none" : r === e.length ? "all" : "some";
}
function Cc(n, e, t) {
  if (!t) return 0;
  const r = new Set(e), i = new Set(t);
  return n.reduce((o, s) => o + (r.has(s) && !i.has(s) ? 1 : 0), 0);
}
function ns(n) {
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
  } = n, [f, p] = re(() => Ot(t, r)), m = Qe(() => new Set(s ?? []), [s]), g = Qe(() => new Set(f), [f]), b = o !== void 0 && f.length >= o, x = !yn(f, t), I = ee((W) => {
    if (m.has(W)) return;
    const S = g.has(W), $ = Tc(f, W, r, { max: o, disabledIds: s });
    yn($, f) || (p($), d == null || d($), u == null || u(W, !S));
  }, [f, g, m, r, o, s, u, d]), M = ee((W) => {
    const S = W.filter((F) => !m.has(F)), $ = ro(f, S), O = no(f, S, $ !== "all", r, { max: o, disabledIds: s });
    yn(O, f) || (p(O), d == null || d(O));
  }, [f, m, r, o, s, d]), N = ee((W, S = i ?? r) => {
    const $ = no(f, S, W, r, { max: o, disabledIds: s });
    yn($, f) || (p($), d == null || d($));
  }, [f, i, r, o, s, d]), k = ee(() => {
    f.length !== 0 && (p([]), d == null || d([]));
  }, [f, d]), R = ee((W) => {
    p(Ot(W ?? t, r));
  }, [t, r]), _ = ee(() => !a || yn(f, t) ? !1 : (a(Ot(f, r)), !0), [a, f, t, r]), L = ee(() => !c || yn(f, t) ? !1 : (c(Ot(f, r)), !0), [c, f, t, r]), A = ee((W) => ro(f, W), [f]);
  return {
    mode: e,
    indicator: l,
    draft: f,
    count: f.length,
    max: o,
    atMax: b,
    dirty: x,
    hiddenCount: Cc(f, r, i),
    isSelected: (W) => g.has(W),
    isDisabled: (W) => m.has(W),
    canToggle: (W) => !m.has(W) && (g.has(W) || !b),
    toggle: I,
    toggleGroup: M,
    setAll: N,
    clear: k,
    reset: R,
    commit: _,
    flush: L,
    cancel: R,
    groupState: A
  };
}
const rs = Yt(null), Ec = () => Ut(rs), is = Nc;
function Ri({ checked: n, size: e, tone: t = "accent", indeterminate: r = !1 }) {
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
function Mc({ checked: n, onChange: e, disabled: t = !1, label: r, id: i, className: o = "", labelClassName: s = "", theme: l, variant: c = "pill", tone: a = "accent", block: u = !1 }) {
  const d = c !== "plain", f = Oe(), p = P(16, 20, f), m = P(12, 14, f), g = P(12, 14, f), b = P(12, 16, f), x = P(10, 12, f), I = P(8, 10, f);
  return /* @__PURE__ */ C(
    "label",
    {
      className: `ui-press ui-checkbox ${d ? "ui-checkbox-pill rounded-lg" : ""} ${a === "danger" ? "ui-checkbox-tone-danger" : ""} ${t ? "ui-disabled" : ""} ${o}`,
      style: { display: u ? "flex" : "inline-flex", alignItems: "center", gap: I, padding: d ? `${x}px ${b}px` : void 0 },
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
        d ? /* @__PURE__ */ h(Ri, { checked: n, size: p, tone: a }) : /* @__PURE__ */ h("span", { className: "ui-checkbox-box", style: { width: p, height: p }, "aria-hidden": !0, children: n && /* @__PURE__ */ h("svg", { viewBox: "0 0 12 12", fill: "none", style: { width: m, height: m }, "aria-hidden": !0, children: /* @__PURE__ */ h("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ h("span", { className: `ui-checkbox-label ${s}`, style: { fontSize: g }, children: r })
      ]
    }
  );
}
const io = "transition-[grid-template-columns] ease-out duration-150 group-hover:duration-200 motion-reduce:transition-none", Rc = "group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] group-data-[state=open]:grid-cols-[1fr]", Ac = "group-hover:grid-cols-[0fr] group-focus-visible:grid-cols-[0fr] group-data-[state=open]:grid-cols-[0fr]", Ic = "group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[state=open]:opacity-100";
function $c(n) {
  if (!ot.isValidElement(n)) return String(n ?? "");
  const e = n.type, t = typeof e == "string" ? e : e.displayName || e.name || "icon", r = n.props;
  return `${t}|${r.className ?? ""}|${r.size ?? ""}`;
}
function ss({ icon: n, collapse: e = !1, iconWithLabel: t = !0, active: r = !1, gap: i = 6, reserve: o, roll: s = "up", children: l }) {
  const c = !!e && !!n, a = c && !t, u = !!n && (t || c), d = $c(n), [f, p] = re(null), m = w({ sig: d, node: n });
  se(() => {
    if (d === m.current.sig) {
      m.current.node = n;
      return;
    }
    p(m.current.node), m.current = { sig: d, node: n };
    const b = window.setTimeout(() => p(null), 200);
    return () => window.clearTimeout(b);
  }, [d]);
  const g = (
    /* A vertical ROLL, not a cross-fade: the old glyph scrolls up out of the
       clipped box while the new one scrolls up into place (the iOS/macOS
       state-change feel). The incoming icon is in normal flow (it owns the
       box size); the outgoing one overlays it and is clipped. */
    /* @__PURE__ */ C("span", { className: "relative inline-flex items-center justify-center overflow-hidden", children: [
      f != null && /* @__PURE__ */ h("span", { "aria-hidden": !0, className: `ui-icon-roll-out${s === "down" ? "-down" : ""} absolute inset-0 inline-flex items-center justify-center`, children: f }, `out:${m.current.sig}`),
      /* @__PURE__ */ h("span", { className: `ui-icon-roll-in${s === "down" ? "-down" : ""} inline-flex items-center justify-center`, children: n }, `in:${d}`)
    ] })
  );
  return c ? /* @__PURE__ */ C(st, { children: [
    u && (a ? /* @__PURE__ */ h("span", { "data-kit-icon": !0, className: `grid min-w-0 ${io} ${r ? "grid-cols-[0fr]" : `grid-cols-[1fr] ${Ac}`}`, children: /* @__PURE__ */ h("span", { className: "inline-flex min-w-0 items-center overflow-hidden", children: g }) }) : /* @__PURE__ */ h("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: g })),
    /* @__PURE__ */ h("span", { "data-kit-label": !0, className: `grid min-w-0 ${io} ${r ? "grid-cols-[1fr]" : `grid-cols-[0fr] ${Rc}`}`, children: /* @__PURE__ */ h("span", { className: "min-w-0 overflow-hidden", children: /* @__PURE__ */ h(
      "span",
      {
        className: `flex min-w-0 items-center whitespace-nowrap transition-[opacity,padding-left] duration-100 group-hover:duration-150 motion-reduce:transition-none ${r ? "opacity-100" : `opacity-0 ${Ic}`} ${a ? `pl-[var(--kit-collapse-gap)] group-hover:pl-0! group-focus-visible:pl-0! group-data-[state=open]:pl-0! ${r ? "pl-0!" : ""}` : ""}`,
        style: a ? { "--kit-collapse-gap": `${i}px` } : { paddingLeft: i },
        children: o ? /* @__PURE__ */ C("span", { className: "inline-grid min-w-0", children: [
          /* @__PURE__ */ h("span", { "aria-hidden": !0, className: "invisible col-start-1 row-start-1 whitespace-nowrap", children: o }),
          /* @__PURE__ */ h("span", { className: "col-start-1 row-start-1", children: l })
        ] }) : l
      }
    ) }) })
  ] }) : /* @__PURE__ */ C(st, { children: [
    u && /* @__PURE__ */ h("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: n }),
    l
  ] });
}
const gh = {
  light: { plain: "bg-zinc-950", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" },
  dark: { plain: "bg-white", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" }
};
function Mt({
  variant: n = "subtle",
  theme: e,
  cloud: t,
  active: r = !1,
  iconOnly: i = !1,
  size: o = "default",
  revealOnHover: s = !1,
  keepLabelOnActive: l = !0,
  reserveLabel: c,
  iconRoll: a = "up",
  icon: u,
  collapse: d = !1,
  iconWithLabel: f = !0,
  className: p = "",
  type: m = "button",
  children: g,
  ...b
}) {
  const x = Gt(), I = e ?? (x == null ? void 0 : x.mode) ?? "light", M = t ?? kc(x), N = hn({ px: 10, py: 6, fs: 12 }, { px: 14, py: 9, fs: 14 }), k = hn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 9, fs: 14 }), R = hn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), _ = "", L = "", A = `${s ? "ui-reveal " : ""}ui-press inline-flex items-center font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed`, W = "rounded", S = "rounded-[var(--ui-radius-btn)]", $ = {
    light: {
      active: "text-white",
      inactive: "text-zinc-500 hover:text-zinc-900"
    },
    dark: {
      active: "text-zinc-900",
      inactive: "text-zinc-400 hover:text-zinc-200"
    }
  }, O = {
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
  }, F = {
    active: "text-zinc-900",
    inactive: "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800",
    open: "bg-zinc-800! text-white"
  }, Y = {
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
  }, E = {
    light: {
      subtle: { base: `${_} text-zinc-600 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-900" },
      primary: { base: `${L} bg-zinc-900 hover:bg-zinc-800 text-white`, open: "bg-zinc-800!" },
      /* The outline is painted as an INSET SHADOW, not a border: the button
         keeps `subtle`'s exact box (same padding + height), so the two can sit
         side by side in a toolbar without a 2px step. */
      outline: {
        base: `${_} text-zinc-700 shadow-[inset_0_0_0_1px_var(--ui-border-strong)] hover:bg-[var(--ui-btn-hover-bg)] hover:text-zinc-900`,
        open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-900"
      },
      "danger-ghost": { base: `${_} text-rose-600 hover:bg-rose-50`, open: "bg-rose-50!" }
    },
    dark: {
      subtle: { base: `${_} text-zinc-400 hover:text-zinc-200 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-200" },
      primary: { base: `${L} bg-zinc-800 hover:bg-zinc-700 text-white`, open: "bg-zinc-700!" },
      outline: {
        base: `${_} text-zinc-300 shadow-[inset_0_0_0_1px_var(--ui-border-strong)] hover:bg-[var(--ui-btn-hover-bg)] hover:text-zinc-100`,
        open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-100"
      },
      "danger-ghost": { base: `${_} text-red-400 hover:bg-rose-950/40`, open: "bg-rose-950/40!" }
    }
  }, q = {
    blue: { base: `${L} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" },
    emerald: { base: `${L} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" }
  }, H = b["data-state"] === "open", T = E[I][n], Me = n === "primary" ? k : n.startsWith("tab") ? R : N, ye = et ? { padding: "8px 12px", fontSize: "14px", lineHeight: "20px", border: "1px solid transparent" } : { padding: "6px 8px", fontSize: "12px", lineHeight: "16px", border: "1px solid transparent" }, me = P(6, 8, Oe()), he = P(28, 40, Oe()), X = M === "emerald" ? "emerald" : M ? "blue" : null, ae = "bg-[var(--ui-btn-active-bg)]! text-[color:var(--ui-btn-active-text)]!";
  let j;
  if (n === "tab") {
    const te = $[I];
    j = `${W} ${r ? X ? O[X].active : te.active : X ? O[X][I === "light" ? "inactiveLight" : "inactiveDark"] : te.inactive}`;
  } else if (n === "tab-header") {
    const te = X ? r ? Y[X].active : Y[X].inactive : r ? F.active : F.inactive;
    j = `${W} ${te} ${H ? X ? Y[X].open : F.open : ""}`;
  } else if (j = `${S} ${T.base} ${H ? T.open : ""}`, r && (j = `${j} ${ae}`), n === "primary" && X) {
    const te = q[X];
    j = `${S} ${H ? `${te.base} ${te.open}` : te.base}`;
  }
  const K = !!d && !!u && !i, Z = i ? { width: he, height: he, padding: 0, gap: 0 } : o === "minimal" ? { ...ye, gap: K ? 0 : me } : { ...Me, gap: K ? 0 : me };
  return /* @__PURE__ */ h(
    "button",
    {
      type: m,
      "data-mode": I,
      "data-accent": x == null ? void 0 : x.accent,
      className: `${A} ${i ? "justify-center" : ""} ${K ? "group" : ""} ${j} ${p}`,
      "aria-pressed": r && !n.startsWith("tab") ? !0 : void 0,
      "data-active": r || void 0,
      style: Z,
      ...b,
      children: i ? g : /* @__PURE__ */ h(
        ss,
        {
          icon: u,
          collapse: d,
          iconWithLabel: f,
          active: r && l,
          gap: me,
          reserve: c,
          roll: a,
          children: g
        }
      )
    }
  );
}
function Rr({
  checked: n,
  indeterminate: e = !1,
  disabled: t = !1,
  indicator: r = "box",
  size: i,
  className: o = ""
}) {
  const s = Oe(), l = i ?? P(14, 18, s);
  return r === "check" ? /* @__PURE__ */ h(
    "span",
    {
      "data-selection-check": "check",
      className: `inline-flex shrink-0 items-center justify-center ${t ? "opacity-40" : ""} ${o}`,
      style: { width: l, height: l },
      "aria-hidden": !0,
      children: e ? /* @__PURE__ */ h(Dl, { size: l, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : n ? /* @__PURE__ */ h(lr, { size: l, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : null
    }
  ) : /* @__PURE__ */ h(
    "span",
    {
      "data-selection-check": "box",
      className: `inline-flex shrink-0 items-center justify-center ${t ? "opacity-40" : ""} ${o}`,
      "aria-hidden": !0,
      children: /* @__PURE__ */ h(Ri, { checked: n, indeterminate: e, size: l })
    }
  );
}
function ls({
  count: n,
  max: e,
  hiddenCount: t = 0,
  onClear: r,
  hero: i,
  clear: o = !0,
  theme: s,
  className: l = ""
}) {
  const c = Oe(), a = P(10, 14, c), u = P(6, 9, c), d = P(11, 13, c), f = s === "light" ? "light" : "dark", p = s === "emerald" ? "emerald" : s === "blue" ? !0 : void 0, m = e !== void 0 ? `${n} of ${e} selected` : `${n} selected`;
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
          Mt,
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
          Mt,
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
const Ai = Yt("dark"), cs = () => Ut(Ai), Ii = Yt({ "data-theme": "dark" }), zc = () => Ut(Ii);
function $i() {
  const n = Oe();
  return {
    padding: `${P(8, 12, n)}px ${P(12, 16, n)}px`,
    fontSize: `${P(12, 14, n)}px`,
    lineHeight: `${P(18, 22, n)}px`
  };
}
function as() {
  const n = Oe();
  return {
    padding: `${P(6, 9, n)}px ${P(12, 16, n)}px ${P(2, 3, n)}px`,
    fontSize: `${P(10, 11, n)}px`,
    lineHeight: `${P(14, 16, n)}px`
  };
}
const Dc = (n) => n ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", oo = (n) => n ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", Pc = (n) => n ? "text-xs" : "text-[10px]";
function Wr(n) {
  const e = et && qo() > 0;
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
    headerPad: oo(e),
    headerText: `${oo(e)} font-semibold uppercase tracking-wider ${Pc(e)} ui-label`,
    // Item padding
    itemPad: Dc(e),
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
function us(n) {
  const e = [];
  return ot.Children.forEach(n, (t) => {
    if (typeof t == "string" || typeof t == "number")
      e.push(String(t));
    else if (ot.isValidElement(t)) {
      const r = t.props.children;
      (typeof r == "string" || typeof r == "number") && e.push(String(r));
    }
  }), e.join(" ").trim();
}
const zi = Yt({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), ur = Yt(null), Di = () => Ut(ur), ds = Yt({ query: "", setQuery: () => {
} }), Lc = () => Ut(ds), fs = Yt(null), Oc = () => Ut(fs), Bc = () => !0;
function qr(n) {
  const e = w([]), [t, r] = re(-1), [i, o] = re(!1), [s, l] = re(0), c = ee((f) => (e.current = [...e.current, f], l((p) => p + 1), () => {
    e.current = e.current.filter((p) => p !== f), l((p) => p + 1);
  }), []), a = ee((f, p) => {
    r(f), o(p === "pointer");
  }, []), u = ee(() => {
    o((f) => f && (r(-1), !1));
  }, []);
  return Qe(() => ({
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
function hs(n) {
  const e = Di(), t = w(e);
  t.current = e;
  const r = w(null);
  se(() => {
    var c, a;
    const l = { label: n.label(), activate: n.activate, group: ((c = n.group) == null ? void 0 : c.trim()) || void 0, itemId: n.itemId };
    return r.current = l, (a = t.current) == null ? void 0 : a.register(l);
  }, []);
  const i = e && r.current ? e.items.indexOf(r.current) : -1, o = !!e && !n.disabled && i >= 0 && i === e.highlightedIndex;
  return { api: e, myIndex: i, highlighted: o, setPointer: (l) => {
    !n.disabled && e && l >= 0 && e.setHighlighted(l, "pointer");
  } };
}
function Pi(n, e, t, r) {
  const i = w(-1);
  i.current = e.highlightedIndex;
  const o = w(e);
  o.current = e;
  const s = w(n);
  s.current = n;
  const l = w(r);
  l.current = r;
  const c = w({ text: "", time: 0 }), a = w(!1);
  a.current || (a.current = !0, t.current = (u) => {
    var g, b, x, I, M, N;
    if (!s.current) return;
    const d = (g = l.current) == null ? void 0 : g.onSelectAll;
    if (d && (u.metaKey || u.ctrlKey) && u.key.toLowerCase() === "a") {
      u.preventDefault(), u.stopImmediatePropagation(), d();
      return;
    }
    const f = u.target;
    if (!!f && !!f.closest("input, textarea, [contenteditable]") && (u.key.length === 1 || u.key === "Enter" || u.key === "Escape")) {
      const k = (x = (b = l.current) == null ? void 0 : b.onFieldKey) == null ? void 0 : x.call(b, u);
      (!!((I = l.current) != null && I.onFieldKey) || o.current.items.length > 0) && (u.stopImmediatePropagation(), k && u.preventDefault());
      return;
    }
    const m = o.current.items;
    if (m.length !== 0) {
      if (u.key === "ArrowDown" || u.key === "ArrowUp") {
        u.preventDefault(), u.stopImmediatePropagation();
        const k = u.key === "ArrowDown" ? 1 : -1, R = (i.current + k + m.length) % m.length;
        o.current.setHighlighted(R, "keyboard");
      } else if (u.key === "ArrowRight") {
        u.preventDefault(), u.stopImmediatePropagation();
        const k = i.current;
        k >= 0 && k < m.length && m[k].submenu && m[k].activate();
      } else if (u.key === "ArrowLeft")
        u.preventDefault(), u.stopImmediatePropagation(), (N = (M = l.current) == null ? void 0 : M.onCloseSub) == null || N.call(M);
      else if (u.key === "Enter" || u.key === " ") {
        u.preventDefault(), u.stopImmediatePropagation();
        const k = i.current;
        k >= 0 && k < m.length && m[k].activate();
      } else if (u.key.length === 1 && !u.ctrlKey && !u.metaKey && !u.altKey) {
        u.preventDefault(), u.stopImmediatePropagation();
        const k = Date.now(), R = (k - c.current.time > 500 ? "" : c.current.text) + u.key.toLowerCase();
        if (c.current = { text: R, time: k }, !R) return;
        const _ = i.current + 1;
        for (let L = 0; L < m.length; L++) {
          const A = (_ + L) % m.length;
          if (m[A].label.toLowerCase().startsWith(R)) {
            o.current.setHighlighted(A, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function Li(n, e, t, r, i, o, s) {
  const l = w(e);
  l.current = e;
  const c = w(n);
  c.current = n;
  const a = w(i);
  a.current = i;
  const u = w(s == null ? void 0 : s.ignoreFields);
  u.current = s == null ? void 0 : s.ignoreFields;
  const d = w(s == null ? void 0 : s.selectAll);
  d.current = s == null ? void 0 : s.selectAll;
  const f = w(!1);
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
function Oi(n, e) {
  const t = w(n);
  t.current = n;
  const r = w(!1);
  r.current || (r.current = !0, e.current = (i) => {
    if (!t.current) return;
    const o = i.currentTarget, s = o.querySelector("[data-menu-items]") ?? o;
    s.scrollHeight > s.clientHeight && (i.preventDefault(), s.scrollTop += i.deltaY);
  });
}
function Kr({
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
  const I = Gt(), M = es(s, I), N = M.theme, [k, R] = re([]), [_, L] = re(null), A = _n(), W = Si(), S = w(null), $ = w(null), O = w(n);
  O.current = n;
  const [F, Y] = re(n), [E, q] = re(""), H = f && g !== void 0, T = H ? g : E, Me = H ? b ?? (() => {
  }) : q, ye = w(g ?? "");
  se(() => {
    n || (ye.current = g ?? "");
  }, [n, g]);
  const me = H && T === ye.current ? "" : T, he = zl(), X = w(null), ae = Oe(), j = {
    padding: `${P(8, 12, ae)}px ${P(12, 16, ae)}px`,
    fontSize: `${P(12, 14, ae)}px`
  }, [K, Z] = re(0), te = f && !H;
  se(() => {
    var Ve;
    if (!te || !n) return;
    const z = (Ve = $.current) == null ? void 0 : Ve.querySelector("[data-menu-items]");
    if (!z) return;
    const U = () => Z(z.offsetWidth - z.clientWidth);
    U();
    const pe = new ResizeObserver(U);
    return pe.observe(z), () => pe.disconnect();
  }, [n, te, T]);
  const V = Qe(() => {
    if (!f) return;
    const z = me.trim().toLowerCase();
    return z ? (U) => {
      var pe;
      return m ? m(z, U.label, U.group) : U.label.toLowerCase().includes(z) || (((pe = U.group) == null ? void 0 : pe.toLowerCase().includes(z)) ?? !1);
    } : Bc;
  }, [me, f, m]), ne = qr(V), de = f && me.trim() !== "" && ne.items.length === 0, Se = !!x, tt = ne.allItems.map((z) => z.itemId).filter((z) => !!z), nt = ne.items.map((z) => z.itemId).filter((z) => !!z), ze = ns({
    mode: "draft",
    selectedIds: (x == null ? void 0 : x.selectedIds) ?? is,
    itemIds: tt,
    visibleIds: nt,
    max: x == null ? void 0 : x.max,
    disabledIds: x == null ? void 0 : x.disabledIds,
    indicator: x == null ? void 0 : x.indicator,
    onCommit: x == null ? void 0 : x.onCommit
  }), ue = w(ze.reset);
  ue.current = ze.reset;
  const Ie = typeof (x == null ? void 0 : x.commitLabel) == "function" ? x.commitLabel(ze.count) : (x == null ? void 0 : x.commitLabel) ?? `Select ${ze.count}`;
  se(() => {
    if (n)
      return Y(!0), H || q(""), ne.setHighlighted(d ?? -1, "keyboard"), ue.current(), Qo(() => {
        t == null || t(!1), e == null || e();
      });
    R([]);
  }, [n, d, t, e]), se(() => {
    if (!n || !W) return;
    const z = (U) => {
      if (U.pointerType !== "touch") return;
      const pe = U.target;
      pe && ($.current && $.current.contains(pe) || S.current && S.current.contains(pe) || pe instanceof Element && pe.closest("[data-radix-menu-content]") || (t == null || t(!1), e == null || e()));
    };
    return W.addEventListener("pointerdown", z, { capture: !0 }), () => W.removeEventListener("pointerdown", z, { capture: !0 });
  }, [n, W, t, e]);
  const ge = ee(() => {
    const z = S.current;
    if (!z) return null;
    const U = z.getBoundingClientRect();
    return { left: U.left, top: U.top, width: U.width, height: U.height };
  }, []), _e = jr({
    visible: n,
    morph: c,
    anchor: ge,
    onClosed: () => Y(!1)
  }), je = w(() => {
  }), Le = w(() => {
  }), rt = w(() => {
  }), ke = ee((z) => {
    if (z.key === "Enter") {
      const U = ne.highlightedIndex, pe = ne.items[U >= 0 ? U : 0];
      return pe == null || pe.activate(), !0;
    }
    return z.key === "Escape" ? (t == null || t(!1), e == null || e(), !0) : !1;
  }, [ne, t, e]);
  Pi(n && k.length === 0, ne, je, {
    onFieldKey: ke,
    onSelectAll: Se ? () => ze.setAll(!0) : void 0
  }), Oi(n, Le), Li(n, ne, je, $, k.length > 0, rt, {
    ignoreFields: H,
    selectAll: Se
  });
  const Be = w(null), At = ee((z) => {
    var U;
    if (z) {
      z.addEventListener("keydown", je.current, { capture: !0 }), z.addEventListener("wheel", Le.current, { passive: !1 });
      const pe = z.ownerDocument;
      Be.current = pe, pe.addEventListener("keydown", rt.current, { capture: !0 }), Nt(!0);
    } else
      (U = Be.current) == null || U.removeEventListener("keydown", rt.current, { capture: !0 }), Be.current = null, Nt(!1);
    $.current = z, _e(z);
  }, [_e]), [He, It] = re({ top: 0, left: 0, maxH: Go, side: "bottom", ready: !1 }), [We, yt] = re(0), [xt, Nt] = re(!1);
  se(() => {
    n && S.current && yt(S.current.getBoundingClientRect().width);
  }, [n]), Xo({
    anchorRef: S,
    panelRef: $,
    open: n && xt,
    maxHeight: u,
    onPosition: It
  }), se(() => {
    var z;
    if (He.ready && n) {
      if (f) {
        (z = X.current ?? S.current) == null || z.focus();
        return;
      }
      const U = $.current;
      U && U.ownerDocument.activeElement !== U && !U.contains(U.ownerDocument.activeElement) && U.focus();
    }
  }, [He.ready, n, f]), se(() => {
    if (!n || !f) return;
    if (ne.items.length === 0) {
      ne.highlightedIndex !== -1 && ne.setHighlighted(-1, "keyboard");
      return;
    }
    const z = ne.highlightedIndex;
    (z < 0 || z >= ne.items.length) && ne.setHighlighted(0, "keyboard");
  }, [n, T, f, ne.items.length]), dt(() => {
    var U;
    if (!n || ne.highlightedIndex < 0 || ne.pointerDriven) return;
    const z = (U = $.current) == null ? void 0 : U.querySelector(`[data-ei="${ne.highlightedIndex}"]`);
    mn(z, "nearest");
  }, [n, ne.highlightedIndex, ne.pointerDriven]);
  const Ge = ee((z) => {
    if (!(!z && !O.current)) {
      if (!z && Ct.current) {
        if (H) return;
        ut.current = !0;
      }
      t ? t(z) : z || e == null || e();
    }
  }, [t, e]), Tt = w(F);
  Tt.current = F;
  const Ct = w(!1), ut = w(!1), Ht = ee(() => {
    if (!O.current && Tt.current) {
      if (ut.current) {
        ut.current = !1, Ct.current = !1;
        return;
      }
      t == null || t(!0);
    }
  }, [t]), Ae = ot.isValidElement(r) ? r : null, lt = w(!1), Et = ee(() => {
    const z = S.current;
    z && (lt.current = !0, z.focus(), setTimeout(() => {
      lt.current = !1;
    }, 0));
  }, []), it = Ae ? ot.cloneElement(Ae, {
    ref: (z) => {
      S.current = z;
      const U = Ae.props.ref;
      typeof U == "function" ? U(z) : U && (U.current = z);
    },
    /* Radix's trigger primitive merges `type="button"` onto the child; a
       text field trigger-as-search must stay a text field. */
    ...H ? { type: Ae.props.type ?? "text" } : {},
    ...H ? {
      /* A text field that opens a list IS a combobox, and the highlighted
         row must be announced — the field is outside the popup, so the
         only link screen readers get is `aria-activedescendant`. */
      role: "combobox",
      "aria-autocomplete": "list",
      "aria-controls": n ? `${he}-content` : void 0,
      "aria-activedescendant": n && ne.highlightedIndex >= 0 ? `${he}-opt-${ne.highlightedIndex}` : void 0
    } : {},
    onPointerDownCapture: (z) => {
      var U, pe;
      (pe = (U = Ae.props).onPointerDownCapture) == null || pe.call(U, z), Ct.current = !0, ut.current = !1, setTimeout(() => {
        Ct.current = !1;
      }, 0);
    },
    onPointerDown: (z) => {
      var U, pe;
      if ((pe = (U = Ae.props).onPointerDown) == null || pe.call(U, z), H) {
        z.preventDefault();
        const Ve = O.current;
        Ve || t == null || t(!0);
        const Ye = S.current;
        Ye == null || Ye.focus(), !Ve && Ye instanceof HTMLInputElement && Ye.select();
      }
    },
    /* Space is a printable search character, but Radix treats it as the
       trigger's open/close key. Keep it in the field. */
    onKeyDownCapture: (z) => {
      var U, pe;
      (pe = (U = Ae.props).onKeyDownCapture) == null || pe.call(U, z), H && z.key === " " && z.stopPropagation();
    },
    onClick: (z) => {
      var U, pe;
      (pe = (U = Ae.props).onClick) == null || pe.call(U, z), Ht();
    },
    /* A kit-driven focus restore is not a user focus (see above). */
    onFocus: (z) => {
      var U, pe;
      if (lt.current) {
        lt.current = !1;
        return;
      }
      (pe = (U = Ae.props).onFocus) == null || pe.call(U, z);
    },
    /* Focus leaving the field ends the search session: Tab (or any focus
       move that does not land in the panel) must close the list, not leave
       an orphan panel floating with the keyboard elsewhere. The panel's
       own focused row is legitimate — keep it open for the pending click. */
    onBlur: (z) => {
      var pe, Ve, Ye, bt;
      if ((Ve = (pe = Ae.props).onBlur) == null || Ve.call(pe, z), !H || !O.current) return;
      const U = z.relatedTarget;
      U && ((Ye = $.current) != null && Ye.contains(U) || (bt = S.current) != null && bt.contains(U)) || setTimeout(() => {
        var G;
        const vt = S.current;
        if (!vt || !O.current) return;
        const v = vt.ownerDocument.activeElement;
        v && (vt.contains(v) || (G = $.current) != null && G.contains(v)) || (t == null || t(!1), e == null || e());
      }, 0);
    },
    /* Combobox mode (externalSearch): the trigger field IS the search box,
       so it also drives the menu's keyboard — arrows move the single
       highlight and Enter activates the highlighted (or first visible)
       row. Filtering itself follows the VALUE (see filterQuery), so no
       input method is special-cased here. */
    onKeyDown: (z) => {
      var U, pe;
      if ((pe = (U = Ae.props).onKeyDown) == null || pe.call(U, z), !(!H || !O.current)) {
        if (z.key === "ArrowDown" || z.key === "ArrowUp") {
          z.preventDefault();
          const Ve = ne.items;
          if (Ve.length === 0) return;
          const Ye = z.key === "ArrowDown" ? 1 : -1, bt = (ne.highlightedIndex + Ye + Ve.length) % Ve.length;
          ne.setHighlighted(bt, "keyboard");
        } else if (z.key === "Enter") {
          z.preventDefault();
          const Ve = ne.highlightedIndex, Ye = ne.items[Ve >= 0 ? Ve : 0];
          Ye == null || Ye.activate();
        }
      }
    }
  }) : r, Dt = /* @__PURE__ */ C("div", { "data-menu-search-empty": !0, className: "px-3 py-3 text-center", children: [
    /* @__PURE__ */ C("div", { className: "text-xs font-medium text-[color:var(--ui-text-muted)]", children: [
      "No matches for “",
      me.trim(),
      "”"
    ] }),
    /* @__PURE__ */ h("div", { className: "mt-0.5 text-[10px] text-[color:var(--ui-text-faint)]", children: "Try a different search." })
  ] }), $t = te || Se, ft = `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] min-w-0 ${$t ? "overflow-hidden" : "overflow-y-auto scrollbar-custom"}`;
  return /* @__PURE__ */ C(Pe.Root, { open: n || F, onOpenChange: Ge, modal: !1, children: [
    /* @__PURE__ */ h(Pe.Trigger, { asChild: !0, children: it }),
    /* @__PURE__ */ h(Pe.Portal, { container: A ?? void 0, children: /* @__PURE__ */ h(Ai.Provider, { value: N, children: /* @__PURE__ */ h(Ii.Provider, { value: M.attrs, children: /* @__PURE__ */ h(zi.Provider, { value: { chain: k, setChain: R, morph: c, keyboardOpened: _, setKeyboardOpened: L }, children: /* @__PURE__ */ h(ur.Provider, { value: ne, children: /* @__PURE__ */ h(ds.Provider, { value: { query: T, setQuery: Me }, children: /* @__PURE__ */ h(rs.Provider, { value: Se ? ze : null, children: /* @__PURE__ */ h(fs.Provider, { value: he, children: /* @__PURE__ */ C(
      Pe.Content,
      {
        id: `${he}-content`,
        ref: At,
        tabIndex: H ? void 0 : -1,
        ...M.attrs,
        "data-ui-fixed": !0,
        className: `${ft} ${o || ""} ${a || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: He.left,
          top: He.top,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: o ? void 0 : We || void 0,
          maxHeight: He.maxH,
          visibility: He.ready ? "visible" : "hidden"
        },
        onPointerLeave: ne.pointerLeave,
        onFocusCapture: H ? (z) => {
          z.target === z.currentTarget && (z.stopPropagation(), Et());
        } : void 0,
        onFocusOutside: H ? (z) => {
          var pe;
          const U = z.target;
          U && (U === S.current || (pe = S.current) != null && pe.contains(U)) && z.preventDefault();
        } : void 0,
        onCloseAutoFocus: H ? (z) => {
          z.preventDefault(), Et();
        } : void 0,
        children: [
          te && /* @__PURE__ */ h("div", { className: "shrink-0 px-0 pt-1 pb-1", style: { paddingRight: K }, children: /* @__PURE__ */ C("div", { "data-menu-search": !0, className: "ui-item ui-item-highlighted flex items-center gap-2 rounded", style: j, children: [
            /* @__PURE__ */ h(xn, { className: "w-3.5 h-3.5 shrink-0 ui-icon" }),
            /* @__PURE__ */ h(
              "input",
              {
                ref: X,
                value: T,
                onChange: (z) => Me(z.target.value),
                placeholder: p ?? "Search…",
                className: "flex-1 min-w-0 bg-transparent outline-none text-current placeholder:text-current placeholder:opacity-50 cursor-text"
              }
            ),
            T ? /* @__PURE__ */ h(
              "button",
              {
                type: "button",
                tabIndex: -1,
                "aria-label": "Clear search",
                className: "shrink-0 ui-icon-btn rounded flex items-center justify-center p-1 -m-1",
                onPointerDown: (z) => z.stopPropagation(),
                onClick: () => {
                  var z;
                  Me(""), (z = X.current) == null || z.focus();
                },
                children: /* @__PURE__ */ h(Sn, { className: "w-3.5 h-3.5" })
              }
            ) : /* @__PURE__ */ h("span", { className: "w-3.5 h-3.5 shrink-0" })
          ] }) }),
          $t ? /* @__PURE__ */ C("div", { "data-menu-items": !0, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: [
            l,
            de && Dt
          ] }) : /* @__PURE__ */ C(st, { children: [
            l,
            de && Dt
          ] }),
          Se && (x == null ? void 0 : x.footer) !== !1 && /* @__PURE__ */ h(
            ls,
            {
              count: ze.count,
              max: x == null ? void 0 : x.max,
              hiddenCount: (x == null ? void 0 : x.hiddenNote) === !1 ? 0 : ze.hiddenCount,
              clear: (x == null ? void 0 : x.clear) !== !1,
              theme: N,
              onClear: ze.clear,
              hero: {
                label: Ie,
                onClick: () => {
                  ze.commit(), Ge(!1);
                },
                disabled: ze.count === 0
              }
            }
          )
        ]
      }
    ) }) }) }) }) }) }) }) })
  ] });
}
function yh({
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
  itemLabel: M,
  trigger: N,
  minItems: k = 1,
  itemRender: R,
  morph: _ = !0,
  contentClassName: L
}) {
  const A = Wr(), W = $i(), [S, $] = re(null), [O, F] = re(""), Y = w(O);
  Y.current = O;
  const E = w(null), q = w(null), [H, T] = re(null), Me = ee((j) => {
    q.current = j, T(j);
  }, []), ye = ts({
    open: n,
    scroller: () => q.current,
    row: () => {
      var j;
      return ((j = q.current) == null ? void 0 : j.querySelector('[data-active="1"]')) ?? null;
    }
  });
  se(() => {
    if (!n) return;
    const j = (Z) => {
      var nt, ze;
      const te = Z.target;
      if (te && te.closest("input, textarea, [contenteditable]")) {
        S && te === E.current && (Z.key === "Enter" ? (Z.preventDefault(), Z.stopImmediatePropagation(), he()) : Z.key === "Escape" && (Z.preventDefault(), Z.stopImmediatePropagation(), X()));
        return;
      }
      const V = (nt = q.current) == null ? void 0 : nt.closest(".ui-menu");
      if (!V || !V.contains(Z.target)) return;
      const ne = V.ownerDocument, de = [...V.querySelectorAll('[data-im-row] > [role="menuitem"]:first-child')], Se = [...V.querySelectorAll(':scope > div:last-child > [role="menuitem"]')], tt = [...de, ...Se];
      if (Z.key === "ArrowDown" || Z.key === "ArrowUp") {
        Z.preventDefault(), Z.stopImmediatePropagation();
        const ue = ne.activeElement;
        let Ie = ue ? tt.indexOf(ue) : -1;
        if (Ie < 0 && ue) {
          const Le = ue.closest("[data-im-row]"), rt = Le == null ? void 0 : Le.querySelector('[role="menuitem"]:first-child');
          rt && (Ie = de.indexOf(rt));
        }
        const ge = Z.key === "ArrowDown" ? 1 : -1, _e = Ie < 0 ? ge === 1 ? 0 : tt.length - 1 : (Ie + ge + tt.length) % tt.length, je = tt[_e];
        je == null || je.focus({ preventScroll: !0 }), mn((je == null ? void 0 : je.closest("[data-im-row]")) ?? je, "nearest", q.current);
        return;
      }
      if (Z.key === "ArrowLeft" || Z.key === "ArrowRight") {
        const ue = ne.activeElement, Ie = ue == null ? void 0 : ue.closest("[data-im-row]");
        if (!Ie) return;
        Z.preventDefault(), Z.stopImmediatePropagation();
        const ge = [...Ie.querySelectorAll('[role="menuitem"]')].slice(1);
        if (ge.length === 0) return;
        const _e = ue && Ie.contains(ue) ? ge.indexOf(ue) : -1, je = Z.key === "ArrowRight" ? 1 : -1, Le = _e < 0 ? 0 : (_e + je + ge.length) % ge.length;
        (ze = ge[Le]) == null || ze.focus({ preventScroll: !0 });
        return;
      }
    }, K = (H == null ? void 0 : H.ownerDocument) ?? null;
    return K == null || K.addEventListener("keydown", j, { capture: !0 }), () => K == null ? void 0 : K.removeEventListener("keydown", j, { capture: !0 });
  }, [n, S, H]), se(() => {
    if (!S) return;
    const j = t.find((V) => V.id === S);
    j && !O && F(j.name);
    const K = requestAnimationFrame(() => {
      const V = E.current;
      V && (V.focus(), V.select());
    });
    let Z = 0;
    const te = window.setInterval(() => {
      const V = E.current;
      if (Z++, !V || Z > 12) {
        clearInterval(te);
        return;
      }
      V.ownerDocument.activeElement !== V && (V.focus(), V.select());
    }, 50);
    return () => {
      cancelAnimationFrame(K), clearInterval(te);
    };
  }, [S]), se(() => {
    if (S) {
      const j = t.find((K) => K.id === S);
      j && !O && F(j.name);
    }
  }, [S, t]);
  const me = (j, K) => {
    $(j), F(K);
  }, he = () => {
    S && Y.current.trim() && o(S, Y.current.trim()), $(null);
  }, X = () => {
    $(null);
  }, ae = M || I.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ C(Kr, { open: n, onOpenChange: (j) => {
    j ? ($(null), F("")) : (S && O.trim() && o(S, O.trim()), $(null), F("")), (!j || !m) && e(j);
  }, width: "w-80", theme: g, align: b, trigger: N, morph: _, contentClassName: L, children: [
    /* @__PURE__ */ h("div", { className: `shrink-0 ${A.headerText}`, children: I }),
    /* @__PURE__ */ h("div", { ref: Me, "data-im-list": !0, onPointerEnter: ye.engage, onPointerDown: ye.engage, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: t.map((j) => {
      const K = j.id === r, Z = S === j.id;
      return /* @__PURE__ */ h("div", { "data-im-row": j.id, "data-active": K ? "1" : void 0, className: `scroll-my-4 flex items-center gap-1 rounded ${K || Z ? A.rowActiveBg : A.rowHoverBg} ${S && !Z ? "opacity-40 pointer-events-none" : ""}`, children: Z ? /* @__PURE__ */ C(st, { children: [
        /* @__PURE__ */ h("div", { className: "flex-1 min-w-0 flex items-center", children: /* @__PURE__ */ h(
          "input",
          {
            ref: E,
            autoFocus: !0,
            value: O,
            onChange: (te) => F(te.target.value),
            onKeyDown: (te) => {
              te.key === "Enter" && (te.preventDefault(), te.stopPropagation(), he()), te.key === "Escape" && (te.preventDefault(), te.stopPropagation(), X());
            },
            className: "w-full outline-none bg-transparent placeholder:text-current placeholder:opacity-50",
            style: W
          }
        ) }),
        /* @__PURE__ */ h(
          Pe.Item,
          {
            className: `shrink-0 ${A.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${A.editConfirm}`,
            onSelect: (te) => {
              te.preventDefault(), he();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ h(lr, { className: A.btnIcon })
          }
        ),
        /* @__PURE__ */ h(
          Pe.Item,
          {
            className: `shrink-0 ${A.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${A.editCancel}`,
            onSelect: (te) => {
              te.preventDefault(), X();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ h(Sn, { className: A.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ C(st, { children: [
        /* @__PURE__ */ h(
          Pe.Item,
          {
            style: W,
            className: `flex-1 min-w-0 rounded outline-none cursor-pointer flex items-center ${A.rowText} ${K ? "" : A.rowTextHover}`,
            onSelect: p ? () => {
              i(j.id);
            } : (te) => {
              te.preventDefault(), i(j.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ h("span", { className: `truncate ${K ? A.rowActiveText : ""}`, children: R ? R(j) : j.name })
          }
        ),
        /* @__PURE__ */ h(
          Pe.Item,
          {
            className: `shrink-0 ${A.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${K ? A.btnActive : A.btnBase}`,
            onSelect: (te) => {
              te.preventDefault(), me(j.id, j.name);
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: /* @__PURE__ */ h(Pl, { className: A.btnIcon })
          }
        ),
        /* @__PURE__ */ h(
          Pe.Item,
          {
            className: `shrink-0 ${A.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${K ? A.btnActive : A.btnBase}`,
            onSelect: (te) => {
              te.preventDefault();
              const V = s(j.id);
              V && me(V, `${j.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: /* @__PURE__ */ h(Fo, { className: A.btnIcon })
          }
        ),
        /* @__PURE__ */ h(
          Pe.Item,
          {
            className: `shrink-0 ${A.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${t.length <= k ? A.btnDisabled : K ? A.btnDangerActive : A.btnDanger}`,
            onSelect: (te) => {
              te.preventDefault(), l(j.id);
            },
            onTouchStart: () => {
            },
            disabled: m || t.length <= k,
            children: /* @__PURE__ */ h(ui, { className: A.btnIcon })
          }
        )
      ] }) }, j.id);
    }) }),
    /* @__PURE__ */ C("div", { className: `shrink-0 ${S ? "opacity-40 pointer-events-none" : ""}`, children: [
      d && /* @__PURE__ */ C(st, { children: [
        /* @__PURE__ */ h(Pe.Separator, { className: A.separator }),
        /* @__PURE__ */ C(
          Pe.Item,
          {
            className: `w-full text-left ${A.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${A.itemDefault} ui-row`,
            onSelect: (j) => {
              j.preventDefault(), d();
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: [
              /* @__PURE__ */ h(Ho, { className: `${A.btnIcon} ${A.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (c || a || u || f) && /* @__PURE__ */ h(Pe.Separator, { className: A.separator }),
      c && /* @__PURE__ */ C(
        Pe.Item,
        {
          className: `w-full text-left ${A.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${A.itemDefault} ui-row`,
          onSelect: (j) => {
            j.preventDefault();
            const K = c();
            K && me(K, "");
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ h(Fr, { className: `${A.btnIcon} ${A.icon}` }),
            "New ",
            ae
          ]
        }
      ),
      a && /* @__PURE__ */ C(
        Pe.Item,
        {
          className: `w-full text-left ${A.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${A.itemDefault} ui-row`,
          onSelect: (j) => {
            j.preventDefault(), a();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ C("svg", { className: `${A.btnIcon} ${A.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ h("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ h("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ h("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      u && /* @__PURE__ */ C(
        Pe.Item,
        {
          className: `w-full text-left ${A.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${A.itemDefault} ui-row`,
          onSelect: (j) => {
            j.preventDefault(), u();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ C("svg", { className: `${A.btnIcon} ${A.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ h("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ h("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ h("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      f && /* @__PURE__ */ C(
        Pe.Item,
        {
          className: `w-full text-left ${A.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${A.itemDefault} ui-row`,
          onSelect: (j) => {
            j.preventDefault(), f();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ h(ui, { className: `${A.btnIcon} ${A.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
function Fc({
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
  var q;
  cs();
  const f = Wr(), p = $i(), m = as(), g = w(!1), b = w(null), x = Ec(), I = !!x && d !== void 0, M = x && d !== void 0 ? x.isSelected(d) : l, N = t || (x && d !== void 0 ? !x.canToggle(d) : !1), { myIndex: k, highlighted: R, setPointer: _, api: L } = hs({
    label: () => us(o),
    activate: () => {
      N || (x && d !== void 0 ? x.toggle(d) : n());
    },
    disabled: N,
    group: u,
    itemId: d
  }), { query: A } = Lc(), W = A.trim() !== "" && k < 0, S = Oc(), $ = u == null ? void 0 : u.trim(), O = !!$ && k >= 0 && (k === 0 || ((q = L == null ? void 0 : L.items[k - 1]) == null ? void 0 : q.group) !== $), F = $ && x ? ((L == null ? void 0 : L.items) ?? []).filter((H) => H.group === $ && H.itemId).map((H) => H.itemId).filter((H) => !x.isDisabled(H)) : [], Y = x && F.length > 0 ? x.groupState(F) : "none", E = r === "danger" ? f.itemDanger : f.itemDefault;
  return /* @__PURE__ */ C(st, { children: [
    O && /* @__PURE__ */ h(
      "div",
      {
        "data-menu-group": $,
        role: "presentation",
        className: `ui-label shrink-0 select-none font-semibold uppercase tracking-wider ${x && F.length > 0 ? "" : "pointer-events-none"}`,
        style: m,
        children: x && F.length > 0 ? /* @__PURE__ */ C("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `Select all ${$}`,
              onMouseDown: (H) => H.preventDefault(),
              onClick: () => x.toggleGroup(F),
              className: "flex shrink-0 cursor-pointer items-center justify-center rounded pointer-events-auto",
              children: /* @__PURE__ */ h(
                Rr,
                {
                  checked: Y === "all",
                  indeterminate: Y === "some",
                  indicator: x.indicator
                }
              )
            }
          ),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: $ })
        ] }) : $
      }
    ),
    /* @__PURE__ */ C(
      Pe.Item,
      {
        ref: b,
        id: S && k >= 0 ? `${S}-opt-${k}` : void 0,
        "data-ei": k >= 0 ? k : void 0,
        ...I ? { role: "menuitemcheckbox", "aria-checked": M } : {},
        style: { ...p, display: W ? "none" : void 0 },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${E} ${I ? "" : l ? "ui-item-selected" : ""} ${R ? "ui-item-highlighted" : ""} ${N ? "opacity-30 pointer-events-none" : ""} ${i}`,
        onSelect: (H) => {
          if (g.current) {
            g.current = !1;
            return;
          }
          if (I) {
            H.preventDefault(), x && d !== void 0 && x.toggle(d);
            return;
          }
          s && H.preventDefault(), n();
        },
        onPointerEnter: () => {
          _(k);
        },
        onTouchStart: () => {
        },
        disabled: N,
        children: [
          I && /* @__PURE__ */ h(Rr, { checked: M, disabled: N, indicator: x.indicator }),
          e && /* @__PURE__ */ h("span", { className: `${f.icon} shrink-0`, children: e }),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: o }),
          a && /* @__PURE__ */ h("span", { className: "shrink-0 ml-1 flex items-center", children: a }),
          c && /* @__PURE__ */ h(
            "span",
            {
              className: `shrink-0 ml-1 p-0.5 rounded ${f.rightAction}`,
              title: c.title,
              onPointerDown: (H) => {
                H.stopPropagation(), H.preventDefault(), g.current = !0, c.onClick();
              },
              onClick: (H) => {
                H.stopPropagation(), H.preventDefault();
              },
              children: c.icon
            }
          )
        ]
      }
    )
  ] });
}
function Hc({ id: n, label: e, icon: t, width: r, side: i = "right", children: o, contentClassName: s }) {
  const { chain: l, setChain: c, morph: a, keyboardOpened: u, setKeyboardOpened: d } = Ut(zi), f = l.includes(n), p = l[l.length - 1] === n;
  cs();
  const m = zc(), g = _n(), b = w(null), x = w(null), [I, M] = re(f), N = !f && I;
  se(() => {
    f && M(!0);
  }, [f]);
  const k = () => c((X) => {
    const ae = X.indexOf(n);
    return ae >= 0 ? X.slice(0, ae) : X;
  }), R = qr(), _ = Di(), L = w(_);
  L.current = _;
  const A = w(null);
  se(() => {
    var ae;
    const X = {
      label: e,
      activate: () => {
        d(n), c((j) => j.includes(n) ? j : [...j, n]);
      },
      submenu: !0
    };
    return A.current = X, (ae = L.current) == null ? void 0 : ae.register(X);
  }, []);
  const W = _ && A.current ? _.items.indexOf(A.current) : -1, S = W >= 0 && W === _.highlightedIndex, $ = ee(() => {
    const X = b.current;
    if (!X) return null;
    const ae = X.getBoundingClientRect();
    return { left: ae.left, top: ae.top, width: ae.width, height: ae.height };
  }, []), O = jr({
    visible: f,
    morph: a,
    anchor: $,
    onClosed: () => M(!1)
  }), F = w(() => {
  }), Y = w(() => {
  }), E = w(() => {
  });
  Pi(f && p, R, F, {
    onCloseSub: () => {
      k(), _ && W >= 0 && _.setHighlighted(W, "keyboard");
    }
  });
  const q = w(u);
  q.current = u, se(() => {
    f && (q.current === n ? (R.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var X;
      return (X = x.current) == null ? void 0 : X.focus();
    }), d(null)) : R.setHighlighted(-1, "keyboard"));
  }, [f]), Oi(f, Y), Li(f, R, F, x, !p, E), ot.useLayoutEffect(() => {
    var ae;
    if (!f || R.highlightedIndex < 0 || R.pointerDriven) return;
    const X = (ae = x.current) == null ? void 0 : ae.querySelector(`[data-ei="${R.highlightedIndex}"]`);
    mn(X, "nearest", x.current);
  }, [f, R.highlightedIndex, R.pointerDriven]);
  const H = w(null), T = ee((X) => {
    var ae;
    if (X) {
      X.addEventListener("keydown", F.current, { capture: !0 }), X.addEventListener("wheel", Y.current, { passive: !1 });
      const j = X.ownerDocument;
      H.current = j, j.addEventListener("keydown", E.current, { capture: !0 });
    } else
      (ae = H.current) == null || ae.removeEventListener("keydown", E.current, { capture: !0 }), H.current = null;
    x.current = X, O(X);
  }, [O]), Me = Oe(), ye = { padding: `${P(8, 12, Me)}px ${P(12, 16, Me)}px`, fontSize: P(12, 14, Me) }, me = `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${S ? " ui-item-highlighted" : ""}${N ? " ui-sub-closing" : ""}`, he = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${s || ""}`;
  return /* @__PURE__ */ C(Pe.Sub, { open: f || I, onOpenChange: (X) => c((ae) => {
    if (!X) {
      const j = ae.indexOf(n);
      return j >= 0 ? ae.slice(0, j) : ae;
    }
    return ae.includes(n) ? ae : [...ae, n];
  }), children: [
    /* @__PURE__ */ C(
      Pe.SubTrigger,
      {
        ref: b,
        "data-ei": W >= 0 ? W : void 0,
        style: ye,
        className: me,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          _ && W >= 0 && _.setHighlighted(W, "pointer");
        },
        onPointerDown: (X) => {
          X.pointerType === "pen" && (X.preventDefault(), c((ae) => f ? ae.slice(0, ae.indexOf(n)) : [...ae, n]));
        },
        children: [
          i === "left" && /* @__PURE__ */ h(Er, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ C("span", { className: "flex items-center gap-2", children: [
            t && /* @__PURE__ */ h("span", { className: "ui-icon shrink-0", children: t }),
            e
          ] }),
          i === "right" && /* @__PURE__ */ h(Er, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ h(Pe.Portal, { container: g ?? void 0, children: /* @__PURE__ */ h(
      Pe.SubContent,
      {
        ref: T,
        ...m,
        className: he,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: R.pointerLeave,
        children: /* @__PURE__ */ h(ur.Provider, { value: R, children: o })
      }
    ) })
  ] });
}
const Un = 8, xh = ({ open: n, x: e, y: t, onClose: r, children: i, containerRef: o, theme: s, morph: l = !0 }) => {
  const c = Gt(), a = s ? { theme: s, attrs: { "data-theme": s } } : c ? es(void 0, c) : { theme: "light", attrs: { "data-theme": "light" } }, { theme: u } = a, d = Oe(), f = P(12, 14, d), p = w(null), m = cr(), [g, b] = re(!1), [x, I] = re([]), [M, N] = re(null), k = qr();
  se(() => {
    if (n)
      return k.setHighlighted(-1, "keyboard"), Qo(r);
  }, [n, r]);
  const R = w({ left: e, top: t });
  n && (R.current = { left: e, top: t });
  const _ = ee(() => ({ left: R.current.left, top: R.current.top, width: 0, height: 0 }), []), L = jr({
    visible: !0,
    morph: l,
    anchor: _,
    cloneOnUnmount: !0
  }), A = w(() => {
  }), W = w(() => {
  }), S = w(() => {
  });
  Pi(n, k, A), dt(() => {
    if (!n || k.highlightedIndex < 0 || k.pointerDriven) return;
    const E = p.current;
    mn(
      E == null ? void 0 : E.querySelector(`[data-ei="${k.highlightedIndex}"]`),
      "nearest",
      E
    );
  }, [n, k.highlightedIndex, k.pointerDriven]), Oi(n, W), Li(n, k, A, p, x.length > 0, S);
  const $ = w(null), O = ee((E) => {
    var q;
    if (E) {
      E.addEventListener("keydown", A.current, { capture: !0 }), E.addEventListener("wheel", W.current, { passive: !1 });
      const H = E.ownerDocument;
      $.current = H, H.addEventListener("keydown", S.current, { capture: !0 });
    } else
      (q = $.current) == null || q.removeEventListener("keydown", S.current, { capture: !0 }), $.current = null;
    p.current = E, b(!!E), L(E);
  }, [L]), [F, Y] = re(null);
  return dt(() => {
    var j;
    if (!n || !g || !p.current) return;
    const E = p.current, q = E.offsetWidth, H = E.offsetHeight, T = (j = o == null ? void 0 : o.current) == null ? void 0 : j.getBoundingClientRect(), Me = T ? T.right : (m == null ? void 0 : m.innerWidth) ?? 0, ye = T ? T.bottom : (m == null ? void 0 : m.innerHeight) ?? 0, me = T ? T.left : 0, he = T ? T.top : 0;
    let X = Math.max(he + Un, R.current.top), ae = Math.max(me + Un, R.current.left);
    ae + q > Me && (ae = Me - q - Un), X + H > ye && (X = Math.max(he + Un, ye - H - Un)), Y({ left: ae, top: X });
  }, [n, g, e, t, o]), n ? /* @__PURE__ */ C(Pe.Root, { open: n, onOpenChange: (E) => {
    E || r();
  }, modal: !1, children: [
    /* @__PURE__ */ h(Pe.Trigger, { asChild: !0, children: /* @__PURE__ */ h("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ h(Pe.Portal, { children: /* @__PURE__ */ h(Ai.Provider, { value: u, children: /* @__PURE__ */ h(Ii.Provider, { value: a.attrs, children: /* @__PURE__ */ h(zi.Provider, { value: { chain: x, setChain: I, morph: l, keyboardOpened: M, setKeyboardOpened: N }, children: /* @__PURE__ */ h(ur.Provider, { value: k, children: /* @__PURE__ */ h(
      Pe.Content,
      {
        ref: O,
        ...a.attrs,
        "data-ui-fixed": !0,
        className: "fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom",
        style: { fontSize: f, left: (F == null ? void 0 : F.left) ?? R.current.left, top: (F == null ? void 0 : F.top) ?? R.current.top, touchAction: "manipulation" },
        onPointerLeave: k.pointerLeave,
        children: i
      }
    ) }) }) }) }) })
  ] }) : null;
}, bh = ({ onClick: n, variant: e = "default", icon: t, disabled: r = !1, selected: i = !1, trailing: o, children: s }) => {
  const l = Oe(), c = { padding: `${P(8, 12, l)}px ${P(12, 16, l)}px`, fontSize: P(12, 14, l) }, a = Di(), u = w(a);
  u.current = a;
  const d = w(null);
  se(() => {
    var g;
    const m = { label: us(s), activate: () => {
      r || n();
    } };
    return d.current = m, (g = u.current) == null ? void 0 : g.register(m);
  }, []);
  const f = a && d.current ? a.items.indexOf(d.current) : -1, p = !r && f >= 0 && f === a.highlightedIndex;
  return /* @__PURE__ */ C(
    Pe.Item,
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
}, vh = () => /* @__PURE__ */ h(Pe.Separator, { className: "ui-sep my-1" }), wh = (n) => /* @__PURE__ */ h(Hc, { ...n, width: n.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), $e = 8, ps = "[data-modal-stack]", tn = 220, tr = "cubic-bezier(0.32, 0.72, 0, 1)", Sr = 0.94;
function Rn() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function an(n) {
  if (!n) return { top: 0, height: 0, bottom: 0 };
  const e = n.visualViewport, t = e ? e.offsetTop : 0, r = e ? e.height : n.innerHeight;
  return { top: t, height: r, bottom: t + r };
}
function ms(n, e) {
  return `translate(${e.left - n.left}px, ${e.top - n.top}px) scale(${e.width / n.width}, ${e.height / n.height})`;
}
function so(n, e, t, r) {
  const i = ++n.current, o = e.getBoundingClientRect();
  e.style.transition = "none", e.style.transform = ms(o, t), e.style.transformOrigin = "0 0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === i && (e.style.transition = `transform ${tn}ms ${tr}, opacity 180ms ease`, e.style.transform = "none", window.setTimeout(() => {
        n.current === i && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", r());
      }, tn + 80));
    });
  });
}
function _c(n, e, t) {
  const r = ++n.current;
  e.style.transition = "none", e.style.transformOrigin = "center", e.style.transform = `scale(${Sr})`, e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === r && (e.style.transition = `transform ${tn}ms ${tr}`, e.style.transform = "none", window.setTimeout(() => {
        n.current === r && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", t());
      }, tn + 60));
    });
  });
}
function lo(n, e, t) {
  const r = ++n.current, i = e.getBoundingClientRect(), o = 1 - Sr, s = { left: i.left + i.width * o / 2, top: i.top + i.height * o / 2, width: i.width * Sr, height: i.height * Sr };
  e.style.transition = `transform ${tn}ms ${tr}, opacity 170ms ease`, e.style.transformOrigin = "0 0", e.style.transform = ms(i, s), e.style.opacity = "0", window.setTimeout(() => {
    n.current === r && (e.style.visibility = "hidden", t(), requestAnimationFrame(() => {
      n.current !== r || e.isConnected || (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", e.style.opacity = "", e.style.visibility = "");
    }));
  }, tn + 60);
}
function Zr(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(ps) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function hr(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(ps) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function jc({
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
  const g = Gt(), b = Ei(
    { mode: f, accent: m, surface: p, context: "surface" },
    g
  ), x = b.mode, I = b.surface, M = b.accent, N = w(null), k = w(null), R = w(null), _ = Oe(), L = P(20, 24, _), A = P(10, 12, _), W = P(12, 14, _), S = P(14, 16, _), $ = P(20, 24, _), O = P(20, 24, _), F = P(20, 24, _), Y = P(14, 16, _), E = P(16, 20, _), q = P(10, 12, _), H = P(12, 14, _), T = P(8, 10, _), Me = P(4, 6, _), ye = { padding: `${A}px ${L}px` }, me = { fontSize: W }, he = { padding: `${O}px ${$}px 16px ${$}px` }, X = { fontSize: S }, ae = { padding: `0 ${$}px 16px` }, j = { padding: `${F}px ${$}px` }, K = { fontSize: q, padding: `${Me}px ${T}px` }, [Z, te] = re(!1), V = ee((v) => {
    N.current = v, te(v !== null);
  }, []), ne = _n(), de = cr(), Se = w(de);
  Se.current = de;
  const [tt, nt] = re(null), ze = w(null), ue = w(!1), Ie = w(!1), ge = w(0), _e = w({ w: 0, h: 0 }), je = w(!1), [Le, rt] = re(!1), [ke, Be] = re(!1), At = w(0), He = w(!1), [It, We] = re(!1), yt = w(c);
  yt.current = c;
  const xt = w(!1), Nt = w(!1), Ge = () => {
    Nt.current = !0, rt(!0);
  }, Tt = () => {
    Nt.current = !1, rt(!1);
  };
  se(() => {
    n || (nt(null), je.current = !1, ue.current = !1, Be(!1));
  }, [n]), dt(() => {
    if (!n || je.current || !Z || !N.current) return;
    je.current = !0;
    const v = N.current.getBoundingClientRect(), G = Se.current ?? null, ie = (G == null ? void 0 : G.innerWidth) ?? 0, be = an(G);
    nt({
      left: Math.max($e, Math.min((ie - v.width) / 2, ie - v.width - $e)),
      top: Math.max(be.top + $e, Math.min(be.top + (be.height - v.height) / 2, be.bottom - v.height - $e))
    });
  }, [n, Z]), dt(() => {
    if (!n || !Z || !c || Rn() || !N.current) return;
    const v = N.current, G = Zr(v), ie = G[G.length - 1];
    Ge(), ie ? so(At, v, ie.getBoundingClientRect(), Tt) : _c(At, v, Tt);
  }, [n, Z]);
  const Ct = ee(() => {
    if (!u || He.current) return;
    const v = N.current, G = !!v && Zr(v).length > 0;
    if (!v || !c || Rn() || G) {
      e();
      return;
    }
    He.current = !0, We(!0), xt.current = !0, Ge(), lo(At, v, () => {
      He.current = !1, We(!1), Tt(), e();
    });
  }, [c, e, u]), ut = ee(() => {
    const v = N.current;
    if (!v || xt.current || !yt.current || Rn() || Zr(v).length > 0) return;
    const G = v.ownerDocument, ie = v.cloneNode(!0);
    ie.removeAttribute("data-modal-stack"), ie.removeAttribute("data-state"), ie.removeAttribute("role"), ie.removeAttribute("data-aria-hidden"), ie.removeAttribute("tabindex"), ie.setAttribute("aria-hidden", "true"), ie.style.pointerEvents = "none", G.body.appendChild(ie), lo({ current: 0 }, ie, () => {
      ie.isConnected && ie.remove();
    });
  }, []);
  dt(() => () => ut(), [ut]);
  const Ht = w(n);
  dt(() => {
    const v = Ht.current;
    Ht.current = n, v && !n && ut();
  }, [n, Z, ut]), se(() => {
    if (!n || !Z || !c || !N.current) return;
    const v = N.current, G = v.parentNode;
    if (!G) return;
    let ie = 0, be = null, we = !1;
    const xe = () => {
      ie = 0;
      const Ce = hr(v);
      if (Ce.length > 0)
        v.style.opacity = "", v.style.pointerEvents = "", be = Ce[Ce.length - 1].getBoundingClientRect(), we = !0, ie = requestAnimationFrame(xe);
      else if (we) {
        we = !1, be && !Rn() && (Ge(), so(At, v, be, Tt)), be = null;
        const Fe = Se.current ?? null;
        Fe == null || Fe.setTimeout(() => {
          !v || !v.isConnected || getComputedStyle(v).opacity !== "1" && (v.style.opacity = "1", v.style.pointerEvents = "");
        }, 240);
      }
    }, Ne = new MutationObserver(() => {
      !ie && hr(v).length > 0 && (ie = requestAnimationFrame(xe));
    });
    return Ne.observe(G, { childList: !0 }), () => {
      Ne.disconnect(), ie && cancelAnimationFrame(ie);
    };
  }, [n, Z]), se(() => {
    if (!Z || !c || Rn() || !N.current) return;
    const v = N.current;
    let G = Math.round(v.getBoundingClientRect().height), ie = !1;
    const be = new ResizeObserver(() => {
      if (!v.isConnected) return;
      const we = Math.round(v.getBoundingClientRect().height);
      if (!ie) {
        ie = !0, G = we;
        return;
      }
      if (Math.abs(we - G) < 1) return;
      if (ze.current || He.current || hr(v).length > 0) {
        G = we;
        return;
      }
      if (Nt.current) return;
      const xe = G;
      G = we, Ge();
      const Ne = v.getBoundingClientRect(), Ce = an(Se.current ?? null), Fe = !ue.current && !Ie.current, _t = Fe ? Ce.top + (Ce.height - xe) / 2 : Ne.top, Ee = Fe ? Ce.top + (Ce.height - we) / 2 : Ne.top;
      v.style.transition = "none", v.style.height = `${xe}px`, Fe && (v.style.top = `${_t}px`), k.current && (k.current.style.overflow = "hidden"), v.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          v.style.height === `${xe}px` && (v.style.transition = `height ${tn}ms ${tr}${Fe ? `, top ${tn}ms ${tr}` : ""}`, v.style.height = `${we}px`, Fe && (v.style.top = `${Ee}px`), window.setTimeout(() => {
            v.style.height === `${we}px` && (v.style.transition = "", v.style.height = "", k.current && (k.current.style.overflow = ""), Fe && nt({ left: Ne.left, top: Ee }), Tt());
          }, tn + 60));
        });
      });
    });
    return be.observe(v), () => be.disconnect();
  }, [Z]), se(() => {
    if (!Z || !N.current || c && !Rn()) return;
    const v = N.current, G = new ResizeObserver(() => {
      if (!v.isConnected || ze.current || He.current || Ie.current || hr(v).length > 0) return;
      const ie = Se.current ?? null, be = an(ie), we = (ie == null ? void 0 : ie.innerWidth) ?? 0, xe = v.getBoundingClientRect(), Ne = Math.max(be.top + $e, Math.min(xe.top, be.bottom - xe.height - $e)), Ce = Math.max($e, Math.min(xe.left, we - xe.width - $e));
      (Math.abs(Ne - xe.top) > 0.5 || Math.abs(Ce - xe.left) > 0.5) && nt({ left: Ce, top: Ne });
    });
    return G.observe(v), () => G.disconnect();
  }, [Z, c]);
  const Ae = ee(() => {
    const v = N.current;
    if (!v) return null;
    const G = v.getBoundingClientRect();
    return { left: G.left, top: G.top, width: G.width, height: G.height };
  }, []), lt = ee((v, G) => {
    const ie = Se.current ?? null, be = (ie == null ? void 0 : ie.innerWidth) ?? 0, we = an(ie), xe = Ae(), Ne = xe ? xe.width : Math.min(be - $e * 2, 576), Ce = xe ? xe.height : Math.min(we.height - $e * 2, 400);
    return {
      left: Math.max($e, Math.min(v, be - Ne - $e)),
      top: Math.max(we.top + $e, Math.min(G, we.bottom - Ce - $e))
    };
  }, [Ae]);
  se(() => {
    if (!n) return;
    const v = Se.current ?? null, G = (v == null ? void 0 : v.visualViewport) ?? null;
    if (!v || !G) return;
    const ie = 120;
    Ie.current = !1, _e.current = { w: v.innerWidth, h: v.innerHeight };
    let be = 0;
    const we = () => {
      if (He.current || ze.current) return;
      const Ne = (v == null ? void 0 : v.innerHeight) ?? 0, Ce = (v == null ? void 0 : v.innerWidth) ?? 0, _t = an(v).height < Ne - ie, Ee = Ne < _e.current.h - ie && Ce === _e.current.w;
      _t || Ee ? (Ie.current = !0, ge.current && (clearTimeout(ge.current), ge.current = 0)) : ge.current || (ge.current = (v == null ? void 0 : v.setTimeout(() => {
        Ie.current = !1, ge.current = 0, Be(!1);
      }, 600)) ?? 0), Be(Ie.current), !be && (be = requestAnimationFrame(() => {
        var Pt;
        be = 0;
        const on = N.current;
        if (!on) return;
        const ht = an(Se.current ?? null), wt = on.getBoundingClientRect(), Te = ((Pt = Se.current) == null ? void 0 : Pt.innerWidth) ?? 0, Xt = (v == null ? void 0 : v.innerHeight) ?? 0, Wn = ht.height < Xt - ie || Xt < _e.current.h - ie && (v == null ? void 0 : v.innerWidth) === _e.current.w;
        _e.current = { w: (v == null ? void 0 : v.innerWidth) ?? 0, h: Xt };
        const Xe = wt.top >= ht.top + $e && wt.bottom <= ht.bottom - $e, Qt = () => {
          nt({
            left: Math.max($e, Math.min((Te - wt.width) / 2, Te - wt.width - $e)),
            top: Math.max(ht.top + $e, Math.min(ht.top + (ht.height - wt.height) / 2, ht.bottom - wt.height - $e))
          });
        };
        if (Wn && !et) {
          if (ue.current) {
            Xe || nt(lt(wt.left, wt.top));
            return;
          }
          if (Xe) return;
          Qt();
          return;
        }
        if (!Ie.current) {
          if (ue.current) {
            Xe || nt(lt(wt.left, wt.top));
            return;
          }
          Xe || Qt();
        }
      }));
    };
    G.addEventListener("resize", we), G.addEventListener("scroll", we);
    const xe = () => {
      He.current || ze.current || be || (be = requestAnimationFrame(() => {
        be = 0;
        const Ne = N.current;
        if (!Ne) return;
        const Ce = Se.current ?? null, Fe = an(Ce), _t = (Ce == null ? void 0 : Ce.innerWidth) ?? 0, Ee = Ne.getBoundingClientRect();
        if (ue.current) {
          nt(lt(Ee.left, Ee.top));
          return;
        }
        nt({
          left: Math.max($e, Math.min((_t - Ee.width) / 2, _t - Ee.width - $e)),
          top: Math.max(Fe.top + $e, Math.min(Fe.top + (Fe.height - Ee.height) / 2, Fe.bottom - Ee.height - $e))
        });
      }));
    };
    return v.addEventListener("orientationchange", xe), () => {
      G.removeEventListener("resize", we), G.removeEventListener("scroll", we), v.removeEventListener("orientationchange", xe), be && cancelAnimationFrame(be), ge.current && clearTimeout(ge.current);
    };
  }, [n, lt]);
  const Et = ee((v) => {
    if (v.target.closest("button")) return;
    ue.current = !0;
    const G = Ae();
    G && (nt(lt(G.left, G.top)), ze.current = { startX: v.clientX, startY: v.clientY, posX: G.left, posY: G.top }, v.target.setPointerCapture(v.pointerId));
  }, [Ae, lt]), it = ee((v) => {
    const G = ze.current;
    G && (v.preventDefault(), nt(lt(G.posX + v.clientX - G.startX, G.posY + v.clientY - G.startY)));
  }, [lt]), Dt = ee(() => {
    ze.current = null;
  }, []), $t = ze.current !== null, ft = ee(() => {
    ue.current = !1;
    const v = Se.current ?? null, G = an(v), ie = (v == null ? void 0 : v.innerWidth) ?? 0, be = N.current, we = be ? be.getBoundingClientRect() : { width: 0, height: 0 };
    nt({
      left: Math.max($e, Math.min((ie - we.width) / 2, ie - we.width - $e)),
      top: Math.max(G.top + $e, Math.min(G.top + (G.height - we.height) / 2, G.bottom - we.height - $e))
    });
  }, []), z = w(0), U = ee(() => {
    const v = Date.now();
    v - z.current < 300 ? (z.current = 0, ft()) : z.current = v;
  }, [ft]), pe = tt !== null, Ve = pe ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", Ye = `${i ? `${i} w-full` : "max-w-xl w-full"}`, bt = {
    ...pe ? { left: tt.left, top: tt.top } : {},
    width: `min(100%, calc(100dvw - ${$e * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...ke ? {} : { maxHeight: `calc(100dvh - ${$e * 2}px)` }
  }, vt = ee((v) => {
    if (v.key !== "Enter" || v.shiftKey || v.metaKey || v.ctrlKey || v.altKey) return;
    const G = v.target, ie = R.current;
    if (!(!!G.closest("[data-modal-close]") || !!ie && ie.contains(G) && !!G.closest('button, a, [role="button"]')) && G.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !ie) return;
    const we = Array.from(ie.querySelectorAll("button[data-modal-confirm]")), xe = we.length > 0 ? we : Array.from(ie.querySelectorAll("button")), Ne = xe[xe.length - 1];
    !Ne || Ne.disabled || (v.preventDefault(), Ne.click());
  }, []);
  return /* @__PURE__ */ h(Mi, { theme: b, children: /* @__PURE__ */ h(cn.Root, { open: n, onOpenChange: (v) => {
    v || Ct();
  }, children: /* @__PURE__ */ C(cn.Portal, { container: ne ?? void 0, children: [
    /* @__PURE__ */ h(
      cn.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${It ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (v) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (v.preventDefault(), d && Ct());
        }
      }
    ),
    /* @__PURE__ */ C(
      cn.Content,
      {
        ref: V,
        onKeyDown: vt,
        onInteractOutside: (v) => {
          d || v.preventDefault();
        },
        "data-modal-stack": !0,
        "data-mode": x,
        "data-accent": M,
        "data-surface": I,
        className: `ui-modal fixed z-[10000] bg-[var(--ui-modal-bg)] border border-[color:var(--ui-modal-border)] rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${Ve} ${Ye}`,
        style: { touchAction: "manipulation", colorScheme: x, ...Object.keys(bt).length > 0 ? bt : {} },
        children: [
          a ? /* @__PURE__ */ C(
            "div",
            {
              style: he,
              className: `flex items-center justify-between ${$t ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (v) => {
                Le || Et(v);
              },
              onPointerMove: it,
              onPointerUp: Dt,
              onClick: U,
              children: [
                /* @__PURE__ */ h(cn.Title, { style: X, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t }),
                u && /* @__PURE__ */ h(cn.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ h(Sn, { style: { width: E, height: E } }) })
              ]
            }
          ) : /* @__PURE__ */ C(
            "div",
            {
              style: ye,
              className: `ui-modal-header flex items-center justify-between border-b border-[color:var(--ui-modal-header-border)] shrink-0 bg-[var(--ui-modal-header-bg)] ${$t ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (v) => {
                Le || Et(v);
              },
              onPointerMove: it,
              onPointerUp: Dt,
              onClick: U,
              children: [
                /* @__PURE__ */ C("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ h("span", { className: "text-[color:var(--ui-modal-icon)] shrink-0", children: r }),
                  /* @__PURE__ */ h(cn.Title, { style: me, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t })
                ] }),
                /* @__PURE__ */ C("div", { className: "flex items-center gap-2", children: [
                  l && /* @__PURE__ */ C("button", { onClick: l, style: K, className: "cursor-pointer flex items-center gap-1 text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-muted-hover)] transition-colors bg-[var(--ui-modal-control-bg)] hover:bg-[var(--ui-modal-control-hover-bg)] rounded shrink-0", children: [
                    /* @__PURE__ */ h(Ho, { style: { width: H, height: H } }),
                    "Reset"
                  ] }),
                  u && /* @__PURE__ */ h(cn.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ h(Sn, { style: { width: Y, height: Y } }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ h("div", { ref: k, "data-testid": "modal-body", style: a ? ae : void 0, className: "overflow-y-auto flex-1 bg-[var(--ui-modal-body-bg)] text-[color:var(--ui-modal-body-text)]", children: s }),
          o && /* @__PURE__ */ h("div", { ref: R, style: a ? j : void 0, className: a ? "" : "shrink-0", children: a ? /* @__PURE__ */ h("div", { className: "flex items-center justify-end gap-2", children: o }) : o })
        ]
      }
    )
  ] }) }) });
}
function kh({ children: n }) {
  const e = Oe(), t = P(20, 24, e), r = P(8, 12, e);
  return /* @__PURE__ */ h("div", { className: "flex items-center justify-end gap-3 border-t border-[color:var(--ui-modal-border)] bg-[var(--ui-modal-footer-bg)]", style: { padding: `${r}px ${t}px` }, children: n });
}
const Wc = "inline-flex items-center gap-2 rounded-lg text-xs transition cursor-pointer select-none whitespace-nowrap active:shadow-[inset_0_0_0_2px_var(--ui-panel-bg)]", qc = {
  zinc: "bg-[var(--ui-footer-hero-bg)] text-[color:var(--ui-footer-hero-text)] font-semibold border border-[color:var(--ui-footer-hero-border)] hover:bg-[var(--ui-footer-hero-hover-bg)] hover:border-[color:var(--ui-footer-hero-hover-border)] disabled:opacity-40 disabled:cursor-not-allowed",
  accent: "bg-[var(--ui-accent-solid)] text-[color:var(--ui-accent-action-text)] font-semibold border border-transparent hover:bg-[var(--ui-accent-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed",
  danger: "bg-[var(--ui-danger-solid)] text-white font-semibold border border-[color:var(--ui-danger-solid)] hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
}, Kc = {
  /* Transparent border on every variant — auto-height buttons add the border
     to their height, so the bordered hero would otherwise be 2px taller. */
  ghost: "border border-transparent text-[color:var(--ui-text-muted)] font-medium hover:bg-[var(--ui-footer-ghost-hover-bg)] hover:text-[color:var(--ui-text-strong)] disabled:opacity-50",
  danger: "border border-transparent text-[color:var(--ui-danger-text)] font-medium hover:bg-[var(--ui-danger-hover-bg)] hover:text-[color:var(--ui-danger-hover-text)] disabled:opacity-50",
  "danger-solid": "border border-transparent bg-[var(--ui-danger-solid)] text-white font-semibold hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
};
function pr({
  variant: n = "hero",
  tone: e = "zinc",
  className: t = "",
  type: r = "button",
  ...i
}) {
  const o = hn({ px: 24, py: 8, fs: 12 }, { px: 28, py: 10, fs: 14 });
  return /* @__PURE__ */ h(
    "button",
    {
      type: r,
      style: o,
      className: `${Wc} ${n === "hero" ? qc[e] : Kc[n]} ${t}`,
      ...i
    }
  );
}
function Ar(n = "md") {
  const e = et && qo() > 0;
  return n === "sm" ? `${e ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"} ui-input` : `${e ? "px-4 py-3 text-sm" : "px-3 py-1.5 text-xs"} ui-input`;
}
function gs(n = "md") {
  return n === "sm" ? hn({ px: 8, py: 6, fs: 12 }, { px: 12, py: 8, fs: 14 }) : hn({ px: 10, py: 5, fs: 12 }, { px: 14, py: 9, fs: 14 });
}
const ys = Yt(null);
function Sh() {
  const n = Ut(ys);
  if (!n) throw new Error("useDialog must be used within DialogProvider");
  return n;
}
function Nh({ children: n, theme: e, accent: t, surface: r }) {
  const [i, o] = re(null), [s, l] = re(!1), c = w(null), a = Oe(), u = P(16, 20, a), d = P(12, 14, a), f = gs(), p = w(i);
  p.current = i;
  const m = ee(() => {
    const k = p.current;
    k && (k.kind === "confirm" ? k.resolve(!1) : k.kind === "prompt" ? k.resolve(null) : k.resolve());
  }, []), g = ee((k) => {
    if (k.suppressKey) {
      const R = localStorage.getItem(k.suppressKey);
      if (R && Date.now() < parseInt(R, 10))
        return Promise.resolve(!0);
    }
    return new Promise((R) => {
      m(), l(!1), o({ kind: "confirm", options: k, resolve: R });
    });
  }, [m]), b = ee((k) => new Promise((R) => {
    m(), o({ kind: "prompt", options: k, resolve: R });
  }), [m]), x = ee((k) => new Promise((R) => {
    m(), o({ kind: "alert", options: k, resolve: R });
  }), [m]);
  se(() => {
    if (i) {
      const k = setTimeout(() => {
        var R;
        return (R = c.current) == null ? void 0 : R.focus();
      }, 50);
      return () => clearTimeout(k);
    }
  }, [i]);
  const I = ee(() => {
    var k, R;
    if (i) {
      if (i.kind === "confirm") {
        const _ = i.options;
        _.suppressKey && s && localStorage.setItem(_.suppressKey, String(Date.now() + 864e5)), i.resolve(!0);
      } else i.kind === "prompt" ? i.resolve(((R = (k = c.current) == null ? void 0 : k.value) == null ? void 0 : R.trim()) || null) : i.resolve();
      o(null);
    }
  }, [i, s]), M = i !== null;
  se(() => {
    if (!M) return;
    const k = (R) => {
      R.key !== "Enter" || R.shiftKey || R.metaKey || R.ctrlKey || R.altKey || R.isComposing || (R.preventDefault(), R.stopImmediatePropagation(), I());
    };
    return document.addEventListener("keydown", k, !0), () => document.removeEventListener("keydown", k, !0);
  }, [M, I]);
  const N = ee(() => {
    i && (i.kind === "confirm" ? i.resolve(!1) : i.kind === "prompt" ? i.resolve(null) : i.resolve(), o(null));
  }, [i]);
  return /* @__PURE__ */ C(ys.Provider, { value: { confirm: g, prompt: b, alert: x }, children: [
    n,
    M && /* @__PURE__ */ h(
      jc,
      {
        open: !0,
        onClose: N,
        closable: (i == null ? void 0 : i.kind) !== "alert",
        dismissOnBackdrop: (i == null ? void 0 : i.kind) !== "alert",
        title: (i == null ? void 0 : i.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: i && /* @__PURE__ */ C(st, { children: [
          i.kind !== "alert" && /* @__PURE__ */ h(pr, { variant: "ghost", onClick: N, children: "Cancel" }),
          i.kind === "alert" ? /* @__PURE__ */ h(pr, { onClick: I, children: "OK" }) : i.kind === "confirm" ? /* @__PURE__ */ h(
            pr,
            {
              "data-modal-confirm": !0,
              variant: i.options.danger ? "danger-solid" : "hero",
              onClick: I,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ h(pr, { "data-modal-confirm": !0, onClick: I, children: "Save" })
        ] }),
        children: /* @__PURE__ */ C("div", { className: "flex flex-col", style: { gap: u }, children: [
          (i == null ? void 0 : i.options.message) && /* @__PURE__ */ h("p", { style: { fontSize: d }, className: "text-[color:var(--ui-text-muted)] leading-relaxed", children: i.options.message }),
          (i == null ? void 0 : i.kind) === "confirm" && i.options.suppressKey && /* @__PURE__ */ h(
            Mc,
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
const Jc = 500, Vc = 250, Yc = 5, Lt = 88, co = 4;
function Uc(n, e) {
  const t = n.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  t.style.strokeDasharray = String(r), t.style.strokeDashoffset = String(r);
  const i = performance.now(), o = (s) => {
    const l = s - i, c = Math.min(l / e, 1);
    t.style.strokeDashoffset = String(r * (1 - c)), c < 1 && requestAnimationFrame(o);
  };
  requestAnimationFrame(o);
}
function Gc({ x: n, y: e, ms: t }) {
  const r = w(null), i = _n();
  return se(() => {
    r.current && Uc(r.current, t);
  }, [t]), Hr(
    /* @__PURE__ */ h(
      "div",
      {
        style: {
          position: "fixed",
          left: n - Lt / 2,
          top: e - Lt / 2,
          width: Lt,
          height: Lt,
          zIndex: 99999,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ C("svg", { ref: r, width: Lt, height: Lt, viewBox: `0 0 ${Lt} ${Lt}`, children: [
          /* @__PURE__ */ h(
            "circle",
            {
              cx: Lt / 2,
              cy: Lt / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: co + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ h(
            "circle",
            {
              cx: Lt / 2,
              cy: Lt / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: co,
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
function Th() {
  return { "data-no-longpress": "true" };
}
function Xc(n) {
  const e = n.tagName;
  return !!(e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || e === "BUTTON" || n.isContentEditable || n.closest("[data-no-longpress]") || n.closest("button, input, select, textarea"));
}
function Ch({
  children: n,
  showRing: e = !0,
  longPressMs: t = Jc,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: i,
  onLongPress: o
}) {
  const [s, l] = re(null), c = Si(), a = w(null), u = w(null), d = w({ x: 0, y: 0, target: null }), f = w(!1), p = Math.min(Vc, t * 0.5), m = w(i);
  m.current = i;
  const g = w(o);
  return g.current = o, se(() => {
    if (!et || !c) return;
    const b = (N) => {
      if (!di(N.pointerType) || N.button !== 0) return;
      const k = N.target;
      if (!k.closest(r) || (m.current ? !m.current(k) : Xc(k))) return;
      const R = N.clientX, _ = N.clientY;
      d.current = { x: R, y: _, target: N.target }, f.current = !0, e && (u.current = setTimeout(() => l({ x: R, y: _ }), p)), a.current = setTimeout(() => {
        if (!f.current) return;
        u.current && (clearTimeout(u.current), u.current = null), l(null);
        const L = d.current.target;
        if (!L) return;
        const A = g.current;
        if (A) {
          A(L, R, _);
          return;
        }
        const W = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: R,
          clientY: _,
          button: 2,
          view: window
        });
        L.dispatchEvent(W);
      }, t);
    }, x = (N) => {
      if (!f.current || a.current === null) return;
      const k = N.clientX - d.current.x, R = N.clientY - d.current.y;
      Math.sqrt(k * k + R * R) > Yc && (clearTimeout(a.current), a.current = null, u.current && (clearTimeout(u.current), u.current = null), f.current = !1, l(null));
    }, I = () => {
      a.current !== null && (clearTimeout(a.current), a.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, l(null);
    }, M = (N) => {
      di(N.pointerType) && (a.current !== null && (clearTimeout(a.current), a.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, l(null));
    };
    return c == null || c.addEventListener("pointerdown", b), c.addEventListener("pointermove", x), c.addEventListener("pointerup", I), c.addEventListener("pointercancel", I), c.addEventListener("pointerleave", M), () => {
      c.removeEventListener("pointerdown", b), c.removeEventListener("pointermove", x), c.removeEventListener("pointerup", I), c == null || c.removeEventListener("pointercancel", I), c == null || c.removeEventListener("pointerleave", M), a.current !== null && clearTimeout(a.current), u.current !== null && clearTimeout(u.current);
    };
  }, [e, t, p, r]), /* @__PURE__ */ C(st, { children: [
    n,
    e && s && /* @__PURE__ */ h(Gc, { x: s.x, y: s.y, ms: t - p })
  ] });
}
function Eh() {
  const n = mc();
  return pc ? n === null || di(n) : !1;
}
const Qc = {
  border: "1px solid #d4d4d8",
  background: "rgba(255,255,255,0.94)",
  color: "#52525b",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
}, Zc = {
  border: "2px solid #2563eb",
  background: "#2563eb",
  color: "#fff",
  boxShadow: "0 4px 16px rgba(37,99,235,0.4)"
}, ea = {
  border: "1px solid #f59e0b",
  background: "rgba(255, 251, 235, 0.94)",
  color: "#b45309",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
};
function Mh({
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
        ...e ? ea : n ? Zc : Qc,
        ...t
      },
      ...s,
      children: o
    }
  );
}
const ta = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], na = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], ei = 1900, ti = 2100;
function ra(n, e) {
  return new Date(n, e + 1, 0).getDate();
}
function ia(n, e, t) {
  return `${n}-${String(e + 1).padStart(2, "0")}-${String(t).padStart(2, "0")}`;
}
function Rh({ selected: n, onChange: e, theme: t, showChips: r = !0, className: i = "", initialView: o }) {
  const s = Gt(), l = t ?? (s == null ? void 0 : s.mode) ?? "light", c = /* @__PURE__ */ new Date(), a = (() => {
    if (!o) return c;
    const V = /* @__PURE__ */ new Date(o + "T00:00:00");
    return isNaN(V.getTime()) ? c : V;
  })(), [u, d] = re(a.getFullYear()), [f, p] = re(a.getMonth()), [m, g] = re("days"), [b, x] = re(null), I = Qe(() => new Set(n), [n]), M = (V) => {
    I.has(V) ? e(n.filter((ne) => ne !== V)) : e([...n, V]);
  }, N = Qe(() => {
    const V = ra(u, f), ne = new Date(u, f, 1).getDay(), de = [];
    for (let Se = 0; Se < ne; Se++) de.push({ key: `pad-${Se}`, day: 0, empty: !0 });
    for (let Se = 1; Se <= V; Se++) de.push({ key: ia(u, f, Se), day: Se, empty: !1 });
    return de;
  }, [u, f]), k = (V) => d((ne) => Math.max(ei, Math.min(ti, ne + V))), R = (V) => {
    f + V < 0 ? (d((ne) => Math.max(ei, ne - 1)), p(11)) : f + V > 11 ? (d((ne) => Math.min(ti, ne + 1)), p(0)) : p((ne) => ne + V);
  }, _ = () => {
    if (b === null) return;
    const V = parseInt(b, 10);
    !isNaN(V) && V >= ei && V <= ti && d(V), x(null);
  }, L = (V) => n.some((ne) => ne.startsWith(`${u}-${String(V + 1).padStart(2, "0")}`)), A = Oe(), W = P(4, 8, A), S = P(16, 20, A), $ = P(10, 11, A), O = P(6, 8, A), F = P(12, 14, A), Y = P(6, 10, A), E = P(12, 14, A), q = P(8, 12, A), H = P(10, 12, A), T = P(6, 10, A), Me = P(2, 6, A), ye = P(64, 80, A), me = { padding: W }, he = { width: S, height: S }, X = { fontSize: $, paddingTop: O, paddingBottom: O }, ae = { fontSize: F, paddingTop: Y, paddingBottom: Y }, j = { fontSize: E, paddingTop: q, paddingBottom: q }, K = { fontSize: H, padding: `${Me}px ${T}px` }, Z = "bg-[var(--ui-date-selected-bg)] text-[color:var(--ui-date-selected-text)] hover:bg-[var(--ui-date-selected-hover-bg)]", te = "text-[color:var(--ui-text)] hover:bg-[var(--ui-card-hover)]";
  return /* @__PURE__ */ C("div", { "data-mode": l, "data-accent": s == null ? void 0 : s.accent, "data-surface": s == null ? void 0 : s.surface, className: `border rounded-lg overflow-hidden w-full border-[color:var(--ui-border-strong)] bg-[var(--ui-date-body-bg)] text-[color:var(--ui-text)] ${i}`, children: [
    /* @__PURE__ */ C("div", { className: "flex items-center justify-between px-3 py-2 border-b bg-[var(--ui-date-header-bg)] text-[color:var(--ui-date-header-text)] border-[color:var(--ui-border)]", children: [
      /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => m === "months" ? k(-1) : R(-1),
          style: me,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": m === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ h(Ll, { style: he })
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
          onChange: (V) => x(V.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: (V) => V.target.select(),
          onBlur: _,
          onKeyDown: (V) => {
            V.key === "Enter" && (V.preventDefault(), _()), V.key === "Escape" && x(null);
          },
          style: { width: ye },
          className: "text-sm text-center font-semibold rounded outline-none py-0.5 bg-[var(--ui-date-header-hover)] text-[color:var(--ui-date-header-text)]"
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => m === "months" ? k(1) : R(1),
          style: me,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": m === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ h(Er, { style: he })
        }
      )
    ] }),
    m === "months" ? /* @__PURE__ */ C("div", { children: [
      /* @__PURE__ */ h("div", { className: "grid grid-cols-3 text-center", children: na.map((V, ne) => /* @__PURE__ */ C(
        "button",
        {
          type: "button",
          onClick: () => {
            p(ne), g("days");
          },
          style: j,
          className: `relative font-medium transition-colors border-b border-[color:var(--ui-border)] ${ne === f ? Z : te}`,
          children: [
            V,
            L(ne) && /* @__PURE__ */ h("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${ne === f ? "bg-[var(--ui-date-selected-text)]" : "bg-[var(--ui-accent-solid)]"}` })
          ]
        },
        V
      )) }),
      /* @__PURE__ */ h("div", { className: "text-center border-t border-[color:var(--ui-border)]", children: /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => {
            d(c.getFullYear()), p(c.getMonth()), g("days");
          },
          style: { paddingTop: Y, paddingBottom: Y, fontSize: F },
          className: "px-3 font-semibold rounded transition-colors text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-card-hover)]",
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ C("div", { className: "grid grid-cols-7 text-center", children: [
      ta.map((V) => /* @__PURE__ */ h("div", { style: X, className: "font-semibold uppercase tracking-wider border-b text-[color:var(--ui-text-faint)] border-[color:var(--ui-border)]", children: V }, V)),
      N.map((V) => V.empty ? /* @__PURE__ */ h("div", {}, V.key) : /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => M(V.key),
          style: ae,
          className: `font-medium transition-colors border-b border-[color:var(--ui-border)] ${I.has(V.key) ? Z : te}`,
          children: V.day
        },
        V.key
      ))
    ] }),
    r && n.length > 0 && /* @__PURE__ */ C("div", { className: "px-3 py-2 border-t border-[color:var(--ui-border)] bg-[var(--ui-date-footer-bg)]", children: [
      /* @__PURE__ */ C("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-[color:var(--ui-text-muted)]", children: [
        n.length,
        " date",
        n.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ h("div", { className: "flex flex-wrap gap-1", children: n.map((V) => {
        const ne = /* @__PURE__ */ new Date(V + "T00:00:00"), de = ne.getFullYear() === c.getFullYear() ? ne.toLocaleString("default", { month: "short", day: "numeric" }) : ne.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ C(
          "button",
          {
            type: "button",
            onClick: () => M(V),
            "aria-label": `Remove ${de}`,
            style: K,
            className: "inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors bg-[var(--ui-date-chip-bg)] text-[color:var(--ui-date-chip-text)] hover:bg-[var(--ui-date-chip-hover-bg)]",
            children: [
              de,
              /* @__PURE__ */ h("span", { className: "leading-none text-[color:var(--ui-text-muted)]", "aria-hidden": "true", children: "×" })
            ]
          },
          V
        );
      }) })
    ] })
  ] });
}
function Ah({
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
  const p = (N) => e instanceof Set ? e.has(N) : e.includes(N), m = Oe(), g = P(12, 16, m), b = P(8, 12, m), x = P(12, 14, m), I = P(16, 20, m), M = r != null || i != null;
  return /* @__PURE__ */ C("div", { className: f, ...d ? { "data-theme": d } : {}, children: [
    M && /* @__PURE__ */ C("div", { className: "flex items-center justify-between ui-checklist-header", children: [
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
            const k = p(N.id), R = /* @__PURE__ */ h(Ri, { checked: k, size: I });
            return /* @__PURE__ */ C(
              "button",
              {
                type: "button",
                disabled: a,
                onClick: () => t(N.id),
                "aria-pressed": k,
                className: `ui-checklist-item ${k ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${b}px ${g}px`, fontSize: x },
                ...N.dataProps,
                children: [
                  u === "leading" && R,
                  N.leading != null && /* @__PURE__ */ h("span", { className: "ui-checklist-leading", children: N.leading }),
                  /* @__PURE__ */ h("span", { className: "ui-checklist-label", children: N.label }),
                  N.secondary != null && /* @__PURE__ */ h("span", { className: "ui-checklist-secondary", children: N.secondary }),
                  u === "trailing" && /* @__PURE__ */ h("span", { className: "ml-auto flex shrink-0", children: R })
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
function Ih({
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
  const u = Oe(), d = s ? 10 : P(12, 16, u), f = s ? 6 : P(8, 12, u), p = s ? 12 : P(12, 14, u), m = s ? 14 : P(16, 20, u);
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
const $h = ({
  className: n,
  children: e,
  reference: t,
  placement: r = "top",
  anchorMode: i = "visible",
  offset: o = 8
}) => {
  const s = cr(), { refs: l, floatingStyles: c } = Vl({
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
      _o(o),
      jo({ padding: 8 }),
      Wo({ padding: 8 }),
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
    whileElementsMounted: Yl
  });
  return dt(() => {
    t && l.setReference(t);
  }, [t, l]), /* @__PURE__ */ C(st, { children: [
    !t && /* @__PURE__ */ h("div", { ref: l.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    s && Hr(
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
function oa(n, e) {
  if (!e || !ot.isValidElement(n)) return {};
  const t = n.props;
  if (t["aria-label"] || t.title) return {};
  const r = t.children;
  if (typeof r == "string" ? r.trim().length > 0 : Array.isArray(r) ? r.some((s) => typeof s == "string" && s.trim().length > 0) : !1) return {};
  const o = e.split(`
`)[0].replace(/^•\s*/, "").trim().slice(0, 80);
  return o ? { "aria-label": o } : {};
}
const An = ({ content: n, children: e }) => {
  const t = Gt(), r = Oe(), i = P(10, 12, r), o = P(6, 6, r), s = P(10, 12, r), l = { padding: `${o}px ${i}px`, fontSize: s }, c = _n(), a = cr(), [u, d] = re(!1), [f, p] = re({ x: 0, y: 0 }), m = w(null), g = w(null), b = () => {
    if (!m.current) return;
    const M = m.current.getBoundingClientRect();
    p({ x: M.left + M.width / 2, y: M.top });
  };
  se(() => () => {
    g.current && clearTimeout(g.current);
  }, []), se(() => (u && a && (b(), a.addEventListener("scroll", b, !0)), () => a == null ? void 0 : a.removeEventListener("scroll", b, !0)), [u]);
  const x = oa(e, n), I = Object.keys(x).length > 0 ? ot.cloneElement(e, x) : e;
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
        I,
        u && Hr(
          /* @__PURE__ */ C(
            "div",
            {
              "data-mode": t == null ? void 0 : t.mode,
              "data-accent": t == null ? void 0 : t.accent,
              className: "ui-tooltip fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-[color:var(--ui-tooltip-border)] bg-[var(--ui-tooltip-bg)] text-[color:var(--ui-tooltip-text)] pointer-events-none",
              style: { ...l, left: f.x, top: f.y - 4, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                n.split(`
• `).map((M, N) => /* @__PURE__ */ h("div", { className: N > 0 ? "mt-0.5 pt-0.5 border-t border-[color:var(--ui-tooltip-sep)]" : "", children: M }, N)),
                /* @__PURE__ */ h("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[color:var(--ui-tooltip-bg)]" })
              ]
            }
          ),
          c ?? document.body
        )
      ]
    }
  );
}, sa = 250;
function la(n, e, t) {
  const [r, i] = ot.useState(null), [o, s] = ot.useState(!1), l = ot.useRef(null), c = ot.useRef(t);
  c.current = t;
  const a = ot.useCallback(() => {
    var f;
    const d = (f = e.current) == null ? void 0 : f[c.current];
    d && i({ left: d.offsetLeft, width: d.offsetWidth });
  }, [e]);
  ot.useLayoutEffect(() => {
    a();
  }, [t, a]), ot.useLayoutEffect(() => {
    const d = n.current;
    if (!d) return;
    const f = () => {
      s(!0), l.current && clearTimeout(l.current), l.current = setTimeout(() => s(!1), sa), a();
    }, p = new ResizeObserver(f);
    p.observe(d);
    for (const m of e.current ?? []) m && p.observe(m);
    return () => {
      p.disconnect(), l.current && (clearTimeout(l.current), l.current = null);
    };
  }, [n, e, a]);
  const u = ot.useMemo(
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
function Jr() {
  const n = Oe(), e = et, t = e ? P(28, 40, n) : 28, r = e ? P(28, 40, n) : 28, i = e ? P(10, 14, n) : 10, o = e ? P(10, 14, n) : 10, s = e ? P(8, 10, n) : 8;
  return {
    toggle: { width: t, height: t },
    control: { height: r, padding: `0 ${i}px`, fontSize: o },
    input: { height: r, padding: `0 ${s}px`, fontSize: o }
  };
}
const zh = et ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", ca = et ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", mr = et ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", aa = "hover:bg-red-950/50", Dh = et ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", Ph = "bg-[var(--ui-accent-selected-bg)] border-[var(--ui-border-strong)] text-[color:var(--ui-accent-selected-text)]", Lh = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", ua = et ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", Oh = et ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50", xs = et ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", da = "inline-flex rounded-[var(--ui-radius-btn)] overflow-hidden border border-[var(--ui-border-strong)]", fa = et ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", gr = ({ onClick: n, disabled: e, title: t, className: r = ca, children: i }) => {
  const o = Jr();
  return /* @__PURE__ */ h(An, { content: t, children: /* @__PURE__ */ h("button", { onClick: n, disabled: e, "aria-label": t, style: o.control, className: `${r} ${e ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) });
}, yr = {
  wrap: "border-[color:var(--ui-border-strong)] bg-[var(--ui-seg-track-bg)]",
  pill: "bg-[var(--ui-seg-pill)]",
  active: "text-[color:var(--ui-accent-pill-text)]",
  idle: "text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-seg-hover)]"
}, Bh = ({ value: n, options: e, onChange: t, disabled: r, active: i, stretch: o, dense: s, variant: l = "chrome", theme: c, tablist: a, iconCollapse: u = !1, iconWithLabel: d = !0, ariaLabel: f }) => {
  const p = Gt(), m = c ?? wc(p), g = c === "blue" || c === "emerald" ? c : (p == null ? void 0 : p.accent) ?? "zinc", b = { "data-mode": m === "dark" ? "dark" : "light", "data-accent": g }, x = Jr(), I = Oe(), M = s && !et ? 24 : x.control.height, N = hn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), k = et ? N : { padding: "0 12px", fontSize: 12, height: s ? 20 : 24 }, R = (S) => i ? i(S) : n === S, _ = ot.useRef(null), L = ot.useRef([]), A = Math.max(0, e.findIndex((S) => R(S.v))), W = la(_, L, A);
  return l === "track" ? /* @__PURE__ */ C(
    "div",
    {
      ref: _,
      role: a ? "tablist" : "group",
      "aria-label": f,
      ...b,
      className: `relative inline-flex items-center rounded-[var(--ui-radius-btn)] border p-0.5 ${et ? "" : s ? "h-[26px]" : "h-[30px]"} ${o ? "w-full" : ""} ${yr.wrap}`,
      children: [
        W.style && /* @__PURE__ */ h(
          "span",
          {
            "aria-hidden": !0,
            className: `absolute rounded-[var(--ui-radius-inset)] ${yr.pill} ${W.motionClass}`,
            style: { ...W.style, top: 2, bottom: 2 }
          }
        ),
        e.map((S, $) => {
          const O = R(S.v), F = u && !!S.icon;
          return /* @__PURE__ */ h(
            "button",
            {
              ref: (Y) => {
                L.current[$] = Y;
              },
              ...S.dataProps,
              type: "button",
              disabled: r,
              onClick: () => t(S.v),
              title: S.title,
              role: a ? "tab" : void 0,
              "aria-selected": a ? O : void 0,
              "aria-pressed": a ? void 0 : O,
              "aria-label": S.ariaLabel ?? (S.l ? void 0 : S.title),
              style: k,
              className: `relative z-10 inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-[var(--ui-radius-inset)] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${F ? "group gap-0" : "gap-1.5"} ${o ? "flex-1" : ""} ${O ? yr.active : yr.idle}`,
              children: /* @__PURE__ */ h(
                ss,
                {
                  icon: S.icon,
                  collapse: F,
                  iconWithLabel: d,
                  active: O,
                  gap: P(6, 8, I),
                  children: S.l
                }
              )
            },
            S.v
          );
        })
      ]
    }
  ) : /* @__PURE__ */ C("div", { ref: _, className: `relative ${da} bg-[var(--ui-seg-track-bg)]${o ? " w-full" : ""}`, children: [
    W.style && /* @__PURE__ */ h(
      "span",
      {
        "aria-hidden": !0,
        className: `absolute bg-[var(--ui-accent-pill-bg)] ${W.motionClass}`,
        style: { ...W.style, top: 0, bottom: 0 }
      }
    ),
    e.map((S, $) => {
      const O = R(S.v);
      return /* @__PURE__ */ C(
        "button",
        {
          ref: (F) => {
            L.current[$] = F;
          },
          ...S.dataProps,
          disabled: r,
          onClick: () => t(S.v),
          title: S.title,
          style: { ...x.control, height: M },
          className: `relative z-10 font-medium transition-colors disabled:opacity-30 ${o ? "flex-1" : ""} ${O ? "text-[color:var(--ui-accent-pill-text)]" : "text-[color:var(--ui-text-muted)] hover:bg-[var(--ui-accent-hover-bg)]"} ${S.v !== e[e.length - 1].v ? "border-r border-[var(--ui-border)]" : ""}`,
          children: [
            S.icon,
            S.l
          ]
        },
        S.v
      );
    })
  ] });
}, Fh = ({ children: n }) => /* @__PURE__ */ C("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ h("span", { className: et ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: n }),
  /* @__PURE__ */ h("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), ha = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", pa = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", Hh = ({ label: n, children: e, tall: t }) => /* @__PURE__ */ C("div", { className: t ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  n && /* @__PURE__ */ h("span", { className: t ? ha : pa, children: n }),
  e
] }), _h = ({ leading: n, trailing: e, className: t = "" }) => /* @__PURE__ */ C("div", { className: `flex flex-wrap items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-0 ${t}`, children: [
  n,
  e && /* @__PURE__ */ h("div", { className: "ml-auto flex flex-wrap items-center justify-end gap-1", children: e })
] }), jh = ({ readOnly: n, onDuplicate: e, onRemove: t, onMove: r, compact: i }) => (
  // One unbreakable cluster: when a header's trailing wraps, the move pair and
  // the duplicate/delete pair stay together (no orphaned icons on a line).
  /* @__PURE__ */ C("div", { className: "flex items-center gap-1 shrink-0", children: [
    /* @__PURE__ */ h(gr, { onClick: () => r(-1), disabled: n, title: "Move up", className: mr, children: /* @__PURE__ */ h(Ol, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ h(gr, { onClick: () => r(1), disabled: n, title: "Move down", className: mr, children: /* @__PURE__ */ h(Bl, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ h(gr, { onClick: e, disabled: n, title: "Duplicate", className: mr, children: /* @__PURE__ */ h(Fo, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ h("div", { className: xs }),
    /* @__PURE__ */ h(gr, { onClick: t, disabled: n, title: "Delete", className: `${mr} ${aa}`, children: /* @__PURE__ */ h(ui, { className: "w-2.5 h-2.5" }) })
  ] })
);
var ao = Object.defineProperty, ma = (n, e) => {
  let t = {};
  for (var r in n) ao(t, r, {
    get: n[r],
    enumerable: !0
  });
  return ao(t, Symbol.toStringTag, { value: "Module" }), t;
};
function gt(n) {
  this.content = n;
}
gt.prototype = {
  constructor: gt,
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
    return i == -1 ? o.push(t || n, e) : (o[i + 1] = e, t && (o[i] = t)), new gt(o);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(n) {
    var e = this.find(n);
    if (e == -1) return this;
    var t = this.content.slice();
    return t.splice(e, 2), new gt(t);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(n, e) {
    return new gt([n, e].concat(this.remove(n).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(n, e) {
    var t = this.remove(n).content.slice();
    return t.push(n, e), new gt(t);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(n, e, t) {
    var r = this.remove(e), i = r.content.slice(), o = r.find(n);
    return i.splice(o == -1 ? i.length : o, 0, e, t), new gt(i);
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
    return n = gt.from(n), n.size ? new gt(n.content.concat(this.subtract(n).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(n) {
    return n = gt.from(n), n.size ? new gt(this.subtract(n).content.concat(n.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(n) {
    var e = this;
    n = gt.from(n);
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
gt.from = function(n) {
  if (n instanceof gt) return n;
  var e = [];
  if (n) for (var t in n) e.push(t, n[t]);
  return new gt(e);
};
function bs(n, e, t) {
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
      return c && c < s.length && c < l.length && ks(s.charCodeAt(c - 1)) && ws(s.charCodeAt(c)) && t--, t;
    }
    if (i.content.size || o.content.size) {
      let s = bs(i.content, o.content, t + 1);
      if (s != null)
        return s;
    }
    t += i.nodeSize;
  }
}
function vs(n, e, t, r) {
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
      return d && f && d < a.length && ks(a.charCodeAt(d - 1)) && ws(a.charCodeAt(d)) && (t++, r++), { a: t, b: r };
    }
    if (s.content.size || l.content.size) {
      let a = vs(s.content, l.content, t - 1, r - 1);
      if (a)
        return a;
    }
    t -= c, r -= c;
  }
}
function ws(n) {
  return n >= 56320 && n < 57344;
}
function ks(n) {
  return n >= 55296 && n < 56320;
}
class J {
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
    return new J(i, this.size + e.size);
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
    return new J(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, t) {
    return e == t ? J.empty : e == 0 && t == this.content.length ? this : new J(this.content.slice(e, t));
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
    return i[e] = t, new J(i, o);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new J([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new J(this.content.concat(e), this.size + e.nodeSize);
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
    return bs(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, r = e.size) {
    return vs(this, e, t, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e) {
    if (e == 0)
      return xr(0, e);
    if (e == this.size)
      return xr(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let t = 0, r = 0; ; t++) {
      let i = this.child(t), o = r + i.nodeSize;
      if (o >= e)
        return o == e ? xr(t + 1, o) : xr(t, r);
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
      return J.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return J.fromArray(t.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return J.empty;
    let t, r = 0;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      r += o.nodeSize, i && o.isText && e[i - 1].sameMarkup(o) ? (t || (t = e.slice(0, i)), t[t.length - 1] = o.withText(t[t.length - 1].text + o.text)) : t && t.push(o);
    }
    return new J(t || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return J.empty;
    if (e instanceof J)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new J([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
J.empty = new J([], 0);
const ni = { index: 0, offset: 0 };
function xr(n, e) {
  return ni.index = n, ni.offset = e, ni;
}
function Ir(n, e) {
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
      if (!Ir(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !Ir(n[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in n))
        return !1;
  }
  return !0;
}
let Ke = class pi {
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
    return this == e || this.type == e.type && Ir(this.attrs, e.attrs);
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
      return pi.none;
    if (e instanceof pi)
      return [e];
    let t = e.slice();
    return t.sort((r, i) => r.type.rank - i.type.rank), t;
  }
};
Ke.none = [];
class nr extends Error {
}
class le {
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
    let r = Ns(this.content, e + this.openStart, t, this.openStart + 1, this.openEnd + 1);
    return r && new le(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new le(Ss(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
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
      return le.empty;
    let r = t.openStart || 0, i = t.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new le(J.fromJSON(e, t.content), r, i);
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
    return new le(e, r, i);
  }
}
le.empty = new le(J.empty, 0, 0);
function Ss(n, e, t) {
  let { index: r, offset: i } = n.findIndex(e), o = n.maybeChild(r), { index: s, offset: l } = n.findIndex(t);
  if (i == e || o.isText) {
    if (l != t && !n.child(s).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != s)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, o.copy(Ss(o.content, e - i - 1, t - i - 1)));
}
function Ns(n, e, t, r, i, o) {
  let { index: s, offset: l } = n.findIndex(e), c = n.maybeChild(s);
  if (l == e || c.isText)
    return o && r <= 0 && i <= 0 && !o.canReplace(s, s, t) ? null : n.cut(0, e).append(t).append(n.cut(e));
  let a = Ns(c.content, e - l - 1, t, s == 0 ? r - 1 : 0, s == n.childCount - 1 ? i - 1 : 0, c);
  return a && n.replaceChild(s, c.copy(a));
}
function ga(n, e, t) {
  if (t.openStart > n.depth)
    throw new nr("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new nr("Inconsistent open depths");
  return Ts(n, e, t, 0);
}
function Ts(n, e, t, r) {
  let i = n.index(r), o = n.node(r);
  if (i == e.index(r) && r < n.depth - t.openStart) {
    let s = Ts(n, e, t, r + 1);
    return o.copy(o.content.replaceChild(i, s));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let s = n.parent, l = s.content;
      return wn(s, l.cut(0, n.parentOffset).append(t.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: s, end: l } = ya(t, n);
      return wn(o, Es(n, s, l, e, r));
    }
  else return wn(o, $r(n, e, r));
}
function Cs(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new nr("Cannot join " + e.type.name + " onto " + n.type.name);
}
function mi(n, e, t) {
  let r = n.node(t);
  return Cs(r, e.node(t)), r;
}
function vn(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t]) ? e[t] = n.withText(e[t].text + n.text) : e.push(n);
}
function Qn(n, e, t, r) {
  let i = (e || n).node(t), o = 0, s = e ? e.index(t) : i.childCount;
  n && (o = n.index(t), n.depth > t ? o++ : n.textOffset && (vn(n.nodeAfter, r), o++));
  for (let l = o; l < s; l++)
    vn(i.child(l), r);
  e && e.depth == t && e.textOffset && vn(e.nodeBefore, r);
}
function wn(n, e) {
  if (!n.type.validContent(e))
    throw new nr("Invalid content for node " + n.type.name);
  return n.copy(e);
}
function Es(n, e, t, r, i) {
  let o = n.depth > i && mi(n, e, i + 1), s = r.depth > i && mi(t, r, i + 1), l = [];
  return Qn(null, n, i, l), o && s && e.index(i) == t.index(i) ? (Cs(o, s), vn(wn(o, Es(n, e, t, r, i + 1)), l)) : (o && vn(wn(o, $r(n, e, i + 1)), l), Qn(e, t, i, l), s && vn(wn(s, $r(t, r, i + 1)), l)), Qn(r, null, i, l), new J(l);
}
function $r(n, e, t) {
  let r = [];
  if (Qn(null, n, t, r), n.depth > t) {
    let i = mi(n, e, t + 1);
    vn(wn(i, $r(n, e, t + 1)), r);
  }
  return Qn(e, null, t, r), new J(r);
}
function ya(n, e) {
  let t = e.depth - n.openStart, i = e.node(t).copy(n.content);
  for (let o = t - 1; o >= 0; o--)
    i = e.node(o).copy(J.from(i));
  return {
    start: i.resolveNoCache(n.openStart + t),
    end: i.resolveNoCache(i.content.size - n.openEnd - t)
  };
}
class rr {
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
        return new zr(this, e, r);
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
    return new rr(t, r, o);
  }
  /**
  @internal
  */
  static resolveCached(e, t) {
    let r = uo.get(e);
    if (r)
      for (let o = 0; o < r.elts.length; o++) {
        let s = r.elts[o];
        if (s.pos == t)
          return s;
      }
    else
      uo.set(e, r = new xa());
    let i = r.elts[r.i] = rr.resolve(e, t);
    return r.i = (r.i + 1) % ba, i;
  }
}
class xa {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const ba = 12, uo = /* @__PURE__ */ new WeakMap();
class zr {
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
const va = /* @__PURE__ */ Object.create(null);
let Dn = class gi {
  /**
  @internal
  */
  constructor(e, t, r, i = Ke.none) {
    this.type = e, this.attrs = t, this.marks = i, this.content = r || J.empty;
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
    return this.type == e && Ir(this.attrs, t || e.defaultAttrs || va) && Ke.sameSet(this.marks, r || Ke.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new gi(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new gi(this.type, this.attrs, this.content, e);
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
      return le.empty;
    let i = this.resolve(e), o = this.resolve(t), s = r ? 0 : i.sharedDepth(t), l = i.start(s), a = i.node(s).content.cut(i.pos - l, o.pos - l);
    return new le(a, i.depth - s, o.depth - s);
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
    return ga(this.resolve(e), this.resolve(t), r);
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
    return rr.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return rr.resolve(this, e);
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
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), Ms(this.marks, e);
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
  canReplace(e, t, r = J.empty, i = 0, o = r.childCount) {
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
    this.type.checkContent(this.content), fo(this.type.attrs, this.attrs, "node", this.type.name);
    let e = Ke.none;
    for (let t = 0; t < this.marks.length; t++) {
      let r = this.marks[t];
      fo(r.type.attrs, r.attrs, "mark", r.type.name), e = r.addToSet(e);
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
    let i = J.fromJSON(e, t.content);
    return e.nodeType(t.type).create(t.attrs, i, r);
  }
};
Dn.prototype.text = void 0;
class Dr extends Dn {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    if (super(e, t, null, i), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : Ms(this.marks, JSON.stringify(this.text));
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
    return e == this.marks ? this : new Dr(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new Dr(this.type, this.attrs, e, this.marks);
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
function Ms(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    e = n[t].type.name + "(" + e + ")";
  return e;
}
function fo(n, e, t, r) {
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
    let r = new wa(e, t);
    if (r.next == null)
      return Nn.empty;
    let i = Rs(r);
    r.next && r.err("Unexpected trailing text");
    let o = Ma(Ea(i));
    return Ra(o, r), o;
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
        return J.from(l.map((a) => a.createAndFill()));
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
class wa {
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
function Rs(n) {
  let e = [];
  do
    e.push(ka(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function ka(n) {
  let e = [];
  do
    e.push(Sa(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function Sa(n) {
  let e = Ca(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = Na(n, e);
    else
      break;
  return e;
}
function ho(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function Na(n, e) {
  let t = ho(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = ho(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function Ta(n, e) {
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
function Ca(n) {
  if (n.eat("(")) {
    let e = Rs(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = Ta(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function Ea(n) {
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
function As(n, e) {
  return e - n;
}
function po(n, e) {
  let t = [];
  return r(e), t.sort(As);
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
function Ma(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(po(n, 0));
  function t(r) {
    let i = [];
    r.forEach((s) => {
      n[s].forEach(({ term: l, to: c }) => {
        if (!l)
          return;
        let a;
        for (let u = 0; u < i.length; u++)
          i[u][0] == l && (a = i[u][1]);
        po(n, c).forEach((u) => {
          a || i.push([l, a = []]), a.indexOf(u) == -1 && a.push(u);
        });
      });
    });
    let o = e[r.join(",")] = new Nn(r.indexOf(n.length - 1) > -1);
    for (let s = 0; s < i.length; s++) {
      let l = i[s][1].sort(As);
      o.next.push({ type: i[s][0], next: e[l.join(",")] || t(l) });
    }
    return o;
  }
}
function Ra(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let i = r[t], o = !i.validEnd, s = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: c, next: a } = i.next[l];
      s.push(c.name), o && !(c.isText || c.hasRequiredAttrs()) && (o = !1), r.indexOf(a) == -1 && r.push(a);
    }
    o && e.err("Only non-generatable nodes (" + s.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function Is(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault)
      return null;
    e[t] = r.default;
  }
  return e;
}
function $s(n, e) {
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
function zs(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      t[r] = new Ia(n, r, e[r]);
  return t;
}
class Pr {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = zs(e, r.attrs), this.defaultAttrs = Is(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
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
    return !e && this.defaultAttrs ? this.defaultAttrs : $s(this.attrs, e);
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
    return new Dn(this, this.computeAttrs(e), J.from(t), Ke.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = J.from(t), this.checkContent(t), new Dn(this, this.computeAttrs(e), t, Ke.setFrom(r));
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
    if (e = this.computeAttrs(e), t = J.from(t), t.size) {
      let s = this.contentMatch.fillBefore(t);
      if (!s)
        return null;
      t = s.append(t);
    }
    let i = this.contentMatch.matchFragment(t), o = i && i.fillBefore(J.empty, !0);
    return o ? new Dn(this, e, t.append(o), Ke.setFrom(r)) : null;
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
    e.forEach((o, s) => r[o] = new Pr(o, t, s));
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
function Aa(n, e, t) {
  let r = t.split("|");
  return (i) => {
    let o = i === null ? "null" : typeof i;
    if (r.indexOf(o) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${n}, got ${o}`);
  };
}
class Ia {
  constructor(e, t, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? Aa(e, t, r.validate) : r.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class Vr {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    this.name = e, this.rank = t, this.schema = r, this.spec = i, this.attrs = zs(e, i.attrs), this.excluded = null;
    let o = Is(this.attrs);
    this.instance = o ? new Ke(this, o) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new Ke(this, $s(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((o, s) => r[o] = new Vr(o, i++, t, s)), r;
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
class $a {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let i in e)
      t[i] = e[i];
    t.nodes = gt.from(e.nodes), t.marks = gt.from(e.marks || {}), this.nodes = Pr.compile(this.spec.nodes, this), this.marks = Vr.compile(this.spec.marks, this);
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
      o.markSet = l == "_" ? null : l ? mo(this, l.split(" ")) : l == "" || !o.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let o = this.marks[i], s = o.spec.excludes;
      o.excluded = s == null ? [o] : s == "" ? [] : mo(this, s.split(" "));
    }
    this.nodeFromJSON = (i) => Dn.fromJSON(this, i), this.markFromJSON = (i) => Ke.fromJSON(this, i), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
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
    else if (e instanceof Pr) {
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
    return new Dr(r, r.defaultAttrs, e, Ke.setFrom(t));
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
function mo(n, e) {
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
function za(n) {
  return n.tag != null;
}
function Da(n) {
  return n.style != null;
}
class Pn {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, t) {
    this.schema = e, this.rules = t, this.tags = [], this.styles = [];
    let r = this.matchedStyles = [];
    t.forEach((i) => {
      if (za(i))
        this.tags.push(i);
      else if (Da(i)) {
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
    let r = new yo(this, t, !1);
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
    let r = new yo(this, t, !0);
    return r.addAll(e, Ke.none, t.from, t.to), le.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let o = this.tags[i];
      if (Oa(e, o.tag) && (o.namespace === void 0 || e.namespaceURI == o.namespace) && (!o.context || t.matchesContext(o.context))) {
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
        r(s = xo(s)), s.mark || s.ignore || s.clearMark || (s.mark = i);
      });
    }
    for (let i in e.nodes) {
      let o = e.nodes[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = xo(s)), s.node || s.ignore || s.mark || (s.node = i);
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
    return e.cached.domParser || (e.cached.domParser = new Pn(e, Pn.schemaRules(e)));
  }
}
const Ds = {
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
}, Pa = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, Ps = { ol: !0, ul: !0 }, ir = 1, yi = 2, Zn = 4;
function go(n, e, t) {
  return e != null ? (e ? ir : 0) | (e === "full" ? yi : 0) : n && n.whitespace == "pre" ? ir | yi : t & ~Zn;
}
class br {
  constructor(e, t, r, i, o, s) {
    this.type = e, this.attrs = t, this.marks = r, this.solid = i, this.options = s, this.content = [], this.activeMarks = Ke.none, this.match = o || (s & Zn ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let t = this.type.contentMatch.fillBefore(J.from(e));
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
    if (!(this.options & ir)) {
      let r = this.content[this.content.length - 1], i;
      if (r && r.isText && (i = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let o = r;
        r.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = o.withText(o.text.slice(0, o.text.length - i[0].length));
      }
    }
    let t = J.from(this.content);
    return !e && this.match && (t = t.append(this.match.fillBefore(J.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Ds.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class yo {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0, this.localPreserveWS = !1;
    let i = t.topNode, o, s = go(null, t.preserveWhitespace, 0) | (r ? Zn : 0);
    i ? o = new br(i.type, i.attrs, Ke.none, !0, t.topMatch || i.type.contentMatch, s) : r ? o = new br(null, null, Ke.none, !0, null, s) : o = new br(e.schema.topNodeType, null, Ke.none, !0, null, s), this.nodes = [o], this.find = t.findPositions, this.needsBlock = !1;
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
    let r = e.nodeValue, i = this.top, o = i.options & yi ? "full" : this.localPreserveWS || (i.options & ir) > 0, { schema: s } = this.parser;
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
    Ps.hasOwnProperty(s) && this.parser.normalizeLists && La(e);
    let c = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, r));
    e: if (c ? c.ignore : Pa.hasOwnProperty(s))
      this.findInside(e), this.ignoreFallback(e, t);
    else if (!c || c.skip || c.closeParent) {
      c && c.closeParent ? this.open = Math.max(0, this.open - 1) : c && c.skip.nodeType && (e = c.skip);
      let a, u = this.needsBlock;
      if (Ds.hasOwnProperty(s))
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
        (o.type ? o.type.allowsMarkType(l.type) : bo(l.type, e.type)) && (s = l.addToSet(s));
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
    let l = go(e, o, s.options);
    s.options & Zn && s.content.length == 0 && (l |= Zn);
    let c = Ke.none;
    return r = r.filter((a) => (s.type ? s.type.allowsMarkType(a.type) : bo(a.type, e)) ? (c = a.addToSet(c), !1) : !0), this.nodes.push(new br(e, t, c, i, null, l)), this.open++, r;
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
      this.localPreserveWS && (this.nodes[t].options |= ir);
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
function La(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && Ps.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function Oa(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function xo(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function bo(n, e) {
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
const Ls = 65535, Os = Math.pow(2, 16);
function Ba(n, e) {
  return n + e * Os;
}
function vo(n) {
  return n & Ls;
}
function Fa(n) {
  return (n - (n & Ls)) / Os;
}
const Bs = 1, Fs = 2, Nr = 4, Hs = 8;
class xi {
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
    return (this.delInfo & Hs) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (Bs | Nr)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (Fs | Nr)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & Nr) > 0;
  }
}
class zt {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, t = !1) {
    if (this.ranges = e, this.inverted = t, !e.length && zt.empty)
      return zt.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let t = 0, r = vo(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + t + Fa(e);
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
        let m = e == (t < 0 ? c : d) ? null : Ba(l / 3, e - c), g = e == c ? Fs : e == d ? Bs : Nr;
        return (t < 0 ? e != c : e != d) && (g |= Hs), new xi(p, g, m);
      }
      i += u - a;
    }
    return r ? e + i : new xi(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, i = vo(t), o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
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
    return new zt(this.ranges, !this.inverted);
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
    return e == 0 ? zt.empty : new zt(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
zt.empty = new zt([]);
class Lr {
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
    return new Lr(this._maps, this.mirror, e, t);
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
    let e = new Lr();
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
    return r ? e : new xi(e, i, null);
  }
}
const ri = /* @__PURE__ */ Object.create(null);
class St {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return zt.empty;
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
    let r = ri[t.stepType];
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
    if (e in ri)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return ri[e] = t, t.prototype.jsonID = e, t;
  }
}
class at {
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
    return new at(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new at(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, t, r, i) {
    try {
      return at.ok(e.replace(t, r, i));
    } catch (o) {
      if (o instanceof nr)
        return at.fail(o.message);
      throw o;
    }
  }
}
function Bi(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let o = n.child(i);
    o.content.size && (o = o.copy(Bi(o.content, e, o))), o.isInline && (o = e(o, t, i)), r.push(o);
  }
  return J.fromArray(r);
}
class un extends St {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new le(Bi(t.content, (s, l) => !s.isAtom || !l.type.allowsMarkType(this.mark.type) ? s : s.mark(this.mark.addToSet(s.marks)), i), t.openStart, t.openEnd);
    return at.fromReplace(e, this.from, this.to, o);
  }
  invert() {
    return new qt(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new un(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof un && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new un(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new un(t.from, t.to, e.markFromJSON(t.mark));
  }
}
St.jsonID("addMark", un);
class qt extends St {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new le(Bi(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
    return at.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new un(this.from, this.to, this.mark);
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
St.jsonID("removeMark", qt);
class dn extends St {
  /**
  Create a node mark step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return at.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return at.fromReplace(e, this.pos, this.pos + 1, new le(J.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    if (t) {
      let r = this.mark.addToSet(t.marks);
      if (r.length == t.marks.length) {
        for (let i = 0; i < t.marks.length; i++)
          if (!t.marks[i].isInSet(r))
            return new dn(this.pos, t.marks[i]);
        return new dn(this.pos, this.mark);
      }
    }
    return new Tn(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new dn(t.pos, this.mark);
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
    return new dn(t.pos, e.markFromJSON(t.mark));
  }
}
St.jsonID("addNodeMark", dn);
class Tn extends St {
  /**
  Create a mark-removing step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return at.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return at.fromReplace(e, this.pos, this.pos + 1, new le(J.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new dn(this.pos, this.mark);
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
St.jsonID("removeNodeMark", Tn);
class ct extends St {
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
    return this.structure && bi(e, this.from, this.to) ? at.fail("Structure replace would overwrite content") : at.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new zt([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new ct(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let t = e.mapResult(this.to, -1), r = this.from == this.to && ct.MAP_BIAS < 0 ? t : e.mapResult(this.from, 1);
    return r.deletedAcross && t.deletedAcross ? null : new ct(r.pos, Math.max(r.pos, t.pos), this.slice, this.structure);
  }
  merge(e) {
    if (!(e instanceof ct) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let t = this.slice.size + e.slice.size == 0 ? le.empty : new le(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new ct(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? le.empty : new le(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new ct(e.from, this.to, t, this.structure);
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
    return new ct(t.from, t.to, le.fromJSON(e, t.slice), !!t.structure);
  }
}
ct.MAP_BIAS = 1;
St.jsonID("replace", ct);
class pt extends St {
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
    if (this.structure && (bi(e, this.from, this.gapFrom) || bi(e, this.gapTo, this.to)))
      return at.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return at.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? at.fromReplace(e, this.from, this.to, r) : at.fail("Content does not fit in gap");
  }
  getMap() {
    return new zt([
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
    return new pt(this.from, this.from + this.slice.size + t, this.from + this.insert, this.from + this.insert + t, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), i = this.from == this.gapFrom ? t.pos : e.map(this.gapFrom, -1), o = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return t.deletedAcross && r.deletedAcross || i < t.pos || o > r.pos ? null : new pt(t.pos, r.pos, i, o, this.slice, this.insert, this.structure);
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
    return new pt(t.from, t.to, t.gapFrom, t.gapTo, le.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
St.jsonID("replaceAround", pt);
function bi(n, e, t) {
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
function Ha(n, e, t, r) {
  let i = [], o = [], s, l;
  n.doc.nodesBetween(e, t, (c, a, u) => {
    if (!c.isInline)
      return;
    let d = c.marks;
    if (!r.isInSet(d) && u.type.allowsMarkType(r.type)) {
      let f = Math.max(a, e), p = Math.min(a + c.nodeSize, t), m = r.addToSet(d);
      for (let g = 0; g < d.length; g++)
        d[g].isInSet(m) || (s && s.to == f && s.mark.eq(d[g]) ? s.to = p : i.push(s = new qt(f, p, d[g])));
      l && l.to == f ? l.to = p : o.push(l = new un(f, p, r));
    }
  }), i.forEach((c) => n.step(c)), o.forEach((c) => n.step(c));
}
function _a(n, e, t, r) {
  let i = [], o = 0;
  n.doc.nodesBetween(e, t, (s, l) => {
    if (!s.isInline)
      return;
    o++;
    let c = null;
    if (r instanceof Vr) {
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
function Fi(n, e, t, r = t.contentMatch, i = !0) {
  let o = n.doc.nodeAt(e), s = [], l = e + 1;
  for (let c = 0; c < o.childCount; c++) {
    let a = o.child(c), u = l + a.nodeSize, d = r.matchType(a.type);
    if (!d)
      s.push(new ct(l, u, le.empty));
    else {
      r = d;
      for (let f = 0; f < a.marks.length; f++)
        t.allowsMarkType(a.marks[f].type) || n.step(new qt(l, u, a.marks[f]));
      if (i && a.isText && t.whitespace != "pre") {
        let f, p = /\r?\n|\r/g, m;
        for (; f = p.exec(a.text); )
          m || (m = new le(J.from(t.schema.text(" ", t.allowedMarks(a.marks))), 0, 0)), s.push(new ct(l + f.index, l + f.index + f[0].length, m));
      }
    }
    l = u;
  }
  if (!r.validEnd) {
    let c = r.fillBefore(J.empty, !0);
    n.replace(l, l, new le(c, 0, 0));
  }
  for (let c = s.length - 1; c >= 0; c--)
    n.step(s[c]);
}
function ja(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function jn(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth, i = 0, o = 0; ; --r) {
    let s = n.$from.node(r), l = n.$from.index(r) + i, c = n.$to.indexAfter(r) - o;
    if (r < n.depth && s.canReplace(l, c, t))
      return r;
    if (r == 0 || s.type.spec.isolating || !ja(s, l, c))
      break;
    l && (i = 1), c < s.childCount && (o = 1);
  }
  return null;
}
function Wa(n, e, t) {
  let { $from: r, $to: i, depth: o } = e, s = r.before(o + 1), l = i.after(o + 1), c = s, a = l, u = J.empty, d = 0;
  for (let m = o, g = !1; m > t; m--)
    g || r.index(m) > 0 ? (g = !0, u = J.from(r.node(m).copy(u)), d++) : c--;
  let f = J.empty, p = 0;
  for (let m = o, g = !1; m > t; m--)
    g || i.after(m + 1) < i.end(m) ? (g = !0, f = J.from(i.node(m).copy(f)), p++) : a++;
  n.step(new pt(c, a, s, l, new le(u.append(f), d, p), u.size - d, !0));
}
function _s(n, e, t = null, r = n) {
  let i = qa(n, e), o = i && Ka(r, e);
  return o ? i.map(wo).concat({ type: e, attrs: t }).concat(o.map(wo)) : null;
}
function wo(n) {
  return { type: n, attrs: null };
}
function qa(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.contentMatchAt(r).findWrapping(e);
  if (!o)
    return null;
  let s = o.length ? o[0] : e;
  return t.canReplaceWith(r, i, s) ? o : null;
}
function Ka(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.child(r), s = e.contentMatch.findWrapping(o.type);
  if (!s)
    return null;
  let c = (s.length ? s[s.length - 1] : e).contentMatch;
  for (let a = r; c && a < i; a++)
    c = c.matchType(t.child(a).type);
  return !c || !c.validEnd ? null : s;
}
function Ja(n, e, t) {
  let r = J.empty;
  for (let s = t.length - 1; s >= 0; s--) {
    if (r.size) {
      let l = t[s].type.contentMatch.matchFragment(r);
      if (!l || !l.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = J.from(t[s].type.create(t[s].attrs, r));
  }
  let i = e.start, o = e.end;
  n.step(new pt(i, o, i, o, new le(r, 0, 0), t.length, !0));
}
function Va(n, e, t, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let o = n.steps.length;
  n.doc.nodesBetween(e, t, (s, l) => {
    let c = typeof i == "function" ? i(s) : i;
    if (s.isTextblock && !s.hasMarkup(r, c) && Ya(n.doc, n.mapping.slice(o).map(l), r)) {
      let a = null;
      if (r.schema.linebreakReplacement) {
        let p = r.whitespace == "pre", m = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        p && !m ? a = !1 : !p && m && (a = !0);
      }
      a === !1 && Ws(n, s, l, o), Fi(n, n.mapping.slice(o).map(l, 1), r, void 0, a === null);
      let u = n.mapping.slice(o), d = u.map(l, 1), f = u.map(l + s.nodeSize, 1);
      return n.step(new pt(d, f, d + 1, f - 1, new le(J.from(r.create(c, null, s.marks)), 0, 0), 1, !0)), a === !0 && js(n, s, l, o), !1;
    }
  });
}
function js(n, e, t, r) {
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
function Ws(n, e, t, r) {
  e.forEach((i, o) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let s = n.mapping.slice(r).map(t + 1 + o);
      n.replaceWith(s, s + 1, e.type.schema.text(`
`));
    }
  });
}
function Ya(n, e, t) {
  let r = n.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, t);
}
function Ua(n, e, t, r, i) {
  let o = n.doc.nodeAt(e);
  if (!o)
    throw new RangeError("No node at given position");
  t || (t = o.type);
  let s = t.create(r, null, i || o.marks);
  if (o.isLeaf)
    return n.replaceWith(e, e + o.nodeSize, s);
  if (!t.validContent(o.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(new pt(e, e + o.nodeSize, e + 1, e + o.nodeSize - 1, new le(J.from(s), 0, 0), 1, !0));
}
function nn(n, e, t = 1, r) {
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
function Ga(n, e, t = 1, r) {
  let i = n.doc.resolve(e), o = J.empty, s = J.empty;
  for (let l = i.depth, c = i.depth - t, a = t - 1; l > c; l--, a--) {
    o = J.from(i.node(l).copy(o));
    let u = r && r[a];
    s = J.from(u ? u.type.create(u.attrs, s) : i.node(l).copy(s));
  }
  n.step(new ct(e, e, new le(o.append(s), t, t), !0));
}
function Cn(n, e) {
  let t = n.resolve(e), r = t.index();
  return qs(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function Xa(n, e) {
  e.content.size || n.type.compatibleContent(e.type);
  let t = n.contentMatchAt(n.childCount), { linebreakReplacement: r } = n.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let o = e.child(i), s = o.type == r ? n.type.schema.nodes.text : o.type;
    if (t = t.matchType(s), !t || !n.type.allowsMarks(o.marks))
      return !1;
  }
  return t.validEnd;
}
function qs(n, e) {
  return !!(n && e && !n.isLeaf && Xa(n, e));
}
function Yr(n, e, t = -1) {
  let r = n.resolve(e);
  for (let i = r.depth; ; i--) {
    let o, s, l = r.index(i);
    if (i == r.depth ? (o = r.nodeBefore, s = r.nodeAfter) : t > 0 ? (o = r.node(i + 1), l++, s = r.node(i).maybeChild(l)) : (o = r.node(i).maybeChild(l - 1), s = r.node(i + 1)), o && !o.isTextblock && qs(o, s) && r.node(i).canReplace(l, l + 1))
      return e;
    if (i == 0)
      break;
    e = t < 0 ? r.before(i) : r.after(i);
  }
}
function Qa(n, e, t) {
  let r = null, { linebreakReplacement: i } = n.doc.type.schema, o = n.doc.resolve(e - t), s = o.node().type;
  if (i && s.inlineContent) {
    let u = s.whitespace == "pre", d = !!s.contentMatch.matchType(i);
    u && !d ? r = !1 : !u && d && (r = !0);
  }
  let l = n.steps.length;
  if (r === !1) {
    let u = n.doc.resolve(e + t);
    Ws(n, u.node(), u.before(), l);
  }
  s.inlineContent && Fi(n, e + t - 1, s, o.node().contentMatchAt(o.index()), r == null);
  let c = n.mapping.slice(l), a = c.map(e - t);
  if (n.step(new ct(a, c.map(e + t, -1), le.empty, !0)), r === !0) {
    let u = n.doc.resolve(a);
    js(n, u.node(), u.before(), n.steps.length);
  }
  return n;
}
function Za(n, e, t) {
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
function Ur(n, e, t = e, r = le.empty) {
  if (e == t && !r.size)
    return null;
  let i = n.resolve(e), o = n.resolve(t);
  return Ks(i, o, r) ? new ct(e, t, r) : new eu(i, o, r).fit();
}
function Ks(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class eu {
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.unplaced = r, this.frontier = [], this.placed = J.empty;
    for (let i = 0; i <= e.depth; i++) {
      let o = e.node(i);
      this.frontier.push({
        type: o.type,
        match: o.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = J.from(e.node(i).copy(this.placed));
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
    let c = new le(o, s, l);
    return e > -1 ? new pt(r.pos, e, this.$to.pos, this.$to.end(), c, t) : c.size || r.pos != this.$to.pos ? new ct(r.pos, i.pos, c) : null;
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
        r ? (o = ii(this.unplaced.content, r - 1).firstChild, i = o.content) : i = this.unplaced.content;
        let s = i.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: c, match: a } = this.frontier[l], u, d = null;
          if (t == 1 && (s ? a.matchType(s.type) || (d = a.fillBefore(J.from(s), !1)) : o && c.compatibleContent(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, inject: d };
          if (t == 2 && s && (u = a.findWrapping(s.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, wrap: u };
          if (o && a.matchType(o.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = ii(e, t);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new le(e, t + 1, Math.max(r, i.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = ii(e, t);
    if (i.childCount <= 1 && t > 0) {
      let o = e.size - t <= t + i.size;
      this.unplaced = new le(Gn(e, t - 1, 1), t - 1, o ? t - 1 : r);
    } else
      this.unplaced = new le(Gn(e, t, 1), t, r);
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
      a++, (a > 1 || c == 0 || g.content.size) && (d = b, u.push(Js(g.mark(f.allowedMarks(g.marks)), a == 1 ? c : 0, a == l.childCount ? p : -1)));
    }
    let m = a == l.childCount;
    m || (p = -1), this.placed = Xn(this.placed, t, J.from(u)), this.frontier[t].match = d, m && p < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let g = 0, b = l; g < p; g++) {
      let x = b.lastChild;
      this.frontier.push({ type: x.type, match: x.contentMatchAt(x.childCount) }), b = x.content;
    }
    this.unplaced = m ? e == 0 ? le.empty : new le(Gn(s.content, e - 1, 1), e - 1, p < 0 ? s.openEnd : e - 1) : new le(Gn(s.content, e, a), s.openStart, s.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !oi(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
      let { match: r, type: i } = this.frontier[t], o = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), s = oi(e, t, i, r, o);
      if (s) {
        for (let l = t - 1; l >= 0; l--) {
          let { match: c, type: a } = this.frontier[l], u = oi(e, l, a, c, !0);
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
    t.fit.childCount && (this.placed = Xn(this.placed, t.depth, t.fit)), e = t.move;
    for (let r = t.depth + 1; r <= e.depth; r++) {
      let i = e.node(r), o = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, o);
    }
    return e;
  }
  openFrontierNode(e, t = null, r) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = Xn(this.placed, this.depth, J.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(J.empty, !0);
    t.childCount && (this.placed = Xn(this.placed, this.frontier.length, t));
  }
}
function Gn(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(Gn(n.firstChild.content, e - 1, t)));
}
function Xn(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(Xn(n.lastChild.content, e - 1, t)));
}
function ii(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function Js(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, Js(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(J.empty, !0)))), n.copy(r);
}
function oi(n, e, t, r, i) {
  let o = n.node(e), s = i ? n.indexAfter(e) : n.index(e);
  if (s == o.childCount && !t.compatibleContent(o.type))
    return null;
  let l = r.fillBefore(o.content, !0, s);
  return l && !tu(t, o.content, s) ? l : null;
}
function tu(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function nu(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function ru(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let i = n.doc.resolve(e), o = n.doc.resolve(t);
  if (Ks(i, o, r))
    return n.step(new ct(e, t, r));
  let s = Ys(i, o);
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
    let p = a[f], m = nu(p.type);
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
        let I = i.node(b - 1), M = i.index(b - 1);
        if (I.canReplaceWith(M, M, m.type, m.marks))
          return n.replace(i.before(b), x ? o.after(b) : t, new le(Vs(r.content, 0, r.openStart, p), p, r.openEnd));
      }
  }
  let d = n.steps.length;
  for (let f = s.length - 1; f >= 0 && (n.replace(e, t, r), !(n.steps.length > d)); f--) {
    let p = s[f];
    p < 0 || (e = i.before(p), t = o.after(p));
  }
}
function Vs(n, e, t, r, i) {
  if (e < t) {
    let o = n.firstChild;
    n = n.replaceChild(0, o.copy(Vs(o.content, e + 1, t, r, o)));
  }
  if (e > r) {
    let o = i.contentMatchAt(0), s = o.fillBefore(n).append(n);
    n = s.append(o.matchFragment(s).fillBefore(J.empty, !0));
  }
  return n;
}
function iu(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = Za(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new le(J.from(r), 0, 0));
}
function ou(n, e, t) {
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
  let o = Ys(r, i);
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
function Ys(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let o = n.start(i);
    if (o < n.pos - (n.depth - i) || e.end(i) > e.pos + (e.depth - i) || n.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (o == e.start(i) || i == n.depth && i == e.depth && n.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == o - 1) && t.push(i);
  }
  return t;
}
class Ln extends St {
  /**
  Construct an attribute step.
  */
  constructor(e, t, r) {
    super(), this.pos = e, this.attr = t, this.value = r;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return at.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let o in t.attrs)
      r[o] = t.attrs[o];
    r[this.attr] = this.value;
    let i = t.type.create(r, null, t.marks);
    return at.fromReplace(e, this.pos, this.pos + 1, new le(J.from(i), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return zt.empty;
  }
  invert(e) {
    return new Ln(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Ln(t.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number" || typeof t.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new Ln(t.pos, t.attr, t.value);
  }
}
St.jsonID("attr", Ln);
class or extends St {
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
    return at.ok(r);
  }
  getMap() {
    return zt.empty;
  }
  invert(e) {
    return new or(this.attr, e.attrs[this.attr]);
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
    return new or(t.attr, t.value);
  }
}
St.jsonID("docAttr", or);
let Bn = class extends Error {
};
Bn = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
Bn.prototype = Object.create(Error.prototype);
Bn.prototype.constructor = Bn;
Bn.prototype.name = "TransformError";
class su {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new Lr();
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
      throw new Bn(t.failed);
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
  replace(e, t = e, r = le.empty) {
    let i = Ur(this.doc, e, t, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, r) {
    return this.replace(e, t, new le(J.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, t) {
    return this.replace(e, t, le.empty);
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
    return ru(this, e, t, r), this;
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
    return iu(this, e, t, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return ou(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return Wa(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return Qa(this, e, t), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, t) {
    return Ja(this, e, t), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, t = e, r, i = null) {
    return Va(this, e, t, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, r = null, i) {
    return Ua(this, e, t, r, i), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  The `pos` addresses the document content. Use `setDocAttribute`
  to set attributes on the document itself.
  */
  setNodeAttribute(e, t, r) {
    return this.step(new Ln(e, t, r)), this;
  }
  /**
  Set a single attribute on the document to a new value.
  */
  setDocAttribute(e, t) {
    return this.step(new or(e, t)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(e, t) {
    return this.step(new dn(e, t)), this;
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
    return Ga(this, e, t, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, r) {
    return Ha(this, e, t, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, r) {
    return _a(this, e, t, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, t, r) {
    return Fi(this, e, t, r), this;
  }
}
const si = /* @__PURE__ */ Object.create(null);
class Ze {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, r) {
    this.$anchor = e, this.$head = t, this.ranges = r || [new lu(e.min(t), e.max(t))];
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
  replace(e, t = le.empty) {
    let r = t.content.lastChild, i = null;
    for (let l = 0; l < t.openEnd; l++)
      i = r, r = r.lastChild;
    let o = e.steps.length, s = this.ranges;
    for (let l = 0; l < s.length; l++) {
      let { $from: c, $to: a } = s[l], u = e.mapping.slice(o);
      e.replaceRange(u.map(c.pos), u.map(a.pos), l ? le.empty : t), l == 0 && No(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
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
      o ? e.deleteRange(a, u) : (e.replaceRangeWith(a, u, t), No(e, r, t.isInline ? -1 : 1));
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
    let i = e.parent.inlineContent ? new Rt(e) : In(e.node(0), e.parent, e.pos, e.index(), t, r);
    if (i)
      return i;
    for (let o = e.depth - 1; o >= 0; o--) {
      let s = t < 0 ? In(e.node(0), e.node(o), e.before(o + 1), e.index(o), t, r) : In(e.node(0), e.node(o), e.after(o + 1), e.index(o) + 1, t, r);
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
    return In(e, e, 0, 0, 1) || new Kt(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return In(e, e, e.content.size, e.childCount, -1) || new Kt(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = si[t.type];
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
    if (e in si)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return si[e] = t, t.prototype.jsonID = e, t;
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
    return Rt.between(this.$anchor, this.$head).getBookmark();
  }
}
Ze.prototype.visible = !0;
class lu {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let ko = !1;
function So(n) {
  !ko && !n.parent.inlineContent && (ko = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class Rt extends Ze {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    So(e), So(t), super(e, t);
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
      return Ze.near(r);
    let i = e.resolve(t.map(this.anchor));
    return new Rt(i.parent.inlineContent ? i : r, r);
  }
  replace(e, t = le.empty) {
    if (super.replace(e, t), t == le.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof Rt && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new Gr(this.anchor, this.head);
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
    return new Rt(e.resolve(t.anchor), e.resolve(t.head));
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
      let o = Ze.findFrom(t, r, !0) || Ze.findFrom(t, -r, !0);
      if (o)
        t = o.$head;
      else
        return Ze.near(t, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = t : (e = (Ze.findFrom(e, -r, !0) || Ze.findFrom(e, r, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new Rt(e, t);
  }
}
Ze.jsonID("text", Rt);
class Gr {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new Gr(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return Rt.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class Je extends Ze {
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
    return r ? Ze.near(o) : new Je(o);
  }
  content() {
    return new le(J.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof Je && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new Hi(this.anchor);
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
Ze.jsonID("node", Je);
class Hi {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new Gr(r, r) : new Hi(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && Je.isSelectable(r) ? new Je(t) : Ze.near(t);
  }
}
class Kt extends Ze {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = le.empty) {
    if (t == le.empty) {
      e.delete(0, e.doc.content.size);
      let r = Ze.atStart(e.doc);
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
    return cu;
  }
}
Ze.jsonID("all", Kt);
const cu = {
  map() {
    return this;
  },
  resolve(n) {
    return new Kt(n);
  }
};
function In(n, e, t, r, i, o = !1) {
  if (e.inlineContent)
    return Rt.create(n, t);
  for (let s = r - (i > 0 ? 0 : 1); i > 0 ? s < e.childCount : s >= 0; s += i) {
    let l = e.child(s);
    if (l.isAtom) {
      if (!o && Je.isSelectable(l))
        return Je.create(n, t - (i < 0 ? l.nodeSize : 0));
    } else {
      let c = In(n, l, t + i, i < 0 ? l.childCount : 0, i, o);
      if (c)
        return c;
    }
    t += l.nodeSize * i;
  }
  return null;
}
function No(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e)
    return;
  let i = n.steps[r];
  if (!(i instanceof ct || i instanceof pt))
    return;
  let o = n.mapping.maps[r], s;
  o.forEach((l, c, a, u) => {
    s == null && (s = u);
  }), n.setSelection(Ze.near(n.doc.resolve(s), t));
}
function To(n, e) {
  return !e || !n ? n : n.bind(e);
}
class vr {
  constructor(e, t, r) {
    this.name = e, this.init = To(t.init, r), this.apply = To(t.apply, r);
  }
}
new vr("doc", {
  init(n) {
    return n.doc || n.schema.topNodeType.createAndFill();
  },
  apply(n) {
    return n.doc;
  }
}), new vr("selection", {
  init(n, e) {
    return n.selection || Ze.atStart(e.doc);
  },
  apply(n) {
    return n.selection;
  }
}), new vr("storedMarks", {
  init(n) {
    return n.storedMarks || null;
  },
  apply(n, e, t, r) {
    return r.selection.$cursor ? n.storedMarks : null;
  }
}), new vr("scrollToSelection", {
  init() {
    return 0;
  },
  apply(n, e) {
    return n.scrolledIntoView ? e + 1 : e;
  }
});
const Us = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function Gs(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const Xs = (n, e, t) => {
  let r = Gs(n, t);
  if (!r)
    return !1;
  let i = _i(r);
  if (!i) {
    let s = r.blockRange(), l = s && jn(s);
    return l == null ? !1 : (e && e(n.tr.lift(s, l).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (sl(n, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (Fn(o, "end") || Je.isSelectable(o)))
    for (let s = r.depth; ; s--) {
      let l = Ur(n.doc, r.before(s), r.after(s), le.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let c = n.tr.step(l);
          c.setSelection(Fn(o, "end") ? Ze.findFrom(c.doc.resolve(c.mapping.map(i.pos, -1)), -1) : Je.create(c.doc, i.pos - o.nodeSize)), e(c.scrollIntoView());
        }
        return !0;
      }
      if (s == 1 || r.node(s - 1).childCount > 1)
        break;
    }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos - o.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, au = (n, e, t) => {
  let r = Gs(n, t);
  if (!r)
    return !1;
  let i = _i(r);
  return i ? Qs(n, i, e) : !1;
}, uu = (n, e, t) => {
  let r = el(n, t);
  if (!r)
    return !1;
  let i = ji(r);
  return i ? Qs(n, i, e) : !1;
};
function Qs(n, e, t) {
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
  let a = Ur(n.doc, o, c, le.empty);
  if (!a || a.from != o || a instanceof ct && a.slice.size >= c - o)
    return !1;
  if (t) {
    let u = n.tr.step(a);
    u.setSelection(Rt.create(u.doc, o)), t(u.scrollIntoView());
  }
  return !0;
}
function Fn(n, e, t = !1) {
  for (let r = n; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (t && r.childCount != 1)
      return !1;
  }
  return !1;
}
const Zs = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    o = _i(r);
  }
  let s = o && o.nodeBefore;
  return !s || !Je.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(Je.create(n.doc, o.pos - s.nodeSize)).scrollIntoView()), !0);
};
function _i(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function el(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const tl = (n, e, t) => {
  let r = el(n, t);
  if (!r)
    return !1;
  let i = ji(r);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (sl(n, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (Fn(o, "start") || Je.isSelectable(o))) {
    let s = Ur(n.doc, r.before(), r.after(), le.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let l = n.tr.step(s);
        l.setSelection(Fn(o, "start") ? Ze.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : Je.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos, i.pos + o.nodeSize).scrollIntoView()), !0) : !1;
}, nl = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    o = ji(r);
  }
  let s = o && o.nodeAfter;
  return !s || !Je.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(Je.create(n.doc, o.pos)).scrollIntoView()), !0);
};
function ji(n) {
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
const du = (n, e) => {
  let t = n.selection, r = t instanceof Je, i;
  if (r) {
    if (t.node.isTextblock || !Cn(n.doc, t.from))
      return !1;
    i = t.from;
  } else if (i = Yr(n.doc, t.from, -1), i == null)
    return !1;
  if (e) {
    let o = n.tr.join(i);
    r && o.setSelection(Je.create(o.doc, i - n.doc.resolve(i).nodeBefore.nodeSize)), e(o.scrollIntoView());
  }
  return !0;
}, fu = (n, e) => {
  let t = n.selection, r;
  if (t instanceof Je) {
    if (t.node.isTextblock || !Cn(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = Yr(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, hu = (n, e) => {
  let { $from: t, $to: r } = n.selection, i = t.blockRange(r), o = i && jn(i);
  return o == null ? !1 : (e && e(n.tr.lift(i, o).scrollIntoView()), !0);
}, rl = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function Wi(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const pu = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(r))
    return !1;
  let i = t.node(-1), o = t.indexAfter(-1), s = Wi(i.contentMatchAt(o));
  if (!s || !i.canReplaceWith(o, o, s))
    return !1;
  if (e) {
    let l = t.after(), c = n.tr.replaceWith(l, l, s.createAndFill());
    c.setSelection(Ze.near(c.doc.resolve(l), 1)), e(c.scrollIntoView());
  }
  return !0;
}, il = (n, e) => {
  let t = n.selection, { $from: r, $to: i } = t;
  if (t instanceof Kt || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = Wi(i.parent.contentMatchAt(i.indexAfter()));
  if (!o || !o.isTextblock)
    return !1;
  if (e) {
    let s = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = n.tr.insert(s, o.createAndFill());
    l.setSelection(Rt.create(l.doc, s + 1)), e(l.scrollIntoView());
  }
  return !0;
}, ol = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let o = t.before();
    if (nn(n.doc, o))
      return e && e(n.tr.split(o).scrollIntoView()), !0;
  }
  let r = t.blockRange(), i = r && jn(r);
  return i == null ? !1 : (e && e(n.tr.lift(r, i).scrollIntoView()), !0);
};
function mu(n) {
  return (e, t) => {
    if (e.selection instanceof Je && e.selection.node.isBlock) {
      let { $from: p } = e.selection;
      return !p.parentOffset || !nn(e.doc, p.pos) ? !1 : (t && t(e.tr.split(p.pos).scrollIntoView()), !0);
    }
    if (!e.selection.$from.depth)
      return !1;
    let r = e.tr;
    !e.selection.empty && (e.selection instanceof Rt || e.selection instanceof Kt) && r.deleteSelection();
    let { $from: i } = r.selection, o = r.steps.length, s = [], l, c, a = !1, u = !1;
    for (let p = i.depth; ; p--)
      if (i.node(p).isBlock) {
        a = i.end(p) == i.pos + (i.depth - p), u = i.start(p) == i.pos - (i.depth - p), c = Wi(i.node(p - 1).contentMatchAt(i.indexAfter(p - 1))), s.unshift(a && c ? { type: c } : null), l = p;
        break;
      } else {
        if (p == 1)
          return !1;
        s.unshift(null);
      }
    let d = i.pos, f = nn(r.doc, d, s.length, s);
    if (f || (s[0] = c ? { type: c } : null, f = nn(r.doc, d, s.length, s)), !f)
      return !1;
    if (r.split(d, s.length, s), !a && u && i.node(l).type != c) {
      let p = r.mapping.slice(o), m = p.map(i.before(l)), g = r.doc.resolve(m);
      c && i.node(l - 1).canReplaceWith(g.index(), g.index() + 1, c) && r.setNodeMarkup(p.map(i.before(l)), c);
    }
    return t && t(r.scrollIntoView()), !0;
  };
}
const gu = mu(), yu = (n, e) => {
  let { $from: t, to: r } = n.selection, i, o = t.sharedDepth(r);
  return o == 0 ? !1 : (i = t.before(o), e && e(n.tr.setSelection(Je.create(n.doc, i))), !0);
};
function xu(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(o - 1, o) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || Cn(n.doc, e.pos)) ? !1 : (t && t(n.tr.join(e.pos).scrollIntoView()), !0);
}
function sl(n, e, t, r) {
  let i = e.nodeBefore, o = e.nodeAfter, s, l, c = i.type.spec.isolating || o.type.spec.isolating;
  if (!c && xu(n, e, t))
    return !0;
  let a = !c && e.parent.canReplace(e.index(), e.index() + 1);
  if (a && (s = (l = i.contentMatchAt(i.childCount)).findWrapping(o.type)) && l.matchType(s[0] || o.type).validEnd) {
    if (t) {
      let p = e.pos + o.nodeSize, m = J.empty;
      for (let x = s.length - 1; x >= 0; x--)
        m = J.from(s[x].create(null, m));
      m = J.from(i.copy(m));
      let g = n.tr.step(new pt(e.pos - 1, p, e.pos, p, new le(m, 1, 0), s.length, !0)), b = g.doc.resolve(p + 2 * s.length);
      b.nodeAfter && b.nodeAfter.type == i.type && Cn(g.doc, b.pos) && g.join(b.pos), t(g.scrollIntoView());
    }
    return !0;
  }
  let u = o.type.spec.isolating || r > 0 && c ? null : Ze.findFrom(e, 1), d = u && u.$from.blockRange(u.$to), f = d && jn(d);
  if (f != null && f >= e.depth)
    return t && t(n.tr.lift(d, f).scrollIntoView()), !0;
  if (a && Fn(o, "start", !0) && Fn(i, "end")) {
    let p = i, m = [];
    for (; m.push(p), !p.isTextblock; )
      p = p.lastChild;
    let g = o, b = 1;
    for (; !g.isTextblock; g = g.firstChild)
      b++;
    if (p.canReplace(p.childCount, p.childCount, g.content)) {
      if (t) {
        let x = J.empty;
        for (let M = m.length - 1; M >= 0; M--)
          x = J.from(m[M].copy(x));
        let I = n.tr.step(new pt(e.pos - m.length, e.pos + o.nodeSize, e.pos + b, e.pos + o.nodeSize - b, new le(x, m.length, 0), 0, !0));
        t(I.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function ll(n) {
  return function(e, t) {
    let r = e.selection, i = n < 0 ? r.$from : r.$to, o = i.depth;
    for (; i.node(o).isInline; ) {
      if (!o)
        return !1;
      o--;
    }
    return i.node(o).isTextblock ? (t && t(e.tr.setSelection(Rt.create(e.doc, n < 0 ? i.start(o) : i.end(o)))), !0) : !1;
  };
}
const bu = ll(-1), vu = ll(1);
function wu(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o), l = s && _s(s, n, e);
    return l ? (r && r(t.tr.wrap(s, l).scrollIntoView()), !0) : !1;
  };
}
function Co(n, e = null) {
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
function qi(...n) {
  return function(e, t, r) {
    for (let i = 0; i < n.length; i++)
      if (n[i](e, t, r))
        return !0;
    return !1;
  };
}
qi(Us, Xs, Zs);
qi(Us, tl, nl);
qi(rl, il, ol, gu);
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function ku(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o);
    if (!s)
      return !1;
    let l = r ? t.tr : null;
    return Su(l, s, n, e) ? (r && r(l.scrollIntoView()), !0) : !1;
  };
}
function Su(n, e, t, r = null) {
  let i = !1, o = e, s = e.$from.doc;
  if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(t) && e.startIndex == 0) {
    if (e.$from.index(e.depth - 1) == 0)
      return !1;
    let c = s.resolve(e.start - 2);
    o = new zr(c, c, e.depth), e.endIndex < e.parent.childCount && (e = new zr(e.$from, s.resolve(e.$to.end(e.depth)), e.depth)), i = !0;
  }
  let l = _s(o, t, r, e);
  return l ? (n && Nu(n, e, l, i, t), !0) : !1;
}
function Nu(n, e, t, r, i) {
  let o = J.empty;
  for (let u = t.length - 1; u >= 0; u--)
    o = J.from(t[u].type.create(t[u].attrs, o));
  n.step(new pt(e.start - (r ? 2 : 0), e.end, e.start, e.end, new le(o, 0, 0), t.length, !0));
  let s = 0;
  for (let u = 0; u < t.length; u++)
    t[u].type == i && (s = u + 1);
  let l = t.length - s, c = e.start + t.length - (r ? 2 : 0), a = e.parent;
  for (let u = e.startIndex, d = e.endIndex, f = !0; u < d; u++, f = !1)
    !f && nn(n.doc, c, l) && (n.split(c, l), c += 2 * l), c += a.child(u).nodeSize;
  return n;
}
function Tu(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (s) => s.childCount > 0 && s.firstChild.type == n);
    return o ? t ? r.node(o.depth - 1).type == n ? Cu(e, t, n, o) : Eu(e, t, o) : !0 : !1;
  };
}
function Cu(n, e, t, r) {
  let i = n.tr, o = r.end, s = r.$to.end(r.depth);
  o < s && (i.step(new pt(o - 1, s, o, s, new le(J.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new zr(i.doc.resolve(r.$from.pos), i.doc.resolve(s), r.depth));
  const l = jn(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let c = i.doc.resolve(i.mapping.map(o, -1) - 1);
  return Cn(i.doc, c.pos) && c.nodeBefore.type == c.nodeAfter.type && i.join(c.pos), e(i.scrollIntoView()), !0;
}
function Eu(n, e, t) {
  let r = n.tr, i = t.parent;
  for (let p = t.end, m = t.endIndex - 1, g = t.startIndex; m > g; m--)
    p -= i.child(m).nodeSize, r.delete(p - 1, p + 1);
  let o = r.doc.resolve(t.start), s = o.nodeAfter;
  if (r.mapping.map(t.end) != t.start + o.nodeAfter.nodeSize)
    return !1;
  let l = t.startIndex == 0, c = t.endIndex == i.childCount, a = o.node(-1), u = o.index(-1);
  if (!a.canReplace(u + (l ? 0 : 1), u + 1, s.content.append(c ? J.empty : J.from(i))))
    return !1;
  let d = o.pos, f = d + s.nodeSize;
  return r.step(new pt(d - (l ? 1 : 0), f + (c ? 1 : 0), d + 1, f - 1, new le((l ? J.empty : J.from(i.copy(J.empty))).append(c ? J.empty : J.from(i.copy(J.empty))), l ? 0 : 1, c ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function Mu(n) {
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
      let a = c.lastChild && c.lastChild.type == l.type, u = J.from(a ? n.create() : null), d = new le(J.from(n.create(null, J.from(l.type.create(null, u)))), a ? 3 : 1, 0), f = o.start, p = o.end;
      t(e.tr.step(new pt(f - (a ? 3 : 1), p, f, p, d, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function cl(n) {
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
var Ru = class al {
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
    const e = al.createFakeChain();
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
      state: cl({
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
const Au = () => ({ editor: n, view: e }) => (requestAnimationFrame(() => {
  if (!n.isDestroyed) {
    var t;
    e.dom.blur(), (t = window) === null || t === void 0 || (t = t.getSelection()) === null || t === void 0 || t.removeAllRanges();
  }
}), !0), Iu = (n = !0) => ({ commands: e }) => e.setContent("", { emitUpdate: n }), $u = () => ({ state: n, tr: e, dispatch: t }) => {
  const { selection: r } = e, { ranges: i } = r;
  return t && i.forEach(({ $from: o, $to: s }) => {
    n.doc.nodesBetween(o.pos, s.pos, (l, c) => {
      if (l.type.isText) return;
      const { doc: a, mapping: u } = e, d = a.resolve(u.map(c)), f = a.resolve(u.map(c + l.nodeSize)), p = d.blockRange(f);
      if (!p) return;
      const m = jn(p);
      if (l.type.isTextblock) {
        const { defaultType: g } = d.parent.contentMatchAt(d.index());
        e.setNodeMarkup(p.start, g);
      }
      (m || m === 0) && e.lift(p, m);
    });
  }), !0;
}, zu = (n) => (e) => n(e), Du = () => ({ state: n, dispatch: e }) => il(n, e), Pu = (n, e) => ({ editor: t, tr: r }) => {
  const { state: i } = t, o = i.doc.slice(n.from, n.to);
  r.deleteRange(n.from, n.to);
  const s = r.mapping.map(e);
  return r.insert(s, o.content), r.setSelection(new Bt(r.doc.resolve(Math.max(s - 1, 0)))), !0;
}, Lu = () => ({ tr: n, dispatch: e }) => {
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
function kt(n, e) {
  if (typeof n == "string") {
    if (!e.nodes[n]) throw Error(`There is no node type named '${n}'. Maybe you forgot to add the extension?`);
    return e.nodes[n];
  }
  return n;
}
const Ou = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const i = kt(n, t.schema), o = e.selection.$anchor;
  for (let s = o.depth; s > 0; s -= 1) if (o.node(s).type === i) {
    if (r) {
      const l = o.before(s), c = o.after(s);
      e.delete(l, c).scrollIntoView();
    }
    return !0;
  }
  return !1;
}, Bu = (n) => ({ tr: e, dispatch: t }) => {
  const { from: r, to: i } = n;
  return t && e.delete(r, i), !0;
}, Fu = (n) => n.content ? /^text(\*|\+)/.test(n.content) : !1, Eo = (n, e, t) => {
  if (!n.parent.isInline || t === "left" && n.pos > n.start() || t === "right" && n.pos < n.end()) return n.pos;
  const r = e.nodes[n.parent.type.name].spec;
  return Fu(r) ? t === "left" ? n.start() - 1 : n.end() + 1 : n.pos;
}, Hu = (n, e, t) => ({
  from: Eo(n, t, "left"),
  to: Eo(e, t, "right")
}), _u = () => ({ state: n, dispatch: e }) => {
  if (n.selection.empty) return !1;
  if (e) {
    const t = n.tr, { ranges: r } = n.selection, i = t.steps.length;
    r.forEach((o) => {
      const s = t.mapping.slice(i), l = t.doc.resolve(s.map(o.$from.pos)), c = t.doc.resolve(s.map(o.$to.pos)), { from: a, to: u } = Hu(l, c, n.schema);
      t.deleteRange(a, u);
    }), t.selection.empty || t.setSelection(Bt.near(t.doc.resolve(t.selection.from))), t.scrollIntoView(), e(t);
  }
  return !0;
}, ju = () => ({ commands: n }) => n.keyboardShortcut("Enter"), Wu = () => ({ state: n, dispatch: e }) => pu(n, e);
function qu(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
function Or(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => t.strict ? e[i] === n[i] : qu(e[i]) ? e[i].test(n[i]) : e[i] === n[i]) : !0;
}
function ul(n, e, t = {}) {
  return n.find((r) => r.type === e && Or(Object.fromEntries(Object.keys(t).map((i) => [i, r.attrs[i]])), t));
}
function Mo(n, e, t = {}) {
  return !!ul(n, e, t);
}
function dl(n, e, t) {
  if (!n || !e) return;
  let r = n.parent.childAfter(n.parentOffset);
  if ((!r.node || !r.node.marks.some((c) => c.type === e)) && (r = n.parent.childBefore(n.parentOffset)), !r.node || !r.node.marks.some((c) => c.type === e)) return;
  if (!t) {
    const c = r.node.marks.find((a) => a.type === e);
    c && (t = c.attrs);
  }
  if (!ul([...r.node.marks], e, t)) return;
  let i = r.index, o = n.start() + r.offset, s = i + 1, l = o + r.node.nodeSize;
  for (; i > 0 && Mo([...n.parent.child(i - 1).marks], e, t); )
    i -= 1, o -= n.parent.child(i).nodeSize;
  for (; s < n.parent.childCount && Mo([...n.parent.child(s).marks], e, t); )
    l += n.parent.child(s).nodeSize, s += 1;
  return {
    from: o,
    to: l
  };
}
function gn(n, e) {
  if (typeof n == "string") {
    if (!e.marks[n]) throw Error(`There is no mark type named '${n}'. Maybe you forgot to add the extension?`);
    return e.marks[n];
  }
  return n;
}
const Ku = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const o = gn(n, r.schema), { doc: s, selection: l } = t, { $from: c, from: a, to: u } = l;
  if (i) {
    const d = dl(c, o, e);
    if (d && d.from <= a && d.to >= u) {
      const f = Bt.create(s, d.from, d.to);
      t.setSelection(f);
    }
  }
  return !0;
}, Ju = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let r = 0; r < t.length; r += 1) if (t[r](e)) return !0;
  return !1;
};
function fl(n) {
  return n instanceof Bt;
}
function bn(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function Vu(n, e = null) {
  if (!e) return null;
  const t = zn.atStart(n), r = zn.atEnd(n);
  if (e === "start" || e === !0) return t;
  if (e === "end") return r;
  const i = t.from, o = r.to;
  return e === "all" ? Bt.create(n, bn(0, i, o), bn(n.content.size, i, o)) : Bt.create(n, bn(e, i, o), bn(e, i, o));
}
function Ro() {
  return ["Android"].includes(navigator.platform) || /android/i.test(navigator.userAgent);
}
function Br() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
function Yu() {
  return typeof navigator < "u" ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : !1;
}
const Uu = (n = null, e = {}) => ({ editor: t, view: r, tr: i, dispatch: o }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const s = () => {
    (Br() || Ro()) && r.dom.focus(), Yu() && !Br() && !Ro() && r.dom.focus({ preventScroll: !0 }), requestAnimationFrame(() => {
      t.isDestroyed || (r.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  try {
    if (r.hasFocus() && n === null || n === !1) return !0;
  } catch {
    return !1;
  }
  if (o && n === null && !fl(t.state.selection))
    return s(), !0;
  const l = Vu(i.doc, n) || t.state.selection, c = t.state.selection.eq(l);
  return o && (c || i.setSelection(l), c && i.storedMarks && i.setStoredMarks(i.storedMarks), s()), !0;
}, Gu = (n, e) => (t) => n.every((r, i) => e(r, {
  ...t,
  index: i
})), Xu = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt({
  from: t.selection.from,
  to: t.selection.to
}, n, e), hl = (n) => {
  const e = n.childNodes;
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const r = e[t];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? n.removeChild(r) : r.nodeType === 1 && hl(r);
  }
  return n;
};
function wr(n) {
  if (typeof window > "u") throw new Error("[tiptap error]: there is no window object available, so this function cannot be used");
  const e = `<body>${n}</body>`, t = new window.DOMParser().parseFromString(e, "text/html").body;
  return hl(t);
}
function pl(n) {
  return typeof (n == null ? void 0 : n.nodesBetween) == "function";
}
function Hn(n, e, t) {
  if (pl(n)) return n;
  const r = typeof n == "object" && n !== null;
  t = {
    slice: !0,
    parseOptions: {},
    ...t
  };
  const i = typeof n == "string";
  if (r) try {
    if (Array.isArray(n) && n.length > 0) return J.fromArray(n.map((s) => e.nodeFromJSON(s)));
    const o = e.nodeFromJSON(n);
    return t.errorOnInvalidContent && o.check(), o;
  } catch (o) {
    if (t.errorOnInvalidContent) throw new Error("[tiptap error]: Invalid JSON content", { cause: o });
    return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", o), Hn("", e, t);
  }
  if (i) {
    if (t.errorOnInvalidContent) {
      let s = !1, l = "";
      const c = new $a({
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
      if (t.slice ? Pn.fromSchema(c).parseSlice(wr(n), t.parseOptions) : Pn.fromSchema(c).parse(wr(n), t.parseOptions), t.errorOnInvalidContent && s) throw new Error("[tiptap error]: Invalid HTML content", { cause: /* @__PURE__ */ new Error(`Invalid element found: ${l}`) });
    }
    const o = Pn.fromSchema(e);
    return t.slice ? o.parseSlice(wr(n), t.parseOptions).content : o.parse(wr(n), t.parseOptions);
  }
  return Hn("", e, t);
}
function ml(n) {
  return !("type" in n);
}
function gl(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e) return;
  const i = n.steps[r];
  if (!(i instanceof ct || i instanceof pt)) return;
  const o = n.mapping.maps[r];
  let s = 0;
  o.forEach((l, c, a, u) => {
    s === 0 && (s = u);
  }), n.setSelection(zn.near(n.doc.resolve(s), t));
}
const Qu = (n, e, t) => ({ tr: r, dispatch: i, editor: o }) => {
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
      Hn(e, o.schema, {
        parseOptions: a,
        errorOnInvalidContent: !0
      });
    } catch (b) {
      c(b);
    }
    try {
      var s;
      l = Hn(e, o.schema, {
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
    const m = ml(l) ? l.content : [l];
    if (m.forEach((b) => {
      b.check(), f = f ? b.isText && b.marks.length === 0 : !1, p = p ? b.isBlock : !1;
    }), u === d && p) {
      const { parent: b } = r.doc.resolve(u);
      b.isTextblock && !b.type.spec.code && !b.childCount && (u -= 1, d += 1);
    }
    let g;
    if (f)
      Array.isArray(e) ? g = e.map((b) => b.text || "").join("") : pl(e) ? g = m.map((b) => {
        var x;
        return (x = b.text) !== null && x !== void 0 ? x : "";
      }).join("") : typeof e == "object" && e && e.text ? g = e.text : g = e, r.insertText(g, u, d);
    else {
      g = J.from(m);
      const b = r.doc.resolve(u), x = b.node(), I = b.parentOffset === 0, M = x.isText || x.isTextblock, N = x.content.size > 0;
      I && M && N && p && (u = Math.max(0, u - 1)), r.replaceWith(u, d, m);
    }
    t.updateSelection && gl(r, r.steps.length - 1, -1), t.applyInputRules && r.setMeta("applyInputRules", {
      from: u,
      text: g
    }), t.applyPasteRules && r.setMeta("applyPasteRules", {
      from: u,
      text: g
    });
  }
  return !0;
};
function yl(n) {
  for (let e = 0; e < n.edgeCount; e += 1) {
    const { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs()) return t;
  }
  return null;
}
const Zu = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
  const { pos: i, attrs: o, content: s, updateSelection: l = !0 } = n;
  let c;
  typeof i == "number" ? c = e.doc.resolve(i) : i ? c = i : c = e.selection.$from;
  const a = yl(c.parent.contentMatchAt(c.index()));
  if (!a) return !1;
  const u = Object.keys(a.spec.attrs || {}), d = o ? Object.fromEntries(Object.entries(o).filter(([p]) => u.includes(p))) : {};
  let f;
  if (s) {
    const p = Hn(s, r.schema);
    f = a.createAndFill(d, p);
  } else f = a.createAndFill(d);
  return f ? (t && (e.insert(c.pos, f), l && gl(e, e.steps.length - 1, -1)), !0) : !1;
}, ed = () => ({ state: n, dispatch: e }) => du(n, e), td = () => ({ state: n, dispatch: e }) => fu(n, e), nd = () => ({ state: n, dispatch: e }) => Xs(n, e), rd = () => ({ state: n, dispatch: e }) => tl(n, e), id = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = Yr(n.doc, n.selection.$from.pos, -1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, od = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = Yr(n.doc, n.selection.$from.pos, 1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, sd = () => ({ state: n, dispatch: e }) => au(n, e), ld = () => ({ state: n, dispatch: e }) => uu(n, e);
function xl() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function cd(n) {
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
      Br() || xl() ? s = !0 : i = !0;
    else throw new Error(`Unrecognized modifier name: ${c}`);
  }
  return r && (t = `Alt-${t}`), i && (t = `Ctrl-${t}`), s && (t = `Meta-${t}`), o && (t = `Shift-${t}`), t;
}
const ad = (n) => ({ editor: e, view: t, tr: r, dispatch: i }) => {
  const o = cd(n).split(/-(?!$)/), s = o.find((a) => ![
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
function Ki(n, e, t = {}) {
  const { from: r, to: i, empty: o } = n.selection, s = e ? kt(e, n.schema) : null, l = [];
  n.doc.nodesBetween(r, i, (u, d) => {
    if (u.isText) return;
    const f = Math.max(r, d), p = Math.min(i, d + u.nodeSize);
    l.push({
      node: u,
      from: f,
      to: p
    });
  });
  const c = i - r, a = l.filter((u) => s ? s.name === u.node.type.name : !0).filter((u) => Or(u.node.attrs, t, { strict: !1 }));
  return o ? !!a.length : a.reduce((u, d) => u + d.to - d.from, 0) >= c;
}
const ud = (n, e = {}) => ({ state: t, dispatch: r }) => Ki(t, kt(n, t.schema), e) ? hu(t, r) : !1, dd = () => ({ state: n, dispatch: e }) => ol(n, e), fd = (n) => ({ state: e, dispatch: t }) => {
  const r = kt(n, e.schema);
  return Tu(r)(e, t);
}, hd = () => ({ state: n, dispatch: e }) => rl(n, e);
function bl(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function Ao(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((r, i) => (t.includes(i) || (r[i] = n[i]), r), {});
}
const pd = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = bl(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = kt(n, r.schema)), l === "mark" && (s = gn(n, r.schema));
  let c = !1;
  return t.selection.ranges.forEach((a) => {
    r.doc.nodesBetween(a.$from.pos, a.$to.pos, (u, d) => {
      o && o === u.type && (c = !0, i && t.setNodeMarkup(d, void 0, Ao(u.attrs, e))), s && u.marks.length && u.marks.forEach((f) => {
        s === f.type && (c = !0, i && t.addMark(d, d + u.nodeSize, s.create(Ao(f.attrs, e))));
      });
    });
  }), c;
}, md = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), gd = () => ({ tr: n, dispatch: e }) => {
  if (e) {
    const t = new ec(n.doc);
    n.setSelection(t);
  }
  return !0;
}, yd = () => ({ state: n, dispatch: e }) => Zs(n, e), xd = () => ({ state: n, dispatch: e }) => nl(n, e), bd = () => ({ state: n, dispatch: e }) => yu(n, e), vd = () => ({ state: n, dispatch: e }) => vu(n, e), wd = () => ({ state: n, dispatch: e }) => bu(n, e);
function kd(n, e, t = {}, r = {}) {
  return Hn(n, e, {
    slice: !1,
    parseOptions: t,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
const Sd = (n, { errorOnInvalidContent: e, emitUpdate: t = !0, parseOptions: r = {} } = {}) => ({ editor: i, tr: o, dispatch: s, commands: l }) => {
  const { doc: c } = o;
  if (r.preserveWhitespace !== "full") {
    const a = kd(n, i.schema, r, { errorOnInvalidContent: e ?? i.options.enableContentCheck });
    if (s) {
      const u = ml(a) ? a.content : [a];
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
function Nd(n, e) {
  const t = gn(e, n.schema), { from: r, to: i, empty: o } = n.selection, s = [];
  o ? (n.storedMarks && s.push(...n.storedMarks), s.push(...n.selection.$head.marks())) : n.doc.nodesBetween(r, i, (c) => {
    s.push(...c.marks);
  });
  const l = s.find((c) => c.type.name === t.name);
  return l ? { ...l.attrs } : {};
}
function Td(n, e) {
  const t = new su(n);
  return e.forEach((r) => {
    r.steps.forEach((i) => {
      t.step(i);
    });
  }), t;
}
function Cd(n, e) {
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
function Ji(n) {
  return (e) => Cd(e.$from, n);
}
function sr(n, e, t) {
  return n.config[e] === void 0 && n.parent ? sr(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? sr(n.parent, e, t) : null
  }) : n.config[e];
}
function Ed(n) {
  return typeof n == "function";
}
function vi(n, e = void 0, ...t) {
  return Ed(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function vl(n) {
  return {
    baseExtensions: n.filter((e) => e.type === "extension"),
    nodeExtensions: n.filter((e) => e.type === "node"),
    markExtensions: n.filter((e) => e.type === "mark")
  };
}
function Md(n, e, t) {
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
function Rd(n) {
  return Object.fromEntries(Object.entries(n.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
function Ad(n, e = JSON.stringify) {
  const t = {};
  return n.filter((r) => {
    const i = e(r);
    return Object.prototype.hasOwnProperty.call(t, i) ? !1 : t[i] = !0;
  });
}
function Id(n) {
  const e = Ad(n);
  return e.length === 1 ? e : e.filter((t, r) => !e.filter((i, o) => o !== r).some((i) => t.oldRange.from >= i.oldRange.from && t.oldRange.to <= i.oldRange.to && t.newRange.from >= i.newRange.from && t.newRange.to <= i.newRange.to));
}
function $d(n) {
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
  }), Id(r);
}
function Tr(n, e, t) {
  return Object.fromEntries(Object.entries(t).filter(([r]) => {
    const i = n.find((o) => o.type === e && o.name === r);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function zd(n, e, t = {}) {
  const { empty: r, ranges: i } = n.selection, o = e ? gn(e, n.schema) : null;
  if (r) return !!(n.storedMarks || n.selection.$from.marks()).filter((u) => o ? o.name === u.type.name : !0).find((u) => Or(u.attrs, t, { strict: !1 }));
  let s = 0;
  const l = [];
  if (i.forEach(({ $from: u, $to: d }) => {
    const f = u.pos, p = d.pos;
    n.doc.nodesBetween(f, p, (m, g) => {
      if (o && m.inlineContent && !m.type.allowsMarkType(o)) return !1;
      if (!m.isText && !m.marks.length) return;
      const b = Math.max(f, g), x = Math.min(p, g + m.nodeSize), I = x - b;
      s += I, l.push(...m.marks.map((M) => ({
        mark: M,
        from: b,
        to: x
      })));
    });
  }), s === 0) return !1;
  const c = l.filter((u) => o ? o.name === u.mark.type.name : !0).filter((u) => Or(u.mark.attrs, t, { strict: !1 })).reduce((u, d) => u + d.to - d.from, 0), a = l.filter((u) => o ? u.mark.type !== o && u.mark.type.excludes(o) : !0).reduce((u, d) => u + d.to - d.from, 0);
  return (c > 0 ? c + a : c) >= s;
}
function li(n, e) {
  const { nodeExtensions: t } = vl(e), r = t.find((o) => o.name === n);
  if (!r) return !1;
  const i = vi(sr(r, "group", {
    name: r.name,
    options: r.options,
    storage: r.storage
  }));
  return typeof i != "string" ? !1 : i.split(" ").includes("list");
}
function wl(n, { checkChildren: e = !0, ignoreWhitespace: t = !1 } = {}) {
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
      i !== !1 && (wl(o, {
        ignoreWhitespace: t,
        checkChildren: e
      }) || (i = !1));
    }), i;
  }
  return !1;
}
function Dd(n, e, t) {
  const { selection: r } = e;
  let i = null;
  if (fl(r) && (i = r.$cursor), i) {
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
const Pd = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = t, { empty: s, ranges: l } = o, c = gn(n, r.schema);
  if (i)
    if (s) {
      const a = Nd(r, c);
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
  return Dd(r, t, c);
}, Ld = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), Od = (n, e = {}) => ({ state: t, dispatch: r, chain: i }) => {
  const o = kt(n, t.schema);
  let s;
  return t.selection.$anchor.sameParent(t.selection.$head) && (s = t.selection.$anchor.parent.attrs), o.isTextblock ? i().command(({ commands: l }) => Co(o, {
    ...s,
    ...e
  })(t) ? !0 : l.clearNodes()).command(({ state: l }) => Co(o, {
    ...s,
    ...e
  })(l, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, Bd = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, i = bn(n, 0, r.content.size), o = On.create(r, i);
    e.setSelection(o);
  }
  return !0;
}, Fd = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = r;
  let s, l;
  return typeof e == "number" ? (s = e, l = e) : e && "from" in e && "to" in e ? (s = e.from, l = e.to) : (s = o.from, l = o.to), i && t.doc.nodesBetween(s, l, (c, a) => {
    c.isText || t.setNodeMarkup(a, void 0, {
      ...c.attrs,
      dir: n
    });
  }), !0;
}, Hd = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, { from: i, to: o } = typeof n == "number" ? {
      from: n,
      to: n
    } : n, s = Bt.atStart(r).from, l = Bt.atEnd(r).to, c = bn(i, s, l), a = bn(o, s, l), u = Bt.create(r, c, a);
    e.setSelection(u);
  }
  return !0;
}, _d = (n) => ({ state: e, dispatch: t }) => {
  const r = kt(n, e.schema);
  return Mu(r)(e, t);
};
function Io(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    n.tr.ensureMarks(r);
  }
}
const jd = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
  const { selection: o, doc: s } = e, { $from: l, $to: c } = o, a = i.extensionManager.attributes, u = Tr(a, l.node().type.name, l.node().attrs);
  if (o instanceof On && o.node.isBlock)
    return !l.parentOffset || !nn(s, l.pos) ? !1 : (r && (n && Io(t, i.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock) return !1;
  const d = c.parentOffset === c.parent.content.size, f = l.depth === 0 ? void 0 : yl(l.node(-1).contentMatchAt(l.indexAfter(-1)));
  let p = d && f ? [{
    type: f,
    attrs: u
  }] : void 0, m = nn(e.doc, e.mapping.map(l.pos), 1, p);
  if (!p && !m && nn(e.doc, e.mapping.map(l.pos), 1, f ? [{ type: f }] : void 0) && (m = !0, p = f ? [{
    type: f,
    attrs: u
  }] : void 0), r) {
    if (m && (o instanceof Bt && e.deleteSelection(), e.split(e.mapping.map(l.pos), 1, p), f && !d && !l.parentOffset && l.parent.type !== f)) {
      const g = e.mapping.map(l.before()), b = e.doc.resolve(g);
      l.node(-1).canReplaceWith(b.index(), b.index() + 1, f) && e.setNodeMarkup(e.mapping.map(l.before()), f);
    }
    n && Io(t, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return m;
}, Wd = (n, e = {}) => ({ tr: t, state: r, dispatch: i, editor: o }) => {
  const s = kt(n, r.schema), { $from: l, $to: c } = r.selection, a = r.selection.node;
  if (a && a.isBlock || l.depth < 2 || !l.sameParent(c)) return !1;
  const u = l.node(-1);
  if (u.type !== s) return !1;
  const d = o.extensionManager.attributes;
  if (l.parent.content.size === 0 && l.node(-1).childCount === l.indexAfter(-1)) {
    if (l.depth === 2 || l.node(-3).type !== s || l.index(-2) !== l.node(-2).childCount - 1) return !1;
    if (i) {
      var f;
      let x = J.empty;
      const I = l.index(-1) ? 1 : l.index(-2) ? 2 : 3;
      for (let L = l.depth - I; L >= l.depth - 3; L -= 1) x = J.from(l.node(L).copy(x));
      const M = l.indexAfter(-1) < l.node(-2).childCount ? 1 : l.indexAfter(-2) < l.node(-3).childCount ? 2 : 3, N = {
        ...Tr(d, l.node().type.name, l.node().attrs),
        ...e
      }, k = ((f = s.contentMatch.defaultType) === null || f === void 0 ? void 0 : f.createAndFill(N)) || void 0;
      x = x.append(J.from(s.createAndFill(null, k) || void 0));
      const R = l.before(l.depth - (I - 1));
      t.replace(R, l.after(-M), new le(x, 4 - I, 0));
      let _ = -1;
      t.doc.nodesBetween(R, t.doc.content.size, (L, A) => {
        if (_ > -1) return !1;
        L.isTextblock && L.content.size === 0 && (_ = A + 1);
      }), _ > -1 && t.setSelection(Bt.near(t.doc.resolve(_))), t.scrollIntoView();
    }
    return !0;
  }
  const p = c.pos === l.end() ? u.contentMatchAt(0).defaultType : null, m = {
    ...Tr(d, u.type.name, u.attrs),
    ...e
  }, g = {
    ...Tr(d, l.node().type.name, l.node().attrs),
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
  if (!nn(t.doc, l.pos, 2)) return !1;
  if (i) {
    const { selection: x, storedMarks: I } = r, { splittableMarks: M } = o.extensionManager, N = I || x.$to.parentOffset && x.$from.marks();
    if (t.split(l.pos, 2, b).scrollIntoView(), !N || !i) return !0;
    const k = N.filter((R) => M.includes(R.type.name));
    t.ensureMarks(k);
  }
  return !0;
};
function $o(n) {
  return !n || n === "1" ? null : n;
}
function kl(n, e) {
  return $o(n) === $o(e);
}
const ci = (n, e) => {
  const t = Ji((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && Cn(n.doc, t.pos)) || !kl(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(t.pos), !0;
}, ai = (n, e) => {
  const t = Ji((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && Cn(n.doc, r)) || !kl(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(r), !0;
};
function qd(n) {
  const e = n.doc, t = e.firstChild;
  if (!t) return null;
  const r = e.resolve(1), i = e.resolve(t.nodeSize - 1);
  return Bt.between(r, i);
}
const Kd = (n, e, t, r = {}) => ({ editor: i, tr: o, state: s, dispatch: l, chain: c, commands: a, can: u }) => {
  const { extensions: d, splittableMarks: f } = i.extensionManager, p = kt(n, s.schema), m = kt(e, s.schema), { selection: g, storedMarks: b } = s, { $from: x, $to: I } = g, M = x.blockRange(I), N = b || g.$to.parentOffset && g.$from.marks();
  if (!M) return !1;
  const k = Ji((O) => li(O.type.name, d))(g), R = g.from === 0 && g.to === s.doc.content.size, _ = s.doc.content.content, L = _.length === 1 ? _[0] : null, A = R && L && li(L.type.name, d) ? {
    node: L,
    pos: 0
  } : null, W = k ?? A, S = !!k && M.depth >= 1 && M.depth - k.depth <= 1, $ = !!A;
  if ((S || $) && W) {
    if (W.node.type === p)
      return R && $ ? c().command(({ tr: O, dispatch: F }) => {
        const Y = qd(O);
        return Y ? (O.setSelection(Y), F && F(O), !0) : !1;
      }).liftListItem(m).run() : a.liftListItem(m);
    if (li(W.node.type.name, d) && p.validContent(W.node.content)) return c().command(() => (o.setNodeMarkup(W.pos, p), !0)).command(() => ci(o, p)).command(() => ai(o, p)).run();
  }
  return !t || !N || !l ? c().command(() => u().wrapInList(p, r) ? !0 : a.clearNodes()).wrapInList(p, r).command(() => ci(o, p)).command(() => ai(o, p)).run() : c().command(() => {
    const O = u().wrapInList(p, r), F = N.filter((Y) => f.includes(Y.type.name));
    return o.ensureMarks(F), O ? !0 : a.clearNodes();
  }).wrapInList(p, r).command(() => ci(o, p)).command(() => ai(o, p)).run();
}, Jd = (n, e = {}, t = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: o = !1 } = t, s = gn(n, r.schema);
  return zd(r, s, e) ? i.unsetMark(s, { extendEmptyMarkRange: o }) : i.setMark(s, e);
}, Vd = (n, e, t = {}) => ({ state: r, commands: i }) => {
  const o = kt(n, r.schema), s = kt(e, r.schema), l = Ki(r, o, t);
  let c;
  return r.selection.$anchor.sameParent(r.selection.$head) && (c = r.selection.$anchor.parent.attrs), l ? i.setNode(s, c) : i.setNode(o, {
    ...c,
    ...t
  });
}, Yd = (n, e = {}) => ({ state: t, commands: r }) => {
  const i = kt(n, t.schema);
  return Ki(t, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, Ud = () => ({ state: n, dispatch: e }) => {
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
}, Gd = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
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
}, Xd = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { extendEmptyMarkRange: o = !1 } = e, { selection: s } = t, l = gn(n, r.schema), { $from: c, empty: a, ranges: u } = s;
  if (!i) return !0;
  if (a && o) {
    var d;
    let { from: f, to: p } = s;
    const m = dl(c, l, (d = c.marks().find((g) => g.type === l)) === null || d === void 0 ? void 0 : d.attrs);
    m && (f = m.from, p = m.to), t.removeMark(f, p, l);
  } else u.forEach((f) => {
    t.removeMark(f.$from.pos, f.$to.pos, l);
  });
  return t.removeStoredMark(l), !0;
}, Qd = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const { selection: i } = t;
  let o, s;
  return typeof n == "number" ? (o = n, s = n) : n && "from" in n && "to" in n ? (o = n.from, s = n.to) : (o = i.from, s = i.to), r && e.doc.nodesBetween(o, s, (l, c) => {
    if (l.isText) return;
    const a = { ...l.attrs };
    delete a.dir, e.setNodeMarkup(c, void 0, a);
  }), !0;
}, Zd = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = bl(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = kt(n, r.schema)), l === "mark" && (s = gn(n, r.schema));
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
          const M = Math.max(x, u), N = Math.min(x + b.nodeSize, d);
          t.addMark(M, N, s.create({
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
}, ef = new Jt("__tiptap_decorations__"), tf = (n) => ({ tr: e, dispatch: t }) => (t && e.setMeta(ef, {
  type: "force",
  name: n
}), !0), nf = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = kt(n, t.schema);
  return wu(i, e)(t, r);
}, rf = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = kt(n, t.schema);
  return ku(i, e)(t, r);
};
var of = /* @__PURE__ */ ma({
  blur: () => Au,
  clearContent: () => Iu,
  clearNodes: () => $u,
  command: () => zu,
  createParagraphNear: () => Du,
  cut: () => Pu,
  deleteCurrentNode: () => Lu,
  deleteNode: () => Ou,
  deleteRange: () => Bu,
  deleteSelection: () => _u,
  enter: () => ju,
  exitCode: () => Wu,
  extendMarkRange: () => Ku,
  first: () => Ju,
  focus: () => Uu,
  forEach: () => Gu,
  insertContent: () => Xu,
  insertContentAt: () => Qu,
  insertDefaultBlock: () => Zu,
  joinBackward: () => nd,
  joinDown: () => td,
  joinForward: () => rd,
  joinItemBackward: () => id,
  joinItemForward: () => od,
  joinTextblockBackward: () => sd,
  joinTextblockForward: () => ld,
  joinUp: () => ed,
  keyboardShortcut: () => ad,
  lift: () => ud,
  liftEmptyBlock: () => dd,
  liftListItem: () => fd,
  newlineInCode: () => hd,
  resetAttributes: () => pd,
  scrollIntoView: () => md,
  selectAll: () => gd,
  selectNodeBackward: () => yd,
  selectNodeForward: () => xd,
  selectParentNode: () => bd,
  selectTextblockEnd: () => vd,
  selectTextblockStart: () => wd,
  setContent: () => Sd,
  setMark: () => Pd,
  setMeta: () => Ld,
  setNode: () => Od,
  setNodeSelection: () => Bd,
  setTextDirection: () => Fd,
  setTextSelection: () => Hd,
  sinkListItem: () => _d,
  splitBlock: () => jd,
  splitListItem: () => Wd,
  toggleList: () => Kd,
  toggleMark: () => Jd,
  toggleNode: () => Vd,
  toggleWrap: () => Yd,
  undoInputRule: () => Ud,
  unsetAllMarks: () => Gd,
  unsetMark: () => Xd,
  unsetTextDirection: () => Qd,
  updateAttributes: () => Zd,
  updateDecorations: () => tf,
  wrapIn: () => nf,
  wrapInList: () => rf
});
typeof process < "u" && process.env.NODE_ENV;
function sf(n) {
  return Object.prototype.toString.call(n).slice(8, -1);
}
function kr(n) {
  return sf(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
function Sl(n, e) {
  const t = { ...n };
  return kr(n) && kr(e) && Object.keys(e).forEach((r) => {
    kr(e[r]) && kr(n[r]) ? t[r] = Sl(n[r], e[r]) : t[r] = e[r];
  }), t;
}
var Nl = class {
  constructor(n = {}) {
    this.type = "extendable", this.parent = null, this.child = null, this.name = "", this.config = { name: this.name }, this.config = {
      ...this.config,
      ...n
    }, this.name = this.config.name;
  }
  get options() {
    return { ...vi(sr(this, "addOptions", { name: this.name })) };
  }
  get storage() {
    return { ...vi(sr(this, "addStorage", {
      name: this.name,
      options: this.options
    })) };
  }
  configure(n = {}) {
    const e = this.extend({
      ...this.config,
      addOptions: () => Sl(this.options, n)
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
}, lf = class Tl extends Nl {
  constructor(...e) {
    super(...e), this.type = "mark";
  }
  /**
  * Create a new Mark instance
  * @param config - Mark configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new Tl(t);
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
}, Ft = class Cl extends Nl {
  constructor(...e) {
    super(...e), this.type = "extension";
  }
  /**
  * Create a new Extension instance
  * @param config - Extension configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new Cl(t);
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const t = typeof e == "function" ? e() : e;
    return super.extend(t);
  }
};
Ft.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return { blockSeparator: void 0 };
  },
  addProseMirrorPlugins() {
    return [new rn({
      key: new Jt("clipboardTextSerializer"),
      props: { clipboardTextSerializer: () => {
        const { editor: n } = this, { state: e, schema: t } = n, { doc: r, selection: i } = e, o = Rd(t), { blockSeparator: s } = this.options, l = {
          ...s !== void 0 ? { blockSeparator: s } : {},
          textSerializers: o
        };
        return [...i.ranges].sort((c, a) => c.$from.pos - a.$from.pos).map(({ $from: c, $to: a }) => Md(r, {
          from: c.pos,
          to: a.pos
        }, l)).join(s ?? `

`);
      } }
    })];
  }
});
Ft.create({
  name: "commands",
  addCommands() {
    return { ...of };
  }
});
Ft.create({
  name: "delete",
  onUpdate({ transaction: n, appendedTransactions: e }) {
    var t, r;
    const i = () => {
      var o, s, l;
      if ((o = (s = this.editor.options.coreExtensionOptions) === null || s === void 0 || (s = s.delete) === null || s === void 0 || (l = s.filterTransaction) === null || l === void 0 ? void 0 : l.call(s, n)) !== null && o !== void 0 ? o : n.getMeta("y-sync$")) return;
      const c = Td(n.before, [n, ...e]);
      $d(c).forEach((u) => {
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
          const m = a.slice(d).map(u.from, -1), g = a.slice(d).map(u.to), b = a.invert().map(m, -1), x = a.invert().map(g), I = m > 0 ? (f = c.doc.nodeAt(m - 1)) === null || f === void 0 ? void 0 : f.marks.some((N) => N.eq(u.mark)) : !1, M = (p = c.doc.nodeAt(g)) === null || p === void 0 ? void 0 : p.marks.some((N) => N.eq(u.mark));
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
            partial: !!(M || I),
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
Ft.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [new rn({
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
Ft.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [new rn({
      key: new Jt("editable"),
      props: { editable: () => this.editor.options.editable }
    })];
  }
});
const cf = new Jt("focusEvents");
Ft.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [new rn({
      key: cf,
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
Ft.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const n = () => this.editor.commands.first(({ commands: s }) => [
      () => s.undoInputRule(),
      () => s.command(({ tr: l }) => {
        const { selection: c, doc: a } = l, { empty: u, $anchor: d } = c, { pos: f, parent: p } = d, m = d.parent.isTextblock && f > 0 ? l.doc.resolve(f - 1) : d, g = m.parent.type.spec.isolating, b = d.pos - d.parentOffset, x = g && m.parent.childCount === 1 ? b === d.pos : zn.atStart(a).from === f;
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
    return Br() || xl() ? o : i;
  },
  addProseMirrorPlugins() {
    return [new rn({
      key: new Jt("clearDocument"),
      appendTransaction: (n, e, t) => {
        if (n.some((p) => p.getMeta("composition"))) return;
        const r = n.some((p) => p.docChanged) && !e.doc.eq(t.doc), i = n.some((p) => p.getMeta("preventClearDocument"));
        if (!r || i) return;
        const { empty: o, from: s, to: l } = e.selection, c = zn.atStart(e.doc).from, a = zn.atEnd(e.doc).to;
        if (o || !(s === c && l === a) || !wl(t.doc)) return;
        const u = t.tr, d = cl({
          state: t,
          transaction: u
        }), { commands: f } = new Ru({
          editor: this.editor,
          state: d
        });
        if (f.clearNodes(), !!u.steps.length)
          return u;
      }
    })];
  }
});
Ft.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [new rn({
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
Ft.create({
  name: "tabindex",
  addOptions() {
    return { value: void 0 };
  },
  addProseMirrorPlugins() {
    return [new rn({
      key: new Jt("tabindex"),
      props: { attributes: () => {
        var n;
        return !this.editor.isEditable && this.options.value === void 0 ? {} : { tabindex: (n = this.options.value) !== null && n !== void 0 ? n : "0" };
      } }
    })];
  }
});
Ft.create({
  name: "textDirection",
  addOptions() {
    return { direction: void 0 };
  },
  addGlobalAttributes() {
    if (!this.options.direction) return [];
    const { nodeExtensions: n } = vl(this.extensions);
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
    return [new rn({
      key: new Jt("textDirection"),
      props: { attributes: () => {
        const n = this.options.direction;
        return n ? { dir: n } : {};
      } }
    })];
  }
});
const af = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), uf = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), df = /^(https?:\/\/|mailto:)/i;
function ff(n) {
  if (!n) return "";
  const e = [];
  for (const t of n.split(";")) {
    const r = t.indexOf(":");
    if (r < 0) continue;
    const i = t.slice(0, r).trim().toLowerCase(), o = t.slice(r + 1).trim();
    uf.has(i) && o && e.push(`${i}: ${o}`);
  }
  return e.join("; ");
}
function wi(n) {
  if (n.nodeType === Node.TEXT_NODE) return n;
  if (n.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const e = n, t = e.tagName.toLowerCase(), r = () => {
    const l = document.createDocumentFragment();
    for (const c of Array.from(e.childNodes)) l.appendChild(wi(c));
    return l;
  };
  if (!af.has(t)) return r();
  if (t === "a") {
    const l = e.getAttribute("href") || "";
    if (!df.test(l)) return r();
  }
  const i = document.createElement(t), o = e.getAttribute("style"), s = ff(o || "");
  if (s && i.setAttribute("style", s), t === "span") {
    const l = e.getAttribute("data-text-style");
    l && i.setAttribute("data-text-style", l);
  }
  if (t === "a") {
    i.setAttribute("href", e.getAttribute("href"));
    const l = e.getAttribute("target"), c = e.getAttribute("rel");
    l && i.setAttribute("target", l), c && i.setAttribute("rel", c);
  }
  for (const l of Array.from(e.childNodes)) i.appendChild(wi(l));
  return i;
}
function El(n) {
  return n.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function hf(n) {
  const e = El(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  t.innerHTML = e;
  const r = document.createDocumentFragment();
  for (const s of Array.from(t.content.childNodes)) r.appendChild(wi(s));
  const i = document.createElement("div");
  return i.appendChild(r), i.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function Wh(n) {
  const e = El(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  return t.innerHTML = e, (t.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function qh(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function pf(n) {
  return n.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function zo(n) {
  return n.replace(/\{\{([^{}]+)\}\}/g, (e, t) => `<span data-type="token" data-field="${t}">{{${t}}}</span>`);
}
const mf = { text: "#52525b" }, gf = ({ node: n, selected: e, extension: t, editor: r, view: i, getPos: o }) => {
  var f;
  const s = n.attrs.field ?? "", l = t.options, c = ((f = l.resolve) == null ? void 0 : f.call(l, s)) ?? null, a = (c == null ? void 0 : c.color) ?? mf, u = (c == null ? void 0 : c.label) ?? `{{${s}}}`, d = c == null ? void 0 : c.nested;
  return /* @__PURE__ */ h(
    Xl,
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
        b && On.isSelectable(b) && i.dispatch(i.state.tr.setSelection(new On(g))), (x = l.onTokenClick) == null || x.call(l, s, p.currentTarget.getBoundingClientRect(), m);
      },
      children: d ? /* @__PURE__ */ h("span", { className: "rt-token-nested", children: u }) : u
    }
  );
}, yf = dc.extend({
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
    return Gl(gf);
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
    return ["span", Ul({ "data-type": "token" }, e), `{{${n.attrs.field ?? ""}}}`];
  },
  renderText({ node: n }) {
    return `{{${n.attrs.field ?? ""}}}`;
  }
}), xf = 240, bf = 280, vf = ({ props: n, onApi: e }) => {
  const t = qr(), r = w(e);
  r.current = e, se(() => {
    r.current(t);
  }, [t]);
  const i = w(null);
  se(() => {
    var s;
    t.pointerDriven || mn((s = i.current) == null ? void 0 : s.querySelector(".ui-item-highlighted"));
  }, [t.highlightedIndex, t.pointerDriven]), se(() => {
    n.items.length > 0 && t.highlightedIndex === -1 && t.setHighlighted(0, "keyboard");
  }, [n.items.length, t.highlightedIndex, t]);
  const o = Wr();
  return /* @__PURE__ */ h(ur.Provider, { value: t, children: /* @__PURE__ */ h(
    "div",
    {
      role: "listbox",
      "data-token-popup": !0,
      className: "ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto",
      style: { width: bf, maxHeight: xf },
      onMouseDown: (s) => s.preventDefault(),
      children: /* @__PURE__ */ h("div", { ref: i, children: n.items.map((s) => /* @__PURE__ */ h(
        wf,
        {
          item: s,
          d: o,
          command: () => n.command({ field: s.key })
        },
        s.key
      )) })
    }
  ) });
}, wf = ({ item: n, d: e, command: t }) => {
  const { myIndex: r, highlighted: i, setPointer: o } = hs({
    label: () => n.label,
    activate: t
  }), s = Oe(), l = { padding: `${P(8, 12, s)}px ${P(12, 16, s)}px`, fontSize: P(12, 14, s) };
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
}, Do = () => {
  let n = null;
  const e = (r) => {
    n && (n.props = r, n.holder.style.display = r.items.length > 0 ? "" : "none", n.root.render(
      /* @__PURE__ */ h(vf, { props: r, onApi: (i) => {
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
      const o = fc(i);
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
}, kf = lf.create({
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
}), Cr = new Jt("retainedSelectionHighlight"), Sf = Ft.create({
  name: "retainedSelectionHighlight",
  addProseMirrorPlugins() {
    return [
      new rn({
        key: Cr,
        state: {
          init: () => ({ held: !1, decorations: fr.empty }),
          apply(n, e) {
            const t = n.getMeta(Cr), r = t ? t.held : e.held;
            if (!r) return { held: !1, decorations: fr.empty };
            const { from: i, to: o, empty: s } = n.selection;
            return {
              held: r,
              decorations: s ? fr.empty : fr.create(n.doc, [tc.inline(i, o, { class: "rt-retained-selection" })])
            };
          }
        },
        props: {
          decorations(n) {
            var e;
            return (e = Cr.getState(n)) == null ? void 0 : e.decorations;
          }
        }
      })
    ];
  }
}), Kh = {
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
function Ml(n, e) {
  const t = n.state.doc.resolve(e).nodeBefore;
  return t && t.type.name === "token" ? t.attrs.field ?? "" : null;
}
function Nf(n) {
  const e = n.state.selection.$from, t = e.nodeBefore;
  if (!(t != null && t.isText)) return null;
  const r = t.text || "", i = r.lastIndexOf(".");
  if (i < 0) return null;
  const o = e.pos - r.length + i, s = Ml(n, o);
  return s == null ? null : { chipKey: s, dotPos: o };
}
const Tf = ot.forwardRef(({
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
  const f = w(s);
  f.current = s;
  const p = w(l);
  p.current = l;
  const m = w(c);
  m.current = c;
  const g = w(a);
  g.current = a;
  const b = w(u);
  b.current = u;
  const x = w(null), I = w(null), M = w(e);
  M.current = e;
  const N = w(r);
  N.current = r;
  const k = w(o);
  k.current = o;
  const R = w(null), _ = ($) => {
    var he;
    const O = $.getAttributes("textStyle"), F = $.getAttributes("reportTextStyle"), { from: Y, to: E, empty: q } = $.state.selection;
    let H = !1, T = !1, Me = !1;
    if (!q) {
      const X = /* @__PURE__ */ new Set(), ae = /* @__PURE__ */ new Set(), j = /* @__PURE__ */ new Set();
      $.state.doc.nodesBetween(Y, E, (K) => {
        if (!K.isText) return;
        const Z = K.marks.find((V) => V.type.name === "textStyle");
        X.add((Z == null ? void 0 : Z.attrs.fontFamily) || ""), ae.add((Z == null ? void 0 : Z.attrs.fontSize) || "");
        const te = K.marks.find((V) => V.type.name === "reportTextStyle");
        j.add((te == null ? void 0 : te.attrs.styleId) || "");
      }), H = X.size > 1, T = ae.size > 1, Me = j.size > 1;
    }
    const ye = {
      bold: $.isActive("bold"),
      italic: $.isActive("italic"),
      underline: $.isActive("underline"),
      strike: $.isActive("strike"),
      link: $.isActive("link"),
      color: O.color || "",
      fontFamily: O.fontFamily || "",
      fontSize: O.fontSize || "",
      textStyle: F.styleId || "",
      hasSelection: !q,
      fontFamilyMixed: H,
      fontSizeMixed: T,
      textStyleMixed: Me
    }, me = R.current;
    me && me.bold === ye.bold && me.italic === ye.italic && me.underline === ye.underline && me.strike === ye.strike && me.link === ye.link && me.color === ye.color && me.fontFamily === ye.fontFamily && me.fontSize === ye.fontSize && me.textStyle === ye.textStyle && me.hasSelection === ye.hasSelection && me.fontFamilyMixed === ye.fontFamilyMixed && me.fontSizeMixed === ye.fontSizeMixed && me.textStyleMixed === ye.textStyleMixed || (R.current = ye, (he = k.current) == null || he.call(k, ye));
  }, L = ($) => {
    var q;
    const O = $.state.selection;
    let F = null;
    O instanceof On && O.node.type.name === "token" ? (F = { key: O.node.attrs.field ?? "", pos: O.from }, x.current = O.from) : x.current != null && (x.current = $.state.tr.mapping.map(x.current));
    const Y = I.current, E = Y && F && Y.key === F.key && Y.pos === F.pos;
    !Y && !F || E || (I.current = F, (q = b.current) == null || q.call(b, F));
  }, A = ($) => {
    const O = hf(pf($));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(O) ? "" : O;
  }, W = ot.useMemo(() => {
    const $ = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: Y }) => {
        var E;
        return ((E = p.current) == null ? void 0 : E.call(p, Y)) ?? [];
      },
      command: ({ editor: Y, range: E, props: q }) => {
        Y.chain().focus().insertContentAt(E, { type: "token", attrs: { field: q.field } }).run();
      },
      render: Do
    }, O = yf.configure({
      resolve: f.current ?? null,
      suggestion: $,
      onTokenClick: (Y, E, q) => {
        var H;
        x.current = q, (H = g.current) == null || H.call(g, Y, E, q);
      }
    }), F = Ft.create({
      name: "tokenAttributeSuggestion",
      addProseMirrorPlugins() {
        return [
          uc({
            pluginKey: new Jt("tokenAttributeSuggestion"),
            editor: this.editor,
            char: ".",
            // The gate is `shouldShow` (a chip must sit immediately before the
            // dot), not the prefix rule — the prefix here is an atom, not text.
            allowedPrefixes: null,
            decorationClass: "suggestion-attr",
            shouldShow: ({ editor: Y, range: E }) => Ml(Y, E.from) != null,
            items: ({ editor: Y, query: E }) => {
              var H;
              const q = Nf(Y);
              return q ? ((H = m.current) == null ? void 0 : H.call(m, q.chipKey, E)) ?? [] : [];
            },
            command: ({ editor: Y, range: E, props: q }) => {
              Y.chain().focus().insertContentAt(E, { type: "token", attrs: { field: q.field } }).run();
            },
            render: Do
          })
        ];
      }
    });
    return [O, F];
  }, []), S = Ql({
    immediatelyRender: !1,
    extensions: [
      nc,
      rc.configure({ placeholder: t }),
      ic,
      oc,
      sc,
      kf,
      Sf,
      lc,
      ac,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      cc.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      ...W
    ],
    content: zo(n || ""),
    editable: !r,
    onUpdate: ({ editor: $ }) => {
      M.current(A($.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: $ }) => {
      _($), L($);
    }
  });
  return se(() => {
    if (!S || S.isFocused) return;
    A(S.getHTML()) !== n && (R.current = null, S.commands.setContent(zo(n || ""), { emitUpdate: !1 }), _(S));
  }, [n, S]), se(() => {
    S && S.setEditable(!r);
  }, [r, S]), se(() => {
    S && (R.current = null, _(S), L(S));
  }, [S]), Bo(d, () => ({
    exec: ($, O, F) => {
      if (!S || N.current) return;
      const Y = S.chain(), E = (F == null ? void 0 : F.focus) === !1 ? Y : Y.focus();
      switch ($) {
        case "bold":
          E.toggleBold().run();
          break;
        case "italic":
          E.toggleItalic().run();
          break;
        case "underline":
          E.toggleUnderline().run();
          break;
        case "strikeThrough":
          E.toggleStrike().run();
          break;
        case "foreColor":
          O && E.setColor(O).run();
          break;
        case "unsetColor":
          E.unsetColor().run();
          break;
        case "fontFamily":
          O && E.setFontFamily(O).run();
          break;
        case "unsetFontFamily":
          E.unsetFontFamily().run();
          break;
        case "fontSize":
          O && E.setFontSize(O).run();
          break;
        case "unsetFontSize":
          E.unsetFontSize().run();
          break;
        // Linked named style: mark the run with the consumer's style id. Direct
        // font family/size on the range is cleared so the linked style's
        // typography takes effect (the object-level precedent); bold/italic
        // marks stay — direct character formatting still wins (Word).
        case "textStyle":
          O && E.setMark("reportTextStyle", { styleId: O }).unsetFontFamily().unsetFontSize().run();
          break;
        case "unsetTextStyle":
          E.unsetMark("reportTextStyle").run();
          break;
        // Clear every inline mark (bold/italic/underline/strike/color/font/
        // link) and normalize the block — the cell-chrome Reset path.
        case "clearFormatting":
          E.unsetAllMarks().clearNodes().run();
          break;
        case "link":
          O && E.extendMarkRange("link").setLink({ href: O }).run();
          break;
        case "unlink":
          E.extendMarkRange("link").unsetLink().run();
          break;
      }
    },
    focus: ($) => S == null ? void 0 : S.commands.focus($),
    insertToken: ($) => {
      !S || N.current || S.chain().focus().insertContent({ type: "token", attrs: { field: $ } }).run();
    },
    replaceToken: ($) => {
      if (!S || N.current) return;
      const O = x.current;
      O != null && S.commands.command(({ tr: F }) => {
        const Y = F.doc.nodeAt(O);
        if (!Y || Y.type.name !== "token") return !1;
        F.setNodeMarkup(O, void 0, { field: $ });
        const E = F.doc.resolve(O);
        return E.nodeAfter && E.nodeAfter.type.name === "token" && F.setSelection(new On(E)), !0;
      });
    },
    holdSelectionHighlight: ($) => {
      !S || S.isDestroyed || S.view.dispatch(S.state.tr.setMeta(Cr, { held: $ }));
    }
  }), [S]), /* @__PURE__ */ h(Zl, { editor: S, className: `richtext-editor ${i || ""}` });
});
Tf.displayName = "RichTextEditor";
const Cf = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], Ef = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], Po = ({ className: n = "w-3 h-3" }) => /* @__PURE__ */ h("span", { className: `${n} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ h("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), Mf = ({ value: n, disabled: e, onChange: t, mixed: r }) => {
  const [i, o] = re(!1);
  return /* @__PURE__ */ h(
    Kr,
    {
      open: i,
      onOpenChange: o,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ C("button", { type: "button", disabled: e, className: `${fa} w-28 justify-between`, children: [
        r ? /* @__PURE__ */ h("span", { className: "truncate italic text-zinc-500", children: "Mixed" }) : /* @__PURE__ */ h("span", { className: "truncate", style: { fontFamily: n || "Helvetica" }, children: n || "Helvetica" }),
        /* @__PURE__ */ h(fn, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: Cf.map((s) => /* @__PURE__ */ h(Fc, { onClick: () => {
        t(s), o(!1);
      }, icon: !r && s === n ? /* @__PURE__ */ h(lr, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ h("span", { style: { fontFamily: s }, children: s }) }, s))
    }
  );
}, Rf = ({ editorRef: n, disabled: e, active: t }) => {
  const [r, i] = re(!1), o = Jr(), [s, l] = re(""), c = () => {
    var u;
    const a = s.trim();
    a && ((u = n.current) == null || u.exec("link", a), i(!1));
  };
  return /* @__PURE__ */ h(
    Kr,
    {
      open: r,
      onOpenChange: i,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ h(
        Mt,
        {
          theme: "dark",
          active: t,
          disabled: e,
          onMouseDown: (a) => a.preventDefault(),
          style: { ...o.toggle, padding: 0 },
          className: "justify-center",
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ h(jl, { className: "w-3 h-3" })
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
            className: ua + " w-full"
          }
        ),
        /* @__PURE__ */ C("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ h(Mt, { theme: "dark", onClick: c, style: o.control, disabled: !s.trim(), children: "Apply" }),
          /* @__PURE__ */ h(
            Mt,
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
}, Jh = ({ editorRef: n, disabled: e, active: t, lockedFormatting: r, trailing: i, font: o, fontSizeSlot: s, showClearFormatting: l, dividers: c = !0 }) => {
  const [a, u] = re(!1), d = (b, x) => {
    var I;
    return (I = n.current) == null ? void 0 : I.exec(b, x);
  }, f = Jr(), p = (b) => !!(r != null && r[b]), m = "flex items-center gap-1 shrink-0", g = c ? /* @__PURE__ */ h("div", { className: xs }) : null;
  return /* @__PURE__ */ C("div", { className: `flex flex-wrap items-center ${c ? "gap-x-1" : "gap-x-2"} gap-y-1.5`, children: [
    /* @__PURE__ */ C("div", { className: m, children: [
      /* @__PURE__ */ h(An, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ h(Mt, { theme: "dark", "aria-label": "Bold", active: ((t == null ? void 0 : t.bold) ?? !1) || p("bold"), disabled: e || p("bold"), onMouseDown: (b) => b.preventDefault(), onClick: () => d("bold"), style: { ...f.toggle, padding: 0 }, className: "justify-center font-bold", children: "B" }) }),
      /* @__PURE__ */ h(An, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ h(Mt, { theme: "dark", "aria-label": "Italic", active: ((t == null ? void 0 : t.italic) ?? !1) || p("italic"), disabled: e || p("italic"), onMouseDown: (b) => b.preventDefault(), onClick: () => d("italic"), style: { ...f.toggle, padding: 0 }, className: "justify-center italic", children: "I" }) }),
      /* @__PURE__ */ h(An, { content: "Underline", children: /* @__PURE__ */ h(Mt, { theme: "dark", "aria-label": "Underline", active: (t == null ? void 0 : t.underline) ?? !1, disabled: e, onMouseDown: (b) => b.preventDefault(), onClick: () => d("underline"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ h(Fl, { className: "w-3 h-3" }) }) }),
      /* @__PURE__ */ h(An, { content: "Strikethrough", children: /* @__PURE__ */ h(Mt, { theme: "dark", "aria-label": "Strikethrough", active: (t == null ? void 0 : t.strike) ?? !1, disabled: e, onMouseDown: (b) => b.preventDefault(), onClick: () => d("strikeThrough"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ h(Hl, { className: "w-3 h-3" }) }) })
    ] }),
    g,
    /* @__PURE__ */ h("div", { className: m, children: /* @__PURE__ */ h(Rf, { editorRef: n, disabled: e, active: (t == null ? void 0 : t.link) ?? !1 }) }),
    g,
    /* @__PURE__ */ h("div", { className: m, children: /* @__PURE__ */ h(
      Kr,
      {
        open: a,
        onOpenChange: u,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ C(Mt, { theme: "dark", disabled: e, style: f.control, className: "justify-between min-w-0", title: "Text color", children: [
          t != null && t.color ? /* @__PURE__ */ h("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: t.color } }) : /* @__PURE__ */ h(Po, {}),
          /* @__PURE__ */ h(fn, { className: "w-3 h-3 text-zinc-500" })
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
              children: /* @__PURE__ */ h(Po, { className: "w-3.5 h-3.5" })
            }
          ),
          Ef.map((b) => /* @__PURE__ */ h(
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
    (o || s || l) && /* @__PURE__ */ C(st, { children: [
      g,
      /* @__PURE__ */ C("div", { className: m, children: [
        o && /* @__PURE__ */ h(Mf, { value: o.value || "Helvetica", mixed: o.mixed, disabled: e, onChange: o.onChange }),
        s,
        l && /* @__PURE__ */ h(An, { content: "Clear formatting", children: /* @__PURE__ */ h(
          Mt,
          {
            theme: "dark",
            "aria-label": "Clear formatting",
            disabled: e,
            onMouseDown: (b) => b.preventDefault(),
            onClick: () => d("clearFormatting"),
            style: { ...f.toggle, padding: 0 },
            className: "justify-center",
            children: /* @__PURE__ */ h(_l, { className: "w-3 h-3" })
          }
        ) })
      ] })
    ] }),
    i && /* @__PURE__ */ C(st, { children: [
      g,
      /* @__PURE__ */ h("div", { className: m, children: i })
    ] })
  ] });
};
function Vi(n, e, t) {
  return Math.max(e, Math.min(t, n));
}
function Af(n, e, t, r, i) {
  return Vi(n + e * i, t, r);
}
const If = 2;
function $f(n, e, t, r, i) {
  return Vi(n + Math.trunc(e / If) * i, t, r);
}
const zf = 3;
function Vh({
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
  const [p, m] = re(null), [g, b] = re(!1), x = w(!1), I = w(null), M = w(null), N = w(null), k = Oe(), R = gs(), _ = a === void 0;
  se(() => () => {
    var E;
    return (E = I.current) == null ? void 0 : E.call(I);
  }, []), dt(() => {
    const E = N.current, q = M.current;
    !_ && E && q && (q.style.color = getComputedStyle(E).color);
  }, [_, a]), se(() => {
    x.current || m(null);
  }, [n]);
  const L = n ?? r, A = p !== null ? p : n != null ? String(n) : d ? "" : String(r), W = (E) => Vi(E, e, t), S = (E) => {
    const q = Af(L, E, e, t, o);
    q !== L && (x.current && m(String(q)), i(q));
  }, $ = (E) => {
    if (l || s || E.pointerType !== "mouse" || E.button !== 0) return;
    const q = E.currentTarget, H = E.clientY, T = L;
    let Me = T, ye = !1;
    const me = (X) => {
      const ae = H - X.clientY;
      if (!ye) {
        if (Math.abs(ae) < zf) return;
        ye = !0, q.blur(), q.style.userSelect = "none";
      }
      const j = $f(T, ae, e, t, o);
      j !== Me && (Me = j, i(j));
    }, he = () => {
      I.current = null, window.removeEventListener("pointermove", me), window.removeEventListener("pointerup", he), window.removeEventListener("pointercancel", he), q.style.userSelect = "", ye && q.blur();
    };
    I.current = he, window.addEventListener("pointermove", me), window.addEventListener("pointerup", he), window.addEventListener("pointercancel", he);
  }, O = (E) => ({
    type: "button",
    tabIndex: -1,
    "aria-label": E === 1 ? "Increase" : "Decrease",
    disabled: !!l || !!s || (E === 1 ? L >= t : L <= e),
    onPointerDown: (q) => q.preventDefault(),
    onClick: () => S(E)
  }), F = _ ? P(22, 30, k) : P(16, 22, k), Y = _ ? P(14, 18, k) : P(11, 15, k);
  return /* @__PURE__ */ C(
    "span",
    {
      ref: M,
      className: `ui-number ${_ ? "ui-number-box" : ""}`,
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
            value: A,
            readOnly: s,
            disabled: l,
            className: a ?? "ui-input w-20",
            style: {
              ..._ ? { ...R, minHeight: P(28, 36, k) } : {},
              paddingRight: F + 2,
              cursor: l || s ? void 0 : g ? "text" : "ns-resize"
            },
            onFocus: () => {
              x.current = !0, b(!0);
            },
            onChange: (E) => {
              const q = E.target.value;
              m(q);
              const H = parseInt(q, 10);
              q !== "" && !Number.isNaN(H) && i(W(H));
            },
            onBlur: () => {
              if (x.current = !1, b(!1), p === null) return;
              const E = parseInt(p, 10);
              Number.isNaN(E) || i(W(E)), m(null);
            },
            onKeyDown: (E) => {
              E.key === "Enter" && E.target.blur(), E.key === "Escape" && (m(null), E.target.blur()), !s && !l && (E.key === "ArrowUp" || E.key === "ArrowDown") && (E.preventDefault(), S(E.key === "ArrowUp" ? 1 : -1));
            },
            onPointerDown: $
          }
        ),
        /* @__PURE__ */ C("span", { className: "ui-number-steppers", style: { width: F }, children: [
          /* @__PURE__ */ h("button", { ...O(1), className: "ui-number-step", children: /* @__PURE__ */ h(Wl, { style: { width: Y, height: Y } }) }),
          /* @__PURE__ */ h("button", { ...O(-1), className: "ui-number-step", children: /* @__PURE__ */ h(fn, { style: { width: Y, height: Y } }) })
        ] })
      ]
    }
  );
}
function Yh({ title: n, icon: e, count: t, tone: r = "default", collapsed: i, onToggle: o, trailing: s, bodyClass: l, className: c = "", dataProps: a, children: u }) {
  const d = Oe(), f = hn({ px: 12, py: 8, fs: 12 }, { px: 14, py: 12, fs: 14 }), p = P(14, 16, d), m = { width: p, height: p }, g = P(10, 12, d);
  return /* @__PURE__ */ C("div", { ...a, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${c}`, children: [
    /* @__PURE__ */ C("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1 bg-[var(--ui-card-header-bg)] text-[color:var(--ui-card-header-text)] hover:bg-[var(--ui-card-header-hover)] transition-colors", style: f, children: [
      /* @__PURE__ */ C(
        "button",
        {
          type: "button",
          onClick: o,
          className: "flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer",
          children: [
            i ? /* @__PURE__ */ h(Er, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: m }) : /* @__PURE__ */ h(fn, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: m }),
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
function Yi({
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
  const u = w(null), d = w(null), [f, p] = re(null), m = (k) => {
    u.current = k, typeof o == "function" ? o(k) : o && (o.current = k);
  };
  dt(() => {
    if (n) return;
    const k = u.current;
    if (!k || (d.current = k.getBoundingClientRect().width, typeof ResizeObserver > "u")) return;
    const R = new ResizeObserver(() => {
      d.current = k.getBoundingClientRect().width;
    });
    return R.observe(k), () => R.disconnect();
  }, [n]), dt(() => {
    if (!n || e !== "auto") {
      p(null);
      return;
    }
    p(d.current);
    const k = requestAnimationFrame(() => p(null));
    return () => cancelAnimationFrame(k);
  }, [n, e]);
  const [g, b] = re(!1), [x, I] = re(null), M = w(!1);
  dt(() => {
    if (n) {
      M.current = !0, b(!1), I(null);
      return;
    }
    if (!M.current || e !== "auto") return;
    M.current = !1, b(!0);
    let k = 0, R = 0;
    return (() => {
      var W;
      const L = (W = u.current) == null ? void 0 : W.firstElementChild, A = (L == null ? void 0 : L.getBoundingClientRect().width) ?? 0;
      A > 0 ? (k = requestAnimationFrame(() => I(A)), R = window.setTimeout(() => {
        b(!1), I(null);
      }, pn + 30)) : b(!1);
    })(), () => {
      cancelAnimationFrame(k), window.clearTimeout(R);
    };
  }, [n, e]);
  const N = n ? f ?? t : g ? x ?? t : e === "auto" ? "auto" : e;
  return /* @__PURE__ */ C(
    "div",
    {
      ...a,
      ref: m,
      className: `relative inline-flex ${s ? "shrink-0" : ""} ${l}`,
      style: {
        ...c,
        width: N,
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
function Df({
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
  onCancel: M,
  cancelOnEscape: N = !1,
  cancelOnOutside: k = !1,
  className: R = "",
  "aria-label": _
}) {
  const [L, A] = re(p), W = w(L);
  W.current = L;
  const S = w(null), $ = w(null), O = w(null), F = Ko(), Y = Oe(), E = P(9, 13, Y), q = ee((K) => {
    W.current !== K && (W.current = K, A(K), m == null || m(K));
  }, [m]), H = ee((K = !1) => {
    var Z;
    q(!1), (Z = $.current) == null || Z.blur(), K && requestAnimationFrame(() => {
      var te;
      return (te = O.current) == null ? void 0 : te.focus();
    });
  }, [q]), T = ee(() => {
    q(!0), requestAnimationFrame(() => {
      const K = $.current;
      if (!K) return;
      K.focus();
      const Z = K.value.length;
      K.setSelectionRange(Z, Z);
    });
  }, [q]);
  se(() => {
    p && T();
  }, [p, T]), se(() => {
    var te;
    if (!L) return;
    const K = ((te = S.current) == null ? void 0 : te.ownerDocument) ?? document, Z = (V) => {
      var de;
      const ne = V.target;
      ne && ((de = S.current) != null && de.contains(ne) || (k && (M == null || M()), H()));
    };
    return K.addEventListener("pointerdown", Z, !0), () => K.removeEventListener("pointerdown", Z, !0);
  }, [L, H, k, M]);
  const Me = ee((K) => {
    var te;
    if (!L) return;
    const Z = K.relatedTarget;
    Z && ((te = S.current) != null && te.contains(Z)) || (k && (M == null || M()), H());
  }, [L, H, k, M]), ye = ee((K) => {
    if (K.key === "Enter") {
      K.preventDefault(), I == null || I(n), H(!0);
      return;
    }
    K.key === "Escape" && (K.preventDefault(), K.stopPropagation(), N ? M == null || M() : e(""), H(!0));
  }, [e, H, N, M, I, n]), me = b === void 0 ? r ?? /* @__PURE__ */ h(xn, { className: "w-3.5 h-3.5" }) : b, ae = 8 + (((g == null ? void 0 : g.length) || 0) + (x && n ? 1 : 0)) * (F.box + 2), j = (K) => /* @__PURE__ */ h(
    "span",
    {
      style: { width: F.icon, height: F.icon },
      className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
      children: K
    }
  );
  return /* @__PURE__ */ h(
    Yi,
    {
      expanded: L,
      collapsedWidth: o,
      expandedWidth: s,
      rootRef: S,
      shrink: !0,
      "data-morph-search": !0,
      "data-theme": d,
      "data-expanded": L ? "true" : "false",
      className: R,
      onBlur: Me,
      trigger: /* @__PURE__ */ h(
        Mt,
        {
          ref: O,
          type: "button",
          variant: l,
          size: "minimal",
          theme: d,
          icon: r ?? /* @__PURE__ */ h(xn, { className: "w-3.5 h-3.5" }),
          collapse: c,
          iconWithLabel: a,
          revealOnHover: u,
          active: f,
          onClick: T,
          className: `${c ? "w-auto" : "w-full"} justify-start ${L ? "pointer-events-none" : ""}`,
          tabIndex: L ? -1 : 0,
          "aria-expanded": L,
          "aria-label": _ || t,
          "data-morph-search-trigger": !0,
          children: /* @__PURE__ */ h("span", { className: `min-w-0 ${c ? "" : "truncate"}`, children: t })
        }
      ),
      field: /* @__PURE__ */ C(st, { children: [
        me && /* @__PURE__ */ h(
          "span",
          {
            className: "ui-icon absolute top-1/2 -translate-y-1/2 pointer-events-none",
            style: { left: E, width: F.icon, height: F.icon },
            children: j(me)
          }
        ),
        /* @__PURE__ */ h(
          "input",
          {
            ref: $,
            value: n,
            onChange: (K) => e(K.target.value),
            onKeyDown: ye,
            placeholder: i,
            "aria-label": _ || i,
            tabIndex: L ? 0 : -1,
            "data-morph-search-input": !0,
            style: { paddingLeft: me ? E + F.icon + 6 : 10, paddingRight: ae },
            className: `${Ar("sm")} w-full`
          }
        ),
        /* @__PURE__ */ C("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
          g == null ? void 0 : g.map((K) => /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              "aria-label": K.label,
              title: K.label,
              tabIndex: L ? 0 : -1,
              onMouseDown: (Z) => Z.preventDefault(),
              onClick: () => {
                K.onClick(n, { close: () => H(!0) }), K.keepOpen || H(!0);
              },
              style: { width: F.box, height: F.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-action": K.key,
              children: j(K.icon)
            },
            K.key
          )),
          x && n && /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              "aria-label": "Clear",
              tabIndex: L ? 0 : -1,
              onClick: () => {
                e(""), requestAnimationFrame(() => {
                  var K;
                  return (K = $.current) == null ? void 0 : K.focus();
                });
              },
              style: { width: F.box, height: F.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-clear": !0,
              children: /* @__PURE__ */ h(Sn, { size: F.icon })
            }
          )
        ] })
      ] })
    }
  );
}
function Uh({
  triggerLabel: n,
  triggerIcon: e = /* @__PURE__ */ h(Fr, { className: "w-3.5 h-3.5" }),
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
      icon: /* @__PURE__ */ h(lr, { className: "w-3.5 h-3.5" }),
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
    Df,
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
function Pf(n) {
  return n.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
}
function Lf(n, e, t) {
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
function Rl(n, e, t) {
  const r = Pf(t), i = r.length > 0, o = new Map(e.map((a) => [a.key, a])), s = [];
  for (const a of n) {
    const { matched: u, detail: d } = Lf(a, a.group ? o.get(a.group) : void 0, r);
    u && s.push({ item: a, detail: d });
  }
  const l = new Set(s.map((a) => a.item.group).filter(Boolean)), c = i ? e.filter((a) => l.has(a.key) || a.label.toLowerCase().includes(t.trim().toLowerCase())) : e;
  return { hits: s, visibleGroups: c, hasQuery: i };
}
function Of(n) {
  var u;
  const { hits: e, visibleGroups: t, hasQuery: r } = Rl(n.items, n.groups, n.query), i = [];
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
function Bf({
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
  selectedId: x,
  autoFocus: I = !0,
  collapsedWidth: M = 128,
  expandedWidth: N = 288,
  panelWidth: k,
  panelMinWidth: R,
  keepAllRows: _ = !1,
  maxMenuHeight: L = 420,
  theme: A = "light",
  morph: W = !0,
  emptyTitle: S,
  emptyHint: $,
  renderEmpty: O,
  emptyActions: F,
  leadingActions: Y,
  hideLeadingOnEmpty: E = !1,
  footerActions: q,
  fieldActions: H,
  multiple: T,
  open: Me,
  onOpenChange: ye,
  hideTrigger: me = !1,
  anchorRef: he,
  portalTarget: X,
  renderTrigger: ae,
  renderItem: j,
  highlightOnOpen: K = !0,
  ref: Z
}) {
  const te = s !== void 0, [V, ne] = re(""), de = te ? s : V, Se = ee((y) => {
    te || ne(y), l == null || l(y);
  }, [te, l]), tt = Me !== void 0, [nt, ze] = re(!1), ue = tt ? Me : nt, Ie = ee((y) => {
    tt || ze(y), ye == null || ye(y);
  }, [tt, ye]), [ge, _e] = re(t === "inline"), je = Qe(() => e.map((y) => y.key).join("\0"), [e]), Le = Qe(() => new Set(je ? je.split("\0") : []), [je]), [rt, ke] = re(() => m ? Le : /* @__PURE__ */ new Set()), [Be, At] = re(0), He = w(!1), It = w(null), We = ee((y, D = "keyboard") => {
    He.current = D === "pointer", At(y);
  }, []), yt = w(null), xt = w(null), Nt = w(null), Ge = w(null), Tt = w(null), Ct = w(0), ut = Si(), Ht = _n(), Ae = Wr(), lt = $i(), Et = as(), it = Ko(), $t = 8 + (((H == null ? void 0 : H.length) || 0) + (de ? 1 : 0)) * (it.box + 2), [ft, z] = re({ top: 0, left: 0, maxH: 288, ready: !1 }), [U, pe] = re(0);
  Xo({
    anchorRef: he ?? yt,
    panelRef: Ge,
    open: ue,
    maxHeight: L,
    anchorRectRef: Tt,
    onPosition: (y) => z({ top: y.top, left: y.left, maxH: y.maxH, ready: y.ready })
  }), se(() => {
    const y = (he == null ? void 0 : he.current) ?? yt.current;
    !ue || !y || pe(y.getBoundingClientRect().width);
  }, [ue, ge, he]);
  const [Ve, Ye] = re(!1);
  se(() => {
    ue && Ye(!0);
  }, [ue]);
  const bt = jr({
    visible: ue,
    morph: W,
    anchor: () => {
      var y;
      return ((y = (he == null ? void 0 : he.current) ?? yt.current) == null ? void 0 : y.getBoundingClientRect()) ?? null;
    },
    ref: Ge,
    cloneOnUnmount: !0,
    onClosed: () => Ye(!1)
  }), vt = (F || []).map(
    (y) => typeof y.label == "function" ? y.label(de) : y.label
  ), v = Qe(
    () => Of({
      items: n,
      groups: e,
      /* show-all mode: the query only moves the highlight, every option stays
         in the list (the old I/E + D/N autocomplete contract). */
      query: _ ? "" : de,
      browseGroups: f || m || p,
      browseAll: b,
      expandedGroups: rt,
      emptyActionLabels: vt
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [n, e, de, _, f, m, p, b, rt, vt.join("\0")]
  ), G = Qe(
    () => (Y || []).map((y, D) => ({
      kind: "action",
      label: typeof y.label == "function" ? y.label(de) : y.label,
      actionIndex: D,
      source: "leading"
    })),
    [Y, de]
  ), ie = Qe(
    () => (q || []).map((y, D) => ({
      kind: "action",
      label: typeof y.label == "function" ? y.label(de) : y.label,
      actionIndex: D,
      source: "footer"
    })),
    [q, de]
  ), be = v.some((y) => y.kind === "empty"), we = G.length > 0 && !(E && be), xe = we ? G.length : 0, Ne = Qe(
    () => [...we ? G : [], ...v, ...ie],
    [we, G, v, ie]
  ), Ce = !!a || p && !de.trim(), Fe = Qe(
    () => Ne.map((y, D) => ({ row: y, index: D })).filter((y) => !(y.row.kind === "empty" || y.row.kind === "item" && y.row.hidden || y.row.kind === "group" && !Ce)),
    [Ne, Ce]
  ), _t = (p || m) && !de.trim(), Ee = !!T, on = Qe(
    () => n.filter((y) => y.checkable !== !1).map((y) => y.id),
    [n]
  ), ht = Qe(() => de.trim() ? Rl(n, e, de).hits.filter((y) => y.item.checkable !== !1).map((y) => y.item.id) : on, [n, e, de, on]), wt = Qe(() => new Set(ht), [ht]), Te = ns({
    mode: (T == null ? void 0 : T.mode) ?? "draft",
    selectedIds: (T == null ? void 0 : T.selectedIds) ?? is,
    itemIds: on,
    visibleIds: ht,
    max: T == null ? void 0 : T.max,
    disabledIds: T == null ? void 0 : T.disabledIds,
    indicator: T == null ? void 0 : T.indicator,
    onCommit: T == null ? void 0 : T.onCommit,
    onDraftChange: T == null ? void 0 : T.onDraftChange,
    onToggle: T == null ? void 0 : T.onToggle
  }), Xt = w(Te.reset);
  Xt.current = Te.reset;
  const Wn = typeof (T == null ? void 0 : T.commitLabel) == "function" ? T.commitLabel(Te.count) : (T == null ? void 0 : T.commitLabel) ?? `Select ${Te.count}`, Xe = ee(() => {
    var y;
    Ie(!1), t === "expandable" && ((y = xt.current) == null || y.blur(), _e(!1), requestAnimationFrame(() => {
      var D;
      return (D = Nt.current) == null ? void 0 : D.focus();
    })), tt || Se(""), We(0), ke(m ? Le : /* @__PURE__ */ new Set()), u == null || u();
  }, [t, u, Se, m, Le, tt, Ie]);
  se(() => {
    if (de.trim() || !m) {
      ke((y) => y.size ? /* @__PURE__ */ new Set() : y);
      return;
    }
    ke((y) => y.size === Le.size && [...Le].every((D) => y.has(D)) ? y : Le);
  }, [de, m, Le]);
  const Qt = w(!1);
  se(() => {
    if (!ue) {
      Qt.current = !1;
      return;
    }
    if (Qt.current || !p || de.trim()) return;
    const y = x ? [x] : [...(T == null ? void 0 : T.selectedIds) ?? []], D = new Set(y), Q = D.size ? e.filter((fe) => n.some((Re) => Re.group === fe.key && D.has(Re.id))).map((fe) => fe.key) : [];
    if (Q.length === 0) {
      Qt.current = !0;
      return;
    }
    const oe = g === "single" ? Q.slice(0, 1) : Q;
    if (!oe.every((fe) => rt.has(fe))) {
      ke(new Set(oe));
      return;
    }
    if (K && x) {
      const fe = Ne.findIndex((Re) => Re.kind === "item" && Re.hit.item.id === x);
      fe >= 0 && We(fe);
    }
    Qt.current = !0;
  }, [ue, p, de, e, n, x, T == null ? void 0 : T.selectedIds, g, rt, Ne, K, We]);
  const Pt = ee((y) => {
    ke((D) => {
      const Q = new Set(D);
      return Q.has(y) ? Q.delete(y) : (g === "single" && Q.clear(), Q.add(y)), Q;
    });
  }, [g]), jt = ee(() => {
    var D;
    if (ue) {
      (D = xt.current) == null || D.focus();
      return;
    }
    if (Xt.current(), t === "expandable" && !ge) {
      const Q = yt.current;
      if (Q) {
        const oe = Q.style.transition, fe = Q.style.width;
        Q.style.transition = "none", Q.style.width = `${N}px`;
        const Re = Q.getBoundingClientRect();
        Tt.current = { left: Re.left, top: Re.top, width: Re.width, height: Re.height }, Q.style.width = fe, Q.offsetWidth, Q.style.transition = oe, window.clearTimeout(Ct.current), Ct.current = window.setTimeout(() => {
          Tt.current = null;
        }, pn + 80);
      }
    }
    _e(!0), Ie(!0);
    const y = x ? v.findIndex((Q) => Q.kind === "item" && Q.hit.item.id === x) : -1;
    We(y >= 0 ? xe + y : K ? xe : -1);
  }, [ue, t, ge, N, xe, v, x, K]);
  se(() => () => {
    window.clearTimeout(Ct.current), Tt.current = null;
  }, []), se(() => {
    ue || (It.current = null);
  }, [ue]), se(() => {
    if (t !== "expandable" || !ge || !ue || !I) return;
    const y = requestAnimationFrame(() => {
      var D;
      return (D = xt.current) == null ? void 0 : D.focus();
    });
    return () => cancelAnimationFrame(y);
  }, [t, ge, ue, I]), se(() => {
    var Q;
    if (!ue) return;
    const y = ((Q = yt.current) == null ? void 0 : Q.ownerDocument) ?? ut;
    if (!y) return;
    const D = (oe) => {
      var Re, Zt, Wt, en;
      const fe = ((Re = oe.composedPath) == null ? void 0 : Re.call(oe)[0]) ?? oe.target;
      !fe || typeof fe.nodeType != "number" || (Zt = yt.current) != null && Zt.contains(fe) || (Wt = Ge.current) != null && Wt.contains(fe) || (en = he == null ? void 0 : he.current) != null && en.contains(fe) || Xe();
    };
    return y.addEventListener("pointerdown", D, !0), () => y.removeEventListener("pointerdown", D, !0);
  }, [ue, Xe, ut, he]);
  const Vt = ee((y) => {
    var D;
    if (y.kind === "item" ? It.current = y.hit.item.id : (y.kind === "group" || y.kind === "action") && (It.current = null), y.kind === "group") {
      if (Ee) {
        const Q = (D = T == null ? void 0 : T.groupToken) == null ? void 0 : D.call(T, y.group.key);
        if (Q) {
          Te.canToggle(Q) && Te.toggle(Q);
          return;
        }
        const oe = n.filter((fe) => fe.group === y.group.key && fe.checkable !== !1 && wt.has(fe.id) && !Te.isDisabled(fe.id)).map((fe) => fe.id);
        oe.length && Te.toggleGroup(oe);
        return;
      }
      a ? (a(y.group), d && Xe()) : Ce && Pt(y.group.key);
      return;
    }
    if (y.kind === "item") {
      if (Ee) {
        Te.canToggle(y.hit.item.id) && Te.toggle(y.hit.item.id);
        return;
      }
      c(y.hit.item), d && Xe();
      return;
    }
    if (y.kind === "action") {
      const Q = y.source === "leading" ? Y : y.source === "footer" ? q : F, oe = Q == null ? void 0 : Q[y.actionIndex];
      oe && oe.onClick(de), d && Xe();
    }
  }, [Xe, d, F, q, Ce, n, Y, T, Ee, c, a, de, Te, Pt, wt]), mt = (y) => {
    if (Fe.length === 0) return;
    let D = Be;
    if (D < 0 && It.current) {
      const fe = Fe.find(
        (Re) => Re.row.kind === "item" && Re.row.hit.item.id === It.current
      );
      fe && (D = fe.index);
    }
    const Q = Fe.findIndex((fe) => fe.index === D), oe = Q < 0 ? 0 : (Q + y + Fe.length) % Fe.length;
    We(Fe[oe].index);
  };
  Bo(Z, () => ({
    moveHighlight: mt,
    activateHighlighted: () => {
      if (He.current) return !1;
      const y = Be >= 0 ? Ne[Be] : void 0;
      return y ? (Vt(y), We(-1, "keyboard"), !0) : !1;
    },
    close: Xe,
    selectAll: () => {
      Ee && Te.setAll(!0);
    },
    setSelection: (y) => {
      Te.reset(y);
    }
  }), [Ne, Be, Vt, Xe, Ee, Te]);
  const sn = (y) => {
    if (Ee && (y.metaKey || y.ctrlKey) && y.key.toLowerCase() === "a") {
      y.preventDefault(), y.stopPropagation(), Te.setAll(!0);
      return;
    }
    if (y.key === "ArrowDown")
      y.preventDefault(), ue ? mt(1) : jt();
    else if (y.key === "ArrowUp")
      y.preventDefault(), mt(-1);
    else if ((y.key === "ArrowRight" || y.key === "ArrowLeft") && p && ue && !de.trim()) {
      const D = Ne[Be];
      if ((D == null ? void 0 : D.kind) === "group") {
        const Q = rt.has(D.group.key);
        (y.key === "ArrowRight" || Q) && (y.preventDefault(), Pt(D.group.key));
      } else if ((D == null ? void 0 : D.kind) === "item" && y.key === "ArrowLeft" && D.hit.item.group) {
        y.preventDefault();
        const Q = D.hit.item.group;
        rt.has(Q) && Pt(Q);
        const oe = Ne.findIndex((fe) => fe.kind === "group" && fe.group.key === Q);
        oe >= 0 && We(oe);
      }
    } else if (y.key === "Enter") {
      y.preventDefault();
      const D = Ne[Be] ?? Ne[0];
      D && Vt(D);
    } else y.key === "Escape" && (y.preventDefault(), Xe());
  }, En = (y) => {
    t === "expandable" && !ge || (Se(y), ue || Ie(!0));
  };
  se(() => {
    if (_) {
      const D = de.trim().toLowerCase();
      if (!D) {
        const oe = x ? v.findIndex((fe) => fe.kind === "item" && fe.hit.item.id === x) : -1;
        We(oe >= 0 ? xe + oe : -1);
        return;
      }
      const Q = v.findIndex((oe) => oe.kind === "item" && oe.hit.item.label.toLowerCase().includes(D));
      We(Q >= 0 ? xe + Q : -1);
      return;
    }
    if (tt) {
      const D = de.trim().toLowerCase();
      if (!!D && n.some((oe) => oe.id.toLowerCase() === D || oe.label.toLowerCase() === D)) {
        We(-1);
        return;
      }
      if (!Ee) {
        const oe = v.findIndex((fe) => fe.kind === "item" && fe.hit.item.tone !== "create");
        if (oe >= 0) {
          We(xe + oe);
          return;
        }
      }
    }
    const y = v.findIndex((D) => D.kind === "item");
    We(y >= 0 ? xe + y : xe);
  }, [de]), se(() => {
    if (!ue || de.trim()) return;
    const y = x ? v.findIndex((D) => D.kind === "item" && D.hit.item.id === x) : -1;
    We(y >= 0 ? xe + y : K ? xe : -1);
  }, [ue]), dt(() => {
    ue && Xt.current();
  }, [ue]);
  const qn = (y) => /* @__PURE__ */ C("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
    H == null ? void 0 : H.map((D) => /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        "aria-label": D.label,
        title: D.label,
        tabIndex: ge ? 0 : -1,
        onMouseDown: (Q) => Q.preventDefault(),
        onClick: () => {
          D.onClick(de, { close: Xe }), D.keepOpen || Xe();
        },
        style: { width: it.box, height: it.box },
        className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
        "data-search-field-action": D.key,
        children: /* @__PURE__ */ h(
          "span",
          {
            style: { width: it.icon, height: it.icon },
            className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
            children: D.icon
          }
        )
      },
      D.key
    )),
    de && /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        "aria-label": "Clear search",
        tabIndex: ge ? 0 : -1,
        onPointerDown: (D) => D.preventDefault(),
        onClick: y,
        style: { width: it.box, height: it.box },
        className: "ui-icon-btn flex items-center justify-center rounded",
        children: /* @__PURE__ */ h(Sn, { size: it.icon })
      }
    )
  ] }), Xr = /* @__PURE__ */ C("div", { className: "relative w-full", children: [
    /* @__PURE__ */ h(xn, { size: it.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ h(
      "input",
      {
        ref: xt,
        value: de,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": ue,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (y) => En(y.target.value),
        onFocus: () => {
          f && jt();
        },
        onClick: () => {
          f && jt();
        },
        onKeyDown: sn,
        placeholder: o,
        style: { paddingRight: $t },
        className: `${Ar("sm")} w-full pl-8`
      }
    ),
    qn(() => {
      Se(""), ue || jt();
    })
  ] }), Kn = /* @__PURE__ */ C("div", { className: "absolute inset-0", children: [
    /* @__PURE__ */ h(xn, { size: it.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ h(
      "input",
      {
        ref: xt,
        value: de,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": ue,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (y) => En(y.target.value),
        onFocus: () => {
          f && ge && jt();
        },
        onClick: () => {
          f && ge && jt();
        },
        onKeyDown: sn,
        placeholder: o,
        tabIndex: ge ? 0 : -1,
        style: { paddingRight: $t },
        className: `${Ar("sm")} h-full w-full pl-8`
      }
    ),
    qn(() => {
      Se(""), !ue && ge && jt();
    })
  ] });
  se(() => {
    if (!ue || He.current) return;
    const y = Ge.current;
    mn(
      y == null ? void 0 : y.querySelector(`[data-search-row="${Be}"]`),
      "nearest",
      (y == null ? void 0 : y.querySelector("[data-search-scroller]")) ?? null
    );
  }, [ue, Be]);
  const Jn = w(v);
  Jn.current = v;
  const dr = w(x);
  dr.current = x;
  const Vn = w(T == null ? void 0 : T.selectedIds);
  Vn.current = T == null ? void 0 : T.selectedIds;
  const Yn = ts({
    open: ue,
    block: "center",
    ready: ft.ready,
    scroller: () => {
      var y;
      return ((y = Ge.current) == null ? void 0 : y.querySelector("[data-search-scroller]")) ?? null;
    },
    row: () => {
      var Q;
      let y = -1;
      const D = dr.current;
      if (D)
        y = Jn.current.findIndex((oe) => oe.kind === "item" && oe.hit.item.id === D);
      else {
        const oe = Vn.current;
        if (oe && oe.length) {
          const fe = new Set(oe);
          y = Jn.current.findIndex((Re) => Re.kind === "item" && fe.has(Re.hit.item.id));
        }
      }
      return y < 0 ? null : ((Q = Ge.current) == null ? void 0 : Q.querySelector(`[data-search-row="${y}"]`)) ?? null;
    }
  }), ln = (y, D) => {
    const Q = Be === D, oe = !Ee && x !== void 0 && y.hit.item.id === x, fe = Ee ? Te.isSelected(y.hit.item.id) : oe, Re = !!y.hit.item.disabled || Ee && !Te.canToggle(y.hit.item.id), Zt = y.hit.item.tone === "create" ? A === "light" ? { background: Q ? "#d1fae5" : "#ecfdf5", color: Q ? "#065f46" : "#047857" } : { background: Q ? "rgba(6, 95, 70, 0.7)" : "rgba(6, 78, 59, 0.4)", color: Q ? "#d1fae5" : "#6ee7b7" } : void 0;
    return /* @__PURE__ */ C(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": fe,
        tabIndex: -1,
        "data-search-item": y.hit.item.id,
        "data-search-row": D,
        "data-search-create": y.hit.item.tone === "create" ? "" : void 0,
        onMouseDown: (Wt) => Wt.preventDefault(),
        onMouseEnter: () => We(D, "pointer"),
        onClick: () => Vt(y),
        style: { ...lt, ...y.hit.item.rowStyle, ...Zt },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${Ae.itemDefault} ${y.hit.item.rowClassName ?? ""} ${oe ? "ui-item-selected" : ""} ${Q ? "ui-item-highlighted" : ""} ${Re ? "opacity-30 pointer-events-none" : ""}`,
        children: [
          Ee && y.hit.item.checkable !== !1 && /* @__PURE__ */ h(Rr, { checked: fe, disabled: Re, indicator: T == null ? void 0 : T.indicator }),
          j ? /* @__PURE__ */ h("span", { className: "flex min-w-0 flex-1 items-center gap-2", children: j(y.hit.item, { checked: fe, disabled: Re }) }) : /* @__PURE__ */ C(st, { children: [
            y.hit.item.icon && /* @__PURE__ */ h("span", { className: `${Ae.icon} shrink-0`, children: y.hit.item.icon }),
            /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: y.hit.item.label }),
            (y.hit.detail || y.hit.item.detail) && /* @__PURE__ */ h("span", { className: "shrink-0 max-w-[55%] truncate text-[10px] text-zinc-400", children: y.hit.detail || y.hit.item.detail }),
            oe && /* @__PURE__ */ h(lr, { className: "ui-icon w-3.5 h-3.5 shrink-0", "aria-hidden": !0 })
          ] })
        ]
      },
      `item:${y.hit.item.id}`
    );
  }, B = (y, D) => {
    var eo;
    const Q = rt.has(y.group.key), oe = p && !de.trim(), fe = Ce, Re = fe && Be === D, Zt = Ee ? n.filter((Ue) => Ue.group === y.group.key && wt.has(Ue.id) && Ue.checkable !== !1) : [], Wt = Zt.filter((Ue) => !Te.isDisabled(Ue.id)).map((Ue) => Ue.id), en = Ee ? (eo = T == null ? void 0 : T.groupToken) == null ? void 0 : eo.call(T, y.group.key) : void 0, Gi = !!en && Te.isSelected(en), Xi = Gi ? "all" : Wt.length > 0 ? Te.groupState(Wt) : "none", Il = Gi ? Zt.length : Zt.reduce((Ue, $l) => Ue + (Te.isSelected($l.id) ? 1 : 0), 0), Qi = Ee && /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        tabIndex: -1,
        "aria-label": `Select all ${y.group.label}`,
        onMouseDown: (Ue) => Ue.preventDefault(),
        onClick: (Ue) => {
          Ue.stopPropagation(), en ? Te.toggle(en) : Wt.length && Te.toggleGroup(Wt);
        },
        className: `shrink-0 flex items-center justify-center rounded ${en || Wt.length ? "cursor-pointer" : "cursor-not-allowed"}`,
        children: /* @__PURE__ */ h(
          Rr,
          {
            checked: Xi === "all",
            indeterminate: Xi === "some",
            disabled: !en && Wt.length === 0,
            indicator: T == null ? void 0 : T.indicator
          }
        )
      }
    ), Zi = Ee ? /* @__PURE__ */ C("span", { className: `shrink-0 tabular-nums text-[10px] ${fe ? "text-[color:var(--ui-text-faint)]" : "opacity-70"}`, children: [
      Il,
      "/",
      Zt.length
    ] }) : y.group.count !== void 0 && /* @__PURE__ */ h("span", { className: `shrink-0 tabular-nums ${fe ? "text-[10px] text-[color:var(--ui-text-faint)]" : "opacity-70"}`, children: y.group.count });
    return fe ? /* @__PURE__ */ C(
      "div",
      {
        role: "option",
        "aria-selected": !1,
        "aria-expanded": oe ? Q : void 0,
        "data-search-group": y.group.key,
        onMouseDown: (Ue) => Ue.preventDefault(),
        onMouseEnter: () => We(D, "pointer"),
        onClick: () => {
          oe && Pt(y.group.key);
        },
        style: lt,
        className: `w-full rounded flex items-center gap-1 outline-none select-none font-medium ${Ae.itemDefault} ${Re ? "ui-item-highlighted" : ""}`,
        children: [
          Qi,
          /* @__PURE__ */ C(
            "button",
            {
              type: "button",
              tabIndex: -1,
              onMouseDown: (Ue) => Ue.preventDefault(),
              onClick: (Ue) => {
                Ue.stopPropagation(), Vt(y);
              },
              className: "flex w-auto min-w-0 max-w-full cursor-pointer items-center gap-2 text-left",
              children: [
                y.group.icon && /* @__PURE__ */ h("span", { className: `${Ae.icon} shrink-0`, children: y.group.icon }),
                /* @__PURE__ */ h("span", { className: "truncate", children: y.group.label })
              ]
            }
          ),
          /* @__PURE__ */ h("span", { className: "min-w-0 flex-1" }),
          Zi,
          oe && /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `${Q ? "Collapse" : "Expand"} ${y.group.label}`,
              "aria-expanded": Q,
              onMouseDown: (Ue) => Ue.preventDefault(),
              onClick: (Ue) => {
                Ue.stopPropagation(), Pt(y.group.key);
              },
              style: { width: it.box, height: it.box },
              className: "shrink-0 flex cursor-pointer items-center justify-center rounded text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text)]",
              children: /* @__PURE__ */ h(
                fn,
                {
                  size: it.icon,
                  className: `transition-transform duration-200 ${Q ? "rotate-180" : ""}`
                }
              )
            }
          )
        ]
      },
      `group:${y.group.key}`
    ) : /* @__PURE__ */ C(
      "div",
      {
        role: "presentation",
        "data-search-group": y.group.key,
        "data-search-row": D,
        style: Et,
        className: "w-full flex items-center gap-2 select-none font-semibold uppercase tracking-wider ui-label",
        children: [
          Qi,
          y.group.icon && /* @__PURE__ */ h("span", { className: `${Ae.icon} shrink-0`, children: y.group.icon }),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: y.group.label }),
          Zi
        ]
      },
      `group:${y.group.key}`
    );
  }, ce = (y, D) => {
    var fe;
    const Q = Be === D, oe = y.source === "leading" ? Y : y.source === "footer" ? q : F;
    return /* @__PURE__ */ C(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": !1,
        tabIndex: -1,
        "data-search-action": y.source || "empty",
        "data-search-row": D,
        onMouseDown: (Re) => Re.preventDefault(),
        onMouseEnter: () => We(D, "pointer"),
        onClick: () => Vt(y),
        style: lt,
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${Ae.itemDefault} ${Q ? "ui-item-highlighted" : ""}`,
        children: [
          /* @__PURE__ */ h("span", { className: `${Ae.icon} shrink-0`, children: ((fe = oe == null ? void 0 : oe[y.actionIndex]) == null ? void 0 : fe.icon) || /* @__PURE__ */ h(Fr, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: y.label })
        ]
      },
      `${y.source || "empty"}:${y.actionIndex}`
    );
  }, ve = () => /* @__PURE__ */ h("div", { className: "px-3 py-3 text-center", "data-search-empty": !0, children: O ? O({ query: de, close: Xe }) : /* @__PURE__ */ C(st, { children: [
    /* @__PURE__ */ h("div", { className: "mx-auto mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-400", children: /* @__PURE__ */ h(xn, { className: "w-3.5 h-3.5" }) }),
    /* @__PURE__ */ h("div", { className: "text-xs font-medium text-zinc-500", children: S || `No matches for “${de.trim()}”` }),
    /* @__PURE__ */ h("div", { className: "mt-0.5 text-[10px] text-zinc-400", children: $ || "Try a name, phone number, board ID or category." })
  ] }) }, "__empty"), qe = [];
  for (let y = 0; y < v.length; y++) {
    const D = v[y];
    if (D.kind === "group") {
      const Q = [];
      let oe = y + 1;
      for (; oe < v.length && v[oe].kind === "item" && v[oe].hit.item.group === D.group.key; )
        Q.push({ row: v[oe], index: oe }), oe++;
      qe.push({ group: D, index: y, items: Q }), y = oe - 1;
    } else D.kind === "item" ? qe.push({ row: D, index: y }) : qe.push({ row: D, index: y });
  }
  const De = ue || Ve ? Hr(
    /* @__PURE__ */ C(
      "div",
      {
        ref: bt,
        id: "search-menu-panel",
        "data-theme": A,
        role: "listbox",
        "aria-label": o,
        "aria-multiselectable": Ee ? !0 : void 0,
        onPointerEnter: Yn.engage,
        onPointerDown: (y) => {
          y.stopPropagation(), Yn.engage();
        },
        onMouseDown: (y) => y.stopPropagation(),
        onClick: (y) => y.stopPropagation(),
        onPointerLeave: () => {
          He.current && We(-1, "pointer");
        },
        className: "click-outside-ignore ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none min-w-0 overflow-hidden pointer-events-auto",
        style: {
          position: "fixed",
          left: ft.left,
          top: ft.top,
          width: k ?? (t === "expandable" ? N : U || void 0),
          minWidth: R,
          maxHeight: ft.maxH,
          visibility: ft.ready ? "visible" : "hidden"
        },
        children: [
          we && /* @__PURE__ */ C("div", { className: "shrink-0 pb-1", children: [
            G.map((y, D) => ce(y, D)),
            v.length > 0 && /* @__PURE__ */ h("div", { className: Ae.separator })
          ] }),
          /* @__PURE__ */ C("div", { "data-search-scroller": !0, className: "overflow-y-auto scrollbar-custom flex flex-col min-h-0", children: [
            v.length === 0 && /* @__PURE__ */ h("div", { className: "px-3 py-3 text-xs text-zinc-400", "data-search-empty": !0, children: O ? O({ query: de, close: Xe }) : /* @__PURE__ */ h(st, { children: "Type to search…" }) }),
            qe.map((y) => {
              if (y.group) {
                const oe = rt.has(y.group.group.key), fe = y.items || [];
                return /* @__PURE__ */ C(ot.Fragment, { children: [
                  B(y.group, xe + y.index),
                  _t && /* @__PURE__ */ h(
                    "div",
                    {
                      "data-search-group-items": y.group.group.key,
                      "aria-hidden": !oe,
                      className: "motion-reduce:transition-none",
                      style: {
                        display: "grid",
                        gridTemplateRows: oe ? "1fr" : "0fr",
                        opacity: oe ? 1 : 0,
                        transition: "grid-template-rows 220ms cubic-bezier(0.32, 0.72, 0, 1), opacity 150ms ease"
                      },
                      children: /* @__PURE__ */ h("div", { className: "overflow-hidden flex flex-col", children: fe.map((Re) => ln(Re.row, xe + Re.index)) })
                    }
                  ),
                  !_t && fe.map((Re) => ln(Re.row, xe + Re.index))
                ] }, `group:${y.group.group.key}`);
              }
              const D = y.row, Q = xe + y.index;
              return D.kind === "empty" ? ve() : D.kind === "action" ? ce(D, Q) : D.kind === "item" ? ln(D, Q) : null;
            })
          ] }),
          ie.length > 0 && /* @__PURE__ */ C("div", { className: "shrink-0", children: [
            /* @__PURE__ */ h("div", { className: Ae.separator }),
            ie.map((y, D) => ce(y, xe + v.length + D))
          ] }),
          Ee && (T == null ? void 0 : T.footer) !== !1 && /* @__PURE__ */ h(
            ls,
            {
              count: Te.count,
              max: T == null ? void 0 : T.max,
              hiddenCount: (T == null ? void 0 : T.hiddenNote) === !1 ? 0 : Te.hiddenCount,
              clear: (T == null ? void 0 : T.clear) !== !1,
              theme: A,
              onClear: Te.clear,
              hero: (T == null ? void 0 : T.mode) === "live" ? void 0 : {
                label: Wn,
                onClick: () => {
                  Te.commit(), Xe();
                },
                disabled: Te.count === 0
              }
            }
          )
        ]
      }
    ),
    X ?? Ht ?? (ut == null ? void 0 : ut.body) ?? document.body
  ) : null;
  return me ? /* @__PURE__ */ C(st, { children: [
    /* @__PURE__ */ h("div", { ref: yt, "data-search-menu": !0, "data-mode": "hidden", className: "hidden", "aria-hidden": !0 }),
    De
  ] }) : t === "inline" ? /* @__PURE__ */ C("div", { ref: yt, "data-search-menu": !0, "data-mode": t, className: "relative inline-flex", style: { width: "100%" }, children: [
    Xr,
    De
  ] }) : /* @__PURE__ */ h(
    Yi,
    {
      expanded: ge,
      collapsedWidth: M,
      expandedWidth: N,
      rootRef: yt,
      "data-search-menu": !0,
      "data-mode": t,
      trigger: ae ? ae({ open: ue, expanded: ge, toggle: jt }) : /* @__PURE__ */ h(
        Mt,
        {
          ref: Nt,
          type: "button",
          variant: "primary",
          size: "minimal",
          theme: A === "dark" ? "dark" : "light",
          icon: i ?? /* @__PURE__ */ h(xn, { className: "w-3.5 h-3.5" }),
          onClick: jt,
          className: `w-full justify-start ${ge ? "pointer-events-none" : ""}`,
          tabIndex: ge ? -1 : 0,
          "data-search-trigger": !0,
          children: /* @__PURE__ */ h("span", { children: r })
        }
      ),
      field: /* @__PURE__ */ C(st, { children: [
        Kn,
        De
      ] })
    }
  );
}
function kn(n, e = "id") {
  return e === "label" ? n.label : n.id;
}
function Al(n, e, t = "id") {
  const r = e.find((i) => kn(i, t) === n);
  return (r == null ? void 0 : r.label) || n;
}
function Ff(n) {
  return n.split(",").map((e) => e.trim()).filter(Boolean);
}
function Hf(n) {
  const e = n.split(",");
  return (e[e.length - 1] || "").trim();
}
function Ui(n, e, t = "id") {
  const r = n.trim();
  if (!r) return "";
  const i = e.find((l) => kn(l, t) === r);
  if (i) return kn(i, t);
  const o = r.toLowerCase(), s = e.find((l) => l.label.toLowerCase() === o);
  return s ? kn(s, t) : r;
}
function _f(n, e, t = "id") {
  const r = /* @__PURE__ */ new Set(), i = [];
  for (const o of Ff(n)) {
    const s = Ui(o, e, t);
    !s || r.has(s) || (r.add(s), i.push(s));
  }
  return i;
}
function jf(n, e, t = "id") {
  const r = n.split(",").map((l) => l.trim()).filter(Boolean), i = n.trimEnd().endsWith(",") ? r : r.slice(0, -1), o = /* @__PURE__ */ new Set(), s = [];
  for (const l of i) {
    const c = Ui(l, e, t);
    !c || o.has(c) || (o.add(c), s.push(c));
  }
  return s;
}
function Wf(n, e, t = "id") {
  const r = n.trim();
  if (!r) return !0;
  const i = r.toLowerCase();
  return e.some((o) => kn(o, t).toLowerCase() === i || o.label.toLowerCase() === i);
}
function qf(n, e, t = "id") {
  const r = new Set(e.map((i) => kn(i, t)));
  return n.filter((i) => !r.has(i));
}
function Lo(n, e, t, r, i) {
  return i ? i([...n], [...e]) : r === "count" ? n.length ? `${n.length} selected` : "" : r === "chips" ? "" : n.map((o) => Al(o, e, t)).join(", ");
}
const Kf = () => {
};
function Gh({
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
  disabled: M = !1,
  autoFocus: N = !1,
  defaultOpen: k = !1,
  selectAllOnOpen: R = !0,
  uppercase: _ = !1,
  allowFreeText: L = !0,
  theme: A,
  className: W = "",
  style: S,
  panelWidth: $,
  panelMinWidth: O,
  initialQuery: F,
  keepAllRows: Y = !1,
  maxMenuHeight: E,
  portalTarget: q,
  autoGrow: H = !1,
  skipComma: T = !1,
  collapsedWidth: Me = 140,
  expandedWidth: ye = 280,
  createLabel: me,
  onCreateItem: he,
  onExit: X,
  onEscape: ae,
  onTabExit: j,
  loadItems: K,
  emptyTitle: Z,
  emptyHint: te,
  sortItems: V,
  max: ne,
  disabledIds: de,
  indicator: Se,
  browse: tt,
  groupToken: nt
}) {
  const ze = Gt(), ue = A ?? (ze == null ? void 0 : ze.mode) ?? "light", Ie = Oe(), ge = ee((B) => kn(B, i), [i]), _e = Qe(() => t.map(ge), [t, ge]), je = Qe(() => new Map(t.map((B) => [ge(B), B])), [t, ge]), Le = ee((B) => Al(B, t, i), [t, i]), rt = Qe(() => new Set([...m ?? []].map((B) => B.toLowerCase())), [m]), [ke, Be] = re(!1), [At, He] = re(""), [It, We] = re(() => {
    const B = F ?? "";
    return _ ? B.toUpperCase() : B;
  }), [yt, xt] = re(It), [Nt, Ge] = re(() => [...n]), [Tt, Ct] = re(null), [ut, Ht] = re(!1), Ae = w(null), lt = w(null), Et = w(null), it = w(null), Dt = w(null), $t = w(n.join("\0")), ft = w(!1), z = w(/* @__PURE__ */ new Set()), U = w(!1), pe = w(!1), Ve = w(!1), Ye = w(0), bt = w(""), vt = w([...n]), v = n.join("\0"), G = Qe(
    () => Lo(n, t, i, l, c),
    [n, t, i, l, c]
  ), ie = ee((B) => {
    if (a) return a([...B], t);
    if (o === "single") return B[0] ? Le(B[0]) : "";
    const ce = B.map(Le).join(", ");
    return T ? ce : B.length ? `${ce}, ` : "";
  }, [a, t, o, Le, T]);
  se(() => {
    ke || (Ge([...n]), vt.current = [...n], $t.current = v);
  }, [v, ke]);
  const be = ee(() => {
    if (ke || x || M) return;
    ft.current = !1, U.current = !0;
    const B = ie(n);
    bt.current = B, vt.current = [...n], Ge([...n]), He(B), xt(It), We(""), Be(!0);
  }, [ke, x, M, n, ie, It]);
  dt(() => {
    if (!ke) return;
    const B = Ae.current ?? lt.current;
    B && (B.focus(), (B instanceof HTMLInputElement || B instanceof HTMLTextAreaElement) && (o === "single" && R ? B.setSelectionRange(0, B.value.length) : B.setSelectionRange(B.value.length, B.value.length)));
  }, [ke]), dt(() => {
    if (!Ve.current) return;
    Ve.current = !1;
    const B = Ae.current;
    B && (B.focus(), B.setSelectionRange(B.value.length, B.value.length));
  }, [At]), se(() => {
    (k || N) && be();
  }, []);
  const we = o === "single" ? yt : Hf(At), xe = K ? Tt ?? [] : t, Ne = Qe(
    () => V ? V(xe, Nt) : xe,
    [xe, V, Nt]
  ), Ce = we.trim(), Fe = !!he && L && !ut && !!Ce && !Wf(Ce, xe, i);
  se(() => {
    if (!K || !ke) return;
    const B = we.trim();
    if (!B) {
      Ct(null), Ht(!1);
      return;
    }
    Ht(!0);
    const ce = ++Ye.current, ve = setTimeout(() => {
      K(B).then((qe) => {
        Ye.current === ce && (Ct(qe), Ht(!1));
      }).catch(() => {
        Ye.current === ce && (Ct([]), Ht(!1));
      });
    }, 400);
    return () => clearTimeout(ve);
  }, [K, ke, we]);
  const _t = Qe(() => {
    const B = Ne.filter((ce) => !ce.hidden).map((ce) => ({
      id: ge(ce),
      label: ce.label,
      group: ce.group,
      detail: ce.detail,
      icon: ce.icon,
      disabled: !!ce.disabled || !!(de != null && de.includes(ge(ce))),
      fields: ce.fields,
      keywords: ce.keywords,
      rowClassName: ce.rowClassName,
      rowStyle: ce.rowStyle
    }));
    return Fe && B.unshift({
      id: Ce,
      label: me ? me(Ce) : `Add “${Ce}”…`,
      keywords: Ce,
      checkable: !1,
      tone: "create",
      pinned: !0
    }), B;
  }, [Ne, ge, de, Fe, Ce, me]), Ee = ee((B) => {
    const ce = B.join("\0");
    if (ce !== $t.current) {
      if (yn(B, n)) {
        $t.current = ce;
        return;
      }
      if ($t.current = ce, e(B), he)
        for (const ve of qf(B, t, i))
          z.current.has(ve) || (z.current.add(ve), he(ve));
    }
  }, [n, e, he, t, i]), on = ee((B, ce) => {
    !ce || !he || !L || t.some((ve) => ge(ve) === B) || z.current.has(B) || (z.current.add(B), he(B));
  }, [he, L, t, ge]), ht = ee((B = !0) => {
    if (!U.current || (U.current = !1, x || M)) return;
    if (ft.current) {
      ft.current = !1;
      return;
    }
    const ce = bt.current, ve = new Set(_e), qe = o === "single" ? (() => {
      const De = ce.trim();
      if (!De) return L ? [] : n;
      const y = Ui(De, t, i);
      return !L && !ve.has(y) ? n : [y];
    })() : Ot(
      _f(ce, t, i).filter((De) => L || ve.has(De)),
      _e
    );
    vt.current = qe, Ge(qe), xt(""), Be(!1), Ee(qe), B && !pe.current && (X == null || X());
  }, [x, M, o, t, i, _e, L, n, Ee, X]), wt = ee((B) => {
    Be(B), B || ht();
  }, [ht]), Te = ee(() => {
    ft.current = !0, U.current = !1;
    const B = ie(n);
    bt.current = B, vt.current = [...n], Ge([...n]), He(B), xt(""), Be(!1), ae == null || ae();
  }, [n, ie, ae]);
  se(() => {
    var qe;
    if (!ke) return;
    const ce = (((qe = Et.current) == null ? void 0 : qe.ownerDocument) ?? document).defaultView;
    if (!ce) return;
    const ve = (De) => {
      De.key === "Escape" && (De.preventDefault(), De.stopImmediatePropagation(), Te());
    };
    return ce.addEventListener("keydown", ve, !0), () => ce.removeEventListener("keydown", ve, !0);
  }, [ke, Te]);
  const Xt = ee((B) => {
    const ce = Ot(B, _e), ve = ie(ce);
    vt.current = ce, bt.current = ve, Ge(ce), Ve.current = !0, He(ve);
  }, [_e, ie]), Wn = ee((B) => {
    const ce = B.id;
    U.current = !1;
    const ve = Le(ce);
    vt.current = [ce], bt.current = ve, Ge([ce]), He(ve), xt(""), Be(!1), Ee([ce]), pe.current || X == null || X();
  }, [Le, Ee, X]), Xe = (B) => {
    var ce, ve, qe, De, y;
    if (B.key === "Escape") {
      B.preventDefault(), Te();
      return;
    }
    if (B.key === "Tab") {
      if (B.preventDefault(), o === "single" && ke) {
        pe.current = !0;
        const D = (ce = Dt.current) == null ? void 0 : ce.activateHighlighted();
        if (pe.current = !1, D) {
          (ve = j ?? X) == null || ve(Ae.current ?? void 0);
          return;
        }
      }
      ke && ht(!1), (qe = j ?? X) == null || qe(Ae.current ?? void 0);
      return;
    }
    if (B.key === "ArrowDown" || B.key === "ArrowUp") {
      if (B.preventDefault(), !ke) {
        be();
        return;
      }
      (De = Dt.current) == null || De.moveHighlight(B.key === "ArrowDown" ? 1 : -1);
      return;
    }
    if (B.key === "Enter") {
      if (B.preventDefault(), B.stopPropagation(), ke && ((y = Dt.current) != null && y.activateHighlighted())) return;
      ht();
      return;
    }
  }, Qt = (B) => {
    var ve;
    const ce = _ ? B.target.value.toUpperCase() : B.target.value;
    if (bt.current = ce, He(ce), o === "single" && xt(ce), ke || (U.current = !0, ft.current = !1, Be(!0)), o === "multiple") {
      const qe = Ot(jf(ce, t, i), _e);
      vt.current = qe, Ge(qe), (ve = Dt.current) == null || ve.setSelection(qe);
    }
  }, Pt = () => {
    if (U.current) {
      if (ft.current) {
        ft.current = !1;
        return;
      }
      ht();
    }
  }, jt = ee((B, ce) => {
    const ve = je.get(B.id);
    if (!ve)
      return /* @__PURE__ */ C(st, { children: [
        /* @__PURE__ */ h(Fr, { className: "h-3.5 w-3.5 shrink-0" }),
        /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: B.label })
      ] });
    const qe = !!m && (i === "label" ? rt.has(ve.label.toLowerCase()) : m.has(ge(ve))), De = (f == null ? void 0 : f(ve)) ?? ve.badge ?? null;
    return /* @__PURE__ */ C(st, { children: [
      d ? d(ve, ce.checked) : /* @__PURE__ */ C(st, { children: [
        ve.icon && /* @__PURE__ */ h("span", { className: "shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5", children: ve.icon }),
        /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: ve.label }),
        De && /* @__PURE__ */ h("span", { className: "shrink-0 text-[10px] text-[color:var(--ui-text-faint)]", children: De }),
        p == null ? void 0 : p(ve)
      ] }),
      qe && /* @__PURE__ */ h("span", { className: "shrink-0 inline-flex", title: g, "aria-label": g, children: /* @__PURE__ */ h(ql, { className: "h-3.5 w-3.5 text-amber-500" }) })
    ] });
  }, [je, m, rt, i, ge, f, d, p, g]), Vt = /* @__PURE__ */ h(
    Bf,
    {
      ref: Dt,
      mode: "inline",
      hideTrigger: !0,
      open: ke,
      onOpenChange: wt,
      anchorRef: s === "morph" ? it : Et,
      items: _t,
      groups: r,
      query: we,
      onSelect: Wn,
      closeOnSelect: o === "single",
      selectedId: o === "single" ? Nt[0] : void 0,
      multiple: o === "multiple" ? {
        selectedIds: Nt,
        mode: "live",
        onDraftChange: Xt,
        onToggle: on,
        onCommit: Kf,
        max: ne,
        disabledIds: de,
        indicator: Se,
        groupToken: nt
      } : void 0,
      openOnFocus: !1,
      autoFocus: !1,
      highlightOnOpen: o === "single",
      browseAll: r.length === 0,
      browseExpanded: r.length > 0 && (tt ?? "open") === "open",
      expandableGroups: r.length > 0 && tt === "accordion",
      groupExpandMode: "single",
      renderItem: jt,
      emptyTitle: ut ? "Searching…" : Z,
      emptyHint: ut ? "Fetching matching records." : te,
      theme: ue,
      panelWidth: $,
      panelMinWidth: O,
      keepAllRows: Y,
      maxMenuHeight: E,
      portalTarget: q
    }
  ), mt = s === "chip", sn = s === "wrap", En = !mt && !sn && H, qn = !ke && !G, Xr = ke ? At : G, Kn = {
    ref: Ae,
    /* Chip: the INPUT holds the committed keys (cast reads "1") while the
       overlay renders the resolved face ("1. GEORGE") — the old
       EntityDropdown's transparent-input contract. */
    value: ke ? At : mt ? n.join(", ") : G,
    disabled: M,
    readOnly: I,
    placeholder: "",
    onFocus: be,
    onClick: be,
    onChange: Qt,
    onBlur: Pt,
    onKeyDown: Xe,
    autoComplete: "off",
    spellCheck: !1
  }, Jn = P(5, 7, Ie), dr = P(9, 12, Ie), Vn = P(12, 14, Ie);
  if (s === "button") {
    const B = (De) => Xe(De), ce = ke ? Nt : n, ve = Lo(ce, t, i, l, c), qe = !ve;
    return /* @__PURE__ */ C(
      "div",
      {
        ref: Et,
        "data-picker-field": !0,
        className: `relative ${W}`,
        style: S,
        onMouseDown: (De) => De.stopPropagation(),
        onContextMenu: (De) => {
          De.preventDefault(), De.stopPropagation();
        },
        children: [
          u ? /* @__PURE__ */ h("span", { className: "pointer-events-none flex w-full min-w-0 items-center", children: u({ values: [...ce], items: t, display: ve, open: ke, toggle: be }) }) : /* @__PURE__ */ C(
            Mt,
            {
              ref: lt,
              variant: "outline",
              theme: ue === "dark" ? "dark" : "light",
              disabled: M,
              onClick: x ? void 0 : () => ke ? ht() : be(),
              onKeyDown: B,
              "data-state": ke ? "open" : "closed",
              "aria-haspopup": "listbox",
              "aria-expanded": ke,
              className: "w-full justify-between gap-2",
              children: [
                l === "chips" && ce.length > 0 ? /* @__PURE__ */ h("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1 overflow-hidden", children: ce.map((De) => /* @__PURE__ */ h(
                  "span",
                  {
                    className: "inline-flex items-center rounded border border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-1.5 py-0.5 text-[10px] text-[color:var(--ui-text)]",
                    children: Le(De)
                  },
                  De
                )) }) : /* @__PURE__ */ h("span", { className: `min-w-0 flex-1 truncate text-left ${qe ? "italic text-[color:var(--ui-text-faint)]" : ""}`, children: ve || b }),
                /* @__PURE__ */ h(fn, { className: "h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" })
              ]
            }
          ),
          Vt
        ]
      }
    );
  }
  if (s === "morph")
    return /* @__PURE__ */ h(
      Yi,
      {
        expanded: ke,
        collapsedWidth: Me,
        expandedWidth: ye,
        rootRef: Et,
        "data-picker-field": !0,
        className: W,
        style: S,
        trigger: u ? u({ values: [...n], items: t, display: G, open: ke, toggle: be }) : (
          /* The collapsed face IS the chip: one trigger recipe for both
             faces, so a morph picker matches every other value field. */
          /* @__PURE__ */ C(
            "button",
            {
              type: "button",
              disabled: M,
              onClick: be,
              className: "ui-press flex w-full cursor-pointer select-none items-center justify-between gap-2 rounded-[var(--ui-radius-btn)] border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left outline-none transition-colors hover:border-[color:var(--ui-input-focus-border)] disabled:cursor-default disabled:opacity-50",
              style: { padding: `${Jn}px ${dr}px`, fontSize: Vn },
              children: [
                /* @__PURE__ */ h("span", { className: `min-w-0 flex-1 truncate ${qn ? "italic text-[color:var(--ui-text-muted)]" : ""}`, children: G || b }),
                /* @__PURE__ */ h(fn, { className: "pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" })
              ]
            }
          )
        ),
        field: /* @__PURE__ */ C("div", { ref: it, className: "relative h-full", children: [
          /* @__PURE__ */ h(
            "input",
            {
              ...Kn,
              className: `${Ar("sm")} h-full w-full`
            }
          ),
          Vt
        ] })
      }
    );
  const Yn = mt ? P(5, 7, Ie) : 0, ln = mt ? P(9, 12, Ie) : 0;
  return x ? /* @__PURE__ */ h(
    "div",
    {
      ref: Et,
      "data-picker-field": !0,
      className: `relative ${mt ? "flex w-full items-center gap-1.5 rounded border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left" : sn ? "min-h-[1lh] w-full pb-[1lh]" : "h-[1lh] w-full"} ${W}`,
      style: mt ? { padding: `${Yn}px ${ln}px`, fontSize: P(12, 14, Ie), ...S } : S,
      children: /* @__PURE__ */ h(
        "input",
        {
          readOnly: !0,
          tabIndex: -1,
          value: G,
          className: mt ? "w-full min-w-0 bg-transparent outline-none" : "absolute inset-0 h-full w-full bg-transparent text-inherit outline-none",
          style: { color: "inherit", caretColor: "transparent" }
        }
      )
    }
  ) : /* @__PURE__ */ C(
    "div",
    {
      ref: Et,
      "data-picker-field": !0,
      className: `relative ${mt ? "ui-press flex w-full items-center gap-1.5 rounded-[var(--ui-radius-btn)] border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left outline-none focus-within:border-[color:var(--ui-input-focus-border)]" : sn ? "min-h-[1lh] w-full pb-[1lh]" : En ? "w-max max-w-[400px] min-w-[72px]" : "h-[1lh] w-full"} ${W}`,
      style: mt ? { padding: `${Yn}px ${ln}px`, fontSize: Vn, ...S } : S,
      onMouseDown: (B) => B.stopPropagation(),
      onContextMenu: (B) => {
        B.preventDefault(), B.stopPropagation();
      },
      onAuxClick: be,
      children: [
        mt && u ? /* @__PURE__ */ h("span", { className: "pointer-events-none flex min-w-0 flex-1 items-center", children: u({ values: [...n], items: t, display: G, open: ke, toggle: be }) }) : l === "chips" && !ke ? /* @__PURE__ */ C("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1", children: [
          n.map((B) => /* @__PURE__ */ h(
            "span",
            {
              className: "inline-flex items-center rounded border border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-1.5 py-0.5 text-[10px] text-[color:var(--ui-text)]",
              children: Le(B)
            },
            B
          )),
          n.length === 0 && /* @__PURE__ */ h("span", { className: "italic text-[color:var(--ui-text-muted)]", children: b })
        ] }) : /* @__PURE__ */ h(
          "span",
          {
            className: `pointer-events-none text-left ${mt ? "min-w-0 flex-1 truncate" : sn ? "block whitespace-pre-wrap break-words leading-relaxed" : "absolute inset-y-0 inset-x-0 flex items-center truncate whitespace-nowrap"} ${qn ? "italic text-[color:var(--ui-text-muted)]" : ""}`,
            children: Xr || b
          }
        ),
        sn ? /* @__PURE__ */ h(
          "textarea",
          {
            ...Kn,
            rows: 1,
            className: "absolute inset-0 h-full w-full resize-none overflow-hidden whitespace-pre-wrap break-words bg-transparent text-transparent outline-none",
            style: { caretColor: "#2563eb", color: "transparent" }
          }
        ) : /* @__PURE__ */ h(
          "input",
          {
            ...Kn,
            className: En ? "block w-full bg-transparent text-transparent outline-none" : "absolute inset-0 h-full w-full bg-transparent text-transparent outline-none",
            style: En ? { fieldSizing: "content", width: "auto", minWidth: 72, maxWidth: 400, caretColor: "#2563eb", color: "transparent" } : mt ? { caretColor: "#2563eb", color: "transparent", paddingLeft: ln, paddingRight: ln + 16 } : { caretColor: "#2563eb", color: "transparent" }
          }
        ),
        mt && /* @__PURE__ */ h(fn, { className: "pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" }),
        Vt
      ]
    }
  );
}
export {
  Mt as Button,
  Yh as CardSection,
  Ri as CheckMark,
  Mc as Checkbox,
  Ah as Checklist,
  _h as ChromeHeader,
  Hh as ContentRow,
  xh as ContextMenu,
  vh as ContextMenuDivider,
  bh as ContextMenuItem,
  wh as ContextMenuSub,
  Go as DROPDOWN_MAX_HEIGHT,
  Rh as DatePicker,
  Nh as DialogProvider,
  Fc as DropdownItem,
  Kr as DropdownMenu,
  Hc as DropdownSubmenu,
  Ai as DropdownThemeContext,
  Cf as FONTS,
  $h as FloatingChrome,
  Mh as FloatingToggle,
  Mf as FontMenu,
  Jh as FormatToolbar,
  et as IS_COARSE,
  pc as IS_TOUCH_CAPABLE,
  yh as ItemManagerDropdown,
  Ch as LongPressMenuProvider,
  Ni as MORPH_EASE,
  pn as MORPH_MS,
  Ti as MORPH_OPACITY_MS,
  ur as MenuHighlightContext,
  ds as MenuSearchContext,
  jc as Modal,
  kh as ModalFooter,
  pr as ModalFooterButton,
  Uh as MorphActionField,
  Df as MorphSearchField,
  is as NO_SELECTION_IDS,
  Vh as NumberInput,
  Gh as PickerField,
  hc as PopoutWindowContext,
  Kh as RICH_TEXT_STATE_IDLE,
  Ih as RadioList,
  Tf as RichTextEditor,
  If as SCRUB_PX_PER_STEP,
  Bf as SearchMenu,
  Fh as SectionHeader,
  Bh as Seg,
  Rr as SelectionCheck,
  rs as SelectionContext,
  ls as SelectionFooter,
  jh as StructureControls,
  zi as SubmenuContext,
  gh as TAB_PILL,
  ca as TB_BTN,
  mr as TB_BTN_ICON,
  aa as TB_DANGER,
  xs as TB_DIVIDER,
  ua as TB_INPUT,
  Oh as TB_NUM,
  fa as TB_PICKER,
  zh as TB_ROW_LABEL,
  da as TB_SEG,
  Dh as TB_TOGGLE,
  Lh as TB_TOGGLE_OFF,
  Ph as TB_TOGGLE_ON,
  ss as TabFace,
  ph as ThemeProvider,
  mh as ThemeScope,
  yf as Token,
  gf as TokenChipView,
  gr as ToolButton,
  An as Tooltip,
  Ci as ZOOM_FROM,
  Of as buildSearchMenuRows,
  kc as buttonCloudOf,
  Vi as clampNumber,
  xc as cloneOverlayClose,
  P as coarsePx,
  Cc as countHidden,
  qh as escapeHtml,
  Lo as formatPickerValues,
  qo as getCoarseScale,
  Wr as getDropdownClasses,
  fh as getHardwareKeyboard,
  dh as getLastPointerType,
  ro as groupSelectionState,
  Wf as hasPickerMatch,
  Ar as inputCls,
  Xc as isInteractiveElement,
  di as isTouchLike,
  Hf as lastPickerSegment,
  Lf as matchSearchItem,
  es as menuAttributesOf,
  vc as menuThemeOf,
  Yo as nearestOverlayOrigin,
  El as normalizeSpaces,
  Ot as orderByCatalogue,
  Qr as overlayMorphEnabled,
  Pf as parseSearchTags,
  jf as pickerCommittedKeys,
  kn as pickerItemKey,
  Al as pickerItemLabel,
  Ff as pickerSegments,
  yc as playOverlayClose,
  gc as playOverlayOpen,
  zo as preprocessTokenHtml,
  Ui as resolvePickerSegment,
  _f as resolvePickerText,
  mn as revealRowInScroller,
  yn as sameSelection,
  hf as sanitizeRichText,
  $f as scrubbedValue,
  Rl as searchMenuContent,
  wc as segModeOf,
  ah as setCoarseScale,
  no as setSelected,
  Af as steppedValue,
  Wh as stripRichText,
  pf as stripTokenWrappers,
  Tc as toggleSelected,
  qf as unknownPickerValues,
  uh as useCoarse,
  Oe as useCoarseScale,
  hn as useCoarseSize,
  Si as useCurrentDocument,
  cr as useCurrentWindow,
  Sh as useDialog,
  Xo as useDropdownPosition,
  cs as useDropdownTheme,
  hh as useHardwareKeyboard,
  gs as useInputSize,
  $i as useItemSize,
  Gt as useKitTheme,
  mc as useLastPointerType,
  Th as useLongPressOptOut,
  Di as useMenuHighlight,
  Lc as useMenuSearch,
  jr as useOverlayMorph,
  ki as usePopoutWindow,
  _n as usePortalTarget,
  ts as useRevealRowOnOpen,
  ns as useSelection,
  Ec as useSelectionContext,
  la as useSlidingPill,
  Eh as useTouchMode
};
