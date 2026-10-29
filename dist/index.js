"use client";
import { jsx as h, jsxs as R, Fragment as ct } from "react/jsx-runtime";
import lt, { createContext as Ut, useContext as Gt, useState as oe, useEffect as le, useRef as v, useCallback as ie, useLayoutEffect as ut, useMemo as tt, useId as Ll, useImperativeHandle as _o } from "react";
import * as Oe from "@radix-ui/react-dropdown-menu";
import { Minus as Ol, Check as lr, Search as On, X as Sn, Pencil as Fl, CopyPlus as jo, Trash2 as hi, RotateCcw as Wo, Plus as _r, ChevronRight as Rr, ChevronLeft as Bl, ArrowUp as Hl, ArrowDown as _l, ChevronDown as dn, Underline as jl, Strikethrough as Wl, RemoveFormatting as ql, Link as Kl, ChevronUp as Jl, Anchor as Vl } from "lucide-react";
import { computePosition as Yl, offset as qo, flip as Ko, shift as Jo, size as Ul, useFloating as Gl, autoUpdate as Xl } from "@floating-ui/react-dom";
import * as ln from "@radix-ui/react-dialog";
import { createPortal as jr } from "react-dom";
import { mergeAttributes as Ql, ReactNodeViewRenderer as Zl, NodeViewWrapper as ec, useEditor as tc, EditorContent as nc } from "@tiptap/react";
import { PluginKey as Jt, Plugin as sn, Selection as Bn, TextSelection as Ot, NodeSelection as Wn, AllSelection as rc } from "@tiptap/pm/state";
import { DecorationSet as pr, Decoration as ic } from "@tiptap/pm/view";
import oc from "@tiptap/starter-kit";
import sc from "@tiptap/extension-placeholder";
import { TextStyle as lc, FontFamily as cc, FontSize as ac } from "@tiptap/extension-text-style";
import uc from "@tiptap/extension-color";
import dc from "@tiptap/extension-link";
import fc from "@tiptap/extension-underline";
import hc from "@tiptap/suggestion";
import { Mention as pc } from "@tiptap/extension-mention";
import { createRoot as mc } from "react-dom/client";
const gc = Ut(null);
function Ti() {
  return Gt(gc);
}
function Vn() {
  const n = Ti();
  return n ? n.document.body : null;
}
function Ci() {
  const n = Ti();
  return n ? n.document : typeof document < "u" ? document : null;
}
function cr() {
  return Ti() ?? (typeof window < "u" ? window : null);
}
const ar = typeof window < "u", rt = ar && window.matchMedia("(pointer: coarse)").matches, yc = ar && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
let Wr = 0.5;
const er = /* @__PURE__ */ new Set();
function hh(n) {
  Wr = Math.max(0, Math.min(1, n)), er.forEach((e) => e());
}
function Vo() {
  return Wr;
}
function ph() {
  const [, n] = oe(0);
  return le(() => {
    const e = () => n((t) => t + 1);
    return er.add(e), () => {
      er.delete(e);
    };
  }, []), rt && Wr > 0;
}
function He() {
  const [, n] = oe(0);
  return le(() => {
    const e = () => n((t) => t + 1);
    return er.add(e), () => {
      er.delete(e);
    };
  }, []), Wr;
}
function P(n, e, t) {
  return rt ? Math.round(n + (e - n) * t) : n;
}
function fn(n, e) {
  const t = He();
  return rt && t > 0 ? {
    padding: `${P(n.py, e.py, t)}px ${P(n.px, e.px, t)}px`,
    fontSize: `${P(n.fs, e.fs, t)}px`
  } : { padding: `${n.py}px ${n.px}px`, fontSize: `${n.fs}px` };
}
function Yo() {
  const n = He(), e = rt && n > 0;
  return {
    box: e ? P(28, 36, n) : 20,
    icon: e ? P(16, 20, n) : 14
  };
}
function pi(n) {
  return n === "touch" || n === "pen";
}
let Fn = null;
const mi = /* @__PURE__ */ new Set();
ar && window.addEventListener("pointerdown", (n) => {
  Fn = n.pointerType, mi.forEach((e) => e());
}, !0);
function mh() {
  return Fn;
}
function xc() {
  const [, n] = oe(0), e = v(Fn);
  return le(() => {
    const t = () => {
      e.current !== Fn && (e.current = Fn, n((r) => r + 1));
    };
    return mi.add(t), () => {
      mi.delete(t);
    };
  }, []), Fn;
}
const Uo = ["(any-hover: hover)", "(any-pointer: fine)"];
function Go() {
  return ar ? Uo.some((n) => window.matchMedia(n).matches) : !1;
}
let Ar = Go();
const gi = /* @__PURE__ */ new Set();
function io(n) {
  Ar !== n && (Ar = n, gi.forEach((e) => e()));
}
var Ho;
if (ar) {
  const n = () => io(Go());
  for (const s of Uo) {
    const l = window.matchMedia(s);
    (Ho = l.addEventListener) == null || Ho.call(l, "change", n);
  }
  window.addEventListener("focus", n), document.addEventListener("visibilitychange", n);
  const e = window.setInterval(() => {
    document.visibilityState === "visible" && n();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(e)), window.addEventListener("keydown", (s) => {
    s.isComposing || s.keyCode !== 229 && (s.key === "Enter" || s.key === "Backspace" || s.key === "Process" || s.key === "Unidentified" || io(!0));
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
function gh() {
  return Ar;
}
function yh() {
  const [, n] = oe(0);
  return le(() => {
    const e = () => n((t) => t + 1);
    return gi.add(e), () => {
      gi.delete(e);
    };
  }, []), Ar;
}
const hn = 220, Ei = "cubic-bezier(0.32, 0.72, 0, 1)", Mi = 170, Ri = 0.94;
function ti(n) {
  return n === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Xo(n, e) {
  const t = e.left + e.width / 2, r = e.top + e.height / 2;
  return {
    x: t < n.left ? 0 : t > n.left + n.width ? 1 : 0.5,
    y: r < n.top ? 0 : r > n.top + n.height ? 1 : 0.5
  };
}
function Qo(n, e) {
  const t = (e == null ? void 0 : e()) ?? null;
  if (!t) return { x: 0.5, y: 0.5 };
  const r = n.getBoundingClientRect();
  return Xo({ left: r.left, top: r.top, width: r.width, height: r.height }, t);
}
function bc(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity };
  e.style.transition = "none", e.style.transformOrigin = "50% 50%", e.style.transform = `scale(${Ri})`, e.style.opacity = "0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    n.current === i && requestAnimationFrame(() => {
      if (n.current !== i) return;
      const s = Qo(e, t);
      e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transition = `transform ${hn}ms ${Ei}, opacity ${Mi}ms ease`, e.style.transform = "none", e.style.opacity = "", window.setTimeout(() => {
        n.current === i && (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, r == null || r());
      }, hn + 60);
    });
  });
}
function vc(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity, pointerEvents: e.style.pointerEvents, visibility: e.style.visibility }, s = Qo(e, t);
  e.style.transition = `transform ${hn}ms ${Ei}, opacity ${Mi}ms ease`, e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transform = `scale(${Ri})`, e.style.opacity = "0", e.style.pointerEvents = "none", window.setTimeout(() => {
    n.current === i && (e.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      n.current !== i || e.isConnected || (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, e.style.pointerEvents = o.pointerEvents, e.style.visibility = o.visibility);
    }));
  }, hn + 60);
}
function wc(n, e, t) {
  const r = n.cloneNode(!0), i = n.getBoundingClientRect(), o = i.width > 0 || i.height > 0 ? i : t ?? i;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${o.left}px`, r.style.top = `${o.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const s = (e == null ? void 0 : e()) ?? null, l = s ? Xo({ left: o.left, top: o.top, width: o.width, height: o.height }, s) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${l.x * 100}% ${l.y * 100}%`, n.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${hn}ms ${Ei}, opacity ${Mi}ms ease`, r.style.transform = `scale(${Ri})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, hn + 60));
    });
  });
}
function qr(n) {
  const e = v(null), [t, r] = oe(!1), i = v(null), o = v(0), s = ie((m) => {
    if (n.ref && (n.ref.current = m), m) {
      o.current = 0, e.current = m;
      const x = m.getBoundingClientRect();
      (x.width > 0 || x.height > 0) && (i.current = { left: x.left, top: x.top, width: x.width, height: x.height }), r(!0);
      return;
    }
    const g = e.current, b = ++o.current;
    queueMicrotask(() => {
      b === o.current && e.current === g && (e.current = null, r(!1), !(!g || !n.cloneOnUnmount || !c.current) && g.style.visibility !== "hidden" && ti(f.current) && wc(g, u.current, i.current));
    });
  }, []), l = ie(() => {
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
  return ut(() => {
    if (!t || !c.current || !ti(f.current)) return;
    const m = e.current;
    m && bc(p, m, u.current);
  }, [t, n.visible]), le(() => {
    if (!t || !c.current) return;
    let m = 0;
    const g = () => {
      m = 0, l(), m = requestAnimationFrame(g);
    };
    return m = requestAnimationFrame(g), () => {
      m && cancelAnimationFrame(m);
    };
  }, [t, l]), ut(() => {
    var b;
    const m = a.current;
    if (a.current = n.visible, n.visible || !m) return;
    const g = e.current;
    if (!g || !ti(f.current)) {
      (b = d.current) == null || b.call(d);
      return;
    }
    vc(p, g, u.current, () => {
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
const Zo = 384;
function kc(n) {
  const e = n.visualViewport;
  return e ? { x: e.offsetLeft, y: e.offsetTop, width: e.width, height: e.height } : { x: 0, y: 0, width: n.innerWidth, height: n.innerHeight };
}
function es({
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
  const u = cr(), d = v(u);
  d.current = u;
  const f = v(a);
  f.current = a, ut(() => {
    if (!t) return;
    let p = 0, m = !1;
    const g = () => {
      p || (p = requestAnimationFrame(b));
    }, b = () => {
      if (p = 0, m) return;
      const T = d.current, H = n.current, q = e.current;
      if (!T || !H || !q || !q.isConnected) return;
      const C = (r == null ? void 0 : r.current) ?? q, K = kc(T), w = l ?? Zo, I = Math.min(c, w), F = Math.max(0, q.offsetHeight - C.offsetHeight), U = Math.max(I, Math.ceil(C.scrollHeight + F)), j = Math.min(U, w);
      q.style.maxHeight = `${j}px`;
      let M = j;
      const W = i == null ? void 0 : i.current;
      Yl(W ? {
        getBoundingClientRect: () => ({
          left: W.left,
          top: W.top,
          width: W.width,
          height: W.height,
          right: W.left + W.width,
          bottom: W.top + W.height,
          x: W.left,
          y: W.top,
          toJSON: () => {
          }
        })
      } : H, q, {
        strategy: "fixed",
        placement: "bottom-start",
        middleware: [
          qo(o),
          Ko({ boundary: K, padding: s, fallbackStrategy: "bestFit" }),
          Jo({ boundary: K, padding: s, mainAxis: !1 }),
          Ul({
            boundary: K,
            padding: s,
            apply({ availableHeight: ue }) {
              M = Math.max(I, Math.floor(Math.min(w, ue))), q.style.maxHeight = `${M}px`;
            }
          })
        ]
      }).then(({ x: ue, y: ve, placement: A }) => {
        m || !Number.isFinite(ue) || !Number.isFinite(ve) || f.current({
          top: Math.round(ve),
          left: Math.round(ue),
          maxH: M,
          side: A.startsWith("top") ? "top" : "bottom",
          ready: !0
        });
      });
    };
    b();
    const x = d.current, D = (x == null ? void 0 : x.document) ?? null, E = (x == null ? void 0 : x.visualViewport) ?? null, S = () => g();
    E == null || E.addEventListener("resize", S), E == null || E.addEventListener("scroll", S), x == null || x.addEventListener("resize", S), D == null || D.addEventListener("scroll", S, { capture: !0, passive: !0 });
    let N = null;
    return typeof ResizeObserver < "u" && (N = new ResizeObserver(S), e.current && N.observe(e.current), r != null && r.current && N.observe(r.current)), () => {
      m = !0, p && cancelAnimationFrame(p), E == null || E.removeEventListener("resize", S), E == null || E.removeEventListener("scroll", S), x == null || x.removeEventListener("resize", S), D == null || D.removeEventListener("scroll", S, { capture: !0 }), N == null || N.disconnect();
    };
  }, [t, n, e, r, i, o, s, l, c]);
}
let zn = null;
function ts(n) {
  return zn == null || zn(), zn = n, () => {
    zn === n && (zn = null);
  };
}
const ns = Ut(null);
function Ai(n, e) {
  const t = n.mode ?? (e == null ? void 0 : e.mode) ?? "dark", r = n.surface ?? (e == null ? void 0 : e.surface) ?? "neutral", i = n.context ?? (e == null ? void 0 : e.context) ?? "surface", o = n.accent ?? (e == null ? void 0 : e.accent) ?? "zinc", s = n.accent !== void 0 && n.surface === void 0 && n.context === void 0;
  return { mode: t, accent: i === "chrome" || r === "accent" || s ? o : "zinc", surface: r, context: i };
}
function Ii({ theme: n, children: e }) {
  return /* @__PURE__ */ h(ns.Provider, { value: n, children: e });
}
function xh({ mode: n, accent: e, surface: t, context: r, children: i }) {
  const o = Xt();
  return /* @__PURE__ */ h(Ii, { theme: Ai({ mode: n, accent: e, surface: t, context: r }, o), children: i });
}
function bh({ mode: n, accent: e, surface: t, context: r, children: i, className: o, style: s }) {
  const l = Xt(), c = Ai({ mode: n, accent: e, surface: t, context: r }, l);
  return /* @__PURE__ */ h(Ii, { theme: c, children: /* @__PURE__ */ h(
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
  return Gt(ns);
}
function Sc(n, e = "dark") {
  return n ? n.context === "surface" ? n.mode : n.mode === "light" ? "light" : n.accent === "emerald" ? "emerald" : n.accent === "blue" ? "blue" : "dark" : e;
}
function rs(n, e) {
  if (n)
    return (n === "light" || n === "dark") && e ? {
      theme: n,
      attrs: { "data-theme": n, "data-mode": n, "data-accent": e.accent }
    } : { theme: n, attrs: { "data-theme": n } };
  if (!e) return { theme: "dark", attrs: { "data-theme": "dark" } };
  if (e.context === "chrome") {
    const t = Sc(e);
    return { theme: t, attrs: { "data-theme": t } };
  }
  return { theme: e.mode, attrs: { "data-mode": e.mode, "data-accent": e.accent } };
}
function Nc(n, e = "light") {
  return (n == null ? void 0 : n.mode) ?? e;
}
function Tc(n) {
  return !n || n.context !== "chrome" && n.surface !== "accent" ? !1 : n.accent === "emerald" ? "emerald" : n.accent === "blue";
}
function Cc(n) {
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
function on(n, e = "nearest", t) {
  if (!n) return;
  const r = t ?? Cc(n);
  if (!r || !r.contains(n)) return;
  const i = n.getBoundingClientRect(), o = r.getBoundingClientRect();
  if (e === "center") {
    r.scrollTop += i.top + i.height / 2 - (o.top + o.height / 2);
    return;
  }
  const s = getComputedStyle(n), l = parseFloat(s.scrollMarginBlockStart || s.scrollMarginTop || "0") || 0, c = parseFloat(s.scrollMarginBlockEnd || s.scrollMarginBottom || "0") || 0;
  i.top - l < o.top ? r.scrollTop -= o.top - (i.top - l) : i.bottom + c > o.bottom && (r.scrollTop += i.bottom + c - o.bottom);
}
function is({
  open: n,
  row: e,
  block: t = "nearest",
  scroller: r,
  ready: i
}) {
  const o = v(!1), s = v(!1), l = v(!1), c = v({ row: e, scroller: r, block: t });
  c.current = { row: e, scroller: r, block: t };
  const a = ie(() => {
    o.current = !0;
  }, []);
  return ut(() => {
    if (!n) {
      s.current = !1, l.current = !1, o.current = !1;
      return;
    }
    if (s.current) return;
    s.current = !0;
    const { row: u, scroller: d, block: f } = c.current, p = u();
    p && (on(p, f, (d == null ? void 0 : d()) ?? null), l.current = !0);
  }, [n]), le(() => {
    if (!n || i !== !0 || !l.current) return;
    const u = requestAnimationFrame(() => {
      if (!l.current || (l.current = !1, o.current)) return;
      const { row: d, scroller: f } = c.current;
      on(d(), "nearest", (f == null ? void 0 : f()) ?? null);
    });
    return () => cancelAnimationFrame(u);
  }, [n, i]), { engagedRef: o, engage: a };
}
const Ec = [];
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
function Mc(n, e, t, r = {}) {
  var o;
  const i = Lt(n, t);
  return (o = r.disabledIds) != null && o.includes(e) ? i : i.includes(e) ? i.filter((s) => s !== e) : r.max !== void 0 && i.length >= r.max ? i : Lt([...i, e], t);
}
function oo(n, e, t, r, i = {}) {
  const o = Lt(n, r), s = new Set(e);
  if (!t) return o.filter((d) => !s.has(d));
  const l = new Set(r), c = new Set(i.disabledIds ?? []), a = i.max === void 0 ? 1 / 0 : Math.max(0, i.max - o.length), u = Lt([...s], r).filter((d) => l.has(d) && !o.includes(d) && !c.has(d)).slice(0, a);
  return u.length === 0 ? o : Lt([...o, ...u], r);
}
function so(n, e) {
  if (e.length === 0) return "none";
  const t = new Set(n), r = e.reduce((i, o) => i + (t.has(o) ? 1 : 0), 0);
  return r === 0 ? "none" : r === e.length ? "all" : "some";
}
function Rc(n, e, t) {
  if (!t) return 0;
  const r = new Set(e), i = new Set(t);
  return n.reduce((o, s) => o + (r.has(s) && !i.has(s) ? 1 : 0), 0);
}
function ss(n) {
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
  } = n, [f, p] = oe(() => Lt(t, r)), m = tt(() => new Set(s ?? []), [s]), g = tt(() => new Set(f), [f]), b = o !== void 0 && f.length >= o, x = !xn(f, t), D = ie((K) => {
    if (m.has(K)) return;
    const w = g.has(K), I = Mc(f, K, r, { max: o, disabledIds: s });
    xn(I, f) || (p(I), d == null || d(I), u == null || u(K, !w));
  }, [f, g, m, r, o, s, u, d]), E = ie((K) => {
    const w = K.filter((U) => !m.has(U)), I = so(f, w), F = oo(f, w, I !== "all", r, { max: o, disabledIds: s });
    xn(F, f) || (p(F), d == null || d(F));
  }, [f, m, r, o, s, d]), S = ie((K, w = i ?? r) => {
    const I = oo(f, w, K, r, { max: o, disabledIds: s });
    xn(I, f) || (p(I), d == null || d(I));
  }, [f, i, r, o, s, d]), N = ie(() => {
    f.length !== 0 && (p([]), d == null || d([]));
  }, [f, d]), T = ie((K) => {
    p(Lt(K ?? t, r));
  }, [t, r]), H = ie(() => !a || xn(f, t) ? !1 : (a(Lt(f, r)), !0), [a, f, t, r]), q = ie(() => !c || xn(f, t) ? !1 : (c(Lt(f, r)), !0), [c, f, t, r]), C = ie((K) => so(f, K), [f]);
  return {
    mode: e,
    indicator: l,
    draft: f,
    count: f.length,
    max: o,
    atMax: b,
    dirty: x,
    hiddenCount: Rc(f, r, i),
    isSelected: (K) => g.has(K),
    isDisabled: (K) => m.has(K),
    canToggle: (K) => !m.has(K) && (g.has(K) || !b),
    toggle: D,
    toggleGroup: E,
    setAll: S,
    clear: N,
    reset: T,
    commit: H,
    flush: q,
    cancel: T,
    groupState: C
  };
}
const ls = Ut(null), Ac = () => Gt(ls), cs = Ec;
function $i({ checked: n, size: e, tone: t = "accent", indeterminate: r = !1 }) {
  return /* @__PURE__ */ h(
    "span",
    {
      className: `ui-check-indicator ${n || r ? "ui-check-indicator-checked" : ""} ${t === "danger" ? "ui-check-tone-danger" : ""}`,
      "aria-hidden": !0,
      children: r ? /* @__PURE__ */ R("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: [
        /* @__PURE__ */ h("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor", stroke: "var(--ui-check-ring)", strokeWidth: 1 }),
        /* @__PURE__ */ h("path", { d: "M4.5 8 H11.5", stroke: "var(--ui-check-check)", strokeWidth: 2, strokeLinecap: "round", fill: "none" })
      ] }) : n ? /* @__PURE__ */ R("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: [
        /* @__PURE__ */ h("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor", stroke: "var(--ui-check-ring)", strokeWidth: 1 }),
        /* @__PURE__ */ h("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "var(--ui-check-check)", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" })
      ] }) : /* @__PURE__ */ h("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: /* @__PURE__ */ h("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) })
    }
  );
}
function Ic({ checked: n, onChange: e, disabled: t = !1, label: r, id: i, className: o = "", labelClassName: s = "", theme: l, variant: c = "pill", tone: a = "accent", block: u = !1 }) {
  const d = c !== "plain", f = He(), p = P(16, 20, f), m = P(12, 14, f), g = P(12, 14, f), b = P(12, 16, f), x = P(10, 12, f), D = P(8, 10, f);
  return /* @__PURE__ */ R(
    "label",
    {
      className: `ui-press ui-checkbox ${d ? "ui-checkbox-pill rounded-lg" : ""} ${a === "danger" ? "ui-checkbox-tone-danger" : ""} ${t ? "ui-disabled" : ""} ${o}`,
      style: { display: u ? "flex" : "inline-flex", alignItems: "center", gap: D, padding: d ? `${x}px ${b}px` : void 0 },
      onClick: (S) => S.stopPropagation(),
      ...l ? { "data-theme": l } : {},
      children: [
        /* @__PURE__ */ h(
          "input",
          {
            type: "checkbox",
            id: i,
            checked: n,
            disabled: t,
            onChange: (S) => e(S.target.checked),
            className: "sr-only"
          }
        ),
        d ? /* @__PURE__ */ h($i, { checked: n, size: p, tone: a }) : /* @__PURE__ */ h("span", { className: "ui-checkbox-box", style: { width: p, height: p }, "aria-hidden": !0, children: n && /* @__PURE__ */ h("svg", { viewBox: "0 0 12 12", fill: "none", style: { width: m, height: m }, "aria-hidden": !0, children: /* @__PURE__ */ h("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ h("span", { className: `ui-checkbox-label ${s}`, style: { fontSize: g }, children: r })
      ]
    }
  );
}
const lo = "transition-[grid-template-columns] ease-out duration-150 group-hover:duration-200 motion-reduce:transition-none", $c = "group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] group-data-[state=open]:grid-cols-[1fr]", zc = "group-hover:grid-cols-[0fr] group-focus-visible:grid-cols-[0fr] group-data-[state=open]:grid-cols-[0fr]", Dc = "group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[state=open]:opacity-100";
function Pc(n) {
  if (!lt.isValidElement(n)) return String(n ?? "");
  const e = n.type, t = typeof e == "string" ? e : e.displayName || e.name || "icon", r = n.props;
  return `${t}|${r.className ?? ""}|${r.size ?? ""}`;
}
function as({ icon: n, collapse: e = !1, iconWithLabel: t = !0, active: r = !1, gap: i = 6, reserve: o, roll: s = "up", children: l }) {
  const c = !!e && !!n, a = c && !t, u = !!n && (t || c), d = Pc(n), [f, p] = oe({ sig: d, node: n }), [m, g] = oe(null);
  d !== f.sig && (p({ sig: d, node: n }), g(f.node)), le(() => {
    if (m == null) return;
    const x = window.setTimeout(() => g(null), 200);
    return () => window.clearTimeout(x);
  }, [m]);
  const b = m == null ? n : /* @__PURE__ */ R("span", { className: "relative inline-flex items-center justify-center overflow-hidden", children: [
    /* @__PURE__ */ h("span", { "aria-hidden": !0, className: `ui-icon-roll-out${s === "down" ? "-down" : ""} absolute inset-0 inline-flex items-center justify-center`, children: m }, `out:${f.sig}`),
    /* @__PURE__ */ h("span", { className: `ui-icon-roll-in${s === "down" ? "-down" : ""} inline-flex items-center justify-center`, children: n }, `in:${d}`)
  ] });
  return c ? /* @__PURE__ */ R(ct, { children: [
    u && (a ? /* @__PURE__ */ h("span", { "data-kit-icon": !0, className: `grid min-w-0 ${lo} ${r ? "grid-cols-[0fr]" : `grid-cols-[1fr] ${zc}`}`, children: /* @__PURE__ */ h("span", { className: "inline-flex min-w-0 items-center overflow-hidden", children: b }) }) : /* @__PURE__ */ h("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: b })),
    /* @__PURE__ */ h("span", { "data-kit-label": !0, className: `grid min-w-0 ${lo} ${r ? "grid-cols-[1fr]" : `grid-cols-[0fr] ${$c}`}`, children: /* @__PURE__ */ h("span", { className: "min-w-0 overflow-hidden", children: /* @__PURE__ */ h(
      "span",
      {
        className: `flex min-w-0 items-center whitespace-nowrap transition-[opacity,padding-left] duration-100 group-hover:duration-150 motion-reduce:transition-none ${r ? "opacity-100" : `opacity-0 ${Dc}`} ${a ? `pl-[var(--kit-collapse-gap)] group-hover:pl-0! group-focus-visible:pl-0! group-data-[state=open]:pl-0! ${r ? "pl-0!" : ""}` : ""}`,
        style: a ? { "--kit-collapse-gap": `${i}px` } : { paddingLeft: i },
        children: o ? /* @__PURE__ */ R("span", { className: "inline-grid min-w-0", children: [
          /* @__PURE__ */ h("span", { "aria-hidden": !0, className: "invisible col-start-1 row-start-1 whitespace-nowrap", children: o }),
          /* @__PURE__ */ h("span", { className: "col-start-1 row-start-1", children: l })
        ] }) : l
      }
    ) }) })
  ] }) : /* @__PURE__ */ R(ct, { children: [
    u && /* @__PURE__ */ h("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: n }),
    l
  ] });
}
const vh = {
  light: { plain: "bg-zinc-950", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" },
  dark: { plain: "bg-white", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" }
};
function Et({
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
  const D = Xt(), E = e ?? (D == null ? void 0 : D.mode) ?? "light", S = t ?? Tc(D), N = fn({ px: 10, py: 6, fs: 12 }, { px: 14, py: 9, fs: 14 }), T = fn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 9, fs: 14 }), H = fn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), q = "", C = "", K = `${l ? "ui-reveal " : ""}ui-press inline-flex items-center font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed`, w = "rounded", I = "rounded-[var(--ui-radius-btn)]", F = {
    light: {
      active: "text-white",
      inactive: "text-zinc-500 hover:text-zinc-900"
    },
    dark: {
      active: "text-zinc-900",
      inactive: "text-zinc-400 hover:text-zinc-200"
    }
  }, U = {
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
  }, j = {
    active: "text-zinc-900",
    inactive: "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800",
    open: "bg-zinc-800! text-white"
  }, M = {
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
  }, W = {
    light: {
      subtle: { base: `${q} text-zinc-600 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-900" },
      primary: { base: `${C} bg-zinc-900 hover:bg-zinc-800 text-white`, open: "bg-zinc-800!" },
      /* The outline is painted as an INSET SHADOW, not a border: the button
         keeps `subtle`'s exact box (same padding + height), so the two can sit
         side by side in a toolbar without a 2px step. */
      outline: {
        base: `${q} text-zinc-700 shadow-[inset_0_0_0_1px_var(--ui-border-strong)] hover:bg-[var(--ui-btn-hover-bg)] hover:text-zinc-900`,
        open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-900"
      },
      "danger-ghost": { base: `${q} text-rose-600 hover:bg-rose-50`, open: "bg-rose-50!" }
    },
    dark: {
      subtle: { base: `${q} text-zinc-400 hover:text-zinc-200 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-200" },
      primary: { base: `${C} bg-zinc-800 hover:bg-zinc-700 text-white`, open: "bg-zinc-700!" },
      outline: {
        base: `${q} text-zinc-300 shadow-[inset_0_0_0_1px_var(--ui-border-strong)] hover:bg-[var(--ui-btn-hover-bg)] hover:text-zinc-100`,
        open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-100"
      },
      "danger-ghost": { base: `${q} text-red-400 hover:bg-rose-950/40`, open: "bg-rose-950/40!" }
    }
  }, Y = {
    blue: { base: `${C} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" },
    emerald: { base: `${C} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" }
  }, ue = x["data-state"] === "open", ve = W[E][n], A = n === "primary" ? T : n.startsWith("tab") ? H : N, ge = rt ? { padding: "8px 12px", fontSize: "14px", lineHeight: "20px", border: "1px solid transparent" } : { padding: "6px 8px", fontSize: "12px", lineHeight: "16px", border: "1px solid transparent" }, me = P(6, 8, He()), te = P(28, 40, He()), X = S === "emerald" ? "emerald" : S ? "blue" : null, Q = "bg-[var(--ui-btn-active-bg)]! text-[color:var(--ui-btn-active-text)]!", ye = {
    info: "bg-blue-600! hover:bg-blue-500! text-white!",
    success: "bg-emerald-600! hover:bg-emerald-500! text-white!",
    warning: "bg-amber-500! hover:bg-amber-400! text-zinc-950!",
    danger: "bg-rose-600! hover:bg-rose-500! text-white!"
  };
  let se;
  if (n === "tab") {
    const V = F[E];
    se = `${w} ${r ? X ? U[X].active : V.active : X ? U[X][E === "light" ? "inactiveLight" : "inactiveDark"] : V.inactive}`;
  } else if (n === "tab-header") {
    const V = X ? r ? M[X].active : M[X].inactive : r ? j.active : j.inactive;
    se = `${w} ${V} ${ue ? X ? M[X].open : j.open : ""}`;
  } else {
    if (se = `${I} ${ve.base} ${ue ? ve.open : ""}`, n === "primary" && X) {
      const V = Y[X];
      se = `${I} ${ue ? `${V.base} ${V.open}` : V.base}`;
    }
    r && (se = `${se} ${i === "neutral" ? Q : ye[i]}`);
  }
  const B = !!f && !!d && !o, L = o ? { width: te, height: te, padding: 0, gap: 0 } : s === "minimal" ? { ...ge, gap: B ? 0 : me } : { ...A, gap: B ? 0 : me };
  return /* @__PURE__ */ h(
    "button",
    {
      type: g,
      "data-mode": E,
      "data-accent": D == null ? void 0 : D.accent,
      className: `${K} ${o ? "justify-center" : ""} ${B ? "group" : ""} ${se} ${m}`,
      "aria-pressed": r && !n.startsWith("tab") ? !0 : void 0,
      "data-active": r || void 0,
      style: L,
      ...x,
      children: o ? b : /* @__PURE__ */ h(
        as,
        {
          icon: d,
          collapse: f,
          iconWithLabel: p,
          active: r && (n.startsWith("tab") || c),
          gap: me,
          reserve: a,
          roll: u,
          children: b
        }
      )
    }
  );
}
function Ir({
  checked: n,
  indeterminate: e = !1,
  disabled: t = !1,
  indicator: r = "box",
  size: i,
  className: o = ""
}) {
  const s = He(), l = i ?? P(14, 18, s);
  return r === "check" ? /* @__PURE__ */ h(
    "span",
    {
      "data-selection-check": "check",
      className: `inline-flex shrink-0 items-center justify-center ${t ? "opacity-40" : ""} ${o}`,
      style: { width: l, height: l },
      "aria-hidden": !0,
      children: e ? /* @__PURE__ */ h(Ol, { size: l, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : n ? /* @__PURE__ */ h(lr, { size: l, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : null
    }
  ) : /* @__PURE__ */ h(
    "span",
    {
      "data-selection-check": "box",
      className: `inline-flex shrink-0 items-center justify-center ${t ? "opacity-40" : ""} ${o}`,
      "aria-hidden": !0,
      children: /* @__PURE__ */ h($i, { checked: n, indeterminate: e, size: l })
    }
  );
}
function us({
  count: n,
  max: e,
  hiddenCount: t = 0,
  onClear: r,
  hero: i,
  clear: o = !0,
  theme: s,
  className: l = ""
}) {
  const c = He(), a = P(10, 14, c), u = P(6, 9, c), d = P(11, 13, c), f = s === "light" ? "light" : "dark", p = s === "emerald" ? "emerald" : s === "blue" ? !0 : void 0, m = e !== void 0 ? `${n} of ${e} selected` : `${n} selected`;
  return /* @__PURE__ */ R(
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
        /* @__PURE__ */ R(
          "span",
          {
            "data-selection-count": !0,
            className: "min-w-0 flex-1 truncate tabular-nums text-[color:var(--ui-text-muted)]",
            style: { fontSize: d },
            children: [
              m,
              t > 0 && /* @__PURE__ */ R("span", { className: "text-[color:var(--ui-text-faint)]", children: [
                " · ",
                t,
                " hidden by filter"
              ] })
            ]
          }
        ),
        o && /* @__PURE__ */ h(
          Et,
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
          Et,
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
const zi = Ut("dark"), ds = () => Gt(zi), Di = Ut({ "data-theme": "dark" }), Lc = () => Gt(Di);
function Pi() {
  const n = He();
  return {
    padding: `${P(8, 12, n)}px ${P(12, 16, n)}px`,
    fontSize: `${P(12, 14, n)}px`,
    lineHeight: `${P(18, 22, n)}px`
  };
}
function fs() {
  const n = He();
  return {
    padding: `${P(6, 9, n)}px ${P(12, 16, n)}px ${P(2, 3, n)}px`,
    fontSize: `${P(10, 11, n)}px`,
    lineHeight: `${P(14, 16, n)}px`
  };
}
const Oc = (n) => n ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", co = (n) => n ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", Fc = (n) => n ? "text-xs" : "text-[10px]";
function Kr(n) {
  const e = rt && Vo() > 0;
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
    headerPad: co(e),
    headerText: `${co(e)} font-semibold uppercase tracking-wider ${Fc(e)} ui-label`,
    // Item padding
    itemPad: Oc(e),
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
function hs(n) {
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
const Li = Ut({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), ur = Ut(null), Oi = () => Gt(ur), ps = Ut({ query: "", setQuery: () => {
} }), Bc = () => Gt(ps), ms = Ut(null), Hc = () => Gt(ms), _c = () => !0;
function Jr(n) {
  const e = v([]), [t, r] = oe(-1), [i, o] = oe(!1), [s, l] = oe(0), c = ie((f) => (e.current = [...e.current, f], l((p) => p + 1), () => {
    e.current = e.current.filter((p) => p !== f), l((p) => p + 1);
  }), []), a = ie((f, p) => {
    r(f), o(p === "pointer");
  }, []), u = ie(() => {
    o((f) => f && (r(-1), !1));
  }, []);
  return tt(() => ({
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
function gs(n) {
  const e = Oi(), t = v(e);
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
function Fi(n, e, t, r) {
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
    var g, b, x, D, E, S;
    if (!s.current) return;
    const d = (g = l.current) == null ? void 0 : g.onSelectAll;
    if (d && (u.metaKey || u.ctrlKey) && u.key.toLowerCase() === "a") {
      u.preventDefault(), u.stopImmediatePropagation(), d();
      return;
    }
    const f = u.target;
    if (!!f && !!f.closest("input, textarea, [contenteditable]") && (u.key.length === 1 || u.key === "Enter" || u.key === "Escape")) {
      const N = (x = (b = l.current) == null ? void 0 : b.onFieldKey) == null ? void 0 : x.call(b, u);
      (!!((D = l.current) != null && D.onFieldKey) || o.current.items.length > 0) && (u.stopImmediatePropagation(), N && u.preventDefault());
      return;
    }
    const m = o.current.items;
    if (m.length !== 0) {
      if (u.key === "ArrowDown" || u.key === "ArrowUp") {
        u.preventDefault(), u.stopImmediatePropagation();
        const N = u.key === "ArrowDown" ? 1 : -1, T = (i.current + N + m.length) % m.length;
        o.current.setHighlighted(T, "keyboard");
      } else if (u.key === "ArrowRight") {
        u.preventDefault(), u.stopImmediatePropagation();
        const N = i.current;
        N >= 0 && N < m.length && m[N].submenu && m[N].activate();
      } else if (u.key === "ArrowLeft")
        u.preventDefault(), u.stopImmediatePropagation(), (S = (E = l.current) == null ? void 0 : E.onCloseSub) == null || S.call(E);
      else if (u.key === "Enter" || u.key === " ") {
        u.preventDefault(), u.stopImmediatePropagation();
        const N = i.current;
        N >= 0 && N < m.length && m[N].activate();
      } else if (u.key.length === 1 && !u.ctrlKey && !u.metaKey && !u.altKey) {
        u.preventDefault(), u.stopImmediatePropagation();
        const N = Date.now(), T = (N - c.current.time > 500 ? "" : c.current.text) + u.key.toLowerCase();
        if (c.current = { text: T, time: N }, !T) return;
        const H = i.current + 1;
        for (let q = 0; q < m.length; q++) {
          const C = (H + q) % m.length;
          if (m[C].label.toLowerCase().startsWith(T)) {
            o.current.setHighlighted(C, "keyboard");
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
function Hi(n, e) {
  const t = v(n);
  t.current = n;
  const r = v(!1);
  r.current || (r.current = !0, e.current = (i) => {
    if (!t.current) return;
    const o = i.currentTarget, s = o.querySelector("[data-menu-items]") ?? o;
    s.scrollHeight > s.clientHeight && (i.preventDefault(), s.scrollTop += i.deltaY);
  });
}
function Vr({
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
  const D = Xt(), E = rs(s, D), S = E.theme, [N, T] = oe([]), [H, q] = oe(null), C = Vn(), K = Ci(), w = v(null), I = v(null), F = v(n);
  F.current = n;
  const [U, j] = oe(n), [M, W] = oe(""), Y = f && g !== void 0, ue = Y ? g : M, ve = Y ? b ?? (() => {
  }) : W, A = v(g ?? "");
  le(() => {
    n || (A.current = g ?? "");
  }, [n, g]);
  const ge = Y && ue === A.current ? "" : ue, me = Ll(), te = v(null), X = He(), Q = {
    padding: `${P(8, 12, X)}px ${P(12, 16, X)}px`,
    fontSize: `${P(12, 14, X)}px`
  }, [ye, se] = oe(0), B = f && !Y;
  le(() => {
    var Ye;
    if (!B || !n) return;
    const $ = (Ye = I.current) == null ? void 0 : Ye.querySelector("[data-menu-items]");
    if (!$) return;
    const G = () => se($.offsetWidth - $.clientWidth);
    G();
    const fe = new ResizeObserver(G);
    return fe.observe($), () => fe.disconnect();
  }, [n, B, ue]);
  const L = tt(() => {
    if (!f) return;
    const $ = ge.trim().toLowerCase();
    return $ ? (G) => {
      var fe;
      return m ? m($, G.label, G.group) : G.label.toLowerCase().includes($) || (((fe = G.group) == null ? void 0 : fe.toLowerCase().includes($)) ?? !1);
    } : _c;
  }, [ge, f, m]), V = Jr(L), je = f && ge.trim() !== "" && V.items.length === 0, Ne = !!x, he = V.allItems.map(($) => $.itemId).filter(($) => !!$), We = V.items.map(($) => $.itemId).filter(($) => !!$), Te = ss({
    mode: "draft",
    selectedIds: (x == null ? void 0 : x.selectedIds) ?? cs,
    itemIds: he,
    visibleIds: We,
    max: x == null ? void 0 : x.max,
    disabledIds: x == null ? void 0 : x.disabledIds,
    indicator: x == null ? void 0 : x.indicator,
    onCommit: x == null ? void 0 : x.onCommit
  }), Fe = v(Te.reset);
  Fe.current = Te.reset;
  const Be = typeof (x == null ? void 0 : x.commitLabel) == "function" ? x.commitLabel(Te.count) : (x == null ? void 0 : x.commitLabel) ?? `Select ${Te.count}`;
  le(() => {
    if (n)
      return j(!0), Y || W(""), V.setHighlighted(d ?? -1, "keyboard"), Fe.current(), ts(() => {
        t == null || t(!1), e == null || e();
      });
    T([]);
  }, [n, d, t, e]), le(() => {
    if (!n || !K) return;
    const $ = (G) => {
      if (G.pointerType !== "touch") return;
      const fe = G.target;
      fe && (I.current && I.current.contains(fe) || w.current && w.current.contains(fe) || fe instanceof Element && fe.closest("[data-radix-menu-content]") || (t == null || t(!1), e == null || e()));
    };
    return K.addEventListener("pointerdown", $, { capture: !0 }), () => K.removeEventListener("pointerdown", $, { capture: !0 });
  }, [n, K, t, e]);
  const ne = ie(() => {
    const $ = w.current;
    if (!$) return null;
    const G = $.getBoundingClientRect();
    return { left: G.left, top: G.top, width: G.width, height: G.height };
  }, []), _e = qr({
    visible: n,
    morph: c,
    anchor: ne,
    onClosed: () => j(!1)
  }), Se = v(() => {
  }), Xe = v(() => {
  }), bt = v(() => {
  }), we = ie(($) => {
    if ($.key === "Enter") {
      const G = V.highlightedIndex, fe = V.items[G >= 0 ? G : 0];
      return fe == null || fe.activate(), !0;
    }
    return $.key === "Escape" ? (t == null || t(!1), e == null || e(), !0) : !1;
  }, [V, t, e]);
  Fi(n && N.length === 0, V, Se, {
    onFieldKey: we,
    onSelectAll: Ne ? () => Te.setAll(!0) : void 0
  }), Hi(n, Xe), Bi(n, V, Se, I, N.length > 0, bt, {
    ignoreFields: Y,
    selectAll: Ne
  });
  const qe = v(null), yt = ie(($) => {
    var G;
    if ($) {
      $.addEventListener("keydown", Se.current, { capture: !0 }), $.addEventListener("wheel", Xe.current, { passive: !1 });
      const fe = $.ownerDocument;
      qe.current = fe, fe.addEventListener("keydown", bt.current, { capture: !0 }), Qe(!0);
    } else
      (G = qe.current) == null || G.removeEventListener("keydown", bt.current, { capture: !0 }), qe.current = null, Qe(!1);
    I.current = $, _e($);
  }, [_e]), [Ee, Bt] = oe({ top: 0, left: 0, maxH: Zo, side: "bottom", ready: !1 }), [Ht, Dt] = oe(0), [De, Qe] = oe(!1);
  le(() => {
    n && w.current && Dt(w.current.getBoundingClientRect().width);
  }, [n]), es({
    anchorRef: w,
    panelRef: I,
    open: n && De,
    maxHeight: u,
    onPosition: Bt
  }), le(() => {
    var $;
    if (Ee.ready && n) {
      if (f) {
        ($ = te.current ?? w.current) == null || $.focus();
        return;
      }
      const G = I.current;
      G && G.ownerDocument.activeElement !== G && !G.contains(G.ownerDocument.activeElement) && G.focus();
    }
  }, [Ee.ready, n, f]), le(() => {
    if (!n || !f) return;
    if (V.items.length === 0) {
      V.highlightedIndex !== -1 && V.setHighlighted(-1, "keyboard");
      return;
    }
    const $ = V.highlightedIndex;
    ($ < 0 || $ >= V.items.length) && V.setHighlighted(0, "keyboard");
  }, [n, ue, f, V.items.length]), ut(() => {
    var G;
    if (!n || V.highlightedIndex < 0 || V.pointerDriven) return;
    const $ = (G = I.current) == null ? void 0 : G.querySelector(`[data-ei="${V.highlightedIndex}"]`);
    on($, "nearest");
  }, [n, V.highlightedIndex, V.pointerDriven]);
  const it = ie(($) => {
    if (!(!$ && !F.current)) {
      if (!$ && ft.current) {
        if (Y) return;
        pt.current = !0;
      }
      t ? t($) : $ || e == null || e();
    }
  }, [t, e]), Rt = v(U);
  Rt.current = U;
  const ft = v(!1), pt = v(!1), At = ie(() => {
    if (!F.current && Rt.current) {
      if (pt.current) {
        pt.current = !1, ft.current = !1;
        return;
      }
      t == null || t(!0);
    }
  }, [t]), Pe = lt.isValidElement(r) ? r : null, mt = v(!1), Ze = ie(() => {
    const $ = w.current;
    $ && (mt.current = !0, $.focus(), setTimeout(() => {
      mt.current = !1;
    }, 0));
  }, []), _t = Pe ? lt.cloneElement(Pe, {
    ref: ($) => {
      w.current = $;
      const G = Pe.props.ref;
      typeof G == "function" ? G($) : G && (G.current = $);
    },
    /* Radix's trigger primitive merges `type="button"` onto the child; a
       text field trigger-as-search must stay a text field. */
    ...Y ? { type: Pe.props.type ?? "text" } : {},
    ...Y ? {
      /* A text field that opens a list IS a combobox, and the highlighted
         row must be announced — the field is outside the popup, so the
         only link screen readers get is `aria-activedescendant`. */
      role: "combobox",
      "aria-autocomplete": "list",
      "aria-controls": n ? `${me}-content` : void 0,
      "aria-activedescendant": n && V.highlightedIndex >= 0 ? `${me}-opt-${V.highlightedIndex}` : void 0
    } : {},
    onPointerDownCapture: ($) => {
      var G, fe;
      (fe = (G = Pe.props).onPointerDownCapture) == null || fe.call(G, $), ft.current = !0, pt.current = !1, setTimeout(() => {
        ft.current = !1;
      }, 0);
    },
    onPointerDown: ($) => {
      var G, fe;
      if ((fe = (G = Pe.props).onPointerDown) == null || fe.call(G, $), Y) {
        $.preventDefault();
        const Ye = F.current;
        Ye || t == null || t(!0);
        const et = w.current;
        et == null || et.focus(), !Ye && et instanceof HTMLInputElement && et.select();
      }
    },
    /* Space is a printable search character, but Radix treats it as the
       trigger's open/close key. Keep it in the field. */
    onKeyDownCapture: ($) => {
      var G, fe;
      (fe = (G = Pe.props).onKeyDownCapture) == null || fe.call(G, $), Y && $.key === " " && $.stopPropagation();
    },
    onClick: ($) => {
      var G, fe;
      (fe = (G = Pe.props).onClick) == null || fe.call(G, $), At();
    },
    /* A kit-driven focus restore is not a user focus (see above). */
    onFocus: ($) => {
      var G, fe;
      if (mt.current) {
        mt.current = !1;
        return;
      }
      (fe = (G = Pe.props).onFocus) == null || fe.call(G, $);
    },
    /* Focus leaving the field ends the search session: Tab (or any focus
       move that does not land in the panel) must close the list, not leave
       an orphan panel floating with the keyboard elsewhere. The panel's
       own focused row is legitimate — keep it open for the pending click. */
    onBlur: ($) => {
      var fe, Ye, et, vt;
      if ((Ye = (fe = Pe.props).onBlur) == null || Ye.call(fe, $), !Y || !F.current) return;
      const G = $.relatedTarget;
      G && ((et = I.current) != null && et.contains(G) || (vt = w.current) != null && vt.contains(G)) || setTimeout(() => {
        var ee;
        const wt = w.current;
        if (!wt || !F.current) return;
        const k = wt.ownerDocument.activeElement;
        k && (wt.contains(k) || (ee = I.current) != null && ee.contains(k)) || (t == null || t(!1), e == null || e());
      }, 0);
    },
    /* Combobox mode (externalSearch): the trigger field IS the search box,
       so it also drives the menu's keyboard — arrows move the single
       highlight and Enter activates the highlighted (or first visible)
       row. Filtering itself follows the VALUE (see filterQuery), so no
       input method is special-cased here. */
    onKeyDown: ($) => {
      var G, fe;
      if ((fe = (G = Pe.props).onKeyDown) == null || fe.call(G, $), !(!Y || !F.current)) {
        if ($.key === "ArrowDown" || $.key === "ArrowUp") {
          $.preventDefault();
          const Ye = V.items;
          if (Ye.length === 0) return;
          const et = $.key === "ArrowDown" ? 1 : -1, vt = (V.highlightedIndex + et + Ye.length) % Ye.length;
          V.setHighlighted(vt, "keyboard");
        } else if ($.key === "Enter") {
          $.preventDefault();
          const Ye = V.highlightedIndex, et = V.items[Ye >= 0 ? Ye : 0];
          et == null || et.activate();
        }
      }
    }
  }) : r, It = /* @__PURE__ */ R("div", { "data-menu-search-empty": !0, className: "px-3 py-3 text-center", children: [
    /* @__PURE__ */ R("div", { className: "text-xs font-medium text-[color:var(--ui-text-muted)]", children: [
      "No matches for “",
      ge.trim(),
      "”"
    ] }),
    /* @__PURE__ */ h("div", { className: "mt-0.5 text-[10px] text-[color:var(--ui-text-faint)]", children: "Try a different search." })
  ] }), Ke = B || Ne, $t = `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] min-w-0 ${Ke ? "overflow-hidden" : "overflow-y-auto scrollbar-custom"}`;
  return /* @__PURE__ */ R(Oe.Root, { open: n || U, onOpenChange: it, modal: !1, children: [
    /* @__PURE__ */ h(Oe.Trigger, { asChild: !0, children: _t }),
    /* @__PURE__ */ h(Oe.Portal, { container: C ?? void 0, children: /* @__PURE__ */ h(zi.Provider, { value: S, children: /* @__PURE__ */ h(Di.Provider, { value: E.attrs, children: /* @__PURE__ */ h(Li.Provider, { value: { chain: N, setChain: T, morph: c, keyboardOpened: H, setKeyboardOpened: q }, children: /* @__PURE__ */ h(ur.Provider, { value: V, children: /* @__PURE__ */ h(ps.Provider, { value: { query: ue, setQuery: ve }, children: /* @__PURE__ */ h(ls.Provider, { value: Ne ? Te : null, children: /* @__PURE__ */ h(ms.Provider, { value: me, children: /* @__PURE__ */ R(
      Oe.Content,
      {
        id: `${me}-content`,
        ref: yt,
        tabIndex: Y ? void 0 : -1,
        ...E.attrs,
        "data-ui-fixed": !0,
        className: `${$t} ${o || ""} ${a || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: Ee.left,
          top: Ee.top,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: o ? void 0 : Ht || void 0,
          maxHeight: Ee.maxH,
          visibility: Ee.ready ? "visible" : "hidden"
        },
        onPointerLeave: V.pointerLeave,
        onFocusCapture: Y ? ($) => {
          $.target === $.currentTarget && ($.stopPropagation(), Ze());
        } : void 0,
        onFocusOutside: Y ? ($) => {
          var fe;
          const G = $.target;
          G && (G === w.current || (fe = w.current) != null && fe.contains(G)) && $.preventDefault();
        } : void 0,
        onCloseAutoFocus: Y ? ($) => {
          $.preventDefault(), Ze();
        } : void 0,
        children: [
          B && /* @__PURE__ */ h("div", { className: "shrink-0 px-0 pt-1 pb-1", style: { paddingRight: ye }, children: /* @__PURE__ */ R("div", { "data-menu-search": !0, className: "ui-item ui-item-highlighted flex items-center gap-2 rounded", style: Q, children: [
            /* @__PURE__ */ h(On, { className: "w-3.5 h-3.5 shrink-0 ui-icon" }),
            /* @__PURE__ */ h(
              "input",
              {
                ref: te,
                value: ue,
                onChange: ($) => ve($.target.value),
                placeholder: p ?? "Search…",
                className: "flex-1 min-w-0 bg-transparent outline-none text-current placeholder:text-current placeholder:opacity-50 cursor-text"
              }
            ),
            ue ? /* @__PURE__ */ h(
              "button",
              {
                type: "button",
                tabIndex: -1,
                "aria-label": "Clear search",
                className: "shrink-0 ui-icon-btn rounded flex items-center justify-center p-1 -m-1",
                onPointerDown: ($) => $.stopPropagation(),
                onClick: () => {
                  var $;
                  ve(""), ($ = te.current) == null || $.focus();
                },
                children: /* @__PURE__ */ h(Sn, { className: "w-3.5 h-3.5" })
              }
            ) : /* @__PURE__ */ h("span", { className: "w-3.5 h-3.5 shrink-0" })
          ] }) }),
          Ke ? /* @__PURE__ */ R("div", { "data-menu-items": !0, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: [
            l,
            je && It
          ] }) : /* @__PURE__ */ R(ct, { children: [
            l,
            je && It
          ] }),
          Ne && (x == null ? void 0 : x.footer) !== !1 && /* @__PURE__ */ h(
            us,
            {
              count: Te.count,
              max: x == null ? void 0 : x.max,
              hiddenCount: (x == null ? void 0 : x.hiddenNote) === !1 ? 0 : Te.hiddenCount,
              clear: (x == null ? void 0 : x.clear) !== !1,
              theme: S,
              onClear: Te.clear,
              hero: {
                label: Be,
                onClick: () => {
                  Te.commit(), it(!1);
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
function wh({
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
  header: D,
  itemLabel: E,
  trigger: S,
  minItems: N = 1,
  itemRender: T,
  morph: H = !0,
  contentClassName: q
}) {
  const C = Kr(), K = Pi(), [w, I] = oe(null), [F, U] = oe(""), j = v(F);
  j.current = F;
  const M = v(null), W = v(null), [Y, ue] = oe(null), ve = ie((Q) => {
    W.current = Q, ue(Q);
  }, []), A = is({
    open: n,
    scroller: () => W.current,
    row: () => {
      var Q;
      return ((Q = W.current) == null ? void 0 : Q.querySelector('[data-active="1"]')) ?? null;
    }
  });
  le(() => {
    if (!n) return;
    const Q = (se) => {
      var We, Te;
      const B = se.target;
      if (B && B.closest("input, textarea, [contenteditable]")) {
        w && B === M.current && (se.key === "Enter" ? (se.preventDefault(), se.stopImmediatePropagation(), me()) : se.key === "Escape" && (se.preventDefault(), se.stopImmediatePropagation(), te()));
        return;
      }
      const L = (We = W.current) == null ? void 0 : We.closest(".ui-menu");
      if (!L || !L.contains(se.target)) return;
      const V = L.ownerDocument, je = [...L.querySelectorAll('[data-im-row] > [role="menuitem"]:first-child')], Ne = [...L.querySelectorAll(':scope > div:last-child > [role="menuitem"]')], he = [...je, ...Ne];
      if (se.key === "ArrowDown" || se.key === "ArrowUp") {
        se.preventDefault(), se.stopImmediatePropagation();
        const Fe = V.activeElement;
        let Be = Fe ? he.indexOf(Fe) : -1;
        if (Be < 0 && Fe) {
          const Xe = Fe.closest("[data-im-row]"), bt = Xe == null ? void 0 : Xe.querySelector('[role="menuitem"]:first-child');
          bt && (Be = je.indexOf(bt));
        }
        const ne = se.key === "ArrowDown" ? 1 : -1, _e = Be < 0 ? ne === 1 ? 0 : he.length - 1 : (Be + ne + he.length) % he.length, Se = he[_e];
        Se == null || Se.focus({ preventScroll: !0 }), on((Se == null ? void 0 : Se.closest("[data-im-row]")) ?? Se, "nearest", W.current);
        return;
      }
      if (se.key === "ArrowLeft" || se.key === "ArrowRight") {
        const Fe = V.activeElement, Be = Fe == null ? void 0 : Fe.closest("[data-im-row]");
        if (!Be) return;
        se.preventDefault(), se.stopImmediatePropagation();
        const ne = [...Be.querySelectorAll('[role="menuitem"]')].slice(1);
        if (ne.length === 0) return;
        const _e = Fe && Be.contains(Fe) ? ne.indexOf(Fe) : -1, Se = se.key === "ArrowRight" ? 1 : -1, Xe = _e < 0 ? 0 : (_e + Se + ne.length) % ne.length;
        (Te = ne[Xe]) == null || Te.focus({ preventScroll: !0 });
        return;
      }
    }, ye = (Y == null ? void 0 : Y.ownerDocument) ?? null;
    return ye == null || ye.addEventListener("keydown", Q, { capture: !0 }), () => ye == null ? void 0 : ye.removeEventListener("keydown", Q, { capture: !0 });
  }, [n, w, Y]), le(() => {
    if (!w) return;
    const Q = t.find((L) => L.id === w);
    Q && !F && U(Q.name);
    const ye = requestAnimationFrame(() => {
      const L = M.current;
      L && (L.focus(), L.select());
    });
    let se = 0;
    const B = window.setInterval(() => {
      const L = M.current;
      if (se++, !L || se > 12) {
        clearInterval(B);
        return;
      }
      L.ownerDocument.activeElement !== L && (L.focus(), L.select());
    }, 50);
    return () => {
      cancelAnimationFrame(ye), clearInterval(B);
    };
  }, [w]), le(() => {
    if (w) {
      const Q = t.find((ye) => ye.id === w);
      Q && !F && U(Q.name);
    }
  }, [w, t]);
  const ge = (Q, ye) => {
    I(Q), U(ye);
  }, me = () => {
    w && j.current.trim() && o(w, j.current.trim()), I(null);
  }, te = () => {
    I(null);
  }, X = E || D.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ R(Vr, { open: n, onOpenChange: (Q) => {
    Q ? (I(null), U("")) : (w && F.trim() && o(w, F.trim()), I(null), U("")), (!Q || !m) && e(Q);
  }, width: "w-80", theme: g, align: b, trigger: S, morph: H, contentClassName: q, children: [
    /* @__PURE__ */ h("div", { className: `shrink-0 ${C.headerText}`, children: D }),
    /* @__PURE__ */ h("div", { ref: ve, "data-im-list": !0, onPointerEnter: A.engage, onPointerDown: A.engage, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: t.map((Q) => {
      const ye = Q.id === r, se = w === Q.id;
      return /* @__PURE__ */ h("div", { "data-im-row": Q.id, "data-active": ye ? "1" : void 0, className: `scroll-my-4 flex items-center gap-1 rounded ${ye || se ? C.rowActiveBg : C.rowHoverBg} ${w && !se ? "opacity-40 pointer-events-none" : ""}`, children: se ? /* @__PURE__ */ R(ct, { children: [
        /* @__PURE__ */ h("div", { className: "flex-1 min-w-0 flex items-center", children: /* @__PURE__ */ h(
          "input",
          {
            ref: M,
            autoFocus: !0,
            value: F,
            onChange: (B) => U(B.target.value),
            onKeyDown: (B) => {
              B.key === "Enter" && (B.preventDefault(), B.stopPropagation(), me()), B.key === "Escape" && (B.preventDefault(), B.stopPropagation(), te());
            },
            className: "w-full outline-none bg-transparent placeholder:text-current placeholder:opacity-50",
            style: K
          }
        ) }),
        /* @__PURE__ */ h(
          Oe.Item,
          {
            className: `shrink-0 ${C.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${C.editConfirm}`,
            onSelect: (B) => {
              B.preventDefault(), me();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ h(lr, { className: C.btnIcon })
          }
        ),
        /* @__PURE__ */ h(
          Oe.Item,
          {
            className: `shrink-0 ${C.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${C.editCancel}`,
            onSelect: (B) => {
              B.preventDefault(), te();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ h(Sn, { className: C.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ R(ct, { children: [
        /* @__PURE__ */ h(
          Oe.Item,
          {
            style: K,
            className: `flex-1 min-w-0 rounded outline-none cursor-pointer flex items-center ${C.rowText} ${ye ? "" : C.rowTextHover}`,
            onSelect: p ? () => {
              i(Q.id);
            } : (B) => {
              B.preventDefault(), i(Q.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ h("span", { className: `truncate ${ye ? C.rowActiveText : ""}`, children: T ? T(Q) : Q.name })
          }
        ),
        /* @__PURE__ */ h(
          Oe.Item,
          {
            className: `shrink-0 ${C.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${ye ? C.btnActive : C.btnBase}`,
            onSelect: (B) => {
              B.preventDefault(), ge(Q.id, Q.name);
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: /* @__PURE__ */ h(Fl, { className: C.btnIcon })
          }
        ),
        /* @__PURE__ */ h(
          Oe.Item,
          {
            className: `shrink-0 ${C.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${ye ? C.btnActive : C.btnBase}`,
            onSelect: (B) => {
              B.preventDefault();
              const L = s(Q.id);
              L && ge(L, `${Q.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: /* @__PURE__ */ h(jo, { className: C.btnIcon })
          }
        ),
        /* @__PURE__ */ h(
          Oe.Item,
          {
            className: `shrink-0 ${C.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${t.length <= N ? C.btnDisabled : ye ? C.btnDangerActive : C.btnDanger}`,
            onSelect: (B) => {
              B.preventDefault(), l(Q.id);
            },
            onTouchStart: () => {
            },
            disabled: m || t.length <= N,
            children: /* @__PURE__ */ h(hi, { className: C.btnIcon })
          }
        )
      ] }) }, Q.id);
    }) }),
    /* @__PURE__ */ R("div", { className: `shrink-0 ${w ? "opacity-40 pointer-events-none" : ""}`, children: [
      d && /* @__PURE__ */ R(ct, { children: [
        /* @__PURE__ */ h(Oe.Separator, { className: C.separator }),
        /* @__PURE__ */ R(
          Oe.Item,
          {
            className: `w-full text-left ${C.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${C.itemDefault} ui-row`,
            onSelect: (Q) => {
              Q.preventDefault(), d();
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: [
              /* @__PURE__ */ h(Wo, { className: `${C.btnIcon} ${C.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (c || a || u || f) && /* @__PURE__ */ h(Oe.Separator, { className: C.separator }),
      c && /* @__PURE__ */ R(
        Oe.Item,
        {
          className: `w-full text-left ${C.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${C.itemDefault} ui-row`,
          onSelect: (Q) => {
            Q.preventDefault();
            const ye = c();
            ye && ge(ye, "");
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ h(_r, { className: `${C.btnIcon} ${C.icon}` }),
            "New ",
            X
          ]
        }
      ),
      a && /* @__PURE__ */ R(
        Oe.Item,
        {
          className: `w-full text-left ${C.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${C.itemDefault} ui-row`,
          onSelect: (Q) => {
            Q.preventDefault(), a();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ R("svg", { className: `${C.btnIcon} ${C.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ h("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ h("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ h("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      u && /* @__PURE__ */ R(
        Oe.Item,
        {
          className: `w-full text-left ${C.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${C.itemDefault} ui-row`,
          onSelect: (Q) => {
            Q.preventDefault(), u();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ R("svg", { className: `${C.btnIcon} ${C.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ h("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ h("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ h("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      f && /* @__PURE__ */ R(
        Oe.Item,
        {
          className: `w-full text-left ${C.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${C.itemDefault} ui-row`,
          onSelect: (Q) => {
            Q.preventDefault(), f();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ h(hi, { className: `${C.btnIcon} ${C.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
function jc({
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
  var W;
  ds();
  const f = Kr(), p = Pi(), m = fs(), g = v(!1), b = v(null), x = Ac(), D = !!x && d !== void 0, E = x && d !== void 0 ? x.isSelected(d) : l, S = t || (x && d !== void 0 ? !x.canToggle(d) : !1), { myIndex: N, highlighted: T, setPointer: H, api: q } = gs({
    label: () => hs(o),
    activate: () => {
      S || (x && d !== void 0 ? x.toggle(d) : n());
    },
    disabled: S,
    group: u,
    itemId: d
  }), { query: C } = Bc(), K = C.trim() !== "" && N < 0, w = Hc(), I = u == null ? void 0 : u.trim(), F = !!I && N >= 0 && (N === 0 || ((W = q == null ? void 0 : q.items[N - 1]) == null ? void 0 : W.group) !== I), U = I && x ? ((q == null ? void 0 : q.items) ?? []).filter((Y) => Y.group === I && Y.itemId).map((Y) => Y.itemId).filter((Y) => !x.isDisabled(Y)) : [], j = x && U.length > 0 ? x.groupState(U) : "none", M = r === "danger" ? f.itemDanger : f.itemDefault;
  return /* @__PURE__ */ R(ct, { children: [
    F && /* @__PURE__ */ h(
      "div",
      {
        "data-menu-group": I,
        role: "presentation",
        className: `ui-label shrink-0 select-none font-semibold uppercase tracking-wider ${x && U.length > 0 ? "" : "pointer-events-none"}`,
        style: m,
        children: x && U.length > 0 ? /* @__PURE__ */ R("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `Select all ${I}`,
              onMouseDown: (Y) => Y.preventDefault(),
              onClick: () => x.toggleGroup(U),
              className: "flex shrink-0 cursor-pointer items-center justify-center rounded pointer-events-auto",
              children: /* @__PURE__ */ h(
                Ir,
                {
                  checked: j === "all",
                  indeterminate: j === "some",
                  indicator: x.indicator
                }
              )
            }
          ),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: I })
        ] }) : I
      }
    ),
    /* @__PURE__ */ R(
      Oe.Item,
      {
        ref: b,
        id: w && N >= 0 ? `${w}-opt-${N}` : void 0,
        "data-ei": N >= 0 ? N : void 0,
        ...D ? { role: "menuitemcheckbox", "aria-checked": E } : {},
        style: { ...p, display: K ? "none" : void 0 },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${M} ${D ? "" : l ? "ui-item-selected" : ""} ${T ? "ui-item-highlighted" : ""} ${S ? "opacity-30 pointer-events-none" : ""} ${i}`,
        onSelect: (Y) => {
          if (g.current) {
            g.current = !1;
            return;
          }
          if (D) {
            Y.preventDefault(), x && d !== void 0 && x.toggle(d);
            return;
          }
          s && Y.preventDefault(), n();
        },
        onPointerEnter: () => {
          H(N);
        },
        onTouchStart: () => {
        },
        disabled: S,
        children: [
          D && /* @__PURE__ */ h(Ir, { checked: E, disabled: S, indicator: x.indicator }),
          e && /* @__PURE__ */ h("span", { className: `${f.icon} shrink-0`, children: e }),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: o }),
          a && /* @__PURE__ */ h("span", { className: "shrink-0 ml-1 flex items-center", children: a }),
          c && /* @__PURE__ */ h(
            "span",
            {
              className: `shrink-0 ml-1 p-0.5 rounded ${f.rightAction}`,
              title: c.title,
              onPointerDown: (Y) => {
                Y.stopPropagation(), Y.preventDefault(), g.current = !0, c.onClick();
              },
              onClick: (Y) => {
                Y.stopPropagation(), Y.preventDefault();
              },
              children: c.icon
            }
          )
        ]
      }
    )
  ] });
}
function Wc({ id: n, label: e, icon: t, width: r, side: i = "right", children: o, contentClassName: s }) {
  const { chain: l, setChain: c, morph: a, keyboardOpened: u, setKeyboardOpened: d } = Gt(Li), f = l.includes(n), p = l[l.length - 1] === n;
  ds();
  const m = Lc(), g = Vn(), b = v(null), x = v(null), [D, E] = oe(f), S = !f && D;
  le(() => {
    f && E(!0);
  }, [f]);
  const N = () => c((te) => {
    const X = te.indexOf(n);
    return X >= 0 ? te.slice(0, X) : te;
  }), T = Jr(), H = Oi(), q = v(H);
  q.current = H;
  const C = v(null);
  le(() => {
    var X;
    const te = {
      label: e,
      activate: () => {
        d(n), c((Q) => Q.includes(n) ? Q : [...Q, n]);
      },
      submenu: !0
    };
    return C.current = te, (X = q.current) == null ? void 0 : X.register(te);
  }, []);
  const K = H && C.current ? H.items.indexOf(C.current) : -1, w = K >= 0 && K === H.highlightedIndex, I = ie(() => {
    const te = b.current;
    if (!te) return null;
    const X = te.getBoundingClientRect();
    return { left: X.left, top: X.top, width: X.width, height: X.height };
  }, []), F = qr({
    visible: f,
    morph: a,
    anchor: I,
    onClosed: () => E(!1)
  }), U = v(() => {
  }), j = v(() => {
  }), M = v(() => {
  });
  Fi(f && p, T, U, {
    onCloseSub: () => {
      N(), H && K >= 0 && H.setHighlighted(K, "keyboard");
    }
  });
  const W = v(u);
  W.current = u, le(() => {
    f && (W.current === n ? (T.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var te;
      return (te = x.current) == null ? void 0 : te.focus();
    }), d(null)) : T.setHighlighted(-1, "keyboard"));
  }, [f]), Hi(f, j), Bi(f, T, U, x, !p, M), lt.useLayoutEffect(() => {
    var X;
    if (!f || T.highlightedIndex < 0 || T.pointerDriven) return;
    const te = (X = x.current) == null ? void 0 : X.querySelector(`[data-ei="${T.highlightedIndex}"]`);
    on(te, "nearest", x.current);
  }, [f, T.highlightedIndex, T.pointerDriven]);
  const Y = v(null), ue = ie((te) => {
    var X;
    if (te) {
      te.addEventListener("keydown", U.current, { capture: !0 }), te.addEventListener("wheel", j.current, { passive: !1 });
      const Q = te.ownerDocument;
      Y.current = Q, Q.addEventListener("keydown", M.current, { capture: !0 });
    } else
      (X = Y.current) == null || X.removeEventListener("keydown", M.current, { capture: !0 }), Y.current = null;
    x.current = te, F(te);
  }, [F]), ve = He(), A = { padding: `${P(8, 12, ve)}px ${P(12, 16, ve)}px`, fontSize: P(12, 14, ve) }, ge = `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${w ? " ui-item-highlighted" : ""}${S ? " ui-sub-closing" : ""}`, me = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${s || ""}`;
  return /* @__PURE__ */ R(Oe.Sub, { open: f || D, onOpenChange: (te) => c((X) => {
    if (!te) {
      const Q = X.indexOf(n);
      return Q >= 0 ? X.slice(0, Q) : X;
    }
    return X.includes(n) ? X : [...X, n];
  }), children: [
    /* @__PURE__ */ R(
      Oe.SubTrigger,
      {
        ref: b,
        "data-ei": K >= 0 ? K : void 0,
        style: A,
        className: ge,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          H && K >= 0 && H.setHighlighted(K, "pointer");
        },
        onPointerDown: (te) => {
          te.pointerType === "pen" && (te.preventDefault(), c((X) => f ? X.slice(0, X.indexOf(n)) : [...X, n]));
        },
        children: [
          i === "left" && /* @__PURE__ */ h(Rr, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ R("span", { className: "flex items-center gap-2", children: [
            t && /* @__PURE__ */ h("span", { className: "ui-icon shrink-0", children: t }),
            e
          ] }),
          i === "right" && /* @__PURE__ */ h(Rr, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ h(Oe.Portal, { container: g ?? void 0, children: /* @__PURE__ */ h(
      Oe.SubContent,
      {
        ref: ue,
        ...m,
        className: me,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: T.pointerLeave,
        children: /* @__PURE__ */ h(ur.Provider, { value: T, children: o })
      }
    ) })
  ] });
}
const Un = 8, kh = ({ open: n, x: e, y: t, onClose: r, children: i, containerRef: o, theme: s, morph: l = !0 }) => {
  const c = Xt(), a = s ? { theme: s, attrs: { "data-theme": s } } : c ? rs(void 0, c) : { theme: "light", attrs: { "data-theme": "light" } }, { theme: u } = a, d = He(), f = P(12, 14, d), p = v(null), m = cr(), [g, b] = oe(!1), [x, D] = oe([]), [E, S] = oe(null), N = Jr();
  le(() => {
    if (n)
      return N.setHighlighted(-1, "keyboard"), ts(r);
  }, [n, r]);
  const T = v({ left: e, top: t });
  n && (T.current = { left: e, top: t });
  const H = ie(() => ({ left: T.current.left, top: T.current.top, width: 0, height: 0 }), []), q = qr({
    visible: !0,
    morph: l,
    anchor: H,
    cloneOnUnmount: !0
  }), C = v(() => {
  }), K = v(() => {
  }), w = v(() => {
  });
  Fi(n, N, C), ut(() => {
    if (!n || N.highlightedIndex < 0 || N.pointerDriven) return;
    const M = p.current;
    on(
      M == null ? void 0 : M.querySelector(`[data-ei="${N.highlightedIndex}"]`),
      "nearest",
      M
    );
  }, [n, N.highlightedIndex, N.pointerDriven]), Hi(n, K), Bi(n, N, C, p, x.length > 0, w);
  const I = v(null), F = ie((M) => {
    var W;
    if (M) {
      M.addEventListener("keydown", C.current, { capture: !0 }), M.addEventListener("wheel", K.current, { passive: !1 });
      const Y = M.ownerDocument;
      I.current = Y, Y.addEventListener("keydown", w.current, { capture: !0 });
    } else
      (W = I.current) == null || W.removeEventListener("keydown", w.current, { capture: !0 }), I.current = null;
    p.current = M, b(!!M), q(M);
  }, [q]), [U, j] = oe(null);
  return ut(() => {
    var Q;
    if (!n || !g || !p.current) return;
    const M = p.current, W = M.offsetWidth, Y = M.offsetHeight, ue = (Q = o == null ? void 0 : o.current) == null ? void 0 : Q.getBoundingClientRect(), ve = ue ? ue.right : (m == null ? void 0 : m.innerWidth) ?? 0, A = ue ? ue.bottom : (m == null ? void 0 : m.innerHeight) ?? 0, ge = ue ? ue.left : 0, me = ue ? ue.top : 0;
    let te = Math.max(me + Un, T.current.top), X = Math.max(ge + Un, T.current.left);
    X + W > ve && (X = ve - W - Un), te + Y > A && (te = Math.max(me + Un, A - Y - Un)), j({ left: X, top: te });
  }, [n, g, e, t, o]), n ? /* @__PURE__ */ R(Oe.Root, { open: n, onOpenChange: (M) => {
    M || r();
  }, modal: !1, children: [
    /* @__PURE__ */ h(Oe.Trigger, { asChild: !0, children: /* @__PURE__ */ h("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ h(Oe.Portal, { children: /* @__PURE__ */ h(zi.Provider, { value: u, children: /* @__PURE__ */ h(Di.Provider, { value: a.attrs, children: /* @__PURE__ */ h(Li.Provider, { value: { chain: x, setChain: D, morph: l, keyboardOpened: E, setKeyboardOpened: S }, children: /* @__PURE__ */ h(ur.Provider, { value: N, children: /* @__PURE__ */ h(
      Oe.Content,
      {
        ref: F,
        ...a.attrs,
        "data-ui-fixed": !0,
        className: "fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom",
        style: { fontSize: f, left: (U == null ? void 0 : U.left) ?? T.current.left, top: (U == null ? void 0 : U.top) ?? T.current.top, touchAction: "manipulation" },
        onPointerLeave: N.pointerLeave,
        children: i
      }
    ) }) }) }) }) })
  ] }) : null;
}, Sh = ({ onClick: n, variant: e = "default", icon: t, disabled: r = !1, selected: i = !1, trailing: o, children: s }) => {
  const l = He(), c = { padding: `${P(8, 12, l)}px ${P(12, 16, l)}px`, fontSize: P(12, 14, l) }, a = Oi(), u = v(a);
  u.current = a;
  const d = v(null);
  le(() => {
    var g;
    const m = { label: hs(s), activate: () => {
      r || n();
    } };
    return d.current = m, (g = u.current) == null ? void 0 : g.register(m);
  }, []);
  const f = a && d.current ? a.items.indexOf(d.current) : -1, p = !r && f >= 0 && f === a.highlightedIndex;
  return /* @__PURE__ */ R(
    Oe.Item,
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
}, Nh = () => /* @__PURE__ */ h(Oe.Separator, { className: "ui-sep my-1" }), Th = (n) => /* @__PURE__ */ h(Wc, { ...n, width: n.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), $e = 8, ys = "[data-modal-stack]", nn = 220, tr = "cubic-bezier(0.32, 0.72, 0, 1)", Tr = 0.94;
function Dn() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function cn(n) {
  if (!n) return { top: 0, height: 0, bottom: 0 };
  const e = n.visualViewport, t = e ? e.offsetTop : 0, r = e ? e.height : n.innerHeight;
  return { top: t, height: r, bottom: t + r };
}
function xs(n, e) {
  return `translate(${e.left - n.left}px, ${e.top - n.top}px) scale(${e.width / n.width}, ${e.height / n.height})`;
}
function ao(n, e, t, r) {
  const i = ++n.current, o = e.getBoundingClientRect();
  e.style.transition = "none", e.style.transform = xs(o, t), e.style.transformOrigin = "0 0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === i && (e.style.transition = `transform ${nn}ms ${tr}, opacity 180ms ease`, e.style.transform = "none", window.setTimeout(() => {
        n.current === i && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", r());
      }, nn + 80));
    });
  });
}
function qc(n, e, t) {
  const r = ++n.current;
  e.style.transition = "none", e.style.transformOrigin = "center", e.style.transform = `scale(${Tr})`, e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === r && (e.style.transition = `transform ${nn}ms ${tr}`, e.style.transform = "none", window.setTimeout(() => {
        n.current === r && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", t());
      }, nn + 60));
    });
  });
}
function uo(n, e, t) {
  const r = ++n.current, i = e.getBoundingClientRect(), o = 1 - Tr, s = { left: i.left + i.width * o / 2, top: i.top + i.height * o / 2, width: i.width * Tr, height: i.height * Tr };
  e.style.transition = `transform ${nn}ms ${tr}, opacity 170ms ease`, e.style.transformOrigin = "0 0", e.style.transform = xs(i, s), e.style.opacity = "0", window.setTimeout(() => {
    n.current === r && (e.style.visibility = "hidden", t(), requestAnimationFrame(() => {
      n.current !== r || e.isConnected || (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", e.style.opacity = "", e.style.visibility = "");
    }));
  }, nn + 60);
}
function ni(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(ys) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function mr(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(ys) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function Kc({
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
  const g = Xt(), b = Ai(
    { mode: f, accent: m, surface: p, context: "surface" },
    g
  ), x = b.mode, D = b.surface, E = b.accent, S = v(null), N = v(null), T = v(null), H = He(), q = P(20, 24, H), C = P(10, 12, H), K = P(12, 14, H), w = P(14, 16, H), I = P(20, 24, H), F = P(20, 24, H), U = P(20, 24, H), j = P(14, 16, H), M = P(16, 20, H), W = P(10, 12, H), Y = P(12, 14, H), ue = P(8, 10, H), ve = P(4, 6, H), A = { padding: `${C}px ${q}px` }, ge = { fontSize: K }, me = { padding: `${F}px ${I}px 16px ${I}px` }, te = { fontSize: w }, X = { padding: `0 ${I}px 16px` }, Q = { padding: `${U}px ${I}px` }, ye = { fontSize: W, padding: `${ve}px ${ue}px` }, [se, B] = oe(!1), L = ie((k) => {
    S.current = k, B(k !== null);
  }, []), V = Vn(), je = cr(), Ne = v(je);
  Ne.current = je;
  const [he, We] = oe(null), Te = v(null), Fe = v(!1), Be = v(!1), ne = v(0), _e = v({ w: 0, h: 0 }), Se = v(!1), [Xe, bt] = oe(!1), [we, qe] = oe(!1), yt = v(0), Ee = v(!1), [Bt, Ht] = oe(!1), Dt = v(c);
  Dt.current = c;
  const De = v(!1), Qe = v(!1), it = () => {
    Qe.current = !0, bt(!0);
  }, Rt = () => {
    Qe.current = !1, bt(!1);
  };
  le(() => {
    n || (We(null), Se.current = !1, Fe.current = !1, qe(!1));
  }, [n]), ut(() => {
    if (!n || Se.current || !se || !S.current) return;
    Se.current = !0;
    const k = S.current.getBoundingClientRect(), ee = Ne.current ?? null, J = (ee == null ? void 0 : ee.innerWidth) ?? 0, pe = cn(ee);
    We({
      left: Math.max($e, Math.min((J - k.width) / 2, J - k.width - $e)),
      top: Math.max(pe.top + $e, Math.min(pe.top + (pe.height - k.height) / 2, pe.bottom - k.height - $e))
    });
  }, [n, se]), ut(() => {
    if (!n || !se || !c || Dn() || !S.current) return;
    const k = S.current, ee = ni(k), J = ee[ee.length - 1];
    it(), J ? ao(yt, k, J.getBoundingClientRect(), Rt) : qc(yt, k, Rt);
  }, [n, se]);
  const ft = ie(() => {
    if (!u || Ee.current) return;
    const k = S.current, ee = !!k && ni(k).length > 0;
    if (!k || !c || Dn() || ee) {
      e();
      return;
    }
    Ee.current = !0, Ht(!0), De.current = !0, it(), uo(yt, k, () => {
      Ee.current = !1, Ht(!1), Rt(), e();
    });
  }, [c, e, u]), pt = ie(() => {
    const k = S.current;
    if (!k || De.current || !Dt.current || Dn() || ni(k).length > 0) return;
    const ee = k.ownerDocument, J = k.cloneNode(!0);
    J.removeAttribute("data-modal-stack"), J.removeAttribute("data-state"), J.removeAttribute("role"), J.removeAttribute("data-aria-hidden"), J.removeAttribute("tabindex"), J.setAttribute("aria-hidden", "true"), J.style.pointerEvents = "none", ee.body.appendChild(J), uo({ current: 0 }, J, () => {
      J.isConnected && J.remove();
    });
  }, []);
  ut(() => () => pt(), [pt]);
  const At = v(n);
  ut(() => {
    const k = At.current;
    At.current = n, k && !n && pt();
  }, [n, se, pt]), le(() => {
    if (!n || !se || !c || !S.current) return;
    const k = S.current, ee = k.parentNode;
    if (!ee) return;
    let J = 0, pe = null, ke = !1;
    const Ae = () => {
      J = 0;
      const xe = mr(k);
      if (xe.length > 0)
        k.style.opacity = "", k.style.pointerEvents = "", pe = xe[xe.length - 1].getBoundingClientRect(), ke = !0, J = requestAnimationFrame(Ae);
      else if (ke) {
        ke = !1, pe && !Dn() && (it(), ao(yt, k, pe, Rt)), pe = null;
        const Ie = Ne.current ?? null;
        Ie == null || Ie.setTimeout(() => {
          !k || !k.isConnected || getComputedStyle(k).opacity !== "1" && (k.style.opacity = "1", k.style.pointerEvents = "");
        }, 240);
      }
    }, ze = new MutationObserver(() => {
      !J && mr(k).length > 0 && (J = requestAnimationFrame(Ae));
    });
    return ze.observe(ee, { childList: !0 }), () => {
      ze.disconnect(), J && cancelAnimationFrame(J);
    };
  }, [n, se]), le(() => {
    if (!se || !c || Dn() || !S.current) return;
    const k = S.current;
    let ee = Math.round(k.getBoundingClientRect().height), J = !1;
    const pe = new ResizeObserver(() => {
      if (!k.isConnected) return;
      const ke = Math.round(k.getBoundingClientRect().height);
      if (!J) {
        J = !0, ee = ke;
        return;
      }
      if (Math.abs(ke - ee) < 1) return;
      if (Te.current || Ee.current || mr(k).length > 0) {
        ee = ke;
        return;
      }
      if (Qe.current) return;
      const Ae = ee;
      ee = ke, it();
      const ze = k.getBoundingClientRect(), xe = cn(Ne.current ?? null), Ie = !Fe.current && !Be.current, Ct = Ie ? xe.top + (xe.height - Ae) / 2 : ze.top, Ue = Ie ? xe.top + (xe.height - ke) / 2 : ze.top;
      k.style.transition = "none", k.style.height = `${Ae}px`, Ie && (k.style.top = `${Ct}px`), N.current && (N.current.style.overflow = "hidden"), k.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          k.style.height === `${Ae}px` && (k.style.transition = `height ${nn}ms ${tr}${Ie ? `, top ${nn}ms ${tr}` : ""}`, k.style.height = `${ke}px`, Ie && (k.style.top = `${Ue}px`), window.setTimeout(() => {
            k.style.height === `${ke}px` && (k.style.transition = "", k.style.height = "", N.current && (N.current.style.overflow = ""), Ie && We({ left: ze.left, top: Ue }), Rt());
          }, nn + 60));
        });
      });
    });
    return pe.observe(k), () => pe.disconnect();
  }, [se]), le(() => {
    if (!se || !S.current || c && !Dn()) return;
    const k = S.current, ee = new ResizeObserver(() => {
      if (!k.isConnected || Te.current || Ee.current || Be.current || mr(k).length > 0) return;
      const J = Ne.current ?? null, pe = cn(J), ke = (J == null ? void 0 : J.innerWidth) ?? 0, Ae = k.getBoundingClientRect(), ze = Math.max(pe.top + $e, Math.min(Ae.top, pe.bottom - Ae.height - $e)), xe = Math.max($e, Math.min(Ae.left, ke - Ae.width - $e));
      (Math.abs(ze - Ae.top) > 0.5 || Math.abs(xe - Ae.left) > 0.5) && We({ left: xe, top: ze });
    });
    return ee.observe(k), () => ee.disconnect();
  }, [se, c]);
  const Pe = ie(() => {
    const k = S.current;
    if (!k) return null;
    const ee = k.getBoundingClientRect();
    return { left: ee.left, top: ee.top, width: ee.width, height: ee.height };
  }, []), mt = ie((k, ee) => {
    const J = Ne.current ?? null, pe = (J == null ? void 0 : J.innerWidth) ?? 0, ke = cn(J), Ae = Pe(), ze = Ae ? Ae.width : Math.min(pe - $e * 2, 576), xe = Ae ? Ae.height : Math.min(ke.height - $e * 2, 400);
    return {
      left: Math.max($e, Math.min(k, pe - ze - $e)),
      top: Math.max(ke.top + $e, Math.min(ee, ke.bottom - xe - $e))
    };
  }, [Pe]);
  le(() => {
    if (!n) return;
    const k = Ne.current ?? null, ee = (k == null ? void 0 : k.visualViewport) ?? null;
    if (!k || !ee) return;
    const J = 120;
    Be.current = !1, _e.current = { w: k.innerWidth, h: k.innerHeight };
    let pe = 0;
    const ke = () => {
      if (Ee.current || Te.current) return;
      const ze = (k == null ? void 0 : k.innerHeight) ?? 0, xe = (k == null ? void 0 : k.innerWidth) ?? 0, Ct = cn(k).height < ze - J, Ue = ze < _e.current.h - J && xe === _e.current.w;
      Ct || Ue ? (Be.current = !0, ne.current && (clearTimeout(ne.current), ne.current = 0)) : ne.current || (ne.current = (k == null ? void 0 : k.setTimeout(() => {
        Be.current = !1, ne.current = 0, qe(!1);
      }, 600)) ?? 0), qe(Be.current), !pe && (pe = requestAnimationFrame(() => {
        var ht;
        pe = 0;
        const mn = S.current;
        if (!mn) return;
        const Me = cn(Ne.current ?? null), kt = mn.getBoundingClientRect(), Vt = ((ht = Ne.current) == null ? void 0 : ht.innerWidth) ?? 0, Qt = (k == null ? void 0 : k.innerHeight) ?? 0, Re = Me.height < Qt - J || Qt < _e.current.h - J && (k == null ? void 0 : k.innerWidth) === _e.current.w;
        _e.current = { w: (k == null ? void 0 : k.innerWidth) ?? 0, h: Qt };
        const jt = kt.top >= Me.top + $e && kt.bottom <= Me.bottom - $e, En = () => {
          We({
            left: Math.max($e, Math.min((Vt - kt.width) / 2, Vt - kt.width - $e)),
            top: Math.max(Me.top + $e, Math.min(Me.top + (Me.height - kt.height) / 2, Me.bottom - kt.height - $e))
          });
        };
        if (Re && !rt) {
          if (Fe.current) {
            jt || We(mt(kt.left, kt.top));
            return;
          }
          if (jt) return;
          En();
          return;
        }
        if (!Be.current) {
          if (Fe.current) {
            jt || We(mt(kt.left, kt.top));
            return;
          }
          jt || En();
        }
      }));
    };
    ee.addEventListener("resize", ke), ee.addEventListener("scroll", ke);
    const Ae = () => {
      Ee.current || Te.current || pe || (pe = requestAnimationFrame(() => {
        pe = 0;
        const ze = S.current;
        if (!ze) return;
        const xe = Ne.current ?? null, Ie = cn(xe), Ct = (xe == null ? void 0 : xe.innerWidth) ?? 0, Ue = ze.getBoundingClientRect();
        if (Fe.current) {
          We(mt(Ue.left, Ue.top));
          return;
        }
        We({
          left: Math.max($e, Math.min((Ct - Ue.width) / 2, Ct - Ue.width - $e)),
          top: Math.max(Ie.top + $e, Math.min(Ie.top + (Ie.height - Ue.height) / 2, Ie.bottom - Ue.height - $e))
        });
      }));
    };
    return k.addEventListener("orientationchange", Ae), () => {
      ee.removeEventListener("resize", ke), ee.removeEventListener("scroll", ke), k.removeEventListener("orientationchange", Ae), pe && cancelAnimationFrame(pe), ne.current && clearTimeout(ne.current);
    };
  }, [n, mt]);
  const Ze = ie((k) => {
    if (k.target.closest("button")) return;
    Fe.current = !0;
    const ee = Pe();
    ee && (We(mt(ee.left, ee.top)), Te.current = { startX: k.clientX, startY: k.clientY, posX: ee.left, posY: ee.top }, k.target.setPointerCapture(k.pointerId));
  }, [Pe, mt]), _t = ie((k) => {
    const ee = Te.current;
    ee && (k.preventDefault(), We(mt(ee.posX + k.clientX - ee.startX, ee.posY + k.clientY - ee.startY)));
  }, [mt]), It = ie(() => {
    Te.current = null;
  }, []), Ke = Te.current !== null, $t = ie(() => {
    Fe.current = !1;
    const k = Ne.current ?? null, ee = cn(k), J = (k == null ? void 0 : k.innerWidth) ?? 0, pe = S.current, ke = pe ? pe.getBoundingClientRect() : { width: 0, height: 0 };
    We({
      left: Math.max($e, Math.min((J - ke.width) / 2, J - ke.width - $e)),
      top: Math.max(ee.top + $e, Math.min(ee.top + (ee.height - ke.height) / 2, ee.bottom - ke.height - $e))
    });
  }, []), $ = v(0), G = ie(() => {
    const k = Date.now();
    k - $.current < 300 ? ($.current = 0, $t()) : $.current = k;
  }, [$t]), fe = he !== null, Ye = fe ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", et = `${i ? `${i} w-full` : "max-w-xl w-full"}`, vt = {
    ...fe ? { left: he.left, top: he.top } : {},
    width: `min(100%, calc(100dvw - ${$e * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...we ? {} : { maxHeight: `calc(100dvh - ${$e * 2}px)` }
  }, wt = ie((k) => {
    if (k.key !== "Enter" || k.shiftKey || k.metaKey || k.ctrlKey || k.altKey) return;
    const ee = k.target, J = T.current;
    if (!(!!ee.closest("[data-modal-close]") || !!J && J.contains(ee) && !!ee.closest('button, a, [role="button"]')) && ee.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !J) return;
    const ke = Array.from(J.querySelectorAll("button[data-modal-confirm]")), Ae = ke.length > 0 ? ke : Array.from(J.querySelectorAll("button")), ze = Ae[Ae.length - 1];
    !ze || ze.disabled || (k.preventDefault(), ze.click());
  }, []);
  return /* @__PURE__ */ h(Ii, { theme: b, children: /* @__PURE__ */ h(ln.Root, { open: n, onOpenChange: (k) => {
    k || ft();
  }, children: /* @__PURE__ */ R(ln.Portal, { container: V ?? void 0, children: [
    /* @__PURE__ */ h(
      ln.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${Bt ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (k) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (k.preventDefault(), d && ft());
        }
      }
    ),
    /* @__PURE__ */ R(
      ln.Content,
      {
        ref: L,
        onKeyDown: wt,
        onInteractOutside: (k) => {
          d || k.preventDefault();
        },
        "data-modal-stack": !0,
        "data-mode": x,
        "data-accent": E,
        "data-surface": D,
        className: `ui-modal fixed z-[10000] bg-[var(--ui-modal-bg)] border border-[color:var(--ui-modal-border)] rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${Ye} ${et}`,
        style: { touchAction: "manipulation", colorScheme: x, ...Object.keys(vt).length > 0 ? vt : {} },
        children: [
          a ? /* @__PURE__ */ R(
            "div",
            {
              style: me,
              className: `flex items-center justify-between ${Ke ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (k) => {
                Xe || Ze(k);
              },
              onPointerMove: _t,
              onPointerUp: It,
              onClick: G,
              children: [
                /* @__PURE__ */ h(ln.Title, { style: te, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t }),
                u && /* @__PURE__ */ h(ln.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ h(Sn, { style: { width: M, height: M } }) })
              ]
            }
          ) : /* @__PURE__ */ R(
            "div",
            {
              style: A,
              className: `ui-modal-header flex items-center justify-between border-b border-[color:var(--ui-modal-header-border)] shrink-0 bg-[var(--ui-modal-header-bg)] ${Ke ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (k) => {
                Xe || Ze(k);
              },
              onPointerMove: _t,
              onPointerUp: It,
              onClick: G,
              children: [
                /* @__PURE__ */ R("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ h("span", { className: "text-[color:var(--ui-modal-icon)] shrink-0", children: r }),
                  /* @__PURE__ */ h(ln.Title, { style: ge, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t })
                ] }),
                /* @__PURE__ */ R("div", { className: "flex items-center gap-2", children: [
                  l && /* @__PURE__ */ R("button", { onClick: l, style: ye, className: "cursor-pointer flex items-center gap-1 text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-muted-hover)] transition-colors bg-[var(--ui-modal-control-bg)] hover:bg-[var(--ui-modal-control-hover-bg)] rounded shrink-0", children: [
                    /* @__PURE__ */ h(Wo, { style: { width: Y, height: Y } }),
                    "Reset"
                  ] }),
                  u && /* @__PURE__ */ h(ln.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ h(Sn, { style: { width: j, height: j } }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ h("div", { ref: N, "data-testid": "modal-body", style: a ? X : void 0, className: "overflow-y-auto flex-1 bg-[var(--ui-modal-body-bg)] text-[color:var(--ui-modal-body-text)]", children: s }),
          o && /* @__PURE__ */ h("div", { ref: T, style: a ? Q : void 0, className: a ? "" : "shrink-0", children: a ? /* @__PURE__ */ h("div", { className: "flex items-center justify-end gap-2", children: o }) : o })
        ]
      }
    )
  ] }) }) });
}
function Ch({ children: n }) {
  const e = He(), t = P(20, 24, e), r = P(8, 12, e);
  return /* @__PURE__ */ h("div", { className: "flex items-center justify-end gap-3 border-t border-[color:var(--ui-modal-border)] bg-[var(--ui-modal-footer-bg)]", style: { padding: `${r}px ${t}px` }, children: n });
}
const Jc = "inline-flex items-center gap-2 rounded-lg text-xs transition cursor-pointer select-none whitespace-nowrap active:shadow-[inset_0_0_0_2px_var(--ui-panel-bg)]", Vc = {
  zinc: "bg-[var(--ui-footer-hero-bg)] text-[color:var(--ui-footer-hero-text)] font-semibold border border-[color:var(--ui-footer-hero-border)] hover:bg-[var(--ui-footer-hero-hover-bg)] hover:border-[color:var(--ui-footer-hero-hover-border)] disabled:opacity-40 disabled:cursor-not-allowed",
  accent: "bg-[var(--ui-accent-solid)] text-[color:var(--ui-accent-action-text)] font-semibold border border-transparent hover:bg-[var(--ui-accent-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed",
  danger: "bg-[var(--ui-danger-solid)] text-white font-semibold border border-[color:var(--ui-danger-solid)] hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
}, Yc = {
  /* Transparent border on every variant — auto-height buttons add the border
     to their height, so the bordered hero would otherwise be 2px taller. */
  ghost: "border border-transparent text-[color:var(--ui-text-muted)] font-medium hover:bg-[var(--ui-footer-ghost-hover-bg)] hover:text-[color:var(--ui-text-strong)] disabled:opacity-50",
  danger: "border border-transparent text-[color:var(--ui-danger-text)] font-medium hover:bg-[var(--ui-danger-hover-bg)] hover:text-[color:var(--ui-danger-hover-text)] disabled:opacity-50",
  "danger-solid": "border border-transparent bg-[var(--ui-danger-solid)] text-white font-semibold hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
};
function gr({
  variant: n = "hero",
  tone: e = "zinc",
  className: t = "",
  type: r = "button",
  ...i
}) {
  const o = fn({ px: 24, py: 8, fs: 12 }, { px: 28, py: 10, fs: 14 });
  return /* @__PURE__ */ h(
    "button",
    {
      type: r,
      style: o,
      className: `${Jc} ${n === "hero" ? Vc[e] : Yc[n]} ${t}`,
      ...i
    }
  );
}
function $r(n = "md") {
  const e = rt && Vo() > 0;
  return n === "sm" ? `${e ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"} ui-input` : `${e ? "px-4 py-3 text-sm" : "px-3 py-1.5 text-xs"} ui-input`;
}
function bs(n = "md") {
  return n === "sm" ? fn({ px: 8, py: 6, fs: 12 }, { px: 12, py: 8, fs: 14 }) : fn({ px: 10, py: 5, fs: 12 }, { px: 14, py: 9, fs: 14 });
}
const vs = Ut(null);
function Eh() {
  const n = Gt(vs);
  if (!n) throw new Error("useDialog must be used within DialogProvider");
  return n;
}
function Mh({ children: n, theme: e, accent: t, surface: r }) {
  const [i, o] = oe(null), [s, l] = oe(!1), c = v(null), a = He(), u = P(16, 20, a), d = P(12, 14, a), f = bs(), p = v(i);
  p.current = i;
  const m = ie(() => {
    const N = p.current;
    N && (N.kind === "confirm" ? N.resolve(!1) : N.kind === "prompt" ? N.resolve(null) : N.resolve());
  }, []), g = ie((N) => {
    if (N.suppressKey) {
      const T = localStorage.getItem(N.suppressKey);
      if (T && Date.now() < parseInt(T, 10))
        return Promise.resolve(!0);
    }
    return new Promise((T) => {
      m(), l(!1), o({ kind: "confirm", options: N, resolve: T });
    });
  }, [m]), b = ie((N) => new Promise((T) => {
    m(), o({ kind: "prompt", options: N, resolve: T });
  }), [m]), x = ie((N) => new Promise((T) => {
    m(), o({ kind: "alert", options: N, resolve: T });
  }), [m]);
  le(() => {
    if (i) {
      const N = setTimeout(() => {
        var T;
        return (T = c.current) == null ? void 0 : T.focus();
      }, 50);
      return () => clearTimeout(N);
    }
  }, [i]);
  const D = ie(() => {
    var N, T;
    if (i) {
      if (i.kind === "confirm") {
        const H = i.options;
        H.suppressKey && s && localStorage.setItem(H.suppressKey, String(Date.now() + 864e5)), i.resolve(!0);
      } else i.kind === "prompt" ? i.resolve(((T = (N = c.current) == null ? void 0 : N.value) == null ? void 0 : T.trim()) || null) : i.resolve();
      o(null);
    }
  }, [i, s]), E = i !== null;
  le(() => {
    if (!E) return;
    const N = (T) => {
      T.key !== "Enter" || T.shiftKey || T.metaKey || T.ctrlKey || T.altKey || T.isComposing || (T.preventDefault(), T.stopImmediatePropagation(), D());
    };
    return document.addEventListener("keydown", N, !0), () => document.removeEventListener("keydown", N, !0);
  }, [E, D]);
  const S = ie(() => {
    i && (i.kind === "confirm" ? i.resolve(!1) : i.kind === "prompt" ? i.resolve(null) : i.resolve(), o(null));
  }, [i]);
  return /* @__PURE__ */ R(vs.Provider, { value: { confirm: g, prompt: b, alert: x }, children: [
    n,
    E && /* @__PURE__ */ h(
      Kc,
      {
        open: !0,
        onClose: S,
        closable: (i == null ? void 0 : i.kind) !== "alert",
        dismissOnBackdrop: (i == null ? void 0 : i.kind) !== "alert",
        title: (i == null ? void 0 : i.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: i && /* @__PURE__ */ R(ct, { children: [
          i.kind !== "alert" && /* @__PURE__ */ h(gr, { variant: "ghost", onClick: S, children: "Cancel" }),
          i.kind === "alert" ? /* @__PURE__ */ h(gr, { onClick: D, children: "OK" }) : i.kind === "confirm" ? /* @__PURE__ */ h(
            gr,
            {
              "data-modal-confirm": !0,
              variant: i.options.danger ? "danger-solid" : "hero",
              onClick: D,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ h(gr, { "data-modal-confirm": !0, onClick: D, children: "Save" })
        ] }),
        children: /* @__PURE__ */ R("div", { className: "flex flex-col", style: { gap: u }, children: [
          (i == null ? void 0 : i.options.message) && /* @__PURE__ */ h("p", { style: { fontSize: d }, className: "text-[color:var(--ui-text-muted)] leading-relaxed", children: i.options.message }),
          (i == null ? void 0 : i.kind) === "confirm" && i.options.suppressKey && /* @__PURE__ */ h(
            Ic,
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
const Uc = 500, Gc = 250, Xc = 5, Pt = 88, fo = 4;
function Qc(n, e) {
  const t = n.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  t.style.strokeDasharray = String(r), t.style.strokeDashoffset = String(r);
  const i = performance.now(), o = (s) => {
    const l = s - i, c = Math.min(l / e, 1);
    t.style.strokeDashoffset = String(r * (1 - c)), c < 1 && requestAnimationFrame(o);
  };
  requestAnimationFrame(o);
}
function Zc({ x: n, y: e, ms: t }) {
  const r = v(null), i = Vn();
  return le(() => {
    r.current && Qc(r.current, t);
  }, [t]), jr(
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
        children: /* @__PURE__ */ R("svg", { ref: r, width: Pt, height: Pt, viewBox: `0 0 ${Pt} ${Pt}`, children: [
          /* @__PURE__ */ h(
            "circle",
            {
              cx: Pt / 2,
              cy: Pt / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: fo + 2,
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
              strokeWidth: fo,
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
function Rh() {
  return { "data-no-longpress": "true" };
}
function ea(n) {
  const e = n.tagName;
  return !!(e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || e === "BUTTON" || n.isContentEditable || n.closest("[data-no-longpress]") || n.closest("button, input, select, textarea"));
}
function Ah({
  children: n,
  showRing: e = !0,
  longPressMs: t = Uc,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: i,
  onLongPress: o
}) {
  const [s, l] = oe(null), c = Ci(), a = v(null), u = v(null), d = v({ x: 0, y: 0, target: null }), f = v(!1), p = Math.min(Gc, t * 0.5), m = v(i);
  m.current = i;
  const g = v(o);
  return g.current = o, le(() => {
    if (!rt || !c) return;
    const b = (S) => {
      if (!pi(S.pointerType) || S.button !== 0) return;
      const N = S.target;
      if (!N.closest(r) || (m.current ? !m.current(N) : ea(N))) return;
      const T = S.clientX, H = S.clientY;
      d.current = { x: T, y: H, target: S.target }, f.current = !0, e && (u.current = setTimeout(() => l({ x: T, y: H }), p)), a.current = setTimeout(() => {
        if (!f.current) return;
        u.current && (clearTimeout(u.current), u.current = null), l(null);
        const q = d.current.target;
        if (!q) return;
        const C = g.current;
        if (C) {
          C(q, T, H);
          return;
        }
        const K = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: T,
          clientY: H,
          button: 2,
          view: window
        });
        q.dispatchEvent(K);
      }, t);
    }, x = (S) => {
      if (!f.current || a.current === null) return;
      const N = S.clientX - d.current.x, T = S.clientY - d.current.y;
      Math.sqrt(N * N + T * T) > Xc && (clearTimeout(a.current), a.current = null, u.current && (clearTimeout(u.current), u.current = null), f.current = !1, l(null));
    }, D = () => {
      a.current !== null && (clearTimeout(a.current), a.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, l(null);
    }, E = (S) => {
      pi(S.pointerType) && (a.current !== null && (clearTimeout(a.current), a.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, l(null));
    };
    return c == null || c.addEventListener("pointerdown", b), c.addEventListener("pointermove", x), c.addEventListener("pointerup", D), c.addEventListener("pointercancel", D), c.addEventListener("pointerleave", E), () => {
      c.removeEventListener("pointerdown", b), c.removeEventListener("pointermove", x), c.removeEventListener("pointerup", D), c == null || c.removeEventListener("pointercancel", D), c == null || c.removeEventListener("pointerleave", E), a.current !== null && clearTimeout(a.current), u.current !== null && clearTimeout(u.current);
    };
  }, [e, t, p, r]), /* @__PURE__ */ R(ct, { children: [
    n,
    e && s && /* @__PURE__ */ h(Zc, { x: s.x, y: s.y, ms: t - p })
  ] });
}
function Ih() {
  const n = xc();
  return yc ? n === null || pi(n) : !1;
}
const ta = {
  border: "1px solid #d4d4d8",
  background: "rgba(255,255,255,0.94)",
  color: "#52525b",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
}, na = {
  border: "2px solid #2563eb",
  background: "#2563eb",
  color: "#fff",
  boxShadow: "0 4px 16px rgba(37,99,235,0.4)"
}, ra = {
  border: "1px solid #f59e0b",
  background: "rgba(255, 251, 235, 0.94)",
  color: "#b45309",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
};
function $h({
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
        ...e ? ra : n ? na : ta,
        ...t
      },
      ...s,
      children: o
    }
  );
}
const ia = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], oa = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], ri = 1900, ii = 2100;
function sa(n, e) {
  return new Date(n, e + 1, 0).getDate();
}
function la(n, e, t) {
  return `${n}-${String(e + 1).padStart(2, "0")}-${String(t).padStart(2, "0")}`;
}
function zh({ selected: n, onChange: e, theme: t, showChips: r = !0, className: i = "", initialView: o }) {
  const s = Xt(), l = t ?? (s == null ? void 0 : s.mode) ?? "light", c = /* @__PURE__ */ new Date(), a = (() => {
    if (!o) return c;
    const L = /* @__PURE__ */ new Date(o + "T00:00:00");
    return isNaN(L.getTime()) ? c : L;
  })(), [u, d] = oe(a.getFullYear()), [f, p] = oe(a.getMonth()), [m, g] = oe("days"), [b, x] = oe(null), D = tt(() => new Set(n), [n]), E = (L) => {
    D.has(L) ? e(n.filter((V) => V !== L)) : e([...n, L]);
  }, S = tt(() => {
    const L = sa(u, f), V = new Date(u, f, 1).getDay(), je = [];
    for (let Ne = 0; Ne < V; Ne++) je.push({ key: `pad-${Ne}`, day: 0, empty: !0 });
    for (let Ne = 1; Ne <= L; Ne++) je.push({ key: la(u, f, Ne), day: Ne, empty: !1 });
    return je;
  }, [u, f]), N = (L) => d((V) => Math.max(ri, Math.min(ii, V + L))), T = (L) => {
    f + L < 0 ? (d((V) => Math.max(ri, V - 1)), p(11)) : f + L > 11 ? (d((V) => Math.min(ii, V + 1)), p(0)) : p((V) => V + L);
  }, H = () => {
    if (b === null) return;
    const L = parseInt(b, 10);
    !isNaN(L) && L >= ri && L <= ii && d(L), x(null);
  }, q = (L) => n.some((V) => V.startsWith(`${u}-${String(L + 1).padStart(2, "0")}`)), C = He(), K = P(4, 8, C), w = P(16, 20, C), I = P(10, 11, C), F = P(6, 8, C), U = P(12, 14, C), j = P(6, 10, C), M = P(12, 14, C), W = P(8, 12, C), Y = P(10, 12, C), ue = P(6, 10, C), ve = P(2, 6, C), A = P(64, 80, C), ge = { padding: K }, me = { width: w, height: w }, te = { fontSize: I, paddingTop: F, paddingBottom: F }, X = { fontSize: U, paddingTop: j, paddingBottom: j }, Q = { fontSize: M, paddingTop: W, paddingBottom: W }, ye = { fontSize: Y, padding: `${ve}px ${ue}px` }, se = "bg-[var(--ui-date-selected-bg)] text-[color:var(--ui-date-selected-text)] hover:bg-[var(--ui-date-selected-hover-bg)]", B = "text-[color:var(--ui-text)] hover:bg-[var(--ui-card-hover)]";
  return /* @__PURE__ */ R("div", { "data-mode": l, "data-accent": s == null ? void 0 : s.accent, "data-surface": s == null ? void 0 : s.surface, className: `border rounded-lg overflow-hidden w-full border-[color:var(--ui-border-strong)] bg-[var(--ui-date-body-bg)] text-[color:var(--ui-text)] ${i}`, children: [
    /* @__PURE__ */ R("div", { className: "flex items-center justify-between px-3 py-2 border-b bg-[var(--ui-date-header-bg)] text-[color:var(--ui-date-header-text)] border-[color:var(--ui-border)]", children: [
      /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => m === "months" ? N(-1) : T(-1),
          style: ge,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": m === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ h(Bl, { style: me })
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
          onChange: (L) => x(L.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: (L) => L.target.select(),
          onBlur: H,
          onKeyDown: (L) => {
            L.key === "Enter" && (L.preventDefault(), H()), L.key === "Escape" && x(null);
          },
          style: { width: A },
          className: "text-sm text-center font-semibold rounded outline-none py-0.5 bg-[var(--ui-date-header-hover)] text-[color:var(--ui-date-header-text)]"
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => m === "months" ? N(1) : T(1),
          style: ge,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": m === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ h(Rr, { style: me })
        }
      )
    ] }),
    m === "months" ? /* @__PURE__ */ R("div", { children: [
      /* @__PURE__ */ h("div", { className: "grid grid-cols-3 text-center", children: oa.map((L, V) => /* @__PURE__ */ R(
        "button",
        {
          type: "button",
          onClick: () => {
            p(V), g("days");
          },
          style: Q,
          className: `relative font-medium transition-colors border-b border-[color:var(--ui-border)] ${V === f ? se : B}`,
          children: [
            L,
            q(V) && /* @__PURE__ */ h("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${V === f ? "bg-[var(--ui-date-selected-text)]" : "bg-[var(--ui-accent-solid)]"}` })
          ]
        },
        L
      )) }),
      /* @__PURE__ */ h("div", { className: "text-center border-t border-[color:var(--ui-border)]", children: /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => {
            d(c.getFullYear()), p(c.getMonth()), g("days");
          },
          style: { paddingTop: j, paddingBottom: j, fontSize: U },
          className: "px-3 font-semibold rounded transition-colors text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-card-hover)]",
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ R("div", { className: "grid grid-cols-7 text-center", children: [
      ia.map((L) => /* @__PURE__ */ h("div", { style: te, className: "font-semibold uppercase tracking-wider border-b text-[color:var(--ui-text-faint)] border-[color:var(--ui-border)]", children: L }, L)),
      S.map((L) => L.empty ? /* @__PURE__ */ h("div", {}, L.key) : /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => E(L.key),
          style: X,
          className: `font-medium transition-colors border-b border-[color:var(--ui-border)] ${D.has(L.key) ? se : B}`,
          children: L.day
        },
        L.key
      ))
    ] }),
    r && n.length > 0 && /* @__PURE__ */ R("div", { className: "px-3 py-2 border-t border-[color:var(--ui-border)] bg-[var(--ui-date-footer-bg)]", children: [
      /* @__PURE__ */ R("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-[color:var(--ui-text-muted)]", children: [
        n.length,
        " date",
        n.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ h("div", { className: "flex flex-wrap gap-1", children: n.map((L) => {
        const V = /* @__PURE__ */ new Date(L + "T00:00:00"), je = V.getFullYear() === c.getFullYear() ? V.toLocaleString("default", { month: "short", day: "numeric" }) : V.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ R(
          "button",
          {
            type: "button",
            onClick: () => E(L),
            "aria-label": `Remove ${je}`,
            style: ye,
            className: "inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors bg-[var(--ui-date-chip-bg)] text-[color:var(--ui-date-chip-text)] hover:bg-[var(--ui-date-chip-hover-bg)]",
            children: [
              je,
              /* @__PURE__ */ h("span", { className: "leading-none text-[color:var(--ui-text-muted)]", "aria-hidden": "true", children: "×" })
            ]
          },
          L
        );
      }) })
    ] })
  ] });
}
function Dh({
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
  const p = (S) => e instanceof Set ? e.has(S) : e.includes(S), m = He(), g = P(12, 16, m), b = P(8, 12, m), x = P(12, 14, m), D = P(16, 20, m), E = r != null || i != null;
  return /* @__PURE__ */ R("div", { className: f, ...d ? { "data-theme": d } : {}, children: [
    E && /* @__PURE__ */ R("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ h("span", { className: "ui-checklist-title", children: r }),
      i != null && /* @__PURE__ */ h("button", { type: "button", disabled: a, onClick: i, className: "ui-checklist-toggleall", children: s ?? (o ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ R(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${a ? "ui-checklist-disabled" : ""}`,
        style: c ? { maxHeight: c, overflowY: "auto" } : void 0,
        children: [
          n.map((S) => {
            const N = p(S.id), T = /* @__PURE__ */ h($i, { checked: N, size: D });
            return /* @__PURE__ */ R(
              "button",
              {
                type: "button",
                disabled: a,
                onClick: () => t(S.id),
                "aria-pressed": N,
                className: `ui-checklist-item ${N ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${b}px ${g}px`, fontSize: x },
                ...S.dataProps,
                children: [
                  u === "leading" && T,
                  S.leading != null && /* @__PURE__ */ h("span", { className: "ui-checklist-leading", children: S.leading }),
                  /* @__PURE__ */ h("span", { className: "ui-checklist-label", children: S.label }),
                  S.secondary != null && /* @__PURE__ */ h("span", { className: "ui-checklist-secondary", children: S.secondary }),
                  u === "trailing" && /* @__PURE__ */ h("span", { className: "ml-auto flex shrink-0", children: T })
                ]
              },
              S.id
            );
          }),
          n.length === 0 && /* @__PURE__ */ h("div", { className: "ui-checklist-empty", children: l })
        ]
      }
    )
  ] });
}
function Ph({
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
  const u = He(), d = s ? 10 : P(12, 16, u), f = s ? 6 : P(8, 12, u), p = s ? 12 : P(12, 14, u), m = s ? 14 : P(16, 20, u);
  return /* @__PURE__ */ R("div", { className: a, ...c ? { "data-theme": c } : {}, children: [
    r != null && /* @__PURE__ */ h("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ h("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ R(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${l ? "ui-checklist-disabled" : ""}`,
        style: o ? { maxHeight: o, overflowY: "auto" } : void 0,
        children: [
          n.map((g) => {
            const b = e === g.id;
            return /* @__PURE__ */ R(
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
const Lh = ({
  className: n,
  children: e,
  reference: t,
  placement: r = "top",
  anchorMode: i = "visible",
  offset: o = 8
}) => {
  const s = cr(), { refs: l, floatingStyles: c } = Gl({
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
          var D;
          if (i !== "visible") return {};
          const u = (D = a.elements.floating.ownerDocument) == null ? void 0 : D.defaultView;
          if (!u) return {};
          const d = a.rects.reference, f = Math.max(d.x, 0), p = Math.max(d.y, 0), m = Math.min(d.x + d.width, u.innerWidth), g = Math.min(d.y + d.height, u.innerHeight);
          if (m <= f || g <= p) return {};
          const b = r === "left" ? m - (d.x + d.width) : r === "right" ? f - d.x : 0, x = r === "top" ? p - d.y : r === "bottom" ? g - (d.y + d.height) : 0;
          return { x: a.x + b, y: a.y + x };
        }
      },
      qo(o),
      Ko({ padding: 8 }),
      Jo({ padding: 8 }),
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
    whileElementsMounted: Xl
  });
  return ut(() => {
    t && l.setReference(t);
  }, [t, l]), /* @__PURE__ */ R(ct, { children: [
    !t && /* @__PURE__ */ h("div", { ref: l.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    s && jr(
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
function ca(n, e) {
  if (!e || !lt.isValidElement(n)) return {};
  const t = n.props;
  if (t["aria-label"] || t.title) return {};
  const r = t.children;
  if (typeof r == "string" ? r.trim().length > 0 : Array.isArray(r) ? r.some((s) => typeof s == "string" && s.trim().length > 0) : !1) return {};
  const o = e.split(`
`)[0].replace(/^•\s*/, "").trim().slice(0, 80);
  return o ? { "aria-label": o } : {};
}
const Pn = ({ content: n, children: e }) => {
  const t = Xt(), r = He(), i = P(10, 12, r), o = P(6, 6, r), s = P(10, 12, r), l = { padding: `${o}px ${i}px`, fontSize: s }, c = Vn(), a = cr(), [u, d] = oe(!1), [f, p] = oe({ x: 0, y: 0 }), m = v(null), g = v(null), b = () => {
    if (!m.current) return;
    const E = m.current.getBoundingClientRect();
    p({ x: E.left + E.width / 2, y: E.top });
  };
  le(() => () => {
    g.current && clearTimeout(g.current);
  }, []), le(() => (u && a && (b(), a.addEventListener("scroll", b, !0)), () => a == null ? void 0 : a.removeEventListener("scroll", b, !0)), [u]);
  const x = ca(e, n), D = Object.keys(x).length > 0 ? lt.cloneElement(e, x) : e;
  return /* @__PURE__ */ R(
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
        D,
        u && jr(
          /* @__PURE__ */ R(
            "div",
            {
              "data-mode": t == null ? void 0 : t.mode,
              "data-accent": t == null ? void 0 : t.accent,
              className: "ui-tooltip fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-[color:var(--ui-tooltip-border)] bg-[var(--ui-tooltip-bg)] text-[color:var(--ui-tooltip-text)] pointer-events-none",
              style: { ...l, left: f.x, top: f.y - 4, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                n.split(`
• `).map((E, S) => /* @__PURE__ */ h("div", { className: S > 0 ? "mt-0.5 pt-0.5 border-t border-[color:var(--ui-tooltip-sep)]" : "", children: E }, S)),
                /* @__PURE__ */ h("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[color:var(--ui-tooltip-bg)]" })
              ]
            }
          ),
          c ?? document.body
        )
      ]
    }
  );
}, aa = 250;
function ua(n, e, t) {
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
      s(!0), l.current && clearTimeout(l.current), l.current = setTimeout(() => s(!1), aa), a();
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
function Yr() {
  const n = He(), e = rt, t = e ? P(28, 40, n) : 28, r = e ? P(28, 40, n) : 28, i = e ? P(10, 14, n) : 10, o = e ? P(10, 14, n) : 10, s = e ? P(8, 10, n) : 8;
  return {
    toggle: { width: t, height: t },
    control: { height: r, padding: `0 ${i}px`, fontSize: o },
    input: { height: r, padding: `0 ${s}px`, fontSize: o }
  };
}
const Oh = rt ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", da = rt ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", yr = rt ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", fa = "hover:bg-red-950/50", Fh = rt ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", Bh = "bg-[var(--ui-accent-selected-bg)] border-[var(--ui-border-strong)] text-[color:var(--ui-accent-selected-text)]", Hh = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", ha = rt ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", _h = rt ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50", ws = rt ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", pa = "inline-flex rounded-[var(--ui-radius-btn)] overflow-hidden border border-[var(--ui-border-strong)]", ma = rt ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", xr = ({ onClick: n, disabled: e, title: t, className: r = da, children: i }) => {
  const o = Yr();
  return /* @__PURE__ */ h(Pn, { content: t, children: /* @__PURE__ */ h("button", { onClick: n, disabled: e, "aria-label": t, style: o.control, className: `${r} ${e ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) });
}, br = {
  wrap: "border-[color:var(--ui-border-strong)] bg-[var(--ui-seg-track-bg)]",
  pill: "bg-[var(--ui-seg-pill)]",
  active: "text-[color:var(--ui-accent-pill-text)]",
  idle: "text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-seg-hover)]"
}, jh = ({ value: n, options: e, onChange: t, disabled: r, active: i, stretch: o, dense: s, variant: l = "chrome", theme: c, tablist: a, iconCollapse: u = !1, iconWithLabel: d = !0, ariaLabel: f }) => {
  const p = Xt(), m = c ?? Nc(p), g = c === "blue" || c === "emerald" ? c : (p == null ? void 0 : p.accent) ?? "zinc", b = { "data-mode": m === "dark" ? "dark" : "light", "data-accent": g }, x = Yr(), D = He(), E = s && !rt ? 24 : x.control.height, S = fn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), N = rt ? S : { padding: "0 12px", fontSize: 12, height: s ? 20 : 24 }, T = (w) => i ? i(w) : n === w, H = lt.useRef(null), q = lt.useRef([]), C = Math.max(0, e.findIndex((w) => T(w.v))), K = ua(H, q, C);
  return l === "track" ? /* @__PURE__ */ R(
    "div",
    {
      ref: H,
      role: a ? "tablist" : "group",
      "aria-label": f,
      ...b,
      className: `relative inline-flex items-center rounded-[var(--ui-radius-btn)] border p-0.5 ${rt ? "" : s ? "h-[26px]" : "h-[30px]"} ${o ? "w-full" : ""} ${br.wrap}`,
      children: [
        K.style && /* @__PURE__ */ h(
          "span",
          {
            "aria-hidden": !0,
            className: `absolute rounded-[var(--ui-radius-inset)] ${br.pill} ${K.motionClass}`,
            style: { ...K.style, top: 2, bottom: 2 }
          }
        ),
        e.map((w, I) => {
          const F = T(w.v), U = u && !!w.icon;
          return /* @__PURE__ */ h(
            "button",
            {
              ref: (j) => {
                q.current[I] = j;
              },
              ...w.dataProps,
              type: "button",
              disabled: r,
              onClick: () => t(w.v),
              title: w.title,
              role: a ? "tab" : void 0,
              "aria-selected": a ? F : void 0,
              "aria-pressed": a ? void 0 : F,
              "aria-label": w.ariaLabel ?? (w.l ? void 0 : w.title),
              style: N,
              className: `relative z-10 inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-[var(--ui-radius-inset)] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${U ? "group gap-0" : "gap-1.5"} ${o ? "flex-1" : ""} ${F ? br.active : br.idle}`,
              children: /* @__PURE__ */ h(
                as,
                {
                  icon: w.icon,
                  collapse: U,
                  iconWithLabel: d,
                  active: F,
                  gap: P(6, 8, D),
                  children: w.l
                }
              )
            },
            w.v
          );
        })
      ]
    }
  ) : /* @__PURE__ */ R("div", { ref: H, className: `relative ${pa} bg-[var(--ui-seg-track-bg)]${o ? " w-full" : ""}`, children: [
    K.style && /* @__PURE__ */ h(
      "span",
      {
        "aria-hidden": !0,
        className: `absolute bg-[var(--ui-accent-pill-bg)] ${K.motionClass}`,
        style: { ...K.style, top: 0, bottom: 0 }
      }
    ),
    e.map((w, I) => {
      const F = T(w.v);
      return /* @__PURE__ */ R(
        "button",
        {
          ref: (U) => {
            q.current[I] = U;
          },
          ...w.dataProps,
          disabled: r,
          onClick: () => t(w.v),
          title: w.title,
          style: { ...x.control, height: E },
          className: `relative z-10 font-medium transition-colors disabled:opacity-30 ${o ? "flex-1" : ""} ${F ? "text-[color:var(--ui-accent-pill-text)]" : "text-[color:var(--ui-text-muted)] hover:bg-[var(--ui-accent-hover-bg)]"} ${w.v !== e[e.length - 1].v ? "border-r border-[var(--ui-border)]" : ""}`,
          children: [
            w.icon,
            w.l
          ]
        },
        w.v
      );
    })
  ] });
}, Wh = ({ children: n }) => /* @__PURE__ */ R("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ h("span", { className: rt ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: n }),
  /* @__PURE__ */ h("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), ga = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", ya = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", qh = ({ label: n, children: e, tall: t }) => /* @__PURE__ */ R("div", { className: t ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  n && /* @__PURE__ */ h("span", { className: t ? ga : ya, children: n }),
  e
] }), Kh = ({ leading: n, trailing: e, className: t = "" }) => /* @__PURE__ */ R("div", { className: `flex flex-wrap items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-0 ${t}`, children: [
  n,
  e && /* @__PURE__ */ h("div", { className: "ml-auto flex flex-wrap items-center justify-end gap-1", children: e })
] }), Jh = ({ readOnly: n, onDuplicate: e, onRemove: t, onMove: r, compact: i }) => (
  // One unbreakable cluster: when a header's trailing wraps, the move pair and
  // the duplicate/delete pair stay together (no orphaned icons on a line).
  /* @__PURE__ */ R("div", { className: "flex items-center gap-1 shrink-0", children: [
    /* @__PURE__ */ h(xr, { onClick: () => r(-1), disabled: n, title: "Move up", className: yr, children: /* @__PURE__ */ h(Hl, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ h(xr, { onClick: () => r(1), disabled: n, title: "Move down", className: yr, children: /* @__PURE__ */ h(_l, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ h(xr, { onClick: e, disabled: n, title: "Duplicate", className: yr, children: /* @__PURE__ */ h(jo, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ h("div", { className: ws }),
    /* @__PURE__ */ h(xr, { onClick: t, disabled: n, title: "Delete", className: `${yr} ${fa}`, children: /* @__PURE__ */ h(hi, { className: "w-2.5 h-2.5" }) })
  ] })
);
var ho = Object.defineProperty, xa = (n, e) => {
  let t = {};
  for (var r in n) ho(t, r, {
    get: n[r],
    enumerable: !0
  });
  return ho(t, Symbol.toStringTag, { value: "Module" }), t;
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
function ks(n, e, t) {
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
      return c && c < s.length && c < l.length && Ts(s.charCodeAt(c - 1)) && Ns(s.charCodeAt(c)) && t--, t;
    }
    if (i.content.size || o.content.size) {
      let s = ks(i.content, o.content, t + 1);
      if (s != null)
        return s;
    }
    t += i.nodeSize;
  }
}
function Ss(n, e, t, r) {
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
      return d && f && d < a.length && Ts(a.charCodeAt(d - 1)) && Ns(a.charCodeAt(d)) && (t++, r++), { a: t, b: r };
    }
    if (s.content.size || l.content.size) {
      let a = Ss(s.content, l.content, t - 1, r - 1);
      if (a)
        return a;
    }
    t -= c, r -= c;
  }
}
function Ns(n) {
  return n >= 56320 && n < 57344;
}
function Ts(n) {
  return n >= 55296 && n < 56320;
}
class _ {
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
    return new _(i, this.size + e.size);
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
    return new _(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, t) {
    return e == t ? _.empty : e == 0 && t == this.content.length ? this : new _(this.content.slice(e, t));
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
    return i[e] = t, new _(i, o);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new _([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new _(this.content.concat(e), this.size + e.nodeSize);
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
    return ks(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, r = e.size) {
    return Ss(this, e, t, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e) {
    if (e == 0)
      return vr(0, e);
    if (e == this.size)
      return vr(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let t = 0, r = 0; ; t++) {
      let i = this.child(t), o = r + i.nodeSize;
      if (o >= e)
        return o == e ? vr(t + 1, o) : vr(t, r);
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
      return _.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return _.fromArray(t.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return _.empty;
    let t, r = 0;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      r += o.nodeSize, i && o.isText && e[i - 1].sameMarkup(o) ? (t || (t = e.slice(0, i)), t[t.length - 1] = o.withText(t[t.length - 1].text + o.text)) : t && t.push(o);
    }
    return new _(t || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return _.empty;
    if (e instanceof _)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new _([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
_.empty = new _([], 0);
const oi = { index: 0, offset: 0 };
function vr(n, e) {
  return oi.index = n, oi.offset = e, oi;
}
function zr(n, e) {
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
      if (!zr(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !zr(n[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in n))
        return !1;
  }
  return !0;
}
let Je = class yi {
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
    return this == e || this.type == e.type && zr(this.attrs, e.attrs);
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
      return yi.none;
    if (e instanceof yi)
      return [e];
    let t = e.slice();
    return t.sort((r, i) => r.type.rank - i.type.rank), t;
  }
};
Je.none = [];
class nr extends Error {
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
    let r = Es(this.content, e + this.openStart, t, this.openStart + 1, this.openEnd + 1);
    return r && new ce(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new ce(Cs(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
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
    return new ce(_.fromJSON(e, t.content), r, i);
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
ce.empty = new ce(_.empty, 0, 0);
function Cs(n, e, t) {
  let { index: r, offset: i } = n.findIndex(e), o = n.maybeChild(r), { index: s, offset: l } = n.findIndex(t);
  if (i == e || o.isText) {
    if (l != t && !n.child(s).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != s)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, o.copy(Cs(o.content, e - i - 1, t - i - 1)));
}
function Es(n, e, t, r, i, o) {
  let { index: s, offset: l } = n.findIndex(e), c = n.maybeChild(s);
  if (l == e || c.isText)
    return o && r <= 0 && i <= 0 && !o.canReplace(s, s, t) ? null : n.cut(0, e).append(t).append(n.cut(e));
  let a = Es(c.content, e - l - 1, t, s == 0 ? r - 1 : 0, s == n.childCount - 1 ? i - 1 : 0, c);
  return a && n.replaceChild(s, c.copy(a));
}
function ba(n, e, t) {
  if (t.openStart > n.depth)
    throw new nr("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new nr("Inconsistent open depths");
  return Ms(n, e, t, 0);
}
function Ms(n, e, t, r) {
  let i = n.index(r), o = n.node(r);
  if (i == e.index(r) && r < n.depth - t.openStart) {
    let s = Ms(n, e, t, r + 1);
    return o.copy(o.content.replaceChild(i, s));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let s = n.parent, l = s.content;
      return wn(s, l.cut(0, n.parentOffset).append(t.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: s, end: l } = va(t, n);
      return wn(o, As(n, s, l, e, r));
    }
  else return wn(o, Dr(n, e, r));
}
function Rs(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new nr("Cannot join " + e.type.name + " onto " + n.type.name);
}
function xi(n, e, t) {
  let r = n.node(t);
  return Rs(r, e.node(t)), r;
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
function As(n, e, t, r, i) {
  let o = n.depth > i && xi(n, e, i + 1), s = r.depth > i && xi(t, r, i + 1), l = [];
  return Qn(null, n, i, l), o && s && e.index(i) == t.index(i) ? (Rs(o, s), vn(wn(o, As(n, e, t, r, i + 1)), l)) : (o && vn(wn(o, Dr(n, e, i + 1)), l), Qn(e, t, i, l), s && vn(wn(s, Dr(t, r, i + 1)), l)), Qn(r, null, i, l), new _(l);
}
function Dr(n, e, t) {
  let r = [];
  if (Qn(null, n, t, r), n.depth > t) {
    let i = xi(n, e, t + 1);
    vn(wn(i, Dr(n, e, t + 1)), r);
  }
  return Qn(e, null, t, r), new _(r);
}
function va(n, e) {
  let t = e.depth - n.openStart, i = e.node(t).copy(n.content);
  for (let o = t - 1; o >= 0; o--)
    i = e.node(o).copy(_.from(i));
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
      return Je.none;
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
        return new Pr(this, e, r);
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
    let r = po.get(e);
    if (r)
      for (let o = 0; o < r.elts.length; o++) {
        let s = r.elts[o];
        if (s.pos == t)
          return s;
      }
    else
      po.set(e, r = new wa());
    let i = r.elts[r.i] = rr.resolve(e, t);
    return r.i = (r.i + 1) % ka, i;
  }
}
class wa {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const ka = 12, po = /* @__PURE__ */ new WeakMap();
class Pr {
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
const Sa = /* @__PURE__ */ Object.create(null);
let Hn = class bi {
  /**
  @internal
  */
  constructor(e, t, r, i = Je.none) {
    this.type = e, this.attrs = t, this.marks = i, this.content = r || _.empty;
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
    return this.type == e && zr(this.attrs, t || e.defaultAttrs || Sa) && Je.sameSet(this.marks, r || Je.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new bi(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new bi(this.type, this.attrs, this.content, e);
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
    return ba(this.resolve(e), this.resolve(t), r);
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
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), Is(this.marks, e);
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
  canReplace(e, t, r = _.empty, i = 0, o = r.childCount) {
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
    this.type.checkContent(this.content), mo(this.type.attrs, this.attrs, "node", this.type.name);
    let e = Je.none;
    for (let t = 0; t < this.marks.length; t++) {
      let r = this.marks[t];
      mo(r.type.attrs, r.attrs, "mark", r.type.name), e = r.addToSet(e);
    }
    if (!Je.sameSet(e, this.marks))
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
    let i = _.fromJSON(e, t.content);
    return e.nodeType(t.type).create(t.attrs, i, r);
  }
};
Hn.prototype.text = void 0;
class Lr extends Hn {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    if (super(e, t, null, i), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : Is(this.marks, JSON.stringify(this.text));
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
    return e == this.marks ? this : new Lr(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new Lr(this.type, this.attrs, e, this.marks);
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
function Is(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    e = n[t].type.name + "(" + e + ")";
  return e;
}
function mo(n, e, t, r) {
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
    let r = new Na(e, t);
    if (r.next == null)
      return Nn.empty;
    let i = $s(r);
    r.next && r.err("Unexpected trailing text");
    let o = Ia(Aa(i));
    return $a(o, r), o;
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
        return _.from(l.map((a) => a.createAndFill()));
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
class Na {
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
function $s(n) {
  let e = [];
  do
    e.push(Ta(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function Ta(n) {
  let e = [];
  do
    e.push(Ca(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function Ca(n) {
  let e = Ra(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = Ea(n, e);
    else
      break;
  return e;
}
function go(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function Ea(n, e) {
  let t = go(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = go(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function Ma(n, e) {
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
function Ra(n) {
  if (n.eat("(")) {
    let e = $s(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = Ma(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function Aa(n) {
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
function zs(n, e) {
  return e - n;
}
function yo(n, e) {
  let t = [];
  return r(e), t.sort(zs);
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
function Ia(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(yo(n, 0));
  function t(r) {
    let i = [];
    r.forEach((s) => {
      n[s].forEach(({ term: l, to: c }) => {
        if (!l)
          return;
        let a;
        for (let u = 0; u < i.length; u++)
          i[u][0] == l && (a = i[u][1]);
        yo(n, c).forEach((u) => {
          a || i.push([l, a = []]), a.indexOf(u) == -1 && a.push(u);
        });
      });
    });
    let o = e[r.join(",")] = new Nn(r.indexOf(n.length - 1) > -1);
    for (let s = 0; s < i.length; s++) {
      let l = i[s][1].sort(zs);
      o.next.push({ type: i[s][0], next: e[l.join(",")] || t(l) });
    }
    return o;
  }
}
function $a(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let i = r[t], o = !i.validEnd, s = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: c, next: a } = i.next[l];
      s.push(c.name), o && !(c.isText || c.hasRequiredAttrs()) && (o = !1), r.indexOf(a) == -1 && r.push(a);
    }
    o && e.err("Only non-generatable nodes (" + s.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function Ds(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault)
      return null;
    e[t] = r.default;
  }
  return e;
}
function Ps(n, e) {
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
function Ls(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      t[r] = new Da(n, r, e[r]);
  return t;
}
class Or {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = Ls(e, r.attrs), this.defaultAttrs = Ds(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
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
    return !e && this.defaultAttrs ? this.defaultAttrs : Ps(this.attrs, e);
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
    return new Hn(this, this.computeAttrs(e), _.from(t), Je.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = _.from(t), this.checkContent(t), new Hn(this, this.computeAttrs(e), t, Je.setFrom(r));
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
    if (e = this.computeAttrs(e), t = _.from(t), t.size) {
      let s = this.contentMatch.fillBefore(t);
      if (!s)
        return null;
      t = s.append(t);
    }
    let i = this.contentMatch.matchFragment(t), o = i && i.fillBefore(_.empty, !0);
    return o ? new Hn(this, e, t.append(o), Je.setFrom(r)) : null;
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
    return t ? t.length ? t : Je.none : e;
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null);
    e.forEach((o, s) => r[o] = new Or(o, t, s));
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
function za(n, e, t) {
  let r = t.split("|");
  return (i) => {
    let o = i === null ? "null" : typeof i;
    if (r.indexOf(o) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${n}, got ${o}`);
  };
}
class Da {
  constructor(e, t, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? za(e, t, r.validate) : r.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class Ur {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    this.name = e, this.rank = t, this.schema = r, this.spec = i, this.attrs = Ls(e, i.attrs), this.excluded = null;
    let o = Ds(this.attrs);
    this.instance = o ? new Je(this, o) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new Je(this, Ps(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((o, s) => r[o] = new Ur(o, i++, t, s)), r;
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
class Pa {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let i in e)
      t[i] = e[i];
    t.nodes = xt.from(e.nodes), t.marks = xt.from(e.marks || {}), this.nodes = Or.compile(this.spec.nodes, this), this.marks = Ur.compile(this.spec.marks, this);
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
      o.markSet = l == "_" ? null : l ? xo(this, l.split(" ")) : l == "" || !o.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let o = this.marks[i], s = o.spec.excludes;
      o.excluded = s == null ? [o] : s == "" ? [] : xo(this, s.split(" "));
    }
    this.nodeFromJSON = (i) => Hn.fromJSON(this, i), this.markFromJSON = (i) => Je.fromJSON(this, i), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
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
    else if (e instanceof Or) {
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
    return new Lr(r, r.defaultAttrs, e, Je.setFrom(t));
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
function xo(n, e) {
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
function La(n) {
  return n.tag != null;
}
function Oa(n) {
  return n.style != null;
}
class _n {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, t) {
    this.schema = e, this.rules = t, this.tags = [], this.styles = [];
    let r = this.matchedStyles = [];
    t.forEach((i) => {
      if (La(i))
        this.tags.push(i);
      else if (Oa(i)) {
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
    let r = new vo(this, t, !1);
    return r.addAll(e, Je.none, t.from, t.to), r.finish();
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
    let r = new vo(this, t, !0);
    return r.addAll(e, Je.none, t.from, t.to), ce.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let o = this.tags[i];
      if (Ha(e, o.tag) && (o.namespace === void 0 || e.namespaceURI == o.namespace) && (!o.context || t.matchesContext(o.context))) {
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
        r(s = wo(s)), s.mark || s.ignore || s.clearMark || (s.mark = i);
      });
    }
    for (let i in e.nodes) {
      let o = e.nodes[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = wo(s)), s.node || s.ignore || s.mark || (s.node = i);
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
    return e.cached.domParser || (e.cached.domParser = new _n(e, _n.schemaRules(e)));
  }
}
const Os = {
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
}, Fa = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, Fs = { ol: !0, ul: !0 }, ir = 1, vi = 2, Zn = 4;
function bo(n, e, t) {
  return e != null ? (e ? ir : 0) | (e === "full" ? vi : 0) : n && n.whitespace == "pre" ? ir | vi : t & ~Zn;
}
class wr {
  constructor(e, t, r, i, o, s) {
    this.type = e, this.attrs = t, this.marks = r, this.solid = i, this.options = s, this.content = [], this.activeMarks = Je.none, this.match = o || (s & Zn ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let t = this.type.contentMatch.fillBefore(_.from(e));
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
    let t = _.from(this.content);
    return !e && this.match && (t = t.append(this.match.fillBefore(_.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Os.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class vo {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0, this.localPreserveWS = !1;
    let i = t.topNode, o, s = bo(null, t.preserveWhitespace, 0) | (r ? Zn : 0);
    i ? o = new wr(i.type, i.attrs, Je.none, !0, t.topMatch || i.type.contentMatch, s) : r ? o = new wr(null, null, Je.none, !0, null, s) : o = new wr(e.schema.topNodeType, null, Je.none, !0, null, s), this.nodes = [o], this.find = t.findPositions, this.needsBlock = !1;
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
    let r = e.nodeValue, i = this.top, o = i.options & vi ? "full" : this.localPreserveWS || (i.options & ir) > 0, { schema: s } = this.parser;
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
    Fs.hasOwnProperty(s) && this.parser.normalizeLists && Ba(e);
    let c = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, r));
    e: if (c ? c.ignore : Fa.hasOwnProperty(s))
      this.findInside(e), this.ignoreFallback(e, t);
    else if (!c || c.skip || c.closeParent) {
      c && c.closeParent ? this.open = Math.max(0, this.open - 1) : c && c.skip.nodeType && (e = c.skip);
      let a, u = this.needsBlock;
      if (Os.hasOwnProperty(s))
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
      let s = Je.none;
      for (let l of i.concat(e.marks))
        (o.type ? o.type.allowsMarkType(l.type) : ko(l.type, e.type)) && (s = l.addToSet(s));
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
    let l = bo(e, o, s.options);
    s.options & Zn && s.content.length == 0 && (l |= Zn);
    let c = Je.none;
    return r = r.filter((a) => (s.type ? s.type.allowsMarkType(a.type) : ko(a.type, e)) ? (c = a.addToSet(c), !1) : !0), this.nodes.push(new wr(e, t, c, i, null, l)), this.open++, r;
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
function Ba(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && Fs.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function Ha(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function wo(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function ko(n, e) {
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
const Bs = 65535, Hs = Math.pow(2, 16);
function _a(n, e) {
  return n + e * Hs;
}
function So(n) {
  return n & Bs;
}
function ja(n) {
  return (n - (n & Bs)) / Hs;
}
const _s = 1, js = 2, Cr = 4, Ws = 8;
class wi {
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
    return (this.delInfo & Ws) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (_s | Cr)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (js | Cr)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & Cr) > 0;
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
    let t = 0, r = So(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + t + ja(e);
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
        let m = e == (t < 0 ? c : d) ? null : _a(l / 3, e - c), g = e == c ? js : e == d ? _s : Cr;
        return (t < 0 ? e != c : e != d) && (g |= Ws), new wi(p, g, m);
      }
      i += u - a;
    }
    return r ? e + i : new wi(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, i = So(t), o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
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
class Fr {
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
    return new Fr(this._maps, this.mirror, e, t);
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
    let e = new Fr();
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
    return r ? e : new wi(e, i, null);
  }
}
const si = /* @__PURE__ */ Object.create(null);
class Nt {
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
    let r = si[t.stepType];
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
    if (e in si)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return si[e] = t, t.prototype.jsonID = e, t;
  }
}
class dt {
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
    return new dt(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new dt(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, t, r, i) {
    try {
      return dt.ok(e.replace(t, r, i));
    } catch (o) {
      if (o instanceof nr)
        return dt.fail(o.message);
      throw o;
    }
  }
}
function _i(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let o = n.child(i);
    o.content.size && (o = o.copy(_i(o.content, e, o))), o.isInline && (o = e(o, t, i)), r.push(o);
  }
  return _.fromArray(r);
}
class an extends Nt {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new ce(_i(t.content, (s, l) => !s.isAtom || !l.type.allowsMarkType(this.mark.type) ? s : s.mark(this.mark.addToSet(s.marks)), i), t.openStart, t.openEnd);
    return dt.fromReplace(e, this.from, this.to, o);
  }
  invert() {
    return new qt(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new an(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof an && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new an(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new an(t.from, t.to, e.markFromJSON(t.mark));
  }
}
Nt.jsonID("addMark", an);
class qt extends Nt {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new ce(_i(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
    return dt.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new an(this.from, this.to, this.mark);
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
class un extends Nt {
  /**
  Create a node mark step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return dt.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return dt.fromReplace(e, this.pos, this.pos + 1, new ce(_.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    if (t) {
      let r = this.mark.addToSet(t.marks);
      if (r.length == t.marks.length) {
        for (let i = 0; i < t.marks.length; i++)
          if (!t.marks[i].isInSet(r))
            return new un(this.pos, t.marks[i]);
        return new un(this.pos, this.mark);
      }
    }
    return new Tn(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new un(t.pos, this.mark);
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
    return new un(t.pos, e.markFromJSON(t.mark));
  }
}
Nt.jsonID("addNodeMark", un);
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
      return dt.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return dt.fromReplace(e, this.pos, this.pos + 1, new ce(_.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new un(this.pos, this.mark);
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
    return this.structure && ki(e, this.from, this.to) ? dt.fail("Structure replace would overwrite content") : dt.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new zt([this.from, this.to - this.from, this.slice.size]);
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
    if (this.structure && (ki(e, this.from, this.gapFrom) || ki(e, this.gapTo, this.to)))
      return dt.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return dt.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? dt.fromReplace(e, this.from, this.to, r) : dt.fail("Content does not fit in gap");
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
function ki(n, e, t) {
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
function Wa(n, e, t, r) {
  let i = [], o = [], s, l;
  n.doc.nodesBetween(e, t, (c, a, u) => {
    if (!c.isInline)
      return;
    let d = c.marks;
    if (!r.isInSet(d) && u.type.allowsMarkType(r.type)) {
      let f = Math.max(a, e), p = Math.min(a + c.nodeSize, t), m = r.addToSet(d);
      for (let g = 0; g < d.length; g++)
        d[g].isInSet(m) || (s && s.to == f && s.mark.eq(d[g]) ? s.to = p : i.push(s = new qt(f, p, d[g])));
      l && l.to == f ? l.to = p : o.push(l = new an(f, p, r));
    }
  }), i.forEach((c) => n.step(c)), o.forEach((c) => n.step(c));
}
function qa(n, e, t, r) {
  let i = [], o = 0;
  n.doc.nodesBetween(e, t, (s, l) => {
    if (!s.isInline)
      return;
    o++;
    let c = null;
    if (r instanceof Ur) {
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
function ji(n, e, t, r = t.contentMatch, i = !0) {
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
          m || (m = new ce(_.from(t.schema.text(" ", t.allowedMarks(a.marks))), 0, 0)), s.push(new at(l + f.index, l + f.index + f[0].length, m));
      }
    }
    l = u;
  }
  if (!r.validEnd) {
    let c = r.fillBefore(_.empty, !0);
    n.replace(l, l, new ce(c, 0, 0));
  }
  for (let c = s.length - 1; c >= 0; c--)
    n.step(s[c]);
}
function Ka(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function Yn(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth, i = 0, o = 0; ; --r) {
    let s = n.$from.node(r), l = n.$from.index(r) + i, c = n.$to.indexAfter(r) - o;
    if (r < n.depth && s.canReplace(l, c, t))
      return r;
    if (r == 0 || s.type.spec.isolating || !Ka(s, l, c))
      break;
    l && (i = 1), c < s.childCount && (o = 1);
  }
  return null;
}
function Ja(n, e, t) {
  let { $from: r, $to: i, depth: o } = e, s = r.before(o + 1), l = i.after(o + 1), c = s, a = l, u = _.empty, d = 0;
  for (let m = o, g = !1; m > t; m--)
    g || r.index(m) > 0 ? (g = !0, u = _.from(r.node(m).copy(u)), d++) : c--;
  let f = _.empty, p = 0;
  for (let m = o, g = !1; m > t; m--)
    g || i.after(m + 1) < i.end(m) ? (g = !0, f = _.from(i.node(m).copy(f)), p++) : a++;
  n.step(new gt(c, a, s, l, new ce(u.append(f), d, p), u.size - d, !0));
}
function qs(n, e, t = null, r = n) {
  let i = Va(n, e), o = i && Ya(r, e);
  return o ? i.map(No).concat({ type: e, attrs: t }).concat(o.map(No)) : null;
}
function No(n) {
  return { type: n, attrs: null };
}
function Va(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.contentMatchAt(r).findWrapping(e);
  if (!o)
    return null;
  let s = o.length ? o[0] : e;
  return t.canReplaceWith(r, i, s) ? o : null;
}
function Ya(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.child(r), s = e.contentMatch.findWrapping(o.type);
  if (!s)
    return null;
  let c = (s.length ? s[s.length - 1] : e).contentMatch;
  for (let a = r; c && a < i; a++)
    c = c.matchType(t.child(a).type);
  return !c || !c.validEnd ? null : s;
}
function Ua(n, e, t) {
  let r = _.empty;
  for (let s = t.length - 1; s >= 0; s--) {
    if (r.size) {
      let l = t[s].type.contentMatch.matchFragment(r);
      if (!l || !l.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = _.from(t[s].type.create(t[s].attrs, r));
  }
  let i = e.start, o = e.end;
  n.step(new gt(i, o, i, o, new ce(r, 0, 0), t.length, !0));
}
function Ga(n, e, t, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let o = n.steps.length;
  n.doc.nodesBetween(e, t, (s, l) => {
    let c = typeof i == "function" ? i(s) : i;
    if (s.isTextblock && !s.hasMarkup(r, c) && Xa(n.doc, n.mapping.slice(o).map(l), r)) {
      let a = null;
      if (r.schema.linebreakReplacement) {
        let p = r.whitespace == "pre", m = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        p && !m ? a = !1 : !p && m && (a = !0);
      }
      a === !1 && Js(n, s, l, o), ji(n, n.mapping.slice(o).map(l, 1), r, void 0, a === null);
      let u = n.mapping.slice(o), d = u.map(l, 1), f = u.map(l + s.nodeSize, 1);
      return n.step(new gt(d, f, d + 1, f - 1, new ce(_.from(r.create(c, null, s.marks)), 0, 0), 1, !0)), a === !0 && Ks(n, s, l, o), !1;
    }
  });
}
function Ks(n, e, t, r) {
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
function Js(n, e, t, r) {
  e.forEach((i, o) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let s = n.mapping.slice(r).map(t + 1 + o);
      n.replaceWith(s, s + 1, e.type.schema.text(`
`));
    }
  });
}
function Xa(n, e, t) {
  let r = n.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, t);
}
function Qa(n, e, t, r, i) {
  let o = n.doc.nodeAt(e);
  if (!o)
    throw new RangeError("No node at given position");
  t || (t = o.type);
  let s = t.create(r, null, i || o.marks);
  if (o.isLeaf)
    return n.replaceWith(e, e + o.nodeSize, s);
  if (!t.validContent(o.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(new gt(e, e + o.nodeSize, e + 1, e + o.nodeSize - 1, new ce(_.from(s), 0, 0), 1, !0));
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
function Za(n, e, t = 1, r) {
  let i = n.doc.resolve(e), o = _.empty, s = _.empty;
  for (let l = i.depth, c = i.depth - t, a = t - 1; l > c; l--, a--) {
    o = _.from(i.node(l).copy(o));
    let u = r && r[a];
    s = _.from(u ? u.type.create(u.attrs, s) : i.node(l).copy(s));
  }
  n.step(new at(e, e, new ce(o.append(s), t, t), !0));
}
function Cn(n, e) {
  let t = n.resolve(e), r = t.index();
  return Vs(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function eu(n, e) {
  e.content.size || n.type.compatibleContent(e.type);
  let t = n.contentMatchAt(n.childCount), { linebreakReplacement: r } = n.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let o = e.child(i), s = o.type == r ? n.type.schema.nodes.text : o.type;
    if (t = t.matchType(s), !t || !n.type.allowsMarks(o.marks))
      return !1;
  }
  return t.validEnd;
}
function Vs(n, e) {
  return !!(n && e && !n.isLeaf && eu(n, e));
}
function Gr(n, e, t = -1) {
  let r = n.resolve(e);
  for (let i = r.depth; ; i--) {
    let o, s, l = r.index(i);
    if (i == r.depth ? (o = r.nodeBefore, s = r.nodeAfter) : t > 0 ? (o = r.node(i + 1), l++, s = r.node(i).maybeChild(l)) : (o = r.node(i).maybeChild(l - 1), s = r.node(i + 1)), o && !o.isTextblock && Vs(o, s) && r.node(i).canReplace(l, l + 1))
      return e;
    if (i == 0)
      break;
    e = t < 0 ? r.before(i) : r.after(i);
  }
}
function tu(n, e, t) {
  let r = null, { linebreakReplacement: i } = n.doc.type.schema, o = n.doc.resolve(e - t), s = o.node().type;
  if (i && s.inlineContent) {
    let u = s.whitespace == "pre", d = !!s.contentMatch.matchType(i);
    u && !d ? r = !1 : !u && d && (r = !0);
  }
  let l = n.steps.length;
  if (r === !1) {
    let u = n.doc.resolve(e + t);
    Js(n, u.node(), u.before(), l);
  }
  s.inlineContent && ji(n, e + t - 1, s, o.node().contentMatchAt(o.index()), r == null);
  let c = n.mapping.slice(l), a = c.map(e - t);
  if (n.step(new at(a, c.map(e + t, -1), ce.empty, !0)), r === !0) {
    let u = n.doc.resolve(a);
    Ks(n, u.node(), u.before(), n.steps.length);
  }
  return n;
}
function nu(n, e, t) {
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
function Xr(n, e, t = e, r = ce.empty) {
  if (e == t && !r.size)
    return null;
  let i = n.resolve(e), o = n.resolve(t);
  return Ys(i, o, r) ? new at(e, t, r) : new ru(i, o, r).fit();
}
function Ys(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class ru {
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.unplaced = r, this.frontier = [], this.placed = _.empty;
    for (let i = 0; i <= e.depth; i++) {
      let o = e.node(i);
      this.frontier.push({
        type: o.type,
        match: o.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = _.from(e.node(i).copy(this.placed));
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
        r ? (o = li(this.unplaced.content, r - 1).firstChild, i = o.content) : i = this.unplaced.content;
        let s = i.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: c, match: a } = this.frontier[l], u, d = null;
          if (t == 1 && (s ? a.matchType(s.type) || (d = a.fillBefore(_.from(s), !1)) : o && c.compatibleContent(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, inject: d };
          if (t == 2 && s && (u = a.findWrapping(s.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, wrap: u };
          if (o && a.matchType(o.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = li(e, t);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new ce(e, t + 1, Math.max(r, i.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = li(e, t);
    if (i.childCount <= 1 && t > 0) {
      let o = e.size - t <= t + i.size;
      this.unplaced = new ce(Gn(e, t - 1, 1), t - 1, o ? t - 1 : r);
    } else
      this.unplaced = new ce(Gn(e, t, 1), t, r);
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
      a++, (a > 1 || c == 0 || g.content.size) && (d = b, u.push(Us(g.mark(f.allowedMarks(g.marks)), a == 1 ? c : 0, a == l.childCount ? p : -1)));
    }
    let m = a == l.childCount;
    m || (p = -1), this.placed = Xn(this.placed, t, _.from(u)), this.frontier[t].match = d, m && p < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let g = 0, b = l; g < p; g++) {
      let x = b.lastChild;
      this.frontier.push({ type: x.type, match: x.contentMatchAt(x.childCount) }), b = x.content;
    }
    this.unplaced = m ? e == 0 ? ce.empty : new ce(Gn(s.content, e - 1, 1), e - 1, p < 0 ? s.openEnd : e - 1) : new ce(Gn(s.content, e, a), s.openStart, s.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !ci(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
      let { match: r, type: i } = this.frontier[t], o = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), s = ci(e, t, i, r, o);
      if (s) {
        for (let l = t - 1; l >= 0; l--) {
          let { match: c, type: a } = this.frontier[l], u = ci(e, l, a, c, !0);
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
    i.match = i.match.matchType(e), this.placed = Xn(this.placed, this.depth, _.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(_.empty, !0);
    t.childCount && (this.placed = Xn(this.placed, this.frontier.length, t));
  }
}
function Gn(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(Gn(n.firstChild.content, e - 1, t)));
}
function Xn(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(Xn(n.lastChild.content, e - 1, t)));
}
function li(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function Us(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, Us(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(_.empty, !0)))), n.copy(r);
}
function ci(n, e, t, r, i) {
  let o = n.node(e), s = i ? n.indexAfter(e) : n.index(e);
  if (s == o.childCount && !t.compatibleContent(o.type))
    return null;
  let l = r.fillBefore(o.content, !0, s);
  return l && !iu(t, o.content, s) ? l : null;
}
function iu(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function ou(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function su(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let i = n.doc.resolve(e), o = n.doc.resolve(t);
  if (Ys(i, o, r))
    return n.step(new at(e, t, r));
  let s = Xs(i, o);
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
    let p = a[f], m = ou(p.type);
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
        let D = i.node(b - 1), E = i.index(b - 1);
        if (D.canReplaceWith(E, E, m.type, m.marks))
          return n.replace(i.before(b), x ? o.after(b) : t, new ce(Gs(r.content, 0, r.openStart, p), p, r.openEnd));
      }
  }
  let d = n.steps.length;
  for (let f = s.length - 1; f >= 0 && (n.replace(e, t, r), !(n.steps.length > d)); f--) {
    let p = s[f];
    p < 0 || (e = i.before(p), t = o.after(p));
  }
}
function Gs(n, e, t, r, i) {
  if (e < t) {
    let o = n.firstChild;
    n = n.replaceChild(0, o.copy(Gs(o.content, e + 1, t, r, o)));
  }
  if (e > r) {
    let o = i.contentMatchAt(0), s = o.fillBefore(n).append(n);
    n = s.append(o.matchFragment(s).fillBefore(_.empty, !0));
  }
  return n;
}
function lu(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = nu(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new ce(_.from(r), 0, 0));
}
function cu(n, e, t) {
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
  let o = Xs(r, i);
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
function Xs(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let o = n.start(i);
    if (o < n.pos - (n.depth - i) || e.end(i) > e.pos + (e.depth - i) || n.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (o == e.start(i) || i == n.depth && i == e.depth && n.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == o - 1) && t.push(i);
  }
  return t;
}
class jn extends Nt {
  /**
  Construct an attribute step.
  */
  constructor(e, t, r) {
    super(), this.pos = e, this.attr = t, this.value = r;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return dt.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let o in t.attrs)
      r[o] = t.attrs[o];
    r[this.attr] = this.value;
    let i = t.type.create(r, null, t.marks);
    return dt.fromReplace(e, this.pos, this.pos + 1, new ce(_.from(i), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return zt.empty;
  }
  invert(e) {
    return new jn(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new jn(t.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number" || typeof t.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new jn(t.pos, t.attr, t.value);
  }
}
Nt.jsonID("attr", jn);
class or extends Nt {
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
    return dt.ok(r);
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
Nt.jsonID("docAttr", or);
let qn = class extends Error {
};
qn = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
qn.prototype = Object.create(Error.prototype);
qn.prototype.constructor = qn;
qn.prototype.name = "TransformError";
class au {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new Fr();
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
      throw new qn(t.failed);
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
    let i = Xr(this.doc, e, t, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, r) {
    return this.replace(e, t, new ce(_.from(r), 0, 0));
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
    return su(this, e, t, r), this;
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
    return lu(this, e, t, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return cu(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return Ja(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return tu(this, e, t), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, t) {
    return Ua(this, e, t), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, t = e, r, i = null) {
    return Ga(this, e, t, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, r = null, i) {
    return Qa(this, e, t, r, i), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  The `pos` addresses the document content. Use `setDocAttribute`
  to set attributes on the document itself.
  */
  setNodeAttribute(e, t, r) {
    return this.step(new jn(e, t, r)), this;
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
    return this.step(new un(e, t)), this;
  }
  /**
  Remove a mark (or all marks of the given type) from the node at
  position `pos`.
  */
  removeNodeMark(e, t) {
    let r = this.doc.nodeAt(e);
    if (!r)
      throw new RangeError("No node at position " + e);
    if (t instanceof Je)
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
    return Za(this, e, t, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, r) {
    return Wa(this, e, t, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, r) {
    return qa(this, e, t, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, t, r) {
    return ji(this, e, t, r), this;
  }
}
const ai = /* @__PURE__ */ Object.create(null);
class nt {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, r) {
    this.$anchor = e, this.$head = t, this.ranges = r || [new uu(e.min(t), e.max(t))];
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
      e.replaceRange(u.map(c.pos), u.map(a.pos), l ? ce.empty : t), l == 0 && Eo(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
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
      o ? e.deleteRange(a, u) : (e.replaceRangeWith(a, u, t), Eo(e, r, t.isInline ? -1 : 1));
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
    let i = e.parent.inlineContent ? new Mt(e) : Ln(e.node(0), e.parent, e.pos, e.index(), t, r);
    if (i)
      return i;
    for (let o = e.depth - 1; o >= 0; o--) {
      let s = t < 0 ? Ln(e.node(0), e.node(o), e.before(o + 1), e.index(o), t, r) : Ln(e.node(0), e.node(o), e.after(o + 1), e.index(o) + 1, t, r);
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
    return Ln(e, e, 0, 0, 1) || new Kt(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return Ln(e, e, e.content.size, e.childCount, -1) || new Kt(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = ai[t.type];
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
    if (e in ai)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return ai[e] = t, t.prototype.jsonID = e, t;
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
    return Mt.between(this.$anchor, this.$head).getBookmark();
  }
}
nt.prototype.visible = !0;
class uu {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let To = !1;
function Co(n) {
  !To && !n.parent.inlineContent && (To = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class Mt extends nt {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    Co(e), Co(t), super(e, t);
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
      return nt.near(r);
    let i = e.resolve(t.map(this.anchor));
    return new Mt(i.parent.inlineContent ? i : r, r);
  }
  replace(e, t = ce.empty) {
    if (super.replace(e, t), t == ce.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof Mt && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new Qr(this.anchor, this.head);
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
    return new Mt(e.resolve(t.anchor), e.resolve(t.head));
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
      let o = nt.findFrom(t, r, !0) || nt.findFrom(t, -r, !0);
      if (o)
        t = o.$head;
      else
        return nt.near(t, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = t : (e = (nt.findFrom(e, -r, !0) || nt.findFrom(e, r, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new Mt(e, t);
  }
}
nt.jsonID("text", Mt);
class Qr {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new Qr(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return Mt.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class Ve extends nt {
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
    return r ? nt.near(o) : new Ve(o);
  }
  content() {
    return new ce(_.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof Ve && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new Wi(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new Ve(e.resolve(t.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, t) {
    return new Ve(e.resolve(t));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
Ve.prototype.visible = !1;
nt.jsonID("node", Ve);
class Wi {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new Qr(r, r) : new Wi(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && Ve.isSelectable(r) ? new Ve(t) : nt.near(t);
  }
}
class Kt extends nt {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = ce.empty) {
    if (t == ce.empty) {
      e.delete(0, e.doc.content.size);
      let r = nt.atStart(e.doc);
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
    return du;
  }
}
nt.jsonID("all", Kt);
const du = {
  map() {
    return this;
  },
  resolve(n) {
    return new Kt(n);
  }
};
function Ln(n, e, t, r, i, o = !1) {
  if (e.inlineContent)
    return Mt.create(n, t);
  for (let s = r - (i > 0 ? 0 : 1); i > 0 ? s < e.childCount : s >= 0; s += i) {
    let l = e.child(s);
    if (l.isAtom) {
      if (!o && Ve.isSelectable(l))
        return Ve.create(n, t - (i < 0 ? l.nodeSize : 0));
    } else {
      let c = Ln(n, l, t + i, i < 0 ? l.childCount : 0, i, o);
      if (c)
        return c;
    }
    t += l.nodeSize * i;
  }
  return null;
}
function Eo(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e)
    return;
  let i = n.steps[r];
  if (!(i instanceof at || i instanceof gt))
    return;
  let o = n.mapping.maps[r], s;
  o.forEach((l, c, a, u) => {
    s == null && (s = u);
  }), n.setSelection(nt.near(n.doc.resolve(s), t));
}
function Mo(n, e) {
  return !e || !n ? n : n.bind(e);
}
class kr {
  constructor(e, t, r) {
    this.name = e, this.init = Mo(t.init, r), this.apply = Mo(t.apply, r);
  }
}
new kr("doc", {
  init(n) {
    return n.doc || n.schema.topNodeType.createAndFill();
  },
  apply(n) {
    return n.doc;
  }
}), new kr("selection", {
  init(n, e) {
    return n.selection || nt.atStart(e.doc);
  },
  apply(n) {
    return n.selection;
  }
}), new kr("storedMarks", {
  init(n) {
    return n.storedMarks || null;
  },
  apply(n, e, t, r) {
    return r.selection.$cursor ? n.storedMarks : null;
  }
}), new kr("scrollToSelection", {
  init() {
    return 0;
  },
  apply(n, e) {
    return n.scrolledIntoView ? e + 1 : e;
  }
});
const Qs = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function Zs(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const el = (n, e, t) => {
  let r = Zs(n, t);
  if (!r)
    return !1;
  let i = qi(r);
  if (!i) {
    let s = r.blockRange(), l = s && Yn(s);
    return l == null ? !1 : (e && e(n.tr.lift(s, l).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (al(n, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (Kn(o, "end") || Ve.isSelectable(o)))
    for (let s = r.depth; ; s--) {
      let l = Xr(n.doc, r.before(s), r.after(s), ce.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let c = n.tr.step(l);
          c.setSelection(Kn(o, "end") ? nt.findFrom(c.doc.resolve(c.mapping.map(i.pos, -1)), -1) : Ve.create(c.doc, i.pos - o.nodeSize)), e(c.scrollIntoView());
        }
        return !0;
      }
      if (s == 1 || r.node(s - 1).childCount > 1)
        break;
    }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos - o.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, fu = (n, e, t) => {
  let r = Zs(n, t);
  if (!r)
    return !1;
  let i = qi(r);
  return i ? tl(n, i, e) : !1;
}, hu = (n, e, t) => {
  let r = rl(n, t);
  if (!r)
    return !1;
  let i = Ki(r);
  return i ? tl(n, i, e) : !1;
};
function tl(n, e, t) {
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
  let a = Xr(n.doc, o, c, ce.empty);
  if (!a || a.from != o || a instanceof at && a.slice.size >= c - o)
    return !1;
  if (t) {
    let u = n.tr.step(a);
    u.setSelection(Mt.create(u.doc, o)), t(u.scrollIntoView());
  }
  return !0;
}
function Kn(n, e, t = !1) {
  for (let r = n; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (t && r.childCount != 1)
      return !1;
  }
  return !1;
}
const nl = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    o = qi(r);
  }
  let s = o && o.nodeBefore;
  return !s || !Ve.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(Ve.create(n.doc, o.pos - s.nodeSize)).scrollIntoView()), !0);
};
function qi(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function rl(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const il = (n, e, t) => {
  let r = rl(n, t);
  if (!r)
    return !1;
  let i = Ki(r);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (al(n, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (Kn(o, "start") || Ve.isSelectable(o))) {
    let s = Xr(n.doc, r.before(), r.after(), ce.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let l = n.tr.step(s);
        l.setSelection(Kn(o, "start") ? nt.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : Ve.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos, i.pos + o.nodeSize).scrollIntoView()), !0) : !1;
}, ol = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    o = Ki(r);
  }
  let s = o && o.nodeAfter;
  return !s || !Ve.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(Ve.create(n.doc, o.pos)).scrollIntoView()), !0);
};
function Ki(n) {
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
const pu = (n, e) => {
  let t = n.selection, r = t instanceof Ve, i;
  if (r) {
    if (t.node.isTextblock || !Cn(n.doc, t.from))
      return !1;
    i = t.from;
  } else if (i = Gr(n.doc, t.from, -1), i == null)
    return !1;
  if (e) {
    let o = n.tr.join(i);
    r && o.setSelection(Ve.create(o.doc, i - n.doc.resolve(i).nodeBefore.nodeSize)), e(o.scrollIntoView());
  }
  return !0;
}, mu = (n, e) => {
  let t = n.selection, r;
  if (t instanceof Ve) {
    if (t.node.isTextblock || !Cn(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = Gr(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, gu = (n, e) => {
  let { $from: t, $to: r } = n.selection, i = t.blockRange(r), o = i && Yn(i);
  return o == null ? !1 : (e && e(n.tr.lift(i, o).scrollIntoView()), !0);
}, sl = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function Ji(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const yu = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(r))
    return !1;
  let i = t.node(-1), o = t.indexAfter(-1), s = Ji(i.contentMatchAt(o));
  if (!s || !i.canReplaceWith(o, o, s))
    return !1;
  if (e) {
    let l = t.after(), c = n.tr.replaceWith(l, l, s.createAndFill());
    c.setSelection(nt.near(c.doc.resolve(l), 1)), e(c.scrollIntoView());
  }
  return !0;
}, ll = (n, e) => {
  let t = n.selection, { $from: r, $to: i } = t;
  if (t instanceof Kt || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = Ji(i.parent.contentMatchAt(i.indexAfter()));
  if (!o || !o.isTextblock)
    return !1;
  if (e) {
    let s = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = n.tr.insert(s, o.createAndFill());
    l.setSelection(Mt.create(l.doc, s + 1)), e(l.scrollIntoView());
  }
  return !0;
}, cl = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let o = t.before();
    if (rn(n.doc, o))
      return e && e(n.tr.split(o).scrollIntoView()), !0;
  }
  let r = t.blockRange(), i = r && Yn(r);
  return i == null ? !1 : (e && e(n.tr.lift(r, i).scrollIntoView()), !0);
};
function xu(n) {
  return (e, t) => {
    if (e.selection instanceof Ve && e.selection.node.isBlock) {
      let { $from: p } = e.selection;
      return !p.parentOffset || !rn(e.doc, p.pos) ? !1 : (t && t(e.tr.split(p.pos).scrollIntoView()), !0);
    }
    if (!e.selection.$from.depth)
      return !1;
    let r = e.tr;
    !e.selection.empty && (e.selection instanceof Mt || e.selection instanceof Kt) && r.deleteSelection();
    let { $from: i } = r.selection, o = r.steps.length, s = [], l, c, a = !1, u = !1;
    for (let p = i.depth; ; p--)
      if (i.node(p).isBlock) {
        a = i.end(p) == i.pos + (i.depth - p), u = i.start(p) == i.pos - (i.depth - p), c = Ji(i.node(p - 1).contentMatchAt(i.indexAfter(p - 1))), s.unshift(a && c ? { type: c } : null), l = p;
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
const bu = xu(), vu = (n, e) => {
  let { $from: t, to: r } = n.selection, i, o = t.sharedDepth(r);
  return o == 0 ? !1 : (i = t.before(o), e && e(n.tr.setSelection(Ve.create(n.doc, i))), !0);
};
function wu(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(o - 1, o) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || Cn(n.doc, e.pos)) ? !1 : (t && t(n.tr.join(e.pos).scrollIntoView()), !0);
}
function al(n, e, t, r) {
  let i = e.nodeBefore, o = e.nodeAfter, s, l, c = i.type.spec.isolating || o.type.spec.isolating;
  if (!c && wu(n, e, t))
    return !0;
  let a = !c && e.parent.canReplace(e.index(), e.index() + 1);
  if (a && (s = (l = i.contentMatchAt(i.childCount)).findWrapping(o.type)) && l.matchType(s[0] || o.type).validEnd) {
    if (t) {
      let p = e.pos + o.nodeSize, m = _.empty;
      for (let x = s.length - 1; x >= 0; x--)
        m = _.from(s[x].create(null, m));
      m = _.from(i.copy(m));
      let g = n.tr.step(new gt(e.pos - 1, p, e.pos, p, new ce(m, 1, 0), s.length, !0)), b = g.doc.resolve(p + 2 * s.length);
      b.nodeAfter && b.nodeAfter.type == i.type && Cn(g.doc, b.pos) && g.join(b.pos), t(g.scrollIntoView());
    }
    return !0;
  }
  let u = o.type.spec.isolating || r > 0 && c ? null : nt.findFrom(e, 1), d = u && u.$from.blockRange(u.$to), f = d && Yn(d);
  if (f != null && f >= e.depth)
    return t && t(n.tr.lift(d, f).scrollIntoView()), !0;
  if (a && Kn(o, "start", !0) && Kn(i, "end")) {
    let p = i, m = [];
    for (; m.push(p), !p.isTextblock; )
      p = p.lastChild;
    let g = o, b = 1;
    for (; !g.isTextblock; g = g.firstChild)
      b++;
    if (p.canReplace(p.childCount, p.childCount, g.content)) {
      if (t) {
        let x = _.empty;
        for (let E = m.length - 1; E >= 0; E--)
          x = _.from(m[E].copy(x));
        let D = n.tr.step(new gt(e.pos - m.length, e.pos + o.nodeSize, e.pos + b, e.pos + o.nodeSize - b, new ce(x, m.length, 0), 0, !0));
        t(D.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function ul(n) {
  return function(e, t) {
    let r = e.selection, i = n < 0 ? r.$from : r.$to, o = i.depth;
    for (; i.node(o).isInline; ) {
      if (!o)
        return !1;
      o--;
    }
    return i.node(o).isTextblock ? (t && t(e.tr.setSelection(Mt.create(e.doc, n < 0 ? i.start(o) : i.end(o)))), !0) : !1;
  };
}
const ku = ul(-1), Su = ul(1);
function Nu(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o), l = s && qs(s, n, e);
    return l ? (r && r(t.tr.wrap(s, l).scrollIntoView()), !0) : !1;
  };
}
function Ro(n, e = null) {
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
function Vi(...n) {
  return function(e, t, r) {
    for (let i = 0; i < n.length; i++)
      if (n[i](e, t, r))
        return !0;
    return !1;
  };
}
Vi(Qs, el, nl);
Vi(Qs, il, ol);
Vi(sl, ll, cl, bu);
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function Tu(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o);
    if (!s)
      return !1;
    let l = r ? t.tr : null;
    return Cu(l, s, n, e) ? (r && r(l.scrollIntoView()), !0) : !1;
  };
}
function Cu(n, e, t, r = null) {
  let i = !1, o = e, s = e.$from.doc;
  if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(t) && e.startIndex == 0) {
    if (e.$from.index(e.depth - 1) == 0)
      return !1;
    let c = s.resolve(e.start - 2);
    o = new Pr(c, c, e.depth), e.endIndex < e.parent.childCount && (e = new Pr(e.$from, s.resolve(e.$to.end(e.depth)), e.depth)), i = !0;
  }
  let l = qs(o, t, r, e);
  return l ? (n && Eu(n, e, l, i, t), !0) : !1;
}
function Eu(n, e, t, r, i) {
  let o = _.empty;
  for (let u = t.length - 1; u >= 0; u--)
    o = _.from(t[u].type.create(t[u].attrs, o));
  n.step(new gt(e.start - (r ? 2 : 0), e.end, e.start, e.end, new ce(o, 0, 0), t.length, !0));
  let s = 0;
  for (let u = 0; u < t.length; u++)
    t[u].type == i && (s = u + 1);
  let l = t.length - s, c = e.start + t.length - (r ? 2 : 0), a = e.parent;
  for (let u = e.startIndex, d = e.endIndex, f = !0; u < d; u++, f = !1)
    !f && rn(n.doc, c, l) && (n.split(c, l), c += 2 * l), c += a.child(u).nodeSize;
  return n;
}
function Mu(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (s) => s.childCount > 0 && s.firstChild.type == n);
    return o ? t ? r.node(o.depth - 1).type == n ? Ru(e, t, n, o) : Au(e, t, o) : !0 : !1;
  };
}
function Ru(n, e, t, r) {
  let i = n.tr, o = r.end, s = r.$to.end(r.depth);
  o < s && (i.step(new gt(o - 1, s, o, s, new ce(_.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new Pr(i.doc.resolve(r.$from.pos), i.doc.resolve(s), r.depth));
  const l = Yn(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let c = i.doc.resolve(i.mapping.map(o, -1) - 1);
  return Cn(i.doc, c.pos) && c.nodeBefore.type == c.nodeAfter.type && i.join(c.pos), e(i.scrollIntoView()), !0;
}
function Au(n, e, t) {
  let r = n.tr, i = t.parent;
  for (let p = t.end, m = t.endIndex - 1, g = t.startIndex; m > g; m--)
    p -= i.child(m).nodeSize, r.delete(p - 1, p + 1);
  let o = r.doc.resolve(t.start), s = o.nodeAfter;
  if (r.mapping.map(t.end) != t.start + o.nodeAfter.nodeSize)
    return !1;
  let l = t.startIndex == 0, c = t.endIndex == i.childCount, a = o.node(-1), u = o.index(-1);
  if (!a.canReplace(u + (l ? 0 : 1), u + 1, s.content.append(c ? _.empty : _.from(i))))
    return !1;
  let d = o.pos, f = d + s.nodeSize;
  return r.step(new gt(d - (l ? 1 : 0), f + (c ? 1 : 0), d + 1, f - 1, new ce((l ? _.empty : _.from(i.copy(_.empty))).append(c ? _.empty : _.from(i.copy(_.empty))), l ? 0 : 1, c ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function Iu(n) {
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
      let a = c.lastChild && c.lastChild.type == l.type, u = _.from(a ? n.create() : null), d = new ce(_.from(n.create(null, _.from(l.type.create(null, u)))), a ? 3 : 1, 0), f = o.start, p = o.end;
      t(e.tr.step(new gt(f - (a ? 3 : 1), p, f, p, d, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function dl(n) {
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
var $u = class fl {
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
    const e = fl.createFakeChain();
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
      state: dl({
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
const zu = () => ({ editor: n, view: e }) => (requestAnimationFrame(() => {
  if (!n.isDestroyed) {
    var t;
    e.dom.blur(), (t = window) === null || t === void 0 || (t = t.getSelection()) === null || t === void 0 || t.removeAllRanges();
  }
}), !0), Du = (n = !0) => ({ commands: e }) => e.setContent("", { emitUpdate: n }), Pu = () => ({ state: n, tr: e, dispatch: t }) => {
  const { selection: r } = e, { ranges: i } = r;
  return t && i.forEach(({ $from: o, $to: s }) => {
    n.doc.nodesBetween(o.pos, s.pos, (l, c) => {
      if (l.type.isText) return;
      const { doc: a, mapping: u } = e, d = a.resolve(u.map(c)), f = a.resolve(u.map(c + l.nodeSize)), p = d.blockRange(f);
      if (!p) return;
      const m = Yn(p);
      if (l.type.isTextblock) {
        const { defaultType: g } = d.parent.contentMatchAt(d.index());
        e.setNodeMarkup(p.start, g);
      }
      (m || m === 0) && e.lift(p, m);
    });
  }), !0;
}, Lu = (n) => (e) => n(e), Ou = () => ({ state: n, dispatch: e }) => ll(n, e), Fu = (n, e) => ({ editor: t, tr: r }) => {
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
const Hu = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const i = St(n, t.schema), o = e.selection.$anchor;
  for (let s = o.depth; s > 0; s -= 1) if (o.node(s).type === i) {
    if (r) {
      const l = o.before(s), c = o.after(s);
      e.delete(l, c).scrollIntoView();
    }
    return !0;
  }
  return !1;
}, _u = (n) => ({ tr: e, dispatch: t }) => {
  const { from: r, to: i } = n;
  return t && e.delete(r, i), !0;
}, ju = (n) => n.content ? /^text(\*|\+)/.test(n.content) : !1, Ao = (n, e, t) => {
  if (!n.parent.isInline || t === "left" && n.pos > n.start() || t === "right" && n.pos < n.end()) return n.pos;
  const r = e.nodes[n.parent.type.name].spec;
  return ju(r) ? t === "left" ? n.start() - 1 : n.end() + 1 : n.pos;
}, Wu = (n, e, t) => ({
  from: Ao(n, t, "left"),
  to: Ao(e, t, "right")
}), qu = () => ({ state: n, dispatch: e }) => {
  if (n.selection.empty) return !1;
  if (e) {
    const t = n.tr, { ranges: r } = n.selection, i = t.steps.length;
    r.forEach((o) => {
      const s = t.mapping.slice(i), l = t.doc.resolve(s.map(o.$from.pos)), c = t.doc.resolve(s.map(o.$to.pos)), { from: a, to: u } = Wu(l, c, n.schema);
      t.deleteRange(a, u);
    }), t.selection.empty || t.setSelection(Ot.near(t.doc.resolve(t.selection.from))), t.scrollIntoView(), e(t);
  }
  return !0;
}, Ku = () => ({ commands: n }) => n.keyboardShortcut("Enter"), Ju = () => ({ state: n, dispatch: e }) => yu(n, e);
function Vu(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
function Br(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => t.strict ? e[i] === n[i] : Vu(e[i]) ? e[i].test(n[i]) : e[i] === n[i]) : !0;
}
function hl(n, e, t = {}) {
  return n.find((r) => r.type === e && Br(Object.fromEntries(Object.keys(t).map((i) => [i, r.attrs[i]])), t));
}
function Io(n, e, t = {}) {
  return !!hl(n, e, t);
}
function pl(n, e, t) {
  if (!n || !e) return;
  let r = n.parent.childAfter(n.parentOffset);
  if ((!r.node || !r.node.marks.some((c) => c.type === e)) && (r = n.parent.childBefore(n.parentOffset)), !r.node || !r.node.marks.some((c) => c.type === e)) return;
  if (!t) {
    const c = r.node.marks.find((a) => a.type === e);
    c && (t = c.attrs);
  }
  if (!hl([...r.node.marks], e, t)) return;
  let i = r.index, o = n.start() + r.offset, s = i + 1, l = o + r.node.nodeSize;
  for (; i > 0 && Io([...n.parent.child(i - 1).marks], e, t); )
    i -= 1, o -= n.parent.child(i).nodeSize;
  for (; s < n.parent.childCount && Io([...n.parent.child(s).marks], e, t); )
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
const Yu = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const o = pn(n, r.schema), { doc: s, selection: l } = t, { $from: c, from: a, to: u } = l;
  if (i) {
    const d = pl(c, o, e);
    if (d && d.from <= a && d.to >= u) {
      const f = Ot.create(s, d.from, d.to);
      t.setSelection(f);
    }
  }
  return !0;
}, Uu = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let r = 0; r < t.length; r += 1) if (t[r](e)) return !0;
  return !1;
};
function ml(n) {
  return n instanceof Ot;
}
function bn(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function Gu(n, e = null) {
  if (!e) return null;
  const t = Bn.atStart(n), r = Bn.atEnd(n);
  if (e === "start" || e === !0) return t;
  if (e === "end") return r;
  const i = t.from, o = r.to;
  return e === "all" ? Ot.create(n, bn(0, i, o), bn(n.content.size, i, o)) : Ot.create(n, bn(e, i, o), bn(e, i, o));
}
function $o() {
  return ["Android"].includes(navigator.platform) || /android/i.test(navigator.userAgent);
}
function Hr() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
function Xu() {
  return typeof navigator < "u" ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : !1;
}
const Qu = (n = null, e = {}) => ({ editor: t, view: r, tr: i, dispatch: o }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const s = () => {
    (Hr() || $o()) && r.dom.focus(), Xu() && !Hr() && !$o() && r.dom.focus({ preventScroll: !0 }), requestAnimationFrame(() => {
      t.isDestroyed || (r.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  try {
    if (r.hasFocus() && n === null || n === !1) return !0;
  } catch {
    return !1;
  }
  if (o && n === null && !ml(t.state.selection))
    return s(), !0;
  const l = Gu(i.doc, n) || t.state.selection, c = t.state.selection.eq(l);
  return o && (c || i.setSelection(l), c && i.storedMarks && i.setStoredMarks(i.storedMarks), s()), !0;
}, Zu = (n, e) => (t) => n.every((r, i) => e(r, {
  ...t,
  index: i
})), ed = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt({
  from: t.selection.from,
  to: t.selection.to
}, n, e), gl = (n) => {
  const e = n.childNodes;
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const r = e[t];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? n.removeChild(r) : r.nodeType === 1 && gl(r);
  }
  return n;
};
function Sr(n) {
  if (typeof window > "u") throw new Error("[tiptap error]: there is no window object available, so this function cannot be used");
  const e = `<body>${n}</body>`, t = new window.DOMParser().parseFromString(e, "text/html").body;
  return gl(t);
}
function yl(n) {
  return typeof (n == null ? void 0 : n.nodesBetween) == "function";
}
function Jn(n, e, t) {
  if (yl(n)) return n;
  const r = typeof n == "object" && n !== null;
  t = {
    slice: !0,
    parseOptions: {},
    ...t
  };
  const i = typeof n == "string";
  if (r) try {
    if (Array.isArray(n) && n.length > 0) return _.fromArray(n.map((s) => e.nodeFromJSON(s)));
    const o = e.nodeFromJSON(n);
    return t.errorOnInvalidContent && o.check(), o;
  } catch (o) {
    if (t.errorOnInvalidContent) throw new Error("[tiptap error]: Invalid JSON content", { cause: o });
    return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", o), Jn("", e, t);
  }
  if (i) {
    if (t.errorOnInvalidContent) {
      let s = !1, l = "";
      const c = new Pa({
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
      if (t.slice ? _n.fromSchema(c).parseSlice(Sr(n), t.parseOptions) : _n.fromSchema(c).parse(Sr(n), t.parseOptions), t.errorOnInvalidContent && s) throw new Error("[tiptap error]: Invalid HTML content", { cause: /* @__PURE__ */ new Error(`Invalid element found: ${l}`) });
    }
    const o = _n.fromSchema(e);
    return t.slice ? o.parseSlice(Sr(n), t.parseOptions).content : o.parse(Sr(n), t.parseOptions);
  }
  return Jn("", e, t);
}
function xl(n) {
  return !("type" in n);
}
function bl(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e) return;
  const i = n.steps[r];
  if (!(i instanceof at || i instanceof gt)) return;
  const o = n.mapping.maps[r];
  let s = 0;
  o.forEach((l, c, a, u) => {
    s === 0 && (s = u);
  }), n.setSelection(Bn.near(n.doc.resolve(s), t));
}
const td = (n, e, t) => ({ tr: r, dispatch: i, editor: o }) => {
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
      Jn(e, o.schema, {
        parseOptions: a,
        errorOnInvalidContent: !0
      });
    } catch (b) {
      c(b);
    }
    try {
      var s;
      l = Jn(e, o.schema, {
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
    const m = xl(l) ? l.content : [l];
    if (m.forEach((b) => {
      b.check(), f = f ? b.isText && b.marks.length === 0 : !1, p = p ? b.isBlock : !1;
    }), u === d && p) {
      const { parent: b } = r.doc.resolve(u);
      b.isTextblock && !b.type.spec.code && !b.childCount && (u -= 1, d += 1);
    }
    let g;
    if (f)
      Array.isArray(e) ? g = e.map((b) => b.text || "").join("") : yl(e) ? g = m.map((b) => {
        var x;
        return (x = b.text) !== null && x !== void 0 ? x : "";
      }).join("") : typeof e == "object" && e && e.text ? g = e.text : g = e, r.insertText(g, u, d);
    else {
      g = _.from(m);
      const b = r.doc.resolve(u), x = b.node(), D = b.parentOffset === 0, E = x.isText || x.isTextblock, S = x.content.size > 0;
      D && E && S && p && (u = Math.max(0, u - 1)), r.replaceWith(u, d, m);
    }
    t.updateSelection && bl(r, r.steps.length - 1, -1), t.applyInputRules && r.setMeta("applyInputRules", {
      from: u,
      text: g
    }), t.applyPasteRules && r.setMeta("applyPasteRules", {
      from: u,
      text: g
    });
  }
  return !0;
};
function vl(n) {
  for (let e = 0; e < n.edgeCount; e += 1) {
    const { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs()) return t;
  }
  return null;
}
const nd = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
  const { pos: i, attrs: o, content: s, updateSelection: l = !0 } = n;
  let c;
  typeof i == "number" ? c = e.doc.resolve(i) : i ? c = i : c = e.selection.$from;
  const a = vl(c.parent.contentMatchAt(c.index()));
  if (!a) return !1;
  const u = Object.keys(a.spec.attrs || {}), d = o ? Object.fromEntries(Object.entries(o).filter(([p]) => u.includes(p))) : {};
  let f;
  if (s) {
    const p = Jn(s, r.schema);
    f = a.createAndFill(d, p);
  } else f = a.createAndFill(d);
  return f ? (t && (e.insert(c.pos, f), l && bl(e, e.steps.length - 1, -1)), !0) : !1;
}, rd = () => ({ state: n, dispatch: e }) => pu(n, e), id = () => ({ state: n, dispatch: e }) => mu(n, e), od = () => ({ state: n, dispatch: e }) => el(n, e), sd = () => ({ state: n, dispatch: e }) => il(n, e), ld = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = Gr(n.doc, n.selection.$from.pos, -1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, cd = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = Gr(n.doc, n.selection.$from.pos, 1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, ad = () => ({ state: n, dispatch: e }) => fu(n, e), ud = () => ({ state: n, dispatch: e }) => hu(n, e);
function wl() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function dd(n) {
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
      Hr() || wl() ? s = !0 : i = !0;
    else throw new Error(`Unrecognized modifier name: ${c}`);
  }
  return r && (t = `Alt-${t}`), i && (t = `Ctrl-${t}`), s && (t = `Meta-${t}`), o && (t = `Shift-${t}`), t;
}
const fd = (n) => ({ editor: e, view: t, tr: r, dispatch: i }) => {
  const o = dd(n).split(/-(?!$)/), s = o.find((a) => ![
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
function Yi(n, e, t = {}) {
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
const hd = (n, e = {}) => ({ state: t, dispatch: r }) => Yi(t, St(n, t.schema), e) ? gu(t, r) : !1, pd = () => ({ state: n, dispatch: e }) => cl(n, e), md = (n) => ({ state: e, dispatch: t }) => {
  const r = St(n, e.schema);
  return Mu(r)(e, t);
}, gd = () => ({ state: n, dispatch: e }) => sl(n, e);
function kl(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function zo(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((r, i) => (t.includes(i) || (r[i] = n[i]), r), {});
}
const yd = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = kl(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = St(n, r.schema)), l === "mark" && (s = pn(n, r.schema));
  let c = !1;
  return t.selection.ranges.forEach((a) => {
    r.doc.nodesBetween(a.$from.pos, a.$to.pos, (u, d) => {
      o && o === u.type && (c = !0, i && t.setNodeMarkup(d, void 0, zo(u.attrs, e))), s && u.marks.length && u.marks.forEach((f) => {
        s === f.type && (c = !0, i && t.addMark(d, d + u.nodeSize, s.create(zo(f.attrs, e))));
      });
    });
  }), c;
}, xd = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), bd = () => ({ tr: n, dispatch: e }) => {
  if (e) {
    const t = new rc(n.doc);
    n.setSelection(t);
  }
  return !0;
}, vd = () => ({ state: n, dispatch: e }) => nl(n, e), wd = () => ({ state: n, dispatch: e }) => ol(n, e), kd = () => ({ state: n, dispatch: e }) => vu(n, e), Sd = () => ({ state: n, dispatch: e }) => Su(n, e), Nd = () => ({ state: n, dispatch: e }) => ku(n, e);
function Td(n, e, t = {}, r = {}) {
  return Jn(n, e, {
    slice: !1,
    parseOptions: t,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
const Cd = (n, { errorOnInvalidContent: e, emitUpdate: t = !0, parseOptions: r = {} } = {}) => ({ editor: i, tr: o, dispatch: s, commands: l }) => {
  const { doc: c } = o;
  if (r.preserveWhitespace !== "full") {
    const a = Td(n, i.schema, r, { errorOnInvalidContent: e ?? i.options.enableContentCheck });
    if (s) {
      const u = xl(a) ? a.content : [a];
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
function Ed(n, e) {
  const t = pn(e, n.schema), { from: r, to: i, empty: o } = n.selection, s = [];
  o ? (n.storedMarks && s.push(...n.storedMarks), s.push(...n.selection.$head.marks())) : n.doc.nodesBetween(r, i, (c) => {
    s.push(...c.marks);
  });
  const l = s.find((c) => c.type.name === t.name);
  return l ? { ...l.attrs } : {};
}
function Md(n, e) {
  const t = new au(n);
  return e.forEach((r) => {
    r.steps.forEach((i) => {
      t.step(i);
    });
  }), t;
}
function Rd(n, e) {
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
function Ui(n) {
  return (e) => Rd(e.$from, n);
}
function sr(n, e, t) {
  return n.config[e] === void 0 && n.parent ? sr(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? sr(n.parent, e, t) : null
  }) : n.config[e];
}
function Ad(n) {
  return typeof n == "function";
}
function Si(n, e = void 0, ...t) {
  return Ad(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function Sl(n) {
  return {
    baseExtensions: n.filter((e) => e.type === "extension"),
    nodeExtensions: n.filter((e) => e.type === "node"),
    markExtensions: n.filter((e) => e.type === "mark")
  };
}
function Id(n, e, t) {
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
function $d(n) {
  return Object.fromEntries(Object.entries(n.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
function zd(n, e = JSON.stringify) {
  const t = {};
  return n.filter((r) => {
    const i = e(r);
    return Object.prototype.hasOwnProperty.call(t, i) ? !1 : t[i] = !0;
  });
}
function Dd(n) {
  const e = zd(n);
  return e.length === 1 ? e : e.filter((t, r) => !e.filter((i, o) => o !== r).some((i) => t.oldRange.from >= i.oldRange.from && t.oldRange.to <= i.oldRange.to && t.newRange.from >= i.newRange.from && t.newRange.to <= i.newRange.to));
}
function Pd(n) {
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
  }), Dd(r);
}
function Er(n, e, t) {
  return Object.fromEntries(Object.entries(t).filter(([r]) => {
    const i = n.find((o) => o.type === e && o.name === r);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function Ld(n, e, t = {}) {
  const { empty: r, ranges: i } = n.selection, o = e ? pn(e, n.schema) : null;
  if (r) return !!(n.storedMarks || n.selection.$from.marks()).filter((u) => o ? o.name === u.type.name : !0).find((u) => Br(u.attrs, t, { strict: !1 }));
  let s = 0;
  const l = [];
  if (i.forEach(({ $from: u, $to: d }) => {
    const f = u.pos, p = d.pos;
    n.doc.nodesBetween(f, p, (m, g) => {
      if (o && m.inlineContent && !m.type.allowsMarkType(o)) return !1;
      if (!m.isText && !m.marks.length) return;
      const b = Math.max(f, g), x = Math.min(p, g + m.nodeSize), D = x - b;
      s += D, l.push(...m.marks.map((E) => ({
        mark: E,
        from: b,
        to: x
      })));
    });
  }), s === 0) return !1;
  const c = l.filter((u) => o ? o.name === u.mark.type.name : !0).filter((u) => Br(u.mark.attrs, t, { strict: !1 })).reduce((u, d) => u + d.to - d.from, 0), a = l.filter((u) => o ? u.mark.type !== o && u.mark.type.excludes(o) : !0).reduce((u, d) => u + d.to - d.from, 0);
  return (c > 0 ? c + a : c) >= s;
}
function ui(n, e) {
  const { nodeExtensions: t } = Sl(e), r = t.find((o) => o.name === n);
  if (!r) return !1;
  const i = Si(sr(r, "group", {
    name: r.name,
    options: r.options,
    storage: r.storage
  }));
  return typeof i != "string" ? !1 : i.split(" ").includes("list");
}
function Nl(n, { checkChildren: e = !0, ignoreWhitespace: t = !1 } = {}) {
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
      i !== !1 && (Nl(o, {
        ignoreWhitespace: t,
        checkChildren: e
      }) || (i = !1));
    }), i;
  }
  return !1;
}
function Od(n, e, t) {
  const { selection: r } = e;
  let i = null;
  if (ml(r) && (i = r.$cursor), i) {
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
const Fd = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = t, { empty: s, ranges: l } = o, c = pn(n, r.schema);
  if (i)
    if (s) {
      const a = Ed(r, c);
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
  return Od(r, t, c);
}, Bd = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), Hd = (n, e = {}) => ({ state: t, dispatch: r, chain: i }) => {
  const o = St(n, t.schema);
  let s;
  return t.selection.$anchor.sameParent(t.selection.$head) && (s = t.selection.$anchor.parent.attrs), o.isTextblock ? i().command(({ commands: l }) => Ro(o, {
    ...s,
    ...e
  })(t) ? !0 : l.clearNodes()).command(({ state: l }) => Ro(o, {
    ...s,
    ...e
  })(l, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, _d = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, i = bn(n, 0, r.content.size), o = Wn.create(r, i);
    e.setSelection(o);
  }
  return !0;
}, jd = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = r;
  let s, l;
  return typeof e == "number" ? (s = e, l = e) : e && "from" in e && "to" in e ? (s = e.from, l = e.to) : (s = o.from, l = o.to), i && t.doc.nodesBetween(s, l, (c, a) => {
    c.isText || t.setNodeMarkup(a, void 0, {
      ...c.attrs,
      dir: n
    });
  }), !0;
}, Wd = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, { from: i, to: o } = typeof n == "number" ? {
      from: n,
      to: n
    } : n, s = Ot.atStart(r).from, l = Ot.atEnd(r).to, c = bn(i, s, l), a = bn(o, s, l), u = Ot.create(r, c, a);
    e.setSelection(u);
  }
  return !0;
}, qd = (n) => ({ state: e, dispatch: t }) => {
  const r = St(n, e.schema);
  return Iu(r)(e, t);
};
function Do(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    n.tr.ensureMarks(r);
  }
}
const Kd = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
  const { selection: o, doc: s } = e, { $from: l, $to: c } = o, a = i.extensionManager.attributes, u = Er(a, l.node().type.name, l.node().attrs);
  if (o instanceof Wn && o.node.isBlock)
    return !l.parentOffset || !rn(s, l.pos) ? !1 : (r && (n && Do(t, i.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock) return !1;
  const d = c.parentOffset === c.parent.content.size, f = l.depth === 0 ? void 0 : vl(l.node(-1).contentMatchAt(l.indexAfter(-1)));
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
    n && Do(t, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return m;
}, Jd = (n, e = {}) => ({ tr: t, state: r, dispatch: i, editor: o }) => {
  const s = St(n, r.schema), { $from: l, $to: c } = r.selection, a = r.selection.node;
  if (a && a.isBlock || l.depth < 2 || !l.sameParent(c)) return !1;
  const u = l.node(-1);
  if (u.type !== s) return !1;
  const d = o.extensionManager.attributes;
  if (l.parent.content.size === 0 && l.node(-1).childCount === l.indexAfter(-1)) {
    if (l.depth === 2 || l.node(-3).type !== s || l.index(-2) !== l.node(-2).childCount - 1) return !1;
    if (i) {
      var f;
      let x = _.empty;
      const D = l.index(-1) ? 1 : l.index(-2) ? 2 : 3;
      for (let q = l.depth - D; q >= l.depth - 3; q -= 1) x = _.from(l.node(q).copy(x));
      const E = l.indexAfter(-1) < l.node(-2).childCount ? 1 : l.indexAfter(-2) < l.node(-3).childCount ? 2 : 3, S = {
        ...Er(d, l.node().type.name, l.node().attrs),
        ...e
      }, N = ((f = s.contentMatch.defaultType) === null || f === void 0 ? void 0 : f.createAndFill(S)) || void 0;
      x = x.append(_.from(s.createAndFill(null, N) || void 0));
      const T = l.before(l.depth - (D - 1));
      t.replace(T, l.after(-E), new ce(x, 4 - D, 0));
      let H = -1;
      t.doc.nodesBetween(T, t.doc.content.size, (q, C) => {
        if (H > -1) return !1;
        q.isTextblock && q.content.size === 0 && (H = C + 1);
      }), H > -1 && t.setSelection(Ot.near(t.doc.resolve(H))), t.scrollIntoView();
    }
    return !0;
  }
  const p = c.pos === l.end() ? u.contentMatchAt(0).defaultType : null, m = {
    ...Er(d, u.type.name, u.attrs),
    ...e
  }, g = {
    ...Er(d, l.node().type.name, l.node().attrs),
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
    const { selection: x, storedMarks: D } = r, { splittableMarks: E } = o.extensionManager, S = D || x.$to.parentOffset && x.$from.marks();
    if (t.split(l.pos, 2, b).scrollIntoView(), !S || !i) return !0;
    const N = S.filter((T) => E.includes(T.type.name));
    t.ensureMarks(N);
  }
  return !0;
};
function Po(n) {
  return !n || n === "1" ? null : n;
}
function Tl(n, e) {
  return Po(n) === Po(e);
}
const di = (n, e) => {
  const t = Ui((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && Cn(n.doc, t.pos)) || !Tl(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(t.pos), !0;
}, fi = (n, e) => {
  const t = Ui((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && Cn(n.doc, r)) || !Tl(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(r), !0;
};
function Vd(n) {
  const e = n.doc, t = e.firstChild;
  if (!t) return null;
  const r = e.resolve(1), i = e.resolve(t.nodeSize - 1);
  return Ot.between(r, i);
}
const Yd = (n, e, t, r = {}) => ({ editor: i, tr: o, state: s, dispatch: l, chain: c, commands: a, can: u }) => {
  const { extensions: d, splittableMarks: f } = i.extensionManager, p = St(n, s.schema), m = St(e, s.schema), { selection: g, storedMarks: b } = s, { $from: x, $to: D } = g, E = x.blockRange(D), S = b || g.$to.parentOffset && g.$from.marks();
  if (!E) return !1;
  const N = Ui((F) => ui(F.type.name, d))(g), T = g.from === 0 && g.to === s.doc.content.size, H = s.doc.content.content, q = H.length === 1 ? H[0] : null, C = T && q && ui(q.type.name, d) ? {
    node: q,
    pos: 0
  } : null, K = N ?? C, w = !!N && E.depth >= 1 && E.depth - N.depth <= 1, I = !!C;
  if ((w || I) && K) {
    if (K.node.type === p)
      return T && I ? c().command(({ tr: F, dispatch: U }) => {
        const j = Vd(F);
        return j ? (F.setSelection(j), U && U(F), !0) : !1;
      }).liftListItem(m).run() : a.liftListItem(m);
    if (ui(K.node.type.name, d) && p.validContent(K.node.content)) return c().command(() => (o.setNodeMarkup(K.pos, p), !0)).command(() => di(o, p)).command(() => fi(o, p)).run();
  }
  return !t || !S || !l ? c().command(() => u().wrapInList(p, r) ? !0 : a.clearNodes()).wrapInList(p, r).command(() => di(o, p)).command(() => fi(o, p)).run() : c().command(() => {
    const F = u().wrapInList(p, r), U = S.filter((j) => f.includes(j.type.name));
    return o.ensureMarks(U), F ? !0 : a.clearNodes();
  }).wrapInList(p, r).command(() => di(o, p)).command(() => fi(o, p)).run();
}, Ud = (n, e = {}, t = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: o = !1 } = t, s = pn(n, r.schema);
  return Ld(r, s, e) ? i.unsetMark(s, { extendEmptyMarkRange: o }) : i.setMark(s, e);
}, Gd = (n, e, t = {}) => ({ state: r, commands: i }) => {
  const o = St(n, r.schema), s = St(e, r.schema), l = Yi(r, o, t);
  let c;
  return r.selection.$anchor.sameParent(r.selection.$head) && (c = r.selection.$anchor.parent.attrs), l ? i.setNode(s, c) : i.setNode(o, {
    ...c,
    ...t
  });
}, Xd = (n, e = {}) => ({ state: t, commands: r }) => {
  const i = St(n, t.schema);
  return Yi(t, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, Qd = () => ({ state: n, dispatch: e }) => {
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
}, Zd = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
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
}, ef = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { extendEmptyMarkRange: o = !1 } = e, { selection: s } = t, l = pn(n, r.schema), { $from: c, empty: a, ranges: u } = s;
  if (!i) return !0;
  if (a && o) {
    var d;
    let { from: f, to: p } = s;
    const m = pl(c, l, (d = c.marks().find((g) => g.type === l)) === null || d === void 0 ? void 0 : d.attrs);
    m && (f = m.from, p = m.to), t.removeMark(f, p, l);
  } else u.forEach((f) => {
    t.removeMark(f.$from.pos, f.$to.pos, l);
  });
  return t.removeStoredMark(l), !0;
}, tf = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const { selection: i } = t;
  let o, s;
  return typeof n == "number" ? (o = n, s = n) : n && "from" in n && "to" in n ? (o = n.from, s = n.to) : (o = i.from, s = i.to), r && e.doc.nodesBetween(o, s, (l, c) => {
    if (l.isText) return;
    const a = { ...l.attrs };
    delete a.dir, e.setNodeMarkup(c, void 0, a);
  }), !0;
}, nf = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = kl(typeof n == "string" ? n : n.name, r.schema);
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
      })), s && b.marks.length && b.marks.forEach((D) => {
        if (s === D.type && (c = !0, i)) {
          const E = Math.max(x, u), S = Math.min(x + b.nodeSize, d);
          t.addMark(E, S, s.create({
            ...D.attrs,
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
}, rf = new Jt("__tiptap_decorations__"), of = (n) => ({ tr: e, dispatch: t }) => (t && e.setMeta(rf, {
  type: "force",
  name: n
}), !0), sf = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = St(n, t.schema);
  return Nu(i, e)(t, r);
}, lf = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = St(n, t.schema);
  return Tu(i, e)(t, r);
};
var cf = /* @__PURE__ */ xa({
  blur: () => zu,
  clearContent: () => Du,
  clearNodes: () => Pu,
  command: () => Lu,
  createParagraphNear: () => Ou,
  cut: () => Fu,
  deleteCurrentNode: () => Bu,
  deleteNode: () => Hu,
  deleteRange: () => _u,
  deleteSelection: () => qu,
  enter: () => Ku,
  exitCode: () => Ju,
  extendMarkRange: () => Yu,
  first: () => Uu,
  focus: () => Qu,
  forEach: () => Zu,
  insertContent: () => ed,
  insertContentAt: () => td,
  insertDefaultBlock: () => nd,
  joinBackward: () => od,
  joinDown: () => id,
  joinForward: () => sd,
  joinItemBackward: () => ld,
  joinItemForward: () => cd,
  joinTextblockBackward: () => ad,
  joinTextblockForward: () => ud,
  joinUp: () => rd,
  keyboardShortcut: () => fd,
  lift: () => hd,
  liftEmptyBlock: () => pd,
  liftListItem: () => md,
  newlineInCode: () => gd,
  resetAttributes: () => yd,
  scrollIntoView: () => xd,
  selectAll: () => bd,
  selectNodeBackward: () => vd,
  selectNodeForward: () => wd,
  selectParentNode: () => kd,
  selectTextblockEnd: () => Sd,
  selectTextblockStart: () => Nd,
  setContent: () => Cd,
  setMark: () => Fd,
  setMeta: () => Bd,
  setNode: () => Hd,
  setNodeSelection: () => _d,
  setTextDirection: () => jd,
  setTextSelection: () => Wd,
  sinkListItem: () => qd,
  splitBlock: () => Kd,
  splitListItem: () => Jd,
  toggleList: () => Yd,
  toggleMark: () => Ud,
  toggleNode: () => Gd,
  toggleWrap: () => Xd,
  undoInputRule: () => Qd,
  unsetAllMarks: () => Zd,
  unsetMark: () => ef,
  unsetTextDirection: () => tf,
  updateAttributes: () => nf,
  updateDecorations: () => of,
  wrapIn: () => sf,
  wrapInList: () => lf
});
typeof process < "u" && process.env.NODE_ENV;
function af(n) {
  return Object.prototype.toString.call(n).slice(8, -1);
}
function Nr(n) {
  return af(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
function Cl(n, e) {
  const t = { ...n };
  return Nr(n) && Nr(e) && Object.keys(e).forEach((r) => {
    Nr(e[r]) && Nr(n[r]) ? t[r] = Cl(n[r], e[r]) : t[r] = e[r];
  }), t;
}
var El = class {
  constructor(n = {}) {
    this.type = "extendable", this.parent = null, this.child = null, this.name = "", this.config = { name: this.name }, this.config = {
      ...this.config,
      ...n
    }, this.name = this.config.name;
  }
  get options() {
    return { ...Si(sr(this, "addOptions", { name: this.name })) };
  }
  get storage() {
    return { ...Si(sr(this, "addStorage", {
      name: this.name,
      options: this.options
    })) };
  }
  configure(n = {}) {
    const e = this.extend({
      ...this.config,
      addOptions: () => Cl(this.options, n)
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
}, uf = class Ml extends El {
  constructor(...e) {
    super(...e), this.type = "mark";
  }
  /**
  * Create a new Mark instance
  * @param config - Mark configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new Ml(t);
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
}, Ft = class Rl extends El {
  constructor(...e) {
    super(...e), this.type = "extension";
  }
  /**
  * Create a new Extension instance
  * @param config - Extension configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new Rl(t);
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
    return [new sn({
      key: new Jt("clipboardTextSerializer"),
      props: { clipboardTextSerializer: () => {
        const { editor: n } = this, { state: e, schema: t } = n, { doc: r, selection: i } = e, o = $d(t), { blockSeparator: s } = this.options, l = {
          ...s !== void 0 ? { blockSeparator: s } : {},
          textSerializers: o
        };
        return [...i.ranges].sort((c, a) => c.$from.pos - a.$from.pos).map(({ $from: c, $to: a }) => Id(r, {
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
    return { ...cf };
  }
});
Ft.create({
  name: "delete",
  onUpdate({ transaction: n, appendedTransactions: e }) {
    var t, r;
    const i = () => {
      var o, s, l;
      if ((o = (s = this.editor.options.coreExtensionOptions) === null || s === void 0 || (s = s.delete) === null || s === void 0 || (l = s.filterTransaction) === null || l === void 0 ? void 0 : l.call(s, n)) !== null && o !== void 0 ? o : n.getMeta("y-sync$")) return;
      const c = Md(n.before, [n, ...e]);
      Pd(c).forEach((u) => {
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
          const m = a.slice(d).map(u.from, -1), g = a.slice(d).map(u.to), b = a.invert().map(m, -1), x = a.invert().map(g), D = m > 0 ? (f = c.doc.nodeAt(m - 1)) === null || f === void 0 ? void 0 : f.marks.some((S) => S.eq(u.mark)) : !1, E = (p = c.doc.nodeAt(g)) === null || p === void 0 ? void 0 : p.marks.some((S) => S.eq(u.mark));
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
            partial: !!(E || D),
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
    return [new sn({
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
    return [new sn({
      key: new Jt("editable"),
      props: { editable: () => this.editor.options.editable }
    })];
  }
});
const df = new Jt("focusEvents");
Ft.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [new sn({
      key: df,
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
        const { selection: c, doc: a } = l, { empty: u, $anchor: d } = c, { pos: f, parent: p } = d, m = d.parent.isTextblock && f > 0 ? l.doc.resolve(f - 1) : d, g = m.parent.type.spec.isolating, b = d.pos - d.parentOffset, x = g && m.parent.childCount === 1 ? b === d.pos : Bn.atStart(a).from === f;
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
    return Hr() || wl() ? o : i;
  },
  addProseMirrorPlugins() {
    return [new sn({
      key: new Jt("clearDocument"),
      appendTransaction: (n, e, t) => {
        if (n.some((p) => p.getMeta("composition"))) return;
        const r = n.some((p) => p.docChanged) && !e.doc.eq(t.doc), i = n.some((p) => p.getMeta("preventClearDocument"));
        if (!r || i) return;
        const { empty: o, from: s, to: l } = e.selection, c = Bn.atStart(e.doc).from, a = Bn.atEnd(e.doc).to;
        if (o || !(s === c && l === a) || !Nl(t.doc)) return;
        const u = t.tr, d = dl({
          state: t,
          transaction: u
        }), { commands: f } = new $u({
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
    return [new sn({
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
    return [new sn({
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
    const { nodeExtensions: n } = Sl(this.extensions);
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
    return [new sn({
      key: new Jt("textDirection"),
      props: { attributes: () => {
        const n = this.options.direction;
        return n ? { dir: n } : {};
      } }
    })];
  }
});
const ff = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), hf = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), pf = /^(https?:\/\/|mailto:)/i;
function mf(n) {
  if (!n) return "";
  const e = [];
  for (const t of n.split(";")) {
    const r = t.indexOf(":");
    if (r < 0) continue;
    const i = t.slice(0, r).trim().toLowerCase(), o = t.slice(r + 1).trim();
    hf.has(i) && o && e.push(`${i}: ${o}`);
  }
  return e.join("; ");
}
function Ni(n) {
  if (n.nodeType === Node.TEXT_NODE) return n;
  if (n.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const e = n, t = e.tagName.toLowerCase(), r = () => {
    const l = document.createDocumentFragment();
    for (const c of Array.from(e.childNodes)) l.appendChild(Ni(c));
    return l;
  };
  if (!ff.has(t)) return r();
  if (t === "a") {
    const l = e.getAttribute("href") || "";
    if (!pf.test(l)) return r();
  }
  const i = document.createElement(t), o = e.getAttribute("style"), s = mf(o || "");
  if (s && i.setAttribute("style", s), t === "span") {
    const l = e.getAttribute("data-text-style");
    l && i.setAttribute("data-text-style", l);
  }
  if (t === "a") {
    i.setAttribute("href", e.getAttribute("href"));
    const l = e.getAttribute("target"), c = e.getAttribute("rel");
    l && i.setAttribute("target", l), c && i.setAttribute("rel", c);
  }
  for (const l of Array.from(e.childNodes)) i.appendChild(Ni(l));
  return i;
}
function Al(n) {
  return n.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function gf(n) {
  const e = Al(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  t.innerHTML = e;
  const r = document.createDocumentFragment();
  for (const s of Array.from(t.content.childNodes)) r.appendChild(Ni(s));
  const i = document.createElement("div");
  return i.appendChild(r), i.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function Vh(n) {
  const e = Al(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  return t.innerHTML = e, (t.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function Yh(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function yf(n) {
  return n.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function Lo(n) {
  return n.replace(/\{\{([^{}]+)\}\}/g, (e, t) => `<span data-type="token" data-field="${t}">{{${t}}}</span>`);
}
const xf = { text: "#52525b" }, bf = ({ node: n, selected: e, extension: t, editor: r, view: i, getPos: o }) => {
  var f;
  const s = n.attrs.field ?? "", l = t.options, c = ((f = l.resolve) == null ? void 0 : f.call(l, s)) ?? null, a = (c == null ? void 0 : c.color) ?? xf, u = (c == null ? void 0 : c.label) ?? `{{${s}}}`, d = c == null ? void 0 : c.nested;
  return /* @__PURE__ */ h(
    ec,
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
        b && Wn.isSelectable(b) && i.dispatch(i.state.tr.setSelection(new Wn(g))), (x = l.onTokenClick) == null || x.call(l, s, p.currentTarget.getBoundingClientRect(), m);
      },
      children: d ? /* @__PURE__ */ h("span", { className: "rt-token-nested", children: u }) : u
    }
  );
}, vf = pc.extend({
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
    return Zl(bf);
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
    return ["span", Ql({ "data-type": "token" }, e), `{{${n.attrs.field ?? ""}}}`];
  },
  renderText({ node: n }) {
    return `{{${n.attrs.field ?? ""}}}`;
  }
}), wf = 240, kf = 280, Sf = ({ props: n, onApi: e }) => {
  const t = Jr(), r = v(e);
  r.current = e, le(() => {
    r.current(t);
  }, [t]);
  const i = v(null);
  le(() => {
    var s;
    t.pointerDriven || on((s = i.current) == null ? void 0 : s.querySelector(".ui-item-highlighted"));
  }, [t.highlightedIndex, t.pointerDriven]), le(() => {
    n.items.length > 0 && t.highlightedIndex === -1 && t.setHighlighted(0, "keyboard");
  }, [n.items.length, t.highlightedIndex, t]);
  const o = Kr();
  return /* @__PURE__ */ h(ur.Provider, { value: t, children: /* @__PURE__ */ h(
    "div",
    {
      role: "listbox",
      "data-token-popup": !0,
      className: "ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto",
      style: { width: kf, maxHeight: wf },
      onMouseDown: (s) => s.preventDefault(),
      children: /* @__PURE__ */ h("div", { ref: i, children: n.items.map((s) => /* @__PURE__ */ h(
        Nf,
        {
          item: s,
          d: o,
          command: () => n.command({ field: s.key })
        },
        s.key
      )) })
    }
  ) });
}, Nf = ({ item: n, d: e, command: t }) => {
  const { myIndex: r, highlighted: i, setPointer: o } = gs({
    label: () => n.label,
    activate: t
  }), s = He(), l = { padding: `${P(8, 12, s)}px ${P(12, 16, s)}px`, fontSize: P(12, 14, s) };
  return /* @__PURE__ */ R(
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
}, Oo = () => {
  let n = null;
  const e = (r) => {
    n && (n.props = r, n.holder.style.display = r.items.length > 0 ? "" : "none", n.root.render(
      /* @__PURE__ */ h(Sf, { props: r, onApi: (i) => {
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
      const o = mc(i);
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
}, Tf = uf.create({
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
}), Mr = new Jt("retainedSelectionHighlight"), Cf = Ft.create({
  name: "retainedSelectionHighlight",
  addProseMirrorPlugins() {
    return [
      new sn({
        key: Mr,
        state: {
          init: () => ({ held: !1, decorations: pr.empty }),
          apply(n, e) {
            const t = n.getMeta(Mr), r = t ? t.held : e.held;
            if (!r) return { held: !1, decorations: pr.empty };
            const { from: i, to: o, empty: s } = n.selection;
            return {
              held: r,
              decorations: s ? pr.empty : pr.create(n.doc, [ic.inline(i, o, { class: "rt-retained-selection" })])
            };
          }
        },
        props: {
          decorations(n) {
            var e;
            return (e = Mr.getState(n)) == null ? void 0 : e.decorations;
          }
        }
      })
    ];
  }
}), Uh = {
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
function Il(n, e) {
  const t = n.state.doc.resolve(e).nodeBefore;
  return t && t.type.name === "token" ? t.attrs.field ?? "" : null;
}
function Ef(n) {
  const e = n.state.selection.$from, t = e.nodeBefore;
  if (!(t != null && t.isText)) return null;
  const r = t.text || "", i = r.lastIndexOf(".");
  if (i < 0) return null;
  const o = e.pos - r.length + i, s = Il(n, o);
  return s == null ? null : { chipKey: s, dotPos: o };
}
const Mf = lt.forwardRef(({
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
  const x = v(null), D = v(null), E = v(e);
  E.current = e;
  const S = v(r);
  S.current = r;
  const N = v(o);
  N.current = o;
  const T = v(null), H = (I) => {
    var me;
    const F = I.getAttributes("textStyle"), U = I.getAttributes("reportTextStyle"), { from: j, to: M, empty: W } = I.state.selection;
    let Y = !1, ue = !1, ve = !1;
    if (!W) {
      const te = /* @__PURE__ */ new Set(), X = /* @__PURE__ */ new Set(), Q = /* @__PURE__ */ new Set();
      I.state.doc.nodesBetween(j, M, (ye) => {
        if (!ye.isText) return;
        const se = ye.marks.find((L) => L.type.name === "textStyle");
        te.add((se == null ? void 0 : se.attrs.fontFamily) || ""), X.add((se == null ? void 0 : se.attrs.fontSize) || "");
        const B = ye.marks.find((L) => L.type.name === "reportTextStyle");
        Q.add((B == null ? void 0 : B.attrs.styleId) || "");
      }), Y = te.size > 1, ue = X.size > 1, ve = Q.size > 1;
    }
    const A = {
      bold: I.isActive("bold"),
      italic: I.isActive("italic"),
      underline: I.isActive("underline"),
      strike: I.isActive("strike"),
      link: I.isActive("link"),
      color: F.color || "",
      fontFamily: F.fontFamily || "",
      fontSize: F.fontSize || "",
      textStyle: U.styleId || "",
      hasSelection: !W,
      fontFamilyMixed: Y,
      fontSizeMixed: ue,
      textStyleMixed: ve
    }, ge = T.current;
    ge && ge.bold === A.bold && ge.italic === A.italic && ge.underline === A.underline && ge.strike === A.strike && ge.link === A.link && ge.color === A.color && ge.fontFamily === A.fontFamily && ge.fontSize === A.fontSize && ge.textStyle === A.textStyle && ge.hasSelection === A.hasSelection && ge.fontFamilyMixed === A.fontFamilyMixed && ge.fontSizeMixed === A.fontSizeMixed && ge.textStyleMixed === A.textStyleMixed || (T.current = A, (me = N.current) == null || me.call(N, A));
  }, q = (I) => {
    var W;
    const F = I.state.selection;
    let U = null;
    F instanceof Wn && F.node.type.name === "token" ? (U = { key: F.node.attrs.field ?? "", pos: F.from }, x.current = F.from) : x.current != null && (x.current = I.state.tr.mapping.map(x.current));
    const j = D.current, M = j && U && j.key === U.key && j.pos === U.pos;
    !j && !U || M || (D.current = U, (W = b.current) == null || W.call(b, U));
  }, C = (I) => {
    const F = gf(yf(I));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(F) ? "" : F;
  }, K = lt.useMemo(() => {
    const I = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: j }) => {
        var M;
        return ((M = p.current) == null ? void 0 : M.call(p, j)) ?? [];
      },
      command: ({ editor: j, range: M, props: W }) => {
        j.chain().focus().insertContentAt(M, { type: "token", attrs: { field: W.field } }).run();
      },
      render: Oo
    }, F = vf.configure({
      resolve: f.current ?? null,
      suggestion: I,
      onTokenClick: (j, M, W) => {
        var Y;
        x.current = W, (Y = g.current) == null || Y.call(g, j, M, W);
      }
    }), U = Ft.create({
      name: "tokenAttributeSuggestion",
      addProseMirrorPlugins() {
        return [
          hc({
            pluginKey: new Jt("tokenAttributeSuggestion"),
            editor: this.editor,
            char: ".",
            // The gate is `shouldShow` (a chip must sit immediately before the
            // dot), not the prefix rule — the prefix here is an atom, not text.
            allowedPrefixes: null,
            decorationClass: "suggestion-attr",
            shouldShow: ({ editor: j, range: M }) => Il(j, M.from) != null,
            items: ({ editor: j, query: M }) => {
              var Y;
              const W = Ef(j);
              return W ? ((Y = m.current) == null ? void 0 : Y.call(m, W.chipKey, M)) ?? [] : [];
            },
            command: ({ editor: j, range: M, props: W }) => {
              j.chain().focus().insertContentAt(M, { type: "token", attrs: { field: W.field } }).run();
            },
            render: Oo
          })
        ];
      }
    });
    return [F, U];
  }, []), w = tc({
    immediatelyRender: !1,
    extensions: [
      oc,
      sc.configure({ placeholder: t }),
      lc,
      cc,
      ac,
      Tf,
      Cf,
      uc,
      fc,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      dc.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      ...K
    ],
    content: Lo(n || ""),
    editable: !r,
    onUpdate: ({ editor: I }) => {
      E.current(C(I.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: I }) => {
      H(I), q(I);
    }
  });
  return le(() => {
    if (!w || w.isFocused) return;
    C(w.getHTML()) !== n && (T.current = null, w.commands.setContent(Lo(n || ""), { emitUpdate: !1 }), H(w));
  }, [n, w]), le(() => {
    w && w.setEditable(!r);
  }, [r, w]), le(() => {
    w && (T.current = null, H(w), q(w));
  }, [w]), _o(d, () => ({
    exec: (I, F, U) => {
      if (!w || S.current) return;
      const j = w.chain(), M = (U == null ? void 0 : U.focus) === !1 ? j : j.focus();
      switch (I) {
        case "bold":
          M.toggleBold().run();
          break;
        case "italic":
          M.toggleItalic().run();
          break;
        case "underline":
          M.toggleUnderline().run();
          break;
        case "strikeThrough":
          M.toggleStrike().run();
          break;
        case "foreColor":
          F && M.setColor(F).run();
          break;
        case "unsetColor":
          M.unsetColor().run();
          break;
        case "fontFamily":
          F && M.setFontFamily(F).run();
          break;
        case "unsetFontFamily":
          M.unsetFontFamily().run();
          break;
        case "fontSize":
          F && M.setFontSize(F).run();
          break;
        case "unsetFontSize":
          M.unsetFontSize().run();
          break;
        // Linked named style: mark the run with the consumer's style id. Direct
        // font family/size on the range is cleared so the linked style's
        // typography takes effect (the object-level precedent); bold/italic
        // marks stay — direct character formatting still wins (Word).
        case "textStyle":
          F && M.setMark("reportTextStyle", { styleId: F }).unsetFontFamily().unsetFontSize().run();
          break;
        case "unsetTextStyle":
          M.unsetMark("reportTextStyle").run();
          break;
        // Clear every inline mark (bold/italic/underline/strike/color/font/
        // link) and normalize the block — the cell-chrome Reset path.
        case "clearFormatting":
          M.unsetAllMarks().clearNodes().run();
          break;
        case "link":
          F && M.extendMarkRange("link").setLink({ href: F }).run();
          break;
        case "unlink":
          M.extendMarkRange("link").unsetLink().run();
          break;
      }
    },
    focus: (I) => w == null ? void 0 : w.commands.focus(I),
    insertToken: (I) => {
      !w || S.current || w.chain().focus().insertContent({ type: "token", attrs: { field: I } }).run();
    },
    replaceToken: (I) => {
      if (!w || S.current) return;
      const F = x.current;
      F != null && w.commands.command(({ tr: U }) => {
        const j = U.doc.nodeAt(F);
        if (!j || j.type.name !== "token") return !1;
        U.setNodeMarkup(F, void 0, { field: I });
        const M = U.doc.resolve(F);
        return M.nodeAfter && M.nodeAfter.type.name === "token" && U.setSelection(new Wn(M)), !0;
      });
    },
    holdSelectionHighlight: (I) => {
      !w || w.isDestroyed || w.view.dispatch(w.state.tr.setMeta(Mr, { held: I }));
    }
  }), [w]), /* @__PURE__ */ h(nc, { editor: w, className: `richtext-editor ${i || ""}` });
});
Mf.displayName = "RichTextEditor";
const Rf = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], Af = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], Fo = ({ className: n = "w-3 h-3" }) => /* @__PURE__ */ h("span", { className: `${n} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ h("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), If = ({ value: n, disabled: e, onChange: t, mixed: r }) => {
  const [i, o] = oe(!1);
  return /* @__PURE__ */ h(
    Vr,
    {
      open: i,
      onOpenChange: o,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ R("button", { type: "button", disabled: e, className: `${ma} w-28 justify-between`, children: [
        r ? /* @__PURE__ */ h("span", { className: "truncate italic text-zinc-500", children: "Mixed" }) : /* @__PURE__ */ h("span", { className: "truncate", style: { fontFamily: n || "Helvetica" }, children: n || "Helvetica" }),
        /* @__PURE__ */ h(dn, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: Rf.map((s) => /* @__PURE__ */ h(jc, { onClick: () => {
        t(s), o(!1);
      }, icon: !r && s === n ? /* @__PURE__ */ h(lr, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ h("span", { style: { fontFamily: s }, children: s }) }, s))
    }
  );
}, $f = ({ editorRef: n, disabled: e, active: t }) => {
  const [r, i] = oe(!1), o = Yr(), [s, l] = oe(""), c = () => {
    var u;
    const a = s.trim();
    a && ((u = n.current) == null || u.exec("link", a), i(!1));
  };
  return /* @__PURE__ */ h(
    Vr,
    {
      open: r,
      onOpenChange: i,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ h(
        Et,
        {
          theme: "dark",
          active: t,
          disabled: e,
          onMouseDown: (a) => a.preventDefault(),
          style: { ...o.toggle, padding: 0 },
          className: "justify-center",
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ h(Kl, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ R("div", { className: "p-2 flex flex-col gap-2", children: [
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
            className: ha + " w-full"
          }
        ),
        /* @__PURE__ */ R("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ h(Et, { theme: "dark", onClick: c, style: o.control, disabled: !s.trim(), children: "Apply" }),
          /* @__PURE__ */ h(
            Et,
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
}, Gh = ({ editorRef: n, disabled: e, active: t, lockedFormatting: r, trailing: i, font: o, fontSizeSlot: s, showClearFormatting: l, dividers: c = !0 }) => {
  const [a, u] = oe(!1), d = (b, x) => {
    var D;
    return (D = n.current) == null ? void 0 : D.exec(b, x);
  }, f = Yr(), p = (b) => !!(r != null && r[b]), m = "flex items-center gap-1 shrink-0", g = c ? /* @__PURE__ */ h("div", { className: ws }) : null;
  return /* @__PURE__ */ R("div", { className: `flex flex-wrap items-center ${c ? "gap-x-1" : "gap-x-2"} gap-y-1.5`, children: [
    /* @__PURE__ */ R("div", { className: m, children: [
      /* @__PURE__ */ h(Pn, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ h(Et, { theme: "dark", "aria-label": "Bold", active: ((t == null ? void 0 : t.bold) ?? !1) || p("bold"), disabled: e || p("bold"), onMouseDown: (b) => b.preventDefault(), onClick: () => d("bold"), style: { ...f.toggle, padding: 0 }, className: "justify-center font-bold", children: "B" }) }),
      /* @__PURE__ */ h(Pn, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ h(Et, { theme: "dark", "aria-label": "Italic", active: ((t == null ? void 0 : t.italic) ?? !1) || p("italic"), disabled: e || p("italic"), onMouseDown: (b) => b.preventDefault(), onClick: () => d("italic"), style: { ...f.toggle, padding: 0 }, className: "justify-center italic", children: "I" }) }),
      /* @__PURE__ */ h(Pn, { content: "Underline", children: /* @__PURE__ */ h(Et, { theme: "dark", "aria-label": "Underline", active: (t == null ? void 0 : t.underline) ?? !1, disabled: e, onMouseDown: (b) => b.preventDefault(), onClick: () => d("underline"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ h(jl, { className: "w-3 h-3" }) }) }),
      /* @__PURE__ */ h(Pn, { content: "Strikethrough", children: /* @__PURE__ */ h(Et, { theme: "dark", "aria-label": "Strikethrough", active: (t == null ? void 0 : t.strike) ?? !1, disabled: e, onMouseDown: (b) => b.preventDefault(), onClick: () => d("strikeThrough"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ h(Wl, { className: "w-3 h-3" }) }) })
    ] }),
    g,
    /* @__PURE__ */ h("div", { className: m, children: /* @__PURE__ */ h($f, { editorRef: n, disabled: e, active: (t == null ? void 0 : t.link) ?? !1 }) }),
    g,
    /* @__PURE__ */ h("div", { className: m, children: /* @__PURE__ */ h(
      Vr,
      {
        open: a,
        onOpenChange: u,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ R(Et, { theme: "dark", disabled: e, style: f.control, className: "justify-between min-w-0", title: "Text color", children: [
          t != null && t.color ? /* @__PURE__ */ h("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: t.color } }) : /* @__PURE__ */ h(Fo, {}),
          /* @__PURE__ */ h(dn, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ R("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ h(
            "button",
            {
              onClick: () => {
                d("unsetColor"), u(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${t != null && t.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ h(Fo, { className: "w-3.5 h-3.5" })
            }
          ),
          Af.map((b) => /* @__PURE__ */ h(
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
    (o || s || l) && /* @__PURE__ */ R(ct, { children: [
      g,
      /* @__PURE__ */ R("div", { className: m, children: [
        o && /* @__PURE__ */ h(If, { value: o.value || "Helvetica", mixed: o.mixed, disabled: e, onChange: o.onChange }),
        s,
        l && /* @__PURE__ */ h(Pn, { content: "Clear formatting", children: /* @__PURE__ */ h(
          Et,
          {
            theme: "dark",
            "aria-label": "Clear formatting",
            disabled: e,
            onMouseDown: (b) => b.preventDefault(),
            onClick: () => d("clearFormatting"),
            style: { ...f.toggle, padding: 0 },
            className: "justify-center",
            children: /* @__PURE__ */ h(ql, { className: "w-3 h-3" })
          }
        ) })
      ] })
    ] }),
    i && /* @__PURE__ */ R(ct, { children: [
      g,
      /* @__PURE__ */ h("div", { className: m, children: i })
    ] })
  ] });
};
function Gi(n, e, t) {
  return Math.max(e, Math.min(t, n));
}
function zf(n, e, t, r, i) {
  return Gi(n + e * i, t, r);
}
const Df = 2;
function Pf(n, e, t, r, i) {
  return Gi(n + Math.trunc(e / Df) * i, t, r);
}
const Lf = 3;
function Xh({
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
  const [p, m] = oe(null), [g, b] = oe(!1), x = v(!1), D = v(null), E = v(null), S = v(null), N = He(), T = bs(), H = a === void 0;
  le(() => () => {
    var M;
    return (M = D.current) == null ? void 0 : M.call(D);
  }, []), ut(() => {
    const M = S.current, W = E.current;
    !H && M && W && (W.style.color = getComputedStyle(M).color);
  }, [H, a]), le(() => {
    x.current || m(null);
  }, [n]);
  const q = n ?? r, C = p !== null ? p : n != null ? String(n) : d ? "" : String(r), K = (M) => Gi(M, e, t), w = (M) => {
    const W = zf(q, M, e, t, o);
    W !== q && (x.current && m(String(W)), i(W));
  }, I = (M) => {
    if (l || s || M.pointerType !== "mouse" || M.button !== 0) return;
    const W = M.currentTarget, Y = M.clientY, ue = q;
    let ve = ue, A = !1;
    const ge = (te) => {
      const X = Y - te.clientY;
      if (!A) {
        if (Math.abs(X) < Lf) return;
        A = !0, W.blur(), W.style.userSelect = "none";
      }
      const Q = Pf(ue, X, e, t, o);
      Q !== ve && (ve = Q, i(Q));
    }, me = () => {
      D.current = null, window.removeEventListener("pointermove", ge), window.removeEventListener("pointerup", me), window.removeEventListener("pointercancel", me), W.style.userSelect = "", A && W.blur();
    };
    D.current = me, window.addEventListener("pointermove", ge), window.addEventListener("pointerup", me), window.addEventListener("pointercancel", me);
  }, F = (M) => ({
    type: "button",
    tabIndex: -1,
    "aria-label": M === 1 ? "Increase" : "Decrease",
    disabled: !!l || !!s || (M === 1 ? q >= t : q <= e),
    onPointerDown: (W) => W.preventDefault(),
    onClick: () => w(M)
  }), U = H ? P(22, 30, N) : P(16, 22, N), j = H ? P(14, 18, N) : P(11, 15, N);
  return /* @__PURE__ */ R(
    "span",
    {
      ref: E,
      className: `ui-number ${H ? "ui-number-box" : ""}`,
      ...f ? { "data-theme": f } : {},
      children: [
        /* @__PURE__ */ h(
          "input",
          {
            ref: S,
            type: "number",
            "aria-label": c,
            title: u,
            placeholder: d,
            value: C,
            readOnly: s,
            disabled: l,
            className: a ?? "ui-input w-20",
            style: {
              ...H ? { ...T, minHeight: P(28, 36, N) } : {},
              paddingRight: U + 2,
              cursor: l || s ? void 0 : g ? "text" : "ns-resize"
            },
            onFocus: () => {
              x.current = !0, b(!0);
            },
            onChange: (M) => {
              const W = M.target.value;
              m(W);
              const Y = parseInt(W, 10);
              W !== "" && !Number.isNaN(Y) && i(K(Y));
            },
            onBlur: () => {
              if (x.current = !1, b(!1), p === null) return;
              const M = parseInt(p, 10);
              Number.isNaN(M) || i(K(M)), m(null);
            },
            onKeyDown: (M) => {
              M.key === "Enter" && M.target.blur(), M.key === "Escape" && (m(null), M.target.blur()), !s && !l && (M.key === "ArrowUp" || M.key === "ArrowDown") && (M.preventDefault(), w(M.key === "ArrowUp" ? 1 : -1));
            },
            onPointerDown: I
          }
        ),
        /* @__PURE__ */ R("span", { className: "ui-number-steppers", style: { width: U }, children: [
          /* @__PURE__ */ h("button", { ...F(1), className: "ui-number-step", children: /* @__PURE__ */ h(Jl, { style: { width: j, height: j } }) }),
          /* @__PURE__ */ h("button", { ...F(-1), className: "ui-number-step", children: /* @__PURE__ */ h(dn, { style: { width: j, height: j } }) })
        ] })
      ]
    }
  );
}
function Qh({ title: n, icon: e, count: t, tone: r = "default", collapsed: i, onToggle: o, trailing: s, bodyClass: l, className: c = "", dataProps: a, children: u }) {
  const d = He(), f = fn({ px: 12, py: 8, fs: 12 }, { px: 14, py: 12, fs: 14 }), p = P(14, 16, d), m = { width: p, height: p }, g = P(10, 12, d);
  return /* @__PURE__ */ R("div", { ...a, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${c}`, children: [
    /* @__PURE__ */ R("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1 bg-[var(--ui-card-header-bg)] text-[color:var(--ui-card-header-text)] hover:bg-[var(--ui-card-header-hover)] transition-colors", style: f, children: [
      /* @__PURE__ */ R(
        "button",
        {
          type: "button",
          onClick: o,
          className: "flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer",
          children: [
            i ? /* @__PURE__ */ h(Rr, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: m }) : /* @__PURE__ */ h(dn, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: m }),
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
function Xi({
  expanded: n,
  collapsedWidth: e,
  expandedWidth: t,
  trigger: r,
  field: i,
  rootRef: o,
  shrink: s = !1,
  stretch: l = !1,
  className: c = "",
  style: a,
  ...u
}) {
  const d = v(null), f = v(null), [p, m] = oe(null), g = (T) => {
    d.current = T, typeof o == "function" ? o(T) : o && (o.current = T);
  };
  ut(() => {
    if (n) return;
    const T = d.current;
    if (!T || (f.current = T.getBoundingClientRect().width, typeof ResizeObserver > "u")) return;
    const H = new ResizeObserver(() => {
      f.current = T.getBoundingClientRect().width;
    });
    return H.observe(T), () => H.disconnect();
  }, [n]), ut(() => {
    if (!n || e !== "auto") {
      m(null);
      return;
    }
    m(f.current);
    const T = requestAnimationFrame(() => m(null));
    return () => cancelAnimationFrame(T);
  }, [n, e]);
  const [b, x] = oe(!1), [D, E] = oe(null), S = v(!1);
  ut(() => {
    if (n) {
      S.current = !0, x(!1), E(null);
      return;
    }
    if (!S.current || e !== "auto") return;
    S.current = !1, x(!0);
    let T = 0, H = 0;
    return (() => {
      var w;
      const C = (w = d.current) == null ? void 0 : w.firstElementChild, K = (C == null ? void 0 : C.getBoundingClientRect().width) ?? 0;
      K > 0 ? (T = requestAnimationFrame(() => E(K)), H = window.setTimeout(() => {
        x(!1), E(null);
      }, hn + 30)) : x(!1);
    })(), () => {
      cancelAnimationFrame(T), window.clearTimeout(H);
    };
  }, [n, e]);
  const N = n ? p ?? t : b ? D ?? t : e === "auto" ? "auto" : e;
  return /* @__PURE__ */ R(
    "div",
    {
      ...u,
      ref: g,
      className: `relative ${l ? "flex" : "inline-flex"} ${s ? "shrink-0" : ""} ${c}`,
      style: {
        ...a,
        width: l ? "100%" : N,
        transition: "width 220ms cubic-bezier(0.32, 0.72, 0, 1)"
      },
      children: [
        /* @__PURE__ */ h(
          "div",
          {
            className: `${l ? "w-full" : e === "auto" ? "w-auto" : "w-full"} origin-left ${n ? "opacity-0 pointer-events-none" : "opacity-100"} motion-reduce:transition-none`,
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
function Of({
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
  stretch: g = !1,
  actions: b,
  leadingIcon: x,
  showClear: D = !0,
  onSubmit: E,
  onCancel: S,
  cancelOnEscape: N = !1,
  cancelOnOutside: T = !1,
  className: H = "",
  "aria-label": q
}) {
  const [C, K] = oe(p), w = v(C);
  w.current = C;
  const I = v(null), F = v(null), U = v(null), j = Yo(), M = He(), W = P(9, 13, M), Y = ie((B) => {
    w.current !== B && (w.current = B, K(B), m == null || m(B));
  }, [m]), ue = ie((B = !1) => {
    var L;
    Y(!1), (L = F.current) == null || L.blur(), B && requestAnimationFrame(() => {
      var V;
      return (V = U.current) == null ? void 0 : V.focus();
    });
  }, [Y]), ve = ie(() => {
    Y(!0), requestAnimationFrame(() => {
      const B = F.current;
      if (!B) return;
      B.focus();
      const L = B.value.length;
      B.setSelectionRange(L, L);
    });
  }, [Y]);
  le(() => {
    p && ve();
  }, [p, ve]), le(() => {
    var V;
    if (!C) return;
    const B = ((V = I.current) == null ? void 0 : V.ownerDocument) ?? document, L = (je) => {
      var he;
      const Ne = je.target;
      Ne && ((he = I.current) != null && he.contains(Ne) || (T && (S == null || S()), ue()));
    };
    return B.addEventListener("pointerdown", L, !0), () => B.removeEventListener("pointerdown", L, !0);
  }, [C, ue, T, S]);
  const A = ie((B) => {
    var V;
    if (!C) return;
    const L = B.relatedTarget;
    L && ((V = I.current) != null && V.contains(L)) || (T && (S == null || S()), ue());
  }, [C, ue, T, S]), ge = ie((B) => {
    if (B.key === "Enter") {
      B.preventDefault(), E == null || E(n), ue(!0);
      return;
    }
    B.key === "Escape" && (B.preventDefault(), B.stopPropagation(), N ? S == null || S() : e(""), ue(!0));
  }, [e, ue, N, S, E, n]), me = r === void 0 ? /* @__PURE__ */ h(On, { className: "w-3.5 h-3.5" }) : r, te = x === void 0 ? me : x, ye = 8 + (((b == null ? void 0 : b.length) || 0) + (D && n ? 1 : 0)) * (j.box + 2), se = (B) => /* @__PURE__ */ h(
    "span",
    {
      style: { width: j.icon, height: j.icon },
      className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
      children: B
    }
  );
  return /* @__PURE__ */ h(
    Xi,
    {
      expanded: C,
      collapsedWidth: o,
      expandedWidth: s,
      rootRef: I,
      shrink: !0,
      stretch: g,
      "data-morph-search": !0,
      "data-theme": d,
      "data-expanded": C ? "true" : "false",
      className: H,
      onBlur: A,
      trigger: /* @__PURE__ */ h(
        Et,
        {
          ref: U,
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
          onClick: ve,
          className: `${c ? "w-auto" : "w-full"} ${g ? "justify-center" : "justify-start"} ${C ? "pointer-events-none" : ""}`,
          tabIndex: C ? -1 : 0,
          "aria-expanded": C,
          "aria-label": q || t,
          "data-morph-search-trigger": !0,
          children: /* @__PURE__ */ h("span", { className: `min-w-0 ${c ? "" : "truncate"}`, children: t })
        }
      ),
      field: /* @__PURE__ */ R(ct, { children: [
        te && /* @__PURE__ */ h(
          "span",
          {
            className: "ui-icon absolute top-1/2 -translate-y-1/2 pointer-events-none",
            style: { left: W, width: j.icon, height: j.icon },
            children: se(te)
          }
        ),
        /* @__PURE__ */ h(
          "input",
          {
            ref: F,
            value: n,
            onChange: (B) => e(B.target.value),
            onKeyDown: ge,
            placeholder: i,
            "aria-label": q || i,
            tabIndex: C ? 0 : -1,
            "data-morph-search-input": !0,
            style: { paddingLeft: te ? W + j.icon + 6 : 10, paddingRight: ye },
            className: `${$r("sm")} w-full`
          }
        ),
        /* @__PURE__ */ R("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
          b == null ? void 0 : b.map((B) => /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              "aria-label": B.label,
              title: B.label,
              tabIndex: C ? 0 : -1,
              onMouseDown: (L) => L.preventDefault(),
              onClick: () => {
                B.onClick(n, { close: () => ue(!0) }), B.keepOpen || ue(!0);
              },
              style: { width: j.box, height: j.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-action": B.key,
              children: se(B.icon)
            },
            B.key
          )),
          D && n && /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              "aria-label": "Clear",
              tabIndex: C ? 0 : -1,
              onClick: () => {
                e(""), requestAnimationFrame(() => {
                  var B;
                  return (B = F.current) == null ? void 0 : B.focus();
                });
              },
              style: { width: j.box, height: j.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-clear": !0,
              children: /* @__PURE__ */ h(Sn, { size: j.icon })
            }
          )
        ] })
      ] })
    }
  );
}
function Zh({
  triggerLabel: n,
  triggerIcon: e = /* @__PURE__ */ h(_r, { className: "w-3.5 h-3.5" }),
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
    Of,
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
function Ff(n) {
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
function $l(n, e, t) {
  const r = Ff(t), i = r.length > 0, o = new Map(e.map((a) => [a.key, a])), s = [];
  for (const a of n) {
    const { matched: u, detail: d } = Bf(a, a.group ? o.get(a.group) : void 0, r);
    u && s.push({ item: a, detail: d });
  }
  const l = new Set(s.map((a) => a.item.group).filter(Boolean)), c = i ? e.filter((a) => l.has(a.key) || a.label.toLowerCase().includes(t.trim().toLowerCase())) : e;
  return { hits: s, visibleGroups: c, hasQuery: i };
}
function Hf(n) {
  var u;
  const { hits: e, visibleGroups: t, hasQuery: r } = $l(n.items, n.groups, n.query), i = [];
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
function _f({
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
  browseAll: D = !1,
  selectedId: E,
  autoFocus: S = !0,
  collapsedWidth: N = 128,
  expandedWidth: T = 288,
  panelWidth: H,
  panelMinWidth: q,
  keepAllRows: C = !1,
  maxMenuHeight: K = 420,
  theme: w = "light",
  morph: I = !0,
  emptyTitle: F,
  emptyHint: U,
  renderEmpty: j,
  emptyActions: M,
  leadingActions: W,
  hideLeadingOnEmpty: Y = !1,
  footerActions: ue,
  fieldActions: ve,
  multiple: A,
  open: ge,
  onOpenChange: me,
  hideTrigger: te = !1,
  anchorRef: X,
  portalTarget: Q,
  renderTrigger: ye,
  renderItem: se,
  highlightOnOpen: B = !0,
  ref: L
}) {
  const V = c !== void 0, [je, Ne] = oe(""), he = V ? c : je, We = ie((y) => {
    V || Ne(y), a == null || a(y);
  }, [V, a]), Te = ge !== void 0, [Fe, Be] = oe(!1), ne = Te ? ge : Fe, _e = ie((y) => {
    Te || Be(y), me == null || me(y);
  }, [Te, me]), [Se, Xe] = oe(t === "inline"), bt = tt(() => e.map((y) => y.key).join("\0"), [e]), we = tt(() => new Set(bt ? bt.split("\0") : []), [bt]), [qe, yt] = oe(() => b ? we : /* @__PURE__ */ new Set()), [Ee, Bt] = oe(0), Ht = v(!1), Dt = v(null), De = ie((y, z = "keyboard") => {
    Ht.current = z === "pointer", Bt(y);
  }, []), Qe = v(null), it = v(null), Rt = v(null), ft = v(null), pt = v(null), At = v(0), Pe = Ci(), mt = Vn(), Ze = Kr(), _t = Pi(), It = fs(), Ke = Yo(), $ = 8 + (((ve == null ? void 0 : ve.length) || 0) + (he ? 1 : 0)) * (Ke.box + 2), [G, fe] = oe({ top: 0, left: 0, maxH: 288, ready: !1 }), [Ye, et] = oe(0);
  es({
    anchorRef: X ?? Qe,
    panelRef: ft,
    open: ne,
    maxHeight: K,
    anchorRectRef: pt,
    onPosition: (y) => fe({ top: y.top, left: y.left, maxH: y.maxH, ready: y.ready })
  }), le(() => {
    const y = (X == null ? void 0 : X.current) ?? Qe.current;
    !ne || !y || et(y.getBoundingClientRect().width);
  }, [ne, Se, X]);
  const [vt, wt] = oe(!1);
  le(() => {
    ne && wt(!0);
  }, [ne]);
  const k = qr({
    visible: ne,
    morph: I,
    anchor: () => {
      var y;
      return ((y = (X == null ? void 0 : X.current) ?? Qe.current) == null ? void 0 : y.getBoundingClientRect()) ?? null;
    },
    ref: ft,
    cloneOnUnmount: !0,
    onClosed: () => wt(!1)
  }), ee = (M || []).map(
    (y) => typeof y.label == "function" ? y.label(he) : y.label
  ), J = tt(
    () => Hf({
      items: n,
      groups: e,
      /* show-all mode: the query only moves the highlight, every option stays
         in the list (the old I/E + D/N autocomplete contract). */
      query: C ? "" : he,
      browseGroups: m || b || g,
      browseAll: D,
      expandedGroups: qe,
      emptyActionLabels: ee
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [n, e, he, C, m, b, g, D, qe, ee.join("\0")]
  ), pe = tt(
    () => (W || []).map((y, z) => ({
      kind: "action",
      label: typeof y.label == "function" ? y.label(he) : y.label,
      actionIndex: z,
      source: "leading"
    })),
    [W, he]
  ), ke = tt(
    () => (ue || []).map((y, z) => ({
      kind: "action",
      label: typeof y.label == "function" ? y.label(he) : y.label,
      actionIndex: z,
      source: "footer"
    })),
    [ue, he]
  ), Ae = J.some((y) => y.kind === "empty"), ze = pe.length > 0 && !(Y && Ae), xe = ze ? pe.length : 0, Ie = tt(
    () => [...ze ? pe : [], ...J, ...ke],
    [ze, pe, J, ke]
  ), Ct = !!d || g && !he.trim(), Ue = tt(
    () => Ie.map((y, z) => ({ row: y, index: z })).filter((y) => !(y.row.kind === "empty" || y.row.kind === "item" && y.row.hidden || y.row.kind === "group" && !Ct)),
    [Ie, Ct]
  ), mn = (g || b) && !he.trim(), Me = !!A, kt = tt(
    () => n.filter((y) => y.checkable !== !1).map((y) => y.id),
    [n]
  ), Vt = tt(() => he.trim() ? $l(n, e, he).hits.filter((y) => y.item.checkable !== !1).map((y) => y.item.id) : kt, [n, e, he, kt]), Qt = tt(() => new Set(Vt), [Vt]), Re = ss({
    mode: (A == null ? void 0 : A.mode) ?? "draft",
    selectedIds: (A == null ? void 0 : A.selectedIds) ?? cs,
    itemIds: kt,
    visibleIds: Vt,
    max: A == null ? void 0 : A.max,
    disabledIds: A == null ? void 0 : A.disabledIds,
    indicator: A == null ? void 0 : A.indicator,
    onCommit: A == null ? void 0 : A.onCommit,
    onDraftChange: A == null ? void 0 : A.onDraftChange,
    onToggle: A == null ? void 0 : A.onToggle
  }), jt = v(Re.reset);
  jt.current = Re.reset;
  const En = typeof (A == null ? void 0 : A.commitLabel) == "function" ? A.commitLabel(Re.count) : (A == null ? void 0 : A.commitLabel) ?? `Select ${Re.count}`, ht = ie(() => {
    var y;
    _e(!1), t === "expandable" && ((y = it.current) == null || y.blur(), Xe(!1), requestAnimationFrame(() => {
      var z;
      return (z = Rt.current) == null ? void 0 : z.focus();
    })), Te || We(""), De(0), yt(b ? we : /* @__PURE__ */ new Set()), f == null || f();
  }, [t, f, We, b, we, Te, _e]);
  le(() => {
    if (he.trim() || !b) {
      yt((y) => y.size ? /* @__PURE__ */ new Set() : y);
      return;
    }
    yt((y) => y.size === we.size && [...we].every((z) => y.has(z)) ? y : we);
  }, [he, b, we]);
  const Mn = v(!1), Zt = v(!1);
  le(() => {
    if (!ne) {
      Mn.current = !1;
      return;
    }
    if (Mn.current || !g || he.trim()) return;
    const y = E ? [E] : [...(A == null ? void 0 : A.selectedIds) ?? []], z = new Set(y), Z = z.size ? e.filter((de) => n.some((Ce) => Ce.group === de.key && z.has(Ce.id))).map((de) => de.key) : [];
    if (Z.length === 0) {
      Mn.current = !0;
      return;
    }
    const re = x === "single" ? Z.slice(0, 1) : Z;
    if (!re.every((de) => qe.has(de))) {
      Zt.current = !0, yt(new Set(re));
      return;
    }
    if (B && E) {
      const de = Ie.findIndex((Ce) => Ce.kind === "item" && Ce.hit.item.id === E);
      de >= 0 && De(de);
    }
    Mn.current = !0;
  }, [ne, g, he, e, n, E, A == null ? void 0 : A.selectedIds, x, qe, Ie, B, De]);
  const ot = ie((y) => {
    yt((z) => {
      const Z = new Set(z);
      return Z.has(y) ? Z.delete(y) : (x === "single" && Z.clear(), Z.add(y)), Z;
    });
  }, [x]), Tt = ie(() => {
    var z;
    if (ne) {
      (z = it.current) == null || z.focus();
      return;
    }
    if (jt.current(), t === "expandable" && !Se) {
      const Z = Qe.current;
      if (Z) {
        const re = Z.style.transition, de = Z.style.width;
        Z.style.transition = "none", Z.style.width = `${T}px`;
        const Ce = Z.getBoundingClientRect();
        pt.current = { left: Ce.left, top: Ce.top, width: Ce.width, height: Ce.height }, Z.style.width = de, Z.offsetWidth, Z.style.transition = re, window.clearTimeout(At.current), At.current = window.setTimeout(() => {
          pt.current = null;
        }, hn + 80);
      }
    }
    Xe(!0), _e(!0);
    const y = E ? J.findIndex((Z) => Z.kind === "item" && Z.hit.item.id === E) : -1;
    De(y >= 0 ? xe + y : B ? xe : -1);
  }, [ne, t, Se, T, xe, J, E, B]);
  le(() => () => {
    window.clearTimeout(At.current), pt.current = null;
  }, []), le(() => {
    ne || (Dt.current = null);
  }, [ne]), le(() => {
    if (t !== "expandable" || !Se || !ne || !S) return;
    const y = requestAnimationFrame(() => {
      var z;
      return (z = it.current) == null ? void 0 : z.focus();
    });
    return () => cancelAnimationFrame(y);
  }, [t, Se, ne, S]), le(() => {
    var Z;
    if (!ne) return;
    const y = ((Z = Qe.current) == null ? void 0 : Z.ownerDocument) ?? Pe;
    if (!y) return;
    const z = (re) => {
      var Ce, en, Wt, tn;
      const de = ((Ce = re.composedPath) == null ? void 0 : Ce.call(re)[0]) ?? re.target;
      !de || typeof de.nodeType != "number" || (en = Qe.current) != null && en.contains(de) || (Wt = ft.current) != null && Wt.contains(de) || (tn = X == null ? void 0 : X.current) != null && tn.contains(de) || ht();
    };
    return y.addEventListener("pointerdown", z, !0), () => y.removeEventListener("pointerdown", z, !0);
  }, [ne, ht, Pe, X]);
  const Yt = ie((y) => {
    var z;
    if (y.kind === "item" ? Dt.current = y.hit.item.id : (y.kind === "group" || y.kind === "action") && (Dt.current = null), y.kind === "group") {
      if (Me) {
        const Z = (z = A == null ? void 0 : A.groupToken) == null ? void 0 : z.call(A, y.group.key);
        if (Z) {
          Re.canToggle(Z) && Re.toggle(Z);
          return;
        }
        const re = n.filter((de) => de.group === y.group.key && de.checkable !== !1 && Qt.has(de.id) && !Re.isDisabled(de.id)).map((de) => de.id);
        re.length && Re.toggleGroup(re);
        return;
      }
      d ? (d(y.group), p && ht()) : Ct && ot(y.group.key);
      return;
    }
    if (y.kind === "item") {
      if (Me) {
        Re.canToggle(y.hit.item.id) && Re.toggle(y.hit.item.id);
        return;
      }
      u(y.hit.item), p && ht();
      return;
    }
    if (y.kind === "action") {
      const Z = y.source === "leading" ? W : y.source === "footer" ? ue : M, re = Z == null ? void 0 : Z[y.actionIndex];
      re && re.onClick(he), p && ht();
    }
  }, [ht, p, M, ue, Ct, n, W, A, Me, u, d, he, Re, ot, Qt]), Rn = (y) => {
    if (Ue.length === 0) return;
    let z = Ee;
    if (z < 0 && Dt.current) {
      const de = Ue.find(
        (Ce) => Ce.row.kind === "item" && Ce.row.hit.item.id === Dt.current
      );
      de && (z = de.index);
    }
    const Z = Ue.findIndex((de) => de.index === z), re = Z < 0 ? 0 : (Z + y + Ue.length) % Ue.length;
    De(Ue[re].index);
  };
  _o(L, () => ({
    moveHighlight: Rn,
    activateHighlighted: () => {
      if (Ht.current) return !1;
      const y = Ee >= 0 ? Ie[Ee] : void 0;
      return y ? (Yt(y), De(-1, "keyboard"), !0) : !1;
    },
    close: ht,
    selectAll: () => {
      Me && Re.setAll(!0);
    },
    setSelection: (y) => {
      Re.reset(y);
    }
  }), [Ie, Ee, Yt, ht, Me, Re]);
  const dr = (y) => {
    if (Me && (y.metaKey || y.ctrlKey) && y.key.toLowerCase() === "a") {
      y.preventDefault(), y.stopPropagation(), Re.setAll(!0);
      return;
    }
    if (y.key === "ArrowDown")
      y.preventDefault(), ne ? Rn(1) : Tt();
    else if (y.key === "ArrowUp")
      y.preventDefault(), Rn(-1);
    else if ((y.key === "ArrowRight" || y.key === "ArrowLeft") && g && ne && !he.trim()) {
      const z = Ie[Ee];
      if ((z == null ? void 0 : z.kind) === "group") {
        const Z = qe.has(z.group.key);
        (y.key === "ArrowRight" || Z) && (y.preventDefault(), ot(z.group.key));
      } else if ((z == null ? void 0 : z.kind) === "item" && y.key === "ArrowLeft" && z.hit.item.group) {
        y.preventDefault();
        const Z = z.hit.item.group;
        qe.has(Z) && ot(Z);
        const re = Ie.findIndex((de) => de.kind === "group" && de.group.key === Z);
        re >= 0 && De(re);
      }
    } else if (y.key === "Enter") {
      y.preventDefault();
      const z = Ie[Ee] ?? Ie[0];
      z && Yt(z);
    } else y.key === "Escape" && (y.preventDefault(), ht());
  }, An = (y) => {
    t === "expandable" && !Se || (We(y), ne || _e(!0));
  };
  le(() => {
    if (C) {
      const z = he.trim().toLowerCase();
      if (!z) {
        const re = E ? J.findIndex((de) => de.kind === "item" && de.hit.item.id === E) : -1;
        De(re >= 0 ? xe + re : -1);
        return;
      }
      const Z = J.findIndex((re) => re.kind === "item" && re.hit.item.label.toLowerCase().includes(z));
      De(Z >= 0 ? xe + Z : -1);
      return;
    }
    if (Te) {
      const z = he.trim().toLowerCase();
      if (!!z && n.some((re) => re.id.toLowerCase() === z || re.label.toLowerCase() === z)) {
        De(-1);
        return;
      }
      if (!Me) {
        const re = J.findIndex((de) => de.kind === "item" && de.hit.item.tone !== "create");
        if (re >= 0) {
          De(xe + re);
          return;
        }
      }
    }
    const y = J.findIndex((z) => z.kind === "item");
    De(y >= 0 ? xe + y : xe);
  }, [he]), le(() => {
    if (!ne || he.trim()) return;
    const y = E ? J.findIndex((z) => z.kind === "item" && z.hit.item.id === E) : -1;
    De(y >= 0 ? xe + y : B ? xe : -1);
  }, [ne]), ut(() => {
    ne && jt.current();
  }, [ne]);
  const fr = (y) => /* @__PURE__ */ R("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
    ve == null ? void 0 : ve.map((z) => /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        "aria-label": z.label,
        title: z.label,
        tabIndex: Se ? 0 : -1,
        onMouseDown: (Z) => Z.preventDefault(),
        onClick: () => {
          z.onClick(he, { close: ht }), z.keepOpen || ht();
        },
        style: { width: Ke.box, height: Ke.box },
        className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
        "data-search-field-action": z.key,
        children: /* @__PURE__ */ h(
          "span",
          {
            style: { width: Ke.icon, height: Ke.icon },
            className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
            children: z.icon
          }
        )
      },
      z.key
    )),
    he && /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        "aria-label": "Clear search",
        tabIndex: Se ? 0 : -1,
        onPointerDown: (z) => z.preventDefault(),
        onClick: y,
        style: { width: Ke.box, height: Ke.box },
        className: "ui-icon-btn flex items-center justify-center rounded",
        children: /* @__PURE__ */ h(Sn, { size: Ke.icon })
      }
    )
  ] }), Zr = /* @__PURE__ */ R("div", { className: "relative w-full", children: [
    /* @__PURE__ */ h(On, { size: Ke.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ h(
      "input",
      {
        ref: it,
        value: he,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": ne,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (y) => An(y.target.value),
        onFocus: () => {
          m && Tt();
        },
        onClick: () => {
          m && Tt();
        },
        onKeyDown: dr,
        placeholder: l,
        style: { paddingRight: $ },
        className: `${$r("sm")} w-full pl-8`
      }
    ),
    fr(() => {
      We(""), ne || Tt();
    })
  ] }), hr = /* @__PURE__ */ R("div", { className: "absolute inset-0", children: [
    /* @__PURE__ */ h(On, { size: Ke.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ h(
      "input",
      {
        ref: it,
        value: he,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": ne,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (y) => An(y.target.value),
        onFocus: () => {
          m && Se && Tt();
        },
        onClick: () => {
          m && Se && Tt();
        },
        onKeyDown: dr,
        placeholder: l,
        tabIndex: Se ? 0 : -1,
        style: { paddingRight: $ },
        className: `${$r("sm")} h-full w-full pl-8`
      }
    ),
    fr(() => {
      We(""), !ne && Se && Tt();
    })
  ] });
  le(() => {
    if (!ne || Ht.current) return;
    const y = ft.current;
    on(
      y == null ? void 0 : y.querySelector(`[data-search-row="${Ee}"]`),
      "nearest",
      (y == null ? void 0 : y.querySelector("[data-search-scroller]")) ?? null
    );
  }, [ne, Ee]);
  const In = v(J);
  In.current = J;
  const gn = v(E);
  gn.current = E;
  const O = v(A == null ? void 0 : A.selectedIds);
  O.current = A == null ? void 0 : A.selectedIds, ut(() => {
    if (!ne || !Zt.current) return;
    const y = ft.current;
    if (!y) return;
    const z = E;
    if (!z) {
      Zt.current = !1;
      return;
    }
    const Z = J.findIndex((de) => de.kind === "item" && de.hit.item.id === z);
    if (Z < 0) {
      Zt.current = !1;
      return;
    }
    const re = y.querySelector(`[data-search-row="${Z}"]`);
    re && (on(re, "center", y.querySelector("[data-search-scroller]") ?? null), Zt.current = !1);
  }, [ne, qe, J, E]);
  const ae = is({
    open: ne,
    block: "center",
    ready: G.ready,
    scroller: () => {
      var y;
      return ((y = ft.current) == null ? void 0 : y.querySelector("[data-search-scroller]")) ?? null;
    },
    row: () => {
      var Z;
      let y = -1;
      const z = gn.current;
      if (z)
        y = In.current.findIndex((re) => re.kind === "item" && re.hit.item.id === z);
      else {
        const re = O.current;
        if (re && re.length) {
          const de = new Set(re);
          y = In.current.findIndex((Ce) => Ce.kind === "item" && de.has(Ce.hit.item.id));
        }
      }
      return y < 0 ? null : ((Z = ft.current) == null ? void 0 : Z.querySelector(`[data-search-row="${y}"]`)) ?? null;
    }
  }), be = (y, z) => {
    const Z = Ee === z, re = !Me && E !== void 0 && y.hit.item.id === E, de = Me ? Re.isSelected(y.hit.item.id) : re, Ce = !!y.hit.item.disabled || Me && !Re.canToggle(y.hit.item.id), en = y.hit.item.tone === "create" ? w === "light" ? { background: Z ? "#d1fae5" : "#ecfdf5", color: Z ? "#065f46" : "#047857" } : { background: Z ? "rgba(6, 95, 70, 0.7)" : "rgba(6, 78, 59, 0.4)", color: Z ? "#d1fae5" : "#6ee7b7" } : void 0;
    return /* @__PURE__ */ R(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": de,
        tabIndex: -1,
        "data-search-item": y.hit.item.id,
        "data-search-row": z,
        "data-search-create": y.hit.item.tone === "create" ? "" : void 0,
        onMouseDown: (Wt) => Wt.preventDefault(),
        onMouseEnter: () => De(z, "pointer"),
        onClick: () => Yt(y),
        style: { ..._t, ...y.hit.item.rowStyle, ...en },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${Ze.itemDefault} ${y.hit.item.rowClassName ?? ""} ${re ? "ui-item-selected" : ""} ${Z ? "ui-item-highlighted" : ""} ${Ce ? "opacity-30 pointer-events-none" : ""}`,
        children: [
          Me && y.hit.item.checkable !== !1 && /* @__PURE__ */ h(Ir, { checked: de, disabled: Ce, indicator: A == null ? void 0 : A.indicator }),
          se ? /* @__PURE__ */ h("span", { className: "flex min-w-0 flex-1 items-center gap-2", children: se(y.hit.item, { checked: de, disabled: Ce }) }) : /* @__PURE__ */ R(ct, { children: [
            y.hit.item.icon && /* @__PURE__ */ h("span", { className: `${Ze.icon} shrink-0`, children: y.hit.item.icon }),
            /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: y.hit.item.label }),
            (y.hit.detail || y.hit.item.detail) && /* @__PURE__ */ h("span", { className: "shrink-0 max-w-[55%] truncate text-[10px] text-zinc-400", children: y.hit.detail || y.hit.item.detail }),
            re && /* @__PURE__ */ h(lr, { className: "ui-icon w-3.5 h-3.5 shrink-0", "aria-hidden": !0 })
          ] })
        ]
      },
      `item:${y.hit.item.id}`
    );
  }, st = (y, z) => {
    var ro;
    const Z = qe.has(y.group.key), re = g && !he.trim(), de = Ct, Ce = de && Ee === z, en = Me ? n.filter((Ge) => Ge.group === y.group.key && Qt.has(Ge.id) && Ge.checkable !== !1) : [], Wt = en.filter((Ge) => !Re.isDisabled(Ge.id)).map((Ge) => Ge.id), tn = Me ? (ro = A == null ? void 0 : A.groupToken) == null ? void 0 : ro.call(A, y.group.key) : void 0, Zi = !!tn && Re.isSelected(tn), eo = Zi ? "all" : Wt.length > 0 ? Re.groupState(Wt) : "none", Dl = Zi ? en.length : en.reduce((Ge, Pl) => Ge + (Re.isSelected(Pl.id) ? 1 : 0), 0), to = Me && /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        tabIndex: -1,
        "aria-label": `Select all ${y.group.label}`,
        onMouseDown: (Ge) => Ge.preventDefault(),
        onClick: (Ge) => {
          Ge.stopPropagation(), tn ? Re.toggle(tn) : Wt.length && Re.toggleGroup(Wt);
        },
        className: `shrink-0 flex items-center justify-center rounded ${tn || Wt.length ? "cursor-pointer" : "cursor-not-allowed"}`,
        children: /* @__PURE__ */ h(
          Ir,
          {
            checked: eo === "all",
            indeterminate: eo === "some",
            disabled: !tn && Wt.length === 0,
            indicator: A == null ? void 0 : A.indicator
          }
        )
      }
    ), no = Me ? /* @__PURE__ */ R("span", { className: `shrink-0 tabular-nums text-[10px] ${de ? "text-[color:var(--ui-text-faint)]" : "opacity-70"}`, children: [
      Dl,
      "/",
      en.length
    ] }) : y.group.count !== void 0 && /* @__PURE__ */ h("span", { className: `shrink-0 tabular-nums ${de ? "text-[10px] text-[color:var(--ui-text-faint)]" : "opacity-70"}`, children: y.group.count });
    return de ? /* @__PURE__ */ R(
      "div",
      {
        role: "option",
        "aria-selected": !1,
        "aria-expanded": re ? Z : void 0,
        "data-search-group": y.group.key,
        onMouseDown: (Ge) => Ge.preventDefault(),
        onMouseEnter: () => De(z, "pointer"),
        onClick: () => {
          re && ot(y.group.key);
        },
        style: _t,
        className: `w-full rounded flex items-center gap-1 outline-none select-none font-medium ${Ze.itemDefault} ${Ce ? "ui-item-highlighted" : ""}`,
        children: [
          to,
          /* @__PURE__ */ R(
            "button",
            {
              type: "button",
              tabIndex: -1,
              onMouseDown: (Ge) => Ge.preventDefault(),
              onClick: (Ge) => {
                Ge.stopPropagation(), Yt(y);
              },
              className: "flex w-auto min-w-0 max-w-full cursor-pointer items-center gap-2 text-left",
              children: [
                y.group.icon && /* @__PURE__ */ h("span", { className: `${Ze.icon} shrink-0`, children: y.group.icon }),
                /* @__PURE__ */ h("span", { className: "truncate", children: y.group.label })
              ]
            }
          ),
          /* @__PURE__ */ h("span", { className: "min-w-0 flex-1" }),
          no,
          re && /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `${Z ? "Collapse" : "Expand"} ${y.group.label}`,
              "aria-expanded": Z,
              onMouseDown: (Ge) => Ge.preventDefault(),
              onClick: (Ge) => {
                Ge.stopPropagation(), ot(y.group.key);
              },
              style: { width: Ke.box, height: Ke.box },
              className: "shrink-0 flex cursor-pointer items-center justify-center rounded text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text)]",
              children: /* @__PURE__ */ h(
                dn,
                {
                  size: Ke.icon,
                  className: `transition-transform duration-200 ${Z ? "rotate-180" : ""}`
                }
              )
            }
          )
        ]
      },
      `group:${y.group.key}`
    ) : /* @__PURE__ */ R(
      "div",
      {
        role: "presentation",
        "data-search-group": y.group.key,
        "data-search-row": z,
        style: It,
        className: "w-full flex items-center gap-2 select-none font-semibold uppercase tracking-wider ui-label",
        children: [
          to,
          y.group.icon && /* @__PURE__ */ h("span", { className: `${Ze.icon} shrink-0`, children: y.group.icon }),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: y.group.label }),
          no
        ]
      },
      `group:${y.group.key}`
    );
  }, Le = (y, z) => {
    var de;
    const Z = Ee === z, re = y.source === "leading" ? W : y.source === "footer" ? ue : M;
    return /* @__PURE__ */ R(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": !1,
        tabIndex: -1,
        "data-search-action": y.source || "empty",
        "data-search-row": z,
        onMouseDown: (Ce) => Ce.preventDefault(),
        onMouseEnter: () => De(z, "pointer"),
        onClick: () => Yt(y),
        style: _t,
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${Ze.itemDefault} ${Z ? "ui-item-highlighted" : ""}`,
        children: [
          /* @__PURE__ */ h("span", { className: `${Ze.icon} shrink-0`, children: ((de = re == null ? void 0 : re[y.actionIndex]) == null ? void 0 : de.icon) || /* @__PURE__ */ h(_r, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: y.label })
        ]
      },
      `${y.source || "empty"}:${y.actionIndex}`
    );
  }, yn = () => /* @__PURE__ */ h("div", { className: "px-3 py-3 text-center", "data-search-empty": !0, children: j ? j({ query: he, close: ht }) : /* @__PURE__ */ R(ct, { children: [
    /* @__PURE__ */ h("div", { className: "mx-auto mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-400", children: /* @__PURE__ */ h(On, { className: "w-3.5 h-3.5" }) }),
    /* @__PURE__ */ h("div", { className: "text-xs font-medium text-zinc-500", children: F || `No matches for “${he.trim()}”` }),
    /* @__PURE__ */ h("div", { className: "mt-0.5 text-[10px] text-zinc-400", children: U || "Try a name, phone number, board ID or category." })
  ] }) }, "__empty"), $n = [];
  for (let y = 0; y < J.length; y++) {
    const z = J[y];
    if (z.kind === "group") {
      const Z = [];
      let re = y + 1;
      for (; re < J.length && J[re].kind === "item" && J[re].hit.item.group === z.group.key; )
        Z.push({ row: J[re], index: re }), re++;
      $n.push({ group: z, index: y, items: Z }), y = re - 1;
    } else z.kind === "item" ? $n.push({ row: z, index: y }) : $n.push({ row: z, index: y });
  }
  const ei = ne || vt ? jr(
    /* @__PURE__ */ R(
      "div",
      {
        ref: k,
        id: "search-menu-panel",
        "data-theme": w,
        role: "listbox",
        "aria-label": l,
        "aria-multiselectable": Me ? !0 : void 0,
        onPointerEnter: ae.engage,
        onPointerDown: (y) => {
          y.stopPropagation(), ae.engage();
        },
        onMouseDown: (y) => y.stopPropagation(),
        onClick: (y) => y.stopPropagation(),
        onPointerLeave: () => {
          Ht.current && De(-1, "pointer");
        },
        className: "click-outside-ignore ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none min-w-0 overflow-hidden pointer-events-auto",
        style: {
          position: "fixed",
          left: G.left,
          top: G.top,
          width: H ?? (t === "expandable" ? T : Ye || void 0),
          minWidth: q,
          maxHeight: G.maxH,
          visibility: G.ready ? "visible" : "hidden"
        },
        children: [
          ze && /* @__PURE__ */ R("div", { className: "shrink-0 pb-1", children: [
            pe.map((y, z) => Le(y, z)),
            J.length > 0 && /* @__PURE__ */ h("div", { className: Ze.separator })
          ] }),
          /* @__PURE__ */ R("div", { "data-search-scroller": !0, className: "overflow-y-auto scrollbar-custom flex flex-col min-h-0", children: [
            J.length === 0 && /* @__PURE__ */ h("div", { className: "px-3 py-3 text-xs text-zinc-400", "data-search-empty": !0, children: j ? j({ query: he, close: ht }) : /* @__PURE__ */ h(ct, { children: "Type to search…" }) }),
            $n.map((y) => {
              if (y.group) {
                const re = qe.has(y.group.group.key), de = y.items || [];
                return /* @__PURE__ */ R(lt.Fragment, { children: [
                  st(y.group, xe + y.index),
                  mn && /* @__PURE__ */ h(
                    "div",
                    {
                      "data-search-group-items": y.group.group.key,
                      "aria-hidden": !re,
                      className: "motion-reduce:transition-none",
                      style: {
                        display: "grid",
                        gridTemplateRows: re ? "1fr" : "0fr",
                        opacity: re ? 1 : 0,
                        transition: "grid-template-rows 220ms cubic-bezier(0.32, 0.72, 0, 1), opacity 150ms ease"
                      },
                      children: /* @__PURE__ */ h("div", { className: "overflow-hidden flex flex-col", children: de.map((Ce) => be(Ce.row, xe + Ce.index)) })
                    }
                  ),
                  !mn && de.map((Ce) => be(Ce.row, xe + Ce.index))
                ] }, `group:${y.group.group.key}`);
              }
              const z = y.row, Z = xe + y.index;
              return z.kind === "empty" ? yn() : z.kind === "action" ? Le(z, Z) : z.kind === "item" ? be(z, Z) : null;
            })
          ] }),
          ke.length > 0 && /* @__PURE__ */ R("div", { className: "shrink-0", children: [
            /* @__PURE__ */ h("div", { className: Ze.separator }),
            ke.map((y, z) => Le(y, xe + J.length + z))
          ] }),
          Me && (A == null ? void 0 : A.footer) !== !1 && /* @__PURE__ */ h(
            us,
            {
              count: Re.count,
              max: A == null ? void 0 : A.max,
              hiddenCount: (A == null ? void 0 : A.hiddenNote) === !1 ? 0 : Re.hiddenCount,
              clear: (A == null ? void 0 : A.clear) !== !1,
              theme: w,
              onClear: Re.clear,
              hero: (A == null ? void 0 : A.mode) === "live" ? void 0 : {
                label: En,
                onClick: () => {
                  Re.commit(), ht();
                },
                disabled: Re.count === 0
              }
            }
          )
        ]
      }
    ),
    Q ?? mt ?? (Pe == null ? void 0 : Pe.body) ?? document.body
  ) : null;
  return te ? /* @__PURE__ */ R(ct, { children: [
    /* @__PURE__ */ h("div", { ref: Qe, "data-search-menu": !0, "data-mode": "hidden", className: "hidden", "aria-hidden": !0 }),
    ei
  ] }) : t === "inline" ? /* @__PURE__ */ R("div", { ref: Qe, "data-search-menu": !0, "data-mode": t, className: "relative inline-flex", style: { width: "100%" }, children: [
    Zr,
    ei
  ] }) : /* @__PURE__ */ h(
    Xi,
    {
      expanded: Se,
      collapsedWidth: N,
      expandedWidth: T,
      rootRef: Qe,
      "data-search-menu": !0,
      "data-mode": t,
      trigger: ye ? ye({ open: ne, expanded: Se, toggle: Tt }) : /* @__PURE__ */ h(
        Et,
        {
          ref: Rt,
          type: "button",
          variant: o,
          size: "minimal",
          theme: w === "dark" ? "dark" : "light",
          icon: i === void 0 ? /* @__PURE__ */ h(On, { className: "w-3.5 h-3.5" }) : i,
          onClick: Tt,
          className: `w-full justify-start ${Se ? "pointer-events-none" : ""} ${s ?? ""}`,
          tabIndex: Se ? -1 : 0,
          "data-search-trigger": !0,
          children: /* @__PURE__ */ h("span", { className: "min-w-0 truncate", children: r })
        }
      ),
      field: /* @__PURE__ */ R(ct, { children: [
        hr,
        ei
      ] })
    }
  );
}
function kn(n, e = "id") {
  return e === "label" ? n.label : n.id;
}
function zl(n, e, t = "id") {
  const r = e.find((i) => kn(i, t) === n);
  return (r == null ? void 0 : r.label) || n;
}
function jf(n) {
  return n.split(",").map((e) => e.trim()).filter(Boolean);
}
function Wf(n) {
  const e = n.split(",");
  return (e[e.length - 1] || "").trim();
}
function qf(n, e) {
  const t = n.trim().replace(/,\s*$/, ""), r = e.trim();
  return r ? t ? `${t}, ${r}` : r : t;
}
function Qi(n, e, t = "id") {
  const r = n.trim();
  if (!r) return "";
  const i = e.find((l) => kn(l, t) === r);
  if (i) return kn(i, t);
  const o = r.toLowerCase(), s = e.find((l) => l.label.toLowerCase() === o);
  return s ? kn(s, t) : r;
}
function Kf(n, e, t = "id") {
  const r = /* @__PURE__ */ new Set(), i = [];
  for (const o of jf(n)) {
    const s = Qi(o, e, t);
    !s || r.has(s) || (r.add(s), i.push(s));
  }
  return i;
}
function Jf(n, e, t = "id") {
  const r = n.split(",").map((l) => l.trim()).filter(Boolean), i = n.trimEnd().endsWith(",") ? r : r.slice(0, -1), o = /* @__PURE__ */ new Set(), s = [];
  for (const l of i) {
    const c = Qi(l, e, t);
    !c || o.has(c) || (o.add(c), s.push(c));
  }
  return s;
}
function Vf(n, e, t = "id") {
  const r = n.trim();
  if (!r) return !0;
  const i = r.toLowerCase();
  return e.some((o) => kn(o, t).toLowerCase() === i || o.label.toLowerCase() === i);
}
function Yf(n, e, t = "id") {
  const r = new Set(e.map((i) => kn(i, t)));
  return n.filter((i) => !r.has(i));
}
function Bo(n, e, t, r, i) {
  return i ? i([...n], [...e]) : r === "count" ? n.length ? `${n.length} selected` : "" : r === "chips" ? "" : n.map((o) => zl(o, e, t)).join(", ");
}
const Uf = () => {
};
function ep({
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
  inputReadOnly: D = !1,
  disabled: E = !1,
  autoFocus: S = !1,
  defaultOpen: N = !1,
  selectAllOnOpen: T = !0,
  uppercase: H = !1,
  allowFreeText: q = !0,
  theme: C,
  className: K = "",
  style: w,
  panelWidth: I,
  panelMinWidth: F,
  initialQuery: U,
  keepAllRows: j = !1,
  maxMenuHeight: M,
  portalTarget: W,
  autoGrow: Y = !1,
  skipComma: ue = !1,
  collapsedWidth: ve = 140,
  expandedWidth: A = 280,
  createLabel: ge,
  onCreateItem: me,
  onExit: te,
  onEscape: X,
  onTabExit: Q,
  loadItems: ye,
  emptyTitle: se,
  emptyHint: B,
  sortItems: L,
  max: V,
  disabledIds: je,
  indicator: Ne,
  browse: he,
  groupToken: We
}) {
  const Te = Xt(), Fe = C ?? (Te == null ? void 0 : Te.mode) ?? "light", Be = He(), ne = ie((O) => kn(O, i), [i]), _e = tt(() => t.map(ne), [t, ne]), Se = tt(() => new Map(t.map((O) => [ne(O), O])), [t, ne]), Xe = ie((O) => zl(O, t, i), [t, i]), bt = tt(() => new Set([...m ?? []].map((O) => O.toLowerCase())), [m]), [we, qe] = oe(!1), [yt, Ee] = oe(""), [Bt, Ht] = oe(() => {
    const O = U ?? "";
    return H ? O.toUpperCase() : O;
  }), [Dt, De] = oe(Bt), [Qe, it] = oe(() => [...n]), [Rt, ft] = oe(null), [pt, At] = oe(!1), Pe = v(null), mt = v(null), Ze = v(null), _t = v(null), It = v(null), Ke = v(n.join("\0")), $t = v(!1), $ = v(/* @__PURE__ */ new Set()), G = v(!1), fe = v(!1), Ye = v(!1), et = v(0), vt = v(""), wt = v([...n]), k = n.join("\0"), ee = tt(
    () => Bo(n, t, i, l, c),
    [n, t, i, l, c]
  ), J = ie((O) => {
    if (a) return a([...O], t);
    if (o === "single") return O[0] ? Xe(O[0]) : "";
    const ae = O.map(Xe).join(", ");
    return ue ? ae : O.length ? `${ae}, ` : "";
  }, [a, t, o, Xe, ue]);
  le(() => {
    we || (it([...n]), wt.current = [...n], Ke.current = k);
  }, [k, we]);
  const pe = ie(() => {
    if (we || x || E) return;
    $t.current = !1, G.current = !0;
    const O = o === "multiple" && Bt ? qf(J(n), Bt) : J(n);
    vt.current = O, wt.current = [...n], it([...n]), Ee(O), De(Bt), Ht(""), qe(!0);
  }, [we, x, E, n, J, Bt, o]);
  ut(() => {
    if (!we) return;
    const O = Pe.current ?? mt.current;
    O && (O.focus(), (O instanceof HTMLInputElement || O instanceof HTMLTextAreaElement) && (o === "single" && T ? O.setSelectionRange(0, O.value.length) : O.setSelectionRange(O.value.length, O.value.length)));
  }, [we]), ut(() => {
    if (!Ye.current) return;
    Ye.current = !1;
    const O = Pe.current;
    O && (O.focus(), O.setSelectionRange(O.value.length, O.value.length));
  }, [yt]), le(() => {
    (N || S) && pe();
  }, []);
  const ke = o === "single" ? Dt : Wf(yt), Ae = ye ? Rt ?? [] : t, ze = tt(
    () => L ? L(Ae, Qe) : Ae,
    [Ae, L, Qe]
  ), xe = ke.trim(), Ie = !!me && q && !pt && !!xe && !Vf(xe, Ae, i);
  le(() => {
    if (!ye || !we) return;
    const O = ke.trim();
    if (!O) {
      ft(null), At(!1);
      return;
    }
    At(!0);
    const ae = ++et.current, be = setTimeout(() => {
      ye(O).then((st) => {
        et.current === ae && (ft(st), At(!1));
      }).catch(() => {
        et.current === ae && (ft([]), At(!1));
      });
    }, 400);
    return () => clearTimeout(be);
  }, [ye, we, ke]);
  const Ct = tt(() => {
    const O = ze.filter((ae) => !ae.hidden).map((ae) => ({
      id: ne(ae),
      label: ae.label,
      group: ae.group,
      detail: ae.detail,
      icon: ae.icon,
      disabled: !!ae.disabled || !!(je != null && je.includes(ne(ae))),
      fields: ae.fields,
      keywords: ae.keywords,
      rowClassName: ae.rowClassName,
      rowStyle: ae.rowStyle
    }));
    return Ie && O.unshift({
      id: xe,
      label: ge ? ge(xe) : `Add “${xe}”…`,
      keywords: xe,
      checkable: !1,
      tone: "create",
      pinned: !0
    }), O;
  }, [ze, ne, je, Ie, xe, ge]), Ue = ie((O) => {
    const ae = O.join("\0");
    if (ae !== Ke.current) {
      if (xn(O, n)) {
        Ke.current = ae;
        return;
      }
      if (Ke.current = ae, e(O), me)
        for (const be of Yf(O, t, i))
          $.current.has(be) || ($.current.add(be), me(be));
    }
  }, [n, e, me, t, i]), mn = ie((O, ae) => {
    !ae || !me || !q || t.some((be) => ne(be) === O) || $.current.has(O) || ($.current.add(O), me(O));
  }, [me, q, t, ne]), Me = ie((O = !0) => {
    if (!G.current || (G.current = !1, x || E)) return;
    if ($t.current) {
      $t.current = !1;
      return;
    }
    const ae = vt.current, be = new Set(_e), st = o === "single" ? (() => {
      const Le = ae.trim();
      if (!Le) return q ? [] : n;
      const yn = Qi(Le, t, i);
      return !q && !be.has(yn) ? n : [yn];
    })() : Lt(
      Kf(ae, t, i).filter((Le) => q || be.has(Le)),
      _e
    );
    wt.current = st, it(st), De(""), qe(!1), Ue(st), O && !fe.current && (te == null || te());
  }, [x, E, o, t, i, _e, q, n, Ue, te]), kt = ie((O) => {
    qe(O), O || Me();
  }, [Me]), Vt = ie(() => {
    $t.current = !0, G.current = !1;
    const O = J(n);
    vt.current = O, wt.current = [...n], it([...n]), Ee(O), De(""), qe(!1), X == null || X();
  }, [n, J, X]);
  le(() => {
    var st;
    if (!we) return;
    const ae = (((st = Ze.current) == null ? void 0 : st.ownerDocument) ?? document).defaultView;
    if (!ae) return;
    const be = (Le) => {
      Le.key === "Escape" && (Le.preventDefault(), Le.stopImmediatePropagation(), Vt());
    };
    return ae.addEventListener("keydown", be, !0), () => ae.removeEventListener("keydown", be, !0);
  }, [we, Vt]);
  const Qt = ie((O) => {
    const ae = Lt(O, _e), be = J(ae);
    wt.current = ae, vt.current = be, it(ae), Ye.current = !0, Ee(be);
  }, [_e, J]), Re = ie((O) => {
    const ae = O.id;
    G.current = !1;
    const be = Xe(ae);
    wt.current = [ae], vt.current = be, it([ae]), Ee(be), De(""), qe(!1), Ue([ae]), fe.current || te == null || te();
  }, [Xe, Ue, te]), jt = (O) => {
    var ae, be, st, Le, yn;
    if (O.key === "Escape") {
      O.preventDefault(), Vt();
      return;
    }
    if (O.key === "Tab") {
      if (O.preventDefault(), o === "single" && we) {
        fe.current = !0;
        const $n = (ae = It.current) == null ? void 0 : ae.activateHighlighted();
        if (fe.current = !1, $n) {
          (be = Q ?? te) == null || be(Pe.current ?? void 0);
          return;
        }
      }
      we && Me(!1), (st = Q ?? te) == null || st(Pe.current ?? void 0);
      return;
    }
    if (O.key === "ArrowDown" || O.key === "ArrowUp") {
      if (O.preventDefault(), !we) {
        pe();
        return;
      }
      (Le = It.current) == null || Le.moveHighlight(O.key === "ArrowDown" ? 1 : -1);
      return;
    }
    if (O.key === "Enter") {
      if (O.preventDefault(), O.stopPropagation(), we && ((yn = It.current) != null && yn.activateHighlighted())) return;
      Me();
      return;
    }
  }, En = (O) => {
    var be;
    const ae = H ? O.target.value.toUpperCase() : O.target.value;
    if (vt.current = ae, Ee(ae), o === "single" && De(ae), we || (G.current = !0, $t.current = !1, qe(!0)), o === "multiple") {
      const st = Lt(Jf(ae, t, i), _e);
      wt.current = st, it(st), (be = It.current) == null || be.setSelection(st);
    }
  }, ht = () => {
    if (G.current) {
      if ($t.current) {
        $t.current = !1;
        return;
      }
      Me();
    }
  }, Mn = ie((O, ae) => {
    const be = Se.get(O.id);
    if (!be)
      return /* @__PURE__ */ R(ct, { children: [
        /* @__PURE__ */ h(_r, { className: "h-3.5 w-3.5 shrink-0" }),
        /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: O.label })
      ] });
    const st = !!m && (i === "label" ? bt.has(be.label.toLowerCase()) : m.has(ne(be))), Le = (f == null ? void 0 : f(be)) ?? be.badge ?? null;
    return /* @__PURE__ */ R(ct, { children: [
      d ? d(be, ae.checked) : /* @__PURE__ */ R(ct, { children: [
        be.icon && /* @__PURE__ */ h("span", { className: "shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5", children: be.icon }),
        /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: be.label }),
        Le && /* @__PURE__ */ h("span", { className: "shrink-0 text-[10px] text-[color:var(--ui-text-faint)]", children: Le }),
        p == null ? void 0 : p(be)
      ] }),
      st && /* @__PURE__ */ h("span", { className: "shrink-0 inline-flex", title: g, "aria-label": g, children: /* @__PURE__ */ h(Vl, { className: "h-3.5 w-3.5 text-amber-500" }) })
    ] });
  }, [Se, m, bt, i, ne, f, d, p, g]), Zt = /* @__PURE__ */ h(
    _f,
    {
      ref: It,
      mode: "inline",
      hideTrigger: !0,
      open: we,
      onOpenChange: kt,
      anchorRef: s === "morph" ? _t : Ze,
      items: Ct,
      groups: r,
      query: ke,
      onSelect: Re,
      closeOnSelect: o === "single",
      selectedId: o === "single" ? Qe[0] : void 0,
      multiple: o === "multiple" ? {
        selectedIds: Qe,
        mode: "live",
        onDraftChange: Qt,
        onToggle: mn,
        onCommit: Uf,
        max: V,
        disabledIds: je,
        indicator: Ne,
        groupToken: We
      } : void 0,
      openOnFocus: !1,
      autoFocus: !1,
      highlightOnOpen: o === "single",
      browseAll: r.length === 0,
      browseExpanded: r.length > 0 && (he ?? "open") === "open",
      expandableGroups: r.length > 0 && he === "accordion",
      groupExpandMode: "single",
      renderItem: Mn,
      emptyTitle: pt ? "Searching…" : se,
      emptyHint: pt ? "Fetching matching records." : B,
      theme: Fe,
      panelWidth: I,
      panelMinWidth: F,
      keepAllRows: j,
      maxMenuHeight: M,
      portalTarget: W
    }
  ), ot = s === "chip", Tt = s === "wrap", Yt = !ot && !Tt && Y, Rn = !we && !ee, dr = we ? yt : ee, An = {
    ref: Pe,
    /* Chip: the INPUT holds the committed keys (cast reads "1") while the
       overlay renders the resolved face ("1. GEORGE") — the old
       EntityDropdown's transparent-input contract. */
    value: we ? yt : ot ? n.join(", ") : ee,
    disabled: E,
    readOnly: D,
    placeholder: "",
    onFocus: pe,
    onClick: pe,
    onChange: En,
    onBlur: ht,
    onKeyDown: jt,
    autoComplete: "off",
    spellCheck: !1
  }, fr = P(5, 7, Be), Zr = P(9, 12, Be), hr = P(12, 14, Be);
  if (s === "button") {
    const O = (Le) => jt(Le), ae = we ? Qe : n, be = Bo(ae, t, i, l, c), st = !be;
    return /* @__PURE__ */ R(
      "div",
      {
        ref: Ze,
        "data-picker-field": !0,
        className: `relative ${K}`,
        style: w,
        onMouseDown: (Le) => Le.stopPropagation(),
        onContextMenu: (Le) => {
          Le.preventDefault(), Le.stopPropagation();
        },
        children: [
          u ? /* @__PURE__ */ h("span", { className: "pointer-events-none flex w-full min-w-0 items-center", children: u({ values: [...ae], items: t, display: be, open: we, toggle: pe }) }) : /* @__PURE__ */ R(
            Et,
            {
              ref: mt,
              variant: "outline",
              theme: Fe === "dark" ? "dark" : "light",
              disabled: E,
              onClick: x ? void 0 : () => we ? Me() : pe(),
              onKeyDown: O,
              "data-state": we ? "open" : "closed",
              "aria-haspopup": "listbox",
              "aria-expanded": we,
              className: "w-full justify-between gap-2",
              children: [
                l === "chips" && ae.length > 0 ? /* @__PURE__ */ h("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1 overflow-hidden", children: ae.map((Le) => /* @__PURE__ */ h(
                  "span",
                  {
                    className: "inline-flex items-center rounded border border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-1.5 py-0.5 text-[10px] text-[color:var(--ui-text)]",
                    children: Xe(Le)
                  },
                  Le
                )) }) : /* @__PURE__ */ h("span", { className: `min-w-0 flex-1 truncate text-left ${st ? "italic text-[color:var(--ui-text-faint)]" : ""}`, children: be || b }),
                /* @__PURE__ */ h(dn, { className: "h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" })
              ]
            }
          ),
          Zt
        ]
      }
    );
  }
  if (s === "morph")
    return /* @__PURE__ */ h(
      Xi,
      {
        expanded: we,
        collapsedWidth: ve,
        expandedWidth: A,
        rootRef: Ze,
        "data-picker-field": !0,
        className: K,
        style: w,
        trigger: u ? u({ values: [...n], items: t, display: ee, open: we, toggle: pe }) : (
          /* The collapsed face IS the chip: one trigger recipe for both
             faces, so a morph picker matches every other value field. */
          /* @__PURE__ */ R(
            "button",
            {
              type: "button",
              disabled: E,
              onClick: pe,
              className: "ui-press flex w-full cursor-pointer select-none items-center justify-between gap-2 rounded-[var(--ui-radius-btn)] border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left outline-none transition-colors hover:border-[color:var(--ui-input-focus-border)] disabled:cursor-default disabled:opacity-50",
              style: { padding: `${fr}px ${Zr}px`, fontSize: hr },
              children: [
                /* @__PURE__ */ h("span", { className: `min-w-0 flex-1 truncate ${Rn ? "italic text-[color:var(--ui-text-muted)]" : ""}`, children: ee || b }),
                /* @__PURE__ */ h(dn, { className: "pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" })
              ]
            }
          )
        ),
        field: /* @__PURE__ */ R("div", { ref: _t, className: "relative h-full", children: [
          /* @__PURE__ */ h(
            "input",
            {
              ...An,
              className: `${$r("sm")} h-full w-full`
            }
          ),
          Zt
        ] })
      }
    );
  const In = ot ? P(5, 7, Be) : 0, gn = ot ? P(9, 12, Be) : 0;
  return x ? /* @__PURE__ */ h(
    "div",
    {
      ref: Ze,
      "data-picker-field": !0,
      className: `relative ${ot ? "flex w-full items-center gap-1.5 rounded border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left" : Tt ? "min-h-[1lh] w-full pb-[1lh]" : "h-[1lh] w-full"} ${K}`,
      style: ot ? { padding: `${In}px ${gn}px`, fontSize: P(12, 14, Be), ...w } : w,
      children: /* @__PURE__ */ h(
        "input",
        {
          readOnly: !0,
          tabIndex: -1,
          value: ee,
          className: ot ? "w-full min-w-0 bg-transparent outline-none" : "absolute inset-0 h-full w-full bg-transparent text-inherit outline-none",
          style: { color: "inherit", caretColor: "transparent" }
        }
      )
    }
  ) : /* @__PURE__ */ R(
    "div",
    {
      ref: Ze,
      "data-picker-field": !0,
      className: `relative ${ot ? "ui-press flex w-full items-center gap-1.5 rounded-[var(--ui-radius-btn)] border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left outline-none focus-within:border-[color:var(--ui-input-focus-border)]" : Tt ? "min-h-[1lh] w-full pb-[1lh]" : Yt ? "w-max max-w-[400px] min-w-[72px]" : "h-[1lh] w-full"} ${K}`,
      style: ot ? { padding: `${In}px ${gn}px`, fontSize: hr, ...w } : w,
      onMouseDown: (O) => O.stopPropagation(),
      onContextMenu: (O) => {
        O.preventDefault(), O.stopPropagation();
      },
      onAuxClick: pe,
      children: [
        ot && u ? /* @__PURE__ */ h("span", { className: "pointer-events-none flex min-w-0 flex-1 items-center", children: u({ values: [...n], items: t, display: ee, open: we, toggle: pe }) }) : l === "chips" && !we ? /* @__PURE__ */ R("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1", children: [
          n.map((O) => /* @__PURE__ */ h(
            "span",
            {
              className: "inline-flex items-center rounded border border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-1.5 py-0.5 text-[10px] text-[color:var(--ui-text)]",
              children: Xe(O)
            },
            O
          )),
          n.length === 0 && /* @__PURE__ */ h("span", { className: "italic text-[color:var(--ui-text-muted)]", children: b })
        ] }) : /* @__PURE__ */ h(
          "span",
          {
            className: `pointer-events-none text-left ${ot ? "min-w-0 flex-1 truncate" : Tt ? "block whitespace-pre-wrap break-words leading-relaxed" : "absolute inset-y-0 inset-x-0 flex items-center truncate whitespace-nowrap"} ${Rn ? "italic text-[color:var(--ui-text-muted)]" : ""}`,
            children: dr || b
          }
        ),
        Tt ? /* @__PURE__ */ h(
          "textarea",
          {
            ...An,
            rows: 1,
            className: "absolute inset-0 h-full w-full resize-none overflow-hidden whitespace-pre-wrap break-words bg-transparent text-transparent outline-none",
            style: { caretColor: "#2563eb", color: "transparent" }
          }
        ) : /* @__PURE__ */ h(
          "input",
          {
            ...An,
            className: Yt ? "block w-full bg-transparent text-transparent outline-none" : "absolute inset-0 h-full w-full bg-transparent text-transparent outline-none",
            style: Yt ? { fieldSizing: "content", width: "auto", minWidth: 72, maxWidth: 400, caretColor: "#2563eb", color: "transparent" } : ot ? { caretColor: "#2563eb", color: "transparent", paddingLeft: gn, paddingRight: gn + 16 } : { caretColor: "#2563eb", color: "transparent" }
          }
        ),
        ot && /* @__PURE__ */ h(dn, { className: "pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" }),
        Zt
      ]
    }
  );
}
export {
  Et as Button,
  Qh as CardSection,
  $i as CheckMark,
  Ic as Checkbox,
  Dh as Checklist,
  Kh as ChromeHeader,
  qh as ContentRow,
  kh as ContextMenu,
  Nh as ContextMenuDivider,
  Sh as ContextMenuItem,
  Th as ContextMenuSub,
  Zo as DROPDOWN_MAX_HEIGHT,
  zh as DatePicker,
  Mh as DialogProvider,
  jc as DropdownItem,
  Vr as DropdownMenu,
  Wc as DropdownSubmenu,
  zi as DropdownThemeContext,
  Rf as FONTS,
  Lh as FloatingChrome,
  $h as FloatingToggle,
  If as FontMenu,
  Gh as FormatToolbar,
  rt as IS_COARSE,
  yc as IS_TOUCH_CAPABLE,
  wh as ItemManagerDropdown,
  Ah as LongPressMenuProvider,
  Ei as MORPH_EASE,
  hn as MORPH_MS,
  Mi as MORPH_OPACITY_MS,
  ur as MenuHighlightContext,
  ps as MenuSearchContext,
  Kc as Modal,
  Ch as ModalFooter,
  gr as ModalFooterButton,
  Zh as MorphActionField,
  Of as MorphSearchField,
  cs as NO_SELECTION_IDS,
  Xh as NumberInput,
  ep as PickerField,
  gc as PopoutWindowContext,
  Uh as RICH_TEXT_STATE_IDLE,
  Ph as RadioList,
  Mf as RichTextEditor,
  Df as SCRUB_PX_PER_STEP,
  _f as SearchMenu,
  Wh as SectionHeader,
  jh as Seg,
  Ir as SelectionCheck,
  ls as SelectionContext,
  us as SelectionFooter,
  Jh as StructureControls,
  Li as SubmenuContext,
  vh as TAB_PILL,
  da as TB_BTN,
  yr as TB_BTN_ICON,
  fa as TB_DANGER,
  ws as TB_DIVIDER,
  ha as TB_INPUT,
  _h as TB_NUM,
  ma as TB_PICKER,
  Oh as TB_ROW_LABEL,
  pa as TB_SEG,
  Fh as TB_TOGGLE,
  Hh as TB_TOGGLE_OFF,
  Bh as TB_TOGGLE_ON,
  as as TabFace,
  xh as ThemeProvider,
  bh as ThemeScope,
  vf as Token,
  bf as TokenChipView,
  xr as ToolButton,
  Pn as Tooltip,
  Ri as ZOOM_FROM,
  Hf as buildSearchMenuRows,
  Tc as buttonCloudOf,
  Gi as clampNumber,
  wc as cloneOverlayClose,
  P as coarsePx,
  Rc as countHidden,
  Yh as escapeHtml,
  Bo as formatPickerValues,
  Vo as getCoarseScale,
  Kr as getDropdownClasses,
  gh as getHardwareKeyboard,
  mh as getLastPointerType,
  so as groupSelectionState,
  Vf as hasPickerMatch,
  $r as inputCls,
  ea as isInteractiveElement,
  pi as isTouchLike,
  Wf as lastPickerSegment,
  Bf as matchSearchItem,
  rs as menuAttributesOf,
  Sc as menuThemeOf,
  Xo as nearestOverlayOrigin,
  Al as normalizeSpaces,
  Lt as orderByCatalogue,
  ti as overlayMorphEnabled,
  Ff as parseSearchTags,
  Jf as pickerCommittedKeys,
  kn as pickerItemKey,
  zl as pickerItemLabel,
  jf as pickerSegments,
  vc as playOverlayClose,
  bc as playOverlayOpen,
  Lo as preprocessTokenHtml,
  Qi as resolvePickerSegment,
  Kf as resolvePickerText,
  on as revealRowInScroller,
  xn as sameSelection,
  gf as sanitizeRichText,
  Pf as scrubbedValue,
  $l as searchMenuContent,
  Nc as segModeOf,
  hh as setCoarseScale,
  oo as setSelected,
  zf as steppedValue,
  Vh as stripRichText,
  yf as stripTokenWrappers,
  Mc as toggleSelected,
  Yf as unknownPickerValues,
  ph as useCoarse,
  He as useCoarseScale,
  fn as useCoarseSize,
  Ci as useCurrentDocument,
  cr as useCurrentWindow,
  Eh as useDialog,
  es as useDropdownPosition,
  ds as useDropdownTheme,
  yh as useHardwareKeyboard,
  bs as useInputSize,
  Pi as useItemSize,
  Xt as useKitTheme,
  xc as useLastPointerType,
  Rh as useLongPressOptOut,
  Oi as useMenuHighlight,
  Bc as useMenuSearch,
  qr as useOverlayMorph,
  Ti as usePopoutWindow,
  Vn as usePortalTarget,
  is as useRevealRowOnOpen,
  ss as useSelection,
  Ac as useSelectionContext,
  ua as useSlidingPill,
  Ih as useTouchMode
};
