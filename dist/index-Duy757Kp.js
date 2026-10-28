"use client";
var Dw = Object.defineProperty;
var Nw = (t, e, n) => e in t ? Dw(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var Qe = (t, e, n) => Nw(t, typeof e != "symbol" ? e + "" : e, n);
import { jsx as A, jsxs as fe, Fragment as Dn } from "react/jsx-runtime";
import * as w from "react";
import _t, { createContext as ti, useContext as ni, useState as Xe, useEffect as Ye, useRef as Y, useCallback as Ne, useLayoutEffect as Nn, useMemo as gn, useId as Ow, useImperativeHandle as By, forwardRef as np, createElement as rp } from "react";
import * as pn from "@radix-ui/react-dropdown-menu";
import { Minus as zw, Check as zs, Search as Io, X as eo, Pencil as Lw, CopyPlus as qy, Trash2 as za, RotateCcw as Wy, Plus as ol, ChevronRight as La, ChevronLeft as $w, ArrowUp as Fw, ArrowDown as Hw, ChevronDown as ci, Underline as Bw, Strikethrough as qw, RemoveFormatting as Ww, Link as jw, ChevronUp as Kw, Anchor as Uw, Copy as Gw, ClipboardPaste as Yw, Scissors as Xw } from "lucide-react";
import { computePosition as Vw, offset as jy, flip as Ky, shift as Uy, size as Jw, useFloating as Zw, autoUpdate as Qw } from "@floating-ui/react-dom";
import * as Si from "@radix-ui/react-dialog";
import { createPortal as sl } from "react-dom";
import { mergeAttributes as ex, ReactNodeViewRenderer as tx, NodeViewWrapper as nx, useEditor as rx, EditorContent as ix } from "@tiptap/react";
import { PluginKey as Kr, Plugin as pi, Selection as No, TextSelection as Ar, NodeSelection as $o, AllSelection as ox } from "@tiptap/pm/state";
import { DecorationSet as sa, Decoration as sx } from "@tiptap/pm/view";
import ax from "@tiptap/starter-kit";
import lx from "@tiptap/extension-placeholder";
import { TextStyle as cx, FontFamily as ux, FontSize as dx } from "@tiptap/extension-text-style";
import fx from "@tiptap/extension-color";
import hx from "@tiptap/extension-link";
import px from "@tiptap/extension-underline";
import gx from "@tiptap/suggestion";
import { Mention as mx } from "@tiptap/extension-mention";
import { createRoot as yx } from "react-dom/client";
const bx = ti(null);
function Df() {
  return ni(bx);
}
function oo() {
  const t = Df();
  return t ? t.document.body : null;
}
function Ls() {
  const t = Df();
  return t ? t.document : typeof document < "u" ? document : null;
}
function $s() {
  return Df() ?? (typeof window < "u" ? window : null);
}
const Fs = typeof window < "u", Pn = Fs && window.matchMedia("(pointer: coarse)").matches, vx = Fs && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
let al = 0.5;
const Ts = /* @__PURE__ */ new Set();
function HP(t) {
  al = Math.max(0, Math.min(1, t)), Ts.forEach((e) => e());
}
function Gy() {
  return al;
}
function BP() {
  const [, t] = Xe(0);
  return Ye(() => {
    const e = () => t((n) => n + 1);
    return Ts.add(e), () => {
      Ts.delete(e);
    };
  }, []), Pn && al > 0;
}
function mn() {
  const [, t] = Xe(0);
  return Ye(() => {
    const e = () => t((n) => n + 1);
    return Ts.add(e), () => {
      Ts.delete(e);
    };
  }, []), al;
}
function Ie(t, e, n) {
  return Pn ? Math.round(t + (e - t) * n) : t;
}
function _i(t, e) {
  const n = mn();
  return Pn && n > 0 ? {
    padding: `${Ie(t.py, e.py, n)}px ${Ie(t.px, e.px, n)}px`,
    fontSize: `${Ie(t.fs, e.fs, n)}px`
  } : { padding: `${t.py}px ${t.px}px`, fontSize: `${t.fs}px` };
}
function Yy() {
  const t = mn(), e = Pn && t > 0;
  return {
    box: e ? Ie(28, 36, t) : 20,
    icon: e ? Ie(16, 20, t) : 14
  };
}
function df(t) {
  return t === "touch" || t === "pen";
}
let Ao = null;
const ff = /* @__PURE__ */ new Set();
Fs && window.addEventListener("pointerdown", (t) => {
  Ao = t.pointerType, ff.forEach((e) => e());
}, !0);
function qP() {
  return Ao;
}
function wx() {
  const [, t] = Xe(0), e = Y(Ao);
  return Ye(() => {
    const n = () => {
      e.current !== Ao && (e.current = Ao, t((r) => r + 1));
    };
    return ff.add(n), () => {
      ff.delete(n);
    };
  }, []), Ao;
}
const Xy = ["(any-hover: hover)", "(any-pointer: fine)"];
function Vy() {
  return Fs ? Xy.some((t) => window.matchMedia(t).matches) : !1;
}
let $a = Vy();
const hf = /* @__PURE__ */ new Set();
function ip(t) {
  $a !== t && ($a = t, hf.forEach((e) => e()));
}
var Hy;
if (Fs) {
  const t = () => ip(Vy());
  for (const s of Xy) {
    const a = window.matchMedia(s);
    (Hy = a.addEventListener) == null || Hy.call(a, "change", t);
  }
  window.addEventListener("focus", t), document.addEventListener("visibilitychange", t);
  const e = window.setInterval(() => {
    document.visibilityState === "visible" && t();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(e)), window.addEventListener("keydown", (s) => {
    s.isComposing || s.keyCode !== 229 && (s.key === "Enter" || s.key === "Backspace" || s.key === "Process" || s.key === "Unidentified" || ip(!0));
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
function WP() {
  return $a;
}
function jP() {
  const [, t] = Xe(0);
  return Ye(() => {
    const e = () => t((n) => n + 1);
    return hf.add(e), () => {
      hf.delete(e);
    };
  }, []), $a;
}
const Pi = 220, Nf = "cubic-bezier(0.32, 0.72, 0, 1)", Of = 170, zf = 0.94;
function jl(t) {
  return t === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Jy(t, e) {
  const n = e.left + e.width / 2, r = e.top + e.height / 2;
  return {
    x: n < t.left ? 0 : n > t.left + t.width ? 1 : 0.5,
    y: r < t.top ? 0 : r > t.top + t.height ? 1 : 0.5
  };
}
function Zy(t, e) {
  const n = (e == null ? void 0 : e()) ?? null;
  if (!n) return { x: 0.5, y: 0.5 };
  const r = t.getBoundingClientRect();
  return Jy({ left: r.left, top: r.top, width: r.width, height: r.height }, n);
}
function xx(t, e, n, r) {
  const i = ++t.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity };
  e.style.transition = "none", e.style.transformOrigin = "50% 50%", e.style.transform = `scale(${zf})`, e.style.opacity = "0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    t.current === i && requestAnimationFrame(() => {
      if (t.current !== i) return;
      const s = Zy(e, n);
      e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transition = `transform ${Pi}ms ${Nf}, opacity ${Of}ms ease`, e.style.transform = "none", e.style.opacity = "", window.setTimeout(() => {
        t.current === i && (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, r == null || r());
      }, Pi + 60);
    });
  });
}
function kx(t, e, n, r) {
  const i = ++t.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity, pointerEvents: e.style.pointerEvents, visibility: e.style.visibility }, s = Zy(e, n);
  e.style.transition = `transform ${Pi}ms ${Nf}, opacity ${Of}ms ease`, e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transform = `scale(${zf})`, e.style.opacity = "0", e.style.pointerEvents = "none", window.setTimeout(() => {
    t.current === i && (e.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      t.current !== i || e.isConnected || (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, e.style.pointerEvents = o.pointerEvents, e.style.visibility = o.visibility);
    }));
  }, Pi + 60);
}
function Sx(t, e, n) {
  const r = t.cloneNode(!0), i = t.getBoundingClientRect(), o = i.width > 0 || i.height > 0 ? i : n ?? i;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${o.left}px`, r.style.top = `${o.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const s = (e == null ? void 0 : e()) ?? null, a = s ? Jy({ left: o.left, top: o.top, width: o.width, height: o.height }, s) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${a.x * 100}% ${a.y * 100}%`, t.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${Pi}ms ${Nf}, opacity ${Of}ms ease`, r.style.transform = `scale(${zf})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, Pi + 60));
    });
  });
}
function ll(t) {
  const e = Y(null), [n, r] = Xe(!1), i = Y(null), o = Y(0), s = Ne((p) => {
    if (t.ref && (t.ref.current = p), p) {
      o.current = 0, e.current = p;
      const m = p.getBoundingClientRect();
      (m.width > 0 || m.height > 0) && (i.current = { left: m.left, top: m.top, width: m.width, height: m.height }), r(!0);
      return;
    }
    const g = e.current, y = ++o.current;
    queueMicrotask(() => {
      y === o.current && e.current === g && (e.current = null, r(!1), !(!g || !t.cloneOnUnmount || !l.current) && g.style.visibility !== "hidden" && jl(f.current) && Sx(g, u.current, i.current));
    });
  }, []), a = Ne(() => {
    const p = e.current;
    if (!p || getComputedStyle(p).transform !== "none") return;
    const g = p.getBoundingClientRect();
    (g.width > 0 || g.height > 0) && (i.current = { left: g.left, top: g.top, width: g.width, height: g.height });
  }, []), l = Y(t.visible);
  l.current = t.visible;
  const c = Y(t.visible), u = Y(t.anchor ?? null);
  u.current = t.anchor ?? null;
  const d = Y(t.onClosed);
  d.current = t.onClosed;
  const f = Y(t.morph !== !1);
  f.current = t.morph !== !1;
  const h = Y(0);
  return Nn(() => {
    if (!n || !l.current || !jl(f.current)) return;
    const p = e.current;
    p && xx(h, p, u.current);
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
    kx(h, g, u.current, () => {
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
const Qy = 384;
function Cx(t) {
  const e = t.visualViewport;
  return e ? { x: e.offsetLeft, y: e.offsetTop, width: e.width, height: e.height } : { x: 0, y: 0, width: t.innerWidth, height: t.innerHeight };
}
function eb({
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
  const u = $s(), d = Y(u);
  d.current = u;
  const f = Y(c);
  f.current = c, Nn(() => {
    if (!n) return;
    let h = 0, p = !1;
    const g = () => {
      h || (h = requestAnimationFrame(y));
    }, y = () => {
      if (h = 0, p) return;
      const T = d.current, D = t.current, P = e.current;
      if (!T || !D || !P || !P.isConnected) return;
      const k = (r == null ? void 0 : r.current) ?? P, z = Cx(T), S = a ?? Qy, x = Math.min(l, S), I = Math.max(0, P.offsetHeight - k.offsetHeight), _ = Math.max(x, Math.ceil(k.scrollHeight + I)), M = Math.min(_, S);
      P.style.maxHeight = `${M}px`;
      let O = M;
      const L = i == null ? void 0 : i.current;
      Vw(L ? {
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
          jy(o),
          Ky({ boundary: z, padding: s, fallbackStrategy: "bestFit" }),
          Uy({ boundary: z, padding: s, mainAxis: !1 }),
          Jw({
            boundary: z,
            padding: s,
            apply({ availableHeight: re }) {
              O = Math.max(x, Math.floor(Math.min(S, re))), P.style.maxHeight = `${O}px`;
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
    const m = d.current, b = (m == null ? void 0 : m.document) ?? null, C = (m == null ? void 0 : m.visualViewport) ?? null, E = () => g();
    C == null || C.addEventListener("resize", E), C == null || C.addEventListener("scroll", E), m == null || m.addEventListener("resize", E), b == null || b.addEventListener("scroll", E, { capture: !0, passive: !0 });
    let v = null;
    return typeof ResizeObserver < "u" && (v = new ResizeObserver(E), e.current && v.observe(e.current), r != null && r.current && v.observe(r.current)), () => {
      p = !0, h && cancelAnimationFrame(h), C == null || C.removeEventListener("resize", E), C == null || C.removeEventListener("scroll", E), m == null || m.removeEventListener("resize", E), b == null || b.removeEventListener("scroll", E, { capture: !0 }), v == null || v.disconnect();
    };
  }, [n, t, e, r, i, o, s, a, l]);
}
let ko = null;
function tb(t) {
  return ko == null || ko(), ko = t, () => {
    ko === t && (ko = null);
  };
}
const nb = ti(null);
function Lf(t, e) {
  const n = t.mode ?? (e == null ? void 0 : e.mode) ?? "dark", r = t.surface ?? (e == null ? void 0 : e.surface) ?? "neutral", i = t.context ?? (e == null ? void 0 : e.context) ?? "surface", o = t.accent ?? (e == null ? void 0 : e.accent) ?? "zinc", s = t.accent !== void 0 && t.surface === void 0 && t.context === void 0;
  return { mode: n, accent: i === "chrome" || r === "accent" || s ? o : "zinc", surface: r, context: i };
}
function $f({ theme: t, children: e }) {
  return /* @__PURE__ */ A(nb.Provider, { value: t, children: e });
}
function KP({ mode: t, accent: e, surface: n, context: r, children: i }) {
  const o = vr();
  return /* @__PURE__ */ A($f, { theme: Lf({ mode: t, accent: e, surface: n, context: r }, o), children: i });
}
function UP({ mode: t, accent: e, surface: n, context: r, children: i, className: o, style: s }) {
  const a = vr(), l = Lf({ mode: t, accent: e, surface: n, context: r }, a);
  return /* @__PURE__ */ A($f, { theme: l, children: /* @__PURE__ */ A(
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
  return ni(nb);
}
function Rx(t, e = "dark") {
  return t ? t.context === "surface" ? t.mode : t.mode === "light" ? "light" : t.accent === "emerald" ? "emerald" : t.accent === "blue" ? "blue" : "dark" : e;
}
function rb(t, e) {
  if (t)
    return (t === "light" || t === "dark") && e ? {
      theme: t,
      attrs: { "data-theme": t, "data-mode": t, "data-accent": e.accent }
    } : { theme: t, attrs: { "data-theme": t } };
  if (!e) return { theme: "dark", attrs: { "data-theme": "dark" } };
  if (e.context === "chrome") {
    const n = Rx(e);
    return { theme: n, attrs: { "data-theme": n } };
  }
  return { theme: e.mode, attrs: { "data-mode": e.mode, "data-accent": e.accent } };
}
function Tx(t, e = "light") {
  return (t == null ? void 0 : t.mode) ?? e;
}
function Ex(t) {
  return !t || t.context !== "chrome" && t.surface !== "accent" ? !1 : t.accent === "emerald" ? "emerald" : t.accent === "blue";
}
function Mx(t) {
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
function hi(t, e = "nearest", n) {
  if (!t) return;
  const r = n ?? Mx(t);
  if (!r || !r.contains(t)) return;
  const i = t.getBoundingClientRect(), o = r.getBoundingClientRect();
  if (e === "center") {
    r.scrollTop += i.top + i.height / 2 - (o.top + o.height / 2);
    return;
  }
  const s = getComputedStyle(t), a = parseFloat(s.scrollMarginBlockStart || s.scrollMarginTop || "0") || 0, l = parseFloat(s.scrollMarginBlockEnd || s.scrollMarginBottom || "0") || 0;
  i.top - a < o.top ? r.scrollTop -= o.top - (i.top - a) : i.bottom + l > o.bottom && (r.scrollTop += i.bottom + l - o.bottom);
}
function ib({
  open: t,
  row: e,
  block: n = "nearest",
  scroller: r,
  ready: i
}) {
  const o = Y(!1), s = Y(!1), a = Y(!1), l = Y({ row: e, scroller: r, block: n });
  l.current = { row: e, scroller: r, block: n };
  const c = Ne(() => {
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
    h && (hi(h, f, (d == null ? void 0 : d()) ?? null), a.current = !0);
  }, [t]), Ye(() => {
    if (!t || i !== !0 || !a.current) return;
    const u = requestAnimationFrame(() => {
      if (!a.current || (a.current = !1, o.current)) return;
      const { row: d, scroller: f } = l.current;
      hi(d(), "nearest", (f == null ? void 0 : f()) ?? null);
    });
    return () => cancelAnimationFrame(u);
  }, [t, i]), { engagedRef: o, engage: c };
}
const Ix = [];
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
function Ax(t, e, n, r = {}) {
  var o;
  const i = Mr(t, n);
  return (o = r.disabledIds) != null && o.includes(e) ? i : i.includes(e) ? i.filter((s) => s !== e) : r.max !== void 0 && i.length >= r.max ? i : Mr([...i, e], n);
}
function op(t, e, n, r, i = {}) {
  const o = Mr(t, r), s = new Set(e);
  if (!n) return o.filter((d) => !s.has(d));
  const a = new Set(r), l = new Set(i.disabledIds ?? []), c = i.max === void 0 ? 1 / 0 : Math.max(0, i.max - o.length), u = Mr([...s], r).filter((d) => a.has(d) && !o.includes(d) && !l.has(d)).slice(0, c);
  return u.length === 0 ? o : Mr([...o, ...u], r);
}
function sp(t, e) {
  if (e.length === 0) return "none";
  const n = new Set(t), r = e.reduce((i, o) => i + (n.has(o) ? 1 : 0), 0);
  return r === 0 ? "none" : r === e.length ? "all" : "some";
}
function _x(t, e, n) {
  if (!n) return 0;
  const r = new Set(e), i = new Set(n);
  return t.reduce((o, s) => o + (r.has(s) && !i.has(s) ? 1 : 0), 0);
}
function ob(t) {
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
  } = t, [f, h] = Xe(() => Mr(n, r)), p = gn(() => new Set(s ?? []), [s]), g = gn(() => new Set(f), [f]), y = o !== void 0 && f.length >= o, m = !Gi(f, n), b = Ne((z) => {
    if (p.has(z)) return;
    const S = g.has(z), x = Ax(f, z, r, { max: o, disabledIds: s });
    Gi(x, f) || (h(x), d == null || d(x), u == null || u(z, !S));
  }, [f, g, p, r, o, s, u, d]), C = Ne((z) => {
    const S = z.filter((_) => !p.has(_)), x = sp(f, S), I = op(f, S, x !== "all", r, { max: o, disabledIds: s });
    Gi(I, f) || (h(I), d == null || d(I));
  }, [f, p, r, o, s, d]), E = Ne((z, S = i ?? r) => {
    const x = op(f, S, z, r, { max: o, disabledIds: s });
    Gi(x, f) || (h(x), d == null || d(x));
  }, [f, i, r, o, s, d]), v = Ne(() => {
    f.length !== 0 && (h([]), d == null || d([]));
  }, [f, d]), T = Ne((z) => {
    h(Mr(z ?? n, r));
  }, [n, r]), D = Ne(() => !c || Gi(f, n) ? !1 : (c(Mr(f, r)), !0), [c, f, n, r]), P = Ne(() => !l || Gi(f, n) ? !1 : (l(Mr(f, r)), !0), [l, f, n, r]), k = Ne((z) => sp(f, z), [f]);
  return {
    mode: e,
    indicator: a,
    draft: f,
    count: f.length,
    max: o,
    atMax: y,
    dirty: m,
    hiddenCount: _x(f, r, i),
    isSelected: (z) => g.has(z),
    isDisabled: (z) => p.has(z),
    canToggle: (z) => !p.has(z) && (g.has(z) || !y),
    toggle: b,
    toggleGroup: C,
    setAll: E,
    clear: v,
    reset: T,
    commit: D,
    flush: P,
    cancel: T,
    groupState: k
  };
}
const sb = ti(null), Px = () => ni(sb), ab = Ix;
function Ff({ checked: t, size: e, tone: n = "accent", indeterminate: r = !1 }) {
  return /* @__PURE__ */ A(
    "span",
    {
      className: `ui-check-indicator ${t || r ? "ui-check-indicator-checked" : ""} ${n === "danger" ? "ui-check-tone-danger" : ""}`,
      "aria-hidden": !0,
      children: r ? /* @__PURE__ */ fe("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: [
        /* @__PURE__ */ A("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor", stroke: "var(--ui-check-ring)", strokeWidth: 1 }),
        /* @__PURE__ */ A("path", { d: "M4.5 8 H11.5", stroke: "var(--ui-check-check)", strokeWidth: 2, strokeLinecap: "round", fill: "none" })
      ] }) : t ? /* @__PURE__ */ fe("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: [
        /* @__PURE__ */ A("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor", stroke: "var(--ui-check-ring)", strokeWidth: 1 }),
        /* @__PURE__ */ A("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "var(--ui-check-check)", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" })
      ] }) : /* @__PURE__ */ A("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: /* @__PURE__ */ A("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) })
    }
  );
}
function Dx({ checked: t, onChange: e, disabled: n = !1, label: r, id: i, className: o = "", labelClassName: s = "", theme: a, variant: l = "pill", tone: c = "accent", block: u = !1 }) {
  const d = l !== "plain", f = mn(), h = Ie(16, 20, f), p = Ie(12, 14, f), g = Ie(12, 14, f), y = Ie(12, 16, f), m = Ie(10, 12, f), b = Ie(8, 10, f);
  return /* @__PURE__ */ fe(
    "label",
    {
      className: `ui-press ui-checkbox ${d ? "ui-checkbox-pill rounded-lg" : ""} ${c === "danger" ? "ui-checkbox-tone-danger" : ""} ${n ? "ui-disabled" : ""} ${o}`,
      style: { display: u ? "flex" : "inline-flex", alignItems: "center", gap: b, padding: d ? `${m}px ${y}px` : void 0 },
      onClick: (E) => E.stopPropagation(),
      ...a ? { "data-theme": a } : {},
      children: [
        /* @__PURE__ */ A(
          "input",
          {
            type: "checkbox",
            id: i,
            checked: t,
            disabled: n,
            onChange: (E) => e(E.target.checked),
            className: "sr-only"
          }
        ),
        d ? /* @__PURE__ */ A(Ff, { checked: t, size: h, tone: c }) : /* @__PURE__ */ A("span", { className: "ui-checkbox-box", style: { width: h, height: h }, "aria-hidden": !0, children: t && /* @__PURE__ */ A("svg", { viewBox: "0 0 12 12", fill: "none", style: { width: p, height: p }, "aria-hidden": !0, children: /* @__PURE__ */ A("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ A("span", { className: `ui-checkbox-label ${s}`, style: { fontSize: g }, children: r })
      ]
    }
  );
}
const ap = "transition-[grid-template-columns] ease-out duration-150 group-hover:duration-200 motion-reduce:transition-none", Nx = "group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] group-data-[state=open]:grid-cols-[1fr]", Ox = "group-hover:grid-cols-[0fr] group-focus-visible:grid-cols-[0fr] group-data-[state=open]:grid-cols-[0fr]", zx = "group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[state=open]:opacity-100";
function Lx(t) {
  if (!_t.isValidElement(t)) return String(t ?? "");
  const e = t.type, n = typeof e == "string" ? e : e.displayName || e.name || "icon", r = t.props;
  return `${n}|${r.className ?? ""}|${r.size ?? ""}`;
}
function lb({ icon: t, collapse: e = !1, iconWithLabel: n = !0, active: r = !1, gap: i = 6, reserve: o, roll: s = "up", children: a }) {
  const l = !!e && !!t, c = l && !n, u = !!t && (n || l), d = Lx(t), [f, h] = Xe({ sig: d, node: t }), [p, g] = Xe(null);
  d !== f.sig && (h({ sig: d, node: t }), g(f.node)), Ye(() => {
    if (p == null) return;
    const m = window.setTimeout(() => g(null), 200);
    return () => window.clearTimeout(m);
  }, [p]);
  const y = p == null ? t : /* @__PURE__ */ fe("span", { className: "relative inline-flex items-center justify-center overflow-hidden", children: [
    /* @__PURE__ */ A("span", { "aria-hidden": !0, className: `ui-icon-roll-out${s === "down" ? "-down" : ""} absolute inset-0 inline-flex items-center justify-center`, children: p }, `out:${f.sig}`),
    /* @__PURE__ */ A("span", { className: `ui-icon-roll-in${s === "down" ? "-down" : ""} inline-flex items-center justify-center`, children: t }, `in:${d}`)
  ] });
  return l ? /* @__PURE__ */ fe(Dn, { children: [
    u && (c ? /* @__PURE__ */ A("span", { "data-kit-icon": !0, className: `grid min-w-0 ${ap} ${r ? "grid-cols-[0fr]" : `grid-cols-[1fr] ${Ox}`}`, children: /* @__PURE__ */ A("span", { className: "inline-flex min-w-0 items-center overflow-hidden", children: y }) }) : /* @__PURE__ */ A("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: y })),
    /* @__PURE__ */ A("span", { "data-kit-label": !0, className: `grid min-w-0 ${ap} ${r ? "grid-cols-[1fr]" : `grid-cols-[0fr] ${Nx}`}`, children: /* @__PURE__ */ A("span", { className: "min-w-0 overflow-hidden", children: /* @__PURE__ */ A(
      "span",
      {
        className: `flex min-w-0 items-center whitespace-nowrap transition-[opacity,padding-left] duration-100 group-hover:duration-150 motion-reduce:transition-none ${r ? "opacity-100" : `opacity-0 ${zx}`} ${c ? `pl-[var(--kit-collapse-gap)] group-hover:pl-0! group-focus-visible:pl-0! group-data-[state=open]:pl-0! ${r ? "pl-0!" : ""}` : ""}`,
        style: c ? { "--kit-collapse-gap": `${i}px` } : { paddingLeft: i },
        children: o ? /* @__PURE__ */ fe("span", { className: "inline-grid min-w-0", children: [
          /* @__PURE__ */ A("span", { "aria-hidden": !0, className: "invisible col-start-1 row-start-1 whitespace-nowrap", children: o }),
          /* @__PURE__ */ A("span", { className: "col-start-1 row-start-1", children: a })
        ] }) : a
      }
    ) }) })
  ] }) : /* @__PURE__ */ fe(Dn, { children: [
    u && /* @__PURE__ */ A("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: t }),
    a
  ] });
}
const GP = {
  light: { plain: "bg-zinc-950", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" },
  dark: { plain: "bg-white", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" }
};
function cr({
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
  const b = vr(), C = e ?? (b == null ? void 0 : b.mode) ?? "light", E = n ?? Ex(b), v = _i({ px: 10, py: 6, fs: 12 }, { px: 14, py: 9, fs: 14 }), T = _i({ px: 12, py: 6, fs: 12 }, { px: 16, py: 9, fs: 14 }), D = _i({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), P = "", k = "", z = `${a ? "ui-reveal " : ""}ui-press inline-flex items-center font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed`, S = "rounded", x = "rounded-[var(--ui-radius-btn)]", I = {
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
  }, M = {
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
      primary: { base: `${k} bg-zinc-900 hover:bg-zinc-800 text-white`, open: "bg-zinc-800!" },
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
      primary: { base: `${k} bg-zinc-800 hover:bg-zinc-700 text-white`, open: "bg-zinc-700!" },
      outline: {
        base: `${P} text-zinc-300 shadow-[inset_0_0_0_1px_var(--ui-border-strong)] hover:bg-[var(--ui-btn-hover-bg)] hover:text-zinc-100`,
        open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-100"
      },
      "danger-ghost": { base: `${P} text-red-400 hover:bg-rose-950/40`, open: "bg-rose-950/40!" }
    }
  }, W = {
    blue: { base: `${k} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" },
    emerald: { base: `${k} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" }
  }, re = m["data-state"] === "open", F = L[C][t], N = t === "primary" ? T : t.startsWith("tab") ? D : v, te = Pn ? { padding: "8px 12px", fontSize: "14px", lineHeight: "20px", border: "1px solid transparent" } : { padding: "6px 8px", fontSize: "12px", lineHeight: "16px", border: "1px solid transparent" }, G = Ie(6, 8, mn()), j = Ie(28, 40, mn()), ee = E === "emerald" ? "emerald" : E ? "blue" : null, q = "bg-[var(--ui-btn-active-bg)]! text-[color:var(--ui-btn-active-text)]!", Q = {
    info: "bg-blue-600! hover:bg-blue-500! text-white!",
    success: "bg-emerald-600! hover:bg-emerald-500! text-white!",
    warning: "bg-amber-500! hover:bg-amber-400! text-zinc-950!",
    danger: "bg-rose-600! hover:bg-rose-500! text-white!"
  };
  let X;
  if (t === "tab") {
    const se = I[C];
    X = `${S} ${r ? ee ? _[ee].active : se.active : ee ? _[ee][C === "light" ? "inactiveLight" : "inactiveDark"] : se.inactive}`;
  } else if (t === "tab-header") {
    const se = ee ? r ? O[ee].active : O[ee].inactive : r ? M.active : M.inactive;
    X = `${S} ${se} ${re ? ee ? O[ee].open : M.open : ""}`;
  } else {
    if (X = `${x} ${F.base} ${re ? F.open : ""}`, t === "primary" && ee) {
      const se = W[ee];
      X = `${x} ${re ? `${se.base} ${se.open}` : se.base}`;
    }
    r && (X = `${X} ${i === "neutral" ? q : Q[i]}`);
  }
  const J = !!f && !!d && !o, K = o ? { width: j, height: j, padding: 0, gap: 0 } : s === "minimal" ? { ...te, gap: J ? 0 : G } : { ...N, gap: J ? 0 : G };
  return /* @__PURE__ */ A(
    "button",
    {
      type: g,
      "data-mode": C,
      "data-accent": b == null ? void 0 : b.accent,
      className: `${z} ${o ? "justify-center" : ""} ${J ? "group" : ""} ${X} ${p}`,
      "aria-pressed": r && !t.startsWith("tab") ? !0 : void 0,
      "data-active": r || void 0,
      style: K,
      ...m,
      children: o ? y : /* @__PURE__ */ A(
        lb,
        {
          icon: d,
          collapse: f,
          iconWithLabel: h,
          active: r && (t.startsWith("tab") || l),
          gap: G,
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
  const s = mn(), a = i ?? Ie(14, 18, s);
  return r === "check" ? /* @__PURE__ */ A(
    "span",
    {
      "data-selection-check": "check",
      className: `inline-flex shrink-0 items-center justify-center ${n ? "opacity-40" : ""} ${o}`,
      style: { width: a, height: a },
      "aria-hidden": !0,
      children: e ? /* @__PURE__ */ A(zw, { size: a, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : t ? /* @__PURE__ */ A(zs, { size: a, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : null
    }
  ) : /* @__PURE__ */ A(
    "span",
    {
      "data-selection-check": "box",
      className: `inline-flex shrink-0 items-center justify-center ${n ? "opacity-40" : ""} ${o}`,
      "aria-hidden": !0,
      children: /* @__PURE__ */ A(Ff, { checked: t, indeterminate: e, size: a })
    }
  );
}
function cb({
  count: t,
  max: e,
  hiddenCount: n = 0,
  onClear: r,
  hero: i,
  clear: o = !0,
  theme: s,
  className: a = ""
}) {
  const l = mn(), c = Ie(10, 14, l), u = Ie(6, 9, l), d = Ie(11, 13, l), f = s === "light" ? "light" : "dark", h = s === "emerald" ? "emerald" : s === "blue" ? !0 : void 0, p = e !== void 0 ? `${t} of ${e} selected` : `${t} selected`;
  return /* @__PURE__ */ fe(
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
        /* @__PURE__ */ fe(
          "span",
          {
            "data-selection-count": !0,
            className: "min-w-0 flex-1 truncate tabular-nums text-[color:var(--ui-text-muted)]",
            style: { fontSize: d },
            children: [
              p,
              n > 0 && /* @__PURE__ */ fe("span", { className: "text-[color:var(--ui-text-faint)]", children: [
                " · ",
                n,
                " hidden by filter"
              ] })
            ]
          }
        ),
        o && /* @__PURE__ */ A(
          cr,
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
          cr,
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
const Hf = ti("dark"), ub = () => ni(Hf), Bf = ti({ "data-theme": "dark" }), $x = () => ni(Bf);
function qf() {
  const t = mn();
  return {
    padding: `${Ie(8, 12, t)}px ${Ie(12, 16, t)}px`,
    fontSize: `${Ie(12, 14, t)}px`,
    lineHeight: `${Ie(18, 22, t)}px`
  };
}
function db() {
  const t = mn();
  return {
    padding: `${Ie(6, 9, t)}px ${Ie(12, 16, t)}px ${Ie(2, 3, t)}px`,
    fontSize: `${Ie(10, 11, t)}px`,
    lineHeight: `${Ie(14, 16, t)}px`
  };
}
const Fx = (t) => t ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", lp = (t) => t ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", Hx = (t) => t ? "text-xs" : "text-[10px]";
function cl(t) {
  const e = Pn && Gy() > 0;
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
    headerPad: lp(e),
    headerText: `${lp(e)} font-semibold uppercase tracking-wider ${Hx(e)} ui-label`,
    // Item padding
    itemPad: Fx(e),
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
function fb(t) {
  const e = [];
  return _t.Children.forEach(t, (n) => {
    if (typeof n == "string" || typeof n == "number")
      e.push(String(n));
    else if (_t.isValidElement(n)) {
      const r = n.props.children;
      (typeof r == "string" || typeof r == "number") && e.push(String(r));
    }
  }), e.join(" ").trim();
}
const Wf = ti({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), Hs = ti(null), jf = () => ni(Hs), hb = ti({ query: "", setQuery: () => {
} }), Bx = () => ni(hb), pb = ti(null), qx = () => ni(pb), Wx = () => !0;
function ul(t) {
  const e = Y([]), [n, r] = Xe(-1), [i, o] = Xe(!1), [s, a] = Xe(0), l = Ne((f) => (e.current = [...e.current, f], a((h) => h + 1), () => {
    e.current = e.current.filter((h) => h !== f), a((h) => h + 1);
  }), []), c = Ne((f, h) => {
    r(f), o(h === "pointer");
  }, []), u = Ne(() => {
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
function gb(t) {
  const e = jf(), n = Y(e);
  n.current = e;
  const r = Y(null);
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
function Kf(t, e, n, r) {
  const i = Y(-1);
  i.current = e.highlightedIndex;
  const o = Y(e);
  o.current = e;
  const s = Y(t);
  s.current = t;
  const a = Y(r);
  a.current = r;
  const l = Y({ text: "", time: 0 }), c = Y(!1);
  c.current || (c.current = !0, n.current = (u) => {
    var g, y, m, b, C, E;
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
        u.preventDefault(), u.stopImmediatePropagation(), (E = (C = a.current) == null ? void 0 : C.onCloseSub) == null || E.call(C);
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
          const k = (D + P) % p.length;
          if (p[k].label.toLowerCase().startsWith(T)) {
            o.current.setHighlighted(k, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function Uf(t, e, n, r, i, o, s) {
  const a = Y(e);
  a.current = e;
  const l = Y(t);
  l.current = t;
  const c = Y(i);
  c.current = i;
  const u = Y(s == null ? void 0 : s.ignoreFields);
  u.current = s == null ? void 0 : s.ignoreFields;
  const d = Y(s == null ? void 0 : s.selectAll);
  d.current = s == null ? void 0 : s.selectAll;
  const f = Y(!1);
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
function Gf(t, e) {
  const n = Y(t);
  n.current = t;
  const r = Y(!1);
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
  const b = vr(), C = rb(s, b), E = C.theme, [v, T] = Xe([]), [D, P] = Xe(null), k = oo(), z = Ls(), S = Y(null), x = Y(null), I = Y(t);
  I.current = t;
  const [_, M] = Xe(t), [O, L] = Xe(""), W = f && g !== void 0, re = W ? g : O, F = W ? y ?? (() => {
  }) : L, N = Y(g ?? "");
  Ye(() => {
    t || (N.current = g ?? "");
  }, [t, g]);
  const te = W && re === N.current ? "" : re, G = Ow(), j = Y(null), ee = mn(), q = {
    padding: `${Ie(8, 12, ee)}px ${Ie(12, 16, ee)}px`,
    fontSize: `${Ie(12, 14, ee)}px`
  }, [Q, X] = Xe(0), J = f && !W;
  Ye(() => {
    var Ue;
    if (!J || !t) return;
    const he = (Ue = x.current) == null ? void 0 : Ue.querySelector("[data-menu-items]");
    if (!he) return;
    const we = () => X(he.offsetWidth - he.clientWidth);
    we();
    const qe = new ResizeObserver(we);
    return qe.observe(he), () => qe.disconnect();
  }, [t, J, re]);
  const K = gn(() => {
    if (!f) return;
    const he = te.trim().toLowerCase();
    return he ? (we) => {
      var qe;
      return p ? p(he, we.label, we.group) : we.label.toLowerCase().includes(he) || (((qe = we.group) == null ? void 0 : qe.toLowerCase().includes(he)) ?? !1);
    } : Wx;
  }, [te, f, p]), se = ul(K), le = f && te.trim() !== "" && se.items.length === 0, Ce = !!m, Re = se.allItems.map((he) => he.itemId).filter((he) => !!he), Be = se.items.map((he) => he.itemId).filter((he) => !!he), rt = ob({
    mode: "draft",
    selectedIds: (m == null ? void 0 : m.selectedIds) ?? ab,
    itemIds: Re,
    visibleIds: Be,
    max: m == null ? void 0 : m.max,
    disabledIds: m == null ? void 0 : m.disabledIds,
    indicator: m == null ? void 0 : m.indicator,
    onCommit: m == null ? void 0 : m.onCommit
  }), mt = Y(rt.reset);
  mt.current = rt.reset;
  const ut = typeof (m == null ? void 0 : m.commitLabel) == "function" ? m.commitLabel(rt.count) : (m == null ? void 0 : m.commitLabel) ?? `Select ${rt.count}`;
  Ye(() => {
    if (t)
      return M(!0), W || L(""), se.setHighlighted(d ?? -1, "keyboard"), mt.current(), tb(() => {
        n == null || n(!1), e == null || e();
      });
    T([]);
  }, [t, d, n, e]), Ye(() => {
    if (!t || !z) return;
    const he = (we) => {
      if (we.pointerType !== "touch") return;
      const qe = we.target;
      qe && (x.current && x.current.contains(qe) || S.current && S.current.contains(qe) || qe instanceof Element && qe.closest("[data-radix-menu-content]") || (n == null || n(!1), e == null || e()));
    };
    return z.addEventListener("pointerdown", he, { capture: !0 }), () => z.removeEventListener("pointerdown", he, { capture: !0 });
  }, [t, z, n, e]);
  const ne = Ne(() => {
    const he = S.current;
    if (!he) return null;
    const we = he.getBoundingClientRect();
    return { left: we.left, top: we.top, width: we.width, height: we.height };
  }, []), _e = ll({
    visible: t,
    morph: l,
    anchor: ne,
    onClosed: () => M(!1)
  }), Ae = Y(() => {
  }), Ke = Y(() => {
  }), Fe = Y(() => {
  }), ze = Ne((he) => {
    if (he.key === "Enter") {
      const we = se.highlightedIndex, qe = se.items[we >= 0 ? we : 0];
      return qe == null || qe.activate(), !0;
    }
    return he.key === "Escape" ? (n == null || n(!1), e == null || e(), !0) : !1;
  }, [se, n, e]);
  Kf(t && v.length === 0, se, Ae, {
    onFieldKey: ze,
    onSelectAll: Ce ? () => rt.setAll(!0) : void 0
  }), Gf(t, Ke), Uf(t, se, Ae, x, v.length > 0, Fe, {
    ignoreFields: W,
    selectAll: Ce
  });
  const Je = Y(null), gt = Ne((he) => {
    var we;
    if (he) {
      he.addEventListener("keydown", Ae.current, { capture: !0 }), he.addEventListener("wheel", Ke.current, { passive: !1 });
      const qe = he.ownerDocument;
      Je.current = qe, qe.addEventListener("keydown", Fe.current, { capture: !0 }), Ct(!0);
    } else
      (we = Je.current) == null || we.removeEventListener("keydown", Fe.current, { capture: !0 }), Je.current = null, Ct(!1);
    x.current = he, _e(he);
  }, [_e]), [Se, Ve] = Xe({ top: 0, left: 0, maxH: Qy, side: "bottom", ready: !1 }), [kt, yt] = Xe(0), [et, Ct] = Xe(!1);
  Ye(() => {
    t && S.current && yt(S.current.getBoundingClientRect().width);
  }, [t]), eb({
    anchorRef: S,
    panelRef: x,
    open: t && et,
    maxHeight: u,
    onPosition: Ve
  }), Ye(() => {
    var he;
    if (Se.ready && t) {
      if (f) {
        (he = j.current ?? S.current) == null || he.focus();
        return;
      }
      const we = x.current;
      we && we.ownerDocument.activeElement !== we && !we.contains(we.ownerDocument.activeElement) && we.focus();
    }
  }, [Se.ready, t, f]), Ye(() => {
    if (!t || !f) return;
    if (se.items.length === 0) {
      se.highlightedIndex !== -1 && se.setHighlighted(-1, "keyboard");
      return;
    }
    const he = se.highlightedIndex;
    (he < 0 || he >= se.items.length) && se.setHighlighted(0, "keyboard");
  }, [t, re, f, se.items.length]), Nn(() => {
    var we;
    if (!t || se.highlightedIndex < 0 || se.pointerDriven) return;
    const he = (we = x.current) == null ? void 0 : we.querySelector(`[data-ei="${se.highlightedIndex}"]`);
    hi(he, "nearest");
  }, [t, se.highlightedIndex, se.pointerDriven]);
  const dt = Ne((he) => {
    if (!(!he && !I.current)) {
      if (!he && Ot.current) {
        if (W) return;
        pe.current = !0;
      }
      n ? n(he) : he || e == null || e();
    }
  }, [n, e]), ft = Y(_);
  ft.current = _;
  const Ot = Y(!1), pe = Y(!1), ke = Ne(() => {
    if (!I.current && ft.current) {
      if (pe.current) {
        pe.current = !1, Ot.current = !1;
        return;
      }
      n == null || n(!0);
    }
  }, [n]), ue = _t.isValidElement(r) ? r : null, ye = Y(!1), He = Ne(() => {
    const he = S.current;
    he && (ye.current = !0, he.focus(), setTimeout(() => {
      ye.current = !1;
    }, 0));
  }, []), Rt = ue ? _t.cloneElement(ue, {
    ref: (he) => {
      S.current = he;
      const we = ue.props.ref;
      typeof we == "function" ? we(he) : we && (we.current = he);
    },
    /* Radix's trigger primitive merges `type="button"` onto the child; a
       text field trigger-as-search must stay a text field. */
    ...W ? { type: ue.props.type ?? "text" } : {},
    ...W ? {
      /* A text field that opens a list IS a combobox, and the highlighted
         row must be announced — the field is outside the popup, so the
         only link screen readers get is `aria-activedescendant`. */
      role: "combobox",
      "aria-autocomplete": "list",
      "aria-controls": t ? `${G}-content` : void 0,
      "aria-activedescendant": t && se.highlightedIndex >= 0 ? `${G}-opt-${se.highlightedIndex}` : void 0
    } : {},
    onPointerDownCapture: (he) => {
      var we, qe;
      (qe = (we = ue.props).onPointerDownCapture) == null || qe.call(we, he), Ot.current = !0, pe.current = !1, setTimeout(() => {
        Ot.current = !1;
      }, 0);
    },
    onPointerDown: (he) => {
      var we, qe;
      if ((qe = (we = ue.props).onPointerDown) == null || qe.call(we, he), W) {
        he.preventDefault();
        const Ue = I.current;
        Ue || n == null || n(!0);
        const zt = S.current;
        zt == null || zt.focus(), !Ue && zt instanceof HTMLInputElement && zt.select();
      }
    },
    /* Space is a printable search character, but Radix treats it as the
       trigger's open/close key. Keep it in the field. */
    onKeyDownCapture: (he) => {
      var we, qe;
      (qe = (we = ue.props).onKeyDownCapture) == null || qe.call(we, he), W && he.key === " " && he.stopPropagation();
    },
    onClick: (he) => {
      var we, qe;
      (qe = (we = ue.props).onClick) == null || qe.call(we, he), ke();
    },
    /* A kit-driven focus restore is not a user focus (see above). */
    onFocus: (he) => {
      var we, qe;
      if (ye.current) {
        ye.current = !1;
        return;
      }
      (qe = (we = ue.props).onFocus) == null || qe.call(we, he);
    },
    /* Focus leaving the field ends the search session: Tab (or any focus
       move that does not land in the panel) must close the list, not leave
       an orphan panel floating with the keyboard elsewhere. The panel's
       own focused row is legitimate — keep it open for the pending click. */
    onBlur: (he) => {
      var qe, Ue, zt, tn;
      if ((Ue = (qe = ue.props).onBlur) == null || Ue.call(qe, he), !W || !I.current) return;
      const we = he.relatedTarget;
      we && ((zt = x.current) != null && zt.contains(we) || (tn = S.current) != null && tn.contains(we)) || setTimeout(() => {
        var xe;
        const bt = S.current;
        if (!bt || !I.current) return;
        const Z = bt.ownerDocument.activeElement;
        Z && (bt.contains(Z) || (xe = x.current) != null && xe.contains(Z)) || (n == null || n(!1), e == null || e());
      }, 0);
    },
    /* Combobox mode (externalSearch): the trigger field IS the search box,
       so it also drives the menu's keyboard — arrows move the single
       highlight and Enter activates the highlighted (or first visible)
       row. Filtering itself follows the VALUE (see filterQuery), so no
       input method is special-cased here. */
    onKeyDown: (he) => {
      var we, qe;
      if ((qe = (we = ue.props).onKeyDown) == null || qe.call(we, he), !(!W || !I.current)) {
        if (he.key === "ArrowDown" || he.key === "ArrowUp") {
          he.preventDefault();
          const Ue = se.items;
          if (Ue.length === 0) return;
          const zt = he.key === "ArrowDown" ? 1 : -1, tn = (se.highlightedIndex + zt + Ue.length) % Ue.length;
          se.setHighlighted(tn, "keyboard");
        } else if (he.key === "Enter") {
          he.preventDefault();
          const Ue = se.highlightedIndex, zt = se.items[Ue >= 0 ? Ue : 0];
          zt == null || zt.activate();
        }
      }
    }
  }) : r, Pt = /* @__PURE__ */ fe("div", { "data-menu-search-empty": !0, className: "px-3 py-3 text-center", children: [
    /* @__PURE__ */ fe("div", { className: "text-xs font-medium text-[color:var(--ui-text-muted)]", children: [
      "No matches for “",
      te.trim(),
      "”"
    ] }),
    /* @__PURE__ */ A("div", { className: "mt-0.5 text-[10px] text-[color:var(--ui-text-faint)]", children: "Try a different search." })
  ] }), it = J || Ce, sn = `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] min-w-0 ${it ? "overflow-hidden" : "overflow-y-auto scrollbar-custom"}`;
  return /* @__PURE__ */ fe(pn.Root, { open: t || _, onOpenChange: dt, modal: !1, children: [
    /* @__PURE__ */ A(pn.Trigger, { asChild: !0, children: Rt }),
    /* @__PURE__ */ A(pn.Portal, { container: k ?? void 0, children: /* @__PURE__ */ A(Hf.Provider, { value: E, children: /* @__PURE__ */ A(Bf.Provider, { value: C.attrs, children: /* @__PURE__ */ A(Wf.Provider, { value: { chain: v, setChain: T, morph: l, keyboardOpened: D, setKeyboardOpened: P }, children: /* @__PURE__ */ A(Hs.Provider, { value: se, children: /* @__PURE__ */ A(hb.Provider, { value: { query: re, setQuery: F }, children: /* @__PURE__ */ A(sb.Provider, { value: Ce ? rt : null, children: /* @__PURE__ */ A(pb.Provider, { value: G, children: /* @__PURE__ */ fe(
      pn.Content,
      {
        id: `${G}-content`,
        ref: gt,
        tabIndex: W ? void 0 : -1,
        ...C.attrs,
        "data-ui-fixed": !0,
        className: `${sn} ${o || ""} ${c || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: Se.left,
          top: Se.top,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: o ? void 0 : kt || void 0,
          maxHeight: Se.maxH,
          visibility: Se.ready ? "visible" : "hidden"
        },
        onPointerLeave: se.pointerLeave,
        onFocusCapture: W ? (he) => {
          he.target === he.currentTarget && (he.stopPropagation(), He());
        } : void 0,
        onFocusOutside: W ? (he) => {
          var qe;
          const we = he.target;
          we && (we === S.current || (qe = S.current) != null && qe.contains(we)) && he.preventDefault();
        } : void 0,
        onCloseAutoFocus: W ? (he) => {
          he.preventDefault(), He();
        } : void 0,
        children: [
          J && /* @__PURE__ */ A("div", { className: "shrink-0 px-0 pt-1 pb-1", style: { paddingRight: Q }, children: /* @__PURE__ */ fe("div", { "data-menu-search": !0, className: "ui-item ui-item-highlighted flex items-center gap-2 rounded", style: q, children: [
            /* @__PURE__ */ A(Io, { className: "w-3.5 h-3.5 shrink-0 ui-icon" }),
            /* @__PURE__ */ A(
              "input",
              {
                ref: j,
                value: re,
                onChange: (he) => F(he.target.value),
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
                onPointerDown: (he) => he.stopPropagation(),
                onClick: () => {
                  var he;
                  F(""), (he = j.current) == null || he.focus();
                },
                children: /* @__PURE__ */ A(eo, { className: "w-3.5 h-3.5" })
              }
            ) : /* @__PURE__ */ A("span", { className: "w-3.5 h-3.5 shrink-0" })
          ] }) }),
          it ? /* @__PURE__ */ fe("div", { "data-menu-items": !0, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: [
            a,
            le && Pt
          ] }) : /* @__PURE__ */ fe(Dn, { children: [
            a,
            le && Pt
          ] }),
          Ce && (m == null ? void 0 : m.footer) !== !1 && /* @__PURE__ */ A(
            cb,
            {
              count: rt.count,
              max: m == null ? void 0 : m.max,
              hiddenCount: (m == null ? void 0 : m.hiddenNote) === !1 ? 0 : rt.hiddenCount,
              clear: (m == null ? void 0 : m.clear) !== !1,
              theme: E,
              onClear: rt.clear,
              hero: {
                label: ut,
                onClick: () => {
                  rt.commit(), dt(!1);
                },
                disabled: rt.count === 0
              }
            }
          )
        ]
      }
    ) }) }) }) }) }) }) }) })
  ] });
}
function YP({
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
  trigger: E,
  minItems: v = 1,
  itemRender: T,
  morph: D = !0,
  contentClassName: P
}) {
  const k = cl(), z = qf(), [S, x] = Xe(null), [I, _] = Xe(""), M = Y(I);
  M.current = I;
  const O = Y(null), L = Y(null), [W, re] = Xe(null), F = Ne((q) => {
    L.current = q, re(q);
  }, []), N = ib({
    open: t,
    scroller: () => L.current,
    row: () => {
      var q;
      return ((q = L.current) == null ? void 0 : q.querySelector('[data-active="1"]')) ?? null;
    }
  });
  Ye(() => {
    if (!t) return;
    const q = (X) => {
      var Be, rt;
      const J = X.target;
      if (J && J.closest("input, textarea, [contenteditable]")) {
        S && J === O.current && (X.key === "Enter" ? (X.preventDefault(), X.stopImmediatePropagation(), G()) : X.key === "Escape" && (X.preventDefault(), X.stopImmediatePropagation(), j()));
        return;
      }
      const K = (Be = L.current) == null ? void 0 : Be.closest(".ui-menu");
      if (!K || !K.contains(X.target)) return;
      const se = K.ownerDocument, le = [...K.querySelectorAll('[data-im-row] > [role="menuitem"]:first-child')], Ce = [...K.querySelectorAll(':scope > div:last-child > [role="menuitem"]')], Re = [...le, ...Ce];
      if (X.key === "ArrowDown" || X.key === "ArrowUp") {
        X.preventDefault(), X.stopImmediatePropagation();
        const mt = se.activeElement;
        let ut = mt ? Re.indexOf(mt) : -1;
        if (ut < 0 && mt) {
          const Ke = mt.closest("[data-im-row]"), Fe = Ke == null ? void 0 : Ke.querySelector('[role="menuitem"]:first-child');
          Fe && (ut = le.indexOf(Fe));
        }
        const ne = X.key === "ArrowDown" ? 1 : -1, _e = ut < 0 ? ne === 1 ? 0 : Re.length - 1 : (ut + ne + Re.length) % Re.length, Ae = Re[_e];
        Ae == null || Ae.focus({ preventScroll: !0 }), hi((Ae == null ? void 0 : Ae.closest("[data-im-row]")) ?? Ae, "nearest", L.current);
        return;
      }
      if (X.key === "ArrowLeft" || X.key === "ArrowRight") {
        const mt = se.activeElement, ut = mt == null ? void 0 : mt.closest("[data-im-row]");
        if (!ut) return;
        X.preventDefault(), X.stopImmediatePropagation();
        const ne = [...ut.querySelectorAll('[role="menuitem"]')].slice(1);
        if (ne.length === 0) return;
        const _e = mt && ut.contains(mt) ? ne.indexOf(mt) : -1, Ae = X.key === "ArrowRight" ? 1 : -1, Ke = _e < 0 ? 0 : (_e + Ae + ne.length) % ne.length;
        (rt = ne[Ke]) == null || rt.focus({ preventScroll: !0 });
        return;
      }
    }, Q = (W == null ? void 0 : W.ownerDocument) ?? null;
    return Q == null || Q.addEventListener("keydown", q, { capture: !0 }), () => Q == null ? void 0 : Q.removeEventListener("keydown", q, { capture: !0 });
  }, [t, S, W]), Ye(() => {
    if (!S) return;
    const q = n.find((K) => K.id === S);
    q && !I && _(q.name);
    const Q = requestAnimationFrame(() => {
      const K = O.current;
      K && (K.focus(), K.select());
    });
    let X = 0;
    const J = window.setInterval(() => {
      const K = O.current;
      if (X++, !K || X > 12) {
        clearInterval(J);
        return;
      }
      K.ownerDocument.activeElement !== K && (K.focus(), K.select());
    }, 50);
    return () => {
      cancelAnimationFrame(Q), clearInterval(J);
    };
  }, [S]), Ye(() => {
    if (S) {
      const q = n.find((Q) => Q.id === S);
      q && !I && _(q.name);
    }
  }, [S, n]);
  const te = (q, Q) => {
    x(q), _(Q);
  }, G = () => {
    S && M.current.trim() && o(S, M.current.trim()), x(null);
  }, j = () => {
    x(null);
  }, ee = C || b.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ fe(dl, { open: t, onOpenChange: (q) => {
    q ? (x(null), _("")) : (S && I.trim() && o(S, I.trim()), x(null), _("")), (!q || !p) && e(q);
  }, width: "w-80", theme: g, align: y, trigger: E, morph: D, contentClassName: P, children: [
    /* @__PURE__ */ A("div", { className: `shrink-0 ${k.headerText}`, children: b }),
    /* @__PURE__ */ A("div", { ref: F, "data-im-list": !0, onPointerEnter: N.engage, onPointerDown: N.engage, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: n.map((q) => {
      const Q = q.id === r, X = S === q.id;
      return /* @__PURE__ */ A("div", { "data-im-row": q.id, "data-active": Q ? "1" : void 0, className: `scroll-my-4 flex items-center gap-1 rounded ${Q || X ? k.rowActiveBg : k.rowHoverBg} ${S && !X ? "opacity-40 pointer-events-none" : ""}`, children: X ? /* @__PURE__ */ fe(Dn, { children: [
        /* @__PURE__ */ A("div", { className: "flex-1 min-w-0 flex items-center", children: /* @__PURE__ */ A(
          "input",
          {
            ref: O,
            autoFocus: !0,
            value: I,
            onChange: (J) => _(J.target.value),
            onKeyDown: (J) => {
              J.key === "Enter" && (J.preventDefault(), J.stopPropagation(), G()), J.key === "Escape" && (J.preventDefault(), J.stopPropagation(), j());
            },
            className: "w-full outline-none bg-transparent placeholder:text-current placeholder:opacity-50",
            style: z
          }
        ) }),
        /* @__PURE__ */ A(
          pn.Item,
          {
            className: `shrink-0 ${k.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${k.editConfirm}`,
            onSelect: (J) => {
              J.preventDefault(), G();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ A(zs, { className: k.btnIcon })
          }
        ),
        /* @__PURE__ */ A(
          pn.Item,
          {
            className: `shrink-0 ${k.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${k.editCancel}`,
            onSelect: (J) => {
              J.preventDefault(), j();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ A(eo, { className: k.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ fe(Dn, { children: [
        /* @__PURE__ */ A(
          pn.Item,
          {
            style: z,
            className: `flex-1 min-w-0 rounded outline-none cursor-pointer flex items-center ${k.rowText} ${Q ? "" : k.rowTextHover}`,
            onSelect: h ? () => {
              i(q.id);
            } : (J) => {
              J.preventDefault(), i(q.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ A("span", { className: `truncate ${Q ? k.rowActiveText : ""}`, children: T ? T(q) : q.name })
          }
        ),
        /* @__PURE__ */ A(
          pn.Item,
          {
            className: `shrink-0 ${k.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${Q ? k.btnActive : k.btnBase}`,
            onSelect: (J) => {
              J.preventDefault(), te(q.id, q.name);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ A(Lw, { className: k.btnIcon })
          }
        ),
        /* @__PURE__ */ A(
          pn.Item,
          {
            className: `shrink-0 ${k.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${Q ? k.btnActive : k.btnBase}`,
            onSelect: (J) => {
              J.preventDefault();
              const K = s(q.id);
              K && te(K, `${q.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ A(qy, { className: k.btnIcon })
          }
        ),
        /* @__PURE__ */ A(
          pn.Item,
          {
            className: `shrink-0 ${k.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${n.length <= v ? k.btnDisabled : Q ? k.btnDangerActive : k.btnDanger}`,
            onSelect: (J) => {
              J.preventDefault(), a(q.id);
            },
            onTouchStart: () => {
            },
            disabled: p || n.length <= v,
            children: /* @__PURE__ */ A(za, { className: k.btnIcon })
          }
        )
      ] }) }, q.id);
    }) }),
    /* @__PURE__ */ fe("div", { className: `shrink-0 ${S ? "opacity-40 pointer-events-none" : ""}`, children: [
      d && /* @__PURE__ */ fe(Dn, { children: [
        /* @__PURE__ */ A(pn.Separator, { className: k.separator }),
        /* @__PURE__ */ fe(
          pn.Item,
          {
            className: `w-full text-left ${k.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${k.itemDefault} ui-row`,
            onSelect: (q) => {
              q.preventDefault(), d();
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: [
              /* @__PURE__ */ A(Wy, { className: `${k.btnIcon} ${k.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (l || c || u || f) && /* @__PURE__ */ A(pn.Separator, { className: k.separator }),
      l && /* @__PURE__ */ fe(
        pn.Item,
        {
          className: `w-full text-left ${k.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${k.itemDefault} ui-row`,
          onSelect: (q) => {
            q.preventDefault();
            const Q = l();
            Q && te(Q, "");
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ A(ol, { className: `${k.btnIcon} ${k.icon}` }),
            "New ",
            ee
          ]
        }
      ),
      c && /* @__PURE__ */ fe(
        pn.Item,
        {
          className: `w-full text-left ${k.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${k.itemDefault} ui-row`,
          onSelect: (q) => {
            q.preventDefault(), c();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ fe("svg", { className: `${k.btnIcon} ${k.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ A("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ A("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ A("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      u && /* @__PURE__ */ fe(
        pn.Item,
        {
          className: `w-full text-left ${k.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${k.itemDefault} ui-row`,
          onSelect: (q) => {
            q.preventDefault(), u();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ fe("svg", { className: `${k.btnIcon} ${k.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ A("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ A("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ A("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      f && /* @__PURE__ */ fe(
        pn.Item,
        {
          className: `w-full text-left ${k.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${k.itemDefault} ui-row`,
          onSelect: (q) => {
            q.preventDefault(), f();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ A(za, { className: `${k.btnIcon} ${k.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
function jx({
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
  ub();
  const f = cl(), h = qf(), p = db(), g = Y(!1), y = Y(null), m = Px(), b = !!m && d !== void 0, C = m && d !== void 0 ? m.isSelected(d) : a, E = n || (m && d !== void 0 ? !m.canToggle(d) : !1), { myIndex: v, highlighted: T, setPointer: D, api: P } = gb({
    label: () => fb(o),
    activate: () => {
      E || (m && d !== void 0 ? m.toggle(d) : t());
    },
    disabled: E,
    group: u,
    itemId: d
  }), { query: k } = Bx(), z = k.trim() !== "" && v < 0, S = qx(), x = u == null ? void 0 : u.trim(), I = !!x && v >= 0 && (v === 0 || ((L = P == null ? void 0 : P.items[v - 1]) == null ? void 0 : L.group) !== x), _ = x && m ? ((P == null ? void 0 : P.items) ?? []).filter((W) => W.group === x && W.itemId).map((W) => W.itemId).filter((W) => !m.isDisabled(W)) : [], M = m && _.length > 0 ? m.groupState(_) : "none", O = r === "danger" ? f.itemDanger : f.itemDefault;
  return /* @__PURE__ */ fe(Dn, { children: [
    I && /* @__PURE__ */ A(
      "div",
      {
        "data-menu-group": x,
        role: "presentation",
        className: `ui-label shrink-0 select-none font-semibold uppercase tracking-wider ${m && _.length > 0 ? "" : "pointer-events-none"}`,
        style: p,
        children: m && _.length > 0 ? /* @__PURE__ */ fe("span", { className: "flex items-center gap-2", children: [
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
                  checked: M === "all",
                  indeterminate: M === "some",
                  indicator: m.indicator
                }
              )
            }
          ),
          /* @__PURE__ */ A("span", { className: "flex-1 truncate", children: x })
        ] }) : x
      }
    ),
    /* @__PURE__ */ fe(
      pn.Item,
      {
        ref: y,
        id: S && v >= 0 ? `${S}-opt-${v}` : void 0,
        "data-ei": v >= 0 ? v : void 0,
        ...b ? { role: "menuitemcheckbox", "aria-checked": C } : {},
        style: { ...h, display: z ? "none" : void 0 },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${O} ${b ? "" : a ? "ui-item-selected" : ""} ${T ? "ui-item-highlighted" : ""} ${E ? "opacity-30 pointer-events-none" : ""} ${i}`,
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
        disabled: E,
        children: [
          b && /* @__PURE__ */ A(Fa, { checked: C, disabled: E, indicator: m.indicator }),
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
function Kx({ id: t, label: e, icon: n, width: r, side: i = "right", children: o, contentClassName: s }) {
  const { chain: a, setChain: l, morph: c, keyboardOpened: u, setKeyboardOpened: d } = ni(Wf), f = a.includes(t), h = a[a.length - 1] === t;
  ub();
  const p = $x(), g = oo(), y = Y(null), m = Y(null), [b, C] = Xe(f), E = !f && b;
  Ye(() => {
    f && C(!0);
  }, [f]);
  const v = () => l((j) => {
    const ee = j.indexOf(t);
    return ee >= 0 ? j.slice(0, ee) : j;
  }), T = ul(), D = jf(), P = Y(D);
  P.current = D;
  const k = Y(null);
  Ye(() => {
    var ee;
    const j = {
      label: e,
      activate: () => {
        d(t), l((q) => q.includes(t) ? q : [...q, t]);
      },
      submenu: !0
    };
    return k.current = j, (ee = P.current) == null ? void 0 : ee.register(j);
  }, []);
  const z = D && k.current ? D.items.indexOf(k.current) : -1, S = z >= 0 && z === D.highlightedIndex, x = Ne(() => {
    const j = y.current;
    if (!j) return null;
    const ee = j.getBoundingClientRect();
    return { left: ee.left, top: ee.top, width: ee.width, height: ee.height };
  }, []), I = ll({
    visible: f,
    morph: c,
    anchor: x,
    onClosed: () => C(!1)
  }), _ = Y(() => {
  }), M = Y(() => {
  }), O = Y(() => {
  });
  Kf(f && h, T, _, {
    onCloseSub: () => {
      v(), D && z >= 0 && D.setHighlighted(z, "keyboard");
    }
  });
  const L = Y(u);
  L.current = u, Ye(() => {
    f && (L.current === t ? (T.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var j;
      return (j = m.current) == null ? void 0 : j.focus();
    }), d(null)) : T.setHighlighted(-1, "keyboard"));
  }, [f]), Gf(f, M), Uf(f, T, _, m, !h, O), _t.useLayoutEffect(() => {
    var ee;
    if (!f || T.highlightedIndex < 0 || T.pointerDriven) return;
    const j = (ee = m.current) == null ? void 0 : ee.querySelector(`[data-ei="${T.highlightedIndex}"]`);
    hi(j, "nearest", m.current);
  }, [f, T.highlightedIndex, T.pointerDriven]);
  const W = Y(null), re = Ne((j) => {
    var ee;
    if (j) {
      j.addEventListener("keydown", _.current, { capture: !0 }), j.addEventListener("wheel", M.current, { passive: !1 });
      const q = j.ownerDocument;
      W.current = q, q.addEventListener("keydown", O.current, { capture: !0 });
    } else
      (ee = W.current) == null || ee.removeEventListener("keydown", O.current, { capture: !0 }), W.current = null;
    m.current = j, I(j);
  }, [I]), F = mn(), N = { padding: `${Ie(8, 12, F)}px ${Ie(12, 16, F)}px`, fontSize: Ie(12, 14, F) }, te = `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${S ? " ui-item-highlighted" : ""}${E ? " ui-sub-closing" : ""}`, G = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${s || ""}`;
  return /* @__PURE__ */ fe(pn.Sub, { open: f || b, onOpenChange: (j) => l((ee) => {
    if (!j) {
      const q = ee.indexOf(t);
      return q >= 0 ? ee.slice(0, q) : ee;
    }
    return ee.includes(t) ? ee : [...ee, t];
  }), children: [
    /* @__PURE__ */ fe(
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
          /* @__PURE__ */ fe("span", { className: "flex items-center gap-2", children: [
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
        className: G,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: T.pointerLeave,
        children: /* @__PURE__ */ A(Hs.Provider, { value: T, children: o })
      }
    ) })
  ] });
}
const Qo = 8, Ux = ({ open: t, x: e, y: n, onClose: r, children: i, containerRef: o, theme: s, morph: a = !0 }) => {
  const l = vr(), c = s ? { theme: s, attrs: { "data-theme": s } } : l ? rb(void 0, l) : { theme: "light", attrs: { "data-theme": "light" } }, { theme: u } = c, d = mn(), f = Ie(12, 14, d), h = Y(null), p = $s(), [g, y] = Xe(!1), [m, b] = Xe([]), [C, E] = Xe(null), v = ul();
  Ye(() => {
    if (t)
      return v.setHighlighted(-1, "keyboard"), tb(r);
  }, [t, r]);
  const T = Y({ left: e, top: n });
  t && (T.current = { left: e, top: n });
  const D = Ne(() => ({ left: T.current.left, top: T.current.top, width: 0, height: 0 }), []), P = ll({
    visible: !0,
    morph: a,
    anchor: D,
    cloneOnUnmount: !0
  }), k = Y(() => {
  }), z = Y(() => {
  }), S = Y(() => {
  });
  Kf(t, v, k), Nn(() => {
    if (!t || v.highlightedIndex < 0 || v.pointerDriven) return;
    const O = h.current;
    hi(
      O == null ? void 0 : O.querySelector(`[data-ei="${v.highlightedIndex}"]`),
      "nearest",
      O
    );
  }, [t, v.highlightedIndex, v.pointerDriven]), Gf(t, z), Uf(t, v, k, h, m.length > 0, S);
  const x = Y(null), I = Ne((O) => {
    var L;
    if (O) {
      O.addEventListener("keydown", k.current, { capture: !0 }), O.addEventListener("wheel", z.current, { passive: !1 });
      const W = O.ownerDocument;
      x.current = W, W.addEventListener("keydown", S.current, { capture: !0 });
    } else
      (L = x.current) == null || L.removeEventListener("keydown", S.current, { capture: !0 }), x.current = null;
    h.current = O, y(!!O), P(O);
  }, [P]), [_, M] = Xe(null);
  return Nn(() => {
    var q;
    if (!t || !g || !h.current) return;
    const O = h.current, L = O.offsetWidth, W = O.offsetHeight, re = (q = o == null ? void 0 : o.current) == null ? void 0 : q.getBoundingClientRect(), F = re ? re.right : (p == null ? void 0 : p.innerWidth) ?? 0, N = re ? re.bottom : (p == null ? void 0 : p.innerHeight) ?? 0, te = re ? re.left : 0, G = re ? re.top : 0;
    let j = Math.max(G + Qo, T.current.top), ee = Math.max(te + Qo, T.current.left);
    ee + L > F && (ee = F - L - Qo), j + W > N && (j = Math.max(G + Qo, N - W - Qo)), M({ left: ee, top: j });
  }, [t, g, e, n, o]), t ? /* @__PURE__ */ fe(pn.Root, { open: t, onOpenChange: (O) => {
    O || r();
  }, modal: !1, children: [
    /* @__PURE__ */ A(pn.Trigger, { asChild: !0, children: /* @__PURE__ */ A("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ A(pn.Portal, { children: /* @__PURE__ */ A(Hf.Provider, { value: u, children: /* @__PURE__ */ A(Bf.Provider, { value: c.attrs, children: /* @__PURE__ */ A(Wf.Provider, { value: { chain: m, setChain: b, morph: a, keyboardOpened: C, setKeyboardOpened: E }, children: /* @__PURE__ */ A(Hs.Provider, { value: v, children: /* @__PURE__ */ A(
      pn.Content,
      {
        ref: I,
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
  const a = mn(), l = { padding: `${Ie(8, 12, a)}px ${Ie(12, 16, a)}px`, fontSize: Ie(12, 14, a) }, c = jf(), u = Y(c);
  u.current = c;
  const d = Y(null);
  Ye(() => {
    var g;
    const p = { label: fb(s), activate: () => {
      r || t();
    } };
    return d.current = p, (g = u.current) == null ? void 0 : g.register(p);
  }, []);
  const f = c && d.current ? c.items.indexOf(d.current) : -1, h = !r && f >= 0 && f === c.highlightedIndex;
  return /* @__PURE__ */ fe(
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
}, Gx = () => /* @__PURE__ */ A(pn.Separator, { className: "ui-sep my-1" }), XP = (t) => /* @__PURE__ */ A(Kx, { ...t, width: t.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), ln = 8, mb = "[data-modal-stack]", ui = 220, Es = "cubic-bezier(0.32, 0.72, 0, 1)", _a = 0.94;
function So() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Ci(t) {
  if (!t) return { top: 0, height: 0, bottom: 0 };
  const e = t.visualViewport, n = e ? e.offsetTop : 0, r = e ? e.height : t.innerHeight;
  return { top: n, height: r, bottom: n + r };
}
function yb(t, e) {
  return `translate(${e.left - t.left}px, ${e.top - t.top}px) scale(${e.width / t.width}, ${e.height / t.height})`;
}
function cp(t, e, n, r) {
  const i = ++t.current, o = e.getBoundingClientRect();
  e.style.transition = "none", e.style.transform = yb(o, n), e.style.transformOrigin = "0 0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      t.current === i && (e.style.transition = `transform ${ui}ms ${Es}, opacity 180ms ease`, e.style.transform = "none", window.setTimeout(() => {
        t.current === i && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", r());
      }, ui + 80));
    });
  });
}
function Yx(t, e, n) {
  const r = ++t.current;
  e.style.transition = "none", e.style.transformOrigin = "center", e.style.transform = `scale(${_a})`, e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      t.current === r && (e.style.transition = `transform ${ui}ms ${Es}`, e.style.transform = "none", window.setTimeout(() => {
        t.current === r && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", n());
      }, ui + 60));
    });
  });
}
function up(t, e, n) {
  const r = ++t.current, i = e.getBoundingClientRect(), o = 1 - _a, s = { left: i.left + i.width * o / 2, top: i.top + i.height * o / 2, width: i.width * _a, height: i.height * _a };
  e.style.transition = `transform ${ui}ms ${Es}, opacity 170ms ease`, e.style.transformOrigin = "0 0", e.style.transform = yb(i, s), e.style.opacity = "0", window.setTimeout(() => {
    t.current === r && (e.style.visibility = "hidden", n(), requestAnimationFrame(() => {
      t.current !== r || e.isConnected || (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", e.style.opacity = "", e.style.visibility = "");
    }));
  }, ui + 60);
}
function Kl(t) {
  const e = t.parentNode;
  return e ? Array.from(e.children).filter((n) => n instanceof HTMLElement && n !== t && n.matches(mb) && (n.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
function la(t) {
  const e = t.parentNode;
  return e ? Array.from(e.children).filter((n) => n instanceof HTMLElement && n !== t && n.matches(mb) && (n.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
function Xx({
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
  const g = vr(), y = Lf(
    { mode: f, accent: p, surface: h, context: "surface" },
    g
  ), m = y.mode, b = y.surface, C = y.accent, E = Y(null), v = Y(null), T = Y(null), D = mn(), P = Ie(20, 24, D), k = Ie(10, 12, D), z = Ie(12, 14, D), S = Ie(14, 16, D), x = Ie(20, 24, D), I = Ie(20, 24, D), _ = Ie(20, 24, D), M = Ie(14, 16, D), O = Ie(16, 20, D), L = Ie(10, 12, D), W = Ie(12, 14, D), re = Ie(8, 10, D), F = Ie(4, 6, D), N = { padding: `${k}px ${P}px` }, te = { fontSize: z }, G = { padding: `${I}px ${x}px 16px ${x}px` }, j = { fontSize: S }, ee = { padding: `0 ${x}px 16px` }, q = { padding: `${_}px ${x}px` }, Q = { fontSize: L, padding: `${F}px ${re}px` }, [X, J] = Xe(!1), K = Ne((Z) => {
    E.current = Z, J(Z !== null);
  }, []), se = oo(), le = $s(), Ce = Y(le);
  Ce.current = le;
  const [Re, Be] = Xe(null), rt = Y(null), mt = Y(!1), ut = Y(!1), ne = Y(0), _e = Y({ w: 0, h: 0 }), Ae = Y(!1), [Ke, Fe] = Xe(!1), [ze, Je] = Xe(!1), gt = Y(0), Se = Y(!1), [Ve, kt] = Xe(!1), yt = Y(l);
  yt.current = l;
  const et = Y(!1), Ct = Y(!1), dt = () => {
    Ct.current = !0, Fe(!0);
  }, ft = () => {
    Ct.current = !1, Fe(!1);
  };
  Ye(() => {
    t || (Be(null), Ae.current = !1, mt.current = !1, Je(!1));
  }, [t]), Nn(() => {
    if (!t || Ae.current || !X || !E.current) return;
    Ae.current = !0;
    const Z = E.current.getBoundingClientRect(), xe = Ce.current ?? null, Te = (xe == null ? void 0 : xe.innerWidth) ?? 0, Ze = Ci(xe);
    Be({
      left: Math.max(ln, Math.min((Te - Z.width) / 2, Te - Z.width - ln)),
      top: Math.max(Ze.top + ln, Math.min(Ze.top + (Ze.height - Z.height) / 2, Ze.bottom - Z.height - ln))
    });
  }, [t, X]), Nn(() => {
    if (!t || !X || !l || So() || !E.current) return;
    const Z = E.current, xe = Kl(Z), Te = xe[xe.length - 1];
    dt(), Te ? cp(gt, Z, Te.getBoundingClientRect(), ft) : Yx(gt, Z, ft);
  }, [t, X]);
  const Ot = Ne(() => {
    if (!u || Se.current) return;
    const Z = E.current, xe = !!Z && Kl(Z).length > 0;
    if (!Z || !l || So() || xe) {
      e();
      return;
    }
    Se.current = !0, kt(!0), et.current = !0, dt(), up(gt, Z, () => {
      Se.current = !1, kt(!1), ft(), e();
    });
  }, [l, e, u]), pe = Ne(() => {
    const Z = E.current;
    if (!Z || et.current || !yt.current || So() || Kl(Z).length > 0) return;
    const xe = Z.ownerDocument, Te = Z.cloneNode(!0);
    Te.removeAttribute("data-modal-stack"), Te.removeAttribute("data-state"), Te.removeAttribute("role"), Te.removeAttribute("data-aria-hidden"), Te.removeAttribute("tabindex"), Te.setAttribute("aria-hidden", "true"), Te.style.pointerEvents = "none", xe.body.appendChild(Te), up({ current: 0 }, Te, () => {
      Te.isConnected && Te.remove();
    });
  }, []);
  Nn(() => () => pe(), [pe]);
  const ke = Y(t);
  Nn(() => {
    const Z = ke.current;
    ke.current = t, Z && !t && pe();
  }, [t, X, pe]), Ye(() => {
    if (!t || !X || !l || !E.current) return;
    const Z = E.current, xe = Z.parentNode;
    if (!xe) return;
    let Te = 0, Ze = null, vt = !1;
    const Bt = () => {
      Te = 0;
      const Tt = la(Z);
      if (Tt.length > 0)
        Z.style.opacity = "", Z.style.pointerEvents = "", Ze = Tt[Tt.length - 1].getBoundingClientRect(), vt = !0, Te = requestAnimationFrame(Bt);
      else if (vt) {
        vt = !1, Ze && !So() && (dt(), cp(gt, Z, Ze, ft)), Ze = null;
        const Mt = Ce.current ?? null;
        Mt == null || Mt.setTimeout(() => {
          !Z || !Z.isConnected || getComputedStyle(Z).opacity !== "1" && (Z.style.opacity = "1", Z.style.pointerEvents = "");
        }, 240);
      }
    }, ht = new MutationObserver(() => {
      !Te && la(Z).length > 0 && (Te = requestAnimationFrame(Bt));
    });
    return ht.observe(xe, { childList: !0 }), () => {
      ht.disconnect(), Te && cancelAnimationFrame(Te);
    };
  }, [t, X]), Ye(() => {
    if (!X || !l || So() || !E.current) return;
    const Z = E.current;
    let xe = Math.round(Z.getBoundingClientRect().height), Te = !1;
    const Ze = new ResizeObserver(() => {
      if (!Z.isConnected) return;
      const vt = Math.round(Z.getBoundingClientRect().height);
      if (!Te) {
        Te = !0, xe = vt;
        return;
      }
      if (Math.abs(vt - xe) < 1) return;
      if (rt.current || Se.current || la(Z).length > 0) {
        xe = vt;
        return;
      }
      if (Ct.current) return;
      const Bt = xe;
      xe = vt, dt();
      const ht = Z.getBoundingClientRect(), Tt = Ci(Ce.current ?? null), Mt = !mt.current && !ut.current, Et = Mt ? Tt.top + (Tt.height - Bt) / 2 : ht.top, nn = Mt ? Tt.top + (Tt.height - vt) / 2 : ht.top;
      Z.style.transition = "none", Z.style.height = `${Bt}px`, Mt && (Z.style.top = `${Et}px`), v.current && (v.current.style.overflow = "hidden"), Z.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          Z.style.height === `${Bt}px` && (Z.style.transition = `height ${ui}ms ${Es}${Mt ? `, top ${ui}ms ${Es}` : ""}`, Z.style.height = `${vt}px`, Mt && (Z.style.top = `${nn}px`), window.setTimeout(() => {
            Z.style.height === `${vt}px` && (Z.style.transition = "", Z.style.height = "", v.current && (v.current.style.overflow = ""), Mt && Be({ left: ht.left, top: nn }), ft());
          }, ui + 60));
        });
      });
    });
    return Ze.observe(Z), () => Ze.disconnect();
  }, [X]), Ye(() => {
    if (!X || !E.current || l && !So()) return;
    const Z = E.current, xe = new ResizeObserver(() => {
      if (!Z.isConnected || rt.current || Se.current || ut.current || la(Z).length > 0) return;
      const Te = Ce.current ?? null, Ze = Ci(Te), vt = (Te == null ? void 0 : Te.innerWidth) ?? 0, Bt = Z.getBoundingClientRect(), ht = Math.max(Ze.top + ln, Math.min(Bt.top, Ze.bottom - Bt.height - ln)), Tt = Math.max(ln, Math.min(Bt.left, vt - Bt.width - ln));
      (Math.abs(ht - Bt.top) > 0.5 || Math.abs(Tt - Bt.left) > 0.5) && Be({ left: Tt, top: ht });
    });
    return xe.observe(Z), () => xe.disconnect();
  }, [X, l]);
  const ue = Ne(() => {
    const Z = E.current;
    if (!Z) return null;
    const xe = Z.getBoundingClientRect();
    return { left: xe.left, top: xe.top, width: xe.width, height: xe.height };
  }, []), ye = Ne((Z, xe) => {
    const Te = Ce.current ?? null, Ze = (Te == null ? void 0 : Te.innerWidth) ?? 0, vt = Ci(Te), Bt = ue(), ht = Bt ? Bt.width : Math.min(Ze - ln * 2, 576), Tt = Bt ? Bt.height : Math.min(vt.height - ln * 2, 400);
    return {
      left: Math.max(ln, Math.min(Z, Ze - ht - ln)),
      top: Math.max(vt.top + ln, Math.min(xe, vt.bottom - Tt - ln))
    };
  }, [ue]);
  Ye(() => {
    if (!t) return;
    const Z = Ce.current ?? null, xe = (Z == null ? void 0 : Z.visualViewport) ?? null;
    if (!Z || !xe) return;
    const Te = 120;
    ut.current = !1, _e.current = { w: Z.innerWidth, h: Z.innerHeight };
    let Ze = 0;
    const vt = () => {
      if (Se.current || rt.current) return;
      const ht = (Z == null ? void 0 : Z.innerHeight) ?? 0, Tt = (Z == null ? void 0 : Z.innerWidth) ?? 0, Et = Ci(Z).height < ht - Te, nn = ht < _e.current.h - Te && Tt === _e.current.w;
      Et || nn ? (ut.current = !0, ne.current && (clearTimeout(ne.current), ne.current = 0)) : ne.current || (ne.current = (Z == null ? void 0 : Z.setTimeout(() => {
        ut.current = !1, ne.current = 0, Je(!1);
      }, 600)) ?? 0), Je(ut.current), !Ze && (Ze = requestAnimationFrame(() => {
        var bn;
        Ze = 0;
        const xr = E.current;
        if (!xr) return;
        const qt = Ci(Ce.current ?? null), yn = xr.getBoundingClientRect(), On = ((bn = Ce.current) == null ? void 0 : bn.innerWidth) ?? 0, Gn = (Z == null ? void 0 : Z.innerHeight) ?? 0, Xt = qt.height < Gn - Te || Gn < _e.current.h - Te && (Z == null ? void 0 : Z.innerWidth) === _e.current.w;
        _e.current = { w: (Z == null ? void 0 : Z.innerWidth) ?? 0, h: Gn };
        const zn = yn.top >= qt.top + ln && yn.bottom <= qt.bottom - ln, dr = () => {
          Be({
            left: Math.max(ln, Math.min((On - yn.width) / 2, On - yn.width - ln)),
            top: Math.max(qt.top + ln, Math.min(qt.top + (qt.height - yn.height) / 2, qt.bottom - yn.height - ln))
          });
        };
        if (Xt && !Pn) {
          if (mt.current) {
            zn || Be(ye(yn.left, yn.top));
            return;
          }
          if (zn) return;
          dr();
          return;
        }
        if (!ut.current) {
          if (mt.current) {
            zn || Be(ye(yn.left, yn.top));
            return;
          }
          zn || dr();
        }
      }));
    };
    xe.addEventListener("resize", vt), xe.addEventListener("scroll", vt);
    const Bt = () => {
      Se.current || rt.current || Ze || (Ze = requestAnimationFrame(() => {
        Ze = 0;
        const ht = E.current;
        if (!ht) return;
        const Tt = Ce.current ?? null, Mt = Ci(Tt), Et = (Tt == null ? void 0 : Tt.innerWidth) ?? 0, nn = ht.getBoundingClientRect();
        if (mt.current) {
          Be(ye(nn.left, nn.top));
          return;
        }
        Be({
          left: Math.max(ln, Math.min((Et - nn.width) / 2, Et - nn.width - ln)),
          top: Math.max(Mt.top + ln, Math.min(Mt.top + (Mt.height - nn.height) / 2, Mt.bottom - nn.height - ln))
        });
      }));
    };
    return Z.addEventListener("orientationchange", Bt), () => {
      xe.removeEventListener("resize", vt), xe.removeEventListener("scroll", vt), Z.removeEventListener("orientationchange", Bt), Ze && cancelAnimationFrame(Ze), ne.current && clearTimeout(ne.current);
    };
  }, [t, ye]);
  const He = Ne((Z) => {
    if (Z.target.closest("button")) return;
    mt.current = !0;
    const xe = ue();
    xe && (Be(ye(xe.left, xe.top)), rt.current = { startX: Z.clientX, startY: Z.clientY, posX: xe.left, posY: xe.top }, Z.target.setPointerCapture(Z.pointerId));
  }, [ue, ye]), Rt = Ne((Z) => {
    const xe = rt.current;
    xe && (Z.preventDefault(), Be(ye(xe.posX + Z.clientX - xe.startX, xe.posY + Z.clientY - xe.startY)));
  }, [ye]), Pt = Ne(() => {
    rt.current = null;
  }, []), it = rt.current !== null, sn = Ne(() => {
    mt.current = !1;
    const Z = Ce.current ?? null, xe = Ci(Z), Te = (Z == null ? void 0 : Z.innerWidth) ?? 0, Ze = E.current, vt = Ze ? Ze.getBoundingClientRect() : { width: 0, height: 0 };
    Be({
      left: Math.max(ln, Math.min((Te - vt.width) / 2, Te - vt.width - ln)),
      top: Math.max(xe.top + ln, Math.min(xe.top + (xe.height - vt.height) / 2, xe.bottom - vt.height - ln))
    });
  }, []), he = Y(0), we = Ne(() => {
    const Z = Date.now();
    Z - he.current < 300 ? (he.current = 0, sn()) : he.current = Z;
  }, [sn]), qe = Re !== null, Ue = qe ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", zt = `${i ? `${i} w-full` : "max-w-xl w-full"}`, tn = {
    ...qe ? { left: Re.left, top: Re.top } : {},
    width: `min(100%, calc(100dvw - ${ln * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...ze ? {} : { maxHeight: `calc(100dvh - ${ln * 2}px)` }
  }, bt = Ne((Z) => {
    if (Z.key !== "Enter" || Z.shiftKey || Z.metaKey || Z.ctrlKey || Z.altKey) return;
    const xe = Z.target, Te = T.current;
    if (!(!!xe.closest("[data-modal-close]") || !!Te && Te.contains(xe) && !!xe.closest('button, a, [role="button"]')) && xe.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !Te) return;
    const vt = Array.from(Te.querySelectorAll("button[data-modal-confirm]")), Bt = vt.length > 0 ? vt : Array.from(Te.querySelectorAll("button")), ht = Bt[Bt.length - 1];
    !ht || ht.disabled || (Z.preventDefault(), ht.click());
  }, []);
  return /* @__PURE__ */ A($f, { theme: y, children: /* @__PURE__ */ A(Si.Root, { open: t, onOpenChange: (Z) => {
    Z || Ot();
  }, children: /* @__PURE__ */ fe(Si.Portal, { container: se ?? void 0, children: [
    /* @__PURE__ */ A(
      Si.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${Ve ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (Z) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (Z.preventDefault(), d && Ot());
        }
      }
    ),
    /* @__PURE__ */ fe(
      Si.Content,
      {
        ref: K,
        onKeyDown: bt,
        onInteractOutside: (Z) => {
          d || Z.preventDefault();
        },
        "data-modal-stack": !0,
        "data-mode": m,
        "data-accent": C,
        "data-surface": b,
        className: `ui-modal fixed z-[10000] bg-[var(--ui-modal-bg)] border border-[color:var(--ui-modal-border)] rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${Ue} ${zt}`,
        style: { touchAction: "manipulation", colorScheme: m, ...Object.keys(tn).length > 0 ? tn : {} },
        children: [
          c ? /* @__PURE__ */ fe(
            "div",
            {
              style: G,
              className: `flex items-center justify-between ${it ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (Z) => {
                Ke || He(Z);
              },
              onPointerMove: Rt,
              onPointerUp: Pt,
              onClick: we,
              children: [
                /* @__PURE__ */ A(Si.Title, { style: j, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: n }),
                u && /* @__PURE__ */ A(Si.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ A(eo, { style: { width: O, height: O } }) })
              ]
            }
          ) : /* @__PURE__ */ fe(
            "div",
            {
              style: N,
              className: `ui-modal-header flex items-center justify-between border-b border-[color:var(--ui-modal-header-border)] shrink-0 bg-[var(--ui-modal-header-bg)] ${it ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (Z) => {
                Ke || He(Z);
              },
              onPointerMove: Rt,
              onPointerUp: Pt,
              onClick: we,
              children: [
                /* @__PURE__ */ fe("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ A("span", { className: "text-[color:var(--ui-modal-icon)] shrink-0", children: r }),
                  /* @__PURE__ */ A(Si.Title, { style: te, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: n })
                ] }),
                /* @__PURE__ */ fe("div", { className: "flex items-center gap-2", children: [
                  a && /* @__PURE__ */ fe("button", { onClick: a, style: Q, className: "cursor-pointer flex items-center gap-1 text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-muted-hover)] transition-colors bg-[var(--ui-modal-control-bg)] hover:bg-[var(--ui-modal-control-hover-bg)] rounded shrink-0", children: [
                    /* @__PURE__ */ A(Wy, { style: { width: W, height: W } }),
                    "Reset"
                  ] }),
                  u && /* @__PURE__ */ A(Si.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ A(eo, { style: { width: M, height: M } }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ A("div", { ref: v, "data-testid": "modal-body", style: c ? ee : void 0, className: "overflow-y-auto flex-1 bg-[var(--ui-modal-body-bg)] text-[color:var(--ui-modal-body-text)]", children: s }),
          o && /* @__PURE__ */ A("div", { ref: T, style: c ? q : void 0, className: c ? "" : "shrink-0", children: c ? /* @__PURE__ */ A("div", { className: "flex items-center justify-end gap-2", children: o }) : o })
        ]
      }
    )
  ] }) }) });
}
function VP({ children: t }) {
  const e = mn(), n = Ie(20, 24, e), r = Ie(8, 12, e);
  return /* @__PURE__ */ A("div", { className: "flex items-center justify-end gap-3 border-t border-[color:var(--ui-modal-border)] bg-[var(--ui-modal-footer-bg)]", style: { padding: `${r}px ${n}px` }, children: t });
}
const Vx = "inline-flex items-center gap-2 rounded-lg text-xs transition cursor-pointer select-none whitespace-nowrap active:shadow-[inset_0_0_0_2px_var(--ui-panel-bg)]", Jx = {
  zinc: "bg-[var(--ui-footer-hero-bg)] text-[color:var(--ui-footer-hero-text)] font-semibold border border-[color:var(--ui-footer-hero-border)] hover:bg-[var(--ui-footer-hero-hover-bg)] hover:border-[color:var(--ui-footer-hero-hover-border)] disabled:opacity-40 disabled:cursor-not-allowed",
  accent: "bg-[var(--ui-accent-solid)] text-[color:var(--ui-accent-action-text)] font-semibold border border-transparent hover:bg-[var(--ui-accent-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed",
  danger: "bg-[var(--ui-danger-solid)] text-white font-semibold border border-[color:var(--ui-danger-solid)] hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
}, Zx = {
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
      className: `${Vx} ${t === "hero" ? Jx[e] : Zx[t]} ${n}`,
      ...i
    }
  );
}
function Ha(t = "md") {
  const e = Pn && Gy() > 0;
  return t === "sm" ? `${e ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"} ui-input` : `${e ? "px-4 py-3 text-sm" : "px-3 py-1.5 text-xs"} ui-input`;
}
function bb(t = "md") {
  return t === "sm" ? _i({ px: 8, py: 6, fs: 12 }, { px: 12, py: 8, fs: 14 }) : _i({ px: 10, py: 5, fs: 12 }, { px: 14, py: 9, fs: 14 });
}
const vb = ti(null);
function JP() {
  const t = ni(vb);
  if (!t) throw new Error("useDialog must be used within DialogProvider");
  return t;
}
function ZP({ children: t, theme: e, accent: n, surface: r }) {
  const [i, o] = Xe(null), [s, a] = Xe(!1), l = Y(null), c = mn(), u = Ie(16, 20, c), d = Ie(12, 14, c), f = bb(), h = Y(i);
  h.current = i;
  const p = Ne(() => {
    const v = h.current;
    v && (v.kind === "confirm" ? v.resolve(!1) : v.kind === "prompt" ? v.resolve(null) : v.resolve());
  }, []), g = Ne((v) => {
    if (v.suppressKey) {
      const T = localStorage.getItem(v.suppressKey);
      if (T && Date.now() < parseInt(T, 10))
        return Promise.resolve(!0);
    }
    return new Promise((T) => {
      p(), a(!1), o({ kind: "confirm", options: v, resolve: T });
    });
  }, [p]), y = Ne((v) => new Promise((T) => {
    p(), o({ kind: "prompt", options: v, resolve: T });
  }), [p]), m = Ne((v) => new Promise((T) => {
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
  const b = Ne(() => {
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
  const E = Ne(() => {
    i && (i.kind === "confirm" ? i.resolve(!1) : i.kind === "prompt" ? i.resolve(null) : i.resolve(), o(null));
  }, [i]);
  return /* @__PURE__ */ fe(vb.Provider, { value: { confirm: g, prompt: y, alert: m }, children: [
    t,
    C && /* @__PURE__ */ A(
      Xx,
      {
        open: !0,
        onClose: E,
        closable: (i == null ? void 0 : i.kind) !== "alert",
        dismissOnBackdrop: (i == null ? void 0 : i.kind) !== "alert",
        title: (i == null ? void 0 : i.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: i && /* @__PURE__ */ fe(Dn, { children: [
          i.kind !== "alert" && /* @__PURE__ */ A(ca, { variant: "ghost", onClick: E, children: "Cancel" }),
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
        children: /* @__PURE__ */ fe("div", { className: "flex flex-col", style: { gap: u }, children: [
          (i == null ? void 0 : i.options.message) && /* @__PURE__ */ A("p", { style: { fontSize: d }, className: "text-[color:var(--ui-text-muted)] leading-relaxed", children: i.options.message }),
          (i == null ? void 0 : i.kind) === "confirm" && i.options.suppressKey && /* @__PURE__ */ A(
            Dx,
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
const Qx = 500, ek = 250, tk = 5, Tr = 88, dp = 4;
function nk(t, e) {
  const n = t.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  n.style.strokeDasharray = String(r), n.style.strokeDashoffset = String(r);
  const i = performance.now(), o = (s) => {
    const a = s - i, l = Math.min(a / e, 1);
    n.style.strokeDashoffset = String(r * (1 - l)), l < 1 && requestAnimationFrame(o);
  };
  requestAnimationFrame(o);
}
function rk({ x: t, y: e, ms: n }) {
  const r = Y(null), i = oo();
  return Ye(() => {
    r.current && nk(r.current, n);
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
        children: /* @__PURE__ */ fe("svg", { ref: r, width: Tr, height: Tr, viewBox: `0 0 ${Tr} ${Tr}`, children: [
          /* @__PURE__ */ A(
            "circle",
            {
              cx: Tr / 2,
              cy: Tr / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: dp + 2,
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
              strokeWidth: dp,
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
function QP() {
  return { "data-no-longpress": "true" };
}
function ik(t) {
  const e = t.tagName;
  return !!(e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || e === "BUTTON" || t.isContentEditable || t.closest("[data-no-longpress]") || t.closest("button, input, select, textarea"));
}
function e3({
  children: t,
  showRing: e = !0,
  longPressMs: n = Qx,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: i,
  onLongPress: o
}) {
  const [s, a] = Xe(null), l = Ls(), c = Y(null), u = Y(null), d = Y({ x: 0, y: 0, target: null }), f = Y(!1), h = Math.min(ek, n * 0.5), p = Y(i);
  p.current = i;
  const g = Y(o);
  return g.current = o, Ye(() => {
    if (!Pn || !l) return;
    const y = (E) => {
      if (!df(E.pointerType) || E.button !== 0) return;
      const v = E.target;
      if (!v.closest(r) || (p.current ? !p.current(v) : ik(v))) return;
      const T = E.clientX, D = E.clientY;
      d.current = { x: T, y: D, target: E.target }, f.current = !0, e && (u.current = setTimeout(() => a({ x: T, y: D }), h)), c.current = setTimeout(() => {
        if (!f.current) return;
        u.current && (clearTimeout(u.current), u.current = null), a(null);
        const P = d.current.target;
        if (!P) return;
        const k = g.current;
        if (k) {
          k(P, T, D);
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
    }, m = (E) => {
      if (!f.current || c.current === null) return;
      const v = E.clientX - d.current.x, T = E.clientY - d.current.y;
      Math.sqrt(v * v + T * T) > tk && (clearTimeout(c.current), c.current = null, u.current && (clearTimeout(u.current), u.current = null), f.current = !1, a(null));
    }, b = () => {
      c.current !== null && (clearTimeout(c.current), c.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, a(null);
    }, C = (E) => {
      df(E.pointerType) && (c.current !== null && (clearTimeout(c.current), c.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, a(null));
    };
    return l == null || l.addEventListener("pointerdown", y), l.addEventListener("pointermove", m), l.addEventListener("pointerup", b), l.addEventListener("pointercancel", b), l.addEventListener("pointerleave", C), () => {
      l.removeEventListener("pointerdown", y), l.removeEventListener("pointermove", m), l.removeEventListener("pointerup", b), l == null || l.removeEventListener("pointercancel", b), l == null || l.removeEventListener("pointerleave", C), c.current !== null && clearTimeout(c.current), u.current !== null && clearTimeout(u.current);
    };
  }, [e, n, h, r]), /* @__PURE__ */ fe(Dn, { children: [
    t,
    e && s && /* @__PURE__ */ A(rk, { x: s.x, y: s.y, ms: n - h })
  ] });
}
function t3() {
  const t = wx();
  return vx ? t === null || df(t) : !1;
}
const ok = {
  border: "1px solid #d4d4d8",
  background: "rgba(255,255,255,0.94)",
  color: "#52525b",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
}, sk = {
  border: "2px solid #2563eb",
  background: "#2563eb",
  color: "#fff",
  boxShadow: "0 4px 16px rgba(37,99,235,0.4)"
}, ak = {
  border: "1px solid #f59e0b",
  background: "rgba(255, 251, 235, 0.94)",
  color: "#b45309",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
};
function n3({
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
        ...e ? ak : t ? sk : ok,
        ...n
      },
      ...s,
      children: o
    }
  );
}
const lk = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], ck = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Ul = 1900, Gl = 2100;
function uk(t, e) {
  return new Date(t, e + 1, 0).getDate();
}
function dk(t, e, n) {
  return `${t}-${String(e + 1).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
}
function r3({ selected: t, onChange: e, theme: n, showChips: r = !0, className: i = "", initialView: o }) {
  const s = vr(), a = n ?? (s == null ? void 0 : s.mode) ?? "light", l = /* @__PURE__ */ new Date(), c = (() => {
    if (!o) return l;
    const K = /* @__PURE__ */ new Date(o + "T00:00:00");
    return isNaN(K.getTime()) ? l : K;
  })(), [u, d] = Xe(c.getFullYear()), [f, h] = Xe(c.getMonth()), [p, g] = Xe("days"), [y, m] = Xe(null), b = gn(() => new Set(t), [t]), C = (K) => {
    b.has(K) ? e(t.filter((se) => se !== K)) : e([...t, K]);
  }, E = gn(() => {
    const K = uk(u, f), se = new Date(u, f, 1).getDay(), le = [];
    for (let Ce = 0; Ce < se; Ce++) le.push({ key: `pad-${Ce}`, day: 0, empty: !0 });
    for (let Ce = 1; Ce <= K; Ce++) le.push({ key: dk(u, f, Ce), day: Ce, empty: !1 });
    return le;
  }, [u, f]), v = (K) => d((se) => Math.max(Ul, Math.min(Gl, se + K))), T = (K) => {
    f + K < 0 ? (d((se) => Math.max(Ul, se - 1)), h(11)) : f + K > 11 ? (d((se) => Math.min(Gl, se + 1)), h(0)) : h((se) => se + K);
  }, D = () => {
    if (y === null) return;
    const K = parseInt(y, 10);
    !isNaN(K) && K >= Ul && K <= Gl && d(K), m(null);
  }, P = (K) => t.some((se) => se.startsWith(`${u}-${String(K + 1).padStart(2, "0")}`)), k = mn(), z = Ie(4, 8, k), S = Ie(16, 20, k), x = Ie(10, 11, k), I = Ie(6, 8, k), _ = Ie(12, 14, k), M = Ie(6, 10, k), O = Ie(12, 14, k), L = Ie(8, 12, k), W = Ie(10, 12, k), re = Ie(6, 10, k), F = Ie(2, 6, k), N = Ie(64, 80, k), te = { padding: z }, G = { width: S, height: S }, j = { fontSize: x, paddingTop: I, paddingBottom: I }, ee = { fontSize: _, paddingTop: M, paddingBottom: M }, q = { fontSize: O, paddingTop: L, paddingBottom: L }, Q = { fontSize: W, padding: `${F}px ${re}px` }, X = "bg-[var(--ui-date-selected-bg)] text-[color:var(--ui-date-selected-text)] hover:bg-[var(--ui-date-selected-hover-bg)]", J = "text-[color:var(--ui-text)] hover:bg-[var(--ui-card-hover)]";
  return /* @__PURE__ */ fe("div", { "data-mode": a, "data-accent": s == null ? void 0 : s.accent, "data-surface": s == null ? void 0 : s.surface, className: `border rounded-lg overflow-hidden w-full border-[color:var(--ui-border-strong)] bg-[var(--ui-date-body-bg)] text-[color:var(--ui-text)] ${i}`, children: [
    /* @__PURE__ */ fe("div", { className: "flex items-center justify-between px-3 py-2 border-b bg-[var(--ui-date-header-bg)] text-[color:var(--ui-date-header-text)] border-[color:var(--ui-border)]", children: [
      /* @__PURE__ */ A(
        "button",
        {
          type: "button",
          onClick: () => p === "months" ? v(-1) : T(-1),
          style: te,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": p === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ A($w, { style: G })
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
          children: /* @__PURE__ */ A(La, { style: G })
        }
      )
    ] }),
    p === "months" ? /* @__PURE__ */ fe("div", { children: [
      /* @__PURE__ */ A("div", { className: "grid grid-cols-3 text-center", children: ck.map((K, se) => /* @__PURE__ */ fe(
        "button",
        {
          type: "button",
          onClick: () => {
            h(se), g("days");
          },
          style: q,
          className: `relative font-medium transition-colors border-b border-[color:var(--ui-border)] ${se === f ? X : J}`,
          children: [
            K,
            P(se) && /* @__PURE__ */ A("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${se === f ? "bg-[var(--ui-date-selected-text)]" : "bg-[var(--ui-accent-solid)]"}` })
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
          style: { paddingTop: M, paddingBottom: M, fontSize: _ },
          className: "px-3 font-semibold rounded transition-colors text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-card-hover)]",
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ fe("div", { className: "grid grid-cols-7 text-center", children: [
      lk.map((K) => /* @__PURE__ */ A("div", { style: j, className: "font-semibold uppercase tracking-wider border-b text-[color:var(--ui-text-faint)] border-[color:var(--ui-border)]", children: K }, K)),
      E.map((K) => K.empty ? /* @__PURE__ */ A("div", {}, K.key) : /* @__PURE__ */ A(
        "button",
        {
          type: "button",
          onClick: () => C(K.key),
          style: ee,
          className: `font-medium transition-colors border-b border-[color:var(--ui-border)] ${b.has(K.key) ? X : J}`,
          children: K.day
        },
        K.key
      ))
    ] }),
    r && t.length > 0 && /* @__PURE__ */ fe("div", { className: "px-3 py-2 border-t border-[color:var(--ui-border)] bg-[var(--ui-date-footer-bg)]", children: [
      /* @__PURE__ */ fe("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-[color:var(--ui-text-muted)]", children: [
        t.length,
        " date",
        t.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ A("div", { className: "flex flex-wrap gap-1", children: t.map((K) => {
        const se = /* @__PURE__ */ new Date(K + "T00:00:00"), le = se.getFullYear() === l.getFullYear() ? se.toLocaleString("default", { month: "short", day: "numeric" }) : se.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ fe(
          "button",
          {
            type: "button",
            onClick: () => C(K),
            "aria-label": `Remove ${le}`,
            style: Q,
            className: "inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors bg-[var(--ui-date-chip-bg)] text-[color:var(--ui-date-chip-text)] hover:bg-[var(--ui-date-chip-hover-bg)]",
            children: [
              le,
              /* @__PURE__ */ A("span", { className: "leading-none text-[color:var(--ui-text-muted)]", "aria-hidden": "true", children: "×" })
            ]
          },
          K
        );
      }) })
    ] })
  ] });
}
function i3({
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
  const h = (E) => e instanceof Set ? e.has(E) : e.includes(E), p = mn(), g = Ie(12, 16, p), y = Ie(8, 12, p), m = Ie(12, 14, p), b = Ie(16, 20, p), C = r != null || i != null;
  return /* @__PURE__ */ fe("div", { className: f, ...d ? { "data-theme": d } : {}, children: [
    C && /* @__PURE__ */ fe("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ A("span", { className: "ui-checklist-title", children: r }),
      i != null && /* @__PURE__ */ A("button", { type: "button", disabled: c, onClick: i, className: "ui-checklist-toggleall", children: s ?? (o ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ fe(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${c ? "ui-checklist-disabled" : ""}`,
        style: l ? { maxHeight: l, overflowY: "auto" } : void 0,
        children: [
          t.map((E) => {
            const v = h(E.id), T = /* @__PURE__ */ A(Ff, { checked: v, size: b });
            return /* @__PURE__ */ fe(
              "button",
              {
                type: "button",
                disabled: c,
                onClick: () => n(E.id),
                "aria-pressed": v,
                className: `ui-checklist-item ${v ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${y}px ${g}px`, fontSize: m },
                ...E.dataProps,
                children: [
                  u === "leading" && T,
                  E.leading != null && /* @__PURE__ */ A("span", { className: "ui-checklist-leading", children: E.leading }),
                  /* @__PURE__ */ A("span", { className: "ui-checklist-label", children: E.label }),
                  E.secondary != null && /* @__PURE__ */ A("span", { className: "ui-checklist-secondary", children: E.secondary }),
                  u === "trailing" && /* @__PURE__ */ A("span", { className: "ml-auto flex shrink-0", children: T })
                ]
              },
              E.id
            );
          }),
          t.length === 0 && /* @__PURE__ */ A("div", { className: "ui-checklist-empty", children: a })
        ]
      }
    )
  ] });
}
function o3({
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
  const u = mn(), d = s ? 10 : Ie(12, 16, u), f = s ? 6 : Ie(8, 12, u), h = s ? 12 : Ie(12, 14, u), p = s ? 14 : Ie(16, 20, u);
  return /* @__PURE__ */ fe("div", { className: c, ...l ? { "data-theme": l } : {}, children: [
    r != null && /* @__PURE__ */ A("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ A("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ fe(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${a ? "ui-checklist-disabled" : ""}`,
        style: o ? { maxHeight: o, overflowY: "auto" } : void 0,
        children: [
          t.map((g) => {
            const y = e === g.id;
            return /* @__PURE__ */ fe(
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
const s3 = ({
  className: t,
  children: e,
  reference: n,
  placement: r = "top",
  anchorMode: i = "visible",
  offset: o = 8
}) => {
  const s = $s(), { refs: a, floatingStyles: l } = Zw({
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
      jy(o),
      Ky({ padding: 8 }),
      Uy({ padding: 8 }),
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
    whileElementsMounted: Qw
  });
  return Nn(() => {
    n && a.setReference(n);
  }, [n, a]), /* @__PURE__ */ fe(Dn, { children: [
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
function fk(t, e) {
  if (!e || !_t.isValidElement(t)) return {};
  const n = t.props;
  if (n["aria-label"] || n.title) return {};
  const r = n.children;
  if (typeof r == "string" ? r.trim().length > 0 : Array.isArray(r) ? r.some((s) => typeof s == "string" && s.trim().length > 0) : !1) return {};
  const o = e.split(`
`)[0].replace(/^•\s*/, "").trim().slice(0, 80);
  return o ? { "aria-label": o } : {};
}
const Co = ({ content: t, children: e }) => {
  const n = vr(), r = mn(), i = Ie(10, 12, r), o = Ie(6, 6, r), s = Ie(10, 12, r), a = { padding: `${o}px ${i}px`, fontSize: s }, l = oo(), c = $s(), [u, d] = Xe(!1), [f, h] = Xe({ x: 0, y: 0 }), p = Y(null), g = Y(null), y = () => {
    if (!p.current) return;
    const C = p.current.getBoundingClientRect();
    h({ x: C.left + C.width / 2, y: C.top });
  };
  Ye(() => () => {
    g.current && clearTimeout(g.current);
  }, []), Ye(() => (u && c && (y(), c.addEventListener("scroll", y, !0)), () => c == null ? void 0 : c.removeEventListener("scroll", y, !0)), [u]);
  const m = fk(e, t), b = Object.keys(m).length > 0 ? _t.cloneElement(e, m) : e;
  return /* @__PURE__ */ fe(
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
          /* @__PURE__ */ fe(
            "div",
            {
              "data-mode": n == null ? void 0 : n.mode,
              "data-accent": n == null ? void 0 : n.accent,
              className: "ui-tooltip fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-[color:var(--ui-tooltip-border)] bg-[var(--ui-tooltip-bg)] text-[color:var(--ui-tooltip-text)] pointer-events-none",
              style: { ...a, left: f.x, top: f.y - 4, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                t.split(`
• `).map((C, E) => /* @__PURE__ */ A("div", { className: E > 0 ? "mt-0.5 pt-0.5 border-t border-[color:var(--ui-tooltip-sep)]" : "", children: C }, E)),
                /* @__PURE__ */ A("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[color:var(--ui-tooltip-bg)]" })
              ]
            }
          ),
          l ?? document.body
        )
      ]
    }
  );
}, hk = 250;
function pk(t, e, n) {
  const [r, i] = _t.useState(null), [o, s] = _t.useState(!1), a = _t.useRef(null), l = _t.useRef(n);
  l.current = n;
  const c = _t.useCallback(() => {
    var f;
    const d = (f = e.current) == null ? void 0 : f[l.current];
    d && i({ left: d.offsetLeft, width: d.offsetWidth });
  }, [e]);
  _t.useLayoutEffect(() => {
    c();
  }, [n, c]), _t.useLayoutEffect(() => {
    const d = t.current;
    if (!d) return;
    const f = () => {
      s(!0), a.current && clearTimeout(a.current), a.current = setTimeout(() => s(!1), hk), c();
    }, h = new ResizeObserver(f);
    h.observe(d);
    for (const p of e.current ?? []) p && h.observe(p);
    return () => {
      h.disconnect(), a.current && (clearTimeout(a.current), a.current = null);
    };
  }, [t, e, c]);
  const u = _t.useMemo(
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
  const t = mn(), e = Pn, n = e ? Ie(28, 40, t) : 28, r = e ? Ie(28, 40, t) : 28, i = e ? Ie(10, 14, t) : 10, o = e ? Ie(10, 14, t) : 10, s = e ? Ie(8, 10, t) : 8;
  return {
    toggle: { width: n, height: n },
    control: { height: r, padding: `0 ${i}px`, fontSize: o },
    input: { height: r, padding: `0 ${s}px`, fontSize: o }
  };
}
const a3 = Pn ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", gk = Pn ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", ua = Pn ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", mk = "hover:bg-red-950/50", l3 = Pn ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", c3 = "bg-[var(--ui-accent-selected-bg)] border-[var(--ui-border-strong)] text-[color:var(--ui-accent-selected-text)]", u3 = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", yk = Pn ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", d3 = Pn ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50", wb = Pn ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", bk = "inline-flex rounded-[var(--ui-radius-btn)] overflow-hidden border border-[var(--ui-border-strong)]", vk = Pn ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", da = ({ onClick: t, disabled: e, title: n, className: r = gk, children: i }) => {
  const o = fl();
  return /* @__PURE__ */ A(Co, { content: n, children: /* @__PURE__ */ A("button", { onClick: t, disabled: e, "aria-label": n, style: o.control, className: `${r} ${e ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) });
}, fa = {
  wrap: "border-[color:var(--ui-border-strong)] bg-[var(--ui-seg-track-bg)]",
  pill: "bg-[var(--ui-seg-pill)]",
  active: "text-[color:var(--ui-accent-pill-text)]",
  idle: "text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-seg-hover)]"
}, f3 = ({ value: t, options: e, onChange: n, disabled: r, active: i, stretch: o, dense: s, variant: a = "chrome", theme: l, tablist: c, iconCollapse: u = !1, iconWithLabel: d = !0, ariaLabel: f }) => {
  const h = vr(), p = l ?? Tx(h), g = l === "blue" || l === "emerald" ? l : (h == null ? void 0 : h.accent) ?? "zinc", y = { "data-mode": p === "dark" ? "dark" : "light", "data-accent": g }, m = fl(), b = mn(), C = s && !Pn ? 24 : m.control.height, E = _i({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), v = Pn ? E : { padding: "0 12px", fontSize: 12, height: s ? 20 : 24 }, T = (S) => i ? i(S) : t === S, D = _t.useRef(null), P = _t.useRef([]), k = Math.max(0, e.findIndex((S) => T(S.v))), z = pk(D, P, k);
  return a === "track" ? /* @__PURE__ */ fe(
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
        e.map((S, x) => {
          const I = T(S.v), _ = u && !!S.icon;
          return /* @__PURE__ */ A(
            "button",
            {
              ref: (M) => {
                P.current[x] = M;
              },
              ...S.dataProps,
              type: "button",
              disabled: r,
              onClick: () => n(S.v),
              title: S.title,
              role: c ? "tab" : void 0,
              "aria-selected": c ? I : void 0,
              "aria-pressed": c ? void 0 : I,
              "aria-label": S.ariaLabel ?? (S.l ? void 0 : S.title),
              style: v,
              className: `relative z-10 inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-[var(--ui-radius-inset)] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${_ ? "group gap-0" : "gap-1.5"} ${o ? "flex-1" : ""} ${I ? fa.active : fa.idle}`,
              children: /* @__PURE__ */ A(
                lb,
                {
                  icon: S.icon,
                  collapse: _,
                  iconWithLabel: d,
                  active: I,
                  gap: Ie(6, 8, b),
                  children: S.l
                }
              )
            },
            S.v
          );
        })
      ]
    }
  ) : /* @__PURE__ */ fe("div", { ref: D, className: `relative ${bk} bg-[var(--ui-seg-track-bg)]${o ? " w-full" : ""}`, children: [
    z.style && /* @__PURE__ */ A(
      "span",
      {
        "aria-hidden": !0,
        className: `absolute bg-[var(--ui-accent-pill-bg)] ${z.motionClass}`,
        style: { ...z.style, top: 0, bottom: 0 }
      }
    ),
    e.map((S, x) => {
      const I = T(S.v);
      return /* @__PURE__ */ fe(
        "button",
        {
          ref: (_) => {
            P.current[x] = _;
          },
          ...S.dataProps,
          disabled: r,
          onClick: () => n(S.v),
          title: S.title,
          style: { ...m.control, height: C },
          className: `relative z-10 font-medium transition-colors disabled:opacity-30 ${o ? "flex-1" : ""} ${I ? "text-[color:var(--ui-accent-pill-text)]" : "text-[color:var(--ui-text-muted)] hover:bg-[var(--ui-accent-hover-bg)]"} ${S.v !== e[e.length - 1].v ? "border-r border-[var(--ui-border)]" : ""}`,
          children: [
            S.icon,
            S.l
          ]
        },
        S.v
      );
    })
  ] });
}, h3 = ({ children: t }) => /* @__PURE__ */ fe("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ A("span", { className: Pn ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: t }),
  /* @__PURE__ */ A("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), wk = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", xk = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", p3 = ({ label: t, children: e, tall: n }) => /* @__PURE__ */ fe("div", { className: n ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  t && /* @__PURE__ */ A("span", { className: n ? wk : xk, children: t }),
  e
] }), g3 = ({ leading: t, trailing: e, className: n = "" }) => /* @__PURE__ */ fe("div", { className: `flex flex-wrap items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-0 ${n}`, children: [
  t,
  e && /* @__PURE__ */ A("div", { className: "ml-auto flex flex-wrap items-center justify-end gap-1", children: e })
] }), m3 = ({ readOnly: t, onDuplicate: e, onRemove: n, onMove: r, compact: i }) => (
  // One unbreakable cluster: when a header's trailing wraps, the move pair and
  // the duplicate/delete pair stay together (no orphaned icons on a line).
  /* @__PURE__ */ fe("div", { className: "flex items-center gap-1 shrink-0", children: [
    /* @__PURE__ */ A(da, { onClick: () => r(-1), disabled: t, title: "Move up", className: ua, children: /* @__PURE__ */ A(Fw, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ A(da, { onClick: () => r(1), disabled: t, title: "Move down", className: ua, children: /* @__PURE__ */ A(Hw, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ A(da, { onClick: e, disabled: t, title: "Duplicate", className: ua, children: /* @__PURE__ */ A(qy, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ A("div", { className: wb }),
    /* @__PURE__ */ A(da, { onClick: n, disabled: t, title: "Delete", className: `${ua} ${mk}`, children: /* @__PURE__ */ A(za, { className: "w-2.5 h-2.5" }) })
  ] })
);
var fp = Object.defineProperty, kk = (t, e) => {
  let n = {};
  for (var r in t) fp(n, r, {
    get: t[r],
    enumerable: !0
  });
  return fp(n, Symbol.toStringTag, { value: "Module" }), n;
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
function xb(t, e, n) {
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
      return l && l < s.length && l < a.length && Cb(s.charCodeAt(l - 1)) && Sb(s.charCodeAt(l)) && n--, n;
    }
    if (i.content.size || o.content.size) {
      let s = xb(i.content, o.content, n + 1);
      if (s != null)
        return s;
    }
    n += i.nodeSize;
  }
}
function kb(t, e, n, r) {
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
      return d && f && d < c.length && Cb(c.charCodeAt(d - 1)) && Sb(c.charCodeAt(d)) && (n++, r++), { a: n, b: r };
    }
    if (s.content.size || a.content.size) {
      let c = kb(s.content, a.content, n - 1, r - 1);
      if (c)
        return c;
    }
    n -= l, r -= l;
  }
}
function Sb(t) {
  return t >= 56320 && t < 57344;
}
function Cb(t) {
  return t >= 55296 && t < 56320;
}
class De {
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
    return new De(i, this.size + e.size);
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
    return new De(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, n) {
    return e == n ? De.empty : e == 0 && n == this.content.length ? this : new De(this.content.slice(e, n));
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
    return i[e] = n, new De(i, o);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new De([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new De(this.content.concat(e), this.size + e.nodeSize);
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
    return xb(this, e, n);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, n = this.size, r = e.size) {
    return kb(this, e, n, r);
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
      return De.empty;
    if (!Array.isArray(n))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return De.fromArray(n.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return De.empty;
    let n, r = 0;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      r += o.nodeSize, i && o.isText && e[i - 1].sameMarkup(o) ? (n || (n = e.slice(0, i)), n[n.length - 1] = o.withText(n[n.length - 1].text + o.text)) : n && n.push(o);
    }
    return new De(n || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return De.empty;
    if (e instanceof De)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new De([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
De.empty = new De([], 0);
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
let Rn = class pf {
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
      return pf.none;
    if (e instanceof pf)
      return [e];
    let n = e.slice();
    return n.sort((r, i) => r.type.rank - i.type.rank), n;
  }
};
Rn.none = [];
class Ms extends Error {
}
class ct {
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
    let r = Tb(this.content, e + this.openStart, n, this.openStart + 1, this.openEnd + 1);
    return r && new ct(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, n) {
    return new ct(Rb(this.content, e + this.openStart, n + this.openStart), this.openStart, this.openEnd);
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
      return ct.empty;
    let r = n.openStart || 0, i = n.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new ct(De.fromJSON(e, n.content), r, i);
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
    return new ct(e, r, i);
  }
}
ct.empty = new ct(De.empty, 0, 0);
function Rb(t, e, n) {
  let { index: r, offset: i } = t.findIndex(e), o = t.maybeChild(r), { index: s, offset: a } = t.findIndex(n);
  if (i == e || o.isText) {
    if (a != n && !t.child(s).isText)
      throw new RangeError("Removing non-flat range");
    return t.cut(0, e).append(t.cut(n));
  }
  if (r != s)
    throw new RangeError("Removing non-flat range");
  return t.replaceChild(r, o.copy(Rb(o.content, e - i - 1, n - i - 1)));
}
function Tb(t, e, n, r, i, o) {
  let { index: s, offset: a } = t.findIndex(e), l = t.maybeChild(s);
  if (a == e || l.isText)
    return o && r <= 0 && i <= 0 && !o.canReplace(s, s, n) ? null : t.cut(0, e).append(n).append(t.cut(e));
  let c = Tb(l.content, e - a - 1, n, s == 0 ? r - 1 : 0, s == t.childCount - 1 ? i - 1 : 0, l);
  return c && t.replaceChild(s, l.copy(c));
}
function Sk(t, e, n) {
  if (n.openStart > t.depth)
    throw new Ms("Inserted content deeper than insertion position");
  if (t.depth - n.openStart != e.depth - n.openEnd)
    throw new Ms("Inconsistent open depths");
  return Eb(t, e, n, 0);
}
function Eb(t, e, n, r) {
  let i = t.index(r), o = t.node(r);
  if (i == e.index(r) && r < t.depth - n.openStart) {
    let s = Eb(t, e, n, r + 1);
    return o.copy(o.content.replaceChild(i, s));
  } else if (n.content.size)
    if (!n.openStart && !n.openEnd && t.depth == r && e.depth == r) {
      let s = t.parent, a = s.content;
      return Ji(s, a.cut(0, t.parentOffset).append(n.content).append(a.cut(e.parentOffset)));
    } else {
      let { start: s, end: a } = Ck(n, t);
      return Ji(o, Ib(t, s, a, e, r));
    }
  else return Ji(o, qa(t, e, r));
}
function Mb(t, e) {
  if (!e.type.compatibleContent(t.type))
    throw new Ms("Cannot join " + e.type.name + " onto " + t.type.name);
}
function gf(t, e, n) {
  let r = t.node(n);
  return Mb(r, e.node(n)), r;
}
function Vi(t, e) {
  let n = e.length - 1;
  n >= 0 && t.isText && t.sameMarkup(e[n]) ? e[n] = t.withText(e[n].text + t.text) : e.push(t);
}
function vs(t, e, n, r) {
  let i = (e || t).node(n), o = 0, s = e ? e.index(n) : i.childCount;
  t && (o = t.index(n), t.depth > n ? o++ : t.textOffset && (Vi(t.nodeAfter, r), o++));
  for (let a = o; a < s; a++)
    Vi(i.child(a), r);
  e && e.depth == n && e.textOffset && Vi(e.nodeBefore, r);
}
function Ji(t, e) {
  if (!t.type.validContent(e))
    throw new Ms("Invalid content for node " + t.type.name);
  return t.copy(e);
}
function Ib(t, e, n, r, i) {
  let o = t.depth > i && gf(t, e, i + 1), s = r.depth > i && gf(n, r, i + 1), a = [];
  return vs(null, t, i, a), o && s && e.index(i) == n.index(i) ? (Mb(o, s), Vi(Ji(o, Ib(t, e, n, r, i + 1)), a)) : (o && Vi(Ji(o, qa(t, e, i + 1)), a), vs(e, n, i, a), s && Vi(Ji(s, qa(n, r, i + 1)), a)), vs(r, null, i, a), new De(a);
}
function qa(t, e, n) {
  let r = [];
  if (vs(null, t, n, r), t.depth > n) {
    let i = gf(t, e, n + 1);
    Vi(Ji(i, qa(t, e, n + 1)), r);
  }
  return vs(e, null, n, r), new De(r);
}
function Ck(t, e) {
  let n = e.depth - t.openStart, i = e.node(n).copy(t.content);
  for (let o = n - 1; o >= 0; o--)
    i = e.node(o).copy(De.from(i));
  return {
    start: i.resolveNoCache(t.openStart + n),
    end: i.resolveNoCache(i.content.size - t.openEnd - n)
  };
}
class Is {
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
    return new Is(n, r, o);
  }
  /**
  @internal
  */
  static resolveCached(e, n) {
    let r = hp.get(e);
    if (r)
      for (let o = 0; o < r.elts.length; o++) {
        let s = r.elts[o];
        if (s.pos == n)
          return s;
      }
    else
      hp.set(e, r = new Rk());
    let i = r.elts[r.i] = Is.resolve(e, n);
    return r.i = (r.i + 1) % Tk, i;
  }
}
class Rk {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const Tk = 12, hp = /* @__PURE__ */ new WeakMap();
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
const Ek = /* @__PURE__ */ Object.create(null);
let Oo = class mf {
  /**
  @internal
  */
  constructor(e, n, r, i = Rn.none) {
    this.type = e, this.attrs = n, this.marks = i, this.content = r || De.empty;
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
    return this.type == e && Ba(this.attrs, n || e.defaultAttrs || Ek) && Rn.sameSet(this.marks, r || Rn.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new mf(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new mf(this.type, this.attrs, this.content, e);
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
      return ct.empty;
    let i = this.resolve(e), o = this.resolve(n), s = r ? 0 : i.sharedDepth(n), a = i.start(s), c = i.node(s).content.cut(i.pos - a, o.pos - a);
    return new ct(c, i.depth - s, o.depth - s);
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
    return Sk(this.resolve(e), this.resolve(n), r);
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
    return Is.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return Is.resolve(this, e);
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
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), Ab(this.marks, e);
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
  canReplace(e, n, r = De.empty, i = 0, o = r.childCount) {
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
    this.type.checkContent(this.content), pp(this.type.attrs, this.attrs, "node", this.type.name);
    let e = Rn.none;
    for (let n = 0; n < this.marks.length; n++) {
      let r = this.marks[n];
      pp(r.type.attrs, r.attrs, "mark", r.type.name), e = r.addToSet(e);
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
    let i = De.fromJSON(e, n.content);
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
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : Ab(this.marks, JSON.stringify(this.text));
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
function Ab(t, e) {
  for (let n = t.length - 1; n >= 0; n--)
    e = t[n].type.name + "(" + e + ")";
  return e;
}
function pp(t, e, n, r) {
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
    let r = new Mk(e, n);
    if (r.next == null)
      return to.empty;
    let i = _b(r);
    r.next && r.err("Unexpected trailing text");
    let o = Ok(Nk(i));
    return zk(o, r), o;
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
        return De.from(a.map((c) => c.createAndFill()));
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
class Mk {
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
function _b(t) {
  let e = [];
  do
    e.push(Ik(t));
  while (t.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function Ik(t) {
  let e = [];
  do
    e.push(Ak(t));
  while (t.next && t.next != ")" && t.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function Ak(t) {
  let e = Dk(t);
  for (; ; )
    if (t.eat("+"))
      e = { type: "plus", expr: e };
    else if (t.eat("*"))
      e = { type: "star", expr: e };
    else if (t.eat("?"))
      e = { type: "opt", expr: e };
    else if (t.eat("{"))
      e = _k(t, e);
    else
      break;
  return e;
}
function gp(t) {
  /\D/.test(t.next) && t.err("Expected number, got '" + t.next + "'");
  let e = Number(t.next);
  return t.pos++, e;
}
function _k(t, e) {
  let n = gp(t), r = n;
  return t.eat(",") && (t.next != "}" ? r = gp(t) : r = -1), t.eat("}") || t.err("Unclosed braced range"), { type: "range", min: n, max: r, expr: e };
}
function Pk(t, e) {
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
function Dk(t) {
  if (t.eat("(")) {
    let e = _b(t);
    return t.eat(")") || t.err("Missing closing paren"), e;
  } else if (/\W/.test(t.next))
    t.err("Unexpected token '" + t.next + "'");
  else {
    let e = Pk(t, t.next).map((n) => (t.inline == null ? t.inline = n.isInline : t.inline != n.isInline && t.err("Mixing inline and block content"), { type: "name", value: n }));
    return t.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function Nk(t) {
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
function Pb(t, e) {
  return e - t;
}
function mp(t, e) {
  let n = [];
  return r(e), n.sort(Pb);
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
function Ok(t) {
  let e = /* @__PURE__ */ Object.create(null);
  return n(mp(t, 0));
  function n(r) {
    let i = [];
    r.forEach((s) => {
      t[s].forEach(({ term: a, to: l }) => {
        if (!a)
          return;
        let c;
        for (let u = 0; u < i.length; u++)
          i[u][0] == a && (c = i[u][1]);
        mp(t, l).forEach((u) => {
          c || i.push([a, c = []]), c.indexOf(u) == -1 && c.push(u);
        });
      });
    });
    let o = e[r.join(",")] = new to(r.indexOf(t.length - 1) > -1);
    for (let s = 0; s < i.length; s++) {
      let a = i[s][1].sort(Pb);
      o.next.push({ type: i[s][0], next: e[a.join(",")] || n(a) });
    }
    return o;
  }
}
function zk(t, e) {
  for (let n = 0, r = [t]; n < r.length; n++) {
    let i = r[n], o = !i.validEnd, s = [];
    for (let a = 0; a < i.next.length; a++) {
      let { type: l, next: c } = i.next[a];
      s.push(l.name), o && !(l.isText || l.hasRequiredAttrs()) && (o = !1), r.indexOf(c) == -1 && r.push(c);
    }
    o && e.err("Only non-generatable nodes (" + s.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function Db(t) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let n in t) {
    let r = t[n];
    if (!r.hasDefault)
      return null;
    e[n] = r.default;
  }
  return e;
}
function Nb(t, e) {
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
function Ob(t, e) {
  let n = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      n[r] = new $k(t, r, e[r]);
  return n;
}
class Ka {
  /**
  @internal
  */
  constructor(e, n, r) {
    this.name = e, this.schema = n, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = Ob(e, r.attrs), this.defaultAttrs = Db(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
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
    return !e && this.defaultAttrs ? this.defaultAttrs : Nb(this.attrs, e);
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
    return new Oo(this, this.computeAttrs(e), De.from(n), Rn.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, n, r) {
    return n = De.from(n), this.checkContent(n), new Oo(this, this.computeAttrs(e), n, Rn.setFrom(r));
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
    if (e = this.computeAttrs(e), n = De.from(n), n.size) {
      let s = this.contentMatch.fillBefore(n);
      if (!s)
        return null;
      n = s.append(n);
    }
    let i = this.contentMatch.matchFragment(n), o = i && i.fillBefore(De.empty, !0);
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
function Lk(t, e, n) {
  let r = n.split("|");
  return (i) => {
    let o = i === null ? "null" : typeof i;
    if (r.indexOf(o) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${t}, got ${o}`);
  };
}
class $k {
  constructor(e, n, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? Lk(e, n, r.validate) : r.validate;
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
    this.name = e, this.rank = n, this.schema = r, this.spec = i, this.attrs = Ob(e, i.attrs), this.excluded = null;
    let o = Db(this.attrs);
    this.instance = o ? new Rn(this, o) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new Rn(this, Nb(this.attrs, e));
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
class Fk {
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
      o.markSet = a == "_" ? null : a ? yp(this, a.split(" ")) : a == "" || !o.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let o = this.marks[i], s = o.spec.excludes;
      o.excluded = s == null ? [o] : s == "" ? [] : yp(this, s.split(" "));
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
function yp(t, e) {
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
function Hk(t) {
  return t.tag != null;
}
function Bk(t) {
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
      if (Hk(i))
        this.tags.push(i);
      else if (Bk(i)) {
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
    let r = new vp(this, n, !1);
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
    let r = new vp(this, n, !0);
    return r.addAll(e, Rn.none, n.from, n.to), ct.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, n, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let o = this.tags[i];
      if (jk(e, o.tag) && (o.namespace === void 0 || e.namespaceURI == o.namespace) && (!o.context || n.matchesContext(o.context))) {
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
        r(s = wp(s)), s.mark || s.ignore || s.clearMark || (s.mark = i);
      });
    }
    for (let i in e.nodes) {
      let o = e.nodes[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = wp(s)), s.node || s.ignore || s.mark || (s.node = i);
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
const zb = {
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
}, qk = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, Lb = { ol: !0, ul: !0 }, As = 1, yf = 2, ws = 4;
function bp(t, e, n) {
  return e != null ? (e ? As : 0) | (e === "full" ? yf : 0) : t && t.whitespace == "pre" ? As | yf : n & ~ws;
}
class pa {
  constructor(e, n, r, i, o, s) {
    this.type = e, this.attrs = n, this.marks = r, this.solid = i, this.options = s, this.content = [], this.activeMarks = Rn.none, this.match = o || (s & ws ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let n = this.type.contentMatch.fillBefore(De.from(e));
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
    if (!(this.options & As)) {
      let r = this.content[this.content.length - 1], i;
      if (r && r.isText && (i = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let o = r;
        r.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = o.withText(o.text.slice(0, o.text.length - i[0].length));
      }
    }
    let n = De.from(this.content);
    return !e && this.match && (n = n.append(this.match.fillBefore(De.empty, !0))), this.type ? this.type.create(this.attrs, n, this.marks) : n;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !zb.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class vp {
  constructor(e, n, r) {
    this.parser = e, this.options = n, this.isOpen = r, this.open = 0, this.localPreserveWS = !1;
    let i = n.topNode, o, s = bp(null, n.preserveWhitespace, 0) | (r ? ws : 0);
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
    let r = e.nodeValue, i = this.top, o = i.options & yf ? "full" : this.localPreserveWS || (i.options & As) > 0, { schema: s } = this.parser;
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
    Lb.hasOwnProperty(s) && this.parser.normalizeLists && Wk(e);
    let l = this.options.ruleFromNode && this.options.ruleFromNode(e) || (a = this.parser.matchTag(e, this, r));
    e: if (l ? l.ignore : qk.hasOwnProperty(s))
      this.findInside(e), this.ignoreFallback(e, n);
    else if (!l || l.skip || l.closeParent) {
      l && l.closeParent ? this.open = Math.max(0, this.open - 1) : l && l.skip.nodeType && (e = l.skip);
      let c, u = this.needsBlock;
      if (zb.hasOwnProperty(s))
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
        (o.type ? o.type.allowsMarkType(a.type) : xp(a.type, e.type)) && (s = a.addToSet(s));
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
    let a = bp(e, o, s.options);
    s.options & ws && s.content.length == 0 && (a |= ws);
    let l = Rn.none;
    return r = r.filter((c) => (s.type ? s.type.allowsMarkType(c.type) : xp(c.type, e)) ? (l = c.addToSet(l), !1) : !0), this.nodes.push(new pa(e, n, l, i, null, a)), this.open++, r;
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
      this.localPreserveWS && (this.nodes[n].options |= As);
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
function Wk(t) {
  for (let e = t.firstChild, n = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && Lb.hasOwnProperty(r) && n ? (n.appendChild(e), e = n) : r == "li" ? n = e : r && (n = null);
  }
}
function jk(t, e) {
  return (t.matches || t.msMatchesSelector || t.webkitMatchesSelector || t.mozMatchesSelector).call(t, e);
}
function wp(t) {
  let e = {};
  for (let n in t)
    e[n] = t[n];
  return e;
}
function xp(t, e) {
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
const $b = 65535, Fb = Math.pow(2, 16);
function Kk(t, e) {
  return t + e * Fb;
}
function kp(t) {
  return t & $b;
}
function Uk(t) {
  return (t - (t & $b)) / Fb;
}
const Hb = 1, Bb = 2, Pa = 4, qb = 8;
class bf {
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
    return (this.delInfo & qb) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (Hb | Pa)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (Bb | Pa)) > 0;
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
    let n = 0, r = kp(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        n += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + n + Uk(e);
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
        let p = e == (n < 0 ? l : d) ? null : Kk(a / 3, e - l), g = e == l ? Bb : e == d ? Hb : Pa;
        return (n < 0 ? e != l : e != d) && (g |= qb), new bf(h, g, p);
      }
      i += u - c;
    }
    return r ? e + i : new bf(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, n) {
    let r = 0, i = kp(n), o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
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
    return r ? e : new bf(e, i, null);
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
      if (o instanceof Ms)
        return Bn.fail(o.message);
      throw o;
    }
  }
}
function Yf(t, e, n) {
  let r = [];
  for (let i = 0; i < t.childCount; i++) {
    let o = t.child(i);
    o.content.size && (o = o.copy(Yf(o.content, e, o))), o.isInline && (o = e(o, n, i)), r.push(o);
  }
  return De.fromArray(r);
}
class Ii extends Zn {
  /**
  Create a mark step.
  */
  constructor(e, n, r) {
    super(), this.from = e, this.to = n, this.mark = r;
  }
  apply(e) {
    let n = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new ct(Yf(n.content, (s, a) => !s.isAtom || !a.type.allowsMarkType(this.mark.type) ? s : s.mark(this.mark.addToSet(s.marks)), i), n.openStart, n.openEnd);
    return Bn.fromReplace(e, this.from, this.to, o);
  }
  invert() {
    return new Wr(this.from, this.to, this.mark);
  }
  map(e) {
    let n = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return n.deleted && r.deleted || n.pos >= r.pos ? null : new Ii(n.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof Ii && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new Ii(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new Ii(n.from, n.to, e.markFromJSON(n.mark));
  }
}
Zn.jsonID("addMark", Ii);
class Wr extends Zn {
  /**
  Create a mark-removing step.
  */
  constructor(e, n, r) {
    super(), this.from = e, this.to = n, this.mark = r;
  }
  apply(e) {
    let n = e.slice(this.from, this.to), r = new ct(Yf(n.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), n.openStart, n.openEnd);
    return Bn.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new Ii(this.from, this.to, this.mark);
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
class Ai extends Zn {
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
    return Bn.fromReplace(e, this.pos, this.pos + 1, new ct(De.from(r), 0, n.isLeaf ? 0 : 1));
  }
  invert(e) {
    let n = e.nodeAt(this.pos);
    if (n) {
      let r = this.mark.addToSet(n.marks);
      if (r.length == n.marks.length) {
        for (let i = 0; i < n.marks.length; i++)
          if (!n.marks[i].isInSet(r))
            return new Ai(this.pos, n.marks[i]);
        return new Ai(this.pos, this.mark);
      }
    }
    return new no(this.pos, this.mark);
  }
  map(e) {
    let n = e.mapResult(this.pos, 1);
    return n.deletedAfter ? null : new Ai(n.pos, this.mark);
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
    return new Ai(n.pos, e.markFromJSON(n.mark));
  }
}
Zn.jsonID("addNodeMark", Ai);
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
    return Bn.fromReplace(e, this.pos, this.pos + 1, new ct(De.from(r), 0, n.isLeaf ? 0 : 1));
  }
  invert(e) {
    let n = e.nodeAt(this.pos);
    return !n || !this.mark.isInSet(n.marks) ? this : new Ai(this.pos, this.mark);
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
    return this.structure && vf(e, this.from, this.to) ? Bn.fail("Structure replace would overwrite content") : Bn.fromReplace(e, this.from, this.to, this.slice);
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
      let n = this.slice.size + e.slice.size == 0 ? ct.empty : new ct(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new Hn(this.from, this.to + (e.to - e.from), n, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let n = this.slice.size + e.slice.size == 0 ? ct.empty : new ct(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
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
    return new Hn(n.from, n.to, ct.fromJSON(e, n.slice), !!n.structure);
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
    if (this.structure && (vf(e, this.from, this.gapFrom) || vf(e, this.gapTo, this.to)))
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
    return new Kn(n.from, n.to, n.gapFrom, n.gapTo, ct.fromJSON(e, n.slice), n.insert, !!n.structure);
  }
}
Zn.jsonID("replaceAround", Kn);
function vf(t, e, n) {
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
function Gk(t, e, n, r) {
  let i = [], o = [], s, a;
  t.doc.nodesBetween(e, n, (l, c, u) => {
    if (!l.isInline)
      return;
    let d = l.marks;
    if (!r.isInSet(d) && u.type.allowsMarkType(r.type)) {
      let f = Math.max(c, e), h = Math.min(c + l.nodeSize, n), p = r.addToSet(d);
      for (let g = 0; g < d.length; g++)
        d[g].isInSet(p) || (s && s.to == f && s.mark.eq(d[g]) ? s.to = h : i.push(s = new Wr(f, h, d[g])));
      a && a.to == f ? a.to = h : o.push(a = new Ii(f, h, r));
    }
  }), i.forEach((l) => t.step(l)), o.forEach((l) => t.step(l));
}
function Yk(t, e, n, r) {
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
function Xf(t, e, n, r = n.contentMatch, i = !0) {
  let o = t.doc.nodeAt(e), s = [], a = e + 1;
  for (let l = 0; l < o.childCount; l++) {
    let c = o.child(l), u = a + c.nodeSize, d = r.matchType(c.type);
    if (!d)
      s.push(new Hn(a, u, ct.empty));
    else {
      r = d;
      for (let f = 0; f < c.marks.length; f++)
        n.allowsMarkType(c.marks[f].type) || t.step(new Wr(a, u, c.marks[f]));
      if (i && c.isText && n.whitespace != "pre") {
        let f, h = /\r?\n|\r/g, p;
        for (; f = h.exec(c.text); )
          p || (p = new ct(De.from(n.schema.text(" ", n.allowedMarks(c.marks))), 0, 0)), s.push(new Hn(a + f.index, a + f.index + f[0].length, p));
      }
    }
    a = u;
  }
  if (!r.validEnd) {
    let l = r.fillBefore(De.empty, !0);
    t.replace(a, a, new ct(l, 0, 0));
  }
  for (let l = s.length - 1; l >= 0; l--)
    t.step(s[l]);
}
function Xk(t, e, n) {
  return (e == 0 || t.canReplace(e, t.childCount)) && (n == t.childCount || t.canReplace(0, n));
}
function jo(t) {
  let n = t.parent.content.cutByIndex(t.startIndex, t.endIndex);
  for (let r = t.depth, i = 0, o = 0; ; --r) {
    let s = t.$from.node(r), a = t.$from.index(r) + i, l = t.$to.indexAfter(r) - o;
    if (r < t.depth && s.canReplace(a, l, n))
      return r;
    if (r == 0 || s.type.spec.isolating || !Xk(s, a, l))
      break;
    a && (i = 1), l < s.childCount && (o = 1);
  }
  return null;
}
function Vk(t, e, n) {
  let { $from: r, $to: i, depth: o } = e, s = r.before(o + 1), a = i.after(o + 1), l = s, c = a, u = De.empty, d = 0;
  for (let p = o, g = !1; p > n; p--)
    g || r.index(p) > 0 ? (g = !0, u = De.from(r.node(p).copy(u)), d++) : l--;
  let f = De.empty, h = 0;
  for (let p = o, g = !1; p > n; p--)
    g || i.after(p + 1) < i.end(p) ? (g = !0, f = De.from(i.node(p).copy(f)), h++) : c++;
  t.step(new Kn(l, c, s, a, new ct(u.append(f), d, h), u.size - d, !0));
}
function Wb(t, e, n = null, r = t) {
  let i = Jk(t, e), o = i && Zk(r, e);
  return o ? i.map(Sp).concat({ type: e, attrs: n }).concat(o.map(Sp)) : null;
}
function Sp(t) {
  return { type: t, attrs: null };
}
function Jk(t, e) {
  let { parent: n, startIndex: r, endIndex: i } = t, o = n.contentMatchAt(r).findWrapping(e);
  if (!o)
    return null;
  let s = o.length ? o[0] : e;
  return n.canReplaceWith(r, i, s) ? o : null;
}
function Zk(t, e) {
  let { parent: n, startIndex: r, endIndex: i } = t, o = n.child(r), s = e.contentMatch.findWrapping(o.type);
  if (!s)
    return null;
  let l = (s.length ? s[s.length - 1] : e).contentMatch;
  for (let c = r; l && c < i; c++)
    l = l.matchType(n.child(c).type);
  return !l || !l.validEnd ? null : s;
}
function Qk(t, e, n) {
  let r = De.empty;
  for (let s = n.length - 1; s >= 0; s--) {
    if (r.size) {
      let a = n[s].type.contentMatch.matchFragment(r);
      if (!a || !a.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = De.from(n[s].type.create(n[s].attrs, r));
  }
  let i = e.start, o = e.end;
  t.step(new Kn(i, o, i, o, new ct(r, 0, 0), n.length, !0));
}
function eS(t, e, n, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let o = t.steps.length;
  t.doc.nodesBetween(e, n, (s, a) => {
    let l = typeof i == "function" ? i(s) : i;
    if (s.isTextblock && !s.hasMarkup(r, l) && tS(t.doc, t.mapping.slice(o).map(a), r)) {
      let c = null;
      if (r.schema.linebreakReplacement) {
        let h = r.whitespace == "pre", p = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        h && !p ? c = !1 : !h && p && (c = !0);
      }
      c === !1 && Kb(t, s, a, o), Xf(t, t.mapping.slice(o).map(a, 1), r, void 0, c === null);
      let u = t.mapping.slice(o), d = u.map(a, 1), f = u.map(a + s.nodeSize, 1);
      return t.step(new Kn(d, f, d + 1, f - 1, new ct(De.from(r.create(l, null, s.marks)), 0, 0), 1, !0)), c === !0 && jb(t, s, a, o), !1;
    }
  });
}
function jb(t, e, n, r) {
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
function Kb(t, e, n, r) {
  e.forEach((i, o) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let s = t.mapping.slice(r).map(n + 1 + o);
      t.replaceWith(s, s + 1, e.type.schema.text(`
`));
    }
  });
}
function tS(t, e, n) {
  let r = t.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, n);
}
function nS(t, e, n, r, i) {
  let o = t.doc.nodeAt(e);
  if (!o)
    throw new RangeError("No node at given position");
  n || (n = o.type);
  let s = n.create(r, null, i || o.marks);
  if (o.isLeaf)
    return t.replaceWith(e, e + o.nodeSize, s);
  if (!n.validContent(o.content))
    throw new RangeError("Invalid content for node type " + n.name);
  t.step(new Kn(e, e + o.nodeSize, e + 1, e + o.nodeSize - 1, new ct(De.from(s), 0, 0), 1, !0));
}
function di(t, e, n = 1, r) {
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
function rS(t, e, n = 1, r) {
  let i = t.doc.resolve(e), o = De.empty, s = De.empty;
  for (let a = i.depth, l = i.depth - n, c = n - 1; a > l; a--, c--) {
    o = De.from(i.node(a).copy(o));
    let u = r && r[c];
    s = De.from(u ? u.type.create(u.attrs, s) : i.node(a).copy(s));
  }
  t.step(new Hn(e, e, new ct(o.append(s), n, n), !0));
}
function so(t, e) {
  let n = t.resolve(e), r = n.index();
  return Ub(n.nodeBefore, n.nodeAfter) && n.parent.canReplace(r, r + 1);
}
function iS(t, e) {
  e.content.size || t.type.compatibleContent(e.type);
  let n = t.contentMatchAt(t.childCount), { linebreakReplacement: r } = t.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let o = e.child(i), s = o.type == r ? t.type.schema.nodes.text : o.type;
    if (n = n.matchType(s), !n || !t.type.allowsMarks(o.marks))
      return !1;
  }
  return n.validEnd;
}
function Ub(t, e) {
  return !!(t && e && !t.isLeaf && iS(t, e));
}
function pl(t, e, n = -1) {
  let r = t.resolve(e);
  for (let i = r.depth; ; i--) {
    let o, s, a = r.index(i);
    if (i == r.depth ? (o = r.nodeBefore, s = r.nodeAfter) : n > 0 ? (o = r.node(i + 1), a++, s = r.node(i).maybeChild(a)) : (o = r.node(i).maybeChild(a - 1), s = r.node(i + 1)), o && !o.isTextblock && Ub(o, s) && r.node(i).canReplace(a, a + 1))
      return e;
    if (i == 0)
      break;
    e = n < 0 ? r.before(i) : r.after(i);
  }
}
function oS(t, e, n) {
  let r = null, { linebreakReplacement: i } = t.doc.type.schema, o = t.doc.resolve(e - n), s = o.node().type;
  if (i && s.inlineContent) {
    let u = s.whitespace == "pre", d = !!s.contentMatch.matchType(i);
    u && !d ? r = !1 : !u && d && (r = !0);
  }
  let a = t.steps.length;
  if (r === !1) {
    let u = t.doc.resolve(e + n);
    Kb(t, u.node(), u.before(), a);
  }
  s.inlineContent && Xf(t, e + n - 1, s, o.node().contentMatchAt(o.index()), r == null);
  let l = t.mapping.slice(a), c = l.map(e - n);
  if (t.step(new Hn(c, l.map(e + n, -1), ct.empty, !0)), r === !0) {
    let u = t.doc.resolve(c);
    jb(t, u.node(), u.before(), t.steps.length);
  }
  return t;
}
function sS(t, e, n) {
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
function gl(t, e, n = e, r = ct.empty) {
  if (e == n && !r.size)
    return null;
  let i = t.resolve(e), o = t.resolve(n);
  return Gb(i, o, r) ? new Hn(e, n, r) : new aS(i, o, r).fit();
}
function Gb(t, e, n) {
  return !n.openStart && !n.openEnd && t.start() == e.start() && t.parent.canReplace(t.index(), e.index(), n.content);
}
class aS {
  constructor(e, n, r) {
    this.$from = e, this.$to = n, this.unplaced = r, this.frontier = [], this.placed = De.empty;
    for (let i = 0; i <= e.depth; i++) {
      let o = e.node(i);
      this.frontier.push({
        type: o.type,
        match: o.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = De.from(e.node(i).copy(this.placed));
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
    let l = new ct(o, s, a);
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
          if (n == 1 && (s ? c.matchType(s.type) || (d = c.fillBefore(De.from(s), !1)) : o && l.compatibleContent(o.type)))
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
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new ct(e, n + 1, Math.max(r, i.size + n >= e.size - r ? n + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: n, openEnd: r } = this.unplaced, i = Vl(e, n);
    if (i.childCount <= 1 && n > 0) {
      let o = e.size - n <= n + i.size;
      this.unplaced = new ct(ps(e, n - 1, 1), n - 1, o ? n - 1 : r);
    } else
      this.unplaced = new ct(ps(e, n, 1), n, r);
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
      c++, (c > 1 || l == 0 || g.content.size) && (d = y, u.push(Yb(g.mark(f.allowedMarks(g.marks)), c == 1 ? l : 0, c == a.childCount ? h : -1)));
    }
    let p = c == a.childCount;
    p || (h = -1), this.placed = gs(this.placed, n, De.from(u)), this.frontier[n].match = d, p && h < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let g = 0, y = a; g < h; g++) {
      let m = y.lastChild;
      this.frontier.push({ type: m.type, match: m.contentMatchAt(m.childCount) }), y = m.content;
    }
    this.unplaced = p ? e == 0 ? ct.empty : new ct(ps(s.content, e - 1, 1), e - 1, h < 0 ? s.openEnd : e - 1) : new ct(ps(s.content, e, c), s.openStart, s.openEnd);
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
    n.fit.childCount && (this.placed = gs(this.placed, n.depth, n.fit)), e = n.move;
    for (let r = n.depth + 1; r <= e.depth; r++) {
      let i = e.node(r), o = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, o);
    }
    return e;
  }
  openFrontierNode(e, n = null, r) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = gs(this.placed, this.depth, De.from(e.create(n, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let n = this.frontier.pop().match.fillBefore(De.empty, !0);
    n.childCount && (this.placed = gs(this.placed, this.frontier.length, n));
  }
}
function ps(t, e, n) {
  return e == 0 ? t.cutByIndex(n, t.childCount) : t.replaceChild(0, t.firstChild.copy(ps(t.firstChild.content, e - 1, n)));
}
function gs(t, e, n) {
  return e == 0 ? t.append(n) : t.replaceChild(t.childCount - 1, t.lastChild.copy(gs(t.lastChild.content, e - 1, n)));
}
function Vl(t, e) {
  for (let n = 0; n < e; n++)
    t = t.firstChild.content;
  return t;
}
function Yb(t, e, n) {
  if (e <= 0)
    return t;
  let r = t.content;
  return e > 1 && (r = r.replaceChild(0, Yb(r.firstChild, e - 1, r.childCount == 1 ? n - 1 : 0))), e > 0 && (r = t.type.contentMatch.fillBefore(r).append(r), n <= 0 && (r = r.append(t.type.contentMatch.matchFragment(r).fillBefore(De.empty, !0)))), t.copy(r);
}
function Jl(t, e, n, r, i) {
  let o = t.node(e), s = i ? t.indexAfter(e) : t.index(e);
  if (s == o.childCount && !n.compatibleContent(o.type))
    return null;
  let a = r.fillBefore(o.content, !0, s);
  return a && !lS(n, o.content, s) ? a : null;
}
function lS(t, e, n) {
  for (let r = n; r < e.childCount; r++)
    if (!t.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function cS(t) {
  return t.spec.defining || t.spec.definingForContent;
}
function uS(t, e, n, r) {
  if (!r.size)
    return t.deleteRange(e, n);
  let i = t.doc.resolve(e), o = t.doc.resolve(n);
  if (Gb(i, o, r))
    return t.step(new Hn(e, n, r));
  let s = Vb(i, o);
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
    let h = c[f], p = cS(h.type);
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
          return t.replace(i.before(y), m ? o.after(y) : n, new ct(Xb(r.content, 0, r.openStart, h), h, r.openEnd));
      }
  }
  let d = t.steps.length;
  for (let f = s.length - 1; f >= 0 && (t.replace(e, n, r), !(t.steps.length > d)); f--) {
    let h = s[f];
    h < 0 || (e = i.before(h), n = o.after(h));
  }
}
function Xb(t, e, n, r, i) {
  if (e < n) {
    let o = t.firstChild;
    t = t.replaceChild(0, o.copy(Xb(o.content, e + 1, n, r, o)));
  }
  if (e > r) {
    let o = i.contentMatchAt(0), s = o.fillBefore(t).append(t);
    t = s.append(o.matchFragment(s).fillBefore(De.empty, !0));
  }
  return t;
}
function dS(t, e, n, r) {
  if (!r.isInline && e == n && t.doc.resolve(e).parent.content.size) {
    let i = sS(t.doc, e, r.type);
    i != null && (e = n = i);
  }
  t.replaceRange(e, n, new ct(De.from(r), 0, 0));
}
function fS(t, e, n) {
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
  let o = Vb(r, i);
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
function Vb(t, e) {
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
    return Bn.fromReplace(e, this.pos, this.pos + 1, new ct(De.from(i), 0, n.isLeaf ? 0 : 1));
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
class _s extends Zn {
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
    return new _s(this.attr, e.attrs[this.attr]);
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
    return new _s(n.attr, n.value);
  }
}
Zn.jsonID("docAttr", _s);
let Fo = class extends Error {
};
Fo = function t(e) {
  let n = Error.call(this, e);
  return n.__proto__ = t.prototype, n;
};
Fo.prototype = Object.create(Error.prototype);
Fo.prototype.constructor = Fo;
Fo.prototype.name = "TransformError";
class hS {
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
  replace(e, n = e, r = ct.empty) {
    let i = gl(this.doc, e, n, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, n, r) {
    return this.replace(e, n, new ct(De.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, n) {
    return this.replace(e, n, ct.empty);
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
    return uS(this, e, n, r), this;
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
    return dS(this, e, n, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, n) {
    return fS(this, e, n), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, n) {
    return Vk(this, e, n), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, n = 1) {
    return oS(this, e, n), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, n) {
    return Qk(this, e, n), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, n = e, r, i = null) {
    return eS(this, e, n, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, n, r = null, i) {
    return nS(this, e, n, r, i), this;
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
    return this.step(new _s(e, n)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(e, n) {
    return this.step(new Ai(e, n)), this;
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
    return rS(this, e, n, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, n, r) {
    return Gk(this, e, n, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, n, r) {
    return Yk(this, e, n, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, n, r) {
    return Xf(this, e, n, r), this;
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
    this.$anchor = e, this.$head = n, this.ranges = r || [new pS(e.min(n), e.max(n))];
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
  replace(e, n = ct.empty) {
    let r = n.content.lastChild, i = null;
    for (let a = 0; a < n.openEnd; a++)
      i = r, r = r.lastChild;
    let o = e.steps.length, s = this.ranges;
    for (let a = 0; a < s.length; a++) {
      let { $from: l, $to: c } = s[a], u = e.mapping.slice(o);
      e.replaceRange(u.map(l.pos), u.map(c.pos), a ? ct.empty : n), a == 0 && Tp(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
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
      o ? e.deleteRange(c, u) : (e.replaceRangeWith(c, u, n), Tp(e, r, n.isInline ? -1 : 1));
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
    let i = e.parent.inlineContent ? new ur(e) : Ro(e.node(0), e.parent, e.pos, e.index(), n, r);
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
    return ur.between(this.$anchor, this.$head).getBookmark();
  }
}
_n.prototype.visible = !0;
class pS {
  /**
  Create a range.
  */
  constructor(e, n) {
    this.$from = e, this.$to = n;
  }
}
let Cp = !1;
function Rp(t) {
  !Cp && !t.parent.inlineContent && (Cp = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + t.parent.type.name + ")"));
}
class ur extends _n {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, n = e) {
    Rp(e), Rp(n), super(e, n);
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
    return new ur(i.parent.inlineContent ? i : r, r);
  }
  replace(e, n = ct.empty) {
    if (super.replace(e, n), n == ct.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof ur && e.anchor == this.anchor && e.head == this.head;
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
    return new ur(e.resolve(n.anchor), e.resolve(n.head));
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
    return e.parent.inlineContent || (i == 0 ? e = n : (e = (_n.findFrom(e, -r, !0) || _n.findFrom(e, r, !0)).$anchor, e.pos < n.pos != i < 0 && (e = n))), new ur(e, n);
  }
}
_n.jsonID("text", ur);
class ml {
  constructor(e, n) {
    this.anchor = e, this.head = n;
  }
  map(e) {
    return new ml(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return ur.between(e.resolve(this.anchor), e.resolve(this.head));
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
    return new ct(De.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof Tn && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new Vf(this.anchor);
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
class Vf {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: n, pos: r } = e.mapResult(this.anchor);
    return n ? new ml(r, r) : new Vf(r);
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
  replace(e, n = ct.empty) {
    if (n == ct.empty) {
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
    return gS;
  }
}
_n.jsonID("all", jr);
const gS = {
  map() {
    return this;
  },
  resolve(t) {
    return new jr(t);
  }
};
function Ro(t, e, n, r, i, o = !1) {
  if (e.inlineContent)
    return ur.create(t, n);
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
function Tp(t, e, n) {
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
function Ep(t, e) {
  return !e || !t ? t : t.bind(e);
}
class ga {
  constructor(e, n, r) {
    this.name = e, this.init = Ep(n.init, r), this.apply = Ep(n.apply, r);
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
const Jb = (t, e) => t.selection.empty ? !1 : (e && e(t.tr.deleteSelection().scrollIntoView()), !0);
function Zb(t, e) {
  let { $cursor: n } = t.selection;
  return !n || (e ? !e.endOfTextblock("backward", t) : n.parentOffset > 0) ? null : n;
}
const Qb = (t, e, n) => {
  let r = Zb(t, n);
  if (!r)
    return !1;
  let i = Jf(r);
  if (!i) {
    let s = r.blockRange(), a = s && jo(s);
    return a == null ? !1 : (e && e(t.tr.lift(s, a).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (lv(t, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (Ho(o, "end") || Tn.isSelectable(o)))
    for (let s = r.depth; ; s--) {
      let a = gl(t.doc, r.before(s), r.after(s), ct.empty);
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
}, mS = (t, e, n) => {
  let r = Zb(t, n);
  if (!r)
    return !1;
  let i = Jf(r);
  return i ? ev(t, i, e) : !1;
}, yS = (t, e, n) => {
  let r = nv(t, n);
  if (!r)
    return !1;
  let i = Zf(r);
  return i ? ev(t, i, e) : !1;
};
function ev(t, e, n) {
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
  let c = gl(t.doc, o, l, ct.empty);
  if (!c || c.from != o || c instanceof Hn && c.slice.size >= l - o)
    return !1;
  if (n) {
    let u = t.tr.step(c);
    u.setSelection(ur.create(u.doc, o)), n(u.scrollIntoView());
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
const tv = (t, e, n) => {
  let { $head: r, empty: i } = t.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (n ? !n.endOfTextblock("backward", t) : r.parentOffset > 0)
      return !1;
    o = Jf(r);
  }
  let s = o && o.nodeBefore;
  return !s || !Tn.isSelectable(s) ? !1 : (e && e(t.tr.setSelection(Tn.create(t.doc, o.pos - s.nodeSize)).scrollIntoView()), !0);
};
function Jf(t) {
  if (!t.parent.type.spec.isolating)
    for (let e = t.depth - 1; e >= 0; e--) {
      if (t.index(e) > 0)
        return t.doc.resolve(t.before(e + 1));
      if (t.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function nv(t, e) {
  let { $cursor: n } = t.selection;
  return !n || (e ? !e.endOfTextblock("forward", t) : n.parentOffset < n.parent.content.size) ? null : n;
}
const rv = (t, e, n) => {
  let r = nv(t, n);
  if (!r)
    return !1;
  let i = Zf(r);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (lv(t, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (Ho(o, "start") || Tn.isSelectable(o))) {
    let s = gl(t.doc, r.before(), r.after(), ct.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let a = t.tr.step(s);
        a.setSelection(Ho(o, "start") ? _n.findFrom(a.doc.resolve(a.mapping.map(i.pos)), 1) : Tn.create(a.doc, a.mapping.map(i.pos))), e(a.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(t.tr.delete(i.pos, i.pos + o.nodeSize).scrollIntoView()), !0) : !1;
}, iv = (t, e, n) => {
  let { $head: r, empty: i } = t.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (n ? !n.endOfTextblock("forward", t) : r.parentOffset < r.parent.content.size)
      return !1;
    o = Zf(r);
  }
  let s = o && o.nodeAfter;
  return !s || !Tn.isSelectable(s) ? !1 : (e && e(t.tr.setSelection(Tn.create(t.doc, o.pos)).scrollIntoView()), !0);
};
function Zf(t) {
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
const bS = (t, e) => {
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
}, vS = (t, e) => {
  let n = t.selection, r;
  if (n instanceof Tn) {
    if (n.node.isTextblock || !so(t.doc, n.to))
      return !1;
    r = n.to;
  } else if (r = pl(t.doc, n.to, 1), r == null)
    return !1;
  return e && e(t.tr.join(r).scrollIntoView()), !0;
}, wS = (t, e) => {
  let { $from: n, $to: r } = t.selection, i = n.blockRange(r), o = i && jo(i);
  return o == null ? !1 : (e && e(t.tr.lift(i, o).scrollIntoView()), !0);
}, ov = (t, e) => {
  let { $head: n, $anchor: r } = t.selection;
  return !n.parent.type.spec.code || !n.sameParent(r) ? !1 : (e && e(t.tr.insertText(`
`).scrollIntoView()), !0);
};
function Qf(t) {
  for (let e = 0; e < t.edgeCount; e++) {
    let { type: n } = t.edge(e);
    if (n.isTextblock && !n.hasRequiredAttrs())
      return n;
  }
  return null;
}
const xS = (t, e) => {
  let { $head: n, $anchor: r } = t.selection;
  if (!n.parent.type.spec.code || !n.sameParent(r))
    return !1;
  let i = n.node(-1), o = n.indexAfter(-1), s = Qf(i.contentMatchAt(o));
  if (!s || !i.canReplaceWith(o, o, s))
    return !1;
  if (e) {
    let a = n.after(), l = t.tr.replaceWith(a, a, s.createAndFill());
    l.setSelection(_n.near(l.doc.resolve(a), 1)), e(l.scrollIntoView());
  }
  return !0;
}, sv = (t, e) => {
  let n = t.selection, { $from: r, $to: i } = n;
  if (n instanceof jr || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = Qf(i.parent.contentMatchAt(i.indexAfter()));
  if (!o || !o.isTextblock)
    return !1;
  if (e) {
    let s = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, a = t.tr.insert(s, o.createAndFill());
    a.setSelection(ur.create(a.doc, s + 1)), e(a.scrollIntoView());
  }
  return !0;
}, av = (t, e) => {
  let { $cursor: n } = t.selection;
  if (!n || n.parent.content.size)
    return !1;
  if (n.depth > 1 && n.after() != n.end(-1)) {
    let o = n.before();
    if (di(t.doc, o))
      return e && e(t.tr.split(o).scrollIntoView()), !0;
  }
  let r = n.blockRange(), i = r && jo(r);
  return i == null ? !1 : (e && e(t.tr.lift(r, i).scrollIntoView()), !0);
};
function kS(t) {
  return (e, n) => {
    if (e.selection instanceof Tn && e.selection.node.isBlock) {
      let { $from: h } = e.selection;
      return !h.parentOffset || !di(e.doc, h.pos) ? !1 : (n && n(e.tr.split(h.pos).scrollIntoView()), !0);
    }
    if (!e.selection.$from.depth)
      return !1;
    let r = e.tr;
    !e.selection.empty && (e.selection instanceof ur || e.selection instanceof jr) && r.deleteSelection();
    let { $from: i } = r.selection, o = r.steps.length, s = [], a, l, c = !1, u = !1;
    for (let h = i.depth; ; h--)
      if (i.node(h).isBlock) {
        c = i.end(h) == i.pos + (i.depth - h), u = i.start(h) == i.pos - (i.depth - h), l = Qf(i.node(h - 1).contentMatchAt(i.indexAfter(h - 1))), s.unshift(c && l ? { type: l } : null), a = h;
        break;
      } else {
        if (h == 1)
          return !1;
        s.unshift(null);
      }
    let d = i.pos, f = di(r.doc, d, s.length, s);
    if (f || (s[0] = l ? { type: l } : null, f = di(r.doc, d, s.length, s)), !f)
      return !1;
    if (r.split(d, s.length, s), !c && u && i.node(a).type != l) {
      let h = r.mapping.slice(o), p = h.map(i.before(a)), g = r.doc.resolve(p);
      l && i.node(a - 1).canReplaceWith(g.index(), g.index() + 1, l) && r.setNodeMarkup(h.map(i.before(a)), l);
    }
    return n && n(r.scrollIntoView()), !0;
  };
}
const SS = kS(), CS = (t, e) => {
  let { $from: n, to: r } = t.selection, i, o = n.sharedDepth(r);
  return o == 0 ? !1 : (i = n.before(o), e && e(t.tr.setSelection(Tn.create(t.doc, i))), !0);
};
function RS(t, e, n) {
  let r = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(o - 1, o) ? (n && n(t.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || so(t.doc, e.pos)) ? !1 : (n && n(t.tr.join(e.pos).scrollIntoView()), !0);
}
function lv(t, e, n, r) {
  let i = e.nodeBefore, o = e.nodeAfter, s, a, l = i.type.spec.isolating || o.type.spec.isolating;
  if (!l && RS(t, e, n))
    return !0;
  let c = !l && e.parent.canReplace(e.index(), e.index() + 1);
  if (c && (s = (a = i.contentMatchAt(i.childCount)).findWrapping(o.type)) && a.matchType(s[0] || o.type).validEnd) {
    if (n) {
      let h = e.pos + o.nodeSize, p = De.empty;
      for (let m = s.length - 1; m >= 0; m--)
        p = De.from(s[m].create(null, p));
      p = De.from(i.copy(p));
      let g = t.tr.step(new Kn(e.pos - 1, h, e.pos, h, new ct(p, 1, 0), s.length, !0)), y = g.doc.resolve(h + 2 * s.length);
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
        let m = De.empty;
        for (let C = p.length - 1; C >= 0; C--)
          m = De.from(p[C].copy(m));
        let b = t.tr.step(new Kn(e.pos - p.length, e.pos + o.nodeSize, e.pos + y, e.pos + o.nodeSize - y, new ct(m, p.length, 0), 0, !0));
        n(b.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function cv(t) {
  return function(e, n) {
    let r = e.selection, i = t < 0 ? r.$from : r.$to, o = i.depth;
    for (; i.node(o).isInline; ) {
      if (!o)
        return !1;
      o--;
    }
    return i.node(o).isTextblock ? (n && n(e.tr.setSelection(ur.create(e.doc, t < 0 ? i.start(o) : i.end(o)))), !0) : !1;
  };
}
const TS = cv(-1), ES = cv(1);
function MS(t, e = null) {
  return function(n, r) {
    let { $from: i, $to: o } = n.selection, s = i.blockRange(o), a = s && Wb(s, t, e);
    return a ? (r && r(n.tr.wrap(s, a).scrollIntoView()), !0) : !1;
  };
}
function Mp(t, e = null) {
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
function eh(...t) {
  return function(e, n, r) {
    for (let i = 0; i < t.length; i++)
      if (t[i](e, n, r))
        return !0;
    return !1;
  };
}
eh(Jb, Qb, tv);
eh(Jb, rv, iv);
eh(ov, sv, av, SS);
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function IS(t, e = null) {
  return function(n, r) {
    let { $from: i, $to: o } = n.selection, s = i.blockRange(o);
    if (!s)
      return !1;
    let a = r ? n.tr : null;
    return AS(a, s, t, e) ? (r && r(a.scrollIntoView()), !0) : !1;
  };
}
function AS(t, e, n, r = null) {
  let i = !1, o = e, s = e.$from.doc;
  if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(n) && e.startIndex == 0) {
    if (e.$from.index(e.depth - 1) == 0)
      return !1;
    let l = s.resolve(e.start - 2);
    o = new Wa(l, l, e.depth), e.endIndex < e.parent.childCount && (e = new Wa(e.$from, s.resolve(e.$to.end(e.depth)), e.depth)), i = !0;
  }
  let a = Wb(o, n, r, e);
  return a ? (t && _S(t, e, a, i, n), !0) : !1;
}
function _S(t, e, n, r, i) {
  let o = De.empty;
  for (let u = n.length - 1; u >= 0; u--)
    o = De.from(n[u].type.create(n[u].attrs, o));
  t.step(new Kn(e.start - (r ? 2 : 0), e.end, e.start, e.end, new ct(o, 0, 0), n.length, !0));
  let s = 0;
  for (let u = 0; u < n.length; u++)
    n[u].type == i && (s = u + 1);
  let a = n.length - s, l = e.start + n.length - (r ? 2 : 0), c = e.parent;
  for (let u = e.startIndex, d = e.endIndex, f = !0; u < d; u++, f = !1)
    !f && di(t.doc, l, a) && (t.split(l, a), l += 2 * a), l += c.child(u).nodeSize;
  return t;
}
function PS(t) {
  return function(e, n) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (s) => s.childCount > 0 && s.firstChild.type == t);
    return o ? n ? r.node(o.depth - 1).type == t ? DS(e, n, t, o) : NS(e, n, o) : !0 : !1;
  };
}
function DS(t, e, n, r) {
  let i = t.tr, o = r.end, s = r.$to.end(r.depth);
  o < s && (i.step(new Kn(o - 1, s, o, s, new ct(De.from(n.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new Wa(i.doc.resolve(r.$from.pos), i.doc.resolve(s), r.depth));
  const a = jo(r);
  if (a == null)
    return !1;
  i.lift(r, a);
  let l = i.doc.resolve(i.mapping.map(o, -1) - 1);
  return so(i.doc, l.pos) && l.nodeBefore.type == l.nodeAfter.type && i.join(l.pos), e(i.scrollIntoView()), !0;
}
function NS(t, e, n) {
  let r = t.tr, i = n.parent;
  for (let h = n.end, p = n.endIndex - 1, g = n.startIndex; p > g; p--)
    h -= i.child(p).nodeSize, r.delete(h - 1, h + 1);
  let o = r.doc.resolve(n.start), s = o.nodeAfter;
  if (r.mapping.map(n.end) != n.start + o.nodeAfter.nodeSize)
    return !1;
  let a = n.startIndex == 0, l = n.endIndex == i.childCount, c = o.node(-1), u = o.index(-1);
  if (!c.canReplace(u + (a ? 0 : 1), u + 1, s.content.append(l ? De.empty : De.from(i))))
    return !1;
  let d = o.pos, f = d + s.nodeSize;
  return r.step(new Kn(d - (a ? 1 : 0), f + (l ? 1 : 0), d + 1, f - 1, new ct((a ? De.empty : De.from(i.copy(De.empty))).append(l ? De.empty : De.from(i.copy(De.empty))), a ? 0 : 1, l ? 0 : 1), a ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function OS(t) {
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
      let c = l.lastChild && l.lastChild.type == a.type, u = De.from(c ? t.create() : null), d = new ct(De.from(t.create(null, De.from(a.type.create(null, u)))), c ? 3 : 1, 0), f = o.start, h = o.end;
      n(e.tr.step(new Kn(f - (c ? 3 : 1), h, f, h, d, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function uv(t) {
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
var zS = class dv {
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
    const e = dv.createFakeChain();
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
      state: uv({
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
const LS = () => ({ editor: t, view: e }) => (requestAnimationFrame(() => {
  if (!t.isDestroyed) {
    var n;
    e.dom.blur(), (n = window) === null || n === void 0 || (n = n.getSelection()) === null || n === void 0 || n.removeAllRanges();
  }
}), !0), $S = (t = !0) => ({ commands: e }) => e.setContent("", { emitUpdate: t }), FS = () => ({ state: t, tr: e, dispatch: n }) => {
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
}, HS = (t) => (e) => t(e), BS = () => ({ state: t, dispatch: e }) => sv(t, e), qS = (t, e) => ({ editor: n, tr: r }) => {
  const { state: i } = n, o = i.doc.slice(t.from, t.to);
  r.deleteRange(t.from, t.to);
  const s = r.mapping.map(e);
  return r.insert(s, o.content), r.setSelection(new Ar(r.doc.resolve(Math.max(s - 1, 0)))), !0;
}, WS = () => ({ tr: t, dispatch: e }) => {
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
const jS = (t) => ({ tr: e, state: n, dispatch: r }) => {
  const i = Jn(t, n.schema), o = e.selection.$anchor;
  for (let s = o.depth; s > 0; s -= 1) if (o.node(s).type === i) {
    if (r) {
      const a = o.before(s), l = o.after(s);
      e.delete(a, l).scrollIntoView();
    }
    return !0;
  }
  return !1;
}, KS = (t) => ({ tr: e, dispatch: n }) => {
  const { from: r, to: i } = t;
  return n && e.delete(r, i), !0;
}, US = (t) => t.content ? /^text(\*|\+)/.test(t.content) : !1, Ip = (t, e, n) => {
  if (!t.parent.isInline || n === "left" && t.pos > t.start() || n === "right" && t.pos < t.end()) return t.pos;
  const r = e.nodes[t.parent.type.name].spec;
  return US(r) ? n === "left" ? t.start() - 1 : t.end() + 1 : t.pos;
}, GS = (t, e, n) => ({
  from: Ip(t, n, "left"),
  to: Ip(e, n, "right")
}), YS = () => ({ state: t, dispatch: e }) => {
  if (t.selection.empty) return !1;
  if (e) {
    const n = t.tr, { ranges: r } = t.selection, i = n.steps.length;
    r.forEach((o) => {
      const s = n.mapping.slice(i), a = n.doc.resolve(s.map(o.$from.pos)), l = n.doc.resolve(s.map(o.$to.pos)), { from: c, to: u } = GS(a, l, t.schema);
      n.deleteRange(c, u);
    }), n.selection.empty || n.setSelection(Ar.near(n.doc.resolve(n.selection.from))), n.scrollIntoView(), e(n);
  }
  return !0;
}, XS = () => ({ commands: t }) => t.keyboardShortcut("Enter"), VS = () => ({ state: t, dispatch: e }) => xS(t, e);
function JS(t) {
  return Object.prototype.toString.call(t) === "[object RegExp]";
}
function Ga(t, e, n = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => n.strict ? e[i] === t[i] : JS(e[i]) ? e[i].test(t[i]) : e[i] === t[i]) : !0;
}
function fv(t, e, n = {}) {
  return t.find((r) => r.type === e && Ga(Object.fromEntries(Object.keys(n).map((i) => [i, r.attrs[i]])), n));
}
function Ap(t, e, n = {}) {
  return !!fv(t, e, n);
}
function hv(t, e, n) {
  if (!t || !e) return;
  let r = t.parent.childAfter(t.parentOffset);
  if ((!r.node || !r.node.marks.some((l) => l.type === e)) && (r = t.parent.childBefore(t.parentOffset)), !r.node || !r.node.marks.some((l) => l.type === e)) return;
  if (!n) {
    const l = r.node.marks.find((c) => c.type === e);
    l && (n = l.attrs);
  }
  if (!fv([...r.node.marks], e, n)) return;
  let i = r.index, o = t.start() + r.offset, s = i + 1, a = o + r.node.nodeSize;
  for (; i > 0 && Ap([...t.parent.child(i - 1).marks], e, n); )
    i -= 1, o -= t.parent.child(i).nodeSize;
  for (; s < t.parent.childCount && Ap([...t.parent.child(s).marks], e, n); )
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
const ZS = (t, e) => ({ tr: n, state: r, dispatch: i }) => {
  const o = Di(t, r.schema), { doc: s, selection: a } = n, { $from: l, from: c, to: u } = a;
  if (i) {
    const d = hv(l, o, e);
    if (d && d.from <= c && d.to >= u) {
      const f = Ar.create(s, d.from, d.to);
      n.setSelection(f);
    }
  }
  return !0;
}, QS = (t) => (e) => {
  const n = typeof t == "function" ? t(e) : t;
  for (let r = 0; r < n.length; r += 1) if (n[r](e)) return !0;
  return !1;
};
function pv(t) {
  return t instanceof Ar;
}
function Xi(t = 0, e = 0, n = 0) {
  return Math.min(Math.max(t, e), n);
}
function eC(t, e = null) {
  if (!e) return null;
  const n = No.atStart(t), r = No.atEnd(t);
  if (e === "start" || e === !0) return n;
  if (e === "end") return r;
  const i = n.from, o = r.to;
  return e === "all" ? Ar.create(t, Xi(0, i, o), Xi(t.content.size, i, o)) : Ar.create(t, Xi(e, i, o), Xi(e, i, o));
}
function _p() {
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
function tC() {
  return typeof navigator < "u" ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : !1;
}
const nC = (t = null, e = {}) => ({ editor: n, view: r, tr: i, dispatch: o }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const s = () => {
    (Ya() || _p()) && r.dom.focus(), tC() && !Ya() && !_p() && r.dom.focus({ preventScroll: !0 }), requestAnimationFrame(() => {
      n.isDestroyed || (r.focus(), e != null && e.scrollIntoView && n.commands.scrollIntoView());
    });
  };
  try {
    if (r.hasFocus() && t === null || t === !1) return !0;
  } catch {
    return !1;
  }
  if (o && t === null && !pv(n.state.selection))
    return s(), !0;
  const a = eC(i.doc, t) || n.state.selection, l = n.state.selection.eq(a);
  return o && (l || i.setSelection(a), l && i.storedMarks && i.setStoredMarks(i.storedMarks), s()), !0;
}, rC = (t, e) => (n) => t.every((r, i) => e(r, {
  ...n,
  index: i
})), iC = (t, e) => ({ tr: n, commands: r }) => r.insertContentAt({
  from: n.selection.from,
  to: n.selection.to
}, t, e), gv = (t) => {
  const e = t.childNodes;
  for (let n = e.length - 1; n >= 0; n -= 1) {
    const r = e[n];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? t.removeChild(r) : r.nodeType === 1 && gv(r);
  }
  return t;
};
function ma(t) {
  if (typeof window > "u") throw new Error("[tiptap error]: there is no window object available, so this function cannot be used");
  const e = `<body>${t}</body>`, n = new window.DOMParser().parseFromString(e, "text/html").body;
  return gv(n);
}
function mv(t) {
  return typeof (t == null ? void 0 : t.nodesBetween) == "function";
}
function Bo(t, e, n) {
  if (mv(t)) return t;
  const r = typeof t == "object" && t !== null;
  n = {
    slice: !0,
    parseOptions: {},
    ...n
  };
  const i = typeof t == "string";
  if (r) try {
    if (Array.isArray(t) && t.length > 0) return De.fromArray(t.map((s) => e.nodeFromJSON(s)));
    const o = e.nodeFromJSON(t);
    return n.errorOnInvalidContent && o.check(), o;
  } catch (o) {
    if (n.errorOnInvalidContent) throw new Error("[tiptap error]: Invalid JSON content", { cause: o });
    return console.warn("[tiptap warn]: Invalid content.", "Passed value:", t, "Error:", o), Bo("", e, n);
  }
  if (i) {
    if (n.errorOnInvalidContent) {
      let s = !1, a = "";
      const l = new Fk({
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
function yv(t) {
  return !("type" in t);
}
function bv(t, e, n) {
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
const oC = (t, e, n) => ({ tr: r, dispatch: i, editor: o }) => {
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
    const p = yv(a) ? a.content : [a];
    if (p.forEach((y) => {
      y.check(), f = f ? y.isText && y.marks.length === 0 : !1, h = h ? y.isBlock : !1;
    }), u === d && h) {
      const { parent: y } = r.doc.resolve(u);
      y.isTextblock && !y.type.spec.code && !y.childCount && (u -= 1, d += 1);
    }
    let g;
    if (f)
      Array.isArray(e) ? g = e.map((y) => y.text || "").join("") : mv(e) ? g = p.map((y) => {
        var m;
        return (m = y.text) !== null && m !== void 0 ? m : "";
      }).join("") : typeof e == "object" && e && e.text ? g = e.text : g = e, r.insertText(g, u, d);
    else {
      g = De.from(p);
      const y = r.doc.resolve(u), m = y.node(), b = y.parentOffset === 0, C = m.isText || m.isTextblock, E = m.content.size > 0;
      b && C && E && h && (u = Math.max(0, u - 1)), r.replaceWith(u, d, p);
    }
    n.updateSelection && bv(r, r.steps.length - 1, -1), n.applyInputRules && r.setMeta("applyInputRules", {
      from: u,
      text: g
    }), n.applyPasteRules && r.setMeta("applyPasteRules", {
      from: u,
      text: g
    });
  }
  return !0;
};
function vv(t) {
  for (let e = 0; e < t.edgeCount; e += 1) {
    const { type: n } = t.edge(e);
    if (n.isTextblock && !n.hasRequiredAttrs()) return n;
  }
  return null;
}
const sC = (t = {}) => ({ tr: e, dispatch: n, editor: r }) => {
  const { pos: i, attrs: o, content: s, updateSelection: a = !0 } = t;
  let l;
  typeof i == "number" ? l = e.doc.resolve(i) : i ? l = i : l = e.selection.$from;
  const c = vv(l.parent.contentMatchAt(l.index()));
  if (!c) return !1;
  const u = Object.keys(c.spec.attrs || {}), d = o ? Object.fromEntries(Object.entries(o).filter(([h]) => u.includes(h))) : {};
  let f;
  if (s) {
    const h = Bo(s, r.schema);
    f = c.createAndFill(d, h);
  } else f = c.createAndFill(d);
  return f ? (n && (e.insert(l.pos, f), a && bv(e, e.steps.length - 1, -1)), !0) : !1;
}, aC = () => ({ state: t, dispatch: e }) => bS(t, e), lC = () => ({ state: t, dispatch: e }) => vS(t, e), cC = () => ({ state: t, dispatch: e }) => Qb(t, e), uC = () => ({ state: t, dispatch: e }) => rv(t, e), dC = () => ({ state: t, dispatch: e, tr: n }) => {
  try {
    const r = pl(t.doc, t.selection.$from.pos, -1);
    return r == null ? !1 : (n.join(r, 2), e && e(n), !0);
  } catch {
    return !1;
  }
}, fC = () => ({ state: t, dispatch: e, tr: n }) => {
  try {
    const r = pl(t.doc, t.selection.$from.pos, 1);
    return r == null ? !1 : (n.join(r, 2), e && e(n), !0);
  } catch {
    return !1;
  }
}, hC = () => ({ state: t, dispatch: e }) => mS(t, e), pC = () => ({ state: t, dispatch: e }) => yS(t, e);
function wv() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function gC(t) {
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
      Ya() || wv() ? s = !0 : i = !0;
    else throw new Error(`Unrecognized modifier name: ${l}`);
  }
  return r && (n = `Alt-${n}`), i && (n = `Ctrl-${n}`), s && (n = `Meta-${n}`), o && (n = `Shift-${n}`), n;
}
const mC = (t) => ({ editor: e, view: n, tr: r, dispatch: i }) => {
  const o = gC(t).split(/-(?!$)/), s = o.find((c) => ![
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
function th(t, e, n = {}) {
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
const yC = (t, e = {}) => ({ state: n, dispatch: r }) => th(n, Jn(t, n.schema), e) ? wS(n, r) : !1, bC = () => ({ state: t, dispatch: e }) => av(t, e), vC = (t) => ({ state: e, dispatch: n }) => {
  const r = Jn(t, e.schema);
  return PS(r)(e, n);
}, wC = () => ({ state: t, dispatch: e }) => ov(t, e);
function xv(t, e) {
  return e.nodes[t] ? "node" : e.marks[t] ? "mark" : null;
}
function Pp(t, e) {
  const n = typeof e == "string" ? [e] : e;
  return Object.keys(t).reduce((r, i) => (n.includes(i) || (r[i] = t[i]), r), {});
}
const xC = (t, e) => ({ tr: n, state: r, dispatch: i }) => {
  let o = null, s = null;
  const a = xv(typeof t == "string" ? t : t.name, r.schema);
  if (!a) return !1;
  a === "node" && (o = Jn(t, r.schema)), a === "mark" && (s = Di(t, r.schema));
  let l = !1;
  return n.selection.ranges.forEach((c) => {
    r.doc.nodesBetween(c.$from.pos, c.$to.pos, (u, d) => {
      o && o === u.type && (l = !0, i && n.setNodeMarkup(d, void 0, Pp(u.attrs, e))), s && u.marks.length && u.marks.forEach((f) => {
        s === f.type && (l = !0, i && n.addMark(d, d + u.nodeSize, s.create(Pp(f.attrs, e))));
      });
    });
  }), l;
}, kC = () => ({ tr: t, dispatch: e }) => (e && t.scrollIntoView(), !0), SC = () => ({ tr: t, dispatch: e }) => {
  if (e) {
    const n = new ox(t.doc);
    t.setSelection(n);
  }
  return !0;
}, CC = () => ({ state: t, dispatch: e }) => tv(t, e), RC = () => ({ state: t, dispatch: e }) => iv(t, e), TC = () => ({ state: t, dispatch: e }) => CS(t, e), EC = () => ({ state: t, dispatch: e }) => ES(t, e), MC = () => ({ state: t, dispatch: e }) => TS(t, e);
function IC(t, e, n = {}, r = {}) {
  return Bo(t, e, {
    slice: !1,
    parseOptions: n,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
const AC = (t, { errorOnInvalidContent: e, emitUpdate: n = !0, parseOptions: r = {} } = {}) => ({ editor: i, tr: o, dispatch: s, commands: a }) => {
  const { doc: l } = o;
  if (r.preserveWhitespace !== "full") {
    const c = IC(t, i.schema, r, { errorOnInvalidContent: e ?? i.options.enableContentCheck });
    if (s) {
      const u = yv(c) ? c.content : [c];
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
function _C(t, e) {
  const n = Di(e, t.schema), { from: r, to: i, empty: o } = t.selection, s = [];
  o ? (t.storedMarks && s.push(...t.storedMarks), s.push(...t.selection.$head.marks())) : t.doc.nodesBetween(r, i, (l) => {
    s.push(...l.marks);
  });
  const a = s.find((l) => l.type.name === n.name);
  return a ? { ...a.attrs } : {};
}
function PC(t, e) {
  const n = new hS(t);
  return e.forEach((r) => {
    r.steps.forEach((i) => {
      n.step(i);
    });
  }), n;
}
function DC(t, e) {
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
function nh(t) {
  return (e) => DC(e.$from, t);
}
function Ps(t, e, n) {
  return t.config[e] === void 0 && t.parent ? Ps(t.parent, e, n) : typeof t.config[e] == "function" ? t.config[e].bind({
    ...n,
    parent: t.parent ? Ps(t.parent, e, n) : null
  }) : t.config[e];
}
function NC(t) {
  return typeof t == "function";
}
function wf(t, e = void 0, ...n) {
  return NC(t) ? e ? t.bind(e)(...n) : t(...n) : t;
}
function kv(t) {
  return {
    baseExtensions: t.filter((e) => e.type === "extension"),
    nodeExtensions: t.filter((e) => e.type === "node"),
    markExtensions: t.filter((e) => e.type === "mark")
  };
}
function OC(t, e, n) {
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
function zC(t) {
  return Object.fromEntries(Object.entries(t.nodes).filter(([, e]) => e.spec.toText).map(([e, n]) => [e, n.spec.toText]));
}
function LC(t, e = JSON.stringify) {
  const n = {};
  return t.filter((r) => {
    const i = e(r);
    return Object.prototype.hasOwnProperty.call(n, i) ? !1 : n[i] = !0;
  });
}
function $C(t) {
  const e = LC(t);
  return e.length === 1 ? e : e.filter((n, r) => !e.filter((i, o) => o !== r).some((i) => n.oldRange.from >= i.oldRange.from && n.oldRange.to <= i.oldRange.to && n.newRange.from >= i.newRange.from && n.newRange.to <= i.newRange.to));
}
function FC(t) {
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
  }), $C(r);
}
function Da(t, e, n) {
  return Object.fromEntries(Object.entries(n).filter(([r]) => {
    const i = t.find((o) => o.type === e && o.name === r);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function HC(t, e, n = {}) {
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
  const { nodeExtensions: n } = kv(e), r = n.find((o) => o.name === t);
  if (!r) return !1;
  const i = wf(Ps(r, "group", {
    name: r.name,
    options: r.options,
    storage: r.storage
  }));
  return typeof i != "string" ? !1 : i.split(" ").includes("list");
}
function Sv(t, { checkChildren: e = !0, ignoreWhitespace: n = !1 } = {}) {
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
      i !== !1 && (Sv(o, {
        ignoreWhitespace: n,
        checkChildren: e
      }) || (i = !1));
    }), i;
  }
  return !1;
}
function BC(t, e, n) {
  const { selection: r } = e;
  let i = null;
  if (pv(r) && (i = r.$cursor), i) {
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
const qC = (t, e = {}) => ({ tr: n, state: r, dispatch: i }) => {
  const { selection: o } = n, { empty: s, ranges: a } = o, l = Di(t, r.schema);
  if (i)
    if (s) {
      const c = _C(r, l);
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
  return BC(r, n, l);
}, WC = (t, e) => ({ tr: n }) => (n.setMeta(t, e), !0), jC = (t, e = {}) => ({ state: n, dispatch: r, chain: i }) => {
  const o = Jn(t, n.schema);
  let s;
  return n.selection.$anchor.sameParent(n.selection.$head) && (s = n.selection.$anchor.parent.attrs), o.isTextblock ? i().command(({ commands: a }) => Mp(o, {
    ...s,
    ...e
  })(n) ? !0 : a.clearNodes()).command(({ state: a }) => Mp(o, {
    ...s,
    ...e
  })(a, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, KC = (t) => ({ tr: e, dispatch: n }) => {
  if (n) {
    const { doc: r } = e, i = Xi(t, 0, r.content.size), o = $o.create(r, i);
    e.setSelection(o);
  }
  return !0;
}, UC = (t, e) => ({ tr: n, state: r, dispatch: i }) => {
  const { selection: o } = r;
  let s, a;
  return typeof e == "number" ? (s = e, a = e) : e && "from" in e && "to" in e ? (s = e.from, a = e.to) : (s = o.from, a = o.to), i && n.doc.nodesBetween(s, a, (l, c) => {
    l.isText || n.setNodeMarkup(c, void 0, {
      ...l.attrs,
      dir: t
    });
  }), !0;
}, GC = (t) => ({ tr: e, dispatch: n }) => {
  if (n) {
    const { doc: r } = e, { from: i, to: o } = typeof t == "number" ? {
      from: t,
      to: t
    } : t, s = Ar.atStart(r).from, a = Ar.atEnd(r).to, l = Xi(i, s, a), c = Xi(o, s, a), u = Ar.create(r, l, c);
    e.setSelection(u);
  }
  return !0;
}, YC = (t) => ({ state: e, dispatch: n }) => {
  const r = Jn(t, e.schema);
  return OS(r)(e, n);
};
function Dp(t, e) {
  const n = t.storedMarks || t.selection.$to.parentOffset && t.selection.$from.marks();
  if (n) {
    const r = n.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    t.tr.ensureMarks(r);
  }
}
const XC = ({ keepMarks: t = !0 } = {}) => ({ tr: e, state: n, dispatch: r, editor: i }) => {
  const { selection: o, doc: s } = e, { $from: a, $to: l } = o, c = i.extensionManager.attributes, u = Da(c, a.node().type.name, a.node().attrs);
  if (o instanceof $o && o.node.isBlock)
    return !a.parentOffset || !di(s, a.pos) ? !1 : (r && (t && Dp(n, i.extensionManager.splittableMarks), e.split(a.pos).scrollIntoView()), !0);
  if (!a.parent.isBlock) return !1;
  const d = l.parentOffset === l.parent.content.size, f = a.depth === 0 ? void 0 : vv(a.node(-1).contentMatchAt(a.indexAfter(-1)));
  let h = d && f ? [{
    type: f,
    attrs: u
  }] : void 0, p = di(e.doc, e.mapping.map(a.pos), 1, h);
  if (!h && !p && di(e.doc, e.mapping.map(a.pos), 1, f ? [{ type: f }] : void 0) && (p = !0, h = f ? [{
    type: f,
    attrs: u
  }] : void 0), r) {
    if (p && (o instanceof Ar && e.deleteSelection(), e.split(e.mapping.map(a.pos), 1, h), f && !d && !a.parentOffset && a.parent.type !== f)) {
      const g = e.mapping.map(a.before()), y = e.doc.resolve(g);
      a.node(-1).canReplaceWith(y.index(), y.index() + 1, f) && e.setNodeMarkup(e.mapping.map(a.before()), f);
    }
    t && Dp(n, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return p;
}, VC = (t, e = {}) => ({ tr: n, state: r, dispatch: i, editor: o }) => {
  const s = Jn(t, r.schema), { $from: a, $to: l } = r.selection, c = r.selection.node;
  if (c && c.isBlock || a.depth < 2 || !a.sameParent(l)) return !1;
  const u = a.node(-1);
  if (u.type !== s) return !1;
  const d = o.extensionManager.attributes;
  if (a.parent.content.size === 0 && a.node(-1).childCount === a.indexAfter(-1)) {
    if (a.depth === 2 || a.node(-3).type !== s || a.index(-2) !== a.node(-2).childCount - 1) return !1;
    if (i) {
      var f;
      let m = De.empty;
      const b = a.index(-1) ? 1 : a.index(-2) ? 2 : 3;
      for (let P = a.depth - b; P >= a.depth - 3; P -= 1) m = De.from(a.node(P).copy(m));
      const C = a.indexAfter(-1) < a.node(-2).childCount ? 1 : a.indexAfter(-2) < a.node(-3).childCount ? 2 : 3, E = {
        ...Da(d, a.node().type.name, a.node().attrs),
        ...e
      }, v = ((f = s.contentMatch.defaultType) === null || f === void 0 ? void 0 : f.createAndFill(E)) || void 0;
      m = m.append(De.from(s.createAndFill(null, v) || void 0));
      const T = a.before(a.depth - (b - 1));
      n.replace(T, a.after(-C), new ct(m, 4 - b, 0));
      let D = -1;
      n.doc.nodesBetween(T, n.doc.content.size, (P, k) => {
        if (D > -1) return !1;
        P.isTextblock && P.content.size === 0 && (D = k + 1);
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
  if (!di(n.doc, a.pos, 2)) return !1;
  if (i) {
    const { selection: m, storedMarks: b } = r, { splittableMarks: C } = o.extensionManager, E = b || m.$to.parentOffset && m.$from.marks();
    if (n.split(a.pos, 2, y).scrollIntoView(), !E || !i) return !0;
    const v = E.filter((T) => C.includes(T.type.name));
    n.ensureMarks(v);
  }
  return !0;
};
function Np(t) {
  return !t || t === "1" ? null : t;
}
function Cv(t, e) {
  return Np(t) === Np(e);
}
const ec = (t, e) => {
  const n = nh((o) => o.type === e)(t.selection);
  if (!n) return !0;
  const r = t.doc.resolve(Math.max(0, n.pos - 1)).before(n.depth);
  if (r === void 0) return !0;
  const i = t.doc.nodeAt(r);
  return !(n.node.type === (i == null ? void 0 : i.type) && so(t.doc, n.pos)) || !Cv(n.node.attrs.type, i == null ? void 0 : i.attrs.type) || t.join(n.pos), !0;
}, tc = (t, e) => {
  const n = nh((o) => o.type === e)(t.selection);
  if (!n) return !0;
  const r = t.doc.resolve(n.start).after(n.depth);
  if (r === void 0) return !0;
  const i = t.doc.nodeAt(r);
  return !(n.node.type === (i == null ? void 0 : i.type) && so(t.doc, r)) || !Cv(n.node.attrs.type, i == null ? void 0 : i.attrs.type) || t.join(r), !0;
};
function JC(t) {
  const e = t.doc, n = e.firstChild;
  if (!n) return null;
  const r = e.resolve(1), i = e.resolve(n.nodeSize - 1);
  return Ar.between(r, i);
}
const ZC = (t, e, n, r = {}) => ({ editor: i, tr: o, state: s, dispatch: a, chain: l, commands: c, can: u }) => {
  const { extensions: d, splittableMarks: f } = i.extensionManager, h = Jn(t, s.schema), p = Jn(e, s.schema), { selection: g, storedMarks: y } = s, { $from: m, $to: b } = g, C = m.blockRange(b), E = y || g.$to.parentOffset && g.$from.marks();
  if (!C) return !1;
  const v = nh((I) => Ql(I.type.name, d))(g), T = g.from === 0 && g.to === s.doc.content.size, D = s.doc.content.content, P = D.length === 1 ? D[0] : null, k = T && P && Ql(P.type.name, d) ? {
    node: P,
    pos: 0
  } : null, z = v ?? k, S = !!v && C.depth >= 1 && C.depth - v.depth <= 1, x = !!k;
  if ((S || x) && z) {
    if (z.node.type === h)
      return T && x ? l().command(({ tr: I, dispatch: _ }) => {
        const M = JC(I);
        return M ? (I.setSelection(M), _ && _(I), !0) : !1;
      }).liftListItem(p).run() : c.liftListItem(p);
    if (Ql(z.node.type.name, d) && h.validContent(z.node.content)) return l().command(() => (o.setNodeMarkup(z.pos, h), !0)).command(() => ec(o, h)).command(() => tc(o, h)).run();
  }
  return !n || !E || !a ? l().command(() => u().wrapInList(h, r) ? !0 : c.clearNodes()).wrapInList(h, r).command(() => ec(o, h)).command(() => tc(o, h)).run() : l().command(() => {
    const I = u().wrapInList(h, r), _ = E.filter((M) => f.includes(M.type.name));
    return o.ensureMarks(_), I ? !0 : c.clearNodes();
  }).wrapInList(h, r).command(() => ec(o, h)).command(() => tc(o, h)).run();
}, QC = (t, e = {}, n = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: o = !1 } = n, s = Di(t, r.schema);
  return HC(r, s, e) ? i.unsetMark(s, { extendEmptyMarkRange: o }) : i.setMark(s, e);
}, e2 = (t, e, n = {}) => ({ state: r, commands: i }) => {
  const o = Jn(t, r.schema), s = Jn(e, r.schema), a = th(r, o, n);
  let l;
  return r.selection.$anchor.sameParent(r.selection.$head) && (l = r.selection.$anchor.parent.attrs), a ? i.setNode(s, l) : i.setNode(o, {
    ...l,
    ...n
  });
}, t2 = (t, e = {}) => ({ state: n, commands: r }) => {
  const i = Jn(t, n.schema);
  return th(n, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, n2 = () => ({ state: t, dispatch: e }) => {
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
}, r2 = (t = {}) => ({ tr: e, dispatch: n, editor: r }) => {
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
}, i2 = (t, e = {}) => ({ tr: n, state: r, dispatch: i }) => {
  const { extendEmptyMarkRange: o = !1 } = e, { selection: s } = n, a = Di(t, r.schema), { $from: l, empty: c, ranges: u } = s;
  if (!i) return !0;
  if (c && o) {
    var d;
    let { from: f, to: h } = s;
    const p = hv(l, a, (d = l.marks().find((g) => g.type === a)) === null || d === void 0 ? void 0 : d.attrs);
    p && (f = p.from, h = p.to), n.removeMark(f, h, a);
  } else u.forEach((f) => {
    n.removeMark(f.$from.pos, f.$to.pos, a);
  });
  return n.removeStoredMark(a), !0;
}, o2 = (t) => ({ tr: e, state: n, dispatch: r }) => {
  const { selection: i } = n;
  let o, s;
  return typeof t == "number" ? (o = t, s = t) : t && "from" in t && "to" in t ? (o = t.from, s = t.to) : (o = i.from, s = i.to), r && e.doc.nodesBetween(o, s, (a, l) => {
    if (a.isText) return;
    const c = { ...a.attrs };
    delete c.dir, e.setNodeMarkup(l, void 0, c);
  }), !0;
}, s2 = (t, e = {}) => ({ tr: n, state: r, dispatch: i }) => {
  let o = null, s = null;
  const a = xv(typeof t == "string" ? t : t.name, r.schema);
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
          const C = Math.max(m, u), E = Math.min(m + y.nodeSize, d);
          n.addMark(C, E, s.create({
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
}, a2 = new Kr("__tiptap_decorations__"), l2 = (t) => ({ tr: e, dispatch: n }) => (n && e.setMeta(a2, {
  type: "force",
  name: t
}), !0), c2 = (t, e = {}) => ({ state: n, dispatch: r }) => {
  const i = Jn(t, n.schema);
  return MS(i, e)(n, r);
}, u2 = (t, e = {}) => ({ state: n, dispatch: r }) => {
  const i = Jn(t, n.schema);
  return IS(i, e)(n, r);
};
var d2 = /* @__PURE__ */ kk({
  blur: () => LS,
  clearContent: () => $S,
  clearNodes: () => FS,
  command: () => HS,
  createParagraphNear: () => BS,
  cut: () => qS,
  deleteCurrentNode: () => WS,
  deleteNode: () => jS,
  deleteRange: () => KS,
  deleteSelection: () => YS,
  enter: () => XS,
  exitCode: () => VS,
  extendMarkRange: () => ZS,
  first: () => QS,
  focus: () => nC,
  forEach: () => rC,
  insertContent: () => iC,
  insertContentAt: () => oC,
  insertDefaultBlock: () => sC,
  joinBackward: () => cC,
  joinDown: () => lC,
  joinForward: () => uC,
  joinItemBackward: () => dC,
  joinItemForward: () => fC,
  joinTextblockBackward: () => hC,
  joinTextblockForward: () => pC,
  joinUp: () => aC,
  keyboardShortcut: () => mC,
  lift: () => yC,
  liftEmptyBlock: () => bC,
  liftListItem: () => vC,
  newlineInCode: () => wC,
  resetAttributes: () => xC,
  scrollIntoView: () => kC,
  selectAll: () => SC,
  selectNodeBackward: () => CC,
  selectNodeForward: () => RC,
  selectParentNode: () => TC,
  selectTextblockEnd: () => EC,
  selectTextblockStart: () => MC,
  setContent: () => AC,
  setMark: () => qC,
  setMeta: () => WC,
  setNode: () => jC,
  setNodeSelection: () => KC,
  setTextDirection: () => UC,
  setTextSelection: () => GC,
  sinkListItem: () => YC,
  splitBlock: () => XC,
  splitListItem: () => VC,
  toggleList: () => ZC,
  toggleMark: () => QC,
  toggleNode: () => e2,
  toggleWrap: () => t2,
  undoInputRule: () => n2,
  unsetAllMarks: () => r2,
  unsetMark: () => i2,
  unsetTextDirection: () => o2,
  updateAttributes: () => s2,
  updateDecorations: () => l2,
  wrapIn: () => c2,
  wrapInList: () => u2
});
typeof process < "u" && process.env.NODE_ENV;
function f2(t) {
  return Object.prototype.toString.call(t).slice(8, -1);
}
function ya(t) {
  return f2(t) !== "Object" ? !1 : t.constructor === Object && Object.getPrototypeOf(t) === Object.prototype;
}
function Rv(t, e) {
  const n = { ...t };
  return ya(t) && ya(e) && Object.keys(e).forEach((r) => {
    ya(e[r]) && ya(t[r]) ? n[r] = Rv(t[r], e[r]) : n[r] = e[r];
  }), n;
}
var Tv = class {
  constructor(t = {}) {
    this.type = "extendable", this.parent = null, this.child = null, this.name = "", this.config = { name: this.name }, this.config = {
      ...this.config,
      ...t
    }, this.name = this.config.name;
  }
  get options() {
    return { ...wf(Ps(this, "addOptions", { name: this.name })) };
  }
  get storage() {
    return { ...wf(Ps(this, "addStorage", {
      name: this.name,
      options: this.options
    })) };
  }
  configure(t = {}) {
    const e = this.extend({
      ...this.config,
      addOptions: () => Rv(this.options, t)
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
}, h2 = class Ev extends Tv {
  constructor(...e) {
    super(...e), this.type = "mark";
  }
  /**
  * Create a new Mark instance
  * @param config - Mark configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const n = typeof e == "function" ? e() : e;
    return new Ev(n);
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
}, _r = class Mv extends Tv {
  constructor(...e) {
    super(...e), this.type = "extension";
  }
  /**
  * Create a new Extension instance
  * @param config - Extension configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const n = typeof e == "function" ? e() : e;
    return new Mv(n);
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
    return [new pi({
      key: new Kr("clipboardTextSerializer"),
      props: { clipboardTextSerializer: () => {
        const { editor: t } = this, { state: e, schema: n } = t, { doc: r, selection: i } = e, o = zC(n), { blockSeparator: s } = this.options, a = {
          ...s !== void 0 ? { blockSeparator: s } : {},
          textSerializers: o
        };
        return [...i.ranges].sort((l, c) => l.$from.pos - c.$from.pos).map(({ $from: l, $to: c }) => OC(r, {
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
    return { ...d2 };
  }
});
_r.create({
  name: "delete",
  onUpdate({ transaction: t, appendedTransactions: e }) {
    var n, r;
    const i = () => {
      var o, s, a;
      if ((o = (s = this.editor.options.coreExtensionOptions) === null || s === void 0 || (s = s.delete) === null || s === void 0 || (a = s.filterTransaction) === null || a === void 0 ? void 0 : a.call(s, t)) !== null && o !== void 0 ? o : t.getMeta("y-sync$")) return;
      const l = PC(t.before, [t, ...e]);
      FC(l).forEach((u) => {
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
          const p = c.slice(d).map(u.from, -1), g = c.slice(d).map(u.to), y = c.invert().map(p, -1), m = c.invert().map(g), b = p > 0 ? (f = l.doc.nodeAt(p - 1)) === null || f === void 0 ? void 0 : f.marks.some((E) => E.eq(u.mark)) : !1, C = (h = l.doc.nodeAt(g)) === null || h === void 0 ? void 0 : h.marks.some((E) => E.eq(u.mark));
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
    return [new pi({
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
    return [new pi({
      key: new Kr("editable"),
      props: { editable: () => this.editor.options.editable }
    })];
  }
});
const p2 = new Kr("focusEvents");
_r.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: t } = this;
    return [new pi({
      key: p2,
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
    return Ya() || wv() ? o : i;
  },
  addProseMirrorPlugins() {
    return [new pi({
      key: new Kr("clearDocument"),
      appendTransaction: (t, e, n) => {
        if (t.some((h) => h.getMeta("composition"))) return;
        const r = t.some((h) => h.docChanged) && !e.doc.eq(n.doc), i = t.some((h) => h.getMeta("preventClearDocument"));
        if (!r || i) return;
        const { empty: o, from: s, to: a } = e.selection, l = No.atStart(e.doc).from, c = No.atEnd(e.doc).to;
        if (o || !(s === l && a === c) || !Sv(n.doc)) return;
        const u = n.tr, d = uv({
          state: n,
          transaction: u
        }), { commands: f } = new zS({
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
    return [new pi({
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
    return [new pi({
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
    const { nodeExtensions: t } = kv(this.extensions);
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
    return [new pi({
      key: new Kr("textDirection"),
      props: { attributes: () => {
        const t = this.options.direction;
        return t ? { dir: t } : {};
      } }
    })];
  }
});
const g2 = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), m2 = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), y2 = /^(https?:\/\/|mailto:)/i;
function b2(t) {
  if (!t) return "";
  const e = [];
  for (const n of t.split(";")) {
    const r = n.indexOf(":");
    if (r < 0) continue;
    const i = n.slice(0, r).trim().toLowerCase(), o = n.slice(r + 1).trim();
    m2.has(i) && o && e.push(`${i}: ${o}`);
  }
  return e.join("; ");
}
function xf(t) {
  if (t.nodeType === Node.TEXT_NODE) return t;
  if (t.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const e = t, n = e.tagName.toLowerCase(), r = () => {
    const a = document.createDocumentFragment();
    for (const l of Array.from(e.childNodes)) a.appendChild(xf(l));
    return a;
  };
  if (!g2.has(n)) return r();
  if (n === "a") {
    const a = e.getAttribute("href") || "";
    if (!y2.test(a)) return r();
  }
  const i = document.createElement(n), o = e.getAttribute("style"), s = b2(o || "");
  if (s && i.setAttribute("style", s), n === "span") {
    const a = e.getAttribute("data-text-style");
    a && i.setAttribute("data-text-style", a);
  }
  if (n === "a") {
    i.setAttribute("href", e.getAttribute("href"));
    const a = e.getAttribute("target"), l = e.getAttribute("rel");
    a && i.setAttribute("target", a), l && i.setAttribute("rel", l);
  }
  for (const a of Array.from(e.childNodes)) i.appendChild(xf(a));
  return i;
}
function Iv(t) {
  return t.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function v2(t) {
  const e = Iv(t);
  if (!e || !e.includes("<")) return e;
  const n = document.createElement("template");
  n.innerHTML = e;
  const r = document.createDocumentFragment();
  for (const s of Array.from(n.content.childNodes)) r.appendChild(xf(s));
  const i = document.createElement("div");
  return i.appendChild(r), i.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function y3(t) {
  const e = Iv(t);
  if (!e || !e.includes("<")) return e;
  const n = document.createElement("template");
  return n.innerHTML = e, (n.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function b3(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function w2(t) {
  return t.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function Op(t) {
  return t.replace(/\{\{([^{}]+)\}\}/g, (e, n) => `<span data-type="token" data-field="${n}">{{${n}}}</span>`);
}
const x2 = { text: "#52525b" }, k2 = ({ node: t, selected: e, extension: n, editor: r, view: i, getPos: o }) => {
  var f;
  const s = t.attrs.field ?? "", a = n.options, l = ((f = a.resolve) == null ? void 0 : f.call(a, s)) ?? null, c = (l == null ? void 0 : l.color) ?? x2, u = (l == null ? void 0 : l.label) ?? `{{${s}}}`, d = l == null ? void 0 : l.nested;
  return /* @__PURE__ */ A(
    nx,
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
}, S2 = mx.extend({
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
    return tx(k2);
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
    return ["span", ex({ "data-type": "token" }, e), `{{${t.attrs.field ?? ""}}}`];
  },
  renderText({ node: t }) {
    return `{{${t.attrs.field ?? ""}}}`;
  }
}), C2 = 240, R2 = 280, T2 = ({ props: t, onApi: e }) => {
  const n = ul(), r = Y(e);
  r.current = e, Ye(() => {
    r.current(n);
  }, [n]);
  const i = Y(null);
  Ye(() => {
    var s;
    n.pointerDriven || hi((s = i.current) == null ? void 0 : s.querySelector(".ui-item-highlighted"));
  }, [n.highlightedIndex, n.pointerDriven]), Ye(() => {
    t.items.length > 0 && n.highlightedIndex === -1 && n.setHighlighted(0, "keyboard");
  }, [t.items.length, n.highlightedIndex, n]);
  const o = cl();
  return /* @__PURE__ */ A(Hs.Provider, { value: n, children: /* @__PURE__ */ A(
    "div",
    {
      role: "listbox",
      "data-token-popup": !0,
      className: "ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto",
      style: { width: R2, maxHeight: C2 },
      onMouseDown: (s) => s.preventDefault(),
      children: /* @__PURE__ */ A("div", { ref: i, children: t.items.map((s) => /* @__PURE__ */ A(
        E2,
        {
          item: s,
          d: o,
          command: () => t.command({ field: s.key })
        },
        s.key
      )) })
    }
  ) });
}, E2 = ({ item: t, d: e, command: n }) => {
  const { myIndex: r, highlighted: i, setPointer: o } = gb({
    label: () => t.label,
    activate: n
  }), s = mn(), a = { padding: `${Ie(8, 12, s)}px ${Ie(12, 16, s)}px`, fontSize: Ie(12, 14, s) };
  return /* @__PURE__ */ fe(
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
}, zp = () => {
  let t = null;
  const e = (r) => {
    t && (t.props = r, t.holder.style.display = r.items.length > 0 ? "" : "none", t.root.render(
      /* @__PURE__ */ A(T2, { props: r, onApi: (i) => {
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
      const o = yx(i);
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
}, M2 = h2.create({
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
}), Na = new Kr("retainedSelectionHighlight"), I2 = _r.create({
  name: "retainedSelectionHighlight",
  addProseMirrorPlugins() {
    return [
      new pi({
        key: Na,
        state: {
          init: () => ({ held: !1, decorations: sa.empty }),
          apply(t, e) {
            const n = t.getMeta(Na), r = n ? n.held : e.held;
            if (!r) return { held: !1, decorations: sa.empty };
            const { from: i, to: o, empty: s } = t.selection;
            return {
              held: r,
              decorations: s ? sa.empty : sa.create(t.doc, [sx.inline(i, o, { class: "rt-retained-selection" })])
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
}), v3 = {
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
function Av(t, e) {
  const n = t.state.doc.resolve(e).nodeBefore;
  return n && n.type.name === "token" ? n.attrs.field ?? "" : null;
}
function A2(t) {
  const e = t.state.selection.$from, n = e.nodeBefore;
  if (!(n != null && n.isText)) return null;
  const r = n.text || "", i = r.lastIndexOf(".");
  if (i < 0) return null;
  const o = e.pos - r.length + i, s = Av(t, o);
  return s == null ? null : { chipKey: s, dotPos: o };
}
const _2 = _t.forwardRef(({
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
  const f = Y(s);
  f.current = s;
  const h = Y(a);
  h.current = a;
  const p = Y(l);
  p.current = l;
  const g = Y(c);
  g.current = c;
  const y = Y(u);
  y.current = u;
  const m = Y(null), b = Y(null), C = Y(e);
  C.current = e;
  const E = Y(r);
  E.current = r;
  const v = Y(o);
  v.current = o;
  const T = Y(null), D = (x) => {
    var G;
    const I = x.getAttributes("textStyle"), _ = x.getAttributes("reportTextStyle"), { from: M, to: O, empty: L } = x.state.selection;
    let W = !1, re = !1, F = !1;
    if (!L) {
      const j = /* @__PURE__ */ new Set(), ee = /* @__PURE__ */ new Set(), q = /* @__PURE__ */ new Set();
      x.state.doc.nodesBetween(M, O, (Q) => {
        if (!Q.isText) return;
        const X = Q.marks.find((K) => K.type.name === "textStyle");
        j.add((X == null ? void 0 : X.attrs.fontFamily) || ""), ee.add((X == null ? void 0 : X.attrs.fontSize) || "");
        const J = Q.marks.find((K) => K.type.name === "reportTextStyle");
        q.add((J == null ? void 0 : J.attrs.styleId) || "");
      }), W = j.size > 1, re = ee.size > 1, F = q.size > 1;
    }
    const N = {
      bold: x.isActive("bold"),
      italic: x.isActive("italic"),
      underline: x.isActive("underline"),
      strike: x.isActive("strike"),
      link: x.isActive("link"),
      color: I.color || "",
      fontFamily: I.fontFamily || "",
      fontSize: I.fontSize || "",
      textStyle: _.styleId || "",
      hasSelection: !L,
      fontFamilyMixed: W,
      fontSizeMixed: re,
      textStyleMixed: F
    }, te = T.current;
    te && te.bold === N.bold && te.italic === N.italic && te.underline === N.underline && te.strike === N.strike && te.link === N.link && te.color === N.color && te.fontFamily === N.fontFamily && te.fontSize === N.fontSize && te.textStyle === N.textStyle && te.hasSelection === N.hasSelection && te.fontFamilyMixed === N.fontFamilyMixed && te.fontSizeMixed === N.fontSizeMixed && te.textStyleMixed === N.textStyleMixed || (T.current = N, (G = v.current) == null || G.call(v, N));
  }, P = (x) => {
    var L;
    const I = x.state.selection;
    let _ = null;
    I instanceof $o && I.node.type.name === "token" ? (_ = { key: I.node.attrs.field ?? "", pos: I.from }, m.current = I.from) : m.current != null && (m.current = x.state.tr.mapping.map(m.current));
    const M = b.current, O = M && _ && M.key === _.key && M.pos === _.pos;
    !M && !_ || O || (b.current = _, (L = y.current) == null || L.call(y, _));
  }, k = (x) => {
    const I = v2(w2(x));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(I) ? "" : I;
  }, z = _t.useMemo(() => {
    const x = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: M }) => {
        var O;
        return ((O = h.current) == null ? void 0 : O.call(h, M)) ?? [];
      },
      command: ({ editor: M, range: O, props: L }) => {
        M.chain().focus().insertContentAt(O, { type: "token", attrs: { field: L.field } }).run();
      },
      render: zp
    }, I = S2.configure({
      resolve: f.current ?? null,
      suggestion: x,
      onTokenClick: (M, O, L) => {
        var W;
        m.current = L, (W = g.current) == null || W.call(g, M, O, L);
      }
    }), _ = _r.create({
      name: "tokenAttributeSuggestion",
      addProseMirrorPlugins() {
        return [
          gx({
            pluginKey: new Kr("tokenAttributeSuggestion"),
            editor: this.editor,
            char: ".",
            // The gate is `shouldShow` (a chip must sit immediately before the
            // dot), not the prefix rule — the prefix here is an atom, not text.
            allowedPrefixes: null,
            decorationClass: "suggestion-attr",
            shouldShow: ({ editor: M, range: O }) => Av(M, O.from) != null,
            items: ({ editor: M, query: O }) => {
              var W;
              const L = A2(M);
              return L ? ((W = p.current) == null ? void 0 : W.call(p, L.chipKey, O)) ?? [] : [];
            },
            command: ({ editor: M, range: O, props: L }) => {
              M.chain().focus().insertContentAt(O, { type: "token", attrs: { field: L.field } }).run();
            },
            render: zp
          })
        ];
      }
    });
    return [I, _];
  }, []), S = rx({
    immediatelyRender: !1,
    extensions: [
      ax,
      lx.configure({ placeholder: n }),
      cx,
      ux,
      dx,
      M2,
      I2,
      fx,
      px,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      hx.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      ...z
    ],
    content: Op(t || ""),
    editable: !r,
    onUpdate: ({ editor: x }) => {
      C.current(k(x.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: x }) => {
      D(x), P(x);
    }
  });
  return Ye(() => {
    if (!S || S.isFocused) return;
    k(S.getHTML()) !== t && (T.current = null, S.commands.setContent(Op(t || ""), { emitUpdate: !1 }), D(S));
  }, [t, S]), Ye(() => {
    S && S.setEditable(!r);
  }, [r, S]), Ye(() => {
    S && (T.current = null, D(S), P(S));
  }, [S]), By(d, () => ({
    exec: (x, I, _) => {
      if (!S || E.current) return;
      const M = S.chain(), O = (_ == null ? void 0 : _.focus) === !1 ? M : M.focus();
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
          I && O.setColor(I).run();
          break;
        case "unsetColor":
          O.unsetColor().run();
          break;
        case "fontFamily":
          I && O.setFontFamily(I).run();
          break;
        case "unsetFontFamily":
          O.unsetFontFamily().run();
          break;
        case "fontSize":
          I && O.setFontSize(I).run();
          break;
        case "unsetFontSize":
          O.unsetFontSize().run();
          break;
        // Linked named style: mark the run with the consumer's style id. Direct
        // font family/size on the range is cleared so the linked style's
        // typography takes effect (the object-level precedent); bold/italic
        // marks stay — direct character formatting still wins (Word).
        case "textStyle":
          I && O.setMark("reportTextStyle", { styleId: I }).unsetFontFamily().unsetFontSize().run();
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
          I && O.extendMarkRange("link").setLink({ href: I }).run();
          break;
        case "unlink":
          O.extendMarkRange("link").unsetLink().run();
          break;
      }
    },
    focus: (x) => S == null ? void 0 : S.commands.focus(x),
    insertToken: (x) => {
      !S || E.current || S.chain().focus().insertContent({ type: "token", attrs: { field: x } }).run();
    },
    replaceToken: (x) => {
      if (!S || E.current) return;
      const I = m.current;
      I != null && S.commands.command(({ tr: _ }) => {
        const M = _.doc.nodeAt(I);
        if (!M || M.type.name !== "token") return !1;
        _.setNodeMarkup(I, void 0, { field: x });
        const O = _.doc.resolve(I);
        return O.nodeAfter && O.nodeAfter.type.name === "token" && _.setSelection(new $o(O)), !0;
      });
    },
    holdSelectionHighlight: (x) => {
      !S || S.isDestroyed || S.view.dispatch(S.state.tr.setMeta(Na, { held: x }));
    }
  }), [S]), /* @__PURE__ */ A(ix, { editor: S, className: `richtext-editor ${i || ""}` });
});
_2.displayName = "RichTextEditor";
const P2 = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], D2 = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], Lp = ({ className: t = "w-3 h-3" }) => /* @__PURE__ */ A("span", { className: `${t} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ A("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), N2 = ({ value: t, disabled: e, onChange: n, mixed: r }) => {
  const [i, o] = Xe(!1);
  return /* @__PURE__ */ A(
    dl,
    {
      open: i,
      onOpenChange: o,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ fe("button", { type: "button", disabled: e, className: `${vk} w-28 justify-between`, children: [
        r ? /* @__PURE__ */ A("span", { className: "truncate italic text-zinc-500", children: "Mixed" }) : /* @__PURE__ */ A("span", { className: "truncate", style: { fontFamily: t || "Helvetica" }, children: t || "Helvetica" }),
        /* @__PURE__ */ A(ci, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: P2.map((s) => /* @__PURE__ */ A(jx, { onClick: () => {
        n(s), o(!1);
      }, icon: !r && s === t ? /* @__PURE__ */ A(zs, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ A("span", { style: { fontFamily: s }, children: s }) }, s))
    }
  );
}, O2 = ({ editorRef: t, disabled: e, active: n }) => {
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
        cr,
        {
          theme: "dark",
          active: n,
          disabled: e,
          onMouseDown: (c) => c.preventDefault(),
          style: { ...o.toggle, padding: 0 },
          className: "justify-center",
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ A(jw, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ fe("div", { className: "p-2 flex flex-col gap-2", children: [
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
            className: yk + " w-full"
          }
        ),
        /* @__PURE__ */ fe("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ A(cr, { theme: "dark", onClick: l, style: o.control, disabled: !s.trim(), children: "Apply" }),
          /* @__PURE__ */ A(
            cr,
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
}, w3 = ({ editorRef: t, disabled: e, active: n, lockedFormatting: r, trailing: i, font: o, fontSizeSlot: s, showClearFormatting: a, dividers: l = !0 }) => {
  const [c, u] = Xe(!1), d = (y, m) => {
    var b;
    return (b = t.current) == null ? void 0 : b.exec(y, m);
  }, f = fl(), h = (y) => !!(r != null && r[y]), p = "flex items-center gap-1 shrink-0", g = l ? /* @__PURE__ */ A("div", { className: wb }) : null;
  return /* @__PURE__ */ fe("div", { className: `flex flex-wrap items-center ${l ? "gap-x-1" : "gap-x-2"} gap-y-1.5`, children: [
    /* @__PURE__ */ fe("div", { className: p, children: [
      /* @__PURE__ */ A(Co, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ A(cr, { theme: "dark", "aria-label": "Bold", active: ((n == null ? void 0 : n.bold) ?? !1) || h("bold"), disabled: e || h("bold"), onMouseDown: (y) => y.preventDefault(), onClick: () => d("bold"), style: { ...f.toggle, padding: 0 }, className: "justify-center font-bold", children: "B" }) }),
      /* @__PURE__ */ A(Co, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ A(cr, { theme: "dark", "aria-label": "Italic", active: ((n == null ? void 0 : n.italic) ?? !1) || h("italic"), disabled: e || h("italic"), onMouseDown: (y) => y.preventDefault(), onClick: () => d("italic"), style: { ...f.toggle, padding: 0 }, className: "justify-center italic", children: "I" }) }),
      /* @__PURE__ */ A(Co, { content: "Underline", children: /* @__PURE__ */ A(cr, { theme: "dark", "aria-label": "Underline", active: (n == null ? void 0 : n.underline) ?? !1, disabled: e, onMouseDown: (y) => y.preventDefault(), onClick: () => d("underline"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ A(Bw, { className: "w-3 h-3" }) }) }),
      /* @__PURE__ */ A(Co, { content: "Strikethrough", children: /* @__PURE__ */ A(cr, { theme: "dark", "aria-label": "Strikethrough", active: (n == null ? void 0 : n.strike) ?? !1, disabled: e, onMouseDown: (y) => y.preventDefault(), onClick: () => d("strikeThrough"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ A(qw, { className: "w-3 h-3" }) }) })
    ] }),
    g,
    /* @__PURE__ */ A("div", { className: p, children: /* @__PURE__ */ A(O2, { editorRef: t, disabled: e, active: (n == null ? void 0 : n.link) ?? !1 }) }),
    g,
    /* @__PURE__ */ A("div", { className: p, children: /* @__PURE__ */ A(
      dl,
      {
        open: c,
        onOpenChange: u,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ fe(cr, { theme: "dark", disabled: e, style: f.control, className: "justify-between min-w-0", title: "Text color", children: [
          n != null && n.color ? /* @__PURE__ */ A("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: n.color } }) : /* @__PURE__ */ A(Lp, {}),
          /* @__PURE__ */ A(ci, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ fe("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ A(
            "button",
            {
              onClick: () => {
                d("unsetColor"), u(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${n != null && n.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ A(Lp, { className: "w-3.5 h-3.5" })
            }
          ),
          D2.map((y) => /* @__PURE__ */ A(
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
    (o || s || a) && /* @__PURE__ */ fe(Dn, { children: [
      g,
      /* @__PURE__ */ fe("div", { className: p, children: [
        o && /* @__PURE__ */ A(N2, { value: o.value || "Helvetica", mixed: o.mixed, disabled: e, onChange: o.onChange }),
        s,
        a && /* @__PURE__ */ A(Co, { content: "Clear formatting", children: /* @__PURE__ */ A(
          cr,
          {
            theme: "dark",
            "aria-label": "Clear formatting",
            disabled: e,
            onMouseDown: (y) => y.preventDefault(),
            onClick: () => d("clearFormatting"),
            style: { ...f.toggle, padding: 0 },
            className: "justify-center",
            children: /* @__PURE__ */ A(Ww, { className: "w-3 h-3" })
          }
        ) })
      ] })
    ] }),
    i && /* @__PURE__ */ fe(Dn, { children: [
      g,
      /* @__PURE__ */ A("div", { className: p, children: i })
    ] })
  ] });
};
function rh(t, e, n) {
  return Math.max(e, Math.min(n, t));
}
function z2(t, e, n, r, i) {
  return rh(t + e * i, n, r);
}
const L2 = 2;
function $2(t, e, n, r, i) {
  return rh(t + Math.trunc(e / L2) * i, n, r);
}
const F2 = 3;
function x3({
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
  const [h, p] = Xe(null), [g, y] = Xe(!1), m = Y(!1), b = Y(null), C = Y(null), E = Y(null), v = mn(), T = bb(), D = c === void 0;
  Ye(() => () => {
    var O;
    return (O = b.current) == null ? void 0 : O.call(b);
  }, []), Nn(() => {
    const O = E.current, L = C.current;
    !D && O && L && (L.style.color = getComputedStyle(O).color);
  }, [D, c]), Ye(() => {
    m.current || p(null);
  }, [t]);
  const P = t ?? r, k = h !== null ? h : t != null ? String(t) : d ? "" : String(r), z = (O) => rh(O, e, n), S = (O) => {
    const L = z2(P, O, e, n, o);
    L !== P && (m.current && p(String(L)), i(L));
  }, x = (O) => {
    if (a || s || O.pointerType !== "mouse" || O.button !== 0) return;
    const L = O.currentTarget, W = O.clientY, re = P;
    let F = re, N = !1;
    const te = (j) => {
      const ee = W - j.clientY;
      if (!N) {
        if (Math.abs(ee) < F2) return;
        N = !0, L.blur(), L.style.userSelect = "none";
      }
      const q = $2(re, ee, e, n, o);
      q !== F && (F = q, i(q));
    }, G = () => {
      b.current = null, window.removeEventListener("pointermove", te), window.removeEventListener("pointerup", G), window.removeEventListener("pointercancel", G), L.style.userSelect = "", N && L.blur();
    };
    b.current = G, window.addEventListener("pointermove", te), window.addEventListener("pointerup", G), window.addEventListener("pointercancel", G);
  }, I = (O) => ({
    type: "button",
    tabIndex: -1,
    "aria-label": O === 1 ? "Increase" : "Decrease",
    disabled: !!a || !!s || (O === 1 ? P >= n : P <= e),
    onPointerDown: (L) => L.preventDefault(),
    onClick: () => S(O)
  }), _ = D ? Ie(22, 30, v) : Ie(16, 22, v), M = D ? Ie(14, 18, v) : Ie(11, 15, v);
  return /* @__PURE__ */ fe(
    "span",
    {
      ref: C,
      className: `ui-number ${D ? "ui-number-box" : ""}`,
      ...f ? { "data-theme": f } : {},
      children: [
        /* @__PURE__ */ A(
          "input",
          {
            ref: E,
            type: "number",
            "aria-label": l,
            title: u,
            placeholder: d,
            value: k,
            readOnly: s,
            disabled: a,
            className: c ?? "ui-input w-20",
            style: {
              ...D ? { ...T, minHeight: Ie(28, 36, v) } : {},
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
              O.key === "Enter" && O.target.blur(), O.key === "Escape" && (p(null), O.target.blur()), !s && !a && (O.key === "ArrowUp" || O.key === "ArrowDown") && (O.preventDefault(), S(O.key === "ArrowUp" ? 1 : -1));
            },
            onPointerDown: x
          }
        ),
        /* @__PURE__ */ fe("span", { className: "ui-number-steppers", style: { width: _ }, children: [
          /* @__PURE__ */ A("button", { ...I(1), className: "ui-number-step", children: /* @__PURE__ */ A(Kw, { style: { width: M, height: M } }) }),
          /* @__PURE__ */ A("button", { ...I(-1), className: "ui-number-step", children: /* @__PURE__ */ A(ci, { style: { width: M, height: M } }) })
        ] })
      ]
    }
  );
}
function k3({ title: t, icon: e, count: n, tone: r = "default", collapsed: i, onToggle: o, trailing: s, bodyClass: a, className: l = "", dataProps: c, children: u }) {
  const d = mn(), f = _i({ px: 12, py: 8, fs: 12 }, { px: 14, py: 12, fs: 14 }), h = Ie(14, 16, d), p = { width: h, height: h }, g = Ie(10, 12, d);
  return /* @__PURE__ */ fe("div", { ...c, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${l}`, children: [
    /* @__PURE__ */ fe("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1 bg-[var(--ui-card-header-bg)] text-[color:var(--ui-card-header-text)] hover:bg-[var(--ui-card-header-hover)] transition-colors", style: f, children: [
      /* @__PURE__ */ fe(
        "button",
        {
          type: "button",
          onClick: o,
          className: "flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer",
          children: [
            i ? /* @__PURE__ */ A(La, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: p }) : /* @__PURE__ */ A(ci, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: p }),
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
function ih({
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
  const d = Y(null), f = Y(null), [h, p] = Xe(null), g = (T) => {
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
  const [y, m] = Xe(!1), [b, C] = Xe(null), E = Y(!1);
  Nn(() => {
    if (t) {
      E.current = !0, m(!1), C(null);
      return;
    }
    if (!E.current || e !== "auto") return;
    E.current = !1, m(!0);
    let T = 0, D = 0;
    return (() => {
      var S;
      const k = (S = d.current) == null ? void 0 : S.firstElementChild, z = (k == null ? void 0 : k.getBoundingClientRect().width) ?? 0;
      z > 0 ? (T = requestAnimationFrame(() => C(z)), D = window.setTimeout(() => {
        m(!1), C(null);
      }, Pi + 30)) : m(!1);
    })(), () => {
      cancelAnimationFrame(T), window.clearTimeout(D);
    };
  }, [t, e]);
  const v = t ? h ?? n : y ? b ?? n : e === "auto" ? "auto" : e;
  return /* @__PURE__ */ fe(
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
function _v({
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
  onCancel: E,
  cancelOnEscape: v = !1,
  cancelOnOutside: T = !1,
  className: D = "",
  "aria-label": P
}) {
  const [k, z] = Xe(h), S = Y(k);
  S.current = k;
  const x = Y(null), I = Y(null), _ = Y(null), M = Yy(), O = mn(), L = Ie(9, 13, O), W = Ne((J) => {
    S.current !== J && (S.current = J, z(J), p == null || p(J));
  }, [p]), re = Ne((J = !1) => {
    var K;
    W(!1), (K = I.current) == null || K.blur(), J && requestAnimationFrame(() => {
      var se;
      return (se = _.current) == null ? void 0 : se.focus();
    });
  }, [W]), F = Ne(() => {
    W(!0), requestAnimationFrame(() => {
      const J = I.current;
      if (!J) return;
      J.focus();
      const K = J.value.length;
      J.setSelectionRange(K, K);
    });
  }, [W]);
  Ye(() => {
    h && F();
  }, [h, F]), Ye(() => {
    var se;
    if (!k) return;
    const J = ((se = x.current) == null ? void 0 : se.ownerDocument) ?? document, K = (le) => {
      var Re;
      const Ce = le.target;
      Ce && ((Re = x.current) != null && Re.contains(Ce) || (T && (E == null || E()), re()));
    };
    return J.addEventListener("pointerdown", K, !0), () => J.removeEventListener("pointerdown", K, !0);
  }, [k, re, T, E]);
  const N = Ne((J) => {
    var se;
    if (!k) return;
    const K = J.relatedTarget;
    K && ((se = x.current) != null && se.contains(K)) || (T && (E == null || E()), re());
  }, [k, re, T, E]), te = Ne((J) => {
    if (J.key === "Enter") {
      J.preventDefault(), C == null || C(t), re(!0);
      return;
    }
    J.key === "Escape" && (J.preventDefault(), J.stopPropagation(), v ? E == null || E() : e(""), re(!0));
  }, [e, re, v, E, C, t]), G = r === void 0 ? /* @__PURE__ */ A(Io, { className: "w-3.5 h-3.5" }) : r, j = m === void 0 ? G : m, Q = 8 + (((y == null ? void 0 : y.length) || 0) + (b && t ? 1 : 0)) * (M.box + 2), X = (J) => /* @__PURE__ */ A(
    "span",
    {
      style: { width: M.icon, height: M.icon },
      className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
      children: J
    }
  );
  return /* @__PURE__ */ A(
    ih,
    {
      expanded: k,
      collapsedWidth: o,
      expandedWidth: s,
      rootRef: x,
      shrink: !0,
      stretch: g,
      "data-morph-search": !0,
      "data-theme": d,
      "data-expanded": k ? "true" : "false",
      className: D,
      onBlur: N,
      trigger: /* @__PURE__ */ A(
        cr,
        {
          ref: _,
          type: "button",
          variant: a,
          size: "minimal",
          theme: d,
          icon: G,
          collapse: l,
          iconWithLabel: c,
          revealOnHover: u,
          active: f,
          keepLabelOnActive: !0,
          onClick: F,
          className: `${l ? "w-auto" : "w-full"} ${g ? "justify-center" : "justify-start"} ${k ? "pointer-events-none" : ""}`,
          tabIndex: k ? -1 : 0,
          "aria-expanded": k,
          "aria-label": P || n,
          "data-morph-search-trigger": !0,
          children: /* @__PURE__ */ A("span", { className: `min-w-0 ${l ? "" : "truncate"}`, children: n })
        }
      ),
      field: /* @__PURE__ */ fe(Dn, { children: [
        j && /* @__PURE__ */ A(
          "span",
          {
            className: "ui-icon absolute top-1/2 -translate-y-1/2 pointer-events-none",
            style: { left: L, width: M.icon, height: M.icon },
            children: X(j)
          }
        ),
        /* @__PURE__ */ A(
          "input",
          {
            ref: I,
            value: t,
            onChange: (J) => e(J.target.value),
            onKeyDown: te,
            placeholder: i,
            "aria-label": P || i,
            tabIndex: k ? 0 : -1,
            "data-morph-search-input": !0,
            style: { paddingLeft: j ? L + M.icon + 6 : 10, paddingRight: Q },
            className: `${Ha("sm")} w-full`
          }
        ),
        /* @__PURE__ */ fe("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
          y == null ? void 0 : y.map((J) => /* @__PURE__ */ A(
            "button",
            {
              type: "button",
              "aria-label": J.label,
              title: J.label,
              tabIndex: k ? 0 : -1,
              onMouseDown: (K) => K.preventDefault(),
              onClick: () => {
                J.onClick(t, { close: () => re(!0) }), J.keepOpen || re(!0);
              },
              style: { width: M.box, height: M.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-action": J.key,
              children: X(J.icon)
            },
            J.key
          )),
          b && t && /* @__PURE__ */ A(
            "button",
            {
              type: "button",
              "aria-label": "Clear",
              tabIndex: k ? 0 : -1,
              onClick: () => {
                e(""), requestAnimationFrame(() => {
                  var J;
                  return (J = I.current) == null ? void 0 : J.focus();
                });
              },
              style: { width: M.box, height: M.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-clear": !0,
              children: /* @__PURE__ */ A(eo, { size: M.icon })
            }
          )
        ] })
      ] })
    }
  );
}
function H2({
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
      icon: /* @__PURE__ */ A(zs, { className: "w-3.5 h-3.5" }),
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
    _v,
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
function B2(t) {
  return t.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
}
function q2(t, e, n) {
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
function Pv(t, e, n) {
  const r = B2(n), i = r.length > 0, o = new Map(e.map((c) => [c.key, c])), s = [];
  for (const c of t) {
    const { matched: u, detail: d } = q2(c, c.group ? o.get(c.group) : void 0, r);
    u && s.push({ item: c, detail: d });
  }
  const a = new Set(s.map((c) => c.item.group).filter(Boolean)), l = i ? e.filter((c) => a.has(c.key) || c.label.toLowerCase().includes(n.trim().toLowerCase())) : e;
  return { hits: s, visibleGroups: l, hasQuery: i };
}
function W2(t) {
  var u;
  const { hits: e, visibleGroups: n, hasQuery: r } = Pv(t.items, t.groups, t.query), i = [];
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
function j2({
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
  autoFocus: E = !0,
  collapsedWidth: v = 128,
  expandedWidth: T = 288,
  panelWidth: D,
  panelMinWidth: P,
  keepAllRows: k = !1,
  maxMenuHeight: z = 420,
  theme: S = "light",
  morph: x = !0,
  emptyTitle: I,
  emptyHint: _,
  renderEmpty: M,
  emptyActions: O,
  leadingActions: L,
  hideLeadingOnEmpty: W = !1,
  footerActions: re,
  fieldActions: F,
  multiple: N,
  open: te,
  onOpenChange: G,
  hideTrigger: j = !1,
  anchorRef: ee,
  portalTarget: q,
  renderTrigger: Q,
  renderItem: X,
  highlightOnOpen: J = !0,
  ref: K
}) {
  const se = l !== void 0, [le, Ce] = Xe(""), Re = se ? l : le, Be = Ne(($) => {
    se || Ce($), c == null || c($);
  }, [se, c]), rt = te !== void 0, [mt, ut] = Xe(!1), ne = rt ? te : mt, _e = Ne(($) => {
    rt || ut($), G == null || G($);
  }, [rt, G]), [Ae, Ke] = Xe(n === "inline"), Fe = gn(() => e.map(($) => $.key).join("\0"), [e]), ze = gn(() => new Set(Fe ? Fe.split("\0") : []), [Fe]), [Je, gt] = Xe(() => y ? ze : /* @__PURE__ */ new Set()), [Se, Ve] = Xe(0), kt = Y(!1), yt = Y(null), et = Ne(($, ve = "keyboard") => {
    kt.current = ve === "pointer", Ve($);
  }, []), Ct = Y(null), dt = Y(null), ft = Y(null), Ot = Y(null), pe = Y(null), ke = Y(0), ue = Ls(), ye = oo(), He = cl(), Rt = qf(), Pt = db(), it = Yy(), he = 8 + (((F == null ? void 0 : F.length) || 0) + (Re ? 1 : 0)) * (it.box + 2), [we, qe] = Xe({ top: 0, left: 0, maxH: 288, ready: !1 }), [Ue, zt] = Xe(0);
  eb({
    anchorRef: ee ?? Ct,
    panelRef: Ot,
    open: ne,
    maxHeight: z,
    anchorRectRef: pe,
    onPosition: ($) => qe({ top: $.top, left: $.left, maxH: $.maxH, ready: $.ready })
  }), Ye(() => {
    const $ = (ee == null ? void 0 : ee.current) ?? Ct.current;
    !ne || !$ || zt($.getBoundingClientRect().width);
  }, [ne, Ae, ee]);
  const [tn, bt] = Xe(!1);
  Ye(() => {
    ne && bt(!0);
  }, [ne]);
  const Z = ll({
    visible: ne,
    morph: x,
    anchor: () => {
      var $;
      return (($ = (ee == null ? void 0 : ee.current) ?? Ct.current) == null ? void 0 : $.getBoundingClientRect()) ?? null;
    },
    ref: Ot,
    cloneOnUnmount: !0,
    onClosed: () => bt(!1)
  }), xe = (O || []).map(
    ($) => typeof $.label == "function" ? $.label(Re) : $.label
  ), Te = gn(
    () => W2({
      items: t,
      groups: e,
      /* show-all mode: the query only moves the highlight, every option stays
         in the list (the old I/E + D/N autocomplete contract). */
      query: k ? "" : Re,
      browseGroups: p || y || g,
      browseAll: b,
      expandedGroups: Je,
      emptyActionLabels: xe
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, e, Re, k, p, y, g, b, Je, xe.join("\0")]
  ), Ze = gn(
    () => (L || []).map(($, ve) => ({
      kind: "action",
      label: typeof $.label == "function" ? $.label(Re) : $.label,
      actionIndex: ve,
      source: "leading"
    })),
    [L, Re]
  ), vt = gn(
    () => (re || []).map(($, ve) => ({
      kind: "action",
      label: typeof $.label == "function" ? $.label(Re) : $.label,
      actionIndex: ve,
      source: "footer"
    })),
    [re, Re]
  ), Bt = Te.some(($) => $.kind === "empty"), ht = Ze.length > 0 && !(W && Bt), Tt = ht ? Ze.length : 0, Mt = gn(
    () => [...ht ? Ze : [], ...Te, ...vt],
    [ht, Ze, Te, vt]
  ), Et = !!d || g && !Re.trim(), nn = gn(
    () => Mt.map(($, ve) => ({ row: $, index: ve })).filter(($) => !($.row.kind === "empty" || $.row.kind === "item" && $.row.hidden || $.row.kind === "group" && !Et)),
    [Mt, Et]
  ), xr = (g || y) && !Re.trim(), qt = !!N, yn = gn(
    () => t.filter(($) => $.checkable !== !1).map(($) => $.id),
    [t]
  ), On = gn(() => Re.trim() ? Pv(t, e, Re).hits.filter(($) => $.item.checkable !== !1).map(($) => $.item.id) : yn, [t, e, Re, yn]), Gn = gn(() => new Set(On), [On]), Xt = ob({
    mode: (N == null ? void 0 : N.mode) ?? "draft",
    selectedIds: (N == null ? void 0 : N.selectedIds) ?? ab,
    itemIds: yn,
    visibleIds: On,
    max: N == null ? void 0 : N.max,
    disabledIds: N == null ? void 0 : N.disabledIds,
    indicator: N == null ? void 0 : N.indicator,
    onCommit: N == null ? void 0 : N.onCommit,
    onDraftChange: N == null ? void 0 : N.onDraftChange,
    onToggle: N == null ? void 0 : N.onToggle
  }), zn = Y(Xt.reset);
  zn.current = Xt.reset;
  const dr = typeof (N == null ? void 0 : N.commitLabel) == "function" ? N.commitLabel(Xt.count) : (N == null ? void 0 : N.commitLabel) ?? `Select ${Xt.count}`, bn = Ne(() => {
    var $;
    _e(!1), n === "expandable" && (($ = dt.current) == null || $.blur(), Ke(!1), requestAnimationFrame(() => {
      var ve;
      return (ve = ft.current) == null ? void 0 : ve.focus();
    })), rt || Be(""), et(0), gt(y ? ze : /* @__PURE__ */ new Set()), f == null || f();
  }, [n, f, Be, y, ze, rt, _e]);
  Ye(() => {
    if (Re.trim() || !y) {
      gt(($) => $.size ? /* @__PURE__ */ new Set() : $);
      return;
    }
    gt(($) => $.size === ze.size && [...ze].every((ve) => $.has(ve)) ? $ : ze);
  }, [Re, y, ze]);
  const fr = Y(!1), Yn = Y(!1);
  Ye(() => {
    if (!ne) {
      fr.current = !1;
      return;
    }
    if (fr.current || !g || Re.trim()) return;
    const $ = C ? [C] : [...(N == null ? void 0 : N.selectedIds) ?? []], ve = new Set($), Oe = ve.size ? e.filter((nt) => t.some((Wt) => Wt.group === nt.key && ve.has(Wt.id))).map((nt) => nt.key) : [];
    if (Oe.length === 0) {
      fr.current = !0;
      return;
    }
    const Ge = m === "single" ? Oe.slice(0, 1) : Oe;
    if (!Ge.every((nt) => Je.has(nt))) {
      Yn.current = !0, gt(new Set(Ge));
      return;
    }
    if (J && C) {
      const nt = Mt.findIndex((Wt) => Wt.kind === "item" && Wt.hit.item.id === C);
      nt >= 0 && et(nt);
    }
    fr.current = !0;
  }, [ne, g, Re, e, t, C, N == null ? void 0 : N.selectedIds, m, Je, Mt, J, et]);
  const dn = Ne(($) => {
    gt((ve) => {
      const Oe = new Set(ve);
      return Oe.has($) ? Oe.delete($) : (m === "single" && Oe.clear(), Oe.add($)), Oe;
    });
  }, [m]), Sn = Ne(() => {
    var ve;
    if (ne) {
      (ve = dt.current) == null || ve.focus();
      return;
    }
    if (zn.current(), n === "expandable" && !Ae) {
      const Oe = Ct.current;
      if (Oe) {
        const Ge = Oe.style.transition, nt = Oe.style.width;
        Oe.style.transition = "none", Oe.style.width = `${T}px`;
        const Wt = Oe.getBoundingClientRect();
        pe.current = { left: Wt.left, top: Wt.top, width: Wt.width, height: Wt.height }, Oe.style.width = nt, Oe.offsetWidth, Oe.style.transition = Ge, window.clearTimeout(ke.current), ke.current = window.setTimeout(() => {
          pe.current = null;
        }, Pi + 80);
      }
    }
    Ke(!0), _e(!0);
    const $ = C ? Te.findIndex((Oe) => Oe.kind === "item" && Oe.hit.item.id === C) : -1;
    et($ >= 0 ? Tt + $ : J ? Tt : -1);
  }, [ne, n, Ae, T, Tt, Te, C, J]);
  Ye(() => () => {
    window.clearTimeout(ke.current), pe.current = null;
  }, []), Ye(() => {
    ne || (yt.current = null);
  }, [ne]), Ye(() => {
    if (n !== "expandable" || !Ae || !ne || !E) return;
    const $ = requestAnimationFrame(() => {
      var ve;
      return (ve = dt.current) == null ? void 0 : ve.focus();
    });
    return () => cancelAnimationFrame($);
  }, [n, Ae, ne, E]), Ye(() => {
    var Oe;
    if (!ne) return;
    const $ = ((Oe = Ct.current) == null ? void 0 : Oe.ownerDocument) ?? ue;
    if (!$) return;
    const ve = (Ge) => {
      var Wt, Wn, jn, hr;
      const nt = ((Wt = Ge.composedPath) == null ? void 0 : Wt.call(Ge)[0]) ?? Ge.target;
      !nt || typeof nt.nodeType != "number" || (Wn = Ct.current) != null && Wn.contains(nt) || (jn = Ot.current) != null && jn.contains(nt) || (hr = ee == null ? void 0 : ee.current) != null && hr.contains(nt) || bn();
    };
    return $.addEventListener("pointerdown", ve, !0), () => $.removeEventListener("pointerdown", ve, !0);
  }, [ne, bn, ue, ee]);
  const rr = Ne(($) => {
    var ve;
    if ($.kind === "item" ? yt.current = $.hit.item.id : ($.kind === "group" || $.kind === "action") && (yt.current = null), $.kind === "group") {
      if (qt) {
        const Oe = (ve = N == null ? void 0 : N.groupToken) == null ? void 0 : ve.call(N, $.group.key);
        if (Oe) {
          Xt.canToggle(Oe) && Xt.toggle(Oe);
          return;
        }
        const Ge = t.filter((nt) => nt.group === $.group.key && nt.checkable !== !1 && Gn.has(nt.id) && !Xt.isDisabled(nt.id)).map((nt) => nt.id);
        Ge.length && Xt.toggleGroup(Ge);
        return;
      }
      d ? (d($.group), h && bn()) : Et && dn($.group.key);
      return;
    }
    if ($.kind === "item") {
      if (qt) {
        Xt.canToggle($.hit.item.id) && Xt.toggle($.hit.item.id);
        return;
      }
      u($.hit.item), h && bn();
      return;
    }
    if ($.kind === "action") {
      const Oe = $.source === "leading" ? L : $.source === "footer" ? re : O, Ge = Oe == null ? void 0 : Oe[$.actionIndex];
      Ge && Ge.onClick(Re), h && bn();
    }
  }, [bn, h, O, re, Et, t, L, N, qt, u, d, Re, Xt, dn, Gn]), Pr = ($) => {
    if (nn.length === 0) return;
    let ve = Se;
    if (ve < 0 && yt.current) {
      const nt = nn.find(
        (Wt) => Wt.row.kind === "item" && Wt.row.hit.item.id === yt.current
      );
      nt && (ve = nt.index);
    }
    const Oe = nn.findIndex((nt) => nt.index === ve), Ge = Oe < 0 ? 0 : (Oe + $ + nn.length) % nn.length;
    et(nn[Ge].index);
  };
  By(K, () => ({
    moveHighlight: Pr,
    activateHighlighted: () => {
      if (kt.current) return !1;
      const $ = Se >= 0 ? Mt[Se] : void 0;
      return $ ? (rr($), et(-1, "keyboard"), !0) : !1;
    },
    close: bn,
    selectAll: () => {
      qt && Xt.setAll(!0);
    },
    setSelection: ($) => {
      Xt.reset($);
    }
  }), [Mt, Se, rr, bn, qt, Xt]);
  const gi = ($) => {
    if (qt && ($.metaKey || $.ctrlKey) && $.key.toLowerCase() === "a") {
      $.preventDefault(), $.stopPropagation(), Xt.setAll(!0);
      return;
    }
    if ($.key === "ArrowDown")
      $.preventDefault(), ne ? Pr(1) : Sn();
    else if ($.key === "ArrowUp")
      $.preventDefault(), Pr(-1);
    else if (($.key === "ArrowRight" || $.key === "ArrowLeft") && g && ne && !Re.trim()) {
      const ve = Mt[Se];
      if ((ve == null ? void 0 : ve.kind) === "group") {
        const Oe = Je.has(ve.group.key);
        ($.key === "ArrowRight" || Oe) && ($.preventDefault(), dn(ve.group.key));
      } else if ((ve == null ? void 0 : ve.kind) === "item" && $.key === "ArrowLeft" && ve.hit.item.group) {
        $.preventDefault();
        const Oe = ve.hit.item.group;
        Je.has(Oe) && dn(Oe);
        const Ge = Mt.findIndex((nt) => nt.kind === "group" && nt.group.key === Oe);
        Ge >= 0 && et(Ge);
      }
    } else if ($.key === "Enter") {
      $.preventDefault();
      const ve = Mt[Se] ?? Mt[0];
      ve && rr(ve);
    } else $.key === "Escape" && ($.preventDefault(), bn());
  }, Ur = ($) => {
    n === "expandable" && !Ae || (Be($), ne || _e(!0));
  };
  Ye(() => {
    if (k) {
      const ve = Re.trim().toLowerCase();
      if (!ve) {
        const Ge = C ? Te.findIndex((nt) => nt.kind === "item" && nt.hit.item.id === C) : -1;
        et(Ge >= 0 ? Tt + Ge : -1);
        return;
      }
      const Oe = Te.findIndex((Ge) => Ge.kind === "item" && Ge.hit.item.label.toLowerCase().includes(ve));
      et(Oe >= 0 ? Tt + Oe : -1);
      return;
    }
    if (rt) {
      const ve = Re.trim().toLowerCase();
      if (!!ve && t.some((Ge) => Ge.id.toLowerCase() === ve || Ge.label.toLowerCase() === ve)) {
        et(-1);
        return;
      }
      if (!qt) {
        const Ge = Te.findIndex((nt) => nt.kind === "item" && nt.hit.item.tone !== "create");
        if (Ge >= 0) {
          et(Tt + Ge);
          return;
        }
      }
    }
    const $ = Te.findIndex((ve) => ve.kind === "item");
    et($ >= 0 ? Tt + $ : Tt);
  }, [Re]), Ye(() => {
    if (!ne || Re.trim()) return;
    const $ = C ? Te.findIndex((ve) => ve.kind === "item" && ve.hit.item.id === C) : -1;
    et($ >= 0 ? Tt + $ : J ? Tt : -1);
  }, [ne]), Nn(() => {
    ne && zn.current();
  }, [ne]);
  const Qn = ($) => /* @__PURE__ */ fe("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
    F == null ? void 0 : F.map((ve) => /* @__PURE__ */ A(
      "button",
      {
        type: "button",
        "aria-label": ve.label,
        title: ve.label,
        tabIndex: Ae ? 0 : -1,
        onMouseDown: (Oe) => Oe.preventDefault(),
        onClick: () => {
          ve.onClick(Re, { close: bn }), ve.keepOpen || bn();
        },
        style: { width: it.box, height: it.box },
        className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
        "data-search-field-action": ve.key,
        children: /* @__PURE__ */ A(
          "span",
          {
            style: { width: it.icon, height: it.icon },
            className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
            children: ve.icon
          }
        )
      },
      ve.key
    )),
    Re && /* @__PURE__ */ A(
      "button",
      {
        type: "button",
        "aria-label": "Clear search",
        tabIndex: Ae ? 0 : -1,
        onPointerDown: (ve) => ve.preventDefault(),
        onClick: $,
        style: { width: it.box, height: it.box },
        className: "ui-icon-btn flex items-center justify-center rounded",
        children: /* @__PURE__ */ A(eo, { size: it.icon })
      }
    )
  ] }), kr = /* @__PURE__ */ fe("div", { className: "relative w-full", children: [
    /* @__PURE__ */ A(Io, { size: it.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ A(
      "input",
      {
        ref: dt,
        value: Re,
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
        onKeyDown: gi,
        placeholder: a,
        style: { paddingRight: he },
        className: `${Ha("sm")} w-full pl-8`
      }
    ),
    Qn(() => {
      Be(""), ne || Sn();
    })
  ] }), mi = /* @__PURE__ */ fe("div", { className: "absolute inset-0", children: [
    /* @__PURE__ */ A(Io, { size: it.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ A(
      "input",
      {
        ref: dt,
        value: Re,
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
        onKeyDown: gi,
        placeholder: a,
        tabIndex: Ae ? 0 : -1,
        style: { paddingRight: he },
        className: `${Ha("sm")} h-full w-full pl-8`
      }
    ),
    Qn(() => {
      Be(""), !ne && Ae && Sn();
    })
  ] });
  Ye(() => {
    if (!ne || kt.current) return;
    const $ = Ot.current;
    hi(
      $ == null ? void 0 : $.querySelector(`[data-search-row="${Se}"]`),
      "nearest",
      ($ == null ? void 0 : $.querySelector("[data-search-scroller]")) ?? null
    );
  }, [ne, Se]);
  const Gr = Y(Te);
  Gr.current = Te;
  const ir = Y(C);
  ir.current = C;
  const Me = Y(N == null ? void 0 : N.selectedIds);
  Me.current = N == null ? void 0 : N.selectedIds, Nn(() => {
    if (!ne || !Yn.current) return;
    const $ = Ot.current;
    if (!$) return;
    const ve = C;
    if (!ve) {
      Yn.current = !1;
      return;
    }
    const Oe = Te.findIndex((nt) => nt.kind === "item" && nt.hit.item.id === ve);
    if (Oe < 0) {
      Yn.current = !1;
      return;
    }
    const Ge = $.querySelector(`[data-search-row="${Oe}"]`);
    Ge && (hi(Ge, "center", $.querySelector("[data-search-scroller]") ?? null), Yn.current = !1);
  }, [ne, Je, Te, C]);
  const tt = ib({
    open: ne,
    block: "center",
    ready: we.ready,
    scroller: () => {
      var $;
      return (($ = Ot.current) == null ? void 0 : $.querySelector("[data-search-scroller]")) ?? null;
    },
    row: () => {
      var Oe;
      let $ = -1;
      const ve = ir.current;
      if (ve)
        $ = Gr.current.findIndex((Ge) => Ge.kind === "item" && Ge.hit.item.id === ve);
      else {
        const Ge = Me.current;
        if (Ge && Ge.length) {
          const nt = new Set(Ge);
          $ = Gr.current.findIndex((Wt) => Wt.kind === "item" && nt.has(Wt.hit.item.id));
        }
      }
      return $ < 0 ? null : ((Oe = Ot.current) == null ? void 0 : Oe.querySelector(`[data-search-row="${$}"]`)) ?? null;
    }
  }), Dt = ($, ve) => {
    const Oe = Se === ve, Ge = !qt && C !== void 0 && $.hit.item.id === C, nt = qt ? Xt.isSelected($.hit.item.id) : Ge, Wt = !!$.hit.item.disabled || qt && !Xt.canToggle($.hit.item.id), Wn = $.hit.item.tone === "create" ? S === "light" ? { background: Oe ? "#d1fae5" : "#ecfdf5", color: Oe ? "#065f46" : "#047857" } : { background: Oe ? "rgba(6, 95, 70, 0.7)" : "rgba(6, 78, 59, 0.4)", color: Oe ? "#d1fae5" : "#6ee7b7" } : void 0;
    return /* @__PURE__ */ fe(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": nt,
        tabIndex: -1,
        "data-search-item": $.hit.item.id,
        "data-search-row": ve,
        "data-search-create": $.hit.item.tone === "create" ? "" : void 0,
        onMouseDown: (jn) => jn.preventDefault(),
        onMouseEnter: () => et(ve, "pointer"),
        onClick: () => rr($),
        style: { ...Rt, ...$.hit.item.rowStyle, ...Wn },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${He.itemDefault} ${$.hit.item.rowClassName ?? ""} ${Ge ? "ui-item-selected" : ""} ${Oe ? "ui-item-highlighted" : ""} ${Wt ? "opacity-30 pointer-events-none" : ""}`,
        children: [
          qt && $.hit.item.checkable !== !1 && /* @__PURE__ */ A(Fa, { checked: nt, disabled: Wt, indicator: N == null ? void 0 : N.indicator }),
          X ? /* @__PURE__ */ A("span", { className: "flex min-w-0 flex-1 items-center gap-2", children: X($.hit.item, { checked: nt, disabled: Wt }) }) : /* @__PURE__ */ fe(Dn, { children: [
            $.hit.item.icon && /* @__PURE__ */ A("span", { className: `${He.icon} shrink-0`, children: $.hit.item.icon }),
            /* @__PURE__ */ A("span", { className: "flex-1 truncate", children: $.hit.item.label }),
            ($.hit.detail || $.hit.item.detail) && /* @__PURE__ */ A("span", { className: "shrink-0 max-w-[55%] truncate text-[10px] text-zinc-400", children: $.hit.detail || $.hit.item.detail }),
            Ge && /* @__PURE__ */ A(zs, { className: "ui-icon w-3.5 h-3.5 shrink-0", "aria-hidden": !0 })
          ] })
        ]
      },
      `item:${$.hit.item.id}`
    );
  }, vn = ($, ve) => {
    var fo;
    const Oe = Je.has($.group.key), Ge = g && !Re.trim(), nt = Et, Wt = nt && Se === ve, Wn = qt ? t.filter((en) => en.group === $.group.key && Gn.has(en.id) && en.checkable !== !1) : [], jn = Wn.filter((en) => !Xt.isDisabled(en.id)).map((en) => en.id), hr = qt ? (fo = N == null ? void 0 : N.groupToken) == null ? void 0 : fo.call(N, $.group.key) : void 0, yi = !!hr && Xt.isSelected(hr), wt = yi ? "all" : jn.length > 0 ? Xt.groupState(jn) : "none", Li = yi ? Wn.length : Wn.reduce((en, Fi) => en + (Xt.isSelected(Fi.id) ? 1 : 0), 0), $i = qt && /* @__PURE__ */ A(
      "button",
      {
        type: "button",
        tabIndex: -1,
        "aria-label": `Select all ${$.group.label}`,
        onMouseDown: (en) => en.preventDefault(),
        onClick: (en) => {
          en.stopPropagation(), hr ? Xt.toggle(hr) : jn.length && Xt.toggleGroup(jn);
        },
        className: `shrink-0 flex items-center justify-center rounded ${hr || jn.length ? "cursor-pointer" : "cursor-not-allowed"}`,
        children: /* @__PURE__ */ A(
          Fa,
          {
            checked: wt === "all",
            indeterminate: wt === "some",
            disabled: !hr && jn.length === 0,
            indicator: N == null ? void 0 : N.indicator
          }
        )
      }
    ), or = qt ? /* @__PURE__ */ fe("span", { className: `shrink-0 tabular-nums text-[10px] ${nt ? "text-[color:var(--ui-text-faint)]" : "opacity-70"}`, children: [
      Li,
      "/",
      Wn.length
    ] }) : $.group.count !== void 0 && /* @__PURE__ */ A("span", { className: `shrink-0 tabular-nums ${nt ? "text-[10px] text-[color:var(--ui-text-faint)]" : "opacity-70"}`, children: $.group.count });
    return nt ? /* @__PURE__ */ fe(
      "div",
      {
        role: "option",
        "aria-selected": !1,
        "aria-expanded": Ge ? Oe : void 0,
        "data-search-group": $.group.key,
        onMouseDown: (en) => en.preventDefault(),
        onMouseEnter: () => et(ve, "pointer"),
        onClick: () => {
          Ge && dn($.group.key);
        },
        style: Rt,
        className: `w-full rounded flex items-center gap-1 outline-none select-none font-medium ${He.itemDefault} ${Wt ? "ui-item-highlighted" : ""}`,
        children: [
          $i,
          /* @__PURE__ */ fe(
            "button",
            {
              type: "button",
              tabIndex: -1,
              onMouseDown: (en) => en.preventDefault(),
              onClick: (en) => {
                en.stopPropagation(), rr($);
              },
              className: "flex w-auto min-w-0 max-w-full cursor-pointer items-center gap-2 text-left",
              children: [
                $.group.icon && /* @__PURE__ */ A("span", { className: `${He.icon} shrink-0`, children: $.group.icon }),
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
              "aria-label": `${Oe ? "Collapse" : "Expand"} ${$.group.label}`,
              "aria-expanded": Oe,
              onMouseDown: (en) => en.preventDefault(),
              onClick: (en) => {
                en.stopPropagation(), dn($.group.key);
              },
              style: { width: it.box, height: it.box },
              className: "shrink-0 flex cursor-pointer items-center justify-center rounded text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text)]",
              children: /* @__PURE__ */ A(
                ci,
                {
                  size: it.icon,
                  className: `transition-transform duration-200 ${Oe ? "rotate-180" : ""}`
                }
              )
            }
          )
        ]
      },
      `group:${$.group.key}`
    ) : /* @__PURE__ */ fe(
      "div",
      {
        role: "presentation",
        "data-search-group": $.group.key,
        "data-search-row": ve,
        style: Pt,
        className: "w-full flex items-center gap-2 select-none font-semibold uppercase tracking-wider ui-label",
        children: [
          $i,
          $.group.icon && /* @__PURE__ */ A("span", { className: `${He.icon} shrink-0`, children: $.group.icon }),
          /* @__PURE__ */ A("span", { className: "flex-1 truncate", children: $.group.label }),
          or
        ]
      },
      `group:${$.group.key}`
    );
  }, Jt = ($, ve) => {
    var nt;
    const Oe = Se === ve, Ge = $.source === "leading" ? L : $.source === "footer" ? re : O;
    return /* @__PURE__ */ fe(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": !1,
        tabIndex: -1,
        "data-search-action": $.source || "empty",
        "data-search-row": ve,
        onMouseDown: (Wt) => Wt.preventDefault(),
        onMouseEnter: () => et(ve, "pointer"),
        onClick: () => rr($),
        style: Rt,
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${He.itemDefault} ${Oe ? "ui-item-highlighted" : ""}`,
        children: [
          /* @__PURE__ */ A("span", { className: `${He.icon} shrink-0`, children: ((nt = Ge == null ? void 0 : Ge[$.actionIndex]) == null ? void 0 : nt.icon) || /* @__PURE__ */ A(ol, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ A("span", { className: "flex-1 truncate", children: $.label })
        ]
      },
      `${$.source || "empty"}:${$.actionIndex}`
    );
  }, Zt = () => /* @__PURE__ */ A("div", { className: "px-3 py-3 text-center", "data-search-empty": !0, children: M ? M({ query: Re, close: bn }) : /* @__PURE__ */ fe(Dn, { children: [
    /* @__PURE__ */ A("div", { className: "mx-auto mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-400", children: /* @__PURE__ */ A(Io, { className: "w-3.5 h-3.5" }) }),
    /* @__PURE__ */ A("div", { className: "text-xs font-medium text-zinc-500", children: I || `No matches for “${Re.trim()}”` }),
    /* @__PURE__ */ A("div", { className: "mt-0.5 text-[10px] text-zinc-400", children: _ || "Try a name, phone number, board ID or category." })
  ] }) }, "__empty"), In = [];
  for (let $ = 0; $ < Te.length; $++) {
    const ve = Te[$];
    if (ve.kind === "group") {
      const Oe = [];
      let Ge = $ + 1;
      for (; Ge < Te.length && Te[Ge].kind === "item" && Te[Ge].hit.item.group === ve.group.key; )
        Oe.push({ row: Te[Ge], index: Ge }), Ge++;
      In.push({ group: ve, index: $, items: Oe }), $ = Ge - 1;
    } else ve.kind === "item" ? In.push({ row: ve, index: $ }) : In.push({ row: ve, index: $ });
  }
  const Yr = ne || tn ? sl(
    /* @__PURE__ */ fe(
      "div",
      {
        ref: Z,
        id: "search-menu-panel",
        "data-theme": S,
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
          kt.current && et(-1, "pointer");
        },
        className: "click-outside-ignore ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none min-w-0 overflow-hidden pointer-events-auto",
        style: {
          position: "fixed",
          left: we.left,
          top: we.top,
          width: D ?? (n === "expandable" ? T : Ue || void 0),
          minWidth: P,
          maxHeight: we.maxH,
          visibility: we.ready ? "visible" : "hidden"
        },
        children: [
          ht && /* @__PURE__ */ fe("div", { className: "shrink-0 pb-1", children: [
            Ze.map(($, ve) => Jt($, ve)),
            Te.length > 0 && /* @__PURE__ */ A("div", { className: He.separator })
          ] }),
          /* @__PURE__ */ fe("div", { "data-search-scroller": !0, className: "overflow-y-auto scrollbar-custom flex flex-col min-h-0", children: [
            Te.length === 0 && /* @__PURE__ */ A("div", { className: "px-3 py-3 text-xs text-zinc-400", "data-search-empty": !0, children: M ? M({ query: Re, close: bn }) : /* @__PURE__ */ A(Dn, { children: "Type to search…" }) }),
            In.map(($) => {
              if ($.group) {
                const Ge = Je.has($.group.group.key), nt = $.items || [];
                return /* @__PURE__ */ fe(_t.Fragment, { children: [
                  vn($.group, Tt + $.index),
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
                      children: /* @__PURE__ */ A("div", { className: "overflow-hidden flex flex-col", children: nt.map((Wt) => Dt(Wt.row, Tt + Wt.index)) })
                    }
                  ),
                  !xr && nt.map((Wt) => Dt(Wt.row, Tt + Wt.index))
                ] }, `group:${$.group.group.key}`);
              }
              const ve = $.row, Oe = Tt + $.index;
              return ve.kind === "empty" ? Zt() : ve.kind === "action" ? Jt(ve, Oe) : ve.kind === "item" ? Dt(ve, Oe) : null;
            })
          ] }),
          vt.length > 0 && /* @__PURE__ */ fe("div", { className: "shrink-0", children: [
            /* @__PURE__ */ A("div", { className: He.separator }),
            vt.map(($, ve) => Jt($, Tt + Te.length + ve))
          ] }),
          qt && (N == null ? void 0 : N.footer) !== !1 && /* @__PURE__ */ A(
            cb,
            {
              count: Xt.count,
              max: N == null ? void 0 : N.max,
              hiddenCount: (N == null ? void 0 : N.hiddenNote) === !1 ? 0 : Xt.hiddenCount,
              clear: (N == null ? void 0 : N.clear) !== !1,
              theme: S,
              onClear: Xt.clear,
              hero: (N == null ? void 0 : N.mode) === "live" ? void 0 : {
                label: dr,
                onClick: () => {
                  Xt.commit(), bn();
                },
                disabled: Xt.count === 0
              }
            }
          )
        ]
      }
    ),
    q ?? ye ?? (ue == null ? void 0 : ue.body) ?? document.body
  ) : null;
  return j ? /* @__PURE__ */ fe(Dn, { children: [
    /* @__PURE__ */ A("div", { ref: Ct, "data-search-menu": !0, "data-mode": "hidden", className: "hidden", "aria-hidden": !0 }),
    Yr
  ] }) : n === "inline" ? /* @__PURE__ */ fe("div", { ref: Ct, "data-search-menu": !0, "data-mode": n, className: "relative inline-flex", style: { width: "100%" }, children: [
    kr,
    Yr
  ] }) : /* @__PURE__ */ A(
    ih,
    {
      expanded: Ae,
      collapsedWidth: v,
      expandedWidth: T,
      rootRef: Ct,
      "data-search-menu": !0,
      "data-mode": n,
      trigger: Q ? Q({ open: ne, expanded: Ae, toggle: Sn }) : /* @__PURE__ */ A(
        cr,
        {
          ref: ft,
          type: "button",
          variant: o,
          size: "minimal",
          theme: S === "dark" ? "dark" : "light",
          icon: i === void 0 ? /* @__PURE__ */ A(Io, { className: "w-3.5 h-3.5" }) : i,
          onClick: Sn,
          className: `w-full justify-start ${Ae ? "pointer-events-none" : ""} ${s ?? ""}`,
          tabIndex: Ae ? -1 : 0,
          "data-search-trigger": !0,
          children: /* @__PURE__ */ A("span", { className: "min-w-0 truncate", children: r })
        }
      ),
      field: /* @__PURE__ */ fe(Dn, { children: [
        mi,
        Yr
      ] })
    }
  );
}
function Zi(t, e = "id") {
  return e === "label" ? t.label : t.id;
}
function Dv(t, e, n = "id") {
  const r = e.find((i) => Zi(i, n) === t);
  return (r == null ? void 0 : r.label) || t;
}
function K2(t) {
  return t.split(",").map((e) => e.trim()).filter(Boolean);
}
function U2(t) {
  const e = t.split(",");
  return (e[e.length - 1] || "").trim();
}
function oh(t, e, n = "id") {
  const r = t.trim();
  if (!r) return "";
  const i = e.find((a) => Zi(a, n) === r);
  if (i) return Zi(i, n);
  const o = r.toLowerCase(), s = e.find((a) => a.label.toLowerCase() === o);
  return s ? Zi(s, n) : r;
}
function G2(t, e, n = "id") {
  const r = /* @__PURE__ */ new Set(), i = [];
  for (const o of K2(t)) {
    const s = oh(o, e, n);
    !s || r.has(s) || (r.add(s), i.push(s));
  }
  return i;
}
function Y2(t, e, n = "id") {
  const r = t.split(",").map((a) => a.trim()).filter(Boolean), i = t.trimEnd().endsWith(",") ? r : r.slice(0, -1), o = /* @__PURE__ */ new Set(), s = [];
  for (const a of i) {
    const l = oh(a, e, n);
    !l || o.has(l) || (o.add(l), s.push(l));
  }
  return s;
}
function X2(t, e, n = "id") {
  const r = t.trim();
  if (!r) return !0;
  const i = r.toLowerCase();
  return e.some((o) => Zi(o, n).toLowerCase() === i || o.label.toLowerCase() === i);
}
function V2(t, e, n = "id") {
  const r = new Set(e.map((i) => Zi(i, n)));
  return t.filter((i) => !r.has(i));
}
function $p(t, e, n, r, i) {
  return i ? i([...t], [...e]) : r === "count" ? t.length ? `${t.length} selected` : "" : r === "chips" ? "" : t.map((o) => Dv(o, e, n)).join(", ");
}
const J2 = () => {
};
function Z2({
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
  autoFocus: E = !1,
  defaultOpen: v = !1,
  selectAllOnOpen: T = !0,
  uppercase: D = !1,
  allowFreeText: P = !0,
  theme: k,
  className: z = "",
  style: S,
  panelWidth: x,
  panelMinWidth: I,
  initialQuery: _,
  keepAllRows: M = !1,
  maxMenuHeight: O,
  portalTarget: L,
  autoGrow: W = !1,
  skipComma: re = !1,
  collapsedWidth: F = 140,
  expandedWidth: N = 280,
  createLabel: te,
  onCreateItem: G,
  onExit: j,
  onEscape: ee,
  onTabExit: q,
  loadItems: Q,
  emptyTitle: X,
  emptyHint: J,
  sortItems: K,
  max: se,
  disabledIds: le,
  indicator: Ce,
  browse: Re,
  groupToken: Be
}) {
  const rt = vr(), mt = k ?? (rt == null ? void 0 : rt.mode) ?? "light", ut = mn(), ne = Ne((Me) => Zi(Me, i), [i]), _e = gn(() => n.map(ne), [n, ne]), Ae = gn(() => new Map(n.map((Me) => [ne(Me), Me])), [n, ne]), Ke = Ne((Me) => Dv(Me, n, i), [n, i]), Fe = gn(() => new Set([...p ?? []].map((Me) => Me.toLowerCase())), [p]), [ze, Je] = Xe(!1), [gt, Se] = Xe(""), [Ve, kt] = Xe(() => {
    const Me = _ ?? "";
    return D ? Me.toUpperCase() : Me;
  }), [yt, et] = Xe(Ve), [Ct, dt] = Xe(() => [...t]), [ft, Ot] = Xe(null), [pe, ke] = Xe(!1), ue = Y(null), ye = Y(null), He = Y(null), Rt = Y(null), Pt = Y(null), it = Y(t.join("\0")), sn = Y(!1), he = Y(/* @__PURE__ */ new Set()), we = Y(!1), qe = Y(!1), Ue = Y(!1), zt = Y(0), tn = Y(""), bt = Y([...t]), Z = t.join("\0"), xe = gn(
    () => $p(t, n, i, a, l),
    [t, n, i, a, l]
  ), Te = Ne((Me) => {
    if (c) return c([...Me], n);
    if (o === "single") return Me[0] ? Ke(Me[0]) : "";
    const tt = Me.map(Ke).join(", ");
    return re ? tt : Me.length ? `${tt}, ` : "";
  }, [c, n, o, Ke, re]);
  Ye(() => {
    ze || (dt([...t]), bt.current = [...t], it.current = Z);
  }, [Z, ze]);
  const Ze = Ne(() => {
    if (ze || m || C) return;
    sn.current = !1, we.current = !0;
    const Me = Te(t);
    tn.current = Me, bt.current = [...t], dt([...t]), Se(Me), et(Ve), kt(""), Je(!0);
  }, [ze, m, C, t, Te, Ve]);
  Nn(() => {
    if (!ze) return;
    const Me = ue.current ?? ye.current;
    Me && (Me.focus(), (Me instanceof HTMLInputElement || Me instanceof HTMLTextAreaElement) && (o === "single" && T ? Me.setSelectionRange(0, Me.value.length) : Me.setSelectionRange(Me.value.length, Me.value.length)));
  }, [ze]), Nn(() => {
    if (!Ue.current) return;
    Ue.current = !1;
    const Me = ue.current;
    Me && (Me.focus(), Me.setSelectionRange(Me.value.length, Me.value.length));
  }, [gt]), Ye(() => {
    (v || E) && Ze();
  }, []);
  const vt = o === "single" ? yt : U2(gt), Bt = Q ? ft ?? [] : n, ht = gn(
    () => K ? K(Bt, Ct) : Bt,
    [Bt, K, Ct]
  ), Tt = vt.trim(), Mt = !!G && P && !pe && !!Tt && !X2(Tt, Bt, i);
  Ye(() => {
    if (!Q || !ze) return;
    const Me = vt.trim();
    if (!Me) {
      Ot(null), ke(!1);
      return;
    }
    ke(!0);
    const tt = ++zt.current, Dt = setTimeout(() => {
      Q(Me).then((vn) => {
        zt.current === tt && (Ot(vn), ke(!1));
      }).catch(() => {
        zt.current === tt && (Ot([]), ke(!1));
      });
    }, 400);
    return () => clearTimeout(Dt);
  }, [Q, ze, vt]);
  const Et = gn(() => {
    const Me = ht.filter((tt) => !tt.hidden).map((tt) => ({
      id: ne(tt),
      label: tt.label,
      group: tt.group,
      detail: tt.detail,
      icon: tt.icon,
      disabled: !!tt.disabled || !!(le != null && le.includes(ne(tt))),
      fields: tt.fields,
      keywords: tt.keywords,
      rowClassName: tt.rowClassName,
      rowStyle: tt.rowStyle
    }));
    return Mt && Me.unshift({
      id: Tt,
      label: te ? te(Tt) : `Add “${Tt}”…`,
      keywords: Tt,
      checkable: !1,
      tone: "create",
      pinned: !0
    }), Me;
  }, [ht, ne, le, Mt, Tt, te]), nn = Ne((Me) => {
    const tt = Me.join("\0");
    if (tt !== it.current) {
      if (Gi(Me, t)) {
        it.current = tt;
        return;
      }
      if (it.current = tt, e(Me), G)
        for (const Dt of V2(Me, n, i))
          he.current.has(Dt) || (he.current.add(Dt), G(Dt));
    }
  }, [t, e, G, n, i]), xr = Ne((Me, tt) => {
    !tt || !G || !P || n.some((Dt) => ne(Dt) === Me) || he.current.has(Me) || (he.current.add(Me), G(Me));
  }, [G, P, n, ne]), qt = Ne((Me = !0) => {
    if (!we.current || (we.current = !1, m || C)) return;
    if (sn.current) {
      sn.current = !1;
      return;
    }
    const tt = tn.current, Dt = new Set(_e), vn = o === "single" ? (() => {
      const Jt = tt.trim();
      if (!Jt) return P ? [] : t;
      const Zt = oh(Jt, n, i);
      return !P && !Dt.has(Zt) ? t : [Zt];
    })() : Mr(
      G2(tt, n, i).filter((Jt) => P || Dt.has(Jt)),
      _e
    );
    bt.current = vn, dt(vn), et(""), Je(!1), nn(vn), Me && !qe.current && (j == null || j());
  }, [m, C, o, n, i, _e, P, t, nn, j]), yn = Ne((Me) => {
    Je(Me), Me || qt();
  }, [qt]), On = Ne(() => {
    sn.current = !0, we.current = !1;
    const Me = Te(t);
    tn.current = Me, bt.current = [...t], dt([...t]), Se(Me), et(""), Je(!1), ee == null || ee();
  }, [t, Te, ee]);
  Ye(() => {
    var vn;
    if (!ze) return;
    const tt = (((vn = He.current) == null ? void 0 : vn.ownerDocument) ?? document).defaultView;
    if (!tt) return;
    const Dt = (Jt) => {
      Jt.key === "Escape" && (Jt.preventDefault(), Jt.stopImmediatePropagation(), On());
    };
    return tt.addEventListener("keydown", Dt, !0), () => tt.removeEventListener("keydown", Dt, !0);
  }, [ze, On]);
  const Gn = Ne((Me) => {
    const tt = Mr(Me, _e), Dt = Te(tt);
    bt.current = tt, tn.current = Dt, dt(tt), Ue.current = !0, Se(Dt);
  }, [_e, Te]), Xt = Ne((Me) => {
    const tt = Me.id;
    we.current = !1;
    const Dt = Ke(tt);
    bt.current = [tt], tn.current = Dt, dt([tt]), Se(Dt), et(""), Je(!1), nn([tt]), qe.current || j == null || j();
  }, [Ke, nn, j]), zn = (Me) => {
    var tt, Dt, vn, Jt, Zt;
    if (Me.key === "Escape") {
      Me.preventDefault(), On();
      return;
    }
    if (Me.key === "Tab") {
      if (Me.preventDefault(), o === "single" && ze) {
        qe.current = !0;
        const In = (tt = Pt.current) == null ? void 0 : tt.activateHighlighted();
        if (qe.current = !1, In) {
          (Dt = q ?? j) == null || Dt(ue.current ?? void 0);
          return;
        }
      }
      ze && qt(!1), (vn = q ?? j) == null || vn(ue.current ?? void 0);
      return;
    }
    if (Me.key === "ArrowDown" || Me.key === "ArrowUp") {
      if (Me.preventDefault(), !ze) {
        Ze();
        return;
      }
      (Jt = Pt.current) == null || Jt.moveHighlight(Me.key === "ArrowDown" ? 1 : -1);
      return;
    }
    if (Me.key === "Enter") {
      if (Me.preventDefault(), Me.stopPropagation(), ze && ((Zt = Pt.current) != null && Zt.activateHighlighted())) return;
      qt();
      return;
    }
  }, dr = (Me) => {
    var Dt;
    const tt = D ? Me.target.value.toUpperCase() : Me.target.value;
    if (tn.current = tt, Se(tt), o === "single" && et(tt), ze || (we.current = !0, sn.current = !1, Je(!0)), o === "multiple") {
      const vn = Mr(Y2(tt, n, i), _e);
      bt.current = vn, dt(vn), (Dt = Pt.current) == null || Dt.setSelection(vn);
    }
  }, bn = () => {
    if (we.current) {
      if (sn.current) {
        sn.current = !1;
        return;
      }
      qt();
    }
  }, fr = Ne((Me, tt) => {
    const Dt = Ae.get(Me.id);
    if (!Dt)
      return /* @__PURE__ */ fe(Dn, { children: [
        /* @__PURE__ */ A(ol, { className: "h-3.5 w-3.5 shrink-0" }),
        /* @__PURE__ */ A("span", { className: "flex-1 truncate", children: Me.label })
      ] });
    const vn = !!p && (i === "label" ? Fe.has(Dt.label.toLowerCase()) : p.has(ne(Dt))), Jt = (f == null ? void 0 : f(Dt)) ?? Dt.badge ?? null;
    return /* @__PURE__ */ fe(Dn, { children: [
      d ? d(Dt, tt.checked) : /* @__PURE__ */ fe(Dn, { children: [
        Dt.icon && /* @__PURE__ */ A("span", { className: "shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5", children: Dt.icon }),
        /* @__PURE__ */ A("span", { className: "flex-1 truncate", children: Dt.label }),
        Jt && /* @__PURE__ */ A("span", { className: "shrink-0 text-[10px] text-[color:var(--ui-text-faint)]", children: Jt }),
        h == null ? void 0 : h(Dt)
      ] }),
      vn && /* @__PURE__ */ A("span", { className: "shrink-0 inline-flex", title: g, "aria-label": g, children: /* @__PURE__ */ A(Uw, { className: "h-3.5 w-3.5 text-amber-500" }) })
    ] });
  }, [Ae, p, Fe, i, ne, f, d, h, g]), Yn = /* @__PURE__ */ A(
    j2,
    {
      ref: Pt,
      mode: "inline",
      hideTrigger: !0,
      open: ze,
      onOpenChange: yn,
      anchorRef: s === "morph" ? Rt : He,
      items: Et,
      groups: r,
      query: vt,
      onSelect: Xt,
      closeOnSelect: o === "single",
      selectedId: o === "single" ? Ct[0] : void 0,
      multiple: o === "multiple" ? {
        selectedIds: Ct,
        mode: "live",
        onDraftChange: Gn,
        onToggle: xr,
        onCommit: J2,
        max: se,
        disabledIds: le,
        indicator: Ce,
        groupToken: Be
      } : void 0,
      openOnFocus: !1,
      autoFocus: !1,
      highlightOnOpen: o === "single",
      browseAll: r.length === 0,
      browseExpanded: r.length > 0 && (Re ?? "open") === "open",
      expandableGroups: r.length > 0 && Re === "accordion",
      groupExpandMode: "single",
      renderItem: fr,
      emptyTitle: pe ? "Searching…" : X,
      emptyHint: pe ? "Fetching matching records." : J,
      theme: mt,
      panelWidth: x,
      panelMinWidth: I,
      keepAllRows: M,
      maxMenuHeight: O,
      portalTarget: L
    }
  ), dn = s === "chip", Sn = s === "wrap", rr = !dn && !Sn && W, Pr = !ze && !xe, gi = ze ? gt : xe, Ur = {
    ref: ue,
    /* Chip: the INPUT holds the committed keys (cast reads "1") while the
       overlay renders the resolved face ("1. GEORGE") — the old
       EntityDropdown's transparent-input contract. */
    value: ze ? gt : dn ? t.join(", ") : xe,
    disabled: C,
    readOnly: b,
    placeholder: "",
    onFocus: Ze,
    onClick: Ze,
    onChange: dr,
    onBlur: bn,
    onKeyDown: zn,
    autoComplete: "off",
    spellCheck: !1
  }, Qn = Ie(5, 7, ut), kr = Ie(9, 12, ut), mi = Ie(12, 14, ut);
  if (s === "button") {
    const Me = (Jt) => zn(Jt), tt = ze ? Ct : t, Dt = $p(tt, n, i, a, l), vn = !Dt;
    return /* @__PURE__ */ fe(
      "div",
      {
        ref: He,
        "data-picker-field": !0,
        className: `relative ${z}`,
        style: S,
        onMouseDown: (Jt) => Jt.stopPropagation(),
        onContextMenu: (Jt) => {
          Jt.preventDefault(), Jt.stopPropagation();
        },
        children: [
          u ? /* @__PURE__ */ A("span", { className: "pointer-events-none flex w-full min-w-0 items-center", children: u({ values: [...tt], items: n, display: Dt, open: ze, toggle: Ze }) }) : /* @__PURE__ */ fe(
            cr,
            {
              ref: ye,
              variant: "outline",
              theme: mt === "dark" ? "dark" : "light",
              disabled: C,
              onClick: m ? void 0 : () => ze ? qt() : Ze(),
              onKeyDown: Me,
              "data-state": ze ? "open" : "closed",
              "aria-haspopup": "listbox",
              "aria-expanded": ze,
              className: "w-full justify-between gap-2",
              children: [
                a === "chips" && tt.length > 0 ? /* @__PURE__ */ A("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1 overflow-hidden", children: tt.map((Jt) => /* @__PURE__ */ A(
                  "span",
                  {
                    className: "inline-flex items-center rounded border border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-1.5 py-0.5 text-[10px] text-[color:var(--ui-text)]",
                    children: Ke(Jt)
                  },
                  Jt
                )) }) : /* @__PURE__ */ A("span", { className: `min-w-0 flex-1 truncate text-left ${vn ? "italic text-[color:var(--ui-text-faint)]" : ""}`, children: Dt || y }),
                /* @__PURE__ */ A(ci, { className: "h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" })
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
      ih,
      {
        expanded: ze,
        collapsedWidth: F,
        expandedWidth: N,
        rootRef: He,
        "data-picker-field": !0,
        className: z,
        style: S,
        trigger: u ? u({ values: [...t], items: n, display: xe, open: ze, toggle: Ze }) : (
          /* The collapsed face IS the chip: one trigger recipe for both
             faces, so a morph picker matches every other value field. */
          /* @__PURE__ */ fe(
            "button",
            {
              type: "button",
              disabled: C,
              onClick: Ze,
              className: "ui-press flex w-full cursor-pointer select-none items-center justify-between gap-2 rounded-[var(--ui-radius-btn)] border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left outline-none transition-colors hover:border-[color:var(--ui-input-focus-border)] disabled:cursor-default disabled:opacity-50",
              style: { padding: `${Qn}px ${kr}px`, fontSize: mi },
              children: [
                /* @__PURE__ */ A("span", { className: `min-w-0 flex-1 truncate ${Pr ? "italic text-[color:var(--ui-text-muted)]" : ""}`, children: xe || y }),
                /* @__PURE__ */ A(ci, { className: "pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" })
              ]
            }
          )
        ),
        field: /* @__PURE__ */ fe("div", { ref: Rt, className: "relative h-full", children: [
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
  const Gr = dn ? Ie(5, 7, ut) : 0, ir = dn ? Ie(9, 12, ut) : 0;
  return m ? /* @__PURE__ */ A(
    "div",
    {
      ref: He,
      "data-picker-field": !0,
      className: `relative ${dn ? "flex w-full items-center gap-1.5 rounded border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left" : Sn ? "min-h-[1lh] w-full pb-[1lh]" : "h-[1lh] w-full"} ${z}`,
      style: dn ? { padding: `${Gr}px ${ir}px`, fontSize: Ie(12, 14, ut), ...S } : S,
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
  ) : /* @__PURE__ */ fe(
    "div",
    {
      ref: He,
      "data-picker-field": !0,
      className: `relative ${dn ? "ui-press flex w-full items-center gap-1.5 rounded-[var(--ui-radius-btn)] border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left outline-none focus-within:border-[color:var(--ui-input-focus-border)]" : Sn ? "min-h-[1lh] w-full pb-[1lh]" : rr ? "w-max max-w-[400px] min-w-[72px]" : "h-[1lh] w-full"} ${z}`,
      style: dn ? { padding: `${Gr}px ${ir}px`, fontSize: mi, ...S } : S,
      onMouseDown: (Me) => Me.stopPropagation(),
      onContextMenu: (Me) => {
        Me.preventDefault(), Me.stopPropagation();
      },
      onAuxClick: Ze,
      children: [
        dn && u ? /* @__PURE__ */ A("span", { className: "pointer-events-none flex min-w-0 flex-1 items-center", children: u({ values: [...t], items: n, display: xe, open: ze, toggle: Ze }) }) : a === "chips" && !ze ? /* @__PURE__ */ fe("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1", children: [
          t.map((Me) => /* @__PURE__ */ A(
            "span",
            {
              className: "inline-flex items-center rounded border border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-1.5 py-0.5 text-[10px] text-[color:var(--ui-text)]",
              children: Ke(Me)
            },
            Me
          )),
          t.length === 0 && /* @__PURE__ */ A("span", { className: "italic text-[color:var(--ui-text-muted)]", children: y })
        ] }) : /* @__PURE__ */ A(
          "span",
          {
            className: `pointer-events-none text-left ${dn ? "min-w-0 flex-1 truncate" : Sn ? "block whitespace-pre-wrap break-words leading-relaxed" : "absolute inset-y-0 inset-x-0 flex items-center truncate whitespace-nowrap"} ${Pr ? "italic text-[color:var(--ui-text-muted)]" : ""}`,
            children: gi || y
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
        dn && /* @__PURE__ */ A(ci, { className: "pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" }),
        Yn
      ]
    }
  );
}
var ba = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ni(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var nc, Fp;
function Q2() {
  if (Fp) return nc;
  Fp = 1;
  var t = Object.prototype, e = t.hasOwnProperty;
  function n(r, i) {
    return r != null && e.call(r, i);
  }
  return nc = n, nc;
}
var rc, Hp;
function ri() {
  if (Hp) return rc;
  Hp = 1;
  var t = Array.isArray;
  return rc = t, rc;
}
var ic, Bp;
function Nv() {
  if (Bp) return ic;
  Bp = 1;
  var t = typeof ba == "object" && ba && ba.Object === Object && ba;
  return ic = t, ic;
}
var oc, qp;
function ii() {
  if (qp) return oc;
  qp = 1;
  var t = Nv(), e = typeof self == "object" && self && self.Object === Object && self, n = t || e || Function("return this")();
  return oc = n, oc;
}
var sc, Wp;
function Bs() {
  if (Wp) return sc;
  Wp = 1;
  var t = ii(), e = t.Symbol;
  return sc = e, sc;
}
var ac, jp;
function eR() {
  if (jp) return ac;
  jp = 1;
  var t = Bs(), e = Object.prototype, n = e.hasOwnProperty, r = e.toString, i = t ? t.toStringTag : void 0;
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
var lc, Kp;
function tR() {
  if (Kp) return lc;
  Kp = 1;
  var t = Object.prototype, e = t.toString;
  function n(r) {
    return e.call(r);
  }
  return lc = n, lc;
}
var cc, Up;
function qs() {
  if (Up) return cc;
  Up = 1;
  var t = Bs(), e = eR(), n = tR(), r = "[object Null]", i = "[object Undefined]", o = t ? t.toStringTag : void 0;
  function s(a) {
    return a == null ? a === void 0 ? i : r : o && o in Object(a) ? e(a) : n(a);
  }
  return cc = s, cc;
}
var uc, Gp;
function Ws() {
  if (Gp) return uc;
  Gp = 1;
  function t(e) {
    return e != null && typeof e == "object";
  }
  return uc = t, uc;
}
var dc, Yp;
function yl() {
  if (Yp) return dc;
  Yp = 1;
  var t = qs(), e = Ws(), n = "[object Symbol]";
  function r(i) {
    return typeof i == "symbol" || e(i) && t(i) == n;
  }
  return dc = r, dc;
}
var fc, Xp;
function sh() {
  if (Xp) return fc;
  Xp = 1;
  var t = ri(), e = yl(), n = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, r = /^\w*$/;
  function i(o, s) {
    if (t(o))
      return !1;
    var a = typeof o;
    return a == "number" || a == "symbol" || a == "boolean" || o == null || e(o) ? !0 : r.test(o) || !n.test(o) || s != null && o in Object(s);
  }
  return fc = i, fc;
}
var hc, Vp;
function ao() {
  if (Vp) return hc;
  Vp = 1;
  function t(e) {
    var n = typeof e;
    return e != null && (n == "object" || n == "function");
  }
  return hc = t, hc;
}
var pc, Jp;
function Ov() {
  if (Jp) return pc;
  Jp = 1;
  var t = qs(), e = ao(), n = "[object AsyncFunction]", r = "[object Function]", i = "[object GeneratorFunction]", o = "[object Proxy]";
  function s(a) {
    if (!e(a))
      return !1;
    var l = t(a);
    return l == r || l == i || l == n || l == o;
  }
  return pc = s, pc;
}
var gc, Zp;
function nR() {
  if (Zp) return gc;
  Zp = 1;
  var t = ii(), e = t["__core-js_shared__"];
  return gc = e, gc;
}
var mc, Qp;
function rR() {
  if (Qp) return mc;
  Qp = 1;
  var t = nR(), e = (function() {
    var r = /[^.]+$/.exec(t && t.keys && t.keys.IE_PROTO || "");
    return r ? "Symbol(src)_1." + r : "";
  })();
  function n(r) {
    return !!e && e in r;
  }
  return mc = n, mc;
}
var yc, eg;
function zv() {
  if (eg) return yc;
  eg = 1;
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
var bc, tg;
function iR() {
  if (tg) return bc;
  tg = 1;
  var t = Ov(), e = rR(), n = ao(), r = zv(), i = /[\\^$.*+?()[\]{}|]/g, o = /^\[object .+?Constructor\]$/, s = Function.prototype, a = Object.prototype, l = s.toString, c = a.hasOwnProperty, u = RegExp(
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
var vc, ng;
function oR() {
  if (ng) return vc;
  ng = 1;
  function t(e, n) {
    return e == null ? void 0 : e[n];
  }
  return vc = t, vc;
}
var wc, rg;
function lo() {
  if (rg) return wc;
  rg = 1;
  var t = iR(), e = oR();
  function n(r, i) {
    var o = e(r, i);
    return t(o) ? o : void 0;
  }
  return wc = n, wc;
}
var xc, ig;
function bl() {
  if (ig) return xc;
  ig = 1;
  var t = lo(), e = t(Object, "create");
  return xc = e, xc;
}
var kc, og;
function sR() {
  if (og) return kc;
  og = 1;
  var t = bl();
  function e() {
    this.__data__ = t ? t(null) : {}, this.size = 0;
  }
  return kc = e, kc;
}
var Sc, sg;
function aR() {
  if (sg) return Sc;
  sg = 1;
  function t(e) {
    var n = this.has(e) && delete this.__data__[e];
    return this.size -= n ? 1 : 0, n;
  }
  return Sc = t, Sc;
}
var Cc, ag;
function lR() {
  if (ag) return Cc;
  ag = 1;
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
var Rc, lg;
function cR() {
  if (lg) return Rc;
  lg = 1;
  var t = bl(), e = Object.prototype, n = e.hasOwnProperty;
  function r(i) {
    var o = this.__data__;
    return t ? o[i] !== void 0 : n.call(o, i);
  }
  return Rc = r, Rc;
}
var Tc, cg;
function uR() {
  if (cg) return Tc;
  cg = 1;
  var t = bl(), e = "__lodash_hash_undefined__";
  function n(r, i) {
    var o = this.__data__;
    return this.size += this.has(r) ? 0 : 1, o[r] = t && i === void 0 ? e : i, this;
  }
  return Tc = n, Tc;
}
var Ec, ug;
function dR() {
  if (ug) return Ec;
  ug = 1;
  var t = sR(), e = aR(), n = lR(), r = cR(), i = uR();
  function o(s) {
    var a = -1, l = s == null ? 0 : s.length;
    for (this.clear(); ++a < l; ) {
      var c = s[a];
      this.set(c[0], c[1]);
    }
  }
  return o.prototype.clear = t, o.prototype.delete = e, o.prototype.get = n, o.prototype.has = r, o.prototype.set = i, Ec = o, Ec;
}
var Mc, dg;
function fR() {
  if (dg) return Mc;
  dg = 1;
  function t() {
    this.__data__ = [], this.size = 0;
  }
  return Mc = t, Mc;
}
var Ic, fg;
function ah() {
  if (fg) return Ic;
  fg = 1;
  function t(e, n) {
    return e === n || e !== e && n !== n;
  }
  return Ic = t, Ic;
}
var Ac, hg;
function vl() {
  if (hg) return Ac;
  hg = 1;
  var t = ah();
  function e(n, r) {
    for (var i = n.length; i--; )
      if (t(n[i][0], r))
        return i;
    return -1;
  }
  return Ac = e, Ac;
}
var _c, pg;
function hR() {
  if (pg) return _c;
  pg = 1;
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
var Pc, gg;
function pR() {
  if (gg) return Pc;
  gg = 1;
  var t = vl();
  function e(n) {
    var r = this.__data__, i = t(r, n);
    return i < 0 ? void 0 : r[i][1];
  }
  return Pc = e, Pc;
}
var Dc, mg;
function gR() {
  if (mg) return Dc;
  mg = 1;
  var t = vl();
  function e(n) {
    return t(this.__data__, n) > -1;
  }
  return Dc = e, Dc;
}
var Nc, yg;
function mR() {
  if (yg) return Nc;
  yg = 1;
  var t = vl();
  function e(n, r) {
    var i = this.__data__, o = t(i, n);
    return o < 0 ? (++this.size, i.push([n, r])) : i[o][1] = r, this;
  }
  return Nc = e, Nc;
}
var Oc, bg;
function wl() {
  if (bg) return Oc;
  bg = 1;
  var t = fR(), e = hR(), n = pR(), r = gR(), i = mR();
  function o(s) {
    var a = -1, l = s == null ? 0 : s.length;
    for (this.clear(); ++a < l; ) {
      var c = s[a];
      this.set(c[0], c[1]);
    }
  }
  return o.prototype.clear = t, o.prototype.delete = e, o.prototype.get = n, o.prototype.has = r, o.prototype.set = i, Oc = o, Oc;
}
var zc, vg;
function lh() {
  if (vg) return zc;
  vg = 1;
  var t = lo(), e = ii(), n = t(e, "Map");
  return zc = n, zc;
}
var Lc, wg;
function yR() {
  if (wg) return Lc;
  wg = 1;
  var t = dR(), e = wl(), n = lh();
  function r() {
    this.size = 0, this.__data__ = {
      hash: new t(),
      map: new (n || e)(),
      string: new t()
    };
  }
  return Lc = r, Lc;
}
var $c, xg;
function bR() {
  if (xg) return $c;
  xg = 1;
  function t(e) {
    var n = typeof e;
    return n == "string" || n == "number" || n == "symbol" || n == "boolean" ? e !== "__proto__" : e === null;
  }
  return $c = t, $c;
}
var Fc, kg;
function xl() {
  if (kg) return Fc;
  kg = 1;
  var t = bR();
  function e(n, r) {
    var i = n.__data__;
    return t(r) ? i[typeof r == "string" ? "string" : "hash"] : i.map;
  }
  return Fc = e, Fc;
}
var Hc, Sg;
function vR() {
  if (Sg) return Hc;
  Sg = 1;
  var t = xl();
  function e(n) {
    var r = t(this, n).delete(n);
    return this.size -= r ? 1 : 0, r;
  }
  return Hc = e, Hc;
}
var Bc, Cg;
function wR() {
  if (Cg) return Bc;
  Cg = 1;
  var t = xl();
  function e(n) {
    return t(this, n).get(n);
  }
  return Bc = e, Bc;
}
var qc, Rg;
function xR() {
  if (Rg) return qc;
  Rg = 1;
  var t = xl();
  function e(n) {
    return t(this, n).has(n);
  }
  return qc = e, qc;
}
var Wc, Tg;
function kR() {
  if (Tg) return Wc;
  Tg = 1;
  var t = xl();
  function e(n, r) {
    var i = t(this, n), o = i.size;
    return i.set(n, r), this.size += i.size == o ? 0 : 1, this;
  }
  return Wc = e, Wc;
}
var jc, Eg;
function ch() {
  if (Eg) return jc;
  Eg = 1;
  var t = yR(), e = vR(), n = wR(), r = xR(), i = kR();
  function o(s) {
    var a = -1, l = s == null ? 0 : s.length;
    for (this.clear(); ++a < l; ) {
      var c = s[a];
      this.set(c[0], c[1]);
    }
  }
  return o.prototype.clear = t, o.prototype.delete = e, o.prototype.get = n, o.prototype.has = r, o.prototype.set = i, jc = o, jc;
}
var Kc, Mg;
function SR() {
  if (Mg) return Kc;
  Mg = 1;
  var t = ch(), e = "Expected a function";
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
var Uc, Ig;
function CR() {
  if (Ig) return Uc;
  Ig = 1;
  var t = SR(), e = 500;
  function n(r) {
    var i = t(r, function(s) {
      return o.size === e && o.clear(), s;
    }), o = i.cache;
    return i;
  }
  return Uc = n, Uc;
}
var Gc, Ag;
function RR() {
  if (Ag) return Gc;
  Ag = 1;
  var t = CR(), e = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, n = /\\(\\)?/g, r = t(function(i) {
    var o = [];
    return i.charCodeAt(0) === 46 && o.push(""), i.replace(e, function(s, a, l, c) {
      o.push(l ? c.replace(n, "$1") : a || s);
    }), o;
  });
  return Gc = r, Gc;
}
var Yc, _g;
function TR() {
  if (_g) return Yc;
  _g = 1;
  function t(e, n) {
    for (var r = -1, i = e == null ? 0 : e.length, o = Array(i); ++r < i; )
      o[r] = n(e[r], r, e);
    return o;
  }
  return Yc = t, Yc;
}
var Xc, Pg;
function ER() {
  if (Pg) return Xc;
  Pg = 1;
  var t = Bs(), e = TR(), n = ri(), r = yl(), i = t ? t.prototype : void 0, o = i ? i.toString : void 0;
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
var Vc, Dg;
function MR() {
  if (Dg) return Vc;
  Dg = 1;
  var t = ER();
  function e(n) {
    return n == null ? "" : t(n);
  }
  return Vc = e, Vc;
}
var Jc, Ng;
function Lv() {
  if (Ng) return Jc;
  Ng = 1;
  var t = ri(), e = sh(), n = RR(), r = MR();
  function i(o, s) {
    return t(o) ? o : e(o, s) ? [o] : n(r(o));
  }
  return Jc = i, Jc;
}
var Zc, Og;
function IR() {
  if (Og) return Zc;
  Og = 1;
  var t = qs(), e = Ws(), n = "[object Arguments]";
  function r(i) {
    return e(i) && t(i) == n;
  }
  return Zc = r, Zc;
}
var Qc, zg;
function uh() {
  if (zg) return Qc;
  zg = 1;
  var t = IR(), e = Ws(), n = Object.prototype, r = n.hasOwnProperty, i = n.propertyIsEnumerable, o = t(/* @__PURE__ */ (function() {
    return arguments;
  })()) ? t : function(s) {
    return e(s) && r.call(s, "callee") && !i.call(s, "callee");
  };
  return Qc = o, Qc;
}
var eu, Lg;
function dh() {
  if (Lg) return eu;
  Lg = 1;
  var t = 9007199254740991, e = /^(?:0|[1-9]\d*)$/;
  function n(r, i) {
    var o = typeof r;
    return i = i ?? t, !!i && (o == "number" || o != "symbol" && e.test(r)) && r > -1 && r % 1 == 0 && r < i;
  }
  return eu = n, eu;
}
var tu, $g;
function fh() {
  if ($g) return tu;
  $g = 1;
  var t = 9007199254740991;
  function e(n) {
    return typeof n == "number" && n > -1 && n % 1 == 0 && n <= t;
  }
  return tu = e, tu;
}
var nu, Fg;
function kl() {
  if (Fg) return nu;
  Fg = 1;
  var t = yl();
  function e(n) {
    if (typeof n == "string" || t(n))
      return n;
    var r = n + "";
    return r == "0" && 1 / n == -1 / 0 ? "-0" : r;
  }
  return nu = e, nu;
}
var ru, Hg;
function $v() {
  if (Hg) return ru;
  Hg = 1;
  var t = Lv(), e = uh(), n = ri(), r = dh(), i = fh(), o = kl();
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
var iu, Bg;
function AR() {
  if (Bg) return iu;
  Bg = 1;
  var t = Q2(), e = $v();
  function n(r, i) {
    return r != null && e(r, i, t);
  }
  return iu = n, iu;
}
var _R = AR();
const PR = /* @__PURE__ */ Ni(_R);
function Fv(t = "This should not happen") {
  throw new Error(t);
}
function mr(t, e = "Assertion failed") {
  if (!t)
    return Fv(e);
}
function Ds(t, e) {
  return Fv(e ?? "Hell froze over");
}
function DR(t, e) {
  try {
    return t();
  } catch {
    return e;
  }
}
const qg = Object.prototype.hasOwnProperty;
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
        if (qg.call(t, n) && ++r && !qg.call(e, n) || !(n in e) || !qo(t[n], e[n]))
          return !1;
      return Object.keys(e).length === r;
    }
  }
  return t !== t && e !== e;
}
const Xa = null, hh = void 0;
var $e;
(function(t) {
  t.Uri = "uri", t.Text = "text", t.Image = "image", t.RowID = "row-id", t.Number = "number", t.Bubble = "bubble", t.Boolean = "boolean", t.Loading = "loading", t.Markdown = "markdown", t.Drilldown = "drilldown", t.Protected = "protected", t.Custom = "custom";
})($e || ($e = {}));
var Wg;
(function(t) {
  t.HeaderRowID = "headerRowID", t.HeaderCode = "headerCode", t.HeaderNumber = "headerNumber", t.HeaderString = "headerString", t.HeaderBoolean = "headerBoolean", t.HeaderAudioUri = "headerAudioUri", t.HeaderVideoUri = "headerVideoUri", t.HeaderEmoji = "headerEmoji", t.HeaderImage = "headerImage", t.HeaderUri = "headerUri", t.HeaderPhone = "headerPhone", t.HeaderMarkdown = "headerMarkdown", t.HeaderDate = "headerDate", t.HeaderTime = "headerTime", t.HeaderEmail = "headerEmail", t.HeaderReference = "headerReference", t.HeaderIfThenElse = "headerIfThenElse", t.HeaderSingleValue = "headerSingleValue", t.HeaderLookup = "headerLookup", t.HeaderTextTemplate = "headerTextTemplate", t.HeaderMath = "headerMath", t.HeaderRollup = "headerRollup", t.HeaderJoinStrings = "headerJoinStrings", t.HeaderSplitString = "headerSplitString", t.HeaderGeoDistance = "headerGeoDistance", t.HeaderArray = "headerArray", t.RowOwnerOverlay = "rowOwnerOverlay", t.ProtectedColumnOverlay = "protectedColumnOverlay";
})(Wg || (Wg = {}));
var Va;
(function(t) {
  t.Triangle = "triangle", t.Dots = "dots";
})(Va || (Va = {}));
function va(t) {
  return "width" in t && typeof t.width == "number";
}
async function jg(t) {
  return typeof t == "object" ? t : await t();
}
function To(t) {
  return !(t.kind === $e.Loading || t.kind === $e.Bubble || t.kind === $e.RowID || t.kind === $e.Protected || t.kind === $e.Drilldown);
}
function _o(t) {
  return t.kind === Ir.Marker || t.kind === Ir.NewRow;
}
function Eo(t) {
  if (!To(t) || t.kind === $e.Image)
    return !1;
  switch (t.kind) {
    case $e.Text:
    case $e.Number:
    case $e.Markdown:
    case $e.Uri:
    case $e.Custom:
    case $e.Boolean:
      return t.readonly !== !0;
    default:
      Ds(t, "A cell was passed with an invalid kind");
  }
}
function NR(t) {
  return PR(t, "editor");
}
function ph(t) {
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
let Kg;
const lr = class lr {
  constructor(e) {
    Qe(this, "items");
    this.items = e;
  }
  offset(e) {
    if (e === 0)
      return this;
    const n = this.items.map((r) => [r[0] + e, r[1] + e]);
    return new lr(n);
  }
  add(e) {
    const n = typeof e == "number" ? [e, e + 1] : e, r = ou([...this.items, n]);
    return new lr(r);
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
    return new lr(n);
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
Qe(lr, "create", (e) => new lr(ou(e))), Qe(lr, "empty", () => Kg ?? (Kg = new lr([]))), Qe(lr, "fromSingleSelection", (e) => lr.empty().add(e)), Qe(lr, "fromArray", (e) => {
  if (e.length === 0)
    return lr.empty();
  const n = e.map((i) => [i, i + 1]), r = ou(n);
  return new lr(r);
});
let rn = lr;
function OR(t) {
  var e = /* @__PURE__ */ Object.create(null);
  return function(n) {
    return e[n] === void 0 && (e[n] = t(n)), e[n];
  };
}
var zR = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/, su = /* @__PURE__ */ OR(
  function(t) {
    return zR.test(t) || t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && t.charCodeAt(2) < 91;
  }
  /* Z+1 */
), LR = function() {
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
}, Ug = LR, $R = (t) => t.toUpperCase() === t, FR = (t) => (e) => t.indexOf(e) === -1, Hv = (t, e) => {
  const n = {};
  return Object.keys(t).filter(FR(e)).forEach((r) => {
    n[r] = t[r];
  }), n;
};
function HR(t, e, n) {
  const r = Hv(e, n);
  if (!t) {
    const i = typeof su == "function" ? { default: su } : su;
    Object.keys(r).forEach((o) => {
      i.default(o) || delete r[o];
    });
  }
  return r;
}
var BR = (t, e) => {
  if (process.env.NODE_ENV !== "production") {
    if (typeof t == "string" || // eslint-disable-next-line no-self-compare,no-restricted-globals
    typeof t == "number" && isFinite(t))
      return;
    const n = typeof t == "object" ? JSON.stringify(t) : String(t);
    console.warn(
      `An interpolation evaluated to '${n}' in the component '${e}', which is probably a mistake. You should explicitly cast or transform the value to a string.`
    );
  }
}, qR = 0;
function Gg(t) {
  let e = "";
  return process.env.NODE_ENV === "test" && (e += `mocked-styled-${qR++}`, t && t.__wyw_meta && t.__wyw_meta.className && (e += ` ${t.__wyw_meta.className}`)), (n) => {
    if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Array.isArray(n))
      throw new Error(
        'Using the "styled" tag in runtime is not supported. Make sure you have set up the Babel plugin correctly. See https://github.com/callstack/linaria#setup'
      );
    const r = (o, s) => {
      const { as: a = t, class: l = e } = o, c = n.propsAsIs === void 0 ? !(typeof a == "string" && a.indexOf("-") === -1 && !$R(a[0])) : n.propsAsIs, u = HR(c, o, [
        "as",
        "class"
      ]);
      u.ref = s, u.className = n.atomic ? Ug(n.class, u.className || l) : Ug(u.className || l, n.class);
      const { vars: d } = n;
      if (d) {
        const f = {};
        for (const g in d) {
          const y = d[g], m = y[0], b = y[1] || "", C = typeof m == "function" ? m(o) : m;
          BR(C, n.name), f[`--${g}`] = `${C}${b}`;
        }
        const h = u.style || {}, p = Object.keys(h);
        p.length > 0 && p.forEach((g) => {
          f[g] = h[g];
        }), u.style = f;
      }
      return t.__wyw_meta && t !== a ? (u.as = a, rp(t, u)) : rp(a, u);
    }, i = np ? np(r) : (
      // React.forwardRef won't available on older React versions and in Preact
      // Fallback to a innerRef prop in that case
      ((o) => {
        const s = Hv(o, ["innerRef"]);
        return r(s, o.innerRef);
      })
    );
    return i.displayName = n.name, i.__wyw_meta = {
      className: n.class || e,
      extends: t
    }, i;
  };
}
var wr = process.env.NODE_ENV !== "production" ? new Proxy(Gg, {
  get(t, e) {
    return t(e);
  }
}) : Gg;
const WR = /* @__PURE__ */ wr("div")({
  name: "ImageOverlayEditorStyle",
  class: "gdg-i2iowwq",
  propsAsIs: !1
});
var au = {}, es = {}, wa = {}, xa = {}, ka = { exports: {} }, Sa = { exports: {} }, cn = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Yg;
function jR() {
  if (Yg) return cn;
  Yg = 1;
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
  function E(v) {
    return C(v) === c;
  }
  return cn.AsyncMode = l, cn.ConcurrentMode = c, cn.ContextConsumer = a, cn.ContextProvider = s, cn.Element = e, cn.ForwardRef = u, cn.Fragment = r, cn.Lazy = p, cn.Memo = h, cn.Portal = n, cn.Profiler = o, cn.StrictMode = i, cn.Suspense = d, cn.isAsyncMode = function(v) {
    return E(v) || C(v) === l;
  }, cn.isConcurrentMode = E, cn.isContextConsumer = function(v) {
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
var Xg;
function KR() {
  return Xg || (Xg = 1, process.env.NODE_ENV !== "production" && (function() {
    var t = typeof Symbol == "function" && Symbol.for, e = t ? Symbol.for("react.element") : 60103, n = t ? Symbol.for("react.portal") : 60106, r = t ? Symbol.for("react.fragment") : 60107, i = t ? Symbol.for("react.strict_mode") : 60108, o = t ? Symbol.for("react.profiler") : 60114, s = t ? Symbol.for("react.provider") : 60109, a = t ? Symbol.for("react.context") : 60110, l = t ? Symbol.for("react.async_mode") : 60111, c = t ? Symbol.for("react.concurrent_mode") : 60111, u = t ? Symbol.for("react.forward_ref") : 60112, d = t ? Symbol.for("react.suspense") : 60113, f = t ? Symbol.for("react.suspense_list") : 60120, h = t ? Symbol.for("react.memo") : 60115, p = t ? Symbol.for("react.lazy") : 60116, g = t ? Symbol.for("react.block") : 60121, y = t ? Symbol.for("react.fundamental") : 60117, m = t ? Symbol.for("react.responder") : 60118, b = t ? Symbol.for("react.scope") : 60119;
    function C(le) {
      return typeof le == "string" || typeof le == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      le === r || le === c || le === o || le === i || le === d || le === f || typeof le == "object" && le !== null && (le.$$typeof === p || le.$$typeof === h || le.$$typeof === s || le.$$typeof === a || le.$$typeof === u || le.$$typeof === y || le.$$typeof === m || le.$$typeof === b || le.$$typeof === g);
    }
    function E(le) {
      if (typeof le == "object" && le !== null) {
        var Ce = le.$$typeof;
        switch (Ce) {
          case e:
            var Re = le.type;
            switch (Re) {
              case l:
              case c:
              case r:
              case o:
              case i:
              case d:
                return Re;
              default:
                var Be = Re && Re.$$typeof;
                switch (Be) {
                  case a:
                  case u:
                  case p:
                  case h:
                  case s:
                    return Be;
                  default:
                    return Ce;
                }
            }
          case n:
            return Ce;
        }
      }
    }
    var v = l, T = c, D = a, P = s, k = e, z = u, S = r, x = p, I = h, _ = n, M = o, O = i, L = d, W = !1;
    function re(le) {
      return W || (W = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), F(le) || E(le) === l;
    }
    function F(le) {
      return E(le) === c;
    }
    function N(le) {
      return E(le) === a;
    }
    function te(le) {
      return E(le) === s;
    }
    function G(le) {
      return typeof le == "object" && le !== null && le.$$typeof === e;
    }
    function j(le) {
      return E(le) === u;
    }
    function ee(le) {
      return E(le) === r;
    }
    function q(le) {
      return E(le) === p;
    }
    function Q(le) {
      return E(le) === h;
    }
    function X(le) {
      return E(le) === n;
    }
    function J(le) {
      return E(le) === o;
    }
    function K(le) {
      return E(le) === i;
    }
    function se(le) {
      return E(le) === d;
    }
    un.AsyncMode = v, un.ConcurrentMode = T, un.ContextConsumer = D, un.ContextProvider = P, un.Element = k, un.ForwardRef = z, un.Fragment = S, un.Lazy = x, un.Memo = I, un.Portal = _, un.Profiler = M, un.StrictMode = O, un.Suspense = L, un.isAsyncMode = re, un.isConcurrentMode = F, un.isContextConsumer = N, un.isContextProvider = te, un.isElement = G, un.isForwardRef = j, un.isFragment = ee, un.isLazy = q, un.isMemo = Q, un.isPortal = X, un.isProfiler = J, un.isStrictMode = K, un.isSuspense = se, un.isValidElementType = C, un.typeOf = E;
  })()), un;
}
var Vg;
function Bv() {
  return Vg || (Vg = 1, process.env.NODE_ENV === "production" ? Sa.exports = jR() : Sa.exports = KR()), Sa.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var lu, Jg;
function UR() {
  if (Jg) return lu;
  Jg = 1;
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
var cu, Zg;
function gh() {
  if (Zg) return cu;
  Zg = 1;
  var t = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return cu = t, cu;
}
var uu, Qg;
function qv() {
  return Qg || (Qg = 1, uu = Function.call.bind(Object.prototype.hasOwnProperty)), uu;
}
var du, em;
function GR() {
  if (em) return du;
  em = 1;
  var t = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var e = /* @__PURE__ */ gh(), n = {}, r = /* @__PURE__ */ qv();
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
var fu, tm;
function YR() {
  if (tm) return fu;
  tm = 1;
  var t = Bv(), e = UR(), n = /* @__PURE__ */ gh(), r = /* @__PURE__ */ qv(), i = /* @__PURE__ */ GR(), o = function() {
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
      element: E(),
      elementType: v(),
      instanceOf: T,
      node: z(),
      objectOf: P,
      oneOf: D,
      oneOfType: k,
      shape: x,
      exact: I
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
      function G(ee, q, Q, X, J, K, se) {
        if (X = X || f, K = K || Q, se !== n) {
          if (l) {
            var le = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw le.name = "Invariant Violation", le;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var Ce = X + ":" + Q;
            !N[Ce] && // Avoid spamming the console because they are often not actionable except for lib authors
            te < 3 && (o(
              "You are manually calling a React.PropTypes validation function for the `" + K + "` prop on `" + X + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), N[Ce] = !0, te++);
          }
        }
        return q[Q] == null ? ee ? q[Q] === null ? new g("The " + J + " `" + K + "` is marked as required " + ("in `" + X + "`, but its value is `null`.")) : new g("The " + J + " `" + K + "` is marked as required in " + ("`" + X + "`, but its value is `undefined`.")) : null : F(q, Q, X, J, K);
      }
      var j = G.bind(null, !1);
      return j.isRequired = G.bind(null, !0), j;
    }
    function m(F) {
      function N(te, G, j, ee, q, Q) {
        var X = te[G], J = O(X);
        if (J !== F) {
          var K = L(X);
          return new g(
            "Invalid " + ee + " `" + q + "` of type " + ("`" + K + "` supplied to `" + j + "`, expected ") + ("`" + F + "`."),
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
      function N(te, G, j, ee, q) {
        if (typeof F != "function")
          return new g("Property `" + q + "` of component `" + j + "` has invalid PropType notation inside arrayOf.");
        var Q = te[G];
        if (!Array.isArray(Q)) {
          var X = O(Q);
          return new g("Invalid " + ee + " `" + q + "` of type " + ("`" + X + "` supplied to `" + j + "`, expected an array."));
        }
        for (var J = 0; J < Q.length; J++) {
          var K = F(Q, J, j, ee, q + "[" + J + "]", n);
          if (K instanceof Error)
            return K;
        }
        return null;
      }
      return y(N);
    }
    function E() {
      function F(N, te, G, j, ee) {
        var q = N[te];
        if (!a(q)) {
          var Q = O(q);
          return new g("Invalid " + j + " `" + ee + "` of type " + ("`" + Q + "` supplied to `" + G + "`, expected a single ReactElement."));
        }
        return null;
      }
      return y(F);
    }
    function v() {
      function F(N, te, G, j, ee) {
        var q = N[te];
        if (!t.isValidElementType(q)) {
          var Q = O(q);
          return new g("Invalid " + j + " `" + ee + "` of type " + ("`" + Q + "` supplied to `" + G + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return y(F);
    }
    function T(F) {
      function N(te, G, j, ee, q) {
        if (!(te[G] instanceof F)) {
          var Q = F.name || f, X = re(te[G]);
          return new g("Invalid " + ee + " `" + q + "` of type " + ("`" + X + "` supplied to `" + j + "`, expected ") + ("instance of `" + Q + "`."));
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
      function N(te, G, j, ee, q) {
        for (var Q = te[G], X = 0; X < F.length; X++)
          if (p(Q, F[X]))
            return null;
        var J = JSON.stringify(F, function(se, le) {
          var Ce = L(le);
          return Ce === "symbol" ? String(le) : le;
        });
        return new g("Invalid " + ee + " `" + q + "` of value `" + String(Q) + "` " + ("supplied to `" + j + "`, expected one of " + J + "."));
      }
      return y(N);
    }
    function P(F) {
      function N(te, G, j, ee, q) {
        if (typeof F != "function")
          return new g("Property `" + q + "` of component `" + j + "` has invalid PropType notation inside objectOf.");
        var Q = te[G], X = O(Q);
        if (X !== "object")
          return new g("Invalid " + ee + " `" + q + "` of type " + ("`" + X + "` supplied to `" + j + "`, expected an object."));
        for (var J in Q)
          if (r(Q, J)) {
            var K = F(Q, J, j, ee, q + "." + J, n);
            if (K instanceof Error)
              return K;
          }
        return null;
      }
      return y(N);
    }
    function k(F) {
      if (!Array.isArray(F))
        return process.env.NODE_ENV !== "production" && o("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var N = 0; N < F.length; N++) {
        var te = F[N];
        if (typeof te != "function")
          return o(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + W(te) + " at index " + N + "."
          ), s;
      }
      function G(j, ee, q, Q, X) {
        for (var J = [], K = 0; K < F.length; K++) {
          var se = F[K], le = se(j, ee, q, Q, X, n);
          if (le == null)
            return null;
          le.data && r(le.data, "expectedType") && J.push(le.data.expectedType);
        }
        var Ce = J.length > 0 ? ", expected one of type [" + J.join(", ") + "]" : "";
        return new g("Invalid " + Q + " `" + X + "` supplied to " + ("`" + q + "`" + Ce + "."));
      }
      return y(G);
    }
    function z() {
      function F(N, te, G, j, ee) {
        return _(N[te]) ? null : new g("Invalid " + j + " `" + ee + "` supplied to " + ("`" + G + "`, expected a ReactNode."));
      }
      return y(F);
    }
    function S(F, N, te, G, j) {
      return new g(
        (F || "React class") + ": " + N + " type `" + te + "." + G + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + j + "`."
      );
    }
    function x(F) {
      function N(te, G, j, ee, q) {
        var Q = te[G], X = O(Q);
        if (X !== "object")
          return new g("Invalid " + ee + " `" + q + "` of type `" + X + "` " + ("supplied to `" + j + "`, expected `object`."));
        for (var J in F) {
          var K = F[J];
          if (typeof K != "function")
            return S(j, ee, q, J, L(K));
          var se = K(Q, J, j, ee, q + "." + J, n);
          if (se)
            return se;
        }
        return null;
      }
      return y(N);
    }
    function I(F) {
      function N(te, G, j, ee, q) {
        var Q = te[G], X = O(Q);
        if (X !== "object")
          return new g("Invalid " + ee + " `" + q + "` of type `" + X + "` " + ("supplied to `" + j + "`, expected `object`."));
        var J = e({}, te[G], F);
        for (var K in J) {
          var se = F[K];
          if (r(F, K) && typeof se != "function")
            return S(j, ee, q, K, L(se));
          if (!se)
            return new g(
              "Invalid " + ee + " `" + q + "` key `" + K + "` supplied to `" + j + "`.\nBad object: " + JSON.stringify(te[G], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(F), null, "  ")
            );
          var le = se(Q, K, j, ee, q + "." + K, n);
          if (le)
            return le;
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
            var te = N.call(F), G;
            if (N !== F.entries) {
              for (; !(G = te.next()).done; )
                if (!_(G.value))
                  return !1;
            } else
              for (; !(G = te.next()).done; ) {
                var j = G.value;
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
    function M(F, N) {
      return F === "symbol" ? !0 : N ? N["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && N instanceof Symbol : !1;
    }
    function O(F) {
      var N = typeof F;
      return Array.isArray(F) ? "array" : F instanceof RegExp ? "object" : M(N, F) ? "symbol" : N;
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
var hu, nm;
function XR() {
  if (nm) return hu;
  nm = 1;
  var t = /* @__PURE__ */ gh();
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
var rm;
function VR() {
  if (rm) return ka.exports;
  if (rm = 1, process.env.NODE_ENV !== "production") {
    var t = Bv(), e = !0;
    ka.exports = /* @__PURE__ */ YR()(t.isElement, e);
  } else
    ka.exports = /* @__PURE__ */ XR()();
  return ka.exports;
}
var im;
function JR() {
  return im || (im = 1, (function(t) {
    (function(e, n) {
      n(t, _t, /* @__PURE__ */ VR());
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
          var E = arguments[C];
          for (var v in E)
            Object.prototype.hasOwnProperty.call(E, v) && (b[v] = E[v]);
        }
        return b;
      };
      function l(b, C) {
        var E = {};
        for (var v in b)
          C.indexOf(v) >= 0 || Object.prototype.hasOwnProperty.call(b, v) && (E[v] = b[v]);
        return E;
      }
      function c(b, C) {
        if (!(b instanceof C))
          throw new TypeError("Cannot call a class as a function");
      }
      var u = /* @__PURE__ */ (function() {
        function b(C, E) {
          for (var v = 0; v < E.length; v++) {
            var T = E[v];
            T.enumerable = T.enumerable || !1, T.configurable = !0, "value" in T && (T.writable = !0), Object.defineProperty(C, T.key, T);
          }
        }
        return function(C, E, v) {
          return E && b(C.prototype, E), v && b(C, v), C;
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
          var C = b.touches[0], E = C.pageX, v = C.pageY;
          return { x: E, y: v };
        }
        var T = b.screenX, D = b.screenY;
        return { x: T, y: D };
      }
      var m = (function(b) {
        f(C, b);
        function C() {
          var E;
          c(this, C);
          for (var v = arguments.length, T = Array(v), D = 0; D < v; D++)
            T[D] = arguments[D];
          var P = d(this, (E = C.__proto__ || Object.getPrototypeOf(C)).call.apply(E, [this].concat(T)));
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
              var T = y(v), D = T.x, P = T.y, k = D - this.moveStart.x, z = P - this.moveStart.y;
              this.moving = !0;
              var S = this.props.onSwipeMove({
                x: k,
                y: z
              }, v);
              S && v.cancelable && v.preventDefault(), this.movePosition = { deltaX: k, deltaY: z };
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
            var k = l(v, ["tagName", "className", "style", "children", "allowMouseEvents", "onSwipeUp", "onSwipeDown", "onSwipeLeft", "onSwipeRight", "onSwipeStart", "onSwipeMove", "onSwipeEnd", "innerRef", "tolerance"]);
            return i.default.createElement(
              this.props.tagName,
              a({
                ref: this._setSwiperRef,
                onMouseDown: this._onMouseDown,
                onTouchStart: this._handleSwipeStart,
                onTouchEnd: this._handleSwipeEnd,
                className: T,
                style: D
              }, k),
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
var om;
function Wv() {
  return om || (om = 1, (function(t) {
    (function(e, n) {
      n(t, JR());
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
var ts = {}, pu = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
var sm;
function ZR() {
  return sm || (sm = 1, (function(t) {
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
var am;
function jv() {
  if (am) return ts;
  am = 1, Object.defineProperty(ts, "__esModule", {
    value: !0
  }), ts.default = void 0;
  var t = e(ZR());
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
  return ts.default = r, ts;
}
var ns = {}, rs = {}, lm;
function QR() {
  if (lm) return rs;
  lm = 1, Object.defineProperty(rs, "__esModule", {
    value: !0
  }), rs.outerWidth = void 0;
  var t = function(n) {
    var r = n.offsetWidth, i = getComputedStyle(n);
    return r += parseInt(i.marginLeft) + parseInt(i.marginRight), r;
  };
  return rs.outerWidth = t, rs;
}
var is = {}, cm;
function mh() {
  if (cm) return is;
  cm = 1, Object.defineProperty(is, "__esModule", {
    value: !0
  }), is.default = void 0;
  var t = function(n, r, i) {
    var o = n === 0 ? n : n + r, s = i === "horizontal" ? [o, 0, 0] : [0, o, 0], a = "translate3d", l = "(" + s.join(",") + ")";
    return a + l;
  };
  return is.default = t, is;
}
var ss = {}, um;
function Kv() {
  if (um) return ss;
  um = 1, Object.defineProperty(ss, "__esModule", {
    value: !0
  }), ss.default = void 0;
  var t = function() {
    return window;
  };
  return ss.default = t, ss;
}
var dm;
function Uv() {
  if (dm) return ns;
  dm = 1, Object.defineProperty(ns, "__esModule", {
    value: !0
  }), ns.default = void 0;
  var t = l(_t), e = s(jv()), n = QR(), r = s(mh()), i = s(Wv()), o = s(Kv());
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
    var k = a();
    if (k && k.has(P))
      return k.get(P);
    var z = {}, S = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var x in P)
      if (Object.prototype.hasOwnProperty.call(P, x)) {
        var I = S ? Object.getOwnPropertyDescriptor(P, x) : null;
        I && (I.get || I.set) ? Object.defineProperty(z, x, I) : z[x] = P[x];
      }
    return z.default = P, k && k.set(P, z), z;
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
      for (var k = 1; k < arguments.length; k++) {
        var z = arguments[k];
        for (var S in z)
          Object.prototype.hasOwnProperty.call(z, S) && (P[S] = z[S]);
      }
      return P;
    }, u.apply(this, arguments);
  }
  function d(P, k) {
    if (!(P instanceof k))
      throw new TypeError("Cannot call a class as a function");
  }
  function f(P, k) {
    for (var z = 0; z < k.length; z++) {
      var S = k[z];
      S.enumerable = S.enumerable || !1, S.configurable = !0, "value" in S && (S.writable = !0), Object.defineProperty(P, S.key, S);
    }
  }
  function h(P, k, z) {
    return k && f(P.prototype, k), P;
  }
  function p(P, k) {
    if (typeof k != "function" && k !== null)
      throw new TypeError("Super expression must either be null or a function");
    P.prototype = Object.create(k && k.prototype, { constructor: { value: P, writable: !0, configurable: !0 } }), k && g(P, k);
  }
  function g(P, k) {
    return g = Object.setPrototypeOf || function(S, x) {
      return S.__proto__ = x, S;
    }, g(P, k);
  }
  function y(P) {
    var k = C();
    return function() {
      var S = E(P), x;
      if (k) {
        var I = E(this).constructor;
        x = Reflect.construct(S, arguments, I);
      } else
        x = S.apply(this, arguments);
      return m(this, x);
    };
  }
  function m(P, k) {
    return k && (c(k) === "object" || typeof k == "function") ? k : b(P);
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
  function E(P) {
    return E = Object.setPrototypeOf ? Object.getPrototypeOf : function(z) {
      return z.__proto__ || Object.getPrototypeOf(z);
    }, E(P);
  }
  function v(P, k, z) {
    return k in P ? Object.defineProperty(P, k, { value: z, enumerable: !0, configurable: !0, writable: !0 }) : P[k] = z, P;
  }
  var T = function(k) {
    return k.hasOwnProperty("key");
  }, D = /* @__PURE__ */ (function(P) {
    p(z, P);
    var k = y(z);
    function z(S) {
      var x;
      return d(this, z), x = k.call(this, S), v(b(x), "itemsWrapperRef", void 0), v(b(x), "itemsListRef", void 0), v(b(x), "thumbsRef", void 0), v(b(x), "setItemsWrapperRef", function(I) {
        x.itemsWrapperRef = I;
      }), v(b(x), "setItemsListRef", function(I) {
        x.itemsListRef = I;
      }), v(b(x), "setThumbsRef", function(I, _) {
        x.thumbsRef || (x.thumbsRef = []), x.thumbsRef[_] = I;
      }), v(b(x), "updateSizes", function() {
        if (!(!x.props.children || !x.itemsWrapperRef || !x.thumbsRef)) {
          var I = t.Children.count(x.props.children), _ = x.itemsWrapperRef.clientWidth, M = x.props.thumbWidth ? x.props.thumbWidth : (0, n.outerWidth)(x.thumbsRef[0]), O = Math.floor(_ / M), L = O < I, W = L ? I - O : 0;
          x.setState(function(re, F) {
            return {
              itemSize: M,
              visibleItems: O,
              firstItem: L ? x.getFirstItem(F.selectedItem) : 0,
              lastPosition: W,
              showArrows: L
            };
          });
        }
      }), v(b(x), "handleClickItem", function(I, _, M) {
        if (!T(M) || M.key === "Enter") {
          var O = x.props.onSelectItem;
          typeof O == "function" && O(I, _);
        }
      }), v(b(x), "onSwipeStart", function() {
        x.setState({
          swiping: !0
        });
      }), v(b(x), "onSwipeEnd", function() {
        x.setState({
          swiping: !1
        });
      }), v(b(x), "onSwipeMove", function(I) {
        var _ = I.x;
        if (!x.state.itemSize || !x.itemsWrapperRef || !x.state.visibleItems)
          return !1;
        var M = 0, O = t.Children.count(x.props.children), L = -(x.state.firstItem * 100) / x.state.visibleItems, W = Math.max(O - x.state.visibleItems, 0), re = -W * 100 / x.state.visibleItems;
        L === M && _ > 0 && (_ = 0), L === re && _ < 0 && (_ = 0);
        var F = x.itemsWrapperRef.clientWidth, N = L + 100 / (F / _);
        return x.itemsListRef && ["WebkitTransform", "MozTransform", "MsTransform", "OTransform", "transform", "msTransform"].forEach(function(te) {
          x.itemsListRef.style[te] = (0, r.default)(N, "%", x.props.axis);
        }), !0;
      }), v(b(x), "slideRight", function(I) {
        x.moveTo(x.state.firstItem - (typeof I == "number" ? I : 1));
      }), v(b(x), "slideLeft", function(I) {
        x.moveTo(x.state.firstItem + (typeof I == "number" ? I : 1));
      }), v(b(x), "moveTo", function(I) {
        I = I < 0 ? 0 : I, I = I >= x.state.lastPosition ? x.state.lastPosition : I, x.setState({
          firstItem: I
        });
      }), x.state = {
        selectedItem: S.selectedItem,
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
        var I = x;
        return x >= this.state.lastPosition && (I = this.state.lastPosition), x < this.state.firstItem + this.state.visibleItems && (I = this.state.firstItem), x < this.state.firstItem && (I = x), I;
      }
    }, {
      key: "renderItems",
      value: function() {
        var x = this;
        return this.props.children.map(function(I, _) {
          var M = e.default.ITEM(!1, _ === x.state.selectedItem), O = {
            key: _,
            ref: function(W) {
              return x.setThumbsRef(W, _);
            },
            className: M,
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
          }), I);
        });
      }
    }, {
      key: "render",
      value: function() {
        var x = this;
        if (!this.props.children)
          return null;
        var I = t.Children.count(this.props.children) > 1, _ = this.state.showArrows && this.state.firstItem > 0, M = this.state.showArrows && this.state.firstItem < this.state.lastPosition, O = {}, L = -this.state.firstItem * (this.state.itemSize || 0), W = (0, r.default)(L, "px", this.props.axis), re = this.props.transitionTime + "ms";
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
        }), I ? /* @__PURE__ */ t.default.createElement(i.default, {
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
          className: e.default.ARROW_NEXT(!M),
          onClick: function() {
            return x.slideLeft();
          },
          "aria-label": this.props.labels.rightArrow
        })));
      }
    }]), z;
  })(t.Component);
  return ns.default = D, v(D, "displayName", "Thumbs"), v(D, "defaultProps", {
    axis: "horizontal",
    labels: {
      leftArrow: "previous slide / item",
      rightArrow: "next slide / item",
      item: "slide item"
    },
    selectedItem: 0,
    thumbWidth: 80,
    transitionTime: 350
  }), ns;
}
var as = {}, fm;
function eT() {
  if (fm) return as;
  fm = 1, Object.defineProperty(as, "__esModule", {
    value: !0
  }), as.default = void 0;
  var t = function() {
    return document;
  };
  return as.default = t, as;
}
var gr = {}, hm;
function Gv() {
  if (hm) return gr;
  hm = 1, Object.defineProperty(gr, "__esModule", {
    value: !0
  }), gr.setPosition = gr.getPosition = gr.isKeyboardEvent = gr.defaultStatusFormatter = gr.noop = void 0;
  var t = _t, e = n(mh());
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
var $r = {}, pm;
function tT() {
  if (pm) return $r;
  pm = 1, Object.defineProperty($r, "__esModule", {
    value: !0
  }), $r.fadeAnimationHandler = $r.slideStopSwipingHandler = $r.slideSwipeAnimationHandler = $r.slideAnimationHandler = void 0;
  var t = _t, e = r(mh()), n = Gv();
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
    var C = (0, n.getPosition)(g, f), E = (0, e.default)(C, "%", f.axis), v = f.transitionTime + "ms";
    return p.itemListStyle = {
      WebkitTransform: E,
      msTransform: E,
      OTransform: E,
      transform: E
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
    var y = {}, m = h.axis === "horizontal", b = t.Children.count(h.children), C = 0, E = (0, n.getPosition)(p.selectedItem, h), v = h.infiniteLoop ? (0, n.getPosition)(b - 1, h) - 100 : (0, n.getPosition)(b - 1, h), T = m ? f.x : f.y, D = T;
    E === C && T > 0 && (D = 0), E === v && T < 0 && (D = 0);
    var P = E + 100 / (p.itemSize / D), k = Math.abs(T) > h.swipeScrollTolerance;
    return h.infiniteLoop && k && (p.selectedItem === 0 && P > -100 ? P -= b * 100 : p.selectedItem === b - 1 && P < -b * 100 && (P += b * 100)), (!h.preventMovementUntilSwipeScrollTolerance || k || p.swipeMovementStarted) && (p.swipeMovementStarted || g({
      swipeMovementStarted: !0
    }), y.itemListStyle = (0, n.setPosition)(P, h.axis)), k && !p.cancelClick && g({
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
var gm;
function nT() {
  if (gm) return es;
  gm = 1, Object.defineProperty(es, "__esModule", {
    value: !0
  }), es.default = void 0;
  var t = u(_t), e = l(Wv()), n = l(jv()), r = l(Uv()), i = l(eT()), o = l(Kv()), s = Gv(), a = tT();
  function l(S) {
    return S && S.__esModule ? S : { default: S };
  }
  function c() {
    if (typeof WeakMap != "function") return null;
    var S = /* @__PURE__ */ new WeakMap();
    return c = function() {
      return S;
    }, S;
  }
  function u(S) {
    if (S && S.__esModule)
      return S;
    if (S === null || d(S) !== "object" && typeof S != "function")
      return { default: S };
    var x = c();
    if (x && x.has(S))
      return x.get(S);
    var I = {}, _ = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var M in S)
      if (Object.prototype.hasOwnProperty.call(S, M)) {
        var O = _ ? Object.getOwnPropertyDescriptor(S, M) : null;
        O && (O.get || O.set) ? Object.defineProperty(I, M, O) : I[M] = S[M];
      }
    return I.default = S, x && x.set(S, I), I;
  }
  function d(S) {
    "@babel/helpers - typeof";
    return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? d = function(I) {
      return typeof I;
    } : d = function(I) {
      return I && typeof Symbol == "function" && I.constructor === Symbol && I !== Symbol.prototype ? "symbol" : typeof I;
    }, d(S);
  }
  function f() {
    return f = Object.assign || function(S) {
      for (var x = 1; x < arguments.length; x++) {
        var I = arguments[x];
        for (var _ in I)
          Object.prototype.hasOwnProperty.call(I, _) && (S[_] = I[_]);
      }
      return S;
    }, f.apply(this, arguments);
  }
  function h(S, x) {
    var I = Object.keys(S);
    if (Object.getOwnPropertySymbols) {
      var _ = Object.getOwnPropertySymbols(S);
      x && (_ = _.filter(function(M) {
        return Object.getOwnPropertyDescriptor(S, M).enumerable;
      })), I.push.apply(I, _);
    }
    return I;
  }
  function p(S) {
    for (var x = 1; x < arguments.length; x++) {
      var I = arguments[x] != null ? arguments[x] : {};
      x % 2 ? h(Object(I), !0).forEach(function(_) {
        k(S, _, I[_]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(S, Object.getOwnPropertyDescriptors(I)) : h(Object(I)).forEach(function(_) {
        Object.defineProperty(S, _, Object.getOwnPropertyDescriptor(I, _));
      });
    }
    return S;
  }
  function g(S, x) {
    if (!(S instanceof x))
      throw new TypeError("Cannot call a class as a function");
  }
  function y(S, x) {
    for (var I = 0; I < x.length; I++) {
      var _ = x[I];
      _.enumerable = _.enumerable || !1, _.configurable = !0, "value" in _ && (_.writable = !0), Object.defineProperty(S, _.key, _);
    }
  }
  function m(S, x, I) {
    return x && y(S.prototype, x), S;
  }
  function b(S, x) {
    if (typeof x != "function" && x !== null)
      throw new TypeError("Super expression must either be null or a function");
    S.prototype = Object.create(x && x.prototype, { constructor: { value: S, writable: !0, configurable: !0 } }), x && C(S, x);
  }
  function C(S, x) {
    return C = Object.setPrototypeOf || function(_, M) {
      return _.__proto__ = M, _;
    }, C(S, x);
  }
  function E(S) {
    var x = D();
    return function() {
      var _ = P(S), M;
      if (x) {
        var O = P(this).constructor;
        M = Reflect.construct(_, arguments, O);
      } else
        M = _.apply(this, arguments);
      return v(this, M);
    };
  }
  function v(S, x) {
    return x && (d(x) === "object" || typeof x == "function") ? x : T(S);
  }
  function T(S) {
    if (S === void 0)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return S;
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
  function P(S) {
    return P = Object.setPrototypeOf ? Object.getPrototypeOf : function(I) {
      return I.__proto__ || Object.getPrototypeOf(I);
    }, P(S);
  }
  function k(S, x, I) {
    return x in S ? Object.defineProperty(S, x, { value: I, enumerable: !0, configurable: !0, writable: !0 }) : S[x] = I, S;
  }
  var z = /* @__PURE__ */ (function(S) {
    b(I, S);
    var x = E(I);
    function I(_) {
      var M;
      g(this, I), M = x.call(this, _), k(T(M), "thumbsRef", void 0), k(T(M), "carouselWrapperRef", void 0), k(T(M), "listRef", void 0), k(T(M), "itemsRef", void 0), k(T(M), "timer", void 0), k(T(M), "animationHandler", void 0), k(T(M), "setThumbsRef", function(L) {
        M.thumbsRef = L;
      }), k(T(M), "setCarouselWrapperRef", function(L) {
        M.carouselWrapperRef = L;
      }), k(T(M), "setListRef", function(L) {
        M.listRef = L;
      }), k(T(M), "setItemsRef", function(L, W) {
        M.itemsRef || (M.itemsRef = []), M.itemsRef[W] = L;
      }), k(T(M), "autoPlay", function() {
        t.Children.count(M.props.children) <= 1 || (M.clearAutoPlay(), M.props.autoPlay && (M.timer = setTimeout(function() {
          M.increment();
        }, M.props.interval)));
      }), k(T(M), "clearAutoPlay", function() {
        M.timer && clearTimeout(M.timer);
      }), k(T(M), "resetAutoPlay", function() {
        M.clearAutoPlay(), M.autoPlay();
      }), k(T(M), "stopOnHover", function() {
        M.setState({
          isMouseEntered: !0
        }, M.clearAutoPlay);
      }), k(T(M), "startOnLeave", function() {
        M.setState({
          isMouseEntered: !1
        }, M.autoPlay);
      }), k(T(M), "isFocusWithinTheCarousel", function() {
        return M.carouselWrapperRef ? !!((0, i.default)().activeElement === M.carouselWrapperRef || M.carouselWrapperRef.contains((0, i.default)().activeElement)) : !1;
      }), k(T(M), "navigateWithKeyboard", function(L) {
        if (M.isFocusWithinTheCarousel()) {
          var W = M.props.axis, re = W === "horizontal", F = {
            ArrowUp: 38,
            ArrowRight: 39,
            ArrowDown: 40,
            ArrowLeft: 37
          }, N = re ? F.ArrowRight : F.ArrowDown, te = re ? F.ArrowLeft : F.ArrowUp;
          N === L.keyCode ? M.increment() : te === L.keyCode && M.decrement();
        }
      }), k(T(M), "updateSizes", function() {
        if (!(!M.state.initialized || !M.itemsRef || M.itemsRef.length === 0)) {
          var L = M.props.axis === "horizontal", W = M.itemsRef[0];
          if (W) {
            var re = L ? W.clientWidth : W.clientHeight;
            M.setState({
              itemSize: re
            }), M.thumbsRef && M.thumbsRef.updateSizes();
          }
        }
      }), k(T(M), "setMountState", function() {
        M.setState({
          hasMount: !0
        }), M.updateSizes();
      }), k(T(M), "handleClickItem", function(L, W) {
        if (t.Children.count(M.props.children) !== 0) {
          if (M.state.cancelClick) {
            M.setState({
              cancelClick: !1
            });
            return;
          }
          M.props.onClickItem(L, W), L !== M.state.selectedItem && M.setState({
            selectedItem: L
          });
        }
      }), k(T(M), "handleOnChange", function(L, W) {
        t.Children.count(M.props.children) <= 1 || M.props.onChange(L, W);
      }), k(T(M), "handleClickThumb", function(L, W) {
        M.props.onClickThumb(L, W), M.moveTo(L);
      }), k(T(M), "onSwipeStart", function(L) {
        M.setState({
          swiping: !0
        }), M.props.onSwipeStart(L);
      }), k(T(M), "onSwipeEnd", function(L) {
        M.setState({
          swiping: !1,
          cancelClick: !1,
          swipeMovementStarted: !1
        }), M.props.onSwipeEnd(L), M.clearAutoPlay(), M.state.autoPlay && M.autoPlay();
      }), k(T(M), "onSwipeMove", function(L, W) {
        M.props.onSwipeMove(W);
        var re = M.props.swipeAnimationHandler(L, M.props, M.state, M.setState.bind(T(M)));
        return M.setState(p({}, re)), !!Object.keys(re).length;
      }), k(T(M), "decrement", function() {
        var L = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
        M.moveTo(M.state.selectedItem - (typeof L == "number" ? L : 1));
      }), k(T(M), "increment", function() {
        var L = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
        M.moveTo(M.state.selectedItem + (typeof L == "number" ? L : 1));
      }), k(T(M), "moveTo", function(L) {
        if (typeof L == "number") {
          var W = t.Children.count(M.props.children) - 1;
          L < 0 && (L = M.props.infiniteLoop ? W : 0), L > W && (L = M.props.infiniteLoop ? 0 : W), M.selectItem({
            // if it's not a slider, we don't need to set position here
            selectedItem: L
          }), M.state.autoPlay && M.state.isMouseEntered === !1 && M.resetAutoPlay();
        }
      }), k(T(M), "onClickNext", function() {
        M.increment(1);
      }), k(T(M), "onClickPrev", function() {
        M.decrement(1);
      }), k(T(M), "onSwipeForward", function() {
        M.increment(1), M.props.emulateTouch && M.setState({
          cancelClick: !0
        });
      }), k(T(M), "onSwipeBackwards", function() {
        M.decrement(1), M.props.emulateTouch && M.setState({
          cancelClick: !0
        });
      }), k(T(M), "changeItem", function(L) {
        return function(W) {
          (!(0, s.isKeyboardEvent)(W) || W.key === "Enter") && M.moveTo(L);
        };
      }), k(T(M), "selectItem", function(L) {
        M.setState(p({
          previousItem: M.state.selectedItem
        }, L), function() {
          M.setState(M.animationHandler(M.props, M.state));
        }), M.handleOnChange(L.selectedItem, t.Children.toArray(M.props.children)[L.selectedItem]);
      }), k(T(M), "getInitialImage", function() {
        var L = M.props.selectedItem, W = M.itemsRef && M.itemsRef[L], re = W && W.getElementsByTagName("img") || [];
        return re[0];
      }), k(T(M), "getVariableItemHeight", function(L) {
        var W = M.itemsRef && M.itemsRef[L];
        if (M.state.hasMount && W && W.children.length) {
          var re = W.children[0].getElementsByTagName("img") || [];
          if (re.length > 0) {
            var F = re[0];
            if (!F.complete) {
              var N = function j() {
                M.forceUpdate(), F.removeEventListener("load", j);
              };
              F.addEventListener("load", N);
            }
          }
          var te = re[0] || W.children[0], G = te.clientHeight;
          return G > 0 ? G : null;
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
      return M.animationHandler = typeof _.animationHandler == "function" && _.animationHandler || _.animationHandler === "fade" && a.fadeAnimationHandler || a.slideAnimationHandler, M.state = p(p({}, O), M.animationHandler(_, O)), M;
    }
    return m(I, [{
      key: "componentDidMount",
      value: function() {
        this.props.children && this.setupCarousel();
      }
    }, {
      key: "componentDidUpdate",
      value: function(M, O) {
        !M.children && this.props.children && !this.state.initialized && this.setupCarousel(), !M.autoFocus && this.props.autoFocus && this.forceFocus(), O.swiping && !this.state.swiping && this.setState(p({}, this.props.stopSwipingHandler(this.props, this.state))), (M.selectedItem !== this.props.selectedItem || M.centerMode !== this.props.centerMode) && (this.updateSizes(), this.moveTo(this.props.selectedItem)), M.autoPlay !== this.props.autoPlay && (this.props.autoPlay ? this.setupAutoPlay() : this.destroyAutoPlay(), this.setState({
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
        var M = this;
        this.bindEvents(), this.state.autoPlay && t.Children.count(this.props.children) > 1 && this.setupAutoPlay(), this.props.autoFocus && this.forceFocus(), this.setState({
          initialized: !0
        }, function() {
          var O = M.getInitialImage();
          O && !O.complete ? O.addEventListener("load", M.setMountState) : M.setMountState();
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
        var M = this.carouselWrapperRef;
        this.props.stopOnHover && M && (M.addEventListener("mouseenter", this.stopOnHover), M.addEventListener("mouseleave", this.startOnLeave));
      }
    }, {
      key: "destroyAutoPlay",
      value: function() {
        this.clearAutoPlay();
        var M = this.carouselWrapperRef;
        this.props.stopOnHover && M && (M.removeEventListener("mouseenter", this.stopOnHover), M.removeEventListener("mouseleave", this.startOnLeave));
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
        var M = this.getInitialImage();
        M && M.removeEventListener("load", this.setMountState), this.props.useKeyboardArrows && (0, i.default)().removeEventListener("keydown", this.navigateWithKeyboard);
      }
    }, {
      key: "forceFocus",
      value: function() {
        var M;
        (M = this.carouselWrapperRef) === null || M === void 0 || M.focus();
      }
    }, {
      key: "renderItems",
      value: function(M) {
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
            key: "itemKey" + W + (M ? "clone" : ""),
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
        var M = this, O = this.props, L = O.showIndicators, W = O.labels, re = O.renderIndicator, F = O.children;
        return L ? /* @__PURE__ */ t.default.createElement("ul", {
          className: "control-dots"
        }, t.Children.map(F, function(N, te) {
          return re && re(M.changeItem(te), te === M.state.selectedItem, te, W.item);
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
        var M = this;
        if (!this.props.children || t.Children.count(this.props.children) === 0)
          return null;
        var O = this.props.swipeable && t.Children.count(this.props.children) > 1, L = this.props.axis === "horizontal", W = this.props.showArrows && t.Children.count(this.props.children) > 1, re = W && (this.state.selectedItem > 0 || this.props.infiniteLoop) || !1, F = W && (this.state.selectedItem < t.Children.count(this.props.children) - 1 || this.props.infiniteLoop) || !1, N = this.renderItems(!0), te = N.shift(), G = N.pop(), j = {
          className: n.default.SLIDER(!0, this.state.swiping),
          onSwipeMove: this.onSwipeMove,
          onSwipeStart: this.onSwipeStart,
          onSwipeEnd: this.onSwipeEnd,
          style: this.state.itemListStyle,
          tolerance: this.props.swipeScrollTolerance
        }, ee = {};
        if (L) {
          if (j.onSwipeLeft = this.onSwipeForward, j.onSwipeRight = this.onSwipeBackwards, this.props.dynamicHeight) {
            var q = this.getVariableItemHeight(this.state.selectedItem);
            ee.height = q || "auto";
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
        }), this.props.infiniteLoop && G, this.renderItems(), this.props.infiniteLoop && te) : /* @__PURE__ */ t.default.createElement("ul", {
          className: n.default.SLIDER(!0, this.state.swiping),
          ref: function(X) {
            return M.setListRef(X);
          },
          style: this.state.itemListStyle || {}
        }, this.props.infiniteLoop && G, this.renderItems(), this.props.infiniteLoop && te)), this.props.renderArrowNext(this.onClickNext, F, this.props.labels.rightArrow), this.renderStatus()), this.renderThumbs());
      }
    }]), I;
  })(t.default.Component);
  return es.default = z, k(z, "displayName", "Carousel"), k(z, "defaultProps", {
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
    renderArrowPrev: function(x, I, _) {
      return /* @__PURE__ */ t.default.createElement("button", {
        type: "button",
        "aria-label": _,
        className: n.default.ARROW_PREV(!I),
        onClick: x
      });
    },
    renderArrowNext: function(x, I, _) {
      return /* @__PURE__ */ t.default.createElement("button", {
        type: "button",
        "aria-label": _,
        className: n.default.ARROW_NEXT(!I),
        onClick: x
      });
    },
    renderIndicator: function(x, I, _, M) {
      return /* @__PURE__ */ t.default.createElement("li", {
        className: n.default.DOT(I),
        onClick: x,
        onKeyDown: x,
        value: _,
        key: _,
        role: "button",
        tabIndex: 0,
        "aria-label": "".concat(M, " ").concat(_ + 1)
      });
    },
    renderItem: function(x) {
      return x;
    },
    renderThumbs: function(x) {
      var I = t.Children.map(x, function(_) {
        var M = _;
        if (_.type !== "img" && (M = t.Children.toArray(_.props.children).find(function(O) {
          return O.type === "img";
        })), !!M)
          return M;
      });
      return I.filter(function(_) {
        return _;
      }).length === 0 ? (console.warn("No images found! Can't build the thumb list without images. If you don't need thumbs, set showThumbs={false} in the Carousel. Note that it's not possible to get images rendered inside custom components. More info at https://github.com/leandrowd/react-responsive-carousel/blob/master/TROUBLESHOOTING.md"), []) : I;
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
  }), es;
}
var mm = {}, ym;
function rT() {
  return ym || (ym = 1), mm;
}
var bm;
function iT() {
  return bm || (bm = 1, (function(t) {
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
    var e = i(nT()), n = rT(), r = i(Uv());
    function i(o) {
      return o && o.__esModule ? o : { default: o };
    }
  })(au)), au;
}
var oT = iT(), gu, vm;
function sT() {
  if (vm) return gu;
  vm = 1;
  var t = ii(), e = function() {
    return t.Date.now();
  };
  return gu = e, gu;
}
var mu, wm;
function aT() {
  if (wm) return mu;
  wm = 1;
  var t = /\s/;
  function e(n) {
    for (var r = n.length; r-- && t.test(n.charAt(r)); )
      ;
    return r;
  }
  return mu = e, mu;
}
var yu, xm;
function lT() {
  if (xm) return yu;
  xm = 1;
  var t = aT(), e = /^\s+/;
  function n(r) {
    return r && r.slice(0, t(r) + 1).replace(e, "");
  }
  return yu = n, yu;
}
var bu, km;
function yh() {
  if (km) return bu;
  km = 1;
  var t = lT(), e = ao(), n = yl(), r = NaN, i = /^[-+]0x[0-9a-f]+$/i, o = /^0b[01]+$/i, s = /^0o[0-7]+$/i, a = parseInt;
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
var vu, Sm;
function Yv() {
  if (Sm) return vu;
  Sm = 1;
  var t = ao(), e = sT(), n = yh(), r = "Expected a function", i = Math.max, o = Math.min;
  function s(a, l, c) {
    var u, d, f, h, p, g, y = 0, m = !1, b = !1, C = !0;
    if (typeof a != "function")
      throw new TypeError(r);
    l = n(l) || 0, t(c) && (m = !!c.leading, b = "maxWait" in c, f = b ? i(n(c.maxWait) || 0, l) : f, C = "trailing" in c ? !!c.trailing : C);
    function E(I) {
      var _ = u, M = d;
      return u = d = void 0, y = I, h = a.apply(M, _), h;
    }
    function v(I) {
      return y = I, p = setTimeout(P, l), m ? E(I) : h;
    }
    function T(I) {
      var _ = I - g, M = I - y, O = l - _;
      return b ? o(O, f - M) : O;
    }
    function D(I) {
      var _ = I - g, M = I - y;
      return g === void 0 || _ >= l || _ < 0 || b && M >= f;
    }
    function P() {
      var I = e();
      if (D(I))
        return k(I);
      p = setTimeout(P, T(I));
    }
    function k(I) {
      return p = void 0, C && u ? E(I) : (u = d = void 0, h);
    }
    function z() {
      p !== void 0 && clearTimeout(p), y = 0, u = g = d = p = void 0;
    }
    function S() {
      return p === void 0 ? h : k(e());
    }
    function x() {
      var I = e(), _ = D(I);
      if (u = arguments, d = this, g = I, _) {
        if (p === void 0)
          return v(g);
        if (b)
          return clearTimeout(p), p = setTimeout(P, l), E(g);
      }
      return p === void 0 && (p = setTimeout(P, l)), h;
    }
    return x.cancel = z, x.flush = S, x;
  }
  return vu = s, vu;
}
var cT = Yv();
const Xv = /* @__PURE__ */ Ni(cT);
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
function Ei(t, e) {
  return t === void 0 ? void 0 : e;
}
const uT = Math.PI;
function Cm(t) {
  return t * uT / 180;
}
const Vv = (t, e, n) => ({
  x1: t - n / 2,
  y1: e - n / 2,
  x2: t + n / 2,
  y2: e + n / 2
}), Jv = (t, e, n, r, i) => {
  switch (t) {
    case "left":
      return Math.floor(e) + r + i / 2;
    case "center":
      return Math.floor(e + n / 2);
    case "right":
      return Math.floor(e + n) - r - i / 2;
  }
}, Zv = (t, e, n) => Math.min(t, e - n * 2), Qv = (t, e, n) => n.x1 <= t && t <= n.x2 && n.y1 <= e && e <= n.y2, bh = (t) => {
  const e = t.fgColor ?? "currentColor";
  return w.createElement(
    "svg",
    { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    w.createElement("path", { d: "M12.7073 7.05029C7.87391 11.8837 10.4544 9.30322 6.03024 13.7273C5.77392 13.9836 5.58981 14.3071 5.50189 14.6587L4.52521 18.5655C4.38789 19.1148 4.88543 19.6123 5.43472 19.475L9.34146 18.4983C9.69313 18.4104 10.0143 18.2286 10.2706 17.9722L16.9499 11.2929", stroke: e, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", fill: "none", vectorEffect: "non-scaling-stroke" }),
    w.createElement("path", { d: "M20.4854 4.92901L19.0712 3.5148C18.2901 2.73375 17.0238 2.73375 16.2428 3.5148L14.475 5.28257C15.5326 7.71912 16.4736 8.6278 18.7176 9.52521L20.4854 7.75744C21.2665 6.97639 21.2665 5.71006 20.4854 4.92901Z", stroke: e, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", fill: "none", vectorEffect: "non-scaling-stroke" })
  );
}, dT = (t) => {
  const e = t.fgColor ?? "currentColor";
  return w.createElement(
    "svg",
    { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    w.createElement("path", { d: "M19 6L10.3802 17L5.34071 11.8758", vectorEffect: "non-scaling-stroke", stroke: e, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
  );
};
function fT(t, e, n) {
  const [r, i] = w.useState(t), o = w.useRef(!0);
  w.useEffect(() => () => {
    o.current = !1;
  }, []);
  const s = w.useRef(Xv((a) => {
    o.current && i(a);
  }, n));
  return w.useLayoutEffect(() => {
    o.current && s.current(() => t());
  }, e), r;
}
const hT = "֑-߿יִ-﷽ﹰ-ﻼ", pT = "A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿‎Ⰰ-﬜︀-﹯﻽-￿", gT = new RegExp("^[^" + pT + "]*[" + hT + "]");
function vh(t) {
  return gT.test(t) ? "rtl" : "not-rtl";
}
let Ca;
function kf() {
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
function mT(t) {
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
function e1(t) {
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
function yT(t) {
  const e = w.useRef(t);
  return qo(t, e.current) || (e.current = t), e.current;
}
const bT = (t) => {
  const { urls: e, canWrite: n, onEditClick: r, renderImage: i } = t, o = e.filter((a) => a !== "");
  if (o.length === 0)
    return null;
  const s = o.length > 1;
  return w.createElement(
    WR,
    { "data-testid": "GDG-default-image-overlay-editor" },
    w.createElement(oT.Carousel, { showArrows: s, showThumbs: !1, swipeable: s, emulateTouch: s, infiniteLoop: s }, o.map((a) => {
      const l = (i == null ? void 0 : i(a)) ?? w.createElement("img", { draggable: !1, src: a });
      return w.createElement("div", { className: "gdg-centering-container", key: a }, l);
    })),
    n && r && w.createElement(
      "button",
      { className: "gdg-edit-icon", onClick: r },
      w.createElement(bh, null)
    )
  );
};
function wh() {
  return { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null };
}
var co = wh();
function t1(t) {
  co = t;
}
var xs = { exec: () => null };
function on(t, e = "") {
  let n = typeof t == "string" ? t : t.source, r = { replace: (i, o) => {
    let s = typeof o == "string" ? o : o.source;
    return s = s.replace(nr.caret, "$1"), n = n.replace(i, s), r;
  }, getRegex: () => new RegExp(n, e) };
  return r;
}
var vT = (() => {
  try {
    return !!new RegExp("(?<=1)(?<!1)");
  } catch {
    return !1;
  }
})(), nr = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] /, listReplaceTask: /^\[[ xX]\] +/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (t) => new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}#`), htmlBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}<(?:[a-z].*>|!--)`, "i") }, wT = /^(?:[ \t]*(?:\n|$))+/, xT = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, kT = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, js = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, ST = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, xh = /(?:[*+-]|\d{1,9}[.)])/, n1 = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, r1 = on(n1).replace(/bull/g, xh).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), CT = on(n1).replace(/bull/g, xh).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), kh = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, RT = /^[^\n]+/, Sh = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, TT = on(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", Sh).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), ET = on(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, xh).getRegex(), Sl = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", Ch = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, MT = on("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", Ch).replace("tag", Sl).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), i1 = on(kh).replace("hr", js).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Sl).getRegex(), IT = on(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", i1).getRegex(), Rh = { blockquote: IT, code: xT, def: TT, fences: kT, heading: ST, hr: js, html: MT, lheading: r1, list: ET, newline: wT, paragraph: i1, table: xs, text: RT }, Rm = on("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", js).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Sl).getRegex(), AT = { ...Rh, lheading: CT, table: Rm, paragraph: on(kh).replace("hr", js).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Rm).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Sl).getRegex() }, _T = { ...Rh, html: on(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", Ch).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: xs, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: on(kh).replace("hr", js).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", r1).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, PT = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, DT = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, o1 = /^( {2,}|\\)\n(?!\s*$)/, NT = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Cl = /[\p{P}\p{S}]/u, Th = /[\s\p{P}\p{S}]/u, s1 = /[^\s\p{P}\p{S}]/u, OT = on(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, Th).getRegex(), a1 = /(?!~)[\p{P}\p{S}]/u, zT = /(?!~)[\s\p{P}\p{S}]/u, LT = /(?:[^\s\p{P}\p{S}]|~)/u, $T = on(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", vT ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), l1 = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, FT = on(l1, "u").replace(/punct/g, Cl).getRegex(), HT = on(l1, "u").replace(/punct/g, a1).getRegex(), c1 = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", BT = on(c1, "gu").replace(/notPunctSpace/g, s1).replace(/punctSpace/g, Th).replace(/punct/g, Cl).getRegex(), qT = on(c1, "gu").replace(/notPunctSpace/g, LT).replace(/punctSpace/g, zT).replace(/punct/g, a1).getRegex(), WT = on("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, s1).replace(/punctSpace/g, Th).replace(/punct/g, Cl).getRegex(), jT = on(/\\(punct)/, "gu").replace(/punct/g, Cl).getRegex(), KT = on(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), UT = on(Ch).replace("(?:-->|$)", "-->").getRegex(), GT = on("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", UT).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Za = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/, YT = on(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", Za).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), u1 = on(/^!?\[(label)\]\[(ref)\]/).replace("label", Za).replace("ref", Sh).getRegex(), d1 = on(/^!?\[(ref)\](?:\[\])?/).replace("ref", Sh).getRegex(), XT = on("reflink|nolink(?!\\()", "g").replace("reflink", u1).replace("nolink", d1).getRegex(), Tm = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, Eh = { _backpedal: xs, anyPunctuation: jT, autolink: KT, blockSkip: $T, br: o1, code: DT, del: xs, emStrongLDelim: FT, emStrongRDelimAst: BT, emStrongRDelimUnd: WT, escape: PT, link: YT, nolink: d1, punctuation: OT, reflink: u1, reflinkSearch: XT, tag: GT, text: NT, url: xs }, VT = { ...Eh, link: on(/^!?\[(label)\]\((.*?)\)/).replace("label", Za).getRegex(), reflink: on(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Za).getRegex() }, Sf = { ...Eh, emStrongRDelimAst: qT, emStrongLDelim: HT, url: on(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", Tm).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: on(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", Tm).getRegex() }, JT = { ...Sf, br: on(o1).replace("{2,}", "*").getRegex(), text: on(Sf.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, Ra = { normal: Rh, gfm: AT, pedantic: _T }, ls = { normal: Eh, gfm: Sf, breaks: JT, pedantic: VT }, ZT = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, Em = (t) => ZT[t];
function Qr(t, e) {
  if (e) {
    if (nr.escapeTest.test(t)) return t.replace(nr.escapeReplace, Em);
  } else if (nr.escapeTestNoEncode.test(t)) return t.replace(nr.escapeReplaceNoEncode, Em);
  return t;
}
function Mm(t) {
  try {
    t = encodeURI(t).replace(nr.percentDecode, "%");
  } catch {
    return null;
  }
  return t;
}
function Im(t, e) {
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
function cs(t, e, n) {
  let r = t.length;
  if (r === 0) return "";
  let i = 0;
  for (; i < r && t.charAt(r - i - 1) === e; )
    i++;
  return t.slice(0, r - i);
}
function QT(t, e) {
  if (t.indexOf(e[1]) === -1) return -1;
  let n = 0;
  for (let r = 0; r < t.length; r++) if (t[r] === "\\") r++;
  else if (t[r] === e[0]) n++;
  else if (t[r] === e[1] && (n--, n < 0)) return r;
  return n > 0 ? -2 : -1;
}
function Am(t, e, n, r, i) {
  let o = e.href, s = e.title || null, a = t[1].replace(i.other.outputLinkReplace, "$1");
  r.state.inLink = !0;
  let l = { type: t[0].charAt(0) === "!" ? "image" : "link", raw: n, href: o, title: s, text: a, tokens: r.inlineTokens(a) };
  return r.state.inLink = !1, l;
}
function eE(t, e, n) {
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
      return { type: "code", raw: e[0], codeBlockStyle: "indented", text: this.options.pedantic ? n : cs(n, `
`) };
    }
  }
  fences(t) {
    let e = this.rules.block.fences.exec(t);
    if (e) {
      let n = e[0], r = eE(n, e[3] || "", this.rules);
      return { type: "code", raw: n, lang: e[2] ? e[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : e[2], text: r };
    }
  }
  heading(t) {
    let e = this.rules.block.heading.exec(t);
    if (e) {
      let n = e[2].trim();
      if (this.rules.other.endingHash.test(n)) {
        let r = cs(n, "#");
        (this.options.pedantic || !r || this.rules.other.endingSpaceChar.test(r)) && (n = r.trim());
      }
      return { type: "heading", raw: e[0], depth: e[1].length, text: n, tokens: this.lexer.inline(n) };
    }
  }
  hr(t) {
    let e = this.rules.block.hr.exec(t);
    if (e) return { type: "hr", raw: cs(e[0], `
`) };
  }
  blockquote(t) {
    let e = this.rules.block.blockquote.exec(t);
    if (e) {
      let n = cs(e[0], `
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
          let m = this.rules.other.nextBulletRegex(p), b = this.rules.other.hrRegex(p), C = this.rules.other.fencesBeginRegex(p), E = this.rules.other.headingBeginRegex(p), v = this.rules.other.htmlBeginRegex(p);
          for (; t; ) {
            let T = t.split(`
`, 1)[0], D;
            if (f = T, this.options.pedantic ? (f = f.replace(this.rules.other.listReplaceNesting, "  "), D = f) : D = f.replace(this.rules.other.tabCharGlobal, "    "), C.test(f) || E.test(f) || v.test(f) || m.test(f) || b.test(f)) break;
            if (D.search(this.rules.other.nonSpaceChar) >= p || !f.trim()) u += `
` + D.slice(p);
            else {
              if (h || d.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || C.test(d) || E.test(d) || b.test(d)) break;
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
    let n = Im(e[1]), r = e[2].replace(this.rules.other.tableAlignChars, "").split("|"), i = (s = e[3]) != null && s.trim() ? e[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], o = { type: "table", raw: e[0], header: [], align: [], rows: [] };
    if (n.length === r.length) {
      for (let a of r) this.rules.other.tableAlignRight.test(a) ? o.align.push("right") : this.rules.other.tableAlignCenter.test(a) ? o.align.push("center") : this.rules.other.tableAlignLeft.test(a) ? o.align.push("left") : o.align.push(null);
      for (let a = 0; a < n.length; a++) o.header.push({ text: n[a], tokens: this.lexer.inline(n[a]), header: !0, align: o.align[a] });
      for (let a of i) o.rows.push(Im(a, o.header.length).map((l, c) => ({ text: l, tokens: this.lexer.inline(l), header: !1, align: o.align[c] })));
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
        let o = cs(n.slice(0, -1), "\\");
        if ((n.length - o.length) % 2 === 0) return;
      } else {
        let o = QT(e[2], "()");
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
      return r = r.trim(), this.rules.other.startAngleBracket.test(r) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? r = r.slice(1) : r = r.slice(1, -1)), Am(e, { href: r && r.replace(this.rules.inline.anyPunctuation, "$1"), title: i && i.replace(this.rules.inline.anyPunctuation, "$1") }, e[0], this.lexer, this.rules);
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
      return Am(n, i, n[0], this.lexer, this.rules);
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
}, Fr = class Cf {
  constructor(e) {
    Qe(this, "tokens");
    Qe(this, "options");
    Qe(this, "state");
    Qe(this, "tokenizer");
    Qe(this, "inlineQueue");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || co, this.options.tokenizer = this.options.tokenizer || new Qa(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, top: !0 };
    let n = { other: nr, block: Ra.normal, inline: ls.normal };
    this.options.pedantic ? (n.block = Ra.pedantic, n.inline = ls.pedantic) : this.options.gfm && (n.block = Ra.gfm, this.options.breaks ? n.inline = ls.breaks : n.inline = ls.gfm), this.tokenizer.rules = n;
  }
  static get rules() {
    return { block: Ra, inline: ls };
  }
  static lex(e, n) {
    return new Cf(n).lex(e);
  }
  static lexInline(e, n) {
    return new Cf(n).inlineTokens(e);
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
    let r = this.parser.parseInline(n), i = Mm(t);
    if (i === null) return r;
    t = i;
    let o = '<a href="' + t + '"';
    return e && (o += ' title="' + Qr(e) + '"'), o += ">" + r + "</a>", o;
  }
  image({ href: t, title: e, text: n, tokens: r }) {
    r && (n = this.parser.parseInline(r, this.parser.textRenderer));
    let i = Mm(t);
    if (i === null) return Qr(n);
    t = i;
    let o = `<img src="${t}" alt="${n}"`;
    return e && (o += ` title="${Qr(e)}"`), o += ">", o;
  }
  text(t) {
    return "tokens" in t && t.tokens ? this.parser.parseInline(t.tokens) : "escaped" in t && t.escaped ? t.text : Qr(t.text);
  }
}, Mh = class {
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
}, Hr = class Rf {
  constructor(e) {
    Qe(this, "options");
    Qe(this, "renderer");
    Qe(this, "textRenderer");
    this.options = e || co, this.options.renderer = this.options.renderer || new el(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new Mh();
  }
  static parse(e, n) {
    return new Rf(n).parse(e);
  }
  static parseInline(e, n) {
    return new Rf(n).parseInline(e);
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
}, Aa, ms = (Aa = class {
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
}, Qe(Aa, "passThroughHooks", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"])), Qe(Aa, "passThroughHooksRespectAsync", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"])), Aa), tE = class {
  constructor(...t) {
    Qe(this, "defaults", wh());
    Qe(this, "options", this.setOptions);
    Qe(this, "parse", this.parseMarkdown(!0));
    Qe(this, "parseInline", this.parseMarkdown(!1));
    Qe(this, "Parser", Hr);
    Qe(this, "Renderer", el);
    Qe(this, "TextRenderer", Mh);
    Qe(this, "Lexer", Fr);
    Qe(this, "Tokenizer", Qa);
    Qe(this, "Hooks", ms);
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
        let i = this.defaults.hooks || new ms();
        for (let o in n.hooks) {
          if (!(o in i)) throw new Error(`hook '${o}' does not exist`);
          if (["options", "block"].includes(o)) continue;
          let s = o, a = n.hooks[s], l = i[s];
          ms.passThroughHooks.has(o) ? i[s] = (c) => {
            if (this.defaults.async && ms.passThroughHooksRespectAsync.has(o)) return (async () => {
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
}, ro = new tE();
function fn(t, e) {
  return ro.parse(t, e);
}
fn.options = fn.setOptions = function(t) {
  return ro.setOptions(t), fn.defaults = ro.defaults, t1(fn.defaults), fn;
};
fn.getDefaults = wh;
fn.defaults = co;
fn.use = function(...t) {
  return ro.use(...t), fn.defaults = ro.defaults, t1(fn.defaults), fn;
};
fn.walkTokens = function(t, e) {
  return ro.walkTokens(t, e);
};
fn.parseInline = ro.parseInline;
fn.Parser = Hr;
fn.parser = Hr.parse;
fn.Renderer = el;
fn.TextRenderer = Mh;
fn.Lexer = Fr;
fn.lexer = Fr.lex;
fn.Tokenizer = Qa;
fn.Hooks = ms;
fn.parse = fn;
fn.options;
fn.setOptions;
fn.use;
fn.walkTokens;
fn.parseInline;
Hr.parse;
Fr.lex;
const nE = /* @__PURE__ */ wr("div")({
  name: "MarkdownContainer",
  class: "gdg-mnuv029",
  propsAsIs: !1
});
class rE extends _t.PureComponent {
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
    return this.renderMarkdownIntoDiv(), _t.createElement(nE, { ref: this.containerRefHook });
  }
}
const iE = /* @__PURE__ */ wr("textarea")({
  name: "InputBox",
  class: "gdg-izpuzkl",
  propsAsIs: !1
}), oE = /* @__PURE__ */ wr("div")({
  name: "ShadowBox",
  class: "gdg-s69h75o",
  propsAsIs: !1
}), sE = /* @__PURE__ */ wr("div")({
  name: "GrowingEntryStyle",
  class: "gdg-g1y0xocz",
  propsAsIs: !1
});
let _m = 0;
const Ks = (t) => {
  const { placeholder: e, value: n, onKeyDown: r, highlight: i, altNewline: o, validatedSelection: s, ...a } = t, { onChange: l, className: c } = a, u = w.useRef(null), d = n ?? "";
  mr(l !== void 0, "GrowingEntry must be a controlled input area");
  const [f] = w.useState(() => "input-box-" + (_m = (_m + 1) % 1e7));
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
    sE,
    { className: "gdg-growing-entry" },
    w.createElement(oE, { className: c }, d + `
`),
    w.createElement(iE, { ...a, className: (c ?? "") + " gdg-input", id: f, ref: u, onKeyDown: h, value: d, placeholder: e, dir: "auto" })
  );
}, wu = {};
let Ri = null;
function aE() {
  const t = document.createElement("div");
  return t.style.opacity = "0", t.style.pointerEvents = "none", t.style.position = "fixed", document.body.append(t), t;
}
function Tf(t) {
  const e = t.toLowerCase().trim();
  if (wu[e] !== void 0)
    return wu[e];
  Ri = Ri || aE(), Ri.style.color = "#000", Ri.style.color = e;
  const n = getComputedStyle(Ri).color;
  Ri.style.color = "#fff", Ri.style.color = e;
  const r = getComputedStyle(Ri).color;
  if (r !== n)
    return [0, 0, 0, 1];
  let i = r.replace(/[^\d.,]/g, "").split(",").map(Number.parseFloat);
  return i.length < 4 && i.push(1), i = i.map((o) => {
    const s = Number.isNaN(o);
    return process.env.NODE_ENV !== "production" && s && console.warn("Could not parse color", t), s ? 0 : o;
  }), wu[e] = i, i;
}
function io(t, e) {
  const [n, r, i] = Tf(t);
  return `rgba(${n}, ${r}, ${i}, ${e})`;
}
const Pm = /* @__PURE__ */ new Map();
function Dm(t, e) {
  const n = `${t}-${e}`, r = Pm.get(n);
  if (r !== void 0)
    return r;
  const i = yr(t, e);
  return Pm.set(n, i), i;
}
function yr(t, e) {
  if (e === void 0)
    return t;
  const [n, r, i, o] = Tf(t);
  if (o === 1)
    return t;
  const [s, a, l, c] = Tf(e), u = o + c * (1 - o), d = (o * n + c * s * (1 - o)) / u, f = (o * r + c * a * (1 - o)) / u, h = (o * i + c * l * (1 - o)) / u;
  return `rgba(${d}, ${f}, ${h}, ${u})`;
}
var Mo = /* @__PURE__ */ new Map(), Po = /* @__PURE__ */ new Map(), Ef = /* @__PURE__ */ new Map();
function lE() {
  Mo.clear(), Ef.clear(), Po.clear();
}
function cE(t, e, n, r, i) {
  var o, s, a;
  let l = 0, c = {};
  for (let d of t) l += (o = n.get(d)) != null ? o : i, c[d] = ((s = c[d]) != null ? s : 0) + 1;
  let u = e - l;
  for (let d of Object.keys(c)) {
    let f = c[d], h = (a = n.get(d)) != null ? a : i, p = h * f / l, g = u * p * r / f, y = h + g;
    n.set(d, y);
  }
}
function uE(t, e) {
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
function ks(t, e, n, r) {
  var i, o;
  let s = Po.get(n);
  if (r && s !== void 0 && s.count > 2e4) {
    let c = Ef.get(n);
    if (c === void 0 && (c = uE(t, s.size), Ef.set(n, c)), s.count > 5e5) {
      let d = 0;
      for (let f of e) d += (i = c.get(f)) != null ? i : s.size;
      return d * 1.01;
    }
    let u = t.measureText(e);
    return cE(e, u.width, c, Math.max(0.05, 1 - s.count / 2e5), s.size), Po.set(n, { count: s.count + e.length, size: s.size }), u.width;
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
function dE(t, e, n, r, i, o, s, a) {
  if (e.length <= 1) return e.length;
  if (i < n) return -1;
  let l = Math.floor(n / i * o), c = ks(t, e.slice(0, Math.max(0, l)), r, s);
  if (c !== n) if (c < n) {
    for (; c < n; ) l++, c = ks(t, e.slice(0, Math.max(0, l)), r, s);
    l--;
  } else for (; c > n; ) {
    let u = e.lastIndexOf(" ", l - 1);
    u > 0 ? l = u : l--, c = ks(t, e.slice(0, Math.max(0, l)), r, s);
  }
  if (e[l] !== " ") {
    let u = 0;
    u = e.lastIndexOf(" ", l), u > 0 && (l = u);
  }
  return l;
}
function fE(t, e, n, r, i, o) {
  let s = `${e}_${n}_${r}px`, a = Mo.get(s);
  if (a !== void 0) return a;
  if (r <= 0) return [];
  let l = [], c = e.split(`
`), u = Po.get(n), d = u === void 0 ? e.length : r / u.size * 1.5, f = i && u !== void 0 && u.count > 2e4;
  for (let h of c) {
    let p = ks(t, h.slice(0, Math.max(0, d)), n, f), g = Math.min(h.length, d);
    if (p <= r) l.push(h);
    else {
      for (; p > r; ) {
        let y = dE(t, h, r, n, p, g, f), m = h.slice(0, Math.max(0, y));
        h = h.slice(m.length), l.push(m), p = ks(t, h.slice(0, Math.max(0, d)), n, f), g = Math.min(h.length, d);
      }
      p > 0 && l.push(h);
    }
  }
  return l = l.map((h, p) => p === 0 ? h.trimEnd() : h.trim()), Mo.set(s, l), Mo.size > 500 && Mo.delete(Mo.keys().next().value), l;
}
function hE(t, e) {
  return _t.useMemo(() => t.map((n, r) => ({
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
function pE(t, e) {
  const [n, r] = e;
  if (t.columns.hasIndex(n) || t.rows.hasIndex(r))
    return !0;
  if (t.current !== void 0) {
    if (Ss(t.current.cell, e))
      return !0;
    const i = [t.current.range, ...t.current.rangeStack];
    for (const o of i)
      if (n >= o.x && n < o.x + o.width && r >= o.y && r < o.y + o.height)
        return !0;
  }
  return !1;
}
function Ns(t, e) {
  return (t ?? "") === (e ?? "");
}
function gE(t, e, n) {
  return n.current === void 0 || t[1] !== n.current.cell[1] ? !1 : e.span === void 0 ? n.current.cell[0] === t[0] : n.current.cell[0] >= e.span[0] && n.current.cell[0] <= e.span[1];
}
function f1(t, e) {
  const [n, r] = t;
  return n >= e.x && n < e.x + e.width && r >= e.y && r < e.y + e.height;
}
function Ss(t, e) {
  return (t == null ? void 0 : t[0]) === (e == null ? void 0 : e[0]) && (t == null ? void 0 : t[1]) === (e == null ? void 0 : e[1]);
}
function h1(t) {
  return [t.x + t.width - 1, t.y + t.height - 1];
}
function Nm(t, e, n) {
  const r = n.x, i = n.x + n.width - 1, o = n.y, s = n.y + n.height - 1, [a, l] = t;
  if (l < o || l > s)
    return !1;
  if (e.span === void 0)
    return a >= r && a <= i;
  const [c, u] = e.span;
  return c >= r && c <= i || u >= r && c <= i || c < r && u > i;
}
function mE(t, e, n, r) {
  let i = 0;
  if (n.current === void 0)
    return i;
  const o = n.current.range;
  (r || o.height * o.width > 1) && Nm(t, e, o) && i++;
  for (const s of n.current.rangeStack)
    Nm(t, e, s) && i++;
  return i;
}
function p1(t, e) {
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
  const r = p1(t, e);
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
function Mf(t, e, n, r, i) {
  const o = p1(t, r), s = [];
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
function yE(t, e, n) {
  let r = 0;
  for (const i of e) {
    const o = i.sticky ? r : r + (n ?? 0);
    if (t <= o + i.width)
      return i.sourceIndex;
    r += i.width;
  }
  return -1;
}
function bE(t, e, n, r, i, o, s, a, l, c) {
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
let Oa = 0, Cs = {};
const vE = typeof window > "u";
async function wE() {
  var t;
  vE || ((t = document == null ? void 0 : document.fonts) == null ? void 0 : t.ready) === void 0 || (await document.fonts.ready, Oa = 0, Cs = {}, lE());
}
wE();
function g1(t, e, n, r) {
  return `${t}_${r ?? (e == null ? void 0 : e.font)}_${n}`;
}
function Ko(t, e, n, r = "middle") {
  const i = g1(t, e, r, n);
  let o = Cs[i];
  return o === void 0 && (o = e.measureText(t), Cs[i] = o, Oa++), Oa > 1e4 && (Cs = {}, Oa = 0), o;
}
function m1(t, e) {
  const n = g1(t, void 0, "middle", e);
  return Cs[n];
}
function Oi(t, e) {
  return typeof e != "string" && (e = e.baseFontFull), xE(t, e);
}
function Om(t, e) {
  const n = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  t.save(), t.textBaseline = e;
  const r = t.measureText(n);
  return t.restore(), r;
}
const zm = [];
function xE(t, e) {
  for (const o of zm)
    if (o.key === e)
      return o.val;
  const n = Om(t, "alphabetic"), i = -(Om(t, "middle").actualBoundingBoxDescent - n.actualBoundingBoxDescent) + n.actualBoundingBoxAscent / 2;
  return zm.push({
    key: e,
    val: i
  }), i;
}
function kE(t, e, n, r, i, o) {
  const { ctx: s, rect: a, theme: l } = t;
  let c = Number.MAX_SAFE_INTEGER;
  const u = 500;
  if (e !== void 0 && (c = n - e, c < u)) {
    const d = 1 - c / u;
    s.globalAlpha = d, s.fillStyle = l.bgSearchResult, s.fillRect(a.x + 1, a.y + 1, a.width - (i ? 2 : 1), a.height - (o ? 2 : 1)), s.globalAlpha = 1, r !== void 0 && (r.fillStyle = l.bgSearchResult);
  }
  return c < u;
}
function Us(t, e, n) {
  const { ctx: r, theme: i } = t, o = e ?? {}, s = n ?? i.textDark;
  return s !== o.fillStyle && (r.fillStyle = s, o.fillStyle = s), o;
}
function y1(t, e, n, r, i, o, s, a, l) {
  l === "right" ? t.fillText(e, n + i - (a.cellHorizontalPadding + 0.5), r + o / 2 + s) : l === "center" ? t.fillText(e, n + i / 2, r + o / 2 + s) : t.fillText(e, n + a.cellHorizontalPadding + 0.5, r + o / 2 + s);
}
function b1(t, e) {
  const n = Ko("ABCi09jgqpy", t, e);
  return n.actualBoundingBoxAscent + n.actualBoundingBoxDescent;
}
function SE(t, e) {
  t.includes(`
`) && (t = t.split(/\r?\n/, 1)[0]);
  const n = e / 4;
  return t.length > n && (t = t.slice(0, n)), t;
}
function CE(t, e, n, r, i, o, s, a, l, c) {
  const u = a.baseFontFull, d = fE(t, e, u, i - a.cellHorizontalPadding * 2, c ?? !1), f = b1(t, u), h = a.lineHeight * f, p = f + h * (d.length - 1), g = p + a.cellVerticalPadding > o;
  g && (t.save(), t.rect(n, r, i, o), t.clip());
  const y = r + o / 2 - p / 2;
  let m = Math.max(r + a.cellVerticalPadding, y);
  for (const b of d)
    if (y1(t, b, n, m, i, f, s, a, l), m += h, m > r + o)
      break;
  g && t.restore();
}
function li(t, e, n, r, i) {
  const { ctx: o, rect: s, theme: a } = t, { x: l, y: c, width: u, height: d } = s;
  r = r ?? !1, r || (e = SE(e, u));
  const f = Oi(o, a), h = vh(e) === "rtl";
  if (n === void 0 && h && (n = "right"), h && (o.direction = "rtl"), e.length > 0) {
    let p = !1;
    n === "right" ? (o.textAlign = "right", p = !0) : n !== void 0 && n !== "left" && (o.textAlign = n, p = !0), r ? CE(o, e, l, c, u, d, f, a, n, i) : y1(o, e, l, c, u, d, f, a, n), p && (o.textAlign = "start"), h && (o.direction = "inherit");
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
function RE(t, e, n) {
  t.arc(e, n - 1.25 * 3.5, 1.25, 0, 2 * Math.PI, !1), t.arc(e, n, 1.25, 0, 2 * Math.PI, !1), t.arc(e, n + 1.25 * 3.5, 1.25, 0, 2 * Math.PI, !1);
}
function TE(t, e, n) {
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
    let E = l.x + d.nx * b, v = l.y + d.ny * b;
    E += -d.ny * C * g, v += d.nx * C * g, t.arc(E, v, C, u.ang + Math.PI / 2 * g, d.ang - Math.PI / 2 * g, y), s = l, l = c;
  }
  t.closePath();
}
function If(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p) {
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
    for (; m > 0 && Ns(h[m - 1].group, b) && h[m - 1].sticky === C; ) {
      const v = h[m - 1];
      g.x -= v.width, g.width += v.width, m--;
    }
    let E = t;
    for (; E + 1 < h.length && Ns(h[E + 1].group, b) && h[E + 1].sticky === C; ) {
      const v = h[E + 1];
      g.width += v.width, E++;
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
const Ih = 1 << 21;
function qr(t, e) {
  return (e + 2) * Ih + t;
}
function v1(t) {
  return t % Ih;
}
function Ah(t) {
  return Math.floor(t / Ih) - 2;
}
function _h(t) {
  const e = v1(t), n = Ah(t);
  return [e, n];
}
class w1 {
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
      const n = v1(e), r = Ah(e), i = this.visibleWindow, o = n >= i.x && n <= i.x + i.width || n < this.freezeCols, s = r >= i.y && r <= i.y + i.height || this.freezeRows.includes(r);
      return o && s;
    });
  }
  setWindow(e, n, r) {
    this.visibleWindow.x === e.x && this.visibleWindow.y === e.y && this.visibleWindow.width === e.width && this.visibleWindow.height === e.height && this.freezeCols === n && qo(this.freezeRows, r) || (this.visibleWindow = e, this.freezeCols = n, this.freezeRows = r, this.clearOutOfWindow());
  }
}
class EE extends w1 {
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
class Rs {
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
      if (Ah(e) < 0)
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
      yield _h(e);
  }
}
function ME(t) {
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
const x1 = {
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
function Ph() {
  return x1;
}
const IE = _t.createContext(x1);
function fi(t, ...e) {
  const n = { ...t };
  for (const r of e)
    if (r !== void 0)
      for (const i in r)
        r.hasOwnProperty(i) && (i === "bgCell" ? n[i] = yr(r[i], n[i]) : n[i] = r[i]);
  return (n.headerFontFull === void 0 || t.fontFamily !== n.fontFamily || t.headerFontStyle !== n.headerFontStyle) && (n.headerFontFull = `${n.headerFontStyle} ${n.fontFamily}`), (n.baseFontFull === void 0 || t.fontFamily !== n.fontFamily || t.baseFontStyle !== n.baseFontStyle) && (n.baseFontFull = `${n.baseFontStyle} ${n.fontFamily}`), (n.markerFontFull === void 0 || t.fontFamily !== n.fontFamily || t.markerFontStyle !== n.markerFontStyle) && (n.markerFontFull = `${n.markerFontStyle} ${n.fontFamily}`), n;
}
const Af = 150;
function AE(t, e, n, r) {
  var o;
  const i = r(e);
  return ((o = i == null ? void 0 : i.measure) == null ? void 0 : o.call(i, t, e, n)) ?? Af;
}
function k1(t, e, n, r, i, o, s, a, l) {
  let c = 0;
  const u = i === void 0 ? [] : i.map((h) => {
    const p = AE(t, h[r], e, l);
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
function _E(t, e, n, r, i, o, s, a, l) {
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
    let C = Math.max(1, 10 - Math.floor(t.length / 1e4)), E = 0;
    C < c.current && C > 1 && (C--, E = 1);
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
      const P = b(v, l.signal), k = E > 0 ? b(T, l.signal) : void 0;
      let z;
      typeof P == "object" ? z = P : z = await jg(P), k !== void 0 && (typeof k == "object" ? z = [...z, ...k] : z = [...z, ...await jg(k)]), g.current = t, m(z);
    })();
  }, [l.signal, t]), w.useMemo(() => {
    let C = t.every(va) ? t : h === null ? t.map((D) => va(D) ? D : {
      ...D,
      width: Af
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
          width: Af
        };
      const k = k1(h, s, D, P, y, i, o, !0, a);
      return p.current[D.id] = k.width, k;
    })), E = 0, v = 0;
    const T = [];
    for (const [D, P] of C.entries())
      E += P.width, P.grow !== void 0 && P.grow > 0 && (v += P.grow, T.push(D));
    if (E < r && T.length > 0) {
      const D = [...C], P = r - E;
      let k = P;
      for (let z = 0; z < T.length; z++) {
        const S = T[z], x = (C[S].grow ?? 0) / v, I = z === T.length - 1 ? k : Math.min(k, Math.floor(P * x));
        D[S] = {
          ...C[S],
          growOffset: I,
          width: C[S].width + I
        }, k -= I;
      }
      C = D;
    }
    return {
      sizedColumns: C,
      nonGrowWidth: E
    };
  }, [r, t, h, y, s, i, o, a]);
}
var xu, Lm;
function PE() {
  if (Lm) return xu;
  Lm = 1;
  function t(e, n, r) {
    return e === e && (r !== void 0 && (e = e <= r ? e : r), n !== void 0 && (e = e >= n ? e : n)), e;
  }
  return xu = t, xu;
}
var ku, $m;
function DE() {
  if ($m) return ku;
  $m = 1;
  var t = PE(), e = yh();
  function n(r, i, o) {
    return o === void 0 && (o = i, i = void 0), o !== void 0 && (o = e(o), o = o === o ? o : 0), i !== void 0 && (i = e(i), i = i === i ? i : 0), t(e(r), i, o);
  }
  return ku = n, ku;
}
var NE = DE();
const Er = /* @__PURE__ */ Ni(NE);
var Su, Fm;
function OE() {
  if (Fm) return Su;
  Fm = 1;
  var t = "__lodash_hash_undefined__";
  function e(n) {
    return this.__data__.set(n, t), this;
  }
  return Su = e, Su;
}
var Cu, Hm;
function zE() {
  if (Hm) return Cu;
  Hm = 1;
  function t(e) {
    return this.__data__.has(e);
  }
  return Cu = t, Cu;
}
var Ru, Bm;
function S1() {
  if (Bm) return Ru;
  Bm = 1;
  var t = ch(), e = OE(), n = zE();
  function r(i) {
    var o = -1, s = i == null ? 0 : i.length;
    for (this.__data__ = new t(); ++o < s; )
      this.add(i[o]);
  }
  return r.prototype.add = r.prototype.push = e, r.prototype.has = n, Ru = r, Ru;
}
var Tu, qm;
function LE() {
  if (qm) return Tu;
  qm = 1;
  function t(e, n, r, i) {
    for (var o = e.length, s = r + (i ? 1 : -1); i ? s-- : ++s < o; )
      if (n(e[s], s, e))
        return s;
    return -1;
  }
  return Tu = t, Tu;
}
var Eu, Wm;
function $E() {
  if (Wm) return Eu;
  Wm = 1;
  function t(e) {
    return e !== e;
  }
  return Eu = t, Eu;
}
var Mu, jm;
function FE() {
  if (jm) return Mu;
  jm = 1;
  function t(e, n, r) {
    for (var i = r - 1, o = e.length; ++i < o; )
      if (e[i] === n)
        return i;
    return -1;
  }
  return Mu = t, Mu;
}
var Iu, Km;
function HE() {
  if (Km) return Iu;
  Km = 1;
  var t = LE(), e = $E(), n = FE();
  function r(i, o, s) {
    return o === o ? n(i, o, s) : t(i, e, s);
  }
  return Iu = r, Iu;
}
var Au, Um;
function BE() {
  if (Um) return Au;
  Um = 1;
  var t = HE();
  function e(n, r) {
    var i = n == null ? 0 : n.length;
    return !!i && t(n, r, 0) > -1;
  }
  return Au = e, Au;
}
var _u, Gm;
function qE() {
  if (Gm) return _u;
  Gm = 1;
  function t(e, n, r) {
    for (var i = -1, o = e == null ? 0 : e.length; ++i < o; )
      if (r(n, e[i]))
        return !0;
    return !1;
  }
  return _u = t, _u;
}
var Pu, Ym;
function C1() {
  if (Ym) return Pu;
  Ym = 1;
  function t(e, n) {
    return e.has(n);
  }
  return Pu = t, Pu;
}
var Du, Xm;
function R1() {
  if (Xm) return Du;
  Xm = 1;
  var t = lo(), e = ii(), n = t(e, "Set");
  return Du = n, Du;
}
var Nu, Vm;
function WE() {
  if (Vm) return Nu;
  Vm = 1;
  function t() {
  }
  return Nu = t, Nu;
}
var Ou, Jm;
function Dh() {
  if (Jm) return Ou;
  Jm = 1;
  function t(e) {
    var n = -1, r = Array(e.size);
    return e.forEach(function(i) {
      r[++n] = i;
    }), r;
  }
  return Ou = t, Ou;
}
var zu, Zm;
function jE() {
  if (Zm) return zu;
  Zm = 1;
  var t = R1(), e = WE(), n = Dh(), r = 1 / 0, i = t && 1 / n(new t([, -0]))[1] == r ? function(o) {
    return new t(o);
  } : e;
  return zu = i, zu;
}
var Lu, Qm;
function KE() {
  if (Qm) return Lu;
  Qm = 1;
  var t = S1(), e = BE(), n = qE(), r = C1(), i = jE(), o = Dh(), s = 200;
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
          for (var E = y.length; E--; )
            if (y[E] === C)
              continue e;
          c && y.push(C), g.push(b);
        } else f(y, C, u) || (y !== g && y.push(C), g.push(b));
      }
    return g;
  }
  return Lu = a, Lu;
}
var $u, e0;
function UE() {
  if (e0) return $u;
  e0 = 1;
  var t = KE();
  function e(n) {
    return n && n.length ? t(n) : [];
  }
  return $u = e, $u;
}
var GE = UE();
const YE = /* @__PURE__ */ Ni(GE);
var Fu, t0;
function T1() {
  if (t0) return Fu;
  t0 = 1;
  function t(e, n) {
    for (var r = -1, i = n.length, o = e.length; ++r < i; )
      e[o + r] = n[r];
    return e;
  }
  return Fu = t, Fu;
}
var Hu, n0;
function XE() {
  if (n0) return Hu;
  n0 = 1;
  var t = Bs(), e = uh(), n = ri(), r = t ? t.isConcatSpreadable : void 0;
  function i(o) {
    return n(o) || e(o) || !!(r && o && o[r]);
  }
  return Hu = i, Hu;
}
var Bu, r0;
function VE() {
  if (r0) return Bu;
  r0 = 1;
  var t = T1(), e = XE();
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
var qu, i0;
function JE() {
  if (i0) return qu;
  i0 = 1;
  var t = VE();
  function e(n) {
    var r = n == null ? 0 : n.length;
    return r ? t(n, 1) : [];
  }
  return qu = e, qu;
}
var ZE = JE();
const o0 = /* @__PURE__ */ Ni(ZE);
var Wu, s0;
function QE() {
  if (s0) return Wu;
  s0 = 1;
  var t = Math.ceil, e = Math.max;
  function n(r, i, o, s) {
    for (var a = -1, l = e(t((i - r) / (o || 1)), 0), c = Array(l); l--; )
      c[s ? l : ++a] = r, r += o;
    return c;
  }
  return Wu = n, Wu;
}
var ju, a0;
function Nh() {
  if (a0) return ju;
  a0 = 1;
  var t = Ov(), e = fh();
  function n(r) {
    return r != null && e(r.length) && !t(r);
  }
  return ju = n, ju;
}
var Ku, l0;
function eM() {
  if (l0) return Ku;
  l0 = 1;
  var t = ah(), e = Nh(), n = dh(), r = ao();
  function i(o, s, a) {
    if (!r(a))
      return !1;
    var l = typeof s;
    return (l == "number" ? e(a) && n(s, a.length) : l == "string" && s in a) ? t(a[s], o) : !1;
  }
  return Ku = i, Ku;
}
var Uu, c0;
function tM() {
  if (c0) return Uu;
  c0 = 1;
  var t = yh(), e = 1 / 0, n = 17976931348623157e292;
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
var Gu, u0;
function nM() {
  if (u0) return Gu;
  u0 = 1;
  var t = QE(), e = eM(), n = tM();
  function r(i) {
    return function(o, s, a) {
      return a && typeof a != "number" && e(o, s, a) && (s = a = void 0), o = n(o), s === void 0 ? (s = o, o = 0) : s = n(s), a = a === void 0 ? o < s ? 1 : -1 : n(a), t(o, s, a, i);
    };
  }
  return Gu = r, Gu;
}
var Yu, d0;
function rM() {
  if (d0) return Yu;
  d0 = 1;
  var t = nM(), e = t();
  return Yu = e, Yu;
}
var iM = rM();
const Yi = /* @__PURE__ */ Ni(iM), kn = '<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">', oM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${kn}<rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/><path d="M15.75 4h-1.5a.25.25 0 0 0-.177.074L9.308 8.838a3.75 3.75 0 1 0 1.854 1.854l1.155-1.157.967.322a.5.5 0 0 0 .65-.55l-.18-1.208.363-.363.727.331a.5.5 0 0 0 .69-.59l-.254-.904.647-.647A.25.25 0 0 0 16 5.75v-1.5a.25.25 0 0 0-.25-.25zM7.5 13.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z" fill="${e}"/></svg>`;
}, sM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${kn}<rect x="2" y="2" width="16" height="16" rx="4" fill="${n}"/><path d="m12.223 13.314 3.052-2.826a.65.65 0 0 0 0-.984l-3.052-2.822c-.27-.25-.634-.242-.865.022-.232.263-.206.636.056.882l2.601 2.41-2.601 2.41c-.262.245-.288.619-.056.882.231.263.595.277.865.026Zm-4.444.005c.266.25.634.241.866-.027.231-.263.206-.636-.06-.882L5.983 10l2.602-2.405c.266-.25.291-.62.06-.887-.232-.263-.596-.272-.866-.022L4.723 9.51a.653.653 0 0 0 0 .983l3.056 2.827Z" fill="${e}"/></svg>`;
}, aM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
    <path d="M16.22 2H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.77-.8 1.77-1.78L18 3.78C18 2.8 17.2 2 16.22 2z" fill="${n}"/>
    <path d="M6.52 12.78H5.51V8.74l-1.33.47v-.87l2.29-.83h.05v5.27zm5.2 0H8.15v-.69l1.7-1.83a6.38 6.38 0 0 0 .34-.4c.09-.11.16-.22.22-.32s.1-.19.12-.27a.9.9 0 0 0 0-.56.63.63 0 0 0-.15-.23.58.58 0 0 0-.22-.15.75.75 0 0 0-.29-.05c-.27 0-.48.08-.62.23a.95.95 0 0 0-.2.65H8.03c0-.24.04-.46.13-.67a1.67 1.67 0 0 1 .97-.91c.23-.1.49-.14.77-.14.26 0 .5.04.7.11.21.08.38.18.52.32.14.13.25.3.32.48a1.74 1.74 0 0 1 .03 1.13 2.05 2.05 0 0 1-.24.47 4.16 4.16 0 0 1-.35.47l-.47.5-1 1.05h2.32v.8zm1.8-3.08h.55c.28 0 .48-.06.61-.2a.76.76 0 0 0 .2-.55.8.8 0 0 0-.05-.28.56.56 0 0 0-.13-.22.6.6 0 0 0-.23-.15.93.93 0 0 0-.32-.05.92.92 0 0 0-.29.05.72.72 0 0 0-.23.12.57.57 0 0 0-.21.46H12.4a1.3 1.3 0 0 1 .5-1.04c.15-.13.33-.23.54-.3a2.48 2.48 0 0 1 1.4 0c.2.06.4.15.55.28.15.13.27.28.36.47.08.19.13.4.13.65a1.15 1.15 0 0 1-.2.65 1.36 1.36 0 0 1-.58.49c.15.05.28.12.38.2a1.14 1.14 0 0 1 .43.62c.03.13.05.26.05.4 0 .25-.05.47-.14.66a1.42 1.42 0 0 1-.4.49c-.16.13-.35.23-.58.3a2.51 2.51 0 0 1-.73.1c-.22 0-.44-.03-.65-.09a1.8 1.8 0 0 1-.57-.28 1.43 1.43 0 0 1-.4-.47 1.41 1.41 0 0 1-.15-.66h1a.66.66 0 0 0 .22.5.87.87 0 0 0 .58.2c.25 0 .45-.07.6-.2a.71.71 0 0 0 .21-.56.97.97 0 0 0-.06-.36.61.61 0 0 0-.18-.25.74.74 0 0 0-.28-.15 1.33 1.33 0 0 0-.37-.04h-.55V9.7z" fill="${e}"/>
  </svg>`;
}, lM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${n}"/>
  <path d="M8.182 12.4h3.636l.655 1.6H14l-3.454-8H9.455L6 14h1.527l.655-1.6zM10 7.44l1.36 3.651H8.64L10 7.441z" fill="${e}"/>
</svg>`;
}, cM = (t) => {
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
}, E1 = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
<path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${n}"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.29 4.947a3.368 3.368 0 014.723.04 3.375 3.375 0 01.041 4.729l-.009.009-1.596 1.597a3.367 3.367 0 01-5.081-.364.71.71 0 011.136-.85 1.95 1.95 0 002.942.21l1.591-1.593a1.954 1.954 0 00-.027-2.733 1.95 1.95 0 00-2.732-.027l-.91.907a.709.709 0 11-1.001-1.007l.915-.911.007-.007z" fill="${e}"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.55 8.678a3.368 3.368 0 015.082.364.71.71 0 01-1.136.85 1.95 1.95 0 00-2.942-.21l-1.591 1.593a1.954 1.954 0 00.027 2.733 1.95 1.95 0 002.73.028l.906-.906a.709.709 0 111.003 1.004l-.91.91-.008.01a3.368 3.368 0 01-4.724-.042 3.375 3.375 0 01-.041-4.728l.009-.009L6.55 8.678z" fill="${e}"/>
</svg>
  `;
}, uM = (t) => {
  const e = t.bgColor;
  return `${kn}
    <path stroke="${e}" stroke-width="2" d="M12 3v14"/>
    <path stroke="${e}" stroke-width="2" stroke-linecap="round" d="M10 4h4m-4 12h4"/>
    <path d="M11 14h4a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-4v2h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4v2ZM9.5 8H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h4.5v2H5a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h4.5v2Z" fill="${e}"/>
  </svg>
`;
}, dM = E1, fM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${n}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M7 13.138a.5.5 0 00.748.434l5.492-3.138a.5.5 0 000-.868L7.748 6.427A.5.5 0 007 6.862v6.276z" fill="${e}"/>
</svg>`;
}, hM = (t) => {
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
}, pM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${n}"/>
  <path opacity=".5" fill-rule="evenodd" clip-rule="evenodd" d="M12.499 10.801a.5.5 0 01.835 0l2.698 4.098a.5.5 0 01-.418.775H10.22a.5.5 0 01-.417-.775l2.697-4.098z" fill="${e}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.07 8.934a.5.5 0 01.824 0l4.08 5.958a.5.5 0 01-.412.782h-8.16a.5.5 0 01-.413-.782l4.08-5.958zM13.75 8.333a2.083 2.083 0 100-4.166 2.083 2.083 0 000 4.166z" fill="${e}"/>
</svg>`;
}, gM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${kn}
    <path fill="${e}" d="M3 3h14v14H3z"/>
    <path d="M16.22 2H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.77-.8 1.77-1.78L18 3.78C18 2.8 17.2 2 16.22 2zm-7.24 9.78h1.23c.15 0 .27.06.36.18l.98 1.28a.43.43 0 0 1-.05.58l-1.2 1.21a.45.45 0 0 1-.6.04A6.72 6.72 0 0 1 7.33 10c0-.61.1-1.2.25-1.78a6.68 6.68 0 0 1 2.12-3.3.44.44 0 0 1 .6.04l1.2 1.2c.16.17.18.42.05.59l-.98 1.29a.43.43 0 0 1-.36.17H8.98A5.38 5.38 0 0 0 8.67 10c0 .62.11 1.23.3 1.79z" fill="${n}"/>
  </svg>`;
}, mM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${kn}
    <path d="M16.22 2H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.77-.8 1.77-1.78L18 3.78C18 2.8 17.2 2 16.22 2z" fill="${n}"/>
    <path d="m13.49 13.15-2.32-3.27h1.4V7h1.86v2.88h1.4l-2.34 3.27zM11 13H9v-3l-1.5 1.92L6 10v3H4V7h2l1.5 2L9 7h2v6z" fill="${e}"/>
  </svg>`;
}, yM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${n}"/>
  <path d="M14.8 4.182h-.6V3H13v1.182H7V3H5.8v1.182h-.6c-.66 0-1.2.532-1.2 1.182v9.454C4 15.468 4.54 16 5.2 16h9.6c.66 0 1.2-.532 1.2-1.182V5.364c0-.65-.54-1.182-1.2-1.182zm0 10.636H5.2V7.136h9.6v7.682z" fill="${e}"/>
</svg>`;
}, bM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${kn}
    <path d="M16.22 2H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.77-.8 1.77-1.78L18 3.78C18 2.8 17.2 2 16.22 2z" fill="${n}"/>
    <path d="M10 4a6 6 0 0 0-6 6 6 6 0 0 0 6 6 6 6 0 0 0 6-6 6 6 0 0 0-6-6zm0 10.8A4.8 4.8 0 0 1 5.2 10a4.8 4.8 0 1 1 4.8 4.8z" fill="${e}"/>
    <path d="M10 7H9v3.93L12.5 13l.5-.8-3-1.76V7z" fill="${e}"/>
  </svg>`;
}, vM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 8.643a1.357 1.357 0 100 2.714 1.357 1.357 0 000-2.714zM7.357 10a2.643 2.643 0 115.286 0 2.643 2.643 0 01-5.286 0z" fill="${e}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.589 4.898A5.643 5.643 0 0115.643 10v.5a2.143 2.143 0 01-4.286 0V8a.643.643 0 011.286 0v2.5a.857.857 0 001.714 0V10a4.357 4.357 0 10-1.708 3.46.643.643 0 01.782 1.02 5.643 5.643 0 11-5.842-9.582z" fill="${e}"/>
</svg>`;
}, wM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${kn}
    <rect x="2" y="8" width="10" height="8" rx="2" fill="${n}"/>
    <rect x="8" y="4" width="10" height="8" rx="2" fill="${n}"/>
    <path d="M10.68 7.73V6l2.97 3.02-2.97 3.02v-1.77c-2.13 0-3.62.7-4.68 2.2.43-2.15 1.7-4.31 4.68-4.74z" fill="${e}"/>
  </svg>`;
}, xM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
  <path fill="${e}" d="M4 3h12v14H4z"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.6 2A1.6 1.6 0 002 3.6v12.8A1.6 1.6 0 003.6 18h12.8a1.6 1.6 0 001.6-1.6V3.6A1.6 1.6 0 0016.4 2H3.6zm11.3 10.8a.7.7 0 01.7.7v1.4a.7.7 0 01-.7.7h-1.4a.7.7 0 01-.7-.7v-1.4a.7.7 0 01.6-.693.117.117 0 00.1-.115V10.35a.117.117 0 00-.117-.116h-2.8a.117.117 0 00-.117.116v2.333c0 .064.053.117.117.117h.117a.7.7 0 01.7.7v1.4a.7.7 0 01-.7.7H9.3a.7.7 0 01-.7-.7v-1.4a.7.7 0 01.7-.7h.117a.117.117 0 00.117-.117V10.35a.117.117 0 00-.117-.117h-2.8a.117.117 0 00-.117.117v2.342c0 .058.042.106.1.115a.7.7 0 01.6.693v1.4a.7.7 0 01-.7.7H5.1a.7.7 0 01-.7-.7v-1.4a.7.7 0 01.7-.7h.35a.116.116 0 00.116-.117v-2.45c0-.515.418-.933.934-.933h2.917a.117.117 0 00.117-.117V6.85a.117.117 0 00-.117-.116h-2.45a.7.7 0 01-.7-.7V5.1a.7.7 0 01.7-.7h6.067a.7.7 0 01.7.7v.934a.7.7 0 01-.7.7h-2.45a.117.117 0 00-.118.116v2.333c0 .064.053.117.117.117H13.5c.516 0 .934.418.934.934v2.45c0 .063.052.116.116.116h.35z" fill="${n}"/>
</svg>`;
}, kM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${kn}
    <rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/>
    <path d="M9.98 13.33c.45 0 .74-.3.73-.75l-.01-.1-.16-1.67 1.45 1.05a.81.81 0 0 0 .5.18c.37 0 .72-.32.72-.76 0-.3-.17-.54-.49-.68l-1.63-.77 1.63-.77c.32-.14.49-.37.49-.67 0-.45-.34-.76-.71-.76a.81.81 0 0 0-.5.18l-1.47 1.03.16-1.74.01-.08c.01-.46-.27-.76-.72-.76-.46 0-.76.32-.75.76l.01.08.16 1.74-1.47-1.03a.77.77 0 0 0-.5-.18.74.74 0 0 0-.72.76c0 .3.17.53.49.67l1.63.77-1.62.77c-.32.14-.5.37-.5.68 0 .44.35.75.72.75a.78.78 0 0 0 .5-.17L9.4 10.8l-.16 1.68v.09c-.02.44.28.75.74.75z" fill="${e}"/>
  </svg>`;
}, SM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${kn}
    <rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/>
    <path d="M8 5.83H5.83a.83.83 0 0 0 0 1.67h1.69A4.55 4.55 0 0 1 8 5.83zm-.33 3.34H5.83a.83.83 0 0 0 0 1.66h2.72a4.57 4.57 0 0 1-.88-1.66zM5.83 12.5a.83.83 0 0 0 0 1.67h7.5a.83.83 0 1 0 0-1.67h-7.5zm8.8-2.9a3.02 3.02 0 0 0 .46-1.6c0-1.66-1.32-3-2.94-3C10.52 5 9.2 6.34 9.2 8s1.31 3 2.93 3c.58 0 1.11-.17 1.56-.47l2.04 2.08.93-.94-2.04-2.08zm-2.48.07c-.9 0-1.63-.75-1.63-1.67s.73-1.67 1.63-1.67c.9 0 1.63.75 1.63 1.67s-.73 1.67-1.63 1.67z" fill="${e}"/>
  </svg>`;
}, CM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/>
  <path d="M7.676 4.726V3l2.976 3.021-2.976 3.022v-1.77c-2.125 0-3.613.69-4.676 2.201.425-2.158 1.7-4.316 4.676-4.748zM10.182 14.4h3.636l.655 1.6H16l-3.454-8h-1.091L8 16h1.527l.655-1.6zM12 9.44l1.36 3.65h-2.72L12 9.44z" fill="${e}"/>
</svg>`;
}, RM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.167 5.417a.833.833 0 100 1.666h4.166a.833.833 0 100-1.666H4.167z" fill="${e}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.083 4.167a.833.833 0 10-1.666 0v4.166a.833.833 0 101.666 0V4.167zM11.667 5.417a.833.833 0 100 1.666h4.166a.833.833 0 100-1.666h-4.166zM5.367 11.688a.833.833 0 00-1.179 1.179l2.947 2.946a.833.833 0 001.178-1.178l-2.946-2.947z" fill="${e}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.313 12.867a.833.833 0 10-1.178-1.179l-2.947 2.947a.833.833 0 101.179 1.178l2.946-2.946z" fill="${e}"/>
  <path d="M10.833 12.5c0-.46.373-.833.834-.833h4.166a.833.833 0 110 1.666h-4.166a.833.833 0 01-.834-.833zM10.833 15c0-.46.373-.833.834-.833h4.166a.833.833 0 110 1.666h-4.166a.833.833 0 01-.834-.833z" fill="${e}"/>
</svg>`;
}, TM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${kn}
    <path d="M16.22 2H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.77-.8 1.77-1.78L18 3.78C18 2.8 17.2 2 16.22 2z" fill="${n}"/>
    <path d="M10 8.84a1.16 1.16 0 1 0 0 2.32 1.16 1.16 0 0 0 0-2.32zm3.02 3.61a3.92 3.92 0 0 0 .78-3.28.49.49 0 1 0-.95.2c.19.87-.02 1.78-.58 2.47a2.92 2.92 0 1 1-4.13-4.08 2.94 2.94 0 0 1 2.43-.62.49.49 0 1 0 .17-.96 3.89 3.89 0 1 0 2.28 6.27zM10 4.17a5.84 5.84 0 0 0-5.44 7.93.49.49 0 1 0 .9-.35 4.86 4.86 0 1 1 2.5 2.67.49.49 0 1 0-.4.88c.76.35 1.6.54 2.44.53a5.83 5.83 0 0 0 0-11.66zm3.02 3.5a.7.7 0 1 0-1.4 0 .7.7 0 0 0 1.4 0zm-6.97 5.35a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4z" fill="${e}"/>
  </svg>`;
}, EM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/>
  <path d="M12.4 13.565c1.865-.545 3.645-2.083 3.645-4.396 0-1.514-.787-2.604-2.071-2.604C12.69 6.565 12 7.63 12 8.939c1.114.072 1.865.726 1.865 1.683 0 .933-.8 1.647-1.84 2.023l.375.92zM4 5h6v2H4zM4 9h5v2H4zM4 13h4v2H4z" fill="${e}"/>
</svg>`;
}, MM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${kn}
    <rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/>
    <path d="M12.4 13.56c1.86-.54 3.65-2.08 3.65-4.4 0-1.5-.8-2.6-2.08-2.6S12 7.64 12 8.95c1.11.07 1.86.73 1.86 1.68 0 .94-.8 1.65-1.83 2.03l.37.91zM4 5h6v2H4zm0 4h5v2H4zm0 4h4v2H4z" fill="${e}"/>
  </svg>`;
}, IM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${n}"/>
  <path d="M10 7a1 1 0 100-2v2zm0 6a1 1 0 100 2v-2zm0-8H7v2h3V5zm-3 6h5V9H7v2zm5 2h-2v2h2v-2zm1-1a1 1 0 01-1 1v2a3 3 0 003-3h-2zm-1-1a1 1 0 011 1h2a3 3 0 00-3-3v2zM4 8a3 3 0 003 3V9a1 1 0 01-1-1H4zm3-3a3 3 0 00-3 3h2a1 1 0 011-1V5z" fill="${e}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.856 12.014a.5.5 0 00-.712.702L5.409 14l-1.265 1.284a.5.5 0 00.712.702l1.255-1.274 1.255 1.274a.5.5 0 00.712-.702L6.813 14l1.265-1.284a.5.5 0 00-.712-.702L6.11 13.288l-1.255-1.274zM12.856 4.014a.5.5 0 00-.712.702L13.409 6l-1.265 1.284a.5.5 0 10.712.702l1.255-1.274 1.255 1.274a.5.5 0 10.712-.702L14.813 6l1.265-1.284a.5.5 0 00-.712-.702L14.11 5.288l-1.255-1.274z" fill="${e}"/>
</svg>`;
}, AM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M14.25 7.25a.75.75 0 000-1.5h-6.5a.75.75 0 100 1.5h6.5zM15 10a.75.75 0 01-.75.75h-6.5a.75.75 0 010-1.5h6.5A.75.75 0 0115 10zm-.75 4.25a.75.75 0 000-1.5h-6.5a.75.75 0 000 1.5h6.5zm-8.987-7a.75.75 0 100-1.5.75.75 0 000 1.5zm.75 2.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm-.75 4.25a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="${e}"/>
</svg>`;
}, _M = (t) => {
  const e = t.fgColor;
  return `
    <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 15v1h14v-2.5c0-.87-.44-1.55-.98-2.04a6.19 6.19 0 0 0-1.9-1.14 12.1 12.1 0 0 0-2.48-.67A4 4 0 1 0 5 6a4 4 0 0 0 2.36 3.65c-.82.13-1.7.36-2.48.67-.69.28-1.37.65-1.9 1.13A2.8 2.8 0 0 0 2 13.5V15z" fill="${t.bgColor}" stroke="${e}" stroke-width="2"/>
  </svg>`;
}, PM = (t) => {
  const e = t.fgColor;
  return `
    <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.43 6.04v-.18a3.86 3.86 0 0 0-7.72 0v.18A2.15 2.15 0 0 0 3 8.14v5.72C3 15.04 3.96 16 5.14 16H12c1.18 0 2.14-.96 2.14-2.14V8.14c0-1.03-.73-1.9-1.71-2.1zM7.86 6v-.14a.71.71 0 1 1 1.43 0V6H7.86z" fill="${t.bgColor}" stroke="${e}" stroke-width="2"/>
  </svg>
`;
}, DM = {
  headerRowID: oM,
  headerNumber: aM,
  headerCode: sM,
  headerString: lM,
  headerBoolean: cM,
  headerAudioUri: dM,
  headerVideoUri: fM,
  headerEmoji: hM,
  headerImage: pM,
  headerUri: E1,
  headerPhone: gM,
  headerMarkdown: mM,
  headerDate: yM,
  headerTime: bM,
  headerEmail: vM,
  headerReference: wM,
  headerIfThenElse: xM,
  headerSingleValue: kM,
  headerLookup: SM,
  headerTextTemplate: CM,
  headerMath: RM,
  headerRollup: TM,
  headerJoinStrings: EM,
  headerSplitString: MM,
  headerGeoDistance: IM,
  headerArray: AM,
  rowOwnerOverlay: _M,
  protectedColumnOverlay: PM,
  renameIcon: uM
};
function NM(t, e) {
  return t === "normal" ? [e.bgIconHeader, e.fgIconHeader] : t === "selected" ? ["white", e.accentColor] : [e.accentColor, e.bgHeader];
}
class OM {
  constructor(e, n) {
    Qe(this, "onSettled");
    Qe(this, "spriteMap", /* @__PURE__ */ new Map());
    Qe(this, "headerIcons");
    Qe(this, "inFlight", 0);
    this.onSettled = n, this.headerIcons = e ?? {};
  }
  drawSprite(e, n, r, i, o, s, a, l = 1) {
    const [c, u] = NM(n, a), d = s * Math.ceil(window.devicePixelRatio), f = `${c}_${u}_${d}_${e}`;
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
function M1(t) {
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
function I1(t, e, n, r, i) {
  let o = 0, s = 0;
  for (let a = 0; a < t.length; a++) {
    const l = t[a];
    let c = a + 1, u = l.width;
    for (l.sticky && (s += u); c < t.length && Ns(t[c].group, l.group) && t[c].sticky === t[a].sticky; ) {
      const g = t[c];
      u += g.width, c++, a++, g.sticky && (s += g.width);
    }
    const d = l.sticky ? 0 : n, f = o + d, h = l.sticky ? 0 : Math.max(0, s - f), p = Math.min(u - h, e - (f + h));
    i([l.sourceIndex, t[c - 1].sourceIndex], l.group ?? "", f + h, 0, p, r), o += u;
  }
}
function A1(t, e, n, r, i, o, s) {
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
function zM(t, e, n, r) {
  if (r === "any")
    return _1(t, { x: e, y: n, width: 1, height: 1 });
  if (r === "vertical" && (e = t.x), r === "horizontal" && (n = t.y), f1([e, n], t))
    return;
  const i = e - t.x, o = t.x + t.width - e, s = n - t.y + 1, a = t.y + t.height - n, l = Math.min(r === "vertical" ? Number.MAX_SAFE_INTEGER : i, r === "vertical" ? Number.MAX_SAFE_INTEGER : o, r === "horizontal" ? Number.MAX_SAFE_INTEGER : s, r === "horizontal" ? Number.MAX_SAFE_INTEGER : a);
  return l === a ? { x: t.x, y: t.y + t.height, width: t.width, height: n - t.y - t.height + 1 } : l === s ? { x: t.x, y: n, width: t.width, height: t.y - n } : l === o ? { x: t.x + t.width, y: t.y, width: e - t.x - t.width + 1, height: t.height } : { x: e, y: t.y, width: t.x - e, height: t.height };
}
function Os(t, e, n, r, i, o, s, a) {
  return t <= i + s && i <= t + n && e <= o + a && o <= e + r;
}
function Qi(t, e, n) {
  return e >= t.x && e <= t.x + t.width && n >= t.y && n <= t.y + t.height;
}
function _1(t, e) {
  const n = Math.min(t.x, e.x), r = Math.min(t.y, e.y), i = Math.max(t.x + t.width, e.x + e.width) - n, o = Math.max(t.y + t.height, e.y + e.height) - r;
  return { x: n, y: r, width: i, height: o };
}
function LM(t, e) {
  return t.x <= e.x && t.y <= e.y && t.x + t.width >= e.x + e.width && t.y + t.height >= e.y + e.height;
}
function $M(t, e, n, r) {
  if (t.x > e || t.y > n || t.x < 0 && t.y < 0 && t.x + t.width > e && t.y + t.height > n)
    return;
  if (t.x >= 0 && t.y >= 0 && t.x + t.width <= e && t.y + t.height <= n)
    return t;
  const i = -4, o = -4, s = e + 4, a = n + 4, l = i - t.x, c = t.x + t.width - s, u = o - t.y, d = t.y + t.height - a, f = l > 0 ? t.x + Math.floor(l / r) * r : t.x, h = c > 0 ? t.x + t.width - Math.floor(c / r) * r : t.x + t.width, p = u > 0 ? t.y + Math.floor(u / r) * r : t.y, g = d > 0 ? t.y + t.height - Math.floor(d / r) * r : t.y + t.height;
  return { x: f, y: p, width: h - f, height: g - p };
}
function FM(t, e, n, r, i) {
  const [o, s, a, l] = e, [c, u, d, f] = i, { x: h, y: p, width: g, height: y } = t, m = [];
  if (g <= 0 || y <= 0)
    return m;
  const b = h + g, C = p + y, E = h < o, v = p < s, T = h + g > a, D = p + y > l, P = h >= o && h < a || b > o && b <= a || h < o && b > a, k = p >= s && p < l || C > s && C <= l || p < s && C > l;
  if (P && k) {
    const S = Math.max(h, o), x = Math.max(p, s), I = Math.min(b, a), _ = Math.min(C, l);
    m.push({
      rect: { x: S, y: x, width: I - S, height: _ - x },
      clip: {
        x: c,
        y: u,
        width: d - c + 1,
        height: f - u + 1
      }
    });
  }
  if (E && v) {
    const S = h, x = p, I = Math.min(b, o), _ = Math.min(C, s);
    m.push({
      rect: {
        x: S,
        y: x,
        width: I - S,
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
    const S = Math.max(h, o), x = p, I = Math.min(b, a), _ = Math.min(C, s);
    m.push({
      rect: {
        x: S,
        y: x,
        width: I - S,
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
    const S = Math.max(h, a), x = p, I = b, _ = Math.min(C, s);
    m.push({
      rect: {
        x: S,
        y: x,
        width: I - S,
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
  if (E && k) {
    const S = h, x = Math.max(p, s), I = Math.min(b, o), _ = Math.min(C, l);
    m.push({
      rect: {
        x: S,
        y: x,
        width: I - S,
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
  if (T && k) {
    const S = Math.max(h, a), x = Math.max(p, s), I = b, _ = Math.min(C, l);
    m.push({
      rect: {
        x: S,
        y: x,
        width: I - S,
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
  if (E && D) {
    const S = h, x = Math.max(p, l), I = Math.min(b, o), _ = C;
    m.push({
      rect: {
        x: S,
        y: x,
        width: I - S,
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
    const S = Math.max(h, o), x = Math.max(p, l), I = Math.min(b, a), _ = C;
    m.push({
      rect: {
        x: S,
        y: x,
        width: I - S,
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
    const S = Math.max(h, a), x = Math.max(p, l), I = b, _ = C;
    m.push({
      rect: {
        x: S,
        y: x,
        width: I - S,
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
const HM = {
  kind: $e.Loading,
  allowOverlay: !1
};
function f0(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g, y, m, b, C, E, v, T, D, P, k, z, S, x, I, _, M, O, L, W) {
  let re = (C == null ? void 0 : C.size) ?? Number.MAX_SAFE_INTEGER;
  const F = performance.now();
  let N = I.baseFontFull;
  t.font = N;
  const te = { ctx: t }, G = [0, 0], j = y > 0 ? uo(l, y, c) : 0;
  let ee, q;
  const Q = M1(b);
  return zi(e, a, o, s, i, (X, J, K, se, le) => {
    const Ce = Math.max(0, se - J), Re = J + Ce, Be = i + 1, rt = X.width - Ce, mt = r - i - 1;
    if (b.length > 0) {
      let ze = !1;
      for (let Je = 0; Je < b.length; Je++) {
        const gt = b[Je];
        if (Os(Re, Be, rt, mt, gt.x, gt.y, gt.width, gt.height)) {
          ze = !0;
          break;
        }
      }
      if (!ze)
        return;
    }
    const ut = () => {
      t.save(), t.beginPath(), t.rect(Re, Be, rt, mt), t.clip();
    }, ne = E.columns.hasIndex(X.sourceIndex), _e = d(X.group ?? "").overrideTheme, Ae = X.themeOverride === void 0 && _e === void 0 ? I : fi(I, _e, X.themeOverride), Ke = Ae.baseFontFull;
    Ke !== N && (N = Ke, t.font = Ke), ut();
    let Fe;
    return Rl(le, K, r, l, c, y, m, Q, (ze, Je, gt, Se, Ve) => {
      var Ue, zt, tn;
      if (Je < 0 || (G[0] = X.sourceIndex, G[1] = Je, C !== void 0 && !C.has(G)))
        return;
      if (b.length > 0) {
        let bt = !1;
        for (let Z = 0; Z < b.length; Z++) {
          const xe = b[Z];
          if (Os(J, ze, X.width, gt, xe.x, xe.y, xe.width, xe.height)) {
            bt = !0;
            break;
          }
        }
        if (!bt)
          return;
      }
      const kt = E.rows.hasIndex(Je), yt = h.hasIndex(Je), et = Je < l ? u(G) : HM;
      let Ct = J, dt = X.width, ft = !1, Ot = !1;
      if (et.span !== void 0) {
        const [bt, Z] = et.span, xe = `${Je},${bt},${Z},${X.sticky}`;
        if (q === void 0 && (q = /* @__PURE__ */ new Set()), q.has(xe)) {
          re--;
          return;
        } else {
          const Te = A1(et.span, J, ze, X.width, gt, X, n), Ze = X.sticky ? Te[0] : Te[1];
          if (!X.sticky && Te[0] !== void 0 && (Ot = !0), Ze !== void 0) {
            Ct = Ze.x, dt = Ze.width, q.add(xe), t.restore(), Fe = void 0, t.save(), t.beginPath();
            const vt = Math.max(0, se - Ze.x);
            t.rect(Ze.x + vt, ze, Ze.width - vt, gt), ee === void 0 && (ee = []), ee.push({
              x: Ze.x + vt,
              y: ze,
              width: Ze.width - vt,
              height: gt
            }), t.clip(), ft = !0;
          }
        }
      }
      const pe = f == null ? void 0 : f(Je), ke = Ve && ((Ue = X.trailingRowOptions) == null ? void 0 : Ue.themeOverride) !== void 0 ? (zt = X.trailingRowOptions) == null ? void 0 : zt.themeOverride : void 0, ue = et.themeOverride === void 0 && pe === void 0 && ke === void 0 ? Ae : fi(Ae, pe, ke, et.themeOverride);
      t.beginPath();
      const ye = gE(G, et, E);
      let He = mE(G, et, E, g);
      const Rt = et.span !== void 0 && E.columns.some(
        (bt) => et.span !== void 0 && bt >= et.span[0] && bt <= et.span[1]
        //alloc
      );
      ye && !p && g ? He = 0 : ye && g && (He = Math.max(He, 1)), Rt && He++, ye || (kt && He++, ne && !Ve && He++);
      const Pt = et.kind === $e.Protected ? ue.bgCellMedium : ue.bgCell;
      let it;
      if ((Se || Pt !== I.bgCell) && (it = yr(Pt, it)), He > 0 || yt) {
        yt && (it = yr(ue.bgHeader, it));
        for (let bt = 0; bt < He; bt++)
          it = yr(ue.accentLight, it);
      } else if (v !== void 0) {
        for (const bt of v)
          if (bt[0] === X.sourceIndex && bt[1] === Je) {
            it = yr(ue.bgSearchResult, it);
            break;
          }
      }
      if (T !== void 0)
        for (let bt = 0; bt < T.length; bt++) {
          const Z = T[bt], xe = Z.range;
          Z.style !== "solid-outline" && xe.x <= X.sourceIndex && X.sourceIndex < xe.x + xe.width && xe.y <= Je && Je < xe.y + xe.height && (it = yr(Z.color, it));
        }
      let sn = !1;
      if (C !== void 0) {
        const bt = ze + 1, xe = (Se ? bt + gt - 1 : Math.min(bt + gt - 1, r - j)) - bt;
        (xe !== gt - 1 || Ct + 1 <= se) && (sn = !0, t.save(), t.beginPath(), t.rect(Ct + 1, bt, dt - 1, xe), t.clip()), it = it === void 0 ? ue.bgCell : yr(it, ue.bgCell);
      }
      const he = X.sourceIndex === n.length - 1, we = Je === l - 1;
      it !== void 0 && (t.fillStyle = it, Fe !== void 0 && (Fe.fillStyle = it), C !== void 0 ? t.fillRect(Ct + 1, ze + 1, dt - (he ? 2 : 1), gt - (we ? 2 : 1)) : t.fillRect(Ct, ze, dt, gt)), et.style === "faded" && (t.globalAlpha = 0.6);
      let qe;
      for (let bt = 0; bt < k.length; bt++) {
        const Z = k[bt];
        if (Z.item[0] === X.sourceIndex && Z.item[1] === Je) {
          qe = Z;
          break;
        }
      }
      if (dt > W && !Ot) {
        const bt = ue.baseFontFull;
        bt !== N && (t.font = bt, N = bt), Fe = P1(t, et, X.sourceIndex, Je, he, we, Ct, ze, dt, gt, He > 0, ue, it ?? ue.bgCell, D, P, (qe == null ? void 0 : qe.hoverAmount) ?? 0, z, x, F, S, Fe, _, M, O, L);
      }
      return sn && t.restore(), et.style === "faded" && (t.globalAlpha = 1), re--, ft && (t.restore(), (tn = Fe == null ? void 0 : Fe.deprep) == null || tn.call(Fe, te), Fe = void 0, ut(), N = Ke, t.font = Ke), re <= 0;
    }), t.restore(), re <= 0;
  }), ee;
}
const us = [0, 0], ds = { x: 0, y: 0, width: 0, height: 0 }, Xu = [void 0, () => {
}];
let _f = !1;
function BM() {
  _f = !0;
}
function P1(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g, y, m, b, C, E, v, T, D, P) {
  var M, O;
  let k, z;
  y !== void 0 && y[0][0] === n && y[0][1] === r && (k = y[1][0], z = y[1][1]);
  let S;
  us[0] = n, us[1] = r, ds.x = s, ds.y = a, ds.width = l, ds.height = c, Xu[0] = T.getValue(us), Xu[1] = (L) => T.setValue(us, L), _f = !1;
  const x = {
    //alloc
    ctx: t,
    theme: d,
    col: n,
    row: r,
    cell: e,
    rect: ds,
    highlighted: u,
    cellFillColor: f,
    hoverAmount: g,
    frameTime: b,
    hoverX: k,
    drawState: Xu,
    hoverY: z,
    imageLoader: h,
    spriteManager: p,
    hyperWrapping: m,
    overrideCursor: k !== void 0 ? P : void 0,
    requestAnimationFrame: BM
  }, I = kE(x, e.lastUpdated, b, E, i, o), _ = D(e);
  if (_ !== void 0) {
    (E == null ? void 0 : E.renderer) !== _ && ((M = E == null ? void 0 : E.deprep) == null || M.call(E, x), E = void 0);
    const L = (O = _.drawPrep) == null ? void 0 : O.call(_, x, E);
    C !== void 0 && !_o(x.cell) ? C(x, () => _.draw(x, e)) : _.draw(x, e), S = L === void 0 ? void 0 : {
      deprep: L == null ? void 0 : L.deprep,
      fillStyle: L == null ? void 0 : L.fillStyle,
      font: L == null ? void 0 : L.font,
      renderer: _
    };
  }
  return (I || _f) && (v == null || v(us)), S;
}
function Oh(t, e, n, r, i, o, s, a, l = -20, c = -20, u = void 0, d = "center", f = "square") {
  const h = Math.floor(i + s / 2), p = f === "circle" ? 1e4 : e.roundingRadius ?? 4;
  let g = Zv(u ?? e.checkboxMaxSize, s, e.cellVerticalPadding), y = g / 2;
  const m = Jv(d, r, o, e.cellHorizontalPadding, g), b = Vv(m, h, g), C = Qv(r + l, i + c, b);
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
    case hh: {
      t.beginPath(), ei(t, m - g / 2, h - g / 2, g, g, p), t.fillStyle = C ? e.textMedium : e.textLight, t.fill(), f === "circle" && (y *= 0.8, g *= 0.8), t.beginPath(), t.moveTo(m - g / 3, h), t.lineTo(m + g / 3, h), t.strokeStyle = e.bgCell, t.lineCap = "round", t.lineWidth = 1.9, t.stroke();
      break;
    }
    default:
      Ds();
  }
}
function qM(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g, y, m, b) {
  var k, z, S, x;
  const C = s + a;
  if (C <= 0)
    return;
  t.fillStyle = d.bgHeader, t.fillRect(0, 0, i, C);
  const E = (k = r == null ? void 0 : r[0]) == null ? void 0 : k[0], v = (z = r == null ? void 0 : r[0]) == null ? void 0 : z[1], T = (S = r == null ? void 0 : r[1]) == null ? void 0 : S[0], D = (x = r == null ? void 0 : r[1]) == null ? void 0 : x[1], P = d.headerFontFull;
  t.font = P, zi(e, 0, o, 0, C, (I, _, M, O) => {
    var X;
    if (y !== void 0 && !y.has([I.sourceIndex, -1]))
      return;
    const L = Math.max(0, O - _);
    t.save(), t.beginPath(), t.rect(_ + L, a, I.width - L, s), t.clip();
    const W = g(I.group ?? "").overrideTheme, re = I.themeOverride === void 0 && W === void 0 ? d : fi(d, W, I.themeOverride);
    re.bgHeader !== d.bgHeader && (t.fillStyle = re.bgHeader, t.fill()), re !== d && (t.font = re.headerFontFull);
    const F = u.columns.hasIndex(I.sourceIndex), N = l !== void 0 || c || I.headerRowMarkerDisabled === !0, te = !N && v === -1 && E === I.sourceIndex, G = N ? 0 : ((X = h.find((J) => J.item[0] === I.sourceIndex && J.item[1] === -1)) == null ? void 0 : X.hoverAmount) ?? 0, j = (u == null ? void 0 : u.current) !== void 0 && u.current.cell[0] === I.sourceIndex, ee = F ? re.accentColor : j ? re.bgHeaderHasFocus : re.bgHeader, q = n ? a : 0, Q = I.sourceIndex === 0 ? 0 : 1;
    F ? (t.fillStyle = ee, t.fillRect(_ + Q, q, I.width - Q, s)) : (j || G > 0) && (t.beginPath(), t.rect(_ + Q, q, I.width - Q, s), j && (t.fillStyle = re.bgHeaderHasFocus, t.fill()), G > 0 && (t.globalAlpha = G, t.fillStyle = re.bgHeaderHovered, t.fill(), t.globalAlpha = 1)), O1(t, _, q, I.width, s, I, F, re, te, te ? T : void 0, te ? D : void 0, j, G, f, m, b), t.restore();
  }), n && WM(t, e, i, o, a, r, d, f, h, p, g, y);
}
function WM(t, e, n, r, i, o, s, a, l, c, u, d) {
  const [h, p] = (o == null ? void 0 : o[0]) ?? [];
  let g = 0;
  I1(e, n, r, i, (y, m, b, C, E, v) => {
    if (d !== void 0 && !d.hasItemInRectangle({
      x: y[0],
      y: -2,
      width: y[1] - y[0] + 1,
      height: 1
    }))
      return;
    t.save(), t.beginPath(), t.rect(b, C, E, v), t.clip();
    const T = u(m), D = (T == null ? void 0 : T.overrideTheme) === void 0 ? s : fi(s, T.overrideTheme), P = p === -2 && h !== void 0 && h >= y[0] && h <= y[1], k = P ? D.bgGroupHeaderHovered ?? D.bgHeaderHovered : D.bgGroupHeader ?? D.bgHeader;
    if (k !== s.bgHeader && (t.fillStyle = k, t.fill()), t.fillStyle = D.textGroupHeader ?? D.textHeader, T !== void 0) {
      let z = b;
      if (T.icon !== void 0 && (a.drawSprite(T.icon, "normal", t, z + 8, (i - 20) / 2, 20, D), z += 26), t.fillText(T.name, z + 8, i / 2 + Oi(t, s.headerFontFull)), T.actions !== void 0 && P) {
        const S = D1({ x: b, y: C, width: E, height: v }, T.actions);
        t.beginPath();
        const x = S[0].x - 10, I = b + E - x;
        t.rect(x, 0, I, i);
        const _ = t.createLinearGradient(x, 0, x + I, 0), M = io(k, 0);
        _.addColorStop(0, M), _.addColorStop(10 / I, k), _.addColorStop(1, k), t.fillStyle = _, t.fill(), t.globalAlpha = 0.6;
        const [O, L] = (o == null ? void 0 : o[1]) ?? [-1, -1];
        for (let W = 0; W < T.actions.length; W++) {
          const re = T.actions[W], F = S[W], N = Qi(F, O + b, L);
          N && (t.globalAlpha = 1), a.drawSprite(re.icon, "normal", t, F.x + F.width / 2 - 10, F.y + F.height / 2 - 10, 20, D), N && (t.globalAlpha = 0.6);
        }
        t.globalAlpha = 1;
      }
    }
    b !== 0 && c(y[0]) && (t.beginPath(), t.moveTo(b + 0.5, 0), t.lineTo(b + 0.5, i), t.strokeStyle = s.borderColor, t.lineWidth = 1, t.stroke()), t.restore(), g = b + E;
  }), t.beginPath(), t.moveTo(g + 0.5, 0), t.lineTo(g + 0.5, i), t.moveTo(0, i + 0.5), t.lineTo(n, i + 0.5), t.strokeStyle = s.borderColor, t.lineWidth = 1, t.stroke();
}
const Ta = 30;
function jM(t, e, n, r, i) {
  return {
    x: t + n - Ta,
    // right align
    y: Math.max(e, e + r / 2 - Ta / 2),
    // center vertically
    width: Ta,
    height: Math.min(Ta, r)
  };
}
function D1(t, e) {
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
function fs(t, e, n) {
  return !n || t === void 0 || (t.x = e - (t.x - e) - t.width), t;
}
function N1(t, e, n, r, i, o, s, a) {
  var m;
  const l = s.cellHorizontalPadding, c = s.headerIconSize, u = jM(n, r, i, o);
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
    const b = t === void 0 ? ((m = m1(e.title, s.headerFontFull)) == null ? void 0 : m.width) ?? 0 : Ko(e.title, t, s.headerFontFull).width;
    p.width = b, d += b + l, g = {
      x: d,
      y: r + (o - c) / 2,
      width: c,
      height: c
    };
  }
  const y = n + i / 2;
  return {
    menuBounds: fs(u, y, a),
    iconBounds: fs(f, y, a),
    iconOverlayBounds: fs(h, y, a),
    textBounds: fs(p, y, a),
    indicatorIconBounds: fs(g, y, a)
  };
}
function h0(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g) {
  if (o.rowMarker !== void 0 && o.headerRowMarkerDisabled !== !0) {
    const b = o.rowMarkerChecked;
    b !== !0 && o.headerRowMarkerAlwaysVisible !== !0 && (t.globalAlpha = d);
    const C = o.headerRowMarkerTheme !== void 0 ? fi(a, o.headerRowMarkerTheme) : a;
    Oh(t, C, b, e, n, r, i, !1, void 0, void 0, a.checkboxMaxSize, "center", o.rowMarker), b !== !0 && o.headerRowMarkerAlwaysVisible !== !0 && (t.globalAlpha = 1);
    return;
  }
  const y = s ? a.textHeaderSelected : a.textHeader, m = o.hasMenu === !0 && (l || h && s) && g.menuBounds !== void 0;
  if (o.icon !== void 0 && g.iconBounds !== void 0) {
    let b = s ? "selected" : "normal";
    o.style === "highlight" && (b = s ? "selected" : "special"), f.drawSprite(o.icon, b, t, g.iconBounds.x, g.iconBounds.y, g.iconBounds.width, a), o.overlayIcon !== void 0 && g.iconOverlayBounds !== void 0 && f.drawSprite(o.overlayIcon, s ? "selected" : "special", t, g.iconOverlayBounds.x, g.iconOverlayBounds.y, g.iconOverlayBounds.width, a);
  }
  if (m && r > 35) {
    const C = p ? 35 : r - 35, E = p ? 35 * 0.7 : r - 35 * 0.7, v = C / r, T = E / r, D = t.createLinearGradient(e, 0, e + r, 0), P = io(y, 0);
    D.addColorStop(p ? 1 : 0, y), D.addColorStop(v, y), D.addColorStop(T, P), D.addColorStop(p ? 0 : 1, P), t.fillStyle = D;
  } else
    t.fillStyle = y;
  if (p && (t.textAlign = "right"), g.textBounds !== void 0 && t.fillText(o.title, p ? g.textBounds.x + g.textBounds.width : g.textBounds.x, n + i / 2 + Oi(t, a.headerFontFull)), p && (t.textAlign = "left"), o.indicatorIcon !== void 0 && g.indicatorIconBounds !== void 0 && (!m || !Os(g.menuBounds.x, g.menuBounds.y, g.menuBounds.width, g.menuBounds.height, g.indicatorIconBounds.x, g.indicatorIconBounds.y, g.indicatorIconBounds.width, g.indicatorIconBounds.height))) {
    let b = s ? "selected" : "normal";
    o.style === "highlight" && (b = s ? "selected" : "special"), f.drawSprite(o.indicatorIcon, b, t, g.indicatorIconBounds.x, g.indicatorIconBounds.y, g.indicatorIconBounds.width, a);
  }
  if (m && g.menuBounds !== void 0) {
    const b = g.menuBounds, C = c !== void 0 && u !== void 0 && Qi(b, c + e, u + n);
    if (C || (t.globalAlpha = 0.7), o.menuIcon === void 0 || o.menuIcon === Va.Triangle) {
      t.beginPath();
      const E = b.x + b.width / 2 - 5.5, v = b.y + b.height / 2 - 3;
      TE(t, [
        {
          x: E,
          y: v
        },
        {
          x: E + 11,
          y: v
        },
        {
          x: E + 5.5,
          y: v + 6
        }
      ], 1), t.fillStyle = y, t.fill();
    } else if (o.menuIcon === Va.Dots) {
      t.beginPath();
      const E = b.x + b.width / 2, v = b.y + b.height / 2;
      RE(t, E, v), t.fillStyle = y, t.fill();
    } else {
      const E = b.x + (b.width - a.headerIconSize) / 2, v = b.y + (b.height - a.headerIconSize) / 2;
      f.drawSprite(o.menuIcon, "normal", t, E, v, a.headerIconSize, a);
    }
    C || (t.globalAlpha = 1);
  }
}
function O1(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g) {
  const y = vh(o.title) === "rtl", m = N1(t, o, e, n, r, i, a, y);
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
  }, () => h0(t, e, n, r, i, o, s, a, l, c, u, f, h, g, y, m)) : h0(t, e, n, r, i, o, s, a, l, c, u, f, h, g, y, m);
}
var Vu, p0;
function KM() {
  if (p0) return Vu;
  p0 = 1;
  var t = lo(), e = (function() {
    try {
      var n = t(Object, "defineProperty");
      return n({}, "", {}), n;
    } catch {
    }
  })();
  return Vu = e, Vu;
}
var Ju, g0;
function UM() {
  if (g0) return Ju;
  g0 = 1;
  var t = KM();
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
var Zu, m0;
function GM() {
  if (m0) return Zu;
  m0 = 1;
  function t(e, n, r, i) {
    for (var o = -1, s = e == null ? 0 : e.length; ++o < s; ) {
      var a = e[o];
      n(i, a, r(a), e);
    }
    return i;
  }
  return Zu = t, Zu;
}
var Qu, y0;
function YM() {
  if (y0) return Qu;
  y0 = 1;
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
var ed, b0;
function XM() {
  if (b0) return ed;
  b0 = 1;
  var t = YM(), e = t();
  return ed = e, ed;
}
var td, v0;
function VM() {
  if (v0) return td;
  v0 = 1;
  function t(e, n) {
    for (var r = -1, i = Array(e); ++r < e; )
      i[r] = n(r);
    return i;
  }
  return td = t, td;
}
var ys = { exports: {} }, nd, w0;
function JM() {
  if (w0) return nd;
  w0 = 1;
  function t() {
    return !1;
  }
  return nd = t, nd;
}
ys.exports;
var x0;
function z1() {
  return x0 || (x0 = 1, (function(t, e) {
    var n = ii(), r = JM(), i = e && !e.nodeType && e, o = i && !0 && t && !t.nodeType && t, s = o && o.exports === i, a = s ? n.Buffer : void 0, l = a ? a.isBuffer : void 0, c = l || r;
    t.exports = c;
  })(ys, ys.exports)), ys.exports;
}
var rd, k0;
function ZM() {
  if (k0) return rd;
  k0 = 1;
  var t = qs(), e = fh(), n = Ws(), r = "[object Arguments]", i = "[object Array]", o = "[object Boolean]", s = "[object Date]", a = "[object Error]", l = "[object Function]", c = "[object Map]", u = "[object Number]", d = "[object Object]", f = "[object RegExp]", h = "[object Set]", p = "[object String]", g = "[object WeakMap]", y = "[object ArrayBuffer]", m = "[object DataView]", b = "[object Float32Array]", C = "[object Float64Array]", E = "[object Int8Array]", v = "[object Int16Array]", T = "[object Int32Array]", D = "[object Uint8Array]", P = "[object Uint8ClampedArray]", k = "[object Uint16Array]", z = "[object Uint32Array]", S = {};
  S[b] = S[C] = S[E] = S[v] = S[T] = S[D] = S[P] = S[k] = S[z] = !0, S[r] = S[i] = S[y] = S[o] = S[m] = S[s] = S[a] = S[l] = S[c] = S[u] = S[d] = S[f] = S[h] = S[p] = S[g] = !1;
  function x(I) {
    return n(I) && e(I.length) && !!S[t(I)];
  }
  return rd = x, rd;
}
var id, S0;
function QM() {
  if (S0) return id;
  S0 = 1;
  function t(e) {
    return function(n) {
      return e(n);
    };
  }
  return id = t, id;
}
var bs = { exports: {} };
bs.exports;
var C0;
function eI() {
  return C0 || (C0 = 1, (function(t, e) {
    var n = Nv(), r = e && !e.nodeType && e, i = r && !0 && t && !t.nodeType && t, o = i && i.exports === r, s = o && n.process, a = (function() {
      try {
        var l = i && i.require && i.require("util").types;
        return l || s && s.binding && s.binding("util");
      } catch {
      }
    })();
    t.exports = a;
  })(bs, bs.exports)), bs.exports;
}
var od, R0;
function L1() {
  if (R0) return od;
  R0 = 1;
  var t = ZM(), e = QM(), n = eI(), r = n && n.isTypedArray, i = r ? e(r) : t;
  return od = i, od;
}
var sd, T0;
function tI() {
  if (T0) return sd;
  T0 = 1;
  var t = VM(), e = uh(), n = ri(), r = z1(), i = dh(), o = L1(), s = Object.prototype, a = s.hasOwnProperty;
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
var ad, E0;
function nI() {
  if (E0) return ad;
  E0 = 1;
  var t = Object.prototype;
  function e(n) {
    var r = n && n.constructor, i = typeof r == "function" && r.prototype || t;
    return n === i;
  }
  return ad = e, ad;
}
var ld, M0;
function rI() {
  if (M0) return ld;
  M0 = 1;
  function t(e, n) {
    return function(r) {
      return e(n(r));
    };
  }
  return ld = t, ld;
}
var cd, I0;
function iI() {
  if (I0) return cd;
  I0 = 1;
  var t = rI(), e = t(Object.keys, Object);
  return cd = e, cd;
}
var ud, A0;
function oI() {
  if (A0) return ud;
  A0 = 1;
  var t = nI(), e = iI(), n = Object.prototype, r = n.hasOwnProperty;
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
var dd, _0;
function zh() {
  if (_0) return dd;
  _0 = 1;
  var t = tI(), e = oI(), n = Nh();
  function r(i) {
    return n(i) ? t(i) : e(i);
  }
  return dd = r, dd;
}
var fd, P0;
function sI() {
  if (P0) return fd;
  P0 = 1;
  var t = XM(), e = zh();
  function n(r, i) {
    return r && t(r, i, e);
  }
  return fd = n, fd;
}
var hd, D0;
function aI() {
  if (D0) return hd;
  D0 = 1;
  var t = Nh();
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
var pd, N0;
function lI() {
  if (N0) return pd;
  N0 = 1;
  var t = sI(), e = aI(), n = e(t);
  return pd = n, pd;
}
var gd, O0;
function cI() {
  if (O0) return gd;
  O0 = 1;
  var t = lI();
  function e(n, r, i, o) {
    return t(n, function(s, a, l) {
      r(o, s, i(s), l);
    }), o;
  }
  return gd = e, gd;
}
var md, z0;
function uI() {
  if (z0) return md;
  z0 = 1;
  var t = wl();
  function e() {
    this.__data__ = new t(), this.size = 0;
  }
  return md = e, md;
}
var yd, L0;
function dI() {
  if (L0) return yd;
  L0 = 1;
  function t(e) {
    var n = this.__data__, r = n.delete(e);
    return this.size = n.size, r;
  }
  return yd = t, yd;
}
var bd, $0;
function fI() {
  if ($0) return bd;
  $0 = 1;
  function t(e) {
    return this.__data__.get(e);
  }
  return bd = t, bd;
}
var vd, F0;
function hI() {
  if (F0) return vd;
  F0 = 1;
  function t(e) {
    return this.__data__.has(e);
  }
  return vd = t, vd;
}
var wd, H0;
function pI() {
  if (H0) return wd;
  H0 = 1;
  var t = wl(), e = lh(), n = ch(), r = 200;
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
var xd, B0;
function $1() {
  if (B0) return xd;
  B0 = 1;
  var t = wl(), e = uI(), n = dI(), r = fI(), i = hI(), o = pI();
  function s(a) {
    var l = this.__data__ = new t(a);
    this.size = l.size;
  }
  return s.prototype.clear = e, s.prototype.delete = n, s.prototype.get = r, s.prototype.has = i, s.prototype.set = o, xd = s, xd;
}
var kd, q0;
function gI() {
  if (q0) return kd;
  q0 = 1;
  function t(e, n) {
    for (var r = -1, i = e == null ? 0 : e.length; ++r < i; )
      if (n(e[r], r, e))
        return !0;
    return !1;
  }
  return kd = t, kd;
}
var Sd, W0;
function F1() {
  if (W0) return Sd;
  W0 = 1;
  var t = S1(), e = gI(), n = C1(), r = 1, i = 2;
  function o(s, a, l, c, u, d) {
    var f = l & r, h = s.length, p = a.length;
    if (h != p && !(f && p > h))
      return !1;
    var g = d.get(s), y = d.get(a);
    if (g && y)
      return g == a && y == s;
    var m = -1, b = !0, C = l & i ? new t() : void 0;
    for (d.set(s, a), d.set(a, s); ++m < h; ) {
      var E = s[m], v = a[m];
      if (c)
        var T = f ? c(v, E, m, a, s, d) : c(E, v, m, s, a, d);
      if (T !== void 0) {
        if (T)
          continue;
        b = !1;
        break;
      }
      if (C) {
        if (!e(a, function(D, P) {
          if (!n(C, P) && (E === D || u(E, D, l, c, d)))
            return C.push(P);
        })) {
          b = !1;
          break;
        }
      } else if (!(E === v || u(E, v, l, c, d))) {
        b = !1;
        break;
      }
    }
    return d.delete(s), d.delete(a), b;
  }
  return Sd = o, Sd;
}
var Cd, j0;
function mI() {
  if (j0) return Cd;
  j0 = 1;
  var t = ii(), e = t.Uint8Array;
  return Cd = e, Cd;
}
var Rd, K0;
function yI() {
  if (K0) return Rd;
  K0 = 1;
  function t(e) {
    var n = -1, r = Array(e.size);
    return e.forEach(function(i, o) {
      r[++n] = [o, i];
    }), r;
  }
  return Rd = t, Rd;
}
var Td, U0;
function bI() {
  if (U0) return Td;
  U0 = 1;
  var t = Bs(), e = mI(), n = ah(), r = F1(), i = yI(), o = Dh(), s = 1, a = 2, l = "[object Boolean]", c = "[object Date]", u = "[object Error]", d = "[object Map]", f = "[object Number]", h = "[object RegExp]", p = "[object Set]", g = "[object String]", y = "[object Symbol]", m = "[object ArrayBuffer]", b = "[object DataView]", C = t ? t.prototype : void 0, E = C ? C.valueOf : void 0;
  function v(T, D, P, k, z, S, x) {
    switch (P) {
      case b:
        if (T.byteLength != D.byteLength || T.byteOffset != D.byteOffset)
          return !1;
        T = T.buffer, D = D.buffer;
      case m:
        return !(T.byteLength != D.byteLength || !S(new e(T), new e(D)));
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
        var I = i;
      case p:
        var _ = k & s;
        if (I || (I = o), T.size != D.size && !_)
          return !1;
        var M = x.get(T);
        if (M)
          return M == D;
        k |= a, x.set(T, D);
        var O = r(I(T), I(D), k, z, S, x);
        return x.delete(T), O;
      case y:
        if (E)
          return E.call(T) == E.call(D);
    }
    return !1;
  }
  return Td = v, Td;
}
var Ed, G0;
function vI() {
  if (G0) return Ed;
  G0 = 1;
  var t = T1(), e = ri();
  function n(r, i, o) {
    var s = i(r);
    return e(r) ? s : t(s, o(r));
  }
  return Ed = n, Ed;
}
var Md, Y0;
function wI() {
  if (Y0) return Md;
  Y0 = 1;
  function t(e, n) {
    for (var r = -1, i = e == null ? 0 : e.length, o = 0, s = []; ++r < i; ) {
      var a = e[r];
      n(a, r, e) && (s[o++] = a);
    }
    return s;
  }
  return Md = t, Md;
}
var Id, X0;
function xI() {
  if (X0) return Id;
  X0 = 1;
  function t() {
    return [];
  }
  return Id = t, Id;
}
var Ad, V0;
function kI() {
  if (V0) return Ad;
  V0 = 1;
  var t = wI(), e = xI(), n = Object.prototype, r = n.propertyIsEnumerable, i = Object.getOwnPropertySymbols, o = i ? function(s) {
    return s == null ? [] : (s = Object(s), t(i(s), function(a) {
      return r.call(s, a);
    }));
  } : e;
  return Ad = o, Ad;
}
var _d, J0;
function SI() {
  if (J0) return _d;
  J0 = 1;
  var t = vI(), e = kI(), n = zh();
  function r(i) {
    return t(i, n, e);
  }
  return _d = r, _d;
}
var Pd, Z0;
function CI() {
  if (Z0) return Pd;
  Z0 = 1;
  var t = SI(), e = 1, n = Object.prototype, r = n.hasOwnProperty;
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
    var E = !0;
    u.set(o, s), u.set(s, o);
    for (var v = d; ++y < h; ) {
      m = f[y];
      var T = o[m], D = s[m];
      if (l)
        var P = d ? l(D, T, m, s, o, u) : l(T, D, m, o, s, u);
      if (!(P === void 0 ? T === D || c(T, D, a, l, u) : P)) {
        E = !1;
        break;
      }
      v || (v = m == "constructor");
    }
    if (E && !v) {
      var k = o.constructor, z = s.constructor;
      k != z && "constructor" in o && "constructor" in s && !(typeof k == "function" && k instanceof k && typeof z == "function" && z instanceof z) && (E = !1);
    }
    return u.delete(o), u.delete(s), E;
  }
  return Pd = i, Pd;
}
var Dd, Q0;
function RI() {
  if (Q0) return Dd;
  Q0 = 1;
  var t = lo(), e = ii(), n = t(e, "DataView");
  return Dd = n, Dd;
}
var Nd, ey;
function TI() {
  if (ey) return Nd;
  ey = 1;
  var t = lo(), e = ii(), n = t(e, "Promise");
  return Nd = n, Nd;
}
var Od, ty;
function EI() {
  if (ty) return Od;
  ty = 1;
  var t = lo(), e = ii(), n = t(e, "WeakMap");
  return Od = n, Od;
}
var zd, ny;
function MI() {
  if (ny) return zd;
  ny = 1;
  var t = RI(), e = lh(), n = TI(), r = R1(), i = EI(), o = qs(), s = zv(), a = "[object Map]", l = "[object Object]", c = "[object Promise]", u = "[object Set]", d = "[object WeakMap]", f = "[object DataView]", h = s(t), p = s(e), g = s(n), y = s(r), m = s(i), b = o;
  return (t && b(new t(new ArrayBuffer(1))) != f || e && b(new e()) != a || n && b(n.resolve()) != c || r && b(new r()) != u || i && b(new i()) != d) && (b = function(C) {
    var E = o(C), v = E == l ? C.constructor : void 0, T = v ? s(v) : "";
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
    return E;
  }), zd = b, zd;
}
var Ld, ry;
function II() {
  if (ry) return Ld;
  ry = 1;
  var t = $1(), e = F1(), n = bI(), r = CI(), i = MI(), o = ri(), s = z1(), a = L1(), l = 1, c = "[object Arguments]", u = "[object Array]", d = "[object Object]", f = Object.prototype, h = f.hasOwnProperty;
  function p(g, y, m, b, C, E) {
    var v = o(g), T = o(y), D = v ? u : i(g), P = T ? u : i(y);
    D = D == c ? d : D, P = P == c ? d : P;
    var k = D == d, z = P == d, S = D == P;
    if (S && s(g)) {
      if (!s(y))
        return !1;
      v = !0, k = !1;
    }
    if (S && !k)
      return E || (E = new t()), v || a(g) ? e(g, y, m, b, C, E) : n(g, y, D, m, b, C, E);
    if (!(m & l)) {
      var x = k && h.call(g, "__wrapped__"), I = z && h.call(y, "__wrapped__");
      if (x || I) {
        var _ = x ? g.value() : g, M = I ? y.value() : y;
        return E || (E = new t()), C(_, M, m, b, E);
      }
    }
    return S ? (E || (E = new t()), r(g, y, m, b, C, E)) : !1;
  }
  return Ld = p, Ld;
}
var $d, iy;
function H1() {
  if (iy) return $d;
  iy = 1;
  var t = II(), e = Ws();
  function n(r, i, o, s, a) {
    return r === i ? !0 : r == null || i == null || !e(r) && !e(i) ? r !== r && i !== i : t(r, i, o, s, n, a);
  }
  return $d = n, $d;
}
var Fd, oy;
function AI() {
  if (oy) return Fd;
  oy = 1;
  var t = $1(), e = H1(), n = 1, r = 2;
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
var Hd, sy;
function B1() {
  if (sy) return Hd;
  sy = 1;
  var t = ao();
  function e(n) {
    return n === n && !t(n);
  }
  return Hd = e, Hd;
}
var Bd, ay;
function _I() {
  if (ay) return Bd;
  ay = 1;
  var t = B1(), e = zh();
  function n(r) {
    for (var i = e(r), o = i.length; o--; ) {
      var s = i[o], a = r[s];
      i[o] = [s, a, t(a)];
    }
    return i;
  }
  return Bd = n, Bd;
}
var qd, ly;
function q1() {
  if (ly) return qd;
  ly = 1;
  function t(e, n) {
    return function(r) {
      return r == null ? !1 : r[e] === n && (n !== void 0 || e in Object(r));
    };
  }
  return qd = t, qd;
}
var Wd, cy;
function PI() {
  if (cy) return Wd;
  cy = 1;
  var t = AI(), e = _I(), n = q1();
  function r(i) {
    var o = e(i);
    return o.length == 1 && o[0][2] ? n(o[0][0], o[0][1]) : function(s) {
      return s === i || t(s, i, o);
    };
  }
  return Wd = r, Wd;
}
var jd, uy;
function W1() {
  if (uy) return jd;
  uy = 1;
  var t = Lv(), e = kl();
  function n(r, i) {
    i = t(i, r);
    for (var o = 0, s = i.length; r != null && o < s; )
      r = r[e(i[o++])];
    return o && o == s ? r : void 0;
  }
  return jd = n, jd;
}
var Kd, dy;
function DI() {
  if (dy) return Kd;
  dy = 1;
  var t = W1();
  function e(n, r, i) {
    var o = n == null ? void 0 : t(n, r);
    return o === void 0 ? i : o;
  }
  return Kd = e, Kd;
}
var Ud, fy;
function NI() {
  if (fy) return Ud;
  fy = 1;
  function t(e, n) {
    return e != null && n in Object(e);
  }
  return Ud = t, Ud;
}
var Gd, hy;
function OI() {
  if (hy) return Gd;
  hy = 1;
  var t = NI(), e = $v();
  function n(r, i) {
    return r != null && e(r, i, t);
  }
  return Gd = n, Gd;
}
var Yd, py;
function zI() {
  if (py) return Yd;
  py = 1;
  var t = H1(), e = DI(), n = OI(), r = sh(), i = B1(), o = q1(), s = kl(), a = 1, l = 2;
  function c(u, d) {
    return r(u) && i(d) ? o(s(u), d) : function(f) {
      var h = e(f, u);
      return h === void 0 && h === d ? n(f, u) : t(d, h, a | l);
    };
  }
  return Yd = c, Yd;
}
var Xd, gy;
function LI() {
  if (gy) return Xd;
  gy = 1;
  function t(e) {
    return e;
  }
  return Xd = t, Xd;
}
var Vd, my;
function $I() {
  if (my) return Vd;
  my = 1;
  function t(e) {
    return function(n) {
      return n == null ? void 0 : n[e];
    };
  }
  return Vd = t, Vd;
}
var Jd, yy;
function FI() {
  if (yy) return Jd;
  yy = 1;
  var t = W1();
  function e(n) {
    return function(r) {
      return t(r, n);
    };
  }
  return Jd = e, Jd;
}
var Zd, by;
function HI() {
  if (by) return Zd;
  by = 1;
  var t = $I(), e = FI(), n = sh(), r = kl();
  function i(o) {
    return n(o) ? t(r(o)) : e(o);
  }
  return Zd = i, Zd;
}
var Qd, vy;
function BI() {
  if (vy) return Qd;
  vy = 1;
  var t = PI(), e = zI(), n = LI(), r = ri(), i = HI();
  function o(s) {
    return typeof s == "function" ? s : s == null ? n : typeof s == "object" ? r(s) ? e(s[0], s[1]) : t(s) : i(s);
  }
  return Qd = o, Qd;
}
var ef, wy;
function qI() {
  if (wy) return ef;
  wy = 1;
  var t = GM(), e = cI(), n = BI(), r = ri();
  function i(o, s) {
    return function(a, l) {
      var c = r(a) ? t : e, u = s ? s() : {};
      return c(a, o, n(l, 2), u);
    };
  }
  return ef = i, ef;
}
var tf, xy;
function WI() {
  if (xy) return tf;
  xy = 1;
  var t = UM(), e = qI(), n = Object.prototype, r = n.hasOwnProperty, i = e(function(o, s, a) {
    r.call(o, a) ? o[a].push(s) : t(o, a, [s]);
  });
  return tf = i, tf;
}
var jI = WI();
const KI = /* @__PURE__ */ Ni(jI);
function UI(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g, y, m, b) {
  if (m !== void 0 || e[e.length - 1] !== n[e.length - 1])
    return;
  const C = M1(y);
  zi(e, l, s, a, o, (E, v, T, D, P) => {
    if (E !== e[e.length - 1])
      return;
    v += E.width;
    const k = Math.max(v, D);
    k > r || (t.save(), t.beginPath(), t.rect(k, o + 1, 1e4, i - o - 1), t.clip(), Rl(P, T, i, c, u, p, g, C, (z, S, x, I) => {
      if (!I && y.length > 0 && !y.some((W) => Os(v, z, 1e4, x, W.x, W.y, W.width, W.height)))
        return;
      const _ = f.hasIndex(S), M = h.hasIndex(S);
      t.beginPath();
      const O = d == null ? void 0 : d(S), L = O === void 0 ? b : fi(b, O);
      L.bgCell !== b.bgCell && (t.fillStyle = L.bgCell, t.fillRect(v, z, 1e4, x)), M && (t.fillStyle = L.bgHeader, t.fillRect(v, z, 1e4, x)), _ && (t.fillStyle = L.accentLight, t.fillRect(v, z, 1e4, x));
    }), t.restore());
  });
}
function GI(t, e, n, r, i, o, s, a, l) {
  let c = !1;
  for (const p of e)
    if (!p.sticky) {
      c = s(p.sourceIndex);
      break;
    }
  const u = l.horizontalBorderColor ?? l.borderColor, d = l.borderColor, f = c ? Wo(e) : 0;
  let h;
  if (f !== 0 && (h = Dm(d, l.bgCell), t.beginPath(), t.moveTo(f + 0.5, 0), t.lineTo(f + 0.5, r), t.strokeStyle = h, t.stroke()), i > 0) {
    const p = d === u && h !== void 0 ? h : Dm(u, l.bgCell), g = uo(o, i, a);
    t.beginPath(), t.moveTo(0, r - g + 0.5), t.lineTo(n, r - g + 0.5), t.strokeStyle = p, t.stroke();
  }
}
const j1 = (t, e, n) => {
  let r = 0, i = e, o = 0, s = n;
  if (t !== void 0 && t.length > 0) {
    r = Number.MAX_SAFE_INTEGER, o = Number.MAX_SAFE_INTEGER, i = Number.MIN_SAFE_INTEGER, s = Number.MIN_SAFE_INTEGER;
    for (const a of t)
      r = Math.min(r, a.x - 1), i = Math.max(i, a.x + a.width + 1), o = Math.min(o, a.y - 1), s = Math.max(s, a.y + a.height + 1);
  }
  return { minX: r, maxX: i, minY: o, maxY: s };
};
function YI(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p) {
  var x;
  const g = p.bgCell, { minX: y, maxX: m, minY: b, maxY: C } = j1(a, o, s), E = [], v = s - uo(h, f, c);
  let T = l, D = n, P = 0;
  for (; T + i < v; ) {
    const I = T + i, _ = c(D);
    if (I >= b && I <= C - 1) {
      const M = u == null ? void 0 : u(D), O = M == null ? void 0 : M.bgCell;
      O !== void 0 && O !== g && D >= h - f && E.push({
        x: y,
        y: I,
        w: m - y,
        h: _,
        color: O
      });
    }
    T += _, D < h - f && (P = T), D++;
  }
  let k = 0;
  const z = Math.min(v, C) - P;
  if (z > 0)
    for (let I = 0; I < e.length; I++) {
      const _ = e[I];
      if (_.width === 0)
        continue;
      const M = _.sticky ? k : k + r, O = (x = _.themeOverride) == null ? void 0 : x.bgCell;
      O !== void 0 && O !== g && M >= y && M <= m && d(I + 1) && E.push({
        x: M,
        y: P,
        w: _.width,
        h: z,
        color: O
      }), k += _.width;
    }
  if (E.length === 0)
    return;
  let S;
  t.beginPath();
  for (let I = E.length - 1; I >= 0; I--) {
    const _ = E[I];
    S === void 0 ? S = _.color : _.color !== S && (t.fillStyle = S, t.fill(), t.beginPath(), S = _.color), t.rect(_.x, _.y, _.w, _.h);
  }
  S !== void 0 && (t.fillStyle = S, t.fill()), t.beginPath();
}
function ky(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g, y, m = !1) {
  if (l !== void 0) {
    t.beginPath(), t.save(), t.rect(0, 0, o, s);
    for (const x of l)
      t.rect(x.x + 1, x.y + 1, x.width - 1, x.height - 1);
    t.clip("evenodd");
  }
  const b = y.horizontalBorderColor ?? y.borderColor, C = y.borderColor, { minX: E, maxX: v, minY: T, maxY: D } = j1(a, o, s), P = [];
  t.beginPath();
  let k = 0.5;
  for (let x = 0; x < e.length; x++) {
    const I = e[x];
    if (I.width === 0)
      continue;
    k += I.width;
    const _ = I.sticky ? k : k + r;
    _ >= E && _ <= v && h(x + 1) && P.push({
      x1: _,
      y1: Math.max(c, T),
      x2: _,
      y2: Math.min(s, D),
      color: C
    });
  }
  let z = s + 0.5;
  for (let x = g - p; x < g; x++) {
    const I = d(x);
    z -= I, P.push({ x1: E, y1: z, x2: v, y2: z, color: b });
  }
  if (m !== !0) {
    let x = u + 0.5, I = n;
    const _ = z;
    for (; x + i < _; ) {
      const M = x + i;
      if (M >= T && M <= D - 1) {
        const O = f == null ? void 0 : f(I);
        P.push({
          x1: E,
          y1: M,
          x2: v,
          y2: M,
          color: (O == null ? void 0 : O.horizontalBorderColor) ?? (O == null ? void 0 : O.borderColor) ?? b
        });
      }
      x += d(I), I++;
    }
  }
  const S = KI(P, (x) => x.color);
  for (const x of Object.keys(S)) {
    t.strokeStyle = x;
    for (const I of S[x])
      t.moveTo(I.x1, I.y1), t.lineTo(I.x2, I.y2);
    t.stroke(), t.beginPath();
  }
  l !== void 0 && t.restore();
}
function XI(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g, y, m, b) {
  const C = [];
  t.imageSmoothingEnabled = !1;
  const E = Math.min(i.cellYOffset, s), v = Math.max(i.cellYOffset, s);
  let T = 0;
  if (typeof m == "number")
    T += (v - E) * m;
  else
    for (let _ = E; _ < v; _++)
      T += m(_);
  s > i.cellYOffset && (T = -T), T += l - i.translateY;
  const D = Math.min(i.cellXOffset, o), P = Math.max(i.cellXOffset, o);
  let k = 0;
  for (let _ = D; _ < P; _++)
    k += g[_].width;
  o > i.cellXOffset && (k = -k), k += a - i.translateX;
  const z = Wo(y);
  if (k !== 0 && T !== 0)
    return {
      regions: []
    };
  const S = c > 0 ? uo(f, c, m) : 0, x = u - z - Math.abs(k), I = d - h - S - Math.abs(T) - 1;
  if (x > 150 && I > 150) {
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
    if (T > 0 ? (_.sy = (h + 1) * p, _.sh = I * p, _.dy = (T + h + 1) * p, _.dh = I * p, C.push({
      x: 0,
      y: h,
      width: u,
      height: T + 1
    })) : T < 0 && (_.sy = (-T + h + 1) * p, _.sh = I * p, _.dy = (h + 1) * p, _.dh = I * p, C.push({
      x: 0,
      y: d + T - S,
      width: u,
      height: -T + S
    })), k > 0 ? (_.sx = z * p, _.sw = x * p, _.dx = (k + z) * p, _.dw = x * p, C.push({
      x: z - 1,
      y: 0,
      width: k + 2,
      // extra width to account for first col not drawing a left side border
      height: d
    })) : k < 0 && (_.sx = (z - k) * p, _.sw = x * p, _.dx = z * p, _.dw = x * p, C.push({
      x: u + k,
      y: 0,
      width: -k,
      height: d
    })), t.setTransform(1, 0, 0, 1, 0, 0), b) {
      if (z > 0 && k !== 0 && T === 0 && (r === void 0 || (n == null ? void 0 : n[1]) !== !1)) {
        const M = z * p, O = d * p;
        t.drawImage(e, 0, 0, M, O, 0, 0, M, O);
      }
      if (S > 0 && k === 0 && T !== 0 && (r === void 0 || (n == null ? void 0 : n[0]) !== !1)) {
        const M = (d - S) * p, O = u * p, L = S * p;
        t.drawImage(e, 0, M, O, L, 0, M, O, L);
      }
    }
    t.drawImage(e, _.sx, _.sy, _.sw, _.sh, _.dx, _.dy, _.dw, _.dh), t.scale(p, p);
  }
  return t.imageSmoothingEnabled = !0, {
    regions: C
  };
}
function VI(t, e, n, r, i, o, s, a, l, c) {
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
function JI(t, e) {
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
function Sy(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g) {
  const y = p == null ? void 0 : p.filter((D) => D.style !== "no-outline");
  if (y === void 0 || y.length === 0)
    return;
  const m = Wo(a), b = uo(h, f, d), C = [l, 0, a.length, h - f], E = [m, 0, e, n - b], v = y.map((D) => {
    const P = D.range, k = D.style ?? "dashed";
    return FM(P, C, e, n, E).map((z) => {
      const S = z.rect, x = If(S.x, S.y, e, n, u, c + u, r, i, o, s, h, l, f, a, d), I = S.width === 1 && S.height === 1 ? x : If(S.x + S.width - 1, S.y + S.height - 1, e, n, u, c + u, r, i, o, s, h, l, f, a, d);
      return S.x + S.width >= a.length && (I.width -= 1), S.y + S.height >= h && (I.height -= 1), {
        color: D.color,
        style: k,
        clip: z.clip,
        rect: $M({
          x: x.x,
          y: x.y,
          width: I.x + I.width - x.x,
          height: I.y + I.height - x.y
        }, e, n, 8)
      };
    });
  }), T = () => {
    t.lineWidth = 1;
    let D = !1;
    for (const P of v)
      for (const k of P)
        if ((k == null ? void 0 : k.rect) !== void 0 && Os(0, 0, e, n, k.rect.x, k.rect.y, k.rect.width, k.rect.height)) {
          const z = D, S = !LM(k.clip, k.rect);
          t.beginPath(), S && (t.save(), t.rect(k.clip.x, k.clip.y, k.clip.width, k.clip.height), t.clip()), k.style === "dashed" && !D ? (t.setLineDash([5, 3]), D = !0) : (k.style === "solid" || k.style === "solid-outline") && D && (t.setLineDash([]), D = !1), t.strokeStyle = k.style === "solid-outline" ? yr(yr(k.color, g.borderColor), g.bgCell) : io(k.color, 1), t.closePath(), t.strokeRect(k.rect.x + 0.5, k.rect.y + 0.5, k.rect.width - 1, k.rect.height - 1), S && (t.restore(), D = z);
        }
    D && t.setLineDash([]);
  };
  return T(), T;
}
function Cy(t, e, n, r, i) {
  t.beginPath(), t.moveTo(e, n), t.lineTo(e, r), t.lineWidth = 2, t.strokeStyle = i, t.stroke(), t.globalAlpha = 1;
}
function nf(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g, y) {
  if (u.current === void 0)
    return;
  const m = g !== !1 && g !== void 0;
  if (!m)
    return;
  const b = typeof g == "object" ? { ...Ja, ...g } : Ja, C = u.current.range, E = u.current.cell, v = [C.x + C.width - 1, C.y + C.height - 1];
  if (E[1] >= y && v[1] >= y || !s.some((O) => O.sourceIndex === E[0] || O.sourceIndex === v[0]))
    return;
  const [D, P] = u.current.cell, k = f(u.current.cell), z = k.span ?? [D, D], S = P >= y - h, x = h > 0 && !S ? uo(y, h, d) - 1 : 0, I = v[1];
  let _;
  if (zi(s, r, i, o, c, (O, L, W, re, F) => {
    if (O.sticky && D > O.sourceIndex)
      return;
    const N = O.sourceIndex < z[0], te = O.sourceIndex > z[1], G = O.sourceIndex === v[0];
    if (!(!G && (N || te)))
      return Rl(F, W, n, y, d, h, p, void 0, (j, ee, q) => {
        if (ee !== P && ee !== I)
          return;
        let Q = L, X = O.width;
        if (k.span !== void 0) {
          const K = A1(k.span, L, j, O.width, q, O, a), se = O.sticky ? K[0] : K[1];
          se !== void 0 && (Q = se.x, X = se.width);
        }
        return ee === I && G && m && (_ = () => {
          var Re;
          re > Q && !O.sticky && (t.beginPath(), t.rect(re, 0, e - re, n), t.clip());
          const K = b.size, se = K / 2, le = Q + X + b.offsetX - se + 0.5, Ce = j + q + b.offsetY - se + 0.5;
          t.beginPath(), b.shape === "circle" ? t.arc(le + se, Ce + se, se, 0, Math.PI * 2) : t.rect(le, Ce, K, K), t.fillStyle = ((Re = O.themeOverride) == null ? void 0 : Re.accentColor) ?? l.accentColor, t.fill(), b.outline > 0 && (t.lineWidth = b.outline, t.strokeStyle = l.bgCell, b.shape === "circle" ? (t.beginPath(), t.arc(le + se, Ce + se, se + b.outline / 2, 0, Math.PI * 2), t.stroke()) : t.strokeRect(le - b.outline / 2, Ce - b.outline / 2, K + b.outline, K + b.outline));
        }), _ !== void 0;
      }), _ !== void 0;
  }), _ === void 0)
    return;
  const M = () => {
    t.save(), t.beginPath(), t.rect(0, c, e, n - c - x), t.clip(), _ == null || _(), t.restore();
  };
  return M(), M;
}
function ZI(t, e, n, r, i, o, s, a, l) {
  l === void 0 || l.size === 0 || (t.beginPath(), I1(e, n, o, r, (c, u, d, f, h, p) => {
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
function QI(t, e, n, r, i, o, s, a, l, c) {
  let u = 0;
  return zi(t, o, r, i, n, (d, f, h, p, g) => (Rl(g, h, e, s, a, l, c, void 0, (y, m, b, C) => {
    C || (u = Math.max(m, u));
  }), !0)), u;
}
function Ry(t, e) {
  var he;
  const { canvasCtx: n, headerCanvasCtx: r, width: i, height: o, cellXOffset: s, cellYOffset: a, translateX: l, translateY: c, mappedColumns: u, enableGroups: d, freezeColumns: f, dragAndDropState: h, theme: p, drawFocus: g, headerHeight: y, groupHeaderHeight: m, disabledRows: b, rowHeight: C, verticalBorder: E, overrideCursor: v, isResizing: T, selection: D, fillHandle: P, freezeTrailingRows: k, rows: z, getCellContent: S, getGroupDetails: x, getRowThemeOverride: I, isFocused: _, drawHeaderCallback: M, prelightCells: O, drawCellCallback: L, highlightRegions: W, resizeCol: re, imageLoader: F, lastBlitData: N, hoverValues: te, hyperWrapping: G, hoverInfo: j, spriteManager: ee, maxScaleFactor: q, hasAppendRow: Q, touchMode: X, enqueue: J, renderStateProvider: K, getCellRenderer: se, renderStrategy: le, bufferACtx: Ce, bufferBCtx: Re, damage: Be, minimumCellWidth: rt, resizeIndicator: mt } = t;
  if (i === 0 || o === 0)
    return;
  const ut = le === "double-buffer", ne = Math.min(q, Math.ceil(window.devicePixelRatio ?? 1)), _e = le !== "direct" && JI(t, e), Ae = n.canvas;
  (Ae.width !== i * ne || Ae.height !== o * ne) && (Ae.width = i * ne, Ae.height = o * ne, Ae.style.width = i + "px", Ae.style.height = o + "px");
  const Ke = r.canvas, Fe = d ? m + y : y, ze = Fe + 1;
  (Ke.width !== i * ne || Ke.height !== ze * ne) && (Ke.width = i * ne, Ke.height = ze * ne, Ke.style.width = i + "px", Ke.style.height = ze + "px");
  const Je = Ce.canvas, gt = Re.canvas;
  ut && (Je.width !== i * ne || Je.height !== o * ne) && (Je.width = i * ne, Je.height = o * ne, N.current !== void 0 && (N.current.aBufferScroll = void 0)), ut && (gt.width !== i * ne || gt.height !== o * ne) && (gt.width = i * ne, gt.height = o * ne, N.current !== void 0 && (N.current.bBufferScroll = void 0));
  const Se = N.current;
  if (_e === !0 && s === (Se == null ? void 0 : Se.cellXOffset) && a === (Se == null ? void 0 : Se.cellYOffset) && l === (Se == null ? void 0 : Se.translateX) && c === (Se == null ? void 0 : Se.translateY))
    return;
  let Ve = null;
  ut && (Ve = n);
  const kt = r;
  let yt;
  ut ? Be !== void 0 ? yt = (Se == null ? void 0 : Se.lastBuffer) === "b" ? Re : Ce : yt = (Se == null ? void 0 : Se.lastBuffer) === "b" ? Ce : Re : yt = n;
  const et = yt.canvas, Ct = ut ? et === Je ? gt : Je : Ae, dt = typeof C == "number" ? () => C : C;
  kt.save(), yt.save(), kt.beginPath(), yt.beginPath(), kt.textBaseline = "middle", yt.textBaseline = "middle", ne !== 1 && (kt.scale(ne, ne), yt.scale(ne, ne));
  const ft = Mf(u, s, i, h, l);
  let Ot = [];
  const pe = g && ((he = D.current) == null ? void 0 : he.cell[1]) === a && c === 0;
  let ke = !1;
  if (W !== void 0) {
    for (const we of W)
      if (we.style !== "no-outline" && we.range.y === a && c === 0) {
        ke = !0;
        break;
      }
  }
  const ue = () => {
    qM(kt, ft, d, j, i, l, y, m, h, T, D, p, ee, te, E, x, Be, M, X), ky(kt, ft, a, l, c, i, o, void 0, void 0, m, Fe, dt, I, E, k, z, p, !0), kt.beginPath(), kt.moveTo(0, ze - 0.5), kt.lineTo(i, ze - 0.5), kt.strokeStyle = yr(p.headerBottomBorderColor ?? p.horizontalBorderColor ?? p.borderColor, p.bgHeader), kt.stroke(), ke && Sy(kt, i, o, s, a, l, c, u, f, y, m, C, k, z, W, p), pe && nf(kt, i, o, a, l, c, ft, u, p, Fe, D, dt, S, k, Q, P, z);
  };
  if (Be !== void 0) {
    const we = ft[ft.length - 1].sourceIndex + 1, qe = Be.hasItemInRegion([
      {
        x: s,
        y: -2,
        width: we,
        height: 2
      },
      {
        x: s,
        y: a,
        width: we,
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
        y: z - k,
        width: we,
        height: k,
        when: k > 0
      }
    ]), Ue = (zt) => {
      f0(zt, ft, u, o, Fe, l, c, a, z, dt, S, x, I, b, _, g, k, Q, Ot, Be, D, O, W, F, ee, te, j, L, G, p, J, K, se, v, rt);
      const tn = D.current;
      P !== !1 && P !== void 0 && g && tn !== void 0 && Be.has(h1(tn.range)) && nf(zt, i, o, a, l, c, ft, u, p, Fe, D, dt, S, k, Q, P, z);
    };
    qe && (Ue(yt), Ve !== null && (Ve.save(), Ve.scale(ne, ne), Ve.textBaseline = "middle", Ue(Ve), Ve.restore()), Be.hasHeader() && (ZI(kt, ft, i, m, Fe, l, c, a, Be), ue())), yt.restore(), kt.restore();
    return;
  }
  if ((_e !== !0 || s !== (Se == null ? void 0 : Se.cellXOffset) || l !== (Se == null ? void 0 : Se.translateX) || pe !== (Se == null ? void 0 : Se.mustDrawFocusOnHeader) || ke !== (Se == null ? void 0 : Se.mustDrawHighlightRingsOnHeader)) && ue(), _e === !0) {
    mr(Ct !== void 0 && Se !== void 0);
    const { regions: we } = XI(yt, Ct, Ct === Je ? Se.aBufferScroll : Se.bBufferScroll, Ct === Je ? Se.bBufferScroll : Se.aBufferScroll, Se, s, a, l, c, k, i, o, z, Fe, ne, u, ft, C, ut);
    Ot = we;
  } else _e !== !1 && (mr(Se !== void 0), Ot = VI(Se, s, a, l, c, i, o, Fe, ft, _e));
  GI(yt, ft, i, o, k, z, E, dt, p);
  const ye = Sy(yt, i, o, s, a, l, c, u, f, y, m, C, k, z, W, p), He = g ? nf(yt, i, o, a, l, c, ft, u, p, Fe, D, dt, S, k, Q, P, z) : void 0;
  if (yt.fillStyle = p.bgCell, Ot.length > 0) {
    yt.beginPath();
    for (const we of Ot)
      yt.rect(we.x, we.y, we.width, we.height);
    yt.clip(), yt.fill(), yt.beginPath();
  } else
    yt.fillRect(0, 0, i, o);
  const Rt = f0(yt, ft, u, o, Fe, l, c, a, z, dt, S, x, I, b, _, g, k, Q, Ot, Be, D, O, W, F, ee, te, j, L, G, p, J, K, se, v, rt);
  UI(yt, ft, u, i, o, Fe, l, c, a, z, dt, I, D.rows, b, k, Q, Ot, Be, p), YI(yt, ft, a, l, c, i, o, Ot, Fe, dt, I, E, k, z, p), ky(yt, ft, a, l, c, i, o, Ot, Rt, m, Fe, dt, I, E, k, z, p), ye == null || ye(), He == null || He(), T && mt !== "none" && zi(ft, 0, l, 0, Fe, (we, qe) => we.sourceIndex === re ? (Cy(kt, qe + we.width, 0, Fe + 1, yr(p.resizeIndicatorColor ?? p.accentLight, p.bgHeader)), mt === "full" && Cy(yt, qe + we.width, Fe, o, yr(p.resizeIndicatorColor ?? p.accentLight, p.bgCell)), !0) : !1), Ve !== null && (Ve.fillStyle = p.bgCell, Ve.fillRect(0, 0, i, o), Ve.drawImage(yt.canvas, 0, 0));
  const Pt = QI(ft, o, Fe, l, c, a, z, dt, k, Q);
  F == null || F.setWindow({
    x: s,
    y: a,
    width: ft.length,
    height: Pt - a
  }, f, Array.from({ length: k }, (we, qe) => z - 1 - qe));
  const it = Se !== void 0 && (s !== Se.cellXOffset || l !== Se.translateX), sn = Se !== void 0 && (a !== Se.cellYOffset || c !== Se.translateY);
  N.current = {
    cellXOffset: s,
    cellYOffset: a,
    translateX: l,
    translateY: c,
    mustDrawFocusOnHeader: pe,
    mustDrawHighlightRingsOnHeader: ke,
    lastBuffer: ut ? et === Je ? "a" : "b" : void 0,
    aBufferScroll: et === Je ? [it, sn] : Se == null ? void 0 : Se.aBufferScroll,
    bBufferScroll: et === gt ? [it, sn] : Se == null ? void 0 : Se.bBufferScroll
  }, yt.restore(), kt.restore();
}
const eA = 80;
function tA(t) {
  const e = t - 1;
  return e * e * e + 1;
}
class nA {
  constructor(e) {
    Qe(this, "callback");
    Qe(this, "currentHoveredItem");
    Qe(this, "leavingItems", []);
    Qe(this, "lastAnimationTime");
    Qe(this, "addToLeavingItems", (e) => {
      this.leavingItems.some((r) => Ss(r.item, e.item)) || this.leavingItems.push(e);
    });
    /**
     * @returns the hover amount of the item, if it was leaving (0 if not).
     */
    Qe(this, "removeFromLeavingItems", (e) => {
      const n = this.leavingItems.find((r) => Ss(r.item, e));
      return this.leavingItems = this.leavingItems.filter((r) => r !== n), (n == null ? void 0 : n.hoverAmount) ?? 0;
    });
    Qe(this, "cleanUpLeavingElements", () => {
      this.leavingItems = this.leavingItems.filter((e) => e.hoverAmount > 0);
    });
    Qe(this, "shouldStep", () => {
      const e = this.leavingItems.length > 0, n = this.currentHoveredItem !== void 0 && this.currentHoveredItem.hoverAmount < 1;
      return e || n;
    });
    Qe(this, "getAnimatingItems", () => this.currentHoveredItem !== void 0 ? [...this.leavingItems, this.currentHoveredItem] : this.leavingItems.map((e) => ({ ...e, hoverAmount: tA(e.hoverAmount) })));
    Qe(this, "step", (e) => {
      if (this.lastAnimationTime === void 0)
        this.lastAnimationTime = e;
      else {
        const r = (e - this.lastAnimationTime) / eA;
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
      if (!Ss((n = this.currentHoveredItem) == null ? void 0 : n.item, e)) {
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
class rA {
  constructor(e) {
    Qe(this, "fn");
    Qe(this, "val");
    this.fn = e;
  }
  get value() {
    return this.val ?? (this.val = this.fn());
  }
}
function Lh(t) {
  return new rA(t);
}
const iA = Lh(() => window.navigator.userAgent.includes("Firefox")), tl = Lh(() => window.navigator.userAgent.includes("Mac OS") && window.navigator.userAgent.includes("Safari") && !window.navigator.userAgent.includes("Chrome")), nl = Lh(() => window.navigator.platform.toLowerCase().startsWith("mac"));
function oA(t) {
  const e = w.useRef([]), n = w.useRef(0), r = w.useRef(t);
  r.current = t;
  const i = w.useCallback(() => {
    const o = () => window.requestAnimationFrame(s), s = () => {
      const a = e.current.map(_h);
      e.current = [], r.current(new Rs(a)), e.current.length > 0 ? n.current++ : n.current = 0;
    };
    window.requestAnimationFrame(n.current > 600 ? o : s);
  }, []);
  return w.useCallback((o) => {
    e.current.length === 0 && i();
    const s = qr(o[0], o[1]);
    e.current.includes(s) || e.current.push(s);
  }, [i]);
}
const Mi = "header", Br = "group-header", rl = "out-of-bounds";
var Do;
(function(t) {
  t[t.Start = -2] = "Start", t[t.StartPadding = -1] = "StartPadding", t[t.Center = 0] = "Center", t[t.EndPadding = 1] = "EndPadding", t[t.End = 2] = "End";
})(Do || (Do = {}));
function K1(t, e) {
  return t === e ? !0 : (t == null ? void 0 : t.kind) === "out-of-bounds" ? (t == null ? void 0 : t.kind) === (e == null ? void 0 : e.kind) && (t == null ? void 0 : t.location[0]) === (e == null ? void 0 : e.location[0]) && (t == null ? void 0 : t.location[1]) === (e == null ? void 0 : e.location[1]) && (t == null ? void 0 : t.region[0]) === (e == null ? void 0 : e.region[0]) && (t == null ? void 0 : t.region[1]) === (e == null ? void 0 : e.region[1]) : (t == null ? void 0 : t.kind) === (e == null ? void 0 : e.kind) && (t == null ? void 0 : t.location[0]) === (e == null ? void 0 : e.location[0]) && (t == null ? void 0 : t.location[1]) === (e == null ? void 0 : e.location[1]);
}
const sA = (t, e) => {
  if (t.kind === $e.Custom)
    return t.copyData;
  const n = e == null ? void 0 : e(t);
  return (n == null ? void 0 : n.getAccessibilityString(t)) ?? "";
}, aA = (t, e) => {
  const { width: n, height: r, accessibilityHeight: i, columns: o, cellXOffset: s, cellYOffset: a, headerHeight: l, fillHandle: c = !1, groupHeaderHeight: u, rowHeight: d, rows: f, getCellContent: h, getRowThemeOverride: p, onHeaderMenuClick: g, onHeaderIndicatorClick: y, enableGroups: m, isFilling: b, onCanvasFocused: C, onCanvasBlur: E, isFocused: v, selection: T, freezeColumns: D, onContextMenu: P, freezeTrailingRows: k, fixedShadowX: z = !0, fixedShadowY: S = !0, drawFocusRing: x, onMouseDown: I, onMouseUp: _, onMouseMoveRaw: M, onMouseMove: O, onItemHovered: L, dragAndDropState: W, firstColAccessible: re, onKeyDown: F, onKeyUp: N, highlightRegions: te, canvasRef: G, onDragStart: j, onDragEnd: ee, eventTargetRef: q, isResizing: Q, resizeColumn: X, isDragging: J, isDraggable: K = !1, allowResize: se, disabledRows: le, hasAppendRow: Ce, getGroupDetails: Re, theme: Be, prelightCells: rt, headerIcons: mt, verticalBorder: ut, drawCell: ne, drawHeader: _e, onCellFocused: Ae, onDragOverCell: Ke, onDrop: Fe, onDragLeave: ze, imageWindowLoader: Je, smoothScrollX: gt = !1, smoothScrollY: Se = !1, experimental: Ve, getCellRenderer: kt, resizeIndicator: yt = "full" } = t, et = t.translateX ?? 0, Ct = t.translateY ?? 0, dt = Math.max(D, Math.min(o.length - 1, s)), ft = w.useRef(null), Ot = w.useRef((Ve == null ? void 0 : Ve.eventTarget) ?? window), pe = Ot.current, ke = Je, ue = w.useRef(), [ye, He] = w.useState(!1), Rt = w.useRef([]), Pt = w.useRef(), [it, sn] = w.useState(), [he, we] = w.useState(), qe = w.useRef(null), [Ue, zt] = w.useState(), [tn, bt] = w.useState(!1), Z = w.useRef(tn);
  Z.current = tn;
  const xe = w.useMemo(() => new OM(mt, () => {
    dr.current = void 0, dn.current();
  }), [mt]), Te = m ? u + l : l, Ze = w.useRef(-1), vt = ((Ve == null ? void 0 : Ve.enableFirefoxRescaling) ?? !1) && iA.value, Bt = ((Ve == null ? void 0 : Ve.enableSafariRescaling) ?? !1) && tl.value;
  w.useLayoutEffect(() => {
    window.devicePixelRatio === 1 || !vt && !Bt || (Ze.current !== -1 && He(!0), window.clearTimeout(Ze.current), Ze.current = window.setTimeout(() => {
      He(!1), Ze.current = -1;
    }, 200));
  }, [a, dt, et, Ct, vt, Bt]);
  const ht = hE(o, D), Tt = w.useMemo(() => z ? Wo(ht, W) : 0, [ht, W, z]), Mt = w.useCallback((V, be, ot) => {
    const st = V.getBoundingClientRect();
    if (be >= ht.length || ot >= f)
      return;
    const Le = st.width / n, We = If(be, ot, n, r, u, Te, dt, a, et, Ct, f, D, k, ht, d);
    return Le !== 1 && (We.x *= Le, We.y *= Le, We.width *= Le, We.height *= Le), We.x += st.x, We.y += st.y, We;
  }, [
    n,
    r,
    u,
    Te,
    dt,
    a,
    et,
    Ct,
    f,
    D,
    k,
    ht,
    d
  ]), Et = w.useCallback((V, be, ot, st) => {
    const Le = V.getBoundingClientRect(), We = Le.width / n, It = (be - Le.left) / We, Gt = (ot - Le.top) / We, pt = 5, Ln = Mf(ht, dt, n, void 0, et);
    let xt = 0, Yt = 0;
    const Ft = typeof PointerEvent < "u" && st instanceof PointerEvent && st.pointerType === "mouse" || typeof MouseEvent < "u" && st instanceof MouseEvent, Ht = typeof PointerEvent < "u" && st instanceof PointerEvent && st.pointerType === "touch" || typeof TouchEvent < "u" && st instanceof TouchEvent;
    Ft && (xt = st.button, Yt = st.buttons);
    const Lt = yE(It, Ln, et), Vt = bE(Gt, r, m, l, u, f, d, a, Ct, k), En = (st == null ? void 0 : st.shiftKey) === !0, Dr = (st == null ? void 0 : st.ctrlKey) === !0, Nr = (st == null ? void 0 : st.metaKey) === !0, xn = [
      It < 0 ? -1 : n < It ? 1 : 0,
      Gt < Te ? -1 : r < Gt ? 1 : 0
    ];
    let An;
    if (Lt === -1 || Gt < 0 || It < 0 || Vt === void 0 || It > n || Gt > r) {
      const an = It > n ? 1 : It < 0 ? -1 : 0, Sr = Gt > r ? 1 : Gt < 0 ? -1 : 0;
      let Xn = an * 2, go = Sr * 2;
      an === 0 && (Xn = Lt === -1 ? Do.EndPadding : Do.Center), Sr === 0 && (go = Vt === void 0 ? Do.EndPadding : Do.Center);
      let si = !1;
      if (Lt === -1 && Vt === -1) {
        const $n = Mt(V, ht.length - 1, -1);
        mr($n !== void 0), si = be < $n.x + $n.width + pt;
      }
      const jt = It > n && It < n + kf() || Gt > r && Gt < r + kf();
      An = {
        kind: rl,
        location: [Lt !== -1 ? Lt : It < 0 ? 0 : ht.length - 1, Vt ?? f - 1],
        region: [Xn, go],
        shiftKey: En,
        ctrlKey: Dr,
        metaKey: Nr,
        isEdge: si,
        isTouch: Ht,
        button: xt,
        buttons: Yt,
        scrollEdge: xn,
        isMaybeScrollbar: jt
      };
    } else if (Vt <= -1) {
      let an = Mt(V, Lt, Vt);
      mr(an !== void 0);
      let Sr = an !== void 0 && an.x + an.width - be <= pt;
      const Xn = Lt - 1;
      be - an.x <= pt && Xn >= 0 ? (Sr = !0, an = Mt(V, Xn, Vt), mr(an !== void 0), An = {
        kind: m && Vt === -2 ? Br : Mi,
        location: [Xn, Vt],
        bounds: an,
        group: ht[Xn].group ?? "",
        isEdge: Sr,
        shiftKey: En,
        ctrlKey: Dr,
        metaKey: Nr,
        isTouch: Ht,
        localEventX: be - an.x,
        localEventY: ot - an.y,
        button: xt,
        buttons: Yt,
        scrollEdge: xn
      }) : An = {
        kind: m && Vt === -2 ? Br : Mi,
        group: ht[Lt].group ?? "",
        location: [Lt, Vt],
        bounds: an,
        isEdge: Sr,
        shiftKey: En,
        ctrlKey: Dr,
        metaKey: Nr,
        isTouch: Ht,
        localEventX: be - an.x,
        localEventY: ot - an.y,
        button: xt,
        buttons: Yt,
        scrollEdge: xn
      };
    } else {
      const an = Mt(V, Lt, Vt);
      mr(an !== void 0);
      const Sr = an !== void 0 && an.x + an.width - be < pt;
      let Xn = !1;
      if (c !== !1 && c !== void 0 && T.current !== void 0) {
        const si = typeof c == "object" ? { ...Ja, ...c } : Ja, jt = si.size, $n = jt / 2, Bi = h1(T.current.range), vi = Mt(V, Bi[0], Bi[1]);
        if (vi !== void 0) {
          const ai = vi.x + vi.width + si.offsetX - $n + 0.5, hn = vi.y + vi.height + si.offsetY - $n + 0.5;
          Xn = Math.abs(ai - be) < jt && Math.abs(hn - ot) < jt;
        }
      }
      An = {
        kind: "cell",
        location: [Lt, Vt],
        bounds: an,
        isEdge: Sr,
        shiftKey: En,
        ctrlKey: Dr,
        isFillHandle: Xn,
        metaKey: Nr,
        isTouch: Ht,
        localEventX: be - an.x,
        localEventY: ot - an.y,
        button: xt,
        buttons: Yt,
        scrollEdge: xn
      };
    }
    return An;
  }, [
    n,
    ht,
    dt,
    et,
    r,
    m,
    l,
    u,
    f,
    d,
    a,
    Ct,
    k,
    Mt,
    c,
    T,
    Te
  ]), [nn] = it ?? [], xr = w.useRef(() => {
  }), qt = w.useRef(it);
  qt.current = it;
  const [yn, On] = w.useMemo(() => {
    const V = document.createElement("canvas"), be = document.createElement("canvas");
    return V.style.display = "none", V.style.opacity = "0", V.style.position = "fixed", be.style.display = "none", be.style.opacity = "0", be.style.position = "fixed", [V.getContext("2d", { alpha: !1 }), be.getContext("2d", { alpha: !1 })];
  }, []);
  w.useLayoutEffect(() => {
    if (!(yn === null || On === null))
      return document.documentElement.append(yn.canvas), document.documentElement.append(On.canvas), () => {
        yn.canvas.remove(), On.canvas.remove();
      };
  }, [yn, On]);
  const Gn = w.useMemo(() => new EE(), []), Xt = vt && ye ? 1 : Bt && ye ? 2 : 5, zn = (Ve == null ? void 0 : Ve.disableMinimumCellWidth) === !0 ? 1 : 10, dr = w.useRef(), bn = w.useRef(null), fr = w.useRef(null), Yn = w.useCallback(() => {
    var It;
    const V = ft.current, be = qe.current;
    if (V === null || be === null || (bn.current === null && (bn.current = V.getContext("2d", { alpha: !1 }), V.width = 0, V.height = 0), fr.current === null && (fr.current = be.getContext("2d", { alpha: !1 }), be.width = 0, be.height = 0), bn.current === null || fr.current === null || yn === null || On === null))
      return;
    let ot = !1;
    const st = (Gt) => {
      ot = !0, zt(Gt);
    }, Le = dr.current, We = {
      headerCanvasCtx: fr.current,
      canvasCtx: bn.current,
      bufferACtx: yn,
      bufferBCtx: On,
      width: n,
      height: r,
      cellXOffset: dt,
      cellYOffset: a,
      translateX: Math.round(et),
      translateY: Math.round(Ct),
      mappedColumns: ht,
      enableGroups: m,
      freezeColumns: D,
      dragAndDropState: W,
      theme: Be,
      headerHeight: l,
      groupHeaderHeight: u,
      disabledRows: le ?? rn.empty(),
      rowHeight: d,
      verticalBorder: ut,
      isResizing: Q,
      resizeCol: X,
      isFocused: v,
      selection: T,
      fillHandle: c,
      drawCellCallback: ne,
      hasAppendRow: Ce,
      overrideCursor: st,
      maxScaleFactor: Xt,
      freezeTrailingRows: k,
      rows: f,
      drawFocus: x,
      getCellContent: h,
      getGroupDetails: Re ?? ((Gt) => ({ name: Gt })),
      getRowThemeOverride: p,
      drawHeaderCallback: _e,
      prelightCells: rt,
      highlightRegions: te,
      imageLoader: ke,
      lastBlitData: Pt,
      damage: ue.current,
      hoverValues: Rt.current,
      hoverInfo: qt.current,
      spriteManager: xe,
      scrolling: ye,
      hyperWrapping: (Ve == null ? void 0 : Ve.hyperWrapping) ?? !1,
      touchMode: tn,
      enqueue: xr.current,
      renderStateProvider: Gn,
      renderStrategy: (Ve == null ? void 0 : Ve.renderStrategy) ?? (tl.value ? "double-buffer" : "single-buffer"),
      getCellRenderer: kt,
      minimumCellWidth: zn,
      resizeIndicator: yt
    };
    We.damage === void 0 ? (dr.current = We, Ry(We, Le)) : Ry(We, void 0), !ot && (We.damage === void 0 || We.damage.has((It = qt == null ? void 0 : qt.current) == null ? void 0 : It[0])) && zt(void 0);
  }, [
    yn,
    On,
    n,
    r,
    dt,
    a,
    et,
    Ct,
    ht,
    m,
    D,
    W,
    Be,
    l,
    u,
    le,
    d,
    ut,
    Q,
    Ce,
    X,
    v,
    T,
    c,
    k,
    f,
    x,
    Xt,
    h,
    Re,
    p,
    ne,
    _e,
    rt,
    te,
    ke,
    xe,
    ye,
    Ve == null ? void 0 : Ve.hyperWrapping,
    Ve == null ? void 0 : Ve.renderStrategy,
    tn,
    Gn,
    kt,
    zn,
    yt
  ]), dn = w.useRef(Yn);
  w.useLayoutEffect(() => {
    Yn(), dn.current = Yn;
  }, [Yn]), w.useLayoutEffect(() => {
    (async () => {
      var be;
      ((be = document == null ? void 0 : document.fonts) == null ? void 0 : be.ready) !== void 0 && (await document.fonts.ready, dr.current = void 0, dn.current());
    })();
  }, []);
  const Sn = w.useCallback((V) => {
    ue.current = V, dn.current(), ue.current = void 0;
  }, []), rr = oA(Sn);
  xr.current = rr;
  const Pr = w.useCallback((V) => {
    Sn(new Rs(V.map((be) => be.cell)));
  }, [Sn]);
  ke.setCallback(Sn);
  const [gi, Ur] = w.useState(!1), [Qn, kr] = nn ?? [], mi = Qn !== void 0 && kr === -1 && Qn >= 0 && Qn < ht.length && ht[Qn].headerRowMarkerDisabled !== !0, Gr = Qn !== void 0 && kr === -2;
  let ir = !1, Me = !1, tt = Ue;
  if (tt === void 0 && Qn !== void 0 && kr !== void 0 && kr > -1 && kr < f) {
    const V = h([Qn, kr], !0);
    ir = V.kind === Ir.NewRow || V.kind === Ir.Marker && V.markerKind !== "number", Me = V.kind === $e.Boolean && ph(V), tt = V.cursor;
  }
  const vn = J ? "grabbing" : (he ?? !1) || Q ? "col-resize" : gi || b ? "crosshair" : tt !== void 0 ? tt : mi || ir || Me || Gr ? "pointer" : "default", Jt = w.useMemo(() => ({
    // width,
    // height,
    contain: "strict",
    display: "block",
    cursor: vn
  }), [vn]), Zt = w.useRef("default"), In = q == null ? void 0 : q.current;
  In != null && Zt.current !== Jt.cursor && (In.style.cursor = Zt.current = Jt.cursor);
  const Yr = w.useCallback((V, be, ot, st) => {
    if (Re === void 0)
      return;
    const Le = Re(V);
    if (Le.actions !== void 0) {
      const We = D1(be, Le.actions);
      for (const [It, Gt] of We.entries())
        if (Qi(Gt, ot + be.x, st + Gt.y))
          return Le.actions[It];
    }
  }, [Re]), $ = w.useCallback((V, be, ot, st) => {
    const Le = ht[be];
    if (!J && !Q && !(he ?? !1)) {
      const We = Mt(V, be, -1);
      mr(We !== void 0);
      const It = N1(void 0, Le, We.x, We.y, We.width, We.height, Be, vh(Le.title) === "rtl");
      if (Le.hasMenu === !0 && It.menuBounds !== void 0 && Qi(It.menuBounds, ot, st))
        return {
          area: "menu",
          bounds: It.menuBounds
        };
      if (Le.indicatorIcon !== void 0 && It.indicatorIconBounds !== void 0 && Qi(It.indicatorIconBounds, ot, st))
        return {
          area: "indicator",
          bounds: It.indicatorIconBounds
        };
    }
  }, [ht, Mt, he, J, Q, Be]), ve = w.useRef(0), Oe = w.useRef(), Ge = w.useRef(!1), nt = w.useCallback((V) => {
    const be = ft.current, ot = q == null ? void 0 : q.current;
    if (be === null || V.target !== be && V.target !== ot)
      return;
    Ge.current = !0;
    const st = V.clientX, Le = V.clientY;
    if (V.target === ot && ot !== null) {
      const It = ot.getBoundingClientRect();
      if (st > It.right || Le > It.bottom)
        return;
    }
    const We = Et(be, st, Le, V);
    Oe.current = We.location, We.isTouch && (ve.current = Date.now()), Z.current !== We.isTouch && bt(We.isTouch), !(We.kind === Mi && $(be, We.location[0], st, Le) !== void 0) && (We.kind === Br && Yr(We.group, We.bounds, We.localEventX, We.localEventY) !== void 0 || (I == null || I(We), !We.isTouch && K !== !0 && K !== We.kind && We.button < 3 && We.button !== 1 && V.preventDefault()));
  }, [
    q,
    K,
    Et,
    Yr,
    $,
    I
  ]);
  tr("pointerdown", nt, pe, !1);
  const Wt = w.useRef(0), Wn = w.useCallback((V) => {
    var Yt, Ft;
    const be = Wt.current;
    Wt.current = Date.now();
    const ot = ft.current;
    if (Ge.current = !1, _ === void 0 || ot === null)
      return;
    const st = q == null ? void 0 : q.current, Le = V.target !== ot && V.target !== st, We = V.clientX, It = V.clientY, Gt = V.pointerType === "mouse" ? V.button < 3 : !0;
    let pt = Et(ot, We, It, V);
    pt.isTouch && ve.current !== 0 && Date.now() - ve.current > 500 && (pt = {
      ...pt,
      isLongTouch: !0
    }), be !== 0 && Date.now() - be < (pt.isTouch ? 1e3 : 500) && (pt = {
      ...pt,
      isDoubleClick: !0
    }), Z.current !== pt.isTouch && bt(pt.isTouch), !Le && V.cancelable && Gt && V.preventDefault();
    const [Ln] = pt.location, xt = $(ot, Ln, We, It);
    if (pt.kind === Mi && xt !== void 0) {
      (pt.button !== 0 || ((Yt = Oe.current) == null ? void 0 : Yt[0]) !== Ln || ((Ft = Oe.current) == null ? void 0 : Ft[1]) !== -1) && _(pt, !0);
      return;
    } else if (pt.kind === Br) {
      const Ht = Yr(pt.group, pt.bounds, pt.localEventX, pt.localEventY);
      if (Ht !== void 0) {
        pt.button === 0 && Ht.onClick(pt);
        return;
      }
    }
    _(pt, Le);
  }, [_, q, Et, $, Yr]);
  tr("pointerup", Wn, pe, !1);
  const jn = w.useCallback((V) => {
    var Ln, xt;
    const be = ft.current;
    if (be === null)
      return;
    const ot = q == null ? void 0 : q.current, st = V.target !== be && V.target !== ot;
    let Le, We, It = !0;
    V instanceof MouseEvent ? (Le = V.clientX, We = V.clientY, It = V.button < 3) : (Le = V.changedTouches[0].clientX, We = V.changedTouches[0].clientY);
    const Gt = Et(be, Le, We, V);
    Z.current !== Gt.isTouch && bt(Gt.isTouch), !st && V.cancelable && It && V.preventDefault();
    const [pt] = Gt.location;
    if (Gt.kind === Mi) {
      const Yt = $(be, pt, Le, We);
      Yt !== void 0 && Gt.button === 0 && ((Ln = Oe.current) == null ? void 0 : Ln[0]) === pt && ((xt = Oe.current) == null ? void 0 : xt[1]) === -1 && (Yt.area === "menu" ? g == null || g(pt, Yt.bounds) : Yt.area === "indicator" && (y == null || y(pt, Yt.bounds)));
    }
  }, [q, Et, $, g, y]);
  tr("click", jn, pe, !1);
  const hr = w.useCallback((V) => {
    const be = ft.current, ot = q == null ? void 0 : q.current;
    if (be === null || V.target !== be && V.target !== ot || P === void 0)
      return;
    const st = Et(be, V.clientX, V.clientY, V);
    P(st, () => {
      V.cancelable && V.preventDefault();
    });
  }, [q, Et, P]);
  tr("contextmenu", hr, (q == null ? void 0 : q.current) ?? null, !1);
  const yi = w.useCallback((V) => {
    ue.current = new Rs(V.map((be) => be.item)), Rt.current = V, dn.current(), ue.current = void 0;
  }, []), wt = w.useMemo(() => new nA(yi), [yi]), Li = w.useRef(wt);
  Li.current = wt, w.useLayoutEffect(() => {
    const V = Li.current;
    if (nn === void 0 || nn[1] < 0) {
      V.setHovered(nn);
      return;
    }
    const be = h(nn, !0), ot = kt(be), st = ot === void 0 && be.kind === $e.Custom || (ot == null ? void 0 : ot.needsHover) !== void 0 && (typeof ot.needsHover == "boolean" ? ot.needsHover : ot.needsHover(be));
    V.setHovered(st ? nn : void 0);
  }, [h, kt, nn]);
  const $i = w.useRef(), or = w.useCallback((V) => {
    var Gt;
    const be = ft.current;
    if (be === null)
      return;
    const ot = q == null ? void 0 : q.current, st = V.target !== be && V.target !== ot, Le = Et(be, V.clientX, V.clientY, V);
    if (Le.kind !== "out-of-bounds" && st && !Ge.current && !Le.isTouch)
      return;
    const We = (pt, Ln) => {
      sn((xt) => xt === pt || (xt == null ? void 0 : xt[0][0]) === (pt == null ? void 0 : pt[0][0]) && (xt == null ? void 0 : xt[0][1]) === (pt == null ? void 0 : pt[0][1]) && ((xt == null ? void 0 : xt[1][0]) === (pt == null ? void 0 : pt[1][0]) && (xt == null ? void 0 : xt[1][1]) === (pt == null ? void 0 : pt[1][1]) || !Ln) ? xt : pt);
    };
    if (!K1(Le, $i.current))
      zt(void 0), L == null || L(Le), We(Le.kind === rl ? void 0 : [Le.location, [Le.localEventX, Le.localEventY]], !0), $i.current = Le;
    else if (Le.kind === "cell" || Le.kind === Mi || Le.kind === Br) {
      let pt = !1, Ln = !0;
      if (Le.kind === "cell") {
        const Yt = h(Le.location);
        Ln = ((Gt = kt(Yt)) == null ? void 0 : Gt.needsHoverPosition) ?? Yt.kind === $e.Custom, pt = Ln;
      } else
        pt = !0;
      const xt = [Le.location, [Le.localEventX, Le.localEventY]];
      We(xt, Ln), qt.current = xt, pt && Sn(new Rs([Le.location]));
    }
    const It = Le.location[0] >= (re ? 0 : 1);
    we(Le.kind === Mi && Le.isEdge && It && se === !0), Ur(Le.kind === "cell" && Le.isFillHandle), M == null || M(V), O(Le);
  }, [
    q,
    Et,
    re,
    se,
    M,
    O,
    L,
    h,
    kt,
    Sn
  ]);
  tr("pointermove", or, pe, !0);
  const fo = w.useCallback((V) => {
    const be = ft.current;
    if (be === null)
      return;
    let ot, st;
    T.current !== void 0 && (ot = Mt(be, T.current.cell[0], T.current.cell[1]), st = T.current.cell), F == null || F({
      bounds: ot,
      stopPropagation: () => V.stopPropagation(),
      preventDefault: () => V.preventDefault(),
      cancel: () => {
      },
      ctrlKey: V.ctrlKey,
      metaKey: V.metaKey,
      shiftKey: V.shiftKey,
      altKey: V.altKey,
      key: V.key,
      keyCode: V.keyCode,
      rawEvent: V,
      location: st
    });
  }, [F, T, Mt]), en = w.useCallback((V) => {
    const be = ft.current;
    if (be === null)
      return;
    let ot, st;
    T.current !== void 0 && (ot = Mt(be, T.current.cell[0], T.current.cell[1]), st = T.current.cell), N == null || N({
      bounds: ot,
      stopPropagation: () => V.stopPropagation(),
      preventDefault: () => V.preventDefault(),
      cancel: () => {
      },
      ctrlKey: V.ctrlKey,
      metaKey: V.metaKey,
      shiftKey: V.shiftKey,
      altKey: V.altKey,
      key: V.key,
      keyCode: V.keyCode,
      rawEvent: V,
      location: st
    });
  }, [N, T, Mt]), Fi = w.useCallback((V) => {
    if (ft.current = V, G !== void 0 && (G.current = V), Ve != null && Ve.eventTarget)
      Ot.current = Ve.eventTarget;
    else if (V === null)
      Ot.current = window;
    else {
      const be = V.getRootNode();
      be === document && (Ot.current = window), Ot.current = be;
    }
  }, [G, Ve == null ? void 0 : Ve.eventTarget]), Gs = w.useCallback((V) => {
    const be = ft.current;
    if (be === null || K === !1 || Q) {
      V.preventDefault();
      return;
    }
    let ot, st;
    const Le = Et(be, V.clientX, V.clientY);
    if (K !== !0 && Le.kind !== K) {
      V.preventDefault();
      return;
    }
    const We = (Yt, Ft) => {
      ot = Yt, st = Ft;
    };
    let It, Gt, pt;
    const Ln = (Yt, Ft, Ht) => {
      It = Yt, Gt = Ft, pt = Ht;
    };
    let xt = !1;
    if (j == null || j({
      ...Le,
      setData: We,
      setDragImage: Ln,
      preventDefault: () => xt = !0,
      defaultPrevented: () => xt
    }), !xt && ot !== void 0 && st !== void 0 && V.dataTransfer !== null)
      if (V.dataTransfer.setData(ot, st), V.dataTransfer.effectAllowed = "copyLink", It !== void 0 && Gt !== void 0 && pt !== void 0)
        V.dataTransfer.setDragImage(It, Gt, pt);
      else {
        const [Yt, Ft] = Le.location;
        if (Ft !== void 0) {
          const Ht = document.createElement("canvas"), Lt = Mt(be, Yt, Ft);
          mr(Lt !== void 0);
          const Vt = Math.ceil(window.devicePixelRatio ?? 1);
          Ht.width = Lt.width * Vt, Ht.height = Lt.height * Vt;
          const En = Ht.getContext("2d");
          En !== null && (En.scale(Vt, Vt), En.textBaseline = "middle", Ft === -1 ? (En.font = Be.headerFontFull, En.fillStyle = Be.bgHeader, En.fillRect(0, 0, Ht.width, Ht.height), O1(En, 0, 0, Lt.width, Lt.height, ht[Yt], !1, Be, !1, void 0, void 0, !1, 0, xe, _e, !1)) : (En.font = Be.baseFontFull, En.fillStyle = Be.bgCell, En.fillRect(0, 0, Ht.width, Ht.height), P1(En, h([Yt, Ft]), 0, Ft, !1, !1, 0, 0, Lt.width, Lt.height, !1, Be, Be.bgCell, ke, xe, 1, void 0, !1, 0, void 0, void 0, void 0, Gn, kt, () => {
          }))), Ht.style.left = "-100%", Ht.style.position = "absolute", Ht.style.width = `${Lt.width}px`, Ht.style.height = `${Lt.height}px`, document.body.append(Ht), V.dataTransfer.setDragImage(Ht, Lt.width / 2, Lt.height / 2), window.setTimeout(() => {
            Ht.remove();
          }, 0);
        }
      }
    else
      V.preventDefault();
  }, [
    K,
    Q,
    Et,
    j,
    Mt,
    Be,
    ht,
    xe,
    _e,
    h,
    ke,
    Gn,
    kt
  ]);
  tr("dragstart", Gs, (q == null ? void 0 : q.current) ?? null, !1, !1);
  const ho = w.useRef(), Tl = w.useCallback((V) => {
    const be = ft.current;
    if (Fe !== void 0 && V.preventDefault(), be === null || Ke === void 0)
      return;
    const ot = Et(be, V.clientX, V.clientY), [st, Le] = ot.location, We = st - (re ? 0 : 1), [It, Gt] = ho.current ?? [];
    (It !== We || Gt !== Le) && (ho.current = [We, Le], Ke([We, Le], V.dataTransfer));
  }, [re, Et, Ke, Fe]);
  tr("dragover", Tl, (q == null ? void 0 : q.current) ?? null, !1, !1);
  const El = w.useCallback(() => {
    ho.current = void 0, ee == null || ee();
  }, [ee]);
  tr("dragend", El, (q == null ? void 0 : q.current) ?? null, !1, !1);
  const Xr = w.useCallback((V) => {
    const be = ft.current;
    if (be === null || Fe === void 0)
      return;
    V.preventDefault();
    const ot = Et(be, V.clientX, V.clientY), [st, Le] = ot.location, We = st - (re ? 0 : 1);
    Fe([We, Le], V.dataTransfer);
  }, [re, Et, Fe]);
  tr("drop", Xr, (q == null ? void 0 : q.current) ?? null, !1, !1);
  const bi = w.useCallback(() => {
    ze == null || ze();
  }, [ze]);
  tr("dragleave", bi, (q == null ? void 0 : q.current) ?? null, !1, !1);
  const pr = w.useRef(T);
  pr.current = T;
  const ie = w.useRef(null), wn = w.useCallback((V) => {
    var be;
    ft.current === null || !ft.current.contains(document.activeElement) || (V === null && pr.current.current !== void 0 ? (be = G == null ? void 0 : G.current) == null || be.focus({
      preventScroll: !0
    }) : V !== null && V.focus({
      preventScroll: !0
    }), ie.current = V);
  }, [G]);
  w.useImperativeHandle(e, () => ({
    focus: () => {
      var be;
      const V = ie.current;
      V === null || !document.contains(V) ? (be = G == null ? void 0 : G.current) == null || be.focus({
        preventScroll: !0
      }) : V.focus({
        preventScroll: !0
      });
    },
    getBounds: (V, be) => {
      if (!(G === void 0 || G.current === null))
        return Mt(G.current, V ?? 0, be ?? -1);
    },
    damage: Pr,
    getMouseArgsForPosition: (V, be, ot) => {
      if (!(G === void 0 || G.current === null))
        return Et(G.current, V, be, ot);
    }
  }), [G, Pr, Mt, Et]);
  const oi = w.useRef(), Ml = fT(() => {
    var Gt, pt, Ln;
    if (n < 50 || (Ve == null ? void 0 : Ve.disableAccessibilityTree) === !0)
      return null;
    let V = Mf(ht, dt, n, W, et);
    const be = re ? 0 : -1;
    !re && ((Gt = V[0]) == null ? void 0 : Gt.sourceIndex) === 0 && (V = V.slice(1));
    const [ot, st] = ((pt = T.current) == null ? void 0 : pt.cell) ?? [], Le = (Ln = T.current) == null ? void 0 : Ln.range, We = V.map((xt) => xt.sourceIndex), It = Yi(a, Math.min(f, a + i));
    return ot !== void 0 && st !== void 0 && !(We.includes(ot) && It.includes(st)) && wn(null), w.createElement(
      "table",
      { key: "access-tree", role: "grid", "aria-rowcount": f + 1, "aria-multiselectable": "true", "aria-colcount": ht.length + be },
      w.createElement(
        "thead",
        { role: "rowgroup" },
        w.createElement("tr", { role: "row", "aria-rowindex": 1 }, V.map((xt) => w.createElement("th", { role: "columnheader", "aria-selected": T.columns.hasIndex(xt.sourceIndex), "aria-colindex": xt.sourceIndex + 1 + be, tabIndex: -1, onFocus: (Yt) => {
          if (Yt.target !== ie.current)
            return Ae == null ? void 0 : Ae([xt.sourceIndex, -1]);
        }, key: xt.sourceIndex }, xt.title)))
      ),
      w.createElement("tbody", { role: "rowgroup" }, It.map((xt) => w.createElement("tr", { role: "row", "aria-selected": T.rows.hasIndex(xt), key: xt, "aria-rowindex": xt + 2 }, V.map((Yt) => {
        const Ft = Yt.sourceIndex, Ht = qr(Ft, xt), Lt = ot === Ft && st === xt, Vt = Le !== void 0 && Ft >= Le.x && Ft < Le.x + Le.width && xt >= Le.y && xt < Le.y + Le.height, En = `glide-cell-${Ft}-${xt}`, Dr = [Ft, xt], Nr = h(Dr, !0);
        return w.createElement("td", { key: Ht, role: "gridcell", "aria-colindex": Ft + 1 + be, "aria-selected": Vt, "aria-readonly": _o(Nr) || !Eo(Nr), id: En, "data-testid": En, onClick: () => {
          const xn = G == null ? void 0 : G.current;
          if (xn != null)
            return F == null ? void 0 : F({
              bounds: Mt(xn, Ft, xt),
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
          if (!(xn.target === ie.current || ((An = oi.current) == null ? void 0 : An[0]) === Ft && ((an = oi.current) == null ? void 0 : an[1]) === xt))
            return oi.current = Dr, Ae == null ? void 0 : Ae(Dr);
        }, ref: Lt ? wn : void 0, tabIndex: -1 }, sA(Nr, kt));
      }))))
    );
  }, [
    n,
    ht,
    dt,
    W,
    et,
    f,
    a,
    i,
    T,
    wn,
    h,
    G,
    F,
    Mt,
    Ae
  ], 200), Hi = D === 0 || !z ? 0 : dt > D ? 1 : Er(-et / 100, 0, 1), Il = -a * 32 + Ct, po = S ? Er(-Il / 100, 0, 1) : 0, Fh = w.useMemo(() => {
    if (!Hi && !po)
      return null;
    const V = {
      position: "absolute",
      top: 0,
      left: Tt,
      width: n - Tt,
      height: r,
      opacity: Hi,
      pointerEvents: "none",
      transition: gt ? void 0 : "opacity 0.2s",
      boxShadow: "inset 13px 0 10px -13px rgba(0, 0, 0, 0.2)"
    }, be = {
      position: "absolute",
      top: Te,
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
      Hi > 0 && w.createElement("div", { id: "shadow-x", style: V }),
      po > 0 && w.createElement("div", { id: "shadow-y", style: be })
    );
  }, [Hi, po, Tt, n, gt, Te, r, Se]), de = w.useMemo(() => ({
    position: "absolute",
    top: 0,
    left: 0
  }), []);
  return w.createElement(
    w.Fragment,
    null,
    w.createElement("canvas", { "data-testid": "data-grid-canvas", tabIndex: 0, onKeyDown: fo, onKeyUp: en, onFocus: C, onBlur: E, ref: Fi, style: Jt }, Ml),
    w.createElement("canvas", { ref: qe, style: de }),
    Fh
  );
}, lA = w.memo(w.forwardRef(aA));
function hs(t, e, n, r) {
  return Er(Math.round(e - (t.growOffset ?? 0)), Math.ceil(n), Math.floor(r));
}
const cA = (t) => {
  const [e, n] = w.useState(), [r, i] = w.useState(), [o, s] = w.useState(), [a, l] = w.useState(), [c, u] = w.useState(!1), [d, f] = w.useState(), [h, p] = w.useState(), [g, y] = w.useState(), [m, b] = w.useState(!1), [C, E] = w.useState(), { onHeaderMenuClick: v, onHeaderIndicatorClick: T, getCellContent: D, onColumnMoved: P, onColumnResize: k, onColumnResizeStart: z, onColumnResizeEnd: S, gridRef: x, maxColumnWidth: I, minColumnWidth: _, onRowMoved: M, lockColumns: O, onColumnProposeMove: L, onMouseDown: W, onMouseUp: re, onItemHovered: F, onDragStart: N, canvasRef: te } = t, G = (k ?? S ?? z) !== void 0, { columns: j, selection: ee } = t, q = ee.columns, Q = w.useCallback((ne) => {
    const [_e, Ae] = ne.location;
    o !== void 0 && a !== _e && _e >= O ? (u(!0), l(_e)) : h !== void 0 && Ae !== void 0 ? (b(!0), y(Math.max(0, Ae))) : r === void 0 && !c && !m && (F == null || F(ne));
  }, [o, h, a, F, O, r, c, m]), X = P !== void 0, J = w.useCallback((ne) => {
    var _e;
    if (ne.button === 0) {
      const [Ae, Ke] = ne.location;
      if (ne.kind === "out-of-bounds" && ne.isEdge && G) {
        const Fe = (_e = x == null ? void 0 : x.current) == null ? void 0 : _e.getBounds(j.length - 1, -1);
        Fe !== void 0 && (n(Fe.x), i(j.length - 1));
      } else if (ne.kind === "header" && Ae >= O) {
        const Fe = te == null ? void 0 : te.current;
        if (ne.isEdge && G && Fe) {
          n(ne.bounds.x), i(Ae);
          const Je = Fe.getBoundingClientRect().width / Fe.offsetWidth, gt = ne.bounds.width / Je;
          z == null || z(j[Ae], gt, Ae, gt + (j[Ae].growOffset ?? 0));
        } else ne.kind === "header" && X && (f(ne.bounds.x), s(Ae));
      } else ne.kind === "cell" && O > 0 && Ae === 0 && Ke !== void 0 && M !== void 0 && (E(ne.bounds.y), p(Ke));
    }
    W == null || W(ne);
  }, [W, G, O, M, x, j, X, z, te]), K = w.useCallback((ne, _e) => {
    c || m || v == null || v(ne, _e);
  }, [c, m, v]), se = w.useCallback((ne, _e) => {
    c || m || T == null || T(ne, _e);
  }, [c, m, T]), le = w.useRef(-1), Ce = w.useCallback(() => {
    le.current = -1, p(void 0), y(void 0), E(void 0), b(!1), s(void 0), l(void 0), f(void 0), u(!1), i(void 0), n(void 0);
  }, []), Re = w.useCallback((ne, _e) => {
    if (ne.button === 0) {
      if (r !== void 0) {
        if ((q == null ? void 0 : q.hasIndex(r)) === !0)
          for (const Ke of q) {
            if (Ke === r)
              continue;
            const Fe = j[Ke], ze = hs(Fe, le.current, _, I);
            k == null || k(Fe, ze, Ke, ze + (Fe.growOffset ?? 0));
          }
        const Ae = hs(j[r], le.current, _, I);
        if (S == null || S(j[r], Ae, r, Ae + (j[r].growOffset ?? 0)), q.hasIndex(r))
          for (const Ke of q) {
            if (Ke === r)
              continue;
            const Fe = j[Ke], ze = hs(Fe, le.current, _, I);
            S == null || S(Fe, ze, Ke, ze + (Fe.growOffset ?? 0));
          }
      }
      Ce(), o !== void 0 && a !== void 0 && (L == null ? void 0 : L(o, a)) !== !1 && (P == null || P(o, a)), h !== void 0 && g !== void 0 && (M == null || M(h, g));
    }
    re == null || re(ne, _e);
  }, [
    re,
    r,
    o,
    a,
    h,
    g,
    q,
    S,
    j,
    _,
    I,
    k,
    P,
    M,
    Ce,
    L
  ]), Be = w.useMemo(() => {
    if (!(o === void 0 || a === void 0) && o !== a && (L == null ? void 0 : L(o, a)) !== !1)
      return {
        src: o,
        dest: a
      };
  }, [o, a, L]), rt = w.useCallback((ne) => {
    const _e = te == null ? void 0 : te.current;
    if (o !== void 0 && d !== void 0)
      Math.abs(ne.clientX - d) > 20 && u(!0);
    else if (h !== void 0 && C !== void 0)
      Math.abs(ne.clientY - C) > 20 && b(!0);
    else if (r !== void 0 && e !== void 0 && _e) {
      const Ke = _e.getBoundingClientRect().width / _e.offsetWidth, Fe = (ne.clientX - e) / Ke, ze = j[r], Je = hs(ze, Fe, _, I);
      if (k == null || k(ze, Je, r, Je + (ze.growOffset ?? 0)), le.current = Fe, (q == null ? void 0 : q.first()) === r)
        for (const gt of q) {
          if (gt === r)
            continue;
          const Se = j[gt], Ve = hs(Se, le.current, _, I);
          k == null || k(Se, Ve, gt, Ve + (Se.growOffset ?? 0));
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
    I,
    k,
    q,
    te
  ]), mt = w.useCallback((ne, _e) => {
    if (h === void 0 || g === void 0)
      return D(ne, _e);
    let [Ae, Ke] = ne;
    return Ke === g ? Ke = h : (Ke > g && (Ke -= 1), Ke >= h && (Ke += 1)), D([Ae, Ke], _e);
  }, [h, g, D]), ut = w.useCallback((ne) => {
    N == null || N(ne), ne.defaultPrevented() || Ce();
  }, [Ce, N]);
  return w.createElement(lA, { accessibilityHeight: t.accessibilityHeight, canvasRef: t.canvasRef, cellXOffset: t.cellXOffset, cellYOffset: t.cellYOffset, columns: t.columns, disabledRows: t.disabledRows, drawFocusRing: t.drawFocusRing, drawHeader: t.drawHeader, drawCell: t.drawCell, enableGroups: t.enableGroups, eventTargetRef: t.eventTargetRef, experimental: t.experimental, fillHandle: t.fillHandle, firstColAccessible: t.firstColAccessible, fixedShadowX: t.fixedShadowX, fixedShadowY: t.fixedShadowY, freezeColumns: t.freezeColumns, getCellRenderer: t.getCellRenderer, getGroupDetails: t.getGroupDetails, getRowThemeOverride: t.getRowThemeOverride, groupHeaderHeight: t.groupHeaderHeight, headerHeight: t.headerHeight, headerIcons: t.headerIcons, height: t.height, highlightRegions: t.highlightRegions, imageWindowLoader: t.imageWindowLoader, resizeColumn: r, isDraggable: t.isDraggable, isFilling: t.isFilling, isFocused: t.isFocused, onCanvasBlur: t.onCanvasBlur, onCanvasFocused: t.onCanvasFocused, onCellFocused: t.onCellFocused, onContextMenu: t.onContextMenu, onDragEnd: t.onDragEnd, onDragLeave: t.onDragLeave, onDragOverCell: t.onDragOverCell, onDrop: t.onDrop, onKeyDown: t.onKeyDown, onKeyUp: t.onKeyUp, onMouseMove: t.onMouseMove, prelightCells: t.prelightCells, rowHeight: t.rowHeight, rows: t.rows, selection: t.selection, smoothScrollX: t.smoothScrollX, smoothScrollY: t.smoothScrollY, theme: t.theme, freezeTrailingRows: t.freezeTrailingRows, hasAppendRow: t.hasAppendRow, translateX: t.translateX, translateY: t.translateY, resizeIndicator: t.resizeIndicator, verticalBorder: t.verticalBorder, width: t.width, getCellContent: mt, isResizing: r !== void 0, onHeaderMenuClick: K, onHeaderIndicatorClick: se, isDragging: c, onItemHovered: Q, onDragStart: ut, onMouseDown: J, allowResize: G, onMouseUp: Re, dragAndDropState: Be, onMouseMoveRaw: rt, ref: x });
};
function uA(t) {
  const e = Y(null), [n, r] = Xe({
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
const dA = (t, e, n) => {
  const r = Y(null), i = Y(null), o = Y(null), s = Y(0), a = Y(e);
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
}, fA = () => (t) => t.isSafari ? "scroll" : "auto", hA = /* @__PURE__ */ wr("div")({
  name: "ScrollRegionStyle",
  class: "gdg-s1dgczr6",
  propsAsIs: !1,
  vars: {
    "s1dgczr6-0": [fA()]
  }
}), pA = 33554400, gA = 5e6;
function mA(t) {
  const [e, n] = w.useState(!1), r = typeof window > "u" ? null : window, i = w.useRef(0);
  return tr("touchstart", w.useCallback(() => {
    window.clearTimeout(i.current), n(!0);
  }, []), r, !0, !1), tr("touchend", w.useCallback((o) => {
    o.touches.length === 0 && (i.current = window.setTimeout(() => n(!1), t));
  }, [t]), r, !0, !1), e;
}
const yA = (t) => {
  var ee, q;
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
  } = t, y = [], m = (f == null ? void 0 : f.sticky) ?? !1, b = (f == null ? void 0 : f.fill) ?? !1, C = w.useRef(0), E = w.useRef(0), v = w.useRef(null), T = typeof window > "u" ? 1 : window.devicePixelRatio, D = w.useRef(T);
  w.useEffect(() => {
    if (D.current !== T) {
      C.current = 0, E.current = 0, D.current = T;
      const Q = v.current;
      Q !== null && M.current(Q.scrollLeft, Q.scrollTop);
    }
  }, [T]);
  const P = w.useRef({
    scrollLeft: 0,
    scrollTop: 0,
    lockDirection: void 0
  }), k = w.useRef(null), z = mA(200), [S, x] = w.useState(!0), I = w.useRef(0);
  w.useLayoutEffect(() => {
    if (!S || z || P.current.lockDirection === void 0) return;
    const Q = v.current;
    if (Q === null) return;
    const [X, J] = P.current.lockDirection;
    X !== void 0 ? Q.scrollLeft = X : J !== void 0 && (Q.scrollTop = J), P.current.lockDirection = void 0;
  }, [z, S]);
  const _ = w.useCallback((Q, X) => {
    var Ae;
    const J = v.current;
    if (J === null) return;
    X = X ?? J.scrollTop, Q = Q ?? J.scrollLeft;
    const K = P.current.scrollTop, se = P.current.scrollLeft, le = Q - se, Ce = X - K;
    z && le !== 0 && Ce !== 0 && (Math.abs(le) > 3 || Math.abs(Ce) > 3) && l && P.current.lockDirection === void 0 && (P.current.lockDirection = Math.abs(le) < Math.abs(Ce) ? [se, void 0] : [void 0, K]);
    const Re = P.current.lockDirection;
    Q = (Re == null ? void 0 : Re[0]) ?? Q, X = (Re == null ? void 0 : Re[1]) ?? X, P.current.scrollLeft = Q, P.current.scrollTop = X;
    const Be = J.clientWidth, rt = J.clientHeight, mt = X, ut = E.current - mt, ne = J.scrollHeight - rt;
    E.current = mt;
    let _e;
    if (ne > 0 && r > J.scrollHeight + 5)
      if (Math.abs(ut) > 2e3 || mt === 0 || mt === ne) {
        const Ke = Math.max(0, Math.min(1, mt / ne)), Fe = r - rt;
        _e = Ke * Fe, C.current = _e;
      } else
        C.current -= ut, _e = C.current;
    else
      _e = mt, C.current = _e;
    _e = Math.max(0, Math.min(_e, r - rt)), C.current = _e, Re !== void 0 && (window.clearTimeout(I.current), x(!1), I.current = window.setTimeout(() => x(!0), 200)), o({
      x: Q,
      y: _e,
      width: Be - u,
      height: rt - c,
      paddingRight: ((Ae = k.current) == null ? void 0 : Ae.clientWidth) ?? 0
    });
  }, [c, u, r, o, l, z]);
  dA(h && tl.value, _, v);
  const M = w.useRef(_);
  M.current = _;
  const O = w.useRef(), L = w.useRef(!1);
  w.useLayoutEffect(() => {
    L.current ? _() : L.current = !0;
  }, [_, c, u]);
  const W = w.useCallback((Q) => {
    v.current = Q, p !== void 0 && (p.current = Q);
  }, [p]);
  let re = 0, F = 0;
  const N = Math.min(r, pA);
  for (y.push(w.createElement("div", {
    key: re++,
    style: {
      width: i,
      height: 0
    }
  })); F < N; ) {
    const Q = Math.min(gA, N - F);
    y.push(w.createElement("div", {
      key: re++,
      style: {
        width: 0,
        height: Q
      }
    })), F += Q;
  }
  const {
    ref: te,
    width: G,
    height: j
  } = uA(g);
  return typeof window < "u" && (((ee = O.current) == null ? void 0 : ee.height) !== j || ((q = O.current) == null ? void 0 : q.width) !== G) && (window.setTimeout(() => M.current(), 0), O.current = {
    width: G,
    height: j
  }), (G ?? 0) === 0 || (j ?? 0) === 0 ? w.createElement("div", {
    ref: te
  }) : w.createElement("div", {
    ref: te
  }, w.createElement(hA, {
    isSafari: tl.value
  }, w.createElement("div", {
    className: "dvn-underlay"
  }, e), w.createElement("div", {
    ref: W,
    style: O.current,
    draggable: s,
    onDragStart: (Q) => {
      s || (Q.stopPropagation(), Q.preventDefault());
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
    ref: k,
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
}, bA = (t) => {
  const { columns: e, rows: n, rowHeight: r, headerHeight: i, groupHeaderHeight: o, enableGroups: s, freezeColumns: a, experimental: l, nonGrowWidth: c, clientSize: u, className: d, onVisibleRegionChanged: f, scrollRef: h, preventDiagonalScrolling: p, rightElement: g, rightElementProps: y, overscrollX: m, overscrollY: b, initialSize: C, smoothScrollX: E = !1, smoothScrollY: v = !1, isDraggable: T } = t, { paddingRight: D, paddingBottom: P } = l ?? {}, [k, z] = u, S = w.useRef(), x = w.useRef(), I = w.useRef(), _ = w.useRef(), M = c + Math.max(0, m ?? 0);
  let O = s ? i + o : i;
  if (typeof r == "number")
    O += n * r;
  else
    for (let F = 0; F < n; F++)
      O += r(F);
  b !== void 0 && (O += b);
  const L = w.useRef(), W = w.useCallback(() => {
    var se, le;
    if (L.current === void 0)
      return;
    const F = { ...L.current };
    let N = 0, te = F.x < 0 ? -F.x : 0, G = 0, j = 0;
    F.x = F.x < 0 ? 0 : F.x;
    let ee = 0;
    for (let Ce = 0; Ce < a; Ce++)
      ee += e[Ce].width;
    for (const Ce of e) {
      const Re = N - ee;
      if (F.x >= Re + Ce.width)
        N += Ce.width, j++, G++;
      else if (F.x > Re)
        N += Ce.width, E ? te += Re - F.x : j++, G++;
      else if (F.x + F.width > Re)
        N += Ce.width, G++;
      else
        break;
    }
    let q = 0, Q = 0, X = 0;
    if (typeof r == "number")
      v ? (Q = Math.floor(F.y / r), q = Q * r - F.y) : Q = Math.ceil(F.y / r), X = Math.ceil(F.height / r) + Q, q < 0 && X++;
    else {
      let Ce = 0;
      for (let Re = 0; Re < n; Re++) {
        const Be = r(Re), rt = Ce + (v ? 0 : Be / 2);
        if (F.y >= Ce + Be)
          Ce += Be, Q++, X++;
        else if (F.y > rt)
          Ce += Be, v ? q += rt - F.y : Q++, X++;
        else if (F.y + F.height > Be / 2 + Ce)
          Ce += Be, X++;
        else
          break;
      }
    }
    Q = Math.max(0, Math.min(Q, n - 1)), X = Math.max(Q, Math.min(X, n));
    const J = {
      x: j,
      y: Q,
      width: G - j,
      height: X - Q
    }, K = S.current;
    (K === void 0 || K.y !== J.y || K.x !== J.x || K.height !== J.height || K.width !== J.width || x.current !== te || I.current !== q || F.width !== ((se = _.current) == null ? void 0 : se[0]) || F.height !== ((le = _.current) == null ? void 0 : le[1])) && (f == null || f({
      x: j,
      y: Q,
      width: G - j,
      height: X - Q
    }, F.width, F.height, F.paddingRight ?? 0, te, q), S.current = J, x.current = te, I.current = q, _.current = [F.width, F.height]);
  }, [e, r, n, f, a, E, v]), re = w.useCallback((F) => {
    L.current = F, W();
  }, [W]);
  return w.useEffect(() => {
    W();
  }, [W]), w.createElement(
    yA,
    { scrollRef: h, className: d, kineticScrollPerfHack: l == null ? void 0 : l.kineticScrollPerfHack, preventDiagonalScrolling: p, draggable: T === !0 || typeof T == "string", scrollWidth: M + (D ?? 0), scrollHeight: O + (P ?? 0), clientHeight: z, rightElement: g, paddingBottom: P, paddingRight: D, rightElementProps: y, update: re, initialSize: C },
    w.createElement(cA, { eventTargetRef: h, width: k, height: z, accessibilityHeight: t.accessibilityHeight, canvasRef: t.canvasRef, cellXOffset: t.cellXOffset, cellYOffset: t.cellYOffset, columns: t.columns, disabledRows: t.disabledRows, enableGroups: t.enableGroups, fillHandle: t.fillHandle, firstColAccessible: t.firstColAccessible, fixedShadowX: t.fixedShadowX, fixedShadowY: t.fixedShadowY, freezeColumns: t.freezeColumns, getCellContent: t.getCellContent, getCellRenderer: t.getCellRenderer, getGroupDetails: t.getGroupDetails, getRowThemeOverride: t.getRowThemeOverride, groupHeaderHeight: t.groupHeaderHeight, headerHeight: t.headerHeight, highlightRegions: t.highlightRegions, imageWindowLoader: t.imageWindowLoader, isFilling: t.isFilling, isFocused: t.isFocused, lockColumns: t.lockColumns, maxColumnWidth: t.maxColumnWidth, minColumnWidth: t.minColumnWidth, onHeaderMenuClick: t.onHeaderMenuClick, onHeaderIndicatorClick: t.onHeaderIndicatorClick, onMouseMove: t.onMouseMove, prelightCells: t.prelightCells, rowHeight: t.rowHeight, rows: t.rows, selection: t.selection, theme: t.theme, freezeTrailingRows: t.freezeTrailingRows, hasAppendRow: t.hasAppendRow, translateX: t.translateX, translateY: t.translateY, onColumnProposeMove: t.onColumnProposeMove, verticalBorder: t.verticalBorder, drawFocusRing: t.drawFocusRing, drawHeader: t.drawHeader, drawCell: t.drawCell, experimental: t.experimental, gridRef: t.gridRef, headerIcons: t.headerIcons, isDraggable: t.isDraggable, onCanvasBlur: t.onCanvasBlur, onCanvasFocused: t.onCanvasFocused, onCellFocused: t.onCellFocused, onColumnMoved: t.onColumnMoved, onColumnResize: t.onColumnResize, onColumnResizeEnd: t.onColumnResizeEnd, onColumnResizeStart: t.onColumnResizeStart, onContextMenu: t.onContextMenu, onDragEnd: t.onDragEnd, onDragLeave: t.onDragLeave, onDragOverCell: t.onDragOverCell, onDragStart: t.onDragStart, onDrop: t.onDrop, onItemHovered: t.onItemHovered, onKeyDown: t.onKeyDown, onKeyUp: t.onKeyUp, onMouseDown: t.onMouseDown, onMouseUp: t.onMouseUp, onRowMoved: t.onRowMoved, smoothScrollX: t.smoothScrollX, smoothScrollY: t.smoothScrollY, resizeIndicator: t.resizeIndicator })
  );
}, vA = /* @__PURE__ */ wr("div")({
  name: "SearchWrapper",
  class: "gdg-seveqep",
  propsAsIs: !1
}), wA = w.createElement(
  "svg",
  { className: "button-icon", viewBox: "0 0 512 512" },
  w.createElement("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "48", d: "M112 244l144-144 144 144M256 120v292" })
), xA = w.createElement(
  "svg",
  { className: "button-icon", viewBox: "0 0 512 512" },
  w.createElement("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "48", d: "M112 268l144 144 144-144M256 392V100" })
), kA = w.createElement(
  "svg",
  { className: "button-icon", viewBox: "0 0 512 512" },
  w.createElement("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32", d: "M368 368L144 144M368 144L144 368" })
), SA = 10, CA = (t) => {
  const { canvasRef: e, cellYOffset: n, rows: r, columns: i, searchInputRef: o, searchValue: s, searchResults: a, onSearchValueChange: l, getCellsForSelection: c, onSearchResultsChanged: u, showSearch: d = !1, onSearchClose: f } = t, [h] = w.useState(() => "search-box-" + Math.round(Math.random() * 1e3)), [p, g] = w.useState(""), y = s ?? p, m = w.useCallback((N) => {
    g(N), l == null || l(N);
  }, [l]), [b, C] = w.useState(), E = w.useRef(b);
  E.current = b, w.useEffect(() => {
    a !== void 0 && (a.length > 0 ? C((N) => ({
      rowsSearched: r,
      results: a.length,
      selectedIndex: (N == null ? void 0 : N.selectedIndex) ?? -1
    })) : C(void 0));
  }, [r, a]);
  const v = w.useRef();
  v.current === void 0 && (v.current = new AbortController());
  const T = w.useRef(), [D, P] = w.useState([]), k = a ?? D, z = w.useCallback(() => {
    T.current !== void 0 && (window.cancelAnimationFrame(T.current), T.current = void 0), v.current !== void 0 && v.current.abort(), v.current = new AbortController();
  }, []), S = w.useRef(n);
  S.current = n;
  const x = w.useCallback((N) => {
    const te = new RegExp(N.replace(/([$()*+.?[\\\]^{|}-])/g, "\\$1"), "i");
    let G = S.current, j = Math.min(10, r), ee = 0;
    C(void 0), P([]);
    const q = [], Q = async () => {
      var mt;
      if (c === void 0)
        return;
      const X = performance.now(), J = r - ee;
      let K = c({
        x: 0,
        y: G,
        width: i.length,
        height: Math.min(j, J, r - G)
      }, v.current.signal);
      typeof K == "function" && (K = await K());
      let se = !1;
      for (const [ut, ne] of K.entries())
        for (const [_e, Ae] of ne.entries()) {
          let Ke;
          switch (Ae.kind) {
            case $e.Text:
            case $e.Number:
              Ke = Ae.displayData;
              break;
            case $e.Uri:
            case $e.Markdown:
              Ke = Ae.data;
              break;
            case $e.Boolean:
              Ke = typeof Ae.data == "boolean" ? Ae.data.toString() : void 0;
              break;
            case $e.Image:
            case $e.Bubble:
              Ke = Ae.data.join("🐳");
              break;
            case $e.Custom:
              Ke = Ae.copyData;
              break;
          }
          Ke !== void 0 && te.test(Ke) && (q.push([_e, ut + G]), se = !0);
        }
      const le = performance.now();
      se && P([...q]), ee += K.length, mr(ee <= r);
      const Ce = ((mt = E.current) == null ? void 0 : mt.selectedIndex) ?? -1;
      C({
        results: q.length,
        rowsSearched: ee,
        selectedIndex: Ce
      }), u == null || u(q, Ce), G + j >= r ? G = 0 : G += j;
      const Re = le - X, Be = Math.max(Re, 1), rt = SA / Be;
      j = Math.ceil(j * rt), ee < r && q.length < 1e3 && (T.current = window.requestAnimationFrame(Q));
    };
    z(), T.current = window.requestAnimationFrame(Q);
  }, [z, i.length, c, u, r]), I = w.useCallback(() => {
    var N;
    f == null || f(), C(void 0), P([]), u == null || u([], -1), z(), (N = e == null ? void 0 : e.current) == null || N.focus();
  }, [z, e, f, u]), _ = w.useCallback((N) => {
    m(N.target.value), a === void 0 && (N.target.value === "" ? (C(void 0), P([]), z()) : x(N.target.value));
  }, [x, z, m, a]);
  w.useEffect(() => {
    o.current !== null && (m(""), C(void 0), D.length > 0 && (P([]), u == null || u([], -1)), d ? o.current.focus({ preventScroll: !0 }) : z());
  }, [d, o]);
  const M = w.useCallback((N) => {
    var G;
    if ((G = N == null ? void 0 : N.stopPropagation) == null || G.call(N), b === void 0 || b.results === 0)
      return;
    const te = (b.selectedIndex + 1) % b.results;
    C({
      ...b,
      selectedIndex: te
    }), u == null || u(k, te);
  }, [b, u, k]), O = w.useCallback((N) => {
    var G;
    if ((G = N == null ? void 0 : N.stopPropagation) == null || G.call(N), b === void 0 || b.results === 0)
      return;
    let te = (b.selectedIndex - 1) % b.results;
    te < 0 && (te += b.results), C({
      ...b,
      selectedIndex: te
    }), u == null || u(k, te);
  }, [u, k, b]), L = w.useCallback((N) => {
    (N.ctrlKey || N.metaKey) && N.nativeEvent.code === "KeyF" || N.key === "Escape" ? (I(), N.stopPropagation(), N.preventDefault()) : N.key === "Enter" && (N.shiftKey ? O() : M());
  }, [I, M, O]);
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
      vA,
      { className: "gdg-search-bar" + (d ? "" : " out"), onMouseDown: te, onMouseMove: te, onMouseUp: te, onClick: te },
      w.createElement(
        "div",
        { className: "gdg-search-bar-inner" },
        w.createElement("input", { id: h, "aria-hidden": !d, "data-testid": "search-input", ref: o, onChange: _, value: y, tabIndex: d ? void 0 : -1, onKeyDownCapture: L }),
        w.createElement("button", { type: "button", "aria-label": "Previous Result", "aria-hidden": !d, tabIndex: d ? void 0 : -1, onClick: O, disabled: ((b == null ? void 0 : b.results) ?? 0) === 0 }, wA),
        w.createElement("button", { type: "button", "aria-label": "Next Result", "aria-hidden": !d, tabIndex: d ? void 0 : -1, onClick: M, disabled: ((b == null ? void 0 : b.results) ?? 0) === 0 }, xA),
        f !== void 0 && w.createElement("button", { type: "button", "aria-label": "Close Search", "aria-hidden": !d, "data-testid": "search-close-button", tabIndex: d ? void 0 : -1, onClick: I }, kA)
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
    M,
    f,
    I
  ]);
  return w.createElement(
    w.Fragment,
    null,
    w.createElement(bA, { prelightCells: k, accessibilityHeight: t.accessibilityHeight, canvasRef: t.canvasRef, cellXOffset: t.cellXOffset, cellYOffset: t.cellYOffset, className: t.className, clientSize: t.clientSize, columns: t.columns, disabledRows: t.disabledRows, enableGroups: t.enableGroups, fillHandle: t.fillHandle, firstColAccessible: t.firstColAccessible, nonGrowWidth: t.nonGrowWidth, fixedShadowX: t.fixedShadowX, fixedShadowY: t.fixedShadowY, freezeColumns: t.freezeColumns, getCellContent: t.getCellContent, getCellRenderer: t.getCellRenderer, getGroupDetails: t.getGroupDetails, getRowThemeOverride: t.getRowThemeOverride, groupHeaderHeight: t.groupHeaderHeight, headerHeight: t.headerHeight, highlightRegions: t.highlightRegions, imageWindowLoader: t.imageWindowLoader, initialSize: t.initialSize, isFilling: t.isFilling, isFocused: t.isFocused, lockColumns: t.lockColumns, maxColumnWidth: t.maxColumnWidth, minColumnWidth: t.minColumnWidth, onHeaderMenuClick: t.onHeaderMenuClick, onHeaderIndicatorClick: t.onHeaderIndicatorClick, onMouseMove: t.onMouseMove, onVisibleRegionChanged: t.onVisibleRegionChanged, overscrollX: t.overscrollX, overscrollY: t.overscrollY, preventDiagonalScrolling: t.preventDiagonalScrolling, rightElement: t.rightElement, rightElementProps: t.rightElementProps, rowHeight: t.rowHeight, rows: t.rows, scrollRef: t.scrollRef, selection: t.selection, theme: t.theme, freezeTrailingRows: t.freezeTrailingRows, hasAppendRow: t.hasAppendRow, translateX: t.translateX, translateY: t.translateY, verticalBorder: t.verticalBorder, onColumnProposeMove: t.onColumnProposeMove, drawFocusRing: t.drawFocusRing, drawCell: t.drawCell, drawHeader: t.drawHeader, experimental: t.experimental, gridRef: t.gridRef, headerIcons: t.headerIcons, isDraggable: t.isDraggable, onCanvasBlur: t.onCanvasBlur, onCanvasFocused: t.onCanvasFocused, onCellFocused: t.onCellFocused, onColumnMoved: t.onColumnMoved, onColumnResize: t.onColumnResize, onColumnResizeEnd: t.onColumnResizeEnd, onColumnResizeStart: t.onColumnResizeStart, onContextMenu: t.onContextMenu, onDragEnd: t.onDragEnd, onDragLeave: t.onDragLeave, onDragOverCell: t.onDragOverCell, onDragStart: t.onDragStart, onDrop: t.onDrop, onItemHovered: t.onItemHovered, onKeyDown: t.onKeyDown, onKeyUp: t.onKeyUp, onMouseDown: t.onMouseDown, onMouseUp: t.onMouseUp, onRowMoved: t.onRowMoved, smoothScrollX: t.smoothScrollX, smoothScrollY: t.smoothScrollY, resizeIndicator: t.resizeIndicator }),
    F
  );
};
class RA extends w.PureComponent {
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
const TA = () => (t) => Math.max(16, t.targetHeight - 10), EA = /* @__PURE__ */ wr("input")({
  name: "RenameInput",
  class: "gdg-r17m35ur",
  propsAsIs: !1,
  vars: {
    "r17m35ur-0": [TA(), "px"]
  }
}), MA = (t) => {
  const {
    bounds: e,
    group: n,
    onClose: r,
    canvasBounds: i,
    onFinish: o
  } = t, [s, a] = _t.useState(n);
  return _t.createElement(RA, {
    style: {
      position: "absolute",
      left: e.x - i.left + 1,
      top: e.y - i.top,
      width: e.width - 2,
      height: e.height
    },
    className: "gdg-c1tqibwd",
    onClickOutside: r
  }, _t.createElement(EA, {
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
function IA(t, e) {
  return t === void 0 ? !1 : t.length > 1 && t.startsWith("_") ? Number.parseInt(t.slice(1)) === e.keyCode : t.length === 1 && t >= "a" && t <= "z" ? t.toUpperCase().codePointAt(0) === e.keyCode : t === e.key;
}
function Kt(t, e, n) {
  const r = U1(t, e);
  return r && (n.didMatch = !0), r;
}
function U1(t, e) {
  if (t.length === 0)
    return !1;
  if (t.includes("|")) {
    const l = t.split("|");
    for (const c of l)
      if (U1(c, e))
        return !0;
    return !1;
  }
  let n = !1, r = !1, i = !1, o = !1;
  const s = t.split("+"), a = s.pop();
  if (!IA(a, e))
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
function AA(t, e, n, r, i, o, s) {
  const a = _t.useCallback((u, d, f, h) => {
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
      columns: g ? t.columns : rn.empty(),
      rows: y ? t.rows : rn.empty()
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
  ]), l = _t.useCallback((u, d, f) => {
    u = u ?? t.rows, d !== void 0 && (u = u.add(d));
    let h;
    if (i === "exclusive" && u.length > 0)
      h = {
        current: void 0,
        columns: rn.empty(),
        rows: u
      };
    else {
      const p = f && n === "mixed" || n === "additive", g = f && r === "mixed" || r === "additive";
      h = {
        current: p ? t.current : void 0,
        columns: g ? t.columns : rn.empty(),
        rows: u
      };
    }
    e(h, !1);
  }, [r, t, n, i, e]), c = _t.useCallback((u, d, f) => {
    u = u ?? t.columns, d !== void 0 && (u = u.add(d));
    let h;
    if (r === "exclusive" && u.length > 0)
      h = {
        current: void 0,
        rows: rn.empty(),
        columns: u
      };
    else {
      const p = f && n === "mixed" || n === "additive", g = f && i === "mixed" || i === "additive";
      h = {
        current: p ? t.current : void 0,
        rows: g ? t.rows : rn.empty(),
        columns: u
      };
    }
    e(h, !1);
  }, [r, t, n, i, e]);
  return [a, l, c];
}
function _A(t, e, n, r, i) {
  const o = w.useCallback((c) => {
    if (t === !0) {
      const u = [];
      for (let d = c.y; d < c.y + c.height; d++) {
        const f = [];
        for (let h = c.x; h < c.x + c.width; h++)
          h < 0 || d >= i ? f.push({
            kind: $e.Loading,
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
          { kind: $e.Loading, allowOverlay: !1 },
          ...f
        ])
      ) : d.map((f) => [{ kind: $e.Loading, allowOverlay: !1 }, ...f]);
    }
    return s(u, r.signal);
  }, [r.signal, s, n]);
  return [t !== void 0 ? a : void 0, s];
}
function PA(t) {
  if (t.copyData !== void 0)
    return {
      formatted: t.copyData,
      rawValue: t.copyData,
      format: "string",
      // Do not escape the copy value if it was explicitly specified via copyData:
      doNotEscape: !0
    };
  switch (t.kind) {
    case $e.Boolean:
      return {
        formatted: t.data === !0 ? "TRUE" : t.data === !1 ? "FALSE" : t.data === hh ? "INDETERMINATE" : "",
        rawValue: t.data,
        format: "boolean"
      };
    case $e.Custom:
      return {
        formatted: t.copyData,
        rawValue: t.copyData,
        format: "string"
      };
    case $e.Image:
    case $e.Bubble:
      return {
        formatted: t.data,
        rawValue: t.data,
        format: "string-array"
      };
    case $e.Drilldown:
      return {
        formatted: t.data.map((e) => e.text),
        rawValue: t.data.map((e) => e.text),
        format: "string-array"
      };
    case $e.Text:
      return {
        formatted: t.displayData ?? t.data,
        rawValue: t.data,
        format: "string"
      };
    case $e.Uri:
      return {
        formatted: t.displayData ?? t.data,
        rawValue: t.data,
        format: "url"
      };
    case $e.Markdown:
    case $e.RowID:
      return {
        formatted: t.data,
        rawValue: t.data,
        format: "string"
      };
    case $e.Number:
      return {
        formatted: t.displayData,
        rawValue: t.data,
        format: "number"
      };
    case $e.Loading:
      return {
        formatted: "#LOADING",
        rawValue: "",
        format: "string"
      };
    case $e.Protected:
      return {
        formatted: "************",
        rawValue: "",
        format: "string"
      };
    default:
      Ds();
  }
}
function DA(t, e) {
  return t.map((r, i) => {
    const o = e[i];
    return r.map((s) => s.span !== void 0 && s.span[0] !== o ? {
      formatted: "",
      rawValue: "",
      format: "string"
    } : PA(s));
  });
}
function Ty(t, e) {
  return (e ? /[\t\n",]/ : /[\t\n"]/).test(t) && (t = `"${t.replace(/"/g, '""')}"`), t;
}
function NA(t) {
  var n;
  const e = [];
  for (const r of t) {
    const i = [];
    for (const o of r)
      o.format === "url" ? i.push(((n = o.rawValue) == null ? void 0 : n.toString()) ?? "") : o.format === "string-array" ? i.push(o.formatted.map((s) => Ty(s, !0)).join(",")) : i.push(o.doNotEscape === !0 ? o.formatted : Ty(o.formatted, !1));
    e.push(i.join("	"));
  }
  return e.join(`
`);
}
function rf(t) {
  return t.replace(/\t/g, "    ").replace(/ {2,}/g, (e) => "<span> </span>".repeat(e.length));
}
function Ey(t) {
  return '"' + t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + '"';
}
function OA(t) {
  return t.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
function zA(t) {
  var n;
  const e = [];
  e.push('<style type="text/css"><!--br {mso-data-placement:same-cell;}--></style>', "<table><tbody>");
  for (const r of t) {
    e.push("<tr>");
    for (const i of r) {
      const o = `gdg-format="${i.format}"`;
      i.format === "url" ? e.push(`<td ${o}><a href="${i.rawValue}">${rf(i.formatted)}</a></td>`) : i.format === "string-array" ? e.push(`<td ${o}><ol>${i.formatted.map((s, a) => `<li gdg-raw-value=${Ey(i.rawValue[a])}>` + rf(s) + "</li>").join("")}</ol></td>`) : e.push(`<td gdg-raw-value=${Ey(((n = i.rawValue) == null ? void 0 : n.toString()) ?? "")} ${o}>${rf(i.formatted)}</td>`);
    }
    e.push("</tr>");
  }
  return e.push("</tbody></table>"), e.join("");
}
function LA(t, e) {
  const n = DA(t, e), r = NA(n), i = zA(n);
  return {
    textPlain: r,
    textHtml: i
  };
}
function My(t) {
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
          rawValue: OA(h),
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
function $A(t, e, n, r, i) {
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
function Iy(t) {
  return t.startsWith('"') && t.endsWith('"') && (t = t.slice(1, -1).replace(/""/g, '"')), t;
}
function FA(t) {
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
`) && (r.push(Iy(t.slice(i, s))), i = s + 1, a === `
` && (n.push(r), r = [])), o = e.None);
        break;
    }
    s++;
  }
  return i < t.length && r.push(Iy(t.slice(i, t.length))), n.push(r), n.map((a) => a.map((l) => ({ rawValue: l, formatted: l, format: "string" })));
}
function Ay(t, e, n) {
  var a;
  const r = LA(t, e), i = (l) => {
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
function G1(t) {
  return t !== !0;
}
function _y(t) {
  return typeof t == "string" ? t : `${t}px`;
}
const HA = () => (t) => t.innerWidth, BA = () => (t) => t.innerHeight, qA = /* @__PURE__ */ wr("div")({
  name: "Wrapper",
  class: "gdg-wmyidgi",
  propsAsIs: !1,
  vars: {
    "wmyidgi-0": [HA()],
    "wmyidgi-1": [BA()]
  }
}), WA = (t) => {
  const {
    inWidth: e,
    inHeight: n,
    children: r,
    ...i
  } = t;
  return w.createElement(qA, {
    innerHeight: _y(n),
    innerWidth: _y(e),
    ...i
  }, r);
}, jA = 2, KA = 1300;
function UA(t, e, n) {
  const r = _t.useRef(0), [i, o] = t ?? [0, 0];
  _t.useEffect(() => {
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
          r.current = Math.min(1, r.current + d / KA);
          const f = r.current ** 1.618 * d * jA;
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
function GA({ rowHeight: t, headerHeight: e, groupHeaderHeight: n, theme: r, overscrollX: i, overscrollY: o, scaleToRem: s, remSize: a }) {
  const [l, c, u, d, f, h] = _t.useMemo(() => {
    if (!s || a === 16)
      return [t, e, n, r, i, o];
    const p = a / 16, g = t, y = Ph();
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
const Ti = {
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
function Py(t) {
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
function YA(t) {
  const e = yT(t);
  return _t.useMemo(() => {
    if (e === void 0)
      return Py(Ti);
    const n = {
      ...e,
      goToNextPage: (e == null ? void 0 : e.goToNextPage) ?? (e == null ? void 0 : e.pageDown) ?? Ti.goToNextPage,
      goToPreviousPage: (e == null ? void 0 : e.goToPreviousPage) ?? (e == null ? void 0 : e.pageUp) ?? Ti.goToPreviousPage,
      goToFirstCell: (e == null ? void 0 : e.goToFirstCell) ?? (e == null ? void 0 : e.first) ?? Ti.goToFirstCell,
      goToLastCell: (e == null ? void 0 : e.goToLastCell) ?? (e == null ? void 0 : e.last) ?? Ti.goToLastCell,
      selectToFirstCell: (e == null ? void 0 : e.selectToFirstCell) ?? (e == null ? void 0 : e.first) ?? Ti.selectToFirstCell,
      selectToLastCell: (e == null ? void 0 : e.selectToLastCell) ?? (e == null ? void 0 : e.last) ?? Ti.selectToLastCell
    };
    return Py({
      ...Ti,
      ...n
    });
  }, [e]);
}
function XA(t) {
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
function $h(t, e) {
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
  const i = XA(t.groups);
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
function Pf(t, e) {
  if (e === void 0 || $h.length === 0)
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
function VA(t, e, n, r) {
  const i = _t.useMemo(() => t === void 0 ? void 0 : $h(t, e), [t, e]), o = _t.useMemo(() => i == null ? void 0 : i.reduce((u, d) => (u[d.rowIndex] = d, u), {}), [i]), s = _t.useMemo(() => i === void 0 ? e : i.reduce((u, d) => u + (d.isCollapsed ? 1 : d.rows + 1), 0), [i, e]), a = _t.useMemo(() => t === void 0 || typeof n == "number" && t.height === n ? n : (u) => o != null && o[u] ? t.height : typeof n == "number" ? n : n(u), [o, t, n]), l = _t.useCallback((u) => {
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
  }, [i]), c = Ei(r ?? (t == null ? void 0 : t.themeOverride), _t.useCallback((u) => {
    if (t === void 0)
      return r == null ? void 0 : r(u, u, u);
    if (r === void 0 && (t == null ? void 0 : t.themeOverride) === void 0)
      return;
    const { isGroupHeader: d, contentIndex: f, groupIndex: h } = Pf(u, i);
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
function JA(t, e) {
  const n = _t.useMemo(() => t === void 0 ? void 0 : $h(t, e), [t, e]);
  return {
    getRowGroupingForPath: X1,
    updateRowGroupingByPath: Y1,
    mapper: _t.useCallback((r) => {
      if (typeof r == "number")
        return Pf(r, n);
      const i = Pf(r[1], n);
      return {
        ...i,
        originalIndex: [r[0], i.originalIndex]
      };
    }, [n])
  };
}
function Y1(t, e, n) {
  const [r, ...i] = e;
  return i[0] === -1 ? t.map((o, s) => s === r ? { ...o, ...n } : o) : t.map((o, s) => s === r ? { ...o, subGroups: Y1(o.subGroups ?? [], i, n) } : o);
}
function X1(t, e) {
  const [n, ...r] = e;
  return r[0] === -1 ? t[n] : X1(t[n].subGroups ?? [], r);
}
function ZA(t, e) {
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
function QA(t, e, n, r, i) {
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
  }), [r, s, o]), [l, c, u] = mT(a), d = w.useRef(i);
  d.current = i;
  const f = ZA(null, (g) => {
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
const e_ = w.lazy(async () => await import("./data-grid-overlay-editor-DXGTORUb.js"));
let t_ = 0;
function n_(t) {
  return YE(o0(o0(t).filter((e) => e.span !== void 0).map((e) => {
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
  kind: $e.Loading,
  allowOverlay: !1
}, Ia = {
  columns: rn.empty(),
  rows: rn.empty(),
  current: void 0
}, r_ = (t, e) => {
  var Qh, ep, tp;
  const [n, r] = w.useState(Ia), [i, o] = w.useState(), s = w.useRef(null), a = w.useRef(null), [l, c] = w.useState(), u = w.useRef(), d = typeof window > "u" ? null : window, { imageEditorOverride: f, getRowThemeOverride: h, markdownDivCreateNode: p, width: g, height: y, columns: m, rows: b, getCellContent: C, onCellClicked: E, onCellActivated: v, onFillPattern: T, onFinishedEditing: D, coercePasteValue: P, drawHeader: k, drawCell: z, editorBloom: S, onHeaderClicked: x, onColumnProposeMove: I, rangeSelectionColumnSpanning: _ = !0, spanRangeBehavior: M = "default", onGroupHeaderClicked: O, onCellContextMenu: L, className: W, onHeaderContextMenu: re, getCellsForSelection: F, onGroupHeaderContextMenu: N, onGroupHeaderRenamed: te, onCellEdited: G, onCellsEdited: j, onSearchResultsChanged: ee, searchResults: q, onSearchValueChange: Q, searchValue: X, onKeyDown: J, onKeyUp: K, keybindings: se, editOnType: le = !0, onRowAppended: Ce, onColumnAppended: Re, onColumnMoved: Be, validateCell: rt, highlightRegions: mt, rangeSelect: ut = "rect", columnSelect: ne = "multi", rowSelect: _e = "multi", rangeSelectionBlending: Ae = "exclusive", columnSelectionBlending: Ke = "exclusive", rowSelectionBlending: Fe = "exclusive", onDelete: ze, onDragStart: Je, onMouseMove: gt, onPaste: Se, copyHeaders: Ve = !1, freezeColumns: kt = 0, cellActivationBehavior: yt = "second-click", rowSelectionMode: et = "auto", columnSelectionMode: Ct = "auto", onHeaderMenuClick: dt, onHeaderIndicatorClick: ft, getGroupDetails: Ot, rowGrouping: pe, onSearchClose: ke, onItemHovered: ue, onSelectionCleared: ye, showSearch: He, onVisibleRegionChanged: Rt, gridSelection: Pt, onGridSelectionChange: it, minColumnWidth: sn = 50, maxColumnWidth: he = 500, maxColumnAutoWidth: we, provideEditor: qe, trailingRowOptions: Ue, freezeTrailingRows: zt = 0, allowedFillDirections: tn = "orthogonal", scrollOffsetX: bt, scrollOffsetY: Z, verticalBorder: xe, onDragOverCell: Te, onDrop: Ze, onColumnResize: vt, onColumnResizeEnd: Bt, onColumnResizeStart: ht, customRenderers: Tt, fillHandle: Mt, experimental: Et, fixedShadowX: nn, fixedShadowY: xr, headerIcons: qt, imageWindowLoader: yn, initialSize: On, isDraggable: Gn, onDragLeave: Xt, onRowMoved: zn, overscrollX: dr, overscrollY: bn, preventDiagonalScrolling: fr, rightElement: Yn, rightElementProps: dn, trapFocus: Sn = !1, smoothScrollX: rr, smoothScrollY: Pr, scaleToRem: gi = !1, rowHeight: Ur = 34, headerHeight: Qn = 36, groupHeaderHeight: kr = Qn, theme: mi, isOutsideClick: Gr, renderers: ir, resizeIndicator: Me, scrollToActiveCell: tt = !0, drawFocusRing: Dt = !0, portalElementRef: vn } = t, Jt = Dt === "no-editor" ? i === void 0 : Dt, Zt = typeof t.rowMarkers == "string" ? void 0 : t.rowMarkers, In = (Zt == null ? void 0 : Zt.kind) ?? t.rowMarkers ?? "none", Yr = (Zt == null ? void 0 : Zt.width) ?? t.rowMarkerWidth, $ = (Zt == null ? void 0 : Zt.startIndex) ?? t.rowMarkerStartIndex ?? 1, ve = (Zt == null ? void 0 : Zt.theme) ?? t.rowMarkerTheme, Oe = Zt == null ? void 0 : Zt.headerTheme, Ge = Zt == null ? void 0 : Zt.headerAlwaysVisible, nt = _e !== "multi" || (Zt == null ? void 0 : Zt.headerDisabled) === !0, Wt = (Zt == null ? void 0 : Zt.checkboxStyle) ?? "square", Wn = Math.max(sn, 20), jn = Math.max(he, Wn), hr = Math.max(we ?? jn, Wn), yi = w.useMemo(() => typeof window > "u" ? { fontSize: "16px" } : window.getComputedStyle(document.documentElement), []), { rows: wt, rowNumberMapper: Li, rowHeight: $i, getRowThemeOverride: or } = VA(pe, b, Ur, h), fo = w.useMemo(() => Number.parseFloat(yi.fontSize), [yi]), { rowHeight: en, headerHeight: Fi, groupHeaderHeight: Gs, theme: ho, overscrollX: Tl, overscrollY: El } = GA({
    groupHeaderHeight: kr,
    headerHeight: Qn,
    overscrollX: dr,
    overscrollY: bn,
    remSize: fo,
    rowHeight: $i,
    scaleToRem: gi,
    theme: mi
  }), Xr = YA(se), bi = Yr ?? (b > 1e4 ? 48 : b > 1e3 ? 44 : b > 100 ? 36 : 32), pr = In !== "none", ie = pr ? 1 : 0, wn = Ue !== void 0, oi = (Ue == null ? void 0 : Ue.sticky) === !0, [Ml, Hi] = w.useState(!1), Il = He ?? Ml, po = w.useCallback(() => {
    ke !== void 0 ? ke() : Hi(!1);
  }, [ke]), de = w.useMemo(() => Pt === void 0 ? void 0 : Ea(Pt, ie), [Pt, ie]) ?? n, V = w.useRef();
  V.current === void 0 && (V.current = new AbortController()), w.useEffect(() => () => V == null ? void 0 : V.current.abort(), []);
  const [be, ot] = _A(F, C, ie, V.current, wt), st = w.useCallback((R, H, B) => {
    if (rt === void 0)
      return !0;
    const U = [R[0] - ie, R[1]];
    return rt == null ? void 0 : rt(U, H, B);
  }, [ie, rt]), Le = w.useRef(Pt), We = w.useCallback((R, H) => {
    H && (R = $A(R, be, ie, M, V.current)), it !== void 0 ? (Le.current = Ea(R, -ie), it(Le.current)) : r(R);
  }, [it, be, ie, M]), It = Ei(vt, w.useCallback((R, H, B, U) => {
    vt == null || vt(m[B - ie], H, B - ie, U);
  }, [vt, ie, m])), Gt = Ei(Bt, w.useCallback((R, H, B, U) => {
    Bt == null || Bt(m[B - ie], H, B - ie, U);
  }, [Bt, ie, m])), pt = Ei(ht, w.useCallback((R, H, B, U) => {
    ht == null || ht(m[B - ie], H, B - ie, U);
  }, [ht, ie, m])), Ln = Ei(k, w.useCallback((R, H) => (k == null ? void 0 : k({ ...R, columnIndex: R.columnIndex - ie }, H)) ?? !1, [k, ie])), xt = Ei(z, w.useCallback((R, H) => (z == null ? void 0 : z({ ...R, col: R.col - ie }, H)) ?? !1, [z, ie])), Yt = w.useCallback((R) => {
    if (ze !== void 0) {
      const H = ze(Ea(R, -ie));
      return typeof H == "boolean" ? H : Ea(H, ie);
    }
    return !0;
  }, [ze, ie]), [Ft, Ht, Lt] = AA(de, We, Ae, Ke, Fe, ut, _), Vt = w.useMemo(() => fi(Ph(), ho), [ho]), [En, Dr] = w.useState([0, 0, 0]), Nr = w.useMemo(() => {
    if (ir === void 0)
      return {};
    const R = {};
    for (const H of ir)
      R[H.kind] = H;
    return R;
  }, [ir]), xn = w.useCallback((R) => R.kind !== $e.Custom ? Nr[R.kind] : Tt == null ? void 0 : Tt.find((H) => H.isMatch(R)), [Tt, Nr]);
  let { sizedColumns: An, nonGrowWidth: an } = _E(m, wt, ot, En[0] - (ie === 0 ? 0 : bi) - En[2], Wn, hr, Vt, xn, V.current);
  In !== "none" && (an += bi);
  const Sr = w.useMemo(() => An.some((R) => R.group !== void 0), [An]), Xn = Sr ? Fi + Gs : Fi, go = de.rows.length, si = In === "none" ? void 0 : go === 0 ? !1 : go === wt ? !0 : void 0, jt = w.useMemo(() => In === "none" ? An : [
    {
      title: "",
      width: bi,
      icon: void 0,
      hasMenu: !1,
      style: "normal",
      themeOverride: ve,
      rowMarker: Wt,
      rowMarkerChecked: si,
      headerRowMarkerTheme: Oe,
      headerRowMarkerAlwaysVisible: Ge,
      headerRowMarkerDisabled: nt
    },
    ...An
  ], [
    In,
    An,
    bi,
    ve,
    Wt,
    si,
    Oe,
    Ge,
    nt
  ]), $n = w.useRef({
    height: 1,
    width: 1,
    x: 0,
    y: 0
  }), Bi = w.useRef(!1), { setVisibleRegion: vi, visibleRegion: ai, scrollRef: hn } = QA(bt, Z, en, $n, () => Bi.current = !0);
  $n.current = ai;
  const nw = ai.x + ie, Ys = ai.y, qn = w.useRef(null), er = w.useCallback((R) => {
    var H;
    R === !0 ? (H = qn.current) == null || H.focus() : window.requestAnimationFrame(() => {
      var B;
      (B = qn.current) == null || B.focus();
    });
  }, []), Vn = wn ? wt + 1 : wt, Cr = w.useCallback((R) => {
    const H = ie === 0 ? R : R.map((U) => ({
      ...U,
      location: [U.location[0] - ie, U.location[1]]
    })), B = j == null ? void 0 : j(H);
    if (B !== !0)
      for (const U of H)
        G == null || G(U.location, U.value);
    return B;
  }, [G, j, ie]), [qi, Al] = w.useState(), Xs = de.current !== void 0 && de.current.range.width * de.current.range.height > 1 ? de.current.range : void 0, mo = Jt ? (Qh = de.current) == null ? void 0 : Qh.cell : void 0, Vs = mo == null ? void 0 : mo[0], Js = mo == null ? void 0 : mo[1], rw = w.useMemo(() => {
    if ((mt === void 0 || mt.length === 0) && (Xs ?? Vs ?? Js ?? qi) === void 0)
      return;
    const R = [];
    if (mt !== void 0)
      for (const H of mt) {
        const B = jt.length - H.range.x - ie;
        B > 0 && R.push({
          color: H.color,
          range: {
            ...H.range,
            x: H.range.x + ie,
            width: Math.min(B, H.range.width)
          },
          style: H.style
        });
      }
    return qi !== void 0 && R.push({
      color: io(Vt.accentColor, 0),
      range: qi,
      style: "dashed"
    }), Xs !== void 0 && R.push({
      color: io(Vt.accentColor, 0.5),
      range: Xs,
      style: "solid-outline"
    }), Vs !== void 0 && Js !== void 0 && R.push({
      color: Vt.accentColor,
      range: {
        x: Vs,
        y: Js,
        width: 1,
        height: 1
      },
      style: "solid-outline"
    }), R.length > 0 ? R : void 0;
  }, [
    qi,
    Xs,
    Vs,
    Js,
    mt,
    jt.length,
    Vt.accentColor,
    ie
  ]), Hh = w.useRef(jt);
  Hh.current = jt;
  const sr = w.useCallback(([R, H], B = !1) => {
    var ge, ae, ce, me, Ee, je, at;
    const U = wn && H === Vn - 1;
    if (R === 0 && pr) {
      if (U)
        return Ma;
      const Pe = Li(H);
      return Pe === void 0 ? Ma : {
        kind: Ir.Marker,
        allowOverlay: !1,
        checkboxStyle: Wt,
        checked: (de == null ? void 0 : de.rows.hasIndex(H)) === !0,
        markerKind: In === "clickable-number" ? "number" : In,
        row: $ + Pe,
        drawHandle: zn !== void 0,
        cursor: In === "clickable-number" ? "pointer" : void 0
      };
    } else if (U) {
      const At = R === ie ? (Ue == null ? void 0 : Ue.hint) ?? "" : "", lt = Hh.current[R];
      if (((ge = lt == null ? void 0 : lt.trailingRowOptions) == null ? void 0 : ge.disabled) === !0)
        return Ma;
      {
        const $t = ((ae = lt == null ? void 0 : lt.trailingRowOptions) == null ? void 0 : ae.hint) ?? At, Nt = ((ce = lt == null ? void 0 : lt.trailingRowOptions) == null ? void 0 : ce.addIcon) ?? (Ue == null ? void 0 : Ue.addIcon);
        return {
          kind: Ir.NewRow,
          hint: $t,
          allowOverlay: !1,
          icon: Nt
        };
      }
    } else {
      const Pe = R - ie;
      if (B || (Et == null ? void 0 : Et.strict) === !0) {
        const lt = $n.current, $t = lt.x > Pe || Pe > lt.x + lt.width || lt.y > H || H > lt.y + lt.height || H >= Nl.current, Nt = Pe === ((Ee = (me = lt.extras) == null ? void 0 : me.selected) == null ? void 0 : Ee[0]) && H === ((je = lt.extras) == null ? void 0 : je.selected[1]);
        let St = !1;
        if (((at = lt.extras) == null ? void 0 : at.freezeRegions) !== void 0) {
          for (const Qt of lt.extras.freezeRegions)
            if (Qi(Qt, Pe, H)) {
              St = !0;
              break;
            }
        }
        if ($t && !Nt && !St)
          return Ma;
      }
      let At = C([Pe, H]);
      return ie !== 0 && At.span !== void 0 && (At = {
        ...At,
        span: [At.span[0] + ie, At.span[1] + ie]
      }), At;
    }
  }, [
    wn,
    Vn,
    pr,
    Li,
    Wt,
    de == null ? void 0 : de.rows,
    In,
    $,
    zn,
    ie,
    Ue == null ? void 0 : Ue.hint,
    Ue == null ? void 0 : Ue.addIcon,
    Et == null ? void 0 : Et.strict,
    C
  ]), _l = w.useCallback((R) => {
    let H = (Ot == null ? void 0 : Ot(R)) ?? { name: R };
    return te !== void 0 && R !== "" && (H = {
      icon: H.icon,
      name: H.name,
      overrideTheme: H.overrideTheme,
      actions: [
        ...H.actions ?? [],
        {
          title: "Rename",
          icon: "renameIcon",
          onClick: (B) => zl({
            group: H.name,
            bounds: B.bounds
          })
        }
      ]
    }), H;
  }, [Ot, te]), Uo = w.useCallback((R) => {
    var ce;
    const [H, B] = R.cell, U = jt[H], oe = (U == null ? void 0 : U.group) !== void 0 ? (ce = _l(U.group)) == null ? void 0 : ce.overrideTheme : void 0, ge = U == null ? void 0 : U.themeOverride, ae = or == null ? void 0 : or(B);
    o({
      ...R,
      theme: fi(Vt, oe, ge, ae, R.content.themeOverride)
    });
  }, [or, jt, _l, Vt]), yo = w.useCallback((R, H, B) => {
    var ae;
    if (de.current === void 0)
      return;
    const [U, oe] = de.current.cell, ge = sr([U, oe]);
    if (ge.kind !== $e.Boolean && ge.allowOverlay) {
      let ce = ge;
      if (B !== void 0)
        switch (ce.kind) {
          case $e.Number: {
            const me = DR(() => B === "-" ? -0 : Number.parseFloat(B), 0);
            ce = {
              ...ce,
              data: Number.isNaN(me) ? 0 : me
            };
            break;
          }
          case $e.Text:
          case $e.Markdown:
          case $e.Uri:
            ce = {
              ...ce,
              data: B
            };
            break;
        }
      Uo({
        target: R,
        content: ce,
        initialValue: B,
        cell: [U, oe],
        highlight: B === void 0,
        forceEditMode: B !== void 0,
        activation: H
      });
    } else ge.kind === $e.Boolean && H.inputType === "keyboard" && ge.readonly !== !0 && (Cr([
      {
        location: de.current.cell,
        value: {
          ...ge,
          data: G1(ge.data)
        }
      }
    ]), (ae = qn.current) == null || ae.damage([{ cell: de.current.cell }]));
  }, [sr, de, Cr, Uo]), Bh = w.useCallback((R, H) => {
    var oe;
    const B = (oe = qn.current) == null ? void 0 : oe.getBounds(R, H);
    if (B === void 0 || hn.current === null)
      return;
    const U = sr([R, H]);
    U.allowOverlay && Uo({
      target: B,
      content: U,
      initialValue: void 0,
      highlight: !0,
      cell: [R, H],
      forceEditMode: !0,
      activation: { inputType: "keyboard", key: "Enter" }
    });
  }, [sr, hn, Uo]), Mn = w.useCallback((R, H, B = "both", U = 0, oe = 0, ge = void 0) => {
    if (hn.current !== null) {
      const ae = qn.current, ce = a.current, me = typeof R != "number" ? R.unit === "cell" ? R.amount : void 0 : R, Ee = typeof H != "number" ? H.unit === "cell" ? H.amount : void 0 : H, je = typeof R != "number" && R.unit === "px" ? R.amount : void 0, at = typeof H != "number" && H.unit === "px" ? H.amount : void 0;
      if (ae !== null && ce !== null) {
        let Pe = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        }, At = 0, lt = 0;
        if ((me !== void 0 || Ee !== void 0) && (Pe = ae.getBounds((me ?? 0) + ie, Ee ?? 0) ?? Pe, Pe.width === 0 || Pe.height === 0))
          return;
        const $t = ce.getBoundingClientRect(), Nt = $t.width / ce.offsetWidth;
        if (je !== void 0 && (Pe = {
          ...Pe,
          x: je - $t.left - hn.current.scrollLeft,
          width: 1
        }), at !== void 0 && (Pe = {
          ...Pe,
          y: at + $t.top - hn.current.scrollTop,
          height: 1
        }), Pe !== void 0) {
          const St = {
            x: Pe.x - U,
            y: Pe.y - oe,
            width: Pe.width + 2 * U,
            height: Pe.height + 2 * oe
          };
          let Qt = 0;
          for (let Wl = 0; Wl < kt; Wl++)
            Qt += An[Wl].width;
          let Cn = 0;
          const Fn = zt + (oi ? 1 : 0);
          Fn > 0 && (Cn = uo(Vn, Fn, en));
          let ar = Qt * Nt + $t.left + ie * bi * Nt, Jr = $t.right, Lr = $t.top + Xn * Nt, Zr = $t.bottom - Cn * Nt;
          const ia = Pe.width + U * 2;
          switch (ge == null ? void 0 : ge.hAlign) {
            case "start":
              Jr = ar + ia;
              break;
            case "end":
              ar = Jr - ia;
              break;
            case "center":
              ar = Math.floor((ar + Jr) / 2) - ia / 2, Jr = ar + ia;
              break;
          }
          const oa = Pe.height + oe * 2;
          switch (ge == null ? void 0 : ge.vAlign) {
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
          ar > St.x ? At = St.x - ar : Jr < St.x + St.width && (At = St.x + St.width - Jr), Lr > St.y ? lt = St.y - Lr : Zr < St.y + St.height && (lt = St.y + St.height - Zr), B === "vertical" || typeof R == "number" && R < kt ? At = 0 : (B === "horizontal" || typeof H == "number" && H >= Vn - Fn) && (lt = 0), (At !== 0 || lt !== 0) && (Nt !== 1 && (At /= Nt, lt /= Nt), hn.current.scrollTo({
            left: At + hn.current.scrollLeft,
            top: lt + hn.current.scrollTop,
            behavior: (ge == null ? void 0 : ge.behavior) ?? "auto"
          }));
        }
      }
    }
  }, [
    ie,
    zt,
    bi,
    hn,
    Xn,
    kt,
    An,
    Vn,
    oi,
    en
  ]), Pl = w.useRef(Bh), Dl = w.useRef(C);
  Pl.current = Bh, Dl.current = C;
  const Nl = w.useRef(wt);
  Nl.current = wt;
  const qh = w.useRef(jt.length);
  qh.current = jt.length;
  const wi = w.useCallback(async (R, H = !0, B) => {
    var Ee;
    const U = jt[R];
    if (((Ee = U == null ? void 0 : U.trailingRowOptions) == null ? void 0 : Ee.disabled) === !0)
      return;
    const oe = Ce == null ? void 0 : Ce();
    let ge, ae = !0;
    oe !== void 0 && (ge = await oe, ge === "top" && (ae = !1), typeof ge == "number" && (ae = !1));
    let ce = 0;
    const me = () => {
      if (Nl.current <= wt) {
        ce < 500 && window.setTimeout(me, ce), ce = 50 + ce * 2;
        return;
      }
      const je = typeof ge == "number" ? ge : ae ? wt : 0;
      ra.current(R - ie, je, "both", 0, 0, B ? { behavior: B } : void 0), Ft({
        cell: [R, je],
        range: {
          x: R,
          y: je,
          width: 1,
          height: 1
        }
      }, !1, !1, "edit");
      const at = Dl.current([R - ie, je]);
      at.allowOverlay && Eo(at) && at.readonly !== !0 && H && window.setTimeout(() => {
        Pl.current(R, je);
      }, 0);
    };
    me();
  }, [jt, Ce, ie, wt, Ft]), Zs = w.useCallback(async (R, H = !0) => {
    const B = Re == null ? void 0 : Re();
    let U, oe = !0;
    B !== void 0 && (U = await B, U === "left" && (oe = !1), typeof U == "number" && (oe = !1));
    let ge = 0;
    const ae = () => {
      if (qh.current <= jt.length) {
        ge < 500 && window.setTimeout(ae, ge), ge = 50 + ge * 2;
        return;
      }
      const ce = typeof U == "number" ? U : oe ? jt.length : 0;
      Mn(ce - ie, R), Ft({
        cell: [ce, R],
        range: {
          x: ce,
          y: R,
          width: 1,
          height: 1
        }
      }, !1, !1, "edit");
      const me = Dl.current([ce - ie, R]);
      me.allowOverlay && Eo(me) && me.readonly !== !0 && H && window.setTimeout(() => {
        Pl.current(ce, R);
      }, 0);
    };
    ae();
  }, [jt, Re, ie, Mn, Ft]), bo = w.useCallback((R) => {
    var B, U;
    const H = ((U = (B = An[R]) == null ? void 0 : B.trailingRowOptions) == null ? void 0 : U.targetColumn) ?? (Ue == null ? void 0 : Ue.targetColumn);
    if (typeof H == "number")
      return H + (pr ? 1 : 0);
    if (typeof H == "object") {
      const oe = m.indexOf(H);
      if (oe >= 0)
        return oe + (pr ? 1 : 0);
    }
  }, [An, m, pr, Ue == null ? void 0 : Ue.targetColumn]), xi = w.useRef(), vo = w.useRef(), Go = w.useCallback((R, H) => {
    var oe;
    const [B, U] = H;
    return fi(Vt, (oe = jt[B]) == null ? void 0 : oe.themeOverride, or == null ? void 0 : or(U), R.themeOverride);
  }, [or, jt, Vt]), { mapper: Wi } = JA(pe, b), Or = pe == null ? void 0 : pe.navigationBehavior, Yo = w.useCallback((R) => {
    var Ee, je, at;
    const H = nl.value ? R.metaKey : R.ctrlKey, B = H && _e === "multi", [U, oe] = R.location, ge = de.columns, ae = de.rows, [ce, me] = ((Ee = de.current) == null ? void 0 : Ee.cell) ?? [];
    if (R.kind === "cell") {
      if (vo.current = void 0, ji.current = [U, oe], U === 0 && pr) {
        if (wn === !0 && oe === wt || In === "number" || _e === "none")
          return;
        const Pe = sr(R.location);
        if (Pe.kind !== Ir.Marker)
          return;
        if (zn !== void 0) {
          const $t = xn(Pe);
          mr(($t == null ? void 0 : $t.kind) === Ir.Marker);
          const Nt = (je = $t == null ? void 0 : $t.onClick) == null ? void 0 : je.call($t, {
            ...R,
            cell: Pe,
            posX: R.localEventX,
            posY: R.localEventY,
            bounds: R.bounds,
            theme: Go(Pe, R.location),
            preventDefault: () => {
            }
          });
          if (Nt === void 0 || Nt.checked === Pe.checked)
            return;
        }
        o(void 0), er();
        const At = ae.hasIndex(oe), lt = xi.current;
        if (_e === "multi" && (R.shiftKey || R.isLongTouch === !0) && lt !== void 0 && ae.hasIndex(lt)) {
          const $t = [Math.min(lt, oe), Math.max(lt, oe) + 1];
          B || et === "multi" ? Ht(void 0, $t, !0) : Ht(rn.fromSingleSelection($t), void 0, B);
        } else _e === "multi" && (B || R.isTouch || et === "multi") ? At ? Ht(ae.remove(oe), void 0, !0) : (Ht(void 0, oe, !0), xi.current = oe) : At && ae.length === 1 ? Ht(rn.empty(), void 0, H) : (Ht(rn.fromSingleSelection(oe), void 0, H), xi.current = oe);
      } else if (U >= ie && wn && oe === wt) {
        const Pe = bo(U);
        wi(Pe ?? U);
      } else if (ce !== U || me !== oe) {
        const Pe = sr(R.location), At = xn(Pe);
        if ((At == null ? void 0 : At.onSelect) !== void 0) {
          let Nt = !1;
          if (At.onSelect({
            ...R,
            cell: Pe,
            posX: R.localEventX,
            posY: R.localEventY,
            bounds: R.bounds,
            preventDefault: () => Nt = !0,
            theme: Go(Pe, R.location)
          }), Nt)
            return;
        }
        if (Or === "block" && Wi(oe).isGroupHeader)
          return;
        const lt = oi && oe === wt, $t = oi && de !== void 0 && ((at = de.current) == null ? void 0 : at.cell[1]) === wt;
        if ((R.shiftKey || R.isLongTouch === !0) && ce !== void 0 && me !== void 0 && de.current !== void 0 && !$t) {
          if (lt)
            return;
          const Nt = Math.min(U, ce), St = Math.max(U, ce), Qt = Math.min(oe, me), Cn = Math.max(oe, me);
          Ft({
            ...de.current,
            range: {
              x: Nt,
              y: Qt,
              width: St - Nt + 1,
              height: Cn - Qt + 1
            }
          }, !0, H, "click"), xi.current = void 0, er();
        } else
          Ft({
            cell: [U, oe],
            range: { x: U, y: oe, width: 1, height: 1 }
          }, !0, H, "click"), xi.current = void 0, o(void 0), er();
      }
    } else if (R.kind === "header")
      if (ji.current = [U, oe], o(void 0), pr && U === 0)
        xi.current = void 0, vo.current = void 0, !nt && _e === "multi" && (ae.length !== wt ? Ht(rn.fromSingleSelection([0, wt]), void 0, H) : Ht(rn.empty(), void 0, H), er());
      else {
        const Pe = vo.current;
        if (ne === "multi" && (R.shiftKey || R.isLongTouch === !0) && Pe !== void 0 && ge.hasIndex(Pe)) {
          const At = [Math.min(Pe, U), Math.max(Pe, U) + 1];
          H || R.isTouch || Ct === "multi" ? Lt(void 0, At, H) : Lt(rn.fromSingleSelection(At), void 0, H);
        } else ne === "multi" && (H || R.isTouch || Ct === "multi") ? (ge.hasIndex(U) ? Lt(ge.remove(U), void 0, H) : Lt(void 0, U, H), vo.current = U) : ne !== "none" && (ge.hasIndex(U) ? Lt(ge.remove(U), void 0, H) : Lt(rn.fromSingleSelection(U), void 0, H), vo.current = U);
        xi.current = void 0, er();
      }
    else R.kind === Br ? ji.current = [U, oe] : R.kind === rl && !R.isMaybeScrollbar && (We(Ia, !1), o(void 0), er(), ye == null || ye(), xi.current = void 0, vo.current = void 0);
  }, [
    _e,
    ne,
    de,
    pr,
    ie,
    wn,
    wt,
    In,
    sr,
    zn,
    er,
    et,
    Ct,
    xn,
    Go,
    Ht,
    bo,
    wi,
    Or,
    Wi,
    oi,
    Ft,
    nt,
    Lt,
    We,
    ye
  ]), Xo = w.useRef(!1), ji = w.useRef(), Wh = w.useRef(ai), Rr = w.useRef(), iw = w.useCallback((R) => {
    if (wo.current = !1, Wh.current = $n.current, R.button !== 0 && R.button !== 1) {
      Rr.current = void 0;
      return;
    }
    const H = performance.now();
    Rr.current = {
      button: R.button,
      time: H,
      location: R.location
    }, (R == null ? void 0 : R.kind) === "header" && (Xo.current = !0);
    const B = R.kind === "cell" && R.isFillHandle;
    !B && R.kind !== "cell" && R.isEdge || (c({
      previousSelection: de,
      fillHandle: B
    }), ji.current = void 0, !R.isTouch && R.button === 0 && !B ? Yo(R) : !R.isTouch && R.button === 1 && (ji.current = R.location));
  }, [de, Yo]), [Ol, zl] = w.useState(), jh = w.useCallback((R) => {
    if (R.kind !== Br || ne !== "multi")
      return;
    const H = nl.value ? R.metaKey : R.ctrlKey, [B] = R.location, U = de.columns;
    if (B < ie)
      return;
    const oe = jt[B];
    let ge = B, ae = B;
    for (let ce = B - 1; ce >= ie && Ns(oe.group, jt[ce].group); ce--)
      ge--;
    for (let ce = B + 1; ce < jt.length && Ns(oe.group, jt[ce].group); ce++)
      ae++;
    if (er(), H || R.isTouch || Ct === "multi")
      if (U.hasAll([ge, ae + 1])) {
        let ce = U;
        for (let me = ge; me <= ae; me++)
          ce = ce.remove(me);
        Lt(ce, void 0, H);
      } else
        Lt(void 0, [ge, ae + 1], H);
    else
      Lt(rn.fromSingleSelection([ge, ae + 1]), void 0, H);
  }, [
    ne,
    er,
    de.columns,
    jt,
    ie,
    Lt,
    Ct
  ]), wo = w.useRef(!1), Qs = w.useCallback(async (R) => {
    if (be !== void 0 && It !== void 0) {
      const H = $n.current.y, B = $n.current.height;
      let U = be({
        x: R,
        y: H,
        width: 1,
        height: Math.min(B, wt - H)
      }, V.current.signal);
      typeof U != "object" && (U = await U());
      const oe = An[R - ie], ae = document.createElement("canvas").getContext("2d", { alpha: !1 });
      if (ae !== null) {
        ae.font = Vt.baseFontFull;
        const ce = k1(ae, Vt, oe, 0, U, Wn, jn, !1, xn);
        It == null || It(oe, ce.width, R, ce.width);
      }
    }
  }, [
    An,
    be,
    jn,
    Vt,
    Wn,
    It,
    ie,
    wt,
    xn
  ]), [ow, Ll] = w.useState(), xo = w.useCallback(async (R, H) => {
    var ce, me;
    const B = (ce = R.current) == null ? void 0 : ce.range;
    if (B === void 0 || be === void 0 || H.current === void 0)
      return;
    const U = H.current.range;
    if (T !== void 0) {
      let Ee = !1;
      if (T({
        fillDestination: { ...U, x: U.x - ie },
        patternSource: { ...B, x: B.x - ie },
        preventDefault: () => Ee = !0
      }), Ee)
        return;
    }
    let oe = be(B, V.current.signal);
    typeof oe != "object" && (oe = await oe());
    const ge = oe, ae = [];
    for (let Ee = 0; Ee < U.width; Ee++)
      for (let je = 0; je < U.height; je++) {
        const at = [U.x + Ee, U.y + je];
        if (f1(at, B))
          continue;
        const Pe = ge[je % B.height][Ee % B.width];
        _o(Pe) || !Eo(Pe) || ae.push({
          location: at,
          value: { ...Pe }
        });
      }
    Cr(ae), (me = qn.current) == null || me.damage(ae.map((Ee) => ({
      cell: Ee.location
    })));
  }, [be, Cr, T, ie]), Kh = w.useCallback(() => {
    if (de.current === void 0 || de.current.range.width <= 1)
      return;
    const R = {
      ...de,
      current: {
        ...de.current,
        range: {
          ...de.current.range,
          width: 1
        }
      }
    };
    xo(R, de);
  }, [xo, de]), Uh = w.useCallback(() => {
    if (de.current === void 0 || de.current.range.height <= 1)
      return;
    const R = {
      ...de,
      current: {
        ...de.current,
        range: {
          ...de.current.range,
          height: 1
        }
      }
    };
    xo(R, de);
  }, [xo, de]), sw = w.useCallback((R, H) => {
    var je, at;
    const B = l;
    if (c(void 0), Al(void 0), Ll(void 0), Xo.current = !1, H)
      return;
    if ((B == null ? void 0 : B.fillHandle) === !0 && de.current !== void 0 && ((je = B.previousSelection) == null ? void 0 : je.current) !== void 0) {
      if (qi === void 0)
        return;
      const Pe = {
        ...de,
        current: {
          ...de.current,
          range: _1(B.previousSelection.current.range, qi)
        }
      };
      xo(B.previousSelection, Pe), We(Pe, !0);
      return;
    }
    const [U, oe] = R.location, [ge, ae] = ji.current ?? [], ce = () => {
      wo.current = !0;
    }, me = (Pe) => {
      var lt, $t, Nt;
      const At = Pe.isTouch || ge === U && ae === oe;
      if (At && (E == null || E([U - ie, oe], {
        ...Pe,
        preventDefault: ce
      })), Pe.button === 1)
        return !wo.current;
      if (!wo.current) {
        const St = sr(R.location), Qt = xn(St);
        if (Qt !== void 0 && Qt.onClick !== void 0 && At) {
          const Fn = Qt.onClick({
            ...Pe,
            cell: St,
            posX: Pe.localEventX,
            posY: Pe.localEventY,
            bounds: Pe.bounds,
            theme: Go(St, R.location),
            preventDefault: ce
          });
          Fn !== void 0 && !_o(Fn) && To(Fn) && (Cr([{ location: Pe.location, value: Fn }]), (lt = qn.current) == null || lt.damage([
            {
              cell: Pe.location
            }
          ]));
        }
        if (wo.current || de.current === void 0)
          return !1;
        let Cn = !1;
        switch (St.activationBehaviorOverride ?? yt) {
          case "double-click":
          case "second-click": {
            if (((Nt = ($t = B == null ? void 0 : B.previousSelection) == null ? void 0 : $t.current) == null ? void 0 : Nt.cell) === void 0)
              break;
            const [Fn, ar] = de.current.cell, [Jr, Lr] = B.previousSelection.current.cell;
            Cn = U === Fn && U === Jr && oe === ar && oe === Lr && (Pe.isDoubleClick === !0 || yt === "second-click");
            break;
          }
          case "single-click": {
            Cn = !0;
            break;
          }
        }
        if (Cn) {
          const ar = {
            inputType: "pointer",
            pointerActivation: Pe.isDoubleClick === !0 ? "double-click" : St.activationBehaviorOverride ?? yt,
            pointerType: Pe.isTouch ? "touch" : "mouse"
          };
          return v == null || v([U - ie, oe], ar), yo(Pe.bounds, ar), !0;
        }
      }
      return !1;
    }, Ee = R.location[0] - ie;
    if (R.isTouch) {
      const Pe = $n.current, At = Wh.current;
      if (Pe.x !== At.x || Pe.y !== At.y)
        return;
      if (R.isLongTouch === !0) {
        if (R.kind === "cell" && Ss((at = de.current) == null ? void 0 : at.cell, R.location)) {
          L == null || L([Ee, R.location[1]], {
            ...R,
            preventDefault: ce
          });
          return;
        } else if (R.kind === "header" && de.columns.hasIndex(U)) {
          re == null || re(Ee, { ...R, preventDefault: ce });
          return;
        } else if (R.kind === Br) {
          if (Ee < 0)
            return;
          N == null || N(Ee, { ...R, preventDefault: ce });
          return;
        }
      }
      R.kind === "cell" ? me(R) || Yo(R) : R.kind === Br ? O == null || O(Ee, { ...R, preventDefault: ce }) : (R.kind === Mi && (x == null || x(Ee, {
        ...R,
        preventDefault: ce
      })), Yo(R));
      return;
    }
    if (R.kind === "header") {
      if (Ee < 0)
        return;
      R.isEdge ? R.isDoubleClick === !0 && Qs(U) : R.button === 0 && U === ge && oe === ae && (x == null || x(Ee, { ...R, preventDefault: ce }));
    }
    if (R.kind === Br) {
      if (Ee < 0)
        return;
      R.button === 0 && U === ge && oe === ae && (O == null || O(Ee, { ...R, preventDefault: ce }), wo.current || jh(R));
    }
    R.kind === "cell" && (R.button === 0 || R.button === 1) && me(R), ji.current = void 0;
  }, [
    l,
    de,
    ie,
    qi,
    xo,
    We,
    E,
    sr,
    xn,
    yt,
    Go,
    Cr,
    v,
    yo,
    L,
    re,
    N,
    Yo,
    O,
    x,
    Qs,
    jh
  ]), aw = w.useCallback((R) => {
    const H = {
      ...R,
      location: [R.location[0] - ie, R.location[1]]
    };
    gt == null || gt(H), l !== void 0 && R.buttons === 0 && (c(void 0), Al(void 0), Ll(void 0), Xo.current = !1), Ll((B) => {
      var U;
      return Xo.current ? [R.scrollEdge[0], 0] : R.scrollEdge[0] === (B == null ? void 0 : B[0]) && R.scrollEdge[1] === B[1] ? B : l === void 0 || (((U = Rr.current) == null ? void 0 : U.location[0]) ?? 0) < ie ? void 0 : R.scrollEdge;
    });
  }, [l, gt, ie]), lw = w.useCallback((R, H) => {
    dt == null || dt(R - ie, H);
  }, [dt, ie]), cw = w.useCallback((R, H) => {
    ft == null || ft(R - ie, H);
  }, [ft, ie]), Vr = (ep = de == null ? void 0 : de.current) == null ? void 0 : ep.cell, uw = w.useCallback((R, H, B, U, oe, ge) => {
    Bi.current = !1;
    let ae = Vr;
    ae !== void 0 && (ae = [ae[0] - ie, ae[1]]);
    const ce = kt === 0 ? void 0 : {
      x: 0,
      y: R.y,
      width: kt,
      height: R.height
    }, me = [];
    ce !== void 0 && me.push(ce), zt > 0 && (me.push({
      x: R.x - ie,
      y: wt - zt,
      width: R.width,
      height: zt
    }), kt > 0 && me.push({
      x: 0,
      y: wt - zt,
      width: kt,
      height: zt
    }));
    const Ee = {
      x: R.x - ie,
      y: R.y,
      width: R.width,
      height: wn && R.y + R.height >= wt ? R.height - 1 : R.height,
      tx: oe,
      ty: ge,
      extras: {
        selected: ae,
        freezeRegion: ce,
        freezeRegions: me
      }
    };
    $n.current = Ee, vi(Ee), Dr([H, B, U]), Rt == null || Rt(Ee, Ee.tx, Ee.ty, Ee.extras);
  }, [
    Vr,
    ie,
    wn,
    wt,
    kt,
    zt,
    vi,
    Rt
  ]), dw = Ei(I, w.useCallback((R, H) => (I == null ? void 0 : I(R - ie, H - ie)) !== !1, [I, ie])), fw = Ei(Be, w.useCallback((R, H) => {
    Be == null || Be(R - ie, H - ie), ne !== "none" && Lt(rn.fromSingleSelection(H), void 0, !0);
  }, [ne, Be, ie, Lt])), $l = w.useRef(!1), hw = w.useCallback((R) => {
    if (R.location[0] === 0 && ie > 0) {
      R.preventDefault();
      return;
    }
    Je == null || Je({
      ...R,
      location: [R.location[0] - ie, R.location[1]]
    }), R.defaultPrevented() || ($l.current = !0), c(void 0);
  }, [Je, ie]), pw = w.useCallback(() => {
    $l.current = !1;
  }, []), Gh = pe == null ? void 0 : pe.selectionBehavior, ea = w.useCallback((R) => {
    if (Gh !== "block-spanning")
      return;
    const { isGroupHeader: H, path: B, groupRows: U } = Wi(R);
    if (H)
      return [R, R];
    const oe = B[B.length - 1], ge = R - oe, ae = R + U - oe - 1;
    return [ge, ae];
  }, [Wi, Gh]), Fl = w.useRef(), Hl = w.useCallback((R) => {
    var H, B, U;
    if (!K1(R, Fl.current) && (Fl.current = R, !(((H = Rr == null ? void 0 : Rr.current) == null ? void 0 : H.button) !== void 0 && Rr.current.button >= 1))) {
      if (R.buttons !== 0 && l !== void 0 && ((B = Rr.current) == null ? void 0 : B.location[0]) === 0 && ie === 1 && _e === "multi" && l.previousSelection && !l.previousSelection.rows.hasIndex(Rr.current.location[1]) && de.rows.hasIndex(Rr.current.location[1])) {
        const oe = Math.min(Rr.current.location[1], R.location[1]), ge = Math.max(Rr.current.location[1], R.location[1]) + 1;
        Ht(rn.fromSingleSelection([oe, ge]), void 0, !1);
      } else if (R.buttons !== 0 && l !== void 0 && de.current !== void 0 && !$l.current && !Xo.current && (ut === "rect" || ut === "multi-rect")) {
        const [oe, ge] = de.current.cell;
        let [ae, ce] = R.location;
        if (ce < 0 && (ce = $n.current.y), l.fillHandle === !0 && ((U = l.previousSelection) == null ? void 0 : U.current) !== void 0) {
          const me = l.previousSelection.current.range;
          ce = Math.min(ce, wn ? wt - 1 : wt);
          const Ee = zM(me, ae, ce, tn);
          Al(Ee);
        } else {
          if (wn && ge === wt)
            return;
          if (wn && ce === wt)
            if (R.kind === rl)
              ce--;
            else
              return;
          ae = Math.max(ae, ie);
          const je = ea(ge);
          ce = je === void 0 ? ce : Er(ce, je[0], je[1]);
          const at = ae - oe, Pe = ce - ge, At = {
            x: at >= 0 ? oe : ae,
            y: Pe >= 0 ? ge : ce,
            width: Math.abs(at) + 1,
            height: Math.abs(Pe) + 1
          };
          Ft({
            ...de.current,
            range: At
          }, !0, !1, "drag");
        }
      }
      ue == null || ue({ ...R, location: [R.location[0] - ie, R.location[1]] });
    }
  }, [
    l,
    ie,
    _e,
    de,
    ut,
    ue,
    Ht,
    wn,
    wt,
    tn,
    ea,
    Ft
  ]), gw = w.useCallback(() => {
    var ae, ce;
    const R = Fl.current;
    if (R === void 0)
      return;
    const [H, B] = R.scrollEdge;
    let [U, oe] = R.location;
    const ge = $n.current;
    H === -1 ? U = ((ce = (ae = ge.extras) == null ? void 0 : ae.freezeRegion) == null ? void 0 : ce.x) ?? ge.x : H === 1 && (U = ge.x + ge.width), B === -1 ? oe = Math.max(0, ge.y) : B === 1 && (oe = Math.min(wt - 1, ge.y + ge.height)), U = Er(U, 0, jt.length - 1), oe = Er(oe, 0, wt - 1), Hl({
      ...R,
      location: [U, oe]
    });
  }, [jt.length, Hl, wt]);
  UA(ow, hn, gw);
  const zr = w.useCallback((R) => {
    if (de.current === void 0)
      return;
    const [H, B] = R, [U, oe] = de.current.cell, ge = de.current.range;
    let ae = ge.x, ce = ge.x + ge.width, me = ge.y, Ee = ge.y + ge.height;
    const [je, at] = ea(oe) ?? [0, wt - 1], Pe = at + 1;
    if (B !== 0)
      switch (B) {
        case 2: {
          Ee = Pe, me = oe, Mn(0, Ee, "vertical");
          break;
        }
        case -2: {
          me = je, Ee = oe + 1, Mn(0, me, "vertical");
          break;
        }
        case 1: {
          me < oe ? (me++, Mn(0, me, "vertical")) : (Ee = Math.min(Pe, Ee + 1), Mn(0, Ee, "vertical"));
          break;
        }
        case -1: {
          Ee > oe + 1 ? (Ee--, Mn(0, Ee, "vertical")) : (me = Math.max(je, me - 1), Mn(0, me, "vertical"));
          break;
        }
        default:
          Ds();
      }
    if (H !== 0)
      if (H === 2)
        ce = jt.length, ae = U, Mn(ce - 1 - ie, 0, "horizontal");
      else if (H === -2)
        ae = ie, ce = U + 1, Mn(ae - ie, 0, "horizontal");
      else {
        let At = [];
        if (be !== void 0) {
          const lt = be({
            x: ae,
            y: me,
            width: ce - ae - ie,
            height: Ee - me
          }, V.current.signal);
          typeof lt == "object" && (At = n_(lt));
        }
        if (H === 1) {
          let lt = !1;
          if (ae < U) {
            if (At.length > 0) {
              const $t = Yi(ae + 1, U + 1).find((Nt) => !At.includes(Nt - ie));
              $t !== void 0 && (ae = $t, lt = !0);
            } else
              ae++, lt = !0;
            lt && Mn(ae, 0, "horizontal");
          }
          lt || (ce = Math.min(jt.length, ce + 1), Mn(ce - 1 - ie, 0, "horizontal"));
        } else if (H === -1) {
          let lt = !1;
          if (ce > U + 1) {
            if (At.length > 0) {
              const $t = Yi(ce - 1, U, -1).find((Nt) => !At.includes(Nt - ie));
              $t !== void 0 && (ce = $t, lt = !0);
            } else
              ce--, lt = !0;
            lt && Mn(ce - ie, 0, "horizontal");
          }
          lt || (ae = Math.max(ie, ae - 1), Mn(ae - ie, 0, "horizontal"));
        } else
          Ds();
      }
    Ft({
      cell: de.current.cell,
      range: {
        x: ae,
        y: me,
        width: ce - ae,
        height: Ee - me
      }
    }, !0, !1, "keyboard-select");
  }, [
    be,
    ea,
    de,
    jt.length,
    ie,
    wt,
    Mn,
    Ft
  ]), Bl = w.useRef(tt);
  Bl.current = tt;
  const ki = w.useCallback((R, H, B, U) => {
    const oe = Vn - (B ? 0 : 1);
    R = Er(R, ie, An.length - 1 + ie), H = Er(H, 0, oe);
    const ge = Vr == null ? void 0 : Vr[0], ae = Vr == null ? void 0 : Vr[1];
    if (R === ge && H === ae)
      return !1;
    if (U && de.current !== void 0) {
      const ce = [...de.current.rangeStack];
      (de.current.range.width > 1 || de.current.range.height > 1) && ce.push(de.current.range), We({
        ...de,
        current: {
          cell: [R, H],
          range: { x: R, y: H, width: 1, height: 1 },
          rangeStack: ce
        }
      }, !0);
    } else
      Ft({
        cell: [R, H],
        range: { x: R, y: H, width: 1, height: 1 }
      }, !0, !1, "keyboard-nav");
    return u.current !== void 0 && u.current[0] === R && u.current[1] === H && (u.current = void 0), Bl.current && Mn(R - ie, H), !0;
  }, [
    Vn,
    ie,
    An.length,
    Vr,
    de,
    Mn,
    We,
    Ft
  ]), mw = w.useCallback((R, H) => {
    (i == null ? void 0 : i.cell) !== void 0 && R !== void 0 && To(R) && (Cr([{ location: i.cell, value: R }]), window.requestAnimationFrame(() => {
      var oe;
      (oe = qn.current) == null || oe.damage([
        {
          cell: i.cell
        }
      ]);
    })), er(!0), o(void 0);
    const [B, U] = H;
    if (de.current !== void 0 && (B !== 0 || U !== 0)) {
      const oe = de.current.cell[1] === Vn - 1 && R !== void 0, ge = de.current.cell[0] === jt.length - 1 && R !== void 0;
      let ae = !0;
      if (oe && U === 1 && Ce !== void 0) {
        ae = !1;
        const ce = de.current.cell[0] + B, me = bo(ce);
        wi(me ?? ce, !1);
      }
      if (ge && B === 1 && Re !== void 0) {
        ae = !1;
        const ce = de.current.cell[1] + U;
        Zs(ce, !1);
      }
      ae && ki(Er(de.current.cell[0] + B, 0, jt.length - 1), Er(de.current.cell[1] + U, 0, Vn - 1), oe, !1);
    }
    D == null || D(R, H);
  }, [
    i == null ? void 0 : i.cell,
    er,
    de,
    D,
    Cr,
    Vn,
    ki,
    jt.length,
    wi,
    Zs,
    Ce,
    Re,
    bo
  ]), yw = w.useMemo(() => `gdg-overlay-${t_++}`, []), Ki = w.useCallback((R) => {
    var B, U, oe, ge;
    er();
    const H = [];
    for (let ae = R.x; ae < R.x + R.width; ae++)
      for (let ce = R.y; ce < R.y + R.height; ce++) {
        const me = C([ae - ie, ce]);
        if (!me.allowOverlay && me.kind !== $e.Boolean)
          continue;
        let Ee;
        if (me.kind === $e.Custom) {
          const je = xn(me), at = (B = je == null ? void 0 : je.provideEditor) == null ? void 0 : B.call(je, {
            ...me,
            location: [ae - ie, ce]
          });
          (je == null ? void 0 : je.onDelete) !== void 0 ? Ee = je.onDelete(me) : NR(at) && (Ee = (U = at == null ? void 0 : at.deletedValue) == null ? void 0 : U.call(at, me));
        } else if (To(me) && me.allowOverlay || me.kind === $e.Boolean) {
          const je = xn(me);
          Ee = (oe = je == null ? void 0 : je.onDelete) == null ? void 0 : oe.call(je, me);
        }
        Ee !== void 0 && !_o(Ee) && To(Ee) && H.push({ location: [ae, ce], value: Ee });
      }
    Cr(H), (ge = qn.current) == null || ge.damage(H.map((ae) => ({ cell: ae.location })));
  }, [er, C, xn, Cr, ie]), Vo = i !== void 0, Yh = w.useCallback((R) => {
    var $t, Nt;
    const H = () => {
      R.stopPropagation(), R.preventDefault();
    }, B = {
      didMatch: !1
    }, { bounds: U } = R, oe = de.columns, ge = de.rows, ae = Xr;
    if (!Vo && Kt(ae.clear, R, B))
      We(Ia, !1), ye == null || ye();
    else if (!Vo && Kt(ae.selectAll, R, B))
      We({
        columns: rn.empty(),
        rows: rn.empty(),
        current: {
          cell: (($t = de.current) == null ? void 0 : $t.cell) ?? [ie, 0],
          range: {
            x: ie,
            y: 0,
            width: m.length,
            height: wt
          },
          rangeStack: []
        }
      }, !1);
    else if (Kt(ae.search, R, B))
      (Nt = s == null ? void 0 : s.current) == null || Nt.focus({ preventScroll: !0 }), Hi(!0);
    else if (Kt(ae.delete, R, B)) {
      const St = (Yt == null ? void 0 : Yt(de)) ?? !0;
      if (St !== !1) {
        const Qt = St === !0 ? de : St;
        if (Qt.current !== void 0) {
          Ki(Qt.current.range);
          for (const Cn of Qt.current.rangeStack)
            Ki(Cn);
        }
        for (const Cn of Qt.rows)
          Ki({
            x: ie,
            y: Cn,
            width: m.length,
            height: 1
          });
        for (const Cn of Qt.columns)
          Ki({
            x: Cn,
            y: 0,
            width: 1,
            height: wt
          });
      }
    }
    if (B.didMatch)
      return H(), !0;
    if (de.current === void 0)
      return !1;
    let [ce, me] = de.current.cell;
    const [, Ee] = de.current.cell;
    let je = !1, at = !1;
    if (Kt(ae.scrollToSelectedCell, R, B))
      ra.current(ce - ie, me);
    else if (ne !== "none" && Kt(ae.selectColumn, R, B))
      oe.hasIndex(ce) ? Lt(oe.remove(ce), void 0, !0) : ne === "single" ? Lt(rn.fromSingleSelection(ce), void 0, !0) : Lt(void 0, ce, !0);
    else if (_e !== "none" && Kt(ae.selectRow, R, B))
      ge.hasIndex(me) ? Ht(ge.remove(me), void 0, !0) : _e === "single" ? Ht(rn.fromSingleSelection(me), void 0, !0) : Ht(void 0, me, !0);
    else if (!Vo && U !== void 0 && Kt(ae.activateCell, R, B))
      if (me === wt && wn)
        window.setTimeout(() => {
          const St = bo(ce);
          wi(St ?? ce);
        }, 0);
      else {
        const St = {
          inputType: "keyboard",
          key: R.key
        };
        v == null || v([ce - ie, me], St), yo(U, St);
      }
    else de.current.range.height > 1 && Kt(ae.downFill, R, B) ? Uh() : de.current.range.width > 1 && Kt(ae.rightFill, R, B) ? Kh() : Kt(ae.goToNextPage, R, B) ? me += Math.max(1, $n.current.height - 4) : Kt(ae.goToPreviousPage, R, B) ? me -= Math.max(1, $n.current.height - 4) : Kt(ae.goToFirstCell, R, B) ? (o(void 0), me = 0, ce = 0) : Kt(ae.goToLastCell, R, B) ? (o(void 0), me = Number.MAX_SAFE_INTEGER, ce = Number.MAX_SAFE_INTEGER) : Kt(ae.selectToFirstCell, R, B) ? (o(void 0), zr([-2, -2])) : Kt(ae.selectToLastCell, R, B) ? (o(void 0), zr([2, 2])) : Vo ? (Kt(ae.closeOverlay, R, B) && o(void 0), Kt(ae.acceptOverlayDown, R, B) && (o(void 0), me++), Kt(ae.acceptOverlayUp, R, B) && (o(void 0), me--), Kt(ae.acceptOverlayLeft, R, B) && (o(void 0), ce--), Kt(ae.acceptOverlayRight, R, B) && (o(void 0), ce++)) : (Kt(ae.goDownCell, R, B) ? me += 1 : Kt(ae.goUpCell, R, B) ? me -= 1 : Kt(ae.goRightCell, R, B) ? ce += 1 : Kt(ae.goLeftCell, R, B) ? ce -= 1 : Kt(ae.goDownCellRetainSelection, R, B) ? (me += 1, je = !0) : Kt(ae.goUpCellRetainSelection, R, B) ? (me -= 1, je = !0) : Kt(ae.goRightCellRetainSelection, R, B) ? (ce += 1, je = !0) : Kt(ae.goLeftCellRetainSelection, R, B) ? (ce -= 1, je = !0) : Kt(ae.goToLastRow, R, B) ? me = wt - 1 : Kt(ae.goToFirstRow, R, B) ? me = Number.MIN_SAFE_INTEGER : Kt(ae.goToLastColumn, R, B) ? ce = Number.MAX_SAFE_INTEGER : Kt(ae.goToFirstColumn, R, B) ? ce = Number.MIN_SAFE_INTEGER : (ut === "rect" || ut === "multi-rect") && (Kt(ae.selectGrowDown, R, B) ? zr([0, 1]) : Kt(ae.selectGrowUp, R, B) ? zr([0, -1]) : Kt(ae.selectGrowRight, R, B) ? zr([1, 0]) : Kt(ae.selectGrowLeft, R, B) ? zr([-1, 0]) : Kt(ae.selectToLastRow, R, B) ? zr([0, 2]) : Kt(ae.selectToFirstRow, R, B) ? zr([0, -2]) : Kt(ae.selectToLastColumn, R, B) ? zr([2, 0]) : Kt(ae.selectToFirstColumn, R, B) && zr([-2, 0])), at = B.didMatch);
    if (Or !== void 0 && Or !== "normal" && me !== Ee) {
      const St = Or === "skip-up" || Or === "skip" || Or === "block", Qt = Or === "skip-down" || Or === "skip" || Or === "block", Cn = me < Ee;
      if (Cn && St) {
        for (; me >= 0 && Wi(me).isGroupHeader; )
          me--;
        me < 0 && (me = Ee);
      } else if (!Cn && Qt) {
        for (; me < wt && Wi(me).isGroupHeader; )
          me++;
        me >= wt && (me = Ee);
      }
    }
    const At = ki(ce, me, !1, je), lt = B.didMatch;
    return lt && (At || !at || Sn) && H(), lt;
  }, [
    Or,
    Vo,
    de,
    Xr,
    ne,
    _e,
    ut,
    ie,
    Wi,
    wt,
    ki,
    We,
    ye,
    m.length,
    Yt,
    Sn,
    Ki,
    Lt,
    Ht,
    wn,
    bo,
    wi,
    v,
    yo,
    Uh,
    Kh,
    zr
  ]), Jo = w.useCallback((R) => {
    let H = !1;
    if (J !== void 0 && J({
      ...R,
      ...R.location && {
        location: [R.location[0] - ie, R.location[1]]
      },
      cancel: () => {
        H = !0;
      }
    }), H || Yh(R) || de.current === void 0)
      return;
    const [B, U] = de.current.cell, oe = $n.current;
    if (le && !R.metaKey && !R.ctrlKey && de.current !== void 0 && R.key.length === 1 && /[\p{L}\p{M}\p{N}\p{S}\p{P}]/u.test(R.key) && R.bounds !== void 0 && Eo(C([B - ie, Math.max(0, Math.min(U, wt - 1))]))) {
      if ((!wn || U !== wt) && (oe.y > U || U > oe.y + oe.height || oe.x > B || B > oe.x + oe.width))
        return;
      const ge = {
        inputType: "keyboard",
        key: R.key
      };
      v == null || v([B - ie, U], ge), yo(R.bounds, ge, R.key), R.stopPropagation(), R.preventDefault();
    }
  }, [
    le,
    J,
    Yh,
    de,
    C,
    ie,
    wt,
    wn,
    v,
    yo
  ]), bw = w.useCallback((R, H) => {
    const B = R.location[0] - ie;
    if (R.kind === "header" && (re == null || re(B, { ...R, preventDefault: H })), R.kind === Br) {
      if (B < 0)
        return;
      N == null || N(B, { ...R, preventDefault: H });
    }
    if (R.kind === "cell") {
      const [U, oe] = R.location;
      L == null || L([B, oe], {
        ...R,
        preventDefault: H
      }), pE(de, R.location) || ki(U, oe, !1, !1);
    }
  }, [
    de,
    L,
    N,
    re,
    ie,
    ki
  ]), ql = w.useCallback(async (R) => {
    var ae, ce, me;
    if (!Xr.paste)
      return;
    function H(Ee, je, at, Pe) {
      var lt, $t;
      const At = typeof at == "object" ? (at == null ? void 0 : at.join(`
`)) ?? "" : (at == null ? void 0 : at.toString()) ?? "";
      if (!_o(Ee) && Eo(Ee) && Ee.readonly !== !0) {
        const Nt = P == null ? void 0 : P(At, Ee);
        if (Nt !== void 0 && To(Nt))
          return process.env.NODE_ENV !== "production" && Nt.kind !== Ee.kind && console.warn("Coercion should not change cell kind."), {
            location: je,
            value: Nt
          };
        const St = xn(Ee);
        if (St === void 0)
          return;
        if (St.kind === $e.Custom) {
          mr(Ee.kind === $e.Custom);
          const Qt = (lt = St.onPaste) == null ? void 0 : lt.call(St, At, Ee.data);
          return Qt === void 0 ? void 0 : {
            location: je,
            value: {
              ...Ee,
              data: Qt
            }
          };
        } else {
          const Qt = ($t = St.onPaste) == null ? void 0 : $t.call(St, At, Ee, {
            formatted: Pe,
            formattedString: typeof Pe == "string" ? Pe : Pe == null ? void 0 : Pe.join(`
`),
            rawValue: at
          });
          return Qt === void 0 ? void 0 : (mr(Qt.kind === Ee.kind), {
            location: je,
            value: Qt
          });
        }
      }
    }
    const B = de.columns, U = de.rows, oe = ((ae = hn.current) == null ? void 0 : ae.contains(document.activeElement)) === !0 || ((ce = a.current) == null ? void 0 : ce.contains(document.activeElement)) === !0;
    let ge;
    if (de.current !== void 0 ? ge = [de.current.range.x, de.current.range.y] : B.length === 1 ? ge = [B.first() ?? 0, 0] : U.length === 1 && (ge = [ie, U.first() ?? 0]), oe && ge !== void 0) {
      let Ee, je;
      const at = "text/plain", Pe = "text/html";
      if (navigator.clipboard.read !== void 0) {
        const Nt = await navigator.clipboard.read();
        for (const St of Nt) {
          if (St.types.includes(Pe)) {
            const Cn = await (await St.getType(Pe)).text(), Fn = My(Cn);
            if (Fn !== void 0) {
              Ee = Fn;
              break;
            }
          }
          St.types.includes(at) && (je = await (await St.getType(at)).text());
        }
      } else if (navigator.clipboard.readText !== void 0)
        je = await navigator.clipboard.readText();
      else if (R !== void 0 && (R == null ? void 0 : R.clipboardData) !== null) {
        if (R.clipboardData.types.includes(Pe)) {
          const Nt = R.clipboardData.getData(Pe);
          Ee = My(Nt);
        }
        Ee === void 0 && R.clipboardData.types.includes(at) && (je = R.clipboardData.getData(at));
      } else
        return;
      const [At, lt] = ge, $t = [];
      do {
        if (Se === void 0) {
          const Nt = sr(ge), St = je ?? (Ee == null ? void 0 : Ee.map((Cn) => Cn.map((Fn) => Fn.rawValue).join("	")).join("	")) ?? "", Qt = H(Nt, ge, St, void 0);
          Qt !== void 0 && $t.push(Qt);
          break;
        }
        if (Ee === void 0) {
          if (je === void 0)
            return;
          Ee = FA(je);
        }
        if (Se === !1 || typeof Se == "function" && (Se == null ? void 0 : Se([ge[0] - ie, ge[1]], Ee.map((Nt) => Nt.map((St) => {
          var Qt;
          return ((Qt = St.rawValue) == null ? void 0 : Qt.toString()) ?? "";
        })))) !== !0)
          return;
        for (const [Nt, St] of Ee.entries()) {
          if (Nt + lt >= wt)
            break;
          for (const [Qt, Cn] of St.entries()) {
            const Fn = [Qt + At, Nt + lt], [ar, Jr] = Fn;
            if (ar >= jt.length || Jr >= Vn)
              continue;
            const Lr = sr(Fn), Zr = H(Lr, Fn, Cn.rawValue, Cn.formatted);
            Zr !== void 0 && $t.push(Zr);
          }
        }
      } while (!1);
      Cr($t), (me = qn.current) == null || me.damage($t.map((Nt) => ({
        cell: Nt.location
      })));
    }
  }, [
    P,
    xn,
    sr,
    de,
    Xr.paste,
    hn,
    jt.length,
    Cr,
    Vn,
    Se,
    ie,
    wt
  ]);
  tr("paste", ql, d, !1, !0);
  const Zo = w.useCallback(async (R, H) => {
    var ae, ce;
    if (!Xr.copy)
      return;
    const B = H === !0 || ((ae = hn.current) == null ? void 0 : ae.contains(document.activeElement)) === !0 || ((ce = a.current) == null ? void 0 : ce.contains(document.activeElement)) === !0, U = de.columns, oe = de.rows, ge = (me, Ee) => {
      if (!Ve)
        Ay(me, Ee, R);
      else {
        const je = Ee.map((at) => ({
          kind: $e.Text,
          data: m[at].title,
          displayData: m[at].title,
          allowOverlay: !1
        }));
        Ay([je, ...me], Ee, R);
      }
    };
    if (B && be !== void 0) {
      if (de.current !== void 0) {
        let me = be(de.current.range, V.current.signal);
        typeof me != "object" && (me = await me()), ge(me, Yi(de.current.range.x - ie, de.current.range.x + de.current.range.width - ie));
      } else if (oe !== void 0 && oe.length > 0) {
        const Ee = [...oe].map((je) => {
          const at = be({
            x: ie,
            y: je,
            width: m.length,
            height: 1
          }, V.current.signal);
          return typeof at == "object" ? at[0] : at().then((Pe) => Pe[0]);
        });
        if (Ee.some((je) => je instanceof Promise)) {
          const je = await Promise.all(Ee);
          ge(je, Yi(m.length));
        } else
          ge(Ee, Yi(m.length));
      } else if (U.length > 0) {
        const me = [], Ee = [];
        for (const je of U) {
          let at = be({
            x: je,
            y: 0,
            width: 1,
            height: wt
          }, V.current.signal);
          typeof at != "object" && (at = await at()), me.push(at), Ee.push(je - ie);
        }
        if (me.length === 1)
          ge(me[0], Ee);
        else {
          const je = me.reduce((at, Pe) => at.map((At, lt) => [...At, ...Pe[lt]]));
          ge(je, Ee);
        }
      }
    }
  }, [
    m,
    be,
    de,
    Xr.copy,
    ie,
    hn,
    wt,
    Ve
  ]);
  tr("copy", Zo, d, !1, !1);
  const vw = w.useCallback(async (R) => {
    var B, U;
    if (!(!Xr.cut || !(((B = hn.current) == null ? void 0 : B.contains(document.activeElement)) === !0 || ((U = a.current) == null ? void 0 : U.contains(document.activeElement)) === !0)) && (await Zo(R), de.current !== void 0)) {
      let oe = {
        current: {
          cell: de.current.cell,
          range: de.current.range,
          rangeStack: []
        },
        rows: rn.empty(),
        columns: rn.empty()
      };
      const ge = Yt == null ? void 0 : Yt(oe);
      if (ge === !1 || (oe = ge === !0 ? oe : ge, oe.current === void 0))
        return;
      Ki(oe.current.range);
    }
  }, [Ki, de, Xr.cut, Zo, hn, Yt]);
  tr("cut", vw, d, !1, !1);
  const ww = w.useCallback((R, H) => {
    if (ee !== void 0) {
      ie !== 0 && (R = R.map((oe) => [oe[0] - ie, oe[1]])), ee(R, H);
      return;
    }
    if (R.length === 0 || H === -1)
      return;
    const [B, U] = R[H];
    u.current !== void 0 && u.current[0] === B && u.current[1] === U || (u.current = [B, U], ki(B, U, !1, !1));
  }, [ee, ie, ki]), [ta, na] = ((tp = Pt == null ? void 0 : Pt.current) == null ? void 0 : tp.cell) ?? [], ra = w.useRef(Mn);
  ra.current = Mn, w.useLayoutEffect(() => {
    var R, H, B, U;
    Bl.current && !Bi.current && ta !== void 0 && na !== void 0 && (ta !== ((H = (R = Le.current) == null ? void 0 : R.current) == null ? void 0 : H.cell[0]) || na !== ((U = (B = Le.current) == null ? void 0 : B.current) == null ? void 0 : U.cell[1])) && ra.current(ta, na), Bi.current = !1;
  }, [ta, na]);
  const Xh = de.current !== void 0 && (de.current.cell[0] >= jt.length || de.current.cell[1] >= Vn);
  w.useLayoutEffect(() => {
    Xh && We(Ia, !1);
  }, [Xh, We]);
  const xw = w.useMemo(() => wn === !0 && (Ue == null ? void 0 : Ue.tint) === !0 ? rn.fromSingleSelection(Vn - 1) : rn.empty(), [Vn, wn, Ue == null ? void 0 : Ue.tint]), kw = w.useCallback((R) => typeof xe == "boolean" ? xe : (xe == null ? void 0 : xe(R - ie)) ?? !0, [ie, xe]), Sw = w.useMemo(() => {
    if (Ol === void 0 || a.current === null)
      return null;
    const { bounds: R, group: H } = Ol, B = a.current.getBoundingClientRect();
    return w.createElement(MA, { bounds: R, group: H, canvasBounds: B, onClose: () => zl(void 0), onFinish: (U) => {
      zl(void 0), te == null || te(H, U);
    } });
  }, [te, Ol]), Cw = Math.min(jt.length, kt + (pr ? 1 : 0));
  w.useImperativeHandle(e, () => ({
    appendRow: (R, H) => wi(R + ie, H),
    appendColumn: (R, H) => Zs(R, H),
    updateCells: (R) => {
      var H;
      return ie !== 0 && (R = R.map((B) => ({ cell: [B.cell[0] + ie, B.cell[1]] }))), (H = qn.current) == null ? void 0 : H.damage(R);
    },
    getBounds: (R, H) => {
      var B;
      if (!((a == null ? void 0 : a.current) === null || (hn == null ? void 0 : hn.current) === null)) {
        if (R === void 0 && H === void 0) {
          const U = a.current.getBoundingClientRect(), oe = U.width / hn.current.clientWidth;
          return {
            x: U.x - hn.current.scrollLeft * oe,
            y: U.y - hn.current.scrollTop * oe,
            width: hn.current.scrollWidth * oe,
            height: hn.current.scrollHeight * oe
          };
        }
        return (B = qn.current) == null ? void 0 : B.getBounds((R ?? 0) + ie, H);
      }
    },
    focus: () => {
      var R;
      return (R = qn.current) == null ? void 0 : R.focus();
    },
    /* fork: open a cell's overlay editor imperatively — the same path a
       double-click takes (a DOM dropdown button inside the cell can call
       this without synthesising pointer events). */
    openCellEditor: (R, H) => {
      var oe;
      const B = sr([R, H]);
      if (B == null || !B.allowOverlay) return;
      const U = (oe = qn.current) == null ? void 0 : oe.getBounds(R + ie, H);
      U != null && Uo({
        target: U,
        content: B,
        initialValue: void 0,
        highlight: !0,
        cell: [R, H],
        forceEditMode: !0,
        activation: { inputType: "keyboard", key: "Enter" }
      });
    },
    emit: async (R) => {
      switch (R) {
        case "delete":
          Jo({
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
          Jo({
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
          Jo({
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
          await Zo(void 0, !0);
          break;
        case "paste":
          await ql();
          break;
      }
    },
    scrollTo: Mn,
    remeasureColumns: (R) => {
      for (const H of R)
        Qs(H + ie);
    },
    getMouseArgsForPosition: (R, H, B) => {
      if ((qn == null ? void 0 : qn.current) === null)
        return;
      const U = qn.current.getMouseArgsForPosition(R, H, B);
      if (U !== void 0)
        return {
          ...U,
          location: [U.location[0] - ie, U.location[1]]
        };
    }
  }), [
    wi,
    Zs,
    Qs,
    hn,
    Zo,
    Jo,
    ql,
    ie,
    Mn
  ]);
  const [Vh, Jh] = Vr ?? [], Rw = w.useCallback((R) => {
    const [H, B] = R;
    if (B === -1) {
      ne !== "none" && (Lt(rn.fromSingleSelection(H), void 0, !1), er());
      return;
    }
    Vh === H && Jh === B || (Ft({
      cell: R,
      range: { x: H, y: B, width: 1, height: 1 }
    }, !0, !1, "keyboard-nav"), Mn(H, B));
  }, [ne, er, Mn, Vh, Jh, Ft, Lt]), [Tw, Ew] = w.useState(!1), Zh = w.useRef(Xv((R) => {
    Ew(R);
  }, 5)), Mw = w.useCallback(() => {
    Zh.current(!0), de.current === void 0 && de.columns.length === 0 && de.rows.length === 0 && l === void 0 && Ft({
      cell: [ie, Ys],
      range: {
        x: ie,
        y: Ys,
        width: 1,
        height: 1
      }
    }, !0, !1, "keyboard-select");
  }, [Ys, de, l, ie, Ft]), Iw = w.useCallback(() => {
    Zh.current(!1);
  }, []), [Aw, _w] = w.useMemo(() => {
    let R;
    const H = (Et == null ? void 0 : Et.scrollbarWidthOverride) ?? kf(), B = wt + (wn ? 1 : 0);
    if (typeof en == "number")
      R = Xn + B * en;
    else {
      let oe = 0;
      const ge = Math.min(B, 10);
      for (let ae = 0; ae < ge; ae++)
        oe += en(ae);
      oe = Math.floor(oe / ge), R = Xn + B * oe;
    }
    R += H;
    const U = jt.reduce((oe, ge) => ge.width + oe, 0) + H;
    return [`${Math.min(1e5, U)}px`, `${Math.min(1e5, R)}px`];
  }, [jt, Et == null ? void 0 : Et.scrollbarWidthOverride, en, wt, wn, Xn]), Pw = w.useMemo(() => ME(Vt), [Vt]);
  return w.createElement(
    IE.Provider,
    { value: Vt },
    w.createElement(
      WA,
      { style: Pw, className: W, inWidth: g ?? Aw, inHeight: y ?? _w },
      w.createElement(CA, { fillHandle: Mt, drawFocusRing: Jt, experimental: Et, fixedShadowX: nn, fixedShadowY: xr, getRowThemeOverride: or, headerIcons: qt, imageWindowLoader: yn, initialSize: On, isDraggable: Gn, onDragLeave: Xt, onRowMoved: zn, overscrollX: Tl, overscrollY: El, preventDiagonalScrolling: fr, rightElement: Yn, rightElementProps: dn, smoothScrollX: rr, smoothScrollY: Pr, className: W, enableGroups: Sr, onCanvasFocused: Mw, onCanvasBlur: Iw, canvasRef: a, onContextMenu: bw, theme: Vt, cellXOffset: nw, cellYOffset: Ys, accessibilityHeight: ai.height, onDragEnd: pw, columns: jt, nonGrowWidth: an, drawHeader: Ln, onColumnProposeMove: dw, drawCell: xt, disabledRows: xw, freezeColumns: Cw, lockColumns: ie, firstColAccessible: ie === 0, getCellContent: sr, minColumnWidth: Wn, maxColumnWidth: jn, searchInputRef: s, showSearch: Il, onSearchClose: po, highlightRegions: rw, getCellsForSelection: be, getGroupDetails: _l, headerHeight: Fi, isFocused: Tw, groupHeaderHeight: Sr ? Gs : 0, freezeTrailingRows: zt + (wn && (Ue == null ? void 0 : Ue.sticky) === !0 ? 1 : 0), hasAppendRow: wn, onColumnResize: It, onColumnResizeEnd: Gt, onColumnResizeStart: pt, onCellFocused: Rw, onColumnMoved: fw, onDragStart: hw, onHeaderMenuClick: lw, onHeaderIndicatorClick: cw, onItemHovered: Hl, isFilling: (l == null ? void 0 : l.fillHandle) === !0, onMouseMove: aw, onKeyDown: Jo, onKeyUp: K, onMouseDown: iw, onMouseUp: sw, onDragOverCell: Te, onDrop: Ze, onSearchResultsChanged: ww, onVisibleRegionChanged: uw, clientSize: En, rowHeight: en, searchResults: q, searchValue: X, onSearchValueChange: Q, rows: Vn, scrollRef: hn, selection: de, translateX: ai.tx, translateY: ai.ty, verticalBorder: kw, gridRef: qn, getCellRenderer: xn, resizeIndicator: Me }),
      Sw,
      i !== void 0 && w.createElement(
        w.Suspense,
        { fallback: null },
        w.createElement(e_, { ...i, validateCell: st, bloom: S, id: yw, getCellRenderer: xn, className: (Et == null ? void 0 : Et.isSubGrid) === !0 ? "click-outside-ignore" : void 0, provideEditor: qe, imageEditorOverride: f, portalElementRef: vn, onFinishEditing: mw, markdownDivCreateNode: p, isOutsideClick: Gr, customEventTarget: Et == null ? void 0 : Et.eventTarget })
      )
    )
  );
}, i_ = w.forwardRef(r_);
function Dy(t) {
  const { cell: e, posX: n, posY: r, bounds: i, theme: o } = t, { width: s, height: a, x: l, y: c } = i, u = e.maxSize ?? o.checkboxMaxSize, d = Math.floor(i.y + a / 2), f = Zv(u, a, o.cellVerticalPadding), h = Jv(e.contentAlign ?? "center", l, s, o.cellHorizontalPadding, f), p = Vv(h, d, f), g = Qv(l + n, c + r, p);
  return ph(e) && g;
}
const o_ = {
  getAccessibilityString: (t) => {
    var e;
    return ((e = t.data) == null ? void 0 : e.toString()) ?? "false";
  },
  kind: $e.Boolean,
  needsHover: !0,
  useLabel: !1,
  needsHoverPosition: !0,
  measure: () => 50,
  draw: (t) => s_(t, t.cell.data, ph(t.cell), t.cell.maxSize ?? t.theme.checkboxMaxSize, t.cell.hoverEffectIntensity ?? 0.35),
  onDelete: (t) => ({
    ...t,
    data: !1
  }),
  onSelect: (t) => {
    Dy(t) && t.preventDefault();
  },
  onClick: (t) => {
    if (Dy(t))
      return {
        ...t.cell,
        data: G1(t.cell.data)
      };
  },
  onPaste: (t, e) => {
    let n = Xa;
    return t.toLowerCase() === "true" ? n = !0 : t.toLowerCase() === "false" ? n = !1 : t.toLowerCase() === "indeterminate" && (n = hh), n === e.data ? void 0 : {
      ...e,
      data: n
    };
  }
};
function s_(t, e, n, r, i) {
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
  Oh(o, a, e, h, p, g, y, c, u, d, r, f), m && (o.globalAlpha = 1);
}
const a_ = /* @__PURE__ */ wr("div")({
  name: "BubblesOverlayEditorStyle",
  class: "gdg-b1ygi5by",
  propsAsIs: !1
}), l_ = (t) => {
  const { bubbles: e } = t;
  return w.createElement(
    a_,
    null,
    e.map((n, r) => w.createElement("div", { key: r, className: "boe-bubble" }, n)),
    w.createElement("textarea", { className: "gdg-input", autoFocus: !0 })
  );
}, c_ = {
  getAccessibilityString: (t) => e1(t.data),
  kind: $e.Bubble,
  needsHover: !1,
  useLabel: !1,
  needsHoverPosition: !1,
  measure: (t, e, n) => {
    const r = e.data.reduce((i, o) => t.measureText(o).width + i + n.bubblePadding * 2 + n.bubbleMargin, 0);
    return e.data.length === 0 ? n.cellHorizontalPadding * 2 : r + 2 * n.cellHorizontalPadding - n.bubbleMargin;
  },
  draw: (t) => u_(t, t.cell.data),
  provideEditor: () => (t) => {
    const { value: e } = t;
    return w.createElement(l_, { bubbles: e.data });
  },
  onPaste: () => {
  }
};
function u_(t, e) {
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
const d_ = /* @__PURE__ */ wr("div")({
  name: "DrilldownOverlayEditorStyle",
  class: "gdg-d4zsq0x",
  propsAsIs: !1
}), f_ = (t) => {
  const {
    drilldowns: e
  } = t;
  return w.createElement(d_, null, e.map((n, r) => w.createElement("div", {
    key: r,
    className: "doe-bubble"
  }, n.img !== void 0 && w.createElement("img", {
    src: n.img
  }), w.createElement("div", null, n.text))));
}, h_ = {
  getAccessibilityString: (t) => e1(t.data.map((e) => e.text)),
  kind: $e.Drilldown,
  needsHover: !1,
  useLabel: !1,
  needsHoverPosition: !1,
  measure: (t, e, n) => e.data.reduce((r, i) => t.measureText(i.text).width + r + n.bubblePadding * 2 + n.bubbleMargin + (i.img !== void 0 ? 18 : 0), 0) + 2 * n.cellHorizontalPadding - 4,
  draw: (t) => g_(t, t.cell.data),
  provideEditor: () => (t) => {
    const { value: e } = t;
    return w.createElement(f_, { drilldowns: e.data });
  },
  onPaste: () => {
  }
}, of = {};
function p_(t, e, n, r) {
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
function g_(t, e) {
  const { rect: n, theme: r, ctx: i, imageLoader: o, col: s, row: a } = t, { x: l, width: c } = n, u = r.baseFontFull, d = b1(i, u), f = Math.min(n.height, Math.max(16, Math.ceil(d * r.lineHeight) * 2)), h = Math.floor(n.y + (n.height - f) / 2), p = f - 10, g = r.bubblePadding, y = r.bubbleMargin;
  let m = l + r.cellHorizontalPadding;
  const b = r.roundingRadius ?? 6, C = p_(r.bgCell, r.drilldownBorder, f, b), E = [];
  for (const v of e) {
    if (m > l + c)
      break;
    const D = Ko(v.text, i, u).width;
    let P = 0;
    v.img !== void 0 && o.loadOrGetImage(v.img, s, a) !== void 0 && (P = p - 8 + 4);
    const k = D + P + g * 2;
    E.push({
      x: m,
      width: k
    }), m += k + y;
  }
  if (C !== null) {
    const { el: v, height: T, middleWidth: D, sideWidth: P, width: k, dpr: z, padding: S } = C, x = P / z, I = S / z;
    for (const _ of E) {
      const M = Math.floor(_.x), O = Math.floor(_.width), L = O - (x - I) * 2;
      i.imageSmoothingEnabled = !1, i.drawImage(v, 0, 0, P, T, M - I, h, x, f), L > 0 && i.drawImage(v, P, 0, D, T, M + (x - I), h, L, f), i.drawImage(v, k - P, 0, P, T, M + O - (x - I), h, x, f), i.imageSmoothingEnabled = !0;
    }
  }
  i.beginPath();
  for (const [v, T] of E.entries()) {
    const D = e[v];
    let P = T.x + g;
    if (D.img !== void 0) {
      const k = o.loadOrGetImage(D.img, s, a);
      if (k !== void 0) {
        const z = p - 8;
        let S = 0, x = 0, I = k.width, _ = k.height;
        I > _ ? (S += (I - _) / 2, I = _) : _ > I && (x += (_ - I) / 2, _ = I), i.beginPath(), ei(i, P, h + f / 2 - z / 2, z, z, r.roundingRadius ?? 3), i.save(), i.clip(), i.drawImage(k, S, x, I, _, P, h + f / 2 - z / 2, z, z), i.restore(), P += z + 4;
      }
    }
    i.beginPath(), i.fillStyle = r.textBubble, i.fillText(D.text, P, h + f / 2 + Oi(i, r));
  }
}
const m_ = {
  getAccessibilityString: (t) => t.data.join(", "),
  kind: $e.Image,
  needsHover: !1,
  useLabel: !1,
  needsHoverPosition: !1,
  draw: (t) => y_(t, t.cell.displayData ?? t.cell.data, t.cell.rounding ?? t.theme.roundingRadius ?? 4, t.cell.contentAlign),
  measure: (t, e) => e.data.length * 50,
  onDelete: (t) => ({
    ...t,
    data: []
  }),
  provideEditor: () => (t) => {
    const { value: e, onFinishedEditing: n, imageEditorOverride: r } = t, i = r ?? bT;
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
function y_(t, e, n, r) {
  const { rect: i, col: o, row: s, theme: a, ctx: l, imageLoader: c } = t, { x: u, y: d, height: f, width: h } = i, p = f - a.cellVerticalPadding * 2, g = [];
  let y = 0;
  for (let b = 0; b < e.length; b++) {
    const C = e[b];
    if (C.length === 0)
      continue;
    const E = c.loadOrGetImage(C, o, s);
    if (E !== void 0) {
      g[b] = E;
      const v = E.width * (p / E.height);
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
function b_(t, e) {
  let n = t * 49632 + e * 325176;
  return n ^= n << 13, n ^= n >> 17, n ^= n << 5, n / 4294967295 * 2;
}
const v_ = {
  getAccessibilityString: () => "",
  kind: $e.Loading,
  needsHover: !1,
  useLabel: !1,
  needsHoverPosition: !1,
  measure: () => 120,
  draw: (t) => {
    const { cell: e, col: n, row: r, ctx: i, rect: o, theme: s } = t;
    if (e.skeletonWidth === void 0 || e.skeletonWidth === 0)
      return;
    let a = e.skeletonWidth;
    e.skeletonWidthVariability !== void 0 && e.skeletonWidthVariability > 0 && (a += Math.round(b_(n, r) * e.skeletonWidthVariability));
    const l = s.cellHorizontalPadding;
    a + l * 2 >= o.width && (a = o.width - l * 2 - 1);
    const c = e.skeletonHeight ?? Math.min(18, o.height - 2 * s.cellVerticalPadding);
    ei(i, o.x + l, o.y + (o.height - c) / 2, a, c, s.roundingRadius ?? 3), i.fillStyle = io(s.textDark, 0.1), i.fill();
  },
  onPaste: () => {
  }
}, w_ = () => (t) => t.targetWidth, Ny = /* @__PURE__ */ wr("div")({
  name: "MarkdownOverlayEditorStyle",
  class: "gdg-m1pnx84e",
  propsAsIs: !1,
  vars: {
    "m1pnx84e-0": [w_(), "px"]
  }
}), x_ = (t) => {
  const { value: e, onChange: n, forceEditMode: r, createNode: i, targetRect: o, onFinish: s, validatedSelection: a } = t, l = e.data, c = e.readonly === !0, [u, d] = w.useState(l === "" || r), f = w.useCallback(() => {
    d((p) => !p);
  }, []), h = l ? "gdg-ml-6" : "";
  return u ? w.createElement(
    Ny,
    { targetWidth: o.width - 20 },
    w.createElement(Ks, { autoFocus: !0, highlight: !1, validatedSelection: a, value: l, onKeyDown: (p) => {
      p.key === "Enter" && p.stopPropagation();
    }, onChange: n }),
    w.createElement(
      "div",
      { className: `gdg-edit-icon gdg-checkmark-hover ${h}`, onClick: () => s(e) },
      w.createElement(dT, null)
    )
  ) : w.createElement(
    Ny,
    { targetWidth: o.width },
    w.createElement(rE, { contents: l, createNode: i }),
    !c && w.createElement(
      w.Fragment,
      null,
      w.createElement("div", { className: "spacer" }),
      w.createElement(
        "div",
        { className: `gdg-edit-icon gdg-edit-hover ${h}`, onClick: f },
        w.createElement(bh, null)
      )
    ),
    w.createElement("textarea", { className: "gdg-md-edit-textarea gdg-input", autoFocus: !0 })
  );
}, k_ = {
  getAccessibilityString: (t) => {
    var e;
    return ((e = t.data) == null ? void 0 : e.toString()) ?? "";
  },
  kind: $e.Markdown,
  needsHover: !1,
  needsHoverPosition: !1,
  drawPrep: Us,
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
    return w.createElement(x_, { onFinish: i, targetRect: r, value: n, validatedSelection: a, onChange: (l) => e({
      ...n,
      data: l.target.value
    }), forceEditMode: s, createNode: o });
  },
  onPaste: (t, e) => t === e.data ? void 0 : { ...e, data: t }
}, S_ = {
  getAccessibilityString: (t) => t.row.toString(),
  kind: Ir.Marker,
  needsHover: !0,
  needsHoverPosition: !1,
  drawPrep: C_,
  measure: () => 44,
  draw: (t) => T_(t, t.cell.row, t.cell.checked, t.cell.markerKind, t.cell.drawHandle, t.cell.checkboxStyle),
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
function C_(t, e) {
  const { ctx: n, theme: r } = t, i = r.markerFontFull, o = e ?? {};
  return (o == null ? void 0 : o.font) !== i && (n.font = i, o.font = i), o.deprep = R_, n.textAlign = "center", o;
}
function R_(t) {
  const { ctx: e } = t;
  e.textAlign = "start";
}
function T_(t, e, n, r, i, o) {
  const { ctx: s, rect: a, hoverAmount: l, theme: c } = t, { x: u, y: d, width: f, height: h } = a, p = n ? 1 : r === "checkbox-visible" ? 0.6 + 0.4 * l : l;
  if (r !== "number" && p > 0) {
    s.globalAlpha = p;
    const g = 7 * (n ? l : 1);
    if (Oh(s, c, n, i ? u + g : u, d, i ? f - g : f, h, !0, void 0, void 0, c.checkboxMaxSize, "center", o), i) {
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
const E_ = {
  getAccessibilityString: () => "",
  kind: Ir.NewRow,
  needsHover: !0,
  needsHoverPosition: !1,
  measure: () => 200,
  draw: (t) => M_(t, t.cell.hint, t.cell.icon),
  onPaste: () => {
  }
};
function M_(t, e, n) {
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
function V1(t, e, n, r, i, o, s) {
  t.textBaseline = "alphabetic";
  const a = I_(t, i, r, e, (n == null ? void 0 : n.fullSize) ?? !1);
  t.beginPath(), ei(t, a.x, a.y, a.width, a.height, e.roundingRadius ?? 4), t.globalAlpha = o, t.fillStyle = (n == null ? void 0 : n.bgColor) ?? io(e.textDark, 0.1), t.fill(), t.globalAlpha = 1, t.fillStyle = e.textDark, t.textBaseline = "middle", s == null || s("text");
}
function I_(t, e, n, r, i) {
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
const A_ = w.lazy(async () => await import("./number-overlay-editor-Cxk8O6N7.js")), __ = {
  getAccessibilityString: (t) => {
    var e;
    return ((e = t.data) == null ? void 0 : e.toString()) ?? "";
  },
  kind: $e.Number,
  needsHover: (t) => t.hoverEffect === !0,
  needsHoverPosition: !1,
  useLabel: !0,
  drawPrep: Us,
  draw: (t) => {
    const { hoverAmount: e, cell: n, ctx: r, theme: i, rect: o, overrideCursor: s } = t, { hoverEffect: a, displayData: l, hoverEffectTheme: c } = n;
    a === !0 && e > 0 && V1(r, i, c, l, o, e, s), li(t, t.cell.displayData, t.cell.contentAlign);
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
      w.createElement(A_, { highlight: e, disabled: r.readonly === !0, value: r.data, fixedDecimals: r.fixedDecimals, allowNegative: r.allowNegative, thousandSeparator: r.thousandSeparator, decimalSeparator: r.decimalSeparator, validatedSelection: i, onChange: (o) => n({
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
}, P_ = {
  getAccessibilityString: () => "",
  measure: () => 108,
  kind: $e.Protected,
  needsHover: !1,
  needsHoverPosition: !1,
  draw: D_,
  onPaste: () => {
  }
};
function D_(t) {
  const { ctx: e, theme: n, rect: r } = t, { x: i, y: o, height: s } = r;
  e.beginPath();
  const a = 2.5;
  let l = i + n.cellHorizontalPadding + a;
  const c = o + s / 2, u = Math.cos(Cm(30)) * a, d = Math.sin(Cm(30)) * a;
  for (let f = 0; f < 12; f++)
    e.moveTo(l, c - a), e.lineTo(l, c + a), e.moveTo(l + u, c - d), e.lineTo(l - u, c + d), e.moveTo(l - u, c - d), e.lineTo(l + u, c + d), l += 8;
  e.lineWidth = 1.1, e.lineCap = "square", e.strokeStyle = n.textLight, e.stroke();
}
const N_ = {
  getAccessibilityString: (t) => {
    var e;
    return ((e = t.data) == null ? void 0 : e.toString()) ?? "";
  },
  kind: $e.RowID,
  needsHover: !1,
  needsHoverPosition: !1,
  drawPrep: (t, e) => Us(t, e, t.theme.textLight),
  draw: (t) => li(t, t.cell.data, t.cell.contentAlign),
  measure: (t, e, n) => t.measureText(e.data).width + n.cellHorizontalPadding * 2,
  // eslint-disable-next-line react/display-name
  provideEditor: () => (t) => {
    const { isHighlighted: e, onChange: n, value: r, validatedSelection: i } = t;
    return _t.createElement(Ks, { highlight: e, autoFocus: r.readonly !== !0, disabled: r.readonly !== !1, value: r.data, validatedSelection: i, onChange: (o) => n({
      ...r,
      data: o.target.value
    }) });
  },
  onPaste: () => {
  }
}, O_ = {
  getAccessibilityString: (t) => {
    var e;
    return ((e = t.data) == null ? void 0 : e.toString()) ?? "";
  },
  kind: $e.Text,
  needsHover: (t) => t.hoverEffect === !0,
  needsHoverPosition: !1,
  drawPrep: Us,
  useLabel: !0,
  draw: (t) => {
    const { cell: e, hoverAmount: n, hyperWrapping: r, ctx: i, rect: o, theme: s, overrideCursor: a } = t, { displayData: l, contentAlign: c, hoverEffect: u, allowWrapping: d, hoverEffectTheme: f } = e;
    u === !0 && n > 0 && V1(i, s, f, l, o, n, a), li(t, l, c, d, r);
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
      return w.createElement(Ks, { style: t.allowWrapping === !0 ? { padding: "3px 8.5px" } : void 0, highlight: n, autoFocus: i.readonly !== !0, disabled: i.readonly === !0, altNewline: !0, value: i.data, validatedSelection: o, onChange: (s) => r({
        ...i,
        data: s.target.value
      }) });
    }
  }),
  onPaste: (t, e, n) => t === e.data ? void 0 : { ...e, data: t, displayData: n.formattedString ?? e.displayData }
}, z_ = /* @__PURE__ */ wr("div")({
  name: "UriOverlayEditorStyle",
  class: "gdg-u1rrojo",
  propsAsIs: !1
}), L_ = (t) => {
  const { uri: e, onChange: n, forceEditMode: r, readonly: i, validatedSelection: o, preview: s } = t, [a, l] = w.useState(!i && (e === "" || r)), c = w.useCallback(() => {
    l(!0);
  }, []);
  return a ? w.createElement(Ks, { validatedSelection: o, highlight: !0, autoFocus: !0, value: e, onChange: n }) : w.createElement(
    z_,
    null,
    w.createElement("a", { className: "gdg-link-area", href: e, target: "_blank", rel: "noopener noreferrer" }, s),
    !i && w.createElement(
      "div",
      { className: "gdg-edit-icon", onClick: c },
      w.createElement(bh, null)
    ),
    w.createElement("textarea", { className: "gdg-input", autoFocus: !0 })
  );
};
function J1(t, e, n, r) {
  let i = n.cellHorizontalPadding;
  const o = e.height / 2 - t.actualBoundingBoxAscent / 2, s = t.width, a = t.actualBoundingBoxAscent;
  return r === "right" ? i = e.width - s - n.cellHorizontalPadding : r === "center" && (i = e.width / 2 - s / 2), { x: i, y: o, width: s, height: a };
}
function Oy(t) {
  const { cell: e, bounds: n, posX: r, posY: i, theme: o } = t, s = e.displayData ?? e.data;
  if (e.hoverEffect !== !0 || e.onClickUri === void 0)
    return !1;
  const a = m1(s, o.baseFontFull);
  if (a === void 0)
    return !1;
  const l = J1(a, n, o, e.contentAlign);
  return Qi({
    x: l.x - 4,
    y: l.y - 4,
    width: l.width + 8,
    height: l.height + 8
  }, r, i);
}
const $_ = {
  getAccessibilityString: (t) => {
    var e;
    return ((e = t.data) == null ? void 0 : e.toString()) ?? "";
  },
  kind: $e.Uri,
  needsHover: (t) => t.hoverEffect === !0,
  needsHoverPosition: !0,
  useLabel: !0,
  drawPrep: Us,
  draw: (t) => {
    const { cell: e, theme: n, overrideCursor: r, hoverX: i, hoverY: o, rect: s, ctx: a } = t, l = e.displayData ?? e.data, c = e.hoverEffect === !0;
    if (r !== void 0 && c && i !== void 0 && o !== void 0) {
      const u = Ko(l, a, n.baseFontFull), d = J1(u, s, n, e.contentAlign), { x: f, y: h, width: p, height: g } = d;
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
    Oy(t) && t.preventDefault();
  },
  onClick: (t) => {
    var r;
    const { cell: e } = t;
    Oy(t) && ((r = e.onClickUri) == null || r.call(e, t));
  },
  measure: (t, e, n) => t.measureText(e.displayData ?? e.data).width + n.cellHorizontalPadding * 2,
  onDelete: (t) => ({
    ...t,
    data: ""
  }),
  provideEditor: (t) => (e) => {
    const { onChange: n, value: r, forceEditMode: i, validatedSelection: o } = e;
    return w.createElement(L_, { forceEditMode: r.readonly !== !0 && (i || t.hoverEffect === !0 && t.onClickUri !== void 0), uri: r.data, preview: r.displayData ?? r.data, validatedSelection: o, readonly: r.readonly === !0, onChange: (s) => n({
      ...r,
      data: s.target.value
    }) });
  },
  onPaste: (t, e, n) => t === e.data ? void 0 : { ...e, data: t, displayData: n.formattedString ?? e.displayData }
}, F_ = [
  S_,
  E_,
  o_,
  c_,
  h_,
  m_,
  v_,
  k_,
  __,
  P_,
  N_,
  O_,
  $_
];
var af, zy;
function H_() {
  if (zy) return af;
  zy = 1;
  var t = Yv(), e = ao(), n = "Expected a function";
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
var B_ = H_();
const q_ = /* @__PURE__ */ Ni(B_), lf = [];
class W_ extends w1 {
  constructor() {
    super(...arguments);
    Qe(this, "imageLoaded", () => {
    });
    Qe(this, "loadedLocations", []);
    Qe(this, "cache", {});
    // eslint-disable-next-line unicorn/consistent-function-scoping
    Qe(this, "sendLoaded", q_(() => {
      this.imageLoaded(new Rs(this.loadedLocations)), this.loadedLocations = [];
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
            this.loadedLocations.push(_h(f));
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
const j_ = (t, e) => {
  const n = w.useMemo(() => ({ ...DM, ...t.headerIcons }), [t.headerIcons]), r = w.useMemo(() => t.renderers ?? F_, [t.renderers]), i = w.useMemo(() => t.imageWindowLoader ?? new W_(), [t.imageWindowLoader]);
  return w.createElement(i_, { ...t, renderers: r, headerIcons: n, ref: e, imageWindowLoader: i });
}, K_ = w.forwardRef(j_), U_ = w.forwardRef(function(e, n) {
  const { getDomCell: r, onVisibleRegionChanged: i, onCellActivated: o, domCellClassName: s, ...a } = e, l = w.useRef(null);
  w.useImperativeHandle(n, () => l.current, []);
  const c = w.useRef(null), u = w.useRef(null), d = w.useRef(null), [f, h] = w.useState([]), p = w.useCallback(() => {
    const m = l.current, b = c.current;
    if (m == null || b == null) return;
    const C = b.getBoundingClientRect(), E = d.current, v = [];
    if (E != null) {
      const T = Math.max(0, Math.floor(E.x)), D = Math.ceil(E.x + E.width), P = Math.max(0, Math.floor(E.y)), k = Math.ceil(E.y + E.height);
      for (let z = P; z < k; z++)
        for (let S = T; S < D; S++) {
          const x = m.getBounds(S, z);
          x != null && (x.y + x.height < C.top || x.y > C.bottom || x.x + x.width < C.left || x.x > C.right || v.push({
            col: S,
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
        const P = T[D], k = v[D];
        if (P.col !== k.col || P.row !== k.row || P.left !== k.left || P.top !== k.top || P.width !== k.width || P.height !== k.height) return v;
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
    var k, z;
    o == null || o(m, b);
    const [C, E] = m, v = (k = u.current) == null ? void 0 : k.querySelector('[data-glide-dom-cell="' + C + ":" + E + '"]');
    if (v == null) return;
    const T = v.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (T.length !== 1) return;
    const D = T[0], P = D.tagName === "BUTTON" || D.getAttribute("role") === "button";
    typeof D.click == "function" && D.click(), P ? (z = l.current) == null || z.focus() : typeof D.focus == "function" && D.focus();
  }, [o]), y = w.useCallback((m, b, C, E) => {
    d.current = m, requestAnimationFrame(p), i == null || i(m, b, C, E);
  }, [p, i]);
  return w.createElement(
    "div",
    { ref: c, style: { position: "relative", width: "100%" }, "data-glide-dom-wrap": "" },
    w.createElement(K_, Object.assign({}, a, { ref: l, onVisibleRegionChanged: y, onCellActivated: g })),
    w.createElement(
      "div",
      { ref: u, style: { position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }, "data-glide-dom-layer": "" },
      f.map((m) => {
        const b = r == null ? void 0 : r(m.col, m.row);
        if (b == null || b === !1) return null;
        const C = typeof b == "object" && !w.isValidElement(b) && "node" in b ? b : null, E = C != null ? C.node : b;
        return E == null || E === !1 ? null : w.createElement(
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
              /* Glide's cell padding (4px vertical, 8px
                 horizontal is the theme default; the drawn kit
                 faces use 4px all round) so host controls line
                 up with painted cells. */
              padding: 4,
              boxSizing: "border-box",
              pointerEvents: C != null && C.passthrough === !0 ? "none" : "auto",
              /* The cell is a CONTAINER: the host arranges its own
                 buttons/fields inside (and may overflow the box
                 for a morph that expands). */
              overflow: "visible"
            }
          },
          E
        );
      })
    )
  );
});
function G_(t = "light") {
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
function Y_(t = "zinc") {
  switch (t) {
    case "blue":
      return "#2563eb";
    case "emerald":
      return "#059669";
    default:
      return "#52525b";
  }
}
function X_(t = {}) {
  const { fontSize: e = 12, mode: n = "light", accent: r = "#2563eb", overrides: i } = t, o = Ph(), s = n === "light";
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
function V_(t = 12, e) {
  const n = vr(), r = (n == null ? void 0 : n.mode) ?? "light";
  return gn(() => {
    const i = Y_((n == null ? void 0 : n.accent) ?? "zinc");
    return {
      theme: X_({ fontSize: t, mode: r, accent: i, overrides: e }),
      cellColors: G_(r),
      mode: r
    };
  }, [r, n == null ? void 0 : n.accent, t]);
}
function Z1(t, e = {}) {
  return {
    kind: $e.Text,
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
function S3(t, e = {}) {
  return Z1(t, {
    ...e,
    selectionRange: t.length > 0 ? [0, t.length] : void 0
  });
}
function C3(t, e, n) {
  const r = n.trim();
  return r === "" ? !t : r === (t || e).trim();
}
function R3(t, e = {}) {
  return Z1(t, { ...e, allowOverlay: !1, readonly: !0, cursor: e.cursor ?? "default" });
}
function J_(t = {}) {
  return {
    kind: $e.Text,
    data: "",
    displayData: "",
    allowOverlay: !1,
    readonly: !0,
    cursor: t.readonly ? "default" : "pointer",
    themeOverride: t.hovered && t.hoverBg ? { bgCell: t.hoverBg, bgCellMedium: t.hoverBg } : void 0
  };
}
function Z_(t, e, n) {
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
function Q_(t, e, n) {
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
function Ly(t, e) {
  const n = [];
  for (const r of t)
    r >= 0 && r < e && n.push(r);
  return n;
}
function eP(t, e, n) {
  var i;
  if (!t) return null;
  const r = (i = t.current) == null ? void 0 : i.range;
  if (r && r.width > 0 && r.height > 0)
    return { x: r.x, y: r.y, width: r.width, height: r.height };
  if (t.rows.length > 0) {
    const o = Ly(t.rows, e);
    return o.length === 0 ? null : { x: 0, y: o[0], width: n, height: o[o.length - 1] - o[0] + 1 };
  }
  if (t.columns.length > 0) {
    const o = Ly(t.columns, n);
    return o.length === 0 ? null : { x: o[0], y: 0, width: o[o.length - 1] - o[0] + 1, height: e };
  }
  return null;
}
function tP(t, e, n, r) {
  var a;
  const i = [], o = r !== void 0 ? r : t.x, s = r !== void 0 ? r + 1 : t.x + t.width;
  for (let l = t.y; l < t.y + t.height; l++)
    for (let c = o; c < s; c++) {
      const u = (a = e[c]) == null ? void 0 : a.key;
      u && u !== "actions" && i.push({ row: l, colKey: u, val: n });
    }
  return i;
}
function nP(t, e, n, r, i) {
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
function rP(t, e, n) {
  var i;
  const r = [];
  for (let o = t.y; o < t.y + t.height; o++)
    for (let s = t.x; s < t.x + t.width; s++) {
      const a = (i = e[s]) == null ? void 0 : i.key;
      a && n.has(a) && r.push({ row: o, colKey: a, val: "" });
    }
  return r;
}
function iP(t) {
  return t.split(/\r\n|\n|\r/).map((e) => e.split("	"));
}
function oP(t) {
  const e = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  let r = 0;
  const i = (o) => {
    let s = e.get(o);
    s || (s = { current: null }, e.set(o, s));
    let a = n.get(o);
    return a || (a = (l) => {
      const { value: c, onChange: u, onFinishedEditing: d, isHighlighted: f, validatedSelection: h, initialValue: p } = l, g = s.current, { cfg: y, align: m, activation: b, selectAllOnOpen: C, portal: E } = g, v = Y(c), T = Y(!1), D = Y(null), P = (_) => {
        const M = { kind: $e.Text, data: _, displayData: _, allowOverlay: !0 };
        v.current = M, u(M);
      }, k = () => d(v.current), z = () => d(v.current, [1, 0]), S = () => d(void 0, [0, 0]);
      if (Ye(() => {
        if (b < 0) return;
        const _ = D.current;
        _ && (_.focus(), C ? _.select() : _.setSelectionRange(_.value.length, _.value.length));
      }, [b]), y === null)
        return /* @__PURE__ */ A(
          Ks,
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
        const _ = (M) => P(y.uppercase ? M.toUpperCase() : M);
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
            onChange: (M) => _(M.target.value),
            onKeyDown: (M) => {
              if (M.key === "Enter" && !M.shiftKey) {
                M.preventDefault(), M.stopPropagation();
                const O = v.current;
                window.setTimeout(() => d(O), 0);
              }
            }
          }
        );
      }
      const x = y.seedValue ?? (c == null ? void 0 : c.data) ?? "", I = (_) => {
        T.current = !0, P(_[0] ?? "");
      };
      return /* @__PURE__ */ A("div", { style: { width: "100%", height: "100%" }, onKeyDown: (_) => _.stopPropagation(), children: /* @__PURE__ */ A(
        Z2,
        {
          appearance: "inline",
          mode: "single",
          values: x ? [x] : [],
          items: y.items,
          groups: y.groups,
          resolveBy: y.resolveBy ?? "id",
          onChange: I,
          onExit: () => {
            T.current ? k() : S();
          },
          onTabExit: () => z(),
          onEscape: () => {
            T.current = !1, S();
          },
          placeholder: y.placeholder,
          style: { height: "100%" },
          defaultOpen: !0,
          autoFocus: !0,
          initialQuery: p,
          selectAllOnOpen: C,
          browse: y.browse,
          panelMinWidth: y.panelMinWidth,
          createLabel: y.createLabel,
          onCreateItem: y.onCreateItem,
          portalTarget: E,
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
    if (!p || o.kind !== $e.Text || o.readonly === !0) return;
    const [g, y] = p, m = l[g - h];
    if (!m) return;
    const b = m.key;
    let C = d ? d(y, b) : u == null ? void 0 : u[b];
    (C == null ? void 0 : C.kind) === "text" && C.align === void 0 && m.align && (C = { ...C, align: m.align });
    const E = !C && (m.align === "center" || m.align === "right");
    if (!C && !E) return;
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
function sP() {
  const t = Ls(), e = Y(!1);
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
function T3(t) {
  const e = { kind: "kit-badge", ...t };
  return {
    kind: $e.Custom,
    allowOverlay: !1,
    readonly: !0,
    copyData: e.label,
    cursor: "default",
    data: e
  };
}
function E3(t) {
  const e = { kind: "kit-field", ...t };
  return {
    kind: $e.Custom,
    allowOverlay: !0,
    readonly: !1,
    copyData: e.value || e.label,
    // Glide's per-cell activation switch: one click opens the overlay editor,
    // which is where the kit control mounts.
    activationBehaviorOverride: "single-click",
    data: e
  };
}
const aP = {
  neutral: { bg: "rgba(113, 113, 122, 0.16)", fg: "#52525b" },
  accent: { bg: "rgba(37, 99, 235, 0.14)", fg: "#1d4ed8" },
  success: { bg: "rgba(5, 150, 105, 0.14)", fg: "#047857" },
  warning: { bg: "rgba(217, 119, 6, 0.16)", fg: "#b45309" },
  danger: { bg: "rgba(220, 38, 38, 0.14)", fg: "#b91c1c" }
}, lP = {
  neutral: { bg: "rgba(161, 161, 170, 0.18)", fg: "#d4d4d8" },
  accent: { bg: "rgba(96, 165, 250, 0.2)", fg: "#bfdbfe" },
  success: { bg: "rgba(52, 211, 153, 0.2)", fg: "#a7f3d0" },
  warning: { bg: "rgba(251, 191, 36, 0.2)", fg: "#fde68a" },
  danger: { bg: "rgba(248, 113, 113, 0.2)", fg: "#fecaca" }
};
function Q1(t) {
  const e = t.bgCell.replace("#", "");
  if (e.length !== 6) return t.textDark === "#ffffff";
  const n = parseInt(e, 16);
  return (0.2126 * (n >> 16 & 255) + 0.7152 * (n >> 8 & 255) + 0.0722 * (n & 255)) / 255 < 0.5;
}
function ew(t, e, n, r, i, o) {
  const s = Math.min(o, i / 2, r / 2);
  t.beginPath(), t.moveTo(e + s, n), t.lineTo(e + r - s, n), t.quadraticCurveTo(e + r, n, e + r, n + s), t.lineTo(e + r, n + i - s), t.quadraticCurveTo(e + r, n + i, e + r - s, n + i), t.lineTo(e + s, n + i), t.quadraticCurveTo(e, n + i, e, n + i - s), t.lineTo(e, n + s), t.quadraticCurveTo(e, n, e + s, n), t.closePath();
}
function cP(t, e, n, r, i, o) {
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
function uP(t, e, n, r) {
  const i = Q1(n), o = r.variant ?? "subtle", a = Math.max(14, e.height - 4 * 2), l = e.y + (e.height - a) / 2, c = e.x + 4, u = e.width - 8;
  if (u <= 0) return;
  let d = null, f = null, h = n.textDark;
  o === "primary" ? (d = n.accentColor, h = n.accentFg) : o === "outline" ? f = n.borderColor : o === "danger" ? (h = i ? "#fca5a5" : "#b91c1c", f = i ? "rgba(248, 113, 113, 0.4)" : "rgba(220, 38, 38, 0.35)") : d = n.bgBubble, t.save(), t.globalAlpha = r.disabled ? 0.45 : 1, ew(t, c, l, u, a, 6), d && (t.fillStyle = d, t.fill()), r.hoverAmount > 0 && !r.disabled && (t.fillStyle = o === "primary" ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.06)", t.globalAlpha *= Math.min(1, r.hoverAmount), t.fill()), r.highlighted && !r.disabled && (t.strokeStyle = n.accentColor, t.globalAlpha = 0.55, t.lineWidth = 1.5, t.stroke(), t.globalAlpha = 1), f && (t.strokeStyle = f, t.lineWidth = 1, t.stroke());
  const p = Math.max(10, Math.min(12, a - 8));
  t.font = `600 ${p}px ${n.fontFamily}`, t.textBaseline = "middle";
  const g = Math.min(14, a - 6), y = 5, b = t.measureText(r.label).width + (r.icon ? g + y : 0);
  let C = c + Math.max(6, (u - b) / 2);
  const E = l + a / 2;
  r.icon && (cP(t, r.icon, C, E - g / 2, g, h), C += g + y), t.fillStyle = h, t.textAlign = "left", t.fillText(r.label, C, E), t.restore();
}
const dP = ({ value: t, onFinishedEditing: e }) => {
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
  return /* @__PURE__ */ A("div", { style: { width: "100%", height: "100%", display: "flex", alignItems: "center" }, children: n.mode === "search" ? /* @__PURE__ */ A(_v, { ...a, onSubmit: (l) => s(l), expandedWidth: 260 }) : /* @__PURE__ */ A(H2, { ...a, variant: n.variant === "danger" ? "outline" : n.variant ?? "primary", triggerIcon: void 0, clearOnSubmit: !1, onSubmit: (l) => s(l) }) });
};
function fP(t, e) {
  return {
    kind: $e.Custom,
    isMatch: (n) => {
      var r;
      return ((r = n.data) == null ? void 0 : r.kind) === t;
    },
    draw: e,
    needsHover: !0
  };
}
const hP = {
  kind: $e.Custom,
  isMatch: (t) => {
    var e;
    return ((e = t.data) == null ? void 0 : e.kind) === "kit-badge";
  },
  draw: ({ ctx: t, rect: e, theme: n }, r) => {
    const i = r.data.tone ?? "neutral", o = Q1(n) ? lP[i] : aP[i], s = Math.max(10, Math.min(11, e.height - 10));
    t.save(), t.font = `600 ${s}px ${n.fontFamily}`;
    const a = t.measureText(r.data.label).width, c = Math.min(e.width - 8, a + 7 * 2), u = Math.min(e.height - 8, s + 8), d = e.x + (e.width - c) / 2, f = e.y + (e.height - u) / 2;
    ew(t, d, f, c, u, u / 2), t.fillStyle = o.bg, t.fill(), t.fillStyle = o.fg, t.textAlign = "center", t.textBaseline = "middle", t.fillText(r.data.label, e.x + e.width / 2, f + u / 2), t.restore();
  }
}, pP = {
  ...fP("kit-field", (t, e) => {
    uP(t.ctx, t.rect, t.theme, {
      label: e.data.value ? `${e.data.label}: ${e.data.value}` : e.data.label,
      icon: e.data.icon ?? (e.data.mode === "search" ? "search" : "plus"),
      variant: e.data.variant ?? (e.data.mode === "action" ? "primary" : "subtle"),
      hoverAmount: t.hoverAmount,
      highlighted: t.highlighted
    });
  }),
  provideEditor: () => ({ editor: dP, disablePadding: !0, styleOverride: { overflow: "visible" } })
}, gP = [
  hP,
  pP
], $y = gP, mP = 28, yP = 30, cf = {
  columns: rn.empty(),
  rows: rn.empty()
}, uf = /* @__PURE__ */ new Map();
let tw = "";
async function Fy(t) {
  tw = t;
  try {
    await navigator.clipboard.writeText(t);
  } catch {
    const e = document.createElement("textarea");
    e.value = t, e.style.position = "fixed", e.style.left = "-9999px", document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function bP() {
  try {
    const t = await navigator.clipboard.readText();
    if (t) return t;
  } catch {
  }
  return tw;
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
function vP(t) {
  Ye(() => (il.add(t), () => {
    il.delete(t);
  }), [t]);
}
function wP() {
  const t = Y(null), [e, n] = Xe(0);
  return Ye(() => {
    const r = t.current;
    if (!r) return;
    const i = () => n((s) => s === r.getBoundingClientRect().width ? s : r.getBoundingClientRect().width);
    i();
    const o = new ResizeObserver(i);
    return o.observe(r), () => o.disconnect();
  }, []), { ref: t, width: e };
}
const M3 = ({
  columns: t,
  rows: e,
  getCellContent: n,
  onCommit: r,
  editableKeys: i,
  readOnly: o,
  emptyLabel: s,
  baseRowHeight: a = mP,
  baseHeaderHeight: l = yP,
  fontSize: c = 12,
  wrapHeaders: u,
  dataAttr: d,
  className: f = "",
  editors: h,
  getEditor: p,
  customRenderers: g,
  onCellClick: y,
  selectionKey: m,
  themeOverrides: b,
  fillHandle: C = !0,
  disableClipboard: E,
  domCells: v,
  apiRef: T
}) => {
  var Ot;
  const D = Y(e);
  D.current = e;
  const P = Y(!!o);
  P.current = !!o;
  const k = vr(), { theme: z, cellColors: S } = V_(c, b), x = (k == null ? void 0 : k.mode) ?? "light", I = a, _ = l, { ref: M, width: O } = wP(), L = gn(() => {
    const pe = t.reduce((He, Rt) => He + Rt.width, 0);
    if (!O || O <= 0 || pe <= 0) return t;
    const ke = Math.max(120, Math.floor(O) - 1), ue = Math.min(1, t.length - 1), ye = t.map((He) => Math.max(40, Math.floor(He.width / pe * ke)));
    if (ue >= 0) {
      const He = ye.reduce((Rt, Pt) => Rt + Pt, 0);
      ye[ue] = Math.max(40, ye[ue] + (ke - He));
    }
    return t.map((He, Rt) => ({ ...He, width: ye[Rt] }));
  }, [t, O]), W = gn(
    () => L.map((pe) => ({ title: pe.label.toUpperCase(), width: pe.width })),
    [L]
  ), re = _ + Math.max(e.length, 1) * I;
  Ye(() => {
    if (!Q.current) return;
    const pe = [];
    for (let ue = 0; ue < e.length; ue++)
      for (let ye = 0; ye < L.length; ye++) pe.push({ cell: [ye, ue] });
    const ke = setTimeout(() => {
      var ue;
      return (ue = Q.current) == null ? void 0 : ue.updateCells(pe);
    }, 0);
    return () => clearTimeout(ke);
  }, [e, L]);
  const F = oo(), N = Ls(), te = Y(null), G = Y(null);
  Ye(() => {
    var Rt;
    const pe = N ?? (typeof document < "u" ? document : null);
    if (!pe) return;
    const ke = !!((Rt = te.current) != null && Rt.closest('[role="dialog"]')), ue = pe.createElement("div");
    ue.setAttribute("data-glide-overlay-layer", ""), ue.style.cssText = ke ? "position:fixed;left:0;top:0;z-index:10001;pointer-events:auto;width:0;height:0" : "position:fixed;left:0;top:0;z-index:9999;width:0;height:0";
    const ye = (Pt) => Pt.stopPropagation();
    let He = null;
    return ke && (ue.addEventListener("focusin", ye), ue.addEventListener("focusout", ye), He = (Pt) => {
      const it = Pt.relatedTarget;
      it && ue.contains(it) && Pt.stopPropagation();
    }, pe.addEventListener("focusout", He, !0)), pe.body.appendChild(ue), G.current = ue, () => {
      He && pe.removeEventListener("focusout", He, !0), ue.remove(), G.current = null;
    };
  }, [F, N]);
  const j = Y(null);
  j.current = {
    readOnlyRef: P,
    columns: L,
    getValue: (pe, ke) => {
      var ue;
      return String(((ue = D.current[pe]) == null ? void 0 : ue[ke]) ?? "");
    },
    editors: h,
    getEditor: p,
    portalRef: G,
    columnOffset: 0
  };
  const ee = gn(() => oP(() => j.current), []), q = sP(), Q = Y(null), [X, J] = Xe(() => (m ? uf.get(m) : void 0) ?? cf);
  Ye(() => {
    J(m ? uf.get(m) ?? cf : cf);
  }, [m]);
  const K = Y(X);
  K.current = X;
  const [se, le] = Xe(null), Ce = Y(null), Re = gn(() => {
    const pe = /* @__PURE__ */ new Map();
    for (const ke of v ?? []) {
      const ue = L.findIndex((ye) => ye.key === ke.colKey);
      ue >= 0 && pe.set(`${ue}:${ke.row}`, { node: ke.node, passthrough: ke.passthrough });
    }
    return pe;
  }, [v, L]);
  Ye(() => {
    if (T)
      return T.current = {
        openCellEditor: (pe, ke) => {
          var ye;
          const ue = L.findIndex((He) => He.key === ke);
          ue >= 0 && ((ye = Q.current) == null || ye.openCellEditor(ue, pe));
        }
      }, () => {
        T.current = null;
      };
  }, [T, L]);
  const Be = Ne(
    (pe, ke) => Re.get(`${pe}:${ke}`) ?? null,
    [Re]
  ), rt = Ne((pe) => {
    var Rt;
    const ke = pe == null ? void 0 : pe.location, ue = (pe == null ? void 0 : pe.kind) === "cell" && ke && ke[1] >= 0 && ke[1] < D.current.length ? ke[1] : null;
    if (ue === Ce.current) return;
    const ye = Ce.current;
    Ce.current = ue;
    const He = [];
    if (ye != null) for (let Pt = 0; Pt < L.length; Pt++) He.push({ cell: [Pt, ye] });
    if (ue != null) for (let Pt = 0; Pt < L.length; Pt++) He.push({ cell: [Pt, ue] });
    He.length && ((Rt = Q.current) == null || Rt.updateCells(He));
  }, [L.length]), mt = Ne(([pe, ke]) => {
    const ue = L[pe], ye = D.current[ke];
    if (!ue || !ye) return J_({ readonly: !0 });
    const He = ke === Ce.current, Rt = n(ue, ye, ke);
    if (P.current) return { ...Rt, readonly: !0, allowOverlay: !1 };
    if (Rt.kind === $e.Custom) return Rt;
    const Pt = !!Rt.readonly, it = Rt.themeOverride ?? {};
    if (!Pt) {
      const sn = He ? S.editableHoverBg : S.editableBg;
      return { ...Rt, themeOverride: { ...it, bgCell: sn, bgCellMedium: sn } };
    }
    return He ? { ...Rt, themeOverride: { ...it, bgCell: S.readonlyHoverBg, bgCellMedium: S.readonlyHoverBg } } : Rt;
  }, [L, n, S]), ut = Ne((pe, ke) => {
    ke();
    const { ctx: ue, rect: ye, column: He, columnIndex: Rt, theme: Pt } = pe, it = L[Rt];
    if (!it) return;
    const sn = (it.align ?? "left") === "center";
    if (!sn && !u) return;
    ue.save(), ue.fillStyle = Pt.bgHeader, ue.fillRect(ye.x + 1, ye.y, ye.width - 2, ye.height), ue.fillStyle = Pt.textHeader, ue.textAlign = sn ? "center" : "left", ue.textBaseline = "middle", ue.beginPath(), ue.rect(ye.x, ye.y, ye.width, ye.height), ue.clip();
    const he = sn ? ye.x + ye.width / 2 : ye.x + 6, we = String(He.title);
    if (!u)
      ue.fillText(we, he, ye.y + ye.height / 2);
    else {
      const qe = [];
      let Ue = "";
      const zt = ye.width - 8;
      for (const Z of we.split(/\s+/)) {
        const xe = Ue ? `${Ue} ${Z}` : Z;
        if (ue.measureText(xe).width <= zt) {
          Ue = xe;
          continue;
        }
        Ue && (qe.push(Ue), Ue = "");
        let Te = "";
        for (const Ze of Z)
          Te && ue.measureText(Te + Ze).width > zt ? (qe.push(Te), Te = Ze) : Te += Ze;
        Ue = Te;
      }
      Ue && qe.push(Ue);
      const tn = Math.min(14, ye.height / Math.max(1, qe.length)), bt = ye.y + ye.height / 2 - (qe.length - 1) * tn / 2;
      qe.forEach((Z, xe) => ue.fillText(Z, he, bt + xe * tn));
    }
    ue.restore();
  }, [L, u]), ne = Ne((pe, ke) => {
    y == null || y(pe, ke);
  }, [y]), _e = Ne((pe) => {
    if (P.current) return;
    const ke = [];
    for (const ue of pe)
      i.has(ue.colKey) && D.current[ue.row] && ke.push({ row: ue.row, colKey: ue.colKey, value: ue.val });
    ke.length > 0 && r(ke);
  }, [i, r]), Ae = Ne(
    () => eP(K.current, e.length, L.length),
    [e.length, L.length]
  ), Ke = Ne((pe) => {
    if (P.current) return !1;
    if (pe.length === 1 && pe[0].value.kind === $e.Text) {
      const ke = Ae();
      if (ke && ke.width * ke.height > 1) {
        const ue = tP(ke, L, pe[0].value.data);
        if (ue.length > 1)
          return _e(ue), !0;
      }
    }
    return _e(pe.map((ke) => {
      var ue;
      return {
        row: ke.location[1],
        colKey: ((ue = L[ke.location[0]]) == null ? void 0 : ue.key) ?? "",
        val: ke.value.kind === $e.Text ? ke.value.data : ke.value.kind === $e.Boolean ? String(ke.value.data) : ""
      };
    })), !0;
  }, [L, _e, Ae]), Fe = Ne((pe, ke) => {
    var ye, He;
    if (P.current) return !1;
    const ue = nP(
      [pe[0], pe[1]],
      ke,
      D.current.length,
      L,
      (He = (ye = K.current) == null ? void 0 : ye.current) == null ? void 0 : He.range
    );
    return _e(ue), !1;
  }, [L, _e]), ze = Ne(async () => {
    const pe = Ae();
    if (!pe) return;
    const ke = Z_(e, L, pe);
    ke.length > 0 && await Fy(ke), le(null);
  }, [e, L, Ae]), Je = Ne(async () => {
    if (P.current) {
      le(null);
      return;
    }
    const pe = Ae();
    if (!pe) return;
    const { text: ke, committers: ue } = Q_(e, L, pe);
    ke.length > 0 && (await Fy(ke), _e(ue.map((ye) => ({ ...ye, val: "" })))), le(null);
  }, [e, L, _e, Ae]), gt = Ne(() => {
    if (P.current) {
      le(null);
      return;
    }
    const pe = Ae();
    pe && (_e(rP(pe, L, i)), le(null));
  }, [L, i, _e, Ae]), Se = Ne(() => {
    var ue;
    const pe = K.current;
    let ke = (ue = pe.current) == null ? void 0 : ue.cell;
    if (!ke && pe.rows.length > 0) {
      for (let ye = 0; ye < D.current.length; ye++)
        if (pe.rows.hasIndex(ye)) {
          ke = [0, ye];
          break;
        }
    }
    return ke ?? null;
  }, []), Ve = Ne((pe) => {
    if (P.current) return;
    const ke = Se();
    ke && Fe(ke, iP(pe));
  }, [Se, Fe]), kt = Ne(async () => {
    const pe = await bP();
    pe && Ve(pe), le(null);
  }, [Ve]);
  vP(Ne((pe) => {
    E || Ve(pe);
  }, [E, Ve]));
  const yt = Y({ copy: () => {
  }, cut: () => {
  }, paste: () => {
  } });
  yt.current = { copy: ze, cut: Je, paste: kt }, Ye(() => {
    if (E) return;
    const pe = N ?? (typeof document < "u" ? document : null);
    if (!pe) return;
    const ke = (ye) => ye instanceof HTMLElement ? ye.tagName === "INPUT" || ye.tagName === "TEXTAREA" || ye.isContentEditable : !1, ue = (ye) => {
      if (!(ye.metaKey || ye.ctrlKey) || ye.shiftKey || ye.altKey) return;
      const He = ye.key.toLowerCase();
      if (He !== "c" && He !== "x" && He !== "v" || ke(ye.target)) return;
      ye.preventDefault(), ye.stopPropagation();
      const Rt = yt.current;
      He === "c" ? Rt.copy() : He === "x" ? Rt.cut() : Rt.paste();
    };
    return pe.addEventListener("keydown", ue, !0), () => pe.removeEventListener("keydown", ue, !0);
  }, [N, E]);
  const et = Ne((pe, ke) => {
    var He, Rt;
    ke.preventDefault();
    const [ue, ye] = pe;
    ye < 0 || ye >= D.current.length || le({
      x: (((He = ke.bounds) == null ? void 0 : He.x) ?? 0) + (ke.localEventX ?? 0),
      y: (((Rt = ke.bounds) == null ? void 0 : Rt.y) ?? 0) + (ke.localEventY ?? 0),
      row: ye,
      col: ue
    });
  }, []), Ct = ((Ot = X.current) == null ? void 0 : Ot.range) !== void 0 || X.rows.length > 0 || X.columns.length > 0, dt = Ne((pe) => {
    J(pe), m && uf.set(m, pe);
  }, [m]), ft = gn(
    () => g ? [...$y, ...g] : $y,
    [g]
  );
  return /* @__PURE__ */ fe(
    "div",
    {
      ref: te,
      className: `relative ${f}`,
      ...d ? { [d]: "" } : {},
      "data-glide-sheet": x,
      onPointerLeave: () => {
        var ue;
        const pe = Ce.current;
        if (pe == null) return;
        Ce.current = null;
        const ke = [];
        for (let ye = 0; ye < L.length; ye++) ke.push({ cell: [ye, pe] });
        (ue = Q.current) == null || ue.updateCells(ke);
      },
      children: [
        /* @__PURE__ */ A("div", { ref: M, style: { touchAction: "none" }, children: e.length === 0 && s ? /* @__PURE__ */ A("div", { className: "px-2.5 py-6 text-center text-xs text-[color:var(--ui-text-faint)]", children: s }) : O > 0 ? /* @__PURE__ */ A(
          U_,
          {
            ref: Q,
            getDomCell: v && v.length > 0 ? Be : void 0,
            width: Math.max(120, Math.floor(O) - 1),
            height: re,
            columns: W,
            rows: e.length,
            getCellContent: mt,
            onCellsEdited: Ke,
            onPaste: Fe,
            provideEditor: ee,
            ...q,
            getCellsForSelection: !0,
            gridSelection: X,
            onGridSelectionChange: dt,
            theme: z,
            rowHeight: I,
            headerHeight: _,
            drawHeader: ut,
            onCellClicked: ne,
            onItemHovered: rt,
            onCellContextMenu: et,
            customRenderers: ft,
            editOnType: !0,
            rangeSelect: "rect",
            cellActivationBehavior: "double-click",
            fillHandle: C && !o,
            portalElementRef: G,
            minColumnWidth: 1,
            maxColumnWidth: 1e4
          }
        ) : /* @__PURE__ */ A("div", { style: { height: re } }) }),
        /* @__PURE__ */ fe(
          Ux,
          {
            open: !!se,
            x: (se == null ? void 0 : se.x) ?? 0,
            y: (se == null ? void 0 : se.y) ?? 0,
            onClose: () => le(null),
            theme: x,
            children: [
              /* @__PURE__ */ A(aa, { onClick: () => void ze(), icon: /* @__PURE__ */ A(Gw, { className: "w-3.5 h-3.5" }), disabled: !Ct, children: "Copy" }),
              /* @__PURE__ */ A(aa, { onClick: () => void kt(), icon: /* @__PURE__ */ A(Yw, { className: "w-3.5 h-3.5" }), disabled: o || E, children: "Paste" }),
              /* @__PURE__ */ A(aa, { onClick: gt, icon: /* @__PURE__ */ A(za, { className: "w-3.5 h-3.5 text-[color:var(--ui-text-faint)]" }), disabled: !Ct || o, children: "Clear" }),
              /* @__PURE__ */ A(Gx, {}),
              /* @__PURE__ */ A(aa, { onClick: () => void Je(), icon: /* @__PURE__ */ A(Xw, { className: "w-3.5 h-3.5 text-[color:var(--ui-text-faint)]" }), disabled: !Ct || o, children: "Cut" })
            ]
          }
        )
      ]
    }
  );
}, xP = ({ label: t, testId: e, onOpen: n }) => /* @__PURE__ */ A("div", { className: "flex h-full items-center justify-end", children: /* @__PURE__ */ A(
  "button",
  {
    type: "button",
    className: "pointer-events-auto flex h-6 w-6 items-center justify-center rounded text-[color:var(--ui-text-faint)] hover:bg-[var(--ui-card-hover)] hover:text-[color:var(--ui-text)]",
    onClick: n,
    "data-testid": e,
    "aria-label": t ? `Open picker (${t})` : "Open picker",
    tabIndex: -1,
    children: /* @__PURE__ */ A(ci, { className: "h-3.5 w-3.5" })
  }
) });
function I3(t) {
  return {
    row: t.row,
    colKey: t.colKey,
    passthrough: !0,
    node: /* @__PURE__ */ A(xP, { label: t.label, testId: t.testId, onOpen: t.onOpen })
  };
}
export {
  o3 as $,
  vx as A,
  cr as B,
  RA as C,
  Qy as D,
  YP as E,
  P2 as F,
  M3 as G,
  Pi as H,
  Pn as I,
  Of as J,
  $y as K,
  e3 as L,
  Nf as M,
  Hs as N,
  hb as O,
  Xx as P,
  VP as Q,
  ca as R,
  H2 as S,
  IE as T,
  _v as U,
  ab as V,
  x3 as W,
  xP as X,
  Z2 as Y,
  bx as Z,
  v3 as _,
  _o as a,
  Rx as a$,
  _2 as a0,
  L2 as a1,
  j2 as a2,
  h3 as a3,
  f3 as a4,
  Fa as a5,
  sb as a6,
  cb as a7,
  m3 as a8,
  Wf as a9,
  rh as aA,
  Sx as aB,
  Ie as aC,
  _x as aD,
  oP as aE,
  X_ as aF,
  eP as aG,
  b3 as aH,
  tP as aI,
  $p as aJ,
  Gy as aK,
  cl as aL,
  WP as aM,
  qP as aN,
  G_ as aO,
  sp as aP,
  X2 as aQ,
  Ha as aR,
  ik as aS,
  C3 as aT,
  df as aU,
  T3 as aV,
  gP as aW,
  E3 as aX,
  U2 as aY,
  q2 as aZ,
  rb as a_,
  GP as aa,
  gk as ab,
  ua as ac,
  mk as ad,
  wb as ae,
  yk as af,
  d3 as ag,
  vk as ah,
  a3 as ai,
  bk as aj,
  l3 as ak,
  u3 as al,
  c3 as am,
  lb as an,
  KP as ao,
  UP as ap,
  S2 as aq,
  k2 as ar,
  da as as,
  Co as at,
  zf as au,
  J_ as av,
  Z_ as aw,
  Q_ as ax,
  W2 as ay,
  Ex as az,
  NR as b,
  Jy as b0,
  Iv as b1,
  Mr as b2,
  jl as b3,
  iP as b4,
  B2 as b5,
  Y2 as b6,
  I3 as b7,
  Zi as b8,
  Dv as b9,
  mn as bA,
  _i as bB,
  Ls as bC,
  $s as bD,
  JP as bE,
  eb as bF,
  ub as bG,
  sP as bH,
  V_ as bI,
  jP as bJ,
  bb as bK,
  qf as bL,
  vr as bM,
  wx as bN,
  QP as bO,
  jf as bP,
  Bx as bQ,
  ll as bR,
  Df as bS,
  oo as bT,
  ib as bU,
  ob as bV,
  Px as bW,
  pk as bX,
  t3 as bY,
  K2 as ba,
  rP as bb,
  nP as bc,
  kx as bd,
  xx as be,
  Op as bf,
  Y_ as bg,
  oh as bh,
  G2 as bi,
  hi as bj,
  Gi as bk,
  v2 as bl,
  $2 as bm,
  Pv as bn,
  S3 as bo,
  Tx as bp,
  HP as bq,
  op as br,
  R3 as bs,
  z2 as bt,
  y3 as bu,
  w2 as bv,
  Z1 as bw,
  Ax as bx,
  V2 as by,
  BP as bz,
  k3 as c,
  Ff as d,
  Dx as e,
  i3 as f,
  g3 as g,
  p3 as h,
  To as i,
  Ux as j,
  Gx as k,
  aa as l,
  ME as m,
  XP as n,
  r3 as o,
  ZP as p,
  jx as q,
  dl as r,
  wr as s,
  Kx as t,
  Hf as u,
  s3 as v,
  n3 as w,
  N2 as x,
  w3 as y,
  $e as z
};
