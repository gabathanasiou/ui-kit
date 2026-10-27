"use client";
import { jsx as p, jsxs as M, Fragment as Xe } from "react/jsx-runtime";
import Le, { createContext as Ft, useContext as Ht, useState as ne, useEffect as oe, useRef as N, useCallback as ie, useLayoutEffect as ft, useMemo as Ge, useImperativeHandle as rl } from "react";
import * as ye from "@radix-ui/react-dropdown-menu";
import { Minus as il, Check as Pn, Search as Jt, X as Ut, Pencil as ol, Copy as uo, Trash2 as _r, RotateCcw as fo, Plus as ei, ChevronRight as or, ChevronLeft as sl, ArrowUp as ll, ArrowDown as al, ChevronDown as Bn, Underline as cl, Strikethrough as ul, RemoveFormatting as dl, Link as fl, ChevronUp as hl } from "lucide-react";
import { computePosition as pl, offset as ho, flip as po, shift as mo, size as ml, useFloating as gl, autoUpdate as yl } from "@floating-ui/react-dom";
import * as Dt from "@radix-ui/react-dialog";
import { createPortal as gr } from "react-dom";
import { mergeAttributes as xl, ReactNodeViewRenderer as bl, NodeViewWrapper as vl, useEditor as wl, EditorContent as kl } from "@tiptap/react";
import { PluginKey as xt, Plugin as Rt, Selection as cn, TextSelection as ht, NodeSelection as hn, AllSelection as Sl } from "@tiptap/pm/state";
import { DecorationSet as Wn, Decoration as Nl } from "@tiptap/pm/view";
import Cl from "@tiptap/starter-kit";
import Tl from "@tiptap/extension-placeholder";
import { TextStyle as El, FontFamily as Ml, FontSize as Rl } from "@tiptap/extension-text-style";
import Il from "@tiptap/extension-color";
import Al from "@tiptap/extension-link";
import zl from "@tiptap/extension-underline";
import $l from "@tiptap/suggestion";
import { Mention as Dl } from "@tiptap/extension-mention";
import { createRoot as Ol } from "react-dom/client";
const Ll = Ft(null);
function ti() {
  return Ht(Ll);
}
function xn() {
  const n = ti();
  return n ? n.document.body : null;
}
function ni() {
  const n = ti();
  return n ? n.document : typeof document < "u" ? document : null;
}
function Fn() {
  return ti() ?? (typeof window < "u" ? window : null);
}
const Hn = typeof window < "u", ze = Hn && window.matchMedia("(pointer: coarse)").matches, Pl = Hn && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
let yr = 0.5;
const In = /* @__PURE__ */ new Set();
function kf(n) {
  yr = Math.max(0, Math.min(1, n)), In.forEach((e) => e());
}
function go() {
  return yr;
}
function Sf() {
  const [, n] = ne(0);
  return oe(() => {
    const e = () => n((t) => t + 1);
    return In.add(e), () => {
      In.delete(e);
    };
  }, []), ze && yr > 0;
}
function Ce() {
  const [, n] = ne(0);
  return oe(() => {
    const e = () => n((t) => t + 1);
    return In.add(e), () => {
      In.delete(e);
    };
  }, []), yr;
}
function O(n, e, t) {
  return ze ? Math.round(n + (e - n) * t) : n;
}
function Bt(n, e) {
  const t = Ce();
  return ze && t > 0 ? {
    padding: `${O(n.py, e.py, t)}px ${O(n.px, e.px, t)}px`,
    fontSize: `${O(n.fs, e.fs, t)}px`
  } : { padding: `${n.py}px ${n.px}px`, fontSize: `${n.fs}px` };
}
function yo() {
  const n = Ce(), e = ze && n > 0;
  return {
    box: e ? O(28, 36, n) : 20,
    icon: e ? O(16, 20, n) : 14
  };
}
function jr(n) {
  return n === "touch" || n === "pen";
}
let an = null;
const Wr = /* @__PURE__ */ new Set();
Hn && window.addEventListener("pointerdown", (n) => {
  an = n.pointerType, Wr.forEach((e) => e());
}, !0);
function Nf() {
  return an;
}
function Bl() {
  const [, n] = ne(0), e = N(an);
  return oe(() => {
    const t = () => {
      e.current !== an && (e.current = an, n((r) => r + 1));
    };
    return Wr.add(t), () => {
      Wr.delete(t);
    };
  }, []), an;
}
const xo = ["(any-hover: hover)", "(any-pointer: fine)"];
function bo() {
  return Hn ? xo.some((n) => window.matchMedia(n).matches) : !1;
}
let sr = bo();
const qr = /* @__PURE__ */ new Set();
function Ri(n) {
  sr !== n && (sr = n, qr.forEach((e) => e()));
}
var co;
if (Hn) {
  const n = () => Ri(bo());
  for (const s of xo) {
    const l = window.matchMedia(s);
    (co = l.addEventListener) == null || co.call(l, "change", n);
  }
  window.addEventListener("focus", n), document.addEventListener("visibilitychange", n);
  const e = window.setInterval(() => {
    document.visibilityState === "visible" && n();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(e)), window.addEventListener("keydown", (s) => {
    s.isComposing || s.keyCode !== 229 && (s.key === "Enter" || s.key === "Backspace" || s.key === "Process" || s.key === "Unidentified" || Ri(!0));
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
function Cf() {
  return sr;
}
function Tf() {
  const [, n] = ne(0);
  return oe(() => {
    const e = () => n((t) => t + 1);
    return qr.add(e), () => {
      qr.delete(e);
    };
  }, []), sr;
}
const Gt = 220, ri = "cubic-bezier(0.32, 0.72, 0, 1)", ii = 170, oi = 0.94;
function Rr(n) {
  return n === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function vo(n, e) {
  const t = e.left + e.width / 2, r = e.top + e.height / 2;
  return {
    x: t < n.left ? 0 : t > n.left + n.width ? 1 : 0.5,
    y: r < n.top ? 0 : r > n.top + n.height ? 1 : 0.5
  };
}
function wo(n, e) {
  const t = (e == null ? void 0 : e()) ?? null;
  if (!t) return { x: 0.5, y: 0.5 };
  const r = n.getBoundingClientRect();
  return vo({ left: r.left, top: r.top, width: r.width, height: r.height }, t);
}
function Fl(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity };
  e.style.transition = "none", e.style.transformOrigin = "50% 50%", e.style.transform = `scale(${oi})`, e.style.opacity = "0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    n.current === i && requestAnimationFrame(() => {
      if (n.current !== i) return;
      const s = wo(e, t);
      e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transition = `transform ${Gt}ms ${ri}, opacity ${ii}ms ease`, e.style.transform = "none", e.style.opacity = "", window.setTimeout(() => {
        n.current === i && (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, r == null || r());
      }, Gt + 60);
    });
  });
}
function Hl(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity, pointerEvents: e.style.pointerEvents, visibility: e.style.visibility }, s = wo(e, t);
  e.style.transition = `transform ${Gt}ms ${ri}, opacity ${ii}ms ease`, e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transform = `scale(${oi})`, e.style.opacity = "0", e.style.pointerEvents = "none", window.setTimeout(() => {
    n.current === i && (e.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      n.current !== i || e.isConnected || (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, e.style.pointerEvents = o.pointerEvents, e.style.visibility = o.visibility);
    }));
  }, Gt + 60);
}
function _l(n, e, t) {
  const r = n.cloneNode(!0), i = n.getBoundingClientRect(), o = i.width > 0 || i.height > 0 ? i : t ?? i;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${o.left}px`, r.style.top = `${o.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const s = (e == null ? void 0 : e()) ?? null, l = s ? vo({ left: o.left, top: o.top, width: o.width, height: o.height }, s) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${l.x * 100}% ${l.y * 100}%`, n.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${Gt}ms ${ri}, opacity ${ii}ms ease`, r.style.transform = `scale(${oi})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, Gt + 60));
    });
  });
}
function xr(n) {
  const e = N(null), [t, r] = ne(!1), i = N(null), o = N(0), s = ie((m) => {
    if (n.ref && (n.ref.current = m), m) {
      o.current = 0, e.current = m;
      const y = m.getBoundingClientRect();
      (y.width > 0 || y.height > 0) && (i.current = { left: y.left, top: y.top, width: y.width, height: y.height }), r(!0);
      return;
    }
    const g = e.current, x = ++o.current;
    queueMicrotask(() => {
      x === o.current && e.current === g && (e.current = null, r(!1), !(!g || !n.cloneOnUnmount || !a.current) && g.style.visibility !== "hidden" && Rr(f.current) && _l(g, u.current, i.current));
    });
  }, []), l = ie(() => {
    const m = e.current;
    if (!m || getComputedStyle(m).transform !== "none") return;
    const g = m.getBoundingClientRect();
    (g.width > 0 || g.height > 0) && (i.current = { left: g.left, top: g.top, width: g.width, height: g.height });
  }, []), a = N(n.visible);
  a.current = n.visible;
  const c = N(n.visible), u = N(n.anchor ?? null);
  u.current = n.anchor ?? null;
  const d = N(n.onClosed);
  d.current = n.onClosed;
  const f = N(n.morph !== !1);
  f.current = n.morph !== !1;
  const h = N(0);
  return ft(() => {
    if (!t || !a.current || !Rr(f.current)) return;
    const m = e.current;
    m && Fl(h, m, u.current);
  }, [t, n.visible]), oe(() => {
    if (!t || !a.current) return;
    let m = 0;
    const g = () => {
      m = 0, l(), m = requestAnimationFrame(g);
    };
    return m = requestAnimationFrame(g), () => {
      m && cancelAnimationFrame(m);
    };
  }, [t, l]), ft(() => {
    var x;
    const m = c.current;
    if (c.current = n.visible, n.visible || !m) return;
    const g = e.current;
    if (!g || !Rr(f.current)) {
      (x = d.current) == null || x.call(d);
      return;
    }
    Hl(h, g, u.current, () => {
      var y;
      return (y = d.current) == null ? void 0 : y.call(d);
    });
  }, [n.visible]), oe(() => {
    if (!t || !a.current) return;
    const m = (g) => {
      const x = e.current;
      x && x.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", m, { capture: !0 }), () => document.removeEventListener("wheel", m, { capture: !0 });
  }, [t]), oe(() => {
    if (!t || !a.current) return;
    const m = (g) => {
      const x = e.current;
      x && x.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("touchmove", m, { capture: !0 }), () => document.removeEventListener("touchmove", m, { capture: !0 });
  }, [t]), s;
}
const ko = 384;
function jl(n) {
  const e = n.visualViewport;
  return e ? { x: e.offsetLeft, y: e.offsetTop, width: e.width, height: e.height } : { x: 0, y: 0, width: n.innerWidth, height: n.innerHeight };
}
function So({
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
  const u = Fn(), d = N(u);
  d.current = u;
  const f = N(c);
  f.current = c, ft(() => {
    if (!t) return;
    let h = 0, m = !1;
    const g = () => {
      h || (h = requestAnimationFrame(x));
    }, x = () => {
      if (h = 0, m) return;
      const I = d.current, F = n.current, $ = e.current;
      if (!I || !F || !$ || !$.isConnected) return;
      const S = (r == null ? void 0 : r.current) ?? $, G = jl(I), E = l ?? ko, B = Math.min(a, E), D = Math.max(0, $.offsetHeight - S.offsetHeight), V = Math.max(B, Math.ceil(S.scrollHeight + D)), K = Math.min(V, E);
      $.style.maxHeight = `${K}px`;
      let T = K;
      const k = i == null ? void 0 : i.current;
      pl(k ? {
        getBoundingClientRect: () => ({
          left: k.left,
          top: k.top,
          width: k.width,
          height: k.height,
          right: k.left + k.width,
          bottom: k.top + k.height,
          x: k.left,
          y: k.top,
          toJSON: () => {
          }
        })
      } : F, $, {
        strategy: "fixed",
        placement: "bottom-start",
        middleware: [
          ho(o),
          po({ boundary: G, padding: s, fallbackStrategy: "bestFit" }),
          mo({ boundary: G, padding: s, mainAxis: !1 }),
          ml({
            boundary: G,
            padding: s,
            apply({ availableHeight: le }) {
              T = Math.max(B, Math.floor(Math.min(E, le))), $.style.maxHeight = `${T}px`;
            }
          })
        ]
      }).then(({ x: le, y: ae, placement: J }) => {
        m || f.current({
          top: Math.round(ae),
          left: Math.round(le),
          maxH: T,
          side: J.startsWith("top") ? "top" : "bottom",
          ready: !0
        });
      });
    };
    x();
    const y = d.current, z = (y == null ? void 0 : y.document) ?? null, A = (y == null ? void 0 : y.visualViewport) ?? null, C = () => g();
    A == null || A.addEventListener("resize", C), A == null || A.addEventListener("scroll", C), y == null || y.addEventListener("resize", C), z == null || z.addEventListener("scroll", C, { capture: !0, passive: !0 });
    let w = null;
    return typeof ResizeObserver < "u" && (w = new ResizeObserver(C), e.current && w.observe(e.current), r != null && r.current && w.observe(r.current)), () => {
      m = !0, h && cancelAnimationFrame(h), A == null || A.removeEventListener("resize", C), A == null || A.removeEventListener("scroll", C), y == null || y.removeEventListener("resize", C), z == null || z.removeEventListener("scroll", C, { capture: !0 }), w == null || w.disconnect();
    };
  }, [t, n, e, r, i, o, s, l, a]);
}
let rn = null;
function No(n) {
  return rn == null || rn(), rn = n, () => {
    rn === n && (rn = null);
  };
}
const Co = Ft(null);
function si(n, e) {
  const t = n.mode ?? (e == null ? void 0 : e.mode) ?? "dark", r = n.surface ?? (e == null ? void 0 : e.surface) ?? "neutral", i = n.context ?? (e == null ? void 0 : e.context) ?? "surface", o = n.accent ?? (e == null ? void 0 : e.accent) ?? "zinc", s = n.accent !== void 0 && n.surface === void 0 && n.context === void 0;
  return { mode: t, accent: i === "chrome" || r === "accent" || s ? o : "zinc", surface: r, context: i };
}
function li({ theme: n, children: e }) {
  return /* @__PURE__ */ p(Co.Provider, { value: n, children: e });
}
function Ef({ mode: n, accent: e, surface: t, context: r, children: i }) {
  const o = It();
  return /* @__PURE__ */ p(li, { theme: si({ mode: n, accent: e, surface: t, context: r }, o), children: i });
}
function Mf({ mode: n, accent: e, surface: t, context: r, children: i, className: o, style: s }) {
  const l = It(), a = si({ mode: n, accent: e, surface: t, context: r }, l);
  return /* @__PURE__ */ p(li, { theme: a, children: /* @__PURE__ */ p(
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
function It() {
  return Ht(Co);
}
function Wl(n, e = "dark") {
  return n ? n.context === "surface" ? n.mode : n.mode === "light" ? "light" : n.accent === "emerald" ? "emerald" : n.accent === "blue" ? "blue" : "dark" : e;
}
function To(n, e) {
  if (n)
    return (n === "light" || n === "dark") && e ? {
      theme: n,
      attrs: { "data-theme": n, "data-mode": n, "data-accent": e.accent }
    } : { theme: n, attrs: { "data-theme": n } };
  if (!e) return { theme: "dark", attrs: { "data-theme": "dark" } };
  if (e.context === "chrome") {
    const t = Wl(e);
    return { theme: t, attrs: { "data-theme": t } };
  }
  return { theme: e.mode, attrs: { "data-mode": e.mode, "data-accent": e.accent } };
}
function ql(n, e = "light") {
  return (n == null ? void 0 : n.mode) ?? e;
}
function Jl(n) {
  return !n || n.context !== "chrome" && n.surface !== "accent" ? !1 : n.accent === "emerald" ? "emerald" : n.accent === "blue";
}
function Kl(n) {
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
function pn(n, e = "nearest", t) {
  if (!n) return;
  const r = t ?? Kl(n);
  if (!r || !r.contains(n)) return;
  const i = n.getBoundingClientRect(), o = r.getBoundingClientRect();
  if (e === "center") {
    r.scrollTop += i.top + i.height / 2 - (o.top + o.height / 2);
    return;
  }
  i.top < o.top ? r.scrollTop -= o.top - i.top : i.bottom > o.bottom && (r.scrollTop += i.bottom - o.bottom);
}
function Eo({
  open: n,
  row: e,
  block: t = "nearest",
  scroller: r,
  ready: i
}) {
  const o = N(!1), s = N(!1), l = N(!1), a = N({ row: e, scroller: r, block: t });
  a.current = { row: e, scroller: r, block: t };
  const c = ie(() => {
    o.current = !0;
  }, []);
  return ft(() => {
    if (!n) {
      s.current = !1, l.current = !1, o.current = !1;
      return;
    }
    if (s.current) return;
    s.current = !0;
    const { row: u, scroller: d, block: f } = a.current, h = u();
    h && (pn(h, f, (d == null ? void 0 : d()) ?? null), l.current = !0);
  }, [n]), oe(() => {
    if (!n || i !== !0 || !l.current) return;
    const u = requestAnimationFrame(() => {
      if (!l.current || (l.current = !1, o.current)) return;
      const { row: d, scroller: f } = a.current;
      pn(d(), "nearest", (f == null ? void 0 : f()) ?? null);
    });
    return () => cancelAnimationFrame(u);
  }, [n, i]), { engagedRef: o, engage: c };
}
const Vl = [];
function Tt(n, e) {
  const t = /* @__PURE__ */ new Map();
  e.forEach((s, l) => t.set(s, l));
  const r = [], i = [], o = /* @__PURE__ */ new Set();
  for (const s of n)
    o.has(s) || (o.add(s), t.has(s) ? r.push(s) : i.push(s));
  return r.sort((s, l) => t.get(s) - t.get(l)), [...r, ...i];
}
function qn(n, e) {
  if (n.length !== e.length) return !1;
  const t = new Set(n);
  return e.every((r) => t.has(r));
}
function Yl(n, e, t, r = {}) {
  var o;
  const i = Tt(n, t);
  return (o = r.disabledIds) != null && o.includes(e) ? i : i.includes(e) ? i.filter((s) => s !== e) : r.max !== void 0 && i.length >= r.max ? i : Tt([...i, e], t);
}
function Ii(n, e, t, r, i = {}) {
  const o = Tt(n, r), s = new Set(e);
  if (!t) return o.filter((d) => !s.has(d));
  const l = new Set(r), a = new Set(i.disabledIds ?? []), c = i.max === void 0 ? 1 / 0 : Math.max(0, i.max - o.length), u = Tt([...s], r).filter((d) => l.has(d) && !o.includes(d) && !a.has(d)).slice(0, c);
  return u.length === 0 ? o : Tt([...o, ...u], r);
}
function Ai(n, e) {
  if (e.length === 0) return "none";
  const t = new Set(n), r = e.reduce((i, o) => i + (t.has(o) ? 1 : 0), 0);
  return r === 0 ? "none" : r === e.length ? "all" : "some";
}
function Ul(n, e, t) {
  if (!t) return 0;
  const r = new Set(e), i = new Set(t);
  return n.reduce((o, s) => o + (r.has(s) && !i.has(s) ? 1 : 0), 0);
}
function Mo(n) {
  const {
    mode: e = "draft",
    selectedIds: t,
    itemIds: r,
    visibleIds: i,
    max: o,
    disabledIds: s,
    indicator: l = "box",
    onChange: a,
    onCommit: c,
    onToggle: u
  } = n, [d, f] = ne(() => Tt(t, r)), h = Ge(() => new Set(s ?? []), [s]), m = Ge(() => new Set(d), [d]), g = o !== void 0 && d.length >= o, x = !qn(d, t), y = ie((S) => {
    if (h.has(S)) return;
    const G = m.has(S), E = Yl(d, S, r, { max: o, disabledIds: s });
    qn(E, d) || (f(E), u == null || u(S, !G));
  }, [d, m, h, r, o, s, u]), z = ie((S) => {
    f((G) => {
      const E = S.filter((D) => !h.has(D)), B = Ai(G, E);
      return Ii(G, E, B !== "all", r, { max: o, disabledIds: s });
    });
  }, [h, r, o, s]), A = ie((S, G = i ?? r) => {
    f((E) => Ii(E, G, S, r, { max: o, disabledIds: s }));
  }, [i, r, o, s]), C = ie(() => f([]), []), w = ie((S) => {
    f(Tt(S ?? t, r));
  }, [t, r]), I = ie(() => !c || qn(d, t) ? !1 : (c(Tt(d, r)), !0), [c, d, t, r]), F = ie(() => !a || qn(d, t) ? !1 : (a(Tt(d, r)), !0), [a, d, t, r]), $ = ie((S) => Ai(d, S), [d]);
  return {
    mode: e,
    indicator: l,
    draft: d,
    count: d.length,
    max: o,
    atMax: g,
    dirty: x,
    hiddenCount: Ul(d, r, i),
    isSelected: (S) => m.has(S),
    isDisabled: (S) => h.has(S),
    canToggle: (S) => !h.has(S) && (m.has(S) || !g),
    toggle: y,
    toggleGroup: z,
    setAll: A,
    clear: C,
    reset: w,
    commit: I,
    flush: F,
    cancel: w,
    groupState: $
  };
}
const Ro = Ft(null), Gl = () => Ht(Ro), Io = Vl;
function ai({ checked: n, size: e, tone: t = "accent", indeterminate: r = !1 }) {
  return /* @__PURE__ */ p(
    "span",
    {
      className: `ui-check-indicator ${n || r ? "ui-check-indicator-checked" : ""} ${t === "danger" ? "ui-check-tone-danger" : ""}`,
      "aria-hidden": !0,
      children: r ? /* @__PURE__ */ M("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: [
        /* @__PURE__ */ p("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor", stroke: "var(--ui-check-ring)", strokeWidth: 1 }),
        /* @__PURE__ */ p("path", { d: "M4.5 8 H11.5", stroke: "var(--ui-check-check)", strokeWidth: 2, strokeLinecap: "round", fill: "none" })
      ] }) : n ? /* @__PURE__ */ M("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: [
        /* @__PURE__ */ p("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor", stroke: "var(--ui-check-ring)", strokeWidth: 1 }),
        /* @__PURE__ */ p("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "var(--ui-check-check)", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" })
      ] }) : /* @__PURE__ */ p("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: /* @__PURE__ */ p("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) })
    }
  );
}
function Xl({ checked: n, onChange: e, disabled: t = !1, label: r, id: i, className: o = "", labelClassName: s = "", theme: l, variant: a = "pill", tone: c = "accent", block: u = !1 }) {
  const d = a !== "plain", f = Ce(), h = O(16, 20, f), m = O(12, 14, f), g = O(12, 14, f), x = O(12, 16, f), y = O(10, 12, f), z = O(8, 10, f);
  return /* @__PURE__ */ M(
    "label",
    {
      className: `ui-checkbox ${d ? "ui-checkbox-pill rounded-lg" : ""} ${c === "danger" ? "ui-checkbox-tone-danger" : ""} ${t ? "ui-disabled" : ""} ${o}`,
      style: { display: u ? "flex" : "inline-flex", alignItems: "center", gap: z, padding: d ? `${y}px ${x}px` : void 0 },
      onClick: (C) => C.stopPropagation(),
      ...l ? { "data-theme": l } : {},
      children: [
        /* @__PURE__ */ p(
          "input",
          {
            type: "checkbox",
            id: i,
            checked: n,
            disabled: t,
            onChange: (C) => e(C.target.checked),
            className: "sr-only"
          }
        ),
        d ? /* @__PURE__ */ p(ai, { checked: n, size: h, tone: c }) : /* @__PURE__ */ p("span", { className: "ui-checkbox-box", style: { width: h, height: h }, "aria-hidden": !0, children: n && /* @__PURE__ */ p("svg", { viewBox: "0 0 12 12", fill: "none", style: { width: m, height: m }, "aria-hidden": !0, children: /* @__PURE__ */ p("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ p("span", { className: `ui-checkbox-label ${s}`, style: { fontSize: g }, children: r })
      ]
    }
  );
}
const zi = "transition-[grid-template-columns] ease-out duration-150 group-hover:duration-200 motion-reduce:transition-none", Ql = "group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] group-data-[state=open]:grid-cols-[1fr]", Zl = "group-hover:grid-cols-[0fr] group-focus-visible:grid-cols-[0fr] group-data-[state=open]:grid-cols-[0fr]", ea = "group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[state=open]:opacity-100";
function ta({ icon: n, collapse: e = !1, iconWithLabel: t = !0, active: r = !1, gap: i = 6, children: o }) {
  const s = !!e && !!n, l = s && !t, a = !!n && (t || s);
  return s ? /* @__PURE__ */ M(Xe, { children: [
    a && (l ? /* @__PURE__ */ p("span", { "data-kit-icon": !0, className: `grid min-w-0 ${zi} ${r ? "grid-cols-[0fr]" : `grid-cols-[1fr] ${Zl}`}`, children: /* @__PURE__ */ p("span", { className: "inline-flex min-w-0 items-center overflow-hidden", children: n }) }) : /* @__PURE__ */ p("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: n })),
    /* @__PURE__ */ p("span", { "data-kit-label": !0, className: `grid min-w-0 ${zi} ${r ? "grid-cols-[1fr]" : `grid-cols-[0fr] ${Ql}`}`, children: /* @__PURE__ */ p("span", { className: "min-w-0 overflow-hidden", children: /* @__PURE__ */ p(
      "span",
      {
        className: `flex min-w-0 items-center whitespace-nowrap transition-[opacity,padding-left] duration-100 group-hover:duration-150 motion-reduce:transition-none ${r ? "opacity-100" : `opacity-0 ${ea}`} ${l ? `pl-[var(--kit-collapse-gap)] group-hover:pl-0! group-focus-visible:pl-0! group-data-[state=open]:pl-0! ${r ? "pl-0!" : ""}` : ""}`,
        style: l ? { "--kit-collapse-gap": `${i}px` } : { paddingLeft: i },
        children: o
      }
    ) }) })
  ] }) : /* @__PURE__ */ M(Xe, { children: [
    a && /* @__PURE__ */ p("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: n }),
    o
  ] });
}
const Rf = {
  light: { plain: "bg-zinc-950", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" },
  dark: { plain: "bg-white", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" }
};
function st({
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
  children: d,
  ...f
}) {
  const h = It(), m = e ?? (h == null ? void 0 : h.mode) ?? "light", g = t ?? Jl(h), x = Bt({ px: 10, py: 7, fs: 12 }, { px: 14, py: 9, fs: 14 }), y = Bt({ px: 12, py: 7, fs: 12 }, { px: 16, py: 9, fs: 14 }), z = Bt({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), A = "", C = "", w = "inline-flex items-center rounded font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed", I = {
    light: {
      active: "text-white",
      inactive: "text-zinc-500 hover:text-zinc-900"
    },
    dark: {
      active: "text-zinc-900",
      inactive: "text-zinc-400 hover:text-zinc-200"
    }
  }, F = {
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
  }, S = {
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
  }, G = {
    light: {
      subtle: { base: `${A} text-zinc-600 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-900" },
      primary: { base: `${C} bg-zinc-900 hover:bg-zinc-800 text-white`, open: "bg-zinc-800!" },
      /* The outline is painted as an INSET SHADOW, not a border: the button
         keeps `subtle`'s exact box (same padding + height), so the two can sit
         side by side in a toolbar without a 2px step. */
      outline: {
        base: `${A} text-zinc-700 shadow-[inset_0_0_0_1px_var(--ui-border-strong)] hover:bg-[var(--ui-btn-hover-bg)] hover:text-zinc-900`,
        open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-900"
      },
      "danger-ghost": { base: `${A} text-rose-600 hover:bg-rose-50`, open: "bg-rose-50!" }
    },
    dark: {
      subtle: { base: `${A} text-zinc-400 hover:text-zinc-200 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-200" },
      primary: { base: `${C} bg-zinc-800 hover:bg-zinc-700 text-white`, open: "bg-zinc-700!" },
      outline: {
        base: `${A} text-zinc-300 shadow-[inset_0_0_0_1px_var(--ui-border-strong)] hover:bg-[var(--ui-btn-hover-bg)] hover:text-zinc-100`,
        open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-100"
      },
      "danger-ghost": { base: `${A} text-red-400 hover:bg-rose-950/40`, open: "bg-rose-950/40!" }
    }
  }, E = {
    blue: { base: `${C} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" },
    emerald: { base: `${C} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" }
  }, B = f["data-state"] === "open", D = G[m][n], V = n === "primary" ? y : n.startsWith("tab") ? z : x, K = ze ? { padding: "8px 12px", fontSize: "14px", lineHeight: "20px", border: "1px solid transparent" } : { padding: "6px 8px", fontSize: "12px", lineHeight: "16px", border: "1px solid transparent" }, T = O(6, 8, Ce()), k = O(28, 40, Ce()), X = g === "emerald" ? "emerald" : g ? "blue" : null, le = "bg-[var(--ui-btn-active-bg)]! text-[color:var(--ui-btn-active-text)]!";
  let ae;
  if (n === "tab") {
    const R = I[m];
    ae = r ? X ? F[X].active : R.active : X ? F[X][m === "light" ? "inactiveLight" : "inactiveDark"] : R.inactive;
  } else if (n === "tab-header")
    ae = `${X ? r ? S[X].active : S[X].inactive : r ? $.active : $.inactive} ${B ? X ? S[X].open : $.open : ""}`;
  else if (ae = `${D.base} ${B ? D.open : ""}`, r && (ae = `${ae} ${le}`), n === "primary" && X) {
    const R = E[X];
    ae = B ? `${R.base} ${R.open}` : R.base;
  }
  const J = !!l && !!s && !i, j = i ? { width: k, height: k, padding: 0, gap: 0 } : o === "minimal" ? { ...K, gap: J ? 0 : T } : { ...V, gap: J ? 0 : T };
  return /* @__PURE__ */ p(
    "button",
    {
      type: u,
      "data-mode": m,
      "data-accent": h == null ? void 0 : h.accent,
      className: `${w} ${i ? "justify-center" : ""} ${J ? "group" : ""} ${ae} ${c}`,
      style: j,
      ...f,
      children: i ? d : /* @__PURE__ */ p(ta, { icon: s, collapse: l, iconWithLabel: a, active: r, gap: T, children: d })
    }
  );
}
function lr({
  checked: n,
  indeterminate: e = !1,
  disabled: t = !1,
  indicator: r = "box",
  size: i,
  className: o = ""
}) {
  const s = Ce(), l = i ?? O(14, 18, s);
  return r === "check" ? /* @__PURE__ */ p(
    "span",
    {
      "data-selection-check": "check",
      className: `inline-flex shrink-0 items-center justify-center ${t ? "opacity-40" : ""} ${o}`,
      style: { width: l, height: l },
      "aria-hidden": !0,
      children: e ? /* @__PURE__ */ p(il, { size: l, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : n ? /* @__PURE__ */ p(Pn, { size: l, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : null
    }
  ) : /* @__PURE__ */ p(
    "span",
    {
      "data-selection-check": "box",
      className: `inline-flex shrink-0 items-center justify-center ${t ? "opacity-40" : ""} ${o}`,
      "aria-hidden": !0,
      children: /* @__PURE__ */ p(ai, { checked: n, indeterminate: e, size: l })
    }
  );
}
function Ao({
  count: n,
  max: e,
  hiddenCount: t = 0,
  onClear: r,
  hero: i,
  clear: o = !0,
  theme: s,
  className: l = ""
}) {
  const a = Ce(), c = O(10, 14, a), u = O(6, 9, a), d = O(11, 13, a), f = s === "light" ? "light" : "dark", h = s === "emerald" ? "emerald" : s === "blue" ? !0 : void 0, m = e !== void 0 ? `${n} of ${e} selected` : `${n} selected`;
  return /* @__PURE__ */ M(
    "div",
    {
      "data-selection-footer": !0,
      className: `shrink-0 flex items-center gap-2 border-t border-[color:var(--ui-menu-border)] ${l}`,
      style: {
        padding: `${u}px ${c}px`,
        background: "var(--ui-menu-bg)",
        backdropFilter: "blur(8px)"
      },
      children: [
        /* @__PURE__ */ M(
          "span",
          {
            "data-selection-count": !0,
            className: "min-w-0 flex-1 truncate tabular-nums text-[color:var(--ui-text-muted)]",
            style: { fontSize: d },
            children: [
              m,
              t > 0 && /* @__PURE__ */ M("span", { className: "text-[color:var(--ui-text-faint)]", children: [
                " · ",
                t,
                " hidden by filter"
              ] })
            ]
          }
        ),
        o && /* @__PURE__ */ p(
          st,
          {
            variant: "subtle",
            size: "minimal",
            theme: f,
            cloud: h,
            onClick: r,
            disabled: n === 0,
            "data-selection-clear": !0,
            children: "Clear"
          }
        ),
        i && /* @__PURE__ */ p(
          st,
          {
            variant: "primary",
            size: "minimal",
            theme: f,
            cloud: h,
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
const ci = Ft("dark"), zo = () => Ht(ci);
function ui() {
  const n = Ce();
  return {
    padding: `${O(8, 12, n)}px ${O(12, 16, n)}px`,
    fontSize: `${O(12, 14, n)}px`,
    lineHeight: `${O(18, 22, n)}px`
  };
}
function $o() {
  const n = Ce();
  return {
    padding: `${O(6, 9, n)}px ${O(12, 16, n)}px ${O(2, 3, n)}px`,
    fontSize: `${O(10, 11, n)}px`,
    lineHeight: `${O(14, 16, n)}px`
  };
}
const na = (n) => n ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", $i = (n) => n ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", ra = (n) => n ? "text-xs" : "text-[10px]";
function br(n) {
  const e = ze && go() > 0;
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
    headerPad: $i(e),
    headerText: `${$i(e)} font-semibold uppercase tracking-wider ${ra(e)} ui-label`,
    // Item padding
    itemPad: na(e),
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
function Do(n) {
  const e = [];
  return Le.Children.forEach(n, (t) => {
    if (typeof t == "string" || typeof t == "number")
      e.push(String(t));
    else if (Le.isValidElement(t)) {
      const r = t.props.children;
      (typeof r == "string" || typeof r == "number") && e.push(String(r));
    }
  }), e.join(" ").trim();
}
const di = Ft({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), _n = Ft(null), fi = () => Ht(_n), Oo = Ft({ query: "", setQuery: () => {
} }), ia = () => Ht(Oo), oa = () => !0;
function vr(n) {
  const e = N([]), [t, r] = ne(-1), [i, o] = ne(!1), [s, l] = ne(0), a = ie((f) => (e.current = [...e.current, f], l((h) => h + 1), () => {
    e.current = e.current.filter((h) => h !== f), l((h) => h + 1);
  }), []), c = ie((f, h) => {
    r(f), o(h === "pointer");
  }, []), u = ie(() => {
    o((f) => f && (r(-1), !1));
  }, []);
  return Ge(() => ({
    /* A `filter` (the searchable query) narrows the exposed items — hidden
       rows drop out of indexing entirely, so the single highlight, the
       arrows and the typeahead all operate on the VISIBLE set only. */
    items: n ? e.current.filter(n) : e.current,
    /* The unfiltered registration order — multi-select commits in catalogue
       order even when the query hides some selected rows. */
    allItems: e.current,
    highlightedIndex: t,
    pointerDriven: i,
    register: a,
    setHighlighted: c,
    pointerLeave: u
  }), [t, i, s, a, c, u, n]);
}
function Lo(n) {
  const e = fi(), t = N(e);
  t.current = e;
  const r = N(null);
  oe(() => {
    var a, c;
    const l = { label: n.label(), activate: n.activate, group: ((a = n.group) == null ? void 0 : a.trim()) || void 0, itemId: n.itemId };
    return r.current = l, (c = t.current) == null ? void 0 : c.register(l);
  }, []);
  const i = e && r.current ? e.items.indexOf(r.current) : -1, o = !!e && !n.disabled && i >= 0 && i === e.highlightedIndex;
  return { api: e, myIndex: i, highlighted: o, setPointer: (l) => {
    !n.disabled && e && l >= 0 && e.setHighlighted(l, "pointer");
  } };
}
function hi(n, e, t, r) {
  const i = N(-1);
  i.current = e.highlightedIndex;
  const o = N(e);
  o.current = e;
  const s = N(n);
  s.current = n;
  const l = N(r);
  l.current = r;
  const a = N({ text: "", time: 0 }), c = N(!1);
  c.current || (c.current = !0, t.current = (u) => {
    var g, x, y, z, A, C;
    if (!s.current) return;
    const d = (g = l.current) == null ? void 0 : g.onSelectAll;
    if (d && (u.metaKey || u.ctrlKey) && u.key.toLowerCase() === "a") {
      u.preventDefault(), u.stopImmediatePropagation(), d();
      return;
    }
    const f = u.target;
    if (!!f && !!f.closest("input, textarea, [contenteditable]") && (u.key.length === 1 || u.key === "Enter" || u.key === "Escape")) {
      const w = (y = (x = l.current) == null ? void 0 : x.onFieldKey) == null ? void 0 : y.call(x, u);
      (!!((z = l.current) != null && z.onFieldKey) || o.current.items.length > 0) && (u.stopImmediatePropagation(), w && u.preventDefault());
      return;
    }
    const m = o.current.items;
    if (m.length !== 0) {
      if (u.key === "ArrowDown" || u.key === "ArrowUp") {
        u.preventDefault(), u.stopImmediatePropagation();
        const w = u.key === "ArrowDown" ? 1 : -1, I = (i.current + w + m.length) % m.length;
        o.current.setHighlighted(I, "keyboard");
      } else if (u.key === "ArrowRight") {
        u.preventDefault(), u.stopImmediatePropagation();
        const w = i.current;
        w >= 0 && w < m.length && m[w].submenu && m[w].activate();
      } else if (u.key === "ArrowLeft")
        u.preventDefault(), u.stopImmediatePropagation(), (C = (A = l.current) == null ? void 0 : A.onCloseSub) == null || C.call(A);
      else if (u.key === "Enter" || u.key === " ") {
        u.preventDefault(), u.stopImmediatePropagation();
        const w = i.current;
        w >= 0 && w < m.length && m[w].activate();
      } else if (u.key.length === 1 && !u.ctrlKey && !u.metaKey && !u.altKey) {
        u.preventDefault(), u.stopImmediatePropagation();
        const w = Date.now(), I = (w - a.current.time > 500 ? "" : a.current.text) + u.key.toLowerCase();
        if (a.current = { text: I, time: w }, !I) return;
        const F = i.current + 1;
        for (let $ = 0; $ < m.length; $++) {
          const S = (F + $) % m.length;
          if (m[S].label.toLowerCase().startsWith(I)) {
            o.current.setHighlighted(S, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function pi(n, e, t, r, i, o, s) {
  const l = N(e);
  l.current = e;
  const a = N(n);
  a.current = n;
  const c = N(i);
  c.current = i;
  const u = N(s == null ? void 0 : s.ignoreFields);
  u.current = s == null ? void 0 : s.ignoreFields;
  const d = N(s == null ? void 0 : s.selectAll);
  d.current = s == null ? void 0 : s.selectAll;
  const f = N(!1);
  f.current || (f.current = !0, o.current = (h) => {
    if (!a.current || c.current) return;
    const m = r.current;
    if (m && m.contains(h.target)) return;
    if (d.current && (h.metaKey || h.ctrlKey) && h.key.toLowerCase() === "a") {
      h.preventDefault(), h.stopImmediatePropagation(), t.current(h);
      return;
    }
    if (u.current) {
      const x = h.target;
      if (x && x.closest("input, textarea, [contenteditable]")) return;
    }
    l.current.items.length === 0 || !(h.key === "ArrowDown" || h.key === "ArrowUp" || h.key === "ArrowLeft" || h.key === "ArrowRight" || h.key === "Enter" || h.key === " " || h.key.length === 1 && !h.ctrlKey && !h.metaKey && !h.altKey) || (h.preventDefault(), h.stopImmediatePropagation(), t.current(h));
  });
}
function mi(n, e) {
  const t = N(n);
  t.current = n;
  const r = N(!1);
  r.current || (r.current = !0, e.current = (i) => {
    if (!t.current) return;
    const o = i.currentTarget, s = o.querySelector("[data-menu-items]") ?? o;
    s.scrollHeight > s.clientHeight && (i.preventDefault(), s.scrollTop += i.deltaY);
  });
}
function wr({
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
  initialHighlightIndex: d,
  searchable: f = !1,
  searchPlaceholder: h,
  searchFilter: m,
  searchValue: g,
  onSearchValueChange: x,
  multiple: y
}) {
  const z = It(), A = To(s, z), C = A.theme, [w, I] = ne([]), [F, $] = ne(null), S = xn(), G = ni(), E = N(null), B = N(null), D = N(n);
  D.current = n;
  const [V, K] = ne(n), [T, k] = ne(""), X = f && g !== void 0, le = X ? g : T, ae = X ? x ?? (() => {
  }) : k, [J, j] = ne(!1), R = X && !J ? "" : le, _ = N(null), q = Ce(), W = {
    padding: `${O(8, 12, q)}px ${O(12, 16, q)}px`,
    fontSize: `${O(12, 14, q)}px`
  }, [fe, ue] = ne(0), Te = f && !X;
  oe(() => {
    var Ue;
    if (!Te || !n) return;
    const P = (Ue = B.current) == null ? void 0 : Ue.querySelector("[data-menu-items]");
    if (!P) return;
    const te = () => ue(P.offsetWidth - P.clientWidth);
    te();
    const se = new ResizeObserver(te);
    return se.observe(P), () => se.disconnect();
  }, [n, Te, le]);
  const Q = Ge(() => {
    if (!f) return;
    const P = R.trim().toLowerCase();
    return P ? (te) => {
      var se;
      return m ? m(P, te.label, te.group) : te.label.toLowerCase().includes(P) || (((se = te.group) == null ? void 0 : se.toLowerCase().includes(P)) ?? !1);
    } : oa;
  }, [R, f, m]), U = vr(Q), $e = f && R.trim() !== "" && U.items.length === 0, me = !!y, Je = U.allItems.map((P) => P.itemId).filter((P) => !!P), xe = U.items.map((P) => P.itemId).filter((P) => !!P), ce = Mo({
    mode: "draft",
    selectedIds: (y == null ? void 0 : y.selectedIds) ?? Io,
    itemIds: Je,
    visibleIds: xe,
    max: y == null ? void 0 : y.max,
    disabledIds: y == null ? void 0 : y.disabledIds,
    indicator: y == null ? void 0 : y.indicator,
    onCommit: y == null ? void 0 : y.onCommit
  }), Me = N(ce.reset);
  Me.current = ce.reset;
  const ve = typeof (y == null ? void 0 : y.commitLabel) == "function" ? y.commitLabel(ce.count) : (y == null ? void 0 : y.commitLabel) ?? `Select ${ce.count}`;
  oe(() => {
    if (n)
      return K(!0), X || k(""), j(!1), U.setHighlighted(d ?? -1, "keyboard"), Me.current(), No(() => {
        t == null || t(!1), e == null || e();
      });
    I([]), j(!1);
  }, [n, d, t, e]), oe(() => {
    if (!n || !G) return;
    const P = (te) => {
      if (te.pointerType !== "touch") return;
      const se = te.target;
      se && (B.current && B.current.contains(se) || E.current && E.current.contains(se) || se instanceof Element && se.closest("[data-radix-menu-content]") || (t == null || t(!1), e == null || e()));
    };
    return G.addEventListener("pointerdown", P, { capture: !0 }), () => G.removeEventListener("pointerdown", P, { capture: !0 });
  }, [n, G, t, e]);
  const De = ie(() => {
    const P = E.current;
    if (!P) return null;
    const te = P.getBoundingClientRect();
    return { left: te.left, top: te.top, width: te.width, height: te.height };
  }, []), Fe = xr({
    visible: n,
    morph: a,
    anchor: De,
    onClosed: () => K(!1)
  }), He = N(() => {
  }), jt = N(() => {
  }), Ve = N(() => {
  }), Wt = ie((P) => {
    if (P.key === "Enter") {
      const te = U.highlightedIndex, se = U.items[te >= 0 ? te : 0];
      return se == null || se.activate(), !0;
    }
    return P.key === "Escape" ? (t == null || t(!1), e == null || e(), !0) : !1;
  }, [U, t, e]);
  hi(n && w.length === 0, U, He, {
    onFieldKey: Wt,
    onSelectAll: me ? () => ce.setAll(!0) : void 0
  }), mi(n, jt), pi(n, U, He, B, w.length > 0, Ve, {
    ignoreFields: X,
    selectAll: me
  });
  const kt = N(null), Oe = ie((P) => {
    var te;
    if (P) {
      P.addEventListener("keydown", He.current, { capture: !0 }), P.addEventListener("wheel", jt.current, { passive: !1 });
      const se = P.ownerDocument;
      kt.current = se, se.addEventListener("keydown", Ve.current, { capture: !0 }), At(!0);
    } else
      (te = kt.current) == null || te.removeEventListener("keydown", Ve.current, { capture: !0 }), kt.current = null, At(!1);
    B.current = P, Fe(P);
  }, [Fe]), [et, en] = ne({ top: 0, left: 0, maxH: ko, side: "bottom", ready: !1 }), [bt, tn] = ne(0), [nn, At] = ne(!1);
  oe(() => {
    n && E.current && tn(E.current.getBoundingClientRect().width);
  }, [n]), So({
    anchorRef: E,
    panelRef: B,
    open: n && nn,
    maxHeight: u,
    onPosition: en
  }), oe(() => {
    var P;
    if (et.ready && n) {
      if (f) {
        (P = _.current ?? E.current) == null || P.focus();
        return;
      }
      const te = B.current;
      te && te.ownerDocument.activeElement !== te && !te.contains(te.ownerDocument.activeElement) && te.focus();
    }
  }, [et.ready, n, f]), oe(() => {
    if (!n || !f) return;
    if (U.items.length === 0) {
      U.highlightedIndex !== -1 && U.setHighlighted(-1, "keyboard");
      return;
    }
    const P = U.highlightedIndex;
    (P < 0 || P >= U.items.length) && U.setHighlighted(0, "keyboard");
  }, [n, le, f, U.items.length]), ft(() => {
    var te;
    if (!n || U.highlightedIndex < 0 || U.pointerDriven) return;
    const P = (te = B.current) == null ? void 0 : te.querySelector(`[data-ei="${U.highlightedIndex}"]`);
    pn(P, "nearest", B.current);
  }, [n, U.highlightedIndex, U.pointerDriven]);
  const St = ie((P) => {
    !P && !D.current || (!P && we.current && (tt.current = !0), t ? t(P) : P || e == null || e());
  }, [t, e]), mt = N(V);
  mt.current = V;
  const we = N(!1), tt = N(!1), Nt = ie(() => {
    if (!D.current && mt.current) {
      if (tt.current) {
        tt.current = !1, we.current = !1;
        return;
      }
      t == null || t(!0);
    }
  }, [t]), at = Le.isValidElement(r) ? r : null, nt = at ? Le.cloneElement(at, {
    ref: (P) => {
      E.current = P;
    },
    /* Radix's trigger primitive merges `type="button"` onto the child; a
       text field trigger-as-search must stay a text field. */
    ...X ? { type: at.props.type ?? "text" } : {},
    onPointerDown: (P) => {
      var te;
      we.current = !0, tt.current = !1, X && (P.preventDefault(), D.current || t == null || t(!0), (te = E.current) == null || te.focus());
    },
    /* Space is a printable search character, but Radix treats it as the
       trigger's open/close key. Keep it in the field. */
    onKeyDownCapture: (P) => {
      X && P.key === " " && P.stopPropagation();
    },
    onClick: (P) => {
      var te, se;
      (se = (te = at.props).onClick) == null || se.call(te, P), Nt();
    },
    /* Combobox mode (externalSearch): the trigger field IS the search box,
       so it also drives the menu's keyboard — arrows move the single
       highlight, Enter activates the highlighted (or first visible) row,
       and a printable key flips the filter live (the committed value was
       just showing the full list until the first keystroke). */
    onKeyDown: (P) => {
      var te, se;
      if ((se = (te = at.props).onKeyDown) == null || se.call(te, P), !(!X || !D.current)) {
        if (P.key.length === 1 && !P.ctrlKey && !P.metaKey && !P.altKey)
          j(!0);
        else if (P.key === "ArrowDown" || P.key === "ArrowUp") {
          P.preventDefault();
          const Ue = U.items;
          if (Ue.length === 0) return;
          const ut = P.key === "ArrowDown" ? 1 : -1, vn = (U.highlightedIndex + ut + Ue.length) % Ue.length;
          U.setHighlighted(vn, "keyboard");
        } else if (P.key === "Enter") {
          P.preventDefault();
          const Ue = U.highlightedIndex, ut = U.items[Ue >= 0 ? Ue : 0];
          ut == null || ut.activate();
        }
      }
    }
  }) : r, Ye = /* @__PURE__ */ M("div", { "data-menu-search-empty": !0, className: "px-3 py-3 text-center", children: [
    /* @__PURE__ */ M("div", { className: "text-xs font-medium text-[color:var(--ui-text-muted)]", children: [
      "No matches for “",
      R.trim(),
      "”"
    ] }),
    /* @__PURE__ */ p("div", { className: "mt-0.5 text-[10px] text-[color:var(--ui-text-faint)]", children: "Try a different search." })
  ] }), ct = Te || me, vt = `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] min-w-0 ${ct ? "overflow-hidden" : "overflow-y-auto scrollbar-custom"}`;
  return /* @__PURE__ */ M(ye.Root, { open: n || V, onOpenChange: St, modal: !1, children: [
    /* @__PURE__ */ p(ye.Trigger, { asChild: !0, children: nt }),
    /* @__PURE__ */ p(ye.Portal, { container: S ?? void 0, children: /* @__PURE__ */ p(ci.Provider, { value: C, children: /* @__PURE__ */ p(di.Provider, { value: { chain: w, setChain: I, morph: a, keyboardOpened: F, setKeyboardOpened: $ }, children: /* @__PURE__ */ p(_n.Provider, { value: U, children: /* @__PURE__ */ p(Oo.Provider, { value: { query: le, setQuery: ae }, children: /* @__PURE__ */ p(Ro.Provider, { value: me ? ce : null, children: /* @__PURE__ */ M(
      ye.Content,
      {
        ref: Oe,
        ...A.attrs,
        "data-ui-fixed": !0,
        className: `${vt} ${o || ""} ${c || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: et.left,
          top: et.top,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: o ? void 0 : bt || void 0,
          maxHeight: et.maxH,
          visibility: et.ready ? "visible" : "hidden"
        },
        onPointerLeave: U.pointerLeave,
        onFocus: X ? (P) => {
          if (P.target !== P.currentTarget) return;
          const te = E.current;
          te && te.ownerDocument.activeElement !== te && te.focus();
        } : void 0,
        onCloseAutoFocus: X ? (P) => {
          var te;
          P.preventDefault(), (te = E.current) == null || te.focus();
        } : void 0,
        children: [
          Te && /* @__PURE__ */ p("div", { className: "shrink-0 px-0 pt-1 pb-1", style: { paddingRight: fe }, children: /* @__PURE__ */ M("div", { "data-menu-search": !0, className: "ui-item ui-item-highlighted flex items-center gap-2 rounded", style: W, children: [
            /* @__PURE__ */ p(Jt, { className: "w-3.5 h-3.5 shrink-0 ui-icon" }),
            /* @__PURE__ */ p(
              "input",
              {
                ref: _,
                value: le,
                onChange: (P) => ae(P.target.value),
                placeholder: h ?? "Search…",
                className: "flex-1 min-w-0 bg-transparent outline-none text-current placeholder:text-current placeholder:opacity-50 cursor-text"
              }
            ),
            le ? /* @__PURE__ */ p(
              "button",
              {
                type: "button",
                tabIndex: -1,
                "aria-label": "Clear search",
                className: "shrink-0 ui-icon-btn rounded flex items-center justify-center p-1 -m-1",
                onPointerDown: (P) => P.stopPropagation(),
                onClick: () => {
                  var P;
                  ae(""), (P = _.current) == null || P.focus();
                },
                children: /* @__PURE__ */ p(Ut, { className: "w-3.5 h-3.5" })
              }
            ) : /* @__PURE__ */ p("span", { className: "w-3.5 h-3.5 shrink-0" })
          ] }) }),
          ct ? /* @__PURE__ */ M("div", { "data-menu-items": !0, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: [
            l,
            $e && Ye
          ] }) : /* @__PURE__ */ M(Xe, { children: [
            l,
            $e && Ye
          ] }),
          me && (y == null ? void 0 : y.footer) !== !1 && /* @__PURE__ */ p(
            Ao,
            {
              count: ce.count,
              max: y == null ? void 0 : y.max,
              hiddenCount: (y == null ? void 0 : y.hiddenNote) === !1 ? 0 : ce.hiddenCount,
              clear: (y == null ? void 0 : y.clear) !== !1,
              theme: C,
              onClear: ce.clear,
              hero: {
                label: ve,
                onClick: () => {
                  ce.commit(), St(!1);
                },
                disabled: ce.count === 0
              }
            }
          )
        ]
      }
    ) }) }) }) }) }) })
  ] });
}
function If({
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
  onReset: d,
  onTrash: f,
  closeOnSelect: h,
  readOnly: m = !1,
  theme: g,
  align: x,
  label: y,
  header: z,
  itemLabel: A,
  trigger: C,
  minItems: w = 1,
  itemRender: I,
  morph: F = !0,
  contentClassName: $
}) {
  const S = br(), G = ui(), [E, B] = ne(null), [D, V] = ne(""), K = N(D);
  K.current = D;
  const T = N(null), k = N(null), X = Eo({
    open: n,
    scroller: () => k.current,
    row: () => {
      var R;
      return ((R = k.current) == null ? void 0 : R.querySelector('[data-active="1"]')) ?? null;
    }
  });
  oe(() => {
    var q;
    if (!n) return;
    const R = (W) => {
      var me, Je, xe;
      const fe = W.target;
      if (fe && fe.closest("input, textarea, [contenteditable]")) {
        E && fe === T.current && (W.key === "Enter" ? (W.preventDefault(), W.stopImmediatePropagation(), ae()) : W.key === "Escape" && (W.preventDefault(), W.stopImmediatePropagation(), J()));
        return;
      }
      const ue = (me = k.current) == null ? void 0 : me.closest(".ui-menu");
      if (!ue || !ue.contains(W.target)) return;
      const Te = ue.ownerDocument, Q = [...ue.querySelectorAll('[data-active] > [role="menuitem"]:first-child')], U = [...ue.querySelectorAll('div:last-child > [role="menuitem"]')], $e = [...Q, ...U];
      if (W.key === "ArrowDown" || W.key === "ArrowUp") {
        W.preventDefault(), W.stopImmediatePropagation();
        const ce = Te.activeElement;
        let Me = ce ? $e.indexOf(ce) : -1;
        if (Me < 0 && ce) {
          const Fe = ce.closest("[data-active]"), He = Fe == null ? void 0 : Fe.querySelector('[role="menuitem"]:first-child');
          He && (Me = Q.indexOf(He));
        }
        const ve = W.key === "ArrowDown" ? 1 : -1, De = Me < 0 ? ve === 1 ? 0 : $e.length - 1 : (Me + ve + $e.length) % $e.length;
        (Je = $e[De]) == null || Je.focus({ preventScroll: !0 });
        return;
      }
      if (W.key === "ArrowLeft" || W.key === "ArrowRight") {
        const ce = Te.activeElement, Me = ce == null ? void 0 : ce.closest("[data-active]");
        if (!Me) return;
        W.preventDefault(), W.stopImmediatePropagation();
        const ve = [...Me.querySelectorAll('[role="menuitem"]')].slice(1);
        if (ve.length === 0) return;
        const De = ce && Me.contains(ce) ? ve.indexOf(ce) : -1, Fe = W.key === "ArrowRight" ? 1 : -1, He = De < 0 ? 0 : (De + Fe + ve.length) % ve.length;
        (xe = ve[He]) == null || xe.focus({ preventScroll: !0 });
        return;
      }
    }, _ = ((q = k.current) == null ? void 0 : q.ownerDocument) ?? null;
    return _ == null || _.addEventListener("keydown", R, { capture: !0 }), () => _ == null ? void 0 : _.removeEventListener("keydown", R, { capture: !0 });
  }, [n, E]), oe(() => {
    if (!E) return;
    const R = t.find((fe) => fe.id === E);
    R && !D && V(R.name);
    const _ = requestAnimationFrame(() => {
      const fe = T.current;
      fe && (fe.focus(), fe.select());
    });
    let q = 0;
    const W = window.setInterval(() => {
      const fe = T.current;
      if (q++, !fe || q > 12) {
        clearInterval(W);
        return;
      }
      fe.ownerDocument.activeElement !== fe && (fe.focus(), fe.select());
    }, 50);
    return () => {
      cancelAnimationFrame(_), clearInterval(W);
    };
  }, [E]), oe(() => {
    if (E) {
      const R = t.find((_) => _.id === E);
      R && !D && V(R.name);
    }
  }, [E, t]);
  const le = (R, _) => {
    B(R), V(_);
  }, ae = () => {
    E && K.current.trim() && o(E, K.current.trim()), B(null);
  }, J = () => {
    B(null);
  }, j = A || z.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ M(wr, { open: n, onOpenChange: (R) => {
    R ? (B(null), V("")) : (E && D.trim() && o(E, D.trim()), B(null), V("")), (!R || !m) && e(R);
  }, width: "w-80", theme: g, align: x, trigger: C, morph: F, contentClassName: $, children: [
    /* @__PURE__ */ p("div", { className: `shrink-0 ${S.headerText}`, children: z }),
    /* @__PURE__ */ p("div", { ref: k, onPointerEnter: X.engage, onPointerDown: X.engage, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: t.map((R) => {
      const _ = R.id === r, q = E === R.id;
      return /* @__PURE__ */ p("div", { "data-active": _ ? "1" : void 0, className: `scroll-my-4 flex items-center gap-1 rounded ${_ || q ? S.rowActiveBg : S.rowHoverBg} ${E && !q ? "opacity-40 pointer-events-none" : ""}`, children: q ? /* @__PURE__ */ M(Xe, { children: [
        /* @__PURE__ */ p("div", { className: "flex-1 min-w-0 flex items-center", children: /* @__PURE__ */ p(
          "input",
          {
            ref: T,
            autoFocus: !0,
            value: D,
            onChange: (W) => V(W.target.value),
            onKeyDown: (W) => {
              W.key === "Enter" && (W.preventDefault(), W.stopPropagation(), ae()), W.key === "Escape" && (W.preventDefault(), W.stopPropagation(), J());
            },
            className: "w-full outline-none bg-transparent placeholder:text-current placeholder:opacity-50",
            style: G
          }
        ) }),
        /* @__PURE__ */ p(
          ye.Item,
          {
            className: `shrink-0 ${S.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${S.editConfirm}`,
            onSelect: (W) => {
              W.preventDefault(), ae();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ p(Pn, { className: S.btnIcon })
          }
        ),
        /* @__PURE__ */ p(
          ye.Item,
          {
            className: `shrink-0 ${S.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${S.editCancel}`,
            onSelect: (W) => {
              W.preventDefault(), J();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ p(Ut, { className: S.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ M(Xe, { children: [
        /* @__PURE__ */ p(
          ye.Item,
          {
            style: G,
            className: `flex-1 min-w-0 rounded outline-none cursor-pointer flex items-center ${S.rowText} ${_ ? "" : S.rowTextHover}`,
            onSelect: h ? () => {
              i(R.id);
            } : (W) => {
              W.preventDefault(), i(R.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ p("span", { className: `truncate ${_ ? S.rowActiveText : ""}`, children: I ? I(R) : R.name })
          }
        ),
        /* @__PURE__ */ p(
          ye.Item,
          {
            className: `shrink-0 ${S.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${_ ? S.btnActive : S.btnBase}`,
            onSelect: (W) => {
              W.preventDefault(), le(R.id, R.name);
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: /* @__PURE__ */ p(ol, { className: S.btnIcon })
          }
        ),
        /* @__PURE__ */ p(
          ye.Item,
          {
            className: `shrink-0 ${S.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${_ ? S.btnActive : S.btnBase}`,
            onSelect: (W) => {
              W.preventDefault();
              const fe = s(R.id);
              fe && le(fe, `${R.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: /* @__PURE__ */ p(uo, { className: S.btnIcon })
          }
        ),
        /* @__PURE__ */ p(
          ye.Item,
          {
            className: `shrink-0 ${S.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${t.length <= w ? S.btnDisabled : _ ? S.btnDangerActive : S.btnDanger}`,
            onSelect: (W) => {
              W.preventDefault(), l(R.id);
            },
            onTouchStart: () => {
            },
            disabled: m || t.length <= w,
            children: /* @__PURE__ */ p(_r, { className: S.btnIcon })
          }
        )
      ] }) }, R.id);
    }) }),
    /* @__PURE__ */ M("div", { className: `shrink-0 ${E ? "opacity-40 pointer-events-none" : ""}`, children: [
      d && /* @__PURE__ */ M(Xe, { children: [
        /* @__PURE__ */ p(ye.Separator, { className: S.separator }),
        /* @__PURE__ */ M(
          ye.Item,
          {
            className: `w-full text-left ${S.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${S.itemDefault} ui-row`,
            onSelect: (R) => {
              R.preventDefault(), d();
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: [
              /* @__PURE__ */ p(fo, { className: `${S.btnIcon} ${S.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (a || c || u || f) && /* @__PURE__ */ p(ye.Separator, { className: S.separator }),
      a && /* @__PURE__ */ M(
        ye.Item,
        {
          className: `w-full text-left ${S.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${S.itemDefault} ui-row`,
          onSelect: (R) => {
            R.preventDefault();
            const _ = a();
            _ && le(_, "");
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ p(ei, { className: `${S.btnIcon} ${S.icon}` }),
            "New ",
            j
          ]
        }
      ),
      c && /* @__PURE__ */ M(
        ye.Item,
        {
          className: `w-full text-left ${S.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${S.itemDefault} ui-row`,
          onSelect: (R) => {
            R.preventDefault(), c();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ M("svg", { className: `${S.btnIcon} ${S.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ p("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ p("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ p("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      u && /* @__PURE__ */ M(
        ye.Item,
        {
          className: `w-full text-left ${S.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${S.itemDefault} ui-row`,
          onSelect: (R) => {
            R.preventDefault(), u();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ M("svg", { className: `${S.btnIcon} ${S.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ p("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ p("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ p("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      f && /* @__PURE__ */ M(
        ye.Item,
        {
          className: `w-full text-left ${S.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${S.itemDefault} ui-row`,
          onSelect: (R) => {
            R.preventDefault(), f();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ p(_r, { className: `${S.btnIcon} ${S.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
function sa({
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
  group: u,
  itemId: d
}) {
  var T;
  zo();
  const f = br(), h = ui(), m = $o(), g = N(!1), x = N(null), y = Gl(), z = !!y && d !== void 0, A = y && d !== void 0 ? y.isSelected(d) : l, C = t || (y && d !== void 0 ? !y.canToggle(d) : !1), { myIndex: w, highlighted: I, setPointer: F, api: $ } = Lo({
    label: () => Do(o),
    activate: () => {
      C || (y && d !== void 0 ? y.toggle(d) : n());
    },
    disabled: C,
    group: u,
    itemId: d
  }), { query: S } = ia(), G = S.trim() !== "" && w < 0, E = u == null ? void 0 : u.trim(), B = !!E && w >= 0 && (w === 0 || ((T = $ == null ? void 0 : $.items[w - 1]) == null ? void 0 : T.group) !== E), D = E && y ? (($ == null ? void 0 : $.items) ?? []).filter((k) => k.group === E && k.itemId).map((k) => k.itemId).filter((k) => !y.isDisabled(k)) : [], V = y && D.length > 0 ? y.groupState(D) : "none", K = r === "danger" ? f.itemDanger : f.itemDefault;
  return /* @__PURE__ */ M(Xe, { children: [
    B && /* @__PURE__ */ p(
      "div",
      {
        "data-menu-group": E,
        role: "presentation",
        className: `ui-label shrink-0 select-none font-semibold uppercase tracking-wider ${y && D.length > 0 ? "" : "pointer-events-none"}`,
        style: m,
        children: y && D.length > 0 ? /* @__PURE__ */ M("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `Select all ${E}`,
              onMouseDown: (k) => k.preventDefault(),
              onClick: () => y.toggleGroup(D),
              className: "flex shrink-0 items-center justify-center rounded pointer-events-auto",
              children: /* @__PURE__ */ p(
                lr,
                {
                  checked: V === "all",
                  indeterminate: V === "some",
                  indicator: y.indicator
                }
              )
            }
          ),
          /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: E })
        ] }) : E
      }
    ),
    /* @__PURE__ */ M(
      ye.Item,
      {
        ref: x,
        "data-ei": w >= 0 ? w : void 0,
        ...z ? { role: "menuitemcheckbox", "aria-checked": A } : {},
        style: { ...h, display: G ? "none" : void 0 },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${K} ${z ? "" : l ? "ui-item-selected" : ""} ${I ? "ui-item-highlighted" : ""} ${C ? "opacity-30 pointer-events-none" : ""} ${i}`,
        onSelect: (k) => {
          if (g.current) {
            g.current = !1;
            return;
          }
          if (z) {
            k.preventDefault(), y && d !== void 0 && y.toggle(d);
            return;
          }
          s && k.preventDefault(), n();
        },
        onPointerEnter: () => {
          F(w);
        },
        onTouchStart: () => {
        },
        disabled: C,
        children: [
          z && /* @__PURE__ */ p(lr, { checked: A, disabled: C, indicator: y.indicator }),
          e && /* @__PURE__ */ p("span", { className: `${f.icon} shrink-0`, children: e }),
          /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: o }),
          c && /* @__PURE__ */ p("span", { className: "shrink-0 ml-1 flex items-center", children: c }),
          a && /* @__PURE__ */ p(
            "span",
            {
              className: `shrink-0 ml-1 p-0.5 rounded ${f.rightAction}`,
              title: a.title,
              onPointerDown: (k) => {
                k.stopPropagation(), k.preventDefault(), g.current = !0, a.onClick();
              },
              onClick: (k) => {
                k.stopPropagation(), k.preventDefault();
              },
              children: a.icon
            }
          )
        ]
      }
    )
  ] });
}
function la({ id: n, label: e, icon: t, width: r, side: i = "right", children: o, contentClassName: s }) {
  const { chain: l, setChain: a, morph: c, keyboardOpened: u, setKeyboardOpened: d } = Ht(di), f = l.includes(n), h = l[l.length - 1] === n, m = zo(), g = xn(), x = N(null), y = N(null), [z, A] = ne(f), C = !f && z;
  oe(() => {
    f && A(!0);
  }, [f]);
  const w = () => a((_) => {
    const q = _.indexOf(n);
    return q >= 0 ? _.slice(0, q) : _;
  }), I = vr(), F = fi(), $ = N(F);
  $.current = F;
  const S = N(null);
  oe(() => {
    var q;
    const _ = {
      label: e,
      activate: () => {
        d(n), a((W) => W.includes(n) ? W : [...W, n]);
      },
      submenu: !0
    };
    return S.current = _, (q = $.current) == null ? void 0 : q.register(_);
  }, []);
  const G = F && S.current ? F.items.indexOf(S.current) : -1, E = G >= 0 && G === F.highlightedIndex, B = ie(() => {
    const _ = x.current;
    if (!_) return null;
    const q = _.getBoundingClientRect();
    return { left: q.left, top: q.top, width: q.width, height: q.height };
  }, []), D = xr({
    visible: f,
    morph: c,
    anchor: B,
    onClosed: () => A(!1)
  }), V = N(() => {
  }), K = N(() => {
  }), T = N(() => {
  });
  hi(f && h, I, V, {
    onCloseSub: () => {
      w(), F && G >= 0 && F.setHighlighted(G, "keyboard");
    }
  });
  const k = N(u);
  k.current = u, oe(() => {
    f && (k.current === n ? (I.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var _;
      return (_ = y.current) == null ? void 0 : _.focus();
    }), d(null)) : I.setHighlighted(-1, "keyboard"));
  }, [f]), mi(f, K), pi(f, I, V, y, !h, T), Le.useLayoutEffect(() => {
    var q;
    if (!f || I.highlightedIndex < 0 || I.pointerDriven) return;
    const _ = (q = y.current) == null ? void 0 : q.querySelector(`[data-ei="${I.highlightedIndex}"]`);
    pn(_, "nearest", y.current);
  }, [f, I.highlightedIndex, I.pointerDriven]);
  const X = N(null), le = ie((_) => {
    var q;
    if (_) {
      _.addEventListener("keydown", V.current, { capture: !0 }), _.addEventListener("wheel", K.current, { passive: !1 });
      const W = _.ownerDocument;
      X.current = W, W.addEventListener("keydown", T.current, { capture: !0 });
    } else
      (q = X.current) == null || q.removeEventListener("keydown", T.current, { capture: !0 }), X.current = null;
    y.current = _, D(_);
  }, [D]), ae = Ce(), J = { padding: `${O(8, 12, ae)}px ${O(12, 16, ae)}px`, fontSize: O(12, 14, ae) }, j = `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${E ? " ui-item-highlighted" : ""}${C ? " ui-sub-closing" : ""}`, R = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${s || ""}`;
  return /* @__PURE__ */ M(ye.Sub, { open: f || z, onOpenChange: (_) => a((q) => {
    if (!_) {
      const W = q.indexOf(n);
      return W >= 0 ? q.slice(0, W) : q;
    }
    return q.includes(n) ? q : [...q, n];
  }), children: [
    /* @__PURE__ */ M(
      ye.SubTrigger,
      {
        ref: x,
        "data-ei": G >= 0 ? G : void 0,
        style: J,
        className: j,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          F && G >= 0 && F.setHighlighted(G, "pointer");
        },
        onPointerDown: (_) => {
          _.pointerType === "pen" && (_.preventDefault(), a((q) => f ? q.slice(0, q.indexOf(n)) : [...q, n]));
        },
        children: [
          i === "left" && /* @__PURE__ */ p(or, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ M("span", { className: "flex items-center gap-2", children: [
            t && /* @__PURE__ */ p("span", { className: "ui-icon shrink-0", children: t }),
            e
          ] }),
          i === "right" && /* @__PURE__ */ p(or, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ p(ye.Portal, { container: g ?? void 0, children: /* @__PURE__ */ p(
      ye.SubContent,
      {
        ref: le,
        "data-theme": m,
        className: R,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: I.pointerLeave,
        children: /* @__PURE__ */ p(_n.Provider, { value: I, children: o })
      }
    ) })
  ] });
}
const Cn = 8, Af = ({ open: n, x: e, y: t, onClose: r, children: i, containerRef: o, theme: s, morph: l = !0 }) => {
  const a = It(), c = s ? { theme: s, attrs: { "data-theme": s } } : a ? To(void 0, a) : { theme: "light", attrs: { "data-theme": "light" } }, { theme: u } = c, d = Ce(), f = O(12, 14, d), h = N(null), m = Fn(), [g, x] = ne(!1), [y, z] = ne([]), [A, C] = ne(null), w = vr();
  oe(() => {
    if (n)
      return w.setHighlighted(-1, "keyboard"), No(r);
  }, [n, r]);
  const I = N({ left: e, top: t });
  n && (I.current = { left: e, top: t });
  const F = ie(() => ({ left: I.current.left, top: I.current.top, width: 0, height: 0 }), []), $ = xr({
    visible: !0,
    morph: l,
    anchor: F,
    cloneOnUnmount: !0
  }), S = N(() => {
  }), G = N(() => {
  }), E = N(() => {
  });
  hi(n, w, S), mi(n, G), pi(n, w, S, h, y.length > 0, E);
  const B = N(null), D = ie((T) => {
    var k;
    if (T) {
      T.addEventListener("keydown", S.current, { capture: !0 }), T.addEventListener("wheel", G.current, { passive: !1 });
      const X = T.ownerDocument;
      B.current = X, X.addEventListener("keydown", E.current, { capture: !0 });
    } else
      (k = B.current) == null || k.removeEventListener("keydown", E.current, { capture: !0 }), B.current = null;
    h.current = T, x(!!T), $(T);
  }, [$]), [V, K] = ne(null);
  return ft(() => {
    var W;
    if (!n || !g || !h.current) return;
    const T = h.current, k = T.offsetWidth, X = T.offsetHeight, le = (W = o == null ? void 0 : o.current) == null ? void 0 : W.getBoundingClientRect(), ae = le ? le.right : (m == null ? void 0 : m.innerWidth) ?? 0, J = le ? le.bottom : (m == null ? void 0 : m.innerHeight) ?? 0, j = le ? le.left : 0, R = le ? le.top : 0;
    let _ = Math.max(R + Cn, I.current.top), q = Math.max(j + Cn, I.current.left);
    q + k > ae && (q = ae - k - Cn), _ + X > J && (_ = Math.max(R + Cn, J - X - Cn)), K({ left: q, top: _ });
  }, [n, g, e, t, o]), n ? /* @__PURE__ */ M(ye.Root, { open: n, onOpenChange: (T) => {
    T || r();
  }, modal: !1, children: [
    /* @__PURE__ */ p(ye.Trigger, { asChild: !0, children: /* @__PURE__ */ p("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ p(ye.Portal, { children: /* @__PURE__ */ p(ci.Provider, { value: u, children: /* @__PURE__ */ p(di.Provider, { value: { chain: y, setChain: z, morph: l, keyboardOpened: A, setKeyboardOpened: C }, children: /* @__PURE__ */ p(_n.Provider, { value: w, children: /* @__PURE__ */ p(
      ye.Content,
      {
        ref: D,
        ...c.attrs,
        "data-ui-fixed": !0,
        className: "fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom",
        style: { fontSize: f, left: (V == null ? void 0 : V.left) ?? I.current.left, top: (V == null ? void 0 : V.top) ?? I.current.top, touchAction: "manipulation" },
        onPointerLeave: w.pointerLeave,
        children: i
      }
    ) }) }) }) })
  ] }) : null;
}, zf = ({ onClick: n, variant: e = "default", icon: t, disabled: r = !1, selected: i = !1, trailing: o, children: s }) => {
  const l = Ce(), a = { padding: `${O(8, 12, l)}px ${O(12, 16, l)}px`, fontSize: O(12, 14, l) }, c = fi(), u = N(c);
  u.current = c;
  const d = N(null);
  oe(() => {
    var g;
    const m = { label: Do(s), activate: () => {
      r || n();
    } };
    return d.current = m, (g = u.current) == null ? void 0 : g.register(m);
  }, []);
  const f = c && d.current ? c.items.indexOf(d.current) : -1, h = !r && f >= 0 && f === c.highlightedIndex;
  return /* @__PURE__ */ M(
    ye.Item,
    {
      "data-ei": f >= 0 ? f : void 0,
      onClick: r ? void 0 : n,
      onPointerEnter: () => {
        !r && c && f >= 0 && c.setHighlighted(f, "pointer");
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
}, $f = () => /* @__PURE__ */ p(ye.Separator, { className: "ui-sep my-1" }), Df = (n) => /* @__PURE__ */ p(la, { ...n, width: n.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), ge = 8, Po = "[data-modal-stack]", Et = 220, An = "cubic-bezier(0.32, 0.72, 0, 1)", tr = 0.94;
function on() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Ot(n) {
  if (!n) return { top: 0, height: 0, bottom: 0 };
  const e = n.visualViewport, t = e ? e.offsetTop : 0, r = e ? e.height : n.innerHeight;
  return { top: t, height: r, bottom: t + r };
}
function Bo(n, e) {
  return `translate(${e.left - n.left}px, ${e.top - n.top}px) scale(${e.width / n.width}, ${e.height / n.height})`;
}
function Di(n, e, t, r) {
  const i = ++n.current, o = e.getBoundingClientRect();
  e.style.transition = "none", e.style.transform = Bo(o, t), e.style.transformOrigin = "0 0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === i && (e.style.transition = `transform ${Et}ms ${An}, opacity 180ms ease`, e.style.transform = "none", window.setTimeout(() => {
        n.current === i && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", r());
      }, Et + 80));
    });
  });
}
function aa(n, e, t) {
  const r = ++n.current;
  e.style.transition = "none", e.style.transformOrigin = "center", e.style.transform = `scale(${tr})`, e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === r && (e.style.transition = `transform ${Et}ms ${An}`, e.style.transform = "none", window.setTimeout(() => {
        n.current === r && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", t());
      }, Et + 60));
    });
  });
}
function Oi(n, e, t) {
  const r = ++n.current, i = e.getBoundingClientRect(), o = 1 - tr, s = { left: i.left + i.width * o / 2, top: i.top + i.height * o / 2, width: i.width * tr, height: i.height * tr };
  e.style.transition = `transform ${Et}ms ${An}, opacity 170ms ease`, e.style.transformOrigin = "0 0", e.style.transform = Bo(i, s), e.style.opacity = "0", window.setTimeout(() => {
    n.current === r && (e.style.visibility = "hidden", t(), requestAnimationFrame(() => {
      n.current !== r || e.isConnected || (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", e.style.opacity = "", e.style.visibility = "");
    }));
  }, Et + 60);
}
function Ir(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(Po) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function Jn(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(Po) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function ca({
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
  dismissOnBackdrop: d = !0,
  theme: f,
  surface: h,
  accent: m
}) {
  const g = It(), x = si(
    { mode: f, accent: m, surface: h, context: "surface" },
    g
  ), y = x.mode, z = x.surface, A = x.accent, C = N(null), w = N(null), I = N(null), F = Ce(), $ = O(20, 24, F), S = O(10, 12, F), G = O(12, 14, F), E = O(14, 16, F), B = O(20, 24, F), D = O(20, 24, F), V = O(20, 24, F), K = O(14, 16, F), T = O(16, 20, F), k = O(10, 12, F), X = O(12, 14, F), le = O(8, 10, F), ae = O(4, 6, F), J = { padding: `${S}px ${$}px` }, j = { fontSize: G }, R = { padding: `${D}px ${B}px 16px ${B}px` }, _ = { fontSize: E }, q = { padding: `0 ${B}px 16px` }, W = { padding: `${V}px ${B}px` }, fe = { fontSize: k, padding: `${ae}px ${le}px` }, [ue, Te] = ne(!1), Q = ie((v) => {
    C.current = v, Te(v !== null);
  }, []), U = xn(), $e = Fn(), me = N($e);
  me.current = $e;
  const [Je, xe] = ne(null), ce = N(null), Me = N(!1), ve = N(!1), De = N(0), Fe = N({ w: 0, h: 0 }), He = N(!1), [jt, Ve] = ne(!1), [Wt, kt] = ne(!1), Oe = N(0), et = N(!1), [en, bt] = ne(!1), tn = N(a);
  tn.current = a;
  const nn = N(!1), At = N(!1), St = () => {
    At.current = !0, Ve(!0);
  }, mt = () => {
    At.current = !1, Ve(!1);
  };
  oe(() => {
    n || (xe(null), He.current = !1, Me.current = !1, kt(!1));
  }, [n]), ft(() => {
    if (!n || He.current || !ue || !C.current) return;
    He.current = !0;
    const v = C.current.getBoundingClientRect(), Y = me.current ?? null, ee = (Y == null ? void 0 : Y.innerWidth) ?? 0, de = Ot(Y);
    xe({
      left: Math.max(ge, Math.min((ee - v.width) / 2, ee - v.width - ge)),
      top: Math.max(de.top + ge, Math.min(de.top + (de.height - v.height) / 2, de.bottom - v.height - ge))
    });
  }, [n, ue]), ft(() => {
    if (!n || !ue || !a || on() || !C.current) return;
    const v = C.current, Y = Ir(v), ee = Y[Y.length - 1];
    St(), ee ? Di(Oe, v, ee.getBoundingClientRect(), mt) : aa(Oe, v, mt);
  }, [n, ue]);
  const we = ie(() => {
    if (!u || et.current) return;
    const v = C.current, Y = !!v && Ir(v).length > 0;
    if (!v || !a || on() || Y) {
      e();
      return;
    }
    et.current = !0, bt(!0), nn.current = !0, St(), Oi(Oe, v, () => {
      et.current = !1, bt(!1), mt(), e();
    });
  }, [a, e, u]), tt = ie(() => {
    const v = C.current;
    if (!v || nn.current || !tn.current || on() || Ir(v).length > 0) return;
    const Y = v.ownerDocument, ee = v.cloneNode(!0);
    ee.removeAttribute("data-modal-stack"), ee.removeAttribute("data-state"), ee.removeAttribute("role"), ee.removeAttribute("data-aria-hidden"), ee.removeAttribute("tabindex"), ee.setAttribute("aria-hidden", "true"), ee.style.pointerEvents = "none", Y.body.appendChild(ee), Oi({ current: 0 }, ee, () => {
      ee.isConnected && ee.remove();
    });
  }, []);
  ft(() => () => tt(), [tt]);
  const Nt = N(n);
  ft(() => {
    const v = Nt.current;
    Nt.current = n, v && !n && tt();
  }, [n, ue, tt]), oe(() => {
    if (!n || !ue || !a || !C.current) return;
    const v = C.current, Y = v.parentNode;
    if (!Y) return;
    let ee = 0, de = null, pe = !1;
    const be = () => {
      ee = 0;
      const Ee = Jn(v);
      if (Ee.length > 0)
        v.style.opacity = "", v.style.pointerEvents = "", de = Ee[Ee.length - 1].getBoundingClientRect(), pe = !0, ee = requestAnimationFrame(be);
      else if (pe) {
        pe = !1, de && !on() && (St(), Di(Oe, v, de, mt)), de = null;
        const _e = me.current ?? null;
        _e == null || _e.setTimeout(() => {
          !v || !v.isConnected || getComputedStyle(v).opacity !== "1" && (v.style.opacity = "1", v.style.pointerEvents = "");
        }, 240);
      }
    }, ke = new MutationObserver(() => {
      !ee && Jn(v).length > 0 && (ee = requestAnimationFrame(be));
    });
    return ke.observe(Y, { childList: !0 }), () => {
      ke.disconnect(), ee && cancelAnimationFrame(ee);
    };
  }, [n, ue]), oe(() => {
    if (!ue || !a || on() || !C.current) return;
    const v = C.current;
    let Y = Math.round(v.getBoundingClientRect().height), ee = !1;
    const de = new ResizeObserver(() => {
      if (!v.isConnected) return;
      const pe = Math.round(v.getBoundingClientRect().height);
      if (!ee) {
        ee = !0, Y = pe;
        return;
      }
      if (Math.abs(pe - Y) < 1) return;
      if (ce.current || et.current || Jn(v).length > 0) {
        Y = pe;
        return;
      }
      if (At.current) return;
      const be = Y;
      Y = pe, St();
      const ke = v.getBoundingClientRect(), Ee = Ot(me.current ?? null), _e = !Me.current && !ve.current, zt = _e ? Ee.top + (Ee.height - be) / 2 : ke.top, rt = _e ? Ee.top + (Ee.height - pe) / 2 : ke.top;
      v.style.transition = "none", v.style.height = `${be}px`, _e && (v.style.top = `${zt}px`), w.current && (w.current.style.overflow = "hidden"), v.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          v.style.height === `${be}px` && (v.style.transition = `height ${Et}ms ${An}${_e ? `, top ${Et}ms ${An}` : ""}`, v.style.height = `${pe}px`, _e && (v.style.top = `${rt}px`), window.setTimeout(() => {
            v.style.height === `${pe}px` && (v.style.transition = "", v.style.height = "", w.current && (w.current.style.overflow = ""), _e && xe({ left: ke.left, top: rt }), mt());
          }, Et + 60));
        });
      });
    });
    return de.observe(v), () => de.disconnect();
  }, [ue]), oe(() => {
    if (!ue || !C.current || a && !on()) return;
    const v = C.current, Y = new ResizeObserver(() => {
      if (!v.isConnected || ce.current || et.current || ve.current || Jn(v).length > 0) return;
      const ee = me.current ?? null, de = Ot(ee), pe = (ee == null ? void 0 : ee.innerWidth) ?? 0, be = v.getBoundingClientRect(), ke = Math.max(de.top + ge, Math.min(be.top, de.bottom - be.height - ge)), Ee = Math.max(ge, Math.min(be.left, pe - be.width - ge));
      (Math.abs(ke - be.top) > 0.5 || Math.abs(Ee - be.left) > 0.5) && xe({ left: Ee, top: ke });
    });
    return Y.observe(v), () => Y.disconnect();
  }, [ue, a]);
  const at = ie(() => {
    const v = C.current;
    if (!v) return null;
    const Y = v.getBoundingClientRect();
    return { left: Y.left, top: Y.top, width: Y.width, height: Y.height };
  }, []), nt = ie((v, Y) => {
    const ee = me.current ?? null, de = (ee == null ? void 0 : ee.innerWidth) ?? 0, pe = Ot(ee), be = at(), ke = be ? be.width : Math.min(de - ge * 2, 576), Ee = be ? be.height : Math.min(pe.height - ge * 2, 400);
    return {
      left: Math.max(ge, Math.min(v, de - ke - ge)),
      top: Math.max(pe.top + ge, Math.min(Y, pe.bottom - Ee - ge))
    };
  }, [at]);
  oe(() => {
    if (!n) return;
    const v = me.current ?? null, Y = (v == null ? void 0 : v.visualViewport) ?? null;
    if (!v || !Y) return;
    const ee = 120;
    ve.current = !1, Fe.current = { w: v.innerWidth, h: v.innerHeight };
    let de = 0;
    const pe = () => {
      if (et.current || ce.current) return;
      const ke = (v == null ? void 0 : v.innerHeight) ?? 0, Ee = (v == null ? void 0 : v.innerWidth) ?? 0, zt = Ot(v).height < ke - ee, rt = ke < Fe.current.h - ee && Ee === Fe.current.w;
      zt || rt ? (ve.current = !0, De.current && (clearTimeout(De.current), De.current = 0)) : De.current || (De.current = (v == null ? void 0 : v.setTimeout(() => {
        ve.current = !1, De.current = 0, kt(!1);
      }, 600)) ?? 0), kt(ve.current), !de && (de = requestAnimationFrame(() => {
        var b;
        de = 0;
        const kn = C.current;
        if (!kn) return;
        const wt = Ot(me.current ?? null), it = kn.getBoundingClientRect(), jn = ((b = me.current) == null ? void 0 : b.innerWidth) ?? 0, qt = (v == null ? void 0 : v.innerHeight) ?? 0, Mr = wt.height < qt - ee || qt < Fe.current.h - ee && (v == null ? void 0 : v.innerWidth) === Fe.current.w;
        Fe.current = { w: (v == null ? void 0 : v.innerWidth) ?? 0, h: qt };
        const Ct = it.top >= wt.top + ge && it.bottom <= wt.bottom - ge, Sn = () => {
          xe({
            left: Math.max(ge, Math.min((jn - it.width) / 2, jn - it.width - ge)),
            top: Math.max(wt.top + ge, Math.min(wt.top + (wt.height - it.height) / 2, wt.bottom - it.height - ge))
          });
        };
        if (Mr && !ze) {
          if (Me.current) {
            Ct || xe(nt(it.left, it.top));
            return;
          }
          if (Ct) return;
          Sn();
          return;
        }
        if (!ve.current) {
          if (Me.current) {
            Ct || xe(nt(it.left, it.top));
            return;
          }
          Ct || Sn();
        }
      }));
    };
    Y.addEventListener("resize", pe), Y.addEventListener("scroll", pe);
    const be = () => {
      et.current || ce.current || de || (de = requestAnimationFrame(() => {
        de = 0;
        const ke = C.current;
        if (!ke) return;
        const Ee = me.current ?? null, _e = Ot(Ee), zt = (Ee == null ? void 0 : Ee.innerWidth) ?? 0, rt = ke.getBoundingClientRect();
        if (Me.current) {
          xe(nt(rt.left, rt.top));
          return;
        }
        xe({
          left: Math.max(ge, Math.min((zt - rt.width) / 2, zt - rt.width - ge)),
          top: Math.max(_e.top + ge, Math.min(_e.top + (_e.height - rt.height) / 2, _e.bottom - rt.height - ge))
        });
      }));
    };
    return v.addEventListener("orientationchange", be), () => {
      Y.removeEventListener("resize", pe), Y.removeEventListener("scroll", pe), v.removeEventListener("orientationchange", be), de && cancelAnimationFrame(de), De.current && clearTimeout(De.current);
    };
  }, [n, nt]);
  const Ye = ie((v) => {
    if (v.target.closest("button")) return;
    Me.current = !0;
    const Y = at();
    Y && (xe(nt(Y.left, Y.top)), ce.current = { startX: v.clientX, startY: v.clientY, posX: Y.left, posY: Y.top }, v.target.setPointerCapture(v.pointerId));
  }, [at, nt]), ct = ie((v) => {
    const Y = ce.current;
    Y && (v.preventDefault(), xe(nt(Y.posX + v.clientX - Y.startX, Y.posY + v.clientY - Y.startY)));
  }, [nt]), vt = ie(() => {
    ce.current = null;
  }, []), P = ce.current !== null, te = ie(() => {
    Me.current = !1;
    const v = me.current ?? null, Y = Ot(v), ee = (v == null ? void 0 : v.innerWidth) ?? 0, de = C.current, pe = de ? de.getBoundingClientRect() : { width: 0, height: 0 };
    xe({
      left: Math.max(ge, Math.min((ee - pe.width) / 2, ee - pe.width - ge)),
      top: Math.max(Y.top + ge, Math.min(Y.top + (Y.height - pe.height) / 2, Y.bottom - pe.height - ge))
    });
  }, []), se = N(0), Ue = ie(() => {
    const v = Date.now();
    v - se.current < 300 ? (se.current = 0, te()) : se.current = v;
  }, [te]), ut = Je !== null, vn = ut ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", Ae = `${i ? `${i} w-full` : "max-w-xl w-full"}`, wn = {
    ...ut ? { left: Je.left, top: Je.top } : {},
    width: `min(100%, calc(100dvw - ${ge * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...Wt ? {} : { maxHeight: `calc(100dvh - ${ge * 2}px)` }
  }, Er = ie((v) => {
    if (v.key !== "Enter" || v.shiftKey || v.metaKey || v.ctrlKey || v.altKey) return;
    const Y = v.target, ee = I.current;
    if (!(!!Y.closest("[data-modal-close]") || !!ee && ee.contains(Y) && !!Y.closest('button, a, [role="button"]')) && Y.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !ee) return;
    const pe = Array.from(ee.querySelectorAll("button[data-modal-confirm]")), be = pe.length > 0 ? pe : Array.from(ee.querySelectorAll("button")), ke = be[be.length - 1];
    !ke || ke.disabled || (v.preventDefault(), ke.click());
  }, []);
  return /* @__PURE__ */ p(li, { theme: x, children: /* @__PURE__ */ p(Dt.Root, { open: n, onOpenChange: (v) => {
    v || we();
  }, children: /* @__PURE__ */ M(Dt.Portal, { container: U ?? void 0, children: [
    /* @__PURE__ */ p(
      Dt.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${en ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (v) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (v.preventDefault(), d && we());
        }
      }
    ),
    /* @__PURE__ */ M(
      Dt.Content,
      {
        ref: Q,
        onKeyDown: Er,
        onInteractOutside: (v) => {
          d || v.preventDefault();
        },
        "data-modal-stack": !0,
        "data-mode": y,
        "data-accent": A,
        "data-surface": z,
        className: `ui-modal fixed z-[10000] bg-[var(--ui-modal-bg)] border border-[color:var(--ui-modal-border)] rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${vn} ${Ae}`,
        style: { touchAction: "manipulation", colorScheme: y, ...Object.keys(wn).length > 0 ? wn : {} },
        children: [
          c ? /* @__PURE__ */ M(
            "div",
            {
              style: R,
              className: `flex items-center justify-between ${P ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (v) => {
                jt || Ye(v);
              },
              onPointerMove: ct,
              onPointerUp: vt,
              onClick: Ue,
              children: [
                /* @__PURE__ */ p(Dt.Title, { style: _, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t }),
                u && /* @__PURE__ */ p(Dt.Close, { "data-modal-close": !0, className: "text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ p(Ut, { style: { width: T, height: T } }) })
              ]
            }
          ) : /* @__PURE__ */ M(
            "div",
            {
              style: J,
              className: `flex items-center justify-between border-b border-[color:var(--ui-modal-header-border)] shrink-0 bg-[var(--ui-modal-header-bg)] ${P ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (v) => {
                jt || Ye(v);
              },
              onPointerMove: ct,
              onPointerUp: vt,
              onClick: Ue,
              children: [
                /* @__PURE__ */ M("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ p("span", { className: "text-[color:var(--ui-modal-icon)] shrink-0", children: r }),
                  /* @__PURE__ */ p(Dt.Title, { style: j, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t })
                ] }),
                /* @__PURE__ */ M("div", { className: "flex items-center gap-2", children: [
                  l && /* @__PURE__ */ M("button", { onClick: l, style: fe, className: "flex items-center gap-1 text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-muted-hover)] transition-colors bg-[var(--ui-modal-control-bg)] hover:bg-[var(--ui-modal-control-hover-bg)] rounded shrink-0", children: [
                    /* @__PURE__ */ p(fo, { style: { width: X, height: X } }),
                    "Reset"
                  ] }),
                  u && /* @__PURE__ */ p(Dt.Close, { "data-modal-close": !0, className: "text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ p(Ut, { style: { width: K, height: K } }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ p("div", { ref: w, "data-testid": "modal-body", style: c ? q : void 0, className: "overflow-y-auto flex-1 bg-[var(--ui-modal-body-bg)] text-[color:var(--ui-modal-body-text)]", children: s }),
          o && /* @__PURE__ */ p("div", { ref: I, style: c ? W : void 0, className: c ? "" : "shrink-0", children: c ? /* @__PURE__ */ p("div", { className: "flex items-center justify-end gap-2", children: o }) : o })
        ]
      }
    )
  ] }) }) });
}
function Of({ children: n }) {
  const e = Ce(), t = O(20, 24, e), r = O(8, 12, e);
  return /* @__PURE__ */ p("div", { className: "flex items-center justify-end gap-3 border-t border-[color:var(--ui-modal-border)] bg-[var(--ui-modal-footer-bg)]", style: { padding: `${r}px ${t}px` }, children: n });
}
const ua = "inline-flex items-center gap-2 rounded-lg text-xs transition cursor-pointer select-none whitespace-nowrap active:shadow-[inset_0_0_0_2px_var(--ui-panel-bg)]", da = {
  zinc: "bg-[var(--ui-footer-hero-bg)] text-[color:var(--ui-footer-hero-text)] font-semibold border border-[color:var(--ui-footer-hero-border)] hover:bg-[var(--ui-footer-hero-hover-bg)] hover:border-[color:var(--ui-footer-hero-hover-border)] disabled:opacity-40 disabled:cursor-not-allowed",
  accent: "bg-[var(--ui-accent-solid)] text-[color:var(--ui-accent-action-text)] font-semibold border border-transparent hover:bg-[var(--ui-accent-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed",
  danger: "bg-[var(--ui-danger-solid)] text-white font-semibold border border-[color:var(--ui-danger-solid)] hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
}, fa = {
  /* Transparent border on every variant — auto-height buttons add the border
     to their height, so the bordered hero would otherwise be 2px taller. */
  ghost: "border border-transparent text-[color:var(--ui-text-muted)] font-medium hover:bg-[var(--ui-footer-ghost-hover-bg)] hover:text-[color:var(--ui-text-strong)] disabled:opacity-50",
  danger: "border border-transparent text-[color:var(--ui-danger-text)] font-medium hover:bg-[var(--ui-danger-hover-bg)] hover:text-[color:var(--ui-danger-hover-text)] disabled:opacity-50",
  "danger-solid": "border border-transparent bg-[var(--ui-danger-solid)] text-white font-semibold hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
};
function Kn({
  variant: n = "hero",
  tone: e = "zinc",
  className: t = "",
  type: r = "button",
  ...i
}) {
  const o = Bt({ px: 24, py: 8, fs: 12 }, { px: 28, py: 10, fs: 14 });
  return /* @__PURE__ */ p(
    "button",
    {
      type: r,
      style: o,
      className: `${ua} ${n === "hero" ? da[e] : fa[n]} ${t}`,
      ...i
    }
  );
}
function Jr(n = "md") {
  const e = ze && go() > 0;
  return n === "sm" ? `${e ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"} ui-input` : `${e ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs"} ui-input`;
}
function Fo(n = "md") {
  return n === "sm" ? Bt({ px: 8, py: 6, fs: 12 }, { px: 12, py: 8, fs: 14 }) : Bt({ px: 10, py: 5, fs: 12 }, { px: 14, py: 9, fs: 14 });
}
const Ho = Ft(null);
function Lf() {
  const n = Ht(Ho);
  if (!n) throw new Error("useDialog must be used within DialogProvider");
  return n;
}
function Pf({ children: n, theme: e, accent: t, surface: r }) {
  const [i, o] = ne(null), [s, l] = ne(!1), a = N(null), c = Ce(), u = O(16, 20, c), d = O(12, 14, c), f = Fo(), h = N(i);
  h.current = i;
  const m = ie(() => {
    const w = h.current;
    w && (w.kind === "confirm" ? w.resolve(!1) : w.kind === "prompt" ? w.resolve(null) : w.resolve());
  }, []), g = ie((w) => {
    if (w.suppressKey) {
      const I = localStorage.getItem(w.suppressKey);
      if (I && Date.now() < parseInt(I, 10))
        return Promise.resolve(!0);
    }
    return new Promise((I) => {
      m(), l(!1), o({ kind: "confirm", options: w, resolve: I });
    });
  }, [m]), x = ie((w) => new Promise((I) => {
    m(), o({ kind: "prompt", options: w, resolve: I });
  }), [m]), y = ie((w) => new Promise((I) => {
    m(), o({ kind: "alert", options: w, resolve: I });
  }), [m]);
  oe(() => {
    if (i) {
      const w = setTimeout(() => {
        var I;
        return (I = a.current) == null ? void 0 : I.focus();
      }, 50);
      return () => clearTimeout(w);
    }
  }, [i]);
  const z = ie(() => {
    var w, I;
    if (i) {
      if (i.kind === "confirm") {
        const F = i.options;
        F.suppressKey && s && localStorage.setItem(F.suppressKey, String(Date.now() + 864e5)), i.resolve(!0);
      } else i.kind === "prompt" ? i.resolve(((I = (w = a.current) == null ? void 0 : w.value) == null ? void 0 : I.trim()) || null) : i.resolve();
      o(null);
    }
  }, [i, s]), A = i !== null;
  oe(() => {
    if (!A) return;
    const w = (I) => {
      I.key !== "Enter" || I.shiftKey || I.metaKey || I.ctrlKey || I.altKey || I.isComposing || (I.preventDefault(), I.stopImmediatePropagation(), z());
    };
    return document.addEventListener("keydown", w, !0), () => document.removeEventListener("keydown", w, !0);
  }, [A, z]);
  const C = ie(() => {
    i && (i.kind === "confirm" ? i.resolve(!1) : i.kind === "prompt" ? i.resolve(null) : i.resolve(), o(null));
  }, [i]);
  return /* @__PURE__ */ M(Ho.Provider, { value: { confirm: g, prompt: x, alert: y }, children: [
    n,
    A && /* @__PURE__ */ p(
      ca,
      {
        open: !0,
        onClose: C,
        closable: (i == null ? void 0 : i.kind) !== "alert",
        dismissOnBackdrop: (i == null ? void 0 : i.kind) !== "alert",
        title: (i == null ? void 0 : i.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: i && /* @__PURE__ */ M(Xe, { children: [
          i.kind !== "alert" && /* @__PURE__ */ p(Kn, { variant: "ghost", onClick: C, children: "Cancel" }),
          i.kind === "alert" ? /* @__PURE__ */ p(Kn, { onClick: z, children: "OK" }) : i.kind === "confirm" ? /* @__PURE__ */ p(
            Kn,
            {
              "data-modal-confirm": !0,
              variant: i.options.danger ? "danger-solid" : "hero",
              onClick: z,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ p(Kn, { "data-modal-confirm": !0, onClick: z, children: "Save" })
        ] }),
        children: /* @__PURE__ */ M("div", { className: "flex flex-col", style: { gap: u }, children: [
          (i == null ? void 0 : i.options.message) && /* @__PURE__ */ p("p", { style: { fontSize: d }, className: "text-[color:var(--ui-text-muted)] leading-relaxed", children: i.options.message }),
          (i == null ? void 0 : i.kind) === "confirm" && i.options.suppressKey && /* @__PURE__ */ p(
            Xl,
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
              style: f,
              className: "w-full ui-input"
            }
          )
        ] })
      }
    )
  ] });
}
const ha = 500, pa = 250, ma = 5, dt = 88, Li = 4;
function ga(n, e) {
  const t = n.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  t.style.strokeDasharray = String(r), t.style.strokeDashoffset = String(r);
  const i = performance.now(), o = (s) => {
    const l = s - i, a = Math.min(l / e, 1);
    t.style.strokeDashoffset = String(r * (1 - a)), a < 1 && requestAnimationFrame(o);
  };
  requestAnimationFrame(o);
}
function ya({ x: n, y: e, ms: t }) {
  const r = N(null), i = xn();
  return oe(() => {
    r.current && ga(r.current, t);
  }, [t]), gr(
    /* @__PURE__ */ p(
      "div",
      {
        style: {
          position: "fixed",
          left: n - dt / 2,
          top: e - dt / 2,
          width: dt,
          height: dt,
          zIndex: 99999,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ M("svg", { ref: r, width: dt, height: dt, viewBox: `0 0 ${dt} ${dt}`, children: [
          /* @__PURE__ */ p(
            "circle",
            {
              cx: dt / 2,
              cy: dt / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: Li + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ p(
            "circle",
            {
              cx: dt / 2,
              cy: dt / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: Li,
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
function Bf() {
  return { "data-no-longpress": "true" };
}
function xa(n) {
  const e = n.tagName;
  return !!(e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || e === "BUTTON" || n.isContentEditable || n.closest("[data-no-longpress]") || n.closest("button, input, select, textarea"));
}
function Ff({
  children: n,
  showRing: e = !0,
  longPressMs: t = ha,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: i,
  onLongPress: o
}) {
  const [s, l] = ne(null), a = ni(), c = N(null), u = N(null), d = N({ x: 0, y: 0, target: null }), f = N(!1), h = Math.min(pa, t * 0.5), m = N(i);
  m.current = i;
  const g = N(o);
  return g.current = o, oe(() => {
    if (!ze || !a) return;
    const x = (C) => {
      if (!jr(C.pointerType) || C.button !== 0) return;
      const w = C.target;
      if (!w.closest(r) || (m.current ? !m.current(w) : xa(w))) return;
      const I = C.clientX, F = C.clientY;
      d.current = { x: I, y: F, target: C.target }, f.current = !0, e && (u.current = setTimeout(() => l({ x: I, y: F }), h)), c.current = setTimeout(() => {
        if (!f.current) return;
        u.current && (clearTimeout(u.current), u.current = null), l(null);
        const $ = d.current.target;
        if (!$) return;
        const S = g.current;
        if (S) {
          S($, I, F);
          return;
        }
        const G = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: I,
          clientY: F,
          button: 2,
          view: window
        });
        $.dispatchEvent(G);
      }, t);
    }, y = (C) => {
      if (!f.current || c.current === null) return;
      const w = C.clientX - d.current.x, I = C.clientY - d.current.y;
      Math.sqrt(w * w + I * I) > ma && (clearTimeout(c.current), c.current = null, u.current && (clearTimeout(u.current), u.current = null), f.current = !1, l(null));
    }, z = () => {
      c.current !== null && (clearTimeout(c.current), c.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, l(null);
    }, A = (C) => {
      jr(C.pointerType) && (c.current !== null && (clearTimeout(c.current), c.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, l(null));
    };
    return a == null || a.addEventListener("pointerdown", x), a.addEventListener("pointermove", y), a.addEventListener("pointerup", z), a.addEventListener("pointercancel", z), a.addEventListener("pointerleave", A), () => {
      a.removeEventListener("pointerdown", x), a.removeEventListener("pointermove", y), a.removeEventListener("pointerup", z), a == null || a.removeEventListener("pointercancel", z), a == null || a.removeEventListener("pointerleave", A), c.current !== null && clearTimeout(c.current), u.current !== null && clearTimeout(u.current);
    };
  }, [e, t, h, r]), /* @__PURE__ */ M(Xe, { children: [
    n,
    e && s && /* @__PURE__ */ p(ya, { x: s.x, y: s.y, ms: t - h })
  ] });
}
function Hf() {
  const n = Bl();
  return Pl ? n === null || jr(n) : !1;
}
const ba = {
  border: "1px solid #d4d4d8",
  background: "rgba(255,255,255,0.94)",
  color: "#52525b",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
}, va = {
  border: "2px solid #2563eb",
  background: "#2563eb",
  color: "#fff",
  boxShadow: "0 4px 16px rgba(37,99,235,0.4)"
}, wa = {
  border: "1px solid #f59e0b",
  background: "rgba(255, 251, 235, 0.94)",
  color: "#b45309",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
};
function _f({
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
        ...e ? wa : n ? va : ba,
        ...t
      },
      ...s,
      children: o
    }
  );
}
const ka = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Sa = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Ar = 1900, zr = 2100;
function Na(n, e) {
  return new Date(n, e + 1, 0).getDate();
}
function Ca(n, e, t) {
  return `${n}-${String(e + 1).padStart(2, "0")}-${String(t).padStart(2, "0")}`;
}
function jf({ selected: n, onChange: e, theme: t, showChips: r = !0, className: i = "", initialView: o }) {
  const s = It(), l = t ?? (s == null ? void 0 : s.mode) ?? "light", a = /* @__PURE__ */ new Date(), c = (() => {
    if (!o) return a;
    const Q = /* @__PURE__ */ new Date(o + "T00:00:00");
    return isNaN(Q.getTime()) ? a : Q;
  })(), [u, d] = ne(c.getFullYear()), [f, h] = ne(c.getMonth()), [m, g] = ne("days"), [x, y] = ne(null), z = Ge(() => new Set(n), [n]), A = (Q) => {
    z.has(Q) ? e(n.filter((U) => U !== Q)) : e([...n, Q]);
  }, C = Ge(() => {
    const Q = Na(u, f), U = new Date(u, f, 1).getDay(), $e = [];
    for (let me = 0; me < U; me++) $e.push({ key: `pad-${me}`, day: 0, empty: !0 });
    for (let me = 1; me <= Q; me++) $e.push({ key: Ca(u, f, me), day: me, empty: !1 });
    return $e;
  }, [u, f]), w = (Q) => d((U) => Math.max(Ar, Math.min(zr, U + Q))), I = (Q) => {
    f + Q < 0 ? (d((U) => Math.max(Ar, U - 1)), h(11)) : f + Q > 11 ? (d((U) => Math.min(zr, U + 1)), h(0)) : h((U) => U + Q);
  }, F = () => {
    if (x === null) return;
    const Q = parseInt(x, 10);
    !isNaN(Q) && Q >= Ar && Q <= zr && d(Q), y(null);
  }, $ = (Q) => n.some((U) => U.startsWith(`${u}-${String(Q + 1).padStart(2, "0")}`)), S = Ce(), G = O(4, 8, S), E = O(16, 20, S), B = O(10, 11, S), D = O(6, 8, S), V = O(12, 14, S), K = O(6, 10, S), T = O(12, 14, S), k = O(8, 12, S), X = O(10, 12, S), le = O(6, 10, S), ae = O(2, 6, S), J = O(64, 80, S), j = { padding: G }, R = { width: E, height: E }, _ = { fontSize: B, paddingTop: D, paddingBottom: D }, q = { fontSize: V, paddingTop: K, paddingBottom: K }, W = { fontSize: T, paddingTop: k, paddingBottom: k }, fe = { fontSize: X, padding: `${ae}px ${le}px` }, ue = "bg-[var(--ui-date-selected-bg)] text-[color:var(--ui-date-selected-text)] hover:bg-[var(--ui-date-selected-hover-bg)]", Te = "text-[color:var(--ui-text)] hover:bg-[var(--ui-card-hover)]";
  return /* @__PURE__ */ M("div", { "data-mode": l, "data-accent": s == null ? void 0 : s.accent, "data-surface": s == null ? void 0 : s.surface, className: `border rounded-lg overflow-hidden w-full border-[color:var(--ui-border-strong)] bg-[var(--ui-date-body-bg)] text-[color:var(--ui-text)] ${i}`, children: [
    /* @__PURE__ */ M("div", { className: "flex items-center justify-between px-3 py-2 border-b bg-[var(--ui-date-header-bg)] text-[color:var(--ui-date-header-text)] border-[color:var(--ui-border)]", children: [
      /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => m === "months" ? w(-1) : I(-1),
          style: j,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": m === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ p(sl, { style: R })
        }
      ),
      m === "days" ? /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => g("months"),
          "aria-label": "Select year and month",
          className: "text-sm font-semibold rounded px-2 py-0.5 transition-colors text-[color:var(--ui-date-header-text)] hover:bg-[var(--ui-date-header-hover)]",
          children: new Date(u, f).toLocaleString("default", { month: "long", year: "numeric" })
        }
      ) : /* @__PURE__ */ p(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          "aria-label": "Year",
          value: x ?? String(u),
          onChange: (Q) => y(Q.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: (Q) => Q.target.select(),
          onBlur: F,
          onKeyDown: (Q) => {
            Q.key === "Enter" && (Q.preventDefault(), F()), Q.key === "Escape" && y(null);
          },
          style: { width: J },
          className: "text-sm text-center font-semibold rounded outline-none py-0.5 bg-[var(--ui-date-header-hover)] text-[color:var(--ui-date-header-text)]"
        }
      ),
      /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => m === "months" ? w(1) : I(1),
          style: j,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": m === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ p(or, { style: R })
        }
      )
    ] }),
    m === "months" ? /* @__PURE__ */ M("div", { children: [
      /* @__PURE__ */ p("div", { className: "grid grid-cols-3 text-center", children: Sa.map((Q, U) => /* @__PURE__ */ M(
        "button",
        {
          type: "button",
          onClick: () => {
            h(U), g("days");
          },
          style: W,
          className: `relative font-medium transition-colors border-b border-[color:var(--ui-border)] ${U === f ? ue : Te}`,
          children: [
            Q,
            $(U) && /* @__PURE__ */ p("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${U === f ? "bg-[var(--ui-date-selected-text)]" : "bg-[var(--ui-accent-solid)]"}` })
          ]
        },
        Q
      )) }),
      /* @__PURE__ */ p("div", { className: "text-center border-t border-[color:var(--ui-border)]", children: /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => {
            d(a.getFullYear()), h(a.getMonth()), g("days");
          },
          style: { paddingTop: K, paddingBottom: K, fontSize: V },
          className: "px-3 font-semibold rounded transition-colors text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-card-hover)]",
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ M("div", { className: "grid grid-cols-7 text-center", children: [
      ka.map((Q) => /* @__PURE__ */ p("div", { style: _, className: "font-semibold uppercase tracking-wider border-b text-[color:var(--ui-text-faint)] border-[color:var(--ui-border)]", children: Q }, Q)),
      C.map((Q) => Q.empty ? /* @__PURE__ */ p("div", {}, Q.key) : /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => A(Q.key),
          style: q,
          className: `font-medium transition-colors border-b border-[color:var(--ui-border)] ${z.has(Q.key) ? ue : Te}`,
          children: Q.day
        },
        Q.key
      ))
    ] }),
    r && n.length > 0 && /* @__PURE__ */ M("div", { className: "px-3 py-2 border-t border-[color:var(--ui-border)] bg-[var(--ui-date-footer-bg)]", children: [
      /* @__PURE__ */ M("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-[color:var(--ui-text-muted)]", children: [
        n.length,
        " date",
        n.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ p("div", { className: "flex flex-wrap gap-1", children: n.map((Q) => {
        const U = /* @__PURE__ */ new Date(Q + "T00:00:00"), $e = U.getFullYear() === a.getFullYear() ? U.toLocaleString("default", { month: "short", day: "numeric" }) : U.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ M(
          "button",
          {
            type: "button",
            onClick: () => A(Q),
            "aria-label": `Remove ${$e}`,
            style: fe,
            className: "inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors bg-[var(--ui-date-chip-bg)] text-[color:var(--ui-date-chip-text)] hover:bg-[var(--ui-date-chip-hover-bg)]",
            children: [
              $e,
              /* @__PURE__ */ p("span", { className: "leading-none text-[color:var(--ui-text-muted)]", "aria-hidden": "true", children: "×" })
            ]
          },
          Q
        );
      }) })
    ] })
  ] });
}
function Wf({
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
  theme: d,
  className: f = ""
}) {
  const h = (C) => e instanceof Set ? e.has(C) : e.includes(C), m = Ce(), g = O(12, 16, m), x = O(8, 12, m), y = O(12, 14, m), z = O(16, 20, m), A = r != null || i != null;
  return /* @__PURE__ */ M("div", { className: f, ...d ? { "data-theme": d } : {}, children: [
    A && /* @__PURE__ */ M("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ p("span", { className: "ui-checklist-title", children: r }),
      i != null && /* @__PURE__ */ p("button", { type: "button", disabled: c, onClick: i, className: "ui-checklist-toggleall", children: s ?? (o ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ M(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${c ? "ui-checklist-disabled" : ""}`,
        style: a ? { maxHeight: a, overflowY: "auto" } : void 0,
        children: [
          n.map((C) => {
            const w = h(C.id), I = /* @__PURE__ */ p(ai, { checked: w, size: z });
            return /* @__PURE__ */ M(
              "button",
              {
                type: "button",
                disabled: c,
                onClick: () => t(C.id),
                "aria-pressed": w,
                className: `ui-checklist-item ${w ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${x}px ${g}px`, fontSize: y },
                ...C.dataProps,
                children: [
                  u === "leading" && I,
                  C.leading != null && /* @__PURE__ */ p("span", { className: "ui-checklist-leading", children: C.leading }),
                  /* @__PURE__ */ p("span", { className: "ui-checklist-label", children: C.label }),
                  C.secondary != null && /* @__PURE__ */ p("span", { className: "ui-checklist-secondary", children: C.secondary }),
                  u === "trailing" && /* @__PURE__ */ p("span", { className: "ml-auto flex shrink-0", children: I })
                ]
              },
              C.id
            );
          }),
          n.length === 0 && /* @__PURE__ */ p("div", { className: "ui-checklist-empty", children: l })
        ]
      }
    )
  ] });
}
function qf({
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
  const u = Ce(), d = s ? 10 : O(12, 16, u), f = s ? 6 : O(8, 12, u), h = s ? 12 : O(12, 14, u), m = s ? 14 : O(16, 20, u);
  return /* @__PURE__ */ M("div", { className: c, ...a ? { "data-theme": a } : {}, children: [
    r != null && /* @__PURE__ */ p("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ p("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ M(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${l ? "ui-checklist-disabled" : ""}`,
        style: o ? { maxHeight: o, overflowY: "auto" } : void 0,
        children: [
          n.map((g) => {
            const x = e === g.id;
            return /* @__PURE__ */ M(
              "button",
              {
                type: "button",
                disabled: l,
                onClick: () => t(g.id),
                className: `ui-checklist-item ${x ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${f}px ${d}px`, fontSize: h },
                children: [
                  /* @__PURE__ */ p("span", { className: "ui-radio-circle", style: { width: m, height: m }, "aria-hidden": !0, children: x && /* @__PURE__ */ p("span", { className: "ui-radio-dot" }) }),
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
const Jf = ({
  className: n,
  children: e,
  reference: t,
  placement: r = "top",
  anchorMode: i = "visible",
  offset: o = 8
}) => {
  const s = Fn(), { refs: l, floatingStyles: a } = gl({
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
          const d = c.rects.reference, f = Math.max(d.x, 0), h = Math.max(d.y, 0), m = Math.min(d.x + d.width, u.innerWidth), g = Math.min(d.y + d.height, u.innerHeight);
          if (m <= f || g <= h) return {};
          const x = r === "left" ? m - (d.x + d.width) : r === "right" ? f - d.x : 0, y = r === "top" ? h - d.y : r === "bottom" ? g - (d.y + d.height) : 0;
          return { x: c.x + x, y: c.y + y };
        }
      },
      ho(o),
      po({ padding: 8 }),
      mo({ padding: 8 }),
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
          const d = c.rects.floating.width, f = c.rects.floating.height, h = Math.max(8, Math.min(c.x, u.innerWidth - d - 8)), m = Math.max(8, Math.min(c.y, u.innerHeight - f - 8));
          return { x: h, y: m };
        }
      }
    ],
    whileElementsMounted: yl
  });
  return ft(() => {
    t && l.setReference(t);
  }, [t, l]), /* @__PURE__ */ M(Xe, { children: [
    !t && /* @__PURE__ */ p("div", { ref: l.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    s && gr(
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
function Ta(n, e) {
  if (!e || !Le.isValidElement(n)) return {};
  const t = n.props;
  if (t["aria-label"] || t.title) return {};
  const r = t.children;
  if (typeof r == "string" ? r.trim().length > 0 : Array.isArray(r) ? r.some((s) => typeof s == "string" && s.trim().length > 0) : !1) return {};
  const o = e.split(`
`)[0].replace(/^•\s*/, "").trim().slice(0, 80);
  return o ? { "aria-label": o } : {};
}
const sn = ({ content: n, children: e }) => {
  const t = It(), r = Ce(), i = O(10, 12, r), o = O(6, 6, r), s = O(10, 12, r), l = { padding: `${o}px ${i}px`, fontSize: s }, a = xn(), c = Fn(), [u, d] = ne(!1), [f, h] = ne({ x: 0, y: 0 }), m = N(null), g = N(null), x = () => {
    if (!m.current) return;
    const A = m.current.getBoundingClientRect();
    h({ x: A.left + A.width / 2, y: A.top });
  };
  oe(() => () => {
    g.current && clearTimeout(g.current);
  }, []), oe(() => (u && c && (x(), c.addEventListener("scroll", x, !0)), () => c == null ? void 0 : c.removeEventListener("scroll", x, !0)), [u]);
  const y = Ta(e, n), z = Object.keys(y).length > 0 ? Le.cloneElement(e, y) : e;
  return /* @__PURE__ */ M(
    "div",
    {
      ref: m,
      className: "inline-flex",
      onMouseEnter: () => {
        g.current && clearTimeout(g.current), x(), d(!0);
      },
      onMouseLeave: () => {
        g.current = setTimeout(() => d(!1), 60);
      },
      children: [
        z,
        u && gr(
          /* @__PURE__ */ M(
            "div",
            {
              "data-mode": t == null ? void 0 : t.mode,
              "data-accent": t == null ? void 0 : t.accent,
              className: "ui-tooltip fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-[color:var(--ui-tooltip-border)] bg-[var(--ui-tooltip-bg)] text-[color:var(--ui-tooltip-text)] pointer-events-none",
              style: { ...l, left: f.x, top: f.y - 4, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                n.split(`
• `).map((A, C) => /* @__PURE__ */ p("div", { className: C > 0 ? "mt-0.5 pt-0.5 border-t border-[color:var(--ui-tooltip-sep)]" : "", children: A }, C)),
                /* @__PURE__ */ p("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[color:var(--ui-tooltip-bg)]" })
              ]
            }
          ),
          a ?? document.body
        )
      ]
    }
  );
}, Ea = 250;
function Ma(n, e, t) {
  const [r, i] = Le.useState(null), [o, s] = Le.useState(!1), l = Le.useRef(null), a = Le.useRef(t);
  a.current = t;
  const c = Le.useCallback(() => {
    var f;
    const d = (f = e.current) == null ? void 0 : f[a.current];
    d && i({ left: d.offsetLeft, width: d.offsetWidth });
  }, [e]);
  Le.useLayoutEffect(() => {
    c();
  }, [t, c]), Le.useLayoutEffect(() => {
    const d = n.current;
    if (!d) return;
    const f = () => {
      s(!0), l.current && clearTimeout(l.current), l.current = setTimeout(() => s(!1), Ea), c();
    }, h = new ResizeObserver(f);
    h.observe(d);
    for (const m of e.current ?? []) m && h.observe(m);
    return () => {
      h.disconnect(), l.current && (clearTimeout(l.current), l.current = null);
    };
  }, [n, e, c]);
  const u = Le.useMemo(
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
function kr() {
  const n = Ce(), e = ze, t = e ? O(28, 40, n) : 28, r = e ? O(28, 40, n) : 28, i = e ? O(10, 14, n) : 10, o = e ? O(10, 14, n) : 10, s = e ? O(8, 10, n) : 8;
  return {
    toggle: { width: t, height: t },
    control: { height: r, padding: `0 ${i}px`, fontSize: o },
    input: { height: r, padding: `0 ${s}px`, fontSize: o }
  };
}
const Kf = ze ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", Ra = ze ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", Vn = ze ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", Ia = "hover:bg-red-950/50", Vf = ze ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", Yf = "bg-[var(--ui-accent-selected-bg)] border-[var(--ui-border-strong)] text-[color:var(--ui-accent-selected-text)]", Uf = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", Aa = ze ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", Gf = ze ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50", _o = ze ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", za = "inline-flex rounded overflow-hidden border border-[var(--ui-border-strong)]", $a = ze ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", Yn = ({ onClick: n, disabled: e, title: t, className: r = Ra, children: i }) => {
  const o = kr();
  return /* @__PURE__ */ p(sn, { content: t, children: /* @__PURE__ */ p("button", { onClick: n, disabled: e, "aria-label": t, style: o.control, className: `${r} ${e ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) });
}, Un = {
  wrap: "border-[color:var(--ui-border-strong)] bg-[var(--ui-seg-track-bg)]",
  pill: "bg-[var(--ui-seg-pill)]",
  active: "text-[color:var(--ui-accent-pill-text)]",
  idle: "text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-seg-hover)]"
}, Xf = ({ value: n, options: e, onChange: t, disabled: r, active: i, stretch: o, dense: s, variant: l = "chrome", theme: a, tablist: c, ariaLabel: u }) => {
  const d = It(), f = a ?? ql(d), h = a === "blue" || a === "emerald" ? a : (d == null ? void 0 : d.accent) ?? "zinc", m = { "data-mode": f === "dark" ? "dark" : "light", "data-accent": h }, g = kr(), x = s && !ze ? 24 : g.control.height, y = Bt({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), z = ze ? y : { padding: "0 12px", fontSize: 12, height: s ? 20 : 30 }, A = ($) => i ? i($) : n === $, C = Le.useRef(null), w = Le.useRef([]), I = Math.max(0, e.findIndex(($) => A($.v))), F = Ma(C, w, I);
  return l === "track" ? /* @__PURE__ */ M(
    "div",
    {
      ref: C,
      role: c ? "tablist" : "group",
      "aria-label": u,
      ...m,
      className: `relative inline-flex items-center rounded border p-0.5 ${o ? "w-full" : ""} ${Un.wrap}`,
      children: [
        F.style && /* @__PURE__ */ p(
          "span",
          {
            "aria-hidden": !0,
            className: `absolute rounded ${Un.pill} ${F.motionClass}`,
            style: { ...F.style, top: 2, bottom: 2 }
          }
        ),
        e.map(($, S) => {
          const G = A($.v);
          return /* @__PURE__ */ M(
            "button",
            {
              ref: (E) => {
                w.current[S] = E;
              },
              ...$.dataProps,
              type: "button",
              disabled: r,
              onClick: () => t($.v),
              title: $.title,
              role: c ? "tab" : void 0,
              "aria-selected": c ? G : void 0,
              "aria-pressed": c ? void 0 : G,
              "aria-label": $.ariaLabel ?? ($.l ? void 0 : $.title),
              style: z,
              className: `relative z-10 inline-flex cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap rounded font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${o ? "flex-1" : ""} ${G ? Un.active : Un.idle}`,
              children: [
                $.icon,
                $.l
              ]
            },
            $.v
          );
        })
      ]
    }
  ) : /* @__PURE__ */ M("div", { ref: C, className: `relative ${za} bg-[var(--ui-seg-track-bg)]${o ? " w-full" : ""}`, children: [
    F.style && /* @__PURE__ */ p(
      "span",
      {
        "aria-hidden": !0,
        className: `absolute bg-[var(--ui-accent-pill-bg)] ${F.motionClass}`,
        style: { ...F.style, top: 0, bottom: 0 }
      }
    ),
    e.map(($, S) => {
      const G = A($.v);
      return /* @__PURE__ */ M(
        "button",
        {
          ref: (E) => {
            w.current[S] = E;
          },
          ...$.dataProps,
          disabled: r,
          onClick: () => t($.v),
          title: $.title,
          style: { ...g.control, height: x },
          className: `relative z-10 font-medium transition-colors disabled:opacity-30 ${o ? "flex-1" : ""} ${G ? "text-[color:var(--ui-accent-pill-text)]" : "text-[color:var(--ui-text-muted)] hover:bg-[var(--ui-accent-hover-bg)]"} ${$.v !== e[e.length - 1].v ? "border-r border-[var(--ui-border)]" : ""}`,
          children: [
            $.icon,
            $.l
          ]
        },
        $.v
      );
    })
  ] });
}, Qf = ({ children: n }) => /* @__PURE__ */ M("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ p("span", { className: ze ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: n }),
  /* @__PURE__ */ p("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), Da = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", Oa = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", Zf = ({ label: n, children: e, tall: t }) => /* @__PURE__ */ M("div", { className: t ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  n && /* @__PURE__ */ p("span", { className: t ? Da : Oa, children: n }),
  e
] }), eh = ({ leading: n, trailing: e, className: t = "" }) => /* @__PURE__ */ M("div", { className: `flex flex-wrap items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-0 ${t}`, children: [
  n,
  e && /* @__PURE__ */ p("div", { className: "ml-auto flex flex-wrap items-center justify-end gap-1", children: e })
] }), th = ({ readOnly: n, onDuplicate: e, onRemove: t, onMove: r, compact: i }) => (
  // One unbreakable cluster: when a header's trailing wraps, the move pair and
  // the duplicate/delete pair stay together (no orphaned icons on a line).
  /* @__PURE__ */ M("div", { className: "flex items-center gap-1 shrink-0", children: [
    /* @__PURE__ */ p(Yn, { onClick: () => r(-1), disabled: n, title: "Move up", className: Vn, children: /* @__PURE__ */ p(ll, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ p(Yn, { onClick: () => r(1), disabled: n, title: "Move down", className: Vn, children: /* @__PURE__ */ p(al, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ p(Yn, { onClick: e, disabled: n, title: "Duplicate", className: Vn, children: /* @__PURE__ */ p(uo, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ p("div", { className: _o }),
    /* @__PURE__ */ p(Yn, { onClick: t, disabled: n, title: "Delete", className: `${Vn} ${Ia}`, children: /* @__PURE__ */ p(_r, { className: "w-2.5 h-2.5" }) })
  ] })
);
var Pi = Object.defineProperty, La = (n, e) => {
  let t = {};
  for (var r in n) Pi(t, r, {
    get: n[r],
    enumerable: !0
  });
  return Pi(t, Symbol.toStringTag, { value: "Module" }), t;
};
function Ke(n) {
  this.content = n;
}
Ke.prototype = {
  constructor: Ke,
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
    return i == -1 ? o.push(t || n, e) : (o[i + 1] = e, t && (o[i] = t)), new Ke(o);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(n) {
    var e = this.find(n);
    if (e == -1) return this;
    var t = this.content.slice();
    return t.splice(e, 2), new Ke(t);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(n, e) {
    return new Ke([n, e].concat(this.remove(n).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(n, e) {
    var t = this.remove(n).content.slice();
    return t.push(n, e), new Ke(t);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(n, e, t) {
    var r = this.remove(e), i = r.content.slice(), o = r.find(n);
    return i.splice(o == -1 ? i.length : o, 0, e, t), new Ke(i);
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
    return n = Ke.from(n), n.size ? new Ke(n.content.concat(this.subtract(n).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(n) {
    return n = Ke.from(n), n.size ? new Ke(this.subtract(n).content.concat(n.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(n) {
    var e = this;
    n = Ke.from(n);
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
Ke.from = function(n) {
  if (n instanceof Ke) return n;
  var e = [];
  if (n) for (var t in n) e.push(t, n[t]);
  return new Ke(e);
};
function jo(n, e, t) {
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
      return a && a < s.length && a < l.length && Jo(s.charCodeAt(a - 1)) && qo(s.charCodeAt(a)) && t--, t;
    }
    if (i.content.size || o.content.size) {
      let s = jo(i.content, o.content, t + 1);
      if (s != null)
        return s;
    }
    t += i.nodeSize;
  }
}
function Wo(n, e, t, r) {
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
      let c = s.text, u = l.text, d = c.length, f = u.length;
      for (; d > 0 && f > 0 && c[d - 1] == u[f - 1]; )
        d--, f--, t--, r--;
      return d && f && d < c.length && Jo(c.charCodeAt(d - 1)) && qo(c.charCodeAt(d)) && (t++, r++), { a: t, b: r };
    }
    if (s.content.size || l.content.size) {
      let c = Wo(s.content, l.content, t - 1, r - 1);
      if (c)
        return c;
    }
    t -= a, r -= a;
  }
}
function qo(n) {
  return n >= 56320 && n < 57344;
}
function Jo(n) {
  return n >= 55296 && n < 56320;
}
class H {
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
    return new H(i, this.size + e.size);
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
    return new H(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, t) {
    return e == t ? H.empty : e == 0 && t == this.content.length ? this : new H(this.content.slice(e, t));
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
    return i[e] = t, new H(i, o);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new H([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new H(this.content.concat(e), this.size + e.nodeSize);
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
    return jo(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, r = e.size) {
    return Wo(this, e, t, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e) {
    if (e == 0)
      return Gn(0, e);
    if (e == this.size)
      return Gn(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let t = 0, r = 0; ; t++) {
      let i = this.child(t), o = r + i.nodeSize;
      if (o >= e)
        return o == e ? Gn(t + 1, o) : Gn(t, r);
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
      return H.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return H.fromArray(t.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return H.empty;
    let t, r = 0;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      r += o.nodeSize, i && o.isText && e[i - 1].sameMarkup(o) ? (t || (t = e.slice(0, i)), t[t.length - 1] = o.withText(t[t.length - 1].text + o.text)) : t && t.push(o);
    }
    return new H(t || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return H.empty;
    if (e instanceof H)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new H([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
H.empty = new H([], 0);
const $r = { index: 0, offset: 0 };
function Gn(n, e) {
  return $r.index = n, $r.offset = e, $r;
}
function ar(n, e) {
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
      if (!ar(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !ar(n[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in n))
        return !1;
  }
  return !0;
}
let Se = class Kr {
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
    return this == e || this.type == e.type && ar(this.attrs, e.attrs);
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
      return Kr.none;
    if (e instanceof Kr)
      return [e];
    let t = e.slice();
    return t.sort((r, i) => r.type.rank - i.type.rank), t;
  }
};
Se.none = [];
class zn extends Error {
}
class Z {
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
    let r = Vo(this.content, e + this.openStart, t, this.openStart + 1, this.openEnd + 1);
    return r && new Z(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new Z(Ko(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
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
      return Z.empty;
    let r = t.openStart || 0, i = t.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new Z(H.fromJSON(e, t.content), r, i);
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
    return new Z(e, r, i);
  }
}
Z.empty = new Z(H.empty, 0, 0);
function Ko(n, e, t) {
  let { index: r, offset: i } = n.findIndex(e), o = n.maybeChild(r), { index: s, offset: l } = n.findIndex(t);
  if (i == e || o.isText) {
    if (l != t && !n.child(s).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != s)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, o.copy(Ko(o.content, e - i - 1, t - i - 1)));
}
function Vo(n, e, t, r, i, o) {
  let { index: s, offset: l } = n.findIndex(e), a = n.maybeChild(s);
  if (l == e || a.isText)
    return o && r <= 0 && i <= 0 && !o.canReplace(s, s, t) ? null : n.cut(0, e).append(t).append(n.cut(e));
  let c = Vo(a.content, e - l - 1, t, s == 0 ? r - 1 : 0, s == n.childCount - 1 ? i - 1 : 0, a);
  return c && n.replaceChild(s, a.copy(c));
}
function Pa(n, e, t) {
  if (t.openStart > n.depth)
    throw new zn("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new zn("Inconsistent open depths");
  return Yo(n, e, t, 0);
}
function Yo(n, e, t, r) {
  let i = n.index(r), o = n.node(r);
  if (i == e.index(r) && r < n.depth - t.openStart) {
    let s = Yo(n, e, t, r + 1);
    return o.copy(o.content.replaceChild(i, s));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let s = n.parent, l = s.content;
      return Yt(s, l.cut(0, n.parentOffset).append(t.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: s, end: l } = Ba(t, n);
      return Yt(o, Go(n, s, l, e, r));
    }
  else return Yt(o, cr(n, e, r));
}
function Uo(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new zn("Cannot join " + e.type.name + " onto " + n.type.name);
}
function Vr(n, e, t) {
  let r = n.node(t);
  return Uo(r, e.node(t)), r;
}
function Vt(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t]) ? e[t] = n.withText(e[t].text + n.text) : e.push(n);
}
function Mn(n, e, t, r) {
  let i = (e || n).node(t), o = 0, s = e ? e.index(t) : i.childCount;
  n && (o = n.index(t), n.depth > t ? o++ : n.textOffset && (Vt(n.nodeAfter, r), o++));
  for (let l = o; l < s; l++)
    Vt(i.child(l), r);
  e && e.depth == t && e.textOffset && Vt(e.nodeBefore, r);
}
function Yt(n, e) {
  if (!n.type.validContent(e))
    throw new zn("Invalid content for node " + n.type.name);
  return n.copy(e);
}
function Go(n, e, t, r, i) {
  let o = n.depth > i && Vr(n, e, i + 1), s = r.depth > i && Vr(t, r, i + 1), l = [];
  return Mn(null, n, i, l), o && s && e.index(i) == t.index(i) ? (Uo(o, s), Vt(Yt(o, Go(n, e, t, r, i + 1)), l)) : (o && Vt(Yt(o, cr(n, e, i + 1)), l), Mn(e, t, i, l), s && Vt(Yt(s, cr(t, r, i + 1)), l)), Mn(r, null, i, l), new H(l);
}
function cr(n, e, t) {
  let r = [];
  if (Mn(null, n, t, r), n.depth > t) {
    let i = Vr(n, e, t + 1);
    Vt(Yt(i, cr(n, e, t + 1)), r);
  }
  return Mn(e, null, t, r), new H(r);
}
function Ba(n, e) {
  let t = e.depth - n.openStart, i = e.node(t).copy(n.content);
  for (let o = t - 1; o >= 0; o--)
    i = e.node(o).copy(H.from(i));
  return {
    start: i.resolveNoCache(n.openStart + t),
    end: i.resolveNoCache(i.content.size - n.openEnd - t)
  };
}
class $n {
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
      return Se.none;
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
        return new ur(this, e, r);
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
    return new $n(t, r, o);
  }
  /**
  @internal
  */
  static resolveCached(e, t) {
    let r = Bi.get(e);
    if (r)
      for (let o = 0; o < r.elts.length; o++) {
        let s = r.elts[o];
        if (s.pos == t)
          return s;
      }
    else
      Bi.set(e, r = new Fa());
    let i = r.elts[r.i] = $n.resolve(e, t);
    return r.i = (r.i + 1) % Ha, i;
  }
}
class Fa {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const Ha = 12, Bi = /* @__PURE__ */ new WeakMap();
class ur {
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
const _a = /* @__PURE__ */ Object.create(null);
let un = class Yr {
  /**
  @internal
  */
  constructor(e, t, r, i = Se.none) {
    this.type = e, this.attrs = t, this.marks = i, this.content = r || H.empty;
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
    return this.type == e && ar(this.attrs, t || e.defaultAttrs || _a) && Se.sameSet(this.marks, r || Se.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new Yr(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new Yr(this.type, this.attrs, this.content, e);
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
      return Z.empty;
    let i = this.resolve(e), o = this.resolve(t), s = r ? 0 : i.sharedDepth(t), l = i.start(s), c = i.node(s).content.cut(i.pos - l, o.pos - l);
    return new Z(c, i.depth - s, o.depth - s);
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
    return Pa(this.resolve(e), this.resolve(t), r);
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
    return $n.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return $n.resolve(this, e);
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
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), Xo(this.marks, e);
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
  canReplace(e, t, r = H.empty, i = 0, o = r.childCount) {
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
    this.type.checkContent(this.content), Fi(this.type.attrs, this.attrs, "node", this.type.name);
    let e = Se.none;
    for (let t = 0; t < this.marks.length; t++) {
      let r = this.marks[t];
      Fi(r.type.attrs, r.attrs, "mark", r.type.name), e = r.addToSet(e);
    }
    if (!Se.sameSet(e, this.marks))
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
    let i = H.fromJSON(e, t.content);
    return e.nodeType(t.type).create(t.attrs, i, r);
  }
};
un.prototype.text = void 0;
class dr extends un {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    if (super(e, t, null, i), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : Xo(this.marks, JSON.stringify(this.text));
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
    return e == this.marks ? this : new dr(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new dr(this.type, this.attrs, e, this.marks);
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
function Xo(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    e = n[t].type.name + "(" + e + ")";
  return e;
}
function Fi(n, e, t, r) {
  for (let i in e)
    if (!(i in n))
      throw new RangeError(`Unsupported attribute ${i} for ${t} of type ${r}`);
  for (let i in n)
    n[i].validate && n[i].validate(e[i]);
}
class Xt {
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
    let r = new ja(e, t);
    if (r.next == null)
      return Xt.empty;
    let i = Qo(r);
    r.next && r.err("Unexpected trailing text");
    let o = Ua(Ya(i));
    return Ga(o, r), o;
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
        return H.from(l.map((c) => c.createAndFill()));
      for (let c = 0; c < s.next.length; c++) {
        let { type: u, next: d } = s.next[c];
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
Xt.empty = new Xt(!0);
class ja {
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
function Qo(n) {
  let e = [];
  do
    e.push(Wa(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function Wa(n) {
  let e = [];
  do
    e.push(qa(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function qa(n) {
  let e = Va(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = Ja(n, e);
    else
      break;
  return e;
}
function Hi(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function Ja(n, e) {
  let t = Hi(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = Hi(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function Ka(n, e) {
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
function Va(n) {
  if (n.eat("(")) {
    let e = Qo(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = Ka(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function Ya(n) {
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
function Zo(n, e) {
  return e - n;
}
function _i(n, e) {
  let t = [];
  return r(e), t.sort(Zo);
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
function Ua(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(_i(n, 0));
  function t(r) {
    let i = [];
    r.forEach((s) => {
      n[s].forEach(({ term: l, to: a }) => {
        if (!l)
          return;
        let c;
        for (let u = 0; u < i.length; u++)
          i[u][0] == l && (c = i[u][1]);
        _i(n, a).forEach((u) => {
          c || i.push([l, c = []]), c.indexOf(u) == -1 && c.push(u);
        });
      });
    });
    let o = e[r.join(",")] = new Xt(r.indexOf(n.length - 1) > -1);
    for (let s = 0; s < i.length; s++) {
      let l = i[s][1].sort(Zo);
      o.next.push({ type: i[s][0], next: e[l.join(",")] || t(l) });
    }
    return o;
  }
}
function Ga(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let i = r[t], o = !i.validEnd, s = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: a, next: c } = i.next[l];
      s.push(a.name), o && !(a.isText || a.hasRequiredAttrs()) && (o = !1), r.indexOf(c) == -1 && r.push(c);
    }
    o && e.err("Only non-generatable nodes (" + s.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function es(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault)
      return null;
    e[t] = r.default;
  }
  return e;
}
function ts(n, e) {
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
function ns(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      t[r] = new Qa(n, r, e[r]);
  return t;
}
class fr {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = ns(e, r.attrs), this.defaultAttrs = es(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
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
    return this.contentMatch == Xt.empty;
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
    return !e && this.defaultAttrs ? this.defaultAttrs : ts(this.attrs, e);
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
    return new un(this, this.computeAttrs(e), H.from(t), Se.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = H.from(t), this.checkContent(t), new un(this, this.computeAttrs(e), t, Se.setFrom(r));
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
    if (e = this.computeAttrs(e), t = H.from(t), t.size) {
      let s = this.contentMatch.fillBefore(t);
      if (!s)
        return null;
      t = s.append(t);
    }
    let i = this.contentMatch.matchFragment(t), o = i && i.fillBefore(H.empty, !0);
    return o ? new un(this, e, t.append(o), Se.setFrom(r)) : null;
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
    return t ? t.length ? t : Se.none : e;
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null);
    e.forEach((o, s) => r[o] = new fr(o, t, s));
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
function Xa(n, e, t) {
  let r = t.split("|");
  return (i) => {
    let o = i === null ? "null" : typeof i;
    if (r.indexOf(o) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${n}, got ${o}`);
  };
}
class Qa {
  constructor(e, t, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? Xa(e, t, r.validate) : r.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class Sr {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    this.name = e, this.rank = t, this.schema = r, this.spec = i, this.attrs = ns(e, i.attrs), this.excluded = null;
    let o = es(this.attrs);
    this.instance = o ? new Se(this, o) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new Se(this, ts(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((o, s) => r[o] = new Sr(o, i++, t, s)), r;
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
class Za {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let i in e)
      t[i] = e[i];
    t.nodes = Ke.from(e.nodes), t.marks = Ke.from(e.marks || {}), this.nodes = fr.compile(this.spec.nodes, this), this.marks = Sr.compile(this.spec.marks, this);
    let r = /* @__PURE__ */ Object.create(null);
    for (let i in this.nodes) {
      if (i in this.marks)
        throw new RangeError(i + " can not be both a node and a mark");
      let o = this.nodes[i], s = o.spec.content || "", l = o.spec.marks;
      if (o.contentMatch = r[s] || (r[s] = Xt.parse(s, this.nodes)), o.inlineContent = o.contentMatch.inlineContent, o.spec.linebreakReplacement) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!o.isInline || !o.isLeaf)
          throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
        this.linebreakReplacement = o;
      }
      o.markSet = l == "_" ? null : l ? ji(this, l.split(" ")) : l == "" || !o.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let o = this.marks[i], s = o.spec.excludes;
      o.excluded = s == null ? [o] : s == "" ? [] : ji(this, s.split(" "));
    }
    this.nodeFromJSON = (i) => un.fromJSON(this, i), this.markFromJSON = (i) => Se.fromJSON(this, i), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
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
    else if (e instanceof fr) {
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
    return new dr(r, r.defaultAttrs, e, Se.setFrom(t));
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
function ji(n, e) {
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
function ec(n) {
  return n.tag != null;
}
function tc(n) {
  return n.style != null;
}
class dn {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, t) {
    this.schema = e, this.rules = t, this.tags = [], this.styles = [];
    let r = this.matchedStyles = [];
    t.forEach((i) => {
      if (ec(i))
        this.tags.push(i);
      else if (tc(i)) {
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
    let r = new qi(this, t, !1);
    return r.addAll(e, Se.none, t.from, t.to), r.finish();
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
    let r = new qi(this, t, !0);
    return r.addAll(e, Se.none, t.from, t.to), Z.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let o = this.tags[i];
      if (ic(e, o.tag) && (o.namespace === void 0 || e.namespaceURI == o.namespace) && (!o.context || t.matchesContext(o.context))) {
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
        r(s = Ji(s)), s.mark || s.ignore || s.clearMark || (s.mark = i);
      });
    }
    for (let i in e.nodes) {
      let o = e.nodes[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = Ji(s)), s.node || s.ignore || s.mark || (s.node = i);
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
    return e.cached.domParser || (e.cached.domParser = new dn(e, dn.schemaRules(e)));
  }
}
const rs = {
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
}, nc = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, is = { ol: !0, ul: !0 }, Dn = 1, Ur = 2, Rn = 4;
function Wi(n, e, t) {
  return e != null ? (e ? Dn : 0) | (e === "full" ? Ur : 0) : n && n.whitespace == "pre" ? Dn | Ur : t & ~Rn;
}
class Xn {
  constructor(e, t, r, i, o, s) {
    this.type = e, this.attrs = t, this.marks = r, this.solid = i, this.options = s, this.content = [], this.activeMarks = Se.none, this.match = o || (s & Rn ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let t = this.type.contentMatch.fillBefore(H.from(e));
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
    if (!(this.options & Dn)) {
      let r = this.content[this.content.length - 1], i;
      if (r && r.isText && (i = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let o = r;
        r.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = o.withText(o.text.slice(0, o.text.length - i[0].length));
      }
    }
    let t = H.from(this.content);
    return !e && this.match && (t = t.append(this.match.fillBefore(H.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !rs.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class qi {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0, this.localPreserveWS = !1;
    let i = t.topNode, o, s = Wi(null, t.preserveWhitespace, 0) | (r ? Rn : 0);
    i ? o = new Xn(i.type, i.attrs, Se.none, !0, t.topMatch || i.type.contentMatch, s) : r ? o = new Xn(null, null, Se.none, !0, null, s) : o = new Xn(e.schema.topNodeType, null, Se.none, !0, null, s), this.nodes = [o], this.find = t.findPositions, this.needsBlock = !1;
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
    let r = e.nodeValue, i = this.top, o = i.options & Ur ? "full" : this.localPreserveWS || (i.options & Dn) > 0, { schema: s } = this.parser;
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
    is.hasOwnProperty(s) && this.parser.normalizeLists && rc(e);
    let a = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, r));
    e: if (a ? a.ignore : nc.hasOwnProperty(s))
      this.findInside(e), this.ignoreFallback(e, t);
    else if (!a || a.skip || a.closeParent) {
      a && a.closeParent ? this.open = Math.max(0, this.open - 1) : a && a.skip.nodeType && (e = a.skip);
      let c, u = this.needsBlock;
      if (rs.hasOwnProperty(s))
        o.content.length && o.content[0].isInline && this.open && (this.open--, o = this.top), c = !0, o.type || (this.needsBlock = !0);
      else if (!e.firstChild) {
        this.leafFallback(e, t);
        break e;
      }
      let d = a && a.skip ? t : this.readStyles(e, t);
      d && this.addAll(e, d), c && this.sync(o), this.needsBlock = u;
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
      let s = Se.none;
      for (let l of i.concat(e.marks))
        (o.type ? o.type.allowsMarkType(l.type) : Ki(l.type, e.type)) && (s = l.addToSet(s));
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
    let l = Wi(e, o, s.options);
    s.options & Rn && s.content.length == 0 && (l |= Rn);
    let a = Se.none;
    return r = r.filter((c) => (s.type ? s.type.allowsMarkType(c.type) : Ki(c.type, e)) ? (a = c.addToSet(a), !1) : !0), this.nodes.push(new Xn(e, t, a, i, null, l)), this.open++, r;
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
      this.localPreserveWS && (this.nodes[t].options |= Dn);
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
function rc(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && is.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function ic(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function Ji(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function Ki(n, e) {
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
const ss = 65535, ls = Math.pow(2, 16);
function oc(n, e) {
  return n + e * ls;
}
function Vi(n) {
  return n & ss;
}
function sc(n) {
  return (n - (n & ss)) / ls;
}
const as = 1, cs = 2, nr = 4, us = 8;
class Gr {
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
    return (this.delInfo & us) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (as | nr)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (cs | nr)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & nr) > 0;
  }
}
class lt {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, t = !1) {
    if (this.ranges = e, this.inverted = t, !e.length && lt.empty)
      return lt.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let t = 0, r = Vi(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + t + sc(e);
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
      let c = this.ranges[l + o], u = this.ranges[l + s], d = a + c;
      if (e <= d) {
        let f = c ? e == a ? -1 : e == d ? 1 : t : t, h = a + i + (f < 0 ? 0 : u);
        if (r)
          return h;
        let m = e == (t < 0 ? a : d) ? null : oc(l / 3, e - a), g = e == a ? cs : e == d ? as : nr;
        return (t < 0 ? e != a : e != d) && (g |= us), new Gr(h, g, m);
      }
      i += u - c;
    }
    return r ? e + i : new Gr(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, i = Vi(t), o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
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
    return new lt(this.ranges, !this.inverted);
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
    return e == 0 ? lt.empty : new lt(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
lt.empty = new lt([]);
class hr {
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
    return new hr(this._maps, this.mirror, e, t);
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
    let e = new hr();
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
    return r ? e : new Gr(e, i, null);
  }
}
const Dr = /* @__PURE__ */ Object.create(null);
class Ze {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return lt.empty;
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
    let r = Dr[t.stepType];
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
    if (e in Dr)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return Dr[e] = t, t.prototype.jsonID = e, t;
  }
}
class Be {
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
    return new Be(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new Be(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, t, r, i) {
    try {
      return Be.ok(e.replace(t, r, i));
    } catch (o) {
      if (o instanceof zn)
        return Be.fail(o.message);
      throw o;
    }
  }
}
function gi(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let o = n.child(i);
    o.content.size && (o = o.copy(gi(o.content, e, o))), o.isInline && (o = e(o, t, i)), r.push(o);
  }
  return H.fromArray(r);
}
class Lt extends Ze {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new Z(gi(t.content, (s, l) => !s.isAtom || !l.type.allowsMarkType(this.mark.type) ? s : s.mark(this.mark.addToSet(s.marks)), i), t.openStart, t.openEnd);
    return Be.fromReplace(e, this.from, this.to, o);
  }
  invert() {
    return new gt(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new Lt(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof Lt && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new Lt(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new Lt(t.from, t.to, e.markFromJSON(t.mark));
  }
}
Ze.jsonID("addMark", Lt);
class gt extends Ze {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new Z(gi(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
    return Be.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new Lt(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new gt(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof gt && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new gt(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new gt(t.from, t.to, e.markFromJSON(t.mark));
  }
}
Ze.jsonID("removeMark", gt);
class Pt extends Ze {
  /**
  Create a node mark step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return Be.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return Be.fromReplace(e, this.pos, this.pos + 1, new Z(H.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    if (t) {
      let r = this.mark.addToSet(t.marks);
      if (r.length == t.marks.length) {
        for (let i = 0; i < t.marks.length; i++)
          if (!t.marks[i].isInSet(r))
            return new Pt(this.pos, t.marks[i]);
        return new Pt(this.pos, this.mark);
      }
    }
    return new Qt(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Pt(t.pos, this.mark);
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
    return new Pt(t.pos, e.markFromJSON(t.mark));
  }
}
Ze.jsonID("addNodeMark", Pt);
class Qt extends Ze {
  /**
  Create a mark-removing step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return Be.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return Be.fromReplace(e, this.pos, this.pos + 1, new Z(H.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new Pt(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Qt(t.pos, this.mark);
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
    return new Qt(t.pos, e.markFromJSON(t.mark));
  }
}
Ze.jsonID("removeNodeMark", Qt);
class Pe extends Ze {
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
    return this.structure && Xr(e, this.from, this.to) ? Be.fail("Structure replace would overwrite content") : Be.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new lt([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new Pe(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let t = e.mapResult(this.to, -1), r = this.from == this.to && Pe.MAP_BIAS < 0 ? t : e.mapResult(this.from, 1);
    return r.deletedAcross && t.deletedAcross ? null : new Pe(r.pos, Math.max(r.pos, t.pos), this.slice, this.structure);
  }
  merge(e) {
    if (!(e instanceof Pe) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let t = this.slice.size + e.slice.size == 0 ? Z.empty : new Z(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new Pe(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? Z.empty : new Z(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new Pe(e.from, this.to, t, this.structure);
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
    return new Pe(t.from, t.to, Z.fromJSON(e, t.slice), !!t.structure);
  }
}
Pe.MAP_BIAS = 1;
Ze.jsonID("replace", Pe);
class qe extends Ze {
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
    if (this.structure && (Xr(e, this.from, this.gapFrom) || Xr(e, this.gapTo, this.to)))
      return Be.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return Be.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? Be.fromReplace(e, this.from, this.to, r) : Be.fail("Content does not fit in gap");
  }
  getMap() {
    return new lt([
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
    return new qe(this.from, this.from + this.slice.size + t, this.from + this.insert, this.from + this.insert + t, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), i = this.from == this.gapFrom ? t.pos : e.map(this.gapFrom, -1), o = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return t.deletedAcross && r.deletedAcross || i < t.pos || o > r.pos ? null : new qe(t.pos, r.pos, i, o, this.slice, this.insert, this.structure);
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
    return new qe(t.from, t.to, t.gapFrom, t.gapTo, Z.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
Ze.jsonID("replaceAround", qe);
function Xr(n, e, t) {
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
function lc(n, e, t, r) {
  let i = [], o = [], s, l;
  n.doc.nodesBetween(e, t, (a, c, u) => {
    if (!a.isInline)
      return;
    let d = a.marks;
    if (!r.isInSet(d) && u.type.allowsMarkType(r.type)) {
      let f = Math.max(c, e), h = Math.min(c + a.nodeSize, t), m = r.addToSet(d);
      for (let g = 0; g < d.length; g++)
        d[g].isInSet(m) || (s && s.to == f && s.mark.eq(d[g]) ? s.to = h : i.push(s = new gt(f, h, d[g])));
      l && l.to == f ? l.to = h : o.push(l = new Lt(f, h, r));
    }
  }), i.forEach((a) => n.step(a)), o.forEach((a) => n.step(a));
}
function ac(n, e, t, r) {
  let i = [], o = 0;
  n.doc.nodesBetween(e, t, (s, l) => {
    if (!s.isInline)
      return;
    o++;
    let a = null;
    if (r instanceof Sr) {
      let c = s.marks, u;
      for (; u = r.isInSet(c); )
        (a || (a = [])).push(u), c = u.removeFromSet(c);
    } else r ? r.isInSet(s.marks) && (a = [r]) : a = s.marks;
    if (a && a.length) {
      let c = Math.min(l + s.nodeSize, t);
      for (let u = 0; u < a.length; u++) {
        let d = a[u], f;
        for (let h = 0; h < i.length; h++) {
          let m = i[h];
          m.step == o - 1 && d.eq(i[h].style) && (f = m);
        }
        f ? (f.to = c, f.step = o) : i.push({ style: d, from: Math.max(l, e), to: c, step: o });
      }
    }
  }), i.forEach((s) => n.step(new gt(s.from, s.to, s.style)));
}
function yi(n, e, t, r = t.contentMatch, i = !0) {
  let o = n.doc.nodeAt(e), s = [], l = e + 1;
  for (let a = 0; a < o.childCount; a++) {
    let c = o.child(a), u = l + c.nodeSize, d = r.matchType(c.type);
    if (!d)
      s.push(new Pe(l, u, Z.empty));
    else {
      r = d;
      for (let f = 0; f < c.marks.length; f++)
        t.allowsMarkType(c.marks[f].type) || n.step(new gt(l, u, c.marks[f]));
      if (i && c.isText && t.whitespace != "pre") {
        let f, h = /\r?\n|\r/g, m;
        for (; f = h.exec(c.text); )
          m || (m = new Z(H.from(t.schema.text(" ", t.allowedMarks(c.marks))), 0, 0)), s.push(new Pe(l + f.index, l + f.index + f[0].length, m));
      }
    }
    l = u;
  }
  if (!r.validEnd) {
    let a = r.fillBefore(H.empty, !0);
    n.replace(l, l, new Z(a, 0, 0));
  }
  for (let a = s.length - 1; a >= 0; a--)
    n.step(s[a]);
}
function cc(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function bn(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth, i = 0, o = 0; ; --r) {
    let s = n.$from.node(r), l = n.$from.index(r) + i, a = n.$to.indexAfter(r) - o;
    if (r < n.depth && s.canReplace(l, a, t))
      return r;
    if (r == 0 || s.type.spec.isolating || !cc(s, l, a))
      break;
    l && (i = 1), a < s.childCount && (o = 1);
  }
  return null;
}
function uc(n, e, t) {
  let { $from: r, $to: i, depth: o } = e, s = r.before(o + 1), l = i.after(o + 1), a = s, c = l, u = H.empty, d = 0;
  for (let m = o, g = !1; m > t; m--)
    g || r.index(m) > 0 ? (g = !0, u = H.from(r.node(m).copy(u)), d++) : a--;
  let f = H.empty, h = 0;
  for (let m = o, g = !1; m > t; m--)
    g || i.after(m + 1) < i.end(m) ? (g = !0, f = H.from(i.node(m).copy(f)), h++) : c++;
  n.step(new qe(a, c, s, l, new Z(u.append(f), d, h), u.size - d, !0));
}
function ds(n, e, t = null, r = n) {
  let i = dc(n, e), o = i && fc(r, e);
  return o ? i.map(Yi).concat({ type: e, attrs: t }).concat(o.map(Yi)) : null;
}
function Yi(n) {
  return { type: n, attrs: null };
}
function dc(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.contentMatchAt(r).findWrapping(e);
  if (!o)
    return null;
  let s = o.length ? o[0] : e;
  return t.canReplaceWith(r, i, s) ? o : null;
}
function fc(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.child(r), s = e.contentMatch.findWrapping(o.type);
  if (!s)
    return null;
  let a = (s.length ? s[s.length - 1] : e).contentMatch;
  for (let c = r; a && c < i; c++)
    a = a.matchType(t.child(c).type);
  return !a || !a.validEnd ? null : s;
}
function hc(n, e, t) {
  let r = H.empty;
  for (let s = t.length - 1; s >= 0; s--) {
    if (r.size) {
      let l = t[s].type.contentMatch.matchFragment(r);
      if (!l || !l.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = H.from(t[s].type.create(t[s].attrs, r));
  }
  let i = e.start, o = e.end;
  n.step(new qe(i, o, i, o, new Z(r, 0, 0), t.length, !0));
}
function pc(n, e, t, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let o = n.steps.length;
  n.doc.nodesBetween(e, t, (s, l) => {
    let a = typeof i == "function" ? i(s) : i;
    if (s.isTextblock && !s.hasMarkup(r, a) && mc(n.doc, n.mapping.slice(o).map(l), r)) {
      let c = null;
      if (r.schema.linebreakReplacement) {
        let h = r.whitespace == "pre", m = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        h && !m ? c = !1 : !h && m && (c = !0);
      }
      c === !1 && hs(n, s, l, o), yi(n, n.mapping.slice(o).map(l, 1), r, void 0, c === null);
      let u = n.mapping.slice(o), d = u.map(l, 1), f = u.map(l + s.nodeSize, 1);
      return n.step(new qe(d, f, d + 1, f - 1, new Z(H.from(r.create(a, null, s.marks)), 0, 0), 1, !0)), c === !0 && fs(n, s, l, o), !1;
    }
  });
}
function fs(n, e, t, r) {
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
function hs(n, e, t, r) {
  e.forEach((i, o) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let s = n.mapping.slice(r).map(t + 1 + o);
      n.replaceWith(s, s + 1, e.type.schema.text(`
`));
    }
  });
}
function mc(n, e, t) {
  let r = n.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, t);
}
function gc(n, e, t, r, i) {
  let o = n.doc.nodeAt(e);
  if (!o)
    throw new RangeError("No node at given position");
  t || (t = o.type);
  let s = t.create(r, null, i || o.marks);
  if (o.isLeaf)
    return n.replaceWith(e, e + o.nodeSize, s);
  if (!t.validContent(o.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(new qe(e, e + o.nodeSize, e + 1, e + o.nodeSize - 1, new Z(H.from(s), 0, 0), 1, !0));
}
function Mt(n, e, t = 1, r) {
  let i = n.resolve(e), o = i.depth - t, s = r && r[r.length - 1] || i.parent;
  if (o < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !s.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
    return !1;
  for (let c = i.depth - 1, u = t - 2; c > o; c--, u--) {
    let d = i.node(c), f = i.index(c);
    if (d.type.spec.isolating)
      return !1;
    let h = d.content.cutByIndex(f, d.childCount), m = r && r[u + 1];
    m && (h = h.replaceChild(0, m.type.create(m.attrs)));
    let g = r && r[u] || d;
    if (!d.canReplace(f + 1, d.childCount) || !g.type.validContent(h))
      return !1;
  }
  let l = i.indexAfter(o), a = r && r[0];
  return i.node(o).canReplaceWith(l, l, a ? a.type : i.node(o + 1).type);
}
function yc(n, e, t = 1, r) {
  let i = n.doc.resolve(e), o = H.empty, s = H.empty;
  for (let l = i.depth, a = i.depth - t, c = t - 1; l > a; l--, c--) {
    o = H.from(i.node(l).copy(o));
    let u = r && r[c];
    s = H.from(u ? u.type.create(u.attrs, s) : i.node(l).copy(s));
  }
  n.step(new Pe(e, e, new Z(o.append(s), t, t), !0));
}
function Zt(n, e) {
  let t = n.resolve(e), r = t.index();
  return ps(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function xc(n, e) {
  e.content.size || n.type.compatibleContent(e.type);
  let t = n.contentMatchAt(n.childCount), { linebreakReplacement: r } = n.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let o = e.child(i), s = o.type == r ? n.type.schema.nodes.text : o.type;
    if (t = t.matchType(s), !t || !n.type.allowsMarks(o.marks))
      return !1;
  }
  return t.validEnd;
}
function ps(n, e) {
  return !!(n && e && !n.isLeaf && xc(n, e));
}
function Nr(n, e, t = -1) {
  let r = n.resolve(e);
  for (let i = r.depth; ; i--) {
    let o, s, l = r.index(i);
    if (i == r.depth ? (o = r.nodeBefore, s = r.nodeAfter) : t > 0 ? (o = r.node(i + 1), l++, s = r.node(i).maybeChild(l)) : (o = r.node(i).maybeChild(l - 1), s = r.node(i + 1)), o && !o.isTextblock && ps(o, s) && r.node(i).canReplace(l, l + 1))
      return e;
    if (i == 0)
      break;
    e = t < 0 ? r.before(i) : r.after(i);
  }
}
function bc(n, e, t) {
  let r = null, { linebreakReplacement: i } = n.doc.type.schema, o = n.doc.resolve(e - t), s = o.node().type;
  if (i && s.inlineContent) {
    let u = s.whitespace == "pre", d = !!s.contentMatch.matchType(i);
    u && !d ? r = !1 : !u && d && (r = !0);
  }
  let l = n.steps.length;
  if (r === !1) {
    let u = n.doc.resolve(e + t);
    hs(n, u.node(), u.before(), l);
  }
  s.inlineContent && yi(n, e + t - 1, s, o.node().contentMatchAt(o.index()), r == null);
  let a = n.mapping.slice(l), c = a.map(e - t);
  if (n.step(new Pe(c, a.map(e + t, -1), Z.empty, !0)), r === !0) {
    let u = n.doc.resolve(c);
    fs(n, u.node(), u.before(), n.steps.length);
  }
  return n;
}
function vc(n, e, t) {
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
function Cr(n, e, t = e, r = Z.empty) {
  if (e == t && !r.size)
    return null;
  let i = n.resolve(e), o = n.resolve(t);
  return ms(i, o, r) ? new Pe(e, t, r) : new wc(i, o, r).fit();
}
function ms(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class wc {
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.unplaced = r, this.frontier = [], this.placed = H.empty;
    for (let i = 0; i <= e.depth; i++) {
      let o = e.node(i);
      this.frontier.push({
        type: o.type,
        match: o.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = H.from(e.node(i).copy(this.placed));
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
    let a = new Z(o, s, l);
    return e > -1 ? new qe(r.pos, e, this.$to.pos, this.$to.end(), a, t) : a.size || r.pos != this.$to.pos ? new Pe(r.pos, i.pos, a) : null;
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
        r ? (o = Or(this.unplaced.content, r - 1).firstChild, i = o.content) : i = this.unplaced.content;
        let s = i.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: a, match: c } = this.frontier[l], u, d = null;
          if (t == 1 && (s ? c.matchType(s.type) || (d = c.fillBefore(H.from(s), !1)) : o && a.compatibleContent(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, inject: d };
          if (t == 2 && s && (u = c.findWrapping(s.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, wrap: u };
          if (o && c.matchType(o.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = Or(e, t);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new Z(e, t + 1, Math.max(r, i.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = Or(e, t);
    if (i.childCount <= 1 && t > 0) {
      let o = e.size - t <= t + i.size;
      this.unplaced = new Z(Tn(e, t - 1, 1), t - 1, o ? t - 1 : r);
    } else
      this.unplaced = new Z(Tn(e, t, 1), t, r);
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
    let s = this.unplaced, l = r ? r.content : s.content, a = s.openStart - e, c = 0, u = [], { match: d, type: f } = this.frontier[t];
    if (i) {
      for (let g = 0; g < i.childCount; g++)
        u.push(i.child(g));
      d = d.matchFragment(i);
    }
    let h = l.size + e - (s.content.size - s.openEnd);
    for (; c < l.childCount; ) {
      let g = l.child(c), x = d.matchType(g.type);
      if (!x)
        break;
      c++, (c > 1 || a == 0 || g.content.size) && (d = x, u.push(gs(g.mark(f.allowedMarks(g.marks)), c == 1 ? a : 0, c == l.childCount ? h : -1)));
    }
    let m = c == l.childCount;
    m || (h = -1), this.placed = En(this.placed, t, H.from(u)), this.frontier[t].match = d, m && h < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let g = 0, x = l; g < h; g++) {
      let y = x.lastChild;
      this.frontier.push({ type: y.type, match: y.contentMatchAt(y.childCount) }), x = y.content;
    }
    this.unplaced = m ? e == 0 ? Z.empty : new Z(Tn(s.content, e - 1, 1), e - 1, h < 0 ? s.openEnd : e - 1) : new Z(Tn(s.content, e, c), s.openStart, s.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !Lr(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
      let { match: r, type: i } = this.frontier[t], o = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), s = Lr(e, t, i, r, o);
      if (s) {
        for (let l = t - 1; l >= 0; l--) {
          let { match: a, type: c } = this.frontier[l], u = Lr(e, l, c, a, !0);
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
    t.fit.childCount && (this.placed = En(this.placed, t.depth, t.fit)), e = t.move;
    for (let r = t.depth + 1; r <= e.depth; r++) {
      let i = e.node(r), o = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, o);
    }
    return e;
  }
  openFrontierNode(e, t = null, r) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = En(this.placed, this.depth, H.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(H.empty, !0);
    t.childCount && (this.placed = En(this.placed, this.frontier.length, t));
  }
}
function Tn(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(Tn(n.firstChild.content, e - 1, t)));
}
function En(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(En(n.lastChild.content, e - 1, t)));
}
function Or(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function gs(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, gs(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(H.empty, !0)))), n.copy(r);
}
function Lr(n, e, t, r, i) {
  let o = n.node(e), s = i ? n.indexAfter(e) : n.index(e);
  if (s == o.childCount && !t.compatibleContent(o.type))
    return null;
  let l = r.fillBefore(o.content, !0, s);
  return l && !kc(t, o.content, s) ? l : null;
}
function kc(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function Sc(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function Nc(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let i = n.doc.resolve(e), o = n.doc.resolve(t);
  if (ms(i, o, r))
    return n.step(new Pe(e, t, r));
  let s = xs(i, o);
  s[s.length - 1] == 0 && s.pop();
  let l = -(i.depth + 1);
  s.unshift(l);
  for (let f = i.depth, h = i.pos - 1; f > 0; f--, h--) {
    let m = i.node(f).type.spec;
    if (m.defining || m.definingAsContext || m.isolating)
      break;
    s.indexOf(f) > -1 ? l = f : i.before(f) == h && s.splice(1, 0, -f);
  }
  let a = s.indexOf(l), c = [], u = r.openStart;
  for (let f = r.content, h = 0; ; h++) {
    let m = f.firstChild;
    if (c.push(m), h == r.openStart)
      break;
    f = m.content;
  }
  for (let f = u - 1; f >= 0; f--) {
    let h = c[f], m = Sc(h.type);
    if (m && !h.sameMarkup(i.node(Math.abs(l) - 1)))
      u = f;
    else if (m || !h.type.isTextblock)
      break;
  }
  for (let f = r.openStart; f >= 0; f--) {
    let h = (f + u + 1) % (r.openStart + 1), m = c[h];
    if (m)
      for (let g = 0; g < s.length; g++) {
        let x = s[(g + a) % s.length], y = !0;
        x < 0 && (y = !1, x = -x);
        let z = i.node(x - 1), A = i.index(x - 1);
        if (z.canReplaceWith(A, A, m.type, m.marks))
          return n.replace(i.before(x), y ? o.after(x) : t, new Z(ys(r.content, 0, r.openStart, h), h, r.openEnd));
      }
  }
  let d = n.steps.length;
  for (let f = s.length - 1; f >= 0 && (n.replace(e, t, r), !(n.steps.length > d)); f--) {
    let h = s[f];
    h < 0 || (e = i.before(h), t = o.after(h));
  }
}
function ys(n, e, t, r, i) {
  if (e < t) {
    let o = n.firstChild;
    n = n.replaceChild(0, o.copy(ys(o.content, e + 1, t, r, o)));
  }
  if (e > r) {
    let o = i.contentMatchAt(0), s = o.fillBefore(n).append(n);
    n = s.append(o.matchFragment(s).fillBefore(H.empty, !0));
  }
  return n;
}
function Cc(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = vc(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new Z(H.from(r), 0, 0));
}
function Tc(n, e, t) {
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
  let o = xs(r, i);
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
function xs(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let o = n.start(i);
    if (o < n.pos - (n.depth - i) || e.end(i) > e.pos + (e.depth - i) || n.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (o == e.start(i) || i == n.depth && i == e.depth && n.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == o - 1) && t.push(i);
  }
  return t;
}
class fn extends Ze {
  /**
  Construct an attribute step.
  */
  constructor(e, t, r) {
    super(), this.pos = e, this.attr = t, this.value = r;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return Be.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let o in t.attrs)
      r[o] = t.attrs[o];
    r[this.attr] = this.value;
    let i = t.type.create(r, null, t.marks);
    return Be.fromReplace(e, this.pos, this.pos + 1, new Z(H.from(i), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return lt.empty;
  }
  invert(e) {
    return new fn(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new fn(t.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number" || typeof t.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new fn(t.pos, t.attr, t.value);
  }
}
Ze.jsonID("attr", fn);
class On extends Ze {
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
    return Be.ok(r);
  }
  getMap() {
    return lt.empty;
  }
  invert(e) {
    return new On(this.attr, e.attrs[this.attr]);
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
    return new On(t.attr, t.value);
  }
}
Ze.jsonID("docAttr", On);
let mn = class extends Error {
};
mn = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
mn.prototype = Object.create(Error.prototype);
mn.prototype.constructor = mn;
mn.prototype.name = "TransformError";
class Ec {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new hr();
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
      throw new mn(t.failed);
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
  replace(e, t = e, r = Z.empty) {
    let i = Cr(this.doc, e, t, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, r) {
    return this.replace(e, t, new Z(H.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, t) {
    return this.replace(e, t, Z.empty);
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
    return Nc(this, e, t, r), this;
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
    return Cc(this, e, t, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return Tc(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return uc(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return bc(this, e, t), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, t) {
    return hc(this, e, t), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, t = e, r, i = null) {
    return pc(this, e, t, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, r = null, i) {
    return gc(this, e, t, r, i), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  The `pos` addresses the document content. Use `setDocAttribute`
  to set attributes on the document itself.
  */
  setNodeAttribute(e, t, r) {
    return this.step(new fn(e, t, r)), this;
  }
  /**
  Set a single attribute on the document to a new value.
  */
  setDocAttribute(e, t) {
    return this.step(new On(e, t)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(e, t) {
    return this.step(new Pt(e, t)), this;
  }
  /**
  Remove a mark (or all marks of the given type) from the node at
  position `pos`.
  */
  removeNodeMark(e, t) {
    let r = this.doc.nodeAt(e);
    if (!r)
      throw new RangeError("No node at position " + e);
    if (t instanceof Se)
      t.isInSet(r.marks) && this.step(new Qt(e, t));
    else {
      let i = r.marks, o, s = [];
      for (; o = t.isInSet(i); )
        s.push(new Qt(e, o)), i = o.removeFromSet(i);
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
    return yc(this, e, t, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, r) {
    return lc(this, e, t, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, r) {
    return ac(this, e, t, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, t, r) {
    return yi(this, e, t, r), this;
  }
}
const Pr = /* @__PURE__ */ Object.create(null);
class Ie {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, r) {
    this.$anchor = e, this.$head = t, this.ranges = r || [new Mc(e.min(t), e.max(t))];
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
  replace(e, t = Z.empty) {
    let r = t.content.lastChild, i = null;
    for (let l = 0; l < t.openEnd; l++)
      i = r, r = r.lastChild;
    let o = e.steps.length, s = this.ranges;
    for (let l = 0; l < s.length; l++) {
      let { $from: a, $to: c } = s[l], u = e.mapping.slice(o);
      e.replaceRange(u.map(a.pos), u.map(c.pos), l ? Z.empty : t), l == 0 && Xi(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
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
      o ? e.deleteRange(c, u) : (e.replaceRangeWith(c, u, t), Xi(e, r, t.isInline ? -1 : 1));
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
    let i = e.parent.inlineContent ? new ot(e) : ln(e.node(0), e.parent, e.pos, e.index(), t, r);
    if (i)
      return i;
    for (let o = e.depth - 1; o >= 0; o--) {
      let s = t < 0 ? ln(e.node(0), e.node(o), e.before(o + 1), e.index(o), t, r) : ln(e.node(0), e.node(o), e.after(o + 1), e.index(o) + 1, t, r);
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
    return this.findFrom(e, t) || this.findFrom(e, -t) || new yt(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return ln(e, e, 0, 0, 1) || new yt(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return ln(e, e, e.content.size, e.childCount, -1) || new yt(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = Pr[t.type];
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
    if (e in Pr)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return Pr[e] = t, t.prototype.jsonID = e, t;
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
    return ot.between(this.$anchor, this.$head).getBookmark();
  }
}
Ie.prototype.visible = !0;
class Mc {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let Ui = !1;
function Gi(n) {
  !Ui && !n.parent.inlineContent && (Ui = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class ot extends Ie {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    Gi(e), Gi(t), super(e, t);
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
      return Ie.near(r);
    let i = e.resolve(t.map(this.anchor));
    return new ot(i.parent.inlineContent ? i : r, r);
  }
  replace(e, t = Z.empty) {
    if (super.replace(e, t), t == Z.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof ot && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new Tr(this.anchor, this.head);
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
    return new ot(e.resolve(t.anchor), e.resolve(t.head));
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
      let o = Ie.findFrom(t, r, !0) || Ie.findFrom(t, -r, !0);
      if (o)
        t = o.$head;
      else
        return Ie.near(t, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = t : (e = (Ie.findFrom(e, -r, !0) || Ie.findFrom(e, r, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new ot(e, t);
  }
}
Ie.jsonID("text", ot);
class Tr {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new Tr(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return ot.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class Ne extends Ie {
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
    return r ? Ie.near(o) : new Ne(o);
  }
  content() {
    return new Z(H.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof Ne && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new xi(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new Ne(e.resolve(t.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, t) {
    return new Ne(e.resolve(t));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
Ne.prototype.visible = !1;
Ie.jsonID("node", Ne);
class xi {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new Tr(r, r) : new xi(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && Ne.isSelectable(r) ? new Ne(t) : Ie.near(t);
  }
}
class yt extends Ie {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = Z.empty) {
    if (t == Z.empty) {
      e.delete(0, e.doc.content.size);
      let r = Ie.atStart(e.doc);
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
    return new yt(e);
  }
  map(e) {
    return new yt(e);
  }
  eq(e) {
    return e instanceof yt;
  }
  getBookmark() {
    return Rc;
  }
}
Ie.jsonID("all", yt);
const Rc = {
  map() {
    return this;
  },
  resolve(n) {
    return new yt(n);
  }
};
function ln(n, e, t, r, i, o = !1) {
  if (e.inlineContent)
    return ot.create(n, t);
  for (let s = r - (i > 0 ? 0 : 1); i > 0 ? s < e.childCount : s >= 0; s += i) {
    let l = e.child(s);
    if (l.isAtom) {
      if (!o && Ne.isSelectable(l))
        return Ne.create(n, t - (i < 0 ? l.nodeSize : 0));
    } else {
      let a = ln(n, l, t + i, i < 0 ? l.childCount : 0, i, o);
      if (a)
        return a;
    }
    t += l.nodeSize * i;
  }
  return null;
}
function Xi(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e)
    return;
  let i = n.steps[r];
  if (!(i instanceof Pe || i instanceof qe))
    return;
  let o = n.mapping.maps[r], s;
  o.forEach((l, a, c, u) => {
    s == null && (s = u);
  }), n.setSelection(Ie.near(n.doc.resolve(s), t));
}
function Qi(n, e) {
  return !e || !n ? n : n.bind(e);
}
class Qn {
  constructor(e, t, r) {
    this.name = e, this.init = Qi(t.init, r), this.apply = Qi(t.apply, r);
  }
}
new Qn("doc", {
  init(n) {
    return n.doc || n.schema.topNodeType.createAndFill();
  },
  apply(n) {
    return n.doc;
  }
}), new Qn("selection", {
  init(n, e) {
    return n.selection || Ie.atStart(e.doc);
  },
  apply(n) {
    return n.selection;
  }
}), new Qn("storedMarks", {
  init(n) {
    return n.storedMarks || null;
  },
  apply(n, e, t, r) {
    return r.selection.$cursor ? n.storedMarks : null;
  }
}), new Qn("scrollToSelection", {
  init() {
    return 0;
  },
  apply(n, e) {
    return n.scrolledIntoView ? e + 1 : e;
  }
});
const bs = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function vs(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const ws = (n, e, t) => {
  let r = vs(n, t);
  if (!r)
    return !1;
  let i = bi(r);
  if (!i) {
    let s = r.blockRange(), l = s && bn(s);
    return l == null ? !1 : (e && e(n.tr.lift(s, l).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (Is(n, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (gn(o, "end") || Ne.isSelectable(o)))
    for (let s = r.depth; ; s--) {
      let l = Cr(n.doc, r.before(s), r.after(s), Z.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let a = n.tr.step(l);
          a.setSelection(gn(o, "end") ? Ie.findFrom(a.doc.resolve(a.mapping.map(i.pos, -1)), -1) : Ne.create(a.doc, i.pos - o.nodeSize)), e(a.scrollIntoView());
        }
        return !0;
      }
      if (s == 1 || r.node(s - 1).childCount > 1)
        break;
    }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos - o.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, Ic = (n, e, t) => {
  let r = vs(n, t);
  if (!r)
    return !1;
  let i = bi(r);
  return i ? ks(n, i, e) : !1;
}, Ac = (n, e, t) => {
  let r = Ns(n, t);
  if (!r)
    return !1;
  let i = vi(r);
  return i ? ks(n, i, e) : !1;
};
function ks(n, e, t) {
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
  let c = Cr(n.doc, o, a, Z.empty);
  if (!c || c.from != o || c instanceof Pe && c.slice.size >= a - o)
    return !1;
  if (t) {
    let u = n.tr.step(c);
    u.setSelection(ot.create(u.doc, o)), t(u.scrollIntoView());
  }
  return !0;
}
function gn(n, e, t = !1) {
  for (let r = n; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (t && r.childCount != 1)
      return !1;
  }
  return !1;
}
const Ss = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    o = bi(r);
  }
  let s = o && o.nodeBefore;
  return !s || !Ne.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(Ne.create(n.doc, o.pos - s.nodeSize)).scrollIntoView()), !0);
};
function bi(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function Ns(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const Cs = (n, e, t) => {
  let r = Ns(n, t);
  if (!r)
    return !1;
  let i = vi(r);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (Is(n, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (gn(o, "start") || Ne.isSelectable(o))) {
    let s = Cr(n.doc, r.before(), r.after(), Z.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let l = n.tr.step(s);
        l.setSelection(gn(o, "start") ? Ie.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : Ne.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos, i.pos + o.nodeSize).scrollIntoView()), !0) : !1;
}, Ts = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    o = vi(r);
  }
  let s = o && o.nodeAfter;
  return !s || !Ne.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(Ne.create(n.doc, o.pos)).scrollIntoView()), !0);
};
function vi(n) {
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
const zc = (n, e) => {
  let t = n.selection, r = t instanceof Ne, i;
  if (r) {
    if (t.node.isTextblock || !Zt(n.doc, t.from))
      return !1;
    i = t.from;
  } else if (i = Nr(n.doc, t.from, -1), i == null)
    return !1;
  if (e) {
    let o = n.tr.join(i);
    r && o.setSelection(Ne.create(o.doc, i - n.doc.resolve(i).nodeBefore.nodeSize)), e(o.scrollIntoView());
  }
  return !0;
}, $c = (n, e) => {
  let t = n.selection, r;
  if (t instanceof Ne) {
    if (t.node.isTextblock || !Zt(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = Nr(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, Dc = (n, e) => {
  let { $from: t, $to: r } = n.selection, i = t.blockRange(r), o = i && bn(i);
  return o == null ? !1 : (e && e(n.tr.lift(i, o).scrollIntoView()), !0);
}, Es = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function wi(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const Oc = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(r))
    return !1;
  let i = t.node(-1), o = t.indexAfter(-1), s = wi(i.contentMatchAt(o));
  if (!s || !i.canReplaceWith(o, o, s))
    return !1;
  if (e) {
    let l = t.after(), a = n.tr.replaceWith(l, l, s.createAndFill());
    a.setSelection(Ie.near(a.doc.resolve(l), 1)), e(a.scrollIntoView());
  }
  return !0;
}, Ms = (n, e) => {
  let t = n.selection, { $from: r, $to: i } = t;
  if (t instanceof yt || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = wi(i.parent.contentMatchAt(i.indexAfter()));
  if (!o || !o.isTextblock)
    return !1;
  if (e) {
    let s = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = n.tr.insert(s, o.createAndFill());
    l.setSelection(ot.create(l.doc, s + 1)), e(l.scrollIntoView());
  }
  return !0;
}, Rs = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let o = t.before();
    if (Mt(n.doc, o))
      return e && e(n.tr.split(o).scrollIntoView()), !0;
  }
  let r = t.blockRange(), i = r && bn(r);
  return i == null ? !1 : (e && e(n.tr.lift(r, i).scrollIntoView()), !0);
};
function Lc(n) {
  return (e, t) => {
    if (e.selection instanceof Ne && e.selection.node.isBlock) {
      let { $from: h } = e.selection;
      return !h.parentOffset || !Mt(e.doc, h.pos) ? !1 : (t && t(e.tr.split(h.pos).scrollIntoView()), !0);
    }
    if (!e.selection.$from.depth)
      return !1;
    let r = e.tr;
    !e.selection.empty && (e.selection instanceof ot || e.selection instanceof yt) && r.deleteSelection();
    let { $from: i } = r.selection, o = r.steps.length, s = [], l, a, c = !1, u = !1;
    for (let h = i.depth; ; h--)
      if (i.node(h).isBlock) {
        c = i.end(h) == i.pos + (i.depth - h), u = i.start(h) == i.pos - (i.depth - h), a = wi(i.node(h - 1).contentMatchAt(i.indexAfter(h - 1))), s.unshift(c && a ? { type: a } : null), l = h;
        break;
      } else {
        if (h == 1)
          return !1;
        s.unshift(null);
      }
    let d = i.pos, f = Mt(r.doc, d, s.length, s);
    if (f || (s[0] = a ? { type: a } : null, f = Mt(r.doc, d, s.length, s)), !f)
      return !1;
    if (r.split(d, s.length, s), !c && u && i.node(l).type != a) {
      let h = r.mapping.slice(o), m = h.map(i.before(l)), g = r.doc.resolve(m);
      a && i.node(l - 1).canReplaceWith(g.index(), g.index() + 1, a) && r.setNodeMarkup(h.map(i.before(l)), a);
    }
    return t && t(r.scrollIntoView()), !0;
  };
}
const Pc = Lc(), Bc = (n, e) => {
  let { $from: t, to: r } = n.selection, i, o = t.sharedDepth(r);
  return o == 0 ? !1 : (i = t.before(o), e && e(n.tr.setSelection(Ne.create(n.doc, i))), !0);
};
function Fc(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(o - 1, o) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || Zt(n.doc, e.pos)) ? !1 : (t && t(n.tr.join(e.pos).scrollIntoView()), !0);
}
function Is(n, e, t, r) {
  let i = e.nodeBefore, o = e.nodeAfter, s, l, a = i.type.spec.isolating || o.type.spec.isolating;
  if (!a && Fc(n, e, t))
    return !0;
  let c = !a && e.parent.canReplace(e.index(), e.index() + 1);
  if (c && (s = (l = i.contentMatchAt(i.childCount)).findWrapping(o.type)) && l.matchType(s[0] || o.type).validEnd) {
    if (t) {
      let h = e.pos + o.nodeSize, m = H.empty;
      for (let y = s.length - 1; y >= 0; y--)
        m = H.from(s[y].create(null, m));
      m = H.from(i.copy(m));
      let g = n.tr.step(new qe(e.pos - 1, h, e.pos, h, new Z(m, 1, 0), s.length, !0)), x = g.doc.resolve(h + 2 * s.length);
      x.nodeAfter && x.nodeAfter.type == i.type && Zt(g.doc, x.pos) && g.join(x.pos), t(g.scrollIntoView());
    }
    return !0;
  }
  let u = o.type.spec.isolating || r > 0 && a ? null : Ie.findFrom(e, 1), d = u && u.$from.blockRange(u.$to), f = d && bn(d);
  if (f != null && f >= e.depth)
    return t && t(n.tr.lift(d, f).scrollIntoView()), !0;
  if (c && gn(o, "start", !0) && gn(i, "end")) {
    let h = i, m = [];
    for (; m.push(h), !h.isTextblock; )
      h = h.lastChild;
    let g = o, x = 1;
    for (; !g.isTextblock; g = g.firstChild)
      x++;
    if (h.canReplace(h.childCount, h.childCount, g.content)) {
      if (t) {
        let y = H.empty;
        for (let A = m.length - 1; A >= 0; A--)
          y = H.from(m[A].copy(y));
        let z = n.tr.step(new qe(e.pos - m.length, e.pos + o.nodeSize, e.pos + x, e.pos + o.nodeSize - x, new Z(y, m.length, 0), 0, !0));
        t(z.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function As(n) {
  return function(e, t) {
    let r = e.selection, i = n < 0 ? r.$from : r.$to, o = i.depth;
    for (; i.node(o).isInline; ) {
      if (!o)
        return !1;
      o--;
    }
    return i.node(o).isTextblock ? (t && t(e.tr.setSelection(ot.create(e.doc, n < 0 ? i.start(o) : i.end(o)))), !0) : !1;
  };
}
const Hc = As(-1), _c = As(1);
function jc(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o), l = s && ds(s, n, e);
    return l ? (r && r(t.tr.wrap(s, l).scrollIntoView()), !0) : !1;
  };
}
function Zi(n, e = null) {
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
            let u = t.doc.resolve(c), d = u.index();
            i = u.parent.canReplaceWith(d, d + 1, n);
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
function ki(...n) {
  return function(e, t, r) {
    for (let i = 0; i < n.length; i++)
      if (n[i](e, t, r))
        return !0;
    return !1;
  };
}
ki(bs, ws, Ss);
ki(bs, Cs, Ts);
ki(Es, Ms, Rs, Pc);
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function Wc(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o);
    if (!s)
      return !1;
    let l = r ? t.tr : null;
    return qc(l, s, n, e) ? (r && r(l.scrollIntoView()), !0) : !1;
  };
}
function qc(n, e, t, r = null) {
  let i = !1, o = e, s = e.$from.doc;
  if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(t) && e.startIndex == 0) {
    if (e.$from.index(e.depth - 1) == 0)
      return !1;
    let a = s.resolve(e.start - 2);
    o = new ur(a, a, e.depth), e.endIndex < e.parent.childCount && (e = new ur(e.$from, s.resolve(e.$to.end(e.depth)), e.depth)), i = !0;
  }
  let l = ds(o, t, r, e);
  return l ? (n && Jc(n, e, l, i, t), !0) : !1;
}
function Jc(n, e, t, r, i) {
  let o = H.empty;
  for (let u = t.length - 1; u >= 0; u--)
    o = H.from(t[u].type.create(t[u].attrs, o));
  n.step(new qe(e.start - (r ? 2 : 0), e.end, e.start, e.end, new Z(o, 0, 0), t.length, !0));
  let s = 0;
  for (let u = 0; u < t.length; u++)
    t[u].type == i && (s = u + 1);
  let l = t.length - s, a = e.start + t.length - (r ? 2 : 0), c = e.parent;
  for (let u = e.startIndex, d = e.endIndex, f = !0; u < d; u++, f = !1)
    !f && Mt(n.doc, a, l) && (n.split(a, l), a += 2 * l), a += c.child(u).nodeSize;
  return n;
}
function Kc(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (s) => s.childCount > 0 && s.firstChild.type == n);
    return o ? t ? r.node(o.depth - 1).type == n ? Vc(e, t, n, o) : Yc(e, t, o) : !0 : !1;
  };
}
function Vc(n, e, t, r) {
  let i = n.tr, o = r.end, s = r.$to.end(r.depth);
  o < s && (i.step(new qe(o - 1, s, o, s, new Z(H.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new ur(i.doc.resolve(r.$from.pos), i.doc.resolve(s), r.depth));
  const l = bn(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let a = i.doc.resolve(i.mapping.map(o, -1) - 1);
  return Zt(i.doc, a.pos) && a.nodeBefore.type == a.nodeAfter.type && i.join(a.pos), e(i.scrollIntoView()), !0;
}
function Yc(n, e, t) {
  let r = n.tr, i = t.parent;
  for (let h = t.end, m = t.endIndex - 1, g = t.startIndex; m > g; m--)
    h -= i.child(m).nodeSize, r.delete(h - 1, h + 1);
  let o = r.doc.resolve(t.start), s = o.nodeAfter;
  if (r.mapping.map(t.end) != t.start + o.nodeAfter.nodeSize)
    return !1;
  let l = t.startIndex == 0, a = t.endIndex == i.childCount, c = o.node(-1), u = o.index(-1);
  if (!c.canReplace(u + (l ? 0 : 1), u + 1, s.content.append(a ? H.empty : H.from(i))))
    return !1;
  let d = o.pos, f = d + s.nodeSize;
  return r.step(new qe(d - (l ? 1 : 0), f + (a ? 1 : 0), d + 1, f - 1, new Z((l ? H.empty : H.from(i.copy(H.empty))).append(a ? H.empty : H.from(i.copy(H.empty))), l ? 0 : 1, a ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function Uc(n) {
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
      let c = a.lastChild && a.lastChild.type == l.type, u = H.from(c ? n.create() : null), d = new Z(H.from(n.create(null, H.from(l.type.create(null, u)))), c ? 3 : 1, 0), f = o.start, h = o.end;
      t(e.tr.step(new qe(f - (c ? 3 : 1), h, f, h, d, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function zs(n) {
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
var Gc = class $s {
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
      const d = a(...u)(s);
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
    const { rawCommands: r, editor: i, state: o } = this, { view: s } = i, l = [], a = !!e, c = e || o.tr, u = () => (!a && t && !c.getMeta("preventDispatch") && !this.hasCustomState && s.dispatch(c), l.every((f) => f === !0)), d = {
      ...Object.fromEntries(Object.entries(r).map(([f, h]) => [f, (...g) => {
        const x = this.buildProps(c, t), y = h(...g)(x);
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
    const e = $s.createFakeChain();
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
      state: zs({
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
const Xc = () => ({ editor: n, view: e }) => (requestAnimationFrame(() => {
  if (!n.isDestroyed) {
    var t;
    e.dom.blur(), (t = window) === null || t === void 0 || (t = t.getSelection()) === null || t === void 0 || t.removeAllRanges();
  }
}), !0), Qc = (n = !0) => ({ commands: e }) => e.setContent("", { emitUpdate: n }), Zc = () => ({ state: n, tr: e, dispatch: t }) => {
  const { selection: r } = e, { ranges: i } = r;
  return t && i.forEach(({ $from: o, $to: s }) => {
    n.doc.nodesBetween(o.pos, s.pos, (l, a) => {
      if (l.type.isText) return;
      const { doc: c, mapping: u } = e, d = c.resolve(u.map(a)), f = c.resolve(u.map(a + l.nodeSize)), h = d.blockRange(f);
      if (!h) return;
      const m = bn(h);
      if (l.type.isTextblock) {
        const { defaultType: g } = d.parent.contentMatchAt(d.index());
        e.setNodeMarkup(h.start, g);
      }
      (m || m === 0) && e.lift(h, m);
    });
  }), !0;
}, eu = (n) => (e) => n(e), tu = () => ({ state: n, dispatch: e }) => Ms(n, e), nu = (n, e) => ({ editor: t, tr: r }) => {
  const { state: i } = t, o = i.doc.slice(n.from, n.to);
  r.deleteRange(n.from, n.to);
  const s = r.mapping.map(e);
  return r.insert(s, o.content), r.setSelection(new ht(r.doc.resolve(Math.max(s - 1, 0)))), !0;
}, ru = () => ({ tr: n, dispatch: e }) => {
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
function Qe(n, e) {
  if (typeof n == "string") {
    if (!e.nodes[n]) throw Error(`There is no node type named '${n}'. Maybe you forgot to add the extension?`);
    return e.nodes[n];
  }
  return n;
}
const iu = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const i = Qe(n, t.schema), o = e.selection.$anchor;
  for (let s = o.depth; s > 0; s -= 1) if (o.node(s).type === i) {
    if (r) {
      const l = o.before(s), a = o.after(s);
      e.delete(l, a).scrollIntoView();
    }
    return !0;
  }
  return !1;
}, ou = (n) => ({ tr: e, dispatch: t }) => {
  const { from: r, to: i } = n;
  return t && e.delete(r, i), !0;
}, su = (n) => n.content ? /^text(\*|\+)/.test(n.content) : !1, eo = (n, e, t) => {
  if (!n.parent.isInline || t === "left" && n.pos > n.start() || t === "right" && n.pos < n.end()) return n.pos;
  const r = e.nodes[n.parent.type.name].spec;
  return su(r) ? t === "left" ? n.start() - 1 : n.end() + 1 : n.pos;
}, lu = (n, e, t) => ({
  from: eo(n, t, "left"),
  to: eo(e, t, "right")
}), au = () => ({ state: n, dispatch: e }) => {
  if (n.selection.empty) return !1;
  if (e) {
    const t = n.tr, { ranges: r } = n.selection, i = t.steps.length;
    r.forEach((o) => {
      const s = t.mapping.slice(i), l = t.doc.resolve(s.map(o.$from.pos)), a = t.doc.resolve(s.map(o.$to.pos)), { from: c, to: u } = lu(l, a, n.schema);
      t.deleteRange(c, u);
    }), t.selection.empty || t.setSelection(ht.near(t.doc.resolve(t.selection.from))), t.scrollIntoView(), e(t);
  }
  return !0;
}, cu = () => ({ commands: n }) => n.keyboardShortcut("Enter"), uu = () => ({ state: n, dispatch: e }) => Oc(n, e);
function du(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
function pr(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => t.strict ? e[i] === n[i] : du(e[i]) ? e[i].test(n[i]) : e[i] === n[i]) : !0;
}
function Ds(n, e, t = {}) {
  return n.find((r) => r.type === e && pr(Object.fromEntries(Object.keys(t).map((i) => [i, r.attrs[i]])), t));
}
function to(n, e, t = {}) {
  return !!Ds(n, e, t);
}
function Os(n, e, t) {
  if (!n || !e) return;
  let r = n.parent.childAfter(n.parentOffset);
  if ((!r.node || !r.node.marks.some((a) => a.type === e)) && (r = n.parent.childBefore(n.parentOffset)), !r.node || !r.node.marks.some((a) => a.type === e)) return;
  if (!t) {
    const a = r.node.marks.find((c) => c.type === e);
    a && (t = a.attrs);
  }
  if (!Ds([...r.node.marks], e, t)) return;
  let i = r.index, o = n.start() + r.offset, s = i + 1, l = o + r.node.nodeSize;
  for (; i > 0 && to([...n.parent.child(i - 1).marks], e, t); )
    i -= 1, o -= n.parent.child(i).nodeSize;
  for (; s < n.parent.childCount && to([...n.parent.child(s).marks], e, t); )
    l += n.parent.child(s).nodeSize, s += 1;
  return {
    from: o,
    to: l
  };
}
function _t(n, e) {
  if (typeof n == "string") {
    if (!e.marks[n]) throw Error(`There is no mark type named '${n}'. Maybe you forgot to add the extension?`);
    return e.marks[n];
  }
  return n;
}
const fu = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const o = _t(n, r.schema), { doc: s, selection: l } = t, { $from: a, from: c, to: u } = l;
  if (i) {
    const d = Os(a, o, e);
    if (d && d.from <= c && d.to >= u) {
      const f = ht.create(s, d.from, d.to);
      t.setSelection(f);
    }
  }
  return !0;
}, hu = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let r = 0; r < t.length; r += 1) if (t[r](e)) return !0;
  return !1;
};
function Ls(n) {
  return n instanceof ht;
}
function Kt(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function pu(n, e = null) {
  if (!e) return null;
  const t = cn.atStart(n), r = cn.atEnd(n);
  if (e === "start" || e === !0) return t;
  if (e === "end") return r;
  const i = t.from, o = r.to;
  return e === "all" ? ht.create(n, Kt(0, i, o), Kt(n.content.size, i, o)) : ht.create(n, Kt(e, i, o), Kt(e, i, o));
}
function no() {
  return ["Android"].includes(navigator.platform) || /android/i.test(navigator.userAgent);
}
function mr() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
function mu() {
  return typeof navigator < "u" ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : !1;
}
const gu = (n = null, e = {}) => ({ editor: t, view: r, tr: i, dispatch: o }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const s = () => {
    (mr() || no()) && r.dom.focus(), mu() && !mr() && !no() && r.dom.focus({ preventScroll: !0 }), requestAnimationFrame(() => {
      t.isDestroyed || (r.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  try {
    if (r.hasFocus() && n === null || n === !1) return !0;
  } catch {
    return !1;
  }
  if (o && n === null && !Ls(t.state.selection))
    return s(), !0;
  const l = pu(i.doc, n) || t.state.selection, a = t.state.selection.eq(l);
  return o && (a || i.setSelection(l), a && i.storedMarks && i.setStoredMarks(i.storedMarks), s()), !0;
}, yu = (n, e) => (t) => n.every((r, i) => e(r, {
  ...t,
  index: i
})), xu = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt({
  from: t.selection.from,
  to: t.selection.to
}, n, e), Ps = (n) => {
  const e = n.childNodes;
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const r = e[t];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? n.removeChild(r) : r.nodeType === 1 && Ps(r);
  }
  return n;
};
function Zn(n) {
  if (typeof window > "u") throw new Error("[tiptap error]: there is no window object available, so this function cannot be used");
  const e = `<body>${n}</body>`, t = new window.DOMParser().parseFromString(e, "text/html").body;
  return Ps(t);
}
function Bs(n) {
  return typeof (n == null ? void 0 : n.nodesBetween) == "function";
}
function yn(n, e, t) {
  if (Bs(n)) return n;
  const r = typeof n == "object" && n !== null;
  t = {
    slice: !0,
    parseOptions: {},
    ...t
  };
  const i = typeof n == "string";
  if (r) try {
    if (Array.isArray(n) && n.length > 0) return H.fromArray(n.map((s) => e.nodeFromJSON(s)));
    const o = e.nodeFromJSON(n);
    return t.errorOnInvalidContent && o.check(), o;
  } catch (o) {
    if (t.errorOnInvalidContent) throw new Error("[tiptap error]: Invalid JSON content", { cause: o });
    return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", o), yn("", e, t);
  }
  if (i) {
    if (t.errorOnInvalidContent) {
      let s = !1, l = "";
      const a = new Za({
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
      if (t.slice ? dn.fromSchema(a).parseSlice(Zn(n), t.parseOptions) : dn.fromSchema(a).parse(Zn(n), t.parseOptions), t.errorOnInvalidContent && s) throw new Error("[tiptap error]: Invalid HTML content", { cause: /* @__PURE__ */ new Error(`Invalid element found: ${l}`) });
    }
    const o = dn.fromSchema(e);
    return t.slice ? o.parseSlice(Zn(n), t.parseOptions).content : o.parse(Zn(n), t.parseOptions);
  }
  return yn("", e, t);
}
function Fs(n) {
  return !("type" in n);
}
function Hs(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e) return;
  const i = n.steps[r];
  if (!(i instanceof Pe || i instanceof qe)) return;
  const o = n.mapping.maps[r];
  let s = 0;
  o.forEach((l, a, c, u) => {
    s === 0 && (s = u);
  }), n.setSelection(cn.near(n.doc.resolve(s), t));
}
const bu = (n, e, t) => ({ tr: r, dispatch: i, editor: o }) => {
  if (i) {
    t = {
      parseOptions: o.options.parseOptions,
      updateSelection: !0,
      applyInputRules: !1,
      applyPasteRules: !1,
      ...t
    };
    let l;
    const a = (x) => {
      o.emit("contentError", {
        editor: o,
        error: x,
        disableCollaboration: () => {
          "collaboration" in o.storage && typeof o.storage.collaboration == "object" && o.storage.collaboration && (o.storage.collaboration.isDisabled = !0);
        }
      });
    }, c = {
      preserveWhitespace: "full",
      ...t.parseOptions
    };
    if (!t.errorOnInvalidContent && !o.options.enableContentCheck && o.options.emitContentError) try {
      yn(e, o.schema, {
        parseOptions: c,
        errorOnInvalidContent: !0
      });
    } catch (x) {
      a(x);
    }
    try {
      var s;
      l = yn(e, o.schema, {
        parseOptions: c,
        errorOnInvalidContent: (s = t.errorOnInvalidContent) !== null && s !== void 0 ? s : o.options.enableContentCheck
      });
    } catch (x) {
      return a(x), !1;
    }
    let { from: u, to: d } = typeof n == "number" ? {
      from: n,
      to: n
    } : {
      from: n.from,
      to: n.to
    }, f = !0, h = !0;
    const m = Fs(l) ? l.content : [l];
    if (m.forEach((x) => {
      x.check(), f = f ? x.isText && x.marks.length === 0 : !1, h = h ? x.isBlock : !1;
    }), u === d && h) {
      const { parent: x } = r.doc.resolve(u);
      x.isTextblock && !x.type.spec.code && !x.childCount && (u -= 1, d += 1);
    }
    let g;
    if (f)
      Array.isArray(e) ? g = e.map((x) => x.text || "").join("") : Bs(e) ? g = m.map((x) => {
        var y;
        return (y = x.text) !== null && y !== void 0 ? y : "";
      }).join("") : typeof e == "object" && e && e.text ? g = e.text : g = e, r.insertText(g, u, d);
    else {
      g = H.from(m);
      const x = r.doc.resolve(u), y = x.node(), z = x.parentOffset === 0, A = y.isText || y.isTextblock, C = y.content.size > 0;
      z && A && C && h && (u = Math.max(0, u - 1)), r.replaceWith(u, d, m);
    }
    t.updateSelection && Hs(r, r.steps.length - 1, -1), t.applyInputRules && r.setMeta("applyInputRules", {
      from: u,
      text: g
    }), t.applyPasteRules && r.setMeta("applyPasteRules", {
      from: u,
      text: g
    });
  }
  return !0;
};
function _s(n) {
  for (let e = 0; e < n.edgeCount; e += 1) {
    const { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs()) return t;
  }
  return null;
}
const vu = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
  const { pos: i, attrs: o, content: s, updateSelection: l = !0 } = n;
  let a;
  typeof i == "number" ? a = e.doc.resolve(i) : i ? a = i : a = e.selection.$from;
  const c = _s(a.parent.contentMatchAt(a.index()));
  if (!c) return !1;
  const u = Object.keys(c.spec.attrs || {}), d = o ? Object.fromEntries(Object.entries(o).filter(([h]) => u.includes(h))) : {};
  let f;
  if (s) {
    const h = yn(s, r.schema);
    f = c.createAndFill(d, h);
  } else f = c.createAndFill(d);
  return f ? (t && (e.insert(a.pos, f), l && Hs(e, e.steps.length - 1, -1)), !0) : !1;
}, wu = () => ({ state: n, dispatch: e }) => zc(n, e), ku = () => ({ state: n, dispatch: e }) => $c(n, e), Su = () => ({ state: n, dispatch: e }) => ws(n, e), Nu = () => ({ state: n, dispatch: e }) => Cs(n, e), Cu = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = Nr(n.doc, n.selection.$from.pos, -1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Tu = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = Nr(n.doc, n.selection.$from.pos, 1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Eu = () => ({ state: n, dispatch: e }) => Ic(n, e), Mu = () => ({ state: n, dispatch: e }) => Ac(n, e);
function js() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function Ru(n) {
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
      mr() || js() ? s = !0 : i = !0;
    else throw new Error(`Unrecognized modifier name: ${a}`);
  }
  return r && (t = `Alt-${t}`), i && (t = `Ctrl-${t}`), s && (t = `Meta-${t}`), o && (t = `Shift-${t}`), t;
}
const Iu = (n) => ({ editor: e, view: t, tr: r, dispatch: i }) => {
  const o = Ru(n).split(/-(?!$)/), s = o.find((c) => ![
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
function Si(n, e, t = {}) {
  const { from: r, to: i, empty: o } = n.selection, s = e ? Qe(e, n.schema) : null, l = [];
  n.doc.nodesBetween(r, i, (u, d) => {
    if (u.isText) return;
    const f = Math.max(r, d), h = Math.min(i, d + u.nodeSize);
    l.push({
      node: u,
      from: f,
      to: h
    });
  });
  const a = i - r, c = l.filter((u) => s ? s.name === u.node.type.name : !0).filter((u) => pr(u.node.attrs, t, { strict: !1 }));
  return o ? !!c.length : c.reduce((u, d) => u + d.to - d.from, 0) >= a;
}
const Au = (n, e = {}) => ({ state: t, dispatch: r }) => Si(t, Qe(n, t.schema), e) ? Dc(t, r) : !1, zu = () => ({ state: n, dispatch: e }) => Rs(n, e), $u = (n) => ({ state: e, dispatch: t }) => {
  const r = Qe(n, e.schema);
  return Kc(r)(e, t);
}, Du = () => ({ state: n, dispatch: e }) => Es(n, e);
function Ws(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function ro(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((r, i) => (t.includes(i) || (r[i] = n[i]), r), {});
}
const Ou = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = Ws(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = Qe(n, r.schema)), l === "mark" && (s = _t(n, r.schema));
  let a = !1;
  return t.selection.ranges.forEach((c) => {
    r.doc.nodesBetween(c.$from.pos, c.$to.pos, (u, d) => {
      o && o === u.type && (a = !0, i && t.setNodeMarkup(d, void 0, ro(u.attrs, e))), s && u.marks.length && u.marks.forEach((f) => {
        s === f.type && (a = !0, i && t.addMark(d, d + u.nodeSize, s.create(ro(f.attrs, e))));
      });
    });
  }), a;
}, Lu = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), Pu = () => ({ tr: n, dispatch: e }) => {
  if (e) {
    const t = new Sl(n.doc);
    n.setSelection(t);
  }
  return !0;
}, Bu = () => ({ state: n, dispatch: e }) => Ss(n, e), Fu = () => ({ state: n, dispatch: e }) => Ts(n, e), Hu = () => ({ state: n, dispatch: e }) => Bc(n, e), _u = () => ({ state: n, dispatch: e }) => _c(n, e), ju = () => ({ state: n, dispatch: e }) => Hc(n, e);
function Wu(n, e, t = {}, r = {}) {
  return yn(n, e, {
    slice: !1,
    parseOptions: t,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
const qu = (n, { errorOnInvalidContent: e, emitUpdate: t = !0, parseOptions: r = {} } = {}) => ({ editor: i, tr: o, dispatch: s, commands: l }) => {
  const { doc: a } = o;
  if (r.preserveWhitespace !== "full") {
    const c = Wu(n, i.schema, r, { errorOnInvalidContent: e ?? i.options.enableContentCheck });
    if (s) {
      const u = Fs(c) ? c.content : [c];
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
function Ju(n, e) {
  const t = _t(e, n.schema), { from: r, to: i, empty: o } = n.selection, s = [];
  o ? (n.storedMarks && s.push(...n.storedMarks), s.push(...n.selection.$head.marks())) : n.doc.nodesBetween(r, i, (a) => {
    s.push(...a.marks);
  });
  const l = s.find((a) => a.type.name === t.name);
  return l ? { ...l.attrs } : {};
}
function Ku(n, e) {
  const t = new Ec(n);
  return e.forEach((r) => {
    r.steps.forEach((i) => {
      t.step(i);
    });
  }), t;
}
function Vu(n, e) {
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
function Ni(n) {
  return (e) => Vu(e.$from, n);
}
function Ln(n, e, t) {
  return n.config[e] === void 0 && n.parent ? Ln(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? Ln(n.parent, e, t) : null
  }) : n.config[e];
}
function Yu(n) {
  return typeof n == "function";
}
function Qr(n, e = void 0, ...t) {
  return Yu(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function qs(n) {
  return {
    baseExtensions: n.filter((e) => e.type === "extension"),
    nodeExtensions: n.filter((e) => e.type === "node"),
    markExtensions: n.filter((e) => e.type === "mark")
  };
}
function Uu(n, e, t) {
  const { from: r, to: i } = e, { blockSeparator: o = `

`, textSerializers: s = {} } = t || {};
  let l = "";
  return n.nodesBetween(r, i, (a, c, u, d) => {
    a.isBlock && c > r && (l += o);
    const f = s == null ? void 0 : s[a.type.name];
    if (f)
      return u && (l += f({
        node: a,
        pos: c,
        parent: u,
        index: d,
        range: e
      })), !1;
    if (a.isText) {
      var h;
      l += a == null || (h = a.text) === null || h === void 0 ? void 0 : h.slice(Math.max(r, c) - c, i - c);
    }
  }), l;
}
function Gu(n) {
  return Object.fromEntries(Object.entries(n.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
function Xu(n, e = JSON.stringify) {
  const t = {};
  return n.filter((r) => {
    const i = e(r);
    return Object.prototype.hasOwnProperty.call(t, i) ? !1 : t[i] = !0;
  });
}
function Qu(n) {
  const e = Xu(n);
  return e.length === 1 ? e : e.filter((t, r) => !e.filter((i, o) => o !== r).some((i) => t.oldRange.from >= i.oldRange.from && t.oldRange.to <= i.oldRange.to && t.newRange.from >= i.newRange.from && t.newRange.to <= i.newRange.to));
}
function Zu(n) {
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
      const c = e.slice(o).map(l, -1), u = e.slice(o).map(a), d = e.invert().map(c, -1), f = e.invert().map(u);
      r.push({
        oldRange: {
          from: d,
          to: f
        },
        newRange: {
          from: c,
          to: u
        }
      });
    });
  }), Qu(r);
}
function rr(n, e, t) {
  return Object.fromEntries(Object.entries(t).filter(([r]) => {
    const i = n.find((o) => o.type === e && o.name === r);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function ed(n, e, t = {}) {
  const { empty: r, ranges: i } = n.selection, o = e ? _t(e, n.schema) : null;
  if (r) return !!(n.storedMarks || n.selection.$from.marks()).filter((u) => o ? o.name === u.type.name : !0).find((u) => pr(u.attrs, t, { strict: !1 }));
  let s = 0;
  const l = [];
  if (i.forEach(({ $from: u, $to: d }) => {
    const f = u.pos, h = d.pos;
    n.doc.nodesBetween(f, h, (m, g) => {
      if (o && m.inlineContent && !m.type.allowsMarkType(o)) return !1;
      if (!m.isText && !m.marks.length) return;
      const x = Math.max(f, g), y = Math.min(h, g + m.nodeSize), z = y - x;
      s += z, l.push(...m.marks.map((A) => ({
        mark: A,
        from: x,
        to: y
      })));
    });
  }), s === 0) return !1;
  const a = l.filter((u) => o ? o.name === u.mark.type.name : !0).filter((u) => pr(u.mark.attrs, t, { strict: !1 })).reduce((u, d) => u + d.to - d.from, 0), c = l.filter((u) => o ? u.mark.type !== o && u.mark.type.excludes(o) : !0).reduce((u, d) => u + d.to - d.from, 0);
  return (a > 0 ? a + c : a) >= s;
}
function Br(n, e) {
  const { nodeExtensions: t } = qs(e), r = t.find((o) => o.name === n);
  if (!r) return !1;
  const i = Qr(Ln(r, "group", {
    name: r.name,
    options: r.options,
    storage: r.storage
  }));
  return typeof i != "string" ? !1 : i.split(" ").includes("list");
}
function Js(n, { checkChildren: e = !0, ignoreWhitespace: t = !1 } = {}) {
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
      i !== !1 && (Js(o, {
        ignoreWhitespace: t,
        checkChildren: e
      }) || (i = !1));
    }), i;
  }
  return !1;
}
function td(n, e, t) {
  const { selection: r } = e;
  let i = null;
  if (Ls(r) && (i = r.$cursor), i) {
    var o;
    const l = (o = n.storedMarks) !== null && o !== void 0 ? o : i.marks();
    return i.parent.type.allowsMarkType(t) && (!!t.isInSet(l) || !l.some((a) => a.type.excludes(t)));
  }
  const { ranges: s } = r;
  return s.some(({ $from: l, $to: a }) => {
    let c = l.depth === 0 ? n.doc.inlineContent && n.doc.type.allowsMarkType(t) : !1;
    return n.doc.nodesBetween(l.pos, a.pos, (u, d, f) => {
      if (c) return !1;
      if (u.isInline) {
        const h = !f || f.type.allowsMarkType(t), m = !!t.isInSet(u.marks) || !u.marks.some((g) => g.type.excludes(t));
        c = h && m;
      }
      return !c;
    }), c;
  });
}
const nd = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = t, { empty: s, ranges: l } = o, a = _t(n, r.schema);
  if (i)
    if (s) {
      const c = Ju(r, a);
      t.addStoredMark(a.create({
        ...c,
        ...e
      }));
    } else l.forEach((c) => {
      const u = c.$from.pos, d = c.$to.pos;
      r.doc.nodesBetween(u, d, (f, h) => {
        const m = Math.max(h, u), g = Math.min(h + f.nodeSize, d);
        f.marks.find((x) => x.type === a) ? f.marks.forEach((x) => {
          a === x.type && t.addMark(m, g, a.create({
            ...x.attrs,
            ...e
          }));
        }) : t.addMark(m, g, a.create(e));
      });
    });
  return td(r, t, a);
}, rd = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), id = (n, e = {}) => ({ state: t, dispatch: r, chain: i }) => {
  const o = Qe(n, t.schema);
  let s;
  return t.selection.$anchor.sameParent(t.selection.$head) && (s = t.selection.$anchor.parent.attrs), o.isTextblock ? i().command(({ commands: l }) => Zi(o, {
    ...s,
    ...e
  })(t) ? !0 : l.clearNodes()).command(({ state: l }) => Zi(o, {
    ...s,
    ...e
  })(l, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, od = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, i = Kt(n, 0, r.content.size), o = hn.create(r, i);
    e.setSelection(o);
  }
  return !0;
}, sd = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = r;
  let s, l;
  return typeof e == "number" ? (s = e, l = e) : e && "from" in e && "to" in e ? (s = e.from, l = e.to) : (s = o.from, l = o.to), i && t.doc.nodesBetween(s, l, (a, c) => {
    a.isText || t.setNodeMarkup(c, void 0, {
      ...a.attrs,
      dir: n
    });
  }), !0;
}, ld = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, { from: i, to: o } = typeof n == "number" ? {
      from: n,
      to: n
    } : n, s = ht.atStart(r).from, l = ht.atEnd(r).to, a = Kt(i, s, l), c = Kt(o, s, l), u = ht.create(r, a, c);
    e.setSelection(u);
  }
  return !0;
}, ad = (n) => ({ state: e, dispatch: t }) => {
  const r = Qe(n, e.schema);
  return Uc(r)(e, t);
};
function io(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    n.tr.ensureMarks(r);
  }
}
const cd = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
  const { selection: o, doc: s } = e, { $from: l, $to: a } = o, c = i.extensionManager.attributes, u = rr(c, l.node().type.name, l.node().attrs);
  if (o instanceof hn && o.node.isBlock)
    return !l.parentOffset || !Mt(s, l.pos) ? !1 : (r && (n && io(t, i.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock) return !1;
  const d = a.parentOffset === a.parent.content.size, f = l.depth === 0 ? void 0 : _s(l.node(-1).contentMatchAt(l.indexAfter(-1)));
  let h = d && f ? [{
    type: f,
    attrs: u
  }] : void 0, m = Mt(e.doc, e.mapping.map(l.pos), 1, h);
  if (!h && !m && Mt(e.doc, e.mapping.map(l.pos), 1, f ? [{ type: f }] : void 0) && (m = !0, h = f ? [{
    type: f,
    attrs: u
  }] : void 0), r) {
    if (m && (o instanceof ht && e.deleteSelection(), e.split(e.mapping.map(l.pos), 1, h), f && !d && !l.parentOffset && l.parent.type !== f)) {
      const g = e.mapping.map(l.before()), x = e.doc.resolve(g);
      l.node(-1).canReplaceWith(x.index(), x.index() + 1, f) && e.setNodeMarkup(e.mapping.map(l.before()), f);
    }
    n && io(t, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return m;
}, ud = (n, e = {}) => ({ tr: t, state: r, dispatch: i, editor: o }) => {
  const s = Qe(n, r.schema), { $from: l, $to: a } = r.selection, c = r.selection.node;
  if (c && c.isBlock || l.depth < 2 || !l.sameParent(a)) return !1;
  const u = l.node(-1);
  if (u.type !== s) return !1;
  const d = o.extensionManager.attributes;
  if (l.parent.content.size === 0 && l.node(-1).childCount === l.indexAfter(-1)) {
    if (l.depth === 2 || l.node(-3).type !== s || l.index(-2) !== l.node(-2).childCount - 1) return !1;
    if (i) {
      var f;
      let y = H.empty;
      const z = l.index(-1) ? 1 : l.index(-2) ? 2 : 3;
      for (let $ = l.depth - z; $ >= l.depth - 3; $ -= 1) y = H.from(l.node($).copy(y));
      const A = l.indexAfter(-1) < l.node(-2).childCount ? 1 : l.indexAfter(-2) < l.node(-3).childCount ? 2 : 3, C = {
        ...rr(d, l.node().type.name, l.node().attrs),
        ...e
      }, w = ((f = s.contentMatch.defaultType) === null || f === void 0 ? void 0 : f.createAndFill(C)) || void 0;
      y = y.append(H.from(s.createAndFill(null, w) || void 0));
      const I = l.before(l.depth - (z - 1));
      t.replace(I, l.after(-A), new Z(y, 4 - z, 0));
      let F = -1;
      t.doc.nodesBetween(I, t.doc.content.size, ($, S) => {
        if (F > -1) return !1;
        $.isTextblock && $.content.size === 0 && (F = S + 1);
      }), F > -1 && t.setSelection(ht.near(t.doc.resolve(F))), t.scrollIntoView();
    }
    return !0;
  }
  const h = a.pos === l.end() ? u.contentMatchAt(0).defaultType : null, m = {
    ...rr(d, u.type.name, u.attrs),
    ...e
  }, g = {
    ...rr(d, l.node().type.name, l.node().attrs),
    ...e
  };
  t.delete(l.pos, a.pos);
  const x = h ? [{
    type: s,
    attrs: m
  }, {
    type: h,
    attrs: g
  }] : [{
    type: s,
    attrs: m
  }];
  if (!Mt(t.doc, l.pos, 2)) return !1;
  if (i) {
    const { selection: y, storedMarks: z } = r, { splittableMarks: A } = o.extensionManager, C = z || y.$to.parentOffset && y.$from.marks();
    if (t.split(l.pos, 2, x).scrollIntoView(), !C || !i) return !0;
    const w = C.filter((I) => A.includes(I.type.name));
    t.ensureMarks(w);
  }
  return !0;
};
function oo(n) {
  return !n || n === "1" ? null : n;
}
function Ks(n, e) {
  return oo(n) === oo(e);
}
const Fr = (n, e) => {
  const t = Ni((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && Zt(n.doc, t.pos)) || !Ks(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(t.pos), !0;
}, Hr = (n, e) => {
  const t = Ni((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && Zt(n.doc, r)) || !Ks(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(r), !0;
};
function dd(n) {
  const e = n.doc, t = e.firstChild;
  if (!t) return null;
  const r = e.resolve(1), i = e.resolve(t.nodeSize - 1);
  return ht.between(r, i);
}
const fd = (n, e, t, r = {}) => ({ editor: i, tr: o, state: s, dispatch: l, chain: a, commands: c, can: u }) => {
  const { extensions: d, splittableMarks: f } = i.extensionManager, h = Qe(n, s.schema), m = Qe(e, s.schema), { selection: g, storedMarks: x } = s, { $from: y, $to: z } = g, A = y.blockRange(z), C = x || g.$to.parentOffset && g.$from.marks();
  if (!A) return !1;
  const w = Ni((D) => Br(D.type.name, d))(g), I = g.from === 0 && g.to === s.doc.content.size, F = s.doc.content.content, $ = F.length === 1 ? F[0] : null, S = I && $ && Br($.type.name, d) ? {
    node: $,
    pos: 0
  } : null, G = w ?? S, E = !!w && A.depth >= 1 && A.depth - w.depth <= 1, B = !!S;
  if ((E || B) && G) {
    if (G.node.type === h)
      return I && B ? a().command(({ tr: D, dispatch: V }) => {
        const K = dd(D);
        return K ? (D.setSelection(K), V && V(D), !0) : !1;
      }).liftListItem(m).run() : c.liftListItem(m);
    if (Br(G.node.type.name, d) && h.validContent(G.node.content)) return a().command(() => (o.setNodeMarkup(G.pos, h), !0)).command(() => Fr(o, h)).command(() => Hr(o, h)).run();
  }
  return !t || !C || !l ? a().command(() => u().wrapInList(h, r) ? !0 : c.clearNodes()).wrapInList(h, r).command(() => Fr(o, h)).command(() => Hr(o, h)).run() : a().command(() => {
    const D = u().wrapInList(h, r), V = C.filter((K) => f.includes(K.type.name));
    return o.ensureMarks(V), D ? !0 : c.clearNodes();
  }).wrapInList(h, r).command(() => Fr(o, h)).command(() => Hr(o, h)).run();
}, hd = (n, e = {}, t = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: o = !1 } = t, s = _t(n, r.schema);
  return ed(r, s, e) ? i.unsetMark(s, { extendEmptyMarkRange: o }) : i.setMark(s, e);
}, pd = (n, e, t = {}) => ({ state: r, commands: i }) => {
  const o = Qe(n, r.schema), s = Qe(e, r.schema), l = Si(r, o, t);
  let a;
  return r.selection.$anchor.sameParent(r.selection.$head) && (a = r.selection.$anchor.parent.attrs), l ? i.setNode(s, a) : i.setNode(o, {
    ...a,
    ...t
  });
}, md = (n, e = {}) => ({ state: t, commands: r }) => {
  const i = Qe(n, t.schema);
  return Si(t, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, gd = () => ({ state: n, dispatch: e }) => {
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
}, yd = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
  const { ignoreClearable: i = !1 } = n, { selection: o } = e, { empty: s, ranges: l } = o;
  if (s) return !0;
  const { nonClearableMarks: a } = r.extensionManager;
  if (t) {
    const c = Object.values(r.schema.marks).filter((u) => i || !a.includes(u.name));
    l.forEach((u) => {
      for (const d of c) e.removeMark(u.$from.pos, u.$to.pos, d);
    });
  }
  return !0;
}, xd = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { extendEmptyMarkRange: o = !1 } = e, { selection: s } = t, l = _t(n, r.schema), { $from: a, empty: c, ranges: u } = s;
  if (!i) return !0;
  if (c && o) {
    var d;
    let { from: f, to: h } = s;
    const m = Os(a, l, (d = a.marks().find((g) => g.type === l)) === null || d === void 0 ? void 0 : d.attrs);
    m && (f = m.from, h = m.to), t.removeMark(f, h, l);
  } else u.forEach((f) => {
    t.removeMark(f.$from.pos, f.$to.pos, l);
  });
  return t.removeStoredMark(l), !0;
}, bd = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const { selection: i } = t;
  let o, s;
  return typeof n == "number" ? (o = n, s = n) : n && "from" in n && "to" in n ? (o = n.from, s = n.to) : (o = i.from, s = i.to), r && e.doc.nodesBetween(o, s, (l, a) => {
    if (l.isText) return;
    const c = { ...l.attrs };
    delete c.dir, e.setNodeMarkup(a, void 0, c);
  }), !0;
}, vd = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = Ws(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = Qe(n, r.schema)), l === "mark" && (s = _t(n, r.schema));
  let a = !1;
  return t.selection.ranges.forEach((c) => {
    const u = c.$from.pos, d = c.$to.pos;
    let f, h, m, g;
    t.selection.empty ? r.doc.nodesBetween(u, d, (x, y) => {
      o && o === x.type && (a = !0, m = Math.max(y, u), g = Math.min(y + x.nodeSize, d), f = y, h = x);
    }) : r.doc.nodesBetween(u, d, (x, y) => {
      y < u && o && o === x.type && (a = !0, m = Math.max(y, u), g = Math.min(y + x.nodeSize, d), f = y, h = x), y >= u && y <= d && (o && o === x.type && (a = !0, i && t.setNodeMarkup(y, void 0, {
        ...x.attrs,
        ...e
      })), s && x.marks.length && x.marks.forEach((z) => {
        if (s === z.type && (a = !0, i)) {
          const A = Math.max(y, u), C = Math.min(y + x.nodeSize, d);
          t.addMark(A, C, s.create({
            ...z.attrs,
            ...e
          }));
        }
      }));
    }), h && (f !== void 0 && i && t.setNodeMarkup(f, void 0, {
      ...h.attrs,
      ...e
    }), s && h.marks.length && h.marks.forEach((x) => {
      s === x.type && i && t.addMark(m, g, s.create({
        ...x.attrs,
        ...e
      }));
    }));
  }), a;
}, wd = new xt("__tiptap_decorations__"), kd = (n) => ({ tr: e, dispatch: t }) => (t && e.setMeta(wd, {
  type: "force",
  name: n
}), !0), Sd = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Qe(n, t.schema);
  return jc(i, e)(t, r);
}, Nd = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Qe(n, t.schema);
  return Wc(i, e)(t, r);
};
var Cd = /* @__PURE__ */ La({
  blur: () => Xc,
  clearContent: () => Qc,
  clearNodes: () => Zc,
  command: () => eu,
  createParagraphNear: () => tu,
  cut: () => nu,
  deleteCurrentNode: () => ru,
  deleteNode: () => iu,
  deleteRange: () => ou,
  deleteSelection: () => au,
  enter: () => cu,
  exitCode: () => uu,
  extendMarkRange: () => fu,
  first: () => hu,
  focus: () => gu,
  forEach: () => yu,
  insertContent: () => xu,
  insertContentAt: () => bu,
  insertDefaultBlock: () => vu,
  joinBackward: () => Su,
  joinDown: () => ku,
  joinForward: () => Nu,
  joinItemBackward: () => Cu,
  joinItemForward: () => Tu,
  joinTextblockBackward: () => Eu,
  joinTextblockForward: () => Mu,
  joinUp: () => wu,
  keyboardShortcut: () => Iu,
  lift: () => Au,
  liftEmptyBlock: () => zu,
  liftListItem: () => $u,
  newlineInCode: () => Du,
  resetAttributes: () => Ou,
  scrollIntoView: () => Lu,
  selectAll: () => Pu,
  selectNodeBackward: () => Bu,
  selectNodeForward: () => Fu,
  selectParentNode: () => Hu,
  selectTextblockEnd: () => _u,
  selectTextblockStart: () => ju,
  setContent: () => qu,
  setMark: () => nd,
  setMeta: () => rd,
  setNode: () => id,
  setNodeSelection: () => od,
  setTextDirection: () => sd,
  setTextSelection: () => ld,
  sinkListItem: () => ad,
  splitBlock: () => cd,
  splitListItem: () => ud,
  toggleList: () => fd,
  toggleMark: () => hd,
  toggleNode: () => pd,
  toggleWrap: () => md,
  undoInputRule: () => gd,
  unsetAllMarks: () => yd,
  unsetMark: () => xd,
  unsetTextDirection: () => bd,
  updateAttributes: () => vd,
  updateDecorations: () => kd,
  wrapIn: () => Sd,
  wrapInList: () => Nd
});
typeof process < "u" && process.env.NODE_ENV;
function Td(n) {
  return Object.prototype.toString.call(n).slice(8, -1);
}
function er(n) {
  return Td(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
function Vs(n, e) {
  const t = { ...n };
  return er(n) && er(e) && Object.keys(e).forEach((r) => {
    er(e[r]) && er(n[r]) ? t[r] = Vs(n[r], e[r]) : t[r] = e[r];
  }), t;
}
var Ys = class {
  constructor(n = {}) {
    this.type = "extendable", this.parent = null, this.child = null, this.name = "", this.config = { name: this.name }, this.config = {
      ...this.config,
      ...n
    }, this.name = this.config.name;
  }
  get options() {
    return { ...Qr(Ln(this, "addOptions", { name: this.name })) };
  }
  get storage() {
    return { ...Qr(Ln(this, "addStorage", {
      name: this.name,
      options: this.options
    })) };
  }
  configure(n = {}) {
    const e = this.extend({
      ...this.config,
      addOptions: () => Vs(this.options, n)
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
}, Ed = class Us extends Ys {
  constructor(...e) {
    super(...e), this.type = "mark";
  }
  /**
  * Create a new Mark instance
  * @param config - Mark configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new Us(t);
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
}, pt = class Gs extends Ys {
  constructor(...e) {
    super(...e), this.type = "extension";
  }
  /**
  * Create a new Extension instance
  * @param config - Extension configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new Gs(t);
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const t = typeof e == "function" ? e() : e;
    return super.extend(t);
  }
};
pt.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return { blockSeparator: void 0 };
  },
  addProseMirrorPlugins() {
    return [new Rt({
      key: new xt("clipboardTextSerializer"),
      props: { clipboardTextSerializer: () => {
        const { editor: n } = this, { state: e, schema: t } = n, { doc: r, selection: i } = e, o = Gu(t), { blockSeparator: s } = this.options, l = {
          ...s !== void 0 ? { blockSeparator: s } : {},
          textSerializers: o
        };
        return [...i.ranges].sort((a, c) => a.$from.pos - c.$from.pos).map(({ $from: a, $to: c }) => Uu(r, {
          from: a.pos,
          to: c.pos
        }, l)).join(s ?? `

`);
      } }
    })];
  }
});
pt.create({
  name: "commands",
  addCommands() {
    return { ...Cd };
  }
});
pt.create({
  name: "delete",
  onUpdate({ transaction: n, appendedTransactions: e }) {
    var t, r;
    const i = () => {
      var o, s, l;
      if ((o = (s = this.editor.options.coreExtensionOptions) === null || s === void 0 || (s = s.delete) === null || s === void 0 || (l = s.filterTransaction) === null || l === void 0 ? void 0 : l.call(s, n)) !== null && o !== void 0 ? o : n.getMeta("y-sync$")) return;
      const a = Ku(n.before, [n, ...e]);
      Zu(a).forEach((u) => {
        a.mapping.mapResult(u.oldRange.from).deletedAfter && a.mapping.mapResult(u.oldRange.to).deletedBefore && a.before.nodesBetween(u.oldRange.from, u.oldRange.to, (d, f) => {
          const h = f + d.nodeSize - 2, m = u.oldRange.from <= f && h <= u.oldRange.to;
          this.editor.emit("delete", {
            type: "node",
            node: d,
            from: f,
            to: h,
            newFrom: a.mapping.map(f),
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
      a.steps.forEach((u, d) => {
        if (u instanceof gt) {
          var f, h;
          const m = c.slice(d).map(u.from, -1), g = c.slice(d).map(u.to), x = c.invert().map(m, -1), y = c.invert().map(g), z = m > 0 ? (f = a.doc.nodeAt(m - 1)) === null || f === void 0 ? void 0 : f.marks.some((C) => C.eq(u.mark)) : !1, A = (h = a.doc.nodeAt(g)) === null || h === void 0 ? void 0 : h.marks.some((C) => C.eq(u.mark));
          this.editor.emit("delete", {
            type: "mark",
            mark: u.mark,
            from: u.from,
            to: u.to,
            deletedRange: {
              from: x,
              to: y
            },
            newRange: {
              from: m,
              to: g
            },
            partial: !!(A || z),
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
pt.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [new Rt({
      key: new xt("tiptapDrop"),
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
pt.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [new Rt({
      key: new xt("editable"),
      props: { editable: () => this.editor.options.editable }
    })];
  }
});
const Md = new xt("focusEvents");
pt.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [new Rt({
      key: Md,
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
pt.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const n = () => this.editor.commands.first(({ commands: s }) => [
      () => s.undoInputRule(),
      () => s.command(({ tr: l }) => {
        const { selection: a, doc: c } = l, { empty: u, $anchor: d } = a, { pos: f, parent: h } = d, m = d.parent.isTextblock && f > 0 ? l.doc.resolve(f - 1) : d, g = m.parent.type.spec.isolating, x = d.pos - d.parentOffset, y = g && m.parent.childCount === 1 ? x === d.pos : cn.atStart(c).from === f;
        return !u || !h.type.isTextblock || h.textContent.length || !y || y && d.parent.type.name === "paragraph" ? !1 : s.clearNodes();
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
    return mr() || js() ? o : i;
  },
  addProseMirrorPlugins() {
    return [new Rt({
      key: new xt("clearDocument"),
      appendTransaction: (n, e, t) => {
        if (n.some((h) => h.getMeta("composition"))) return;
        const r = n.some((h) => h.docChanged) && !e.doc.eq(t.doc), i = n.some((h) => h.getMeta("preventClearDocument"));
        if (!r || i) return;
        const { empty: o, from: s, to: l } = e.selection, a = cn.atStart(e.doc).from, c = cn.atEnd(e.doc).to;
        if (o || !(s === a && l === c) || !Js(t.doc)) return;
        const u = t.tr, d = zs({
          state: t,
          transaction: u
        }), { commands: f } = new Gc({
          editor: this.editor,
          state: d
        });
        if (f.clearNodes(), !!u.steps.length)
          return u;
      }
    })];
  }
});
pt.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [new Rt({
      key: new xt("tiptapPaste"),
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
pt.create({
  name: "tabindex",
  addOptions() {
    return { value: void 0 };
  },
  addProseMirrorPlugins() {
    return [new Rt({
      key: new xt("tabindex"),
      props: { attributes: () => {
        var n;
        return !this.editor.isEditable && this.options.value === void 0 ? {} : { tabindex: (n = this.options.value) !== null && n !== void 0 ? n : "0" };
      } }
    })];
  }
});
pt.create({
  name: "textDirection",
  addOptions() {
    return { direction: void 0 };
  },
  addGlobalAttributes() {
    if (!this.options.direction) return [];
    const { nodeExtensions: n } = qs(this.extensions);
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
    return [new Rt({
      key: new xt("textDirection"),
      props: { attributes: () => {
        const n = this.options.direction;
        return n ? { dir: n } : {};
      } }
    })];
  }
});
const Rd = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), Id = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), Ad = /^(https?:\/\/|mailto:)/i;
function zd(n) {
  if (!n) return "";
  const e = [];
  for (const t of n.split(";")) {
    const r = t.indexOf(":");
    if (r < 0) continue;
    const i = t.slice(0, r).trim().toLowerCase(), o = t.slice(r + 1).trim();
    Id.has(i) && o && e.push(`${i}: ${o}`);
  }
  return e.join("; ");
}
function Zr(n) {
  if (n.nodeType === Node.TEXT_NODE) return n;
  if (n.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const e = n, t = e.tagName.toLowerCase(), r = () => {
    const l = document.createDocumentFragment();
    for (const a of Array.from(e.childNodes)) l.appendChild(Zr(a));
    return l;
  };
  if (!Rd.has(t)) return r();
  if (t === "a") {
    const l = e.getAttribute("href") || "";
    if (!Ad.test(l)) return r();
  }
  const i = document.createElement(t), o = e.getAttribute("style"), s = zd(o || "");
  if (s && i.setAttribute("style", s), t === "span") {
    const l = e.getAttribute("data-text-style");
    l && i.setAttribute("data-text-style", l);
  }
  if (t === "a") {
    i.setAttribute("href", e.getAttribute("href"));
    const l = e.getAttribute("target"), a = e.getAttribute("rel");
    l && i.setAttribute("target", l), a && i.setAttribute("rel", a);
  }
  for (const l of Array.from(e.childNodes)) i.appendChild(Zr(l));
  return i;
}
function Xs(n) {
  return n.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function $d(n) {
  const e = Xs(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  t.innerHTML = e;
  const r = document.createDocumentFragment();
  for (const s of Array.from(t.content.childNodes)) r.appendChild(Zr(s));
  const i = document.createElement("div");
  return i.appendChild(r), i.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function nh(n) {
  const e = Xs(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  return t.innerHTML = e, (t.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function rh(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function Dd(n) {
  return n.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function so(n) {
  return n.replace(/\{\{([^{}]+)\}\}/g, (e, t) => `<span data-type="token" data-field="${t}">{{${t}}}</span>`);
}
const Od = { text: "#52525b" }, Ld = ({ node: n, selected: e, extension: t, editor: r, view: i, getPos: o }) => {
  var f;
  const s = n.attrs.field ?? "", l = t.options, a = ((f = l.resolve) == null ? void 0 : f.call(l, s)) ?? null, c = (a == null ? void 0 : a.color) ?? Od, u = (a == null ? void 0 : a.label) ?? `{{${s}}}`, d = a == null ? void 0 : a.nested;
  return /* @__PURE__ */ p(
    vl,
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
        var y;
        if (h.button !== 0 || !r.isEditable) return;
        h.preventDefault(), r.isFocused || r.commands.focus();
        const m = typeof o == "function" ? o() : null;
        if (m == null) return;
        const g = i.state.doc.resolve(m), x = g.nodeAfter;
        x && hn.isSelectable(x) && i.dispatch(i.state.tr.setSelection(new hn(g))), (y = l.onTokenClick) == null || y.call(l, s, h.currentTarget.getBoundingClientRect(), m);
      },
      children: d ? /* @__PURE__ */ p("span", { className: "rt-token-nested", children: u }) : u
    }
  );
}, Pd = Dl.extend({
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
    return bl(Ld);
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
    return ["span", xl({ "data-type": "token" }, e), `{{${n.attrs.field ?? ""}}}`];
  },
  renderText({ node: n }) {
    return `{{${n.attrs.field ?? ""}}}`;
  }
}), Bd = 240, Fd = 280, Hd = ({ props: n, onApi: e }) => {
  const t = vr(), r = N(e);
  r.current = e, oe(() => {
    r.current(t);
  }, [t]);
  const i = N(null);
  oe(() => {
    var s;
    t.pointerDriven || pn(
      (s = i.current) == null ? void 0 : s.querySelector(".ui-item-highlighted"),
      "nearest",
      i.current
    );
  }, [t.highlightedIndex, t.pointerDriven]), oe(() => {
    n.items.length > 0 && t.highlightedIndex === -1 && t.setHighlighted(0, "keyboard");
  }, [n.items.length, t.highlightedIndex, t]);
  const o = br();
  return /* @__PURE__ */ p(_n.Provider, { value: t, children: /* @__PURE__ */ p(
    "div",
    {
      className: "ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto",
      style: { width: Fd, maxHeight: Bd },
      onMouseDown: (s) => s.preventDefault(),
      children: /* @__PURE__ */ p("div", { ref: i, children: n.items.map((s) => /* @__PURE__ */ p(
        _d,
        {
          item: s,
          d: o,
          command: () => n.command({ field: s.key })
        },
        s.key
      )) })
    }
  ) });
}, _d = ({ item: n, d: e, command: t }) => {
  const { myIndex: r, highlighted: i, setPointer: o } = Lo({
    label: () => n.label,
    activate: t
  }), s = Ce(), l = { padding: `${O(8, 12, s)}px ${O(12, 16, s)}px`, fontSize: O(12, 14, s) };
  return /* @__PURE__ */ M(
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
}, lo = () => {
  let n = null;
  const e = (r) => {
    n && (n.props = r, n.holder.style.display = r.items.length > 0 ? "" : "none", n.root.render(
      /* @__PURE__ */ p(Hd, { props: r, onApi: (i) => {
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
        const a = (d = (u = n.props) == null ? void 0 : u.clientRect) == null ? void 0 : d.call(u), c = a && !s.endsWith("-end") ? a.width : 0;
        n.holder.style.position = l, n.holder.style.left = `${i + c}px`, n.holder.style.top = `${o}px`;
      }
    }));
  };
  return {
    onStart(r) {
      const i = document.createElement("div");
      i.style.zIndex = "10002";
      const o = Ol(i);
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
}, jd = Ed.create({
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
}), ir = new xt("retainedSelectionHighlight"), Wd = pt.create({
  name: "retainedSelectionHighlight",
  addProseMirrorPlugins() {
    return [
      new Rt({
        key: ir,
        state: {
          init: () => ({ held: !1, decorations: Wn.empty }),
          apply(n, e) {
            const t = n.getMeta(ir), r = t ? t.held : e.held;
            if (!r) return { held: !1, decorations: Wn.empty };
            const { from: i, to: o, empty: s } = n.selection;
            return {
              held: r,
              decorations: s ? Wn.empty : Wn.create(n.doc, [Nl.inline(i, o, { class: "rt-retained-selection" })])
            };
          }
        },
        props: {
          decorations(n) {
            var e;
            return (e = ir.getState(n)) == null ? void 0 : e.decorations;
          }
        }
      })
    ];
  }
}), ih = {
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
function Qs(n, e) {
  const t = n.state.doc.resolve(e).nodeBefore;
  return t && t.type.name === "token" ? t.attrs.field ?? "" : null;
}
function qd(n) {
  const e = n.state.selection.$from, t = e.nodeBefore;
  if (!(t != null && t.isText)) return null;
  const r = t.text || "", i = r.lastIndexOf(".");
  if (i < 0) return null;
  const o = e.pos - r.length + i, s = Qs(n, o);
  return s == null ? null : { chipKey: s, dotPos: o };
}
const Jd = Le.forwardRef(({
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
}, d) => {
  const f = N(s);
  f.current = s;
  const h = N(l);
  h.current = l;
  const m = N(a);
  m.current = a;
  const g = N(c);
  g.current = c;
  const x = N(u);
  x.current = u;
  const y = N(null), z = N(null), A = N(e);
  A.current = e;
  const C = N(r);
  C.current = r;
  const w = N(o);
  w.current = o;
  const I = N(null), F = (B) => {
    var R;
    const D = B.getAttributes("textStyle"), V = B.getAttributes("reportTextStyle"), { from: K, to: T, empty: k } = B.state.selection;
    let X = !1, le = !1, ae = !1;
    if (!k) {
      const _ = /* @__PURE__ */ new Set(), q = /* @__PURE__ */ new Set(), W = /* @__PURE__ */ new Set();
      B.state.doc.nodesBetween(K, T, (fe) => {
        if (!fe.isText) return;
        const ue = fe.marks.find((Q) => Q.type.name === "textStyle");
        _.add((ue == null ? void 0 : ue.attrs.fontFamily) || ""), q.add((ue == null ? void 0 : ue.attrs.fontSize) || "");
        const Te = fe.marks.find((Q) => Q.type.name === "reportTextStyle");
        W.add((Te == null ? void 0 : Te.attrs.styleId) || "");
      }), X = _.size > 1, le = q.size > 1, ae = W.size > 1;
    }
    const J = {
      bold: B.isActive("bold"),
      italic: B.isActive("italic"),
      underline: B.isActive("underline"),
      strike: B.isActive("strike"),
      link: B.isActive("link"),
      color: D.color || "",
      fontFamily: D.fontFamily || "",
      fontSize: D.fontSize || "",
      textStyle: V.styleId || "",
      hasSelection: !k,
      fontFamilyMixed: X,
      fontSizeMixed: le,
      textStyleMixed: ae
    }, j = I.current;
    j && j.bold === J.bold && j.italic === J.italic && j.underline === J.underline && j.strike === J.strike && j.link === J.link && j.color === J.color && j.fontFamily === J.fontFamily && j.fontSize === J.fontSize && j.textStyle === J.textStyle && j.hasSelection === J.hasSelection && j.fontFamilyMixed === J.fontFamilyMixed && j.fontSizeMixed === J.fontSizeMixed && j.textStyleMixed === J.textStyleMixed || (I.current = J, (R = w.current) == null || R.call(w, J));
  }, $ = (B) => {
    var k;
    const D = B.state.selection;
    let V = null;
    D instanceof hn && D.node.type.name === "token" ? (V = { key: D.node.attrs.field ?? "", pos: D.from }, y.current = D.from) : y.current != null && (y.current = B.state.tr.mapping.map(y.current));
    const K = z.current, T = K && V && K.key === V.key && K.pos === V.pos;
    !K && !V || T || (z.current = V, (k = x.current) == null || k.call(x, V));
  }, S = (B) => {
    const D = $d(Dd(B));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(D) ? "" : D;
  }, G = Le.useMemo(() => {
    const B = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: K }) => {
        var T;
        return ((T = h.current) == null ? void 0 : T.call(h, K)) ?? [];
      },
      command: ({ editor: K, range: T, props: k }) => {
        K.chain().focus().insertContentAt(T, { type: "token", attrs: { field: k.field } }).run();
      },
      render: lo
    }, D = Pd.configure({
      resolve: f.current ?? null,
      suggestion: B,
      onTokenClick: (K, T, k) => {
        var X;
        y.current = k, (X = g.current) == null || X.call(g, K, T, k);
      }
    }), V = pt.create({
      name: "tokenAttributeSuggestion",
      addProseMirrorPlugins() {
        return [
          $l({
            pluginKey: new xt("tokenAttributeSuggestion"),
            editor: this.editor,
            char: ".",
            // The gate is `shouldShow` (a chip must sit immediately before the
            // dot), not the prefix rule — the prefix here is an atom, not text.
            allowedPrefixes: null,
            decorationClass: "suggestion-attr",
            shouldShow: ({ editor: K, range: T }) => Qs(K, T.from) != null,
            items: ({ editor: K, query: T }) => {
              var X;
              const k = qd(K);
              return k ? ((X = m.current) == null ? void 0 : X.call(m, k.chipKey, T)) ?? [] : [];
            },
            command: ({ editor: K, range: T, props: k }) => {
              K.chain().focus().insertContentAt(T, { type: "token", attrs: { field: k.field } }).run();
            },
            render: lo
          })
        ];
      }
    });
    return [D, V];
  }, []), E = wl({
    immediatelyRender: !1,
    extensions: [
      Cl,
      Tl.configure({ placeholder: t }),
      El,
      Ml,
      Rl,
      jd,
      Wd,
      Il,
      zl,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      Al.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      ...G
    ],
    content: so(n || ""),
    editable: !r,
    onUpdate: ({ editor: B }) => {
      A.current(S(B.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: B }) => {
      F(B), $(B);
    }
  });
  return oe(() => {
    if (!E || E.isFocused) return;
    S(E.getHTML()) !== n && (I.current = null, E.commands.setContent(so(n || ""), { emitUpdate: !1 }), F(E));
  }, [n, E]), oe(() => {
    E && E.setEditable(!r);
  }, [r, E]), oe(() => {
    E && (I.current = null, F(E), $(E));
  }, [E]), rl(d, () => ({
    exec: (B, D, V) => {
      if (!E || C.current) return;
      const K = E.chain(), T = (V == null ? void 0 : V.focus) === !1 ? K : K.focus();
      switch (B) {
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
          D && T.setColor(D).run();
          break;
        case "unsetColor":
          T.unsetColor().run();
          break;
        case "fontFamily":
          D && T.setFontFamily(D).run();
          break;
        case "unsetFontFamily":
          T.unsetFontFamily().run();
          break;
        case "fontSize":
          D && T.setFontSize(D).run();
          break;
        case "unsetFontSize":
          T.unsetFontSize().run();
          break;
        // Linked named style: mark the run with the consumer's style id. Direct
        // font family/size on the range is cleared so the linked style's
        // typography takes effect (the object-level precedent); bold/italic
        // marks stay — direct character formatting still wins (Word).
        case "textStyle":
          D && T.setMark("reportTextStyle", { styleId: D }).unsetFontFamily().unsetFontSize().run();
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
          D && T.extendMarkRange("link").setLink({ href: D }).run();
          break;
        case "unlink":
          T.extendMarkRange("link").unsetLink().run();
          break;
      }
    },
    focus: (B) => E == null ? void 0 : E.commands.focus(B),
    insertToken: (B) => {
      !E || C.current || E.chain().focus().insertContent({ type: "token", attrs: { field: B } }).run();
    },
    replaceToken: (B) => {
      if (!E || C.current) return;
      const D = y.current;
      D != null && E.commands.command(({ tr: V }) => {
        const K = V.doc.nodeAt(D);
        if (!K || K.type.name !== "token") return !1;
        V.setNodeMarkup(D, void 0, { field: B });
        const T = V.doc.resolve(D);
        return T.nodeAfter && T.nodeAfter.type.name === "token" && V.setSelection(new hn(T)), !0;
      });
    },
    holdSelectionHighlight: (B) => {
      !E || E.isDestroyed || E.view.dispatch(E.state.tr.setMeta(ir, { held: B }));
    }
  }), [E]), /* @__PURE__ */ p(kl, { editor: E, className: `richtext-editor ${i || ""}` });
});
Jd.displayName = "RichTextEditor";
const Kd = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], Vd = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], ao = ({ className: n = "w-3 h-3" }) => /* @__PURE__ */ p("span", { className: `${n} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ p("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), Yd = ({ value: n, disabled: e, onChange: t, mixed: r }) => {
  const [i, o] = ne(!1);
  return /* @__PURE__ */ p(
    wr,
    {
      open: i,
      onOpenChange: o,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ M("button", { type: "button", disabled: e, className: `${$a} w-28 justify-between`, children: [
        r ? /* @__PURE__ */ p("span", { className: "truncate italic text-zinc-500", children: "Mixed" }) : /* @__PURE__ */ p("span", { className: "truncate", style: { fontFamily: n || "Helvetica" }, children: n || "Helvetica" }),
        /* @__PURE__ */ p(Bn, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: Kd.map((s) => /* @__PURE__ */ p(sa, { onClick: () => {
        t(s), o(!1);
      }, icon: !r && s === n ? /* @__PURE__ */ p(Pn, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ p("span", { style: { fontFamily: s }, children: s }) }, s))
    }
  );
}, Ud = ({ editorRef: n, disabled: e, active: t }) => {
  const [r, i] = ne(!1), o = kr(), [s, l] = ne(""), a = () => {
    var u;
    const c = s.trim();
    c && ((u = n.current) == null || u.exec("link", c), i(!1));
  };
  return /* @__PURE__ */ p(
    wr,
    {
      open: r,
      onOpenChange: i,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ p(
        st,
        {
          theme: "dark",
          active: t,
          disabled: e,
          onMouseDown: (c) => c.preventDefault(),
          style: { ...o.toggle, padding: 0 },
          className: "justify-center",
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ p(fl, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ M("div", { className: "p-2 flex flex-col gap-2", children: [
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
            className: Aa + " w-full"
          }
        ),
        /* @__PURE__ */ M("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ p(st, { theme: "dark", onClick: a, style: o.control, disabled: !s.trim(), children: "Apply" }),
          /* @__PURE__ */ p(
            st,
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
}, oh = ({ editorRef: n, disabled: e, active: t, lockedFormatting: r, trailing: i, font: o, fontSizeSlot: s, showClearFormatting: l, dividers: a = !0 }) => {
  const [c, u] = ne(!1), d = (x, y) => {
    var z;
    return (z = n.current) == null ? void 0 : z.exec(x, y);
  }, f = kr(), h = (x) => !!(r != null && r[x]), m = "flex items-center gap-1 shrink-0", g = a ? /* @__PURE__ */ p("div", { className: _o }) : null;
  return /* @__PURE__ */ M("div", { className: `flex flex-wrap items-center ${a ? "gap-x-1" : "gap-x-2"} gap-y-1.5`, children: [
    /* @__PURE__ */ M("div", { className: m, children: [
      /* @__PURE__ */ p(sn, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ p(st, { theme: "dark", "aria-label": "Bold", active: ((t == null ? void 0 : t.bold) ?? !1) || h("bold"), disabled: e || h("bold"), onMouseDown: (x) => x.preventDefault(), onClick: () => d("bold"), style: { ...f.toggle, padding: 0 }, className: "justify-center font-bold", children: "B" }) }),
      /* @__PURE__ */ p(sn, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ p(st, { theme: "dark", "aria-label": "Italic", active: ((t == null ? void 0 : t.italic) ?? !1) || h("italic"), disabled: e || h("italic"), onMouseDown: (x) => x.preventDefault(), onClick: () => d("italic"), style: { ...f.toggle, padding: 0 }, className: "justify-center italic", children: "I" }) }),
      /* @__PURE__ */ p(sn, { content: "Underline", children: /* @__PURE__ */ p(st, { theme: "dark", "aria-label": "Underline", active: (t == null ? void 0 : t.underline) ?? !1, disabled: e, onMouseDown: (x) => x.preventDefault(), onClick: () => d("underline"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ p(cl, { className: "w-3 h-3" }) }) }),
      /* @__PURE__ */ p(sn, { content: "Strikethrough", children: /* @__PURE__ */ p(st, { theme: "dark", "aria-label": "Strikethrough", active: (t == null ? void 0 : t.strike) ?? !1, disabled: e, onMouseDown: (x) => x.preventDefault(), onClick: () => d("strikeThrough"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ p(ul, { className: "w-3 h-3" }) }) })
    ] }),
    g,
    /* @__PURE__ */ p("div", { className: m, children: /* @__PURE__ */ p(Ud, { editorRef: n, disabled: e, active: (t == null ? void 0 : t.link) ?? !1 }) }),
    g,
    /* @__PURE__ */ p("div", { className: m, children: /* @__PURE__ */ p(
      wr,
      {
        open: c,
        onOpenChange: u,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ M(st, { theme: "dark", disabled: e, style: f.control, className: "justify-between min-w-0", title: "Text color", children: [
          t != null && t.color ? /* @__PURE__ */ p("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: t.color } }) : /* @__PURE__ */ p(ao, {}),
          /* @__PURE__ */ p(Bn, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ M("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ p(
            "button",
            {
              onClick: () => {
                d("unsetColor"), u(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${t != null && t.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ p(ao, { className: "w-3.5 h-3.5" })
            }
          ),
          Vd.map((x) => /* @__PURE__ */ p(
            "button",
            {
              onClick: () => {
                d("foreColor", x), u(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors ${x === (t == null ? void 0 : t.color) ? "ring-2 ring-zinc-300" : ""}`,
              style: { background: x },
              title: x
            },
            x
          ))
        ] })
      }
    ) }),
    (o || s || l) && /* @__PURE__ */ M(Xe, { children: [
      g,
      /* @__PURE__ */ M("div", { className: m, children: [
        o && /* @__PURE__ */ p(Yd, { value: o.value || "Helvetica", mixed: o.mixed, disabled: e, onChange: o.onChange }),
        s,
        l && /* @__PURE__ */ p(sn, { content: "Clear formatting", children: /* @__PURE__ */ p(
          st,
          {
            theme: "dark",
            "aria-label": "Clear formatting",
            disabled: e,
            onMouseDown: (x) => x.preventDefault(),
            onClick: () => d("clearFormatting"),
            style: { ...f.toggle, padding: 0 },
            className: "justify-center",
            children: /* @__PURE__ */ p(dl, { className: "w-3 h-3" })
          }
        ) })
      ] })
    ] }),
    i && /* @__PURE__ */ M(Xe, { children: [
      g,
      /* @__PURE__ */ p("div", { className: m, children: i })
    ] })
  ] });
};
function Ci(n, e, t) {
  return Math.max(e, Math.min(t, n));
}
function Gd(n, e, t, r, i) {
  return Ci(n + e * i, t, r);
}
const Xd = 2;
function Qd(n, e, t, r, i) {
  return Ci(n + Math.trunc(e / Xd) * i, t, r);
}
const Zd = 3;
function sh({
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
  placeholder: d,
  theme: f
}) {
  const [h, m] = ne(null), [g, x] = ne(!1), y = N(!1), z = N(null), A = N(null), C = N(null), w = Ce(), I = Fo(), F = c === void 0;
  oe(() => () => {
    var T;
    return (T = z.current) == null ? void 0 : T.call(z);
  }, []), ft(() => {
    const T = C.current, k = A.current;
    !F && T && k && (k.style.color = getComputedStyle(T).color);
  }, [F, c]), oe(() => {
    y.current || m(null);
  }, [n]);
  const $ = n ?? r, S = h !== null ? h : n != null ? String(n) : d ? "" : String(r), G = (T) => Ci(T, e, t), E = (T) => {
    const k = Gd($, T, e, t, o);
    k !== $ && (y.current && m(String(k)), i(k));
  }, B = (T) => {
    if (l || s || T.pointerType !== "mouse" || T.button !== 0) return;
    const k = T.currentTarget, X = T.clientY, le = $;
    let ae = le, J = !1;
    const j = (_) => {
      const q = X - _.clientY;
      if (!J) {
        if (Math.abs(q) < Zd) return;
        J = !0, k.blur(), k.style.userSelect = "none";
      }
      const W = Qd(le, q, e, t, o);
      W !== ae && (ae = W, i(W));
    }, R = () => {
      z.current = null, window.removeEventListener("pointermove", j), window.removeEventListener("pointerup", R), window.removeEventListener("pointercancel", R), k.style.userSelect = "", J && k.blur();
    };
    z.current = R, window.addEventListener("pointermove", j), window.addEventListener("pointerup", R), window.addEventListener("pointercancel", R);
  }, D = (T) => ({
    type: "button",
    tabIndex: -1,
    "aria-label": T === 1 ? "Increase" : "Decrease",
    disabled: !!l || !!s || (T === 1 ? $ >= t : $ <= e),
    onPointerDown: (k) => k.preventDefault(),
    onClick: () => E(T)
  }), V = F ? O(22, 30, w) : O(16, 22, w), K = F ? O(14, 18, w) : O(11, 15, w);
  return /* @__PURE__ */ M(
    "span",
    {
      ref: A,
      className: `ui-number ${F ? "ui-number-box" : ""}`,
      ...f ? { "data-theme": f } : {},
      children: [
        /* @__PURE__ */ p(
          "input",
          {
            ref: C,
            type: "number",
            "aria-label": a,
            title: u,
            placeholder: d,
            value: S,
            readOnly: s,
            disabled: l,
            className: c ?? "ui-input w-20",
            style: {
              ...F ? { ...I, minHeight: O(30, 38, w) } : {},
              paddingRight: V + 2,
              cursor: l || s ? void 0 : g ? "text" : "ns-resize"
            },
            onFocus: () => {
              y.current = !0, x(!0);
            },
            onChange: (T) => {
              const k = T.target.value;
              m(k);
              const X = parseInt(k, 10);
              k !== "" && !Number.isNaN(X) && i(G(X));
            },
            onBlur: () => {
              if (y.current = !1, x(!1), h === null) return;
              const T = parseInt(h, 10);
              Number.isNaN(T) || i(G(T)), m(null);
            },
            onKeyDown: (T) => {
              T.key === "Enter" && T.target.blur(), T.key === "Escape" && (m(null), T.target.blur()), !s && !l && (T.key === "ArrowUp" || T.key === "ArrowDown") && (T.preventDefault(), E(T.key === "ArrowUp" ? 1 : -1));
            },
            onPointerDown: B
          }
        ),
        /* @__PURE__ */ M("span", { className: "ui-number-steppers", style: { width: V }, children: [
          /* @__PURE__ */ p("button", { ...D(1), className: "ui-number-step", children: /* @__PURE__ */ p(hl, { style: { width: K, height: K } }) }),
          /* @__PURE__ */ p("button", { ...D(-1), className: "ui-number-step", children: /* @__PURE__ */ p(Bn, { style: { width: K, height: K } }) })
        ] })
      ]
    }
  );
}
function lh({ title: n, icon: e, count: t, tone: r = "default", collapsed: i, onToggle: o, trailing: s, bodyClass: l, className: a = "", dataProps: c, children: u }) {
  const d = Ce(), f = Bt({ px: 12, py: 8, fs: 12 }, { px: 14, py: 12, fs: 14 }), h = O(14, 16, d), m = { width: h, height: h }, g = O(10, 12, d);
  return /* @__PURE__ */ M("div", { ...c, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${a}`, children: [
    /* @__PURE__ */ M("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1 bg-[var(--ui-card-header-bg)] text-[color:var(--ui-card-header-text)] hover:bg-[var(--ui-card-header-hover)] transition-colors", style: f, children: [
      /* @__PURE__ */ M(
        "button",
        {
          type: "button",
          onClick: o,
          className: "flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer",
          children: [
            i ? /* @__PURE__ */ p(or, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: m }) : /* @__PURE__ */ p(Bn, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: m }),
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
function Zs({
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
  return /* @__PURE__ */ M(
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
function ef({
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
  onExpandedChange: d,
  actions: f,
  leadingIcon: h,
  showClear: m = !0,
  onSubmit: g,
  onCancel: x,
  cancelOnEscape: y = !1,
  cancelOnOutside: z = !1,
  className: A = "",
  "aria-label": C
}) {
  const [w, I] = ne(u), F = N(w);
  F.current = w;
  const $ = N(null), S = N(null), G = N(null), E = yo(), B = ie((j) => {
    F.current !== j && (F.current = j, I(j), d == null || d(j));
  }, [d]), D = ie((j = !1) => {
    var R;
    B(!1), (R = S.current) == null || R.blur(), j && requestAnimationFrame(() => {
      var _;
      return (_ = G.current) == null ? void 0 : _.focus();
    });
  }, [B]), V = ie(() => {
    B(!0), requestAnimationFrame(() => {
      const j = S.current;
      if (!j) return;
      j.focus();
      const R = j.value.length;
      j.setSelectionRange(R, R);
    });
  }, [B]);
  oe(() => {
    u && V();
  }, [u, V]), oe(() => {
    var _;
    if (!w) return;
    const j = ((_ = $.current) == null ? void 0 : _.ownerDocument) ?? document, R = (q) => {
      var fe;
      const W = q.target;
      W && ((fe = $.current) != null && fe.contains(W) || (z && (x == null || x()), D()));
    };
    return j.addEventListener("pointerdown", R, !0), () => j.removeEventListener("pointerdown", R, !0);
  }, [w, D, z, x]);
  const K = ie((j) => {
    var _;
    if (!w) return;
    const R = j.relatedTarget;
    R && ((_ = $.current) != null && _.contains(R)) || (z && (x == null || x()), D());
  }, [w, D, z, x]), T = ie((j) => {
    if (j.key === "Enter" && g) {
      j.preventDefault(), g(n), D(!0);
      return;
    }
    j.key === "Escape" && (j.preventDefault(), j.stopPropagation(), y ? x == null || x() : e(""), D(!0));
  }, [e, D, y, x, g, n]), k = h === void 0 ? r ?? /* @__PURE__ */ p(Jt, { className: "w-3.5 h-3.5" }) : h, ae = 8 + (((f == null ? void 0 : f.length) || 0) + (m && n ? 1 : 0)) * (E.box + 2), J = (j) => /* @__PURE__ */ p(
    "span",
    {
      style: { width: E.icon, height: E.icon },
      className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
      children: j
    }
  );
  return /* @__PURE__ */ p(
    Zs,
    {
      expanded: w,
      collapsedWidth: o,
      expandedWidth: s,
      rootRef: $,
      shrink: !0,
      "data-morph-search": !0,
      "data-theme": a,
      "data-expanded": w ? "true" : "false",
      className: A,
      onBlur: K,
      trigger: /* @__PURE__ */ p(
        st,
        {
          ref: G,
          type: "button",
          variant: l,
          size: "minimal",
          theme: a,
          icon: r ?? /* @__PURE__ */ p(Jt, { className: "w-3.5 h-3.5" }),
          active: c,
          onClick: V,
          className: `w-full justify-start ${w ? "pointer-events-none" : ""}`,
          tabIndex: w ? -1 : 0,
          "aria-expanded": w,
          "aria-label": C || t,
          "data-morph-search-trigger": !0,
          children: /* @__PURE__ */ p("span", { className: "min-w-0 truncate", children: t })
        }
      ),
      field: /* @__PURE__ */ M(Xe, { children: [
        k && /* @__PURE__ */ p(
          "span",
          {
            className: "ui-icon absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none",
            style: { width: E.icon, height: E.icon },
            children: J(k)
          }
        ),
        /* @__PURE__ */ p(
          "input",
          {
            ref: S,
            value: n,
            onChange: (j) => e(j.target.value),
            onKeyDown: T,
            placeholder: i,
            "aria-label": C || i,
            tabIndex: w ? 0 : -1,
            "data-morph-search-input": !0,
            style: { paddingLeft: k ? E.icon + 16 : 10, paddingRight: ae },
            className: `${Jr("sm")} w-full`
          }
        ),
        /* @__PURE__ */ M("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
          f == null ? void 0 : f.map((j) => /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              "aria-label": j.label,
              title: j.label,
              tabIndex: w ? 0 : -1,
              onMouseDown: (R) => R.preventDefault(),
              onClick: () => {
                j.onClick(n, { close: () => D(!0) }), j.keepOpen || D(!0);
              },
              style: { width: E.box, height: E.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-action": j.key,
              children: J(j.icon)
            },
            j.key
          )),
          m && n && /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              "aria-label": "Clear",
              tabIndex: w ? 0 : -1,
              onClick: () => {
                e(""), requestAnimationFrame(() => {
                  var j;
                  return (j = S.current) == null ? void 0 : j.focus();
                });
              },
              style: { width: E.box, height: E.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-clear": !0,
              children: /* @__PURE__ */ p(Ut, { size: E.icon })
            }
          )
        ] })
      ] })
    }
  );
}
function ah({
  triggerLabel: n,
  triggerIcon: e = /* @__PURE__ */ p(ei, { className: "w-3.5 h-3.5" }),
  fieldIcon: t = null,
  actions: r = [],
  onSubmit: i,
  onCancel: o,
  clearOnSubmit: s = !0,
  clearOnCancel: l = !0,
  onChange: a,
  value: c,
  variant: u = "primary",
  ...d
}) {
  const f = (g) => {
    i == null || i(g), s && a("");
  }, h = () => {
    o == null || o(), l && a("");
  }, m = [
    ...r,
    ...i ? [{
      key: "submit",
      label: "Submit",
      icon: /* @__PURE__ */ p(Pn, { className: "w-3.5 h-3.5" }),
      onClick: f
    }] : [],
    ...o ? [{
      key: "cancel",
      label: "Cancel",
      icon: /* @__PURE__ */ p(Ut, { className: "w-3.5 h-3.5" }),
      onClick: h
    }] : []
  ];
  return /* @__PURE__ */ p(
    ef,
    {
      ...d,
      value: c,
      onChange: a,
      triggerLabel: n,
      triggerIcon: e,
      leadingIcon: t,
      actions: m,
      showClear: !1,
      variant: u,
      onSubmit: i ? f : void 0,
      onCancel: o ? h : void 0,
      cancelOnEscape: !!o,
      cancelOnOutside: !!o
    }
  );
}
function tf(n) {
  return n.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
}
function nf(n, e, t) {
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
function el(n, e, t) {
  const r = tf(t), i = r.length > 0, o = new Map(e.map((c) => [c.key, c])), s = [];
  for (const c of n) {
    const { matched: u, detail: d } = nf(c, c.group ? o.get(c.group) : void 0, r);
    u && s.push({ item: c, detail: d });
  }
  const l = new Set(s.map((c) => c.item.group).filter(Boolean)), a = i ? e.filter((c) => l.has(c.key) || c.label.toLowerCase().includes(t.trim().toLowerCase())) : e;
  return { hits: s, visibleGroups: a, hasQuery: i };
}
function rf(n) {
  var s;
  const { hits: e, visibleGroups: t, hasQuery: r } = el(n.items, n.groups, n.query), i = [];
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
function ch({
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
  closeOnSelect: d = !0,
  openOnFocus: f = !0,
  expandableGroups: h = !1,
  browseExpanded: m = !1,
  groupExpandMode: g = "multiple",
  browseAll: x = !1,
  selectedId: y,
  autoFocus: z = !0,
  collapsedWidth: A = 128,
  expandedWidth: C = 288,
  panelWidth: w,
  maxMenuHeight: I = 420,
  theme: F = "light",
  morph: $ = !0,
  emptyTitle: S,
  emptyHint: G,
  renderEmpty: E,
  emptyActions: B,
  leadingActions: D,
  hideLeadingOnEmpty: V = !1,
  footerActions: K,
  fieldActions: T,
  multiple: k
}) {
  const X = s !== void 0, [le, ae] = ne(""), J = X ? s : le, j = ie((b) => {
    X || ae(b), l == null || l(b);
  }, [X, l]), [R, _] = ne(!1), [q, W] = ne(t === "inline"), fe = Ge(() => e.map((b) => b.key).join("\0"), [e]), ue = Ge(() => new Set(fe ? fe.split("\0") : []), [fe]), [Te, Q] = ne(() => m ? ue : /* @__PURE__ */ new Set()), [U, $e] = ne(0), me = N(!1), Je = ie((b, L = "keyboard") => {
    me.current = L === "pointer", $e(b);
  }, []), xe = N(null), ce = N(null), Me = N(null), ve = N(null), De = N(null), Fe = N(0), He = ni(), jt = xn(), Ve = br(), Wt = ui(), kt = $o(), Oe = yo(), en = 8 + (((T == null ? void 0 : T.length) || 0) + (J ? 1 : 0)) * (Oe.box + 2), [bt, tn] = ne({ top: 0, left: 0, maxH: 288, ready: !1 }), [nn, At] = ne(0);
  So({
    anchorRef: xe,
    panelRef: ve,
    open: R,
    maxHeight: I,
    anchorRectRef: De,
    onPosition: (b) => tn({ top: b.top, left: b.left, maxH: b.maxH, ready: b.ready })
  }), oe(() => {
    !R || !xe.current || At(xe.current.getBoundingClientRect().width);
  }, [R, q]);
  const St = xr({
    visible: R,
    morph: $,
    anchor: () => {
      var b;
      return ((b = xe.current) == null ? void 0 : b.getBoundingClientRect()) ?? null;
    },
    ref: ve,
    cloneOnUnmount: !0
  }), mt = (B || []).map(
    (b) => typeof b.label == "function" ? b.label(J) : b.label
  ), we = Ge(
    () => rf({
      items: n,
      groups: e,
      query: J,
      browseGroups: f || m,
      browseAll: x,
      expandedGroups: Te,
      emptyActionLabels: mt
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [n, e, J, f, m, x, Te, mt.join("\0")]
  ), tt = Ge(
    () => (D || []).map((b, L) => ({
      kind: "action",
      label: typeof b.label == "function" ? b.label(J) : b.label,
      actionIndex: L,
      source: "leading"
    })),
    [D, J]
  ), Nt = Ge(
    () => (K || []).map((b, L) => ({
      kind: "action",
      label: typeof b.label == "function" ? b.label(J) : b.label,
      actionIndex: L,
      source: "footer"
    })),
    [K, J]
  ), at = we.some((b) => b.kind === "empty"), nt = tt.length > 0 && !(V && at), Ye = nt ? tt.length : 0, ct = Ge(
    () => [...nt ? tt : [], ...we, ...Nt],
    [nt, tt, we, Nt]
  ), vt = !!c || h && !J.trim(), P = Ge(
    () => ct.map((b, L) => ({ row: b, index: L })).filter((b) => !(b.row.kind === "empty" || b.row.kind === "item" && b.row.hidden || b.row.kind === "group" && !vt)),
    [ct, vt]
  ), te = (h || m) && !J.trim(), se = !!k, Ue = Ge(() => n.map((b) => b.id), [n]), ut = Ge(() => J.trim() ? el(n, e, J).hits.map((b) => b.item.id) : Ue, [n, e, J, Ue]), vn = Ge(() => new Set(ut), [ut]), Ae = Mo({
    mode: "draft",
    selectedIds: (k == null ? void 0 : k.selectedIds) ?? Io,
    itemIds: Ue,
    visibleIds: ut,
    max: k == null ? void 0 : k.max,
    disabledIds: k == null ? void 0 : k.disabledIds,
    indicator: k == null ? void 0 : k.indicator,
    onCommit: k == null ? void 0 : k.onCommit
  }), wn = N(Ae.reset);
  wn.current = Ae.reset;
  const Er = typeof (k == null ? void 0 : k.commitLabel) == "function" ? k.commitLabel(Ae.count) : (k == null ? void 0 : k.commitLabel) ?? `Select ${Ae.count}`, v = ie(() => {
    var b;
    _(!1), t === "expandable" && ((b = ce.current) == null || b.blur(), W(!1), requestAnimationFrame(() => {
      var L;
      return (L = Me.current) == null ? void 0 : L.focus();
    })), j(""), Je(0), Q(m ? ue : /* @__PURE__ */ new Set()), u == null || u();
  }, [t, u, j, m, ue]);
  oe(() => {
    if (J.trim() || !m) {
      Q((b) => b.size ? /* @__PURE__ */ new Set() : b);
      return;
    }
    Q((b) => b.size === ue.size && [...ue].every((L) => b.has(L)) ? b : ue);
  }, [J, m, ue]);
  const Y = ie((b) => {
    Q((L) => {
      const re = new Set(L);
      return re.has(b) ? re.delete(b) : (g === "single" && re.clear(), re.add(b)), re;
    });
  }, [g]), ee = ie(() => {
    var L;
    if (R) {
      (L = ce.current) == null || L.focus();
      return;
    }
    if (wn.current(), t === "expandable" && !q) {
      const re = xe.current;
      if (re) {
        const he = re.style.transition, Re = re.style.width;
        re.style.transition = "none", re.style.width = `${C}px`;
        const je = re.getBoundingClientRect();
        De.current = { left: je.left, top: je.top, width: je.width, height: je.height }, re.style.width = Re, re.offsetWidth, re.style.transition = he, window.clearTimeout(Fe.current), Fe.current = window.setTimeout(() => {
          De.current = null;
        }, Gt + 80);
      }
    }
    W(!0), _(!0);
    const b = y ? we.findIndex((re) => re.kind === "item" && re.hit.item.id === y) : -1;
    Je(b >= 0 ? Ye + b : Ye);
  }, [R, t, q, C, Ye, we, y]);
  oe(() => () => {
    window.clearTimeout(Fe.current), De.current = null;
  }, []), oe(() => {
    if (t !== "expandable" || !q || !R || !z) return;
    const b = requestAnimationFrame(() => {
      var L;
      return (L = ce.current) == null ? void 0 : L.focus();
    });
    return () => cancelAnimationFrame(b);
  }, [t, q, R, z]), oe(() => {
    var re;
    if (!R) return;
    const b = ((re = xe.current) == null ? void 0 : re.ownerDocument) ?? He;
    if (!b) return;
    const L = (he) => {
      var je, $t;
      const Re = he.target;
      Re && ((je = xe.current) != null && je.contains(Re) || ($t = ve.current) != null && $t.contains(Re) || v());
    };
    return b.addEventListener("pointerdown", L, !0), () => b.removeEventListener("pointerdown", L, !0);
  }, [R, v, He]);
  const de = ie((b) => {
    if (b.kind === "group") {
      c ? (c(b.group), d && v()) : vt && Y(b.group.key);
      return;
    }
    if (b.kind === "item") {
      if (se) {
        Ae.canToggle(b.hit.item.id) && Ae.toggle(b.hit.item.id);
        return;
      }
      a(b.hit.item), d && v();
      return;
    }
    if (b.kind === "action") {
      const L = b.source === "leading" ? D : b.source === "footer" ? K : B, re = L == null ? void 0 : L[b.actionIndex];
      re && re.onClick(J), d && v();
    }
  }, [v, d, B, K, vt, D, se, a, c, J, Ae, Y]), pe = (b) => {
    if (P.length === 0) return;
    const L = P.findIndex((he) => he.index === U), re = L < 0 ? 0 : (L + b + P.length) % P.length;
    Je(P[re].index);
  }, be = (b) => {
    if (se && (b.metaKey || b.ctrlKey) && b.key.toLowerCase() === "a") {
      b.preventDefault(), b.stopPropagation(), Ae.setAll(!0);
      return;
    }
    if (b.key === "ArrowDown")
      b.preventDefault(), R ? pe(1) : ee();
    else if (b.key === "ArrowUp")
      b.preventDefault(), pe(-1);
    else if ((b.key === "ArrowRight" || b.key === "ArrowLeft") && h && R && !J.trim()) {
      const L = ct[U];
      if ((L == null ? void 0 : L.kind) === "group") {
        const re = Te.has(L.group.key);
        (b.key === "ArrowRight" || re) && (b.preventDefault(), Y(L.group.key));
      } else if ((L == null ? void 0 : L.kind) === "item" && b.key === "ArrowLeft" && L.hit.item.group) {
        b.preventDefault();
        const re = L.hit.item.group;
        Te.has(re) && Y(re);
        const he = ct.findIndex((Re) => Re.kind === "group" && Re.group.key === re);
        he >= 0 && Je(he);
      }
    } else if (b.key === "Enter") {
      b.preventDefault();
      const L = ct[U] ?? ct[0];
      L && de(L);
    } else b.key === "Escape" && (b.preventDefault(), v());
  }, ke = (b) => {
    t === "expandable" && !q || (j(b), R || _(!0));
  };
  oe(() => {
    const b = we.findIndex((L) => L.kind === "item");
    Je(b >= 0 ? Ye + b : Ye);
  }, [J]);
  const Ee = (b) => /* @__PURE__ */ M("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
    T == null ? void 0 : T.map((L) => /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        "aria-label": L.label,
        title: L.label,
        tabIndex: q ? 0 : -1,
        onMouseDown: (re) => re.preventDefault(),
        onClick: () => {
          L.onClick(J, { close: v }), L.keepOpen || v();
        },
        style: { width: Oe.box, height: Oe.box },
        className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
        "data-search-field-action": L.key,
        children: /* @__PURE__ */ p(
          "span",
          {
            style: { width: Oe.icon, height: Oe.icon },
            className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
            children: L.icon
          }
        )
      },
      L.key
    )),
    J && /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        "aria-label": "Clear search",
        tabIndex: q ? 0 : -1,
        onPointerDown: (L) => L.preventDefault(),
        onClick: b,
        style: { width: Oe.box, height: Oe.box },
        className: "ui-icon-btn flex items-center justify-center rounded",
        children: /* @__PURE__ */ p(Ut, { size: Oe.icon })
      }
    )
  ] }), _e = /* @__PURE__ */ M("div", { className: "relative w-full", children: [
    /* @__PURE__ */ p(Jt, { size: Oe.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ p(
      "input",
      {
        ref: ce,
        value: J,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": R,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (b) => ke(b.target.value),
        onFocus: () => {
          f && ee();
        },
        onClick: () => {
          f && ee();
        },
        onKeyDown: be,
        placeholder: o,
        style: { paddingRight: en },
        className: `${Jr("sm")} w-full pl-8`
      }
    ),
    Ee(() => {
      j(""), R || ee();
    })
  ] }), zt = /* @__PURE__ */ M("div", { className: "absolute inset-0", children: [
    /* @__PURE__ */ p(Jt, { size: Oe.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ p(
      "input",
      {
        ref: ce,
        value: J,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": R,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (b) => ke(b.target.value),
        onFocus: () => {
          f && q && ee();
        },
        onClick: () => {
          f && q && ee();
        },
        onKeyDown: be,
        placeholder: o,
        tabIndex: q ? 0 : -1,
        style: { paddingRight: en },
        className: `${Jr("sm")} h-full w-full pl-8`
      }
    ),
    Ee(() => {
      j(""), !R && q && ee();
    })
  ] });
  oe(() => {
    if (!R || me.current) return;
    const b = ve.current;
    pn(
      b == null ? void 0 : b.querySelector(`[data-search-row="${U}"]`),
      "nearest",
      (b == null ? void 0 : b.querySelector("[data-search-scroller]")) ?? null
    );
  }, [R, U]);
  const rt = N(we);
  rt.current = we;
  const kn = N(y);
  kn.current = y;
  const wt = Eo({
    open: R,
    block: "center",
    ready: bt.ready,
    scroller: () => {
      var b;
      return ((b = ve.current) == null ? void 0 : b.querySelector("[data-search-scroller]")) ?? null;
    },
    row: () => {
      var re;
      const b = kn.current;
      if (!b) return null;
      const L = rt.current.findIndex((he) => he.kind === "item" && he.hit.item.id === b);
      return L < 0 ? null : ((re = ve.current) == null ? void 0 : re.querySelector(`[data-search-row="${L}"]`)) ?? null;
    }
  }), it = (b, L) => {
    const re = U === L, he = !se && y !== void 0 && b.hit.item.id === y, Re = se ? Ae.isSelected(b.hit.item.id) : he, je = !!b.hit.item.disabled || se && !Ae.canToggle(b.hit.item.id);
    return /* @__PURE__ */ M(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": Re,
        tabIndex: -1,
        "data-search-item": b.hit.item.id,
        "data-search-row": L,
        onMouseDown: ($t) => $t.preventDefault(),
        onMouseEnter: () => Je(L, "pointer"),
        onClick: () => de(b),
        style: Wt,
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${Ve.itemDefault} ${he ? "ui-item-selected" : ""} ${re ? "ui-item-highlighted" : ""} ${je ? "opacity-30 pointer-events-none" : ""}`,
        children: [
          se && /* @__PURE__ */ p(lr, { checked: Re, disabled: je, indicator: k == null ? void 0 : k.indicator }),
          b.hit.item.icon && /* @__PURE__ */ p("span", { className: `${Ve.icon} shrink-0`, children: b.hit.item.icon }),
          /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: b.hit.item.label }),
          (b.hit.detail || b.hit.item.detail) && /* @__PURE__ */ p("span", { className: "shrink-0 max-w-[55%] truncate text-[10px] text-zinc-400", children: b.hit.detail || b.hit.item.detail }),
          he && /* @__PURE__ */ p(Pn, { className: "ui-icon w-3.5 h-3.5 shrink-0", "aria-hidden": !0 })
        ]
      },
      `item:${b.hit.item.id}`
    );
  }, jn = (b, L) => {
    const re = Te.has(b.group.key), he = h && !J.trim(), Re = vt, je = Re && U === L, $t = se ? n.filter((We) => We.group === b.group.key && vn.has(We.id)) : [], Nn = $t.filter((We) => !Ae.isDisabled(We.id)).map((We) => We.id), Ti = Nn.length > 0 ? Ae.groupState(Nn) : "none", tl = $t.reduce((We, nl) => We + (Ae.isSelected(nl.id) ? 1 : 0), 0), Ei = se && /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        tabIndex: -1,
        "aria-label": `Select all ${b.group.label}`,
        onMouseDown: (We) => We.preventDefault(),
        onClick: (We) => {
          We.stopPropagation(), Nn.length && Ae.toggleGroup(Nn);
        },
        className: "shrink-0 flex items-center justify-center rounded",
        children: /* @__PURE__ */ p(
          lr,
          {
            checked: Ti === "all",
            indeterminate: Ti === "some",
            disabled: Nn.length === 0,
            indicator: k == null ? void 0 : k.indicator
          }
        )
      }
    ), Mi = se ? /* @__PURE__ */ M("span", { className: `shrink-0 tabular-nums text-[10px] ${Re ? "text-zinc-400" : "opacity-70"}`, children: [
      tl,
      "/",
      $t.length
    ] }) : b.group.count !== void 0 && /* @__PURE__ */ p("span", { className: `shrink-0 tabular-nums ${Re ? "text-[10px] text-zinc-400" : "opacity-70"}`, children: b.group.count });
    return Re ? /* @__PURE__ */ M(
      "div",
      {
        role: "option",
        "aria-selected": !1,
        "aria-expanded": he ? re : void 0,
        "data-search-group": b.group.key,
        onMouseEnter: () => Je(L, "pointer"),
        style: Wt,
        className: `w-full rounded flex items-center gap-1 outline-none select-none font-medium ${Ve.itemDefault} ${je ? "ui-item-highlighted" : ""}`,
        children: [
          Ei,
          /* @__PURE__ */ M(
            "button",
            {
              type: "button",
              tabIndex: -1,
              onMouseDown: (We) => We.preventDefault(),
              onClick: () => de(b),
              className: "flex min-w-0 flex-1 items-center gap-2 text-left",
              children: [
                b.group.icon && /* @__PURE__ */ p("span", { className: `${Ve.icon} shrink-0`, children: b.group.icon }),
                /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: b.group.label }),
                Mi
              ]
            }
          ),
          he && /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `${re ? "Collapse" : "Expand"} ${b.group.label}`,
              "aria-expanded": re,
              onMouseDown: (We) => We.preventDefault(),
              onClick: (We) => {
                We.stopPropagation(), Y(b.group.key);
              },
              style: { width: Oe.box, height: Oe.box },
              className: "shrink-0 flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              children: /* @__PURE__ */ p(
                Bn,
                {
                  size: Oe.icon,
                  className: `transition-transform duration-200 ${re ? "rotate-180" : ""}`
                }
              )
            }
          )
        ]
      },
      `group:${b.group.key}`
    ) : /* @__PURE__ */ M(
      "div",
      {
        role: "presentation",
        "data-search-group": b.group.key,
        "data-search-row": L,
        style: kt,
        className: "w-full flex items-center gap-2 select-none font-semibold uppercase tracking-wider ui-label",
        children: [
          Ei,
          b.group.icon && /* @__PURE__ */ p("span", { className: `${Ve.icon} shrink-0`, children: b.group.icon }),
          /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: b.group.label }),
          Mi
        ]
      },
      `group:${b.group.key}`
    );
  }, qt = (b, L) => {
    var Re;
    const re = U === L, he = b.source === "leading" ? D : b.source === "footer" ? K : B;
    return /* @__PURE__ */ M(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": !1,
        tabIndex: -1,
        "data-search-action": b.source || "empty",
        "data-search-row": L,
        onMouseEnter: () => Je(L, "pointer"),
        onClick: () => de(b),
        style: Wt,
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${Ve.itemDefault} ${re ? "ui-item-highlighted" : ""}`,
        children: [
          /* @__PURE__ */ p("span", { className: `${Ve.icon} shrink-0`, children: ((Re = he == null ? void 0 : he[b.actionIndex]) == null ? void 0 : Re.icon) || /* @__PURE__ */ p(ei, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: b.label })
        ]
      },
      `${b.source || "empty"}:${b.actionIndex}`
    );
  }, Mr = () => /* @__PURE__ */ p("div", { className: "px-3 py-3 text-center", "data-search-empty": !0, children: E ? E({ query: J, close: v }) : /* @__PURE__ */ M(Xe, { children: [
    /* @__PURE__ */ p("div", { className: "mx-auto mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-400", children: /* @__PURE__ */ p(Jt, { className: "w-3.5 h-3.5" }) }),
    /* @__PURE__ */ p("div", { className: "text-xs font-medium text-zinc-500", children: S || `No matches for “${J.trim()}”` }),
    /* @__PURE__ */ p("div", { className: "mt-0.5 text-[10px] text-zinc-400", children: G || "Try a name, phone number, board ID or category." })
  ] }) }, "__empty"), Ct = [];
  for (let b = 0; b < we.length; b++) {
    const L = we[b];
    if (L.kind === "group") {
      const re = [];
      let he = b + 1;
      for (; he < we.length && we[he].kind === "item" && we[he].hit.item.group === L.group.key; )
        re.push({ row: we[he], index: he }), he++;
      Ct.push({ group: L, index: b, items: re }), b = he - 1;
    } else L.kind === "item" ? Ct.push({ row: L, index: b }) : Ct.push({ row: L, index: b });
  }
  const Sn = R ? gr(
    /* @__PURE__ */ M(
      "div",
      {
        ref: St,
        id: "search-menu-panel",
        "data-theme": F,
        role: "listbox",
        "aria-label": o,
        "aria-multiselectable": se ? !0 : void 0,
        onPointerEnter: wt.engage,
        onPointerDown: wt.engage,
        className: "ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none min-w-0 overflow-hidden",
        style: {
          position: "fixed",
          left: bt.left,
          top: bt.top,
          width: w ?? (t === "expandable" ? C : nn || void 0),
          maxHeight: bt.maxH,
          visibility: bt.ready ? "visible" : "hidden"
        },
        children: [
          nt && /* @__PURE__ */ M("div", { className: "shrink-0 pb-1", children: [
            tt.map((b, L) => qt(b, L)),
            we.length > 0 && /* @__PURE__ */ p("div", { className: Ve.separator })
          ] }),
          /* @__PURE__ */ M("div", { "data-search-scroller": !0, className: "overflow-y-auto scrollbar-custom flex flex-col min-h-0", children: [
            we.length === 0 && /* @__PURE__ */ p("div", { className: "px-3 py-3 text-xs text-zinc-400", "data-search-empty": !0, children: E ? E({ query: J, close: v }) : /* @__PURE__ */ p(Xe, { children: "Type to search…" }) }),
            Ct.map((b) => {
              if (b.group) {
                const he = Te.has(b.group.group.key), Re = b.items || [];
                return /* @__PURE__ */ M(Le.Fragment, { children: [
                  jn(b.group, Ye + b.index),
                  te && /* @__PURE__ */ p(
                    "div",
                    {
                      "data-search-group-items": b.group.group.key,
                      "aria-hidden": !he,
                      className: "motion-reduce:transition-none",
                      style: {
                        display: "grid",
                        gridTemplateRows: he ? "1fr" : "0fr",
                        opacity: he ? 1 : 0,
                        transition: "grid-template-rows 220ms cubic-bezier(0.32, 0.72, 0, 1), opacity 150ms ease"
                      },
                      children: /* @__PURE__ */ p("div", { className: "overflow-hidden flex flex-col", children: Re.map((je) => it(je.row, Ye + je.index)) })
                    }
                  ),
                  !te && Re.map((je) => it(je.row, Ye + je.index))
                ] }, `group:${b.group.group.key}`);
              }
              const L = b.row, re = Ye + b.index;
              return L.kind === "empty" ? Mr() : L.kind === "action" ? qt(L, re) : L.kind === "item" ? it(L, re) : null;
            })
          ] }),
          Nt.length > 0 && /* @__PURE__ */ M("div", { className: "shrink-0", children: [
            /* @__PURE__ */ p("div", { className: Ve.separator }),
            Nt.map((b, L) => qt(b, Ye + we.length + L))
          ] }),
          se && (k == null ? void 0 : k.footer) !== !1 && /* @__PURE__ */ p(
            Ao,
            {
              count: Ae.count,
              max: k == null ? void 0 : k.max,
              hiddenCount: (k == null ? void 0 : k.hiddenNote) === !1 ? 0 : Ae.hiddenCount,
              clear: (k == null ? void 0 : k.clear) !== !1,
              theme: F,
              onClear: Ae.clear,
              hero: {
                label: Er,
                onClick: () => {
                  Ae.commit(), v();
                },
                disabled: Ae.count === 0
              }
            }
          )
        ]
      }
    ),
    jt ?? (He == null ? void 0 : He.body) ?? document.body
  ) : null;
  return t === "inline" ? /* @__PURE__ */ M("div", { ref: xe, "data-search-menu": !0, "data-mode": t, className: "relative inline-flex", style: { width: "100%" }, children: [
    _e,
    Sn
  ] }) : /* @__PURE__ */ p(
    Zs,
    {
      expanded: q,
      collapsedWidth: A,
      expandedWidth: C,
      rootRef: xe,
      "data-search-menu": !0,
      "data-mode": t,
      trigger: /* @__PURE__ */ p(
        st,
        {
          ref: Me,
          type: "button",
          variant: "primary",
          size: "minimal",
          theme: F === "dark" ? "dark" : "light",
          icon: i ?? /* @__PURE__ */ p(Jt, { className: "w-3.5 h-3.5" }),
          onClick: ee,
          className: `w-full justify-start ${q ? "pointer-events-none" : ""}`,
          tabIndex: q ? -1 : 0,
          "data-search-trigger": !0,
          children: /* @__PURE__ */ p("span", { children: r })
        }
      ),
      field: /* @__PURE__ */ M(Xe, { children: [
        zt,
        Sn
      ] })
    }
  );
}
export {
  st as Button,
  lh as CardSection,
  ai as CheckMark,
  Xl as Checkbox,
  Wf as Checklist,
  eh as ChromeHeader,
  Zf as ContentRow,
  Af as ContextMenu,
  $f as ContextMenuDivider,
  zf as ContextMenuItem,
  Df as ContextMenuSub,
  ko as DROPDOWN_MAX_HEIGHT,
  jf as DatePicker,
  Pf as DialogProvider,
  sa as DropdownItem,
  wr as DropdownMenu,
  la as DropdownSubmenu,
  ci as DropdownThemeContext,
  Kd as FONTS,
  Jf as FloatingChrome,
  _f as FloatingToggle,
  Yd as FontMenu,
  oh as FormatToolbar,
  ze as IS_COARSE,
  Pl as IS_TOUCH_CAPABLE,
  If as ItemManagerDropdown,
  Ff as LongPressMenuProvider,
  ri as MORPH_EASE,
  Gt as MORPH_MS,
  ii as MORPH_OPACITY_MS,
  _n as MenuHighlightContext,
  Oo as MenuSearchContext,
  ca as Modal,
  Of as ModalFooter,
  Kn as ModalFooterButton,
  ah as MorphActionField,
  ef as MorphSearchField,
  Io as NO_SELECTION_IDS,
  sh as NumberInput,
  Ll as PopoutWindowContext,
  ih as RICH_TEXT_STATE_IDLE,
  qf as RadioList,
  Jd as RichTextEditor,
  Xd as SCRUB_PX_PER_STEP,
  ch as SearchMenu,
  Qf as SectionHeader,
  Xf as Seg,
  lr as SelectionCheck,
  Ro as SelectionContext,
  Ao as SelectionFooter,
  th as StructureControls,
  di as SubmenuContext,
  Rf as TAB_PILL,
  Ra as TB_BTN,
  Vn as TB_BTN_ICON,
  Ia as TB_DANGER,
  _o as TB_DIVIDER,
  Aa as TB_INPUT,
  Gf as TB_NUM,
  $a as TB_PICKER,
  Kf as TB_ROW_LABEL,
  za as TB_SEG,
  Vf as TB_TOGGLE,
  Uf as TB_TOGGLE_OFF,
  Yf as TB_TOGGLE_ON,
  ta as TabFace,
  Ef as ThemeProvider,
  Mf as ThemeScope,
  Pd as Token,
  Ld as TokenChipView,
  Yn as ToolButton,
  sn as Tooltip,
  oi as ZOOM_FROM,
  rf as buildSearchMenuRows,
  Jl as buttonCloudOf,
  Ci as clampNumber,
  _l as cloneOverlayClose,
  O as coarsePx,
  Ul as countHidden,
  rh as escapeHtml,
  go as getCoarseScale,
  br as getDropdownClasses,
  Cf as getHardwareKeyboard,
  Nf as getLastPointerType,
  Ai as groupSelectionState,
  Jr as inputCls,
  xa as isInteractiveElement,
  jr as isTouchLike,
  nf as matchSearchItem,
  To as menuAttributesOf,
  Wl as menuThemeOf,
  vo as nearestOverlayOrigin,
  Xs as normalizeSpaces,
  Tt as orderByCatalogue,
  Rr as overlayMorphEnabled,
  tf as parseSearchTags,
  Hl as playOverlayClose,
  Fl as playOverlayOpen,
  so as preprocessTokenHtml,
  pn as revealRowInScroller,
  qn as sameSelection,
  $d as sanitizeRichText,
  Qd as scrubbedValue,
  el as searchMenuContent,
  ql as segModeOf,
  kf as setCoarseScale,
  Ii as setSelected,
  Gd as steppedValue,
  nh as stripRichText,
  Dd as stripTokenWrappers,
  Yl as toggleSelected,
  Sf as useCoarse,
  Ce as useCoarseScale,
  Bt as useCoarseSize,
  ni as useCurrentDocument,
  Fn as useCurrentWindow,
  Lf as useDialog,
  So as useDropdownPosition,
  zo as useDropdownTheme,
  Tf as useHardwareKeyboard,
  Fo as useInputSize,
  ui as useItemSize,
  It as useKitTheme,
  Bl as useLastPointerType,
  Bf as useLongPressOptOut,
  fi as useMenuHighlight,
  ia as useMenuSearch,
  xr as useOverlayMorph,
  ti as usePopoutWindow,
  xn as usePortalTarget,
  Eo as useRevealRowOnOpen,
  Mo as useSelection,
  Gl as useSelectionContext,
  Ma as useSlidingPill,
  Hf as useTouchMode
};
