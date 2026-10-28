"use client";
var $w = Object.defineProperty;
var Fw = (t, e, n) => e in t ? $w(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var Qe = (t, e, n) => Fw(t, typeof e != "symbol" ? e + "" : e, n);
import { jsx as A, jsxs as pe, Fragment as Dn } from "react/jsx-runtime";
import * as w from "react";
import Pt, { createContext as ti, useContext as ni, useState as Xe, useEffect as Ye, useRef as G, useCallback as Le, useLayoutEffect as Nn, useMemo as gn, useId as Hw, useImperativeHandle as jy, forwardRef as rp, createElement as ip } from "react";
import * as pn from "@radix-ui/react-dropdown-menu";
import { Minus as Bw, Check as Os, Search as Io, X as eo, Pencil as qw, CopyPlus as Ky, Trash2 as za, RotateCcw as Uy, Plus as ol, ChevronRight as La, ChevronLeft as Ww, ArrowUp as jw, ArrowDown as Kw, ChevronDown as Ai, Underline as Uw, Strikethrough as Gw, RemoveFormatting as Yw, Link as Xw, ChevronUp as Vw, Anchor as Jw, Copy as Zw, ClipboardPaste as Qw, Scissors as ex } from "lucide-react";
import { computePosition as tx, offset as Gy, flip as Yy, shift as Xy, size as nx, useFloating as rx, autoUpdate as ix } from "@floating-ui/react-dom";
import * as ki from "@radix-ui/react-dialog";
import { createPortal as sl } from "react-dom";
import { mergeAttributes as ox, ReactNodeViewRenderer as sx, NodeViewWrapper as ax, useEditor as lx, EditorContent as cx } from "@tiptap/react";
import { PluginKey as Kr, Plugin as hi, Selection as No, TextSelection as Ar, NodeSelection as $o, AllSelection as ux } from "@tiptap/pm/state";
import { DecorationSet as sa, Decoration as dx } from "@tiptap/pm/view";
import fx from "@tiptap/starter-kit";
import hx from "@tiptap/extension-placeholder";
import { TextStyle as px, FontFamily as gx, FontSize as mx } from "@tiptap/extension-text-style";
import yx from "@tiptap/extension-color";
import bx from "@tiptap/extension-link";
import vx from "@tiptap/extension-underline";
import wx from "@tiptap/suggestion";
import { Mention as xx } from "@tiptap/extension-mention";
import { createRoot as kx } from "react-dom/client";
const Sx = ti(null);
function Nf() {
  return ni(Sx);
}
function oo() {
  const t = Nf();
  return t ? t.document.body : null;
}
function zs() {
  const t = Nf();
  return t ? t.document : typeof document < "u" ? document : null;
}
function Ls() {
  return Nf() ?? (typeof window < "u" ? window : null);
}
const $s = typeof window < "u", Pn = $s && window.matchMedia("(pointer: coarse)").matches, Cx = $s && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
let al = 0.5;
const Rs = /* @__PURE__ */ new Set();
function jP(t) {
  al = Math.max(0, Math.min(1, t)), Rs.forEach((e) => e());
}
function Vy() {
  return al;
}
function KP() {
  const [, t] = Xe(0);
  return Ye(() => {
    const e = () => t((n) => n + 1);
    return Rs.add(e), () => {
      Rs.delete(e);
    };
  }, []), Pn && al > 0;
}
function mn() {
  const [, t] = Xe(0);
  return Ye(() => {
    const e = () => t((n) => n + 1);
    return Rs.add(e), () => {
      Rs.delete(e);
    };
  }, []), al;
}
function Me(t, e, n) {
  return Pn ? Math.round(t + (e - t) * n) : t;
}
function _i(t, e) {
  const n = mn();
  return Pn && n > 0 ? {
    padding: `${Me(t.py, e.py, n)}px ${Me(t.px, e.px, n)}px`,
    fontSize: `${Me(t.fs, e.fs, n)}px`
  } : { padding: `${t.py}px ${t.px}px`, fontSize: `${t.fs}px` };
}
function Jy() {
  const t = mn(), e = Pn && t > 0;
  return {
    box: e ? Me(28, 36, t) : 20,
    icon: e ? Me(16, 20, t) : 14
  };
}
function ff(t) {
  return t === "touch" || t === "pen";
}
let Ao = null;
const hf = /* @__PURE__ */ new Set();
$s && window.addEventListener("pointerdown", (t) => {
  Ao = t.pointerType, hf.forEach((e) => e());
}, !0);
function UP() {
  return Ao;
}
function Rx() {
  const [, t] = Xe(0), e = G(Ao);
  return Ye(() => {
    const n = () => {
      e.current !== Ao && (e.current = Ao, t((r) => r + 1));
    };
    return hf.add(n), () => {
      hf.delete(n);
    };
  }, []), Ao;
}
const Zy = ["(any-hover: hover)", "(any-pointer: fine)"];
function Qy() {
  return $s ? Zy.some((t) => window.matchMedia(t).matches) : !1;
}
let $a = Qy();
const pf = /* @__PURE__ */ new Set();
function op(t) {
  $a !== t && ($a = t, pf.forEach((e) => e()));
}
var Wy;
if ($s) {
  const t = () => op(Qy());
  for (const s of Zy) {
    const a = window.matchMedia(s);
    (Wy = a.addEventListener) == null || Wy.call(a, "change", t);
  }
  window.addEventListener("focus", t), document.addEventListener("visibilitychange", t);
  const e = window.setInterval(() => {
    document.visibilityState === "visible" && t();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(e)), window.addEventListener("keydown", (s) => {
    s.isComposing || s.keyCode !== 229 && (s.key === "Enter" || s.key === "Backspace" || s.key === "Process" || s.key === "Unidentified" || op(!0));
  });
  let n = null, r = null;
  const i = "__penClick", o = /* @__PURE__ */ new Set(["color", "file", "date", "datetime-local", "month", "time", "week"]);
  window.addEventListener("pointerdown", (s) => {
    s.pointerType !== "pen" || s.button !== 0 || (n = { x: s.clientX, y: s.clientY });
  }, !0), window.addEventListener("pointerup", (s) => {
    if (s.pointerType !== "pen") return;
    const a = n;
    if (n = null, !a || Math.hypot(s.clientX - a.x, s.clientY - a.y) > 8) return;
    const l = s.target;
    if (!l || !l.isConnected) return;
    if (l instanceof HTMLInputElement && o.has(l.type)) {
      try {
        l.showPicker();
      } catch {
      }
      return;
    }
    const c = new MouseEvent("click", { bubbles: !0, cancelable: !0, view: window });
    c[i] = !0, r = { x: s.clientX, y: s.clientY, time: Date.now() }, l.dispatchEvent(c);
  }, !0), window.addEventListener("click", (s) => {
    s[i] || r && Date.now() - r.time < 1e3 && Math.hypot(s.clientX - r.x, s.clientY - r.y) < 12 && (s.preventDefault(), s.stopPropagation());
  }, !0);
}
function GP() {
  return $a;
}
function YP() {
  const [, t] = Xe(0);
  return Ye(() => {
    const e = () => t((n) => n + 1);
    return pf.add(e), () => {
      pf.delete(e);
    };
  }, []), $a;
}
const Pi = 220, Of = "cubic-bezier(0.32, 0.72, 0, 1)", zf = 170, Lf = 0.94;
function jl(t) {
  return t === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function eb(t, e) {
  const n = e.left + e.width / 2, r = e.top + e.height / 2;
  return {
    x: n < t.left ? 0 : n > t.left + t.width ? 1 : 0.5,
    y: r < t.top ? 0 : r > t.top + t.height ? 1 : 0.5
  };
}
function tb(t, e) {
  const n = (e == null ? void 0 : e()) ?? null;
  if (!n) return { x: 0.5, y: 0.5 };
  const r = t.getBoundingClientRect();
  return eb({ left: r.left, top: r.top, width: r.width, height: r.height }, n);
}
function Tx(t, e, n, r) {
  const i = ++t.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity };
  e.style.transition = "none", e.style.transformOrigin = "50% 50%", e.style.transform = `scale(${Lf})`, e.style.opacity = "0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    t.current === i && requestAnimationFrame(() => {
      if (t.current !== i) return;
      const s = tb(e, n);
      e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transition = `transform ${Pi}ms ${Of}, opacity ${zf}ms ease`, e.style.transform = "none", e.style.opacity = "", window.setTimeout(() => {
        t.current === i && (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, r == null || r());
      }, Pi + 60);
    });
  });
}
function Ex(t, e, n, r) {
  const i = ++t.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity, pointerEvents: e.style.pointerEvents, visibility: e.style.visibility }, s = tb(e, n);
  e.style.transition = `transform ${Pi}ms ${Of}, opacity ${zf}ms ease`, e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transform = `scale(${Lf})`, e.style.opacity = "0", e.style.pointerEvents = "none", window.setTimeout(() => {
    t.current === i && (e.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      t.current !== i || e.isConnected || (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, e.style.pointerEvents = o.pointerEvents, e.style.visibility = o.visibility);
    }));
  }, Pi + 60);
}
function Mx(t, e, n) {
  const r = t.cloneNode(!0), i = t.getBoundingClientRect(), o = i.width > 0 || i.height > 0 ? i : n ?? i;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${o.left}px`, r.style.top = `${o.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const s = (e == null ? void 0 : e()) ?? null, a = s ? eb({ left: o.left, top: o.top, width: o.width, height: o.height }, s) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${a.x * 100}% ${a.y * 100}%`, t.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${Pi}ms ${Of}, opacity ${zf}ms ease`, r.style.transform = `scale(${Lf})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, Pi + 60));
    });
  });
}
function ll(t) {
  const e = G(null), [n, r] = Xe(!1), i = G(null), o = G(0), s = Le((p) => {
    if (t.ref && (t.ref.current = p), p) {
      o.current = 0, e.current = p;
      const m = p.getBoundingClientRect();
      (m.width > 0 || m.height > 0) && (i.current = { left: m.left, top: m.top, width: m.width, height: m.height }), r(!0);
      return;
    }
    const g = e.current, y = ++o.current;
    queueMicrotask(() => {
      y === o.current && e.current === g && (e.current = null, r(!1), !(!g || !t.cloneOnUnmount || !l.current) && g.style.visibility !== "hidden" && jl(f.current) && Mx(g, u.current, i.current));
    });
  }, []), a = Le(() => {
    const p = e.current;
    if (!p || getComputedStyle(p).transform !== "none") return;
    const g = p.getBoundingClientRect();
    (g.width > 0 || g.height > 0) && (i.current = { left: g.left, top: g.top, width: g.width, height: g.height });
  }, []), l = G(t.visible);
  l.current = t.visible;
  const c = G(t.visible), u = G(t.anchor ?? null);
  u.current = t.anchor ?? null;
  const d = G(t.onClosed);
  d.current = t.onClosed;
  const f = G(t.morph !== !1);
  f.current = t.morph !== !1;
  const h = G(0);
  return Nn(() => {
    if (!n || !l.current || !jl(f.current)) return;
    const p = e.current;
    p && Tx(h, p, u.current);
  }, [n, t.visible]), Ye(() => {
    if (!n || !l.current) return;
    let p = 0;
    const g = () => {
      p = 0, a(), p = requestAnimationFrame(g);
    };
    return p = requestAnimationFrame(g), () => {
      p && cancelAnimationFrame(p);
    };
  }, [n, a]), Nn(() => {
    var y;
    const p = c.current;
    if (c.current = t.visible, t.visible || !p) return;
    const g = e.current;
    if (!g || !jl(f.current)) {
      (y = d.current) == null || y.call(d);
      return;
    }
    Ex(h, g, u.current, () => {
      var m;
      return (m = d.current) == null ? void 0 : m.call(d);
    });
  }, [t.visible]), Ye(() => {
    if (!n || !l.current) return;
    const p = (g) => {
      const y = e.current;
      y && y.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", p, { capture: !0 }), () => document.removeEventListener("wheel", p, { capture: !0 });
  }, [n]), Ye(() => {
    if (!n || !l.current) return;
    const p = (g) => {
      const y = e.current;
      y && y.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("touchmove", p, { capture: !0 }), () => document.removeEventListener("touchmove", p, { capture: !0 });
  }, [n]), s;
}
const nb = 384;
function Ix(t) {
  const e = t.visualViewport;
  return e ? { x: e.offsetLeft, y: e.offsetTop, width: e.width, height: e.height } : { x: 0, y: 0, width: t.innerWidth, height: t.innerHeight };
}
function rb({
  anchorRef: t,
  panelRef: e,
  open: n,
  contentRef: r,
  anchorRectRef: i,
  gap: o = 4,
  padding: s = 8,
  maxHeight: a,
  minHeight: l = 32,
  onPosition: c
}) {
  const u = Ls(), d = G(u);
  d.current = u;
  const f = G(c);
  f.current = c, Nn(() => {
    if (!n) return;
    let h = 0, p = !1;
    const g = () => {
      h || (h = requestAnimationFrame(y));
    }, y = () => {
      if (h = 0, p) return;
      const T = d.current, D = t.current, P = e.current;
      if (!T || !D || !P || !P.isConnected) return;
      const S = (r == null ? void 0 : r.current) ?? P, z = Ix(T), k = a ?? nb, x = Math.min(l, k), M = Math.max(0, P.offsetHeight - S.offsetHeight), _ = Math.max(x, Math.ceil(S.scrollHeight + M)), E = Math.min(_, k);
      P.style.maxHeight = `${E}px`;
      let O = E;
      const L = i == null ? void 0 : i.current;
      tx(L ? {
        getBoundingClientRect: () => ({
          left: L.left,
          top: L.top,
          width: L.width,
          height: L.height,
          right: L.left + L.width,
          bottom: L.top + L.height,
          x: L.left,
          y: L.top,
          toJSON: () => {
          }
        })
      } : D, P, {
        strategy: "fixed",
        placement: "bottom-start",
        middleware: [
          Gy(o),
          Yy({ boundary: z, padding: s, fallbackStrategy: "bestFit" }),
          Xy({ boundary: z, padding: s, mainAxis: !1 }),
          nx({
            boundary: z,
            padding: s,
            apply({ availableHeight: re }) {
              O = Math.max(x, Math.floor(Math.min(k, re))), P.style.maxHeight = `${O}px`;
            }
          })
        ]
      }).then(({ x: re, y: F, placement: N }) => {
        p || !Number.isFinite(re) || !Number.isFinite(F) || f.current({
          top: Math.round(F),
          left: Math.round(re),
          maxH: O,
          side: N.startsWith("top") ? "top" : "bottom",
          ready: !0
        });
      });
    };
    y();
    const m = d.current, b = (m == null ? void 0 : m.document) ?? null, C = (m == null ? void 0 : m.visualViewport) ?? null, I = () => g();
    C == null || C.addEventListener("resize", I), C == null || C.addEventListener("scroll", I), m == null || m.addEventListener("resize", I), b == null || b.addEventListener("scroll", I, { capture: !0, passive: !0 });
    let v = null;
    return typeof ResizeObserver < "u" && (v = new ResizeObserver(I), e.current && v.observe(e.current), r != null && r.current && v.observe(r.current)), () => {
      p = !0, h && cancelAnimationFrame(h), C == null || C.removeEventListener("resize", I), C == null || C.removeEventListener("scroll", I), m == null || m.removeEventListener("resize", I), b == null || b.removeEventListener("scroll", I, { capture: !0 }), v == null || v.disconnect();
    };
  }, [n, t, e, r, i, o, s, a, l]);
}
let ko = null;
function ib(t) {
  return ko == null || ko(), ko = t, () => {
    ko === t && (ko = null);
  };
}
const ob = ti(null);
function $f(t, e) {
  const n = t.mode ?? (e == null ? void 0 : e.mode) ?? "dark", r = t.surface ?? (e == null ? void 0 : e.surface) ?? "neutral", i = t.context ?? (e == null ? void 0 : e.context) ?? "surface", o = t.accent ?? (e == null ? void 0 : e.accent) ?? "zinc", s = t.accent !== void 0 && t.surface === void 0 && t.context === void 0;
  return { mode: n, accent: i === "chrome" || r === "accent" || s ? o : "zinc", surface: r, context: i };
}
function Ff({ theme: t, children: e }) {
  return /* @__PURE__ */ A(ob.Provider, { value: t, children: e });
}
function XP({ mode: t, accent: e, surface: n, context: r, children: i }) {
  const o = vr();
  return /* @__PURE__ */ A(Ff, { theme: $f({ mode: t, accent: e, surface: n, context: r }, o), children: i });
}
function VP({ mode: t, accent: e, surface: n, context: r, children: i, className: o, style: s }) {
  const a = vr(), l = $f({ mode: t, accent: e, surface: n, context: r }, a);
  return /* @__PURE__ */ A(Ff, { theme: l, children: /* @__PURE__ */ A(
    "div",
    {
      "data-mode": l.mode,
      "data-accent": l.accent,
      "data-surface": l.surface,
      "data-context": l.context,
      className: o,
      style: s,
      children: i
    }
  ) });
}
function vr() {
  return ni(ob);
}
function Ax(t, e = "dark") {
  return t ? t.context === "surface" ? t.mode : t.mode === "light" ? "light" : t.accent === "emerald" ? "emerald" : t.accent === "blue" ? "blue" : "dark" : e;
}
function sb(t, e) {
  if (t)
    return (t === "light" || t === "dark") && e ? {
      theme: t,
      attrs: { "data-theme": t, "data-mode": t, "data-accent": e.accent }
    } : { theme: t, attrs: { "data-theme": t } };
  if (!e) return { theme: "dark", attrs: { "data-theme": "dark" } };
  if (e.context === "chrome") {
    const n = Ax(e);
    return { theme: n, attrs: { "data-theme": n } };
  }
  return { theme: e.mode, attrs: { "data-mode": e.mode, "data-accent": e.accent } };
}
function _x(t, e = "light") {
  return (t == null ? void 0 : t.mode) ?? e;
}
function Px(t) {
  return !t || t.context !== "chrome" && t.surface !== "accent" ? !1 : t.accent === "emerald" ? "emerald" : t.accent === "blue";
}
function Dx(t) {
  let e = t.parentElement;
  for (; e; ) {
    if (e.scrollHeight > e.clientHeight) {
      const n = getComputedStyle(e).overflowY;
      if (n === "auto" || n === "scroll" || n === "overlay") return e;
    }
    e = e.parentElement;
  }
  return null;
}
function fi(t, e = "nearest", n) {
  if (!t) return;
  const r = n ?? Dx(t);
  if (!r || !r.contains(t)) return;
  const i = t.getBoundingClientRect(), o = r.getBoundingClientRect();
  if (e === "center") {
    r.scrollTop += i.top + i.height / 2 - (o.top + o.height / 2);
    return;
  }
  const s = getComputedStyle(t), a = parseFloat(s.scrollMarginBlockStart || s.scrollMarginTop || "0") || 0, l = parseFloat(s.scrollMarginBlockEnd || s.scrollMarginBottom || "0") || 0;
  i.top - a < o.top ? r.scrollTop -= o.top - (i.top - a) : i.bottom + l > o.bottom && (r.scrollTop += i.bottom + l - o.bottom);
}
function ab({
  open: t,
  row: e,
  block: n = "nearest",
  scroller: r,
  ready: i
}) {
  const o = G(!1), s = G(!1), a = G(!1), l = G({ row: e, scroller: r, block: n });
  l.current = { row: e, scroller: r, block: n };
  const c = Le(() => {
    o.current = !0;
  }, []);
  return Nn(() => {
    if (!t) {
      s.current = !1, a.current = !1, o.current = !1;
      return;
    }
    if (s.current) return;
    s.current = !0;
    const { row: u, scroller: d, block: f } = l.current, h = u();
    h && (fi(h, f, (d == null ? void 0 : d()) ?? null), a.current = !0);
  }, [t]), Ye(() => {
    if (!t || i !== !0 || !a.current) return;
    const u = requestAnimationFrame(() => {
      if (!a.current || (a.current = !1, o.current)) return;
      const { row: d, scroller: f } = l.current;
      fi(d(), "nearest", (f == null ? void 0 : f()) ?? null);
    });
    return () => cancelAnimationFrame(u);
  }, [t, i]), { engagedRef: o, engage: c };
}
const Nx = [];
function Mr(t, e) {
  const n = /* @__PURE__ */ new Map();
  e.forEach((s, a) => n.set(s, a));
  const r = [], i = [], o = /* @__PURE__ */ new Set();
  for (const s of t)
    o.has(s) || (o.add(s), n.has(s) ? r.push(s) : i.push(s));
  return r.sort((s, a) => n.get(s) - n.get(a)), [...r, ...i];
}
function Gi(t, e) {
  if (t.length !== e.length) return !1;
  const n = new Set(t);
  return e.every((r) => n.has(r));
}
function Ox(t, e, n, r = {}) {
  var o;
  const i = Mr(t, n);
  return (o = r.disabledIds) != null && o.includes(e) ? i : i.includes(e) ? i.filter((s) => s !== e) : r.max !== void 0 && i.length >= r.max ? i : Mr([...i, e], n);
}
function sp(t, e, n, r, i = {}) {
  const o = Mr(t, r), s = new Set(e);
  if (!n) return o.filter((d) => !s.has(d));
  const a = new Set(r), l = new Set(i.disabledIds ?? []), c = i.max === void 0 ? 1 / 0 : Math.max(0, i.max - o.length), u = Mr([...s], r).filter((d) => a.has(d) && !o.includes(d) && !l.has(d)).slice(0, c);
  return u.length === 0 ? o : Mr([...o, ...u], r);
}
function ap(t, e) {
  if (e.length === 0) return "none";
  const n = new Set(t), r = e.reduce((i, o) => i + (n.has(o) ? 1 : 0), 0);
  return r === 0 ? "none" : r === e.length ? "all" : "some";
}
function zx(t, e, n) {
  if (!n) return 0;
  const r = new Set(e), i = new Set(n);
  return t.reduce((o, s) => o + (r.has(s) && !i.has(s) ? 1 : 0), 0);
}
function lb(t) {
  const {
    mode: e = "draft",
    selectedIds: n,
    itemIds: r,
    visibleIds: i,
    max: o,
    disabledIds: s,
    indicator: a = "box",
    onChange: l,
    onCommit: c,
    onToggle: u,
    onDraftChange: d
  } = t, [f, h] = Xe(() => Mr(n, r)), p = gn(() => new Set(s ?? []), [s]), g = gn(() => new Set(f), [f]), y = o !== void 0 && f.length >= o, m = !Gi(f, n), b = Le((z) => {
    if (p.has(z)) return;
    const k = g.has(z), x = Ox(f, z, r, { max: o, disabledIds: s });
    Gi(x, f) || (h(x), d == null || d(x), u == null || u(z, !k));
  }, [f, g, p, r, o, s, u, d]), C = Le((z) => {
    const k = z.filter((_) => !p.has(_)), x = ap(f, k), M = sp(f, k, x !== "all", r, { max: o, disabledIds: s });
    Gi(M, f) || (h(M), d == null || d(M));
  }, [f, p, r, o, s, d]), I = Le((z, k = i ?? r) => {
    const x = sp(f, k, z, r, { max: o, disabledIds: s });
    Gi(x, f) || (h(x), d == null || d(x));
  }, [f, i, r, o, s, d]), v = Le(() => {
    f.length !== 0 && (h([]), d == null || d([]));
  }, [f, d]), T = Le((z) => {
    h(Mr(z ?? n, r));
  }, [n, r]), D = Le(() => !c || Gi(f, n) ? !1 : (c(Mr(f, r)), !0), [c, f, n, r]), P = Le(() => !l || Gi(f, n) ? !1 : (l(Mr(f, r)), !0), [l, f, n, r]), S = Le((z) => ap(f, z), [f]);
  return {
    mode: e,
    indicator: a,
    draft: f,
    count: f.length,
    max: o,
    atMax: y,
    dirty: m,
    hiddenCount: zx(f, r, i),
    isSelected: (z) => g.has(z),
    isDisabled: (z) => p.has(z),
    canToggle: (z) => !p.has(z) && (g.has(z) || !y),
    toggle: b,
    toggleGroup: C,
    setAll: I,
    clear: v,
    reset: T,
    commit: D,
    flush: P,
    cancel: T,
    groupState: S
  };
}
const cb = ti(null), Lx = () => ni(cb), ub = Nx;
function Hf({ checked: t, size: e, tone: n = "accent", indeterminate: r = !1 }) {
  return /* @__PURE__ */ A(
    "span",
    {
      className: `ui-check-indicator ${t || r ? "ui-check-indicator-checked" : ""} ${n === "danger" ? "ui-check-tone-danger" : ""}`,
      "aria-hidden": !0,
      children: r ? /* @__PURE__ */ pe("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: [
        /* @__PURE__ */ A("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor", stroke: "var(--ui-check-ring)", strokeWidth: 1 }),
        /* @__PURE__ */ A("path", { d: "M4.5 8 H11.5", stroke: "var(--ui-check-check)", strokeWidth: 2, strokeLinecap: "round", fill: "none" })
      ] }) : t ? /* @__PURE__ */ pe("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: [
        /* @__PURE__ */ A("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor", stroke: "var(--ui-check-ring)", strokeWidth: 1 }),
        /* @__PURE__ */ A("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "var(--ui-check-check)", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" })
      ] }) : /* @__PURE__ */ A("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: /* @__PURE__ */ A("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) })
    }
  );
}
function $x({ checked: t, onChange: e, disabled: n = !1, label: r, id: i, className: o = "", labelClassName: s = "", theme: a, variant: l = "pill", tone: c = "accent", block: u = !1 }) {
  const d = l !== "plain", f = mn(), h = Me(16, 20, f), p = Me(12, 14, f), g = Me(12, 14, f), y = Me(12, 16, f), m = Me(10, 12, f), b = Me(8, 10, f);
  return /* @__PURE__ */ pe(
    "label",
    {
      className: `ui-press ui-checkbox ${d ? "ui-checkbox-pill rounded-lg" : ""} ${c === "danger" ? "ui-checkbox-tone-danger" : ""} ${n ? "ui-disabled" : ""} ${o}`,
      style: { display: u ? "flex" : "inline-flex", alignItems: "center", gap: b, padding: d ? `${m}px ${y}px` : void 0 },
      onClick: (I) => I.stopPropagation(),
      ...a ? { "data-theme": a } : {},
      children: [
        /* @__PURE__ */ A(
          "input",
          {
            type: "checkbox",
            id: i,
            checked: t,
            disabled: n,
            onChange: (I) => e(I.target.checked),
            className: "sr-only"
          }
        ),
        d ? /* @__PURE__ */ A(Hf, { checked: t, size: h, tone: c }) : /* @__PURE__ */ A("span", { className: "ui-checkbox-box", style: { width: h, height: h }, "aria-hidden": !0, children: t && /* @__PURE__ */ A("svg", { viewBox: "0 0 12 12", fill: "none", style: { width: p, height: p }, "aria-hidden": !0, children: /* @__PURE__ */ A("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ A("span", { className: `ui-checkbox-label ${s}`, style: { fontSize: g }, children: r })
      ]
    }
  );
}
const lp = "transition-[grid-template-columns] ease-out duration-150 group-hover:duration-200 motion-reduce:transition-none", Fx = "group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] group-data-[state=open]:grid-cols-[1fr]", Hx = "group-hover:grid-cols-[0fr] group-focus-visible:grid-cols-[0fr] group-data-[state=open]:grid-cols-[0fr]", Bx = "group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[state=open]:opacity-100";
function qx(t) {
  if (!Pt.isValidElement(t)) return String(t ?? "");
  const e = t.type, n = typeof e == "string" ? e : e.displayName || e.name || "icon", r = t.props;
  return `${n}|${r.className ?? ""}|${r.size ?? ""}`;
}
function db({ icon: t, collapse: e = !1, iconWithLabel: n = !0, active: r = !1, gap: i = 6, reserve: o, roll: s = "up", children: a }) {
  const l = !!e && !!t, c = l && !n, u = !!t && (n || l), d = qx(t), [f, h] = Xe({ sig: d, node: t }), [p, g] = Xe(null);
  d !== f.sig && (h({ sig: d, node: t }), g(f.node)), Ye(() => {
    if (p == null) return;
    const m = window.setTimeout(() => g(null), 200);
    return () => window.clearTimeout(m);
  }, [p]);
  const y = p == null ? t : /* @__PURE__ */ pe("span", { className: "relative inline-flex items-center justify-center overflow-hidden", children: [
    /* @__PURE__ */ A("span", { "aria-hidden": !0, className: `ui-icon-roll-out${s === "down" ? "-down" : ""} absolute inset-0 inline-flex items-center justify-center`, children: p }, `out:${f.sig}`),
    /* @__PURE__ */ A("span", { className: `ui-icon-roll-in${s === "down" ? "-down" : ""} inline-flex items-center justify-center`, children: t }, `in:${d}`)
  ] });
  return l ? /* @__PURE__ */ pe(Dn, { children: [
    u && (c ? /* @__PURE__ */ A("span", { "data-kit-icon": !0, className: `grid min-w-0 ${lp} ${r ? "grid-cols-[0fr]" : `grid-cols-[1fr] ${Hx}`}`, children: /* @__PURE__ */ A("span", { className: "inline-flex min-w-0 items-center overflow-hidden", children: y }) }) : /* @__PURE__ */ A("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: y })),
    /* @__PURE__ */ A("span", { "data-kit-label": !0, className: `grid min-w-0 ${lp} ${r ? "grid-cols-[1fr]" : `grid-cols-[0fr] ${Fx}`}`, children: /* @__PURE__ */ A("span", { className: "min-w-0 overflow-hidden", children: /* @__PURE__ */ A(
      "span",
      {
        className: `flex min-w-0 items-center whitespace-nowrap transition-[opacity,padding-left] duration-100 group-hover:duration-150 motion-reduce:transition-none ${r ? "opacity-100" : `opacity-0 ${Bx}`} ${c ? `pl-[var(--kit-collapse-gap)] group-hover:pl-0! group-focus-visible:pl-0! group-data-[state=open]:pl-0! ${r ? "pl-0!" : ""}` : ""}`,
        style: c ? { "--kit-collapse-gap": `${i}px` } : { paddingLeft: i },
        children: o ? /* @__PURE__ */ pe("span", { className: "inline-grid min-w-0", children: [
          /* @__PURE__ */ A("span", { "aria-hidden": !0, className: "invisible col-start-1 row-start-1 whitespace-nowrap", children: o }),
          /* @__PURE__ */ A("span", { className: "col-start-1 row-start-1", children: a })
        ] }) : a
      }
    ) }) })
  ] }) : /* @__PURE__ */ pe(Dn, { children: [
    u && /* @__PURE__ */ A("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: t }),
    a
  ] });
}
const JP = {
  light: { plain: "bg-zinc-950", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" },
  dark: { plain: "bg-white", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" }
};
function lr({
  variant: t = "subtle",
  theme: e,
  cloud: n,
  active: r = !1,
  activeTone: i = "neutral",
  iconOnly: o = !1,
  size: s = "default",
  revealOnHover: a = !1,
  keepLabelOnActive: l = !1,
  reserveLabel: c,
  iconRoll: u = "up",
  icon: d,
  collapse: f = !1,
  iconWithLabel: h = !0,
  className: p = "",
  type: g = "button",
  children: y,
  ...m
}) {
  const b = vr(), C = e ?? (b == null ? void 0 : b.mode) ?? "light", I = n ?? Px(b), v = _i({ px: 10, py: 6, fs: 12 }, { px: 14, py: 9, fs: 14 }), T = _i({ px: 12, py: 6, fs: 12 }, { px: 16, py: 9, fs: 14 }), D = _i({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), P = "", S = "", z = `${a ? "ui-reveal " : ""}ui-press inline-flex items-center font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed`, k = "rounded", x = "rounded-[var(--ui-radius-btn)]", M = {
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
  }, E = {
    active: "text-zinc-900",
    inactive: "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800",
    open: "bg-zinc-800! text-white"
  }, O = {
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
  }, L = {
    light: {
      subtle: { base: `${P} text-zinc-600 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-900" },
      primary: { base: `${S} bg-zinc-900 hover:bg-zinc-800 text-white`, open: "bg-zinc-800!" },
      /* The outline is painted as an INSET SHADOW, not a border: the button
         keeps `subtle`'s exact box (same padding + height), so the two can sit
         side by side in a toolbar without a 2px step. */
      outline: {
        base: `${P} text-zinc-700 shadow-[inset_0_0_0_1px_var(--ui-border-strong)] hover:bg-[var(--ui-btn-hover-bg)] hover:text-zinc-900`,
        open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-900"
      },
      "danger-ghost": { base: `${P} text-rose-600 hover:bg-rose-50`, open: "bg-rose-50!" }
    },
    dark: {
      subtle: { base: `${P} text-zinc-400 hover:text-zinc-200 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-200" },
      primary: { base: `${S} bg-zinc-800 hover:bg-zinc-700 text-white`, open: "bg-zinc-700!" },
      outline: {
        base: `${P} text-zinc-300 shadow-[inset_0_0_0_1px_var(--ui-border-strong)] hover:bg-[var(--ui-btn-hover-bg)] hover:text-zinc-100`,
        open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-100"
      },
      "danger-ghost": { base: `${P} text-red-400 hover:bg-rose-950/40`, open: "bg-rose-950/40!" }
    }
  }, W = {
    blue: { base: `${S} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" },
    emerald: { base: `${S} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" }
  }, re = m["data-state"] === "open", F = L[C][t], N = t === "primary" ? T : t.startsWith("tab") ? D : v, te = Pn ? { padding: "8px 12px", fontSize: "14px", lineHeight: "20px", border: "1px solid transparent" } : { padding: "6px 8px", fontSize: "12px", lineHeight: "16px", border: "1px solid transparent" }, Y = Me(6, 8, mn()), j = Me(28, 40, mn()), ee = I === "emerald" ? "emerald" : I ? "blue" : null, H = "bg-[var(--ui-btn-active-bg)]! text-[color:var(--ui-btn-active-text)]!", Z = {
    info: "bg-blue-600! hover:bg-blue-500! text-white!",
    success: "bg-emerald-600! hover:bg-emerald-500! text-white!",
    warning: "bg-amber-500! hover:bg-amber-400! text-zinc-950!",
    danger: "bg-rose-600! hover:bg-rose-500! text-white!"
  };
  let J;
  if (t === "tab") {
    const le = M[C];
    J = `${k} ${r ? ee ? _[ee].active : le.active : ee ? _[ee][C === "light" ? "inactiveLight" : "inactiveDark"] : le.inactive}`;
  } else if (t === "tab-header") {
    const le = ee ? r ? O[ee].active : O[ee].inactive : r ? E.active : E.inactive;
    J = `${k} ${le} ${re ? ee ? O[ee].open : E.open : ""}`;
  } else {
    if (J = `${x} ${F.base} ${re ? F.open : ""}`, t === "primary" && ee) {
      const le = W[ee];
      J = `${x} ${re ? `${le.base} ${le.open}` : le.base}`;
    }
    r && (J = `${J} ${i === "neutral" ? H : Z[i]}`);
  }
  const V = !!f && !!d && !o, K = o ? { width: j, height: j, padding: 0, gap: 0 } : s === "minimal" ? { ...te, gap: V ? 0 : Y } : { ...N, gap: V ? 0 : Y };
  return /* @__PURE__ */ A(
    "button",
    {
      type: g,
      "data-mode": C,
      "data-accent": b == null ? void 0 : b.accent,
      className: `${z} ${o ? "justify-center" : ""} ${V ? "group" : ""} ${J} ${p}`,
      "aria-pressed": r && !t.startsWith("tab") ? !0 : void 0,
      "data-active": r || void 0,
      style: K,
      ...m,
      children: o ? y : /* @__PURE__ */ A(
        db,
        {
          icon: d,
          collapse: f,
          iconWithLabel: h,
          active: r && (t.startsWith("tab") || l),
          gap: Y,
          reserve: c,
          roll: u,
          children: y
        }
      )
    }
  );
}
function Fa({
  checked: t,
  indeterminate: e = !1,
  disabled: n = !1,
  indicator: r = "box",
  size: i,
  className: o = ""
}) {
  const s = mn(), a = i ?? Me(14, 18, s);
  return r === "check" ? /* @__PURE__ */ A(
    "span",
    {
      "data-selection-check": "check",
      className: `inline-flex shrink-0 items-center justify-center ${n ? "opacity-40" : ""} ${o}`,
      style: { width: a, height: a },
      "aria-hidden": !0,
      children: e ? /* @__PURE__ */ A(Bw, { size: a, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : t ? /* @__PURE__ */ A(Os, { size: a, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : null
    }
  ) : /* @__PURE__ */ A(
    "span",
    {
      "data-selection-check": "box",
      className: `inline-flex shrink-0 items-center justify-center ${n ? "opacity-40" : ""} ${o}`,
      "aria-hidden": !0,
      children: /* @__PURE__ */ A(Hf, { checked: t, indeterminate: e, size: a })
    }
  );
}
function fb({
  count: t,
  max: e,
  hiddenCount: n = 0,
  onClear: r,
  hero: i,
  clear: o = !0,
  theme: s,
  className: a = ""
}) {
  const l = mn(), c = Me(10, 14, l), u = Me(6, 9, l), d = Me(11, 13, l), f = s === "light" ? "light" : "dark", h = s === "emerald" ? "emerald" : s === "blue" ? !0 : void 0, p = e !== void 0 ? `${t} of ${e} selected` : `${t} selected`;
  return /* @__PURE__ */ pe(
    "div",
    {
      "data-selection-footer": !0,
      className: `shrink-0 flex items-center gap-2 border-t border-[color:var(--ui-menu-border)] ${a}`,
      style: {
        padding: `${u}px ${c}px`,
        background: "var(--ui-menu-bg)",
        backdropFilter: "blur(8px)"
      },
      children: [
        /* @__PURE__ */ pe(
          "span",
          {
            "data-selection-count": !0,
            className: "min-w-0 flex-1 truncate tabular-nums text-[color:var(--ui-text-muted)]",
            style: { fontSize: d },
            children: [
              p,
              n > 0 && /* @__PURE__ */ pe("span", { className: "text-[color:var(--ui-text-faint)]", children: [
                " · ",
                n,
                " hidden by filter"
              ] })
            ]
          }
        ),
        o && /* @__PURE__ */ A(
          lr,
          {
            variant: "subtle",
            size: "minimal",
            theme: f,
            cloud: h,
            onMouseDown: (g) => g.preventDefault(),
            onClick: r,
            disabled: t === 0,
            "data-selection-clear": !0,
            children: "Clear"
          }
        ),
        i && /* @__PURE__ */ A(
          lr,
          {
            variant: "primary",
            size: "minimal",
            theme: f,
            cloud: h,
            onMouseDown: (g) => g.preventDefault(),
            onClick: i.onClick,
            disabled: i.disabled ?? t === 0,
            "data-selection-hero": !0,
            children: i.label
          }
        )
      ]
    }
  );
}
const Bf = ti("dark"), hb = () => ni(Bf), qf = ti({ "data-theme": "dark" }), Wx = () => ni(qf);
function Wf() {
  const t = mn();
  return {
    padding: `${Me(8, 12, t)}px ${Me(12, 16, t)}px`,
    fontSize: `${Me(12, 14, t)}px`,
    lineHeight: `${Me(18, 22, t)}px`
  };
}
function pb() {
  const t = mn();
  return {
    padding: `${Me(6, 9, t)}px ${Me(12, 16, t)}px ${Me(2, 3, t)}px`,
    fontSize: `${Me(10, 11, t)}px`,
    lineHeight: `${Me(14, 16, t)}px`
  };
}
const jx = (t) => t ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", cp = (t) => t ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", Kx = (t) => t ? "text-xs" : "text-[10px]";
function cl(t) {
  const e = Pn && Vy() > 0;
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
    headerPad: cp(e),
    headerText: `${cp(e)} font-semibold uppercase tracking-wider ${Kx(e)} ui-label`,
    // Item padding
    itemPad: jx(e),
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
function gb(t) {
  const e = [];
  return Pt.Children.forEach(t, (n) => {
    if (typeof n == "string" || typeof n == "number")
      e.push(String(n));
    else if (Pt.isValidElement(n)) {
      const r = n.props.children;
      (typeof r == "string" || typeof r == "number") && e.push(String(r));
    }
  }), e.join(" ").trim();
}
const jf = ti({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), Fs = ti(null), Kf = () => ni(Fs), mb = ti({ query: "", setQuery: () => {
} }), Ux = () => ni(mb), yb = ti(null), Gx = () => ni(yb), Yx = () => !0;
function ul(t) {
  const e = G([]), [n, r] = Xe(-1), [i, o] = Xe(!1), [s, a] = Xe(0), l = Le((f) => (e.current = [...e.current, f], a((h) => h + 1), () => {
    e.current = e.current.filter((h) => h !== f), a((h) => h + 1);
  }), []), c = Le((f, h) => {
    r(f), o(h === "pointer");
  }, []), u = Le(() => {
    o((f) => f && (r(-1), !1));
  }, []);
  return gn(() => ({
    /* A `filter` (the searchable query) narrows the exposed items — hidden
       rows drop out of indexing entirely, so the single highlight, the
       arrows and the typeahead all operate on the VISIBLE set only. */
    items: t ? e.current.filter(t) : e.current,
    /* The unfiltered registration order — multi-select commits in catalogue
       order even when the query hides some selected rows. */
    allItems: e.current,
    highlightedIndex: n,
    pointerDriven: i,
    register: l,
    setHighlighted: c,
    pointerLeave: u
  }), [n, i, s, l, c, u, t]);
}
function bb(t) {
  const e = Kf(), n = G(e);
  n.current = e;
  const r = G(null);
  Ye(() => {
    var l, c;
    const a = { label: t.label(), activate: t.activate, group: ((l = t.group) == null ? void 0 : l.trim()) || void 0, itemId: t.itemId };
    return r.current = a, (c = n.current) == null ? void 0 : c.register(a);
  }, []);
  const i = e && r.current ? e.items.indexOf(r.current) : -1, o = !!e && !t.disabled && i >= 0 && i === e.highlightedIndex;
  return { api: e, myIndex: i, highlighted: o, setPointer: (a) => {
    !t.disabled && e && a >= 0 && e.setHighlighted(a, "pointer");
  } };
}
function Uf(t, e, n, r) {
  const i = G(-1);
  i.current = e.highlightedIndex;
  const o = G(e);
  o.current = e;
  const s = G(t);
  s.current = t;
  const a = G(r);
  a.current = r;
  const l = G({ text: "", time: 0 }), c = G(!1);
  c.current || (c.current = !0, n.current = (u) => {
    var g, y, m, b, C, I;
    if (!s.current) return;
    const d = (g = a.current) == null ? void 0 : g.onSelectAll;
    if (d && (u.metaKey || u.ctrlKey) && u.key.toLowerCase() === "a") {
      u.preventDefault(), u.stopImmediatePropagation(), d();
      return;
    }
    const f = u.target;
    if (!!f && !!f.closest("input, textarea, [contenteditable]") && (u.key.length === 1 || u.key === "Enter" || u.key === "Escape")) {
      const v = (m = (y = a.current) == null ? void 0 : y.onFieldKey) == null ? void 0 : m.call(y, u);
      (!!((b = a.current) != null && b.onFieldKey) || o.current.items.length > 0) && (u.stopImmediatePropagation(), v && u.preventDefault());
      return;
    }
    const p = o.current.items;
    if (p.length !== 0) {
      if (u.key === "ArrowDown" || u.key === "ArrowUp") {
        u.preventDefault(), u.stopImmediatePropagation();
        const v = u.key === "ArrowDown" ? 1 : -1, T = (i.current + v + p.length) % p.length;
        o.current.setHighlighted(T, "keyboard");
      } else if (u.key === "ArrowRight") {
        u.preventDefault(), u.stopImmediatePropagation();
        const v = i.current;
        v >= 0 && v < p.length && p[v].submenu && p[v].activate();
      } else if (u.key === "ArrowLeft")
        u.preventDefault(), u.stopImmediatePropagation(), (I = (C = a.current) == null ? void 0 : C.onCloseSub) == null || I.call(C);
      else if (u.key === "Enter" || u.key === " ") {
        u.preventDefault(), u.stopImmediatePropagation();
        const v = i.current;
        v >= 0 && v < p.length && p[v].activate();
      } else if (u.key.length === 1 && !u.ctrlKey && !u.metaKey && !u.altKey) {
        u.preventDefault(), u.stopImmediatePropagation();
        const v = Date.now(), T = (v - l.current.time > 500 ? "" : l.current.text) + u.key.toLowerCase();
        if (l.current = { text: T, time: v }, !T) return;
        const D = i.current + 1;
        for (let P = 0; P < p.length; P++) {
          const S = (D + P) % p.length;
          if (p[S].label.toLowerCase().startsWith(T)) {
            o.current.setHighlighted(S, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function Gf(t, e, n, r, i, o, s) {
  const a = G(e);
  a.current = e;
  const l = G(t);
  l.current = t;
  const c = G(i);
  c.current = i;
  const u = G(s == null ? void 0 : s.ignoreFields);
  u.current = s == null ? void 0 : s.ignoreFields;
  const d = G(s == null ? void 0 : s.selectAll);
  d.current = s == null ? void 0 : s.selectAll;
  const f = G(!1);
  f.current || (f.current = !0, o.current = (h) => {
    if (!l.current || c.current) return;
    const p = r.current;
    if (p && p.contains(h.target)) return;
    if (d.current && (h.metaKey || h.ctrlKey) && h.key.toLowerCase() === "a") {
      h.preventDefault(), h.stopImmediatePropagation(), n.current(h);
      return;
    }
    if (u.current) {
      const y = h.target;
      if (y && y.closest("input, textarea, [contenteditable]")) return;
    }
    a.current.items.length === 0 || !(h.key === "ArrowDown" || h.key === "ArrowUp" || h.key === "ArrowLeft" || h.key === "ArrowRight" || h.key === "Enter" || h.key === " " || h.key.length === 1 && !h.ctrlKey && !h.metaKey && !h.altKey) || (h.preventDefault(), h.stopImmediatePropagation(), n.current(h));
  });
}
function Yf(t, e) {
  const n = G(t);
  n.current = t;
  const r = G(!1);
  r.current || (r.current = !0, e.current = (i) => {
    if (!n.current) return;
    const o = i.currentTarget, s = o.querySelector("[data-menu-items]") ?? o;
    s.scrollHeight > s.clientHeight && (i.preventDefault(), s.scrollTop += i.deltaY);
  });
}
function dl({
  open: t,
  onClose: e,
  onOpenChange: n,
  trigger: r,
  align: i = "left",
  width: o,
  theme: s,
  children: a,
  morph: l = !0,
  contentClassName: c,
  maxMenuHeight: u,
  initialHighlightIndex: d,
  searchable: f = !1,
  searchPlaceholder: h,
  searchFilter: p,
  searchValue: g,
  onSearchValueChange: y,
  multiple: m
}) {
  const b = vr(), C = sb(s, b), I = C.theme, [v, T] = Xe([]), [D, P] = Xe(null), S = oo(), z = zs(), k = G(null), x = G(null), M = G(t);
  M.current = t;
  const [_, E] = Xe(t), [O, L] = Xe(""), W = f && g !== void 0, re = W ? g : O, F = W ? y ?? (() => {
  }) : L, N = G(g ?? "");
  Ye(() => {
    t || (N.current = g ?? "");
  }, [t, g]);
  const te = W && re === N.current ? "" : re, Y = Hw(), j = G(null), ee = mn(), H = {
    padding: `${Me(8, 12, ee)}px ${Me(12, 16, ee)}px`,
    fontSize: `${Me(12, 14, ee)}px`
  }, [Z, J] = Xe(0), V = f && !W;
  Ye(() => {
    var Ue;
    if (!V || !t) return;
    const ie = (Ue = x.current) == null ? void 0 : Ue.querySelector("[data-menu-items]");
    if (!ie) return;
    const de = () => J(ie.offsetWidth - ie.clientWidth);
    de();
    const _e = new ResizeObserver(de);
    return _e.observe(ie), () => _e.disconnect();
  }, [t, V, re]);
  const K = gn(() => {
    if (!f) return;
    const ie = te.trim().toLowerCase();
    return ie ? (de) => {
      var _e;
      return p ? p(ie, de.label, de.group) : de.label.toLowerCase().includes(ie) || (((_e = de.group) == null ? void 0 : _e.toLowerCase().includes(ie)) ?? !1);
    } : Yx;
  }, [te, f, p]), le = ul(K), ue = f && te.trim() !== "" && le.items.length === 0, ke = !!m, we = le.allItems.map((ie) => ie.itemId).filter((ie) => !!ie), He = le.items.map((ie) => ie.itemId).filter((ie) => !!ie), nt = lb({
    mode: "draft",
    selectedIds: (m == null ? void 0 : m.selectedIds) ?? ub,
    itemIds: we,
    visibleIds: He,
    max: m == null ? void 0 : m.max,
    disabledIds: m == null ? void 0 : m.disabledIds,
    indicator: m == null ? void 0 : m.indicator,
    onCommit: m == null ? void 0 : m.onCommit
  }), bt = G(nt.reset);
  bt.current = nt.reset;
  const gt = typeof (m == null ? void 0 : m.commitLabel) == "function" ? m.commitLabel(nt.count) : (m == null ? void 0 : m.commitLabel) ?? `Select ${nt.count}`;
  Ye(() => {
    if (t)
      return E(!0), W || L(""), le.setHighlighted(d ?? -1, "keyboard"), bt.current(), ib(() => {
        n == null || n(!1), e == null || e();
      });
    T([]);
  }, [t, d, n, e]), Ye(() => {
    if (!t || !z) return;
    const ie = (de) => {
      if (de.pointerType !== "touch") return;
      const _e = de.target;
      _e && (x.current && x.current.contains(_e) || k.current && k.current.contains(_e) || _e instanceof Element && _e.closest("[data-radix-menu-content]") || (n == null || n(!1), e == null || e()));
    };
    return z.addEventListener("pointerdown", ie, { capture: !0 }), () => z.removeEventListener("pointerdown", ie, { capture: !0 });
  }, [t, z, n, e]);
  const ne = Le(() => {
    const ie = k.current;
    if (!ie) return null;
    const de = ie.getBoundingClientRect();
    return { left: de.left, top: de.top, width: de.width, height: de.height };
  }, []), Ne = ll({
    visible: t,
    morph: l,
    anchor: ne,
    onClosed: () => E(!1)
  }), Ae = G(() => {
  }), Ke = G(() => {
  }), $e = G(() => {
  }), Oe = Le((ie) => {
    if (ie.key === "Enter") {
      const de = le.highlightedIndex, _e = le.items[de >= 0 ? de : 0];
      return _e == null || _e.activate(), !0;
    }
    return ie.key === "Escape" ? (n == null || n(!1), e == null || e(), !0) : !1;
  }, [le, n, e]);
  Uf(t && v.length === 0, le, Ae, {
    onFieldKey: Oe,
    onSelectAll: ke ? () => nt.setAll(!0) : void 0
  }), Yf(t, Ke), Gf(t, le, Ae, x, v.length > 0, $e, {
    ignoreFields: W,
    selectAll: ke
  });
  const et = G(null), ht = Le((ie) => {
    var de;
    if (ie) {
      ie.addEventListener("keydown", Ae.current, { capture: !0 }), ie.addEventListener("wheel", Ke.current, { passive: !1 });
      const _e = ie.ownerDocument;
      et.current = _e, _e.addEventListener("keydown", $e.current, { capture: !0 }), Et(!0);
    } else
      (de = et.current) == null || de.removeEventListener("keydown", $e.current, { capture: !0 }), et.current = null, Et(!1);
    x.current = ie, Ne(ie);
  }, [Ne]), [Se, Ze] = Xe({ top: 0, left: 0, maxH: nb, side: "bottom", ready: !1 }), [Ct, wt] = Xe(0), [Ve, Et] = Xe(!1);
  Ye(() => {
    t && k.current && wt(k.current.getBoundingClientRect().width);
  }, [t]), rb({
    anchorRef: k,
    panelRef: x,
    open: t && Ve,
    maxHeight: u,
    onPosition: Ze
  }), Ye(() => {
    var ie;
    if (Se.ready && t) {
      if (f) {
        (ie = j.current ?? k.current) == null || ie.focus();
        return;
      }
      const de = x.current;
      de && de.ownerDocument.activeElement !== de && !de.contains(de.ownerDocument.activeElement) && de.focus();
    }
  }, [Se.ready, t, f]), Ye(() => {
    if (!t || !f) return;
    if (le.items.length === 0) {
      le.highlightedIndex !== -1 && le.setHighlighted(-1, "keyboard");
      return;
    }
    const ie = le.highlightedIndex;
    (ie < 0 || ie >= le.items.length) && le.setHighlighted(0, "keyboard");
  }, [t, re, f, le.items.length]), Nn(() => {
    var de;
    if (!t || le.highlightedIndex < 0 || le.pointerDriven) return;
    const ie = (de = x.current) == null ? void 0 : de.querySelector(`[data-ei="${le.highlightedIndex}"]`);
    fi(ie, "nearest");
  }, [t, le.highlightedIndex, le.pointerDriven]);
  const pt = Le((ie) => {
    if (!(!ie && !M.current)) {
      if (!ie && zt.current) {
        if (W) return;
        Bt.current = !0;
      }
      n ? n(ie) : ie || e == null || e();
    }
  }, [n, e]), mt = G(_);
  mt.current = _;
  const zt = G(!1), Bt = G(!1), nn = Le(() => {
    if (!M.current && mt.current) {
      if (Bt.current) {
        Bt.current = !1, zt.current = !1;
        return;
      }
      n == null || n(!0);
    }
  }, [n]), vt = Pt.isValidElement(r) ? r : null, he = G(!1), ge = Le(() => {
    const ie = k.current;
    ie && (he.current = !0, ie.focus(), setTimeout(() => {
      he.current = !1;
    }, 0));
  }, []), Ce = vt ? Pt.cloneElement(vt, {
    ref: (ie) => {
      k.current = ie;
      const de = vt.props.ref;
      typeof de == "function" ? de(ie) : de && (de.current = ie);
    },
    /* Radix's trigger primitive merges `type="button"` onto the child; a
       text field trigger-as-search must stay a text field. */
    ...W ? { type: vt.props.type ?? "text" } : {},
    ...W ? {
      /* A text field that opens a list IS a combobox, and the highlighted
         row must be announced — the field is outside the popup, so the
         only link screen readers get is `aria-activedescendant`. */
      role: "combobox",
      "aria-autocomplete": "list",
      "aria-controls": t ? `${Y}-content` : void 0,
      "aria-activedescendant": t && le.highlightedIndex >= 0 ? `${Y}-opt-${le.highlightedIndex}` : void 0
    } : {},
    onPointerDownCapture: (ie) => {
      var de, _e;
      (_e = (de = vt.props).onPointerDownCapture) == null || _e.call(de, ie), zt.current = !0, Bt.current = !1, setTimeout(() => {
        zt.current = !1;
      }, 0);
    },
    onPointerDown: (ie) => {
      var de, _e;
      if ((_e = (de = vt.props).onPointerDown) == null || _e.call(de, ie), W) {
        ie.preventDefault();
        const Ue = M.current;
        Ue || n == null || n(!0);
        const Mt = k.current;
        Mt == null || Mt.focus(), !Ue && Mt instanceof HTMLInputElement && Mt.select();
      }
    },
    /* Space is a printable search character, but Radix treats it as the
       trigger's open/close key. Keep it in the field. */
    onKeyDownCapture: (ie) => {
      var de, _e;
      (_e = (de = vt.props).onKeyDownCapture) == null || _e.call(de, ie), W && ie.key === " " && ie.stopPropagation();
    },
    onClick: (ie) => {
      var de, _e;
      (_e = (de = vt.props).onClick) == null || _e.call(de, ie), nn();
    },
    /* A kit-driven focus restore is not a user focus (see above). */
    onFocus: (ie) => {
      var de, _e;
      if (he.current) {
        he.current = !1;
        return;
      }
      (_e = (de = vt.props).onFocus) == null || _e.call(de, ie);
    },
    /* Focus leaving the field ends the search session: Tab (or any focus
       move that does not land in the panel) must close the list, not leave
       an orphan panel floating with the keyboard elsewhere. The panel's
       own focused row is legitimate — keep it open for the pending click. */
    onBlur: (ie) => {
      var _e, Ue, Mt, Gt;
      if ((Ue = (_e = vt.props).onBlur) == null || Ue.call(_e, ie), !W || !M.current) return;
      const de = ie.relatedTarget;
      de && ((Mt = x.current) != null && Mt.contains(de) || (Gt = k.current) != null && Gt.contains(de)) || setTimeout(() => {
        var xe;
        const it = k.current;
        if (!it || !M.current) return;
        const Q = it.ownerDocument.activeElement;
        Q && (it.contains(Q) || (xe = x.current) != null && xe.contains(Q)) || (n == null || n(!1), e == null || e());
      }, 0);
    },
    /* Combobox mode (externalSearch): the trigger field IS the search box,
       so it also drives the menu's keyboard — arrows move the single
       highlight and Enter activates the highlighted (or first visible)
       row. Filtering itself follows the VALUE (see filterQuery), so no
       input method is special-cased here. */
    onKeyDown: (ie) => {
      var de, _e;
      if ((_e = (de = vt.props).onKeyDown) == null || _e.call(de, ie), !(!W || !M.current)) {
        if (ie.key === "ArrowDown" || ie.key === "ArrowUp") {
          ie.preventDefault();
          const Ue = le.items;
          if (Ue.length === 0) return;
          const Mt = ie.key === "ArrowDown" ? 1 : -1, Gt = (le.highlightedIndex + Mt + Ue.length) % Ue.length;
          le.setHighlighted(Gt, "keyboard");
        } else if (ie.key === "Enter") {
          ie.preventDefault();
          const Ue = le.highlightedIndex, Mt = le.items[Ue >= 0 ? Ue : 0];
          Mt == null || Mt.activate();
        }
      }
    }
  }) : r, Re = /* @__PURE__ */ pe("div", { "data-menu-search-empty": !0, className: "px-3 py-3 text-center", children: [
    /* @__PURE__ */ pe("div", { className: "text-xs font-medium text-[color:var(--ui-text-muted)]", children: [
      "No matches for “",
      te.trim(),
      "”"
    ] }),
    /* @__PURE__ */ A("div", { className: "mt-0.5 text-[10px] text-[color:var(--ui-text-faint)]", children: "Try a different search." })
  ] }), Pe = V || ke, lt = `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] min-w-0 ${Pe ? "overflow-hidden" : "overflow-y-auto scrollbar-custom"}`;
  return /* @__PURE__ */ pe(pn.Root, { open: t || _, onOpenChange: pt, modal: !1, children: [
    /* @__PURE__ */ A(pn.Trigger, { asChild: !0, children: Ce }),
    /* @__PURE__ */ A(pn.Portal, { container: S ?? void 0, children: /* @__PURE__ */ A(Bf.Provider, { value: I, children: /* @__PURE__ */ A(qf.Provider, { value: C.attrs, children: /* @__PURE__ */ A(jf.Provider, { value: { chain: v, setChain: T, morph: l, keyboardOpened: D, setKeyboardOpened: P }, children: /* @__PURE__ */ A(Fs.Provider, { value: le, children: /* @__PURE__ */ A(mb.Provider, { value: { query: re, setQuery: F }, children: /* @__PURE__ */ A(cb.Provider, { value: ke ? nt : null, children: /* @__PURE__ */ A(yb.Provider, { value: Y, children: /* @__PURE__ */ pe(
      pn.Content,
      {
        id: `${Y}-content`,
        ref: ht,
        tabIndex: W ? void 0 : -1,
        ...C.attrs,
        "data-ui-fixed": !0,
        className: `${lt} ${o || ""} ${c || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: Se.left,
          top: Se.top,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: o ? void 0 : Ct || void 0,
          maxHeight: Se.maxH,
          visibility: Se.ready ? "visible" : "hidden"
        },
        onPointerLeave: le.pointerLeave,
        onFocusCapture: W ? (ie) => {
          ie.target === ie.currentTarget && (ie.stopPropagation(), ge());
        } : void 0,
        onFocusOutside: W ? (ie) => {
          var _e;
          const de = ie.target;
          de && (de === k.current || (_e = k.current) != null && _e.contains(de)) && ie.preventDefault();
        } : void 0,
        onCloseAutoFocus: W ? (ie) => {
          ie.preventDefault(), ge();
        } : void 0,
        children: [
          V && /* @__PURE__ */ A("div", { className: "shrink-0 px-0 pt-1 pb-1", style: { paddingRight: Z }, children: /* @__PURE__ */ pe("div", { "data-menu-search": !0, className: "ui-item ui-item-highlighted flex items-center gap-2 rounded", style: H, children: [
            /* @__PURE__ */ A(Io, { className: "w-3.5 h-3.5 shrink-0 ui-icon" }),
            /* @__PURE__ */ A(
              "input",
              {
                ref: j,
                value: re,
                onChange: (ie) => F(ie.target.value),
                placeholder: h ?? "Search…",
                className: "flex-1 min-w-0 bg-transparent outline-none text-current placeholder:text-current placeholder:opacity-50 cursor-text"
              }
            ),
            re ? /* @__PURE__ */ A(
              "button",
              {
                type: "button",
                tabIndex: -1,
                "aria-label": "Clear search",
                className: "shrink-0 ui-icon-btn rounded flex items-center justify-center p-1 -m-1",
                onPointerDown: (ie) => ie.stopPropagation(),
                onClick: () => {
                  var ie;
                  F(""), (ie = j.current) == null || ie.focus();
                },
                children: /* @__PURE__ */ A(eo, { className: "w-3.5 h-3.5" })
              }
            ) : /* @__PURE__ */ A("span", { className: "w-3.5 h-3.5 shrink-0" })
          ] }) }),
          Pe ? /* @__PURE__ */ pe("div", { "data-menu-items": !0, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: [
            a,
            ue && Re
          ] }) : /* @__PURE__ */ pe(Dn, { children: [
            a,
            ue && Re
          ] }),
          ke && (m == null ? void 0 : m.footer) !== !1 && /* @__PURE__ */ A(
            fb,
            {
              count: nt.count,
              max: m == null ? void 0 : m.max,
              hiddenCount: (m == null ? void 0 : m.hiddenNote) === !1 ? 0 : nt.hiddenCount,
              clear: (m == null ? void 0 : m.clear) !== !1,
              theme: I,
              onClear: nt.clear,
              hero: {
                label: gt,
                onClick: () => {
                  nt.commit(), pt(!1);
                },
                disabled: nt.count === 0
              }
            }
          )
        ]
      }
    ) }) }) }) }) }) }) }) })
  ] });
}
function ZP({
  open: t,
  onClose: e,
  items: n,
  activeId: r,
  onSelect: i,
  onRename: o,
  onDuplicate: s,
  onDelete: a,
  onCreate: l,
  onImport: c,
  onExport: u,
  onReset: d,
  onTrash: f,
  closeOnSelect: h,
  readOnly: p = !1,
  theme: g,
  align: y,
  label: m,
  header: b,
  itemLabel: C,
  trigger: I,
  minItems: v = 1,
  itemRender: T,
  morph: D = !0,
  contentClassName: P
}) {
  const S = cl(), z = Wf(), [k, x] = Xe(null), [M, _] = Xe(""), E = G(M);
  E.current = M;
  const O = G(null), L = G(null), [W, re] = Xe(null), F = Le((H) => {
    L.current = H, re(H);
  }, []), N = ab({
    open: t,
    scroller: () => L.current,
    row: () => {
      var H;
      return ((H = L.current) == null ? void 0 : H.querySelector('[data-active="1"]')) ?? null;
    }
  });
  Ye(() => {
    if (!t) return;
    const H = (J) => {
      var He, nt;
      const V = J.target;
      if (V && V.closest("input, textarea, [contenteditable]")) {
        k && V === O.current && (J.key === "Enter" ? (J.preventDefault(), J.stopImmediatePropagation(), Y()) : J.key === "Escape" && (J.preventDefault(), J.stopImmediatePropagation(), j()));
        return;
      }
      const K = (He = L.current) == null ? void 0 : He.closest(".ui-menu");
      if (!K || !K.contains(J.target)) return;
      const le = K.ownerDocument, ue = [...K.querySelectorAll('[data-im-row] > [role="menuitem"]:first-child')], ke = [...K.querySelectorAll(':scope > div:last-child > [role="menuitem"]')], we = [...ue, ...ke];
      if (J.key === "ArrowDown" || J.key === "ArrowUp") {
        J.preventDefault(), J.stopImmediatePropagation();
        const bt = le.activeElement;
        let gt = bt ? we.indexOf(bt) : -1;
        if (gt < 0 && bt) {
          const Ke = bt.closest("[data-im-row]"), $e = Ke == null ? void 0 : Ke.querySelector('[role="menuitem"]:first-child');
          $e && (gt = ue.indexOf($e));
        }
        const ne = J.key === "ArrowDown" ? 1 : -1, Ne = gt < 0 ? ne === 1 ? 0 : we.length - 1 : (gt + ne + we.length) % we.length, Ae = we[Ne];
        Ae == null || Ae.focus({ preventScroll: !0 }), fi((Ae == null ? void 0 : Ae.closest("[data-im-row]")) ?? Ae, "nearest", L.current);
        return;
      }
      if (J.key === "ArrowLeft" || J.key === "ArrowRight") {
        const bt = le.activeElement, gt = bt == null ? void 0 : bt.closest("[data-im-row]");
        if (!gt) return;
        J.preventDefault(), J.stopImmediatePropagation();
        const ne = [...gt.querySelectorAll('[role="menuitem"]')].slice(1);
        if (ne.length === 0) return;
        const Ne = bt && gt.contains(bt) ? ne.indexOf(bt) : -1, Ae = J.key === "ArrowRight" ? 1 : -1, Ke = Ne < 0 ? 0 : (Ne + Ae + ne.length) % ne.length;
        (nt = ne[Ke]) == null || nt.focus({ preventScroll: !0 });
        return;
      }
    }, Z = (W == null ? void 0 : W.ownerDocument) ?? null;
    return Z == null || Z.addEventListener("keydown", H, { capture: !0 }), () => Z == null ? void 0 : Z.removeEventListener("keydown", H, { capture: !0 });
  }, [t, k, W]), Ye(() => {
    if (!k) return;
    const H = n.find((K) => K.id === k);
    H && !M && _(H.name);
    const Z = requestAnimationFrame(() => {
      const K = O.current;
      K && (K.focus(), K.select());
    });
    let J = 0;
    const V = window.setInterval(() => {
      const K = O.current;
      if (J++, !K || J > 12) {
        clearInterval(V);
        return;
      }
      K.ownerDocument.activeElement !== K && (K.focus(), K.select());
    }, 50);
    return () => {
      cancelAnimationFrame(Z), clearInterval(V);
    };
  }, [k]), Ye(() => {
    if (k) {
      const H = n.find((Z) => Z.id === k);
      H && !M && _(H.name);
    }
  }, [k, n]);
  const te = (H, Z) => {
    x(H), _(Z);
  }, Y = () => {
    k && E.current.trim() && o(k, E.current.trim()), x(null);
  }, j = () => {
    x(null);
  }, ee = C || b.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ pe(dl, { open: t, onOpenChange: (H) => {
    H ? (x(null), _("")) : (k && M.trim() && o(k, M.trim()), x(null), _("")), (!H || !p) && e(H);
  }, width: "w-80", theme: g, align: y, trigger: I, morph: D, contentClassName: P, children: [
    /* @__PURE__ */ A("div", { className: `shrink-0 ${S.headerText}`, children: b }),
    /* @__PURE__ */ A("div", { ref: F, "data-im-list": !0, onPointerEnter: N.engage, onPointerDown: N.engage, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: n.map((H) => {
      const Z = H.id === r, J = k === H.id;
      return /* @__PURE__ */ A("div", { "data-im-row": H.id, "data-active": Z ? "1" : void 0, className: `scroll-my-4 flex items-center gap-1 rounded ${Z || J ? S.rowActiveBg : S.rowHoverBg} ${k && !J ? "opacity-40 pointer-events-none" : ""}`, children: J ? /* @__PURE__ */ pe(Dn, { children: [
        /* @__PURE__ */ A("div", { className: "flex-1 min-w-0 flex items-center", children: /* @__PURE__ */ A(
          "input",
          {
            ref: O,
            autoFocus: !0,
            value: M,
            onChange: (V) => _(V.target.value),
            onKeyDown: (V) => {
              V.key === "Enter" && (V.preventDefault(), V.stopPropagation(), Y()), V.key === "Escape" && (V.preventDefault(), V.stopPropagation(), j());
            },
            className: "w-full outline-none bg-transparent placeholder:text-current placeholder:opacity-50",
            style: z
          }
        ) }),
        /* @__PURE__ */ A(
          pn.Item,
          {
            className: `shrink-0 ${S.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${S.editConfirm}`,
            onSelect: (V) => {
              V.preventDefault(), Y();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ A(Os, { className: S.btnIcon })
          }
        ),
        /* @__PURE__ */ A(
          pn.Item,
          {
            className: `shrink-0 ${S.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${S.editCancel}`,
            onSelect: (V) => {
              V.preventDefault(), j();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ A(eo, { className: S.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ pe(Dn, { children: [
        /* @__PURE__ */ A(
          pn.Item,
          {
            style: z,
            className: `flex-1 min-w-0 rounded outline-none cursor-pointer flex items-center ${S.rowText} ${Z ? "" : S.rowTextHover}`,
            onSelect: h ? () => {
              i(H.id);
            } : (V) => {
              V.preventDefault(), i(H.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ A("span", { className: `truncate ${Z ? S.rowActiveText : ""}`, children: T ? T(H) : H.name })
          }
        ),
        /* @__PURE__ */ A(
          pn.Item,
          {
            className: `shrink-0 ${S.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${Z ? S.btnActive : S.btnBase}`,
            onSelect: (V) => {
              V.preventDefault(), te(H.id, H.name);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ A(qw, { className: S.btnIcon })
          }
        ),
        /* @__PURE__ */ A(
          pn.Item,
          {
            className: `shrink-0 ${S.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${Z ? S.btnActive : S.btnBase}`,
            onSelect: (V) => {
              V.preventDefault();
              const K = s(H.id);
              K && te(K, `${H.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ A(Ky, { className: S.btnIcon })
          }
        ),
        /* @__PURE__ */ A(
          pn.Item,
          {
            className: `shrink-0 ${S.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${n.length <= v ? S.btnDisabled : Z ? S.btnDangerActive : S.btnDanger}`,
            onSelect: (V) => {
              V.preventDefault(), a(H.id);
            },
            onTouchStart: () => {
            },
            disabled: p || n.length <= v,
            children: /* @__PURE__ */ A(za, { className: S.btnIcon })
          }
        )
      ] }) }, H.id);
    }) }),
    /* @__PURE__ */ pe("div", { className: `shrink-0 ${k ? "opacity-40 pointer-events-none" : ""}`, children: [
      d && /* @__PURE__ */ pe(Dn, { children: [
        /* @__PURE__ */ A(pn.Separator, { className: S.separator }),
        /* @__PURE__ */ pe(
          pn.Item,
          {
            className: `w-full text-left ${S.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${S.itemDefault} ui-row`,
            onSelect: (H) => {
              H.preventDefault(), d();
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: [
              /* @__PURE__ */ A(Uy, { className: `${S.btnIcon} ${S.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (l || c || u || f) && /* @__PURE__ */ A(pn.Separator, { className: S.separator }),
      l && /* @__PURE__ */ pe(
        pn.Item,
        {
          className: `w-full text-left ${S.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${S.itemDefault} ui-row`,
          onSelect: (H) => {
            H.preventDefault();
            const Z = l();
            Z && te(Z, "");
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ A(ol, { className: `${S.btnIcon} ${S.icon}` }),
            "New ",
            ee
          ]
        }
      ),
      c && /* @__PURE__ */ pe(
        pn.Item,
        {
          className: `w-full text-left ${S.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${S.itemDefault} ui-row`,
          onSelect: (H) => {
            H.preventDefault(), c();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ pe("svg", { className: `${S.btnIcon} ${S.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ A("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ A("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ A("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      u && /* @__PURE__ */ pe(
        pn.Item,
        {
          className: `w-full text-left ${S.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${S.itemDefault} ui-row`,
          onSelect: (H) => {
            H.preventDefault(), u();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ pe("svg", { className: `${S.btnIcon} ${S.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ A("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ A("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ A("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      f && /* @__PURE__ */ pe(
        pn.Item,
        {
          className: `w-full text-left ${S.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${S.itemDefault} ui-row`,
          onSelect: (H) => {
            H.preventDefault(), f();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ A(za, { className: `${S.btnIcon} ${S.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
function Xx({
  onClick: t,
  icon: e,
  disabled: n = !1,
  variant: r = "default",
  className: i = "",
  children: o,
  keepOpen: s = !1,
  selected: a = !1,
  rightAction: l,
  trailing: c,
  group: u,
  itemId: d
}) {
  var L;
  hb();
  const f = cl(), h = Wf(), p = pb(), g = G(!1), y = G(null), m = Lx(), b = !!m && d !== void 0, C = m && d !== void 0 ? m.isSelected(d) : a, I = n || (m && d !== void 0 ? !m.canToggle(d) : !1), { myIndex: v, highlighted: T, setPointer: D, api: P } = bb({
    label: () => gb(o),
    activate: () => {
      I || (m && d !== void 0 ? m.toggle(d) : t());
    },
    disabled: I,
    group: u,
    itemId: d
  }), { query: S } = Ux(), z = S.trim() !== "" && v < 0, k = Gx(), x = u == null ? void 0 : u.trim(), M = !!x && v >= 0 && (v === 0 || ((L = P == null ? void 0 : P.items[v - 1]) == null ? void 0 : L.group) !== x), _ = x && m ? ((P == null ? void 0 : P.items) ?? []).filter((W) => W.group === x && W.itemId).map((W) => W.itemId).filter((W) => !m.isDisabled(W)) : [], E = m && _.length > 0 ? m.groupState(_) : "none", O = r === "danger" ? f.itemDanger : f.itemDefault;
  return /* @__PURE__ */ pe(Dn, { children: [
    M && /* @__PURE__ */ A(
      "div",
      {
        "data-menu-group": x,
        role: "presentation",
        className: `ui-label shrink-0 select-none font-semibold uppercase tracking-wider ${m && _.length > 0 ? "" : "pointer-events-none"}`,
        style: p,
        children: m && _.length > 0 ? /* @__PURE__ */ pe("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ A(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `Select all ${x}`,
              onMouseDown: (W) => W.preventDefault(),
              onClick: () => m.toggleGroup(_),
              className: "flex shrink-0 cursor-pointer items-center justify-center rounded pointer-events-auto",
              children: /* @__PURE__ */ A(
                Fa,
                {
                  checked: E === "all",
                  indeterminate: E === "some",
                  indicator: m.indicator
                }
              )
            }
          ),
          /* @__PURE__ */ A("span", { className: "flex-1 truncate", children: x })
        ] }) : x
      }
    ),
    /* @__PURE__ */ pe(
      pn.Item,
      {
        ref: y,
        id: k && v >= 0 ? `${k}-opt-${v}` : void 0,
        "data-ei": v >= 0 ? v : void 0,
        ...b ? { role: "menuitemcheckbox", "aria-checked": C } : {},
        style: { ...h, display: z ? "none" : void 0 },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${O} ${b ? "" : a ? "ui-item-selected" : ""} ${T ? "ui-item-highlighted" : ""} ${I ? "opacity-30 pointer-events-none" : ""} ${i}`,
        onSelect: (W) => {
          if (g.current) {
            g.current = !1;
            return;
          }
          if (b) {
            W.preventDefault(), m && d !== void 0 && m.toggle(d);
            return;
          }
          s && W.preventDefault(), t();
        },
        onPointerEnter: () => {
          D(v);
        },
        onTouchStart: () => {
        },
        disabled: I,
        children: [
          b && /* @__PURE__ */ A(Fa, { checked: C, disabled: I, indicator: m.indicator }),
          e && /* @__PURE__ */ A("span", { className: `${f.icon} shrink-0`, children: e }),
          /* @__PURE__ */ A("span", { className: "flex-1 truncate", children: o }),
          c && /* @__PURE__ */ A("span", { className: "shrink-0 ml-1 flex items-center", children: c }),
          l && /* @__PURE__ */ A(
            "span",
            {
              className: `shrink-0 ml-1 p-0.5 rounded ${f.rightAction}`,
              title: l.title,
              onPointerDown: (W) => {
                W.stopPropagation(), W.preventDefault(), g.current = !0, l.onClick();
              },
              onClick: (W) => {
                W.stopPropagation(), W.preventDefault();
              },
              children: l.icon
            }
          )
        ]
      }
    )
  ] });
}
function Vx({ id: t, label: e, icon: n, width: r, side: i = "right", children: o, contentClassName: s }) {
  const { chain: a, setChain: l, morph: c, keyboardOpened: u, setKeyboardOpened: d } = ni(jf), f = a.includes(t), h = a[a.length - 1] === t;
  hb();
  const p = Wx(), g = oo(), y = G(null), m = G(null), [b, C] = Xe(f), I = !f && b;
  Ye(() => {
    f && C(!0);
  }, [f]);
  const v = () => l((j) => {
    const ee = j.indexOf(t);
    return ee >= 0 ? j.slice(0, ee) : j;
  }), T = ul(), D = Kf(), P = G(D);
  P.current = D;
  const S = G(null);
  Ye(() => {
    var ee;
    const j = {
      label: e,
      activate: () => {
        d(t), l((H) => H.includes(t) ? H : [...H, t]);
      },
      submenu: !0
    };
    return S.current = j, (ee = P.current) == null ? void 0 : ee.register(j);
  }, []);
  const z = D && S.current ? D.items.indexOf(S.current) : -1, k = z >= 0 && z === D.highlightedIndex, x = Le(() => {
    const j = y.current;
    if (!j) return null;
    const ee = j.getBoundingClientRect();
    return { left: ee.left, top: ee.top, width: ee.width, height: ee.height };
  }, []), M = ll({
    visible: f,
    morph: c,
    anchor: x,
    onClosed: () => C(!1)
  }), _ = G(() => {
  }), E = G(() => {
  }), O = G(() => {
  });
  Uf(f && h, T, _, {
    onCloseSub: () => {
      v(), D && z >= 0 && D.setHighlighted(z, "keyboard");
    }
  });
  const L = G(u);
  L.current = u, Ye(() => {
    f && (L.current === t ? (T.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var j;
      return (j = m.current) == null ? void 0 : j.focus();
    }), d(null)) : T.setHighlighted(-1, "keyboard"));
  }, [f]), Yf(f, E), Gf(f, T, _, m, !h, O), Pt.useLayoutEffect(() => {
    var ee;
    if (!f || T.highlightedIndex < 0 || T.pointerDriven) return;
    const j = (ee = m.current) == null ? void 0 : ee.querySelector(`[data-ei="${T.highlightedIndex}"]`);
    fi(j, "nearest", m.current);
  }, [f, T.highlightedIndex, T.pointerDriven]);
  const W = G(null), re = Le((j) => {
    var ee;
    if (j) {
      j.addEventListener("keydown", _.current, { capture: !0 }), j.addEventListener("wheel", E.current, { passive: !1 });
      const H = j.ownerDocument;
      W.current = H, H.addEventListener("keydown", O.current, { capture: !0 });
    } else
      (ee = W.current) == null || ee.removeEventListener("keydown", O.current, { capture: !0 }), W.current = null;
    m.current = j, M(j);
  }, [M]), F = mn(), N = { padding: `${Me(8, 12, F)}px ${Me(12, 16, F)}px`, fontSize: Me(12, 14, F) }, te = `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${k ? " ui-item-highlighted" : ""}${I ? " ui-sub-closing" : ""}`, Y = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${s || ""}`;
  return /* @__PURE__ */ pe(pn.Sub, { open: f || b, onOpenChange: (j) => l((ee) => {
    if (!j) {
      const H = ee.indexOf(t);
      return H >= 0 ? ee.slice(0, H) : ee;
    }
    return ee.includes(t) ? ee : [...ee, t];
  }), children: [
    /* @__PURE__ */ pe(
      pn.SubTrigger,
      {
        ref: y,
        "data-ei": z >= 0 ? z : void 0,
        style: N,
        className: te,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          D && z >= 0 && D.setHighlighted(z, "pointer");
        },
        onPointerDown: (j) => {
          j.pointerType === "pen" && (j.preventDefault(), l((ee) => f ? ee.slice(0, ee.indexOf(t)) : [...ee, t]));
        },
        children: [
          i === "left" && /* @__PURE__ */ A(La, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ pe("span", { className: "flex items-center gap-2", children: [
            n && /* @__PURE__ */ A("span", { className: "ui-icon shrink-0", children: n }),
            e
          ] }),
          i === "right" && /* @__PURE__ */ A(La, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ A(pn.Portal, { container: g ?? void 0, children: /* @__PURE__ */ A(
      pn.SubContent,
      {
        ref: re,
        ...p,
        className: Y,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: T.pointerLeave,
        children: /* @__PURE__ */ A(Fs.Provider, { value: T, children: o })
      }
    ) })
  ] });
}
const Zo = 8, Jx = ({ open: t, x: e, y: n, onClose: r, children: i, containerRef: o, theme: s, morph: a = !0 }) => {
  const l = vr(), c = s ? { theme: s, attrs: { "data-theme": s } } : l ? sb(void 0, l) : { theme: "light", attrs: { "data-theme": "light" } }, { theme: u } = c, d = mn(), f = Me(12, 14, d), h = G(null), p = Ls(), [g, y] = Xe(!1), [m, b] = Xe([]), [C, I] = Xe(null), v = ul();
  Ye(() => {
    if (t)
      return v.setHighlighted(-1, "keyboard"), ib(r);
  }, [t, r]);
  const T = G({ left: e, top: n });
  t && (T.current = { left: e, top: n });
  const D = Le(() => ({ left: T.current.left, top: T.current.top, width: 0, height: 0 }), []), P = ll({
    visible: !0,
    morph: a,
    anchor: D,
    cloneOnUnmount: !0
  }), S = G(() => {
  }), z = G(() => {
  }), k = G(() => {
  });
  Uf(t, v, S), Nn(() => {
    if (!t || v.highlightedIndex < 0 || v.pointerDriven) return;
    const O = h.current;
    fi(
      O == null ? void 0 : O.querySelector(`[data-ei="${v.highlightedIndex}"]`),
      "nearest",
      O
    );
  }, [t, v.highlightedIndex, v.pointerDriven]), Yf(t, z), Gf(t, v, S, h, m.length > 0, k);
  const x = G(null), M = Le((O) => {
    var L;
    if (O) {
      O.addEventListener("keydown", S.current, { capture: !0 }), O.addEventListener("wheel", z.current, { passive: !1 });
      const W = O.ownerDocument;
      x.current = W, W.addEventListener("keydown", k.current, { capture: !0 });
    } else
      (L = x.current) == null || L.removeEventListener("keydown", k.current, { capture: !0 }), x.current = null;
    h.current = O, y(!!O), P(O);
  }, [P]), [_, E] = Xe(null);
  return Nn(() => {
    var H;
    if (!t || !g || !h.current) return;
    const O = h.current, L = O.offsetWidth, W = O.offsetHeight, re = (H = o == null ? void 0 : o.current) == null ? void 0 : H.getBoundingClientRect(), F = re ? re.right : (p == null ? void 0 : p.innerWidth) ?? 0, N = re ? re.bottom : (p == null ? void 0 : p.innerHeight) ?? 0, te = re ? re.left : 0, Y = re ? re.top : 0;
    let j = Math.max(Y + Zo, T.current.top), ee = Math.max(te + Zo, T.current.left);
    ee + L > F && (ee = F - L - Zo), j + W > N && (j = Math.max(Y + Zo, N - W - Zo)), E({ left: ee, top: j });
  }, [t, g, e, n, o]), t ? /* @__PURE__ */ pe(pn.Root, { open: t, onOpenChange: (O) => {
    O || r();
  }, modal: !1, children: [
    /* @__PURE__ */ A(pn.Trigger, { asChild: !0, children: /* @__PURE__ */ A("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ A(pn.Portal, { children: /* @__PURE__ */ A(Bf.Provider, { value: u, children: /* @__PURE__ */ A(qf.Provider, { value: c.attrs, children: /* @__PURE__ */ A(jf.Provider, { value: { chain: m, setChain: b, morph: a, keyboardOpened: C, setKeyboardOpened: I }, children: /* @__PURE__ */ A(Fs.Provider, { value: v, children: /* @__PURE__ */ A(
      pn.Content,
      {
        ref: M,
        ...c.attrs,
        "data-ui-fixed": !0,
        className: "fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom",
        style: { fontSize: f, left: (_ == null ? void 0 : _.left) ?? T.current.left, top: (_ == null ? void 0 : _.top) ?? T.current.top, touchAction: "manipulation" },
        onPointerLeave: v.pointerLeave,
        children: i
      }
    ) }) }) }) }) })
  ] }) : null;
}, aa = ({ onClick: t, variant: e = "default", icon: n, disabled: r = !1, selected: i = !1, trailing: o, children: s }) => {
  const a = mn(), l = { padding: `${Me(8, 12, a)}px ${Me(12, 16, a)}px`, fontSize: Me(12, 14, a) }, c = Kf(), u = G(c);
  u.current = c;
  const d = G(null);
  Ye(() => {
    var g;
    const p = { label: gb(s), activate: () => {
      r || t();
    } };
    return d.current = p, (g = u.current) == null ? void 0 : g.register(p);
  }, []);
  const f = c && d.current ? c.items.indexOf(d.current) : -1, h = !r && f >= 0 && f === c.highlightedIndex;
  return /* @__PURE__ */ pe(
    pn.Item,
    {
      "data-ei": f >= 0 ? f : void 0,
      onClick: r ? void 0 : t,
      onPointerEnter: () => {
        !r && c && f >= 0 && c.setHighlighted(f, "pointer");
      },
      onTouchStart: () => {
      },
      disabled: r,
      style: l,
      className: `w-full text-left flex items-center gap-2 rounded cursor-pointer ${r ? "opacity-40 cursor-default" : e === "danger" ? "ui-item ui-item-danger" : "ui-item"} ${i ? "ui-item-selected" : ""} ${h ? "ui-item-highlighted" : ""}`,
      children: [
        n,
        /* @__PURE__ */ A("span", { className: "flex-1 truncate", children: s }),
        o && /* @__PURE__ */ A("span", { className: "shrink-0 ml-1 flex items-center", children: o })
      ]
    }
  );
}, Zx = () => /* @__PURE__ */ A(pn.Separator, { className: "ui-sep my-1" }), QP = (t) => /* @__PURE__ */ A(Vx, { ...t, width: t.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), ln = 8, vb = "[data-modal-stack]", ci = 220, Ts = "cubic-bezier(0.32, 0.72, 0, 1)", _a = 0.94;
function So() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Si(t) {
  if (!t) return { top: 0, height: 0, bottom: 0 };
  const e = t.visualViewport, n = e ? e.offsetTop : 0, r = e ? e.height : t.innerHeight;
  return { top: n, height: r, bottom: n + r };
}
function wb(t, e) {
  return `translate(${e.left - t.left}px, ${e.top - t.top}px) scale(${e.width / t.width}, ${e.height / t.height})`;
}
function up(t, e, n, r) {
  const i = ++t.current, o = e.getBoundingClientRect();
  e.style.transition = "none", e.style.transform = wb(o, n), e.style.transformOrigin = "0 0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      t.current === i && (e.style.transition = `transform ${ci}ms ${Ts}, opacity 180ms ease`, e.style.transform = "none", window.setTimeout(() => {
        t.current === i && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", r());
      }, ci + 80));
    });
  });
}
function Qx(t, e, n) {
  const r = ++t.current;
  e.style.transition = "none", e.style.transformOrigin = "center", e.style.transform = `scale(${_a})`, e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      t.current === r && (e.style.transition = `transform ${ci}ms ${Ts}`, e.style.transform = "none", window.setTimeout(() => {
        t.current === r && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", n());
      }, ci + 60));
    });
  });
}
function dp(t, e, n) {
  const r = ++t.current, i = e.getBoundingClientRect(), o = 1 - _a, s = { left: i.left + i.width * o / 2, top: i.top + i.height * o / 2, width: i.width * _a, height: i.height * _a };
  e.style.transition = `transform ${ci}ms ${Ts}, opacity 170ms ease`, e.style.transformOrigin = "0 0", e.style.transform = wb(i, s), e.style.opacity = "0", window.setTimeout(() => {
    t.current === r && (e.style.visibility = "hidden", n(), requestAnimationFrame(() => {
      t.current !== r || e.isConnected || (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", e.style.opacity = "", e.style.visibility = "");
    }));
  }, ci + 60);
}
function Kl(t) {
  const e = t.parentNode;
  return e ? Array.from(e.children).filter((n) => n instanceof HTMLElement && n !== t && n.matches(vb) && (n.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
function la(t) {
  const e = t.parentNode;
  return e ? Array.from(e.children).filter((n) => n instanceof HTMLElement && n !== t && n.matches(vb) && (n.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
function ek({
  open: t,
  onClose: e,
  title: n,
  icon: r,
  width: i,
  footer: o,
  children: s,
  onReset: a,
  morph: l = !0,
  flat: c = !1,
  closable: u = !0,
  dismissOnBackdrop: d = !0,
  theme: f,
  surface: h,
  accent: p
}) {
  const g = vr(), y = $f(
    { mode: f, accent: p, surface: h, context: "surface" },
    g
  ), m = y.mode, b = y.surface, C = y.accent, I = G(null), v = G(null), T = G(null), D = mn(), P = Me(20, 24, D), S = Me(10, 12, D), z = Me(12, 14, D), k = Me(14, 16, D), x = Me(20, 24, D), M = Me(20, 24, D), _ = Me(20, 24, D), E = Me(14, 16, D), O = Me(16, 20, D), L = Me(10, 12, D), W = Me(12, 14, D), re = Me(8, 10, D), F = Me(4, 6, D), N = { padding: `${S}px ${P}px` }, te = { fontSize: z }, Y = { padding: `${M}px ${x}px 16px ${x}px` }, j = { fontSize: k }, ee = { padding: `0 ${x}px 16px` }, H = { padding: `${_}px ${x}px` }, Z = { fontSize: L, padding: `${F}px ${re}px` }, [J, V] = Xe(!1), K = Le((Q) => {
    I.current = Q, V(Q !== null);
  }, []), le = oo(), ue = Ls(), ke = G(ue);
  ke.current = ue;
  const [we, He] = Xe(null), nt = G(null), bt = G(!1), gt = G(!1), ne = G(0), Ne = G({ w: 0, h: 0 }), Ae = G(!1), [Ke, $e] = Xe(!1), [Oe, et] = Xe(!1), ht = G(0), Se = G(!1), [Ze, Ct] = Xe(!1), wt = G(l);
  wt.current = l;
  const Ve = G(!1), Et = G(!1), pt = () => {
    Et.current = !0, $e(!0);
  }, mt = () => {
    Et.current = !1, $e(!1);
  };
  Ye(() => {
    t || (He(null), Ae.current = !1, bt.current = !1, et(!1));
  }, [t]), Nn(() => {
    if (!t || Ae.current || !J || !I.current) return;
    Ae.current = !0;
    const Q = I.current.getBoundingClientRect(), xe = ke.current ?? null, Ie = (xe == null ? void 0 : xe.innerWidth) ?? 0, Je = Si(xe);
    He({
      left: Math.max(ln, Math.min((Ie - Q.width) / 2, Ie - Q.width - ln)),
      top: Math.max(Je.top + ln, Math.min(Je.top + (Je.height - Q.height) / 2, Je.bottom - Q.height - ln))
    });
  }, [t, J]), Nn(() => {
    if (!t || !J || !l || So() || !I.current) return;
    const Q = I.current, xe = Kl(Q), Ie = xe[xe.length - 1];
    pt(), Ie ? up(ht, Q, Ie.getBoundingClientRect(), mt) : Qx(ht, Q, mt);
  }, [t, J]);
  const zt = Le(() => {
    if (!u || Se.current) return;
    const Q = I.current, xe = !!Q && Kl(Q).length > 0;
    if (!Q || !l || So() || xe) {
      e();
      return;
    }
    Se.current = !0, Ct(!0), Ve.current = !0, pt(), dp(ht, Q, () => {
      Se.current = !1, Ct(!1), mt(), e();
    });
  }, [l, e, u]), Bt = Le(() => {
    const Q = I.current;
    if (!Q || Ve.current || !wt.current || So() || Kl(Q).length > 0) return;
    const xe = Q.ownerDocument, Ie = Q.cloneNode(!0);
    Ie.removeAttribute("data-modal-stack"), Ie.removeAttribute("data-state"), Ie.removeAttribute("role"), Ie.removeAttribute("data-aria-hidden"), Ie.removeAttribute("tabindex"), Ie.setAttribute("aria-hidden", "true"), Ie.style.pointerEvents = "none", xe.body.appendChild(Ie), dp({ current: 0 }, Ie, () => {
      Ie.isConnected && Ie.remove();
    });
  }, []);
  Nn(() => () => Bt(), [Bt]);
  const nn = G(t);
  Nn(() => {
    const Q = nn.current;
    nn.current = t, Q && !t && Bt();
  }, [t, J, Bt]), Ye(() => {
    if (!t || !J || !l || !I.current) return;
    const Q = I.current, xe = Q.parentNode;
    if (!xe) return;
    let Ie = 0, Je = null, ft = !1;
    const Dt = () => {
      Ie = 0;
      const Rt = la(Q);
      if (Rt.length > 0)
        Q.style.opacity = "", Q.style.pointerEvents = "", Je = Rt[Rt.length - 1].getBoundingClientRect(), ft = !0, Ie = requestAnimationFrame(Dt);
      else if (ft) {
        ft = !1, Je && !So() && (pt(), up(ht, Q, Je, mt)), Je = null;
        const It = ke.current ?? null;
        It == null || It.setTimeout(() => {
          !Q || !Q.isConnected || getComputedStyle(Q).opacity !== "1" && (Q.style.opacity = "1", Q.style.pointerEvents = "");
        }, 240);
      }
    }, ot = new MutationObserver(() => {
      !Ie && la(Q).length > 0 && (Ie = requestAnimationFrame(Dt));
    });
    return ot.observe(xe, { childList: !0 }), () => {
      ot.disconnect(), Ie && cancelAnimationFrame(Ie);
    };
  }, [t, J]), Ye(() => {
    if (!J || !l || So() || !I.current) return;
    const Q = I.current;
    let xe = Math.round(Q.getBoundingClientRect().height), Ie = !1;
    const Je = new ResizeObserver(() => {
      if (!Q.isConnected) return;
      const ft = Math.round(Q.getBoundingClientRect().height);
      if (!Ie) {
        Ie = !0, xe = ft;
        return;
      }
      if (Math.abs(ft - xe) < 1) return;
      if (nt.current || Se.current || la(Q).length > 0) {
        xe = ft;
        return;
      }
      if (Et.current) return;
      const Dt = xe;
      xe = ft, pt();
      const ot = Q.getBoundingClientRect(), Rt = Si(ke.current ?? null), It = !bt.current && !gt.current, Tt = It ? Rt.top + (Rt.height - Dt) / 2 : ot.top, rn = It ? Rt.top + (Rt.height - ft) / 2 : ot.top;
      Q.style.transition = "none", Q.style.height = `${Dt}px`, It && (Q.style.top = `${Tt}px`), v.current && (v.current.style.overflow = "hidden"), Q.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          Q.style.height === `${Dt}px` && (Q.style.transition = `height ${ci}ms ${Ts}${It ? `, top ${ci}ms ${Ts}` : ""}`, Q.style.height = `${ft}px`, It && (Q.style.top = `${rn}px`), window.setTimeout(() => {
            Q.style.height === `${ft}px` && (Q.style.transition = "", Q.style.height = "", v.current && (v.current.style.overflow = ""), It && He({ left: ot.left, top: rn }), mt());
          }, ci + 60));
        });
      });
    });
    return Je.observe(Q), () => Je.disconnect();
  }, [J]), Ye(() => {
    if (!J || !I.current || l && !So()) return;
    const Q = I.current, xe = new ResizeObserver(() => {
      if (!Q.isConnected || nt.current || Se.current || gt.current || la(Q).length > 0) return;
      const Ie = ke.current ?? null, Je = Si(Ie), ft = (Ie == null ? void 0 : Ie.innerWidth) ?? 0, Dt = Q.getBoundingClientRect(), ot = Math.max(Je.top + ln, Math.min(Dt.top, Je.bottom - Dt.height - ln)), Rt = Math.max(ln, Math.min(Dt.left, ft - Dt.width - ln));
      (Math.abs(ot - Dt.top) > 0.5 || Math.abs(Rt - Dt.left) > 0.5) && He({ left: Rt, top: ot });
    });
    return xe.observe(Q), () => xe.disconnect();
  }, [J, l]);
  const vt = Le(() => {
    const Q = I.current;
    if (!Q) return null;
    const xe = Q.getBoundingClientRect();
    return { left: xe.left, top: xe.top, width: xe.width, height: xe.height };
  }, []), he = Le((Q, xe) => {
    const Ie = ke.current ?? null, Je = (Ie == null ? void 0 : Ie.innerWidth) ?? 0, ft = Si(Ie), Dt = vt(), ot = Dt ? Dt.width : Math.min(Je - ln * 2, 576), Rt = Dt ? Dt.height : Math.min(ft.height - ln * 2, 400);
    return {
      left: Math.max(ln, Math.min(Q, Je - ot - ln)),
      top: Math.max(ft.top + ln, Math.min(xe, ft.bottom - Rt - ln))
    };
  }, [vt]);
  Ye(() => {
    if (!t) return;
    const Q = ke.current ?? null, xe = (Q == null ? void 0 : Q.visualViewport) ?? null;
    if (!Q || !xe) return;
    const Ie = 120;
    gt.current = !1, Ne.current = { w: Q.innerWidth, h: Q.innerHeight };
    let Je = 0;
    const ft = () => {
      if (Se.current || nt.current) return;
      const ot = (Q == null ? void 0 : Q.innerHeight) ?? 0, Rt = (Q == null ? void 0 : Q.innerWidth) ?? 0, Tt = Si(Q).height < ot - Ie, rn = ot < Ne.current.h - Ie && Rt === Ne.current.w;
      Tt || rn ? (gt.current = !0, ne.current && (clearTimeout(ne.current), ne.current = 0)) : ne.current || (ne.current = (Q == null ? void 0 : Q.setTimeout(() => {
        gt.current = !1, ne.current = 0, et(!1);
      }, 600)) ?? 0), et(gt.current), !Je && (Je = requestAnimationFrame(() => {
        var bn;
        Je = 0;
        const xr = I.current;
        if (!xr) return;
        const qt = Si(ke.current ?? null), yn = xr.getBoundingClientRect(), On = ((bn = ke.current) == null ? void 0 : bn.innerWidth) ?? 0, Gn = (Q == null ? void 0 : Q.innerHeight) ?? 0, Vt = qt.height < Gn - Ie || Gn < Ne.current.h - Ie && (Q == null ? void 0 : Q.innerWidth) === Ne.current.w;
        Ne.current = { w: (Q == null ? void 0 : Q.innerWidth) ?? 0, h: Gn };
        const zn = yn.top >= qt.top + ln && yn.bottom <= qt.bottom - ln, ur = () => {
          He({
            left: Math.max(ln, Math.min((On - yn.width) / 2, On - yn.width - ln)),
            top: Math.max(qt.top + ln, Math.min(qt.top + (qt.height - yn.height) / 2, qt.bottom - yn.height - ln))
          });
        };
        if (Vt && !Pn) {
          if (bt.current) {
            zn || He(he(yn.left, yn.top));
            return;
          }
          if (zn) return;
          ur();
          return;
        }
        if (!gt.current) {
          if (bt.current) {
            zn || He(he(yn.left, yn.top));
            return;
          }
          zn || ur();
        }
      }));
    };
    xe.addEventListener("resize", ft), xe.addEventListener("scroll", ft);
    const Dt = () => {
      Se.current || nt.current || Je || (Je = requestAnimationFrame(() => {
        Je = 0;
        const ot = I.current;
        if (!ot) return;
        const Rt = ke.current ?? null, It = Si(Rt), Tt = (Rt == null ? void 0 : Rt.innerWidth) ?? 0, rn = ot.getBoundingClientRect();
        if (bt.current) {
          He(he(rn.left, rn.top));
          return;
        }
        He({
          left: Math.max(ln, Math.min((Tt - rn.width) / 2, Tt - rn.width - ln)),
          top: Math.max(It.top + ln, Math.min(It.top + (It.height - rn.height) / 2, It.bottom - rn.height - ln))
        });
      }));
    };
    return Q.addEventListener("orientationchange", Dt), () => {
      xe.removeEventListener("resize", ft), xe.removeEventListener("scroll", ft), Q.removeEventListener("orientationchange", Dt), Je && cancelAnimationFrame(Je), ne.current && clearTimeout(ne.current);
    };
  }, [t, he]);
  const ge = Le((Q) => {
    if (Q.target.closest("button")) return;
    bt.current = !0;
    const xe = vt();
    xe && (He(he(xe.left, xe.top)), nt.current = { startX: Q.clientX, startY: Q.clientY, posX: xe.left, posY: xe.top }, Q.target.setPointerCapture(Q.pointerId));
  }, [vt, he]), Ce = Le((Q) => {
    const xe = nt.current;
    xe && (Q.preventDefault(), He(he(xe.posX + Q.clientX - xe.startX, xe.posY + Q.clientY - xe.startY)));
  }, [he]), Re = Le(() => {
    nt.current = null;
  }, []), Pe = nt.current !== null, lt = Le(() => {
    bt.current = !1;
    const Q = ke.current ?? null, xe = Si(Q), Ie = (Q == null ? void 0 : Q.innerWidth) ?? 0, Je = I.current, ft = Je ? Je.getBoundingClientRect() : { width: 0, height: 0 };
    He({
      left: Math.max(ln, Math.min((Ie - ft.width) / 2, Ie - ft.width - ln)),
      top: Math.max(xe.top + ln, Math.min(xe.top + (xe.height - ft.height) / 2, xe.bottom - ft.height - ln))
    });
  }, []), ie = G(0), de = Le(() => {
    const Q = Date.now();
    Q - ie.current < 300 ? (ie.current = 0, lt()) : ie.current = Q;
  }, [lt]), _e = we !== null, Ue = _e ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", Mt = `${i ? `${i} w-full` : "max-w-xl w-full"}`, Gt = {
    ..._e ? { left: we.left, top: we.top } : {},
    width: `min(100%, calc(100dvw - ${ln * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...Oe ? {} : { maxHeight: `calc(100dvh - ${ln * 2}px)` }
  }, it = Le((Q) => {
    if (Q.key !== "Enter" || Q.shiftKey || Q.metaKey || Q.ctrlKey || Q.altKey) return;
    const xe = Q.target, Ie = T.current;
    if (!(!!xe.closest("[data-modal-close]") || !!Ie && Ie.contains(xe) && !!xe.closest('button, a, [role="button"]')) && xe.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !Ie) return;
    const ft = Array.from(Ie.querySelectorAll("button[data-modal-confirm]")), Dt = ft.length > 0 ? ft : Array.from(Ie.querySelectorAll("button")), ot = Dt[Dt.length - 1];
    !ot || ot.disabled || (Q.preventDefault(), ot.click());
  }, []);
  return /* @__PURE__ */ A(Ff, { theme: y, children: /* @__PURE__ */ A(ki.Root, { open: t, onOpenChange: (Q) => {
    Q || zt();
  }, children: /* @__PURE__ */ pe(ki.Portal, { container: le ?? void 0, children: [
    /* @__PURE__ */ A(
      ki.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${Ze ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (Q) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (Q.preventDefault(), d && zt());
        }
      }
    ),
    /* @__PURE__ */ pe(
      ki.Content,
      {
        ref: K,
        onKeyDown: it,
        onInteractOutside: (Q) => {
          d || Q.preventDefault();
        },
        "data-modal-stack": !0,
        "data-mode": m,
        "data-accent": C,
        "data-surface": b,
        className: `ui-modal fixed z-[10000] bg-[var(--ui-modal-bg)] border border-[color:var(--ui-modal-border)] rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${Ue} ${Mt}`,
        style: { touchAction: "manipulation", colorScheme: m, ...Object.keys(Gt).length > 0 ? Gt : {} },
        children: [
          c ? /* @__PURE__ */ pe(
            "div",
            {
              style: Y,
              className: `flex items-center justify-between ${Pe ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (Q) => {
                Ke || ge(Q);
              },
              onPointerMove: Ce,
              onPointerUp: Re,
              onClick: de,
              children: [
                /* @__PURE__ */ A(ki.Title, { style: j, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: n }),
                u && /* @__PURE__ */ A(ki.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ A(eo, { style: { width: O, height: O } }) })
              ]
            }
          ) : /* @__PURE__ */ pe(
            "div",
            {
              style: N,
              className: `ui-modal-header flex items-center justify-between border-b border-[color:var(--ui-modal-header-border)] shrink-0 bg-[var(--ui-modal-header-bg)] ${Pe ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (Q) => {
                Ke || ge(Q);
              },
              onPointerMove: Ce,
              onPointerUp: Re,
              onClick: de,
              children: [
                /* @__PURE__ */ pe("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ A("span", { className: "text-[color:var(--ui-modal-icon)] shrink-0", children: r }),
                  /* @__PURE__ */ A(ki.Title, { style: te, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: n })
                ] }),
                /* @__PURE__ */ pe("div", { className: "flex items-center gap-2", children: [
                  a && /* @__PURE__ */ pe("button", { onClick: a, style: Z, className: "cursor-pointer flex items-center gap-1 text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-muted-hover)] transition-colors bg-[var(--ui-modal-control-bg)] hover:bg-[var(--ui-modal-control-hover-bg)] rounded shrink-0", children: [
                    /* @__PURE__ */ A(Uy, { style: { width: W, height: W } }),
                    "Reset"
                  ] }),
                  u && /* @__PURE__ */ A(ki.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ A(eo, { style: { width: E, height: E } }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ A("div", { ref: v, "data-testid": "modal-body", style: c ? ee : void 0, className: "overflow-y-auto flex-1 bg-[var(--ui-modal-body-bg)] text-[color:var(--ui-modal-body-text)]", children: s }),
          o && /* @__PURE__ */ A("div", { ref: T, style: c ? H : void 0, className: c ? "" : "shrink-0", children: c ? /* @__PURE__ */ A("div", { className: "flex items-center justify-end gap-2", children: o }) : o })
        ]
      }
    )
  ] }) }) });
}
function e3({ children: t }) {
  const e = mn(), n = Me(20, 24, e), r = Me(8, 12, e);
  return /* @__PURE__ */ A("div", { className: "flex items-center justify-end gap-3 border-t border-[color:var(--ui-modal-border)] bg-[var(--ui-modal-footer-bg)]", style: { padding: `${r}px ${n}px` }, children: t });
}
const tk = "inline-flex items-center gap-2 rounded-lg text-xs transition cursor-pointer select-none whitespace-nowrap active:shadow-[inset_0_0_0_2px_var(--ui-panel-bg)]", nk = {
  zinc: "bg-[var(--ui-footer-hero-bg)] text-[color:var(--ui-footer-hero-text)] font-semibold border border-[color:var(--ui-footer-hero-border)] hover:bg-[var(--ui-footer-hero-hover-bg)] hover:border-[color:var(--ui-footer-hero-hover-border)] disabled:opacity-40 disabled:cursor-not-allowed",
  accent: "bg-[var(--ui-accent-solid)] text-[color:var(--ui-accent-action-text)] font-semibold border border-transparent hover:bg-[var(--ui-accent-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed",
  danger: "bg-[var(--ui-danger-solid)] text-white font-semibold border border-[color:var(--ui-danger-solid)] hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
}, rk = {
  /* Transparent border on every variant — auto-height buttons add the border
     to their height, so the bordered hero would otherwise be 2px taller. */
  ghost: "border border-transparent text-[color:var(--ui-text-muted)] font-medium hover:bg-[var(--ui-footer-ghost-hover-bg)] hover:text-[color:var(--ui-text-strong)] disabled:opacity-50",
  danger: "border border-transparent text-[color:var(--ui-danger-text)] font-medium hover:bg-[var(--ui-danger-hover-bg)] hover:text-[color:var(--ui-danger-hover-text)] disabled:opacity-50",
  "danger-solid": "border border-transparent bg-[var(--ui-danger-solid)] text-white font-semibold hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
};
function ca({
  variant: t = "hero",
  tone: e = "zinc",
  className: n = "",
  type: r = "button",
  ...i
}) {
  const o = _i({ px: 24, py: 8, fs: 12 }, { px: 28, py: 10, fs: 14 });
  return /* @__PURE__ */ A(
    "button",
    {
      type: r,
      style: o,
      className: `${tk} ${t === "hero" ? nk[e] : rk[t]} ${n}`,
      ...i
    }
  );
}
function Ha(t = "md") {
  const e = Pn && Vy() > 0;
  return t === "sm" ? `${e ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"} ui-input` : `${e ? "px-4 py-3 text-sm" : "px-3 py-1.5 text-xs"} ui-input`;
}
function xb(t = "md") {
  return t === "sm" ? _i({ px: 8, py: 6, fs: 12 }, { px: 12, py: 8, fs: 14 }) : _i({ px: 10, py: 5, fs: 12 }, { px: 14, py: 9, fs: 14 });
}
const kb = ti(null);
function t3() {
  const t = ni(kb);
  if (!t) throw new Error("useDialog must be used within DialogProvider");
  return t;
}
function n3({ children: t, theme: e, accent: n, surface: r }) {
  const [i, o] = Xe(null), [s, a] = Xe(!1), l = G(null), c = mn(), u = Me(16, 20, c), d = Me(12, 14, c), f = xb(), h = G(i);
  h.current = i;
  const p = Le(() => {
    const v = h.current;
    v && (v.kind === "confirm" ? v.resolve(!1) : v.kind === "prompt" ? v.resolve(null) : v.resolve());
  }, []), g = Le((v) => {
    if (v.suppressKey) {
      const T = localStorage.getItem(v.suppressKey);
      if (T && Date.now() < parseInt(T, 10))
        return Promise.resolve(!0);
    }
    return new Promise((T) => {
      p(), a(!1), o({ kind: "confirm", options: v, resolve: T });
    });
  }, [p]), y = Le((v) => new Promise((T) => {
    p(), o({ kind: "prompt", options: v, resolve: T });
  }), [p]), m = Le((v) => new Promise((T) => {
    p(), o({ kind: "alert", options: v, resolve: T });
  }), [p]);
  Ye(() => {
    if (i) {
      const v = setTimeout(() => {
        var T;
        return (T = l.current) == null ? void 0 : T.focus();
      }, 50);
      return () => clearTimeout(v);
    }
  }, [i]);
  const b = Le(() => {
    var v, T;
    if (i) {
      if (i.kind === "confirm") {
        const D = i.options;
        D.suppressKey && s && localStorage.setItem(D.suppressKey, String(Date.now() + 864e5)), i.resolve(!0);
      } else i.kind === "prompt" ? i.resolve(((T = (v = l.current) == null ? void 0 : v.value) == null ? void 0 : T.trim()) || null) : i.resolve();
      o(null);
    }
  }, [i, s]), C = i !== null;
  Ye(() => {
    if (!C) return;
    const v = (T) => {
      T.key !== "Enter" || T.shiftKey || T.metaKey || T.ctrlKey || T.altKey || T.isComposing || (T.preventDefault(), T.stopImmediatePropagation(), b());
    };
    return document.addEventListener("keydown", v, !0), () => document.removeEventListener("keydown", v, !0);
  }, [C, b]);
  const I = Le(() => {
    i && (i.kind === "confirm" ? i.resolve(!1) : i.kind === "prompt" ? i.resolve(null) : i.resolve(), o(null));
  }, [i]);
  return /* @__PURE__ */ pe(kb.Provider, { value: { confirm: g, prompt: y, alert: m }, children: [
    t,
    C && /* @__PURE__ */ A(
      ek,
      {
        open: !0,
        onClose: I,
        closable: (i == null ? void 0 : i.kind) !== "alert",
        dismissOnBackdrop: (i == null ? void 0 : i.kind) !== "alert",
        title: (i == null ? void 0 : i.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: i && /* @__PURE__ */ pe(Dn, { children: [
          i.kind !== "alert" && /* @__PURE__ */ A(ca, { variant: "ghost", onClick: I, children: "Cancel" }),
          i.kind === "alert" ? /* @__PURE__ */ A(ca, { onClick: b, children: "OK" }) : i.kind === "confirm" ? /* @__PURE__ */ A(
            ca,
            {
              "data-modal-confirm": !0,
              variant: i.options.danger ? "danger-solid" : "hero",
              onClick: b,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ A(ca, { "data-modal-confirm": !0, onClick: b, children: "Save" })
        ] }),
        children: /* @__PURE__ */ pe("div", { className: "flex flex-col", style: { gap: u }, children: [
          (i == null ? void 0 : i.options.message) && /* @__PURE__ */ A("p", { style: { fontSize: d }, className: "text-[color:var(--ui-text-muted)] leading-relaxed", children: i.options.message }),
          (i == null ? void 0 : i.kind) === "confirm" && i.options.suppressKey && /* @__PURE__ */ A(
            $x,
            {
              block: !0,
              checked: s,
              onChange: a,
              tone: "danger",
              label: "Don't ask again (24 hours)"
            }
          ),
          (i == null ? void 0 : i.kind) === "prompt" && /* @__PURE__ */ A(
            "input",
            {
              ref: l,
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
const ik = 500, ok = 250, sk = 5, Tr = 88, fp = 4;
function ak(t, e) {
  const n = t.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  n.style.strokeDasharray = String(r), n.style.strokeDashoffset = String(r);
  const i = performance.now(), o = (s) => {
    const a = s - i, l = Math.min(a / e, 1);
    n.style.strokeDashoffset = String(r * (1 - l)), l < 1 && requestAnimationFrame(o);
  };
  requestAnimationFrame(o);
}
function lk({ x: t, y: e, ms: n }) {
  const r = G(null), i = oo();
  return Ye(() => {
    r.current && ak(r.current, n);
  }, [n]), sl(
    /* @__PURE__ */ A(
      "div",
      {
        style: {
          position: "fixed",
          left: t - Tr / 2,
          top: e - Tr / 2,
          width: Tr,
          height: Tr,
          zIndex: 99999,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ pe("svg", { ref: r, width: Tr, height: Tr, viewBox: `0 0 ${Tr} ${Tr}`, children: [
          /* @__PURE__ */ A(
            "circle",
            {
              cx: Tr / 2,
              cy: Tr / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: fp + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ A(
            "circle",
            {
              cx: Tr / 2,
              cy: Tr / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: fp,
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
function r3() {
  return { "data-no-longpress": "true" };
}
function ck(t) {
  const e = t.tagName;
  return !!(e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || e === "BUTTON" || t.isContentEditable || t.closest("[data-no-longpress]") || t.closest("button, input, select, textarea"));
}
function i3({
  children: t,
  showRing: e = !0,
  longPressMs: n = ik,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: i,
  onLongPress: o
}) {
  const [s, a] = Xe(null), l = zs(), c = G(null), u = G(null), d = G({ x: 0, y: 0, target: null }), f = G(!1), h = Math.min(ok, n * 0.5), p = G(i);
  p.current = i;
  const g = G(o);
  return g.current = o, Ye(() => {
    if (!Pn || !l) return;
    const y = (I) => {
      if (!ff(I.pointerType) || I.button !== 0) return;
      const v = I.target;
      if (!v.closest(r) || (p.current ? !p.current(v) : ck(v))) return;
      const T = I.clientX, D = I.clientY;
      d.current = { x: T, y: D, target: I.target }, f.current = !0, e && (u.current = setTimeout(() => a({ x: T, y: D }), h)), c.current = setTimeout(() => {
        if (!f.current) return;
        u.current && (clearTimeout(u.current), u.current = null), a(null);
        const P = d.current.target;
        if (!P) return;
        const S = g.current;
        if (S) {
          S(P, T, D);
          return;
        }
        const z = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: T,
          clientY: D,
          button: 2,
          view: window
        });
        P.dispatchEvent(z);
      }, n);
    }, m = (I) => {
      if (!f.current || c.current === null) return;
      const v = I.clientX - d.current.x, T = I.clientY - d.current.y;
      Math.sqrt(v * v + T * T) > sk && (clearTimeout(c.current), c.current = null, u.current && (clearTimeout(u.current), u.current = null), f.current = !1, a(null));
    }, b = () => {
      c.current !== null && (clearTimeout(c.current), c.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, a(null);
    }, C = (I) => {
      ff(I.pointerType) && (c.current !== null && (clearTimeout(c.current), c.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, a(null));
    };
    return l == null || l.addEventListener("pointerdown", y), l.addEventListener("pointermove", m), l.addEventListener("pointerup", b), l.addEventListener("pointercancel", b), l.addEventListener("pointerleave", C), () => {
      l.removeEventListener("pointerdown", y), l.removeEventListener("pointermove", m), l.removeEventListener("pointerup", b), l == null || l.removeEventListener("pointercancel", b), l == null || l.removeEventListener("pointerleave", C), c.current !== null && clearTimeout(c.current), u.current !== null && clearTimeout(u.current);
    };
  }, [e, n, h, r]), /* @__PURE__ */ pe(Dn, { children: [
    t,
    e && s && /* @__PURE__ */ A(lk, { x: s.x, y: s.y, ms: n - h })
  ] });
}
function o3() {
  const t = Rx();
  return Cx ? t === null || ff(t) : !1;
}
const uk = {
  border: "1px solid #d4d4d8",
  background: "rgba(255,255,255,0.94)",
  color: "#52525b",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
}, dk = {
  border: "2px solid #2563eb",
  background: "#2563eb",
  color: "#fff",
  boxShadow: "0 4px 16px rgba(37,99,235,0.4)"
}, fk = {
  border: "1px solid #f59e0b",
  background: "rgba(255, 251, 235, 0.94)",
  color: "#b45309",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
};
function s3({
  active: t = !1,
  warn: e = !1,
  style: n,
  className: r = "",
  type: i = "button",
  children: o,
  ...s
}) {
  return /* @__PURE__ */ A(
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
        ...e ? fk : t ? dk : uk,
        ...n
      },
      ...s,
      children: o
    }
  );
}
const hk = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], pk = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Ul = 1900, Gl = 2100;
function gk(t, e) {
  return new Date(t, e + 1, 0).getDate();
}
function mk(t, e, n) {
  return `${t}-${String(e + 1).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
}
function a3({ selected: t, onChange: e, theme: n, showChips: r = !0, className: i = "", initialView: o }) {
  const s = vr(), a = n ?? (s == null ? void 0 : s.mode) ?? "light", l = /* @__PURE__ */ new Date(), c = (() => {
    if (!o) return l;
    const K = /* @__PURE__ */ new Date(o + "T00:00:00");
    return isNaN(K.getTime()) ? l : K;
  })(), [u, d] = Xe(c.getFullYear()), [f, h] = Xe(c.getMonth()), [p, g] = Xe("days"), [y, m] = Xe(null), b = gn(() => new Set(t), [t]), C = (K) => {
    b.has(K) ? e(t.filter((le) => le !== K)) : e([...t, K]);
  }, I = gn(() => {
    const K = gk(u, f), le = new Date(u, f, 1).getDay(), ue = [];
    for (let ke = 0; ke < le; ke++) ue.push({ key: `pad-${ke}`, day: 0, empty: !0 });
    for (let ke = 1; ke <= K; ke++) ue.push({ key: mk(u, f, ke), day: ke, empty: !1 });
    return ue;
  }, [u, f]), v = (K) => d((le) => Math.max(Ul, Math.min(Gl, le + K))), T = (K) => {
    f + K < 0 ? (d((le) => Math.max(Ul, le - 1)), h(11)) : f + K > 11 ? (d((le) => Math.min(Gl, le + 1)), h(0)) : h((le) => le + K);
  }, D = () => {
    if (y === null) return;
    const K = parseInt(y, 10);
    !isNaN(K) && K >= Ul && K <= Gl && d(K), m(null);
  }, P = (K) => t.some((le) => le.startsWith(`${u}-${String(K + 1).padStart(2, "0")}`)), S = mn(), z = Me(4, 8, S), k = Me(16, 20, S), x = Me(10, 11, S), M = Me(6, 8, S), _ = Me(12, 14, S), E = Me(6, 10, S), O = Me(12, 14, S), L = Me(8, 12, S), W = Me(10, 12, S), re = Me(6, 10, S), F = Me(2, 6, S), N = Me(64, 80, S), te = { padding: z }, Y = { width: k, height: k }, j = { fontSize: x, paddingTop: M, paddingBottom: M }, ee = { fontSize: _, paddingTop: E, paddingBottom: E }, H = { fontSize: O, paddingTop: L, paddingBottom: L }, Z = { fontSize: W, padding: `${F}px ${re}px` }, J = "bg-[var(--ui-date-selected-bg)] text-[color:var(--ui-date-selected-text)] hover:bg-[var(--ui-date-selected-hover-bg)]", V = "text-[color:var(--ui-text)] hover:bg-[var(--ui-card-hover)]";
  return /* @__PURE__ */ pe("div", { "data-mode": a, "data-accent": s == null ? void 0 : s.accent, "data-surface": s == null ? void 0 : s.surface, className: `border rounded-lg overflow-hidden w-full border-[color:var(--ui-border-strong)] bg-[var(--ui-date-body-bg)] text-[color:var(--ui-text)] ${i}`, children: [
    /* @__PURE__ */ pe("div", { className: "flex items-center justify-between px-3 py-2 border-b bg-[var(--ui-date-header-bg)] text-[color:var(--ui-date-header-text)] border-[color:var(--ui-border)]", children: [
      /* @__PURE__ */ A(
        "button",
        {
          type: "button",
          onClick: () => p === "months" ? v(-1) : T(-1),
          style: te,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": p === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ A(Ww, { style: Y })
        }
      ),
      p === "days" ? /* @__PURE__ */ A(
        "button",
        {
          type: "button",
          onClick: () => g("months"),
          "aria-label": "Select year and month",
          className: "text-sm font-semibold rounded px-2 py-0.5 transition-colors text-[color:var(--ui-date-header-text)] hover:bg-[var(--ui-date-header-hover)]",
          children: new Date(u, f).toLocaleString("default", { month: "long", year: "numeric" })
        }
      ) : /* @__PURE__ */ A(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          "aria-label": "Year",
          value: y ?? String(u),
          onChange: (K) => m(K.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: (K) => K.target.select(),
          onBlur: D,
          onKeyDown: (K) => {
            K.key === "Enter" && (K.preventDefault(), D()), K.key === "Escape" && m(null);
          },
          style: { width: N },
          className: "text-sm text-center font-semibold rounded outline-none py-0.5 bg-[var(--ui-date-header-hover)] text-[color:var(--ui-date-header-text)]"
        }
      ),
      /* @__PURE__ */ A(
        "button",
        {
          type: "button",
          onClick: () => p === "months" ? v(1) : T(1),
          style: te,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": p === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ A(La, { style: Y })
        }
      )
    ] }),
    p === "months" ? /* @__PURE__ */ pe("div", { children: [
      /* @__PURE__ */ A("div", { className: "grid grid-cols-3 text-center", children: pk.map((K, le) => /* @__PURE__ */ pe(
        "button",
        {
          type: "button",
          onClick: () => {
            h(le), g("days");
          },
          style: H,
          className: `relative font-medium transition-colors border-b border-[color:var(--ui-border)] ${le === f ? J : V}`,
          children: [
            K,
            P(le) && /* @__PURE__ */ A("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${le === f ? "bg-[var(--ui-date-selected-text)]" : "bg-[var(--ui-accent-solid)]"}` })
          ]
        },
        K
      )) }),
      /* @__PURE__ */ A("div", { className: "text-center border-t border-[color:var(--ui-border)]", children: /* @__PURE__ */ A(
        "button",
        {
          type: "button",
          onClick: () => {
            d(l.getFullYear()), h(l.getMonth()), g("days");
          },
          style: { paddingTop: E, paddingBottom: E, fontSize: _ },
          className: "px-3 font-semibold rounded transition-colors text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-card-hover)]",
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ pe("div", { className: "grid grid-cols-7 text-center", children: [
      hk.map((K) => /* @__PURE__ */ A("div", { style: j, className: "font-semibold uppercase tracking-wider border-b text-[color:var(--ui-text-faint)] border-[color:var(--ui-border)]", children: K }, K)),
      I.map((K) => K.empty ? /* @__PURE__ */ A("div", {}, K.key) : /* @__PURE__ */ A(
        "button",
        {
          type: "button",
          onClick: () => C(K.key),
          style: ee,
          className: `font-medium transition-colors border-b border-[color:var(--ui-border)] ${b.has(K.key) ? J : V}`,
          children: K.day
        },
        K.key
      ))
    ] }),
    r && t.length > 0 && /* @__PURE__ */ pe("div", { className: "px-3 py-2 border-t border-[color:var(--ui-border)] bg-[var(--ui-date-footer-bg)]", children: [
      /* @__PURE__ */ pe("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-[color:var(--ui-text-muted)]", children: [
        t.length,
        " date",
        t.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ A("div", { className: "flex flex-wrap gap-1", children: t.map((K) => {
        const le = /* @__PURE__ */ new Date(K + "T00:00:00"), ue = le.getFullYear() === l.getFullYear() ? le.toLocaleString("default", { month: "short", day: "numeric" }) : le.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ pe(
          "button",
          {
            type: "button",
            onClick: () => C(K),
            "aria-label": `Remove ${ue}`,
            style: Z,
            className: "inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors bg-[var(--ui-date-chip-bg)] text-[color:var(--ui-date-chip-text)] hover:bg-[var(--ui-date-chip-hover-bg)]",
            children: [
              ue,
              /* @__PURE__ */ A("span", { className: "leading-none text-[color:var(--ui-text-muted)]", "aria-hidden": "true", children: "×" })
            ]
          },
          K
        );
      }) })
    ] })
  ] });
}
function l3({
  items: t,
  selected: e,
  onToggle: n,
  title: r,
  onToggleAll: i,
  allSelected: o = !1,
  toggleAllLabel: s,
  emptyHint: a = "Nothing here",
  maxHeight: l,
  disabled: c = !1,
  checkPosition: u = "leading",
  theme: d,
  className: f = ""
}) {
  const h = (I) => e instanceof Set ? e.has(I) : e.includes(I), p = mn(), g = Me(12, 16, p), y = Me(8, 12, p), m = Me(12, 14, p), b = Me(16, 20, p), C = r != null || i != null;
  return /* @__PURE__ */ pe("div", { className: f, ...d ? { "data-theme": d } : {}, children: [
    C && /* @__PURE__ */ pe("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ A("span", { className: "ui-checklist-title", children: r }),
      i != null && /* @__PURE__ */ A("button", { type: "button", disabled: c, onClick: i, className: "ui-checklist-toggleall", children: s ?? (o ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ pe(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${c ? "ui-checklist-disabled" : ""}`,
        style: l ? { maxHeight: l, overflowY: "auto" } : void 0,
        children: [
          t.map((I) => {
            const v = h(I.id), T = /* @__PURE__ */ A(Hf, { checked: v, size: b });
            return /* @__PURE__ */ pe(
              "button",
              {
                type: "button",
                disabled: c,
                onClick: () => n(I.id),
                "aria-pressed": v,
                className: `ui-checklist-item ${v ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${y}px ${g}px`, fontSize: m },
                ...I.dataProps,
                children: [
                  u === "leading" && T,
                  I.leading != null && /* @__PURE__ */ A("span", { className: "ui-checklist-leading", children: I.leading }),
                  /* @__PURE__ */ A("span", { className: "ui-checklist-label", children: I.label }),
                  I.secondary != null && /* @__PURE__ */ A("span", { className: "ui-checklist-secondary", children: I.secondary }),
                  u === "trailing" && /* @__PURE__ */ A("span", { className: "ml-auto flex shrink-0", children: T })
                ]
              },
              I.id
            );
          }),
          t.length === 0 && /* @__PURE__ */ A("div", { className: "ui-checklist-empty", children: a })
        ]
      }
    )
  ] });
}
function c3({
  items: t,
  value: e,
  onChange: n,
  title: r,
  emptyHint: i = "Nothing here",
  maxHeight: o,
  compact: s = !1,
  disabled: a = !1,
  theme: l,
  className: c = ""
}) {
  const u = mn(), d = s ? 10 : Me(12, 16, u), f = s ? 6 : Me(8, 12, u), h = s ? 12 : Me(12, 14, u), p = s ? 14 : Me(16, 20, u);
  return /* @__PURE__ */ pe("div", { className: c, ...l ? { "data-theme": l } : {}, children: [
    r != null && /* @__PURE__ */ A("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ A("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ pe(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${a ? "ui-checklist-disabled" : ""}`,
        style: o ? { maxHeight: o, overflowY: "auto" } : void 0,
        children: [
          t.map((g) => {
            const y = e === g.id;
            return /* @__PURE__ */ pe(
              "button",
              {
                type: "button",
                disabled: a,
                onClick: () => n(g.id),
                className: `ui-checklist-item ${y ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${f}px ${d}px`, fontSize: h },
                children: [
                  /* @__PURE__ */ A("span", { className: "ui-radio-circle", style: { width: p, height: p }, "aria-hidden": !0, children: y && /* @__PURE__ */ A("span", { className: "ui-radio-dot" }) }),
                  g.leading != null && /* @__PURE__ */ A("span", { className: "ui-checklist-leading", children: g.leading }),
                  /* @__PURE__ */ A("span", { className: "ui-checklist-label", children: g.label }),
                  g.secondary != null && /* @__PURE__ */ A("span", { className: "ui-checklist-secondary", children: g.secondary })
                ]
              },
              g.id
            );
          }),
          t.length === 0 && /* @__PURE__ */ A("div", { className: "ui-checklist-empty", children: i })
        ]
      }
    )
  ] });
}
const u3 = ({
  className: t,
  children: e,
  reference: n,
  placement: r = "top",
  anchorMode: i = "visible",
  offset: o = 8
}) => {
  const s = Ls(), { refs: a, floatingStyles: l } = rx({
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
          var b;
          if (i !== "visible") return {};
          const u = (b = c.elements.floating.ownerDocument) == null ? void 0 : b.defaultView;
          if (!u) return {};
          const d = c.rects.reference, f = Math.max(d.x, 0), h = Math.max(d.y, 0), p = Math.min(d.x + d.width, u.innerWidth), g = Math.min(d.y + d.height, u.innerHeight);
          if (p <= f || g <= h) return {};
          const y = r === "left" ? p - (d.x + d.width) : r === "right" ? f - d.x : 0, m = r === "top" ? h - d.y : r === "bottom" ? g - (d.y + d.height) : 0;
          return { x: c.x + y, y: c.y + m };
        }
      },
      Gy(o),
      Yy({ padding: 8 }),
      Xy({ padding: 8 }),
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
          const d = c.rects.floating.width, f = c.rects.floating.height, h = Math.max(8, Math.min(c.x, u.innerWidth - d - 8)), p = Math.max(8, Math.min(c.y, u.innerHeight - f - 8));
          return { x: h, y: p };
        }
      }
    ],
    whileElementsMounted: ix
  });
  return Nn(() => {
    n && a.setReference(n);
  }, [n, a]), /* @__PURE__ */ pe(Dn, { children: [
    !n && /* @__PURE__ */ A("div", { ref: a.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    s && sl(
      /* @__PURE__ */ A(
        "div",
        {
          ref: a.setFloating,
          className: `ui-chrome ${t}`,
          style: l,
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
function yk(t, e) {
  if (!e || !Pt.isValidElement(t)) return {};
  const n = t.props;
  if (n["aria-label"] || n.title) return {};
  const r = n.children;
  if (typeof r == "string" ? r.trim().length > 0 : Array.isArray(r) ? r.some((s) => typeof s == "string" && s.trim().length > 0) : !1) return {};
  const o = e.split(`
`)[0].replace(/^•\s*/, "").trim().slice(0, 80);
  return o ? { "aria-label": o } : {};
}
const Co = ({ content: t, children: e }) => {
  const n = vr(), r = mn(), i = Me(10, 12, r), o = Me(6, 6, r), s = Me(10, 12, r), a = { padding: `${o}px ${i}px`, fontSize: s }, l = oo(), c = Ls(), [u, d] = Xe(!1), [f, h] = Xe({ x: 0, y: 0 }), p = G(null), g = G(null), y = () => {
    if (!p.current) return;
    const C = p.current.getBoundingClientRect();
    h({ x: C.left + C.width / 2, y: C.top });
  };
  Ye(() => () => {
    g.current && clearTimeout(g.current);
  }, []), Ye(() => (u && c && (y(), c.addEventListener("scroll", y, !0)), () => c == null ? void 0 : c.removeEventListener("scroll", y, !0)), [u]);
  const m = yk(e, t), b = Object.keys(m).length > 0 ? Pt.cloneElement(e, m) : e;
  return /* @__PURE__ */ pe(
    "div",
    {
      ref: p,
      className: "inline-flex",
      onMouseEnter: () => {
        g.current && clearTimeout(g.current), y(), d(!0);
      },
      onMouseLeave: () => {
        g.current = setTimeout(() => d(!1), 60);
      },
      children: [
        b,
        u && sl(
          /* @__PURE__ */ pe(
            "div",
            {
              "data-mode": n == null ? void 0 : n.mode,
              "data-accent": n == null ? void 0 : n.accent,
              className: "ui-tooltip fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-[color:var(--ui-tooltip-border)] bg-[var(--ui-tooltip-bg)] text-[color:var(--ui-tooltip-text)] pointer-events-none",
              style: { ...a, left: f.x, top: f.y - 4, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                t.split(`
• `).map((C, I) => /* @__PURE__ */ A("div", { className: I > 0 ? "mt-0.5 pt-0.5 border-t border-[color:var(--ui-tooltip-sep)]" : "", children: C }, I)),
                /* @__PURE__ */ A("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[color:var(--ui-tooltip-bg)]" })
              ]
            }
          ),
          l ?? document.body
        )
      ]
    }
  );
}, bk = 250;
function vk(t, e, n) {
  const [r, i] = Pt.useState(null), [o, s] = Pt.useState(!1), a = Pt.useRef(null), l = Pt.useRef(n);
  l.current = n;
  const c = Pt.useCallback(() => {
    var f;
    const d = (f = e.current) == null ? void 0 : f[l.current];
    d && i({ left: d.offsetLeft, width: d.offsetWidth });
  }, [e]);
  Pt.useLayoutEffect(() => {
    c();
  }, [n, c]), Pt.useLayoutEffect(() => {
    const d = t.current;
    if (!d) return;
    const f = () => {
      s(!0), a.current && clearTimeout(a.current), a.current = setTimeout(() => s(!1), bk), c();
    }, h = new ResizeObserver(f);
    h.observe(d);
    for (const p of e.current ?? []) p && h.observe(p);
    return () => {
      h.disconnect(), a.current && (clearTimeout(a.current), a.current = null);
    };
  }, [t, e, c]);
  const u = Pt.useMemo(
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
function fl() {
  const t = mn(), e = Pn, n = e ? Me(28, 40, t) : 28, r = e ? Me(28, 40, t) : 28, i = e ? Me(10, 14, t) : 10, o = e ? Me(10, 14, t) : 10, s = e ? Me(8, 10, t) : 8;
  return {
    toggle: { width: n, height: n },
    control: { height: r, padding: `0 ${i}px`, fontSize: o },
    input: { height: r, padding: `0 ${s}px`, fontSize: o }
  };
}
const d3 = Pn ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", wk = Pn ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", ua = Pn ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", xk = "hover:bg-red-950/50", f3 = Pn ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", h3 = "bg-[var(--ui-accent-selected-bg)] border-[var(--ui-border-strong)] text-[color:var(--ui-accent-selected-text)]", p3 = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", kk = Pn ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", g3 = Pn ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50", Sb = Pn ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", Sk = "inline-flex rounded-[var(--ui-radius-btn)] overflow-hidden border border-[var(--ui-border-strong)]", Ck = Pn ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", da = ({ onClick: t, disabled: e, title: n, className: r = wk, children: i }) => {
  const o = fl();
  return /* @__PURE__ */ A(Co, { content: n, children: /* @__PURE__ */ A("button", { onClick: t, disabled: e, "aria-label": n, style: o.control, className: `${r} ${e ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) });
}, fa = {
  wrap: "border-[color:var(--ui-border-strong)] bg-[var(--ui-seg-track-bg)]",
  pill: "bg-[var(--ui-seg-pill)]",
  active: "text-[color:var(--ui-accent-pill-text)]",
  idle: "text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-seg-hover)]"
}, m3 = ({ value: t, options: e, onChange: n, disabled: r, active: i, stretch: o, dense: s, variant: a = "chrome", theme: l, tablist: c, iconCollapse: u = !1, iconWithLabel: d = !0, ariaLabel: f }) => {
  const h = vr(), p = l ?? _x(h), g = l === "blue" || l === "emerald" ? l : (h == null ? void 0 : h.accent) ?? "zinc", y = { "data-mode": p === "dark" ? "dark" : "light", "data-accent": g }, m = fl(), b = mn(), C = s && !Pn ? 24 : m.control.height, I = _i({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), v = Pn ? I : { padding: "0 12px", fontSize: 12, height: s ? 20 : 24 }, T = (k) => i ? i(k) : t === k, D = Pt.useRef(null), P = Pt.useRef([]), S = Math.max(0, e.findIndex((k) => T(k.v))), z = vk(D, P, S);
  return a === "track" ? /* @__PURE__ */ pe(
    "div",
    {
      ref: D,
      role: c ? "tablist" : "group",
      "aria-label": f,
      ...y,
      className: `relative inline-flex items-center rounded-[var(--ui-radius-btn)] border p-0.5 ${Pn ? "" : s ? "h-[26px]" : "h-[30px]"} ${o ? "w-full" : ""} ${fa.wrap}`,
      children: [
        z.style && /* @__PURE__ */ A(
          "span",
          {
            "aria-hidden": !0,
            className: `absolute rounded-[var(--ui-radius-inset)] ${fa.pill} ${z.motionClass}`,
            style: { ...z.style, top: 2, bottom: 2 }
          }
        ),
        e.map((k, x) => {
          const M = T(k.v), _ = u && !!k.icon;
          return /* @__PURE__ */ A(
            "button",
            {
              ref: (E) => {
                P.current[x] = E;
              },
              ...k.dataProps,
              type: "button",
              disabled: r,
              onClick: () => n(k.v),
              title: k.title,
              role: c ? "tab" : void 0,
              "aria-selected": c ? M : void 0,
              "aria-pressed": c ? void 0 : M,
              "aria-label": k.ariaLabel ?? (k.l ? void 0 : k.title),
              style: v,
              className: `relative z-10 inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-[var(--ui-radius-inset)] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${_ ? "group gap-0" : "gap-1.5"} ${o ? "flex-1" : ""} ${M ? fa.active : fa.idle}`,
              children: /* @__PURE__ */ A(
                db,
                {
                  icon: k.icon,
                  collapse: _,
                  iconWithLabel: d,
                  active: M,
                  gap: Me(6, 8, b),
                  children: k.l
                }
              )
            },
            k.v
          );
        })
      ]
    }
  ) : /* @__PURE__ */ pe("div", { ref: D, className: `relative ${Sk} bg-[var(--ui-seg-track-bg)]${o ? " w-full" : ""}`, children: [
    z.style && /* @__PURE__ */ A(
      "span",
      {
        "aria-hidden": !0,
        className: `absolute bg-[var(--ui-accent-pill-bg)] ${z.motionClass}`,
        style: { ...z.style, top: 0, bottom: 0 }
      }
    ),
    e.map((k, x) => {
      const M = T(k.v);
      return /* @__PURE__ */ pe(
        "button",
        {
          ref: (_) => {
            P.current[x] = _;
          },
          ...k.dataProps,
          disabled: r,
          onClick: () => n(k.v),
          title: k.title,
          style: { ...m.control, height: C },
          className: `relative z-10 font-medium transition-colors disabled:opacity-30 ${o ? "flex-1" : ""} ${M ? "text-[color:var(--ui-accent-pill-text)]" : "text-[color:var(--ui-text-muted)] hover:bg-[var(--ui-accent-hover-bg)]"} ${k.v !== e[e.length - 1].v ? "border-r border-[var(--ui-border)]" : ""}`,
          children: [
            k.icon,
            k.l
          ]
        },
        k.v
      );
    })
  ] });
}, y3 = ({ children: t }) => /* @__PURE__ */ pe("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ A("span", { className: Pn ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: t }),
  /* @__PURE__ */ A("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), Rk = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", Tk = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", b3 = ({ label: t, children: e, tall: n }) => /* @__PURE__ */ pe("div", { className: n ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  t && /* @__PURE__ */ A("span", { className: n ? Rk : Tk, children: t }),
  e
] }), v3 = ({ leading: t, trailing: e, className: n = "" }) => /* @__PURE__ */ pe("div", { className: `flex flex-wrap items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-0 ${n}`, children: [
  t,
  e && /* @__PURE__ */ A("div", { className: "ml-auto flex flex-wrap items-center justify-end gap-1", children: e })
] }), w3 = ({ readOnly: t, onDuplicate: e, onRemove: n, onMove: r, compact: i }) => (
  // One unbreakable cluster: when a header's trailing wraps, the move pair and
  // the duplicate/delete pair stay together (no orphaned icons on a line).
  /* @__PURE__ */ pe("div", { className: "flex items-center gap-1 shrink-0", children: [
    /* @__PURE__ */ A(da, { onClick: () => r(-1), disabled: t, title: "Move up", className: ua, children: /* @__PURE__ */ A(jw, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ A(da, { onClick: () => r(1), disabled: t, title: "Move down", className: ua, children: /* @__PURE__ */ A(Kw, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ A(da, { onClick: e, disabled: t, title: "Duplicate", className: ua, children: /* @__PURE__ */ A(Ky, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ A("div", { className: Sb }),
    /* @__PURE__ */ A(da, { onClick: n, disabled: t, title: "Delete", className: `${ua} ${xk}`, children: /* @__PURE__ */ A(za, { className: "w-2.5 h-2.5" }) })
  ] })
);
var hp = Object.defineProperty, Ek = (t, e) => {
  let n = {};
  for (var r in t) hp(n, r, {
    get: t[r],
    enumerable: !0
  });
  return hp(n, Symbol.toStringTag, { value: "Module" }), n;
};
function Un(t) {
  this.content = t;
}
Un.prototype = {
  constructor: Un,
  find: function(t) {
    for (var e = 0; e < this.content.length; e += 2)
      if (this.content[e] === t) return e;
    return -1;
  },
  // :: (string) → ?any
  // Retrieve the value stored under `key`, or return undefined when
  // no such key exists.
  get: function(t) {
    var e = this.find(t);
    return e == -1 ? void 0 : this.content[e + 1];
  },
  // :: (string, any, ?string) → OrderedMap
  // Create a new map by replacing the value of `key` with a new
  // value, or adding a binding to the end of the map. If `newKey` is
  // given, the key of the binding will be replaced with that key.
  update: function(t, e, n) {
    var r = n && n != t ? this.remove(n) : this, i = r.find(t), o = r.content.slice();
    return i == -1 ? o.push(n || t, e) : (o[i + 1] = e, n && (o[i] = n)), new Un(o);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(t) {
    var e = this.find(t);
    if (e == -1) return this;
    var n = this.content.slice();
    return n.splice(e, 2), new Un(n);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(t, e) {
    return new Un([t, e].concat(this.remove(t).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(t, e) {
    var n = this.remove(t).content.slice();
    return n.push(t, e), new Un(n);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(t, e, n) {
    var r = this.remove(e), i = r.content.slice(), o = r.find(t);
    return i.splice(o == -1 ? i.length : o, 0, e, n), new Un(i);
  },
  // :: ((key: string, value: any))
  // Call the given function for each key/value pair in the map, in
  // order.
  forEach: function(t) {
    for (var e = 0; e < this.content.length; e += 2)
      t(this.content[e], this.content[e + 1]);
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by prepending the keys in this map that don't
  // appear in `map` before the keys in `map`.
  prepend: function(t) {
    return t = Un.from(t), t.size ? new Un(t.content.concat(this.subtract(t).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(t) {
    return t = Un.from(t), t.size ? new Un(this.subtract(t).content.concat(t.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(t) {
    var e = this;
    t = Un.from(t);
    for (var n = 0; n < t.content.length; n += 2)
      e = e.remove(t.content[n]);
    return e;
  },
  // :: () → Object
  // Turn ordered map into a plain object.
  toObject: function() {
    var t = {};
    return this.forEach(function(e, n) {
      t[e] = n;
    }), t;
  },
  // :: number
  // The amount of keys in this map.
  get size() {
    return this.content.length >> 1;
  }
};
Un.from = function(t) {
  if (t instanceof Un) return t;
  var e = [];
  if (t) for (var n in t) e.push(n, t[n]);
  return new Un(e);
};
function Cb(t, e, n) {
  for (let r = 0; ; r++) {
    if (r == t.childCount || r == e.childCount)
      return t.childCount == e.childCount ? null : n;
    let i = t.child(r), o = e.child(r);
    if (i == o) {
      n += i.nodeSize;
      continue;
    }
    if (!i.sameMarkup(o))
      return n;
    if (i.isText && i.text != o.text) {
      let s = i.text, a = o.text, l = 0;
      for (; s[l] == a[l]; l++)
        n++;
      return l && l < s.length && l < a.length && Eb(s.charCodeAt(l - 1)) && Tb(s.charCodeAt(l)) && n--, n;
    }
    if (i.content.size || o.content.size) {
      let s = Cb(i.content, o.content, n + 1);
      if (s != null)
        return s;
    }
    n += i.nodeSize;
  }
}
function Rb(t, e, n, r) {
  for (let i = t.childCount, o = e.childCount; ; ) {
    if (i == 0 || o == 0)
      return i == o ? null : { a: n, b: r };
    let s = t.child(--i), a = e.child(--o), l = s.nodeSize;
    if (s == a) {
      n -= l, r -= l;
      continue;
    }
    if (!s.sameMarkup(a))
      return { a: n, b: r };
    if (s.isText && s.text != a.text) {
      let c = s.text, u = a.text, d = c.length, f = u.length;
      for (; d > 0 && f > 0 && c[d - 1] == u[f - 1]; )
        d--, f--, n--, r--;
      return d && f && d < c.length && Eb(c.charCodeAt(d - 1)) && Tb(c.charCodeAt(d)) && (n++, r++), { a: n, b: r };
    }
    if (s.content.size || a.content.size) {
      let c = Rb(s.content, a.content, n - 1, r - 1);
      if (c)
        return c;
    }
    n -= l, r -= l;
  }
}
function Tb(t) {
  return t >= 56320 && t < 57344;
}
function Eb(t) {
  return t >= 55296 && t < 56320;
}
class ze {
  /**
  @internal
  */
  constructor(e, n) {
    if (this.content = e, this.size = n || 0, n == null)
      for (let r = 0; r < e.length; r++)
        this.size += e[r].nodeSize;
  }
  /**
  Invoke a callback for all descendant nodes between the given two
  positions (relative to start of this fragment). Doesn't descend
  into a node when the callback returns `false`.
  */
  nodesBetween(e, n, r, i = 0, o) {
    for (let s = 0, a = 0; a < n; s++) {
      let l = this.content[s], c = a + l.nodeSize;
      if (c > e && r(l, i + a, o || null, s) !== !1 && l.content.size) {
        let u = a + 1;
        l.nodesBetween(Math.max(0, e - u), Math.min(l.content.size, n - u), r, i + u);
      }
      a = c;
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
  textBetween(e, n, r, i) {
    let o = "", s = !0;
    return this.nodesBetween(e, n, (a, l) => {
      let c = a.isText ? a.text.slice(Math.max(e, l) - l, n - l) : a.isLeaf ? i ? typeof i == "function" ? i(a) : i : a.type.spec.leafText ? a.type.spec.leafText(a) : "" : "";
      a.isBlock && (a.isLeaf && c || a.isTextblock) && r && (s ? s = !1 : o += r), o += c;
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
    let n = this.lastChild, r = e.firstChild, i = this.content.slice(), o = 0;
    for (n.isText && n.sameMarkup(r) && (i[i.length - 1] = n.withText(n.text + r.text), o = 1); o < e.content.length; o++)
      i.push(e.content[o]);
    return new ze(i, this.size + e.size);
  }
  /**
  Cut out the sub-fragment between the two given positions.
  */
  cut(e, n = this.size) {
    if (e == 0 && n == this.size)
      return this;
    let r = [], i = 0;
    if (n > e)
      for (let o = 0, s = 0; s < n; o++) {
        let a = this.content[o], l = s + a.nodeSize;
        l > e && ((s < e || l > n) && (a.isText ? a = a.cut(Math.max(0, e - s), Math.min(a.text.length, n - s)) : a = a.cut(Math.max(0, e - s - 1), Math.min(a.content.size, n - s - 1))), r.push(a), i += a.nodeSize), s = l;
      }
    return new ze(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, n) {
    return e == n ? ze.empty : e == 0 && n == this.content.length ? this : new ze(this.content.slice(e, n));
  }
  /**
  Create a new fragment in which the node at the given index is
  replaced by the given node.
  */
  replaceChild(e, n) {
    let r = this.content[e];
    if (r == n)
      return this;
    let i = this.content.slice(), o = this.size + n.nodeSize - r.nodeSize;
    return i[e] = n, new ze(i, o);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new ze([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new ze(this.content.concat(e), this.size + e.nodeSize);
  }
  /**
  Compare this fragment to another one.
  */
  eq(e) {
    if (this.content.length != e.content.length)
      return !1;
    for (let n = 0; n < this.content.length; n++)
      if (!this.content[n].eq(e.content[n]))
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
    let n = this.content[e];
    if (!n)
      throw new RangeError("Index " + e + " out of range for " + this);
    return n;
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
    for (let n = 0, r = 0; n < this.content.length; n++) {
      let i = this.content[n];
      e(i, r, n), r += i.nodeSize;
    }
  }
  /**
  Find the first position at which this fragment and another
  fragment differ, or `null` if they are the same.
  */
  findDiffStart(e, n = 0) {
    return Cb(this, e, n);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, n = this.size, r = e.size) {
    return Rb(this, e, n, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e) {
    if (e == 0)
      return ha(0, e);
    if (e == this.size)
      return ha(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let n = 0, r = 0; ; n++) {
      let i = this.child(n), o = r + i.nodeSize;
      if (o >= e)
        return o == e ? ha(n + 1, o) : ha(n, r);
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
  static fromJSON(e, n) {
    if (!n)
      return ze.empty;
    if (!Array.isArray(n))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return ze.fromArray(n.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return ze.empty;
    let n, r = 0;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      r += o.nodeSize, i && o.isText && e[i - 1].sameMarkup(o) ? (n || (n = e.slice(0, i)), n[n.length - 1] = o.withText(n[n.length - 1].text + o.text)) : n && n.push(o);
    }
    return new ze(n || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return ze.empty;
    if (e instanceof ze)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new ze([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
ze.empty = new ze([], 0);
const Yl = { index: 0, offset: 0 };
function ha(t, e) {
  return Yl.index = t, Yl.offset = e, Yl;
}
function Ba(t, e) {
  if (t === e)
    return !0;
  if (!(t && typeof t == "object") || !(e && typeof e == "object"))
    return !1;
  let n = Array.isArray(t);
  if (Array.isArray(e) != n)
    return !1;
  if (n) {
    if (t.length != e.length)
      return !1;
    for (let r = 0; r < t.length; r++)
      if (!Ba(t[r], e[r]))
        return !1;
  } else {
    for (let r in t)
      if (!(r in e) || !Ba(t[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in t))
        return !1;
  }
  return !0;
}
let Rn = class gf {
  /**
  @internal
  */
  constructor(e, n) {
    this.type = e, this.attrs = n;
  }
  /**
  Given a set of marks, create a new set which contains this one as
  well, in the right position. If this mark is already in the set,
  the set itself is returned. If any marks that are set to be
  [exclusive](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) with this mark are present,
  those are replaced by this one.
  */
  addToSet(e) {
    let n, r = !1;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      if (this.eq(o))
        return e;
      if (this.type.excludes(o.type))
        n || (n = e.slice(0, i));
      else {
        if (o.type.excludes(this.type))
          return e;
        !r && o.type.rank > this.type.rank && (n || (n = e.slice(0, i)), n.push(this), r = !0), n && n.push(o);
      }
    }
    return n || (n = e.slice()), r || n.push(this), n;
  }
  /**
  Remove this mark from the given set, returning a new set. If this
  mark is not in the set, the set itself is returned.
  */
  removeFromSet(e) {
    for (let n = 0; n < e.length; n++)
      if (this.eq(e[n]))
        return e.slice(0, n).concat(e.slice(n + 1));
    return e;
  }
  /**
  Test whether this mark is in the given set of marks.
  */
  isInSet(e) {
    for (let n = 0; n < e.length; n++)
      if (this.eq(e[n]))
        return !0;
    return !1;
  }
  /**
  Test whether this mark has the same type and attributes as
  another mark.
  */
  eq(e) {
    return this == e || this.type == e.type && Ba(this.attrs, e.attrs);
  }
  /**
  Convert this mark to a JSON-serializeable representation.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let n in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return e;
  }
  /**
  Deserialize a mark from JSON.
  */
  static fromJSON(e, n) {
    if (!n)
      throw new RangeError("Invalid input for Mark.fromJSON");
    let r = e.marks[n.type];
    if (!r)
      throw new RangeError(`There is no mark type ${n.type} in this schema`);
    return r.create(n.attrs);
  }
  /**
  Test whether two sets of marks are identical.
  */
  static sameSet(e, n) {
    if (e == n)
      return !0;
    if (e.length != n.length)
      return !1;
    for (let r = 0; r < e.length; r++)
      if (!e[r].eq(n[r]))
        return !1;
    return !0;
  }
  /**
  Create a properly sorted mark set from null, a single mark, or an
  unsorted array of marks.
  */
  static setFrom(e) {
    if (!e || Array.isArray(e) && e.length == 0)
      return gf.none;
    if (e instanceof gf)
      return [e];
    let n = e.slice();
    return n.sort((r, i) => r.type.rank - i.type.rank), n;
  }
};
Rn.none = [];
class Es extends Error {
}
class dt {
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
  constructor(e, n, r) {
    this.content = e, this.openStart = n, this.openEnd = r;
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
  insertAt(e, n) {
    let r = Ib(this.content, e + this.openStart, n, this.openStart + 1, this.openEnd + 1);
    return r && new dt(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, n) {
    return new dt(Mb(this.content, e + this.openStart, n + this.openStart), this.openStart, this.openEnd);
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
  static fromJSON(e, n) {
    if (!n)
      return dt.empty;
    let r = n.openStart || 0, i = n.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new dt(ze.fromJSON(e, n.content), r, i);
  }
  /**
  Create a slice from a fragment by taking the maximum possible
  open value on both side of the fragment.
  */
  static maxOpen(e, n = !0) {
    let r = 0, i = 0;
    for (let o = e.firstChild; o && !o.isLeaf && (n || !o.type.spec.isolating); o = o.firstChild)
      r++;
    for (let o = e.lastChild; o && !o.isLeaf && (n || !o.type.spec.isolating); o = o.lastChild)
      i++;
    return new dt(e, r, i);
  }
}
dt.empty = new dt(ze.empty, 0, 0);
function Mb(t, e, n) {
  let { index: r, offset: i } = t.findIndex(e), o = t.maybeChild(r), { index: s, offset: a } = t.findIndex(n);
  if (i == e || o.isText) {
    if (a != n && !t.child(s).isText)
      throw new RangeError("Removing non-flat range");
    return t.cut(0, e).append(t.cut(n));
  }
  if (r != s)
    throw new RangeError("Removing non-flat range");
  return t.replaceChild(r, o.copy(Mb(o.content, e - i - 1, n - i - 1)));
}
function Ib(t, e, n, r, i, o) {
  let { index: s, offset: a } = t.findIndex(e), l = t.maybeChild(s);
  if (a == e || l.isText)
    return o && r <= 0 && i <= 0 && !o.canReplace(s, s, n) ? null : t.cut(0, e).append(n).append(t.cut(e));
  let c = Ib(l.content, e - a - 1, n, s == 0 ? r - 1 : 0, s == t.childCount - 1 ? i - 1 : 0, l);
  return c && t.replaceChild(s, l.copy(c));
}
function Mk(t, e, n) {
  if (n.openStart > t.depth)
    throw new Es("Inserted content deeper than insertion position");
  if (t.depth - n.openStart != e.depth - n.openEnd)
    throw new Es("Inconsistent open depths");
  return Ab(t, e, n, 0);
}
function Ab(t, e, n, r) {
  let i = t.index(r), o = t.node(r);
  if (i == e.index(r) && r < t.depth - n.openStart) {
    let s = Ab(t, e, n, r + 1);
    return o.copy(o.content.replaceChild(i, s));
  } else if (n.content.size)
    if (!n.openStart && !n.openEnd && t.depth == r && e.depth == r) {
      let s = t.parent, a = s.content;
      return Ji(s, a.cut(0, t.parentOffset).append(n.content).append(a.cut(e.parentOffset)));
    } else {
      let { start: s, end: a } = Ik(n, t);
      return Ji(o, Pb(t, s, a, e, r));
    }
  else return Ji(o, qa(t, e, r));
}
function _b(t, e) {
  if (!e.type.compatibleContent(t.type))
    throw new Es("Cannot join " + e.type.name + " onto " + t.type.name);
}
function mf(t, e, n) {
  let r = t.node(n);
  return _b(r, e.node(n)), r;
}
function Vi(t, e) {
  let n = e.length - 1;
  n >= 0 && t.isText && t.sameMarkup(e[n]) ? e[n] = t.withText(e[n].text + t.text) : e.push(t);
}
function bs(t, e, n, r) {
  let i = (e || t).node(n), o = 0, s = e ? e.index(n) : i.childCount;
  t && (o = t.index(n), t.depth > n ? o++ : t.textOffset && (Vi(t.nodeAfter, r), o++));
  for (let a = o; a < s; a++)
    Vi(i.child(a), r);
  e && e.depth == n && e.textOffset && Vi(e.nodeBefore, r);
}
function Ji(t, e) {
  if (!t.type.validContent(e))
    throw new Es("Invalid content for node " + t.type.name);
  return t.copy(e);
}
function Pb(t, e, n, r, i) {
  let o = t.depth > i && mf(t, e, i + 1), s = r.depth > i && mf(n, r, i + 1), a = [];
  return bs(null, t, i, a), o && s && e.index(i) == n.index(i) ? (_b(o, s), Vi(Ji(o, Pb(t, e, n, r, i + 1)), a)) : (o && Vi(Ji(o, qa(t, e, i + 1)), a), bs(e, n, i, a), s && Vi(Ji(s, qa(n, r, i + 1)), a)), bs(r, null, i, a), new ze(a);
}
function qa(t, e, n) {
  let r = [];
  if (bs(null, t, n, r), t.depth > n) {
    let i = mf(t, e, n + 1);
    Vi(Ji(i, qa(t, e, n + 1)), r);
  }
  return bs(e, null, n, r), new ze(r);
}
function Ik(t, e) {
  let n = e.depth - t.openStart, i = e.node(n).copy(t.content);
  for (let o = n - 1; o >= 0; o--)
    i = e.node(o).copy(ze.from(i));
  return {
    start: i.resolveNoCache(t.openStart + n),
    end: i.resolveNoCache(i.content.size - t.openEnd - n)
  };
}
class Ms {
  /**
  @internal
  */
  constructor(e, n, r) {
    this.pos = e, this.path = n, this.parentOffset = r, this.depth = n.length / 3 - 1;
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
    let e = this.parent, n = this.index(this.depth);
    if (n == e.childCount)
      return null;
    let r = this.pos - this.path[this.path.length - 1], i = e.child(n);
    return r ? e.child(n).cut(r) : i;
  }
  /**
  Get the node directly before the position, if any. If the
  position points into a text node, only the part of that node
  before the position is returned.
  */
  get nodeBefore() {
    let e = this.index(this.depth), n = this.pos - this.path[this.path.length - 1];
    return n ? this.parent.child(e).cut(0, n) : e == 0 ? null : this.parent.child(e - 1);
  }
  /**
  Get the position at the given index in the parent node at the
  given depth (which defaults to `this.depth`).
  */
  posAtIndex(e, n) {
    n = this.resolveDepth(n);
    let r = this.path[n * 3], i = n == 0 ? 0 : this.path[n * 3 - 1] + 1;
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
    let e = this.parent, n = this.index();
    if (e.content.size == 0)
      return Rn.none;
    if (this.textOffset)
      return e.child(n).marks;
    let r = e.maybeChild(n - 1), i = e.maybeChild(n);
    if (!r) {
      let a = r;
      r = i, i = a;
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
    let n = this.parent.maybeChild(this.index());
    if (!n || !n.isInline)
      return null;
    let r = n.marks, i = e.parent.maybeChild(e.index());
    for (var o = 0; o < r.length; o++)
      r[o].type.spec.inclusive === !1 && (!i || !r[o].isInSet(i.marks)) && (r = r[o--].removeFromSet(r));
    return r;
  }
  /**
  The depth up to which this position and the given (non-resolved)
  position share the same parent nodes.
  */
  sharedDepth(e) {
    for (let n = this.depth; n > 0; n--)
      if (this.start(n) <= e && this.end(n) >= e)
        return n;
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
  blockRange(e = this, n) {
    if (e.pos < this.pos)
      return e.blockRange(this);
    for (let r = this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0); r >= 0; r--)
      if (e.pos <= this.end(r) && (!n || n(this.node(r))))
        return new Wa(this, e, r);
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
    for (let n = 1; n <= this.depth; n++)
      e += (e ? "/" : "") + this.node(n).type.name + "_" + this.index(n - 1);
    return e + ":" + this.parentOffset;
  }
  /**
  @internal
  */
  static resolve(e, n) {
    if (!(n >= 0 && n <= e.content.size))
      throw new RangeError("Position " + n + " out of range");
    let r = [], i = 0, o = n;
    for (let s = e; ; ) {
      let { index: a, offset: l } = s.content.findIndex(o), c = o - l;
      if (r.push(s, a, i + l), !c || (s = s.child(a), s.isText))
        break;
      o = c - 1, i += l + 1;
    }
    return new Ms(n, r, o);
  }
  /**
  @internal
  */
  static resolveCached(e, n) {
    let r = pp.get(e);
    if (r)
      for (let o = 0; o < r.elts.length; o++) {
        let s = r.elts[o];
        if (s.pos == n)
          return s;
      }
    else
      pp.set(e, r = new Ak());
    let i = r.elts[r.i] = Ms.resolve(e, n);
    return r.i = (r.i + 1) % _k, i;
  }
}
class Ak {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const _k = 12, pp = /* @__PURE__ */ new WeakMap();
class Wa {
  /**
  Construct a node range. `$from` and `$to` should point into the
  same node until at least the given `depth`, since a node range
  denotes an adjacent set of nodes in a single parent node.
  */
  constructor(e, n, r) {
    this.$from = e, this.$to = n, this.depth = r;
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
const Pk = /* @__PURE__ */ Object.create(null);
let Oo = class yf {
  /**
  @internal
  */
  constructor(e, n, r, i = Rn.none) {
    this.type = e, this.attrs = n, this.marks = i, this.content = r || ze.empty;
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
  nodesBetween(e, n, r, i = 0) {
    this.content.nodesBetween(e, n, r, i, this);
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
  textBetween(e, n, r, i) {
    return this.content.textBetween(e, n, r, i);
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
  hasMarkup(e, n, r) {
    return this.type == e && Ba(this.attrs, n || e.defaultAttrs || Pk) && Rn.sameSet(this.marks, r || Rn.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new yf(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new yf(this.type, this.attrs, this.content, e);
  }
  /**
  Create a copy of this node with only the content between the
  given positions. If `to` is not given, it defaults to the end of
  the node.
  */
  cut(e, n = this.content.size) {
    return e == 0 && n == this.content.size ? this : this.copy(this.content.cut(e, n));
  }
  /**
  Cut out the part of the document between the given positions, and
  return it as a `Slice` object.
  */
  slice(e, n = this.content.size, r = !1) {
    if (e == n)
      return dt.empty;
    let i = this.resolve(e), o = this.resolve(n), s = r ? 0 : i.sharedDepth(n), a = i.start(s), c = i.node(s).content.cut(i.pos - a, o.pos - a);
    return new dt(c, i.depth - s, o.depth - s);
  }
  /**
  Replace the part of the document between the given positions with
  the given slice. The slice must 'fit', meaning its open sides
  must be able to connect to the surrounding content, and its
  content nodes must be valid children for the node they are placed
  into. If any of this is violated, an error of type
  [`ReplaceError`](https://prosemirror.net/docs/ref/#model.ReplaceError) is thrown.
  */
  replace(e, n, r) {
    return Mk(this.resolve(e), this.resolve(n), r);
  }
  /**
  Find the node directly after the given position.
  */
  nodeAt(e) {
    for (let n = this; ; ) {
      let { index: r, offset: i } = n.content.findIndex(e);
      if (n = n.maybeChild(r), !n)
        return null;
      if (i == e || n.isText)
        return n;
      e -= i + 1;
    }
  }
  /**
  Find the (direct) child node after the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childAfter(e) {
    let { index: n, offset: r } = this.content.findIndex(e);
    return { node: this.content.maybeChild(n), index: n, offset: r };
  }
  /**
  Find the (direct) child node before the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childBefore(e) {
    if (e == 0)
      return { node: null, index: 0, offset: 0 };
    let { index: n, offset: r } = this.content.findIndex(e);
    if (r < e)
      return { node: this.content.child(n), index: n, offset: r };
    let i = this.content.child(n - 1);
    return { node: i, index: n - 1, offset: r - i.nodeSize };
  }
  /**
  Resolve the given position in the document, returning an
  [object](https://prosemirror.net/docs/ref/#model.ResolvedPos) with information about its context.
  */
  resolve(e) {
    return Ms.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return Ms.resolve(this, e);
  }
  /**
  Test whether a given mark or mark type occurs in this document
  between the two given positions.
  */
  rangeHasMark(e, n, r) {
    let i = !1;
    return n > e && this.nodesBetween(e, n, (o) => (r.isInSet(o.marks) && (i = !0), !i)), i;
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
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), Db(this.marks, e);
  }
  /**
  Get the content match in this node at the given index.
  */
  contentMatchAt(e) {
    let n = this.type.contentMatch.matchFragment(this.content, 0, e);
    if (!n)
      throw new Error("Called contentMatchAt on a node with invalid content");
    return n;
  }
  /**
  Test whether replacing the range between `from` and `to` (by
  child index) with the given replacement fragment (which defaults
  to the empty fragment) would leave the node's content valid. You
  can optionally pass `start` and `end` indices into the
  replacement fragment.
  */
  canReplace(e, n, r = ze.empty, i = 0, o = r.childCount) {
    let s = this.contentMatchAt(e).matchFragment(r, i, o), a = s && s.matchFragment(this.content, n);
    if (!a || !a.validEnd)
      return !1;
    for (let l = i; l < o; l++)
      if (!this.type.allowsMarks(r.child(l).marks))
        return !1;
    return !0;
  }
  /**
  Test whether replacing the range `from` to `to` (by index) with
  a node of the given type would leave the node's content valid.
  */
  canReplaceWith(e, n, r, i) {
    if (i && !this.type.allowsMarks(i))
      return !1;
    let o = this.contentMatchAt(e).matchType(r), s = o && o.matchFragment(this.content, n);
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
    this.type.checkContent(this.content), gp(this.type.attrs, this.attrs, "node", this.type.name);
    let e = Rn.none;
    for (let n = 0; n < this.marks.length; n++) {
      let r = this.marks[n];
      gp(r.type.attrs, r.attrs, "mark", r.type.name), e = r.addToSet(e);
    }
    if (!Rn.sameSet(e, this.marks))
      throw new RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map((n) => n.type.name)}`);
    this.content.forEach((n) => n.check());
  }
  /**
  Return a JSON-serializeable representation of this node.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let n in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return this.content.size && (e.content = this.content.toJSON()), this.marks.length && (e.marks = this.marks.map((n) => n.toJSON())), e;
  }
  /**
  Deserialize a node from its JSON representation.
  */
  static fromJSON(e, n) {
    if (!n)
      throw new RangeError("Invalid input for Node.fromJSON");
    let r;
    if (n.marks) {
      if (!Array.isArray(n.marks))
        throw new RangeError("Invalid mark data for Node.fromJSON");
      r = n.marks.map(e.markFromJSON);
    }
    if (n.type == "text") {
      if (typeof n.text != "string")
        throw new RangeError("Invalid text node in JSON");
      return e.text(n.text, r);
    }
    let i = ze.fromJSON(e, n.content);
    return e.nodeType(n.type).create(n.attrs, i, r);
  }
};
Oo.prototype.text = void 0;
class ja extends Oo {
  /**
  @internal
  */
  constructor(e, n, r, i) {
    if (super(e, n, null, i), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : Db(this.marks, JSON.stringify(this.text));
  }
  get textContent() {
    return this.text;
  }
  textBetween(e, n) {
    return this.text.slice(e, n);
  }
  get nodeSize() {
    return this.text.length;
  }
  mark(e) {
    return e == this.marks ? this : new ja(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new ja(this.type, this.attrs, e, this.marks);
  }
  cut(e = 0, n = this.text.length) {
    return e == 0 && n == this.text.length ? this : this.withText(this.text.slice(e, n));
  }
  eq(e) {
    return this.sameMarkup(e) && this.text == e.text;
  }
  toJSON() {
    let e = super.toJSON();
    return e.text = this.text, e;
  }
}
function Db(t, e) {
  for (let n = t.length - 1; n >= 0; n--)
    e = t[n].type.name + "(" + e + ")";
  return e;
}
function gp(t, e, n, r) {
  for (let i in e)
    if (!(i in t))
      throw new RangeError(`Unsupported attribute ${i} for ${n} of type ${r}`);
  for (let i in t)
    t[i].validate && t[i].validate(e[i]);
}
class to {
  /**
  @internal
  */
  constructor(e) {
    this.validEnd = e, this.next = [], this.wrapCache = [];
  }
  /**
  @internal
  */
  static parse(e, n) {
    let r = new Dk(e, n);
    if (r.next == null)
      return to.empty;
    let i = Nb(r);
    r.next && r.err("Unexpected trailing text");
    let o = Hk(Fk(i));
    return Bk(o, r), o;
  }
  /**
  Match a node type, returning a match after that node if
  successful.
  */
  matchType(e) {
    for (let n = 0; n < this.next.length; n++)
      if (this.next[n].type == e)
        return this.next[n].next;
    return null;
  }
  /**
  Try to match a fragment. Returns the resulting match when
  successful.
  */
  matchFragment(e, n = 0, r = e.childCount) {
    let i = this;
    for (let o = n; i && o < r; o++)
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
      let { type: n } = this.next[e];
      if (!(n.isText || n.hasRequiredAttrs()))
        return n;
    }
    return null;
  }
  /**
  @internal
  */
  compatible(e) {
    for (let n = 0; n < this.next.length; n++)
      for (let r = 0; r < e.next.length; r++)
        if (this.next[n].type == e.next[r].type)
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
  fillBefore(e, n = !1, r = 0) {
    let i = [this];
    function o(s, a) {
      let l = s.matchFragment(e, r);
      if (l && (!n || l.validEnd))
        return ze.from(a.map((c) => c.createAndFill()));
      for (let c = 0; c < s.next.length; c++) {
        let { type: u, next: d } = s.next[c];
        if (!(u.isText || u.hasRequiredAttrs()) && i.indexOf(d) == -1) {
          i.push(d);
          let f = o(d, a.concat(u));
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
    let n = this.computeWrapping(e);
    return this.wrapCache.push(e, n), n;
  }
  /**
  @internal
  */
  computeWrapping(e) {
    let n = /* @__PURE__ */ Object.create(null), r = [{ match: this, type: null, via: null }];
    for (; r.length; ) {
      let i = r.shift(), o = i.match;
      if (o.matchType(e)) {
        let s = [];
        for (let a = i; a.type; a = a.via)
          s.push(a.type);
        return s.reverse();
      }
      for (let s = 0; s < o.next.length; s++) {
        let { type: a, next: l } = o.next[s];
        !a.isLeaf && !a.hasRequiredAttrs() && !(a.name in n) && (!i.type || l.validEnd) && (r.push({ match: a.contentMatch, type: a, via: i }), n[a.name] = !0);
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
    function n(r) {
      e.push(r);
      for (let i = 0; i < r.next.length; i++)
        e.indexOf(r.next[i].next) == -1 && n(r.next[i].next);
    }
    return n(this), e.map((r, i) => {
      let o = i + (r.validEnd ? "*" : " ") + " ";
      for (let s = 0; s < r.next.length; s++)
        o += (s ? ", " : "") + r.next[s].type.name + "->" + e.indexOf(r.next[s].next);
      return o;
    }).join(`
`);
  }
}
to.empty = new to(!0);
class Dk {
  constructor(e, n) {
    this.string = e, this.nodeTypes = n, this.inline = null, this.pos = 0, this.tokens = e.split(/\s*(?=\b|\W|$)/), this.tokens[this.tokens.length - 1] == "" && this.tokens.pop(), this.tokens[0] == "" && this.tokens.shift();
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
function Nb(t) {
  let e = [];
  do
    e.push(Nk(t));
  while (t.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function Nk(t) {
  let e = [];
  do
    e.push(Ok(t));
  while (t.next && t.next != ")" && t.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function Ok(t) {
  let e = $k(t);
  for (; ; )
    if (t.eat("+"))
      e = { type: "plus", expr: e };
    else if (t.eat("*"))
      e = { type: "star", expr: e };
    else if (t.eat("?"))
      e = { type: "opt", expr: e };
    else if (t.eat("{"))
      e = zk(t, e);
    else
      break;
  return e;
}
function mp(t) {
  /\D/.test(t.next) && t.err("Expected number, got '" + t.next + "'");
  let e = Number(t.next);
  return t.pos++, e;
}
function zk(t, e) {
  let n = mp(t), r = n;
  return t.eat(",") && (t.next != "}" ? r = mp(t) : r = -1), t.eat("}") || t.err("Unclosed braced range"), { type: "range", min: n, max: r, expr: e };
}
function Lk(t, e) {
  let n = t.nodeTypes, r = n[e];
  if (r)
    return [r];
  let i = [];
  for (let o in n) {
    let s = n[o];
    s.isInGroup(e) && i.push(s);
  }
  return i.length == 0 && t.err("No node type or group '" + e + "' found"), i;
}
function $k(t) {
  if (t.eat("(")) {
    let e = Nb(t);
    return t.eat(")") || t.err("Missing closing paren"), e;
  } else if (/\W/.test(t.next))
    t.err("Unexpected token '" + t.next + "'");
  else {
    let e = Lk(t, t.next).map((n) => (t.inline == null ? t.inline = n.isInline : t.inline != n.isInline && t.err("Mixing inline and block content"), { type: "name", value: n }));
    return t.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function Fk(t) {
  let e = [[]];
  return i(o(t, 0), n()), e;
  function n() {
    return e.push([]) - 1;
  }
  function r(s, a, l) {
    let c = { term: l, to: a };
    return e[s].push(c), c;
  }
  function i(s, a) {
    s.forEach((l) => l.to = a);
  }
  function o(s, a) {
    if (s.type == "choice")
      return s.exprs.reduce((l, c) => l.concat(o(c, a)), []);
    if (s.type == "seq")
      for (let l = 0; ; l++) {
        let c = o(s.exprs[l], a);
        if (l == s.exprs.length - 1)
          return c;
        i(c, a = n());
      }
    else if (s.type == "star") {
      let l = n();
      return r(a, l), i(o(s.expr, l), l), [r(l)];
    } else if (s.type == "plus") {
      let l = n();
      return i(o(s.expr, a), l), i(o(s.expr, l), l), [r(l)];
    } else {
      if (s.type == "opt")
        return [r(a)].concat(o(s.expr, a));
      if (s.type == "range") {
        let l = a;
        for (let c = 0; c < s.min; c++) {
          let u = n();
          i(o(s.expr, l), u), l = u;
        }
        if (s.max == -1)
          i(o(s.expr, l), l);
        else
          for (let c = s.min; c < s.max; c++) {
            let u = n();
            r(l, u), i(o(s.expr, l), u), l = u;
          }
        return [r(l)];
      } else {
        if (s.type == "name")
          return [r(a, void 0, s.value)];
        throw new Error("Unknown expr type");
      }
    }
  }
}
function Ob(t, e) {
  return e - t;
}
function yp(t, e) {
  let n = [];
  return r(e), n.sort(Ob);
  function r(i) {
    let o = t[i];
    if (o.length == 1 && !o[0].term)
      return r(o[0].to);
    n.push(i);
    for (let s = 0; s < o.length; s++) {
      let { term: a, to: l } = o[s];
      !a && n.indexOf(l) == -1 && r(l);
    }
  }
}
function Hk(t) {
  let e = /* @__PURE__ */ Object.create(null);
  return n(yp(t, 0));
  function n(r) {
    let i = [];
    r.forEach((s) => {
      t[s].forEach(({ term: a, to: l }) => {
        if (!a)
          return;
        let c;
        for (let u = 0; u < i.length; u++)
          i[u][0] == a && (c = i[u][1]);
        yp(t, l).forEach((u) => {
          c || i.push([a, c = []]), c.indexOf(u) == -1 && c.push(u);
        });
      });
    });
    let o = e[r.join(",")] = new to(r.indexOf(t.length - 1) > -1);
    for (let s = 0; s < i.length; s++) {
      let a = i[s][1].sort(Ob);
      o.next.push({ type: i[s][0], next: e[a.join(",")] || n(a) });
    }
    return o;
  }
}
function Bk(t, e) {
  for (let n = 0, r = [t]; n < r.length; n++) {
    let i = r[n], o = !i.validEnd, s = [];
    for (let a = 0; a < i.next.length; a++) {
      let { type: l, next: c } = i.next[a];
      s.push(l.name), o && !(l.isText || l.hasRequiredAttrs()) && (o = !1), r.indexOf(c) == -1 && r.push(c);
    }
    o && e.err("Only non-generatable nodes (" + s.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function zb(t) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let n in t) {
    let r = t[n];
    if (!r.hasDefault)
      return null;
    e[n] = r.default;
  }
  return e;
}
function Lb(t, e) {
  let n = /* @__PURE__ */ Object.create(null);
  for (let r in t) {
    let i = t[r], o = e && e[r];
    if (o === void 0)
      if (i.hasDefault)
        o = i.default;
      else
        throw new RangeError("No value supplied for attribute " + r);
    else i.validate && i.validate(o);
    n[r] = o;
  }
  return n;
}
function $b(t, e) {
  let n = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      n[r] = new Wk(t, r, e[r]);
  return n;
}
class Ka {
  /**
  @internal
  */
  constructor(e, n, r) {
    this.name = e, this.schema = n, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = $b(e, r.attrs), this.defaultAttrs = zb(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
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
    return this.contentMatch == to.empty;
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
    return !e && this.defaultAttrs ? this.defaultAttrs : Lb(this.attrs, e);
  }
  /**
  Create a `Node` of this type. The given attributes are
  checked and defaulted (you can pass `null` to use the type's
  defaults entirely, if no required attributes exist). `content`
  may be a `Fragment`, a node, an array of nodes, or
  `null`. Similarly `marks` may be `null` to default to the empty
  set of marks.
  */
  create(e = null, n, r) {
    if (this.isText)
      throw new Error("NodeType.create can't construct text nodes");
    return new Oo(this, this.computeAttrs(e), ze.from(n), Rn.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, n, r) {
    return n = ze.from(n), this.checkContent(n), new Oo(this, this.computeAttrs(e), n, Rn.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but see if it is
  necessary to add nodes to the start or end of the given fragment
  to make it fit the node. If no fitting wrapping can be found,
  return null. Note that, due to the fact that required nodes can
  always be created, this will always succeed if you pass null or
  `Fragment.empty` as content.
  */
  createAndFill(e = null, n, r) {
    if (e = this.computeAttrs(e), n = ze.from(n), n.size) {
      let s = this.contentMatch.fillBefore(n);
      if (!s)
        return null;
      n = s.append(n);
    }
    let i = this.contentMatch.matchFragment(n), o = i && i.fillBefore(ze.empty, !0);
    return o ? new Oo(this, e, n.append(o), Rn.setFrom(r)) : null;
  }
  /**
  Returns true if the given fragment is valid content for this node
  type.
  */
  validContent(e) {
    let n = this.contentMatch.matchFragment(e);
    if (!n || !n.validEnd)
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
    for (let n = 0; n < e.length; n++)
      if (!this.allowsMarkType(e[n].type))
        return !1;
    return !0;
  }
  /**
  Removes the marks that are not allowed in this node from the given set.
  */
  allowedMarks(e) {
    if (this.markSet == null)
      return e;
    let n;
    for (let r = 0; r < e.length; r++)
      this.allowsMarkType(e[r].type) ? n && n.push(e[r]) : n || (n = e.slice(0, r));
    return n ? n.length ? n : Rn.none : e;
  }
  /**
  @internal
  */
  static compile(e, n) {
    let r = /* @__PURE__ */ Object.create(null);
    e.forEach((o, s) => r[o] = new Ka(o, n, s));
    let i = n.spec.topNode || "doc";
    if (!r[i])
      throw new RangeError("Schema is missing its top node type ('" + i + "')");
    if (!r.text)
      throw new RangeError("Every schema needs a 'text' type");
    for (let o in r.text.attrs)
      throw new RangeError("The text node type should not have attributes");
    return r;
  }
}
function qk(t, e, n) {
  let r = n.split("|");
  return (i) => {
    let o = i === null ? "null" : typeof i;
    if (r.indexOf(o) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${t}, got ${o}`);
  };
}
class Wk {
  constructor(e, n, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? qk(e, n, r.validate) : r.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class hl {
  /**
  @internal
  */
  constructor(e, n, r, i) {
    this.name = e, this.rank = n, this.schema = r, this.spec = i, this.attrs = $b(e, i.attrs), this.excluded = null;
    let o = zb(this.attrs);
    this.instance = o ? new Rn(this, o) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new Rn(this, Lb(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, n) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((o, s) => r[o] = new hl(o, i++, n, s)), r;
  }
  /**
  When there is a mark of this type in the given set, a new set
  without it is returned. Otherwise, the input set is returned.
  */
  removeFromSet(e) {
    for (var n = 0; n < e.length; n++)
      e[n].type == this && (e = e.slice(0, n).concat(e.slice(n + 1)), n--);
    return e;
  }
  /**
  Tests whether there is a mark of this type in the given set.
  */
  isInSet(e) {
    for (let n = 0; n < e.length; n++)
      if (e[n].type == this)
        return e[n];
  }
  /**
  Queries whether a given mark type is
  [excluded](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) by this one.
  */
  excludes(e) {
    return this.excluded.indexOf(e) > -1;
  }
}
class jk {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let n = this.spec = {};
    for (let i in e)
      n[i] = e[i];
    n.nodes = Un.from(e.nodes), n.marks = Un.from(e.marks || {}), this.nodes = Ka.compile(this.spec.nodes, this), this.marks = hl.compile(this.spec.marks, this);
    let r = /* @__PURE__ */ Object.create(null);
    for (let i in this.nodes) {
      if (i in this.marks)
        throw new RangeError(i + " can not be both a node and a mark");
      let o = this.nodes[i], s = o.spec.content || "", a = o.spec.marks;
      if (o.contentMatch = r[s] || (r[s] = to.parse(s, this.nodes)), o.inlineContent = o.contentMatch.inlineContent, o.spec.linebreakReplacement) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!o.isInline || !o.isLeaf)
          throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
        this.linebreakReplacement = o;
      }
      o.markSet = a == "_" ? null : a ? bp(this, a.split(" ")) : a == "" || !o.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let o = this.marks[i], s = o.spec.excludes;
      o.excluded = s == null ? [o] : s == "" ? [] : bp(this, s.split(" "));
    }
    this.nodeFromJSON = (i) => Oo.fromJSON(this, i), this.markFromJSON = (i) => Rn.fromJSON(this, i), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
  }
  /**
  Create a node in this schema. The `type` may be a string or a
  `NodeType` instance. Attributes will be extended with defaults,
  `content` may be a `Fragment`, `null`, a `Node`, or an array of
  nodes.
  */
  node(e, n = null, r, i) {
    if (typeof e == "string")
      e = this.nodeType(e);
    else if (e instanceof Ka) {
      if (e.schema != this)
        throw new RangeError("Node type from different schema used (" + e.name + ")");
    } else throw new RangeError("Invalid node type: " + e);
    return e.createChecked(n, r, i);
  }
  /**
  Create a text node in the schema. Empty text nodes are not
  allowed.
  */
  text(e, n) {
    let r = this.nodes.text;
    return new ja(r, r.defaultAttrs, e, Rn.setFrom(n));
  }
  /**
  Create a mark with the given type and attributes.
  */
  mark(e, n) {
    return typeof e == "string" && (e = this.marks[e]), e.create(n);
  }
  /**
  @internal
  */
  nodeType(e) {
    let n = this.nodes[e];
    if (!n)
      throw new RangeError("Unknown node type: " + e);
    return n;
  }
}
function bp(t, e) {
  let n = [];
  for (let r = 0; r < e.length; r++) {
    let i = e[r], o = t.marks[i], s = o;
    if (o)
      n.push(o);
    else
      for (let a in t.marks) {
        let l = t.marks[a];
        (i == "_" || l.spec.group && l.spec.group.split(" ").indexOf(i) > -1) && n.push(s = l);
      }
    if (!s)
      throw new SyntaxError("Unknown mark type: '" + e[r] + "'");
  }
  return n;
}
function Kk(t) {
  return t.tag != null;
}
function Uk(t) {
  return t.style != null;
}
class zo {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, n) {
    this.schema = e, this.rules = n, this.tags = [], this.styles = [];
    let r = this.matchedStyles = [];
    n.forEach((i) => {
      if (Kk(i))
        this.tags.push(i);
      else if (Uk(i)) {
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
  parse(e, n = {}) {
    let r = new wp(this, n, !1);
    return r.addAll(e, Rn.none, n.from, n.to), r.finish();
  }
  /**
  Parses the content of the given DOM node, like
  [`parse`](https://prosemirror.net/docs/ref/#model.DOMParser.parse), and takes the same set of
  options. But unlike that method, which produces a whole node,
  this one returns a slice that is open at the sides, meaning that
  the schema constraints aren't applied to the start of nodes to
  the left of the input and the end of nodes at the end.
  */
  parseSlice(e, n = {}) {
    let r = new wp(this, n, !0);
    return r.addAll(e, Rn.none, n.from, n.to), dt.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, n, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let o = this.tags[i];
      if (Xk(e, o.tag) && (o.namespace === void 0 || e.namespaceURI == o.namespace) && (!o.context || n.matchesContext(o.context))) {
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
  matchStyle(e, n, r, i) {
    for (let o = i ? this.styles.indexOf(i) + 1 : 0; o < this.styles.length; o++) {
      let s = this.styles[o], a = s.style;
      if (!(a.indexOf(e) != 0 || s.context && !r.matchesContext(s.context) || // Test that the style string either precisely matches the prop,
      // or has an '=' sign after the prop, followed by the given
      // value.
      a.length > e.length && (a.charCodeAt(e.length) != 61 || a.slice(e.length + 1) != n))) {
        if (s.getAttrs) {
          let l = s.getAttrs(n);
          if (l === !1)
            continue;
          s.attrs = l || void 0;
        }
        return s;
      }
    }
  }
  /**
  @internal
  */
  static schemaRules(e) {
    let n = [];
    function r(i) {
      let o = i.priority == null ? 50 : i.priority, s = 0;
      for (; s < n.length; s++) {
        let a = n[s];
        if ((a.priority == null ? 50 : a.priority) < o)
          break;
      }
      n.splice(s, 0, i);
    }
    for (let i in e.marks) {
      let o = e.marks[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = xp(s)), s.mark || s.ignore || s.clearMark || (s.mark = i);
      });
    }
    for (let i in e.nodes) {
      let o = e.nodes[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = xp(s)), s.node || s.ignore || s.mark || (s.node = i);
      });
    }
    return n;
  }
  /**
  Construct a DOM parser using the parsing rules listed in a
  schema's [node specs](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM), reordered by
  [priority](https://prosemirror.net/docs/ref/#model.GenericParseRule.priority).
  */
  static fromSchema(e) {
    return e.cached.domParser || (e.cached.domParser = new zo(e, zo.schemaRules(e)));
  }
}
const Fb = {
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
}, Gk = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, Hb = { ol: !0, ul: !0 }, Is = 1, bf = 2, vs = 4;
function vp(t, e, n) {
  return e != null ? (e ? Is : 0) | (e === "full" ? bf : 0) : t && t.whitespace == "pre" ? Is | bf : n & ~vs;
}
class pa {
  constructor(e, n, r, i, o, s) {
    this.type = e, this.attrs = n, this.marks = r, this.solid = i, this.options = s, this.content = [], this.activeMarks = Rn.none, this.match = o || (s & vs ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let n = this.type.contentMatch.fillBefore(ze.from(e));
      if (n)
        this.match = this.type.contentMatch.matchFragment(n);
      else {
        let r = this.type.contentMatch, i;
        return (i = r.findWrapping(e.type)) ? (this.match = r, i) : null;
      }
    }
    return this.match.findWrapping(e.type);
  }
  finish(e) {
    if (!(this.options & Is)) {
      let r = this.content[this.content.length - 1], i;
      if (r && r.isText && (i = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let o = r;
        r.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = o.withText(o.text.slice(0, o.text.length - i[0].length));
      }
    }
    let n = ze.from(this.content);
    return !e && this.match && (n = n.append(this.match.fillBefore(ze.empty, !0))), this.type ? this.type.create(this.attrs, n, this.marks) : n;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Fb.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class wp {
  constructor(e, n, r) {
    this.parser = e, this.options = n, this.isOpen = r, this.open = 0, this.localPreserveWS = !1;
    let i = n.topNode, o, s = vp(null, n.preserveWhitespace, 0) | (r ? vs : 0);
    i ? o = new pa(i.type, i.attrs, Rn.none, !0, n.topMatch || i.type.contentMatch, s) : r ? o = new pa(null, null, Rn.none, !0, null, s) : o = new pa(e.schema.topNodeType, null, Rn.none, !0, null, s), this.nodes = [o], this.find = n.findPositions, this.needsBlock = !1;
  }
  get top() {
    return this.nodes[this.open];
  }
  // Add a DOM node to the content. Text is inserted as text node,
  // otherwise, the node is passed to `addElement` or, if it has a
  // `style` attribute, `addElementWithStyles`.
  addDOM(e, n) {
    e.nodeType == 3 ? this.addTextNode(e, n) : e.nodeType == 1 && this.addElement(e, n);
  }
  addTextNode(e, n) {
    let r = e.nodeValue, i = this.top, o = i.options & bf ? "full" : this.localPreserveWS || (i.options & Is) > 0, { schema: s } = this.parser;
    if (o === "full" || i.inlineContext(e) || /[^ \t\r\n\u000c]/.test(r)) {
      if (o)
        if (o === "full")
          r = r.replace(/\r\n?/g, `
`);
        else if (s.linebreakReplacement && /[\r\n]/.test(r) && this.top.findWrapping(s.linebreakReplacement.create())) {
          let a = r.split(/\r?\n|\r/);
          for (let l = 0; l < a.length; l++)
            l && this.insertNode(s.linebreakReplacement.create(), n, !0), a[l] && this.insertNode(s.text(a[l]), n, !/\S/.test(a[l]));
          r = "";
        } else
          r = r.replace(/\r?\n|\r/g, " ");
      else if (r = r.replace(/[ \t\r\n\u000c]+/g, " "), /^[ \t\r\n\u000c]/.test(r) && this.open == this.nodes.length - 1) {
        let a = i.content[i.content.length - 1], l = e.previousSibling;
        (!a || l && l.nodeName == "BR" || a.isText && /[ \t\r\n\u000c]$/.test(a.text)) && (r = r.slice(1));
      }
      r && this.insertNode(s.text(r), n, !/\S/.test(r)), this.findInText(e);
    } else
      this.findInside(e);
  }
  // Try to find a handler for the given tag and use that to parse. If
  // none is found, the element's content nodes are added directly.
  addElement(e, n, r) {
    let i = this.localPreserveWS, o = this.top;
    (e.tagName == "PRE" || /pre/.test(e.style && e.style.whiteSpace)) && (this.localPreserveWS = !0);
    let s = e.nodeName.toLowerCase(), a;
    Hb.hasOwnProperty(s) && this.parser.normalizeLists && Yk(e);
    let l = this.options.ruleFromNode && this.options.ruleFromNode(e) || (a = this.parser.matchTag(e, this, r));
    e: if (l ? l.ignore : Gk.hasOwnProperty(s))
      this.findInside(e), this.ignoreFallback(e, n);
    else if (!l || l.skip || l.closeParent) {
      l && l.closeParent ? this.open = Math.max(0, this.open - 1) : l && l.skip.nodeType && (e = l.skip);
      let c, u = this.needsBlock;
      if (Fb.hasOwnProperty(s))
        o.content.length && o.content[0].isInline && this.open && (this.open--, o = this.top), c = !0, o.type || (this.needsBlock = !0);
      else if (!e.firstChild) {
        this.leafFallback(e, n);
        break e;
      }
      let d = l && l.skip ? n : this.readStyles(e, n);
      d && this.addAll(e, d), c && this.sync(o), this.needsBlock = u;
    } else {
      let c = this.readStyles(e, n);
      c && this.addElementByRule(e, l, c, l.consuming === !1 ? a : void 0);
    }
    this.localPreserveWS = i;
  }
  // Called for leaf DOM nodes that would otherwise be ignored
  leafFallback(e, n) {
    e.nodeName == "BR" && this.top.type && this.top.type.inlineContent && this.addTextNode(e.ownerDocument.createTextNode(`
`), n);
  }
  // Called for ignored nodes
  ignoreFallback(e, n) {
    e.nodeName == "BR" && (!this.top.type || !this.top.type.inlineContent) && this.findPlace(this.parser.schema.text("-"), n, !0);
  }
  // Run any style parser associated with the node's styles. Either
  // return an updated array of marks, or null to indicate some of the
  // styles had a rule with `ignore` set.
  readStyles(e, n) {
    let r = e.style;
    if (r && r.length)
      for (let i = 0; i < this.parser.matchedStyles.length; i++) {
        let o = this.parser.matchedStyles[i], s = r.getPropertyValue(o);
        if (s)
          for (let a = void 0; ; ) {
            let l = this.parser.matchStyle(o, s, this, a);
            if (!l)
              break;
            if (l.ignore)
              return null;
            if (l.clearMark ? n = n.filter((c) => !l.clearMark(c)) : n = n.concat(this.parser.schema.marks[l.mark].create(l.attrs)), l.consuming === !1)
              a = l;
            else
              break;
          }
      }
    return n;
  }
  // Look up a handler for the given node. If none are found, return
  // false. Otherwise, apply it, use its return value to drive the way
  // the node's content is wrapped, and return true.
  addElementByRule(e, n, r, i) {
    let o, s;
    if (n.node)
      if (s = this.parser.schema.nodes[n.node], s.isLeaf)
        this.insertNode(s.create(n.attrs), r, e.nodeName == "BR") || this.leafFallback(e, r);
      else {
        let l = this.enter(s, n.attrs || null, r, n.preserveWhitespace);
        l && (o = !0, r = l);
      }
    else {
      let l = this.parser.schema.marks[n.mark];
      r = r.concat(l.create(n.attrs));
    }
    let a = this.top;
    if (s && s.isLeaf)
      this.findInside(e);
    else if (i)
      this.addElement(e, r, i);
    else if (n.getContent)
      this.findInside(e), n.getContent(e, this.parser.schema).forEach((l) => this.insertNode(l, r, !1));
    else {
      let l = e;
      typeof n.contentElement == "string" ? l = e.querySelector(n.contentElement) : typeof n.contentElement == "function" ? l = n.contentElement(e) : n.contentElement && (l = n.contentElement), this.findAround(e, l, !0), this.addAll(l, r), this.findAround(e, l, !1);
    }
    o && this.sync(a) && this.open--;
  }
  // Add all child nodes between `startIndex` and `endIndex` (or the
  // whole node, if not given). If `sync` is passed, use it to
  // synchronize after every block element.
  addAll(e, n, r, i) {
    let o = r || 0;
    for (let s = r ? e.childNodes[r] : e.firstChild, a = i == null ? null : e.childNodes[i]; s != a; s = s.nextSibling, ++o)
      this.findAtPoint(e, o), this.addDOM(s, n);
    this.findAtPoint(e, o);
  }
  // Try to find a way to fit the given node type into the current
  // context. May add intermediate wrappers and/or leave non-solid
  // nodes that we're in.
  findPlace(e, n, r) {
    let i, o;
    for (let s = this.open, a = 0; s >= 0; s--) {
      let l = this.nodes[s], c = l.findWrapping(e);
      if (c && (!i || i.length > c.length + a) && (i = c, o = l, !c.length))
        break;
      if (l.solid) {
        if (r)
          break;
        a += 2;
      }
    }
    if (!i)
      return null;
    this.sync(o);
    for (let s = 0; s < i.length; s++)
      n = this.enterInner(i[s], null, n, !1);
    return n;
  }
  // Try to insert the given node, adjusting the context when needed.
  insertNode(e, n, r) {
    if (e.isInline && this.needsBlock && !this.top.type) {
      let o = this.textblockFromContext();
      o && (n = this.enterInner(o, null, n));
    }
    let i = this.findPlace(e, n, r);
    if (i) {
      this.closeExtra();
      let o = this.top;
      o.match && (o.match = o.match.matchType(e.type));
      let s = Rn.none;
      for (let a of i.concat(e.marks))
        (o.type ? o.type.allowsMarkType(a.type) : kp(a.type, e.type)) && (s = a.addToSet(s));
      return o.content.push(e.mark(s)), !0;
    }
    return !1;
  }
  // Try to start a node of the given type, adjusting the context when
  // necessary.
  enter(e, n, r, i) {
    let o = this.findPlace(e.create(n), r, !1);
    return o && (o = this.enterInner(e, n, r, !0, i)), o;
  }
  // Open a node of the given type
  enterInner(e, n, r, i = !1, o) {
    this.closeExtra();
    let s = this.top;
    s.match = s.match && s.match.matchType(e);
    let a = vp(e, o, s.options);
    s.options & vs && s.content.length == 0 && (a |= vs);
    let l = Rn.none;
    return r = r.filter((c) => (s.type ? s.type.allowsMarkType(c.type) : kp(c.type, e)) ? (l = c.addToSet(l), !1) : !0), this.nodes.push(new pa(e, n, l, i, null, a)), this.open++, r;
  }
  // Make sure all nodes above this.open are finished and added to
  // their parents
  closeExtra(e = !1) {
    let n = this.nodes.length - 1;
    if (n > this.open) {
      for (; n > this.open; n--)
        this.nodes[n - 1].content.push(this.nodes[n].finish(e));
      this.nodes.length = this.open + 1;
    }
  }
  finish() {
    return this.open = 0, this.closeExtra(this.isOpen), this.nodes[0].finish(!!(this.isOpen || this.options.topOpen));
  }
  sync(e) {
    for (let n = this.open; n >= 0; n--) {
      if (this.nodes[n] == e)
        return this.open = n, !0;
      this.localPreserveWS && (this.nodes[n].options |= Is);
    }
    return !1;
  }
  get currentPos() {
    this.closeExtra();
    let e = 0;
    for (let n = this.open; n >= 0; n--) {
      let r = this.nodes[n].content;
      for (let i = r.length - 1; i >= 0; i--)
        e += r[i].nodeSize;
      n && e++;
    }
    return e;
  }
  findAtPoint(e, n) {
    if (this.find)
      for (let r = 0; r < this.find.length; r++)
        this.find[r].node == e && this.find[r].offset == n && (this.find[r].pos = this.currentPos);
  }
  findInside(e) {
    if (this.find)
      for (let n = 0; n < this.find.length; n++)
        this.find[n].pos == null && e.nodeType == 1 && e.contains(this.find[n].node) && (this.find[n].pos = this.currentPos);
  }
  findAround(e, n, r) {
    if (e != n && this.find)
      for (let i = 0; i < this.find.length; i++)
        this.find[i].pos == null && e.nodeType == 1 && e.contains(this.find[i].node) && n.compareDocumentPosition(this.find[i].node) & (r ? 2 : 4) && (this.find[i].pos = this.currentPos);
  }
  findInText(e) {
    if (this.find)
      for (let n = 0; n < this.find.length; n++)
        this.find[n].node == e && (this.find[n].pos = this.currentPos - (e.nodeValue.length - this.find[n].offset));
  }
  // Determines whether the given context string matches this context.
  matchesContext(e) {
    if (e.indexOf("|") > -1)
      return e.split(/\s*\|\s*/).some(this.matchesContext, this);
    let n = e.split("/"), r = this.options.context, i = !this.isOpen && (!r || r.parent.type == this.nodes[0].type), o = -(r ? r.depth + 1 : 0) + (i ? 0 : 1), s = (a, l) => {
      for (; a >= 0; a--) {
        let c = n[a];
        if (c == "") {
          if (a == n.length - 1 || a == 0)
            continue;
          for (; l >= o; l--)
            if (s(a - 1, l))
              return !0;
          return !1;
        } else {
          let u = l > 0 || l == 0 && i ? this.nodes[l].type : r && l >= o ? r.node(l - o).type : null;
          if (!u || u.name != c && !u.isInGroup(c))
            return !1;
          l--;
        }
      }
      return !0;
    };
    return s(n.length - 1, this.open);
  }
  textblockFromContext() {
    let e = this.options.context;
    if (e)
      for (let n = e.depth; n >= 0; n--) {
        let r = e.node(n).contentMatchAt(e.indexAfter(n)).defaultType;
        if (r && r.isTextblock && r.defaultAttrs)
          return r;
      }
    for (let n in this.parser.schema.nodes) {
      let r = this.parser.schema.nodes[n];
      if (r.isTextblock && r.defaultAttrs)
        return r;
    }
  }
}
function Yk(t) {
  for (let e = t.firstChild, n = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && Hb.hasOwnProperty(r) && n ? (n.appendChild(e), e = n) : r == "li" ? n = e : r && (n = null);
  }
}
function Xk(t, e) {
  return (t.matches || t.msMatchesSelector || t.webkitMatchesSelector || t.mozMatchesSelector).call(t, e);
}
function xp(t) {
  let e = {};
  for (let n in t)
    e[n] = t[n];
  return e;
}
function kp(t, e) {
  let n = e.schema.nodes;
  for (let r in n) {
    let i = n[r];
    if (!i.allowsMarkType(t))
      continue;
    let o = [], s = (a) => {
      o.push(a);
      for (let l = 0; l < a.edgeCount; l++) {
        let { type: c, next: u } = a.edge(l);
        if (c == e || o.indexOf(u) < 0 && s(u))
          return !0;
      }
    };
    if (s(i.contentMatch))
      return !0;
  }
}
const Bb = 65535, qb = Math.pow(2, 16);
function Vk(t, e) {
  return t + e * qb;
}
function Sp(t) {
  return t & Bb;
}
function Jk(t) {
  return (t - (t & Bb)) / qb;
}
const Wb = 1, jb = 2, Pa = 4, Kb = 8;
class vf {
  /**
  @internal
  */
  constructor(e, n, r) {
    this.pos = e, this.delInfo = n, this.recover = r;
  }
  /**
  Tells you whether the position was deleted, that is, whether the
  step removed the token on the side queried (via the `assoc`)
  argument from the document.
  */
  get deleted() {
    return (this.delInfo & Kb) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (Wb | Pa)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (jb | Pa)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & Pa) > 0;
  }
}
class br {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, n = !1) {
    if (this.ranges = e, this.inverted = n, !e.length && br.empty)
      return br.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let n = 0, r = Sp(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        n += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + n + Jk(e);
  }
  mapResult(e, n = 1) {
    return this._map(e, n, !1);
  }
  map(e, n = 1) {
    return this._map(e, n, !0);
  }
  /**
  @internal
  */
  _map(e, n, r) {
    let i = 0, o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
    for (let a = 0; a < this.ranges.length; a += 3) {
      let l = this.ranges[a] - (this.inverted ? i : 0);
      if (l > e)
        break;
      let c = this.ranges[a + o], u = this.ranges[a + s], d = l + c;
      if (e <= d) {
        let f = c ? e == l ? -1 : e == d ? 1 : n : n, h = l + i + (f < 0 ? 0 : u);
        if (r)
          return h;
        let p = e == (n < 0 ? l : d) ? null : Vk(a / 3, e - l), g = e == l ? jb : e == d ? Wb : Pa;
        return (n < 0 ? e != l : e != d) && (g |= Kb), new vf(h, g, p);
      }
      i += u - c;
    }
    return r ? e + i : new vf(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, n) {
    let r = 0, i = Sp(n), o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
    for (let a = 0; a < this.ranges.length; a += 3) {
      let l = this.ranges[a] - (this.inverted ? r : 0);
      if (l > e)
        break;
      let c = this.ranges[a + o], u = l + c;
      if (e <= u && a == i * 3)
        return !0;
      r += this.ranges[a + s] - c;
    }
    return !1;
  }
  /**
  Calls the given function on each of the changed ranges included in
  this map.
  */
  forEach(e) {
    let n = this.inverted ? 2 : 1, r = this.inverted ? 1 : 2;
    for (let i = 0, o = 0; i < this.ranges.length; i += 3) {
      let s = this.ranges[i], a = s - (this.inverted ? o : 0), l = s + (this.inverted ? 0 : o), c = this.ranges[i + n], u = this.ranges[i + r];
      e(a, a + c, l, l + u), o += u - c;
    }
  }
  /**
  Create an inverted version of this map. The result can be used to
  map positions in the post-step document to the pre-step document.
  */
  invert() {
    return new br(this.ranges, !this.inverted);
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
    return e == 0 ? br.empty : new br(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
br.empty = new br([]);
class Ua {
  /**
  Create a new mapping with the given position maps.
  */
  constructor(e, n, r = 0, i = e ? e.length : 0) {
    this.mirror = n, this.from = r, this.to = i, this._maps = e || [], this.ownData = !(e || n);
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
  slice(e = 0, n = this.maps.length) {
    return new Ua(this._maps, this.mirror, e, n);
  }
  /**
  Add a step map to the end of this mapping. If `mirrors` is
  given, it should be the index of the step map that is the mirror
  image of this one.
  */
  appendMap(e, n) {
    this.ownData || (this._maps = this._maps.slice(), this.mirror = this.mirror && this.mirror.slice(), this.ownData = !0), this.to = this._maps.push(e), n != null && this.setMirror(this._maps.length - 1, n);
  }
  /**
  Add all the step maps in a given mapping to this one (preserving
  mirroring information).
  */
  appendMapping(e) {
    for (let n = 0, r = this._maps.length; n < e._maps.length; n++) {
      let i = e.getMirror(n);
      this.appendMap(e._maps[n], i != null && i < n ? r + i : void 0);
    }
  }
  /**
  Finds the offset of the step map that mirrors the map at the
  given offset, in this mapping (as per the second argument to
  `appendMap`).
  */
  getMirror(e) {
    if (this.mirror) {
      for (let n = 0; n < this.mirror.length; n++)
        if (this.mirror[n] == e)
          return this.mirror[n + (n % 2 ? -1 : 1)];
    }
  }
  /**
  @internal
  */
  setMirror(e, n) {
    this.mirror || (this.mirror = []), this.mirror.push(e, n);
  }
  /**
  Append the inverse of the given mapping to this one.
  */
  appendMappingInverted(e) {
    for (let n = e.maps.length - 1, r = this._maps.length + e._maps.length; n >= 0; n--) {
      let i = e.getMirror(n);
      this.appendMap(e._maps[n].invert(), i != null && i > n ? r - i - 1 : void 0);
    }
  }
  /**
  Create an inverted version of this mapping.
  */
  invert() {
    let e = new Ua();
    return e.appendMappingInverted(this), e;
  }
  /**
  Map a position through this mapping.
  */
  map(e, n = 1) {
    if (this.mirror)
      return this._map(e, n, !0);
    for (let r = this.from; r < this.to; r++)
      e = this._maps[r].map(e, n);
    return e;
  }
  /**
  Map a position through this mapping, returning a mapping
  result.
  */
  mapResult(e, n = 1) {
    return this._map(e, n, !1);
  }
  /**
  @internal
  */
  _map(e, n, r) {
    let i = 0;
    for (let o = this.from; o < this.to; o++) {
      let s = this._maps[o], a = s.mapResult(e, n);
      if (a.recover != null) {
        let l = this.getMirror(o);
        if (l != null && l > o && l < this.to) {
          o = l, e = this._maps[l].recover(a.recover);
          continue;
        }
      }
      i |= a.delInfo, e = a.pos;
    }
    return r ? e : new vf(e, i, null);
  }
}
const Xl = /* @__PURE__ */ Object.create(null);
class Zn {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return br.empty;
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
  static fromJSON(e, n) {
    if (!n || !n.stepType)
      throw new RangeError("Invalid input for Step.fromJSON");
    let r = Xl[n.stepType];
    if (!r)
      throw new RangeError(`No step type ${n.stepType} defined`);
    return r.fromJSON(e, n);
  }
  /**
  To be able to serialize steps to JSON, each step needs a string
  ID to attach to its JSON representation. Use this method to
  register an ID for your step classes. Try to pick something
  that's unlikely to clash with steps from other modules.
  */
  static jsonID(e, n) {
    if (e in Xl)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return Xl[e] = n, n.prototype.jsonID = e, n;
  }
}
class Bn {
  /**
  @internal
  */
  constructor(e, n) {
    this.doc = e, this.failed = n;
  }
  /**
  Create a successful step result.
  */
  static ok(e) {
    return new Bn(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new Bn(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, n, r, i) {
    try {
      return Bn.ok(e.replace(n, r, i));
    } catch (o) {
      if (o instanceof Es)
        return Bn.fail(o.message);
      throw o;
    }
  }
}
function Xf(t, e, n) {
  let r = [];
  for (let i = 0; i < t.childCount; i++) {
    let o = t.child(i);
    o.content.size && (o = o.copy(Xf(o.content, e, o))), o.isInline && (o = e(o, n, i)), r.push(o);
  }
  return ze.fromArray(r);
}
class Mi extends Zn {
  /**
  Create a mark step.
  */
  constructor(e, n, r) {
    super(), this.from = e, this.to = n, this.mark = r;
  }
  apply(e) {
    let n = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new dt(Xf(n.content, (s, a) => !s.isAtom || !a.type.allowsMarkType(this.mark.type) ? s : s.mark(this.mark.addToSet(s.marks)), i), n.openStart, n.openEnd);
    return Bn.fromReplace(e, this.from, this.to, o);
  }
  invert() {
    return new Wr(this.from, this.to, this.mark);
  }
  map(e) {
    let n = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return n.deleted && r.deleted || n.pos >= r.pos ? null : new Mi(n.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof Mi && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new Mi(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
  static fromJSON(e, n) {
    if (typeof n.from != "number" || typeof n.to != "number")
      throw new RangeError("Invalid input for AddMarkStep.fromJSON");
    return new Mi(n.from, n.to, e.markFromJSON(n.mark));
  }
}
Zn.jsonID("addMark", Mi);
class Wr extends Zn {
  /**
  Create a mark-removing step.
  */
  constructor(e, n, r) {
    super(), this.from = e, this.to = n, this.mark = r;
  }
  apply(e) {
    let n = e.slice(this.from, this.to), r = new dt(Xf(n.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), n.openStart, n.openEnd);
    return Bn.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new Mi(this.from, this.to, this.mark);
  }
  map(e) {
    let n = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return n.deleted && r.deleted || n.pos >= r.pos ? null : new Wr(n.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof Wr && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new Wr(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
  static fromJSON(e, n) {
    if (typeof n.from != "number" || typeof n.to != "number")
      throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
    return new Wr(n.from, n.to, e.markFromJSON(n.mark));
  }
}
Zn.jsonID("removeMark", Wr);
class Ii extends Zn {
  /**
  Create a node mark step.
  */
  constructor(e, n) {
    super(), this.pos = e, this.mark = n;
  }
  apply(e) {
    let n = e.nodeAt(this.pos);
    if (!n)
      return Bn.fail("No node at mark step's position");
    let r = n.type.create(n.attrs, null, this.mark.addToSet(n.marks));
    return Bn.fromReplace(e, this.pos, this.pos + 1, new dt(ze.from(r), 0, n.isLeaf ? 0 : 1));
  }
  invert(e) {
    let n = e.nodeAt(this.pos);
    if (n) {
      let r = this.mark.addToSet(n.marks);
      if (r.length == n.marks.length) {
        for (let i = 0; i < n.marks.length; i++)
          if (!n.marks[i].isInSet(r))
            return new Ii(this.pos, n.marks[i]);
        return new Ii(this.pos, this.mark);
      }
    }
    return new no(this.pos, this.mark);
  }
  map(e) {
    let n = e.mapResult(this.pos, 1);
    return n.deletedAfter ? null : new Ii(n.pos, this.mark);
  }
  toJSON() {
    return { stepType: "addNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.pos != "number")
      throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON");
    return new Ii(n.pos, e.markFromJSON(n.mark));
  }
}
Zn.jsonID("addNodeMark", Ii);
class no extends Zn {
  /**
  Create a mark-removing step.
  */
  constructor(e, n) {
    super(), this.pos = e, this.mark = n;
  }
  apply(e) {
    let n = e.nodeAt(this.pos);
    if (!n)
      return Bn.fail("No node at mark step's position");
    let r = n.type.create(n.attrs, null, this.mark.removeFromSet(n.marks));
    return Bn.fromReplace(e, this.pos, this.pos + 1, new dt(ze.from(r), 0, n.isLeaf ? 0 : 1));
  }
  invert(e) {
    let n = e.nodeAt(this.pos);
    return !n || !this.mark.isInSet(n.marks) ? this : new Ii(this.pos, this.mark);
  }
  map(e) {
    let n = e.mapResult(this.pos, 1);
    return n.deletedAfter ? null : new no(n.pos, this.mark);
  }
  toJSON() {
    return { stepType: "removeNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.pos != "number")
      throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
    return new no(n.pos, e.markFromJSON(n.mark));
  }
}
Zn.jsonID("removeNodeMark", no);
class Hn extends Zn {
  /**
  The given `slice` should fit the 'gap' between `from` and
  `to`—the depths must line up, and the surrounding nodes must be
  able to be joined with the open sides of the slice. When
  `structure` is true, the step will fail if the content between
  from and to is not just a sequence of closing and then opening
  tokens (this is to guard against rebased replace steps
  overwriting something they weren't supposed to).
  */
  constructor(e, n, r, i = !1) {
    super(), this.from = e, this.to = n, this.slice = r, this.structure = i;
  }
  apply(e) {
    return this.structure && wf(e, this.from, this.to) ? Bn.fail("Structure replace would overwrite content") : Bn.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new br([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new Hn(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let n = e.mapResult(this.to, -1), r = this.from == this.to && Hn.MAP_BIAS < 0 ? n : e.mapResult(this.from, 1);
    return r.deletedAcross && n.deletedAcross ? null : new Hn(r.pos, Math.max(r.pos, n.pos), this.slice, this.structure);
  }
  merge(e) {
    if (!(e instanceof Hn) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let n = this.slice.size + e.slice.size == 0 ? dt.empty : new dt(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new Hn(this.from, this.to + (e.to - e.from), n, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let n = this.slice.size + e.slice.size == 0 ? dt.empty : new dt(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new Hn(e.from, this.to, n, this.structure);
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
  static fromJSON(e, n) {
    if (typeof n.from != "number" || typeof n.to != "number")
      throw new RangeError("Invalid input for ReplaceStep.fromJSON");
    return new Hn(n.from, n.to, dt.fromJSON(e, n.slice), !!n.structure);
  }
}
Hn.MAP_BIAS = 1;
Zn.jsonID("replace", Hn);
class Kn extends Zn {
  /**
  Create a replace-around step with the given range and gap.
  `insert` should be the point in the slice into which the content
  of the gap should be moved. `structure` has the same meaning as
  it has in the [`ReplaceStep`](https://prosemirror.net/docs/ref/#transform.ReplaceStep) class.
  */
  constructor(e, n, r, i, o, s, a = !1) {
    super(), this.from = e, this.to = n, this.gapFrom = r, this.gapTo = i, this.slice = o, this.insert = s, this.structure = a;
  }
  apply(e) {
    if (this.structure && (wf(e, this.from, this.gapFrom) || wf(e, this.gapTo, this.to)))
      return Bn.fail("Structure gap-replace would overwrite content");
    let n = e.slice(this.gapFrom, this.gapTo);
    if (n.openStart || n.openEnd)
      return Bn.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, n.content);
    return r ? Bn.fromReplace(e, this.from, this.to, r) : Bn.fail("Content does not fit in gap");
  }
  getMap() {
    return new br([
      this.from,
      this.gapFrom - this.from,
      this.insert,
      this.gapTo,
      this.to - this.gapTo,
      this.slice.size - this.insert
    ]);
  }
  invert(e) {
    let n = this.gapTo - this.gapFrom;
    return new Kn(this.from, this.from + this.slice.size + n, this.from + this.insert, this.from + this.insert + n, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let n = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), i = this.from == this.gapFrom ? n.pos : e.map(this.gapFrom, -1), o = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return n.deletedAcross && r.deletedAcross || i < n.pos || o > r.pos ? null : new Kn(n.pos, r.pos, i, o, this.slice, this.insert, this.structure);
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
  static fromJSON(e, n) {
    if (typeof n.from != "number" || typeof n.to != "number" || typeof n.gapFrom != "number" || typeof n.gapTo != "number" || typeof n.insert != "number")
      throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
    return new Kn(n.from, n.to, n.gapFrom, n.gapTo, dt.fromJSON(e, n.slice), n.insert, !!n.structure);
  }
}
Zn.jsonID("replaceAround", Kn);
function wf(t, e, n) {
  let r = t.resolve(e), i = n - e, o = r.depth;
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
function Zk(t, e, n, r) {
  let i = [], o = [], s, a;
  t.doc.nodesBetween(e, n, (l, c, u) => {
    if (!l.isInline)
      return;
    let d = l.marks;
    if (!r.isInSet(d) && u.type.allowsMarkType(r.type)) {
      let f = Math.max(c, e), h = Math.min(c + l.nodeSize, n), p = r.addToSet(d);
      for (let g = 0; g < d.length; g++)
        d[g].isInSet(p) || (s && s.to == f && s.mark.eq(d[g]) ? s.to = h : i.push(s = new Wr(f, h, d[g])));
      a && a.to == f ? a.to = h : o.push(a = new Mi(f, h, r));
    }
  }), i.forEach((l) => t.step(l)), o.forEach((l) => t.step(l));
}
function Qk(t, e, n, r) {
  let i = [], o = 0;
  t.doc.nodesBetween(e, n, (s, a) => {
    if (!s.isInline)
      return;
    o++;
    let l = null;
    if (r instanceof hl) {
      let c = s.marks, u;
      for (; u = r.isInSet(c); )
        (l || (l = [])).push(u), c = u.removeFromSet(c);
    } else r ? r.isInSet(s.marks) && (l = [r]) : l = s.marks;
    if (l && l.length) {
      let c = Math.min(a + s.nodeSize, n);
      for (let u = 0; u < l.length; u++) {
        let d = l[u], f;
        for (let h = 0; h < i.length; h++) {
          let p = i[h];
          p.step == o - 1 && d.eq(i[h].style) && (f = p);
        }
        f ? (f.to = c, f.step = o) : i.push({ style: d, from: Math.max(a, e), to: c, step: o });
      }
    }
  }), i.forEach((s) => t.step(new Wr(s.from, s.to, s.style)));
}
function Vf(t, e, n, r = n.contentMatch, i = !0) {
  let o = t.doc.nodeAt(e), s = [], a = e + 1;
  for (let l = 0; l < o.childCount; l++) {
    let c = o.child(l), u = a + c.nodeSize, d = r.matchType(c.type);
    if (!d)
      s.push(new Hn(a, u, dt.empty));
    else {
      r = d;
      for (let f = 0; f < c.marks.length; f++)
        n.allowsMarkType(c.marks[f].type) || t.step(new Wr(a, u, c.marks[f]));
      if (i && c.isText && n.whitespace != "pre") {
        let f, h = /\r?\n|\r/g, p;
        for (; f = h.exec(c.text); )
          p || (p = new dt(ze.from(n.schema.text(" ", n.allowedMarks(c.marks))), 0, 0)), s.push(new Hn(a + f.index, a + f.index + f[0].length, p));
      }
    }
    a = u;
  }
  if (!r.validEnd) {
    let l = r.fillBefore(ze.empty, !0);
    t.replace(a, a, new dt(l, 0, 0));
  }
  for (let l = s.length - 1; l >= 0; l--)
    t.step(s[l]);
}
function eS(t, e, n) {
  return (e == 0 || t.canReplace(e, t.childCount)) && (n == t.childCount || t.canReplace(0, n));
}
function jo(t) {
  let n = t.parent.content.cutByIndex(t.startIndex, t.endIndex);
  for (let r = t.depth, i = 0, o = 0; ; --r) {
    let s = t.$from.node(r), a = t.$from.index(r) + i, l = t.$to.indexAfter(r) - o;
    if (r < t.depth && s.canReplace(a, l, n))
      return r;
    if (r == 0 || s.type.spec.isolating || !eS(s, a, l))
      break;
    a && (i = 1), l < s.childCount && (o = 1);
  }
  return null;
}
function tS(t, e, n) {
  let { $from: r, $to: i, depth: o } = e, s = r.before(o + 1), a = i.after(o + 1), l = s, c = a, u = ze.empty, d = 0;
  for (let p = o, g = !1; p > n; p--)
    g || r.index(p) > 0 ? (g = !0, u = ze.from(r.node(p).copy(u)), d++) : l--;
  let f = ze.empty, h = 0;
  for (let p = o, g = !1; p > n; p--)
    g || i.after(p + 1) < i.end(p) ? (g = !0, f = ze.from(i.node(p).copy(f)), h++) : c++;
  t.step(new Kn(l, c, s, a, new dt(u.append(f), d, h), u.size - d, !0));
}
function Ub(t, e, n = null, r = t) {
  let i = nS(t, e), o = i && rS(r, e);
  return o ? i.map(Cp).concat({ type: e, attrs: n }).concat(o.map(Cp)) : null;
}
function Cp(t) {
  return { type: t, attrs: null };
}
function nS(t, e) {
  let { parent: n, startIndex: r, endIndex: i } = t, o = n.contentMatchAt(r).findWrapping(e);
  if (!o)
    return null;
  let s = o.length ? o[0] : e;
  return n.canReplaceWith(r, i, s) ? o : null;
}
function rS(t, e) {
  let { parent: n, startIndex: r, endIndex: i } = t, o = n.child(r), s = e.contentMatch.findWrapping(o.type);
  if (!s)
    return null;
  let l = (s.length ? s[s.length - 1] : e).contentMatch;
  for (let c = r; l && c < i; c++)
    l = l.matchType(n.child(c).type);
  return !l || !l.validEnd ? null : s;
}
function iS(t, e, n) {
  let r = ze.empty;
  for (let s = n.length - 1; s >= 0; s--) {
    if (r.size) {
      let a = n[s].type.contentMatch.matchFragment(r);
      if (!a || !a.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = ze.from(n[s].type.create(n[s].attrs, r));
  }
  let i = e.start, o = e.end;
  t.step(new Kn(i, o, i, o, new dt(r, 0, 0), n.length, !0));
}
function oS(t, e, n, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let o = t.steps.length;
  t.doc.nodesBetween(e, n, (s, a) => {
    let l = typeof i == "function" ? i(s) : i;
    if (s.isTextblock && !s.hasMarkup(r, l) && sS(t.doc, t.mapping.slice(o).map(a), r)) {
      let c = null;
      if (r.schema.linebreakReplacement) {
        let h = r.whitespace == "pre", p = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        h && !p ? c = !1 : !h && p && (c = !0);
      }
      c === !1 && Yb(t, s, a, o), Vf(t, t.mapping.slice(o).map(a, 1), r, void 0, c === null);
      let u = t.mapping.slice(o), d = u.map(a, 1), f = u.map(a + s.nodeSize, 1);
      return t.step(new Kn(d, f, d + 1, f - 1, new dt(ze.from(r.create(l, null, s.marks)), 0, 0), 1, !0)), c === !0 && Gb(t, s, a, o), !1;
    }
  });
}
function Gb(t, e, n, r) {
  e.forEach((i, o) => {
    if (i.isText) {
      let s, a = /\r?\n|\r/g;
      for (; s = a.exec(i.text); ) {
        let l = t.mapping.slice(r).map(n + 1 + o + s.index);
        t.replaceWith(l, l + 1, e.type.schema.linebreakReplacement.create());
      }
    }
  });
}
function Yb(t, e, n, r) {
  e.forEach((i, o) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let s = t.mapping.slice(r).map(n + 1 + o);
      t.replaceWith(s, s + 1, e.type.schema.text(`
`));
    }
  });
}
function sS(t, e, n) {
  let r = t.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, n);
}
function aS(t, e, n, r, i) {
  let o = t.doc.nodeAt(e);
  if (!o)
    throw new RangeError("No node at given position");
  n || (n = o.type);
  let s = n.create(r, null, i || o.marks);
  if (o.isLeaf)
    return t.replaceWith(e, e + o.nodeSize, s);
  if (!n.validContent(o.content))
    throw new RangeError("Invalid content for node type " + n.name);
  t.step(new Kn(e, e + o.nodeSize, e + 1, e + o.nodeSize - 1, new dt(ze.from(s), 0, 0), 1, !0));
}
function ui(t, e, n = 1, r) {
  let i = t.resolve(e), o = i.depth - n, s = r && r[r.length - 1] || i.parent;
  if (o < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !s.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
    return !1;
  for (let c = i.depth - 1, u = n - 2; c > o; c--, u--) {
    let d = i.node(c), f = i.index(c);
    if (d.type.spec.isolating)
      return !1;
    let h = d.content.cutByIndex(f, d.childCount), p = r && r[u + 1];
    p && (h = h.replaceChild(0, p.type.create(p.attrs)));
    let g = r && r[u] || d;
    if (!d.canReplace(f + 1, d.childCount) || !g.type.validContent(h))
      return !1;
  }
  let a = i.indexAfter(o), l = r && r[0];
  return i.node(o).canReplaceWith(a, a, l ? l.type : i.node(o + 1).type);
}
function lS(t, e, n = 1, r) {
  let i = t.doc.resolve(e), o = ze.empty, s = ze.empty;
  for (let a = i.depth, l = i.depth - n, c = n - 1; a > l; a--, c--) {
    o = ze.from(i.node(a).copy(o));
    let u = r && r[c];
    s = ze.from(u ? u.type.create(u.attrs, s) : i.node(a).copy(s));
  }
  t.step(new Hn(e, e, new dt(o.append(s), n, n), !0));
}
function so(t, e) {
  let n = t.resolve(e), r = n.index();
  return Xb(n.nodeBefore, n.nodeAfter) && n.parent.canReplace(r, r + 1);
}
function cS(t, e) {
  e.content.size || t.type.compatibleContent(e.type);
  let n = t.contentMatchAt(t.childCount), { linebreakReplacement: r } = t.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let o = e.child(i), s = o.type == r ? t.type.schema.nodes.text : o.type;
    if (n = n.matchType(s), !n || !t.type.allowsMarks(o.marks))
      return !1;
  }
  return n.validEnd;
}
function Xb(t, e) {
  return !!(t && e && !t.isLeaf && cS(t, e));
}
function pl(t, e, n = -1) {
  let r = t.resolve(e);
  for (let i = r.depth; ; i--) {
    let o, s, a = r.index(i);
    if (i == r.depth ? (o = r.nodeBefore, s = r.nodeAfter) : n > 0 ? (o = r.node(i + 1), a++, s = r.node(i).maybeChild(a)) : (o = r.node(i).maybeChild(a - 1), s = r.node(i + 1)), o && !o.isTextblock && Xb(o, s) && r.node(i).canReplace(a, a + 1))
      return e;
    if (i == 0)
      break;
    e = n < 0 ? r.before(i) : r.after(i);
  }
}
function uS(t, e, n) {
  let r = null, { linebreakReplacement: i } = t.doc.type.schema, o = t.doc.resolve(e - n), s = o.node().type;
  if (i && s.inlineContent) {
    let u = s.whitespace == "pre", d = !!s.contentMatch.matchType(i);
    u && !d ? r = !1 : !u && d && (r = !0);
  }
  let a = t.steps.length;
  if (r === !1) {
    let u = t.doc.resolve(e + n);
    Yb(t, u.node(), u.before(), a);
  }
  s.inlineContent && Vf(t, e + n - 1, s, o.node().contentMatchAt(o.index()), r == null);
  let l = t.mapping.slice(a), c = l.map(e - n);
  if (t.step(new Hn(c, l.map(e + n, -1), dt.empty, !0)), r === !0) {
    let u = t.doc.resolve(c);
    Gb(t, u.node(), u.before(), t.steps.length);
  }
  return t;
}
function dS(t, e, n) {
  let r = t.resolve(e);
  if (r.parent.canReplaceWith(r.index(), r.index(), n))
    return e;
  if (r.parentOffset == 0)
    for (let i = r.depth - 1; i >= 0; i--) {
      let o = r.index(i);
      if (r.node(i).canReplaceWith(o, o, n))
        return r.before(i + 1);
      if (o > 0)
        return null;
    }
  if (r.parentOffset == r.parent.content.size)
    for (let i = r.depth - 1; i >= 0; i--) {
      let o = r.indexAfter(i);
      if (r.node(i).canReplaceWith(o, o, n))
        return r.after(i + 1);
      if (o < r.node(i).childCount)
        return null;
    }
  return null;
}
function gl(t, e, n = e, r = dt.empty) {
  if (e == n && !r.size)
    return null;
  let i = t.resolve(e), o = t.resolve(n);
  return Vb(i, o, r) ? new Hn(e, n, r) : new fS(i, o, r).fit();
}
function Vb(t, e, n) {
  return !n.openStart && !n.openEnd && t.start() == e.start() && t.parent.canReplace(t.index(), e.index(), n.content);
}
class fS {
  constructor(e, n, r) {
    this.$from = e, this.$to = n, this.unplaced = r, this.frontier = [], this.placed = ze.empty;
    for (let i = 0; i <= e.depth; i++) {
      let o = e.node(i);
      this.frontier.push({
        type: o.type,
        match: o.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = ze.from(e.node(i).copy(this.placed));
  }
  get depth() {
    return this.frontier.length - 1;
  }
  fit() {
    for (; this.unplaced.size; ) {
      let c = this.findFittable();
      c ? this.placeNodes(c) : this.openMore() || this.dropNode();
    }
    let e = this.mustMoveInline(), n = this.placed.size - this.depth - this.$from.depth, r = this.$from, i = this.close(e < 0 ? this.$to : r.doc.resolve(e));
    if (!i)
      return null;
    let o = this.placed, s = r.depth, a = i.depth;
    for (; s && a && o.childCount == 1; )
      o = o.firstChild.content, s--, a--;
    let l = new dt(o, s, a);
    return e > -1 ? new Kn(r.pos, e, this.$to.pos, this.$to.end(), l, n) : l.size || r.pos != this.$to.pos ? new Hn(r.pos, i.pos, l) : null;
  }
  // Find a position on the start spine of `this.unplaced` that has
  // content that can be moved somewhere on the frontier. Returns two
  // depths, one for the slice and one for the frontier.
  findFittable() {
    let e = this.unplaced.openStart;
    for (let n = this.unplaced.content, r = 0, i = this.unplaced.openEnd; r < e; r++) {
      let o = n.firstChild;
      if (n.childCount > 1 && (i = 0), o.type.spec.isolating && i <= r) {
        e = r;
        break;
      }
      n = o.content;
    }
    for (let n = 1; n <= 2; n++)
      for (let r = n == 1 ? e : this.unplaced.openStart; r >= 0; r--) {
        let i, o = null;
        r ? (o = Vl(this.unplaced.content, r - 1).firstChild, i = o.content) : i = this.unplaced.content;
        let s = i.firstChild;
        for (let a = this.depth; a >= 0; a--) {
          let { type: l, match: c } = this.frontier[a], u, d = null;
          if (n == 1 && (s ? c.matchType(s.type) || (d = c.fillBefore(ze.from(s), !1)) : o && l.compatibleContent(o.type)))
            return { sliceDepth: r, frontierDepth: a, parent: o, inject: d };
          if (n == 2 && s && (u = c.findWrapping(s.type)))
            return { sliceDepth: r, frontierDepth: a, parent: o, wrap: u };
          if (o && c.matchType(o.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: n, openEnd: r } = this.unplaced, i = Vl(e, n);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new dt(e, n + 1, Math.max(r, i.size + n >= e.size - r ? n + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: n, openEnd: r } = this.unplaced, i = Vl(e, n);
    if (i.childCount <= 1 && n > 0) {
      let o = e.size - n <= n + i.size;
      this.unplaced = new dt(hs(e, n - 1, 1), n - 1, o ? n - 1 : r);
    } else
      this.unplaced = new dt(hs(e, n, 1), n, r);
  }
  // Move content from the unplaced slice at `sliceDepth` to the
  // frontier node at `frontierDepth`. Close that frontier node when
  // applicable.
  placeNodes({ sliceDepth: e, frontierDepth: n, parent: r, inject: i, wrap: o }) {
    for (; this.depth > n; )
      this.closeFrontierNode();
    if (o)
      for (let g = 0; g < o.length; g++)
        this.openFrontierNode(o[g]);
    let s = this.unplaced, a = r ? r.content : s.content, l = s.openStart - e, c = 0, u = [], { match: d, type: f } = this.frontier[n];
    if (i) {
      for (let g = 0; g < i.childCount; g++)
        u.push(i.child(g));
      d = d.matchFragment(i);
    }
    let h = a.size + e - (s.content.size - s.openEnd);
    for (; c < a.childCount; ) {
      let g = a.child(c), y = d.matchType(g.type);
      if (!y)
        break;
      c++, (c > 1 || l == 0 || g.content.size) && (d = y, u.push(Jb(g.mark(f.allowedMarks(g.marks)), c == 1 ? l : 0, c == a.childCount ? h : -1)));
    }
    let p = c == a.childCount;
    p || (h = -1), this.placed = ps(this.placed, n, ze.from(u)), this.frontier[n].match = d, p && h < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let g = 0, y = a; g < h; g++) {
      let m = y.lastChild;
      this.frontier.push({ type: m.type, match: m.contentMatchAt(m.childCount) }), y = m.content;
    }
    this.unplaced = p ? e == 0 ? dt.empty : new dt(hs(s.content, e - 1, 1), e - 1, h < 0 ? s.openEnd : e - 1) : new dt(hs(s.content, e, c), s.openStart, s.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], n;
    if (!e.type.isTextblock || !Jl(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (n = this.findCloseLevel(this.$to)) && n.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e: for (let n = Math.min(this.depth, e.depth); n >= 0; n--) {
      let { match: r, type: i } = this.frontier[n], o = n < e.depth && e.end(n + 1) == e.pos + (e.depth - (n + 1)), s = Jl(e, n, i, r, o);
      if (s) {
        for (let a = n - 1; a >= 0; a--) {
          let { match: l, type: c } = this.frontier[a], u = Jl(e, a, c, l, !0);
          if (!u || u.childCount)
            continue e;
        }
        return { depth: n, fit: s, move: o ? e.doc.resolve(e.after(n + 1)) : e };
      }
    }
  }
  close(e) {
    let n = this.findCloseLevel(e);
    if (!n)
      return null;
    for (; this.depth > n.depth; )
      this.closeFrontierNode();
    n.fit.childCount && (this.placed = ps(this.placed, n.depth, n.fit)), e = n.move;
    for (let r = n.depth + 1; r <= e.depth; r++) {
      let i = e.node(r), o = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, o);
    }
    return e;
  }
  openFrontierNode(e, n = null, r) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = ps(this.placed, this.depth, ze.from(e.create(n, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let n = this.frontier.pop().match.fillBefore(ze.empty, !0);
    n.childCount && (this.placed = ps(this.placed, this.frontier.length, n));
  }
}
function hs(t, e, n) {
  return e == 0 ? t.cutByIndex(n, t.childCount) : t.replaceChild(0, t.firstChild.copy(hs(t.firstChild.content, e - 1, n)));
}
function ps(t, e, n) {
  return e == 0 ? t.append(n) : t.replaceChild(t.childCount - 1, t.lastChild.copy(ps(t.lastChild.content, e - 1, n)));
}
function Vl(t, e) {
  for (let n = 0; n < e; n++)
    t = t.firstChild.content;
  return t;
}
function Jb(t, e, n) {
  if (e <= 0)
    return t;
  let r = t.content;
  return e > 1 && (r = r.replaceChild(0, Jb(r.firstChild, e - 1, r.childCount == 1 ? n - 1 : 0))), e > 0 && (r = t.type.contentMatch.fillBefore(r).append(r), n <= 0 && (r = r.append(t.type.contentMatch.matchFragment(r).fillBefore(ze.empty, !0)))), t.copy(r);
}
function Jl(t, e, n, r, i) {
  let o = t.node(e), s = i ? t.indexAfter(e) : t.index(e);
  if (s == o.childCount && !n.compatibleContent(o.type))
    return null;
  let a = r.fillBefore(o.content, !0, s);
  return a && !hS(n, o.content, s) ? a : null;
}
function hS(t, e, n) {
  for (let r = n; r < e.childCount; r++)
    if (!t.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function pS(t) {
  return t.spec.defining || t.spec.definingForContent;
}
function gS(t, e, n, r) {
  if (!r.size)
    return t.deleteRange(e, n);
  let i = t.doc.resolve(e), o = t.doc.resolve(n);
  if (Vb(i, o, r))
    return t.step(new Hn(e, n, r));
  let s = Qb(i, o);
  s[s.length - 1] == 0 && s.pop();
  let a = -(i.depth + 1);
  s.unshift(a);
  for (let f = i.depth, h = i.pos - 1; f > 0; f--, h--) {
    let p = i.node(f).type.spec;
    if (p.defining || p.definingAsContext || p.isolating)
      break;
    s.indexOf(f) > -1 ? a = f : i.before(f) == h && s.splice(1, 0, -f);
  }
  let l = s.indexOf(a), c = [], u = r.openStart;
  for (let f = r.content, h = 0; ; h++) {
    let p = f.firstChild;
    if (c.push(p), h == r.openStart)
      break;
    f = p.content;
  }
  for (let f = u - 1; f >= 0; f--) {
    let h = c[f], p = pS(h.type);
    if (p && !h.sameMarkup(i.node(Math.abs(a) - 1)))
      u = f;
    else if (p || !h.type.isTextblock)
      break;
  }
  for (let f = r.openStart; f >= 0; f--) {
    let h = (f + u + 1) % (r.openStart + 1), p = c[h];
    if (p)
      for (let g = 0; g < s.length; g++) {
        let y = s[(g + l) % s.length], m = !0;
        y < 0 && (m = !1, y = -y);
        let b = i.node(y - 1), C = i.index(y - 1);
        if (b.canReplaceWith(C, C, p.type, p.marks))
          return t.replace(i.before(y), m ? o.after(y) : n, new dt(Zb(r.content, 0, r.openStart, h), h, r.openEnd));
      }
  }
  let d = t.steps.length;
  for (let f = s.length - 1; f >= 0 && (t.replace(e, n, r), !(t.steps.length > d)); f--) {
    let h = s[f];
    h < 0 || (e = i.before(h), n = o.after(h));
  }
}
function Zb(t, e, n, r, i) {
  if (e < n) {
    let o = t.firstChild;
    t = t.replaceChild(0, o.copy(Zb(o.content, e + 1, n, r, o)));
  }
  if (e > r) {
    let o = i.contentMatchAt(0), s = o.fillBefore(t).append(t);
    t = s.append(o.matchFragment(s).fillBefore(ze.empty, !0));
  }
  return t;
}
function mS(t, e, n, r) {
  if (!r.isInline && e == n && t.doc.resolve(e).parent.content.size) {
    let i = dS(t.doc, e, r.type);
    i != null && (e = n = i);
  }
  t.replaceRange(e, n, new dt(ze.from(r), 0, 0));
}
function yS(t, e, n) {
  let r = t.doc.resolve(e), i = t.doc.resolve(n);
  if (r.parent.isTextblock && i.parent.isTextblock && r.start() != i.start() && r.parentOffset == 0 && i.parentOffset == 0) {
    let s = r.sharedDepth(n), a = !1;
    for (let l = r.depth; l > s; l--)
      r.node(l).type.spec.isolating && (a = !0);
    for (let l = i.depth; l > s; l--)
      i.node(l).type.spec.isolating && (a = !0);
    if (!a) {
      for (let l = r.depth; l > 0 && e == r.start(l); l--)
        e = r.before(l);
      for (let l = i.depth; l > 0 && n == i.start(l); l--)
        n = i.before(l);
      r = t.doc.resolve(e), i = t.doc.resolve(n);
    }
  }
  let o = Qb(r, i);
  for (let s = 0; s < o.length; s++) {
    let a = o[s], l = s == o.length - 1;
    if (l && a == 0 || r.node(a).type.contentMatch.validEnd)
      return t.delete(r.start(a), i.end(a));
    if (a > 0 && (l || r.node(a - 1).canReplace(r.index(a - 1), i.indexAfter(a - 1))))
      return t.delete(r.before(a), i.after(a));
  }
  for (let s = 1; s <= r.depth && s <= i.depth; s++)
    if (e - r.start(s) == r.depth - s && n > r.end(s) && i.end(s) - n != i.depth - s && r.start(s - 1) == i.start(s - 1) && r.node(s - 1).canReplace(r.index(s - 1), i.index(s - 1)))
      return t.delete(r.before(s), n);
  t.delete(e, n);
}
function Qb(t, e) {
  let n = [], r = Math.min(t.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let o = t.start(i);
    if (o < t.pos - (t.depth - i) || e.end(i) > e.pos + (e.depth - i) || t.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (o == e.start(i) || i == t.depth && i == e.depth && t.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == o - 1) && n.push(i);
  }
  return n;
}
class Lo extends Zn {
  /**
  Construct an attribute step.
  */
  constructor(e, n, r) {
    super(), this.pos = e, this.attr = n, this.value = r;
  }
  apply(e) {
    let n = e.nodeAt(this.pos);
    if (!n)
      return Bn.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let o in n.attrs)
      r[o] = n.attrs[o];
    r[this.attr] = this.value;
    let i = n.type.create(r, null, n.marks);
    return Bn.fromReplace(e, this.pos, this.pos + 1, new dt(ze.from(i), 0, n.isLeaf ? 0 : 1));
  }
  getMap() {
    return br.empty;
  }
  invert(e) {
    return new Lo(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let n = e.mapResult(this.pos, 1);
    return n.deletedAfter ? null : new Lo(n.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, n) {
    if (typeof n.pos != "number" || typeof n.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new Lo(n.pos, n.attr, n.value);
  }
}
Zn.jsonID("attr", Lo);
class As extends Zn {
  /**
  Construct an attribute step.
  */
  constructor(e, n) {
    super(), this.attr = e, this.value = n;
  }
  apply(e) {
    let n = /* @__PURE__ */ Object.create(null);
    for (let i in e.attrs)
      n[i] = e.attrs[i];
    n[this.attr] = this.value;
    let r = e.type.create(n, e.content, e.marks);
    return Bn.ok(r);
  }
  getMap() {
    return br.empty;
  }
  invert(e) {
    return new As(this.attr, e.attrs[this.attr]);
  }
  map(e) {
    return this;
  }
  toJSON() {
    return { stepType: "docAttr", attr: this.attr, value: this.value };
  }
  static fromJSON(e, n) {
    if (typeof n.attr != "string")
      throw new RangeError("Invalid input for DocAttrStep.fromJSON");
    return new As(n.attr, n.value);
  }
}
Zn.jsonID("docAttr", As);
let Fo = class extends Error {
};
Fo = function t(e) {
  let n = Error.call(this, e);
  return n.__proto__ = t.prototype, n;
};
Fo.prototype = Object.create(Error.prototype);
Fo.prototype.constructor = Fo;
Fo.prototype.name = "TransformError";
class bS {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new Ua();
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
    let n = this.maybeStep(e);
    if (n.failed)
      throw new Fo(n.failed);
    return this;
  }
  /**
  Try to apply a step in this transformation, ignoring it if it
  fails. Returns the step result.
  */
  maybeStep(e) {
    let n = e.apply(this.doc);
    return n.failed || this.addStep(e, n.doc), n;
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
    let e = 1e9, n = -1e9;
    for (let r = 0; r < this.mapping.maps.length; r++) {
      let i = this.mapping.maps[r];
      r && (e = i.map(e, 1), n = i.map(n, -1)), i.forEach((o, s, a, l) => {
        e = Math.min(e, a), n = Math.max(n, l);
      });
    }
    return e == 1e9 ? null : { from: e, to: n };
  }
  /**
  @internal
  */
  addStep(e, n) {
    this.docs.push(this.doc), this.steps.push(e), this.mapping.appendMap(e.getMap()), this.doc = n;
  }
  /**
  Replace the part of the document between `from` and `to` with the
  given `slice`.
  */
  replace(e, n = e, r = dt.empty) {
    let i = gl(this.doc, e, n, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, n, r) {
    return this.replace(e, n, new dt(ze.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, n) {
    return this.replace(e, n, dt.empty);
  }
  /**
  Insert the given content at the given position.
  */
  insert(e, n) {
    return this.replaceWith(e, e, n);
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
  replaceRange(e, n, r) {
    return gS(this, e, n, r), this;
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
  replaceRangeWith(e, n, r) {
    return mS(this, e, n, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, n) {
    return yS(this, e, n), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, n) {
    return tS(this, e, n), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, n = 1) {
    return uS(this, e, n), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, n) {
    return iS(this, e, n), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, n = e, r, i = null) {
    return oS(this, e, n, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, n, r = null, i) {
    return aS(this, e, n, r, i), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  The `pos` addresses the document content. Use `setDocAttribute`
  to set attributes on the document itself.
  */
  setNodeAttribute(e, n, r) {
    return this.step(new Lo(e, n, r)), this;
  }
  /**
  Set a single attribute on the document to a new value.
  */
  setDocAttribute(e, n) {
    return this.step(new As(e, n)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(e, n) {
    return this.step(new Ii(e, n)), this;
  }
  /**
  Remove a mark (or all marks of the given type) from the node at
  position `pos`.
  */
  removeNodeMark(e, n) {
    let r = this.doc.nodeAt(e);
    if (!r)
      throw new RangeError("No node at position " + e);
    if (n instanceof Rn)
      n.isInSet(r.marks) && this.step(new no(e, n));
    else {
      let i = r.marks, o, s = [];
      for (; o = n.isInSet(i); )
        s.push(new no(e, o)), i = o.removeFromSet(i);
      for (let a = s.length - 1; a >= 0; a--)
        this.step(s[a]);
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
  split(e, n = 1, r) {
    return lS(this, e, n, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, n, r) {
    return Zk(this, e, n, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, n, r) {
    return Qk(this, e, n, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, n, r) {
    return Vf(this, e, n, r), this;
  }
}
const Zl = /* @__PURE__ */ Object.create(null);
class _n {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, n, r) {
    this.$anchor = e, this.$head = n, this.ranges = r || [new vS(e.min(n), e.max(n))];
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
    for (let n = 0; n < e.length; n++)
      if (e[n].$from.pos != e[n].$to.pos)
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
  replace(e, n = dt.empty) {
    let r = n.content.lastChild, i = null;
    for (let a = 0; a < n.openEnd; a++)
      i = r, r = r.lastChild;
    let o = e.steps.length, s = this.ranges;
    for (let a = 0; a < s.length; a++) {
      let { $from: l, $to: c } = s[a], u = e.mapping.slice(o);
      e.replaceRange(u.map(l.pos), u.map(c.pos), a ? dt.empty : n), a == 0 && Ep(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
    }
  }
  /**
  Replace the selection with the given node, appending the changes
  to the given transaction.
  */
  replaceWith(e, n) {
    let r = e.steps.length, i = this.ranges;
    for (let o = 0; o < i.length; o++) {
      let { $from: s, $to: a } = i[o], l = e.mapping.slice(r), c = l.map(s.pos), u = l.map(a.pos);
      o ? e.deleteRange(c, u) : (e.replaceRangeWith(c, u, n), Ep(e, r, n.isInline ? -1 : 1));
    }
  }
  /**
  Find a valid cursor or leaf node selection starting at the given
  position and searching back if `dir` is negative, and forward if
  positive. When `textOnly` is true, only consider cursor
  selections. Will return null when no valid selection position is
  found.
  */
  static findFrom(e, n, r = !1) {
    let i = e.parent.inlineContent ? new cr(e) : Ro(e.node(0), e.parent, e.pos, e.index(), n, r);
    if (i)
      return i;
    for (let o = e.depth - 1; o >= 0; o--) {
      let s = n < 0 ? Ro(e.node(0), e.node(o), e.before(o + 1), e.index(o), n, r) : Ro(e.node(0), e.node(o), e.after(o + 1), e.index(o) + 1, n, r);
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
  static near(e, n = 1) {
    return this.findFrom(e, n) || this.findFrom(e, -n) || new jr(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return Ro(e, e, 0, 0, 1) || new jr(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return Ro(e, e, e.content.size, e.childCount, -1) || new jr(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, n) {
    if (!n || !n.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = Zl[n.type];
    if (!r)
      throw new RangeError(`No selection type ${n.type} defined`);
    return r.fromJSON(e, n);
  }
  /**
  To be able to deserialize selections from JSON, custom selection
  classes must register themselves with an ID string, so that they
  can be disambiguated. Try to pick something that's unlikely to
  clash with classes from other modules.
  */
  static jsonID(e, n) {
    if (e in Zl)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return Zl[e] = n, n.prototype.jsonID = e, n;
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
    return cr.between(this.$anchor, this.$head).getBookmark();
  }
}
_n.prototype.visible = !0;
class vS {
  /**
  Create a range.
  */
  constructor(e, n) {
    this.$from = e, this.$to = n;
  }
}
let Rp = !1;
function Tp(t) {
  !Rp && !t.parent.inlineContent && (Rp = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + t.parent.type.name + ")"));
}
class cr extends _n {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, n = e) {
    Tp(e), Tp(n), super(e, n);
  }
  /**
  Returns a resolved position if this is a cursor selection (an
  empty text selection), and null otherwise.
  */
  get $cursor() {
    return this.$anchor.pos == this.$head.pos ? this.$head : null;
  }
  map(e, n) {
    let r = e.resolve(n.map(this.head));
    if (!r.parent.inlineContent)
      return _n.near(r);
    let i = e.resolve(n.map(this.anchor));
    return new cr(i.parent.inlineContent ? i : r, r);
  }
  replace(e, n = dt.empty) {
    if (super.replace(e, n), n == dt.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof cr && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new ml(this.anchor, this.head);
  }
  toJSON() {
    return { type: "text", anchor: this.anchor, head: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.anchor != "number" || typeof n.head != "number")
      throw new RangeError("Invalid input for TextSelection.fromJSON");
    return new cr(e.resolve(n.anchor), e.resolve(n.head));
  }
  /**
  Create a text selection from non-resolved positions.
  */
  static create(e, n, r = n) {
    let i = e.resolve(n);
    return new this(i, r == n ? i : e.resolve(r));
  }
  /**
  Return a text selection that spans the given positions or, if
  they aren't text positions, find a text selection near them.
  `bias` determines whether the method searches forward (default)
  or backwards (negative number) first. Will fall back to calling
  [`Selection.near`](https://prosemirror.net/docs/ref/#state.Selection^near) when the document
  doesn't contain a valid text position.
  */
  static between(e, n, r) {
    let i = e.pos - n.pos;
    if ((!r || i) && (r = i >= 0 ? 1 : -1), !n.parent.inlineContent) {
      let o = _n.findFrom(n, r, !0) || _n.findFrom(n, -r, !0);
      if (o)
        n = o.$head;
      else
        return _n.near(n, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = n : (e = (_n.findFrom(e, -r, !0) || _n.findFrom(e, r, !0)).$anchor, e.pos < n.pos != i < 0 && (e = n))), new cr(e, n);
  }
}
_n.jsonID("text", cr);
class ml {
  constructor(e, n) {
    this.anchor = e, this.head = n;
  }
  map(e) {
    return new ml(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return cr.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class Tn extends _n {
  /**
  Create a node selection. Does not verify the validity of its
  argument.
  */
  constructor(e) {
    let n = e.nodeAfter, r = e.node(0).resolve(e.pos + n.nodeSize);
    super(e, r), this.node = n;
  }
  map(e, n) {
    let { deleted: r, pos: i } = n.mapResult(this.anchor), o = e.resolve(i);
    return r ? _n.near(o) : new Tn(o);
  }
  content() {
    return new dt(ze.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof Tn && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new Jf(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new Tn(e.resolve(n.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, n) {
    return new Tn(e.resolve(n));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
Tn.prototype.visible = !1;
_n.jsonID("node", Tn);
class Jf {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: n, pos: r } = e.mapResult(this.anchor);
    return n ? new ml(r, r) : new Jf(r);
  }
  resolve(e) {
    let n = e.resolve(this.anchor), r = n.nodeAfter;
    return r && Tn.isSelectable(r) ? new Tn(n) : _n.near(n);
  }
}
class jr extends _n {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, n = dt.empty) {
    if (n == dt.empty) {
      e.delete(0, e.doc.content.size);
      let r = _n.atStart(e.doc);
      r.eq(e.selection) || e.setSelection(r);
    } else
      super.replace(e, n);
  }
  toJSON() {
    return { type: "all" };
  }
  /**
  @internal
  */
  static fromJSON(e) {
    return new jr(e);
  }
  map(e) {
    return new jr(e);
  }
  eq(e) {
    return e instanceof jr;
  }
  getBookmark() {
    return wS;
  }
}
_n.jsonID("all", jr);
const wS = {
  map() {
    return this;
  },
  resolve(t) {
    return new jr(t);
  }
};
function Ro(t, e, n, r, i, o = !1) {
  if (e.inlineContent)
    return cr.create(t, n);
  for (let s = r - (i > 0 ? 0 : 1); i > 0 ? s < e.childCount : s >= 0; s += i) {
    let a = e.child(s);
    if (a.isAtom) {
      if (!o && Tn.isSelectable(a))
        return Tn.create(t, n - (i < 0 ? a.nodeSize : 0));
    } else {
      let l = Ro(t, a, n + i, i < 0 ? a.childCount : 0, i, o);
      if (l)
        return l;
    }
    n += a.nodeSize * i;
  }
  return null;
}
function Ep(t, e, n) {
  let r = t.steps.length - 1;
  if (r < e)
    return;
  let i = t.steps[r];
  if (!(i instanceof Hn || i instanceof Kn))
    return;
  let o = t.mapping.maps[r], s;
  o.forEach((a, l, c, u) => {
    s == null && (s = u);
  }), t.setSelection(_n.near(t.doc.resolve(s), n));
}
function Mp(t, e) {
  return !e || !t ? t : t.bind(e);
}
class ga {
  constructor(e, n, r) {
    this.name = e, this.init = Mp(n.init, r), this.apply = Mp(n.apply, r);
  }
}
new ga("doc", {
  init(t) {
    return t.doc || t.schema.topNodeType.createAndFill();
  },
  apply(t) {
    return t.doc;
  }
}), new ga("selection", {
  init(t, e) {
    return t.selection || _n.atStart(e.doc);
  },
  apply(t) {
    return t.selection;
  }
}), new ga("storedMarks", {
  init(t) {
    return t.storedMarks || null;
  },
  apply(t, e, n, r) {
    return r.selection.$cursor ? t.storedMarks : null;
  }
}), new ga("scrollToSelection", {
  init() {
    return 0;
  },
  apply(t, e) {
    return t.scrolledIntoView ? e + 1 : e;
  }
});
const ev = (t, e) => t.selection.empty ? !1 : (e && e(t.tr.deleteSelection().scrollIntoView()), !0);
function tv(t, e) {
  let { $cursor: n } = t.selection;
  return !n || (e ? !e.endOfTextblock("backward", t) : n.parentOffset > 0) ? null : n;
}
const nv = (t, e, n) => {
  let r = tv(t, n);
  if (!r)
    return !1;
  let i = Zf(r);
  if (!i) {
    let s = r.blockRange(), a = s && jo(s);
    return a == null ? !1 : (e && e(t.tr.lift(s, a).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (dv(t, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (Ho(o, "end") || Tn.isSelectable(o)))
    for (let s = r.depth; ; s--) {
      let a = gl(t.doc, r.before(s), r.after(s), dt.empty);
      if (a && a.slice.size < a.to - a.from) {
        if (e) {
          let l = t.tr.step(a);
          l.setSelection(Ho(o, "end") ? _n.findFrom(l.doc.resolve(l.mapping.map(i.pos, -1)), -1) : Tn.create(l.doc, i.pos - o.nodeSize)), e(l.scrollIntoView());
        }
        return !0;
      }
      if (s == 1 || r.node(s - 1).childCount > 1)
        break;
    }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(t.tr.delete(i.pos - o.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, xS = (t, e, n) => {
  let r = tv(t, n);
  if (!r)
    return !1;
  let i = Zf(r);
  return i ? rv(t, i, e) : !1;
}, kS = (t, e, n) => {
  let r = ov(t, n);
  if (!r)
    return !1;
  let i = Qf(r);
  return i ? rv(t, i, e) : !1;
};
function rv(t, e, n) {
  let r = e.nodeBefore, i = r, o = e.pos - 1;
  for (; !i.isTextblock; o--) {
    if (i.type.spec.isolating)
      return !1;
    let u = i.lastChild;
    if (!u)
      return !1;
    i = u;
  }
  let s = e.nodeAfter, a = s, l = e.pos + 1;
  for (; !a.isTextblock; l++) {
    if (a.type.spec.isolating)
      return !1;
    let u = a.firstChild;
    if (!u)
      return !1;
    a = u;
  }
  let c = gl(t.doc, o, l, dt.empty);
  if (!c || c.from != o || c instanceof Hn && c.slice.size >= l - o)
    return !1;
  if (n) {
    let u = t.tr.step(c);
    u.setSelection(cr.create(u.doc, o)), n(u.scrollIntoView());
  }
  return !0;
}
function Ho(t, e, n = !1) {
  for (let r = t; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (n && r.childCount != 1)
      return !1;
  }
  return !1;
}
const iv = (t, e, n) => {
  let { $head: r, empty: i } = t.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (n ? !n.endOfTextblock("backward", t) : r.parentOffset > 0)
      return !1;
    o = Zf(r);
  }
  let s = o && o.nodeBefore;
  return !s || !Tn.isSelectable(s) ? !1 : (e && e(t.tr.setSelection(Tn.create(t.doc, o.pos - s.nodeSize)).scrollIntoView()), !0);
};
function Zf(t) {
  if (!t.parent.type.spec.isolating)
    for (let e = t.depth - 1; e >= 0; e--) {
      if (t.index(e) > 0)
        return t.doc.resolve(t.before(e + 1));
      if (t.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function ov(t, e) {
  let { $cursor: n } = t.selection;
  return !n || (e ? !e.endOfTextblock("forward", t) : n.parentOffset < n.parent.content.size) ? null : n;
}
const sv = (t, e, n) => {
  let r = ov(t, n);
  if (!r)
    return !1;
  let i = Qf(r);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (dv(t, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (Ho(o, "start") || Tn.isSelectable(o))) {
    let s = gl(t.doc, r.before(), r.after(), dt.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let a = t.tr.step(s);
        a.setSelection(Ho(o, "start") ? _n.findFrom(a.doc.resolve(a.mapping.map(i.pos)), 1) : Tn.create(a.doc, a.mapping.map(i.pos))), e(a.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(t.tr.delete(i.pos, i.pos + o.nodeSize).scrollIntoView()), !0) : !1;
}, av = (t, e, n) => {
  let { $head: r, empty: i } = t.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (n ? !n.endOfTextblock("forward", t) : r.parentOffset < r.parent.content.size)
      return !1;
    o = Qf(r);
  }
  let s = o && o.nodeAfter;
  return !s || !Tn.isSelectable(s) ? !1 : (e && e(t.tr.setSelection(Tn.create(t.doc, o.pos)).scrollIntoView()), !0);
};
function Qf(t) {
  if (!t.parent.type.spec.isolating)
    for (let e = t.depth - 1; e >= 0; e--) {
      let n = t.node(e);
      if (t.index(e) + 1 < n.childCount)
        return t.doc.resolve(t.after(e + 1));
      if (n.type.spec.isolating)
        break;
    }
  return null;
}
const SS = (t, e) => {
  let n = t.selection, r = n instanceof Tn, i;
  if (r) {
    if (n.node.isTextblock || !so(t.doc, n.from))
      return !1;
    i = n.from;
  } else if (i = pl(t.doc, n.from, -1), i == null)
    return !1;
  if (e) {
    let o = t.tr.join(i);
    r && o.setSelection(Tn.create(o.doc, i - t.doc.resolve(i).nodeBefore.nodeSize)), e(o.scrollIntoView());
  }
  return !0;
}, CS = (t, e) => {
  let n = t.selection, r;
  if (n instanceof Tn) {
    if (n.node.isTextblock || !so(t.doc, n.to))
      return !1;
    r = n.to;
  } else if (r = pl(t.doc, n.to, 1), r == null)
    return !1;
  return e && e(t.tr.join(r).scrollIntoView()), !0;
}, RS = (t, e) => {
  let { $from: n, $to: r } = t.selection, i = n.blockRange(r), o = i && jo(i);
  return o == null ? !1 : (e && e(t.tr.lift(i, o).scrollIntoView()), !0);
}, lv = (t, e) => {
  let { $head: n, $anchor: r } = t.selection;
  return !n.parent.type.spec.code || !n.sameParent(r) ? !1 : (e && e(t.tr.insertText(`
`).scrollIntoView()), !0);
};
function eh(t) {
  for (let e = 0; e < t.edgeCount; e++) {
    let { type: n } = t.edge(e);
    if (n.isTextblock && !n.hasRequiredAttrs())
      return n;
  }
  return null;
}
const TS = (t, e) => {
  let { $head: n, $anchor: r } = t.selection;
  if (!n.parent.type.spec.code || !n.sameParent(r))
    return !1;
  let i = n.node(-1), o = n.indexAfter(-1), s = eh(i.contentMatchAt(o));
  if (!s || !i.canReplaceWith(o, o, s))
    return !1;
  if (e) {
    let a = n.after(), l = t.tr.replaceWith(a, a, s.createAndFill());
    l.setSelection(_n.near(l.doc.resolve(a), 1)), e(l.scrollIntoView());
  }
  return !0;
}, cv = (t, e) => {
  let n = t.selection, { $from: r, $to: i } = n;
  if (n instanceof jr || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = eh(i.parent.contentMatchAt(i.indexAfter()));
  if (!o || !o.isTextblock)
    return !1;
  if (e) {
    let s = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, a = t.tr.insert(s, o.createAndFill());
    a.setSelection(cr.create(a.doc, s + 1)), e(a.scrollIntoView());
  }
  return !0;
}, uv = (t, e) => {
  let { $cursor: n } = t.selection;
  if (!n || n.parent.content.size)
    return !1;
  if (n.depth > 1 && n.after() != n.end(-1)) {
    let o = n.before();
    if (ui(t.doc, o))
      return e && e(t.tr.split(o).scrollIntoView()), !0;
  }
  let r = n.blockRange(), i = r && jo(r);
  return i == null ? !1 : (e && e(t.tr.lift(r, i).scrollIntoView()), !0);
};
function ES(t) {
  return (e, n) => {
    if (e.selection instanceof Tn && e.selection.node.isBlock) {
      let { $from: h } = e.selection;
      return !h.parentOffset || !ui(e.doc, h.pos) ? !1 : (n && n(e.tr.split(h.pos).scrollIntoView()), !0);
    }
    if (!e.selection.$from.depth)
      return !1;
    let r = e.tr;
    !e.selection.empty && (e.selection instanceof cr || e.selection instanceof jr) && r.deleteSelection();
    let { $from: i } = r.selection, o = r.steps.length, s = [], a, l, c = !1, u = !1;
    for (let h = i.depth; ; h--)
      if (i.node(h).isBlock) {
        c = i.end(h) == i.pos + (i.depth - h), u = i.start(h) == i.pos - (i.depth - h), l = eh(i.node(h - 1).contentMatchAt(i.indexAfter(h - 1))), s.unshift(c && l ? { type: l } : null), a = h;
        break;
      } else {
        if (h == 1)
          return !1;
        s.unshift(null);
      }
    let d = i.pos, f = ui(r.doc, d, s.length, s);
    if (f || (s[0] = l ? { type: l } : null, f = ui(r.doc, d, s.length, s)), !f)
      return !1;
    if (r.split(d, s.length, s), !c && u && i.node(a).type != l) {
      let h = r.mapping.slice(o), p = h.map(i.before(a)), g = r.doc.resolve(p);
      l && i.node(a - 1).canReplaceWith(g.index(), g.index() + 1, l) && r.setNodeMarkup(h.map(i.before(a)), l);
    }
    return n && n(r.scrollIntoView()), !0;
  };
}
const MS = ES(), IS = (t, e) => {
  let { $from: n, to: r } = t.selection, i, o = n.sharedDepth(r);
  return o == 0 ? !1 : (i = n.before(o), e && e(t.tr.setSelection(Tn.create(t.doc, i))), !0);
};
function AS(t, e, n) {
  let r = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(o - 1, o) ? (n && n(t.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || so(t.doc, e.pos)) ? !1 : (n && n(t.tr.join(e.pos).scrollIntoView()), !0);
}
function dv(t, e, n, r) {
  let i = e.nodeBefore, o = e.nodeAfter, s, a, l = i.type.spec.isolating || o.type.spec.isolating;
  if (!l && AS(t, e, n))
    return !0;
  let c = !l && e.parent.canReplace(e.index(), e.index() + 1);
  if (c && (s = (a = i.contentMatchAt(i.childCount)).findWrapping(o.type)) && a.matchType(s[0] || o.type).validEnd) {
    if (n) {
      let h = e.pos + o.nodeSize, p = ze.empty;
      for (let m = s.length - 1; m >= 0; m--)
        p = ze.from(s[m].create(null, p));
      p = ze.from(i.copy(p));
      let g = t.tr.step(new Kn(e.pos - 1, h, e.pos, h, new dt(p, 1, 0), s.length, !0)), y = g.doc.resolve(h + 2 * s.length);
      y.nodeAfter && y.nodeAfter.type == i.type && so(g.doc, y.pos) && g.join(y.pos), n(g.scrollIntoView());
    }
    return !0;
  }
  let u = o.type.spec.isolating || r > 0 && l ? null : _n.findFrom(e, 1), d = u && u.$from.blockRange(u.$to), f = d && jo(d);
  if (f != null && f >= e.depth)
    return n && n(t.tr.lift(d, f).scrollIntoView()), !0;
  if (c && Ho(o, "start", !0) && Ho(i, "end")) {
    let h = i, p = [];
    for (; p.push(h), !h.isTextblock; )
      h = h.lastChild;
    let g = o, y = 1;
    for (; !g.isTextblock; g = g.firstChild)
      y++;
    if (h.canReplace(h.childCount, h.childCount, g.content)) {
      if (n) {
        let m = ze.empty;
        for (let C = p.length - 1; C >= 0; C--)
          m = ze.from(p[C].copy(m));
        let b = t.tr.step(new Kn(e.pos - p.length, e.pos + o.nodeSize, e.pos + y, e.pos + o.nodeSize - y, new dt(m, p.length, 0), 0, !0));
        n(b.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function fv(t) {
  return function(e, n) {
    let r = e.selection, i = t < 0 ? r.$from : r.$to, o = i.depth;
    for (; i.node(o).isInline; ) {
      if (!o)
        return !1;
      o--;
    }
    return i.node(o).isTextblock ? (n && n(e.tr.setSelection(cr.create(e.doc, t < 0 ? i.start(o) : i.end(o)))), !0) : !1;
  };
}
const _S = fv(-1), PS = fv(1);
function DS(t, e = null) {
  return function(n, r) {
    let { $from: i, $to: o } = n.selection, s = i.blockRange(o), a = s && Ub(s, t, e);
    return a ? (r && r(n.tr.wrap(s, a).scrollIntoView()), !0) : !1;
  };
}
function Ip(t, e = null) {
  return function(n, r) {
    let i = !1;
    for (let o = 0; o < n.selection.ranges.length && !i; o++) {
      let { $from: { pos: s }, $to: { pos: a } } = n.selection.ranges[o];
      n.doc.nodesBetween(s, a, (l, c) => {
        if (i)
          return !1;
        if (!(!l.isTextblock || l.hasMarkup(t, e)))
          if (l.type == t)
            i = !0;
          else {
            let u = n.doc.resolve(c), d = u.index();
            i = u.parent.canReplaceWith(d, d + 1, t);
          }
      });
    }
    if (!i)
      return !1;
    if (r) {
      let o = n.tr;
      for (let s = 0; s < n.selection.ranges.length; s++) {
        let { $from: { pos: a }, $to: { pos: l } } = n.selection.ranges[s];
        o.setBlockType(a, l, t, e);
      }
      r(o.scrollIntoView());
    }
    return !0;
  };
}
function th(...t) {
  return function(e, n, r) {
    for (let i = 0; i < t.length; i++)
      if (t[i](e, n, r))
        return !0;
    return !1;
  };
}
th(ev, nv, iv);
th(ev, sv, av);
th(lv, cv, uv, MS);
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function NS(t, e = null) {
  return function(n, r) {
    let { $from: i, $to: o } = n.selection, s = i.blockRange(o);
    if (!s)
      return !1;
    let a = r ? n.tr : null;
    return OS(a, s, t, e) ? (r && r(a.scrollIntoView()), !0) : !1;
  };
}
function OS(t, e, n, r = null) {
  let i = !1, o = e, s = e.$from.doc;
  if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(n) && e.startIndex == 0) {
    if (e.$from.index(e.depth - 1) == 0)
      return !1;
    let l = s.resolve(e.start - 2);
    o = new Wa(l, l, e.depth), e.endIndex < e.parent.childCount && (e = new Wa(e.$from, s.resolve(e.$to.end(e.depth)), e.depth)), i = !0;
  }
  let a = Ub(o, n, r, e);
  return a ? (t && zS(t, e, a, i, n), !0) : !1;
}
function zS(t, e, n, r, i) {
  let o = ze.empty;
  for (let u = n.length - 1; u >= 0; u--)
    o = ze.from(n[u].type.create(n[u].attrs, o));
  t.step(new Kn(e.start - (r ? 2 : 0), e.end, e.start, e.end, new dt(o, 0, 0), n.length, !0));
  let s = 0;
  for (let u = 0; u < n.length; u++)
    n[u].type == i && (s = u + 1);
  let a = n.length - s, l = e.start + n.length - (r ? 2 : 0), c = e.parent;
  for (let u = e.startIndex, d = e.endIndex, f = !0; u < d; u++, f = !1)
    !f && ui(t.doc, l, a) && (t.split(l, a), l += 2 * a), l += c.child(u).nodeSize;
  return t;
}
function LS(t) {
  return function(e, n) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (s) => s.childCount > 0 && s.firstChild.type == t);
    return o ? n ? r.node(o.depth - 1).type == t ? $S(e, n, t, o) : FS(e, n, o) : !0 : !1;
  };
}
function $S(t, e, n, r) {
  let i = t.tr, o = r.end, s = r.$to.end(r.depth);
  o < s && (i.step(new Kn(o - 1, s, o, s, new dt(ze.from(n.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new Wa(i.doc.resolve(r.$from.pos), i.doc.resolve(s), r.depth));
  const a = jo(r);
  if (a == null)
    return !1;
  i.lift(r, a);
  let l = i.doc.resolve(i.mapping.map(o, -1) - 1);
  return so(i.doc, l.pos) && l.nodeBefore.type == l.nodeAfter.type && i.join(l.pos), e(i.scrollIntoView()), !0;
}
function FS(t, e, n) {
  let r = t.tr, i = n.parent;
  for (let h = n.end, p = n.endIndex - 1, g = n.startIndex; p > g; p--)
    h -= i.child(p).nodeSize, r.delete(h - 1, h + 1);
  let o = r.doc.resolve(n.start), s = o.nodeAfter;
  if (r.mapping.map(n.end) != n.start + o.nodeAfter.nodeSize)
    return !1;
  let a = n.startIndex == 0, l = n.endIndex == i.childCount, c = o.node(-1), u = o.index(-1);
  if (!c.canReplace(u + (a ? 0 : 1), u + 1, s.content.append(l ? ze.empty : ze.from(i))))
    return !1;
  let d = o.pos, f = d + s.nodeSize;
  return r.step(new Kn(d - (a ? 1 : 0), f + (l ? 1 : 0), d + 1, f - 1, new dt((a ? ze.empty : ze.from(i.copy(ze.empty))).append(l ? ze.empty : ze.from(i.copy(ze.empty))), a ? 0 : 1, l ? 0 : 1), a ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function HS(t) {
  return function(e, n) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (c) => c.childCount > 0 && c.firstChild.type == t);
    if (!o)
      return !1;
    let s = o.startIndex;
    if (s == 0)
      return !1;
    let a = o.parent, l = a.child(s - 1);
    if (l.type != t)
      return !1;
    if (n) {
      let c = l.lastChild && l.lastChild.type == a.type, u = ze.from(c ? t.create() : null), d = new dt(ze.from(t.create(null, ze.from(a.type.create(null, u)))), c ? 3 : 1, 0), f = o.start, h = o.end;
      n(e.tr.step(new Kn(f - (c ? 3 : 1), h, f, h, d, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function hv(t) {
  const { state: e, transaction: n } = t;
  let { selection: r } = n, { doc: i } = n, { storedMarks: o } = n;
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
      return r = n.selection, i = n.doc, o = n.storedMarks, n;
    }
  };
}
var BS = class pv {
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
    const { rawCommands: e, editor: n, state: r } = this, { view: i } = n, { tr: o } = r, s = this.buildProps(o);
    return Object.fromEntries(Object.entries(e).map(([a, l]) => [a, (...u) => {
      const d = l(...u)(s);
      return !o.getMeta("preventDispatch") && !this.hasCustomState && i.dispatch(o), d;
    }]));
  }
  get chain() {
    return () => this.createChain();
  }
  get can() {
    return () => this.createCan();
  }
  createChain(e, n = !0) {
    const { rawCommands: r, editor: i, state: o } = this, { view: s } = i, a = [], l = !!e, c = e || o.tr, u = () => (!l && n && !c.getMeta("preventDispatch") && !this.hasCustomState && s.dispatch(c), a.every((f) => f === !0)), d = {
      ...Object.fromEntries(Object.entries(r).map(([f, h]) => [f, (...g) => {
        const y = this.buildProps(c, n), m = h(...g)(y);
        return a.push(m), d;
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
    const e = new Proxy({}, { get: (n, r) => {
      if (r !== "then")
        return r === "run" ? () => !1 : () => e;
    } });
    return e;
  }
  createCan(e) {
    const { rawCommands: n, state: r } = this, i = !1, o = e || r.tr, s = this.buildProps(o, i);
    return {
      ...Object.fromEntries(Object.entries(n).map(([a, l]) => [a, (...c) => l(...c)({
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
    const e = pv.createFakeChain();
    return new Proxy({ chain: () => e }, { get: (n, r) => {
      if (r !== "then")
        return r === "chain" ? n.chain : () => !1;
    } });
  }
  buildProps(e, n = !0) {
    const { rawCommands: r, editor: i, state: o } = this, { view: s } = i, a = {
      tr: e,
      editor: i,
      view: s,
      state: hv({
        state: o,
        transaction: e
      }),
      dispatch: n ? () => {
      } : void 0,
      chain: () => this.createChain(e, n),
      can: () => this.createCan(e),
      get commands() {
        return Object.fromEntries(Object.entries(r).map(([l, c]) => [l, (...u) => c(...u)(a)]));
      }
    };
    return a;
  }
};
const qS = () => ({ editor: t, view: e }) => (requestAnimationFrame(() => {
  if (!t.isDestroyed) {
    var n;
    e.dom.blur(), (n = window) === null || n === void 0 || (n = n.getSelection()) === null || n === void 0 || n.removeAllRanges();
  }
}), !0), WS = (t = !0) => ({ commands: e }) => e.setContent("", { emitUpdate: t }), jS = () => ({ state: t, tr: e, dispatch: n }) => {
  const { selection: r } = e, { ranges: i } = r;
  return n && i.forEach(({ $from: o, $to: s }) => {
    t.doc.nodesBetween(o.pos, s.pos, (a, l) => {
      if (a.type.isText) return;
      const { doc: c, mapping: u } = e, d = c.resolve(u.map(l)), f = c.resolve(u.map(l + a.nodeSize)), h = d.blockRange(f);
      if (!h) return;
      const p = jo(h);
      if (a.type.isTextblock) {
        const { defaultType: g } = d.parent.contentMatchAt(d.index());
        e.setNodeMarkup(h.start, g);
      }
      (p || p === 0) && e.lift(h, p);
    });
  }), !0;
}, KS = (t) => (e) => t(e), US = () => ({ state: t, dispatch: e }) => cv(t, e), GS = (t, e) => ({ editor: n, tr: r }) => {
  const { state: i } = n, o = i.doc.slice(t.from, t.to);
  r.deleteRange(t.from, t.to);
  const s = r.mapping.map(e);
  return r.insert(s, o.content), r.setSelection(new Ar(r.doc.resolve(Math.max(s - 1, 0)))), !0;
}, YS = () => ({ tr: t, dispatch: e }) => {
  const { selection: n } = t, r = n.$anchor.node();
  if (r.content.size > 0) return !1;
  const i = t.selection.$anchor;
  for (let o = i.depth; o > 0; o -= 1) if (i.node(o).type === r.type) {
    if (e) {
      const s = i.before(o), a = i.after(o);
      t.delete(s, a).scrollIntoView();
    }
    return !0;
  }
  return !1;
};
function Jn(t, e) {
  if (typeof t == "string") {
    if (!e.nodes[t]) throw Error(`There is no node type named '${t}'. Maybe you forgot to add the extension?`);
    return e.nodes[t];
  }
  return t;
}
const XS = (t) => ({ tr: e, state: n, dispatch: r }) => {
  const i = Jn(t, n.schema), o = e.selection.$anchor;
  for (let s = o.depth; s > 0; s -= 1) if (o.node(s).type === i) {
    if (r) {
      const a = o.before(s), l = o.after(s);
      e.delete(a, l).scrollIntoView();
    }
    return !0;
  }
  return !1;
}, VS = (t) => ({ tr: e, dispatch: n }) => {
  const { from: r, to: i } = t;
  return n && e.delete(r, i), !0;
}, JS = (t) => t.content ? /^text(\*|\+)/.test(t.content) : !1, Ap = (t, e, n) => {
  if (!t.parent.isInline || n === "left" && t.pos > t.start() || n === "right" && t.pos < t.end()) return t.pos;
  const r = e.nodes[t.parent.type.name].spec;
  return JS(r) ? n === "left" ? t.start() - 1 : t.end() + 1 : t.pos;
}, ZS = (t, e, n) => ({
  from: Ap(t, n, "left"),
  to: Ap(e, n, "right")
}), QS = () => ({ state: t, dispatch: e }) => {
  if (t.selection.empty) return !1;
  if (e) {
    const n = t.tr, { ranges: r } = t.selection, i = n.steps.length;
    r.forEach((o) => {
      const s = n.mapping.slice(i), a = n.doc.resolve(s.map(o.$from.pos)), l = n.doc.resolve(s.map(o.$to.pos)), { from: c, to: u } = ZS(a, l, t.schema);
      n.deleteRange(c, u);
    }), n.selection.empty || n.setSelection(Ar.near(n.doc.resolve(n.selection.from))), n.scrollIntoView(), e(n);
  }
  return !0;
}, eC = () => ({ commands: t }) => t.keyboardShortcut("Enter"), tC = () => ({ state: t, dispatch: e }) => TS(t, e);
function nC(t) {
  return Object.prototype.toString.call(t) === "[object RegExp]";
}
function Ga(t, e, n = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => n.strict ? e[i] === t[i] : nC(e[i]) ? e[i].test(t[i]) : e[i] === t[i]) : !0;
}
function gv(t, e, n = {}) {
  return t.find((r) => r.type === e && Ga(Object.fromEntries(Object.keys(n).map((i) => [i, r.attrs[i]])), n));
}
function _p(t, e, n = {}) {
  return !!gv(t, e, n);
}
function mv(t, e, n) {
  if (!t || !e) return;
  let r = t.parent.childAfter(t.parentOffset);
  if ((!r.node || !r.node.marks.some((l) => l.type === e)) && (r = t.parent.childBefore(t.parentOffset)), !r.node || !r.node.marks.some((l) => l.type === e)) return;
  if (!n) {
    const l = r.node.marks.find((c) => c.type === e);
    l && (n = l.attrs);
  }
  if (!gv([...r.node.marks], e, n)) return;
  let i = r.index, o = t.start() + r.offset, s = i + 1, a = o + r.node.nodeSize;
  for (; i > 0 && _p([...t.parent.child(i - 1).marks], e, n); )
    i -= 1, o -= t.parent.child(i).nodeSize;
  for (; s < t.parent.childCount && _p([...t.parent.child(s).marks], e, n); )
    a += t.parent.child(s).nodeSize, s += 1;
  return {
    from: o,
    to: a
  };
}
function Di(t, e) {
  if (typeof t == "string") {
    if (!e.marks[t]) throw Error(`There is no mark type named '${t}'. Maybe you forgot to add the extension?`);
    return e.marks[t];
  }
  return t;
}
const rC = (t, e) => ({ tr: n, state: r, dispatch: i }) => {
  const o = Di(t, r.schema), { doc: s, selection: a } = n, { $from: l, from: c, to: u } = a;
  if (i) {
    const d = mv(l, o, e);
    if (d && d.from <= c && d.to >= u) {
      const f = Ar.create(s, d.from, d.to);
      n.setSelection(f);
    }
  }
  return !0;
}, iC = (t) => (e) => {
  const n = typeof t == "function" ? t(e) : t;
  for (let r = 0; r < n.length; r += 1) if (n[r](e)) return !0;
  return !1;
};
function yv(t) {
  return t instanceof Ar;
}
function Xi(t = 0, e = 0, n = 0) {
  return Math.min(Math.max(t, e), n);
}
function oC(t, e = null) {
  if (!e) return null;
  const n = No.atStart(t), r = No.atEnd(t);
  if (e === "start" || e === !0) return n;
  if (e === "end") return r;
  const i = n.from, o = r.to;
  return e === "all" ? Ar.create(t, Xi(0, i, o), Xi(t.content.size, i, o)) : Ar.create(t, Xi(e, i, o), Xi(e, i, o));
}
function Pp() {
  return ["Android"].includes(navigator.platform) || /android/i.test(navigator.userAgent);
}
function Ya() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
function sC() {
  return typeof navigator < "u" ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : !1;
}
const aC = (t = null, e = {}) => ({ editor: n, view: r, tr: i, dispatch: o }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const s = () => {
    (Ya() || Pp()) && r.dom.focus(), sC() && !Ya() && !Pp() && r.dom.focus({ preventScroll: !0 }), requestAnimationFrame(() => {
      n.isDestroyed || (r.focus(), e != null && e.scrollIntoView && n.commands.scrollIntoView());
    });
  };
  try {
    if (r.hasFocus() && t === null || t === !1) return !0;
  } catch {
    return !1;
  }
  if (o && t === null && !yv(n.state.selection))
    return s(), !0;
  const a = oC(i.doc, t) || n.state.selection, l = n.state.selection.eq(a);
  return o && (l || i.setSelection(a), l && i.storedMarks && i.setStoredMarks(i.storedMarks), s()), !0;
}, lC = (t, e) => (n) => t.every((r, i) => e(r, {
  ...n,
  index: i
})), cC = (t, e) => ({ tr: n, commands: r }) => r.insertContentAt({
  from: n.selection.from,
  to: n.selection.to
}, t, e), bv = (t) => {
  const e = t.childNodes;
  for (let n = e.length - 1; n >= 0; n -= 1) {
    const r = e[n];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? t.removeChild(r) : r.nodeType === 1 && bv(r);
  }
  return t;
};
function ma(t) {
  if (typeof window > "u") throw new Error("[tiptap error]: there is no window object available, so this function cannot be used");
  const e = `<body>${t}</body>`, n = new window.DOMParser().parseFromString(e, "text/html").body;
  return bv(n);
}
function vv(t) {
  return typeof (t == null ? void 0 : t.nodesBetween) == "function";
}
function Bo(t, e, n) {
  if (vv(t)) return t;
  const r = typeof t == "object" && t !== null;
  n = {
    slice: !0,
    parseOptions: {},
    ...n
  };
  const i = typeof t == "string";
  if (r) try {
    if (Array.isArray(t) && t.length > 0) return ze.fromArray(t.map((s) => e.nodeFromJSON(s)));
    const o = e.nodeFromJSON(t);
    return n.errorOnInvalidContent && o.check(), o;
  } catch (o) {
    if (n.errorOnInvalidContent) throw new Error("[tiptap error]: Invalid JSON content", { cause: o });
    return console.warn("[tiptap warn]: Invalid content.", "Passed value:", t, "Error:", o), Bo("", e, n);
  }
  if (i) {
    if (n.errorOnInvalidContent) {
      let s = !1, a = "";
      const l = new jk({
        topNode: e.spec.topNode,
        marks: e.spec.marks,
        nodes: e.spec.nodes.append({ __tiptap__private__unknown__catch__all__node: {
          content: "inline*",
          group: "block",
          parseDOM: [{
            tag: "*",
            getAttrs: (c) => (s = !0, a = typeof c == "string" ? c : c.outerHTML, null)
          }]
        } })
      });
      if (n.slice ? zo.fromSchema(l).parseSlice(ma(t), n.parseOptions) : zo.fromSchema(l).parse(ma(t), n.parseOptions), n.errorOnInvalidContent && s) throw new Error("[tiptap error]: Invalid HTML content", { cause: /* @__PURE__ */ new Error(`Invalid element found: ${a}`) });
    }
    const o = zo.fromSchema(e);
    return n.slice ? o.parseSlice(ma(t), n.parseOptions).content : o.parse(ma(t), n.parseOptions);
  }
  return Bo("", e, n);
}
function wv(t) {
  return !("type" in t);
}
function xv(t, e, n) {
  const r = t.steps.length - 1;
  if (r < e) return;
  const i = t.steps[r];
  if (!(i instanceof Hn || i instanceof Kn)) return;
  const o = t.mapping.maps[r];
  let s = 0;
  o.forEach((a, l, c, u) => {
    s === 0 && (s = u);
  }), t.setSelection(No.near(t.doc.resolve(s), n));
}
const uC = (t, e, n) => ({ tr: r, dispatch: i, editor: o }) => {
  if (i) {
    n = {
      parseOptions: o.options.parseOptions,
      updateSelection: !0,
      applyInputRules: !1,
      applyPasteRules: !1,
      ...n
    };
    let a;
    const l = (y) => {
      o.emit("contentError", {
        editor: o,
        error: y,
        disableCollaboration: () => {
          "collaboration" in o.storage && typeof o.storage.collaboration == "object" && o.storage.collaboration && (o.storage.collaboration.isDisabled = !0);
        }
      });
    }, c = {
      preserveWhitespace: "full",
      ...n.parseOptions
    };
    if (!n.errorOnInvalidContent && !o.options.enableContentCheck && o.options.emitContentError) try {
      Bo(e, o.schema, {
        parseOptions: c,
        errorOnInvalidContent: !0
      });
    } catch (y) {
      l(y);
    }
    try {
      var s;
      a = Bo(e, o.schema, {
        parseOptions: c,
        errorOnInvalidContent: (s = n.errorOnInvalidContent) !== null && s !== void 0 ? s : o.options.enableContentCheck
      });
    } catch (y) {
      return l(y), !1;
    }
    let { from: u, to: d } = typeof t == "number" ? {
      from: t,
      to: t
    } : {
      from: t.from,
      to: t.to
    }, f = !0, h = !0;
    const p = wv(a) ? a.content : [a];
    if (p.forEach((y) => {
      y.check(), f = f ? y.isText && y.marks.length === 0 : !1, h = h ? y.isBlock : !1;
    }), u === d && h) {
      const { parent: y } = r.doc.resolve(u);
      y.isTextblock && !y.type.spec.code && !y.childCount && (u -= 1, d += 1);
    }
    let g;
    if (f)
      Array.isArray(e) ? g = e.map((y) => y.text || "").join("") : vv(e) ? g = p.map((y) => {
        var m;
        return (m = y.text) !== null && m !== void 0 ? m : "";
      }).join("") : typeof e == "object" && e && e.text ? g = e.text : g = e, r.insertText(g, u, d);
    else {
      g = ze.from(p);
      const y = r.doc.resolve(u), m = y.node(), b = y.parentOffset === 0, C = m.isText || m.isTextblock, I = m.content.size > 0;
      b && C && I && h && (u = Math.max(0, u - 1)), r.replaceWith(u, d, p);
    }
    n.updateSelection && xv(r, r.steps.length - 1, -1), n.applyInputRules && r.setMeta("applyInputRules", {
      from: u,
      text: g
    }), n.applyPasteRules && r.setMeta("applyPasteRules", {
      from: u,
      text: g
    });
  }
  return !0;
};
function kv(t) {
  for (let e = 0; e < t.edgeCount; e += 1) {
    const { type: n } = t.edge(e);
    if (n.isTextblock && !n.hasRequiredAttrs()) return n;
  }
  return null;
}
const dC = (t = {}) => ({ tr: e, dispatch: n, editor: r }) => {
  const { pos: i, attrs: o, content: s, updateSelection: a = !0 } = t;
  let l;
  typeof i == "number" ? l = e.doc.resolve(i) : i ? l = i : l = e.selection.$from;
  const c = kv(l.parent.contentMatchAt(l.index()));
  if (!c) return !1;
  const u = Object.keys(c.spec.attrs || {}), d = o ? Object.fromEntries(Object.entries(o).filter(([h]) => u.includes(h))) : {};
  let f;
  if (s) {
    const h = Bo(s, r.schema);
    f = c.createAndFill(d, h);
  } else f = c.createAndFill(d);
  return f ? (n && (e.insert(l.pos, f), a && xv(e, e.steps.length - 1, -1)), !0) : !1;
}, fC = () => ({ state: t, dispatch: e }) => SS(t, e), hC = () => ({ state: t, dispatch: e }) => CS(t, e), pC = () => ({ state: t, dispatch: e }) => nv(t, e), gC = () => ({ state: t, dispatch: e }) => sv(t, e), mC = () => ({ state: t, dispatch: e, tr: n }) => {
  try {
    const r = pl(t.doc, t.selection.$from.pos, -1);
    return r == null ? !1 : (n.join(r, 2), e && e(n), !0);
  } catch {
    return !1;
  }
}, yC = () => ({ state: t, dispatch: e, tr: n }) => {
  try {
    const r = pl(t.doc, t.selection.$from.pos, 1);
    return r == null ? !1 : (n.join(r, 2), e && e(n), !0);
  } catch {
    return !1;
  }
}, bC = () => ({ state: t, dispatch: e }) => xS(t, e), vC = () => ({ state: t, dispatch: e }) => kS(t, e);
function Sv() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function wC(t) {
  const e = t.split(/-(?!$)/);
  let n = e[e.length - 1];
  n === "Space" && (n = " ");
  let r, i, o, s;
  for (let a = 0; a < e.length - 1; a += 1) {
    const l = e[a];
    if (/^(cmd|meta|m)$/i.test(l)) s = !0;
    else if (/^a(lt)?$/i.test(l)) r = !0;
    else if (/^(c|ctrl|control)$/i.test(l)) i = !0;
    else if (/^s(hift)?$/i.test(l)) o = !0;
    else if (/^mod$/i.test(l))
      Ya() || Sv() ? s = !0 : i = !0;
    else throw new Error(`Unrecognized modifier name: ${l}`);
  }
  return r && (n = `Alt-${n}`), i && (n = `Ctrl-${n}`), s && (n = `Meta-${n}`), o && (n = `Shift-${n}`), n;
}
const xC = (t) => ({ editor: e, view: n, tr: r, dispatch: i }) => {
  const o = wC(t).split(/-(?!$)/), s = o.find((c) => ![
    "Alt",
    "Ctrl",
    "Meta",
    "Shift"
  ].includes(c)), a = new KeyboardEvent("keydown", {
    key: s === "Space" ? " " : s,
    altKey: o.includes("Alt"),
    ctrlKey: o.includes("Ctrl"),
    metaKey: o.includes("Meta"),
    shiftKey: o.includes("Shift"),
    bubbles: !0,
    cancelable: !0
  }), l = e.captureTransaction(() => {
    n.someProp("handleKeyDown", (c) => c(n, a));
  });
  return l == null || l.steps.forEach((c) => {
    const u = c.map(r.mapping);
    u && i && r.maybeStep(u);
  }), !0;
};
function nh(t, e, n = {}) {
  const { from: r, to: i, empty: o } = t.selection, s = e ? Jn(e, t.schema) : null, a = [];
  t.doc.nodesBetween(r, i, (u, d) => {
    if (u.isText) return;
    const f = Math.max(r, d), h = Math.min(i, d + u.nodeSize);
    a.push({
      node: u,
      from: f,
      to: h
    });
  });
  const l = i - r, c = a.filter((u) => s ? s.name === u.node.type.name : !0).filter((u) => Ga(u.node.attrs, n, { strict: !1 }));
  return o ? !!c.length : c.reduce((u, d) => u + d.to - d.from, 0) >= l;
}
const kC = (t, e = {}) => ({ state: n, dispatch: r }) => nh(n, Jn(t, n.schema), e) ? RS(n, r) : !1, SC = () => ({ state: t, dispatch: e }) => uv(t, e), CC = (t) => ({ state: e, dispatch: n }) => {
  const r = Jn(t, e.schema);
  return LS(r)(e, n);
}, RC = () => ({ state: t, dispatch: e }) => lv(t, e);
function Cv(t, e) {
  return e.nodes[t] ? "node" : e.marks[t] ? "mark" : null;
}
function Dp(t, e) {
  const n = typeof e == "string" ? [e] : e;
  return Object.keys(t).reduce((r, i) => (n.includes(i) || (r[i] = t[i]), r), {});
}
const TC = (t, e) => ({ tr: n, state: r, dispatch: i }) => {
  let o = null, s = null;
  const a = Cv(typeof t == "string" ? t : t.name, r.schema);
  if (!a) return !1;
  a === "node" && (o = Jn(t, r.schema)), a === "mark" && (s = Di(t, r.schema));
  let l = !1;
  return n.selection.ranges.forEach((c) => {
    r.doc.nodesBetween(c.$from.pos, c.$to.pos, (u, d) => {
      o && o === u.type && (l = !0, i && n.setNodeMarkup(d, void 0, Dp(u.attrs, e))), s && u.marks.length && u.marks.forEach((f) => {
        s === f.type && (l = !0, i && n.addMark(d, d + u.nodeSize, s.create(Dp(f.attrs, e))));
      });
    });
  }), l;
}, EC = () => ({ tr: t, dispatch: e }) => (e && t.scrollIntoView(), !0), MC = () => ({ tr: t, dispatch: e }) => {
  if (e) {
    const n = new ux(t.doc);
    t.setSelection(n);
  }
  return !0;
}, IC = () => ({ state: t, dispatch: e }) => iv(t, e), AC = () => ({ state: t, dispatch: e }) => av(t, e), _C = () => ({ state: t, dispatch: e }) => IS(t, e), PC = () => ({ state: t, dispatch: e }) => PS(t, e), DC = () => ({ state: t, dispatch: e }) => _S(t, e);
function NC(t, e, n = {}, r = {}) {
  return Bo(t, e, {
    slice: !1,
    parseOptions: n,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
const OC = (t, { errorOnInvalidContent: e, emitUpdate: n = !0, parseOptions: r = {} } = {}) => ({ editor: i, tr: o, dispatch: s, commands: a }) => {
  const { doc: l } = o;
  if (r.preserveWhitespace !== "full") {
    const c = NC(t, i.schema, r, { errorOnInvalidContent: e ?? i.options.enableContentCheck });
    if (s) {
      const u = wv(c) ? c.content : [c];
      o.replaceWith(0, l.content.size, u).setMeta("preventUpdate", !n);
    }
    return !0;
  }
  return s && o.setMeta("preventUpdate", !n), a.insertContentAt({
    from: 0,
    to: l.content.size
  }, t, {
    parseOptions: r,
    errorOnInvalidContent: e ?? i.options.enableContentCheck
  });
};
function zC(t, e) {
  const n = Di(e, t.schema), { from: r, to: i, empty: o } = t.selection, s = [];
  o ? (t.storedMarks && s.push(...t.storedMarks), s.push(...t.selection.$head.marks())) : t.doc.nodesBetween(r, i, (l) => {
    s.push(...l.marks);
  });
  const a = s.find((l) => l.type.name === n.name);
  return a ? { ...a.attrs } : {};
}
function LC(t, e) {
  const n = new bS(t);
  return e.forEach((r) => {
    r.steps.forEach((i) => {
      n.step(i);
    });
  }), n;
}
function $C(t, e) {
  for (let n = t.depth; n > 0; n -= 1) {
    const r = t.node(n);
    if (e(r)) return {
      pos: n > 0 ? t.before(n) : 0,
      start: t.start(n),
      depth: n,
      node: r
    };
  }
}
function rh(t) {
  return (e) => $C(e.$from, t);
}
function _s(t, e, n) {
  return t.config[e] === void 0 && t.parent ? _s(t.parent, e, n) : typeof t.config[e] == "function" ? t.config[e].bind({
    ...n,
    parent: t.parent ? _s(t.parent, e, n) : null
  }) : t.config[e];
}
function FC(t) {
  return typeof t == "function";
}
function xf(t, e = void 0, ...n) {
  return FC(t) ? e ? t.bind(e)(...n) : t(...n) : t;
}
function Rv(t) {
  return {
    baseExtensions: t.filter((e) => e.type === "extension"),
    nodeExtensions: t.filter((e) => e.type === "node"),
    markExtensions: t.filter((e) => e.type === "mark")
  };
}
function HC(t, e, n) {
  const { from: r, to: i } = e, { blockSeparator: o = `

`, textSerializers: s = {} } = n || {};
  let a = "";
  return t.nodesBetween(r, i, (l, c, u, d) => {
    l.isBlock && c > r && (a += o);
    const f = s == null ? void 0 : s[l.type.name];
    if (f)
      return u && (a += f({
        node: l,
        pos: c,
        parent: u,
        index: d,
        range: e
      })), !1;
    if (l.isText) {
      var h;
      a += l == null || (h = l.text) === null || h === void 0 ? void 0 : h.slice(Math.max(r, c) - c, i - c);
    }
  }), a;
}
function BC(t) {
  return Object.fromEntries(Object.entries(t.nodes).filter(([, e]) => e.spec.toText).map(([e, n]) => [e, n.spec.toText]));
}
function qC(t, e = JSON.stringify) {
  const n = {};
  return t.filter((r) => {
    const i = e(r);
    return Object.prototype.hasOwnProperty.call(n, i) ? !1 : n[i] = !0;
  });
}
function WC(t) {
  const e = qC(t);
  return e.length === 1 ? e : e.filter((n, r) => !e.filter((i, o) => o !== r).some((i) => n.oldRange.from >= i.oldRange.from && n.oldRange.to <= i.oldRange.to && n.newRange.from >= i.newRange.from && n.newRange.to <= i.newRange.to));
}
function jC(t) {
  const { mapping: e, steps: n } = t, r = [];
  return e.maps.forEach((i, o) => {
    const s = [];
    if (i.ranges.length)
      i.forEach((a, l) => {
        s.push({
          from: a,
          to: l
        });
      });
    else {
      const { from: a, to: l } = n[o];
      if (a === void 0 || l === void 0) return;
      s.push({
        from: a,
        to: l
      });
    }
    s.forEach(({ from: a, to: l }) => {
      const c = e.slice(o).map(a, -1), u = e.slice(o).map(l), d = e.invert().map(c, -1), f = e.invert().map(u);
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
  }), WC(r);
}
function Da(t, e, n) {
  return Object.fromEntries(Object.entries(n).filter(([r]) => {
    const i = t.find((o) => o.type === e && o.name === r);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function KC(t, e, n = {}) {
  const { empty: r, ranges: i } = t.selection, o = e ? Di(e, t.schema) : null;
  if (r) return !!(t.storedMarks || t.selection.$from.marks()).filter((u) => o ? o.name === u.type.name : !0).find((u) => Ga(u.attrs, n, { strict: !1 }));
  let s = 0;
  const a = [];
  if (i.forEach(({ $from: u, $to: d }) => {
    const f = u.pos, h = d.pos;
    t.doc.nodesBetween(f, h, (p, g) => {
      if (o && p.inlineContent && !p.type.allowsMarkType(o)) return !1;
      if (!p.isText && !p.marks.length) return;
      const y = Math.max(f, g), m = Math.min(h, g + p.nodeSize), b = m - y;
      s += b, a.push(...p.marks.map((C) => ({
        mark: C,
        from: y,
        to: m
      })));
    });
  }), s === 0) return !1;
  const l = a.filter((u) => o ? o.name === u.mark.type.name : !0).filter((u) => Ga(u.mark.attrs, n, { strict: !1 })).reduce((u, d) => u + d.to - d.from, 0), c = a.filter((u) => o ? u.mark.type !== o && u.mark.type.excludes(o) : !0).reduce((u, d) => u + d.to - d.from, 0);
  return (l > 0 ? l + c : l) >= s;
}
function Ql(t, e) {
  const { nodeExtensions: n } = Rv(e), r = n.find((o) => o.name === t);
  if (!r) return !1;
  const i = xf(_s(r, "group", {
    name: r.name,
    options: r.options,
    storage: r.storage
  }));
  return typeof i != "string" ? !1 : i.split(" ").includes("list");
}
function Tv(t, { checkChildren: e = !0, ignoreWhitespace: n = !1 } = {}) {
  if (n) {
    if (t.type.name === "hardBreak") return !0;
    if (t.isText) {
      var r;
      return !/\S/.test((r = t.text) !== null && r !== void 0 ? r : "");
    }
  }
  if (t.isText) return !t.text;
  if (t.isAtom || t.isLeaf) return !1;
  if (t.content.childCount === 0) return !0;
  if (e) {
    let i = !0;
    return t.content.forEach((o) => {
      i !== !1 && (Tv(o, {
        ignoreWhitespace: n,
        checkChildren: e
      }) || (i = !1));
    }), i;
  }
  return !1;
}
function UC(t, e, n) {
  const { selection: r } = e;
  let i = null;
  if (yv(r) && (i = r.$cursor), i) {
    var o;
    const a = (o = t.storedMarks) !== null && o !== void 0 ? o : i.marks();
    return i.parent.type.allowsMarkType(n) && (!!n.isInSet(a) || !a.some((l) => l.type.excludes(n)));
  }
  const { ranges: s } = r;
  return s.some(({ $from: a, $to: l }) => {
    let c = a.depth === 0 ? t.doc.inlineContent && t.doc.type.allowsMarkType(n) : !1;
    return t.doc.nodesBetween(a.pos, l.pos, (u, d, f) => {
      if (c) return !1;
      if (u.isInline) {
        const h = !f || f.type.allowsMarkType(n), p = !!n.isInSet(u.marks) || !u.marks.some((g) => g.type.excludes(n));
        c = h && p;
      }
      return !c;
    }), c;
  });
}
const GC = (t, e = {}) => ({ tr: n, state: r, dispatch: i }) => {
  const { selection: o } = n, { empty: s, ranges: a } = o, l = Di(t, r.schema);
  if (i)
    if (s) {
      const c = zC(r, l);
      n.addStoredMark(l.create({
        ...c,
        ...e
      }));
    } else a.forEach((c) => {
      const u = c.$from.pos, d = c.$to.pos;
      r.doc.nodesBetween(u, d, (f, h) => {
        const p = Math.max(h, u), g = Math.min(h + f.nodeSize, d);
        f.marks.find((y) => y.type === l) ? f.marks.forEach((y) => {
          l === y.type && n.addMark(p, g, l.create({
            ...y.attrs,
            ...e
          }));
        }) : n.addMark(p, g, l.create(e));
      });
    });
  return UC(r, n, l);
}, YC = (t, e) => ({ tr: n }) => (n.setMeta(t, e), !0), XC = (t, e = {}) => ({ state: n, dispatch: r, chain: i }) => {
  const o = Jn(t, n.schema);
  let s;
  return n.selection.$anchor.sameParent(n.selection.$head) && (s = n.selection.$anchor.parent.attrs), o.isTextblock ? i().command(({ commands: a }) => Ip(o, {
    ...s,
    ...e
  })(n) ? !0 : a.clearNodes()).command(({ state: a }) => Ip(o, {
    ...s,
    ...e
  })(a, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, VC = (t) => ({ tr: e, dispatch: n }) => {
  if (n) {
    const { doc: r } = e, i = Xi(t, 0, r.content.size), o = $o.create(r, i);
    e.setSelection(o);
  }
  return !0;
}, JC = (t, e) => ({ tr: n, state: r, dispatch: i }) => {
  const { selection: o } = r;
  let s, a;
  return typeof e == "number" ? (s = e, a = e) : e && "from" in e && "to" in e ? (s = e.from, a = e.to) : (s = o.from, a = o.to), i && n.doc.nodesBetween(s, a, (l, c) => {
    l.isText || n.setNodeMarkup(c, void 0, {
      ...l.attrs,
      dir: t
    });
  }), !0;
}, ZC = (t) => ({ tr: e, dispatch: n }) => {
  if (n) {
    const { doc: r } = e, { from: i, to: o } = typeof t == "number" ? {
      from: t,
      to: t
    } : t, s = Ar.atStart(r).from, a = Ar.atEnd(r).to, l = Xi(i, s, a), c = Xi(o, s, a), u = Ar.create(r, l, c);
    e.setSelection(u);
  }
  return !0;
}, QC = (t) => ({ state: e, dispatch: n }) => {
  const r = Jn(t, e.schema);
  return HS(r)(e, n);
};
function Np(t, e) {
  const n = t.storedMarks || t.selection.$to.parentOffset && t.selection.$from.marks();
  if (n) {
    const r = n.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    t.tr.ensureMarks(r);
  }
}
const e2 = ({ keepMarks: t = !0 } = {}) => ({ tr: e, state: n, dispatch: r, editor: i }) => {
  const { selection: o, doc: s } = e, { $from: a, $to: l } = o, c = i.extensionManager.attributes, u = Da(c, a.node().type.name, a.node().attrs);
  if (o instanceof $o && o.node.isBlock)
    return !a.parentOffset || !ui(s, a.pos) ? !1 : (r && (t && Np(n, i.extensionManager.splittableMarks), e.split(a.pos).scrollIntoView()), !0);
  if (!a.parent.isBlock) return !1;
  const d = l.parentOffset === l.parent.content.size, f = a.depth === 0 ? void 0 : kv(a.node(-1).contentMatchAt(a.indexAfter(-1)));
  let h = d && f ? [{
    type: f,
    attrs: u
  }] : void 0, p = ui(e.doc, e.mapping.map(a.pos), 1, h);
  if (!h && !p && ui(e.doc, e.mapping.map(a.pos), 1, f ? [{ type: f }] : void 0) && (p = !0, h = f ? [{
    type: f,
    attrs: u
  }] : void 0), r) {
    if (p && (o instanceof Ar && e.deleteSelection(), e.split(e.mapping.map(a.pos), 1, h), f && !d && !a.parentOffset && a.parent.type !== f)) {
      const g = e.mapping.map(a.before()), y = e.doc.resolve(g);
      a.node(-1).canReplaceWith(y.index(), y.index() + 1, f) && e.setNodeMarkup(e.mapping.map(a.before()), f);
    }
    t && Np(n, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return p;
}, t2 = (t, e = {}) => ({ tr: n, state: r, dispatch: i, editor: o }) => {
  const s = Jn(t, r.schema), { $from: a, $to: l } = r.selection, c = r.selection.node;
  if (c && c.isBlock || a.depth < 2 || !a.sameParent(l)) return !1;
  const u = a.node(-1);
  if (u.type !== s) return !1;
  const d = o.extensionManager.attributes;
  if (a.parent.content.size === 0 && a.node(-1).childCount === a.indexAfter(-1)) {
    if (a.depth === 2 || a.node(-3).type !== s || a.index(-2) !== a.node(-2).childCount - 1) return !1;
    if (i) {
      var f;
      let m = ze.empty;
      const b = a.index(-1) ? 1 : a.index(-2) ? 2 : 3;
      for (let P = a.depth - b; P >= a.depth - 3; P -= 1) m = ze.from(a.node(P).copy(m));
      const C = a.indexAfter(-1) < a.node(-2).childCount ? 1 : a.indexAfter(-2) < a.node(-3).childCount ? 2 : 3, I = {
        ...Da(d, a.node().type.name, a.node().attrs),
        ...e
      }, v = ((f = s.contentMatch.defaultType) === null || f === void 0 ? void 0 : f.createAndFill(I)) || void 0;
      m = m.append(ze.from(s.createAndFill(null, v) || void 0));
      const T = a.before(a.depth - (b - 1));
      n.replace(T, a.after(-C), new dt(m, 4 - b, 0));
      let D = -1;
      n.doc.nodesBetween(T, n.doc.content.size, (P, S) => {
        if (D > -1) return !1;
        P.isTextblock && P.content.size === 0 && (D = S + 1);
      }), D > -1 && n.setSelection(Ar.near(n.doc.resolve(D))), n.scrollIntoView();
    }
    return !0;
  }
  const h = l.pos === a.end() ? u.contentMatchAt(0).defaultType : null, p = {
    ...Da(d, u.type.name, u.attrs),
    ...e
  }, g = {
    ...Da(d, a.node().type.name, a.node().attrs),
    ...e
  };
  n.delete(a.pos, l.pos);
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
  if (!ui(n.doc, a.pos, 2)) return !1;
  if (i) {
    const { selection: m, storedMarks: b } = r, { splittableMarks: C } = o.extensionManager, I = b || m.$to.parentOffset && m.$from.marks();
    if (n.split(a.pos, 2, y).scrollIntoView(), !I || !i) return !0;
    const v = I.filter((T) => C.includes(T.type.name));
    n.ensureMarks(v);
  }
  return !0;
};
function Op(t) {
  return !t || t === "1" ? null : t;
}
function Ev(t, e) {
  return Op(t) === Op(e);
}
const ec = (t, e) => {
  const n = rh((o) => o.type === e)(t.selection);
  if (!n) return !0;
  const r = t.doc.resolve(Math.max(0, n.pos - 1)).before(n.depth);
  if (r === void 0) return !0;
  const i = t.doc.nodeAt(r);
  return !(n.node.type === (i == null ? void 0 : i.type) && so(t.doc, n.pos)) || !Ev(n.node.attrs.type, i == null ? void 0 : i.attrs.type) || t.join(n.pos), !0;
}, tc = (t, e) => {
  const n = rh((o) => o.type === e)(t.selection);
  if (!n) return !0;
  const r = t.doc.resolve(n.start).after(n.depth);
  if (r === void 0) return !0;
  const i = t.doc.nodeAt(r);
  return !(n.node.type === (i == null ? void 0 : i.type) && so(t.doc, r)) || !Ev(n.node.attrs.type, i == null ? void 0 : i.attrs.type) || t.join(r), !0;
};
function n2(t) {
  const e = t.doc, n = e.firstChild;
  if (!n) return null;
  const r = e.resolve(1), i = e.resolve(n.nodeSize - 1);
  return Ar.between(r, i);
}
const r2 = (t, e, n, r = {}) => ({ editor: i, tr: o, state: s, dispatch: a, chain: l, commands: c, can: u }) => {
  const { extensions: d, splittableMarks: f } = i.extensionManager, h = Jn(t, s.schema), p = Jn(e, s.schema), { selection: g, storedMarks: y } = s, { $from: m, $to: b } = g, C = m.blockRange(b), I = y || g.$to.parentOffset && g.$from.marks();
  if (!C) return !1;
  const v = rh((M) => Ql(M.type.name, d))(g), T = g.from === 0 && g.to === s.doc.content.size, D = s.doc.content.content, P = D.length === 1 ? D[0] : null, S = T && P && Ql(P.type.name, d) ? {
    node: P,
    pos: 0
  } : null, z = v ?? S, k = !!v && C.depth >= 1 && C.depth - v.depth <= 1, x = !!S;
  if ((k || x) && z) {
    if (z.node.type === h)
      return T && x ? l().command(({ tr: M, dispatch: _ }) => {
        const E = n2(M);
        return E ? (M.setSelection(E), _ && _(M), !0) : !1;
      }).liftListItem(p).run() : c.liftListItem(p);
    if (Ql(z.node.type.name, d) && h.validContent(z.node.content)) return l().command(() => (o.setNodeMarkup(z.pos, h), !0)).command(() => ec(o, h)).command(() => tc(o, h)).run();
  }
  return !n || !I || !a ? l().command(() => u().wrapInList(h, r) ? !0 : c.clearNodes()).wrapInList(h, r).command(() => ec(o, h)).command(() => tc(o, h)).run() : l().command(() => {
    const M = u().wrapInList(h, r), _ = I.filter((E) => f.includes(E.type.name));
    return o.ensureMarks(_), M ? !0 : c.clearNodes();
  }).wrapInList(h, r).command(() => ec(o, h)).command(() => tc(o, h)).run();
}, i2 = (t, e = {}, n = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: o = !1 } = n, s = Di(t, r.schema);
  return KC(r, s, e) ? i.unsetMark(s, { extendEmptyMarkRange: o }) : i.setMark(s, e);
}, o2 = (t, e, n = {}) => ({ state: r, commands: i }) => {
  const o = Jn(t, r.schema), s = Jn(e, r.schema), a = nh(r, o, n);
  let l;
  return r.selection.$anchor.sameParent(r.selection.$head) && (l = r.selection.$anchor.parent.attrs), a ? i.setNode(s, l) : i.setNode(o, {
    ...l,
    ...n
  });
}, s2 = (t, e = {}) => ({ state: n, commands: r }) => {
  const i = Jn(t, n.schema);
  return nh(n, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, a2 = () => ({ state: t, dispatch: e }) => {
  const n = t.plugins;
  for (let r = 0; r < n.length; r += 1) {
    const i = n[r];
    let o;
    if (i.spec.isInputRules && (o = i.getState(t))) {
      if (e) {
        const s = t.tr, a = o.transform;
        for (let l = a.steps.length - 1; l >= 0; l -= 1) s.step(a.steps[l].invert(a.docs[l]));
        if (o.text) {
          const l = s.doc.resolve(o.from).marks();
          s.replaceWith(o.from, o.to, t.schema.text(o.text, l));
        } else s.delete(o.from, o.to);
      }
      return !0;
    }
  }
  return !1;
}, l2 = (t = {}) => ({ tr: e, dispatch: n, editor: r }) => {
  const { ignoreClearable: i = !1 } = t, { selection: o } = e, { empty: s, ranges: a } = o;
  if (s) return !0;
  const { nonClearableMarks: l } = r.extensionManager;
  if (n) {
    const c = Object.values(r.schema.marks).filter((u) => i || !l.includes(u.name));
    a.forEach((u) => {
      for (const d of c) e.removeMark(u.$from.pos, u.$to.pos, d);
    });
  }
  return !0;
}, c2 = (t, e = {}) => ({ tr: n, state: r, dispatch: i }) => {
  const { extendEmptyMarkRange: o = !1 } = e, { selection: s } = n, a = Di(t, r.schema), { $from: l, empty: c, ranges: u } = s;
  if (!i) return !0;
  if (c && o) {
    var d;
    let { from: f, to: h } = s;
    const p = mv(l, a, (d = l.marks().find((g) => g.type === a)) === null || d === void 0 ? void 0 : d.attrs);
    p && (f = p.from, h = p.to), n.removeMark(f, h, a);
  } else u.forEach((f) => {
    n.removeMark(f.$from.pos, f.$to.pos, a);
  });
  return n.removeStoredMark(a), !0;
}, u2 = (t) => ({ tr: e, state: n, dispatch: r }) => {
  const { selection: i } = n;
  let o, s;
  return typeof t == "number" ? (o = t, s = t) : t && "from" in t && "to" in t ? (o = t.from, s = t.to) : (o = i.from, s = i.to), r && e.doc.nodesBetween(o, s, (a, l) => {
    if (a.isText) return;
    const c = { ...a.attrs };
    delete c.dir, e.setNodeMarkup(l, void 0, c);
  }), !0;
}, d2 = (t, e = {}) => ({ tr: n, state: r, dispatch: i }) => {
  let o = null, s = null;
  const a = Cv(typeof t == "string" ? t : t.name, r.schema);
  if (!a) return !1;
  a === "node" && (o = Jn(t, r.schema)), a === "mark" && (s = Di(t, r.schema));
  let l = !1;
  return n.selection.ranges.forEach((c) => {
    const u = c.$from.pos, d = c.$to.pos;
    let f, h, p, g;
    n.selection.empty ? r.doc.nodesBetween(u, d, (y, m) => {
      o && o === y.type && (l = !0, p = Math.max(m, u), g = Math.min(m + y.nodeSize, d), f = m, h = y);
    }) : r.doc.nodesBetween(u, d, (y, m) => {
      m < u && o && o === y.type && (l = !0, p = Math.max(m, u), g = Math.min(m + y.nodeSize, d), f = m, h = y), m >= u && m <= d && (o && o === y.type && (l = !0, i && n.setNodeMarkup(m, void 0, {
        ...y.attrs,
        ...e
      })), s && y.marks.length && y.marks.forEach((b) => {
        if (s === b.type && (l = !0, i)) {
          const C = Math.max(m, u), I = Math.min(m + y.nodeSize, d);
          n.addMark(C, I, s.create({
            ...b.attrs,
            ...e
          }));
        }
      }));
    }), h && (f !== void 0 && i && n.setNodeMarkup(f, void 0, {
      ...h.attrs,
      ...e
    }), s && h.marks.length && h.marks.forEach((y) => {
      s === y.type && i && n.addMark(p, g, s.create({
        ...y.attrs,
        ...e
      }));
    }));
  }), l;
}, f2 = new Kr("__tiptap_decorations__"), h2 = (t) => ({ tr: e, dispatch: n }) => (n && e.setMeta(f2, {
  type: "force",
  name: t
}), !0), p2 = (t, e = {}) => ({ state: n, dispatch: r }) => {
  const i = Jn(t, n.schema);
  return DS(i, e)(n, r);
}, g2 = (t, e = {}) => ({ state: n, dispatch: r }) => {
  const i = Jn(t, n.schema);
  return NS(i, e)(n, r);
};
var m2 = /* @__PURE__ */ Ek({
  blur: () => qS,
  clearContent: () => WS,
  clearNodes: () => jS,
  command: () => KS,
  createParagraphNear: () => US,
  cut: () => GS,
  deleteCurrentNode: () => YS,
  deleteNode: () => XS,
  deleteRange: () => VS,
  deleteSelection: () => QS,
  enter: () => eC,
  exitCode: () => tC,
  extendMarkRange: () => rC,
  first: () => iC,
  focus: () => aC,
  forEach: () => lC,
  insertContent: () => cC,
  insertContentAt: () => uC,
  insertDefaultBlock: () => dC,
  joinBackward: () => pC,
  joinDown: () => hC,
  joinForward: () => gC,
  joinItemBackward: () => mC,
  joinItemForward: () => yC,
  joinTextblockBackward: () => bC,
  joinTextblockForward: () => vC,
  joinUp: () => fC,
  keyboardShortcut: () => xC,
  lift: () => kC,
  liftEmptyBlock: () => SC,
  liftListItem: () => CC,
  newlineInCode: () => RC,
  resetAttributes: () => TC,
  scrollIntoView: () => EC,
  selectAll: () => MC,
  selectNodeBackward: () => IC,
  selectNodeForward: () => AC,
  selectParentNode: () => _C,
  selectTextblockEnd: () => PC,
  selectTextblockStart: () => DC,
  setContent: () => OC,
  setMark: () => GC,
  setMeta: () => YC,
  setNode: () => XC,
  setNodeSelection: () => VC,
  setTextDirection: () => JC,
  setTextSelection: () => ZC,
  sinkListItem: () => QC,
  splitBlock: () => e2,
  splitListItem: () => t2,
  toggleList: () => r2,
  toggleMark: () => i2,
  toggleNode: () => o2,
  toggleWrap: () => s2,
  undoInputRule: () => a2,
  unsetAllMarks: () => l2,
  unsetMark: () => c2,
  unsetTextDirection: () => u2,
  updateAttributes: () => d2,
  updateDecorations: () => h2,
  wrapIn: () => p2,
  wrapInList: () => g2
});
typeof process < "u" && process.env.NODE_ENV;
function y2(t) {
  return Object.prototype.toString.call(t).slice(8, -1);
}
function ya(t) {
  return y2(t) !== "Object" ? !1 : t.constructor === Object && Object.getPrototypeOf(t) === Object.prototype;
}
function Mv(t, e) {
  const n = { ...t };
  return ya(t) && ya(e) && Object.keys(e).forEach((r) => {
    ya(e[r]) && ya(t[r]) ? n[r] = Mv(t[r], e[r]) : n[r] = e[r];
  }), n;
}
var Iv = class {
  constructor(t = {}) {
    this.type = "extendable", this.parent = null, this.child = null, this.name = "", this.config = { name: this.name }, this.config = {
      ...this.config,
      ...t
    }, this.name = this.config.name;
  }
  get options() {
    return { ...xf(_s(this, "addOptions", { name: this.name })) };
  }
  get storage() {
    return { ...xf(_s(this, "addStorage", {
      name: this.name,
      options: this.options
    })) };
  }
  configure(t = {}) {
    const e = this.extend({
      ...this.config,
      addOptions: () => Mv(this.options, t)
    });
    return e.name = this.name, e.parent = this.parent, this.child = null, e;
  }
  extend(t = {}) {
    const e = new this.constructor({
      ...this.config,
      ...t
    });
    return e.parent = this, this.child = e, e.name = "name" in t ? t.name : e.parent.name, e;
  }
}, b2 = class Av extends Iv {
  constructor(...e) {
    super(...e), this.type = "mark";
  }
  /**
  * Create a new Mark instance
  * @param config - Mark configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const n = typeof e == "function" ? e() : e;
    return new Av(n);
  }
  static handleExit({ editor: e, mark: n }) {
    const { tr: r } = e.state, i = e.state.selection.$from;
    if (i.pos === i.end()) {
      const o = i.marks();
      if (!o.find((a) => (a == null ? void 0 : a.type.name) === n.name)) return !1;
      const s = o.find((a) => (a == null ? void 0 : a.type.name) === n.name);
      return s && r.removeStoredMark(s), r.insertText(" ", i.pos), e.view.dispatch(r), !0;
    }
    return !1;
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const n = typeof e == "function" ? e() : e;
    return super.extend(n);
  }
}, _r = class _v extends Iv {
  constructor(...e) {
    super(...e), this.type = "extension";
  }
  /**
  * Create a new Extension instance
  * @param config - Extension configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const n = typeof e == "function" ? e() : e;
    return new _v(n);
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const n = typeof e == "function" ? e() : e;
    return super.extend(n);
  }
};
_r.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return { blockSeparator: void 0 };
  },
  addProseMirrorPlugins() {
    return [new hi({
      key: new Kr("clipboardTextSerializer"),
      props: { clipboardTextSerializer: () => {
        const { editor: t } = this, { state: e, schema: n } = t, { doc: r, selection: i } = e, o = BC(n), { blockSeparator: s } = this.options, a = {
          ...s !== void 0 ? { blockSeparator: s } : {},
          textSerializers: o
        };
        return [...i.ranges].sort((l, c) => l.$from.pos - c.$from.pos).map(({ $from: l, $to: c }) => HC(r, {
          from: l.pos,
          to: c.pos
        }, a)).join(s ?? `

`);
      } }
    })];
  }
});
_r.create({
  name: "commands",
  addCommands() {
    return { ...m2 };
  }
});
_r.create({
  name: "delete",
  onUpdate({ transaction: t, appendedTransactions: e }) {
    var n, r;
    const i = () => {
      var o, s, a;
      if ((o = (s = this.editor.options.coreExtensionOptions) === null || s === void 0 || (s = s.delete) === null || s === void 0 || (a = s.filterTransaction) === null || a === void 0 ? void 0 : a.call(s, t)) !== null && o !== void 0 ? o : t.getMeta("y-sync$")) return;
      const l = LC(t.before, [t, ...e]);
      jC(l).forEach((u) => {
        l.mapping.mapResult(u.oldRange.from).deletedAfter && l.mapping.mapResult(u.oldRange.to).deletedBefore && l.before.nodesBetween(u.oldRange.from, u.oldRange.to, (d, f) => {
          const h = f + d.nodeSize - 2, p = u.oldRange.from <= f && h <= u.oldRange.to;
          this.editor.emit("delete", {
            type: "node",
            node: d,
            from: f,
            to: h,
            newFrom: l.mapping.map(f),
            newTo: l.mapping.map(h),
            deletedRange: u.oldRange,
            newRange: u.newRange,
            partial: !p,
            editor: this.editor,
            transaction: t,
            combinedTransform: l
          });
        });
      });
      const c = l.mapping;
      l.steps.forEach((u, d) => {
        if (u instanceof Wr) {
          var f, h;
          const p = c.slice(d).map(u.from, -1), g = c.slice(d).map(u.to), y = c.invert().map(p, -1), m = c.invert().map(g), b = p > 0 ? (f = l.doc.nodeAt(p - 1)) === null || f === void 0 ? void 0 : f.marks.some((I) => I.eq(u.mark)) : !1, C = (h = l.doc.nodeAt(g)) === null || h === void 0 ? void 0 : h.marks.some((I) => I.eq(u.mark));
          this.editor.emit("delete", {
            type: "mark",
            mark: u.mark,
            from: u.from,
            to: u.to,
            deletedRange: {
              from: y,
              to: m
            },
            newRange: {
              from: p,
              to: g
            },
            partial: !!(C || b),
            editor: this.editor,
            transaction: t,
            combinedTransform: l
          });
        }
      });
    };
    !((n = (r = this.editor.options.coreExtensionOptions) === null || r === void 0 || (r = r.delete) === null || r === void 0 ? void 0 : r.async) !== null && n !== void 0) || n ? setTimeout(i, 0) : i();
  }
});
_r.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [new hi({
      key: new Kr("tiptapDrop"),
      props: { handleDrop: (t, e, n, r) => {
        this.editor.emit("drop", {
          editor: this.editor,
          event: e,
          slice: n,
          moved: r
        });
      } }
    })];
  }
});
_r.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [new hi({
      key: new Kr("editable"),
      props: { editable: () => this.editor.options.editable }
    })];
  }
});
const v2 = new Kr("focusEvents");
_r.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: t } = this;
    return [new hi({
      key: v2,
      props: { handleDOMEvents: {
        focus: (e, n) => {
          t.isFocused = !0;
          const r = t.state.tr.setMeta("focus", { event: n }).setMeta("addToHistory", !1);
          return e.dispatch(r), !1;
        },
        blur: (e, n) => {
          t.isFocused = !1;
          const r = t.state.tr.setMeta("blur", { event: n }).setMeta("addToHistory", !1);
          return e.dispatch(r), !1;
        }
      } }
    })];
  }
});
_r.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const t = () => this.editor.commands.first(({ commands: s }) => [
      () => s.undoInputRule(),
      () => s.command(({ tr: a }) => {
        const { selection: l, doc: c } = a, { empty: u, $anchor: d } = l, { pos: f, parent: h } = d, p = d.parent.isTextblock && f > 0 ? a.doc.resolve(f - 1) : d, g = p.parent.type.spec.isolating, y = d.pos - d.parentOffset, m = g && p.parent.childCount === 1 ? y === d.pos : No.atStart(c).from === f;
        return !u || !h.type.isTextblock || h.textContent.length || !m || m && d.parent.type.name === "paragraph" ? !1 : s.clearNodes();
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
      Backspace: t,
      "Mod-Backspace": t,
      "Shift-Backspace": t,
      Delete: e,
      "Mod-Delete": e,
      "Mod-a": () => this.editor.commands.selectAll()
    }, i = { ...r }, o = {
      ...r,
      "Ctrl-h": t,
      "Alt-Backspace": t,
      "Ctrl-d": e,
      "Ctrl-Alt-Backspace": e,
      "Alt-Delete": e,
      "Alt-d": e,
      "Ctrl-a": () => this.editor.commands.selectTextblockStart(),
      "Ctrl-e": () => this.editor.commands.selectTextblockEnd()
    };
    return Ya() || Sv() ? o : i;
  },
  addProseMirrorPlugins() {
    return [new hi({
      key: new Kr("clearDocument"),
      appendTransaction: (t, e, n) => {
        if (t.some((h) => h.getMeta("composition"))) return;
        const r = t.some((h) => h.docChanged) && !e.doc.eq(n.doc), i = t.some((h) => h.getMeta("preventClearDocument"));
        if (!r || i) return;
        const { empty: o, from: s, to: a } = e.selection, l = No.atStart(e.doc).from, c = No.atEnd(e.doc).to;
        if (o || !(s === l && a === c) || !Tv(n.doc)) return;
        const u = n.tr, d = hv({
          state: n,
          transaction: u
        }), { commands: f } = new BS({
          editor: this.editor,
          state: d
        });
        if (f.clearNodes(), !!u.steps.length)
          return u;
      }
    })];
  }
});
_r.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [new hi({
      key: new Kr("tiptapPaste"),
      props: { handlePaste: (t, e, n) => {
        this.editor.emit("paste", {
          editor: this.editor,
          event: e,
          slice: n
        });
      } }
    })];
  }
});
_r.create({
  name: "tabindex",
  addOptions() {
    return { value: void 0 };
  },
  addProseMirrorPlugins() {
    return [new hi({
      key: new Kr("tabindex"),
      props: { attributes: () => {
        var t;
        return !this.editor.isEditable && this.options.value === void 0 ? {} : { tabindex: (t = this.options.value) !== null && t !== void 0 ? t : "0" };
      } }
    })];
  }
});
_r.create({
  name: "textDirection",
  addOptions() {
    return { direction: void 0 };
  },
  addGlobalAttributes() {
    if (!this.options.direction) return [];
    const { nodeExtensions: t } = Rv(this.extensions);
    return [{
      types: t.filter((e) => e.name !== "text").map((e) => e.name),
      attributes: { dir: {
        default: this.options.direction,
        parseHTML: (e) => {
          const n = e.getAttribute("dir");
          return n && (n === "ltr" || n === "rtl" || n === "auto") ? n : this.options.direction;
        },
        renderHTML: (e) => e.dir ? { dir: e.dir } : {}
      } }
    }];
  },
  addProseMirrorPlugins() {
    return [new hi({
      key: new Kr("textDirection"),
      props: { attributes: () => {
        const t = this.options.direction;
        return t ? { dir: t } : {};
      } }
    })];
  }
});
const w2 = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), x2 = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), k2 = /^(https?:\/\/|mailto:)/i;
function S2(t) {
  if (!t) return "";
  const e = [];
  for (const n of t.split(";")) {
    const r = n.indexOf(":");
    if (r < 0) continue;
    const i = n.slice(0, r).trim().toLowerCase(), o = n.slice(r + 1).trim();
    x2.has(i) && o && e.push(`${i}: ${o}`);
  }
  return e.join("; ");
}
function kf(t) {
  if (t.nodeType === Node.TEXT_NODE) return t;
  if (t.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const e = t, n = e.tagName.toLowerCase(), r = () => {
    const a = document.createDocumentFragment();
    for (const l of Array.from(e.childNodes)) a.appendChild(kf(l));
    return a;
  };
  if (!w2.has(n)) return r();
  if (n === "a") {
    const a = e.getAttribute("href") || "";
    if (!k2.test(a)) return r();
  }
  const i = document.createElement(n), o = e.getAttribute("style"), s = S2(o || "");
  if (s && i.setAttribute("style", s), n === "span") {
    const a = e.getAttribute("data-text-style");
    a && i.setAttribute("data-text-style", a);
  }
  if (n === "a") {
    i.setAttribute("href", e.getAttribute("href"));
    const a = e.getAttribute("target"), l = e.getAttribute("rel");
    a && i.setAttribute("target", a), l && i.setAttribute("rel", l);
  }
  for (const a of Array.from(e.childNodes)) i.appendChild(kf(a));
  return i;
}
function Pv(t) {
  return t.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function C2(t) {
  const e = Pv(t);
  if (!e || !e.includes("<")) return e;
  const n = document.createElement("template");
  n.innerHTML = e;
  const r = document.createDocumentFragment();
  for (const s of Array.from(n.content.childNodes)) r.appendChild(kf(s));
  const i = document.createElement("div");
  return i.appendChild(r), i.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function x3(t) {
  const e = Pv(t);
  if (!e || !e.includes("<")) return e;
  const n = document.createElement("template");
  return n.innerHTML = e, (n.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function k3(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function R2(t) {
  return t.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function zp(t) {
  return t.replace(/\{\{([^{}]+)\}\}/g, (e, n) => `<span data-type="token" data-field="${n}">{{${n}}}</span>`);
}
const T2 = { text: "#52525b" }, E2 = ({ node: t, selected: e, extension: n, editor: r, view: i, getPos: o }) => {
  var f;
  const s = t.attrs.field ?? "", a = n.options, l = ((f = a.resolve) == null ? void 0 : f.call(a, s)) ?? null, c = (l == null ? void 0 : l.color) ?? T2, u = (l == null ? void 0 : l.label) ?? `{{${s}}}`, d = l == null ? void 0 : l.nested;
  return /* @__PURE__ */ A(
    ax,
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
        var m;
        if (h.button !== 0 || !r.isEditable) return;
        h.preventDefault(), r.isFocused || r.commands.focus();
        const p = typeof o == "function" ? o() : null;
        if (p == null) return;
        const g = i.state.doc.resolve(p), y = g.nodeAfter;
        y && $o.isSelectable(y) && i.dispatch(i.state.tr.setSelection(new $o(g))), (m = a.onTokenClick) == null || m.call(a, s, h.currentTarget.getBoundingClientRect(), p);
      },
      children: d ? /* @__PURE__ */ A("span", { className: "rt-token-nested", children: u }) : u
    }
  );
}, M2 = xx.extend({
  name: "token",
  selectable: !0,
  addOptions() {
    var t;
    return {
      ...(t = this.parent) == null ? void 0 : t.call(this),
      resolve: null,
      onTokenClick: null
    };
  },
  addNodeView() {
    return sx(E2);
  },
  addAttributes() {
    return {
      field: {
        default: null,
        parseHTML: (t) => t.getAttribute("data-field"),
        renderHTML: (t) => t.field ? { "data-field": t.field } : {}
      },
      label: {
        default: null,
        parseHTML: (t) => t.getAttribute("data-label"),
        renderHTML: (t) => t.label ? { "data-label": t.label } : {}
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
  renderHTML({ node: t, HTMLAttributes: e }) {
    return ["span", ox({ "data-type": "token" }, e), `{{${t.attrs.field ?? ""}}}`];
  },
  renderText({ node: t }) {
    return `{{${t.attrs.field ?? ""}}}`;
  }
}), I2 = 240, A2 = 280, _2 = ({ props: t, onApi: e }) => {
  const n = ul(), r = G(e);
  r.current = e, Ye(() => {
    r.current(n);
  }, [n]);
  const i = G(null);
  Ye(() => {
    var s;
    n.pointerDriven || fi((s = i.current) == null ? void 0 : s.querySelector(".ui-item-highlighted"));
  }, [n.highlightedIndex, n.pointerDriven]), Ye(() => {
    t.items.length > 0 && n.highlightedIndex === -1 && n.setHighlighted(0, "keyboard");
  }, [t.items.length, n.highlightedIndex, n]);
  const o = cl();
  return /* @__PURE__ */ A(Fs.Provider, { value: n, children: /* @__PURE__ */ A(
    "div",
    {
      role: "listbox",
      "data-token-popup": !0,
      className: "ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto",
      style: { width: A2, maxHeight: I2 },
      onMouseDown: (s) => s.preventDefault(),
      children: /* @__PURE__ */ A("div", { ref: i, children: t.items.map((s) => /* @__PURE__ */ A(
        P2,
        {
          item: s,
          d: o,
          command: () => t.command({ field: s.key })
        },
        s.key
      )) })
    }
  ) });
}, P2 = ({ item: t, d: e, command: n }) => {
  const { myIndex: r, highlighted: i, setPointer: o } = bb({
    label: () => t.label,
    activate: n
  }), s = mn(), a = { padding: `${Me(8, 12, s)}px ${Me(12, 16, s)}px`, fontSize: Me(12, 14, s) };
  return /* @__PURE__ */ pe(
    "div",
    {
      role: "option",
      "aria-selected": i,
      style: a,
      className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${e.itemDefault} ${i ? "ui-item-highlighted" : ""}`,
      onPointerEnter: () => o(r),
      onClick: n,
      children: [
        /* @__PURE__ */ A("span", { className: `${e.icon} shrink-0 flex items-center`, children: /* @__PURE__ */ A("span", { className: "block w-2 h-2 rounded-full", style: { background: t.color.text } }) }),
        /* @__PURE__ */ A("span", { className: "flex-1 truncate", children: t.label }),
        t.group && /* @__PURE__ */ A("span", { className: "shrink-0 text-[9px] uppercase tracking-wider", style: { color: t.color.text }, children: t.group })
      ]
    }
  );
}, Lp = () => {
  let t = null;
  const e = (r) => {
    t && (t.props = r, t.holder.style.display = r.items.length > 0 ? "" : "none", t.root.render(
      /* @__PURE__ */ A(_2, { props: r, onApi: (i) => {
        t.api = i;
      } })
    ));
  }, n = () => {
    var r;
    t != null && t.props && ((r = t.unmount) == null || r.call(t), t.unmount = t.props.mount(t.holder, {
      // The plugin anchors to the `@`-decoration's start; the caret sits at
      // its END, so shift the popup right by the anchor width — matches the
      // pre-TipTap popup, which anchored exactly at the caret.
      onPosition: ({ x: i, y: o, placement: s, strategy: a }) => {
        var u, d;
        if (!t) return;
        const l = (d = (u = t.props) == null ? void 0 : u.clientRect) == null ? void 0 : d.call(u), c = l && !s.endsWith("-end") ? l.width : 0;
        t.holder.style.position = a, t.holder.style.left = `${i + c}px`, t.holder.style.top = `${o}px`;
      }
    }));
  };
  return {
    onStart(r) {
      const i = document.createElement("div");
      i.style.zIndex = "10002";
      const o = kx(i);
      t = { holder: i, root: o, unmount: null, props: r, api: null }, n(), e(r);
    },
    onUpdate(r) {
      t && (e(r), n());
    },
    onKeyDown({ event: r }) {
      if (!(t != null && t.props) || !t.api) return !1;
      const { items: i, command: o } = t.props;
      if (i.length === 0) return !1;
      const s = t.api, a = r.key;
      if (a === "ArrowDown" || a === "ArrowUp") {
        r.preventDefault();
        const l = s.highlightedIndex, c = a === "ArrowDown" ? 1 : -1;
        return s.setHighlighted((l + c + i.length) % i.length, "keyboard"), !0;
      }
      if (a === "Enter" || a === "Tab") {
        r.preventDefault();
        const l = s.highlightedIndex, c = l >= 0 ? l : 0, u = s.items[c];
        return u ? u.activate() : i[c] && o({ field: i[c].key }), !0;
      }
      return !1;
    },
    onExit() {
      var r;
      t && ((r = t.unmount) == null || r.call(t), t.root.unmount(), t.holder.remove(), t = null);
    }
  };
}, D2 = b2.create({
  name: "reportTextStyle",
  priority: 102,
  addAttributes() {
    return {
      styleId: {
        default: null,
        parseHTML: (t) => t.getAttribute("data-text-style"),
        renderHTML: (t) => t.styleId ? { "data-text-style": t.styleId } : {}
      }
    };
  },
  parseHTML() {
    return [{ tag: "span[data-text-style]" }];
  },
  renderHTML({ HTMLAttributes: t }) {
    return ["span", t, 0];
  }
}), Na = new Kr("retainedSelectionHighlight"), N2 = _r.create({
  name: "retainedSelectionHighlight",
  addProseMirrorPlugins() {
    return [
      new hi({
        key: Na,
        state: {
          init: () => ({ held: !1, decorations: sa.empty }),
          apply(t, e) {
            const n = t.getMeta(Na), r = n ? n.held : e.held;
            if (!r) return { held: !1, decorations: sa.empty };
            const { from: i, to: o, empty: s } = t.selection;
            return {
              held: r,
              decorations: s ? sa.empty : sa.create(t.doc, [dx.inline(i, o, { class: "rt-retained-selection" })])
            };
          }
        },
        props: {
          decorations(t) {
            var e;
            return (e = Na.getState(t)) == null ? void 0 : e.decorations;
          }
        }
      })
    ];
  }
}), S3 = {
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
function Dv(t, e) {
  const n = t.state.doc.resolve(e).nodeBefore;
  return n && n.type.name === "token" ? n.attrs.field ?? "" : null;
}
function O2(t) {
  const e = t.state.selection.$from, n = e.nodeBefore;
  if (!(n != null && n.isText)) return null;
  const r = n.text || "", i = r.lastIndexOf(".");
  if (i < 0) return null;
  const o = e.pos - r.length + i, s = Dv(t, o);
  return s == null ? null : { chipKey: s, dotPos: o };
}
const z2 = Pt.forwardRef(({
  value: t,
  onChange: e,
  placeholder: n,
  disabled: r,
  className: i,
  onStateChange: o,
  resolveToken: s,
  suggestionItems: a,
  attributeItems: l,
  onTokenClick: c,
  onSelectionChange: u
}, d) => {
  const f = G(s);
  f.current = s;
  const h = G(a);
  h.current = a;
  const p = G(l);
  p.current = l;
  const g = G(c);
  g.current = c;
  const y = G(u);
  y.current = u;
  const m = G(null), b = G(null), C = G(e);
  C.current = e;
  const I = G(r);
  I.current = r;
  const v = G(o);
  v.current = o;
  const T = G(null), D = (x) => {
    var Y;
    const M = x.getAttributes("textStyle"), _ = x.getAttributes("reportTextStyle"), { from: E, to: O, empty: L } = x.state.selection;
    let W = !1, re = !1, F = !1;
    if (!L) {
      const j = /* @__PURE__ */ new Set(), ee = /* @__PURE__ */ new Set(), H = /* @__PURE__ */ new Set();
      x.state.doc.nodesBetween(E, O, (Z) => {
        if (!Z.isText) return;
        const J = Z.marks.find((K) => K.type.name === "textStyle");
        j.add((J == null ? void 0 : J.attrs.fontFamily) || ""), ee.add((J == null ? void 0 : J.attrs.fontSize) || "");
        const V = Z.marks.find((K) => K.type.name === "reportTextStyle");
        H.add((V == null ? void 0 : V.attrs.styleId) || "");
      }), W = j.size > 1, re = ee.size > 1, F = H.size > 1;
    }
    const N = {
      bold: x.isActive("bold"),
      italic: x.isActive("italic"),
      underline: x.isActive("underline"),
      strike: x.isActive("strike"),
      link: x.isActive("link"),
      color: M.color || "",
      fontFamily: M.fontFamily || "",
      fontSize: M.fontSize || "",
      textStyle: _.styleId || "",
      hasSelection: !L,
      fontFamilyMixed: W,
      fontSizeMixed: re,
      textStyleMixed: F
    }, te = T.current;
    te && te.bold === N.bold && te.italic === N.italic && te.underline === N.underline && te.strike === N.strike && te.link === N.link && te.color === N.color && te.fontFamily === N.fontFamily && te.fontSize === N.fontSize && te.textStyle === N.textStyle && te.hasSelection === N.hasSelection && te.fontFamilyMixed === N.fontFamilyMixed && te.fontSizeMixed === N.fontSizeMixed && te.textStyleMixed === N.textStyleMixed || (T.current = N, (Y = v.current) == null || Y.call(v, N));
  }, P = (x) => {
    var L;
    const M = x.state.selection;
    let _ = null;
    M instanceof $o && M.node.type.name === "token" ? (_ = { key: M.node.attrs.field ?? "", pos: M.from }, m.current = M.from) : m.current != null && (m.current = x.state.tr.mapping.map(m.current));
    const E = b.current, O = E && _ && E.key === _.key && E.pos === _.pos;
    !E && !_ || O || (b.current = _, (L = y.current) == null || L.call(y, _));
  }, S = (x) => {
    const M = C2(R2(x));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(M) ? "" : M;
  }, z = Pt.useMemo(() => {
    const x = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: E }) => {
        var O;
        return ((O = h.current) == null ? void 0 : O.call(h, E)) ?? [];
      },
      command: ({ editor: E, range: O, props: L }) => {
        E.chain().focus().insertContentAt(O, { type: "token", attrs: { field: L.field } }).run();
      },
      render: Lp
    }, M = M2.configure({
      resolve: f.current ?? null,
      suggestion: x,
      onTokenClick: (E, O, L) => {
        var W;
        m.current = L, (W = g.current) == null || W.call(g, E, O, L);
      }
    }), _ = _r.create({
      name: "tokenAttributeSuggestion",
      addProseMirrorPlugins() {
        return [
          wx({
            pluginKey: new Kr("tokenAttributeSuggestion"),
            editor: this.editor,
            char: ".",
            // The gate is `shouldShow` (a chip must sit immediately before the
            // dot), not the prefix rule — the prefix here is an atom, not text.
            allowedPrefixes: null,
            decorationClass: "suggestion-attr",
            shouldShow: ({ editor: E, range: O }) => Dv(E, O.from) != null,
            items: ({ editor: E, query: O }) => {
              var W;
              const L = O2(E);
              return L ? ((W = p.current) == null ? void 0 : W.call(p, L.chipKey, O)) ?? [] : [];
            },
            command: ({ editor: E, range: O, props: L }) => {
              E.chain().focus().insertContentAt(O, { type: "token", attrs: { field: L.field } }).run();
            },
            render: Lp
          })
        ];
      }
    });
    return [M, _];
  }, []), k = lx({
    immediatelyRender: !1,
    extensions: [
      fx,
      hx.configure({ placeholder: n }),
      px,
      gx,
      mx,
      D2,
      N2,
      yx,
      vx,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      bx.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      ...z
    ],
    content: zp(t || ""),
    editable: !r,
    onUpdate: ({ editor: x }) => {
      C.current(S(x.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: x }) => {
      D(x), P(x);
    }
  });
  return Ye(() => {
    if (!k || k.isFocused) return;
    S(k.getHTML()) !== t && (T.current = null, k.commands.setContent(zp(t || ""), { emitUpdate: !1 }), D(k));
  }, [t, k]), Ye(() => {
    k && k.setEditable(!r);
  }, [r, k]), Ye(() => {
    k && (T.current = null, D(k), P(k));
  }, [k]), jy(d, () => ({
    exec: (x, M, _) => {
      if (!k || I.current) return;
      const E = k.chain(), O = (_ == null ? void 0 : _.focus) === !1 ? E : E.focus();
      switch (x) {
        case "bold":
          O.toggleBold().run();
          break;
        case "italic":
          O.toggleItalic().run();
          break;
        case "underline":
          O.toggleUnderline().run();
          break;
        case "strikeThrough":
          O.toggleStrike().run();
          break;
        case "foreColor":
          M && O.setColor(M).run();
          break;
        case "unsetColor":
          O.unsetColor().run();
          break;
        case "fontFamily":
          M && O.setFontFamily(M).run();
          break;
        case "unsetFontFamily":
          O.unsetFontFamily().run();
          break;
        case "fontSize":
          M && O.setFontSize(M).run();
          break;
        case "unsetFontSize":
          O.unsetFontSize().run();
          break;
        // Linked named style: mark the run with the consumer's style id. Direct
        // font family/size on the range is cleared so the linked style's
        // typography takes effect (the object-level precedent); bold/italic
        // marks stay — direct character formatting still wins (Word).
        case "textStyle":
          M && O.setMark("reportTextStyle", { styleId: M }).unsetFontFamily().unsetFontSize().run();
          break;
        case "unsetTextStyle":
          O.unsetMark("reportTextStyle").run();
          break;
        // Clear every inline mark (bold/italic/underline/strike/color/font/
        // link) and normalize the block — the cell-chrome Reset path.
        case "clearFormatting":
          O.unsetAllMarks().clearNodes().run();
          break;
        case "link":
          M && O.extendMarkRange("link").setLink({ href: M }).run();
          break;
        case "unlink":
          O.extendMarkRange("link").unsetLink().run();
          break;
      }
    },
    focus: (x) => k == null ? void 0 : k.commands.focus(x),
    insertToken: (x) => {
      !k || I.current || k.chain().focus().insertContent({ type: "token", attrs: { field: x } }).run();
    },
    replaceToken: (x) => {
      if (!k || I.current) return;
      const M = m.current;
      M != null && k.commands.command(({ tr: _ }) => {
        const E = _.doc.nodeAt(M);
        if (!E || E.type.name !== "token") return !1;
        _.setNodeMarkup(M, void 0, { field: x });
        const O = _.doc.resolve(M);
        return O.nodeAfter && O.nodeAfter.type.name === "token" && _.setSelection(new $o(O)), !0;
      });
    },
    holdSelectionHighlight: (x) => {
      !k || k.isDestroyed || k.view.dispatch(k.state.tr.setMeta(Na, { held: x }));
    }
  }), [k]), /* @__PURE__ */ A(cx, { editor: k, className: `richtext-editor ${i || ""}` });
});
z2.displayName = "RichTextEditor";
const L2 = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], $2 = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], $p = ({ className: t = "w-3 h-3" }) => /* @__PURE__ */ A("span", { className: `${t} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ A("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), F2 = ({ value: t, disabled: e, onChange: n, mixed: r }) => {
  const [i, o] = Xe(!1);
  return /* @__PURE__ */ A(
    dl,
    {
      open: i,
      onOpenChange: o,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ pe("button", { type: "button", disabled: e, className: `${Ck} w-28 justify-between`, children: [
        r ? /* @__PURE__ */ A("span", { className: "truncate italic text-zinc-500", children: "Mixed" }) : /* @__PURE__ */ A("span", { className: "truncate", style: { fontFamily: t || "Helvetica" }, children: t || "Helvetica" }),
        /* @__PURE__ */ A(Ai, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: L2.map((s) => /* @__PURE__ */ A(Xx, { onClick: () => {
        n(s), o(!1);
      }, icon: !r && s === t ? /* @__PURE__ */ A(Os, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ A("span", { style: { fontFamily: s }, children: s }) }, s))
    }
  );
}, H2 = ({ editorRef: t, disabled: e, active: n }) => {
  const [r, i] = Xe(!1), o = fl(), [s, a] = Xe(""), l = () => {
    var u;
    const c = s.trim();
    c && ((u = t.current) == null || u.exec("link", c), i(!1));
  };
  return /* @__PURE__ */ A(
    dl,
    {
      open: r,
      onOpenChange: i,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ A(
        lr,
        {
          theme: "dark",
          active: n,
          disabled: e,
          onMouseDown: (c) => c.preventDefault(),
          style: { ...o.toggle, padding: 0 },
          className: "justify-center",
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ A(Xw, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ pe("div", { className: "p-2 flex flex-col gap-2", children: [
        /* @__PURE__ */ A(
          "input",
          {
            value: s,
            onChange: (c) => a(c.target.value),
            placeholder: "https://…",
            autoFocus: !0,
            onKeyDown: (c) => {
              c.key === "Enter" && (c.preventDefault(), l());
            },
            style: o.input,
            className: kk + " w-full"
          }
        ),
        /* @__PURE__ */ pe("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ A(lr, { theme: "dark", onClick: l, style: o.control, disabled: !s.trim(), children: "Apply" }),
          /* @__PURE__ */ A(
            lr,
            {
              theme: "dark",
              onClick: () => {
                var c;
                (c = t.current) == null || c.exec("unlink"), i(!1);
              },
              style: o.control,
              children: "Remove"
            }
          )
        ] })
      ] })
    }
  );
}, C3 = ({ editorRef: t, disabled: e, active: n, lockedFormatting: r, trailing: i, font: o, fontSizeSlot: s, showClearFormatting: a, dividers: l = !0 }) => {
  const [c, u] = Xe(!1), d = (y, m) => {
    var b;
    return (b = t.current) == null ? void 0 : b.exec(y, m);
  }, f = fl(), h = (y) => !!(r != null && r[y]), p = "flex items-center gap-1 shrink-0", g = l ? /* @__PURE__ */ A("div", { className: Sb }) : null;
  return /* @__PURE__ */ pe("div", { className: `flex flex-wrap items-center ${l ? "gap-x-1" : "gap-x-2"} gap-y-1.5`, children: [
    /* @__PURE__ */ pe("div", { className: p, children: [
      /* @__PURE__ */ A(Co, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ A(lr, { theme: "dark", "aria-label": "Bold", active: ((n == null ? void 0 : n.bold) ?? !1) || h("bold"), disabled: e || h("bold"), onMouseDown: (y) => y.preventDefault(), onClick: () => d("bold"), style: { ...f.toggle, padding: 0 }, className: "justify-center font-bold", children: "B" }) }),
      /* @__PURE__ */ A(Co, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ A(lr, { theme: "dark", "aria-label": "Italic", active: ((n == null ? void 0 : n.italic) ?? !1) || h("italic"), disabled: e || h("italic"), onMouseDown: (y) => y.preventDefault(), onClick: () => d("italic"), style: { ...f.toggle, padding: 0 }, className: "justify-center italic", children: "I" }) }),
      /* @__PURE__ */ A(Co, { content: "Underline", children: /* @__PURE__ */ A(lr, { theme: "dark", "aria-label": "Underline", active: (n == null ? void 0 : n.underline) ?? !1, disabled: e, onMouseDown: (y) => y.preventDefault(), onClick: () => d("underline"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ A(Uw, { className: "w-3 h-3" }) }) }),
      /* @__PURE__ */ A(Co, { content: "Strikethrough", children: /* @__PURE__ */ A(lr, { theme: "dark", "aria-label": "Strikethrough", active: (n == null ? void 0 : n.strike) ?? !1, disabled: e, onMouseDown: (y) => y.preventDefault(), onClick: () => d("strikeThrough"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ A(Gw, { className: "w-3 h-3" }) }) })
    ] }),
    g,
    /* @__PURE__ */ A("div", { className: p, children: /* @__PURE__ */ A(H2, { editorRef: t, disabled: e, active: (n == null ? void 0 : n.link) ?? !1 }) }),
    g,
    /* @__PURE__ */ A("div", { className: p, children: /* @__PURE__ */ A(
      dl,
      {
        open: c,
        onOpenChange: u,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ pe(lr, { theme: "dark", disabled: e, style: f.control, className: "justify-between min-w-0", title: "Text color", children: [
          n != null && n.color ? /* @__PURE__ */ A("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: n.color } }) : /* @__PURE__ */ A($p, {}),
          /* @__PURE__ */ A(Ai, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ pe("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ A(
            "button",
            {
              onClick: () => {
                d("unsetColor"), u(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${n != null && n.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ A($p, { className: "w-3.5 h-3.5" })
            }
          ),
          $2.map((y) => /* @__PURE__ */ A(
            "button",
            {
              onClick: () => {
                d("foreColor", y), u(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors ${y === (n == null ? void 0 : n.color) ? "ring-2 ring-zinc-300" : ""}`,
              style: { background: y },
              title: y
            },
            y
          ))
        ] })
      }
    ) }),
    (o || s || a) && /* @__PURE__ */ pe(Dn, { children: [
      g,
      /* @__PURE__ */ pe("div", { className: p, children: [
        o && /* @__PURE__ */ A(F2, { value: o.value || "Helvetica", mixed: o.mixed, disabled: e, onChange: o.onChange }),
        s,
        a && /* @__PURE__ */ A(Co, { content: "Clear formatting", children: /* @__PURE__ */ A(
          lr,
          {
            theme: "dark",
            "aria-label": "Clear formatting",
            disabled: e,
            onMouseDown: (y) => y.preventDefault(),
            onClick: () => d("clearFormatting"),
            style: { ...f.toggle, padding: 0 },
            className: "justify-center",
            children: /* @__PURE__ */ A(Yw, { className: "w-3 h-3" })
          }
        ) })
      ] })
    ] }),
    i && /* @__PURE__ */ pe(Dn, { children: [
      g,
      /* @__PURE__ */ A("div", { className: p, children: i })
    ] })
  ] });
};
function ih(t, e, n) {
  return Math.max(e, Math.min(n, t));
}
function B2(t, e, n, r, i) {
  return ih(t + e * i, n, r);
}
const q2 = 2;
function W2(t, e, n, r, i) {
  return ih(t + Math.trunc(e / q2) * i, n, r);
}
const j2 = 3;
function R3({
  value: t,
  min: e,
  max: n,
  fallback: r,
  onCommit: i,
  step: o = 1,
  readOnly: s,
  disabled: a,
  ariaLabel: l,
  className: c,
  title: u,
  placeholder: d,
  theme: f
}) {
  const [h, p] = Xe(null), [g, y] = Xe(!1), m = G(!1), b = G(null), C = G(null), I = G(null), v = mn(), T = xb(), D = c === void 0;
  Ye(() => () => {
    var O;
    return (O = b.current) == null ? void 0 : O.call(b);
  }, []), Nn(() => {
    const O = I.current, L = C.current;
    !D && O && L && (L.style.color = getComputedStyle(O).color);
  }, [D, c]), Ye(() => {
    m.current || p(null);
  }, [t]);
  const P = t ?? r, S = h !== null ? h : t != null ? String(t) : d ? "" : String(r), z = (O) => ih(O, e, n), k = (O) => {
    const L = B2(P, O, e, n, o);
    L !== P && (m.current && p(String(L)), i(L));
  }, x = (O) => {
    if (a || s || O.pointerType !== "mouse" || O.button !== 0) return;
    const L = O.currentTarget, W = O.clientY, re = P;
    let F = re, N = !1;
    const te = (j) => {
      const ee = W - j.clientY;
      if (!N) {
        if (Math.abs(ee) < j2) return;
        N = !0, L.blur(), L.style.userSelect = "none";
      }
      const H = W2(re, ee, e, n, o);
      H !== F && (F = H, i(H));
    }, Y = () => {
      b.current = null, window.removeEventListener("pointermove", te), window.removeEventListener("pointerup", Y), window.removeEventListener("pointercancel", Y), L.style.userSelect = "", N && L.blur();
    };
    b.current = Y, window.addEventListener("pointermove", te), window.addEventListener("pointerup", Y), window.addEventListener("pointercancel", Y);
  }, M = (O) => ({
    type: "button",
    tabIndex: -1,
    "aria-label": O === 1 ? "Increase" : "Decrease",
    disabled: !!a || !!s || (O === 1 ? P >= n : P <= e),
    onPointerDown: (L) => L.preventDefault(),
    onClick: () => k(O)
  }), _ = D ? Me(22, 30, v) : Me(16, 22, v), E = D ? Me(14, 18, v) : Me(11, 15, v);
  return /* @__PURE__ */ pe(
    "span",
    {
      ref: C,
      className: `ui-number ${D ? "ui-number-box" : ""}`,
      ...f ? { "data-theme": f } : {},
      children: [
        /* @__PURE__ */ A(
          "input",
          {
            ref: I,
            type: "number",
            "aria-label": l,
            title: u,
            placeholder: d,
            value: S,
            readOnly: s,
            disabled: a,
            className: c ?? "ui-input w-20",
            style: {
              ...D ? { ...T, minHeight: Me(28, 36, v) } : {},
              paddingRight: _ + 2,
              cursor: a || s ? void 0 : g ? "text" : "ns-resize"
            },
            onFocus: () => {
              m.current = !0, y(!0);
            },
            onChange: (O) => {
              const L = O.target.value;
              p(L);
              const W = parseInt(L, 10);
              L !== "" && !Number.isNaN(W) && i(z(W));
            },
            onBlur: () => {
              if (m.current = !1, y(!1), h === null) return;
              const O = parseInt(h, 10);
              Number.isNaN(O) || i(z(O)), p(null);
            },
            onKeyDown: (O) => {
              O.key === "Enter" && O.target.blur(), O.key === "Escape" && (p(null), O.target.blur()), !s && !a && (O.key === "ArrowUp" || O.key === "ArrowDown") && (O.preventDefault(), k(O.key === "ArrowUp" ? 1 : -1));
            },
            onPointerDown: x
          }
        ),
        /* @__PURE__ */ pe("span", { className: "ui-number-steppers", style: { width: _ }, children: [
          /* @__PURE__ */ A("button", { ...M(1), className: "ui-number-step", children: /* @__PURE__ */ A(Vw, { style: { width: E, height: E } }) }),
          /* @__PURE__ */ A("button", { ...M(-1), className: "ui-number-step", children: /* @__PURE__ */ A(Ai, { style: { width: E, height: E } }) })
        ] })
      ]
    }
  );
}
function T3({ title: t, icon: e, count: n, tone: r = "default", collapsed: i, onToggle: o, trailing: s, bodyClass: a, className: l = "", dataProps: c, children: u }) {
  const d = mn(), f = _i({ px: 12, py: 8, fs: 12 }, { px: 14, py: 12, fs: 14 }), h = Me(14, 16, d), p = { width: h, height: h }, g = Me(10, 12, d);
  return /* @__PURE__ */ pe("div", { ...c, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${l}`, children: [
    /* @__PURE__ */ pe("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1 bg-[var(--ui-card-header-bg)] text-[color:var(--ui-card-header-text)] hover:bg-[var(--ui-card-header-hover)] transition-colors", style: f, children: [
      /* @__PURE__ */ pe(
        "button",
        {
          type: "button",
          onClick: o,
          className: "flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer",
          children: [
            i ? /* @__PURE__ */ A(La, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: p }) : /* @__PURE__ */ A(Ai, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: p }),
            e && /* @__PURE__ */ A("span", { className: "text-[color:var(--ui-card-header-icon)] shrink-0 inline-flex", children: e }),
            /* @__PURE__ */ A("span", { className: "font-semibold text-[color:var(--ui-card-header-text)] truncate", children: t }),
            n && /* @__PURE__ */ A("span", { className: "ui-card-count shrink-0", style: { fontSize: g }, children: n })
          ]
        }
      ),
      s && /* @__PURE__ */ A("div", { className: "shrink-0", children: s })
    ] }),
    !i && u && /* @__PURE__ */ A("div", { className: a || "ui-card-band border-t p-1.5 space-y-1", children: u })
  ] });
}
function oh({
  expanded: t,
  collapsedWidth: e,
  expandedWidth: n,
  trigger: r,
  field: i,
  rootRef: o,
  shrink: s = !1,
  stretch: a = !1,
  className: l = "",
  style: c,
  ...u
}) {
  const d = G(null), f = G(null), [h, p] = Xe(null), g = (T) => {
    d.current = T, typeof o == "function" ? o(T) : o && (o.current = T);
  };
  Nn(() => {
    if (t) return;
    const T = d.current;
    if (!T || (f.current = T.getBoundingClientRect().width, typeof ResizeObserver > "u")) return;
    const D = new ResizeObserver(() => {
      f.current = T.getBoundingClientRect().width;
    });
    return D.observe(T), () => D.disconnect();
  }, [t]), Nn(() => {
    if (!t || e !== "auto") {
      p(null);
      return;
    }
    p(f.current);
    const T = requestAnimationFrame(() => p(null));
    return () => cancelAnimationFrame(T);
  }, [t, e]);
  const [y, m] = Xe(!1), [b, C] = Xe(null), I = G(!1);
  Nn(() => {
    if (t) {
      I.current = !0, m(!1), C(null);
      return;
    }
    if (!I.current || e !== "auto") return;
    I.current = !1, m(!0);
    let T = 0, D = 0;
    return (() => {
      var k;
      const S = (k = d.current) == null ? void 0 : k.firstElementChild, z = (S == null ? void 0 : S.getBoundingClientRect().width) ?? 0;
      z > 0 ? (T = requestAnimationFrame(() => C(z)), D = window.setTimeout(() => {
        m(!1), C(null);
      }, Pi + 30)) : m(!1);
    })(), () => {
      cancelAnimationFrame(T), window.clearTimeout(D);
    };
  }, [t, e]);
  const v = t ? h ?? n : y ? b ?? n : e === "auto" ? "auto" : e;
  return /* @__PURE__ */ pe(
    "div",
    {
      ...u,
      ref: g,
      className: `relative ${a ? "flex" : "inline-flex"} ${s ? "shrink-0" : ""} ${l}`,
      style: {
        ...c,
        width: a ? "100%" : v,
        transition: "width 220ms cubic-bezier(0.32, 0.72, 0, 1)"
      },
      children: [
        /* @__PURE__ */ A(
          "div",
          {
            className: `${a ? "w-full" : e === "auto" ? "w-auto" : "w-full"} origin-left ${t ? "opacity-0 pointer-events-none" : "opacity-100"} motion-reduce:transition-none`,
            style: {
              transform: t ? "scaleX(0.98)" : "scaleX(1)",
              transition: "opacity 150ms ease, transform 220ms cubic-bezier(0.32, 0.72, 0, 1)"
            },
            "aria-hidden": t,
            children: r
          }
        ),
        /* @__PURE__ */ A(
          "div",
          {
            className: `absolute inset-0 origin-left ${t ? "opacity-100" : "opacity-0 pointer-events-none"} motion-reduce:transition-none`,
            style: {
              transform: t ? "scaleX(1)" : "scaleX(0.96)",
              transition: "opacity 150ms ease, transform 220ms cubic-bezier(0.32, 0.72, 0, 1)"
            },
            "aria-hidden": !t,
            children: i
          }
        )
      ]
    }
  );
}
function Nv({
  value: t,
  onChange: e,
  triggerLabel: n = "Filter",
  triggerIcon: r,
  placeholder: i = "Filter…",
  collapsedWidth: o = 88,
  expandedWidth: s = 200,
  variant: a = "subtle",
  triggerCollapse: l = !1,
  iconWithLabel: c = !0,
  triggerReveal: u = !1,
  theme: d,
  active: f = !1,
  autoFocus: h = !1,
  onExpandedChange: p,
  stretch: g = !1,
  actions: y,
  leadingIcon: m,
  showClear: b = !0,
  onSubmit: C,
  onCancel: I,
  cancelOnEscape: v = !1,
  cancelOnOutside: T = !1,
  className: D = "",
  "aria-label": P
}) {
  const [S, z] = Xe(h), k = G(S);
  k.current = S;
  const x = G(null), M = G(null), _ = G(null), E = Jy(), O = mn(), L = Me(9, 13, O), W = Le((V) => {
    k.current !== V && (k.current = V, z(V), p == null || p(V));
  }, [p]), re = Le((V = !1) => {
    var K;
    W(!1), (K = M.current) == null || K.blur(), V && requestAnimationFrame(() => {
      var le;
      return (le = _.current) == null ? void 0 : le.focus();
    });
  }, [W]), F = Le(() => {
    W(!0), requestAnimationFrame(() => {
      const V = M.current;
      if (!V) return;
      V.focus();
      const K = V.value.length;
      V.setSelectionRange(K, K);
    });
  }, [W]);
  Ye(() => {
    h && F();
  }, [h, F]), Ye(() => {
    var le;
    if (!S) return;
    const V = ((le = x.current) == null ? void 0 : le.ownerDocument) ?? document, K = (ue) => {
      var we;
      const ke = ue.target;
      ke && ((we = x.current) != null && we.contains(ke) || (T && (I == null || I()), re()));
    };
    return V.addEventListener("pointerdown", K, !0), () => V.removeEventListener("pointerdown", K, !0);
  }, [S, re, T, I]);
  const N = Le((V) => {
    var le;
    if (!S) return;
    const K = V.relatedTarget;
    K && ((le = x.current) != null && le.contains(K)) || (T && (I == null || I()), re());
  }, [S, re, T, I]), te = Le((V) => {
    if (V.key === "Enter") {
      V.preventDefault(), C == null || C(t), re(!0);
      return;
    }
    V.key === "Escape" && (V.preventDefault(), V.stopPropagation(), v ? I == null || I() : e(""), re(!0));
  }, [e, re, v, I, C, t]), Y = r === void 0 ? /* @__PURE__ */ A(Io, { className: "w-3.5 h-3.5" }) : r, j = m === void 0 ? Y : m, Z = 8 + (((y == null ? void 0 : y.length) || 0) + (b && t ? 1 : 0)) * (E.box + 2), J = (V) => /* @__PURE__ */ A(
    "span",
    {
      style: { width: E.icon, height: E.icon },
      className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
      children: V
    }
  );
  return /* @__PURE__ */ A(
    oh,
    {
      expanded: S,
      collapsedWidth: o,
      expandedWidth: s,
      rootRef: x,
      shrink: !0,
      stretch: g,
      "data-morph-search": !0,
      "data-theme": d,
      "data-expanded": S ? "true" : "false",
      className: D,
      onBlur: N,
      trigger: /* @__PURE__ */ A(
        lr,
        {
          ref: _,
          type: "button",
          variant: a,
          size: "minimal",
          theme: d,
          icon: Y,
          collapse: l,
          iconWithLabel: c,
          revealOnHover: u,
          active: f,
          keepLabelOnActive: !0,
          onClick: F,
          className: `${l ? "w-auto" : "w-full"} ${g ? "justify-center" : "justify-start"} ${S ? "pointer-events-none" : ""}`,
          tabIndex: S ? -1 : 0,
          "aria-expanded": S,
          "aria-label": P || n,
          "data-morph-search-trigger": !0,
          children: /* @__PURE__ */ A("span", { className: `min-w-0 ${l ? "" : "truncate"}`, children: n })
        }
      ),
      field: /* @__PURE__ */ pe(Dn, { children: [
        j && /* @__PURE__ */ A(
          "span",
          {
            className: "ui-icon absolute top-1/2 -translate-y-1/2 pointer-events-none",
            style: { left: L, width: E.icon, height: E.icon },
            children: J(j)
          }
        ),
        /* @__PURE__ */ A(
          "input",
          {
            ref: M,
            value: t,
            onChange: (V) => e(V.target.value),
            onKeyDown: te,
            placeholder: i,
            "aria-label": P || i,
            tabIndex: S ? 0 : -1,
            "data-morph-search-input": !0,
            style: { paddingLeft: j ? L + E.icon + 6 : 10, paddingRight: Z },
            className: `${Ha("sm")} w-full`
          }
        ),
        /* @__PURE__ */ pe("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
          y == null ? void 0 : y.map((V) => /* @__PURE__ */ A(
            "button",
            {
              type: "button",
              "aria-label": V.label,
              title: V.label,
              tabIndex: S ? 0 : -1,
              onMouseDown: (K) => K.preventDefault(),
              onClick: () => {
                V.onClick(t, { close: () => re(!0) }), V.keepOpen || re(!0);
              },
              style: { width: E.box, height: E.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-action": V.key,
              children: J(V.icon)
            },
            V.key
          )),
          b && t && /* @__PURE__ */ A(
            "button",
            {
              type: "button",
              "aria-label": "Clear",
              tabIndex: S ? 0 : -1,
              onClick: () => {
                e(""), requestAnimationFrame(() => {
                  var V;
                  return (V = M.current) == null ? void 0 : V.focus();
                });
              },
              style: { width: E.box, height: E.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-clear": !0,
              children: /* @__PURE__ */ A(eo, { size: E.icon })
            }
          )
        ] })
      ] })
    }
  );
}
function K2({
  triggerLabel: t,
  triggerIcon: e = /* @__PURE__ */ A(ol, { className: "w-3.5 h-3.5" }),
  fieldIcon: n = null,
  actions: r = [],
  onSubmit: i,
  onCancel: o,
  clearOnSubmit: s = !0,
  clearOnCancel: a = !0,
  onChange: l,
  value: c,
  variant: u = "primary",
  triggerCollapse: d = !1,
  iconWithLabel: f = !0,
  ...h
}) {
  const p = (m) => {
    i == null || i(m), s && l("");
  }, g = () => {
    o == null || o(), a && l("");
  }, y = [
    ...r,
    ...i ? [{
      key: "submit",
      label: "Submit",
      icon: /* @__PURE__ */ A(Os, { className: "w-3.5 h-3.5" }),
      onClick: p
    }] : [],
    ...o ? [{
      key: "cancel",
      label: "Cancel",
      icon: /* @__PURE__ */ A(eo, { className: "w-3.5 h-3.5" }),
      onClick: g
    }] : []
  ];
  return /* @__PURE__ */ A(
    Nv,
    {
      ...h,
      value: c,
      onChange: l,
      triggerLabel: t,
      triggerIcon: e,
      triggerCollapse: d,
      iconWithLabel: f,
      leadingIcon: n,
      actions: y,
      showClear: !1,
      variant: u,
      onSubmit: i ? p : void 0,
      onCancel: o ? g : void 0,
      cancelOnEscape: !!o,
      cancelOnOutside: !!o
    }
  );
}
function U2(t) {
  return t.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
}
function G2(t, e, n) {
  if (n.length === 0) return { matched: !1 };
  const r = t.label.toLowerCase(), i = (t.detail || "").toLowerCase(), o = ((e == null ? void 0 : e.label) || "").toLowerCase(), s = t.fields || [], a = [
    r,
    i,
    o,
    t.keywords || "",
    ...s.map((l) => l.value.toLowerCase())
  ].join(`
`);
  if (!n.every((l) => a.includes(l))) return { matched: !1 };
  if (n.every((l) => r.includes(l) || o.includes(l))) return { matched: !0 };
  for (const l of n) {
    const c = s.find((u) => u.value.toLowerCase().includes(l));
    if (c) {
      const u = c.value.trim();
      return { matched: !0, detail: `${c.label}: ${u.length > 48 ? `${u.slice(0, 47)}…` : u}` };
    }
    if (i.includes(l)) return { matched: !0, detail: t.detail };
  }
  return { matched: !0 };
}
function Ov(t, e, n) {
  const r = U2(n), i = r.length > 0, o = new Map(e.map((c) => [c.key, c])), s = [];
  for (const c of t) {
    const { matched: u, detail: d } = G2(c, c.group ? o.get(c.group) : void 0, r);
    u && s.push({ item: c, detail: d });
  }
  const a = new Set(s.map((c) => c.item.group).filter(Boolean)), l = i ? e.filter((c) => a.has(c.key) || c.label.toLowerCase().includes(n.trim().toLowerCase())) : e;
  return { hits: s, visibleGroups: l, hasQuery: i };
}
function Y2(t) {
  var u;
  const { hits: e, visibleGroups: n, hasQuery: r } = Ov(t.items, t.groups, t.query), i = [];
  t.query.trim();
  const o = t.items.filter((d) => d.pinned), s = t.items.filter((d) => !d.pinned), a = e.filter((d) => d.item.pinned), l = e.filter((d) => !d.item.pinned);
  if (!r) {
    for (const d of o) i.push({ kind: "item", hit: { item: d } });
    if (t.browseAll) {
      for (const d of s) i.push({ kind: "item", hit: { item: d } });
      return i;
    }
    if (t.browseGroups !== !1)
      for (const d of n) {
        i.push({ kind: "group", group: d });
        const f = ((u = t.expandedGroups) == null ? void 0 : u.has(d.key)) ?? !1;
        if (t.includeGroupItems)
          for (const h of s)
            h.group === d.key && i.push({ kind: "item", hit: { item: h }, hidden: !f });
        else if (f)
          for (const h of s)
            h.group === d.key && i.push({ kind: "item", hit: { item: h } });
      }
    return i;
  }
  for (const d of a) i.push({ kind: "item", hit: d });
  const c = /* @__PURE__ */ new Set();
  for (const d of n) {
    i.push({ kind: "group", group: d }), c.add(d.key);
    for (const f of l)
      f.item.group === d.key && i.push({ kind: "item", hit: f });
  }
  for (const d of l)
    (!d.item.group || !c.has(d.item.group)) && i.push({ kind: "item", hit: d });
  return i.length === 0 && (i.push({ kind: "empty" }), (t.emptyActionLabels || []).forEach((d, f) => {
    i.push({ kind: "action", label: d, actionIndex: f });
  })), i;
}
function X2({
  items: t,
  groups: e = [],
  mode: n = "expandable",
  triggerLabel: r = "Search",
  triggerIcon: i,
  triggerVariant: o = "primary",
  triggerClassName: s,
  placeholder: a = "Search…",
  query: l,
  onQueryChange: c,
  onSelect: u,
  onSelectGroup: d,
  onClose: f,
  closeOnSelect: h = !0,
  openOnFocus: p = !0,
  expandableGroups: g = !1,
  browseExpanded: y = !1,
  groupExpandMode: m = "multiple",
  browseAll: b = !1,
  selectedId: C,
  autoFocus: I = !0,
  collapsedWidth: v = 128,
  expandedWidth: T = 288,
  panelWidth: D,
  panelMinWidth: P,
  keepAllRows: S = !1,
  maxMenuHeight: z = 420,
  theme: k = "light",
  morph: x = !0,
  emptyTitle: M,
  emptyHint: _,
  renderEmpty: E,
  emptyActions: O,
  leadingActions: L,
  hideLeadingOnEmpty: W = !1,
  footerActions: re,
  fieldActions: F,
  multiple: N,
  open: te,
  onOpenChange: Y,
  hideTrigger: j = !1,
  anchorRef: ee,
  portalTarget: H,
  renderTrigger: Z,
  renderItem: J,
  highlightOnOpen: V = !0,
  ref: K
}) {
  const le = l !== void 0, [ue, ke] = Xe(""), we = le ? l : ue, He = Le(($) => {
    le || ke($), c == null || c($);
  }, [le, c]), nt = te !== void 0, [bt, gt] = Xe(!1), ne = nt ? te : bt, Ne = Le(($) => {
    nt || gt($), Y == null || Y($);
  }, [nt, Y]), [Ae, Ke] = Xe(n === "inline"), $e = gn(() => e.map(($) => $.key).join("\0"), [e]), Oe = gn(() => new Set($e ? $e.split("\0") : []), [$e]), [et, ht] = Xe(() => y ? Oe : /* @__PURE__ */ new Set()), [Se, Ze] = Xe(0), Ct = G(!1), wt = G(null), Ve = Le(($, ve = "keyboard") => {
    Ct.current = ve === "pointer", Ze($);
  }, []), Et = G(null), pt = G(null), mt = G(null), zt = G(null), Bt = G(null), nn = G(0), vt = zs(), he = oo(), ge = cl(), Ce = Wf(), Re = pb(), Pe = Jy(), ie = 8 + (((F == null ? void 0 : F.length) || 0) + (we ? 1 : 0)) * (Pe.box + 2), [de, _e] = Xe({ top: 0, left: 0, maxH: 288, ready: !1 }), [Ue, Mt] = Xe(0);
  rb({
    anchorRef: ee ?? Et,
    panelRef: zt,
    open: ne,
    maxHeight: z,
    anchorRectRef: Bt,
    onPosition: ($) => _e({ top: $.top, left: $.left, maxH: $.maxH, ready: $.ready })
  }), Ye(() => {
    const $ = (ee == null ? void 0 : ee.current) ?? Et.current;
    !ne || !$ || Mt($.getBoundingClientRect().width);
  }, [ne, Ae, ee]);
  const [Gt, it] = Xe(!1);
  Ye(() => {
    ne && it(!0);
  }, [ne]);
  const Q = ll({
    visible: ne,
    morph: x,
    anchor: () => {
      var $;
      return (($ = (ee == null ? void 0 : ee.current) ?? Et.current) == null ? void 0 : $.getBoundingClientRect()) ?? null;
    },
    ref: zt,
    cloneOnUnmount: !0,
    onClosed: () => it(!1)
  }), xe = (O || []).map(
    ($) => typeof $.label == "function" ? $.label(we) : $.label
  ), Ie = gn(
    () => Y2({
      items: t,
      groups: e,
      /* show-all mode: the query only moves the highlight, every option stays
         in the list (the old I/E + D/N autocomplete contract). */
      query: S ? "" : we,
      browseGroups: p || y || g,
      browseAll: b,
      expandedGroups: et,
      emptyActionLabels: xe
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, e, we, S, p, y, g, b, et, xe.join("\0")]
  ), Je = gn(
    () => (L || []).map(($, ve) => ({
      kind: "action",
      label: typeof $.label == "function" ? $.label(we) : $.label,
      actionIndex: ve,
      source: "leading"
    })),
    [L, we]
  ), ft = gn(
    () => (re || []).map(($, ve) => ({
      kind: "action",
      label: typeof $.label == "function" ? $.label(we) : $.label,
      actionIndex: ve,
      source: "footer"
    })),
    [re, we]
  ), Dt = Ie.some(($) => $.kind === "empty"), ot = Je.length > 0 && !(W && Dt), Rt = ot ? Je.length : 0, It = gn(
    () => [...ot ? Je : [], ...Ie, ...ft],
    [ot, Je, Ie, ft]
  ), Tt = !!d || g && !we.trim(), rn = gn(
    () => It.map(($, ve) => ({ row: $, index: ve })).filter(($) => !($.row.kind === "empty" || $.row.kind === "item" && $.row.hidden || $.row.kind === "group" && !Tt)),
    [It, Tt]
  ), xr = (g || y) && !we.trim(), qt = !!N, yn = gn(
    () => t.filter(($) => $.checkable !== !1).map(($) => $.id),
    [t]
  ), On = gn(() => we.trim() ? Ov(t, e, we).hits.filter(($) => $.item.checkable !== !1).map(($) => $.item.id) : yn, [t, e, we, yn]), Gn = gn(() => new Set(On), [On]), Vt = lb({
    mode: (N == null ? void 0 : N.mode) ?? "draft",
    selectedIds: (N == null ? void 0 : N.selectedIds) ?? ub,
    itemIds: yn,
    visibleIds: On,
    max: N == null ? void 0 : N.max,
    disabledIds: N == null ? void 0 : N.disabledIds,
    indicator: N == null ? void 0 : N.indicator,
    onCommit: N == null ? void 0 : N.onCommit,
    onDraftChange: N == null ? void 0 : N.onDraftChange,
    onToggle: N == null ? void 0 : N.onToggle
  }), zn = G(Vt.reset);
  zn.current = Vt.reset;
  const ur = typeof (N == null ? void 0 : N.commitLabel) == "function" ? N.commitLabel(Vt.count) : (N == null ? void 0 : N.commitLabel) ?? `Select ${Vt.count}`, bn = Le(() => {
    var $;
    Ne(!1), n === "expandable" && (($ = pt.current) == null || $.blur(), Ke(!1), requestAnimationFrame(() => {
      var ve;
      return (ve = mt.current) == null ? void 0 : ve.focus();
    })), nt || He(""), Ve(0), ht(y ? Oe : /* @__PURE__ */ new Set()), f == null || f();
  }, [n, f, He, y, Oe, nt, Ne]);
  Ye(() => {
    if (we.trim() || !y) {
      ht(($) => $.size ? /* @__PURE__ */ new Set() : $);
      return;
    }
    ht(($) => $.size === Oe.size && [...Oe].every((ve) => $.has(ve)) ? $ : Oe);
  }, [we, y, Oe]);
  const dr = G(!1), Yn = G(!1);
  Ye(() => {
    if (!ne) {
      dr.current = !1;
      return;
    }
    if (dr.current || !g || we.trim()) return;
    const $ = C ? [C] : [...(N == null ? void 0 : N.selectedIds) ?? []], ve = new Set($), Fe = ve.size ? e.filter((rt) => t.some((Wt) => Wt.group === rt.key && ve.has(Wt.id))).map((rt) => rt.key) : [];
    if (Fe.length === 0) {
      dr.current = !0;
      return;
    }
    const Ge = m === "single" ? Fe.slice(0, 1) : Fe;
    if (!Ge.every((rt) => et.has(rt))) {
      Yn.current = !0, ht(new Set(Ge));
      return;
    }
    if (V && C) {
      const rt = It.findIndex((Wt) => Wt.kind === "item" && Wt.hit.item.id === C);
      rt >= 0 && Ve(rt);
    }
    dr.current = !0;
  }, [ne, g, we, e, t, C, N == null ? void 0 : N.selectedIds, m, et, It, V, Ve]);
  const dn = Le(($) => {
    ht((ve) => {
      const Fe = new Set(ve);
      return Fe.has($) ? Fe.delete($) : (m === "single" && Fe.clear(), Fe.add($)), Fe;
    });
  }, [m]), Sn = Le(() => {
    var ve;
    if (ne) {
      (ve = pt.current) == null || ve.focus();
      return;
    }
    if (zn.current(), n === "expandable" && !Ae) {
      const Fe = Et.current;
      if (Fe) {
        const Ge = Fe.style.transition, rt = Fe.style.width;
        Fe.style.transition = "none", Fe.style.width = `${T}px`;
        const Wt = Fe.getBoundingClientRect();
        Bt.current = { left: Wt.left, top: Wt.top, width: Wt.width, height: Wt.height }, Fe.style.width = rt, Fe.offsetWidth, Fe.style.transition = Ge, window.clearTimeout(nn.current), nn.current = window.setTimeout(() => {
          Bt.current = null;
        }, Pi + 80);
      }
    }
    Ke(!0), Ne(!0);
    const $ = C ? Ie.findIndex((Fe) => Fe.kind === "item" && Fe.hit.item.id === C) : -1;
    Ve($ >= 0 ? Rt + $ : V ? Rt : -1);
  }, [ne, n, Ae, T, Rt, Ie, C, V]);
  Ye(() => () => {
    window.clearTimeout(nn.current), Bt.current = null;
  }, []), Ye(() => {
    ne || (wt.current = null);
  }, [ne]), Ye(() => {
    if (n !== "expandable" || !Ae || !ne || !I) return;
    const $ = requestAnimationFrame(() => {
      var ve;
      return (ve = pt.current) == null ? void 0 : ve.focus();
    });
    return () => cancelAnimationFrame($);
  }, [n, Ae, ne, I]), Ye(() => {
    var Fe;
    if (!ne) return;
    const $ = ((Fe = Et.current) == null ? void 0 : Fe.ownerDocument) ?? vt;
    if (!$) return;
    const ve = (Ge) => {
      var Wt, qn, Wn, fr;
      const rt = ((Wt = Ge.composedPath) == null ? void 0 : Wt.call(Ge)[0]) ?? Ge.target;
      !rt || typeof rt.nodeType != "number" || (qn = Et.current) != null && qn.contains(rt) || (Wn = zt.current) != null && Wn.contains(rt) || (fr = ee == null ? void 0 : ee.current) != null && fr.contains(rt) || bn();
    };
    return $.addEventListener("pointerdown", ve, !0), () => $.removeEventListener("pointerdown", ve, !0);
  }, [ne, bn, vt, ee]);
  const rr = Le(($) => {
    var ve;
    if ($.kind === "item" ? wt.current = $.hit.item.id : ($.kind === "group" || $.kind === "action") && (wt.current = null), $.kind === "group") {
      if (qt) {
        const Fe = (ve = N == null ? void 0 : N.groupToken) == null ? void 0 : ve.call(N, $.group.key);
        if (Fe) {
          Vt.canToggle(Fe) && Vt.toggle(Fe);
          return;
        }
        const Ge = t.filter((rt) => rt.group === $.group.key && rt.checkable !== !1 && Gn.has(rt.id) && !Vt.isDisabled(rt.id)).map((rt) => rt.id);
        Ge.length && Vt.toggleGroup(Ge);
        return;
      }
      d ? (d($.group), h && bn()) : Tt && dn($.group.key);
      return;
    }
    if ($.kind === "item") {
      if (qt) {
        Vt.canToggle($.hit.item.id) && Vt.toggle($.hit.item.id);
        return;
      }
      u($.hit.item), h && bn();
      return;
    }
    if ($.kind === "action") {
      const Fe = $.source === "leading" ? L : $.source === "footer" ? re : O, Ge = Fe == null ? void 0 : Fe[$.actionIndex];
      Ge && Ge.onClick(we), h && bn();
    }
  }, [bn, h, O, re, Tt, t, L, N, qt, u, d, we, Vt, dn, Gn]), Pr = ($) => {
    if (rn.length === 0) return;
    let ve = Se;
    if (ve < 0 && wt.current) {
      const rt = rn.find(
        (Wt) => Wt.row.kind === "item" && Wt.row.hit.item.id === wt.current
      );
      rt && (ve = rt.index);
    }
    const Fe = rn.findIndex((rt) => rt.index === ve), Ge = Fe < 0 ? 0 : (Fe + $ + rn.length) % rn.length;
    Ve(rn[Ge].index);
  };
  jy(K, () => ({
    moveHighlight: Pr,
    activateHighlighted: () => {
      if (Ct.current) return !1;
      const $ = Se >= 0 ? It[Se] : void 0;
      return $ ? (rr($), Ve(-1, "keyboard"), !0) : !1;
    },
    close: bn,
    selectAll: () => {
      qt && Vt.setAll(!0);
    },
    setSelection: ($) => {
      Vt.reset($);
    }
  }), [It, Se, rr, bn, qt, Vt]);
  const pi = ($) => {
    if (qt && ($.metaKey || $.ctrlKey) && $.key.toLowerCase() === "a") {
      $.preventDefault(), $.stopPropagation(), Vt.setAll(!0);
      return;
    }
    if ($.key === "ArrowDown")
      $.preventDefault(), ne ? Pr(1) : Sn();
    else if ($.key === "ArrowUp")
      $.preventDefault(), Pr(-1);
    else if (($.key === "ArrowRight" || $.key === "ArrowLeft") && g && ne && !we.trim()) {
      const ve = It[Se];
      if ((ve == null ? void 0 : ve.kind) === "group") {
        const Fe = et.has(ve.group.key);
        ($.key === "ArrowRight" || Fe) && ($.preventDefault(), dn(ve.group.key));
      } else if ((ve == null ? void 0 : ve.kind) === "item" && $.key === "ArrowLeft" && ve.hit.item.group) {
        $.preventDefault();
        const Fe = ve.hit.item.group;
        et.has(Fe) && dn(Fe);
        const Ge = It.findIndex((rt) => rt.kind === "group" && rt.group.key === Fe);
        Ge >= 0 && Ve(Ge);
      }
    } else if ($.key === "Enter") {
      $.preventDefault();
      const ve = It[Se] ?? It[0];
      ve && rr(ve);
    } else $.key === "Escape" && ($.preventDefault(), bn());
  }, Ur = ($) => {
    n === "expandable" && !Ae || (He($), ne || Ne(!0));
  };
  Ye(() => {
    if (S) {
      const ve = we.trim().toLowerCase();
      if (!ve) {
        const Ge = C ? Ie.findIndex((rt) => rt.kind === "item" && rt.hit.item.id === C) : -1;
        Ve(Ge >= 0 ? Rt + Ge : -1);
        return;
      }
      const Fe = Ie.findIndex((Ge) => Ge.kind === "item" && Ge.hit.item.label.toLowerCase().includes(ve));
      Ve(Fe >= 0 ? Rt + Fe : -1);
      return;
    }
    if (nt) {
      const ve = we.trim().toLowerCase();
      if (!!ve && t.some((Ge) => Ge.id.toLowerCase() === ve || Ge.label.toLowerCase() === ve)) {
        Ve(-1);
        return;
      }
      if (!qt) {
        const Ge = Ie.findIndex((rt) => rt.kind === "item" && rt.hit.item.tone !== "create");
        if (Ge >= 0) {
          Ve(Rt + Ge);
          return;
        }
      }
    }
    const $ = Ie.findIndex((ve) => ve.kind === "item");
    Ve($ >= 0 ? Rt + $ : Rt);
  }, [we]), Ye(() => {
    if (!ne || we.trim()) return;
    const $ = C ? Ie.findIndex((ve) => ve.kind === "item" && ve.hit.item.id === C) : -1;
    Ve($ >= 0 ? Rt + $ : V ? Rt : -1);
  }, [ne]), Nn(() => {
    ne && zn.current();
  }, [ne]);
  const Qn = ($) => /* @__PURE__ */ pe("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
    F == null ? void 0 : F.map((ve) => /* @__PURE__ */ A(
      "button",
      {
        type: "button",
        "aria-label": ve.label,
        title: ve.label,
        tabIndex: Ae ? 0 : -1,
        onMouseDown: (Fe) => Fe.preventDefault(),
        onClick: () => {
          ve.onClick(we, { close: bn }), ve.keepOpen || bn();
        },
        style: { width: Pe.box, height: Pe.box },
        className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
        "data-search-field-action": ve.key,
        children: /* @__PURE__ */ A(
          "span",
          {
            style: { width: Pe.icon, height: Pe.icon },
            className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
            children: ve.icon
          }
        )
      },
      ve.key
    )),
    we && /* @__PURE__ */ A(
      "button",
      {
        type: "button",
        "aria-label": "Clear search",
        tabIndex: Ae ? 0 : -1,
        onPointerDown: (ve) => ve.preventDefault(),
        onClick: $,
        style: { width: Pe.box, height: Pe.box },
        className: "ui-icon-btn flex items-center justify-center rounded",
        children: /* @__PURE__ */ A(eo, { size: Pe.icon })
      }
    )
  ] }), kr = /* @__PURE__ */ pe("div", { className: "relative w-full", children: [
    /* @__PURE__ */ A(Io, { size: Pe.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ A(
      "input",
      {
        ref: pt,
        value: we,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": ne,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: ($) => Ur($.target.value),
        onFocus: () => {
          p && Sn();
        },
        onClick: () => {
          p && Sn();
        },
        onKeyDown: pi,
        placeholder: a,
        style: { paddingRight: ie },
        className: `${Ha("sm")} w-full pl-8`
      }
    ),
    Qn(() => {
      He(""), ne || Sn();
    })
  ] }), gi = /* @__PURE__ */ pe("div", { className: "absolute inset-0", children: [
    /* @__PURE__ */ A(Io, { size: Pe.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ A(
      "input",
      {
        ref: pt,
        value: we,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": ne,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: ($) => Ur($.target.value),
        onFocus: () => {
          p && Ae && Sn();
        },
        onClick: () => {
          p && Ae && Sn();
        },
        onKeyDown: pi,
        placeholder: a,
        tabIndex: Ae ? 0 : -1,
        style: { paddingRight: ie },
        className: `${Ha("sm")} h-full w-full pl-8`
      }
    ),
    Qn(() => {
      He(""), !ne && Ae && Sn();
    })
  ] });
  Ye(() => {
    if (!ne || Ct.current) return;
    const $ = zt.current;
    fi(
      $ == null ? void 0 : $.querySelector(`[data-search-row="${Se}"]`),
      "nearest",
      ($ == null ? void 0 : $.querySelector("[data-search-scroller]")) ?? null
    );
  }, [ne, Se]);
  const Gr = G(Ie);
  Gr.current = Ie;
  const ir = G(C);
  ir.current = C;
  const Ee = G(N == null ? void 0 : N.selectedIds);
  Ee.current = N == null ? void 0 : N.selectedIds, Nn(() => {
    if (!ne || !Yn.current) return;
    const $ = zt.current;
    if (!$) return;
    const ve = C;
    if (!ve) {
      Yn.current = !1;
      return;
    }
    const Fe = Ie.findIndex((rt) => rt.kind === "item" && rt.hit.item.id === ve);
    if (Fe < 0) {
      Yn.current = !1;
      return;
    }
    const Ge = $.querySelector(`[data-search-row="${Fe}"]`);
    Ge && (fi(Ge, "center", $.querySelector("[data-search-scroller]") ?? null), Yn.current = !1);
  }, [ne, et, Ie, C]);
  const tt = ab({
    open: ne,
    block: "center",
    ready: de.ready,
    scroller: () => {
      var $;
      return (($ = zt.current) == null ? void 0 : $.querySelector("[data-search-scroller]")) ?? null;
    },
    row: () => {
      var Fe;
      let $ = -1;
      const ve = ir.current;
      if (ve)
        $ = Gr.current.findIndex((Ge) => Ge.kind === "item" && Ge.hit.item.id === ve);
      else {
        const Ge = Ee.current;
        if (Ge && Ge.length) {
          const rt = new Set(Ge);
          $ = Gr.current.findIndex((Wt) => Wt.kind === "item" && rt.has(Wt.hit.item.id));
        }
      }
      return $ < 0 ? null : ((Fe = zt.current) == null ? void 0 : Fe.querySelector(`[data-search-row="${$}"]`)) ?? null;
    }
  }), Nt = ($, ve) => {
    const Fe = Se === ve, Ge = !qt && C !== void 0 && $.hit.item.id === C, rt = qt ? Vt.isSelected($.hit.item.id) : Ge, Wt = !!$.hit.item.disabled || qt && !Vt.canToggle($.hit.item.id), qn = $.hit.item.tone === "create" ? k === "light" ? { background: Fe ? "#d1fae5" : "#ecfdf5", color: Fe ? "#065f46" : "#047857" } : { background: Fe ? "rgba(6, 95, 70, 0.7)" : "rgba(6, 78, 59, 0.4)", color: Fe ? "#d1fae5" : "#6ee7b7" } : void 0;
    return /* @__PURE__ */ pe(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": rt,
        tabIndex: -1,
        "data-search-item": $.hit.item.id,
        "data-search-row": ve,
        "data-search-create": $.hit.item.tone === "create" ? "" : void 0,
        onMouseDown: (Wn) => Wn.preventDefault(),
        onMouseEnter: () => Ve(ve, "pointer"),
        onClick: () => rr($),
        style: { ...Ce, ...$.hit.item.rowStyle, ...qn },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${ge.itemDefault} ${$.hit.item.rowClassName ?? ""} ${Ge ? "ui-item-selected" : ""} ${Fe ? "ui-item-highlighted" : ""} ${Wt ? "opacity-30 pointer-events-none" : ""}`,
        children: [
          qt && $.hit.item.checkable !== !1 && /* @__PURE__ */ A(Fa, { checked: rt, disabled: Wt, indicator: N == null ? void 0 : N.indicator }),
          J ? /* @__PURE__ */ A("span", { className: "flex min-w-0 flex-1 items-center gap-2", children: J($.hit.item, { checked: rt, disabled: Wt }) }) : /* @__PURE__ */ pe(Dn, { children: [
            $.hit.item.icon && /* @__PURE__ */ A("span", { className: `${ge.icon} shrink-0`, children: $.hit.item.icon }),
            /* @__PURE__ */ A("span", { className: "flex-1 truncate", children: $.hit.item.label }),
            ($.hit.detail || $.hit.item.detail) && /* @__PURE__ */ A("span", { className: "shrink-0 max-w-[55%] truncate text-[10px] text-zinc-400", children: $.hit.detail || $.hit.item.detail }),
            Ge && /* @__PURE__ */ A(Os, { className: "ui-icon w-3.5 h-3.5 shrink-0", "aria-hidden": !0 })
          ] })
        ]
      },
      `item:${$.hit.item.id}`
    );
  }, vn = ($, ve) => {
    var fo;
    const Fe = et.has($.group.key), Ge = g && !we.trim(), rt = Tt, Wt = rt && Se === ve, qn = qt ? t.filter((tn) => tn.group === $.group.key && Gn.has(tn.id) && tn.checkable !== !1) : [], Wn = qn.filter((tn) => !Vt.isDisabled(tn.id)).map((tn) => tn.id), fr = qt ? (fo = N == null ? void 0 : N.groupToken) == null ? void 0 : fo.call(N, $.group.key) : void 0, mi = !!fr && Vt.isSelected(fr), xt = mi ? "all" : Wn.length > 0 ? Vt.groupState(Wn) : "none", Li = mi ? qn.length : qn.reduce((tn, Fi) => tn + (Vt.isSelected(Fi.id) ? 1 : 0), 0), $i = qt && /* @__PURE__ */ A(
      "button",
      {
        type: "button",
        tabIndex: -1,
        "aria-label": `Select all ${$.group.label}`,
        onMouseDown: (tn) => tn.preventDefault(),
        onClick: (tn) => {
          tn.stopPropagation(), fr ? Vt.toggle(fr) : Wn.length && Vt.toggleGroup(Wn);
        },
        className: `shrink-0 flex items-center justify-center rounded ${fr || Wn.length ? "cursor-pointer" : "cursor-not-allowed"}`,
        children: /* @__PURE__ */ A(
          Fa,
          {
            checked: xt === "all",
            indeterminate: xt === "some",
            disabled: !fr && Wn.length === 0,
            indicator: N == null ? void 0 : N.indicator
          }
        )
      }
    ), or = qt ? /* @__PURE__ */ pe("span", { className: `shrink-0 tabular-nums text-[10px] ${rt ? "text-[color:var(--ui-text-faint)]" : "opacity-70"}`, children: [
      Li,
      "/",
      qn.length
    ] }) : $.group.count !== void 0 && /* @__PURE__ */ A("span", { className: `shrink-0 tabular-nums ${rt ? "text-[10px] text-[color:var(--ui-text-faint)]" : "opacity-70"}`, children: $.group.count });
    return rt ? /* @__PURE__ */ pe(
      "div",
      {
        role: "option",
        "aria-selected": !1,
        "aria-expanded": Ge ? Fe : void 0,
        "data-search-group": $.group.key,
        onMouseDown: (tn) => tn.preventDefault(),
        onMouseEnter: () => Ve(ve, "pointer"),
        onClick: () => {
          Ge && dn($.group.key);
        },
        style: Ce,
        className: `w-full rounded flex items-center gap-1 outline-none select-none font-medium ${ge.itemDefault} ${Wt ? "ui-item-highlighted" : ""}`,
        children: [
          $i,
          /* @__PURE__ */ pe(
            "button",
            {
              type: "button",
              tabIndex: -1,
              onMouseDown: (tn) => tn.preventDefault(),
              onClick: (tn) => {
                tn.stopPropagation(), rr($);
              },
              className: "flex w-auto min-w-0 max-w-full cursor-pointer items-center gap-2 text-left",
              children: [
                $.group.icon && /* @__PURE__ */ A("span", { className: `${ge.icon} shrink-0`, children: $.group.icon }),
                /* @__PURE__ */ A("span", { className: "truncate", children: $.group.label })
              ]
            }
          ),
          /* @__PURE__ */ A("span", { className: "min-w-0 flex-1" }),
          or,
          Ge && /* @__PURE__ */ A(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `${Fe ? "Collapse" : "Expand"} ${$.group.label}`,
              "aria-expanded": Fe,
              onMouseDown: (tn) => tn.preventDefault(),
              onClick: (tn) => {
                tn.stopPropagation(), dn($.group.key);
              },
              style: { width: Pe.box, height: Pe.box },
              className: "shrink-0 flex cursor-pointer items-center justify-center rounded text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text)]",
              children: /* @__PURE__ */ A(
                Ai,
                {
                  size: Pe.icon,
                  className: `transition-transform duration-200 ${Fe ? "rotate-180" : ""}`
                }
              )
            }
          )
        ]
      },
      `group:${$.group.key}`
    ) : /* @__PURE__ */ pe(
      "div",
      {
        role: "presentation",
        "data-search-group": $.group.key,
        "data-search-row": ve,
        style: Re,
        className: "w-full flex items-center gap-2 select-none font-semibold uppercase tracking-wider ui-label",
        children: [
          $i,
          $.group.icon && /* @__PURE__ */ A("span", { className: `${ge.icon} shrink-0`, children: $.group.icon }),
          /* @__PURE__ */ A("span", { className: "flex-1 truncate", children: $.group.label }),
          or
        ]
      },
      `group:${$.group.key}`
    );
  }, Zt = ($, ve) => {
    var rt;
    const Fe = Se === ve, Ge = $.source === "leading" ? L : $.source === "footer" ? re : O;
    return /* @__PURE__ */ pe(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": !1,
        tabIndex: -1,
        "data-search-action": $.source || "empty",
        "data-search-row": ve,
        onMouseDown: (Wt) => Wt.preventDefault(),
        onMouseEnter: () => Ve(ve, "pointer"),
        onClick: () => rr($),
        style: Ce,
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${ge.itemDefault} ${Fe ? "ui-item-highlighted" : ""}`,
        children: [
          /* @__PURE__ */ A("span", { className: `${ge.icon} shrink-0`, children: ((rt = Ge == null ? void 0 : Ge[$.actionIndex]) == null ? void 0 : rt.icon) || /* @__PURE__ */ A(ol, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ A("span", { className: "flex-1 truncate", children: $.label })
        ]
      },
      `${$.source || "empty"}:${$.actionIndex}`
    );
  }, Qt = () => /* @__PURE__ */ A("div", { className: "px-3 py-3 text-center", "data-search-empty": !0, children: E ? E({ query: we, close: bn }) : /* @__PURE__ */ pe(Dn, { children: [
    /* @__PURE__ */ A("div", { className: "mx-auto mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-400", children: /* @__PURE__ */ A(Io, { className: "w-3.5 h-3.5" }) }),
    /* @__PURE__ */ A("div", { className: "text-xs font-medium text-zinc-500", children: M || `No matches for “${we.trim()}”` }),
    /* @__PURE__ */ A("div", { className: "mt-0.5 text-[10px] text-zinc-400", children: _ || "Try a name, phone number, board ID or category." })
  ] }) }, "__empty"), In = [];
  for (let $ = 0; $ < Ie.length; $++) {
    const ve = Ie[$];
    if (ve.kind === "group") {
      const Fe = [];
      let Ge = $ + 1;
      for (; Ge < Ie.length && Ie[Ge].kind === "item" && Ie[Ge].hit.item.group === ve.group.key; )
        Fe.push({ row: Ie[Ge], index: Ge }), Ge++;
      In.push({ group: ve, index: $, items: Fe }), $ = Ge - 1;
    } else ve.kind === "item" ? In.push({ row: ve, index: $ }) : In.push({ row: ve, index: $ });
  }
  const Yr = ne || Gt ? sl(
    /* @__PURE__ */ pe(
      "div",
      {
        ref: Q,
        id: "search-menu-panel",
        "data-theme": k,
        role: "listbox",
        "aria-label": a,
        "aria-multiselectable": qt ? !0 : void 0,
        onPointerEnter: tt.engage,
        onPointerDown: ($) => {
          $.stopPropagation(), tt.engage();
        },
        onMouseDown: ($) => $.stopPropagation(),
        onClick: ($) => $.stopPropagation(),
        onPointerLeave: () => {
          Ct.current && Ve(-1, "pointer");
        },
        className: "click-outside-ignore ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none min-w-0 overflow-hidden pointer-events-auto",
        style: {
          position: "fixed",
          left: de.left,
          top: de.top,
          width: D ?? (n === "expandable" ? T : Ue || void 0),
          minWidth: P,
          maxHeight: de.maxH,
          visibility: de.ready ? "visible" : "hidden"
        },
        children: [
          ot && /* @__PURE__ */ pe("div", { className: "shrink-0 pb-1", children: [
            Je.map(($, ve) => Zt($, ve)),
            Ie.length > 0 && /* @__PURE__ */ A("div", { className: ge.separator })
          ] }),
          /* @__PURE__ */ pe("div", { "data-search-scroller": !0, className: "overflow-y-auto scrollbar-custom flex flex-col min-h-0", children: [
            Ie.length === 0 && /* @__PURE__ */ A("div", { className: "px-3 py-3 text-xs text-zinc-400", "data-search-empty": !0, children: E ? E({ query: we, close: bn }) : /* @__PURE__ */ A(Dn, { children: "Type to search…" }) }),
            In.map(($) => {
              if ($.group) {
                const Ge = et.has($.group.group.key), rt = $.items || [];
                return /* @__PURE__ */ pe(Pt.Fragment, { children: [
                  vn($.group, Rt + $.index),
                  xr && /* @__PURE__ */ A(
                    "div",
                    {
                      "data-search-group-items": $.group.group.key,
                      "aria-hidden": !Ge,
                      className: "motion-reduce:transition-none",
                      style: {
                        display: "grid",
                        gridTemplateRows: Ge ? "1fr" : "0fr",
                        opacity: Ge ? 1 : 0,
                        transition: "grid-template-rows 220ms cubic-bezier(0.32, 0.72, 0, 1), opacity 150ms ease"
                      },
                      children: /* @__PURE__ */ A("div", { className: "overflow-hidden flex flex-col", children: rt.map((Wt) => Nt(Wt.row, Rt + Wt.index)) })
                    }
                  ),
                  !xr && rt.map((Wt) => Nt(Wt.row, Rt + Wt.index))
                ] }, `group:${$.group.group.key}`);
              }
              const ve = $.row, Fe = Rt + $.index;
              return ve.kind === "empty" ? Qt() : ve.kind === "action" ? Zt(ve, Fe) : ve.kind === "item" ? Nt(ve, Fe) : null;
            })
          ] }),
          ft.length > 0 && /* @__PURE__ */ pe("div", { className: "shrink-0", children: [
            /* @__PURE__ */ A("div", { className: ge.separator }),
            ft.map(($, ve) => Zt($, Rt + Ie.length + ve))
          ] }),
          qt && (N == null ? void 0 : N.footer) !== !1 && /* @__PURE__ */ A(
            fb,
            {
              count: Vt.count,
              max: N == null ? void 0 : N.max,
              hiddenCount: (N == null ? void 0 : N.hiddenNote) === !1 ? 0 : Vt.hiddenCount,
              clear: (N == null ? void 0 : N.clear) !== !1,
              theme: k,
              onClear: Vt.clear,
              hero: (N == null ? void 0 : N.mode) === "live" ? void 0 : {
                label: ur,
                onClick: () => {
                  Vt.commit(), bn();
                },
                disabled: Vt.count === 0
              }
            }
          )
        ]
      }
    ),
    H ?? he ?? (vt == null ? void 0 : vt.body) ?? document.body
  ) : null;
  return j ? /* @__PURE__ */ pe(Dn, { children: [
    /* @__PURE__ */ A("div", { ref: Et, "data-search-menu": !0, "data-mode": "hidden", className: "hidden", "aria-hidden": !0 }),
    Yr
  ] }) : n === "inline" ? /* @__PURE__ */ pe("div", { ref: Et, "data-search-menu": !0, "data-mode": n, className: "relative inline-flex", style: { width: "100%" }, children: [
    kr,
    Yr
  ] }) : /* @__PURE__ */ A(
    oh,
    {
      expanded: Ae,
      collapsedWidth: v,
      expandedWidth: T,
      rootRef: Et,
      "data-search-menu": !0,
      "data-mode": n,
      trigger: Z ? Z({ open: ne, expanded: Ae, toggle: Sn }) : /* @__PURE__ */ A(
        lr,
        {
          ref: mt,
          type: "button",
          variant: o,
          size: "minimal",
          theme: k === "dark" ? "dark" : "light",
          icon: i === void 0 ? /* @__PURE__ */ A(Io, { className: "w-3.5 h-3.5" }) : i,
          onClick: Sn,
          className: `w-full justify-start ${Ae ? "pointer-events-none" : ""} ${s ?? ""}`,
          tabIndex: Ae ? -1 : 0,
          "data-search-trigger": !0,
          children: /* @__PURE__ */ A("span", { className: "min-w-0 truncate", children: r })
        }
      ),
      field: /* @__PURE__ */ pe(Dn, { children: [
        gi,
        Yr
      ] })
    }
  );
}
function Zi(t, e = "id") {
  return e === "label" ? t.label : t.id;
}
function zv(t, e, n = "id") {
  const r = e.find((i) => Zi(i, n) === t);
  return (r == null ? void 0 : r.label) || t;
}
function V2(t) {
  return t.split(",").map((e) => e.trim()).filter(Boolean);
}
function J2(t) {
  const e = t.split(",");
  return (e[e.length - 1] || "").trim();
}
function sh(t, e, n = "id") {
  const r = t.trim();
  if (!r) return "";
  const i = e.find((a) => Zi(a, n) === r);
  if (i) return Zi(i, n);
  const o = r.toLowerCase(), s = e.find((a) => a.label.toLowerCase() === o);
  return s ? Zi(s, n) : r;
}
function Z2(t, e, n = "id") {
  const r = /* @__PURE__ */ new Set(), i = [];
  for (const o of V2(t)) {
    const s = sh(o, e, n);
    !s || r.has(s) || (r.add(s), i.push(s));
  }
  return i;
}
function Q2(t, e, n = "id") {
  const r = t.split(",").map((a) => a.trim()).filter(Boolean), i = t.trimEnd().endsWith(",") ? r : r.slice(0, -1), o = /* @__PURE__ */ new Set(), s = [];
  for (const a of i) {
    const l = sh(a, e, n);
    !l || o.has(l) || (o.add(l), s.push(l));
  }
  return s;
}
function eR(t, e, n = "id") {
  const r = t.trim();
  if (!r) return !0;
  const i = r.toLowerCase();
  return e.some((o) => Zi(o, n).toLowerCase() === i || o.label.toLowerCase() === i);
}
function tR(t, e, n = "id") {
  const r = new Set(e.map((i) => Zi(i, n)));
  return t.filter((i) => !r.has(i));
}
function Fp(t, e, n, r, i) {
  return i ? i([...t], [...e]) : r === "count" ? t.length ? `${t.length} selected` : "" : r === "chips" ? "" : t.map((o) => zv(o, e, n)).join(", ");
}
const nR = () => {
};
function rR({
  values: t,
  onChange: e,
  items: n,
  groups: r = [],
  resolveBy: i = "id",
  mode: o = "multiple",
  appearance: s = "inline",
  display: a = "names",
  formatDisplay: l,
  formatEditing: c,
  renderTrigger: u,
  renderItem: d,
  badge: f,
  trailing: h,
  anchoredKeys: p,
  anchoredLabel: g = "Element link anchor",
  placeholder: y = "Select…",
  readOnly: m = !1,
  inputReadOnly: b = !1,
  disabled: C = !1,
  autoFocus: I = !1,
  defaultOpen: v = !1,
  selectAllOnOpen: T = !0,
  uppercase: D = !1,
  allowFreeText: P = !0,
  theme: S,
  className: z = "",
  style: k,
  panelWidth: x,
  panelMinWidth: M,
  initialQuery: _,
  keepAllRows: E = !1,
  maxMenuHeight: O,
  portalTarget: L,
  autoGrow: W = !1,
  skipComma: re = !1,
  collapsedWidth: F = 140,
  expandedWidth: N = 280,
  createLabel: te,
  onCreateItem: Y,
  onExit: j,
  onEscape: ee,
  onTabExit: H,
  loadItems: Z,
  emptyTitle: J,
  emptyHint: V,
  sortItems: K,
  max: le,
  disabledIds: ue,
  indicator: ke,
  browse: we,
  groupToken: He
}) {
  const nt = vr(), bt = S ?? (nt == null ? void 0 : nt.mode) ?? "light", gt = mn(), ne = Le((Ee) => Zi(Ee, i), [i]), Ne = gn(() => n.map(ne), [n, ne]), Ae = gn(() => new Map(n.map((Ee) => [ne(Ee), Ee])), [n, ne]), Ke = Le((Ee) => zv(Ee, n, i), [n, i]), $e = gn(() => new Set([...p ?? []].map((Ee) => Ee.toLowerCase())), [p]), [Oe, et] = Xe(!1), [ht, Se] = Xe(""), [Ze, Ct] = Xe(() => {
    const Ee = _ ?? "";
    return D ? Ee.toUpperCase() : Ee;
  }), [wt, Ve] = Xe(Ze), [Et, pt] = Xe(() => [...t]), [mt, zt] = Xe(null), [Bt, nn] = Xe(!1), vt = G(null), he = G(null), ge = G(null), Ce = G(null), Re = G(null), Pe = G(t.join("\0")), lt = G(!1), ie = G(/* @__PURE__ */ new Set()), de = G(!1), _e = G(!1), Ue = G(!1), Mt = G(0), Gt = G(""), it = G([...t]), Q = t.join("\0"), xe = gn(
    () => Fp(t, n, i, a, l),
    [t, n, i, a, l]
  ), Ie = Le((Ee) => {
    if (c) return c([...Ee], n);
    if (o === "single") return Ee[0] ? Ke(Ee[0]) : "";
    const tt = Ee.map(Ke).join(", ");
    return re ? tt : Ee.length ? `${tt}, ` : "";
  }, [c, n, o, Ke, re]);
  Ye(() => {
    Oe || (pt([...t]), it.current = [...t], Pe.current = Q);
  }, [Q, Oe]);
  const Je = Le(() => {
    if (Oe || m || C) return;
    lt.current = !1, de.current = !0;
    const Ee = Ie(t);
    Gt.current = Ee, it.current = [...t], pt([...t]), Se(Ee), Ve(Ze), Ct(""), et(!0);
  }, [Oe, m, C, t, Ie, Ze]);
  Nn(() => {
    if (!Oe) return;
    const Ee = vt.current ?? he.current;
    Ee && (Ee.focus(), (Ee instanceof HTMLInputElement || Ee instanceof HTMLTextAreaElement) && (o === "single" && T ? Ee.setSelectionRange(0, Ee.value.length) : Ee.setSelectionRange(Ee.value.length, Ee.value.length)));
  }, [Oe]), Nn(() => {
    if (!Ue.current) return;
    Ue.current = !1;
    const Ee = vt.current;
    Ee && (Ee.focus(), Ee.setSelectionRange(Ee.value.length, Ee.value.length));
  }, [ht]), Ye(() => {
    (v || I) && Je();
  }, []);
  const ft = o === "single" ? wt : J2(ht), Dt = Z ? mt ?? [] : n, ot = gn(
    () => K ? K(Dt, Et) : Dt,
    [Dt, K, Et]
  ), Rt = ft.trim(), It = !!Y && P && !Bt && !!Rt && !eR(Rt, Dt, i);
  Ye(() => {
    if (!Z || !Oe) return;
    const Ee = ft.trim();
    if (!Ee) {
      zt(null), nn(!1);
      return;
    }
    nn(!0);
    const tt = ++Mt.current, Nt = setTimeout(() => {
      Z(Ee).then((vn) => {
        Mt.current === tt && (zt(vn), nn(!1));
      }).catch(() => {
        Mt.current === tt && (zt([]), nn(!1));
      });
    }, 400);
    return () => clearTimeout(Nt);
  }, [Z, Oe, ft]);
  const Tt = gn(() => {
    const Ee = ot.filter((tt) => !tt.hidden).map((tt) => ({
      id: ne(tt),
      label: tt.label,
      group: tt.group,
      detail: tt.detail,
      icon: tt.icon,
      disabled: !!tt.disabled || !!(ue != null && ue.includes(ne(tt))),
      fields: tt.fields,
      keywords: tt.keywords,
      rowClassName: tt.rowClassName,
      rowStyle: tt.rowStyle
    }));
    return It && Ee.unshift({
      id: Rt,
      label: te ? te(Rt) : `Add “${Rt}”…`,
      keywords: Rt,
      checkable: !1,
      tone: "create",
      pinned: !0
    }), Ee;
  }, [ot, ne, ue, It, Rt, te]), rn = Le((Ee) => {
    const tt = Ee.join("\0");
    if (tt !== Pe.current) {
      if (Gi(Ee, t)) {
        Pe.current = tt;
        return;
      }
      if (Pe.current = tt, e(Ee), Y)
        for (const Nt of tR(Ee, n, i))
          ie.current.has(Nt) || (ie.current.add(Nt), Y(Nt));
    }
  }, [t, e, Y, n, i]), xr = Le((Ee, tt) => {
    !tt || !Y || !P || n.some((Nt) => ne(Nt) === Ee) || ie.current.has(Ee) || (ie.current.add(Ee), Y(Ee));
  }, [Y, P, n, ne]), qt = Le((Ee = !0) => {
    if (!de.current || (de.current = !1, m || C)) return;
    if (lt.current) {
      lt.current = !1;
      return;
    }
    const tt = Gt.current, Nt = new Set(Ne), vn = o === "single" ? (() => {
      const Zt = tt.trim();
      if (!Zt) return P ? [] : t;
      const Qt = sh(Zt, n, i);
      return !P && !Nt.has(Qt) ? t : [Qt];
    })() : Mr(
      Z2(tt, n, i).filter((Zt) => P || Nt.has(Zt)),
      Ne
    );
    it.current = vn, pt(vn), Ve(""), et(!1), rn(vn), Ee && !_e.current && (j == null || j());
  }, [m, C, o, n, i, Ne, P, t, rn, j]), yn = Le((Ee) => {
    et(Ee), Ee || qt();
  }, [qt]), On = Le(() => {
    lt.current = !0, de.current = !1;
    const Ee = Ie(t);
    Gt.current = Ee, it.current = [...t], pt([...t]), Se(Ee), Ve(""), et(!1), ee == null || ee();
  }, [t, Ie, ee]);
  Ye(() => {
    var vn;
    if (!Oe) return;
    const tt = (((vn = ge.current) == null ? void 0 : vn.ownerDocument) ?? document).defaultView;
    if (!tt) return;
    const Nt = (Zt) => {
      Zt.key === "Escape" && (Zt.preventDefault(), Zt.stopImmediatePropagation(), On());
    };
    return tt.addEventListener("keydown", Nt, !0), () => tt.removeEventListener("keydown", Nt, !0);
  }, [Oe, On]);
  const Gn = Le((Ee) => {
    const tt = Mr(Ee, Ne), Nt = Ie(tt);
    it.current = tt, Gt.current = Nt, pt(tt), Ue.current = !0, Se(Nt);
  }, [Ne, Ie]), Vt = Le((Ee) => {
    const tt = Ee.id;
    de.current = !1;
    const Nt = Ke(tt);
    it.current = [tt], Gt.current = Nt, pt([tt]), Se(Nt), Ve(""), et(!1), rn([tt]), _e.current || j == null || j();
  }, [Ke, rn, j]), zn = (Ee) => {
    var tt, Nt, vn, Zt, Qt;
    if (Ee.key === "Escape") {
      Ee.preventDefault(), On();
      return;
    }
    if (Ee.key === "Tab") {
      if (Ee.preventDefault(), o === "single" && Oe) {
        _e.current = !0;
        const In = (tt = Re.current) == null ? void 0 : tt.activateHighlighted();
        if (_e.current = !1, In) {
          (Nt = H ?? j) == null || Nt(vt.current ?? void 0);
          return;
        }
      }
      Oe && qt(!1), (vn = H ?? j) == null || vn(vt.current ?? void 0);
      return;
    }
    if (Ee.key === "ArrowDown" || Ee.key === "ArrowUp") {
      if (Ee.preventDefault(), !Oe) {
        Je();
        return;
      }
      (Zt = Re.current) == null || Zt.moveHighlight(Ee.key === "ArrowDown" ? 1 : -1);
      return;
    }
    if (Ee.key === "Enter") {
      if (Ee.preventDefault(), Ee.stopPropagation(), Oe && ((Qt = Re.current) != null && Qt.activateHighlighted())) return;
      qt();
      return;
    }
  }, ur = (Ee) => {
    var Nt;
    const tt = D ? Ee.target.value.toUpperCase() : Ee.target.value;
    if (Gt.current = tt, Se(tt), o === "single" && Ve(tt), Oe || (de.current = !0, lt.current = !1, et(!0)), o === "multiple") {
      const vn = Mr(Q2(tt, n, i), Ne);
      it.current = vn, pt(vn), (Nt = Re.current) == null || Nt.setSelection(vn);
    }
  }, bn = () => {
    if (de.current) {
      if (lt.current) {
        lt.current = !1;
        return;
      }
      qt();
    }
  }, dr = Le((Ee, tt) => {
    const Nt = Ae.get(Ee.id);
    if (!Nt)
      return /* @__PURE__ */ pe(Dn, { children: [
        /* @__PURE__ */ A(ol, { className: "h-3.5 w-3.5 shrink-0" }),
        /* @__PURE__ */ A("span", { className: "flex-1 truncate", children: Ee.label })
      ] });
    const vn = !!p && (i === "label" ? $e.has(Nt.label.toLowerCase()) : p.has(ne(Nt))), Zt = (f == null ? void 0 : f(Nt)) ?? Nt.badge ?? null;
    return /* @__PURE__ */ pe(Dn, { children: [
      d ? d(Nt, tt.checked) : /* @__PURE__ */ pe(Dn, { children: [
        Nt.icon && /* @__PURE__ */ A("span", { className: "shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5", children: Nt.icon }),
        /* @__PURE__ */ A("span", { className: "flex-1 truncate", children: Nt.label }),
        Zt && /* @__PURE__ */ A("span", { className: "shrink-0 text-[10px] text-[color:var(--ui-text-faint)]", children: Zt }),
        h == null ? void 0 : h(Nt)
      ] }),
      vn && /* @__PURE__ */ A("span", { className: "shrink-0 inline-flex", title: g, "aria-label": g, children: /* @__PURE__ */ A(Jw, { className: "h-3.5 w-3.5 text-amber-500" }) })
    ] });
  }, [Ae, p, $e, i, ne, f, d, h, g]), Yn = /* @__PURE__ */ A(
    X2,
    {
      ref: Re,
      mode: "inline",
      hideTrigger: !0,
      open: Oe,
      onOpenChange: yn,
      anchorRef: s === "morph" ? Ce : ge,
      items: Tt,
      groups: r,
      query: ft,
      onSelect: Vt,
      closeOnSelect: o === "single",
      selectedId: o === "single" ? Et[0] : void 0,
      multiple: o === "multiple" ? {
        selectedIds: Et,
        mode: "live",
        onDraftChange: Gn,
        onToggle: xr,
        onCommit: nR,
        max: le,
        disabledIds: ue,
        indicator: ke,
        groupToken: He
      } : void 0,
      openOnFocus: !1,
      autoFocus: !1,
      highlightOnOpen: o === "single",
      browseAll: r.length === 0,
      browseExpanded: r.length > 0 && (we ?? "open") === "open",
      expandableGroups: r.length > 0 && we === "accordion",
      groupExpandMode: "single",
      renderItem: dr,
      emptyTitle: Bt ? "Searching…" : J,
      emptyHint: Bt ? "Fetching matching records." : V,
      theme: bt,
      panelWidth: x,
      panelMinWidth: M,
      keepAllRows: E,
      maxMenuHeight: O,
      portalTarget: L
    }
  ), dn = s === "chip", Sn = s === "wrap", rr = !dn && !Sn && W, Pr = !Oe && !xe, pi = Oe ? ht : xe, Ur = {
    ref: vt,
    /* Chip: the INPUT holds the committed keys (cast reads "1") while the
       overlay renders the resolved face ("1. GEORGE") — the old
       EntityDropdown's transparent-input contract. */
    value: Oe ? ht : dn ? t.join(", ") : xe,
    disabled: C,
    readOnly: b,
    placeholder: "",
    onFocus: Je,
    onClick: Je,
    onChange: ur,
    onBlur: bn,
    onKeyDown: zn,
    autoComplete: "off",
    spellCheck: !1
  }, Qn = Me(5, 7, gt), kr = Me(9, 12, gt), gi = Me(12, 14, gt);
  if (s === "button") {
    const Ee = (Zt) => zn(Zt), tt = Oe ? Et : t, Nt = Fp(tt, n, i, a, l), vn = !Nt;
    return /* @__PURE__ */ pe(
      "div",
      {
        ref: ge,
        "data-picker-field": !0,
        className: `relative ${z}`,
        style: k,
        onMouseDown: (Zt) => Zt.stopPropagation(),
        onContextMenu: (Zt) => {
          Zt.preventDefault(), Zt.stopPropagation();
        },
        children: [
          u ? /* @__PURE__ */ A("span", { className: "pointer-events-none flex w-full min-w-0 items-center", children: u({ values: [...tt], items: n, display: Nt, open: Oe, toggle: Je }) }) : /* @__PURE__ */ pe(
            lr,
            {
              ref: he,
              variant: "outline",
              theme: bt === "dark" ? "dark" : "light",
              disabled: C,
              onClick: m ? void 0 : () => Oe ? qt() : Je(),
              onKeyDown: Ee,
              "data-state": Oe ? "open" : "closed",
              "aria-haspopup": "listbox",
              "aria-expanded": Oe,
              className: "w-full justify-between gap-2",
              children: [
                a === "chips" && tt.length > 0 ? /* @__PURE__ */ A("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1 overflow-hidden", children: tt.map((Zt) => /* @__PURE__ */ A(
                  "span",
                  {
                    className: "inline-flex items-center rounded border border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-1.5 py-0.5 text-[10px] text-[color:var(--ui-text)]",
                    children: Ke(Zt)
                  },
                  Zt
                )) }) : /* @__PURE__ */ A("span", { className: `min-w-0 flex-1 truncate text-left ${vn ? "italic text-[color:var(--ui-text-faint)]" : ""}`, children: Nt || y }),
                /* @__PURE__ */ A(Ai, { className: "h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" })
              ]
            }
          ),
          Yn
        ]
      }
    );
  }
  if (s === "morph")
    return /* @__PURE__ */ A(
      oh,
      {
        expanded: Oe,
        collapsedWidth: F,
        expandedWidth: N,
        rootRef: ge,
        "data-picker-field": !0,
        className: z,
        style: k,
        trigger: u ? u({ values: [...t], items: n, display: xe, open: Oe, toggle: Je }) : (
          /* The collapsed face IS the chip: one trigger recipe for both
             faces, so a morph picker matches every other value field. */
          /* @__PURE__ */ pe(
            "button",
            {
              type: "button",
              disabled: C,
              onClick: Je,
              className: "ui-press flex w-full cursor-pointer select-none items-center justify-between gap-2 rounded-[var(--ui-radius-btn)] border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left outline-none transition-colors hover:border-[color:var(--ui-input-focus-border)] disabled:cursor-default disabled:opacity-50",
              style: { padding: `${Qn}px ${kr}px`, fontSize: gi },
              children: [
                /* @__PURE__ */ A("span", { className: `min-w-0 flex-1 truncate ${Pr ? "italic text-[color:var(--ui-text-muted)]" : ""}`, children: xe || y }),
                /* @__PURE__ */ A(Ai, { className: "pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" })
              ]
            }
          )
        ),
        field: /* @__PURE__ */ pe("div", { ref: Ce, className: "relative h-full", children: [
          /* @__PURE__ */ A(
            "input",
            {
              ...Ur,
              className: `${Ha("sm")} h-full w-full`
            }
          ),
          Yn
        ] })
      }
    );
  const Gr = dn ? Me(5, 7, gt) : 0, ir = dn ? Me(9, 12, gt) : 0;
  return m ? /* @__PURE__ */ A(
    "div",
    {
      ref: ge,
      "data-picker-field": !0,
      className: `relative ${dn ? "flex w-full items-center gap-1.5 rounded border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left" : Sn ? "min-h-[1lh] w-full pb-[1lh]" : "h-[1lh] w-full"} ${z}`,
      style: dn ? { padding: `${Gr}px ${ir}px`, fontSize: Me(12, 14, gt), ...k } : k,
      children: /* @__PURE__ */ A(
        "input",
        {
          readOnly: !0,
          tabIndex: -1,
          value: xe,
          className: dn ? "w-full min-w-0 bg-transparent outline-none" : "absolute inset-0 h-full w-full bg-transparent text-inherit outline-none",
          style: { color: "inherit", caretColor: "transparent" }
        }
      )
    }
  ) : /* @__PURE__ */ pe(
    "div",
    {
      ref: ge,
      "data-picker-field": !0,
      className: `relative ${dn ? "ui-press flex w-full items-center gap-1.5 rounded-[var(--ui-radius-btn)] border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left outline-none focus-within:border-[color:var(--ui-input-focus-border)]" : Sn ? "min-h-[1lh] w-full pb-[1lh]" : rr ? "w-max max-w-[400px] min-w-[72px]" : "h-[1lh] w-full"} ${z}`,
      style: dn ? { padding: `${Gr}px ${ir}px`, fontSize: gi, ...k } : k,
      onMouseDown: (Ee) => Ee.stopPropagation(),
      onContextMenu: (Ee) => {
        Ee.preventDefault(), Ee.stopPropagation();
      },
      onAuxClick: Je,
      children: [
        dn && u ? /* @__PURE__ */ A("span", { className: "pointer-events-none flex min-w-0 flex-1 items-center", children: u({ values: [...t], items: n, display: xe, open: Oe, toggle: Je }) }) : a === "chips" && !Oe ? /* @__PURE__ */ pe("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1", children: [
          t.map((Ee) => /* @__PURE__ */ A(
            "span",
            {
              className: "inline-flex items-center rounded border border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-1.5 py-0.5 text-[10px] text-[color:var(--ui-text)]",
              children: Ke(Ee)
            },
            Ee
          )),
          t.length === 0 && /* @__PURE__ */ A("span", { className: "italic text-[color:var(--ui-text-muted)]", children: y })
        ] }) : /* @__PURE__ */ A(
          "span",
          {
            className: `pointer-events-none text-left ${dn ? "min-w-0 flex-1 truncate" : Sn ? "block whitespace-pre-wrap break-words leading-relaxed" : "absolute inset-y-0 inset-x-0 flex items-center truncate whitespace-nowrap"} ${Pr ? "italic text-[color:var(--ui-text-muted)]" : ""}`,
            children: pi || y
          }
        ),
        Sn ? /* @__PURE__ */ A(
          "textarea",
          {
            ...Ur,
            rows: 1,
            className: "absolute inset-0 h-full w-full resize-none overflow-hidden whitespace-pre-wrap break-words bg-transparent text-transparent outline-none",
            style: { caretColor: "#2563eb", color: "transparent" }
          }
        ) : /* @__PURE__ */ A(
          "input",
          {
            ...Ur,
            className: rr ? "block w-full bg-transparent text-transparent outline-none" : "absolute inset-0 h-full w-full bg-transparent text-transparent outline-none",
            style: rr ? { fieldSizing: "content", width: "auto", minWidth: 72, maxWidth: 400, caretColor: "#2563eb", color: "transparent" } : dn ? { caretColor: "#2563eb", color: "transparent", paddingLeft: ir, paddingRight: ir + 16 } : { caretColor: "#2563eb", color: "transparent" }
          }
        ),
        dn && /* @__PURE__ */ A(Ai, { className: "pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" }),
        Yn
      ]
    }
  );
}
var ba = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ni(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var nc, Hp;
function iR() {
  if (Hp) return nc;
  Hp = 1;
  var t = Object.prototype, e = t.hasOwnProperty;
  function n(r, i) {
    return r != null && e.call(r, i);
  }
  return nc = n, nc;
}
var rc, Bp;
function ri() {
  if (Bp) return rc;
  Bp = 1;
  var t = Array.isArray;
  return rc = t, rc;
}
var ic, qp;
function Lv() {
  if (qp) return ic;
  qp = 1;
  var t = typeof ba == "object" && ba && ba.Object === Object && ba;
  return ic = t, ic;
}
var oc, Wp;
function ii() {
  if (Wp) return oc;
  Wp = 1;
  var t = Lv(), e = typeof self == "object" && self && self.Object === Object && self, n = t || e || Function("return this")();
  return oc = n, oc;
}
var sc, jp;
function Hs() {
  if (jp) return sc;
  jp = 1;
  var t = ii(), e = t.Symbol;
  return sc = e, sc;
}
var ac, Kp;
function oR() {
  if (Kp) return ac;
  Kp = 1;
  var t = Hs(), e = Object.prototype, n = e.hasOwnProperty, r = e.toString, i = t ? t.toStringTag : void 0;
  function o(s) {
    var a = n.call(s, i), l = s[i];
    try {
      s[i] = void 0;
      var c = !0;
    } catch {
    }
    var u = r.call(s);
    return c && (a ? s[i] = l : delete s[i]), u;
  }
  return ac = o, ac;
}
var lc, Up;
function sR() {
  if (Up) return lc;
  Up = 1;
  var t = Object.prototype, e = t.toString;
  function n(r) {
    return e.call(r);
  }
  return lc = n, lc;
}
var cc, Gp;
function Bs() {
  if (Gp) return cc;
  Gp = 1;
  var t = Hs(), e = oR(), n = sR(), r = "[object Null]", i = "[object Undefined]", o = t ? t.toStringTag : void 0;
  function s(a) {
    return a == null ? a === void 0 ? i : r : o && o in Object(a) ? e(a) : n(a);
  }
  return cc = s, cc;
}
var uc, Yp;
function qs() {
  if (Yp) return uc;
  Yp = 1;
  function t(e) {
    return e != null && typeof e == "object";
  }
  return uc = t, uc;
}
var dc, Xp;
function yl() {
  if (Xp) return dc;
  Xp = 1;
  var t = Bs(), e = qs(), n = "[object Symbol]";
  function r(i) {
    return typeof i == "symbol" || e(i) && t(i) == n;
  }
  return dc = r, dc;
}
var fc, Vp;
function ah() {
  if (Vp) return fc;
  Vp = 1;
  var t = ri(), e = yl(), n = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, r = /^\w*$/;
  function i(o, s) {
    if (t(o))
      return !1;
    var a = typeof o;
    return a == "number" || a == "symbol" || a == "boolean" || o == null || e(o) ? !0 : r.test(o) || !n.test(o) || s != null && o in Object(s);
  }
  return fc = i, fc;
}
var hc, Jp;
function ao() {
  if (Jp) return hc;
  Jp = 1;
  function t(e) {
    var n = typeof e;
    return e != null && (n == "object" || n == "function");
  }
  return hc = t, hc;
}
var pc, Zp;
function $v() {
  if (Zp) return pc;
  Zp = 1;
  var t = Bs(), e = ao(), n = "[object AsyncFunction]", r = "[object Function]", i = "[object GeneratorFunction]", o = "[object Proxy]";
  function s(a) {
    if (!e(a))
      return !1;
    var l = t(a);
    return l == r || l == i || l == n || l == o;
  }
  return pc = s, pc;
}
var gc, Qp;
function aR() {
  if (Qp) return gc;
  Qp = 1;
  var t = ii(), e = t["__core-js_shared__"];
  return gc = e, gc;
}
var mc, eg;
function lR() {
  if (eg) return mc;
  eg = 1;
  var t = aR(), e = (function() {
    var r = /[^.]+$/.exec(t && t.keys && t.keys.IE_PROTO || "");
    return r ? "Symbol(src)_1." + r : "";
  })();
  function n(r) {
    return !!e && e in r;
  }
  return mc = n, mc;
}
var yc, tg;
function Fv() {
  if (tg) return yc;
  tg = 1;
  var t = Function.prototype, e = t.toString;
  function n(r) {
    if (r != null) {
      try {
        return e.call(r);
      } catch {
      }
      try {
        return r + "";
      } catch {
      }
    }
    return "";
  }
  return yc = n, yc;
}
var bc, ng;
function cR() {
  if (ng) return bc;
  ng = 1;
  var t = $v(), e = lR(), n = ao(), r = Fv(), i = /[\\^$.*+?()[\]{}|]/g, o = /^\[object .+?Constructor\]$/, s = Function.prototype, a = Object.prototype, l = s.toString, c = a.hasOwnProperty, u = RegExp(
    "^" + l.call(c).replace(i, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function d(f) {
    if (!n(f) || e(f))
      return !1;
    var h = t(f) ? u : o;
    return h.test(r(f));
  }
  return bc = d, bc;
}
var vc, rg;
function uR() {
  if (rg) return vc;
  rg = 1;
  function t(e, n) {
    return e == null ? void 0 : e[n];
  }
  return vc = t, vc;
}
var wc, ig;
function lo() {
  if (ig) return wc;
  ig = 1;
  var t = cR(), e = uR();
  function n(r, i) {
    var o = e(r, i);
    return t(o) ? o : void 0;
  }
  return wc = n, wc;
}
var xc, og;
function bl() {
  if (og) return xc;
  og = 1;
  var t = lo(), e = t(Object, "create");
  return xc = e, xc;
}
var kc, sg;
function dR() {
  if (sg) return kc;
  sg = 1;
  var t = bl();
  function e() {
    this.__data__ = t ? t(null) : {}, this.size = 0;
  }
  return kc = e, kc;
}
var Sc, ag;
function fR() {
  if (ag) return Sc;
  ag = 1;
  function t(e) {
    var n = this.has(e) && delete this.__data__[e];
    return this.size -= n ? 1 : 0, n;
  }
  return Sc = t, Sc;
}
var Cc, lg;
function hR() {
  if (lg) return Cc;
  lg = 1;
  var t = bl(), e = "__lodash_hash_undefined__", n = Object.prototype, r = n.hasOwnProperty;
  function i(o) {
    var s = this.__data__;
    if (t) {
      var a = s[o];
      return a === e ? void 0 : a;
    }
    return r.call(s, o) ? s[o] : void 0;
  }
  return Cc = i, Cc;
}
var Rc, cg;
function pR() {
  if (cg) return Rc;
  cg = 1;
  var t = bl(), e = Object.prototype, n = e.hasOwnProperty;
  function r(i) {
    var o = this.__data__;
    return t ? o[i] !== void 0 : n.call(o, i);
  }
  return Rc = r, Rc;
}
var Tc, ug;
function gR() {
  if (ug) return Tc;
  ug = 1;
  var t = bl(), e = "__lodash_hash_undefined__";
  function n(r, i) {
    var o = this.__data__;
    return this.size += this.has(r) ? 0 : 1, o[r] = t && i === void 0 ? e : i, this;
  }
  return Tc = n, Tc;
}
var Ec, dg;
function mR() {
  if (dg) return Ec;
  dg = 1;
  var t = dR(), e = fR(), n = hR(), r = pR(), i = gR();
  function o(s) {
    var a = -1, l = s == null ? 0 : s.length;
    for (this.clear(); ++a < l; ) {
      var c = s[a];
      this.set(c[0], c[1]);
    }
  }
  return o.prototype.clear = t, o.prototype.delete = e, o.prototype.get = n, o.prototype.has = r, o.prototype.set = i, Ec = o, Ec;
}
var Mc, fg;
function yR() {
  if (fg) return Mc;
  fg = 1;
  function t() {
    this.__data__ = [], this.size = 0;
  }
  return Mc = t, Mc;
}
var Ic, hg;
function lh() {
  if (hg) return Ic;
  hg = 1;
  function t(e, n) {
    return e === n || e !== e && n !== n;
  }
  return Ic = t, Ic;
}
var Ac, pg;
function vl() {
  if (pg) return Ac;
  pg = 1;
  var t = lh();
  function e(n, r) {
    for (var i = n.length; i--; )
      if (t(n[i][0], r))
        return i;
    return -1;
  }
  return Ac = e, Ac;
}
var _c, gg;
function bR() {
  if (gg) return _c;
  gg = 1;
  var t = vl(), e = Array.prototype, n = e.splice;
  function r(i) {
    var o = this.__data__, s = t(o, i);
    if (s < 0)
      return !1;
    var a = o.length - 1;
    return s == a ? o.pop() : n.call(o, s, 1), --this.size, !0;
  }
  return _c = r, _c;
}
var Pc, mg;
function vR() {
  if (mg) return Pc;
  mg = 1;
  var t = vl();
  function e(n) {
    var r = this.__data__, i = t(r, n);
    return i < 0 ? void 0 : r[i][1];
  }
  return Pc = e, Pc;
}
var Dc, yg;
function wR() {
  if (yg) return Dc;
  yg = 1;
  var t = vl();
  function e(n) {
    return t(this.__data__, n) > -1;
  }
  return Dc = e, Dc;
}
var Nc, bg;
function xR() {
  if (bg) return Nc;
  bg = 1;
  var t = vl();
  function e(n, r) {
    var i = this.__data__, o = t(i, n);
    return o < 0 ? (++this.size, i.push([n, r])) : i[o][1] = r, this;
  }
  return Nc = e, Nc;
}
var Oc, vg;
function wl() {
  if (vg) return Oc;
  vg = 1;
  var t = yR(), e = bR(), n = vR(), r = wR(), i = xR();
  function o(s) {
    var a = -1, l = s == null ? 0 : s.length;
    for (this.clear(); ++a < l; ) {
      var c = s[a];
      this.set(c[0], c[1]);
    }
  }
  return o.prototype.clear = t, o.prototype.delete = e, o.prototype.get = n, o.prototype.has = r, o.prototype.set = i, Oc = o, Oc;
}
var zc, wg;
function ch() {
  if (wg) return zc;
  wg = 1;
  var t = lo(), e = ii(), n = t(e, "Map");
  return zc = n, zc;
}
var Lc, xg;
function kR() {
  if (xg) return Lc;
  xg = 1;
  var t = mR(), e = wl(), n = ch();
  function r() {
    this.size = 0, this.__data__ = {
      hash: new t(),
      map: new (n || e)(),
      string: new t()
    };
  }
  return Lc = r, Lc;
}
var $c, kg;
function SR() {
  if (kg) return $c;
  kg = 1;
  function t(e) {
    var n = typeof e;
    return n == "string" || n == "number" || n == "symbol" || n == "boolean" ? e !== "__proto__" : e === null;
  }
  return $c = t, $c;
}
var Fc, Sg;
function xl() {
  if (Sg) return Fc;
  Sg = 1;
  var t = SR();
  function e(n, r) {
    var i = n.__data__;
    return t(r) ? i[typeof r == "string" ? "string" : "hash"] : i.map;
  }
  return Fc = e, Fc;
}
var Hc, Cg;
function CR() {
  if (Cg) return Hc;
  Cg = 1;
  var t = xl();
  function e(n) {
    var r = t(this, n).delete(n);
    return this.size -= r ? 1 : 0, r;
  }
  return Hc = e, Hc;
}
var Bc, Rg;
function RR() {
  if (Rg) return Bc;
  Rg = 1;
  var t = xl();
  function e(n) {
    return t(this, n).get(n);
  }
  return Bc = e, Bc;
}
var qc, Tg;
function TR() {
  if (Tg) return qc;
  Tg = 1;
  var t = xl();
  function e(n) {
    return t(this, n).has(n);
  }
  return qc = e, qc;
}
var Wc, Eg;
function ER() {
  if (Eg) return Wc;
  Eg = 1;
  var t = xl();
  function e(n, r) {
    var i = t(this, n), o = i.size;
    return i.set(n, r), this.size += i.size == o ? 0 : 1, this;
  }
  return Wc = e, Wc;
}
var jc, Mg;
function uh() {
  if (Mg) return jc;
  Mg = 1;
  var t = kR(), e = CR(), n = RR(), r = TR(), i = ER();
  function o(s) {
    var a = -1, l = s == null ? 0 : s.length;
    for (this.clear(); ++a < l; ) {
      var c = s[a];
      this.set(c[0], c[1]);
    }
  }
  return o.prototype.clear = t, o.prototype.delete = e, o.prototype.get = n, o.prototype.has = r, o.prototype.set = i, jc = o, jc;
}
var Kc, Ig;
function MR() {
  if (Ig) return Kc;
  Ig = 1;
  var t = uh(), e = "Expected a function";
  function n(r, i) {
    if (typeof r != "function" || i != null && typeof i != "function")
      throw new TypeError(e);
    var o = function() {
      var s = arguments, a = i ? i.apply(this, s) : s[0], l = o.cache;
      if (l.has(a))
        return l.get(a);
      var c = r.apply(this, s);
      return o.cache = l.set(a, c) || l, c;
    };
    return o.cache = new (n.Cache || t)(), o;
  }
  return n.Cache = t, Kc = n, Kc;
}
var Uc, Ag;
function IR() {
  if (Ag) return Uc;
  Ag = 1;
  var t = MR(), e = 500;
  function n(r) {
    var i = t(r, function(s) {
      return o.size === e && o.clear(), s;
    }), o = i.cache;
    return i;
  }
  return Uc = n, Uc;
}
var Gc, _g;
function AR() {
  if (_g) return Gc;
  _g = 1;
  var t = IR(), e = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, n = /\\(\\)?/g, r = t(function(i) {
    var o = [];
    return i.charCodeAt(0) === 46 && o.push(""), i.replace(e, function(s, a, l, c) {
      o.push(l ? c.replace(n, "$1") : a || s);
    }), o;
  });
  return Gc = r, Gc;
}
var Yc, Pg;
function _R() {
  if (Pg) return Yc;
  Pg = 1;
  function t(e, n) {
    for (var r = -1, i = e == null ? 0 : e.length, o = Array(i); ++r < i; )
      o[r] = n(e[r], r, e);
    return o;
  }
  return Yc = t, Yc;
}
var Xc, Dg;
function PR() {
  if (Dg) return Xc;
  Dg = 1;
  var t = Hs(), e = _R(), n = ri(), r = yl(), i = t ? t.prototype : void 0, o = i ? i.toString : void 0;
  function s(a) {
    if (typeof a == "string")
      return a;
    if (n(a))
      return e(a, s) + "";
    if (r(a))
      return o ? o.call(a) : "";
    var l = a + "";
    return l == "0" && 1 / a == -1 / 0 ? "-0" : l;
  }
  return Xc = s, Xc;
}
var Vc, Ng;
function DR() {
  if (Ng) return Vc;
  Ng = 1;
  var t = PR();
  function e(n) {
    return n == null ? "" : t(n);
  }
  return Vc = e, Vc;
}
var Jc, Og;
function Hv() {
  if (Og) return Jc;
  Og = 1;
  var t = ri(), e = ah(), n = AR(), r = DR();
  function i(o, s) {
    return t(o) ? o : e(o, s) ? [o] : n(r(o));
  }
  return Jc = i, Jc;
}
var Zc, zg;
function NR() {
  if (zg) return Zc;
  zg = 1;
  var t = Bs(), e = qs(), n = "[object Arguments]";
  function r(i) {
    return e(i) && t(i) == n;
  }
  return Zc = r, Zc;
}
var Qc, Lg;
function dh() {
  if (Lg) return Qc;
  Lg = 1;
  var t = NR(), e = qs(), n = Object.prototype, r = n.hasOwnProperty, i = n.propertyIsEnumerable, o = t(/* @__PURE__ */ (function() {
    return arguments;
  })()) ? t : function(s) {
    return e(s) && r.call(s, "callee") && !i.call(s, "callee");
  };
  return Qc = o, Qc;
}
var eu, $g;
function fh() {
  if ($g) return eu;
  $g = 1;
  var t = 9007199254740991, e = /^(?:0|[1-9]\d*)$/;
  function n(r, i) {
    var o = typeof r;
    return i = i ?? t, !!i && (o == "number" || o != "symbol" && e.test(r)) && r > -1 && r % 1 == 0 && r < i;
  }
  return eu = n, eu;
}
var tu, Fg;
function hh() {
  if (Fg) return tu;
  Fg = 1;
  var t = 9007199254740991;
  function e(n) {
    return typeof n == "number" && n > -1 && n % 1 == 0 && n <= t;
  }
  return tu = e, tu;
}
var nu, Hg;
function kl() {
  if (Hg) return nu;
  Hg = 1;
  var t = yl();
  function e(n) {
    if (typeof n == "string" || t(n))
      return n;
    var r = n + "";
    return r == "0" && 1 / n == -1 / 0 ? "-0" : r;
  }
  return nu = e, nu;
}
var ru, Bg;
function Bv() {
  if (Bg) return ru;
  Bg = 1;
  var t = Hv(), e = dh(), n = ri(), r = fh(), i = hh(), o = kl();
  function s(a, l, c) {
    l = t(l, a);
    for (var u = -1, d = l.length, f = !1; ++u < d; ) {
      var h = o(l[u]);
      if (!(f = a != null && c(a, h)))
        break;
      a = a[h];
    }
    return f || ++u != d ? f : (d = a == null ? 0 : a.length, !!d && i(d) && r(h, d) && (n(a) || e(a)));
  }
  return ru = s, ru;
}
var iu, qg;
function OR() {
  if (qg) return iu;
  qg = 1;
  var t = iR(), e = Bv();
  function n(r, i) {
    return r != null && e(r, i, t);
  }
  return iu = n, iu;
}
var zR = OR();
const LR = /* @__PURE__ */ Ni(zR);
function qv(t = "This should not happen") {
  throw new Error(t);
}
function mr(t, e = "Assertion failed") {
  if (!t)
    return qv(e);
}
function Ps(t, e) {
  return qv(e ?? "Hell froze over");
}
function $R(t, e) {
  try {
    return t();
  } catch {
    return e;
  }
}
const Wg = Object.prototype.hasOwnProperty;
function qo(t, e) {
  let n, r;
  if (t === e)
    return !0;
  if (t && e && (n = t.constructor) === e.constructor) {
    if (n === Date)
      return t.getTime() === e.getTime();
    if (n === RegExp)
      return t.toString() === e.toString();
    if (n === Array) {
      if ((r = t.length) === e.length)
        for (; r-- && qo(t[r], e[r]); )
          ;
      return r === -1;
    }
    if (!n || typeof t == "object") {
      r = 0;
      for (n in t)
        if (Wg.call(t, n) && ++r && !Wg.call(e, n) || !(n in e) || !qo(t[n], e[n]))
          return !1;
      return Object.keys(e).length === r;
    }
  }
  return t !== t && e !== e;
}
const Xa = null, ph = void 0;
var Be;
(function(t) {
  t.Uri = "uri", t.Text = "text", t.Image = "image", t.RowID = "row-id", t.Number = "number", t.Bubble = "bubble", t.Boolean = "boolean", t.Loading = "loading", t.Markdown = "markdown", t.Drilldown = "drilldown", t.Protected = "protected", t.Custom = "custom";
})(Be || (Be = {}));
var jg;
(function(t) {
  t.HeaderRowID = "headerRowID", t.HeaderCode = "headerCode", t.HeaderNumber = "headerNumber", t.HeaderString = "headerString", t.HeaderBoolean = "headerBoolean", t.HeaderAudioUri = "headerAudioUri", t.HeaderVideoUri = "headerVideoUri", t.HeaderEmoji = "headerEmoji", t.HeaderImage = "headerImage", t.HeaderUri = "headerUri", t.HeaderPhone = "headerPhone", t.HeaderMarkdown = "headerMarkdown", t.HeaderDate = "headerDate", t.HeaderTime = "headerTime", t.HeaderEmail = "headerEmail", t.HeaderReference = "headerReference", t.HeaderIfThenElse = "headerIfThenElse", t.HeaderSingleValue = "headerSingleValue", t.HeaderLookup = "headerLookup", t.HeaderTextTemplate = "headerTextTemplate", t.HeaderMath = "headerMath", t.HeaderRollup = "headerRollup", t.HeaderJoinStrings = "headerJoinStrings", t.HeaderSplitString = "headerSplitString", t.HeaderGeoDistance = "headerGeoDistance", t.HeaderArray = "headerArray", t.RowOwnerOverlay = "rowOwnerOverlay", t.ProtectedColumnOverlay = "protectedColumnOverlay";
})(jg || (jg = {}));
var Va;
(function(t) {
  t.Triangle = "triangle", t.Dots = "dots";
})(Va || (Va = {}));
function va(t) {
  return "width" in t && typeof t.width == "number";
}
async function Kg(t) {
  return typeof t == "object" ? t : await t();
}
function To(t) {
  return !(t.kind === Be.Loading || t.kind === Be.Bubble || t.kind === Be.RowID || t.kind === Be.Protected || t.kind === Be.Drilldown);
}
function _o(t) {
  return t.kind === Ir.Marker || t.kind === Ir.NewRow;
}
function Eo(t) {
  if (!To(t) || t.kind === Be.Image)
    return !1;
  switch (t.kind) {
    case Be.Text:
    case Be.Number:
    case Be.Markdown:
    case Be.Uri:
    case Be.Custom:
    case Be.Boolean:
      return t.readonly !== !0;
    default:
      Ps(t, "A cell was passed with an invalid kind");
  }
}
function FR(t) {
  return LR(t, "editor");
}
function gh(t) {
  return !(t.readonly ?? !1);
}
var Ir;
(function(t) {
  t.NewRow = "new-row", t.Marker = "marker";
})(Ir || (Ir = {}));
const Ja = {
  shape: "square",
  size: 4,
  offsetX: -2,
  offsetY: -2,
  outline: 0
};
function ou(t) {
  if (t.length === 0)
    return [];
  const e = [...t], n = [];
  e.sort(function(r, i) {
    return r[0] - i[0];
  }), n.push([...e[0]]);
  for (const r of e.slice(1)) {
    const i = n[n.length - 1];
    i[1] < r[0] ? n.push([...r]) : i[1] < r[1] && (i[1] = r[1]);
  }
  return n;
}
let Ug;
const ar = class ar {
  constructor(e) {
    Qe(this, "items");
    this.items = e;
  }
  offset(e) {
    if (e === 0)
      return this;
    const n = this.items.map((r) => [r[0] + e, r[1] + e]);
    return new ar(n);
  }
  add(e) {
    const n = typeof e == "number" ? [e, e + 1] : e, r = ou([...this.items, n]);
    return new ar(r);
  }
  remove(e) {
    const n = [...this.items], r = typeof e == "number" ? e : e[0], i = typeof e == "number" ? e + 1 : e[1];
    for (const [o, s] of n.entries()) {
      const [a, l] = s;
      if (a <= i && r <= l) {
        const c = [];
        a < r && c.push([a, r]), i < l && c.push([i, l]), n.splice(o, 1, ...c);
      }
    }
    return new ar(n);
  }
  first() {
    if (this.items.length !== 0)
      return this.items[0][0];
  }
  last() {
    if (this.items.length !== 0)
      return this.items.slice(-1)[0][1] - 1;
  }
  hasIndex(e) {
    for (let n = 0; n < this.items.length; n++) {
      const [r, i] = this.items[n];
      if (e >= r && e < i)
        return !0;
    }
    return !1;
  }
  hasAll(e) {
    for (let n = e[0]; n < e[1]; n++)
      if (!this.hasIndex(n))
        return !1;
    return !0;
  }
  some(e) {
    for (const n of this)
      if (e(n))
        return !0;
    return !1;
  }
  equals(e) {
    if (e === this)
      return !0;
    if (e.items.length !== this.items.length)
      return !1;
    for (let n = 0; n < this.items.length; n++) {
      const r = e.items[n], i = this.items[n];
      if (r[0] !== i[0] || r[1] !== i[1])
        return !1;
    }
    return !0;
  }
  // Really old JS wont have access to the iterator and babel will stop people using it
  // when trying to support browsers so old we don't support them anyway. What goes on
  // between an engineer and their bundler in the privacy of their CI server is none of
  // my business anyway.
  toArray() {
    const e = [];
    for (const [n, r] of this.items)
      for (let i = n; i < r; i++)
        e.push(i);
    return e;
  }
  get length() {
    let e = 0;
    for (const [n, r] of this.items)
      e += r - n;
    return e;
  }
  *[Symbol.iterator]() {
    for (const [e, n] of this.items)
      for (let r = e; r < n; r++)
        yield r;
  }
};
Qe(ar, "create", (e) => new ar(ou(e))), Qe(ar, "empty", () => Ug ?? (Ug = new ar([]))), Qe(ar, "fromSingleSelection", (e) => ar.empty().add(e)), Qe(ar, "fromArray", (e) => {
  if (e.length === 0)
    return ar.empty();
  const n = e.map((i) => [i, i + 1]), r = ou(n);
  return new ar(r);
});
let on = ar;
function HR(t) {
  var e = /* @__PURE__ */ Object.create(null);
  return function(n) {
    return e[n] === void 0 && (e[n] = t(n)), e[n];
  };
}
var BR = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/, su = /* @__PURE__ */ HR(
  function(t) {
    return BR.test(t) || t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && t.charCodeAt(2) < 91;
  }
  /* Z+1 */
), qR = function() {
  const e = Array.prototype.slice.call(arguments).filter(Boolean), n = {}, r = [];
  e.forEach((o) => {
    (o ? o.split(" ") : []).forEach((a) => {
      if (a.startsWith("atm_")) {
        const [, l] = a.split("_");
        n[l] = a;
      } else
        r.push(a);
    });
  });
  const i = [];
  for (const o in n)
    Object.prototype.hasOwnProperty.call(n, o) && i.push(n[o]);
  return i.push(...r), i.join(" ");
}, Gg = qR, WR = (t) => t.toUpperCase() === t, jR = (t) => (e) => t.indexOf(e) === -1, Wv = (t, e) => {
  const n = {};
  return Object.keys(t).filter(jR(e)).forEach((r) => {
    n[r] = t[r];
  }), n;
};
function KR(t, e, n) {
  const r = Wv(e, n);
  if (!t) {
    const i = typeof su == "function" ? { default: su } : su;
    Object.keys(r).forEach((o) => {
      i.default(o) || delete r[o];
    });
  }
  return r;
}
var UR = (t, e) => {
  if (process.env.NODE_ENV !== "production") {
    if (typeof t == "string" || // eslint-disable-next-line no-self-compare,no-restricted-globals
    typeof t == "number" && isFinite(t))
      return;
    const n = typeof t == "object" ? JSON.stringify(t) : String(t);
    console.warn(
      `An interpolation evaluated to '${n}' in the component '${e}', which is probably a mistake. You should explicitly cast or transform the value to a string.`
    );
  }
}, GR = 0;
function Yg(t) {
  let e = "";
  return process.env.NODE_ENV === "test" && (e += `mocked-styled-${GR++}`, t && t.__wyw_meta && t.__wyw_meta.className && (e += ` ${t.__wyw_meta.className}`)), (n) => {
    if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Array.isArray(n))
      throw new Error(
        'Using the "styled" tag in runtime is not supported. Make sure you have set up the Babel plugin correctly. See https://github.com/callstack/linaria#setup'
      );
    const r = (o, s) => {
      const { as: a = t, class: l = e } = o, c = n.propsAsIs === void 0 ? !(typeof a == "string" && a.indexOf("-") === -1 && !WR(a[0])) : n.propsAsIs, u = KR(c, o, [
        "as",
        "class"
      ]);
      u.ref = s, u.className = n.atomic ? Gg(n.class, u.className || l) : Gg(u.className || l, n.class);
      const { vars: d } = n;
      if (d) {
        const f = {};
        for (const g in d) {
          const y = d[g], m = y[0], b = y[1] || "", C = typeof m == "function" ? m(o) : m;
          UR(C, n.name), f[`--${g}`] = `${C}${b}`;
        }
        const h = u.style || {}, p = Object.keys(h);
        p.length > 0 && p.forEach((g) => {
          f[g] = h[g];
        }), u.style = f;
      }
      return t.__wyw_meta && t !== a ? (u.as = a, ip(t, u)) : ip(a, u);
    }, i = rp ? rp(r) : (
      // React.forwardRef won't available on older React versions and in Preact
      // Fallback to a innerRef prop in that case
      ((o) => {
        const s = Wv(o, ["innerRef"]);
        return r(s, o.innerRef);
      })
    );
    return i.displayName = n.name, i.__wyw_meta = {
      className: n.class || e,
      extends: t
    }, i;
  };
}
var wr = process.env.NODE_ENV !== "production" ? new Proxy(Yg, {
  get(t, e) {
    return t(e);
  }
}) : Yg;
const YR = /* @__PURE__ */ wr("div")({
  name: "ImageOverlayEditorStyle",
  class: "gdg-i2iowwq",
  propsAsIs: !1
});
var au = {}, Qo = {}, wa = {}, xa = {}, ka = { exports: {} }, Sa = { exports: {} }, cn = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xg;
function XR() {
  if (Xg) return cn;
  Xg = 1;
  var t = typeof Symbol == "function" && Symbol.for, e = t ? Symbol.for("react.element") : 60103, n = t ? Symbol.for("react.portal") : 60106, r = t ? Symbol.for("react.fragment") : 60107, i = t ? Symbol.for("react.strict_mode") : 60108, o = t ? Symbol.for("react.profiler") : 60114, s = t ? Symbol.for("react.provider") : 60109, a = t ? Symbol.for("react.context") : 60110, l = t ? Symbol.for("react.async_mode") : 60111, c = t ? Symbol.for("react.concurrent_mode") : 60111, u = t ? Symbol.for("react.forward_ref") : 60112, d = t ? Symbol.for("react.suspense") : 60113, f = t ? Symbol.for("react.suspense_list") : 60120, h = t ? Symbol.for("react.memo") : 60115, p = t ? Symbol.for("react.lazy") : 60116, g = t ? Symbol.for("react.block") : 60121, y = t ? Symbol.for("react.fundamental") : 60117, m = t ? Symbol.for("react.responder") : 60118, b = t ? Symbol.for("react.scope") : 60119;
  function C(v) {
    if (typeof v == "object" && v !== null) {
      var T = v.$$typeof;
      switch (T) {
        case e:
          switch (v = v.type, v) {
            case l:
            case c:
            case r:
            case o:
            case i:
            case d:
              return v;
            default:
              switch (v = v && v.$$typeof, v) {
                case a:
                case u:
                case p:
                case h:
                case s:
                  return v;
                default:
                  return T;
              }
          }
        case n:
          return T;
      }
    }
  }
  function I(v) {
    return C(v) === c;
  }
  return cn.AsyncMode = l, cn.ConcurrentMode = c, cn.ContextConsumer = a, cn.ContextProvider = s, cn.Element = e, cn.ForwardRef = u, cn.Fragment = r, cn.Lazy = p, cn.Memo = h, cn.Portal = n, cn.Profiler = o, cn.StrictMode = i, cn.Suspense = d, cn.isAsyncMode = function(v) {
    return I(v) || C(v) === l;
  }, cn.isConcurrentMode = I, cn.isContextConsumer = function(v) {
    return C(v) === a;
  }, cn.isContextProvider = function(v) {
    return C(v) === s;
  }, cn.isElement = function(v) {
    return typeof v == "object" && v !== null && v.$$typeof === e;
  }, cn.isForwardRef = function(v) {
    return C(v) === u;
  }, cn.isFragment = function(v) {
    return C(v) === r;
  }, cn.isLazy = function(v) {
    return C(v) === p;
  }, cn.isMemo = function(v) {
    return C(v) === h;
  }, cn.isPortal = function(v) {
    return C(v) === n;
  }, cn.isProfiler = function(v) {
    return C(v) === o;
  }, cn.isStrictMode = function(v) {
    return C(v) === i;
  }, cn.isSuspense = function(v) {
    return C(v) === d;
  }, cn.isValidElementType = function(v) {
    return typeof v == "string" || typeof v == "function" || v === r || v === c || v === o || v === i || v === d || v === f || typeof v == "object" && v !== null && (v.$$typeof === p || v.$$typeof === h || v.$$typeof === s || v.$$typeof === a || v.$$typeof === u || v.$$typeof === y || v.$$typeof === m || v.$$typeof === b || v.$$typeof === g);
  }, cn.typeOf = C, cn;
}
var un = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vg;
function VR() {
  return Vg || (Vg = 1, process.env.NODE_ENV !== "production" && (function() {
    var t = typeof Symbol == "function" && Symbol.for, e = t ? Symbol.for("react.element") : 60103, n = t ? Symbol.for("react.portal") : 60106, r = t ? Symbol.for("react.fragment") : 60107, i = t ? Symbol.for("react.strict_mode") : 60108, o = t ? Symbol.for("react.profiler") : 60114, s = t ? Symbol.for("react.provider") : 60109, a = t ? Symbol.for("react.context") : 60110, l = t ? Symbol.for("react.async_mode") : 60111, c = t ? Symbol.for("react.concurrent_mode") : 60111, u = t ? Symbol.for("react.forward_ref") : 60112, d = t ? Symbol.for("react.suspense") : 60113, f = t ? Symbol.for("react.suspense_list") : 60120, h = t ? Symbol.for("react.memo") : 60115, p = t ? Symbol.for("react.lazy") : 60116, g = t ? Symbol.for("react.block") : 60121, y = t ? Symbol.for("react.fundamental") : 60117, m = t ? Symbol.for("react.responder") : 60118, b = t ? Symbol.for("react.scope") : 60119;
    function C(ue) {
      return typeof ue == "string" || typeof ue == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      ue === r || ue === c || ue === o || ue === i || ue === d || ue === f || typeof ue == "object" && ue !== null && (ue.$$typeof === p || ue.$$typeof === h || ue.$$typeof === s || ue.$$typeof === a || ue.$$typeof === u || ue.$$typeof === y || ue.$$typeof === m || ue.$$typeof === b || ue.$$typeof === g);
    }
    function I(ue) {
      if (typeof ue == "object" && ue !== null) {
        var ke = ue.$$typeof;
        switch (ke) {
          case e:
            var we = ue.type;
            switch (we) {
              case l:
              case c:
              case r:
              case o:
              case i:
              case d:
                return we;
              default:
                var He = we && we.$$typeof;
                switch (He) {
                  case a:
                  case u:
                  case p:
                  case h:
                  case s:
                    return He;
                  default:
                    return ke;
                }
            }
          case n:
            return ke;
        }
      }
    }
    var v = l, T = c, D = a, P = s, S = e, z = u, k = r, x = p, M = h, _ = n, E = o, O = i, L = d, W = !1;
    function re(ue) {
      return W || (W = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), F(ue) || I(ue) === l;
    }
    function F(ue) {
      return I(ue) === c;
    }
    function N(ue) {
      return I(ue) === a;
    }
    function te(ue) {
      return I(ue) === s;
    }
    function Y(ue) {
      return typeof ue == "object" && ue !== null && ue.$$typeof === e;
    }
    function j(ue) {
      return I(ue) === u;
    }
    function ee(ue) {
      return I(ue) === r;
    }
    function H(ue) {
      return I(ue) === p;
    }
    function Z(ue) {
      return I(ue) === h;
    }
    function J(ue) {
      return I(ue) === n;
    }
    function V(ue) {
      return I(ue) === o;
    }
    function K(ue) {
      return I(ue) === i;
    }
    function le(ue) {
      return I(ue) === d;
    }
    un.AsyncMode = v, un.ConcurrentMode = T, un.ContextConsumer = D, un.ContextProvider = P, un.Element = S, un.ForwardRef = z, un.Fragment = k, un.Lazy = x, un.Memo = M, un.Portal = _, un.Profiler = E, un.StrictMode = O, un.Suspense = L, un.isAsyncMode = re, un.isConcurrentMode = F, un.isContextConsumer = N, un.isContextProvider = te, un.isElement = Y, un.isForwardRef = j, un.isFragment = ee, un.isLazy = H, un.isMemo = Z, un.isPortal = J, un.isProfiler = V, un.isStrictMode = K, un.isSuspense = le, un.isValidElementType = C, un.typeOf = I;
  })()), un;
}
var Jg;
function jv() {
  return Jg || (Jg = 1, process.env.NODE_ENV === "production" ? Sa.exports = XR() : Sa.exports = VR()), Sa.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var lu, Zg;
function JR() {
  if (Zg) return lu;
  Zg = 1;
  var t = Object.getOwnPropertySymbols, e = Object.prototype.hasOwnProperty, n = Object.prototype.propertyIsEnumerable;
  function r(o) {
    if (o == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(o);
  }
  function i() {
    try {
      if (!Object.assign)
        return !1;
      var o = new String("abc");
      if (o[5] = "de", Object.getOwnPropertyNames(o)[0] === "5")
        return !1;
      for (var s = {}, a = 0; a < 10; a++)
        s["_" + String.fromCharCode(a)] = a;
      var l = Object.getOwnPropertyNames(s).map(function(u) {
        return s[u];
      });
      if (l.join("") !== "0123456789")
        return !1;
      var c = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(u) {
        c[u] = u;
      }), Object.keys(Object.assign({}, c)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return lu = i() ? Object.assign : function(o, s) {
    for (var a, l = r(o), c, u = 1; u < arguments.length; u++) {
      a = Object(arguments[u]);
      for (var d in a)
        e.call(a, d) && (l[d] = a[d]);
      if (t) {
        c = t(a);
        for (var f = 0; f < c.length; f++)
          n.call(a, c[f]) && (l[c[f]] = a[c[f]]);
      }
    }
    return l;
  }, lu;
}
var cu, Qg;
function mh() {
  if (Qg) return cu;
  Qg = 1;
  var t = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return cu = t, cu;
}
var uu, em;
function Kv() {
  return em || (em = 1, uu = Function.call.bind(Object.prototype.hasOwnProperty)), uu;
}
var du, tm;
function ZR() {
  if (tm) return du;
  tm = 1;
  var t = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var e = /* @__PURE__ */ mh(), n = {}, r = /* @__PURE__ */ Kv();
    t = function(o) {
      var s = "Warning: " + o;
      typeof console < "u" && console.error(s);
      try {
        throw new Error(s);
      } catch {
      }
    };
  }
  function i(o, s, a, l, c) {
    if (process.env.NODE_ENV !== "production") {
      for (var u in o)
        if (r(o, u)) {
          var d;
          try {
            if (typeof o[u] != "function") {
              var f = Error(
                (l || "React class") + ": " + a + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof o[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw f.name = "Invariant Violation", f;
            }
            d = o[u](s, u, l, a, null, e);
          } catch (p) {
            d = p;
          }
          if (d && !(d instanceof Error) && t(
            (l || "React class") + ": type specification of " + a + " `" + u + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof d + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), d instanceof Error && !(d.message in n)) {
            n[d.message] = !0;
            var h = c ? c() : "";
            t(
              "Failed " + a + " type: " + d.message + (h ?? "")
            );
          }
        }
    }
  }
  return i.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, du = i, du;
}
var fu, nm;
function QR() {
  if (nm) return fu;
  nm = 1;
  var t = jv(), e = JR(), n = /* @__PURE__ */ mh(), r = /* @__PURE__ */ Kv(), i = /* @__PURE__ */ ZR(), o = function() {
  };
  process.env.NODE_ENV !== "production" && (o = function(a) {
    var l = "Warning: " + a;
    typeof console < "u" && console.error(l);
    try {
      throw new Error(l);
    } catch {
    }
  });
  function s() {
    return null;
  }
  return fu = function(a, l) {
    var c = typeof Symbol == "function" && Symbol.iterator, u = "@@iterator";
    function d(F) {
      var N = F && (c && F[c] || F[u]);
      if (typeof N == "function")
        return N;
    }
    var f = "<<anonymous>>", h = {
      array: m("array"),
      bigint: m("bigint"),
      bool: m("boolean"),
      func: m("function"),
      number: m("number"),
      object: m("object"),
      string: m("string"),
      symbol: m("symbol"),
      any: b(),
      arrayOf: C,
      element: I(),
      elementType: v(),
      instanceOf: T,
      node: z(),
      objectOf: P,
      oneOf: D,
      oneOfType: S,
      shape: x,
      exact: M
    };
    function p(F, N) {
      return F === N ? F !== 0 || 1 / F === 1 / N : F !== F && N !== N;
    }
    function g(F, N) {
      this.message = F, this.data = N && typeof N == "object" ? N : {}, this.stack = "";
    }
    g.prototype = Error.prototype;
    function y(F) {
      if (process.env.NODE_ENV !== "production")
        var N = {}, te = 0;
      function Y(ee, H, Z, J, V, K, le) {
        if (J = J || f, K = K || Z, le !== n) {
          if (l) {
            var ue = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw ue.name = "Invariant Violation", ue;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var ke = J + ":" + Z;
            !N[ke] && // Avoid spamming the console because they are often not actionable except for lib authors
            te < 3 && (o(
              "You are manually calling a React.PropTypes validation function for the `" + K + "` prop on `" + J + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), N[ke] = !0, te++);
          }
        }
        return H[Z] == null ? ee ? H[Z] === null ? new g("The " + V + " `" + K + "` is marked as required " + ("in `" + J + "`, but its value is `null`.")) : new g("The " + V + " `" + K + "` is marked as required in " + ("`" + J + "`, but its value is `undefined`.")) : null : F(H, Z, J, V, K);
      }
      var j = Y.bind(null, !1);
      return j.isRequired = Y.bind(null, !0), j;
    }
    function m(F) {
      function N(te, Y, j, ee, H, Z) {
        var J = te[Y], V = O(J);
        if (V !== F) {
          var K = L(J);
          return new g(
            "Invalid " + ee + " `" + H + "` of type " + ("`" + K + "` supplied to `" + j + "`, expected ") + ("`" + F + "`."),
            { expectedType: F }
          );
        }
        return null;
      }
      return y(N);
    }
    function b() {
      return y(s);
    }
    function C(F) {
      function N(te, Y, j, ee, H) {
        if (typeof F != "function")
          return new g("Property `" + H + "` of component `" + j + "` has invalid PropType notation inside arrayOf.");
        var Z = te[Y];
        if (!Array.isArray(Z)) {
          var J = O(Z);
          return new g("Invalid " + ee + " `" + H + "` of type " + ("`" + J + "` supplied to `" + j + "`, expected an array."));
        }
        for (var V = 0; V < Z.length; V++) {
          var K = F(Z, V, j, ee, H + "[" + V + "]", n);
          if (K instanceof Error)
            return K;
        }
        return null;
      }
      return y(N);
    }
    function I() {
      function F(N, te, Y, j, ee) {
        var H = N[te];
        if (!a(H)) {
          var Z = O(H);
          return new g("Invalid " + j + " `" + ee + "` of type " + ("`" + Z + "` supplied to `" + Y + "`, expected a single ReactElement."));
        }
        return null;
      }
      return y(F);
    }
    function v() {
      function F(N, te, Y, j, ee) {
        var H = N[te];
        if (!t.isValidElementType(H)) {
          var Z = O(H);
          return new g("Invalid " + j + " `" + ee + "` of type " + ("`" + Z + "` supplied to `" + Y + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return y(F);
    }
    function T(F) {
      function N(te, Y, j, ee, H) {
        if (!(te[Y] instanceof F)) {
          var Z = F.name || f, J = re(te[Y]);
          return new g("Invalid " + ee + " `" + H + "` of type " + ("`" + J + "` supplied to `" + j + "`, expected ") + ("instance of `" + Z + "`."));
        }
        return null;
      }
      return y(N);
    }
    function D(F) {
      if (!Array.isArray(F))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? o(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : o("Invalid argument supplied to oneOf, expected an array.")), s;
      function N(te, Y, j, ee, H) {
        for (var Z = te[Y], J = 0; J < F.length; J++)
          if (p(Z, F[J]))
            return null;
        var V = JSON.stringify(F, function(le, ue) {
          var ke = L(ue);
          return ke === "symbol" ? String(ue) : ue;
        });
        return new g("Invalid " + ee + " `" + H + "` of value `" + String(Z) + "` " + ("supplied to `" + j + "`, expected one of " + V + "."));
      }
      return y(N);
    }
    function P(F) {
      function N(te, Y, j, ee, H) {
        if (typeof F != "function")
          return new g("Property `" + H + "` of component `" + j + "` has invalid PropType notation inside objectOf.");
        var Z = te[Y], J = O(Z);
        if (J !== "object")
          return new g("Invalid " + ee + " `" + H + "` of type " + ("`" + J + "` supplied to `" + j + "`, expected an object."));
        for (var V in Z)
          if (r(Z, V)) {
            var K = F(Z, V, j, ee, H + "." + V, n);
            if (K instanceof Error)
              return K;
          }
        return null;
      }
      return y(N);
    }
    function S(F) {
      if (!Array.isArray(F))
        return process.env.NODE_ENV !== "production" && o("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var N = 0; N < F.length; N++) {
        var te = F[N];
        if (typeof te != "function")
          return o(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + W(te) + " at index " + N + "."
          ), s;
      }
      function Y(j, ee, H, Z, J) {
        for (var V = [], K = 0; K < F.length; K++) {
          var le = F[K], ue = le(j, ee, H, Z, J, n);
          if (ue == null)
            return null;
          ue.data && r(ue.data, "expectedType") && V.push(ue.data.expectedType);
        }
        var ke = V.length > 0 ? ", expected one of type [" + V.join(", ") + "]" : "";
        return new g("Invalid " + Z + " `" + J + "` supplied to " + ("`" + H + "`" + ke + "."));
      }
      return y(Y);
    }
    function z() {
      function F(N, te, Y, j, ee) {
        return _(N[te]) ? null : new g("Invalid " + j + " `" + ee + "` supplied to " + ("`" + Y + "`, expected a ReactNode."));
      }
      return y(F);
    }
    function k(F, N, te, Y, j) {
      return new g(
        (F || "React class") + ": " + N + " type `" + te + "." + Y + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + j + "`."
      );
    }
    function x(F) {
      function N(te, Y, j, ee, H) {
        var Z = te[Y], J = O(Z);
        if (J !== "object")
          return new g("Invalid " + ee + " `" + H + "` of type `" + J + "` " + ("supplied to `" + j + "`, expected `object`."));
        for (var V in F) {
          var K = F[V];
          if (typeof K != "function")
            return k(j, ee, H, V, L(K));
          var le = K(Z, V, j, ee, H + "." + V, n);
          if (le)
            return le;
        }
        return null;
      }
      return y(N);
    }
    function M(F) {
      function N(te, Y, j, ee, H) {
        var Z = te[Y], J = O(Z);
        if (J !== "object")
          return new g("Invalid " + ee + " `" + H + "` of type `" + J + "` " + ("supplied to `" + j + "`, expected `object`."));
        var V = e({}, te[Y], F);
        for (var K in V) {
          var le = F[K];
          if (r(F, K) && typeof le != "function")
            return k(j, ee, H, K, L(le));
          if (!le)
            return new g(
              "Invalid " + ee + " `" + H + "` key `" + K + "` supplied to `" + j + "`.\nBad object: " + JSON.stringify(te[Y], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(F), null, "  ")
            );
          var ue = le(Z, K, j, ee, H + "." + K, n);
          if (ue)
            return ue;
        }
        return null;
      }
      return y(N);
    }
    function _(F) {
      switch (typeof F) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !F;
        case "object":
          if (Array.isArray(F))
            return F.every(_);
          if (F === null || a(F))
            return !0;
          var N = d(F);
          if (N) {
            var te = N.call(F), Y;
            if (N !== F.entries) {
              for (; !(Y = te.next()).done; )
                if (!_(Y.value))
                  return !1;
            } else
              for (; !(Y = te.next()).done; ) {
                var j = Y.value;
                if (j && !_(j[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function E(F, N) {
      return F === "symbol" ? !0 : N ? N["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && N instanceof Symbol : !1;
    }
    function O(F) {
      var N = typeof F;
      return Array.isArray(F) ? "array" : F instanceof RegExp ? "object" : E(N, F) ? "symbol" : N;
    }
    function L(F) {
      if (typeof F > "u" || F === null)
        return "" + F;
      var N = O(F);
      if (N === "object") {
        if (F instanceof Date)
          return "date";
        if (F instanceof RegExp)
          return "regexp";
      }
      return N;
    }
    function W(F) {
      var N = L(F);
      switch (N) {
        case "array":
        case "object":
          return "an " + N;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + N;
        default:
          return N;
      }
    }
    function re(F) {
      return !F.constructor || !F.constructor.name ? f : F.constructor.name;
    }
    return h.checkPropTypes = i, h.resetWarningCache = i.resetWarningCache, h.PropTypes = h, h;
  }, fu;
}
var hu, rm;
function eT() {
  if (rm) return hu;
  rm = 1;
  var t = /* @__PURE__ */ mh();
  function e() {
  }
  function n() {
  }
  return n.resetWarningCache = e, hu = function() {
    function r(s, a, l, c, u, d) {
      if (d !== t) {
        var f = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw f.name = "Invariant Violation", f;
      }
    }
    r.isRequired = r;
    function i() {
      return r;
    }
    var o = {
      array: r,
      bigint: r,
      bool: r,
      func: r,
      number: r,
      object: r,
      string: r,
      symbol: r,
      any: r,
      arrayOf: i,
      element: r,
      elementType: r,
      instanceOf: i,
      node: r,
      objectOf: i,
      oneOf: i,
      oneOfType: i,
      shape: i,
      exact: i,
      checkPropTypes: n,
      resetWarningCache: e
    };
    return o.PropTypes = o, o;
  }, hu;
}
var im;
function tT() {
  if (im) return ka.exports;
  if (im = 1, process.env.NODE_ENV !== "production") {
    var t = jv(), e = !0;
    ka.exports = /* @__PURE__ */ QR()(t.isElement, e);
  } else
    ka.exports = /* @__PURE__ */ eT()();
  return ka.exports;
}
var om;
function nT() {
  return om || (om = 1, (function(t) {
    (function(e, n) {
      n(t, Pt, /* @__PURE__ */ tT());
    })(xa, function(e, n, r) {
      Object.defineProperty(e, "__esModule", {
        value: !0
      }), e.setHasSupportToCaptureOption = p;
      var i = s(n), o = s(r);
      function s(b) {
        return b && b.__esModule ? b : {
          default: b
        };
      }
      var a = Object.assign || function(b) {
        for (var C = 1; C < arguments.length; C++) {
          var I = arguments[C];
          for (var v in I)
            Object.prototype.hasOwnProperty.call(I, v) && (b[v] = I[v]);
        }
        return b;
      };
      function l(b, C) {
        var I = {};
        for (var v in b)
          C.indexOf(v) >= 0 || Object.prototype.hasOwnProperty.call(b, v) && (I[v] = b[v]);
        return I;
      }
      function c(b, C) {
        if (!(b instanceof C))
          throw new TypeError("Cannot call a class as a function");
      }
      var u = /* @__PURE__ */ (function() {
        function b(C, I) {
          for (var v = 0; v < I.length; v++) {
            var T = I[v];
            T.enumerable = T.enumerable || !1, T.configurable = !0, "value" in T && (T.writable = !0), Object.defineProperty(C, T.key, T);
          }
        }
        return function(C, I, v) {
          return I && b(C.prototype, I), v && b(C, v), C;
        };
      })();
      function d(b, C) {
        if (!b)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return C && (typeof C == "object" || typeof C == "function") ? C : b;
      }
      function f(b, C) {
        if (typeof C != "function" && C !== null)
          throw new TypeError("Super expression must either be null or a function, not " + typeof C);
        b.prototype = Object.create(C && C.prototype, {
          constructor: {
            value: b,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), C && (Object.setPrototypeOf ? Object.setPrototypeOf(b, C) : b.__proto__ = C);
      }
      var h = !1;
      function p(b) {
        h = b;
      }
      try {
        addEventListener("test", null, Object.defineProperty({}, "capture", { get: function() {
          p(!0);
        } }));
      } catch {
      }
      function g() {
        var b = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : { capture: !0 };
        return h ? b : b.capture;
      }
      function y(b) {
        if ("touches" in b) {
          var C = b.touches[0], I = C.pageX, v = C.pageY;
          return { x: I, y: v };
        }
        var T = b.screenX, D = b.screenY;
        return { x: T, y: D };
      }
      var m = (function(b) {
        f(C, b);
        function C() {
          var I;
          c(this, C);
          for (var v = arguments.length, T = Array(v), D = 0; D < v; D++)
            T[D] = arguments[D];
          var P = d(this, (I = C.__proto__ || Object.getPrototypeOf(C)).call.apply(I, [this].concat(T)));
          return P._handleSwipeStart = P._handleSwipeStart.bind(P), P._handleSwipeMove = P._handleSwipeMove.bind(P), P._handleSwipeEnd = P._handleSwipeEnd.bind(P), P._onMouseDown = P._onMouseDown.bind(P), P._onMouseMove = P._onMouseMove.bind(P), P._onMouseUp = P._onMouseUp.bind(P), P._setSwiperRef = P._setSwiperRef.bind(P), P;
        }
        return u(C, [{
          key: "componentDidMount",
          value: function() {
            this.swiper && this.swiper.addEventListener("touchmove", this._handleSwipeMove, g({
              capture: !0,
              passive: !1
            }));
          }
        }, {
          key: "componentWillUnmount",
          value: function() {
            this.swiper && this.swiper.removeEventListener("touchmove", this._handleSwipeMove, g({
              capture: !0,
              passive: !1
            }));
          }
        }, {
          key: "_onMouseDown",
          value: function(v) {
            this.props.allowMouseEvents && (this.mouseDown = !0, document.addEventListener("mouseup", this._onMouseUp), document.addEventListener("mousemove", this._onMouseMove), this._handleSwipeStart(v));
          }
        }, {
          key: "_onMouseMove",
          value: function(v) {
            this.mouseDown && this._handleSwipeMove(v);
          }
        }, {
          key: "_onMouseUp",
          value: function(v) {
            this.mouseDown = !1, document.removeEventListener("mouseup", this._onMouseUp), document.removeEventListener("mousemove", this._onMouseMove), this._handleSwipeEnd(v);
          }
        }, {
          key: "_handleSwipeStart",
          value: function(v) {
            var T = y(v), D = T.x, P = T.y;
            this.moveStart = { x: D, y: P }, this.props.onSwipeStart(v);
          }
        }, {
          key: "_handleSwipeMove",
          value: function(v) {
            if (this.moveStart) {
              var T = y(v), D = T.x, P = T.y, S = D - this.moveStart.x, z = P - this.moveStart.y;
              this.moving = !0;
              var k = this.props.onSwipeMove({
                x: S,
                y: z
              }, v);
              k && v.cancelable && v.preventDefault(), this.movePosition = { deltaX: S, deltaY: z };
            }
          }
        }, {
          key: "_handleSwipeEnd",
          value: function(v) {
            this.props.onSwipeEnd(v);
            var T = this.props.tolerance;
            this.moving && this.movePosition && (this.movePosition.deltaX < -T ? this.props.onSwipeLeft(1, v) : this.movePosition.deltaX > T && this.props.onSwipeRight(1, v), this.movePosition.deltaY < -T ? this.props.onSwipeUp(1, v) : this.movePosition.deltaY > T && this.props.onSwipeDown(1, v)), this.moveStart = null, this.moving = !1, this.movePosition = null;
          }
        }, {
          key: "_setSwiperRef",
          value: function(v) {
            this.swiper = v, this.props.innerRef(v);
          }
        }, {
          key: "render",
          value: function() {
            var v = this.props;
            v.tagName;
            var T = v.className, D = v.style, P = v.children;
            v.allowMouseEvents, v.onSwipeUp, v.onSwipeDown, v.onSwipeLeft, v.onSwipeRight, v.onSwipeStart, v.onSwipeMove, v.onSwipeEnd, v.innerRef, v.tolerance;
            var S = l(v, ["tagName", "className", "style", "children", "allowMouseEvents", "onSwipeUp", "onSwipeDown", "onSwipeLeft", "onSwipeRight", "onSwipeStart", "onSwipeMove", "onSwipeEnd", "innerRef", "tolerance"]);
            return i.default.createElement(
              this.props.tagName,
              a({
                ref: this._setSwiperRef,
                onMouseDown: this._onMouseDown,
                onTouchStart: this._handleSwipeStart,
                onTouchEnd: this._handleSwipeEnd,
                className: T,
                style: D
              }, S),
              P
            );
          }
        }]), C;
      })(n.Component);
      m.displayName = "ReactSwipe", m.propTypes = {
        tagName: o.default.string,
        className: o.default.string,
        style: o.default.object,
        children: o.default.node,
        allowMouseEvents: o.default.bool,
        onSwipeUp: o.default.func,
        onSwipeDown: o.default.func,
        onSwipeLeft: o.default.func,
        onSwipeRight: o.default.func,
        onSwipeStart: o.default.func,
        onSwipeMove: o.default.func,
        onSwipeEnd: o.default.func,
        innerRef: o.default.func,
        tolerance: o.default.number.isRequired
      }, m.defaultProps = {
        tagName: "div",
        allowMouseEvents: !1,
        onSwipeUp: function() {
        },
        onSwipeDown: function() {
        },
        onSwipeLeft: function() {
        },
        onSwipeRight: function() {
        },
        onSwipeStart: function() {
        },
        onSwipeMove: function() {
        },
        onSwipeEnd: function() {
        },
        innerRef: function() {
        },
        tolerance: 0
      }, e.default = m;
    });
  })(xa)), xa;
}
var sm;
function Uv() {
  return sm || (sm = 1, (function(t) {
    (function(e, n) {
      n(t, nT());
    })(wa, function(e, n) {
      Object.defineProperty(e, "__esModule", {
        value: !0
      });
      var r = i(n);
      function i(o) {
        return o && o.__esModule ? o : {
          default: o
        };
      }
      e.default = r.default;
    });
  })(wa)), wa;
}
var es = {}, pu = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
var am;
function rT() {
  return am || (am = 1, (function(t) {
    (function() {
      var e = {}.hasOwnProperty;
      function n() {
        for (var o = "", s = 0; s < arguments.length; s++) {
          var a = arguments[s];
          a && (o = i(o, r(a)));
        }
        return o;
      }
      function r(o) {
        if (typeof o == "string" || typeof o == "number")
          return o;
        if (typeof o != "object")
          return "";
        if (Array.isArray(o))
          return n.apply(null, o);
        if (o.toString !== Object.prototype.toString && !o.toString.toString().includes("[native code]"))
          return o.toString();
        var s = "";
        for (var a in o)
          e.call(o, a) && o[a] && (s = i(s, a));
        return s;
      }
      function i(o, s) {
        return s ? o ? o + " " + s : o + s : o;
      }
      t.exports ? (n.default = n, t.exports = n) : window.classNames = n;
    })();
  })(pu)), pu.exports;
}
var lm;
function Gv() {
  if (lm) return es;
  lm = 1, Object.defineProperty(es, "__esModule", {
    value: !0
  }), es.default = void 0;
  var t = e(rT());
  function e(i) {
    return i && i.__esModule ? i : { default: i };
  }
  function n(i, o, s) {
    return o in i ? Object.defineProperty(i, o, { value: s, enumerable: !0, configurable: !0, writable: !0 }) : i[o] = s, i;
  }
  var r = {
    ROOT: function(o) {
      return (0, t.default)(n({
        "carousel-root": !0
      }, o || "", !!o));
    },
    CAROUSEL: function(o) {
      return (0, t.default)({
        carousel: !0,
        "carousel-slider": o
      });
    },
    WRAPPER: function(o, s) {
      return (0, t.default)({
        "thumbs-wrapper": !o,
        "slider-wrapper": o,
        "axis-horizontal": s === "horizontal",
        "axis-vertical": s !== "horizontal"
      });
    },
    SLIDER: function(o, s) {
      return (0, t.default)({
        thumbs: !o,
        slider: o,
        animated: !s
      });
    },
    ITEM: function(o, s, a) {
      return (0, t.default)({
        thumb: !o,
        slide: o,
        selected: s,
        previous: a
      });
    },
    ARROW_PREV: function(o) {
      return (0, t.default)({
        "control-arrow control-prev": !0,
        "control-disabled": o
      });
    },
    ARROW_NEXT: function(o) {
      return (0, t.default)({
        "control-arrow control-next": !0,
        "control-disabled": o
      });
    },
    DOT: function(o) {
      return (0, t.default)({
        dot: !0,
        selected: o
      });
    }
  };
  return es.default = r, es;
}
var ts = {}, ns = {}, cm;
function iT() {
  if (cm) return ns;
  cm = 1, Object.defineProperty(ns, "__esModule", {
    value: !0
  }), ns.outerWidth = void 0;
  var t = function(n) {
    var r = n.offsetWidth, i = getComputedStyle(n);
    return r += parseInt(i.marginLeft) + parseInt(i.marginRight), r;
  };
  return ns.outerWidth = t, ns;
}
var rs = {}, um;
function yh() {
  if (um) return rs;
  um = 1, Object.defineProperty(rs, "__esModule", {
    value: !0
  }), rs.default = void 0;
  var t = function(n, r, i) {
    var o = n === 0 ? n : n + r, s = i === "horizontal" ? [o, 0, 0] : [0, o, 0], a = "translate3d", l = "(" + s.join(",") + ")";
    return a + l;
  };
  return rs.default = t, rs;
}
var is = {}, dm;
function Yv() {
  if (dm) return is;
  dm = 1, Object.defineProperty(is, "__esModule", {
    value: !0
  }), is.default = void 0;
  var t = function() {
    return window;
  };
  return is.default = t, is;
}
var fm;
function Xv() {
  if (fm) return ts;
  fm = 1, Object.defineProperty(ts, "__esModule", {
    value: !0
  }), ts.default = void 0;
  var t = l(Pt), e = s(Gv()), n = iT(), r = s(yh()), i = s(Uv()), o = s(Yv());
  function s(P) {
    return P && P.__esModule ? P : { default: P };
  }
  function a() {
    if (typeof WeakMap != "function") return null;
    var P = /* @__PURE__ */ new WeakMap();
    return a = function() {
      return P;
    }, P;
  }
  function l(P) {
    if (P && P.__esModule)
      return P;
    if (P === null || c(P) !== "object" && typeof P != "function")
      return { default: P };
    var S = a();
    if (S && S.has(P))
      return S.get(P);
    var z = {}, k = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var x in P)
      if (Object.prototype.hasOwnProperty.call(P, x)) {
        var M = k ? Object.getOwnPropertyDescriptor(P, x) : null;
        M && (M.get || M.set) ? Object.defineProperty(z, x, M) : z[x] = P[x];
      }
    return z.default = P, S && S.set(P, z), z;
  }
  function c(P) {
    "@babel/helpers - typeof";
    return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? c = function(z) {
      return typeof z;
    } : c = function(z) {
      return z && typeof Symbol == "function" && z.constructor === Symbol && z !== Symbol.prototype ? "symbol" : typeof z;
    }, c(P);
  }
  function u() {
    return u = Object.assign || function(P) {
      for (var S = 1; S < arguments.length; S++) {
        var z = arguments[S];
        for (var k in z)
          Object.prototype.hasOwnProperty.call(z, k) && (P[k] = z[k]);
      }
      return P;
    }, u.apply(this, arguments);
  }
  function d(P, S) {
    if (!(P instanceof S))
      throw new TypeError("Cannot call a class as a function");
  }
  function f(P, S) {
    for (var z = 0; z < S.length; z++) {
      var k = S[z];
      k.enumerable = k.enumerable || !1, k.configurable = !0, "value" in k && (k.writable = !0), Object.defineProperty(P, k.key, k);
    }
  }
  function h(P, S, z) {
    return S && f(P.prototype, S), P;
  }
  function p(P, S) {
    if (typeof S != "function" && S !== null)
      throw new TypeError("Super expression must either be null or a function");
    P.prototype = Object.create(S && S.prototype, { constructor: { value: P, writable: !0, configurable: !0 } }), S && g(P, S);
  }
  function g(P, S) {
    return g = Object.setPrototypeOf || function(k, x) {
      return k.__proto__ = x, k;
    }, g(P, S);
  }
  function y(P) {
    var S = C();
    return function() {
      var k = I(P), x;
      if (S) {
        var M = I(this).constructor;
        x = Reflect.construct(k, arguments, M);
      } else
        x = k.apply(this, arguments);
      return m(this, x);
    };
  }
  function m(P, S) {
    return S && (c(S) === "object" || typeof S == "function") ? S : b(P);
  }
  function b(P) {
    if (P === void 0)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return P;
  }
  function C() {
    if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
    if (typeof Proxy == "function") return !0;
    try {
      return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
      })), !0;
    } catch {
      return !1;
    }
  }
  function I(P) {
    return I = Object.setPrototypeOf ? Object.getPrototypeOf : function(z) {
      return z.__proto__ || Object.getPrototypeOf(z);
    }, I(P);
  }
  function v(P, S, z) {
    return S in P ? Object.defineProperty(P, S, { value: z, enumerable: !0, configurable: !0, writable: !0 }) : P[S] = z, P;
  }
  var T = function(S) {
    return S.hasOwnProperty("key");
  }, D = /* @__PURE__ */ (function(P) {
    p(z, P);
    var S = y(z);
    function z(k) {
      var x;
      return d(this, z), x = S.call(this, k), v(b(x), "itemsWrapperRef", void 0), v(b(x), "itemsListRef", void 0), v(b(x), "thumbsRef", void 0), v(b(x), "setItemsWrapperRef", function(M) {
        x.itemsWrapperRef = M;
      }), v(b(x), "setItemsListRef", function(M) {
        x.itemsListRef = M;
      }), v(b(x), "setThumbsRef", function(M, _) {
        x.thumbsRef || (x.thumbsRef = []), x.thumbsRef[_] = M;
      }), v(b(x), "updateSizes", function() {
        if (!(!x.props.children || !x.itemsWrapperRef || !x.thumbsRef)) {
          var M = t.Children.count(x.props.children), _ = x.itemsWrapperRef.clientWidth, E = x.props.thumbWidth ? x.props.thumbWidth : (0, n.outerWidth)(x.thumbsRef[0]), O = Math.floor(_ / E), L = O < M, W = L ? M - O : 0;
          x.setState(function(re, F) {
            return {
              itemSize: E,
              visibleItems: O,
              firstItem: L ? x.getFirstItem(F.selectedItem) : 0,
              lastPosition: W,
              showArrows: L
            };
          });
        }
      }), v(b(x), "handleClickItem", function(M, _, E) {
        if (!T(E) || E.key === "Enter") {
          var O = x.props.onSelectItem;
          typeof O == "function" && O(M, _);
        }
      }), v(b(x), "onSwipeStart", function() {
        x.setState({
          swiping: !0
        });
      }), v(b(x), "onSwipeEnd", function() {
        x.setState({
          swiping: !1
        });
      }), v(b(x), "onSwipeMove", function(M) {
        var _ = M.x;
        if (!x.state.itemSize || !x.itemsWrapperRef || !x.state.visibleItems)
          return !1;
        var E = 0, O = t.Children.count(x.props.children), L = -(x.state.firstItem * 100) / x.state.visibleItems, W = Math.max(O - x.state.visibleItems, 0), re = -W * 100 / x.state.visibleItems;
        L === E && _ > 0 && (_ = 0), L === re && _ < 0 && (_ = 0);
        var F = x.itemsWrapperRef.clientWidth, N = L + 100 / (F / _);
        return x.itemsListRef && ["WebkitTransform", "MozTransform", "MsTransform", "OTransform", "transform", "msTransform"].forEach(function(te) {
          x.itemsListRef.style[te] = (0, r.default)(N, "%", x.props.axis);
        }), !0;
      }), v(b(x), "slideRight", function(M) {
        x.moveTo(x.state.firstItem - (typeof M == "number" ? M : 1));
      }), v(b(x), "slideLeft", function(M) {
        x.moveTo(x.state.firstItem + (typeof M == "number" ? M : 1));
      }), v(b(x), "moveTo", function(M) {
        M = M < 0 ? 0 : M, M = M >= x.state.lastPosition ? x.state.lastPosition : M, x.setState({
          firstItem: M
        });
      }), x.state = {
        selectedItem: k.selectedItem,
        swiping: !1,
        showArrows: !1,
        firstItem: 0,
        visibleItems: 0,
        lastPosition: 0
      }, x;
    }
    return h(z, [{
      key: "componentDidMount",
      value: function() {
        this.setupThumbs();
      }
    }, {
      key: "componentDidUpdate",
      value: function(x) {
        this.props.selectedItem !== this.state.selectedItem && this.setState({
          selectedItem: this.props.selectedItem,
          firstItem: this.getFirstItem(this.props.selectedItem)
        }), this.props.children !== x.children && this.updateSizes();
      }
    }, {
      key: "componentWillUnmount",
      value: function() {
        this.destroyThumbs();
      }
    }, {
      key: "setupThumbs",
      value: function() {
        (0, o.default)().addEventListener("resize", this.updateSizes), (0, o.default)().addEventListener("DOMContentLoaded", this.updateSizes), this.updateSizes();
      }
    }, {
      key: "destroyThumbs",
      value: function() {
        (0, o.default)().removeEventListener("resize", this.updateSizes), (0, o.default)().removeEventListener("DOMContentLoaded", this.updateSizes);
      }
    }, {
      key: "getFirstItem",
      value: function(x) {
        var M = x;
        return x >= this.state.lastPosition && (M = this.state.lastPosition), x < this.state.firstItem + this.state.visibleItems && (M = this.state.firstItem), x < this.state.firstItem && (M = x), M;
      }
    }, {
      key: "renderItems",
      value: function() {
        var x = this;
        return this.props.children.map(function(M, _) {
          var E = e.default.ITEM(!1, _ === x.state.selectedItem), O = {
            key: _,
            ref: function(W) {
              return x.setThumbsRef(W, _);
            },
            className: E,
            onClick: x.handleClickItem.bind(x, _, x.props.children[_]),
            onKeyDown: x.handleClickItem.bind(x, _, x.props.children[_]),
            "aria-label": "".concat(x.props.labels.item, " ").concat(_ + 1),
            style: {
              width: x.props.thumbWidth
            }
          };
          return /* @__PURE__ */ t.default.createElement("li", u({}, O, {
            role: "button",
            tabIndex: 0
          }), M);
        });
      }
    }, {
      key: "render",
      value: function() {
        var x = this;
        if (!this.props.children)
          return null;
        var M = t.Children.count(this.props.children) > 1, _ = this.state.showArrows && this.state.firstItem > 0, E = this.state.showArrows && this.state.firstItem < this.state.lastPosition, O = {}, L = -this.state.firstItem * (this.state.itemSize || 0), W = (0, r.default)(L, "px", this.props.axis), re = this.props.transitionTime + "ms";
        return O = {
          WebkitTransform: W,
          MozTransform: W,
          MsTransform: W,
          OTransform: W,
          transform: W,
          msTransform: W,
          WebkitTransitionDuration: re,
          MozTransitionDuration: re,
          MsTransitionDuration: re,
          OTransitionDuration: re,
          transitionDuration: re,
          msTransitionDuration: re
        }, /* @__PURE__ */ t.default.createElement("div", {
          className: e.default.CAROUSEL(!1)
        }, /* @__PURE__ */ t.default.createElement("div", {
          className: e.default.WRAPPER(!1),
          ref: this.setItemsWrapperRef
        }, /* @__PURE__ */ t.default.createElement("button", {
          type: "button",
          className: e.default.ARROW_PREV(!_),
          onClick: function() {
            return x.slideRight();
          },
          "aria-label": this.props.labels.leftArrow
        }), M ? /* @__PURE__ */ t.default.createElement(i.default, {
          tagName: "ul",
          className: e.default.SLIDER(!1, this.state.swiping),
          onSwipeLeft: this.slideLeft,
          onSwipeRight: this.slideRight,
          onSwipeMove: this.onSwipeMove,
          onSwipeStart: this.onSwipeStart,
          onSwipeEnd: this.onSwipeEnd,
          style: O,
          innerRef: this.setItemsListRef,
          allowMouseEvents: this.props.emulateTouch
        }, this.renderItems()) : /* @__PURE__ */ t.default.createElement("ul", {
          className: e.default.SLIDER(!1, this.state.swiping),
          ref: function(N) {
            return x.setItemsListRef(N);
          },
          style: O
        }, this.renderItems()), /* @__PURE__ */ t.default.createElement("button", {
          type: "button",
          className: e.default.ARROW_NEXT(!E),
          onClick: function() {
            return x.slideLeft();
          },
          "aria-label": this.props.labels.rightArrow
        })));
      }
    }]), z;
  })(t.Component);
  return ts.default = D, v(D, "displayName", "Thumbs"), v(D, "defaultProps", {
    axis: "horizontal",
    labels: {
      leftArrow: "previous slide / item",
      rightArrow: "next slide / item",
      item: "slide item"
    },
    selectedItem: 0,
    thumbWidth: 80,
    transitionTime: 350
  }), ts;
}
var ss = {}, hm;
function oT() {
  if (hm) return ss;
  hm = 1, Object.defineProperty(ss, "__esModule", {
    value: !0
  }), ss.default = void 0;
  var t = function() {
    return document;
  };
  return ss.default = t, ss;
}
var gr = {}, pm;
function Vv() {
  if (pm) return gr;
  pm = 1, Object.defineProperty(gr, "__esModule", {
    value: !0
  }), gr.setPosition = gr.getPosition = gr.isKeyboardEvent = gr.defaultStatusFormatter = gr.noop = void 0;
  var t = Pt, e = n(yh());
  function n(l) {
    return l && l.__esModule ? l : { default: l };
  }
  var r = function() {
  };
  gr.noop = r;
  var i = function(c, u) {
    return "".concat(c, " of ").concat(u);
  };
  gr.defaultStatusFormatter = i;
  var o = function(c) {
    return c ? c.hasOwnProperty("key") : !1;
  };
  gr.isKeyboardEvent = o;
  var s = function(c, u) {
    if (u.infiniteLoop && ++c, c === 0)
      return 0;
    var d = t.Children.count(u.children);
    if (u.centerMode && u.axis === "horizontal") {
      var f = -c * u.centerSlidePercentage, h = d - 1;
      return c && (c !== h || u.infiniteLoop) ? f += (100 - u.centerSlidePercentage) / 2 : c === h && (f += 100 - u.centerSlidePercentage), f;
    }
    return -c * 100;
  };
  gr.getPosition = s;
  var a = function(c, u) {
    var d = {};
    return ["WebkitTransform", "MozTransform", "MsTransform", "OTransform", "transform", "msTransform"].forEach(function(f) {
      d[f] = (0, e.default)(c, "%", u);
    }), d;
  };
  return gr.setPosition = a, gr;
}
var $r = {}, gm;
function sT() {
  if (gm) return $r;
  gm = 1, Object.defineProperty($r, "__esModule", {
    value: !0
  }), $r.fadeAnimationHandler = $r.slideStopSwipingHandler = $r.slideSwipeAnimationHandler = $r.slideAnimationHandler = void 0;
  var t = Pt, e = r(yh()), n = Vv();
  function r(d) {
    return d && d.__esModule ? d : { default: d };
  }
  function i(d, f) {
    var h = Object.keys(d);
    if (Object.getOwnPropertySymbols) {
      var p = Object.getOwnPropertySymbols(d);
      f && (p = p.filter(function(g) {
        return Object.getOwnPropertyDescriptor(d, g).enumerable;
      })), h.push.apply(h, p);
    }
    return h;
  }
  function o(d) {
    for (var f = 1; f < arguments.length; f++) {
      var h = arguments[f] != null ? arguments[f] : {};
      f % 2 ? i(Object(h), !0).forEach(function(p) {
        s(d, p, h[p]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(d, Object.getOwnPropertyDescriptors(h)) : i(Object(h)).forEach(function(p) {
        Object.defineProperty(d, p, Object.getOwnPropertyDescriptor(h, p));
      });
    }
    return d;
  }
  function s(d, f, h) {
    return f in d ? Object.defineProperty(d, f, { value: h, enumerable: !0, configurable: !0, writable: !0 }) : d[f] = h, d;
  }
  var a = function(f, h) {
    var p = {}, g = h.selectedItem, y = g, m = t.Children.count(f.children) - 1, b = f.infiniteLoop && (g < 0 || g > m);
    if (b)
      return y < 0 ? f.centerMode && f.centerSlidePercentage && f.axis === "horizontal" ? p.itemListStyle = (0, n.setPosition)(-(m + 2) * f.centerSlidePercentage - (100 - f.centerSlidePercentage) / 2, f.axis) : p.itemListStyle = (0, n.setPosition)(-(m + 2) * 100, f.axis) : y > m && (p.itemListStyle = (0, n.setPosition)(0, f.axis)), p;
    var C = (0, n.getPosition)(g, f), I = (0, e.default)(C, "%", f.axis), v = f.transitionTime + "ms";
    return p.itemListStyle = {
      WebkitTransform: I,
      msTransform: I,
      OTransform: I,
      transform: I
    }, h.swiping || (p.itemListStyle = o(o({}, p.itemListStyle), {}, {
      WebkitTransitionDuration: v,
      MozTransitionDuration: v,
      OTransitionDuration: v,
      transitionDuration: v,
      msTransitionDuration: v
    })), p;
  };
  $r.slideAnimationHandler = a;
  var l = function(f, h, p, g) {
    var y = {}, m = h.axis === "horizontal", b = t.Children.count(h.children), C = 0, I = (0, n.getPosition)(p.selectedItem, h), v = h.infiniteLoop ? (0, n.getPosition)(b - 1, h) - 100 : (0, n.getPosition)(b - 1, h), T = m ? f.x : f.y, D = T;
    I === C && T > 0 && (D = 0), I === v && T < 0 && (D = 0);
    var P = I + 100 / (p.itemSize / D), S = Math.abs(T) > h.swipeScrollTolerance;
    return h.infiniteLoop && S && (p.selectedItem === 0 && P > -100 ? P -= b * 100 : p.selectedItem === b - 1 && P < -b * 100 && (P += b * 100)), (!h.preventMovementUntilSwipeScrollTolerance || S || p.swipeMovementStarted) && (p.swipeMovementStarted || g({
      swipeMovementStarted: !0
    }), y.itemListStyle = (0, n.setPosition)(P, h.axis)), S && !p.cancelClick && g({
      cancelClick: !0
    }), y;
  };
  $r.slideSwipeAnimationHandler = l;
  var c = function(f, h) {
    var p = (0, n.getPosition)(h.selectedItem, f), g = (0, n.setPosition)(p, f.axis);
    return {
      itemListStyle: g
    };
  };
  $r.slideStopSwipingHandler = c;
  var u = function(f, h) {
    var p = f.transitionTime + "ms", g = "ease-in-out", y = {
      position: "absolute",
      display: "block",
      zIndex: -2,
      minHeight: "100%",
      opacity: 0,
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      transitionTimingFunction: g,
      msTransitionTimingFunction: g,
      MozTransitionTimingFunction: g,
      WebkitTransitionTimingFunction: g,
      OTransitionTimingFunction: g
    };
    return h.swiping || (y = o(o({}, y), {}, {
      WebkitTransitionDuration: p,
      MozTransitionDuration: p,
      OTransitionDuration: p,
      transitionDuration: p,
      msTransitionDuration: p
    })), {
      slideStyle: y,
      selectedStyle: o(o({}, y), {}, {
        opacity: 1,
        position: "relative"
      }),
      prevStyle: o({}, y)
    };
  };
  return $r.fadeAnimationHandler = u, $r;
}
var mm;
function aT() {
  if (mm) return Qo;
  mm = 1, Object.defineProperty(Qo, "__esModule", {
    value: !0
  }), Qo.default = void 0;
  var t = u(Pt), e = l(Uv()), n = l(Gv()), r = l(Xv()), i = l(oT()), o = l(Yv()), s = Vv(), a = sT();
  function l(k) {
    return k && k.__esModule ? k : { default: k };
  }
  function c() {
    if (typeof WeakMap != "function") return null;
    var k = /* @__PURE__ */ new WeakMap();
    return c = function() {
      return k;
    }, k;
  }
  function u(k) {
    if (k && k.__esModule)
      return k;
    if (k === null || d(k) !== "object" && typeof k != "function")
      return { default: k };
    var x = c();
    if (x && x.has(k))
      return x.get(k);
    var M = {}, _ = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var E in k)
      if (Object.prototype.hasOwnProperty.call(k, E)) {
        var O = _ ? Object.getOwnPropertyDescriptor(k, E) : null;
        O && (O.get || O.set) ? Object.defineProperty(M, E, O) : M[E] = k[E];
      }
    return M.default = k, x && x.set(k, M), M;
  }
  function d(k) {
    "@babel/helpers - typeof";
    return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? d = function(M) {
      return typeof M;
    } : d = function(M) {
      return M && typeof Symbol == "function" && M.constructor === Symbol && M !== Symbol.prototype ? "symbol" : typeof M;
    }, d(k);
  }
  function f() {
    return f = Object.assign || function(k) {
      for (var x = 1; x < arguments.length; x++) {
        var M = arguments[x];
        for (var _ in M)
          Object.prototype.hasOwnProperty.call(M, _) && (k[_] = M[_]);
      }
      return k;
    }, f.apply(this, arguments);
  }
  function h(k, x) {
    var M = Object.keys(k);
    if (Object.getOwnPropertySymbols) {
      var _ = Object.getOwnPropertySymbols(k);
      x && (_ = _.filter(function(E) {
        return Object.getOwnPropertyDescriptor(k, E).enumerable;
      })), M.push.apply(M, _);
    }
    return M;
  }
  function p(k) {
    for (var x = 1; x < arguments.length; x++) {
      var M = arguments[x] != null ? arguments[x] : {};
      x % 2 ? h(Object(M), !0).forEach(function(_) {
        S(k, _, M[_]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(k, Object.getOwnPropertyDescriptors(M)) : h(Object(M)).forEach(function(_) {
        Object.defineProperty(k, _, Object.getOwnPropertyDescriptor(M, _));
      });
    }
    return k;
  }
  function g(k, x) {
    if (!(k instanceof x))
      throw new TypeError("Cannot call a class as a function");
  }
  function y(k, x) {
    for (var M = 0; M < x.length; M++) {
      var _ = x[M];
      _.enumerable = _.enumerable || !1, _.configurable = !0, "value" in _ && (_.writable = !0), Object.defineProperty(k, _.key, _);
    }
  }
  function m(k, x, M) {
    return x && y(k.prototype, x), k;
  }
  function b(k, x) {
    if (typeof x != "function" && x !== null)
      throw new TypeError("Super expression must either be null or a function");
    k.prototype = Object.create(x && x.prototype, { constructor: { value: k, writable: !0, configurable: !0 } }), x && C(k, x);
  }
  function C(k, x) {
    return C = Object.setPrototypeOf || function(_, E) {
      return _.__proto__ = E, _;
    }, C(k, x);
  }
  function I(k) {
    var x = D();
    return function() {
      var _ = P(k), E;
      if (x) {
        var O = P(this).constructor;
        E = Reflect.construct(_, arguments, O);
      } else
        E = _.apply(this, arguments);
      return v(this, E);
    };
  }
  function v(k, x) {
    return x && (d(x) === "object" || typeof x == "function") ? x : T(k);
  }
  function T(k) {
    if (k === void 0)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return k;
  }
  function D() {
    if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
    if (typeof Proxy == "function") return !0;
    try {
      return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
      })), !0;
    } catch {
      return !1;
    }
  }
  function P(k) {
    return P = Object.setPrototypeOf ? Object.getPrototypeOf : function(M) {
      return M.__proto__ || Object.getPrototypeOf(M);
    }, P(k);
  }
  function S(k, x, M) {
    return x in k ? Object.defineProperty(k, x, { value: M, enumerable: !0, configurable: !0, writable: !0 }) : k[x] = M, k;
  }
  var z = /* @__PURE__ */ (function(k) {
    b(M, k);
    var x = I(M);
    function M(_) {
      var E;
      g(this, M), E = x.call(this, _), S(T(E), "thumbsRef", void 0), S(T(E), "carouselWrapperRef", void 0), S(T(E), "listRef", void 0), S(T(E), "itemsRef", void 0), S(T(E), "timer", void 0), S(T(E), "animationHandler", void 0), S(T(E), "setThumbsRef", function(L) {
        E.thumbsRef = L;
      }), S(T(E), "setCarouselWrapperRef", function(L) {
        E.carouselWrapperRef = L;
      }), S(T(E), "setListRef", function(L) {
        E.listRef = L;
      }), S(T(E), "setItemsRef", function(L, W) {
        E.itemsRef || (E.itemsRef = []), E.itemsRef[W] = L;
      }), S(T(E), "autoPlay", function() {
        t.Children.count(E.props.children) <= 1 || (E.clearAutoPlay(), E.props.autoPlay && (E.timer = setTimeout(function() {
          E.increment();
        }, E.props.interval)));
      }), S(T(E), "clearAutoPlay", function() {
        E.timer && clearTimeout(E.timer);
      }), S(T(E), "resetAutoPlay", function() {
        E.clearAutoPlay(), E.autoPlay();
      }), S(T(E), "stopOnHover", function() {
        E.setState({
          isMouseEntered: !0
        }, E.clearAutoPlay);
      }), S(T(E), "startOnLeave", function() {
        E.setState({
          isMouseEntered: !1
        }, E.autoPlay);
      }), S(T(E), "isFocusWithinTheCarousel", function() {
        return E.carouselWrapperRef ? !!((0, i.default)().activeElement === E.carouselWrapperRef || E.carouselWrapperRef.contains((0, i.default)().activeElement)) : !1;
      }), S(T(E), "navigateWithKeyboard", function(L) {
        if (E.isFocusWithinTheCarousel()) {
          var W = E.props.axis, re = W === "horizontal", F = {
            ArrowUp: 38,
            ArrowRight: 39,
            ArrowDown: 40,
            ArrowLeft: 37
          }, N = re ? F.ArrowRight : F.ArrowDown, te = re ? F.ArrowLeft : F.ArrowUp;
          N === L.keyCode ? E.increment() : te === L.keyCode && E.decrement();
        }
      }), S(T(E), "updateSizes", function() {
        if (!(!E.state.initialized || !E.itemsRef || E.itemsRef.length === 0)) {
          var L = E.props.axis === "horizontal", W = E.itemsRef[0];
          if (W) {
            var re = L ? W.clientWidth : W.clientHeight;
            E.setState({
              itemSize: re
            }), E.thumbsRef && E.thumbsRef.updateSizes();
          }
        }
      }), S(T(E), "setMountState", function() {
        E.setState({
          hasMount: !0
        }), E.updateSizes();
      }), S(T(E), "handleClickItem", function(L, W) {
        if (t.Children.count(E.props.children) !== 0) {
          if (E.state.cancelClick) {
            E.setState({
              cancelClick: !1
            });
            return;
          }
          E.props.onClickItem(L, W), L !== E.state.selectedItem && E.setState({
            selectedItem: L
          });
        }
      }), S(T(E), "handleOnChange", function(L, W) {
        t.Children.count(E.props.children) <= 1 || E.props.onChange(L, W);
      }), S(T(E), "handleClickThumb", function(L, W) {
        E.props.onClickThumb(L, W), E.moveTo(L);
      }), S(T(E), "onSwipeStart", function(L) {
        E.setState({
          swiping: !0
        }), E.props.onSwipeStart(L);
      }), S(T(E), "onSwipeEnd", function(L) {
        E.setState({
          swiping: !1,
          cancelClick: !1,
          swipeMovementStarted: !1
        }), E.props.onSwipeEnd(L), E.clearAutoPlay(), E.state.autoPlay && E.autoPlay();
      }), S(T(E), "onSwipeMove", function(L, W) {
        E.props.onSwipeMove(W);
        var re = E.props.swipeAnimationHandler(L, E.props, E.state, E.setState.bind(T(E)));
        return E.setState(p({}, re)), !!Object.keys(re).length;
      }), S(T(E), "decrement", function() {
        var L = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
        E.moveTo(E.state.selectedItem - (typeof L == "number" ? L : 1));
      }), S(T(E), "increment", function() {
        var L = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
        E.moveTo(E.state.selectedItem + (typeof L == "number" ? L : 1));
      }), S(T(E), "moveTo", function(L) {
        if (typeof L == "number") {
          var W = t.Children.count(E.props.children) - 1;
          L < 0 && (L = E.props.infiniteLoop ? W : 0), L > W && (L = E.props.infiniteLoop ? 0 : W), E.selectItem({
            // if it's not a slider, we don't need to set position here
            selectedItem: L
          }), E.state.autoPlay && E.state.isMouseEntered === !1 && E.resetAutoPlay();
        }
      }), S(T(E), "onClickNext", function() {
        E.increment(1);
      }), S(T(E), "onClickPrev", function() {
        E.decrement(1);
      }), S(T(E), "onSwipeForward", function() {
        E.increment(1), E.props.emulateTouch && E.setState({
          cancelClick: !0
        });
      }), S(T(E), "onSwipeBackwards", function() {
        E.decrement(1), E.props.emulateTouch && E.setState({
          cancelClick: !0
        });
      }), S(T(E), "changeItem", function(L) {
        return function(W) {
          (!(0, s.isKeyboardEvent)(W) || W.key === "Enter") && E.moveTo(L);
        };
      }), S(T(E), "selectItem", function(L) {
        E.setState(p({
          previousItem: E.state.selectedItem
        }, L), function() {
          E.setState(E.animationHandler(E.props, E.state));
        }), E.handleOnChange(L.selectedItem, t.Children.toArray(E.props.children)[L.selectedItem]);
      }), S(T(E), "getInitialImage", function() {
        var L = E.props.selectedItem, W = E.itemsRef && E.itemsRef[L], re = W && W.getElementsByTagName("img") || [];
        return re[0];
      }), S(T(E), "getVariableItemHeight", function(L) {
        var W = E.itemsRef && E.itemsRef[L];
        if (E.state.hasMount && W && W.children.length) {
          var re = W.children[0].getElementsByTagName("img") || [];
          if (re.length > 0) {
            var F = re[0];
            if (!F.complete) {
              var N = function j() {
                E.forceUpdate(), F.removeEventListener("load", j);
              };
              F.addEventListener("load", N);
            }
          }
          var te = re[0] || W.children[0], Y = te.clientHeight;
          return Y > 0 ? Y : null;
        }
        return null;
      });
      var O = {
        initialized: !1,
        previousItem: _.selectedItem,
        selectedItem: _.selectedItem,
        hasMount: !1,
        isMouseEntered: !1,
        autoPlay: _.autoPlay,
        swiping: !1,
        swipeMovementStarted: !1,
        cancelClick: !1,
        itemSize: 1,
        itemListStyle: {},
        slideStyle: {},
        selectedStyle: {},
        prevStyle: {}
      };
      return E.animationHandler = typeof _.animationHandler == "function" && _.animationHandler || _.animationHandler === "fade" && a.fadeAnimationHandler || a.slideAnimationHandler, E.state = p(p({}, O), E.animationHandler(_, O)), E;
    }
    return m(M, [{
      key: "componentDidMount",
      value: function() {
        this.props.children && this.setupCarousel();
      }
    }, {
      key: "componentDidUpdate",
      value: function(E, O) {
        !E.children && this.props.children && !this.state.initialized && this.setupCarousel(), !E.autoFocus && this.props.autoFocus && this.forceFocus(), O.swiping && !this.state.swiping && this.setState(p({}, this.props.stopSwipingHandler(this.props, this.state))), (E.selectedItem !== this.props.selectedItem || E.centerMode !== this.props.centerMode) && (this.updateSizes(), this.moveTo(this.props.selectedItem)), E.autoPlay !== this.props.autoPlay && (this.props.autoPlay ? this.setupAutoPlay() : this.destroyAutoPlay(), this.setState({
          autoPlay: this.props.autoPlay
        }));
      }
    }, {
      key: "componentWillUnmount",
      value: function() {
        this.destroyCarousel();
      }
    }, {
      key: "setupCarousel",
      value: function() {
        var E = this;
        this.bindEvents(), this.state.autoPlay && t.Children.count(this.props.children) > 1 && this.setupAutoPlay(), this.props.autoFocus && this.forceFocus(), this.setState({
          initialized: !0
        }, function() {
          var O = E.getInitialImage();
          O && !O.complete ? O.addEventListener("load", E.setMountState) : E.setMountState();
        });
      }
    }, {
      key: "destroyCarousel",
      value: function() {
        this.state.initialized && (this.unbindEvents(), this.destroyAutoPlay());
      }
    }, {
      key: "setupAutoPlay",
      value: function() {
        this.autoPlay();
        var E = this.carouselWrapperRef;
        this.props.stopOnHover && E && (E.addEventListener("mouseenter", this.stopOnHover), E.addEventListener("mouseleave", this.startOnLeave));
      }
    }, {
      key: "destroyAutoPlay",
      value: function() {
        this.clearAutoPlay();
        var E = this.carouselWrapperRef;
        this.props.stopOnHover && E && (E.removeEventListener("mouseenter", this.stopOnHover), E.removeEventListener("mouseleave", this.startOnLeave));
      }
    }, {
      key: "bindEvents",
      value: function() {
        (0, o.default)().addEventListener("resize", this.updateSizes), (0, o.default)().addEventListener("DOMContentLoaded", this.updateSizes), this.props.useKeyboardArrows && (0, i.default)().addEventListener("keydown", this.navigateWithKeyboard);
      }
    }, {
      key: "unbindEvents",
      value: function() {
        (0, o.default)().removeEventListener("resize", this.updateSizes), (0, o.default)().removeEventListener("DOMContentLoaded", this.updateSizes);
        var E = this.getInitialImage();
        E && E.removeEventListener("load", this.setMountState), this.props.useKeyboardArrows && (0, i.default)().removeEventListener("keydown", this.navigateWithKeyboard);
      }
    }, {
      key: "forceFocus",
      value: function() {
        var E;
        (E = this.carouselWrapperRef) === null || E === void 0 || E.focus();
      }
    }, {
      key: "renderItems",
      value: function(E) {
        var O = this;
        return this.props.children ? t.Children.map(this.props.children, function(L, W) {
          var re = W === O.state.selectedItem, F = W === O.state.previousItem, N = re && O.state.selectedStyle || F && O.state.prevStyle || O.state.slideStyle || {};
          O.props.centerMode && O.props.axis === "horizontal" && (N = p(p({}, N), {}, {
            minWidth: O.props.centerSlidePercentage + "%"
          })), O.state.swiping && O.state.swipeMovementStarted && (N = p(p({}, N), {}, {
            pointerEvents: "none"
          }));
          var te = {
            ref: function(j) {
              return O.setItemsRef(j, W);
            },
            key: "itemKey" + W + (E ? "clone" : ""),
            className: n.default.ITEM(!0, W === O.state.selectedItem, W === O.state.previousItem),
            onClick: O.handleClickItem.bind(O, W, L),
            style: N
          };
          return /* @__PURE__ */ t.default.createElement("li", te, O.props.renderItem(L, {
            isSelected: W === O.state.selectedItem,
            isPrevious: W === O.state.previousItem
          }));
        }) : [];
      }
    }, {
      key: "renderControls",
      value: function() {
        var E = this, O = this.props, L = O.showIndicators, W = O.labels, re = O.renderIndicator, F = O.children;
        return L ? /* @__PURE__ */ t.default.createElement("ul", {
          className: "control-dots"
        }, t.Children.map(F, function(N, te) {
          return re && re(E.changeItem(te), te === E.state.selectedItem, te, W.item);
        })) : null;
      }
    }, {
      key: "renderStatus",
      value: function() {
        return this.props.showStatus ? /* @__PURE__ */ t.default.createElement("p", {
          className: "carousel-status"
        }, this.props.statusFormatter(this.state.selectedItem + 1, t.Children.count(this.props.children))) : null;
      }
    }, {
      key: "renderThumbs",
      value: function() {
        return !this.props.showThumbs || !this.props.children || t.Children.count(this.props.children) === 0 ? null : /* @__PURE__ */ t.default.createElement(r.default, {
          ref: this.setThumbsRef,
          onSelectItem: this.handleClickThumb,
          selectedItem: this.state.selectedItem,
          transitionTime: this.props.transitionTime,
          thumbWidth: this.props.thumbWidth,
          labels: this.props.labels,
          emulateTouch: this.props.emulateTouch
        }, this.props.renderThumbs(this.props.children));
      }
    }, {
      key: "render",
      value: function() {
        var E = this;
        if (!this.props.children || t.Children.count(this.props.children) === 0)
          return null;
        var O = this.props.swipeable && t.Children.count(this.props.children) > 1, L = this.props.axis === "horizontal", W = this.props.showArrows && t.Children.count(this.props.children) > 1, re = W && (this.state.selectedItem > 0 || this.props.infiniteLoop) || !1, F = W && (this.state.selectedItem < t.Children.count(this.props.children) - 1 || this.props.infiniteLoop) || !1, N = this.renderItems(!0), te = N.shift(), Y = N.pop(), j = {
          className: n.default.SLIDER(!0, this.state.swiping),
          onSwipeMove: this.onSwipeMove,
          onSwipeStart: this.onSwipeStart,
          onSwipeEnd: this.onSwipeEnd,
          style: this.state.itemListStyle,
          tolerance: this.props.swipeScrollTolerance
        }, ee = {};
        if (L) {
          if (j.onSwipeLeft = this.onSwipeForward, j.onSwipeRight = this.onSwipeBackwards, this.props.dynamicHeight) {
            var H = this.getVariableItemHeight(this.state.selectedItem);
            ee.height = H || "auto";
          }
        } else
          j.onSwipeUp = this.props.verticalSwipe === "natural" ? this.onSwipeBackwards : this.onSwipeForward, j.onSwipeDown = this.props.verticalSwipe === "natural" ? this.onSwipeForward : this.onSwipeBackwards, j.style = p(p({}, j.style), {}, {
            height: this.state.itemSize
          }), ee.height = this.state.itemSize;
        return /* @__PURE__ */ t.default.createElement("div", {
          "aria-label": this.props.ariaLabel,
          className: n.default.ROOT(this.props.className),
          ref: this.setCarouselWrapperRef,
          tabIndex: this.props.useKeyboardArrows ? 0 : void 0
        }, /* @__PURE__ */ t.default.createElement("div", {
          className: n.default.CAROUSEL(!0),
          style: {
            width: this.props.width
          }
        }, this.renderControls(), this.props.renderArrowPrev(this.onClickPrev, re, this.props.labels.leftArrow), /* @__PURE__ */ t.default.createElement("div", {
          className: n.default.WRAPPER(!0, this.props.axis),
          style: ee
        }, O ? /* @__PURE__ */ t.default.createElement(e.default, f({
          tagName: "ul",
          innerRef: this.setListRef
        }, j, {
          allowMouseEvents: this.props.emulateTouch
        }), this.props.infiniteLoop && Y, this.renderItems(), this.props.infiniteLoop && te) : /* @__PURE__ */ t.default.createElement("ul", {
          className: n.default.SLIDER(!0, this.state.swiping),
          ref: function(J) {
            return E.setListRef(J);
          },
          style: this.state.itemListStyle || {}
        }, this.props.infiniteLoop && Y, this.renderItems(), this.props.infiniteLoop && te)), this.props.renderArrowNext(this.onClickNext, F, this.props.labels.rightArrow), this.renderStatus()), this.renderThumbs());
      }
    }]), M;
  })(t.default.Component);
  return Qo.default = z, S(z, "displayName", "Carousel"), S(z, "defaultProps", {
    ariaLabel: void 0,
    axis: "horizontal",
    centerSlidePercentage: 80,
    interval: 3e3,
    labels: {
      leftArrow: "previous slide / item",
      rightArrow: "next slide / item",
      item: "slide item"
    },
    onClickItem: s.noop,
    onClickThumb: s.noop,
    onChange: s.noop,
    onSwipeStart: function() {
    },
    onSwipeEnd: function() {
    },
    onSwipeMove: function() {
      return !1;
    },
    preventMovementUntilSwipeScrollTolerance: !1,
    renderArrowPrev: function(x, M, _) {
      return /* @__PURE__ */ t.default.createElement("button", {
        type: "button",
        "aria-label": _,
        className: n.default.ARROW_PREV(!M),
        onClick: x
      });
    },
    renderArrowNext: function(x, M, _) {
      return /* @__PURE__ */ t.default.createElement("button", {
        type: "button",
        "aria-label": _,
        className: n.default.ARROW_NEXT(!M),
        onClick: x
      });
    },
    renderIndicator: function(x, M, _, E) {
      return /* @__PURE__ */ t.default.createElement("li", {
        className: n.default.DOT(M),
        onClick: x,
        onKeyDown: x,
        value: _,
        key: _,
        role: "button",
        tabIndex: 0,
        "aria-label": "".concat(E, " ").concat(_ + 1)
      });
    },
    renderItem: function(x) {
      return x;
    },
    renderThumbs: function(x) {
      var M = t.Children.map(x, function(_) {
        var E = _;
        if (_.type !== "img" && (E = t.Children.toArray(_.props.children).find(function(O) {
          return O.type === "img";
        })), !!E)
          return E;
      });
      return M.filter(function(_) {
        return _;
      }).length === 0 ? (console.warn("No images found! Can't build the thumb list without images. If you don't need thumbs, set showThumbs={false} in the Carousel. Note that it's not possible to get images rendered inside custom components. More info at https://github.com/leandrowd/react-responsive-carousel/blob/master/TROUBLESHOOTING.md"), []) : M;
    },
    statusFormatter: s.defaultStatusFormatter,
    selectedItem: 0,
    showArrows: !0,
    showIndicators: !0,
    showStatus: !0,
    showThumbs: !0,
    stopOnHover: !0,
    swipeScrollTolerance: 5,
    swipeable: !0,
    transitionTime: 350,
    verticalSwipe: "standard",
    width: "100%",
    animationHandler: "slide",
    swipeAnimationHandler: a.slideSwipeAnimationHandler,
    stopSwipingHandler: a.slideStopSwipingHandler
  }), Qo;
}
var ym = {}, bm;
function lT() {
  return bm || (bm = 1), ym;
}
var vm;
function cT() {
  return vm || (vm = 1, (function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "Carousel", {
      enumerable: !0,
      get: function() {
        return e.default;
      }
    }), Object.defineProperty(t, "CarouselProps", {
      enumerable: !0,
      get: function() {
        return n.CarouselProps;
      }
    }), Object.defineProperty(t, "Thumbs", {
      enumerable: !0,
      get: function() {
        return r.default;
      }
    });
    var e = i(aT()), n = lT(), r = i(Xv());
    function i(o) {
      return o && o.__esModule ? o : { default: o };
    }
  })(au)), au;
}
var uT = cT(), gu, wm;
function dT() {
  if (wm) return gu;
  wm = 1;
  var t = ii(), e = function() {
    return t.Date.now();
  };
  return gu = e, gu;
}
var mu, xm;
function fT() {
  if (xm) return mu;
  xm = 1;
  var t = /\s/;
  function e(n) {
    for (var r = n.length; r-- && t.test(n.charAt(r)); )
      ;
    return r;
  }
  return mu = e, mu;
}
var yu, km;
function hT() {
  if (km) return yu;
  km = 1;
  var t = fT(), e = /^\s+/;
  function n(r) {
    return r && r.slice(0, t(r) + 1).replace(e, "");
  }
  return yu = n, yu;
}
var bu, Sm;
function bh() {
  if (Sm) return bu;
  Sm = 1;
  var t = hT(), e = ao(), n = yl(), r = NaN, i = /^[-+]0x[0-9a-f]+$/i, o = /^0b[01]+$/i, s = /^0o[0-7]+$/i, a = parseInt;
  function l(c) {
    if (typeof c == "number")
      return c;
    if (n(c))
      return r;
    if (e(c)) {
      var u = typeof c.valueOf == "function" ? c.valueOf() : c;
      c = e(u) ? u + "" : u;
    }
    if (typeof c != "string")
      return c === 0 ? c : +c;
    c = t(c);
    var d = o.test(c);
    return d || s.test(c) ? a(c.slice(2), d ? 2 : 8) : i.test(c) ? r : +c;
  }
  return bu = l, bu;
}
var vu, Cm;
function Jv() {
  if (Cm) return vu;
  Cm = 1;
  var t = ao(), e = dT(), n = bh(), r = "Expected a function", i = Math.max, o = Math.min;
  function s(a, l, c) {
    var u, d, f, h, p, g, y = 0, m = !1, b = !1, C = !0;
    if (typeof a != "function")
      throw new TypeError(r);
    l = n(l) || 0, t(c) && (m = !!c.leading, b = "maxWait" in c, f = b ? i(n(c.maxWait) || 0, l) : f, C = "trailing" in c ? !!c.trailing : C);
    function I(M) {
      var _ = u, E = d;
      return u = d = void 0, y = M, h = a.apply(E, _), h;
    }
    function v(M) {
      return y = M, p = setTimeout(P, l), m ? I(M) : h;
    }
    function T(M) {
      var _ = M - g, E = M - y, O = l - _;
      return b ? o(O, f - E) : O;
    }
    function D(M) {
      var _ = M - g, E = M - y;
      return g === void 0 || _ >= l || _ < 0 || b && E >= f;
    }
    function P() {
      var M = e();
      if (D(M))
        return S(M);
      p = setTimeout(P, T(M));
    }
    function S(M) {
      return p = void 0, C && u ? I(M) : (u = d = void 0, h);
    }
    function z() {
      p !== void 0 && clearTimeout(p), y = 0, u = g = d = p = void 0;
    }
    function k() {
      return p === void 0 ? h : S(e());
    }
    function x() {
      var M = e(), _ = D(M);
      if (u = arguments, d = this, g = M, _) {
        if (p === void 0)
          return v(g);
        if (b)
          return clearTimeout(p), p = setTimeout(P, l), I(g);
      }
      return p === void 0 && (p = setTimeout(P, l)), h;
    }
    return x.cancel = z, x.flush = k, x;
  }
  return vu = s, vu;
}
var pT = Jv();
const Zv = /* @__PURE__ */ Ni(pT);
function tr(t, e, n, r, i = !1) {
  const o = w.useRef();
  o.current = e, w.useEffect(
    () => {
      if (n === null || n.addEventListener === void 0)
        return;
      const s = n, a = (l) => {
        var c;
        (c = o.current) == null || c.call(s, l);
      };
      return s.addEventListener(t, a, { passive: r, capture: i }), () => {
        s.removeEventListener(t, a, { capture: i });
      };
    },
    [t, n, r, i]
    // Re-run if eventName or element changes
  );
}
function Ti(t, e) {
  return t === void 0 ? void 0 : e;
}
const gT = Math.PI;
function Rm(t) {
  return t * gT / 180;
}
const Qv = (t, e, n) => ({
  x1: t - n / 2,
  y1: e - n / 2,
  x2: t + n / 2,
  y2: e + n / 2
}), e1 = (t, e, n, r, i) => {
  switch (t) {
    case "left":
      return Math.floor(e) + r + i / 2;
    case "center":
      return Math.floor(e + n / 2);
    case "right":
      return Math.floor(e + n) - r - i / 2;
  }
}, t1 = (t, e, n) => Math.min(t, e - n * 2), n1 = (t, e, n) => n.x1 <= t && t <= n.x2 && n.y1 <= e && e <= n.y2, vh = (t) => {
  const e = t.fgColor ?? "currentColor";
  return w.createElement(
    "svg",
    { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    w.createElement("path", { d: "M12.7073 7.05029C7.87391 11.8837 10.4544 9.30322 6.03024 13.7273C5.77392 13.9836 5.58981 14.3071 5.50189 14.6587L4.52521 18.5655C4.38789 19.1148 4.88543 19.6123 5.43472 19.475L9.34146 18.4983C9.69313 18.4104 10.0143 18.2286 10.2706 17.9722L16.9499 11.2929", stroke: e, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", fill: "none", vectorEffect: "non-scaling-stroke" }),
    w.createElement("path", { d: "M20.4854 4.92901L19.0712 3.5148C18.2901 2.73375 17.0238 2.73375 16.2428 3.5148L14.475 5.28257C15.5326 7.71912 16.4736 8.6278 18.7176 9.52521L20.4854 7.75744C21.2665 6.97639 21.2665 5.71006 20.4854 4.92901Z", stroke: e, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", fill: "none", vectorEffect: "non-scaling-stroke" })
  );
}, mT = (t) => {
  const e = t.fgColor ?? "currentColor";
  return w.createElement(
    "svg",
    { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    w.createElement("path", { d: "M19 6L10.3802 17L5.34071 11.8758", vectorEffect: "non-scaling-stroke", stroke: e, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
  );
};
function yT(t, e, n) {
  const [r, i] = w.useState(t), o = w.useRef(!0);
  w.useEffect(() => () => {
    o.current = !1;
  }, []);
  const s = w.useRef(Zv((a) => {
    o.current && i(a);
  }, n));
  return w.useLayoutEffect(() => {
    o.current && s.current(() => t());
  }, e), r;
}
const bT = "֑-߿יִ-﷽ﹰ-ﻼ", vT = "A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿‎Ⰰ-﬜︀-﹯﻽-￿", wT = new RegExp("^[^" + vT + "]*[" + bT + "]");
function wh(t) {
  return wT.test(t) ? "rtl" : "not-rtl";
}
let Ca;
function Sf() {
  if (typeof document > "u")
    return 0;
  if (Ca !== void 0)
    return Ca;
  const t = document.createElement("p");
  t.style.width = "100%", t.style.height = "200px";
  const e = document.createElement("div");
  e.id = "testScrollbar", e.style.position = "absolute", e.style.top = "0px", e.style.left = "0px", e.style.visibility = "hidden", e.style.width = "200px", e.style.height = "150px", e.style.overflow = "hidden", e.append(t), document.body.append(e);
  const n = t.offsetWidth;
  e.style.overflow = "scroll";
  let r = t.offsetWidth;
  return n === r && (r = e.clientWidth), e.remove(), Ca = n - r, Ca;
}
const Ui = Symbol();
function xT(t) {
  const e = w.useRef([Ui, t]);
  e.current[1] !== t && (e.current[0] = t), e.current[1] = t;
  const [n, r] = w.useState(t), [, i] = w.useState(), o = w.useCallback((a) => {
    const l = e.current[0];
    l !== Ui && (a = typeof a == "function" ? a(l) : a, a === l) || (l !== Ui && i({}), r((c) => typeof a == "function" ? a(l === Ui ? c : l) : a), e.current[0] = Ui);
  }, []), s = w.useCallback(() => {
    e.current[0] = Ui, i({});
  }, []);
  return [e.current[0] === Ui ? n : e.current[0], o, s];
}
function r1(t) {
  if (t.length === 0)
    return "";
  let e = 0, n = 0;
  for (const r of t) {
    if (n += r.length, n > 1e4)
      break;
    e++;
  }
  return t.slice(0, e).join(", ");
}
function kT(t) {
  const e = w.useRef(t);
  return qo(t, e.current) || (e.current = t), e.current;
}
const ST = (t) => {
  const { urls: e, canWrite: n, onEditClick: r, renderImage: i } = t, o = e.filter((a) => a !== "");
  if (o.length === 0)
    return null;
  const s = o.length > 1;
  return w.createElement(
    YR,
    { "data-testid": "GDG-default-image-overlay-editor" },
    w.createElement(uT.Carousel, { showArrows: s, showThumbs: !1, swipeable: s, emulateTouch: s, infiniteLoop: s }, o.map((a) => {
      const l = (i == null ? void 0 : i(a)) ?? w.createElement("img", { draggable: !1, src: a });
      return w.createElement("div", { className: "gdg-centering-container", key: a }, l);
    })),
    n && r && w.createElement(
      "button",
      { className: "gdg-edit-icon", onClick: r },
      w.createElement(vh, null)
    )
  );
};
function xh() {
  return { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null };
}
var co = xh();
function i1(t) {
  co = t;
}
var ws = { exec: () => null };
function sn(t, e = "") {
  let n = typeof t == "string" ? t : t.source, r = { replace: (i, o) => {
    let s = typeof o == "string" ? o : o.source;
    return s = s.replace(nr.caret, "$1"), n = n.replace(i, s), r;
  }, getRegex: () => new RegExp(n, e) };
  return r;
}
var CT = (() => {
  try {
    return !!new RegExp("(?<=1)(?<!1)");
  } catch {
    return !1;
  }
})(), nr = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] /, listReplaceTask: /^\[[ xX]\] +/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (t) => new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}#`), htmlBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}<(?:[a-z].*>|!--)`, "i") }, RT = /^(?:[ \t]*(?:\n|$))+/, TT = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, ET = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Ws = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, MT = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, kh = /(?:[*+-]|\d{1,9}[.)])/, o1 = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, s1 = sn(o1).replace(/bull/g, kh).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), IT = sn(o1).replace(/bull/g, kh).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), Sh = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, AT = /^[^\n]+/, Ch = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, _T = sn(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", Ch).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), PT = sn(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, kh).getRegex(), Sl = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", Rh = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, DT = sn("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", Rh).replace("tag", Sl).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), a1 = sn(Sh).replace("hr", Ws).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Sl).getRegex(), NT = sn(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", a1).getRegex(), Th = { blockquote: NT, code: TT, def: _T, fences: ET, heading: MT, hr: Ws, html: DT, lheading: s1, list: PT, newline: RT, paragraph: a1, table: ws, text: AT }, Tm = sn("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Ws).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Sl).getRegex(), OT = { ...Th, lheading: IT, table: Tm, paragraph: sn(Sh).replace("hr", Ws).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Tm).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Sl).getRegex() }, zT = { ...Th, html: sn(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", Rh).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: ws, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: sn(Sh).replace("hr", Ws).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", s1).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, LT = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, $T = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, l1 = /^( {2,}|\\)\n(?!\s*$)/, FT = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Cl = /[\p{P}\p{S}]/u, Eh = /[\s\p{P}\p{S}]/u, c1 = /[^\s\p{P}\p{S}]/u, HT = sn(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, Eh).getRegex(), u1 = /(?!~)[\p{P}\p{S}]/u, BT = /(?!~)[\s\p{P}\p{S}]/u, qT = /(?:[^\s\p{P}\p{S}]|~)/u, WT = sn(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", CT ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), d1 = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, jT = sn(d1, "u").replace(/punct/g, Cl).getRegex(), KT = sn(d1, "u").replace(/punct/g, u1).getRegex(), f1 = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", UT = sn(f1, "gu").replace(/notPunctSpace/g, c1).replace(/punctSpace/g, Eh).replace(/punct/g, Cl).getRegex(), GT = sn(f1, "gu").replace(/notPunctSpace/g, qT).replace(/punctSpace/g, BT).replace(/punct/g, u1).getRegex(), YT = sn("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, c1).replace(/punctSpace/g, Eh).replace(/punct/g, Cl).getRegex(), XT = sn(/\\(punct)/, "gu").replace(/punct/g, Cl).getRegex(), VT = sn(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), JT = sn(Rh).replace("(?:-->|$)", "-->").getRegex(), ZT = sn("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", JT).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Za = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/, QT = sn(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", Za).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), h1 = sn(/^!?\[(label)\]\[(ref)\]/).replace("label", Za).replace("ref", Ch).getRegex(), p1 = sn(/^!?\[(ref)\](?:\[\])?/).replace("ref", Ch).getRegex(), eE = sn("reflink|nolink(?!\\()", "g").replace("reflink", h1).replace("nolink", p1).getRegex(), Em = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, Mh = { _backpedal: ws, anyPunctuation: XT, autolink: VT, blockSkip: WT, br: l1, code: $T, del: ws, emStrongLDelim: jT, emStrongRDelimAst: UT, emStrongRDelimUnd: YT, escape: LT, link: QT, nolink: p1, punctuation: HT, reflink: h1, reflinkSearch: eE, tag: ZT, text: FT, url: ws }, tE = { ...Mh, link: sn(/^!?\[(label)\]\((.*?)\)/).replace("label", Za).getRegex(), reflink: sn(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Za).getRegex() }, Cf = { ...Mh, emStrongRDelimAst: GT, emStrongLDelim: KT, url: sn(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", Em).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: sn(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", Em).getRegex() }, nE = { ...Cf, br: sn(l1).replace("{2,}", "*").getRegex(), text: sn(Cf.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, Ra = { normal: Th, gfm: OT, pedantic: zT }, as = { normal: Mh, gfm: Cf, breaks: nE, pedantic: tE }, rE = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, Mm = (t) => rE[t];
function Qr(t, e) {
  if (e) {
    if (nr.escapeTest.test(t)) return t.replace(nr.escapeReplace, Mm);
  } else if (nr.escapeTestNoEncode.test(t)) return t.replace(nr.escapeReplaceNoEncode, Mm);
  return t;
}
function Im(t) {
  try {
    t = encodeURI(t).replace(nr.percentDecode, "%");
  } catch {
    return null;
  }
  return t;
}
function Am(t, e) {
  var o;
  let n = t.replace(nr.findPipe, (s, a, l) => {
    let c = !1, u = a;
    for (; --u >= 0 && l[u] === "\\"; ) c = !c;
    return c ? "|" : " |";
  }), r = n.split(nr.splitPipe), i = 0;
  if (r[0].trim() || r.shift(), r.length > 0 && !((o = r.at(-1)) != null && o.trim()) && r.pop(), e) if (r.length > e) r.splice(e);
  else for (; r.length < e; ) r.push("");
  for (; i < r.length; i++) r[i] = r[i].trim().replace(nr.slashPipe, "|");
  return r;
}
function ls(t, e, n) {
  let r = t.length;
  if (r === 0) return "";
  let i = 0;
  for (; i < r && t.charAt(r - i - 1) === e; )
    i++;
  return t.slice(0, r - i);
}
function iE(t, e) {
  if (t.indexOf(e[1]) === -1) return -1;
  let n = 0;
  for (let r = 0; r < t.length; r++) if (t[r] === "\\") r++;
  else if (t[r] === e[0]) n++;
  else if (t[r] === e[1] && (n--, n < 0)) return r;
  return n > 0 ? -2 : -1;
}
function _m(t, e, n, r, i) {
  let o = e.href, s = e.title || null, a = t[1].replace(i.other.outputLinkReplace, "$1");
  r.state.inLink = !0;
  let l = { type: t[0].charAt(0) === "!" ? "image" : "link", raw: n, href: o, title: s, text: a, tokens: r.inlineTokens(a) };
  return r.state.inLink = !1, l;
}
function oE(t, e, n) {
  let r = t.match(n.other.indentCodeCompensation);
  if (r === null) return e;
  let i = r[1];
  return e.split(`
`).map((o) => {
    let s = o.match(n.other.beginningSpace);
    if (s === null) return o;
    let [a] = s;
    return a.length >= i.length ? o.slice(i.length) : o;
  }).join(`
`);
}
var Qa = class {
  constructor(t) {
    Qe(this, "options");
    Qe(this, "rules");
    Qe(this, "lexer");
    this.options = t || co;
  }
  space(t) {
    let e = this.rules.block.newline.exec(t);
    if (e && e[0].length > 0) return { type: "space", raw: e[0] };
  }
  code(t) {
    let e = this.rules.block.code.exec(t);
    if (e) {
      let n = e[0].replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: e[0], codeBlockStyle: "indented", text: this.options.pedantic ? n : ls(n, `
`) };
    }
  }
  fences(t) {
    let e = this.rules.block.fences.exec(t);
    if (e) {
      let n = e[0], r = oE(n, e[3] || "", this.rules);
      return { type: "code", raw: n, lang: e[2] ? e[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : e[2], text: r };
    }
  }
  heading(t) {
    let e = this.rules.block.heading.exec(t);
    if (e) {
      let n = e[2].trim();
      if (this.rules.other.endingHash.test(n)) {
        let r = ls(n, "#");
        (this.options.pedantic || !r || this.rules.other.endingSpaceChar.test(r)) && (n = r.trim());
      }
      return { type: "heading", raw: e[0], depth: e[1].length, text: n, tokens: this.lexer.inline(n) };
    }
  }
  hr(t) {
    let e = this.rules.block.hr.exec(t);
    if (e) return { type: "hr", raw: ls(e[0], `
`) };
  }
  blockquote(t) {
    let e = this.rules.block.blockquote.exec(t);
    if (e) {
      let n = ls(e[0], `
`).split(`
`), r = "", i = "", o = [];
      for (; n.length > 0; ) {
        let s = !1, a = [], l;
        for (l = 0; l < n.length; l++) if (this.rules.other.blockquoteStart.test(n[l])) a.push(n[l]), s = !0;
        else if (!s) a.push(n[l]);
        else break;
        n = n.slice(l);
        let c = a.join(`
`), u = c.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        r = r ? `${r}
${c}` : c, i = i ? `${i}
${u}` : u;
        let d = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(u, o, !0), this.lexer.state.top = d, n.length === 0) break;
        let f = o.at(-1);
        if ((f == null ? void 0 : f.type) === "code") break;
        if ((f == null ? void 0 : f.type) === "blockquote") {
          let h = f, p = h.raw + `
` + n.join(`
`), g = this.blockquote(p);
          o[o.length - 1] = g, r = r.substring(0, r.length - h.raw.length) + g.raw, i = i.substring(0, i.length - h.text.length) + g.text;
          break;
        } else if ((f == null ? void 0 : f.type) === "list") {
          let h = f, p = h.raw + `
` + n.join(`
`), g = this.list(p);
          o[o.length - 1] = g, r = r.substring(0, r.length - f.raw.length) + g.raw, i = i.substring(0, i.length - h.raw.length) + g.raw, n = p.substring(o.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: r, tokens: o, text: i };
    }
  }
  list(t) {
    let e = this.rules.block.list.exec(t);
    if (e) {
      let n = e[1].trim(), r = n.length > 1, i = { type: "list", raw: "", ordered: r, start: r ? +n.slice(0, -1) : "", loose: !1, items: [] };
      n = r ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = r ? n : "[*+-]");
      let o = this.rules.other.listItemRegex(n), s = !1;
      for (; t; ) {
        let l = !1, c = "", u = "";
        if (!(e = o.exec(t)) || this.rules.block.hr.test(t)) break;
        c = e[0], t = t.substring(c.length);
        let d = e[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (m) => " ".repeat(3 * m.length)), f = t.split(`
`, 1)[0], h = !d.trim(), p = 0;
        if (this.options.pedantic ? (p = 2, u = d.trimStart()) : h ? p = e[1].length + 1 : (p = e[2].search(this.rules.other.nonSpaceChar), p = p > 4 ? 1 : p, u = d.slice(p), p += e[1].length), h && this.rules.other.blankLine.test(f) && (c += f + `
`, t = t.substring(f.length + 1), l = !0), !l) {
          let m = this.rules.other.nextBulletRegex(p), b = this.rules.other.hrRegex(p), C = this.rules.other.fencesBeginRegex(p), I = this.rules.other.headingBeginRegex(p), v = this.rules.other.htmlBeginRegex(p);
          for (; t; ) {
            let T = t.split(`
`, 1)[0], D;
            if (f = T, this.options.pedantic ? (f = f.replace(this.rules.other.listReplaceNesting, "  "), D = f) : D = f.replace(this.rules.other.tabCharGlobal, "    "), C.test(f) || I.test(f) || v.test(f) || m.test(f) || b.test(f)) break;
            if (D.search(this.rules.other.nonSpaceChar) >= p || !f.trim()) u += `
` + D.slice(p);
            else {
              if (h || d.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || C.test(d) || I.test(d) || b.test(d)) break;
              u += `
` + f;
            }
            !h && !f.trim() && (h = !0), c += T + `
`, t = t.substring(T.length + 1), d = D.slice(p);
          }
        }
        i.loose || (s ? i.loose = !0 : this.rules.other.doubleBlankLine.test(c) && (s = !0));
        let g = null, y;
        this.options.gfm && (g = this.rules.other.listIsTask.exec(u), g && (y = g[0] !== "[ ] ", u = u.replace(this.rules.other.listReplaceTask, ""))), i.items.push({ type: "list_item", raw: c, task: !!g, checked: y, loose: !1, text: u, tokens: [] }), i.raw += c;
      }
      let a = i.items.at(-1);
      if (a) a.raw = a.raw.trimEnd(), a.text = a.text.trimEnd();
      else return;
      i.raw = i.raw.trimEnd();
      for (let l = 0; l < i.items.length; l++) if (this.lexer.state.top = !1, i.items[l].tokens = this.lexer.blockTokens(i.items[l].text, []), !i.loose) {
        let c = i.items[l].tokens.filter((d) => d.type === "space"), u = c.length > 0 && c.some((d) => this.rules.other.anyLine.test(d.raw));
        i.loose = u;
      }
      if (i.loose) for (let l = 0; l < i.items.length; l++) i.items[l].loose = !0;
      return i;
    }
  }
  html(t) {
    let e = this.rules.block.html.exec(t);
    if (e) return { type: "html", block: !0, raw: e[0], pre: e[1] === "pre" || e[1] === "script" || e[1] === "style", text: e[0] };
  }
  def(t) {
    let e = this.rules.block.def.exec(t);
    if (e) {
      let n = e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), r = e[2] ? e[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", i = e[3] ? e[3].substring(1, e[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : e[3];
      return { type: "def", tag: n, raw: e[0], href: r, title: i };
    }
  }
  table(t) {
    var s;
    let e = this.rules.block.table.exec(t);
    if (!e || !this.rules.other.tableDelimiter.test(e[2])) return;
    let n = Am(e[1]), r = e[2].replace(this.rules.other.tableAlignChars, "").split("|"), i = (s = e[3]) != null && s.trim() ? e[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], o = { type: "table", raw: e[0], header: [], align: [], rows: [] };
    if (n.length === r.length) {
      for (let a of r) this.rules.other.tableAlignRight.test(a) ? o.align.push("right") : this.rules.other.tableAlignCenter.test(a) ? o.align.push("center") : this.rules.other.tableAlignLeft.test(a) ? o.align.push("left") : o.align.push(null);
      for (let a = 0; a < n.length; a++) o.header.push({ text: n[a], tokens: this.lexer.inline(n[a]), header: !0, align: o.align[a] });
      for (let a of i) o.rows.push(Am(a, o.header.length).map((l, c) => ({ text: l, tokens: this.lexer.inline(l), header: !1, align: o.align[c] })));
      return o;
    }
  }
  lheading(t) {
    let e = this.rules.block.lheading.exec(t);
    if (e) return { type: "heading", raw: e[0], depth: e[2].charAt(0) === "=" ? 1 : 2, text: e[1], tokens: this.lexer.inline(e[1]) };
  }
  paragraph(t) {
    let e = this.rules.block.paragraph.exec(t);
    if (e) {
      let n = e[1].charAt(e[1].length - 1) === `
` ? e[1].slice(0, -1) : e[1];
      return { type: "paragraph", raw: e[0], text: n, tokens: this.lexer.inline(n) };
    }
  }
  text(t) {
    let e = this.rules.block.text.exec(t);
    if (e) return { type: "text", raw: e[0], text: e[0], tokens: this.lexer.inline(e[0]) };
  }
  escape(t) {
    let e = this.rules.inline.escape.exec(t);
    if (e) return { type: "escape", raw: e[0], text: e[1] };
  }
  tag(t) {
    let e = this.rules.inline.tag.exec(t);
    if (e) return !this.lexer.state.inLink && this.rules.other.startATag.test(e[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(e[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(e[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(e[0]) && (this.lexer.state.inRawBlock = !1), { type: "html", raw: e[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: !1, text: e[0] };
  }
  link(t) {
    let e = this.rules.inline.link.exec(t);
    if (e) {
      let n = e[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(n)) {
        if (!this.rules.other.endAngleBracket.test(n)) return;
        let o = ls(n.slice(0, -1), "\\");
        if ((n.length - o.length) % 2 === 0) return;
      } else {
        let o = iE(e[2], "()");
        if (o === -2) return;
        if (o > -1) {
          let s = (e[0].indexOf("!") === 0 ? 5 : 4) + e[1].length + o;
          e[2] = e[2].substring(0, o), e[0] = e[0].substring(0, s).trim(), e[3] = "";
        }
      }
      let r = e[2], i = "";
      if (this.options.pedantic) {
        let o = this.rules.other.pedanticHrefTitle.exec(r);
        o && (r = o[1], i = o[3]);
      } else i = e[3] ? e[3].slice(1, -1) : "";
      return r = r.trim(), this.rules.other.startAngleBracket.test(r) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? r = r.slice(1) : r = r.slice(1, -1)), _m(e, { href: r && r.replace(this.rules.inline.anyPunctuation, "$1"), title: i && i.replace(this.rules.inline.anyPunctuation, "$1") }, e[0], this.lexer, this.rules);
    }
  }
  reflink(t, e) {
    let n;
    if ((n = this.rules.inline.reflink.exec(t)) || (n = this.rules.inline.nolink.exec(t))) {
      let r = (n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " "), i = e[r.toLowerCase()];
      if (!i) {
        let o = n[0].charAt(0);
        return { type: "text", raw: o, text: o };
      }
      return _m(n, i, n[0], this.lexer, this.rules);
    }
  }
  emStrong(t, e, n = "") {
    let r = this.rules.inline.emStrongLDelim.exec(t);
    if (!(!r || r[3] && n.match(this.rules.other.unicodeAlphaNumeric)) && (!(r[1] || r[2]) || !n || this.rules.inline.punctuation.exec(n))) {
      let i = [...r[0]].length - 1, o, s, a = i, l = 0, c = r[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (c.lastIndex = 0, e = e.slice(-1 * t.length + i); (r = c.exec(e)) != null; ) {
        if (o = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !o) continue;
        if (s = [...o].length, r[3] || r[4]) {
          a += s;
          continue;
        } else if ((r[5] || r[6]) && i % 3 && !((i + s) % 3)) {
          l += s;
          continue;
        }
        if (a -= s, a > 0) continue;
        s = Math.min(s, s + a + l);
        let u = [...r[0]][0].length, d = t.slice(0, i + r.index + u + s);
        if (Math.min(i, s) % 2) {
          let h = d.slice(1, -1);
          return { type: "em", raw: d, text: h, tokens: this.lexer.inlineTokens(h) };
        }
        let f = d.slice(2, -2);
        return { type: "strong", raw: d, text: f, tokens: this.lexer.inlineTokens(f) };
      }
    }
  }
  codespan(t) {
    let e = this.rules.inline.code.exec(t);
    if (e) {
      let n = e[2].replace(this.rules.other.newLineCharGlobal, " "), r = this.rules.other.nonSpaceChar.test(n), i = this.rules.other.startingSpaceChar.test(n) && this.rules.other.endingSpaceChar.test(n);
      return r && i && (n = n.substring(1, n.length - 1)), { type: "codespan", raw: e[0], text: n };
    }
  }
  br(t) {
    let e = this.rules.inline.br.exec(t);
    if (e) return { type: "br", raw: e[0] };
  }
  del(t) {
    let e = this.rules.inline.del.exec(t);
    if (e) return { type: "del", raw: e[0], text: e[2], tokens: this.lexer.inlineTokens(e[2]) };
  }
  autolink(t) {
    let e = this.rules.inline.autolink.exec(t);
    if (e) {
      let n, r;
      return e[2] === "@" ? (n = e[1], r = "mailto:" + n) : (n = e[1], r = n), { type: "link", raw: e[0], text: n, href: r, tokens: [{ type: "text", raw: n, text: n }] };
    }
  }
  url(t) {
    var n;
    let e;
    if (e = this.rules.inline.url.exec(t)) {
      let r, i;
      if (e[2] === "@") r = e[0], i = "mailto:" + r;
      else {
        let o;
        do
          o = e[0], e[0] = ((n = this.rules.inline._backpedal.exec(e[0])) == null ? void 0 : n[0]) ?? "";
        while (o !== e[0]);
        r = e[0], e[1] === "www." ? i = "http://" + e[0] : i = e[0];
      }
      return { type: "link", raw: e[0], text: r, href: i, tokens: [{ type: "text", raw: r, text: r }] };
    }
  }
  inlineText(t) {
    let e = this.rules.inline.text.exec(t);
    if (e) {
      let n = this.lexer.state.inRawBlock;
      return { type: "text", raw: e[0], text: e[0], escaped: n };
    }
  }
}, Fr = class Rf {
  constructor(e) {
    Qe(this, "tokens");
    Qe(this, "options");
    Qe(this, "state");
    Qe(this, "tokenizer");
    Qe(this, "inlineQueue");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || co, this.options.tokenizer = this.options.tokenizer || new Qa(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, top: !0 };
    let n = { other: nr, block: Ra.normal, inline: as.normal };
    this.options.pedantic ? (n.block = Ra.pedantic, n.inline = as.pedantic) : this.options.gfm && (n.block = Ra.gfm, this.options.breaks ? n.inline = as.breaks : n.inline = as.gfm), this.tokenizer.rules = n;
  }
  static get rules() {
    return { block: Ra, inline: as };
  }
  static lex(e, n) {
    return new Rf(n).lex(e);
  }
  static lexInline(e, n) {
    return new Rf(n).inlineTokens(e);
  }
  lex(e) {
    e = e.replace(nr.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let n = 0; n < this.inlineQueue.length; n++) {
      let r = this.inlineQueue[n];
      this.inlineTokens(r.src, r.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, n = [], r = !1) {
    var i, o, s;
    for (this.options.pedantic && (e = e.replace(nr.tabCharGlobal, "    ").replace(nr.spaceLine, "")); e; ) {
      let a;
      if ((o = (i = this.options.extensions) == null ? void 0 : i.block) != null && o.some((c) => (a = c.call({ lexer: this }, e, n)) ? (e = e.substring(a.raw.length), n.push(a), !0) : !1)) continue;
      if (a = this.tokenizer.space(e)) {
        e = e.substring(a.raw.length);
        let c = n.at(-1);
        a.raw.length === 1 && c !== void 0 ? c.raw += `
` : n.push(a);
        continue;
      }
      if (a = this.tokenizer.code(e)) {
        e = e.substring(a.raw.length);
        let c = n.at(-1);
        (c == null ? void 0 : c.type) === "paragraph" || (c == null ? void 0 : c.type) === "text" ? (c.raw += (c.raw.endsWith(`
`) ? "" : `
`) + a.raw, c.text += `
` + a.text, this.inlineQueue.at(-1).src = c.text) : n.push(a);
        continue;
      }
      if (a = this.tokenizer.fences(e)) {
        e = e.substring(a.raw.length), n.push(a);
        continue;
      }
      if (a = this.tokenizer.heading(e)) {
        e = e.substring(a.raw.length), n.push(a);
        continue;
      }
      if (a = this.tokenizer.hr(e)) {
        e = e.substring(a.raw.length), n.push(a);
        continue;
      }
      if (a = this.tokenizer.blockquote(e)) {
        e = e.substring(a.raw.length), n.push(a);
        continue;
      }
      if (a = this.tokenizer.list(e)) {
        e = e.substring(a.raw.length), n.push(a);
        continue;
      }
      if (a = this.tokenizer.html(e)) {
        e = e.substring(a.raw.length), n.push(a);
        continue;
      }
      if (a = this.tokenizer.def(e)) {
        e = e.substring(a.raw.length);
        let c = n.at(-1);
        (c == null ? void 0 : c.type) === "paragraph" || (c == null ? void 0 : c.type) === "text" ? (c.raw += (c.raw.endsWith(`
`) ? "" : `
`) + a.raw, c.text += `
` + a.raw, this.inlineQueue.at(-1).src = c.text) : this.tokens.links[a.tag] || (this.tokens.links[a.tag] = { href: a.href, title: a.title }, n.push(a));
        continue;
      }
      if (a = this.tokenizer.table(e)) {
        e = e.substring(a.raw.length), n.push(a);
        continue;
      }
      if (a = this.tokenizer.lheading(e)) {
        e = e.substring(a.raw.length), n.push(a);
        continue;
      }
      let l = e;
      if ((s = this.options.extensions) != null && s.startBlock) {
        let c = 1 / 0, u = e.slice(1), d;
        this.options.extensions.startBlock.forEach((f) => {
          d = f.call({ lexer: this }, u), typeof d == "number" && d >= 0 && (c = Math.min(c, d));
        }), c < 1 / 0 && c >= 0 && (l = e.substring(0, c + 1));
      }
      if (this.state.top && (a = this.tokenizer.paragraph(l))) {
        let c = n.at(-1);
        r && (c == null ? void 0 : c.type) === "paragraph" ? (c.raw += (c.raw.endsWith(`
`) ? "" : `
`) + a.raw, c.text += `
` + a.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = c.text) : n.push(a), r = l.length !== e.length, e = e.substring(a.raw.length);
        continue;
      }
      if (a = this.tokenizer.text(e)) {
        e = e.substring(a.raw.length);
        let c = n.at(-1);
        (c == null ? void 0 : c.type) === "text" ? (c.raw += (c.raw.endsWith(`
`) ? "" : `
`) + a.raw, c.text += `
` + a.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = c.text) : n.push(a);
        continue;
      }
      if (e) {
        let c = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(c);
          break;
        } else throw new Error(c);
      }
    }
    return this.state.top = !0, n;
  }
  inline(e, n = []) {
    return this.inlineQueue.push({ src: e, tokens: n }), n;
  }
  inlineTokens(e, n = []) {
    var l, c, u, d, f;
    let r = e, i = null;
    if (this.tokens.links) {
      let h = Object.keys(this.tokens.links);
      if (h.length > 0) for (; (i = this.tokenizer.rules.inline.reflinkSearch.exec(r)) != null; ) h.includes(i[0].slice(i[0].lastIndexOf("[") + 1, -1)) && (r = r.slice(0, i.index) + "[" + "a".repeat(i[0].length - 2) + "]" + r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (i = this.tokenizer.rules.inline.anyPunctuation.exec(r)) != null; ) r = r.slice(0, i.index) + "++" + r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    let o;
    for (; (i = this.tokenizer.rules.inline.blockSkip.exec(r)) != null; ) o = i[2] ? i[2].length : 0, r = r.slice(0, i.index + o) + "[" + "a".repeat(i[0].length - o - 2) + "]" + r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    r = ((c = (l = this.options.hooks) == null ? void 0 : l.emStrongMask) == null ? void 0 : c.call({ lexer: this }, r)) ?? r;
    let s = !1, a = "";
    for (; e; ) {
      s || (a = ""), s = !1;
      let h;
      if ((d = (u = this.options.extensions) == null ? void 0 : u.inline) != null && d.some((g) => (h = g.call({ lexer: this }, e, n)) ? (e = e.substring(h.raw.length), n.push(h), !0) : !1)) continue;
      if (h = this.tokenizer.escape(e)) {
        e = e.substring(h.raw.length), n.push(h);
        continue;
      }
      if (h = this.tokenizer.tag(e)) {
        e = e.substring(h.raw.length), n.push(h);
        continue;
      }
      if (h = this.tokenizer.link(e)) {
        e = e.substring(h.raw.length), n.push(h);
        continue;
      }
      if (h = this.tokenizer.reflink(e, this.tokens.links)) {
        e = e.substring(h.raw.length);
        let g = n.at(-1);
        h.type === "text" && (g == null ? void 0 : g.type) === "text" ? (g.raw += h.raw, g.text += h.text) : n.push(h);
        continue;
      }
      if (h = this.tokenizer.emStrong(e, r, a)) {
        e = e.substring(h.raw.length), n.push(h);
        continue;
      }
      if (h = this.tokenizer.codespan(e)) {
        e = e.substring(h.raw.length), n.push(h);
        continue;
      }
      if (h = this.tokenizer.br(e)) {
        e = e.substring(h.raw.length), n.push(h);
        continue;
      }
      if (h = this.tokenizer.del(e)) {
        e = e.substring(h.raw.length), n.push(h);
        continue;
      }
      if (h = this.tokenizer.autolink(e)) {
        e = e.substring(h.raw.length), n.push(h);
        continue;
      }
      if (!this.state.inLink && (h = this.tokenizer.url(e))) {
        e = e.substring(h.raw.length), n.push(h);
        continue;
      }
      let p = e;
      if ((f = this.options.extensions) != null && f.startInline) {
        let g = 1 / 0, y = e.slice(1), m;
        this.options.extensions.startInline.forEach((b) => {
          m = b.call({ lexer: this }, y), typeof m == "number" && m >= 0 && (g = Math.min(g, m));
        }), g < 1 / 0 && g >= 0 && (p = e.substring(0, g + 1));
      }
      if (h = this.tokenizer.inlineText(p)) {
        e = e.substring(h.raw.length), h.raw.slice(-1) !== "_" && (a = h.raw.slice(-1)), s = !0;
        let g = n.at(-1);
        (g == null ? void 0 : g.type) === "text" ? (g.raw += h.raw, g.text += h.text) : n.push(h);
        continue;
      }
      if (e) {
        let g = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(g);
          break;
        } else throw new Error(g);
      }
    }
    return n;
  }
}, el = class {
  constructor(t) {
    Qe(this, "options");
    Qe(this, "parser");
    this.options = t || co;
  }
  space(t) {
    return "";
  }
  code({ text: t, lang: e, escaped: n }) {
    var o;
    let r = (o = (e || "").match(nr.notSpaceStart)) == null ? void 0 : o[0], i = t.replace(nr.endingNewline, "") + `
`;
    return r ? '<pre><code class="language-' + Qr(r) + '">' + (n ? i : Qr(i, !0)) + `</code></pre>
` : "<pre><code>" + (n ? i : Qr(i, !0)) + `</code></pre>
`;
  }
  blockquote({ tokens: t }) {
    return `<blockquote>
${this.parser.parse(t)}</blockquote>
`;
  }
  html({ text: t }) {
    return t;
  }
  def(t) {
    return "";
  }
  heading({ tokens: t, depth: e }) {
    return `<h${e}>${this.parser.parseInline(t)}</h${e}>
`;
  }
  hr(t) {
    return `<hr>
`;
  }
  list(t) {
    let e = t.ordered, n = t.start, r = "";
    for (let s = 0; s < t.items.length; s++) {
      let a = t.items[s];
      r += this.listitem(a);
    }
    let i = e ? "ol" : "ul", o = e && n !== 1 ? ' start="' + n + '"' : "";
    return "<" + i + o + `>
` + r + "</" + i + `>
`;
  }
  listitem(t) {
    var n;
    let e = "";
    if (t.task) {
      let r = this.checkbox({ checked: !!t.checked });
      t.loose ? ((n = t.tokens[0]) == null ? void 0 : n.type) === "paragraph" ? (t.tokens[0].text = r + " " + t.tokens[0].text, t.tokens[0].tokens && t.tokens[0].tokens.length > 0 && t.tokens[0].tokens[0].type === "text" && (t.tokens[0].tokens[0].text = r + " " + Qr(t.tokens[0].tokens[0].text), t.tokens[0].tokens[0].escaped = !0)) : t.tokens.unshift({ type: "text", raw: r + " ", text: r + " ", escaped: !0 }) : e += r + " ";
    }
    return e += this.parser.parse(t.tokens, !!t.loose), `<li>${e}</li>
`;
  }
  checkbox({ checked: t }) {
    return "<input " + (t ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph({ tokens: t }) {
    return `<p>${this.parser.parseInline(t)}</p>
`;
  }
  table(t) {
    let e = "", n = "";
    for (let i = 0; i < t.header.length; i++) n += this.tablecell(t.header[i]);
    e += this.tablerow({ text: n });
    let r = "";
    for (let i = 0; i < t.rows.length; i++) {
      let o = t.rows[i];
      n = "";
      for (let s = 0; s < o.length; s++) n += this.tablecell(o[s]);
      r += this.tablerow({ text: n });
    }
    return r && (r = `<tbody>${r}</tbody>`), `<table>
<thead>
` + e + `</thead>
` + r + `</table>
`;
  }
  tablerow({ text: t }) {
    return `<tr>
${t}</tr>
`;
  }
  tablecell(t) {
    let e = this.parser.parseInline(t.tokens), n = t.header ? "th" : "td";
    return (t.align ? `<${n} align="${t.align}">` : `<${n}>`) + e + `</${n}>
`;
  }
  strong({ tokens: t }) {
    return `<strong>${this.parser.parseInline(t)}</strong>`;
  }
  em({ tokens: t }) {
    return `<em>${this.parser.parseInline(t)}</em>`;
  }
  codespan({ text: t }) {
    return `<code>${Qr(t, !0)}</code>`;
  }
  br(t) {
    return "<br>";
  }
  del({ tokens: t }) {
    return `<del>${this.parser.parseInline(t)}</del>`;
  }
  link({ href: t, title: e, tokens: n }) {
    let r = this.parser.parseInline(n), i = Im(t);
    if (i === null) return r;
    t = i;
    let o = '<a href="' + t + '"';
    return e && (o += ' title="' + Qr(e) + '"'), o += ">" + r + "</a>", o;
  }
  image({ href: t, title: e, text: n, tokens: r }) {
    r && (n = this.parser.parseInline(r, this.parser.textRenderer));
    let i = Im(t);
    if (i === null) return Qr(n);
    t = i;
    let o = `<img src="${t}" alt="${n}"`;
    return e && (o += ` title="${Qr(e)}"`), o += ">", o;
  }
  text(t) {
    return "tokens" in t && t.tokens ? this.parser.parseInline(t.tokens) : "escaped" in t && t.escaped ? t.text : Qr(t.text);
  }
}, Ih = class {
  strong({ text: t }) {
    return t;
  }
  em({ text: t }) {
    return t;
  }
  codespan({ text: t }) {
    return t;
  }
  del({ text: t }) {
    return t;
  }
  html({ text: t }) {
    return t;
  }
  text({ text: t }) {
    return t;
  }
  link({ text: t }) {
    return "" + t;
  }
  image({ text: t }) {
    return "" + t;
  }
  br() {
    return "";
  }
}, Hr = class Tf {
  constructor(e) {
    Qe(this, "options");
    Qe(this, "renderer");
    Qe(this, "textRenderer");
    this.options = e || co, this.options.renderer = this.options.renderer || new el(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new Ih();
  }
  static parse(e, n) {
    return new Tf(n).parse(e);
  }
  static parseInline(e, n) {
    return new Tf(n).parseInline(e);
  }
  parse(e, n = !0) {
    var i, o;
    let r = "";
    for (let s = 0; s < e.length; s++) {
      let a = e[s];
      if ((o = (i = this.options.extensions) == null ? void 0 : i.renderers) != null && o[a.type]) {
        let c = a, u = this.options.extensions.renderers[c.type].call({ parser: this }, c);
        if (u !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "def", "paragraph", "text"].includes(c.type)) {
          r += u || "";
          continue;
        }
      }
      let l = a;
      switch (l.type) {
        case "space": {
          r += this.renderer.space(l);
          continue;
        }
        case "hr": {
          r += this.renderer.hr(l);
          continue;
        }
        case "heading": {
          r += this.renderer.heading(l);
          continue;
        }
        case "code": {
          r += this.renderer.code(l);
          continue;
        }
        case "table": {
          r += this.renderer.table(l);
          continue;
        }
        case "blockquote": {
          r += this.renderer.blockquote(l);
          continue;
        }
        case "list": {
          r += this.renderer.list(l);
          continue;
        }
        case "html": {
          r += this.renderer.html(l);
          continue;
        }
        case "def": {
          r += this.renderer.def(l);
          continue;
        }
        case "paragraph": {
          r += this.renderer.paragraph(l);
          continue;
        }
        case "text": {
          let c = l, u = this.renderer.text(c);
          for (; s + 1 < e.length && e[s + 1].type === "text"; ) c = e[++s], u += `
` + this.renderer.text(c);
          n ? r += this.renderer.paragraph({ type: "paragraph", raw: u, text: u, tokens: [{ type: "text", raw: u, text: u, escaped: !0 }] }) : r += u;
          continue;
        }
        default: {
          let c = 'Token with "' + l.type + '" type was not found.';
          if (this.options.silent) return console.error(c), "";
          throw new Error(c);
        }
      }
    }
    return r;
  }
  parseInline(e, n = this.renderer) {
    var i, o;
    let r = "";
    for (let s = 0; s < e.length; s++) {
      let a = e[s];
      if ((o = (i = this.options.extensions) == null ? void 0 : i.renderers) != null && o[a.type]) {
        let c = this.options.extensions.renderers[a.type].call({ parser: this }, a);
        if (c !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(a.type)) {
          r += c || "";
          continue;
        }
      }
      let l = a;
      switch (l.type) {
        case "escape": {
          r += n.text(l);
          break;
        }
        case "html": {
          r += n.html(l);
          break;
        }
        case "link": {
          r += n.link(l);
          break;
        }
        case "image": {
          r += n.image(l);
          break;
        }
        case "strong": {
          r += n.strong(l);
          break;
        }
        case "em": {
          r += n.em(l);
          break;
        }
        case "codespan": {
          r += n.codespan(l);
          break;
        }
        case "br": {
          r += n.br(l);
          break;
        }
        case "del": {
          r += n.del(l);
          break;
        }
        case "text": {
          r += n.text(l);
          break;
        }
        default: {
          let c = 'Token with "' + l.type + '" type was not found.';
          if (this.options.silent) return console.error(c), "";
          throw new Error(c);
        }
      }
    }
    return r;
  }
}, Aa, gs = (Aa = class {
  constructor(t) {
    Qe(this, "options");
    Qe(this, "block");
    this.options = t || co;
  }
  preprocess(t) {
    return t;
  }
  postprocess(t) {
    return t;
  }
  processAllTokens(t) {
    return t;
  }
  emStrongMask(t) {
    return t;
  }
  provideLexer() {
    return this.block ? Fr.lex : Fr.lexInline;
  }
  provideParser() {
    return this.block ? Hr.parse : Hr.parseInline;
  }
}, Qe(Aa, "passThroughHooks", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"])), Qe(Aa, "passThroughHooksRespectAsync", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"])), Aa), sE = class {
  constructor(...t) {
    Qe(this, "defaults", xh());
    Qe(this, "options", this.setOptions);
    Qe(this, "parse", this.parseMarkdown(!0));
    Qe(this, "parseInline", this.parseMarkdown(!1));
    Qe(this, "Parser", Hr);
    Qe(this, "Renderer", el);
    Qe(this, "TextRenderer", Ih);
    Qe(this, "Lexer", Fr);
    Qe(this, "Tokenizer", Qa);
    Qe(this, "Hooks", gs);
    this.use(...t);
  }
  walkTokens(t, e) {
    var r, i;
    let n = [];
    for (let o of t) switch (n = n.concat(e.call(this, o)), o.type) {
      case "table": {
        let s = o;
        for (let a of s.header) n = n.concat(this.walkTokens(a.tokens, e));
        for (let a of s.rows) for (let l of a) n = n.concat(this.walkTokens(l.tokens, e));
        break;
      }
      case "list": {
        let s = o;
        n = n.concat(this.walkTokens(s.items, e));
        break;
      }
      default: {
        let s = o;
        (i = (r = this.defaults.extensions) == null ? void 0 : r.childTokens) != null && i[s.type] ? this.defaults.extensions.childTokens[s.type].forEach((a) => {
          let l = s[a].flat(1 / 0);
          n = n.concat(this.walkTokens(l, e));
        }) : s.tokens && (n = n.concat(this.walkTokens(s.tokens, e)));
      }
    }
    return n;
  }
  use(...t) {
    let e = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return t.forEach((n) => {
      let r = { ...n };
      if (r.async = this.defaults.async || r.async || !1, n.extensions && (n.extensions.forEach((i) => {
        if (!i.name) throw new Error("extension name required");
        if ("renderer" in i) {
          let o = e.renderers[i.name];
          o ? e.renderers[i.name] = function(...s) {
            let a = i.renderer.apply(this, s);
            return a === !1 && (a = o.apply(this, s)), a;
          } : e.renderers[i.name] = i.renderer;
        }
        if ("tokenizer" in i) {
          if (!i.level || i.level !== "block" && i.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let o = e[i.level];
          o ? o.unshift(i.tokenizer) : e[i.level] = [i.tokenizer], i.start && (i.level === "block" ? e.startBlock ? e.startBlock.push(i.start) : e.startBlock = [i.start] : i.level === "inline" && (e.startInline ? e.startInline.push(i.start) : e.startInline = [i.start]));
        }
        "childTokens" in i && i.childTokens && (e.childTokens[i.name] = i.childTokens);
      }), r.extensions = e), n.renderer) {
        let i = this.defaults.renderer || new el(this.defaults);
        for (let o in n.renderer) {
          if (!(o in i)) throw new Error(`renderer '${o}' does not exist`);
          if (["options", "parser"].includes(o)) continue;
          let s = o, a = n.renderer[s], l = i[s];
          i[s] = (...c) => {
            let u = a.apply(i, c);
            return u === !1 && (u = l.apply(i, c)), u || "";
          };
        }
        r.renderer = i;
      }
      if (n.tokenizer) {
        let i = this.defaults.tokenizer || new Qa(this.defaults);
        for (let o in n.tokenizer) {
          if (!(o in i)) throw new Error(`tokenizer '${o}' does not exist`);
          if (["options", "rules", "lexer"].includes(o)) continue;
          let s = o, a = n.tokenizer[s], l = i[s];
          i[s] = (...c) => {
            let u = a.apply(i, c);
            return u === !1 && (u = l.apply(i, c)), u;
          };
        }
        r.tokenizer = i;
      }
      if (n.hooks) {
        let i = this.defaults.hooks || new gs();
        for (let o in n.hooks) {
          if (!(o in i)) throw new Error(`hook '${o}' does not exist`);
          if (["options", "block"].includes(o)) continue;
          let s = o, a = n.hooks[s], l = i[s];
          gs.passThroughHooks.has(o) ? i[s] = (c) => {
            if (this.defaults.async && gs.passThroughHooksRespectAsync.has(o)) return (async () => {
              let d = await a.call(i, c);
              return l.call(i, d);
            })();
            let u = a.call(i, c);
            return l.call(i, u);
          } : i[s] = (...c) => {
            if (this.defaults.async) return (async () => {
              let d = await a.apply(i, c);
              return d === !1 && (d = await l.apply(i, c)), d;
            })();
            let u = a.apply(i, c);
            return u === !1 && (u = l.apply(i, c)), u;
          };
        }
        r.hooks = i;
      }
      if (n.walkTokens) {
        let i = this.defaults.walkTokens, o = n.walkTokens;
        r.walkTokens = function(s) {
          let a = [];
          return a.push(o.call(this, s)), i && (a = a.concat(i.call(this, s))), a;
        };
      }
      this.defaults = { ...this.defaults, ...r };
    }), this;
  }
  setOptions(t) {
    return this.defaults = { ...this.defaults, ...t }, this;
  }
  lexer(t, e) {
    return Fr.lex(t, e ?? this.defaults);
  }
  parser(t, e) {
    return Hr.parse(t, e ?? this.defaults);
  }
  parseMarkdown(t) {
    return (e, n) => {
      let r = { ...n }, i = { ...this.defaults, ...r }, o = this.onError(!!i.silent, !!i.async);
      if (this.defaults.async === !0 && r.async === !1) return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof e > "u" || e === null) return o(new Error("marked(): input parameter is undefined or null"));
      if (typeof e != "string") return o(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected"));
      if (i.hooks && (i.hooks.options = i, i.hooks.block = t), i.async) return (async () => {
        let s = i.hooks ? await i.hooks.preprocess(e) : e, a = await (i.hooks ? await i.hooks.provideLexer() : t ? Fr.lex : Fr.lexInline)(s, i), l = i.hooks ? await i.hooks.processAllTokens(a) : a;
        i.walkTokens && await Promise.all(this.walkTokens(l, i.walkTokens));
        let c = await (i.hooks ? await i.hooks.provideParser() : t ? Hr.parse : Hr.parseInline)(l, i);
        return i.hooks ? await i.hooks.postprocess(c) : c;
      })().catch(o);
      try {
        i.hooks && (e = i.hooks.preprocess(e));
        let s = (i.hooks ? i.hooks.provideLexer() : t ? Fr.lex : Fr.lexInline)(e, i);
        i.hooks && (s = i.hooks.processAllTokens(s)), i.walkTokens && this.walkTokens(s, i.walkTokens);
        let a = (i.hooks ? i.hooks.provideParser() : t ? Hr.parse : Hr.parseInline)(s, i);
        return i.hooks && (a = i.hooks.postprocess(a)), a;
      } catch (s) {
        return o(s);
      }
    };
  }
  onError(t, e) {
    return (n) => {
      if (n.message += `
Please report this to https://github.com/markedjs/marked.`, t) {
        let r = "<p>An error occurred:</p><pre>" + Qr(n.message + "", !0) + "</pre>";
        return e ? Promise.resolve(r) : r;
      }
      if (e) return Promise.reject(n);
      throw n;
    };
  }
}, ro = new sE();
function fn(t, e) {
  return ro.parse(t, e);
}
fn.options = fn.setOptions = function(t) {
  return ro.setOptions(t), fn.defaults = ro.defaults, i1(fn.defaults), fn;
};
fn.getDefaults = xh;
fn.defaults = co;
fn.use = function(...t) {
  return ro.use(...t), fn.defaults = ro.defaults, i1(fn.defaults), fn;
};
fn.walkTokens = function(t, e) {
  return ro.walkTokens(t, e);
};
fn.parseInline = ro.parseInline;
fn.Parser = Hr;
fn.parser = Hr.parse;
fn.Renderer = el;
fn.TextRenderer = Ih;
fn.Lexer = Fr;
fn.lexer = Fr.lex;
fn.Tokenizer = Qa;
fn.Hooks = gs;
fn.parse = fn;
fn.options;
fn.setOptions;
fn.use;
fn.walkTokens;
fn.parseInline;
Hr.parse;
Fr.lex;
const aE = /* @__PURE__ */ wr("div")({
  name: "MarkdownContainer",
  class: "gdg-mnuv029",
  propsAsIs: !1
});
class lE extends Pt.PureComponent {
  constructor() {
    super(...arguments);
    Qe(this, "targetElement", null);
    Qe(this, "containerRefHook", (n) => {
      this.targetElement = n, this.renderMarkdownIntoDiv();
    });
  }
  renderMarkdownIntoDiv() {
    const { targetElement: n, props: r } = this;
    if (n === null)
      return;
    const { contents: i, createNode: o } = r, s = fn(i), a = document.createRange();
    a.selectNodeContents(n), a.deleteContents();
    let l = o == null ? void 0 : o(s);
    if (l === void 0) {
      const u = document.createElement("template");
      u.innerHTML = s, l = u.content;
    }
    n.append(l);
    const c = n.getElementsByTagName("a");
    for (const u of c)
      u.target = "_blank", u.rel = "noreferrer noopener";
  }
  render() {
    return this.renderMarkdownIntoDiv(), Pt.createElement(aE, { ref: this.containerRefHook });
  }
}
const cE = /* @__PURE__ */ wr("textarea")({
  name: "InputBox",
  class: "gdg-izpuzkl",
  propsAsIs: !1
}), uE = /* @__PURE__ */ wr("div")({
  name: "ShadowBox",
  class: "gdg-s69h75o",
  propsAsIs: !1
}), dE = /* @__PURE__ */ wr("div")({
  name: "GrowingEntryStyle",
  class: "gdg-g1y0xocz",
  propsAsIs: !1
});
let Pm = 0;
const js = (t) => {
  const { placeholder: e, value: n, onKeyDown: r, highlight: i, altNewline: o, validatedSelection: s, ...a } = t, { onChange: l, className: c } = a, u = w.useRef(null), d = n ?? "";
  mr(l !== void 0, "GrowingEntry must be a controlled input area");
  const [f] = w.useState(() => "input-box-" + (Pm = (Pm + 1) % 1e7));
  w.useEffect(() => {
    const p = u.current;
    if (p === null || p.disabled)
      return;
    const g = d.toString().length;
    p.focus(), p.setSelectionRange(i ? 0 : g, g);
  }, []), w.useLayoutEffect(() => {
    var p;
    if (s !== void 0) {
      const g = typeof s == "number" ? [s, null] : s;
      (p = u.current) == null || p.setSelectionRange(g[0], g[1]);
    }
  }, [s]);
  const h = w.useCallback((p) => {
    p.key === "Enter" && p.shiftKey && o === !0 || r == null || r(p);
  }, [o, r]);
  return w.createElement(
    dE,
    { className: "gdg-growing-entry" },
    w.createElement(uE, { className: c }, d + `
`),
    w.createElement(cE, { ...a, className: (c ?? "") + " gdg-input", id: f, ref: u, onKeyDown: h, value: d, placeholder: e, dir: "auto" })
  );
}, wu = {};
let Ci = null;
function fE() {
  const t = document.createElement("div");
  return t.style.opacity = "0", t.style.pointerEvents = "none", t.style.position = "fixed", document.body.append(t), t;
}
function Ef(t) {
  const e = t.toLowerCase().trim();
  if (wu[e] !== void 0)
    return wu[e];
  Ci = Ci || fE(), Ci.style.color = "#000", Ci.style.color = e;
  const n = getComputedStyle(Ci).color;
  Ci.style.color = "#fff", Ci.style.color = e;
  const r = getComputedStyle(Ci).color;
  if (r !== n)
    return [0, 0, 0, 1];
  let i = r.replace(/[^\d.,]/g, "").split(",").map(Number.parseFloat);
  return i.length < 4 && i.push(1), i = i.map((o) => {
    const s = Number.isNaN(o);
    return process.env.NODE_ENV !== "production" && s && console.warn("Could not parse color", t), s ? 0 : o;
  }), wu[e] = i, i;
}
function io(t, e) {
  const [n, r, i] = Ef(t);
  return `rgba(${n}, ${r}, ${i}, ${e})`;
}
const Dm = /* @__PURE__ */ new Map();
function Nm(t, e) {
  const n = `${t}-${e}`, r = Dm.get(n);
  if (r !== void 0)
    return r;
  const i = yr(t, e);
  return Dm.set(n, i), i;
}
function yr(t, e) {
  if (e === void 0)
    return t;
  const [n, r, i, o] = Ef(t);
  if (o === 1)
    return t;
  const [s, a, l, c] = Ef(e), u = o + c * (1 - o), d = (o * n + c * s * (1 - o)) / u, f = (o * r + c * a * (1 - o)) / u, h = (o * i + c * l * (1 - o)) / u;
  return `rgba(${d}, ${f}, ${h}, ${u})`;
}
var Mo = /* @__PURE__ */ new Map(), Po = /* @__PURE__ */ new Map(), Mf = /* @__PURE__ */ new Map();
function hE() {
  Mo.clear(), Mf.clear(), Po.clear();
}
function pE(t, e, n, r, i) {
  var o, s, a;
  let l = 0, c = {};
  for (let d of t) l += (o = n.get(d)) != null ? o : i, c[d] = ((s = c[d]) != null ? s : 0) + 1;
  let u = e - l;
  for (let d of Object.keys(c)) {
    let f = c[d], h = (a = n.get(d)) != null ? a : i, p = h * f / l, g = u * p * r / f, y = h + g;
    n.set(d, y);
  }
}
function gE(t, e) {
  var n;
  let r = /* @__PURE__ */ new Map(), i = 0;
  for (let c of "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,.-+=?") {
    let u = t.measureText(c).width;
    r.set(c, u), i += u;
  }
  let o = i / r.size, s = 3, a = (e / o + s) / (s + 1), l = r.keys();
  for (let c of l) r.set(c, ((n = r.get(c)) != null ? n : o) * a);
  return r;
}
function xs(t, e, n, r) {
  var i, o;
  let s = Po.get(n);
  if (r && s !== void 0 && s.count > 2e4) {
    let c = Mf.get(n);
    if (c === void 0 && (c = gE(t, s.size), Mf.set(n, c)), s.count > 5e5) {
      let d = 0;
      for (let f of e) d += (i = c.get(f)) != null ? i : s.size;
      return d * 1.01;
    }
    let u = t.measureText(e);
    return pE(e, u.width, c, Math.max(0.05, 1 - s.count / 2e5), s.size), Po.set(n, { count: s.count + e.length, size: s.size }), u.width;
  }
  let a = t.measureText(e), l = a.width / e.length;
  if (((o = s == null ? void 0 : s.count) != null ? o : 0) > 2e4) return a.width;
  if (s === void 0) Po.set(n, { count: e.length, size: l });
  else {
    let c = l - s.size, u = e.length / (s.count + e.length), d = s.size + c * u;
    Po.set(n, { count: s.count + e.length, size: d });
  }
  return a.width;
}
function mE(t, e, n, r, i, o, s, a) {
  if (e.length <= 1) return e.length;
  if (i < n) return -1;
  let l = Math.floor(n / i * o), c = xs(t, e.slice(0, Math.max(0, l)), r, s);
  if (c !== n) if (c < n) {
    for (; c < n; ) l++, c = xs(t, e.slice(0, Math.max(0, l)), r, s);
    l--;
  } else for (; c > n; ) {
    let u = e.lastIndexOf(" ", l - 1);
    u > 0 ? l = u : l--, c = xs(t, e.slice(0, Math.max(0, l)), r, s);
  }
  if (e[l] !== " ") {
    let u = 0;
    u = e.lastIndexOf(" ", l), u > 0 && (l = u);
  }
  return l;
}
function yE(t, e, n, r, i, o) {
  let s = `${e}_${n}_${r}px`, a = Mo.get(s);
  if (a !== void 0) return a;
  if (r <= 0) return [];
  let l = [], c = e.split(`
`), u = Po.get(n), d = u === void 0 ? e.length : r / u.size * 1.5, f = i && u !== void 0 && u.count > 2e4;
  for (let h of c) {
    let p = xs(t, h.slice(0, Math.max(0, d)), n, f), g = Math.min(h.length, d);
    if (p <= r) l.push(h);
    else {
      for (; p > r; ) {
        let y = mE(t, h, r, n, p, g, f), m = h.slice(0, Math.max(0, y));
        h = h.slice(m.length), l.push(m), p = xs(t, h.slice(0, Math.max(0, d)), n, f), g = Math.min(h.length, d);
      }
      p > 0 && l.push(h);
    }
  }
  return l = l.map((h, p) => p === 0 ? h.trimEnd() : h.trim()), Mo.set(s, l), Mo.size > 500 && Mo.delete(Mo.keys().next().value), l;
}
function bE(t, e) {
  return Pt.useMemo(() => t.map((n, r) => ({
    group: n.group,
    grow: n.grow,
    hasMenu: n.hasMenu,
    icon: n.icon,
    id: n.id,
    menuIcon: n.menuIcon,
    overlayIcon: n.overlayIcon,
    sourceIndex: r,
    sticky: r < e,
    indicatorIcon: n.indicatorIcon,
    style: n.style,
    themeOverride: n.themeOverride,
    title: n.title,
    trailingRowOptions: n.trailingRowOptions,
    width: n.width,
    growOffset: n.growOffset,
    rowMarker: n.rowMarker,
    rowMarkerChecked: n.rowMarkerChecked,
    headerRowMarkerTheme: n.headerRowMarkerTheme,
    headerRowMarkerAlwaysVisible: n.headerRowMarkerAlwaysVisible,
    headerRowMarkerDisabled: n.headerRowMarkerDisabled
  })), [t, e]);
}
function vE(t, e) {
  const [n, r] = e;
  if (t.columns.hasIndex(n) || t.rows.hasIndex(r))
    return !0;
  if (t.current !== void 0) {
    if (ks(t.current.cell, e))
      return !0;
    const i = [t.current.range, ...t.current.rangeStack];
    for (const o of i)
      if (n >= o.x && n < o.x + o.width && r >= o.y && r < o.y + o.height)
        return !0;
  }
  return !1;
}
function Ds(t, e) {
  return (t ?? "") === (e ?? "");
}
function wE(t, e, n) {
  return n.current === void 0 || t[1] !== n.current.cell[1] ? !1 : e.span === void 0 ? n.current.cell[0] === t[0] : n.current.cell[0] >= e.span[0] && n.current.cell[0] <= e.span[1];
}
function g1(t, e) {
  const [n, r] = t;
  return n >= e.x && n < e.x + e.width && r >= e.y && r < e.y + e.height;
}
function ks(t, e) {
  return (t == null ? void 0 : t[0]) === (e == null ? void 0 : e[0]) && (t == null ? void 0 : t[1]) === (e == null ? void 0 : e[1]);
}
function m1(t) {
  return [t.x + t.width - 1, t.y + t.height - 1];
}
function Om(t, e, n) {
  const r = n.x, i = n.x + n.width - 1, o = n.y, s = n.y + n.height - 1, [a, l] = t;
  if (l < o || l > s)
    return !1;
  if (e.span === void 0)
    return a >= r && a <= i;
  const [c, u] = e.span;
  return c >= r && c <= i || u >= r && c <= i || c < r && u > i;
}
function xE(t, e, n, r) {
  let i = 0;
  if (n.current === void 0)
    return i;
  const o = n.current.range;
  (r || o.height * o.width > 1) && Om(t, e, o) && i++;
  for (const s of n.current.rangeStack)
    Om(t, e, s) && i++;
  return i;
}
function y1(t, e) {
  let n = t;
  if (e !== void 0) {
    let r = [...t];
    const i = n[e.src];
    e.src > e.dest ? (r.splice(e.src, 1), r.splice(e.dest, 0, i)) : (r.splice(e.dest + 1, 0, i), r.splice(e.src, 1)), r = r.map((o, s) => ({
      ...o,
      sticky: t[s].sticky
    })), n = r;
  }
  return n;
}
function Wo(t, e) {
  let n = 0;
  const r = y1(t, e);
  for (let i = 0; i < r.length; i++) {
    const o = r[i];
    if (o.sticky)
      n += o.width;
    else
      break;
  }
  return n;
}
function uo(t, e, n) {
  if (typeof n == "number")
    return e * n;
  {
    let r = 0;
    for (let i = t - e; i < t; i++)
      r += n(i);
    return r;
  }
}
function If(t, e, n, r, i) {
  const o = y1(t, r), s = [];
  for (const c of o)
    if (c.sticky)
      s.push(c);
    else
      break;
  if (s.length > 0)
    for (const c of s)
      n -= c.width;
  let a = e, l = i ?? 0;
  for (; l <= n && a < o.length; )
    l += o[a].width, a++;
  for (let c = e; c < a; c++) {
    const u = o[c];
    u.sticky || s.push(u);
  }
  return s;
}
function kE(t, e, n) {
  let r = 0;
  for (const i of e) {
    const o = i.sticky ? r : r + (n ?? 0);
    if (t <= o + i.width)
      return i.sourceIndex;
    r += i.width;
  }
  return -1;
}
function SE(t, e, n, r, i, o, s, a, l, c) {
  const u = r + i;
  if (n && t <= i)
    return -2;
  if (t <= u)
    return -1;
  let d = e;
  for (let p = 0; p < c; p++) {
    const g = o - 1 - p, y = typeof s == "number" ? s : s(g);
    if (d -= y, t >= d)
      return g;
  }
  const f = o - c, h = t - (l ?? 0);
  if (typeof s == "number") {
    const p = Math.floor((h - u) / s) + a;
    return p >= f ? void 0 : p;
  } else {
    let p = u;
    for (let g = a; g < f; g++) {
      const y = s(g);
      if (h <= p + y)
        return g;
      p += y;
    }
    return;
  }
}
let Oa = 0, Ss = {};
const CE = typeof window > "u";
async function RE() {
  var t;
  CE || ((t = document == null ? void 0 : document.fonts) == null ? void 0 : t.ready) === void 0 || (await document.fonts.ready, Oa = 0, Ss = {}, hE());
}
RE();
function b1(t, e, n, r) {
  return `${t}_${r ?? (e == null ? void 0 : e.font)}_${n}`;
}
function Ko(t, e, n, r = "middle") {
  const i = b1(t, e, r, n);
  let o = Ss[i];
  return o === void 0 && (o = e.measureText(t), Ss[i] = o, Oa++), Oa > 1e4 && (Ss = {}, Oa = 0), o;
}
function v1(t, e) {
  const n = b1(t, void 0, "middle", e);
  return Ss[n];
}
function Oi(t, e) {
  return typeof e != "string" && (e = e.baseFontFull), TE(t, e);
}
function zm(t, e) {
  const n = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  t.save(), t.textBaseline = e;
  const r = t.measureText(n);
  return t.restore(), r;
}
const Lm = [];
function TE(t, e) {
  for (const o of Lm)
    if (o.key === e)
      return o.val;
  const n = zm(t, "alphabetic"), i = -(zm(t, "middle").actualBoundingBoxDescent - n.actualBoundingBoxDescent) + n.actualBoundingBoxAscent / 2;
  return Lm.push({
    key: e,
    val: i
  }), i;
}
function EE(t, e, n, r, i, o) {
  const { ctx: s, rect: a, theme: l } = t;
  let c = Number.MAX_SAFE_INTEGER;
  const u = 500;
  if (e !== void 0 && (c = n - e, c < u)) {
    const d = 1 - c / u;
    s.globalAlpha = d, s.fillStyle = l.bgSearchResult, s.fillRect(a.x + 1, a.y + 1, a.width - (i ? 2 : 1), a.height - (o ? 2 : 1)), s.globalAlpha = 1, r !== void 0 && (r.fillStyle = l.bgSearchResult);
  }
  return c < u;
}
function Ks(t, e, n) {
  const { ctx: r, theme: i } = t, o = e ?? {}, s = n ?? i.textDark;
  return s !== o.fillStyle && (r.fillStyle = s, o.fillStyle = s), o;
}
function w1(t, e, n, r, i, o, s, a, l) {
  l === "right" ? t.fillText(e, n + i - (a.cellHorizontalPadding + 0.5), r + o / 2 + s) : l === "center" ? t.fillText(e, n + i / 2, r + o / 2 + s) : t.fillText(e, n + a.cellHorizontalPadding + 0.5, r + o / 2 + s);
}
function x1(t, e) {
  const n = Ko("ABCi09jgqpy", t, e);
  return n.actualBoundingBoxAscent + n.actualBoundingBoxDescent;
}
function ME(t, e) {
  t.includes(`
`) && (t = t.split(/\r?\n/, 1)[0]);
  const n = e / 4;
  return t.length > n && (t = t.slice(0, n)), t;
}
function IE(t, e, n, r, i, o, s, a, l, c) {
  const u = a.baseFontFull, d = yE(t, e, u, i - a.cellHorizontalPadding * 2, c ?? !1), f = x1(t, u), h = a.lineHeight * f, p = f + h * (d.length - 1), g = p + a.cellVerticalPadding > o;
  g && (t.save(), t.rect(n, r, i, o), t.clip());
  const y = r + o / 2 - p / 2;
  let m = Math.max(r + a.cellVerticalPadding, y);
  for (const b of d)
    if (w1(t, b, n, m, i, f, s, a, l), m += h, m > r + o)
      break;
  g && t.restore();
}
function li(t, e, n, r, i) {
  const { ctx: o, rect: s, theme: a } = t, { x: l, y: c, width: u, height: d } = s;
  r = r ?? !1, r || (e = ME(e, u));
  const f = Oi(o, a), h = wh(e) === "rtl";
  if (n === void 0 && h && (n = "right"), h && (o.direction = "rtl"), e.length > 0) {
    let p = !1;
    n === "right" ? (o.textAlign = "right", p = !0) : n !== void 0 && n !== "left" && (o.textAlign = n, p = !0), r ? IE(o, e, l, c, u, d, f, a, n, i) : w1(o, e, l, c, u, d, f, a, n), p && (o.textAlign = "start"), h && (o.direction = "inherit");
  }
}
function ei(t, e, n, r, i, o) {
  typeof o == "number" && (o = { tl: o, tr: o, br: o, bl: o }), o = {
    tl: Math.max(0, Math.min(o.tl, i / 2, r / 2)),
    tr: Math.max(0, Math.min(o.tr, i / 2, r / 2)),
    bl: Math.max(0, Math.min(o.bl, i / 2, r / 2)),
    br: Math.max(0, Math.min(o.br, i / 2, r / 2))
  }, t.moveTo(e + o.tl, n), t.arcTo(e + r, n, e + r, n + o.tr, o.tr), t.arcTo(e + r, n + i, e + r - o.br, n + i, o.br), t.arcTo(e, n + i, e, n + i - o.bl, o.bl), t.arcTo(e, n, e + o.tl, n, o.tl);
}
function AE(t, e, n) {
  t.arc(e, n - 1.25 * 3.5, 1.25, 0, 2 * Math.PI, !1), t.arc(e, n, 1.25, 0, 2 * Math.PI, !1), t.arc(e, n + 1.25 * 3.5, 1.25, 0, 2 * Math.PI, !1);
}
function _E(t, e, n) {
  const r = function(a, l) {
    const c = l.x - a.x, u = l.y - a.y, d = Math.sqrt(c * c + u * u), f = c / d, h = u / d;
    return {
      x: c,
      y: l.y - a.y,
      len: d,
      nx: f,
      ny: h,
      ang: Math.atan2(h, f)
    };
  };
  let i;
  const o = e.length;
  let s = e[o - 1];
  for (let a = 0; a < o; a++) {
    let l = e[a % o];
    const c = e[(a + 1) % o], u = r(l, s), d = r(l, c), f = u.nx * d.ny - u.ny * d.nx, h = u.nx * d.nx - u.ny * -d.ny;
    let p = Math.asin(f < -1 ? -1 : f > 1 ? 1 : f), g = 1, y = !1;
    h < 0 ? p < 0 ? p = Math.PI + p : (p = Math.PI - p, g = -1, y = !0) : p > 0 && (g = -1, y = !0), i = l.radius !== void 0 ? l.radius : n;
    const m = p / 2;
    let b = Math.abs(Math.cos(m) * i / Math.sin(m)), C;
    b > Math.min(u.len / 2, d.len / 2) ? (b = Math.min(u.len / 2, d.len / 2), C = Math.abs(b * Math.sin(m) / Math.cos(m))) : C = i;
    let I = l.x + d.nx * b, v = l.y + d.ny * b;
    I += -d.ny * C * g, v += d.nx * C * g, t.arc(I, v, C, u.ang + Math.PI / 2 * g, d.ang - Math.PI / 2 * g, y), s = l, l = c;
  }
  t.closePath();
}
function Af(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p) {
  const g = {
    x: 0,
    y: o + c,
    width: 0,
    height: 0
  };
  if (t >= h.length || e >= u || e < -2 || t < 0)
    return g;
  const y = o - i;
  if (t >= d) {
    const m = s > t ? -1 : 1, b = Wo(h);
    g.x += b + l;
    for (let C = s; C !== t; C += m)
      g.x += h[m === 1 ? C : C - 1].width * m;
  } else
    for (let m = 0; m < t; m++)
      g.x += h[m].width;
  if (g.width = h[t].width + 1, e === -1)
    g.y = i, g.height = y;
  else if (e === -2) {
    g.y = 0, g.height = i;
    let m = t;
    const b = h[t].group, C = h[t].sticky;
    for (; m > 0 && Ds(h[m - 1].group, b) && h[m - 1].sticky === C; ) {
      const v = h[m - 1];
      g.x -= v.width, g.width += v.width, m--;
    }
    let I = t;
    for (; I + 1 < h.length && Ds(h[I + 1].group, b) && h[I + 1].sticky === C; ) {
      const v = h[I + 1];
      g.width += v.width, I++;
    }
    if (!C) {
      const v = Wo(h), T = g.x - v;
      T < 0 && (g.x -= T, g.width += T), g.x + g.width > n && (g.width = n - g.x);
    }
  } else if (e >= u - f) {
    let m = u - e;
    for (g.y = r; m > 0; ) {
      const b = e + m - 1;
      g.height = typeof p == "number" ? p : p(b), g.y -= g.height, m--;
    }
    g.height += 1;
  } else {
    const m = a > e ? -1 : 1;
    if (typeof p == "number") {
      const b = e - a;
      g.y += b * p;
    } else
      for (let b = a; b !== e; b += m)
        g.y += p(b) * m;
    g.height = (typeof p == "number" ? p : p(e)) + 1;
  }
  return g;
}
const Ah = 1 << 21;
function qr(t, e) {
  return (e + 2) * Ah + t;
}
function k1(t) {
  return t % Ah;
}
function _h(t) {
  return Math.floor(t / Ah) - 2;
}
function Ph(t) {
  const e = k1(t), n = _h(t);
  return [e, n];
}
class S1 {
  constructor() {
    Qe(this, "visibleWindow", {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    });
    Qe(this, "freezeCols", 0);
    Qe(this, "freezeRows", []);
    Qe(this, "isInWindow", (e) => {
      const n = k1(e), r = _h(e), i = this.visibleWindow, o = n >= i.x && n <= i.x + i.width || n < this.freezeCols, s = r >= i.y && r <= i.y + i.height || this.freezeRows.includes(r);
      return o && s;
    });
  }
  setWindow(e, n, r) {
    this.visibleWindow.x === e.x && this.visibleWindow.y === e.y && this.visibleWindow.width === e.width && this.visibleWindow.height === e.height && this.freezeCols === n && qo(this.freezeRows, r) || (this.visibleWindow = e, this.freezeCols = n, this.freezeRows = r, this.clearOutOfWindow());
  }
}
class PE extends S1 {
  constructor() {
    super(...arguments);
    Qe(this, "cache", /* @__PURE__ */ new Map());
    Qe(this, "setValue", (n, r) => {
      this.cache.set(qr(n[0], n[1]), r);
    });
    Qe(this, "getValue", (n) => this.cache.get(qr(n[0], n[1])));
    Qe(this, "clearOutOfWindow", () => {
      for (const [n] of this.cache.entries())
        this.isInWindow(n) || this.cache.delete(n);
    });
  }
}
class Cs {
  constructor(e = []) {
    Qe(this, "cells");
    this.cells = new Set(e.map((n) => qr(n[0], n[1])));
  }
  add(e) {
    this.cells.add(qr(e[0], e[1]));
  }
  has(e) {
    return e === void 0 ? !1 : this.cells.has(qr(e[0], e[1]));
  }
  remove(e) {
    this.cells.delete(qr(e[0], e[1]));
  }
  clear() {
    this.cells.clear();
  }
  get size() {
    return this.cells.size;
  }
  hasHeader() {
    for (const e of this.cells)
      if (_h(e) < 0)
        return !0;
    return !1;
  }
  hasItemInRectangle(e) {
    for (let n = e.y; n < e.y + e.height; n++)
      for (let r = e.x; r < e.x + e.width; r++)
        if (this.cells.has(qr(r, n)))
          return !0;
    return !1;
  }
  hasItemInRegion(e) {
    for (const n of e)
      if (this.hasItemInRectangle(n))
        return !0;
    return !1;
  }
  *values() {
    for (const e of this.cells)
      yield Ph(e);
  }
}
function DE(t) {
  return {
    "--gdg-accent-color": t.accentColor,
    "--gdg-accent-fg": t.accentFg,
    "--gdg-accent-light": t.accentLight,
    "--gdg-text-dark": t.textDark,
    "--gdg-text-medium": t.textMedium,
    "--gdg-text-light": t.textLight,
    "--gdg-text-bubble": t.textBubble,
    "--gdg-bg-icon-header": t.bgIconHeader,
    "--gdg-fg-icon-header": t.fgIconHeader,
    "--gdg-text-header": t.textHeader,
    "--gdg-text-group-header": t.textGroupHeader ?? t.textHeader,
    "--gdg-bg-group-header": t.bgGroupHeader ?? t.bgHeader,
    "--gdg-bg-group-header-hovered": t.bgGroupHeaderHovered ?? t.bgHeaderHovered,
    "--gdg-text-header-selected": t.textHeaderSelected,
    "--gdg-bg-cell": t.bgCell,
    "--gdg-bg-cell-medium": t.bgCellMedium,
    "--gdg-bg-header": t.bgHeader,
    "--gdg-bg-header-has-focus": t.bgHeaderHasFocus,
    "--gdg-bg-header-hovered": t.bgHeaderHovered,
    "--gdg-bg-bubble": t.bgBubble,
    "--gdg-bg-bubble-selected": t.bgBubbleSelected,
    "--gdg-bubble-height": `${t.bubbleHeight}px`,
    "--gdg-bubble-padding": `${t.bubblePadding}px`,
    "--gdg-bubble-margin": `${t.bubbleMargin}px`,
    "--gdg-bg-search-result": t.bgSearchResult,
    "--gdg-border-color": t.borderColor,
    "--gdg-horizontal-border-color": t.horizontalBorderColor ?? t.borderColor,
    "--gdg-drilldown-border": t.drilldownBorder,
    "--gdg-link-color": t.linkColor,
    "--gdg-cell-horizontal-padding": `${t.cellHorizontalPadding}px`,
    "--gdg-cell-vertical-padding": `${t.cellVerticalPadding}px`,
    "--gdg-header-font-style": t.headerFontStyle,
    "--gdg-base-font-style": t.baseFontStyle,
    "--gdg-marker-font-style": t.markerFontStyle,
    "--gdg-font-family": t.fontFamily,
    "--gdg-editor-font-size": t.editorFontSize,
    "--gdg-checkbox-max-size": `${t.checkboxMaxSize}px`,
    ...t.resizeIndicatorColor === void 0 ? {} : { "--gdg-resize-indicator-color": t.resizeIndicatorColor },
    ...t.headerBottomBorderColor === void 0 ? {} : { "--gdg-header-bottom-border-color": t.headerBottomBorderColor },
    ...t.roundingRadius === void 0 ? {} : { "--gdg-rounding-radius": `${t.roundingRadius}px` }
  };
}
const C1 = {
  accentColor: "#4F5DFF",
  accentFg: "#FFFFFF",
  accentLight: "rgba(62, 116, 253, 0.1)",
  textDark: "#313139",
  textMedium: "#737383",
  textLight: "#B2B2C0",
  textBubble: "#313139",
  bgIconHeader: "#737383",
  fgIconHeader: "#FFFFFF",
  textHeader: "#313139",
  textGroupHeader: "#313139BB",
  textHeaderSelected: "#FFFFFF",
  bgCell: "#FFFFFF",
  bgCellMedium: "#FAFAFB",
  bgHeader: "#F7F7F8",
  bgHeaderHasFocus: "#E9E9EB",
  bgHeaderHovered: "#EFEFF1",
  bgBubble: "#EDEDF3",
  bgBubbleSelected: "#FFFFFF",
  bubbleHeight: 20,
  bubblePadding: 6,
  bubbleMargin: 4,
  bgSearchResult: "#fff9e3",
  borderColor: "rgba(115, 116, 131, 0.16)",
  drilldownBorder: "rgba(0, 0, 0, 0)",
  linkColor: "#353fb5",
  cellHorizontalPadding: 8,
  cellVerticalPadding: 3,
  headerIconSize: 18,
  headerFontStyle: "600 13px",
  baseFontStyle: "13px",
  markerFontStyle: "9px",
  fontFamily: "Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif",
  editorFontSize: "13px",
  lineHeight: 1.4,
  //unitless scaler depends on your font
  checkboxMaxSize: 18
};
function Dh() {
  return C1;
}
const NE = Pt.createContext(C1);
function di(t, ...e) {
  const n = { ...t };
  for (const r of e)
    if (r !== void 0)
      for (const i in r)
        r.hasOwnProperty(i) && (i === "bgCell" ? n[i] = yr(r[i], n[i]) : n[i] = r[i]);
  return (n.headerFontFull === void 0 || t.fontFamily !== n.fontFamily || t.headerFontStyle !== n.headerFontStyle) && (n.headerFontFull = `${n.headerFontStyle} ${n.fontFamily}`), (n.baseFontFull === void 0 || t.fontFamily !== n.fontFamily || t.baseFontStyle !== n.baseFontStyle) && (n.baseFontFull = `${n.baseFontStyle} ${n.fontFamily}`), (n.markerFontFull === void 0 || t.fontFamily !== n.fontFamily || t.markerFontStyle !== n.markerFontStyle) && (n.markerFontFull = `${n.markerFontStyle} ${n.fontFamily}`), n;
}
const _f = 150;
function OE(t, e, n, r) {
  var o;
  const i = r(e);
  return ((o = i == null ? void 0 : i.measure) == null ? void 0 : o.call(i, t, e, n)) ?? _f;
}
function R1(t, e, n, r, i, o, s, a, l) {
  let c = 0;
  const u = i === void 0 ? [] : i.map((h) => {
    const p = OE(t, h[r], e, l);
    return c = Math.max(c, p), p;
  });
  if (u.length > 5 && a) {
    c = 0;
    let h = 0;
    for (const g of u)
      h += g;
    const p = h / u.length;
    for (let g = 0; g < u.length; g++)
      u[g] >= p * 2 ? u[g] = 0 : c = Math.max(c, u[g]);
  }
  const d = t.font;
  t.font = e.headerFontFull, c = Math.max(c, t.measureText(n.title).width + e.cellHorizontalPadding * 2 + (n.icon === void 0 ? 0 : 28)), t.font = d;
  const f = Math.max(Math.ceil(o), Math.min(Math.floor(s), Math.ceil(c)));
  return {
    ...n,
    width: f
  };
}
function zE(t, e, n, r, i, o, s, a, l) {
  const c = w.useRef(e), u = w.useRef(n), d = w.useRef(s);
  c.current = e, u.current = n, d.current = s;
  const [f, h] = w.useMemo(() => {
    if (typeof window > "u")
      return [null, null];
    const b = document.createElement("canvas");
    return b.style.display = "none", b.style.opacity = "0", b.style.position = "fixed", [b, b.getContext("2d", { alpha: !1 })];
  }, []);
  w.useLayoutEffect(() => (f && document.documentElement.append(f), () => {
    f == null || f.remove();
  }), [f]);
  const p = w.useRef({}), g = w.useRef(), [y, m] = w.useState();
  return w.useLayoutEffect(() => {
    const b = u.current;
    if (b === void 0 || t.every(va))
      return;
    let C = Math.max(1, 10 - Math.floor(t.length / 1e4)), I = 0;
    C < c.current && C > 1 && (C--, I = 1);
    const v = {
      x: 0,
      y: 0,
      width: t.length,
      height: Math.min(c.current, C)
    }, T = {
      x: 0,
      y: c.current - 1,
      width: t.length,
      height: 1
    };
    (async () => {
      const P = b(v, l.signal), S = I > 0 ? b(T, l.signal) : void 0;
      let z;
      typeof P == "object" ? z = P : z = await Kg(P), S !== void 0 && (typeof S == "object" ? z = [...z, ...S] : z = [...z, ...await Kg(S)]), g.current = t, m(z);
    })();
  }, [l.signal, t]), w.useMemo(() => {
    let C = t.every(va) ? t : h === null ? t.map((D) => va(D) ? D : {
      ...D,
      width: _f
    }) : (h.font = d.current.baseFontFull, t.map((D, P) => {
      if (va(D))
        return D;
      if (p.current[D.id] !== void 0)
        return {
          ...D,
          width: p.current[D.id]
        };
      if (y === void 0 || g.current !== t || D.id === void 0)
        return {
          ...D,
          width: _f
        };
      const S = R1(h, s, D, P, y, i, o, !0, a);
      return p.current[D.id] = S.width, S;
    })), I = 0, v = 0;
    const T = [];
    for (const [D, P] of C.entries())
      I += P.width, P.grow !== void 0 && P.grow > 0 && (v += P.grow, T.push(D));
    if (I < r && T.length > 0) {
      const D = [...C], P = r - I;
      let S = P;
      for (let z = 0; z < T.length; z++) {
        const k = T[z], x = (C[k].grow ?? 0) / v, M = z === T.length - 1 ? S : Math.min(S, Math.floor(P * x));
        D[k] = {
          ...C[k],
          growOffset: M,
          width: C[k].width + M
        }, S -= M;
      }
      C = D;
    }
    return {
      sizedColumns: C,
      nonGrowWidth: I
    };
  }, [r, t, h, y, s, i, o, a]);
}
var xu, $m;
function LE() {
  if ($m) return xu;
  $m = 1;
  function t(e, n, r) {
    return e === e && (r !== void 0 && (e = e <= r ? e : r), n !== void 0 && (e = e >= n ? e : n)), e;
  }
  return xu = t, xu;
}
var ku, Fm;
function $E() {
  if (Fm) return ku;
  Fm = 1;
  var t = LE(), e = bh();
  function n(r, i, o) {
    return o === void 0 && (o = i, i = void 0), o !== void 0 && (o = e(o), o = o === o ? o : 0), i !== void 0 && (i = e(i), i = i === i ? i : 0), t(e(r), i, o);
  }
  return ku = n, ku;
}
var FE = $E();
const Er = /* @__PURE__ */ Ni(FE);
var Su, Hm;
function HE() {
  if (Hm) return Su;
  Hm = 1;
  var t = "__lodash_hash_undefined__";
  function e(n) {
    return this.__data__.set(n, t), this;
  }
  return Su = e, Su;
}
var Cu, Bm;
function BE() {
  if (Bm) return Cu;
  Bm = 1;
  function t(e) {
    return this.__data__.has(e);
  }
  return Cu = t, Cu;
}
var Ru, qm;
function T1() {
  if (qm) return Ru;
  qm = 1;
  var t = uh(), e = HE(), n = BE();
  function r(i) {
    var o = -1, s = i == null ? 0 : i.length;
    for (this.__data__ = new t(); ++o < s; )
      this.add(i[o]);
  }
  return r.prototype.add = r.prototype.push = e, r.prototype.has = n, Ru = r, Ru;
}
var Tu, Wm;
function qE() {
  if (Wm) return Tu;
  Wm = 1;
  function t(e, n, r, i) {
    for (var o = e.length, s = r + (i ? 1 : -1); i ? s-- : ++s < o; )
      if (n(e[s], s, e))
        return s;
    return -1;
  }
  return Tu = t, Tu;
}
var Eu, jm;
function WE() {
  if (jm) return Eu;
  jm = 1;
  function t(e) {
    return e !== e;
  }
  return Eu = t, Eu;
}
var Mu, Km;
function jE() {
  if (Km) return Mu;
  Km = 1;
  function t(e, n, r) {
    for (var i = r - 1, o = e.length; ++i < o; )
      if (e[i] === n)
        return i;
    return -1;
  }
  return Mu = t, Mu;
}
var Iu, Um;
function KE() {
  if (Um) return Iu;
  Um = 1;
  var t = qE(), e = WE(), n = jE();
  function r(i, o, s) {
    return o === o ? n(i, o, s) : t(i, e, s);
  }
  return Iu = r, Iu;
}
var Au, Gm;
function UE() {
  if (Gm) return Au;
  Gm = 1;
  var t = KE();
  function e(n, r) {
    var i = n == null ? 0 : n.length;
    return !!i && t(n, r, 0) > -1;
  }
  return Au = e, Au;
}
var _u, Ym;
function GE() {
  if (Ym) return _u;
  Ym = 1;
  function t(e, n, r) {
    for (var i = -1, o = e == null ? 0 : e.length; ++i < o; )
      if (r(n, e[i]))
        return !0;
    return !1;
  }
  return _u = t, _u;
}
var Pu, Xm;
function E1() {
  if (Xm) return Pu;
  Xm = 1;
  function t(e, n) {
    return e.has(n);
  }
  return Pu = t, Pu;
}
var Du, Vm;
function M1() {
  if (Vm) return Du;
  Vm = 1;
  var t = lo(), e = ii(), n = t(e, "Set");
  return Du = n, Du;
}
var Nu, Jm;
function YE() {
  if (Jm) return Nu;
  Jm = 1;
  function t() {
  }
  return Nu = t, Nu;
}
var Ou, Zm;
function Nh() {
  if (Zm) return Ou;
  Zm = 1;
  function t(e) {
    var n = -1, r = Array(e.size);
    return e.forEach(function(i) {
      r[++n] = i;
    }), r;
  }
  return Ou = t, Ou;
}
var zu, Qm;
function XE() {
  if (Qm) return zu;
  Qm = 1;
  var t = M1(), e = YE(), n = Nh(), r = 1 / 0, i = t && 1 / n(new t([, -0]))[1] == r ? function(o) {
    return new t(o);
  } : e;
  return zu = i, zu;
}
var Lu, e0;
function VE() {
  if (e0) return Lu;
  e0 = 1;
  var t = T1(), e = UE(), n = GE(), r = E1(), i = XE(), o = Nh(), s = 200;
  function a(l, c, u) {
    var d = -1, f = e, h = l.length, p = !0, g = [], y = g;
    if (u)
      p = !1, f = n;
    else if (h >= s) {
      var m = c ? null : i(l);
      if (m)
        return o(m);
      p = !1, f = r, y = new t();
    } else
      y = c ? [] : g;
    e:
      for (; ++d < h; ) {
        var b = l[d], C = c ? c(b) : b;
        if (b = u || b !== 0 ? b : 0, p && C === C) {
          for (var I = y.length; I--; )
            if (y[I] === C)
              continue e;
          c && y.push(C), g.push(b);
        } else f(y, C, u) || (y !== g && y.push(C), g.push(b));
      }
    return g;
  }
  return Lu = a, Lu;
}
var $u, t0;
function JE() {
  if (t0) return $u;
  t0 = 1;
  var t = VE();
  function e(n) {
    return n && n.length ? t(n) : [];
  }
  return $u = e, $u;
}
var ZE = JE();
const QE = /* @__PURE__ */ Ni(ZE);
var Fu, n0;
function I1() {
  if (n0) return Fu;
  n0 = 1;
  function t(e, n) {
    for (var r = -1, i = n.length, o = e.length; ++r < i; )
      e[o + r] = n[r];
    return e;
  }
  return Fu = t, Fu;
}
var Hu, r0;
function eM() {
  if (r0) return Hu;
  r0 = 1;
  var t = Hs(), e = dh(), n = ri(), r = t ? t.isConcatSpreadable : void 0;
  function i(o) {
    return n(o) || e(o) || !!(r && o && o[r]);
  }
  return Hu = i, Hu;
}
var Bu, i0;
function tM() {
  if (i0) return Bu;
  i0 = 1;
  var t = I1(), e = eM();
  function n(r, i, o, s, a) {
    var l = -1, c = r.length;
    for (o || (o = e), a || (a = []); ++l < c; ) {
      var u = r[l];
      i > 0 && o(u) ? i > 1 ? n(u, i - 1, o, s, a) : t(a, u) : s || (a[a.length] = u);
    }
    return a;
  }
  return Bu = n, Bu;
}
var qu, o0;
function nM() {
  if (o0) return qu;
  o0 = 1;
  var t = tM();
  function e(n) {
    var r = n == null ? 0 : n.length;
    return r ? t(n, 1) : [];
  }
  return qu = e, qu;
}
var rM = nM();
const s0 = /* @__PURE__ */ Ni(rM);
var Wu, a0;
function iM() {
  if (a0) return Wu;
  a0 = 1;
  var t = Math.ceil, e = Math.max;
  function n(r, i, o, s) {
    for (var a = -1, l = e(t((i - r) / (o || 1)), 0), c = Array(l); l--; )
      c[s ? l : ++a] = r, r += o;
    return c;
  }
  return Wu = n, Wu;
}
var ju, l0;
function Oh() {
  if (l0) return ju;
  l0 = 1;
  var t = $v(), e = hh();
  function n(r) {
    return r != null && e(r.length) && !t(r);
  }
  return ju = n, ju;
}
var Ku, c0;
function oM() {
  if (c0) return Ku;
  c0 = 1;
  var t = lh(), e = Oh(), n = fh(), r = ao();
  function i(o, s, a) {
    if (!r(a))
      return !1;
    var l = typeof s;
    return (l == "number" ? e(a) && n(s, a.length) : l == "string" && s in a) ? t(a[s], o) : !1;
  }
  return Ku = i, Ku;
}
var Uu, u0;
function sM() {
  if (u0) return Uu;
  u0 = 1;
  var t = bh(), e = 1 / 0, n = 17976931348623157e292;
  function r(i) {
    if (!i)
      return i === 0 ? i : 0;
    if (i = t(i), i === e || i === -e) {
      var o = i < 0 ? -1 : 1;
      return o * n;
    }
    return i === i ? i : 0;
  }
  return Uu = r, Uu;
}
var Gu, d0;
function aM() {
  if (d0) return Gu;
  d0 = 1;
  var t = iM(), e = oM(), n = sM();
  function r(i) {
    return function(o, s, a) {
      return a && typeof a != "number" && e(o, s, a) && (s = a = void 0), o = n(o), s === void 0 ? (s = o, o = 0) : s = n(s), a = a === void 0 ? o < s ? 1 : -1 : n(a), t(o, s, a, i);
    };
  }
  return Gu = r, Gu;
}
var Yu, f0;
function lM() {
  if (f0) return Yu;
  f0 = 1;
  var t = aM(), e = t();
  return Yu = e, Yu;
}
var cM = lM();
const Yi = /* @__PURE__ */ Ni(cM), kn = '<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">', uM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${kn}<rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/><path d="M15.75 4h-1.5a.25.25 0 0 0-.177.074L9.308 8.838a3.75 3.75 0 1 0 1.854 1.854l1.155-1.157.967.322a.5.5 0 0 0 .65-.55l-.18-1.208.363-.363.727.331a.5.5 0 0 0 .69-.59l-.254-.904.647-.647A.25.25 0 0 0 16 5.75v-1.5a.25.25 0 0 0-.25-.25zM7.5 13.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z" fill="${e}"/></svg>`;
}, dM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${kn}<rect x="2" y="2" width="16" height="16" rx="4" fill="${n}"/><path d="m12.223 13.314 3.052-2.826a.65.65 0 0 0 0-.984l-3.052-2.822c-.27-.25-.634-.242-.865.022-.232.263-.206.636.056.882l2.601 2.41-2.601 2.41c-.262.245-.288.619-.056.882.231.263.595.277.865.026Zm-4.444.005c.266.25.634.241.866-.027.231-.263.206-.636-.06-.882L5.983 10l2.602-2.405c.266-.25.291-.62.06-.887-.232-.263-.596-.272-.866-.022L4.723 9.51a.653.653 0 0 0 0 .983l3.056 2.827Z" fill="${e}"/></svg>`;
}, fM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
    <path d="M16.22 2H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.77-.8 1.77-1.78L18 3.78C18 2.8 17.2 2 16.22 2z" fill="${n}"/>
    <path d="M6.52 12.78H5.51V8.74l-1.33.47v-.87l2.29-.83h.05v5.27zm5.2 0H8.15v-.69l1.7-1.83a6.38 6.38 0 0 0 .34-.4c.09-.11.16-.22.22-.32s.1-.19.12-.27a.9.9 0 0 0 0-.56.63.63 0 0 0-.15-.23.58.58 0 0 0-.22-.15.75.75 0 0 0-.29-.05c-.27 0-.48.08-.62.23a.95.95 0 0 0-.2.65H8.03c0-.24.04-.46.13-.67a1.67 1.67 0 0 1 .97-.91c.23-.1.49-.14.77-.14.26 0 .5.04.7.11.21.08.38.18.52.32.14.13.25.3.32.48a1.74 1.74 0 0 1 .03 1.13 2.05 2.05 0 0 1-.24.47 4.16 4.16 0 0 1-.35.47l-.47.5-1 1.05h2.32v.8zm1.8-3.08h.55c.28 0 .48-.06.61-.2a.76.76 0 0 0 .2-.55.8.8 0 0 0-.05-.28.56.56 0 0 0-.13-.22.6.6 0 0 0-.23-.15.93.93 0 0 0-.32-.05.92.92 0 0 0-.29.05.72.72 0 0 0-.23.12.57.57 0 0 0-.21.46H12.4a1.3 1.3 0 0 1 .5-1.04c.15-.13.33-.23.54-.3a2.48 2.48 0 0 1 1.4 0c.2.06.4.15.55.28.15.13.27.28.36.47.08.19.13.4.13.65a1.15 1.15 0 0 1-.2.65 1.36 1.36 0 0 1-.58.49c.15.05.28.12.38.2a1.14 1.14 0 0 1 .43.62c.03.13.05.26.05.4 0 .25-.05.47-.14.66a1.42 1.42 0 0 1-.4.49c-.16.13-.35.23-.58.3a2.51 2.51 0 0 1-.73.1c-.22 0-.44-.03-.65-.09a1.8 1.8 0 0 1-.57-.28 1.43 1.43 0 0 1-.4-.47 1.41 1.41 0 0 1-.15-.66h1a.66.66 0 0 0 .22.5.87.87 0 0 0 .58.2c.25 0 .45-.07.6-.2a.71.71 0 0 0 .21-.56.97.97 0 0 0-.06-.36.61.61 0 0 0-.18-.25.74.74 0 0 0-.28-.15 1.33 1.33 0 0 0-.37-.04h-.55V9.7z" fill="${e}"/>
  </svg>`;
}, hM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${n}"/>
  <path d="M8.182 12.4h3.636l.655 1.6H14l-3.454-8H9.455L6 14h1.527l.655-1.6zM10 7.44l1.36 3.651H8.64L10 7.441z" fill="${e}"/>
</svg>`;
}, pM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
    <path
        d="M16.2222 2H3.77778C2.8 2 2 2.8 2 3.77778V16.2222C2 17.2 2.8 18 3.77778 18H16.2222C17.2 18 17.9911 17.2 17.9911 16.2222L18 3.77778C18 2.8 17.2 2 16.2222 2Z"
        fill="${n}"
    />
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.66667 6.66669C5.73368 6.66669 4.16667 8.15907 4.16667 10C4.16667 11.841 5.73368 13.3334 7.66667 13.3334H12.3333C14.2663 13.3334 15.8333 11.841 15.8333 10C15.8333 8.15907 14.2663 6.66669 12.3333 6.66669H7.66667ZM12.5 12.5C13.8807 12.5 15 11.3807 15 10C15 8.61931 13.8807 7.50002 12.5 7.50002C11.1193 7.50002 10 8.61931 10 10C10 11.3807 11.1193 12.5 12.5 12.5Z"
        fill="${e}"
    />
</svg>`;
}, A1 = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
<path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${n}"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.29 4.947a3.368 3.368 0 014.723.04 3.375 3.375 0 01.041 4.729l-.009.009-1.596 1.597a3.367 3.367 0 01-5.081-.364.71.71 0 011.136-.85 1.95 1.95 0 002.942.21l1.591-1.593a1.954 1.954 0 00-.027-2.733 1.95 1.95 0 00-2.732-.027l-.91.907a.709.709 0 11-1.001-1.007l.915-.911.007-.007z" fill="${e}"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.55 8.678a3.368 3.368 0 015.082.364.71.71 0 01-1.136.85 1.95 1.95 0 00-2.942-.21l-1.591 1.593a1.954 1.954 0 00.027 2.733 1.95 1.95 0 002.73.028l.906-.906a.709.709 0 111.003 1.004l-.91.91-.008.01a3.368 3.368 0 01-4.724-.042 3.375 3.375 0 01-.041-4.728l.009-.009L6.55 8.678z" fill="${e}"/>
</svg>
  `;
}, gM = (t) => {
  const e = t.bgColor;
  return `${kn}
    <path stroke="${e}" stroke-width="2" d="M12 3v14"/>
    <path stroke="${e}" stroke-width="2" stroke-linecap="round" d="M10 4h4m-4 12h4"/>
    <path d="M11 14h4a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-4v2h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4v2ZM9.5 8H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h4.5v2H5a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h4.5v2Z" fill="${e}"/>
  </svg>
`;
}, mM = A1, yM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${n}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M7 13.138a.5.5 0 00.748.434l5.492-3.138a.5.5 0 000-.868L7.748 6.427A.5.5 0 007 6.862v6.276z" fill="${e}"/>
</svg>`;
}, bM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${kn}
    <path d="M10 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 9.17A4.17 4.17 0 0 1 5.83 10 4.17 4.17 0 0 1 10 5.83 4.17 4.17 0 0 1 14.17 10 4.17 4.17 0 0 1 10 14.17z" fill="${e}"/>
    <path d="M8.33 8.21a.83.83 0 1 0-.03 1.67.83.83 0 0 0 .03-1.67zm3.34 0a.83.83 0 1 0-.04 1.67.83.83 0 0 0 .04-1.67z" fill="${e}"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.53 13.9a2.82 2.82 0 0 1-5.06 0l.77-.38a1.97 1.97 0 0 0 3.52 0l.77.39z" fill="${e}"/>
    <path d="M16.22 2H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.77-.8 1.77-1.78L18 3.78C18 2.8 17.2 2 16.22 2z" fill="${n}"/>
    <path d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 11a5 5 0 1 1 .01-10.01A5 5 0 0 1 10 15z" fill="${e}"/>
    <path d="M8 7.86a1 1 0 1 0-.04 2 1 1 0 0 0 .04-2zm4 0a1 1 0 1 0-.04 2 1 1 0 0 0 .04-2z" fill="${e}"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.53 11.9a2.82 2.82 0 0 1-5.06 0l.77-.38a1.97 1.97 0 0 0 3.52 0l.77.39z" fill="${e}"/>
  </svg>`;
}, vM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${n}"/>
  <path opacity=".5" fill-rule="evenodd" clip-rule="evenodd" d="M12.499 10.801a.5.5 0 01.835 0l2.698 4.098a.5.5 0 01-.418.775H10.22a.5.5 0 01-.417-.775l2.697-4.098z" fill="${e}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.07 8.934a.5.5 0 01.824 0l4.08 5.958a.5.5 0 01-.412.782h-8.16a.5.5 0 01-.413-.782l4.08-5.958zM13.75 8.333a2.083 2.083 0 100-4.166 2.083 2.083 0 000 4.166z" fill="${e}"/>
</svg>`;
}, wM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${kn}
    <path fill="${e}" d="M3 3h14v14H3z"/>
    <path d="M16.22 2H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.77-.8 1.77-1.78L18 3.78C18 2.8 17.2 2 16.22 2zm-7.24 9.78h1.23c.15 0 .27.06.36.18l.98 1.28a.43.43 0 0 1-.05.58l-1.2 1.21a.45.45 0 0 1-.6.04A6.72 6.72 0 0 1 7.33 10c0-.61.1-1.2.25-1.78a6.68 6.68 0 0 1 2.12-3.3.44.44 0 0 1 .6.04l1.2 1.2c.16.17.18.42.05.59l-.98 1.29a.43.43 0 0 1-.36.17H8.98A5.38 5.38 0 0 0 8.67 10c0 .62.11 1.23.3 1.79z" fill="${n}"/>
  </svg>`;
}, xM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${kn}
    <path d="M16.22 2H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.77-.8 1.77-1.78L18 3.78C18 2.8 17.2 2 16.22 2z" fill="${n}"/>
    <path d="m13.49 13.15-2.32-3.27h1.4V7h1.86v2.88h1.4l-2.34 3.27zM11 13H9v-3l-1.5 1.92L6 10v3H4V7h2l1.5 2L9 7h2v6z" fill="${e}"/>
  </svg>`;
}, kM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${n}"/>
  <path d="M14.8 4.182h-.6V3H13v1.182H7V3H5.8v1.182h-.6c-.66 0-1.2.532-1.2 1.182v9.454C4 15.468 4.54 16 5.2 16h9.6c.66 0 1.2-.532 1.2-1.182V5.364c0-.65-.54-1.182-1.2-1.182zm0 10.636H5.2V7.136h9.6v7.682z" fill="${e}"/>
</svg>`;
}, SM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${kn}
    <path d="M16.22 2H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.77-.8 1.77-1.78L18 3.78C18 2.8 17.2 2 16.22 2z" fill="${n}"/>
    <path d="M10 4a6 6 0 0 0-6 6 6 6 0 0 0 6 6 6 6 0 0 0 6-6 6 6 0 0 0-6-6zm0 10.8A4.8 4.8 0 0 1 5.2 10a4.8 4.8 0 1 1 4.8 4.8z" fill="${e}"/>
    <path d="M10 7H9v3.93L12.5 13l.5-.8-3-1.76V7z" fill="${e}"/>
  </svg>`;
}, CM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 8.643a1.357 1.357 0 100 2.714 1.357 1.357 0 000-2.714zM7.357 10a2.643 2.643 0 115.286 0 2.643 2.643 0 01-5.286 0z" fill="${e}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.589 4.898A5.643 5.643 0 0115.643 10v.5a2.143 2.143 0 01-4.286 0V8a.643.643 0 011.286 0v2.5a.857.857 0 001.714 0V10a4.357 4.357 0 10-1.708 3.46.643.643 0 01.782 1.02 5.643 5.643 0 11-5.842-9.582z" fill="${e}"/>
</svg>`;
}, RM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${kn}
    <rect x="2" y="8" width="10" height="8" rx="2" fill="${n}"/>
    <rect x="8" y="4" width="10" height="8" rx="2" fill="${n}"/>
    <path d="M10.68 7.73V6l2.97 3.02-2.97 3.02v-1.77c-2.13 0-3.62.7-4.68 2.2.43-2.15 1.7-4.31 4.68-4.74z" fill="${e}"/>
  </svg>`;
}, TM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
  <path fill="${e}" d="M4 3h12v14H4z"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.6 2A1.6 1.6 0 002 3.6v12.8A1.6 1.6 0 003.6 18h12.8a1.6 1.6 0 001.6-1.6V3.6A1.6 1.6 0 0016.4 2H3.6zm11.3 10.8a.7.7 0 01.7.7v1.4a.7.7 0 01-.7.7h-1.4a.7.7 0 01-.7-.7v-1.4a.7.7 0 01.6-.693.117.117 0 00.1-.115V10.35a.117.117 0 00-.117-.116h-2.8a.117.117 0 00-.117.116v2.333c0 .064.053.117.117.117h.117a.7.7 0 01.7.7v1.4a.7.7 0 01-.7.7H9.3a.7.7 0 01-.7-.7v-1.4a.7.7 0 01.7-.7h.117a.117.117 0 00.117-.117V10.35a.117.117 0 00-.117-.117h-2.8a.117.117 0 00-.117.117v2.342c0 .058.042.106.1.115a.7.7 0 01.6.693v1.4a.7.7 0 01-.7.7H5.1a.7.7 0 01-.7-.7v-1.4a.7.7 0 01.7-.7h.35a.116.116 0 00.116-.117v-2.45c0-.515.418-.933.934-.933h2.917a.117.117 0 00.117-.117V6.85a.117.117 0 00-.117-.116h-2.45a.7.7 0 01-.7-.7V5.1a.7.7 0 01.7-.7h6.067a.7.7 0 01.7.7v.934a.7.7 0 01-.7.7h-2.45a.117.117 0 00-.118.116v2.333c0 .064.053.117.117.117H13.5c.516 0 .934.418.934.934v2.45c0 .063.052.116.116.116h.35z" fill="${n}"/>
</svg>`;
}, EM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${kn}
    <rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/>
    <path d="M9.98 13.33c.45 0 .74-.3.73-.75l-.01-.1-.16-1.67 1.45 1.05a.81.81 0 0 0 .5.18c.37 0 .72-.32.72-.76 0-.3-.17-.54-.49-.68l-1.63-.77 1.63-.77c.32-.14.49-.37.49-.67 0-.45-.34-.76-.71-.76a.81.81 0 0 0-.5.18l-1.47 1.03.16-1.74.01-.08c.01-.46-.27-.76-.72-.76-.46 0-.76.32-.75.76l.01.08.16 1.74-1.47-1.03a.77.77 0 0 0-.5-.18.74.74 0 0 0-.72.76c0 .3.17.53.49.67l1.63.77-1.62.77c-.32.14-.5.37-.5.68 0 .44.35.75.72.75a.78.78 0 0 0 .5-.17L9.4 10.8l-.16 1.68v.09c-.02.44.28.75.74.75z" fill="${e}"/>
  </svg>`;
}, MM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${kn}
    <rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/>
    <path d="M8 5.83H5.83a.83.83 0 0 0 0 1.67h1.69A4.55 4.55 0 0 1 8 5.83zm-.33 3.34H5.83a.83.83 0 0 0 0 1.66h2.72a4.57 4.57 0 0 1-.88-1.66zM5.83 12.5a.83.83 0 0 0 0 1.67h7.5a.83.83 0 1 0 0-1.67h-7.5zm8.8-2.9a3.02 3.02 0 0 0 .46-1.6c0-1.66-1.32-3-2.94-3C10.52 5 9.2 6.34 9.2 8s1.31 3 2.93 3c.58 0 1.11-.17 1.56-.47l2.04 2.08.93-.94-2.04-2.08zm-2.48.07c-.9 0-1.63-.75-1.63-1.67s.73-1.67 1.63-1.67c.9 0 1.63.75 1.63 1.67s-.73 1.67-1.63 1.67z" fill="${e}"/>
  </svg>`;
}, IM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/>
  <path d="M7.676 4.726V3l2.976 3.021-2.976 3.022v-1.77c-2.125 0-3.613.69-4.676 2.201.425-2.158 1.7-4.316 4.676-4.748zM10.182 14.4h3.636l.655 1.6H16l-3.454-8h-1.091L8 16h1.527l.655-1.6zM12 9.44l1.36 3.65h-2.72L12 9.44z" fill="${e}"/>
</svg>`;
}, AM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.167 5.417a.833.833 0 100 1.666h4.166a.833.833 0 100-1.666H4.167z" fill="${e}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.083 4.167a.833.833 0 10-1.666 0v4.166a.833.833 0 101.666 0V4.167zM11.667 5.417a.833.833 0 100 1.666h4.166a.833.833 0 100-1.666h-4.166zM5.367 11.688a.833.833 0 00-1.179 1.179l2.947 2.946a.833.833 0 001.178-1.178l-2.946-2.947z" fill="${e}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.313 12.867a.833.833 0 10-1.178-1.179l-2.947 2.947a.833.833 0 101.179 1.178l2.946-2.946z" fill="${e}"/>
  <path d="M10.833 12.5c0-.46.373-.833.834-.833h4.166a.833.833 0 110 1.666h-4.166a.833.833 0 01-.834-.833zM10.833 15c0-.46.373-.833.834-.833h4.166a.833.833 0 110 1.666h-4.166a.833.833 0 01-.834-.833z" fill="${e}"/>
</svg>`;
}, _M = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${kn}
    <path d="M16.22 2H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.77-.8 1.77-1.78L18 3.78C18 2.8 17.2 2 16.22 2z" fill="${n}"/>
    <path d="M10 8.84a1.16 1.16 0 1 0 0 2.32 1.16 1.16 0 0 0 0-2.32zm3.02 3.61a3.92 3.92 0 0 0 .78-3.28.49.49 0 1 0-.95.2c.19.87-.02 1.78-.58 2.47a2.92 2.92 0 1 1-4.13-4.08 2.94 2.94 0 0 1 2.43-.62.49.49 0 1 0 .17-.96 3.89 3.89 0 1 0 2.28 6.27zM10 4.17a5.84 5.84 0 0 0-5.44 7.93.49.49 0 1 0 .9-.35 4.86 4.86 0 1 1 2.5 2.67.49.49 0 1 0-.4.88c.76.35 1.6.54 2.44.53a5.83 5.83 0 0 0 0-11.66zm3.02 3.5a.7.7 0 1 0-1.4 0 .7.7 0 0 0 1.4 0zm-6.97 5.35a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4z" fill="${e}"/>
  </svg>`;
}, PM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/>
  <path d="M12.4 13.565c1.865-.545 3.645-2.083 3.645-4.396 0-1.514-.787-2.604-2.071-2.604C12.69 6.565 12 7.63 12 8.939c1.114.072 1.865.726 1.865 1.683 0 .933-.8 1.647-1.84 2.023l.375.92zM4 5h6v2H4zM4 9h5v2H4zM4 13h4v2H4z" fill="${e}"/>
</svg>`;
}, DM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${kn}
    <rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/>
    <path d="M12.4 13.56c1.86-.54 3.65-2.08 3.65-4.4 0-1.5-.8-2.6-2.08-2.6S12 7.64 12 8.95c1.11.07 1.86.73 1.86 1.68 0 .94-.8 1.65-1.83 2.03l.37.91zM4 5h6v2H4zm0 4h5v2H4zm0 4h4v2H4z" fill="${e}"/>
  </svg>`;
}, NM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${n}"/>
  <path d="M10 7a1 1 0 100-2v2zm0 6a1 1 0 100 2v-2zm0-8H7v2h3V5zm-3 6h5V9H7v2zm5 2h-2v2h2v-2zm1-1a1 1 0 01-1 1v2a3 3 0 003-3h-2zm-1-1a1 1 0 011 1h2a3 3 0 00-3-3v2zM4 8a3 3 0 003 3V9a1 1 0 01-1-1H4zm3-3a3 3 0 00-3 3h2a1 1 0 011-1V5z" fill="${e}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.856 12.014a.5.5 0 00-.712.702L5.409 14l-1.265 1.284a.5.5 0 00.712.702l1.255-1.274 1.255 1.274a.5.5 0 00.712-.702L6.813 14l1.265-1.284a.5.5 0 00-.712-.702L6.11 13.288l-1.255-1.274zM12.856 4.014a.5.5 0 00-.712.702L13.409 6l-1.265 1.284a.5.5 0 10.712.702l1.255-1.274 1.255 1.274a.5.5 0 10.712-.702L14.813 6l1.265-1.284a.5.5 0 00-.712-.702L14.11 5.288l-1.255-1.274z" fill="${e}"/>
</svg>`;
}, OM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M14.25 7.25a.75.75 0 000-1.5h-6.5a.75.75 0 100 1.5h6.5zM15 10a.75.75 0 01-.75.75h-6.5a.75.75 0 010-1.5h6.5A.75.75 0 0115 10zm-.75 4.25a.75.75 0 000-1.5h-6.5a.75.75 0 000 1.5h6.5zm-8.987-7a.75.75 0 100-1.5.75.75 0 000 1.5zm.75 2.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm-.75 4.25a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="${e}"/>
</svg>`;
}, zM = (t) => {
  const e = t.fgColor;
  return `
    <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 15v1h14v-2.5c0-.87-.44-1.55-.98-2.04a6.19 6.19 0 0 0-1.9-1.14 12.1 12.1 0 0 0-2.48-.67A4 4 0 1 0 5 6a4 4 0 0 0 2.36 3.65c-.82.13-1.7.36-2.48.67-.69.28-1.37.65-1.9 1.13A2.8 2.8 0 0 0 2 13.5V15z" fill="${t.bgColor}" stroke="${e}" stroke-width="2"/>
  </svg>`;
}, LM = (t) => {
  const e = t.fgColor;
  return `
    <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.43 6.04v-.18a3.86 3.86 0 0 0-7.72 0v.18A2.15 2.15 0 0 0 3 8.14v5.72C3 15.04 3.96 16 5.14 16H12c1.18 0 2.14-.96 2.14-2.14V8.14c0-1.03-.73-1.9-1.71-2.1zM7.86 6v-.14a.71.71 0 1 1 1.43 0V6H7.86z" fill="${t.bgColor}" stroke="${e}" stroke-width="2"/>
  </svg>
`;
}, $M = {
  headerRowID: uM,
  headerNumber: fM,
  headerCode: dM,
  headerString: hM,
  headerBoolean: pM,
  headerAudioUri: mM,
  headerVideoUri: yM,
  headerEmoji: bM,
  headerImage: vM,
  headerUri: A1,
  headerPhone: wM,
  headerMarkdown: xM,
  headerDate: kM,
  headerTime: SM,
  headerEmail: CM,
  headerReference: RM,
  headerIfThenElse: TM,
  headerSingleValue: EM,
  headerLookup: MM,
  headerTextTemplate: IM,
  headerMath: AM,
  headerRollup: _M,
  headerJoinStrings: PM,
  headerSplitString: DM,
  headerGeoDistance: NM,
  headerArray: OM,
  rowOwnerOverlay: zM,
  protectedColumnOverlay: LM,
  renameIcon: gM
};
function FM(t, e) {
  return t === "normal" ? [e.bgIconHeader, e.fgIconHeader] : t === "selected" ? ["white", e.accentColor] : [e.accentColor, e.bgHeader];
}
class HM {
  constructor(e, n) {
    Qe(this, "onSettled");
    Qe(this, "spriteMap", /* @__PURE__ */ new Map());
    Qe(this, "headerIcons");
    Qe(this, "inFlight", 0);
    this.onSettled = n, this.headerIcons = e ?? {};
  }
  drawSprite(e, n, r, i, o, s, a, l = 1) {
    const [c, u] = FM(n, a), d = s * Math.ceil(window.devicePixelRatio), f = `${c}_${u}_${d}_${e}`;
    let h = this.spriteMap.get(f);
    if (h === void 0) {
      const p = this.headerIcons[e];
      if (p === void 0)
        return;
      h = document.createElement("canvas");
      const g = h.getContext("2d");
      if (g === null)
        return;
      const y = new Image();
      y.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(p({ fgColor: u, bgColor: c }))}`, this.spriteMap.set(f, h);
      const m = y.decode();
      if (m === void 0)
        return;
      this.inFlight++, m.then(() => {
        g.drawImage(y, 0, 0, d, d);
      }).finally(() => {
        this.inFlight--, this.inFlight === 0 && this.onSettled();
      });
    } else
      l < 1 && (r.globalAlpha = l), r.drawImage(h, 0, 0, d, d, i, o, s, s), l < 1 && (r.globalAlpha = 1);
  }
}
function _1(t) {
  if (t.length === 0)
    return;
  let e;
  for (const n of t)
    e = Math.min(e ?? n.y, n.y);
  return e;
}
function Rl(t, e, n, r, i, o, s, a, l) {
  a = a ?? e;
  let c = e, u = t;
  const d = r - o;
  let f = !1;
  for (; c < n && u < d; ) {
    const h = i(u);
    if (c + h > a && l(c, u, h, !1, s && u === r - 1) === !0) {
      f = !0;
      break;
    }
    c += h, u++;
  }
  if (!f) {
    c = n;
    for (let h = 0; h < o; h++) {
      u = r - 1 - h;
      const p = i(u);
      c -= p, l(c, u, p, !0, s && u === r - 1);
    }
  }
}
function zi(t, e, n, r, i, o) {
  let s = 0, a = 0;
  const l = i + r;
  for (const c of t) {
    const u = c.sticky ? a : s + n;
    if (o(c, u, l, c.sticky ? 0 : a, e) === !0)
      break;
    s += c.width, a += c.sticky ? c.width : 0;
  }
}
function P1(t, e, n, r, i) {
  let o = 0, s = 0;
  for (let a = 0; a < t.length; a++) {
    const l = t[a];
    let c = a + 1, u = l.width;
    for (l.sticky && (s += u); c < t.length && Ds(t[c].group, l.group) && t[c].sticky === t[a].sticky; ) {
      const g = t[c];
      u += g.width, c++, a++, g.sticky && (s += g.width);
    }
    const d = l.sticky ? 0 : n, f = o + d, h = l.sticky ? 0 : Math.max(0, s - f), p = Math.min(u - h, e - (f + h));
    i([l.sourceIndex, t[c - 1].sourceIndex], l.group ?? "", f + h, 0, p, r), o += u;
  }
}
function D1(t, e, n, r, i, o, s) {
  var f;
  const [a, l] = t;
  let c, u;
  const d = ((f = s.find((h) => !h.sticky)) == null ? void 0 : f.sourceIndex) ?? 0;
  if (l > d) {
    const h = Math.max(a, d);
    let p = e, g = r;
    for (let y = o.sourceIndex - 1; y >= h; y--)
      p -= s[y].width, g += s[y].width;
    for (let y = o.sourceIndex + 1; y <= l; y++)
      g += s[y].width;
    u = {
      x: p,
      y: n,
      width: g,
      height: i
    };
  }
  if (d > a) {
    const h = Math.min(l, d - 1);
    let p = e, g = r;
    for (let y = o.sourceIndex - 1; y >= a; y--)
      p -= s[y].width, g += s[y].width;
    for (let y = o.sourceIndex + 1; y <= h; y++)
      g += s[y].width;
    c = {
      x: p,
      y: n,
      width: g,
      height: i
    };
  }
  return [c, u];
}
function BM(t, e, n, r) {
  if (r === "any")
    return N1(t, { x: e, y: n, width: 1, height: 1 });
  if (r === "vertical" && (e = t.x), r === "horizontal" && (n = t.y), g1([e, n], t))
    return;
  const i = e - t.x, o = t.x + t.width - e, s = n - t.y + 1, a = t.y + t.height - n, l = Math.min(r === "vertical" ? Number.MAX_SAFE_INTEGER : i, r === "vertical" ? Number.MAX_SAFE_INTEGER : o, r === "horizontal" ? Number.MAX_SAFE_INTEGER : s, r === "horizontal" ? Number.MAX_SAFE_INTEGER : a);
  return l === a ? { x: t.x, y: t.y + t.height, width: t.width, height: n - t.y - t.height + 1 } : l === s ? { x: t.x, y: n, width: t.width, height: t.y - n } : l === o ? { x: t.x + t.width, y: t.y, width: e - t.x - t.width + 1, height: t.height } : { x: e, y: t.y, width: t.x - e, height: t.height };
}
function Ns(t, e, n, r, i, o, s, a) {
  return t <= i + s && i <= t + n && e <= o + a && o <= e + r;
}
function Qi(t, e, n) {
  return e >= t.x && e <= t.x + t.width && n >= t.y && n <= t.y + t.height;
}
function N1(t, e) {
  const n = Math.min(t.x, e.x), r = Math.min(t.y, e.y), i = Math.max(t.x + t.width, e.x + e.width) - n, o = Math.max(t.y + t.height, e.y + e.height) - r;
  return { x: n, y: r, width: i, height: o };
}
function qM(t, e) {
  return t.x <= e.x && t.y <= e.y && t.x + t.width >= e.x + e.width && t.y + t.height >= e.y + e.height;
}
function WM(t, e, n, r) {
  if (t.x > e || t.y > n || t.x < 0 && t.y < 0 && t.x + t.width > e && t.y + t.height > n)
    return;
  if (t.x >= 0 && t.y >= 0 && t.x + t.width <= e && t.y + t.height <= n)
    return t;
  const i = -4, o = -4, s = e + 4, a = n + 4, l = i - t.x, c = t.x + t.width - s, u = o - t.y, d = t.y + t.height - a, f = l > 0 ? t.x + Math.floor(l / r) * r : t.x, h = c > 0 ? t.x + t.width - Math.floor(c / r) * r : t.x + t.width, p = u > 0 ? t.y + Math.floor(u / r) * r : t.y, g = d > 0 ? t.y + t.height - Math.floor(d / r) * r : t.y + t.height;
  return { x: f, y: p, width: h - f, height: g - p };
}
function jM(t, e, n, r, i) {
  const [o, s, a, l] = e, [c, u, d, f] = i, { x: h, y: p, width: g, height: y } = t, m = [];
  if (g <= 0 || y <= 0)
    return m;
  const b = h + g, C = p + y, I = h < o, v = p < s, T = h + g > a, D = p + y > l, P = h >= o && h < a || b > o && b <= a || h < o && b > a, S = p >= s && p < l || C > s && C <= l || p < s && C > l;
  if (P && S) {
    const k = Math.max(h, o), x = Math.max(p, s), M = Math.min(b, a), _ = Math.min(C, l);
    m.push({
      rect: { x: k, y: x, width: M - k, height: _ - x },
      clip: {
        x: c,
        y: u,
        width: d - c + 1,
        height: f - u + 1
      }
    });
  }
  if (I && v) {
    const k = h, x = p, M = Math.min(b, o), _ = Math.min(C, s);
    m.push({
      rect: {
        x: k,
        y: x,
        width: M - k,
        height: _ - x
      },
      clip: {
        x: 0,
        y: 0,
        width: c + 1,
        height: u + 1
      }
    });
  }
  if (v && P) {
    const k = Math.max(h, o), x = p, M = Math.min(b, a), _ = Math.min(C, s);
    m.push({
      rect: {
        x: k,
        y: x,
        width: M - k,
        height: _ - x
      },
      clip: {
        x: c,
        y: 0,
        width: d - c + 1,
        height: u + 1
      }
    });
  }
  if (v && T) {
    const k = Math.max(h, a), x = p, M = b, _ = Math.min(C, s);
    m.push({
      rect: {
        x: k,
        y: x,
        width: M - k,
        height: _ - x
      },
      clip: {
        x: d,
        y: 0,
        width: n - d + 1,
        height: u + 1
      }
    });
  }
  if (I && S) {
    const k = h, x = Math.max(p, s), M = Math.min(b, o), _ = Math.min(C, l);
    m.push({
      rect: {
        x: k,
        y: x,
        width: M - k,
        height: _ - x
      },
      clip: {
        x: 0,
        y: u,
        width: c + 1,
        height: f - u + 1
      }
    });
  }
  if (T && S) {
    const k = Math.max(h, a), x = Math.max(p, s), M = b, _ = Math.min(C, l);
    m.push({
      rect: {
        x: k,
        y: x,
        width: M - k,
        height: _ - x
      },
      clip: {
        x: d,
        y: u,
        width: n - d + 1,
        height: f - u + 1
      }
    });
  }
  if (I && D) {
    const k = h, x = Math.max(p, l), M = Math.min(b, o), _ = C;
    m.push({
      rect: {
        x: k,
        y: x,
        width: M - k,
        height: _ - x
      },
      clip: {
        x: 0,
        y: f,
        width: c + 1,
        height: r - f + 1
      }
    });
  }
  if (D && P) {
    const k = Math.max(h, o), x = Math.max(p, l), M = Math.min(b, a), _ = C;
    m.push({
      rect: {
        x: k,
        y: x,
        width: M - k,
        height: _ - x
      },
      clip: {
        x: c,
        y: f,
        width: d - c + 1,
        height: r - f + 1
      }
    });
  }
  if (T && D) {
    const k = Math.max(h, a), x = Math.max(p, l), M = b, _ = C;
    m.push({
      rect: {
        x: k,
        y: x,
        width: M - k,
        height: _ - x
      },
      clip: {
        x: d,
        y: f,
        width: n - d + 1,
        height: r - f + 1
      }
    });
  }
  return m;
}
const KM = {
  kind: Be.Loading,
  allowOverlay: !1
};
function h0(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g, y, m, b, C, I, v, T, D, P, S, z, k, x, M, _, E, O, L, W) {
  let re = (C == null ? void 0 : C.size) ?? Number.MAX_SAFE_INTEGER;
  const F = performance.now();
  let N = M.baseFontFull;
  t.font = N;
  const te = { ctx: t }, Y = [0, 0], j = y > 0 ? uo(l, y, c) : 0;
  let ee, H;
  const Z = _1(b);
  return zi(e, a, o, s, i, (J, V, K, le, ue) => {
    const ke = Math.max(0, le - V), we = V + ke, He = i + 1, nt = J.width - ke, bt = r - i - 1;
    if (b.length > 0) {
      let Oe = !1;
      for (let et = 0; et < b.length; et++) {
        const ht = b[et];
        if (Ns(we, He, nt, bt, ht.x, ht.y, ht.width, ht.height)) {
          Oe = !0;
          break;
        }
      }
      if (!Oe)
        return;
    }
    const gt = () => {
      t.save(), t.beginPath(), t.rect(we, He, nt, bt), t.clip();
    }, ne = I.columns.hasIndex(J.sourceIndex), Ne = d(J.group ?? "").overrideTheme, Ae = J.themeOverride === void 0 && Ne === void 0 ? M : di(M, Ne, J.themeOverride), Ke = Ae.baseFontFull;
    Ke !== N && (N = Ke, t.font = Ke), gt();
    let $e;
    return Rl(ue, K, r, l, c, y, m, Z, (Oe, et, ht, Se, Ze) => {
      var Ue, Mt, Gt;
      if (et < 0 || (Y[0] = J.sourceIndex, Y[1] = et, C !== void 0 && !C.has(Y)))
        return;
      if (b.length > 0) {
        let it = !1;
        for (let Q = 0; Q < b.length; Q++) {
          const xe = b[Q];
          if (Ns(V, Oe, J.width, ht, xe.x, xe.y, xe.width, xe.height)) {
            it = !0;
            break;
          }
        }
        if (!it)
          return;
      }
      const Ct = I.rows.hasIndex(et), wt = h.hasIndex(et), Ve = et < l ? u(Y) : KM;
      let Et = V, pt = J.width, mt = !1, zt = !1;
      if (Ve.span !== void 0) {
        const [it, Q] = Ve.span, xe = `${et},${it},${Q},${J.sticky}`;
        if (H === void 0 && (H = /* @__PURE__ */ new Set()), H.has(xe)) {
          re--;
          return;
        } else {
          const Ie = D1(Ve.span, V, Oe, J.width, ht, J, n), Je = J.sticky ? Ie[0] : Ie[1];
          if (!J.sticky && Ie[0] !== void 0 && (zt = !0), Je !== void 0) {
            Et = Je.x, pt = Je.width, H.add(xe), t.restore(), $e = void 0, t.save(), t.beginPath();
            const ft = Math.max(0, le - Je.x);
            t.rect(Je.x + ft, Oe, Je.width - ft, ht), ee === void 0 && (ee = []), ee.push({
              x: Je.x + ft,
              y: Oe,
              width: Je.width - ft,
              height: ht
            }), t.clip(), mt = !0;
          }
        }
      }
      const Bt = f == null ? void 0 : f(et), nn = Ze && ((Ue = J.trailingRowOptions) == null ? void 0 : Ue.themeOverride) !== void 0 ? (Mt = J.trailingRowOptions) == null ? void 0 : Mt.themeOverride : void 0, vt = Ve.themeOverride === void 0 && Bt === void 0 && nn === void 0 ? Ae : di(Ae, Bt, nn, Ve.themeOverride);
      t.beginPath();
      const he = wE(Y, Ve, I);
      let ge = xE(Y, Ve, I, g);
      const Ce = Ve.span !== void 0 && I.columns.some(
        (it) => Ve.span !== void 0 && it >= Ve.span[0] && it <= Ve.span[1]
        //alloc
      );
      he && !p && g ? ge = 0 : he && g && (ge = Math.max(ge, 1)), Ce && ge++, he || (Ct && ge++, ne && !Ze && ge++);
      const Re = Ve.kind === Be.Protected ? vt.bgCellMedium : vt.bgCell;
      let Pe;
      if ((Se || Re !== M.bgCell) && (Pe = yr(Re, Pe)), ge > 0 || wt) {
        wt && (Pe = yr(vt.bgHeader, Pe));
        for (let it = 0; it < ge; it++)
          Pe = yr(vt.accentLight, Pe);
      } else if (v !== void 0) {
        for (const it of v)
          if (it[0] === J.sourceIndex && it[1] === et) {
            Pe = yr(vt.bgSearchResult, Pe);
            break;
          }
      }
      if (T !== void 0)
        for (let it = 0; it < T.length; it++) {
          const Q = T[it], xe = Q.range;
          Q.style !== "solid-outline" && xe.x <= J.sourceIndex && J.sourceIndex < xe.x + xe.width && xe.y <= et && et < xe.y + xe.height && (Pe = yr(Q.color, Pe));
        }
      let lt = !1;
      if (C !== void 0) {
        const it = Oe + 1, xe = (Se ? it + ht - 1 : Math.min(it + ht - 1, r - j)) - it;
        (xe !== ht - 1 || Et + 1 <= le) && (lt = !0, t.save(), t.beginPath(), t.rect(Et + 1, it, pt - 1, xe), t.clip()), Pe = Pe === void 0 ? vt.bgCell : yr(Pe, vt.bgCell);
      }
      const ie = J.sourceIndex === n.length - 1, de = et === l - 1;
      Pe !== void 0 && (t.fillStyle = Pe, $e !== void 0 && ($e.fillStyle = Pe), C !== void 0 ? t.fillRect(Et + 1, Oe + 1, pt - (ie ? 2 : 1), ht - (de ? 2 : 1)) : t.fillRect(Et, Oe, pt, ht)), Ve.style === "faded" && (t.globalAlpha = 0.6);
      let _e;
      for (let it = 0; it < S.length; it++) {
        const Q = S[it];
        if (Q.item[0] === J.sourceIndex && Q.item[1] === et) {
          _e = Q;
          break;
        }
      }
      if (pt > W && !zt) {
        const it = vt.baseFontFull;
        it !== N && (t.font = it, N = it), $e = O1(t, Ve, J.sourceIndex, et, ie, de, Et, Oe, pt, ht, ge > 0, vt, Pe ?? vt.bgCell, D, P, (_e == null ? void 0 : _e.hoverAmount) ?? 0, z, x, F, k, $e, _, E, O, L);
      }
      return lt && t.restore(), Ve.style === "faded" && (t.globalAlpha = 1), re--, mt && (t.restore(), (Gt = $e == null ? void 0 : $e.deprep) == null || Gt.call($e, te), $e = void 0, gt(), N = Ke, t.font = Ke), re <= 0;
    }), t.restore(), re <= 0;
  }), ee;
}
const cs = [0, 0], us = { x: 0, y: 0, width: 0, height: 0 }, Xu = [void 0, () => {
}];
let Pf = !1;
function UM() {
  Pf = !0;
}
function O1(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g, y, m, b, C, I, v, T, D, P) {
  var E, O;
  let S, z;
  y !== void 0 && y[0][0] === n && y[0][1] === r && (S = y[1][0], z = y[1][1]);
  let k;
  cs[0] = n, cs[1] = r, us.x = s, us.y = a, us.width = l, us.height = c, Xu[0] = T.getValue(cs), Xu[1] = (L) => T.setValue(cs, L), Pf = !1;
  const x = {
    //alloc
    ctx: t,
    theme: d,
    col: n,
    row: r,
    cell: e,
    rect: us,
    highlighted: u,
    cellFillColor: f,
    hoverAmount: g,
    frameTime: b,
    hoverX: S,
    drawState: Xu,
    hoverY: z,
    imageLoader: h,
    spriteManager: p,
    hyperWrapping: m,
    overrideCursor: S !== void 0 ? P : void 0,
    requestAnimationFrame: UM
  }, M = EE(x, e.lastUpdated, b, I, i, o), _ = D(e);
  if (_ !== void 0) {
    (I == null ? void 0 : I.renderer) !== _ && ((E = I == null ? void 0 : I.deprep) == null || E.call(I, x), I = void 0);
    const L = (O = _.drawPrep) == null ? void 0 : O.call(_, x, I);
    C !== void 0 && !_o(x.cell) ? C(x, () => _.draw(x, e)) : _.draw(x, e), k = L === void 0 ? void 0 : {
      deprep: L == null ? void 0 : L.deprep,
      fillStyle: L == null ? void 0 : L.fillStyle,
      font: L == null ? void 0 : L.font,
      renderer: _
    };
  }
  return (M || Pf) && (v == null || v(cs)), k;
}
function zh(t, e, n, r, i, o, s, a, l = -20, c = -20, u = void 0, d = "center", f = "square") {
  const h = Math.floor(i + s / 2), p = f === "circle" ? 1e4 : e.roundingRadius ?? 4;
  let g = t1(u ?? e.checkboxMaxSize, s, e.cellVerticalPadding), y = g / 2;
  const m = e1(d, r, o, e.cellHorizontalPadding, g), b = Qv(m, h, g), C = n1(r + l, i + c, b);
  switch (n) {
    case !0: {
      t.beginPath(), ei(t, m - g / 2, h - g / 2, g, g, p), f === "circle" && (y *= 0.8, g *= 0.8), t.fillStyle = a ? e.accentColor : e.textMedium, t.fill(), t.beginPath(), t.moveTo(m - y + g / 4.23, h - y + g / 1.97), t.lineTo(m - y + g / 2.42, h - y + g / 1.44), t.lineTo(m - y + g / 1.29, h - y + g / 3.25), t.strokeStyle = e.bgCell, t.lineJoin = "round", t.lineCap = "round", t.lineWidth = 1.9, t.stroke();
      break;
    }
    case Xa:
    case !1: {
      t.beginPath(), ei(t, m - g / 2 + 0.5, h - g / 2 + 0.5, g - 1, g - 1, p), t.lineWidth = 1, t.strokeStyle = C ? e.textDark : e.textMedium, t.stroke();
      break;
    }
    case ph: {
      t.beginPath(), ei(t, m - g / 2, h - g / 2, g, g, p), t.fillStyle = C ? e.textMedium : e.textLight, t.fill(), f === "circle" && (y *= 0.8, g *= 0.8), t.beginPath(), t.moveTo(m - g / 3, h), t.lineTo(m + g / 3, h), t.strokeStyle = e.bgCell, t.lineCap = "round", t.lineWidth = 1.9, t.stroke();
      break;
    }
    default:
      Ps();
  }
}
function GM(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g, y, m, b) {
  var S, z, k, x;
  const C = s + a;
  if (C <= 0)
    return;
  t.fillStyle = d.bgHeader, t.fillRect(0, 0, i, C);
  const I = (S = r == null ? void 0 : r[0]) == null ? void 0 : S[0], v = (z = r == null ? void 0 : r[0]) == null ? void 0 : z[1], T = (k = r == null ? void 0 : r[1]) == null ? void 0 : k[0], D = (x = r == null ? void 0 : r[1]) == null ? void 0 : x[1], P = d.headerFontFull;
  t.font = P, zi(e, 0, o, 0, C, (M, _, E, O) => {
    var J;
    if (y !== void 0 && !y.has([M.sourceIndex, -1]))
      return;
    const L = Math.max(0, O - _);
    t.save(), t.beginPath(), t.rect(_ + L, a, M.width - L, s), t.clip();
    const W = g(M.group ?? "").overrideTheme, re = M.themeOverride === void 0 && W === void 0 ? d : di(d, W, M.themeOverride);
    re.bgHeader !== d.bgHeader && (t.fillStyle = re.bgHeader, t.fill()), re !== d && (t.font = re.headerFontFull);
    const F = u.columns.hasIndex(M.sourceIndex), N = l !== void 0 || c || M.headerRowMarkerDisabled === !0, te = !N && v === -1 && I === M.sourceIndex, Y = N ? 0 : ((J = h.find((V) => V.item[0] === M.sourceIndex && V.item[1] === -1)) == null ? void 0 : J.hoverAmount) ?? 0, j = (u == null ? void 0 : u.current) !== void 0 && u.current.cell[0] === M.sourceIndex, ee = F ? re.accentColor : j ? re.bgHeaderHasFocus : re.bgHeader, H = n ? a : 0, Z = M.sourceIndex === 0 ? 0 : 1;
    F ? (t.fillStyle = ee, t.fillRect(_ + Z, H, M.width - Z, s)) : (j || Y > 0) && (t.beginPath(), t.rect(_ + Z, H, M.width - Z, s), j && (t.fillStyle = re.bgHeaderHasFocus, t.fill()), Y > 0 && (t.globalAlpha = Y, t.fillStyle = re.bgHeaderHovered, t.fill(), t.globalAlpha = 1)), $1(t, _, H, M.width, s, M, F, re, te, te ? T : void 0, te ? D : void 0, j, Y, f, m, b), t.restore();
  }), n && YM(t, e, i, o, a, r, d, f, h, p, g, y);
}
function YM(t, e, n, r, i, o, s, a, l, c, u, d) {
  const [h, p] = (o == null ? void 0 : o[0]) ?? [];
  let g = 0;
  P1(e, n, r, i, (y, m, b, C, I, v) => {
    if (d !== void 0 && !d.hasItemInRectangle({
      x: y[0],
      y: -2,
      width: y[1] - y[0] + 1,
      height: 1
    }))
      return;
    t.save(), t.beginPath(), t.rect(b, C, I, v), t.clip();
    const T = u(m), D = (T == null ? void 0 : T.overrideTheme) === void 0 ? s : di(s, T.overrideTheme), P = p === -2 && h !== void 0 && h >= y[0] && h <= y[1], S = P ? D.bgGroupHeaderHovered ?? D.bgHeaderHovered : D.bgGroupHeader ?? D.bgHeader;
    if (S !== s.bgHeader && (t.fillStyle = S, t.fill()), t.fillStyle = D.textGroupHeader ?? D.textHeader, T !== void 0) {
      let z = b;
      if (T.icon !== void 0 && (a.drawSprite(T.icon, "normal", t, z + 8, (i - 20) / 2, 20, D), z += 26), t.fillText(T.name, z + 8, i / 2 + Oi(t, s.headerFontFull)), T.actions !== void 0 && P) {
        const k = z1({ x: b, y: C, width: I, height: v }, T.actions);
        t.beginPath();
        const x = k[0].x - 10, M = b + I - x;
        t.rect(x, 0, M, i);
        const _ = t.createLinearGradient(x, 0, x + M, 0), E = io(S, 0);
        _.addColorStop(0, E), _.addColorStop(10 / M, S), _.addColorStop(1, S), t.fillStyle = _, t.fill(), t.globalAlpha = 0.6;
        const [O, L] = (o == null ? void 0 : o[1]) ?? [-1, -1];
        for (let W = 0; W < T.actions.length; W++) {
          const re = T.actions[W], F = k[W], N = Qi(F, O + b, L);
          N && (t.globalAlpha = 1), a.drawSprite(re.icon, "normal", t, F.x + F.width / 2 - 10, F.y + F.height / 2 - 10, 20, D), N && (t.globalAlpha = 0.6);
        }
        t.globalAlpha = 1;
      }
    }
    b !== 0 && c(y[0]) && (t.beginPath(), t.moveTo(b + 0.5, 0), t.lineTo(b + 0.5, i), t.strokeStyle = s.borderColor, t.lineWidth = 1, t.stroke()), t.restore(), g = b + I;
  }), t.beginPath(), t.moveTo(g + 0.5, 0), t.lineTo(g + 0.5, i), t.moveTo(0, i + 0.5), t.lineTo(n, i + 0.5), t.strokeStyle = s.borderColor, t.lineWidth = 1, t.stroke();
}
const Ta = 30;
function XM(t, e, n, r, i) {
  return {
    x: t + n - Ta,
    // right align
    y: Math.max(e, e + r / 2 - Ta / 2),
    // center vertically
    width: Ta,
    height: Math.min(Ta, r)
  };
}
function z1(t, e) {
  const n = [];
  let r = t.x + t.width - 26 * e.length;
  const i = t.y + t.height / 2 - 13, o = 26, s = 26;
  for (let a = 0; a < e.length; a++)
    n.push({
      x: r,
      y: i,
      width: s,
      height: o
    }), r += 26;
  return n;
}
function ds(t, e, n) {
  return !n || t === void 0 || (t.x = e - (t.x - e) - t.width), t;
}
function L1(t, e, n, r, i, o, s, a) {
  var m;
  const l = s.cellHorizontalPadding, c = s.headerIconSize, u = XM(n, r, i, o);
  let d = n + l;
  const f = e.icon === void 0 ? void 0 : {
    x: d,
    y: r + (o - c) / 2,
    width: c,
    height: c
  }, h = f === void 0 || e.overlayIcon === void 0 ? void 0 : {
    x: f.x + 9,
    y: f.y + 6,
    width: 18,
    height: 18
  };
  f !== void 0 && (d += Math.ceil(c * 1.3));
  const p = {
    x: d,
    y: r,
    width: i - d,
    height: o
  };
  let g;
  if (e.indicatorIcon !== void 0) {
    const b = t === void 0 ? ((m = v1(e.title, s.headerFontFull)) == null ? void 0 : m.width) ?? 0 : Ko(e.title, t, s.headerFontFull).width;
    p.width = b, d += b + l, g = {
      x: d,
      y: r + (o - c) / 2,
      width: c,
      height: c
    };
  }
  const y = n + i / 2;
  return {
    menuBounds: ds(u, y, a),
    iconBounds: ds(f, y, a),
    iconOverlayBounds: ds(h, y, a),
    textBounds: ds(p, y, a),
    indicatorIconBounds: ds(g, y, a)
  };
}
function p0(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g) {
  if (o.rowMarker !== void 0 && o.headerRowMarkerDisabled !== !0) {
    const b = o.rowMarkerChecked;
    b !== !0 && o.headerRowMarkerAlwaysVisible !== !0 && (t.globalAlpha = d);
    const C = o.headerRowMarkerTheme !== void 0 ? di(a, o.headerRowMarkerTheme) : a;
    zh(t, C, b, e, n, r, i, !1, void 0, void 0, a.checkboxMaxSize, "center", o.rowMarker), b !== !0 && o.headerRowMarkerAlwaysVisible !== !0 && (t.globalAlpha = 1);
    return;
  }
  const y = s ? a.textHeaderSelected : a.textHeader, m = o.hasMenu === !0 && (l || h && s) && g.menuBounds !== void 0;
  if (o.icon !== void 0 && g.iconBounds !== void 0) {
    let b = s ? "selected" : "normal";
    o.style === "highlight" && (b = s ? "selected" : "special"), f.drawSprite(o.icon, b, t, g.iconBounds.x, g.iconBounds.y, g.iconBounds.width, a), o.overlayIcon !== void 0 && g.iconOverlayBounds !== void 0 && f.drawSprite(o.overlayIcon, s ? "selected" : "special", t, g.iconOverlayBounds.x, g.iconOverlayBounds.y, g.iconOverlayBounds.width, a);
  }
  if (m && r > 35) {
    const C = p ? 35 : r - 35, I = p ? 35 * 0.7 : r - 35 * 0.7, v = C / r, T = I / r, D = t.createLinearGradient(e, 0, e + r, 0), P = io(y, 0);
    D.addColorStop(p ? 1 : 0, y), D.addColorStop(v, y), D.addColorStop(T, P), D.addColorStop(p ? 0 : 1, P), t.fillStyle = D;
  } else
    t.fillStyle = y;
  if (p && (t.textAlign = "right"), g.textBounds !== void 0 && t.fillText(o.title, p ? g.textBounds.x + g.textBounds.width : g.textBounds.x, n + i / 2 + Oi(t, a.headerFontFull)), p && (t.textAlign = "left"), o.indicatorIcon !== void 0 && g.indicatorIconBounds !== void 0 && (!m || !Ns(g.menuBounds.x, g.menuBounds.y, g.menuBounds.width, g.menuBounds.height, g.indicatorIconBounds.x, g.indicatorIconBounds.y, g.indicatorIconBounds.width, g.indicatorIconBounds.height))) {
    let b = s ? "selected" : "normal";
    o.style === "highlight" && (b = s ? "selected" : "special"), f.drawSprite(o.indicatorIcon, b, t, g.indicatorIconBounds.x, g.indicatorIconBounds.y, g.indicatorIconBounds.width, a);
  }
  if (m && g.menuBounds !== void 0) {
    const b = g.menuBounds, C = c !== void 0 && u !== void 0 && Qi(b, c + e, u + n);
    if (C || (t.globalAlpha = 0.7), o.menuIcon === void 0 || o.menuIcon === Va.Triangle) {
      t.beginPath();
      const I = b.x + b.width / 2 - 5.5, v = b.y + b.height / 2 - 3;
      _E(t, [
        {
          x: I,
          y: v
        },
        {
          x: I + 11,
          y: v
        },
        {
          x: I + 5.5,
          y: v + 6
        }
      ], 1), t.fillStyle = y, t.fill();
    } else if (o.menuIcon === Va.Dots) {
      t.beginPath();
      const I = b.x + b.width / 2, v = b.y + b.height / 2;
      AE(t, I, v), t.fillStyle = y, t.fill();
    } else {
      const I = b.x + (b.width - a.headerIconSize) / 2, v = b.y + (b.height - a.headerIconSize) / 2;
      f.drawSprite(o.menuIcon, "normal", t, I, v, a.headerIconSize, a);
    }
    C || (t.globalAlpha = 1);
  }
}
function $1(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g) {
  const y = wh(o.title) === "rtl", m = L1(t, o, e, n, r, i, a, y);
  p !== void 0 ? p({
    ctx: t,
    theme: a,
    rect: { x: e, y: n, width: r, height: i },
    column: o,
    columnIndex: o.sourceIndex,
    isSelected: s,
    hoverAmount: f,
    isHovered: l,
    hasSelectedCell: d,
    spriteManager: h,
    menuBounds: (m == null ? void 0 : m.menuBounds) ?? { x: 0, y: 0, height: 0, width: 0 },
    hoverX: c,
    hoverY: u
  }, () => p0(t, e, n, r, i, o, s, a, l, c, u, f, h, g, y, m)) : p0(t, e, n, r, i, o, s, a, l, c, u, f, h, g, y, m);
}
var Vu, g0;
function VM() {
  if (g0) return Vu;
  g0 = 1;
  var t = lo(), e = (function() {
    try {
      var n = t(Object, "defineProperty");
      return n({}, "", {}), n;
    } catch {
    }
  })();
  return Vu = e, Vu;
}
var Ju, m0;
function JM() {
  if (m0) return Ju;
  m0 = 1;
  var t = VM();
  function e(n, r, i) {
    r == "__proto__" && t ? t(n, r, {
      configurable: !0,
      enumerable: !0,
      value: i,
      writable: !0
    }) : n[r] = i;
  }
  return Ju = e, Ju;
}
var Zu, y0;
function ZM() {
  if (y0) return Zu;
  y0 = 1;
  function t(e, n, r, i) {
    for (var o = -1, s = e == null ? 0 : e.length; ++o < s; ) {
      var a = e[o];
      n(i, a, r(a), e);
    }
    return i;
  }
  return Zu = t, Zu;
}
var Qu, b0;
function QM() {
  if (b0) return Qu;
  b0 = 1;
  function t(e) {
    return function(n, r, i) {
      for (var o = -1, s = Object(n), a = i(n), l = a.length; l--; ) {
        var c = a[e ? l : ++o];
        if (r(s[c], c, s) === !1)
          break;
      }
      return n;
    };
  }
  return Qu = t, Qu;
}
var ed, v0;
function eI() {
  if (v0) return ed;
  v0 = 1;
  var t = QM(), e = t();
  return ed = e, ed;
}
var td, w0;
function tI() {
  if (w0) return td;
  w0 = 1;
  function t(e, n) {
    for (var r = -1, i = Array(e); ++r < e; )
      i[r] = n(r);
    return i;
  }
  return td = t, td;
}
var ms = { exports: {} }, nd, x0;
function nI() {
  if (x0) return nd;
  x0 = 1;
  function t() {
    return !1;
  }
  return nd = t, nd;
}
ms.exports;
var k0;
function F1() {
  return k0 || (k0 = 1, (function(t, e) {
    var n = ii(), r = nI(), i = e && !e.nodeType && e, o = i && !0 && t && !t.nodeType && t, s = o && o.exports === i, a = s ? n.Buffer : void 0, l = a ? a.isBuffer : void 0, c = l || r;
    t.exports = c;
  })(ms, ms.exports)), ms.exports;
}
var rd, S0;
function rI() {
  if (S0) return rd;
  S0 = 1;
  var t = Bs(), e = hh(), n = qs(), r = "[object Arguments]", i = "[object Array]", o = "[object Boolean]", s = "[object Date]", a = "[object Error]", l = "[object Function]", c = "[object Map]", u = "[object Number]", d = "[object Object]", f = "[object RegExp]", h = "[object Set]", p = "[object String]", g = "[object WeakMap]", y = "[object ArrayBuffer]", m = "[object DataView]", b = "[object Float32Array]", C = "[object Float64Array]", I = "[object Int8Array]", v = "[object Int16Array]", T = "[object Int32Array]", D = "[object Uint8Array]", P = "[object Uint8ClampedArray]", S = "[object Uint16Array]", z = "[object Uint32Array]", k = {};
  k[b] = k[C] = k[I] = k[v] = k[T] = k[D] = k[P] = k[S] = k[z] = !0, k[r] = k[i] = k[y] = k[o] = k[m] = k[s] = k[a] = k[l] = k[c] = k[u] = k[d] = k[f] = k[h] = k[p] = k[g] = !1;
  function x(M) {
    return n(M) && e(M.length) && !!k[t(M)];
  }
  return rd = x, rd;
}
var id, C0;
function iI() {
  if (C0) return id;
  C0 = 1;
  function t(e) {
    return function(n) {
      return e(n);
    };
  }
  return id = t, id;
}
var ys = { exports: {} };
ys.exports;
var R0;
function oI() {
  return R0 || (R0 = 1, (function(t, e) {
    var n = Lv(), r = e && !e.nodeType && e, i = r && !0 && t && !t.nodeType && t, o = i && i.exports === r, s = o && n.process, a = (function() {
      try {
        var l = i && i.require && i.require("util").types;
        return l || s && s.binding && s.binding("util");
      } catch {
      }
    })();
    t.exports = a;
  })(ys, ys.exports)), ys.exports;
}
var od, T0;
function H1() {
  if (T0) return od;
  T0 = 1;
  var t = rI(), e = iI(), n = oI(), r = n && n.isTypedArray, i = r ? e(r) : t;
  return od = i, od;
}
var sd, E0;
function sI() {
  if (E0) return sd;
  E0 = 1;
  var t = tI(), e = dh(), n = ri(), r = F1(), i = fh(), o = H1(), s = Object.prototype, a = s.hasOwnProperty;
  function l(c, u) {
    var d = n(c), f = !d && e(c), h = !d && !f && r(c), p = !d && !f && !h && o(c), g = d || f || h || p, y = g ? t(c.length, String) : [], m = y.length;
    for (var b in c)
      (u || a.call(c, b)) && !(g && // Safari 9 has enumerable `arguments.length` in strict mode.
      (b == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      h && (b == "offset" || b == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      p && (b == "buffer" || b == "byteLength" || b == "byteOffset") || // Skip index properties.
      i(b, m))) && y.push(b);
    return y;
  }
  return sd = l, sd;
}
var ad, M0;
function aI() {
  if (M0) return ad;
  M0 = 1;
  var t = Object.prototype;
  function e(n) {
    var r = n && n.constructor, i = typeof r == "function" && r.prototype || t;
    return n === i;
  }
  return ad = e, ad;
}
var ld, I0;
function lI() {
  if (I0) return ld;
  I0 = 1;
  function t(e, n) {
    return function(r) {
      return e(n(r));
    };
  }
  return ld = t, ld;
}
var cd, A0;
function cI() {
  if (A0) return cd;
  A0 = 1;
  var t = lI(), e = t(Object.keys, Object);
  return cd = e, cd;
}
var ud, _0;
function uI() {
  if (_0) return ud;
  _0 = 1;
  var t = aI(), e = cI(), n = Object.prototype, r = n.hasOwnProperty;
  function i(o) {
    if (!t(o))
      return e(o);
    var s = [];
    for (var a in Object(o))
      r.call(o, a) && a != "constructor" && s.push(a);
    return s;
  }
  return ud = i, ud;
}
var dd, P0;
function Lh() {
  if (P0) return dd;
  P0 = 1;
  var t = sI(), e = uI(), n = Oh();
  function r(i) {
    return n(i) ? t(i) : e(i);
  }
  return dd = r, dd;
}
var fd, D0;
function dI() {
  if (D0) return fd;
  D0 = 1;
  var t = eI(), e = Lh();
  function n(r, i) {
    return r && t(r, i, e);
  }
  return fd = n, fd;
}
var hd, N0;
function fI() {
  if (N0) return hd;
  N0 = 1;
  var t = Oh();
  function e(n, r) {
    return function(i, o) {
      if (i == null)
        return i;
      if (!t(i))
        return n(i, o);
      for (var s = i.length, a = r ? s : -1, l = Object(i); (r ? a-- : ++a < s) && o(l[a], a, l) !== !1; )
        ;
      return i;
    };
  }
  return hd = e, hd;
}
var pd, O0;
function hI() {
  if (O0) return pd;
  O0 = 1;
  var t = dI(), e = fI(), n = e(t);
  return pd = n, pd;
}
var gd, z0;
function pI() {
  if (z0) return gd;
  z0 = 1;
  var t = hI();
  function e(n, r, i, o) {
    return t(n, function(s, a, l) {
      r(o, s, i(s), l);
    }), o;
  }
  return gd = e, gd;
}
var md, L0;
function gI() {
  if (L0) return md;
  L0 = 1;
  var t = wl();
  function e() {
    this.__data__ = new t(), this.size = 0;
  }
  return md = e, md;
}
var yd, $0;
function mI() {
  if ($0) return yd;
  $0 = 1;
  function t(e) {
    var n = this.__data__, r = n.delete(e);
    return this.size = n.size, r;
  }
  return yd = t, yd;
}
var bd, F0;
function yI() {
  if (F0) return bd;
  F0 = 1;
  function t(e) {
    return this.__data__.get(e);
  }
  return bd = t, bd;
}
var vd, H0;
function bI() {
  if (H0) return vd;
  H0 = 1;
  function t(e) {
    return this.__data__.has(e);
  }
  return vd = t, vd;
}
var wd, B0;
function vI() {
  if (B0) return wd;
  B0 = 1;
  var t = wl(), e = ch(), n = uh(), r = 200;
  function i(o, s) {
    var a = this.__data__;
    if (a instanceof t) {
      var l = a.__data__;
      if (!e || l.length < r - 1)
        return l.push([o, s]), this.size = ++a.size, this;
      a = this.__data__ = new n(l);
    }
    return a.set(o, s), this.size = a.size, this;
  }
  return wd = i, wd;
}
var xd, q0;
function B1() {
  if (q0) return xd;
  q0 = 1;
  var t = wl(), e = gI(), n = mI(), r = yI(), i = bI(), o = vI();
  function s(a) {
    var l = this.__data__ = new t(a);
    this.size = l.size;
  }
  return s.prototype.clear = e, s.prototype.delete = n, s.prototype.get = r, s.prototype.has = i, s.prototype.set = o, xd = s, xd;
}
var kd, W0;
function wI() {
  if (W0) return kd;
  W0 = 1;
  function t(e, n) {
    for (var r = -1, i = e == null ? 0 : e.length; ++r < i; )
      if (n(e[r], r, e))
        return !0;
    return !1;
  }
  return kd = t, kd;
}
var Sd, j0;
function q1() {
  if (j0) return Sd;
  j0 = 1;
  var t = T1(), e = wI(), n = E1(), r = 1, i = 2;
  function o(s, a, l, c, u, d) {
    var f = l & r, h = s.length, p = a.length;
    if (h != p && !(f && p > h))
      return !1;
    var g = d.get(s), y = d.get(a);
    if (g && y)
      return g == a && y == s;
    var m = -1, b = !0, C = l & i ? new t() : void 0;
    for (d.set(s, a), d.set(a, s); ++m < h; ) {
      var I = s[m], v = a[m];
      if (c)
        var T = f ? c(v, I, m, a, s, d) : c(I, v, m, s, a, d);
      if (T !== void 0) {
        if (T)
          continue;
        b = !1;
        break;
      }
      if (C) {
        if (!e(a, function(D, P) {
          if (!n(C, P) && (I === D || u(I, D, l, c, d)))
            return C.push(P);
        })) {
          b = !1;
          break;
        }
      } else if (!(I === v || u(I, v, l, c, d))) {
        b = !1;
        break;
      }
    }
    return d.delete(s), d.delete(a), b;
  }
  return Sd = o, Sd;
}
var Cd, K0;
function xI() {
  if (K0) return Cd;
  K0 = 1;
  var t = ii(), e = t.Uint8Array;
  return Cd = e, Cd;
}
var Rd, U0;
function kI() {
  if (U0) return Rd;
  U0 = 1;
  function t(e) {
    var n = -1, r = Array(e.size);
    return e.forEach(function(i, o) {
      r[++n] = [o, i];
    }), r;
  }
  return Rd = t, Rd;
}
var Td, G0;
function SI() {
  if (G0) return Td;
  G0 = 1;
  var t = Hs(), e = xI(), n = lh(), r = q1(), i = kI(), o = Nh(), s = 1, a = 2, l = "[object Boolean]", c = "[object Date]", u = "[object Error]", d = "[object Map]", f = "[object Number]", h = "[object RegExp]", p = "[object Set]", g = "[object String]", y = "[object Symbol]", m = "[object ArrayBuffer]", b = "[object DataView]", C = t ? t.prototype : void 0, I = C ? C.valueOf : void 0;
  function v(T, D, P, S, z, k, x) {
    switch (P) {
      case b:
        if (T.byteLength != D.byteLength || T.byteOffset != D.byteOffset)
          return !1;
        T = T.buffer, D = D.buffer;
      case m:
        return !(T.byteLength != D.byteLength || !k(new e(T), new e(D)));
      case l:
      case c:
      case f:
        return n(+T, +D);
      case u:
        return T.name == D.name && T.message == D.message;
      case h:
      case g:
        return T == D + "";
      case d:
        var M = i;
      case p:
        var _ = S & s;
        if (M || (M = o), T.size != D.size && !_)
          return !1;
        var E = x.get(T);
        if (E)
          return E == D;
        S |= a, x.set(T, D);
        var O = r(M(T), M(D), S, z, k, x);
        return x.delete(T), O;
      case y:
        if (I)
          return I.call(T) == I.call(D);
    }
    return !1;
  }
  return Td = v, Td;
}
var Ed, Y0;
function CI() {
  if (Y0) return Ed;
  Y0 = 1;
  var t = I1(), e = ri();
  function n(r, i, o) {
    var s = i(r);
    return e(r) ? s : t(s, o(r));
  }
  return Ed = n, Ed;
}
var Md, X0;
function RI() {
  if (X0) return Md;
  X0 = 1;
  function t(e, n) {
    for (var r = -1, i = e == null ? 0 : e.length, o = 0, s = []; ++r < i; ) {
      var a = e[r];
      n(a, r, e) && (s[o++] = a);
    }
    return s;
  }
  return Md = t, Md;
}
var Id, V0;
function TI() {
  if (V0) return Id;
  V0 = 1;
  function t() {
    return [];
  }
  return Id = t, Id;
}
var Ad, J0;
function EI() {
  if (J0) return Ad;
  J0 = 1;
  var t = RI(), e = TI(), n = Object.prototype, r = n.propertyIsEnumerable, i = Object.getOwnPropertySymbols, o = i ? function(s) {
    return s == null ? [] : (s = Object(s), t(i(s), function(a) {
      return r.call(s, a);
    }));
  } : e;
  return Ad = o, Ad;
}
var _d, Z0;
function MI() {
  if (Z0) return _d;
  Z0 = 1;
  var t = CI(), e = EI(), n = Lh();
  function r(i) {
    return t(i, n, e);
  }
  return _d = r, _d;
}
var Pd, Q0;
function II() {
  if (Q0) return Pd;
  Q0 = 1;
  var t = MI(), e = 1, n = Object.prototype, r = n.hasOwnProperty;
  function i(o, s, a, l, c, u) {
    var d = a & e, f = t(o), h = f.length, p = t(s), g = p.length;
    if (h != g && !d)
      return !1;
    for (var y = h; y--; ) {
      var m = f[y];
      if (!(d ? m in s : r.call(s, m)))
        return !1;
    }
    var b = u.get(o), C = u.get(s);
    if (b && C)
      return b == s && C == o;
    var I = !0;
    u.set(o, s), u.set(s, o);
    for (var v = d; ++y < h; ) {
      m = f[y];
      var T = o[m], D = s[m];
      if (l)
        var P = d ? l(D, T, m, s, o, u) : l(T, D, m, o, s, u);
      if (!(P === void 0 ? T === D || c(T, D, a, l, u) : P)) {
        I = !1;
        break;
      }
      v || (v = m == "constructor");
    }
    if (I && !v) {
      var S = o.constructor, z = s.constructor;
      S != z && "constructor" in o && "constructor" in s && !(typeof S == "function" && S instanceof S && typeof z == "function" && z instanceof z) && (I = !1);
    }
    return u.delete(o), u.delete(s), I;
  }
  return Pd = i, Pd;
}
var Dd, ey;
function AI() {
  if (ey) return Dd;
  ey = 1;
  var t = lo(), e = ii(), n = t(e, "DataView");
  return Dd = n, Dd;
}
var Nd, ty;
function _I() {
  if (ty) return Nd;
  ty = 1;
  var t = lo(), e = ii(), n = t(e, "Promise");
  return Nd = n, Nd;
}
var Od, ny;
function PI() {
  if (ny) return Od;
  ny = 1;
  var t = lo(), e = ii(), n = t(e, "WeakMap");
  return Od = n, Od;
}
var zd, ry;
function DI() {
  if (ry) return zd;
  ry = 1;
  var t = AI(), e = ch(), n = _I(), r = M1(), i = PI(), o = Bs(), s = Fv(), a = "[object Map]", l = "[object Object]", c = "[object Promise]", u = "[object Set]", d = "[object WeakMap]", f = "[object DataView]", h = s(t), p = s(e), g = s(n), y = s(r), m = s(i), b = o;
  return (t && b(new t(new ArrayBuffer(1))) != f || e && b(new e()) != a || n && b(n.resolve()) != c || r && b(new r()) != u || i && b(new i()) != d) && (b = function(C) {
    var I = o(C), v = I == l ? C.constructor : void 0, T = v ? s(v) : "";
    if (T)
      switch (T) {
        case h:
          return f;
        case p:
          return a;
        case g:
          return c;
        case y:
          return u;
        case m:
          return d;
      }
    return I;
  }), zd = b, zd;
}
var Ld, iy;
function NI() {
  if (iy) return Ld;
  iy = 1;
  var t = B1(), e = q1(), n = SI(), r = II(), i = DI(), o = ri(), s = F1(), a = H1(), l = 1, c = "[object Arguments]", u = "[object Array]", d = "[object Object]", f = Object.prototype, h = f.hasOwnProperty;
  function p(g, y, m, b, C, I) {
    var v = o(g), T = o(y), D = v ? u : i(g), P = T ? u : i(y);
    D = D == c ? d : D, P = P == c ? d : P;
    var S = D == d, z = P == d, k = D == P;
    if (k && s(g)) {
      if (!s(y))
        return !1;
      v = !0, S = !1;
    }
    if (k && !S)
      return I || (I = new t()), v || a(g) ? e(g, y, m, b, C, I) : n(g, y, D, m, b, C, I);
    if (!(m & l)) {
      var x = S && h.call(g, "__wrapped__"), M = z && h.call(y, "__wrapped__");
      if (x || M) {
        var _ = x ? g.value() : g, E = M ? y.value() : y;
        return I || (I = new t()), C(_, E, m, b, I);
      }
    }
    return k ? (I || (I = new t()), r(g, y, m, b, C, I)) : !1;
  }
  return Ld = p, Ld;
}
var $d, oy;
function W1() {
  if (oy) return $d;
  oy = 1;
  var t = NI(), e = qs();
  function n(r, i, o, s, a) {
    return r === i ? !0 : r == null || i == null || !e(r) && !e(i) ? r !== r && i !== i : t(r, i, o, s, n, a);
  }
  return $d = n, $d;
}
var Fd, sy;
function OI() {
  if (sy) return Fd;
  sy = 1;
  var t = B1(), e = W1(), n = 1, r = 2;
  function i(o, s, a, l) {
    var c = a.length, u = c, d = !l;
    if (o == null)
      return !u;
    for (o = Object(o); c--; ) {
      var f = a[c];
      if (d && f[2] ? f[1] !== o[f[0]] : !(f[0] in o))
        return !1;
    }
    for (; ++c < u; ) {
      f = a[c];
      var h = f[0], p = o[h], g = f[1];
      if (d && f[2]) {
        if (p === void 0 && !(h in o))
          return !1;
      } else {
        var y = new t();
        if (l)
          var m = l(p, g, h, o, s, y);
        if (!(m === void 0 ? e(g, p, n | r, l, y) : m))
          return !1;
      }
    }
    return !0;
  }
  return Fd = i, Fd;
}
var Hd, ay;
function j1() {
  if (ay) return Hd;
  ay = 1;
  var t = ao();
  function e(n) {
    return n === n && !t(n);
  }
  return Hd = e, Hd;
}
var Bd, ly;
function zI() {
  if (ly) return Bd;
  ly = 1;
  var t = j1(), e = Lh();
  function n(r) {
    for (var i = e(r), o = i.length; o--; ) {
      var s = i[o], a = r[s];
      i[o] = [s, a, t(a)];
    }
    return i;
  }
  return Bd = n, Bd;
}
var qd, cy;
function K1() {
  if (cy) return qd;
  cy = 1;
  function t(e, n) {
    return function(r) {
      return r == null ? !1 : r[e] === n && (n !== void 0 || e in Object(r));
    };
  }
  return qd = t, qd;
}
var Wd, uy;
function LI() {
  if (uy) return Wd;
  uy = 1;
  var t = OI(), e = zI(), n = K1();
  function r(i) {
    var o = e(i);
    return o.length == 1 && o[0][2] ? n(o[0][0], o[0][1]) : function(s) {
      return s === i || t(s, i, o);
    };
  }
  return Wd = r, Wd;
}
var jd, dy;
function U1() {
  if (dy) return jd;
  dy = 1;
  var t = Hv(), e = kl();
  function n(r, i) {
    i = t(i, r);
    for (var o = 0, s = i.length; r != null && o < s; )
      r = r[e(i[o++])];
    return o && o == s ? r : void 0;
  }
  return jd = n, jd;
}
var Kd, fy;
function $I() {
  if (fy) return Kd;
  fy = 1;
  var t = U1();
  function e(n, r, i) {
    var o = n == null ? void 0 : t(n, r);
    return o === void 0 ? i : o;
  }
  return Kd = e, Kd;
}
var Ud, hy;
function FI() {
  if (hy) return Ud;
  hy = 1;
  function t(e, n) {
    return e != null && n in Object(e);
  }
  return Ud = t, Ud;
}
var Gd, py;
function HI() {
  if (py) return Gd;
  py = 1;
  var t = FI(), e = Bv();
  function n(r, i) {
    return r != null && e(r, i, t);
  }
  return Gd = n, Gd;
}
var Yd, gy;
function BI() {
  if (gy) return Yd;
  gy = 1;
  var t = W1(), e = $I(), n = HI(), r = ah(), i = j1(), o = K1(), s = kl(), a = 1, l = 2;
  function c(u, d) {
    return r(u) && i(d) ? o(s(u), d) : function(f) {
      var h = e(f, u);
      return h === void 0 && h === d ? n(f, u) : t(d, h, a | l);
    };
  }
  return Yd = c, Yd;
}
var Xd, my;
function qI() {
  if (my) return Xd;
  my = 1;
  function t(e) {
    return e;
  }
  return Xd = t, Xd;
}
var Vd, yy;
function WI() {
  if (yy) return Vd;
  yy = 1;
  function t(e) {
    return function(n) {
      return n == null ? void 0 : n[e];
    };
  }
  return Vd = t, Vd;
}
var Jd, by;
function jI() {
  if (by) return Jd;
  by = 1;
  var t = U1();
  function e(n) {
    return function(r) {
      return t(r, n);
    };
  }
  return Jd = e, Jd;
}
var Zd, vy;
function KI() {
  if (vy) return Zd;
  vy = 1;
  var t = WI(), e = jI(), n = ah(), r = kl();
  function i(o) {
    return n(o) ? t(r(o)) : e(o);
  }
  return Zd = i, Zd;
}
var Qd, wy;
function UI() {
  if (wy) return Qd;
  wy = 1;
  var t = LI(), e = BI(), n = qI(), r = ri(), i = KI();
  function o(s) {
    return typeof s == "function" ? s : s == null ? n : typeof s == "object" ? r(s) ? e(s[0], s[1]) : t(s) : i(s);
  }
  return Qd = o, Qd;
}
var ef, xy;
function GI() {
  if (xy) return ef;
  xy = 1;
  var t = ZM(), e = pI(), n = UI(), r = ri();
  function i(o, s) {
    return function(a, l) {
      var c = r(a) ? t : e, u = s ? s() : {};
      return c(a, o, n(l, 2), u);
    };
  }
  return ef = i, ef;
}
var tf, ky;
function YI() {
  if (ky) return tf;
  ky = 1;
  var t = JM(), e = GI(), n = Object.prototype, r = n.hasOwnProperty, i = e(function(o, s, a) {
    r.call(o, a) ? o[a].push(s) : t(o, a, [s]);
  });
  return tf = i, tf;
}
var XI = YI();
const VI = /* @__PURE__ */ Ni(XI);
function JI(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g, y, m, b) {
  if (m !== void 0 || e[e.length - 1] !== n[e.length - 1])
    return;
  const C = _1(y);
  zi(e, l, s, a, o, (I, v, T, D, P) => {
    if (I !== e[e.length - 1])
      return;
    v += I.width;
    const S = Math.max(v, D);
    S > r || (t.save(), t.beginPath(), t.rect(S, o + 1, 1e4, i - o - 1), t.clip(), Rl(P, T, i, c, u, p, g, C, (z, k, x, M) => {
      if (!M && y.length > 0 && !y.some((W) => Ns(v, z, 1e4, x, W.x, W.y, W.width, W.height)))
        return;
      const _ = f.hasIndex(k), E = h.hasIndex(k);
      t.beginPath();
      const O = d == null ? void 0 : d(k), L = O === void 0 ? b : di(b, O);
      L.bgCell !== b.bgCell && (t.fillStyle = L.bgCell, t.fillRect(v, z, 1e4, x)), E && (t.fillStyle = L.bgHeader, t.fillRect(v, z, 1e4, x)), _ && (t.fillStyle = L.accentLight, t.fillRect(v, z, 1e4, x));
    }), t.restore());
  });
}
function ZI(t, e, n, r, i, o, s, a, l) {
  let c = !1;
  for (const p of e)
    if (!p.sticky) {
      c = s(p.sourceIndex);
      break;
    }
  const u = l.horizontalBorderColor ?? l.borderColor, d = l.borderColor, f = c ? Wo(e) : 0;
  let h;
  if (f !== 0 && (h = Nm(d, l.bgCell), t.beginPath(), t.moveTo(f + 0.5, 0), t.lineTo(f + 0.5, r), t.strokeStyle = h, t.stroke()), i > 0) {
    const p = d === u && h !== void 0 ? h : Nm(u, l.bgCell), g = uo(o, i, a);
    t.beginPath(), t.moveTo(0, r - g + 0.5), t.lineTo(n, r - g + 0.5), t.strokeStyle = p, t.stroke();
  }
}
const G1 = (t, e, n) => {
  let r = 0, i = e, o = 0, s = n;
  if (t !== void 0 && t.length > 0) {
    r = Number.MAX_SAFE_INTEGER, o = Number.MAX_SAFE_INTEGER, i = Number.MIN_SAFE_INTEGER, s = Number.MIN_SAFE_INTEGER;
    for (const a of t)
      r = Math.min(r, a.x - 1), i = Math.max(i, a.x + a.width + 1), o = Math.min(o, a.y - 1), s = Math.max(s, a.y + a.height + 1);
  }
  return { minX: r, maxX: i, minY: o, maxY: s };
};
function QI(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p) {
  var x;
  const g = p.bgCell, { minX: y, maxX: m, minY: b, maxY: C } = G1(a, o, s), I = [], v = s - uo(h, f, c);
  let T = l, D = n, P = 0;
  for (; T + i < v; ) {
    const M = T + i, _ = c(D);
    if (M >= b && M <= C - 1) {
      const E = u == null ? void 0 : u(D), O = E == null ? void 0 : E.bgCell;
      O !== void 0 && O !== g && D >= h - f && I.push({
        x: y,
        y: M,
        w: m - y,
        h: _,
        color: O
      });
    }
    T += _, D < h - f && (P = T), D++;
  }
  let S = 0;
  const z = Math.min(v, C) - P;
  if (z > 0)
    for (let M = 0; M < e.length; M++) {
      const _ = e[M];
      if (_.width === 0)
        continue;
      const E = _.sticky ? S : S + r, O = (x = _.themeOverride) == null ? void 0 : x.bgCell;
      O !== void 0 && O !== g && E >= y && E <= m && d(M + 1) && I.push({
        x: E,
        y: P,
        w: _.width,
        h: z,
        color: O
      }), S += _.width;
    }
  if (I.length === 0)
    return;
  let k;
  t.beginPath();
  for (let M = I.length - 1; M >= 0; M--) {
    const _ = I[M];
    k === void 0 ? k = _.color : _.color !== k && (t.fillStyle = k, t.fill(), t.beginPath(), k = _.color), t.rect(_.x, _.y, _.w, _.h);
  }
  k !== void 0 && (t.fillStyle = k, t.fill()), t.beginPath();
}
function Sy(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g, y, m = !1) {
  if (l !== void 0) {
    t.beginPath(), t.save(), t.rect(0, 0, o, s);
    for (const x of l)
      t.rect(x.x + 1, x.y + 1, x.width - 1, x.height - 1);
    t.clip("evenodd");
  }
  const b = y.horizontalBorderColor ?? y.borderColor, C = y.borderColor, { minX: I, maxX: v, minY: T, maxY: D } = G1(a, o, s), P = [];
  t.beginPath();
  let S = 0.5;
  for (let x = 0; x < e.length; x++) {
    const M = e[x];
    if (M.width === 0)
      continue;
    S += M.width;
    const _ = M.sticky ? S : S + r;
    _ >= I && _ <= v && h(x + 1) && P.push({
      x1: _,
      y1: Math.max(c, T),
      x2: _,
      y2: Math.min(s, D),
      color: C
    });
  }
  let z = s + 0.5;
  for (let x = g - p; x < g; x++) {
    const M = d(x);
    z -= M, P.push({ x1: I, y1: z, x2: v, y2: z, color: b });
  }
  if (m !== !0) {
    let x = u + 0.5, M = n;
    const _ = z;
    for (; x + i < _; ) {
      const E = x + i;
      if (E >= T && E <= D - 1) {
        const O = f == null ? void 0 : f(M);
        P.push({
          x1: I,
          y1: E,
          x2: v,
          y2: E,
          color: (O == null ? void 0 : O.horizontalBorderColor) ?? (O == null ? void 0 : O.borderColor) ?? b
        });
      }
      x += d(M), M++;
    }
  }
  const k = VI(P, (x) => x.color);
  for (const x of Object.keys(k)) {
    t.strokeStyle = x;
    for (const M of k[x])
      t.moveTo(M.x1, M.y1), t.lineTo(M.x2, M.y2);
    t.stroke(), t.beginPath();
  }
  l !== void 0 && t.restore();
}
function eA(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g, y, m, b) {
  const C = [];
  t.imageSmoothingEnabled = !1;
  const I = Math.min(i.cellYOffset, s), v = Math.max(i.cellYOffset, s);
  let T = 0;
  if (typeof m == "number")
    T += (v - I) * m;
  else
    for (let _ = I; _ < v; _++)
      T += m(_);
  s > i.cellYOffset && (T = -T), T += l - i.translateY;
  const D = Math.min(i.cellXOffset, o), P = Math.max(i.cellXOffset, o);
  let S = 0;
  for (let _ = D; _ < P; _++)
    S += g[_].width;
  o > i.cellXOffset && (S = -S), S += a - i.translateX;
  const z = Wo(y);
  if (S !== 0 && T !== 0)
    return {
      regions: []
    };
  const k = c > 0 ? uo(f, c, m) : 0, x = u - z - Math.abs(S), M = d - h - k - Math.abs(T) - 1;
  if (x > 150 && M > 150) {
    const _ = {
      sx: 0,
      sy: 0,
      sw: u * p,
      sh: d * p,
      dx: 0,
      dy: 0,
      dw: u * p,
      dh: d * p
    };
    if (T > 0 ? (_.sy = (h + 1) * p, _.sh = M * p, _.dy = (T + h + 1) * p, _.dh = M * p, C.push({
      x: 0,
      y: h,
      width: u,
      height: T + 1
    })) : T < 0 && (_.sy = (-T + h + 1) * p, _.sh = M * p, _.dy = (h + 1) * p, _.dh = M * p, C.push({
      x: 0,
      y: d + T - k,
      width: u,
      height: -T + k
    })), S > 0 ? (_.sx = z * p, _.sw = x * p, _.dx = (S + z) * p, _.dw = x * p, C.push({
      x: z - 1,
      y: 0,
      width: S + 2,
      // extra width to account for first col not drawing a left side border
      height: d
    })) : S < 0 && (_.sx = (z - S) * p, _.sw = x * p, _.dx = z * p, _.dw = x * p, C.push({
      x: u + S,
      y: 0,
      width: -S,
      height: d
    })), t.setTransform(1, 0, 0, 1, 0, 0), b) {
      if (z > 0 && S !== 0 && T === 0 && (r === void 0 || (n == null ? void 0 : n[1]) !== !1)) {
        const E = z * p, O = d * p;
        t.drawImage(e, 0, 0, E, O, 0, 0, E, O);
      }
      if (k > 0 && S === 0 && T !== 0 && (r === void 0 || (n == null ? void 0 : n[0]) !== !1)) {
        const E = (d - k) * p, O = u * p, L = k * p;
        t.drawImage(e, 0, E, O, L, 0, E, O, L);
      }
    }
    t.drawImage(e, _.sx, _.sy, _.sw, _.sh, _.dx, _.dy, _.dw, _.dh), t.scale(p, p);
  }
  return t.imageSmoothingEnabled = !0, {
    regions: C
  };
}
function tA(t, e, n, r, i, o, s, a, l, c) {
  const u = [];
  return e !== t.cellXOffset || n !== t.cellYOffset || r !== t.translateX || i !== t.translateY || zi(l, n, r, i, a, (d, f, h, p) => {
    if (d.sourceIndex === c) {
      const g = Math.max(f, p) + 1;
      return u.push({
        x: g,
        y: 0,
        width: o - g,
        height: s
      }), !0;
    }
  }), u;
}
function nA(t, e) {
  if (e === void 0 || t.width !== e.width || t.height !== e.height || t.theme !== e.theme || t.headerHeight !== e.headerHeight || t.rowHeight !== e.rowHeight || t.rows !== e.rows || t.freezeColumns !== e.freezeColumns || t.getRowThemeOverride !== e.getRowThemeOverride || t.isFocused !== e.isFocused || t.isResizing !== e.isResizing || t.verticalBorder !== e.verticalBorder || t.getCellContent !== e.getCellContent || t.highlightRegions !== e.highlightRegions || t.selection !== e.selection || t.dragAndDropState !== e.dragAndDropState || t.prelightCells !== e.prelightCells || t.touchMode !== e.touchMode || t.maxScaleFactor !== e.maxScaleFactor)
    return !1;
  if (t.mappedColumns !== e.mappedColumns) {
    if (t.mappedColumns.length > 100 || t.mappedColumns.length !== e.mappedColumns.length)
      return !1;
    let n;
    for (let r = 0; r < t.mappedColumns.length; r++) {
      const i = t.mappedColumns[r], o = e.mappedColumns[r];
      if (qo(i, o))
        continue;
      if (n !== void 0 || i.width === o.width)
        return !1;
      const { width: s, ...a } = i, { width: l, ...c } = o;
      if (!qo(a, c))
        return !1;
      n = r;
    }
    return n === void 0 ? !0 : n;
  }
  return !0;
}
function Cy(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g) {
  const y = p == null ? void 0 : p.filter((D) => D.style !== "no-outline");
  if (y === void 0 || y.length === 0)
    return;
  const m = Wo(a), b = uo(h, f, d), C = [l, 0, a.length, h - f], I = [m, 0, e, n - b], v = y.map((D) => {
    const P = D.range, S = D.style ?? "dashed";
    return jM(P, C, e, n, I).map((z) => {
      const k = z.rect, x = Af(k.x, k.y, e, n, u, c + u, r, i, o, s, h, l, f, a, d), M = k.width === 1 && k.height === 1 ? x : Af(k.x + k.width - 1, k.y + k.height - 1, e, n, u, c + u, r, i, o, s, h, l, f, a, d);
      return k.x + k.width >= a.length && (M.width -= 1), k.y + k.height >= h && (M.height -= 1), {
        color: D.color,
        style: S,
        clip: z.clip,
        rect: WM({
          x: x.x,
          y: x.y,
          width: M.x + M.width - x.x,
          height: M.y + M.height - x.y
        }, e, n, 8)
      };
    });
  }), T = () => {
    t.lineWidth = 1;
    let D = !1;
    for (const P of v)
      for (const S of P)
        if ((S == null ? void 0 : S.rect) !== void 0 && Ns(0, 0, e, n, S.rect.x, S.rect.y, S.rect.width, S.rect.height)) {
          const z = D, k = !qM(S.clip, S.rect);
          t.beginPath(), k && (t.save(), t.rect(S.clip.x, S.clip.y, S.clip.width, S.clip.height), t.clip()), S.style === "dashed" && !D ? (t.setLineDash([5, 3]), D = !0) : (S.style === "solid" || S.style === "solid-outline") && D && (t.setLineDash([]), D = !1), t.strokeStyle = S.style === "solid-outline" ? yr(yr(S.color, g.borderColor), g.bgCell) : io(S.color, 1), t.closePath(), t.strokeRect(S.rect.x + 0.5, S.rect.y + 0.5, S.rect.width - 1, S.rect.height - 1), k && (t.restore(), D = z);
        }
    D && t.setLineDash([]);
  };
  return T(), T;
}
function Ry(t, e, n, r, i) {
  t.beginPath(), t.moveTo(e, n), t.lineTo(e, r), t.lineWidth = 2, t.strokeStyle = i, t.stroke(), t.globalAlpha = 1;
}
function nf(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g, y) {
  if (u.current === void 0)
    return;
  const m = g !== !1 && g !== void 0;
  if (!m)
    return;
  const b = typeof g == "object" ? { ...Ja, ...g } : Ja, C = u.current.range, I = u.current.cell, v = [C.x + C.width - 1, C.y + C.height - 1];
  if (I[1] >= y && v[1] >= y || !s.some((O) => O.sourceIndex === I[0] || O.sourceIndex === v[0]))
    return;
  const [D, P] = u.current.cell, S = f(u.current.cell), z = S.span ?? [D, D], k = P >= y - h, x = h > 0 && !k ? uo(y, h, d) - 1 : 0, M = v[1];
  let _;
  if (zi(s, r, i, o, c, (O, L, W, re, F) => {
    if (O.sticky && D > O.sourceIndex)
      return;
    const N = O.sourceIndex < z[0], te = O.sourceIndex > z[1], Y = O.sourceIndex === v[0];
    if (!(!Y && (N || te)))
      return Rl(F, W, n, y, d, h, p, void 0, (j, ee, H) => {
        if (ee !== P && ee !== M)
          return;
        let Z = L, J = O.width;
        if (S.span !== void 0) {
          const K = D1(S.span, L, j, O.width, H, O, a), le = O.sticky ? K[0] : K[1];
          le !== void 0 && (Z = le.x, J = le.width);
        }
        return ee === M && Y && m && (_ = () => {
          var we;
          re > Z && !O.sticky && (t.beginPath(), t.rect(re, 0, e - re, n), t.clip());
          const K = b.size, le = K / 2, ue = Z + J + b.offsetX - le + 0.5, ke = j + H + b.offsetY - le + 0.5;
          t.beginPath(), b.shape === "circle" ? t.arc(ue + le, ke + le, le, 0, Math.PI * 2) : t.rect(ue, ke, K, K), t.fillStyle = ((we = O.themeOverride) == null ? void 0 : we.accentColor) ?? l.accentColor, t.fill(), b.outline > 0 && (t.lineWidth = b.outline, t.strokeStyle = l.bgCell, b.shape === "circle" ? (t.beginPath(), t.arc(ue + le, ke + le, le + b.outline / 2, 0, Math.PI * 2), t.stroke()) : t.strokeRect(ue - b.outline / 2, ke - b.outline / 2, K + b.outline, K + b.outline));
        }), _ !== void 0;
      }), _ !== void 0;
  }), _ === void 0)
    return;
  const E = () => {
    t.save(), t.beginPath(), t.rect(0, c, e, n - c - x), t.clip(), _ == null || _(), t.restore();
  };
  return E(), E;
}
function rA(t, e, n, r, i, o, s, a, l) {
  l === void 0 || l.size === 0 || (t.beginPath(), P1(e, n, o, r, (c, u, d, f, h, p) => {
    l.hasItemInRectangle({
      x: c[0],
      y: -2,
      width: c[1] - c[0] + 1,
      height: 1
    }) && t.rect(d, f, h, p);
  }), zi(e, a, o, s, i, (c, u, d, f) => {
    const h = Math.max(0, f - u), p = u + h + 1, g = c.width - h - 1;
    l.has([c.sourceIndex, -1]) && t.rect(p, r, g, i - r);
  }), t.clip());
}
function iA(t, e, n, r, i, o, s, a, l, c) {
  let u = 0;
  return zi(t, o, r, i, n, (d, f, h, p, g) => (Rl(g, h, e, s, a, l, c, void 0, (y, m, b, C) => {
    C || (u = Math.max(m, u));
  }), !0)), u;
}
function Ty(t, e) {
  var ie;
  const { canvasCtx: n, headerCanvasCtx: r, width: i, height: o, cellXOffset: s, cellYOffset: a, translateX: l, translateY: c, mappedColumns: u, enableGroups: d, freezeColumns: f, dragAndDropState: h, theme: p, drawFocus: g, headerHeight: y, groupHeaderHeight: m, disabledRows: b, rowHeight: C, verticalBorder: I, overrideCursor: v, isResizing: T, selection: D, fillHandle: P, freezeTrailingRows: S, rows: z, getCellContent: k, getGroupDetails: x, getRowThemeOverride: M, isFocused: _, drawHeaderCallback: E, prelightCells: O, drawCellCallback: L, highlightRegions: W, resizeCol: re, imageLoader: F, lastBlitData: N, hoverValues: te, hyperWrapping: Y, hoverInfo: j, spriteManager: ee, maxScaleFactor: H, hasAppendRow: Z, touchMode: J, enqueue: V, renderStateProvider: K, getCellRenderer: le, renderStrategy: ue, bufferACtx: ke, bufferBCtx: we, damage: He, minimumCellWidth: nt, resizeIndicator: bt } = t;
  if (i === 0 || o === 0)
    return;
  const gt = ue === "double-buffer", ne = Math.min(H, Math.ceil(window.devicePixelRatio ?? 1)), Ne = ue !== "direct" && nA(t, e), Ae = n.canvas;
  (Ae.width !== i * ne || Ae.height !== o * ne) && (Ae.width = i * ne, Ae.height = o * ne, Ae.style.width = i + "px", Ae.style.height = o + "px");
  const Ke = r.canvas, $e = d ? m + y : y, Oe = $e + 1;
  (Ke.width !== i * ne || Ke.height !== Oe * ne) && (Ke.width = i * ne, Ke.height = Oe * ne, Ke.style.width = i + "px", Ke.style.height = Oe + "px");
  const et = ke.canvas, ht = we.canvas;
  gt && (et.width !== i * ne || et.height !== o * ne) && (et.width = i * ne, et.height = o * ne, N.current !== void 0 && (N.current.aBufferScroll = void 0)), gt && (ht.width !== i * ne || ht.height !== o * ne) && (ht.width = i * ne, ht.height = o * ne, N.current !== void 0 && (N.current.bBufferScroll = void 0));
  const Se = N.current;
  if (Ne === !0 && s === (Se == null ? void 0 : Se.cellXOffset) && a === (Se == null ? void 0 : Se.cellYOffset) && l === (Se == null ? void 0 : Se.translateX) && c === (Se == null ? void 0 : Se.translateY))
    return;
  let Ze = null;
  gt && (Ze = n);
  const Ct = r;
  let wt;
  gt ? He !== void 0 ? wt = (Se == null ? void 0 : Se.lastBuffer) === "b" ? we : ke : wt = (Se == null ? void 0 : Se.lastBuffer) === "b" ? ke : we : wt = n;
  const Ve = wt.canvas, Et = gt ? Ve === et ? ht : et : Ae, pt = typeof C == "number" ? () => C : C;
  Ct.save(), wt.save(), Ct.beginPath(), wt.beginPath(), Ct.textBaseline = "middle", wt.textBaseline = "middle", ne !== 1 && (Ct.scale(ne, ne), wt.scale(ne, ne));
  const mt = If(u, s, i, h, l);
  let zt = [];
  const Bt = g && ((ie = D.current) == null ? void 0 : ie.cell[1]) === a && c === 0;
  let nn = !1;
  if (W !== void 0) {
    for (const de of W)
      if (de.style !== "no-outline" && de.range.y === a && c === 0) {
        nn = !0;
        break;
      }
  }
  const vt = () => {
    GM(Ct, mt, d, j, i, l, y, m, h, T, D, p, ee, te, I, x, He, E, J), Sy(Ct, mt, a, l, c, i, o, void 0, void 0, m, $e, pt, M, I, S, z, p, !0), Ct.beginPath(), Ct.moveTo(0, Oe - 0.5), Ct.lineTo(i, Oe - 0.5), Ct.strokeStyle = yr(p.headerBottomBorderColor ?? p.horizontalBorderColor ?? p.borderColor, p.bgHeader), Ct.stroke(), nn && Cy(Ct, i, o, s, a, l, c, u, f, y, m, C, S, z, W, p), Bt && nf(Ct, i, o, a, l, c, mt, u, p, $e, D, pt, k, S, Z, P, z);
  };
  if (He !== void 0) {
    const de = mt[mt.length - 1].sourceIndex + 1, _e = He.hasItemInRegion([
      {
        x: s,
        y: -2,
        width: de,
        height: 2
      },
      {
        x: s,
        y: a,
        width: de,
        height: 300
      },
      {
        x: 0,
        y: a,
        width: f,
        height: 300
      },
      {
        x: 0,
        y: -2,
        width: f,
        height: 2
      },
      {
        x: s,
        y: z - S,
        width: de,
        height: S,
        when: S > 0
      }
    ]), Ue = (Mt) => {
      h0(Mt, mt, u, o, $e, l, c, a, z, pt, k, x, M, b, _, g, S, Z, zt, He, D, O, W, F, ee, te, j, L, Y, p, V, K, le, v, nt);
      const Gt = D.current;
      P !== !1 && P !== void 0 && g && Gt !== void 0 && He.has(m1(Gt.range)) && nf(Mt, i, o, a, l, c, mt, u, p, $e, D, pt, k, S, Z, P, z);
    };
    _e && (Ue(wt), Ze !== null && (Ze.save(), Ze.scale(ne, ne), Ze.textBaseline = "middle", Ue(Ze), Ze.restore()), He.hasHeader() && (rA(Ct, mt, i, m, $e, l, c, a, He), vt())), wt.restore(), Ct.restore();
    return;
  }
  if ((Ne !== !0 || s !== (Se == null ? void 0 : Se.cellXOffset) || l !== (Se == null ? void 0 : Se.translateX) || Bt !== (Se == null ? void 0 : Se.mustDrawFocusOnHeader) || nn !== (Se == null ? void 0 : Se.mustDrawHighlightRingsOnHeader)) && vt(), Ne === !0) {
    mr(Et !== void 0 && Se !== void 0);
    const { regions: de } = eA(wt, Et, Et === et ? Se.aBufferScroll : Se.bBufferScroll, Et === et ? Se.bBufferScroll : Se.aBufferScroll, Se, s, a, l, c, S, i, o, z, $e, ne, u, mt, C, gt);
    zt = de;
  } else Ne !== !1 && (mr(Se !== void 0), zt = tA(Se, s, a, l, c, i, o, $e, mt, Ne));
  ZI(wt, mt, i, o, S, z, I, pt, p);
  const he = Cy(wt, i, o, s, a, l, c, u, f, y, m, C, S, z, W, p), ge = g ? nf(wt, i, o, a, l, c, mt, u, p, $e, D, pt, k, S, Z, P, z) : void 0;
  if (wt.fillStyle = p.bgCell, zt.length > 0) {
    wt.beginPath();
    for (const de of zt)
      wt.rect(de.x, de.y, de.width, de.height);
    wt.clip(), wt.fill(), wt.beginPath();
  } else
    wt.fillRect(0, 0, i, o);
  const Ce = h0(wt, mt, u, o, $e, l, c, a, z, pt, k, x, M, b, _, g, S, Z, zt, He, D, O, W, F, ee, te, j, L, Y, p, V, K, le, v, nt);
  JI(wt, mt, u, i, o, $e, l, c, a, z, pt, M, D.rows, b, S, Z, zt, He, p), QI(wt, mt, a, l, c, i, o, zt, $e, pt, M, I, S, z, p), Sy(wt, mt, a, l, c, i, o, zt, Ce, m, $e, pt, M, I, S, z, p), he == null || he(), ge == null || ge(), T && bt !== "none" && zi(mt, 0, l, 0, $e, (de, _e) => de.sourceIndex === re ? (Ry(Ct, _e + de.width, 0, $e + 1, yr(p.resizeIndicatorColor ?? p.accentLight, p.bgHeader)), bt === "full" && Ry(wt, _e + de.width, $e, o, yr(p.resizeIndicatorColor ?? p.accentLight, p.bgCell)), !0) : !1), Ze !== null && (Ze.fillStyle = p.bgCell, Ze.fillRect(0, 0, i, o), Ze.drawImage(wt.canvas, 0, 0));
  const Re = iA(mt, o, $e, l, c, a, z, pt, S, Z);
  F == null || F.setWindow({
    x: s,
    y: a,
    width: mt.length,
    height: Re - a
  }, f, Array.from({ length: S }, (de, _e) => z - 1 - _e));
  const Pe = Se !== void 0 && (s !== Se.cellXOffset || l !== Se.translateX), lt = Se !== void 0 && (a !== Se.cellYOffset || c !== Se.translateY);
  N.current = {
    cellXOffset: s,
    cellYOffset: a,
    translateX: l,
    translateY: c,
    mustDrawFocusOnHeader: Bt,
    mustDrawHighlightRingsOnHeader: nn,
    lastBuffer: gt ? Ve === et ? "a" : "b" : void 0,
    aBufferScroll: Ve === et ? [Pe, lt] : Se == null ? void 0 : Se.aBufferScroll,
    bBufferScroll: Ve === ht ? [Pe, lt] : Se == null ? void 0 : Se.bBufferScroll
  }, wt.restore(), Ct.restore();
}
const oA = 80;
function sA(t) {
  const e = t - 1;
  return e * e * e + 1;
}
class aA {
  constructor(e) {
    Qe(this, "callback");
    Qe(this, "currentHoveredItem");
    Qe(this, "leavingItems", []);
    Qe(this, "lastAnimationTime");
    Qe(this, "addToLeavingItems", (e) => {
      this.leavingItems.some((r) => ks(r.item, e.item)) || this.leavingItems.push(e);
    });
    /**
     * @returns the hover amount of the item, if it was leaving (0 if not).
     */
    Qe(this, "removeFromLeavingItems", (e) => {
      const n = this.leavingItems.find((r) => ks(r.item, e));
      return this.leavingItems = this.leavingItems.filter((r) => r !== n), (n == null ? void 0 : n.hoverAmount) ?? 0;
    });
    Qe(this, "cleanUpLeavingElements", () => {
      this.leavingItems = this.leavingItems.filter((e) => e.hoverAmount > 0);
    });
    Qe(this, "shouldStep", () => {
      const e = this.leavingItems.length > 0, n = this.currentHoveredItem !== void 0 && this.currentHoveredItem.hoverAmount < 1;
      return e || n;
    });
    Qe(this, "getAnimatingItems", () => this.currentHoveredItem !== void 0 ? [...this.leavingItems, this.currentHoveredItem] : this.leavingItems.map((e) => ({ ...e, hoverAmount: sA(e.hoverAmount) })));
    Qe(this, "step", (e) => {
      if (this.lastAnimationTime === void 0)
        this.lastAnimationTime = e;
      else {
        const r = (e - this.lastAnimationTime) / oA;
        for (const o of this.leavingItems)
          o.hoverAmount = Er(o.hoverAmount - r, 0, 1);
        this.currentHoveredItem !== void 0 && (this.currentHoveredItem.hoverAmount = Er(this.currentHoveredItem.hoverAmount + r, 0, 1));
        const i = this.getAnimatingItems();
        this.callback(i), this.cleanUpLeavingElements();
      }
      this.shouldStep() ? (this.lastAnimationTime = e, window.requestAnimationFrame(this.step)) : this.lastAnimationTime = void 0;
    });
    Qe(this, "setHovered", (e) => {
      var n;
      if (!ks((n = this.currentHoveredItem) == null ? void 0 : n.item, e)) {
        if (this.currentHoveredItem !== void 0 && this.addToLeavingItems(this.currentHoveredItem), e !== void 0) {
          const r = this.removeFromLeavingItems(e);
          this.currentHoveredItem = {
            item: e,
            hoverAmount: r
          };
        } else
          this.currentHoveredItem = void 0;
        this.lastAnimationTime === void 0 && window.requestAnimationFrame(this.step);
      }
    });
    this.callback = e;
  }
}
class lA {
  constructor(e) {
    Qe(this, "fn");
    Qe(this, "val");
    this.fn = e;
  }
  get value() {
    return this.val ?? (this.val = this.fn());
  }
}
function $h(t) {
  return new lA(t);
}
const cA = $h(() => window.navigator.userAgent.includes("Firefox")), tl = $h(() => window.navigator.userAgent.includes("Mac OS") && window.navigator.userAgent.includes("Safari") && !window.navigator.userAgent.includes("Chrome")), nl = $h(() => window.navigator.platform.toLowerCase().startsWith("mac"));
function uA(t) {
  const e = w.useRef([]), n = w.useRef(0), r = w.useRef(t);
  r.current = t;
  const i = w.useCallback(() => {
    const o = () => window.requestAnimationFrame(s), s = () => {
      const a = e.current.map(Ph);
      e.current = [], r.current(new Cs(a)), e.current.length > 0 ? n.current++ : n.current = 0;
    };
    window.requestAnimationFrame(n.current > 600 ? o : s);
  }, []);
  return w.useCallback((o) => {
    e.current.length === 0 && i();
    const s = qr(o[0], o[1]);
    e.current.includes(s) || e.current.push(s);
  }, [i]);
}
const Ei = "header", Br = "group-header", rl = "out-of-bounds";
var Do;
(function(t) {
  t[t.Start = -2] = "Start", t[t.StartPadding = -1] = "StartPadding", t[t.Center = 0] = "Center", t[t.EndPadding = 1] = "EndPadding", t[t.End = 2] = "End";
})(Do || (Do = {}));
function Y1(t, e) {
  return t === e ? !0 : (t == null ? void 0 : t.kind) === "out-of-bounds" ? (t == null ? void 0 : t.kind) === (e == null ? void 0 : e.kind) && (t == null ? void 0 : t.location[0]) === (e == null ? void 0 : e.location[0]) && (t == null ? void 0 : t.location[1]) === (e == null ? void 0 : e.location[1]) && (t == null ? void 0 : t.region[0]) === (e == null ? void 0 : e.region[0]) && (t == null ? void 0 : t.region[1]) === (e == null ? void 0 : e.region[1]) : (t == null ? void 0 : t.kind) === (e == null ? void 0 : e.kind) && (t == null ? void 0 : t.location[0]) === (e == null ? void 0 : e.location[0]) && (t == null ? void 0 : t.location[1]) === (e == null ? void 0 : e.location[1]);
}
const dA = (t, e) => {
  if (t.kind === Be.Custom)
    return t.copyData;
  const n = e == null ? void 0 : e(t);
  return (n == null ? void 0 : n.getAccessibilityString(t)) ?? "";
}, fA = (t, e) => {
  const { width: n, height: r, accessibilityHeight: i, columns: o, cellXOffset: s, cellYOffset: a, headerHeight: l, fillHandle: c = !1, groupHeaderHeight: u, rowHeight: d, rows: f, getCellContent: h, getRowThemeOverride: p, onHeaderMenuClick: g, onHeaderIndicatorClick: y, enableGroups: m, isFilling: b, onCanvasFocused: C, onCanvasBlur: I, isFocused: v, selection: T, freezeColumns: D, onContextMenu: P, freezeTrailingRows: S, fixedShadowX: z = !0, fixedShadowY: k = !0, drawFocusRing: x, onMouseDown: M, onMouseUp: _, onMouseMoveRaw: E, onMouseMove: O, onItemHovered: L, dragAndDropState: W, firstColAccessible: re, onKeyDown: F, onKeyUp: N, highlightRegions: te, canvasRef: Y, onDragStart: j, onDragEnd: ee, eventTargetRef: H, isResizing: Z, resizeColumn: J, isDragging: V, isDraggable: K = !1, allowResize: le, disabledRows: ue, hasAppendRow: ke, getGroupDetails: we, theme: He, prelightCells: nt, headerIcons: bt, verticalBorder: gt, drawCell: ne, drawHeader: Ne, onCellFocused: Ae, onDragOverCell: Ke, onDrop: $e, onDragLeave: Oe, imageWindowLoader: et, smoothScrollX: ht = !1, smoothScrollY: Se = !1, experimental: Ze, getCellRenderer: Ct, resizeIndicator: wt = "full" } = t, Ve = t.translateX ?? 0, Et = t.translateY ?? 0, pt = Math.max(D, Math.min(o.length - 1, s)), mt = w.useRef(null), zt = w.useRef((Ze == null ? void 0 : Ze.eventTarget) ?? window), Bt = zt.current, nn = et, vt = w.useRef(), [he, ge] = w.useState(!1), Ce = w.useRef([]), Re = w.useRef(), [Pe, lt] = w.useState(), [ie, de] = w.useState(), _e = w.useRef(null), [Ue, Mt] = w.useState(), [Gt, it] = w.useState(!1), Q = w.useRef(Gt);
  Q.current = Gt;
  const xe = w.useMemo(() => new HM(bt, () => {
    ur.current = void 0, dn.current();
  }), [bt]), Ie = m ? u + l : l, Je = w.useRef(-1), ft = ((Ze == null ? void 0 : Ze.enableFirefoxRescaling) ?? !1) && cA.value, Dt = ((Ze == null ? void 0 : Ze.enableSafariRescaling) ?? !1) && tl.value;
  w.useLayoutEffect(() => {
    window.devicePixelRatio === 1 || !ft && !Dt || (Je.current !== -1 && ge(!0), window.clearTimeout(Je.current), Je.current = window.setTimeout(() => {
      ge(!1), Je.current = -1;
    }, 200));
  }, [a, pt, Ve, Et, ft, Dt]);
  const ot = bE(o, D), Rt = w.useMemo(() => z ? Wo(ot, W) : 0, [ot, W, z]), It = w.useCallback((X, be, st) => {
    const at = X.getBoundingClientRect();
    if (be >= ot.length || st >= f)
      return;
    const qe = at.width / n, We = Af(be, st, n, r, u, Ie, pt, a, Ve, Et, f, D, S, ot, d);
    return qe !== 1 && (We.x *= qe, We.y *= qe, We.width *= qe, We.height *= qe), We.x += at.x, We.y += at.y, We;
  }, [
    n,
    r,
    u,
    Ie,
    pt,
    a,
    Ve,
    Et,
    f,
    D,
    S,
    ot,
    d
  ]), Tt = w.useCallback((X, be, st, at) => {
    const qe = X.getBoundingClientRect(), We = qe.width / n, At = (be - qe.left) / We, Yt = (st - qe.top) / We, yt = 5, Ln = If(ot, pt, n, void 0, Ve);
    let kt = 0, Xt = 0;
    const Ft = typeof PointerEvent < "u" && at instanceof PointerEvent && at.pointerType === "mouse" || typeof MouseEvent < "u" && at instanceof MouseEvent, Ht = typeof PointerEvent < "u" && at instanceof PointerEvent && at.pointerType === "touch" || typeof TouchEvent < "u" && at instanceof TouchEvent;
    Ft && (kt = at.button, Xt = at.buttons);
    const Lt = kE(At, Ln, Ve), Jt = SE(Yt, r, m, l, u, f, d, a, Et, S), En = (at == null ? void 0 : at.shiftKey) === !0, Dr = (at == null ? void 0 : at.ctrlKey) === !0, Nr = (at == null ? void 0 : at.metaKey) === !0, xn = [
      At < 0 ? -1 : n < At ? 1 : 0,
      Yt < Ie ? -1 : r < Yt ? 1 : 0
    ];
    let An;
    if (Lt === -1 || Yt < 0 || At < 0 || Jt === void 0 || At > n || Yt > r) {
      const an = At > n ? 1 : At < 0 ? -1 : 0, Sr = Yt > r ? 1 : Yt < 0 ? -1 : 0;
      let Xn = an * 2, go = Sr * 2;
      an === 0 && (Xn = Lt === -1 ? Do.EndPadding : Do.Center), Sr === 0 && (go = Jt === void 0 ? Do.EndPadding : Do.Center);
      let si = !1;
      if (Lt === -1 && Jt === -1) {
        const $n = It(X, ot.length - 1, -1);
        mr($n !== void 0), si = be < $n.x + $n.width + yt;
      }
      const jt = At > n && At < n + Sf() || Yt > r && Yt < r + Sf();
      An = {
        kind: rl,
        location: [Lt !== -1 ? Lt : At < 0 ? 0 : ot.length - 1, Jt ?? f - 1],
        region: [Xn, go],
        shiftKey: En,
        ctrlKey: Dr,
        metaKey: Nr,
        isEdge: si,
        isTouch: Ht,
        button: kt,
        buttons: Xt,
        scrollEdge: xn,
        isMaybeScrollbar: jt
      };
    } else if (Jt <= -1) {
      let an = It(X, Lt, Jt);
      mr(an !== void 0);
      let Sr = an !== void 0 && an.x + an.width - be <= yt;
      const Xn = Lt - 1;
      be - an.x <= yt && Xn >= 0 ? (Sr = !0, an = It(X, Xn, Jt), mr(an !== void 0), An = {
        kind: m && Jt === -2 ? Br : Ei,
        location: [Xn, Jt],
        bounds: an,
        group: ot[Xn].group ?? "",
        isEdge: Sr,
        shiftKey: En,
        ctrlKey: Dr,
        metaKey: Nr,
        isTouch: Ht,
        localEventX: be - an.x,
        localEventY: st - an.y,
        button: kt,
        buttons: Xt,
        scrollEdge: xn
      }) : An = {
        kind: m && Jt === -2 ? Br : Ei,
        group: ot[Lt].group ?? "",
        location: [Lt, Jt],
        bounds: an,
        isEdge: Sr,
        shiftKey: En,
        ctrlKey: Dr,
        metaKey: Nr,
        isTouch: Ht,
        localEventX: be - an.x,
        localEventY: st - an.y,
        button: kt,
        buttons: Xt,
        scrollEdge: xn
      };
    } else {
      const an = It(X, Lt, Jt);
      mr(an !== void 0);
      const Sr = an !== void 0 && an.x + an.width - be < yt;
      let Xn = !1;
      if (c !== !1 && c !== void 0 && T.current !== void 0) {
        const si = typeof c == "object" ? { ...Ja, ...c } : Ja, jt = si.size, $n = jt / 2, Bi = m1(T.current.range), bi = It(X, Bi[0], Bi[1]);
        if (bi !== void 0) {
          const ai = bi.x + bi.width + si.offsetX - $n + 0.5, hn = bi.y + bi.height + si.offsetY - $n + 0.5;
          Xn = Math.abs(ai - be) < jt && Math.abs(hn - st) < jt;
        }
      }
      An = {
        kind: "cell",
        location: [Lt, Jt],
        bounds: an,
        isEdge: Sr,
        shiftKey: En,
        ctrlKey: Dr,
        isFillHandle: Xn,
        metaKey: Nr,
        isTouch: Ht,
        localEventX: be - an.x,
        localEventY: st - an.y,
        button: kt,
        buttons: Xt,
        scrollEdge: xn
      };
    }
    return An;
  }, [
    n,
    ot,
    pt,
    Ve,
    r,
    m,
    l,
    u,
    f,
    d,
    a,
    Et,
    S,
    It,
    c,
    T,
    Ie
  ]), [rn] = Pe ?? [], xr = w.useRef(() => {
  }), qt = w.useRef(Pe);
  qt.current = Pe;
  const [yn, On] = w.useMemo(() => {
    const X = document.createElement("canvas"), be = document.createElement("canvas");
    return X.style.display = "none", X.style.opacity = "0", X.style.position = "fixed", be.style.display = "none", be.style.opacity = "0", be.style.position = "fixed", [X.getContext("2d", { alpha: !1 }), be.getContext("2d", { alpha: !1 })];
  }, []);
  w.useLayoutEffect(() => {
    if (!(yn === null || On === null))
      return document.documentElement.append(yn.canvas), document.documentElement.append(On.canvas), () => {
        yn.canvas.remove(), On.canvas.remove();
      };
  }, [yn, On]);
  const Gn = w.useMemo(() => new PE(), []), Vt = ft && he ? 1 : Dt && he ? 2 : 5, zn = (Ze == null ? void 0 : Ze.disableMinimumCellWidth) === !0 ? 1 : 10, ur = w.useRef(), bn = w.useRef(null), dr = w.useRef(null), Yn = w.useCallback(() => {
    var At;
    const X = mt.current, be = _e.current;
    if (X === null || be === null || (bn.current === null && (bn.current = X.getContext("2d", { alpha: !1 }), X.width = 0, X.height = 0), dr.current === null && (dr.current = be.getContext("2d", { alpha: !1 }), be.width = 0, be.height = 0), bn.current === null || dr.current === null || yn === null || On === null))
      return;
    let st = !1;
    const at = (Yt) => {
      st = !0, Mt(Yt);
    }, qe = ur.current, We = {
      headerCanvasCtx: dr.current,
      canvasCtx: bn.current,
      bufferACtx: yn,
      bufferBCtx: On,
      width: n,
      height: r,
      cellXOffset: pt,
      cellYOffset: a,
      translateX: Math.round(Ve),
      translateY: Math.round(Et),
      mappedColumns: ot,
      enableGroups: m,
      freezeColumns: D,
      dragAndDropState: W,
      theme: He,
      headerHeight: l,
      groupHeaderHeight: u,
      disabledRows: ue ?? on.empty(),
      rowHeight: d,
      verticalBorder: gt,
      isResizing: Z,
      resizeCol: J,
      isFocused: v,
      selection: T,
      fillHandle: c,
      drawCellCallback: ne,
      hasAppendRow: ke,
      overrideCursor: at,
      maxScaleFactor: Vt,
      freezeTrailingRows: S,
      rows: f,
      drawFocus: x,
      getCellContent: h,
      getGroupDetails: we ?? ((Yt) => ({ name: Yt })),
      getRowThemeOverride: p,
      drawHeaderCallback: Ne,
      prelightCells: nt,
      highlightRegions: te,
      imageLoader: nn,
      lastBlitData: Re,
      damage: vt.current,
      hoverValues: Ce.current,
      hoverInfo: qt.current,
      spriteManager: xe,
      scrolling: he,
      hyperWrapping: (Ze == null ? void 0 : Ze.hyperWrapping) ?? !1,
      touchMode: Gt,
      enqueue: xr.current,
      renderStateProvider: Gn,
      renderStrategy: (Ze == null ? void 0 : Ze.renderStrategy) ?? (tl.value ? "double-buffer" : "single-buffer"),
      getCellRenderer: Ct,
      minimumCellWidth: zn,
      resizeIndicator: wt
    };
    We.damage === void 0 ? (ur.current = We, Ty(We, qe)) : Ty(We, void 0), !st && (We.damage === void 0 || We.damage.has((At = qt == null ? void 0 : qt.current) == null ? void 0 : At[0])) && Mt(void 0);
  }, [
    yn,
    On,
    n,
    r,
    pt,
    a,
    Ve,
    Et,
    ot,
    m,
    D,
    W,
    He,
    l,
    u,
    ue,
    d,
    gt,
    Z,
    ke,
    J,
    v,
    T,
    c,
    S,
    f,
    x,
    Vt,
    h,
    we,
    p,
    ne,
    Ne,
    nt,
    te,
    nn,
    xe,
    he,
    Ze == null ? void 0 : Ze.hyperWrapping,
    Ze == null ? void 0 : Ze.renderStrategy,
    Gt,
    Gn,
    Ct,
    zn,
    wt
  ]), dn = w.useRef(Yn);
  w.useLayoutEffect(() => {
    Yn(), dn.current = Yn;
  }, [Yn]), w.useLayoutEffect(() => {
    (async () => {
      var be;
      ((be = document == null ? void 0 : document.fonts) == null ? void 0 : be.ready) !== void 0 && (await document.fonts.ready, ur.current = void 0, dn.current());
    })();
  }, []);
  const Sn = w.useCallback((X) => {
    vt.current = X, dn.current(), vt.current = void 0;
  }, []), rr = uA(Sn);
  xr.current = rr;
  const Pr = w.useCallback((X) => {
    Sn(new Cs(X.map((be) => be.cell)));
  }, [Sn]);
  nn.setCallback(Sn);
  const [pi, Ur] = w.useState(!1), [Qn, kr] = rn ?? [], gi = Qn !== void 0 && kr === -1 && Qn >= 0 && Qn < ot.length && ot[Qn].headerRowMarkerDisabled !== !0, Gr = Qn !== void 0 && kr === -2;
  let ir = !1, Ee = !1, tt = Ue;
  if (tt === void 0 && Qn !== void 0 && kr !== void 0 && kr > -1 && kr < f) {
    const X = h([Qn, kr], !0);
    ir = X.kind === Ir.NewRow || X.kind === Ir.Marker && X.markerKind !== "number", Ee = X.kind === Be.Boolean && gh(X), tt = X.cursor;
  }
  const vn = V ? "grabbing" : (ie ?? !1) || Z ? "col-resize" : pi || b ? "crosshair" : tt !== void 0 ? tt : gi || ir || Ee || Gr ? "pointer" : "default", Zt = w.useMemo(() => ({
    // width,
    // height,
    contain: "strict",
    display: "block",
    cursor: vn
  }), [vn]), Qt = w.useRef("default"), In = H == null ? void 0 : H.current;
  In != null && Qt.current !== Zt.cursor && (In.style.cursor = Qt.current = Zt.cursor);
  const Yr = w.useCallback((X, be, st, at) => {
    if (we === void 0)
      return;
    const qe = we(X);
    if (qe.actions !== void 0) {
      const We = z1(be, qe.actions);
      for (const [At, Yt] of We.entries())
        if (Qi(Yt, st + be.x, at + Yt.y))
          return qe.actions[At];
    }
  }, [we]), $ = w.useCallback((X, be, st, at) => {
    const qe = ot[be];
    if (!V && !Z && !(ie ?? !1)) {
      const We = It(X, be, -1);
      mr(We !== void 0);
      const At = L1(void 0, qe, We.x, We.y, We.width, We.height, He, wh(qe.title) === "rtl");
      if (qe.hasMenu === !0 && At.menuBounds !== void 0 && Qi(At.menuBounds, st, at))
        return {
          area: "menu",
          bounds: At.menuBounds
        };
      if (qe.indicatorIcon !== void 0 && At.indicatorIconBounds !== void 0 && Qi(At.indicatorIconBounds, st, at))
        return {
          area: "indicator",
          bounds: At.indicatorIconBounds
        };
    }
  }, [ot, It, ie, V, Z, He]), ve = w.useRef(0), Fe = w.useRef(), Ge = w.useRef(!1), rt = w.useCallback((X) => {
    const be = mt.current, st = H == null ? void 0 : H.current;
    if (be === null || X.target !== be && X.target !== st)
      return;
    Ge.current = !0;
    const at = X.clientX, qe = X.clientY;
    if (X.target === st && st !== null) {
      const At = st.getBoundingClientRect();
      if (at > At.right || qe > At.bottom)
        return;
    }
    const We = Tt(be, at, qe, X);
    Fe.current = We.location, We.isTouch && (ve.current = Date.now()), Q.current !== We.isTouch && it(We.isTouch), !(We.kind === Ei && $(be, We.location[0], at, qe) !== void 0) && (We.kind === Br && Yr(We.group, We.bounds, We.localEventX, We.localEventY) !== void 0 || (M == null || M(We), !We.isTouch && K !== !0 && K !== We.kind && We.button < 3 && We.button !== 1 && X.preventDefault()));
  }, [
    H,
    K,
    Tt,
    Yr,
    $,
    M
  ]);
  tr("pointerdown", rt, Bt, !1);
  const Wt = w.useRef(0), qn = w.useCallback((X) => {
    var Xt, Ft;
    const be = Wt.current;
    Wt.current = Date.now();
    const st = mt.current;
    if (Ge.current = !1, _ === void 0 || st === null)
      return;
    const at = H == null ? void 0 : H.current, qe = X.target !== st && X.target !== at, We = X.clientX, At = X.clientY, Yt = X.pointerType === "mouse" ? X.button < 3 : !0;
    let yt = Tt(st, We, At, X);
    yt.isTouch && ve.current !== 0 && Date.now() - ve.current > 500 && (yt = {
      ...yt,
      isLongTouch: !0
    }), be !== 0 && Date.now() - be < (yt.isTouch ? 1e3 : 500) && (yt = {
      ...yt,
      isDoubleClick: !0
    }), Q.current !== yt.isTouch && it(yt.isTouch), !qe && X.cancelable && Yt && X.preventDefault();
    const [Ln] = yt.location, kt = $(st, Ln, We, At);
    if (yt.kind === Ei && kt !== void 0) {
      (yt.button !== 0 || ((Xt = Fe.current) == null ? void 0 : Xt[0]) !== Ln || ((Ft = Fe.current) == null ? void 0 : Ft[1]) !== -1) && _(yt, !0);
      return;
    } else if (yt.kind === Br) {
      const Ht = Yr(yt.group, yt.bounds, yt.localEventX, yt.localEventY);
      if (Ht !== void 0) {
        yt.button === 0 && Ht.onClick(yt);
        return;
      }
    }
    _(yt, qe);
  }, [_, H, Tt, $, Yr]);
  tr("pointerup", qn, Bt, !1);
  const Wn = w.useCallback((X) => {
    var Ln, kt;
    const be = mt.current;
    if (be === null)
      return;
    const st = H == null ? void 0 : H.current, at = X.target !== be && X.target !== st;
    let qe, We, At = !0;
    X instanceof MouseEvent ? (qe = X.clientX, We = X.clientY, At = X.button < 3) : (qe = X.changedTouches[0].clientX, We = X.changedTouches[0].clientY);
    const Yt = Tt(be, qe, We, X);
    Q.current !== Yt.isTouch && it(Yt.isTouch), !at && X.cancelable && At && X.preventDefault();
    const [yt] = Yt.location;
    if (Yt.kind === Ei) {
      const Xt = $(be, yt, qe, We);
      Xt !== void 0 && Yt.button === 0 && ((Ln = Fe.current) == null ? void 0 : Ln[0]) === yt && ((kt = Fe.current) == null ? void 0 : kt[1]) === -1 && (Xt.area === "menu" ? g == null || g(yt, Xt.bounds) : Xt.area === "indicator" && (y == null || y(yt, Xt.bounds)));
    }
  }, [H, Tt, $, g, y]);
  tr("click", Wn, Bt, !1);
  const fr = w.useCallback((X) => {
    const be = mt.current, st = H == null ? void 0 : H.current;
    if (be === null || X.target !== be && X.target !== st || P === void 0)
      return;
    const at = Tt(be, X.clientX, X.clientY, X);
    P(at, () => {
      X.cancelable && X.preventDefault();
    });
  }, [H, Tt, P]);
  tr("contextmenu", fr, (H == null ? void 0 : H.current) ?? null, !1);
  const mi = w.useCallback((X) => {
    vt.current = new Cs(X.map((be) => be.item)), Ce.current = X, dn.current(), vt.current = void 0;
  }, []), xt = w.useMemo(() => new aA(mi), [mi]), Li = w.useRef(xt);
  Li.current = xt, w.useLayoutEffect(() => {
    const X = Li.current;
    if (rn === void 0 || rn[1] < 0) {
      X.setHovered(rn);
      return;
    }
    const be = h(rn, !0), st = Ct(be), at = st === void 0 && be.kind === Be.Custom || (st == null ? void 0 : st.needsHover) !== void 0 && (typeof st.needsHover == "boolean" ? st.needsHover : st.needsHover(be));
    X.setHovered(at ? rn : void 0);
  }, [h, Ct, rn]);
  const $i = w.useRef(), or = w.useCallback((X) => {
    var Yt;
    const be = mt.current;
    if (be === null)
      return;
    const st = H == null ? void 0 : H.current, at = X.target !== be && X.target !== st, qe = Tt(be, X.clientX, X.clientY, X);
    if (qe.kind !== "out-of-bounds" && at && !Ge.current && !qe.isTouch)
      return;
    const We = (yt, Ln) => {
      lt((kt) => kt === yt || (kt == null ? void 0 : kt[0][0]) === (yt == null ? void 0 : yt[0][0]) && (kt == null ? void 0 : kt[0][1]) === (yt == null ? void 0 : yt[0][1]) && ((kt == null ? void 0 : kt[1][0]) === (yt == null ? void 0 : yt[1][0]) && (kt == null ? void 0 : kt[1][1]) === (yt == null ? void 0 : yt[1][1]) || !Ln) ? kt : yt);
    };
    if (!Y1(qe, $i.current))
      Mt(void 0), L == null || L(qe), We(qe.kind === rl ? void 0 : [qe.location, [qe.localEventX, qe.localEventY]], !0), $i.current = qe;
    else if (qe.kind === "cell" || qe.kind === Ei || qe.kind === Br) {
      let yt = !1, Ln = !0;
      if (qe.kind === "cell") {
        const Xt = h(qe.location);
        Ln = ((Yt = Ct(Xt)) == null ? void 0 : Yt.needsHoverPosition) ?? Xt.kind === Be.Custom, yt = Ln;
      } else
        yt = !0;
      const kt = [qe.location, [qe.localEventX, qe.localEventY]];
      We(kt, Ln), qt.current = kt, yt && Sn(new Cs([qe.location]));
    }
    const At = qe.location[0] >= (re ? 0 : 1);
    de(qe.kind === Ei && qe.isEdge && At && le === !0), Ur(qe.kind === "cell" && qe.isFillHandle), E == null || E(X), O(qe);
  }, [
    H,
    Tt,
    re,
    le,
    E,
    O,
    L,
    h,
    Ct,
    Sn
  ]);
  tr("pointermove", or, Bt, !0);
  const fo = w.useCallback((X) => {
    const be = mt.current;
    if (be === null)
      return;
    let st, at;
    T.current !== void 0 && (st = It(be, T.current.cell[0], T.current.cell[1]), at = T.current.cell), F == null || F({
      bounds: st,
      stopPropagation: () => X.stopPropagation(),
      preventDefault: () => X.preventDefault(),
      cancel: () => {
      },
      ctrlKey: X.ctrlKey,
      metaKey: X.metaKey,
      shiftKey: X.shiftKey,
      altKey: X.altKey,
      key: X.key,
      keyCode: X.keyCode,
      rawEvent: X,
      location: at
    });
  }, [F, T, It]), tn = w.useCallback((X) => {
    const be = mt.current;
    if (be === null)
      return;
    let st, at;
    T.current !== void 0 && (st = It(be, T.current.cell[0], T.current.cell[1]), at = T.current.cell), N == null || N({
      bounds: st,
      stopPropagation: () => X.stopPropagation(),
      preventDefault: () => X.preventDefault(),
      cancel: () => {
      },
      ctrlKey: X.ctrlKey,
      metaKey: X.metaKey,
      shiftKey: X.shiftKey,
      altKey: X.altKey,
      key: X.key,
      keyCode: X.keyCode,
      rawEvent: X,
      location: at
    });
  }, [N, T, It]), Fi = w.useCallback((X) => {
    if (mt.current = X, Y !== void 0 && (Y.current = X), Ze != null && Ze.eventTarget)
      zt.current = Ze.eventTarget;
    else if (X === null)
      zt.current = window;
    else {
      const be = X.getRootNode();
      be === document && (zt.current = window), zt.current = be;
    }
  }, [Y, Ze == null ? void 0 : Ze.eventTarget]), Us = w.useCallback((X) => {
    const be = mt.current;
    if (be === null || K === !1 || Z) {
      X.preventDefault();
      return;
    }
    let st, at;
    const qe = Tt(be, X.clientX, X.clientY);
    if (K !== !0 && qe.kind !== K) {
      X.preventDefault();
      return;
    }
    const We = (Xt, Ft) => {
      st = Xt, at = Ft;
    };
    let At, Yt, yt;
    const Ln = (Xt, Ft, Ht) => {
      At = Xt, Yt = Ft, yt = Ht;
    };
    let kt = !1;
    if (j == null || j({
      ...qe,
      setData: We,
      setDragImage: Ln,
      preventDefault: () => kt = !0,
      defaultPrevented: () => kt
    }), !kt && st !== void 0 && at !== void 0 && X.dataTransfer !== null)
      if (X.dataTransfer.setData(st, at), X.dataTransfer.effectAllowed = "copyLink", At !== void 0 && Yt !== void 0 && yt !== void 0)
        X.dataTransfer.setDragImage(At, Yt, yt);
      else {
        const [Xt, Ft] = qe.location;
        if (Ft !== void 0) {
          const Ht = document.createElement("canvas"), Lt = It(be, Xt, Ft);
          mr(Lt !== void 0);
          const Jt = Math.ceil(window.devicePixelRatio ?? 1);
          Ht.width = Lt.width * Jt, Ht.height = Lt.height * Jt;
          const En = Ht.getContext("2d");
          En !== null && (En.scale(Jt, Jt), En.textBaseline = "middle", Ft === -1 ? (En.font = He.headerFontFull, En.fillStyle = He.bgHeader, En.fillRect(0, 0, Ht.width, Ht.height), $1(En, 0, 0, Lt.width, Lt.height, ot[Xt], !1, He, !1, void 0, void 0, !1, 0, xe, Ne, !1)) : (En.font = He.baseFontFull, En.fillStyle = He.bgCell, En.fillRect(0, 0, Ht.width, Ht.height), O1(En, h([Xt, Ft]), 0, Ft, !1, !1, 0, 0, Lt.width, Lt.height, !1, He, He.bgCell, nn, xe, 1, void 0, !1, 0, void 0, void 0, void 0, Gn, Ct, () => {
          }))), Ht.style.left = "-100%", Ht.style.position = "absolute", Ht.style.width = `${Lt.width}px`, Ht.style.height = `${Lt.height}px`, document.body.append(Ht), X.dataTransfer.setDragImage(Ht, Lt.width / 2, Lt.height / 2), window.setTimeout(() => {
            Ht.remove();
          }, 0);
        }
      }
    else
      X.preventDefault();
  }, [
    K,
    Z,
    Tt,
    j,
    It,
    He,
    ot,
    xe,
    Ne,
    h,
    nn,
    Gn,
    Ct
  ]);
  tr("dragstart", Us, (H == null ? void 0 : H.current) ?? null, !1, !1);
  const ho = w.useRef(), Tl = w.useCallback((X) => {
    const be = mt.current;
    if ($e !== void 0 && X.preventDefault(), be === null || Ke === void 0)
      return;
    const st = Tt(be, X.clientX, X.clientY), [at, qe] = st.location, We = at - (re ? 0 : 1), [At, Yt] = ho.current ?? [];
    (At !== We || Yt !== qe) && (ho.current = [We, qe], Ke([We, qe], X.dataTransfer));
  }, [re, Tt, Ke, $e]);
  tr("dragover", Tl, (H == null ? void 0 : H.current) ?? null, !1, !1);
  const El = w.useCallback(() => {
    ho.current = void 0, ee == null || ee();
  }, [ee]);
  tr("dragend", El, (H == null ? void 0 : H.current) ?? null, !1, !1);
  const Xr = w.useCallback((X) => {
    const be = mt.current;
    if (be === null || $e === void 0)
      return;
    X.preventDefault();
    const st = Tt(be, X.clientX, X.clientY), [at, qe] = st.location, We = at - (re ? 0 : 1);
    $e([We, qe], X.dataTransfer);
  }, [re, Tt, $e]);
  tr("drop", Xr, (H == null ? void 0 : H.current) ?? null, !1, !1);
  const yi = w.useCallback(() => {
    Oe == null || Oe();
  }, [Oe]);
  tr("dragleave", yi, (H == null ? void 0 : H.current) ?? null, !1, !1);
  const hr = w.useRef(T);
  hr.current = T;
  const oe = w.useRef(null), wn = w.useCallback((X) => {
    var be;
    mt.current === null || !mt.current.contains(document.activeElement) || (X === null && hr.current.current !== void 0 ? (be = Y == null ? void 0 : Y.current) == null || be.focus({
      preventScroll: !0
    }) : X !== null && X.focus({
      preventScroll: !0
    }), oe.current = X);
  }, [Y]);
  w.useImperativeHandle(e, () => ({
    focus: () => {
      var be;
      const X = oe.current;
      X === null || !document.contains(X) ? (be = Y == null ? void 0 : Y.current) == null || be.focus({
        preventScroll: !0
      }) : X.focus({
        preventScroll: !0
      });
    },
    getBounds: (X, be) => {
      if (!(Y === void 0 || Y.current === null))
        return It(Y.current, X ?? 0, be ?? -1);
    },
    damage: Pr,
    getMouseArgsForPosition: (X, be, st) => {
      if (!(Y === void 0 || Y.current === null))
        return Tt(Y.current, X, be, st);
    }
  }), [Y, Pr, It, Tt]);
  const oi = w.useRef(), Ml = yT(() => {
    var Yt, yt, Ln;
    if (n < 50 || (Ze == null ? void 0 : Ze.disableAccessibilityTree) === !0)
      return null;
    let X = If(ot, pt, n, W, Ve);
    const be = re ? 0 : -1;
    !re && ((Yt = X[0]) == null ? void 0 : Yt.sourceIndex) === 0 && (X = X.slice(1));
    const [st, at] = ((yt = T.current) == null ? void 0 : yt.cell) ?? [], qe = (Ln = T.current) == null ? void 0 : Ln.range, We = X.map((kt) => kt.sourceIndex), At = Yi(a, Math.min(f, a + i));
    return st !== void 0 && at !== void 0 && !(We.includes(st) && At.includes(at)) && wn(null), w.createElement(
      "table",
      { key: "access-tree", role: "grid", "aria-rowcount": f + 1, "aria-multiselectable": "true", "aria-colcount": ot.length + be },
      w.createElement(
        "thead",
        { role: "rowgroup" },
        w.createElement("tr", { role: "row", "aria-rowindex": 1 }, X.map((kt) => w.createElement("th", { role: "columnheader", "aria-selected": T.columns.hasIndex(kt.sourceIndex), "aria-colindex": kt.sourceIndex + 1 + be, tabIndex: -1, onFocus: (Xt) => {
          if (Xt.target !== oe.current)
            return Ae == null ? void 0 : Ae([kt.sourceIndex, -1]);
        }, key: kt.sourceIndex }, kt.title)))
      ),
      w.createElement("tbody", { role: "rowgroup" }, At.map((kt) => w.createElement("tr", { role: "row", "aria-selected": T.rows.hasIndex(kt), key: kt, "aria-rowindex": kt + 2 }, X.map((Xt) => {
        const Ft = Xt.sourceIndex, Ht = qr(Ft, kt), Lt = st === Ft && at === kt, Jt = qe !== void 0 && Ft >= qe.x && Ft < qe.x + qe.width && kt >= qe.y && kt < qe.y + qe.height, En = `glide-cell-${Ft}-${kt}`, Dr = [Ft, kt], Nr = h(Dr, !0);
        return w.createElement("td", { key: Ht, role: "gridcell", "aria-colindex": Ft + 1 + be, "aria-selected": Jt, "aria-readonly": _o(Nr) || !Eo(Nr), id: En, "data-testid": En, onClick: () => {
          const xn = Y == null ? void 0 : Y.current;
          if (xn != null)
            return F == null ? void 0 : F({
              bounds: It(xn, Ft, kt),
              cancel: () => {
              },
              preventDefault: () => {
              },
              stopPropagation: () => {
              },
              ctrlKey: !1,
              key: "Enter",
              keyCode: 13,
              metaKey: !1,
              shiftKey: !1,
              altKey: !1,
              rawEvent: void 0,
              location: Dr
            });
        }, onFocusCapture: (xn) => {
          var An, an;
          if (!(xn.target === oe.current || ((An = oi.current) == null ? void 0 : An[0]) === Ft && ((an = oi.current) == null ? void 0 : an[1]) === kt))
            return oi.current = Dr, Ae == null ? void 0 : Ae(Dr);
        }, ref: Lt ? wn : void 0, tabIndex: -1 }, dA(Nr, Ct));
      }))))
    );
  }, [
    n,
    ot,
    pt,
    W,
    Ve,
    f,
    a,
    i,
    T,
    wn,
    h,
    Y,
    F,
    It,
    Ae
  ], 200), Hi = D === 0 || !z ? 0 : pt > D ? 1 : Er(-Ve / 100, 0, 1), Il = -a * 32 + Et, po = k ? Er(-Il / 100, 0, 1) : 0, Hh = w.useMemo(() => {
    if (!Hi && !po)
      return null;
    const X = {
      position: "absolute",
      top: 0,
      left: Rt,
      width: n - Rt,
      height: r,
      opacity: Hi,
      pointerEvents: "none",
      transition: ht ? void 0 : "opacity 0.2s",
      boxShadow: "inset 13px 0 10px -13px rgba(0, 0, 0, 0.2)"
    }, be = {
      position: "absolute",
      top: Ie,
      left: 0,
      width: n,
      height: r,
      opacity: po,
      pointerEvents: "none",
      transition: Se ? void 0 : "opacity 0.2s",
      boxShadow: "inset 0 13px 10px -13px rgba(0, 0, 0, 0.2)"
    };
    return w.createElement(
      w.Fragment,
      null,
      Hi > 0 && w.createElement("div", { id: "shadow-x", style: X }),
      po > 0 && w.createElement("div", { id: "shadow-y", style: be })
    );
  }, [Hi, po, Rt, n, ht, Ie, r, Se]), fe = w.useMemo(() => ({
    position: "absolute",
    top: 0,
    left: 0
  }), []);
  return w.createElement(
    w.Fragment,
    null,
    w.createElement("canvas", { "data-testid": "data-grid-canvas", tabIndex: 0, onKeyDown: fo, onKeyUp: tn, onFocus: C, onBlur: I, ref: Fi, style: Zt }, Ml),
    w.createElement("canvas", { ref: _e, style: fe }),
    Hh
  );
}, hA = w.memo(w.forwardRef(fA));
function fs(t, e, n, r) {
  return Er(Math.round(e - (t.growOffset ?? 0)), Math.ceil(n), Math.floor(r));
}
const pA = (t) => {
  const [e, n] = w.useState(), [r, i] = w.useState(), [o, s] = w.useState(), [a, l] = w.useState(), [c, u] = w.useState(!1), [d, f] = w.useState(), [h, p] = w.useState(), [g, y] = w.useState(), [m, b] = w.useState(!1), [C, I] = w.useState(), { onHeaderMenuClick: v, onHeaderIndicatorClick: T, getCellContent: D, onColumnMoved: P, onColumnResize: S, onColumnResizeStart: z, onColumnResizeEnd: k, gridRef: x, maxColumnWidth: M, minColumnWidth: _, onRowMoved: E, lockColumns: O, onColumnProposeMove: L, onMouseDown: W, onMouseUp: re, onItemHovered: F, onDragStart: N, canvasRef: te } = t, Y = (S ?? k ?? z) !== void 0, { columns: j, selection: ee } = t, H = ee.columns, Z = w.useCallback((ne) => {
    const [Ne, Ae] = ne.location;
    o !== void 0 && a !== Ne && Ne >= O ? (u(!0), l(Ne)) : h !== void 0 && Ae !== void 0 ? (b(!0), y(Math.max(0, Ae))) : r === void 0 && !c && !m && (F == null || F(ne));
  }, [o, h, a, F, O, r, c, m]), J = P !== void 0, V = w.useCallback((ne) => {
    var Ne;
    if (ne.button === 0) {
      const [Ae, Ke] = ne.location;
      if (ne.kind === "out-of-bounds" && ne.isEdge && Y) {
        const $e = (Ne = x == null ? void 0 : x.current) == null ? void 0 : Ne.getBounds(j.length - 1, -1);
        $e !== void 0 && (n($e.x), i(j.length - 1));
      } else if (ne.kind === "header" && Ae >= O) {
        const $e = te == null ? void 0 : te.current;
        if (ne.isEdge && Y && $e) {
          n(ne.bounds.x), i(Ae);
          const et = $e.getBoundingClientRect().width / $e.offsetWidth, ht = ne.bounds.width / et;
          z == null || z(j[Ae], ht, Ae, ht + (j[Ae].growOffset ?? 0));
        } else ne.kind === "header" && J && (f(ne.bounds.x), s(Ae));
      } else ne.kind === "cell" && O > 0 && Ae === 0 && Ke !== void 0 && E !== void 0 && (I(ne.bounds.y), p(Ke));
    }
    W == null || W(ne);
  }, [W, Y, O, E, x, j, J, z, te]), K = w.useCallback((ne, Ne) => {
    c || m || v == null || v(ne, Ne);
  }, [c, m, v]), le = w.useCallback((ne, Ne) => {
    c || m || T == null || T(ne, Ne);
  }, [c, m, T]), ue = w.useRef(-1), ke = w.useCallback(() => {
    ue.current = -1, p(void 0), y(void 0), I(void 0), b(!1), s(void 0), l(void 0), f(void 0), u(!1), i(void 0), n(void 0);
  }, []), we = w.useCallback((ne, Ne) => {
    if (ne.button === 0) {
      if (r !== void 0) {
        if ((H == null ? void 0 : H.hasIndex(r)) === !0)
          for (const Ke of H) {
            if (Ke === r)
              continue;
            const $e = j[Ke], Oe = fs($e, ue.current, _, M);
            S == null || S($e, Oe, Ke, Oe + ($e.growOffset ?? 0));
          }
        const Ae = fs(j[r], ue.current, _, M);
        if (k == null || k(j[r], Ae, r, Ae + (j[r].growOffset ?? 0)), H.hasIndex(r))
          for (const Ke of H) {
            if (Ke === r)
              continue;
            const $e = j[Ke], Oe = fs($e, ue.current, _, M);
            k == null || k($e, Oe, Ke, Oe + ($e.growOffset ?? 0));
          }
      }
      ke(), o !== void 0 && a !== void 0 && (L == null ? void 0 : L(o, a)) !== !1 && (P == null || P(o, a)), h !== void 0 && g !== void 0 && (E == null || E(h, g));
    }
    re == null || re(ne, Ne);
  }, [
    re,
    r,
    o,
    a,
    h,
    g,
    H,
    k,
    j,
    _,
    M,
    S,
    P,
    E,
    ke,
    L
  ]), He = w.useMemo(() => {
    if (!(o === void 0 || a === void 0) && o !== a && (L == null ? void 0 : L(o, a)) !== !1)
      return {
        src: o,
        dest: a
      };
  }, [o, a, L]), nt = w.useCallback((ne) => {
    const Ne = te == null ? void 0 : te.current;
    if (o !== void 0 && d !== void 0)
      Math.abs(ne.clientX - d) > 20 && u(!0);
    else if (h !== void 0 && C !== void 0)
      Math.abs(ne.clientY - C) > 20 && b(!0);
    else if (r !== void 0 && e !== void 0 && Ne) {
      const Ke = Ne.getBoundingClientRect().width / Ne.offsetWidth, $e = (ne.clientX - e) / Ke, Oe = j[r], et = fs(Oe, $e, _, M);
      if (S == null || S(Oe, et, r, et + (Oe.growOffset ?? 0)), ue.current = $e, (H == null ? void 0 : H.first()) === r)
        for (const ht of H) {
          if (ht === r)
            continue;
          const Se = j[ht], Ze = fs(Se, ue.current, _, M);
          S == null || S(Se, Ze, ht, Ze + (Se.growOffset ?? 0));
        }
    }
  }, [
    o,
    d,
    h,
    C,
    r,
    e,
    j,
    _,
    M,
    S,
    H,
    te
  ]), bt = w.useCallback((ne, Ne) => {
    if (h === void 0 || g === void 0)
      return D(ne, Ne);
    let [Ae, Ke] = ne;
    return Ke === g ? Ke = h : (Ke > g && (Ke -= 1), Ke >= h && (Ke += 1)), D([Ae, Ke], Ne);
  }, [h, g, D]), gt = w.useCallback((ne) => {
    N == null || N(ne), ne.defaultPrevented() || ke();
  }, [ke, N]);
  return w.createElement(hA, { accessibilityHeight: t.accessibilityHeight, canvasRef: t.canvasRef, cellXOffset: t.cellXOffset, cellYOffset: t.cellYOffset, columns: t.columns, disabledRows: t.disabledRows, drawFocusRing: t.drawFocusRing, drawHeader: t.drawHeader, drawCell: t.drawCell, enableGroups: t.enableGroups, eventTargetRef: t.eventTargetRef, experimental: t.experimental, fillHandle: t.fillHandle, firstColAccessible: t.firstColAccessible, fixedShadowX: t.fixedShadowX, fixedShadowY: t.fixedShadowY, freezeColumns: t.freezeColumns, getCellRenderer: t.getCellRenderer, getGroupDetails: t.getGroupDetails, getRowThemeOverride: t.getRowThemeOverride, groupHeaderHeight: t.groupHeaderHeight, headerHeight: t.headerHeight, headerIcons: t.headerIcons, height: t.height, highlightRegions: t.highlightRegions, imageWindowLoader: t.imageWindowLoader, resizeColumn: r, isDraggable: t.isDraggable, isFilling: t.isFilling, isFocused: t.isFocused, onCanvasBlur: t.onCanvasBlur, onCanvasFocused: t.onCanvasFocused, onCellFocused: t.onCellFocused, onContextMenu: t.onContextMenu, onDragEnd: t.onDragEnd, onDragLeave: t.onDragLeave, onDragOverCell: t.onDragOverCell, onDrop: t.onDrop, onKeyDown: t.onKeyDown, onKeyUp: t.onKeyUp, onMouseMove: t.onMouseMove, prelightCells: t.prelightCells, rowHeight: t.rowHeight, rows: t.rows, selection: t.selection, smoothScrollX: t.smoothScrollX, smoothScrollY: t.smoothScrollY, theme: t.theme, freezeTrailingRows: t.freezeTrailingRows, hasAppendRow: t.hasAppendRow, translateX: t.translateX, translateY: t.translateY, resizeIndicator: t.resizeIndicator, verticalBorder: t.verticalBorder, width: t.width, getCellContent: bt, isResizing: r !== void 0, onHeaderMenuClick: K, onHeaderIndicatorClick: le, isDragging: c, onItemHovered: Z, onDragStart: gt, onMouseDown: V, allowResize: Y, onMouseUp: we, dragAndDropState: He, onMouseMoveRaw: nt, ref: x });
};
function gA(t) {
  const e = G(null), [n, r] = Xe({
    width: t == null ? void 0 : t[0],
    height: t == null ? void 0 : t[1]
  });
  return Nn(() => {
    const i = (s) => {
      for (const a of s) {
        const { width: l, height: c } = a && a.contentRect || {};
        r((u) => u.width === l && u.height === c ? u : { width: l, height: c });
      }
    }, o = new window.ResizeObserver(i);
    return e.current && o.observe(e.current, void 0), () => {
      o.disconnect();
    };
  }, [e.current]), { ref: e, ...n };
}
const mA = (t, e, n) => {
  const r = G(null), i = G(null), o = G(null), s = G(0), a = G(e);
  a.current = e;
  const l = n.current;
  Ye(() => {
    const c = () => {
      var f, h;
      if (i.current === !1 && l !== null) {
        const p = [l.scrollLeft, l.scrollTop];
        if (((f = o.current) == null ? void 0 : f[0]) === p[0] && ((h = o.current) == null ? void 0 : h[1]) === p[1])
          if (s.current > 10) {
            o.current = null, i.current = null;
            return;
          } else
            s.current++;
        else
          s.current = 0, a.current(p[0], p[1]), o.current = p;
        r.current = window.setTimeout(c, 8.333333333333334);
      }
    }, u = () => {
      i.current = !0, o.current = null, r.current !== null && (window.clearTimeout(r.current), r.current = null);
    }, d = (f) => {
      f.touches.length === 0 && (i.current = !1, s.current = 0, r.current = window.setTimeout(c, 8.333333333333334));
    };
    if (t && l !== null) {
      const f = l;
      return f.addEventListener("touchstart", u), f.addEventListener("touchend", d), () => {
        f.removeEventListener("touchstart", u), f.removeEventListener("touchend", d), r.current !== null && window.clearTimeout(r.current);
      };
    }
  }, [t, l]);
}, yA = () => (t) => t.isSafari ? "scroll" : "auto", bA = /* @__PURE__ */ wr("div")({
  name: "ScrollRegionStyle",
  class: "gdg-s1dgczr6",
  propsAsIs: !1,
  vars: {
    "s1dgczr6-0": [yA()]
  }
}), vA = 33554400, wA = 5e6;
function xA(t) {
  const [e, n] = w.useState(!1), r = typeof window > "u" ? null : window, i = w.useRef(0);
  return tr("touchstart", w.useCallback(() => {
    window.clearTimeout(i.current), n(!0);
  }, []), r, !0, !1), tr("touchend", w.useCallback((o) => {
    o.touches.length === 0 && (i.current = window.setTimeout(() => n(!1), t));
  }, [t]), r, !0, !1), e;
}
const kA = (t) => {
  var ee, H;
  const {
    children: e,
    clientHeight: n,
    scrollHeight: r,
    scrollWidth: i,
    update: o,
    draggable: s,
    className: a,
    preventDiagonalScrolling: l = !1,
    paddingBottom: c = 0,
    paddingRight: u = 0,
    rightElement: d,
    rightElementProps: f,
    kineticScrollPerfHack: h = !1,
    scrollRef: p,
    initialSize: g
  } = t, y = [], m = (f == null ? void 0 : f.sticky) ?? !1, b = (f == null ? void 0 : f.fill) ?? !1, C = w.useRef(0), I = w.useRef(0), v = w.useRef(null), T = typeof window > "u" ? 1 : window.devicePixelRatio, D = w.useRef(T);
  w.useEffect(() => {
    if (D.current !== T) {
      C.current = 0, I.current = 0, D.current = T;
      const Z = v.current;
      Z !== null && E.current(Z.scrollLeft, Z.scrollTop);
    }
  }, [T]);
  const P = w.useRef({
    scrollLeft: 0,
    scrollTop: 0,
    lockDirection: void 0
  }), S = w.useRef(null), z = xA(200), [k, x] = w.useState(!0), M = w.useRef(0);
  w.useLayoutEffect(() => {
    if (!k || z || P.current.lockDirection === void 0) return;
    const Z = v.current;
    if (Z === null) return;
    const [J, V] = P.current.lockDirection;
    J !== void 0 ? Z.scrollLeft = J : V !== void 0 && (Z.scrollTop = V), P.current.lockDirection = void 0;
  }, [z, k]);
  const _ = w.useCallback((Z, J) => {
    var Ae;
    const V = v.current;
    if (V === null) return;
    J = J ?? V.scrollTop, Z = Z ?? V.scrollLeft;
    const K = P.current.scrollTop, le = P.current.scrollLeft, ue = Z - le, ke = J - K;
    z && ue !== 0 && ke !== 0 && (Math.abs(ue) > 3 || Math.abs(ke) > 3) && l && P.current.lockDirection === void 0 && (P.current.lockDirection = Math.abs(ue) < Math.abs(ke) ? [le, void 0] : [void 0, K]);
    const we = P.current.lockDirection;
    Z = (we == null ? void 0 : we[0]) ?? Z, J = (we == null ? void 0 : we[1]) ?? J, P.current.scrollLeft = Z, P.current.scrollTop = J;
    const He = V.clientWidth, nt = V.clientHeight, bt = J, gt = I.current - bt, ne = V.scrollHeight - nt;
    I.current = bt;
    let Ne;
    if (ne > 0 && r > V.scrollHeight + 5)
      if (Math.abs(gt) > 2e3 || bt === 0 || bt === ne) {
        const Ke = Math.max(0, Math.min(1, bt / ne)), $e = r - nt;
        Ne = Ke * $e, C.current = Ne;
      } else
        C.current -= gt, Ne = C.current;
    else
      Ne = bt, C.current = Ne;
    Ne = Math.max(0, Math.min(Ne, r - nt)), C.current = Ne, we !== void 0 && (window.clearTimeout(M.current), x(!1), M.current = window.setTimeout(() => x(!0), 200)), o({
      x: Z,
      y: Ne,
      width: He - u,
      height: nt - c,
      paddingRight: ((Ae = S.current) == null ? void 0 : Ae.clientWidth) ?? 0
    });
  }, [c, u, r, o, l, z]);
  mA(h && tl.value, _, v);
  const E = w.useRef(_);
  E.current = _;
  const O = w.useRef(), L = w.useRef(!1);
  w.useLayoutEffect(() => {
    L.current ? _() : L.current = !0;
  }, [_, c, u]);
  const W = w.useCallback((Z) => {
    v.current = Z, p !== void 0 && (p.current = Z);
  }, [p]);
  let re = 0, F = 0;
  const N = Math.min(r, vA);
  for (y.push(w.createElement("div", {
    key: re++,
    style: {
      width: i,
      height: 0
    }
  })); F < N; ) {
    const Z = Math.min(wA, N - F);
    y.push(w.createElement("div", {
      key: re++,
      style: {
        width: 0,
        height: Z
      }
    })), F += Z;
  }
  const {
    ref: te,
    width: Y,
    height: j
  } = gA(g);
  return typeof window < "u" && (((ee = O.current) == null ? void 0 : ee.height) !== j || ((H = O.current) == null ? void 0 : H.width) !== Y) && (window.setTimeout(() => E.current(), 0), O.current = {
    width: Y,
    height: j
  }), (Y ?? 0) === 0 || (j ?? 0) === 0 ? w.createElement("div", {
    ref: te
  }) : w.createElement("div", {
    ref: te
  }, w.createElement(bA, {
    isSafari: tl.value
  }, w.createElement("div", {
    className: "dvn-underlay"
  }, e), w.createElement("div", {
    ref: W,
    style: O.current,
    draggable: s,
    onDragStart: (Z) => {
      s || (Z.stopPropagation(), Z.preventDefault());
    },
    className: "dvn-scroller " + (a ?? ""),
    onScroll: () => _()
  }, w.createElement("div", {
    className: "dvn-scroll-inner" + (d === void 0 ? " dvn-hidden" : "")
  }, w.createElement("div", {
    className: "dvn-stack"
  }, y), d !== void 0 && w.createElement(w.Fragment, null, !b && w.createElement("div", {
    className: "dvn-spacer"
  }), w.createElement("div", {
    ref: S,
    style: {
      height: j,
      maxHeight: n - Math.ceil(T % 1),
      position: "sticky",
      top: 0,
      paddingLeft: 1,
      marginBottom: -40,
      marginRight: u,
      flexGrow: b ? 1 : void 0,
      right: m ? u ?? 0 : void 0,
      pointerEvents: "auto"
    }
  }, d))))));
}, SA = (t) => {
  const { columns: e, rows: n, rowHeight: r, headerHeight: i, groupHeaderHeight: o, enableGroups: s, freezeColumns: a, experimental: l, nonGrowWidth: c, clientSize: u, className: d, onVisibleRegionChanged: f, scrollRef: h, preventDiagonalScrolling: p, rightElement: g, rightElementProps: y, overscrollX: m, overscrollY: b, initialSize: C, smoothScrollX: I = !1, smoothScrollY: v = !1, isDraggable: T } = t, { paddingRight: D, paddingBottom: P } = l ?? {}, [S, z] = u, k = w.useRef(), x = w.useRef(), M = w.useRef(), _ = w.useRef(), E = c + Math.max(0, m ?? 0);
  let O = s ? i + o : i;
  if (typeof r == "number")
    O += n * r;
  else
    for (let F = 0; F < n; F++)
      O += r(F);
  b !== void 0 && (O += b);
  const L = w.useRef(), W = w.useCallback(() => {
    var le, ue;
    if (L.current === void 0)
      return;
    const F = { ...L.current };
    let N = 0, te = F.x < 0 ? -F.x : 0, Y = 0, j = 0;
    F.x = F.x < 0 ? 0 : F.x;
    let ee = 0;
    for (let ke = 0; ke < a; ke++)
      ee += e[ke].width;
    for (const ke of e) {
      const we = N - ee;
      if (F.x >= we + ke.width)
        N += ke.width, j++, Y++;
      else if (F.x > we)
        N += ke.width, I ? te += we - F.x : j++, Y++;
      else if (F.x + F.width > we)
        N += ke.width, Y++;
      else
        break;
    }
    let H = 0, Z = 0, J = 0;
    if (typeof r == "number")
      v ? (Z = Math.floor(F.y / r), H = Z * r - F.y) : Z = Math.ceil(F.y / r), J = Math.ceil(F.height / r) + Z, H < 0 && J++;
    else {
      let ke = 0;
      for (let we = 0; we < n; we++) {
        const He = r(we), nt = ke + (v ? 0 : He / 2);
        if (F.y >= ke + He)
          ke += He, Z++, J++;
        else if (F.y > nt)
          ke += He, v ? H += nt - F.y : Z++, J++;
        else if (F.y + F.height > He / 2 + ke)
          ke += He, J++;
        else
          break;
      }
    }
    Z = Math.max(0, Math.min(Z, n - 1)), J = Math.max(Z, Math.min(J, n));
    const V = {
      x: j,
      y: Z,
      width: Y - j,
      height: J - Z
    }, K = k.current;
    (K === void 0 || K.y !== V.y || K.x !== V.x || K.height !== V.height || K.width !== V.width || x.current !== te || M.current !== H || F.width !== ((le = _.current) == null ? void 0 : le[0]) || F.height !== ((ue = _.current) == null ? void 0 : ue[1])) && (f == null || f({
      x: j,
      y: Z,
      width: Y - j,
      height: J - Z
    }, F.width, F.height, F.paddingRight ?? 0, te, H), k.current = V, x.current = te, M.current = H, _.current = [F.width, F.height]);
  }, [e, r, n, f, a, I, v]), re = w.useCallback((F) => {
    L.current = F, W();
  }, [W]);
  return w.useEffect(() => {
    W();
  }, [W]), w.createElement(
    kA,
    { scrollRef: h, className: d, kineticScrollPerfHack: l == null ? void 0 : l.kineticScrollPerfHack, preventDiagonalScrolling: p, draggable: T === !0 || typeof T == "string", scrollWidth: E + (D ?? 0), scrollHeight: O + (P ?? 0), clientHeight: z, rightElement: g, paddingBottom: P, paddingRight: D, rightElementProps: y, update: re, initialSize: C },
    w.createElement(pA, { eventTargetRef: h, width: S, height: z, accessibilityHeight: t.accessibilityHeight, canvasRef: t.canvasRef, cellXOffset: t.cellXOffset, cellYOffset: t.cellYOffset, columns: t.columns, disabledRows: t.disabledRows, enableGroups: t.enableGroups, fillHandle: t.fillHandle, firstColAccessible: t.firstColAccessible, fixedShadowX: t.fixedShadowX, fixedShadowY: t.fixedShadowY, freezeColumns: t.freezeColumns, getCellContent: t.getCellContent, getCellRenderer: t.getCellRenderer, getGroupDetails: t.getGroupDetails, getRowThemeOverride: t.getRowThemeOverride, groupHeaderHeight: t.groupHeaderHeight, headerHeight: t.headerHeight, highlightRegions: t.highlightRegions, imageWindowLoader: t.imageWindowLoader, isFilling: t.isFilling, isFocused: t.isFocused, lockColumns: t.lockColumns, maxColumnWidth: t.maxColumnWidth, minColumnWidth: t.minColumnWidth, onHeaderMenuClick: t.onHeaderMenuClick, onHeaderIndicatorClick: t.onHeaderIndicatorClick, onMouseMove: t.onMouseMove, prelightCells: t.prelightCells, rowHeight: t.rowHeight, rows: t.rows, selection: t.selection, theme: t.theme, freezeTrailingRows: t.freezeTrailingRows, hasAppendRow: t.hasAppendRow, translateX: t.translateX, translateY: t.translateY, onColumnProposeMove: t.onColumnProposeMove, verticalBorder: t.verticalBorder, drawFocusRing: t.drawFocusRing, drawHeader: t.drawHeader, drawCell: t.drawCell, experimental: t.experimental, gridRef: t.gridRef, headerIcons: t.headerIcons, isDraggable: t.isDraggable, onCanvasBlur: t.onCanvasBlur, onCanvasFocused: t.onCanvasFocused, onCellFocused: t.onCellFocused, onColumnMoved: t.onColumnMoved, onColumnResize: t.onColumnResize, onColumnResizeEnd: t.onColumnResizeEnd, onColumnResizeStart: t.onColumnResizeStart, onContextMenu: t.onContextMenu, onDragEnd: t.onDragEnd, onDragLeave: t.onDragLeave, onDragOverCell: t.onDragOverCell, onDragStart: t.onDragStart, onDrop: t.onDrop, onItemHovered: t.onItemHovered, onKeyDown: t.onKeyDown, onKeyUp: t.onKeyUp, onMouseDown: t.onMouseDown, onMouseUp: t.onMouseUp, onRowMoved: t.onRowMoved, smoothScrollX: t.smoothScrollX, smoothScrollY: t.smoothScrollY, resizeIndicator: t.resizeIndicator })
  );
}, CA = /* @__PURE__ */ wr("div")({
  name: "SearchWrapper",
  class: "gdg-seveqep",
  propsAsIs: !1
}), RA = w.createElement(
  "svg",
  { className: "button-icon", viewBox: "0 0 512 512" },
  w.createElement("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "48", d: "M112 244l144-144 144 144M256 120v292" })
), TA = w.createElement(
  "svg",
  { className: "button-icon", viewBox: "0 0 512 512" },
  w.createElement("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "48", d: "M112 268l144 144 144-144M256 392V100" })
), EA = w.createElement(
  "svg",
  { className: "button-icon", viewBox: "0 0 512 512" },
  w.createElement("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32", d: "M368 368L144 144M368 144L144 368" })
), MA = 10, IA = (t) => {
  const { canvasRef: e, cellYOffset: n, rows: r, columns: i, searchInputRef: o, searchValue: s, searchResults: a, onSearchValueChange: l, getCellsForSelection: c, onSearchResultsChanged: u, showSearch: d = !1, onSearchClose: f } = t, [h] = w.useState(() => "search-box-" + Math.round(Math.random() * 1e3)), [p, g] = w.useState(""), y = s ?? p, m = w.useCallback((N) => {
    g(N), l == null || l(N);
  }, [l]), [b, C] = w.useState(), I = w.useRef(b);
  I.current = b, w.useEffect(() => {
    a !== void 0 && (a.length > 0 ? C((N) => ({
      rowsSearched: r,
      results: a.length,
      selectedIndex: (N == null ? void 0 : N.selectedIndex) ?? -1
    })) : C(void 0));
  }, [r, a]);
  const v = w.useRef();
  v.current === void 0 && (v.current = new AbortController());
  const T = w.useRef(), [D, P] = w.useState([]), S = a ?? D, z = w.useCallback(() => {
    T.current !== void 0 && (window.cancelAnimationFrame(T.current), T.current = void 0), v.current !== void 0 && v.current.abort(), v.current = new AbortController();
  }, []), k = w.useRef(n);
  k.current = n;
  const x = w.useCallback((N) => {
    const te = new RegExp(N.replace(/([$()*+.?[\\\]^{|}-])/g, "\\$1"), "i");
    let Y = k.current, j = Math.min(10, r), ee = 0;
    C(void 0), P([]);
    const H = [], Z = async () => {
      var bt;
      if (c === void 0)
        return;
      const J = performance.now(), V = r - ee;
      let K = c({
        x: 0,
        y: Y,
        width: i.length,
        height: Math.min(j, V, r - Y)
      }, v.current.signal);
      typeof K == "function" && (K = await K());
      let le = !1;
      for (const [gt, ne] of K.entries())
        for (const [Ne, Ae] of ne.entries()) {
          let Ke;
          switch (Ae.kind) {
            case Be.Text:
            case Be.Number:
              Ke = Ae.displayData;
              break;
            case Be.Uri:
            case Be.Markdown:
              Ke = Ae.data;
              break;
            case Be.Boolean:
              Ke = typeof Ae.data == "boolean" ? Ae.data.toString() : void 0;
              break;
            case Be.Image:
            case Be.Bubble:
              Ke = Ae.data.join("🐳");
              break;
            case Be.Custom:
              Ke = Ae.copyData;
              break;
          }
          Ke !== void 0 && te.test(Ke) && (H.push([Ne, gt + Y]), le = !0);
        }
      const ue = performance.now();
      le && P([...H]), ee += K.length, mr(ee <= r);
      const ke = ((bt = I.current) == null ? void 0 : bt.selectedIndex) ?? -1;
      C({
        results: H.length,
        rowsSearched: ee,
        selectedIndex: ke
      }), u == null || u(H, ke), Y + j >= r ? Y = 0 : Y += j;
      const we = ue - J, He = Math.max(we, 1), nt = MA / He;
      j = Math.ceil(j * nt), ee < r && H.length < 1e3 && (T.current = window.requestAnimationFrame(Z));
    };
    z(), T.current = window.requestAnimationFrame(Z);
  }, [z, i.length, c, u, r]), M = w.useCallback(() => {
    var N;
    f == null || f(), C(void 0), P([]), u == null || u([], -1), z(), (N = e == null ? void 0 : e.current) == null || N.focus();
  }, [z, e, f, u]), _ = w.useCallback((N) => {
    m(N.target.value), a === void 0 && (N.target.value === "" ? (C(void 0), P([]), z()) : x(N.target.value));
  }, [x, z, m, a]);
  w.useEffect(() => {
    o.current !== null && (m(""), C(void 0), D.length > 0 && (P([]), u == null || u([], -1)), d ? o.current.focus({ preventScroll: !0 }) : z());
  }, [d, o]);
  const E = w.useCallback((N) => {
    var Y;
    if ((Y = N == null ? void 0 : N.stopPropagation) == null || Y.call(N), b === void 0 || b.results === 0)
      return;
    const te = (b.selectedIndex + 1) % b.results;
    C({
      ...b,
      selectedIndex: te
    }), u == null || u(S, te);
  }, [b, u, S]), O = w.useCallback((N) => {
    var Y;
    if ((Y = N == null ? void 0 : N.stopPropagation) == null || Y.call(N), b === void 0 || b.results === 0)
      return;
    let te = (b.selectedIndex - 1) % b.results;
    te < 0 && (te += b.results), C({
      ...b,
      selectedIndex: te
    }), u == null || u(S, te);
  }, [u, S, b]), L = w.useCallback((N) => {
    (N.ctrlKey || N.metaKey) && N.nativeEvent.code === "KeyF" || N.key === "Escape" ? (M(), N.stopPropagation(), N.preventDefault()) : N.key === "Enter" && (N.shiftKey ? O() : E());
  }, [M, E, O]);
  w.useEffect(() => () => {
    z();
  }, [z]);
  const [W, re] = w.useState(!1);
  w.useEffect(() => {
    if (d)
      re(!0);
    else {
      const N = setTimeout(() => re(!1), 150);
      return () => clearTimeout(N);
    }
  }, [d]);
  const F = w.useMemo(() => {
    if (!d && !W)
      return null;
    let N;
    b !== void 0 && (N = b.results >= 1e3 ? "over 1000" : `${b.results} result${b.results !== 1 ? "s" : ""}`, b.selectedIndex >= 0 && (N = `${b.selectedIndex + 1} of ${N}`));
    const te = (ee) => {
      ee.stopPropagation();
    }, j = {
      width: `${r > 0 ? Math.floor(((b == null ? void 0 : b.rowsSearched) ?? 0) / r * 100) : 0}%`
    };
    return w.createElement(
      CA,
      { className: "gdg-search-bar" + (d ? "" : " out"), onMouseDown: te, onMouseMove: te, onMouseUp: te, onClick: te },
      w.createElement(
        "div",
        { className: "gdg-search-bar-inner" },
        w.createElement("input", { id: h, "aria-hidden": !d, "data-testid": "search-input", ref: o, onChange: _, value: y, tabIndex: d ? void 0 : -1, onKeyDownCapture: L }),
        w.createElement("button", { type: "button", "aria-label": "Previous Result", "aria-hidden": !d, tabIndex: d ? void 0 : -1, onClick: O, disabled: ((b == null ? void 0 : b.results) ?? 0) === 0 }, RA),
        w.createElement("button", { type: "button", "aria-label": "Next Result", "aria-hidden": !d, tabIndex: d ? void 0 : -1, onClick: E, disabled: ((b == null ? void 0 : b.results) ?? 0) === 0 }, TA),
        f !== void 0 && w.createElement("button", { type: "button", "aria-label": "Close Search", "aria-hidden": !d, "data-testid": "search-close-button", tabIndex: d ? void 0 : -1, onClick: M }, EA)
      ),
      b !== void 0 ? w.createElement(
        w.Fragment,
        null,
        w.createElement(
          "div",
          { className: "gdg-search-status" },
          w.createElement("div", { "data-testid": "search-result-area" }, N)
        ),
        w.createElement("div", { className: "gdg-search-progress", style: j })
      ) : w.createElement(
        "div",
        { className: "gdg-search-status" },
        w.createElement("label", { htmlFor: h }, "Type to search")
      )
    );
  }, [
    d,
    W,
    b,
    r,
    h,
    o,
    _,
    y,
    L,
    O,
    E,
    f,
    M
  ]);
  return w.createElement(
    w.Fragment,
    null,
    w.createElement(SA, { prelightCells: S, accessibilityHeight: t.accessibilityHeight, canvasRef: t.canvasRef, cellXOffset: t.cellXOffset, cellYOffset: t.cellYOffset, className: t.className, clientSize: t.clientSize, columns: t.columns, disabledRows: t.disabledRows, enableGroups: t.enableGroups, fillHandle: t.fillHandle, firstColAccessible: t.firstColAccessible, nonGrowWidth: t.nonGrowWidth, fixedShadowX: t.fixedShadowX, fixedShadowY: t.fixedShadowY, freezeColumns: t.freezeColumns, getCellContent: t.getCellContent, getCellRenderer: t.getCellRenderer, getGroupDetails: t.getGroupDetails, getRowThemeOverride: t.getRowThemeOverride, groupHeaderHeight: t.groupHeaderHeight, headerHeight: t.headerHeight, highlightRegions: t.highlightRegions, imageWindowLoader: t.imageWindowLoader, initialSize: t.initialSize, isFilling: t.isFilling, isFocused: t.isFocused, lockColumns: t.lockColumns, maxColumnWidth: t.maxColumnWidth, minColumnWidth: t.minColumnWidth, onHeaderMenuClick: t.onHeaderMenuClick, onHeaderIndicatorClick: t.onHeaderIndicatorClick, onMouseMove: t.onMouseMove, onVisibleRegionChanged: t.onVisibleRegionChanged, overscrollX: t.overscrollX, overscrollY: t.overscrollY, preventDiagonalScrolling: t.preventDiagonalScrolling, rightElement: t.rightElement, rightElementProps: t.rightElementProps, rowHeight: t.rowHeight, rows: t.rows, scrollRef: t.scrollRef, selection: t.selection, theme: t.theme, freezeTrailingRows: t.freezeTrailingRows, hasAppendRow: t.hasAppendRow, translateX: t.translateX, translateY: t.translateY, verticalBorder: t.verticalBorder, onColumnProposeMove: t.onColumnProposeMove, drawFocusRing: t.drawFocusRing, drawCell: t.drawCell, drawHeader: t.drawHeader, experimental: t.experimental, gridRef: t.gridRef, headerIcons: t.headerIcons, isDraggable: t.isDraggable, onCanvasBlur: t.onCanvasBlur, onCanvasFocused: t.onCanvasFocused, onCellFocused: t.onCellFocused, onColumnMoved: t.onColumnMoved, onColumnResize: t.onColumnResize, onColumnResizeEnd: t.onColumnResizeEnd, onColumnResizeStart: t.onColumnResizeStart, onContextMenu: t.onContextMenu, onDragEnd: t.onDragEnd, onDragLeave: t.onDragLeave, onDragOverCell: t.onDragOverCell, onDragStart: t.onDragStart, onDrop: t.onDrop, onItemHovered: t.onItemHovered, onKeyDown: t.onKeyDown, onKeyUp: t.onKeyUp, onMouseDown: t.onMouseDown, onMouseUp: t.onMouseUp, onRowMoved: t.onRowMoved, smoothScrollX: t.smoothScrollX, smoothScrollY: t.smoothScrollY, resizeIndicator: t.resizeIndicator }),
    F
  );
};
class AA extends w.PureComponent {
  constructor() {
    super(...arguments);
    Qe(this, "wrapperRef", w.createRef());
    Qe(this, "clickOutside", (n) => {
      if (!(this.props.isOutsideClick && !this.props.isOutsideClick(n)) && this.wrapperRef.current !== null && !this.wrapperRef.current.contains(n.target)) {
        let r = n.target;
        for (; r !== null; ) {
          if (r.classList.contains("click-outside-ignore"))
            return;
          r = r.parentElement;
        }
        this.props.onClickOutside();
      }
    });
  }
  componentDidMount() {
    const n = this.props.customEventTarget ?? document;
    n.addEventListener("pointerdown", this.clickOutside, !0), n.addEventListener("contextmenu", this.clickOutside, !0);
  }
  componentWillUnmount() {
    const n = this.props.customEventTarget ?? document;
    n.removeEventListener("pointerdown", this.clickOutside, !0), n.removeEventListener("contextmenu", this.clickOutside, !0);
  }
  render() {
    const { onClickOutside: n, isOutsideClick: r, customEventTarget: i, ...o } = this.props;
    return w.createElement("div", { ...o, ref: this.wrapperRef }, this.props.children);
  }
}
const _A = () => (t) => Math.max(16, t.targetHeight - 10), PA = /* @__PURE__ */ wr("input")({
  name: "RenameInput",
  class: "gdg-r17m35ur",
  propsAsIs: !1,
  vars: {
    "r17m35ur-0": [_A(), "px"]
  }
}), DA = (t) => {
  const {
    bounds: e,
    group: n,
    onClose: r,
    canvasBounds: i,
    onFinish: o
  } = t, [s, a] = Pt.useState(n);
  return Pt.createElement(AA, {
    style: {
      position: "absolute",
      left: e.x - i.left + 1,
      top: e.y - i.top,
      width: e.width - 2,
      height: e.height
    },
    className: "gdg-c1tqibwd",
    onClickOutside: r
  }, Pt.createElement(PA, {
    targetHeight: e.height,
    "data-testid": "group-rename-input",
    value: s,
    onBlur: r,
    onFocus: (l) => l.target.setSelectionRange(0, s.length),
    onChange: (l) => a(l.target.value),
    onKeyDown: (l) => {
      l.key === "Enter" ? o(s) : l.key === "Escape" && r();
    },
    autoFocus: !0
  }));
};
function NA(t, e) {
  return t === void 0 ? !1 : t.length > 1 && t.startsWith("_") ? Number.parseInt(t.slice(1)) === e.keyCode : t.length === 1 && t >= "a" && t <= "z" ? t.toUpperCase().codePointAt(0) === e.keyCode : t === e.key;
}
function Kt(t, e, n) {
  const r = X1(t, e);
  return r && (n.didMatch = !0), r;
}
function X1(t, e) {
  if (t.length === 0)
    return !1;
  if (t.includes("|")) {
    const l = t.split("|");
    for (const c of l)
      if (X1(c, e))
        return !0;
    return !1;
  }
  let n = !1, r = !1, i = !1, o = !1;
  const s = t.split("+"), a = s.pop();
  if (!NA(a, e))
    return !1;
  if (s[0] === "any")
    return !0;
  for (const l of s)
    switch (l) {
      case "ctrl":
        n = !0;
        break;
      case "shift":
        r = !0;
        break;
      case "alt":
        i = !0;
        break;
      case "meta":
        o = !0;
        break;
      case "primary":
        nl.value ? o = !0 : n = !0;
        break;
    }
  return e.altKey === i && e.ctrlKey === n && e.shiftKey === r && e.metaKey === o;
}
function OA(t, e, n, r, i, o, s) {
  const a = Pt.useCallback((u, d, f, h) => {
    var C;
    (o === "cell" || o === "multi-cell") && u !== void 0 && (u = {
      ...u,
      range: {
        x: u.cell[0],
        y: u.cell[1],
        width: 1,
        height: 1
      }
    }), !s && u !== void 0 && u.range.width > 1 && (u = {
      ...u,
      range: {
        ...u.range,
        width: 1,
        x: u.cell[0]
      }
    });
    const p = n === "mixed" && (f || h === "drag") || n === "additive", g = (r === "mixed" || r === "additive") && p, y = (i === "mixed" || i === "additive") && p;
    let m = {
      current: u === void 0 ? void 0 : {
        ...u,
        rangeStack: h === "drag" ? ((C = t.current) == null ? void 0 : C.rangeStack) ?? [] : []
      },
      columns: g ? t.columns : on.empty(),
      rows: y ? t.rows : on.empty()
    };
    f && (o === "multi-rect" || o === "multi-cell") && m.current !== void 0 && t.current !== void 0 && (m = {
      ...m,
      current: {
        ...m.current,
        rangeStack: [...t.current.rangeStack, t.current.range]
      }
    }), e(m, d);
  }, [
    r,
    t,
    n,
    o,
    s,
    i,
    e
  ]), l = Pt.useCallback((u, d, f) => {
    u = u ?? t.rows, d !== void 0 && (u = u.add(d));
    let h;
    if (i === "exclusive" && u.length > 0)
      h = {
        current: void 0,
        columns: on.empty(),
        rows: u
      };
    else {
      const p = f && n === "mixed" || n === "additive", g = f && r === "mixed" || r === "additive";
      h = {
        current: p ? t.current : void 0,
        columns: g ? t.columns : on.empty(),
        rows: u
      };
    }
    e(h, !1);
  }, [r, t, n, i, e]), c = Pt.useCallback((u, d, f) => {
    u = u ?? t.columns, d !== void 0 && (u = u.add(d));
    let h;
    if (r === "exclusive" && u.length > 0)
      h = {
        current: void 0,
        rows: on.empty(),
        columns: u
      };
    else {
      const p = f && n === "mixed" || n === "additive", g = f && i === "mixed" || i === "additive";
      h = {
        current: p ? t.current : void 0,
        rows: g ? t.rows : on.empty(),
        columns: u
      };
    }
    e(h, !1);
  }, [r, t, n, i, e]);
  return [a, l, c];
}
function zA(t, e, n, r, i) {
  const o = w.useCallback((c) => {
    if (t === !0) {
      const u = [];
      for (let d = c.y; d < c.y + c.height; d++) {
        const f = [];
        for (let h = c.x; h < c.x + c.width; h++)
          h < 0 || d >= i ? f.push({
            kind: Be.Loading,
            allowOverlay: !1
          }) : f.push(e([h, d]));
        u.push(f);
      }
      return u;
    }
    return (t == null ? void 0 : t(c, r.signal)) ?? [];
  }, [r.signal, e, t, i]), s = t !== void 0 ? o : void 0, a = w.useCallback((c) => {
    if (s === void 0)
      return [];
    const u = {
      ...c,
      x: c.x - n
    };
    if (u.x < 0) {
      u.x = 0, u.width--;
      const d = s(u, r.signal);
      return typeof d == "function" ? async () => (
        // eslint-disable-next-line unicorn/no-await-expression-member
        (await d()).map((f) => [
          { kind: Be.Loading, allowOverlay: !1 },
          ...f
        ])
      ) : d.map((f) => [{ kind: Be.Loading, allowOverlay: !1 }, ...f]);
    }
    return s(u, r.signal);
  }, [r.signal, s, n]);
  return [t !== void 0 ? a : void 0, s];
}
function LA(t) {
  if (t.copyData !== void 0)
    return {
      formatted: t.copyData,
      rawValue: t.copyData,
      format: "string",
      // Do not escape the copy value if it was explicitly specified via copyData:
      doNotEscape: !0
    };
  switch (t.kind) {
    case Be.Boolean:
      return {
        formatted: t.data === !0 ? "TRUE" : t.data === !1 ? "FALSE" : t.data === ph ? "INDETERMINATE" : "",
        rawValue: t.data,
        format: "boolean"
      };
    case Be.Custom:
      return {
        formatted: t.copyData,
        rawValue: t.copyData,
        format: "string"
      };
    case Be.Image:
    case Be.Bubble:
      return {
        formatted: t.data,
        rawValue: t.data,
        format: "string-array"
      };
    case Be.Drilldown:
      return {
        formatted: t.data.map((e) => e.text),
        rawValue: t.data.map((e) => e.text),
        format: "string-array"
      };
    case Be.Text:
      return {
        formatted: t.displayData ?? t.data,
        rawValue: t.data,
        format: "string"
      };
    case Be.Uri:
      return {
        formatted: t.displayData ?? t.data,
        rawValue: t.data,
        format: "url"
      };
    case Be.Markdown:
    case Be.RowID:
      return {
        formatted: t.data,
        rawValue: t.data,
        format: "string"
      };
    case Be.Number:
      return {
        formatted: t.displayData,
        rawValue: t.data,
        format: "number"
      };
    case Be.Loading:
      return {
        formatted: "#LOADING",
        rawValue: "",
        format: "string"
      };
    case Be.Protected:
      return {
        formatted: "************",
        rawValue: "",
        format: "string"
      };
    default:
      Ps();
  }
}
function $A(t, e) {
  return t.map((r, i) => {
    const o = e[i];
    return r.map((s) => s.span !== void 0 && s.span[0] !== o ? {
      formatted: "",
      rawValue: "",
      format: "string"
    } : LA(s));
  });
}
function Ey(t, e) {
  return (e ? /[\t\n",]/ : /[\t\n"]/).test(t) && (t = `"${t.replace(/"/g, '""')}"`), t;
}
function FA(t) {
  var n;
  const e = [];
  for (const r of t) {
    const i = [];
    for (const o of r)
      o.format === "url" ? i.push(((n = o.rawValue) == null ? void 0 : n.toString()) ?? "") : o.format === "string-array" ? i.push(o.formatted.map((s) => Ey(s, !0)).join(",")) : i.push(o.doNotEscape === !0 ? o.formatted : Ey(o.formatted, !1));
    e.push(i.join("	"));
  }
  return e.join(`
`);
}
function rf(t) {
  return t.replace(/\t/g, "    ").replace(/ {2,}/g, (e) => "<span> </span>".repeat(e.length));
}
function My(t) {
  return '"' + t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + '"';
}
function HA(t) {
  return t.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
function BA(t) {
  var n;
  const e = [];
  e.push('<style type="text/css"><!--br {mso-data-placement:same-cell;}--></style>', "<table><tbody>");
  for (const r of t) {
    e.push("<tr>");
    for (const i of r) {
      const o = `gdg-format="${i.format}"`;
      i.format === "url" ? e.push(`<td ${o}><a href="${i.rawValue}">${rf(i.formatted)}</a></td>`) : i.format === "string-array" ? e.push(`<td ${o}><ol>${i.formatted.map((s, a) => `<li gdg-raw-value=${My(i.rawValue[a])}>` + rf(s) + "</li>").join("")}</ol></td>`) : e.push(`<td gdg-raw-value=${My(((n = i.rawValue) == null ? void 0 : n.toString()) ?? "")} ${o}>${rf(i.formatted)}</td>`);
    }
    e.push("</tr>");
  }
  return e.push("</tbody></table>"), e.join("");
}
function qA(t, e) {
  const n = $A(t, e), r = FA(n), i = BA(n);
  return {
    textPlain: r,
    textHtml: i
  };
}
function Iy(t) {
  var s;
  const e = document.createElement("html");
  e.innerHTML = t.replace(/&nbsp;/g, " ");
  const n = e.querySelector("table");
  if (n === null)
    return;
  const r = [n], i = [];
  let o;
  for (; r.length > 0; ) {
    const a = r.pop();
    if (a === void 0)
      break;
    if (a instanceof HTMLTableElement || a.nodeName === "TBODY")
      r.push(...[...a.children].reverse());
    else if (a instanceof HTMLTableRowElement)
      o !== void 0 && i.push(o), o = [], r.push(...[...a.children].reverse());
    else if (a instanceof HTMLTableCellElement) {
      const l = a.cloneNode(!0), u = l.children.length === 1 && l.children[0].nodeName === "P" ? l.children[0] : null, d = (u == null ? void 0 : u.children.length) === 1 && u.children[0].nodeName === "FONT", f = l.querySelectorAll("br");
      for (const g of f)
        g.replaceWith(`
`);
      const h = l.getAttribute("gdg-raw-value"), p = l.getAttribute("gdg-format") ?? "string";
      if (l.querySelector("a") !== null)
        o == null || o.push({
          // raw value is the href
          rawValue: ((s = l.querySelector("a")) == null ? void 0 : s.getAttribute("href")) ?? "",
          formatted: l.textContent ?? "",
          format: p
        });
      else if (l.querySelector("ol") !== null) {
        const g = l.querySelectorAll("li");
        o == null || o.push({
          rawValue: [...g].map((y) => y.getAttribute("gdg-raw-value") ?? ""),
          formatted: [...g].map((y) => y.textContent ?? ""),
          format: "string-array"
        });
      } else if (h !== null)
        o == null || o.push({
          rawValue: HA(h),
          formatted: l.textContent ?? "",
          format: p
        });
      else {
        let g = l.textContent ?? "";
        d && (g = g.replace(/\n(?!\n)/g, "")), o == null || o.push({
          rawValue: g ?? "",
          formatted: g ?? "",
          format: p
        });
      }
    }
  }
  return o !== void 0 && i.push(o), i;
}
function WA(t, e, n, r, i) {
  var a;
  const o = t;
  if (r === "allowPartial" || t.current === void 0 || e === void 0)
    return t;
  let s = !1;
  do {
    if ((t == null ? void 0 : t.current) === void 0)
      break;
    const l = (a = t.current) == null ? void 0 : a.range, c = [];
    if (l.width > 2) {
      const f = e({
        x: l.x,
        y: l.y,
        width: 1,
        height: l.height
      }, i.signal);
      if (typeof f == "function")
        return o;
      c.push(...f);
      const h = e({
        x: l.x + l.width - 1,
        y: l.y,
        width: 1,
        height: l.height
      }, i.signal);
      if (typeof h == "function")
        return o;
      c.push(...h);
    } else {
      const f = e({
        x: l.x,
        y: l.y,
        width: l.width,
        height: l.height
      }, i.signal);
      if (typeof f == "function")
        return o;
      c.push(...f);
    }
    let u = l.x - n, d = l.x + l.width - 1 - n;
    for (const f of c)
      for (const h of f)
        h.span !== void 0 && (u = Math.min(h.span[0], u), d = Math.max(h.span[1], d));
    u === l.x - n && d === l.x + l.width - 1 - n ? s = !0 : t = {
      current: {
        cell: t.current.cell ?? [0, 0],
        range: {
          x: u + n,
          y: l.y,
          width: d - u + 1,
          height: l.height
        },
        rangeStack: t.current.rangeStack
      },
      columns: t.columns,
      rows: t.rows
    };
  } while (!s);
  return t;
}
function Ay(t) {
  return t.startsWith('"') && t.endsWith('"') && (t = t.slice(1, -1).replace(/""/g, '"')), t;
}
function jA(t) {
  let e;
  (function(a) {
    a[a.None = 0] = "None", a[a.inString = 1] = "inString", a[a.inStringPostQuote = 2] = "inStringPostQuote";
  })(e || (e = {}));
  const n = [];
  let r = [], i = 0, o = e.None;
  t = t.replace(/\r\n/g, `
`);
  let s = 0;
  for (const a of t) {
    switch (o) {
      case e.None:
        a === "	" || a === `
` ? (r.push(t.slice(i, s)), i = s + 1, a === `
` && (n.push(r), r = [])) : a === '"' && (o = e.inString);
        break;
      case e.inString:
        a === '"' && (o = e.inStringPostQuote);
        break;
      case e.inStringPostQuote:
        a === '"' ? o = e.inString : ((a === "	" || a === `
`) && (r.push(Ay(t.slice(i, s))), i = s + 1, a === `
` && (n.push(r), r = [])), o = e.None);
        break;
    }
    s++;
  }
  return i < t.length && r.push(Ay(t.slice(i, t.length))), n.push(r), n.map((a) => a.map((l) => ({ rawValue: l, formatted: l, format: "string" })));
}
function _y(t, e, n) {
  var a;
  const r = qA(t, e), i = (l) => {
    var c;
    (c = window.navigator.clipboard) == null || c.writeText(l);
  }, o = (l, c) => {
    var u;
    return ((u = window.navigator.clipboard) == null ? void 0 : u.write) === void 0 ? !1 : (window.navigator.clipboard.write([
      new ClipboardItem({
        // eslint-disable-next-line sonarjs/no-duplicate-string
        "text/plain": new Blob([l], { type: "text/plain" }),
        "text/html": new Blob([c], {
          type: "text/html"
        })
      })
    ]), !0);
  }, s = (l, c) => {
    var u, d;
    try {
      if (n === void 0 || n.clipboardData === null)
        throw new Error("No clipboard data");
      (u = n == null ? void 0 : n.clipboardData) == null || u.setData("text/plain", l), (d = n == null ? void 0 : n.clipboardData) == null || d.setData("text/html", c);
    } catch {
      o(l, c) || i(l);
    }
  };
  ((a = window.navigator.clipboard) == null ? void 0 : a.write) !== void 0 || (n == null ? void 0 : n.clipboardData) !== void 0 ? s(r.textPlain, r.textHtml) : i(r.textPlain), n == null || n.preventDefault();
}
function V1(t) {
  return t !== !0;
}
function Py(t) {
  return typeof t == "string" ? t : `${t}px`;
}
const KA = () => (t) => t.innerWidth, UA = () => (t) => t.innerHeight, GA = /* @__PURE__ */ wr("div")({
  name: "Wrapper",
  class: "gdg-wmyidgi",
  propsAsIs: !1,
  vars: {
    "wmyidgi-0": [KA()],
    "wmyidgi-1": [UA()]
  }
}), YA = (t) => {
  const {
    inWidth: e,
    inHeight: n,
    children: r,
    ...i
  } = t;
  return w.createElement(GA, {
    innerHeight: Py(n),
    innerWidth: Py(e),
    ...i
  }, r);
}, XA = 2, VA = 1300;
function JA(t, e, n) {
  const r = Pt.useRef(0), [i, o] = t ?? [0, 0];
  Pt.useEffect(() => {
    if (i === 0 && o === 0) {
      r.current = 0;
      return;
    }
    let s = !1, a = 0;
    const l = (c) => {
      var u;
      if (!s) {
        if (a === 0)
          a = c;
        else {
          const d = c - a;
          r.current = Math.min(1, r.current + d / VA);
          const f = r.current ** 1.618 * d * XA;
          (u = e.current) == null || u.scrollBy(i * f, o * f), a = c, n == null || n();
        }
        window.requestAnimationFrame(l);
      }
    };
    return window.requestAnimationFrame(l), () => {
      s = !0;
    };
  }, [e, i, o, n]);
}
function ZA({ rowHeight: t, headerHeight: e, groupHeaderHeight: n, theme: r, overscrollX: i, overscrollY: o, scaleToRem: s, remSize: a }) {
  const [l, c, u, d, f, h] = Pt.useMemo(() => {
    if (!s || a === 16)
      return [t, e, n, r, i, o];
    const p = a / 16, g = t, y = Dh();
    return [
      typeof g == "number" ? g * p : (m) => Math.ceil(g(m) * p),
      Math.ceil(e * p),
      Math.ceil(n * p),
      {
        ...r,
        headerIconSize: ((r == null ? void 0 : r.headerIconSize) ?? y.headerIconSize) * p,
        cellHorizontalPadding: ((r == null ? void 0 : r.cellHorizontalPadding) ?? y.cellHorizontalPadding) * p,
        cellVerticalPadding: ((r == null ? void 0 : r.cellVerticalPadding) ?? y.cellVerticalPadding) * p
      },
      Math.ceil((i ?? 0) * p),
      Math.ceil((o ?? 0) * p)
    ];
  }, [n, e, i, o, a, t, s, r]);
  return { rowHeight: l, headerHeight: c, groupHeaderHeight: u, theme: d, overscrollX: f, overscrollY: h };
}
const Ri = {
  downFill: !1,
  rightFill: !1,
  clear: !0,
  closeOverlay: !0,
  acceptOverlayDown: !0,
  acceptOverlayUp: !0,
  acceptOverlayLeft: !0,
  acceptOverlayRight: !0,
  copy: !0,
  paste: !0,
  cut: !0,
  search: !1,
  delete: !0,
  activateCell: !0,
  scrollToSelectedCell: !0,
  goToFirstCell: !0,
  goToFirstColumn: !0,
  goToFirstRow: !0,
  goToLastCell: !0,
  goToLastColumn: !0,
  goToLastRow: !0,
  goToNextPage: !0,
  goToPreviousPage: !0,
  selectToFirstCell: !0,
  selectToFirstColumn: !0,
  selectToFirstRow: !0,
  selectToLastCell: !0,
  selectToLastColumn: !0,
  selectToLastRow: !0,
  selectAll: !0,
  selectRow: !0,
  selectColumn: !0,
  goUpCell: !0,
  goRightCell: !0,
  goDownCell: !0,
  goLeftCell: !0,
  goUpCellRetainSelection: !0,
  goRightCellRetainSelection: !0,
  goDownCellRetainSelection: !0,
  goLeftCellRetainSelection: !0,
  selectGrowUp: !0,
  selectGrowRight: !0,
  selectGrowDown: !0,
  selectGrowLeft: !0
};
function Ut(t, e) {
  return t === !0 ? e : t === !1 ? "" : t;
}
function Dy(t) {
  const e = nl.value;
  return {
    activateCell: Ut(t.activateCell, " |Enter|shift+Enter"),
    clear: Ut(t.clear, "any+Escape"),
    closeOverlay: Ut(t.closeOverlay, "any+Escape"),
    acceptOverlayDown: Ut(t.acceptOverlayDown, "Enter"),
    acceptOverlayUp: Ut(t.acceptOverlayUp, "shift+Enter"),
    acceptOverlayLeft: Ut(t.acceptOverlayLeft, "shift+Tab"),
    acceptOverlayRight: Ut(t.acceptOverlayRight, "Tab"),
    copy: t.copy,
    cut: t.cut,
    delete: Ut(t.delete, e ? "Backspace|Delete" : "Delete"),
    downFill: Ut(t.downFill, "primary+_68"),
    scrollToSelectedCell: Ut(t.scrollToSelectedCell, "primary+Enter"),
    goDownCell: Ut(t.goDownCell, "ArrowDown"),
    goDownCellRetainSelection: Ut(t.goDownCellRetainSelection, "alt+ArrowDown"),
    goLeftCell: Ut(t.goLeftCell, "ArrowLeft|shift+Tab"),
    goLeftCellRetainSelection: Ut(t.goLeftCellRetainSelection, "alt+ArrowLeft"),
    goRightCell: Ut(t.goRightCell, "ArrowRight|Tab"),
    goRightCellRetainSelection: Ut(t.goRightCellRetainSelection, "alt+ArrowRight"),
    goUpCell: Ut(t.goUpCell, "ArrowUp"),
    goUpCellRetainSelection: Ut(t.goUpCellRetainSelection, "alt+ArrowUp"),
    goToFirstCell: Ut(t.goToFirstCell, "primary+Home"),
    goToFirstColumn: Ut(t.goToFirstColumn, "Home|primary+ArrowLeft"),
    goToFirstRow: Ut(t.goToFirstRow, "primary+ArrowUp"),
    goToLastCell: Ut(t.goToLastCell, "primary+End"),
    goToLastColumn: Ut(t.goToLastColumn, "End|primary+ArrowRight"),
    goToLastRow: Ut(t.goToLastRow, "primary+ArrowDown"),
    goToNextPage: Ut(t.goToNextPage, "PageDown"),
    goToPreviousPage: Ut(t.goToPreviousPage, "PageUp"),
    paste: t.paste,
    rightFill: Ut(t.rightFill, "primary+_82"),
    search: Ut(t.search, "primary+f"),
    selectAll: Ut(t.selectAll, "primary+a"),
    selectColumn: Ut(t.selectColumn, "ctrl+ "),
    selectGrowDown: Ut(t.selectGrowDown, "shift+ArrowDown"),
    selectGrowLeft: Ut(t.selectGrowLeft, "shift+ArrowLeft"),
    selectGrowRight: Ut(t.selectGrowRight, "shift+ArrowRight"),
    selectGrowUp: Ut(t.selectGrowUp, "shift+ArrowUp"),
    selectRow: Ut(t.selectRow, "shift+ "),
    selectToFirstCell: Ut(t.selectToFirstCell, "primary+shift+Home"),
    selectToFirstColumn: Ut(t.selectToFirstColumn, "primary+shift+ArrowLeft"),
    selectToFirstRow: Ut(t.selectToFirstRow, "primary+shift+ArrowUp"),
    selectToLastCell: Ut(t.selectToLastCell, "primary+shift+End"),
    selectToLastColumn: Ut(t.selectToLastColumn, "primary+shift+ArrowRight"),
    selectToLastRow: Ut(t.selectToLastRow, "primary+shift+ArrowDown")
  };
}
function QA(t) {
  const e = kT(t);
  return Pt.useMemo(() => {
    if (e === void 0)
      return Dy(Ri);
    const n = {
      ...e,
      goToNextPage: (e == null ? void 0 : e.goToNextPage) ?? (e == null ? void 0 : e.pageDown) ?? Ri.goToNextPage,
      goToPreviousPage: (e == null ? void 0 : e.goToPreviousPage) ?? (e == null ? void 0 : e.pageUp) ?? Ri.goToPreviousPage,
      goToFirstCell: (e == null ? void 0 : e.goToFirstCell) ?? (e == null ? void 0 : e.first) ?? Ri.goToFirstCell,
      goToLastCell: (e == null ? void 0 : e.goToLastCell) ?? (e == null ? void 0 : e.last) ?? Ri.goToLastCell,
      selectToFirstCell: (e == null ? void 0 : e.selectToFirstCell) ?? (e == null ? void 0 : e.first) ?? Ri.selectToFirstCell,
      selectToLastCell: (e == null ? void 0 : e.selectToLastCell) ?? (e == null ? void 0 : e.last) ?? Ri.selectToLastCell
    };
    return Dy({
      ...Ri,
      ...n
    });
  }, [e]);
}
function e_(t) {
  function e(r, i, o) {
    if (typeof r == "number")
      return {
        headerIndex: r,
        isCollapsed: !1,
        depth: i,
        path: o
      };
    const s = {
      headerIndex: r.headerIndex,
      isCollapsed: r.isCollapsed,
      depth: i,
      path: o
    };
    return r.subGroups !== void 0 && (s.subGroups = r.subGroups.map((a, l) => e(a, i + 1, [...o, l])).sort((a, l) => a.headerIndex - l.headerIndex)), s;
  }
  return t.map((r, i) => e(r, 0, [i])).sort((r, i) => r.headerIndex - i.headerIndex);
}
function Fh(t, e) {
  const n = [];
  function r(a, l, c = !1) {
    let u = l !== null ? l - a.headerIndex : e - a.headerIndex;
    if (a.subGroups !== void 0 && (u = a.subGroups[0].headerIndex - a.headerIndex), u--, n.push({
      rowIndex: -1,
      // we will fill this in later
      headerIndex: a.headerIndex,
      contentIndex: -1,
      // we will fill this in later
      skip: c,
      isCollapsed: a.isCollapsed,
      depth: a.depth,
      path: a.path,
      rows: u
    }), a.subGroups)
      for (let d = 0; d < a.subGroups.length; d++) {
        const f = d < a.subGroups.length - 1 ? a.subGroups[d + 1].headerIndex : l;
        r(a.subGroups[d], f, c || a.isCollapsed);
      }
  }
  const i = e_(t.groups);
  for (let a = 0; a < i.length; a++) {
    const l = a < i.length - 1 ? i[a + 1].headerIndex : null;
    r(i[a], l);
  }
  let o = 0, s = 0;
  for (const a of n)
    a.contentIndex = s, s += a.rows, a.rowIndex = o, o += a.isCollapsed ? 1 : a.rows + 1;
  return n.filter((a) => a.skip === !1).map((a) => {
    const { skip: l, ...c } = a;
    return c;
  });
}
function Df(t, e) {
  if (e === void 0 || Fh.length === 0)
    return {
      path: [t],
      originalIndex: t,
      isGroupHeader: !1,
      groupIndex: t,
      contentIndex: t,
      groupRows: -1
    };
  let n = t;
  for (const r of e) {
    if (n === 0)
      return {
        path: [...r.path, -1],
        originalIndex: r.headerIndex,
        isGroupHeader: !0,
        groupIndex: -1,
        contentIndex: -1,
        groupRows: r.rows
      };
    if (r.isCollapsed)
      n--;
    else {
      if (n <= r.rows)
        return {
          path: [...r.path, n - 1],
          originalIndex: r.headerIndex + n,
          isGroupHeader: !1,
          groupIndex: n - 1,
          contentIndex: r.contentIndex + n - 1,
          groupRows: r.rows
        };
      n = n - r.rows - 1;
    }
  }
  return {
    path: [t],
    originalIndex: t,
    isGroupHeader: !1,
    groupIndex: t,
    contentIndex: t,
    groupRows: -1
  };
}
function t_(t, e, n, r) {
  const i = Pt.useMemo(() => t === void 0 ? void 0 : Fh(t, e), [t, e]), o = Pt.useMemo(() => i == null ? void 0 : i.reduce((u, d) => (u[d.rowIndex] = d, u), {}), [i]), s = Pt.useMemo(() => i === void 0 ? e : i.reduce((u, d) => u + (d.isCollapsed ? 1 : d.rows + 1), 0), [i, e]), a = Pt.useMemo(() => t === void 0 || typeof n == "number" && t.height === n ? n : (u) => o != null && o[u] ? t.height : typeof n == "number" ? n : n(u), [o, t, n]), l = Pt.useCallback((u) => {
    if (i === void 0)
      return u;
    let d = u;
    for (const f of i) {
      if (d === 0)
        return;
      if (d--, !f.isCollapsed) {
        if (d < f.rows)
          return f.contentIndex + d;
        d -= f.rows;
      }
    }
    return u;
  }, [i]), c = Ti(r ?? (t == null ? void 0 : t.themeOverride), Pt.useCallback((u) => {
    if (t === void 0)
      return r == null ? void 0 : r(u, u, u);
    if (r === void 0 && (t == null ? void 0 : t.themeOverride) === void 0)
      return;
    const { isGroupHeader: d, contentIndex: f, groupIndex: h } = Df(u, i);
    return d ? t.themeOverride : r == null ? void 0 : r(u, h, f);
  }, [i, r, t]));
  return t === void 0 ? {
    rowHeight: a,
    rows: e,
    rowNumberMapper: l,
    getRowThemeOverride: c
  } : {
    rowHeight: a,
    rows: s,
    rowNumberMapper: l,
    getRowThemeOverride: c
  };
}
function n_(t, e) {
  const n = Pt.useMemo(() => t === void 0 ? void 0 : Fh(t, e), [t, e]);
  return {
    getRowGroupingForPath: Z1,
    updateRowGroupingByPath: J1,
    mapper: Pt.useCallback((r) => {
      if (typeof r == "number")
        return Df(r, n);
      const i = Df(r[1], n);
      return {
        ...i,
        originalIndex: [r[0], i.originalIndex]
      };
    }, [n])
  };
}
function J1(t, e, n) {
  const [r, ...i] = e;
  return i[0] === -1 ? t.map((o, s) => s === r ? { ...o, ...n } : o) : t.map((o, s) => s === r ? { ...o, subGroups: J1(o.subGroups ?? [], i, n) } : o);
}
function Z1(t, e) {
  const [n, ...r] = e;
  return r[0] === -1 ? t[n] : Z1(t[n].subGroups ?? [], r);
}
function r_(t, e) {
  const [n] = w.useState(() => ({
    value: t,
    callback: e,
    facade: {
      get current() {
        return n.value;
      },
      set current(r) {
        const i = n.value;
        i !== r && (n.value = r, n.callback(r, i));
      }
    }
  }));
  return n.callback = e, n.facade;
}
function i_(t, e, n, r, i) {
  const [o, s] = w.useMemo(() => [
    e !== void 0 && typeof n == "number" ? Math.floor(e / n) : 0,
    e !== void 0 && typeof n == "number" ? -(e % n) : 0
  ], [e, n]), a = w.useMemo(() => ({
    x: r.current.x,
    y: o,
    width: r.current.width ?? 1,
    height: r.current.height ?? 1,
    // tx: 'TODO',
    ty: s
  }), [r, s, o]), [l, c, u] = xT(a), d = w.useRef(i);
  d.current = i;
  const f = r_(null, (g) => {
    g !== null && e !== void 0 ? g.scrollTop = e : g !== null && t !== void 0 && (g.scrollLeft = t);
  }), h = (l.height ?? 1) > 1;
  w.useLayoutEffect(() => {
    if (e !== void 0 && f.current !== null && h) {
      if (f.current.scrollTop === e)
        return;
      f.current.scrollTop = e, f.current.scrollTop !== e && u(), d.current();
    }
  }, [e, h, u, f]);
  const p = (l.width ?? 1) > 1;
  return w.useLayoutEffect(() => {
    if (t !== void 0 && f.current !== null && p) {
      if (f.current.scrollLeft === t)
        return;
      f.current.scrollLeft = t, f.current.scrollLeft !== t && u(), d.current();
    }
  }, [t, p, u, f]), {
    visibleRegion: l,
    setVisibleRegion: c,
    scrollRef: f
  };
}
const o_ = w.lazy(async () => await import("./data-grid-overlay-editor-Bpz-llSw.js"));
let s_ = 0;
function a_(t) {
  return QE(s0(s0(t).filter((e) => e.span !== void 0).map((e) => {
    var n, r;
    return Yi((((n = e.span) == null ? void 0 : n[0]) ?? 0) + 1, (((r = e.span) == null ? void 0 : r[1]) ?? 0) + 1);
  })));
}
function Ea(t, e) {
  return t === void 0 || e === 0 || t.columns.length === 0 && t.current === void 0 ? t : {
    current: t.current === void 0 ? void 0 : {
      cell: [t.current.cell[0] + e, t.current.cell[1]],
      range: {
        ...t.current.range,
        x: t.current.range.x + e
      },
      rangeStack: t.current.rangeStack.map((n) => ({
        ...n,
        x: n.x + e
      }))
    },
    rows: t.rows,
    columns: t.columns.offset(e)
  };
}
const Ma = {
  kind: Be.Loading,
  allowOverlay: !1
}, Ia = {
  columns: on.empty(),
  rows: on.empty(),
  current: void 0
}, l_ = (t, e) => {
  var ep, tp, np;
  const [n, r] = w.useState(Ia), [i, o] = w.useState(), s = w.useRef(null), a = w.useRef(null), [l, c] = w.useState(), u = w.useRef(), d = typeof window > "u" ? null : window, { imageEditorOverride: f, getRowThemeOverride: h, markdownDivCreateNode: p, width: g, height: y, columns: m, rows: b, getCellContent: C, onCellClicked: I, onCellActivated: v, onFillPattern: T, onFinishedEditing: D, coercePasteValue: P, drawHeader: S, drawCell: z, editorBloom: k, onHeaderClicked: x, onColumnProposeMove: M, rangeSelectionColumnSpanning: _ = !0, spanRangeBehavior: E = "default", onGroupHeaderClicked: O, onCellContextMenu: L, className: W, onHeaderContextMenu: re, getCellsForSelection: F, onGroupHeaderContextMenu: N, onGroupHeaderRenamed: te, onCellEdited: Y, onCellsEdited: j, onSearchResultsChanged: ee, searchResults: H, onSearchValueChange: Z, searchValue: J, onKeyDown: V, onKeyUp: K, keybindings: le, editOnType: ue = !0, onRowAppended: ke, onColumnAppended: we, onColumnMoved: He, validateCell: nt, highlightRegions: bt, rangeSelect: gt = "rect", columnSelect: ne = "multi", rowSelect: Ne = "multi", rangeSelectionBlending: Ae = "exclusive", columnSelectionBlending: Ke = "exclusive", rowSelectionBlending: $e = "exclusive", onDelete: Oe, onDragStart: et, onMouseMove: ht, onPaste: Se, copyHeaders: Ze = !1, freezeColumns: Ct = 0, cellActivationBehavior: wt = "second-click", rowSelectionMode: Ve = "auto", columnSelectionMode: Et = "auto", onHeaderMenuClick: pt, onHeaderIndicatorClick: mt, getGroupDetails: zt, rowGrouping: Bt, onSearchClose: nn, onItemHovered: vt, onSelectionCleared: he, showSearch: ge, onVisibleRegionChanged: Ce, gridSelection: Re, onGridSelectionChange: Pe, minColumnWidth: lt = 50, maxColumnWidth: ie = 500, maxColumnAutoWidth: de, provideEditor: _e, trailingRowOptions: Ue, freezeTrailingRows: Mt = 0, allowedFillDirections: Gt = "orthogonal", scrollOffsetX: it, scrollOffsetY: Q, verticalBorder: xe, onDragOverCell: Ie, onDrop: Je, onColumnResize: ft, onColumnResizeEnd: Dt, onColumnResizeStart: ot, customRenderers: Rt, fillHandle: It, experimental: Tt, fixedShadowX: rn, fixedShadowY: xr, headerIcons: qt, imageWindowLoader: yn, initialSize: On, isDraggable: Gn, onDragLeave: Vt, onRowMoved: zn, overscrollX: ur, overscrollY: bn, preventDiagonalScrolling: dr, rightElement: Yn, rightElementProps: dn, trapFocus: Sn = !1, smoothScrollX: rr, smoothScrollY: Pr, scaleToRem: pi = !1, rowHeight: Ur = 34, headerHeight: Qn = 36, groupHeaderHeight: kr = Qn, theme: gi, isOutsideClick: Gr, renderers: ir, resizeIndicator: Ee, scrollToActiveCell: tt = !0, drawFocusRing: Nt = !0, portalElementRef: vn } = t, Zt = Nt === "no-editor" ? i === void 0 : Nt, Qt = typeof t.rowMarkers == "string" ? void 0 : t.rowMarkers, In = (Qt == null ? void 0 : Qt.kind) ?? t.rowMarkers ?? "none", Yr = (Qt == null ? void 0 : Qt.width) ?? t.rowMarkerWidth, $ = (Qt == null ? void 0 : Qt.startIndex) ?? t.rowMarkerStartIndex ?? 1, ve = (Qt == null ? void 0 : Qt.theme) ?? t.rowMarkerTheme, Fe = Qt == null ? void 0 : Qt.headerTheme, Ge = Qt == null ? void 0 : Qt.headerAlwaysVisible, rt = Ne !== "multi" || (Qt == null ? void 0 : Qt.headerDisabled) === !0, Wt = (Qt == null ? void 0 : Qt.checkboxStyle) ?? "square", qn = Math.max(lt, 20), Wn = Math.max(ie, qn), fr = Math.max(de ?? Wn, qn), mi = w.useMemo(() => typeof window > "u" ? { fontSize: "16px" } : window.getComputedStyle(document.documentElement), []), { rows: xt, rowNumberMapper: Li, rowHeight: $i, getRowThemeOverride: or } = t_(Bt, b, Ur, h), fo = w.useMemo(() => Number.parseFloat(mi.fontSize), [mi]), { rowHeight: tn, headerHeight: Fi, groupHeaderHeight: Us, theme: ho, overscrollX: Tl, overscrollY: El } = ZA({
    groupHeaderHeight: kr,
    headerHeight: Qn,
    overscrollX: ur,
    overscrollY: bn,
    remSize: fo,
    rowHeight: $i,
    scaleToRem: pi,
    theme: gi
  }), Xr = QA(le), yi = Yr ?? (b > 1e4 ? 48 : b > 1e3 ? 44 : b > 100 ? 36 : 32), hr = In !== "none", oe = hr ? 1 : 0, wn = Ue !== void 0, oi = (Ue == null ? void 0 : Ue.sticky) === !0, [Ml, Hi] = w.useState(!1), Il = ge ?? Ml, po = w.useCallback(() => {
    nn !== void 0 ? nn() : Hi(!1);
  }, [nn]), fe = w.useMemo(() => Re === void 0 ? void 0 : Ea(Re, oe), [Re, oe]) ?? n, X = w.useRef();
  X.current === void 0 && (X.current = new AbortController()), w.useEffect(() => () => X == null ? void 0 : X.current.abort(), []);
  const [be, st] = zA(F, C, oe, X.current, xt), at = w.useCallback((R, B, q) => {
    if (nt === void 0)
      return !0;
    const U = [R[0] - oe, R[1]];
    return nt == null ? void 0 : nt(U, B, q);
  }, [oe, nt]), qe = w.useRef(Re), We = w.useCallback((R, B) => {
    B && (R = WA(R, be, oe, E, X.current)), Pe !== void 0 ? (qe.current = Ea(R, -oe), Pe(qe.current)) : r(R);
  }, [Pe, be, oe, E]), At = Ti(ft, w.useCallback((R, B, q, U) => {
    ft == null || ft(m[q - oe], B, q - oe, U);
  }, [ft, oe, m])), Yt = Ti(Dt, w.useCallback((R, B, q, U) => {
    Dt == null || Dt(m[q - oe], B, q - oe, U);
  }, [Dt, oe, m])), yt = Ti(ot, w.useCallback((R, B, q, U) => {
    ot == null || ot(m[q - oe], B, q - oe, U);
  }, [ot, oe, m])), Ln = Ti(S, w.useCallback((R, B) => (S == null ? void 0 : S({ ...R, columnIndex: R.columnIndex - oe }, B)) ?? !1, [S, oe])), kt = Ti(z, w.useCallback((R, B) => (z == null ? void 0 : z({ ...R, col: R.col - oe }, B)) ?? !1, [z, oe])), Xt = w.useCallback((R) => {
    if (Oe !== void 0) {
      const B = Oe(Ea(R, -oe));
      return typeof B == "boolean" ? B : Ea(B, oe);
    }
    return !0;
  }, [Oe, oe]), [Ft, Ht, Lt] = OA(fe, We, Ae, Ke, $e, gt, _), Jt = w.useMemo(() => di(Dh(), ho), [ho]), [En, Dr] = w.useState([0, 0, 0]), Nr = w.useMemo(() => {
    if (ir === void 0)
      return {};
    const R = {};
    for (const B of ir)
      R[B.kind] = B;
    return R;
  }, [ir]), xn = w.useCallback((R) => R.kind !== Be.Custom ? Nr[R.kind] : Rt == null ? void 0 : Rt.find((B) => B.isMatch(R)), [Rt, Nr]);
  let { sizedColumns: An, nonGrowWidth: an } = zE(m, xt, st, En[0] - (oe === 0 ? 0 : yi) - En[2], qn, fr, Jt, xn, X.current);
  In !== "none" && (an += yi);
  const Sr = w.useMemo(() => An.some((R) => R.group !== void 0), [An]), Xn = Sr ? Fi + Us : Fi, go = fe.rows.length, si = In === "none" ? void 0 : go === 0 ? !1 : go === xt ? !0 : void 0, jt = w.useMemo(() => In === "none" ? An : [
    {
      title: "",
      width: yi,
      icon: void 0,
      hasMenu: !1,
      style: "normal",
      themeOverride: ve,
      rowMarker: Wt,
      rowMarkerChecked: si,
      headerRowMarkerTheme: Fe,
      headerRowMarkerAlwaysVisible: Ge,
      headerRowMarkerDisabled: rt
    },
    ...An
  ], [
    In,
    An,
    yi,
    ve,
    Wt,
    si,
    Fe,
    Ge,
    rt
  ]), $n = w.useRef({
    height: 1,
    width: 1,
    x: 0,
    y: 0
  }), Bi = w.useRef(!1), { setVisibleRegion: bi, visibleRegion: ai, scrollRef: hn } = i_(it, Q, tn, $n, () => Bi.current = !0);
  $n.current = ai;
  const aw = ai.x + oe, Gs = ai.y, jn = w.useRef(null), er = w.useCallback((R) => {
    var B;
    R === !0 ? (B = jn.current) == null || B.focus() : window.requestAnimationFrame(() => {
      var q;
      (q = jn.current) == null || q.focus();
    });
  }, []), Vn = wn ? xt + 1 : xt, Cr = w.useCallback((R) => {
    const B = oe === 0 ? R : R.map((U) => ({
      ...U,
      location: [U.location[0] - oe, U.location[1]]
    })), q = j == null ? void 0 : j(B);
    if (q !== !0)
      for (const U of B)
        Y == null || Y(U.location, U.value);
    return q;
  }, [Y, j, oe]), [qi, Al] = w.useState(), Ys = fe.current !== void 0 && fe.current.range.width * fe.current.range.height > 1 ? fe.current.range : void 0, mo = Zt ? (ep = fe.current) == null ? void 0 : ep.cell : void 0, Xs = mo == null ? void 0 : mo[0], Vs = mo == null ? void 0 : mo[1], lw = w.useMemo(() => {
    if ((bt === void 0 || bt.length === 0) && (Ys ?? Xs ?? Vs ?? qi) === void 0)
      return;
    const R = [];
    if (bt !== void 0)
      for (const B of bt) {
        const q = jt.length - B.range.x - oe;
        q > 0 && R.push({
          color: B.color,
          range: {
            ...B.range,
            x: B.range.x + oe,
            width: Math.min(q, B.range.width)
          },
          style: B.style
        });
      }
    return qi !== void 0 && R.push({
      color: io(Jt.accentColor, 0),
      range: qi,
      style: "dashed"
    }), Ys !== void 0 && R.push({
      color: io(Jt.accentColor, 0.5),
      range: Ys,
      style: "solid-outline"
    }), Xs !== void 0 && Vs !== void 0 && R.push({
      color: Jt.accentColor,
      range: {
        x: Xs,
        y: Vs,
        width: 1,
        height: 1
      },
      style: "solid-outline"
    }), R.length > 0 ? R : void 0;
  }, [
    qi,
    Ys,
    Xs,
    Vs,
    bt,
    jt.length,
    Jt.accentColor,
    oe
  ]), Bh = w.useRef(jt);
  Bh.current = jt;
  const pr = w.useCallback(([R, B], q = !1) => {
    var me, se, ce, ye, Te, je, ct;
    const U = wn && B === Vn - 1;
    if (R === 0 && hr) {
      if (U)
        return Ma;
      const De = Li(B);
      return De === void 0 ? Ma : {
        kind: Ir.Marker,
        allowOverlay: !1,
        checkboxStyle: Wt,
        checked: (fe == null ? void 0 : fe.rows.hasIndex(B)) === !0,
        markerKind: In === "clickable-number" ? "number" : In,
        row: $ + De,
        drawHandle: zn !== void 0,
        cursor: In === "clickable-number" ? "pointer" : void 0
      };
    } else if (U) {
      const _t = R === oe ? (Ue == null ? void 0 : Ue.hint) ?? "" : "", ut = Bh.current[R];
      if (((me = ut == null ? void 0 : ut.trailingRowOptions) == null ? void 0 : me.disabled) === !0)
        return Ma;
      {
        const $t = ((se = ut == null ? void 0 : ut.trailingRowOptions) == null ? void 0 : se.hint) ?? _t, Ot = ((ce = ut == null ? void 0 : ut.trailingRowOptions) == null ? void 0 : ce.addIcon) ?? (Ue == null ? void 0 : Ue.addIcon);
        return {
          kind: Ir.NewRow,
          hint: $t,
          allowOverlay: !1,
          icon: Ot
        };
      }
    } else {
      const De = R - oe;
      if (q || (Tt == null ? void 0 : Tt.strict) === !0) {
        const ut = $n.current, $t = ut.x > De || De > ut.x + ut.width || ut.y > B || B > ut.y + ut.height || B >= Nl.current, Ot = De === ((Te = (ye = ut.extras) == null ? void 0 : ye.selected) == null ? void 0 : Te[0]) && B === ((je = ut.extras) == null ? void 0 : je.selected[1]);
        let St = !1;
        if (((ct = ut.extras) == null ? void 0 : ct.freezeRegions) !== void 0) {
          for (const en of ut.extras.freezeRegions)
            if (Qi(en, De, B)) {
              St = !0;
              break;
            }
        }
        if ($t && !Ot && !St)
          return Ma;
      }
      let _t = C([De, B]);
      return oe !== 0 && _t.span !== void 0 && (_t = {
        ..._t,
        span: [_t.span[0] + oe, _t.span[1] + oe]
      }), _t;
    }
  }, [
    wn,
    Vn,
    hr,
    Li,
    Wt,
    fe == null ? void 0 : fe.rows,
    In,
    $,
    zn,
    oe,
    Ue == null ? void 0 : Ue.hint,
    Ue == null ? void 0 : Ue.addIcon,
    Tt == null ? void 0 : Tt.strict,
    C
  ]), _l = w.useCallback((R) => {
    let B = (zt == null ? void 0 : zt(R)) ?? { name: R };
    return te !== void 0 && R !== "" && (B = {
      icon: B.icon,
      name: B.name,
      overrideTheme: B.overrideTheme,
      actions: [
        ...B.actions ?? [],
        {
          title: "Rename",
          icon: "renameIcon",
          onClick: (q) => zl({
            group: B.name,
            bounds: q.bounds
          })
        }
      ]
    }), B;
  }, [zt, te]), Js = w.useCallback((R) => {
    var ce;
    const [B, q] = R.cell, U = jt[B], ae = (U == null ? void 0 : U.group) !== void 0 ? (ce = _l(U.group)) == null ? void 0 : ce.overrideTheme : void 0, me = U == null ? void 0 : U.themeOverride, se = or == null ? void 0 : or(q);
    o({
      ...R,
      theme: di(Jt, ae, me, se, R.content.themeOverride)
    });
  }, [or, jt, _l, Jt]), yo = w.useCallback((R, B, q) => {
    var se;
    if (fe.current === void 0)
      return;
    const [U, ae] = fe.current.cell, me = pr([U, ae]);
    if (me.kind !== Be.Boolean && me.allowOverlay) {
      let ce = me;
      if (q !== void 0)
        switch (ce.kind) {
          case Be.Number: {
            const ye = $R(() => q === "-" ? -0 : Number.parseFloat(q), 0);
            ce = {
              ...ce,
              data: Number.isNaN(ye) ? 0 : ye
            };
            break;
          }
          case Be.Text:
          case Be.Markdown:
          case Be.Uri:
            ce = {
              ...ce,
              data: q
            };
            break;
        }
      Js({
        target: R,
        content: ce,
        initialValue: q,
        cell: [U, ae],
        highlight: q === void 0,
        forceEditMode: q !== void 0,
        activation: B
      });
    } else me.kind === Be.Boolean && B.inputType === "keyboard" && me.readonly !== !0 && (Cr([
      {
        location: fe.current.cell,
        value: {
          ...me,
          data: V1(me.data)
        }
      }
    ]), (se = jn.current) == null || se.damage([{ cell: fe.current.cell }]));
  }, [pr, fe, Cr, Js]), qh = w.useCallback((R, B) => {
    var ae;
    const q = (ae = jn.current) == null ? void 0 : ae.getBounds(R, B);
    if (q === void 0 || hn.current === null)
      return;
    const U = pr([R, B]);
    U.allowOverlay && Js({
      target: q,
      content: U,
      initialValue: void 0,
      highlight: !0,
      cell: [R, B],
      forceEditMode: !0,
      activation: { inputType: "keyboard", key: "Enter" }
    });
  }, [pr, hn, Js]), Mn = w.useCallback((R, B, q = "both", U = 0, ae = 0, me = void 0) => {
    if (hn.current !== null) {
      const se = jn.current, ce = a.current, ye = typeof R != "number" ? R.unit === "cell" ? R.amount : void 0 : R, Te = typeof B != "number" ? B.unit === "cell" ? B.amount : void 0 : B, je = typeof R != "number" && R.unit === "px" ? R.amount : void 0, ct = typeof B != "number" && B.unit === "px" ? B.amount : void 0;
      if (se !== null && ce !== null) {
        let De = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        }, _t = 0, ut = 0;
        if ((ye !== void 0 || Te !== void 0) && (De = se.getBounds((ye ?? 0) + oe, Te ?? 0) ?? De, De.width === 0 || De.height === 0))
          return;
        const $t = ce.getBoundingClientRect(), Ot = $t.width / ce.offsetWidth;
        if (je !== void 0 && (De = {
          ...De,
          x: je - $t.left - hn.current.scrollLeft,
          width: 1
        }), ct !== void 0 && (De = {
          ...De,
          y: ct + $t.top - hn.current.scrollTop,
          height: 1
        }), De !== void 0) {
          const St = {
            x: De.x - U,
            y: De.y - ae,
            width: De.width + 2 * U,
            height: De.height + 2 * ae
          };
          let en = 0;
          for (let Wl = 0; Wl < Ct; Wl++)
            en += An[Wl].width;
          let Cn = 0;
          const Fn = Mt + (oi ? 1 : 0);
          Fn > 0 && (Cn = uo(Vn, Fn, tn));
          let sr = en * Ot + $t.left + oe * yi * Ot, Jr = $t.right, Lr = $t.top + Xn * Ot, Zr = $t.bottom - Cn * Ot;
          const ia = De.width + U * 2;
          switch (me == null ? void 0 : me.hAlign) {
            case "start":
              Jr = sr + ia;
              break;
            case "end":
              sr = Jr - ia;
              break;
            case "center":
              sr = Math.floor((sr + Jr) / 2) - ia / 2, Jr = sr + ia;
              break;
          }
          const oa = De.height + ae * 2;
          switch (me == null ? void 0 : me.vAlign) {
            case "start":
              Zr = Lr + oa;
              break;
            case "end":
              Lr = Zr - oa;
              break;
            case "center":
              Lr = Math.floor((Lr + Zr) / 2) - oa / 2, Zr = Lr + oa;
              break;
          }
          sr > St.x ? _t = St.x - sr : Jr < St.x + St.width && (_t = St.x + St.width - Jr), Lr > St.y ? ut = St.y - Lr : Zr < St.y + St.height && (ut = St.y + St.height - Zr), q === "vertical" || typeof R == "number" && R < Ct ? _t = 0 : (q === "horizontal" || typeof B == "number" && B >= Vn - Fn) && (ut = 0), (_t !== 0 || ut !== 0) && (Ot !== 1 && (_t /= Ot, ut /= Ot), hn.current.scrollTo({
            left: _t + hn.current.scrollLeft,
            top: ut + hn.current.scrollTop,
            behavior: (me == null ? void 0 : me.behavior) ?? "auto"
          }));
        }
      }
    }
  }, [
    oe,
    Mt,
    yi,
    hn,
    Xn,
    Ct,
    An,
    Vn,
    oi,
    tn
  ]), Pl = w.useRef(qh), Dl = w.useRef(C);
  Pl.current = qh, Dl.current = C;
  const Nl = w.useRef(xt);
  Nl.current = xt;
  const Wh = w.useRef(jt.length);
  Wh.current = jt.length;
  const vi = w.useCallback(async (R, B = !0, q) => {
    var Te;
    const U = jt[R];
    if (((Te = U == null ? void 0 : U.trailingRowOptions) == null ? void 0 : Te.disabled) === !0)
      return;
    const ae = ke == null ? void 0 : ke();
    let me, se = !0;
    ae !== void 0 && (me = await ae, me === "top" && (se = !1), typeof me == "number" && (se = !1));
    let ce = 0;
    const ye = () => {
      if (Nl.current <= xt) {
        ce < 500 && window.setTimeout(ye, ce), ce = 50 + ce * 2;
        return;
      }
      const je = typeof me == "number" ? me : se ? xt : 0;
      ra.current(R - oe, je, "both", 0, 0, q ? { behavior: q } : void 0), Ft({
        cell: [R, je],
        range: {
          x: R,
          y: je,
          width: 1,
          height: 1
        }
      }, !1, !1, "edit");
      const ct = Dl.current([R - oe, je]);
      ct.allowOverlay && Eo(ct) && ct.readonly !== !0 && B && window.setTimeout(() => {
        Pl.current(R, je);
      }, 0);
    };
    ye();
  }, [jt, ke, oe, xt, Ft]), Zs = w.useCallback(async (R, B = !0) => {
    const q = we == null ? void 0 : we();
    let U, ae = !0;
    q !== void 0 && (U = await q, U === "left" && (ae = !1), typeof U == "number" && (ae = !1));
    let me = 0;
    const se = () => {
      if (Wh.current <= jt.length) {
        me < 500 && window.setTimeout(se, me), me = 50 + me * 2;
        return;
      }
      const ce = typeof U == "number" ? U : ae ? jt.length : 0;
      Mn(ce - oe, R), Ft({
        cell: [ce, R],
        range: {
          x: ce,
          y: R,
          width: 1,
          height: 1
        }
      }, !1, !1, "edit");
      const ye = Dl.current([ce - oe, R]);
      ye.allowOverlay && Eo(ye) && ye.readonly !== !0 && B && window.setTimeout(() => {
        Pl.current(ce, R);
      }, 0);
    };
    se();
  }, [jt, we, oe, Mn, Ft]), bo = w.useCallback((R) => {
    var q, U;
    const B = ((U = (q = An[R]) == null ? void 0 : q.trailingRowOptions) == null ? void 0 : U.targetColumn) ?? (Ue == null ? void 0 : Ue.targetColumn);
    if (typeof B == "number")
      return B + (hr ? 1 : 0);
    if (typeof B == "object") {
      const ae = m.indexOf(B);
      if (ae >= 0)
        return ae + (hr ? 1 : 0);
    }
  }, [An, m, hr, Ue == null ? void 0 : Ue.targetColumn]), wi = w.useRef(), vo = w.useRef(), Uo = w.useCallback((R, B) => {
    var ae;
    const [q, U] = B;
    return di(Jt, (ae = jt[q]) == null ? void 0 : ae.themeOverride, or == null ? void 0 : or(U), R.themeOverride);
  }, [or, jt, Jt]), { mapper: Wi } = n_(Bt, b), Or = Bt == null ? void 0 : Bt.navigationBehavior, Go = w.useCallback((R) => {
    var Te, je, ct;
    const B = nl.value ? R.metaKey : R.ctrlKey, q = B && Ne === "multi", [U, ae] = R.location, me = fe.columns, se = fe.rows, [ce, ye] = ((Te = fe.current) == null ? void 0 : Te.cell) ?? [];
    if (R.kind === "cell") {
      if (vo.current = void 0, ji.current = [U, ae], U === 0 && hr) {
        if (wn === !0 && ae === xt || In === "number" || Ne === "none")
          return;
        const De = pr(R.location);
        if (De.kind !== Ir.Marker)
          return;
        if (zn !== void 0) {
          const $t = xn(De);
          mr(($t == null ? void 0 : $t.kind) === Ir.Marker);
          const Ot = (je = $t == null ? void 0 : $t.onClick) == null ? void 0 : je.call($t, {
            ...R,
            cell: De,
            posX: R.localEventX,
            posY: R.localEventY,
            bounds: R.bounds,
            theme: Uo(De, R.location),
            preventDefault: () => {
            }
          });
          if (Ot === void 0 || Ot.checked === De.checked)
            return;
        }
        o(void 0), er();
        const _t = se.hasIndex(ae), ut = wi.current;
        if (Ne === "multi" && (R.shiftKey || R.isLongTouch === !0) && ut !== void 0 && se.hasIndex(ut)) {
          const $t = [Math.min(ut, ae), Math.max(ut, ae) + 1];
          q || Ve === "multi" ? Ht(void 0, $t, !0) : Ht(on.fromSingleSelection($t), void 0, q);
        } else Ne === "multi" && (q || R.isTouch || Ve === "multi") ? _t ? Ht(se.remove(ae), void 0, !0) : (Ht(void 0, ae, !0), wi.current = ae) : _t && se.length === 1 ? Ht(on.empty(), void 0, B) : (Ht(on.fromSingleSelection(ae), void 0, B), wi.current = ae);
      } else if (U >= oe && wn && ae === xt) {
        const De = bo(U);
        vi(De ?? U);
      } else if (ce !== U || ye !== ae) {
        const De = pr(R.location), _t = xn(De);
        if ((_t == null ? void 0 : _t.onSelect) !== void 0) {
          let Ot = !1;
          if (_t.onSelect({
            ...R,
            cell: De,
            posX: R.localEventX,
            posY: R.localEventY,
            bounds: R.bounds,
            preventDefault: () => Ot = !0,
            theme: Uo(De, R.location)
          }), Ot)
            return;
        }
        if (Or === "block" && Wi(ae).isGroupHeader)
          return;
        const ut = oi && ae === xt, $t = oi && fe !== void 0 && ((ct = fe.current) == null ? void 0 : ct.cell[1]) === xt;
        if ((R.shiftKey || R.isLongTouch === !0) && ce !== void 0 && ye !== void 0 && fe.current !== void 0 && !$t) {
          if (ut)
            return;
          const Ot = Math.min(U, ce), St = Math.max(U, ce), en = Math.min(ae, ye), Cn = Math.max(ae, ye);
          Ft({
            ...fe.current,
            range: {
              x: Ot,
              y: en,
              width: St - Ot + 1,
              height: Cn - en + 1
            }
          }, !0, B, "click"), wi.current = void 0, er();
        } else
          Ft({
            cell: [U, ae],
            range: { x: U, y: ae, width: 1, height: 1 }
          }, !0, B, "click"), wi.current = void 0, o(void 0), er();
      }
    } else if (R.kind === "header")
      if (ji.current = [U, ae], o(void 0), hr && U === 0)
        wi.current = void 0, vo.current = void 0, !rt && Ne === "multi" && (se.length !== xt ? Ht(on.fromSingleSelection([0, xt]), void 0, B) : Ht(on.empty(), void 0, B), er());
      else {
        const De = vo.current;
        if (ne === "multi" && (R.shiftKey || R.isLongTouch === !0) && De !== void 0 && me.hasIndex(De)) {
          const _t = [Math.min(De, U), Math.max(De, U) + 1];
          B || R.isTouch || Et === "multi" ? Lt(void 0, _t, B) : Lt(on.fromSingleSelection(_t), void 0, B);
        } else ne === "multi" && (B || R.isTouch || Et === "multi") ? (me.hasIndex(U) ? Lt(me.remove(U), void 0, B) : Lt(void 0, U, B), vo.current = U) : ne !== "none" && (me.hasIndex(U) ? Lt(me.remove(U), void 0, B) : Lt(on.fromSingleSelection(U), void 0, B), vo.current = U);
        wi.current = void 0, er();
      }
    else R.kind === Br ? ji.current = [U, ae] : R.kind === rl && !R.isMaybeScrollbar && (We(Ia, !1), o(void 0), er(), he == null || he(), wi.current = void 0, vo.current = void 0);
  }, [
    Ne,
    ne,
    fe,
    hr,
    oe,
    wn,
    xt,
    In,
    pr,
    zn,
    er,
    Ve,
    Et,
    xn,
    Uo,
    Ht,
    bo,
    vi,
    Or,
    Wi,
    oi,
    Ft,
    rt,
    Lt,
    We,
    he
  ]), Yo = w.useRef(!1), ji = w.useRef(), jh = w.useRef(ai), Rr = w.useRef(), cw = w.useCallback((R) => {
    if (wo.current = !1, jh.current = $n.current, R.button !== 0 && R.button !== 1) {
      Rr.current = void 0;
      return;
    }
    const B = performance.now();
    Rr.current = {
      button: R.button,
      time: B,
      location: R.location
    }, (R == null ? void 0 : R.kind) === "header" && (Yo.current = !0);
    const q = R.kind === "cell" && R.isFillHandle;
    !q && R.kind !== "cell" && R.isEdge || (c({
      previousSelection: fe,
      fillHandle: q
    }), ji.current = void 0, !R.isTouch && R.button === 0 && !q ? Go(R) : !R.isTouch && R.button === 1 && (ji.current = R.location));
  }, [fe, Go]), [Ol, zl] = w.useState(), Kh = w.useCallback((R) => {
    if (R.kind !== Br || ne !== "multi")
      return;
    const B = nl.value ? R.metaKey : R.ctrlKey, [q] = R.location, U = fe.columns;
    if (q < oe)
      return;
    const ae = jt[q];
    let me = q, se = q;
    for (let ce = q - 1; ce >= oe && Ds(ae.group, jt[ce].group); ce--)
      me--;
    for (let ce = q + 1; ce < jt.length && Ds(ae.group, jt[ce].group); ce++)
      se++;
    if (er(), B || R.isTouch || Et === "multi")
      if (U.hasAll([me, se + 1])) {
        let ce = U;
        for (let ye = me; ye <= se; ye++)
          ce = ce.remove(ye);
        Lt(ce, void 0, B);
      } else
        Lt(void 0, [me, se + 1], B);
    else
      Lt(on.fromSingleSelection([me, se + 1]), void 0, B);
  }, [
    ne,
    er,
    fe.columns,
    jt,
    oe,
    Lt,
    Et
  ]), wo = w.useRef(!1), Qs = w.useCallback(async (R) => {
    if (be !== void 0 && At !== void 0) {
      const B = $n.current.y, q = $n.current.height;
      let U = be({
        x: R,
        y: B,
        width: 1,
        height: Math.min(q, xt - B)
      }, X.current.signal);
      typeof U != "object" && (U = await U());
      const ae = An[R - oe], se = document.createElement("canvas").getContext("2d", { alpha: !1 });
      if (se !== null) {
        se.font = Jt.baseFontFull;
        const ce = R1(se, Jt, ae, 0, U, qn, Wn, !1, xn);
        At == null || At(ae, ce.width, R, ce.width);
      }
    }
  }, [
    An,
    be,
    Wn,
    Jt,
    qn,
    At,
    oe,
    xt,
    xn
  ]), [uw, Ll] = w.useState(), xo = w.useCallback(async (R, B) => {
    var ce, ye;
    const q = (ce = R.current) == null ? void 0 : ce.range;
    if (q === void 0 || be === void 0 || B.current === void 0)
      return;
    const U = B.current.range;
    if (T !== void 0) {
      let Te = !1;
      if (T({
        fillDestination: { ...U, x: U.x - oe },
        patternSource: { ...q, x: q.x - oe },
        preventDefault: () => Te = !0
      }), Te)
        return;
    }
    let ae = be(q, X.current.signal);
    typeof ae != "object" && (ae = await ae());
    const me = ae, se = [];
    for (let Te = 0; Te < U.width; Te++)
      for (let je = 0; je < U.height; je++) {
        const ct = [U.x + Te, U.y + je];
        if (g1(ct, q))
          continue;
        const De = me[je % q.height][Te % q.width];
        _o(De) || !Eo(De) || se.push({
          location: ct,
          value: { ...De }
        });
      }
    Cr(se), (ye = jn.current) == null || ye.damage(se.map((Te) => ({
      cell: Te.location
    })));
  }, [be, Cr, T, oe]), Uh = w.useCallback(() => {
    if (fe.current === void 0 || fe.current.range.width <= 1)
      return;
    const R = {
      ...fe,
      current: {
        ...fe.current,
        range: {
          ...fe.current.range,
          width: 1
        }
      }
    };
    xo(R, fe);
  }, [xo, fe]), Gh = w.useCallback(() => {
    if (fe.current === void 0 || fe.current.range.height <= 1)
      return;
    const R = {
      ...fe,
      current: {
        ...fe.current,
        range: {
          ...fe.current.range,
          height: 1
        }
      }
    };
    xo(R, fe);
  }, [xo, fe]), dw = w.useCallback((R, B) => {
    var je, ct;
    const q = l;
    if (c(void 0), Al(void 0), Ll(void 0), Yo.current = !1, B)
      return;
    if ((q == null ? void 0 : q.fillHandle) === !0 && fe.current !== void 0 && ((je = q.previousSelection) == null ? void 0 : je.current) !== void 0) {
      if (qi === void 0)
        return;
      const De = {
        ...fe,
        current: {
          ...fe.current,
          range: N1(q.previousSelection.current.range, qi)
        }
      };
      xo(q.previousSelection, De), We(De, !0);
      return;
    }
    const [U, ae] = R.location, [me, se] = ji.current ?? [], ce = () => {
      wo.current = !0;
    }, ye = (De) => {
      var ut, $t, Ot;
      const _t = De.isTouch || me === U && se === ae;
      if (_t && (I == null || I([U - oe, ae], {
        ...De,
        preventDefault: ce
      })), De.button === 1)
        return !wo.current;
      if (!wo.current) {
        const St = pr(R.location), en = xn(St);
        if (en !== void 0 && en.onClick !== void 0 && _t) {
          const Fn = en.onClick({
            ...De,
            cell: St,
            posX: De.localEventX,
            posY: De.localEventY,
            bounds: De.bounds,
            theme: Uo(St, R.location),
            preventDefault: ce
          });
          Fn !== void 0 && !_o(Fn) && To(Fn) && (Cr([{ location: De.location, value: Fn }]), (ut = jn.current) == null || ut.damage([
            {
              cell: De.location
            }
          ]));
        }
        if (wo.current || fe.current === void 0)
          return !1;
        let Cn = !1;
        switch (St.activationBehaviorOverride ?? wt) {
          case "double-click":
          case "second-click": {
            if (((Ot = ($t = q == null ? void 0 : q.previousSelection) == null ? void 0 : $t.current) == null ? void 0 : Ot.cell) === void 0)
              break;
            const [Fn, sr] = fe.current.cell, [Jr, Lr] = q.previousSelection.current.cell;
            Cn = U === Fn && U === Jr && ae === sr && ae === Lr && (De.isDoubleClick === !0 || wt === "second-click");
            break;
          }
          case "single-click": {
            Cn = !0;
            break;
          }
        }
        if (Cn) {
          const sr = {
            inputType: "pointer",
            pointerActivation: De.isDoubleClick === !0 ? "double-click" : St.activationBehaviorOverride ?? wt,
            pointerType: De.isTouch ? "touch" : "mouse"
          };
          return v == null || v([U - oe, ae], sr), yo(De.bounds, sr), !0;
        }
      }
      return !1;
    }, Te = R.location[0] - oe;
    if (R.isTouch) {
      const De = $n.current, _t = jh.current;
      if (De.x !== _t.x || De.y !== _t.y)
        return;
      if (R.isLongTouch === !0) {
        if (R.kind === "cell" && ks((ct = fe.current) == null ? void 0 : ct.cell, R.location)) {
          L == null || L([Te, R.location[1]], {
            ...R,
            preventDefault: ce
          });
          return;
        } else if (R.kind === "header" && fe.columns.hasIndex(U)) {
          re == null || re(Te, { ...R, preventDefault: ce });
          return;
        } else if (R.kind === Br) {
          if (Te < 0)
            return;
          N == null || N(Te, { ...R, preventDefault: ce });
          return;
        }
      }
      R.kind === "cell" ? ye(R) || Go(R) : R.kind === Br ? O == null || O(Te, { ...R, preventDefault: ce }) : (R.kind === Ei && (x == null || x(Te, {
        ...R,
        preventDefault: ce
      })), Go(R));
      return;
    }
    if (R.kind === "header") {
      if (Te < 0)
        return;
      R.isEdge ? R.isDoubleClick === !0 && Qs(U) : R.button === 0 && U === me && ae === se && (x == null || x(Te, { ...R, preventDefault: ce }));
    }
    if (R.kind === Br) {
      if (Te < 0)
        return;
      R.button === 0 && U === me && ae === se && (O == null || O(Te, { ...R, preventDefault: ce }), wo.current || Kh(R));
    }
    R.kind === "cell" && (R.button === 0 || R.button === 1) && ye(R), ji.current = void 0;
  }, [
    l,
    fe,
    oe,
    qi,
    xo,
    We,
    I,
    pr,
    xn,
    wt,
    Uo,
    Cr,
    v,
    yo,
    L,
    re,
    N,
    Go,
    O,
    x,
    Qs,
    Kh
  ]), fw = w.useCallback((R) => {
    const B = {
      ...R,
      location: [R.location[0] - oe, R.location[1]]
    };
    ht == null || ht(B), l !== void 0 && R.buttons === 0 && (c(void 0), Al(void 0), Ll(void 0), Yo.current = !1), Ll((q) => {
      var U;
      return Yo.current ? [R.scrollEdge[0], 0] : R.scrollEdge[0] === (q == null ? void 0 : q[0]) && R.scrollEdge[1] === q[1] ? q : l === void 0 || (((U = Rr.current) == null ? void 0 : U.location[0]) ?? 0) < oe ? void 0 : R.scrollEdge;
    });
  }, [l, ht, oe]), hw = w.useCallback((R, B) => {
    pt == null || pt(R - oe, B);
  }, [pt, oe]), pw = w.useCallback((R, B) => {
    mt == null || mt(R - oe, B);
  }, [mt, oe]), Vr = (tp = fe == null ? void 0 : fe.current) == null ? void 0 : tp.cell, gw = w.useCallback((R, B, q, U, ae, me) => {
    Bi.current = !1;
    let se = Vr;
    se !== void 0 && (se = [se[0] - oe, se[1]]);
    const ce = Ct === 0 ? void 0 : {
      x: 0,
      y: R.y,
      width: Ct,
      height: R.height
    }, ye = [];
    ce !== void 0 && ye.push(ce), Mt > 0 && (ye.push({
      x: R.x - oe,
      y: xt - Mt,
      width: R.width,
      height: Mt
    }), Ct > 0 && ye.push({
      x: 0,
      y: xt - Mt,
      width: Ct,
      height: Mt
    }));
    const Te = {
      x: R.x - oe,
      y: R.y,
      width: R.width,
      height: wn && R.y + R.height >= xt ? R.height - 1 : R.height,
      tx: ae,
      ty: me,
      extras: {
        selected: se,
        freezeRegion: ce,
        freezeRegions: ye
      }
    };
    $n.current = Te, bi(Te), Dr([B, q, U]), Ce == null || Ce(Te, Te.tx, Te.ty, Te.extras);
  }, [
    Vr,
    oe,
    wn,
    xt,
    Ct,
    Mt,
    bi,
    Ce
  ]), mw = Ti(M, w.useCallback((R, B) => (M == null ? void 0 : M(R - oe, B - oe)) !== !1, [M, oe])), yw = Ti(He, w.useCallback((R, B) => {
    He == null || He(R - oe, B - oe), ne !== "none" && Lt(on.fromSingleSelection(B), void 0, !0);
  }, [ne, He, oe, Lt])), $l = w.useRef(!1), bw = w.useCallback((R) => {
    if (R.location[0] === 0 && oe > 0) {
      R.preventDefault();
      return;
    }
    et == null || et({
      ...R,
      location: [R.location[0] - oe, R.location[1]]
    }), R.defaultPrevented() || ($l.current = !0), c(void 0);
  }, [et, oe]), vw = w.useCallback(() => {
    $l.current = !1;
  }, []), Yh = Bt == null ? void 0 : Bt.selectionBehavior, ea = w.useCallback((R) => {
    if (Yh !== "block-spanning")
      return;
    const { isGroupHeader: B, path: q, groupRows: U } = Wi(R);
    if (B)
      return [R, R];
    const ae = q[q.length - 1], me = R - ae, se = R + U - ae - 1;
    return [me, se];
  }, [Wi, Yh]), Fl = w.useRef(), Hl = w.useCallback((R) => {
    var B, q, U;
    if (!Y1(R, Fl.current) && (Fl.current = R, !(((B = Rr == null ? void 0 : Rr.current) == null ? void 0 : B.button) !== void 0 && Rr.current.button >= 1))) {
      if (R.buttons !== 0 && l !== void 0 && ((q = Rr.current) == null ? void 0 : q.location[0]) === 0 && oe === 1 && Ne === "multi" && l.previousSelection && !l.previousSelection.rows.hasIndex(Rr.current.location[1]) && fe.rows.hasIndex(Rr.current.location[1])) {
        const ae = Math.min(Rr.current.location[1], R.location[1]), me = Math.max(Rr.current.location[1], R.location[1]) + 1;
        Ht(on.fromSingleSelection([ae, me]), void 0, !1);
      } else if (R.buttons !== 0 && l !== void 0 && fe.current !== void 0 && !$l.current && !Yo.current && (gt === "rect" || gt === "multi-rect")) {
        const [ae, me] = fe.current.cell;
        let [se, ce] = R.location;
        if (ce < 0 && (ce = $n.current.y), l.fillHandle === !0 && ((U = l.previousSelection) == null ? void 0 : U.current) !== void 0) {
          const ye = l.previousSelection.current.range;
          ce = Math.min(ce, wn ? xt - 1 : xt);
          const Te = BM(ye, se, ce, Gt);
          Al(Te);
        } else {
          if (wn && me === xt)
            return;
          if (wn && ce === xt)
            if (R.kind === rl)
              ce--;
            else
              return;
          se = Math.max(se, oe);
          const je = ea(me);
          ce = je === void 0 ? ce : Er(ce, je[0], je[1]);
          const ct = se - ae, De = ce - me, _t = {
            x: ct >= 0 ? ae : se,
            y: De >= 0 ? me : ce,
            width: Math.abs(ct) + 1,
            height: Math.abs(De) + 1
          };
          Ft({
            ...fe.current,
            range: _t
          }, !0, !1, "drag");
        }
      }
      vt == null || vt({ ...R, location: [R.location[0] - oe, R.location[1]] });
    }
  }, [
    l,
    oe,
    Ne,
    fe,
    gt,
    vt,
    Ht,
    wn,
    xt,
    Gt,
    ea,
    Ft
  ]), ww = w.useCallback(() => {
    var se, ce;
    const R = Fl.current;
    if (R === void 0)
      return;
    const [B, q] = R.scrollEdge;
    let [U, ae] = R.location;
    const me = $n.current;
    B === -1 ? U = ((ce = (se = me.extras) == null ? void 0 : se.freezeRegion) == null ? void 0 : ce.x) ?? me.x : B === 1 && (U = me.x + me.width), q === -1 ? ae = Math.max(0, me.y) : q === 1 && (ae = Math.min(xt - 1, me.y + me.height)), U = Er(U, 0, jt.length - 1), ae = Er(ae, 0, xt - 1), Hl({
      ...R,
      location: [U, ae]
    });
  }, [jt.length, Hl, xt]);
  JA(uw, hn, ww);
  const zr = w.useCallback((R) => {
    if (fe.current === void 0)
      return;
    const [B, q] = R, [U, ae] = fe.current.cell, me = fe.current.range;
    let se = me.x, ce = me.x + me.width, ye = me.y, Te = me.y + me.height;
    const [je, ct] = ea(ae) ?? [0, xt - 1], De = ct + 1;
    if (q !== 0)
      switch (q) {
        case 2: {
          Te = De, ye = ae, Mn(0, Te, "vertical");
          break;
        }
        case -2: {
          ye = je, Te = ae + 1, Mn(0, ye, "vertical");
          break;
        }
        case 1: {
          ye < ae ? (ye++, Mn(0, ye, "vertical")) : (Te = Math.min(De, Te + 1), Mn(0, Te, "vertical"));
          break;
        }
        case -1: {
          Te > ae + 1 ? (Te--, Mn(0, Te, "vertical")) : (ye = Math.max(je, ye - 1), Mn(0, ye, "vertical"));
          break;
        }
        default:
          Ps();
      }
    if (B !== 0)
      if (B === 2)
        ce = jt.length, se = U, Mn(ce - 1 - oe, 0, "horizontal");
      else if (B === -2)
        se = oe, ce = U + 1, Mn(se - oe, 0, "horizontal");
      else {
        let _t = [];
        if (be !== void 0) {
          const ut = be({
            x: se,
            y: ye,
            width: ce - se - oe,
            height: Te - ye
          }, X.current.signal);
          typeof ut == "object" && (_t = a_(ut));
        }
        if (B === 1) {
          let ut = !1;
          if (se < U) {
            if (_t.length > 0) {
              const $t = Yi(se + 1, U + 1).find((Ot) => !_t.includes(Ot - oe));
              $t !== void 0 && (se = $t, ut = !0);
            } else
              se++, ut = !0;
            ut && Mn(se, 0, "horizontal");
          }
          ut || (ce = Math.min(jt.length, ce + 1), Mn(ce - 1 - oe, 0, "horizontal"));
        } else if (B === -1) {
          let ut = !1;
          if (ce > U + 1) {
            if (_t.length > 0) {
              const $t = Yi(ce - 1, U, -1).find((Ot) => !_t.includes(Ot - oe));
              $t !== void 0 && (ce = $t, ut = !0);
            } else
              ce--, ut = !0;
            ut && Mn(ce - oe, 0, "horizontal");
          }
          ut || (se = Math.max(oe, se - 1), Mn(se - oe, 0, "horizontal"));
        } else
          Ps();
      }
    Ft({
      cell: fe.current.cell,
      range: {
        x: se,
        y: ye,
        width: ce - se,
        height: Te - ye
      }
    }, !0, !1, "keyboard-select");
  }, [
    be,
    ea,
    fe,
    jt.length,
    oe,
    xt,
    Mn,
    Ft
  ]), Bl = w.useRef(tt);
  Bl.current = tt;
  const xi = w.useCallback((R, B, q, U) => {
    const ae = Vn - (q ? 0 : 1);
    R = Er(R, oe, An.length - 1 + oe), B = Er(B, 0, ae);
    const me = Vr == null ? void 0 : Vr[0], se = Vr == null ? void 0 : Vr[1];
    if (R === me && B === se)
      return !1;
    if (U && fe.current !== void 0) {
      const ce = [...fe.current.rangeStack];
      (fe.current.range.width > 1 || fe.current.range.height > 1) && ce.push(fe.current.range), We({
        ...fe,
        current: {
          cell: [R, B],
          range: { x: R, y: B, width: 1, height: 1 },
          rangeStack: ce
        }
      }, !0);
    } else
      Ft({
        cell: [R, B],
        range: { x: R, y: B, width: 1, height: 1 }
      }, !0, !1, "keyboard-nav");
    return u.current !== void 0 && u.current[0] === R && u.current[1] === B && (u.current = void 0), Bl.current && Mn(R - oe, B), !0;
  }, [
    Vn,
    oe,
    An.length,
    Vr,
    fe,
    Mn,
    We,
    Ft
  ]), xw = w.useCallback((R, B) => {
    (i == null ? void 0 : i.cell) !== void 0 && R !== void 0 && To(R) && (Cr([{ location: i.cell, value: R }]), window.requestAnimationFrame(() => {
      var ae;
      (ae = jn.current) == null || ae.damage([
        {
          cell: i.cell
        }
      ]);
    })), er(!0), o(void 0);
    const [q, U] = B;
    if (fe.current !== void 0 && (q !== 0 || U !== 0)) {
      const ae = fe.current.cell[1] === Vn - 1 && R !== void 0, me = fe.current.cell[0] === jt.length - 1 && R !== void 0;
      let se = !0;
      if (ae && U === 1 && ke !== void 0) {
        se = !1;
        const ce = fe.current.cell[0] + q, ye = bo(ce);
        vi(ye ?? ce, !1);
      }
      if (me && q === 1 && we !== void 0) {
        se = !1;
        const ce = fe.current.cell[1] + U;
        Zs(ce, !1);
      }
      se && xi(Er(fe.current.cell[0] + q, 0, jt.length - 1), Er(fe.current.cell[1] + U, 0, Vn - 1), ae, !1);
    }
    D == null || D(R, B);
  }, [
    i == null ? void 0 : i.cell,
    er,
    fe,
    D,
    Cr,
    Vn,
    xi,
    jt.length,
    vi,
    Zs,
    ke,
    we,
    bo
  ]), kw = w.useMemo(() => `gdg-overlay-${s_++}`, []), Ki = w.useCallback((R) => {
    var q, U, ae, me;
    er();
    const B = [];
    for (let se = R.x; se < R.x + R.width; se++)
      for (let ce = R.y; ce < R.y + R.height; ce++) {
        const ye = C([se - oe, ce]);
        if (!ye.allowOverlay && ye.kind !== Be.Boolean)
          continue;
        let Te;
        if (ye.kind === Be.Custom) {
          const je = xn(ye), ct = (q = je == null ? void 0 : je.provideEditor) == null ? void 0 : q.call(je, {
            ...ye,
            location: [se - oe, ce]
          });
          (je == null ? void 0 : je.onDelete) !== void 0 ? Te = je.onDelete(ye) : FR(ct) && (Te = (U = ct == null ? void 0 : ct.deletedValue) == null ? void 0 : U.call(ct, ye));
        } else if (To(ye) && ye.allowOverlay || ye.kind === Be.Boolean) {
          const je = xn(ye);
          Te = (ae = je == null ? void 0 : je.onDelete) == null ? void 0 : ae.call(je, ye);
        }
        Te !== void 0 && !_o(Te) && To(Te) && B.push({ location: [se, ce], value: Te });
      }
    Cr(B), (me = jn.current) == null || me.damage(B.map((se) => ({ cell: se.location })));
  }, [er, C, xn, Cr, oe]), Xo = i !== void 0, Xh = w.useCallback((R) => {
    var $t, Ot;
    const B = () => {
      R.stopPropagation(), R.preventDefault();
    }, q = {
      didMatch: !1
    }, { bounds: U } = R, ae = fe.columns, me = fe.rows, se = Xr;
    if (!Xo && Kt(se.clear, R, q))
      We(Ia, !1), he == null || he();
    else if (!Xo && Kt(se.selectAll, R, q))
      We({
        columns: on.empty(),
        rows: on.empty(),
        current: {
          cell: (($t = fe.current) == null ? void 0 : $t.cell) ?? [oe, 0],
          range: {
            x: oe,
            y: 0,
            width: m.length,
            height: xt
          },
          rangeStack: []
        }
      }, !1);
    else if (Kt(se.search, R, q))
      (Ot = s == null ? void 0 : s.current) == null || Ot.focus({ preventScroll: !0 }), Hi(!0);
    else if (Kt(se.delete, R, q)) {
      const St = (Xt == null ? void 0 : Xt(fe)) ?? !0;
      if (St !== !1) {
        const en = St === !0 ? fe : St;
        if (en.current !== void 0) {
          Ki(en.current.range);
          for (const Cn of en.current.rangeStack)
            Ki(Cn);
        }
        for (const Cn of en.rows)
          Ki({
            x: oe,
            y: Cn,
            width: m.length,
            height: 1
          });
        for (const Cn of en.columns)
          Ki({
            x: Cn,
            y: 0,
            width: 1,
            height: xt
          });
      }
    }
    if (q.didMatch)
      return B(), !0;
    if (fe.current === void 0)
      return !1;
    let [ce, ye] = fe.current.cell;
    const [, Te] = fe.current.cell;
    let je = !1, ct = !1;
    if (Kt(se.scrollToSelectedCell, R, q))
      ra.current(ce - oe, ye);
    else if (ne !== "none" && Kt(se.selectColumn, R, q))
      ae.hasIndex(ce) ? Lt(ae.remove(ce), void 0, !0) : ne === "single" ? Lt(on.fromSingleSelection(ce), void 0, !0) : Lt(void 0, ce, !0);
    else if (Ne !== "none" && Kt(se.selectRow, R, q))
      me.hasIndex(ye) ? Ht(me.remove(ye), void 0, !0) : Ne === "single" ? Ht(on.fromSingleSelection(ye), void 0, !0) : Ht(void 0, ye, !0);
    else if (!Xo && U !== void 0 && Kt(se.activateCell, R, q))
      if (ye === xt && wn)
        window.setTimeout(() => {
          const St = bo(ce);
          vi(St ?? ce);
        }, 0);
      else {
        const St = {
          inputType: "keyboard",
          key: R.key
        };
        v == null || v([ce - oe, ye], St), yo(U, St);
      }
    else fe.current.range.height > 1 && Kt(se.downFill, R, q) ? Gh() : fe.current.range.width > 1 && Kt(se.rightFill, R, q) ? Uh() : Kt(se.goToNextPage, R, q) ? ye += Math.max(1, $n.current.height - 4) : Kt(se.goToPreviousPage, R, q) ? ye -= Math.max(1, $n.current.height - 4) : Kt(se.goToFirstCell, R, q) ? (o(void 0), ye = 0, ce = 0) : Kt(se.goToLastCell, R, q) ? (o(void 0), ye = Number.MAX_SAFE_INTEGER, ce = Number.MAX_SAFE_INTEGER) : Kt(se.selectToFirstCell, R, q) ? (o(void 0), zr([-2, -2])) : Kt(se.selectToLastCell, R, q) ? (o(void 0), zr([2, 2])) : Xo ? (Kt(se.closeOverlay, R, q) && o(void 0), Kt(se.acceptOverlayDown, R, q) && (o(void 0), ye++), Kt(se.acceptOverlayUp, R, q) && (o(void 0), ye--), Kt(se.acceptOverlayLeft, R, q) && (o(void 0), ce--), Kt(se.acceptOverlayRight, R, q) && (o(void 0), ce++)) : (Kt(se.goDownCell, R, q) ? ye += 1 : Kt(se.goUpCell, R, q) ? ye -= 1 : Kt(se.goRightCell, R, q) ? ce += 1 : Kt(se.goLeftCell, R, q) ? ce -= 1 : Kt(se.goDownCellRetainSelection, R, q) ? (ye += 1, je = !0) : Kt(se.goUpCellRetainSelection, R, q) ? (ye -= 1, je = !0) : Kt(se.goRightCellRetainSelection, R, q) ? (ce += 1, je = !0) : Kt(se.goLeftCellRetainSelection, R, q) ? (ce -= 1, je = !0) : Kt(se.goToLastRow, R, q) ? ye = xt - 1 : Kt(se.goToFirstRow, R, q) ? ye = Number.MIN_SAFE_INTEGER : Kt(se.goToLastColumn, R, q) ? ce = Number.MAX_SAFE_INTEGER : Kt(se.goToFirstColumn, R, q) ? ce = Number.MIN_SAFE_INTEGER : (gt === "rect" || gt === "multi-rect") && (Kt(se.selectGrowDown, R, q) ? zr([0, 1]) : Kt(se.selectGrowUp, R, q) ? zr([0, -1]) : Kt(se.selectGrowRight, R, q) ? zr([1, 0]) : Kt(se.selectGrowLeft, R, q) ? zr([-1, 0]) : Kt(se.selectToLastRow, R, q) ? zr([0, 2]) : Kt(se.selectToFirstRow, R, q) ? zr([0, -2]) : Kt(se.selectToLastColumn, R, q) ? zr([2, 0]) : Kt(se.selectToFirstColumn, R, q) && zr([-2, 0])), ct = q.didMatch);
    if (Or !== void 0 && Or !== "normal" && ye !== Te) {
      const St = Or === "skip-up" || Or === "skip" || Or === "block", en = Or === "skip-down" || Or === "skip" || Or === "block", Cn = ye < Te;
      if (Cn && St) {
        for (; ye >= 0 && Wi(ye).isGroupHeader; )
          ye--;
        ye < 0 && (ye = Te);
      } else if (!Cn && en) {
        for (; ye < xt && Wi(ye).isGroupHeader; )
          ye++;
        ye >= xt && (ye = Te);
      }
    }
    const _t = xi(ce, ye, !1, je), ut = q.didMatch;
    return ut && (_t || !ct || Sn) && B(), ut;
  }, [
    Or,
    Xo,
    fe,
    Xr,
    ne,
    Ne,
    gt,
    oe,
    Wi,
    xt,
    xi,
    We,
    he,
    m.length,
    Xt,
    Sn,
    Ki,
    Lt,
    Ht,
    wn,
    bo,
    vi,
    v,
    yo,
    Gh,
    Uh,
    zr
  ]), Vo = w.useCallback((R) => {
    let B = !1;
    if (V !== void 0 && V({
      ...R,
      ...R.location && {
        location: [R.location[0] - oe, R.location[1]]
      },
      cancel: () => {
        B = !0;
      }
    }), B || Xh(R) || fe.current === void 0)
      return;
    const [q, U] = fe.current.cell, ae = $n.current;
    if (ue && !R.metaKey && !R.ctrlKey && fe.current !== void 0 && R.key.length === 1 && /[\p{L}\p{M}\p{N}\p{S}\p{P}]/u.test(R.key) && R.bounds !== void 0 && Eo(C([q - oe, Math.max(0, Math.min(U, xt - 1))]))) {
      if ((!wn || U !== xt) && (ae.y > U || U > ae.y + ae.height || ae.x > q || q > ae.x + ae.width))
        return;
      const me = {
        inputType: "keyboard",
        key: R.key
      };
      v == null || v([q - oe, U], me), yo(R.bounds, me, R.key), R.stopPropagation(), R.preventDefault();
    }
  }, [
    ue,
    V,
    Xh,
    fe,
    C,
    oe,
    xt,
    wn,
    v,
    yo
  ]), Sw = w.useCallback((R, B) => {
    const q = R.location[0] - oe;
    if (R.kind === "header" && (re == null || re(q, { ...R, preventDefault: B })), R.kind === Br) {
      if (q < 0)
        return;
      N == null || N(q, { ...R, preventDefault: B });
    }
    if (R.kind === "cell") {
      const [U, ae] = R.location;
      L == null || L([q, ae], {
        ...R,
        preventDefault: B
      }), vE(fe, R.location) || xi(U, ae, !1, !1);
    }
  }, [
    fe,
    L,
    N,
    re,
    oe,
    xi
  ]), ql = w.useCallback(async (R) => {
    var se, ce, ye;
    if (!Xr.paste)
      return;
    function B(Te, je, ct, De) {
      var ut, $t;
      const _t = typeof ct == "object" ? (ct == null ? void 0 : ct.join(`
`)) ?? "" : (ct == null ? void 0 : ct.toString()) ?? "";
      if (!_o(Te) && Eo(Te) && Te.readonly !== !0) {
        const Ot = P == null ? void 0 : P(_t, Te);
        if (Ot !== void 0 && To(Ot))
          return process.env.NODE_ENV !== "production" && Ot.kind !== Te.kind && console.warn("Coercion should not change cell kind."), {
            location: je,
            value: Ot
          };
        const St = xn(Te);
        if (St === void 0)
          return;
        if (St.kind === Be.Custom) {
          mr(Te.kind === Be.Custom);
          const en = (ut = St.onPaste) == null ? void 0 : ut.call(St, _t, Te.data);
          return en === void 0 ? void 0 : {
            location: je,
            value: {
              ...Te,
              data: en
            }
          };
        } else {
          const en = ($t = St.onPaste) == null ? void 0 : $t.call(St, _t, Te, {
            formatted: De,
            formattedString: typeof De == "string" ? De : De == null ? void 0 : De.join(`
`),
            rawValue: ct
          });
          return en === void 0 ? void 0 : (mr(en.kind === Te.kind), {
            location: je,
            value: en
          });
        }
      }
    }
    const q = fe.columns, U = fe.rows, ae = ((se = hn.current) == null ? void 0 : se.contains(document.activeElement)) === !0 || ((ce = a.current) == null ? void 0 : ce.contains(document.activeElement)) === !0;
    let me;
    if (fe.current !== void 0 ? me = [fe.current.range.x, fe.current.range.y] : q.length === 1 ? me = [q.first() ?? 0, 0] : U.length === 1 && (me = [oe, U.first() ?? 0]), ae && me !== void 0) {
      let Te, je;
      const ct = "text/plain", De = "text/html";
      if (navigator.clipboard.read !== void 0) {
        const Ot = await navigator.clipboard.read();
        for (const St of Ot) {
          if (St.types.includes(De)) {
            const Cn = await (await St.getType(De)).text(), Fn = Iy(Cn);
            if (Fn !== void 0) {
              Te = Fn;
              break;
            }
          }
          St.types.includes(ct) && (je = await (await St.getType(ct)).text());
        }
      } else if (navigator.clipboard.readText !== void 0)
        je = await navigator.clipboard.readText();
      else if (R !== void 0 && (R == null ? void 0 : R.clipboardData) !== null) {
        if (R.clipboardData.types.includes(De)) {
          const Ot = R.clipboardData.getData(De);
          Te = Iy(Ot);
        }
        Te === void 0 && R.clipboardData.types.includes(ct) && (je = R.clipboardData.getData(ct));
      } else
        return;
      const [_t, ut] = me, $t = [];
      do {
        if (Se === void 0) {
          const Ot = pr(me), St = je ?? (Te == null ? void 0 : Te.map((Cn) => Cn.map((Fn) => Fn.rawValue).join("	")).join("	")) ?? "", en = B(Ot, me, St, void 0);
          en !== void 0 && $t.push(en);
          break;
        }
        if (Te === void 0) {
          if (je === void 0)
            return;
          Te = jA(je);
        }
        if (Se === !1 || typeof Se == "function" && (Se == null ? void 0 : Se([me[0] - oe, me[1]], Te.map((Ot) => Ot.map((St) => {
          var en;
          return ((en = St.rawValue) == null ? void 0 : en.toString()) ?? "";
        })))) !== !0)
          return;
        for (const [Ot, St] of Te.entries()) {
          if (Ot + ut >= xt)
            break;
          for (const [en, Cn] of St.entries()) {
            const Fn = [en + _t, Ot + ut], [sr, Jr] = Fn;
            if (sr >= jt.length || Jr >= Vn)
              continue;
            const Lr = pr(Fn), Zr = B(Lr, Fn, Cn.rawValue, Cn.formatted);
            Zr !== void 0 && $t.push(Zr);
          }
        }
      } while (!1);
      Cr($t), (ye = jn.current) == null || ye.damage($t.map((Ot) => ({
        cell: Ot.location
      })));
    }
  }, [
    P,
    xn,
    pr,
    fe,
    Xr.paste,
    hn,
    jt.length,
    Cr,
    Vn,
    Se,
    oe,
    xt
  ]);
  tr("paste", ql, d, !1, !0);
  const Jo = w.useCallback(async (R, B) => {
    var se, ce;
    if (!Xr.copy)
      return;
    const q = B === !0 || ((se = hn.current) == null ? void 0 : se.contains(document.activeElement)) === !0 || ((ce = a.current) == null ? void 0 : ce.contains(document.activeElement)) === !0, U = fe.columns, ae = fe.rows, me = (ye, Te) => {
      if (!Ze)
        _y(ye, Te, R);
      else {
        const je = Te.map((ct) => ({
          kind: Be.Text,
          data: m[ct].title,
          displayData: m[ct].title,
          allowOverlay: !1
        }));
        _y([je, ...ye], Te, R);
      }
    };
    if (q && be !== void 0) {
      if (fe.current !== void 0) {
        let ye = be(fe.current.range, X.current.signal);
        typeof ye != "object" && (ye = await ye()), me(ye, Yi(fe.current.range.x - oe, fe.current.range.x + fe.current.range.width - oe));
      } else if (ae !== void 0 && ae.length > 0) {
        const Te = [...ae].map((je) => {
          const ct = be({
            x: oe,
            y: je,
            width: m.length,
            height: 1
          }, X.current.signal);
          return typeof ct == "object" ? ct[0] : ct().then((De) => De[0]);
        });
        if (Te.some((je) => je instanceof Promise)) {
          const je = await Promise.all(Te);
          me(je, Yi(m.length));
        } else
          me(Te, Yi(m.length));
      } else if (U.length > 0) {
        const ye = [], Te = [];
        for (const je of U) {
          let ct = be({
            x: je,
            y: 0,
            width: 1,
            height: xt
          }, X.current.signal);
          typeof ct != "object" && (ct = await ct()), ye.push(ct), Te.push(je - oe);
        }
        if (ye.length === 1)
          me(ye[0], Te);
        else {
          const je = ye.reduce((ct, De) => ct.map((_t, ut) => [..._t, ...De[ut]]));
          me(je, Te);
        }
      }
    }
  }, [
    m,
    be,
    fe,
    Xr.copy,
    oe,
    hn,
    xt,
    Ze
  ]);
  tr("copy", Jo, d, !1, !1);
  const Cw = w.useCallback(async (R) => {
    var q, U;
    if (!(!Xr.cut || !(((q = hn.current) == null ? void 0 : q.contains(document.activeElement)) === !0 || ((U = a.current) == null ? void 0 : U.contains(document.activeElement)) === !0)) && (await Jo(R), fe.current !== void 0)) {
      let ae = {
        current: {
          cell: fe.current.cell,
          range: fe.current.range,
          rangeStack: []
        },
        rows: on.empty(),
        columns: on.empty()
      };
      const me = Xt == null ? void 0 : Xt(ae);
      if (me === !1 || (ae = me === !0 ? ae : me, ae.current === void 0))
        return;
      Ki(ae.current.range);
    }
  }, [Ki, fe, Xr.cut, Jo, hn, Xt]);
  tr("cut", Cw, d, !1, !1);
  const Rw = w.useCallback((R, B) => {
    if (ee !== void 0) {
      oe !== 0 && (R = R.map((ae) => [ae[0] - oe, ae[1]])), ee(R, B);
      return;
    }
    if (R.length === 0 || B === -1)
      return;
    const [q, U] = R[B];
    u.current !== void 0 && u.current[0] === q && u.current[1] === U || (u.current = [q, U], xi(q, U, !1, !1));
  }, [ee, oe, xi]), [ta, na] = ((np = Re == null ? void 0 : Re.current) == null ? void 0 : np.cell) ?? [], ra = w.useRef(Mn);
  ra.current = Mn, w.useLayoutEffect(() => {
    var R, B, q, U;
    Bl.current && !Bi.current && ta !== void 0 && na !== void 0 && (ta !== ((B = (R = qe.current) == null ? void 0 : R.current) == null ? void 0 : B.cell[0]) || na !== ((U = (q = qe.current) == null ? void 0 : q.current) == null ? void 0 : U.cell[1])) && ra.current(ta, na), Bi.current = !1;
  }, [ta, na]);
  const Vh = fe.current !== void 0 && (fe.current.cell[0] >= jt.length || fe.current.cell[1] >= Vn);
  w.useLayoutEffect(() => {
    Vh && We(Ia, !1);
  }, [Vh, We]);
  const Tw = w.useMemo(() => wn === !0 && (Ue == null ? void 0 : Ue.tint) === !0 ? on.fromSingleSelection(Vn - 1) : on.empty(), [Vn, wn, Ue == null ? void 0 : Ue.tint]), Ew = w.useCallback((R) => typeof xe == "boolean" ? xe : (xe == null ? void 0 : xe(R - oe)) ?? !0, [oe, xe]), Mw = w.useMemo(() => {
    if (Ol === void 0 || a.current === null)
      return null;
    const { bounds: R, group: B } = Ol, q = a.current.getBoundingClientRect();
    return w.createElement(DA, { bounds: R, group: B, canvasBounds: q, onClose: () => zl(void 0), onFinish: (U) => {
      zl(void 0), te == null || te(B, U);
    } });
  }, [te, Ol]), Iw = Math.min(jt.length, Ct + (hr ? 1 : 0));
  w.useImperativeHandle(e, () => ({
    appendRow: (R, B) => vi(R + oe, B),
    appendColumn: (R, B) => Zs(R, B),
    updateCells: (R) => {
      var B;
      return oe !== 0 && (R = R.map((q) => ({ cell: [q.cell[0] + oe, q.cell[1]] }))), (B = jn.current) == null ? void 0 : B.damage(R);
    },
    getBounds: (R, B) => {
      var q;
      if (!((a == null ? void 0 : a.current) === null || (hn == null ? void 0 : hn.current) === null)) {
        if (R === void 0 && B === void 0) {
          const U = a.current.getBoundingClientRect(), ae = U.width / hn.current.clientWidth;
          return {
            x: U.x - hn.current.scrollLeft * ae,
            y: U.y - hn.current.scrollTop * ae,
            width: hn.current.scrollWidth * ae,
            height: hn.current.scrollHeight * ae
          };
        }
        return (q = jn.current) == null ? void 0 : q.getBounds((R ?? 0) + oe, B);
      }
    },
    focus: () => {
      var R;
      return (R = jn.current) == null ? void 0 : R.focus();
    },
    emit: async (R) => {
      switch (R) {
        case "delete":
          Vo({
            bounds: void 0,
            cancel: () => {
            },
            stopPropagation: () => {
            },
            preventDefault: () => {
            },
            ctrlKey: !1,
            key: "Delete",
            keyCode: 46,
            metaKey: !1,
            shiftKey: !1,
            altKey: !1,
            rawEvent: void 0,
            location: void 0
          });
          break;
        case "fill-right":
          Vo({
            bounds: void 0,
            cancel: () => {
            },
            stopPropagation: () => {
            },
            preventDefault: () => {
            },
            ctrlKey: !0,
            key: "r",
            keyCode: 82,
            metaKey: !1,
            shiftKey: !1,
            altKey: !1,
            rawEvent: void 0,
            location: void 0
          });
          break;
        case "fill-down":
          Vo({
            bounds: void 0,
            cancel: () => {
            },
            stopPropagation: () => {
            },
            preventDefault: () => {
            },
            ctrlKey: !0,
            key: "d",
            keyCode: 68,
            metaKey: !1,
            shiftKey: !1,
            altKey: !1,
            rawEvent: void 0,
            location: void 0
          });
          break;
        case "copy":
          await Jo(void 0, !0);
          break;
        case "paste":
          await ql();
          break;
      }
    },
    scrollTo: Mn,
    remeasureColumns: (R) => {
      for (const B of R)
        Qs(B + oe);
    },
    getMouseArgsForPosition: (R, B, q) => {
      if ((jn == null ? void 0 : jn.current) === null)
        return;
      const U = jn.current.getMouseArgsForPosition(R, B, q);
      if (U !== void 0)
        return {
          ...U,
          location: [U.location[0] - oe, U.location[1]]
        };
    }
  }), [
    vi,
    Zs,
    Qs,
    hn,
    Jo,
    Vo,
    ql,
    oe,
    Mn
  ]);
  const [Jh, Zh] = Vr ?? [], Aw = w.useCallback((R) => {
    const [B, q] = R;
    if (q === -1) {
      ne !== "none" && (Lt(on.fromSingleSelection(B), void 0, !1), er());
      return;
    }
    Jh === B && Zh === q || (Ft({
      cell: R,
      range: { x: B, y: q, width: 1, height: 1 }
    }, !0, !1, "keyboard-nav"), Mn(B, q));
  }, [ne, er, Mn, Jh, Zh, Ft, Lt]), [_w, Pw] = w.useState(!1), Qh = w.useRef(Zv((R) => {
    Pw(R);
  }, 5)), Dw = w.useCallback(() => {
    Qh.current(!0), fe.current === void 0 && fe.columns.length === 0 && fe.rows.length === 0 && l === void 0 && Ft({
      cell: [oe, Gs],
      range: {
        x: oe,
        y: Gs,
        width: 1,
        height: 1
      }
    }, !0, !1, "keyboard-select");
  }, [Gs, fe, l, oe, Ft]), Nw = w.useCallback(() => {
    Qh.current(!1);
  }, []), [Ow, zw] = w.useMemo(() => {
    let R;
    const B = (Tt == null ? void 0 : Tt.scrollbarWidthOverride) ?? Sf(), q = xt + (wn ? 1 : 0);
    if (typeof tn == "number")
      R = Xn + q * tn;
    else {
      let ae = 0;
      const me = Math.min(q, 10);
      for (let se = 0; se < me; se++)
        ae += tn(se);
      ae = Math.floor(ae / me), R = Xn + q * ae;
    }
    R += B;
    const U = jt.reduce((ae, me) => me.width + ae, 0) + B;
    return [`${Math.min(1e5, U)}px`, `${Math.min(1e5, R)}px`];
  }, [jt, Tt == null ? void 0 : Tt.scrollbarWidthOverride, tn, xt, wn, Xn]), Lw = w.useMemo(() => DE(Jt), [Jt]);
  return w.createElement(
    NE.Provider,
    { value: Jt },
    w.createElement(
      YA,
      { style: Lw, className: W, inWidth: g ?? Ow, inHeight: y ?? zw },
      w.createElement(IA, { fillHandle: It, drawFocusRing: Zt, experimental: Tt, fixedShadowX: rn, fixedShadowY: xr, getRowThemeOverride: or, headerIcons: qt, imageWindowLoader: yn, initialSize: On, isDraggable: Gn, onDragLeave: Vt, onRowMoved: zn, overscrollX: Tl, overscrollY: El, preventDiagonalScrolling: dr, rightElement: Yn, rightElementProps: dn, smoothScrollX: rr, smoothScrollY: Pr, className: W, enableGroups: Sr, onCanvasFocused: Dw, onCanvasBlur: Nw, canvasRef: a, onContextMenu: Sw, theme: Jt, cellXOffset: aw, cellYOffset: Gs, accessibilityHeight: ai.height, onDragEnd: vw, columns: jt, nonGrowWidth: an, drawHeader: Ln, onColumnProposeMove: mw, drawCell: kt, disabledRows: Tw, freezeColumns: Iw, lockColumns: oe, firstColAccessible: oe === 0, getCellContent: pr, minColumnWidth: qn, maxColumnWidth: Wn, searchInputRef: s, showSearch: Il, onSearchClose: po, highlightRegions: lw, getCellsForSelection: be, getGroupDetails: _l, headerHeight: Fi, isFocused: _w, groupHeaderHeight: Sr ? Us : 0, freezeTrailingRows: Mt + (wn && (Ue == null ? void 0 : Ue.sticky) === !0 ? 1 : 0), hasAppendRow: wn, onColumnResize: At, onColumnResizeEnd: Yt, onColumnResizeStart: yt, onCellFocused: Aw, onColumnMoved: yw, onDragStart: bw, onHeaderMenuClick: hw, onHeaderIndicatorClick: pw, onItemHovered: Hl, isFilling: (l == null ? void 0 : l.fillHandle) === !0, onMouseMove: fw, onKeyDown: Vo, onKeyUp: K, onMouseDown: cw, onMouseUp: dw, onDragOverCell: Ie, onDrop: Je, onSearchResultsChanged: Rw, onVisibleRegionChanged: gw, clientSize: En, rowHeight: tn, searchResults: H, searchValue: J, onSearchValueChange: Z, rows: Vn, scrollRef: hn, selection: fe, translateX: ai.tx, translateY: ai.ty, verticalBorder: Ew, gridRef: jn, getCellRenderer: xn, resizeIndicator: Ee }),
      Mw,
      i !== void 0 && w.createElement(
        w.Suspense,
        { fallback: null },
        w.createElement(o_, { ...i, validateCell: at, bloom: k, id: kw, getCellRenderer: xn, className: (Tt == null ? void 0 : Tt.isSubGrid) === !0 ? "click-outside-ignore" : void 0, provideEditor: _e, imageEditorOverride: f, portalElementRef: vn, onFinishEditing: xw, markdownDivCreateNode: p, isOutsideClick: Gr, customEventTarget: Tt == null ? void 0 : Tt.eventTarget })
      )
    )
  );
}, c_ = w.forwardRef(l_);
function Ny(t) {
  const { cell: e, posX: n, posY: r, bounds: i, theme: o } = t, { width: s, height: a, x: l, y: c } = i, u = e.maxSize ?? o.checkboxMaxSize, d = Math.floor(i.y + a / 2), f = t1(u, a, o.cellVerticalPadding), h = e1(e.contentAlign ?? "center", l, s, o.cellHorizontalPadding, f), p = Qv(h, d, f), g = n1(l + n, c + r, p);
  return gh(e) && g;
}
const u_ = {
  getAccessibilityString: (t) => {
    var e;
    return ((e = t.data) == null ? void 0 : e.toString()) ?? "false";
  },
  kind: Be.Boolean,
  needsHover: !0,
  useLabel: !1,
  needsHoverPosition: !0,
  measure: () => 50,
  draw: (t) => d_(t, t.cell.data, gh(t.cell), t.cell.maxSize ?? t.theme.checkboxMaxSize, t.cell.hoverEffectIntensity ?? 0.35),
  onDelete: (t) => ({
    ...t,
    data: !1
  }),
  onSelect: (t) => {
    Ny(t) && t.preventDefault();
  },
  onClick: (t) => {
    if (Ny(t))
      return {
        ...t.cell,
        data: V1(t.cell.data)
      };
  },
  onPaste: (t, e) => {
    let n = Xa;
    return t.toLowerCase() === "true" ? n = !0 : t.toLowerCase() === "false" ? n = !1 : t.toLowerCase() === "indeterminate" && (n = ph), n === e.data ? void 0 : {
      ...e,
      data: n
    };
  }
};
function d_(t, e, n, r, i) {
  if (!n && e === Xa)
    return;
  const { ctx: o, hoverAmount: s, theme: a, rect: l, highlighted: c, hoverX: u, hoverY: d, cell: { contentAlign: f } } = t, { x: h, y: p, width: g, height: y } = l;
  let m = !1;
  if (i > 0) {
    let b = n ? 1 - i + i * s : 0.4;
    if (e === Xa && (b *= s), b === 0)
      return;
    b < 1 && (m = !0, o.globalAlpha = b);
  }
  zh(o, a, e, h, p, g, y, c, u, d, r, f), m && (o.globalAlpha = 1);
}
const f_ = /* @__PURE__ */ wr("div")({
  name: "BubblesOverlayEditorStyle",
  class: "gdg-b1ygi5by",
  propsAsIs: !1
}), h_ = (t) => {
  const { bubbles: e } = t;
  return w.createElement(
    f_,
    null,
    e.map((n, r) => w.createElement("div", { key: r, className: "boe-bubble" }, n)),
    w.createElement("textarea", { className: "gdg-input", autoFocus: !0 })
  );
}, p_ = {
  getAccessibilityString: (t) => r1(t.data),
  kind: Be.Bubble,
  needsHover: !1,
  useLabel: !1,
  needsHoverPosition: !1,
  measure: (t, e, n) => {
    const r = e.data.reduce((i, o) => t.measureText(o).width + i + n.bubblePadding * 2 + n.bubbleMargin, 0);
    return e.data.length === 0 ? n.cellHorizontalPadding * 2 : r + 2 * n.cellHorizontalPadding - n.bubbleMargin;
  },
  draw: (t) => g_(t, t.cell.data),
  provideEditor: () => (t) => {
    const { value: e } = t;
    return w.createElement(h_, { bubbles: e.data });
  },
  onPaste: () => {
  }
};
function g_(t, e) {
  const { rect: n, theme: r, ctx: i, highlighted: o } = t, { x: s, y: a, width: l, height: c } = n;
  let u = s + r.cellHorizontalPadding;
  const d = [];
  for (const f of e) {
    if (u > s + l)
      break;
    const h = Ko(f, i, r.baseFontFull).width;
    d.push({
      x: u,
      width: h
    }), u += h + r.bubblePadding * 2 + r.bubbleMargin;
  }
  i.beginPath();
  for (const f of d)
    ei(i, f.x, a + (c - r.bubbleHeight) / 2, f.width + r.bubblePadding * 2, r.bubbleHeight, r.roundingRadius ?? r.bubbleHeight / 2);
  i.fillStyle = o ? r.bgBubbleSelected : r.bgBubble, i.fill();
  for (const [f, h] of d.entries())
    i.beginPath(), i.fillStyle = r.textBubble, i.fillText(e[f], h.x + r.bubblePadding, a + c / 2 + Oi(i, r));
}
const m_ = /* @__PURE__ */ wr("div")({
  name: "DrilldownOverlayEditorStyle",
  class: "gdg-d4zsq0x",
  propsAsIs: !1
}), y_ = (t) => {
  const {
    drilldowns: e
  } = t;
  return w.createElement(m_, null, e.map((n, r) => w.createElement("div", {
    key: r,
    className: "doe-bubble"
  }, n.img !== void 0 && w.createElement("img", {
    src: n.img
  }), w.createElement("div", null, n.text))));
}, b_ = {
  getAccessibilityString: (t) => r1(t.data.map((e) => e.text)),
  kind: Be.Drilldown,
  needsHover: !1,
  useLabel: !1,
  needsHoverPosition: !1,
  measure: (t, e, n) => e.data.reduce((r, i) => t.measureText(i.text).width + r + n.bubblePadding * 2 + n.bubbleMargin + (i.img !== void 0 ? 18 : 0), 0) + 2 * n.cellHorizontalPadding - 4,
  draw: (t) => w_(t, t.cell.data),
  provideEditor: () => (t) => {
    const { value: e } = t;
    return w.createElement(y_, { drilldowns: e.data });
  },
  onPaste: () => {
  }
}, of = {};
function v_(t, e, n, r) {
  const i = Math.ceil(window.devicePixelRatio), o = 5, s = n - o * 2, a = 4, l = n * i, c = r + o, u = r * 3, d = (u + o * 2) * i, f = `${t},${e},${i},${n}`;
  if (of[f] !== void 0)
    return {
      el: of[f],
      height: l,
      width: d,
      middleWidth: a * i,
      sideWidth: c * i,
      padding: o * i,
      dpr: i
    };
  const h = document.createElement("canvas"), p = h.getContext("2d");
  return p === null ? null : (h.width = d, h.height = l, p.scale(i, i), of[f] = h, p.beginPath(), ei(p, o, o, u, s, r), p.shadowColor = "rgba(24, 25, 34, 0.4)", p.shadowBlur = 1, p.fillStyle = t, p.fill(), p.shadowColor = "rgba(24, 25, 34, 0.3)", p.shadowOffsetY = 1, p.shadowBlur = 5, p.fillStyle = t, p.fill(), p.shadowOffsetY = 0, p.shadowBlur = 0, p.shadowBlur = 0, p.beginPath(), ei(p, o + 0.5, o + 0.5, u, s, r), p.strokeStyle = e, p.lineWidth = 1, p.stroke(), {
    el: h,
    height: l,
    width: d,
    sideWidth: c * i,
    middleWidth: r * i,
    padding: o * i,
    dpr: i
  });
}
function w_(t, e) {
  const { rect: n, theme: r, ctx: i, imageLoader: o, col: s, row: a } = t, { x: l, width: c } = n, u = r.baseFontFull, d = x1(i, u), f = Math.min(n.height, Math.max(16, Math.ceil(d * r.lineHeight) * 2)), h = Math.floor(n.y + (n.height - f) / 2), p = f - 10, g = r.bubblePadding, y = r.bubbleMargin;
  let m = l + r.cellHorizontalPadding;
  const b = r.roundingRadius ?? 6, C = v_(r.bgCell, r.drilldownBorder, f, b), I = [];
  for (const v of e) {
    if (m > l + c)
      break;
    const D = Ko(v.text, i, u).width;
    let P = 0;
    v.img !== void 0 && o.loadOrGetImage(v.img, s, a) !== void 0 && (P = p - 8 + 4);
    const S = D + P + g * 2;
    I.push({
      x: m,
      width: S
    }), m += S + y;
  }
  if (C !== null) {
    const { el: v, height: T, middleWidth: D, sideWidth: P, width: S, dpr: z, padding: k } = C, x = P / z, M = k / z;
    for (const _ of I) {
      const E = Math.floor(_.x), O = Math.floor(_.width), L = O - (x - M) * 2;
      i.imageSmoothingEnabled = !1, i.drawImage(v, 0, 0, P, T, E - M, h, x, f), L > 0 && i.drawImage(v, P, 0, D, T, E + (x - M), h, L, f), i.drawImage(v, S - P, 0, P, T, E + O - (x - M), h, x, f), i.imageSmoothingEnabled = !0;
    }
  }
  i.beginPath();
  for (const [v, T] of I.entries()) {
    const D = e[v];
    let P = T.x + g;
    if (D.img !== void 0) {
      const S = o.loadOrGetImage(D.img, s, a);
      if (S !== void 0) {
        const z = p - 8;
        let k = 0, x = 0, M = S.width, _ = S.height;
        M > _ ? (k += (M - _) / 2, M = _) : _ > M && (x += (_ - M) / 2, _ = M), i.beginPath(), ei(i, P, h + f / 2 - z / 2, z, z, r.roundingRadius ?? 3), i.save(), i.clip(), i.drawImage(S, k, x, M, _, P, h + f / 2 - z / 2, z, z), i.restore(), P += z + 4;
      }
    }
    i.beginPath(), i.fillStyle = r.textBubble, i.fillText(D.text, P, h + f / 2 + Oi(i, r));
  }
}
const x_ = {
  getAccessibilityString: (t) => t.data.join(", "),
  kind: Be.Image,
  needsHover: !1,
  useLabel: !1,
  needsHoverPosition: !1,
  draw: (t) => k_(t, t.cell.displayData ?? t.cell.data, t.cell.rounding ?? t.theme.roundingRadius ?? 4, t.cell.contentAlign),
  measure: (t, e) => e.data.length * 50,
  onDelete: (t) => ({
    ...t,
    data: []
  }),
  provideEditor: () => (t) => {
    const { value: e, onFinishedEditing: n, imageEditorOverride: r } = t, i = r ?? ST;
    return w.createElement(i, { urls: e.data, canWrite: e.readonly !== !0, onCancel: n, onChange: (o) => {
      n({
        ...e,
        data: [o]
      });
    } });
  },
  onPaste: (t, e) => {
    t = t.trim();
    const r = t.split(",").map((i) => {
      try {
        return new URL(i), i;
      } catch {
        return;
      }
    }).filter((i) => i !== void 0);
    if (!(r.length === e.data.length && r.every((i, o) => i === e.data[o])))
      return {
        ...e,
        data: r
      };
  }
}, sf = 4;
function k_(t, e, n, r) {
  const { rect: i, col: o, row: s, theme: a, ctx: l, imageLoader: c } = t, { x: u, y: d, height: f, width: h } = i, p = f - a.cellVerticalPadding * 2, g = [];
  let y = 0;
  for (let b = 0; b < e.length; b++) {
    const C = e[b];
    if (C.length === 0)
      continue;
    const I = c.loadOrGetImage(C, o, s);
    if (I !== void 0) {
      g[b] = I;
      const v = I.width * (p / I.height);
      y += v + sf;
    }
  }
  if (y === 0)
    return;
  y -= sf;
  let m = u + a.cellHorizontalPadding;
  r === "right" ? m = Math.floor(u + h - a.cellHorizontalPadding - y) : r === "center" && (m = Math.floor(u + h / 2 - y / 2));
  for (const b of g) {
    if (b === void 0)
      continue;
    const C = b.width * (p / b.height);
    n > 0 && (l.beginPath(), ei(l, m, d + a.cellVerticalPadding, C, p, n), l.save(), l.clip()), l.drawImage(b, m, d + a.cellVerticalPadding, C, p), n > 0 && l.restore(), m += C + sf;
  }
}
function S_(t, e) {
  let n = t * 49632 + e * 325176;
  return n ^= n << 13, n ^= n >> 17, n ^= n << 5, n / 4294967295 * 2;
}
const C_ = {
  getAccessibilityString: () => "",
  kind: Be.Loading,
  needsHover: !1,
  useLabel: !1,
  needsHoverPosition: !1,
  measure: () => 120,
  draw: (t) => {
    const { cell: e, col: n, row: r, ctx: i, rect: o, theme: s } = t;
    if (e.skeletonWidth === void 0 || e.skeletonWidth === 0)
      return;
    let a = e.skeletonWidth;
    e.skeletonWidthVariability !== void 0 && e.skeletonWidthVariability > 0 && (a += Math.round(S_(n, r) * e.skeletonWidthVariability));
    const l = s.cellHorizontalPadding;
    a + l * 2 >= o.width && (a = o.width - l * 2 - 1);
    const c = e.skeletonHeight ?? Math.min(18, o.height - 2 * s.cellVerticalPadding);
    ei(i, o.x + l, o.y + (o.height - c) / 2, a, c, s.roundingRadius ?? 3), i.fillStyle = io(s.textDark, 0.1), i.fill();
  },
  onPaste: () => {
  }
}, R_ = () => (t) => t.targetWidth, Oy = /* @__PURE__ */ wr("div")({
  name: "MarkdownOverlayEditorStyle",
  class: "gdg-m1pnx84e",
  propsAsIs: !1,
  vars: {
    "m1pnx84e-0": [R_(), "px"]
  }
}), T_ = (t) => {
  const { value: e, onChange: n, forceEditMode: r, createNode: i, targetRect: o, onFinish: s, validatedSelection: a } = t, l = e.data, c = e.readonly === !0, [u, d] = w.useState(l === "" || r), f = w.useCallback(() => {
    d((p) => !p);
  }, []), h = l ? "gdg-ml-6" : "";
  return u ? w.createElement(
    Oy,
    { targetWidth: o.width - 20 },
    w.createElement(js, { autoFocus: !0, highlight: !1, validatedSelection: a, value: l, onKeyDown: (p) => {
      p.key === "Enter" && p.stopPropagation();
    }, onChange: n }),
    w.createElement(
      "div",
      { className: `gdg-edit-icon gdg-checkmark-hover ${h}`, onClick: () => s(e) },
      w.createElement(mT, null)
    )
  ) : w.createElement(
    Oy,
    { targetWidth: o.width },
    w.createElement(lE, { contents: l, createNode: i }),
    !c && w.createElement(
      w.Fragment,
      null,
      w.createElement("div", { className: "spacer" }),
      w.createElement(
        "div",
        { className: `gdg-edit-icon gdg-edit-hover ${h}`, onClick: f },
        w.createElement(vh, null)
      )
    ),
    w.createElement("textarea", { className: "gdg-md-edit-textarea gdg-input", autoFocus: !0 })
  );
}, E_ = {
  getAccessibilityString: (t) => {
    var e;
    return ((e = t.data) == null ? void 0 : e.toString()) ?? "";
  },
  kind: Be.Markdown,
  needsHover: !1,
  needsHoverPosition: !1,
  drawPrep: Ks,
  measure: (t, e, n) => {
    const r = e.data.split(`
`)[0];
    return t.measureText(r).width + 2 * n.cellHorizontalPadding;
  },
  draw: (t) => li(t, t.cell.data, t.cell.contentAlign),
  onDelete: (t) => ({
    ...t,
    data: ""
  }),
  provideEditor: () => (t) => {
    const { onChange: e, value: n, target: r, onFinishedEditing: i, markdownDivCreateNode: o, forceEditMode: s, validatedSelection: a } = t;
    return w.createElement(T_, { onFinish: i, targetRect: r, value: n, validatedSelection: a, onChange: (l) => e({
      ...n,
      data: l.target.value
    }), forceEditMode: s, createNode: o });
  },
  onPaste: (t, e) => t === e.data ? void 0 : { ...e, data: t }
}, M_ = {
  getAccessibilityString: (t) => t.row.toString(),
  kind: Ir.Marker,
  needsHover: !0,
  needsHoverPosition: !1,
  drawPrep: I_,
  measure: () => 44,
  draw: (t) => __(t, t.cell.row, t.cell.checked, t.cell.markerKind, t.cell.drawHandle, t.cell.checkboxStyle),
  onClick: (t) => {
    const { bounds: e, cell: n, posX: r, posY: i } = t, { width: o, height: s } = e, a = n.drawHandle ? 7 + (o - 7) / 2 : o / 2, l = s / 2;
    if (Math.abs(r - a) <= 10 && Math.abs(i - l) <= 10)
      return {
        ...n,
        checked: !n.checked
      };
  },
  onPaste: () => {
  }
};
function I_(t, e) {
  const { ctx: n, theme: r } = t, i = r.markerFontFull, o = e ?? {};
  return (o == null ? void 0 : o.font) !== i && (n.font = i, o.font = i), o.deprep = A_, n.textAlign = "center", o;
}
function A_(t) {
  const { ctx: e } = t;
  e.textAlign = "start";
}
function __(t, e, n, r, i, o) {
  const { ctx: s, rect: a, hoverAmount: l, theme: c } = t, { x: u, y: d, width: f, height: h } = a, p = n ? 1 : r === "checkbox-visible" ? 0.6 + 0.4 * l : l;
  if (r !== "number" && p > 0) {
    s.globalAlpha = p;
    const g = 7 * (n ? l : 1);
    if (zh(s, c, n, i ? u + g : u, d, i ? f - g : f, h, !0, void 0, void 0, c.checkboxMaxSize, "center", o), i) {
      s.globalAlpha = l, s.beginPath();
      for (const y of [3, 6])
        for (const m of [-5, -1, 3])
          s.rect(u + y, d + h / 2 + m, 2, 2);
      s.fillStyle = c.textLight, s.fill(), s.beginPath();
    }
    s.globalAlpha = 1;
  }
  if (r === "number" || r === "both" && !n) {
    const g = e.toString(), y = c.markerFontFull, m = u + f / 2;
    r === "both" && l !== 0 && (s.globalAlpha = 1 - l), s.fillStyle = c.textLight, s.font = y, s.fillText(g, m, d + h / 2 + Oi(s, y)), l !== 0 && (s.globalAlpha = 1);
  }
}
const P_ = {
  getAccessibilityString: () => "",
  kind: Ir.NewRow,
  needsHover: !0,
  needsHoverPosition: !1,
  measure: () => 200,
  draw: (t) => D_(t, t.cell.hint, t.cell.icon),
  onPaste: () => {
  }
};
function D_(t, e, n) {
  const { ctx: r, rect: i, hoverAmount: o, theme: s, spriteManager: a } = t, { x: l, y: c, width: u, height: d } = i;
  r.beginPath(), r.globalAlpha = o, r.rect(l + 1, c + 1, u, d - 2), r.fillStyle = s.bgHeaderHovered, r.fill(), r.globalAlpha = 1, r.beginPath();
  const f = e !== "";
  let h = 0;
  if (n !== void 0) {
    const g = d - 8, y = l + 8 / 2, m = c + 8 / 2;
    a.drawSprite(n, "normal", r, y, m, g, s, f ? 1 : o), h = g;
  } else {
    h = 24;
    const p = 12, g = f ? p : o * p, y = f ? 0 : (1 - o) * p * 0.5, m = s.cellHorizontalPadding + 4;
    g > 0 && (r.moveTo(l + m + y, c + d / 2), r.lineTo(l + m + y + g, c + d / 2), r.moveTo(l + m + y + g * 0.5, c + d / 2 - g * 0.5), r.lineTo(l + m + y + g * 0.5, c + d / 2 + g * 0.5), r.lineWidth = 2, r.strokeStyle = s.bgIconHeader, r.lineCap = "round", r.stroke());
  }
  r.fillStyle = s.textMedium, r.fillText(e, h + l + s.cellHorizontalPadding + 0.5, c + d / 2 + Oi(r, s)), r.beginPath();
}
function Q1(t, e, n, r, i, o, s) {
  t.textBaseline = "alphabetic";
  const a = N_(t, i, r, e, (n == null ? void 0 : n.fullSize) ?? !1);
  t.beginPath(), ei(t, a.x, a.y, a.width, a.height, e.roundingRadius ?? 4), t.globalAlpha = o, t.fillStyle = (n == null ? void 0 : n.bgColor) ?? io(e.textDark, 0.1), t.fill(), t.globalAlpha = 1, t.fillStyle = e.textDark, t.textBaseline = "middle", s == null || s("text");
}
function N_(t, e, n, r, i) {
  const o = r.cellHorizontalPadding, s = r.cellVerticalPadding;
  if (i)
    return {
      x: e.x + o / 2,
      y: e.y + s / 2 + 1,
      width: e.width - o,
      height: e.height - s - 1
    };
  const a = Ko(n, t, r.baseFontFull, "alphabetic"), l = e.height - s, c = Math.min(l, a.actualBoundingBoxAscent * 2.5);
  return {
    x: e.x + o / 2,
    y: e.y + (e.height - c) / 2 + 1,
    width: a.width + o * 3,
    height: c - 1
  };
}
const O_ = w.lazy(async () => await import("./number-overlay-editor-BaKaKI3L.js")), z_ = {
  getAccessibilityString: (t) => {
    var e;
    return ((e = t.data) == null ? void 0 : e.toString()) ?? "";
  },
  kind: Be.Number,
  needsHover: (t) => t.hoverEffect === !0,
  needsHoverPosition: !1,
  useLabel: !0,
  drawPrep: Ks,
  draw: (t) => {
    const { hoverAmount: e, cell: n, ctx: r, theme: i, rect: o, overrideCursor: s } = t, { hoverEffect: a, displayData: l, hoverEffectTheme: c } = n;
    a === !0 && e > 0 && Q1(r, i, c, l, o, e, s), li(t, t.cell.displayData, t.cell.contentAlign);
  },
  measure: (t, e, n) => t.measureText(e.displayData).width + n.cellHorizontalPadding * 2,
  onDelete: (t) => ({
    ...t,
    data: void 0
  }),
  provideEditor: () => (t) => {
    const { isHighlighted: e, onChange: n, value: r, validatedSelection: i } = t;
    return w.createElement(
      w.Suspense,
      { fallback: null },
      w.createElement(O_, { highlight: e, disabled: r.readonly === !0, value: r.data, fixedDecimals: r.fixedDecimals, allowNegative: r.allowNegative, thousandSeparator: r.thousandSeparator, decimalSeparator: r.decimalSeparator, validatedSelection: i, onChange: (o) => n({
        ...r,
        data: Number.isNaN(o.floatValue ?? 0) ? 0 : o.floatValue
      }) })
    );
  },
  onPaste: (t, e, n) => {
    const r = typeof n.rawValue == "number" ? n.rawValue : Number.parseFloat(typeof n.rawValue == "string" ? n.rawValue : t);
    if (!(Number.isNaN(r) || e.data === r))
      return { ...e, data: r, displayData: n.formattedString ?? e.displayData };
  }
}, L_ = {
  getAccessibilityString: () => "",
  measure: () => 108,
  kind: Be.Protected,
  needsHover: !1,
  needsHoverPosition: !1,
  draw: $_,
  onPaste: () => {
  }
};
function $_(t) {
  const { ctx: e, theme: n, rect: r } = t, { x: i, y: o, height: s } = r;
  e.beginPath();
  const a = 2.5;
  let l = i + n.cellHorizontalPadding + a;
  const c = o + s / 2, u = Math.cos(Rm(30)) * a, d = Math.sin(Rm(30)) * a;
  for (let f = 0; f < 12; f++)
    e.moveTo(l, c - a), e.lineTo(l, c + a), e.moveTo(l + u, c - d), e.lineTo(l - u, c + d), e.moveTo(l - u, c - d), e.lineTo(l + u, c + d), l += 8;
  e.lineWidth = 1.1, e.lineCap = "square", e.strokeStyle = n.textLight, e.stroke();
}
const F_ = {
  getAccessibilityString: (t) => {
    var e;
    return ((e = t.data) == null ? void 0 : e.toString()) ?? "";
  },
  kind: Be.RowID,
  needsHover: !1,
  needsHoverPosition: !1,
  drawPrep: (t, e) => Ks(t, e, t.theme.textLight),
  draw: (t) => li(t, t.cell.data, t.cell.contentAlign),
  measure: (t, e, n) => t.measureText(e.data).width + n.cellHorizontalPadding * 2,
  // eslint-disable-next-line react/display-name
  provideEditor: () => (t) => {
    const { isHighlighted: e, onChange: n, value: r, validatedSelection: i } = t;
    return Pt.createElement(js, { highlight: e, autoFocus: r.readonly !== !0, disabled: r.readonly !== !1, value: r.data, validatedSelection: i, onChange: (o) => n({
      ...r,
      data: o.target.value
    }) });
  },
  onPaste: () => {
  }
}, H_ = {
  getAccessibilityString: (t) => {
    var e;
    return ((e = t.data) == null ? void 0 : e.toString()) ?? "";
  },
  kind: Be.Text,
  needsHover: (t) => t.hoverEffect === !0,
  needsHoverPosition: !1,
  drawPrep: Ks,
  useLabel: !0,
  draw: (t) => {
    const { cell: e, hoverAmount: n, hyperWrapping: r, ctx: i, rect: o, theme: s, overrideCursor: a } = t, { displayData: l, contentAlign: c, hoverEffect: u, allowWrapping: d, hoverEffectTheme: f } = e;
    u === !0 && n > 0 && Q1(i, s, f, l, o, n, a), li(t, l, c, d, r);
  },
  measure: (t, e, n) => {
    const r = e.displayData.split(`
`, e.allowWrapping === !0 ? void 0 : 1);
    let i = 0;
    for (const o of r)
      i = Math.max(i, t.measureText(o).width);
    return i + 2 * n.cellHorizontalPadding;
  },
  onDelete: (t) => ({
    ...t,
    data: ""
  }),
  provideEditor: (t) => ({
    disablePadding: t.allowWrapping === !0,
    editor: (e) => {
      const { isHighlighted: n, onChange: r, value: i, validatedSelection: o } = e;
      return w.createElement(js, { style: t.allowWrapping === !0 ? { padding: "3px 8.5px" } : void 0, highlight: n, autoFocus: i.readonly !== !0, disabled: i.readonly === !0, altNewline: !0, value: i.data, validatedSelection: o, onChange: (s) => r({
        ...i,
        data: s.target.value
      }) });
    }
  }),
  onPaste: (t, e, n) => t === e.data ? void 0 : { ...e, data: t, displayData: n.formattedString ?? e.displayData }
}, B_ = /* @__PURE__ */ wr("div")({
  name: "UriOverlayEditorStyle",
  class: "gdg-u1rrojo",
  propsAsIs: !1
}), q_ = (t) => {
  const { uri: e, onChange: n, forceEditMode: r, readonly: i, validatedSelection: o, preview: s } = t, [a, l] = w.useState(!i && (e === "" || r)), c = w.useCallback(() => {
    l(!0);
  }, []);
  return a ? w.createElement(js, { validatedSelection: o, highlight: !0, autoFocus: !0, value: e, onChange: n }) : w.createElement(
    B_,
    null,
    w.createElement("a", { className: "gdg-link-area", href: e, target: "_blank", rel: "noopener noreferrer" }, s),
    !i && w.createElement(
      "div",
      { className: "gdg-edit-icon", onClick: c },
      w.createElement(vh, null)
    ),
    w.createElement("textarea", { className: "gdg-input", autoFocus: !0 })
  );
};
function ew(t, e, n, r) {
  let i = n.cellHorizontalPadding;
  const o = e.height / 2 - t.actualBoundingBoxAscent / 2, s = t.width, a = t.actualBoundingBoxAscent;
  return r === "right" ? i = e.width - s - n.cellHorizontalPadding : r === "center" && (i = e.width / 2 - s / 2), { x: i, y: o, width: s, height: a };
}
function zy(t) {
  const { cell: e, bounds: n, posX: r, posY: i, theme: o } = t, s = e.displayData ?? e.data;
  if (e.hoverEffect !== !0 || e.onClickUri === void 0)
    return !1;
  const a = v1(s, o.baseFontFull);
  if (a === void 0)
    return !1;
  const l = ew(a, n, o, e.contentAlign);
  return Qi({
    x: l.x - 4,
    y: l.y - 4,
    width: l.width + 8,
    height: l.height + 8
  }, r, i);
}
const W_ = {
  getAccessibilityString: (t) => {
    var e;
    return ((e = t.data) == null ? void 0 : e.toString()) ?? "";
  },
  kind: Be.Uri,
  needsHover: (t) => t.hoverEffect === !0,
  needsHoverPosition: !0,
  useLabel: !0,
  drawPrep: Ks,
  draw: (t) => {
    const { cell: e, theme: n, overrideCursor: r, hoverX: i, hoverY: o, rect: s, ctx: a } = t, l = e.displayData ?? e.data, c = e.hoverEffect === !0;
    if (r !== void 0 && c && i !== void 0 && o !== void 0) {
      const u = Ko(l, a, n.baseFontFull), d = ew(u, s, n, e.contentAlign), { x: f, y: h, width: p, height: g } = d;
      if (i >= f - 4 && i <= f - 4 + p + 8 && o >= h - 4 && o <= h - 4 + g + 8) {
        const y = Oi(a, n.baseFontFull);
        r("pointer");
        const m = 5, b = h - y;
        a.beginPath(), a.moveTo(s.x + f, Math.floor(s.y + b + g + m) + 0.5), a.lineTo(s.x + f + p, Math.floor(s.y + b + g + m) + 0.5), a.strokeStyle = n.linkColor, a.stroke(), a.save(), a.fillStyle = t.cellFillColor, li({ ...t, rect: { ...s, x: s.x - 1 } }, l, e.contentAlign), li({ ...t, rect: { ...s, x: s.x - 2 } }, l, e.contentAlign), li({ ...t, rect: { ...s, x: s.x + 1 } }, l, e.contentAlign), li({ ...t, rect: { ...s, x: s.x + 2 } }, l, e.contentAlign), a.restore();
      }
    }
    a.fillStyle = c ? n.linkColor : n.textDark, li(t, l, e.contentAlign);
  },
  onSelect: (t) => {
    zy(t) && t.preventDefault();
  },
  onClick: (t) => {
    var r;
    const { cell: e } = t;
    zy(t) && ((r = e.onClickUri) == null || r.call(e, t));
  },
  measure: (t, e, n) => t.measureText(e.displayData ?? e.data).width + n.cellHorizontalPadding * 2,
  onDelete: (t) => ({
    ...t,
    data: ""
  }),
  provideEditor: (t) => (e) => {
    const { onChange: n, value: r, forceEditMode: i, validatedSelection: o } = e;
    return w.createElement(q_, { forceEditMode: r.readonly !== !0 && (i || t.hoverEffect === !0 && t.onClickUri !== void 0), uri: r.data, preview: r.displayData ?? r.data, validatedSelection: o, readonly: r.readonly === !0, onChange: (s) => n({
      ...r,
      data: s.target.value
    }) });
  },
  onPaste: (t, e, n) => t === e.data ? void 0 : { ...e, data: t, displayData: n.formattedString ?? e.displayData }
}, j_ = [
  M_,
  P_,
  u_,
  p_,
  b_,
  x_,
  C_,
  E_,
  z_,
  L_,
  F_,
  H_,
  W_
];
var af, Ly;
function K_() {
  if (Ly) return af;
  Ly = 1;
  var t = Jv(), e = ao(), n = "Expected a function";
  function r(i, o, s) {
    var a = !0, l = !0;
    if (typeof i != "function")
      throw new TypeError(n);
    return e(s) && (a = "leading" in s ? !!s.leading : a, l = "trailing" in s ? !!s.trailing : l), t(i, o, {
      leading: a,
      maxWait: o,
      trailing: l
    });
  }
  return af = r, af;
}
var U_ = K_();
const G_ = /* @__PURE__ */ Ni(U_), lf = [];
class Y_ extends S1 {
  constructor() {
    super(...arguments);
    Qe(this, "imageLoaded", () => {
    });
    Qe(this, "loadedLocations", []);
    Qe(this, "cache", {});
    // eslint-disable-next-line unicorn/consistent-function-scoping
    Qe(this, "sendLoaded", G_(() => {
      this.imageLoaded(new Cs(this.loadedLocations)), this.loadedLocations = [];
    }, 20));
    Qe(this, "clearOutOfWindow", () => {
      const n = Object.keys(this.cache);
      for (const r of n) {
        const i = this.cache[r];
        let o = !1;
        for (let s = 0; s < i.cells.length; s++) {
          const a = i.cells[s];
          if (this.isInWindow(a)) {
            o = !0;
            break;
          }
        }
        o ? i.cells = i.cells.filter(this.isInWindow) : (i.cancel(), delete this.cache[r]);
      }
    });
  }
  setCallback(n) {
    this.imageLoaded = n;
  }
  loadImage(n, r, i, o) {
    let s = !1;
    const a = lf.pop() ?? new Image();
    let l = !1;
    const c = {
      img: void 0,
      cells: [qr(r, i)],
      url: n,
      cancel: () => {
        l || (l = !0, lf.length < 12 ? lf.unshift(a) : s || (a.src = ""));
      }
    }, u = new Promise((d) => a.addEventListener("load", () => d(null)));
    requestAnimationFrame(async () => {
      try {
        a.src = n, await u, await a.decode();
        const d = this.cache[o];
        if (d !== void 0 && !l) {
          d.img = a;
          for (const f of d.cells)
            this.loadedLocations.push(Ph(f));
          s = !0, this.sendLoaded();
        }
      } catch {
        c.cancel();
      }
    }), this.cache[o] = c;
  }
  loadOrGetImage(n, r, i) {
    const o = n, s = this.cache[o];
    if (s !== void 0) {
      const a = qr(r, i);
      return s.cells.includes(a) || s.cells.push(a), s.img;
    } else
      this.loadImage(n, r, i, o);
  }
}
const X_ = (t, e) => {
  const n = w.useMemo(() => ({ ...$M, ...t.headerIcons }), [t.headerIcons]), r = w.useMemo(() => t.renderers ?? j_, [t.renderers]), i = w.useMemo(() => t.imageWindowLoader ?? new Y_(), [t.imageWindowLoader]);
  return w.createElement(c_, { ...t, renderers: r, headerIcons: n, ref: e, imageWindowLoader: i });
}, V_ = w.forwardRef(X_), J_ = w.forwardRef(function(e, n) {
  const { getDomCell: r, onVisibleRegionChanged: i, onCellActivated: o, domCellClassName: s, ...a } = e, l = w.useRef(null);
  w.useImperativeHandle(n, () => l.current, []);
  const c = w.useRef(null), u = w.useRef(null), d = w.useRef(null), [f, h] = w.useState([]), p = w.useCallback(() => {
    const m = l.current, b = c.current;
    if (m == null || b == null) return;
    const C = b.getBoundingClientRect(), I = d.current, v = [];
    if (I != null) {
      const T = Math.max(0, Math.floor(I.x)), D = Math.ceil(I.x + I.width), P = Math.max(0, Math.floor(I.y)), S = Math.ceil(I.y + I.height);
      for (let z = P; z < S; z++)
        for (let k = T; k < D; k++) {
          const x = m.getBounds(k, z);
          x != null && (x.y + x.height < C.top || x.y > C.bottom || x.x + x.width < C.left || x.x > C.right || v.push({
            col: k,
            row: z,
            left: Math.round(x.x - C.left),
            top: Math.round(x.y - C.top),
            width: Math.round(x.width),
            height: Math.round(x.height)
          }));
        }
    }
    h((T) => {
      if (T.length !== v.length) return v;
      for (let D = 0; D < v.length; D++) {
        const P = T[D], S = v[D];
        if (P.col !== S.col || P.row !== S.row || P.left !== S.left || P.top !== S.top || P.width !== S.width || P.height !== S.height) return v;
      }
      return T;
    });
  }, []);
  w.useLayoutEffect(() => {
    p();
  }), w.useEffect(() => {
    const m = c.current;
    if (m == null) return;
    const b = typeof ResizeObserver < "u" ? new ResizeObserver(() => p()) : null;
    b != null && b.observe(m);
    const C = () => {
      requestAnimationFrame(p);
    };
    return window.addEventListener("scroll", C, !0), () => {
      b != null && b.disconnect(), window.removeEventListener("scroll", C, !0);
    };
  }, [p]);
  const g = w.useCallback((m, b) => {
    var P;
    o == null || o(m, b);
    const [C, I] = m, v = (P = u.current) == null ? void 0 : P.querySelector('[data-glide-dom-cell="' + C + ":" + I + '"]');
    if (v == null) return;
    const T = v.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (T.length !== 1) return;
    const D = T[0];
    typeof D.focus == "function" && D.focus(), typeof D.click == "function" && D.click();
  }, [o]), y = w.useCallback((m, b, C, I) => {
    d.current = m, requestAnimationFrame(p), i == null || i(m, b, C, I);
  }, [p, i]);
  return w.createElement(
    "div",
    { ref: c, style: { position: "relative", width: "100%" }, "data-glide-dom-wrap": "" },
    w.createElement(V_, Object.assign({}, a, { ref: l, onVisibleRegionChanged: y, onCellActivated: g })),
    w.createElement(
      "div",
      { ref: u, style: { position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }, "data-glide-dom-layer": "" },
      f.map((m) => {
        const b = r == null ? void 0 : r(m.col, m.row);
        return b == null || b === !1 ? null : w.createElement(
          "div",
          {
            key: m.col + ":" + m.row,
            className: s,
            "data-glide-dom-cell": m.col + ":" + m.row,
            style: {
              position: "absolute",
              left: m.left,
              top: m.top,
              width: m.width,
              height: m.height,
              pointerEvents: "auto",
              /* The cell is a CONTAINER: the host arranges its own
                 buttons/fields inside (and may overflow the box
                 for a morph that expands). */
              overflow: "visible"
            }
          },
          b
        );
      })
    )
  );
});
function Z_(t = "light") {
  return t === "dark" ? {
    muted: "#a1a1aa",
    faint: "#71717a",
    override: "#fbbf24",
    editableBg: "#27272a",
    editableHoverBg: "#3f3f46",
    readonlyHoverBg: "#27272a"
  } : {
    muted: "#52525b",
    faint: "#71717a",
    override: "#b45309",
    editableBg: "#eff6ff",
    editableHoverBg: "#dbeafe",
    readonlyHoverBg: "#f4f4f5"
  };
}
function Q_(t = "zinc") {
  switch (t) {
    case "blue":
      return "#2563eb";
    case "emerald":
      return "#059669";
    default:
      return "#52525b";
  }
}
function eP(t = {}) {
  const { fontSize: e = 12, mode: n = "light", accent: r = "#2563eb", overrides: i } = t, o = Dh(), s = n === "light";
  return {
    ...o,
    accentColor: r,
    accentFg: "#ffffff",
    accentLight: s ? "#dbeafe" : "#3f3f46",
    textDark: s ? "#18181b" : "#ffffff",
    textMedium: s ? "#71717a" : "#a1a1aa",
    textLight: s ? "#a1a1aa" : "#71717a",
    textBubble: s ? "#18181b" : "#ffffff",
    bgIconHeader: s ? "#ffffff" : "#27272a",
    fgIconHeader: s ? "#52525b" : "#a1a1aa",
    textHeader: s ? "#71717a" : "#a1a1aa",
    textHeaderSelected: s ? "#1e40af" : "#ffffff",
    bgCell: s ? "#ffffff" : "#18181b",
    bgCellMedium: s ? "#fafafa" : "#1c1c1f",
    bgHeader: s ? "#ffffff" : "#27272a",
    bgHeaderHasFocus: s ? "#fafafa" : "#3f3f46",
    bgHeaderHovered: s ? "#f4f4f5" : "#3f3f46",
    bgBubble: s ? "#f4f4f5" : "#27272a",
    bgBubbleSelected: s ? "#dbeafe" : "#3f3f46",
    bgSearchResult: s ? "#fef08a" : "#713f12",
    borderColor: s ? "#e4e4e7" : "#3f3f46",
    drilldownBorder: s ? "#e4e4e7" : "#3f3f46",
    linkColor: r,
    cellHorizontalPadding: 8,
    cellVerticalPadding: 4,
    headerFontStyle: `600 ${Math.max(10, e - 1)}px`,
    baseFontStyle: `${e}px`,
    markerFontStyle: `500 ${e}px`,
    fontFamily: "Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif",
    editorFontSize: `${e}px`,
    lineHeight: 1.4,
    ...i
  };
}
function tP(t = 12, e) {
  const n = vr(), r = (n == null ? void 0 : n.mode) ?? "light";
  return gn(() => {
    const i = Q_((n == null ? void 0 : n.accent) ?? "zinc");
    return {
      theme: eP({ fontSize: t, mode: r, accent: i, overrides: e }),
      cellColors: Z_(r),
      mode: r
    };
  }, [r, n == null ? void 0 : n.accent, t]);
}
function tw(t, e = {}) {
  return {
    kind: Be.Text,
    data: t,
    displayData: e.displayData ?? t,
    allowOverlay: e.allowOverlay ?? !0,
    readonly: e.readonly ?? !1,
    contentAlign: e.align,
    cursor: e.cursor,
    themeOverride: e.themeOverride,
    selectionRange: e.selectionRange
  };
}
function E3(t, e = {}) {
  return tw(t, {
    ...e,
    selectionRange: t.length > 0 ? [0, t.length] : void 0
  });
}
function M3(t, e, n) {
  const r = n.trim();
  return r === "" ? !t : r === (t || e).trim();
}
function I3(t, e = {}) {
  return tw(t, { ...e, allowOverlay: !1, readonly: !0, cursor: e.cursor ?? "default" });
}
function $y(t = {}) {
  return {
    kind: Be.Text,
    data: "",
    displayData: "",
    allowOverlay: !1,
    readonly: !0,
    cursor: t.readonly ? "default" : "pointer",
    themeOverride: t.hovered && t.hoverBg ? { bgCell: t.hoverBg, bgCellMedium: t.hoverBg } : void 0
  };
}
function nP(t, e, n) {
  var i, o;
  const r = [];
  for (let s = n.y; s < n.y + n.height; s++) {
    if (s >= t.length) continue;
    const a = [];
    for (let l = n.x; l < n.x + n.width; l++) {
      const c = (i = e[l]) == null ? void 0 : i.key;
      !c || c === "actions" || a.push(String(((o = t[s]) == null ? void 0 : o[c]) ?? ""));
    }
    r.push(a.join("	"));
  }
  return r.join(`
`);
}
function rP(t, e, n) {
  var o, s;
  const r = [], i = [];
  for (let a = n.y; a < n.y + n.height; a++) {
    if (a >= t.length) continue;
    const l = [];
    for (let c = n.x; c < n.x + n.width; c++) {
      const u = (o = e[c]) == null ? void 0 : o.key;
      !u || u === "actions" || (l.push(String(((s = t[a]) == null ? void 0 : s[u]) ?? "")), i.push({ row: a, colKey: u }));
    }
    r.push(l.join("	"));
  }
  return { text: r.join(`
`), committers: i };
}
function Fy(t, e) {
  const n = [];
  for (const r of t)
    r >= 0 && r < e && n.push(r);
  return n;
}
function iP(t, e, n) {
  var i;
  if (!t) return null;
  const r = (i = t.current) == null ? void 0 : i.range;
  if (r && r.width > 0 && r.height > 0)
    return { x: r.x, y: r.y, width: r.width, height: r.height };
  if (t.rows.length > 0) {
    const o = Fy(t.rows, e);
    return o.length === 0 ? null : { x: 0, y: o[0], width: n, height: o[o.length - 1] - o[0] + 1 };
  }
  if (t.columns.length > 0) {
    const o = Fy(t.columns, n);
    return o.length === 0 ? null : { x: o[0], y: 0, width: o[o.length - 1] - o[0] + 1, height: e };
  }
  return null;
}
function oP(t, e, n, r) {
  var a;
  const i = [], o = r !== void 0 ? r : t.x, s = r !== void 0 ? r + 1 : t.x + t.width;
  for (let l = t.y; l < t.y + t.height; l++)
    for (let c = o; c < s; c++) {
      const u = (a = e[c]) == null ? void 0 : a.key;
      u && u !== "actions" && i.push({ row: l, colKey: u, val: n });
    }
  return i;
}
function sP(t, e, n, r, i) {
  var c;
  const o = [];
  if (e.length === 0) return o;
  const s = i && i.height > e.length ? i.height : e.length, a = Math.max(...e.map((u) => u.length)), l = i && i.width > a ? i.width : a;
  for (let u = 0; u < s; u++) {
    const d = e[u % e.length], f = t[1] + u;
    if (f >= n) continue;
    const h = d.length || 1;
    for (let p = 0; p < l; p++) {
      const g = t[0] + p, y = (c = r[g]) == null ? void 0 : c.key;
      !y || y === "actions" || o.push({ row: f, colKey: y, val: d[p % h] ?? "" });
    }
  }
  return o;
}
function aP(t, e, n) {
  var i;
  const r = [];
  for (let o = t.y; o < t.y + t.height; o++)
    for (let s = t.x; s < t.x + t.width; s++) {
      const a = (i = e[s]) == null ? void 0 : i.key;
      a && n.has(a) && r.push({ row: o, colKey: a, val: "" });
    }
  return r;
}
function lP(t) {
  return t.split(/\r\n|\n|\r/).map((e) => e.split("	"));
}
function cP(t) {
  const e = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  let r = 0;
  const i = (o) => {
    let s = e.get(o);
    s || (s = { current: null }, e.set(o, s));
    let a = n.get(o);
    return a || (a = (l) => {
      const { value: c, onChange: u, onFinishedEditing: d, isHighlighted: f, validatedSelection: h, initialValue: p } = l, g = s.current, { cfg: y, align: m, activation: b, selectAllOnOpen: C, portal: I } = g, v = G(c), T = G(!1), D = G(null), P = (_) => {
        const E = { kind: Be.Text, data: _, displayData: _, allowOverlay: !0 };
        v.current = E, u(E);
      }, S = () => d(v.current), z = () => d(v.current, [1, 0]), k = () => d(void 0, [0, 0]);
      if (Ye(() => {
        if (b < 0) return;
        const _ = D.current;
        _ && (_.focus(), C ? _.select() : _.setSelectionRange(_.value.length, _.value.length));
      }, [b]), y === null)
        return /* @__PURE__ */ A(
          js,
          {
            style: m ? { textAlign: m } : void 0,
            highlight: f,
            autoFocus: (c == null ? void 0 : c.readonly) !== !0,
            disabled: (c == null ? void 0 : c.readonly) === !0,
            altNewline: !0,
            value: (c == null ? void 0 : c.data) ?? "",
            validatedSelection: h,
            onChange: (_) => P(_.target.value)
          }
        );
      if (y.kind === "text") {
        const _ = (E) => P(y.uppercase ? E.toUpperCase() : E);
        return /* @__PURE__ */ A(
          "input",
          {
            ref: D,
            className: "ui-input",
            value: (c == null ? void 0 : c.data) ?? "",
            style: {
              width: "100%",
              height: "100%",
              border: "none",
              borderRadius: 0,
              background: "transparent",
              textAlign: y.align ?? m,
              outline: "none"
            },
            placeholder: y.placeholder,
            onChange: (E) => _(E.target.value),
            onKeyDown: (E) => {
              if (E.key === "Enter" && !E.shiftKey) {
                E.preventDefault(), E.stopPropagation();
                const O = v.current;
                window.setTimeout(() => d(O), 0);
              }
            }
          }
        );
      }
      const x = y.seedValue ?? (c == null ? void 0 : c.data) ?? "", M = (_) => {
        T.current = !0, P(_[0] ?? "");
      };
      return /* @__PURE__ */ A("div", { style: { width: "100%", height: "100%" }, onKeyDown: (_) => _.stopPropagation(), children: /* @__PURE__ */ A(
        rR,
        {
          appearance: "inline",
          mode: "single",
          values: x ? [x] : [],
          items: y.items,
          groups: y.groups,
          resolveBy: y.resolveBy ?? "id",
          onChange: M,
          onExit: () => {
            T.current ? S() : k();
          },
          onTabExit: () => z(),
          onEscape: () => {
            T.current = !1, k();
          },
          placeholder: y.placeholder,
          defaultOpen: !0,
          autoFocus: !0,
          initialQuery: p,
          selectAllOnOpen: C,
          browse: y.browse,
          panelMinWidth: y.panelMinWidth,
          createLabel: y.createLabel,
          onCreateItem: y.onCreateItem,
          portalTarget: I,
          allowFreeText: !1
        }
      ) });
    }, n.set(o, a)), { Editor: a, box: s };
  };
  return (o) => {
    const s = t();
    if (!s) return;
    const { readOnlyRef: a, columns: l, getValue: c, editors: u, getEditor: d, portalRef: f } = s, h = s.columnOffset ?? 0;
    if (a.current) return;
    const p = o == null ? void 0 : o.location;
    if (!p || o.kind !== Be.Text || o.readonly === !0) return;
    const [g, y] = p, m = l[g - h];
    if (!m) return;
    const b = m.key;
    let C = d ? d(y, b) : u == null ? void 0 : u[b];
    (C == null ? void 0 : C.kind) === "text" && C.align === void 0 && m.align && (C = { ...C, align: m.align });
    const I = !C && (m.align === "center" || m.align === "right");
    if (!C && !I) return;
    const T = String(c(y, b) ?? "") === (o.data ?? ""), { Editor: D, box: P } = i(b);
    return P.current = {
      cfg: C ?? null,
      align: m.align,
      activation: ++r,
      selectAllOnOpen: T,
      portal: f.current
    }, !C || C.kind === "text" ? { editor: D } : { editor: D, disablePadding: !0, styleOverride: { overflow: "visible" } };
  };
}
function uP() {
  const t = zs(), e = G(!1);
  return Ye(() => {
    const n = t ?? (typeof document < "u" ? document : null), r = n == null ? void 0 : n.defaultView;
    if (!r) return;
    const i = (o) => {
      o.key === "Escape" && e.current && o.preventDefault();
    };
    return r.addEventListener("keydown", i, { capture: !0 }), () => r.removeEventListener("keydown", i, { capture: !0 });
  }, [t]), {
    onCellActivated: () => {
      e.current = !0;
    },
    onFinishedEditing: () => {
      e.current = !1;
    }
  };
}
function A3(t) {
  const e = { kind: "kit-button", ...t };
  return {
    kind: Be.Custom,
    allowOverlay: !1,
    readonly: !0,
    copyData: e.label,
    data: e
  };
}
function _3(t) {
  const e = { kind: "kit-badge", ...t };
  return {
    kind: Be.Custom,
    allowOverlay: !1,
    readonly: !0,
    copyData: e.label,
    cursor: "default",
    data: e
  };
}
function P3(t) {
  const e = { kind: "kit-field", ...t };
  return {
    kind: Be.Custom,
    allowOverlay: !0,
    readonly: !1,
    copyData: e.value || e.label,
    // Glide's per-cell activation switch: one click opens the overlay editor,
    // which is where the kit control mounts.
    activationBehaviorOverride: "single-click",
    data: e
  };
}
const dP = {
  neutral: { bg: "rgba(113, 113, 122, 0.16)", fg: "#52525b" },
  accent: { bg: "rgba(37, 99, 235, 0.14)", fg: "#1d4ed8" },
  success: { bg: "rgba(5, 150, 105, 0.14)", fg: "#047857" },
  warning: { bg: "rgba(217, 119, 6, 0.16)", fg: "#b45309" },
  danger: { bg: "rgba(220, 38, 38, 0.14)", fg: "#b91c1c" }
}, fP = {
  neutral: { bg: "rgba(161, 161, 170, 0.18)", fg: "#d4d4d8" },
  accent: { bg: "rgba(96, 165, 250, 0.2)", fg: "#bfdbfe" },
  success: { bg: "rgba(52, 211, 153, 0.2)", fg: "#a7f3d0" },
  warning: { bg: "rgba(251, 191, 36, 0.2)", fg: "#fde68a" },
  danger: { bg: "rgba(248, 113, 113, 0.2)", fg: "#fecaca" }
};
function nw(t) {
  const e = t.bgCell.replace("#", "");
  if (e.length !== 6) return t.textDark === "#ffffff";
  const n = parseInt(e, 16);
  return (0.2126 * (n >> 16 & 255) + 0.7152 * (n >> 8 & 255) + 0.0722 * (n & 255)) / 255 < 0.5;
}
function rw(t, e, n, r, i, o) {
  const s = Math.min(o, i / 2, r / 2);
  t.beginPath(), t.moveTo(e + s, n), t.lineTo(e + r - s, n), t.quadraticCurveTo(e + r, n, e + r, n + s), t.lineTo(e + r, n + i - s), t.quadraticCurveTo(e + r, n + i, e + r - s, n + i), t.lineTo(e + s, n + i), t.quadraticCurveTo(e, n + i, e, n + i - s), t.lineTo(e, n + s), t.quadraticCurveTo(e, n, e + s, n), t.closePath();
}
function hP(t, e, n, r, i, o) {
  t.save(), t.strokeStyle = o, t.lineWidth = Math.max(1.25, i / 10), t.lineCap = "round", t.lineJoin = "round";
  const s = i / 2, a = n + s, l = r + s;
  if (t.beginPath(), e === "plus")
    t.moveTo(n + i * 0.15, l), t.lineTo(n + i * 0.85, l), t.moveTo(a, r + i * 0.15), t.lineTo(a, r + i * 0.85);
  else if (e === "trash") {
    const c = r + i * 0.28;
    t.moveTo(n + i * 0.16, c), t.lineTo(n + i * 0.84, c), t.moveTo(n + i * 0.3, c), t.lineTo(n + i * 0.34, r + i * 0.14), t.lineTo(n + i * 0.66, r + i * 0.14), t.lineTo(n + i * 0.7, c), t.moveTo(n + i * 0.26, c), t.lineTo(n + i * 0.32, r + i * 0.86), t.lineTo(n + i * 0.68, r + i * 0.86), t.lineTo(n + i * 0.74, c);
  } else if (e === "chevron")
    t.moveTo(n + i * 0.35, r + i * 0.24), t.lineTo(n + i * 0.62, l), t.lineTo(n + i * 0.35, r + i * 0.76);
  else if (e === "search") {
    const c = i * 0.28;
    t.arc(a - i * 0.06, l - i * 0.06, c, 0, Math.PI * 2), t.moveTo(a + c * 0.45, l + c * 0.45), t.lineTo(n + i * 0.86, r + i * 0.86);
  } else
    t.moveTo(n + i * 0.18, l), t.lineTo(n + i * 0.42, r + i * 0.74), t.lineTo(n + i * 0.84, r + i * 0.28);
  t.stroke(), t.restore();
}
function iw(t, e, n, r) {
  const i = nw(n), o = r.variant ?? "subtle", a = Math.max(14, e.height - 4 * 2), l = e.y + (e.height - a) / 2, c = e.x + 4, u = e.width - 8;
  if (u <= 0) return;
  let d = null, f = null, h = n.textDark;
  o === "primary" ? (d = n.accentColor, h = n.accentFg) : o === "outline" ? f = n.borderColor : o === "danger" ? (h = i ? "#fca5a5" : "#b91c1c", f = i ? "rgba(248, 113, 113, 0.4)" : "rgba(220, 38, 38, 0.35)") : d = n.bgBubble, t.save(), t.globalAlpha = r.disabled ? 0.45 : 1, rw(t, c, l, u, a, 6), d && (t.fillStyle = d, t.fill()), r.hoverAmount > 0 && !r.disabled && (t.fillStyle = o === "primary" ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.06)", t.globalAlpha *= Math.min(1, r.hoverAmount), t.fill()), r.highlighted && !r.disabled && (t.strokeStyle = n.accentColor, t.globalAlpha = 0.55, t.lineWidth = 1.5, t.stroke(), t.globalAlpha = 1), f && (t.strokeStyle = f, t.lineWidth = 1, t.stroke());
  const p = Math.max(10, Math.min(12, a - 8));
  t.font = `600 ${p}px ${n.fontFamily}`, t.textBaseline = "middle";
  const g = Math.min(14, a - 6), y = 5, b = t.measureText(r.label).width + (r.icon ? g + y : 0);
  let C = c + Math.max(6, (u - b) / 2);
  const I = l + a / 2;
  r.icon && (hP(t, r.icon, C, I - g / 2, g, h), C += g + y), t.fillStyle = h, t.textAlign = "left", t.fillText(r.label, C, I), t.restore();
}
const pP = ({ value: t, onFinishedEditing: e }) => {
  const n = t == null ? void 0 : t.data, r = vr(), [i, o] = Xe((n == null ? void 0 : n.value) ?? "");
  if (!n) return null;
  const s = (l) => {
    var c;
    l !== void 0 && ((c = n.onSubmit) == null || c.call(n, l)), e(l === void 0 ? void 0 : t);
  }, a = {
    value: i,
    onChange: o,
    triggerLabel: n.label,
    placeholder: n.placeholder ?? (n.mode === "search" ? "Search…" : "Type…"),
    autoFocus: !0,
    theme: (r == null ? void 0 : r.mode) ?? "light",
    onCancel: () => s(void 0),
    cancelOnEscape: !0,
    cancelOnOutside: !0
  };
  return /* @__PURE__ */ A("div", { style: { width: "100%", height: "100%", display: "flex", alignItems: "center" }, children: n.mode === "search" ? /* @__PURE__ */ A(Nv, { ...a, onSubmit: (l) => s(l), expandedWidth: 260 }) : /* @__PURE__ */ A(K2, { ...a, variant: n.variant === "danger" ? "outline" : n.variant ?? "primary", triggerIcon: void 0, clearOnSubmit: !1, onSubmit: (l) => s(l) }) });
};
function ow(t, e) {
  return {
    kind: Be.Custom,
    isMatch: (n) => {
      var r;
      return ((r = n.data) == null ? void 0 : r.kind) === t;
    },
    draw: e,
    needsHover: !0
  };
}
const gP = {
  ...ow("kit-button", (t, e) => {
    iw(t.ctx, t.rect, t.theme, {
      label: e.data.label,
      icon: e.data.icon,
      variant: e.data.variant,
      disabled: e.data.disabled,
      hoverAmount: t.hoverAmount,
      highlighted: t.highlighted
    });
  }),
  onClick: ({ cell: t }) => {
    var e, n;
    t.data.disabled || (n = (e = t.data).onActivate) == null || n.call(e);
  }
}, mP = {
  kind: Be.Custom,
  isMatch: (t) => {
    var e;
    return ((e = t.data) == null ? void 0 : e.kind) === "kit-badge";
  },
  draw: ({ ctx: t, rect: e, theme: n }, r) => {
    const i = r.data.tone ?? "neutral", o = nw(n) ? fP[i] : dP[i], s = Math.max(10, Math.min(11, e.height - 10));
    t.save(), t.font = `600 ${s}px ${n.fontFamily}`;
    const a = t.measureText(r.data.label).width, c = Math.min(e.width - 8, a + 7 * 2), u = Math.min(e.height - 8, s + 8), d = e.x + (e.width - c) / 2, f = e.y + (e.height - u) / 2;
    rw(t, d, f, c, u, u / 2), t.fillStyle = o.bg, t.fill(), t.fillStyle = o.fg, t.textAlign = "center", t.textBaseline = "middle", t.fillText(r.data.label, e.x + e.width / 2, f + u / 2), t.restore();
  }
}, yP = {
  ...ow("kit-field", (t, e) => {
    iw(t.ctx, t.rect, t.theme, {
      label: e.data.value ? `${e.data.label}: ${e.data.value}` : e.data.label,
      icon: e.data.icon ?? (e.data.mode === "search" ? "search" : "plus"),
      variant: e.data.variant ?? (e.data.mode === "action" ? "primary" : "subtle"),
      hoverAmount: t.hoverAmount,
      highlighted: t.highlighted
    });
  }),
  provideEditor: () => ({ editor: pP, disablePadding: !0, styleOverride: { overflow: "visible" } })
}, bP = [
  gP,
  mP,
  yP
], Hy = bP, vP = 28, wP = 30, cf = { key: "actions", label: "", width: 34 }, uf = {
  columns: on.empty(),
  rows: on.empty()
}, df = /* @__PURE__ */ new Map();
let sw = "";
async function By(t) {
  sw = t;
  try {
    await navigator.clipboard.writeText(t);
  } catch {
    const e = document.createElement("textarea");
    e.value = t, e.style.position = "fixed", e.style.left = "-9999px", document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function xP() {
  try {
    const t = await navigator.clipboard.readText();
    if (t) return t;
  } catch {
  }
  return sw;
}
const il = /* @__PURE__ */ new Set();
typeof window < "u" && window.addEventListener("paste", (t) => {
  var r;
  if (il.size === 0) return;
  const e = t.target;
  if (e && (e.tagName === "INPUT" || e.tagName === "TEXTAREA" || e.isContentEditable)) return;
  const n = (r = t.clipboardData) == null ? void 0 : r.getData("text/plain");
  if (n) {
    t.preventDefault(), t.stopImmediatePropagation();
    for (const i of il) i(n);
  }
}, !0);
function kP(t) {
  Ye(() => (il.add(t), () => {
    il.delete(t);
  }), [t]);
}
function SP() {
  const t = G(null), [e, n] = Xe(0);
  return Ye(() => {
    const r = t.current;
    if (!r) return;
    const i = () => n((s) => s === r.getBoundingClientRect().width ? s : r.getBoundingClientRect().width);
    i();
    const o = new ResizeObserver(i);
    return o.observe(r), () => o.disconnect();
  }, []), { ref: t, width: e };
}
function qy(t) {
  if (typeof Image > "u") return null;
  const e = new Image();
  return e.src = "data:image/svg+xml;base64," + btoa(t), e;
}
const CP = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>', RP = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3f3f46" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>', D3 = ({
  columns: t,
  rows: e,
  getCellContent: n,
  onCommit: r,
  editableKeys: i,
  readOnly: o,
  emptyLabel: s,
  baseRowHeight: a = vP,
  baseHeaderHeight: l = wP,
  fontSize: c = 12,
  wrapHeaders: u,
  dataAttr: d,
  className: f = "",
  rowActions: h,
  editors: p,
  getEditor: g,
  customRenderers: y,
  onCellClick: m,
  selectionKey: b,
  themeOverrides: C,
  fillHandle: I = !0,
  disableClipboard: v,
  domCells: T
}) => {
  var vt;
  const D = G(e);
  D.current = e;
  const P = G(!!o);
  P.current = !!o;
  const S = vr(), { theme: z, cellColors: k } = tP(c, C), x = (S == null ? void 0 : S.mode) ?? "light", M = a, _ = l, { ref: E, width: O } = SP(), L = gn(() => {
    const he = h ? [...t, cf] : t, ge = he.filter((_e) => _e.key !== "actions"), Ce = h ? cf.width : 0, Re = ge.reduce((_e, Ue) => _e + Ue.width, 0);
    if (!O || O <= 0 || Re <= 0) return he;
    const Pe = Math.max(120, Math.floor(O) - 1) - Ce, lt = Math.min(1, ge.length - 1), ie = ge.map((_e) => Math.max(40, Math.floor(_e.width / Re * Pe)));
    if (lt >= 0) {
      const _e = ie.reduce((Ue, Mt) => Ue + Mt, 0);
      ie[lt] = Math.max(40, ie[lt] + (Pe - _e));
    }
    const de = ge.map((_e, Ue) => ({ ..._e, width: ie[Ue] }));
    return h && de.push(cf), de;
  }, [t, O, h]), W = gn(
    () => L.map((he) => ({ title: he.label.toUpperCase(), width: he.width })),
    [L]
  ), re = _ + Math.max(e.length, 1) * M;
  Ye(() => {
    if (!Z.current) return;
    const he = [];
    for (let Ce = 0; Ce < e.length; Ce++)
      for (let Re = 0; Re < L.length; Re++) he.push({ cell: [Re, Ce] });
    const ge = setTimeout(() => {
      var Ce;
      return (Ce = Z.current) == null ? void 0 : Ce.updateCells(he);
    }, 0);
    return () => clearTimeout(ge);
  }, [e, L]);
  const F = oo(), N = zs(), te = G(null), Y = G(null);
  Ye(() => {
    var lt;
    const he = N ?? (typeof document < "u" ? document : null);
    if (!he) return;
    const ge = !!((lt = te.current) != null && lt.closest('[role="dialog"]')), Ce = he.createElement("div");
    Ce.setAttribute("data-glide-overlay-layer", ""), Ce.style.cssText = ge ? "position:fixed;left:0;top:0;z-index:10001;pointer-events:auto;width:0;height:0" : "position:fixed;left:0;top:0;z-index:9999;width:0;height:0";
    const Re = (ie) => ie.stopPropagation();
    let Pe = null;
    return ge && (Ce.addEventListener("focusin", Re), Ce.addEventListener("focusout", Re), Pe = (ie) => {
      const de = ie.relatedTarget;
      de && Ce.contains(de) && ie.stopPropagation();
    }, he.addEventListener("focusout", Pe, !0)), he.body.appendChild(Ce), Y.current = Ce, () => {
      Pe && he.removeEventListener("focusout", Pe, !0), Ce.remove(), Y.current = null;
    };
  }, [F, N]);
  const j = G(null);
  j.current = {
    readOnlyRef: P,
    columns: L,
    getValue: (he, ge) => {
      var Ce;
      return String(((Ce = D.current[he]) == null ? void 0 : Ce[ge]) ?? "");
    },
    editors: p,
    getEditor: g,
    portalRef: Y,
    columnOffset: 0
  };
  const ee = gn(() => cP(() => j.current), []), H = uP(), Z = G(null), J = G(null), V = G(null);
  Ye(() => {
    h && (J.current = qy(CP), V.current = qy(RP));
  }, [h]);
  const [K, le] = Xe(() => (b ? df.get(b) : void 0) ?? uf);
  Ye(() => {
    le(b ? df.get(b) ?? uf : uf);
  }, [b]);
  const ue = G(K);
  ue.current = K;
  const [ke, we] = Xe(null), He = G(null), nt = gn(() => {
    const he = /* @__PURE__ */ new Map();
    for (const ge of T ?? []) {
      const Ce = L.findIndex((Re) => Re.key === ge.colKey);
      Ce >= 0 && he.set(`${Ce}:${ge.row}`, ge.node);
    }
    return he;
  }, [T, L]), bt = Le(
    (he, ge) => nt.get(`${he}:${ge}`) ?? null,
    [nt]
  ), gt = Le((he) => {
    var lt;
    const ge = he == null ? void 0 : he.location, Ce = (he == null ? void 0 : he.kind) === "cell" && ge && ge[1] >= 0 && ge[1] < D.current.length ? ge[1] : null;
    if (Ce === He.current) return;
    const Re = He.current;
    He.current = Ce;
    const Pe = [];
    if (Re != null) for (let ie = 0; ie < L.length; ie++) Pe.push({ cell: [ie, Re] });
    if (Ce != null) for (let ie = 0; ie < L.length; ie++) Pe.push({ cell: [ie, Ce] });
    Pe.length && ((lt = Z.current) == null || lt.updateCells(Pe));
  }, [L.length]), ne = Le(([he, ge]) => {
    const Ce = L[he], Re = D.current[ge];
    if (!Ce || !Re) return $y({ readonly: !0 });
    const Pe = ge === He.current;
    if (Ce.key === "actions") return $y({ hovered: Pe, hoverBg: k.readonlyHoverBg });
    const lt = n(Ce, Re, ge);
    if (P.current) return { ...lt, readonly: !0, allowOverlay: !1 };
    if (lt.kind === Be.Custom) return lt;
    const ie = !!lt.readonly, de = lt.themeOverride ?? {};
    if (!ie) {
      const _e = Pe ? k.editableHoverBg : k.editableBg;
      return { ...lt, themeOverride: { ...de, bgCell: _e, bgCellMedium: _e } };
    }
    return Pe ? { ...lt, themeOverride: { ...de, bgCell: k.readonlyHoverBg, bgCellMedium: k.readonlyHoverBg } } : lt;
  }, [L, n, k]), Ne = Le((he, ge) => {
    ge();
    const { ctx: Ce, rect: Re, column: Pe, columnIndex: lt, theme: ie } = he, de = L[lt];
    if (!de) return;
    const _e = (de.align ?? "left") === "center";
    if (!_e && !u) return;
    Ce.save(), Ce.fillStyle = ie.bgHeader, Ce.fillRect(Re.x + 1, Re.y, Re.width - 2, Re.height), Ce.fillStyle = ie.textHeader, Ce.textAlign = _e ? "center" : "left", Ce.textBaseline = "middle", Ce.beginPath(), Ce.rect(Re.x, Re.y, Re.width, Re.height), Ce.clip();
    const Ue = _e ? Re.x + Re.width / 2 : Re.x + 6, Mt = String(Pe.title);
    if (!u)
      Ce.fillText(Mt, Ue, Re.y + Re.height / 2);
    else {
      const Gt = [];
      let it = "";
      const Q = Re.width - 8;
      for (const Je of Mt.split(/\s+/)) {
        const ft = it ? `${it} ${Je}` : Je;
        if (Ce.measureText(ft).width <= Q) {
          it = ft;
          continue;
        }
        it && (Gt.push(it), it = "");
        let Dt = "";
        for (const ot of Je)
          Dt && Ce.measureText(Dt + ot).width > Q ? (Gt.push(Dt), Dt = ot) : Dt += ot;
        it = Dt;
      }
      it && Gt.push(it);
      const xe = Math.min(14, Re.height / Math.max(1, Gt.length)), Ie = Re.y + Re.height / 2 - (Gt.length - 1) * xe / 2;
      Gt.forEach((Je, ft) => Ce.fillText(Je, Ue, Ie + ft * xe));
    }
    Ce.restore();
  }, [L, u]), Ae = Le((he, ge) => {
    ge();
    const Ce = L[he.col];
    if (!Ce || Ce.key !== "actions" || !h || he.row >= D.current.length) return;
    const Re = h(he.row);
    if (!Re || Re.length === 0) return;
    const { ctx: Pe, rect: lt } = he, ie = lt.width / Re.length, de = Math.min(13, ie - 4, lt.height - 4);
    Re.forEach((_e, Ue) => {
      const Mt = _e.icon === "plus" ? V.current : J.current;
      if (!Mt || !Mt.complete) return;
      const Gt = lt.x + ie * Ue + ie / 2;
      Pe.drawImage(Mt, Gt - de / 2, lt.y + (lt.height - de) / 2, de, de);
    });
  }, [L, h]), Ke = Le((he, ge) => {
    var Ce, Re, Pe;
    if (h && ((Ce = L[he[0]]) == null ? void 0 : Ce.key) === "actions") {
      const lt = he[1];
      if (lt >= 0 && lt < D.current.length) {
        const ie = h(lt), de = ((Re = ge == null ? void 0 : ge.bounds) == null ? void 0 : Re.width) ?? 0, _e = de > 0 ? Math.min(ie.length - 1, Math.max(0, Math.floor((ge.localEventX ?? 0) / (de / ie.length)))) : 0;
        (Pe = ie[_e]) == null || Pe.onClick();
      }
    }
    m == null || m(he, ge);
  }, [L, h, m]), $e = Le((he) => {
    if (P.current) return;
    const ge = [];
    for (const Ce of he)
      i.has(Ce.colKey) && D.current[Ce.row] && ge.push({ row: Ce.row, colKey: Ce.colKey, value: Ce.val });
    ge.length > 0 && r(ge);
  }, [i, r]), Oe = Le(
    () => iP(ue.current, e.length, L.length),
    [e.length, L.length]
  ), et = Le((he) => {
    if (P.current) return !1;
    if (he.length === 1 && he[0].value.kind === Be.Text) {
      const ge = Oe();
      if (ge && ge.width * ge.height > 1) {
        const Ce = oP(ge, L, he[0].value.data);
        if (Ce.length > 1)
          return $e(Ce), !0;
      }
    }
    return $e(he.map((ge) => {
      var Ce;
      return {
        row: ge.location[1],
        colKey: ((Ce = L[ge.location[0]]) == null ? void 0 : Ce.key) ?? "",
        val: ge.value.kind === Be.Text ? ge.value.data : ge.value.kind === Be.Boolean ? String(ge.value.data) : ""
      };
    })), !0;
  }, [L, $e, Oe]), ht = Le((he, ge) => {
    var Re, Pe;
    if (P.current) return !1;
    const Ce = sP(
      [he[0], he[1]],
      ge,
      D.current.length,
      L,
      (Pe = (Re = ue.current) == null ? void 0 : Re.current) == null ? void 0 : Pe.range
    );
    return $e(Ce), !1;
  }, [L, $e]), Se = Le(async () => {
    const he = Oe();
    if (!he) return;
    const ge = nP(e, L, he);
    ge.length > 0 && await By(ge), we(null);
  }, [e, L, Oe]), Ze = Le(async () => {
    if (P.current) {
      we(null);
      return;
    }
    const he = Oe();
    if (!he) return;
    const { text: ge, committers: Ce } = rP(e, L, he);
    ge.length > 0 && (await By(ge), $e(Ce.map((Re) => ({ ...Re, val: "" })))), we(null);
  }, [e, L, $e, Oe]), Ct = Le(() => {
    if (P.current) {
      we(null);
      return;
    }
    const he = Oe();
    he && ($e(aP(he, L, i)), we(null));
  }, [L, i, $e, Oe]), wt = Le(() => {
    var Ce;
    const he = ue.current;
    let ge = (Ce = he.current) == null ? void 0 : Ce.cell;
    if (!ge && he.rows.length > 0) {
      for (let Re = 0; Re < D.current.length; Re++)
        if (he.rows.hasIndex(Re)) {
          ge = [0, Re];
          break;
        }
    }
    return ge ?? null;
  }, []), Ve = Le((he) => {
    if (P.current) return;
    const ge = wt();
    ge && ht(ge, lP(he));
  }, [wt, ht]), Et = Le(async () => {
    const he = await xP();
    he && Ve(he), we(null);
  }, [Ve]);
  kP(Le((he) => {
    v || Ve(he);
  }, [v, Ve]));
  const pt = G({ copy: () => {
  }, cut: () => {
  }, paste: () => {
  } });
  pt.current = { copy: Se, cut: Ze, paste: Et }, Ye(() => {
    if (v) return;
    const he = N ?? (typeof document < "u" ? document : null);
    if (!he) return;
    const ge = (Re) => Re instanceof HTMLElement ? Re.tagName === "INPUT" || Re.tagName === "TEXTAREA" || Re.isContentEditable : !1, Ce = (Re) => {
      if (!(Re.metaKey || Re.ctrlKey) || Re.shiftKey || Re.altKey) return;
      const Pe = Re.key.toLowerCase();
      if (Pe !== "c" && Pe !== "x" && Pe !== "v" || ge(Re.target)) return;
      Re.preventDefault(), Re.stopPropagation();
      const lt = pt.current;
      Pe === "c" ? lt.copy() : Pe === "x" ? lt.cut() : lt.paste();
    };
    return he.addEventListener("keydown", Ce, !0), () => he.removeEventListener("keydown", Ce, !0);
  }, [N, v]);
  const mt = Le((he, ge) => {
    var Pe, lt;
    ge.preventDefault();
    const [Ce, Re] = he;
    Re < 0 || Re >= D.current.length || we({
      x: (((Pe = ge.bounds) == null ? void 0 : Pe.x) ?? 0) + (ge.localEventX ?? 0),
      y: (((lt = ge.bounds) == null ? void 0 : lt.y) ?? 0) + (ge.localEventY ?? 0),
      row: Re,
      col: Ce
    });
  }, []), zt = ((vt = K.current) == null ? void 0 : vt.range) !== void 0 || K.rows.length > 0 || K.columns.length > 0, Bt = Le((he) => {
    le(he), b && df.set(b, he);
  }, [b]), nn = gn(
    () => y ? [...Hy, ...y] : Hy,
    [y]
  );
  return /* @__PURE__ */ pe(
    "div",
    {
      ref: te,
      className: `relative ${f}`,
      ...d ? { [d]: "" } : {},
      "data-glide-sheet": x,
      onPointerLeave: () => {
        var Ce;
        const he = He.current;
        if (he == null) return;
        He.current = null;
        const ge = [];
        for (let Re = 0; Re < L.length; Re++) ge.push({ cell: [Re, he] });
        (Ce = Z.current) == null || Ce.updateCells(ge);
      },
      children: [
        /* @__PURE__ */ A("div", { ref: E, style: { touchAction: "none" }, children: e.length === 0 && s ? /* @__PURE__ */ A("div", { className: "px-2.5 py-6 text-center text-xs text-[color:var(--ui-text-faint)]", children: s }) : O > 0 ? /* @__PURE__ */ A(
          J_,
          {
            ref: Z,
            getDomCell: T && T.length > 0 ? bt : void 0,
            width: Math.max(120, Math.floor(O) - 1),
            height: re,
            columns: W,
            rows: e.length,
            getCellContent: ne,
            onCellsEdited: et,
            onPaste: ht,
            provideEditor: ee,
            ...H,
            getCellsForSelection: !0,
            gridSelection: K,
            onGridSelectionChange: Bt,
            theme: z,
            rowHeight: M,
            headerHeight: _,
            drawHeader: Ne,
            drawCell: h ? Ae : void 0,
            onCellClicked: Ke,
            onItemHovered: gt,
            onCellContextMenu: mt,
            customRenderers: nn,
            editOnType: !0,
            rangeSelect: "rect",
            cellActivationBehavior: "double-click",
            fillHandle: I && !o,
            portalElementRef: Y,
            minColumnWidth: 1,
            maxColumnWidth: 1e4
          }
        ) : /* @__PURE__ */ A("div", { style: { height: re } }) }),
        /* @__PURE__ */ pe(
          Jx,
          {
            open: !!ke,
            x: (ke == null ? void 0 : ke.x) ?? 0,
            y: (ke == null ? void 0 : ke.y) ?? 0,
            onClose: () => we(null),
            theme: x,
            children: [
              /* @__PURE__ */ A(aa, { onClick: () => void Se(), icon: /* @__PURE__ */ A(Zw, { className: "w-3.5 h-3.5" }), disabled: !zt, children: "Copy" }),
              /* @__PURE__ */ A(aa, { onClick: () => void Et(), icon: /* @__PURE__ */ A(Qw, { className: "w-3.5 h-3.5" }), disabled: o || v, children: "Paste" }),
              /* @__PURE__ */ A(aa, { onClick: Ct, icon: /* @__PURE__ */ A(za, { className: "w-3.5 h-3.5 text-[color:var(--ui-text-faint)]" }), disabled: !zt || o, children: "Clear" }),
              /* @__PURE__ */ A(Zx, {}),
              /* @__PURE__ */ A(aa, { onClick: () => void Ze(), icon: /* @__PURE__ */ A(ex, { className: "w-3.5 h-3.5 text-[color:var(--ui-text-faint)]" }), disabled: !zt || o, children: "Cut" })
            ]
          }
        )
      ]
    }
  );
};
export {
  z2 as $,
  Cx as A,
  lr as B,
  AA as C,
  nb as D,
  ZP as E,
  L2 as F,
  D3 as G,
  Pi as H,
  Pn as I,
  zf as J,
  Hy as K,
  i3 as L,
  Of as M,
  Fs as N,
  mb as O,
  ek as P,
  e3 as Q,
  ca as R,
  K2 as S,
  NE as T,
  Nv as U,
  ub as V,
  R3 as W,
  rR as X,
  Sx as Y,
  S3 as Z,
  c3 as _,
  _o as a,
  Ax as a$,
  q2 as a0,
  X2 as a1,
  y3 as a2,
  m3 as a3,
  Fa as a4,
  cb as a5,
  fb as a6,
  w3 as a7,
  jf as a8,
  JP as a9,
  Mx as aA,
  Me as aB,
  zx as aC,
  cP as aD,
  eP as aE,
  iP as aF,
  k3 as aG,
  oP as aH,
  Fp as aI,
  Vy as aJ,
  cl as aK,
  GP as aL,
  UP as aM,
  Z_ as aN,
  ap as aO,
  eR as aP,
  Ha as aQ,
  ck as aR,
  M3 as aS,
  ff as aT,
  _3 as aU,
  A3 as aV,
  bP as aW,
  P3 as aX,
  J2 as aY,
  G2 as aZ,
  sb as a_,
  wk as aa,
  ua as ab,
  xk as ac,
  Sb as ad,
  kk as ae,
  g3 as af,
  Ck as ag,
  d3 as ah,
  Sk as ai,
  f3 as aj,
  p3 as ak,
  h3 as al,
  db as am,
  XP as an,
  VP as ao,
  M2 as ap,
  E2 as aq,
  da as ar,
  Co as as,
  Lf as at,
  $y as au,
  nP as av,
  rP as aw,
  Y2 as ax,
  Px as ay,
  ih as az,
  FR as b,
  eb as b0,
  Pv as b1,
  Mr as b2,
  jl as b3,
  lP as b4,
  U2 as b5,
  Q2 as b6,
  Zi as b7,
  zv as b8,
  V2 as b9,
  _i as bA,
  zs as bB,
  Ls as bC,
  t3 as bD,
  rb as bE,
  hb as bF,
  uP as bG,
  tP as bH,
  YP as bI,
  xb as bJ,
  Wf as bK,
  vr as bL,
  Rx as bM,
  r3 as bN,
  Kf as bO,
  Ux as bP,
  ll as bQ,
  Nf as bR,
  oo as bS,
  ab as bT,
  lb as bU,
  Lx as bV,
  vk as bW,
  o3 as bX,
  aP as ba,
  sP as bb,
  Ex as bc,
  Tx as bd,
  zp as be,
  Q_ as bf,
  sh as bg,
  Z2 as bh,
  fi as bi,
  Gi as bj,
  C2 as bk,
  W2 as bl,
  Ov as bm,
  E3 as bn,
  _x as bo,
  jP as bp,
  sp as bq,
  I3 as br,
  B2 as bs,
  x3 as bt,
  R2 as bu,
  tw as bv,
  Ox as bw,
  tR as bx,
  KP as by,
  mn as bz,
  T3 as c,
  Hf as d,
  $x as e,
  l3 as f,
  v3 as g,
  b3 as h,
  To as i,
  Jx as j,
  Zx as k,
  aa as l,
  DE as m,
  QP as n,
  a3 as o,
  n3 as p,
  Xx as q,
  dl as r,
  wr as s,
  Vx as t,
  Bf as u,
  u3 as v,
  s3 as w,
  F2 as x,
  C3 as y,
  Be as z
};
