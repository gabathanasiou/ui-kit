"use client";
var Dw = Object.defineProperty;
var Nw = (t, e, n) => e in t ? Dw(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var Ve = (t, e, n) => Nw(t, typeof e != "symbol" ? e + "" : e, n);
import { jsx as _, jsxs as pe, Fragment as Dn } from "react/jsx-runtime";
import * as w from "react";
import Mt, { createContext as ti, useContext as ni, useState as Ye, useEffect as Ge, useRef as V, useCallback as Ne, useLayoutEffect as Nn, useMemo as pn, useId as Ow, useImperativeHandle as By, forwardRef as np, createElement as rp } from "react";
import * as hn from "@radix-ui/react-dropdown-menu";
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
  const [, t] = Ye(0);
  return Ge(() => {
    const e = () => t((n) => n + 1);
    return Ts.add(e), () => {
      Ts.delete(e);
    };
  }, []), Pn && al > 0;
}
function gn() {
  const [, t] = Ye(0);
  return Ge(() => {
    const e = () => t((n) => n + 1);
    return Ts.add(e), () => {
      Ts.delete(e);
    };
  }, []), al;
}
function Te(t, e, n) {
  return Pn ? Math.round(t + (e - t) * n) : t;
}
function _i(t, e) {
  const n = gn();
  return Pn && n > 0 ? {
    padding: `${Te(t.py, e.py, n)}px ${Te(t.px, e.px, n)}px`,
    fontSize: `${Te(t.fs, e.fs, n)}px`
  } : { padding: `${t.py}px ${t.px}px`, fontSize: `${t.fs}px` };
}
function Yy() {
  const t = gn(), e = Pn && t > 0;
  return {
    box: e ? Te(28, 36, t) : 20,
    icon: e ? Te(16, 20, t) : 14
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
  const [, t] = Ye(0), e = V(Ao);
  return Ge(() => {
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
  const [, t] = Ye(0);
  return Ge(() => {
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
  const e = V(null), [n, r] = Ye(!1), i = V(null), o = V(0), s = Ne((p) => {
    if (t.ref && (t.ref.current = p), p) {
      o.current = 0, e.current = p;
      const y = p.getBoundingClientRect();
      (y.width > 0 || y.height > 0) && (i.current = { left: y.left, top: y.top, width: y.width, height: y.height }), r(!0);
      return;
    }
    const g = e.current, m = ++o.current;
    queueMicrotask(() => {
      m === o.current && e.current === g && (e.current = null, r(!1), !(!g || !t.cloneOnUnmount || !l.current) && g.style.visibility !== "hidden" && jl(f.current) && Sx(g, u.current, i.current));
    });
  }, []), a = Ne(() => {
    const p = e.current;
    if (!p || getComputedStyle(p).transform !== "none") return;
    const g = p.getBoundingClientRect();
    (g.width > 0 || g.height > 0) && (i.current = { left: g.left, top: g.top, width: g.width, height: g.height });
  }, []), l = V(t.visible);
  l.current = t.visible;
  const c = V(t.visible), u = V(t.anchor ?? null);
  u.current = t.anchor ?? null;
  const d = V(t.onClosed);
  d.current = t.onClosed;
  const f = V(t.morph !== !1);
  f.current = t.morph !== !1;
  const h = V(0);
  return Nn(() => {
    if (!n || !l.current || !jl(f.current)) return;
    const p = e.current;
    p && xx(h, p, u.current);
  }, [n, t.visible]), Ge(() => {
    if (!n || !l.current) return;
    let p = 0;
    const g = () => {
      p = 0, a(), p = requestAnimationFrame(g);
    };
    return p = requestAnimationFrame(g), () => {
      p && cancelAnimationFrame(p);
    };
  }, [n, a]), Nn(() => {
    var m;
    const p = c.current;
    if (c.current = t.visible, t.visible || !p) return;
    const g = e.current;
    if (!g || !jl(f.current)) {
      (m = d.current) == null || m.call(d);
      return;
    }
    kx(h, g, u.current, () => {
      var y;
      return (y = d.current) == null ? void 0 : y.call(d);
    });
  }, [t.visible]), Ge(() => {
    if (!n || !l.current) return;
    const p = (g) => {
      const m = e.current;
      m && m.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", p, { capture: !0 }), () => document.removeEventListener("wheel", p, { capture: !0 });
  }, [n]), Ge(() => {
    if (!n || !l.current) return;
    const p = (g) => {
      const m = e.current;
      m && m.contains(g.target) && g.stopImmediatePropagation();
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
  const u = $s(), d = V(u);
  d.current = u;
  const f = V(c);
  f.current = c, Nn(() => {
    if (!n) return;
    let h = 0, p = !1;
    const g = () => {
      h || (h = requestAnimationFrame(m));
    }, m = () => {
      if (h = 0, p) return;
      const C = d.current, D = t.current, P = e.current;
      if (!C || !D || !P || !P.isConnected) return;
      const S = (r == null ? void 0 : r.current) ?? P, z = Cx(C), k = a ?? Qy, x = Math.min(l, k), E = Math.max(0, P.offsetHeight - S.offsetHeight), I = Math.max(x, Math.ceil(S.scrollHeight + E)), M = Math.min(I, k);
      P.style.maxHeight = `${M}px`;
      let N = M;
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
            apply({ availableHeight: oe }) {
              N = Math.max(x, Math.floor(Math.min(k, oe))), P.style.maxHeight = `${N}px`;
            }
          })
        ]
      }).then(({ x: oe, y: F, placement: O }) => {
        p || !Number.isFinite(oe) || !Number.isFinite(F) || f.current({
          top: Math.round(F),
          left: Math.round(oe),
          maxH: N,
          side: O.startsWith("top") ? "top" : "bottom",
          ready: !0
        });
      });
    };
    m();
    const y = d.current, b = (y == null ? void 0 : y.document) ?? null, T = (y == null ? void 0 : y.visualViewport) ?? null, A = () => g();
    T == null || T.addEventListener("resize", A), T == null || T.addEventListener("scroll", A), y == null || y.addEventListener("resize", A), b == null || b.addEventListener("scroll", A, { capture: !0, passive: !0 });
    let v = null;
    return typeof ResizeObserver < "u" && (v = new ResizeObserver(A), e.current && v.observe(e.current), r != null && r.current && v.observe(r.current)), () => {
      p = !0, h && cancelAnimationFrame(h), T == null || T.removeEventListener("resize", A), T == null || T.removeEventListener("scroll", A), y == null || y.removeEventListener("resize", A), b == null || b.removeEventListener("scroll", A, { capture: !0 }), v == null || v.disconnect();
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
  return /* @__PURE__ */ _(nb.Provider, { value: t, children: e });
}
function KP({ mode: t, accent: e, surface: n, context: r, children: i }) {
  const o = vr();
  return /* @__PURE__ */ _($f, { theme: Lf({ mode: t, accent: e, surface: n, context: r }, o), children: i });
}
function UP({ mode: t, accent: e, surface: n, context: r, children: i, className: o, style: s }) {
  const a = vr(), l = Lf({ mode: t, accent: e, surface: n, context: r }, a);
  return /* @__PURE__ */ _($f, { theme: l, children: /* @__PURE__ */ _(
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
  const o = V(!1), s = V(!1), a = V(!1), l = V({ row: e, scroller: r, block: n });
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
  }, [t]), Ge(() => {
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
  } = t, [f, h] = Ye(() => Mr(n, r)), p = pn(() => new Set(s ?? []), [s]), g = pn(() => new Set(f), [f]), m = o !== void 0 && f.length >= o, y = !Gi(f, n), b = Ne((z) => {
    if (p.has(z)) return;
    const k = g.has(z), x = Ax(f, z, r, { max: o, disabledIds: s });
    Gi(x, f) || (h(x), d == null || d(x), u == null || u(z, !k));
  }, [f, g, p, r, o, s, u, d]), T = Ne((z) => {
    const k = z.filter((I) => !p.has(I)), x = sp(f, k), E = op(f, k, x !== "all", r, { max: o, disabledIds: s });
    Gi(E, f) || (h(E), d == null || d(E));
  }, [f, p, r, o, s, d]), A = Ne((z, k = i ?? r) => {
    const x = op(f, k, z, r, { max: o, disabledIds: s });
    Gi(x, f) || (h(x), d == null || d(x));
  }, [f, i, r, o, s, d]), v = Ne(() => {
    f.length !== 0 && (h([]), d == null || d([]));
  }, [f, d]), C = Ne((z) => {
    h(Mr(z ?? n, r));
  }, [n, r]), D = Ne(() => !c || Gi(f, n) ? !1 : (c(Mr(f, r)), !0), [c, f, n, r]), P = Ne(() => !l || Gi(f, n) ? !1 : (l(Mr(f, r)), !0), [l, f, n, r]), S = Ne((z) => sp(f, z), [f]);
  return {
    mode: e,
    indicator: a,
    draft: f,
    count: f.length,
    max: o,
    atMax: m,
    dirty: y,
    hiddenCount: _x(f, r, i),
    isSelected: (z) => g.has(z),
    isDisabled: (z) => p.has(z),
    canToggle: (z) => !p.has(z) && (g.has(z) || !m),
    toggle: b,
    toggleGroup: T,
    setAll: A,
    clear: v,
    reset: C,
    commit: D,
    flush: P,
    cancel: C,
    groupState: S
  };
}
const sb = ti(null), Px = () => ni(sb), ab = Ix;
function Ff({ checked: t, size: e, tone: n = "accent", indeterminate: r = !1 }) {
  return /* @__PURE__ */ _(
    "span",
    {
      className: `ui-check-indicator ${t || r ? "ui-check-indicator-checked" : ""} ${n === "danger" ? "ui-check-tone-danger" : ""}`,
      "aria-hidden": !0,
      children: r ? /* @__PURE__ */ pe("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: [
        /* @__PURE__ */ _("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor", stroke: "var(--ui-check-ring)", strokeWidth: 1 }),
        /* @__PURE__ */ _("path", { d: "M4.5 8 H11.5", stroke: "var(--ui-check-check)", strokeWidth: 2, strokeLinecap: "round", fill: "none" })
      ] }) : t ? /* @__PURE__ */ pe("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: [
        /* @__PURE__ */ _("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor", stroke: "var(--ui-check-ring)", strokeWidth: 1 }),
        /* @__PURE__ */ _("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "var(--ui-check-check)", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" })
      ] }) : /* @__PURE__ */ _("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: /* @__PURE__ */ _("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) })
    }
  );
}
function Dx({ checked: t, onChange: e, disabled: n = !1, label: r, id: i, className: o = "", labelClassName: s = "", theme: a, variant: l = "pill", tone: c = "accent", block: u = !1 }) {
  const d = l !== "plain", f = gn(), h = Te(16, 20, f), p = Te(12, 14, f), g = Te(12, 14, f), m = Te(12, 16, f), y = Te(10, 12, f), b = Te(8, 10, f);
  return /* @__PURE__ */ pe(
    "label",
    {
      className: `ui-press ui-checkbox ${d ? "ui-checkbox-pill rounded-lg" : ""} ${c === "danger" ? "ui-checkbox-tone-danger" : ""} ${n ? "ui-disabled" : ""} ${o}`,
      style: { display: u ? "flex" : "inline-flex", alignItems: "center", gap: b, padding: d ? `${y}px ${m}px` : void 0 },
      onClick: (A) => A.stopPropagation(),
      ...a ? { "data-theme": a } : {},
      children: [
        /* @__PURE__ */ _(
          "input",
          {
            type: "checkbox",
            id: i,
            checked: t,
            disabled: n,
            onChange: (A) => e(A.target.checked),
            className: "sr-only"
          }
        ),
        d ? /* @__PURE__ */ _(Ff, { checked: t, size: h, tone: c }) : /* @__PURE__ */ _("span", { className: "ui-checkbox-box", style: { width: h, height: h }, "aria-hidden": !0, children: t && /* @__PURE__ */ _("svg", { viewBox: "0 0 12 12", fill: "none", style: { width: p, height: p }, "aria-hidden": !0, children: /* @__PURE__ */ _("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ _("span", { className: `ui-checkbox-label ${s}`, style: { fontSize: g }, children: r })
      ]
    }
  );
}
const ap = "transition-[grid-template-columns] ease-out duration-150 group-hover:duration-200 motion-reduce:transition-none", Nx = "group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] group-data-[state=open]:grid-cols-[1fr]", Ox = "group-hover:grid-cols-[0fr] group-focus-visible:grid-cols-[0fr] group-data-[state=open]:grid-cols-[0fr]", zx = "group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[state=open]:opacity-100";
function Lx(t) {
  if (!Mt.isValidElement(t)) return String(t ?? "");
  const e = t.type, n = typeof e == "string" ? e : e.displayName || e.name || "icon", r = t.props;
  return `${n}|${r.className ?? ""}|${r.size ?? ""}`;
}
function lb({ icon: t, collapse: e = !1, iconWithLabel: n = !0, active: r = !1, gap: i = 6, reserve: o, roll: s = "up", children: a }) {
  const l = !!e && !!t, c = l && !n, u = !!t && (n || l), d = Lx(t), [f, h] = Ye({ sig: d, node: t }), [p, g] = Ye(null);
  d !== f.sig && (h({ sig: d, node: t }), g(f.node)), Ge(() => {
    if (p == null) return;
    const y = window.setTimeout(() => g(null), 200);
    return () => window.clearTimeout(y);
  }, [p]);
  const m = p == null ? t : /* @__PURE__ */ pe("span", { className: "relative inline-flex items-center justify-center overflow-hidden", children: [
    /* @__PURE__ */ _("span", { "aria-hidden": !0, className: `ui-icon-roll-out${s === "down" ? "-down" : ""} absolute inset-0 inline-flex items-center justify-center`, children: p }, `out:${f.sig}`),
    /* @__PURE__ */ _("span", { className: `ui-icon-roll-in${s === "down" ? "-down" : ""} inline-flex items-center justify-center`, children: t }, `in:${d}`)
  ] });
  return l ? /* @__PURE__ */ pe(Dn, { children: [
    u && (c ? /* @__PURE__ */ _("span", { "data-kit-icon": !0, className: `grid min-w-0 ${ap} ${r ? "grid-cols-[0fr]" : `grid-cols-[1fr] ${Ox}`}`, children: /* @__PURE__ */ _("span", { className: "inline-flex min-w-0 items-center overflow-hidden", children: m }) }) : /* @__PURE__ */ _("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: m })),
    /* @__PURE__ */ _("span", { "data-kit-label": !0, className: `grid min-w-0 ${ap} ${r ? "grid-cols-[1fr]" : `grid-cols-[0fr] ${Nx}`}`, children: /* @__PURE__ */ _("span", { className: "min-w-0 overflow-hidden", children: /* @__PURE__ */ _(
      "span",
      {
        className: `flex min-w-0 items-center whitespace-nowrap transition-[opacity,padding-left] duration-100 group-hover:duration-150 motion-reduce:transition-none ${r ? "opacity-100" : `opacity-0 ${zx}`} ${c ? `pl-[var(--kit-collapse-gap)] group-hover:pl-0! group-focus-visible:pl-0! group-data-[state=open]:pl-0! ${r ? "pl-0!" : ""}` : ""}`,
        style: c ? { "--kit-collapse-gap": `${i}px` } : { paddingLeft: i },
        children: o ? /* @__PURE__ */ pe("span", { className: "inline-grid min-w-0", children: [
          /* @__PURE__ */ _("span", { "aria-hidden": !0, className: "invisible col-start-1 row-start-1 whitespace-nowrap", children: o }),
          /* @__PURE__ */ _("span", { className: "col-start-1 row-start-1", children: a })
        ] }) : a
      }
    ) }) })
  ] }) : /* @__PURE__ */ pe(Dn, { children: [
    u && /* @__PURE__ */ _("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: t }),
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
  children: m,
  ...y
}) {
  const b = vr(), T = e ?? (b == null ? void 0 : b.mode) ?? "light", A = n ?? Ex(b), v = _i({ px: 10, py: 6, fs: 12 }, { px: 14, py: 9, fs: 14 }), C = _i({ px: 12, py: 6, fs: 12 }, { px: 16, py: 9, fs: 14 }), D = _i({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), P = "", S = "", z = `${a ? "ui-reveal " : ""}ui-press inline-flex items-center font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed`, k = "rounded", x = "rounded-[var(--ui-radius-btn)]", E = {
    light: {
      active: "text-white",
      inactive: "text-zinc-500 hover:text-zinc-900"
    },
    dark: {
      active: "text-zinc-900",
      inactive: "text-zinc-400 hover:text-zinc-200"
    }
  }, I = {
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
  }, N = {
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
  }, oe = y["data-state"] === "open", F = L[T][t], O = t === "primary" ? C : t.startsWith("tab") ? D : v, ne = Pn ? { padding: "8px 12px", fontSize: "14px", lineHeight: "20px", border: "1px solid transparent" } : { padding: "6px 8px", fontSize: "12px", lineHeight: "16px", border: "1px solid transparent" }, j = Te(6, 8, gn()), U = Te(28, 40, gn()), re = A === "emerald" ? "emerald" : A ? "blue" : null, q = "bg-[var(--ui-btn-active-bg)]! text-[color:var(--ui-btn-active-text)]!", ie = {
    info: "bg-blue-600! hover:bg-blue-500! text-white!",
    success: "bg-emerald-600! hover:bg-emerald-500! text-white!",
    warning: "bg-amber-500! hover:bg-amber-400! text-zinc-950!",
    danger: "bg-rose-600! hover:bg-rose-500! text-white!"
  };
  let Z;
  if (t === "tab") {
    const ce = E[T];
    Z = `${k} ${r ? re ? I[re].active : ce.active : re ? I[re][T === "light" ? "inactiveLight" : "inactiveDark"] : ce.inactive}`;
  } else if (t === "tab-header") {
    const ce = re ? r ? N[re].active : N[re].inactive : r ? M.active : M.inactive;
    Z = `${k} ${ce} ${oe ? re ? N[re].open : M.open : ""}`;
  } else {
    if (Z = `${x} ${F.base} ${oe ? F.open : ""}`, t === "primary" && re) {
      const ce = W[re];
      Z = `${x} ${oe ? `${ce.base} ${ce.open}` : ce.base}`;
    }
    r && (Z = `${Z} ${i === "neutral" ? q : ie[i]}`);
  }
  const Q = !!f && !!d && !o, Y = o ? { width: U, height: U, padding: 0, gap: 0 } : s === "minimal" ? { ...ne, gap: Q ? 0 : j } : { ...O, gap: Q ? 0 : j };
  return /* @__PURE__ */ _(
    "button",
    {
      type: g,
      "data-mode": T,
      "data-accent": b == null ? void 0 : b.accent,
      className: `${z} ${o ? "justify-center" : ""} ${Q ? "group" : ""} ${Z} ${p}`,
      "aria-pressed": r && !t.startsWith("tab") ? !0 : void 0,
      "data-active": r || void 0,
      style: Y,
      ...y,
      children: o ? m : /* @__PURE__ */ _(
        lb,
        {
          icon: d,
          collapse: f,
          iconWithLabel: h,
          active: r && (t.startsWith("tab") || l),
          gap: j,
          reserve: c,
          roll: u,
          children: m
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
  const s = gn(), a = i ?? Te(14, 18, s);
  return r === "check" ? /* @__PURE__ */ _(
    "span",
    {
      "data-selection-check": "check",
      className: `inline-flex shrink-0 items-center justify-center ${n ? "opacity-40" : ""} ${o}`,
      style: { width: a, height: a },
      "aria-hidden": !0,
      children: e ? /* @__PURE__ */ _(zw, { size: a, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : t ? /* @__PURE__ */ _(zs, { size: a, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : null
    }
  ) : /* @__PURE__ */ _(
    "span",
    {
      "data-selection-check": "box",
      className: `inline-flex shrink-0 items-center justify-center ${n ? "opacity-40" : ""} ${o}`,
      "aria-hidden": !0,
      children: /* @__PURE__ */ _(Ff, { checked: t, indeterminate: e, size: a })
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
  const l = gn(), c = Te(10, 14, l), u = Te(6, 9, l), d = Te(11, 13, l), f = s === "light" ? "light" : "dark", h = s === "emerald" ? "emerald" : s === "blue" ? !0 : void 0, p = e !== void 0 ? `${t} of ${e} selected` : `${t} selected`;
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
        o && /* @__PURE__ */ _(
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
        i && /* @__PURE__ */ _(
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
  const t = gn();
  return {
    padding: `${Te(8, 12, t)}px ${Te(12, 16, t)}px`,
    fontSize: `${Te(12, 14, t)}px`,
    lineHeight: `${Te(18, 22, t)}px`
  };
}
function db() {
  const t = gn();
  return {
    padding: `${Te(6, 9, t)}px ${Te(12, 16, t)}px ${Te(2, 3, t)}px`,
    fontSize: `${Te(10, 11, t)}px`,
    lineHeight: `${Te(14, 16, t)}px`
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
  return Mt.Children.forEach(t, (n) => {
    if (typeof n == "string" || typeof n == "number")
      e.push(String(n));
    else if (Mt.isValidElement(n)) {
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
  const e = V([]), [n, r] = Ye(-1), [i, o] = Ye(!1), [s, a] = Ye(0), l = Ne((f) => (e.current = [...e.current, f], a((h) => h + 1), () => {
    e.current = e.current.filter((h) => h !== f), a((h) => h + 1);
  }), []), c = Ne((f, h) => {
    r(f), o(h === "pointer");
  }, []), u = Ne(() => {
    o((f) => f && (r(-1), !1));
  }, []);
  return pn(() => ({
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
  const e = jf(), n = V(e);
  n.current = e;
  const r = V(null);
  Ge(() => {
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
  const i = V(-1);
  i.current = e.highlightedIndex;
  const o = V(e);
  o.current = e;
  const s = V(t);
  s.current = t;
  const a = V(r);
  a.current = r;
  const l = V({ text: "", time: 0 }), c = V(!1);
  c.current || (c.current = !0, n.current = (u) => {
    var g, m, y, b, T, A;
    if (!s.current) return;
    const d = (g = a.current) == null ? void 0 : g.onSelectAll;
    if (d && (u.metaKey || u.ctrlKey) && u.key.toLowerCase() === "a") {
      u.preventDefault(), u.stopImmediatePropagation(), d();
      return;
    }
    const f = u.target;
    if (!!f && !!f.closest("input, textarea, [contenteditable]") && (u.key.length === 1 || u.key === "Enter" || u.key === "Escape")) {
      const v = (y = (m = a.current) == null ? void 0 : m.onFieldKey) == null ? void 0 : y.call(m, u);
      (!!((b = a.current) != null && b.onFieldKey) || o.current.items.length > 0) && (u.stopImmediatePropagation(), v && u.preventDefault());
      return;
    }
    const p = o.current.items;
    if (p.length !== 0) {
      if (u.key === "ArrowDown" || u.key === "ArrowUp") {
        u.preventDefault(), u.stopImmediatePropagation();
        const v = u.key === "ArrowDown" ? 1 : -1, C = (i.current + v + p.length) % p.length;
        o.current.setHighlighted(C, "keyboard");
      } else if (u.key === "ArrowRight") {
        u.preventDefault(), u.stopImmediatePropagation();
        const v = i.current;
        v >= 0 && v < p.length && p[v].submenu && p[v].activate();
      } else if (u.key === "ArrowLeft")
        u.preventDefault(), u.stopImmediatePropagation(), (A = (T = a.current) == null ? void 0 : T.onCloseSub) == null || A.call(T);
      else if (u.key === "Enter" || u.key === " ") {
        u.preventDefault(), u.stopImmediatePropagation();
        const v = i.current;
        v >= 0 && v < p.length && p[v].activate();
      } else if (u.key.length === 1 && !u.ctrlKey && !u.metaKey && !u.altKey) {
        u.preventDefault(), u.stopImmediatePropagation();
        const v = Date.now(), C = (v - l.current.time > 500 ? "" : l.current.text) + u.key.toLowerCase();
        if (l.current = { text: C, time: v }, !C) return;
        const D = i.current + 1;
        for (let P = 0; P < p.length; P++) {
          const S = (D + P) % p.length;
          if (p[S].label.toLowerCase().startsWith(C)) {
            o.current.setHighlighted(S, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function Uf(t, e, n, r, i, o, s) {
  const a = V(e);
  a.current = e;
  const l = V(t);
  l.current = t;
  const c = V(i);
  c.current = i;
  const u = V(s == null ? void 0 : s.ignoreFields);
  u.current = s == null ? void 0 : s.ignoreFields;
  const d = V(s == null ? void 0 : s.selectAll);
  d.current = s == null ? void 0 : s.selectAll;
  const f = V(!1);
  f.current || (f.current = !0, o.current = (h) => {
    if (!l.current || c.current) return;
    const p = r.current;
    if (p && p.contains(h.target)) return;
    if (d.current && (h.metaKey || h.ctrlKey) && h.key.toLowerCase() === "a") {
      h.preventDefault(), h.stopImmediatePropagation(), n.current(h);
      return;
    }
    if (u.current) {
      const m = h.target;
      if (m && m.closest("input, textarea, [contenteditable]")) return;
    }
    a.current.items.length === 0 || !(h.key === "ArrowDown" || h.key === "ArrowUp" || h.key === "ArrowLeft" || h.key === "ArrowRight" || h.key === "Enter" || h.key === " " || h.key.length === 1 && !h.ctrlKey && !h.metaKey && !h.altKey) || (h.preventDefault(), h.stopImmediatePropagation(), n.current(h));
  });
}
function Gf(t, e) {
  const n = V(t);
  n.current = t;
  const r = V(!1);
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
  onSearchValueChange: m,
  multiple: y
}) {
  const b = vr(), T = rb(s, b), A = T.theme, [v, C] = Ye([]), [D, P] = Ye(null), S = oo(), z = Ls(), k = V(null), x = V(null), E = V(t);
  E.current = t;
  const [I, M] = Ye(t), [N, L] = Ye(""), W = f && g !== void 0, oe = W ? g : N, F = W ? m ?? (() => {
  }) : L, O = V(g ?? "");
  Ge(() => {
    t || (O.current = g ?? "");
  }, [t, g]);
  const ne = W && oe === O.current ? "" : oe, j = Ow(), U = V(null), re = gn(), q = {
    padding: `${Te(8, 12, re)}px ${Te(12, 16, re)}px`,
    fontSize: `${Te(12, 14, re)}px`
  }, [ie, Z] = Ye(0), Q = f && !W;
  Ge(() => {
    var Ie;
    if (!Q || !t) return;
    const K = (Ie = x.current) == null ? void 0 : Ie.querySelector("[data-menu-items]");
    if (!K) return;
    const G = () => Z(K.offsetWidth - K.clientWidth);
    G();
    const we = new ResizeObserver(G);
    return we.observe(K), () => we.disconnect();
  }, [t, Q, oe]);
  const Y = pn(() => {
    if (!f) return;
    const K = ne.trim().toLowerCase();
    return K ? (G) => {
      var we;
      return p ? p(K, G.label, G.group) : G.label.toLowerCase().includes(K) || (((we = G.group) == null ? void 0 : we.toLowerCase().includes(K)) ?? !1);
    } : Wx;
  }, [ne, f, p]), ce = ul(Y), fe = f && ne.trim() !== "" && ce.items.length === 0, Ee = !!y, xe = ce.allItems.map((K) => K.itemId).filter((K) => !!K), ze = ce.items.map((K) => K.itemId).filter((K) => !!K), Qe = ob({
    mode: "draft",
    selectedIds: (y == null ? void 0 : y.selectedIds) ?? ab,
    itemIds: xe,
    visibleIds: ze,
    max: y == null ? void 0 : y.max,
    disabledIds: y == null ? void 0 : y.disabledIds,
    indicator: y == null ? void 0 : y.indicator,
    onCommit: y == null ? void 0 : y.onCommit
  }), dt = V(Qe.reset);
  dt.current = Qe.reset;
  const et = typeof (y == null ? void 0 : y.commitLabel) == "function" ? y.commitLabel(Qe.count) : (y == null ? void 0 : y.commitLabel) ?? `Select ${Qe.count}`;
  Ge(() => {
    if (t)
      return M(!0), W || L(""), ce.setHighlighted(d ?? -1, "keyboard"), dt.current(), tb(() => {
        n == null || n(!1), e == null || e();
      });
    C([]);
  }, [t, d, n, e]), Ge(() => {
    if (!t || !z) return;
    const K = (G) => {
      if (G.pointerType !== "touch") return;
      const we = G.target;
      we && (x.current && x.current.contains(we) || k.current && k.current.contains(we) || we instanceof Element && we.closest("[data-radix-menu-content]") || (n == null || n(!1), e == null || e()));
    };
    return z.addEventListener("pointerdown", K, { capture: !0 }), () => z.removeEventListener("pointerdown", K, { capture: !0 });
  }, [t, z, n, e]);
  const te = Ne(() => {
    const K = k.current;
    if (!K) return null;
    const G = K.getBoundingClientRect();
    return { left: G.left, top: G.top, width: G.width, height: G.height };
  }, []), Ae = ll({
    visible: t,
    morph: l,
    anchor: te,
    onClosed: () => M(!1)
  }), _e = V(() => {
  }), We = V(() => {
  }), He = V(() => {
  }), Le = Ne((K) => {
    if (K.key === "Enter") {
      const G = ce.highlightedIndex, we = ce.items[G >= 0 ? G : 0];
      return we == null || we.activate(), !0;
    }
    return K.key === "Escape" ? (n == null || n(!1), e == null || e(), !0) : !1;
  }, [ce, n, e]);
  Kf(t && v.length === 0, ce, _e, {
    onFieldKey: Le,
    onSelectAll: Ee ? () => Qe.setAll(!0) : void 0
  }), Gf(t, We), Uf(t, ce, _e, x, v.length > 0, He, {
    ignoreFields: W,
    selectAll: Ee
  });
  const Je = V(null), yt = Ne((K) => {
    var G;
    if (K) {
      K.addEventListener("keydown", _e.current, { capture: !0 }), K.addEventListener("wheel", We.current, { passive: !1 });
      const we = K.ownerDocument;
      Je.current = we, we.addEventListener("keydown", He.current, { capture: !0 }), Rt(!0);
    } else
      (G = Je.current) == null || G.removeEventListener("keydown", He.current, { capture: !0 }), Je.current = null, Rt(!1);
    x.current = K, Ae(K);
  }, [Ae]), [ve, je] = Ye({ top: 0, left: 0, maxH: Qy, side: "bottom", ready: !1 }), [Ct, bt] = Ye(0), [Xe, Rt] = Ye(!1);
  Ge(() => {
    t && k.current && bt(k.current.getBoundingClientRect().width);
  }, [t]), eb({
    anchorRef: k,
    panelRef: x,
    open: t && Xe,
    maxHeight: u,
    onPosition: je
  }), Ge(() => {
    var K;
    if (ve.ready && t) {
      if (f) {
        (K = U.current ?? k.current) == null || K.focus();
        return;
      }
      const G = x.current;
      G && G.ownerDocument.activeElement !== G && !G.contains(G.ownerDocument.activeElement) && G.focus();
    }
  }, [ve.ready, t, f]), Ge(() => {
    if (!t || !f) return;
    if (ce.items.length === 0) {
      ce.highlightedIndex !== -1 && ce.setHighlighted(-1, "keyboard");
      return;
    }
    const K = ce.highlightedIndex;
    (K < 0 || K >= ce.items.length) && ce.setHighlighted(0, "keyboard");
  }, [t, oe, f, ce.items.length]), Nn(() => {
    var G;
    if (!t || ce.highlightedIndex < 0 || ce.pointerDriven) return;
    const K = (G = x.current) == null ? void 0 : G.querySelector(`[data-ei="${ce.highlightedIndex}"]`);
    hi(K, "nearest");
  }, [t, ce.highlightedIndex, ce.pointerDriven]);
  const pt = Ne((K) => {
    if (!(!K && !E.current)) {
      if (!K && It.current) {
        if (W) return;
        $t.current = !0;
      }
      n ? n(K) : K || e == null || e();
    }
  }, [n, e]), ft = V(I);
  ft.current = I;
  const It = V(!1), $t = V(!1), en = Ne(() => {
    if (!E.current && ft.current) {
      if ($t.current) {
        $t.current = !1, It.current = !1;
        return;
      }
      n == null || n(!0);
    }
  }, [n]), wt = Mt.isValidElement(r) ? r : null, Nt = V(!1), zt = Ne(() => {
    const K = k.current;
    K && (Nt.current = !0, K.focus(), setTimeout(() => {
      Nt.current = !1;
    }, 0));
  }, []), kn = wt ? Mt.cloneElement(wt, {
    ref: (K) => {
      k.current = K;
      const G = wt.props.ref;
      typeof G == "function" ? G(K) : G && (G.current = K);
    },
    /* Radix's trigger primitive merges `type="button"` onto the child; a
       text field trigger-as-search must stay a text field. */
    ...W ? { type: wt.props.type ?? "text" } : {},
    ...W ? {
      /* A text field that opens a list IS a combobox, and the highlighted
         row must be announced — the field is outside the popup, so the
         only link screen readers get is `aria-activedescendant`. */
      role: "combobox",
      "aria-autocomplete": "list",
      "aria-controls": t ? `${j}-content` : void 0,
      "aria-activedescendant": t && ce.highlightedIndex >= 0 ? `${j}-opt-${ce.highlightedIndex}` : void 0
    } : {},
    onPointerDownCapture: (K) => {
      var G, we;
      (we = (G = wt.props).onPointerDownCapture) == null || we.call(G, K), It.current = !0, $t.current = !1, setTimeout(() => {
        It.current = !1;
      }, 0);
    },
    onPointerDown: (K) => {
      var G, we;
      if ((we = (G = wt.props).onPointerDown) == null || we.call(G, K), W) {
        K.preventDefault();
        const Ie = E.current;
        Ie || n == null || n(!0);
        const nt = k.current;
        nt == null || nt.focus(), !Ie && nt instanceof HTMLInputElement && nt.select();
      }
    },
    /* Space is a printable search character, but Radix treats it as the
       trigger's open/close key. Keep it in the field. */
    onKeyDownCapture: (K) => {
      var G, we;
      (we = (G = wt.props).onKeyDownCapture) == null || we.call(G, K), W && K.key === " " && K.stopPropagation();
    },
    onClick: (K) => {
      var G, we;
      (we = (G = wt.props).onClick) == null || we.call(G, K), en();
    },
    /* A kit-driven focus restore is not a user focus (see above). */
    onFocus: (K) => {
      var G, we;
      if (Nt.current) {
        Nt.current = !1;
        return;
      }
      (we = (G = wt.props).onFocus) == null || we.call(G, K);
    },
    /* Focus leaving the field ends the search session: Tab (or any focus
       move that does not land in the panel) must close the list, not leave
       an orphan panel floating with the keyboard elsewhere. The panel's
       own focused row is legitimate — keep it open for the pending click. */
    onBlur: (K) => {
      var we, Ie, nt, Kt;
      if ((Ie = (we = wt.props).onBlur) == null || Ie.call(we, K), !W || !E.current) return;
      const G = K.relatedTarget;
      G && ((nt = x.current) != null && nt.contains(G) || (Kt = k.current) != null && Kt.contains(G)) || setTimeout(() => {
        var ke;
        const lt = k.current;
        if (!lt || !E.current) return;
        const ee = lt.ownerDocument.activeElement;
        ee && (lt.contains(ee) || (ke = x.current) != null && ke.contains(ee)) || (n == null || n(!1), e == null || e());
      }, 0);
    },
    /* Combobox mode (externalSearch): the trigger field IS the search box,
       so it also drives the menu's keyboard — arrows move the single
       highlight and Enter activates the highlighted (or first visible)
       row. Filtering itself follows the VALUE (see filterQuery), so no
       input method is special-cased here. */
    onKeyDown: (K) => {
      var G, we;
      if ((we = (G = wt.props).onKeyDown) == null || we.call(G, K), !(!W || !E.current)) {
        if (K.key === "ArrowDown" || K.key === "ArrowUp") {
          K.preventDefault();
          const Ie = ce.items;
          if (Ie.length === 0) return;
          const nt = K.key === "ArrowDown" ? 1 : -1, Kt = (ce.highlightedIndex + nt + Ie.length) % Ie.length;
          ce.setHighlighted(Kt, "keyboard");
        } else if (K.key === "Enter") {
          K.preventDefault();
          const Ie = ce.highlightedIndex, nt = ce.items[Ie >= 0 ? Ie : 0];
          nt == null || nt.activate();
        }
      }
    }
  }) : r, on = /* @__PURE__ */ pe("div", { "data-menu-search-empty": !0, className: "px-3 py-3 text-center", children: [
    /* @__PURE__ */ pe("div", { className: "text-xs font-medium text-[color:var(--ui-text-muted)]", children: [
      "No matches for “",
      ne.trim(),
      "”"
    ] }),
    /* @__PURE__ */ _("div", { className: "mt-0.5 text-[10px] text-[color:var(--ui-text-faint)]", children: "Try a different search." })
  ] }), de = Q || Ee, Me = `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] min-w-0 ${de ? "overflow-hidden" : "overflow-y-auto scrollbar-custom"}`;
  return /* @__PURE__ */ pe(hn.Root, { open: t || I, onOpenChange: pt, modal: !1, children: [
    /* @__PURE__ */ _(hn.Trigger, { asChild: !0, children: kn }),
    /* @__PURE__ */ _(hn.Portal, { container: S ?? void 0, children: /* @__PURE__ */ _(Hf.Provider, { value: A, children: /* @__PURE__ */ _(Bf.Provider, { value: T.attrs, children: /* @__PURE__ */ _(Wf.Provider, { value: { chain: v, setChain: C, morph: l, keyboardOpened: D, setKeyboardOpened: P }, children: /* @__PURE__ */ _(Hs.Provider, { value: ce, children: /* @__PURE__ */ _(hb.Provider, { value: { query: oe, setQuery: F }, children: /* @__PURE__ */ _(sb.Provider, { value: Ee ? Qe : null, children: /* @__PURE__ */ _(pb.Provider, { value: j, children: /* @__PURE__ */ pe(
      hn.Content,
      {
        id: `${j}-content`,
        ref: yt,
        tabIndex: W ? void 0 : -1,
        ...T.attrs,
        "data-ui-fixed": !0,
        className: `${Me} ${o || ""} ${c || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: ve.left,
          top: ve.top,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: o ? void 0 : Ct || void 0,
          maxHeight: ve.maxH,
          visibility: ve.ready ? "visible" : "hidden"
        },
        onPointerLeave: ce.pointerLeave,
        onFocusCapture: W ? (K) => {
          K.target === K.currentTarget && (K.stopPropagation(), zt());
        } : void 0,
        onFocusOutside: W ? (K) => {
          var we;
          const G = K.target;
          G && (G === k.current || (we = k.current) != null && we.contains(G)) && K.preventDefault();
        } : void 0,
        onCloseAutoFocus: W ? (K) => {
          K.preventDefault(), zt();
        } : void 0,
        children: [
          Q && /* @__PURE__ */ _("div", { className: "shrink-0 px-0 pt-1 pb-1", style: { paddingRight: ie }, children: /* @__PURE__ */ pe("div", { "data-menu-search": !0, className: "ui-item ui-item-highlighted flex items-center gap-2 rounded", style: q, children: [
            /* @__PURE__ */ _(Io, { className: "w-3.5 h-3.5 shrink-0 ui-icon" }),
            /* @__PURE__ */ _(
              "input",
              {
                ref: U,
                value: oe,
                onChange: (K) => F(K.target.value),
                placeholder: h ?? "Search…",
                className: "flex-1 min-w-0 bg-transparent outline-none text-current placeholder:text-current placeholder:opacity-50 cursor-text"
              }
            ),
            oe ? /* @__PURE__ */ _(
              "button",
              {
                type: "button",
                tabIndex: -1,
                "aria-label": "Clear search",
                className: "shrink-0 ui-icon-btn rounded flex items-center justify-center p-1 -m-1",
                onPointerDown: (K) => K.stopPropagation(),
                onClick: () => {
                  var K;
                  F(""), (K = U.current) == null || K.focus();
                },
                children: /* @__PURE__ */ _(eo, { className: "w-3.5 h-3.5" })
              }
            ) : /* @__PURE__ */ _("span", { className: "w-3.5 h-3.5 shrink-0" })
          ] }) }),
          de ? /* @__PURE__ */ pe("div", { "data-menu-items": !0, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: [
            a,
            fe && on
          ] }) : /* @__PURE__ */ pe(Dn, { children: [
            a,
            fe && on
          ] }),
          Ee && (y == null ? void 0 : y.footer) !== !1 && /* @__PURE__ */ _(
            cb,
            {
              count: Qe.count,
              max: y == null ? void 0 : y.max,
              hiddenCount: (y == null ? void 0 : y.hiddenNote) === !1 ? 0 : Qe.hiddenCount,
              clear: (y == null ? void 0 : y.clear) !== !1,
              theme: A,
              onClear: Qe.clear,
              hero: {
                label: et,
                onClick: () => {
                  Qe.commit(), pt(!1);
                },
                disabled: Qe.count === 0
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
  align: m,
  label: y,
  header: b,
  itemLabel: T,
  trigger: A,
  minItems: v = 1,
  itemRender: C,
  morph: D = !0,
  contentClassName: P
}) {
  const S = cl(), z = qf(), [k, x] = Ye(null), [E, I] = Ye(""), M = V(E);
  M.current = E;
  const N = V(null), L = V(null), [W, oe] = Ye(null), F = Ne((q) => {
    L.current = q, oe(q);
  }, []), O = ib({
    open: t,
    scroller: () => L.current,
    row: () => {
      var q;
      return ((q = L.current) == null ? void 0 : q.querySelector('[data-active="1"]')) ?? null;
    }
  });
  Ge(() => {
    if (!t) return;
    const q = (Z) => {
      var ze, Qe;
      const Q = Z.target;
      if (Q && Q.closest("input, textarea, [contenteditable]")) {
        k && Q === N.current && (Z.key === "Enter" ? (Z.preventDefault(), Z.stopImmediatePropagation(), j()) : Z.key === "Escape" && (Z.preventDefault(), Z.stopImmediatePropagation(), U()));
        return;
      }
      const Y = (ze = L.current) == null ? void 0 : ze.closest(".ui-menu");
      if (!Y || !Y.contains(Z.target)) return;
      const ce = Y.ownerDocument, fe = [...Y.querySelectorAll('[data-im-row] > [role="menuitem"]:first-child')], Ee = [...Y.querySelectorAll(':scope > div:last-child > [role="menuitem"]')], xe = [...fe, ...Ee];
      if (Z.key === "ArrowDown" || Z.key === "ArrowUp") {
        Z.preventDefault(), Z.stopImmediatePropagation();
        const dt = ce.activeElement;
        let et = dt ? xe.indexOf(dt) : -1;
        if (et < 0 && dt) {
          const We = dt.closest("[data-im-row]"), He = We == null ? void 0 : We.querySelector('[role="menuitem"]:first-child');
          He && (et = fe.indexOf(He));
        }
        const te = Z.key === "ArrowDown" ? 1 : -1, Ae = et < 0 ? te === 1 ? 0 : xe.length - 1 : (et + te + xe.length) % xe.length, _e = xe[Ae];
        _e == null || _e.focus({ preventScroll: !0 }), hi((_e == null ? void 0 : _e.closest("[data-im-row]")) ?? _e, "nearest", L.current);
        return;
      }
      if (Z.key === "ArrowLeft" || Z.key === "ArrowRight") {
        const dt = ce.activeElement, et = dt == null ? void 0 : dt.closest("[data-im-row]");
        if (!et) return;
        Z.preventDefault(), Z.stopImmediatePropagation();
        const te = [...et.querySelectorAll('[role="menuitem"]')].slice(1);
        if (te.length === 0) return;
        const Ae = dt && et.contains(dt) ? te.indexOf(dt) : -1, _e = Z.key === "ArrowRight" ? 1 : -1, We = Ae < 0 ? 0 : (Ae + _e + te.length) % te.length;
        (Qe = te[We]) == null || Qe.focus({ preventScroll: !0 });
        return;
      }
    }, ie = (W == null ? void 0 : W.ownerDocument) ?? null;
    return ie == null || ie.addEventListener("keydown", q, { capture: !0 }), () => ie == null ? void 0 : ie.removeEventListener("keydown", q, { capture: !0 });
  }, [t, k, W]), Ge(() => {
    if (!k) return;
    const q = n.find((Y) => Y.id === k);
    q && !E && I(q.name);
    const ie = requestAnimationFrame(() => {
      const Y = N.current;
      Y && (Y.focus(), Y.select());
    });
    let Z = 0;
    const Q = window.setInterval(() => {
      const Y = N.current;
      if (Z++, !Y || Z > 12) {
        clearInterval(Q);
        return;
      }
      Y.ownerDocument.activeElement !== Y && (Y.focus(), Y.select());
    }, 50);
    return () => {
      cancelAnimationFrame(ie), clearInterval(Q);
    };
  }, [k]), Ge(() => {
    if (k) {
      const q = n.find((ie) => ie.id === k);
      q && !E && I(q.name);
    }
  }, [k, n]);
  const ne = (q, ie) => {
    x(q), I(ie);
  }, j = () => {
    k && M.current.trim() && o(k, M.current.trim()), x(null);
  }, U = () => {
    x(null);
  }, re = T || b.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ pe(dl, { open: t, onOpenChange: (q) => {
    q ? (x(null), I("")) : (k && E.trim() && o(k, E.trim()), x(null), I("")), (!q || !p) && e(q);
  }, width: "w-80", theme: g, align: m, trigger: A, morph: D, contentClassName: P, children: [
    /* @__PURE__ */ _("div", { className: `shrink-0 ${S.headerText}`, children: b }),
    /* @__PURE__ */ _("div", { ref: F, "data-im-list": !0, onPointerEnter: O.engage, onPointerDown: O.engage, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: n.map((q) => {
      const ie = q.id === r, Z = k === q.id;
      return /* @__PURE__ */ _("div", { "data-im-row": q.id, "data-active": ie ? "1" : void 0, className: `scroll-my-4 flex items-center gap-1 rounded ${ie || Z ? S.rowActiveBg : S.rowHoverBg} ${k && !Z ? "opacity-40 pointer-events-none" : ""}`, children: Z ? /* @__PURE__ */ pe(Dn, { children: [
        /* @__PURE__ */ _("div", { className: "flex-1 min-w-0 flex items-center", children: /* @__PURE__ */ _(
          "input",
          {
            ref: N,
            autoFocus: !0,
            value: E,
            onChange: (Q) => I(Q.target.value),
            onKeyDown: (Q) => {
              Q.key === "Enter" && (Q.preventDefault(), Q.stopPropagation(), j()), Q.key === "Escape" && (Q.preventDefault(), Q.stopPropagation(), U());
            },
            className: "w-full outline-none bg-transparent placeholder:text-current placeholder:opacity-50",
            style: z
          }
        ) }),
        /* @__PURE__ */ _(
          hn.Item,
          {
            className: `shrink-0 ${S.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${S.editConfirm}`,
            onSelect: (Q) => {
              Q.preventDefault(), j();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ _(zs, { className: S.btnIcon })
          }
        ),
        /* @__PURE__ */ _(
          hn.Item,
          {
            className: `shrink-0 ${S.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${S.editCancel}`,
            onSelect: (Q) => {
              Q.preventDefault(), U();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ _(eo, { className: S.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ pe(Dn, { children: [
        /* @__PURE__ */ _(
          hn.Item,
          {
            style: z,
            className: `flex-1 min-w-0 rounded outline-none cursor-pointer flex items-center ${S.rowText} ${ie ? "" : S.rowTextHover}`,
            onSelect: h ? () => {
              i(q.id);
            } : (Q) => {
              Q.preventDefault(), i(q.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ _("span", { className: `truncate ${ie ? S.rowActiveText : ""}`, children: C ? C(q) : q.name })
          }
        ),
        /* @__PURE__ */ _(
          hn.Item,
          {
            className: `shrink-0 ${S.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${ie ? S.btnActive : S.btnBase}`,
            onSelect: (Q) => {
              Q.preventDefault(), ne(q.id, q.name);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ _(Lw, { className: S.btnIcon })
          }
        ),
        /* @__PURE__ */ _(
          hn.Item,
          {
            className: `shrink-0 ${S.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${ie ? S.btnActive : S.btnBase}`,
            onSelect: (Q) => {
              Q.preventDefault();
              const Y = s(q.id);
              Y && ne(Y, `${q.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ _(qy, { className: S.btnIcon })
          }
        ),
        /* @__PURE__ */ _(
          hn.Item,
          {
            className: `shrink-0 ${S.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${n.length <= v ? S.btnDisabled : ie ? S.btnDangerActive : S.btnDanger}`,
            onSelect: (Q) => {
              Q.preventDefault(), a(q.id);
            },
            onTouchStart: () => {
            },
            disabled: p || n.length <= v,
            children: /* @__PURE__ */ _(za, { className: S.btnIcon })
          }
        )
      ] }) }, q.id);
    }) }),
    /* @__PURE__ */ pe("div", { className: `shrink-0 ${k ? "opacity-40 pointer-events-none" : ""}`, children: [
      d && /* @__PURE__ */ pe(Dn, { children: [
        /* @__PURE__ */ _(hn.Separator, { className: S.separator }),
        /* @__PURE__ */ pe(
          hn.Item,
          {
            className: `w-full text-left ${S.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${S.itemDefault} ui-row`,
            onSelect: (q) => {
              q.preventDefault(), d();
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: [
              /* @__PURE__ */ _(Wy, { className: `${S.btnIcon} ${S.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (l || c || u || f) && /* @__PURE__ */ _(hn.Separator, { className: S.separator }),
      l && /* @__PURE__ */ pe(
        hn.Item,
        {
          className: `w-full text-left ${S.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${S.itemDefault} ui-row`,
          onSelect: (q) => {
            q.preventDefault();
            const ie = l();
            ie && ne(ie, "");
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ _(ol, { className: `${S.btnIcon} ${S.icon}` }),
            "New ",
            re
          ]
        }
      ),
      c && /* @__PURE__ */ pe(
        hn.Item,
        {
          className: `w-full text-left ${S.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${S.itemDefault} ui-row`,
          onSelect: (q) => {
            q.preventDefault(), c();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ pe("svg", { className: `${S.btnIcon} ${S.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ _("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ _("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ _("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      u && /* @__PURE__ */ pe(
        hn.Item,
        {
          className: `w-full text-left ${S.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${S.itemDefault} ui-row`,
          onSelect: (q) => {
            q.preventDefault(), u();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ pe("svg", { className: `${S.btnIcon} ${S.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ _("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ _("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ _("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      f && /* @__PURE__ */ pe(
        hn.Item,
        {
          className: `w-full text-left ${S.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${S.itemDefault} ui-row`,
          onSelect: (q) => {
            q.preventDefault(), f();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ _(za, { className: `${S.btnIcon} ${S.icon}` }),
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
  const f = cl(), h = qf(), p = db(), g = V(!1), m = V(null), y = Px(), b = !!y && d !== void 0, T = y && d !== void 0 ? y.isSelected(d) : a, A = n || (y && d !== void 0 ? !y.canToggle(d) : !1), { myIndex: v, highlighted: C, setPointer: D, api: P } = gb({
    label: () => fb(o),
    activate: () => {
      A || (y && d !== void 0 ? y.toggle(d) : t());
    },
    disabled: A,
    group: u,
    itemId: d
  }), { query: S } = Bx(), z = S.trim() !== "" && v < 0, k = qx(), x = u == null ? void 0 : u.trim(), E = !!x && v >= 0 && (v === 0 || ((L = P == null ? void 0 : P.items[v - 1]) == null ? void 0 : L.group) !== x), I = x && y ? ((P == null ? void 0 : P.items) ?? []).filter((W) => W.group === x && W.itemId).map((W) => W.itemId).filter((W) => !y.isDisabled(W)) : [], M = y && I.length > 0 ? y.groupState(I) : "none", N = r === "danger" ? f.itemDanger : f.itemDefault;
  return /* @__PURE__ */ pe(Dn, { children: [
    E && /* @__PURE__ */ _(
      "div",
      {
        "data-menu-group": x,
        role: "presentation",
        className: `ui-label shrink-0 select-none font-semibold uppercase tracking-wider ${y && I.length > 0 ? "" : "pointer-events-none"}`,
        style: p,
        children: y && I.length > 0 ? /* @__PURE__ */ pe("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ _(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `Select all ${x}`,
              onMouseDown: (W) => W.preventDefault(),
              onClick: () => y.toggleGroup(I),
              className: "flex shrink-0 cursor-pointer items-center justify-center rounded pointer-events-auto",
              children: /* @__PURE__ */ _(
                Fa,
                {
                  checked: M === "all",
                  indeterminate: M === "some",
                  indicator: y.indicator
                }
              )
            }
          ),
          /* @__PURE__ */ _("span", { className: "flex-1 truncate", children: x })
        ] }) : x
      }
    ),
    /* @__PURE__ */ pe(
      hn.Item,
      {
        ref: m,
        id: k && v >= 0 ? `${k}-opt-${v}` : void 0,
        "data-ei": v >= 0 ? v : void 0,
        ...b ? { role: "menuitemcheckbox", "aria-checked": T } : {},
        style: { ...h, display: z ? "none" : void 0 },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${N} ${b ? "" : a ? "ui-item-selected" : ""} ${C ? "ui-item-highlighted" : ""} ${A ? "opacity-30 pointer-events-none" : ""} ${i}`,
        onSelect: (W) => {
          if (g.current) {
            g.current = !1;
            return;
          }
          if (b) {
            W.preventDefault(), y && d !== void 0 && y.toggle(d);
            return;
          }
          s && W.preventDefault(), t();
        },
        onPointerEnter: () => {
          D(v);
        },
        onTouchStart: () => {
        },
        disabled: A,
        children: [
          b && /* @__PURE__ */ _(Fa, { checked: T, disabled: A, indicator: y.indicator }),
          e && /* @__PURE__ */ _("span", { className: `${f.icon} shrink-0`, children: e }),
          /* @__PURE__ */ _("span", { className: "flex-1 truncate", children: o }),
          c && /* @__PURE__ */ _("span", { className: "shrink-0 ml-1 flex items-center", children: c }),
          l && /* @__PURE__ */ _(
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
  const p = $x(), g = oo(), m = V(null), y = V(null), [b, T] = Ye(f), A = !f && b;
  Ge(() => {
    f && T(!0);
  }, [f]);
  const v = () => l((U) => {
    const re = U.indexOf(t);
    return re >= 0 ? U.slice(0, re) : U;
  }), C = ul(), D = jf(), P = V(D);
  P.current = D;
  const S = V(null);
  Ge(() => {
    var re;
    const U = {
      label: e,
      activate: () => {
        d(t), l((q) => q.includes(t) ? q : [...q, t]);
      },
      submenu: !0
    };
    return S.current = U, (re = P.current) == null ? void 0 : re.register(U);
  }, []);
  const z = D && S.current ? D.items.indexOf(S.current) : -1, k = z >= 0 && z === D.highlightedIndex, x = Ne(() => {
    const U = m.current;
    if (!U) return null;
    const re = U.getBoundingClientRect();
    return { left: re.left, top: re.top, width: re.width, height: re.height };
  }, []), E = ll({
    visible: f,
    morph: c,
    anchor: x,
    onClosed: () => T(!1)
  }), I = V(() => {
  }), M = V(() => {
  }), N = V(() => {
  });
  Kf(f && h, C, I, {
    onCloseSub: () => {
      v(), D && z >= 0 && D.setHighlighted(z, "keyboard");
    }
  });
  const L = V(u);
  L.current = u, Ge(() => {
    f && (L.current === t ? (C.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var U;
      return (U = y.current) == null ? void 0 : U.focus();
    }), d(null)) : C.setHighlighted(-1, "keyboard"));
  }, [f]), Gf(f, M), Uf(f, C, I, y, !h, N), Mt.useLayoutEffect(() => {
    var re;
    if (!f || C.highlightedIndex < 0 || C.pointerDriven) return;
    const U = (re = y.current) == null ? void 0 : re.querySelector(`[data-ei="${C.highlightedIndex}"]`);
    hi(U, "nearest", y.current);
  }, [f, C.highlightedIndex, C.pointerDriven]);
  const W = V(null), oe = Ne((U) => {
    var re;
    if (U) {
      U.addEventListener("keydown", I.current, { capture: !0 }), U.addEventListener("wheel", M.current, { passive: !1 });
      const q = U.ownerDocument;
      W.current = q, q.addEventListener("keydown", N.current, { capture: !0 });
    } else
      (re = W.current) == null || re.removeEventListener("keydown", N.current, { capture: !0 }), W.current = null;
    y.current = U, E(U);
  }, [E]), F = gn(), O = { padding: `${Te(8, 12, F)}px ${Te(12, 16, F)}px`, fontSize: Te(12, 14, F) }, ne = `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${k ? " ui-item-highlighted" : ""}${A ? " ui-sub-closing" : ""}`, j = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${s || ""}`;
  return /* @__PURE__ */ pe(hn.Sub, { open: f || b, onOpenChange: (U) => l((re) => {
    if (!U) {
      const q = re.indexOf(t);
      return q >= 0 ? re.slice(0, q) : re;
    }
    return re.includes(t) ? re : [...re, t];
  }), children: [
    /* @__PURE__ */ pe(
      hn.SubTrigger,
      {
        ref: m,
        "data-ei": z >= 0 ? z : void 0,
        style: O,
        className: ne,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          D && z >= 0 && D.setHighlighted(z, "pointer");
        },
        onPointerDown: (U) => {
          U.pointerType === "pen" && (U.preventDefault(), l((re) => f ? re.slice(0, re.indexOf(t)) : [...re, t]));
        },
        children: [
          i === "left" && /* @__PURE__ */ _(La, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ pe("span", { className: "flex items-center gap-2", children: [
            n && /* @__PURE__ */ _("span", { className: "ui-icon shrink-0", children: n }),
            e
          ] }),
          i === "right" && /* @__PURE__ */ _(La, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ _(hn.Portal, { container: g ?? void 0, children: /* @__PURE__ */ _(
      hn.SubContent,
      {
        ref: oe,
        ...p,
        className: j,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: C.pointerLeave,
        children: /* @__PURE__ */ _(Hs.Provider, { value: C, children: o })
      }
    ) })
  ] });
}
const Qo = 8, Ux = ({ open: t, x: e, y: n, onClose: r, children: i, containerRef: o, theme: s, morph: a = !0 }) => {
  const l = vr(), c = s ? { theme: s, attrs: { "data-theme": s } } : l ? rb(void 0, l) : { theme: "light", attrs: { "data-theme": "light" } }, { theme: u } = c, d = gn(), f = Te(12, 14, d), h = V(null), p = $s(), [g, m] = Ye(!1), [y, b] = Ye([]), [T, A] = Ye(null), v = ul();
  Ge(() => {
    if (t)
      return v.setHighlighted(-1, "keyboard"), tb(r);
  }, [t, r]);
  const C = V({ left: e, top: n });
  t && (C.current = { left: e, top: n });
  const D = Ne(() => ({ left: C.current.left, top: C.current.top, width: 0, height: 0 }), []), P = ll({
    visible: !0,
    morph: a,
    anchor: D,
    cloneOnUnmount: !0
  }), S = V(() => {
  }), z = V(() => {
  }), k = V(() => {
  });
  Kf(t, v, S), Nn(() => {
    if (!t || v.highlightedIndex < 0 || v.pointerDriven) return;
    const N = h.current;
    hi(
      N == null ? void 0 : N.querySelector(`[data-ei="${v.highlightedIndex}"]`),
      "nearest",
      N
    );
  }, [t, v.highlightedIndex, v.pointerDriven]), Gf(t, z), Uf(t, v, S, h, y.length > 0, k);
  const x = V(null), E = Ne((N) => {
    var L;
    if (N) {
      N.addEventListener("keydown", S.current, { capture: !0 }), N.addEventListener("wheel", z.current, { passive: !1 });
      const W = N.ownerDocument;
      x.current = W, W.addEventListener("keydown", k.current, { capture: !0 });
    } else
      (L = x.current) == null || L.removeEventListener("keydown", k.current, { capture: !0 }), x.current = null;
    h.current = N, m(!!N), P(N);
  }, [P]), [I, M] = Ye(null);
  return Nn(() => {
    var q;
    if (!t || !g || !h.current) return;
    const N = h.current, L = N.offsetWidth, W = N.offsetHeight, oe = (q = o == null ? void 0 : o.current) == null ? void 0 : q.getBoundingClientRect(), F = oe ? oe.right : (p == null ? void 0 : p.innerWidth) ?? 0, O = oe ? oe.bottom : (p == null ? void 0 : p.innerHeight) ?? 0, ne = oe ? oe.left : 0, j = oe ? oe.top : 0;
    let U = Math.max(j + Qo, C.current.top), re = Math.max(ne + Qo, C.current.left);
    re + L > F && (re = F - L - Qo), U + W > O && (U = Math.max(j + Qo, O - W - Qo)), M({ left: re, top: U });
  }, [t, g, e, n, o]), t ? /* @__PURE__ */ pe(hn.Root, { open: t, onOpenChange: (N) => {
    N || r();
  }, modal: !1, children: [
    /* @__PURE__ */ _(hn.Trigger, { asChild: !0, children: /* @__PURE__ */ _("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ _(hn.Portal, { children: /* @__PURE__ */ _(Hf.Provider, { value: u, children: /* @__PURE__ */ _(Bf.Provider, { value: c.attrs, children: /* @__PURE__ */ _(Wf.Provider, { value: { chain: y, setChain: b, morph: a, keyboardOpened: T, setKeyboardOpened: A }, children: /* @__PURE__ */ _(Hs.Provider, { value: v, children: /* @__PURE__ */ _(
      hn.Content,
      {
        ref: E,
        ...c.attrs,
        "data-ui-fixed": !0,
        className: "fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom",
        style: { fontSize: f, left: (I == null ? void 0 : I.left) ?? C.current.left, top: (I == null ? void 0 : I.top) ?? C.current.top, touchAction: "manipulation" },
        onPointerLeave: v.pointerLeave,
        children: i
      }
    ) }) }) }) }) })
  ] }) : null;
}, aa = ({ onClick: t, variant: e = "default", icon: n, disabled: r = !1, selected: i = !1, trailing: o, children: s }) => {
  const a = gn(), l = { padding: `${Te(8, 12, a)}px ${Te(12, 16, a)}px`, fontSize: Te(12, 14, a) }, c = jf(), u = V(c);
  u.current = c;
  const d = V(null);
  Ge(() => {
    var g;
    const p = { label: fb(s), activate: () => {
      r || t();
    } };
    return d.current = p, (g = u.current) == null ? void 0 : g.register(p);
  }, []);
  const f = c && d.current ? c.items.indexOf(d.current) : -1, h = !r && f >= 0 && f === c.highlightedIndex;
  return /* @__PURE__ */ pe(
    hn.Item,
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
        /* @__PURE__ */ _("span", { className: "flex-1 truncate", children: s }),
        o && /* @__PURE__ */ _("span", { className: "shrink-0 ml-1 flex items-center", children: o })
      ]
    }
  );
}, Gx = () => /* @__PURE__ */ _(hn.Separator, { className: "ui-sep my-1" }), XP = (t) => /* @__PURE__ */ _(Kx, { ...t, width: t.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), an = 8, mb = "[data-modal-stack]", ui = 220, Es = "cubic-bezier(0.32, 0.72, 0, 1)", _a = 0.94;
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
  const g = vr(), m = Lf(
    { mode: f, accent: p, surface: h, context: "surface" },
    g
  ), y = m.mode, b = m.surface, T = m.accent, A = V(null), v = V(null), C = V(null), D = gn(), P = Te(20, 24, D), S = Te(10, 12, D), z = Te(12, 14, D), k = Te(14, 16, D), x = Te(20, 24, D), E = Te(20, 24, D), I = Te(20, 24, D), M = Te(14, 16, D), N = Te(16, 20, D), L = Te(10, 12, D), W = Te(12, 14, D), oe = Te(8, 10, D), F = Te(4, 6, D), O = { padding: `${S}px ${P}px` }, ne = { fontSize: z }, j = { padding: `${E}px ${x}px 16px ${x}px` }, U = { fontSize: k }, re = { padding: `0 ${x}px 16px` }, q = { padding: `${I}px ${x}px` }, ie = { fontSize: L, padding: `${F}px ${oe}px` }, [Z, Q] = Ye(!1), Y = Ne((ee) => {
    A.current = ee, Q(ee !== null);
  }, []), ce = oo(), fe = $s(), Ee = V(fe);
  Ee.current = fe;
  const [xe, ze] = Ye(null), Qe = V(null), dt = V(!1), et = V(!1), te = V(0), Ae = V({ w: 0, h: 0 }), _e = V(!1), [We, He] = Ye(!1), [Le, Je] = Ye(!1), yt = V(0), ve = V(!1), [je, Ct] = Ye(!1), bt = V(l);
  bt.current = l;
  const Xe = V(!1), Rt = V(!1), pt = () => {
    Rt.current = !0, He(!0);
  }, ft = () => {
    Rt.current = !1, He(!1);
  };
  Ge(() => {
    t || (ze(null), _e.current = !1, dt.current = !1, Je(!1));
  }, [t]), Nn(() => {
    if (!t || _e.current || !Z || !A.current) return;
    _e.current = !0;
    const ee = A.current.getBoundingClientRect(), ke = Ee.current ?? null, Se = (ke == null ? void 0 : ke.innerWidth) ?? 0, Ke = Ci(ke);
    ze({
      left: Math.max(an, Math.min((Se - ee.width) / 2, Se - ee.width - an)),
      top: Math.max(Ke.top + an, Math.min(Ke.top + (Ke.height - ee.height) / 2, Ke.bottom - ee.height - an))
    });
  }, [t, Z]), Nn(() => {
    if (!t || !Z || !l || So() || !A.current) return;
    const ee = A.current, ke = Kl(ee), Se = ke[ke.length - 1];
    pt(), Se ? cp(yt, ee, Se.getBoundingClientRect(), ft) : Yx(yt, ee, ft);
  }, [t, Z]);
  const It = Ne(() => {
    if (!u || ve.current) return;
    const ee = A.current, ke = !!ee && Kl(ee).length > 0;
    if (!ee || !l || So() || ke) {
      e();
      return;
    }
    ve.current = !0, Ct(!0), Xe.current = !0, pt(), up(yt, ee, () => {
      ve.current = !1, Ct(!1), ft(), e();
    });
  }, [l, e, u]), $t = Ne(() => {
    const ee = A.current;
    if (!ee || Xe.current || !bt.current || So() || Kl(ee).length > 0) return;
    const ke = ee.ownerDocument, Se = ee.cloneNode(!0);
    Se.removeAttribute("data-modal-stack"), Se.removeAttribute("data-state"), Se.removeAttribute("role"), Se.removeAttribute("data-aria-hidden"), Se.removeAttribute("tabindex"), Se.setAttribute("aria-hidden", "true"), Se.style.pointerEvents = "none", ke.body.appendChild(Se), up({ current: 0 }, Se, () => {
      Se.isConnected && Se.remove();
    });
  }, []);
  Nn(() => () => $t(), [$t]);
  const en = V(t);
  Nn(() => {
    const ee = en.current;
    en.current = t, ee && !t && $t();
  }, [t, Z, $t]), Ge(() => {
    if (!t || !Z || !l || !A.current) return;
    const ee = A.current, ke = ee.parentNode;
    if (!ke) return;
    let Se = 0, Ke = null, gt = !1;
    const Ot = () => {
      Se = 0;
      const ht = la(ee);
      if (ht.length > 0)
        ee.style.opacity = "", ee.style.pointerEvents = "", Ke = ht[ht.length - 1].getBoundingClientRect(), gt = !0, Se = requestAnimationFrame(Ot);
      else if (gt) {
        gt = !1, Ke && !So() && (pt(), cp(yt, ee, Ke, ft)), Ke = null;
        const vt = Ee.current ?? null;
        vt == null || vt.setTimeout(() => {
          !ee || !ee.isConnected || getComputedStyle(ee).opacity !== "1" && (ee.style.opacity = "1", ee.style.pointerEvents = "");
        }, 240);
      }
    }, ct = new MutationObserver(() => {
      !Se && la(ee).length > 0 && (Se = requestAnimationFrame(Ot));
    });
    return ct.observe(ke, { childList: !0 }), () => {
      ct.disconnect(), Se && cancelAnimationFrame(Se);
    };
  }, [t, Z]), Ge(() => {
    if (!Z || !l || So() || !A.current) return;
    const ee = A.current;
    let ke = Math.round(ee.getBoundingClientRect().height), Se = !1;
    const Ke = new ResizeObserver(() => {
      if (!ee.isConnected) return;
      const gt = Math.round(ee.getBoundingClientRect().height);
      if (!Se) {
        Se = !0, ke = gt;
        return;
      }
      if (Math.abs(gt - ke) < 1) return;
      if (Qe.current || ve.current || la(ee).length > 0) {
        ke = gt;
        return;
      }
      if (Rt.current) return;
      const Ot = ke;
      ke = gt, pt();
      const ct = ee.getBoundingClientRect(), ht = Ci(Ee.current ?? null), vt = !dt.current && !et.current, ut = vt ? ht.top + (ht.height - Ot) / 2 : ct.top, Yt = vt ? ht.top + (ht.height - gt) / 2 : ct.top;
      ee.style.transition = "none", ee.style.height = `${Ot}px`, vt && (ee.style.top = `${ut}px`), v.current && (v.current.style.overflow = "hidden"), ee.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ee.style.height === `${Ot}px` && (ee.style.transition = `height ${ui}ms ${Es}${vt ? `, top ${ui}ms ${Es}` : ""}`, ee.style.height = `${gt}px`, vt && (ee.style.top = `${Yt}px`), window.setTimeout(() => {
            ee.style.height === `${gt}px` && (ee.style.transition = "", ee.style.height = "", v.current && (v.current.style.overflow = ""), vt && ze({ left: ct.left, top: Yt }), ft());
          }, ui + 60));
        });
      });
    });
    return Ke.observe(ee), () => Ke.disconnect();
  }, [Z]), Ge(() => {
    if (!Z || !A.current || l && !So()) return;
    const ee = A.current, ke = new ResizeObserver(() => {
      if (!ee.isConnected || Qe.current || ve.current || et.current || la(ee).length > 0) return;
      const Se = Ee.current ?? null, Ke = Ci(Se), gt = (Se == null ? void 0 : Se.innerWidth) ?? 0, Ot = ee.getBoundingClientRect(), ct = Math.max(Ke.top + an, Math.min(Ot.top, Ke.bottom - Ot.height - an)), ht = Math.max(an, Math.min(Ot.left, gt - Ot.width - an));
      (Math.abs(ct - Ot.top) > 0.5 || Math.abs(ht - Ot.left) > 0.5) && ze({ left: ht, top: ct });
    });
    return ke.observe(ee), () => ke.disconnect();
  }, [Z, l]);
  const wt = Ne(() => {
    const ee = A.current;
    if (!ee) return null;
    const ke = ee.getBoundingClientRect();
    return { left: ke.left, top: ke.top, width: ke.width, height: ke.height };
  }, []), Nt = Ne((ee, ke) => {
    const Se = Ee.current ?? null, Ke = (Se == null ? void 0 : Se.innerWidth) ?? 0, gt = Ci(Se), Ot = wt(), ct = Ot ? Ot.width : Math.min(Ke - an * 2, 576), ht = Ot ? Ot.height : Math.min(gt.height - an * 2, 400);
    return {
      left: Math.max(an, Math.min(ee, Ke - ct - an)),
      top: Math.max(gt.top + an, Math.min(ke, gt.bottom - ht - an))
    };
  }, [wt]);
  Ge(() => {
    if (!t) return;
    const ee = Ee.current ?? null, ke = (ee == null ? void 0 : ee.visualViewport) ?? null;
    if (!ee || !ke) return;
    const Se = 120;
    et.current = !1, Ae.current = { w: ee.innerWidth, h: ee.innerHeight };
    let Ke = 0;
    const gt = () => {
      if (ve.current || Qe.current) return;
      const ct = (ee == null ? void 0 : ee.innerHeight) ?? 0, ht = (ee == null ? void 0 : ee.innerWidth) ?? 0, ut = Ci(ee).height < ct - Se, Yt = ct < Ae.current.h - Se && ht === Ae.current.w;
      ut || Yt ? (et.current = !0, te.current && (clearTimeout(te.current), te.current = 0)) : te.current || (te.current = (ee == null ? void 0 : ee.setTimeout(() => {
        et.current = !1, te.current = 0, Je(!1);
      }, 600)) ?? 0), Je(et.current), !Ke && (Ke = requestAnimationFrame(() => {
        var yn;
        Ke = 0;
        const xr = A.current;
        if (!xr) return;
        const Ht = Ci(Ee.current ?? null), mn = xr.getBoundingClientRect(), On = ((yn = Ee.current) == null ? void 0 : yn.innerWidth) ?? 0, Gn = (ee == null ? void 0 : ee.innerHeight) ?? 0, Xt = Ht.height < Gn - Se || Gn < Ae.current.h - Se && (ee == null ? void 0 : ee.innerWidth) === Ae.current.w;
        Ae.current = { w: (ee == null ? void 0 : ee.innerWidth) ?? 0, h: Gn };
        const zn = mn.top >= Ht.top + an && mn.bottom <= Ht.bottom - an, dr = () => {
          ze({
            left: Math.max(an, Math.min((On - mn.width) / 2, On - mn.width - an)),
            top: Math.max(Ht.top + an, Math.min(Ht.top + (Ht.height - mn.height) / 2, Ht.bottom - mn.height - an))
          });
        };
        if (Xt && !Pn) {
          if (dt.current) {
            zn || ze(Nt(mn.left, mn.top));
            return;
          }
          if (zn) return;
          dr();
          return;
        }
        if (!et.current) {
          if (dt.current) {
            zn || ze(Nt(mn.left, mn.top));
            return;
          }
          zn || dr();
        }
      }));
    };
    ke.addEventListener("resize", gt), ke.addEventListener("scroll", gt);
    const Ot = () => {
      ve.current || Qe.current || Ke || (Ke = requestAnimationFrame(() => {
        Ke = 0;
        const ct = A.current;
        if (!ct) return;
        const ht = Ee.current ?? null, vt = Ci(ht), ut = (ht == null ? void 0 : ht.innerWidth) ?? 0, Yt = ct.getBoundingClientRect();
        if (dt.current) {
          ze(Nt(Yt.left, Yt.top));
          return;
        }
        ze({
          left: Math.max(an, Math.min((ut - Yt.width) / 2, ut - Yt.width - an)),
          top: Math.max(vt.top + an, Math.min(vt.top + (vt.height - Yt.height) / 2, vt.bottom - Yt.height - an))
        });
      }));
    };
    return ee.addEventListener("orientationchange", Ot), () => {
      ke.removeEventListener("resize", gt), ke.removeEventListener("scroll", gt), ee.removeEventListener("orientationchange", Ot), Ke && cancelAnimationFrame(Ke), te.current && clearTimeout(te.current);
    };
  }, [t, Nt]);
  const zt = Ne((ee) => {
    if (ee.target.closest("button")) return;
    dt.current = !0;
    const ke = wt();
    ke && (ze(Nt(ke.left, ke.top)), Qe.current = { startX: ee.clientX, startY: ee.clientY, posX: ke.left, posY: ke.top }, ee.target.setPointerCapture(ee.pointerId));
  }, [wt, Nt]), kn = Ne((ee) => {
    const ke = Qe.current;
    ke && (ee.preventDefault(), ze(Nt(ke.posX + ee.clientX - ke.startX, ke.posY + ee.clientY - ke.startY)));
  }, [Nt]), on = Ne(() => {
    Qe.current = null;
  }, []), de = Qe.current !== null, Me = Ne(() => {
    dt.current = !1;
    const ee = Ee.current ?? null, ke = Ci(ee), Se = (ee == null ? void 0 : ee.innerWidth) ?? 0, Ke = A.current, gt = Ke ? Ke.getBoundingClientRect() : { width: 0, height: 0 };
    ze({
      left: Math.max(an, Math.min((Se - gt.width) / 2, Se - gt.width - an)),
      top: Math.max(ke.top + an, Math.min(ke.top + (ke.height - gt.height) / 2, ke.bottom - gt.height - an))
    });
  }, []), K = V(0), G = Ne(() => {
    const ee = Date.now();
    ee - K.current < 300 ? (K.current = 0, Me()) : K.current = ee;
  }, [Me]), we = xe !== null, Ie = we ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", nt = `${i ? `${i} w-full` : "max-w-xl w-full"}`, Kt = {
    ...we ? { left: xe.left, top: xe.top } : {},
    width: `min(100%, calc(100dvw - ${an * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...Le ? {} : { maxHeight: `calc(100dvh - ${an * 2}px)` }
  }, lt = Ne((ee) => {
    if (ee.key !== "Enter" || ee.shiftKey || ee.metaKey || ee.ctrlKey || ee.altKey) return;
    const ke = ee.target, Se = C.current;
    if (!(!!ke.closest("[data-modal-close]") || !!Se && Se.contains(ke) && !!ke.closest('button, a, [role="button"]')) && ke.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !Se) return;
    const gt = Array.from(Se.querySelectorAll("button[data-modal-confirm]")), Ot = gt.length > 0 ? gt : Array.from(Se.querySelectorAll("button")), ct = Ot[Ot.length - 1];
    !ct || ct.disabled || (ee.preventDefault(), ct.click());
  }, []);
  return /* @__PURE__ */ _($f, { theme: m, children: /* @__PURE__ */ _(Si.Root, { open: t, onOpenChange: (ee) => {
    ee || It();
  }, children: /* @__PURE__ */ pe(Si.Portal, { container: ce ?? void 0, children: [
    /* @__PURE__ */ _(
      Si.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${je ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (ee) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (ee.preventDefault(), d && It());
        }
      }
    ),
    /* @__PURE__ */ pe(
      Si.Content,
      {
        ref: Y,
        onKeyDown: lt,
        onInteractOutside: (ee) => {
          d || ee.preventDefault();
        },
        "data-modal-stack": !0,
        "data-mode": y,
        "data-accent": T,
        "data-surface": b,
        className: `ui-modal fixed z-[10000] bg-[var(--ui-modal-bg)] border border-[color:var(--ui-modal-border)] rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${Ie} ${nt}`,
        style: { touchAction: "manipulation", colorScheme: y, ...Object.keys(Kt).length > 0 ? Kt : {} },
        children: [
          c ? /* @__PURE__ */ pe(
            "div",
            {
              style: j,
              className: `flex items-center justify-between ${de ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (ee) => {
                We || zt(ee);
              },
              onPointerMove: kn,
              onPointerUp: on,
              onClick: G,
              children: [
                /* @__PURE__ */ _(Si.Title, { style: U, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: n }),
                u && /* @__PURE__ */ _(Si.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ _(eo, { style: { width: N, height: N } }) })
              ]
            }
          ) : /* @__PURE__ */ pe(
            "div",
            {
              style: O,
              className: `ui-modal-header flex items-center justify-between border-b border-[color:var(--ui-modal-header-border)] shrink-0 bg-[var(--ui-modal-header-bg)] ${de ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (ee) => {
                We || zt(ee);
              },
              onPointerMove: kn,
              onPointerUp: on,
              onClick: G,
              children: [
                /* @__PURE__ */ pe("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ _("span", { className: "text-[color:var(--ui-modal-icon)] shrink-0", children: r }),
                  /* @__PURE__ */ _(Si.Title, { style: ne, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: n })
                ] }),
                /* @__PURE__ */ pe("div", { className: "flex items-center gap-2", children: [
                  a && /* @__PURE__ */ pe("button", { onClick: a, style: ie, className: "cursor-pointer flex items-center gap-1 text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-muted-hover)] transition-colors bg-[var(--ui-modal-control-bg)] hover:bg-[var(--ui-modal-control-hover-bg)] rounded shrink-0", children: [
                    /* @__PURE__ */ _(Wy, { style: { width: W, height: W } }),
                    "Reset"
                  ] }),
                  u && /* @__PURE__ */ _(Si.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ _(eo, { style: { width: M, height: M } }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ _("div", { ref: v, "data-testid": "modal-body", style: c ? re : void 0, className: "overflow-y-auto flex-1 bg-[var(--ui-modal-body-bg)] text-[color:var(--ui-modal-body-text)]", children: s }),
          o && /* @__PURE__ */ _("div", { ref: C, style: c ? q : void 0, className: c ? "" : "shrink-0", children: c ? /* @__PURE__ */ _("div", { className: "flex items-center justify-end gap-2", children: o }) : o })
        ]
      }
    )
  ] }) }) });
}
function VP({ children: t }) {
  const e = gn(), n = Te(20, 24, e), r = Te(8, 12, e);
  return /* @__PURE__ */ _("div", { className: "flex items-center justify-end gap-3 border-t border-[color:var(--ui-modal-border)] bg-[var(--ui-modal-footer-bg)]", style: { padding: `${r}px ${n}px` }, children: t });
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
  return /* @__PURE__ */ _(
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
  const [i, o] = Ye(null), [s, a] = Ye(!1), l = V(null), c = gn(), u = Te(16, 20, c), d = Te(12, 14, c), f = bb(), h = V(i);
  h.current = i;
  const p = Ne(() => {
    const v = h.current;
    v && (v.kind === "confirm" ? v.resolve(!1) : v.kind === "prompt" ? v.resolve(null) : v.resolve());
  }, []), g = Ne((v) => {
    if (v.suppressKey) {
      const C = localStorage.getItem(v.suppressKey);
      if (C && Date.now() < parseInt(C, 10))
        return Promise.resolve(!0);
    }
    return new Promise((C) => {
      p(), a(!1), o({ kind: "confirm", options: v, resolve: C });
    });
  }, [p]), m = Ne((v) => new Promise((C) => {
    p(), o({ kind: "prompt", options: v, resolve: C });
  }), [p]), y = Ne((v) => new Promise((C) => {
    p(), o({ kind: "alert", options: v, resolve: C });
  }), [p]);
  Ge(() => {
    if (i) {
      const v = setTimeout(() => {
        var C;
        return (C = l.current) == null ? void 0 : C.focus();
      }, 50);
      return () => clearTimeout(v);
    }
  }, [i]);
  const b = Ne(() => {
    var v, C;
    if (i) {
      if (i.kind === "confirm") {
        const D = i.options;
        D.suppressKey && s && localStorage.setItem(D.suppressKey, String(Date.now() + 864e5)), i.resolve(!0);
      } else i.kind === "prompt" ? i.resolve(((C = (v = l.current) == null ? void 0 : v.value) == null ? void 0 : C.trim()) || null) : i.resolve();
      o(null);
    }
  }, [i, s]), T = i !== null;
  Ge(() => {
    if (!T) return;
    const v = (C) => {
      C.key !== "Enter" || C.shiftKey || C.metaKey || C.ctrlKey || C.altKey || C.isComposing || (C.preventDefault(), C.stopImmediatePropagation(), b());
    };
    return document.addEventListener("keydown", v, !0), () => document.removeEventListener("keydown", v, !0);
  }, [T, b]);
  const A = Ne(() => {
    i && (i.kind === "confirm" ? i.resolve(!1) : i.kind === "prompt" ? i.resolve(null) : i.resolve(), o(null));
  }, [i]);
  return /* @__PURE__ */ pe(vb.Provider, { value: { confirm: g, prompt: m, alert: y }, children: [
    t,
    T && /* @__PURE__ */ _(
      Xx,
      {
        open: !0,
        onClose: A,
        closable: (i == null ? void 0 : i.kind) !== "alert",
        dismissOnBackdrop: (i == null ? void 0 : i.kind) !== "alert",
        title: (i == null ? void 0 : i.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: i && /* @__PURE__ */ pe(Dn, { children: [
          i.kind !== "alert" && /* @__PURE__ */ _(ca, { variant: "ghost", onClick: A, children: "Cancel" }),
          i.kind === "alert" ? /* @__PURE__ */ _(ca, { onClick: b, children: "OK" }) : i.kind === "confirm" ? /* @__PURE__ */ _(
            ca,
            {
              "data-modal-confirm": !0,
              variant: i.options.danger ? "danger-solid" : "hero",
              onClick: b,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ _(ca, { "data-modal-confirm": !0, onClick: b, children: "Save" })
        ] }),
        children: /* @__PURE__ */ pe("div", { className: "flex flex-col", style: { gap: u }, children: [
          (i == null ? void 0 : i.options.message) && /* @__PURE__ */ _("p", { style: { fontSize: d }, className: "text-[color:var(--ui-text-muted)] leading-relaxed", children: i.options.message }),
          (i == null ? void 0 : i.kind) === "confirm" && i.options.suppressKey && /* @__PURE__ */ _(
            Dx,
            {
              block: !0,
              checked: s,
              onChange: a,
              tone: "danger",
              label: "Don't ask again (24 hours)"
            }
          ),
          (i == null ? void 0 : i.kind) === "prompt" && /* @__PURE__ */ _(
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
  const r = V(null), i = oo();
  return Ge(() => {
    r.current && nk(r.current, n);
  }, [n]), sl(
    /* @__PURE__ */ _(
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
          /* @__PURE__ */ _(
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
          /* @__PURE__ */ _(
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
  const [s, a] = Ye(null), l = Ls(), c = V(null), u = V(null), d = V({ x: 0, y: 0, target: null }), f = V(!1), h = Math.min(ek, n * 0.5), p = V(i);
  p.current = i;
  const g = V(o);
  return g.current = o, Ge(() => {
    if (!Pn || !l) return;
    const m = (A) => {
      if (!df(A.pointerType) || A.button !== 0) return;
      const v = A.target;
      if (!v.closest(r) || (p.current ? !p.current(v) : ik(v))) return;
      const C = A.clientX, D = A.clientY;
      d.current = { x: C, y: D, target: A.target }, f.current = !0, e && (u.current = setTimeout(() => a({ x: C, y: D }), h)), c.current = setTimeout(() => {
        if (!f.current) return;
        u.current && (clearTimeout(u.current), u.current = null), a(null);
        const P = d.current.target;
        if (!P) return;
        const S = g.current;
        if (S) {
          S(P, C, D);
          return;
        }
        const z = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: C,
          clientY: D,
          button: 2,
          view: window
        });
        P.dispatchEvent(z);
      }, n);
    }, y = (A) => {
      if (!f.current || c.current === null) return;
      const v = A.clientX - d.current.x, C = A.clientY - d.current.y;
      Math.sqrt(v * v + C * C) > tk && (clearTimeout(c.current), c.current = null, u.current && (clearTimeout(u.current), u.current = null), f.current = !1, a(null));
    }, b = () => {
      c.current !== null && (clearTimeout(c.current), c.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, a(null);
    }, T = (A) => {
      df(A.pointerType) && (c.current !== null && (clearTimeout(c.current), c.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, a(null));
    };
    return l == null || l.addEventListener("pointerdown", m), l.addEventListener("pointermove", y), l.addEventListener("pointerup", b), l.addEventListener("pointercancel", b), l.addEventListener("pointerleave", T), () => {
      l.removeEventListener("pointerdown", m), l.removeEventListener("pointermove", y), l.removeEventListener("pointerup", b), l == null || l.removeEventListener("pointercancel", b), l == null || l.removeEventListener("pointerleave", T), c.current !== null && clearTimeout(c.current), u.current !== null && clearTimeout(u.current);
    };
  }, [e, n, h, r]), /* @__PURE__ */ pe(Dn, { children: [
    t,
    e && s && /* @__PURE__ */ _(rk, { x: s.x, y: s.y, ms: n - h })
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
  return /* @__PURE__ */ _(
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
    const Y = /* @__PURE__ */ new Date(o + "T00:00:00");
    return isNaN(Y.getTime()) ? l : Y;
  })(), [u, d] = Ye(c.getFullYear()), [f, h] = Ye(c.getMonth()), [p, g] = Ye("days"), [m, y] = Ye(null), b = pn(() => new Set(t), [t]), T = (Y) => {
    b.has(Y) ? e(t.filter((ce) => ce !== Y)) : e([...t, Y]);
  }, A = pn(() => {
    const Y = uk(u, f), ce = new Date(u, f, 1).getDay(), fe = [];
    for (let Ee = 0; Ee < ce; Ee++) fe.push({ key: `pad-${Ee}`, day: 0, empty: !0 });
    for (let Ee = 1; Ee <= Y; Ee++) fe.push({ key: dk(u, f, Ee), day: Ee, empty: !1 });
    return fe;
  }, [u, f]), v = (Y) => d((ce) => Math.max(Ul, Math.min(Gl, ce + Y))), C = (Y) => {
    f + Y < 0 ? (d((ce) => Math.max(Ul, ce - 1)), h(11)) : f + Y > 11 ? (d((ce) => Math.min(Gl, ce + 1)), h(0)) : h((ce) => ce + Y);
  }, D = () => {
    if (m === null) return;
    const Y = parseInt(m, 10);
    !isNaN(Y) && Y >= Ul && Y <= Gl && d(Y), y(null);
  }, P = (Y) => t.some((ce) => ce.startsWith(`${u}-${String(Y + 1).padStart(2, "0")}`)), S = gn(), z = Te(4, 8, S), k = Te(16, 20, S), x = Te(10, 11, S), E = Te(6, 8, S), I = Te(12, 14, S), M = Te(6, 10, S), N = Te(12, 14, S), L = Te(8, 12, S), W = Te(10, 12, S), oe = Te(6, 10, S), F = Te(2, 6, S), O = Te(64, 80, S), ne = { padding: z }, j = { width: k, height: k }, U = { fontSize: x, paddingTop: E, paddingBottom: E }, re = { fontSize: I, paddingTop: M, paddingBottom: M }, q = { fontSize: N, paddingTop: L, paddingBottom: L }, ie = { fontSize: W, padding: `${F}px ${oe}px` }, Z = "bg-[var(--ui-date-selected-bg)] text-[color:var(--ui-date-selected-text)] hover:bg-[var(--ui-date-selected-hover-bg)]", Q = "text-[color:var(--ui-text)] hover:bg-[var(--ui-card-hover)]";
  return /* @__PURE__ */ pe("div", { "data-mode": a, "data-accent": s == null ? void 0 : s.accent, "data-surface": s == null ? void 0 : s.surface, className: `border rounded-lg overflow-hidden w-full border-[color:var(--ui-border-strong)] bg-[var(--ui-date-body-bg)] text-[color:var(--ui-text)] ${i}`, children: [
    /* @__PURE__ */ pe("div", { className: "flex items-center justify-between px-3 py-2 border-b bg-[var(--ui-date-header-bg)] text-[color:var(--ui-date-header-text)] border-[color:var(--ui-border)]", children: [
      /* @__PURE__ */ _(
        "button",
        {
          type: "button",
          onClick: () => p === "months" ? v(-1) : C(-1),
          style: ne,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": p === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ _($w, { style: j })
        }
      ),
      p === "days" ? /* @__PURE__ */ _(
        "button",
        {
          type: "button",
          onClick: () => g("months"),
          "aria-label": "Select year and month",
          className: "text-sm font-semibold rounded px-2 py-0.5 transition-colors text-[color:var(--ui-date-header-text)] hover:bg-[var(--ui-date-header-hover)]",
          children: new Date(u, f).toLocaleString("default", { month: "long", year: "numeric" })
        }
      ) : /* @__PURE__ */ _(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          "aria-label": "Year",
          value: m ?? String(u),
          onChange: (Y) => y(Y.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: (Y) => Y.target.select(),
          onBlur: D,
          onKeyDown: (Y) => {
            Y.key === "Enter" && (Y.preventDefault(), D()), Y.key === "Escape" && y(null);
          },
          style: { width: O },
          className: "text-sm text-center font-semibold rounded outline-none py-0.5 bg-[var(--ui-date-header-hover)] text-[color:var(--ui-date-header-text)]"
        }
      ),
      /* @__PURE__ */ _(
        "button",
        {
          type: "button",
          onClick: () => p === "months" ? v(1) : C(1),
          style: ne,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": p === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ _(La, { style: j })
        }
      )
    ] }),
    p === "months" ? /* @__PURE__ */ pe("div", { children: [
      /* @__PURE__ */ _("div", { className: "grid grid-cols-3 text-center", children: ck.map((Y, ce) => /* @__PURE__ */ pe(
        "button",
        {
          type: "button",
          onClick: () => {
            h(ce), g("days");
          },
          style: q,
          className: `relative font-medium transition-colors border-b border-[color:var(--ui-border)] ${ce === f ? Z : Q}`,
          children: [
            Y,
            P(ce) && /* @__PURE__ */ _("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${ce === f ? "bg-[var(--ui-date-selected-text)]" : "bg-[var(--ui-accent-solid)]"}` })
          ]
        },
        Y
      )) }),
      /* @__PURE__ */ _("div", { className: "text-center border-t border-[color:var(--ui-border)]", children: /* @__PURE__ */ _(
        "button",
        {
          type: "button",
          onClick: () => {
            d(l.getFullYear()), h(l.getMonth()), g("days");
          },
          style: { paddingTop: M, paddingBottom: M, fontSize: I },
          className: "px-3 font-semibold rounded transition-colors text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-card-hover)]",
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ pe("div", { className: "grid grid-cols-7 text-center", children: [
      lk.map((Y) => /* @__PURE__ */ _("div", { style: U, className: "font-semibold uppercase tracking-wider border-b text-[color:var(--ui-text-faint)] border-[color:var(--ui-border)]", children: Y }, Y)),
      A.map((Y) => Y.empty ? /* @__PURE__ */ _("div", {}, Y.key) : /* @__PURE__ */ _(
        "button",
        {
          type: "button",
          onClick: () => T(Y.key),
          style: re,
          className: `font-medium transition-colors border-b border-[color:var(--ui-border)] ${b.has(Y.key) ? Z : Q}`,
          children: Y.day
        },
        Y.key
      ))
    ] }),
    r && t.length > 0 && /* @__PURE__ */ pe("div", { className: "px-3 py-2 border-t border-[color:var(--ui-border)] bg-[var(--ui-date-footer-bg)]", children: [
      /* @__PURE__ */ pe("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-[color:var(--ui-text-muted)]", children: [
        t.length,
        " date",
        t.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ _("div", { className: "flex flex-wrap gap-1", children: t.map((Y) => {
        const ce = /* @__PURE__ */ new Date(Y + "T00:00:00"), fe = ce.getFullYear() === l.getFullYear() ? ce.toLocaleString("default", { month: "short", day: "numeric" }) : ce.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ pe(
          "button",
          {
            type: "button",
            onClick: () => T(Y),
            "aria-label": `Remove ${fe}`,
            style: ie,
            className: "inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors bg-[var(--ui-date-chip-bg)] text-[color:var(--ui-date-chip-text)] hover:bg-[var(--ui-date-chip-hover-bg)]",
            children: [
              fe,
              /* @__PURE__ */ _("span", { className: "leading-none text-[color:var(--ui-text-muted)]", "aria-hidden": "true", children: "×" })
            ]
          },
          Y
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
  const h = (A) => e instanceof Set ? e.has(A) : e.includes(A), p = gn(), g = Te(12, 16, p), m = Te(8, 12, p), y = Te(12, 14, p), b = Te(16, 20, p), T = r != null || i != null;
  return /* @__PURE__ */ pe("div", { className: f, ...d ? { "data-theme": d } : {}, children: [
    T && /* @__PURE__ */ pe("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ _("span", { className: "ui-checklist-title", children: r }),
      i != null && /* @__PURE__ */ _("button", { type: "button", disabled: c, onClick: i, className: "ui-checklist-toggleall", children: s ?? (o ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ pe(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${c ? "ui-checklist-disabled" : ""}`,
        style: l ? { maxHeight: l, overflowY: "auto" } : void 0,
        children: [
          t.map((A) => {
            const v = h(A.id), C = /* @__PURE__ */ _(Ff, { checked: v, size: b });
            return /* @__PURE__ */ pe(
              "button",
              {
                type: "button",
                disabled: c,
                onClick: () => n(A.id),
                "aria-pressed": v,
                className: `ui-checklist-item ${v ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${m}px ${g}px`, fontSize: y },
                ...A.dataProps,
                children: [
                  u === "leading" && C,
                  A.leading != null && /* @__PURE__ */ _("span", { className: "ui-checklist-leading", children: A.leading }),
                  /* @__PURE__ */ _("span", { className: "ui-checklist-label", children: A.label }),
                  A.secondary != null && /* @__PURE__ */ _("span", { className: "ui-checklist-secondary", children: A.secondary }),
                  u === "trailing" && /* @__PURE__ */ _("span", { className: "ml-auto flex shrink-0", children: C })
                ]
              },
              A.id
            );
          }),
          t.length === 0 && /* @__PURE__ */ _("div", { className: "ui-checklist-empty", children: a })
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
  const u = gn(), d = s ? 10 : Te(12, 16, u), f = s ? 6 : Te(8, 12, u), h = s ? 12 : Te(12, 14, u), p = s ? 14 : Te(16, 20, u);
  return /* @__PURE__ */ pe("div", { className: c, ...l ? { "data-theme": l } : {}, children: [
    r != null && /* @__PURE__ */ _("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ _("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ pe(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${a ? "ui-checklist-disabled" : ""}`,
        style: o ? { maxHeight: o, overflowY: "auto" } : void 0,
        children: [
          t.map((g) => {
            const m = e === g.id;
            return /* @__PURE__ */ pe(
              "button",
              {
                type: "button",
                disabled: a,
                onClick: () => n(g.id),
                className: `ui-checklist-item ${m ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${f}px ${d}px`, fontSize: h },
                children: [
                  /* @__PURE__ */ _("span", { className: "ui-radio-circle", style: { width: p, height: p }, "aria-hidden": !0, children: m && /* @__PURE__ */ _("span", { className: "ui-radio-dot" }) }),
                  g.leading != null && /* @__PURE__ */ _("span", { className: "ui-checklist-leading", children: g.leading }),
                  /* @__PURE__ */ _("span", { className: "ui-checklist-label", children: g.label }),
                  g.secondary != null && /* @__PURE__ */ _("span", { className: "ui-checklist-secondary", children: g.secondary })
                ]
              },
              g.id
            );
          }),
          t.length === 0 && /* @__PURE__ */ _("div", { className: "ui-checklist-empty", children: i })
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
          const m = r === "left" ? p - (d.x + d.width) : r === "right" ? f - d.x : 0, y = r === "top" ? h - d.y : r === "bottom" ? g - (d.y + d.height) : 0;
          return { x: c.x + m, y: c.y + y };
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
  }, [n, a]), /* @__PURE__ */ pe(Dn, { children: [
    !n && /* @__PURE__ */ _("div", { ref: a.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    s && sl(
      /* @__PURE__ */ _(
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
  if (!e || !Mt.isValidElement(t)) return {};
  const n = t.props;
  if (n["aria-label"] || n.title) return {};
  const r = n.children;
  if (typeof r == "string" ? r.trim().length > 0 : Array.isArray(r) ? r.some((s) => typeof s == "string" && s.trim().length > 0) : !1) return {};
  const o = e.split(`
`)[0].replace(/^•\s*/, "").trim().slice(0, 80);
  return o ? { "aria-label": o } : {};
}
const Co = ({ content: t, children: e }) => {
  const n = vr(), r = gn(), i = Te(10, 12, r), o = Te(6, 6, r), s = Te(10, 12, r), a = { padding: `${o}px ${i}px`, fontSize: s }, l = oo(), c = $s(), [u, d] = Ye(!1), [f, h] = Ye({ x: 0, y: 0 }), p = V(null), g = V(null), m = () => {
    if (!p.current) return;
    const T = p.current.getBoundingClientRect();
    h({ x: T.left + T.width / 2, y: T.top });
  };
  Ge(() => () => {
    g.current && clearTimeout(g.current);
  }, []), Ge(() => (u && c && (m(), c.addEventListener("scroll", m, !0)), () => c == null ? void 0 : c.removeEventListener("scroll", m, !0)), [u]);
  const y = fk(e, t), b = Object.keys(y).length > 0 ? Mt.cloneElement(e, y) : e;
  return /* @__PURE__ */ pe(
    "div",
    {
      ref: p,
      className: "inline-flex",
      onMouseEnter: () => {
        g.current && clearTimeout(g.current), m(), d(!0);
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
• `).map((T, A) => /* @__PURE__ */ _("div", { className: A > 0 ? "mt-0.5 pt-0.5 border-t border-[color:var(--ui-tooltip-sep)]" : "", children: T }, A)),
                /* @__PURE__ */ _("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[color:var(--ui-tooltip-bg)]" })
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
  const [r, i] = Mt.useState(null), [o, s] = Mt.useState(!1), a = Mt.useRef(null), l = Mt.useRef(n);
  l.current = n;
  const c = Mt.useCallback(() => {
    var f;
    const d = (f = e.current) == null ? void 0 : f[l.current];
    d && i({ left: d.offsetLeft, width: d.offsetWidth });
  }, [e]);
  Mt.useLayoutEffect(() => {
    c();
  }, [n, c]), Mt.useLayoutEffect(() => {
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
  const u = Mt.useMemo(
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
  const t = gn(), e = Pn, n = e ? Te(28, 40, t) : 28, r = e ? Te(28, 40, t) : 28, i = e ? Te(10, 14, t) : 10, o = e ? Te(10, 14, t) : 10, s = e ? Te(8, 10, t) : 8;
  return {
    toggle: { width: n, height: n },
    control: { height: r, padding: `0 ${i}px`, fontSize: o },
    input: { height: r, padding: `0 ${s}px`, fontSize: o }
  };
}
const a3 = Pn ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", gk = Pn ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", ua = Pn ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", mk = "hover:bg-red-950/50", l3 = Pn ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", c3 = "bg-[var(--ui-accent-selected-bg)] border-[var(--ui-border-strong)] text-[color:var(--ui-accent-selected-text)]", u3 = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", yk = Pn ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", d3 = Pn ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50", wb = Pn ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", bk = "inline-flex rounded-[var(--ui-radius-btn)] overflow-hidden border border-[var(--ui-border-strong)]", vk = Pn ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", da = ({ onClick: t, disabled: e, title: n, className: r = gk, children: i }) => {
  const o = fl();
  return /* @__PURE__ */ _(Co, { content: n, children: /* @__PURE__ */ _("button", { onClick: t, disabled: e, "aria-label": n, style: o.control, className: `${r} ${e ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) });
}, fa = {
  wrap: "border-[color:var(--ui-border-strong)] bg-[var(--ui-seg-track-bg)]",
  pill: "bg-[var(--ui-seg-pill)]",
  active: "text-[color:var(--ui-accent-pill-text)]",
  idle: "text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-seg-hover)]"
}, f3 = ({ value: t, options: e, onChange: n, disabled: r, active: i, stretch: o, dense: s, variant: a = "chrome", theme: l, tablist: c, iconCollapse: u = !1, iconWithLabel: d = !0, ariaLabel: f }) => {
  const h = vr(), p = l ?? Tx(h), g = l === "blue" || l === "emerald" ? l : (h == null ? void 0 : h.accent) ?? "zinc", m = { "data-mode": p === "dark" ? "dark" : "light", "data-accent": g }, y = fl(), b = gn(), T = s && !Pn ? 24 : y.control.height, A = _i({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), v = Pn ? A : { padding: "0 12px", fontSize: 12, height: s ? 20 : 24 }, C = (k) => i ? i(k) : t === k, D = Mt.useRef(null), P = Mt.useRef([]), S = Math.max(0, e.findIndex((k) => C(k.v))), z = pk(D, P, S);
  return a === "track" ? /* @__PURE__ */ pe(
    "div",
    {
      ref: D,
      role: c ? "tablist" : "group",
      "aria-label": f,
      ...m,
      className: `relative inline-flex items-center rounded-[var(--ui-radius-btn)] border p-0.5 ${Pn ? "" : s ? "h-[26px]" : "h-[30px]"} ${o ? "w-full" : ""} ${fa.wrap}`,
      children: [
        z.style && /* @__PURE__ */ _(
          "span",
          {
            "aria-hidden": !0,
            className: `absolute rounded-[var(--ui-radius-inset)] ${fa.pill} ${z.motionClass}`,
            style: { ...z.style, top: 2, bottom: 2 }
          }
        ),
        e.map((k, x) => {
          const E = C(k.v), I = u && !!k.icon;
          return /* @__PURE__ */ _(
            "button",
            {
              ref: (M) => {
                P.current[x] = M;
              },
              ...k.dataProps,
              type: "button",
              disabled: r,
              onClick: () => n(k.v),
              title: k.title,
              role: c ? "tab" : void 0,
              "aria-selected": c ? E : void 0,
              "aria-pressed": c ? void 0 : E,
              "aria-label": k.ariaLabel ?? (k.l ? void 0 : k.title),
              style: v,
              className: `relative z-10 inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-[var(--ui-radius-inset)] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${I ? "group gap-0" : "gap-1.5"} ${o ? "flex-1" : ""} ${E ? fa.active : fa.idle}`,
              children: /* @__PURE__ */ _(
                lb,
                {
                  icon: k.icon,
                  collapse: I,
                  iconWithLabel: d,
                  active: E,
                  gap: Te(6, 8, b),
                  children: k.l
                }
              )
            },
            k.v
          );
        })
      ]
    }
  ) : /* @__PURE__ */ pe("div", { ref: D, className: `relative ${bk} bg-[var(--ui-seg-track-bg)]${o ? " w-full" : ""}`, children: [
    z.style && /* @__PURE__ */ _(
      "span",
      {
        "aria-hidden": !0,
        className: `absolute bg-[var(--ui-accent-pill-bg)] ${z.motionClass}`,
        style: { ...z.style, top: 0, bottom: 0 }
      }
    ),
    e.map((k, x) => {
      const E = C(k.v);
      return /* @__PURE__ */ pe(
        "button",
        {
          ref: (I) => {
            P.current[x] = I;
          },
          ...k.dataProps,
          disabled: r,
          onClick: () => n(k.v),
          title: k.title,
          style: { ...y.control, height: T },
          className: `relative z-10 font-medium transition-colors disabled:opacity-30 ${o ? "flex-1" : ""} ${E ? "text-[color:var(--ui-accent-pill-text)]" : "text-[color:var(--ui-text-muted)] hover:bg-[var(--ui-accent-hover-bg)]"} ${k.v !== e[e.length - 1].v ? "border-r border-[var(--ui-border)]" : ""}`,
          children: [
            k.icon,
            k.l
          ]
        },
        k.v
      );
    })
  ] });
}, h3 = ({ children: t }) => /* @__PURE__ */ pe("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ _("span", { className: Pn ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: t }),
  /* @__PURE__ */ _("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), wk = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", xk = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", p3 = ({ label: t, children: e, tall: n }) => /* @__PURE__ */ pe("div", { className: n ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  t && /* @__PURE__ */ _("span", { className: n ? wk : xk, children: t }),
  e
] }), g3 = ({ leading: t, trailing: e, className: n = "" }) => /* @__PURE__ */ pe("div", { className: `flex flex-wrap items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-0 ${n}`, children: [
  t,
  e && /* @__PURE__ */ _("div", { className: "ml-auto flex flex-wrap items-center justify-end gap-1", children: e })
] }), m3 = ({ readOnly: t, onDuplicate: e, onRemove: n, onMove: r, compact: i }) => (
  // One unbreakable cluster: when a header's trailing wraps, the move pair and
  // the duplicate/delete pair stay together (no orphaned icons on a line).
  /* @__PURE__ */ pe("div", { className: "flex items-center gap-1 shrink-0", children: [
    /* @__PURE__ */ _(da, { onClick: () => r(-1), disabled: t, title: "Move up", className: ua, children: /* @__PURE__ */ _(Fw, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ _(da, { onClick: () => r(1), disabled: t, title: "Move down", className: ua, children: /* @__PURE__ */ _(Hw, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ _(da, { onClick: e, disabled: t, title: "Duplicate", className: ua, children: /* @__PURE__ */ _(qy, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ _("div", { className: wb }),
    /* @__PURE__ */ _(da, { onClick: n, disabled: t, title: "Delete", className: `${ua} ${mk}`, children: /* @__PURE__ */ _(za, { className: "w-2.5 h-2.5" }) })
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
class at {
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
    return r && new at(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, n) {
    return new at(Rb(this.content, e + this.openStart, n + this.openStart), this.openStart, this.openEnd);
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
      return at.empty;
    let r = n.openStart || 0, i = n.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new at(De.fromJSON(e, n.content), r, i);
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
    return new at(e, r, i);
  }
}
at.empty = new at(De.empty, 0, 0);
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
      return at.empty;
    let i = this.resolve(e), o = this.resolve(n), s = r ? 0 : i.sharedDepth(n), a = i.start(s), c = i.node(s).content.cut(i.pos - a, o.pos - a);
    return new at(c, i.depth - s, o.depth - s);
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
    return r.addAll(e, Rn.none, n.from, n.to), at.maxOpen(r.finish());
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
    let n = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new at(Yf(n.content, (s, a) => !s.isAtom || !a.type.allowsMarkType(this.mark.type) ? s : s.mark(this.mark.addToSet(s.marks)), i), n.openStart, n.openEnd);
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
    let n = e.slice(this.from, this.to), r = new at(Yf(n.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), n.openStart, n.openEnd);
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
    return Bn.fromReplace(e, this.pos, this.pos + 1, new at(De.from(r), 0, n.isLeaf ? 0 : 1));
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
    return Bn.fromReplace(e, this.pos, this.pos + 1, new at(De.from(r), 0, n.isLeaf ? 0 : 1));
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
      let n = this.slice.size + e.slice.size == 0 ? at.empty : new at(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new Hn(this.from, this.to + (e.to - e.from), n, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let n = this.slice.size + e.slice.size == 0 ? at.empty : new at(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
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
    return new Hn(n.from, n.to, at.fromJSON(e, n.slice), !!n.structure);
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
    return new Kn(n.from, n.to, n.gapFrom, n.gapTo, at.fromJSON(e, n.slice), n.insert, !!n.structure);
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
      s.push(new Hn(a, u, at.empty));
    else {
      r = d;
      for (let f = 0; f < c.marks.length; f++)
        n.allowsMarkType(c.marks[f].type) || t.step(new Wr(a, u, c.marks[f]));
      if (i && c.isText && n.whitespace != "pre") {
        let f, h = /\r?\n|\r/g, p;
        for (; f = h.exec(c.text); )
          p || (p = new at(De.from(n.schema.text(" ", n.allowedMarks(c.marks))), 0, 0)), s.push(new Hn(a + f.index, a + f.index + f[0].length, p));
      }
    }
    a = u;
  }
  if (!r.validEnd) {
    let l = r.fillBefore(De.empty, !0);
    t.replace(a, a, new at(l, 0, 0));
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
  t.step(new Kn(l, c, s, a, new at(u.append(f), d, h), u.size - d, !0));
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
  t.step(new Kn(i, o, i, o, new at(r, 0, 0), n.length, !0));
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
      return t.step(new Kn(d, f, d + 1, f - 1, new at(De.from(r.create(l, null, s.marks)), 0, 0), 1, !0)), c === !0 && jb(t, s, a, o), !1;
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
  t.step(new Kn(e, e + o.nodeSize, e + 1, e + o.nodeSize - 1, new at(De.from(s), 0, 0), 1, !0));
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
  t.step(new Hn(e, e, new at(o.append(s), n, n), !0));
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
  if (t.step(new Hn(c, l.map(e + n, -1), at.empty, !0)), r === !0) {
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
function gl(t, e, n = e, r = at.empty) {
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
    let l = new at(o, s, a);
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
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new at(e, n + 1, Math.max(r, i.size + n >= e.size - r ? n + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: n, openEnd: r } = this.unplaced, i = Vl(e, n);
    if (i.childCount <= 1 && n > 0) {
      let o = e.size - n <= n + i.size;
      this.unplaced = new at(ps(e, n - 1, 1), n - 1, o ? n - 1 : r);
    } else
      this.unplaced = new at(ps(e, n, 1), n, r);
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
      let g = a.child(c), m = d.matchType(g.type);
      if (!m)
        break;
      c++, (c > 1 || l == 0 || g.content.size) && (d = m, u.push(Yb(g.mark(f.allowedMarks(g.marks)), c == 1 ? l : 0, c == a.childCount ? h : -1)));
    }
    let p = c == a.childCount;
    p || (h = -1), this.placed = gs(this.placed, n, De.from(u)), this.frontier[n].match = d, p && h < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let g = 0, m = a; g < h; g++) {
      let y = m.lastChild;
      this.frontier.push({ type: y.type, match: y.contentMatchAt(y.childCount) }), m = y.content;
    }
    this.unplaced = p ? e == 0 ? at.empty : new at(ps(s.content, e - 1, 1), e - 1, h < 0 ? s.openEnd : e - 1) : new at(ps(s.content, e, c), s.openStart, s.openEnd);
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
        let m = s[(g + l) % s.length], y = !0;
        m < 0 && (y = !1, m = -m);
        let b = i.node(m - 1), T = i.index(m - 1);
        if (b.canReplaceWith(T, T, p.type, p.marks))
          return t.replace(i.before(m), y ? o.after(m) : n, new at(Xb(r.content, 0, r.openStart, h), h, r.openEnd));
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
  t.replaceRange(e, n, new at(De.from(r), 0, 0));
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
    return Bn.fromReplace(e, this.pos, this.pos + 1, new at(De.from(i), 0, n.isLeaf ? 0 : 1));
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
  replace(e, n = e, r = at.empty) {
    let i = gl(this.doc, e, n, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, n, r) {
    return this.replace(e, n, new at(De.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, n) {
    return this.replace(e, n, at.empty);
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
  replace(e, n = at.empty) {
    let r = n.content.lastChild, i = null;
    for (let a = 0; a < n.openEnd; a++)
      i = r, r = r.lastChild;
    let o = e.steps.length, s = this.ranges;
    for (let a = 0; a < s.length; a++) {
      let { $from: l, $to: c } = s[a], u = e.mapping.slice(o);
      e.replaceRange(u.map(l.pos), u.map(c.pos), a ? at.empty : n), a == 0 && Tp(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
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
  replace(e, n = at.empty) {
    if (super.replace(e, n), n == at.empty) {
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
    return new at(De.from(this.node), 0, 0);
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
  replace(e, n = at.empty) {
    if (n == at.empty) {
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
      let a = gl(t.doc, r.before(s), r.after(s), at.empty);
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
  let c = gl(t.doc, o, l, at.empty);
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
    let s = gl(t.doc, r.before(), r.after(), at.empty);
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
      for (let y = s.length - 1; y >= 0; y--)
        p = De.from(s[y].create(null, p));
      p = De.from(i.copy(p));
      let g = t.tr.step(new Kn(e.pos - 1, h, e.pos, h, new at(p, 1, 0), s.length, !0)), m = g.doc.resolve(h + 2 * s.length);
      m.nodeAfter && m.nodeAfter.type == i.type && so(g.doc, m.pos) && g.join(m.pos), n(g.scrollIntoView());
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
    let g = o, m = 1;
    for (; !g.isTextblock; g = g.firstChild)
      m++;
    if (h.canReplace(h.childCount, h.childCount, g.content)) {
      if (n) {
        let y = De.empty;
        for (let T = p.length - 1; T >= 0; T--)
          y = De.from(p[T].copy(y));
        let b = t.tr.step(new Kn(e.pos - p.length, e.pos + o.nodeSize, e.pos + m, e.pos + o.nodeSize - m, new at(y, p.length, 0), 0, !0));
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
  t.step(new Kn(e.start - (r ? 2 : 0), e.end, e.start, e.end, new at(o, 0, 0), n.length, !0));
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
  o < s && (i.step(new Kn(o - 1, s, o, s, new at(De.from(n.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new Wa(i.doc.resolve(r.$from.pos), i.doc.resolve(s), r.depth));
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
  return r.step(new Kn(d - (a ? 1 : 0), f + (l ? 1 : 0), d + 1, f - 1, new at((a ? De.empty : De.from(i.copy(De.empty))).append(l ? De.empty : De.from(i.copy(De.empty))), a ? 0 : 1, l ? 0 : 1), a ? 0 : 1)), e(r.scrollIntoView()), !0;
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
      let c = l.lastChild && l.lastChild.type == a.type, u = De.from(c ? t.create() : null), d = new at(De.from(t.create(null, De.from(a.type.create(null, u)))), c ? 3 : 1, 0), f = o.start, h = o.end;
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
        const m = this.buildProps(c, n), y = h(...g)(m);
        return a.push(y), d;
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
    const l = (m) => {
      o.emit("contentError", {
        editor: o,
        error: m,
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
    } catch (m) {
      l(m);
    }
    try {
      var s;
      a = Bo(e, o.schema, {
        parseOptions: c,
        errorOnInvalidContent: (s = n.errorOnInvalidContent) !== null && s !== void 0 ? s : o.options.enableContentCheck
      });
    } catch (m) {
      return l(m), !1;
    }
    let { from: u, to: d } = typeof t == "number" ? {
      from: t,
      to: t
    } : {
      from: t.from,
      to: t.to
    }, f = !0, h = !0;
    const p = yv(a) ? a.content : [a];
    if (p.forEach((m) => {
      m.check(), f = f ? m.isText && m.marks.length === 0 : !1, h = h ? m.isBlock : !1;
    }), u === d && h) {
      const { parent: m } = r.doc.resolve(u);
      m.isTextblock && !m.type.spec.code && !m.childCount && (u -= 1, d += 1);
    }
    let g;
    if (f)
      Array.isArray(e) ? g = e.map((m) => m.text || "").join("") : mv(e) ? g = p.map((m) => {
        var y;
        return (y = m.text) !== null && y !== void 0 ? y : "";
      }).join("") : typeof e == "object" && e && e.text ? g = e.text : g = e, r.insertText(g, u, d);
    else {
      g = De.from(p);
      const m = r.doc.resolve(u), y = m.node(), b = m.parentOffset === 0, T = y.isText || y.isTextblock, A = y.content.size > 0;
      b && T && A && h && (u = Math.max(0, u - 1)), r.replaceWith(u, d, p);
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
      const m = Math.max(f, g), y = Math.min(h, g + p.nodeSize), b = y - m;
      s += b, a.push(...p.marks.map((T) => ({
        mark: T,
        from: m,
        to: y
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
        f.marks.find((m) => m.type === l) ? f.marks.forEach((m) => {
          l === m.type && n.addMark(p, g, l.create({
            ...m.attrs,
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
      const g = e.mapping.map(a.before()), m = e.doc.resolve(g);
      a.node(-1).canReplaceWith(m.index(), m.index() + 1, f) && e.setNodeMarkup(e.mapping.map(a.before()), f);
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
      let y = De.empty;
      const b = a.index(-1) ? 1 : a.index(-2) ? 2 : 3;
      for (let P = a.depth - b; P >= a.depth - 3; P -= 1) y = De.from(a.node(P).copy(y));
      const T = a.indexAfter(-1) < a.node(-2).childCount ? 1 : a.indexAfter(-2) < a.node(-3).childCount ? 2 : 3, A = {
        ...Da(d, a.node().type.name, a.node().attrs),
        ...e
      }, v = ((f = s.contentMatch.defaultType) === null || f === void 0 ? void 0 : f.createAndFill(A)) || void 0;
      y = y.append(De.from(s.createAndFill(null, v) || void 0));
      const C = a.before(a.depth - (b - 1));
      n.replace(C, a.after(-T), new at(y, 4 - b, 0));
      let D = -1;
      n.doc.nodesBetween(C, n.doc.content.size, (P, S) => {
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
  const m = h ? [{
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
    const { selection: y, storedMarks: b } = r, { splittableMarks: T } = o.extensionManager, A = b || y.$to.parentOffset && y.$from.marks();
    if (n.split(a.pos, 2, m).scrollIntoView(), !A || !i) return !0;
    const v = A.filter((C) => T.includes(C.type.name));
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
  const { extensions: d, splittableMarks: f } = i.extensionManager, h = Jn(t, s.schema), p = Jn(e, s.schema), { selection: g, storedMarks: m } = s, { $from: y, $to: b } = g, T = y.blockRange(b), A = m || g.$to.parentOffset && g.$from.marks();
  if (!T) return !1;
  const v = nh((E) => Ql(E.type.name, d))(g), C = g.from === 0 && g.to === s.doc.content.size, D = s.doc.content.content, P = D.length === 1 ? D[0] : null, S = C && P && Ql(P.type.name, d) ? {
    node: P,
    pos: 0
  } : null, z = v ?? S, k = !!v && T.depth >= 1 && T.depth - v.depth <= 1, x = !!S;
  if ((k || x) && z) {
    if (z.node.type === h)
      return C && x ? l().command(({ tr: E, dispatch: I }) => {
        const M = JC(E);
        return M ? (E.setSelection(M), I && I(E), !0) : !1;
      }).liftListItem(p).run() : c.liftListItem(p);
    if (Ql(z.node.type.name, d) && h.validContent(z.node.content)) return l().command(() => (o.setNodeMarkup(z.pos, h), !0)).command(() => ec(o, h)).command(() => tc(o, h)).run();
  }
  return !n || !A || !a ? l().command(() => u().wrapInList(h, r) ? !0 : c.clearNodes()).wrapInList(h, r).command(() => ec(o, h)).command(() => tc(o, h)).run() : l().command(() => {
    const E = u().wrapInList(h, r), I = A.filter((M) => f.includes(M.type.name));
    return o.ensureMarks(I), E ? !0 : c.clearNodes();
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
    n.selection.empty ? r.doc.nodesBetween(u, d, (m, y) => {
      o && o === m.type && (l = !0, p = Math.max(y, u), g = Math.min(y + m.nodeSize, d), f = y, h = m);
    }) : r.doc.nodesBetween(u, d, (m, y) => {
      y < u && o && o === m.type && (l = !0, p = Math.max(y, u), g = Math.min(y + m.nodeSize, d), f = y, h = m), y >= u && y <= d && (o && o === m.type && (l = !0, i && n.setNodeMarkup(y, void 0, {
        ...m.attrs,
        ...e
      })), s && m.marks.length && m.marks.forEach((b) => {
        if (s === b.type && (l = !0, i)) {
          const T = Math.max(y, u), A = Math.min(y + m.nodeSize, d);
          n.addMark(T, A, s.create({
            ...b.attrs,
            ...e
          }));
        }
      }));
    }), h && (f !== void 0 && i && n.setNodeMarkup(f, void 0, {
      ...h.attrs,
      ...e
    }), s && h.marks.length && h.marks.forEach((m) => {
      s === m.type && i && n.addMark(p, g, s.create({
        ...m.attrs,
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
          const p = c.slice(d).map(u.from, -1), g = c.slice(d).map(u.to), m = c.invert().map(p, -1), y = c.invert().map(g), b = p > 0 ? (f = l.doc.nodeAt(p - 1)) === null || f === void 0 ? void 0 : f.marks.some((A) => A.eq(u.mark)) : !1, T = (h = l.doc.nodeAt(g)) === null || h === void 0 ? void 0 : h.marks.some((A) => A.eq(u.mark));
          this.editor.emit("delete", {
            type: "mark",
            mark: u.mark,
            from: u.from,
            to: u.to,
            deletedRange: {
              from: m,
              to: y
            },
            newRange: {
              from: p,
              to: g
            },
            partial: !!(T || b),
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
        const { selection: l, doc: c } = a, { empty: u, $anchor: d } = l, { pos: f, parent: h } = d, p = d.parent.isTextblock && f > 0 ? a.doc.resolve(f - 1) : d, g = p.parent.type.spec.isolating, m = d.pos - d.parentOffset, y = g && p.parent.childCount === 1 ? m === d.pos : No.atStart(c).from === f;
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
  return /* @__PURE__ */ _(
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
        var y;
        if (h.button !== 0 || !r.isEditable) return;
        h.preventDefault(), r.isFocused || r.commands.focus();
        const p = typeof o == "function" ? o() : null;
        if (p == null) return;
        const g = i.state.doc.resolve(p), m = g.nodeAfter;
        m && $o.isSelectable(m) && i.dispatch(i.state.tr.setSelection(new $o(g))), (y = a.onTokenClick) == null || y.call(a, s, h.currentTarget.getBoundingClientRect(), p);
      },
      children: d ? /* @__PURE__ */ _("span", { className: "rt-token-nested", children: u }) : u
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
  const n = ul(), r = V(e);
  r.current = e, Ge(() => {
    r.current(n);
  }, [n]);
  const i = V(null);
  Ge(() => {
    var s;
    n.pointerDriven || hi((s = i.current) == null ? void 0 : s.querySelector(".ui-item-highlighted"));
  }, [n.highlightedIndex, n.pointerDriven]), Ge(() => {
    t.items.length > 0 && n.highlightedIndex === -1 && n.setHighlighted(0, "keyboard");
  }, [t.items.length, n.highlightedIndex, n]);
  const o = cl();
  return /* @__PURE__ */ _(Hs.Provider, { value: n, children: /* @__PURE__ */ _(
    "div",
    {
      role: "listbox",
      "data-token-popup": !0,
      className: "ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto",
      style: { width: R2, maxHeight: C2 },
      onMouseDown: (s) => s.preventDefault(),
      children: /* @__PURE__ */ _("div", { ref: i, children: t.items.map((s) => /* @__PURE__ */ _(
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
  }), s = gn(), a = { padding: `${Te(8, 12, s)}px ${Te(12, 16, s)}px`, fontSize: Te(12, 14, s) };
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
        /* @__PURE__ */ _("span", { className: `${e.icon} shrink-0 flex items-center`, children: /* @__PURE__ */ _("span", { className: "block w-2 h-2 rounded-full", style: { background: t.color.text } }) }),
        /* @__PURE__ */ _("span", { className: "flex-1 truncate", children: t.label }),
        t.group && /* @__PURE__ */ _("span", { className: "shrink-0 text-[9px] uppercase tracking-wider", style: { color: t.color.text }, children: t.group })
      ]
    }
  );
}, zp = () => {
  let t = null;
  const e = (r) => {
    t && (t.props = r, t.holder.style.display = r.items.length > 0 ? "" : "none", t.root.render(
      /* @__PURE__ */ _(T2, { props: r, onApi: (i) => {
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
const _2 = Mt.forwardRef(({
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
  const f = V(s);
  f.current = s;
  const h = V(a);
  h.current = a;
  const p = V(l);
  p.current = l;
  const g = V(c);
  g.current = c;
  const m = V(u);
  m.current = u;
  const y = V(null), b = V(null), T = V(e);
  T.current = e;
  const A = V(r);
  A.current = r;
  const v = V(o);
  v.current = o;
  const C = V(null), D = (x) => {
    var j;
    const E = x.getAttributes("textStyle"), I = x.getAttributes("reportTextStyle"), { from: M, to: N, empty: L } = x.state.selection;
    let W = !1, oe = !1, F = !1;
    if (!L) {
      const U = /* @__PURE__ */ new Set(), re = /* @__PURE__ */ new Set(), q = /* @__PURE__ */ new Set();
      x.state.doc.nodesBetween(M, N, (ie) => {
        if (!ie.isText) return;
        const Z = ie.marks.find((Y) => Y.type.name === "textStyle");
        U.add((Z == null ? void 0 : Z.attrs.fontFamily) || ""), re.add((Z == null ? void 0 : Z.attrs.fontSize) || "");
        const Q = ie.marks.find((Y) => Y.type.name === "reportTextStyle");
        q.add((Q == null ? void 0 : Q.attrs.styleId) || "");
      }), W = U.size > 1, oe = re.size > 1, F = q.size > 1;
    }
    const O = {
      bold: x.isActive("bold"),
      italic: x.isActive("italic"),
      underline: x.isActive("underline"),
      strike: x.isActive("strike"),
      link: x.isActive("link"),
      color: E.color || "",
      fontFamily: E.fontFamily || "",
      fontSize: E.fontSize || "",
      textStyle: I.styleId || "",
      hasSelection: !L,
      fontFamilyMixed: W,
      fontSizeMixed: oe,
      textStyleMixed: F
    }, ne = C.current;
    ne && ne.bold === O.bold && ne.italic === O.italic && ne.underline === O.underline && ne.strike === O.strike && ne.link === O.link && ne.color === O.color && ne.fontFamily === O.fontFamily && ne.fontSize === O.fontSize && ne.textStyle === O.textStyle && ne.hasSelection === O.hasSelection && ne.fontFamilyMixed === O.fontFamilyMixed && ne.fontSizeMixed === O.fontSizeMixed && ne.textStyleMixed === O.textStyleMixed || (C.current = O, (j = v.current) == null || j.call(v, O));
  }, P = (x) => {
    var L;
    const E = x.state.selection;
    let I = null;
    E instanceof $o && E.node.type.name === "token" ? (I = { key: E.node.attrs.field ?? "", pos: E.from }, y.current = E.from) : y.current != null && (y.current = x.state.tr.mapping.map(y.current));
    const M = b.current, N = M && I && M.key === I.key && M.pos === I.pos;
    !M && !I || N || (b.current = I, (L = m.current) == null || L.call(m, I));
  }, S = (x) => {
    const E = v2(w2(x));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(E) ? "" : E;
  }, z = Mt.useMemo(() => {
    const x = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: M }) => {
        var N;
        return ((N = h.current) == null ? void 0 : N.call(h, M)) ?? [];
      },
      command: ({ editor: M, range: N, props: L }) => {
        M.chain().focus().insertContentAt(N, { type: "token", attrs: { field: L.field } }).run();
      },
      render: zp
    }, E = S2.configure({
      resolve: f.current ?? null,
      suggestion: x,
      onTokenClick: (M, N, L) => {
        var W;
        y.current = L, (W = g.current) == null || W.call(g, M, N, L);
      }
    }), I = _r.create({
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
            shouldShow: ({ editor: M, range: N }) => Av(M, N.from) != null,
            items: ({ editor: M, query: N }) => {
              var W;
              const L = A2(M);
              return L ? ((W = p.current) == null ? void 0 : W.call(p, L.chipKey, N)) ?? [] : [];
            },
            command: ({ editor: M, range: N, props: L }) => {
              M.chain().focus().insertContentAt(N, { type: "token", attrs: { field: L.field } }).run();
            },
            render: zp
          })
        ];
      }
    });
    return [E, I];
  }, []), k = rx({
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
      T.current(S(x.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: x }) => {
      D(x), P(x);
    }
  });
  return Ge(() => {
    if (!k || k.isFocused) return;
    S(k.getHTML()) !== t && (C.current = null, k.commands.setContent(Op(t || ""), { emitUpdate: !1 }), D(k));
  }, [t, k]), Ge(() => {
    k && k.setEditable(!r);
  }, [r, k]), Ge(() => {
    k && (C.current = null, D(k), P(k));
  }, [k]), By(d, () => ({
    exec: (x, E, I) => {
      if (!k || A.current) return;
      const M = k.chain(), N = (I == null ? void 0 : I.focus) === !1 ? M : M.focus();
      switch (x) {
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
          E && N.setColor(E).run();
          break;
        case "unsetColor":
          N.unsetColor().run();
          break;
        case "fontFamily":
          E && N.setFontFamily(E).run();
          break;
        case "unsetFontFamily":
          N.unsetFontFamily().run();
          break;
        case "fontSize":
          E && N.setFontSize(E).run();
          break;
        case "unsetFontSize":
          N.unsetFontSize().run();
          break;
        // Linked named style: mark the run with the consumer's style id. Direct
        // font family/size on the range is cleared so the linked style's
        // typography takes effect (the object-level precedent); bold/italic
        // marks stay — direct character formatting still wins (Word).
        case "textStyle":
          E && N.setMark("reportTextStyle", { styleId: E }).unsetFontFamily().unsetFontSize().run();
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
          E && N.extendMarkRange("link").setLink({ href: E }).run();
          break;
        case "unlink":
          N.extendMarkRange("link").unsetLink().run();
          break;
      }
    },
    focus: (x) => k == null ? void 0 : k.commands.focus(x),
    insertToken: (x) => {
      !k || A.current || k.chain().focus().insertContent({ type: "token", attrs: { field: x } }).run();
    },
    replaceToken: (x) => {
      if (!k || A.current) return;
      const E = y.current;
      E != null && k.commands.command(({ tr: I }) => {
        const M = I.doc.nodeAt(E);
        if (!M || M.type.name !== "token") return !1;
        I.setNodeMarkup(E, void 0, { field: x });
        const N = I.doc.resolve(E);
        return N.nodeAfter && N.nodeAfter.type.name === "token" && I.setSelection(new $o(N)), !0;
      });
    },
    holdSelectionHighlight: (x) => {
      !k || k.isDestroyed || k.view.dispatch(k.state.tr.setMeta(Na, { held: x }));
    }
  }), [k]), /* @__PURE__ */ _(ix, { editor: k, className: `richtext-editor ${i || ""}` });
});
_2.displayName = "RichTextEditor";
const P2 = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], D2 = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], Lp = ({ className: t = "w-3 h-3" }) => /* @__PURE__ */ _("span", { className: `${t} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ _("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), N2 = ({ value: t, disabled: e, onChange: n, mixed: r }) => {
  const [i, o] = Ye(!1);
  return /* @__PURE__ */ _(
    dl,
    {
      open: i,
      onOpenChange: o,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ pe("button", { type: "button", disabled: e, className: `${vk} w-28 justify-between`, children: [
        r ? /* @__PURE__ */ _("span", { className: "truncate italic text-zinc-500", children: "Mixed" }) : /* @__PURE__ */ _("span", { className: "truncate", style: { fontFamily: t || "Helvetica" }, children: t || "Helvetica" }),
        /* @__PURE__ */ _(ci, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: P2.map((s) => /* @__PURE__ */ _(jx, { onClick: () => {
        n(s), o(!1);
      }, icon: !r && s === t ? /* @__PURE__ */ _(zs, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ _("span", { style: { fontFamily: s }, children: s }) }, s))
    }
  );
}, O2 = ({ editorRef: t, disabled: e, active: n }) => {
  const [r, i] = Ye(!1), o = fl(), [s, a] = Ye(""), l = () => {
    var u;
    const c = s.trim();
    c && ((u = t.current) == null || u.exec("link", c), i(!1));
  };
  return /* @__PURE__ */ _(
    dl,
    {
      open: r,
      onOpenChange: i,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ _(
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
          children: /* @__PURE__ */ _(jw, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ pe("div", { className: "p-2 flex flex-col gap-2", children: [
        /* @__PURE__ */ _(
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
        /* @__PURE__ */ pe("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ _(cr, { theme: "dark", onClick: l, style: o.control, disabled: !s.trim(), children: "Apply" }),
          /* @__PURE__ */ _(
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
  const [c, u] = Ye(!1), d = (m, y) => {
    var b;
    return (b = t.current) == null ? void 0 : b.exec(m, y);
  }, f = fl(), h = (m) => !!(r != null && r[m]), p = "flex items-center gap-1 shrink-0", g = l ? /* @__PURE__ */ _("div", { className: wb }) : null;
  return /* @__PURE__ */ pe("div", { className: `flex flex-wrap items-center ${l ? "gap-x-1" : "gap-x-2"} gap-y-1.5`, children: [
    /* @__PURE__ */ pe("div", { className: p, children: [
      /* @__PURE__ */ _(Co, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ _(cr, { theme: "dark", "aria-label": "Bold", active: ((n == null ? void 0 : n.bold) ?? !1) || h("bold"), disabled: e || h("bold"), onMouseDown: (m) => m.preventDefault(), onClick: () => d("bold"), style: { ...f.toggle, padding: 0 }, className: "justify-center font-bold", children: "B" }) }),
      /* @__PURE__ */ _(Co, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ _(cr, { theme: "dark", "aria-label": "Italic", active: ((n == null ? void 0 : n.italic) ?? !1) || h("italic"), disabled: e || h("italic"), onMouseDown: (m) => m.preventDefault(), onClick: () => d("italic"), style: { ...f.toggle, padding: 0 }, className: "justify-center italic", children: "I" }) }),
      /* @__PURE__ */ _(Co, { content: "Underline", children: /* @__PURE__ */ _(cr, { theme: "dark", "aria-label": "Underline", active: (n == null ? void 0 : n.underline) ?? !1, disabled: e, onMouseDown: (m) => m.preventDefault(), onClick: () => d("underline"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ _(Bw, { className: "w-3 h-3" }) }) }),
      /* @__PURE__ */ _(Co, { content: "Strikethrough", children: /* @__PURE__ */ _(cr, { theme: "dark", "aria-label": "Strikethrough", active: (n == null ? void 0 : n.strike) ?? !1, disabled: e, onMouseDown: (m) => m.preventDefault(), onClick: () => d("strikeThrough"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ _(qw, { className: "w-3 h-3" }) }) })
    ] }),
    g,
    /* @__PURE__ */ _("div", { className: p, children: /* @__PURE__ */ _(O2, { editorRef: t, disabled: e, active: (n == null ? void 0 : n.link) ?? !1 }) }),
    g,
    /* @__PURE__ */ _("div", { className: p, children: /* @__PURE__ */ _(
      dl,
      {
        open: c,
        onOpenChange: u,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ pe(cr, { theme: "dark", disabled: e, style: f.control, className: "justify-between min-w-0", title: "Text color", children: [
          n != null && n.color ? /* @__PURE__ */ _("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: n.color } }) : /* @__PURE__ */ _(Lp, {}),
          /* @__PURE__ */ _(ci, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ pe("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ _(
            "button",
            {
              onClick: () => {
                d("unsetColor"), u(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${n != null && n.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ _(Lp, { className: "w-3.5 h-3.5" })
            }
          ),
          D2.map((m) => /* @__PURE__ */ _(
            "button",
            {
              onClick: () => {
                d("foreColor", m), u(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors ${m === (n == null ? void 0 : n.color) ? "ring-2 ring-zinc-300" : ""}`,
              style: { background: m },
              title: m
            },
            m
          ))
        ] })
      }
    ) }),
    (o || s || a) && /* @__PURE__ */ pe(Dn, { children: [
      g,
      /* @__PURE__ */ pe("div", { className: p, children: [
        o && /* @__PURE__ */ _(N2, { value: o.value || "Helvetica", mixed: o.mixed, disabled: e, onChange: o.onChange }),
        s,
        a && /* @__PURE__ */ _(Co, { content: "Clear formatting", children: /* @__PURE__ */ _(
          cr,
          {
            theme: "dark",
            "aria-label": "Clear formatting",
            disabled: e,
            onMouseDown: (m) => m.preventDefault(),
            onClick: () => d("clearFormatting"),
            style: { ...f.toggle, padding: 0 },
            className: "justify-center",
            children: /* @__PURE__ */ _(Ww, { className: "w-3 h-3" })
          }
        ) })
      ] })
    ] }),
    i && /* @__PURE__ */ pe(Dn, { children: [
      g,
      /* @__PURE__ */ _("div", { className: p, children: i })
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
  const [h, p] = Ye(null), [g, m] = Ye(!1), y = V(!1), b = V(null), T = V(null), A = V(null), v = gn(), C = bb(), D = c === void 0;
  Ge(() => () => {
    var N;
    return (N = b.current) == null ? void 0 : N.call(b);
  }, []), Nn(() => {
    const N = A.current, L = T.current;
    !D && N && L && (L.style.color = getComputedStyle(N).color);
  }, [D, c]), Ge(() => {
    y.current || p(null);
  }, [t]);
  const P = t ?? r, S = h !== null ? h : t != null ? String(t) : d ? "" : String(r), z = (N) => rh(N, e, n), k = (N) => {
    const L = z2(P, N, e, n, o);
    L !== P && (y.current && p(String(L)), i(L));
  }, x = (N) => {
    if (a || s || N.pointerType !== "mouse" || N.button !== 0) return;
    const L = N.currentTarget, W = N.clientY, oe = P;
    let F = oe, O = !1;
    const ne = (U) => {
      const re = W - U.clientY;
      if (!O) {
        if (Math.abs(re) < F2) return;
        O = !0, L.blur(), L.style.userSelect = "none";
      }
      const q = $2(oe, re, e, n, o);
      q !== F && (F = q, i(q));
    }, j = () => {
      b.current = null, window.removeEventListener("pointermove", ne), window.removeEventListener("pointerup", j), window.removeEventListener("pointercancel", j), L.style.userSelect = "", O && L.blur();
    };
    b.current = j, window.addEventListener("pointermove", ne), window.addEventListener("pointerup", j), window.addEventListener("pointercancel", j);
  }, E = (N) => ({
    type: "button",
    tabIndex: -1,
    "aria-label": N === 1 ? "Increase" : "Decrease",
    disabled: !!a || !!s || (N === 1 ? P >= n : P <= e),
    onPointerDown: (L) => L.preventDefault(),
    onClick: () => k(N)
  }), I = D ? Te(22, 30, v) : Te(16, 22, v), M = D ? Te(14, 18, v) : Te(11, 15, v);
  return /* @__PURE__ */ pe(
    "span",
    {
      ref: T,
      className: `ui-number ${D ? "ui-number-box" : ""}`,
      ...f ? { "data-theme": f } : {},
      children: [
        /* @__PURE__ */ _(
          "input",
          {
            ref: A,
            type: "number",
            "aria-label": l,
            title: u,
            placeholder: d,
            value: S,
            readOnly: s,
            disabled: a,
            className: c ?? "ui-input w-20",
            style: {
              ...D ? { ...C, minHeight: Te(28, 36, v) } : {},
              paddingRight: I + 2,
              cursor: a || s ? void 0 : g ? "text" : "ns-resize"
            },
            onFocus: () => {
              y.current = !0, m(!0);
            },
            onChange: (N) => {
              const L = N.target.value;
              p(L);
              const W = parseInt(L, 10);
              L !== "" && !Number.isNaN(W) && i(z(W));
            },
            onBlur: () => {
              if (y.current = !1, m(!1), h === null) return;
              const N = parseInt(h, 10);
              Number.isNaN(N) || i(z(N)), p(null);
            },
            onKeyDown: (N) => {
              N.key === "Enter" && N.target.blur(), N.key === "Escape" && (p(null), N.target.blur()), !s && !a && (N.key === "ArrowUp" || N.key === "ArrowDown") && (N.preventDefault(), k(N.key === "ArrowUp" ? 1 : -1));
            },
            onPointerDown: x
          }
        ),
        /* @__PURE__ */ pe("span", { className: "ui-number-steppers", style: { width: I }, children: [
          /* @__PURE__ */ _("button", { ...E(1), className: "ui-number-step", children: /* @__PURE__ */ _(Kw, { style: { width: M, height: M } }) }),
          /* @__PURE__ */ _("button", { ...E(-1), className: "ui-number-step", children: /* @__PURE__ */ _(ci, { style: { width: M, height: M } }) })
        ] })
      ]
    }
  );
}
function k3({ title: t, icon: e, count: n, tone: r = "default", collapsed: i, onToggle: o, trailing: s, bodyClass: a, className: l = "", dataProps: c, children: u }) {
  const d = gn(), f = _i({ px: 12, py: 8, fs: 12 }, { px: 14, py: 12, fs: 14 }), h = Te(14, 16, d), p = { width: h, height: h }, g = Te(10, 12, d);
  return /* @__PURE__ */ pe("div", { ...c, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${l}`, children: [
    /* @__PURE__ */ pe("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1 bg-[var(--ui-card-header-bg)] text-[color:var(--ui-card-header-text)] hover:bg-[var(--ui-card-header-hover)] transition-colors", style: f, children: [
      /* @__PURE__ */ pe(
        "button",
        {
          type: "button",
          onClick: o,
          className: "flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer",
          children: [
            i ? /* @__PURE__ */ _(La, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: p }) : /* @__PURE__ */ _(ci, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: p }),
            e && /* @__PURE__ */ _("span", { className: "text-[color:var(--ui-card-header-icon)] shrink-0 inline-flex", children: e }),
            /* @__PURE__ */ _("span", { className: "font-semibold text-[color:var(--ui-card-header-text)] truncate", children: t }),
            n && /* @__PURE__ */ _("span", { className: "ui-card-count shrink-0", style: { fontSize: g }, children: n })
          ]
        }
      ),
      s && /* @__PURE__ */ _("div", { className: "shrink-0", children: s })
    ] }),
    !i && u && /* @__PURE__ */ _("div", { className: a || "ui-card-band border-t p-1.5 space-y-1", children: u })
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
  const d = V(null), f = V(null), [h, p] = Ye(null), g = (C) => {
    d.current = C, typeof o == "function" ? o(C) : o && (o.current = C);
  };
  Nn(() => {
    if (t) return;
    const C = d.current;
    if (!C || (f.current = C.getBoundingClientRect().width, typeof ResizeObserver > "u")) return;
    const D = new ResizeObserver(() => {
      f.current = C.getBoundingClientRect().width;
    });
    return D.observe(C), () => D.disconnect();
  }, [t]), Nn(() => {
    if (!t || e !== "auto") {
      p(null);
      return;
    }
    p(f.current);
    const C = requestAnimationFrame(() => p(null));
    return () => cancelAnimationFrame(C);
  }, [t, e]);
  const [m, y] = Ye(!1), [b, T] = Ye(null), A = V(!1);
  Nn(() => {
    if (t) {
      A.current = !0, y(!1), T(null);
      return;
    }
    if (!A.current || e !== "auto") return;
    A.current = !1, y(!0);
    let C = 0, D = 0;
    return (() => {
      var k;
      const S = (k = d.current) == null ? void 0 : k.firstElementChild, z = (S == null ? void 0 : S.getBoundingClientRect().width) ?? 0;
      z > 0 ? (C = requestAnimationFrame(() => T(z)), D = window.setTimeout(() => {
        y(!1), T(null);
      }, Pi + 30)) : y(!1);
    })(), () => {
      cancelAnimationFrame(C), window.clearTimeout(D);
    };
  }, [t, e]);
  const v = t ? h ?? n : m ? b ?? n : e === "auto" ? "auto" : e;
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
        /* @__PURE__ */ _(
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
        /* @__PURE__ */ _(
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
  actions: m,
  leadingIcon: y,
  showClear: b = !0,
  onSubmit: T,
  onCancel: A,
  cancelOnEscape: v = !1,
  cancelOnOutside: C = !1,
  className: D = "",
  "aria-label": P
}) {
  const [S, z] = Ye(h), k = V(S);
  k.current = S;
  const x = V(null), E = V(null), I = V(null), M = Yy(), N = gn(), L = Te(9, 13, N), W = Ne((Q) => {
    k.current !== Q && (k.current = Q, z(Q), p == null || p(Q));
  }, [p]), oe = Ne((Q = !1) => {
    var Y;
    W(!1), (Y = E.current) == null || Y.blur(), Q && requestAnimationFrame(() => {
      var ce;
      return (ce = I.current) == null ? void 0 : ce.focus();
    });
  }, [W]), F = Ne(() => {
    W(!0), requestAnimationFrame(() => {
      const Q = E.current;
      if (!Q) return;
      Q.focus();
      const Y = Q.value.length;
      Q.setSelectionRange(Y, Y);
    });
  }, [W]);
  Ge(() => {
    h && F();
  }, [h, F]), Ge(() => {
    var ce;
    if (!S) return;
    const Q = ((ce = x.current) == null ? void 0 : ce.ownerDocument) ?? document, Y = (fe) => {
      var xe;
      const Ee = fe.target;
      Ee && ((xe = x.current) != null && xe.contains(Ee) || (C && (A == null || A()), oe()));
    };
    return Q.addEventListener("pointerdown", Y, !0), () => Q.removeEventListener("pointerdown", Y, !0);
  }, [S, oe, C, A]);
  const O = Ne((Q) => {
    var ce;
    if (!S) return;
    const Y = Q.relatedTarget;
    Y && ((ce = x.current) != null && ce.contains(Y)) || (C && (A == null || A()), oe());
  }, [S, oe, C, A]), ne = Ne((Q) => {
    if (Q.key === "Enter") {
      Q.preventDefault(), T == null || T(t), oe(!0);
      return;
    }
    Q.key === "Escape" && (Q.preventDefault(), Q.stopPropagation(), v ? A == null || A() : e(""), oe(!0));
  }, [e, oe, v, A, T, t]), j = r === void 0 ? /* @__PURE__ */ _(Io, { className: "w-3.5 h-3.5" }) : r, U = y === void 0 ? j : y, ie = 8 + (((m == null ? void 0 : m.length) || 0) + (b && t ? 1 : 0)) * (M.box + 2), Z = (Q) => /* @__PURE__ */ _(
    "span",
    {
      style: { width: M.icon, height: M.icon },
      className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
      children: Q
    }
  );
  return /* @__PURE__ */ _(
    ih,
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
      onBlur: O,
      trigger: /* @__PURE__ */ _(
        cr,
        {
          ref: I,
          type: "button",
          variant: a,
          size: "minimal",
          theme: d,
          icon: j,
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
          children: /* @__PURE__ */ _("span", { className: `min-w-0 ${l ? "" : "truncate"}`, children: n })
        }
      ),
      field: /* @__PURE__ */ pe(Dn, { children: [
        U && /* @__PURE__ */ _(
          "span",
          {
            className: "ui-icon absolute top-1/2 -translate-y-1/2 pointer-events-none",
            style: { left: L, width: M.icon, height: M.icon },
            children: Z(U)
          }
        ),
        /* @__PURE__ */ _(
          "input",
          {
            ref: E,
            value: t,
            onChange: (Q) => e(Q.target.value),
            onKeyDown: ne,
            placeholder: i,
            "aria-label": P || i,
            tabIndex: S ? 0 : -1,
            "data-morph-search-input": !0,
            style: { paddingLeft: U ? L + M.icon + 6 : 10, paddingRight: ie },
            className: `${Ha("sm")} w-full`
          }
        ),
        /* @__PURE__ */ pe("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
          m == null ? void 0 : m.map((Q) => /* @__PURE__ */ _(
            "button",
            {
              type: "button",
              "aria-label": Q.label,
              title: Q.label,
              tabIndex: S ? 0 : -1,
              onMouseDown: (Y) => Y.preventDefault(),
              onClick: () => {
                Q.onClick(t, { close: () => oe(!0) }), Q.keepOpen || oe(!0);
              },
              style: { width: M.box, height: M.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-action": Q.key,
              children: Z(Q.icon)
            },
            Q.key
          )),
          b && t && /* @__PURE__ */ _(
            "button",
            {
              type: "button",
              "aria-label": "Clear",
              tabIndex: S ? 0 : -1,
              onClick: () => {
                e(""), requestAnimationFrame(() => {
                  var Q;
                  return (Q = E.current) == null ? void 0 : Q.focus();
                });
              },
              style: { width: M.box, height: M.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-clear": !0,
              children: /* @__PURE__ */ _(eo, { size: M.icon })
            }
          )
        ] })
      ] })
    }
  );
}
function H2({
  triggerLabel: t,
  triggerIcon: e = /* @__PURE__ */ _(ol, { className: "w-3.5 h-3.5" }),
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
  const p = (y) => {
    i == null || i(y), s && l("");
  }, g = () => {
    o == null || o(), a && l("");
  }, m = [
    ...r,
    ...i ? [{
      key: "submit",
      label: "Submit",
      icon: /* @__PURE__ */ _(zs, { className: "w-3.5 h-3.5" }),
      onClick: p
    }] : [],
    ...o ? [{
      key: "cancel",
      label: "Cancel",
      icon: /* @__PURE__ */ _(eo, { className: "w-3.5 h-3.5" }),
      onClick: g
    }] : []
  ];
  return /* @__PURE__ */ _(
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
      actions: m,
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
  browseExpanded: m = !1,
  groupExpandMode: y = "multiple",
  browseAll: b = !1,
  selectedId: T,
  autoFocus: A = !0,
  collapsedWidth: v = 128,
  expandedWidth: C = 288,
  panelWidth: D,
  panelMinWidth: P,
  keepAllRows: S = !1,
  maxMenuHeight: z = 420,
  theme: k = "light",
  morph: x = !0,
  emptyTitle: E,
  emptyHint: I,
  renderEmpty: M,
  emptyActions: N,
  leadingActions: L,
  hideLeadingOnEmpty: W = !1,
  footerActions: oe,
  fieldActions: F,
  multiple: O,
  open: ne,
  onOpenChange: j,
  hideTrigger: U = !1,
  anchorRef: re,
  portalTarget: q,
  renderTrigger: ie,
  renderItem: Z,
  highlightOnOpen: Q = !0,
  ref: Y
}) {
  const ce = l !== void 0, [fe, Ee] = Ye(""), xe = ce ? l : fe, ze = Ne(($) => {
    ce || Ee($), c == null || c($);
  }, [ce, c]), Qe = ne !== void 0, [dt, et] = Ye(!1), te = Qe ? ne : dt, Ae = Ne(($) => {
    Qe || et($), j == null || j($);
  }, [Qe, j]), [_e, We] = Ye(n === "inline"), He = pn(() => e.map(($) => $.key).join("\0"), [e]), Le = pn(() => new Set(He ? He.split("\0") : []), [He]), [Je, yt] = Ye(() => m ? Le : /* @__PURE__ */ new Set()), [ve, je] = Ye(0), Ct = V(!1), bt = V(null), Xe = Ne(($, be = "keyboard") => {
    Ct.current = be === "pointer", je($);
  }, []), Rt = V(null), pt = V(null), ft = V(null), It = V(null), $t = V(null), en = V(0), wt = Ls(), Nt = oo(), zt = cl(), kn = qf(), on = db(), de = Yy(), K = 8 + (((F == null ? void 0 : F.length) || 0) + (xe ? 1 : 0)) * (de.box + 2), [G, we] = Ye({ top: 0, left: 0, maxH: 288, ready: !1 }), [Ie, nt] = Ye(0);
  eb({
    anchorRef: re ?? Rt,
    panelRef: It,
    open: te,
    maxHeight: z,
    anchorRectRef: $t,
    onPosition: ($) => we({ top: $.top, left: $.left, maxH: $.maxH, ready: $.ready })
  }), Ge(() => {
    const $ = (re == null ? void 0 : re.current) ?? Rt.current;
    !te || !$ || nt($.getBoundingClientRect().width);
  }, [te, _e, re]);
  const [Kt, lt] = Ye(!1);
  Ge(() => {
    te && lt(!0);
  }, [te]);
  const ee = ll({
    visible: te,
    morph: x,
    anchor: () => {
      var $;
      return (($ = (re == null ? void 0 : re.current) ?? Rt.current) == null ? void 0 : $.getBoundingClientRect()) ?? null;
    },
    ref: It,
    cloneOnUnmount: !0,
    onClosed: () => lt(!1)
  }), ke = (N || []).map(
    ($) => typeof $.label == "function" ? $.label(xe) : $.label
  ), Se = pn(
    () => W2({
      items: t,
      groups: e,
      /* show-all mode: the query only moves the highlight, every option stays
         in the list (the old I/E + D/N autocomplete contract). */
      query: S ? "" : xe,
      browseGroups: p || m || g,
      browseAll: b,
      expandedGroups: Je,
      emptyActionLabels: ke
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, e, xe, S, p, m, g, b, Je, ke.join("\0")]
  ), Ke = pn(
    () => (L || []).map(($, be) => ({
      kind: "action",
      label: typeof $.label == "function" ? $.label(xe) : $.label,
      actionIndex: be,
      source: "leading"
    })),
    [L, xe]
  ), gt = pn(
    () => (oe || []).map(($, be) => ({
      kind: "action",
      label: typeof $.label == "function" ? $.label(xe) : $.label,
      actionIndex: be,
      source: "footer"
    })),
    [oe, xe]
  ), Ot = Se.some(($) => $.kind === "empty"), ct = Ke.length > 0 && !(W && Ot), ht = ct ? Ke.length : 0, vt = pn(
    () => [...ct ? Ke : [], ...Se, ...gt],
    [ct, Ke, Se, gt]
  ), ut = !!d || g && !xe.trim(), Yt = pn(
    () => vt.map(($, be) => ({ row: $, index: be })).filter(($) => !($.row.kind === "empty" || $.row.kind === "item" && $.row.hidden || $.row.kind === "group" && !ut)),
    [vt, ut]
  ), xr = (g || m) && !xe.trim(), Ht = !!O, mn = pn(
    () => t.filter(($) => $.checkable !== !1).map(($) => $.id),
    [t]
  ), On = pn(() => xe.trim() ? Pv(t, e, xe).hits.filter(($) => $.item.checkable !== !1).map(($) => $.item.id) : mn, [t, e, xe, mn]), Gn = pn(() => new Set(On), [On]), Xt = ob({
    mode: (O == null ? void 0 : O.mode) ?? "draft",
    selectedIds: (O == null ? void 0 : O.selectedIds) ?? ab,
    itemIds: mn,
    visibleIds: On,
    max: O == null ? void 0 : O.max,
    disabledIds: O == null ? void 0 : O.disabledIds,
    indicator: O == null ? void 0 : O.indicator,
    onCommit: O == null ? void 0 : O.onCommit,
    onDraftChange: O == null ? void 0 : O.onDraftChange,
    onToggle: O == null ? void 0 : O.onToggle
  }), zn = V(Xt.reset);
  zn.current = Xt.reset;
  const dr = typeof (O == null ? void 0 : O.commitLabel) == "function" ? O.commitLabel(Xt.count) : (O == null ? void 0 : O.commitLabel) ?? `Select ${Xt.count}`, yn = Ne(() => {
    var $;
    Ae(!1), n === "expandable" && (($ = pt.current) == null || $.blur(), We(!1), requestAnimationFrame(() => {
      var be;
      return (be = ft.current) == null ? void 0 : be.focus();
    })), Qe || ze(""), Xe(0), yt(m ? Le : /* @__PURE__ */ new Set()), f == null || f();
  }, [n, f, ze, m, Le, Qe, Ae]);
  Ge(() => {
    if (xe.trim() || !m) {
      yt(($) => $.size ? /* @__PURE__ */ new Set() : $);
      return;
    }
    yt(($) => $.size === Le.size && [...Le].every((be) => $.has(be)) ? $ : Le);
  }, [xe, m, Le]);
  const fr = V(!1), Yn = V(!1);
  Ge(() => {
    if (!te) {
      fr.current = !1;
      return;
    }
    if (fr.current || !g || xe.trim()) return;
    const $ = T ? [T] : [...(O == null ? void 0 : O.selectedIds) ?? []], be = new Set($), Oe = be.size ? e.filter((tt) => t.some((Bt) => Bt.group === tt.key && be.has(Bt.id))).map((tt) => tt.key) : [];
    if (Oe.length === 0) {
      fr.current = !0;
      return;
    }
    const Ue = y === "single" ? Oe.slice(0, 1) : Oe;
    if (!Ue.every((tt) => Je.has(tt))) {
      Yn.current = !0, yt(new Set(Ue));
      return;
    }
    if (Q && T) {
      const tt = vt.findIndex((Bt) => Bt.kind === "item" && Bt.hit.item.id === T);
      tt >= 0 && Xe(tt);
    }
    fr.current = !0;
  }, [te, g, xe, e, t, T, O == null ? void 0 : O.selectedIds, y, Je, vt, Q, Xe]);
  const un = Ne(($) => {
    yt((be) => {
      const Oe = new Set(be);
      return Oe.has($) ? Oe.delete($) : (y === "single" && Oe.clear(), Oe.add($)), Oe;
    });
  }, [y]), Sn = Ne(() => {
    var be;
    if (te) {
      (be = pt.current) == null || be.focus();
      return;
    }
    if (zn.current(), n === "expandable" && !_e) {
      const Oe = Rt.current;
      if (Oe) {
        const Ue = Oe.style.transition, tt = Oe.style.width;
        Oe.style.transition = "none", Oe.style.width = `${C}px`;
        const Bt = Oe.getBoundingClientRect();
        $t.current = { left: Bt.left, top: Bt.top, width: Bt.width, height: Bt.height }, Oe.style.width = tt, Oe.offsetWidth, Oe.style.transition = Ue, window.clearTimeout(en.current), en.current = window.setTimeout(() => {
          $t.current = null;
        }, Pi + 80);
      }
    }
    We(!0), Ae(!0);
    const $ = T ? Se.findIndex((Oe) => Oe.kind === "item" && Oe.hit.item.id === T) : -1;
    Xe($ >= 0 ? ht + $ : Q ? ht : -1);
  }, [te, n, _e, C, ht, Se, T, Q]);
  Ge(() => () => {
    window.clearTimeout(en.current), $t.current = null;
  }, []), Ge(() => {
    te || (bt.current = null);
  }, [te]), Ge(() => {
    if (n !== "expandable" || !_e || !te || !A) return;
    const $ = requestAnimationFrame(() => {
      var be;
      return (be = pt.current) == null ? void 0 : be.focus();
    });
    return () => cancelAnimationFrame($);
  }, [n, _e, te, A]), Ge(() => {
    var Oe;
    if (!te) return;
    const $ = ((Oe = Rt.current) == null ? void 0 : Oe.ownerDocument) ?? wt;
    if (!$) return;
    const be = (Ue) => {
      var Bt, Wn, jn, hr;
      const tt = ((Bt = Ue.composedPath) == null ? void 0 : Bt.call(Ue)[0]) ?? Ue.target;
      !tt || typeof tt.nodeType != "number" || (Wn = Rt.current) != null && Wn.contains(tt) || (jn = It.current) != null && jn.contains(tt) || (hr = re == null ? void 0 : re.current) != null && hr.contains(tt) || yn();
    };
    return $.addEventListener("pointerdown", be, !0), () => $.removeEventListener("pointerdown", be, !0);
  }, [te, yn, wt, re]);
  const rr = Ne(($) => {
    var be;
    if ($.kind === "item" ? bt.current = $.hit.item.id : ($.kind === "group" || $.kind === "action") && (bt.current = null), $.kind === "group") {
      if (Ht) {
        const Oe = (be = O == null ? void 0 : O.groupToken) == null ? void 0 : be.call(O, $.group.key);
        if (Oe) {
          Xt.canToggle(Oe) && Xt.toggle(Oe);
          return;
        }
        const Ue = t.filter((tt) => tt.group === $.group.key && tt.checkable !== !1 && Gn.has(tt.id) && !Xt.isDisabled(tt.id)).map((tt) => tt.id);
        Ue.length && Xt.toggleGroup(Ue);
        return;
      }
      d ? (d($.group), h && yn()) : ut && un($.group.key);
      return;
    }
    if ($.kind === "item") {
      if (Ht) {
        Xt.canToggle($.hit.item.id) && Xt.toggle($.hit.item.id);
        return;
      }
      u($.hit.item), h && yn();
      return;
    }
    if ($.kind === "action") {
      const Oe = $.source === "leading" ? L : $.source === "footer" ? oe : N, Ue = Oe == null ? void 0 : Oe[$.actionIndex];
      Ue && Ue.onClick(xe), h && yn();
    }
  }, [yn, h, N, oe, ut, t, L, O, Ht, u, d, xe, Xt, un, Gn]), Pr = ($) => {
    if (Yt.length === 0) return;
    let be = ve;
    if (be < 0 && bt.current) {
      const tt = Yt.find(
        (Bt) => Bt.row.kind === "item" && Bt.row.hit.item.id === bt.current
      );
      tt && (be = tt.index);
    }
    const Oe = Yt.findIndex((tt) => tt.index === be), Ue = Oe < 0 ? 0 : (Oe + $ + Yt.length) % Yt.length;
    Xe(Yt[Ue].index);
  };
  By(Y, () => ({
    moveHighlight: Pr,
    activateHighlighted: () => {
      if (Ct.current) return !1;
      const $ = ve >= 0 ? vt[ve] : void 0;
      return $ ? (rr($), Xe(-1, "keyboard"), !0) : !1;
    },
    close: yn,
    selectAll: () => {
      Ht && Xt.setAll(!0);
    },
    setSelection: ($) => {
      Xt.reset($);
    }
  }), [vt, ve, rr, yn, Ht, Xt]);
  const gi = ($) => {
    if (Ht && ($.metaKey || $.ctrlKey) && $.key.toLowerCase() === "a") {
      $.preventDefault(), $.stopPropagation(), Xt.setAll(!0);
      return;
    }
    if ($.key === "ArrowDown")
      $.preventDefault(), te ? Pr(1) : Sn();
    else if ($.key === "ArrowUp")
      $.preventDefault(), Pr(-1);
    else if (($.key === "ArrowRight" || $.key === "ArrowLeft") && g && te && !xe.trim()) {
      const be = vt[ve];
      if ((be == null ? void 0 : be.kind) === "group") {
        const Oe = Je.has(be.group.key);
        ($.key === "ArrowRight" || Oe) && ($.preventDefault(), un(be.group.key));
      } else if ((be == null ? void 0 : be.kind) === "item" && $.key === "ArrowLeft" && be.hit.item.group) {
        $.preventDefault();
        const Oe = be.hit.item.group;
        Je.has(Oe) && un(Oe);
        const Ue = vt.findIndex((tt) => tt.kind === "group" && tt.group.key === Oe);
        Ue >= 0 && Xe(Ue);
      }
    } else if ($.key === "Enter") {
      $.preventDefault();
      const be = vt[ve] ?? vt[0];
      be && rr(be);
    } else $.key === "Escape" && ($.preventDefault(), yn());
  }, Ur = ($) => {
    n === "expandable" && !_e || (ze($), te || Ae(!0));
  };
  Ge(() => {
    if (S) {
      const be = xe.trim().toLowerCase();
      if (!be) {
        const Ue = T ? Se.findIndex((tt) => tt.kind === "item" && tt.hit.item.id === T) : -1;
        Xe(Ue >= 0 ? ht + Ue : -1);
        return;
      }
      const Oe = Se.findIndex((Ue) => Ue.kind === "item" && Ue.hit.item.label.toLowerCase().includes(be));
      Xe(Oe >= 0 ? ht + Oe : -1);
      return;
    }
    if (Qe) {
      const be = xe.trim().toLowerCase();
      if (!!be && t.some((Ue) => Ue.id.toLowerCase() === be || Ue.label.toLowerCase() === be)) {
        Xe(-1);
        return;
      }
      if (!Ht) {
        const Ue = Se.findIndex((tt) => tt.kind === "item" && tt.hit.item.tone !== "create");
        if (Ue >= 0) {
          Xe(ht + Ue);
          return;
        }
      }
    }
    const $ = Se.findIndex((be) => be.kind === "item");
    Xe($ >= 0 ? ht + $ : ht);
  }, [xe]), Ge(() => {
    if (!te || xe.trim()) return;
    const $ = T ? Se.findIndex((be) => be.kind === "item" && be.hit.item.id === T) : -1;
    Xe($ >= 0 ? ht + $ : Q ? ht : -1);
  }, [te]), Nn(() => {
    te && zn.current();
  }, [te]);
  const Qn = ($) => /* @__PURE__ */ pe("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
    F == null ? void 0 : F.map((be) => /* @__PURE__ */ _(
      "button",
      {
        type: "button",
        "aria-label": be.label,
        title: be.label,
        tabIndex: _e ? 0 : -1,
        onMouseDown: (Oe) => Oe.preventDefault(),
        onClick: () => {
          be.onClick(xe, { close: yn }), be.keepOpen || yn();
        },
        style: { width: de.box, height: de.box },
        className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
        "data-search-field-action": be.key,
        children: /* @__PURE__ */ _(
          "span",
          {
            style: { width: de.icon, height: de.icon },
            className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
            children: be.icon
          }
        )
      },
      be.key
    )),
    xe && /* @__PURE__ */ _(
      "button",
      {
        type: "button",
        "aria-label": "Clear search",
        tabIndex: _e ? 0 : -1,
        onPointerDown: (be) => be.preventDefault(),
        onClick: $,
        style: { width: de.box, height: de.box },
        className: "ui-icon-btn flex items-center justify-center rounded",
        children: /* @__PURE__ */ _(eo, { size: de.icon })
      }
    )
  ] }), kr = /* @__PURE__ */ pe("div", { className: "relative w-full", children: [
    /* @__PURE__ */ _(Io, { size: de.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ _(
      "input",
      {
        ref: pt,
        value: xe,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": te,
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
        style: { paddingRight: K },
        className: `${Ha("sm")} w-full pl-8`
      }
    ),
    Qn(() => {
      ze(""), te || Sn();
    })
  ] }), mi = /* @__PURE__ */ pe("div", { className: "absolute inset-0", children: [
    /* @__PURE__ */ _(Io, { size: de.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ _(
      "input",
      {
        ref: pt,
        value: xe,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": te,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: ($) => Ur($.target.value),
        onFocus: () => {
          p && _e && Sn();
        },
        onClick: () => {
          p && _e && Sn();
        },
        onKeyDown: gi,
        placeholder: a,
        tabIndex: _e ? 0 : -1,
        style: { paddingRight: K },
        className: `${Ha("sm")} h-full w-full pl-8`
      }
    ),
    Qn(() => {
      ze(""), !te && _e && Sn();
    })
  ] });
  Ge(() => {
    if (!te || Ct.current) return;
    const $ = It.current;
    hi(
      $ == null ? void 0 : $.querySelector(`[data-search-row="${ve}"]`),
      "nearest",
      ($ == null ? void 0 : $.querySelector("[data-search-scroller]")) ?? null
    );
  }, [te, ve]);
  const Gr = V(Se);
  Gr.current = Se;
  const ir = V(T);
  ir.current = T;
  const Re = V(O == null ? void 0 : O.selectedIds);
  Re.current = O == null ? void 0 : O.selectedIds, Nn(() => {
    if (!te || !Yn.current) return;
    const $ = It.current;
    if (!$) return;
    const be = T;
    if (!be) {
      Yn.current = !1;
      return;
    }
    const Oe = Se.findIndex((tt) => tt.kind === "item" && tt.hit.item.id === be);
    if (Oe < 0) {
      Yn.current = !1;
      return;
    }
    const Ue = $.querySelector(`[data-search-row="${Oe}"]`);
    Ue && (hi(Ue, "center", $.querySelector("[data-search-scroller]") ?? null), Yn.current = !1);
  }, [te, Je, Se, T]);
  const Ze = ib({
    open: te,
    block: "center",
    ready: G.ready,
    scroller: () => {
      var $;
      return (($ = It.current) == null ? void 0 : $.querySelector("[data-search-scroller]")) ?? null;
    },
    row: () => {
      var Oe;
      let $ = -1;
      const be = ir.current;
      if (be)
        $ = Gr.current.findIndex((Ue) => Ue.kind === "item" && Ue.hit.item.id === be);
      else {
        const Ue = Re.current;
        if (Ue && Ue.length) {
          const tt = new Set(Ue);
          $ = Gr.current.findIndex((Bt) => Bt.kind === "item" && tt.has(Bt.hit.item.id));
        }
      }
      return $ < 0 ? null : ((Oe = It.current) == null ? void 0 : Oe.querySelector(`[data-search-row="${$}"]`)) ?? null;
    }
  }), At = ($, be) => {
    const Oe = ve === be, Ue = !Ht && T !== void 0 && $.hit.item.id === T, tt = Ht ? Xt.isSelected($.hit.item.id) : Ue, Bt = !!$.hit.item.disabled || Ht && !Xt.canToggle($.hit.item.id), Wn = $.hit.item.tone === "create" ? k === "light" ? { background: Oe ? "#d1fae5" : "#ecfdf5", color: Oe ? "#065f46" : "#047857" } : { background: Oe ? "rgba(6, 95, 70, 0.7)" : "rgba(6, 78, 59, 0.4)", color: Oe ? "#d1fae5" : "#6ee7b7" } : void 0;
    return /* @__PURE__ */ pe(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": tt,
        tabIndex: -1,
        "data-search-item": $.hit.item.id,
        "data-search-row": be,
        "data-search-create": $.hit.item.tone === "create" ? "" : void 0,
        onMouseDown: (jn) => jn.preventDefault(),
        onMouseEnter: () => Xe(be, "pointer"),
        onClick: () => rr($),
        style: { ...kn, ...$.hit.item.rowStyle, ...Wn },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${zt.itemDefault} ${$.hit.item.rowClassName ?? ""} ${Ue ? "ui-item-selected" : ""} ${Oe ? "ui-item-highlighted" : ""} ${Bt ? "opacity-30 pointer-events-none" : ""}`,
        children: [
          Ht && $.hit.item.checkable !== !1 && /* @__PURE__ */ _(Fa, { checked: tt, disabled: Bt, indicator: O == null ? void 0 : O.indicator }),
          Z ? /* @__PURE__ */ _("span", { className: "flex min-w-0 flex-1 items-center gap-2", children: Z($.hit.item, { checked: tt, disabled: Bt }) }) : /* @__PURE__ */ pe(Dn, { children: [
            $.hit.item.icon && /* @__PURE__ */ _("span", { className: `${zt.icon} shrink-0`, children: $.hit.item.icon }),
            /* @__PURE__ */ _("span", { className: "flex-1 truncate", children: $.hit.item.label }),
            ($.hit.detail || $.hit.item.detail) && /* @__PURE__ */ _("span", { className: "shrink-0 max-w-[55%] truncate text-[10px] text-zinc-400", children: $.hit.detail || $.hit.item.detail }),
            Ue && /* @__PURE__ */ _(zs, { className: "ui-icon w-3.5 h-3.5 shrink-0", "aria-hidden": !0 })
          ] })
        ]
      },
      `item:${$.hit.item.id}`
    );
  }, bn = ($, be) => {
    var fo;
    const Oe = Je.has($.group.key), Ue = g && !xe.trim(), tt = ut, Bt = tt && ve === be, Wn = Ht ? t.filter((tn) => tn.group === $.group.key && Gn.has(tn.id) && tn.checkable !== !1) : [], jn = Wn.filter((tn) => !Xt.isDisabled(tn.id)).map((tn) => tn.id), hr = Ht ? (fo = O == null ? void 0 : O.groupToken) == null ? void 0 : fo.call(O, $.group.key) : void 0, yi = !!hr && Xt.isSelected(hr), xt = yi ? "all" : jn.length > 0 ? Xt.groupState(jn) : "none", Li = yi ? Wn.length : Wn.reduce((tn, Fi) => tn + (Xt.isSelected(Fi.id) ? 1 : 0), 0), $i = Ht && /* @__PURE__ */ _(
      "button",
      {
        type: "button",
        tabIndex: -1,
        "aria-label": `Select all ${$.group.label}`,
        onMouseDown: (tn) => tn.preventDefault(),
        onClick: (tn) => {
          tn.stopPropagation(), hr ? Xt.toggle(hr) : jn.length && Xt.toggleGroup(jn);
        },
        className: `shrink-0 flex items-center justify-center rounded ${hr || jn.length ? "cursor-pointer" : "cursor-not-allowed"}`,
        children: /* @__PURE__ */ _(
          Fa,
          {
            checked: xt === "all",
            indeterminate: xt === "some",
            disabled: !hr && jn.length === 0,
            indicator: O == null ? void 0 : O.indicator
          }
        )
      }
    ), or = Ht ? /* @__PURE__ */ pe("span", { className: `shrink-0 tabular-nums text-[10px] ${tt ? "text-[color:var(--ui-text-faint)]" : "opacity-70"}`, children: [
      Li,
      "/",
      Wn.length
    ] }) : $.group.count !== void 0 && /* @__PURE__ */ _("span", { className: `shrink-0 tabular-nums ${tt ? "text-[10px] text-[color:var(--ui-text-faint)]" : "opacity-70"}`, children: $.group.count });
    return tt ? /* @__PURE__ */ pe(
      "div",
      {
        role: "option",
        "aria-selected": !1,
        "aria-expanded": Ue ? Oe : void 0,
        "data-search-group": $.group.key,
        onMouseDown: (tn) => tn.preventDefault(),
        onMouseEnter: () => Xe(be, "pointer"),
        onClick: () => {
          Ue && un($.group.key);
        },
        style: kn,
        className: `w-full rounded flex items-center gap-1 outline-none select-none font-medium ${zt.itemDefault} ${Bt ? "ui-item-highlighted" : ""}`,
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
                $.group.icon && /* @__PURE__ */ _("span", { className: `${zt.icon} shrink-0`, children: $.group.icon }),
                /* @__PURE__ */ _("span", { className: "truncate", children: $.group.label })
              ]
            }
          ),
          /* @__PURE__ */ _("span", { className: "min-w-0 flex-1" }),
          or,
          Ue && /* @__PURE__ */ _(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `${Oe ? "Collapse" : "Expand"} ${$.group.label}`,
              "aria-expanded": Oe,
              onMouseDown: (tn) => tn.preventDefault(),
              onClick: (tn) => {
                tn.stopPropagation(), un($.group.key);
              },
              style: { width: de.box, height: de.box },
              className: "shrink-0 flex cursor-pointer items-center justify-center rounded text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text)]",
              children: /* @__PURE__ */ _(
                ci,
                {
                  size: de.icon,
                  className: `transition-transform duration-200 ${Oe ? "rotate-180" : ""}`
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
        "data-search-row": be,
        style: on,
        className: "w-full flex items-center gap-2 select-none font-semibold uppercase tracking-wider ui-label",
        children: [
          $i,
          $.group.icon && /* @__PURE__ */ _("span", { className: `${zt.icon} shrink-0`, children: $.group.icon }),
          /* @__PURE__ */ _("span", { className: "flex-1 truncate", children: $.group.label }),
          or
        ]
      },
      `group:${$.group.key}`
    );
  }, Jt = ($, be) => {
    var tt;
    const Oe = ve === be, Ue = $.source === "leading" ? L : $.source === "footer" ? oe : N;
    return /* @__PURE__ */ pe(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": !1,
        tabIndex: -1,
        "data-search-action": $.source || "empty",
        "data-search-row": be,
        onMouseDown: (Bt) => Bt.preventDefault(),
        onMouseEnter: () => Xe(be, "pointer"),
        onClick: () => rr($),
        style: kn,
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${zt.itemDefault} ${Oe ? "ui-item-highlighted" : ""}`,
        children: [
          /* @__PURE__ */ _("span", { className: `${zt.icon} shrink-0`, children: ((tt = Ue == null ? void 0 : Ue[$.actionIndex]) == null ? void 0 : tt.icon) || /* @__PURE__ */ _(ol, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ _("span", { className: "flex-1 truncate", children: $.label })
        ]
      },
      `${$.source || "empty"}:${$.actionIndex}`
    );
  }, Zt = () => /* @__PURE__ */ _("div", { className: "px-3 py-3 text-center", "data-search-empty": !0, children: M ? M({ query: xe, close: yn }) : /* @__PURE__ */ pe(Dn, { children: [
    /* @__PURE__ */ _("div", { className: "mx-auto mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-400", children: /* @__PURE__ */ _(Io, { className: "w-3.5 h-3.5" }) }),
    /* @__PURE__ */ _("div", { className: "text-xs font-medium text-zinc-500", children: E || `No matches for “${xe.trim()}”` }),
    /* @__PURE__ */ _("div", { className: "mt-0.5 text-[10px] text-zinc-400", children: I || "Try a name, phone number, board ID or category." })
  ] }) }, "__empty"), In = [];
  for (let $ = 0; $ < Se.length; $++) {
    const be = Se[$];
    if (be.kind === "group") {
      const Oe = [];
      let Ue = $ + 1;
      for (; Ue < Se.length && Se[Ue].kind === "item" && Se[Ue].hit.item.group === be.group.key; )
        Oe.push({ row: Se[Ue], index: Ue }), Ue++;
      In.push({ group: be, index: $, items: Oe }), $ = Ue - 1;
    } else be.kind === "item" ? In.push({ row: be, index: $ }) : In.push({ row: be, index: $ });
  }
  const Yr = te || Kt ? sl(
    /* @__PURE__ */ pe(
      "div",
      {
        ref: ee,
        id: "search-menu-panel",
        "data-theme": k,
        role: "listbox",
        "aria-label": a,
        "aria-multiselectable": Ht ? !0 : void 0,
        onPointerEnter: Ze.engage,
        onPointerDown: ($) => {
          $.stopPropagation(), Ze.engage();
        },
        onMouseDown: ($) => $.stopPropagation(),
        onClick: ($) => $.stopPropagation(),
        onPointerLeave: () => {
          Ct.current && Xe(-1, "pointer");
        },
        className: "click-outside-ignore ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none min-w-0 overflow-hidden pointer-events-auto",
        style: {
          position: "fixed",
          left: G.left,
          top: G.top,
          width: D ?? (n === "expandable" ? C : Ie || void 0),
          minWidth: P,
          maxHeight: G.maxH,
          visibility: G.ready ? "visible" : "hidden"
        },
        children: [
          ct && /* @__PURE__ */ pe("div", { className: "shrink-0 pb-1", children: [
            Ke.map(($, be) => Jt($, be)),
            Se.length > 0 && /* @__PURE__ */ _("div", { className: zt.separator })
          ] }),
          /* @__PURE__ */ pe("div", { "data-search-scroller": !0, className: "overflow-y-auto scrollbar-custom flex flex-col min-h-0", children: [
            Se.length === 0 && /* @__PURE__ */ _("div", { className: "px-3 py-3 text-xs text-zinc-400", "data-search-empty": !0, children: M ? M({ query: xe, close: yn }) : /* @__PURE__ */ _(Dn, { children: "Type to search…" }) }),
            In.map(($) => {
              if ($.group) {
                const Ue = Je.has($.group.group.key), tt = $.items || [];
                return /* @__PURE__ */ pe(Mt.Fragment, { children: [
                  bn($.group, ht + $.index),
                  xr && /* @__PURE__ */ _(
                    "div",
                    {
                      "data-search-group-items": $.group.group.key,
                      "aria-hidden": !Ue,
                      className: "motion-reduce:transition-none",
                      style: {
                        display: "grid",
                        gridTemplateRows: Ue ? "1fr" : "0fr",
                        opacity: Ue ? 1 : 0,
                        transition: "grid-template-rows 220ms cubic-bezier(0.32, 0.72, 0, 1), opacity 150ms ease"
                      },
                      children: /* @__PURE__ */ _("div", { className: "overflow-hidden flex flex-col", children: tt.map((Bt) => At(Bt.row, ht + Bt.index)) })
                    }
                  ),
                  !xr && tt.map((Bt) => At(Bt.row, ht + Bt.index))
                ] }, `group:${$.group.group.key}`);
              }
              const be = $.row, Oe = ht + $.index;
              return be.kind === "empty" ? Zt() : be.kind === "action" ? Jt(be, Oe) : be.kind === "item" ? At(be, Oe) : null;
            })
          ] }),
          gt.length > 0 && /* @__PURE__ */ pe("div", { className: "shrink-0", children: [
            /* @__PURE__ */ _("div", { className: zt.separator }),
            gt.map(($, be) => Jt($, ht + Se.length + be))
          ] }),
          Ht && (O == null ? void 0 : O.footer) !== !1 && /* @__PURE__ */ _(
            cb,
            {
              count: Xt.count,
              max: O == null ? void 0 : O.max,
              hiddenCount: (O == null ? void 0 : O.hiddenNote) === !1 ? 0 : Xt.hiddenCount,
              clear: (O == null ? void 0 : O.clear) !== !1,
              theme: k,
              onClear: Xt.clear,
              hero: (O == null ? void 0 : O.mode) === "live" ? void 0 : {
                label: dr,
                onClick: () => {
                  Xt.commit(), yn();
                },
                disabled: Xt.count === 0
              }
            }
          )
        ]
      }
    ),
    q ?? Nt ?? (wt == null ? void 0 : wt.body) ?? document.body
  ) : null;
  return U ? /* @__PURE__ */ pe(Dn, { children: [
    /* @__PURE__ */ _("div", { ref: Rt, "data-search-menu": !0, "data-mode": "hidden", className: "hidden", "aria-hidden": !0 }),
    Yr
  ] }) : n === "inline" ? /* @__PURE__ */ pe("div", { ref: Rt, "data-search-menu": !0, "data-mode": n, className: "relative inline-flex", style: { width: "100%" }, children: [
    kr,
    Yr
  ] }) : /* @__PURE__ */ _(
    ih,
    {
      expanded: _e,
      collapsedWidth: v,
      expandedWidth: C,
      rootRef: Rt,
      "data-search-menu": !0,
      "data-mode": n,
      trigger: ie ? ie({ open: te, expanded: _e, toggle: Sn }) : /* @__PURE__ */ _(
        cr,
        {
          ref: ft,
          type: "button",
          variant: o,
          size: "minimal",
          theme: k === "dark" ? "dark" : "light",
          icon: i === void 0 ? /* @__PURE__ */ _(Io, { className: "w-3.5 h-3.5" }) : i,
          onClick: Sn,
          className: `w-full justify-start ${_e ? "pointer-events-none" : ""} ${s ?? ""}`,
          tabIndex: _e ? -1 : 0,
          "data-search-trigger": !0,
          children: /* @__PURE__ */ _("span", { className: "min-w-0 truncate", children: r })
        }
      ),
      field: /* @__PURE__ */ pe(Dn, { children: [
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
  placeholder: m = "Select…",
  readOnly: y = !1,
  inputReadOnly: b = !1,
  disabled: T = !1,
  autoFocus: A = !1,
  defaultOpen: v = !1,
  selectAllOnOpen: C = !0,
  uppercase: D = !1,
  allowFreeText: P = !0,
  theme: S,
  className: z = "",
  style: k,
  panelWidth: x,
  panelMinWidth: E,
  initialQuery: I,
  keepAllRows: M = !1,
  maxMenuHeight: N,
  portalTarget: L,
  autoGrow: W = !1,
  skipComma: oe = !1,
  collapsedWidth: F = 140,
  expandedWidth: O = 280,
  createLabel: ne,
  onCreateItem: j,
  onExit: U,
  onEscape: re,
  onTabExit: q,
  loadItems: ie,
  emptyTitle: Z,
  emptyHint: Q,
  sortItems: Y,
  max: ce,
  disabledIds: fe,
  indicator: Ee,
  browse: xe,
  groupToken: ze
}) {
  const Qe = vr(), dt = S ?? (Qe == null ? void 0 : Qe.mode) ?? "light", et = gn(), te = Ne((Re) => Zi(Re, i), [i]), Ae = pn(() => n.map(te), [n, te]), _e = pn(() => new Map(n.map((Re) => [te(Re), Re])), [n, te]), We = Ne((Re) => Dv(Re, n, i), [n, i]), He = pn(() => new Set([...p ?? []].map((Re) => Re.toLowerCase())), [p]), [Le, Je] = Ye(!1), [yt, ve] = Ye(""), [je, Ct] = Ye(() => {
    const Re = I ?? "";
    return D ? Re.toUpperCase() : Re;
  }), [bt, Xe] = Ye(je), [Rt, pt] = Ye(() => [...t]), [ft, It] = Ye(null), [$t, en] = Ye(!1), wt = V(null), Nt = V(null), zt = V(null), kn = V(null), on = V(null), de = V(t.join("\0")), Me = V(!1), K = V(/* @__PURE__ */ new Set()), G = V(!1), we = V(!1), Ie = V(!1), nt = V(0), Kt = V(""), lt = V([...t]), ee = t.join("\0"), ke = pn(
    () => $p(t, n, i, a, l),
    [t, n, i, a, l]
  ), Se = Ne((Re) => {
    if (c) return c([...Re], n);
    if (o === "single") return Re[0] ? We(Re[0]) : "";
    const Ze = Re.map(We).join(", ");
    return oe ? Ze : Re.length ? `${Ze}, ` : "";
  }, [c, n, o, We, oe]);
  Ge(() => {
    Le || (pt([...t]), lt.current = [...t], de.current = ee);
  }, [ee, Le]);
  const Ke = Ne(() => {
    if (Le || y || T) return;
    Me.current = !1, G.current = !0;
    const Re = Se(t);
    Kt.current = Re, lt.current = [...t], pt([...t]), ve(Re), Xe(je), Ct(""), Je(!0);
  }, [Le, y, T, t, Se, je]);
  Nn(() => {
    if (!Le) return;
    const Re = wt.current ?? Nt.current;
    Re && (Re.focus(), (Re instanceof HTMLInputElement || Re instanceof HTMLTextAreaElement) && (o === "single" && C ? Re.setSelectionRange(0, Re.value.length) : Re.setSelectionRange(Re.value.length, Re.value.length)));
  }, [Le]), Nn(() => {
    if (!Ie.current) return;
    Ie.current = !1;
    const Re = wt.current;
    Re && (Re.focus(), Re.setSelectionRange(Re.value.length, Re.value.length));
  }, [yt]), Ge(() => {
    (v || A) && Ke();
  }, []);
  const gt = o === "single" ? bt : U2(yt), Ot = ie ? ft ?? [] : n, ct = pn(
    () => Y ? Y(Ot, Rt) : Ot,
    [Ot, Y, Rt]
  ), ht = gt.trim(), vt = !!j && P && !$t && !!ht && !X2(ht, Ot, i);
  Ge(() => {
    if (!ie || !Le) return;
    const Re = gt.trim();
    if (!Re) {
      It(null), en(!1);
      return;
    }
    en(!0);
    const Ze = ++nt.current, At = setTimeout(() => {
      ie(Re).then((bn) => {
        nt.current === Ze && (It(bn), en(!1));
      }).catch(() => {
        nt.current === Ze && (It([]), en(!1));
      });
    }, 400);
    return () => clearTimeout(At);
  }, [ie, Le, gt]);
  const ut = pn(() => {
    const Re = ct.filter((Ze) => !Ze.hidden).map((Ze) => ({
      id: te(Ze),
      label: Ze.label,
      group: Ze.group,
      detail: Ze.detail,
      icon: Ze.icon,
      disabled: !!Ze.disabled || !!(fe != null && fe.includes(te(Ze))),
      fields: Ze.fields,
      keywords: Ze.keywords,
      rowClassName: Ze.rowClassName,
      rowStyle: Ze.rowStyle
    }));
    return vt && Re.unshift({
      id: ht,
      label: ne ? ne(ht) : `Add “${ht}”…`,
      keywords: ht,
      checkable: !1,
      tone: "create",
      pinned: !0
    }), Re;
  }, [ct, te, fe, vt, ht, ne]), Yt = Ne((Re) => {
    const Ze = Re.join("\0");
    if (Ze !== de.current) {
      if (Gi(Re, t)) {
        de.current = Ze;
        return;
      }
      if (de.current = Ze, e(Re), j)
        for (const At of V2(Re, n, i))
          K.current.has(At) || (K.current.add(At), j(At));
    }
  }, [t, e, j, n, i]), xr = Ne((Re, Ze) => {
    !Ze || !j || !P || n.some((At) => te(At) === Re) || K.current.has(Re) || (K.current.add(Re), j(Re));
  }, [j, P, n, te]), Ht = Ne((Re = !0) => {
    if (!G.current || (G.current = !1, y || T)) return;
    if (Me.current) {
      Me.current = !1;
      return;
    }
    const Ze = Kt.current, At = new Set(Ae), bn = o === "single" ? (() => {
      const Jt = Ze.trim();
      if (!Jt) return P ? [] : t;
      const Zt = oh(Jt, n, i);
      return !P && !At.has(Zt) ? t : [Zt];
    })() : Mr(
      G2(Ze, n, i).filter((Jt) => P || At.has(Jt)),
      Ae
    );
    lt.current = bn, pt(bn), Xe(""), Je(!1), Yt(bn), Re && !we.current && (U == null || U());
  }, [y, T, o, n, i, Ae, P, t, Yt, U]), mn = Ne((Re) => {
    Je(Re), Re || Ht();
  }, [Ht]), On = Ne(() => {
    Me.current = !0, G.current = !1;
    const Re = Se(t);
    Kt.current = Re, lt.current = [...t], pt([...t]), ve(Re), Xe(""), Je(!1), re == null || re();
  }, [t, Se, re]);
  Ge(() => {
    var bn;
    if (!Le) return;
    const Ze = (((bn = zt.current) == null ? void 0 : bn.ownerDocument) ?? document).defaultView;
    if (!Ze) return;
    const At = (Jt) => {
      Jt.key === "Escape" && (Jt.preventDefault(), Jt.stopImmediatePropagation(), On());
    };
    return Ze.addEventListener("keydown", At, !0), () => Ze.removeEventListener("keydown", At, !0);
  }, [Le, On]);
  const Gn = Ne((Re) => {
    const Ze = Mr(Re, Ae), At = Se(Ze);
    lt.current = Ze, Kt.current = At, pt(Ze), Ie.current = !0, ve(At);
  }, [Ae, Se]), Xt = Ne((Re) => {
    const Ze = Re.id;
    G.current = !1;
    const At = We(Ze);
    lt.current = [Ze], Kt.current = At, pt([Ze]), ve(At), Xe(""), Je(!1), Yt([Ze]), we.current || U == null || U();
  }, [We, Yt, U]), zn = (Re) => {
    var Ze, At, bn, Jt, Zt;
    if (Re.key === "Escape") {
      Re.preventDefault(), On();
      return;
    }
    if (Re.key === "Tab") {
      if (Re.preventDefault(), o === "single" && Le) {
        we.current = !0;
        const In = (Ze = on.current) == null ? void 0 : Ze.activateHighlighted();
        if (we.current = !1, In) {
          (At = q ?? U) == null || At(wt.current ?? void 0);
          return;
        }
      }
      Le && Ht(!1), (bn = q ?? U) == null || bn(wt.current ?? void 0);
      return;
    }
    if (Re.key === "ArrowDown" || Re.key === "ArrowUp") {
      if (Re.preventDefault(), !Le) {
        Ke();
        return;
      }
      (Jt = on.current) == null || Jt.moveHighlight(Re.key === "ArrowDown" ? 1 : -1);
      return;
    }
    if (Re.key === "Enter") {
      if (Re.preventDefault(), Re.stopPropagation(), Le && ((Zt = on.current) != null && Zt.activateHighlighted())) return;
      Ht();
      return;
    }
  }, dr = (Re) => {
    var At;
    const Ze = D ? Re.target.value.toUpperCase() : Re.target.value;
    if (Kt.current = Ze, ve(Ze), o === "single" && Xe(Ze), Le || (G.current = !0, Me.current = !1, Je(!0)), o === "multiple") {
      const bn = Mr(Y2(Ze, n, i), Ae);
      lt.current = bn, pt(bn), (At = on.current) == null || At.setSelection(bn);
    }
  }, yn = () => {
    if (G.current) {
      if (Me.current) {
        Me.current = !1;
        return;
      }
      Ht();
    }
  }, fr = Ne((Re, Ze) => {
    const At = _e.get(Re.id);
    if (!At)
      return /* @__PURE__ */ pe(Dn, { children: [
        /* @__PURE__ */ _(ol, { className: "h-3.5 w-3.5 shrink-0" }),
        /* @__PURE__ */ _("span", { className: "flex-1 truncate", children: Re.label })
      ] });
    const bn = !!p && (i === "label" ? He.has(At.label.toLowerCase()) : p.has(te(At))), Jt = (f == null ? void 0 : f(At)) ?? At.badge ?? null;
    return /* @__PURE__ */ pe(Dn, { children: [
      d ? d(At, Ze.checked) : /* @__PURE__ */ pe(Dn, { children: [
        At.icon && /* @__PURE__ */ _("span", { className: "shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5", children: At.icon }),
        /* @__PURE__ */ _("span", { className: "flex-1 truncate", children: At.label }),
        Jt && /* @__PURE__ */ _("span", { className: "shrink-0 text-[10px] text-[color:var(--ui-text-faint)]", children: Jt }),
        h == null ? void 0 : h(At)
      ] }),
      bn && /* @__PURE__ */ _("span", { className: "shrink-0 inline-flex", title: g, "aria-label": g, children: /* @__PURE__ */ _(Uw, { className: "h-3.5 w-3.5 text-amber-500" }) })
    ] });
  }, [_e, p, He, i, te, f, d, h, g]), Yn = /* @__PURE__ */ _(
    j2,
    {
      ref: on,
      mode: "inline",
      hideTrigger: !0,
      open: Le,
      onOpenChange: mn,
      anchorRef: s === "morph" ? kn : zt,
      items: ut,
      groups: r,
      query: gt,
      onSelect: Xt,
      closeOnSelect: o === "single",
      selectedId: o === "single" ? Rt[0] : void 0,
      multiple: o === "multiple" ? {
        selectedIds: Rt,
        mode: "live",
        onDraftChange: Gn,
        onToggle: xr,
        onCommit: J2,
        max: ce,
        disabledIds: fe,
        indicator: Ee,
        groupToken: ze
      } : void 0,
      openOnFocus: !1,
      autoFocus: !1,
      highlightOnOpen: o === "single",
      browseAll: r.length === 0,
      browseExpanded: r.length > 0 && (xe ?? "open") === "open",
      expandableGroups: r.length > 0 && xe === "accordion",
      groupExpandMode: "single",
      renderItem: fr,
      emptyTitle: $t ? "Searching…" : Z,
      emptyHint: $t ? "Fetching matching records." : Q,
      theme: dt,
      panelWidth: x,
      panelMinWidth: E,
      keepAllRows: M,
      maxMenuHeight: N,
      portalTarget: L
    }
  ), un = s === "chip", Sn = s === "wrap", rr = !un && !Sn && W, Pr = !Le && !ke, gi = Le ? yt : ke, Ur = {
    ref: wt,
    /* Chip: the INPUT holds the committed keys (cast reads "1") while the
       overlay renders the resolved face ("1. GEORGE") — the old
       EntityDropdown's transparent-input contract. */
    value: Le ? yt : un ? t.join(", ") : ke,
    disabled: T,
    readOnly: b,
    placeholder: "",
    onFocus: Ke,
    onClick: Ke,
    onChange: dr,
    onBlur: yn,
    onKeyDown: zn,
    autoComplete: "off",
    spellCheck: !1
  }, Qn = Te(5, 7, et), kr = Te(9, 12, et), mi = Te(12, 14, et);
  if (s === "button") {
    const Re = (Jt) => zn(Jt), Ze = Le ? Rt : t, At = $p(Ze, n, i, a, l), bn = !At;
    return /* @__PURE__ */ pe(
      "div",
      {
        ref: zt,
        "data-picker-field": !0,
        className: `relative ${z}`,
        style: k,
        onMouseDown: (Jt) => Jt.stopPropagation(),
        onContextMenu: (Jt) => {
          Jt.preventDefault(), Jt.stopPropagation();
        },
        children: [
          u ? /* @__PURE__ */ _("span", { className: "pointer-events-none flex w-full min-w-0 items-center", children: u({ values: [...Ze], items: n, display: At, open: Le, toggle: Ke }) }) : /* @__PURE__ */ pe(
            cr,
            {
              ref: Nt,
              variant: "outline",
              theme: dt === "dark" ? "dark" : "light",
              disabled: T,
              onClick: y ? void 0 : () => Le ? Ht() : Ke(),
              onKeyDown: Re,
              "data-state": Le ? "open" : "closed",
              "aria-haspopup": "listbox",
              "aria-expanded": Le,
              className: "w-full justify-between gap-2",
              children: [
                a === "chips" && Ze.length > 0 ? /* @__PURE__ */ _("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1 overflow-hidden", children: Ze.map((Jt) => /* @__PURE__ */ _(
                  "span",
                  {
                    className: "inline-flex items-center rounded border border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-1.5 py-0.5 text-[10px] text-[color:var(--ui-text)]",
                    children: We(Jt)
                  },
                  Jt
                )) }) : /* @__PURE__ */ _("span", { className: `min-w-0 flex-1 truncate text-left ${bn ? "italic text-[color:var(--ui-text-faint)]" : ""}`, children: At || m }),
                /* @__PURE__ */ _(ci, { className: "h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" })
              ]
            }
          ),
          Yn
        ]
      }
    );
  }
  if (s === "morph")
    return /* @__PURE__ */ _(
      ih,
      {
        expanded: Le,
        collapsedWidth: F,
        expandedWidth: O,
        rootRef: zt,
        "data-picker-field": !0,
        className: z,
        style: k,
        trigger: u ? u({ values: [...t], items: n, display: ke, open: Le, toggle: Ke }) : (
          /* The collapsed face IS the chip: one trigger recipe for both
             faces, so a morph picker matches every other value field. */
          /* @__PURE__ */ pe(
            "button",
            {
              type: "button",
              disabled: T,
              onClick: Ke,
              className: "ui-press flex w-full cursor-pointer select-none items-center justify-between gap-2 rounded-[var(--ui-radius-btn)] border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left outline-none transition-colors hover:border-[color:var(--ui-input-focus-border)] disabled:cursor-default disabled:opacity-50",
              style: { padding: `${Qn}px ${kr}px`, fontSize: mi },
              children: [
                /* @__PURE__ */ _("span", { className: `min-w-0 flex-1 truncate ${Pr ? "italic text-[color:var(--ui-text-muted)]" : ""}`, children: ke || m }),
                /* @__PURE__ */ _(ci, { className: "pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" })
              ]
            }
          )
        ),
        field: /* @__PURE__ */ pe("div", { ref: kn, className: "relative h-full", children: [
          /* @__PURE__ */ _(
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
  const Gr = un ? Te(5, 7, et) : 0, ir = un ? Te(9, 12, et) : 0;
  return y ? /* @__PURE__ */ _(
    "div",
    {
      ref: zt,
      "data-picker-field": !0,
      className: `relative ${un ? "flex w-full items-center gap-1.5 rounded border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left" : Sn ? "min-h-[1lh] w-full pb-[1lh]" : "h-[1lh] w-full"} ${z}`,
      style: un ? { padding: `${Gr}px ${ir}px`, fontSize: Te(12, 14, et), ...k } : k,
      children: /* @__PURE__ */ _(
        "input",
        {
          readOnly: !0,
          tabIndex: -1,
          value: ke,
          className: un ? "w-full min-w-0 bg-transparent outline-none" : "absolute inset-0 h-full w-full bg-transparent text-inherit outline-none",
          style: { color: "inherit", caretColor: "transparent" }
        }
      )
    }
  ) : /* @__PURE__ */ pe(
    "div",
    {
      ref: zt,
      "data-picker-field": !0,
      className: `relative ${un ? "ui-press flex w-full items-center gap-1.5 rounded-[var(--ui-radius-btn)] border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left outline-none focus-within:border-[color:var(--ui-input-focus-border)]" : Sn ? "min-h-[1lh] w-full pb-[1lh]" : rr ? "w-max max-w-[400px] min-w-[72px]" : "h-[1lh] w-full"} ${z}`,
      style: un ? { padding: `${Gr}px ${ir}px`, fontSize: mi, ...k } : k,
      onMouseDown: (Re) => Re.stopPropagation(),
      onContextMenu: (Re) => {
        Re.preventDefault(), Re.stopPropagation();
      },
      onAuxClick: Ke,
      children: [
        un && u ? /* @__PURE__ */ _("span", { className: "pointer-events-none flex min-w-0 flex-1 items-center", children: u({ values: [...t], items: n, display: ke, open: Le, toggle: Ke }) }) : a === "chips" && !Le ? /* @__PURE__ */ pe("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1", children: [
          t.map((Re) => /* @__PURE__ */ _(
            "span",
            {
              className: "inline-flex items-center rounded border border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-1.5 py-0.5 text-[10px] text-[color:var(--ui-text)]",
              children: We(Re)
            },
            Re
          )),
          t.length === 0 && /* @__PURE__ */ _("span", { className: "italic text-[color:var(--ui-text-muted)]", children: m })
        ] }) : /* @__PURE__ */ _(
          "span",
          {
            className: `pointer-events-none text-left ${un ? "min-w-0 flex-1 truncate" : Sn ? "block whitespace-pre-wrap break-words leading-relaxed" : "absolute inset-y-0 inset-x-0 flex items-center truncate whitespace-nowrap"} ${Pr ? "italic text-[color:var(--ui-text-muted)]" : ""}`,
            children: gi || m
          }
        ),
        Sn ? /* @__PURE__ */ _(
          "textarea",
          {
            ...Ur,
            rows: 1,
            className: "absolute inset-0 h-full w-full resize-none overflow-hidden whitespace-pre-wrap break-words bg-transparent text-transparent outline-none",
            style: { caretColor: "#2563eb", color: "transparent" }
          }
        ) : /* @__PURE__ */ _(
          "input",
          {
            ...Ur,
            className: rr ? "block w-full bg-transparent text-transparent outline-none" : "absolute inset-0 h-full w-full bg-transparent text-transparent outline-none",
            style: rr ? { fieldSizing: "content", width: "auto", minWidth: 72, maxWidth: 400, caretColor: "#2563eb", color: "transparent" } : un ? { caretColor: "#2563eb", color: "transparent", paddingLeft: ir, paddingRight: ir + 16 } : { caretColor: "#2563eb", color: "transparent" }
          }
        ),
        un && /* @__PURE__ */ _(ci, { className: "pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" }),
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
var Fe;
(function(t) {
  t.Uri = "uri", t.Text = "text", t.Image = "image", t.RowID = "row-id", t.Number = "number", t.Bubble = "bubble", t.Boolean = "boolean", t.Loading = "loading", t.Markdown = "markdown", t.Drilldown = "drilldown", t.Protected = "protected", t.Custom = "custom";
})(Fe || (Fe = {}));
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
  return !(t.kind === Fe.Loading || t.kind === Fe.Bubble || t.kind === Fe.RowID || t.kind === Fe.Protected || t.kind === Fe.Drilldown);
}
function _o(t) {
  return t.kind === Ir.Marker || t.kind === Ir.NewRow;
}
function Eo(t) {
  if (!To(t) || t.kind === Fe.Image)
    return !1;
  switch (t.kind) {
    case Fe.Text:
    case Fe.Number:
    case Fe.Markdown:
    case Fe.Uri:
    case Fe.Custom:
    case Fe.Boolean:
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
    Ve(this, "items");
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
Ve(lr, "create", (e) => new lr(ou(e))), Ve(lr, "empty", () => Kg ?? (Kg = new lr([]))), Ve(lr, "fromSingleSelection", (e) => lr.empty().add(e)), Ve(lr, "fromArray", (e) => {
  if (e.length === 0)
    return lr.empty();
  const n = e.map((i) => [i, i + 1]), r = ou(n);
  return new lr(r);
});
let nn = lr;
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
          const m = d[g], y = m[0], b = m[1] || "", T = typeof y == "function" ? y(o) : y;
          BR(T, n.name), f[`--${g}`] = `${T}${b}`;
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
var au = {}, es = {}, wa = {}, xa = {}, ka = { exports: {} }, Sa = { exports: {} }, ln = {};
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
  if (Yg) return ln;
  Yg = 1;
  var t = typeof Symbol == "function" && Symbol.for, e = t ? Symbol.for("react.element") : 60103, n = t ? Symbol.for("react.portal") : 60106, r = t ? Symbol.for("react.fragment") : 60107, i = t ? Symbol.for("react.strict_mode") : 60108, o = t ? Symbol.for("react.profiler") : 60114, s = t ? Symbol.for("react.provider") : 60109, a = t ? Symbol.for("react.context") : 60110, l = t ? Symbol.for("react.async_mode") : 60111, c = t ? Symbol.for("react.concurrent_mode") : 60111, u = t ? Symbol.for("react.forward_ref") : 60112, d = t ? Symbol.for("react.suspense") : 60113, f = t ? Symbol.for("react.suspense_list") : 60120, h = t ? Symbol.for("react.memo") : 60115, p = t ? Symbol.for("react.lazy") : 60116, g = t ? Symbol.for("react.block") : 60121, m = t ? Symbol.for("react.fundamental") : 60117, y = t ? Symbol.for("react.responder") : 60118, b = t ? Symbol.for("react.scope") : 60119;
  function T(v) {
    if (typeof v == "object" && v !== null) {
      var C = v.$$typeof;
      switch (C) {
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
                  return C;
              }
          }
        case n:
          return C;
      }
    }
  }
  function A(v) {
    return T(v) === c;
  }
  return ln.AsyncMode = l, ln.ConcurrentMode = c, ln.ContextConsumer = a, ln.ContextProvider = s, ln.Element = e, ln.ForwardRef = u, ln.Fragment = r, ln.Lazy = p, ln.Memo = h, ln.Portal = n, ln.Profiler = o, ln.StrictMode = i, ln.Suspense = d, ln.isAsyncMode = function(v) {
    return A(v) || T(v) === l;
  }, ln.isConcurrentMode = A, ln.isContextConsumer = function(v) {
    return T(v) === a;
  }, ln.isContextProvider = function(v) {
    return T(v) === s;
  }, ln.isElement = function(v) {
    return typeof v == "object" && v !== null && v.$$typeof === e;
  }, ln.isForwardRef = function(v) {
    return T(v) === u;
  }, ln.isFragment = function(v) {
    return T(v) === r;
  }, ln.isLazy = function(v) {
    return T(v) === p;
  }, ln.isMemo = function(v) {
    return T(v) === h;
  }, ln.isPortal = function(v) {
    return T(v) === n;
  }, ln.isProfiler = function(v) {
    return T(v) === o;
  }, ln.isStrictMode = function(v) {
    return T(v) === i;
  }, ln.isSuspense = function(v) {
    return T(v) === d;
  }, ln.isValidElementType = function(v) {
    return typeof v == "string" || typeof v == "function" || v === r || v === c || v === o || v === i || v === d || v === f || typeof v == "object" && v !== null && (v.$$typeof === p || v.$$typeof === h || v.$$typeof === s || v.$$typeof === a || v.$$typeof === u || v.$$typeof === m || v.$$typeof === y || v.$$typeof === b || v.$$typeof === g);
  }, ln.typeOf = T, ln;
}
var cn = {};
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
    var t = typeof Symbol == "function" && Symbol.for, e = t ? Symbol.for("react.element") : 60103, n = t ? Symbol.for("react.portal") : 60106, r = t ? Symbol.for("react.fragment") : 60107, i = t ? Symbol.for("react.strict_mode") : 60108, o = t ? Symbol.for("react.profiler") : 60114, s = t ? Symbol.for("react.provider") : 60109, a = t ? Symbol.for("react.context") : 60110, l = t ? Symbol.for("react.async_mode") : 60111, c = t ? Symbol.for("react.concurrent_mode") : 60111, u = t ? Symbol.for("react.forward_ref") : 60112, d = t ? Symbol.for("react.suspense") : 60113, f = t ? Symbol.for("react.suspense_list") : 60120, h = t ? Symbol.for("react.memo") : 60115, p = t ? Symbol.for("react.lazy") : 60116, g = t ? Symbol.for("react.block") : 60121, m = t ? Symbol.for("react.fundamental") : 60117, y = t ? Symbol.for("react.responder") : 60118, b = t ? Symbol.for("react.scope") : 60119;
    function T(fe) {
      return typeof fe == "string" || typeof fe == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      fe === r || fe === c || fe === o || fe === i || fe === d || fe === f || typeof fe == "object" && fe !== null && (fe.$$typeof === p || fe.$$typeof === h || fe.$$typeof === s || fe.$$typeof === a || fe.$$typeof === u || fe.$$typeof === m || fe.$$typeof === y || fe.$$typeof === b || fe.$$typeof === g);
    }
    function A(fe) {
      if (typeof fe == "object" && fe !== null) {
        var Ee = fe.$$typeof;
        switch (Ee) {
          case e:
            var xe = fe.type;
            switch (xe) {
              case l:
              case c:
              case r:
              case o:
              case i:
              case d:
                return xe;
              default:
                var ze = xe && xe.$$typeof;
                switch (ze) {
                  case a:
                  case u:
                  case p:
                  case h:
                  case s:
                    return ze;
                  default:
                    return Ee;
                }
            }
          case n:
            return Ee;
        }
      }
    }
    var v = l, C = c, D = a, P = s, S = e, z = u, k = r, x = p, E = h, I = n, M = o, N = i, L = d, W = !1;
    function oe(fe) {
      return W || (W = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), F(fe) || A(fe) === l;
    }
    function F(fe) {
      return A(fe) === c;
    }
    function O(fe) {
      return A(fe) === a;
    }
    function ne(fe) {
      return A(fe) === s;
    }
    function j(fe) {
      return typeof fe == "object" && fe !== null && fe.$$typeof === e;
    }
    function U(fe) {
      return A(fe) === u;
    }
    function re(fe) {
      return A(fe) === r;
    }
    function q(fe) {
      return A(fe) === p;
    }
    function ie(fe) {
      return A(fe) === h;
    }
    function Z(fe) {
      return A(fe) === n;
    }
    function Q(fe) {
      return A(fe) === o;
    }
    function Y(fe) {
      return A(fe) === i;
    }
    function ce(fe) {
      return A(fe) === d;
    }
    cn.AsyncMode = v, cn.ConcurrentMode = C, cn.ContextConsumer = D, cn.ContextProvider = P, cn.Element = S, cn.ForwardRef = z, cn.Fragment = k, cn.Lazy = x, cn.Memo = E, cn.Portal = I, cn.Profiler = M, cn.StrictMode = N, cn.Suspense = L, cn.isAsyncMode = oe, cn.isConcurrentMode = F, cn.isContextConsumer = O, cn.isContextProvider = ne, cn.isElement = j, cn.isForwardRef = U, cn.isFragment = re, cn.isLazy = q, cn.isMemo = ie, cn.isPortal = Z, cn.isProfiler = Q, cn.isStrictMode = Y, cn.isSuspense = ce, cn.isValidElementType = T, cn.typeOf = A;
  })()), cn;
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
      var O = F && (c && F[c] || F[u]);
      if (typeof O == "function")
        return O;
    }
    var f = "<<anonymous>>", h = {
      array: y("array"),
      bigint: y("bigint"),
      bool: y("boolean"),
      func: y("function"),
      number: y("number"),
      object: y("object"),
      string: y("string"),
      symbol: y("symbol"),
      any: b(),
      arrayOf: T,
      element: A(),
      elementType: v(),
      instanceOf: C,
      node: z(),
      objectOf: P,
      oneOf: D,
      oneOfType: S,
      shape: x,
      exact: E
    };
    function p(F, O) {
      return F === O ? F !== 0 || 1 / F === 1 / O : F !== F && O !== O;
    }
    function g(F, O) {
      this.message = F, this.data = O && typeof O == "object" ? O : {}, this.stack = "";
    }
    g.prototype = Error.prototype;
    function m(F) {
      if (process.env.NODE_ENV !== "production")
        var O = {}, ne = 0;
      function j(re, q, ie, Z, Q, Y, ce) {
        if (Z = Z || f, Y = Y || ie, ce !== n) {
          if (l) {
            var fe = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw fe.name = "Invariant Violation", fe;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var Ee = Z + ":" + ie;
            !O[Ee] && // Avoid spamming the console because they are often not actionable except for lib authors
            ne < 3 && (o(
              "You are manually calling a React.PropTypes validation function for the `" + Y + "` prop on `" + Z + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), O[Ee] = !0, ne++);
          }
        }
        return q[ie] == null ? re ? q[ie] === null ? new g("The " + Q + " `" + Y + "` is marked as required " + ("in `" + Z + "`, but its value is `null`.")) : new g("The " + Q + " `" + Y + "` is marked as required in " + ("`" + Z + "`, but its value is `undefined`.")) : null : F(q, ie, Z, Q, Y);
      }
      var U = j.bind(null, !1);
      return U.isRequired = j.bind(null, !0), U;
    }
    function y(F) {
      function O(ne, j, U, re, q, ie) {
        var Z = ne[j], Q = N(Z);
        if (Q !== F) {
          var Y = L(Z);
          return new g(
            "Invalid " + re + " `" + q + "` of type " + ("`" + Y + "` supplied to `" + U + "`, expected ") + ("`" + F + "`."),
            { expectedType: F }
          );
        }
        return null;
      }
      return m(O);
    }
    function b() {
      return m(s);
    }
    function T(F) {
      function O(ne, j, U, re, q) {
        if (typeof F != "function")
          return new g("Property `" + q + "` of component `" + U + "` has invalid PropType notation inside arrayOf.");
        var ie = ne[j];
        if (!Array.isArray(ie)) {
          var Z = N(ie);
          return new g("Invalid " + re + " `" + q + "` of type " + ("`" + Z + "` supplied to `" + U + "`, expected an array."));
        }
        for (var Q = 0; Q < ie.length; Q++) {
          var Y = F(ie, Q, U, re, q + "[" + Q + "]", n);
          if (Y instanceof Error)
            return Y;
        }
        return null;
      }
      return m(O);
    }
    function A() {
      function F(O, ne, j, U, re) {
        var q = O[ne];
        if (!a(q)) {
          var ie = N(q);
          return new g("Invalid " + U + " `" + re + "` of type " + ("`" + ie + "` supplied to `" + j + "`, expected a single ReactElement."));
        }
        return null;
      }
      return m(F);
    }
    function v() {
      function F(O, ne, j, U, re) {
        var q = O[ne];
        if (!t.isValidElementType(q)) {
          var ie = N(q);
          return new g("Invalid " + U + " `" + re + "` of type " + ("`" + ie + "` supplied to `" + j + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return m(F);
    }
    function C(F) {
      function O(ne, j, U, re, q) {
        if (!(ne[j] instanceof F)) {
          var ie = F.name || f, Z = oe(ne[j]);
          return new g("Invalid " + re + " `" + q + "` of type " + ("`" + Z + "` supplied to `" + U + "`, expected ") + ("instance of `" + ie + "`."));
        }
        return null;
      }
      return m(O);
    }
    function D(F) {
      if (!Array.isArray(F))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? o(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : o("Invalid argument supplied to oneOf, expected an array.")), s;
      function O(ne, j, U, re, q) {
        for (var ie = ne[j], Z = 0; Z < F.length; Z++)
          if (p(ie, F[Z]))
            return null;
        var Q = JSON.stringify(F, function(ce, fe) {
          var Ee = L(fe);
          return Ee === "symbol" ? String(fe) : fe;
        });
        return new g("Invalid " + re + " `" + q + "` of value `" + String(ie) + "` " + ("supplied to `" + U + "`, expected one of " + Q + "."));
      }
      return m(O);
    }
    function P(F) {
      function O(ne, j, U, re, q) {
        if (typeof F != "function")
          return new g("Property `" + q + "` of component `" + U + "` has invalid PropType notation inside objectOf.");
        var ie = ne[j], Z = N(ie);
        if (Z !== "object")
          return new g("Invalid " + re + " `" + q + "` of type " + ("`" + Z + "` supplied to `" + U + "`, expected an object."));
        for (var Q in ie)
          if (r(ie, Q)) {
            var Y = F(ie, Q, U, re, q + "." + Q, n);
            if (Y instanceof Error)
              return Y;
          }
        return null;
      }
      return m(O);
    }
    function S(F) {
      if (!Array.isArray(F))
        return process.env.NODE_ENV !== "production" && o("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var O = 0; O < F.length; O++) {
        var ne = F[O];
        if (typeof ne != "function")
          return o(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + W(ne) + " at index " + O + "."
          ), s;
      }
      function j(U, re, q, ie, Z) {
        for (var Q = [], Y = 0; Y < F.length; Y++) {
          var ce = F[Y], fe = ce(U, re, q, ie, Z, n);
          if (fe == null)
            return null;
          fe.data && r(fe.data, "expectedType") && Q.push(fe.data.expectedType);
        }
        var Ee = Q.length > 0 ? ", expected one of type [" + Q.join(", ") + "]" : "";
        return new g("Invalid " + ie + " `" + Z + "` supplied to " + ("`" + q + "`" + Ee + "."));
      }
      return m(j);
    }
    function z() {
      function F(O, ne, j, U, re) {
        return I(O[ne]) ? null : new g("Invalid " + U + " `" + re + "` supplied to " + ("`" + j + "`, expected a ReactNode."));
      }
      return m(F);
    }
    function k(F, O, ne, j, U) {
      return new g(
        (F || "React class") + ": " + O + " type `" + ne + "." + j + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + U + "`."
      );
    }
    function x(F) {
      function O(ne, j, U, re, q) {
        var ie = ne[j], Z = N(ie);
        if (Z !== "object")
          return new g("Invalid " + re + " `" + q + "` of type `" + Z + "` " + ("supplied to `" + U + "`, expected `object`."));
        for (var Q in F) {
          var Y = F[Q];
          if (typeof Y != "function")
            return k(U, re, q, Q, L(Y));
          var ce = Y(ie, Q, U, re, q + "." + Q, n);
          if (ce)
            return ce;
        }
        return null;
      }
      return m(O);
    }
    function E(F) {
      function O(ne, j, U, re, q) {
        var ie = ne[j], Z = N(ie);
        if (Z !== "object")
          return new g("Invalid " + re + " `" + q + "` of type `" + Z + "` " + ("supplied to `" + U + "`, expected `object`."));
        var Q = e({}, ne[j], F);
        for (var Y in Q) {
          var ce = F[Y];
          if (r(F, Y) && typeof ce != "function")
            return k(U, re, q, Y, L(ce));
          if (!ce)
            return new g(
              "Invalid " + re + " `" + q + "` key `" + Y + "` supplied to `" + U + "`.\nBad object: " + JSON.stringify(ne[j], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(F), null, "  ")
            );
          var fe = ce(ie, Y, U, re, q + "." + Y, n);
          if (fe)
            return fe;
        }
        return null;
      }
      return m(O);
    }
    function I(F) {
      switch (typeof F) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !F;
        case "object":
          if (Array.isArray(F))
            return F.every(I);
          if (F === null || a(F))
            return !0;
          var O = d(F);
          if (O) {
            var ne = O.call(F), j;
            if (O !== F.entries) {
              for (; !(j = ne.next()).done; )
                if (!I(j.value))
                  return !1;
            } else
              for (; !(j = ne.next()).done; ) {
                var U = j.value;
                if (U && !I(U[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function M(F, O) {
      return F === "symbol" ? !0 : O ? O["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && O instanceof Symbol : !1;
    }
    function N(F) {
      var O = typeof F;
      return Array.isArray(F) ? "array" : F instanceof RegExp ? "object" : M(O, F) ? "symbol" : O;
    }
    function L(F) {
      if (typeof F > "u" || F === null)
        return "" + F;
      var O = N(F);
      if (O === "object") {
        if (F instanceof Date)
          return "date";
        if (F instanceof RegExp)
          return "regexp";
      }
      return O;
    }
    function W(F) {
      var O = L(F);
      switch (O) {
        case "array":
        case "object":
          return "an " + O;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + O;
        default:
          return O;
      }
    }
    function oe(F) {
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
      n(t, Mt, /* @__PURE__ */ VR());
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
        for (var T = 1; T < arguments.length; T++) {
          var A = arguments[T];
          for (var v in A)
            Object.prototype.hasOwnProperty.call(A, v) && (b[v] = A[v]);
        }
        return b;
      };
      function l(b, T) {
        var A = {};
        for (var v in b)
          T.indexOf(v) >= 0 || Object.prototype.hasOwnProperty.call(b, v) && (A[v] = b[v]);
        return A;
      }
      function c(b, T) {
        if (!(b instanceof T))
          throw new TypeError("Cannot call a class as a function");
      }
      var u = /* @__PURE__ */ (function() {
        function b(T, A) {
          for (var v = 0; v < A.length; v++) {
            var C = A[v];
            C.enumerable = C.enumerable || !1, C.configurable = !0, "value" in C && (C.writable = !0), Object.defineProperty(T, C.key, C);
          }
        }
        return function(T, A, v) {
          return A && b(T.prototype, A), v && b(T, v), T;
        };
      })();
      function d(b, T) {
        if (!b)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return T && (typeof T == "object" || typeof T == "function") ? T : b;
      }
      function f(b, T) {
        if (typeof T != "function" && T !== null)
          throw new TypeError("Super expression must either be null or a function, not " + typeof T);
        b.prototype = Object.create(T && T.prototype, {
          constructor: {
            value: b,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), T && (Object.setPrototypeOf ? Object.setPrototypeOf(b, T) : b.__proto__ = T);
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
      function m(b) {
        if ("touches" in b) {
          var T = b.touches[0], A = T.pageX, v = T.pageY;
          return { x: A, y: v };
        }
        var C = b.screenX, D = b.screenY;
        return { x: C, y: D };
      }
      var y = (function(b) {
        f(T, b);
        function T() {
          var A;
          c(this, T);
          for (var v = arguments.length, C = Array(v), D = 0; D < v; D++)
            C[D] = arguments[D];
          var P = d(this, (A = T.__proto__ || Object.getPrototypeOf(T)).call.apply(A, [this].concat(C)));
          return P._handleSwipeStart = P._handleSwipeStart.bind(P), P._handleSwipeMove = P._handleSwipeMove.bind(P), P._handleSwipeEnd = P._handleSwipeEnd.bind(P), P._onMouseDown = P._onMouseDown.bind(P), P._onMouseMove = P._onMouseMove.bind(P), P._onMouseUp = P._onMouseUp.bind(P), P._setSwiperRef = P._setSwiperRef.bind(P), P;
        }
        return u(T, [{
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
            var C = m(v), D = C.x, P = C.y;
            this.moveStart = { x: D, y: P }, this.props.onSwipeStart(v);
          }
        }, {
          key: "_handleSwipeMove",
          value: function(v) {
            if (this.moveStart) {
              var C = m(v), D = C.x, P = C.y, S = D - this.moveStart.x, z = P - this.moveStart.y;
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
            var C = this.props.tolerance;
            this.moving && this.movePosition && (this.movePosition.deltaX < -C ? this.props.onSwipeLeft(1, v) : this.movePosition.deltaX > C && this.props.onSwipeRight(1, v), this.movePosition.deltaY < -C ? this.props.onSwipeUp(1, v) : this.movePosition.deltaY > C && this.props.onSwipeDown(1, v)), this.moveStart = null, this.moving = !1, this.movePosition = null;
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
            var C = v.className, D = v.style, P = v.children;
            v.allowMouseEvents, v.onSwipeUp, v.onSwipeDown, v.onSwipeLeft, v.onSwipeRight, v.onSwipeStart, v.onSwipeMove, v.onSwipeEnd, v.innerRef, v.tolerance;
            var S = l(v, ["tagName", "className", "style", "children", "allowMouseEvents", "onSwipeUp", "onSwipeDown", "onSwipeLeft", "onSwipeRight", "onSwipeStart", "onSwipeMove", "onSwipeEnd", "innerRef", "tolerance"]);
            return i.default.createElement(
              this.props.tagName,
              a({
                ref: this._setSwiperRef,
                onMouseDown: this._onMouseDown,
                onTouchStart: this._handleSwipeStart,
                onTouchEnd: this._handleSwipeEnd,
                className: C,
                style: D
              }, S),
              P
            );
          }
        }]), T;
      })(n.Component);
      y.displayName = "ReactSwipe", y.propTypes = {
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
      }, y.defaultProps = {
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
      }, e.default = y;
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
  var t = l(Mt), e = s(jv()), n = QR(), r = s(mh()), i = s(Wv()), o = s(Kv());
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
        var E = k ? Object.getOwnPropertyDescriptor(P, x) : null;
        E && (E.get || E.set) ? Object.defineProperty(z, x, E) : z[x] = P[x];
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
  function m(P) {
    var S = T();
    return function() {
      var k = A(P), x;
      if (S) {
        var E = A(this).constructor;
        x = Reflect.construct(k, arguments, E);
      } else
        x = k.apply(this, arguments);
      return y(this, x);
    };
  }
  function y(P, S) {
    return S && (c(S) === "object" || typeof S == "function") ? S : b(P);
  }
  function b(P) {
    if (P === void 0)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return P;
  }
  function T() {
    if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
    if (typeof Proxy == "function") return !0;
    try {
      return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
      })), !0;
    } catch {
      return !1;
    }
  }
  function A(P) {
    return A = Object.setPrototypeOf ? Object.getPrototypeOf : function(z) {
      return z.__proto__ || Object.getPrototypeOf(z);
    }, A(P);
  }
  function v(P, S, z) {
    return S in P ? Object.defineProperty(P, S, { value: z, enumerable: !0, configurable: !0, writable: !0 }) : P[S] = z, P;
  }
  var C = function(S) {
    return S.hasOwnProperty("key");
  }, D = /* @__PURE__ */ (function(P) {
    p(z, P);
    var S = m(z);
    function z(k) {
      var x;
      return d(this, z), x = S.call(this, k), v(b(x), "itemsWrapperRef", void 0), v(b(x), "itemsListRef", void 0), v(b(x), "thumbsRef", void 0), v(b(x), "setItemsWrapperRef", function(E) {
        x.itemsWrapperRef = E;
      }), v(b(x), "setItemsListRef", function(E) {
        x.itemsListRef = E;
      }), v(b(x), "setThumbsRef", function(E, I) {
        x.thumbsRef || (x.thumbsRef = []), x.thumbsRef[I] = E;
      }), v(b(x), "updateSizes", function() {
        if (!(!x.props.children || !x.itemsWrapperRef || !x.thumbsRef)) {
          var E = t.Children.count(x.props.children), I = x.itemsWrapperRef.clientWidth, M = x.props.thumbWidth ? x.props.thumbWidth : (0, n.outerWidth)(x.thumbsRef[0]), N = Math.floor(I / M), L = N < E, W = L ? E - N : 0;
          x.setState(function(oe, F) {
            return {
              itemSize: M,
              visibleItems: N,
              firstItem: L ? x.getFirstItem(F.selectedItem) : 0,
              lastPosition: W,
              showArrows: L
            };
          });
        }
      }), v(b(x), "handleClickItem", function(E, I, M) {
        if (!C(M) || M.key === "Enter") {
          var N = x.props.onSelectItem;
          typeof N == "function" && N(E, I);
        }
      }), v(b(x), "onSwipeStart", function() {
        x.setState({
          swiping: !0
        });
      }), v(b(x), "onSwipeEnd", function() {
        x.setState({
          swiping: !1
        });
      }), v(b(x), "onSwipeMove", function(E) {
        var I = E.x;
        if (!x.state.itemSize || !x.itemsWrapperRef || !x.state.visibleItems)
          return !1;
        var M = 0, N = t.Children.count(x.props.children), L = -(x.state.firstItem * 100) / x.state.visibleItems, W = Math.max(N - x.state.visibleItems, 0), oe = -W * 100 / x.state.visibleItems;
        L === M && I > 0 && (I = 0), L === oe && I < 0 && (I = 0);
        var F = x.itemsWrapperRef.clientWidth, O = L + 100 / (F / I);
        return x.itemsListRef && ["WebkitTransform", "MozTransform", "MsTransform", "OTransform", "transform", "msTransform"].forEach(function(ne) {
          x.itemsListRef.style[ne] = (0, r.default)(O, "%", x.props.axis);
        }), !0;
      }), v(b(x), "slideRight", function(E) {
        x.moveTo(x.state.firstItem - (typeof E == "number" ? E : 1));
      }), v(b(x), "slideLeft", function(E) {
        x.moveTo(x.state.firstItem + (typeof E == "number" ? E : 1));
      }), v(b(x), "moveTo", function(E) {
        E = E < 0 ? 0 : E, E = E >= x.state.lastPosition ? x.state.lastPosition : E, x.setState({
          firstItem: E
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
        var E = x;
        return x >= this.state.lastPosition && (E = this.state.lastPosition), x < this.state.firstItem + this.state.visibleItems && (E = this.state.firstItem), x < this.state.firstItem && (E = x), E;
      }
    }, {
      key: "renderItems",
      value: function() {
        var x = this;
        return this.props.children.map(function(E, I) {
          var M = e.default.ITEM(!1, I === x.state.selectedItem), N = {
            key: I,
            ref: function(W) {
              return x.setThumbsRef(W, I);
            },
            className: M,
            onClick: x.handleClickItem.bind(x, I, x.props.children[I]),
            onKeyDown: x.handleClickItem.bind(x, I, x.props.children[I]),
            "aria-label": "".concat(x.props.labels.item, " ").concat(I + 1),
            style: {
              width: x.props.thumbWidth
            }
          };
          return /* @__PURE__ */ t.default.createElement("li", u({}, N, {
            role: "button",
            tabIndex: 0
          }), E);
        });
      }
    }, {
      key: "render",
      value: function() {
        var x = this;
        if (!this.props.children)
          return null;
        var E = t.Children.count(this.props.children) > 1, I = this.state.showArrows && this.state.firstItem > 0, M = this.state.showArrows && this.state.firstItem < this.state.lastPosition, N = {}, L = -this.state.firstItem * (this.state.itemSize || 0), W = (0, r.default)(L, "px", this.props.axis), oe = this.props.transitionTime + "ms";
        return N = {
          WebkitTransform: W,
          MozTransform: W,
          MsTransform: W,
          OTransform: W,
          transform: W,
          msTransform: W,
          WebkitTransitionDuration: oe,
          MozTransitionDuration: oe,
          MsTransitionDuration: oe,
          OTransitionDuration: oe,
          transitionDuration: oe,
          msTransitionDuration: oe
        }, /* @__PURE__ */ t.default.createElement("div", {
          className: e.default.CAROUSEL(!1)
        }, /* @__PURE__ */ t.default.createElement("div", {
          className: e.default.WRAPPER(!1),
          ref: this.setItemsWrapperRef
        }, /* @__PURE__ */ t.default.createElement("button", {
          type: "button",
          className: e.default.ARROW_PREV(!I),
          onClick: function() {
            return x.slideRight();
          },
          "aria-label": this.props.labels.leftArrow
        }), E ? /* @__PURE__ */ t.default.createElement(i.default, {
          tagName: "ul",
          className: e.default.SLIDER(!1, this.state.swiping),
          onSwipeLeft: this.slideLeft,
          onSwipeRight: this.slideRight,
          onSwipeMove: this.onSwipeMove,
          onSwipeStart: this.onSwipeStart,
          onSwipeEnd: this.onSwipeEnd,
          style: N,
          innerRef: this.setItemsListRef,
          allowMouseEvents: this.props.emulateTouch
        }, this.renderItems()) : /* @__PURE__ */ t.default.createElement("ul", {
          className: e.default.SLIDER(!1, this.state.swiping),
          ref: function(O) {
            return x.setItemsListRef(O);
          },
          style: N
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
  var t = Mt, e = n(mh());
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
  var t = Mt, e = r(mh()), n = Gv();
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
    var p = {}, g = h.selectedItem, m = g, y = t.Children.count(f.children) - 1, b = f.infiniteLoop && (g < 0 || g > y);
    if (b)
      return m < 0 ? f.centerMode && f.centerSlidePercentage && f.axis === "horizontal" ? p.itemListStyle = (0, n.setPosition)(-(y + 2) * f.centerSlidePercentage - (100 - f.centerSlidePercentage) / 2, f.axis) : p.itemListStyle = (0, n.setPosition)(-(y + 2) * 100, f.axis) : m > y && (p.itemListStyle = (0, n.setPosition)(0, f.axis)), p;
    var T = (0, n.getPosition)(g, f), A = (0, e.default)(T, "%", f.axis), v = f.transitionTime + "ms";
    return p.itemListStyle = {
      WebkitTransform: A,
      msTransform: A,
      OTransform: A,
      transform: A
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
    var m = {}, y = h.axis === "horizontal", b = t.Children.count(h.children), T = 0, A = (0, n.getPosition)(p.selectedItem, h), v = h.infiniteLoop ? (0, n.getPosition)(b - 1, h) - 100 : (0, n.getPosition)(b - 1, h), C = y ? f.x : f.y, D = C;
    A === T && C > 0 && (D = 0), A === v && C < 0 && (D = 0);
    var P = A + 100 / (p.itemSize / D), S = Math.abs(C) > h.swipeScrollTolerance;
    return h.infiniteLoop && S && (p.selectedItem === 0 && P > -100 ? P -= b * 100 : p.selectedItem === b - 1 && P < -b * 100 && (P += b * 100)), (!h.preventMovementUntilSwipeScrollTolerance || S || p.swipeMovementStarted) && (p.swipeMovementStarted || g({
      swipeMovementStarted: !0
    }), m.itemListStyle = (0, n.setPosition)(P, h.axis)), S && !p.cancelClick && g({
      cancelClick: !0
    }), m;
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
    var p = f.transitionTime + "ms", g = "ease-in-out", m = {
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
    return h.swiping || (m = o(o({}, m), {}, {
      WebkitTransitionDuration: p,
      MozTransitionDuration: p,
      OTransitionDuration: p,
      transitionDuration: p,
      msTransitionDuration: p
    })), {
      slideStyle: m,
      selectedStyle: o(o({}, m), {}, {
        opacity: 1,
        position: "relative"
      }),
      prevStyle: o({}, m)
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
  var t = u(Mt), e = l(Wv()), n = l(jv()), r = l(Uv()), i = l(eT()), o = l(Kv()), s = Gv(), a = tT();
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
    var E = {}, I = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var M in k)
      if (Object.prototype.hasOwnProperty.call(k, M)) {
        var N = I ? Object.getOwnPropertyDescriptor(k, M) : null;
        N && (N.get || N.set) ? Object.defineProperty(E, M, N) : E[M] = k[M];
      }
    return E.default = k, x && x.set(k, E), E;
  }
  function d(k) {
    "@babel/helpers - typeof";
    return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? d = function(E) {
      return typeof E;
    } : d = function(E) {
      return E && typeof Symbol == "function" && E.constructor === Symbol && E !== Symbol.prototype ? "symbol" : typeof E;
    }, d(k);
  }
  function f() {
    return f = Object.assign || function(k) {
      for (var x = 1; x < arguments.length; x++) {
        var E = arguments[x];
        for (var I in E)
          Object.prototype.hasOwnProperty.call(E, I) && (k[I] = E[I]);
      }
      return k;
    }, f.apply(this, arguments);
  }
  function h(k, x) {
    var E = Object.keys(k);
    if (Object.getOwnPropertySymbols) {
      var I = Object.getOwnPropertySymbols(k);
      x && (I = I.filter(function(M) {
        return Object.getOwnPropertyDescriptor(k, M).enumerable;
      })), E.push.apply(E, I);
    }
    return E;
  }
  function p(k) {
    for (var x = 1; x < arguments.length; x++) {
      var E = arguments[x] != null ? arguments[x] : {};
      x % 2 ? h(Object(E), !0).forEach(function(I) {
        S(k, I, E[I]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(k, Object.getOwnPropertyDescriptors(E)) : h(Object(E)).forEach(function(I) {
        Object.defineProperty(k, I, Object.getOwnPropertyDescriptor(E, I));
      });
    }
    return k;
  }
  function g(k, x) {
    if (!(k instanceof x))
      throw new TypeError("Cannot call a class as a function");
  }
  function m(k, x) {
    for (var E = 0; E < x.length; E++) {
      var I = x[E];
      I.enumerable = I.enumerable || !1, I.configurable = !0, "value" in I && (I.writable = !0), Object.defineProperty(k, I.key, I);
    }
  }
  function y(k, x, E) {
    return x && m(k.prototype, x), k;
  }
  function b(k, x) {
    if (typeof x != "function" && x !== null)
      throw new TypeError("Super expression must either be null or a function");
    k.prototype = Object.create(x && x.prototype, { constructor: { value: k, writable: !0, configurable: !0 } }), x && T(k, x);
  }
  function T(k, x) {
    return T = Object.setPrototypeOf || function(I, M) {
      return I.__proto__ = M, I;
    }, T(k, x);
  }
  function A(k) {
    var x = D();
    return function() {
      var I = P(k), M;
      if (x) {
        var N = P(this).constructor;
        M = Reflect.construct(I, arguments, N);
      } else
        M = I.apply(this, arguments);
      return v(this, M);
    };
  }
  function v(k, x) {
    return x && (d(x) === "object" || typeof x == "function") ? x : C(k);
  }
  function C(k) {
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
    return P = Object.setPrototypeOf ? Object.getPrototypeOf : function(E) {
      return E.__proto__ || Object.getPrototypeOf(E);
    }, P(k);
  }
  function S(k, x, E) {
    return x in k ? Object.defineProperty(k, x, { value: E, enumerable: !0, configurable: !0, writable: !0 }) : k[x] = E, k;
  }
  var z = /* @__PURE__ */ (function(k) {
    b(E, k);
    var x = A(E);
    function E(I) {
      var M;
      g(this, E), M = x.call(this, I), S(C(M), "thumbsRef", void 0), S(C(M), "carouselWrapperRef", void 0), S(C(M), "listRef", void 0), S(C(M), "itemsRef", void 0), S(C(M), "timer", void 0), S(C(M), "animationHandler", void 0), S(C(M), "setThumbsRef", function(L) {
        M.thumbsRef = L;
      }), S(C(M), "setCarouselWrapperRef", function(L) {
        M.carouselWrapperRef = L;
      }), S(C(M), "setListRef", function(L) {
        M.listRef = L;
      }), S(C(M), "setItemsRef", function(L, W) {
        M.itemsRef || (M.itemsRef = []), M.itemsRef[W] = L;
      }), S(C(M), "autoPlay", function() {
        t.Children.count(M.props.children) <= 1 || (M.clearAutoPlay(), M.props.autoPlay && (M.timer = setTimeout(function() {
          M.increment();
        }, M.props.interval)));
      }), S(C(M), "clearAutoPlay", function() {
        M.timer && clearTimeout(M.timer);
      }), S(C(M), "resetAutoPlay", function() {
        M.clearAutoPlay(), M.autoPlay();
      }), S(C(M), "stopOnHover", function() {
        M.setState({
          isMouseEntered: !0
        }, M.clearAutoPlay);
      }), S(C(M), "startOnLeave", function() {
        M.setState({
          isMouseEntered: !1
        }, M.autoPlay);
      }), S(C(M), "isFocusWithinTheCarousel", function() {
        return M.carouselWrapperRef ? !!((0, i.default)().activeElement === M.carouselWrapperRef || M.carouselWrapperRef.contains((0, i.default)().activeElement)) : !1;
      }), S(C(M), "navigateWithKeyboard", function(L) {
        if (M.isFocusWithinTheCarousel()) {
          var W = M.props.axis, oe = W === "horizontal", F = {
            ArrowUp: 38,
            ArrowRight: 39,
            ArrowDown: 40,
            ArrowLeft: 37
          }, O = oe ? F.ArrowRight : F.ArrowDown, ne = oe ? F.ArrowLeft : F.ArrowUp;
          O === L.keyCode ? M.increment() : ne === L.keyCode && M.decrement();
        }
      }), S(C(M), "updateSizes", function() {
        if (!(!M.state.initialized || !M.itemsRef || M.itemsRef.length === 0)) {
          var L = M.props.axis === "horizontal", W = M.itemsRef[0];
          if (W) {
            var oe = L ? W.clientWidth : W.clientHeight;
            M.setState({
              itemSize: oe
            }), M.thumbsRef && M.thumbsRef.updateSizes();
          }
        }
      }), S(C(M), "setMountState", function() {
        M.setState({
          hasMount: !0
        }), M.updateSizes();
      }), S(C(M), "handleClickItem", function(L, W) {
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
      }), S(C(M), "handleOnChange", function(L, W) {
        t.Children.count(M.props.children) <= 1 || M.props.onChange(L, W);
      }), S(C(M), "handleClickThumb", function(L, W) {
        M.props.onClickThumb(L, W), M.moveTo(L);
      }), S(C(M), "onSwipeStart", function(L) {
        M.setState({
          swiping: !0
        }), M.props.onSwipeStart(L);
      }), S(C(M), "onSwipeEnd", function(L) {
        M.setState({
          swiping: !1,
          cancelClick: !1,
          swipeMovementStarted: !1
        }), M.props.onSwipeEnd(L), M.clearAutoPlay(), M.state.autoPlay && M.autoPlay();
      }), S(C(M), "onSwipeMove", function(L, W) {
        M.props.onSwipeMove(W);
        var oe = M.props.swipeAnimationHandler(L, M.props, M.state, M.setState.bind(C(M)));
        return M.setState(p({}, oe)), !!Object.keys(oe).length;
      }), S(C(M), "decrement", function() {
        var L = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
        M.moveTo(M.state.selectedItem - (typeof L == "number" ? L : 1));
      }), S(C(M), "increment", function() {
        var L = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
        M.moveTo(M.state.selectedItem + (typeof L == "number" ? L : 1));
      }), S(C(M), "moveTo", function(L) {
        if (typeof L == "number") {
          var W = t.Children.count(M.props.children) - 1;
          L < 0 && (L = M.props.infiniteLoop ? W : 0), L > W && (L = M.props.infiniteLoop ? 0 : W), M.selectItem({
            // if it's not a slider, we don't need to set position here
            selectedItem: L
          }), M.state.autoPlay && M.state.isMouseEntered === !1 && M.resetAutoPlay();
        }
      }), S(C(M), "onClickNext", function() {
        M.increment(1);
      }), S(C(M), "onClickPrev", function() {
        M.decrement(1);
      }), S(C(M), "onSwipeForward", function() {
        M.increment(1), M.props.emulateTouch && M.setState({
          cancelClick: !0
        });
      }), S(C(M), "onSwipeBackwards", function() {
        M.decrement(1), M.props.emulateTouch && M.setState({
          cancelClick: !0
        });
      }), S(C(M), "changeItem", function(L) {
        return function(W) {
          (!(0, s.isKeyboardEvent)(W) || W.key === "Enter") && M.moveTo(L);
        };
      }), S(C(M), "selectItem", function(L) {
        M.setState(p({
          previousItem: M.state.selectedItem
        }, L), function() {
          M.setState(M.animationHandler(M.props, M.state));
        }), M.handleOnChange(L.selectedItem, t.Children.toArray(M.props.children)[L.selectedItem]);
      }), S(C(M), "getInitialImage", function() {
        var L = M.props.selectedItem, W = M.itemsRef && M.itemsRef[L], oe = W && W.getElementsByTagName("img") || [];
        return oe[0];
      }), S(C(M), "getVariableItemHeight", function(L) {
        var W = M.itemsRef && M.itemsRef[L];
        if (M.state.hasMount && W && W.children.length) {
          var oe = W.children[0].getElementsByTagName("img") || [];
          if (oe.length > 0) {
            var F = oe[0];
            if (!F.complete) {
              var O = function U() {
                M.forceUpdate(), F.removeEventListener("load", U);
              };
              F.addEventListener("load", O);
            }
          }
          var ne = oe[0] || W.children[0], j = ne.clientHeight;
          return j > 0 ? j : null;
        }
        return null;
      });
      var N = {
        initialized: !1,
        previousItem: I.selectedItem,
        selectedItem: I.selectedItem,
        hasMount: !1,
        isMouseEntered: !1,
        autoPlay: I.autoPlay,
        swiping: !1,
        swipeMovementStarted: !1,
        cancelClick: !1,
        itemSize: 1,
        itemListStyle: {},
        slideStyle: {},
        selectedStyle: {},
        prevStyle: {}
      };
      return M.animationHandler = typeof I.animationHandler == "function" && I.animationHandler || I.animationHandler === "fade" && a.fadeAnimationHandler || a.slideAnimationHandler, M.state = p(p({}, N), M.animationHandler(I, N)), M;
    }
    return y(E, [{
      key: "componentDidMount",
      value: function() {
        this.props.children && this.setupCarousel();
      }
    }, {
      key: "componentDidUpdate",
      value: function(M, N) {
        !M.children && this.props.children && !this.state.initialized && this.setupCarousel(), !M.autoFocus && this.props.autoFocus && this.forceFocus(), N.swiping && !this.state.swiping && this.setState(p({}, this.props.stopSwipingHandler(this.props, this.state))), (M.selectedItem !== this.props.selectedItem || M.centerMode !== this.props.centerMode) && (this.updateSizes(), this.moveTo(this.props.selectedItem)), M.autoPlay !== this.props.autoPlay && (this.props.autoPlay ? this.setupAutoPlay() : this.destroyAutoPlay(), this.setState({
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
          var N = M.getInitialImage();
          N && !N.complete ? N.addEventListener("load", M.setMountState) : M.setMountState();
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
        var N = this;
        return this.props.children ? t.Children.map(this.props.children, function(L, W) {
          var oe = W === N.state.selectedItem, F = W === N.state.previousItem, O = oe && N.state.selectedStyle || F && N.state.prevStyle || N.state.slideStyle || {};
          N.props.centerMode && N.props.axis === "horizontal" && (O = p(p({}, O), {}, {
            minWidth: N.props.centerSlidePercentage + "%"
          })), N.state.swiping && N.state.swipeMovementStarted && (O = p(p({}, O), {}, {
            pointerEvents: "none"
          }));
          var ne = {
            ref: function(U) {
              return N.setItemsRef(U, W);
            },
            key: "itemKey" + W + (M ? "clone" : ""),
            className: n.default.ITEM(!0, W === N.state.selectedItem, W === N.state.previousItem),
            onClick: N.handleClickItem.bind(N, W, L),
            style: O
          };
          return /* @__PURE__ */ t.default.createElement("li", ne, N.props.renderItem(L, {
            isSelected: W === N.state.selectedItem,
            isPrevious: W === N.state.previousItem
          }));
        }) : [];
      }
    }, {
      key: "renderControls",
      value: function() {
        var M = this, N = this.props, L = N.showIndicators, W = N.labels, oe = N.renderIndicator, F = N.children;
        return L ? /* @__PURE__ */ t.default.createElement("ul", {
          className: "control-dots"
        }, t.Children.map(F, function(O, ne) {
          return oe && oe(M.changeItem(ne), ne === M.state.selectedItem, ne, W.item);
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
        var N = this.props.swipeable && t.Children.count(this.props.children) > 1, L = this.props.axis === "horizontal", W = this.props.showArrows && t.Children.count(this.props.children) > 1, oe = W && (this.state.selectedItem > 0 || this.props.infiniteLoop) || !1, F = W && (this.state.selectedItem < t.Children.count(this.props.children) - 1 || this.props.infiniteLoop) || !1, O = this.renderItems(!0), ne = O.shift(), j = O.pop(), U = {
          className: n.default.SLIDER(!0, this.state.swiping),
          onSwipeMove: this.onSwipeMove,
          onSwipeStart: this.onSwipeStart,
          onSwipeEnd: this.onSwipeEnd,
          style: this.state.itemListStyle,
          tolerance: this.props.swipeScrollTolerance
        }, re = {};
        if (L) {
          if (U.onSwipeLeft = this.onSwipeForward, U.onSwipeRight = this.onSwipeBackwards, this.props.dynamicHeight) {
            var q = this.getVariableItemHeight(this.state.selectedItem);
            re.height = q || "auto";
          }
        } else
          U.onSwipeUp = this.props.verticalSwipe === "natural" ? this.onSwipeBackwards : this.onSwipeForward, U.onSwipeDown = this.props.verticalSwipe === "natural" ? this.onSwipeForward : this.onSwipeBackwards, U.style = p(p({}, U.style), {}, {
            height: this.state.itemSize
          }), re.height = this.state.itemSize;
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
        }, this.renderControls(), this.props.renderArrowPrev(this.onClickPrev, oe, this.props.labels.leftArrow), /* @__PURE__ */ t.default.createElement("div", {
          className: n.default.WRAPPER(!0, this.props.axis),
          style: re
        }, N ? /* @__PURE__ */ t.default.createElement(e.default, f({
          tagName: "ul",
          innerRef: this.setListRef
        }, U, {
          allowMouseEvents: this.props.emulateTouch
        }), this.props.infiniteLoop && j, this.renderItems(), this.props.infiniteLoop && ne) : /* @__PURE__ */ t.default.createElement("ul", {
          className: n.default.SLIDER(!0, this.state.swiping),
          ref: function(Z) {
            return M.setListRef(Z);
          },
          style: this.state.itemListStyle || {}
        }, this.props.infiniteLoop && j, this.renderItems(), this.props.infiniteLoop && ne)), this.props.renderArrowNext(this.onClickNext, F, this.props.labels.rightArrow), this.renderStatus()), this.renderThumbs());
      }
    }]), E;
  })(t.default.Component);
  return es.default = z, S(z, "displayName", "Carousel"), S(z, "defaultProps", {
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
    renderArrowPrev: function(x, E, I) {
      return /* @__PURE__ */ t.default.createElement("button", {
        type: "button",
        "aria-label": I,
        className: n.default.ARROW_PREV(!E),
        onClick: x
      });
    },
    renderArrowNext: function(x, E, I) {
      return /* @__PURE__ */ t.default.createElement("button", {
        type: "button",
        "aria-label": I,
        className: n.default.ARROW_NEXT(!E),
        onClick: x
      });
    },
    renderIndicator: function(x, E, I, M) {
      return /* @__PURE__ */ t.default.createElement("li", {
        className: n.default.DOT(E),
        onClick: x,
        onKeyDown: x,
        value: I,
        key: I,
        role: "button",
        tabIndex: 0,
        "aria-label": "".concat(M, " ").concat(I + 1)
      });
    },
    renderItem: function(x) {
      return x;
    },
    renderThumbs: function(x) {
      var E = t.Children.map(x, function(I) {
        var M = I;
        if (I.type !== "img" && (M = t.Children.toArray(I.props.children).find(function(N) {
          return N.type === "img";
        })), !!M)
          return M;
      });
      return E.filter(function(I) {
        return I;
      }).length === 0 ? (console.warn("No images found! Can't build the thumb list without images. If you don't need thumbs, set showThumbs={false} in the Carousel. Note that it's not possible to get images rendered inside custom components. More info at https://github.com/leandrowd/react-responsive-carousel/blob/master/TROUBLESHOOTING.md"), []) : E;
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
    var u, d, f, h, p, g, m = 0, y = !1, b = !1, T = !0;
    if (typeof a != "function")
      throw new TypeError(r);
    l = n(l) || 0, t(c) && (y = !!c.leading, b = "maxWait" in c, f = b ? i(n(c.maxWait) || 0, l) : f, T = "trailing" in c ? !!c.trailing : T);
    function A(E) {
      var I = u, M = d;
      return u = d = void 0, m = E, h = a.apply(M, I), h;
    }
    function v(E) {
      return m = E, p = setTimeout(P, l), y ? A(E) : h;
    }
    function C(E) {
      var I = E - g, M = E - m, N = l - I;
      return b ? o(N, f - M) : N;
    }
    function D(E) {
      var I = E - g, M = E - m;
      return g === void 0 || I >= l || I < 0 || b && M >= f;
    }
    function P() {
      var E = e();
      if (D(E))
        return S(E);
      p = setTimeout(P, C(E));
    }
    function S(E) {
      return p = void 0, T && u ? A(E) : (u = d = void 0, h);
    }
    function z() {
      p !== void 0 && clearTimeout(p), m = 0, u = g = d = p = void 0;
    }
    function k() {
      return p === void 0 ? h : S(e());
    }
    function x() {
      var E = e(), I = D(E);
      if (u = arguments, d = this, g = E, I) {
        if (p === void 0)
          return v(g);
        if (b)
          return clearTimeout(p), p = setTimeout(P, l), A(g);
      }
      return p === void 0 && (p = setTimeout(P, l)), h;
    }
    return x.cancel = z, x.flush = k, x;
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
function rn(t, e = "") {
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
})(), nr = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] /, listReplaceTask: /^\[[ xX]\] +/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (t) => new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}#`), htmlBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}<(?:[a-z].*>|!--)`, "i") }, wT = /^(?:[ \t]*(?:\n|$))+/, xT = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, kT = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, js = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, ST = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, xh = /(?:[*+-]|\d{1,9}[.)])/, n1 = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, r1 = rn(n1).replace(/bull/g, xh).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), CT = rn(n1).replace(/bull/g, xh).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), kh = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, RT = /^[^\n]+/, Sh = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, TT = rn(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", Sh).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), ET = rn(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, xh).getRegex(), Sl = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", Ch = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, MT = rn("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", Ch).replace("tag", Sl).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), i1 = rn(kh).replace("hr", js).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Sl).getRegex(), IT = rn(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", i1).getRegex(), Rh = { blockquote: IT, code: xT, def: TT, fences: kT, heading: ST, hr: js, html: MT, lheading: r1, list: ET, newline: wT, paragraph: i1, table: xs, text: RT }, Rm = rn("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", js).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Sl).getRegex(), AT = { ...Rh, lheading: CT, table: Rm, paragraph: rn(kh).replace("hr", js).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Rm).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Sl).getRegex() }, _T = { ...Rh, html: rn(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", Ch).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: xs, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: rn(kh).replace("hr", js).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", r1).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, PT = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, DT = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, o1 = /^( {2,}|\\)\n(?!\s*$)/, NT = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Cl = /[\p{P}\p{S}]/u, Th = /[\s\p{P}\p{S}]/u, s1 = /[^\s\p{P}\p{S}]/u, OT = rn(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, Th).getRegex(), a1 = /(?!~)[\p{P}\p{S}]/u, zT = /(?!~)[\s\p{P}\p{S}]/u, LT = /(?:[^\s\p{P}\p{S}]|~)/u, $T = rn(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", vT ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), l1 = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, FT = rn(l1, "u").replace(/punct/g, Cl).getRegex(), HT = rn(l1, "u").replace(/punct/g, a1).getRegex(), c1 = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", BT = rn(c1, "gu").replace(/notPunctSpace/g, s1).replace(/punctSpace/g, Th).replace(/punct/g, Cl).getRegex(), qT = rn(c1, "gu").replace(/notPunctSpace/g, LT).replace(/punctSpace/g, zT).replace(/punct/g, a1).getRegex(), WT = rn("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, s1).replace(/punctSpace/g, Th).replace(/punct/g, Cl).getRegex(), jT = rn(/\\(punct)/, "gu").replace(/punct/g, Cl).getRegex(), KT = rn(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), UT = rn(Ch).replace("(?:-->|$)", "-->").getRegex(), GT = rn("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", UT).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Za = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/, YT = rn(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", Za).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), u1 = rn(/^!?\[(label)\]\[(ref)\]/).replace("label", Za).replace("ref", Sh).getRegex(), d1 = rn(/^!?\[(ref)\](?:\[\])?/).replace("ref", Sh).getRegex(), XT = rn("reflink|nolink(?!\\()", "g").replace("reflink", u1).replace("nolink", d1).getRegex(), Tm = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, Eh = { _backpedal: xs, anyPunctuation: jT, autolink: KT, blockSkip: $T, br: o1, code: DT, del: xs, emStrongLDelim: FT, emStrongRDelimAst: BT, emStrongRDelimUnd: WT, escape: PT, link: YT, nolink: d1, punctuation: OT, reflink: u1, reflinkSearch: XT, tag: GT, text: NT, url: xs }, VT = { ...Eh, link: rn(/^!?\[(label)\]\((.*?)\)/).replace("label", Za).getRegex(), reflink: rn(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Za).getRegex() }, Sf = { ...Eh, emStrongRDelimAst: qT, emStrongLDelim: HT, url: rn(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", Tm).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: rn(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", Tm).getRegex() }, JT = { ...Sf, br: rn(o1).replace("{2,}", "*").getRegex(), text: rn(Sf.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, Ra = { normal: Rh, gfm: AT, pedantic: _T }, ls = { normal: Eh, gfm: Sf, breaks: JT, pedantic: VT }, ZT = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, Em = (t) => ZT[t];
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
    Ve(this, "options");
    Ve(this, "rules");
    Ve(this, "lexer");
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
`, 1)[0].replace(this.rules.other.listReplaceTabs, (y) => " ".repeat(3 * y.length)), f = t.split(`
`, 1)[0], h = !d.trim(), p = 0;
        if (this.options.pedantic ? (p = 2, u = d.trimStart()) : h ? p = e[1].length + 1 : (p = e[2].search(this.rules.other.nonSpaceChar), p = p > 4 ? 1 : p, u = d.slice(p), p += e[1].length), h && this.rules.other.blankLine.test(f) && (c += f + `
`, t = t.substring(f.length + 1), l = !0), !l) {
          let y = this.rules.other.nextBulletRegex(p), b = this.rules.other.hrRegex(p), T = this.rules.other.fencesBeginRegex(p), A = this.rules.other.headingBeginRegex(p), v = this.rules.other.htmlBeginRegex(p);
          for (; t; ) {
            let C = t.split(`
`, 1)[0], D;
            if (f = C, this.options.pedantic ? (f = f.replace(this.rules.other.listReplaceNesting, "  "), D = f) : D = f.replace(this.rules.other.tabCharGlobal, "    "), T.test(f) || A.test(f) || v.test(f) || y.test(f) || b.test(f)) break;
            if (D.search(this.rules.other.nonSpaceChar) >= p || !f.trim()) u += `
` + D.slice(p);
            else {
              if (h || d.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || T.test(d) || A.test(d) || b.test(d)) break;
              u += `
` + f;
            }
            !h && !f.trim() && (h = !0), c += C + `
`, t = t.substring(C.length + 1), d = D.slice(p);
          }
        }
        i.loose || (s ? i.loose = !0 : this.rules.other.doubleBlankLine.test(c) && (s = !0));
        let g = null, m;
        this.options.gfm && (g = this.rules.other.listIsTask.exec(u), g && (m = g[0] !== "[ ] ", u = u.replace(this.rules.other.listReplaceTask, ""))), i.items.push({ type: "list_item", raw: c, task: !!g, checked: m, loose: !1, text: u, tokens: [] }), i.raw += c;
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
    Ve(this, "tokens");
    Ve(this, "options");
    Ve(this, "state");
    Ve(this, "tokenizer");
    Ve(this, "inlineQueue");
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
        let g = 1 / 0, m = e.slice(1), y;
        this.options.extensions.startInline.forEach((b) => {
          y = b.call({ lexer: this }, m), typeof y == "number" && y >= 0 && (g = Math.min(g, y));
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
    Ve(this, "options");
    Ve(this, "parser");
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
    Ve(this, "options");
    Ve(this, "renderer");
    Ve(this, "textRenderer");
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
    Ve(this, "options");
    Ve(this, "block");
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
}, Ve(Aa, "passThroughHooks", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"])), Ve(Aa, "passThroughHooksRespectAsync", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"])), Aa), tE = class {
  constructor(...t) {
    Ve(this, "defaults", wh());
    Ve(this, "options", this.setOptions);
    Ve(this, "parse", this.parseMarkdown(!0));
    Ve(this, "parseInline", this.parseMarkdown(!1));
    Ve(this, "Parser", Hr);
    Ve(this, "Renderer", el);
    Ve(this, "TextRenderer", Mh);
    Ve(this, "Lexer", Fr);
    Ve(this, "Tokenizer", Qa);
    Ve(this, "Hooks", ms);
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
function dn(t, e) {
  return ro.parse(t, e);
}
dn.options = dn.setOptions = function(t) {
  return ro.setOptions(t), dn.defaults = ro.defaults, t1(dn.defaults), dn;
};
dn.getDefaults = wh;
dn.defaults = co;
dn.use = function(...t) {
  return ro.use(...t), dn.defaults = ro.defaults, t1(dn.defaults), dn;
};
dn.walkTokens = function(t, e) {
  return ro.walkTokens(t, e);
};
dn.parseInline = ro.parseInline;
dn.Parser = Hr;
dn.parser = Hr.parse;
dn.Renderer = el;
dn.TextRenderer = Mh;
dn.Lexer = Fr;
dn.lexer = Fr.lex;
dn.Tokenizer = Qa;
dn.Hooks = ms;
dn.parse = dn;
dn.options;
dn.setOptions;
dn.use;
dn.walkTokens;
dn.parseInline;
Hr.parse;
Fr.lex;
const nE = /* @__PURE__ */ wr("div")({
  name: "MarkdownContainer",
  class: "gdg-mnuv029",
  propsAsIs: !1
});
class rE extends Mt.PureComponent {
  constructor() {
    super(...arguments);
    Ve(this, "targetElement", null);
    Ve(this, "containerRefHook", (n) => {
      this.targetElement = n, this.renderMarkdownIntoDiv();
    });
  }
  renderMarkdownIntoDiv() {
    const { targetElement: n, props: r } = this;
    if (n === null)
      return;
    const { contents: i, createNode: o } = r, s = dn(i), a = document.createRange();
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
    return this.renderMarkdownIntoDiv(), Mt.createElement(nE, { ref: this.containerRefHook });
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
    let f = c[d], h = (a = n.get(d)) != null ? a : i, p = h * f / l, g = u * p * r / f, m = h + g;
    n.set(d, m);
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
        let m = dE(t, h, r, n, p, g, f), y = h.slice(0, Math.max(0, m));
        h = h.slice(y.length), l.push(y), p = ks(t, h.slice(0, Math.max(0, d)), n, f), g = Math.min(h.length, d);
      }
      p > 0 && l.push(h);
    }
  }
  return l = l.map((h, p) => p === 0 ? h.trimEnd() : h.trim()), Mo.set(s, l), Mo.size > 500 && Mo.delete(Mo.keys().next().value), l;
}
function hE(t, e) {
  return Mt.useMemo(() => t.map((n, r) => ({
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
    const g = o - 1 - p, m = typeof s == "number" ? s : s(g);
    if (d -= m, t >= d)
      return g;
  }
  const f = o - c, h = t - (l ?? 0);
  if (typeof s == "number") {
    const p = Math.floor((h - u) / s) + a;
    return p >= f ? void 0 : p;
  } else {
    let p = u;
    for (let g = a; g < f; g++) {
      const m = s(g);
      if (h <= p + m)
        return g;
      p += m;
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
  const m = r + o / 2 - p / 2;
  let y = Math.max(r + a.cellVerticalPadding, m);
  for (const b of d)
    if (y1(t, b, n, y, i, f, s, a, l), y += h, y > r + o)
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
    let p = Math.asin(f < -1 ? -1 : f > 1 ? 1 : f), g = 1, m = !1;
    h < 0 ? p < 0 ? p = Math.PI + p : (p = Math.PI - p, g = -1, m = !0) : p > 0 && (g = -1, m = !0), i = l.radius !== void 0 ? l.radius : n;
    const y = p / 2;
    let b = Math.abs(Math.cos(y) * i / Math.sin(y)), T;
    b > Math.min(u.len / 2, d.len / 2) ? (b = Math.min(u.len / 2, d.len / 2), T = Math.abs(b * Math.sin(y) / Math.cos(y))) : T = i;
    let A = l.x + d.nx * b, v = l.y + d.ny * b;
    A += -d.ny * T * g, v += d.nx * T * g, t.arc(A, v, T, u.ang + Math.PI / 2 * g, d.ang - Math.PI / 2 * g, m), s = l, l = c;
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
  const m = o - i;
  if (t >= d) {
    const y = s > t ? -1 : 1, b = Wo(h);
    g.x += b + l;
    for (let T = s; T !== t; T += y)
      g.x += h[y === 1 ? T : T - 1].width * y;
  } else
    for (let y = 0; y < t; y++)
      g.x += h[y].width;
  if (g.width = h[t].width + 1, e === -1)
    g.y = i, g.height = m;
  else if (e === -2) {
    g.y = 0, g.height = i;
    let y = t;
    const b = h[t].group, T = h[t].sticky;
    for (; y > 0 && Ns(h[y - 1].group, b) && h[y - 1].sticky === T; ) {
      const v = h[y - 1];
      g.x -= v.width, g.width += v.width, y--;
    }
    let A = t;
    for (; A + 1 < h.length && Ns(h[A + 1].group, b) && h[A + 1].sticky === T; ) {
      const v = h[A + 1];
      g.width += v.width, A++;
    }
    if (!T) {
      const v = Wo(h), C = g.x - v;
      C < 0 && (g.x -= C, g.width += C), g.x + g.width > n && (g.width = n - g.x);
    }
  } else if (e >= u - f) {
    let y = u - e;
    for (g.y = r; y > 0; ) {
      const b = e + y - 1;
      g.height = typeof p == "number" ? p : p(b), g.y -= g.height, y--;
    }
    g.height += 1;
  } else {
    const y = a > e ? -1 : 1;
    if (typeof p == "number") {
      const b = e - a;
      g.y += b * p;
    } else
      for (let b = a; b !== e; b += y)
        g.y += p(b) * y;
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
    Ve(this, "visibleWindow", {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    });
    Ve(this, "freezeCols", 0);
    Ve(this, "freezeRows", []);
    Ve(this, "isInWindow", (e) => {
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
    Ve(this, "cache", /* @__PURE__ */ new Map());
    Ve(this, "setValue", (n, r) => {
      this.cache.set(qr(n[0], n[1]), r);
    });
    Ve(this, "getValue", (n) => this.cache.get(qr(n[0], n[1])));
    Ve(this, "clearOutOfWindow", () => {
      for (const [n] of this.cache.entries())
        this.isInWindow(n) || this.cache.delete(n);
    });
  }
}
class Rs {
  constructor(e = []) {
    Ve(this, "cells");
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
const IE = Mt.createContext(x1);
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
  const p = w.useRef({}), g = w.useRef(), [m, y] = w.useState();
  return w.useLayoutEffect(() => {
    const b = u.current;
    if (b === void 0 || t.every(va))
      return;
    let T = Math.max(1, 10 - Math.floor(t.length / 1e4)), A = 0;
    T < c.current && T > 1 && (T--, A = 1);
    const v = {
      x: 0,
      y: 0,
      width: t.length,
      height: Math.min(c.current, T)
    }, C = {
      x: 0,
      y: c.current - 1,
      width: t.length,
      height: 1
    };
    (async () => {
      const P = b(v, l.signal), S = A > 0 ? b(C, l.signal) : void 0;
      let z;
      typeof P == "object" ? z = P : z = await jg(P), S !== void 0 && (typeof S == "object" ? z = [...z, ...S] : z = [...z, ...await jg(S)]), g.current = t, y(z);
    })();
  }, [l.signal, t]), w.useMemo(() => {
    let T = t.every(va) ? t : h === null ? t.map((D) => va(D) ? D : {
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
      if (m === void 0 || g.current !== t || D.id === void 0)
        return {
          ...D,
          width: Af
        };
      const S = k1(h, s, D, P, m, i, o, !0, a);
      return p.current[D.id] = S.width, S;
    })), A = 0, v = 0;
    const C = [];
    for (const [D, P] of T.entries())
      A += P.width, P.grow !== void 0 && P.grow > 0 && (v += P.grow, C.push(D));
    if (A < r && C.length > 0) {
      const D = [...T], P = r - A;
      let S = P;
      for (let z = 0; z < C.length; z++) {
        const k = C[z], x = (T[k].grow ?? 0) / v, E = z === C.length - 1 ? S : Math.min(S, Math.floor(P * x));
        D[k] = {
          ...T[k],
          growOffset: E,
          width: T[k].width + E
        }, S -= E;
      }
      T = D;
    }
    return {
      sizedColumns: T,
      nonGrowWidth: A
    };
  }, [r, t, h, m, s, i, o, a]);
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
    var d = -1, f = e, h = l.length, p = !0, g = [], m = g;
    if (u)
      p = !1, f = n;
    else if (h >= s) {
      var y = c ? null : i(l);
      if (y)
        return o(y);
      p = !1, f = r, m = new t();
    } else
      m = c ? [] : g;
    e:
      for (; ++d < h; ) {
        var b = l[d], T = c ? c(b) : b;
        if (b = u || b !== 0 ? b : 0, p && T === T) {
          for (var A = m.length; A--; )
            if (m[A] === T)
              continue e;
          c && m.push(T), g.push(b);
        } else f(m, T, u) || (m !== g && m.push(T), g.push(b));
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
const Yi = /* @__PURE__ */ Ni(iM), xn = '<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">', oM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${xn}<rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/><path d="M15.75 4h-1.5a.25.25 0 0 0-.177.074L9.308 8.838a3.75 3.75 0 1 0 1.854 1.854l1.155-1.157.967.322a.5.5 0 0 0 .65-.55l-.18-1.208.363-.363.727.331a.5.5 0 0 0 .69-.59l-.254-.904.647-.647A.25.25 0 0 0 16 5.75v-1.5a.25.25 0 0 0-.25-.25zM7.5 13.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z" fill="${e}"/></svg>`;
}, sM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${xn}<rect x="2" y="2" width="16" height="16" rx="4" fill="${n}"/><path d="m12.223 13.314 3.052-2.826a.65.65 0 0 0 0-.984l-3.052-2.822c-.27-.25-.634-.242-.865.022-.232.263-.206.636.056.882l2.601 2.41-2.601 2.41c-.262.245-.288.619-.056.882.231.263.595.277.865.026Zm-4.444.005c.266.25.634.241.866-.027.231-.263.206-.636-.06-.882L5.983 10l2.602-2.405c.266-.25.291-.62.06-.887-.232-.263-.596-.272-.866-.022L4.723 9.51a.653.653 0 0 0 0 .983l3.056 2.827Z" fill="${e}"/></svg>`;
}, aM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${xn}
    <path d="M16.22 2H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.77-.8 1.77-1.78L18 3.78C18 2.8 17.2 2 16.22 2z" fill="${n}"/>
    <path d="M6.52 12.78H5.51V8.74l-1.33.47v-.87l2.29-.83h.05v5.27zm5.2 0H8.15v-.69l1.7-1.83a6.38 6.38 0 0 0 .34-.4c.09-.11.16-.22.22-.32s.1-.19.12-.27a.9.9 0 0 0 0-.56.63.63 0 0 0-.15-.23.58.58 0 0 0-.22-.15.75.75 0 0 0-.29-.05c-.27 0-.48.08-.62.23a.95.95 0 0 0-.2.65H8.03c0-.24.04-.46.13-.67a1.67 1.67 0 0 1 .97-.91c.23-.1.49-.14.77-.14.26 0 .5.04.7.11.21.08.38.18.52.32.14.13.25.3.32.48a1.74 1.74 0 0 1 .03 1.13 2.05 2.05 0 0 1-.24.47 4.16 4.16 0 0 1-.35.47l-.47.5-1 1.05h2.32v.8zm1.8-3.08h.55c.28 0 .48-.06.61-.2a.76.76 0 0 0 .2-.55.8.8 0 0 0-.05-.28.56.56 0 0 0-.13-.22.6.6 0 0 0-.23-.15.93.93 0 0 0-.32-.05.92.92 0 0 0-.29.05.72.72 0 0 0-.23.12.57.57 0 0 0-.21.46H12.4a1.3 1.3 0 0 1 .5-1.04c.15-.13.33-.23.54-.3a2.48 2.48 0 0 1 1.4 0c.2.06.4.15.55.28.15.13.27.28.36.47.08.19.13.4.13.65a1.15 1.15 0 0 1-.2.65 1.36 1.36 0 0 1-.58.49c.15.05.28.12.38.2a1.14 1.14 0 0 1 .43.62c.03.13.05.26.05.4 0 .25-.05.47-.14.66a1.42 1.42 0 0 1-.4.49c-.16.13-.35.23-.58.3a2.51 2.51 0 0 1-.73.1c-.22 0-.44-.03-.65-.09a1.8 1.8 0 0 1-.57-.28 1.43 1.43 0 0 1-.4-.47 1.41 1.41 0 0 1-.15-.66h1a.66.66 0 0 0 .22.5.87.87 0 0 0 .58.2c.25 0 .45-.07.6-.2a.71.71 0 0 0 .21-.56.97.97 0 0 0-.06-.36.61.61 0 0 0-.18-.25.74.74 0 0 0-.28-.15 1.33 1.33 0 0 0-.37-.04h-.55V9.7z" fill="${e}"/>
  </svg>`;
}, lM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${xn}
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${n}"/>
  <path d="M8.182 12.4h3.636l.655 1.6H14l-3.454-8H9.455L6 14h1.527l.655-1.6zM10 7.44l1.36 3.651H8.64L10 7.441z" fill="${e}"/>
</svg>`;
}, cM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${xn}
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
  return `${xn}
<path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${n}"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.29 4.947a3.368 3.368 0 014.723.04 3.375 3.375 0 01.041 4.729l-.009.009-1.596 1.597a3.367 3.367 0 01-5.081-.364.71.71 0 011.136-.85 1.95 1.95 0 002.942.21l1.591-1.593a1.954 1.954 0 00-.027-2.733 1.95 1.95 0 00-2.732-.027l-.91.907a.709.709 0 11-1.001-1.007l.915-.911.007-.007z" fill="${e}"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.55 8.678a3.368 3.368 0 015.082.364.71.71 0 01-1.136.85 1.95 1.95 0 00-2.942-.21l-1.591 1.593a1.954 1.954 0 00.027 2.733 1.95 1.95 0 002.73.028l.906-.906a.709.709 0 111.003 1.004l-.91.91-.008.01a3.368 3.368 0 01-4.724-.042 3.375 3.375 0 01-.041-4.728l.009-.009L6.55 8.678z" fill="${e}"/>
</svg>
  `;
}, uM = (t) => {
  const e = t.bgColor;
  return `${xn}
    <path stroke="${e}" stroke-width="2" d="M12 3v14"/>
    <path stroke="${e}" stroke-width="2" stroke-linecap="round" d="M10 4h4m-4 12h4"/>
    <path d="M11 14h4a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-4v2h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4v2ZM9.5 8H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h4.5v2H5a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h4.5v2Z" fill="${e}"/>
  </svg>
`;
}, dM = E1, fM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${xn}
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${n}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M7 13.138a.5.5 0 00.748.434l5.492-3.138a.5.5 0 000-.868L7.748 6.427A.5.5 0 007 6.862v6.276z" fill="${e}"/>
</svg>`;
}, hM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${xn}
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
  return `${xn}
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${n}"/>
  <path opacity=".5" fill-rule="evenodd" clip-rule="evenodd" d="M12.499 10.801a.5.5 0 01.835 0l2.698 4.098a.5.5 0 01-.418.775H10.22a.5.5 0 01-.417-.775l2.697-4.098z" fill="${e}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.07 8.934a.5.5 0 01.824 0l4.08 5.958a.5.5 0 01-.412.782h-8.16a.5.5 0 01-.413-.782l4.08-5.958zM13.75 8.333a2.083 2.083 0 100-4.166 2.083 2.083 0 000 4.166z" fill="${e}"/>
</svg>`;
}, gM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${xn}
    <path fill="${e}" d="M3 3h14v14H3z"/>
    <path d="M16.22 2H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.77-.8 1.77-1.78L18 3.78C18 2.8 17.2 2 16.22 2zm-7.24 9.78h1.23c.15 0 .27.06.36.18l.98 1.28a.43.43 0 0 1-.05.58l-1.2 1.21a.45.45 0 0 1-.6.04A6.72 6.72 0 0 1 7.33 10c0-.61.1-1.2.25-1.78a6.68 6.68 0 0 1 2.12-3.3.44.44 0 0 1 .6.04l1.2 1.2c.16.17.18.42.05.59l-.98 1.29a.43.43 0 0 1-.36.17H8.98A5.38 5.38 0 0 0 8.67 10c0 .62.11 1.23.3 1.79z" fill="${n}"/>
  </svg>`;
}, mM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${xn}
    <path d="M16.22 2H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.77-.8 1.77-1.78L18 3.78C18 2.8 17.2 2 16.22 2z" fill="${n}"/>
    <path d="m13.49 13.15-2.32-3.27h1.4V7h1.86v2.88h1.4l-2.34 3.27zM11 13H9v-3l-1.5 1.92L6 10v3H4V7h2l1.5 2L9 7h2v6z" fill="${e}"/>
  </svg>`;
}, yM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${xn}
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${n}"/>
  <path d="M14.8 4.182h-.6V3H13v1.182H7V3H5.8v1.182h-.6c-.66 0-1.2.532-1.2 1.182v9.454C4 15.468 4.54 16 5.2 16h9.6c.66 0 1.2-.532 1.2-1.182V5.364c0-.65-.54-1.182-1.2-1.182zm0 10.636H5.2V7.136h9.6v7.682z" fill="${e}"/>
</svg>`;
}, bM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${xn}
    <path d="M16.22 2H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.77-.8 1.77-1.78L18 3.78C18 2.8 17.2 2 16.22 2z" fill="${n}"/>
    <path d="M10 4a6 6 0 0 0-6 6 6 6 0 0 0 6 6 6 6 0 0 0 6-6 6 6 0 0 0-6-6zm0 10.8A4.8 4.8 0 0 1 5.2 10a4.8 4.8 0 1 1 4.8 4.8z" fill="${e}"/>
    <path d="M10 7H9v3.93L12.5 13l.5-.8-3-1.76V7z" fill="${e}"/>
  </svg>`;
}, vM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${xn}
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 8.643a1.357 1.357 0 100 2.714 1.357 1.357 0 000-2.714zM7.357 10a2.643 2.643 0 115.286 0 2.643 2.643 0 01-5.286 0z" fill="${e}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.589 4.898A5.643 5.643 0 0115.643 10v.5a2.143 2.143 0 01-4.286 0V8a.643.643 0 011.286 0v2.5a.857.857 0 001.714 0V10a4.357 4.357 0 10-1.708 3.46.643.643 0 01.782 1.02 5.643 5.643 0 11-5.842-9.582z" fill="${e}"/>
</svg>`;
}, wM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${xn}
    <rect x="2" y="8" width="10" height="8" rx="2" fill="${n}"/>
    <rect x="8" y="4" width="10" height="8" rx="2" fill="${n}"/>
    <path d="M10.68 7.73V6l2.97 3.02-2.97 3.02v-1.77c-2.13 0-3.62.7-4.68 2.2.43-2.15 1.7-4.31 4.68-4.74z" fill="${e}"/>
  </svg>`;
}, xM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${xn}
  <path fill="${e}" d="M4 3h12v14H4z"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.6 2A1.6 1.6 0 002 3.6v12.8A1.6 1.6 0 003.6 18h12.8a1.6 1.6 0 001.6-1.6V3.6A1.6 1.6 0 0016.4 2H3.6zm11.3 10.8a.7.7 0 01.7.7v1.4a.7.7 0 01-.7.7h-1.4a.7.7 0 01-.7-.7v-1.4a.7.7 0 01.6-.693.117.117 0 00.1-.115V10.35a.117.117 0 00-.117-.116h-2.8a.117.117 0 00-.117.116v2.333c0 .064.053.117.117.117h.117a.7.7 0 01.7.7v1.4a.7.7 0 01-.7.7H9.3a.7.7 0 01-.7-.7v-1.4a.7.7 0 01.7-.7h.117a.117.117 0 00.117-.117V10.35a.117.117 0 00-.117-.117h-2.8a.117.117 0 00-.117.117v2.342c0 .058.042.106.1.115a.7.7 0 01.6.693v1.4a.7.7 0 01-.7.7H5.1a.7.7 0 01-.7-.7v-1.4a.7.7 0 01.7-.7h.35a.116.116 0 00.116-.117v-2.45c0-.515.418-.933.934-.933h2.917a.117.117 0 00.117-.117V6.85a.117.117 0 00-.117-.116h-2.45a.7.7 0 01-.7-.7V5.1a.7.7 0 01.7-.7h6.067a.7.7 0 01.7.7v.934a.7.7 0 01-.7.7h-2.45a.117.117 0 00-.118.116v2.333c0 .064.053.117.117.117H13.5c.516 0 .934.418.934.934v2.45c0 .063.052.116.116.116h.35z" fill="${n}"/>
</svg>`;
}, kM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${xn}
    <rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/>
    <path d="M9.98 13.33c.45 0 .74-.3.73-.75l-.01-.1-.16-1.67 1.45 1.05a.81.81 0 0 0 .5.18c.37 0 .72-.32.72-.76 0-.3-.17-.54-.49-.68l-1.63-.77 1.63-.77c.32-.14.49-.37.49-.67 0-.45-.34-.76-.71-.76a.81.81 0 0 0-.5.18l-1.47 1.03.16-1.74.01-.08c.01-.46-.27-.76-.72-.76-.46 0-.76.32-.75.76l.01.08.16 1.74-1.47-1.03a.77.77 0 0 0-.5-.18.74.74 0 0 0-.72.76c0 .3.17.53.49.67l1.63.77-1.62.77c-.32.14-.5.37-.5.68 0 .44.35.75.72.75a.78.78 0 0 0 .5-.17L9.4 10.8l-.16 1.68v.09c-.02.44.28.75.74.75z" fill="${e}"/>
  </svg>`;
}, SM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${xn}
    <rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/>
    <path d="M8 5.83H5.83a.83.83 0 0 0 0 1.67h1.69A4.55 4.55 0 0 1 8 5.83zm-.33 3.34H5.83a.83.83 0 0 0 0 1.66h2.72a4.57 4.57 0 0 1-.88-1.66zM5.83 12.5a.83.83 0 0 0 0 1.67h7.5a.83.83 0 1 0 0-1.67h-7.5zm8.8-2.9a3.02 3.02 0 0 0 .46-1.6c0-1.66-1.32-3-2.94-3C10.52 5 9.2 6.34 9.2 8s1.31 3 2.93 3c.58 0 1.11-.17 1.56-.47l2.04 2.08.93-.94-2.04-2.08zm-2.48.07c-.9 0-1.63-.75-1.63-1.67s.73-1.67 1.63-1.67c.9 0 1.63.75 1.63 1.67s-.73 1.67-1.63 1.67z" fill="${e}"/>
  </svg>`;
}, CM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${xn}
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/>
  <path d="M7.676 4.726V3l2.976 3.021-2.976 3.022v-1.77c-2.125 0-3.613.69-4.676 2.201.425-2.158 1.7-4.316 4.676-4.748zM10.182 14.4h3.636l.655 1.6H16l-3.454-8h-1.091L8 16h1.527l.655-1.6zM12 9.44l1.36 3.65h-2.72L12 9.44z" fill="${e}"/>
</svg>`;
}, RM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${xn}
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.167 5.417a.833.833 0 100 1.666h4.166a.833.833 0 100-1.666H4.167z" fill="${e}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.083 4.167a.833.833 0 10-1.666 0v4.166a.833.833 0 101.666 0V4.167zM11.667 5.417a.833.833 0 100 1.666h4.166a.833.833 0 100-1.666h-4.166zM5.367 11.688a.833.833 0 00-1.179 1.179l2.947 2.946a.833.833 0 001.178-1.178l-2.946-2.947z" fill="${e}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.313 12.867a.833.833 0 10-1.178-1.179l-2.947 2.947a.833.833 0 101.179 1.178l2.946-2.946z" fill="${e}"/>
  <path d="M10.833 12.5c0-.46.373-.833.834-.833h4.166a.833.833 0 110 1.666h-4.166a.833.833 0 01-.834-.833zM10.833 15c0-.46.373-.833.834-.833h4.166a.833.833 0 110 1.666h-4.166a.833.833 0 01-.834-.833z" fill="${e}"/>
</svg>`;
}, TM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${xn}
    <path d="M16.22 2H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.77-.8 1.77-1.78L18 3.78C18 2.8 17.2 2 16.22 2z" fill="${n}"/>
    <path d="M10 8.84a1.16 1.16 0 1 0 0 2.32 1.16 1.16 0 0 0 0-2.32zm3.02 3.61a3.92 3.92 0 0 0 .78-3.28.49.49 0 1 0-.95.2c.19.87-.02 1.78-.58 2.47a2.92 2.92 0 1 1-4.13-4.08 2.94 2.94 0 0 1 2.43-.62.49.49 0 1 0 .17-.96 3.89 3.89 0 1 0 2.28 6.27zM10 4.17a5.84 5.84 0 0 0-5.44 7.93.49.49 0 1 0 .9-.35 4.86 4.86 0 1 1 2.5 2.67.49.49 0 1 0-.4.88c.76.35 1.6.54 2.44.53a5.83 5.83 0 0 0 0-11.66zm3.02 3.5a.7.7 0 1 0-1.4 0 .7.7 0 0 0 1.4 0zm-6.97 5.35a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4z" fill="${e}"/>
  </svg>`;
}, EM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${xn}
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/>
  <path d="M12.4 13.565c1.865-.545 3.645-2.083 3.645-4.396 0-1.514-.787-2.604-2.071-2.604C12.69 6.565 12 7.63 12 8.939c1.114.072 1.865.726 1.865 1.683 0 .933-.8 1.647-1.84 2.023l.375.92zM4 5h6v2H4zM4 9h5v2H4zM4 13h4v2H4z" fill="${e}"/>
</svg>`;
}, MM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${xn}
    <rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/>
    <path d="M12.4 13.56c1.86-.54 3.65-2.08 3.65-4.4 0-1.5-.8-2.6-2.08-2.6S12 7.64 12 8.95c1.11.07 1.86.73 1.86 1.68 0 .94-.8 1.65-1.83 2.03l.37.91zM4 5h6v2H4zm0 4h5v2H4zm0 4h4v2H4z" fill="${e}"/>
  </svg>`;
}, IM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${xn}
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${n}"/>
  <path d="M10 7a1 1 0 100-2v2zm0 6a1 1 0 100 2v-2zm0-8H7v2h3V5zm-3 6h5V9H7v2zm5 2h-2v2h2v-2zm1-1a1 1 0 01-1 1v2a3 3 0 003-3h-2zm-1-1a1 1 0 011 1h2a3 3 0 00-3-3v2zM4 8a3 3 0 003 3V9a1 1 0 01-1-1H4zm3-3a3 3 0 00-3 3h2a1 1 0 011-1V5z" fill="${e}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.856 12.014a.5.5 0 00-.712.702L5.409 14l-1.265 1.284a.5.5 0 00.712.702l1.255-1.274 1.255 1.274a.5.5 0 00.712-.702L6.813 14l1.265-1.284a.5.5 0 00-.712-.702L6.11 13.288l-1.255-1.274zM12.856 4.014a.5.5 0 00-.712.702L13.409 6l-1.265 1.284a.5.5 0 10.712.702l1.255-1.274 1.255 1.274a.5.5 0 10.712-.702L14.813 6l1.265-1.284a.5.5 0 00-.712-.702L14.11 5.288l-1.255-1.274z" fill="${e}"/>
</svg>`;
}, AM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${xn}
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
    Ve(this, "onSettled");
    Ve(this, "spriteMap", /* @__PURE__ */ new Map());
    Ve(this, "headerIcons");
    Ve(this, "inFlight", 0);
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
      const m = new Image();
      m.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(p({ fgColor: u, bgColor: c }))}`, this.spriteMap.set(f, h);
      const y = m.decode();
      if (y === void 0)
        return;
      this.inFlight++, y.then(() => {
        g.drawImage(m, 0, 0, d, d);
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
    for (let m = o.sourceIndex - 1; m >= h; m--)
      p -= s[m].width, g += s[m].width;
    for (let m = o.sourceIndex + 1; m <= l; m++)
      g += s[m].width;
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
    for (let m = o.sourceIndex - 1; m >= a; m--)
      p -= s[m].width, g += s[m].width;
    for (let m = o.sourceIndex + 1; m <= h; m++)
      g += s[m].width;
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
  const [o, s, a, l] = e, [c, u, d, f] = i, { x: h, y: p, width: g, height: m } = t, y = [];
  if (g <= 0 || m <= 0)
    return y;
  const b = h + g, T = p + m, A = h < o, v = p < s, C = h + g > a, D = p + m > l, P = h >= o && h < a || b > o && b <= a || h < o && b > a, S = p >= s && p < l || T > s && T <= l || p < s && T > l;
  if (P && S) {
    const k = Math.max(h, o), x = Math.max(p, s), E = Math.min(b, a), I = Math.min(T, l);
    y.push({
      rect: { x: k, y: x, width: E - k, height: I - x },
      clip: {
        x: c,
        y: u,
        width: d - c + 1,
        height: f - u + 1
      }
    });
  }
  if (A && v) {
    const k = h, x = p, E = Math.min(b, o), I = Math.min(T, s);
    y.push({
      rect: {
        x: k,
        y: x,
        width: E - k,
        height: I - x
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
    const k = Math.max(h, o), x = p, E = Math.min(b, a), I = Math.min(T, s);
    y.push({
      rect: {
        x: k,
        y: x,
        width: E - k,
        height: I - x
      },
      clip: {
        x: c,
        y: 0,
        width: d - c + 1,
        height: u + 1
      }
    });
  }
  if (v && C) {
    const k = Math.max(h, a), x = p, E = b, I = Math.min(T, s);
    y.push({
      rect: {
        x: k,
        y: x,
        width: E - k,
        height: I - x
      },
      clip: {
        x: d,
        y: 0,
        width: n - d + 1,
        height: u + 1
      }
    });
  }
  if (A && S) {
    const k = h, x = Math.max(p, s), E = Math.min(b, o), I = Math.min(T, l);
    y.push({
      rect: {
        x: k,
        y: x,
        width: E - k,
        height: I - x
      },
      clip: {
        x: 0,
        y: u,
        width: c + 1,
        height: f - u + 1
      }
    });
  }
  if (C && S) {
    const k = Math.max(h, a), x = Math.max(p, s), E = b, I = Math.min(T, l);
    y.push({
      rect: {
        x: k,
        y: x,
        width: E - k,
        height: I - x
      },
      clip: {
        x: d,
        y: u,
        width: n - d + 1,
        height: f - u + 1
      }
    });
  }
  if (A && D) {
    const k = h, x = Math.max(p, l), E = Math.min(b, o), I = T;
    y.push({
      rect: {
        x: k,
        y: x,
        width: E - k,
        height: I - x
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
    const k = Math.max(h, o), x = Math.max(p, l), E = Math.min(b, a), I = T;
    y.push({
      rect: {
        x: k,
        y: x,
        width: E - k,
        height: I - x
      },
      clip: {
        x: c,
        y: f,
        width: d - c + 1,
        height: r - f + 1
      }
    });
  }
  if (C && D) {
    const k = Math.max(h, a), x = Math.max(p, l), E = b, I = T;
    y.push({
      rect: {
        x: k,
        y: x,
        width: E - k,
        height: I - x
      },
      clip: {
        x: d,
        y: f,
        width: n - d + 1,
        height: r - f + 1
      }
    });
  }
  return y;
}
const HM = {
  kind: Fe.Loading,
  allowOverlay: !1
};
function f0(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g, m, y, b, T, A, v, C, D, P, S, z, k, x, E, I, M, N, L, W) {
  let oe = (T == null ? void 0 : T.size) ?? Number.MAX_SAFE_INTEGER;
  const F = performance.now();
  let O = E.baseFontFull;
  t.font = O;
  const ne = { ctx: t }, j = [0, 0], U = m > 0 ? uo(l, m, c) : 0;
  let re, q;
  const ie = M1(b);
  return zi(e, a, o, s, i, (Z, Q, Y, ce, fe) => {
    const Ee = Math.max(0, ce - Q), xe = Q + Ee, ze = i + 1, Qe = Z.width - Ee, dt = r - i - 1;
    if (b.length > 0) {
      let Le = !1;
      for (let Je = 0; Je < b.length; Je++) {
        const yt = b[Je];
        if (Os(xe, ze, Qe, dt, yt.x, yt.y, yt.width, yt.height)) {
          Le = !0;
          break;
        }
      }
      if (!Le)
        return;
    }
    const et = () => {
      t.save(), t.beginPath(), t.rect(xe, ze, Qe, dt), t.clip();
    }, te = A.columns.hasIndex(Z.sourceIndex), Ae = d(Z.group ?? "").overrideTheme, _e = Z.themeOverride === void 0 && Ae === void 0 ? E : fi(E, Ae, Z.themeOverride), We = _e.baseFontFull;
    We !== O && (O = We, t.font = We), et();
    let He;
    return Rl(fe, Y, r, l, c, m, y, ie, (Le, Je, yt, ve, je) => {
      var Ie, nt, Kt;
      if (Je < 0 || (j[0] = Z.sourceIndex, j[1] = Je, T !== void 0 && !T.has(j)))
        return;
      if (b.length > 0) {
        let lt = !1;
        for (let ee = 0; ee < b.length; ee++) {
          const ke = b[ee];
          if (Os(Q, Le, Z.width, yt, ke.x, ke.y, ke.width, ke.height)) {
            lt = !0;
            break;
          }
        }
        if (!lt)
          return;
      }
      const Ct = A.rows.hasIndex(Je), bt = h.hasIndex(Je), Xe = Je < l ? u(j) : HM;
      let Rt = Q, pt = Z.width, ft = !1, It = !1;
      if (Xe.span !== void 0) {
        const [lt, ee] = Xe.span, ke = `${Je},${lt},${ee},${Z.sticky}`;
        if (q === void 0 && (q = /* @__PURE__ */ new Set()), q.has(ke)) {
          oe--;
          return;
        } else {
          const Se = A1(Xe.span, Q, Le, Z.width, yt, Z, n), Ke = Z.sticky ? Se[0] : Se[1];
          if (!Z.sticky && Se[0] !== void 0 && (It = !0), Ke !== void 0) {
            Rt = Ke.x, pt = Ke.width, q.add(ke), t.restore(), He = void 0, t.save(), t.beginPath();
            const gt = Math.max(0, ce - Ke.x);
            t.rect(Ke.x + gt, Le, Ke.width - gt, yt), re === void 0 && (re = []), re.push({
              x: Ke.x + gt,
              y: Le,
              width: Ke.width - gt,
              height: yt
            }), t.clip(), ft = !0;
          }
        }
      }
      const $t = f == null ? void 0 : f(Je), en = je && ((Ie = Z.trailingRowOptions) == null ? void 0 : Ie.themeOverride) !== void 0 ? (nt = Z.trailingRowOptions) == null ? void 0 : nt.themeOverride : void 0, wt = Xe.themeOverride === void 0 && $t === void 0 && en === void 0 ? _e : fi(_e, $t, en, Xe.themeOverride);
      t.beginPath();
      const Nt = gE(j, Xe, A);
      let zt = mE(j, Xe, A, g);
      const kn = Xe.span !== void 0 && A.columns.some(
        (lt) => Xe.span !== void 0 && lt >= Xe.span[0] && lt <= Xe.span[1]
        //alloc
      );
      Nt && !p && g ? zt = 0 : Nt && g && (zt = Math.max(zt, 1)), kn && zt++, Nt || (Ct && zt++, te && !je && zt++);
      const on = Xe.kind === Fe.Protected ? wt.bgCellMedium : wt.bgCell;
      let de;
      if ((ve || on !== E.bgCell) && (de = yr(on, de)), zt > 0 || bt) {
        bt && (de = yr(wt.bgHeader, de));
        for (let lt = 0; lt < zt; lt++)
          de = yr(wt.accentLight, de);
      } else if (v !== void 0) {
        for (const lt of v)
          if (lt[0] === Z.sourceIndex && lt[1] === Je) {
            de = yr(wt.bgSearchResult, de);
            break;
          }
      }
      if (C !== void 0)
        for (let lt = 0; lt < C.length; lt++) {
          const ee = C[lt], ke = ee.range;
          ee.style !== "solid-outline" && ke.x <= Z.sourceIndex && Z.sourceIndex < ke.x + ke.width && ke.y <= Je && Je < ke.y + ke.height && (de = yr(ee.color, de));
        }
      let Me = !1;
      if (T !== void 0) {
        const lt = Le + 1, ke = (ve ? lt + yt - 1 : Math.min(lt + yt - 1, r - U)) - lt;
        (ke !== yt - 1 || Rt + 1 <= ce) && (Me = !0, t.save(), t.beginPath(), t.rect(Rt + 1, lt, pt - 1, ke), t.clip()), de = de === void 0 ? wt.bgCell : yr(de, wt.bgCell);
      }
      const K = Z.sourceIndex === n.length - 1, G = Je === l - 1;
      de !== void 0 && (t.fillStyle = de, He !== void 0 && (He.fillStyle = de), T !== void 0 ? t.fillRect(Rt + 1, Le + 1, pt - (K ? 2 : 1), yt - (G ? 2 : 1)) : t.fillRect(Rt, Le, pt, yt)), Xe.style === "faded" && (t.globalAlpha = 0.6);
      let we;
      for (let lt = 0; lt < S.length; lt++) {
        const ee = S[lt];
        if (ee.item[0] === Z.sourceIndex && ee.item[1] === Je) {
          we = ee;
          break;
        }
      }
      if (pt > W && !It) {
        const lt = wt.baseFontFull;
        lt !== O && (t.font = lt, O = lt), He = P1(t, Xe, Z.sourceIndex, Je, K, G, Rt, Le, pt, yt, zt > 0, wt, de ?? wt.bgCell, D, P, (we == null ? void 0 : we.hoverAmount) ?? 0, z, x, F, k, He, I, M, N, L);
      }
      return Me && t.restore(), Xe.style === "faded" && (t.globalAlpha = 1), oe--, ft && (t.restore(), (Kt = He == null ? void 0 : He.deprep) == null || Kt.call(He, ne), He = void 0, et(), O = We, t.font = We), oe <= 0;
    }), t.restore(), oe <= 0;
  }), re;
}
const us = [0, 0], ds = { x: 0, y: 0, width: 0, height: 0 }, Xu = [void 0, () => {
}];
let _f = !1;
function BM() {
  _f = !0;
}
function P1(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g, m, y, b, T, A, v, C, D, P) {
  var M, N;
  let S, z;
  m !== void 0 && m[0][0] === n && m[0][1] === r && (S = m[1][0], z = m[1][1]);
  let k;
  us[0] = n, us[1] = r, ds.x = s, ds.y = a, ds.width = l, ds.height = c, Xu[0] = C.getValue(us), Xu[1] = (L) => C.setValue(us, L), _f = !1;
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
    hoverX: S,
    drawState: Xu,
    hoverY: z,
    imageLoader: h,
    spriteManager: p,
    hyperWrapping: y,
    overrideCursor: S !== void 0 ? P : void 0,
    requestAnimationFrame: BM
  }, E = kE(x, e.lastUpdated, b, A, i, o), I = D(e);
  if (I !== void 0) {
    (A == null ? void 0 : A.renderer) !== I && ((M = A == null ? void 0 : A.deprep) == null || M.call(A, x), A = void 0);
    const L = (N = I.drawPrep) == null ? void 0 : N.call(I, x, A);
    T !== void 0 && !_o(x.cell) ? T(x, () => I.draw(x, e)) : I.draw(x, e), k = L === void 0 ? void 0 : {
      deprep: L == null ? void 0 : L.deprep,
      fillStyle: L == null ? void 0 : L.fillStyle,
      font: L == null ? void 0 : L.font,
      renderer: I
    };
  }
  return (E || _f) && (v == null || v(us)), k;
}
function Oh(t, e, n, r, i, o, s, a, l = -20, c = -20, u = void 0, d = "center", f = "square") {
  const h = Math.floor(i + s / 2), p = f === "circle" ? 1e4 : e.roundingRadius ?? 4;
  let g = Zv(u ?? e.checkboxMaxSize, s, e.cellVerticalPadding), m = g / 2;
  const y = Jv(d, r, o, e.cellHorizontalPadding, g), b = Vv(y, h, g), T = Qv(r + l, i + c, b);
  switch (n) {
    case !0: {
      t.beginPath(), ei(t, y - g / 2, h - g / 2, g, g, p), f === "circle" && (m *= 0.8, g *= 0.8), t.fillStyle = a ? e.accentColor : e.textMedium, t.fill(), t.beginPath(), t.moveTo(y - m + g / 4.23, h - m + g / 1.97), t.lineTo(y - m + g / 2.42, h - m + g / 1.44), t.lineTo(y - m + g / 1.29, h - m + g / 3.25), t.strokeStyle = e.bgCell, t.lineJoin = "round", t.lineCap = "round", t.lineWidth = 1.9, t.stroke();
      break;
    }
    case Xa:
    case !1: {
      t.beginPath(), ei(t, y - g / 2 + 0.5, h - g / 2 + 0.5, g - 1, g - 1, p), t.lineWidth = 1, t.strokeStyle = T ? e.textDark : e.textMedium, t.stroke();
      break;
    }
    case hh: {
      t.beginPath(), ei(t, y - g / 2, h - g / 2, g, g, p), t.fillStyle = T ? e.textMedium : e.textLight, t.fill(), f === "circle" && (m *= 0.8, g *= 0.8), t.beginPath(), t.moveTo(y - g / 3, h), t.lineTo(y + g / 3, h), t.strokeStyle = e.bgCell, t.lineCap = "round", t.lineWidth = 1.9, t.stroke();
      break;
    }
    default:
      Ds();
  }
}
function qM(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g, m, y, b) {
  var S, z, k, x;
  const T = s + a;
  if (T <= 0)
    return;
  t.fillStyle = d.bgHeader, t.fillRect(0, 0, i, T);
  const A = (S = r == null ? void 0 : r[0]) == null ? void 0 : S[0], v = (z = r == null ? void 0 : r[0]) == null ? void 0 : z[1], C = (k = r == null ? void 0 : r[1]) == null ? void 0 : k[0], D = (x = r == null ? void 0 : r[1]) == null ? void 0 : x[1], P = d.headerFontFull;
  t.font = P, zi(e, 0, o, 0, T, (E, I, M, N) => {
    var Z;
    if (m !== void 0 && !m.has([E.sourceIndex, -1]))
      return;
    const L = Math.max(0, N - I);
    t.save(), t.beginPath(), t.rect(I + L, a, E.width - L, s), t.clip();
    const W = g(E.group ?? "").overrideTheme, oe = E.themeOverride === void 0 && W === void 0 ? d : fi(d, W, E.themeOverride);
    oe.bgHeader !== d.bgHeader && (t.fillStyle = oe.bgHeader, t.fill()), oe !== d && (t.font = oe.headerFontFull);
    const F = u.columns.hasIndex(E.sourceIndex), O = l !== void 0 || c || E.headerRowMarkerDisabled === !0, ne = !O && v === -1 && A === E.sourceIndex, j = O ? 0 : ((Z = h.find((Q) => Q.item[0] === E.sourceIndex && Q.item[1] === -1)) == null ? void 0 : Z.hoverAmount) ?? 0, U = (u == null ? void 0 : u.current) !== void 0 && u.current.cell[0] === E.sourceIndex, re = F ? oe.accentColor : U ? oe.bgHeaderHasFocus : oe.bgHeader, q = n ? a : 0, ie = E.sourceIndex === 0 ? 0 : 1;
    F ? (t.fillStyle = re, t.fillRect(I + ie, q, E.width - ie, s)) : (U || j > 0) && (t.beginPath(), t.rect(I + ie, q, E.width - ie, s), U && (t.fillStyle = oe.bgHeaderHasFocus, t.fill()), j > 0 && (t.globalAlpha = j, t.fillStyle = oe.bgHeaderHovered, t.fill(), t.globalAlpha = 1)), O1(t, I, q, E.width, s, E, F, oe, ne, ne ? C : void 0, ne ? D : void 0, U, j, f, y, b), t.restore();
  }), n && WM(t, e, i, o, a, r, d, f, h, p, g, m);
}
function WM(t, e, n, r, i, o, s, a, l, c, u, d) {
  const [h, p] = (o == null ? void 0 : o[0]) ?? [];
  let g = 0;
  I1(e, n, r, i, (m, y, b, T, A, v) => {
    if (d !== void 0 && !d.hasItemInRectangle({
      x: m[0],
      y: -2,
      width: m[1] - m[0] + 1,
      height: 1
    }))
      return;
    t.save(), t.beginPath(), t.rect(b, T, A, v), t.clip();
    const C = u(y), D = (C == null ? void 0 : C.overrideTheme) === void 0 ? s : fi(s, C.overrideTheme), P = p === -2 && h !== void 0 && h >= m[0] && h <= m[1], S = P ? D.bgGroupHeaderHovered ?? D.bgHeaderHovered : D.bgGroupHeader ?? D.bgHeader;
    if (S !== s.bgHeader && (t.fillStyle = S, t.fill()), t.fillStyle = D.textGroupHeader ?? D.textHeader, C !== void 0) {
      let z = b;
      if (C.icon !== void 0 && (a.drawSprite(C.icon, "normal", t, z + 8, (i - 20) / 2, 20, D), z += 26), t.fillText(C.name, z + 8, i / 2 + Oi(t, s.headerFontFull)), C.actions !== void 0 && P) {
        const k = D1({ x: b, y: T, width: A, height: v }, C.actions);
        t.beginPath();
        const x = k[0].x - 10, E = b + A - x;
        t.rect(x, 0, E, i);
        const I = t.createLinearGradient(x, 0, x + E, 0), M = io(S, 0);
        I.addColorStop(0, M), I.addColorStop(10 / E, S), I.addColorStop(1, S), t.fillStyle = I, t.fill(), t.globalAlpha = 0.6;
        const [N, L] = (o == null ? void 0 : o[1]) ?? [-1, -1];
        for (let W = 0; W < C.actions.length; W++) {
          const oe = C.actions[W], F = k[W], O = Qi(F, N + b, L);
          O && (t.globalAlpha = 1), a.drawSprite(oe.icon, "normal", t, F.x + F.width / 2 - 10, F.y + F.height / 2 - 10, 20, D), O && (t.globalAlpha = 0.6);
        }
        t.globalAlpha = 1;
      }
    }
    b !== 0 && c(m[0]) && (t.beginPath(), t.moveTo(b + 0.5, 0), t.lineTo(b + 0.5, i), t.strokeStyle = s.borderColor, t.lineWidth = 1, t.stroke()), t.restore(), g = b + A;
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
  var y;
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
    const b = t === void 0 ? ((y = m1(e.title, s.headerFontFull)) == null ? void 0 : y.width) ?? 0 : Ko(e.title, t, s.headerFontFull).width;
    p.width = b, d += b + l, g = {
      x: d,
      y: r + (o - c) / 2,
      width: c,
      height: c
    };
  }
  const m = n + i / 2;
  return {
    menuBounds: fs(u, m, a),
    iconBounds: fs(f, m, a),
    iconOverlayBounds: fs(h, m, a),
    textBounds: fs(p, m, a),
    indicatorIconBounds: fs(g, m, a)
  };
}
function h0(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g) {
  if (o.rowMarker !== void 0 && o.headerRowMarkerDisabled !== !0) {
    const b = o.rowMarkerChecked;
    b !== !0 && o.headerRowMarkerAlwaysVisible !== !0 && (t.globalAlpha = d);
    const T = o.headerRowMarkerTheme !== void 0 ? fi(a, o.headerRowMarkerTheme) : a;
    Oh(t, T, b, e, n, r, i, !1, void 0, void 0, a.checkboxMaxSize, "center", o.rowMarker), b !== !0 && o.headerRowMarkerAlwaysVisible !== !0 && (t.globalAlpha = 1);
    return;
  }
  const m = s ? a.textHeaderSelected : a.textHeader, y = o.hasMenu === !0 && (l || h && s) && g.menuBounds !== void 0;
  if (o.icon !== void 0 && g.iconBounds !== void 0) {
    let b = s ? "selected" : "normal";
    o.style === "highlight" && (b = s ? "selected" : "special"), f.drawSprite(o.icon, b, t, g.iconBounds.x, g.iconBounds.y, g.iconBounds.width, a), o.overlayIcon !== void 0 && g.iconOverlayBounds !== void 0 && f.drawSprite(o.overlayIcon, s ? "selected" : "special", t, g.iconOverlayBounds.x, g.iconOverlayBounds.y, g.iconOverlayBounds.width, a);
  }
  if (y && r > 35) {
    const T = p ? 35 : r - 35, A = p ? 35 * 0.7 : r - 35 * 0.7, v = T / r, C = A / r, D = t.createLinearGradient(e, 0, e + r, 0), P = io(m, 0);
    D.addColorStop(p ? 1 : 0, m), D.addColorStop(v, m), D.addColorStop(C, P), D.addColorStop(p ? 0 : 1, P), t.fillStyle = D;
  } else
    t.fillStyle = m;
  if (p && (t.textAlign = "right"), g.textBounds !== void 0 && t.fillText(o.title, p ? g.textBounds.x + g.textBounds.width : g.textBounds.x, n + i / 2 + Oi(t, a.headerFontFull)), p && (t.textAlign = "left"), o.indicatorIcon !== void 0 && g.indicatorIconBounds !== void 0 && (!y || !Os(g.menuBounds.x, g.menuBounds.y, g.menuBounds.width, g.menuBounds.height, g.indicatorIconBounds.x, g.indicatorIconBounds.y, g.indicatorIconBounds.width, g.indicatorIconBounds.height))) {
    let b = s ? "selected" : "normal";
    o.style === "highlight" && (b = s ? "selected" : "special"), f.drawSprite(o.indicatorIcon, b, t, g.indicatorIconBounds.x, g.indicatorIconBounds.y, g.indicatorIconBounds.width, a);
  }
  if (y && g.menuBounds !== void 0) {
    const b = g.menuBounds, T = c !== void 0 && u !== void 0 && Qi(b, c + e, u + n);
    if (T || (t.globalAlpha = 0.7), o.menuIcon === void 0 || o.menuIcon === Va.Triangle) {
      t.beginPath();
      const A = b.x + b.width / 2 - 5.5, v = b.y + b.height / 2 - 3;
      TE(t, [
        {
          x: A,
          y: v
        },
        {
          x: A + 11,
          y: v
        },
        {
          x: A + 5.5,
          y: v + 6
        }
      ], 1), t.fillStyle = m, t.fill();
    } else if (o.menuIcon === Va.Dots) {
      t.beginPath();
      const A = b.x + b.width / 2, v = b.y + b.height / 2;
      RE(t, A, v), t.fillStyle = m, t.fill();
    } else {
      const A = b.x + (b.width - a.headerIconSize) / 2, v = b.y + (b.height - a.headerIconSize) / 2;
      f.drawSprite(o.menuIcon, "normal", t, A, v, a.headerIconSize, a);
    }
    T || (t.globalAlpha = 1);
  }
}
function O1(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g) {
  const m = vh(o.title) === "rtl", y = N1(t, o, e, n, r, i, a, m);
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
    menuBounds: (y == null ? void 0 : y.menuBounds) ?? { x: 0, y: 0, height: 0, width: 0 },
    hoverX: c,
    hoverY: u
  }, () => h0(t, e, n, r, i, o, s, a, l, c, u, f, h, g, m, y)) : h0(t, e, n, r, i, o, s, a, l, c, u, f, h, g, m, y);
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
  var t = qs(), e = fh(), n = Ws(), r = "[object Arguments]", i = "[object Array]", o = "[object Boolean]", s = "[object Date]", a = "[object Error]", l = "[object Function]", c = "[object Map]", u = "[object Number]", d = "[object Object]", f = "[object RegExp]", h = "[object Set]", p = "[object String]", g = "[object WeakMap]", m = "[object ArrayBuffer]", y = "[object DataView]", b = "[object Float32Array]", T = "[object Float64Array]", A = "[object Int8Array]", v = "[object Int16Array]", C = "[object Int32Array]", D = "[object Uint8Array]", P = "[object Uint8ClampedArray]", S = "[object Uint16Array]", z = "[object Uint32Array]", k = {};
  k[b] = k[T] = k[A] = k[v] = k[C] = k[D] = k[P] = k[S] = k[z] = !0, k[r] = k[i] = k[m] = k[o] = k[y] = k[s] = k[a] = k[l] = k[c] = k[u] = k[d] = k[f] = k[h] = k[p] = k[g] = !1;
  function x(E) {
    return n(E) && e(E.length) && !!k[t(E)];
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
    var d = n(c), f = !d && e(c), h = !d && !f && r(c), p = !d && !f && !h && o(c), g = d || f || h || p, m = g ? t(c.length, String) : [], y = m.length;
    for (var b in c)
      (u || a.call(c, b)) && !(g && // Safari 9 has enumerable `arguments.length` in strict mode.
      (b == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      h && (b == "offset" || b == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      p && (b == "buffer" || b == "byteLength" || b == "byteOffset") || // Skip index properties.
      i(b, y))) && m.push(b);
    return m;
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
    var g = d.get(s), m = d.get(a);
    if (g && m)
      return g == a && m == s;
    var y = -1, b = !0, T = l & i ? new t() : void 0;
    for (d.set(s, a), d.set(a, s); ++y < h; ) {
      var A = s[y], v = a[y];
      if (c)
        var C = f ? c(v, A, y, a, s, d) : c(A, v, y, s, a, d);
      if (C !== void 0) {
        if (C)
          continue;
        b = !1;
        break;
      }
      if (T) {
        if (!e(a, function(D, P) {
          if (!n(T, P) && (A === D || u(A, D, l, c, d)))
            return T.push(P);
        })) {
          b = !1;
          break;
        }
      } else if (!(A === v || u(A, v, l, c, d))) {
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
  var t = Bs(), e = mI(), n = ah(), r = F1(), i = yI(), o = Dh(), s = 1, a = 2, l = "[object Boolean]", c = "[object Date]", u = "[object Error]", d = "[object Map]", f = "[object Number]", h = "[object RegExp]", p = "[object Set]", g = "[object String]", m = "[object Symbol]", y = "[object ArrayBuffer]", b = "[object DataView]", T = t ? t.prototype : void 0, A = T ? T.valueOf : void 0;
  function v(C, D, P, S, z, k, x) {
    switch (P) {
      case b:
        if (C.byteLength != D.byteLength || C.byteOffset != D.byteOffset)
          return !1;
        C = C.buffer, D = D.buffer;
      case y:
        return !(C.byteLength != D.byteLength || !k(new e(C), new e(D)));
      case l:
      case c:
      case f:
        return n(+C, +D);
      case u:
        return C.name == D.name && C.message == D.message;
      case h:
      case g:
        return C == D + "";
      case d:
        var E = i;
      case p:
        var I = S & s;
        if (E || (E = o), C.size != D.size && !I)
          return !1;
        var M = x.get(C);
        if (M)
          return M == D;
        S |= a, x.set(C, D);
        var N = r(E(C), E(D), S, z, k, x);
        return x.delete(C), N;
      case m:
        if (A)
          return A.call(C) == A.call(D);
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
    for (var m = h; m--; ) {
      var y = f[m];
      if (!(d ? y in s : r.call(s, y)))
        return !1;
    }
    var b = u.get(o), T = u.get(s);
    if (b && T)
      return b == s && T == o;
    var A = !0;
    u.set(o, s), u.set(s, o);
    for (var v = d; ++m < h; ) {
      y = f[m];
      var C = o[y], D = s[y];
      if (l)
        var P = d ? l(D, C, y, s, o, u) : l(C, D, y, o, s, u);
      if (!(P === void 0 ? C === D || c(C, D, a, l, u) : P)) {
        A = !1;
        break;
      }
      v || (v = y == "constructor");
    }
    if (A && !v) {
      var S = o.constructor, z = s.constructor;
      S != z && "constructor" in o && "constructor" in s && !(typeof S == "function" && S instanceof S && typeof z == "function" && z instanceof z) && (A = !1);
    }
    return u.delete(o), u.delete(s), A;
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
  var t = RI(), e = lh(), n = TI(), r = R1(), i = EI(), o = qs(), s = zv(), a = "[object Map]", l = "[object Object]", c = "[object Promise]", u = "[object Set]", d = "[object WeakMap]", f = "[object DataView]", h = s(t), p = s(e), g = s(n), m = s(r), y = s(i), b = o;
  return (t && b(new t(new ArrayBuffer(1))) != f || e && b(new e()) != a || n && b(n.resolve()) != c || r && b(new r()) != u || i && b(new i()) != d) && (b = function(T) {
    var A = o(T), v = A == l ? T.constructor : void 0, C = v ? s(v) : "";
    if (C)
      switch (C) {
        case h:
          return f;
        case p:
          return a;
        case g:
          return c;
        case m:
          return u;
        case y:
          return d;
      }
    return A;
  }), zd = b, zd;
}
var Ld, ry;
function II() {
  if (ry) return Ld;
  ry = 1;
  var t = $1(), e = F1(), n = bI(), r = CI(), i = MI(), o = ri(), s = z1(), a = L1(), l = 1, c = "[object Arguments]", u = "[object Array]", d = "[object Object]", f = Object.prototype, h = f.hasOwnProperty;
  function p(g, m, y, b, T, A) {
    var v = o(g), C = o(m), D = v ? u : i(g), P = C ? u : i(m);
    D = D == c ? d : D, P = P == c ? d : P;
    var S = D == d, z = P == d, k = D == P;
    if (k && s(g)) {
      if (!s(m))
        return !1;
      v = !0, S = !1;
    }
    if (k && !S)
      return A || (A = new t()), v || a(g) ? e(g, m, y, b, T, A) : n(g, m, D, y, b, T, A);
    if (!(y & l)) {
      var x = S && h.call(g, "__wrapped__"), E = z && h.call(m, "__wrapped__");
      if (x || E) {
        var I = x ? g.value() : g, M = E ? m.value() : m;
        return A || (A = new t()), T(I, M, y, b, A);
      }
    }
    return k ? (A || (A = new t()), r(g, m, y, b, T, A)) : !1;
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
        var m = new t();
        if (l)
          var y = l(p, g, h, o, s, m);
        if (!(y === void 0 ? e(g, p, n | r, l, m) : y))
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
function UI(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g, m, y, b) {
  if (y !== void 0 || e[e.length - 1] !== n[e.length - 1])
    return;
  const T = M1(m);
  zi(e, l, s, a, o, (A, v, C, D, P) => {
    if (A !== e[e.length - 1])
      return;
    v += A.width;
    const S = Math.max(v, D);
    S > r || (t.save(), t.beginPath(), t.rect(S, o + 1, 1e4, i - o - 1), t.clip(), Rl(P, C, i, c, u, p, g, T, (z, k, x, E) => {
      if (!E && m.length > 0 && !m.some((W) => Os(v, z, 1e4, x, W.x, W.y, W.width, W.height)))
        return;
      const I = f.hasIndex(k), M = h.hasIndex(k);
      t.beginPath();
      const N = d == null ? void 0 : d(k), L = N === void 0 ? b : fi(b, N);
      L.bgCell !== b.bgCell && (t.fillStyle = L.bgCell, t.fillRect(v, z, 1e4, x)), M && (t.fillStyle = L.bgHeader, t.fillRect(v, z, 1e4, x)), I && (t.fillStyle = L.accentLight, t.fillRect(v, z, 1e4, x));
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
  const g = p.bgCell, { minX: m, maxX: y, minY: b, maxY: T } = j1(a, o, s), A = [], v = s - uo(h, f, c);
  let C = l, D = n, P = 0;
  for (; C + i < v; ) {
    const E = C + i, I = c(D);
    if (E >= b && E <= T - 1) {
      const M = u == null ? void 0 : u(D), N = M == null ? void 0 : M.bgCell;
      N !== void 0 && N !== g && D >= h - f && A.push({
        x: m,
        y: E,
        w: y - m,
        h: I,
        color: N
      });
    }
    C += I, D < h - f && (P = C), D++;
  }
  let S = 0;
  const z = Math.min(v, T) - P;
  if (z > 0)
    for (let E = 0; E < e.length; E++) {
      const I = e[E];
      if (I.width === 0)
        continue;
      const M = I.sticky ? S : S + r, N = (x = I.themeOverride) == null ? void 0 : x.bgCell;
      N !== void 0 && N !== g && M >= m && M <= y && d(E + 1) && A.push({
        x: M,
        y: P,
        w: I.width,
        h: z,
        color: N
      }), S += I.width;
    }
  if (A.length === 0)
    return;
  let k;
  t.beginPath();
  for (let E = A.length - 1; E >= 0; E--) {
    const I = A[E];
    k === void 0 ? k = I.color : I.color !== k && (t.fillStyle = k, t.fill(), t.beginPath(), k = I.color), t.rect(I.x, I.y, I.w, I.h);
  }
  k !== void 0 && (t.fillStyle = k, t.fill()), t.beginPath();
}
function ky(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g, m, y = !1) {
  if (l !== void 0) {
    t.beginPath(), t.save(), t.rect(0, 0, o, s);
    for (const x of l)
      t.rect(x.x + 1, x.y + 1, x.width - 1, x.height - 1);
    t.clip("evenodd");
  }
  const b = m.horizontalBorderColor ?? m.borderColor, T = m.borderColor, { minX: A, maxX: v, minY: C, maxY: D } = j1(a, o, s), P = [];
  t.beginPath();
  let S = 0.5;
  for (let x = 0; x < e.length; x++) {
    const E = e[x];
    if (E.width === 0)
      continue;
    S += E.width;
    const I = E.sticky ? S : S + r;
    I >= A && I <= v && h(x + 1) && P.push({
      x1: I,
      y1: Math.max(c, C),
      x2: I,
      y2: Math.min(s, D),
      color: T
    });
  }
  let z = s + 0.5;
  for (let x = g - p; x < g; x++) {
    const E = d(x);
    z -= E, P.push({ x1: A, y1: z, x2: v, y2: z, color: b });
  }
  if (y !== !0) {
    let x = u + 0.5, E = n;
    const I = z;
    for (; x + i < I; ) {
      const M = x + i;
      if (M >= C && M <= D - 1) {
        const N = f == null ? void 0 : f(E);
        P.push({
          x1: A,
          y1: M,
          x2: v,
          y2: M,
          color: (N == null ? void 0 : N.horizontalBorderColor) ?? (N == null ? void 0 : N.borderColor) ?? b
        });
      }
      x += d(E), E++;
    }
  }
  const k = KI(P, (x) => x.color);
  for (const x of Object.keys(k)) {
    t.strokeStyle = x;
    for (const E of k[x])
      t.moveTo(E.x1, E.y1), t.lineTo(E.x2, E.y2);
    t.stroke(), t.beginPath();
  }
  l !== void 0 && t.restore();
}
function XI(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g, m, y, b) {
  const T = [];
  t.imageSmoothingEnabled = !1;
  const A = Math.min(i.cellYOffset, s), v = Math.max(i.cellYOffset, s);
  let C = 0;
  if (typeof y == "number")
    C += (v - A) * y;
  else
    for (let I = A; I < v; I++)
      C += y(I);
  s > i.cellYOffset && (C = -C), C += l - i.translateY;
  const D = Math.min(i.cellXOffset, o), P = Math.max(i.cellXOffset, o);
  let S = 0;
  for (let I = D; I < P; I++)
    S += g[I].width;
  o > i.cellXOffset && (S = -S), S += a - i.translateX;
  const z = Wo(m);
  if (S !== 0 && C !== 0)
    return {
      regions: []
    };
  const k = c > 0 ? uo(f, c, y) : 0, x = u - z - Math.abs(S), E = d - h - k - Math.abs(C) - 1;
  if (x > 150 && E > 150) {
    const I = {
      sx: 0,
      sy: 0,
      sw: u * p,
      sh: d * p,
      dx: 0,
      dy: 0,
      dw: u * p,
      dh: d * p
    };
    if (C > 0 ? (I.sy = (h + 1) * p, I.sh = E * p, I.dy = (C + h + 1) * p, I.dh = E * p, T.push({
      x: 0,
      y: h,
      width: u,
      height: C + 1
    })) : C < 0 && (I.sy = (-C + h + 1) * p, I.sh = E * p, I.dy = (h + 1) * p, I.dh = E * p, T.push({
      x: 0,
      y: d + C - k,
      width: u,
      height: -C + k
    })), S > 0 ? (I.sx = z * p, I.sw = x * p, I.dx = (S + z) * p, I.dw = x * p, T.push({
      x: z - 1,
      y: 0,
      width: S + 2,
      // extra width to account for first col not drawing a left side border
      height: d
    })) : S < 0 && (I.sx = (z - S) * p, I.sw = x * p, I.dx = z * p, I.dw = x * p, T.push({
      x: u + S,
      y: 0,
      width: -S,
      height: d
    })), t.setTransform(1, 0, 0, 1, 0, 0), b) {
      if (z > 0 && S !== 0 && C === 0 && (r === void 0 || (n == null ? void 0 : n[1]) !== !1)) {
        const M = z * p, N = d * p;
        t.drawImage(e, 0, 0, M, N, 0, 0, M, N);
      }
      if (k > 0 && S === 0 && C !== 0 && (r === void 0 || (n == null ? void 0 : n[0]) !== !1)) {
        const M = (d - k) * p, N = u * p, L = k * p;
        t.drawImage(e, 0, M, N, L, 0, M, N, L);
      }
    }
    t.drawImage(e, I.sx, I.sy, I.sw, I.sh, I.dx, I.dy, I.dw, I.dh), t.scale(p, p);
  }
  return t.imageSmoothingEnabled = !0, {
    regions: T
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
  const m = p == null ? void 0 : p.filter((D) => D.style !== "no-outline");
  if (m === void 0 || m.length === 0)
    return;
  const y = Wo(a), b = uo(h, f, d), T = [l, 0, a.length, h - f], A = [y, 0, e, n - b], v = m.map((D) => {
    const P = D.range, S = D.style ?? "dashed";
    return FM(P, T, e, n, A).map((z) => {
      const k = z.rect, x = If(k.x, k.y, e, n, u, c + u, r, i, o, s, h, l, f, a, d), E = k.width === 1 && k.height === 1 ? x : If(k.x + k.width - 1, k.y + k.height - 1, e, n, u, c + u, r, i, o, s, h, l, f, a, d);
      return k.x + k.width >= a.length && (E.width -= 1), k.y + k.height >= h && (E.height -= 1), {
        color: D.color,
        style: S,
        clip: z.clip,
        rect: $M({
          x: x.x,
          y: x.y,
          width: E.x + E.width - x.x,
          height: E.y + E.height - x.y
        }, e, n, 8)
      };
    });
  }), C = () => {
    t.lineWidth = 1;
    let D = !1;
    for (const P of v)
      for (const S of P)
        if ((S == null ? void 0 : S.rect) !== void 0 && Os(0, 0, e, n, S.rect.x, S.rect.y, S.rect.width, S.rect.height)) {
          const z = D, k = !LM(S.clip, S.rect);
          t.beginPath(), k && (t.save(), t.rect(S.clip.x, S.clip.y, S.clip.width, S.clip.height), t.clip()), S.style === "dashed" && !D ? (t.setLineDash([5, 3]), D = !0) : (S.style === "solid" || S.style === "solid-outline") && D && (t.setLineDash([]), D = !1), t.strokeStyle = S.style === "solid-outline" ? yr(yr(S.color, g.borderColor), g.bgCell) : io(S.color, 1), t.closePath(), t.strokeRect(S.rect.x + 0.5, S.rect.y + 0.5, S.rect.width - 1, S.rect.height - 1), k && (t.restore(), D = z);
        }
    D && t.setLineDash([]);
  };
  return C(), C;
}
function Cy(t, e, n, r, i) {
  t.beginPath(), t.moveTo(e, n), t.lineTo(e, r), t.lineWidth = 2, t.strokeStyle = i, t.stroke(), t.globalAlpha = 1;
}
function nf(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g, m) {
  if (u.current === void 0)
    return;
  const y = g !== !1 && g !== void 0;
  if (!y)
    return;
  const b = typeof g == "object" ? { ...Ja, ...g } : Ja, T = u.current.range, A = u.current.cell, v = [T.x + T.width - 1, T.y + T.height - 1];
  if (A[1] >= m && v[1] >= m || !s.some((N) => N.sourceIndex === A[0] || N.sourceIndex === v[0]))
    return;
  const [D, P] = u.current.cell, S = f(u.current.cell), z = S.span ?? [D, D], k = P >= m - h, x = h > 0 && !k ? uo(m, h, d) - 1 : 0, E = v[1];
  let I;
  if (zi(s, r, i, o, c, (N, L, W, oe, F) => {
    if (N.sticky && D > N.sourceIndex)
      return;
    const O = N.sourceIndex < z[0], ne = N.sourceIndex > z[1], j = N.sourceIndex === v[0];
    if (!(!j && (O || ne)))
      return Rl(F, W, n, m, d, h, p, void 0, (U, re, q) => {
        if (re !== P && re !== E)
          return;
        let ie = L, Z = N.width;
        if (S.span !== void 0) {
          const Y = A1(S.span, L, U, N.width, q, N, a), ce = N.sticky ? Y[0] : Y[1];
          ce !== void 0 && (ie = ce.x, Z = ce.width);
        }
        return re === E && j && y && (I = () => {
          var xe;
          oe > ie && !N.sticky && (t.beginPath(), t.rect(oe, 0, e - oe, n), t.clip());
          const Y = b.size, ce = Y / 2, fe = ie + Z + b.offsetX - ce + 0.5, Ee = U + q + b.offsetY - ce + 0.5;
          t.beginPath(), b.shape === "circle" ? t.arc(fe + ce, Ee + ce, ce, 0, Math.PI * 2) : t.rect(fe, Ee, Y, Y), t.fillStyle = ((xe = N.themeOverride) == null ? void 0 : xe.accentColor) ?? l.accentColor, t.fill(), b.outline > 0 && (t.lineWidth = b.outline, t.strokeStyle = l.bgCell, b.shape === "circle" ? (t.beginPath(), t.arc(fe + ce, Ee + ce, ce + b.outline / 2, 0, Math.PI * 2), t.stroke()) : t.strokeRect(fe - b.outline / 2, Ee - b.outline / 2, Y + b.outline, Y + b.outline));
        }), I !== void 0;
      }), I !== void 0;
  }), I === void 0)
    return;
  const M = () => {
    t.save(), t.beginPath(), t.rect(0, c, e, n - c - x), t.clip(), I == null || I(), t.restore();
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
  return zi(t, o, r, i, n, (d, f, h, p, g) => (Rl(g, h, e, s, a, l, c, void 0, (m, y, b, T) => {
    T || (u = Math.max(y, u));
  }), !0)), u;
}
function Ry(t, e) {
  var K;
  const { canvasCtx: n, headerCanvasCtx: r, width: i, height: o, cellXOffset: s, cellYOffset: a, translateX: l, translateY: c, mappedColumns: u, enableGroups: d, freezeColumns: f, dragAndDropState: h, theme: p, drawFocus: g, headerHeight: m, groupHeaderHeight: y, disabledRows: b, rowHeight: T, verticalBorder: A, overrideCursor: v, isResizing: C, selection: D, fillHandle: P, freezeTrailingRows: S, rows: z, getCellContent: k, getGroupDetails: x, getRowThemeOverride: E, isFocused: I, drawHeaderCallback: M, prelightCells: N, drawCellCallback: L, highlightRegions: W, resizeCol: oe, imageLoader: F, lastBlitData: O, hoverValues: ne, hyperWrapping: j, hoverInfo: U, spriteManager: re, maxScaleFactor: q, hasAppendRow: ie, touchMode: Z, enqueue: Q, renderStateProvider: Y, getCellRenderer: ce, renderStrategy: fe, bufferACtx: Ee, bufferBCtx: xe, damage: ze, minimumCellWidth: Qe, resizeIndicator: dt } = t;
  if (i === 0 || o === 0)
    return;
  const et = fe === "double-buffer", te = Math.min(q, Math.ceil(window.devicePixelRatio ?? 1)), Ae = fe !== "direct" && JI(t, e), _e = n.canvas;
  (_e.width !== i * te || _e.height !== o * te) && (_e.width = i * te, _e.height = o * te, _e.style.width = i + "px", _e.style.height = o + "px");
  const We = r.canvas, He = d ? y + m : m, Le = He + 1;
  (We.width !== i * te || We.height !== Le * te) && (We.width = i * te, We.height = Le * te, We.style.width = i + "px", We.style.height = Le + "px");
  const Je = Ee.canvas, yt = xe.canvas;
  et && (Je.width !== i * te || Je.height !== o * te) && (Je.width = i * te, Je.height = o * te, O.current !== void 0 && (O.current.aBufferScroll = void 0)), et && (yt.width !== i * te || yt.height !== o * te) && (yt.width = i * te, yt.height = o * te, O.current !== void 0 && (O.current.bBufferScroll = void 0));
  const ve = O.current;
  if (Ae === !0 && s === (ve == null ? void 0 : ve.cellXOffset) && a === (ve == null ? void 0 : ve.cellYOffset) && l === (ve == null ? void 0 : ve.translateX) && c === (ve == null ? void 0 : ve.translateY))
    return;
  let je = null;
  et && (je = n);
  const Ct = r;
  let bt;
  et ? ze !== void 0 ? bt = (ve == null ? void 0 : ve.lastBuffer) === "b" ? xe : Ee : bt = (ve == null ? void 0 : ve.lastBuffer) === "b" ? Ee : xe : bt = n;
  const Xe = bt.canvas, Rt = et ? Xe === Je ? yt : Je : _e, pt = typeof T == "number" ? () => T : T;
  Ct.save(), bt.save(), Ct.beginPath(), bt.beginPath(), Ct.textBaseline = "middle", bt.textBaseline = "middle", te !== 1 && (Ct.scale(te, te), bt.scale(te, te));
  const ft = Mf(u, s, i, h, l);
  let It = [];
  const $t = g && ((K = D.current) == null ? void 0 : K.cell[1]) === a && c === 0;
  let en = !1;
  if (W !== void 0) {
    for (const G of W)
      if (G.style !== "no-outline" && G.range.y === a && c === 0) {
        en = !0;
        break;
      }
  }
  const wt = () => {
    qM(Ct, ft, d, U, i, l, m, y, h, C, D, p, re, ne, A, x, ze, M, Z), ky(Ct, ft, a, l, c, i, o, void 0, void 0, y, He, pt, E, A, S, z, p, !0), Ct.beginPath(), Ct.moveTo(0, Le - 0.5), Ct.lineTo(i, Le - 0.5), Ct.strokeStyle = yr(p.headerBottomBorderColor ?? p.horizontalBorderColor ?? p.borderColor, p.bgHeader), Ct.stroke(), en && Sy(Ct, i, o, s, a, l, c, u, f, m, y, T, S, z, W, p), $t && nf(Ct, i, o, a, l, c, ft, u, p, He, D, pt, k, S, ie, P, z);
  };
  if (ze !== void 0) {
    const G = ft[ft.length - 1].sourceIndex + 1, we = ze.hasItemInRegion([
      {
        x: s,
        y: -2,
        width: G,
        height: 2
      },
      {
        x: s,
        y: a,
        width: G,
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
        width: G,
        height: S,
        when: S > 0
      }
    ]), Ie = (nt) => {
      f0(nt, ft, u, o, He, l, c, a, z, pt, k, x, E, b, I, g, S, ie, It, ze, D, N, W, F, re, ne, U, L, j, p, Q, Y, ce, v, Qe);
      const Kt = D.current;
      P !== !1 && P !== void 0 && g && Kt !== void 0 && ze.has(h1(Kt.range)) && nf(nt, i, o, a, l, c, ft, u, p, He, D, pt, k, S, ie, P, z);
    };
    we && (Ie(bt), je !== null && (je.save(), je.scale(te, te), je.textBaseline = "middle", Ie(je), je.restore()), ze.hasHeader() && (ZI(Ct, ft, i, y, He, l, c, a, ze), wt())), bt.restore(), Ct.restore();
    return;
  }
  if ((Ae !== !0 || s !== (ve == null ? void 0 : ve.cellXOffset) || l !== (ve == null ? void 0 : ve.translateX) || $t !== (ve == null ? void 0 : ve.mustDrawFocusOnHeader) || en !== (ve == null ? void 0 : ve.mustDrawHighlightRingsOnHeader)) && wt(), Ae === !0) {
    mr(Rt !== void 0 && ve !== void 0);
    const { regions: G } = XI(bt, Rt, Rt === Je ? ve.aBufferScroll : ve.bBufferScroll, Rt === Je ? ve.bBufferScroll : ve.aBufferScroll, ve, s, a, l, c, S, i, o, z, He, te, u, ft, T, et);
    It = G;
  } else Ae !== !1 && (mr(ve !== void 0), It = VI(ve, s, a, l, c, i, o, He, ft, Ae));
  GI(bt, ft, i, o, S, z, A, pt, p);
  const Nt = Sy(bt, i, o, s, a, l, c, u, f, m, y, T, S, z, W, p), zt = g ? nf(bt, i, o, a, l, c, ft, u, p, He, D, pt, k, S, ie, P, z) : void 0;
  if (bt.fillStyle = p.bgCell, It.length > 0) {
    bt.beginPath();
    for (const G of It)
      bt.rect(G.x, G.y, G.width, G.height);
    bt.clip(), bt.fill(), bt.beginPath();
  } else
    bt.fillRect(0, 0, i, o);
  const kn = f0(bt, ft, u, o, He, l, c, a, z, pt, k, x, E, b, I, g, S, ie, It, ze, D, N, W, F, re, ne, U, L, j, p, Q, Y, ce, v, Qe);
  UI(bt, ft, u, i, o, He, l, c, a, z, pt, E, D.rows, b, S, ie, It, ze, p), YI(bt, ft, a, l, c, i, o, It, He, pt, E, A, S, z, p), ky(bt, ft, a, l, c, i, o, It, kn, y, He, pt, E, A, S, z, p), Nt == null || Nt(), zt == null || zt(), C && dt !== "none" && zi(ft, 0, l, 0, He, (G, we) => G.sourceIndex === oe ? (Cy(Ct, we + G.width, 0, He + 1, yr(p.resizeIndicatorColor ?? p.accentLight, p.bgHeader)), dt === "full" && Cy(bt, we + G.width, He, o, yr(p.resizeIndicatorColor ?? p.accentLight, p.bgCell)), !0) : !1), je !== null && (je.fillStyle = p.bgCell, je.fillRect(0, 0, i, o), je.drawImage(bt.canvas, 0, 0));
  const on = QI(ft, o, He, l, c, a, z, pt, S, ie);
  F == null || F.setWindow({
    x: s,
    y: a,
    width: ft.length,
    height: on - a
  }, f, Array.from({ length: S }, (G, we) => z - 1 - we));
  const de = ve !== void 0 && (s !== ve.cellXOffset || l !== ve.translateX), Me = ve !== void 0 && (a !== ve.cellYOffset || c !== ve.translateY);
  O.current = {
    cellXOffset: s,
    cellYOffset: a,
    translateX: l,
    translateY: c,
    mustDrawFocusOnHeader: $t,
    mustDrawHighlightRingsOnHeader: en,
    lastBuffer: et ? Xe === Je ? "a" : "b" : void 0,
    aBufferScroll: Xe === Je ? [de, Me] : ve == null ? void 0 : ve.aBufferScroll,
    bBufferScroll: Xe === yt ? [de, Me] : ve == null ? void 0 : ve.bBufferScroll
  }, bt.restore(), Ct.restore();
}
const eA = 80;
function tA(t) {
  const e = t - 1;
  return e * e * e + 1;
}
class nA {
  constructor(e) {
    Ve(this, "callback");
    Ve(this, "currentHoveredItem");
    Ve(this, "leavingItems", []);
    Ve(this, "lastAnimationTime");
    Ve(this, "addToLeavingItems", (e) => {
      this.leavingItems.some((r) => Ss(r.item, e.item)) || this.leavingItems.push(e);
    });
    /**
     * @returns the hover amount of the item, if it was leaving (0 if not).
     */
    Ve(this, "removeFromLeavingItems", (e) => {
      const n = this.leavingItems.find((r) => Ss(r.item, e));
      return this.leavingItems = this.leavingItems.filter((r) => r !== n), (n == null ? void 0 : n.hoverAmount) ?? 0;
    });
    Ve(this, "cleanUpLeavingElements", () => {
      this.leavingItems = this.leavingItems.filter((e) => e.hoverAmount > 0);
    });
    Ve(this, "shouldStep", () => {
      const e = this.leavingItems.length > 0, n = this.currentHoveredItem !== void 0 && this.currentHoveredItem.hoverAmount < 1;
      return e || n;
    });
    Ve(this, "getAnimatingItems", () => this.currentHoveredItem !== void 0 ? [...this.leavingItems, this.currentHoveredItem] : this.leavingItems.map((e) => ({ ...e, hoverAmount: tA(e.hoverAmount) })));
    Ve(this, "step", (e) => {
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
    Ve(this, "setHovered", (e) => {
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
    Ve(this, "fn");
    Ve(this, "val");
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
  if (t.kind === Fe.Custom)
    return t.copyData;
  const n = e == null ? void 0 : e(t);
  return (n == null ? void 0 : n.getAccessibilityString(t)) ?? "";
}, aA = (t, e) => {
  const { width: n, height: r, accessibilityHeight: i, columns: o, cellXOffset: s, cellYOffset: a, headerHeight: l, fillHandle: c = !1, groupHeaderHeight: u, rowHeight: d, rows: f, getCellContent: h, getRowThemeOverride: p, onHeaderMenuClick: g, onHeaderIndicatorClick: m, enableGroups: y, isFilling: b, onCanvasFocused: T, onCanvasBlur: A, isFocused: v, selection: C, freezeColumns: D, onContextMenu: P, freezeTrailingRows: S, fixedShadowX: z = !0, fixedShadowY: k = !0, drawFocusRing: x, onMouseDown: E, onMouseUp: I, onMouseMoveRaw: M, onMouseMove: N, onItemHovered: L, dragAndDropState: W, firstColAccessible: oe, onKeyDown: F, onKeyUp: O, highlightRegions: ne, canvasRef: j, onDragStart: U, onDragEnd: re, eventTargetRef: q, isResizing: ie, resizeColumn: Z, isDragging: Q, isDraggable: Y = !1, allowResize: ce, disabledRows: fe, hasAppendRow: Ee, getGroupDetails: xe, theme: ze, prelightCells: Qe, headerIcons: dt, verticalBorder: et, drawCell: te, drawHeader: Ae, onCellFocused: _e, onDragOverCell: We, onDrop: He, onDragLeave: Le, imageWindowLoader: Je, smoothScrollX: yt = !1, smoothScrollY: ve = !1, experimental: je, getCellRenderer: Ct, resizeIndicator: bt = "full" } = t, Xe = t.translateX ?? 0, Rt = t.translateY ?? 0, pt = Math.max(D, Math.min(o.length - 1, s)), ft = w.useRef(null), It = w.useRef((je == null ? void 0 : je.eventTarget) ?? window), $t = It.current, en = Je, wt = w.useRef(), [Nt, zt] = w.useState(!1), kn = w.useRef([]), on = w.useRef(), [de, Me] = w.useState(), [K, G] = w.useState(), we = w.useRef(null), [Ie, nt] = w.useState(), [Kt, lt] = w.useState(!1), ee = w.useRef(Kt);
  ee.current = Kt;
  const ke = w.useMemo(() => new OM(dt, () => {
    dr.current = void 0, un.current();
  }), [dt]), Se = y ? u + l : l, Ke = w.useRef(-1), gt = ((je == null ? void 0 : je.enableFirefoxRescaling) ?? !1) && iA.value, Ot = ((je == null ? void 0 : je.enableSafariRescaling) ?? !1) && tl.value;
  w.useLayoutEffect(() => {
    window.devicePixelRatio === 1 || !gt && !Ot || (Ke.current !== -1 && zt(!0), window.clearTimeout(Ke.current), Ke.current = window.setTimeout(() => {
      zt(!1), Ke.current = -1;
    }, 200));
  }, [a, pt, Xe, Rt, gt, Ot]);
  const ct = hE(o, D), ht = w.useMemo(() => z ? Wo(ct, W) : 0, [ct, W, z]), vt = w.useCallback((J, ye, rt) => {
    const it = J.getBoundingClientRect();
    if (ye >= ct.length || rt >= f)
      return;
    const $e = it.width / n, Be = If(ye, rt, n, r, u, Se, pt, a, Xe, Rt, f, D, S, ct, d);
    return $e !== 1 && (Be.x *= $e, Be.y *= $e, Be.width *= $e, Be.height *= $e), Be.x += it.x, Be.y += it.y, Be;
  }, [
    n,
    r,
    u,
    Se,
    pt,
    a,
    Xe,
    Rt,
    f,
    D,
    S,
    ct,
    d
  ]), ut = w.useCallback((J, ye, rt, it) => {
    const $e = J.getBoundingClientRect(), Be = $e.width / n, Tt = (ye - $e.left) / Be, Ut = (rt - $e.top) / Be, mt = 5, Ln = Mf(ct, pt, n, void 0, Xe);
    let kt = 0, Gt = 0;
    const Lt = typeof PointerEvent < "u" && it instanceof PointerEvent && it.pointerType === "mouse" || typeof MouseEvent < "u" && it instanceof MouseEvent, Ft = typeof PointerEvent < "u" && it instanceof PointerEvent && it.pointerType === "touch" || typeof TouchEvent < "u" && it instanceof TouchEvent;
    Lt && (kt = it.button, Gt = it.buttons);
    const Pt = yE(Tt, Ln, Xe), Vt = bE(Ut, r, y, l, u, f, d, a, Rt, S), En = (it == null ? void 0 : it.shiftKey) === !0, Dr = (it == null ? void 0 : it.ctrlKey) === !0, Nr = (it == null ? void 0 : it.metaKey) === !0, wn = [
      Tt < 0 ? -1 : n < Tt ? 1 : 0,
      Ut < Se ? -1 : r < Ut ? 1 : 0
    ];
    let An;
    if (Pt === -1 || Ut < 0 || Tt < 0 || Vt === void 0 || Tt > n || Ut > r) {
      const sn = Tt > n ? 1 : Tt < 0 ? -1 : 0, Sr = Ut > r ? 1 : Ut < 0 ? -1 : 0;
      let Xn = sn * 2, go = Sr * 2;
      sn === 0 && (Xn = Pt === -1 ? Do.EndPadding : Do.Center), Sr === 0 && (go = Vt === void 0 ? Do.EndPadding : Do.Center);
      let si = !1;
      if (Pt === -1 && Vt === -1) {
        const $n = vt(J, ct.length - 1, -1);
        mr($n !== void 0), si = ye < $n.x + $n.width + mt;
      }
      const qt = Tt > n && Tt < n + kf() || Ut > r && Ut < r + kf();
      An = {
        kind: rl,
        location: [Pt !== -1 ? Pt : Tt < 0 ? 0 : ct.length - 1, Vt ?? f - 1],
        region: [Xn, go],
        shiftKey: En,
        ctrlKey: Dr,
        metaKey: Nr,
        isEdge: si,
        isTouch: Ft,
        button: kt,
        buttons: Gt,
        scrollEdge: wn,
        isMaybeScrollbar: qt
      };
    } else if (Vt <= -1) {
      let sn = vt(J, Pt, Vt);
      mr(sn !== void 0);
      let Sr = sn !== void 0 && sn.x + sn.width - ye <= mt;
      const Xn = Pt - 1;
      ye - sn.x <= mt && Xn >= 0 ? (Sr = !0, sn = vt(J, Xn, Vt), mr(sn !== void 0), An = {
        kind: y && Vt === -2 ? Br : Mi,
        location: [Xn, Vt],
        bounds: sn,
        group: ct[Xn].group ?? "",
        isEdge: Sr,
        shiftKey: En,
        ctrlKey: Dr,
        metaKey: Nr,
        isTouch: Ft,
        localEventX: ye - sn.x,
        localEventY: rt - sn.y,
        button: kt,
        buttons: Gt,
        scrollEdge: wn
      }) : An = {
        kind: y && Vt === -2 ? Br : Mi,
        group: ct[Pt].group ?? "",
        location: [Pt, Vt],
        bounds: sn,
        isEdge: Sr,
        shiftKey: En,
        ctrlKey: Dr,
        metaKey: Nr,
        isTouch: Ft,
        localEventX: ye - sn.x,
        localEventY: rt - sn.y,
        button: kt,
        buttons: Gt,
        scrollEdge: wn
      };
    } else {
      const sn = vt(J, Pt, Vt);
      mr(sn !== void 0);
      const Sr = sn !== void 0 && sn.x + sn.width - ye < mt;
      let Xn = !1;
      if (c !== !1 && c !== void 0 && C.current !== void 0) {
        const si = typeof c == "object" ? { ...Ja, ...c } : Ja, qt = si.size, $n = qt / 2, Bi = h1(C.current.range), vi = vt(J, Bi[0], Bi[1]);
        if (vi !== void 0) {
          const ai = vi.x + vi.width + si.offsetX - $n + 0.5, fn = vi.y + vi.height + si.offsetY - $n + 0.5;
          Xn = Math.abs(ai - ye) < qt && Math.abs(fn - rt) < qt;
        }
      }
      An = {
        kind: "cell",
        location: [Pt, Vt],
        bounds: sn,
        isEdge: Sr,
        shiftKey: En,
        ctrlKey: Dr,
        isFillHandle: Xn,
        metaKey: Nr,
        isTouch: Ft,
        localEventX: ye - sn.x,
        localEventY: rt - sn.y,
        button: kt,
        buttons: Gt,
        scrollEdge: wn
      };
    }
    return An;
  }, [
    n,
    ct,
    pt,
    Xe,
    r,
    y,
    l,
    u,
    f,
    d,
    a,
    Rt,
    S,
    vt,
    c,
    C,
    Se
  ]), [Yt] = de ?? [], xr = w.useRef(() => {
  }), Ht = w.useRef(de);
  Ht.current = de;
  const [mn, On] = w.useMemo(() => {
    const J = document.createElement("canvas"), ye = document.createElement("canvas");
    return J.style.display = "none", J.style.opacity = "0", J.style.position = "fixed", ye.style.display = "none", ye.style.opacity = "0", ye.style.position = "fixed", [J.getContext("2d", { alpha: !1 }), ye.getContext("2d", { alpha: !1 })];
  }, []);
  w.useLayoutEffect(() => {
    if (!(mn === null || On === null))
      return document.documentElement.append(mn.canvas), document.documentElement.append(On.canvas), () => {
        mn.canvas.remove(), On.canvas.remove();
      };
  }, [mn, On]);
  const Gn = w.useMemo(() => new EE(), []), Xt = gt && Nt ? 1 : Ot && Nt ? 2 : 5, zn = (je == null ? void 0 : je.disableMinimumCellWidth) === !0 ? 1 : 10, dr = w.useRef(), yn = w.useRef(null), fr = w.useRef(null), Yn = w.useCallback(() => {
    var Tt;
    const J = ft.current, ye = we.current;
    if (J === null || ye === null || (yn.current === null && (yn.current = J.getContext("2d", { alpha: !1 }), J.width = 0, J.height = 0), fr.current === null && (fr.current = ye.getContext("2d", { alpha: !1 }), ye.width = 0, ye.height = 0), yn.current === null || fr.current === null || mn === null || On === null))
      return;
    let rt = !1;
    const it = (Ut) => {
      rt = !0, nt(Ut);
    }, $e = dr.current, Be = {
      headerCanvasCtx: fr.current,
      canvasCtx: yn.current,
      bufferACtx: mn,
      bufferBCtx: On,
      width: n,
      height: r,
      cellXOffset: pt,
      cellYOffset: a,
      translateX: Math.round(Xe),
      translateY: Math.round(Rt),
      mappedColumns: ct,
      enableGroups: y,
      freezeColumns: D,
      dragAndDropState: W,
      theme: ze,
      headerHeight: l,
      groupHeaderHeight: u,
      disabledRows: fe ?? nn.empty(),
      rowHeight: d,
      verticalBorder: et,
      isResizing: ie,
      resizeCol: Z,
      isFocused: v,
      selection: C,
      fillHandle: c,
      drawCellCallback: te,
      hasAppendRow: Ee,
      overrideCursor: it,
      maxScaleFactor: Xt,
      freezeTrailingRows: S,
      rows: f,
      drawFocus: x,
      getCellContent: h,
      getGroupDetails: xe ?? ((Ut) => ({ name: Ut })),
      getRowThemeOverride: p,
      drawHeaderCallback: Ae,
      prelightCells: Qe,
      highlightRegions: ne,
      imageLoader: en,
      lastBlitData: on,
      damage: wt.current,
      hoverValues: kn.current,
      hoverInfo: Ht.current,
      spriteManager: ke,
      scrolling: Nt,
      hyperWrapping: (je == null ? void 0 : je.hyperWrapping) ?? !1,
      touchMode: Kt,
      enqueue: xr.current,
      renderStateProvider: Gn,
      renderStrategy: (je == null ? void 0 : je.renderStrategy) ?? (tl.value ? "double-buffer" : "single-buffer"),
      getCellRenderer: Ct,
      minimumCellWidth: zn,
      resizeIndicator: bt
    };
    Be.damage === void 0 ? (dr.current = Be, Ry(Be, $e)) : Ry(Be, void 0), !rt && (Be.damage === void 0 || Be.damage.has((Tt = Ht == null ? void 0 : Ht.current) == null ? void 0 : Tt[0])) && nt(void 0);
  }, [
    mn,
    On,
    n,
    r,
    pt,
    a,
    Xe,
    Rt,
    ct,
    y,
    D,
    W,
    ze,
    l,
    u,
    fe,
    d,
    et,
    ie,
    Ee,
    Z,
    v,
    C,
    c,
    S,
    f,
    x,
    Xt,
    h,
    xe,
    p,
    te,
    Ae,
    Qe,
    ne,
    en,
    ke,
    Nt,
    je == null ? void 0 : je.hyperWrapping,
    je == null ? void 0 : je.renderStrategy,
    Kt,
    Gn,
    Ct,
    zn,
    bt
  ]), un = w.useRef(Yn);
  w.useLayoutEffect(() => {
    Yn(), un.current = Yn;
  }, [Yn]), w.useLayoutEffect(() => {
    (async () => {
      var ye;
      ((ye = document == null ? void 0 : document.fonts) == null ? void 0 : ye.ready) !== void 0 && (await document.fonts.ready, dr.current = void 0, un.current());
    })();
  }, []);
  const Sn = w.useCallback((J) => {
    wt.current = J, un.current(), wt.current = void 0;
  }, []), rr = oA(Sn);
  xr.current = rr;
  const Pr = w.useCallback((J) => {
    Sn(new Rs(J.map((ye) => ye.cell)));
  }, [Sn]);
  en.setCallback(Sn);
  const [gi, Ur] = w.useState(!1), [Qn, kr] = Yt ?? [], mi = Qn !== void 0 && kr === -1 && Qn >= 0 && Qn < ct.length && ct[Qn].headerRowMarkerDisabled !== !0, Gr = Qn !== void 0 && kr === -2;
  let ir = !1, Re = !1, Ze = Ie;
  if (Ze === void 0 && Qn !== void 0 && kr !== void 0 && kr > -1 && kr < f) {
    const J = h([Qn, kr], !0);
    ir = J.kind === Ir.NewRow || J.kind === Ir.Marker && J.markerKind !== "number", Re = J.kind === Fe.Boolean && ph(J), Ze = J.cursor;
  }
  const bn = Q ? "grabbing" : (K ?? !1) || ie ? "col-resize" : gi || b ? "crosshair" : Ze !== void 0 ? Ze : mi || ir || Re || Gr ? "pointer" : "default", Jt = w.useMemo(() => ({
    // width,
    // height,
    contain: "strict",
    display: "block",
    cursor: bn
  }), [bn]), Zt = w.useRef("default"), In = q == null ? void 0 : q.current;
  In != null && Zt.current !== Jt.cursor && (In.style.cursor = Zt.current = Jt.cursor);
  const Yr = w.useCallback((J, ye, rt, it) => {
    if (xe === void 0)
      return;
    const $e = xe(J);
    if ($e.actions !== void 0) {
      const Be = D1(ye, $e.actions);
      for (const [Tt, Ut] of Be.entries())
        if (Qi(Ut, rt + ye.x, it + Ut.y))
          return $e.actions[Tt];
    }
  }, [xe]), $ = w.useCallback((J, ye, rt, it) => {
    const $e = ct[ye];
    if (!Q && !ie && !(K ?? !1)) {
      const Be = vt(J, ye, -1);
      mr(Be !== void 0);
      const Tt = N1(void 0, $e, Be.x, Be.y, Be.width, Be.height, ze, vh($e.title) === "rtl");
      if ($e.hasMenu === !0 && Tt.menuBounds !== void 0 && Qi(Tt.menuBounds, rt, it))
        return {
          area: "menu",
          bounds: Tt.menuBounds
        };
      if ($e.indicatorIcon !== void 0 && Tt.indicatorIconBounds !== void 0 && Qi(Tt.indicatorIconBounds, rt, it))
        return {
          area: "indicator",
          bounds: Tt.indicatorIconBounds
        };
    }
  }, [ct, vt, K, Q, ie, ze]), be = w.useRef(0), Oe = w.useRef(), Ue = w.useRef(!1), tt = w.useCallback((J) => {
    const ye = ft.current, rt = q == null ? void 0 : q.current;
    if (ye === null || J.target !== ye && J.target !== rt)
      return;
    Ue.current = !0;
    const it = J.clientX, $e = J.clientY;
    if (J.target === rt && rt !== null) {
      const Tt = rt.getBoundingClientRect();
      if (it > Tt.right || $e > Tt.bottom)
        return;
    }
    const Be = ut(ye, it, $e, J);
    Oe.current = Be.location, Be.isTouch && (be.current = Date.now()), ee.current !== Be.isTouch && lt(Be.isTouch), !(Be.kind === Mi && $(ye, Be.location[0], it, $e) !== void 0) && (Be.kind === Br && Yr(Be.group, Be.bounds, Be.localEventX, Be.localEventY) !== void 0 || (E == null || E(Be), !Be.isTouch && Y !== !0 && Y !== Be.kind && Be.button < 3 && Be.button !== 1 && J.preventDefault()));
  }, [
    q,
    Y,
    ut,
    Yr,
    $,
    E
  ]);
  tr("pointerdown", tt, $t, !1);
  const Bt = w.useRef(0), Wn = w.useCallback((J) => {
    var Gt, Lt;
    const ye = Bt.current;
    Bt.current = Date.now();
    const rt = ft.current;
    if (Ue.current = !1, I === void 0 || rt === null)
      return;
    const it = q == null ? void 0 : q.current, $e = J.target !== rt && J.target !== it, Be = J.clientX, Tt = J.clientY, Ut = J.pointerType === "mouse" ? J.button < 3 : !0;
    let mt = ut(rt, Be, Tt, J);
    mt.isTouch && be.current !== 0 && Date.now() - be.current > 500 && (mt = {
      ...mt,
      isLongTouch: !0
    }), ye !== 0 && Date.now() - ye < (mt.isTouch ? 1e3 : 500) && (mt = {
      ...mt,
      isDoubleClick: !0
    }), ee.current !== mt.isTouch && lt(mt.isTouch), !$e && J.cancelable && Ut && J.preventDefault();
    const [Ln] = mt.location, kt = $(rt, Ln, Be, Tt);
    if (mt.kind === Mi && kt !== void 0) {
      (mt.button !== 0 || ((Gt = Oe.current) == null ? void 0 : Gt[0]) !== Ln || ((Lt = Oe.current) == null ? void 0 : Lt[1]) !== -1) && I(mt, !0);
      return;
    } else if (mt.kind === Br) {
      const Ft = Yr(mt.group, mt.bounds, mt.localEventX, mt.localEventY);
      if (Ft !== void 0) {
        mt.button === 0 && Ft.onClick(mt);
        return;
      }
    }
    I(mt, $e);
  }, [I, q, ut, $, Yr]);
  tr("pointerup", Wn, $t, !1);
  const jn = w.useCallback((J) => {
    var Ln, kt;
    const ye = ft.current;
    if (ye === null)
      return;
    const rt = q == null ? void 0 : q.current, it = J.target !== ye && J.target !== rt;
    let $e, Be, Tt = !0;
    J instanceof MouseEvent ? ($e = J.clientX, Be = J.clientY, Tt = J.button < 3) : ($e = J.changedTouches[0].clientX, Be = J.changedTouches[0].clientY);
    const Ut = ut(ye, $e, Be, J);
    ee.current !== Ut.isTouch && lt(Ut.isTouch), !it && J.cancelable && Tt && J.preventDefault();
    const [mt] = Ut.location;
    if (Ut.kind === Mi) {
      const Gt = $(ye, mt, $e, Be);
      Gt !== void 0 && Ut.button === 0 && ((Ln = Oe.current) == null ? void 0 : Ln[0]) === mt && ((kt = Oe.current) == null ? void 0 : kt[1]) === -1 && (Gt.area === "menu" ? g == null || g(mt, Gt.bounds) : Gt.area === "indicator" && (m == null || m(mt, Gt.bounds)));
    }
  }, [q, ut, $, g, m]);
  tr("click", jn, $t, !1);
  const hr = w.useCallback((J) => {
    const ye = ft.current, rt = q == null ? void 0 : q.current;
    if (ye === null || J.target !== ye && J.target !== rt || P === void 0)
      return;
    const it = ut(ye, J.clientX, J.clientY, J);
    P(it, () => {
      J.cancelable && J.preventDefault();
    });
  }, [q, ut, P]);
  tr("contextmenu", hr, (q == null ? void 0 : q.current) ?? null, !1);
  const yi = w.useCallback((J) => {
    wt.current = new Rs(J.map((ye) => ye.item)), kn.current = J, un.current(), wt.current = void 0;
  }, []), xt = w.useMemo(() => new nA(yi), [yi]), Li = w.useRef(xt);
  Li.current = xt, w.useLayoutEffect(() => {
    const J = Li.current;
    if (Yt === void 0 || Yt[1] < 0) {
      J.setHovered(Yt);
      return;
    }
    const ye = h(Yt, !0), rt = Ct(ye), it = rt === void 0 && ye.kind === Fe.Custom || (rt == null ? void 0 : rt.needsHover) !== void 0 && (typeof rt.needsHover == "boolean" ? rt.needsHover : rt.needsHover(ye));
    J.setHovered(it ? Yt : void 0);
  }, [h, Ct, Yt]);
  const $i = w.useRef(), or = w.useCallback((J) => {
    var Ut;
    const ye = ft.current;
    if (ye === null)
      return;
    const rt = q == null ? void 0 : q.current, it = J.target !== ye && J.target !== rt, $e = ut(ye, J.clientX, J.clientY, J);
    if ($e.kind !== "out-of-bounds" && it && !Ue.current && !$e.isTouch)
      return;
    const Be = (mt, Ln) => {
      Me((kt) => kt === mt || (kt == null ? void 0 : kt[0][0]) === (mt == null ? void 0 : mt[0][0]) && (kt == null ? void 0 : kt[0][1]) === (mt == null ? void 0 : mt[0][1]) && ((kt == null ? void 0 : kt[1][0]) === (mt == null ? void 0 : mt[1][0]) && (kt == null ? void 0 : kt[1][1]) === (mt == null ? void 0 : mt[1][1]) || !Ln) ? kt : mt);
    };
    if (!K1($e, $i.current))
      nt(void 0), L == null || L($e), Be($e.kind === rl ? void 0 : [$e.location, [$e.localEventX, $e.localEventY]], !0), $i.current = $e;
    else if ($e.kind === "cell" || $e.kind === Mi || $e.kind === Br) {
      let mt = !1, Ln = !0;
      if ($e.kind === "cell") {
        const Gt = h($e.location);
        Ln = ((Ut = Ct(Gt)) == null ? void 0 : Ut.needsHoverPosition) ?? Gt.kind === Fe.Custom, mt = Ln;
      } else
        mt = !0;
      const kt = [$e.location, [$e.localEventX, $e.localEventY]];
      Be(kt, Ln), Ht.current = kt, mt && Sn(new Rs([$e.location]));
    }
    const Tt = $e.location[0] >= (oe ? 0 : 1);
    G($e.kind === Mi && $e.isEdge && Tt && ce === !0), Ur($e.kind === "cell" && $e.isFillHandle), M == null || M(J), N($e);
  }, [
    q,
    ut,
    oe,
    ce,
    M,
    N,
    L,
    h,
    Ct,
    Sn
  ]);
  tr("pointermove", or, $t, !0);
  const fo = w.useCallback((J) => {
    const ye = ft.current;
    if (ye === null)
      return;
    let rt, it;
    C.current !== void 0 && (rt = vt(ye, C.current.cell[0], C.current.cell[1]), it = C.current.cell), F == null || F({
      bounds: rt,
      stopPropagation: () => J.stopPropagation(),
      preventDefault: () => J.preventDefault(),
      cancel: () => {
      },
      ctrlKey: J.ctrlKey,
      metaKey: J.metaKey,
      shiftKey: J.shiftKey,
      altKey: J.altKey,
      key: J.key,
      keyCode: J.keyCode,
      rawEvent: J,
      location: it
    });
  }, [F, C, vt]), tn = w.useCallback((J) => {
    const ye = ft.current;
    if (ye === null)
      return;
    let rt, it;
    C.current !== void 0 && (rt = vt(ye, C.current.cell[0], C.current.cell[1]), it = C.current.cell), O == null || O({
      bounds: rt,
      stopPropagation: () => J.stopPropagation(),
      preventDefault: () => J.preventDefault(),
      cancel: () => {
      },
      ctrlKey: J.ctrlKey,
      metaKey: J.metaKey,
      shiftKey: J.shiftKey,
      altKey: J.altKey,
      key: J.key,
      keyCode: J.keyCode,
      rawEvent: J,
      location: it
    });
  }, [O, C, vt]), Fi = w.useCallback((J) => {
    if (ft.current = J, j !== void 0 && (j.current = J), je != null && je.eventTarget)
      It.current = je.eventTarget;
    else if (J === null)
      It.current = window;
    else {
      const ye = J.getRootNode();
      ye === document && (It.current = window), It.current = ye;
    }
  }, [j, je == null ? void 0 : je.eventTarget]), Gs = w.useCallback((J) => {
    const ye = ft.current;
    if (ye === null || Y === !1 || ie) {
      J.preventDefault();
      return;
    }
    let rt, it;
    const $e = ut(ye, J.clientX, J.clientY);
    if (Y !== !0 && $e.kind !== Y) {
      J.preventDefault();
      return;
    }
    const Be = (Gt, Lt) => {
      rt = Gt, it = Lt;
    };
    let Tt, Ut, mt;
    const Ln = (Gt, Lt, Ft) => {
      Tt = Gt, Ut = Lt, mt = Ft;
    };
    let kt = !1;
    if (U == null || U({
      ...$e,
      setData: Be,
      setDragImage: Ln,
      preventDefault: () => kt = !0,
      defaultPrevented: () => kt
    }), !kt && rt !== void 0 && it !== void 0 && J.dataTransfer !== null)
      if (J.dataTransfer.setData(rt, it), J.dataTransfer.effectAllowed = "copyLink", Tt !== void 0 && Ut !== void 0 && mt !== void 0)
        J.dataTransfer.setDragImage(Tt, Ut, mt);
      else {
        const [Gt, Lt] = $e.location;
        if (Lt !== void 0) {
          const Ft = document.createElement("canvas"), Pt = vt(ye, Gt, Lt);
          mr(Pt !== void 0);
          const Vt = Math.ceil(window.devicePixelRatio ?? 1);
          Ft.width = Pt.width * Vt, Ft.height = Pt.height * Vt;
          const En = Ft.getContext("2d");
          En !== null && (En.scale(Vt, Vt), En.textBaseline = "middle", Lt === -1 ? (En.font = ze.headerFontFull, En.fillStyle = ze.bgHeader, En.fillRect(0, 0, Ft.width, Ft.height), O1(En, 0, 0, Pt.width, Pt.height, ct[Gt], !1, ze, !1, void 0, void 0, !1, 0, ke, Ae, !1)) : (En.font = ze.baseFontFull, En.fillStyle = ze.bgCell, En.fillRect(0, 0, Ft.width, Ft.height), P1(En, h([Gt, Lt]), 0, Lt, !1, !1, 0, 0, Pt.width, Pt.height, !1, ze, ze.bgCell, en, ke, 1, void 0, !1, 0, void 0, void 0, void 0, Gn, Ct, () => {
          }))), Ft.style.left = "-100%", Ft.style.position = "absolute", Ft.style.width = `${Pt.width}px`, Ft.style.height = `${Pt.height}px`, document.body.append(Ft), J.dataTransfer.setDragImage(Ft, Pt.width / 2, Pt.height / 2), window.setTimeout(() => {
            Ft.remove();
          }, 0);
        }
      }
    else
      J.preventDefault();
  }, [
    Y,
    ie,
    ut,
    U,
    vt,
    ze,
    ct,
    ke,
    Ae,
    h,
    en,
    Gn,
    Ct
  ]);
  tr("dragstart", Gs, (q == null ? void 0 : q.current) ?? null, !1, !1);
  const ho = w.useRef(), Tl = w.useCallback((J) => {
    const ye = ft.current;
    if (He !== void 0 && J.preventDefault(), ye === null || We === void 0)
      return;
    const rt = ut(ye, J.clientX, J.clientY), [it, $e] = rt.location, Be = it - (oe ? 0 : 1), [Tt, Ut] = ho.current ?? [];
    (Tt !== Be || Ut !== $e) && (ho.current = [Be, $e], We([Be, $e], J.dataTransfer));
  }, [oe, ut, We, He]);
  tr("dragover", Tl, (q == null ? void 0 : q.current) ?? null, !1, !1);
  const El = w.useCallback(() => {
    ho.current = void 0, re == null || re();
  }, [re]);
  tr("dragend", El, (q == null ? void 0 : q.current) ?? null, !1, !1);
  const Xr = w.useCallback((J) => {
    const ye = ft.current;
    if (ye === null || He === void 0)
      return;
    J.preventDefault();
    const rt = ut(ye, J.clientX, J.clientY), [it, $e] = rt.location, Be = it - (oe ? 0 : 1);
    He([Be, $e], J.dataTransfer);
  }, [oe, ut, He]);
  tr("drop", Xr, (q == null ? void 0 : q.current) ?? null, !1, !1);
  const bi = w.useCallback(() => {
    Le == null || Le();
  }, [Le]);
  tr("dragleave", bi, (q == null ? void 0 : q.current) ?? null, !1, !1);
  const pr = w.useRef(C);
  pr.current = C;
  const se = w.useRef(null), vn = w.useCallback((J) => {
    var ye;
    ft.current === null || !ft.current.contains(document.activeElement) || (J === null && pr.current.current !== void 0 ? (ye = j == null ? void 0 : j.current) == null || ye.focus({
      preventScroll: !0
    }) : J !== null && J.focus({
      preventScroll: !0
    }), se.current = J);
  }, [j]);
  w.useImperativeHandle(e, () => ({
    focus: () => {
      var ye;
      const J = se.current;
      J === null || !document.contains(J) ? (ye = j == null ? void 0 : j.current) == null || ye.focus({
        preventScroll: !0
      }) : J.focus({
        preventScroll: !0
      });
    },
    getBounds: (J, ye) => {
      if (!(j === void 0 || j.current === null))
        return vt(j.current, J ?? 0, ye ?? -1);
    },
    damage: Pr,
    getMouseArgsForPosition: (J, ye, rt) => {
      if (!(j === void 0 || j.current === null))
        return ut(j.current, J, ye, rt);
    }
  }), [j, Pr, vt, ut]);
  const oi = w.useRef(), Ml = fT(() => {
    var Ut, mt, Ln;
    if (n < 50 || (je == null ? void 0 : je.disableAccessibilityTree) === !0)
      return null;
    let J = Mf(ct, pt, n, W, Xe);
    const ye = oe ? 0 : -1;
    !oe && ((Ut = J[0]) == null ? void 0 : Ut.sourceIndex) === 0 && (J = J.slice(1));
    const [rt, it] = ((mt = C.current) == null ? void 0 : mt.cell) ?? [], $e = (Ln = C.current) == null ? void 0 : Ln.range, Be = J.map((kt) => kt.sourceIndex), Tt = Yi(a, Math.min(f, a + i));
    return rt !== void 0 && it !== void 0 && !(Be.includes(rt) && Tt.includes(it)) && vn(null), w.createElement(
      "table",
      { key: "access-tree", role: "grid", "aria-rowcount": f + 1, "aria-multiselectable": "true", "aria-colcount": ct.length + ye },
      w.createElement(
        "thead",
        { role: "rowgroup" },
        w.createElement("tr", { role: "row", "aria-rowindex": 1 }, J.map((kt) => w.createElement("th", { role: "columnheader", "aria-selected": C.columns.hasIndex(kt.sourceIndex), "aria-colindex": kt.sourceIndex + 1 + ye, tabIndex: -1, onFocus: (Gt) => {
          if (Gt.target !== se.current)
            return _e == null ? void 0 : _e([kt.sourceIndex, -1]);
        }, key: kt.sourceIndex }, kt.title)))
      ),
      w.createElement("tbody", { role: "rowgroup" }, Tt.map((kt) => w.createElement("tr", { role: "row", "aria-selected": C.rows.hasIndex(kt), key: kt, "aria-rowindex": kt + 2 }, J.map((Gt) => {
        const Lt = Gt.sourceIndex, Ft = qr(Lt, kt), Pt = rt === Lt && it === kt, Vt = $e !== void 0 && Lt >= $e.x && Lt < $e.x + $e.width && kt >= $e.y && kt < $e.y + $e.height, En = `glide-cell-${Lt}-${kt}`, Dr = [Lt, kt], Nr = h(Dr, !0);
        return w.createElement("td", { key: Ft, role: "gridcell", "aria-colindex": Lt + 1 + ye, "aria-selected": Vt, "aria-readonly": _o(Nr) || !Eo(Nr), id: En, "data-testid": En, onClick: () => {
          const wn = j == null ? void 0 : j.current;
          if (wn != null)
            return F == null ? void 0 : F({
              bounds: vt(wn, Lt, kt),
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
        }, onFocusCapture: (wn) => {
          var An, sn;
          if (!(wn.target === se.current || ((An = oi.current) == null ? void 0 : An[0]) === Lt && ((sn = oi.current) == null ? void 0 : sn[1]) === kt))
            return oi.current = Dr, _e == null ? void 0 : _e(Dr);
        }, ref: Pt ? vn : void 0, tabIndex: -1 }, sA(Nr, Ct));
      }))))
    );
  }, [
    n,
    ct,
    pt,
    W,
    Xe,
    f,
    a,
    i,
    C,
    vn,
    h,
    j,
    F,
    vt,
    _e
  ], 200), Hi = D === 0 || !z ? 0 : pt > D ? 1 : Er(-Xe / 100, 0, 1), Il = -a * 32 + Rt, po = k ? Er(-Il / 100, 0, 1) : 0, Fh = w.useMemo(() => {
    if (!Hi && !po)
      return null;
    const J = {
      position: "absolute",
      top: 0,
      left: ht,
      width: n - ht,
      height: r,
      opacity: Hi,
      pointerEvents: "none",
      transition: yt ? void 0 : "opacity 0.2s",
      boxShadow: "inset 13px 0 10px -13px rgba(0, 0, 0, 0.2)"
    }, ye = {
      position: "absolute",
      top: Se,
      left: 0,
      width: n,
      height: r,
      opacity: po,
      pointerEvents: "none",
      transition: ve ? void 0 : "opacity 0.2s",
      boxShadow: "inset 0 13px 10px -13px rgba(0, 0, 0, 0.2)"
    };
    return w.createElement(
      w.Fragment,
      null,
      Hi > 0 && w.createElement("div", { id: "shadow-x", style: J }),
      po > 0 && w.createElement("div", { id: "shadow-y", style: ye })
    );
  }, [Hi, po, ht, n, yt, Se, r, ve]), he = w.useMemo(() => ({
    position: "absolute",
    top: 0,
    left: 0
  }), []);
  return w.createElement(
    w.Fragment,
    null,
    w.createElement("canvas", { "data-testid": "data-grid-canvas", tabIndex: 0, onKeyDown: fo, onKeyUp: tn, onFocus: T, onBlur: A, ref: Fi, style: Jt }, Ml),
    w.createElement("canvas", { ref: we, style: he }),
    Fh
  );
}, lA = w.memo(w.forwardRef(aA));
function hs(t, e, n, r) {
  return Er(Math.round(e - (t.growOffset ?? 0)), Math.ceil(n), Math.floor(r));
}
const cA = (t) => {
  const [e, n] = w.useState(), [r, i] = w.useState(), [o, s] = w.useState(), [a, l] = w.useState(), [c, u] = w.useState(!1), [d, f] = w.useState(), [h, p] = w.useState(), [g, m] = w.useState(), [y, b] = w.useState(!1), [T, A] = w.useState(), { onHeaderMenuClick: v, onHeaderIndicatorClick: C, getCellContent: D, onColumnMoved: P, onColumnResize: S, onColumnResizeStart: z, onColumnResizeEnd: k, gridRef: x, maxColumnWidth: E, minColumnWidth: I, onRowMoved: M, lockColumns: N, onColumnProposeMove: L, onMouseDown: W, onMouseUp: oe, onItemHovered: F, onDragStart: O, canvasRef: ne } = t, j = (S ?? k ?? z) !== void 0, { columns: U, selection: re } = t, q = re.columns, ie = w.useCallback((te) => {
    const [Ae, _e] = te.location;
    o !== void 0 && a !== Ae && Ae >= N ? (u(!0), l(Ae)) : h !== void 0 && _e !== void 0 ? (b(!0), m(Math.max(0, _e))) : r === void 0 && !c && !y && (F == null || F(te));
  }, [o, h, a, F, N, r, c, y]), Z = P !== void 0, Q = w.useCallback((te) => {
    var Ae;
    if (te.button === 0) {
      const [_e, We] = te.location;
      if (te.kind === "out-of-bounds" && te.isEdge && j) {
        const He = (Ae = x == null ? void 0 : x.current) == null ? void 0 : Ae.getBounds(U.length - 1, -1);
        He !== void 0 && (n(He.x), i(U.length - 1));
      } else if (te.kind === "header" && _e >= N) {
        const He = ne == null ? void 0 : ne.current;
        if (te.isEdge && j && He) {
          n(te.bounds.x), i(_e);
          const Je = He.getBoundingClientRect().width / He.offsetWidth, yt = te.bounds.width / Je;
          z == null || z(U[_e], yt, _e, yt + (U[_e].growOffset ?? 0));
        } else te.kind === "header" && Z && (f(te.bounds.x), s(_e));
      } else te.kind === "cell" && N > 0 && _e === 0 && We !== void 0 && M !== void 0 && (A(te.bounds.y), p(We));
    }
    W == null || W(te);
  }, [W, j, N, M, x, U, Z, z, ne]), Y = w.useCallback((te, Ae) => {
    c || y || v == null || v(te, Ae);
  }, [c, y, v]), ce = w.useCallback((te, Ae) => {
    c || y || C == null || C(te, Ae);
  }, [c, y, C]), fe = w.useRef(-1), Ee = w.useCallback(() => {
    fe.current = -1, p(void 0), m(void 0), A(void 0), b(!1), s(void 0), l(void 0), f(void 0), u(!1), i(void 0), n(void 0);
  }, []), xe = w.useCallback((te, Ae) => {
    if (te.button === 0) {
      if (r !== void 0) {
        if ((q == null ? void 0 : q.hasIndex(r)) === !0)
          for (const We of q) {
            if (We === r)
              continue;
            const He = U[We], Le = hs(He, fe.current, I, E);
            S == null || S(He, Le, We, Le + (He.growOffset ?? 0));
          }
        const _e = hs(U[r], fe.current, I, E);
        if (k == null || k(U[r], _e, r, _e + (U[r].growOffset ?? 0)), q.hasIndex(r))
          for (const We of q) {
            if (We === r)
              continue;
            const He = U[We], Le = hs(He, fe.current, I, E);
            k == null || k(He, Le, We, Le + (He.growOffset ?? 0));
          }
      }
      Ee(), o !== void 0 && a !== void 0 && (L == null ? void 0 : L(o, a)) !== !1 && (P == null || P(o, a)), h !== void 0 && g !== void 0 && (M == null || M(h, g));
    }
    oe == null || oe(te, Ae);
  }, [
    oe,
    r,
    o,
    a,
    h,
    g,
    q,
    k,
    U,
    I,
    E,
    S,
    P,
    M,
    Ee,
    L
  ]), ze = w.useMemo(() => {
    if (!(o === void 0 || a === void 0) && o !== a && (L == null ? void 0 : L(o, a)) !== !1)
      return {
        src: o,
        dest: a
      };
  }, [o, a, L]), Qe = w.useCallback((te) => {
    const Ae = ne == null ? void 0 : ne.current;
    if (o !== void 0 && d !== void 0)
      Math.abs(te.clientX - d) > 20 && u(!0);
    else if (h !== void 0 && T !== void 0)
      Math.abs(te.clientY - T) > 20 && b(!0);
    else if (r !== void 0 && e !== void 0 && Ae) {
      const We = Ae.getBoundingClientRect().width / Ae.offsetWidth, He = (te.clientX - e) / We, Le = U[r], Je = hs(Le, He, I, E);
      if (S == null || S(Le, Je, r, Je + (Le.growOffset ?? 0)), fe.current = He, (q == null ? void 0 : q.first()) === r)
        for (const yt of q) {
          if (yt === r)
            continue;
          const ve = U[yt], je = hs(ve, fe.current, I, E);
          S == null || S(ve, je, yt, je + (ve.growOffset ?? 0));
        }
    }
  }, [
    o,
    d,
    h,
    T,
    r,
    e,
    U,
    I,
    E,
    S,
    q,
    ne
  ]), dt = w.useCallback((te, Ae) => {
    if (h === void 0 || g === void 0)
      return D(te, Ae);
    let [_e, We] = te;
    return We === g ? We = h : (We > g && (We -= 1), We >= h && (We += 1)), D([_e, We], Ae);
  }, [h, g, D]), et = w.useCallback((te) => {
    O == null || O(te), te.defaultPrevented() || Ee();
  }, [Ee, O]);
  return w.createElement(lA, { accessibilityHeight: t.accessibilityHeight, canvasRef: t.canvasRef, cellXOffset: t.cellXOffset, cellYOffset: t.cellYOffset, columns: t.columns, disabledRows: t.disabledRows, drawFocusRing: t.drawFocusRing, drawHeader: t.drawHeader, drawCell: t.drawCell, enableGroups: t.enableGroups, eventTargetRef: t.eventTargetRef, experimental: t.experimental, fillHandle: t.fillHandle, firstColAccessible: t.firstColAccessible, fixedShadowX: t.fixedShadowX, fixedShadowY: t.fixedShadowY, freezeColumns: t.freezeColumns, getCellRenderer: t.getCellRenderer, getGroupDetails: t.getGroupDetails, getRowThemeOverride: t.getRowThemeOverride, groupHeaderHeight: t.groupHeaderHeight, headerHeight: t.headerHeight, headerIcons: t.headerIcons, height: t.height, highlightRegions: t.highlightRegions, imageWindowLoader: t.imageWindowLoader, resizeColumn: r, isDraggable: t.isDraggable, isFilling: t.isFilling, isFocused: t.isFocused, onCanvasBlur: t.onCanvasBlur, onCanvasFocused: t.onCanvasFocused, onCellFocused: t.onCellFocused, onContextMenu: t.onContextMenu, onDragEnd: t.onDragEnd, onDragLeave: t.onDragLeave, onDragOverCell: t.onDragOverCell, onDrop: t.onDrop, onKeyDown: t.onKeyDown, onKeyUp: t.onKeyUp, onMouseMove: t.onMouseMove, prelightCells: t.prelightCells, rowHeight: t.rowHeight, rows: t.rows, selection: t.selection, smoothScrollX: t.smoothScrollX, smoothScrollY: t.smoothScrollY, theme: t.theme, freezeTrailingRows: t.freezeTrailingRows, hasAppendRow: t.hasAppendRow, translateX: t.translateX, translateY: t.translateY, resizeIndicator: t.resizeIndicator, verticalBorder: t.verticalBorder, width: t.width, getCellContent: dt, isResizing: r !== void 0, onHeaderMenuClick: Y, onHeaderIndicatorClick: ce, isDragging: c, onItemHovered: ie, onDragStart: et, onMouseDown: Q, allowResize: j, onMouseUp: xe, dragAndDropState: ze, onMouseMoveRaw: Qe, ref: x });
};
function uA(t) {
  const e = V(null), [n, r] = Ye({
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
  const r = V(null), i = V(null), o = V(null), s = V(0), a = V(e);
  a.current = e;
  const l = n.current;
  Ge(() => {
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
  var re, q;
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
  } = t, m = [], y = (f == null ? void 0 : f.sticky) ?? !1, b = (f == null ? void 0 : f.fill) ?? !1, T = w.useRef(0), A = w.useRef(0), v = w.useRef(null), C = typeof window > "u" ? 1 : window.devicePixelRatio, D = w.useRef(C);
  w.useEffect(() => {
    if (D.current !== C) {
      T.current = 0, A.current = 0, D.current = C;
      const ie = v.current;
      ie !== null && M.current(ie.scrollLeft, ie.scrollTop);
    }
  }, [C]);
  const P = w.useRef({
    scrollLeft: 0,
    scrollTop: 0,
    lockDirection: void 0
  }), S = w.useRef(null), z = mA(200), [k, x] = w.useState(!0), E = w.useRef(0);
  w.useLayoutEffect(() => {
    if (!k || z || P.current.lockDirection === void 0) return;
    const ie = v.current;
    if (ie === null) return;
    const [Z, Q] = P.current.lockDirection;
    Z !== void 0 ? ie.scrollLeft = Z : Q !== void 0 && (ie.scrollTop = Q), P.current.lockDirection = void 0;
  }, [z, k]);
  const I = w.useCallback((ie, Z) => {
    var _e;
    const Q = v.current;
    if (Q === null) return;
    Z = Z ?? Q.scrollTop, ie = ie ?? Q.scrollLeft;
    const Y = P.current.scrollTop, ce = P.current.scrollLeft, fe = ie - ce, Ee = Z - Y;
    z && fe !== 0 && Ee !== 0 && (Math.abs(fe) > 3 || Math.abs(Ee) > 3) && l && P.current.lockDirection === void 0 && (P.current.lockDirection = Math.abs(fe) < Math.abs(Ee) ? [ce, void 0] : [void 0, Y]);
    const xe = P.current.lockDirection;
    ie = (xe == null ? void 0 : xe[0]) ?? ie, Z = (xe == null ? void 0 : xe[1]) ?? Z, P.current.scrollLeft = ie, P.current.scrollTop = Z;
    const ze = Q.clientWidth, Qe = Q.clientHeight, dt = Z, et = A.current - dt, te = Q.scrollHeight - Qe;
    A.current = dt;
    let Ae;
    if (te > 0 && r > Q.scrollHeight + 5)
      if (Math.abs(et) > 2e3 || dt === 0 || dt === te) {
        const We = Math.max(0, Math.min(1, dt / te)), He = r - Qe;
        Ae = We * He, T.current = Ae;
      } else
        T.current -= et, Ae = T.current;
    else
      Ae = dt, T.current = Ae;
    Ae = Math.max(0, Math.min(Ae, r - Qe)), T.current = Ae, xe !== void 0 && (window.clearTimeout(E.current), x(!1), E.current = window.setTimeout(() => x(!0), 200)), o({
      x: ie,
      y: Ae,
      width: ze - u,
      height: Qe - c,
      paddingRight: ((_e = S.current) == null ? void 0 : _e.clientWidth) ?? 0
    });
  }, [c, u, r, o, l, z]);
  dA(h && tl.value, I, v);
  const M = w.useRef(I);
  M.current = I;
  const N = w.useRef(), L = w.useRef(!1);
  w.useLayoutEffect(() => {
    L.current ? I() : L.current = !0;
  }, [I, c, u]);
  const W = w.useCallback((ie) => {
    v.current = ie, p !== void 0 && (p.current = ie);
  }, [p]);
  let oe = 0, F = 0;
  const O = Math.min(r, pA);
  for (m.push(w.createElement("div", {
    key: oe++,
    style: {
      width: i,
      height: 0
    }
  })); F < O; ) {
    const ie = Math.min(gA, O - F);
    m.push(w.createElement("div", {
      key: oe++,
      style: {
        width: 0,
        height: ie
      }
    })), F += ie;
  }
  const {
    ref: ne,
    width: j,
    height: U
  } = uA(g);
  return typeof window < "u" && (((re = N.current) == null ? void 0 : re.height) !== U || ((q = N.current) == null ? void 0 : q.width) !== j) && (window.setTimeout(() => M.current(), 0), N.current = {
    width: j,
    height: U
  }), (j ?? 0) === 0 || (U ?? 0) === 0 ? w.createElement("div", {
    ref: ne
  }) : w.createElement("div", {
    ref: ne
  }, w.createElement(hA, {
    isSafari: tl.value
  }, w.createElement("div", {
    className: "dvn-underlay"
  }, e), w.createElement("div", {
    ref: W,
    style: N.current,
    draggable: s,
    onDragStart: (ie) => {
      s || (ie.stopPropagation(), ie.preventDefault());
    },
    className: "dvn-scroller " + (a ?? ""),
    onScroll: () => I()
  }, w.createElement("div", {
    className: "dvn-scroll-inner" + (d === void 0 ? " dvn-hidden" : "")
  }, w.createElement("div", {
    className: "dvn-stack"
  }, m), d !== void 0 && w.createElement(w.Fragment, null, !b && w.createElement("div", {
    className: "dvn-spacer"
  }), w.createElement("div", {
    ref: S,
    style: {
      height: U,
      maxHeight: n - Math.ceil(C % 1),
      position: "sticky",
      top: 0,
      paddingLeft: 1,
      marginBottom: -40,
      marginRight: u,
      flexGrow: b ? 1 : void 0,
      right: y ? u ?? 0 : void 0,
      pointerEvents: "auto"
    }
  }, d))))));
}, bA = (t) => {
  const { columns: e, rows: n, rowHeight: r, headerHeight: i, groupHeaderHeight: o, enableGroups: s, freezeColumns: a, experimental: l, nonGrowWidth: c, clientSize: u, className: d, onVisibleRegionChanged: f, scrollRef: h, preventDiagonalScrolling: p, rightElement: g, rightElementProps: m, overscrollX: y, overscrollY: b, initialSize: T, smoothScrollX: A = !1, smoothScrollY: v = !1, isDraggable: C } = t, { paddingRight: D, paddingBottom: P } = l ?? {}, [S, z] = u, k = w.useRef(), x = w.useRef(), E = w.useRef(), I = w.useRef(), M = c + Math.max(0, y ?? 0);
  let N = s ? i + o : i;
  if (typeof r == "number")
    N += n * r;
  else
    for (let F = 0; F < n; F++)
      N += r(F);
  b !== void 0 && (N += b);
  const L = w.useRef(), W = w.useCallback(() => {
    var ce, fe;
    if (L.current === void 0)
      return;
    const F = { ...L.current };
    let O = 0, ne = F.x < 0 ? -F.x : 0, j = 0, U = 0;
    F.x = F.x < 0 ? 0 : F.x;
    let re = 0;
    for (let Ee = 0; Ee < a; Ee++)
      re += e[Ee].width;
    for (const Ee of e) {
      const xe = O - re;
      if (F.x >= xe + Ee.width)
        O += Ee.width, U++, j++;
      else if (F.x > xe)
        O += Ee.width, A ? ne += xe - F.x : U++, j++;
      else if (F.x + F.width > xe)
        O += Ee.width, j++;
      else
        break;
    }
    let q = 0, ie = 0, Z = 0;
    if (typeof r == "number")
      v ? (ie = Math.floor(F.y / r), q = ie * r - F.y) : ie = Math.ceil(F.y / r), Z = Math.ceil(F.height / r) + ie, q < 0 && Z++;
    else {
      let Ee = 0;
      for (let xe = 0; xe < n; xe++) {
        const ze = r(xe), Qe = Ee + (v ? 0 : ze / 2);
        if (F.y >= Ee + ze)
          Ee += ze, ie++, Z++;
        else if (F.y > Qe)
          Ee += ze, v ? q += Qe - F.y : ie++, Z++;
        else if (F.y + F.height > ze / 2 + Ee)
          Ee += ze, Z++;
        else
          break;
      }
    }
    ie = Math.max(0, Math.min(ie, n - 1)), Z = Math.max(ie, Math.min(Z, n));
    const Q = {
      x: U,
      y: ie,
      width: j - U,
      height: Z - ie
    }, Y = k.current;
    (Y === void 0 || Y.y !== Q.y || Y.x !== Q.x || Y.height !== Q.height || Y.width !== Q.width || x.current !== ne || E.current !== q || F.width !== ((ce = I.current) == null ? void 0 : ce[0]) || F.height !== ((fe = I.current) == null ? void 0 : fe[1])) && (f == null || f({
      x: U,
      y: ie,
      width: j - U,
      height: Z - ie
    }, F.width, F.height, F.paddingRight ?? 0, ne, q), k.current = Q, x.current = ne, E.current = q, I.current = [F.width, F.height]);
  }, [e, r, n, f, a, A, v]), oe = w.useCallback((F) => {
    L.current = F, W();
  }, [W]);
  return w.useEffect(() => {
    W();
  }, [W]), w.createElement(
    yA,
    { scrollRef: h, className: d, kineticScrollPerfHack: l == null ? void 0 : l.kineticScrollPerfHack, preventDiagonalScrolling: p, draggable: C === !0 || typeof C == "string", scrollWidth: M + (D ?? 0), scrollHeight: N + (P ?? 0), clientHeight: z, rightElement: g, paddingBottom: P, paddingRight: D, rightElementProps: m, update: oe, initialSize: T },
    w.createElement(cA, { eventTargetRef: h, width: S, height: z, accessibilityHeight: t.accessibilityHeight, canvasRef: t.canvasRef, cellXOffset: t.cellXOffset, cellYOffset: t.cellYOffset, columns: t.columns, disabledRows: t.disabledRows, enableGroups: t.enableGroups, fillHandle: t.fillHandle, firstColAccessible: t.firstColAccessible, fixedShadowX: t.fixedShadowX, fixedShadowY: t.fixedShadowY, freezeColumns: t.freezeColumns, getCellContent: t.getCellContent, getCellRenderer: t.getCellRenderer, getGroupDetails: t.getGroupDetails, getRowThemeOverride: t.getRowThemeOverride, groupHeaderHeight: t.groupHeaderHeight, headerHeight: t.headerHeight, highlightRegions: t.highlightRegions, imageWindowLoader: t.imageWindowLoader, isFilling: t.isFilling, isFocused: t.isFocused, lockColumns: t.lockColumns, maxColumnWidth: t.maxColumnWidth, minColumnWidth: t.minColumnWidth, onHeaderMenuClick: t.onHeaderMenuClick, onHeaderIndicatorClick: t.onHeaderIndicatorClick, onMouseMove: t.onMouseMove, prelightCells: t.prelightCells, rowHeight: t.rowHeight, rows: t.rows, selection: t.selection, theme: t.theme, freezeTrailingRows: t.freezeTrailingRows, hasAppendRow: t.hasAppendRow, translateX: t.translateX, translateY: t.translateY, onColumnProposeMove: t.onColumnProposeMove, verticalBorder: t.verticalBorder, drawFocusRing: t.drawFocusRing, drawHeader: t.drawHeader, drawCell: t.drawCell, experimental: t.experimental, gridRef: t.gridRef, headerIcons: t.headerIcons, isDraggable: t.isDraggable, onCanvasBlur: t.onCanvasBlur, onCanvasFocused: t.onCanvasFocused, onCellFocused: t.onCellFocused, onColumnMoved: t.onColumnMoved, onColumnResize: t.onColumnResize, onColumnResizeEnd: t.onColumnResizeEnd, onColumnResizeStart: t.onColumnResizeStart, onContextMenu: t.onContextMenu, onDragEnd: t.onDragEnd, onDragLeave: t.onDragLeave, onDragOverCell: t.onDragOverCell, onDragStart: t.onDragStart, onDrop: t.onDrop, onItemHovered: t.onItemHovered, onKeyDown: t.onKeyDown, onKeyUp: t.onKeyUp, onMouseDown: t.onMouseDown, onMouseUp: t.onMouseUp, onRowMoved: t.onRowMoved, smoothScrollX: t.smoothScrollX, smoothScrollY: t.smoothScrollY, resizeIndicator: t.resizeIndicator })
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
  const { canvasRef: e, cellYOffset: n, rows: r, columns: i, searchInputRef: o, searchValue: s, searchResults: a, onSearchValueChange: l, getCellsForSelection: c, onSearchResultsChanged: u, showSearch: d = !1, onSearchClose: f } = t, [h] = w.useState(() => "search-box-" + Math.round(Math.random() * 1e3)), [p, g] = w.useState(""), m = s ?? p, y = w.useCallback((O) => {
    g(O), l == null || l(O);
  }, [l]), [b, T] = w.useState(), A = w.useRef(b);
  A.current = b, w.useEffect(() => {
    a !== void 0 && (a.length > 0 ? T((O) => ({
      rowsSearched: r,
      results: a.length,
      selectedIndex: (O == null ? void 0 : O.selectedIndex) ?? -1
    })) : T(void 0));
  }, [r, a]);
  const v = w.useRef();
  v.current === void 0 && (v.current = new AbortController());
  const C = w.useRef(), [D, P] = w.useState([]), S = a ?? D, z = w.useCallback(() => {
    C.current !== void 0 && (window.cancelAnimationFrame(C.current), C.current = void 0), v.current !== void 0 && v.current.abort(), v.current = new AbortController();
  }, []), k = w.useRef(n);
  k.current = n;
  const x = w.useCallback((O) => {
    const ne = new RegExp(O.replace(/([$()*+.?[\\\]^{|}-])/g, "\\$1"), "i");
    let j = k.current, U = Math.min(10, r), re = 0;
    T(void 0), P([]);
    const q = [], ie = async () => {
      var dt;
      if (c === void 0)
        return;
      const Z = performance.now(), Q = r - re;
      let Y = c({
        x: 0,
        y: j,
        width: i.length,
        height: Math.min(U, Q, r - j)
      }, v.current.signal);
      typeof Y == "function" && (Y = await Y());
      let ce = !1;
      for (const [et, te] of Y.entries())
        for (const [Ae, _e] of te.entries()) {
          let We;
          switch (_e.kind) {
            case Fe.Text:
            case Fe.Number:
              We = _e.displayData;
              break;
            case Fe.Uri:
            case Fe.Markdown:
              We = _e.data;
              break;
            case Fe.Boolean:
              We = typeof _e.data == "boolean" ? _e.data.toString() : void 0;
              break;
            case Fe.Image:
            case Fe.Bubble:
              We = _e.data.join("🐳");
              break;
            case Fe.Custom:
              We = _e.copyData;
              break;
          }
          We !== void 0 && ne.test(We) && (q.push([Ae, et + j]), ce = !0);
        }
      const fe = performance.now();
      ce && P([...q]), re += Y.length, mr(re <= r);
      const Ee = ((dt = A.current) == null ? void 0 : dt.selectedIndex) ?? -1;
      T({
        results: q.length,
        rowsSearched: re,
        selectedIndex: Ee
      }), u == null || u(q, Ee), j + U >= r ? j = 0 : j += U;
      const xe = fe - Z, ze = Math.max(xe, 1), Qe = SA / ze;
      U = Math.ceil(U * Qe), re < r && q.length < 1e3 && (C.current = window.requestAnimationFrame(ie));
    };
    z(), C.current = window.requestAnimationFrame(ie);
  }, [z, i.length, c, u, r]), E = w.useCallback(() => {
    var O;
    f == null || f(), T(void 0), P([]), u == null || u([], -1), z(), (O = e == null ? void 0 : e.current) == null || O.focus();
  }, [z, e, f, u]), I = w.useCallback((O) => {
    y(O.target.value), a === void 0 && (O.target.value === "" ? (T(void 0), P([]), z()) : x(O.target.value));
  }, [x, z, y, a]);
  w.useEffect(() => {
    o.current !== null && (y(""), T(void 0), D.length > 0 && (P([]), u == null || u([], -1)), d ? o.current.focus({ preventScroll: !0 }) : z());
  }, [d, o]);
  const M = w.useCallback((O) => {
    var j;
    if ((j = O == null ? void 0 : O.stopPropagation) == null || j.call(O), b === void 0 || b.results === 0)
      return;
    const ne = (b.selectedIndex + 1) % b.results;
    T({
      ...b,
      selectedIndex: ne
    }), u == null || u(S, ne);
  }, [b, u, S]), N = w.useCallback((O) => {
    var j;
    if ((j = O == null ? void 0 : O.stopPropagation) == null || j.call(O), b === void 0 || b.results === 0)
      return;
    let ne = (b.selectedIndex - 1) % b.results;
    ne < 0 && (ne += b.results), T({
      ...b,
      selectedIndex: ne
    }), u == null || u(S, ne);
  }, [u, S, b]), L = w.useCallback((O) => {
    (O.ctrlKey || O.metaKey) && O.nativeEvent.code === "KeyF" || O.key === "Escape" ? (E(), O.stopPropagation(), O.preventDefault()) : O.key === "Enter" && (O.shiftKey ? N() : M());
  }, [E, M, N]);
  w.useEffect(() => () => {
    z();
  }, [z]);
  const [W, oe] = w.useState(!1);
  w.useEffect(() => {
    if (d)
      oe(!0);
    else {
      const O = setTimeout(() => oe(!1), 150);
      return () => clearTimeout(O);
    }
  }, [d]);
  const F = w.useMemo(() => {
    if (!d && !W)
      return null;
    let O;
    b !== void 0 && (O = b.results >= 1e3 ? "over 1000" : `${b.results} result${b.results !== 1 ? "s" : ""}`, b.selectedIndex >= 0 && (O = `${b.selectedIndex + 1} of ${O}`));
    const ne = (re) => {
      re.stopPropagation();
    }, U = {
      width: `${r > 0 ? Math.floor(((b == null ? void 0 : b.rowsSearched) ?? 0) / r * 100) : 0}%`
    };
    return w.createElement(
      vA,
      { className: "gdg-search-bar" + (d ? "" : " out"), onMouseDown: ne, onMouseMove: ne, onMouseUp: ne, onClick: ne },
      w.createElement(
        "div",
        { className: "gdg-search-bar-inner" },
        w.createElement("input", { id: h, "aria-hidden": !d, "data-testid": "search-input", ref: o, onChange: I, value: m, tabIndex: d ? void 0 : -1, onKeyDownCapture: L }),
        w.createElement("button", { type: "button", "aria-label": "Previous Result", "aria-hidden": !d, tabIndex: d ? void 0 : -1, onClick: N, disabled: ((b == null ? void 0 : b.results) ?? 0) === 0 }, wA),
        w.createElement("button", { type: "button", "aria-label": "Next Result", "aria-hidden": !d, tabIndex: d ? void 0 : -1, onClick: M, disabled: ((b == null ? void 0 : b.results) ?? 0) === 0 }, xA),
        f !== void 0 && w.createElement("button", { type: "button", "aria-label": "Close Search", "aria-hidden": !d, "data-testid": "search-close-button", tabIndex: d ? void 0 : -1, onClick: E }, kA)
      ),
      b !== void 0 ? w.createElement(
        w.Fragment,
        null,
        w.createElement(
          "div",
          { className: "gdg-search-status" },
          w.createElement("div", { "data-testid": "search-result-area" }, O)
        ),
        w.createElement("div", { className: "gdg-search-progress", style: U })
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
    I,
    m,
    L,
    N,
    M,
    f,
    E
  ]);
  return w.createElement(
    w.Fragment,
    null,
    w.createElement(bA, { prelightCells: S, accessibilityHeight: t.accessibilityHeight, canvasRef: t.canvasRef, cellXOffset: t.cellXOffset, cellYOffset: t.cellYOffset, className: t.className, clientSize: t.clientSize, columns: t.columns, disabledRows: t.disabledRows, enableGroups: t.enableGroups, fillHandle: t.fillHandle, firstColAccessible: t.firstColAccessible, nonGrowWidth: t.nonGrowWidth, fixedShadowX: t.fixedShadowX, fixedShadowY: t.fixedShadowY, freezeColumns: t.freezeColumns, getCellContent: t.getCellContent, getCellRenderer: t.getCellRenderer, getGroupDetails: t.getGroupDetails, getRowThemeOverride: t.getRowThemeOverride, groupHeaderHeight: t.groupHeaderHeight, headerHeight: t.headerHeight, highlightRegions: t.highlightRegions, imageWindowLoader: t.imageWindowLoader, initialSize: t.initialSize, isFilling: t.isFilling, isFocused: t.isFocused, lockColumns: t.lockColumns, maxColumnWidth: t.maxColumnWidth, minColumnWidth: t.minColumnWidth, onHeaderMenuClick: t.onHeaderMenuClick, onHeaderIndicatorClick: t.onHeaderIndicatorClick, onMouseMove: t.onMouseMove, onVisibleRegionChanged: t.onVisibleRegionChanged, overscrollX: t.overscrollX, overscrollY: t.overscrollY, preventDiagonalScrolling: t.preventDiagonalScrolling, rightElement: t.rightElement, rightElementProps: t.rightElementProps, rowHeight: t.rowHeight, rows: t.rows, scrollRef: t.scrollRef, selection: t.selection, theme: t.theme, freezeTrailingRows: t.freezeTrailingRows, hasAppendRow: t.hasAppendRow, translateX: t.translateX, translateY: t.translateY, verticalBorder: t.verticalBorder, onColumnProposeMove: t.onColumnProposeMove, drawFocusRing: t.drawFocusRing, drawCell: t.drawCell, drawHeader: t.drawHeader, experimental: t.experimental, gridRef: t.gridRef, headerIcons: t.headerIcons, isDraggable: t.isDraggable, onCanvasBlur: t.onCanvasBlur, onCanvasFocused: t.onCanvasFocused, onCellFocused: t.onCellFocused, onColumnMoved: t.onColumnMoved, onColumnResize: t.onColumnResize, onColumnResizeEnd: t.onColumnResizeEnd, onColumnResizeStart: t.onColumnResizeStart, onContextMenu: t.onContextMenu, onDragEnd: t.onDragEnd, onDragLeave: t.onDragLeave, onDragOverCell: t.onDragOverCell, onDragStart: t.onDragStart, onDrop: t.onDrop, onItemHovered: t.onItemHovered, onKeyDown: t.onKeyDown, onKeyUp: t.onKeyUp, onMouseDown: t.onMouseDown, onMouseUp: t.onMouseUp, onRowMoved: t.onRowMoved, smoothScrollX: t.smoothScrollX, smoothScrollY: t.smoothScrollY, resizeIndicator: t.resizeIndicator }),
    F
  );
};
class RA extends w.PureComponent {
  constructor() {
    super(...arguments);
    Ve(this, "wrapperRef", w.createRef());
    Ve(this, "clickOutside", (n) => {
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
  } = t, [s, a] = Mt.useState(n);
  return Mt.createElement(RA, {
    style: {
      position: "absolute",
      left: e.x - i.left + 1,
      top: e.y - i.top,
      width: e.width - 2,
      height: e.height
    },
    className: "gdg-c1tqibwd",
    onClickOutside: r
  }, Mt.createElement(EA, {
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
function Wt(t, e, n) {
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
  const a = Mt.useCallback((u, d, f, h) => {
    var T;
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
    const p = n === "mixed" && (f || h === "drag") || n === "additive", g = (r === "mixed" || r === "additive") && p, m = (i === "mixed" || i === "additive") && p;
    let y = {
      current: u === void 0 ? void 0 : {
        ...u,
        rangeStack: h === "drag" ? ((T = t.current) == null ? void 0 : T.rangeStack) ?? [] : []
      },
      columns: g ? t.columns : nn.empty(),
      rows: m ? t.rows : nn.empty()
    };
    f && (o === "multi-rect" || o === "multi-cell") && y.current !== void 0 && t.current !== void 0 && (y = {
      ...y,
      current: {
        ...y.current,
        rangeStack: [...t.current.rangeStack, t.current.range]
      }
    }), e(y, d);
  }, [
    r,
    t,
    n,
    o,
    s,
    i,
    e
  ]), l = Mt.useCallback((u, d, f) => {
    u = u ?? t.rows, d !== void 0 && (u = u.add(d));
    let h;
    if (i === "exclusive" && u.length > 0)
      h = {
        current: void 0,
        columns: nn.empty(),
        rows: u
      };
    else {
      const p = f && n === "mixed" || n === "additive", g = f && r === "mixed" || r === "additive";
      h = {
        current: p ? t.current : void 0,
        columns: g ? t.columns : nn.empty(),
        rows: u
      };
    }
    e(h, !1);
  }, [r, t, n, i, e]), c = Mt.useCallback((u, d, f) => {
    u = u ?? t.columns, d !== void 0 && (u = u.add(d));
    let h;
    if (r === "exclusive" && u.length > 0)
      h = {
        current: void 0,
        rows: nn.empty(),
        columns: u
      };
    else {
      const p = f && n === "mixed" || n === "additive", g = f && i === "mixed" || i === "additive";
      h = {
        current: p ? t.current : void 0,
        rows: g ? t.rows : nn.empty(),
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
            kind: Fe.Loading,
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
          { kind: Fe.Loading, allowOverlay: !1 },
          ...f
        ])
      ) : d.map((f) => [{ kind: Fe.Loading, allowOverlay: !1 }, ...f]);
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
    case Fe.Boolean:
      return {
        formatted: t.data === !0 ? "TRUE" : t.data === !1 ? "FALSE" : t.data === hh ? "INDETERMINATE" : "",
        rawValue: t.data,
        format: "boolean"
      };
    case Fe.Custom:
      return {
        formatted: t.copyData,
        rawValue: t.copyData,
        format: "string"
      };
    case Fe.Image:
    case Fe.Bubble:
      return {
        formatted: t.data,
        rawValue: t.data,
        format: "string-array"
      };
    case Fe.Drilldown:
      return {
        formatted: t.data.map((e) => e.text),
        rawValue: t.data.map((e) => e.text),
        format: "string-array"
      };
    case Fe.Text:
      return {
        formatted: t.displayData ?? t.data,
        rawValue: t.data,
        format: "string"
      };
    case Fe.Uri:
      return {
        formatted: t.displayData ?? t.data,
        rawValue: t.data,
        format: "url"
      };
    case Fe.Markdown:
    case Fe.RowID:
      return {
        formatted: t.data,
        rawValue: t.data,
        format: "string"
      };
    case Fe.Number:
      return {
        formatted: t.displayData,
        rawValue: t.data,
        format: "number"
      };
    case Fe.Loading:
      return {
        formatted: "#LOADING",
        rawValue: "",
        format: "string"
      };
    case Fe.Protected:
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
          rawValue: [...g].map((m) => m.getAttribute("gdg-raw-value") ?? ""),
          formatted: [...g].map((m) => m.textContent ?? ""),
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
  const r = Mt.useRef(0), [i, o] = t ?? [0, 0];
  Mt.useEffect(() => {
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
  const [l, c, u, d, f, h] = Mt.useMemo(() => {
    if (!s || a === 16)
      return [t, e, n, r, i, o];
    const p = a / 16, g = t, m = Ph();
    return [
      typeof g == "number" ? g * p : (y) => Math.ceil(g(y) * p),
      Math.ceil(e * p),
      Math.ceil(n * p),
      {
        ...r,
        headerIconSize: ((r == null ? void 0 : r.headerIconSize) ?? m.headerIconSize) * p,
        cellHorizontalPadding: ((r == null ? void 0 : r.cellHorizontalPadding) ?? m.cellHorizontalPadding) * p,
        cellVerticalPadding: ((r == null ? void 0 : r.cellVerticalPadding) ?? m.cellVerticalPadding) * p
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
function jt(t, e) {
  return t === !0 ? e : t === !1 ? "" : t;
}
function Py(t) {
  const e = nl.value;
  return {
    activateCell: jt(t.activateCell, " |Enter|shift+Enter"),
    clear: jt(t.clear, "any+Escape"),
    closeOverlay: jt(t.closeOverlay, "any+Escape"),
    acceptOverlayDown: jt(t.acceptOverlayDown, "Enter"),
    acceptOverlayUp: jt(t.acceptOverlayUp, "shift+Enter"),
    acceptOverlayLeft: jt(t.acceptOverlayLeft, "shift+Tab"),
    acceptOverlayRight: jt(t.acceptOverlayRight, "Tab"),
    copy: t.copy,
    cut: t.cut,
    delete: jt(t.delete, e ? "Backspace|Delete" : "Delete"),
    downFill: jt(t.downFill, "primary+_68"),
    scrollToSelectedCell: jt(t.scrollToSelectedCell, "primary+Enter"),
    goDownCell: jt(t.goDownCell, "ArrowDown"),
    goDownCellRetainSelection: jt(t.goDownCellRetainSelection, "alt+ArrowDown"),
    goLeftCell: jt(t.goLeftCell, "ArrowLeft|shift+Tab"),
    goLeftCellRetainSelection: jt(t.goLeftCellRetainSelection, "alt+ArrowLeft"),
    goRightCell: jt(t.goRightCell, "ArrowRight|Tab"),
    goRightCellRetainSelection: jt(t.goRightCellRetainSelection, "alt+ArrowRight"),
    goUpCell: jt(t.goUpCell, "ArrowUp"),
    goUpCellRetainSelection: jt(t.goUpCellRetainSelection, "alt+ArrowUp"),
    goToFirstCell: jt(t.goToFirstCell, "primary+Home"),
    goToFirstColumn: jt(t.goToFirstColumn, "Home|primary+ArrowLeft"),
    goToFirstRow: jt(t.goToFirstRow, "primary+ArrowUp"),
    goToLastCell: jt(t.goToLastCell, "primary+End"),
    goToLastColumn: jt(t.goToLastColumn, "End|primary+ArrowRight"),
    goToLastRow: jt(t.goToLastRow, "primary+ArrowDown"),
    goToNextPage: jt(t.goToNextPage, "PageDown"),
    goToPreviousPage: jt(t.goToPreviousPage, "PageUp"),
    paste: t.paste,
    rightFill: jt(t.rightFill, "primary+_82"),
    search: jt(t.search, "primary+f"),
    selectAll: jt(t.selectAll, "primary+a"),
    selectColumn: jt(t.selectColumn, "ctrl+ "),
    selectGrowDown: jt(t.selectGrowDown, "shift+ArrowDown"),
    selectGrowLeft: jt(t.selectGrowLeft, "shift+ArrowLeft"),
    selectGrowRight: jt(t.selectGrowRight, "shift+ArrowRight"),
    selectGrowUp: jt(t.selectGrowUp, "shift+ArrowUp"),
    selectRow: jt(t.selectRow, "shift+ "),
    selectToFirstCell: jt(t.selectToFirstCell, "primary+shift+Home"),
    selectToFirstColumn: jt(t.selectToFirstColumn, "primary+shift+ArrowLeft"),
    selectToFirstRow: jt(t.selectToFirstRow, "primary+shift+ArrowUp"),
    selectToLastCell: jt(t.selectToLastCell, "primary+shift+End"),
    selectToLastColumn: jt(t.selectToLastColumn, "primary+shift+ArrowRight"),
    selectToLastRow: jt(t.selectToLastRow, "primary+shift+ArrowDown")
  };
}
function YA(t) {
  const e = yT(t);
  return Mt.useMemo(() => {
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
  const i = Mt.useMemo(() => t === void 0 ? void 0 : $h(t, e), [t, e]), o = Mt.useMemo(() => i == null ? void 0 : i.reduce((u, d) => (u[d.rowIndex] = d, u), {}), [i]), s = Mt.useMemo(() => i === void 0 ? e : i.reduce((u, d) => u + (d.isCollapsed ? 1 : d.rows + 1), 0), [i, e]), a = Mt.useMemo(() => t === void 0 || typeof n == "number" && t.height === n ? n : (u) => o != null && o[u] ? t.height : typeof n == "number" ? n : n(u), [o, t, n]), l = Mt.useCallback((u) => {
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
  }, [i]), c = Ei(r ?? (t == null ? void 0 : t.themeOverride), Mt.useCallback((u) => {
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
  const n = Mt.useMemo(() => t === void 0 ? void 0 : $h(t, e), [t, e]);
  return {
    getRowGroupingForPath: X1,
    updateRowGroupingByPath: Y1,
    mapper: Mt.useCallback((r) => {
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
const e_ = w.lazy(async () => await import("./data-grid-overlay-editor-BHfVvkMn.js"));
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
  kind: Fe.Loading,
  allowOverlay: !1
}, Ia = {
  columns: nn.empty(),
  rows: nn.empty(),
  current: void 0
}, r_ = (t, e) => {
  var Qh, ep, tp;
  const [n, r] = w.useState(Ia), [i, o] = w.useState(), s = w.useRef(null), a = w.useRef(null), [l, c] = w.useState(), u = w.useRef(), d = typeof window > "u" ? null : window, { imageEditorOverride: f, getRowThemeOverride: h, markdownDivCreateNode: p, width: g, height: m, columns: y, rows: b, getCellContent: T, onCellClicked: A, onCellActivated: v, onFillPattern: C, onFinishedEditing: D, coercePasteValue: P, drawHeader: S, drawCell: z, editorBloom: k, onHeaderClicked: x, onColumnProposeMove: E, rangeSelectionColumnSpanning: I = !0, spanRangeBehavior: M = "default", onGroupHeaderClicked: N, onCellContextMenu: L, className: W, onHeaderContextMenu: oe, getCellsForSelection: F, onGroupHeaderContextMenu: O, onGroupHeaderRenamed: ne, onCellEdited: j, onCellsEdited: U, onSearchResultsChanged: re, searchResults: q, onSearchValueChange: ie, searchValue: Z, onKeyDown: Q, onKeyUp: Y, keybindings: ce, editOnType: fe = !0, onRowAppended: Ee, onColumnAppended: xe, onColumnMoved: ze, validateCell: Qe, highlightRegions: dt, rangeSelect: et = "rect", columnSelect: te = "multi", rowSelect: Ae = "multi", rangeSelectionBlending: _e = "exclusive", columnSelectionBlending: We = "exclusive", rowSelectionBlending: He = "exclusive", onDelete: Le, onDragStart: Je, onMouseMove: yt, onPaste: ve, copyHeaders: je = !1, freezeColumns: Ct = 0, cellActivationBehavior: bt = "second-click", rowSelectionMode: Xe = "auto", columnSelectionMode: Rt = "auto", onHeaderMenuClick: pt, onHeaderIndicatorClick: ft, getGroupDetails: It, rowGrouping: $t, onSearchClose: en, onItemHovered: wt, onSelectionCleared: Nt, showSearch: zt, onVisibleRegionChanged: kn, gridSelection: on, onGridSelectionChange: de, minColumnWidth: Me = 50, maxColumnWidth: K = 500, maxColumnAutoWidth: G, provideEditor: we, trailingRowOptions: Ie, freezeTrailingRows: nt = 0, allowedFillDirections: Kt = "orthogonal", scrollOffsetX: lt, scrollOffsetY: ee, verticalBorder: ke, onDragOverCell: Se, onDrop: Ke, onColumnResize: gt, onColumnResizeEnd: Ot, onColumnResizeStart: ct, customRenderers: ht, fillHandle: vt, experimental: ut, fixedShadowX: Yt, fixedShadowY: xr, headerIcons: Ht, imageWindowLoader: mn, initialSize: On, isDraggable: Gn, onDragLeave: Xt, onRowMoved: zn, overscrollX: dr, overscrollY: yn, preventDiagonalScrolling: fr, rightElement: Yn, rightElementProps: un, trapFocus: Sn = !1, smoothScrollX: rr, smoothScrollY: Pr, scaleToRem: gi = !1, rowHeight: Ur = 34, headerHeight: Qn = 36, groupHeaderHeight: kr = Qn, theme: mi, isOutsideClick: Gr, renderers: ir, resizeIndicator: Re, scrollToActiveCell: Ze = !0, drawFocusRing: At = !0, portalElementRef: bn } = t, Jt = At === "no-editor" ? i === void 0 : At, Zt = typeof t.rowMarkers == "string" ? void 0 : t.rowMarkers, In = (Zt == null ? void 0 : Zt.kind) ?? t.rowMarkers ?? "none", Yr = (Zt == null ? void 0 : Zt.width) ?? t.rowMarkerWidth, $ = (Zt == null ? void 0 : Zt.startIndex) ?? t.rowMarkerStartIndex ?? 1, be = (Zt == null ? void 0 : Zt.theme) ?? t.rowMarkerTheme, Oe = Zt == null ? void 0 : Zt.headerTheme, Ue = Zt == null ? void 0 : Zt.headerAlwaysVisible, tt = Ae !== "multi" || (Zt == null ? void 0 : Zt.headerDisabled) === !0, Bt = (Zt == null ? void 0 : Zt.checkboxStyle) ?? "square", Wn = Math.max(Me, 20), jn = Math.max(K, Wn), hr = Math.max(G ?? jn, Wn), yi = w.useMemo(() => typeof window > "u" ? { fontSize: "16px" } : window.getComputedStyle(document.documentElement), []), { rows: xt, rowNumberMapper: Li, rowHeight: $i, getRowThemeOverride: or } = VA($t, b, Ur, h), fo = w.useMemo(() => Number.parseFloat(yi.fontSize), [yi]), { rowHeight: tn, headerHeight: Fi, groupHeaderHeight: Gs, theme: ho, overscrollX: Tl, overscrollY: El } = GA({
    groupHeaderHeight: kr,
    headerHeight: Qn,
    overscrollX: dr,
    overscrollY: yn,
    remSize: fo,
    rowHeight: $i,
    scaleToRem: gi,
    theme: mi
  }), Xr = YA(ce), bi = Yr ?? (b > 1e4 ? 48 : b > 1e3 ? 44 : b > 100 ? 36 : 32), pr = In !== "none", se = pr ? 1 : 0, vn = Ie !== void 0, oi = (Ie == null ? void 0 : Ie.sticky) === !0, [Ml, Hi] = w.useState(!1), Il = zt ?? Ml, po = w.useCallback(() => {
    en !== void 0 ? en() : Hi(!1);
  }, [en]), he = w.useMemo(() => on === void 0 ? void 0 : Ea(on, se), [on, se]) ?? n, J = w.useRef();
  J.current === void 0 && (J.current = new AbortController()), w.useEffect(() => () => J == null ? void 0 : J.current.abort(), []);
  const [ye, rt] = _A(F, T, se, J.current, xt), it = w.useCallback((R, H, B) => {
    if (Qe === void 0)
      return !0;
    const X = [R[0] - se, R[1]];
    return Qe == null ? void 0 : Qe(X, H, B);
  }, [se, Qe]), $e = w.useRef(on), Be = w.useCallback((R, H) => {
    H && (R = $A(R, ye, se, M, J.current)), de !== void 0 ? ($e.current = Ea(R, -se), de($e.current)) : r(R);
  }, [de, ye, se, M]), Tt = Ei(gt, w.useCallback((R, H, B, X) => {
    gt == null || gt(y[B - se], H, B - se, X);
  }, [gt, se, y])), Ut = Ei(Ot, w.useCallback((R, H, B, X) => {
    Ot == null || Ot(y[B - se], H, B - se, X);
  }, [Ot, se, y])), mt = Ei(ct, w.useCallback((R, H, B, X) => {
    ct == null || ct(y[B - se], H, B - se, X);
  }, [ct, se, y])), Ln = Ei(S, w.useCallback((R, H) => (S == null ? void 0 : S({ ...R, columnIndex: R.columnIndex - se }, H)) ?? !1, [S, se])), kt = Ei(z, w.useCallback((R, H) => (z == null ? void 0 : z({ ...R, col: R.col - se }, H)) ?? !1, [z, se])), Gt = w.useCallback((R) => {
    if (Le !== void 0) {
      const H = Le(Ea(R, -se));
      return typeof H == "boolean" ? H : Ea(H, se);
    }
    return !0;
  }, [Le, se]), [Lt, Ft, Pt] = AA(he, Be, _e, We, He, et, I), Vt = w.useMemo(() => fi(Ph(), ho), [ho]), [En, Dr] = w.useState([0, 0, 0]), Nr = w.useMemo(() => {
    if (ir === void 0)
      return {};
    const R = {};
    for (const H of ir)
      R[H.kind] = H;
    return R;
  }, [ir]), wn = w.useCallback((R) => R.kind !== Fe.Custom ? Nr[R.kind] : ht == null ? void 0 : ht.find((H) => H.isMatch(R)), [ht, Nr]);
  let { sizedColumns: An, nonGrowWidth: sn } = _E(y, xt, rt, En[0] - (se === 0 ? 0 : bi) - En[2], Wn, hr, Vt, wn, J.current);
  In !== "none" && (sn += bi);
  const Sr = w.useMemo(() => An.some((R) => R.group !== void 0), [An]), Xn = Sr ? Fi + Gs : Fi, go = he.rows.length, si = In === "none" ? void 0 : go === 0 ? !1 : go === xt ? !0 : void 0, qt = w.useMemo(() => In === "none" ? An : [
    {
      title: "",
      width: bi,
      icon: void 0,
      hasMenu: !1,
      style: "normal",
      themeOverride: be,
      rowMarker: Bt,
      rowMarkerChecked: si,
      headerRowMarkerTheme: Oe,
      headerRowMarkerAlwaysVisible: Ue,
      headerRowMarkerDisabled: tt
    },
    ...An
  ], [
    In,
    An,
    bi,
    be,
    Bt,
    si,
    Oe,
    Ue,
    tt
  ]), $n = w.useRef({
    height: 1,
    width: 1,
    x: 0,
    y: 0
  }), Bi = w.useRef(!1), { setVisibleRegion: vi, visibleRegion: ai, scrollRef: fn } = QA(lt, ee, tn, $n, () => Bi.current = !0);
  $n.current = ai;
  const nw = ai.x + se, Ys = ai.y, qn = w.useRef(null), er = w.useCallback((R) => {
    var H;
    R === !0 ? (H = qn.current) == null || H.focus() : window.requestAnimationFrame(() => {
      var B;
      (B = qn.current) == null || B.focus();
    });
  }, []), Vn = vn ? xt + 1 : xt, Cr = w.useCallback((R) => {
    const H = se === 0 ? R : R.map((X) => ({
      ...X,
      location: [X.location[0] - se, X.location[1]]
    })), B = U == null ? void 0 : U(H);
    if (B !== !0)
      for (const X of H)
        j == null || j(X.location, X.value);
    return B;
  }, [j, U, se]), [qi, Al] = w.useState(), Xs = he.current !== void 0 && he.current.range.width * he.current.range.height > 1 ? he.current.range : void 0, mo = Jt ? (Qh = he.current) == null ? void 0 : Qh.cell : void 0, Vs = mo == null ? void 0 : mo[0], Js = mo == null ? void 0 : mo[1], rw = w.useMemo(() => {
    if ((dt === void 0 || dt.length === 0) && (Xs ?? Vs ?? Js ?? qi) === void 0)
      return;
    const R = [];
    if (dt !== void 0)
      for (const H of dt) {
        const B = qt.length - H.range.x - se;
        B > 0 && R.push({
          color: H.color,
          range: {
            ...H.range,
            x: H.range.x + se,
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
    dt,
    qt.length,
    Vt.accentColor,
    se
  ]), Hh = w.useRef(qt);
  Hh.current = qt;
  const sr = w.useCallback(([R, H], B = !1) => {
    var ge, le, ue, me, Ce, qe, ot;
    const X = vn && H === Vn - 1;
    if (R === 0 && pr) {
      if (X)
        return Ma;
      const Pe = Li(H);
      return Pe === void 0 ? Ma : {
        kind: Ir.Marker,
        allowOverlay: !1,
        checkboxStyle: Bt,
        checked: (he == null ? void 0 : he.rows.hasIndex(H)) === !0,
        markerKind: In === "clickable-number" ? "number" : In,
        row: $ + Pe,
        drawHandle: zn !== void 0,
        cursor: In === "clickable-number" ? "pointer" : void 0
      };
    } else if (X) {
      const Et = R === se ? (Ie == null ? void 0 : Ie.hint) ?? "" : "", st = Hh.current[R];
      if (((ge = st == null ? void 0 : st.trailingRowOptions) == null ? void 0 : ge.disabled) === !0)
        return Ma;
      {
        const Dt = ((le = st == null ? void 0 : st.trailingRowOptions) == null ? void 0 : le.hint) ?? Et, _t = ((ue = st == null ? void 0 : st.trailingRowOptions) == null ? void 0 : ue.addIcon) ?? (Ie == null ? void 0 : Ie.addIcon);
        return {
          kind: Ir.NewRow,
          hint: Dt,
          allowOverlay: !1,
          icon: _t
        };
      }
    } else {
      const Pe = R - se;
      if (B || (ut == null ? void 0 : ut.strict) === !0) {
        const st = $n.current, Dt = st.x > Pe || Pe > st.x + st.width || st.y > H || H > st.y + st.height || H >= Nl.current, _t = Pe === ((Ce = (me = st.extras) == null ? void 0 : me.selected) == null ? void 0 : Ce[0]) && H === ((qe = st.extras) == null ? void 0 : qe.selected[1]);
        let St = !1;
        if (((ot = st.extras) == null ? void 0 : ot.freezeRegions) !== void 0) {
          for (const Qt of st.extras.freezeRegions)
            if (Qi(Qt, Pe, H)) {
              St = !0;
              break;
            }
        }
        if (Dt && !_t && !St)
          return Ma;
      }
      let Et = T([Pe, H]);
      return se !== 0 && Et.span !== void 0 && (Et = {
        ...Et,
        span: [Et.span[0] + se, Et.span[1] + se]
      }), Et;
    }
  }, [
    vn,
    Vn,
    pr,
    Li,
    Bt,
    he == null ? void 0 : he.rows,
    In,
    $,
    zn,
    se,
    Ie == null ? void 0 : Ie.hint,
    Ie == null ? void 0 : Ie.addIcon,
    ut == null ? void 0 : ut.strict,
    T
  ]), _l = w.useCallback((R) => {
    let H = (It == null ? void 0 : It(R)) ?? { name: R };
    return ne !== void 0 && R !== "" && (H = {
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
  }, [It, ne]), Uo = w.useCallback((R) => {
    var ue;
    const [H, B] = R.cell, X = qt[H], ae = (X == null ? void 0 : X.group) !== void 0 ? (ue = _l(X.group)) == null ? void 0 : ue.overrideTheme : void 0, ge = X == null ? void 0 : X.themeOverride, le = or == null ? void 0 : or(B);
    o({
      ...R,
      theme: fi(Vt, ae, ge, le, R.content.themeOverride)
    });
  }, [or, qt, _l, Vt]), yo = w.useCallback((R, H, B) => {
    var le;
    if (he.current === void 0)
      return;
    const [X, ae] = he.current.cell, ge = sr([X, ae]);
    if (ge.kind !== Fe.Boolean && ge.allowOverlay) {
      let ue = ge;
      if (B !== void 0)
        switch (ue.kind) {
          case Fe.Number: {
            const me = DR(() => B === "-" ? -0 : Number.parseFloat(B), 0);
            ue = {
              ...ue,
              data: Number.isNaN(me) ? 0 : me
            };
            break;
          }
          case Fe.Text:
          case Fe.Markdown:
          case Fe.Uri:
            ue = {
              ...ue,
              data: B
            };
            break;
        }
      Uo({
        target: R,
        content: ue,
        initialValue: B,
        cell: [X, ae],
        highlight: B === void 0,
        forceEditMode: B !== void 0,
        activation: H
      });
    } else ge.kind === Fe.Boolean && H.inputType === "keyboard" && ge.readonly !== !0 && (Cr([
      {
        location: he.current.cell,
        value: {
          ...ge,
          data: G1(ge.data)
        }
      }
    ]), (le = qn.current) == null || le.damage([{ cell: he.current.cell }]));
  }, [sr, he, Cr, Uo]), Bh = w.useCallback((R, H) => {
    var ae;
    const B = (ae = qn.current) == null ? void 0 : ae.getBounds(R, H);
    if (B === void 0 || fn.current === null)
      return;
    const X = sr([R, H]);
    X.allowOverlay && Uo({
      target: B,
      content: X,
      initialValue: void 0,
      highlight: !0,
      cell: [R, H],
      forceEditMode: !0,
      activation: { inputType: "keyboard", key: "Enter" }
    });
  }, [sr, fn, Uo]), Mn = w.useCallback((R, H, B = "both", X = 0, ae = 0, ge = void 0) => {
    if (fn.current !== null) {
      const le = qn.current, ue = a.current, me = typeof R != "number" ? R.unit === "cell" ? R.amount : void 0 : R, Ce = typeof H != "number" ? H.unit === "cell" ? H.amount : void 0 : H, qe = typeof R != "number" && R.unit === "px" ? R.amount : void 0, ot = typeof H != "number" && H.unit === "px" ? H.amount : void 0;
      if (le !== null && ue !== null) {
        let Pe = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        }, Et = 0, st = 0;
        if ((me !== void 0 || Ce !== void 0) && (Pe = le.getBounds((me ?? 0) + se, Ce ?? 0) ?? Pe, Pe.width === 0 || Pe.height === 0))
          return;
        const Dt = ue.getBoundingClientRect(), _t = Dt.width / ue.offsetWidth;
        if (qe !== void 0 && (Pe = {
          ...Pe,
          x: qe - Dt.left - fn.current.scrollLeft,
          width: 1
        }), ot !== void 0 && (Pe = {
          ...Pe,
          y: ot + Dt.top - fn.current.scrollTop,
          height: 1
        }), Pe !== void 0) {
          const St = {
            x: Pe.x - X,
            y: Pe.y - ae,
            width: Pe.width + 2 * X,
            height: Pe.height + 2 * ae
          };
          let Qt = 0;
          for (let Wl = 0; Wl < Ct; Wl++)
            Qt += An[Wl].width;
          let Cn = 0;
          const Fn = nt + (oi ? 1 : 0);
          Fn > 0 && (Cn = uo(Vn, Fn, tn));
          let ar = Qt * _t + Dt.left + se * bi * _t, Jr = Dt.right, Lr = Dt.top + Xn * _t, Zr = Dt.bottom - Cn * _t;
          const ia = Pe.width + X * 2;
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
          const oa = Pe.height + ae * 2;
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
          ar > St.x ? Et = St.x - ar : Jr < St.x + St.width && (Et = St.x + St.width - Jr), Lr > St.y ? st = St.y - Lr : Zr < St.y + St.height && (st = St.y + St.height - Zr), B === "vertical" || typeof R == "number" && R < Ct ? Et = 0 : (B === "horizontal" || typeof H == "number" && H >= Vn - Fn) && (st = 0), (Et !== 0 || st !== 0) && (_t !== 1 && (Et /= _t, st /= _t), fn.current.scrollTo({
            left: Et + fn.current.scrollLeft,
            top: st + fn.current.scrollTop,
            behavior: (ge == null ? void 0 : ge.behavior) ?? "auto"
          }));
        }
      }
    }
  }, [
    se,
    nt,
    bi,
    fn,
    Xn,
    Ct,
    An,
    Vn,
    oi,
    tn
  ]), Pl = w.useRef(Bh), Dl = w.useRef(T);
  Pl.current = Bh, Dl.current = T;
  const Nl = w.useRef(xt);
  Nl.current = xt;
  const qh = w.useRef(qt.length);
  qh.current = qt.length;
  const wi = w.useCallback(async (R, H = !0, B) => {
    var Ce;
    const X = qt[R];
    if (((Ce = X == null ? void 0 : X.trailingRowOptions) == null ? void 0 : Ce.disabled) === !0)
      return;
    const ae = Ee == null ? void 0 : Ee();
    let ge, le = !0;
    ae !== void 0 && (ge = await ae, ge === "top" && (le = !1), typeof ge == "number" && (le = !1));
    let ue = 0;
    const me = () => {
      if (Nl.current <= xt) {
        ue < 500 && window.setTimeout(me, ue), ue = 50 + ue * 2;
        return;
      }
      const qe = typeof ge == "number" ? ge : le ? xt : 0;
      ra.current(R - se, qe, "both", 0, 0, B ? { behavior: B } : void 0), Lt({
        cell: [R, qe],
        range: {
          x: R,
          y: qe,
          width: 1,
          height: 1
        }
      }, !1, !1, "edit");
      const ot = Dl.current([R - se, qe]);
      ot.allowOverlay && Eo(ot) && ot.readonly !== !0 && H && window.setTimeout(() => {
        Pl.current(R, qe);
      }, 0);
    };
    me();
  }, [qt, Ee, se, xt, Lt]), Zs = w.useCallback(async (R, H = !0) => {
    const B = xe == null ? void 0 : xe();
    let X, ae = !0;
    B !== void 0 && (X = await B, X === "left" && (ae = !1), typeof X == "number" && (ae = !1));
    let ge = 0;
    const le = () => {
      if (qh.current <= qt.length) {
        ge < 500 && window.setTimeout(le, ge), ge = 50 + ge * 2;
        return;
      }
      const ue = typeof X == "number" ? X : ae ? qt.length : 0;
      Mn(ue - se, R), Lt({
        cell: [ue, R],
        range: {
          x: ue,
          y: R,
          width: 1,
          height: 1
        }
      }, !1, !1, "edit");
      const me = Dl.current([ue - se, R]);
      me.allowOverlay && Eo(me) && me.readonly !== !0 && H && window.setTimeout(() => {
        Pl.current(ue, R);
      }, 0);
    };
    le();
  }, [qt, xe, se, Mn, Lt]), bo = w.useCallback((R) => {
    var B, X;
    const H = ((X = (B = An[R]) == null ? void 0 : B.trailingRowOptions) == null ? void 0 : X.targetColumn) ?? (Ie == null ? void 0 : Ie.targetColumn);
    if (typeof H == "number")
      return H + (pr ? 1 : 0);
    if (typeof H == "object") {
      const ae = y.indexOf(H);
      if (ae >= 0)
        return ae + (pr ? 1 : 0);
    }
  }, [An, y, pr, Ie == null ? void 0 : Ie.targetColumn]), xi = w.useRef(), vo = w.useRef(), Go = w.useCallback((R, H) => {
    var ae;
    const [B, X] = H;
    return fi(Vt, (ae = qt[B]) == null ? void 0 : ae.themeOverride, or == null ? void 0 : or(X), R.themeOverride);
  }, [or, qt, Vt]), { mapper: Wi } = JA($t, b), Or = $t == null ? void 0 : $t.navigationBehavior, Yo = w.useCallback((R) => {
    var Ce, qe, ot;
    const H = nl.value ? R.metaKey : R.ctrlKey, B = H && Ae === "multi", [X, ae] = R.location, ge = he.columns, le = he.rows, [ue, me] = ((Ce = he.current) == null ? void 0 : Ce.cell) ?? [];
    if (R.kind === "cell") {
      if (vo.current = void 0, ji.current = [X, ae], X === 0 && pr) {
        if (vn === !0 && ae === xt || In === "number" || Ae === "none")
          return;
        const Pe = sr(R.location);
        if (Pe.kind !== Ir.Marker)
          return;
        if (zn !== void 0) {
          const Dt = wn(Pe);
          mr((Dt == null ? void 0 : Dt.kind) === Ir.Marker);
          const _t = (qe = Dt == null ? void 0 : Dt.onClick) == null ? void 0 : qe.call(Dt, {
            ...R,
            cell: Pe,
            posX: R.localEventX,
            posY: R.localEventY,
            bounds: R.bounds,
            theme: Go(Pe, R.location),
            preventDefault: () => {
            }
          });
          if (_t === void 0 || _t.checked === Pe.checked)
            return;
        }
        o(void 0), er();
        const Et = le.hasIndex(ae), st = xi.current;
        if (Ae === "multi" && (R.shiftKey || R.isLongTouch === !0) && st !== void 0 && le.hasIndex(st)) {
          const Dt = [Math.min(st, ae), Math.max(st, ae) + 1];
          B || Xe === "multi" ? Ft(void 0, Dt, !0) : Ft(nn.fromSingleSelection(Dt), void 0, B);
        } else Ae === "multi" && (B || R.isTouch || Xe === "multi") ? Et ? Ft(le.remove(ae), void 0, !0) : (Ft(void 0, ae, !0), xi.current = ae) : Et && le.length === 1 ? Ft(nn.empty(), void 0, H) : (Ft(nn.fromSingleSelection(ae), void 0, H), xi.current = ae);
      } else if (X >= se && vn && ae === xt) {
        const Pe = bo(X);
        wi(Pe ?? X);
      } else if (ue !== X || me !== ae) {
        const Pe = sr(R.location), Et = wn(Pe);
        if ((Et == null ? void 0 : Et.onSelect) !== void 0) {
          let _t = !1;
          if (Et.onSelect({
            ...R,
            cell: Pe,
            posX: R.localEventX,
            posY: R.localEventY,
            bounds: R.bounds,
            preventDefault: () => _t = !0,
            theme: Go(Pe, R.location)
          }), _t)
            return;
        }
        if (Or === "block" && Wi(ae).isGroupHeader)
          return;
        const st = oi && ae === xt, Dt = oi && he !== void 0 && ((ot = he.current) == null ? void 0 : ot.cell[1]) === xt;
        if ((R.shiftKey || R.isLongTouch === !0) && ue !== void 0 && me !== void 0 && he.current !== void 0 && !Dt) {
          if (st)
            return;
          const _t = Math.min(X, ue), St = Math.max(X, ue), Qt = Math.min(ae, me), Cn = Math.max(ae, me);
          Lt({
            ...he.current,
            range: {
              x: _t,
              y: Qt,
              width: St - _t + 1,
              height: Cn - Qt + 1
            }
          }, !0, H, "click"), xi.current = void 0, er();
        } else
          Lt({
            cell: [X, ae],
            range: { x: X, y: ae, width: 1, height: 1 }
          }, !0, H, "click"), xi.current = void 0, o(void 0), er();
      }
    } else if (R.kind === "header")
      if (ji.current = [X, ae], o(void 0), pr && X === 0)
        xi.current = void 0, vo.current = void 0, !tt && Ae === "multi" && (le.length !== xt ? Ft(nn.fromSingleSelection([0, xt]), void 0, H) : Ft(nn.empty(), void 0, H), er());
      else {
        const Pe = vo.current;
        if (te === "multi" && (R.shiftKey || R.isLongTouch === !0) && Pe !== void 0 && ge.hasIndex(Pe)) {
          const Et = [Math.min(Pe, X), Math.max(Pe, X) + 1];
          H || R.isTouch || Rt === "multi" ? Pt(void 0, Et, H) : Pt(nn.fromSingleSelection(Et), void 0, H);
        } else te === "multi" && (H || R.isTouch || Rt === "multi") ? (ge.hasIndex(X) ? Pt(ge.remove(X), void 0, H) : Pt(void 0, X, H), vo.current = X) : te !== "none" && (ge.hasIndex(X) ? Pt(ge.remove(X), void 0, H) : Pt(nn.fromSingleSelection(X), void 0, H), vo.current = X);
        xi.current = void 0, er();
      }
    else R.kind === Br ? ji.current = [X, ae] : R.kind === rl && !R.isMaybeScrollbar && (Be(Ia, !1), o(void 0), er(), Nt == null || Nt(), xi.current = void 0, vo.current = void 0);
  }, [
    Ae,
    te,
    he,
    pr,
    se,
    vn,
    xt,
    In,
    sr,
    zn,
    er,
    Xe,
    Rt,
    wn,
    Go,
    Ft,
    bo,
    wi,
    Or,
    Wi,
    oi,
    Lt,
    tt,
    Pt,
    Be,
    Nt
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
      previousSelection: he,
      fillHandle: B
    }), ji.current = void 0, !R.isTouch && R.button === 0 && !B ? Yo(R) : !R.isTouch && R.button === 1 && (ji.current = R.location));
  }, [he, Yo]), [Ol, zl] = w.useState(), jh = w.useCallback((R) => {
    if (R.kind !== Br || te !== "multi")
      return;
    const H = nl.value ? R.metaKey : R.ctrlKey, [B] = R.location, X = he.columns;
    if (B < se)
      return;
    const ae = qt[B];
    let ge = B, le = B;
    for (let ue = B - 1; ue >= se && Ns(ae.group, qt[ue].group); ue--)
      ge--;
    for (let ue = B + 1; ue < qt.length && Ns(ae.group, qt[ue].group); ue++)
      le++;
    if (er(), H || R.isTouch || Rt === "multi")
      if (X.hasAll([ge, le + 1])) {
        let ue = X;
        for (let me = ge; me <= le; me++)
          ue = ue.remove(me);
        Pt(ue, void 0, H);
      } else
        Pt(void 0, [ge, le + 1], H);
    else
      Pt(nn.fromSingleSelection([ge, le + 1]), void 0, H);
  }, [
    te,
    er,
    he.columns,
    qt,
    se,
    Pt,
    Rt
  ]), wo = w.useRef(!1), Qs = w.useCallback(async (R) => {
    if (ye !== void 0 && Tt !== void 0) {
      const H = $n.current.y, B = $n.current.height;
      let X = ye({
        x: R,
        y: H,
        width: 1,
        height: Math.min(B, xt - H)
      }, J.current.signal);
      typeof X != "object" && (X = await X());
      const ae = An[R - se], le = document.createElement("canvas").getContext("2d", { alpha: !1 });
      if (le !== null) {
        le.font = Vt.baseFontFull;
        const ue = k1(le, Vt, ae, 0, X, Wn, jn, !1, wn);
        Tt == null || Tt(ae, ue.width, R, ue.width);
      }
    }
  }, [
    An,
    ye,
    jn,
    Vt,
    Wn,
    Tt,
    se,
    xt,
    wn
  ]), [ow, Ll] = w.useState(), xo = w.useCallback(async (R, H) => {
    var ue, me;
    const B = (ue = R.current) == null ? void 0 : ue.range;
    if (B === void 0 || ye === void 0 || H.current === void 0)
      return;
    const X = H.current.range;
    if (C !== void 0) {
      let Ce = !1;
      if (C({
        fillDestination: { ...X, x: X.x - se },
        patternSource: { ...B, x: B.x - se },
        preventDefault: () => Ce = !0
      }), Ce)
        return;
    }
    let ae = ye(B, J.current.signal);
    typeof ae != "object" && (ae = await ae());
    const ge = ae, le = [];
    for (let Ce = 0; Ce < X.width; Ce++)
      for (let qe = 0; qe < X.height; qe++) {
        const ot = [X.x + Ce, X.y + qe];
        if (f1(ot, B))
          continue;
        const Pe = ge[qe % B.height][Ce % B.width];
        _o(Pe) || !Eo(Pe) || le.push({
          location: ot,
          value: { ...Pe }
        });
      }
    Cr(le), (me = qn.current) == null || me.damage(le.map((Ce) => ({
      cell: Ce.location
    })));
  }, [ye, Cr, C, se]), Kh = w.useCallback(() => {
    if (he.current === void 0 || he.current.range.width <= 1)
      return;
    const R = {
      ...he,
      current: {
        ...he.current,
        range: {
          ...he.current.range,
          width: 1
        }
      }
    };
    xo(R, he);
  }, [xo, he]), Uh = w.useCallback(() => {
    if (he.current === void 0 || he.current.range.height <= 1)
      return;
    const R = {
      ...he,
      current: {
        ...he.current,
        range: {
          ...he.current.range,
          height: 1
        }
      }
    };
    xo(R, he);
  }, [xo, he]), sw = w.useCallback((R, H) => {
    var qe, ot;
    const B = l;
    if (c(void 0), Al(void 0), Ll(void 0), Xo.current = !1, H)
      return;
    if ((B == null ? void 0 : B.fillHandle) === !0 && he.current !== void 0 && ((qe = B.previousSelection) == null ? void 0 : qe.current) !== void 0) {
      if (qi === void 0)
        return;
      const Pe = {
        ...he,
        current: {
          ...he.current,
          range: _1(B.previousSelection.current.range, qi)
        }
      };
      xo(B.previousSelection, Pe), Be(Pe, !0);
      return;
    }
    const [X, ae] = R.location, [ge, le] = ji.current ?? [], ue = () => {
      wo.current = !0;
    }, me = (Pe) => {
      var st, Dt, _t;
      const Et = Pe.isTouch || ge === X && le === ae;
      if (Et && (A == null || A([X - se, ae], {
        ...Pe,
        preventDefault: ue
      })), Pe.button === 1)
        return !wo.current;
      if (!wo.current) {
        const St = sr(R.location), Qt = wn(St);
        if (Qt !== void 0 && Qt.onClick !== void 0 && Et) {
          const Fn = Qt.onClick({
            ...Pe,
            cell: St,
            posX: Pe.localEventX,
            posY: Pe.localEventY,
            bounds: Pe.bounds,
            theme: Go(St, R.location),
            preventDefault: ue
          });
          Fn !== void 0 && !_o(Fn) && To(Fn) && (Cr([{ location: Pe.location, value: Fn }]), (st = qn.current) == null || st.damage([
            {
              cell: Pe.location
            }
          ]));
        }
        if (wo.current || he.current === void 0)
          return !1;
        let Cn = !1;
        switch (St.activationBehaviorOverride ?? bt) {
          case "double-click":
          case "second-click": {
            if (((_t = (Dt = B == null ? void 0 : B.previousSelection) == null ? void 0 : Dt.current) == null ? void 0 : _t.cell) === void 0)
              break;
            const [Fn, ar] = he.current.cell, [Jr, Lr] = B.previousSelection.current.cell;
            Cn = X === Fn && X === Jr && ae === ar && ae === Lr && (Pe.isDoubleClick === !0 || bt === "second-click");
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
            pointerActivation: Pe.isDoubleClick === !0 ? "double-click" : St.activationBehaviorOverride ?? bt,
            pointerType: Pe.isTouch ? "touch" : "mouse"
          };
          return v == null || v([X - se, ae], ar), yo(Pe.bounds, ar), !0;
        }
      }
      return !1;
    }, Ce = R.location[0] - se;
    if (R.isTouch) {
      const Pe = $n.current, Et = Wh.current;
      if (Pe.x !== Et.x || Pe.y !== Et.y)
        return;
      if (R.isLongTouch === !0) {
        if (R.kind === "cell" && Ss((ot = he.current) == null ? void 0 : ot.cell, R.location)) {
          L == null || L([Ce, R.location[1]], {
            ...R,
            preventDefault: ue
          });
          return;
        } else if (R.kind === "header" && he.columns.hasIndex(X)) {
          oe == null || oe(Ce, { ...R, preventDefault: ue });
          return;
        } else if (R.kind === Br) {
          if (Ce < 0)
            return;
          O == null || O(Ce, { ...R, preventDefault: ue });
          return;
        }
      }
      R.kind === "cell" ? me(R) || Yo(R) : R.kind === Br ? N == null || N(Ce, { ...R, preventDefault: ue }) : (R.kind === Mi && (x == null || x(Ce, {
        ...R,
        preventDefault: ue
      })), Yo(R));
      return;
    }
    if (R.kind === "header") {
      if (Ce < 0)
        return;
      R.isEdge ? R.isDoubleClick === !0 && Qs(X) : R.button === 0 && X === ge && ae === le && (x == null || x(Ce, { ...R, preventDefault: ue }));
    }
    if (R.kind === Br) {
      if (Ce < 0)
        return;
      R.button === 0 && X === ge && ae === le && (N == null || N(Ce, { ...R, preventDefault: ue }), wo.current || jh(R));
    }
    R.kind === "cell" && (R.button === 0 || R.button === 1) && me(R), ji.current = void 0;
  }, [
    l,
    he,
    se,
    qi,
    xo,
    Be,
    A,
    sr,
    wn,
    bt,
    Go,
    Cr,
    v,
    yo,
    L,
    oe,
    O,
    Yo,
    N,
    x,
    Qs,
    jh
  ]), aw = w.useCallback((R) => {
    const H = {
      ...R,
      location: [R.location[0] - se, R.location[1]]
    };
    yt == null || yt(H), l !== void 0 && R.buttons === 0 && (c(void 0), Al(void 0), Ll(void 0), Xo.current = !1), Ll((B) => {
      var X;
      return Xo.current ? [R.scrollEdge[0], 0] : R.scrollEdge[0] === (B == null ? void 0 : B[0]) && R.scrollEdge[1] === B[1] ? B : l === void 0 || (((X = Rr.current) == null ? void 0 : X.location[0]) ?? 0) < se ? void 0 : R.scrollEdge;
    });
  }, [l, yt, se]), lw = w.useCallback((R, H) => {
    pt == null || pt(R - se, H);
  }, [pt, se]), cw = w.useCallback((R, H) => {
    ft == null || ft(R - se, H);
  }, [ft, se]), Vr = (ep = he == null ? void 0 : he.current) == null ? void 0 : ep.cell, uw = w.useCallback((R, H, B, X, ae, ge) => {
    Bi.current = !1;
    let le = Vr;
    le !== void 0 && (le = [le[0] - se, le[1]]);
    const ue = Ct === 0 ? void 0 : {
      x: 0,
      y: R.y,
      width: Ct,
      height: R.height
    }, me = [];
    ue !== void 0 && me.push(ue), nt > 0 && (me.push({
      x: R.x - se,
      y: xt - nt,
      width: R.width,
      height: nt
    }), Ct > 0 && me.push({
      x: 0,
      y: xt - nt,
      width: Ct,
      height: nt
    }));
    const Ce = {
      x: R.x - se,
      y: R.y,
      width: R.width,
      height: vn && R.y + R.height >= xt ? R.height - 1 : R.height,
      tx: ae,
      ty: ge,
      extras: {
        selected: le,
        freezeRegion: ue,
        freezeRegions: me
      }
    };
    $n.current = Ce, vi(Ce), Dr([H, B, X]), kn == null || kn(Ce, Ce.tx, Ce.ty, Ce.extras);
  }, [
    Vr,
    se,
    vn,
    xt,
    Ct,
    nt,
    vi,
    kn
  ]), dw = Ei(E, w.useCallback((R, H) => (E == null ? void 0 : E(R - se, H - se)) !== !1, [E, se])), fw = Ei(ze, w.useCallback((R, H) => {
    ze == null || ze(R - se, H - se), te !== "none" && Pt(nn.fromSingleSelection(H), void 0, !0);
  }, [te, ze, se, Pt])), $l = w.useRef(!1), hw = w.useCallback((R) => {
    if (R.location[0] === 0 && se > 0) {
      R.preventDefault();
      return;
    }
    Je == null || Je({
      ...R,
      location: [R.location[0] - se, R.location[1]]
    }), R.defaultPrevented() || ($l.current = !0), c(void 0);
  }, [Je, se]), pw = w.useCallback(() => {
    $l.current = !1;
  }, []), Gh = $t == null ? void 0 : $t.selectionBehavior, ea = w.useCallback((R) => {
    if (Gh !== "block-spanning")
      return;
    const { isGroupHeader: H, path: B, groupRows: X } = Wi(R);
    if (H)
      return [R, R];
    const ae = B[B.length - 1], ge = R - ae, le = R + X - ae - 1;
    return [ge, le];
  }, [Wi, Gh]), Fl = w.useRef(), Hl = w.useCallback((R) => {
    var H, B, X;
    if (!K1(R, Fl.current) && (Fl.current = R, !(((H = Rr == null ? void 0 : Rr.current) == null ? void 0 : H.button) !== void 0 && Rr.current.button >= 1))) {
      if (R.buttons !== 0 && l !== void 0 && ((B = Rr.current) == null ? void 0 : B.location[0]) === 0 && se === 1 && Ae === "multi" && l.previousSelection && !l.previousSelection.rows.hasIndex(Rr.current.location[1]) && he.rows.hasIndex(Rr.current.location[1])) {
        const ae = Math.min(Rr.current.location[1], R.location[1]), ge = Math.max(Rr.current.location[1], R.location[1]) + 1;
        Ft(nn.fromSingleSelection([ae, ge]), void 0, !1);
      } else if (R.buttons !== 0 && l !== void 0 && he.current !== void 0 && !$l.current && !Xo.current && (et === "rect" || et === "multi-rect")) {
        const [ae, ge] = he.current.cell;
        let [le, ue] = R.location;
        if (ue < 0 && (ue = $n.current.y), l.fillHandle === !0 && ((X = l.previousSelection) == null ? void 0 : X.current) !== void 0) {
          const me = l.previousSelection.current.range;
          ue = Math.min(ue, vn ? xt - 1 : xt);
          const Ce = zM(me, le, ue, Kt);
          Al(Ce);
        } else {
          if (vn && ge === xt)
            return;
          if (vn && ue === xt)
            if (R.kind === rl)
              ue--;
            else
              return;
          le = Math.max(le, se);
          const qe = ea(ge);
          ue = qe === void 0 ? ue : Er(ue, qe[0], qe[1]);
          const ot = le - ae, Pe = ue - ge, Et = {
            x: ot >= 0 ? ae : le,
            y: Pe >= 0 ? ge : ue,
            width: Math.abs(ot) + 1,
            height: Math.abs(Pe) + 1
          };
          Lt({
            ...he.current,
            range: Et
          }, !0, !1, "drag");
        }
      }
      wt == null || wt({ ...R, location: [R.location[0] - se, R.location[1]] });
    }
  }, [
    l,
    se,
    Ae,
    he,
    et,
    wt,
    Ft,
    vn,
    xt,
    Kt,
    ea,
    Lt
  ]), gw = w.useCallback(() => {
    var le, ue;
    const R = Fl.current;
    if (R === void 0)
      return;
    const [H, B] = R.scrollEdge;
    let [X, ae] = R.location;
    const ge = $n.current;
    H === -1 ? X = ((ue = (le = ge.extras) == null ? void 0 : le.freezeRegion) == null ? void 0 : ue.x) ?? ge.x : H === 1 && (X = ge.x + ge.width), B === -1 ? ae = Math.max(0, ge.y) : B === 1 && (ae = Math.min(xt - 1, ge.y + ge.height)), X = Er(X, 0, qt.length - 1), ae = Er(ae, 0, xt - 1), Hl({
      ...R,
      location: [X, ae]
    });
  }, [qt.length, Hl, xt]);
  UA(ow, fn, gw);
  const zr = w.useCallback((R) => {
    if (he.current === void 0)
      return;
    const [H, B] = R, [X, ae] = he.current.cell, ge = he.current.range;
    let le = ge.x, ue = ge.x + ge.width, me = ge.y, Ce = ge.y + ge.height;
    const [qe, ot] = ea(ae) ?? [0, xt - 1], Pe = ot + 1;
    if (B !== 0)
      switch (B) {
        case 2: {
          Ce = Pe, me = ae, Mn(0, Ce, "vertical");
          break;
        }
        case -2: {
          me = qe, Ce = ae + 1, Mn(0, me, "vertical");
          break;
        }
        case 1: {
          me < ae ? (me++, Mn(0, me, "vertical")) : (Ce = Math.min(Pe, Ce + 1), Mn(0, Ce, "vertical"));
          break;
        }
        case -1: {
          Ce > ae + 1 ? (Ce--, Mn(0, Ce, "vertical")) : (me = Math.max(qe, me - 1), Mn(0, me, "vertical"));
          break;
        }
        default:
          Ds();
      }
    if (H !== 0)
      if (H === 2)
        ue = qt.length, le = X, Mn(ue - 1 - se, 0, "horizontal");
      else if (H === -2)
        le = se, ue = X + 1, Mn(le - se, 0, "horizontal");
      else {
        let Et = [];
        if (ye !== void 0) {
          const st = ye({
            x: le,
            y: me,
            width: ue - le - se,
            height: Ce - me
          }, J.current.signal);
          typeof st == "object" && (Et = n_(st));
        }
        if (H === 1) {
          let st = !1;
          if (le < X) {
            if (Et.length > 0) {
              const Dt = Yi(le + 1, X + 1).find((_t) => !Et.includes(_t - se));
              Dt !== void 0 && (le = Dt, st = !0);
            } else
              le++, st = !0;
            st && Mn(le, 0, "horizontal");
          }
          st || (ue = Math.min(qt.length, ue + 1), Mn(ue - 1 - se, 0, "horizontal"));
        } else if (H === -1) {
          let st = !1;
          if (ue > X + 1) {
            if (Et.length > 0) {
              const Dt = Yi(ue - 1, X, -1).find((_t) => !Et.includes(_t - se));
              Dt !== void 0 && (ue = Dt, st = !0);
            } else
              ue--, st = !0;
            st && Mn(ue - se, 0, "horizontal");
          }
          st || (le = Math.max(se, le - 1), Mn(le - se, 0, "horizontal"));
        } else
          Ds();
      }
    Lt({
      cell: he.current.cell,
      range: {
        x: le,
        y: me,
        width: ue - le,
        height: Ce - me
      }
    }, !0, !1, "keyboard-select");
  }, [
    ye,
    ea,
    he,
    qt.length,
    se,
    xt,
    Mn,
    Lt
  ]), Bl = w.useRef(Ze);
  Bl.current = Ze;
  const ki = w.useCallback((R, H, B, X) => {
    const ae = Vn - (B ? 0 : 1);
    R = Er(R, se, An.length - 1 + se), H = Er(H, 0, ae);
    const ge = Vr == null ? void 0 : Vr[0], le = Vr == null ? void 0 : Vr[1];
    if (R === ge && H === le)
      return !1;
    if (X && he.current !== void 0) {
      const ue = [...he.current.rangeStack];
      (he.current.range.width > 1 || he.current.range.height > 1) && ue.push(he.current.range), Be({
        ...he,
        current: {
          cell: [R, H],
          range: { x: R, y: H, width: 1, height: 1 },
          rangeStack: ue
        }
      }, !0);
    } else
      Lt({
        cell: [R, H],
        range: { x: R, y: H, width: 1, height: 1 }
      }, !0, !1, "keyboard-nav");
    return u.current !== void 0 && u.current[0] === R && u.current[1] === H && (u.current = void 0), Bl.current && Mn(R - se, H), !0;
  }, [
    Vn,
    se,
    An.length,
    Vr,
    he,
    Mn,
    Be,
    Lt
  ]), mw = w.useCallback((R, H) => {
    (i == null ? void 0 : i.cell) !== void 0 && R !== void 0 && To(R) && (Cr([{ location: i.cell, value: R }]), window.requestAnimationFrame(() => {
      var ae;
      (ae = qn.current) == null || ae.damage([
        {
          cell: i.cell
        }
      ]);
    })), er(!0), o(void 0);
    const [B, X] = H;
    if (he.current !== void 0 && (B !== 0 || X !== 0)) {
      const ae = he.current.cell[1] === Vn - 1 && R !== void 0, ge = he.current.cell[0] === qt.length - 1 && R !== void 0;
      let le = !0;
      if (ae && X === 1 && Ee !== void 0) {
        le = !1;
        const ue = he.current.cell[0] + B, me = bo(ue);
        wi(me ?? ue, !1);
      }
      if (ge && B === 1 && xe !== void 0) {
        le = !1;
        const ue = he.current.cell[1] + X;
        Zs(ue, !1);
      }
      le && ki(Er(he.current.cell[0] + B, 0, qt.length - 1), Er(he.current.cell[1] + X, 0, Vn - 1), ae, !1);
    }
    D == null || D(R, H);
  }, [
    i == null ? void 0 : i.cell,
    er,
    he,
    D,
    Cr,
    Vn,
    ki,
    qt.length,
    wi,
    Zs,
    Ee,
    xe,
    bo
  ]), yw = w.useMemo(() => `gdg-overlay-${t_++}`, []), Ki = w.useCallback((R) => {
    var B, X, ae, ge;
    er();
    const H = [];
    for (let le = R.x; le < R.x + R.width; le++)
      for (let ue = R.y; ue < R.y + R.height; ue++) {
        const me = T([le - se, ue]);
        if (!me.allowOverlay && me.kind !== Fe.Boolean)
          continue;
        let Ce;
        if (me.kind === Fe.Custom) {
          const qe = wn(me), ot = (B = qe == null ? void 0 : qe.provideEditor) == null ? void 0 : B.call(qe, {
            ...me,
            location: [le - se, ue]
          });
          (qe == null ? void 0 : qe.onDelete) !== void 0 ? Ce = qe.onDelete(me) : NR(ot) && (Ce = (X = ot == null ? void 0 : ot.deletedValue) == null ? void 0 : X.call(ot, me));
        } else if (To(me) && me.allowOverlay || me.kind === Fe.Boolean) {
          const qe = wn(me);
          Ce = (ae = qe == null ? void 0 : qe.onDelete) == null ? void 0 : ae.call(qe, me);
        }
        Ce !== void 0 && !_o(Ce) && To(Ce) && H.push({ location: [le, ue], value: Ce });
      }
    Cr(H), (ge = qn.current) == null || ge.damage(H.map((le) => ({ cell: le.location })));
  }, [er, T, wn, Cr, se]), Vo = i !== void 0, Yh = w.useCallback((R) => {
    var Dt, _t;
    const H = () => {
      R.stopPropagation(), R.preventDefault();
    }, B = {
      didMatch: !1
    }, { bounds: X } = R, ae = he.columns, ge = he.rows, le = Xr;
    if (!Vo && Wt(le.clear, R, B))
      Be(Ia, !1), Nt == null || Nt();
    else if (!Vo && Wt(le.selectAll, R, B))
      Be({
        columns: nn.empty(),
        rows: nn.empty(),
        current: {
          cell: ((Dt = he.current) == null ? void 0 : Dt.cell) ?? [se, 0],
          range: {
            x: se,
            y: 0,
            width: y.length,
            height: xt
          },
          rangeStack: []
        }
      }, !1);
    else if (Wt(le.search, R, B))
      (_t = s == null ? void 0 : s.current) == null || _t.focus({ preventScroll: !0 }), Hi(!0);
    else if (Wt(le.delete, R, B)) {
      const St = (Gt == null ? void 0 : Gt(he)) ?? !0;
      if (St !== !1) {
        const Qt = St === !0 ? he : St;
        if (Qt.current !== void 0) {
          Ki(Qt.current.range);
          for (const Cn of Qt.current.rangeStack)
            Ki(Cn);
        }
        for (const Cn of Qt.rows)
          Ki({
            x: se,
            y: Cn,
            width: y.length,
            height: 1
          });
        for (const Cn of Qt.columns)
          Ki({
            x: Cn,
            y: 0,
            width: 1,
            height: xt
          });
      }
    }
    if (B.didMatch)
      return H(), !0;
    if (he.current === void 0)
      return !1;
    let [ue, me] = he.current.cell;
    const [, Ce] = he.current.cell;
    let qe = !1, ot = !1;
    if (Wt(le.scrollToSelectedCell, R, B))
      ra.current(ue - se, me);
    else if (te !== "none" && Wt(le.selectColumn, R, B))
      ae.hasIndex(ue) ? Pt(ae.remove(ue), void 0, !0) : te === "single" ? Pt(nn.fromSingleSelection(ue), void 0, !0) : Pt(void 0, ue, !0);
    else if (Ae !== "none" && Wt(le.selectRow, R, B))
      ge.hasIndex(me) ? Ft(ge.remove(me), void 0, !0) : Ae === "single" ? Ft(nn.fromSingleSelection(me), void 0, !0) : Ft(void 0, me, !0);
    else if (!Vo && X !== void 0 && Wt(le.activateCell, R, B))
      if (me === xt && vn)
        window.setTimeout(() => {
          const St = bo(ue);
          wi(St ?? ue);
        }, 0);
      else {
        const St = {
          inputType: "keyboard",
          key: R.key
        };
        v == null || v([ue - se, me], St), yo(X, St);
      }
    else he.current.range.height > 1 && Wt(le.downFill, R, B) ? Uh() : he.current.range.width > 1 && Wt(le.rightFill, R, B) ? Kh() : Wt(le.goToNextPage, R, B) ? me += Math.max(1, $n.current.height - 4) : Wt(le.goToPreviousPage, R, B) ? me -= Math.max(1, $n.current.height - 4) : Wt(le.goToFirstCell, R, B) ? (o(void 0), me = 0, ue = 0) : Wt(le.goToLastCell, R, B) ? (o(void 0), me = Number.MAX_SAFE_INTEGER, ue = Number.MAX_SAFE_INTEGER) : Wt(le.selectToFirstCell, R, B) ? (o(void 0), zr([-2, -2])) : Wt(le.selectToLastCell, R, B) ? (o(void 0), zr([2, 2])) : Vo ? (Wt(le.closeOverlay, R, B) && o(void 0), Wt(le.acceptOverlayDown, R, B) && (o(void 0), me++), Wt(le.acceptOverlayUp, R, B) && (o(void 0), me--), Wt(le.acceptOverlayLeft, R, B) && (o(void 0), ue--), Wt(le.acceptOverlayRight, R, B) && (o(void 0), ue++)) : (Wt(le.goDownCell, R, B) ? me += 1 : Wt(le.goUpCell, R, B) ? me -= 1 : Wt(le.goRightCell, R, B) ? ue += 1 : Wt(le.goLeftCell, R, B) ? ue -= 1 : Wt(le.goDownCellRetainSelection, R, B) ? (me += 1, qe = !0) : Wt(le.goUpCellRetainSelection, R, B) ? (me -= 1, qe = !0) : Wt(le.goRightCellRetainSelection, R, B) ? (ue += 1, qe = !0) : Wt(le.goLeftCellRetainSelection, R, B) ? (ue -= 1, qe = !0) : Wt(le.goToLastRow, R, B) ? me = xt - 1 : Wt(le.goToFirstRow, R, B) ? me = Number.MIN_SAFE_INTEGER : Wt(le.goToLastColumn, R, B) ? ue = Number.MAX_SAFE_INTEGER : Wt(le.goToFirstColumn, R, B) ? ue = Number.MIN_SAFE_INTEGER : (et === "rect" || et === "multi-rect") && (Wt(le.selectGrowDown, R, B) ? zr([0, 1]) : Wt(le.selectGrowUp, R, B) ? zr([0, -1]) : Wt(le.selectGrowRight, R, B) ? zr([1, 0]) : Wt(le.selectGrowLeft, R, B) ? zr([-1, 0]) : Wt(le.selectToLastRow, R, B) ? zr([0, 2]) : Wt(le.selectToFirstRow, R, B) ? zr([0, -2]) : Wt(le.selectToLastColumn, R, B) ? zr([2, 0]) : Wt(le.selectToFirstColumn, R, B) && zr([-2, 0])), ot = B.didMatch);
    if (Or !== void 0 && Or !== "normal" && me !== Ce) {
      const St = Or === "skip-up" || Or === "skip" || Or === "block", Qt = Or === "skip-down" || Or === "skip" || Or === "block", Cn = me < Ce;
      if (Cn && St) {
        for (; me >= 0 && Wi(me).isGroupHeader; )
          me--;
        me < 0 && (me = Ce);
      } else if (!Cn && Qt) {
        for (; me < xt && Wi(me).isGroupHeader; )
          me++;
        me >= xt && (me = Ce);
      }
    }
    const Et = ki(ue, me, !1, qe), st = B.didMatch;
    return st && (Et || !ot || Sn) && H(), st;
  }, [
    Or,
    Vo,
    he,
    Xr,
    te,
    Ae,
    et,
    se,
    Wi,
    xt,
    ki,
    Be,
    Nt,
    y.length,
    Gt,
    Sn,
    Ki,
    Pt,
    Ft,
    vn,
    bo,
    wi,
    v,
    yo,
    Uh,
    Kh,
    zr
  ]), Jo = w.useCallback((R) => {
    let H = !1;
    if (Q !== void 0 && Q({
      ...R,
      ...R.location && {
        location: [R.location[0] - se, R.location[1]]
      },
      cancel: () => {
        H = !0;
      }
    }), H || Yh(R) || he.current === void 0)
      return;
    const [B, X] = he.current.cell, ae = $n.current;
    if (fe && !R.metaKey && !R.ctrlKey && he.current !== void 0 && R.key.length === 1 && /[\p{L}\p{M}\p{N}\p{S}\p{P}]/u.test(R.key) && R.bounds !== void 0 && Eo(T([B - se, Math.max(0, Math.min(X, xt - 1))]))) {
      if ((!vn || X !== xt) && (ae.y > X || X > ae.y + ae.height || ae.x > B || B > ae.x + ae.width))
        return;
      const ge = {
        inputType: "keyboard",
        key: R.key
      };
      v == null || v([B - se, X], ge), yo(R.bounds, ge, R.key), R.stopPropagation(), R.preventDefault();
    }
  }, [
    fe,
    Q,
    Yh,
    he,
    T,
    se,
    xt,
    vn,
    v,
    yo
  ]), bw = w.useCallback((R, H) => {
    const B = R.location[0] - se;
    if (R.kind === "header" && (oe == null || oe(B, { ...R, preventDefault: H })), R.kind === Br) {
      if (B < 0)
        return;
      O == null || O(B, { ...R, preventDefault: H });
    }
    if (R.kind === "cell") {
      const [X, ae] = R.location;
      L == null || L([B, ae], {
        ...R,
        preventDefault: H
      }), pE(he, R.location) || ki(X, ae, !1, !1);
    }
  }, [
    he,
    L,
    O,
    oe,
    se,
    ki
  ]), ql = w.useCallback(async (R) => {
    var le, ue, me;
    if (!Xr.paste)
      return;
    function H(Ce, qe, ot, Pe) {
      var st, Dt;
      const Et = typeof ot == "object" ? (ot == null ? void 0 : ot.join(`
`)) ?? "" : (ot == null ? void 0 : ot.toString()) ?? "";
      if (!_o(Ce) && Eo(Ce) && Ce.readonly !== !0) {
        const _t = P == null ? void 0 : P(Et, Ce);
        if (_t !== void 0 && To(_t))
          return process.env.NODE_ENV !== "production" && _t.kind !== Ce.kind && console.warn("Coercion should not change cell kind."), {
            location: qe,
            value: _t
          };
        const St = wn(Ce);
        if (St === void 0)
          return;
        if (St.kind === Fe.Custom) {
          mr(Ce.kind === Fe.Custom);
          const Qt = (st = St.onPaste) == null ? void 0 : st.call(St, Et, Ce.data);
          return Qt === void 0 ? void 0 : {
            location: qe,
            value: {
              ...Ce,
              data: Qt
            }
          };
        } else {
          const Qt = (Dt = St.onPaste) == null ? void 0 : Dt.call(St, Et, Ce, {
            formatted: Pe,
            formattedString: typeof Pe == "string" ? Pe : Pe == null ? void 0 : Pe.join(`
`),
            rawValue: ot
          });
          return Qt === void 0 ? void 0 : (mr(Qt.kind === Ce.kind), {
            location: qe,
            value: Qt
          });
        }
      }
    }
    const B = he.columns, X = he.rows, ae = ((le = fn.current) == null ? void 0 : le.contains(document.activeElement)) === !0 || ((ue = a.current) == null ? void 0 : ue.contains(document.activeElement)) === !0;
    let ge;
    if (he.current !== void 0 ? ge = [he.current.range.x, he.current.range.y] : B.length === 1 ? ge = [B.first() ?? 0, 0] : X.length === 1 && (ge = [se, X.first() ?? 0]), ae && ge !== void 0) {
      let Ce, qe;
      const ot = "text/plain", Pe = "text/html";
      if (navigator.clipboard.read !== void 0) {
        const _t = await navigator.clipboard.read();
        for (const St of _t) {
          if (St.types.includes(Pe)) {
            const Cn = await (await St.getType(Pe)).text(), Fn = My(Cn);
            if (Fn !== void 0) {
              Ce = Fn;
              break;
            }
          }
          St.types.includes(ot) && (qe = await (await St.getType(ot)).text());
        }
      } else if (navigator.clipboard.readText !== void 0)
        qe = await navigator.clipboard.readText();
      else if (R !== void 0 && (R == null ? void 0 : R.clipboardData) !== null) {
        if (R.clipboardData.types.includes(Pe)) {
          const _t = R.clipboardData.getData(Pe);
          Ce = My(_t);
        }
        Ce === void 0 && R.clipboardData.types.includes(ot) && (qe = R.clipboardData.getData(ot));
      } else
        return;
      const [Et, st] = ge, Dt = [];
      do {
        if (ve === void 0) {
          const _t = sr(ge), St = qe ?? (Ce == null ? void 0 : Ce.map((Cn) => Cn.map((Fn) => Fn.rawValue).join("	")).join("	")) ?? "", Qt = H(_t, ge, St, void 0);
          Qt !== void 0 && Dt.push(Qt);
          break;
        }
        if (Ce === void 0) {
          if (qe === void 0)
            return;
          Ce = FA(qe);
        }
        if (ve === !1 || typeof ve == "function" && (ve == null ? void 0 : ve([ge[0] - se, ge[1]], Ce.map((_t) => _t.map((St) => {
          var Qt;
          return ((Qt = St.rawValue) == null ? void 0 : Qt.toString()) ?? "";
        })))) !== !0)
          return;
        for (const [_t, St] of Ce.entries()) {
          if (_t + st >= xt)
            break;
          for (const [Qt, Cn] of St.entries()) {
            const Fn = [Qt + Et, _t + st], [ar, Jr] = Fn;
            if (ar >= qt.length || Jr >= Vn)
              continue;
            const Lr = sr(Fn), Zr = H(Lr, Fn, Cn.rawValue, Cn.formatted);
            Zr !== void 0 && Dt.push(Zr);
          }
        }
      } while (!1);
      Cr(Dt), (me = qn.current) == null || me.damage(Dt.map((_t) => ({
        cell: _t.location
      })));
    }
  }, [
    P,
    wn,
    sr,
    he,
    Xr.paste,
    fn,
    qt.length,
    Cr,
    Vn,
    ve,
    se,
    xt
  ]);
  tr("paste", ql, d, !1, !0);
  const Zo = w.useCallback(async (R, H) => {
    var le, ue;
    if (!Xr.copy)
      return;
    const B = H === !0 || ((le = fn.current) == null ? void 0 : le.contains(document.activeElement)) === !0 || ((ue = a.current) == null ? void 0 : ue.contains(document.activeElement)) === !0, X = he.columns, ae = he.rows, ge = (me, Ce) => {
      if (!je)
        Ay(me, Ce, R);
      else {
        const qe = Ce.map((ot) => ({
          kind: Fe.Text,
          data: y[ot].title,
          displayData: y[ot].title,
          allowOverlay: !1
        }));
        Ay([qe, ...me], Ce, R);
      }
    };
    if (B && ye !== void 0) {
      if (he.current !== void 0) {
        let me = ye(he.current.range, J.current.signal);
        typeof me != "object" && (me = await me()), ge(me, Yi(he.current.range.x - se, he.current.range.x + he.current.range.width - se));
      } else if (ae !== void 0 && ae.length > 0) {
        const Ce = [...ae].map((qe) => {
          const ot = ye({
            x: se,
            y: qe,
            width: y.length,
            height: 1
          }, J.current.signal);
          return typeof ot == "object" ? ot[0] : ot().then((Pe) => Pe[0]);
        });
        if (Ce.some((qe) => qe instanceof Promise)) {
          const qe = await Promise.all(Ce);
          ge(qe, Yi(y.length));
        } else
          ge(Ce, Yi(y.length));
      } else if (X.length > 0) {
        const me = [], Ce = [];
        for (const qe of X) {
          let ot = ye({
            x: qe,
            y: 0,
            width: 1,
            height: xt
          }, J.current.signal);
          typeof ot != "object" && (ot = await ot()), me.push(ot), Ce.push(qe - se);
        }
        if (me.length === 1)
          ge(me[0], Ce);
        else {
          const qe = me.reduce((ot, Pe) => ot.map((Et, st) => [...Et, ...Pe[st]]));
          ge(qe, Ce);
        }
      }
    }
  }, [
    y,
    ye,
    he,
    Xr.copy,
    se,
    fn,
    xt,
    je
  ]);
  tr("copy", Zo, d, !1, !1);
  const vw = w.useCallback(async (R) => {
    var B, X;
    if (!(!Xr.cut || !(((B = fn.current) == null ? void 0 : B.contains(document.activeElement)) === !0 || ((X = a.current) == null ? void 0 : X.contains(document.activeElement)) === !0)) && (await Zo(R), he.current !== void 0)) {
      let ae = {
        current: {
          cell: he.current.cell,
          range: he.current.range,
          rangeStack: []
        },
        rows: nn.empty(),
        columns: nn.empty()
      };
      const ge = Gt == null ? void 0 : Gt(ae);
      if (ge === !1 || (ae = ge === !0 ? ae : ge, ae.current === void 0))
        return;
      Ki(ae.current.range);
    }
  }, [Ki, he, Xr.cut, Zo, fn, Gt]);
  tr("cut", vw, d, !1, !1);
  const ww = w.useCallback((R, H) => {
    if (re !== void 0) {
      se !== 0 && (R = R.map((ae) => [ae[0] - se, ae[1]])), re(R, H);
      return;
    }
    if (R.length === 0 || H === -1)
      return;
    const [B, X] = R[H];
    u.current !== void 0 && u.current[0] === B && u.current[1] === X || (u.current = [B, X], ki(B, X, !1, !1));
  }, [re, se, ki]), [ta, na] = ((tp = on == null ? void 0 : on.current) == null ? void 0 : tp.cell) ?? [], ra = w.useRef(Mn);
  ra.current = Mn, w.useLayoutEffect(() => {
    var R, H, B, X;
    Bl.current && !Bi.current && ta !== void 0 && na !== void 0 && (ta !== ((H = (R = $e.current) == null ? void 0 : R.current) == null ? void 0 : H.cell[0]) || na !== ((X = (B = $e.current) == null ? void 0 : B.current) == null ? void 0 : X.cell[1])) && ra.current(ta, na), Bi.current = !1;
  }, [ta, na]);
  const Xh = he.current !== void 0 && (he.current.cell[0] >= qt.length || he.current.cell[1] >= Vn);
  w.useLayoutEffect(() => {
    Xh && Be(Ia, !1);
  }, [Xh, Be]);
  const xw = w.useMemo(() => vn === !0 && (Ie == null ? void 0 : Ie.tint) === !0 ? nn.fromSingleSelection(Vn - 1) : nn.empty(), [Vn, vn, Ie == null ? void 0 : Ie.tint]), kw = w.useCallback((R) => typeof ke == "boolean" ? ke : (ke == null ? void 0 : ke(R - se)) ?? !0, [se, ke]), Sw = w.useMemo(() => {
    if (Ol === void 0 || a.current === null)
      return null;
    const { bounds: R, group: H } = Ol, B = a.current.getBoundingClientRect();
    return w.createElement(MA, { bounds: R, group: H, canvasBounds: B, onClose: () => zl(void 0), onFinish: (X) => {
      zl(void 0), ne == null || ne(H, X);
    } });
  }, [ne, Ol]), Cw = Math.min(qt.length, Ct + (pr ? 1 : 0));
  w.useImperativeHandle(e, () => ({
    appendRow: (R, H) => wi(R + se, H),
    appendColumn: (R, H) => Zs(R, H),
    updateCells: (R) => {
      var H;
      return se !== 0 && (R = R.map((B) => ({ cell: [B.cell[0] + se, B.cell[1]] }))), (H = qn.current) == null ? void 0 : H.damage(R);
    },
    getBounds: (R, H) => {
      var B;
      if (!((a == null ? void 0 : a.current) === null || (fn == null ? void 0 : fn.current) === null)) {
        if (R === void 0 && H === void 0) {
          const X = a.current.getBoundingClientRect(), ae = X.width / fn.current.clientWidth;
          return {
            x: X.x - fn.current.scrollLeft * ae,
            y: X.y - fn.current.scrollTop * ae,
            width: fn.current.scrollWidth * ae,
            height: fn.current.scrollHeight * ae
          };
        }
        return (B = qn.current) == null ? void 0 : B.getBounds((R ?? 0) + se, H);
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
      var ae;
      const B = sr([R, H]);
      if (B == null || !B.allowOverlay) return;
      const X = (ae = qn.current) == null ? void 0 : ae.getBounds(R + se, H);
      X != null && Uo({
        target: X,
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
        Qs(H + se);
    },
    getMouseArgsForPosition: (R, H, B) => {
      if ((qn == null ? void 0 : qn.current) === null)
        return;
      const X = qn.current.getMouseArgsForPosition(R, H, B);
      if (X !== void 0)
        return {
          ...X,
          location: [X.location[0] - se, X.location[1]]
        };
    }
  }), [
    wi,
    Zs,
    Qs,
    fn,
    Zo,
    Jo,
    ql,
    se,
    Mn
  ]);
  const [Vh, Jh] = Vr ?? [], Rw = w.useCallback((R) => {
    const [H, B] = R;
    if (B === -1) {
      te !== "none" && (Pt(nn.fromSingleSelection(H), void 0, !1), er());
      return;
    }
    Vh === H && Jh === B || (Lt({
      cell: R,
      range: { x: H, y: B, width: 1, height: 1 }
    }, !0, !1, "keyboard-nav"), Mn(H, B));
  }, [te, er, Mn, Vh, Jh, Lt, Pt]), [Tw, Ew] = w.useState(!1), Zh = w.useRef(Xv((R) => {
    Ew(R);
  }, 5)), Mw = w.useCallback(() => {
    Zh.current(!0), he.current === void 0 && he.columns.length === 0 && he.rows.length === 0 && l === void 0 && Lt({
      cell: [se, Ys],
      range: {
        x: se,
        y: Ys,
        width: 1,
        height: 1
      }
    }, !0, !1, "keyboard-select");
  }, [Ys, he, l, se, Lt]), Iw = w.useCallback(() => {
    Zh.current(!1);
  }, []), [Aw, _w] = w.useMemo(() => {
    let R;
    const H = (ut == null ? void 0 : ut.scrollbarWidthOverride) ?? kf(), B = xt + (vn ? 1 : 0);
    if (typeof tn == "number")
      R = Xn + B * tn;
    else {
      let ae = 0;
      const ge = Math.min(B, 10);
      for (let le = 0; le < ge; le++)
        ae += tn(le);
      ae = Math.floor(ae / ge), R = Xn + B * ae;
    }
    R += H;
    const X = qt.reduce((ae, ge) => ge.width + ae, 0) + H;
    return [`${Math.min(1e5, X)}px`, `${Math.min(1e5, R)}px`];
  }, [qt, ut == null ? void 0 : ut.scrollbarWidthOverride, tn, xt, vn, Xn]), Pw = w.useMemo(() => ME(Vt), [Vt]);
  return w.createElement(
    IE.Provider,
    { value: Vt },
    w.createElement(
      WA,
      { style: Pw, className: W, inWidth: g ?? Aw, inHeight: m ?? _w },
      w.createElement(CA, { fillHandle: vt, drawFocusRing: Jt, experimental: ut, fixedShadowX: Yt, fixedShadowY: xr, getRowThemeOverride: or, headerIcons: Ht, imageWindowLoader: mn, initialSize: On, isDraggable: Gn, onDragLeave: Xt, onRowMoved: zn, overscrollX: Tl, overscrollY: El, preventDiagonalScrolling: fr, rightElement: Yn, rightElementProps: un, smoothScrollX: rr, smoothScrollY: Pr, className: W, enableGroups: Sr, onCanvasFocused: Mw, onCanvasBlur: Iw, canvasRef: a, onContextMenu: bw, theme: Vt, cellXOffset: nw, cellYOffset: Ys, accessibilityHeight: ai.height, onDragEnd: pw, columns: qt, nonGrowWidth: sn, drawHeader: Ln, onColumnProposeMove: dw, drawCell: kt, disabledRows: xw, freezeColumns: Cw, lockColumns: se, firstColAccessible: se === 0, getCellContent: sr, minColumnWidth: Wn, maxColumnWidth: jn, searchInputRef: s, showSearch: Il, onSearchClose: po, highlightRegions: rw, getCellsForSelection: ye, getGroupDetails: _l, headerHeight: Fi, isFocused: Tw, groupHeaderHeight: Sr ? Gs : 0, freezeTrailingRows: nt + (vn && (Ie == null ? void 0 : Ie.sticky) === !0 ? 1 : 0), hasAppendRow: vn, onColumnResize: Tt, onColumnResizeEnd: Ut, onColumnResizeStart: mt, onCellFocused: Rw, onColumnMoved: fw, onDragStart: hw, onHeaderMenuClick: lw, onHeaderIndicatorClick: cw, onItemHovered: Hl, isFilling: (l == null ? void 0 : l.fillHandle) === !0, onMouseMove: aw, onKeyDown: Jo, onKeyUp: Y, onMouseDown: iw, onMouseUp: sw, onDragOverCell: Se, onDrop: Ke, onSearchResultsChanged: ww, onVisibleRegionChanged: uw, clientSize: En, rowHeight: tn, searchResults: q, searchValue: Z, onSearchValueChange: ie, rows: Vn, scrollRef: fn, selection: he, translateX: ai.tx, translateY: ai.ty, verticalBorder: kw, gridRef: qn, getCellRenderer: wn, resizeIndicator: Re }),
      Sw,
      i !== void 0 && w.createElement(
        w.Suspense,
        { fallback: null },
        w.createElement(e_, { ...i, validateCell: it, bloom: k, id: yw, getCellRenderer: wn, className: (ut == null ? void 0 : ut.isSubGrid) === !0 ? "click-outside-ignore" : void 0, provideEditor: we, imageEditorOverride: f, portalElementRef: bn, onFinishEditing: mw, markdownDivCreateNode: p, isOutsideClick: Gr, customEventTarget: ut == null ? void 0 : ut.eventTarget })
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
  kind: Fe.Boolean,
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
  const { ctx: o, hoverAmount: s, theme: a, rect: l, highlighted: c, hoverX: u, hoverY: d, cell: { contentAlign: f } } = t, { x: h, y: p, width: g, height: m } = l;
  let y = !1;
  if (i > 0) {
    let b = n ? 1 - i + i * s : 0.4;
    if (e === Xa && (b *= s), b === 0)
      return;
    b < 1 && (y = !0, o.globalAlpha = b);
  }
  Oh(o, a, e, h, p, g, m, c, u, d, r, f), y && (o.globalAlpha = 1);
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
  kind: Fe.Bubble,
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
  kind: Fe.Drilldown,
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
  const { rect: n, theme: r, ctx: i, imageLoader: o, col: s, row: a } = t, { x: l, width: c } = n, u = r.baseFontFull, d = b1(i, u), f = Math.min(n.height, Math.max(16, Math.ceil(d * r.lineHeight) * 2)), h = Math.floor(n.y + (n.height - f) / 2), p = f - 10, g = r.bubblePadding, m = r.bubbleMargin;
  let y = l + r.cellHorizontalPadding;
  const b = r.roundingRadius ?? 6, T = p_(r.bgCell, r.drilldownBorder, f, b), A = [];
  for (const v of e) {
    if (y > l + c)
      break;
    const D = Ko(v.text, i, u).width;
    let P = 0;
    v.img !== void 0 && o.loadOrGetImage(v.img, s, a) !== void 0 && (P = p - 8 + 4);
    const S = D + P + g * 2;
    A.push({
      x: y,
      width: S
    }), y += S + m;
  }
  if (T !== null) {
    const { el: v, height: C, middleWidth: D, sideWidth: P, width: S, dpr: z, padding: k } = T, x = P / z, E = k / z;
    for (const I of A) {
      const M = Math.floor(I.x), N = Math.floor(I.width), L = N - (x - E) * 2;
      i.imageSmoothingEnabled = !1, i.drawImage(v, 0, 0, P, C, M - E, h, x, f), L > 0 && i.drawImage(v, P, 0, D, C, M + (x - E), h, L, f), i.drawImage(v, S - P, 0, P, C, M + N - (x - E), h, x, f), i.imageSmoothingEnabled = !0;
    }
  }
  i.beginPath();
  for (const [v, C] of A.entries()) {
    const D = e[v];
    let P = C.x + g;
    if (D.img !== void 0) {
      const S = o.loadOrGetImage(D.img, s, a);
      if (S !== void 0) {
        const z = p - 8;
        let k = 0, x = 0, E = S.width, I = S.height;
        E > I ? (k += (E - I) / 2, E = I) : I > E && (x += (I - E) / 2, I = E), i.beginPath(), ei(i, P, h + f / 2 - z / 2, z, z, r.roundingRadius ?? 3), i.save(), i.clip(), i.drawImage(S, k, x, E, I, P, h + f / 2 - z / 2, z, z), i.restore(), P += z + 4;
      }
    }
    i.beginPath(), i.fillStyle = r.textBubble, i.fillText(D.text, P, h + f / 2 + Oi(i, r));
  }
}
const m_ = {
  getAccessibilityString: (t) => t.data.join(", "),
  kind: Fe.Image,
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
  let m = 0;
  for (let b = 0; b < e.length; b++) {
    const T = e[b];
    if (T.length === 0)
      continue;
    const A = c.loadOrGetImage(T, o, s);
    if (A !== void 0) {
      g[b] = A;
      const v = A.width * (p / A.height);
      m += v + sf;
    }
  }
  if (m === 0)
    return;
  m -= sf;
  let y = u + a.cellHorizontalPadding;
  r === "right" ? y = Math.floor(u + h - a.cellHorizontalPadding - m) : r === "center" && (y = Math.floor(u + h / 2 - m / 2));
  for (const b of g) {
    if (b === void 0)
      continue;
    const T = b.width * (p / b.height);
    n > 0 && (l.beginPath(), ei(l, y, d + a.cellVerticalPadding, T, p, n), l.save(), l.clip()), l.drawImage(b, y, d + a.cellVerticalPadding, T, p), n > 0 && l.restore(), y += T + sf;
  }
}
function b_(t, e) {
  let n = t * 49632 + e * 325176;
  return n ^= n << 13, n ^= n >> 17, n ^= n << 5, n / 4294967295 * 2;
}
const v_ = {
  getAccessibilityString: () => "",
  kind: Fe.Loading,
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
  kind: Fe.Markdown,
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
      for (const m of [3, 6])
        for (const y of [-5, -1, 3])
          s.rect(u + m, d + h / 2 + y, 2, 2);
      s.fillStyle = c.textLight, s.fill(), s.beginPath();
    }
    s.globalAlpha = 1;
  }
  if (r === "number" || r === "both" && !n) {
    const g = e.toString(), m = c.markerFontFull, y = u + f / 2;
    r === "both" && l !== 0 && (s.globalAlpha = 1 - l), s.fillStyle = c.textLight, s.font = m, s.fillText(g, y, d + h / 2 + Oi(s, m)), l !== 0 && (s.globalAlpha = 1);
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
    const g = d - 8, m = l + 8 / 2, y = c + 8 / 2;
    a.drawSprite(n, "normal", r, m, y, g, s, f ? 1 : o), h = g;
  } else {
    h = 24;
    const p = 12, g = f ? p : o * p, m = f ? 0 : (1 - o) * p * 0.5, y = s.cellHorizontalPadding + 4;
    g > 0 && (r.moveTo(l + y + m, c + d / 2), r.lineTo(l + y + m + g, c + d / 2), r.moveTo(l + y + m + g * 0.5, c + d / 2 - g * 0.5), r.lineTo(l + y + m + g * 0.5, c + d / 2 + g * 0.5), r.lineWidth = 2, r.strokeStyle = s.bgIconHeader, r.lineCap = "round", r.stroke());
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
const A_ = w.lazy(async () => await import("./number-overlay-editor-EGCT9i8Q.js")), __ = {
  getAccessibilityString: (t) => {
    var e;
    return ((e = t.data) == null ? void 0 : e.toString()) ?? "";
  },
  kind: Fe.Number,
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
  kind: Fe.Protected,
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
  kind: Fe.RowID,
  needsHover: !1,
  needsHoverPosition: !1,
  drawPrep: (t, e) => Us(t, e, t.theme.textLight),
  draw: (t) => li(t, t.cell.data, t.cell.contentAlign),
  measure: (t, e, n) => t.measureText(e.data).width + n.cellHorizontalPadding * 2,
  // eslint-disable-next-line react/display-name
  provideEditor: () => (t) => {
    const { isHighlighted: e, onChange: n, value: r, validatedSelection: i } = t;
    return Mt.createElement(Ks, { highlight: e, autoFocus: r.readonly !== !0, disabled: r.readonly !== !1, value: r.data, validatedSelection: i, onChange: (o) => n({
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
  kind: Fe.Text,
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
  kind: Fe.Uri,
  needsHover: (t) => t.hoverEffect === !0,
  needsHoverPosition: !0,
  useLabel: !0,
  drawPrep: Us,
  draw: (t) => {
    const { cell: e, theme: n, overrideCursor: r, hoverX: i, hoverY: o, rect: s, ctx: a } = t, l = e.displayData ?? e.data, c = e.hoverEffect === !0;
    if (r !== void 0 && c && i !== void 0 && o !== void 0) {
      const u = Ko(l, a, n.baseFontFull), d = J1(u, s, n, e.contentAlign), { x: f, y: h, width: p, height: g } = d;
      if (i >= f - 4 && i <= f - 4 + p + 8 && o >= h - 4 && o <= h - 4 + g + 8) {
        const m = Oi(a, n.baseFontFull);
        r("pointer");
        const y = 5, b = h - m;
        a.beginPath(), a.moveTo(s.x + f, Math.floor(s.y + b + g + y) + 0.5), a.lineTo(s.x + f + p, Math.floor(s.y + b + g + y) + 0.5), a.strokeStyle = n.linkColor, a.stroke(), a.save(), a.fillStyle = t.cellFillColor, li({ ...t, rect: { ...s, x: s.x - 1 } }, l, e.contentAlign), li({ ...t, rect: { ...s, x: s.x - 2 } }, l, e.contentAlign), li({ ...t, rect: { ...s, x: s.x + 1 } }, l, e.contentAlign), li({ ...t, rect: { ...s, x: s.x + 2 } }, l, e.contentAlign), a.restore();
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
    Ve(this, "imageLoaded", () => {
    });
    Ve(this, "loadedLocations", []);
    Ve(this, "cache", {});
    // eslint-disable-next-line unicorn/consistent-function-scoping
    Ve(this, "sendLoaded", q_(() => {
      this.imageLoaded(new Rs(this.loadedLocations)), this.loadedLocations = [];
    }, 20));
    Ve(this, "clearOutOfWindow", () => {
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
  var v;
  const { getDomCell: r, onVisibleRegionChanged: i, onCellActivated: o, domCellClassName: s, gridSelection: a, freezeColumns: l = 0, domCellBottomInset: c = 0, ...u } = e, d = (v = a == null ? void 0 : a.current) == null ? void 0 : v.cell, f = w.useRef(null);
  w.useImperativeHandle(n, () => f.current, []);
  const h = w.useRef(null), p = w.useRef(null), g = w.useRef(null), [m, y] = w.useState([]), b = w.useCallback(() => {
    const C = f.current, D = h.current;
    if (C == null || D == null) return;
    const P = D.getBoundingClientRect(), S = g.current, z = [];
    if (S != null) {
      const k = Math.max(0, Math.floor(S.x)), x = Math.ceil(S.x + S.width), E = Math.max(0, Math.floor(S.y)), I = Math.ceil(S.y + S.height);
      for (let M = E; M < I; M++)
        for (let N = 0; N < x; N++) {
          if (N >= l && N < k) continue;
          const L = C.getBounds(N, M);
          L != null && (L.y + L.height < P.top || L.y > P.bottom || c > 0 && L.y + L.height > P.bottom - c || L.x + L.width < P.left || L.x > P.right || z.push({
            col: N,
            row: M,
            left: Math.round(L.x - P.left),
            top: Math.round(L.y - P.top),
            width: Math.round(L.width),
            height: Math.round(L.height)
          }));
        }
    }
    y((k) => {
      if (k.length !== z.length) return z;
      for (let x = 0; x < z.length; x++) {
        const E = k[x], I = z[x];
        if (E.col !== I.col || E.row !== I.row || E.left !== I.left || E.top !== I.top || E.width !== I.width || E.height !== I.height) return z;
      }
      return k;
    });
  }, []);
  w.useLayoutEffect(() => {
    b();
  }), w.useEffect(() => {
    const C = h.current;
    if (C == null) return;
    const D = typeof ResizeObserver < "u" ? new ResizeObserver(() => b()) : null;
    D != null && D.observe(C);
    const P = () => {
      requestAnimationFrame(b);
    };
    return window.addEventListener("scroll", P, !0), () => {
      D != null && D.disconnect(), window.removeEventListener("scroll", P, !0);
    };
  }, [b]);
  const T = w.useCallback((C, D) => {
    var I, M;
    o == null || o(C, D);
    const [P, S] = C, z = (I = p.current) == null ? void 0 : I.querySelector('[data-glide-dom-cell="' + P + ":" + S + '"]');
    if (z == null) return;
    const k = z.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (k.length !== 1) return;
    const x = k[0], E = x.tagName === "BUTTON" || x.getAttribute("role") === "button";
    typeof x.click == "function" && x.click(), E ? (M = f.current) == null || M.focus() : typeof x.focus == "function" && x.focus();
  }, [o]), A = w.useCallback((C, D, P, S) => {
    g.current = C, requestAnimationFrame(b), i == null || i(C, D, P, S);
  }, [b, i]);
  return w.createElement(
    "div",
    { ref: h, style: { position: "relative", width: "100%" }, "data-glide-dom-wrap": "" },
    w.createElement(K_, Object.assign({}, u, { ref: f, gridSelection: a, freezeColumns: l, onVisibleRegionChanged: A, onCellActivated: T })),
    w.createElement(
      "div",
      { ref: p, style: { position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }, "data-glide-dom-layer": "" },
      m.map((C) => {
        const D = r == null ? void 0 : r(C.col, C.row);
        if (D == null || D === !1) return null;
        const P = typeof D == "object" && !w.isValidElement(D) && "node" in D ? D : null, S = P != null ? P.node : D;
        return S == null || S === !1 ? null : w.createElement(
          "div",
          {
            key: C.col + ":" + C.row,
            /* `group` lets a host control react to the focused cell
               with Tailwind's group-data-[glide-dom-focused=true]:… */
            className: "group" + (s ? " " + s : ""),
            ref: (z) => {
              if (z == null) return;
              const k = z.querySelectorAll(
                'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
              );
              !(z.getAttribute("data-glide-dom-passthrough") === "true") && k.length === 1 && k[0].tagName === "BUTTON" ? z.setAttribute("data-glide-dom-button", "true") : z.removeAttribute("data-glide-dom-button");
            },
            "data-glide-dom-cell": C.col + ":" + C.row,
            /* The grid's selection rectangle is on this cell: paint
               the same hover wash the canvas rows use, so the DOM
               cell reads as hovered. */
            "data-glide-dom-focused": d != null && d[0] === C.col && d[1] === C.row ? "true" : void 0,
            "data-glide-dom-passthrough": P != null && P.passthrough === !0 ? "true" : void 0,
            style: {
              position: "absolute",
              left: C.left,
              top: C.top,
              width: C.width,
              height: C.height,
              /* Glide's cell padding (4px vertical, 8px
                 horizontal is the theme default; the drawn kit
                 faces use 4px all round) so host controls line
                 up with painted cells. */
              /* `bleed` = the control IS the cell (edge-to-edge hit
                 target); otherwise the cell's 4px inset + vertical
                 centring apply. */
              padding: P != null && P.bleed === !0 ? 0 : 4,
              boxSizing: "border-box",
              pointerEvents: P != null && P.passthrough === !0 ? "none" : "auto",
              display: P != null && P.bleed === !0 ? "block" : "flex",
              alignItems: "center",
              /* The cell is a CONTAINER: the host arranges its own
                 buttons/fields inside (and may overflow the box
                 for a morph that expands). */
              overflow: "visible"
            }
          },
          S
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
  return pn(() => {
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
    kind: Fe.Text,
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
    kind: Fe.Text,
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
      const g = t[0] + p, m = (c = r[g]) == null ? void 0 : c.key;
      !m || m === "actions" || o.push({ row: f, colKey: m, val: d[p % h] ?? "" });
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
      const { value: c, onChange: u, onFinishedEditing: d, isHighlighted: f, validatedSelection: h, initialValue: p } = l, g = s.current, { cfg: m, align: y, activation: b, selectAllOnOpen: T, portal: A } = g, v = V(c), C = V(!1), D = V(null), P = (I) => {
        const M = { kind: Fe.Text, data: I, displayData: I, allowOverlay: !0 };
        v.current = M, u(M);
      }, S = () => d(v.current), z = () => d(v.current, [1, 0]), k = () => d(void 0, [0, 0]);
      if (Ge(() => {
        if (b < 0) return;
        const I = D.current;
        I && (I.focus(), T ? I.select() : I.setSelectionRange(I.value.length, I.value.length));
      }, [b]), m === null)
        return /* @__PURE__ */ _(
          Ks,
          {
            style: y ? { textAlign: y } : void 0,
            highlight: f,
            autoFocus: (c == null ? void 0 : c.readonly) !== !0,
            disabled: (c == null ? void 0 : c.readonly) === !0,
            altNewline: !0,
            value: (c == null ? void 0 : c.data) ?? "",
            validatedSelection: h,
            onChange: (I) => P(I.target.value)
          }
        );
      if (m.kind === "text") {
        const I = (M) => P(m.uppercase ? M.toUpperCase() : M);
        return /* @__PURE__ */ _(
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
              textAlign: m.align ?? y,
              outline: "none"
            },
            placeholder: m.placeholder,
            onChange: (M) => I(M.target.value),
            onKeyDown: (M) => {
              if (M.key === "Enter" && !M.shiftKey) {
                M.preventDefault(), M.stopPropagation();
                const N = v.current;
                window.setTimeout(() => d(N), 0);
              }
            }
          }
        );
      }
      const x = m.seedValue ?? (c == null ? void 0 : c.data) ?? "", E = (I) => {
        C.current = !0, P(I[0] ?? "");
      };
      return /* @__PURE__ */ _("div", { style: { width: "100%", height: "100%" }, onKeyDown: (I) => I.stopPropagation(), children: /* @__PURE__ */ _(
        Z2,
        {
          appearance: "inline",
          mode: "single",
          values: x ? [x] : [],
          items: m.items,
          groups: m.groups,
          resolveBy: m.resolveBy ?? "id",
          onChange: E,
          onExit: () => {
            C.current ? S() : k();
          },
          onTabExit: () => z(),
          onEscape: () => {
            C.current = !1, k();
          },
          placeholder: m.placeholder,
          style: { height: "100%" },
          defaultOpen: !0,
          autoFocus: !0,
          initialQuery: p,
          selectAllOnOpen: T,
          browse: m.browse,
          panelMinWidth: m.panelMinWidth,
          createLabel: m.createLabel,
          onCreateItem: m.onCreateItem,
          portalTarget: A,
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
    if (!p || o.kind !== Fe.Text || o.readonly === !0) return;
    const [g, m] = p, y = l[g - h];
    if (!y) return;
    const b = y.key;
    let T = d ? d(m, b) : u == null ? void 0 : u[b];
    (T == null ? void 0 : T.kind) === "text" && T.align === void 0 && y.align && (T = { ...T, align: y.align });
    const A = !T && (y.align === "center" || y.align === "right");
    if (!T && !A) return;
    const C = String(c(m, b) ?? "") === (o.data ?? ""), { Editor: D, box: P } = i(b);
    return P.current = {
      cfg: T ?? null,
      align: y.align,
      activation: ++r,
      selectAllOnOpen: C,
      portal: f.current
    }, !T || T.kind === "text" ? { editor: D } : { editor: D, disablePadding: !0, styleOverride: { overflow: "visible" } };
  };
}
function sP() {
  const t = Ls(), e = V(!1);
  return Ge(() => {
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
    kind: Fe.Custom,
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
    kind: Fe.Custom,
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
  const g = Math.min(14, a - 6), m = 5, b = t.measureText(r.label).width + (r.icon ? g + m : 0);
  let T = c + Math.max(6, (u - b) / 2);
  const A = l + a / 2;
  r.icon && (cP(t, r.icon, T, A - g / 2, g, h), T += g + m), t.fillStyle = h, t.textAlign = "left", t.fillText(r.label, T, A), t.restore();
}
const dP = ({ value: t, onFinishedEditing: e }) => {
  const n = t == null ? void 0 : t.data, r = vr(), [i, o] = Ye((n == null ? void 0 : n.value) ?? "");
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
  return /* @__PURE__ */ _("div", { style: { width: "100%", height: "100%", display: "flex", alignItems: "center" }, children: n.mode === "search" ? /* @__PURE__ */ _(_v, { ...a, onSubmit: (l) => s(l), expandedWidth: 260 }) : /* @__PURE__ */ _(H2, { ...a, variant: n.variant === "danger" ? "outline" : n.variant ?? "primary", triggerIcon: void 0, clearOnSubmit: !1, onSubmit: (l) => s(l) }) });
};
function fP(t, e) {
  return {
    kind: Fe.Custom,
    isMatch: (n) => {
      var r;
      return ((r = n.data) == null ? void 0 : r.kind) === t;
    },
    draw: e,
    needsHover: !0
  };
}
const hP = {
  kind: Fe.Custom,
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
  columns: nn.empty(),
  rows: nn.empty()
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
  Ge(() => (il.add(t), () => {
    il.delete(t);
  }), [t]);
}
function wP() {
  const t = V(null), [e, n] = Ye(0);
  return Ge(() => {
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
  onCellClick: m,
  selectionKey: y,
  themeOverrides: b,
  fillHandle: T = !0,
  disableClipboard: A,
  domCells: v,
  apiRef: C,
  height: D,
  scrollable: P,
  freezeColumns: S = 0,
  rowMarkers: z,
  onAddRow: k,
  addRowHint: x
}) => {
  var on;
  const E = V(e);
  E.current = e;
  const I = V(!!o);
  I.current = !!o;
  const M = vr(), { theme: N, cellColors: L } = V_(c, b), W = (M == null ? void 0 : M.mode) ?? "light", oe = a, F = l, { ref: O, width: ne } = wP(), j = pn(() => {
    if (P) return t.map((we) => ({ ...we, width: Math.max(40, Math.round(we.width)) }));
    const de = t.reduce((we, Ie) => we + Ie.width, 0);
    if (!ne || ne <= 0 || de <= 0) return t;
    const Me = Math.max(120, Math.floor(ne) - 1), K = Math.min(1, t.length - 1), G = t.map((we) => Math.max(40, Math.floor(we.width / de * Me)));
    if (K >= 0) {
      const we = G.reduce((Ie, nt) => Ie + nt, 0);
      G[K] = Math.max(40, G[K] + (Me - we));
    }
    return t.map((we, Ie) => ({ ...we, width: G[Ie] }));
  }, [t, ne, P]), U = pn(
    () => j.map((de) => ({ title: de.label.toUpperCase(), width: de.width })),
    [j]
  ), re = F + Math.max(e.length + (k ? 1 : 0), 1) * oe, q = D ?? re;
  Ge(() => {
    if (!xe.current) return;
    const de = [];
    for (let K = 0; K < e.length; K++)
      for (let G = 0; G < j.length; G++) de.push({ cell: [G, K] });
    const Me = setTimeout(() => {
      var K;
      return (K = xe.current) == null ? void 0 : K.updateCells(de);
    }, 0);
    return () => clearTimeout(Me);
  }, [e, j]);
  const ie = oo(), Z = Ls(), Q = V(null), Y = V(null);
  Ge(() => {
    var Ie;
    const de = Z ?? (typeof document < "u" ? document : null);
    if (!de) return;
    const Me = !!((Ie = Q.current) != null && Ie.closest('[role="dialog"]')), K = de.createElement("div");
    K.setAttribute("data-glide-overlay-layer", ""), K.style.cssText = Me ? "position:fixed;left:0;top:0;z-index:10001;pointer-events:auto;width:0;height:0" : "position:fixed;left:0;top:0;z-index:9999;width:0;height:0";
    const G = (nt) => nt.stopPropagation();
    let we = null;
    return Me && (K.addEventListener("focusin", G), K.addEventListener("focusout", G), we = (nt) => {
      const Kt = nt.relatedTarget;
      Kt && K.contains(Kt) && nt.stopPropagation();
    }, de.addEventListener("focusout", we, !0)), de.body.appendChild(K), Y.current = K, () => {
      we && de.removeEventListener("focusout", we, !0), K.remove(), Y.current = null;
    };
  }, [ie, Z]);
  const ce = V(null);
  ce.current = {
    readOnlyRef: I,
    columns: j,
    getValue: (de, Me) => {
      var K;
      return String(((K = E.current[de]) == null ? void 0 : K[Me]) ?? "");
    },
    editors: h,
    getEditor: p,
    portalRef: Y,
    // `provideEditor` receives Glide's RAW column index; the row-marker gutter
    // is column 0 when it exists (roadmap: the classic Glide offset trap).
    columnOffset: z ? 1 : 0
  };
  const fe = pn(() => oP(() => ce.current), []), Ee = sP(), xe = V(null), [ze, Qe] = Ye(() => (y ? uf.get(y) : void 0) ?? cf);
  Ge(() => {
    Qe(y ? uf.get(y) ?? cf : cf);
  }, [y]);
  const dt = V(ze);
  dt.current = ze;
  const [et, te] = Ye(null), Ae = V(null), _e = pn(() => {
    const de = /* @__PURE__ */ new Map();
    for (const Me of v ?? []) {
      const K = j.findIndex((G) => G.key === Me.colKey);
      K >= 0 && de.set(`${K}:${Me.row}`, { node: Me.node, passthrough: Me.passthrough, bleed: Me.bleed });
    }
    return de;
  }, [v, j]);
  Ge(() => {
    if (C)
      return C.current = {
        openCellEditor: (de, Me) => {
          var G;
          const K = j.findIndex((we) => we.key === Me);
          K >= 0 && ((G = xe.current) == null || G.openCellEditor(K, de));
        }
      }, () => {
        C.current = null;
      };
  }, [C, j]);
  const We = Ne(
    (de, Me) => _e.get(`${de}:${Me}`) ?? null,
    [_e]
  ), He = Ne((de) => {
    var Ie;
    const Me = de == null ? void 0 : de.location, K = (de == null ? void 0 : de.kind) === "cell" && Me && Me[1] >= 0 && Me[1] < E.current.length ? Me[1] : null;
    if (K === Ae.current) return;
    const G = Ae.current;
    Ae.current = K;
    const we = [];
    if (G != null) for (let nt = 0; nt < j.length; nt++) we.push({ cell: [nt, G] });
    if (K != null) for (let nt = 0; nt < j.length; nt++) we.push({ cell: [nt, K] });
    we.length && ((Ie = xe.current) == null || Ie.updateCells(we));
  }, [j.length]), Le = Ne(([de, Me]) => {
    const K = j[de], G = E.current[Me];
    if (!K || !G) return J_({ readonly: !0 });
    const we = Me === Ae.current, Ie = n(K, G, Me);
    if (I.current) return { ...Ie, readonly: !0, allowOverlay: !1 };
    if (Ie.kind === Fe.Custom) return Ie;
    const nt = !!Ie.readonly, Kt = Ie.themeOverride ?? {};
    if (!nt) {
      const lt = we ? L.editableHoverBg : L.editableBg;
      return { ...Ie, themeOverride: { ...Kt, bgCell: lt, bgCellMedium: lt } };
    }
    return we ? { ...Ie, themeOverride: { ...Kt, bgCell: L.readonlyHoverBg, bgCellMedium: L.readonlyHoverBg } } : Ie;
  }, [j, n, L]), Je = Ne((de, Me) => {
    Me();
    const { ctx: K, rect: G, column: we, columnIndex: Ie, theme: nt } = de, Kt = j[Ie];
    if (!Kt) return;
    const lt = (Kt.align ?? "left") === "center";
    if (!lt && !u) return;
    K.save(), K.fillStyle = nt.bgHeader, K.fillRect(G.x + 1, G.y, G.width - 2, G.height), K.fillStyle = nt.textHeader, K.textAlign = lt ? "center" : "left", K.textBaseline = "middle", K.beginPath(), K.rect(G.x, G.y, G.width, G.height), K.clip();
    const ee = lt ? G.x + G.width / 2 : G.x + 6, ke = String(we.title);
    if (!u)
      K.fillText(ke, ee, G.y + G.height / 2);
    else {
      const Se = [];
      let Ke = "";
      const gt = G.width - 8;
      for (const ht of ke.split(/\s+/)) {
        const vt = Ke ? `${Ke} ${ht}` : ht;
        if (K.measureText(vt).width <= gt) {
          Ke = vt;
          continue;
        }
        Ke && (Se.push(Ke), Ke = "");
        let ut = "";
        for (const Yt of ht)
          ut && K.measureText(ut + Yt).width > gt ? (Se.push(ut), ut = Yt) : ut += Yt;
        Ke = ut;
      }
      Ke && Se.push(Ke);
      const Ot = Math.min(14, G.height / Math.max(1, Se.length)), ct = G.y + G.height / 2 - (Se.length - 1) * Ot / 2;
      Se.forEach((ht, vt) => K.fillText(ht, ee, ct + vt * Ot));
    }
    K.restore();
  }, [j, u]), yt = Ne((de, Me) => {
    m == null || m(de, Me);
  }, [m]), ve = Ne((de) => {
    if (I.current) return;
    const Me = [];
    for (const K of de)
      i.has(K.colKey) && E.current[K.row] && Me.push({ row: K.row, colKey: K.colKey, value: K.val });
    Me.length > 0 && r(Me);
  }, [i, r]), je = Ne(
    () => eP(dt.current, e.length, j.length),
    [e.length, j.length]
  ), Ct = Ne((de) => {
    if (I.current) return !1;
    if (de.length === 1 && de[0].value.kind === Fe.Text) {
      const Me = je();
      if (Me && Me.width * Me.height > 1) {
        const K = tP(Me, j, de[0].value.data);
        if (K.length > 1)
          return ve(K), !0;
      }
    }
    return ve(de.map((Me) => {
      var K;
      return {
        row: Me.location[1],
        colKey: ((K = j[Me.location[0]]) == null ? void 0 : K.key) ?? "",
        val: Me.value.kind === Fe.Text ? Me.value.data : Me.value.kind === Fe.Boolean ? String(Me.value.data) : ""
      };
    })), !0;
  }, [j, ve, je]), bt = Ne((de, Me) => {
    var G, we;
    if (I.current) return !1;
    const K = nP(
      [de[0], de[1]],
      Me,
      E.current.length,
      j,
      (we = (G = dt.current) == null ? void 0 : G.current) == null ? void 0 : we.range
    );
    return ve(K), !1;
  }, [j, ve]), Xe = Ne(async () => {
    const de = je();
    if (!de) return;
    const Me = Z_(e, j, de);
    Me.length > 0 && await Fy(Me), te(null);
  }, [e, j, je]), Rt = Ne(async () => {
    if (I.current) {
      te(null);
      return;
    }
    const de = je();
    if (!de) return;
    const { text: Me, committers: K } = Q_(e, j, de);
    Me.length > 0 && (await Fy(Me), ve(K.map((G) => ({ ...G, val: "" })))), te(null);
  }, [e, j, ve, je]), pt = Ne(() => {
    if (I.current) {
      te(null);
      return;
    }
    const de = je();
    de && (ve(rP(de, j, i)), te(null));
  }, [j, i, ve, je]), ft = Ne(() => {
    var K;
    const de = dt.current;
    let Me = (K = de.current) == null ? void 0 : K.cell;
    if (!Me && de.rows.length > 0) {
      for (let G = 0; G < E.current.length; G++)
        if (de.rows.hasIndex(G)) {
          Me = [0, G];
          break;
        }
    }
    return Me ?? null;
  }, []), It = Ne((de) => {
    if (I.current) return;
    const Me = ft();
    Me && bt(Me, iP(de));
  }, [ft, bt]), $t = Ne(async () => {
    const de = await bP();
    de && It(de), te(null);
  }, [It]);
  vP(Ne((de) => {
    A || It(de);
  }, [A, It]));
  const en = V({ copy: () => {
  }, cut: () => {
  }, paste: () => {
  } });
  en.current = { copy: Xe, cut: Rt, paste: $t }, Ge(() => {
    if (A) return;
    const de = Z ?? (typeof document < "u" ? document : null);
    if (!de) return;
    const Me = (G) => G instanceof HTMLElement ? G.tagName === "INPUT" || G.tagName === "TEXTAREA" || G.isContentEditable : !1, K = (G) => {
      if (!(G.metaKey || G.ctrlKey) || G.shiftKey || G.altKey) return;
      const we = G.key.toLowerCase();
      if (we !== "c" && we !== "x" && we !== "v" || Me(G.target)) return;
      G.preventDefault(), G.stopPropagation();
      const Ie = en.current;
      we === "c" ? Ie.copy() : we === "x" ? Ie.cut() : Ie.paste();
    };
    return de.addEventListener("keydown", K, !0), () => de.removeEventListener("keydown", K, !0);
  }, [Z, A]);
  const wt = Ne((de, Me) => {
    var we, Ie;
    Me.preventDefault();
    const [K, G] = de;
    G < 0 || G >= E.current.length || te({
      x: (((we = Me.bounds) == null ? void 0 : we.x) ?? 0) + (Me.localEventX ?? 0),
      y: (((Ie = Me.bounds) == null ? void 0 : Ie.y) ?? 0) + (Me.localEventY ?? 0),
      row: G,
      col: K
    });
  }, []), Nt = ((on = ze.current) == null ? void 0 : on.range) !== void 0 || ze.rows.length > 0 || ze.columns.length > 0, zt = Ne((de) => {
    Qe(de), y && uf.set(y, de);
  }, [y]), kn = pn(
    () => g ? [...$y, ...g] : $y,
    [g]
  );
  return /* @__PURE__ */ pe(
    "div",
    {
      ref: Q,
      className: `relative ${f}`,
      ...d ? { [d]: "" } : {},
      "data-glide-sheet": W,
      style: { "--glide-dom-hover-bg": L.readonlyHoverBg, "--glide-dom-accent": N.accentColor },
      onPointerLeave: () => {
        var K;
        const de = Ae.current;
        if (de == null) return;
        Ae.current = null;
        const Me = [];
        for (let G = 0; G < j.length; G++) Me.push({ cell: [G, de] });
        (K = xe.current) == null || K.updateCells(Me);
      },
      children: [
        /* @__PURE__ */ _("div", { ref: O, style: { touchAction: "none" }, children: e.length === 0 && s && !k ? /* @__PURE__ */ _("div", { className: "px-2.5 py-6 text-center text-xs text-[color:var(--ui-text-faint)]", children: s }) : ne > 0 ? /* @__PURE__ */ _(
          U_,
          {
            ref: xe,
            getDomCell: v && v.length > 0 ? We : void 0,
            domCellBottomInset: k ? oe : 0,
            width: Math.max(120, Math.floor(ne) - 1),
            height: q,
            columns: U,
            rows: e.length,
            getCellContent: Le,
            onCellsEdited: Ct,
            onPaste: bt,
            provideEditor: fe,
            ...Ee,
            getCellsForSelection: !0,
            gridSelection: ze,
            onGridSelectionChange: zt,
            theme: N,
            rowHeight: oe,
            headerHeight: F,
            drawHeader: Je,
            onCellClicked: yt,
            onItemHovered: He,
            onCellContextMenu: wt,
            customRenderers: kn,
            editOnType: !0,
            rangeSelect: "rect",
            cellActivationBehavior: "double-click",
            fillHandle: T && !o,
            portalElementRef: Y,
            minColumnWidth: 1,
            maxColumnWidth: 1e4,
            freezeColumns: S,
            ...z ? { rowMarkers: z } : {},
            ...k ? {
              trailingRowOptions: { hint: x ?? "Add row", sticky: !0 },
              onRowAppended: () => {
                k();
              }
            } : {}
          }
        ) : /* @__PURE__ */ _("div", { style: { height: re } }) }),
        /* @__PURE__ */ pe(
          Ux,
          {
            open: !!et,
            x: (et == null ? void 0 : et.x) ?? 0,
            y: (et == null ? void 0 : et.y) ?? 0,
            onClose: () => te(null),
            theme: W,
            children: [
              /* @__PURE__ */ _(aa, { onClick: () => void Xe(), icon: /* @__PURE__ */ _(Gw, { className: "w-3.5 h-3.5" }), disabled: !Nt, children: "Copy" }),
              /* @__PURE__ */ _(aa, { onClick: () => void $t(), icon: /* @__PURE__ */ _(Yw, { className: "w-3.5 h-3.5" }), disabled: o || A, children: "Paste" }),
              /* @__PURE__ */ _(aa, { onClick: pt, icon: /* @__PURE__ */ _(za, { className: "w-3.5 h-3.5 text-[color:var(--ui-text-faint)]" }), disabled: !Nt || o, children: "Clear" }),
              /* @__PURE__ */ _(Gx, {}),
              /* @__PURE__ */ _(aa, { onClick: () => void Rt(), icon: /* @__PURE__ */ _(Xw, { className: "w-3.5 h-3.5 text-[color:var(--ui-text-faint)]" }), disabled: !Nt || o, children: "Cut" })
            ]
          }
        )
      ]
    }
  );
}, xP = ({ label: t, testId: e, onOpen: n }) => /* @__PURE__ */ _("div", { className: "flex h-full w-full items-center justify-end", children: /* @__PURE__ */ _(
  "button",
  {
    type: "button",
    className: "pointer-events-auto flex h-6 w-6 items-center justify-center rounded text-[color:var(--ui-text-faint)] hover:bg-[var(--ui-card-hover)] hover:text-[color:var(--ui-text)]",
    onClick: n,
    "data-testid": e,
    "aria-label": t ? `Open picker (${t})` : "Open picker",
    tabIndex: -1,
    children: /* @__PURE__ */ _(ci, { className: "h-3.5 w-3.5" })
  }
) });
function I3(t) {
  return {
    row: t.row,
    colKey: t.colKey,
    passthrough: !0,
    node: /* @__PURE__ */ _(xP, { label: t.label, testId: t.testId, onOpen: t.onOpen })
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
  Te as aC,
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
  gn as bA,
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
  Fe as z
};
